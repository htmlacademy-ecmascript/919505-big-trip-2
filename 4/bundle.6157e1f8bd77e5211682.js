(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",d="year",p="date",f="Invalid Date",u=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,o=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:a,d:o,D:p,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$="en",y={};y[$]=v;var g=function(t){return t instanceof D},b=function t(e,n,i){var s;if(!e)return $;if("string"==typeof e){var r=e.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;y[a]=e,s=a}return!i&&s&&($=s),s||!i&&$},M=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},T=_;T.l=b,T.i=g,T.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function v(t){this.$L=b(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(T.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(u);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return T},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return M(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<M(t)},m.$g=function(t,e,n){return T.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,c=!!T.u(e)||e,f=T.p(t),u=function(t,e){var i=T.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(o)},h=function(t,e){return T.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,$="set"+(this.$u?"UTC":"");switch(f){case d:return c?u(1,0):u(31,11);case l:return c?u(1,m):u(0,m+1);case a:var y=this.$locale().weekStart||0,g=(v<y?v+7:v)-y;return u(c?_-g:_+(6-g),m);case o:case p:return h($+"Hours",0);case r:return h($+"Minutes",1);case s:return h($+"Seconds",2);case i:return h($+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var a,c=T.p(t),f="set"+(this.$u?"UTC":""),u=(a={},a[o]=f+"Date",a[p]=f+"Date",a[l]=f+"Month",a[d]=f+"FullYear",a[r]=f+"Hours",a[s]=f+"Minutes",a[i]=f+"Seconds",a[n]=f+"Milliseconds",a)[c],h=c===o?this.$D+(e-this.$W):e;if(c===l||c===d){var v=this.clone().set(p,1);v.$d[u](h),v.init(),this.$d=v.set(p,Math.min(this.$D,v.daysInMonth())).$d}else u&&this.$d[u](h);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[T.p(t)]()},m.add=function(n,c){var p,f=this;n=Number(n);var u=T.p(c),h=function(t){var e=M(f);return T.w(e.date(e.date()+Math.round(t*n)),f)};if(u===l)return this.set(l,this.$M+n);if(u===d)return this.set(d,this.$y+n);if(u===o)return h(1);if(u===a)return h(7);var v=(p={},p[s]=t,p[r]=e,p[i]=1e3,p)[u]||1,m=this.$d.getTime()+n*v;return T.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=T.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,d=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},p=function(t){return T.s(r%12||12,t,"0")},u=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:T.s(a+1,2,"0"),MMM:d(n.monthsShort,a,c,3),MMMM:d(c,a),D:this.$D,DD:T.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:T.s(r,2,"0"),h:p(1),hh:p(2),a:u(r,o,!0),A:u(r,o,!1),m:String(o),mm:T.s(o,2,"0"),s:String(this.$s),ss:T.s(this.$s,2,"0"),SSS:T.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,p,f){var u,h=T.p(p),v=M(n),m=(v.utcOffset()-this.utcOffset())*t,_=this-v,$=T.m(this,v);return $=(u={},u[d]=$/12,u[l]=$,u[c]=$/3,u[a]=(_-m)/6048e5,u[o]=(_-m)/864e5,u[r]=_/e,u[s]=_/t,u[i]=_/1e3,u)[h]||_,f?$:T.a($)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return y[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=b(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return T.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),w=D.prototype;return M.prototype=w,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",d],["$D",p]].forEach((function(t){w[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,D,M),t.$i=!0),M},M.locale=b,M.isDayjs=g,M.unix=function(t){return M(1e3*t)},M.en=y[$],M.Ls=y,M.p={},M}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t="afterbegin";function e(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function i(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}var s=n(484),r=n.n(s);const o=864e5,a=36e5,l="D MMM";function c(t,e="YYYY-MM-DD"){return t?r()(t).format(e):""}function d(t){return t?`${r()(t).format("HH")}:${r()(t).format("mm")}`:""}function p(t){return`${r()(t).format("YY/MM/DD")}&nbsp;${r()(t).format("HH")}:${r()(t).format("mm")}`}function f(t,e){return t.find((t=>t.id===e)).name}class u{constructor({points:t,destinations:e,offers:n}){this.points=t,this.destinations=e,this.offers=n}getTemplate(){return function(t,e,n){const i=function(t,e){let n="";return t.length?1===t.length?f(e,t[0].destination):t.length>3?`${f(e,t[0].destination)}-...-${f(e,t[t.length-1].destination)}`:(t.forEach(((t,i)=>{n+=0===i?f(e,t.destination):`-${f(e,t.destination)}`})),n):""}(t,e),s=function(t,e){let n=0;return t.forEach((t=>{n+=t.basePrice;const i=e.find((e=>e.type===t.type));t.offers.forEach((t=>{n+=i.offers.find((e=>e.id===t)).price}))})),n}(t,n),o=function(t){let e=null,n=null;return t.forEach((t=>{e||(e=t.dateFrom),n||(n=t.dateTo),t.dateFrom<e&&(e=t.dateFrom),t.dateTo>n&&(n=t.dateTo)})),r()(e).format("MMM")===r()(n).format("MMM")?`${r()(e).format("D")}&nbsp;—&nbsp;${r()(n).format(l)}`:`${r()(e).format(l)}&nbsp;—&nbsp;${r()(n).format(l)}`}(t);return`<section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">${i}</h1>\n        <p class="trip-info__dates">${o}</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">${s}</span>\n      </p>\n    </section>`}(this.points,this.destinations,this.offers)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class h{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const v=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];class m{constructor({point:t,offers:e,destinations:n}){this.point=t,this.offers=e,this.destinations=n}getTemplate(){return function(t,e,n){const{id:i,type:s,destination:r,dateFrom:o,dateTo:a,basePrice:l}=t;let c="",d="";const f=n.find((t=>t.id===r));return f&&(d=f.name,(e.length||f.description||f.pictures.length>0)&&(c=function(t,e,n){let i="",s="";return t.length&&(i=function(t,e){const n=t.map((t=>function(t,e){const{id:n,title:i,price:s}=t;return`<div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${i}-${n}" type="checkbox" name="event-offer-${i}" ${e.includes(t.id)?"checked":""}>\n      <label class="event__offer-label" for="event-offer-${i}-${n}">\n        <span class="event__offer-title">${i}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${s}</span>\n      </label>\n    </div>`}(t,e))).join("");return`<section class="event__section  event__section--offers">\n      <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n      <div class="event__available-offers">\n        ${n}\n      </div>\n    </section>`}(t,e)),(n.description||n.pictures.length>0)&&(s=function(t){let e="",n="";return t.description&&(e=`<p class="event__destination-description">${t.description}</p>`),t.pictures.length>0&&(n=`<div class="event__photos-container">\n      <div class="event__photos-tape">\n        ${t.pictures.map((t=>function(t){const{description:e,src:n}=t;return`<img class="event__photo" src=${n} alt=${e.replaceAll(" ","&nbsp;")}/>`}(t))).join("")}\n      </div>\n    </div>`),`<section class="event__section  event__section--destination">\n      <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n      ${e}\n      ${n}\n    </section>`}(n)),`<section class="event__details">\n      ${i}\n      ${s}\n    </section>`}(e,t.offers,f))),`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-${i}">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${s}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${i}" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                ${v.map((t=>function(t,e,n){return`<div class="event__type-item">\n      <input id="event-type-${e}-${t}" class="event__type-input  visually-hidden" type="radio" name="event-type" ${e===n?"checked":""}>\n      <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-${t}">${e}</label>\n    </div>`}(i,t,s))).join("")}\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-${i}">\n              ${s}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-${i}" type="text" name="event-destination" value="${d}" list="destination-list-${i}">\n            <datalist id="destination-list-${i}">\n              ${n.map((t=>function(t){return`<option value=${t}>\n     </option>`}(t.name))).join("")}\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-${i}">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-${i}" type="text" name="event-start-time" value=${""===o?"":p(o)}>\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-${i}">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-${i}" type="text" name="event-end-time" value=${""===a?"":p(a)}>\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-${i}">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-${i}" type="text" name="event-price" value=${l}>\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Cancel</button>\n        </header>\n        ${c}\n      </form>\n    </li>`}(this.point,this.offers,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class _{getTemplate(){return'<ul class="trip-events__list">\n     </ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class ${constructor({point:t,offers:e,destinationName:n}){this.point=t,this.offers=e,this.destinationName=n}getTemplate(){return function(t,e,n){const{type:i,dateFrom:s,dateTo:l,basePrice:p,isFavorite:f}=t,u=f?"event__favorite-btn--active":"";return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${c(s)}">${c(s,"MMM DD")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${i}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${i} ${n}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${c(s)}T${d(s)}">${d(s)}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${c(l)}T${d(l)}">${d(l)}</time>\n          </p>\n          <p class="event__duration">${function(t,e){let n="";const i=r()(t);let s=r()(e).diff(i),l=null,c=null,d=null;if(s>o&&(l=Math.floor(s/o),s-=o*l,n+=`${l}D `),s>=a||l){const t=s/a;c=Math.floor(t),s-=a*c,d=Math.ceil(s/6e4),60===d&&c++,n+=`${0===c?"00":c}H `}return d||(d=Math.ceil(s/6e4)),n+=0!==d&&60!==d||!c?`${d}M`:"00M",n}(s,l)}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${p}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${e.map((t=>function(t){const{title:e,price:n}=t;return`<li class="event__offer">\n      <span class="event__offer-title">${e}</span>\n        &plus;&euro;&nbsp;\n      <span class="event__offer-price">${n}</span>\n    </li>`}(t))).join("")}\n        </ul>\n        <button class="event__favorite-btn ${u}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`}(this.point,this.offers,this.destinationName)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class y{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n      </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const g=[{id:"1",type:"ship",basePrice:7e3,dateFrom:"2024-08-11T12:55:00.845Z",dateTo:"2024-08-11T18:43:00.375Z",destination:"4",isFavorite:!1,offers:["1","3"]},{id:"2",type:"restaurant",basePrice:5400,dateFrom:"2024-08-24T08:30:00.845Z",dateTo:"2024-09-01T12:00:00.375Z",destination:"2",isFavorite:!1,offers:[]},{id:"3",type:"flight",basePrice:2e3,dateFrom:"2024-09-07T23:55:00.845Z",dateTo:"2024-09-08T04:45:00.375Z",destination:"5",isFavorite:!1,offers:["2","3"]},{id:"4",type:"check-in",basePrice:300,dateFrom:"2024-10-04T14:15:00.845Z",dateTo:"2024-10-06T19:30:00.375Z",destination:"7",isFavorite:!1,offers:["1"]},{id:"5",type:"check-in",basePrice:300,dateFrom:"2024-10-04T14:15:00.845Z",dateTo:"2024-10-06T19:30:00.375Z",destination:"6",isFavorite:!1,offers:["1"]},{id:"0",type:"flight",basePrice:0,dateFrom:"",dateTo:"",destination:"",isFavorite:!1,offers:[]},{id:"6",type:"taxi",basePrice:3e3,dateFrom:"2024-07-08T12:55:00.845Z",dateTo:"2024-07-08T13:22:00.375Z",destination:"1",isFavorite:!1,offers:["1","2"]},{id:"7",type:"bus",basePrice:5e3,dateFrom:"2024-10-01T14:24:00.845Z",dateTo:"2024-10-21T16:24:00.375Z",destination:"3",isFavorite:!0,offers:["1","2"]},{id:"8",type:"train",basePrice:5500,dateFrom:"2024-09-16T04:20:00.845Z",dateTo:"2024-09-24T04:40:00.375Z",destination:"2",isFavorite:!1,offers:["1","2","3"]}],b=[{type:"taxi",offers:[{id:"1",title:"Upgrade to a business class",price:120},{id:"2",title:"turn on the radio",price:1200}]},{type:"bus",offers:[{id:"1",title:"Drive fast",price:100},{id:"2",title:"Drive safely",price:12e3}]},{type:"train",offers:[{id:"1",title:"A glass of tea",price:100},{id:"2",title:"Extra pillow",price:400},{id:"3",title:"No passport control",price:4e3}]},{type:"flight",offers:[{id:"1",title:"A cup of coffe",price:100},{id:"2",title:"Pillow",price:400},{id:"3",title:"Blanket",price:500}]},{type:"ship",offers:[{id:"1",title:"Towels",price:150},{id:"2",title:"Breakfast",price:800},{id:"3",title:"Stylish white hat",price:5e3}]},{type:"restaurant",offers:[]},{type:"check-in",offers:[{id:"1",title:"Royal apartment",price:15e3},{id:"2",title:"Breakfast",price:800}]}],M=[{id:"1",name:"Paris",description:"London is the capital of France.",pictures:[{src:"https://loremflickr.com/248/152?random=1241522",description:"Paris parliament building"}]},{id:"2",name:"Chamonix",description:"У этой точки нет офферов, но есть описание и картинка",pictures:[{src:"https://loremflickr.com/248/152?random=3265236",description:"Chamonix parliament building"}]},{id:"3",name:"London",description:"London is the capital of Great Britain.",pictures:[{src:"https://loremflickr.com/248/152?random=158807",description:"A photo of London"}]},{id:"4",name:"Berlin",description:"У этой точки есть и офферы, и описание и картинка",pictures:[{src:"https://loremflickr.com/248/152?random=32552",description:"A photo of Berlin"}]},{id:"5",name:"Madrid",description:"У этой точки нет картинки, но есть офферы и описание",pictures:[]},{id:"6",name:"Zurich",description:"",pictures:[]},{id:"7",name:"Rome",description:"",pictures:[{src:"https://loremflickr.com/248/152?random=43634624212",description:"A photo of Rome-1"},{src:"https://loremflickr.com/248/152?random=462806729",description:"A photo of Rome-2"}]}],T=new class{points=g;destinations=M;offers=b;getPoints(){return this.points}getDestinations(){return this.destinations}getOffers(){return this.offers}getDestinationById(t){return this.destinations.find((e=>e.id===t))}getOfferObjectByPointType(t){return this.offers.find((e=>e.type===t))}getOfferById(t,e){return t.offers.find((t=>t.id===e))}getChosenPointOffers(t,e){const n=this.getOfferObjectByPointType(t);return e.map((t=>this.getOfferById(n,t)))}},D=document.querySelector(".page-header"),w=document.querySelector(".trip-events"),O=D.querySelector(".trip-main"),S=D.querySelector(".trip-controls__filters"),E=new class{constructor({tripInfoContainerElement:t,pointsModel:e}){this.tripInfoContainerElement=t,this.pointsModel=e}init(){this.points=this.pointsModel.getPoints(),this.destinations=this.pointsModel.getDestinations(),this.offers=this.pointsModel.getOffers(),i(new u({points:this.points,destinations:this.destinations,offers:this.offers}),this.tripInfoContainerElement,t)}}({tripInfoContainerElement:O,pointsModel:T}),F=new class{constructor(t){this.pointFilterContainerElement=t}init(){i(new y,this.pointFilterContainerElement,t)}}(S),C=new class{sortingPanelComponent=new h;pointListComponent=new _;constructor({boardContainer:t,pointsModel:e}){this.boardContainer=t,this.pointsModel=e}init(){this.points=this.pointsModel.getPoints(),this.offers=this.pointsModel.getOffers(),this.destinations=this.pointsModel.getDestinations(),i(this.sortingPanelComponent,this.boardContainer),i(this.pointListComponent,this.boardContainer);for(let t=0;t<6;t++)i(new m({point:this.points[t],offers:this.pointsModel.getOfferObjectByPointType(this.points[t].type).offers,destinations:this.destinations}),this.pointListComponent.getElement());for(let t=6;t<this.points.length;t++)i(new $({point:this.points[t],offers:this.pointsModel.getChosenPointOffers(this.points[t].type,this.points[t].offers),destinationName:this.pointsModel.getDestinationById(this.points[t].destination).name}),this.pointListComponent.getElement())}}({boardContainer:w,pointsModel:T});E.init(),F.init(),C.init()})()})();
//# sourceMappingURL=bundle.6157e1f8bd77e5211682.js.map