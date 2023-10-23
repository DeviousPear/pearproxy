const ORIGIN_REQUEST = "request"
setInterval(() => {
    Array.from(document.querySelectorAll("a")).forEach((i) => {
        if (!i.href.startsWith("https://pearproxy.vercel.app")) {
            i.href = "https://pearproxy.vercel.app/proxyto:" + i.href 
        }
    })
    Array.from(document.querySelectorAll("link")).forEach((i) => {
        if (!i.href.startsWith("https://pearproxy.vercel.app")) {
            i.href = "https://pearproxy.vercel.app/assetproxy:" + i.href 
        }
    })
    Array.from(document.querySelectorAll("img, audio, source, video")).forEach((i) => {
        if (!i.src.startsWith("https://pearproxy.vercel.app")) {
            i.src = "https://pearproxy.vercel.app/assetproxy:" + i.src 
        }
    })

}, 750)
