(()=>{"use strict";function t(t){return Array.isArray?Array.isArray(t):"[object Array]"===c(t)}function e(t){return"string"==typeof t}function n(t){return"number"==typeof t}function r(t){return"object"==typeof t}function s(t){return null!=t}function i(t){return!t.trim().length}function c(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const o=t=>`Missing ${t} property in key`,a=t=>`Property 'weight' in key '${t}' must be a positive integer`,h=Object.prototype.hasOwnProperty;class l{constructor(t){this._keys=[],this._keyMap={};let e=0;t.forEach((t=>{let n=u(t);e+=n.weight,this._keys.push(n),this._keyMap[n.id]=n,e+=n.weight})),this._keys.forEach((t=>{t.weight/=e}))}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function u(n){let r=null,s=null,i=null,c=1,l=null;if(e(n)||t(n))i=n,r=d(n),s=g(n);else{if(!h.call(n,"name"))throw new Error(o("name"));const t=n.name;if(i=t,h.call(n,"weight")&&(c=n.weight,c<=0))throw new Error(a(t));r=d(t),s=g(t),l=n.getFn}return{path:r,id:s,weight:c,src:i,getFn:l}}function d(e){return t(e)?e:e.split(".")}function g(e){return t(e)?e.join("."):e}var f={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,useExtendedSearch:!1,getFn:function(i,o){let a=[],h=!1;const l=(i,o,u)=>{if(s(i))if(o[u]){const d=i[o[u]];if(!s(d))return;if(u===o.length-1&&(e(d)||n(d)||function(t){return!0===t||!1===t||function(t){return r(t)&&null!==t}(t)&&"[object Boolean]"==c(t)}(d)))a.push(function(t){return null==t?"":function(t){if("string"==typeof t)return t;let e=t+"";return"0"==e&&1/t==-1/0?"-0":e}(t)}(d));else if(t(d)){h=!0;for(let t=0,e=d.length;t<e;t+=1)l(d[t],o,u+1)}else o.length&&l(d,o,u+1)}else a.push(i)};return l(i,e(o)?o.split("."):o,0),h?a:a[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};const m=/[^ ]+/g;class p{constructor({getFn:t=f.getFn,fieldNormWeight:e=f.fieldNormWeight}={}){this.norm=function(t=1,e=3){const n=new Map,r=Math.pow(10,e);return{get(e){const s=e.match(m).length;if(n.has(s))return n.get(s);const i=1/Math.pow(s,.5*t),c=parseFloat(Math.round(i*r)/r);return n.set(s,c),c},clear(){n.clear()}}}(e,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach(((t,e)=>{this._keysMap[t.id]=e}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,e(this.docs[0])?this.docs.forEach(((t,e)=>{this._addString(t,e)})):this.docs.forEach(((t,e)=>{this._addObject(t,e)})),this.norm.clear())}add(t){const n=this.size();e(t)?this._addString(t,n):this._addObject(t,n)}removeAt(t){this.records.splice(t,1);for(let e=t,n=this.size();e<n;e+=1)this.records[e].i-=1}getValueForItemAtKeyId(t,e){return t[this._keysMap[e]]}size(){return this.records.length}_addString(t,e){if(!s(t)||i(t))return;let n={v:t,i:e,n:this.norm.get(t)};this.records.push(n)}_addObject(n,r){let c={i:r,$:{}};this.keys.forEach(((r,o)=>{let a=r.getFn?r.getFn(n):this.getFn(n,r.path);if(s(a))if(t(a)){let n=[];const r=[{nestedArrIndex:-1,value:a}];for(;r.length;){const{nestedArrIndex:c,value:o}=r.pop();if(s(o))if(e(o)&&!i(o)){let t={v:o,i:c,n:this.norm.get(o)};n.push(t)}else t(o)&&o.forEach(((t,e)=>{r.push({nestedArrIndex:e,value:t})}))}c.$[o]=n}else if(e(a)&&!i(a)){let t={v:a,n:this.norm.get(a)};c.$[o]=t}})),this.records.push(c)}toJSON(){return{keys:this.keys,records:this.records}}}function y(t,e,{getFn:n=f.getFn,fieldNormWeight:r=f.fieldNormWeight}={}){const s=new p({getFn:n,fieldNormWeight:r});return s.setKeys(t.map(u)),s.setSources(e),s.create(),s}function M(t,{errors:e=0,currentLocation:n=0,expectedLocation:r=0,distance:s=f.distance,ignoreLocation:i=f.ignoreLocation}={}){const c=e/t.length;if(i)return c;const o=Math.abs(r-n);return s?c+o/s:o?1:c}const x=32;function v(t){let e={};for(let n=0,r=t.length;n<r;n+=1){const s=t.charAt(n);e[s]=(e[s]||0)|1<<r-n-1}return e}class L{constructor(t,{location:e=f.location,threshold:n=f.threshold,distance:r=f.distance,includeMatches:s=f.includeMatches,findAllMatches:i=f.findAllMatches,minMatchCharLength:c=f.minMatchCharLength,isCaseSensitive:o=f.isCaseSensitive,ignoreLocation:a=f.ignoreLocation}={}){if(this.options={location:e,threshold:n,distance:r,includeMatches:s,findAllMatches:i,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:a},this.pattern=o?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const h=(t,e)=>{this.chunks.push({pattern:t,alphabet:v(t),startIndex:e})},l=this.pattern.length;if(l>x){let t=0;const e=l%x,n=l-e;for(;t<n;)h(this.pattern.substr(t,x),t),t+=x;if(e){const t=l-x;h(this.pattern.substr(t),t)}}else h(this.pattern,0)}searchIn(t){const{isCaseSensitive:e,includeMatches:n}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let e={isMatch:!0,score:0};return n&&(e.indices=[[0,t.length-1]]),e}const{location:r,distance:s,threshold:i,findAllMatches:c,minMatchCharLength:o,ignoreLocation:a}=this.options;let h=[],l=0,u=!1;this.chunks.forEach((({pattern:e,alphabet:d,startIndex:g})=>{const{isMatch:m,score:p,indices:y}=function(t,e,n,{location:r=f.location,distance:s=f.distance,threshold:i=f.threshold,findAllMatches:c=f.findAllMatches,minMatchCharLength:o=f.minMatchCharLength,includeMatches:a=f.includeMatches,ignoreLocation:h=f.ignoreLocation}={}){if(e.length>x)throw new Error("Pattern length exceeds max of 32.");const l=e.length,u=t.length,d=Math.max(0,Math.min(r,u));let g=i,m=d;const p=o>1||a,y=p?Array(u):[];let v;for(;(v=t.indexOf(e,m))>-1;){let t=M(e,{currentLocation:v,expectedLocation:d,distance:s,ignoreLocation:h});if(g=Math.min(t,g),m=v+l,p){let t=0;for(;t<l;)y[v+t]=1,t+=1}}m=-1;let L=[],k=1,b=l+u;const E=1<<l-1;for(let r=0;r<l;r+=1){let i=0,o=b;for(;i<o;)M(e,{errors:r,currentLocation:d+o,expectedLocation:d,distance:s,ignoreLocation:h})<=g?i=o:b=o,o=Math.floor((b-i)/2+i);b=o;let a=Math.max(1,d-o+1),f=c?u:Math.min(d+o,u)+l,x=Array(f+2);x[f+1]=(1<<r)-1;for(let i=f;i>=a;i-=1){let c=i-1,o=n[t.charAt(c)];if(p&&(y[c]=+!!o),x[i]=(x[i+1]<<1|1)&o,r&&(x[i]|=(L[i+1]|L[i])<<1|1|L[i+1]),x[i]&E&&(k=M(e,{errors:r,currentLocation:c,expectedLocation:d,distance:s,ignoreLocation:h}),k<=g)){if(g=k,m=c,m<=d)break;a=Math.max(1,2*d-m)}}if(M(e,{errors:r+1,currentLocation:d,expectedLocation:d,distance:s,ignoreLocation:h})>g)break;L=x}const I={isMatch:m>=0,score:Math.max(.001,k)};if(p){const t=function(t=[],e=f.minMatchCharLength){let n=[],r=-1,s=-1,i=0;for(let c=t.length;i<c;i+=1){let c=t[i];c&&-1===r?r=i:c||-1===r||(s=i-1,s-r+1>=e&&n.push([r,s]),r=-1)}return t[i-1]&&i-r>=e&&n.push([r,i-1]),n}(y,o);t.length?a&&(I.indices=t):I.isMatch=!1}return I}(t,e,d,{location:r+g,distance:s,threshold:i,findAllMatches:c,minMatchCharLength:o,includeMatches:n,ignoreLocation:a});m&&(u=!0),l+=p,m&&y&&(h=[...h,...y])}));let d={isMatch:u,score:u?l/this.chunks.length:1};return u&&n&&(d.indices=h),d}}class k{constructor(t){this.pattern=t}static isMultiMatch(t){return b(t,this.multiRegex)}static isSingleMatch(t){return b(t,this.singleRegex)}search(){}}function b(t,e){const n=t.match(e);return n?n[1]:null}class E extends k{constructor(t,{location:e=f.location,threshold:n=f.threshold,distance:r=f.distance,includeMatches:s=f.includeMatches,findAllMatches:i=f.findAllMatches,minMatchCharLength:c=f.minMatchCharLength,isCaseSensitive:o=f.isCaseSensitive,ignoreLocation:a=f.ignoreLocation}={}){super(t),this._bitapSearch=new L(t,{location:e,threshold:n,distance:r,includeMatches:s,findAllMatches:i,minMatchCharLength:c,isCaseSensitive:o,ignoreLocation:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class I extends k{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e,n=0;const r=[],s=this.pattern.length;for(;(e=t.indexOf(this.pattern,n))>-1;)n=e+s,r.push([e,n-1]);const i=!!r.length;return{isMatch:i,score:i?0:1,indices:r}}}const S=[class extends k{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const e=t===this.pattern;return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},I,class extends k{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},class extends k{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends k{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends k{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[t.length-this.pattern.length,t.length-1]}}},class extends k{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const e=-1===t.indexOf(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},E],w=S.length,A=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,C=new Set([E.type,I.type]);const _=[];function F(t,e){for(let n=0,r=_.length;n<r;n+=1){let r=_[n];if(r.condition(t,e))return new r(t,e)}return new L(t,e)}const $="$and",N="$path",O=t=>!(!t[$]&&!t.$or),j=t=>({[$]:Object.keys(t).map((e=>({[e]:t[e]})))});function R(n,s,{auto:i=!0}={}){const c=n=>{let o=Object.keys(n);const a=(t=>!!t[N])(n);if(!a&&o.length>1&&!O(n))return c(j(n));if((e=>!t(e)&&r(e)&&!O(e))(n)){const t=a?n[N]:o[0],r=a?n.$val:n[t];if(!e(r))throw new Error((t=>`Invalid value for key ${t}`)(t));const c={keyId:g(t),pattern:r};return i&&(c.searcher=F(r,s)),c}let h={children:[],operator:o[0]};return o.forEach((e=>{const r=n[e];t(r)&&r.forEach((t=>{h.children.push(c(t))}))})),h};return O(n)||(n=j(n)),c(n)}function W(t,e){const n=t.matches;e.matches=[],s(n)&&n.forEach((t=>{if(!s(t.indices)||!t.indices.length)return;const{indices:n,value:r}=t;let i={indices:n,value:r};t.key&&(i.key=t.key.src),t.idx>-1&&(i.refIndex=t.idx),e.matches.push(i)}))}function B(t,e){e.score=t.score}class q{constructor(t,e={},n){this.options={...f,...e},this.options.useExtendedSearch,this._keyStore=new l(this.options.keys),this.setCollection(t,n)}setCollection(t,e){if(this._docs=t,e&&!(e instanceof p))throw new Error("Incorrect 'index' type");this._myIndex=e||y(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){s(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=(()=>!1)){const e=[];for(let n=0,r=this._docs.length;n<r;n+=1){const s=this._docs[n];t(s,n)&&(this.removeAt(n),n-=1,r-=1,e.push(s))}return e}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:r=-1}={}){const{includeMatches:s,includeScore:i,shouldSort:c,sortFn:o,ignoreFieldNorm:a}=this.options;let h=e(t)?e(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return function(t,{ignoreFieldNorm:e=f.ignoreFieldNorm}){t.forEach((t=>{let n=1;t.matches.forEach((({key:t,norm:r,score:s})=>{const i=t?t.weight:null;n*=Math.pow(0===s&&i?Number.EPSILON:s,(i||1)*(e?1:r))})),t.score=n}))}(h,{ignoreFieldNorm:a}),c&&h.sort(o),n(r)&&r>-1&&(h=h.slice(0,r)),function(t,e,{includeMatches:n=f.includeMatches,includeScore:r=f.includeScore}={}){const s=[];return n&&s.push(W),r&&s.push(B),t.map((t=>{const{idx:n}=t,r={item:e[n],refIndex:n};return s.length&&s.forEach((e=>{e(t,r)})),r}))}(h,this._docs,{includeMatches:s,includeScore:i})}_searchStringList(t){const e=F(t,this.options),{records:n}=this._myIndex,r=[];return n.forEach((({v:t,i:n,n:i})=>{if(!s(t))return;const{isMatch:c,score:o,indices:a}=e.searchIn(t);c&&r.push({item:t,idx:n,matches:[{score:o,value:t,norm:i,indices:a}]})})),r}_searchLogical(t){const e=R(t,this.options),n=(t,e,r)=>{if(!t.children){const{keyId:n,searcher:s}=t,i=this._findMatches({key:this._keyStore.get(n),value:this._myIndex.getValueForItemAtKeyId(e,n),searcher:s});return i&&i.length?[{idx:r,item:e,matches:i}]:[]}const s=[];for(let i=0,c=t.children.length;i<c;i+=1){const c=t.children[i],o=n(c,e,r);if(o.length)s.push(...o);else if(t.operator===$)return[]}return s},r=this._myIndex.records,i={},c=[];return r.forEach((({$:t,i:r})=>{if(s(t)){let s=n(e,t,r);s.length&&(i[r]||(i[r]={idx:r,item:t,matches:[]},c.push(i[r])),s.forEach((({matches:t})=>{i[r].matches.push(...t)})))}})),c}_searchObjectList(t){const e=F(t,this.options),{keys:n,records:r}=this._myIndex,i=[];return r.forEach((({$:t,i:r})=>{if(!s(t))return;let c=[];n.forEach(((n,r)=>{c.push(...this._findMatches({key:n,value:t[r],searcher:e}))})),c.length&&i.push({idx:r,item:t,matches:c})})),i}_findMatches({key:e,value:n,searcher:r}){if(!s(n))return[];let i=[];if(t(n))n.forEach((({v:t,i:n,n:c})=>{if(!s(t))return;const{isMatch:o,score:a,indices:h}=r.searchIn(t);o&&i.push({score:a,key:e,value:t,idx:n,norm:c,indices:h})}));else{const{v:t,n:s}=n,{isMatch:c,score:o,indices:a}=r.searchIn(t);c&&i.push({score:o,key:e,value:t,norm:s,indices:a})}return i}}q.version="6.6.2",q.createIndex=y,q.parseIndex=function(t,{getFn:e=f.getFn,fieldNormWeight:n=f.fieldNormWeight}={}){const{keys:r,records:s}=t,i=new p({getFn:e,fieldNormWeight:n});return i.setKeys(r),i.setIndexRecords(s),i},q.config=f,q.parseQuery=R,function(...t){_.push(...t)}(class{constructor(t,{isCaseSensitive:e=f.isCaseSensitive,includeMatches:n=f.includeMatches,minMatchCharLength:r=f.minMatchCharLength,ignoreLocation:s=f.ignoreLocation,findAllMatches:i=f.findAllMatches,location:c=f.location,threshold:o=f.threshold,distance:a=f.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:n,minMatchCharLength:r,findAllMatches:i,ignoreLocation:s,location:c,threshold:o,distance:a},this.pattern=e?t:t.toLowerCase(),this.query=function(t,e={}){return t.split("|").map((t=>{let n=t.trim().split(A).filter((t=>t&&!!t.trim())),r=[];for(let t=0,s=n.length;t<s;t+=1){const s=n[t];let i=!1,c=-1;for(;!i&&++c<w;){const t=S[c];let n=t.isMultiMatch(s);n&&(r.push(new t(n,e)),i=!0)}if(!i)for(c=-1;++c<w;){const t=S[c];let n=t.isSingleMatch(s);if(n){r.push(new t(n,e));break}}}return r}))}(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:r}=this.options;t=r?t:t.toLowerCase();let s=0,i=[],c=0;for(let r=0,o=e.length;r<o;r+=1){const o=e[r];i.length=0,s=0;for(let e=0,r=o.length;e<r;e+=1){const r=o[e],{isMatch:a,indices:h,score:l}=r.search(t);if(!a){c=0,s=0,i.length=0;break}if(s+=1,c+=l,n){const t=r.constructor.type;C.has(t)?i=[...i,...h]:i.push(h)}}if(s){let t={isMatch:!0,score:c/s};return n&&(t.indices=i),t}}return{isMatch:!1,score:1}}});var P=[],z=function(){var t=new q(P,{shouldSort:!0,includeScore:!0,threshold:.4,location:0,distance:100,maxPatternLength:32,minMatchCharLength:1,keys:["name"]});document.querySelectorAll("main span").forEach((function(e){var n=e.textContent.toLowerCase(),r=t.search(n);if(r.length>0&&r[0].score>.6){var s=e.closest("article");if(s)for(var i=s,c=0;c<3;c++)i&&"DIV"===i.tagName&&(i.getAttribute("style")&&i.getAttribute("style").includes("display: none")||i.setAttribute("style","display: none;")),i=i&&i.previousElementSibling?i.previousElementSibling:null}else for(var o=0;o<P.length;o++)if(e.textContent.toLowerCase().includes(P[o].toLowerCase())){var a=e.closest("article");if(a)for(var h=a,l=0;l<3;l++)h&&"DIV"===h.tagName&&(h.getAttribute("style")&&h.getAttribute("style").includes("display: none")||h.setAttribute("style","display: none;")),h=h&&h.previousElementSibling?h.previousElementSibling:null}}))},K=localStorage.getItem("selectedFilter");K?(P=JSON.parse(K),console.log(P),z()):fetch("path/to/filters.json").then((function(t){if(!t.ok)throw new Error("HTTP error! status: ".concat(t.status));return t.json()})).then((function(t){P=t.map((function(t){return t.toString()})),z()})).catch((function(t){return console.error(t)})),new MutationObserver(z).observe(document.body,{childList:!0,subtree:!0});try{chrome.tabs.onUpdated.addListener((function(t,e,n){"complete"==e.status&&chrome.scripting.executeScript({files:["dist/bundle.js"],target:{tabId:n.id}})}))}catch(t){console.log(t)}function D(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function J(){var t={custom:document.getElementById("customFilter").checked,profanity:document.getElementById("profanityFilter").checked,controversial:document.getElementById("controversialFilter").checked,customWords:document.getElementById("customWords").value.split(",")};chrome.storage.sync.set({filters:t},(function(){chrome.tabs.query({},(function(t){t.forEach((function(t){(t.url.includes("facebook.com")||t.url.includes("twitter.com")||t.url.includes("instagram.com"))&&chrome.tabs.reload(t.id)}))}))}))}document.addEventListener("DOMContentLoaded",(function(){var t=document.getElementById("customFilter"),e=document.getElementById("profanityFilter"),n=document.getElementById("controversialFilter"),r=document.getElementById("customWords"),s=document.getElementById("addCustomWordButton"),i=document.getElementById("applyFiltersButton"),c=[];s.addEventListener("click",(function(){var t,e,n=r.value.trim();""!==n&&((t=c).push.apply(t,function(t){if(Array.isArray(t))return D(t)}(e=n.split(","))||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||function(t,e){if(t){if("string"==typeof t)return D(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(t,e):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r.value="")})),i.addEventListener("click",(function(){c=[],t.checked&&c.push("custom"),e.checked&&c.push("profanity"),n.checked&&c.push("controversial"),chrome.tabs.query({},(function(t){t.forEach((function(t){(t.url.includes("facebook.com")||t.url.includes("twitter.com")||t.url.includes("instagram.com"))&&(chrome.tabs.sendMessage(t.id,{filters:c}),chrome.tabs.reload(t.id))}))}))}))})),document.getElementById("applyFiltersButton").addEventListener("click",J),document.addEventListener("DOMContentLoaded",(function(){chrome.storage.sync.get(["filters"],(function(t){var e=t.filters||{},n=e.custom,r=e.profanity,s=e.controversial,i=e.customWords;document.getElementById("customFilter").checked=n||!1,document.getElementById("profanityFilter").checked=r||!1,document.getElementById("controversialFilter").checked=s||!1,document.getElementById("customWords").value=i?i.join(","):"",J()}))}))})();