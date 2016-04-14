var binder={set:function(a,b){var c=document.getElementById(a);c&&(c.textContent=b)},bind:function(a,b){this.__variables[b]=a,this.set(a,b)},__variables:{}},page=0,paused=!1;document.getElementById("prev").addEventListener("click",function(){0!==page&&gotoPage(page-1)}),document.getElementById("next").addEventListener("click",function(){2!==page&&gotoPage(page+1)});var gotoPage=function(a){page=a,document.getElementById("book").setAttribute("style","margin-left:-"+100*a+"vw")},players=[],grabbed=[],buzzer=new Audio("sounds/buzzer-long.mp3"),touhou=new Audio("sounds/2hu.mp3"),bloop=new Audio("sounds/bloop.mp3");buzzer.load(),touhou.load(),bloop.load();var selectPlayers=function(){for(var a=document.getElementsByClassName("safe"),b=0;b<a.length;b++){var c=parseInt(a[b].dataset["char"]);-1===players.indexOf(c)?a[b].setAttribute("style","display:none"):a[b].removeAttribute("style")}};binder.bind("numPlayers",0);var togglePlayer=function(a){var b=parseInt(a.dataset["char"]);-1===players.indexOf(b)?(a.innerHTML='<img class="selected" src="img/selected.png" />',players.push(b)):(a.innerHTML="",players.splice(players.indexOf(b),1)),binder.set("numPlayers",players.length)};document.getElementById("select").addEventListener("click",function(a){a.target&&a.target.dataset["char"]&&togglePlayer(a.target)}),document.getElementById("play").addEventListener("click",function(){players.length<2||(gotoPage(1),selectPlayers(),countdown(),buzzer.pause(),buzzer.currentTime=0)}),document.getElementById("cancel").addEventListener("click",function(){paused||(touhou.pause(),resetRound())}),document.getElementById("safe").addEventListener("touchstart",function(a){if(a.target&&a.target.dataset["char"]&&tokenGrab(a.target),grabbed.length===players.length-1)for(var b=0;b<players.length;b++)if(-1===grabbed.indexOf(players[b])){damagePlayer(players[b]);break}}),binder.bind("cdown",0);var countdown=function(){document.getElementById("countdown").setAttribute("style","display:block"),function a(b){0===b?(document.getElementById("countdown").removeAttribute("style"),touhou.currentTime=Math.floor(450*Math.random()+1),touhou.play()):(bloop.play(),binder.set("cdown",b),setTimeout(function(){a(b-1)},1e3))}(3)},tokenGrab=function(a){if(!paused){var b=parseInt(a.dataset["char"]);-1===grabbed.indexOf(b)?(a.innerHTML='<img class="selected" src="img/haste.png" />',grabbed.push(b)):(grabbed.splice(grabbed.indexOf(b),1),a.innerHTML="")}},damagePlayer=function(a){var b=document.getElementsByClassName("safe");touhou.pause(),buzzer.play(),paused=!0;for(var c=0;c<b.length;c++)b[c].dataset["char"]==a&&(b[c].innerHTML='<img class="selected" src="img/hit.gif" />');setTimeout(resetRound,1500)},resetRound=function(){for(var a=document.getElementsByClassName("safe"),b=0;b<a.length;b++)a[b].innerHTML="";grabbed=[],paused=!1,gotoPage(0)};