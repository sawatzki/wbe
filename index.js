function xhrPromise(url, params) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let res = JSON.parse(xhr.responseText)

                let html = ``
                html += `<div id="roles">`

                res.forEach(item => {
                    html += `<div class="role" data-role-id="${item.id}">${item.title}</div>`
                })

                html += `</div>`
                resolve(html)
            }
        }
        xhr.send(params);
    })
}

xhrPromise('https://artsaw.de/api/database.php', 'action=read&table=roles&role_id=2').then(html => {
    document.querySelector('#root').insertAdjacentHTML('beforeend', html.toString())
    document.querySelectorAll('.role').forEach($role => {
        $role.addEventListener('click', e => {
            if(!document.querySelector('#role-info')){
                document.querySelector('#root').insertAdjacentHTML('beforeend', '<div id="role-info"></div>')
            }
            document.querySelector('#role-info').innerHTML = getRoleRights(e.currentTarget.dataset.roleId)

        })
    })
})


function createRoleRights(data) {
    let html = ``
    html += `<div id="roles">`
    data.forEach(item => {
        html += `<div class="role" data-role-id="${item.id}">${item.title}</div>`
    })
    html += `</div>`
    return html
}

function getRoleRights(roleId){
    xhrPromise('https://artsaw.de/api/database.php', 'action=read&table=role&role_id='+roleId).then(data => {
        console.log(data)
        /*document.querySelectorAll('.role').forEach($role => {
            $role.addEventListener('click', e => {
                if(!document.querySelector('#role-info')){
                    document.querySelector('#root').insertAdjacentHTML('beforeend', '<div id="role-info"></div>')
                }
                document.querySelector('#role-info').innerHTML = createRoleDescription(e.currentTarget.dataset.roleId)
            })
        })*/
    })
    return roleId

}

function createRoleDescription(role_id) {
    return `
        <div id="role-data">
            <div>Admin</div>
            <div class="role-rights">
                <div class="role-right" data-role-right="1">Right 1</div>
                <div class="role-right" data-role-right="2">Right 2</div>
                <div class="role-right" data-role-right="3">Right 3</div>
            </div>
        </div>
    `
}