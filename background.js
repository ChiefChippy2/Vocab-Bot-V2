//eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(function(message, sender, reply) {
    let msg = {};
    try {
        msg = JSON.parse(message)
    } catch (e) {
        return reply({'error': 'not a valid object'});
    }
    //eslint-disable-next-line no-console
    console.log("Msg from ", sender, msg);
    if (!msg.url) return reply({'error': 'no url'});
    fetch(msg.url, msg.options)
    .then(r=>{
        if (r.status === 404) return {'status': '404', 'error': 'Not Found'};
        return r.text()
    })
    .then(reply)
    .catch(e=>reply({'error': e}));
    
return true;
})
const iconUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHklEQVQ4jX2RPWtUQRSGnzNnbvbrLoJmk5AoLiTYGNSAglZ2KQJbWvoPUtgGCRZB/AP+BVsbIYXYKBYBQYmuEY0mioWSGEPw3tXc3Zmx2N2bDxMHDsww5zznPe8RgPuv7s244G/74C644GKPwwePCw4fHB6HC757Dy5xwb8+E9fvzl6cW5Q7z2/NlAcqjypRbPpJrlf0HwgueO9xDati51tZagAqUUx+AiAc/wZDYN6q6CRAK0v5H6RWGmakPMby1gvaPs+YtEY0rzgOoka5VLtCQYu8327ig+v/xlbFHtB1FKR+YpyyjWluvSTzGQbNlVkVPaDYh0C6m0CAykBMZCz16gStTsrXX1/I83vjGRWlG5aKVrlx7ibnT06RZglpO2EsrmNNxPrOKoJgxKCiGFEMyoER2lnG6Wqd4coo73684Xe7xWCxRttnbKTfut0PbcP0u6soGHi29oRT5RqXR64xVBzFiPJ55xMigumpNeiekv0jRDbi7eYym8kG189OU6+OIwgftldI2wkq5h+I6XdXUayJiAYinq49Ji5UmRyaYvvPT7LOLq0sPRJiVTQB8p1FNmJ95yNrW6sMVobYTL5jes4fseLEqtgmcHXPFSgMFHi48oCO7yCRoEZz3w5BmmYkHl1QsX6/mZGNKBaLlEolIhuhYnPZKrY/jlcxC2Z6orGoog0Vu6SiSe6Jsd3YV9iDJCp2qZWljdmpucW/1ybquvV10hYAAAAASUVORK5CYII=";
//notification for update
function notif(y){
    if(y==="fail"){
        //eslint-disable-next-line no-undef
        chrome.notifications.create(
            "",
            {
            iconUrl,
            "title": "Failed to check for update",
            "message": "Vocab Bot can't check for update... ",
            "type": "basic"
        }
)
    }
    else if (y === "new"){
        //eslint-disable-next-line no-undef
        chrome.notifications.create(
            "",
            {
                iconUrl,
                "title": "Update available!",
                "message": "A new version is available for Vocab Bot! Click Update to download the latest extension and see the changelog",
                "type": "basic",
                "buttons": [
                    {
                    "title": "Update"
                    }
                ]
            },
            function(id){
                window.notifID = id;
            }
        )
    }
    
}
//eslint-disable-next-line no-undef
chrome.runtime.onStartup.addListener(function(){
    //check update
    fetch("https://raw.githubusercontent.com/ChiefChippy2/Vocab-Bot-V2/master/manifest.json")
    .then(r=>r.json())
    .then(re=>{
        //eslint-disable-next-line no-undef
        if(re.version!==chrome.runtime.getManifest().version) notif("new");
    })
    .catch(notif.bind(this,"fail"))
    
    return true;
})

//stuff for updating
//eslint-disable-next-line no-undef
chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
    if (notifId === window.notifID) {
        if (btnIdx === 0) {
            //eslint-disable-next-line no-undef
            chrome.tabs.create({
                "active": true,
                "url": 'https://github.com/ChiefChippy2/Vocab-Bot-V2'
            })
        }
    }
})
