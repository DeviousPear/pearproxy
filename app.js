var fetch;
import("node-fetch").then(res => {
    fetch = res.default
})
var proxy = require("http").createServer((req, res) => {
    if (req.url.startsWith("/proxyto:")) {
        console.log("proxy init")
        
        let stuff = new URL(req.url.split("proxyto:")[1])
        console.log(stuff.toString())
        res.setHeader("Set-Cookie", "pearproxy=" + stuff.origin + ";Path=/")
        res.statusCode = 303
        console.log(stuff)
        res.setHeader("Location", stuff.pathname + stuff.search)
        res.end("Opening " + stuff.toString())
    } else if (req.headers.cookie && req.headers.cookie.match(/pearproxy=http/)) {
        res.end("ok man here u go: \n " + JSON.stringify(req.headers) + "\n" + JSON.stringify(require("cookie").parse(req.headers.cookie)))
        console.log("proxy on")
        console.log(req.url)
        let url = new URL(require("cookie").parse(req.headers.cookie).pearproxy)
        res.setHeader("Content-Type", "text/html")
        fetch(url.origin + req.url).then(resp => resp.text()).then(resp => res.end(data)).catch(res.end)

    } else {
        console.log("wtf")
        console.log(req.headers, req.url)
        res.end("Use /proxyto:{your url} to go to a website with PearProxy")
    }
}).listen(3000)
