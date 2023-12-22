setInterval(() => {
    Array.from(document.querySelectorAll("[href]")).forEach((i) => {
        if (!i.href.startsWith(location.origin) && i.nodeName != "a") {
            i.href = location.origin + "/asset:" + i.href 
        }
    })
    Array.from(document.querySelectorAll("a")).forEach((i) => {
        if (!i.href.startsWith(location.origin)) {
            i.href = location.origin + "/proxyto:" + i.href 
        }
    })
    Array.from(document.querySelectorAll("[src]")).forEach((i) => {
        if (!i.src.startsWith(location.origin)) {
            i.src = location.origin + "/asset:" + i.src 
        }
    })

}, 750)
