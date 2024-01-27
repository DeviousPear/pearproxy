function decodeRawHeaders(raw) {
    let x = 0
    let y = 1
    let obj = {}
    for (; x < raw.length;){
        obj[raw[x]] = raw[y]
        x += 2
        y += 2
    }
    return obj
}

var proxy = require("http").createServer((req, res) => {
    if (req.url.startsWith("/to:")) {
        console.log("proxy init")
        
        let stuff = new URL(req.url.split("to:")[1])
        res.setHeader("Set-Cookie", "pearproxy=" + stuff.origin + ";Path=/")
        res.statusCode = 303
        res.setHeader("Location", stuff.pathname + stuff.search)
        res.end("Opening " + stuff.toString())
    } else if (req.url.startsWith("/INJECTSCRIPT")) require("fs").createReadStream(__dirname + "/coolshit.js").pipe(res)
    else if (req.url.startsWith("/asset:")) {
        let fakeHeaders = decodeRawHeaders(req.rawHeaders)
        console.log("proxy on")
        console.log(req.url)
        let url = new URL(require("cookie").parse(req.headers.cookie).pearproxy)
        fakeHeaders["Host"] = url.host
        delete fakeHeaders["Accept-Encoding"]
        require(url.protocol.split(":")[0]).get(url.origin + req.url, {headers: fakeHeaders}, resp => {
            Object.entries(decodeRawHeaders(resp.rawHeaders)).forEach(([key, val]) => {
                if (!key.toLowerCase().includes("content-security-policy")) {
                    res.setHeader(key, val)
                }
            })
            resp.pipe(res)
            if (resp.headers["content-type"] && resp.headers["content-type"].includes("text/html")) {
                res.write(`<script src="/INJECTSCRIPT"></script>`)
            }
        })
    } else if (req.url == "/CHECKHEADERS") {
        console.log(req.rawHeaders)
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(decodeRawHeaders(req.rawHeaders)))
    } else if (req.headers.cookie && req.headers.cookie.match(/pearproxy=http/)) {
        let fakeHeaders = decodeRawHeaders(req.rawHeaders)
        delete fakeHeaders["Accept-Encoding"]
        console.log("proxy on")
        console.log(fakeHeaders)
        let url = new URL(require("cookie").parse(req.headers.cookie).pearproxy)
        fakeHeaders["Host"] = url.host
        delete fakeHeaders["ETag"]
        require(url.protocol.split(":")[0]).get(url.origin + req.url, {headers: fakeHeaders}, (resp => {
            Object.entries(decodeRawHeaders(resp.rawHeaders)).forEach(([key, val]) => {
                
                if (!key.toLowerCase().includes("content-security-policy")) {
                    res.setHeader(key, val)
                    console.log(key, val)
                } else console.log("blocked", key, val)
                
            })
            resp.pipe(res)
            res.on("data", console.log)
            res.write(`<script src="/INJECTSCRIPT"></script>`)
        }))
    } else {
        console.log(req.url)
        console.log("wtf")
        res.end("Use /to:{your url} to go to a website with PearProxy")
    }
}).listen(3000)
