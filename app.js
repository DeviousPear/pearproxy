var fetch;
import("node-fetch").then(res => {
    fetch = res.default
})
var proxy = require("http").createServer((req, res) => {
    if (req.url.startsWith("/proxyto:")) {
        console.log("proxy init")
        
        let stuff = new URL(req.url.split("proxyto:")[1])
        res.setHeader("Set-Cookie", "pearproxy=" + stuff.origin + ";Path=/")
        res.statusCode = 303
        res.setHeader("Location", stuff.pathname + stuff.search)
        res.end("Opening " + stuff.toString())
    } else if (req.headers.cookie && req.headers.cookie.match(/pearproxy=http/)) {
        console.log("proxy on")
        console.log(req.url)
        let url = new URL(require("cookie").parse(req.headers.cookie).pearproxy)
        require(url.protocol.split(":")[0], {}).get(url.origin + req.url, (resp => {
            resp.pipe(res)
        }))
        //then(resp => resp.text()).then(resp => res.end(data)).catch(res.end)

    } else {
        console.log("wtf")
        res.end("Use /proxyto:{your url} to go to a website with PearProxy")
    }
}).listen(3000)
