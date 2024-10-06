(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",c="quarter",d="year",u="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,a=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:o,d:a,D:u,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$="en",y={};y[$]=v;var b=function(t){return t instanceof T},g=function t(e,n,i){var s;if(!e)return $;if("string"==typeof e){var r=e.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;y[o]=e,s=o}return!i&&s&&($=s),s||!i&&$},M=function(t,e){if(b(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new T(n)},w=_;w.l=g,w.i=b,w.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var T=function(){function v(t){this.$L=g(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return w},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return M(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<M(t)},m.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,c=!!w.u(e)||e,p=w.p(t),f=function(t,e){var i=w.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(a)},h=function(t,e){return w.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,$="set"+(this.$u?"UTC":"");switch(p){case d:return c?f(1,0):f(31,11);case l:return c?f(1,m):f(0,m+1);case o:var y=this.$locale().weekStart||0,b=(v<y?v+7:v)-y;return f(c?_-b:_+(6-b),m);case a:case u:return h($+"Hours",0);case r:return h($+"Minutes",1);case s:return h($+"Seconds",2);case i:return h($+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var o,c=w.p(t),p="set"+(this.$u?"UTC":""),f=(o={},o[a]=p+"Date",o[u]=p+"Date",o[l]=p+"Month",o[d]=p+"FullYear",o[r]=p+"Hours",o[s]=p+"Minutes",o[i]=p+"Seconds",o[n]=p+"Milliseconds",o)[c],h=c===a?this.$D+(e-this.$W):e;if(c===l||c===d){var v=this.clone().set(u,1);v.$d[f](h),v.init(),this.$d=v.set(u,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[w.p(t)]()},m.add=function(n,c){var u,p=this;n=Number(n);var f=w.p(c),h=function(t){var e=M(p);return w.w(e.date(e.date()+Math.round(t*n)),p)};if(f===l)return this.set(l,this.$M+n);if(f===d)return this.set(d,this.$y+n);if(f===a)return h(1);if(f===o)return h(7);var v=(u={},u[s]=t,u[r]=e,u[i]=1e3,u)[f]||1,m=this.$d.getTime()+n*v;return w.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,d=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},u=function(t){return w.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:w.s(o+1,2,"0"),MMM:d(n.monthsShort,o,c,3),MMMM:d(c,o),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:w.s(r,2,"0"),h:u(1),hh:u(2),a:f(r,a,!0),A:f(r,a,!1),m:String(a),mm:w.s(a,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,u,p){var f,h=w.p(u),v=M(n),m=(v.utcOffset()-this.utcOffset())*t,_=this-v,$=w.m(this,v);return $=(f={},f[d]=$/12,f[l]=$,f[c]=$/3,f[o]=(_-m)/6048e5,f[a]=(_-m)/864e5,f[r]=_/e,f[s]=_/t,f[i]=_/1e3,f)[h]||_,p?$:w.a($)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return y[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=g(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return w.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),D=T.prototype;return M.prototype=D,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",d],["$D",u]].forEach((function(t){D[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,T,M),t.$i=!0),M},M.locale=g,M.isDayjs=b,M.unix=function(t){return M(1e3*t)},M.en=y[$],M.Ls=y,M.p={},M}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t="afterbegin";function e(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function i(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}class s{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n      </p>\n    </section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var a=n(484),o=n.n(a);const l=864e5,c=36e5;function d(t,e="YYYY-MM-DD"){return t?o()(t).format(e):""}function u(t){return t?`${o()(t).format("HH")}:${o()(t).format("mm")}`:""}function p(t){return`${o()(t).format("YY/MM/DD")}&nbsp;${o()(t).format("HH")}:${o()(t).format("mm")}`}const f=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];class h{constructor({point:t,offers:e,destinations:n}){this.point=t,this.offers=e,this.destinations=n}getTemplate(){return function(t,e,n){const{id:i,type:s,destination:r,dateFrom:a,dateTo:o,basePrice:l}=t;let c=null,d="",u="",h="";const v=p(a),m=p(o),_=f.map((t=>function(t,e,n){return`<div class="event__type-item">\n      <input id="event-type-${e}-${t}" class="event__type-input  visually-hidden" type="radio" name="event-type" ${e===n?"checked":""}>\n      <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-${t}">${e}</label>\n    </div>`}(i,t,s))).join(""),$=n.map((t=>function(t){return`<option value=${t}>\n     </option>`}(t.name))).join(""),y=e.find((t=>t.type===s));return y.offers.length&&(h=function(t){return`<section class="event__section  event__section--offers">\n      <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n      <div class="event__available-offers">\n        ${t.offers.map((t=>function(t){const{id:e,title:n,price:i}=t;return`<div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${n}-${e}" type="checkbox" name="event-offer-${n}" checked>\n      <label class="event__offer-label" for="event-offer-${n}-${e}">\n        <span class="event__offer-title">${n}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${i}</span>\n      </label>\n    </div>`}(t))).join("")}\n      </div>\n    </section>`}(y)),r&&(c=n.find((t=>t.id===r)),d=c.name,u=function(t){const e=t.pictures.map((t=>function(t){const{description:e,src:n}=t;return`<img class="event__photo" src=${n} alt=${e.replaceAll(" ","&nbsp;")}/>`}(t))).join("");return`<section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      <p class="event__destination-description">${t.description}</p>\n\n      <div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${e}\n        </div>\n      </div>\n    </section>`}(c)),`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-${i}">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${s}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${i}" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                ${_}\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-${i}">\n              ${s}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-${i}" type="text" name="event-destination" value="${d}" list="destination-list-${i}">\n            <datalist id="destination-list-${i}">\n              ${$}\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-${i}">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-${i}" type="text" name="event-start-time" value=${v}>\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-${i}">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-${i}" type="text" name="event-end-time" value=${m}>\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-${i}">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-${i}" type="text" name="event-price" value=${l}>\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Cancel</button>\n        </header>\n        <section class="event__details">\n          ${h}\n          ${u}\n        </section>\n      </form>\n    </li>`}(this.point,this.offers,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class v{getTemplate(){return'<ul class="trip-events__list">\n     </ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class m{constructor({point:t,offers:e,destinations:n}){this.point=t,this.offers=e,this.destinations=n}getTemplate(){return function(t,e,n){const{type:i,destination:s,dateFrom:r,dateTo:a,basePrice:p,isFavorite:f}=t,h=n.find((t=>t.id===s)),v=e.find((t=>t.type===i)),m=d(r),_=d(r),$=d(r,"MMM DD"),y=u(r),b=u(a),g=function(t,e){let n="";const i=o()(t);let s=o()(e).diff(i),r=null,a=null,d=null;if(s>l&&(r=Math.floor(s/l),s-=l*r,n+=`${r}D `),s>=c||r){const t=s/c;a=Math.floor(t),s-=c*a,d=Math.ceil(s/6e4),60===d&&a++,n+=`${0===a?"00":a}H `}return d||(d=Math.ceil(s/6e4)),n+=0!==d&&60!==d||!a?`${d}M`:"00M",n}(r,a),M=t.offers.map((t=>function(t){const{title:e,price:n}=t;return`<li class="event__offer">\n      <span class="event__offer-title">${e}</span>\n        &plus;&euro;&nbsp;\n      <span class="event__offer-price">${n}</span>\n    </li>`}(v.offers.find((e=>e.id===t))))).join(""),w=f?"event__favorite-btn--active":"";return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${m}">${$}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${i}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${i} ${h.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${m}T${y}">${y}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${_}T${b}">${b}</time>\n          </p>\n          <p class="event__duration">${g}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${p}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${M}\n        </ul>\n        <button class="event__favorite-btn ${w}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`}(this.point,this.offers,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class _{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n      </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const $=[{id:"1",type:"ship",basePrice:1100,dateFrom:"2024-08-11T12:55:00.845Z",dateTo:"2024-08-11T18:43:00.375Z",destination:"1",isFavorite:!1,offers:["1","2","3"]},{id:"2",type:"ship",basePrice:1100,dateFrom:"2024-08-11T12:55:00.845Z",dateTo:"2024-08-11T18:43:00.375Z",destination:null,isFavorite:!1,offers:["1","2","3"]},{id:"3",type:"restaurant",basePrice:1100,dateFrom:"2024-08-11T12:55:00.845Z",dateTo:"2024-08-11T18:43:00.375Z",destination:"1",isFavorite:!1,offers:["1"]},{id:"4",type:"taxi",basePrice:1100,dateFrom:"2024-07-08T12:55:00.845Z",dateTo:"2024-07-08T13:22:00.375Z",destination:"2",isFavorite:!1,offers:["1","2"]},{id:"5",type:"bus",basePrice:5e3,dateFrom:"2024-10-01T14:24:00.845Z",dateTo:"2024-10-01T16:24:00.375Z",destination:"3",isFavorite:!0,offers:["1","2"]},{id:"6",type:"train",basePrice:3e3,dateFrom:"2024-09-16T04:20:00.845Z",dateTo:"2024-09-24T04:40:00.375Z",destination:"4",isFavorite:!1,offers:["1","2","3"]}],y=[{type:"taxi",offers:[{id:"1",title:"Upgrade to a business class",price:120},{id:"2",title:"turn on the radio",price:1200}]},{type:"bus",offers:[{id:"1",title:"Drive fast",price:100},{id:"2",title:"Drive safely",price:12e3}]},{type:"train",offers:[{id:"1",title:"A glass of tea",price:100},{id:"2",title:"Extra pillow",price:400},{id:"3",title:"No passport control",price:4e3}]},{type:"flight",offers:[{id:"1",title:"A cup of coffe",price:100},{id:"2",title:"Pillow",price:400},{id:"3",title:"Blanket",price:500}]},{type:"ship",offers:[{id:"1",title:"Towels",price:150},{id:"2",title:"Breakfast",price:800},{id:"3",title:"Stylish white hat",price:5e3}]},{type:"restaurant",offers:[]}],b=[{id:"1",name:"Paris",description:"Paris, is a beautiful city, a true asian pearl, with crowded streets.",pictures:[{src:"https://loremflickr.com/248/152?random=1241522",description:"Paris parliament building"}]},{id:"2",name:"Chamonix",description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",pictures:[{src:"https://loremflickr.com/248/152?random=3265236",description:"Chamonix parliament building"}]},{id:"3",name:"London",description:"London is the capital of Great Britain.",pictures:[{src:"https://loremflickr.com/248/152?random=158807",description:"A photo of London"}]},{id:"4",name:"Berlin",description:"Berlin is the capital of Germany.",pictures:[{src:"https://loremflickr.com/248/152?random=32552",description:"A photo of Berlin"}]}],g=new class{points=$;destinations=b;offers=y;getPoints(){return this.points}getDestinations(){return this.destinations}getOffers(){return this.offers}},M=document.querySelector(".page-header"),w=document.querySelector(".trip-events"),T=M.querySelector(".trip-main"),D=M.querySelector(".trip-controls__filters"),S=new class{constructor(t){this.tripInfoContainerElement=t}init(){i(new s,this.tripInfoContainerElement,t)}}(T),C=new class{constructor(t){this.pointFilterContainerElement=t}init(){i(new _,this.pointFilterContainerElement,t)}}(D),E=new class{sortingPanelComponent=new r;pointListComponent=new v;constructor({boardContainer:t,pointsModel:e}){this.boardContainer=t,this.pointsModel=e}init(){this.points=this.pointsModel.getPoints(),this.offers=this.pointsModel.getOffers(),this.destinations=this.pointsModel.getDestinations(),i(this.sortingPanelComponent,this.boardContainer),i(this.pointListComponent,this.boardContainer),i(new h({point:this.points[0],offers:this.offers,destinations:this.destinations}),this.pointListComponent.getElement()),i(new h({point:this.points[1],offers:this.offers,destinations:this.destinations}),this.pointListComponent.getElement()),i(new h({point:this.points[2],offers:this.offers,destinations:this.destinations}),this.pointListComponent.getElement());for(let t=3;t<this.points.length;t++)i(new m({point:this.points[t],offers:this.offers,destinations:this.destinations}),this.pointListComponent.getElement())}}({boardContainer:w,pointsModel:g});S.init(),C.init(),E.init()})()})();
//# sourceMappingURL=bundle.dd2bc3bed454ded24f90.js.map