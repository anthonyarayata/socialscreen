/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";const t=chrome;function e(t){return Array.isArray?Array.isArray(t):"[object Array]"===c(t)}function r(t){return"string"==typeof t}function n(t){return"number"==typeof t}function o(t){return"object"==typeof t}function i(t){return null!=t}function s(t){return!t.trim().length}function c(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const a=t=>`Missing ${t} property in key`,l=t=>`Property 'weight' in key '${t}' must be a positive integer`,u=Object.prototype.hasOwnProperty;class h{constructor(t){this._keys=[],this._keyMap={};let e=0;t.forEach((t=>{let r=d(t);e+=r.weight,this._keys.push(r),this._keyMap[r.id]=r,e+=r.weight})),this._keys.forEach((t=>{t.weight/=e}))}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function d(t){let n=null,o=null,i=null,s=1,c=null;if(r(t)||e(t))i=t,n=f(t),o=p(t);else{if(!u.call(t,"name"))throw new Error(a("name"));const e=t.name;if(i=e,u.call(t,"weight")&&(s=t.weight,s<=0))throw new Error(l(e));n=f(e),o=p(e),c=t.getFn}return{path:n,id:o,weight:s,src:i,getFn:c}}function f(t){return e(t)?t:t.split(".")}function p(t){return e(t)?t.join("."):t}var g={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,useExtendedSearch:!1,getFn:function(t,s){let a=[],l=!1;const u=(t,s,h)=>{if(i(t))if(s[h]){const d=t[s[h]];if(!i(d))return;if(h===s.length-1&&(r(d)||n(d)||function(t){return!0===t||!1===t||function(t){return o(t)&&null!==t}(t)&&"[object Boolean]"==c(t)}(d)))a.push(function(t){return null==t?"":function(t){if("string"==typeof t)return t;let e=t+"";return"0"==e&&1/t==-1/0?"-0":e}(t)}(d));else if(e(d)){l=!0;for(let t=0,e=d.length;t<e;t+=1)u(d[t],s,h+1)}else s.length&&u(d,s,h+1)}else a.push(t)};return u(t,r(s)?s.split("."):s,0),l?a:a[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};const m=/[^ ]+/g;class y{constructor({getFn:t=g.getFn,fieldNormWeight:e=g.fieldNormWeight}={}){this.norm=function(t=1,e=3){const r=new Map,n=Math.pow(10,e);return{get(e){const o=e.match(m).length;if(r.has(o))return r.get(o);const i=1/Math.pow(o,.5*t),s=parseFloat(Math.round(i*n)/n);return r.set(o,s),s},clear(){r.clear()}}}(e,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach(((t,e)=>{this._keysMap[t.id]=e}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,r(this.docs[0])?this.docs.forEach(((t,e)=>{this._addString(t,e)})):this.docs.forEach(((t,e)=>{this._addObject(t,e)})),this.norm.clear())}add(t){const e=this.size();r(t)?this._addString(t,e):this._addObject(t,e)}removeAt(t){this.records.splice(t,1);for(let e=t,r=this.size();e<r;e+=1)this.records[e].i-=1}getValueForItemAtKeyId(t,e){return t[this._keysMap[e]]}size(){return this.records.length}_addString(t,e){if(!i(t)||s(t))return;let r={v:t,i:e,n:this.norm.get(t)};this.records.push(r)}_addObject(t,n){let o={i:n,$:{}};this.keys.forEach(((n,c)=>{let a=n.getFn?n.getFn(t):this.getFn(t,n.path);if(i(a))if(e(a)){let t=[];const n=[{nestedArrIndex:-1,value:a}];for(;n.length;){const{nestedArrIndex:o,value:c}=n.pop();if(i(c))if(r(c)&&!s(c)){let e={v:c,i:o,n:this.norm.get(c)};t.push(e)}else e(c)&&c.forEach(((t,e)=>{n.push({nestedArrIndex:e,value:t})}))}o.$[c]=t}else if(r(a)&&!s(a)){let t={v:a,n:this.norm.get(a)};o.$[c]=t}})),this.records.push(o)}toJSON(){return{keys:this.keys,records:this.records}}}function v(t,e,{getFn:r=g.getFn,fieldNormWeight:n=g.fieldNormWeight}={}){const o=new y({getFn:r,fieldNormWeight:n});return o.setKeys(t.map(d)),o.setSources(e),o.create(),o}function x(t,{errors:e=0,currentLocation:r=0,expectedLocation:n=0,distance:o=g.distance,ignoreLocation:i=g.ignoreLocation}={}){const s=e/t.length;if(i)return s;const c=Math.abs(n-r);return o?s+c/o:c?1:s}const w=32;function M(t){let e={};for(let r=0,n=t.length;r<n;r+=1){const o=t.charAt(r);e[o]=(e[o]||0)|1<<n-r-1}return e}class b{constructor(t,{location:e=g.location,threshold:r=g.threshold,distance:n=g.distance,includeMatches:o=g.includeMatches,findAllMatches:i=g.findAllMatches,minMatchCharLength:s=g.minMatchCharLength,isCaseSensitive:c=g.isCaseSensitive,ignoreLocation:a=g.ignoreLocation}={}){if(this.options={location:e,threshold:r,distance:n,includeMatches:o,findAllMatches:i,minMatchCharLength:s,isCaseSensitive:c,ignoreLocation:a},this.pattern=c?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const l=(t,e)=>{this.chunks.push({pattern:t,alphabet:M(t),startIndex:e})},u=this.pattern.length;if(u>w){let t=0;const e=u%w,r=u-e;for(;t<r;)l(this.pattern.substr(t,w),t),t+=w;if(e){const t=u-w;l(this.pattern.substr(t),t)}}else l(this.pattern,0)}searchIn(t){const{isCaseSensitive:e,includeMatches:r}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let e={isMatch:!0,score:0};return r&&(e.indices=[[0,t.length-1]]),e}const{location:n,distance:o,threshold:i,findAllMatches:s,minMatchCharLength:c,ignoreLocation:a}=this.options;let l=[],u=0,h=!1;this.chunks.forEach((({pattern:e,alphabet:d,startIndex:f})=>{const{isMatch:p,score:m,indices:y}=function(t,e,r,{location:n=g.location,distance:o=g.distance,threshold:i=g.threshold,findAllMatches:s=g.findAllMatches,minMatchCharLength:c=g.minMatchCharLength,includeMatches:a=g.includeMatches,ignoreLocation:l=g.ignoreLocation}={}){if(e.length>w)throw new Error("Pattern length exceeds max of 32.");const u=e.length,h=t.length,d=Math.max(0,Math.min(n,h));let f=i,p=d;const m=c>1||a,y=m?Array(h):[];let v;for(;(v=t.indexOf(e,p))>-1;){let t=x(e,{currentLocation:v,expectedLocation:d,distance:o,ignoreLocation:l});if(f=Math.min(t,f),p=v+u,m){let t=0;for(;t<u;)y[v+t]=1,t+=1}}p=-1;let M=[],b=1,L=u+h;const F=1<<u-1;for(let n=0;n<u;n+=1){let i=0,c=L;for(;i<c;)x(e,{errors:n,currentLocation:d+c,expectedLocation:d,distance:o,ignoreLocation:l})<=f?i=c:L=c,c=Math.floor((L-i)/2+i);L=c;let a=Math.max(1,d-c+1),g=s?h:Math.min(d+c,h)+u,v=Array(g+2);v[g+1]=(1<<n)-1;for(let i=g;i>=a;i-=1){let s=i-1,c=r[t.charAt(s)];if(m&&(y[s]=+!!c),v[i]=(v[i+1]<<1|1)&c,n&&(v[i]|=(M[i+1]|M[i])<<1|1|M[i+1]),v[i]&F&&(b=x(e,{errors:n,currentLocation:s,expectedLocation:d,distance:o,ignoreLocation:l}),b<=f)){if(f=b,p=s,p<=d)break;a=Math.max(1,2*d-p)}}if(x(e,{errors:n+1,currentLocation:d,expectedLocation:d,distance:o,ignoreLocation:l})>f)break;M=v}const S={isMatch:p>=0,score:Math.max(.001,b)};if(m){const t=function(t=[],e=g.minMatchCharLength){let r=[],n=-1,o=-1,i=0;for(let s=t.length;i<s;i+=1){let s=t[i];s&&-1===n?n=i:s||-1===n||(o=i-1,o-n+1>=e&&r.push([n,o]),n=-1)}return t[i-1]&&i-n>=e&&r.push([n,i-1]),r}(y,c);t.length?a&&(S.indices=t):S.isMatch=!1}return S}(t,e,d,{location:n+f,distance:o,threshold:i,findAllMatches:s,minMatchCharLength:c,includeMatches:r,ignoreLocation:a});p&&(h=!0),u+=m,p&&y&&(l=[...l,...y])}));let d={isMatch:h,score:h?u/this.chunks.length:1};return h&&r&&(d.indices=l),d}}class L{constructor(t){this.pattern=t}static isMultiMatch(t){return F(t,this.multiRegex)}static isSingleMatch(t){return F(t,this.singleRegex)}search(){}}function F(t,e){const r=t.match(e);return r?r[1]:null}class S extends L{constructor(t,{location:e=g.location,threshold:r=g.threshold,distance:n=g.distance,includeMatches:o=g.includeMatches,findAllMatches:i=g.findAllMatches,minMatchCharLength:s=g.minMatchCharLength,isCaseSensitive:c=g.isCaseSensitive,ignoreLocation:a=g.ignoreLocation}={}){super(t),this._bitapSearch=new b(t,{location:e,threshold:r,distance:n,includeMatches:o,findAllMatches:i,minMatchCharLength:s,isCaseSensitive:c,ignoreLocation:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class E extends L{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e,r=0;const n=[],o=this.pattern.length;for(;(e=t.indexOf(this.pattern,r))>-1;)r=e+o,n.push([e,r-1]);const i=!!n.length;return{isMatch:i,score:i?0:1,indices:n}}}const k=[class extends L{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const e=t===this.pattern;return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},E,class extends L{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},class extends L{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends L{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends L{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[t.length-this.pattern.length,t.length-1]}}},class extends L{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const e=-1===t.indexOf(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},S],A=k.length,C=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,_=new Set([S.type,E.type]);const I=[];function O(t,e){for(let r=0,n=I.length;r<n;r+=1){let n=I[r];if(n.condition(t,e))return new n(t,e)}return new b(t,e)}const j="$and",$="$path",N=t=>!(!t[j]&&!t.$or),W=t=>({[j]:Object.keys(t).map((e=>({[e]:t[e]})))});function R(t,n,{auto:i=!0}={}){const s=t=>{let c=Object.keys(t);const a=(t=>!!t[$])(t);if(!a&&c.length>1&&!N(t))return s(W(t));if((t=>!e(t)&&o(t)&&!N(t))(t)){const e=a?t[$]:c[0],o=a?t.$val:t[e];if(!r(o))throw new Error((t=>`Invalid value for key ${t}`)(e));const s={keyId:p(e),pattern:o};return i&&(s.searcher=O(o,n)),s}let l={children:[],operator:c[0]};return c.forEach((r=>{const n=t[r];e(n)&&n.forEach((t=>{l.children.push(s(t))}))})),l};return N(t)||(t=W(t)),s(t)}function P(t,e){const r=t.matches;e.matches=[],i(r)&&r.forEach((t=>{if(!i(t.indices)||!t.indices.length)return;const{indices:r,value:n}=t;let o={indices:r,value:n};t.key&&(o.key=t.key.src),t.idx>-1&&(o.refIndex=t.idx),e.matches.push(o)}))}function B(t,e){e.score=t.score}class q{constructor(t,e={},r){this.options={...g,...e},this.options.useExtendedSearch,this._keyStore=new h(this.options.keys),this.setCollection(t,r)}setCollection(t,e){if(this._docs=t,e&&!(e instanceof y))throw new Error("Incorrect 'index' type");this._myIndex=e||v(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){i(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=(()=>!1)){const e=[];for(let r=0,n=this._docs.length;r<n;r+=1){const o=this._docs[r];t(o,r)&&(this.removeAt(r),r-=1,n-=1,e.push(o))}return e}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:e=-1}={}){const{includeMatches:o,includeScore:i,shouldSort:s,sortFn:c,ignoreFieldNorm:a}=this.options;let l=r(t)?r(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return function(t,{ignoreFieldNorm:e=g.ignoreFieldNorm}){t.forEach((t=>{let r=1;t.matches.forEach((({key:t,norm:n,score:o})=>{const i=t?t.weight:null;r*=Math.pow(0===o&&i?Number.EPSILON:o,(i||1)*(e?1:n))})),t.score=r}))}(l,{ignoreFieldNorm:a}),s&&l.sort(c),n(e)&&e>-1&&(l=l.slice(0,e)),function(t,e,{includeMatches:r=g.includeMatches,includeScore:n=g.includeScore}={}){const o=[];return r&&o.push(P),n&&o.push(B),t.map((t=>{const{idx:r}=t,n={item:e[r],refIndex:r};return o.length&&o.forEach((e=>{e(t,n)})),n}))}(l,this._docs,{includeMatches:o,includeScore:i})}_searchStringList(t){const e=O(t,this.options),{records:r}=this._myIndex,n=[];return r.forEach((({v:t,i:r,n:o})=>{if(!i(t))return;const{isMatch:s,score:c,indices:a}=e.searchIn(t);s&&n.push({item:t,idx:r,matches:[{score:c,value:t,norm:o,indices:a}]})})),n}_searchLogical(t){const e=R(t,this.options),r=(t,e,n)=>{if(!t.children){const{keyId:r,searcher:o}=t,i=this._findMatches({key:this._keyStore.get(r),value:this._myIndex.getValueForItemAtKeyId(e,r),searcher:o});return i&&i.length?[{idx:n,item:e,matches:i}]:[]}const o=[];for(let i=0,s=t.children.length;i<s;i+=1){const s=t.children[i],c=r(s,e,n);if(c.length)o.push(...c);else if(t.operator===j)return[]}return o},n=this._myIndex.records,o={},s=[];return n.forEach((({$:t,i:n})=>{if(i(t)){let i=r(e,t,n);i.length&&(o[n]||(o[n]={idx:n,item:t,matches:[]},s.push(o[n])),i.forEach((({matches:t})=>{o[n].matches.push(...t)})))}})),s}_searchObjectList(t){const e=O(t,this.options),{keys:r,records:n}=this._myIndex,o=[];return n.forEach((({$:t,i:n})=>{if(!i(t))return;let s=[];r.forEach(((r,n)=>{s.push(...this._findMatches({key:r,value:t[n],searcher:e}))})),s.length&&o.push({idx:n,item:t,matches:s})})),o}_findMatches({key:t,value:r,searcher:n}){if(!i(r))return[];let o=[];if(e(r))r.forEach((({v:e,i:r,n:s})=>{if(!i(e))return;const{isMatch:c,score:a,indices:l}=n.searchIn(e);c&&o.push({score:a,key:t,value:e,idx:r,norm:s,indices:l})}));else{const{v:e,n:i}=r,{isMatch:s,score:c,indices:a}=n.searchIn(e);s&&o.push({score:c,key:t,value:e,norm:i,indices:a})}return o}}q.version="6.6.2",q.createIndex=v,q.parseIndex=function(t,{getFn:e=g.getFn,fieldNormWeight:r=g.fieldNormWeight}={}){const{keys:n,records:o}=t,i=new y({getFn:e,fieldNormWeight:r});return i.setKeys(n),i.setIndexRecords(o),i},q.config=g,q.parseQuery=R,function(...t){I.push(...t)}(class{constructor(t,{isCaseSensitive:e=g.isCaseSensitive,includeMatches:r=g.includeMatches,minMatchCharLength:n=g.minMatchCharLength,ignoreLocation:o=g.ignoreLocation,findAllMatches:i=g.findAllMatches,location:s=g.location,threshold:c=g.threshold,distance:a=g.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:r,minMatchCharLength:n,findAllMatches:i,ignoreLocation:o,location:s,threshold:c,distance:a},this.pattern=e?t:t.toLowerCase(),this.query=function(t,e={}){return t.split("|").map((t=>{let r=t.trim().split(C).filter((t=>t&&!!t.trim())),n=[];for(let t=0,o=r.length;t<o;t+=1){const o=r[t];let i=!1,s=-1;for(;!i&&++s<A;){const t=k[s];let r=t.isMultiMatch(o);r&&(n.push(new t(r,e)),i=!0)}if(!i)for(s=-1;++s<A;){const t=k[s];let r=t.isSingleMatch(o);if(r){n.push(new t(r,e));break}}}return n}))}(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};const{includeMatches:r,isCaseSensitive:n}=this.options;t=n?t:t.toLowerCase();let o=0,i=[],s=0;for(let n=0,c=e.length;n<c;n+=1){const c=e[n];i.length=0,o=0;for(let e=0,n=c.length;e<n;e+=1){const n=c[e],{isMatch:a,indices:l,score:u}=n.search(t);if(!a){s=0,o=0,i.length=0;break}if(o+=1,s+=u,r){const t=n.constructor.type;_.has(t)?i=[...i,...l]:i.push(l)}}if(o){let t={isMatch:!0,score:s/o};return r&&(t.indices=i),t}}return{isMatch:!1,score:1}}});const G=JSON.parse('{"filter":["andrew tate","donald trump"]}'),T=JSON.parse('{"filter":["fuck","shit"]}');function z(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=K(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return s=t.done,t},e:function(t){c=!0,i=t},f:function(){try{s||null==r.return||r.return()}finally{if(c)throw i}}}}function J(t){return function(t){if(Array.isArray(t))return U(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||K(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function K(t,e){if(t){if("string"==typeof t)return U(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?U(t,e):void 0}}function U(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var V,D,Y=[],Q=[],H=[],X=[];function Z(){var t={includeScore:!0,threshold:.1};"twitter.com"===window.location.hostname?function(){var e,r=[],n=z(document.querySelectorAll("main span"));try{for(n.s();!(e=n.n()).done;){var o=e.value.textContent.toLowerCase().split(" ");r.push.apply(r,J(o))}}catch(t){n.e(t)}finally{n.f()}var i,s=new q(r,t),c=z(Y);try{for(c.s();!(i=c.n()).done;){var a,l=i.value,u=z(s.search(l));try{for(u.s();!(a=u.n()).done;){var h,d=a.value,f=z(document.querySelectorAll("main span"));try{for(f.s();!(h=f.n()).done;){var p=h.value;if(p.textContent.toLowerCase().includes(d.item)){var g=p.closest("article");if(g&&"none"!==g.style.display){var m,y,v=null===(m=g.parentElement)||void 0===m||null===(y=m.parentElement)||void 0===y?void 0:y.parentElement;v&&(v.setAttribute("style","display: none !important"),console.log("Removed post: ".concat(p.textContent,"\n").concat(d.item," (").concat(d.score,")")))}}}}catch(t){f.e(t)}finally{f.f()}}}catch(t){u.e(t)}finally{u.f()}}}catch(t){c.e(t)}finally{c.f()}}():"www.facebook.com"===window.location.hostname&&function(){var e,r=[],n=z(document.querySelectorAll("span div"));try{for(n.s();!(e=n.n()).done;){var o=e.value,i=o.textContent.toLowerCase().split(" ");if("start"===window.getComputedStyle(o).getPropertyValue("text-align")){var s=i.filter((function(t){return!r.includes(t)}));r.push.apply(r,J(s))}}}catch(t){n.e(t)}finally{n.f()}console.log(r);var c,a=new q(r,t),l=z(Y);try{for(l.s();!(c=l.n()).done;){var u,h=c.value,d=z(a.search(h));try{for(d.s();!(u=d.n()).done;){var f,p=u.value,g=z(document.querySelectorAll("span div"));try{for(g.s();!(f=g.n()).done;){var m=f.value;if(m.textContent.toLowerCase().includes(p.item)){var y=m.closest("span");if(y&&"none"!==y.style.display){var v=y.parentNode;v&&(v.setAttribute("style","display: none !important"),console.log("Removed post: ".concat(m.textContent,"\n").concat(p.item," (").concat(p.score,")")))}}}}catch(t){g.e(t)}finally{g.f()}}}catch(t){d.e(t)}finally{d.f()}}}catch(t){l.e(t)}finally{l.f()}}()}function tt(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function et(t){return et="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},et(t)}function rt(){rt=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function a(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{a({},"")}catch(t){a=function(t,e,r){return t[e]=r}}function l(t,e,r,o){var i=e&&e.prototype instanceof d?e:d,s=Object.create(i.prototype),c=new S(o||[]);return n(s,"_invoke",{value:M(t,r,c)}),s}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var h={};function d(){}function f(){}function p(){}var g={};a(g,i,(function(){return this}));var m=Object.getPrototypeOf,y=m&&m(m(E([])));y&&y!==e&&r.call(y,i)&&(g=y);var v=p.prototype=d.prototype=Object.create(g);function x(t){["next","throw","return"].forEach((function(e){a(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function o(n,i,s,c){var a=u(t[n],t,i);if("throw"!==a.type){var l=a.arg,h=l.value;return h&&"object"==et(h)&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){o("next",t,s,c)}),(function(t){o("throw",t,s,c)})):e.resolve(h).then((function(t){l.value=t,s(l)}),(function(t){return o("throw",t,s,c)}))}c(a.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function M(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var s=r.delegate;if(s){var c=b(s,r);if(c){if(c===h)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var a=u(t,e,r);if("normal"===a.type){if(n=r.done?"completed":"suspendedYield",a.arg===h)continue;return{value:a.arg,done:r.done}}"throw"===a.type&&(n="completed",r.method="throw",r.arg=a.arg)}}}function b(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),h;var o=u(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,h;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function F(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function E(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:k}}function k(){return{value:void 0,done:!0}}return f.prototype=p,n(v,"constructor",{value:p,configurable:!0}),n(p,"constructor",{value:f,configurable:!0}),f.displayName=a(p,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===f||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,a(t,c,"GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},x(w.prototype),a(w.prototype,s,(function(){return this})),t.AsyncIterator=w,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var s=new w(l(e,r,n,o),i);return t.isGeneratorFunction(r)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},x(v),a(v,c,"Generator"),a(v,i,(function(){return this})),a(v,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=E,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(F),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return s.type="throw",s.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),a=r.call(i,"finallyLoc");if(c&&a){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!a)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var s=i?i.completion:{};return s.type=t,s.arg=e,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),F(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;F(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}function nt(t,e,r,n,o,i,s){try{var c=t[i](s),a=c.value}catch(t){return void r(t)}c.done?e(a):Promise.resolve(a).then(n,o)}function ot(){var e={custom:document.getElementById("customFilter").checked,profanity:document.getElementById("profanityFilter").checked,controversial:document.getElementById("controversialFilter").checked,customWords:document.getElementById("customWords").value.split(",")};t.chrome.runtime.sendMessage({action:"applyFilters",filters:e})}function it(){var t;return t=rt().mark((function t(){return rt().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:document.getElementById("applyFiltersButton").addEventListener("click",ot),ot();case 2:case"end":return t.stop()}}),t)})),it=function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function s(t){nt(i,n,o,s,c,"next",t)}function c(t){nt(i,n,o,s,c,"throw",t)}s(void 0)}))},it.apply(this,arguments)}G&&Array.isArray(G.filter)&&(V=Q).push.apply(V,J(G.filter)),T&&Array.isArray(T.filter)&&(D=X).push.apply(D,J(T.filter)),chrome.storage.local.get("selectedFilter",(function(t){Y=t.selectedFilter||[],console.log("Selected Filter:",Y)})),Z(),chrome.storage.local.get(["controversialFilter","profanityFilter"],(function(t){Q=t.controversialFilter||[],X=t.profanityFilter||[],console.log("Controversial Filter (from Chrome storage):",Q),console.log("Profanity Filter (from Chrome storage):",X)})),chrome.storage.local.set({controversialFilter:Q,profanityFilter:X},(function(){console.log("Controversial Filter (saved to Chrome storage):",Q),console.log("Profanity Filter (saved to Chrome storage):",X)})),chrome.storage.local.get("customFilters",(function(t){H=t.customFilters||[],console.log("Custom Filter (from Chrome storage):",H)})),new MutationObserver(Z).observe(document.body,{childList:!0,subtree:!0}),chrome.runtime.sendMessage({type:"getCustomFilters"},(function(t){t.customFilters&&Array.isArray(t.customFilters)&&(H=J(t.customFilters),chrome.storage.local.set({customFilters:H}),console.log("Custom Filter (updated from background script):",H))})),chrome.runtime.onMessage.addListener((function(t,e,r){var n,o,i;t.appliedFilters&&Array.isArray(t.appliedFilters)&&(Y=[],t.appliedFilters.includes("custom")&&(n=Y).push.apply(n,J(H)),t.appliedFilters.includes("profanity")&&(o=Y).push.apply(o,J(X)),t.appliedFilters.includes("controversial")&&(i=Y).push.apply(i,J(Q)),chrome.storage.local.set({selectedFilter:Y}),console.log("Selected Filter (updated from popup):",Y),Z());if("addCustomFilter"===t.type&&t.customWords&&"string"==typeof t.customWords){var s,c,a=t.customWords.split(",").map((function(t){return t.trim()}));(s=H).push.apply(s,J(a)),chrome.storage.local.set({customFilters:H}),console.log("Custom Filter (updated with new words):",H),chrome.runtime.sendMessage({type:"updateCustomFilters",customFilters:H}),t.appliedFilters.includes("custom")&&(c=Y=Y.filter((function(t){return"custom"!==t}))).push.apply(c,J(a)),chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{type:"applyFilters",appliedFilters:Y})}))}})),setInterval(Z,3e3),document.addEventListener("DOMContentLoaded",(function(){var t=document.getElementById("customFilter"),e=document.getElementById("profanityFilter"),r=document.getElementById("controversialFilter"),n=document.getElementById("customWords"),o=document.getElementById("addCustomWordButton"),i=document.getElementById("applyFiltersButton"),s=[],c=[];function a(){chrome.tabs.query({},(function(t){t.forEach((function(t){var e;((e=t.url).includes("facebook.com")||e.includes("twitter.com")||e.includes("instagram.com"))&&chrome.tabs.reload(t.id)}))}))}chrome.storage.local.get("appliedFilters",(function(n){n.appliedFilters&&Array.isArray(n.appliedFilters)&&(s=n.appliedFilters,t.checked=s.includes("custom"),e.checked=s.includes("profanity"),r.checked=s.includes("controversial"))})),o.addEventListener("click",(function(){var t,e=n.value.trim();""!==e&&(c.push.apply(c,function(t){if(Array.isArray(t))return tt(t)}(t=e.split(","))||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return tt(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?tt(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),chrome.storage.local.set({addedWord:c},(function(){console.log("Custom words added:",c)})),chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{type:"addCustomFilter",customWords:e})})),a(),n.value="")})),i.addEventListener("click",(function(){s=[],t.checked&&s.push("custom"),e.checked&&s.push("profanity"),r.checked&&s.push("controversial"),chrome.storage.local.set({appliedFilters:s},(function(){console.log("Applied filters updated:",s)})),chrome.tabs.query({active:!0,currentWindow:!0},(function(t){chrome.tabs.sendMessage(t[0].id,{type:"applyFilters",appliedFilters:s}),a()}))}))})),document.addEventListener("DOMContentLoaded",(function(){return it.apply(this,arguments)}))})();