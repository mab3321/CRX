function removeCookies() {
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
}

function AddCookies(cookies)
{
    for (c in cookies) {
        var d = window.location.hostname.split(".");
        domain = ".grammarly.com"
        // domain = '.'+ d.slice(1,d.length).join('.')

        var cookieBase = encodeURIComponent(c)+ `=${encodeURIComponent(cookies[c])}; expires=Thu, 01-Jan-2024 00:00:01 GMT; domain=` + domain + ' ;path=/';
        document.cookie = cookieBase + '/';
    }
}