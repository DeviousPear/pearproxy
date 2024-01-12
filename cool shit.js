setInterval(() => {
    Array.from(document.querySelectorAll("a")).forEach((r) => {
        if (!r.href.includes(location.origin)) {
            r.href = location.origin + "/to:" + r.href
        }
    })
    Array.from(document.querySelectorAll("[href]")).forEach((r) => {
        if (!r.href.includes(location.origin)) {
            r.href = location.origin + "/asset:" + r.href
        }
    })
    
    Array.from(document.querySelectorAll("[src]")).forEach((r) => {
        if (!r.src.includes(location.origin)) {
            r.src = location.origin + "/asset:" + r.src
        }
    });
}, 750);
