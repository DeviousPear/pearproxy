const ORIGIN_REQUEST = "request";
setInterval(() => {
    Array.from(document.querySelectorAll("[href]")).forEach((r) => {
        r.href.startsWith(location.origin) || "a" == r.nodeName || (r.href = location.origin + "/asset:" + r.href);
    }),
        Array.from(document.querySelectorAll("a")).forEach((r) => {
            r.href.startsWith(location.origin) || (r.href = location.origin + "/proxyto:" + r.href);
        }),
        Array.from(document.querySelectorAll("[src]")).forEach((r) => {
            r.src.startsWith(location.origin) || (r.src = location.origin + "/asset:" + r.src);
        });
}, 750);
