const ORIGIN_REQUEST = "request"
setInterval(() => {
    Array.from(document.querySelectorAll("a")).forEach((i) => {
        if (!i.href.startsWith(location.origin)) {
            i.href = location.origin + "/proxyto:" + i.href 
        }
    })
    Array.from(document.querySelectorAll("link")).forEach((i) => {
        if (!i.href.startsWith(location.origin)) {
            i.href = location.origin + "/assetproxy:" + i.href 
        }
    })
    Array.from(document.querySelectorAll("img, audio, source, video")).forEach((i) => {
        if (!i.src.startsWith(location.origin)) {
            i.src = location.origin + "/assetproxy:" + i.src 
        }
    })

}, 750)
