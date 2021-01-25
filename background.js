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
    .then(r=>r.text())
    .then(reply)
    .catch(e=>reply({'error': e}));
    
return true;
})
