var proxy = require("http").createServer((req, res) => {
    if (req.url.startsWith("/to:")) {
        console.log("proxy init")
        
        let stuff = new URL(req.url.split("to:")[1])
        res.setHeader("Set-Cookie", "pearproxy=" + stuff.origin + ";Path=/")
        res.statusCode = 303
        res.setHeader("Location", stuff.pathname + stuff.search)
        res.end("Opening " + stuff.toString())
    } else if (req.url.startsWith("/asset:")) {
        let url = new URL(req.url.split("asset:")[1])
        require(url.protocol.split(":")[0]).get(url.origin + req.url, {headers: fakeHeaders}, resp => {
            resp.pipe(res)
        })
    } else if (req.url == "/CHECKHEADERS") {
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(req.headers))
    } else if (req.headers.cookie && req.headers.cookie.match(/pearproxy=http/)) {
        require(url.protocol.split(":")[0]).request(url.origin + req.url, {headers: req.headers, method:req.method}, (resp => {
            resp.pipe(res)
        res.write(`<script>setInterval(()=>{Array.from(document.querySelectorAll("[href]")).forEach(r=>{r.href.startsWith(location.origin)||"a"==r.nodeName||(r.href=location.origin+"/asset:"+r.href)}),Array.from(document.querySelectorAll("a")).forEach(r=>{r.href.startsWith(location.origin)||(r.href=location.origin+"/proxyto:"+r.href)}),Array.from(document.querySelectorAll("[src]")).forEach(r=>{r.src.startsWith(location.origin)||(r.src=location.origin+"/asset:"+r.src)})},750);</script>`)
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
