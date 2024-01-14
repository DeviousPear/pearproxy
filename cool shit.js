setInterval(() => {
    Array.from(document.querySelectorAll("a")).forEach((r) => {
        console.log(r.getAttribute("href"))
        if (new URL(r.getAttribute("href")).origin != location.origin) {
            r.href = location.origin + "/to:" + r.href
        }
    })
    Array.from(document.querySelectorAll("[href]")).forEach((r) => {
        console.log(r.getAttribute("href"))
        if (new URL(r.getAttribute("href")).origin != location.origin) {
            r.href = location.origin + "/asset:" + r.href
        }
    })
    
    Array.from(document.querySelectorAll("[src]")).forEach((r) => {
        console.log(r.getAttribute("src"))
        if (new URL(r.getAttribute("src")).origin != location.origin) {
            r.src = location.origin + "/asset:" + r.src
        }
    });
}, 750);
