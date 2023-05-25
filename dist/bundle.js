/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";const t=chrome;function e(t){return Array.isArray?Array.isArray(t):"[object Array]"===c(t)}function r(t){return"string"==typeof t}function n(t){return"number"==typeof t}function i(t){return"object"==typeof t}function o(t){return null!=t}function s(t){return!t.trim().length}function c(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const a=t=>`Missing ${t} property in key`,l=t=>`Property 'weight' in key '${t}' must be a positive integer`,h=Object.prototype.hasOwnProperty;class u{constructor(t){this._keys=[],this._keyMap={};let e=0;t.forEach((t=>{let r=d(t);e+=r.weight,this._keys.push(r),this._keyMap[r.id]=r,e+=r.weight})),this._keys.forEach((t=>{t.weight/=e}))}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function d(t){let n=null,i=null,o=null,s=1,c=null;if(r(t)||e(t))o=t,n=f(t),i=p(t);else{if(!h.call(t,"name"))throw new Error(a("name"));const e=t.name;if(o=e,h.call(t,"weight")&&(s=t.weight,s<=0))throw new Error(l(e));n=f(e),i=p(e),c=t.getFn}return{path:n,id:i,weight:s,src:o,getFn:c}}function f(t){return e(t)?t:t.split(".")}function p(t){return e(t)?t.join("."):t}var g={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,useExtendedSearch:!1,getFn:function(t,s){let a=[],l=!1;const h=(t,s,u)=>{if(o(t))if(s[u]){const d=t[s[u]];if(!o(d))return;if(u===s.length-1&&(r(d)||n(d)||function(t){return!0===t||!1===t||function(t){return i(t)&&null!==t}(t)&&"[object Boolean]"==c(t)}(d)))a.push(function(t){return null==t?"":function(t){if("string"==typeof t)return t;let e=t+"";return"0"==e&&1/t==-1/0?"-0":e}(t)}(d));else if(e(d)){l=!0;for(let t=0,e=d.length;t<e;t+=1)h(d[t],s,u+1)}else s.length&&h(d,s,u+1)}else a.push(t)};return h(t,r(s)?s.split("."):s,0),l?a:a[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};const y=/[^ ]+/g;class m{constructor({getFn:t=g.getFn,fieldNormWeight:e=g.fieldNormWeight}={}){this.norm=function(t=1,e=3){const r=new Map,n=Math.pow(10,e);return{get(e){const i=e.match(y).length;if(r.has(i))return r.get(i);const o=1/Math.pow(i,.5*t),s=parseFloat(Math.round(o*n)/n);return r.set(i,s),s},clear(){r.clear()}}}(e,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach(((t,e)=>{this._keysMap[t.id]=e}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,r(this.docs[0])?this.docs.forEach(((t,e)=>{this._addString(t,e)})):this.docs.forEach(((t,e)=>{this._addObject(t,e)})),this.norm.clear())}add(t){const e=this.size();r(t)?this._addString(t,e):this._addObject(t,e)}removeAt(t){this.records.splice(t,1);for(let e=t,r=this.size();e<r;e+=1)this.records[e].i-=1}getValueForItemAtKeyId(t,e){return t[this._keysMap[e]]}size(){return this.records.length}_addString(t,e){if(!o(t)||s(t))return;let r={v:t,i:e,n:this.norm.get(t)};this.records.push(r)}_addObject(t,n){let i={i:n,$:{}};this.keys.forEach(((n,c)=>{let a=n.getFn?n.getFn(t):this.getFn(t,n.path);if(o(a))if(e(a)){let t=[];const n=[{nestedArrIndex:-1,value:a}];for(;n.length;){const{nestedArrIndex:i,value:c}=n.pop();if(o(c))if(r(c)&&!s(c)){let e={v:c,i,n:this.norm.get(c)};t.push(e)}else e(c)&&c.forEach(((t,e)=>{n.push({nestedArrIndex:e,value:t})}))}i.$[c]=t}else if(r(a)&&!s(a)){let t={v:a,n:this.norm.get(a)};i.$[c]=t}})),this.records.push(i)}toJSON(){return{keys:this.keys,records:this.records}}}function v(t,e,{getFn:r=g.getFn,fieldNormWeight:n=g.fieldNormWeight}={}){const i=new m({getFn:r,fieldNormWeight:n});return i.setKeys(t.map(d)),i.setSources(e),i.create(),i}function x(t,{errors:e=0,currentLocation:r=0,expectedLocation:n=0,distance:i=g.distance,ignoreLocation:o=g.ignoreLocation}={}){const s=e/t.length;if(o)return s;const c=Math.abs(n-r);return i?s+c/i:c?1:s}const M=32;function L(t){let e={};for(let r=0,n=t.length;r<n;r+=1){const i=t.charAt(r);e[i]=(e[i]||0)|1<<n-r-1}return e}class w{constructor(t,{location:e=g.location,threshold:r=g.threshold,distance:n=g.distance,includeMatches:i=g.includeMatches,findAllMatches:o=g.findAllMatches,minMatchCharLength:s=g.minMatchCharLength,isCaseSensitive:c=g.isCaseSensitive,ignoreLocation:a=g.ignoreLocation}={}){if(this.options={location:e,threshold:r,distance:n,includeMatches:i,findAllMatches:o,minMatchCharLength:s,isCaseSensitive:c,ignoreLocation:a},this.pattern=c?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const l=(t,e)=>{this.chunks.push({pattern:t,alphabet:L(t),startIndex:e})},h=this.pattern.length;if(h>M){let t=0;const e=h%M,r=h-e;for(;t<r;)l(this.pattern.substr(t,M),t),t+=M;if(e){const t=h-M;l(this.pattern.substr(t),t)}}else l(this.pattern,0)}searchIn(t){const{isCaseSensitive:e,includeMatches:r}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let e={isMatch:!0,score:0};return r&&(e.indices=[[0,t.length-1]]),e}const{location:n,distance:i,threshold:o,findAllMatches:s,minMatchCharLength:c,ignoreLocation:a}=this.options;let l=[],h=0,u=!1;this.chunks.forEach((({pattern:e,alphabet:d,startIndex:f})=>{const{isMatch:p,score:y,indices:m}=function(t,e,r,{location:n=g.location,distance:i=g.distance,threshold:o=g.threshold,findAllMatches:s=g.findAllMatches,minMatchCharLength:c=g.minMatchCharLength,includeMatches:a=g.includeMatches,ignoreLocation:l=g.ignoreLocation}={}){if(e.length>M)throw new Error("Pattern length exceeds max of 32.");const h=e.length,u=t.length,d=Math.max(0,Math.min(n,u));let f=o,p=d;const y=c>1||a,m=y?Array(u):[];let v;for(;(v=t.indexOf(e,p))>-1;){let t=x(e,{currentLocation:v,expectedLocation:d,distance:i,ignoreLocation:l});if(f=Math.min(t,f),p=v+h,y){let t=0;for(;t<h;)m[v+t]=1,t+=1}}p=-1;let L=[],w=1,b=h+u;const S=1<<h-1;for(let n=0;n<h;n+=1){let o=0,c=b;for(;o<c;)x(e,{errors:n,currentLocation:d+c,expectedLocation:d,distance:i,ignoreLocation:l})<=f?o=c:b=c,c=Math.floor((b-o)/2+o);b=c;let a=Math.max(1,d-c+1),g=s?u:Math.min(d+c,u)+h,v=Array(g+2);v[g+1]=(1<<n)-1;for(let o=g;o>=a;o-=1){let s=o-1,c=r[t.charAt(s)];if(y&&(m[s]=+!!c),v[o]=(v[o+1]<<1|1)&c,n&&(v[o]|=(L[o+1]|L[o])<<1|1|L[o+1]),v[o]&S&&(w=x(e,{errors:n,currentLocation:s,expectedLocation:d,distance:i,ignoreLocation:l}),w<=f)){if(f=w,p=s,p<=d)break;a=Math.max(1,2*d-p)}}if(x(e,{errors:n+1,currentLocation:d,expectedLocation:d,distance:i,ignoreLocation:l})>f)break;L=v}const E={isMatch:p>=0,score:Math.max(.001,w)};if(y){const t=function(t=[],e=g.minMatchCharLength){let r=[],n=-1,i=-1,o=0;for(let s=t.length;o<s;o+=1){let s=t[o];s&&-1===n?n=o:s||-1===n||(i=o-1,i-n+1>=e&&r.push([n,i]),n=-1)}return t[o-1]&&o-n>=e&&r.push([n,o-1]),r}(m,c);t.length?a&&(E.indices=t):E.isMatch=!1}return E}(t,e,d,{location:n+f,distance:i,threshold:o,findAllMatches:s,minMatchCharLength:c,includeMatches:r,ignoreLocation:a});p&&(u=!0),h+=y,p&&m&&(l=[...l,...m])}));let d={isMatch:u,score:u?h/this.chunks.length:1};return u&&r&&(d.indices=l),d}}class b{constructor(t){this.pattern=t}static isMultiMatch(t){return S(t,this.multiRegex)}static isSingleMatch(t){return S(t,this.singleRegex)}search(){}}function S(t,e){const r=t.match(e);return r?r[1]:null}class E extends b{constructor(t,{location:e=g.location,threshold:r=g.threshold,distance:n=g.distance,includeMatches:i=g.includeMatches,findAllMatches:o=g.findAllMatches,minMatchCharLength:s=g.minMatchCharLength,isCaseSensitive:c=g.isCaseSensitive,ignoreLocation:a=g.ignoreLocation}={}){super(t),this._bitapSearch=new w(t,{location:e,threshold:r,distance:n,includeMatches:i,findAllMatches:o,minMatchCharLength:s,isCaseSensitive:c,ignoreLocation:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class k extends b{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e,r=0;const n=[],i=this.pattern.length;for(;(e=t.indexOf(this.pattern,r))>-1;)r=e+i,n.push([e,r-1]);const o=!!n.length;return{isMatch:o,score:o?0:1,indices:n}}}const F=[class extends b{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const e=t===this.pattern;return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},k,class extends b{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},class extends b{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends b{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends b{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[t.length-this.pattern.length,t.length-1]}}},class extends b{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const e=-1===t.indexOf(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},E],I=F.length,_=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,A=new Set([E.type,k.type]);const O=[];function C(t,e){for(let r=0,n=O.length;r<n;r+=1){let n=O[r];if(n.condition(t,e))return new n(t,e)}return new w(t,e)}const N="$and",$="$path",j=t=>!(!t[N]&&!t.$or),R=t=>({[N]:Object.keys(t).map((e=>({[e]:t[e]})))});function W(t,n,{auto:o=!0}={}){const s=t=>{let c=Object.keys(t);const a=(t=>!!t[$])(t);if(!a&&c.length>1&&!j(t))return s(R(t));if((t=>!e(t)&&i(t)&&!j(t))(t)){const e=a?t[$]:c[0],i=a?t.$val:t[e];if(!r(i))throw new Error((t=>`Invalid value for key ${t}`)(e));const s={keyId:p(e),pattern:i};return o&&(s.searcher=C(i,n)),s}let l={children:[],operator:c[0]};return c.forEach((r=>{const n=t[r];e(n)&&n.forEach((t=>{l.children.push(s(t))}))})),l};return j(t)||(t=R(t)),s(t)}function P(t,e){const r=t.matches;e.matches=[],o(r)&&r.forEach((t=>{if(!o(t.indices)||!t.indices.length)return;const{indices:r,value:n}=t;let i={indices:r,value:n};t.key&&(i.key=t.key.src),t.idx>-1&&(i.refIndex=t.idx),e.matches.push(i)}))}function B(t,e){e.score=t.score}class J{constructor(t,e={},r){this.options={...g,...e},this.options.useExtendedSearch,this._keyStore=new u(this.options.keys),this.setCollection(t,r)}setCollection(t,e){if(this._docs=t,e&&!(e instanceof m))throw new Error("Incorrect 'index' type");this._myIndex=e||v(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){o(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=(()=>!1)){const e=[];for(let r=0,n=this._docs.length;r<n;r+=1){const i=this._docs[r];t(i,r)&&(this.removeAt(r),r-=1,n-=1,e.push(i))}return e}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:e=-1}={}){const{includeMatches:i,includeScore:o,shouldSort:s,sortFn:c,ignoreFieldNorm:a}=this.options;let l=r(t)?r(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return function(t,{ignoreFieldNorm:e=g.ignoreFieldNorm}){t.forEach((t=>{let r=1;t.matches.forEach((({key:t,norm:n,score:i})=>{const o=t?t.weight:null;r*=Math.pow(0===i&&o?Number.EPSILON:i,(o||1)*(e?1:n))})),t.score=r}))}(l,{ignoreFieldNorm:a}),s&&l.sort(c),n(e)&&e>-1&&(l=l.slice(0,e)),function(t,e,{includeMatches:r=g.includeMatches,includeScore:n=g.includeScore}={}){const i=[];return r&&i.push(P),n&&i.push(B),t.map((t=>{const{idx:r}=t,n={item:e[r],refIndex:r};return i.length&&i.forEach((e=>{e(t,n)})),n}))}(l,this._docs,{includeMatches:i,includeScore:o})}_searchStringList(t){const e=C(t,this.options),{records:r}=this._myIndex,n=[];return r.forEach((({v:t,i:r,n:i})=>{if(!o(t))return;const{isMatch:s,score:c,indices:a}=e.searchIn(t);s&&n.push({item:t,idx:r,matches:[{score:c,value:t,norm:i,indices:a}]})})),n}_searchLogical(t){const e=W(t,this.options),r=(t,e,n)=>{if(!t.children){const{keyId:r,searcher:i}=t,o=this._findMatches({key:this._keyStore.get(r),value:this._myIndex.getValueForItemAtKeyId(e,r),searcher:i});return o&&o.length?[{idx:n,item:e,matches:o}]:[]}const i=[];for(let o=0,s=t.children.length;o<s;o+=1){const s=t.children[o],c=r(s,e,n);if(c.length)i.push(...c);else if(t.operator===N)return[]}return i},n=this._myIndex.records,i={},s=[];return n.forEach((({$:t,i:n})=>{if(o(t)){let o=r(e,t,n);o.length&&(i[n]||(i[n]={idx:n,item:t,matches:[]},s.push(i[n])),o.forEach((({matches:t})=>{i[n].matches.push(...t)})))}})),s}_searchObjectList(t){const e=C(t,this.options),{keys:r,records:n}=this._myIndex,i=[];return n.forEach((({$:t,i:n})=>{if(!o(t))return;let s=[];r.forEach(((r,n)=>{s.push(...this._findMatches({key:r,value:t[n],searcher:e}))})),s.length&&i.push({idx:n,item:t,matches:s})})),i}_findMatches({key:t,value:r,searcher:n}){if(!o(r))return[];let i=[];if(e(r))r.forEach((({v:e,i:r,n:s})=>{if(!o(e))return;const{isMatch:c,score:a,indices:l}=n.searchIn(e);c&&i.push({score:a,key:t,value:e,idx:r,norm:s,indices:l})}));else{const{v:e,n:o}=r,{isMatch:s,score:c,indices:a}=n.searchIn(e);s&&i.push({score:c,key:t,value:e,norm:o,indices:a})}return i}}J.version="6.6.2",J.createIndex=v,J.parseIndex=function(t,{getFn:e=g.getFn,fieldNormWeight:r=g.fieldNormWeight}={}){const{keys:n,records:i}=t,o=new m({getFn:e,fieldNormWeight:r});return o.setKeys(n),o.setIndexRecords(i),o},J.config=g,J.parseQuery=W,function(...t){O.push(...t)}(class{constructor(t,{isCaseSensitive:e=g.isCaseSensitive,includeMatches:r=g.includeMatches,minMatchCharLength:n=g.minMatchCharLength,ignoreLocation:i=g.ignoreLocation,findAllMatches:o=g.findAllMatches,location:s=g.location,threshold:c=g.threshold,distance:a=g.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:r,minMatchCharLength:n,findAllMatches:o,ignoreLocation:i,location:s,threshold:c,distance:a},this.pattern=e?t:t.toLowerCase(),this.query=function(t,e={}){return t.split("|").map((t=>{let r=t.trim().split(_).filter((t=>t&&!!t.trim())),n=[];for(let t=0,i=r.length;t<i;t+=1){const i=r[t];let o=!1,s=-1;for(;!o&&++s<I;){const t=F[s];let r=t.isMultiMatch(i);r&&(n.push(new t(r,e)),o=!0)}if(!o)for(s=-1;++s<I;){const t=F[s];let r=t.isSingleMatch(i);if(r){n.push(new t(r,e));break}}}return n}))}(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};const{includeMatches:r,isCaseSensitive:n}=this.options;t=n?t:t.toLowerCase();let i=0,o=[],s=0;for(let n=0,c=e.length;n<c;n+=1){const c=e[n];o.length=0,i=0;for(let e=0,n=c.length;e<n;e+=1){const n=c[e],{isMatch:a,indices:l,score:h}=n.search(t);if(!a){s=0,i=0,o.length=0;break}if(i+=1,s+=h,r){const t=n.constructor.type;A.has(t)?o=[...o,...l]:o.push(l)}}if(i){let t={isMatch:!0,score:s/i};return r&&(t.indices=o),t}}return{isMatch:!1,score:1}}});const G=JSON.parse('{"filter":["andrew tate","donald trump"]}'),T=JSON.parse('{"filter":["fuck","shit"]}');function q(t){return function(t){if(Array.isArray(t))return z(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return z(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?z(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var K,D,U=[],V=[],Y=[];G&&Array.isArray(G.filter)&&(K=V).push.apply(K,q(G.filter)),T&&Array.isArray(T.filter)&&(D=Y).push.apply(D,q(T.filter));var Q=localStorage.getItem("selectedFilter");Q&&(U=JSON.parse(Q)),console.log("Selected Filter:",U);var H=new J(U,{shouldSort:!0,includeScore:!0,threshold:.4,location:0,distance:100,maxPatternLength:32,minMatchCharLength:1,keys:["filter"]}),X=localStorage.getItem("controversialFilter");X&&(V=JSON.parse(X));var Z=localStorage.getItem("profanityFilter");function tt(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function et(t){return et="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},et(t)}function rt(){rt=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function a(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{a({},"")}catch(t){a=function(t,e,r){return t[e]=r}}function l(t,e,r,i){var o=e&&e.prototype instanceof d?e:d,s=Object.create(o.prototype),c=new E(i||[]);return n(s,"_invoke",{value:L(t,r,c)}),s}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var u={};function d(){}function f(){}function p(){}var g={};a(g,o,(function(){return this}));var y=Object.getPrototypeOf,m=y&&y(y(k([])));m&&m!==e&&r.call(m,o)&&(g=m);var v=p.prototype=d.prototype=Object.create(g);function x(t){["next","throw","return"].forEach((function(e){a(t,e,(function(t){return this._invoke(e,t)}))}))}function M(t,e){function i(n,o,s,c){var a=h(t[n],t,o);if("throw"!==a.type){var l=a.arg,u=l.value;return u&&"object"==et(u)&&r.call(u,"__await")?e.resolve(u.__await).then((function(t){i("next",t,s,c)}),(function(t){i("throw",t,s,c)})):e.resolve(u).then((function(t){l.value=t,s(l)}),(function(t){return i("throw",t,s,c)}))}c(a.arg)}var o;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){i(t,r,e,n)}))}return o=o?o.then(n,n):n()}})}function L(t,e,r){var n="suspendedStart";return function(i,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===i)throw o;return{value:void 0,done:!0}}for(r.method=i,r.arg=o;;){var s=r.delegate;if(s){var c=w(s,r);if(c){if(c===u)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var a=h(t,e,r);if("normal"===a.type){if(n=r.done?"completed":"suspendedYield",a.arg===u)continue;return{value:a.arg,done:r.done}}"throw"===a.type&&(n="completed",r.method="throw",r.arg=a.arg)}}}function w(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),u;var i=h(n,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,u;var o=i.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,u):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,u)}function b(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(b,this),this.reset(!0)}function k(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:F}}function F(){return{value:void 0,done:!0}}return f.prototype=p,n(v,"constructor",{value:p,configurable:!0}),n(p,"constructor",{value:f,configurable:!0}),f.displayName=a(p,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===f||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,a(t,c,"GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},x(M.prototype),a(M.prototype,s,(function(){return this})),t.AsyncIterator=M,t.async=function(e,r,n,i,o){void 0===o&&(o=Promise);var s=new M(l(e,r,n,i),o);return t.isGeneratorFunction(r)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},x(v),a(v,c,"Generator"),a(v,o,(function(){return this})),a(v,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=k,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return s.type="throw",s.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),a=r.call(o,"finallyLoc");if(c&&a){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!a)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var s=o?o.completion:{};return s.type=t,s.arg=e,o?(this.method="next",this.next=o.finallyLoc,u):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),u},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),u}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;S(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),u}},t}function nt(t,e,r,n,i,o,s){try{var c=t[o](s),a=c.value}catch(t){return void r(t)}c.done?e(a):Promise.resolve(a).then(n,i)}function it(){var e={custom:document.getElementById("customFilter").checked,profanity:document.getElementById("profanityFilter").checked,controversial:document.getElementById("controversialFilter").checked,customWords:document.getElementById("customWords").value.split(",")};t.chrome.runtime.sendMessage({action:"applyFilters",filters:e})}function ot(){var t;return t=rt().mark((function t(){return rt().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:document.getElementById("applyFiltersButton").addEventListener("click",it),it();case 2:case"end":return t.stop()}}),t)})),ot=function(){var e=this,r=arguments;return new Promise((function(n,i){var o=t.apply(e,r);function s(t){nt(o,n,i,s,c,"next",t)}function c(t){nt(o,n,i,s,c,"throw",t)}s(void 0)}))},ot.apply(this,arguments)}Z&&(Y=JSON.parse(Z)),console.log("Controversial Filter (from local storage):",V),console.log("Profanity Filter (from local storage):",Y),localStorage.setItem("controversialFilter",JSON.stringify(V)),localStorage.setItem("profanityFilter",JSON.stringify(Y)),console.log("Controversial Filter (saved to local storage):",V),console.log("Profanity Filter (saved to local storage):",Y),new MutationObserver((function(){document.querySelectorAll("main span").forEach((function(t){var e=t.textContent.toLowerCase(),r=H.search(e);if(r.length>0&&r[0].score>.6){var n=t.closest("article");if(n){var i=n.previousElementSibling;i&&"DIV"===i.tagName&&(i.style.display&&"none"===i.style.display||(i.style.display="none"))}}}))})).observe(document.body,{childList:!0,subtree:!0}),chrome.runtime.onMessage.addListener((function(t,e,r){if(t.appliedFilters&&Array.isArray(t.appliedFilters)){if(U=[],t.appliedFilters.includes("custom")){var n=localStorage.getItem("customFilters");if(n){var i,o=JSON.parse(n);(i=U).push.apply(i,q(o))}}var s,c;t.appliedFilters.includes("profanity")&&(s=U).push.apply(s,q(Y)),t.appliedFilters.includes("controversial")&&(c=U).push.apply(c,q(V)),localStorage.setItem("selectedFilter",JSON.stringify(U)),H.setCollection(U)}})),document.addEventListener("DOMContentLoaded",(function(){var t=document.getElementById("customFilter"),e=document.getElementById("profanityFilter"),r=document.getElementById("controversialFilter"),n=document.getElementById("customWords"),i=document.getElementById("addCustomWordButton"),o=document.getElementById("applyFiltersButton"),s=[];function c(){t.checked=s.includes("custom"),e.checked=s.includes("profanity"),r.checked=s.includes("controversial")}function a(){chrome.tabs.query({},(function(t){t.forEach((function(t){chrome.tabs.reload(t.id)}))}))}chrome.storage.local.get("appliedFilters",(function(t){t.appliedFilters&&Array.isArray(t.appliedFilters)&&(s=t.appliedFilters,c())})),i.addEventListener("click",(function(){var t,e,r=n.value.trim();""!==r&&((t=s).push.apply(t,function(t){if(Array.isArray(t))return tt(t)}(e=r.split(","))||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||function(t,e){if(t){if("string"==typeof t)return tt(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?tt(t,e):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),chrome.storage.local.set({appliedFilters:s},(function(){console.log("Applied filters updated:",s)})),a(),n.value="")})),o.addEventListener("click",(function(){chrome.tabs.query({},(function(t){t.forEach((function(t){(t.url.includes("facebook.com")||t.url.includes("twitter.com")||t.url.includes("instagram.com"))&&(chrome.tabs.sendMessage(t.id,{appliedFilters:s}),a())}))}))})),t.addEventListener("change",(function(){if(t.checked)s.push("custom");else{var e=s.indexOf("custom");-1!==e&&s.splice(e,1)}c()})),e.addEventListener("change",(function(){if(e.checked)s.push("profanity");else{var t=s.indexOf("profanity");-1!==t&&s.splice(t,1)}c()})),r.addEventListener("change",(function(){if(r.checked)s.push("controversial");else{var t=s.indexOf("controversial");-1!==t&&s.splice(t,1)}c()}))})),document.addEventListener("DOMContentLoaded",(function(){return ot.apply(this,arguments)}))})();