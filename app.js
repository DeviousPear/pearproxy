var fetch;
import("node-fetch").then(res => {
    fetch = res.default
})
var proxy = require("http").createServer((req, res) => {
    if (req.url.startsWith("/to:")) {
        console.log("proxy init")
        
        let stuff = new URL(req.url.split("to:")[1])
        res.setHeader("Set-Cookie", "pearproxy=" + stuff.origin + ";Path=/")
        res.statusCode = 303
        res.setHeader("Location", stuff.pathname + stuff.search)
        res.end("Opening " + stuff.toString())
    } else if (req.url.startsWith("/assetproxy:")) {
        let url = new URL(req.url.split("assetproxy:")[1])
        require(url.protocol.split(":")[0]).get(url.origin + req.url, {headers: fakeHeaders}, resp => {
            resp.pipe(res)
        })
    } else if (req.url == "/CHECKHEADERS") {
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(req.headers))
    } else if (req.headers.cookie && req.headers.cookie.match(/pearproxy=http/)) {
        let fakeHeaders = {}
        fakeHeaders["User-Agent"] = req.headers["user-agent"]
        console.log("proxy on")
        console.log(req.url)
        let url = new URL(require("cookie").parse(req.headers.cookie).pearproxy)
        if (url.hostname == "games.poki.com") {
            fakeHeaders = req.headers
            delete fakeHeaders["X-Real-IP"]
            delete fakeHeaders["X-Forwarded-For"]
            console.log("poki games url")
        }
        require(url.protocol.split(":")[0]).get(url.origin + req.url, {headers: fakeHeaders}, (resp => {
            resp.pipe(res)
        res.write(`<script>const ORIGIN_REQUEST="request";setInterval(()=>{Array.from(document.querySelectorAll("a")).forEach(r=>{r.href.startsWith(location.origin)||(r.href=location.origin+"/to:"+r.href)}),Array.from(document.querySelectorAll("link")).forEach(r=>{r.href.startsWith(location.origin)||(r.href=location.origin+"/assetproxy:"+r.href)}),Array.from(document.querySelectorAll("img, audio, source, video")).forEach(r=>{r.src.startsWith(location.origin)||(r.src=location.origin+"/assetproxy:"+r.src)})},750);</script>`)
        }))
    } else {
        if (req.headers.referer.includes("games.poki")) {
            console.log("dubl wtf")

        }
        console.log(req.url)
        console.log("wtf")
        res.end("Use /to:{your url} to go to a website with PearProxy")
    }
}).listen(3000)
