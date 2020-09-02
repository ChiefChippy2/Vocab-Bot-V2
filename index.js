function lol(){

var si= document.querySelector('#spellit')
var go = document.querySelector('#nextword')
var q=document.getElementsByClassName('def')
var inp= document.querySelector('#guessWord')

for(var i =0;i<q.length;i++){
var a = q[i].innerText.replace(/"/g,"")
if(a=="make ______"){inp.value="lengthen";break;}
if(local[a]!=undefined){
inp.value=local[a];break;}}
si.click()
setTimeout(function(){go.click()},2)

if(document.getElementsByClassName("remaining")[0].innerText=="0"){document.querySelector('#bee_complete > div.actions > button').click();document.querySelector('#bee_complete > div.actions > button').disabled=true;}
}

var local=JSON.parse(localStorage.getItem("js"))
if(local!=undefined){setInterval(lol,5)
setTimeout(function(){document.querySelector('#bee_complete > div.actions > button').click()},150000)}else{
var xhr = new XMLHttpRequest();
xhr.open('POST', '', true);

// If specified, responseType must be empty string or "text"
xhr.responseType = 'text';

xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            //console.log(xhr.response);
            localStorage.setItem("js",xhr.responseText);
        }
    }
};

xhr.send(null);

}
window.confirm=function(){return true;}
var s = document.createElement('script');
s.innerHTML = "window.confirm= function(){return true;}"
document.body.appendChild(s);
document.body.insertAdjacentHTML('afterbegin','<div id="over" style="background-color: black; color:white; z-index: 999999;display:block;height:100%;top: 0; left: 0;right: 0;bottom: 0;position:fixed"></div>');
document.getElementById('over').innerText=document.getElementsByClassName('points')[0].innerText
document.body.style.display="none"
