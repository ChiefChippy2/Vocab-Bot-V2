//add listeners and prepare to initiate
window.addEventListener("DOMContentLoaded", init)
window.initspam = setInterval(init, 300)
//check if it is to reset the data. Clear all initiation if true.
if(new URL(location.href).searchParams.get("clearData") == "1") {
    window.clearInterval(window.initspam);
    localStorage.removeItem("vocabinf");
    localStorage.removeItem("doneLists");
    document.body.textContent = "Success... page will automatically close in 3 seconds";
    setTimeout(window.close,3000);
    
}
//solver
function lol() {
    if (islearning) return;
    var si = document.querySelector('#spellit')
    var go = document.querySelector('#nextword')
    var q = document.getElementsByClassName('def')
    var inp = document.querySelector('#guessWord')
    var resolved = false;
    for (var i = 0;i < q.length;i++) {
        var a = q[i].innerText.replace(/"/g, "")
        var resp = window.local[a] || window.local[Object.keys(window.local).map(x=>x.replace(/^[a-z0-9]/gi, ""))
            .find(x=>x == a.replace(/^[a-z0-9]/gi, ""))];
        if (resp) {
            inp.value = resp;
            resolved = true;
            break;
        }

    }

    if (document.querySelector("#surrender").getAttribute("disabled") != "disabled") return learn(inp, si)
    if (!resolved) return learn(inp, si)
    si.click()
    setTimeout(function() {
        go.click()
    }, 2)

    if (document.getElementsByClassName("remaining")[0].innerText == "0") {
        localStorage.setItem("vocabinf", "")
            //console.log(document.getElementsByClassName("remaining")[0])
        nextBee(3)
    }
}
window.startUpTime = Date.now();
function init() {

    clearInterval(window.initspam)
        //eslint-disable-next-line no-undef
    chrome.storage.sync.get({
        "query": "test",
        "strike": 5,
        "hide": false
    }, function(items) {
        window.prefs = items
        if (window.prefs.hide) document.body.style.display = "none"
        if (!localStorage.getItem("vocabinf") || localStorage.getItem("vocabinf")[0] !== "{") nextBee(4);
        window.local = JSON.parse(localStorage.getItem("vocabinf"))
        if (window.local != undefined) {
            setInterval(lol, 5)
            setTimeout(function() {
                document.querySelector('#bee_complete > div.actions > button').click()
            }, 150000)
        } else {
            nextBee(2);
        }

        if (document.getElementsByClassName("remaining")[0].innerText == "0" && location.href.endsWith("bee")) {
            //if(window.startUpTime - Date.now() < 2500) location.href+="/reset";
            localStorage.setItem("vocabinf", "")
            nextBee(1)
        }
    })
}
//nextBee - only to be called once
let iscalled = false;
function nextBee() {
    if (iscalled) return;
    iscalled = true
    var num = JSON.parse(localStorage.getItem("doneLists"))
    if (!num) num = []
    // there are a few million lists...
    if (window.prefs.query === '*') return prepareList(`https://vocaulary.com/lists/${Math.floor(Math.random()*5000000)+1000000}`);
    customFetch(encodeURI("https://api.vocabulary.com/1.0/lists/?q=" + window.prefs.query + "&skip=" + num.length + "&limit=10"), {
            "headers": {
                "User-Agent": navigator.userAgent,
                "Accept": "application/json",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                "origin": "https://api.vocabulary.com/proxy.html"
            },
            "referrer": "https://api.vocabulary.com/proxy.html",
            "method": "GET"
        })
        .then(e=>{
            try{
                e = JSON.parse(e);
                if(e.error) return;
            }catch(err){
                //huh
            }
            e = e.wordlists
            var link = e.find(e=>!num.includes(e.id));
            if (!link) {
                num.concat(e.map(e=>e.id));
                localStorage.setItem("doneLists", JSON.stringify(num));
                iscalled = false;

                return nextBee(5);
            }
            num.push(link.id)
            localStorage.setItem("doneLists", JSON.stringify(num))
            prepareList(link.url)
        })
        .catch(()=>{
            //hmm something weird happened
            iscalled = false;
            setTimeout(nextBee, 5000)
        })
}
let islearning = false;
function learn(inp, si) {
    //we somehow have no idea what this word means.
    if(!('strike' in window)) window.strike = window.prefs.strike;
    if (islearning) return;
    islearning = true
    inp.value = "idk";
    var rem = document.getElementsByClassName("remaining")[0].innerText;
    if (rem == window.progress) window.strike -= 1;
    else window.strike = window.prefs.strike;
    window.progress = rem
    //too many idks, might as well skip to the next list.
    if (window.strike == 0) nextBee()
        //fuck it
    var surrender = document.querySelector("#surrender")
    si.click();
    var int = setInterval(()=>{
        si.click()
        if (!surrender.disabled && surrender.getAttribute("disabled") != "disabled") {
            clearInterval(int);
            surrender.click();
            surrender.click();
            setTimeout(()=>{
                try {
                    window.local[document.getElementsByClassName('def')[0].innerText.replace(/"/g, "")] = document.querySelector("#correctspelling").innerText.split(":")[1].trim()
                    document.querySelector('#nextword').click();
                    islearning = false;
                } catch (e) {
                    nextBee();
                }
            }, 1000)
        }

    }, 50)


}

function prepareList(url) {
    const headers = {
        "headers": {
            "User-Agent": navigator.userAgent,
            "Accept": "text/html"
        },
        "method": "GET"
    };
    if (window.prefs.query !== '*') headers.referrer = "https://www.vocabulary.com/lists/search?query=" + window.prefs.query;
    customFetch(url, headers)
        .then(resp=>{
            try{
                if (JSON.parse(resp).status == 404) return prepareList(`https://vocaulary.com/lists/${Math.floor(Math.random()*5000000)+1000000}`);
                if(JSON.parse(resp).error) return;
            }catch(e){
                //all normal
            }
            var fdoc = new DOMParser().parseFromString(resp, "text/html")
            var loc = {};
            Array.from(fdoc.querySelector("#wordlist").querySelectorAll("li")).forEach(x=>loc[x.querySelector(".definition").innerText] = x.getAttribute("word"))
            localStorage.setItem("vocabinf", JSON.stringify(loc))

            location.href = url + "/bee"

        })




}

function customFetch(url, options) {
    if(url.startsWith("/")) url=`https://${location.host}${url}`;
    
return new Promise(res=>{
        //eslint-disable-next-line no-undef
        chrome.runtime.sendMessage(JSON.stringify({
            url,
            options
        }), function(resp) {
            res(resp)
        })
    })
}
