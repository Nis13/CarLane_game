var d=Object.defineProperty;var g=(a,t,i)=>t in a?d(a,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[t]=i;var e=(a,t,i)=>(g(a,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const h of s)if(h.type==="childList")for(const r of h.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const h={};return s.integrity&&(h.integrity=s.integrity),s.referrerPolicy&&(h.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?h.credentials="include":s.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function n(s){if(s.ep)return;s.ep=!0;const h=i(s);fetch(s.href,h)}})();const l={CANVAS_WIDTH:700,CANVAS_HEIGHT:window.innerHeight},c=20;function p(a,t,i){a.fillStyle="white",a.fillRect(i.width/3,t%i.height,20,90),a.fillRect(2*i.width/3,t%i.height,20,90),a.fillRect(i.width/3,(t+i.height/2)%i.height,20,90),a.fillRect(2*i.width/3,(t+i.height/2)%i.height,20,90)}class w{constructor(t,i,n,s,h,r,o){e(this,"ctx");e(this,"canvas");e(this,"x");e(this,"y");e(this,"width");e(this,"height");e(this,"image");this.ctx=t,this.canvas=i,this.x=n,this.y=s,this.width=h,this.height=r,this.image=new Image,this.image.src=o}drawCar(){this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height)}moveLeft(){this.x>this.canvas.width/3-this.width/2&&(this.x-=this.canvas.width/3)}moveRight(){this.x<this.canvas.width/3*2-this.width/2&&(this.x+=this.canvas.width/3)}resetPosition(){this.x=this.canvas.width/2-this.width/2,this.y=this.canvas.height-this.height}}class m{constructor(t,i,n,s,h,r=0,o=0){e(this,"ctx");e(this,"canvas");e(this,"x");e(this,"y");e(this,"width");e(this,"height");e(this,"image");e(this,"isVisible");this.ctx=t,this.canvas=i,this.width=n,this.height=s,this.x=r,this.y=o,this.image=new Image,this.image.src=h,this.isVisible=!0,this.resetPosition()}drawCar(){this.isVisible&&this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height)}update(t){this.y+=t}hide(){this.isVisible=!1}show(){this.isVisible=!0}resetPosition(){this.y=-this.height,this.x=this.randomXPosition()}randomXPosition(){const t=this.canvas.width/3;return Math.floor(Math.random()*3)*t+(t-this.width)/2}}class y{constructor(){e(this,"canvas");e(this,"ctx");e(this,"playerCar");e(this,"opponentCars");e(this,"animationId");e(this,"highwayHeight");e(this,"gameoverFlag");e(this,"score");e(this,"enemyCarSpeed");e(this,"counter");e(this,"spawnInterval");e(this,"spawnIntervalId");e(this,"draw",()=>{this.gameoverFlag||(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.playerCar.drawCar(),this.opponentCars.forEach(t=>{const i=t.y>this.canvas.height;t.update(this.enemyCarSpeed),t.drawCar(),this.playerCar.x<t.x+t.width&&this.playerCar.x+this.playerCar.width>t.x&&this.playerCar.y<t.y+t.height&&this.playerCar.y+this.playerCar.height>t.y&&(console.log("Collision detected!"),this.gameover()),i&&(this.score+=10,t.resetPosition())}),p(this.ctx,this.highwayHeight,this.canvas),this.highwayHeight+=c,this.displayScore(),this.increaseDifficulty(),this.animationId=requestAnimationFrame(this.draw))});this.canvas=document.querySelector("#gameCanvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.height=l.CANVAS_HEIGHT,this.canvas.width=l.CANVAS_WIDTH,this.highwayHeight=this.canvas.height/3;const t=this.canvas.width/6,i=this.canvas.height/4,n="./player-car.png";this.gameoverFlag=!1,this.animationId=0,this.score=0,this.enemyCarSpeed=c,this.counter=0,this.spawnInterval=3e3,this.playerCar=new w(this.ctx,this.canvas,this.canvas.width/2-t/2,this.canvas.height-i,t,i,n),this.opponentCars=[],this.init()}init(){this.highwayHeight=this.canvas.height/3,this.gameoverFlag=!1,window.addEventListener("keydown",this.onKeyDown.bind(this)),this.animationId=requestAnimationFrame(this.draw),this.spawnIntervalId=setInterval(this.spawnOpponentCar.bind(this),this.spawnInterval)}displayScore(){this.gameoverFlag||(this.ctx.fillStyle="white",this.ctx.font="20px Arial",this.ctx.fillText(`Score: ${this.score}`,50,30))}increaseDifficulty(){this.counter++,this.counter==2e3&&(this.enemyCarSpeed+=1),this.counter==4e3&&(this.enemyCarSpeed+=2),this.counter==8e3&&(this.enemyCarSpeed+=4),this.counter==1e4&&(this.enemyCarSpeed+=5)}spawnOpponentCar(){const t=this.canvas.width/6,i=this.canvas.height/4,n="./opponent-car.png",s=i+this.playerCar.height;if(this.opponentCars.length===0||this.opponentCars[this.opponentCars.length-1].y>this.canvas.height-s){const h=new m(this.ctx,this.canvas,t,i,n);h.x=h.randomXPosition(),h.y=-i,this.opponentCars.push(h)}}gameover(){this.gameoverFlag=!0,cancelAnimationFrame(this.animationId),this.spawnIntervalId&&clearInterval(this.spawnIntervalId),this.opponentCars.forEach(h=>h.hide()),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="rgba(0, 0, 0, 0.9)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);const t=this.canvas.width,i=this.canvas.height/2,n=(this.canvas.width-t)/2,s=(this.canvas.height-i)/2;this.ctx.fillStyle="white",this.ctx.fillRect(n,s,t,i),this.ctx.strokeStyle="black",this.ctx.strokeRect(n,s,t,i),this.ctx.fillStyle="black",this.ctx.font="bold 36px Arial",this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.fillText("Game Over",this.canvas.width/2,this.canvas.height/2),this.ctx.font="24px Arial",this.ctx.fillText(`Score: ${this.score}`,this.canvas.width/2,this.canvas.height/2+50),this.ctx.font="20px Arial",this.ctx.fillText("Press Space to start",this.canvas.width/2,this.canvas.height/2+100),this.ctx.fillText("the game",this.canvas.width/2,this.canvas.height/2+150)}onKeyDown(t){switch(t.key){case"ArrowLeft":case"a":this.playerCar.moveLeft();break;case"ArrowRight":case"d":this.playerCar.moveRight();break;case" ":this.gameoverFlag&&this.restart();break}}restart(){this.gameoverFlag=!1,this.score=0,this.counter=0,this.enemyCarSpeed=c,this.playerCar.resetPosition(),this.highwayHeight=this.canvas.height/3,this.opponentCars=[],this.spawnIntervalId=setInterval(this.spawnOpponentCar.bind(this),this.spawnInterval),this.animationId=requestAnimationFrame(this.draw)}}document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("startPage"),t=document.getElementById("startButton"),i=document.getElementById("gameCanvas");i.style.display="none",t.addEventListener("click",()=>{a.style.display="none",i.style.display="block",new y})});
