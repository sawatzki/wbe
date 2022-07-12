function xhr(url, params) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    }
    xhr.send(params);
}

xhr('https://artsaw.de/api/database.php', 'action=read&table=roles')