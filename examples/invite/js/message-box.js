function showMsg(msg) {
    var div = document.createElement('div');
    div.className = 'message-box';
    div.innerHTML = msg;

    document.body.appendChild(div);

    setTimeout(function() {
        div.classList.add('hide');
    }, 3000);

    setTimeout(function() {
        document.body.removeChild(div);
    }, 3300);
}
