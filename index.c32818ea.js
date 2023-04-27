function t(t,e,s,n){Object.defineProperty(t,e,{get:s,set:n,enumerable:!0,configurable:!0})}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},n={},i=e.parcelRequiredcfc;null==i&&((i=function(t){if(t in s)return s[t].exports;if(t in n){var e=n[t];delete n[t];var i={id:t,exports:{}};return s[t]=i,e.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(t,e){n[t]=e},e.parcelRequiredcfc=i),i.register("27Lyk",(function(e,s){var n,i;t(e.exports,"register",(()=>n),(t=>n=t)),t(e.exports,"resolve",(()=>i),(t=>i=t));var r={};n=function(t){for(var e=Object.keys(t),s=0;s<e.length;s++)r[e[s]]=t[e[s]]},i=function(t){var e=r[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),i("27Lyk").register(JSON.parse('{"gpNS7":"index.c32818ea.js","2pwhO":"check.ec9e8a8a.svg","j81vF":"cross.410ab416.svg"}'));var r;r=new URL(i("27Lyk").resolve("2pwhO"),import.meta.url).toString();const o=new URL(r).href;var a;a=new URL(i("27Lyk").resolve("j81vF"),import.meta.url).toString();const c=new URL(a).href,l=document.getElementById("start-box"),d=document.getElementById("start-game"),h=[...document.querySelectorAll("input[type='checkbox']")],u=document.getElementById("quizbox"),m=document.getElementById("question"),p=document.getElementById("answer-options"),g=[...p.children],f=document.getElementById("flagImage"),y=document.getElementById("next"),v=document.getElementById("results"),L=document.getElementById("resultsTitle"),w=document.getElementById("resultsCount"),b=document.getElementById("try-again"),E=document.getElementById("timer"),k=new Image;k.src=o,k.classList.add("absolute","top-0","right-2","bottom-0","my-auto");const x=new Image;x.src=c,x.classList.add("absolute","right-2","top-0","bottom-0","my-auto");class C{constructor(t,e,s){this.question=t,this.scoreCount=e,this.timer=s,this.paintResults=this.paintResults.bind(this),this.addEventListeners(),this.paintResetQuizbox()}paintStartScreen(){l.classList.remove("hidden"),u.classList.add("hidden"),v.classList.add("hidden"),this.timer.reset()}paintResetQuizbox(){l.classList.add("hidden"),g.forEach((t=>{t.classList.remove("Correct","Wrong")})),p.classList.remove("pointer-events-none"),u.classList.remove("hidden"),v.classList.add("hidden"),f.classList.add("hidden"),y.classList.add("hidden"),this.paintQuestion(),this.timer.start(this.paintResults)}paintResults(t){u.classList.add("hidden"),v.classList.remove("hidden"),L.innerText=t,w.innerHTML=`You got <span class="text-green-600 text-xl">${this.scoreCount.get()}</span> correct answers.`}paintAnswerClick(t,e){if("correct"===e)return t.classList.add("Correct"),void t.appendChild(k);t.classList.add("Wrong"),t.appendChild(x);const s=g.find((t=>t.innerHTML==this.question.country.name.common||t.innerHTML==this.question.country.capital[0]));s.classList.add("Correct"),s.appendChild(k)}paintQuestion(){m.innerText=this.question.title,"flag"===this.question.type&&(f.src=this.question.country.flags.png,f.classList.replace("hidden","block")),"flag"!==this.question.type&&"country"!==this.question.type||g.forEach(((t,e)=>{t.innerHTML=this.question.answers[e].name.common})),"capital"===this.question.type&&g.forEach(((t,e)=>{t.innerHTML=this.question.answers[e].capital[0]}))}addEventListeners(){const t=new AbortController;p.addEventListener("click",(t=>{const e=t.target;if(e===p)return;this.timer.stop(),p.classList.add("pointer-events-none");const s=this.question.check(e);s?(this.paintAnswerClick(e,"correct"),y.classList.remove("hidden")):(this.paintAnswerClick(e,"wrong"),setTimeout((()=>{this.paintResults("Game Over")}),2500)),s&&this.scoreCount.sum()}),{signal:t.signal}),y.addEventListener("click",(()=>{this.question.makeNewQuestion(),this.paintResetQuizbox()}),{signal:t.signal}),b.addEventListener("click",(()=>{t.abort(),this.paintStartScreen()}),{once:!0})}}const R=(t,e)=>Math.floor(Math.random()*(e-t+1)+t);class T{constructor(t){this.regions=t,this.data=null,this.previousRegions=this.loadArray("previousRegions")||[]}saveArray(t,e){const s=JSON.stringify(e);sessionStorage.setItem(t,s)}loadArray(t){const e=sessionStorage.getItem(t);if(!e)return null;return JSON.parse(e)}async fetch(){const t=`https://restcountries.com/v3.1/region/${this.regions[R(0,this.regions.length-1)]}?fields=name,capital,flags,subregion`;console.log("fetched");try{const e=await fetch(t),s=await e.json();this.data=s,this.saveArray("previousRegions",this.regions),this.saveArray("data",s)}catch(t){console.error(t)}}}const _=["country","capital","flag"];class I{constructor(t){this.data=t,this.country=this.selectCountry(this.data),this.answers=this.makeAnswers(this.country,this.data),this.type=_[R(0,2)],this.title=this.makeQuestionTitle(this.country,this.type)}selectCountry(t){return t[R(0,t.length-1)]}makeQuestionTitle(t,e){return"country"===e?`${t.capital[0]} is the Capital of...`:"capital"===e?`The Capital of ${t.name.common} is...`:"Which country does this flag belong to..?"}makeAnswers(t,e){const s=e.filter((e=>e.name.common!==t.name.common&&e.subregion===t.subregion));for(;s.length>3;)s.splice(R(0,s.length),1);return s.splice(R(0,3),0,t),s}makeNewQuestion(){this.country=this.selectCountry(this.data),this.answers=this.makeAnswers(this.country,this.data),this.title=this.makeQuestionTitle(this.country,this.type)}check(t){const e=t.innerText;if("country"===this.type||"flag"===this.type){return e===this.country.name.common}return e===this.country.capital[0]}}class S{constructor(){this._correctCount=0}sum(){return this._correctCount+=1}get(){return this._correctCount}}class q{constructor(){this._secondsLeft=15,this._interval=0}start(t){this.reset(),this._interval=setInterval((()=>{this._secondsLeft--,E.innerText=this._secondsLeft.toString(),0===this._secondsLeft&&(this.stop(),t("Time's Up!"))}),1e3)}stop(){this._interval&&clearInterval(this._interval)}reset(){this.stop(),this._secondsLeft=15,E.innerText=this._secondsLeft.toString()}}d.addEventListener("click",(()=>{const t=h.filter((t=>t.checked));if(!t)return;(async t=>{const e=new T(t);var s,n;if(s=t,n=e.previousRegions,s.join()===n.join()?e.data=e.loadArray("data"):await e.fetch(),!e.data)return;const i=new I(e.data),r=new S,o=new q;new C(i,r,o)})(t.map((t=>t.nextElementSibling.innerText))),t.forEach((t=>t.checked=!1))}));
//# sourceMappingURL=index.c32818ea.js.map
