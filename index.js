


function lol(){

var si= document.querySelector('#spellit')
var go = document.querySelector('#nextword')
var q=document.getElementsByClassName('def')
var inp= document.querySelector('#guessWord')
var resolved=false;
for(var i =0;i<q.length;i++){
var a = q[i].innerText.replace(/"/g,"")
var resp=local[a]||local[Object.keys(local).map(x=>x.replace(/^[a-z0-9]/gi,"")).find(x=>x==a.replace(/^[a-z0-9]/gi,""))];
if(resp){
inp.value=resp;resolved=true;break;}

}
if(!resolved) return learn(inp,si)
si.click()
setTimeout(function(){go.click()},2)

if(document.getElementsByClassName("remaining")[0].innerText=="0"){
localStorage.setItem("js2","")
    nextBee()
}
}
if(!localStorage.getItem("js2")||typeof localStorage.getItem("js2")!="object") nextBee();
var local=JSON.parse(localStorage.getItem("js2"))
if(local!=undefined){setInterval(lol,5)
setTimeout(function(){document.querySelector('#bee_complete > div.actions > button').click()},150000)
                    }else{
nextBee();
}

if(document.getElementsByClassName("remaining")[0].innerText=="0"&&location.href.endsWith("bee")){
localStorage.setItem("js2","")
    nextBee()
}
function nextBee(){
    var num=JSON.parse(localStorage.getItem("doneLists"))
    if(!num) num=[]
    
    fetch("https://cors-anywhere.herokuapp.com/"+encodeURI("https://api.vocabulary.com/1.0/lists/?q=test&skip="+num.length+"&limit=10"), {
    "headers": {
        "User-Agent": navigator.userAgent,
        "Accept": "application/json",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    },
    "referrer": "https://api.vocabulary.com/proxy.html",
    "method": "GET"
}).then(r=>r.json()).then(e=>{
e=e.wordlists
    var link= e.find(e=>!num.includes(e.id));
        if(!link) {num.concat(e.map(e=>e.id));localStorage.setItem("doneLists",JSON.stringify(num));return nextBee();}
        num.push(link.id)
        localStorage.setItem("doneLists",JSON.stringify(num))
        prepareList(link.url)
    
    
    })


}
var islearning=false;
function learn(inp,si){
//we somehow have no idea what this word means.
    if(islearning) return;
    islearning=true
   inp.value="idk";
    var surrender=document.querySelector("#surrender")
   si.click();
   var int=setInterval(()=>{si.click()
                           if(!surrender.disabled){
                           clearInterval(int);
                               surrender.click();
                               setTimeout(()=>{
                               
                               local[document.getElementsByClassName('def')[0].innerText.replace(/"/g,"")]=document.querySelector("#correctspelling").innerText.split(":")[1].trim()
                               document.querySelector('#nextword').click();
                                   islearning=false;
                               },500)
                           }
                           
                           },50)
   

}
function prepareList(url){
fetch(url,{
    "headers": {
        "User-Agent": navigator.userAgent,
        "Accept": "text/html"
    },
    "referrer": "https://www.vocabulary.com/lists/search?query=test",
    "method": "GET"}).then(e=>e.text())
    .then(resp=>{
var fdoc=new DOMParser().parseFromString(resp,"text/html")
var loc={};
Array.from(fdoc.querySelector("#wordlist").querySelectorAll("li")).forEach(x=>loc[x.querySelector(".definition").innerText]=x.getAttribute("word"))
    localStorage.setItem("js2",JSON.stringify(loc))

    location.href=url+"/bee"
    
})





}


