const ORIGIN_REQUEST = "request"
setTimeout(() => {
    Array.from(document.querySelectorAll("a, link")).forEach((i) => {
        if (!i.href.startsWith("https://pearproxy.vercel.app")) {
            i.href = "https://pearproxy.vercel.app/proxyto:" + i.href 
        }
    })
    Array.from(document.querySelectorAll("img, iframe, audio, source, video")).forEach((i) => {
        if (!i.src.startsWith("https://pearproxy.vercel.app")) {
            i.src = "https://pearproxy.vercel.app/proxyto:" + i.href 
        }
    })
    fetch("https://pearproxy.vercel.app/proxyto:" + ORIGIN_REQUEST).then(console.log)
    console.log("ok")

}, 750)
