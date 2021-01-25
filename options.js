/*eslint-disable no-undef */
function reset(){
  window.open("https://www.vocabulary.com/lists/notalist/bee?clearData=1");
}
function statusUpdater(txt){
  const status = document.getElementById('status');
      status.textContent = txt;
      setTimeout(function() {
        status.textContent = '';
      }, 1500);
}
//saves options to chrome.storage
function saveOptions() {
    const query = document.getElementById('query').value||"test";
    const hide = document.getElementById('hide').checked||false;
    const strike = parseInt(document.getElementById('strike').value,10)||5;
    if(strike > 100 || strike < 3) return statusUpdater('Invalid Options : Strike must be between 3 and 100')  
    chrome.storage.sync.set({
      query,
      strike,
      hide
    }, statusUpdater.bind(this, 'Options Saved'));
  }
  
  /*
   * restores select box and checkbox state using the preferences
   * stored in chrome.storage.
   */
  function restoreOptions() {
    chrome.storage.sync.get({
        "query": "test",
        "strike": 5,
        "hide": false
    }, function(items) {
      document.getElementById('query').value= items.query;
      document.getElementById('hide').checked= items.hide;
      document.getElementById('strike').value= items.strike;
      document.getElementById('status').textContent="";
    });
  }
//start up : add listeners
document.addEventListener('DOMContentLoaded', restoreOptions);
Array.from(document.querySelectorAll("input")).map(x=>x.addEventListener("input",function(){
  document.getElementById('status').innerHTML="<span style='font-weight:600px;color:red'>UNSAVED</span>"
}))
document.getElementById('save').addEventListener(
  'click',
        saveOptions
  );
document.getElementById('abandon').addEventListener(
  'click',
        restoreOptions
  );
restoreOptions();
document.getElementById('reset').addEventListener('click', reset)
