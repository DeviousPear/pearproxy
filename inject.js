
console.log("Created by the DeviousPear")
setInterval(() => {
    Array.from(document.querySelectorAll("a")).forEach((r) => {
        if (r.origin) {
            if (r.origin != location.origin) {
                r.href = location.origin + "/to:" + r.href
            }
        }
    })
    Array.from(document.querySelectorAll("[href]")).forEach((r) => {
        if (r.origin) {
            if (r.origin != location.origin) {
                console.log("proxying request from ", r, "with an origin of ", r.origin, `which is ${r.origin == location.origin ? "from the same": "not from the same"} `)
                r.href = location.origin + "/asset:" + r.href
            }  else console.log(r, "have same origin")
        } else console.log(r, "didnt have origin")
    })
    
    Array.from(document.querySelectorAll("[src]")).forEach((r) => {
        if (r.src) {
            if (new URL(r.src).origin != location.origin) {
                r.src = location.origin + "/asset:" + r.src
            }
        }
        
    });
}, 750);
