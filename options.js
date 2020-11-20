/*eslint-disable no-undef */
//saves options to chrome.storage
function saveOptions() {
    var query = document.getElementById('query').value||"test";
    var proxyUrl = document.getElementById('proxy').value||"https://cors-anywhere.herokuapp.com/";
    var hide = document.getElementById('hide').checked||false;
    chrome.storage.sync.set({
      query,
      proxyUrl,
      hide
    }, function() {
      //update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  }
  
  /*
   * restores select box and checkbox state using the preferences
   * stored in chrome.storage.
   */
  function restoreOptions() {
    //use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        "query": "test",
        "proxyUrl": "https://cors-anywhere.herokuapp.com/",
        "hide": false
    }, function(items) {
      document.getElementById('proxy').value = items.proxyUrl;
      document.getElementById('query').value = items.query;
      document.getElementById('hide').value= items.hide
      document.getElementById('status').textContent="";
    });
  }
  document.addEventListener('DOMContentLoaded', restoreOptions);
  Array.from(document.querySelectorAll("input")).map(x=>x.addEventListener("input",function(){
    document.getElementById('status').textContent="UNSAVED"
  }))
  document.getElementById('save').addEventListener(
    'click',
          saveOptions
    );
    document.getElementById('abandon').addEventListener(
        'click',
              restoreOptions
        );
