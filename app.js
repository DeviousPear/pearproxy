var proxy = require("http").createServer((req, res) => {
    if (req.url.startsWith("/to:")) {
        console.log("proxy init")
        
        let stuff = new URL(req.url.split("to:")[1])
        res.setHeader("Set-Cookie", "pearproxy=" + stuff.origin + ";Path=/")
        res.statusCode = 303
        res.setHeader("Location", stuff.pathname + stuff.search)
        res.end("Opening " + stuff.toString())
    } else if (req.url.startsWith("/INJECTSCRIPT")) res.write(`setInterval(()=>{Array.from(document.querySelectorAll("a")).forEach(r=>{console.log(r.getAttribute("href")),new URL(r.getAttribute("href")).origin!=location.origin&&(r.href=location.origin+"/to:"+r.href)}),Array.from(document.querySelectorAll("[href]")).forEach(r=>{console.log(r.getAttribute("href")),new URL(r.getAttribute("href")).origin!=location.origin&&(r.href=location.origin+"/asset:"+r.href)}),Array.from(document.querySelectorAll("[src]")).forEach(r=>{console.log(r.getAttribute("src")),new URL(r.getAttribute("src")).origin!=location.origin&&(r.src=location.origin+"/asset:"+r.src)})},750);`)
    else if (req.url.startsWith("/asset:")) {
        let fakeHeaders = {}
        fakeHeaders["User-Agent"] = req.headers["user-agent"]
        console.log("proxy on")
        console.log(req.url)
        let url = new URL(require("cookie").parse(req.headers.cookie).pearproxy)
        require(url.protocol.split(":")[0]).get(url.origin + req.url, {headers: fakeHeaders}, resp => {
            resp.pipe(res)
            if (resp.headers["content-type"].contains("text/html")) {
                res.write(`<script src="/INJECTSCRIPT"></script>`)
            }
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
        require(url.protocol.split(":")[0]).get(url.origin + req.url, {headers: fakeHeaders}, (resp => {
            resp.pipe(res)
            res.write(`<script src="/INJECTSCRIPT"></script>`)
        }))
    } else {
        console.log(req.url)
        console.log("wtf")
        res.end("Use /to:{your url} to go to a website with PearProxy")
    }
}).listen(3000)
