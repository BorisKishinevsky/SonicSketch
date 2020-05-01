(function (proxied) {
    window.alert = function () {
        iosAlert(arguments[0], arguments[1]);
    }
})(window.alert);

function iosAlert() {
    try {
        var $alert = document.querySelector('.alert');
        $alert.parentElement.removeChild($alert);
    } catch ($error) {}

    var $alert = document.createElement('span');
    if (arguments[1] == null) {
        arguments[1] = window.location.protocol + '//' + window.location.hostname;
    }
    $alert.innerHTML = '<div class="alert"><div class="inner"><div class="title">' + arguments[1] + '</div><div class="text">' + arguments[0] + '</div></div><div class="button">OK</div></div>';
    document.querySelector('body').appendChild($alert);
    setTimeout(function () {
        document.querySelector('.alert .button:last-child').addEventListener("click", function () {

            $alert.parentElement.removeChild($alert);
        });
    });
    return false;

}
