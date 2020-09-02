var answers={};


function lol(){

var si= document.querySelector('#spellit')
var go = document.querySelector('#nextword')
var q=document.getElementsByClassName('def')
var inp= document.querySelector('#guessWord')
var resolved=false;
for(var i =0;i<q.length;i++){
var a = q[i].innerText.replace(/"/g,"")
let resp=local[a]||local[Object.keys(local).map(x=>x.replace(/^[a-z0-9]/gi,"")).find(x=>x==a.replace(/^[a-z0-9]/gi,"")];
if(local[a]){
inp.value=local[a];resolved=true;break;}

}
if(!resolved) return learn()
si.click()
setTimeout(function(){go.click()},2)

if(document.getElementsByClassName("remaining")[0].innerText=="0"){
    nextBee()
}

var local=JSON.parse(localStorage.getItem("js"))
if(local!=undefined){setInterval(lol,5)
setTimeout(function(){document.querySelector('#bee_complete > div.actions > button').click()},150000)
                    }else{
nextBee();
}

nextBee();

function nextBee(){
    var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.vocabulary.com/lists/search?query=test', true);

// If specified, responseType must be empty string or "text"
xhr.responseType = 'text';

xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
            //console.log(xhr.response);document.querySelector(".search-results.lists")
            answer=xhr.responseText
        }
    }
};

xhr.send(null);

}
