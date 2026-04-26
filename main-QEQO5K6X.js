var xE=Object.defineProperty,RE=Object.defineProperties;var NE=Object.getOwnPropertyDescriptors;var fm=Object.getOwnPropertySymbols;var PE=Object.prototype.hasOwnProperty,jE=Object.prototype.propertyIsEnumerable;var mm=(e,t,n)=>t in e?xE(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,y=(e,t)=>{for(var n in t||={})PE.call(t,n)&&mm(e,n,t[n]);if(fm)for(var n of fm(t))jE.call(t,n)&&mm(e,n,t[n]);return e},$=(e,t)=>RE(e,NE(t));var Po=(e,t,n)=>new Promise((o,r)=>{var a=c=>{try{s(n.next(c))}catch(l){r(l)}},i=c=>{try{s(n.throw(c))}catch(l){r(l)}},s=c=>c.done?o(c.value):Promise.resolve(c.value).then(a,i);s((n=n.apply(e,t)).next())});var ll;function ui(){return ll}function Mn(e){let t=ll;return ll=e,t}var hm=Symbol("NotFound");function jo(e){return e===hm||e?.name==="\u0275NotFound"}function ul(e,t){return Object.is(e,t)}var Me=null,di=!1,dl=1,OE=null,Ne=Symbol("SIGNAL");function R(e){let t=Me;return Me=e,t}function fi(){return Me}var Oo={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function zr(e){if(di)throw new Error("");if(Me===null)return;Me.consumerOnSignalRead(e);let t=Me.producersTail;if(t!==void 0&&t.producer===e)return;let n,o=Me.recomputing;if(o&&(n=t!==void 0?t.nextProducer:Me.producers,n!==void 0&&n.producer===e)){Me.producersTail=n,n.lastReadVersion=e.version;return}let r=e.consumersTail;if(r!==void 0&&r.consumer===Me&&(!o||LE(r,Me)))return;let a=ko(Me),i={producer:e,consumer:Me,nextProducer:n,prevConsumer:r,lastReadVersion:e.version,nextConsumer:void 0};Me.producersTail=i,t!==void 0?t.nextProducer=i:Me.producers=i,a&&vm(e,i)}function gm(){dl++}function pl(e){if(!(ko(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===dl)){if(!e.producerMustRecompute(e)&&!Lo(e)){pi(e);return}e.producerRecomputeValue(e),pi(e)}}function fl(e){if(e.consumers===void 0)return;let t=di;di=!0;try{for(let n=e.consumers;n!==void 0;n=n.nextConsumer){let o=n.consumer;o.dirty||FE(o)}}finally{di=t}}function ml(){return Me?.consumerAllowSignalWrites!==!1}function FE(e){e.dirty=!0,fl(e),e.consumerMarkedDirty?.(e)}function pi(e){e.dirty=!1,e.lastCleanEpoch=dl}function Fo(e){return e&&(e.producersTail=void 0,e.recomputing=!0),R(e)}function qr(e,t){if(R(t),!e)return;e.recomputing=!1;let n=e.producersTail,o=n!==void 0?n.nextProducer:e.producers;if(o!==void 0){if(ko(e))do o=hl(o);while(o!==void 0);n!==void 0?n.nextProducer=void 0:e.producers=void 0}}function Lo(e){for(let t=e.producers;t!==void 0;t=t.nextProducer){let n=t.producer,o=t.lastReadVersion;if(o!==n.version||(pl(n),o!==n.version))return!0}return!1}function Qt(e){if(ko(e)){let t=e.producers;for(;t!==void 0;)t=hl(t)}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0}function vm(e,t){let n=e.consumersTail,o=ko(e);if(n!==void 0?(t.nextConsumer=n.nextConsumer,n.nextConsumer=t):(t.nextConsumer=void 0,e.consumers=t),t.prevConsumer=n,e.consumersTail=t,!o)for(let r=e.producers;r!==void 0;r=r.nextProducer)vm(r.producer,r)}function hl(e){let t=e.producer,n=e.nextProducer,o=e.nextConsumer,r=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,o!==void 0?o.prevConsumer=r:t.consumersTail=r,r!==void 0)r.nextConsumer=o;else if(t.consumers=o,!ko(t)){let a=t.producers;for(;a!==void 0;)a=hl(a)}return n}function ko(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function gl(e){OE?.(e)}function LE(e,t){let n=t.producersTail;if(n!==void 0){let o=t.producers;do{if(o===e)return!0;if(o===n)break;o=o.nextProducer}while(o!==void 0)}return!1}function kE(){throw new Error}var ym=kE;function bm(e){ym(e)}function vl(e){ym=e}var zE=null;function yl(e,t){let n=Object.create(mi);n.value=e,t!==void 0&&(n.equal=t);let o=()=>Em(n);return o[Ne]=n,gl(n),[o,i=>zo(n,i),i=>bl(n,i)]}function Em(e){return zr(e),e.value}function zo(e,t){ml()||bm(e),e.equal(e.value,t)||(e.value=t,qE(e))}function bl(e,t){ml()||bm(e),zo(e,t(e.value))}var mi=$(y({},Oo),{equal:ul,value:void 0,kind:"signal"});function qE(e){e.version++,gm(),fl(e),zE?.(e)}function N(e){return typeof e=="function"}function qo(e){let n=e(o=>{Error.call(o),o.stack=new Error().stack});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var hi=qo(e=>function(n){e(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((o,r)=>`${r+1}) ${o.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n});function Zt(e,t){if(e){let n=e.indexOf(t);0<=n&&e.splice(n,1)}}var J=class e{constructor(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let t;if(!this.closed){this.closed=!0;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let a of n)a.remove(this);else n.remove(this);let{initialTeardown:o}=this;if(N(o))try{o()}catch(a){t=a instanceof hi?a.errors:[a]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let a of r)try{Cm(a)}catch(i){t=t??[],i instanceof hi?t=[...t,...i.errors]:t.push(i)}}if(t)throw new hi(t)}}add(t){var n;if(t&&t!==this)if(this.closed)Cm(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}}_hasParent(t){let{_parentage:n}=this;return n===t||Array.isArray(n)&&n.includes(t)}_addParent(t){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t}_removeParent(t){let{_parentage:n}=this;n===t?this._parentage=null:Array.isArray(n)&&Zt(n,t)}remove(t){let{_finalizers:n}=this;n&&Zt(n,t),t instanceof e&&t._removeParent(this)}};J.EMPTY=(()=>{let e=new J;return e.closed=!0,e})();var El=J.EMPTY;function gi(e){return e instanceof J||e&&"closed"in e&&N(e.remove)&&N(e.add)&&N(e.unsubscribe)}function Cm(e){N(e)?e():e.unsubscribe()}var sn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Bo={setTimeout(e,t,...n){let{delegate:o}=Bo;return o?.setTimeout?o.setTimeout(e,t,...n):setTimeout(e,t,...n)},clearTimeout(e){let{delegate:t}=Bo;return(t?.clearTimeout||clearTimeout)(e)},delegate:void 0};function vi(e){Bo.setTimeout(()=>{let{onUnhandledError:t}=sn;if(t)t(e);else throw e})}function Br(){}var Dm=Cl("C",void 0,void 0);function _m(e){return Cl("E",void 0,e)}function Im(e){return Cl("N",e,void 0)}function Cl(e,t,n){return{kind:e,value:t,error:n}}var Yt=null;function Vo(e){if(sn.useDeprecatedSynchronousErrorHandling){let t=!Yt;if(t&&(Yt={errorThrown:!1,error:null}),e(),t){let{errorThrown:n,error:o}=Yt;if(Yt=null,n)throw o}}else e()}function Tm(e){sn.useDeprecatedSynchronousErrorHandling&&Yt&&(Yt.errorThrown=!0,Yt.error=e)}var Kt=class extends J{constructor(t){super(),this.isStopped=!1,t?(this.destination=t,gi(t)&&t.add(this)):this.destination=UE}static create(t,n,o){return new Wn(t,n,o)}next(t){this.isStopped?_l(Im(t),this):this._next(t)}error(t){this.isStopped?_l(_m(t),this):(this.isStopped=!0,this._error(t))}complete(){this.isStopped?_l(Dm,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},BE=Function.prototype.bind;function Dl(e,t){return BE.call(e,t)}var Il=class{constructor(t){this.partialObserver=t}next(t){let{partialObserver:n}=this;if(n.next)try{n.next(t)}catch(o){yi(o)}}error(t){let{partialObserver:n}=this;if(n.error)try{n.error(t)}catch(o){yi(o)}else yi(t)}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete()}catch(n){yi(n)}}},Wn=class extends Kt{constructor(t,n,o){super();let r;if(N(t)||!t)r={next:t??void 0,error:n??void 0,complete:o??void 0};else{let a;this&&sn.useDeprecatedNextContext?(a=Object.create(t),a.unsubscribe=()=>this.unsubscribe(),r={next:t.next&&Dl(t.next,a),error:t.error&&Dl(t.error,a),complete:t.complete&&Dl(t.complete,a)}):r=t}this.destination=new Il(r)}};function yi(e){sn.useDeprecatedSynchronousErrorHandling?Tm(e):vi(e)}function VE(e){throw e}function _l(e,t){let{onStoppedNotification:n}=sn;n&&Bo.setTimeout(()=>n(e,t))}var UE={closed:!0,next:Br,error:VE,complete:Br};var Uo=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Pe(e){return e}function Tl(...e){return wl(e)}function wl(e){return e.length===0?Pe:e.length===1?e[0]:function(n){return e.reduce((o,r)=>r(o),n)}}var z=(()=>{class e{constructor(n){n&&(this._subscribe=n)}lift(n){let o=new e;return o.source=this,o.operator=n,o}subscribe(n,o,r){let a=$E(n)?n:new Wn(n,o,r);return Vo(()=>{let{operator:i,source:s}=this;a.add(i?i.call(a,s):s?this._subscribe(a):this._trySubscribe(a))}),a}_trySubscribe(n){try{return this._subscribe(n)}catch(o){n.error(o)}}forEach(n,o){return o=wm(o),new o((r,a)=>{let i=new Wn({next:s=>{try{n(s)}catch(c){a(c),i.unsubscribe()}},error:a,complete:r});this.subscribe(i)})}_subscribe(n){var o;return(o=this.source)===null||o===void 0?void 0:o.subscribe(n)}[Uo](){return this}pipe(...n){return wl(n)(this)}toPromise(n){return n=wm(n),new n((o,r)=>{let a;this.subscribe(i=>a=i,i=>r(i),()=>o(a))})}}return e.create=t=>new e(t),e})();function wm(e){var t;return(t=e??sn.Promise)!==null&&t!==void 0?t:Promise}function HE(e){return e&&N(e.next)&&N(e.error)&&N(e.complete)}function $E(e){return e&&e instanceof Kt||HE(e)&&gi(e)}function Sl(e){return N(e?.lift)}function O(e){return t=>{if(Sl(t))return t.lift(function(n){try{return e(n,this)}catch(o){this.error(o)}});throw new TypeError("Unable to lift unknown Observable type")}}function F(e,t,n,o,r){return new Ml(e,t,n,o,r)}var Ml=class extends Kt{constructor(t,n,o,r,a,i){super(t),this.onFinalize=a,this.shouldUnsubscribe=i,this._next=n?function(s){try{n(s)}catch(c){t.error(c)}}:super._next,this._error=r?function(s){try{r(s)}catch(c){t.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=o?function(){try{o()}catch(s){t.error(s)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((t=this.onFinalize)===null||t===void 0||t.call(this))}}};function Ho(){return O((e,t)=>{let n=null;e._refCount++;let o=F(t,void 0,void 0,void 0,()=>{if(!e||e._refCount<=0||0<--e._refCount){n=null;return}let r=e._connection,a=n;n=null,r&&(!a||r===a)&&r.unsubscribe(),t.unsubscribe()});e.subscribe(o),o.closed||(n=e.connect())})}var $o=class extends z{constructor(t,n){super(),this.source=t,this.subjectFactory=n,this._subject=null,this._refCount=0,this._connection=null,Sl(t)&&(this.lift=t.lift)}_subscribe(t){return this.getSubject().subscribe(t)}getSubject(){let t=this._subject;return(!t||t.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:t}=this;this._subject=this._connection=null,t?.unsubscribe()}connect(){let t=this._connection;if(!t){t=this._connection=new J;let n=this.getSubject();t.add(this.source.subscribe(F(n,void 0,()=>{this._teardown(),n.complete()},o=>{this._teardown(),n.error(o)},()=>this._teardown()))),t.closed&&(this._connection=null,t=J.EMPTY)}return t}refCount(){return Ho()(this)}};var Sm=qo(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var B=(()=>{class e extends z{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(n){let o=new bi(this,this);return o.operator=n,o}_throwIfClosed(){if(this.closed)throw new Sm}next(n){Vo(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let o of this.currentObservers)o.next(n)}})}error(n){Vo(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=n;let{observers:o}=this;for(;o.length;)o.shift().error(n)}})}complete(){Vo(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:n}=this;for(;n.length;)n.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:o,isStopped:r,observers:a}=this;return o||r?El:(this.currentObservers=null,a.push(n),new J(()=>{this.currentObservers=null,Zt(a,n)}))}_checkFinalizedStatuses(n){let{hasError:o,thrownError:r,isStopped:a}=this;o?n.error(r):a&&n.complete()}asObservable(){let n=new z;return n.source=this,n}}return e.create=(t,n)=>new bi(t,n),e})(),bi=class extends B{constructor(t,n){super(),this.destination=t,this.source=n}next(t){var n,o;(o=(n=this.destination)===null||n===void 0?void 0:n.next)===null||o===void 0||o.call(n,t)}error(t){var n,o;(o=(n=this.destination)===null||n===void 0?void 0:n.error)===null||o===void 0||o.call(n,t)}complete(){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||n===void 0||n.call(t)}_subscribe(t){var n,o;return(o=(n=this.source)===null||n===void 0?void 0:n.subscribe(t))!==null&&o!==void 0?o:El}};var ve=class extends B{constructor(t){super(),this._value=t}get value(){return this.getValue()}_subscribe(t){let n=super._subscribe(t);return!n.closed&&t.next(this._value),n}getValue(){let{hasError:t,thrownError:n,_value:o}=this;if(t)throw n;return this._throwIfClosed(),o}next(t){super.next(this._value=t)}};var Al={now(){return(Al.delegate||Date).now()},delegate:void 0};var Ei=class extends J{constructor(t,n){super()}schedule(t,n=0){return this}};var Vr={setInterval(e,t,...n){let{delegate:o}=Vr;return o?.setInterval?o.setInterval(e,t,...n):setInterval(e,t,...n)},clearInterval(e){let{delegate:t}=Vr;return(t?.clearInterval||clearInterval)(e)},delegate:void 0};var Ci=class extends Ei{constructor(t,n){super(t,n),this.scheduler=t,this.work=n,this.pending=!1}schedule(t,n=0){var o;if(this.closed)return this;this.state=t;let r=this.id,a=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(a,r,n)),this.pending=!0,this.delay=n,this.id=(o=this.id)!==null&&o!==void 0?o:this.requestAsyncId(a,this.id,n),this}requestAsyncId(t,n,o=0){return Vr.setInterval(t.flush.bind(t,this),o)}recycleAsyncId(t,n,o=0){if(o!=null&&this.delay===o&&this.pending===!1)return n;n!=null&&Vr.clearInterval(n)}execute(t,n){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let o=this._execute(t,n);if(o)return o;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(t,n){let o=!1,r;try{this.work(t)}catch(a){o=!0,r=a||new Error("Scheduled action threw falsy error")}if(o)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:t,scheduler:n}=this,{actions:o}=n;this.work=this.state=this.scheduler=null,this.pending=!1,Zt(o,this),t!=null&&(this.id=this.recycleAsyncId(n,t,null)),this.delay=null,super.unsubscribe()}}};var Go=class e{constructor(t,n=e.now){this.schedulerActionCtor=t,this.now=n}schedule(t,n=0,o){return new this.schedulerActionCtor(this,t).schedule(o,n)}};Go.now=Al.now;var Di=class extends Go{constructor(t,n=Go.now){super(t,n),this.actions=[],this._active=!1}flush(t){let{actions:n}=this;if(this._active){n.push(t);return}let o;this._active=!0;do if(o=t.execute(t.state,t.delay))break;while(t=n.shift());if(this._active=!1,o){for(;t=n.shift();)t.unsubscribe();throw o}}};var Mm=new Di(Ci);var be=new z(e=>e.complete());function Am(e){return e&&N(e.schedule)}function xl(e){return e[e.length-1]}function _i(e){return N(xl(e))?e.pop():void 0}function An(e){return Am(xl(e))?e.pop():void 0}function xm(e,t){return typeof xl(e)=="number"?e.pop():t}function Nm(e,t,n,o){function r(a){return a instanceof n?a:new n(function(i){i(a)})}return new(n||(n=Promise))(function(a,i){function s(u){try{l(o.next(u))}catch(d){i(d)}}function c(u){try{l(o.throw(u))}catch(d){i(d)}}function l(u){u.done?a(u.value):r(u.value).then(s,c)}l((o=o.apply(e,t||[])).next())})}function Rm(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],o=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function Xt(e){return this instanceof Xt?(this.v=e,this):new Xt(e)}function Pm(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o=n.apply(e,t||[]),r,a=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),s("next"),s("throw"),s("return",i),r[Symbol.asyncIterator]=function(){return this},r;function i(f){return function(g){return Promise.resolve(g).then(f,d)}}function s(f,g){o[f]&&(r[f]=function(T){return new Promise(function(q,P){a.push([f,T,q,P])>1||c(f,T)})},g&&(r[f]=g(r[f])))}function c(f,g){try{l(o[f](g))}catch(T){m(a[0][3],T)}}function l(f){f.value instanceof Xt?Promise.resolve(f.value.v).then(u,d):m(a[0][2],f)}function u(f){c("next",f)}function d(f){c("throw",f)}function m(f,g){f(g),a.shift(),a.length&&c(a[0][0],a[0][1])}}function jm(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof Rm=="function"?Rm(e):e[Symbol.iterator](),n={},o("next"),o("throw"),o("return"),n[Symbol.asyncIterator]=function(){return this},n);function o(a){n[a]=e[a]&&function(i){return new Promise(function(s,c){i=e[a](i),r(s,c,i.done,i.value)})}}function r(a,i,s,c){Promise.resolve(c).then(function(l){a({value:l,done:s})},i)}}var Ii=e=>e&&typeof e.length=="number"&&typeof e!="function";function Ti(e){return N(e?.then)}function wi(e){return N(e[Uo])}function Si(e){return Symbol.asyncIterator&&N(e?.[Symbol.asyncIterator])}function Mi(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function GE(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Ai=GE();function xi(e){return N(e?.[Ai])}function Ri(e){return Pm(this,arguments,function*(){let n=e.getReader();try{for(;;){let{value:o,done:r}=yield Xt(n.read());if(r)return yield Xt(void 0);yield yield Xt(o)}}finally{n.releaseLock()}})}function Ni(e){return N(e?.getReader)}function ee(e){if(e instanceof z)return e;if(e!=null){if(wi(e))return WE(e);if(Ii(e))return JE(e);if(Ti(e))return QE(e);if(Si(e))return Om(e);if(xi(e))return ZE(e);if(Ni(e))return YE(e)}throw Mi(e)}function WE(e){return new z(t=>{let n=e[Uo]();if(N(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function JE(e){return new z(t=>{for(let n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function QE(e){return new z(t=>{e.then(n=>{t.closed||(t.next(n),t.complete())},n=>t.error(n)).then(null,vi)})}function ZE(e){return new z(t=>{for(let n of e)if(t.next(n),t.closed)return;t.complete()})}function Om(e){return new z(t=>{KE(e,t).catch(n=>t.error(n))})}function YE(e){return Om(Ri(e))}function KE(e,t){var n,o,r,a;return Nm(this,void 0,void 0,function*(){try{for(n=jm(e);o=yield n.next(),!o.done;){let i=o.value;if(t.next(i),t.closed)return}}catch(i){r={error:i}}finally{try{o&&!o.done&&(a=n.return)&&(yield a.call(n))}finally{if(r)throw r.error}}t.complete()})}function Be(e,t,n,o=0,r=!1){let a=t.schedule(function(){n(),r?e.add(this.schedule(null,o)):this.unsubscribe()},o);if(e.add(a),!r)return a}function Pi(e,t=0){return O((n,o)=>{n.subscribe(F(o,r=>Be(o,e,()=>o.next(r),t),()=>Be(o,e,()=>o.complete(),t),r=>Be(o,e,()=>o.error(r),t)))})}function ji(e,t=0){return O((n,o)=>{o.add(e.schedule(()=>n.subscribe(o),t))})}function Fm(e,t){return ee(e).pipe(ji(t),Pi(t))}function Lm(e,t){return ee(e).pipe(ji(t),Pi(t))}function km(e,t){return new z(n=>{let o=0;return t.schedule(function(){o===e.length?n.complete():(n.next(e[o++]),n.closed||this.schedule())})})}function zm(e,t){return new z(n=>{let o;return Be(n,t,()=>{o=e[Ai](),Be(n,t,()=>{let r,a;try{({value:r,done:a}=o.next())}catch(i){n.error(i);return}a?n.complete():n.next(r)},0,!0)}),()=>N(o?.return)&&o.return()})}function Oi(e,t){if(!e)throw new Error("Iterable cannot be null");return new z(n=>{Be(n,t,()=>{let o=e[Symbol.asyncIterator]();Be(n,t,()=>{o.next().then(r=>{r.done?n.complete():n.next(r.value)})},0,!0)})})}function qm(e,t){return Oi(Ri(e),t)}function Bm(e,t){if(e!=null){if(wi(e))return Fm(e,t);if(Ii(e))return km(e,t);if(Ti(e))return Lm(e,t);if(Si(e))return Oi(e,t);if(xi(e))return zm(e,t);if(Ni(e))return qm(e,t)}throw Mi(e)}function te(e,t){return t?Bm(e,t):ee(e)}function w(...e){let t=An(e);return te(e,t)}function gt(e,t){let n=N(e)?e:()=>e,o=r=>r.error(n());return new z(t?r=>t.schedule(o,0,r):o)}function Rl(e){return!!e&&(e instanceof z||N(e.lift)&&N(e.subscribe))}var Jn=qo(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence"});function A(e,t){return O((n,o)=>{let r=0;n.subscribe(F(o,a=>{o.next(e.call(t,a,r++))}))})}var{isArray:XE}=Array;function e0(e,t){return XE(t)?e(...t):e(t)}function Fi(e){return A(t=>e0(e,t))}var{isArray:n0}=Array,{getPrototypeOf:t0,prototype:o0,keys:r0}=Object;function Li(e){if(e.length===1){let t=e[0];if(n0(t))return{args:t,keys:null};if(a0(t)){let n=r0(t);return{args:n.map(o=>t[o]),keys:n}}}return{args:e,keys:null}}function a0(e){return e&&typeof e=="object"&&t0(e)===o0}function ki(e,t){return e.reduce((n,o,r)=>(n[o]=t[r],n),{})}function eo(...e){let t=An(e),n=_i(e),{args:o,keys:r}=Li(e);if(o.length===0)return te([],t);let a=new z(i0(o,t,r?i=>ki(r,i):Pe));return n?a.pipe(Fi(n)):a}function i0(e,t,n=Pe){return o=>{Vm(t,()=>{let{length:r}=e,a=new Array(r),i=r,s=r;for(let c=0;c<r;c++)Vm(t,()=>{let l=te(e[c],t),u=!1;l.subscribe(F(o,d=>{a[c]=d,u||(u=!0,s--),s||o.next(n(a.slice()))},()=>{--i||o.complete()}))},o)},o)}}function Vm(e,t,n){e?Be(n,e,t):t()}function Um(e,t,n,o,r,a,i,s){let c=[],l=0,u=0,d=!1,m=()=>{d&&!c.length&&!l&&t.complete()},f=T=>l<o?g(T):c.push(T),g=T=>{a&&t.next(T),l++;let q=!1;ee(n(T,u++)).subscribe(F(t,P=>{r?.(P),a?f(P):t.next(P)},()=>{q=!0},void 0,()=>{if(q)try{for(l--;c.length&&l<o;){let P=c.shift();i?Be(t,i,()=>g(P)):g(P)}m()}catch(P){t.error(P)}}))};return e.subscribe(F(t,f,()=>{d=!0,m()})),()=>{s?.()}}function de(e,t,n=1/0){return N(t)?de((o,r)=>A((a,i)=>t(o,a,r,i))(ee(e(o,r))),n):(typeof t=="number"&&(n=t),O((o,r)=>Um(o,r,e,n)))}function vt(e=1/0){return de(Pe,e)}function Hm(){return vt(1)}function yt(...e){return Hm()(te(e,An(e)))}function Ur(e){return new z(t=>{ee(e()).subscribe(t)})}function Nl(...e){let t=_i(e),{args:n,keys:o}=Li(e),r=new z(a=>{let{length:i}=n;if(!i){a.complete();return}let s=new Array(i),c=i,l=i;for(let u=0;u<i;u++){let d=!1;ee(n[u]).subscribe(F(a,m=>{d||(d=!0,l--),s[u]=m},()=>c--,void 0,()=>{(!c||!d)&&(l||a.next(o?ki(o,s):s),a.complete())}))}});return t?r.pipe(Fi(t)):r}function Pl(...e){let t=An(e),n=xm(e,1/0),o=e;return o.length?o.length===1?ee(o[0]):vt(n)(te(o,t)):be}function ne(e,t){return O((n,o)=>{let r=0;n.subscribe(F(o,a=>e.call(t,a,r++)&&o.next(a)))})}function cn(e){return O((t,n)=>{let o=null,r=!1,a;o=t.subscribe(F(n,void 0,void 0,i=>{a=ee(e(i,cn(e)(t))),o?(o.unsubscribe(),o=null,a.subscribe(n)):r=!0})),r&&(o.unsubscribe(),o=null,a.subscribe(n))})}function $m(e,t,n,o,r){return(a,i)=>{let s=n,c=t,l=0;a.subscribe(F(i,u=>{let d=l++;c=s?e(c,u,d):(s=!0,u),o&&i.next(c)},r&&(()=>{s&&i.next(c),i.complete()})))}}function xn(e,t){return N(t)?de(e,t,1):de(e,1)}function Hr(e,t=Mm){return O((n,o)=>{let r=null,a=null,i=null,s=()=>{if(r){r.unsubscribe(),r=null;let l=a;a=null,o.next(l)}};function c(){let l=i+e,u=t.now();if(u<l){r=this.schedule(void 0,l-u),o.add(r);return}s()}n.subscribe(F(o,l=>{a=l,i=t.now(),r||(r=t.schedule(c,e),o.add(r))},()=>{s(),o.complete()},void 0,()=>{a=r=null}))})}function bt(e){return O((t,n)=>{let o=!1;t.subscribe(F(n,r=>{o=!0,n.next(r)},()=>{o||n.next(e),n.complete()}))})}function je(e){return e<=0?()=>be:O((t,n)=>{let o=0;t.subscribe(F(n,r=>{++o<=e&&(n.next(r),e<=o&&n.complete())}))})}function jl(e,t=Pe){return e=e??s0,O((n,o)=>{let r,a=!0;n.subscribe(F(o,i=>{let s=t(i);(a||!e(r,s))&&(a=!1,r=s,o.next(i))}))})}function s0(e,t){return e===t}function zi(e=c0){return O((t,n)=>{let o=!1;t.subscribe(F(n,r=>{o=!0,n.next(r)},()=>o?n.complete():n.error(e())))})}function c0(){return new Jn}function Et(e){return O((t,n)=>{try{t.subscribe(n)}finally{n.add(e)}})}function Qn(e,t){let n=arguments.length>=2;return o=>o.pipe(e?ne((r,a)=>e(r,a,o)):Pe,je(1),n?bt(t):zi(()=>new Jn))}function Wo(e){return e<=0?()=>be:O((t,n)=>{let o=[];t.subscribe(F(n,r=>{o.push(r),e<o.length&&o.shift()},()=>{for(let r of o)n.next(r);n.complete()},void 0,()=>{o=null}))})}function Ol(e,t){let n=arguments.length>=2;return o=>o.pipe(e?ne((r,a)=>e(r,a,o)):Pe,Wo(1),n?bt(t):zi(()=>new Jn))}function Fl(e,t){return O($m(e,t,arguments.length>=2,!0))}function kl(e={}){let{connector:t=()=>new B,resetOnError:n=!0,resetOnComplete:o=!0,resetOnRefCountZero:r=!0}=e;return a=>{let i,s,c,l=0,u=!1,d=!1,m=()=>{s?.unsubscribe(),s=void 0},f=()=>{m(),i=c=void 0,u=d=!1},g=()=>{let T=i;f(),T?.unsubscribe()};return O((T,q)=>{l++,!d&&!u&&m();let P=c=c??t();q.add(()=>{l--,l===0&&!d&&!u&&(s=Ll(g,r))}),P.subscribe(q),!i&&l>0&&(i=new Wn({next:Sn=>P.next(Sn),error:Sn=>{d=!0,m(),s=Ll(f,n,Sn),P.error(Sn)},complete:()=>{u=!0,m(),s=Ll(f,o),P.complete()}}),ee(T).subscribe(i))})(a)}}function Ll(e,t,...n){if(t===!0){e();return}if(t===!1)return;let o=new Wn({next:()=>{o.unsubscribe(),e()}});return ee(t(...n)).subscribe(o)}function $r(e){return ne((t,n)=>e<=n)}function Ct(...e){let t=An(e);return O((n,o)=>{(t?yt(e,n,t):yt(e,n)).subscribe(o)})}function Ae(e,t){return O((n,o)=>{let r=null,a=0,i=!1,s=()=>i&&!r&&o.complete();n.subscribe(F(o,c=>{r?.unsubscribe();let l=0,u=a++;ee(e(c,u)).subscribe(r=F(o,d=>o.next(t?t(c,d,u,l++):d),()=>{r=null,s()}))},()=>{i=!0,s()}))})}function Dt(e){return O((t,n)=>{ee(e).subscribe(F(n,()=>n.complete(),Br)),!n.closed&&t.subscribe(n)})}function oe(e,t,n){let o=N(e)||t||n?{next:e,error:t,complete:n}:e;return o?O((r,a)=>{var i;(i=o.subscribe)===null||i===void 0||i.call(o);let s=!0;r.subscribe(F(a,c=>{var l;(l=o.next)===null||l===void 0||l.call(o,c),a.next(c)},()=>{var c;s=!1,(c=o.complete)===null||c===void 0||c.call(o),a.complete()},c=>{var l;s=!1,(l=o.error)===null||l===void 0||l.call(o,c),a.error(c)},()=>{var c,l;s&&((c=o.unsubscribe)===null||c===void 0||c.call(o)),(l=o.finalize)===null||l===void 0||l.call(o)}))}):Pe}function Gm(e){let t=R(null);try{return e()}finally{R(t)}}var Wm=$(y({},Oo),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,hasRun:!1,kind:"effect"});function Jm(e){if(e.dirty=!1,e.hasRun&&!Lo(e))return;e.hasRun=!0;let t=Fo(e);try{e.cleanup(),e.fn()}finally{qr(e,t)}}var Hi="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",E=class extends Error{code;constructor(t,n){super(Nn(t,n)),this.code=t}};function l0(e){return`NG0${Math.abs(e)}`}function Nn(e,t){return`${l0(e)}${t?": "+t:""}`}var Le=globalThis;function Q(e){for(let t in e)if(e[t]===Q)return t;throw Error("")}function Km(e,t){for(let n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n])}function Yn(e){if(typeof e=="string")return e;if(Array.isArray(e))return`[${e.map(Yn).join(", ")}]`;if(e==null)return""+e;let t=e.overriddenName||e.name;if(t)return`${t}`;let n=e.toString();if(n==null)return""+n;let o=n.indexOf(`
`);return o>=0?n.slice(0,o):n}function $i(e,t){return e?t?`${e} ${t}`:e:t||""}var u0=Q({__forward_ref__:Q});function Gi(e){return e.__forward_ref__=Gi,e.toString=function(){return Yn(this())},e}function De(e){return Ql(e)?e():e}function Ql(e){return typeof e=="function"&&e.hasOwnProperty(u0)&&e.__forward_ref__===Gi}function Xm(e,t){e==null&&Zl(t,e,null,"!=")}function Zl(e,t,n,o){throw new Error(`ASSERTION ERROR: ${e}`+(o==null?"":` [Expected=> ${n} ${o} ${t} <=Actual]`))}function v(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function re(e){return{providers:e.providers||[],imports:e.imports||[]}}function Yr(e){return d0(e,Wi)}function Yl(e){return Yr(e)!==null}function d0(e,t){return e.hasOwnProperty(t)&&e[t]||null}function p0(e){let t=e?.[Wi]??null;return t||null}function ql(e){return e&&e.hasOwnProperty(Bi)?e[Bi]:null}var Wi=Q({\u0275prov:Q}),Bi=Q({\u0275inj:Q}),C=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(t,n){this._desc=t,this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=v({token:this,providedIn:n.providedIn||"root",factory:n.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Kl(e){return e&&!!e.\u0275providers}var Xl=Q({\u0275cmp:Q}),eu=Q({\u0275dir:Q}),nu=Q({\u0275pipe:Q}),tu=Q({\u0275mod:Q}),Jr=Q({\u0275fac:Q}),ao=Q({__NG_ELEMENT_ID__:Q}),Zm=Q({__NG_ENV_ID__:Q});function Kr(e){return typeof e=="string"?e:e==null?"":String(e)}function Vi(e){return typeof e=="function"?e.name||e.toString():typeof e=="object"&&e!=null&&typeof e.type=="function"?e.type.name||e.type.toString():Kr(e)}var ou=Q({ngErrorCode:Q}),eh=Q({ngErrorMessage:Q}),Wr=Q({ngTokenPath:Q});function ru(e,t){return nh("",-200,t)}function Ji(e,t){throw new E(-201,!1)}function f0(e,t){e[Wr]??=[];let n=e[Wr],o;typeof t=="object"&&"multi"in t&&t?.multi===!0?(Xm(t.provide,"Token with multi: true should have a provide property"),o=Vi(t.provide)):o=Vi(t),n[0]!==o&&e[Wr].unshift(o)}function m0(e,t){let n=e[Wr],o=e[ou],r=e[eh]||e.message;return e.message=g0(r,o,n,t),e}function nh(e,t,n){let o=new E(t,e);return o[ou]=t,o[eh]=e,n&&(o[Wr]=n),o}function h0(e){return e[ou]}function g0(e,t,n=[],o=null){let r="";n&&n.length>1&&(r=` Path: ${n.join(" -> ")}.`);let a=o?` Source: ${o}.`:"";return Nn(t,`${e}${a}${r}`)}var Bl;function th(){return Bl}function Oe(e){let t=Bl;return Bl=e,t}function au(e,t,n){let o=Yr(e);if(o&&o.providedIn=="root")return o.value===void 0?o.value=o.factory():o.value;if(n&8)return null;if(t!==void 0)return t;Ji(e,"Injector")}var v0={},no=v0,y0="__NG_DI_FLAG__",Vl=class{injector;constructor(t){this.injector=t}retrieve(t,n){let o=to(n)||0;try{return this.injector.get(t,o&8?null:no,o)}catch(r){if(jo(r))return r;throw r}}};function b0(e,t=0){let n=ui();if(n===void 0)throw new E(-203,!1);if(n===null)return au(e,void 0,t);{let o=E0(t),r=n.retrieve(e,o);if(jo(r)){if(o.optional)return null;throw r}return r}}function I(e,t=0){return(th()||b0)(De(e),t)}function p(e,t){return I(e,to(t))}function to(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function E0(e){return{optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function Ul(e){let t=[];for(let n=0;n<e.length;n++){let o=De(e[n]);if(Array.isArray(o)){if(o.length===0)throw new E(900,!1);let r,a=0;for(let i=0;i<o.length;i++){let s=o[i],c=C0(s);typeof c=="number"?c===-1?r=s.token:a|=c:r=s}t.push(I(r,a))}else t.push(I(o))}return t}function C0(e){return e[y0]}function _t(e,t){let n=e.hasOwnProperty(Jr);return n?e[Jr]:null}function oh(e,t,n){if(e.length!==t.length)return!1;for(let o=0;o<e.length;o++){let r=e[o],a=t[o];if(n&&(r=n(r),a=n(a)),a!==r)return!1}return!0}function rh(e){return e.flat(Number.POSITIVE_INFINITY)}function Qi(e,t){e.forEach(n=>Array.isArray(n)?Qi(n,t):t(n))}function iu(e,t,n){t>=e.length?e.push(n):e.splice(t,0,n)}function Xr(e,t){return t>=e.length-1?e.pop():e.splice(t,1)[0]}function ah(e,t){let n=[];for(let o=0;o<e;o++)n.push(t);return n}function ih(e,t,n,o){let r=e.length;if(r==t)e.push(n,o);else if(r===1)e.push(o,e[0]),e[0]=n;else{for(r--,e.push(e[r-1],e[r]);r>t;){let a=r-2;e[r]=e[a],r--}e[t]=n,e[t+1]=o}}function Zi(e,t,n){let o=Qo(e,t);return o>=0?e[o|1]=n:(o=~o,ih(e,o,t,n)),o}function Yi(e,t){let n=Qo(e,t);if(n>=0)return e[n|1]}function Qo(e,t){return D0(e,t,1)}function D0(e,t,n){let o=0,r=e.length>>n;for(;r!==o;){let a=o+(r-o>>1),i=e[a<<n];if(t===i)return a<<n;i>t?r=a:o=a+1}return~(r<<n)}var Tt={},Fe=[],Kn=new C(""),su=new C("",-1),cu=new C(""),Qr=class{get(t,n=no){if(n===no){let r=nh("",-201);throw r.name="\u0275NotFound",r}return n}};function lu(e){return e[tu]||null}function Pn(e){return e[Xl]||null}function uu(e){return e[eu]||null}function sh(e){return e[nu]||null}function io(e){return{\u0275providers:e}}function Ki(...e){return{\u0275providers:du(!0,e),\u0275fromNgModule:!0}}function du(e,...t){let n=[],o=new Set,r,a=i=>{n.push(i)};return Qi(t,i=>{let s=i;Ui(s,a,[],o)&&(r||=[],r.push(s))}),r!==void 0&&ch(r,a),n}function ch(e,t){for(let n=0;n<e.length;n++){let{ngModule:o,providers:r}=e[n];pu(r,a=>{t(a,o)})}}function Ui(e,t,n,o){if(e=De(e),!e)return!1;let r=null,a=ql(e),i=!a&&Pn(e);if(!a&&!i){let c=e.ngModule;if(a=ql(c),a)r=c;else return!1}else{if(i&&!i.standalone)return!1;r=e}let s=o.has(r);if(i){if(s)return!1;if(o.add(r),i.dependencies){let c=typeof i.dependencies=="function"?i.dependencies():i.dependencies;for(let l of c)Ui(l,t,n,o)}}else if(a){if(a.imports!=null&&!s){o.add(r);let l;try{Qi(a.imports,u=>{Ui(u,t,n,o)&&(l||=[],l.push(u))})}finally{}l!==void 0&&ch(l,t)}if(!s){let l=_t(r)||(()=>new r);t({provide:r,useFactory:l,deps:Fe},r),t({provide:cu,useValue:r,multi:!0},r),t({provide:Kn,useValue:()=>I(r),multi:!0},r)}let c=a.providers;if(c!=null&&!s){let l=e;pu(c,u=>{t(u,l)})}}else return!1;return r!==e&&e.providers!==void 0}function pu(e,t){for(let n of e)Kl(n)&&(n=n.\u0275providers),Array.isArray(n)?pu(n,t):t(n)}var _0=Q({provide:String,useValue:Q});function lh(e){return e!==null&&typeof e=="object"&&_0 in e}function I0(e){return!!(e&&e.useExisting)}function T0(e){return!!(e&&e.useFactory)}function oo(e){return typeof e=="function"}function uh(e){return!!e.useClass}var ea=new C(""),qi={},Ym={},zl;function Zo(){return zl===void 0&&(zl=new Qr),zl}var ae=class{},ro=class extends ae{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(t,n,o,r){super(),this.parent=n,this.source=o,this.scopes=r,$l(t,i=>this.processProvider(i)),this.records.set(su,Jo(void 0,this)),r.has("environment")&&this.records.set(ae,Jo(void 0,this));let a=this.records.get(ea);a!=null&&typeof a.value=="string"&&this.scopes.add(a.value),this.injectorDefTypes=new Set(this.get(cu,Fe,{self:!0}))}retrieve(t,n){let o=to(n)||0;try{return this.get(t,no,o)}catch(r){if(jo(r))return r;throw r}}destroy(){Gr(this),this._destroyed=!0;let t=R(null);try{for(let o of this._ngOnDestroyHooks)o.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let o of n)o()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),R(t)}}onDestroy(t){return Gr(this),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){Gr(this);let n=Mn(this),o=Oe(void 0),r;try{return t()}finally{Mn(n),Oe(o)}}get(t,n=no,o){if(Gr(this),t.hasOwnProperty(Zm))return t[Zm](this);let r=to(o),a,i=Mn(this),s=Oe(void 0);try{if(!(r&4)){let l=this.records.get(t);if(l===void 0){let u=x0(t)&&Yr(t);u&&this.injectableDefInScope(u)?l=Jo(Hl(t),qi):l=null,this.records.set(t,l)}if(l!=null)return this.hydrate(t,l,r)}let c=r&2?Zo():this.parent;return n=r&8&&n===no?null:n,c.get(t,n)}catch(c){let l=h0(c);throw l===-200||l===-201?new E(l,null):c}finally{Oe(s),Mn(i)}}resolveInjectorInitializers(){let t=R(null),n=Mn(this),o=Oe(void 0),r;try{let a=this.get(Kn,Fe,{self:!0});for(let i of a)i()}finally{Mn(n),Oe(o),R(t)}}toString(){let t=[],n=this.records;for(let o of n.keys())t.push(Yn(o));return`R3Injector[${t.join(", ")}]`}processProvider(t){t=De(t);let n=oo(t)?t:De(t&&t.provide),o=S0(t);if(!oo(t)&&t.multi===!0){let r=this.records.get(n);r||(r=Jo(void 0,qi,!0),r.factory=()=>Ul(r.multi),this.records.set(n,r)),n=t,r.multi.push(t)}this.records.set(n,o)}hydrate(t,n,o){let r=R(null);try{if(n.value===Ym)throw ru(Yn(t));return n.value===qi&&(n.value=Ym,n.value=n.factory(void 0,o)),typeof n.value=="object"&&n.value&&A0(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{R(r)}}injectableDefInScope(t){if(!t.providedIn)return!1;let n=De(t.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(t){let n=this._onDestroyHooks.indexOf(t);n!==-1&&this._onDestroyHooks.splice(n,1)}};function Hl(e){let t=Yr(e),n=t!==null?t.factory:_t(e);if(n!==null)return n;if(e instanceof C)throw new E(204,!1);if(e instanceof Function)return w0(e);throw new E(204,!1)}function w0(e){if(e.length>0)throw new E(204,!1);let n=p0(e);return n!==null?()=>n.factory(e):()=>new e}function S0(e){if(lh(e))return Jo(void 0,e.useValue);{let t=fu(e);return Jo(t,qi)}}function fu(e,t,n){let o;if(oo(e)){let r=De(e);return _t(r)||Hl(r)}else if(lh(e))o=()=>De(e.useValue);else if(T0(e))o=()=>e.useFactory(...Ul(e.deps||[]));else if(I0(e))o=(r,a)=>I(De(e.useExisting),a!==void 0&&a&8?8:void 0);else{let r=De(e&&(e.useClass||e.provide));if(M0(e))o=()=>new r(...Ul(e.deps));else return _t(r)||Hl(r)}return o}function Gr(e){if(e.destroyed)throw new E(205,!1)}function Jo(e,t,n=!1){return{factory:e,value:t,multi:n?[]:void 0}}function M0(e){return!!e.deps}function A0(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function x0(e){return typeof e=="function"||typeof e=="object"&&e.ngMetadataName==="InjectionToken"}function $l(e,t){for(let n of e)Array.isArray(n)?$l(n,t):n&&Kl(n)?$l(n.\u0275providers,t):t(n)}function Ie(e,t){let n;e instanceof ro?(Gr(e),n=e):n=new Vl(e);let o,r=Mn(n),a=Oe(void 0);try{return t()}finally{Mn(r),Oe(a)}}function mu(){return th()!==void 0||ui()!=null}var ln=0,M=1,x=2,Ee=3,Ze=4,ke=5,Yo=6,Ko=7,Te=8,so=9,jn=10,ie=11,Xo=12,hu=13,co=14,Ve=15,wt=16,lo=17,On=18,na=19,gu=20,Zn=21,Xi=22,Xn=23,He=24,uo=25,se=26,dh=1;var St=7,ta=8,po=9,xe=10;function Fn(e){return Array.isArray(e)&&typeof e[dh]=="object"}function un(e){return Array.isArray(e)&&e[dh]===!0}function vu(e){return(e.flags&4)!==0}function Mt(e){return e.componentOffset>-1}function er(e){return(e.flags&1)===1}function Ln(e){return!!e.template}function nr(e){return(e[x]&512)!==0}function fo(e){return(e[x]&256)===256}var yu="svg",ph="math";function Ye(e){for(;Array.isArray(e);)e=e[ln];return e}function bu(e,t){return Ye(t[e])}function dn(e,t){return Ye(t[e.index])}function oa(e,t){return e.data[t]}function Eu(e,t){return e[t]}function Cu(e,t,n,o){n>=e.data.length&&(e.data[n]=null,e.blueprint[n]=null),t[n]=o}function Ke(e,t){let n=t[e];return Fn(n)?n:n[ln]}function fh(e){return(e[x]&4)===4}function es(e){return(e[x]&128)===128}function mh(e){return un(e[Ee])}function kn(e,t){return t==null?null:e[t]}function Du(e){e[lo]=0}function _u(e){e[x]&1024||(e[x]|=1024,es(e)&&At(e))}function hh(e,t){for(;e>0;)t=t[co],e--;return t}function ra(e){return!!(e[x]&9216||e[He]?.dirty)}function ns(e){e[jn].changeDetectionScheduler?.notify(8),e[x]&64&&(e[x]|=1024),ra(e)&&At(e)}function At(e){e[jn].changeDetectionScheduler?.notify(0);let t=It(e);for(;t!==null&&!(t[x]&8192||(t[x]|=8192,!es(t)));)t=It(t)}function Iu(e,t){if(fo(e))throw new E(911,!1);e[Zn]===null&&(e[Zn]=[]),e[Zn].push(t)}function gh(e,t){if(e[Zn]===null)return;let n=e[Zn].indexOf(t);n!==-1&&e[Zn].splice(n,1)}function It(e){let t=e[Ee];return un(t)?t[Ee]:t}function Tu(e){return e[Ko]??=[]}function wu(e){return e.cleanup??=[]}function vh(e,t,n,o){let r=Tu(t);r.push(n),e.firstCreatePass&&wu(e).push(o,r.length-1)}var L={lFrame:Ah(null),bindingsEnabled:!0,skipHydrationRootTNode:null},aa=(function(e){return e[e.Off=0]="Off",e[e.Exhaustive=1]="Exhaustive",e[e.OnlyDirtyViews=2]="OnlyDirtyViews",e})(aa||{}),R0=0,Gl=!1;function yh(){return L.lFrame.elementDepthCount}function bh(){L.lFrame.elementDepthCount++}function Su(){L.lFrame.elementDepthCount--}function ts(){return L.bindingsEnabled}function Mu(){return L.skipHydrationRootTNode!==null}function Au(e){return L.skipHydrationRootTNode===e}function xu(){L.skipHydrationRootTNode=null}function k(){return L.lFrame.lView}function ge(){return L.lFrame.tView}function pn(e){return L.lFrame.contextLView=e,e[Te]}function fn(e){return L.lFrame.contextLView=null,e}function Ce(){let e=Ru();for(;e!==null&&e.type===64;)e=e.parent;return e}function Ru(){return L.lFrame.currentTNode}function Eh(){let e=L.lFrame,t=e.currentTNode;return e.isParent?t:t.parent}function tr(e,t){let n=L.lFrame;n.currentTNode=e,n.isParent=t}function Nu(){return L.lFrame.isParent}function Pu(){L.lFrame.isParent=!1}function Ch(){return L.lFrame.contextLView}function ju(e){Zl("Must never be called in production mode"),R0=e}function Ou(){return Gl}function or(e){let t=Gl;return Gl=e,t}function Dh(){let e=L.lFrame,t=e.bindingRootIndex;return t===-1&&(t=e.bindingRootIndex=e.tView.bindingStartIndex),t}function _h(e){return L.lFrame.bindingIndex=e}function ia(){return L.lFrame.bindingIndex++}function Fu(e){let t=L.lFrame,n=t.bindingIndex;return t.bindingIndex=t.bindingIndex+e,n}function Ih(){return L.lFrame.inI18n}function Th(e,t){let n=L.lFrame;n.bindingIndex=n.bindingRootIndex=e,os(t)}function wh(){return L.lFrame.currentDirectiveIndex}function os(e){L.lFrame.currentDirectiveIndex=e}function Sh(e){let t=L.lFrame.currentDirectiveIndex;return t===-1?null:e[t]}function Lu(){return L.lFrame.currentQueryIndex}function rs(e){L.lFrame.currentQueryIndex=e}function N0(e){let t=e[M];return t.type===2?t.declTNode:t.type===1?e[ke]:null}function ku(e,t,n){if(n&4){let r=t,a=e;for(;r=r.parent,r===null&&!(n&1);)if(r=N0(a),r===null||(a=a[co],r.type&10))break;if(r===null)return!1;t=r,e=a}let o=L.lFrame=Mh();return o.currentTNode=t,o.lView=e,!0}function as(e){let t=Mh(),n=e[M];L.lFrame=t,t.currentTNode=n.firstChild,t.lView=e,t.tView=n,t.contextLView=e,t.bindingIndex=n.bindingStartIndex,t.inI18n=!1}function Mh(){let e=L.lFrame,t=e===null?null:e.child;return t===null?Ah(e):t}function Ah(e){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=t),t}function xh(){let e=L.lFrame;return L.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var zu=xh;function is(){let e=xh();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function Rh(e){return(L.lFrame.contextLView=hh(e,L.lFrame.contextLView))[Te]}function xt(){return L.lFrame.selectedIndex}function Rt(e){L.lFrame.selectedIndex=e}function qu(){let e=L.lFrame;return oa(e.tView,e.selectedIndex)}function ss(){L.lFrame.currentNamespace=yu}function Nh(){return L.lFrame.currentNamespace}var Ph=!0;function cs(){return Ph}function sa(e){Ph=e}var P0={elements:void 0};function ls(){return P0}function Wl(e,t=null,n=null,o){let r=Bu(e,t,n,o);return r.resolveInjectorInitializers(),r}function Bu(e,t=null,n=null,o,r=new Set){let a=[n||Fe,Ki(e)];return o=o||(typeof e=="object"?void 0:Yn(e)),new ro(a,t||Zo(),o||null,r)}var he=class e{static THROW_IF_NOT_FOUND=no;static NULL=new Qr;static create(t,n){if(Array.isArray(t))return Wl({name:""},n,t,"");{let o=t.name??"";return Wl({name:o},t.parent,t.providers,o)}}static \u0275prov=v({token:e,providedIn:"any",factory:()=>I(su)});static __NG_ELEMENT_ID__=-1},U=new C(""),mn=(()=>{class e{static __NG_ELEMENT_ID__=j0;static __NG_ENV_ID__=n=>n}return e})(),Zr=class extends mn{_lView;constructor(t){super(),this._lView=t}get destroyed(){return fo(this._lView)}onDestroy(t){let n=this._lView;return Iu(n,t),()=>gh(n,t)}};function j0(){return new Zr(k())}var _e=class{_console=console;handleError(t){this._console.error("ERROR",t)}},$e=new C("",{providedIn:"root",factory:()=>{let e=p(ae),t;return n=>{e.destroyed&&!t?setTimeout(()=>{throw n}):(t??=e.get(_e),t.handleError(n))}}}),jh={provide:Kn,useValue:()=>void p(_e),multi:!0};function ca(e){return typeof e=="function"&&e[Ne]!==void 0}function Xe(e,t){let[n,o,r]=yl(e,t?.equal),a=n,i=a[Ne];return a.set=o,a.update=r,a.asReadonly=Vu.bind(a),a}function Vu(){let e=this[Ne];if(e.readonlyFn===void 0){let t=()=>this();t[Ne]=e,e.readonlyFn=t}return e.readonlyFn}var Rn=class{},la=new C("",{providedIn:"root",factory:()=>!1});var Uu=new C(""),Hu=new C("");var rr=(()=>{class e{view;node;constructor(n,o){this.view=n,this.node=o}static __NG_ELEMENT_ID__=O0}return e})();function O0(){return new rr(k(),Ce())}var et=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new ve(!1);get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new z(n=>{n.next(!1),n.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let n=this.taskId++;return this.pendingTasks.add(n),n}has(n){return this.pendingTasks.has(n)}remove(n){this.pendingTasks.delete(n),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=v({token:e,providedIn:"root",factory:()=>new e})}return e})();function mo(...e){}var ua=(()=>{class e{static \u0275prov=v({token:e,providedIn:"root",factory:()=>new Jl})}return e})(),Jl=class{dirtyEffectCount=0;queues=new Map;add(t){this.enqueue(t),this.schedule(t)}schedule(t){t.dirty&&this.dirtyEffectCount++}remove(t){let n=t.zone,o=this.queues.get(n);o.has(t)&&(o.delete(t),t.dirty&&this.dirtyEffectCount--)}enqueue(t){let n=t.zone;this.queues.has(n)||this.queues.set(n,new Set);let o=this.queues.get(n);o.has(t)||o.add(t)}flush(){for(;this.dirtyEffectCount>0;){let t=!1;for(let[n,o]of this.queues)n===null?t||=this.flushQueue(o):t||=n.run(()=>this.flushQueue(o));t||(this.dirtyEffectCount=0)}}flushQueue(t){let n=!1;for(let o of t)o.dirty&&(this.dirtyEffectCount--,n=!0,o.run());return n}};function va(e){return{toString:e}.toString()}function V0(e){return typeof e=="function"}var ys=class{previousValue;currentValue;firstChange;constructor(t,n,o){this.previousValue=t,this.currentValue=n,this.firstChange=o}isFirstChange(){return this.firstChange}};function pg(e,t,n,o){t!==null?t.applyValueToInputSignal(t,o):e[n]=o}var bn=(()=>{let e=()=>fg;return e.ngInherit=!0,e})();function fg(e){return e.type.prototype.ngOnChanges&&(e.setInput=H0),U0}function U0(){let e=hg(this),t=e?.current;if(t){let n=e.previous;if(n===Tt)e.previous=t;else for(let o in t)n[o]=t[o];e.current=null,this.ngOnChanges(t)}}function H0(e,t,n,o,r){let a=this.declaredInputs[o],i=hg(e)||$0(e,{previous:Tt,current:null}),s=i.current||(i.current={}),c=i.previous,l=c[a];s[a]=new ys(l&&l.currentValue,n,c===Tt),pg(e,t,r,n)}var mg="__ngSimpleChanges__";function hg(e){return e[mg]||null}function $0(e,t){return e[mg]=t}var Oh=[];var Z=function(e,t=null,n){for(let o=0;o<Oh.length;o++){let r=Oh[o];r(e,t,n)}};function G0(e,t,n){let{ngOnChanges:o,ngOnInit:r,ngDoCheck:a}=t.type.prototype;if(o){let i=fg(t);(n.preOrderHooks??=[]).push(e,i),(n.preOrderCheckHooks??=[]).push(e,i)}r&&(n.preOrderHooks??=[]).push(0-e,r),a&&((n.preOrderHooks??=[]).push(e,a),(n.preOrderCheckHooks??=[]).push(e,a))}function gg(e,t){for(let n=t.directiveStart,o=t.directiveEnd;n<o;n++){let a=e.data[n].type.prototype,{ngAfterContentInit:i,ngAfterContentChecked:s,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=a;i&&(e.contentHooks??=[]).push(-n,i),s&&((e.contentHooks??=[]).push(n,s),(e.contentCheckHooks??=[]).push(n,s)),c&&(e.viewHooks??=[]).push(-n,c),l&&((e.viewHooks??=[]).push(n,l),(e.viewCheckHooks??=[]).push(n,l)),u!=null&&(e.destroyHooks??=[]).push(n,u)}}function ms(e,t,n){vg(e,t,3,n)}function hs(e,t,n,o){(e[x]&3)===n&&vg(e,t,n,o)}function $u(e,t){let n=e[x];(n&3)===t&&(n&=16383,n+=1,e[x]=n)}function vg(e,t,n,o){let r=o!==void 0?e[lo]&65535:0,a=o??-1,i=t.length-1,s=0;for(let c=r;c<i;c++)if(typeof t[c+1]=="number"){if(s=t[c],o!=null&&s>=o)break}else t[c]<0&&(e[lo]+=65536),(s<a||a==-1)&&(W0(e,n,t,c),e[lo]=(e[lo]&4294901760)+c+2),c++}function Fh(e,t){Z(4,e,t);let n=R(null);try{t.call(e)}finally{R(n),Z(5,e,t)}}function W0(e,t,n,o){let r=n[o]<0,a=n[o+1],i=r?-n[o]:n[o],s=e[i];r?e[x]>>14<e[lo]>>16&&(e[x]&3)===t&&(e[x]+=16384,Fh(s,a)):Fh(s,a)}var ir=-1,go=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(t,n,o,r){this.factory=t,this.name=r,this.canSeeViewProviders=n,this.injectImpl=o}};function J0(e){return(e.flags&8)!==0}function Q0(e){return(e.flags&16)!==0}function Z0(e,t,n){let o=0;for(;o<n.length;){let r=n[o];if(typeof r=="number"){if(r!==0)break;o++;let a=n[o++],i=n[o++],s=n[o++];e.setAttribute(t,i,s,a)}else{let a=r,i=n[++o];Y0(a)?e.setProperty(t,a,i):e.setAttribute(t,a,i),o++}}return o}function yg(e){return e===3||e===4||e===6}function Y0(e){return e.charCodeAt(0)===64}function sr(e,t){if(!(t===null||t.length===0))if(e===null||e.length===0)e=t.slice();else{let n=-1;for(let o=0;o<t.length;o++){let r=t[o];typeof r=="number"?n=r:n===0||(n===-1||n===2?Lh(e,n,r,null,t[++o]):Lh(e,n,r,null,null))}}return e}function Lh(e,t,n,o,r){let a=0,i=e.length;if(t===-1)i=-1;else for(;a<e.length;){let s=e[a++];if(typeof s=="number"){if(s===t){i=-1;break}else if(s>t){i=a-1;break}}}for(;a<e.length;){let s=e[a];if(typeof s=="number")break;if(s===n){r!==null&&(e[a+1]=r);return}a++,r!==null&&a++}i!==-1&&(e.splice(i,0,t),a=i+1),e.splice(a++,0,n),r!==null&&e.splice(a++,0,r)}function bg(e){return e!==ir}function bs(e){return e&32767}function K0(e){return e>>16}function Es(e,t){let n=K0(e),o=t;for(;n>0;)o=o[co],n--;return o}var nd=!0;function Cs(e){let t=nd;return nd=e,t}var X0=256,Eg=X0-1,Cg=5,eC=0,zn={};function nC(e,t,n){let o;typeof n=="string"?o=n.charCodeAt(0)||0:n.hasOwnProperty(ao)&&(o=n[ao]),o==null&&(o=n[ao]=eC++);let r=o&Eg,a=1<<r;t.data[e+(r>>Cg)]|=a}function Ds(e,t){let n=Dg(e,t);if(n!==-1)return n;let o=t[M];o.firstCreatePass&&(e.injectorIndex=t.length,Gu(o.data,e),Gu(t,null),Gu(o.blueprint,null));let r=Od(e,t),a=e.injectorIndex;if(bg(r)){let i=bs(r),s=Es(r,t),c=s[M].data;for(let l=0;l<8;l++)t[a+l]=s[i+l]|c[i+l]}return t[a+8]=r,a}function Gu(e,t){e.push(0,0,0,0,0,0,0,0,t)}function Dg(e,t){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||t[e.injectorIndex+8]===null?-1:e.injectorIndex}function Od(e,t){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let n=0,o=null,r=t;for(;r!==null;){if(o=Sg(r),o===null)return ir;if(n++,r=r[co],o.injectorIndex!==-1)return o.injectorIndex|n<<16}return ir}function td(e,t,n){nC(e,t,n)}function tC(e,t){if(t==="class")return e.classes;if(t==="style")return e.styles;let n=e.attrs;if(n){let o=n.length,r=0;for(;r<o;){let a=n[r];if(yg(a))break;if(a===0)r=r+2;else if(typeof a=="number")for(r++;r<o&&typeof n[r]=="string";)r++;else{if(a===t)return n[r+1];r=r+2}}}return null}function _g(e,t,n){if(n&8||e!==void 0)return e;Ji(t,"NodeInjector")}function Ig(e,t,n,o){if(n&8&&o===void 0&&(o=null),(n&3)===0){let r=e[so],a=Oe(void 0);try{return r?r.get(t,o,n&8):au(t,o,n&8)}finally{Oe(a)}}return _g(o,t,n)}function Tg(e,t,n,o=0,r){if(e!==null){if(t[x]&2048&&!(o&2)){let i=iC(e,t,n,o,zn);if(i!==zn)return i}let a=wg(e,t,n,o,zn);if(a!==zn)return a}return Ig(t,n,o,r)}function wg(e,t,n,o,r){let a=rC(n);if(typeof a=="function"){if(!ku(t,e,o))return o&1?_g(r,n,o):Ig(t,n,o,r);try{let i;if(i=a(o),i==null&&!(o&8))Ji(n);else return i}finally{zu()}}else if(typeof a=="number"){let i=null,s=Dg(e,t),c=ir,l=o&1?t[Ve][ke]:null;for((s===-1||o&4)&&(c=s===-1?Od(e,t):t[s+8],c===ir||!zh(o,!1)?s=-1:(i=t[M],s=bs(c),t=Es(c,t)));s!==-1;){let u=t[M];if(kh(a,s,u.data)){let d=oC(s,t,n,i,o,l);if(d!==zn)return d}c=t[s+8],c!==ir&&zh(o,t[M].data[s+8]===l)&&kh(a,s,t)?(i=u,s=bs(c),t=Es(c,t)):s=-1}}return r}function oC(e,t,n,o,r,a){let i=t[M],s=i.data[e+8],c=o==null?Mt(s)&&nd:o!=i&&(s.type&3)!==0,l=r&1&&a===s,u=gs(s,i,n,c,l);return u!==null?fa(t,i,u,s,r):zn}function gs(e,t,n,o,r){let a=e.providerIndexes,i=t.data,s=a&1048575,c=e.directiveStart,l=e.directiveEnd,u=a>>20,d=o?s:s+u,m=r?s+u:l;for(let f=d;f<m;f++){let g=i[f];if(f<c&&n===g||f>=c&&g.type===n)return f}if(r){let f=i[c];if(f&&Ln(f)&&f.type===n)return c}return null}function fa(e,t,n,o,r){let a=e[n],i=t.data;if(a instanceof go){let s=a;if(s.resolving){let f=Vi(i[n]);throw ru(f)}let c=Cs(s.canSeeViewProviders);s.resolving=!0;let l=i[n].type||i[n],u,d=s.injectImpl?Oe(s.injectImpl):null,m=ku(e,o,0);try{a=e[n]=s.factory(void 0,r,i,e,o),t.firstCreatePass&&n>=o.directiveStart&&G0(n,i[n],t)}finally{d!==null&&Oe(d),Cs(c),s.resolving=!1,zu()}}return a}function rC(e){if(typeof e=="string")return e.charCodeAt(0)||0;let t=e.hasOwnProperty(ao)?e[ao]:void 0;return typeof t=="number"?t>=0?t&Eg:aC:t}function kh(e,t,n){let o=1<<e;return!!(n[t+(e>>Cg)]&o)}function zh(e,t){return!(e&2)&&!(e&1&&t)}var ho=class{_tNode;_lView;constructor(t,n){this._tNode=t,this._lView=n}get(t,n,o){return Tg(this._tNode,this._lView,t,to(o),n)}};function aC(){return new ho(Ce(),k())}function yo(e){return va(()=>{let t=e.prototype.constructor,n=t[Jr]||od(t),o=Object.prototype,r=Object.getPrototypeOf(e.prototype).constructor;for(;r&&r!==o;){let a=r[Jr]||od(r);if(a&&a!==n)return a;r=Object.getPrototypeOf(r)}return a=>new a})}function od(e){return Ql(e)?()=>{let t=od(De(e));return t&&t()}:_t(e)}function iC(e,t,n,o,r){let a=e,i=t;for(;a!==null&&i!==null&&i[x]&2048&&!nr(i);){let s=wg(a,i,n,o|2,zn);if(s!==zn)return s;let c=a.parent;if(!c){let l=i[gu];if(l){let u=l.get(n,zn,o);if(u!==zn)return u}c=Sg(i),i=i[co]}a=c}return r}function Sg(e){let t=e[M],n=t.type;return n===2?t.declTNode:n===1?e[ke]:null}function ya(e){return tC(Ce(),e)}function sC(){return ur(Ce(),k())}function ur(e,t){return new pe(dn(e,t))}var pe=(()=>{class e{nativeElement;constructor(n){this.nativeElement=n}static __NG_ELEMENT_ID__=sC}return e})();function cC(e){return e instanceof pe?e.nativeElement:e}function lC(){return this._results[Symbol.iterator]()}var nt=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new B}constructor(t=!1){this._emitDistinctChangesOnly=t}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,n){return this._results.reduce(t,n)}forEach(t){this._results.forEach(t)}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,n){this.dirty=!1;let o=rh(t);(this._changesDetected=!oh(this._results,o,n))&&(this._results=o,this.length=o.length,this.last=o[this.length-1],this.first=o[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(t){this._onDirty=t}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=lC};function Mg(e){return(e.flags&128)===128}var Fd=(function(e){return e[e.OnPush=0]="OnPush",e[e.Default=1]="Default",e})(Fd||{}),Ag=new Map,uC=0;function dC(){return uC++}function pC(e){Ag.set(e[na],e)}function rd(e){Ag.delete(e[na])}var qh="__ngContext__";function cr(e,t){Fn(t)?(e[qh]=t[na],pC(t)):e[qh]=t}function xg(e){return Ng(e[Xo])}function Rg(e){return Ng(e[Ze])}function Ng(e){for(;e!==null&&!un(e);)e=e[Ze];return e}var ad;function Ld(e){ad=e}function Pg(){if(ad!==void 0)return ad;if(typeof document<"u")return document;throw new E(210,!1)}var dr=new C("",{providedIn:"root",factory:()=>fC}),fC="ng",Ls=new C(""),Ot=new C("",{providedIn:"platform",factory:()=>"unknown"});var kd=new C(""),pr=new C("",{providedIn:"root",factory:()=>Pg().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var mC="h",hC="b";var jg=!1,Og=new C("",{providedIn:"root",factory:()=>jg});var ks=new C("");var gC=(e,t,n,o)=>{};function vC(e,t,n,o){gC(e,t,n,o)}function zs(e){return(e.flags&32)===32}var yC=()=>null;function Fg(e,t,n=!1){return yC(e,t,n)}function Lg(e,t){let n=e.contentQueries;if(n!==null){let o=R(null);try{for(let r=0;r<n.length;r+=2){let a=n[r],i=n[r+1];if(i!==-1){let s=e.data[i];rs(a),s.contentQueries(2,t[i],i)}}}finally{R(o)}}}function id(e,t,n){rs(0);let o=R(null);try{t(e,n)}finally{R(o)}}function zd(e,t,n){if(vu(t)){let o=R(null);try{let r=t.directiveStart,a=t.directiveEnd;for(let i=r;i<a;i++){let s=e.data[i];if(s.contentQueries){let c=n[i];s.contentQueries(1,c,i)}}}finally{R(o)}}}var tt=(function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e})(tt||{}),us;function bC(){if(us===void 0&&(us=null,Le.trustedTypes))try{us=Le.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return us}function qs(e){return bC()?.createHTML(e)||e}var ds;function EC(){if(ds===void 0&&(ds=null,Le.trustedTypes))try{ds=Le.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return ds}function Bh(e){return EC()?.createScriptURL(e)||e}var ot=class{changingThisBreaksApplicationSecurity;constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Hi})`}},sd=class extends ot{getTypeName(){return"HTML"}},cd=class extends ot{getTypeName(){return"Style"}},ld=class extends ot{getTypeName(){return"Script"}},ud=class extends ot{getTypeName(){return"URL"}},dd=class extends ot{getTypeName(){return"ResourceURL"}};function en(e){return e instanceof ot?e.changingThisBreaksApplicationSecurity:e}function it(e,t){let n=kg(e);if(n!=null&&n!==t){if(n==="ResourceURL"&&t==="URL")return!0;throw new Error(`Required a safe ${t}, got a ${n} (see ${Hi})`)}return n===t}function kg(e){return e instanceof ot&&e.getTypeName()||null}function qd(e){return new sd(e)}function Bd(e){return new cd(e)}function Vd(e){return new ld(e)}function Ud(e){return new ud(e)}function Hd(e){return new dd(e)}function CC(e){let t=new fd(e);return DC()?new pd(t):t}var pd=class{inertDocumentHelper;constructor(t){this.inertDocumentHelper=t}getInertBodyElement(t){t="<body><remove></remove>"+t;try{let n=new window.DOMParser().parseFromString(qs(t),"text/html").body;return n===null?this.inertDocumentHelper.getInertBodyElement(t):(n.firstChild?.remove(),n)}catch{return null}}},fd=class{defaultDoc;inertDocument;constructor(t){this.defaultDoc=t,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(t){let n=this.inertDocument.createElement("template");return n.innerHTML=qs(t),n}};function DC(){try{return!!new window.DOMParser().parseFromString(qs(""),"text/html")}catch{return!1}}var _C=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function ba(e){return e=String(e),e.match(_C)?e:"unsafe:"+e}function st(e){let t={};for(let n of e.split(","))t[n]=!0;return t}function Ea(...e){let t={};for(let n of e)for(let o in n)n.hasOwnProperty(o)&&(t[o]=!0);return t}var zg=st("area,br,col,hr,img,wbr"),qg=st("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),Bg=st("rp,rt"),IC=Ea(Bg,qg),TC=Ea(qg,st("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),wC=Ea(Bg,st("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Vh=Ea(zg,TC,wC,IC),Vg=st("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),SC=st("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),MC=st("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),AC=Ea(Vg,SC,MC),xC=st("script,style,template"),md=class{sanitizedSomething=!1;buf=[];sanitizeChildren(t){let n=t.firstChild,o=!0,r=[];for(;n;){if(n.nodeType===Node.ELEMENT_NODE?o=this.startElement(n):n.nodeType===Node.TEXT_NODE?this.chars(n.nodeValue):this.sanitizedSomething=!0,o&&n.firstChild){r.push(n),n=PC(n);continue}for(;n;){n.nodeType===Node.ELEMENT_NODE&&this.endElement(n);let a=NC(n);if(a){n=a;break}n=r.pop()}}return this.buf.join("")}startElement(t){let n=Uh(t).toLowerCase();if(!Vh.hasOwnProperty(n))return this.sanitizedSomething=!0,!xC.hasOwnProperty(n);this.buf.push("<"),this.buf.push(n);let o=t.attributes;for(let r=0;r<o.length;r++){let a=o.item(r),i=a.name,s=i.toLowerCase();if(!AC.hasOwnProperty(s)){this.sanitizedSomething=!0;continue}let c=a.value;Vg[s]&&(c=ba(c)),this.buf.push(" ",i,'="',Hh(c),'"')}return this.buf.push(">"),!0}endElement(t){let n=Uh(t).toLowerCase();Vh.hasOwnProperty(n)&&!zg.hasOwnProperty(n)&&(this.buf.push("</"),this.buf.push(n),this.buf.push(">"))}chars(t){this.buf.push(Hh(t))}};function RC(e,t){return(e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function NC(e){let t=e.nextSibling;if(t&&e!==t.previousSibling)throw Ug(t);return t}function PC(e){let t=e.firstChild;if(t&&RC(e,t))throw Ug(t);return t}function Uh(e){let t=e.nodeName;return typeof t=="string"?t:"FORM"}function Ug(e){return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)}var jC=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,OC=/([^\#-~ |!])/g;function Hh(e){return e.replace(/&/g,"&amp;").replace(jC,function(t){let n=t.charCodeAt(0),o=t.charCodeAt(1);return"&#"+((n-55296)*1024+(o-56320)+65536)+";"}).replace(OC,function(t){return"&#"+t.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var ps;function $d(e,t){let n=null;try{ps=ps||CC(e);let o=t?String(t):"";n=ps.getInertBodyElement(o);let r=5,a=o;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,o=a,a=n.innerHTML,n=ps.getInertBodyElement(o)}while(o!==a);let s=new md().sanitizeChildren($h(n)||n);return qs(s)}finally{if(n){let o=$h(n)||n;for(;o.firstChild;)o.firstChild.remove()}}}function $h(e){return"content"in e&&FC(e)?e.content:null}function FC(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}var we=(function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e})(we||{});function En(e){let t=$g();return t?t.sanitize(we.URL,e)||"":it(e,"URL")?en(e):ba(Kr(e))}function Hg(e){let t=$g();if(t)return Bh(t.sanitize(we.RESOURCE_URL,e)||"");if(it(e,"ResourceURL"))return Bh(en(e));throw new E(904,!1)}function LC(e,t){return t==="src"&&(e==="embed"||e==="frame"||e==="iframe"||e==="media"||e==="script")||t==="href"&&(e==="base"||e==="link")?Hg:En}function Gd(e,t,n){return LC(t,n)(e)}function $g(){let e=k();return e&&e[jn].sanitizer}var kC=/^>|^->|<!--|-->|--!>|<!-$/g,zC=/(<|>)/g,qC="\u200B$1\u200B";function BC(e){return e.replace(kC,t=>t.replace(zC,qC))}function Wd(e){return e.ownerDocument.defaultView}function Gg(e){return e instanceof Function?e():e}function VC(e,t,n){let o=e.length;for(;;){let r=e.indexOf(t,n);if(r===-1)return r;if(r===0||e.charCodeAt(r-1)<=32){let a=t.length;if(r+a===o||e.charCodeAt(r+a)<=32)return r}n=r+1}}var Wg="ng-template";function UC(e,t,n,o){let r=0;if(o){for(;r<t.length&&typeof t[r]=="string";r+=2)if(t[r]==="class"&&VC(t[r+1].toLowerCase(),n,0)!==-1)return!0}else if(Jd(e))return!1;if(r=t.indexOf(1,r),r>-1){let a;for(;++r<t.length&&typeof(a=t[r])=="string";)if(a.toLowerCase()===n)return!0}return!1}function Jd(e){return e.type===4&&e.value!==Wg}function HC(e,t,n){let o=e.type===4&&!n?Wg:e.value;return t===o}function $C(e,t,n){let o=4,r=e.attrs,a=r!==null?JC(r):0,i=!1;for(let s=0;s<t.length;s++){let c=t[s];if(typeof c=="number"){if(!i&&!hn(o)&&!hn(c))return!1;if(i&&hn(c))continue;i=!1,o=c|o&1;continue}if(!i)if(o&4){if(o=2|o&1,c!==""&&!HC(e,c,n)||c===""&&t.length===1){if(hn(o))return!1;i=!0}}else if(o&8){if(r===null||!UC(e,r,c,n)){if(hn(o))return!1;i=!0}}else{let l=t[++s],u=GC(c,r,Jd(e),n);if(u===-1){if(hn(o))return!1;i=!0;continue}if(l!==""){let d;if(u>a?d="":d=r[u+1].toLowerCase(),o&2&&l!==d){if(hn(o))return!1;i=!0}}}}return hn(o)||i}function hn(e){return(e&1)===0}function GC(e,t,n,o){if(t===null)return-1;let r=0;if(o||!n){let a=!1;for(;r<t.length;){let i=t[r];if(i===e)return r;if(i===3||i===6)a=!0;else if(i===1||i===2){let s=t[++r];for(;typeof s=="string";)s=t[++r];continue}else{if(i===4)break;if(i===0){r+=4;continue}}r+=a?1:2}return-1}else return QC(t,e)}function Jg(e,t,n=!1){for(let o=0;o<t.length;o++)if($C(e,t[o],n))return!0;return!1}function WC(e){let t=e.attrs;if(t!=null){let n=t.indexOf(5);if((n&1)===0)return t[n+1]}return null}function JC(e){for(let t=0;t<e.length;t++){let n=e[t];if(yg(n))return t}return e.length}function QC(e,t){let n=e.indexOf(4);if(n>-1)for(n++;n<e.length;){let o=e[n];if(typeof o=="number")return-1;if(o===t)return n;n++}return-1}function ZC(e,t){e:for(let n=0;n<t.length;n++){let o=t[n];if(e.length===o.length){for(let r=0;r<e.length;r++)if(e[r]!==o[r])continue e;return!0}}return!1}function Gh(e,t){return e?":not("+t.trim()+")":t}function YC(e){let t=e[0],n=1,o=2,r="",a=!1;for(;n<e.length;){let i=e[n];if(typeof i=="string")if(o&2){let s=e[++n];r+="["+i+(s.length>0?'="'+s+'"':"")+"]"}else o&8?r+="."+i:o&4&&(r+=" "+i);else r!==""&&!hn(i)&&(t+=Gh(a,r),r=""),o=i,a=a||!hn(o);n++}return r!==""&&(t+=Gh(a,r)),t}function KC(e){return e.map(YC).join(",")}function XC(e){let t=[],n=[],o=1,r=2;for(;o<e.length;){let a=e[o];if(typeof a=="string")r===2?a!==""&&t.push(a,e[++o]):r===8&&n.push(a);else{if(!hn(r))break;r=a}o++}return n.length&&t.push(1,...n),t}var nn={};function eD(e,t){return e.createText(t)}function nD(e,t,n){e.setValue(t,n)}function tD(e,t){return e.createComment(BC(t))}function Qg(e,t,n){return e.createElement(t,n)}function _s(e,t,n,o,r){e.insertBefore(t,n,o,r)}function Zg(e,t,n){e.appendChild(t,n)}function Wh(e,t,n,o,r){o!==null?_s(e,t,n,o,r):Zg(e,t,n)}function oD(e,t,n){e.removeChild(null,t,n)}function rD(e,t,n){e.setAttribute(t,"style",n)}function aD(e,t,n){n===""?e.removeAttribute(t,"class"):e.setAttribute(t,"class",n)}function Yg(e,t,n){let{mergedAttrs:o,classes:r,styles:a}=n;o!==null&&Z0(e,t,o),r!==null&&aD(e,t,r),a!==null&&rD(e,t,a)}function Qd(e,t,n,o,r,a,i,s,c,l,u){let d=se+o,m=d+r,f=iD(d,m),g=typeof l=="function"?l():l;return f[M]={type:e,blueprint:f,template:n,queries:null,viewQuery:s,declTNode:t,data:f.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:m,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof a=="function"?a():a,pipeRegistry:typeof i=="function"?i():i,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:u}}function iD(e,t){let n=[];for(let o=0;o<t;o++)n.push(o<e?null:nn);return n}function sD(e){let t=e.tView;return t===null||t.incompleteFirstPass?e.tView=Qd(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):t}function Zd(e,t,n,o,r,a,i,s,c,l,u){let d=t.blueprint.slice();return d[ln]=r,d[x]=o|4|128|8|64|1024,(l!==null||e&&e[x]&2048)&&(d[x]|=2048),Du(d),d[Ee]=d[co]=e,d[Te]=n,d[jn]=i||e&&e[jn],d[ie]=s||e&&e[ie],d[so]=c||e&&e[so]||null,d[ke]=a,d[na]=dC(),d[Yo]=u,d[gu]=l,d[Ve]=t.type==2?e[Ve]:d,d}function cD(e,t,n){let o=dn(t,e),r=sD(n),a=e[jn].rendererFactory,i=Yd(e,Zd(e,r,null,Kg(n),o,t,null,a.createRenderer(o,n),null,null,null));return e[t.index]=i}function Kg(e){let t=16;return e.signals?t=4096:e.onPush&&(t=64),t}function Xg(e,t,n,o){if(n===0)return-1;let r=t.length;for(let a=0;a<n;a++)t.push(o),e.blueprint.push(o),e.data.push(null);return r}function Yd(e,t){return e[Xo]?e[hu][Ze]=t:e[Xo]=t,e[hu]=t,t}function _(e=1){ev(ge(),k(),xt()+e,!1)}function ev(e,t,n,o){if(!o)if((t[x]&3)===3){let a=e.preOrderCheckHooks;a!==null&&ms(t,a,n)}else{let a=e.preOrderHooks;a!==null&&hs(t,a,0,n)}Rt(n)}var Bs=(function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e})(Bs||{});function hd(e,t,n,o){let r=R(null);try{let[a,i,s]=e.inputs[n],c=null;(i&Bs.SignalBased)!==0&&(c=t[a][Ne]),c!==null&&c.transformFn!==void 0?o=c.transformFn(o):s!==null&&(o=s.call(t,o)),e.setInput!==null?e.setInput(t,c,o,n,a):pg(t,c,a,o)}finally{R(r)}}var vn=(function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e})(vn||{}),lD;function Kd(e,t){return lD(e,t)}function ar(e,t,n,o,r){if(o!=null){let a,i=!1;un(o)?a=o:Fn(o)&&(i=!0,o=o[ln]);let s=Ye(o);e===0&&n!==null?r==null?Zg(t,n,s):_s(t,n,s,r||null,!0):e===1&&n!==null?_s(t,n,s,r||null,!0):e===2?oD(t,s,i):e===3&&t.destroyNode(s),a!=null&&bD(t,e,a,n,r)}}function uD(e,t){nv(e,t),t[ln]=null,t[ke]=null}function dD(e,t,n,o,r,a){o[ln]=r,o[ke]=t,Vs(e,o,n,1,r,a)}function nv(e,t){t[jn].changeDetectionScheduler?.notify(9),Vs(e,t,t[ie],2,null,null)}function pD(e){let t=e[Xo];if(!t)return Wu(e[M],e);for(;t;){let n=null;if(Fn(t))n=t[Xo];else{let o=t[xe];o&&(n=o)}if(!n){for(;t&&!t[Ze]&&t!==e;)Fn(t)&&Wu(t[M],t),t=t[Ee];t===null&&(t=e),Fn(t)&&Wu(t[M],t),n=t&&t[Ze]}t=n}}function Xd(e,t){let n=e[po],o=n.indexOf(t);n.splice(o,1)}function ep(e,t){if(fo(t))return;let n=t[ie];n.destroyNode&&Vs(e,t,n,3,null,null),pD(t)}function Wu(e,t){if(fo(t))return;let n=R(null);try{t[x]&=-129,t[x]|=256,t[He]&&Qt(t[He]),mD(e,t),fD(e,t),t[M].type===1&&t[ie].destroy();let o=t[wt];if(o!==null&&un(t[Ee])){o!==t[Ee]&&Xd(o,t);let r=t[On];r!==null&&r.detachView(e)}rd(t)}finally{R(n)}}function fD(e,t){let n=e.cleanup,o=t[Ko];if(n!==null)for(let i=0;i<n.length-1;i+=2)if(typeof n[i]=="string"){let s=n[i+3];s>=0?o[s]():o[-s].unsubscribe(),i+=2}else{let s=o[n[i+1]];n[i].call(s)}o!==null&&(t[Ko]=null);let r=t[Zn];if(r!==null){t[Zn]=null;for(let i=0;i<r.length;i++){let s=r[i];s()}}let a=t[Xn];if(a!==null){t[Xn]=null;for(let i of a)i.destroy()}}function mD(e,t){let n;if(e!=null&&(n=e.destroyHooks)!=null)for(let o=0;o<n.length;o+=2){let r=t[n[o]];if(!(r instanceof go)){let a=n[o+1];if(Array.isArray(a))for(let i=0;i<a.length;i+=2){let s=r[a[i]],c=a[i+1];Z(4,s,c);try{c.call(s)}finally{Z(5,s,c)}}else{Z(4,r,a);try{a.call(r)}finally{Z(5,r,a)}}}}}function tv(e,t,n){return hD(e,t.parent,n)}function hD(e,t,n){let o=t;for(;o!==null&&o.type&168;)t=o,o=t.parent;if(o===null)return n[ln];if(Mt(o)){let{encapsulation:r}=e.data[o.directiveStart+o.componentOffset];if(r===tt.None||r===tt.Emulated)return null}return dn(o,n)}function ov(e,t,n){return vD(e,t,n)}function gD(e,t,n){return e.type&40?dn(e,n):null}var vD=gD,Jh;function np(e,t,n,o){let r=tv(e,o,t),a=t[ie],i=o.parent||t[ke],s=ov(i,o,t);if(r!=null)if(Array.isArray(n))for(let c=0;c<n.length;c++)Wh(a,r,n[c],s,!1);else Wh(a,r,n,s,!1);Jh!==void 0&&Jh(a,o,t,n,r)}function da(e,t){if(t!==null){let n=t.type;if(n&3)return dn(t,e);if(n&4)return gd(-1,e[t.index]);if(n&8){let o=t.child;if(o!==null)return da(e,o);{let r=e[t.index];return un(r)?gd(-1,r):Ye(r)}}else{if(n&128)return da(e,t.next);if(n&32)return Kd(t,e)()||Ye(e[t.index]);{let o=rv(e,t);if(o!==null){if(Array.isArray(o))return o[0];let r=It(e[Ve]);return da(r,o)}else return da(e,t.next)}}}return null}function rv(e,t){if(t!==null){let o=e[Ve][ke],r=t.projection;return o.projection[r]}return null}function gd(e,t){let n=xe+e+1;if(n<t.length){let o=t[n],r=o[M].firstChild;if(r!==null)return da(o,r)}return t[St]}function tp(e,t,n,o,r,a,i){for(;n!=null;){if(n.type===128){n=n.next;continue}let s=o[n.index],c=n.type;if(i&&t===0&&(s&&cr(Ye(s),o),n.flags|=2),!zs(n))if(c&8)tp(e,t,n.child,o,r,a,!1),ar(t,e,r,s,a);else if(c&32){let l=Kd(n,o),u;for(;u=l();)ar(t,e,r,u,a);ar(t,e,r,s,a)}else c&16?av(e,t,o,n,r,a):ar(t,e,r,s,a);n=i?n.projectionNext:n.next}}function Vs(e,t,n,o,r,a){tp(n,o,e.firstChild,t,r,a,!1)}function yD(e,t,n){let o=t[ie],r=tv(e,n,t),a=n.parent||t[ke],i=ov(a,n,t);av(o,0,t,n,r,i)}function av(e,t,n,o,r,a){let i=n[Ve],c=i[ke].projection[o.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];ar(t,e,r,u,a)}else{let l=c,u=i[Ee];Mg(o)&&(l.flags|=128),tp(e,t,l,u,r,a,!0)}}function bD(e,t,n,o,r){let a=n[St],i=Ye(n);a!==i&&ar(t,e,o,a,r);for(let s=xe;s<n.length;s++){let c=n[s];Vs(c[M],c,e,t,o,a)}}function ED(e,t,n,o,r){if(t)r?e.addClass(n,o):e.removeClass(n,o);else{let a=o.indexOf("-")===-1?void 0:vn.DashCase;r==null?e.removeStyle(n,o,a):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),a|=vn.Important),e.setStyle(n,o,r,a))}}function iv(e,t,n,o,r){let a=xt(),i=o&2;try{Rt(-1),i&&t.length>se&&ev(e,t,se,!1),Z(i?2:0,r,n),n(o,r)}finally{Rt(a),Z(i?3:1,r,n)}}function Us(e,t,n){MD(e,t,n),(n.flags&64)===64&&AD(e,t,n)}function Ca(e,t,n=dn){let o=t.localNames;if(o!==null){let r=t.index+1;for(let a=0;a<o.length;a+=2){let i=o[a+1],s=i===-1?n(t,e):e[i];e[r++]=s}}}function CD(e,t,n,o){let a=o.get(Og,jg)||n===tt.ShadowDom,i=e.selectRootElement(t,a);return DD(i),i}function DD(e){_D(e)}var _D=()=>null;function ID(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function TD(e,t,n,o,r,a){let i=t[M];if(ip(e,i,t,n,o)){Mt(e)&&SD(t,e.index);return}e.type&3&&(n=ID(n)),wD(e,t,n,o,r,a)}function wD(e,t,n,o,r,a){if(e.type&3){let i=dn(e,t);o=a!=null?a(o,e.value||"",n):o,r.setProperty(i,n,o)}else e.type&12}function SD(e,t){let n=Ke(t,e);n[x]&16||(n[x]|=64)}function MD(e,t,n){let o=n.directiveStart,r=n.directiveEnd;Mt(n)&&cD(t,n,e.data[o+n.componentOffset]),e.firstCreatePass||Ds(n,t);let a=n.initialInputs;for(let i=o;i<r;i++){let s=e.data[i],c=fa(t,e,i,n);if(cr(c,t),a!==null&&PD(t,i-o,c,s,n,a),Ln(s)){let l=Ke(n.index,t);l[Te]=fa(t,e,i,n)}}}function AD(e,t,n){let o=n.directiveStart,r=n.directiveEnd,a=n.index,i=wh();try{Rt(a);for(let s=o;s<r;s++){let c=e.data[s],l=t[s];os(s),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&xD(c,l)}}finally{Rt(-1),os(i)}}function xD(e,t){e.hostBindings!==null&&e.hostBindings(1,t)}function op(e,t){let n=e.directiveRegistry,o=null;if(n)for(let r=0;r<n.length;r++){let a=n[r];Jg(t,a.selectors,!1)&&(o??=[],Ln(a)?o.unshift(a):o.push(a))}return o}function RD(e,t,n,o,r,a){let i=dn(e,t);ND(t[ie],i,a,e.value,n,o,r)}function ND(e,t,n,o,r,a,i){if(a==null)e.removeAttribute(t,r,n);else{let s=i==null?Kr(a):i(a,o||"",r);e.setAttribute(t,r,s,n)}}function PD(e,t,n,o,r,a){let i=a[t];if(i!==null)for(let s=0;s<i.length;s+=2){let c=i[s],l=i[s+1];hd(o,n,c,l)}}function rp(e,t,n,o,r){let a=se+n,i=t[M],s=r(i,t,e,o,n);t[a]=s,tr(e,!0);let c=e.type===2;return c?(Yg(t[ie],s,e),(yh()===0||er(e))&&cr(s,t),bh()):cr(s,t),cs()&&(!c||!zs(e))&&np(i,t,s,e),e}function ap(e){let t=e;return Nu()?Pu():(t=t.parent,tr(t,!1)),t}function jD(e,t){let n=e[so];if(!n)return;let o;try{o=n.get($e,null)}catch{o=null}o?.(t)}function ip(e,t,n,o,r){let a=e.inputs?.[o],i=e.hostDirectiveInputs?.[o],s=!1;if(i)for(let c=0;c<i.length;c+=2){let l=i[c],u=i[c+1],d=t.data[l];hd(d,n[l],u,r),s=!0}if(a)for(let c of a){let l=n[c],u=t.data[c];hd(u,l,o,r),s=!0}return s}function OD(e,t){let n=Ke(t,e),o=n[M];FD(o,n);let r=n[ln];r!==null&&n[Yo]===null&&(n[Yo]=Fg(r,n[so])),Z(18),sp(o,n,n[Te]),Z(19,n[Te])}function FD(e,t){for(let n=t.length;n<e.blueprint.length;n++)t.push(e.blueprint[n])}function sp(e,t,n){as(t);try{let o=e.viewQuery;o!==null&&id(1,o,n);let r=e.template;r!==null&&iv(e,t,r,1,n),e.firstCreatePass&&(e.firstCreatePass=!1),t[On]?.finishViewCreation(e),e.staticContentQueries&&Lg(e,t),e.staticViewQueries&&id(2,e.viewQuery,n);let a=e.components;a!==null&&LD(t,a)}catch(o){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),o}finally{t[x]&=-5,is()}}function LD(e,t){for(let n=0;n<t.length;n++)OD(e,t[n])}function cp(e,t,n,o){let r=R(null);try{let a=t.tView,s=e[x]&4096?4096:16,c=Zd(e,a,n,s,null,t,null,null,o?.injector??null,o?.embeddedViewInjector??null,o?.dehydratedView??null),l=e[t.index];c[wt]=l;let u=e[On];return u!==null&&(c[On]=u.createEmbeddedView(a)),sp(a,c,n),c}finally{R(r)}}function Is(e,t){return!t||t.firstChild===null||Mg(e)}var Qh=!1,kD=new C("");function ma(e,t,n,o,r=!1){for(;n!==null;){if(n.type===128){n=r?n.projectionNext:n.next;continue}let a=t[n.index];a!==null&&o.push(Ye(a)),un(a)&&sv(a,o);let i=n.type;if(i&8)ma(e,t,n.child,o);else if(i&32){let s=Kd(n,t),c;for(;c=s();)o.push(c)}else if(i&16){let s=rv(t,n);if(Array.isArray(s))o.push(...s);else{let c=It(t[Ve]);ma(c[M],c,s,o,!0)}}n=r?n.projectionNext:n.next}return o}function sv(e,t){for(let n=xe;n<e.length;n++){let o=e[n],r=o[M].firstChild;r!==null&&ma(o[M],o,r,t)}e[St]!==e[ln]&&t.push(e[St])}function cv(e){if(e[uo]!==null){for(let t of e[uo])t.impl.addSequence(t);e[uo].length=0}}var lv=[];function zD(e){return e[He]??qD(e)}function qD(e){let t=lv.pop()??Object.create(VD);return t.lView=e,t}function BD(e){e.lView[He]!==e&&(e.lView=null,lv.push(e))}var VD=$(y({},Oo),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{At(e.lView)},consumerOnSignalRead(){this.lView[He]=this}});function UD(e){let t=e[He]??Object.create(HD);return t.lView=e,t}var HD=$(y({},Oo),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{let t=It(e.lView);for(;t&&!uv(t[M]);)t=It(t);t&&_u(t)},consumerOnSignalRead(){this.lView[He]=this}});function uv(e){return e.type!==2}function dv(e){if(e[Xn]===null)return;let t=!0;for(;t;){let n=!1;for(let o of e[Xn])o.dirty&&(n=!0,o.zone===null||Zone.current===o.zone?o.run():o.zone.run(()=>o.run()));t=n&&!!(e[x]&8192)}}var $D=100;function lp(e,t=0){let o=e[jn].rendererFactory,r=!1;r||o.begin?.();try{GD(e,t)}finally{r||o.end?.()}}function GD(e,t){let n=Ou();try{or(!0),vd(e,t);let o=0;for(;ra(e);){if(o===$D)throw new E(103,!1);o++,vd(e,1)}}finally{or(n)}}function pv(e,t){ju(t?aa.Exhaustive:aa.OnlyDirtyViews);try{lp(e)}finally{ju(aa.Off)}}function WD(e,t,n,o){if(fo(t))return;let r=t[x],a=!1,i=!1;as(t);let s=!0,c=null,l=null;a||(uv(e)?(l=zD(t),c=Fo(l)):fi()===null?(s=!1,l=UD(t),c=Fo(l)):t[He]&&(Qt(t[He]),t[He]=null));try{Du(t),_h(e.bindingStartIndex),n!==null&&iv(e,t,n,2,o);let u=(r&3)===3;if(!a)if(u){let f=e.preOrderCheckHooks;f!==null&&ms(t,f,null)}else{let f=e.preOrderHooks;f!==null&&hs(t,f,0,null),$u(t,0)}if(i||JD(t),dv(t),fv(t,0),e.contentQueries!==null&&Lg(e,t),!a)if(u){let f=e.contentCheckHooks;f!==null&&ms(t,f)}else{let f=e.contentHooks;f!==null&&hs(t,f,1),$u(t,1)}ZD(e,t);let d=e.components;d!==null&&hv(t,d,0);let m=e.viewQuery;if(m!==null&&id(2,m,o),!a)if(u){let f=e.viewCheckHooks;f!==null&&ms(t,f)}else{let f=e.viewHooks;f!==null&&hs(t,f,2),$u(t,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),t[Xi]){for(let f of t[Xi])f();t[Xi]=null}a||(cv(t),t[x]&=-73)}catch(u){throw a||At(t),u}finally{l!==null&&(qr(l,c),s&&BD(l)),is()}}function fv(e,t){for(let n=xg(e);n!==null;n=Rg(n))for(let o=xe;o<n.length;o++){let r=n[o];mv(r,t)}}function JD(e){for(let t=xg(e);t!==null;t=Rg(t)){if(!(t[x]&2))continue;let n=t[po];for(let o=0;o<n.length;o++){let r=n[o];_u(r)}}}function QD(e,t,n){Z(18);let o=Ke(t,e);mv(o,n),Z(19,o[Te])}function mv(e,t){es(e)&&vd(e,t)}function vd(e,t){let o=e[M],r=e[x],a=e[He],i=!!(t===0&&r&16);if(i||=!!(r&64&&t===0),i||=!!(r&1024),i||=!!(a?.dirty&&Lo(a)),i||=!1,a&&(a.dirty=!1),e[x]&=-9217,i)WD(o,e,o.template,e[Te]);else if(r&8192){let s=R(null);try{dv(e),fv(e,1);let c=o.components;c!==null&&hv(e,c,1),cv(e)}finally{R(s)}}}function hv(e,t,n){for(let o=0;o<t.length;o++)QD(e,t[o],n)}function ZD(e,t){let n=e.hostBindingOpCodes;if(n!==null)try{for(let o=0;o<n.length;o++){let r=n[o];if(r<0)Rt(~r);else{let a=r,i=n[++o],s=n[++o];Th(i,a);let c=t[a];Z(24,c),s(2,c),Z(25,c)}}}finally{Rt(-1)}}function up(e,t){let n=Ou()?64:1088;for(e[jn].changeDetectionScheduler?.notify(t);e;){e[x]|=n;let o=It(e);if(nr(e)&&!o)return e;e=o}return null}function gv(e,t,n,o){return[e,!0,0,t,null,o,null,n,null,null]}function YD(e,t){let n=xe+t;if(n<e.length)return e[n]}function dp(e,t,n,o=!0){let r=t[M];if(XD(r,t,e,n),o){let i=gd(n,e),s=t[ie],c=s.parentNode(e[St]);c!==null&&dD(r,e[ke],s,t,c,i)}let a=t[Yo];a!==null&&a.firstChild!==null&&(a.firstChild=null)}function KD(e,t){let n=Ts(e,t);return n!==void 0&&ep(n[M],n),n}function Ts(e,t){if(e.length<=xe)return;let n=xe+t,o=e[n];if(o){let r=o[wt];r!==null&&r!==e&&Xd(r,o),t>0&&(e[n-1][Ze]=o[Ze]);let a=Xr(e,xe+t);uD(o[M],o);let i=a[On];i!==null&&i.detachView(a[M]),o[Ee]=null,o[Ze]=null,o[x]&=-129}return o}function XD(e,t,n,o){let r=xe+o,a=n.length;o>0&&(n[r-1][Ze]=t),o<a-xe?(t[Ze]=n[r],iu(n,xe+o,t)):(n.push(t),t[Ze]=null),t[Ee]=n;let i=t[wt];i!==null&&n!==i&&vv(i,t);let s=t[On];s!==null&&s.insertView(e),ns(t),t[x]|=128}function vv(e,t){let n=e[po],o=t[Ee];if(Fn(o))e[x]|=2;else{let r=o[Ee][Ve];t[Ve]!==r&&(e[x]|=2)}n===null?e[po]=[t]:n.push(t)}var Nt=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let t=this._lView,n=t[M];return ma(n,t,n.firstChild,[])}constructor(t,n){this._lView=t,this._cdRefInjectingView=n}get context(){return this._lView[Te]}set context(t){this._lView[Te]=t}get destroyed(){return fo(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[Ee];if(un(t)){let n=t[ta],o=n?n.indexOf(this):-1;o>-1&&(Ts(t,o),Xr(n,o))}this._attachedToViewContainer=!1}ep(this._lView[M],this._lView)}onDestroy(t){Iu(this._lView,t)}markForCheck(){up(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[x]&=-129}reattach(){ns(this._lView),this._lView[x]|=128}detectChanges(){this._lView[x]|=1024,lp(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new E(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let t=nr(this._lView),n=this._lView[wt];n!==null&&!t&&Xd(n,this._lView),nv(this._lView[M],this._lView)}attachToAppRef(t){if(this._attachedToViewContainer)throw new E(902,!1);this._appRef=t;let n=nr(this._lView),o=this._lView[wt];o!==null&&!n&&vv(o,this._lView),ns(this._lView)}};var yn=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=e_;constructor(n,o,r){this._declarationLView=n,this._declarationTContainer=o,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(n,o){return this.createEmbeddedViewImpl(n,o)}createEmbeddedViewImpl(n,o,r){let a=cp(this._declarationLView,this._declarationTContainer,n,{embeddedViewInjector:o,dehydratedView:r});return new Nt(a)}}return e})();function e_(){return Hs(Ce(),k())}function Hs(e,t){return e.type&4?new yn(t,e,ur(e,t)):null}function fr(e,t,n,o,r){let a=e.data[t];if(a===null)a=n_(e,t,n,o,r),Ih()&&(a.flags|=32);else if(a.type&64){a.type=n,a.value=o,a.attrs=r;let i=Eh();a.injectorIndex=i===null?-1:i.injectorIndex}return tr(a,!0),a}function n_(e,t,n,o,r){let a=Ru(),i=Nu(),s=i?a:a&&a.parent,c=e.data[t]=o_(e,s,n,t,o,r);return t_(e,c,a,i),c}function t_(e,t,n,o){e.firstChild===null&&(e.firstChild=t),n!==null&&(o?n.child==null&&t.parent!==null&&(n.child=t):n.next===null&&(n.next=t,t.prev=n))}function o_(e,t,n,o,r,a){let i=t?t.injectorIndex:-1,s=0;return Mu()&&(s|=128),{type:n,index:o,insertBeforeIndex:null,injectorIndex:i,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:s,providerIndexes:0,value:r,attrs:a,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var tF=new RegExp(`^(\\d+)*(${hC}|${mC})*(.*)`);var r_=()=>null,a_=()=>null;function yd(e,t){return r_(e,t)}function i_(e,t,n){return a_(e,t,n)}var yv=class{},$s=class{},bd=class{resolveComponentFactory(t){throw new E(917,!1)}},Da=class{static NULL=new bd},rt=class{},Ft=(()=>{class e{destroyNode=null;static __NG_ELEMENT_ID__=()=>s_()}return e})();function s_(){let e=k(),t=Ce(),n=Ke(t.index,e);return(Fn(n)?n:e)[ie]}var bv=(()=>{class e{static \u0275prov=v({token:e,providedIn:"root",factory:()=>null})}return e})();var vs={},Ed=class{injector;parentInjector;constructor(t,n){this.injector=t,this.parentInjector=n}get(t,n,o){let r=this.injector.get(t,vs,o);return r!==vs||n===vs?r:this.parentInjector.get(t,n,o)}};function ws(e,t,n){let o=n?e.styles:null,r=n?e.classes:null,a=0;if(t!==null)for(let i=0;i<t.length;i++){let s=t[i];if(typeof s=="number")a=s;else if(a==1)r=$i(r,s);else if(a==2){let c=s,l=t[++i];o=$i(o,c+": "+l+";")}}n?e.styles=o:e.stylesWithoutHost=o,n?e.classes=r:e.classesWithoutHost=r}function K(e,t=0){let n=k();if(n===null)return I(e,t);let o=Ce();return Tg(o,n,De(e),t)}function pp(){let e="invalid";throw new Error(e)}function Ev(e,t,n,o,r){let a=o===null?null:{"":-1},i=r(e,n);if(i!==null){let s=i,c=null,l=null;for(let u of i)if(u.resolveHostDirectives!==null){[s,c,l]=u.resolveHostDirectives(i);break}u_(e,t,n,s,a,c,l)}a!==null&&o!==null&&c_(n,o,a)}function c_(e,t,n){let o=e.localNames=[];for(let r=0;r<t.length;r+=2){let a=n[t[r+1]];if(a==null)throw new E(-301,!1);o.push(t[r],a)}}function l_(e,t,n){t.componentOffset=n,(e.components??=[]).push(t.index)}function u_(e,t,n,o,r,a,i){let s=o.length,c=!1;for(let m=0;m<s;m++){let f=o[m];!c&&Ln(f)&&(c=!0,l_(e,n,m)),td(Ds(n,t),e,f.type)}g_(n,e.data.length,s);for(let m=0;m<s;m++){let f=o[m];f.providersResolver&&f.providersResolver(f)}let l=!1,u=!1,d=Xg(e,t,s,null);s>0&&(n.directiveToIndex=new Map);for(let m=0;m<s;m++){let f=o[m];if(n.mergedAttrs=sr(n.mergedAttrs,f.hostAttrs),p_(e,n,t,d,f),h_(d,f,r),i!==null&&i.has(f)){let[T,q]=i.get(f);n.directiveToIndex.set(f.type,[d,T+n.directiveStart,q+n.directiveStart])}else(a===null||!a.has(f))&&n.directiveToIndex.set(f.type,d);f.contentQueries!==null&&(n.flags|=4),(f.hostBindings!==null||f.hostAttrs!==null||f.hostVars!==0)&&(n.flags|=64);let g=f.type.prototype;!l&&(g.ngOnChanges||g.ngOnInit||g.ngDoCheck)&&((e.preOrderHooks??=[]).push(n.index),l=!0),!u&&(g.ngOnChanges||g.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(n.index),u=!0),d++}d_(e,n,a)}function d_(e,t,n){for(let o=t.directiveStart;o<t.directiveEnd;o++){let r=e.data[o];if(n===null||!n.has(r))Zh(0,t,r,o),Zh(1,t,r,o),Kh(t,o,!1);else{let a=n.get(r);Yh(0,t,a,o),Yh(1,t,a,o),Kh(t,o,!0)}}}function Zh(e,t,n,o){let r=e===0?n.inputs:n.outputs;for(let a in r)if(r.hasOwnProperty(a)){let i;e===0?i=t.inputs??={}:i=t.outputs??={},i[a]??=[],i[a].push(o),Cv(t,a)}}function Yh(e,t,n,o){let r=e===0?n.inputs:n.outputs;for(let a in r)if(r.hasOwnProperty(a)){let i=r[a],s;e===0?s=t.hostDirectiveInputs??={}:s=t.hostDirectiveOutputs??={},s[i]??=[],s[i].push(o,a),Cv(t,i)}}function Cv(e,t){t==="class"?e.flags|=8:t==="style"&&(e.flags|=16)}function Kh(e,t,n){let{attrs:o,inputs:r,hostDirectiveInputs:a}=e;if(o===null||!n&&r===null||n&&a===null||Jd(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let i=null,s=0;for(;s<o.length;){let c=o[s];if(c===0){s+=4;continue}else if(c===5){s+=2;continue}else if(typeof c=="number")break;if(!n&&r.hasOwnProperty(c)){let l=r[c];for(let u of l)if(u===t){i??=[],i.push(c,o[s+1]);break}}else if(n&&a.hasOwnProperty(c)){let l=a[c];for(let u=0;u<l.length;u+=2)if(l[u]===t){i??=[],i.push(l[u+1],o[s+1]);break}}s+=2}e.initialInputs??=[],e.initialInputs.push(i)}function p_(e,t,n,o,r){e.data[o]=r;let a=r.factory||(r.factory=_t(r.type,!0)),i=new go(a,Ln(r),K,null);e.blueprint[o]=i,n[o]=i,f_(e,t,o,Xg(e,n,r.hostVars,nn),r)}function f_(e,t,n,o,r){let a=r.hostBindings;if(a){let i=e.hostBindingOpCodes;i===null&&(i=e.hostBindingOpCodes=[]);let s=~t.index;m_(i)!=s&&i.push(s),i.push(n,o,a)}}function m_(e){let t=e.length;for(;t>0;){let n=e[--t];if(typeof n=="number"&&n<0)return n}return 0}function h_(e,t,n){if(n){if(t.exportAs)for(let o=0;o<t.exportAs.length;o++)n[t.exportAs[o]]=e;Ln(t)&&(n[""]=e)}}function g_(e,t,n){e.flags|=1,e.directiveStart=t,e.directiveEnd=t+n,e.providerIndexes=t}function fp(e,t,n,o,r,a,i,s){let c=t[M],l=c.consts,u=kn(l,i),d=fr(c,e,n,o,u);return a&&Ev(c,t,d,kn(l,s),r),d.mergedAttrs=sr(d.mergedAttrs,d.attrs),d.attrs!==null&&ws(d,d.attrs,!1),d.mergedAttrs!==null&&ws(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function mp(e,t){gg(e,t),vu(t)&&e.queries.elementEnd(t)}function v_(e,t,n,o,r,a){let i=t.consts,s=kn(i,r),c=fr(t,e,n,o,s);if(c.mergedAttrs=sr(c.mergedAttrs,c.attrs),a!=null){let l=kn(i,a);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1)}return c.attrs!==null&&ws(c,c.attrs,!1),c.mergedAttrs!==null&&ws(c,c.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,c),c}function hp(e){return Gs(e)?Array.isArray(e)||!(e instanceof Map)&&Symbol.iterator in e:!1}function Dv(e,t){if(Array.isArray(e))for(let n=0;n<e.length;n++)t(e[n]);else{let n=e[Symbol.iterator](),o;for(;!(o=n.next()).done;)t(o.value)}}function Gs(e){return e!==null&&(typeof e=="function"||typeof e=="object")}function y_(e,t,n){return e[t]=n}function Pt(e,t,n){if(n===nn)return!1;let o=e[t];return Object.is(o,n)?!1:(e[t]=n,!0)}function b_(e,t,n,o){let r=Pt(e,t,n);return Pt(e,t+1,o)||r}function Ju(e,t,n){return function o(r){let a=Mt(e)?Ke(e.index,t):t;up(a,5);let i=t[Te],s=Xh(t,i,n,r),c=o.__ngNextListenerFn__;for(;c;)s=Xh(t,i,c,r)&&s,c=c.__ngNextListenerFn__;return s}}function Xh(e,t,n,o){let r=R(null);try{return Z(6,t,n),n(o)!==!1}catch(a){return jD(e,a),!1}finally{Z(7,t,n),R(r)}}function E_(e,t,n,o,r,a,i,s){let c=er(e),l=!1,u=null;if(!o&&c&&(u=C_(t,n,a,e.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=i,u.__ngLastListenerFn__=i,l=!0}else{let d=dn(e,n),m=o?o(d):d;vC(n,m,a,s);let f=r.listen(m,a,s),g=o?T=>o(Ye(T[e.index])):e.index;_v(g,t,n,a,s,f,!1)}return l}function C_(e,t,n,o){let r=e.cleanup;if(r!=null)for(let a=0;a<r.length-1;a+=2){let i=r[a];if(i===n&&r[a+1]===o){let s=t[Ko],c=r[a+2];return s&&s.length>c?s[c]:null}typeof i=="string"&&(a+=2)}return null}function _v(e,t,n,o,r,a,i){let s=t.firstCreatePass?wu(t):null,c=Tu(n),l=c.length;c.push(r,a),s&&s.push(o,e,l,(l+1)*(i?-1:1))}function eg(e,t,n,o,r,a){let i=t[n],s=t[M],l=s.data[n].outputs[o],d=i[l].subscribe(a);_v(e.index,s,t,r,a,d,!0)}var Cd=Symbol("BINDING");var Ss=class extends Da{ngModule;constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){let n=Pn(t);return new jt(n,this.ngModule)}};function D_(e){return Object.keys(e).map(t=>{let[n,o,r]=e[t],a={propName:n,templateName:t,isSignal:(o&Bs.SignalBased)!==0};return r&&(a.transform=r),a})}function __(e){return Object.keys(e).map(t=>({propName:e[t],templateName:t}))}function I_(e,t,n){let o=t instanceof ae?t:t?.injector;return o&&e.getStandaloneInjector!==null&&(o=e.getStandaloneInjector(o)||o),o?new Ed(n,o):n}function T_(e){let t=e.get(rt,null);if(t===null)throw new E(407,!1);let n=e.get(bv,null),o=e.get(Rn,null);return{rendererFactory:t,sanitizer:n,changeDetectionScheduler:o,ngReflect:!1}}function w_(e,t){let n=Iv(e);return Qg(t,n,n==="svg"?yu:n==="math"?ph:null)}function Iv(e){return(e.selectors[0][0]||"div").toLowerCase()}var jt=class extends $s{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=D_(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=__(this.componentDef.outputs),this.cachedOutputs}constructor(t,n){super(),this.componentDef=t,this.ngModule=n,this.componentType=t.type,this.selector=KC(t.selectors),this.ngContentSelectors=t.ngContentSelectors??[],this.isBoundToModule=!!n}create(t,n,o,r,a,i){Z(22);let s=R(null);try{let c=this.componentDef,l=S_(o,c,i,a),u=I_(c,r||this.ngModule,t),d=T_(u),m=d.rendererFactory.createRenderer(null,c),f=o?CD(m,o,c.encapsulation,u):w_(c,m),g=i?.some(ng)||a?.some(P=>typeof P!="function"&&P.bindings.some(ng)),T=Zd(null,l,null,512|Kg(c),null,null,d,m,u,null,Fg(f,u,!0));T[se]=f,as(T);let q=null;try{let P=fp(se,T,2,"#host",()=>l.directiveRegistry,!0,0);f&&(Yg(m,f,P),cr(f,T)),Us(l,T,P),zd(l,P,T),mp(l,P),n!==void 0&&A_(P,this.ngContentSelectors,n),q=Ke(P.index,T),T[Te]=q[Te],sp(l,T,null)}catch(P){throw q!==null&&rd(q),rd(T),P}finally{Z(23),is()}return new Ms(this.componentType,T,!!g)}finally{R(s)}}};function S_(e,t,n,o){let r=e?["ng-version","20.3.0"]:XC(t.selectors[0]),a=null,i=null,s=0;if(n)for(let u of n)s+=u[Cd].requiredVars,u.create&&(u.targetIdx=0,(a??=[]).push(u)),u.update&&(u.targetIdx=0,(i??=[]).push(u));if(o)for(let u=0;u<o.length;u++){let d=o[u];if(typeof d!="function")for(let m of d.bindings){s+=m[Cd].requiredVars;let f=u+1;m.create&&(m.targetIdx=f,(a??=[]).push(m)),m.update&&(m.targetIdx=f,(i??=[]).push(m))}}let c=[t];if(o)for(let u of o){let d=typeof u=="function"?u:u.type,m=uu(d);c.push(m)}return Qd(0,null,M_(a,i),1,s,c,null,null,null,[r],null)}function M_(e,t){return!e&&!t?null:n=>{if(n&1&&e)for(let o of e)o.create();if(n&2&&t)for(let o of t)o.update()}}function ng(e){let t=e[Cd].kind;return t==="input"||t==="twoWay"}var Ms=class extends yv{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(t,n,o){super(),this._rootLView=n,this._hasInputBindings=o,this._tNode=oa(n[M],se),this.location=ur(this._tNode,n),this.instance=Ke(this._tNode.index,n)[Te],this.hostView=this.changeDetectorRef=new Nt(n,void 0),this.componentType=t}setInput(t,n){this._hasInputBindings;let o=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),n))return;let r=this._rootLView,a=ip(o,r[M],r,t,n);this.previousInputValues.set(t,n);let i=Ke(o.index,r);up(i,1)}get injector(){return new ho(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}};function A_(e,t,n){let o=e.projection=[];for(let r=0;r<t.length;r++){let a=n[r];o.push(a!=null&&a.length?Array.from(a):null)}}var Ge=(()=>{class e{static __NG_ELEMENT_ID__=x_}return e})();function x_(){let e=Ce();return wv(e,k())}var R_=Ge,Tv=class extends R_{_lContainer;_hostTNode;_hostLView;constructor(t,n,o){super(),this._lContainer=t,this._hostTNode=n,this._hostLView=o}get element(){return ur(this._hostTNode,this._hostLView)}get injector(){return new ho(this._hostTNode,this._hostLView)}get parentInjector(){let t=Od(this._hostTNode,this._hostLView);if(bg(t)){let n=Es(t,this._hostLView),o=bs(t),r=n[M].data[o+8];return new ho(r,n)}else return new ho(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){let n=tg(this._lContainer);return n!==null&&n[t]||null}get length(){return this._lContainer.length-xe}createEmbeddedView(t,n,o){let r,a;typeof o=="number"?r=o:o!=null&&(r=o.index,a=o.injector);let i=yd(this._lContainer,t.ssrId),s=t.createEmbeddedViewImpl(n||{},a,i);return this.insertImpl(s,r,Is(this._hostTNode,i)),s}createComponent(t,n,o,r,a,i,s){let c=t&&!V0(t),l;if(c)l=n;else{let q=n||{};l=q.index,o=q.injector,r=q.projectableNodes,a=q.environmentInjector||q.ngModuleRef,i=q.directives,s=q.bindings}let u=c?t:new jt(Pn(t)),d=o||this.parentInjector;if(!a&&u.ngModule==null){let P=(c?d:this.parentInjector).get(ae,null);P&&(a=P)}let m=Pn(u.componentType??{}),f=yd(this._lContainer,m?.id??null),g=f?.firstChild??null,T=u.create(d,r,g,a,i,s);return this.insertImpl(T.hostView,l,Is(this._hostTNode,f)),T}insert(t,n){return this.insertImpl(t,n,!0)}insertImpl(t,n,o){let r=t._lView;if(mh(r)){let s=this.indexOf(t);if(s!==-1)this.detach(s);else{let c=r[Ee],l=new Tv(c,c[ke],c[Ee]);l.detach(l.indexOf(t))}}let a=this._adjustIndex(n),i=this._lContainer;return dp(i,r,a,o),t.attachToViewContainerRef(),iu(Qu(i),a,t),t}move(t,n){return this.insert(t,n)}indexOf(t){let n=tg(this._lContainer);return n!==null?n.indexOf(t):-1}remove(t){let n=this._adjustIndex(t,-1),o=Ts(this._lContainer,n);o&&(Xr(Qu(this._lContainer),n),ep(o[M],o))}detach(t){let n=this._adjustIndex(t,-1),o=Ts(this._lContainer,n);return o&&Xr(Qu(this._lContainer),n)!=null?new Nt(o):null}_adjustIndex(t,n=0){return t??this.length+n}};function tg(e){return e[ta]}function Qu(e){return e[ta]||(e[ta]=[])}function wv(e,t){let n,o=t[e.index];return un(o)?n=o:(n=gv(o,t,null,e),t[e.index]=n,Yd(t,n)),P_(n,t,e,o),new Tv(n,e,t)}function N_(e,t){let n=e[ie],o=n.createComment(""),r=dn(t,e),a=n.parentNode(r);return _s(n,a,o,n.nextSibling(r),!1),o}var P_=F_,j_=()=>!1;function O_(e,t,n){return j_(e,t,n)}function F_(e,t,n,o){if(e[St])return;let r;n.type&8?r=Ye(o):r=N_(t,n),e[St]=r}var Dd=class e{queryList;matches=null;constructor(t){this.queryList=t}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},_d=class e{queries;constructor(t=[]){this.queries=t}createEmbeddedView(t){let n=t.queries;if(n!==null){let o=t.contentQueries!==null?t.contentQueries[0]:n.length,r=[];for(let a=0;a<o;a++){let i=n.getByIndex(a),s=this.queries[i.indexInDeclarationView];r.push(s.clone())}return new e(r)}return null}insertView(t){this.dirtyQueriesWithMatches(t)}detachView(t){this.dirtyQueriesWithMatches(t)}finishViewCreation(t){this.dirtyQueriesWithMatches(t)}dirtyQueriesWithMatches(t){for(let n=0;n<this.queries.length;n++)gp(t,n).matches!==null&&this.queries[n].setDirty()}},As=class{flags;read;predicate;constructor(t,n,o=null){this.flags=n,this.read=o,typeof t=="string"?this.predicate=H_(t):this.predicate=t}},Id=class e{queries;constructor(t=[]){this.queries=t}elementStart(t,n){for(let o=0;o<this.queries.length;o++)this.queries[o].elementStart(t,n)}elementEnd(t){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(t)}embeddedTView(t){let n=null;for(let o=0;o<this.length;o++){let r=n!==null?n.length:0,a=this.getByIndex(o).embeddedTView(t,r);a&&(a.indexInDeclarationView=o,n!==null?n.push(a):n=[a])}return n!==null?new e(n):null}template(t,n){for(let o=0;o<this.queries.length;o++)this.queries[o].template(t,n)}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t)}},Td=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(t,n=-1){this.metadata=t,this._declarationNodeIndex=n}elementStart(t,n){this.isApplyingToNode(n)&&this.matchTNode(t,n)}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=!1)}template(t,n){this.elementStart(t,n)}embeddedTView(t,n){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,n),new e(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,o=t.parent;for(;o!==null&&o.type&8&&o.index!==n;)o=o.parent;return n===(o!==null?o.index:-1)}return this._appliesToNextNode}matchTNode(t,n){let o=this.metadata.predicate;if(Array.isArray(o))for(let r=0;r<o.length;r++){let a=o[r];this.matchTNodeWithReadOption(t,n,L_(n,a)),this.matchTNodeWithReadOption(t,n,gs(n,t,a,!1,!1))}else o===yn?n.type&4&&this.matchTNodeWithReadOption(t,n,-1):this.matchTNodeWithReadOption(t,n,gs(n,t,o,!1,!1))}matchTNodeWithReadOption(t,n,o){if(o!==null){let r=this.metadata.read;if(r!==null)if(r===pe||r===Ge||r===yn&&n.type&4)this.addMatch(n.index,-2);else{let a=gs(n,t,r,!1,!1);a!==null&&this.addMatch(n.index,a)}else this.addMatch(n.index,o)}}addMatch(t,n){this.matches===null?this.matches=[t,n]:this.matches.push(t,n)}};function L_(e,t){let n=e.localNames;if(n!==null){for(let o=0;o<n.length;o+=2)if(n[o]===t)return n[o+1]}return null}function k_(e,t){return e.type&11?ur(e,t):e.type&4?Hs(e,t):null}function z_(e,t,n,o){return n===-1?k_(t,e):n===-2?q_(e,t,o):fa(e,e[M],n,t)}function q_(e,t,n){if(n===pe)return ur(t,e);if(n===yn)return Hs(t,e);if(n===Ge)return wv(t,e)}function Sv(e,t,n,o){let r=t[On].queries[o];if(r.matches===null){let a=e.data,i=n.matches,s=[];for(let c=0;i!==null&&c<i.length;c+=2){let l=i[c];if(l<0)s.push(null);else{let u=a[l];s.push(z_(t,u,i[c+1],n.metadata.read))}}r.matches=s}return r.matches}function wd(e,t,n,o){let r=e.queries.getByIndex(n),a=r.matches;if(a!==null){let i=Sv(e,t,r,n);for(let s=0;s<a.length;s+=2){let c=a[s];if(c>0)o.push(i[s/2]);else{let l=a[s+1],u=t[-c];for(let d=xe;d<u.length;d++){let m=u[d];m[wt]===m[Ee]&&wd(m[M],m,l,o)}if(u[po]!==null){let d=u[po];for(let m=0;m<d.length;m++){let f=d[m];wd(f[M],f,l,o)}}}}}return o}function B_(e,t){return e[On].queries[t].queryList}function Mv(e,t,n){let o=new nt((n&4)===4);return vh(e,t,o,o.destroy),(t[On]??=new _d).queries.push(new Dd(o))-1}function V_(e,t,n){let o=ge();return o.firstCreatePass&&(Av(o,new As(e,t,n),-1),(t&2)===2&&(o.staticViewQueries=!0)),Mv(o,k(),t)}function U_(e,t,n,o){let r=ge();if(r.firstCreatePass){let a=Ce();Av(r,new As(t,n,o),a.index),$_(r,e),(n&2)===2&&(r.staticContentQueries=!0)}return Mv(r,k(),n)}function H_(e){return e.split(",").map(t=>t.trim())}function Av(e,t,n){e.queries===null&&(e.queries=new Id),e.queries.track(new Td(t,n))}function $_(e,t){let n=e.contentQueries||(e.contentQueries=[]),o=n.length?n[n.length-1]:-1;t!==o&&n.push(e.queries.length-1,t)}function gp(e,t){return e.queries.getByIndex(t)}function G_(e,t){let n=e[M],o=gp(n,t);return o.crossesNgTemplate?wd(n,e,t,[]):Sv(n,e,o,t)}var og=new Set;function ct(e){og.has(e)||(og.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}var at=class{},Ws=class{};var xs=class extends at{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new Ss(this);constructor(t,n,o,r=!0){super(),this.ngModuleType=t,this._parent=n;let a=lu(t);this._bootstrapComponents=Gg(a.bootstrap),this._r3Injector=Bu(t,n,[{provide:at,useValue:this},{provide:Da,useValue:this.componentFactoryResolver},...o],Yn(t),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}},Rs=class extends Ws{moduleType;constructor(t){super(),this.moduleType=t}create(t){return new xs(this.moduleType,t,[])}};var ha=class extends at{injector;componentFactoryResolver=new Ss(this);instance=null;constructor(t){super();let n=new ro([...t.providers,{provide:at,useValue:this},{provide:Da,useValue:this.componentFactoryResolver}],t.parent||Zo(),t.debugName,new Set(["environment"]));this.injector=n,t.runEnvironmentInitializers&&n.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(t){this.injector.onDestroy(t)}};function mr(e,t,n=null){return new ha({providers:e,parent:t,debugName:n,runEnvironmentInitializers:!0}).injector}var W_=(()=>{class e{_injector;cachedInjectors=new Map;constructor(n){this._injector=n}getOrCreateStandaloneInjector(n){if(!n.standalone)return null;if(!this.cachedInjectors.has(n)){let o=du(!1,n.type),r=o.length>0?mr([o],this._injector,`Standalone[${n.type.name}]`):null;this.cachedInjectors.set(n,r)}return this.cachedInjectors.get(n)}ngOnDestroy(){try{for(let n of this.cachedInjectors.values())n!==null&&n.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=v({token:e,providedIn:"environment",factory:()=>new e(I(ae))})}return e})();function ue(e){return va(()=>{let t=xv(e),n=$(y({},t),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection===Fd.OnPush,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&e.dependencies||null,getStandaloneInjector:t.standalone?r=>r.get(W_).getOrCreateStandaloneInjector(n):null,getExternalStyles:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||tt.Emulated,styles:e.styles||Fe,_:null,schemas:e.schemas||null,tView:null,id:""});t.standalone&&ct("NgStandalone"),Rv(n);let o=e.dependencies;return n.directiveDefs=rg(o,J_),n.pipeDefs=rg(o,sh),n.id=Y_(n),n})}function J_(e){return Pn(e)||uu(e)}function ce(e){return va(()=>({type:e.type,bootstrap:e.bootstrap||Fe,declarations:e.declarations||Fe,imports:e.imports||Fe,exports:e.exports||Fe,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function Q_(e,t){if(e==null)return Tt;let n={};for(let o in e)if(e.hasOwnProperty(o)){let r=e[o],a,i,s,c;Array.isArray(r)?(s=r[0],a=r[1],i=r[2]??a,c=r[3]||null):(a=r,i=r,s=Bs.None,c=null),n[a]=[o,s,c],t[a]=i}return n}function Z_(e){if(e==null)return Tt;let t={};for(let n in e)e.hasOwnProperty(n)&&(t[e[n]]=n);return t}function fe(e){return va(()=>{let t=xv(e);return Rv(t),t})}function Js(e){return{type:e.type,name:e.name,factory:null,pure:e.pure!==!1,standalone:e.standalone??!0,onDestroy:e.type.prototype.ngOnDestroy||null}}function xv(e){let t={};return{type:e.type,providersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:t,inputConfig:e.inputs||Tt,exportAs:e.exportAs||null,standalone:e.standalone??!0,signals:e.signals===!0,selectors:e.selectors||Fe,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,inputs:Q_(e.inputs,t),outputs:Z_(e.outputs),debugInfo:null}}function Rv(e){e.features?.forEach(t=>t(e))}function rg(e,t){return e?()=>{let n=typeof e=="function"?e():e,o=[];for(let r of n){let a=t(r);a!==null&&o.push(a)}return o}:null}function Y_(e){let t=0,n=typeof e.consts=="function"?"":e.consts,o=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,n,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let a of o.join("|"))t=Math.imul(31,t)+a.charCodeAt(0)<<0;return t+=2147483648,"c"+t}function K_(e){return Object.getPrototypeOf(e.prototype).constructor}function bo(e){let t=K_(e.type),n=!0,o=[e];for(;t;){let r;if(Ln(e))r=t.\u0275cmp||t.\u0275dir;else{if(t.\u0275cmp)throw new E(903,!1);r=t.\u0275dir}if(r){if(n){o.push(r);let i=e;i.inputs=Zu(e.inputs),i.declaredInputs=Zu(e.declaredInputs),i.outputs=Zu(e.outputs);let s=r.hostBindings;s&&oI(e,s);let c=r.viewQuery,l=r.contentQueries;if(c&&nI(e,c),l&&tI(e,l),X_(e,r),Km(e.outputs,r.outputs),Ln(r)&&r.data.animation){let u=e.data;u.animation=(u.animation||[]).concat(r.data.animation)}}let a=r.features;if(a)for(let i=0;i<a.length;i++){let s=a[i];s&&s.ngInherit&&s(e),s===bo&&(n=!1)}}t=Object.getPrototypeOf(t)}eI(o)}function X_(e,t){for(let n in t.inputs){if(!t.inputs.hasOwnProperty(n)||e.inputs.hasOwnProperty(n))continue;let o=t.inputs[n];o!==void 0&&(e.inputs[n]=o,e.declaredInputs[n]=t.declaredInputs[n])}}function eI(e){let t=0,n=null;for(let o=e.length-1;o>=0;o--){let r=e[o];r.hostVars=t+=r.hostVars,r.hostAttrs=sr(r.hostAttrs,n=sr(n,r.hostAttrs))}}function Zu(e){return e===Tt?{}:e===Fe?[]:e}function nI(e,t){let n=e.viewQuery;n?e.viewQuery=(o,r)=>{t(o,r),n(o,r)}:e.viewQuery=t}function tI(e,t){let n=e.contentQueries;n?e.contentQueries=(o,r,a)=>{t(o,r,a),n(o,r,a)}:e.contentQueries=t}function oI(e,t){let n=e.hostBindings;n?e.hostBindings=(o,r)=>{t(o,r),n(o,r)}:e.hostBindings=t}function Nv(e,t,n,o,r,a,i,s){if(n.firstCreatePass){e.mergedAttrs=sr(e.mergedAttrs,e.attrs);let u=e.tView=Qd(2,e,r,a,i,n.directiveRegistry,n.pipeRegistry,null,n.schemas,n.consts,null);n.queries!==null&&(n.queries.template(n,e),u.queries=n.queries.embeddedTView(e))}s&&(e.flags|=s),tr(e,!1);let c=aI(n,t,e,o);cs()&&np(n,t,c,e),cr(c,t);let l=gv(c,t,c,e);t[o+se]=l,Yd(t,l),O_(l,e,t)}function rI(e,t,n,o,r,a,i,s,c,l,u){let d=n+se,m;return t.firstCreatePass?(m=fr(t,d,4,i||null,s||null),ts()&&Ev(t,e,m,kn(t.consts,l),op),gg(t,m)):m=t.data[d],Nv(m,e,t,n,o,r,a,c),er(m)&&Us(t,e,m),l!=null&&Ca(e,m,u),m}function vp(e,t,n,o,r,a,i,s,c,l,u){let d=n+se,m;if(t.firstCreatePass){if(m=fr(t,d,4,i||null,s||null),l!=null){let f=kn(t.consts,l);m.localNames=[];for(let g=0;g<f.length;g+=2)m.localNames.push(f[g],-1)}}else m=t.data[d];return Nv(m,e,t,n,o,r,a,c),l!=null&&Ca(e,m,u),m}function X(e,t,n,o,r,a,i,s){let c=k(),l=ge(),u=kn(l.consts,a);return rI(c,l,e,t,n,o,r,u,void 0,i,s),X}var aI=iI;function iI(e,t,n,o){return sa(!0),t[ie].createComment("")}var Qs=(function(e){return e[e.CHANGE_DETECTION=0]="CHANGE_DETECTION",e[e.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",e})(Qs||{}),Eo=new C(""),Pv=!1,Sd=class extends B{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(t=!1){super(),this.__isAsync=t,mu()&&(this.destroyRef=p(mn,{optional:!0})??void 0,this.pendingTasks=p(et,{optional:!0})??void 0)}emit(t){let n=R(null);try{super.next(t)}finally{R(n)}}subscribe(t,n,o){let r=t,a=n||(()=>null),i=o;if(t&&typeof t=="object"){let c=t;r=c.next?.bind(c),a=c.error?.bind(c),i=c.complete?.bind(c)}this.__isAsync&&(a=this.wrapInTimeout(a),r&&(r=this.wrapInTimeout(r)),i&&(i=this.wrapInTimeout(i)));let s=super.subscribe({next:r,error:a,complete:i});return t instanceof J&&t.add(s),s}wrapInTimeout(t){return n=>{let o=this.pendingTasks?.add();setTimeout(()=>{try{t(n)}finally{o!==void 0&&this.pendingTasks?.remove(o)}})}}},Y=Sd;function jv(e){let t,n;function o(){e=mo;try{n!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(n),t!==void 0&&clearTimeout(t)}catch{}}return t=setTimeout(()=>{e(),o()}),typeof requestAnimationFrame=="function"&&(n=requestAnimationFrame(()=>{e(),o()})),()=>o()}function ag(e){return queueMicrotask(()=>e()),()=>{e=mo}}var yp="isAngularZone",Ns=yp+"_ID",sI=0,H=class e{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new Y(!1);onMicrotaskEmpty=new Y(!1);onStable=new Y(!1);onError=new Y(!1);constructor(t){let{enableLongStackTrace:n=!1,shouldCoalesceEventChangeDetection:o=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:a=Pv}=t;if(typeof Zone>"u")throw new E(908,!1);Zone.assertZonePatched();let i=this;i._nesting=0,i._outer=i._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(i._inner=i._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(i._inner=i._inner.fork(Zone.longStackTraceZoneSpec)),i.shouldCoalesceEventChangeDetection=!r&&o,i.shouldCoalesceRunChangeDetection=r,i.callbackScheduled=!1,i.scheduleInRootZone=a,uI(i)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(yp)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new E(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new E(909,!1)}run(t,n,o){return this._inner.run(t,n,o)}runTask(t,n,o,r){let a=this._inner,i=a.scheduleEventTask("NgZoneEvent: "+r,t,cI,mo,mo);try{return a.runTask(i,n,o)}finally{a.cancelTask(i)}}runGuarded(t,n,o){return this._inner.runGuarded(t,n,o)}runOutsideAngular(t){return this._outer.run(t)}},cI={};function bp(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function lI(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function t(){jv(()=>{e.callbackScheduled=!1,Md(e),e.isCheckStableRunning=!0,bp(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{t()}):e._outer.run(()=>{t()}),Md(e)}function uI(e){let t=()=>{lI(e)},n=sI++;e._inner=e._inner.fork({name:"angular",properties:{[yp]:!0,[Ns]:n,[Ns+n]:!0},onInvokeTask:(o,r,a,i,s,c)=>{if(dI(c))return o.invokeTask(a,i,s,c);try{return ig(e),o.invokeTask(a,i,s,c)}finally{(e.shouldCoalesceEventChangeDetection&&i.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&t(),sg(e)}},onInvoke:(o,r,a,i,s,c,l)=>{try{return ig(e),o.invoke(a,i,s,c,l)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!pI(c)&&t(),sg(e)}},onHasTask:(o,r,a,i)=>{o.hasTask(a,i),r===a&&(i.change=="microTask"?(e._hasPendingMicrotasks=i.microTask,Md(e),bp(e)):i.change=="macroTask"&&(e.hasPendingMacrotasks=i.macroTask))},onHandleError:(o,r,a,i)=>(o.handleError(a,i),e.runOutsideAngular(()=>e.onError.emit(i)),!1)})}function Md(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function ig(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function sg(e){e._nesting--,bp(e)}var Ps=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new Y;onMicrotaskEmpty=new Y;onStable=new Y;onError=new Y;run(t,n,o){return t.apply(n,o)}runGuarded(t,n,o){return t.apply(n,o)}runOutsideAngular(t){return t()}runTask(t,n,o,r){return t.apply(n,o)}};function dI(e){return Ov(e,"__ignore_ng_zone__")}function pI(e){return Ov(e,"__scheduler_tick__")}function Ov(e,t){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[t]===!0}var Ep=(()=>{class e{impl=null;execute(){this.impl?.execute()}static \u0275prov=v({token:e,providedIn:"root",factory:()=>new e})}return e})(),Fv=[0,1,2,3],Lv=(()=>{class e{ngZone=p(H);scheduler=p(Rn);errorHandler=p(_e,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){p(Eo,{optional:!0})}execute(){let n=this.sequences.size>0;n&&Z(16),this.executing=!0;for(let o of Fv)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[o]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let a=r.hooks[o];return a(r.pipelinedValue)},r.snapshot))}catch(a){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(a)}this.executing=!1;for(let o of this.sequences)o.afterRun(),o.once&&(this.sequences.delete(o),o.destroy());for(let o of this.deferredRegistrations)this.sequences.add(o);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),n&&Z(17)}register(n){let{view:o}=n;o!==void 0?((o[uo]??=[]).push(n),At(o),o[x]|=8192):this.executing?this.deferredRegistrations.add(n):this.addSequence(n)}addSequence(n){this.sequences.add(n),this.scheduler.notify(7)}unregister(n){this.executing&&this.sequences.has(n)?(n.erroredOrDestroyed=!0,n.pipelinedValue=void 0,n.once=!0):(this.sequences.delete(n),this.deferredRegistrations.delete(n))}maybeTrace(n,o){return o?o.run(Qs.AFTER_NEXT_RENDER,n):n()}static \u0275prov=v({token:e,providedIn:"root",factory:()=>new e})}return e})(),js=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(t,n,o,r,a,i=null){this.impl=t,this.hooks=n,this.view=o,this.once=r,this.snapshot=i,this.unregisterOnDestroy=a?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let t=this.view?.[uo];t&&(this.view[uo]=t.filter(n=>n!==this))}};function Zs(e,t){let n=t?.injector??p(he);return ct("NgAfterNextRender"),mI(e,n,t,!0)}function fI(e){return e instanceof Function?[void 0,void 0,e,void 0]:[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function mI(e,t,n,o){let r=t.get(Ep);r.impl??=t.get(Lv);let a=t.get(Eo,null,{optional:!0}),i=n?.manualCleanup!==!0?t.get(mn):null,s=t.get(rr,null,{optional:!0}),c=new js(r.impl,fI(e),s?.view,o,i,a?.snapshot(null));return r.impl.register(c),c}var Ys=(()=>{class e{log(n){console.log(n)}warn(n){console.warn(n)}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"platform"})}return e})();var Ks=new C(""),hr=new C(""),_a=(()=>{class e{_ngZone;registry;_isZoneStable=!0;_callbacks=[];_taskTrackingZone=null;_destroyRef;constructor(n,o,r){this._ngZone=n,this.registry=o,mu()&&(this._destroyRef=p(mn,{optional:!0})??void 0),Cp||(kv(r),r.addToWindow(o)),this._watchAngularEvents(),n.run(()=>{this._taskTrackingZone=typeof Zone>"u"?null:Zone.current.get("TaskTrackingZone")})}_watchAngularEvents(){let n=this._ngZone.onUnstable.subscribe({next:()=>{this._isZoneStable=!1}}),o=this._ngZone.runOutsideAngular(()=>this._ngZone.onStable.subscribe({next:()=>{H.assertNotInAngularZone(),queueMicrotask(()=>{this._isZoneStable=!0,this._runCallbacksIfReady()})}}));this._destroyRef?.onDestroy(()=>{n.unsubscribe(),o.unsubscribe()})}isStable(){return this._isZoneStable&&!this._ngZone.hasPendingMacrotasks}_runCallbacksIfReady(){if(this.isStable())queueMicrotask(()=>{for(;this._callbacks.length!==0;){let n=this._callbacks.pop();clearTimeout(n.timeoutId),n.doneCb()}});else{let n=this.getPendingTasks();this._callbacks=this._callbacks.filter(o=>o.updateCb&&o.updateCb(n)?(clearTimeout(o.timeoutId),!1):!0)}}getPendingTasks(){return this._taskTrackingZone?this._taskTrackingZone.macroTasks.map(n=>({source:n.source,creationLocation:n.creationLocation,data:n.data})):[]}addCallback(n,o,r){let a=-1;o&&o>0&&(a=setTimeout(()=>{this._callbacks=this._callbacks.filter(i=>i.timeoutId!==a),n()},o)),this._callbacks.push({doneCb:n,timeoutId:a,updateCb:r})}whenStable(n,o,r){if(r&&!this._taskTrackingZone)throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');this.addCallback(n,o,r),this._runCallbacksIfReady()}registerApplication(n){this.registry.registerApplication(n,this)}unregisterApplication(n){this.registry.unregisterApplication(n)}findProviders(n,o,r){return[]}static \u0275fac=function(o){return new(o||e)(I(H),I(Ia),I(hr))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),Ia=(()=>{class e{_applications=new Map;registerApplication(n,o){this._applications.set(n,o)}unregisterApplication(n){this._applications.delete(n)}unregisterAllApplications(){this._applications.clear()}getTestability(n){return this._applications.get(n)||null}getAllTestabilities(){return Array.from(this._applications.values())}getAllRootElements(){return Array.from(this._applications.keys())}findTestabilityInTree(n,o=!0){return Cp?.findTestabilityInTree(this,n,o)??null}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"platform"})}return e})();function kv(e){Cp=e}var Cp;function gr(e){return!!e&&typeof e.then=="function"}function Dp(e){return!!e&&typeof e.subscribe=="function"}var _p=new C("");function Xs(e){return io([{provide:_p,multi:!0,useValue:e}])}var Ip=(()=>{class e{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((n,o)=>{this.resolve=n,this.reject=o});appInits=p(_p,{optional:!0})??[];injector=p(he);constructor(){}runInitializers(){if(this.initialized)return;let n=[];for(let r of this.appInits){let a=Ie(this.injector,r);if(gr(a))n.push(a);else if(Dp(a)){let i=new Promise((s,c)=>{a.subscribe({complete:s,error:c})});n.push(i)}}let o=()=>{this.done=!0,this.resolve()};Promise.all(n).then(()=>{o()}).catch(r=>{this.reject(r)}),n.length===0&&o(),this.initialized=!0}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Ta=new C("");function zv(){vl(()=>{let e="";throw new E(600,e)})}function qv(e){return e.isBoundToModule}var hI=10;var Cn=(()=>{class e{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=p($e);afterRenderManager=p(Ep);zonelessEnabled=p(la);rootEffectScheduler=p(ua);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new B;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=p(et);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(A(n=>!n))}constructor(){p(Eo,{optional:!0})}whenStable(){let n;return new Promise(o=>{n=this.isStable.subscribe({next:r=>{r&&o()}})}).finally(()=>{n.unsubscribe()})}_injector=p(ae);_rendererFactory=null;get injector(){return this._injector}bootstrap(n,o){return this.bootstrapImpl(n,o)}bootstrapImpl(n,o,r=he.NULL){return this._injector.get(H).run(()=>{Z(10);let i=n instanceof $s;if(!this._injector.get(Ip).done){let g="";throw new E(405,g)}let c;i?c=n:c=this._injector.get(Da).resolveComponentFactory(n),this.componentTypes.push(c.componentType);let l=qv(c)?void 0:this._injector.get(at),u=o||c.selector,d=c.create(r,[],u,l),m=d.location.nativeElement,f=d.injector.get(Ks,null);return f?.registerApplication(m),d.onDestroy(()=>{this.detachView(d.hostView),pa(this.components,d),f?.unregisterApplication(m)}),this._loadComponent(d),Z(11,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){Z(12),this.tracingSnapshot!==null?this.tracingSnapshot.run(Qs.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw new E(101,!1);let n=R(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,R(n),this.afterTick.next(),Z(13)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(rt,null,{optional:!0}));let n=0;for(;this.dirtyFlags!==0&&n++<hI;)Z(14),this.synchronizeOnce(),Z(15)}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let n=!1;if(this.dirtyFlags&7){let o=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!o&&!ra(r))continue;let a=o&&!this.zonelessEnabled?0:1;lp(r,a),n=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}n||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:n})=>ra(n))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(n){let o=n;this._views.push(o),o.attachToAppRef(this)}detachView(n){let o=n;pa(this._views,o),o.detachFromAppRef()}_loadComponent(n){this.attachView(n.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(n),this._injector.get(Ta,[]).forEach(r=>r(n))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(n=>n()),this._views.slice().forEach(n=>n.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(n){return this._destroyListeners.push(n),()=>pa(this._destroyListeners,n)}destroy(){if(this._destroyed)throw new E(406,!1);let n=this._injector;n.destroy&&!n.destroyed&&n.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function pa(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}function Dn(e,t,n,o){let r=k(),a=ia();if(Pt(r,a,t)){let i=ge(),s=qu();RD(s,r,e,t,n,o)}return Dn}var Tp=new C("",{providedIn:"root",factory:()=>!1}),wp=new C("",{providedIn:"root",factory:()=>gI}),gI=4e3;var lF=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";function Sp(e,t,n,o,r,a,i,s){ct("NgControlFlow");let c=k(),l=ge(),u=kn(l.consts,a);return vp(c,l,e,t,n,o,r,u,256,i,s),Mp}function Mp(e,t,n,o,r,a,i,s){ct("NgControlFlow");let c=k(),l=ge(),u=kn(l.consts,a);return vp(c,l,e,t,n,o,r,u,512,i,s),Mp}function Ap(e,t){ct("NgControlFlow");let n=k(),o=ia(),r=n[o]!==nn?n[o]:-1,a=r!==-1?cg(n,se+r):void 0,i=0;if(Pt(n,o,e)){let s=R(null);try{if(a!==void 0&&KD(a,i),e!==-1){let c=se+e,l=cg(n,c),u=vI(n[M],c),d=i_(l,u,n),m=cp(n,u,t,{dehydratedView:d});dp(l,m,i,Is(u,d))}}finally{R(s)}}else if(a!==void 0){let s=YD(a,i);s!==void 0&&(s[Te]=t)}}function cg(e,t){return e[t]}function vI(e,t){return oa(e,t)}function S(e,t,n){let o=k(),r=ia();if(Pt(o,r,t)){let a=ge(),i=qu();TD(i,o,e,t,o[ie],n)}return S}function Ad(e,t,n,o,r){ip(t,e,n,r?"class":"style",o)}function D(e,t,n,o){let r=k(),a=r[M],i=e+se,s=a.firstCreatePass?fp(i,r,2,t,op,ts(),n,o):a.data[i];if(rp(s,r,e,t,Bv),er(s)){let c=r[M];Us(c,r,s),zd(c,s,r)}return o!=null&&Ca(r,s),D}function h(){let e=ge(),t=Ce(),n=ap(t);return e.firstCreatePass&&mp(e,n),Au(n)&&xu(),Su(),n.classesWithoutHost!=null&&J0(n)&&Ad(e,n,k(),n.classesWithoutHost,!0),n.stylesWithoutHost!=null&&Q0(n)&&Ad(e,n,k(),n.stylesWithoutHost,!1),h}function me(e,t,n,o){return D(e,t,n,o),h(),me}function tn(e,t,n,o){let r=k(),a=r[M],i=e+se,s=a.firstCreatePass?v_(i,a,2,t,n,o):a.data[i];return rp(s,r,e,t,Bv),o!=null&&Ca(r,s),tn}function _n(){let e=Ce(),t=ap(e);return Au(t)&&xu(),Su(),_n}function ec(e,t,n,o){return tn(e,t,n,o),_n(),ec}var Bv=(e,t,n,o,r)=>(sa(!0),Qg(t[ie],o,Nh()));function vr(e,t,n){let o=k(),r=o[M],a=e+se,i=r.firstCreatePass?fp(a,o,8,"ng-container",op,ts(),t,n):r.data[a];if(rp(i,o,e,"ng-container",yI),er(i)){let s=o[M];Us(s,o,i),zd(s,i,o)}return n!=null&&Ca(o,i),vr}function yr(){let e=ge(),t=Ce(),n=ap(t);return e.firstCreatePass&&mp(e,n),yr}var yI=(e,t,n,o,r)=>(sa(!0),tD(t[ie],""));function Lt(){return k()}var wa="en-US";var bI=wa;function Vv(e){typeof e=="string"&&(bI=e.toLowerCase().replace(/_/g,"-"))}function Re(e,t,n){let o=k(),r=ge(),a=Ce();return EI(r,o,o[ie],a,e,t,n),Re}function EI(e,t,n,o,r,a,i){let s=!0,c=null;if((o.type&3||i)&&(c??=Ju(o,t,a),E_(o,e,t,i,n,r,a,c)&&(s=!1)),s){let l=o.outputs?.[r],u=o.hostDirectiveOutputs?.[r];if(u&&u.length)for(let d=0;d<u.length;d+=2){let m=u[d],f=u[d+1];c??=Ju(o,t,a),eg(o,t,m,f,r,c)}if(l&&l.length)for(let d of l)c??=Ju(o,t,a),eg(o,t,d,r,r,c)}}function V(e=1){return Rh(e)}function CI(e,t){let n=null,o=WC(e);for(let r=0;r<t.length;r++){let a=t[r];if(a==="*"){n=r;continue}if(o===null?Jg(e,a,!0):ZC(o,a))return r}return n}function br(e){let t=k()[Ve][ke];if(!t.projection){let n=e?e.length:1,o=t.projection=ah(n,null),r=o.slice(),a=t.child;for(;a!==null;){if(a.type!==128){let i=e?CI(a,e):0;i!==null&&(r[i]?r[i].projectionNext=a:o[i]=a,r[i]=a)}a=a.next}}}function qn(e,t=0,n,o,r,a){let i=k(),s=ge(),c=o?e+1:null;c!==null&&vp(i,s,c,o,r,a,null,n);let l=fr(s,se+e,16,null,n||null);l.projection===null&&(l.projection=t),Pu();let d=!i[Yo]||Mu();i[Ve][ke].projection[l.projection]===null&&c!==null?DI(i,s,c):d&&!zs(l)&&yD(s,i,l)}function DI(e,t,n){let o=se+n,r=t.data[o],a=e[o],i=yd(a,r.tView.ssrId),s=cp(e,r,void 0,{dehydratedView:i});dp(a,s,0,Is(r,i))}function Sa(e,t,n,o){U_(e,t,n,o)}function nc(e,t,n){V_(e,t,n)}function Co(e){let t=k(),n=ge(),o=Lu();rs(o+1);let r=gp(n,o);if(e.dirty&&fh(t)===((r.metadata.flags&2)===2)){if(r.matches===null)e.reset([]);else{let a=G_(t,o);e.reset(a,cC),e.notifyOnChanges()}return!0}return!1}function Do(){return B_(k(),Lu())}function xp(e){let t=Ch();return Eu(t,se+e)}function fs(e,t){return e<<17|t<<2}function vo(e){return e>>17&32767}function _I(e){return(e&2)==2}function II(e,t){return e&131071|t<<17}function xd(e){return e|2}function lr(e){return(e&131068)>>2}function Yu(e,t){return e&-131069|t<<2}function TI(e){return(e&1)===1}function Rd(e){return e|1}function wI(e,t,n,o,r,a){let i=a?t.classBindings:t.styleBindings,s=vo(i),c=lr(i);e[o]=n;let l=!1,u;if(Array.isArray(n)){let d=n;u=d[1],(u===null||Qo(d,u)>0)&&(l=!0)}else u=n;if(r)if(c!==0){let m=vo(e[s+1]);e[o+1]=fs(m,s),m!==0&&(e[m+1]=Yu(e[m+1],o)),e[s+1]=II(e[s+1],o)}else e[o+1]=fs(s,0),s!==0&&(e[s+1]=Yu(e[s+1],o)),s=o;else e[o+1]=fs(c,0),s===0?s=o:e[c+1]=Yu(e[c+1],o),c=o;l&&(e[o+1]=xd(e[o+1])),lg(e,u,o,!0),lg(e,u,o,!1),SI(t,u,e,o,a),i=fs(s,c),a?t.classBindings=i:t.styleBindings=i}function SI(e,t,n,o,r){let a=r?e.residualClasses:e.residualStyles;a!=null&&typeof t=="string"&&Qo(a,t)>=0&&(n[o+1]=Rd(n[o+1]))}function lg(e,t,n,o){let r=e[n+1],a=t===null,i=o?vo(r):lr(r),s=!1;for(;i!==0&&(s===!1||a);){let c=e[i],l=e[i+1];MI(c,t)&&(s=!0,e[i+1]=o?Rd(l):xd(l)),i=o?vo(l):lr(l)}s&&(e[n+1]=o?xd(r):Rd(r))}function MI(e,t){return e===null||t==null||(Array.isArray(e)?e[1]:e)===t?!0:Array.isArray(e)&&typeof t=="string"?Qo(e,t)>=0:!1}var gn={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function AI(e){return e.substring(gn.key,gn.keyEnd)}function xI(e){return RI(e),Uv(e,Hv(e,0,gn.textEnd))}function Uv(e,t){let n=gn.textEnd;return n===t?-1:(t=gn.keyEnd=NI(e,gn.key=t,n),Hv(e,t,n))}function RI(e){gn.key=0,gn.keyEnd=0,gn.value=0,gn.valueEnd=0,gn.textEnd=e.length}function Hv(e,t,n){for(;t<n&&e.charCodeAt(t)<=32;)t++;return t}function NI(e,t,n){for(;t<n&&e.charCodeAt(t)>32;)t++;return t}function tc(e,t,n){return $v(e,t,n,!1),tc}function Se(e,t){return $v(e,t,null,!0),Se}function Rp(e){jI(qI,PI,e,!0)}function PI(e,t){for(let n=xI(t);n>=0;n=Uv(t,n))Zi(e,AI(t),!0)}function $v(e,t,n,o){let r=k(),a=ge(),i=Fu(2);if(a.firstUpdatePass&&Wv(a,e,i,o),t!==nn&&Pt(r,i,t)){let s=a.data[xt()];Jv(a,s,r,r[ie],e,r[i+1]=VI(t,n),o,i)}}function jI(e,t,n,o){let r=ge(),a=Fu(2);r.firstUpdatePass&&Wv(r,null,a,o);let i=k();if(n!==nn&&Pt(i,a,n)){let s=r.data[xt()];if(Qv(s,o)&&!Gv(r,a)){let c=o?s.classesWithoutHost:s.stylesWithoutHost;c!==null&&(n=$i(c,n||"")),Ad(r,s,i,n,o)}else BI(r,s,i,i[ie],i[a+1],i[a+1]=zI(e,t,n),o,a)}}function Gv(e,t){return t>=e.expandoStartIndex}function Wv(e,t,n,o){let r=e.data;if(r[n+1]===null){let a=r[xt()],i=Gv(e,n);Qv(a,o)&&t===null&&!i&&(t=!1),t=OI(r,a,t,o),wI(r,a,t,n,i,o)}}function OI(e,t,n,o){let r=Sh(e),a=o?t.residualClasses:t.residualStyles;if(r===null)(o?t.classBindings:t.styleBindings)===0&&(n=Ku(null,e,t,n,o),n=ga(n,t.attrs,o),a=null);else{let i=t.directiveStylingLast;if(i===-1||e[i]!==r)if(n=Ku(r,e,t,n,o),a===null){let c=FI(e,t,o);c!==void 0&&Array.isArray(c)&&(c=Ku(null,e,t,c[1],o),c=ga(c,t.attrs,o),LI(e,t,o,c))}else a=kI(e,t,o)}return a!==void 0&&(o?t.residualClasses=a:t.residualStyles=a),n}function FI(e,t,n){let o=n?t.classBindings:t.styleBindings;if(lr(o)!==0)return e[vo(o)]}function LI(e,t,n,o){let r=n?t.classBindings:t.styleBindings;e[vo(r)]=o}function kI(e,t,n){let o,r=t.directiveEnd;for(let a=1+t.directiveStylingLast;a<r;a++){let i=e[a].hostAttrs;o=ga(o,i,n)}return ga(o,t.attrs,n)}function Ku(e,t,n,o,r){let a=null,i=n.directiveEnd,s=n.directiveStylingLast;for(s===-1?s=n.directiveStart:s++;s<i&&(a=t[s],o=ga(o,a.hostAttrs,r),a!==e);)s++;return e!==null&&(n.directiveStylingLast=s),o}function ga(e,t,n){let o=n?1:2,r=-1;if(t!==null)for(let a=0;a<t.length;a++){let i=t[a];typeof i=="number"?r=i:r===o&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),Zi(e,i,n?!0:t[++a]))}return e===void 0?null:e}function zI(e,t,n){if(n==null||n==="")return Fe;let o=[],r=en(n);if(Array.isArray(r))for(let a=0;a<r.length;a++)e(o,r[a],!0);else if(typeof r=="object")for(let a in r)r.hasOwnProperty(a)&&e(o,a,r[a]);else typeof r=="string"&&t(o,r);return o}function qI(e,t,n){let o=String(t);o!==""&&!o.includes(" ")&&Zi(e,o,n)}function BI(e,t,n,o,r,a,i,s){r===nn&&(r=Fe);let c=0,l=0,u=0<r.length?r[0]:null,d=0<a.length?a[0]:null;for(;u!==null||d!==null;){let m=c<r.length?r[c+1]:void 0,f=l<a.length?a[l+1]:void 0,g=null,T;u===d?(c+=2,l+=2,m!==f&&(g=d,T=f)):d===null||u!==null&&u<d?(c+=2,g=u):(l+=2,g=d,T=f),g!==null&&Jv(e,t,n,o,g,T,i,s),u=c<r.length?r[c]:null,d=l<a.length?a[l]:null}}function Jv(e,t,n,o,r,a,i,s){if(!(t.type&3))return;let c=e.data,l=c[s+1],u=TI(l)?ug(c,t,n,r,lr(l),i):void 0;if(!Os(u)){Os(a)||_I(l)&&(a=ug(c,null,n,r,s,i));let d=bu(xt(),n);ED(o,i,d,r,a)}}function ug(e,t,n,o,r,a){let i=t===null,s;for(;r>0;){let c=e[r],l=Array.isArray(c),u=l?c[1]:c,d=u===null,m=n[r+1];m===nn&&(m=d?Fe:void 0);let f=d?Yi(m,o):u===o?m:void 0;if(l&&!Os(f)&&(f=Yi(c,o)),Os(f)&&(s=f,i))return s;let g=e[r+1];r=i?vo(g):lr(g)}if(t!==null){let c=a?t.residualClasses:t.residualStyles;c!=null&&(s=Yi(c,o))}return s}function Os(e){return e!==void 0}function VI(e,t){return e==null||e===""||(typeof t=="string"?e=e+t:typeof e=="object"&&(e=Yn(en(e)))),e}function Qv(e,t){return(e.flags&(t?8:16))!==0}function b(e,t=""){let n=k(),o=ge(),r=e+se,a=o.firstCreatePass?fr(o,r,1,t,null):o.data[r],i=UI(o,n,a,t,e);n[r]=i,cs()&&np(o,n,i,a),tr(a,!1)}var UI=(e,t,n,o,r)=>(sa(!0),eD(t[ie],o));function HI(e,t,n,o=""){return Pt(e,ia(),n)?t+Kr(n)+o:nn}function Ue(e){return le("",e),Ue}function le(e,t,n){let o=k(),r=HI(o,e,t,n);return r!==nn&&$I(o,xt(),r),le}function $I(e,t,n){let o=bu(t,e);nD(e[ie],o,n)}function GI(e,t,n){let o=ge();if(o.firstCreatePass){let r=Ln(e);Nd(n,o.data,o.blueprint,r,!0),Nd(t,o.data,o.blueprint,r,!1)}}function Nd(e,t,n,o,r){if(e=De(e),Array.isArray(e))for(let a=0;a<e.length;a++)Nd(e[a],t,n,o,r);else{let a=ge(),i=k(),s=Ce(),c=oo(e)?e:De(e.provide),l=fu(e),u=s.providerIndexes&1048575,d=s.directiveStart,m=s.providerIndexes>>20;if(oo(e)||!e.multi){let f=new go(l,r,K,null),g=ed(c,t,r?u:u+m,d);g===-1?(td(Ds(s,i),a,c),Xu(a,e,t.length),t.push(c),s.directiveStart++,s.directiveEnd++,r&&(s.providerIndexes+=1048576),n.push(f),i.push(f)):(n[g]=f,i[g]=f)}else{let f=ed(c,t,u+m,d),g=ed(c,t,u,u+m),T=f>=0&&n[f],q=g>=0&&n[g];if(r&&!q||!r&&!T){td(Ds(s,i),a,c);let P=QI(r?JI:WI,n.length,r,o,l,e);!r&&q&&(n[g].providerFactory=P),Xu(a,e,t.length,0),t.push(c),s.directiveStart++,s.directiveEnd++,r&&(s.providerIndexes+=1048576),n.push(P),i.push(P)}else{let P=Zv(n[r?g:f],l,!r&&o);Xu(a,e,f>-1?f:g,P)}!r&&o&&q&&n[g].componentProviders++}}}function Xu(e,t,n,o){let r=oo(t),a=uh(t);if(r||a){let c=(a?De(t.useClass):t).prototype.ngOnDestroy;if(c){let l=e.destroyHooks||(e.destroyHooks=[]);if(!r&&t.multi){let u=l.indexOf(n);u===-1?l.push(n,[o,c]):l[u+1].push(o,c)}else l.push(n,c)}}}function Zv(e,t,n){return n&&e.componentProviders++,e.multi.push(t)-1}function ed(e,t,n,o){for(let r=n;r<o;r++)if(t[r]===e)return r;return-1}function WI(e,t,n,o,r){return Pd(this.multi,[])}function JI(e,t,n,o,r){let a=this.multi,i;if(this.providerFactory){let s=this.providerFactory.componentProviders,c=fa(o,o[M],this.providerFactory.index,r);i=c.slice(0,s),Pd(a,i);for(let l=s;l<c.length;l++)i.push(c[l])}else i=[],Pd(a,i);return i}function Pd(e,t){for(let n=0;n<e.length;n++){let o=e[n];t.push(o())}return t}function QI(e,t,n,o,r,a){let i=new go(e,n,K,null);return i.multi=[],i.index=t,i.componentProviders=0,Zv(i,r,o&&!n),i}function lt(e,t=[]){return n=>{n.providersResolver=(o,r)=>GI(o,r?r(e):e,t)}}function ZI(e,t){let n=e[t];return n===nn?void 0:n}function YI(e,t,n,o,r,a,i){let s=t+n;return b_(e,s,r,a)?y_(e,s+2,i?o.call(i,r,a):o(r,a)):ZI(e,s+2)}function kt(e,t){let n=ge(),o,r=e+se;n.firstCreatePass?(o=KI(t,n.pipeRegistry),n.data[r]=o,o.onDestroy&&(n.destroyHooks??=[]).push(r,o.onDestroy)):o=n.data[r];let a=o.factory||(o.factory=_t(o.type,!0)),i,s=Oe(K);try{let c=Cs(!1),l=a();return Cs(c),Cu(n,k(),r,l),l}finally{Oe(s)}}function KI(e,t){if(t)for(let n=t.length-1;n>=0;n--){let o=t[n];if(e===o.name)return o}}function zt(e,t,n,o){let r=e+se,a=k(),i=Eu(a,r);return XI(a,r)?YI(a,Dh(),t,i.transform,n,o,i):i.transform(n,o)}function XI(e,t){return e[M].data[t].pure}function Np(e,t){return Hs(e,t)}var Fs=class{ngModuleFactory;componentFactories;constructor(t,n){this.ngModuleFactory=t,this.componentFactories=n}},Pp=(()=>{class e{compileModuleSync(n){return new Rs(n)}compileModuleAsync(n){return Promise.resolve(this.compileModuleSync(n))}compileModuleAndAllComponentsSync(n){let o=this.compileModuleSync(n),r=lu(n),a=Gg(r.declarations).reduce((i,s)=>{let c=Pn(s);return c&&i.push(new jt(c)),i},[]);return new Fs(o,a)}compileModuleAndAllComponentsAsync(n){return Promise.resolve(this.compileModuleAndAllComponentsSync(n))}clearCache(){}clearCacheFor(n){}getModuleId(n){}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var eT=(()=>{class e{zone=p(H);changeDetectionScheduler=p(Rn);applicationRef=p(Cn);applicationErrorHandler=p($e);_onMicrotaskEmptySubscription;initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{try{this.applicationRef.dirtyFlags|=1,this.applicationRef._tick()}catch(n){this.applicationErrorHandler(n)}})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Yv({ngZoneFactory:e,ignoreChangesOutsideZone:t,scheduleInRootZone:n}){return e??=()=>new H($(y({},Kv()),{scheduleInRootZone:n})),[{provide:H,useFactory:e},{provide:Kn,multi:!0,useFactory:()=>{let o=p(eT,{optional:!0});return()=>o.initialize()}},{provide:Kn,multi:!0,useFactory:()=>{let o=p(nT);return()=>{o.initialize()}}},t===!0?{provide:Uu,useValue:!0}:[],{provide:Hu,useValue:n??Pv},{provide:$e,useFactory:()=>{let o=p(H),r=p(ae),a;return i=>{o.runOutsideAngular(()=>{r.destroyed&&!a?setTimeout(()=>{throw i}):(a??=r.get(_e),a.handleError(i))})}}}]}function Kv(e){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:e?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:e?.runCoalescing??!1}}var nT=(()=>{class e{subscription=new J;initialized=!1;zone=p(H);pendingTasks=p(et);initialize(){if(this.initialized)return;this.initialized=!0;let n=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(n=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{H.assertNotInAngularZone(),queueMicrotask(()=>{n!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(n),n=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{H.assertInAngularZone(),n??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Xv=(()=>{class e{applicationErrorHandler=p($e);appRef=p(Cn);taskService=p(et);ngZone=p(H);zonelessEnabled=p(la);tracing=p(Eo,{optional:!0});disableScheduling=p(Uu,{optional:!0})??!1;zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new J;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Ns):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(p(Hu,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof Ps||!this.zoneIsDefined)}notify(n){if(!this.zonelessEnabled&&n===5)return;let o=!1;switch(n){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2,o=!0;break}case 12:{this.appRef.dirtyFlags|=16,o=!0;break}case 13:{this.appRef.dirtyFlags|=2,o=!0;break}case 11:{o=!0;break}case 9:case 8:case 7:case 10:default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick(o))return;let r=this.useMicrotaskScheduler?ag:jv;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(n){return!(this.disableScheduling&&!n||this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Ns+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let n=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(o){this.taskService.remove(n),this.applicationErrorHandler(o)}finally{this.cleanup()}this.useMicrotaskScheduler=!0,ag(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(n)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let n=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(n)}}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function tT(){return typeof $localize<"u"&&$localize.locale||wa}var oc=new C("",{providedIn:"root",factory:()=>p(oc,{optional:!0,skipSelf:!0})||tT()});function Bn(e){return Gm(e)}var jp=class{[Ne];constructor(t){this[Ne]=t}destroy(){this[Ne].destroy()}};function Op(e,t){let n=t?.injector??p(he),o=t?.manualCleanup!==!0?n.get(mn):null,r,a=n.get(rr,null,{optional:!0}),i=n.get(Rn);return a!==null?(r=aT(a.view,i,e),o instanceof Zr&&o._lView===a.view&&(o=null)):r=iT(e,n.get(ua),i),r.injector=n,o!==null&&(r.onDestroyFn=o.onDestroy(()=>r.destroy())),new jp(r)}var ey=$(y({},Wm),{cleanupFns:void 0,zone:null,onDestroyFn:mo,run(){let e=or(!1);try{Jm(this)}finally{or(e)}},cleanup(){if(!this.cleanupFns?.length)return;let e=R(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],R(e)}}}),oT=$(y({},ey),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){Qt(this),this.onDestroyFn(),this.cleanup(),this.scheduler.remove(this)}}),rT=$(y({},ey),{consumerMarkedDirty(){this.view[x]|=8192,At(this.view),this.notifier.notify(13)},destroy(){Qt(this),this.onDestroyFn(),this.cleanup(),this.view[Xn]?.delete(this)}});function aT(e,t,n){let o=Object.create(rT);return o.view=e,o.zone=typeof Zone<"u"?Zone.current:null,o.notifier=t,o.fn=ny(o,n),e[Xn]??=new Set,e[Xn].add(o),o.consumerMarkedDirty(o),o}function iT(e,t,n){let o=Object.create(oT);return o.fn=ny(o,e),o.scheduler=t,o.notifier=n,o.zone=typeof Zone<"u"?Zone.current:null,o.scheduler.add(o),o.notifier.notify(12),o}function ny(e,t){return()=>{t(n=>(e.cleanupFns??=[]).push(n))}}var cy=Symbol("InputSignalNode#UNSET"),yT=$(y({},mi),{transformFn:void 0,applyValueToInputSignal(e,t){zo(e,t)}});function ly(e,t){let n=Object.create(yT);n.value=e,n.transformFn=t?.transform;function o(){if(zr(n),n.value===cy){let r=null;throw new E(-950,r)}return n.value}return o[Ne]=n,o}var qt=class{attributeName;constructor(t){this.attributeName=t}__NG_ELEMENT_ID__=()=>ya(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}},bT=new C("");bT.__NG_ELEMENT_ID__=e=>{let t=Ce();if(t===null)throw new E(204,!1);if(t.type&2)return t.value;if(e&8)return null;throw new E(204,!1)};function ty(e,t){return ly(e,t)}function ET(e){return ly(cy,e)}var uy=(ty.required=ET,ty);var Fp=new C(""),CT=new C("");function Ma(e){return!e.moduleRef}function DT(e){let t=Ma(e)?e.r3Injector:e.moduleRef.injector,n=t.get(H);return n.run(()=>{Ma(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let o=t.get($e),r;if(n.runOutsideAngular(()=>{r=n.onError.subscribe({next:o})}),Ma(e)){let a=()=>t.destroy(),i=e.platformInjector.get(Fp);i.add(a),t.onDestroy(()=>{r.unsubscribe(),i.delete(a)})}else{let a=()=>e.moduleRef.destroy(),i=e.platformInjector.get(Fp);i.add(a),e.moduleRef.onDestroy(()=>{pa(e.allPlatformModules,e.moduleRef),r.unsubscribe(),i.delete(a)})}return IT(o,n,()=>{let a=t.get(et),i=a.add(),s=t.get(Ip);return s.runInitializers(),s.donePromise.then(()=>{let c=t.get(oc,wa);if(Vv(c||wa),!t.get(CT,!0))return Ma(e)?t.get(Cn):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(Ma(e)){let u=t.get(Cn);return e.rootComponent!==void 0&&u.bootstrap(e.rootComponent),u}else return _T?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>void a.remove(i))})})}var _T;function IT(e,t,n){try{let o=n();return gr(o)?o.catch(r=>{throw t.runOutsideAngular(()=>e(r)),r}):o}catch(o){throw t.runOutsideAngular(()=>e(o)),o}}var rc=null;function TT(e=[],t){return he.create({name:t,providers:[{provide:ea,useValue:"platform"},{provide:Fp,useValue:new Set([()=>rc=null])},...e]})}function wT(e=[]){if(rc)return rc;let t=TT(e);return rc=t,zv(),ST(t),t}function ST(e){let t=e.get(Ls,null);Ie(e,()=>{t?.forEach(n=>n())})}var ut=(()=>{class e{static __NG_ELEMENT_ID__=MT}return e})();function MT(e){return AT(Ce(),k(),(e&16)===16)}function AT(e,t,n){if(Mt(e)&&!n){let o=Ke(e.index,t);return new Nt(o,o)}else if(e.type&175){let o=t[Ve];return new Nt(o,t)}return null}var Lp=class{constructor(){}supports(t){return hp(t)}create(t){return new kp(t)}},xT=(e,t)=>t,kp=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(t){this._trackByFn=t||xT}forEachItem(t){let n;for(n=this._itHead;n!==null;n=n._next)t(n)}forEachOperation(t){let n=this._itHead,o=this._removalsHead,r=0,a=null;for(;n||o;){let i=!o||n&&n.currentIndex<oy(o,r,a)?n:o,s=oy(i,r,a),c=i.currentIndex;if(i===o)r--,o=o._nextRemoved;else if(n=n._next,i.previousIndex==null)r++;else{a||(a=[]);let l=s-r,u=c-r;if(l!=u){for(let m=0;m<l;m++){let f=m<a.length?a[m]:a[m]=0,g=f+m;u<=g&&g<l&&(a[m]=f+1)}let d=i.previousIndex;a[d]=u-l}}s!==c&&t(i,s,c)}}forEachPreviousItem(t){let n;for(n=this._previousItHead;n!==null;n=n._nextPrevious)t(n)}forEachAddedItem(t){let n;for(n=this._additionsHead;n!==null;n=n._nextAdded)t(n)}forEachMovedItem(t){let n;for(n=this._movesHead;n!==null;n=n._nextMoved)t(n)}forEachRemovedItem(t){let n;for(n=this._removalsHead;n!==null;n=n._nextRemoved)t(n)}forEachIdentityChange(t){let n;for(n=this._identityChangesHead;n!==null;n=n._nextIdentityChange)t(n)}diff(t){if(t==null&&(t=[]),!hp(t))throw new E(900,!1);return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let n=this._itHead,o=!1,r,a,i;if(Array.isArray(t)){this.length=t.length;for(let s=0;s<this.length;s++)a=t[s],i=this._trackByFn(s,a),n===null||!Object.is(n.trackById,i)?(n=this._mismatch(n,a,i,s),o=!0):(o&&(n=this._verifyReinsertion(n,a,i,s)),Object.is(n.item,a)||this._addIdentityChange(n,a)),n=n._next}else r=0,Dv(t,s=>{i=this._trackByFn(r,s),n===null||!Object.is(n.trackById,i)?(n=this._mismatch(n,s,i,r),o=!0):(o&&(n=this._verifyReinsertion(n,s,i,r)),Object.is(n.item,s)||this._addIdentityChange(n,s)),n=n._next,r++}),this.length=r;return this._truncate(n),this.collection=t,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let t;for(t=this._previousItHead=this._itHead;t!==null;t=t._next)t._nextPrevious=t._next;for(t=this._additionsHead;t!==null;t=t._nextAdded)t.previousIndex=t.currentIndex;for(this._additionsHead=this._additionsTail=null,t=this._movesHead;t!==null;t=t._nextMoved)t.previousIndex=t.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(t,n,o,r){let a;return t===null?a=this._itTail:(a=t._prev,this._remove(t)),t=this._unlinkedRecords===null?null:this._unlinkedRecords.get(o,null),t!==null?(Object.is(t.item,n)||this._addIdentityChange(t,n),this._reinsertAfter(t,a,r)):(t=this._linkedRecords===null?null:this._linkedRecords.get(o,r),t!==null?(Object.is(t.item,n)||this._addIdentityChange(t,n),this._moveAfter(t,a,r)):t=this._addAfter(new zp(n,o),a,r)),t}_verifyReinsertion(t,n,o,r){let a=this._unlinkedRecords===null?null:this._unlinkedRecords.get(o,null);return a!==null?t=this._reinsertAfter(a,t._prev,r):t.currentIndex!=r&&(t.currentIndex=r,this._addToMoves(t,r)),t}_truncate(t){for(;t!==null;){let n=t._next;this._addToRemovals(this._unlink(t)),t=n}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(t,n,o){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(t);let r=t._prevRemoved,a=t._nextRemoved;return r===null?this._removalsHead=a:r._nextRemoved=a,a===null?this._removalsTail=r:a._prevRemoved=r,this._insertAfter(t,n,o),this._addToMoves(t,o),t}_moveAfter(t,n,o){return this._unlink(t),this._insertAfter(t,n,o),this._addToMoves(t,o),t}_addAfter(t,n,o){return this._insertAfter(t,n,o),this._additionsTail===null?this._additionsTail=this._additionsHead=t:this._additionsTail=this._additionsTail._nextAdded=t,t}_insertAfter(t,n,o){let r=n===null?this._itHead:n._next;return t._next=r,t._prev=n,r===null?this._itTail=t:r._prev=t,n===null?this._itHead=t:n._next=t,this._linkedRecords===null&&(this._linkedRecords=new ac),this._linkedRecords.put(t),t.currentIndex=o,t}_remove(t){return this._addToRemovals(this._unlink(t))}_unlink(t){this._linkedRecords!==null&&this._linkedRecords.remove(t);let n=t._prev,o=t._next;return n===null?this._itHead=o:n._next=o,o===null?this._itTail=n:o._prev=n,t}_addToMoves(t,n){return t.previousIndex===n||(this._movesTail===null?this._movesTail=this._movesHead=t:this._movesTail=this._movesTail._nextMoved=t),t}_addToRemovals(t){return this._unlinkedRecords===null&&(this._unlinkedRecords=new ac),this._unlinkedRecords.put(t),t.currentIndex=null,t._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=t,t._prevRemoved=null):(t._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=t),t}_addIdentityChange(t,n){return t.item=n,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=t:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=t,t}},zp=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(t,n){this.item=t,this.trackById=n}},qp=class{_head=null;_tail=null;add(t){this._head===null?(this._head=this._tail=t,t._nextDup=null,t._prevDup=null):(this._tail._nextDup=t,t._prevDup=this._tail,t._nextDup=null,this._tail=t)}get(t,n){let o;for(o=this._head;o!==null;o=o._nextDup)if((n===null||n<=o.currentIndex)&&Object.is(o.trackById,t))return o;return null}remove(t){let n=t._prevDup,o=t._nextDup;return n===null?this._head=o:n._nextDup=o,o===null?this._tail=n:o._prevDup=n,this._head===null}},ac=class{map=new Map;put(t){let n=t.trackById,o=this.map.get(n);o||(o=new qp,this.map.set(n,o)),o.add(t)}get(t,n){let o=t,r=this.map.get(o);return r?r.get(t,n):null}remove(t){let n=t.trackById;return this.map.get(n).remove(t)&&this.map.delete(n),t}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function oy(e,t,n){let o=e.previousIndex;if(o===null)return o;let r=0;return n&&o<n.length&&(r=n[o]),o+t+r}var Bp=class{constructor(){}supports(t){return t instanceof Map||Gs(t)}create(){return new Vp}},Vp=class{_records=new Map;_mapHead=null;_appendAfter=null;_previousMapHead=null;_changesHead=null;_changesTail=null;_additionsHead=null;_additionsTail=null;_removalsHead=null;_removalsTail=null;get isDirty(){return this._additionsHead!==null||this._changesHead!==null||this._removalsHead!==null}forEachItem(t){let n;for(n=this._mapHead;n!==null;n=n._next)t(n)}forEachPreviousItem(t){let n;for(n=this._previousMapHead;n!==null;n=n._nextPrevious)t(n)}forEachChangedItem(t){let n;for(n=this._changesHead;n!==null;n=n._nextChanged)t(n)}forEachAddedItem(t){let n;for(n=this._additionsHead;n!==null;n=n._nextAdded)t(n)}forEachRemovedItem(t){let n;for(n=this._removalsHead;n!==null;n=n._nextRemoved)t(n)}diff(t){if(!t)t=new Map;else if(!(t instanceof Map||Gs(t)))throw new E(900,!1);return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let n=this._mapHead;if(this._appendAfter=null,this._forEach(t,(o,r)=>{if(n&&n.key===r)this._maybeAddToChanges(n,o),this._appendAfter=n,n=n._next;else{let a=this._getOrCreateRecordForKey(r,o);n=this._insertBeforeOrAppend(n,a)}}),n){n._prev&&(n._prev._next=null),this._removalsHead=n;for(let o=n;o!==null;o=o._nextRemoved)o===this._mapHead&&(this._mapHead=null),this._records.delete(o.key),o._nextRemoved=o._next,o.previousValue=o.currentValue,o.currentValue=null,o._prev=null,o._next=null}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(t,n){if(t){let o=t._prev;return n._next=t,n._prev=o,t._prev=n,o&&(o._next=n),t===this._mapHead&&(this._mapHead=n),this._appendAfter=t,t}return this._appendAfter?(this._appendAfter._next=n,n._prev=this._appendAfter):this._mapHead=n,this._appendAfter=n,null}_getOrCreateRecordForKey(t,n){if(this._records.has(t)){let r=this._records.get(t);this._maybeAddToChanges(r,n);let a=r._prev,i=r._next;return a&&(a._next=i),i&&(i._prev=a),r._next=null,r._prev=null,r}let o=new Up(t);return this._records.set(t,o),o.currentValue=n,this._addToAdditions(o),o}_reset(){if(this.isDirty){let t;for(this._previousMapHead=this._mapHead,t=this._previousMapHead;t!==null;t=t._next)t._nextPrevious=t._next;for(t=this._changesHead;t!==null;t=t._nextChanged)t.previousValue=t.currentValue;for(t=this._additionsHead;t!=null;t=t._nextAdded)t.previousValue=t.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null}}_maybeAddToChanges(t,n){Object.is(n,t.currentValue)||(t.previousValue=t.currentValue,t.currentValue=n,this._addToChanges(t))}_addToAdditions(t){this._additionsHead===null?this._additionsHead=this._additionsTail=t:(this._additionsTail._nextAdded=t,this._additionsTail=t)}_addToChanges(t){this._changesHead===null?this._changesHead=this._changesTail=t:(this._changesTail._nextChanged=t,this._changesTail=t)}_forEach(t,n){t instanceof Map?t.forEach(n):Object.keys(t).forEach(o=>n(t[o],o))}},Up=class{key;previousValue=null;currentValue=null;_nextPrevious=null;_next=null;_prev=null;_nextAdded=null;_nextRemoved=null;_nextChanged=null;constructor(t){this.key=t}};function ry(){return new Hp([new Lp])}var Hp=(()=>{class e{factories;static \u0275prov=v({token:e,providedIn:"root",factory:ry});constructor(n){this.factories=n}static create(n,o){if(o!=null){let r=o.factories.slice();n=n.concat(r)}return new e(n)}static extend(n){return{provide:e,useFactory:()=>{let o=p(e,{optional:!0,skipSelf:!0});return e.create(n,o||ry())}}}find(n){let o=this.factories.find(r=>r.supports(n));if(o!=null)return o;throw new E(901,!1)}}return e})();function ay(){return new $p([new Bp])}var $p=(()=>{class e{static \u0275prov=v({token:e,providedIn:"root",factory:ay});factories;constructor(n){this.factories=n}static create(n,o){if(o){let r=o.factories.slice();n=n.concat(r)}return new e(n)}static extend(n){return{provide:e,useFactory:()=>{let o=p(e,{optional:!0,skipSelf:!0});return e.create(n,o||ay())}}}find(n){let o=this.factories.find(r=>r.supports(n));if(o)return o;throw new E(901,!1)}}return e})();var dy=(()=>{class e{constructor(n){}static \u0275fac=function(o){return new(o||e)(I(Cn))};static \u0275mod=ce({type:e});static \u0275inj=re({})}return e})();function py(e){let{rootComponent:t,appProviders:n,platformProviders:o,platformRef:r}=e;Z(8);try{let a=r?.injector??wT(o),i=[Yv({}),{provide:Rn,useExisting:Xv},jh,...n||[]],s=new ha({providers:i,parent:a,debugName:"",runEnvironmentInitializers:!1});return DT({r3Injector:s.injector,platformInjector:a,rootComponent:t})}catch(a){return Promise.reject(a)}finally{Z(9)}}function ze(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function Gp(e,t=NaN){return!isNaN(parseFloat(e))&&!isNaN(Number(e))?Number(e):t}function Wp(e,t){let n=Pn(e),o=t.elementInjector||Zo();return new jt(n).create(o,t.projectableNodes,t.hostElement,t.environmentInjector,t.directives,t.bindings)}function fy(e){let t=Pn(e);if(!t)return null;let n=new jt(t);return{get selector(){return n.selector},get type(){return n.componentType},get inputs(){return n.inputs},get outputs(){return n.outputs},get ngContentSelectors(){return n.ngContentSelectors},get isStandalone(){return t.standalone},get isSignal(){return t.signals}}}var gy=null;function Vn(){return gy}function Jp(e){gy??=e}var Aa=class{},xa=(()=>{class e{historyGo(n){throw new Error("")}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:()=>p(vy),providedIn:"platform"})}return e})(),Qp=new C(""),vy=(()=>{class e extends xa{_location;_history;_doc=p(U);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return Vn().getBaseHref(this._doc)}onPopState(n){let o=Vn().getGlobalEventTarget(this._doc,"window");return o.addEventListener("popstate",n,!1),()=>o.removeEventListener("popstate",n)}onHashChange(n){let o=Vn().getGlobalEventTarget(this._doc,"window");return o.addEventListener("hashchange",n,!1),()=>o.removeEventListener("hashchange",n)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(n){this._location.pathname=n}pushState(n,o,r){this._history.pushState(n,o,r)}replaceState(n,o,r){this._history.replaceState(n,o,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(n=0){this._history.go(n)}getState(){return this._history.state}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:()=>new e,providedIn:"platform"})}return e})();function ic(e,t){return e?t?e.endsWith("/")?t.startsWith("/")?e+t.slice(1):e+t:t.startsWith("/")?e+t:`${e}/${t}`:e:t}function my(e){let t=e.search(/#|\?|$/);return e[t-1]==="/"?e.slice(0,t-1)+e.slice(t):e}function In(e){return e&&e[0]!=="?"?`?${e}`:e}var Tn=(()=>{class e{historyGo(n){throw new Error("")}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:()=>p(cc),providedIn:"root"})}return e})(),sc=new C(""),cc=(()=>{class e extends Tn{_platformLocation;_baseHref;_removeListenerFns=[];constructor(n,o){super(),this._platformLocation=n,this._baseHref=o??this._platformLocation.getBaseHrefFromDOM()??p(U).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}prepareExternalUrl(n){return ic(this._baseHref,n)}path(n=!1){let o=this._platformLocation.pathname+In(this._platformLocation.search),r=this._platformLocation.hash;return r&&n?`${o}${r}`:o}pushState(n,o,r,a){let i=this.prepareExternalUrl(r+In(a));this._platformLocation.pushState(n,o,i)}replaceState(n,o,r,a){let i=this.prepareExternalUrl(r+In(a));this._platformLocation.replaceState(n,o,i)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}static \u0275fac=function(o){return new(o||e)(I(xa),I(sc,8))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Bt=(()=>{class e{_subject=new B;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(n){this._locationStrategy=n;let o=this._locationStrategy.getBaseHref();this._basePath=PT(my(hy(o))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(n=!1){return this.normalize(this._locationStrategy.path(n))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(n,o=""){return this.path()==this.normalize(n+In(o))}normalize(n){return e.stripTrailingSlash(NT(this._basePath,hy(n)))}prepareExternalUrl(n){return n&&n[0]!=="/"&&(n="/"+n),this._locationStrategy.prepareExternalUrl(n)}go(n,o="",r=null){this._locationStrategy.pushState(r,"",n,o),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+In(o)),r)}replaceState(n,o="",r=null){this._locationStrategy.replaceState(r,"",n,o),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+In(o)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(n=0){this._locationStrategy.historyGo?.(n)}onUrlChange(n){return this._urlChangeListeners.push(n),this._urlChangeSubscription??=this.subscribe(o=>{this._notifyUrlChangeListeners(o.url,o.state)}),()=>{let o=this._urlChangeListeners.indexOf(n);this._urlChangeListeners.splice(o,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(n="",o){this._urlChangeListeners.forEach(r=>r(n,o))}subscribe(n,o,r){return this._subject.subscribe({next:n,error:o??void 0,complete:r??void 0})}static normalizeQueryParams=In;static joinWithSlash=ic;static stripTrailingSlash=my;static \u0275fac=function(o){return new(o||e)(I(Tn))};static \u0275prov=v({token:e,factory:()=>RT(),providedIn:"root"})}return e})();function RT(){return new Bt(I(Tn))}function NT(e,t){if(!e||!t.startsWith(e))return t;let n=t.substring(e.length);return n===""||["/",";","?","#"].includes(n[0])?n:t}function hy(e){return e.replace(/\/index.html$/,"")}function PT(e){if(new RegExp("^(https?:)?//").test(e)){let[,n]=e.split(/\/\/[^\/]+/);return n}return e}var Zp=(()=>{class e extends Tn{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(n,o){super(),this._platformLocation=n,o!=null&&(this._baseHref=o)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}path(n=!1){let o=this._platformLocation.hash??"#";return o.length>0?o.substring(1):o}prepareExternalUrl(n){let o=ic(this._baseHref,n);return o.length>0?"#"+o:o}pushState(n,o,r,a){let i=this.prepareExternalUrl(r+In(a))||this._platformLocation.pathname;this._platformLocation.pushState(n,o,i)}replaceState(n,o,r,a){let i=this.prepareExternalUrl(r+In(a))||this._platformLocation.pathname;this._platformLocation.replaceState(n,o,i)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}static \u0275fac=function(o){return new(o||e)(I(xa),I(sc,8))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})();var lc=class{$implicit;ngForOf;index;count;constructor(t,n,o,r){this.$implicit=t,this.ngForOf=n,this.index=o,this.count=r}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},Vt=(()=>{class e{_viewContainer;_template;_differs;set ngForOf(n){this._ngForOf=n,this._ngForOfDirty=!0}set ngForTrackBy(n){this._trackByFn=n}get ngForTrackBy(){return this._trackByFn}_ngForOf=null;_ngForOfDirty=!0;_differ=null;_trackByFn;constructor(n,o,r){this._viewContainer=n,this._template=o,this._differs=r}set ngForTemplate(n){n&&(this._template=n)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let n=this._ngForOf;!this._differ&&n&&(this._differ=this._differs.find(n).create(this.ngForTrackBy))}if(this._differ){let n=this._differ.diff(this._ngForOf);n&&this._applyChanges(n)}}_applyChanges(n){let o=this._viewContainer;n.forEachOperation((r,a,i)=>{if(r.previousIndex==null)o.createEmbeddedView(this._template,new lc(r.item,this._ngForOf,-1,-1),i===null?void 0:i);else if(i==null)o.remove(a===null?void 0:a);else if(a!==null){let s=o.get(a);o.move(s,i),yy(s,r)}});for(let r=0,a=o.length;r<a;r++){let s=o.get(r).context;s.index=r,s.count=a,s.ngForOf=this._ngForOf}n.forEachIdentityChange(r=>{let a=o.get(r.currentIndex);yy(a,r)})}static ngTemplateContextGuard(n,o){return!0}static \u0275fac=function(o){return new(o||e)(K(Ge),K(yn),K(Hp))};static \u0275dir=fe({type:e,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}})}return e})();function yy(e,t){e.context.$implicit=t.item}var dt=(()=>{class e{_viewContainer;_context=new uc;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(n,o){this._viewContainer=n,this._thenTemplateRef=o}set ngIf(n){this._context.$implicit=this._context.ngIf=n,this._updateView()}set ngIfThen(n){by(n,!1),this._thenTemplateRef=n,this._thenViewRef=null,this._updateView()}set ngIfElse(n){by(n,!1),this._elseTemplateRef=n,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(n,o){return!0}static \u0275fac=function(o){return new(o||e)(K(Ge),K(yn))};static \u0275dir=fe({type:e,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return e})(),uc=class{$implicit=null;ngIf=null};function by(e,t){if(e&&!e.createEmbeddedView)throw new E(2020,!1)}var Yp=(()=>{class e{_ngEl;_differs;_renderer;_ngStyle=null;_differ=null;constructor(n,o,r){this._ngEl=n,this._differs=o,this._renderer=r}set ngStyle(n){this._ngStyle=n,!this._differ&&n&&(this._differ=this._differs.find(n).create())}ngDoCheck(){if(this._differ){let n=this._differ.diff(this._ngStyle);n&&this._applyChanges(n)}}_setStyle(n,o){let[r,a]=n.split("."),i=r.indexOf("-")===-1?void 0:vn.DashCase;o!=null?this._renderer.setStyle(this._ngEl.nativeElement,r,a?`${o}${a}`:o,i):this._renderer.removeStyle(this._ngEl.nativeElement,r,i)}_applyChanges(n){n.forEachRemovedItem(o=>this._setStyle(o.key,null)),n.forEachAddedItem(o=>this._setStyle(o.key,o.currentValue)),n.forEachChangedItem(o=>this._setStyle(o.key,o.currentValue))}static \u0275fac=function(o){return new(o||e)(K(pe),K($p),K(Ft))};static \u0275dir=fe({type:e,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"}})}return e})();var We=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=ce({type:e});static \u0275inj=re({})}return e})();function Kp(e,t){t=encodeURIComponent(t);for(let n of e.split(";")){let o=n.indexOf("="),[r,a]=o==-1?[n,""]:[n.slice(0,o),n.slice(o+1)];if(r.trim()===t)return decodeURIComponent(a)}return null}var Ra=class{};var ef="browser";function Ey(e){return e===ef}var Cy=(()=>{class e{static \u0275prov=v({token:e,providedIn:"root",factory:()=>new Xp(p(U),window)})}return e})(),Xp=class{document;window;offset=()=>[0,0];constructor(t,n){this.document=t,this.window=n}setOffset(t){Array.isArray(t)?this.offset=()=>t:this.offset=t}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(t,n){this.window.scrollTo($(y({},n),{left:t[0],top:t[1]}))}scrollToAnchor(t,n){let o=OT(this.document,t);o&&(this.scrollToElement(o,n),o.focus())}setHistoryScrollRestoration(t){try{this.window.history.scrollRestoration=t}catch{console.warn(Nn(2400,!1))}}scrollToElement(t,n){let o=t.getBoundingClientRect(),r=o.left+this.window.pageXOffset,a=o.top+this.window.pageYOffset,i=this.offset();this.window.scrollTo($(y({},n),{left:r-i[0],top:a-i[1]}))}};function OT(e,t){let n=e.getElementById(t)||e.getElementsByName(t)[0];if(n)return n;if(typeof e.createTreeWalker=="function"&&e.body&&typeof e.body.attachShadow=="function"){let o=e.createTreeWalker(e.body,NodeFilter.SHOW_ELEMENT),r=o.currentNode;for(;r;){let a=r.shadowRoot;if(a){let i=a.getElementById(t)||a.querySelector(`[name="${t}"]`);if(i)return i}r=o.nextNode()}}return null}var pc=new C(""),af=(()=>{class e{_zone;_plugins;_eventNameToPlugin=new Map;constructor(n,o){this._zone=o,n.forEach(r=>{r.manager=this}),this._plugins=n.slice().reverse()}addEventListener(n,o,r,a){return this._findPluginFor(o).addEventListener(n,o,r,a)}getZone(){return this._zone}_findPluginFor(n){let o=this._eventNameToPlugin.get(n);if(o)return o;if(o=this._plugins.find(a=>a.supports(n)),!o)throw new E(5101,!1);return this._eventNameToPlugin.set(n,o),o}static \u0275fac=function(o){return new(o||e)(I(pc),I(H))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),Pa=class{_doc;constructor(t){this._doc=t}manager},nf="ng-app-id";function Dy(e){for(let t of e)t.remove()}function _y(e,t){let n=t.createElement("style");return n.textContent=e,n}function FT(e,t,n,o){let r=e.head?.querySelectorAll(`style[${nf}="${t}"],link[${nf}="${t}"]`);if(r)for(let a of r)a.removeAttribute(nf),a instanceof HTMLLinkElement?o.set(a.href.slice(a.href.lastIndexOf("/")+1),{usage:0,elements:[a]}):a.textContent&&n.set(a.textContent,{usage:0,elements:[a]})}function of(e,t){let n=t.createElement("link");return n.setAttribute("rel","stylesheet"),n.setAttribute("href",e),n}var sf=(()=>{class e{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(n,o,r,a={}){this.doc=n,this.appId=o,this.nonce=r,FT(n,o,this.inline,this.external),this.hosts.add(n.head)}addStyles(n,o){for(let r of n)this.addUsage(r,this.inline,_y);o?.forEach(r=>this.addUsage(r,this.external,of))}removeStyles(n,o){for(let r of n)this.removeUsage(r,this.inline);o?.forEach(r=>this.removeUsage(r,this.external))}addUsage(n,o,r){let a=o.get(n);a?a.usage++:o.set(n,{usage:1,elements:[...this.hosts].map(i=>this.addElement(i,r(n,this.doc)))})}removeUsage(n,o){let r=o.get(n);r&&(r.usage--,r.usage<=0&&(Dy(r.elements),o.delete(n)))}ngOnDestroy(){for(let[,{elements:n}]of[...this.inline,...this.external])Dy(n);this.hosts.clear()}addHost(n){this.hosts.add(n);for(let[o,{elements:r}]of this.inline)r.push(this.addElement(n,_y(o,this.doc)));for(let[o,{elements:r}]of this.external)r.push(this.addElement(n,of(o,this.doc)))}removeHost(n){this.hosts.delete(n)}addElement(n,o){return this.nonce&&o.setAttribute("nonce",this.nonce),n.appendChild(o)}static \u0275fac=function(o){return new(o||e)(I(U),I(dr),I(pr,8),I(Ot))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),tf={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},cf=/%COMP%/g;var Ty="%COMP%",LT=`_nghost-${Ty}`,kT=`_ngcontent-${Ty}`,zT=!0,qT=new C("",{providedIn:"root",factory:()=>zT});function BT(e){return kT.replace(cf,e)}function VT(e){return LT.replace(cf,e)}function wy(e,t){return t.map(n=>n.replace(cf,e))}var lf=(()=>{class e{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;platformId;ngZone;nonce;animationDisabled;maxAnimationTimeout;tracingService;rendererByCompId=new Map;defaultRenderer;platformIsServer;registry;constructor(n,o,r,a,i,s,c,l=null,u,d,m=null){this.eventManager=n,this.sharedStylesHost=o,this.appId=r,this.removeStylesOnCompDestroy=a,this.doc=i,this.platformId=s,this.ngZone=c,this.nonce=l,this.animationDisabled=u,this.maxAnimationTimeout=d,this.tracingService=m,this.platformIsServer=!1,this.defaultRenderer=new ja(n,i,c,this.platformIsServer,this.tracingService,this.registry=ls(),this.maxAnimationTimeout)}createRenderer(n,o){if(!n||!o)return this.defaultRenderer;let r=this.getOrCreateRenderer(n,o);return r instanceof dc?r.applyToHost(n):r instanceof Oa&&r.applyStyles(),r}getOrCreateRenderer(n,o){let r=this.rendererByCompId,a=r.get(o.id);if(!a){let i=this.doc,s=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.platformIsServer,m=this.tracingService;switch(o.encapsulation){case tt.Emulated:a=new dc(c,l,o,this.appId,u,i,s,d,m,this.registry,this.animationDisabled,this.maxAnimationTimeout);break;case tt.ShadowDom:return new rf(c,l,n,o,i,s,this.nonce,d,m,this.registry,this.maxAnimationTimeout);default:a=new Oa(c,l,o,u,i,s,d,m,this.registry,this.animationDisabled,this.maxAnimationTimeout);break}r.set(o.id,a)}return a}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(n){this.rendererByCompId.delete(n)}static \u0275fac=function(o){return new(o||e)(I(af),I(sf),I(dr),I(qT),I(U),I(Ot),I(H),I(pr),I(Tp),I(wp),I(Eo,8))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),ja=class{eventManager;doc;ngZone;platformIsServer;tracingService;registry;maxAnimationTimeout;data=Object.create(null);throwOnSyntheticProps=!0;constructor(t,n,o,r,a,i,s){this.eventManager=t,this.doc=n,this.ngZone=o,this.platformIsServer=r,this.tracingService=a,this.registry=i,this.maxAnimationTimeout=s}destroy(){}destroyNode=null;createElement(t,n){return n?this.doc.createElementNS(tf[n]||n,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,n){(Iy(t)?t.content:t).appendChild(n)}insertBefore(t,n,o){t&&(Iy(t)?t.content:t).insertBefore(n,o)}removeChild(t,n){let{elements:o}=this.registry;if(o){o.animate(n,()=>n.remove(),this.maxAnimationTimeout);return}n.remove()}selectRootElement(t,n){let o=typeof t=="string"?this.doc.querySelector(t):t;if(!o)throw new E(-5104,!1);return n||(o.textContent=""),o}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,n,o,r){if(r){n=r+":"+n;let a=tf[r];a?t.setAttributeNS(a,n,o):t.setAttribute(n,o)}else t.setAttribute(n,o)}removeAttribute(t,n,o){if(o){let r=tf[o];r?t.removeAttributeNS(r,n):t.removeAttribute(`${o}:${n}`)}else t.removeAttribute(n)}addClass(t,n){t.classList.add(n)}removeClass(t,n){t.classList.remove(n)}setStyle(t,n,o,r){r&(vn.DashCase|vn.Important)?t.style.setProperty(n,o,r&vn.Important?"important":""):t.style[n]=o}removeStyle(t,n,o){o&vn.DashCase?t.style.removeProperty(n):t.style[n]=""}setProperty(t,n,o){t!=null&&(t[n]=o)}setValue(t,n){t.nodeValue=n}listen(t,n,o,r){if(typeof t=="string"&&(t=Vn().getGlobalEventTarget(this.doc,t),!t))throw new E(5102,!1);let a=this.decoratePreventDefault(o);return this.tracingService?.wrapEventListener&&(a=this.tracingService.wrapEventListener(t,n,a)),this.eventManager.addEventListener(t,n,a,r)}decoratePreventDefault(t){return n=>{if(n==="__ngUnwrap__")return t;t(n)===!1&&n.preventDefault()}}};function Iy(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var rf=class extends ja{sharedStylesHost;hostEl;shadowRoot;constructor(t,n,o,r,a,i,s,c,l,u,d){super(t,a,i,c,l,u,d),this.sharedStylesHost=n,this.hostEl=o,this.shadowRoot=o.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let m=r.styles;m=wy(r.id,m);for(let g of m){let T=document.createElement("style");s&&T.setAttribute("nonce",s),T.textContent=g,this.shadowRoot.appendChild(T)}let f=r.getExternalStyles?.();if(f)for(let g of f){let T=of(g,a);s&&T.setAttribute("nonce",s),this.shadowRoot.appendChild(T)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,n){return super.appendChild(this.nodeOrShadowRoot(t),n)}insertBefore(t,n,o){return super.insertBefore(this.nodeOrShadowRoot(t),n,o)}removeChild(t,n){return super.removeChild(null,n)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},Oa=class extends ja{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;_animationDisabled;constructor(t,n,o,r,a,i,s,c,l,u,d,m){super(t,a,i,s,c,l,d),this.sharedStylesHost=n,this.removeStylesOnCompDestroy=r,this._animationDisabled=u;let f=o.styles;this.styles=m?wy(m,f):f,this.styleUrls=o.getExternalStyles?.(m)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){if(this.removeStylesOnCompDestroy){if(!this._animationDisabled&&this.registry.elements){this.ngZone.runOutsideAngular(()=>{setTimeout(()=>{this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)},this.maxAnimationTimeout)});return}this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}}},dc=class extends Oa{contentAttr;hostAttr;constructor(t,n,o,r,a,i,s,c,l,u,d,m){let f=r+"-"+o.id;super(t,n,o,a,i,s,c,l,u,d,m,f),this.contentAttr=BT(f),this.hostAttr=VT(f)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,n){let o=super.createElement(t,n);return super.setAttribute(o,this.contentAttr,""),o}};var fc=class e extends Aa{supportsDOMEvents=!0;static makeCurrent(){Jp(new e)}onAndCancel(t,n,o,r){return t.addEventListener(n,o,r),()=>{t.removeEventListener(n,o,r)}}dispatchEvent(t,n){t.dispatchEvent(n)}remove(t){t.remove()}createElement(t,n){return n=n||this.getDefaultDocument(),n.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,n){return n==="window"?window:n==="document"?t:n==="body"?t.body:null}getBaseHref(t){let n=UT();return n==null?null:HT(n)}resetBaseElement(){Fa=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return Kp(document.cookie,t)}},Fa=null;function UT(){return Fa=Fa||document.head.querySelector("base"),Fa?Fa.getAttribute("href"):null}function HT(e){return new URL(e,document.baseURI).pathname}var mc=class{addToWindow(t){Le.getAngularTestability=(o,r=!0)=>{let a=t.findTestabilityInTree(o,r);if(a==null)throw new E(5103,!1);return a},Le.getAllAngularTestabilities=()=>t.getAllTestabilities(),Le.getAllAngularRootElements=()=>t.getAllRootElements();let n=o=>{let r=Le.getAllAngularTestabilities(),a=r.length,i=function(){a--,a==0&&o()};r.forEach(s=>{s.whenStable(i)})};Le.frameworkStabilizers||(Le.frameworkStabilizers=[]),Le.frameworkStabilizers.push(n)}findTestabilityInTree(t,n,o){if(n==null)return null;let r=t.getTestability(n);return r??(o?Vn().isShadowRoot(n)?this.findTestabilityInTree(t,n.host,!0):this.findTestabilityInTree(t,n.parentElement,!0):null)}},$T=(()=>{class e{build(){return new XMLHttpRequest}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),My=(()=>{class e extends Pa{constructor(n){super(n)}supports(n){return!0}addEventListener(n,o,r,a){return n.addEventListener(o,r,a),()=>this.removeEventListener(n,o,r,a)}removeEventListener(n,o,r,a){return n.removeEventListener(o,r,a)}static \u0275fac=function(o){return new(o||e)(I(U))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),Sy=["alt","control","meta","shift"],GT={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},WT={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},Ay=(()=>{class e extends Pa{constructor(n){super(n)}supports(n){return e.parseEventName(n)!=null}addEventListener(n,o,r,a){let i=e.parseEventName(o),s=e.eventCallback(i.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Vn().onAndCancel(n,i.domEventName,s,a))}static parseEventName(n){let o=n.toLowerCase().split("."),r=o.shift();if(o.length===0||!(r==="keydown"||r==="keyup"))return null;let a=e._normalizeKey(o.pop()),i="",s=o.indexOf("code");if(s>-1&&(o.splice(s,1),i="code."),Sy.forEach(l=>{let u=o.indexOf(l);u>-1&&(o.splice(u,1),i+=l+".")}),i+=a,o.length!=0||a.length===0)return null;let c={};return c.domEventName=r,c.fullKey=i,c}static matchEventFullKeyCode(n,o){let r=GT[n.key]||n.key,a="";return o.indexOf("code.")>-1&&(r=n.code,a="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),Sy.forEach(i=>{if(i!==r){let s=WT[i];s(n)&&(a+=i+".")}}),a+=r,a===o)}static eventCallback(n,o,r){return a=>{e.matchEventFullKeyCode(a,n)&&r.runGuarded(()=>o(a))}}static _normalizeKey(n){return n==="esc"?"escape":n}static \u0275fac=function(o){return new(o||e)(I(U))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})();function uf(e,t,n){let o=y({rootComponent:e,platformRef:n?.platformRef},JT(t));return py(o)}function JT(e){return{appProviders:[...xy,...e?.providers??[]],platformProviders:KT}}function QT(){fc.makeCurrent()}function ZT(){return new _e}function YT(){return Ld(document),document}var KT=[{provide:Ot,useValue:ef},{provide:Ls,useValue:QT,multi:!0},{provide:U,useFactory:YT}];var XT=[{provide:hr,useClass:mc},{provide:Ks,useClass:_a,deps:[H,Ia,hr]},{provide:_a,useClass:_a,deps:[H,Ia,hr]}],xy=[{provide:ea,useValue:"root"},{provide:_e,useFactory:ZT},{provide:pc,useClass:My,multi:!0,deps:[U]},{provide:pc,useClass:Ay,multi:!0,deps:[U]},lf,sf,af,{provide:rt,useExisting:lf},{provide:Ra,useClass:$T},[]],df=(()=>{class e{constructor(){}static \u0275fac=function(o){return new(o||e)};static \u0275mod=ce({type:e});static \u0275inj=re({providers:[...xy,...XT],imports:[We,dy]})}return e})();var ff=class{};var _o=class e{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(t){t?typeof t=="string"?this.lazyInit=()=>{this.headers=new Map,t.split(`
`).forEach(n=>{let o=n.indexOf(":");if(o>0){let r=n.slice(0,o),a=n.slice(o+1).trim();this.addHeaderEntry(r,a)}})}:typeof Headers<"u"&&t instanceof Headers?(this.headers=new Map,t.forEach((n,o)=>{this.addHeaderEntry(o,n)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(t).forEach(([n,o])=>{this.setHeaderEntries(n,o)})}:this.headers=new Map}has(t){return this.init(),this.headers.has(t.toLowerCase())}get(t){this.init();let n=this.headers.get(t.toLowerCase());return n&&n.length>0?n[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(t){return this.init(),this.headers.get(t.toLowerCase())||null}append(t,n){return this.clone({name:t,value:n,op:"a"})}set(t,n){return this.clone({name:t,value:n,op:"s"})}delete(t,n){return this.clone({name:t,value:n,op:"d"})}maybeSetNormalizedName(t,n){this.normalizedNames.has(n)||this.normalizedNames.set(n,t)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(t=>this.applyUpdate(t)),this.lazyUpdate=null))}copyFrom(t){t.init(),Array.from(t.headers.keys()).forEach(n=>{this.headers.set(n,t.headers.get(n)),this.normalizedNames.set(n,t.normalizedNames.get(n))})}clone(t){let n=new e;return n.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,n.lazyUpdate=(this.lazyUpdate||[]).concat([t]),n}applyUpdate(t){let n=t.name.toLowerCase();switch(t.op){case"a":case"s":let o=t.value;if(typeof o=="string"&&(o=[o]),o.length===0)return;this.maybeSetNormalizedName(t.name,n);let r=(t.op==="a"?this.headers.get(n):void 0)||[];r.push(...o),this.headers.set(n,r);break;case"d":let a=t.value;if(!a)this.headers.delete(n),this.normalizedNames.delete(n);else{let i=this.headers.get(n);if(!i)return;i=i.filter(s=>a.indexOf(s)===-1),i.length===0?(this.headers.delete(n),this.normalizedNames.delete(n)):this.headers.set(n,i)}break}}addHeaderEntry(t,n){let o=t.toLowerCase();this.maybeSetNormalizedName(t,o),this.headers.has(o)?this.headers.get(o).push(n):this.headers.set(o,[n])}setHeaderEntries(t,n){let o=(Array.isArray(n)?n:[n]).map(a=>a.toString()),r=t.toLowerCase();this.headers.set(r,o),this.maybeSetNormalizedName(t,r)}forEach(t){this.init(),Array.from(this.normalizedNames.keys()).forEach(n=>t(this.normalizedNames.get(n),this.headers.get(n)))}};var mf=class{encodeKey(t){return Ry(t)}encodeValue(t){return Ry(t)}decodeKey(t){return decodeURIComponent(t)}decodeValue(t){return decodeURIComponent(t)}};function ew(e,t){let n=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(r=>{let a=r.indexOf("="),[i,s]=a==-1?[t.decodeKey(r),""]:[t.decodeKey(r.slice(0,a)),t.decodeValue(r.slice(a+1))],c=n.get(i)||[];c.push(s),n.set(i,c)}),n}var nw=/%(\d[a-f0-9])/gi,tw={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function Ry(e){return encodeURIComponent(e).replace(nw,(t,n)=>tw[n]??t)}function hc(e){return`${e}`}var pt=class e{map;encoder;updates=null;cloneFrom=null;constructor(t={}){if(this.encoder=t.encoder||new mf,t.fromString){if(t.fromObject)throw new E(2805,!1);this.map=ew(t.fromString,this.encoder)}else t.fromObject?(this.map=new Map,Object.keys(t.fromObject).forEach(n=>{let o=t.fromObject[n],r=Array.isArray(o)?o.map(hc):[hc(o)];this.map.set(n,r)})):this.map=null}has(t){return this.init(),this.map.has(t)}get(t){this.init();let n=this.map.get(t);return n?n[0]:null}getAll(t){return this.init(),this.map.get(t)||null}keys(){return this.init(),Array.from(this.map.keys())}append(t,n){return this.clone({param:t,value:n,op:"a"})}appendAll(t){let n=[];return Object.keys(t).forEach(o=>{let r=t[o];Array.isArray(r)?r.forEach(a=>{n.push({param:o,value:a,op:"a"})}):n.push({param:o,value:r,op:"a"})}),this.clone(n)}set(t,n){return this.clone({param:t,value:n,op:"s"})}delete(t,n){return this.clone({param:t,value:n,op:"d"})}toString(){return this.init(),this.keys().map(t=>{let n=this.encoder.encodeKey(t);return this.map.get(t).map(o=>n+"="+this.encoder.encodeValue(o)).join("&")}).filter(t=>t!=="").join("&")}clone(t){let n=new e({encoder:this.encoder});return n.cloneFrom=this.cloneFrom||this,n.updates=(this.updates||[]).concat(t),n}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(t=>this.map.set(t,this.cloneFrom.map.get(t))),this.updates.forEach(t=>{switch(t.op){case"a":case"s":let n=(t.op==="a"?this.map.get(t.param):void 0)||[];n.push(hc(t.value)),this.map.set(t.param,n);break;case"d":if(t.value!==void 0){let o=this.map.get(t.param)||[],r=o.indexOf(hc(t.value));r!==-1&&o.splice(r,1),o.length>0?this.map.set(t.param,o):this.map.delete(t.param)}else{this.map.delete(t.param);break}}}),this.cloneFrom=this.updates=null)}};var hf=class{map=new Map;set(t,n){return this.map.set(t,n),this}get(t){return this.map.has(t)||this.map.set(t,t.defaultValue()),this.map.get(t)}delete(t){return this.map.delete(t),this}has(t){return this.map.has(t)}keys(){return this.map.keys()}};function ow(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function Ny(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function Py(e){return typeof Blob<"u"&&e instanceof Blob}function jy(e){return typeof FormData<"u"&&e instanceof FormData}function rw(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}var aw="X-Request-URL",Oy="text/plain",Fy="application/json",AU=`${Fy}, ${Oy}, */*`,Cr=class e{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(t,n,o,r){this.url=n,this.method=t.toUpperCase();let a;if(ow(this.method)||r?(this.body=o!==void 0?o:null,a=r):a=o,a){if(this.reportProgress=!!a.reportProgress,this.withCredentials=!!a.withCredentials,this.keepalive=!!a.keepalive,a.responseType&&(this.responseType=a.responseType),a.headers&&(this.headers=a.headers),a.context&&(this.context=a.context),a.params&&(this.params=a.params),a.priority&&(this.priority=a.priority),a.cache&&(this.cache=a.cache),a.credentials&&(this.credentials=a.credentials),typeof a.timeout=="number"){if(a.timeout<1||!Number.isInteger(a.timeout))throw new E(2822,"");this.timeout=a.timeout}a.mode&&(this.mode=a.mode),a.redirect&&(this.redirect=a.redirect),a.integrity&&(this.integrity=a.integrity),a.referrer&&(this.referrer=a.referrer),this.transferCache=a.transferCache}if(this.headers??=new _o,this.context??=new hf,!this.params)this.params=new pt,this.urlWithParams=n;else{let i=this.params.toString();if(i.length===0)this.urlWithParams=n;else{let s=n.indexOf("?"),c=s===-1?"?":s<n.length-1?"&":"";this.urlWithParams=n+c+i}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||Ny(this.body)||Py(this.body)||jy(this.body)||rw(this.body)?this.body:this.body instanceof pt?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||jy(this.body)?null:Py(this.body)?this.body.type||null:Ny(this.body)?null:typeof this.body=="string"?Oy:this.body instanceof pt?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?Fy:null}clone(t={}){let n=t.method||this.method,o=t.url||this.url,r=t.responseType||this.responseType,a=t.keepalive??this.keepalive,i=t.priority||this.priority,s=t.cache||this.cache,c=t.mode||this.mode,l=t.redirect||this.redirect,u=t.credentials||this.credentials,d=t.referrer||this.referrer,m=t.integrity||this.integrity,f=t.transferCache??this.transferCache,g=t.timeout??this.timeout,T=t.body!==void 0?t.body:this.body,q=t.withCredentials??this.withCredentials,P=t.reportProgress??this.reportProgress,Sn=t.headers||this.headers,ht=t.params||this.params,AE=t.context??this.context;return t.setHeaders!==void 0&&(Sn=Object.keys(t.setHeaders).reduce((cl,kr)=>cl.set(kr,t.setHeaders[kr]),Sn)),t.setParams&&(ht=Object.keys(t.setParams).reduce((cl,kr)=>cl.set(kr,t.setParams[kr]),ht)),new e(n,o,T,{params:ht,headers:Sn,context:AE,reportProgress:P,responseType:r,withCredentials:q,transferCache:f,keepalive:a,cache:s,priority:i,timeout:g,mode:c,redirect:l,credentials:u,referrer:d,integrity:m})}},vf=(function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e})(vf||{}),gf=class{headers;status;statusText;url;ok;type;redirected;constructor(t,n=200,o="OK"){this.headers=t.headers||new _o,this.status=t.status!==void 0?t.status:n,this.statusText=t.statusText||o,this.url=t.url||null,this.redirected=t.redirected,this.ok=this.status>=200&&this.status<300}};var gc=class e extends gf{body;constructor(t={}){super(t),this.body=t.body!==void 0?t.body:null}type=vf.Response;clone(t={}){return new e({body:t.body!==void 0?t.body:this.body,headers:t.headers||this.headers,status:t.status!==void 0?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0,redirected:t.redirected??this.redirected})}};function pf(e,t){return{body:t,headers:e.headers,context:e.context,observe:e.observe,params:e.params,reportProgress:e.reportProgress,responseType:e.responseType,withCredentials:e.withCredentials,credentials:e.credentials,transferCache:e.transferCache,timeout:e.timeout,keepalive:e.keepalive,priority:e.priority,cache:e.cache,mode:e.mode,redirect:e.redirect,integrity:e.integrity,referrer:e.referrer}}var yf=(()=>{class e{handler;constructor(n){this.handler=n}request(n,o,r={}){let a;if(n instanceof Cr)a=n;else{let c;r.headers instanceof _o?c=r.headers:c=new _o(r.headers);let l;r.params&&(r.params instanceof pt?l=r.params:l=new pt({fromObject:r.params})),a=new Cr(n,o,r.body!==void 0?r.body:null,{headers:c,context:r.context,params:l,reportProgress:r.reportProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,integrity:r.integrity,timeout:r.timeout})}let i=w(a).pipe(xn(c=>this.handler.handle(c)));if(n instanceof Cr||r.observe==="events")return i;let s=i.pipe(ne(c=>c instanceof gc));switch(r.observe||"body"){case"body":switch(a.responseType){case"arraybuffer":return s.pipe(A(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new E(2806,!1);return c.body}));case"blob":return s.pipe(A(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new E(2807,!1);return c.body}));case"text":return s.pipe(A(c=>{if(c.body!==null&&typeof c.body!="string")throw new E(2808,!1);return c.body}));case"json":default:return s.pipe(A(c=>c.body))}case"response":return s;default:throw new E(2809,!1)}}delete(n,o={}){return this.request("DELETE",n,o)}get(n,o={}){return this.request("GET",n,o)}head(n,o={}){return this.request("HEAD",n,o)}jsonp(n,o){return this.request("JSONP",n,{params:new pt().append(o,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(n,o={}){return this.request("OPTIONS",n,o)}patch(n,o,r={}){return this.request("PATCH",n,pf(r,o))}post(n,o,r={}){return this.request("POST",n,pf(r,o))}put(n,o,r={}){return this.request("PUT",n,pf(r,o))}static \u0275fac=function(o){return new(o||e)(I(ff))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})();var xU=RegExp(`^${aw}:`,"m");var Ly=(()=>{class e{_doc;constructor(n){this._doc=n}getTitle(){return this._doc.title}setTitle(n){this._doc.title=n||""}static \u0275fac=function(o){return new(o||e)(I(U))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var bf=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:function(o){let r=null;return o?r=new(o||e):r=I(sw),r},providedIn:"root"})}return e})(),sw=(()=>{class e extends bf{_doc;constructor(n){super(),this._doc=n}sanitize(n,o){if(o==null)return null;switch(n){case we.NONE:return o;case we.HTML:return it(o,"HTML")?en(o):$d(this._doc,String(o)).toString();case we.STYLE:return it(o,"Style")?en(o):o;case we.SCRIPT:if(it(o,"Script"))return en(o);throw new E(5200,!1);case we.URL:return it(o,"URL")?en(o):ba(String(o));case we.RESOURCE_URL:if(it(o,"ResourceURL"))return en(o);throw new E(5201,!1);default:throw new E(5202,!1)}}bypassSecurityTrustHtml(n){return qd(n)}bypassSecurityTrustStyle(n){return Bd(n)}bypassSecurityTrustScript(n){return Vd(n)}bypassSecurityTrustUrl(n){return Ud(n)}bypassSecurityTrustResourceUrl(n){return Hd(n)}static \u0275fac=function(o){return new(o||e)(I(U))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var zy=[{nombre:"Europa",hijos:[{nombre:"Alemania",flag:"https://flagcdn.com/de.svg",hijos:[{nombre:"Aachen/Aquisgr\xE1n",path:"europa/alemania/aachen"},{nombre:"Bonn",path:"europa/alemania/bonn"},{nombre:"Colonia",path:"europa/alemania/colonia"},{nombre:"Dortmund",path:"europa/alemania/dortmund"},{nombre:"D\xFCsseldorf",path:"europa/alemania/dusseldorf"},{nombre:"Fr\xE1ncfort del Meno",path:"europa/alemania/francfort"},{nombre:"Heidelberg",path:"europa/alemania/heidelberg"},{nombre:"Idstein",path:"europa/alemania/idstein"},{nombre:"M\xFCnster",path:"europa/alemania/munster"},{nombre:"Tr\xE9veris/Trier",path:"europa/alemania/treveris"}]},{nombre:"Andorra",flag:"https://flagcdn.com/ad.svg",hijos:[{nombre:"Andorra",path:"europa/andorra/andorra"}]},{nombre:"Espa\xF1a",flag:"https://flagcdn.com/es.svg",hijos:[{nombre:"Andaluc\xEDa",hijos:[{nombre:"Huelva",hijos:[{nombre:"Huelva ciudad",path:"europa/espana/andalucia/huelva/huelva-ciudad"},{nombre:"Palos de la Frontera",path:"europa/espana/andalucia/huelva/palos"}]},{nombre:"C\xE1diz",hijos:[{nombre:"C\xE1diz ciudad",path:"europa/espana/andalucia/cadiz/cadiz-ciudad"},{nombre:"Grazalema",path:"europa/espana/andalucia/cadiz/grazalema"},{nombre:"Jerez de la Frontera",path:"europa/espana/andalucia/cadiz/jerez-de-la-frontera"},{nombre:"Setenil de las Bodegas",path:"europa/espana/andalucia/cadiz/setenil-de-las-bodegas"},{nombre:"Trebujena",path:"europa/espana/andalucia/cadiz/trebujena"}]},{nombre:"Sevilla",hijos:[{nombre:"Sevilla ciudad",path:"europa/espana/andalucia/sevilla/sevilla-ciudad"},{nombre:"Castilblanco de los Arroyos",path:"europa/espana/andalucia/sevilla/castilblanco-de-los-arroyos"},{nombre:"Coria del R\xEDo",path:"europa/espana/andalucia/sevilla/coria-del-rio"},{nombre:"Isla Mayor",path:"europa/espana/andalucia/sevilla/isla-mayor"},{nombre:"Mairena del Aljarafe",path:"europa/espana/andalucia/sevilla/mairena-del-aljarafe"},{nombre:"Palomares del R\xEDo",path:"europa/espana/andalucia/sevilla/palomares-del-rio"},{nombre:"El Real de la Jara",path:"europa/espana/andalucia/sevilla/real-de-la-jara"},{nombre:"Santiponce",path:"europa/espana/andalucia/sevilla/santiponce"}]},{nombre:"C\xF3rboda",hijos:[{nombre:"C\xF3rdoba ciudad",path:"europa/espana/andalucia/cordoba/cordoba-ciudad"}]},{nombre:"M\xE1laga",hijos:[{nombre:"M\xE1laga ciudad",path:"europa/espana/andalucia/malaga/malaga-ciudad"}]},{nombre:"Ja\xE9n",hijos:[{nombre:"Ja\xE9n ciudad",path:"europa/espana/andalucia/jaen/jaen-ciudad"}]},{nombre:"Granada",hijos:[{nombre:"Granada ciudad",path:"europa/espana/andalucia/granada/granada-ciudad"}]},{nombre:"Almer\xEDa",hijos:[{nombre:"Almer\xEDa ciudad",path:"europa/espana/andalucia/almeria/almeria-ciudad"}]}]},{nombre:"Islas Baleares",hijos:[{nombre:"Mallorca",path:"europa/espana/baleares/mallorca"}]},{nombre:"Islas Canarias",hijos:[{nombre:"Tenerife",path:"europa/espana/canarias/tenerife"}]},{nombre:"Catalu\xF1a",hijos:[{nombre:"Gerona",hijos:[{nombre:"Gerona",path:"europa/espana/cataluna/gerona/gerona-ciudad"}]}]},{nombre:"Extremadura",hijos:[{nombre:"M\xE9rida",path:"europa/espana/extremadura/merida/merida-ciudad"},{nombre:"Badajoz",path:"europa/espana/extremadura/badajoz/badajoz-ciudad"},{nombre:"C\xE1ceres",hijos:[{nombre:"C\xE1ceres ciudad",path:"europa/espana/extremadura/caceres/caceres-ciudad"},{nombre:"Coria",path:"europa/espana/extremadura/caceres/coria"},{nombre:"Plasencia",path:"europa/espana/extremadura/caceres/plasencia"},{nombre:"Trujillo",path:"europa/espana/extremadura/caceres/trujillo"}]}]},{nombre:"Comunidad Madrid",hijos:[{nombre:"Madrid",path:"europa/espana/madrid/madrid-ciudad"}]},{nombre:"Murcia",hijos:[{nombre:"Murcia",path:"europa/espana/murcia/murcia-ciudad"},{nombre:"Cartagena",path:"europa/espana/murcia/cartagena"}]},{nombre:"Navarra",hijos:[{nombre:"Pamplona",path:"europa/espana/murcia/murcia-ciudad"}]},{nombre:"Pa\xEDs Vasco",hijos:[{nombre:"\xC1lava",hijos:[{nombre:"Vitoria-Gasteiz",path:"europa/espana/pais-vasco/alava/vitoria"}]},{nombre:"Guip\xFAzcoa",hijos:[{nombre:"San Sebasti\xE1n/Donostia",path:"europa/espana/pais-vasco/guipuzcoa/san-sebastian"}]},{nombre:"Vizcaya",hijos:[{nombre:"Bilbao",path:"europa/espana/pais-vasco/vizcaya/bilbao"}]}]},{nombre:"La Rioja",hijos:[{nombre:"Logro\xF1o",path:"europa/espana/rioja/logrono"}]},{nombre:"Ceuta",hijos:[{nombre:"Ceuta",path:"europa/espana/ceuta/ceuta-ciudad"}]}]},{nombre:"Gibraltar",flag:"https://flagcdn.com/gi.svg",hijos:[{nombre:"Gibraltar",path:"europa/gibraltar/gibraltar"}]},{nombre:"Irlanda",flag:"https://flagcdn.com/ie.svg",hijos:[{nombre:"Dublin",path:"europa/irlanda/dublin"}]},{nombre:"Italia",flag:"https://flagcdn.com/it.svg",hijos:[{nombre:"Roma y Ciudad del Vaticano",path:"europa/italia/roma-vaticano"}]},{nombre:"Pa\xEDses Bajos",flag:"https://flagcdn.com/nl.svg",hijos:[{nombre:"\xC1msterdam",path:"europa/paises-bajos/amsterdam"}]},{nombre:"Portugal",flag:"https://flagcdn.com/pt.svg",hijos:[{nombre:"Lisboa",path:"europa/portugal/lisboa"}]},{nombre:"Rumania",flag:"https://flagcdn.com/ro.svg",hijos:[{nombre:"Bucarest",path:"europa/rumania/bucarest"}]},{nombre:"Polonia",flag:"https://flagcdn.com/pl.svg",hijos:[{nombre:"Varsovia",path:"europa/polonia/varsovia"},{nombre:"Cracovia",path:"europa/polonia/cracovia"}]},{nombre:"Rep\xFAblica Checa",flag:"https://flagcdn.com/cz.svg",hijos:[{nombre:"Praga",path:"europa/andorra/praga"}]},{nombre:"Turqu\xEDa",flag:"https://flagcdn.com/tr.svg",hijos:[{nombre:"Estambul",path:"europa/turquia/estambul"}]}]},{nombre:"\xC1frica",hijos:[{nombre:"Marruecos",flag:"https://flagcdn.com/ma.svg",hijos:[{nombre:"T\xE1nger",path:"africa/marruecos/tanger"},{nombre:"Asilah/Arcila",path:"africa/marruecos/asilah"},{nombre:"Tetu\xE1n",path:"africa/marruecos/tetuan"},{nombre:"Chefchaouen/Chauen",path:"africa/marruecos/chefchaouen"}]}]},{nombre:"Am\xE9rica",hijos:[{nombre:"Norteam\xE9rica",hijos:[{nombre:"Estados Unidos",flag:"https://flagcdn.com/us.svg",hijos:[{nombre:"Nueva York",path:"america/norteamerica/estados-unidos/nueva-york"}]},{nombre:"M\xE9xico",flag:"https://flagcdn.com/mx.svg",hijos:[{nombre:"Riviera Maya",hijos:[{nombre:"Canc\xFAn",path:"america/norteamerica/mexico/riviera-maya/cancun"}]}]}]},{nombre:"Centroam\xE9rica",hijos:[]},{nombre:"Sudam\xE9rica",hijos:[{nombre:"Brasil",flag:"https://flagcdn.com/br.svg",hijos:[{nombre:"R\xEDo de Janeiro",path:"america/sudamerica/brasil/rio-de-janeiro"}]}]}]},{nombre:"Asia"},{nombre:"Ocean\xEDa"},{nombre:"Ant\xE1rtida"}];var j="primary",Qa=Symbol("RouteTitle"),If=class{params;constructor(t){this.params=t||{}}has(t){return Object.prototype.hasOwnProperty.call(this.params,t)}get(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n[0]:n}return null}getAll(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n:[n]}return[]}get keys(){return Object.keys(this.params)}};function wo(e){return new If(e)}function Wy(e,t,n){let o=n.path.split("/");if(o.length>e.length||n.pathMatch==="full"&&(t.hasChildren()||o.length<e.length))return null;let r={};for(let a=0;a<o.length;a++){let i=o[a],s=e[a];if(i[0]===":")r[i.substring(1)]=s;else if(i!==s.path)return null}return{consumed:e.slice(0,o.length),posParams:r}}function cw(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(!Un(e[n],t[n]))return!1;return!0}function Un(e,t){let n=e?Tf(e):void 0,o=t?Tf(t):void 0;if(!n||!o||n.length!=o.length)return!1;let r;for(let a=0;a<n.length;a++)if(r=n[a],!Jy(e[r],t[r]))return!1;return!0}function Tf(e){return[...Object.keys(e),...Object.getOwnPropertySymbols(e)]}function Jy(e,t){if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;let n=[...e].sort(),o=[...t].sort();return n.every((r,a)=>o[a]===r)}else return e===t}function Qy(e){return e.length>0?e[e.length-1]:null}function ft(e){return Rl(e)?e:gr(e)?te(Promise.resolve(e)):w(e)}var lw={exact:Yy,subset:Ky},Zy={exact:uw,subset:dw,ignored:()=>!0};function qy(e,t,n){return lw[n.paths](e.root,t.root,n.matrixParams)&&Zy[n.queryParams](e.queryParams,t.queryParams)&&!(n.fragment==="exact"&&e.fragment!==t.fragment)}function uw(e,t){return Un(e,t)}function Yy(e,t,n){if(!Io(e.segments,t.segments)||!bc(e.segments,t.segments,n)||e.numberOfChildren!==t.numberOfChildren)return!1;for(let o in t.children)if(!e.children[o]||!Yy(e.children[o],t.children[o],n))return!1;return!0}function dw(e,t){return Object.keys(t).length<=Object.keys(e).length&&Object.keys(t).every(n=>Jy(e[n],t[n]))}function Ky(e,t,n){return Xy(e,t,t.segments,n)}function Xy(e,t,n,o){if(e.segments.length>n.length){let r=e.segments.slice(0,n.length);return!(!Io(r,n)||t.hasChildren()||!bc(r,n,o))}else if(e.segments.length===n.length){if(!Io(e.segments,n)||!bc(e.segments,n,o))return!1;for(let r in t.children)if(!e.children[r]||!Ky(e.children[r],t.children[r],o))return!1;return!0}else{let r=n.slice(0,e.segments.length),a=n.slice(e.segments.length);return!Io(e.segments,r)||!bc(e.segments,r,o)||!e.children[j]?!1:Xy(e.children[j],t,a,o)}}function bc(e,t,n){return t.every((o,r)=>Zy[n](e[r].parameters,o.parameters))}var $n=class{root;queryParams;fragment;_queryParamMap;constructor(t=new W([],{}),n={},o=null){this.root=t,this.queryParams=n,this.fragment=o}get queryParamMap(){return this._queryParamMap??=wo(this.queryParams),this._queryParamMap}toString(){return mw.serialize(this)}},W=class{segments;children;parent=null;constructor(t,n){this.segments=t,this.children=n,Object.values(n).forEach(o=>o.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Ec(this)}},Ut=class{path;parameters;_parameterMap;constructor(t,n){this.path=t,this.parameters=n}get parameterMap(){return this._parameterMap??=wo(this.parameters),this._parameterMap}toString(){return nb(this)}};function pw(e,t){return Io(e,t)&&e.every((n,o)=>Un(n.parameters,t[o].parameters))}function Io(e,t){return e.length!==t.length?!1:e.every((n,o)=>n.path===t[o].path)}function fw(e,t){let n=[];return Object.entries(e.children).forEach(([o,r])=>{o===j&&(n=n.concat(t(r,o)))}),Object.entries(e.children).forEach(([o,r])=>{o!==j&&(n=n.concat(t(r,o)))}),n}var So=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:()=>new Ht,providedIn:"root"})}return e})(),Ht=class{parse(t){let n=new Sf(t);return new $n(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())}serialize(t){let n=`/${La(t.root,!0)}`,o=vw(t.queryParams),r=typeof t.fragment=="string"?`#${hw(t.fragment)}`:"";return`${n}${o}${r}`}},mw=new Ht;function Ec(e){return e.segments.map(t=>nb(t)).join("/")}function La(e,t){if(!e.hasChildren())return Ec(e);if(t){let n=e.children[j]?La(e.children[j],!1):"",o=[];return Object.entries(e.children).forEach(([r,a])=>{r!==j&&o.push(`${r}:${La(a,!1)}`)}),o.length>0?`${n}(${o.join("//")})`:n}else{let n=fw(e,(o,r)=>r===j?[La(e.children[j],!1)]:[`${r}:${La(o,!1)}`]);return Object.keys(e.children).length===1&&e.children[j]!=null?`${Ec(e)}/${n[0]}`:`${Ec(e)}/(${n.join("//")})`}}function eb(e){return encodeURIComponent(e).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function vc(e){return eb(e).replace(/%3B/gi,";")}function hw(e){return encodeURI(e)}function wf(e){return eb(e).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Cc(e){return decodeURIComponent(e)}function By(e){return Cc(e.replace(/\+/g,"%20"))}function nb(e){return`${wf(e.path)}${gw(e.parameters)}`}function gw(e){return Object.entries(e).map(([t,n])=>`;${wf(t)}=${wf(n)}`).join("")}function vw(e){let t=Object.entries(e).map(([n,o])=>Array.isArray(o)?o.map(r=>`${vc(n)}=${vc(r)}`).join("&"):`${vc(n)}=${vc(o)}`).filter(n=>n);return t.length?`?${t.join("&")}`:""}var yw=/^[^\/()?;#]+/;function Ef(e){let t=e.match(yw);return t?t[0]:""}var bw=/^[^\/()?;=#]+/;function Ew(e){let t=e.match(bw);return t?t[0]:""}var Cw=/^[^=?&#]+/;function Dw(e){let t=e.match(Cw);return t?t[0]:""}var _w=/^[^&#]+/;function Iw(e){let t=e.match(_w);return t?t[0]:""}var Sf=class{url;remaining;constructor(t){this.url=t,this.remaining=t}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new W([],{}):new W([],this.parseChildren())}parseQueryParams(){let t={};if(this.consumeOptional("?"))do this.parseQueryParam(t);while(this.consumeOptional("&"));return t}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(){if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let n={};this.peekStartsWith("/(")&&(this.capture("/"),n=this.parseParens(!0));let o={};return this.peekStartsWith("(")&&(o=this.parseParens(!1)),(t.length>0||Object.keys(n).length>0)&&(o[j]=new W(t,n)),o}parseSegment(){let t=Ef(this.remaining);if(t===""&&this.peekStartsWith(";"))throw new E(4009,!1);return this.capture(t),new Ut(Cc(t),this.parseMatrixParams())}parseMatrixParams(){let t={};for(;this.consumeOptional(";");)this.parseParam(t);return t}parseParam(t){let n=Ew(this.remaining);if(!n)return;this.capture(n);let o="";if(this.consumeOptional("=")){let r=Ef(this.remaining);r&&(o=r,this.capture(o))}t[Cc(n)]=Cc(o)}parseQueryParam(t){let n=Dw(this.remaining);if(!n)return;this.capture(n);let o="";if(this.consumeOptional("=")){let i=Iw(this.remaining);i&&(o=i,this.capture(o))}let r=By(n),a=By(o);if(t.hasOwnProperty(r)){let i=t[r];Array.isArray(i)||(i=[i],t[r]=i),i.push(a)}else t[r]=a}parseParens(t){let n={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let o=Ef(this.remaining),r=this.remaining[o.length];if(r!=="/"&&r!==")"&&r!==";")throw new E(4010,!1);let a;o.indexOf(":")>-1?(a=o.slice(0,o.indexOf(":")),this.capture(a),this.capture(":")):t&&(a=j);let i=this.parseChildren();n[a]=Object.keys(i).length===1?i[j]:new W([],i),this.consumeOptional("//")}return n}peekStartsWith(t){return this.remaining.startsWith(t)}consumeOptional(t){return this.peekStartsWith(t)?(this.remaining=this.remaining.substring(t.length),!0):!1}capture(t){if(!this.consumeOptional(t))throw new E(4011,!1)}};function tb(e){return e.segments.length>0?new W([],{[j]:e}):e}function ob(e){let t={};for(let[o,r]of Object.entries(e.children)){let a=ob(r);if(o===j&&a.segments.length===0&&a.hasChildren())for(let[i,s]of Object.entries(a.children))t[i]=s;else(a.segments.length>0||a.hasChildren())&&(t[o]=a)}let n=new W(e.segments,t);return Tw(n)}function Tw(e){if(e.numberOfChildren===1&&e.children[j]){let t=e.children[j];return new W(e.segments.concat(t.segments),t.children)}return e}function $t(e){return e instanceof $n}function rb(e,t,n=null,o=null){let r=ab(e);return ib(r,t,n,o)}function ab(e){let t;function n(a){let i={};for(let c of a.children){let l=n(c);i[c.outlet]=l}let s=new W(a.url,i);return a===e&&(t=s),s}let o=n(e.root),r=tb(o);return t??r}function ib(e,t,n,o){let r=e;for(;r.parent;)r=r.parent;if(t.length===0)return Cf(r,r,r,n,o);let a=ww(t);if(a.toRoot())return Cf(r,r,new W([],{}),n,o);let i=Sw(a,r,e),s=i.processChildren?za(i.segmentGroup,i.index,a.commands):cb(i.segmentGroup,i.index,a.commands);return Cf(r,i.segmentGroup,s,n,o)}function Dc(e){return typeof e=="object"&&e!=null&&!e.outlets&&!e.segmentPath}function Ba(e){return typeof e=="object"&&e!=null&&e.outlets}function Cf(e,t,n,o,r){let a={};o&&Object.entries(o).forEach(([c,l])=>{a[c]=Array.isArray(l)?l.map(u=>`${u}`):`${l}`});let i;e===t?i=n:i=sb(e,t,n);let s=tb(ob(i));return new $n(s,a,r)}function sb(e,t,n){let o={};return Object.entries(e.children).forEach(([r,a])=>{a===t?o[r]=n:o[r]=sb(a,t,n)}),new W(e.segments,o)}var _c=class{isAbsolute;numberOfDoubleDots;commands;constructor(t,n,o){if(this.isAbsolute=t,this.numberOfDoubleDots=n,this.commands=o,t&&o.length>0&&Dc(o[0]))throw new E(4003,!1);let r=o.find(Ba);if(r&&r!==Qy(o))throw new E(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function ww(e){if(typeof e[0]=="string"&&e.length===1&&e[0]==="/")return new _c(!0,0,e);let t=0,n=!1,o=e.reduce((r,a,i)=>{if(typeof a=="object"&&a!=null){if(a.outlets){let s={};return Object.entries(a.outlets).forEach(([c,l])=>{s[c]=typeof l=="string"?l.split("/"):l}),[...r,{outlets:s}]}if(a.segmentPath)return[...r,a.segmentPath]}return typeof a!="string"?[...r,a]:i===0?(a.split("/").forEach((s,c)=>{c==0&&s==="."||(c==0&&s===""?n=!0:s===".."?t++:s!=""&&r.push(s))}),r):[...r,a]},[]);return new _c(n,t,o)}var Ir=class{segmentGroup;processChildren;index;constructor(t,n,o){this.segmentGroup=t,this.processChildren=n,this.index=o}};function Sw(e,t,n){if(e.isAbsolute)return new Ir(t,!0,0);if(!n)return new Ir(t,!1,NaN);if(n.parent===null)return new Ir(n,!0,0);let o=Dc(e.commands[0])?0:1,r=n.segments.length-1+o;return Mw(n,r,e.numberOfDoubleDots)}function Mw(e,t,n){let o=e,r=t,a=n;for(;a>r;){if(a-=r,o=o.parent,!o)throw new E(4005,!1);r=o.segments.length}return new Ir(o,!1,r-a)}function Aw(e){return Ba(e[0])?e[0].outlets:{[j]:e}}function cb(e,t,n){if(e??=new W([],{}),e.segments.length===0&&e.hasChildren())return za(e,t,n);let o=xw(e,t,n),r=n.slice(o.commandIndex);if(o.match&&o.pathIndex<e.segments.length){let a=new W(e.segments.slice(0,o.pathIndex),{});return a.children[j]=new W(e.segments.slice(o.pathIndex),e.children),za(a,0,r)}else return o.match&&r.length===0?new W(e.segments,{}):o.match&&!e.hasChildren()?Mf(e,t,n):o.match?za(e,0,r):Mf(e,t,n)}function za(e,t,n){if(n.length===0)return new W(e.segments,{});{let o=Aw(n),r={};if(Object.keys(o).some(a=>a!==j)&&e.children[j]&&e.numberOfChildren===1&&e.children[j].segments.length===0){let a=za(e.children[j],t,n);return new W(e.segments,a.children)}return Object.entries(o).forEach(([a,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(r[a]=cb(e.children[a],t,i))}),Object.entries(e.children).forEach(([a,i])=>{o[a]===void 0&&(r[a]=i)}),new W(e.segments,r)}}function xw(e,t,n){let o=0,r=t,a={match:!1,pathIndex:0,commandIndex:0};for(;r<e.segments.length;){if(o>=n.length)return a;let i=e.segments[r],s=n[o];if(Ba(s))break;let c=`${s}`,l=o<n.length-1?n[o+1]:null;if(r>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!Uy(c,l,i))return a;o+=2}else{if(!Uy(c,{},i))return a;o++}r++}return{match:!0,pathIndex:r,commandIndex:o}}function Mf(e,t,n){let o=e.segments.slice(0,t),r=0;for(;r<n.length;){let a=n[r];if(Ba(a)){let c=Rw(a.outlets);return new W(o,c)}if(r===0&&Dc(n[0])){let c=e.segments[t];o.push(new Ut(c.path,Vy(n[0]))),r++;continue}let i=Ba(a)?a.outlets[j]:`${a}`,s=r<n.length-1?n[r+1]:null;i&&s&&Dc(s)?(o.push(new Ut(i,Vy(s))),r+=2):(o.push(new Ut(i,{})),r++)}return new W(o,{})}function Rw(e){let t={};return Object.entries(e).forEach(([n,o])=>{typeof o=="string"&&(o=[o]),o!==null&&(t[n]=Mf(new W([],{}),0,o))}),t}function Vy(e){let t={};return Object.entries(e).forEach(([n,o])=>t[n]=`${o}`),t}function Uy(e,t,n){return e==n.path&&Un(t,n.parameters)}var Tr="imperative",ye=(function(e){return e[e.NavigationStart=0]="NavigationStart",e[e.NavigationEnd=1]="NavigationEnd",e[e.NavigationCancel=2]="NavigationCancel",e[e.NavigationError=3]="NavigationError",e[e.RoutesRecognized=4]="RoutesRecognized",e[e.ResolveStart=5]="ResolveStart",e[e.ResolveEnd=6]="ResolveEnd",e[e.GuardsCheckStart=7]="GuardsCheckStart",e[e.GuardsCheckEnd=8]="GuardsCheckEnd",e[e.RouteConfigLoadStart=9]="RouteConfigLoadStart",e[e.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",e[e.ChildActivationStart=11]="ChildActivationStart",e[e.ChildActivationEnd=12]="ChildActivationEnd",e[e.ActivationStart=13]="ActivationStart",e[e.ActivationEnd=14]="ActivationEnd",e[e.Scroll=15]="Scroll",e[e.NavigationSkipped=16]="NavigationSkipped",e})(ye||{}),Qe=class{id;url;constructor(t,n){this.id=t,this.url=n}},Gt=class extends Qe{type=ye.NavigationStart;navigationTrigger;restoredState;constructor(t,n,o="imperative",r=null){super(t,n),this.navigationTrigger=o,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},on=class extends Qe{urlAfterRedirects;type=ye.NavigationEnd;constructor(t,n,o){super(t,n),this.urlAfterRedirects=o}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},qe=(function(e){return e[e.Redirect=0]="Redirect",e[e.SupersededByNewNavigation=1]="SupersededByNewNavigation",e[e.NoDataFromResolver=2]="NoDataFromResolver",e[e.GuardRejected=3]="GuardRejected",e[e.Aborted=4]="Aborted",e})(qe||{}),Sr=(function(e){return e[e.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",e[e.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",e})(Sr||{}),Hn=class extends Qe{reason;code;type=ye.NavigationCancel;constructor(t,n,o,r){super(t,n),this.reason=o,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}},Gn=class extends Qe{reason;code;type=ye.NavigationSkipped;constructor(t,n,o,r){super(t,n),this.reason=o,this.code=r}},Mr=class extends Qe{error;target;type=ye.NavigationError;constructor(t,n,o,r){super(t,n),this.error=o,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Va=class extends Qe{urlAfterRedirects;state;type=ye.RoutesRecognized;constructor(t,n,o,r){super(t,n),this.urlAfterRedirects=o,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Ic=class extends Qe{urlAfterRedirects;state;type=ye.GuardsCheckStart;constructor(t,n,o,r){super(t,n),this.urlAfterRedirects=o,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Tc=class extends Qe{urlAfterRedirects;state;shouldActivate;type=ye.GuardsCheckEnd;constructor(t,n,o,r,a){super(t,n),this.urlAfterRedirects=o,this.state=r,this.shouldActivate=a}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},wc=class extends Qe{urlAfterRedirects;state;type=ye.ResolveStart;constructor(t,n,o,r){super(t,n),this.urlAfterRedirects=o,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Sc=class extends Qe{urlAfterRedirects;state;type=ye.ResolveEnd;constructor(t,n,o,r){super(t,n),this.urlAfterRedirects=o,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Mc=class{route;type=ye.RouteConfigLoadStart;constructor(t){this.route=t}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Ac=class{route;type=ye.RouteConfigLoadEnd;constructor(t){this.route=t}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},xc=class{snapshot;type=ye.ChildActivationStart;constructor(t){this.snapshot=t}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Rc=class{snapshot;type=ye.ChildActivationEnd;constructor(t){this.snapshot=t}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Nc=class{snapshot;type=ye.ActivationStart;constructor(t){this.snapshot=t}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Pc=class{snapshot;type=ye.ActivationEnd;constructor(t){this.snapshot=t}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Ar=class{routerEvent;position;anchor;type=ye.Scroll;constructor(t,n,o){this.routerEvent=t,this.position=n,this.anchor=o}toString(){let t=this.position?`${this.position[0]}, ${this.position[1]}`:null;return`Scroll(anchor: '${this.anchor}', position: '${t}')`}},Ua=class{},xr=class{url;navigationBehaviorOptions;constructor(t,n){this.url=t,this.navigationBehaviorOptions=n}};function Nw(e){return!(e instanceof Ua)&&!(e instanceof xr)}function Pw(e,t){return e.providers&&!e._injector&&(e._injector=mr(e.providers,t,`Route: ${e.path}`)),e._injector??t}function wn(e){return e.outlet||j}function jw(e,t){let n=e.filter(o=>wn(o)===t);return n.push(...e.filter(o=>wn(o)!==t)),n}function Pr(e){if(!e)return null;if(e.routeConfig?._injector)return e.routeConfig._injector;for(let t=e.parent;t;t=t.parent){let n=t.routeConfig;if(n?._loadedInjector)return n._loadedInjector;if(n?._injector)return n._injector}return null}var jc=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return Pr(this.route?.snapshot)??this.rootInjector}constructor(t){this.rootInjector=t,this.children=new Mo(this.rootInjector)}},Mo=(()=>{class e{rootInjector;contexts=new Map;constructor(n){this.rootInjector=n}onChildOutletCreated(n,o){let r=this.getOrCreateContext(n);r.outlet=o,this.contexts.set(n,r)}onChildOutletDestroyed(n){let o=this.getContext(n);o&&(o.outlet=null,o.attachRef=null)}onOutletDeactivated(){let n=this.contexts;return this.contexts=new Map,n}onOutletReAttached(n){this.contexts=n}getOrCreateContext(n){let o=this.getContext(n);return o||(o=new jc(this.rootInjector),this.contexts.set(n,o)),o}getContext(n){return this.contexts.get(n)||null}static \u0275fac=function(o){return new(o||e)(I(ae))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Oc=class{_root;constructor(t){this._root=t}get root(){return this._root.value}parent(t){let n=this.pathFromRoot(t);return n.length>1?n[n.length-2]:null}children(t){let n=Af(t,this._root);return n?n.children.map(o=>o.value):[]}firstChild(t){let n=Af(t,this._root);return n&&n.children.length>0?n.children[0].value:null}siblings(t){let n=xf(t,this._root);return n.length<2?[]:n[n.length-2].children.map(r=>r.value).filter(r=>r!==t)}pathFromRoot(t){return xf(t,this._root).map(n=>n.value)}};function Af(e,t){if(e===t.value)return t;for(let n of t.children){let o=Af(e,n);if(o)return o}return null}function xf(e,t){if(e===t.value)return[t];for(let n of t.children){let o=xf(e,n);if(o.length)return o.unshift(t),o}return[]}var Je=class{value;children;constructor(t,n){this.value=t,this.children=n}toString(){return`TreeNode(${this.value})`}};function _r(e){let t={};return e&&e.children.forEach(n=>t[n.value.outlet]=n),t}var Ha=class extends Oc{snapshot;constructor(t,n){super(t),this.snapshot=n,kf(this,t)}toString(){return this.snapshot.toString()}};function lb(e){let t=Ow(e),n=new ve([new Ut("",{})]),o=new ve({}),r=new ve({}),a=new ve({}),i=new ve(""),s=new rn(n,o,a,i,r,j,e,t.root);return s.snapshot=t.root,new Ha(new Je(s,[]),t)}function Ow(e){let t={},n={},o={},a=new To([],t,o,"",n,j,e,null,{});return new $a("",new Je(a,[]))}var rn=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(t,n,o,r,a,i,s,c){this.urlSubject=t,this.paramsSubject=n,this.queryParamsSubject=o,this.fragmentSubject=r,this.dataSubject=a,this.outlet=i,this.component=s,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(A(l=>l[Qa]))??w(void 0),this.url=t,this.params=n,this.queryParams=o,this.fragment=r,this.data=a}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(A(t=>wo(t))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(A(t=>wo(t))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function Fc(e,t,n="emptyOnly"){let o,{routeConfig:r}=e;return t!==null&&(n==="always"||r?.path===""||!t.component&&!t.routeConfig?.loadComponent)?o={params:y(y({},t.params),e.params),data:y(y({},t.data),e.data),resolve:y(y(y(y({},e.data),t.data),r?.data),e._resolvedData)}:o={params:y({},e.params),data:y({},e.data),resolve:y(y({},e.data),e._resolvedData??{})},r&&db(r)&&(o.resolve[Qa]=r.title),o}var To=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;get title(){return this.data?.[Qa]}constructor(t,n,o,r,a,i,s,c,l){this.url=t,this.params=n,this.queryParams=o,this.fragment=r,this.data=a,this.outlet=i,this.component=s,this.routeConfig=c,this._resolve=l}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=wo(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=wo(this.queryParams),this._queryParamMap}toString(){let t=this.url.map(o=>o.toString()).join("/"),n=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${t}', path:'${n}')`}},$a=class extends Oc{url;constructor(t,n){super(n),this.url=t,kf(this,n)}toString(){return ub(this._root)}};function kf(e,t){t.value._routerState=e,t.children.forEach(n=>kf(e,n))}function ub(e){let t=e.children.length>0?` { ${e.children.map(ub).join(", ")} } `:"";return`${e.value}${t}`}function Df(e){if(e.snapshot){let t=e.snapshot,n=e._futureSnapshot;e.snapshot=n,Un(t.queryParams,n.queryParams)||e.queryParamsSubject.next(n.queryParams),t.fragment!==n.fragment&&e.fragmentSubject.next(n.fragment),Un(t.params,n.params)||e.paramsSubject.next(n.params),cw(t.url,n.url)||e.urlSubject.next(n.url),Un(t.data,n.data)||e.dataSubject.next(n.data)}else e.snapshot=e._futureSnapshot,e.dataSubject.next(e._futureSnapshot.data)}function Rf(e,t){let n=Un(e.params,t.params)&&pw(e.url,t.url),o=!e.parent!=!t.parent;return n&&!o&&(!e.parent||Rf(e.parent,t.parent))}function db(e){return typeof e.title=="string"||e.title===null}var pb=new C(""),Za=(()=>{class e{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=j;activateEvents=new Y;deactivateEvents=new Y;attachEvents=new Y;detachEvents=new Y;routerOutletData=uy(void 0);parentContexts=p(Mo);location=p(Ge);changeDetector=p(ut);inputBinder=p(Ya,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(n){if(n.name){let{firstChange:o,previousValue:r}=n.name;if(o)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(n){return this.parentContexts.getContext(n)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let n=this.parentContexts.getContext(this.name);n?.route&&(n.attachRef?this.attach(n.attachRef,n.route):this.activateWith(n.route,n.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new E(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new E(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new E(4012,!1);this.location.detach();let n=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(n.instance),n}attach(n,o){this.activated=n,this._activatedRoute=o,this.location.insert(n.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(n.instance)}deactivate(){if(this.activated){let n=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(n)}}activateWith(n,o){if(this.isActivated)throw new E(4013,!1);this._activatedRoute=n;let r=this.location,i=n.snapshot.component,s=this.parentContexts.getOrCreateContext(this.name).children,c=new Nf(n,s,r.injector,this.routerOutletData);this.activated=r.createComponent(i,{index:r.length,injector:c,environmentInjector:o}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(o){return new(o||e)};static \u0275dir=fe({type:e,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[bn]})}return e})(),Nf=class{route;childContexts;parent;outletData;constructor(t,n,o,r){this.route=t,this.childContexts=n,this.parent=o,this.outletData=r}get(t,n){return t===rn?this.route:t===Mo?this.childContexts:t===pb?this.outletData:this.parent.get(t,n)}},Ya=new C(""),zf=(()=>{class e{outletDataSubscriptions=new Map;bindActivatedRouteToOutletComponent(n){this.unsubscribeFromRouteData(n),this.subscribeToRouteData(n)}unsubscribeFromRouteData(n){this.outletDataSubscriptions.get(n)?.unsubscribe(),this.outletDataSubscriptions.delete(n)}subscribeToRouteData(n){let{activatedRoute:o}=n,r=eo([o.queryParams,o.params,o.data]).pipe(Ae(([a,i,s],c)=>(s=y(y(y({},a),i),s),c===0?w(s):Promise.resolve(s)))).subscribe(a=>{if(!n.isActivated||!n.activatedComponentRef||n.activatedRoute!==o||o.component===null){this.unsubscribeFromRouteData(n);return}let i=fy(o.component);if(!i){this.unsubscribeFromRouteData(n);return}for(let{templateName:s}of i.inputs)n.activatedComponentRef.setInput(s,a[s])});this.outletDataSubscriptions.set(n,r)}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),qf=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275cmp=ue({type:e,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(o,r){o&1&&me(0,"router-outlet")},dependencies:[Za],encapsulation:2})}return e})();function Bf(e){let t=e.children&&e.children.map(Bf),n=t?$(y({},e),{children:t}):y({},e);return!n.component&&!n.loadComponent&&(t||n.loadChildren)&&n.outlet&&n.outlet!==j&&(n.component=qf),n}function Fw(e,t,n){let o=Ga(e,t._root,n?n._root:void 0);return new Ha(o,t)}function Ga(e,t,n){if(n&&e.shouldReuseRoute(t.value,n.value.snapshot)){let o=n.value;o._futureSnapshot=t.value;let r=Lw(e,t,n);return new Je(o,r)}else{if(e.shouldAttach(t.value)){let a=e.retrieve(t.value);if(a!==null){let i=a.route;return i.value._futureSnapshot=t.value,i.children=t.children.map(s=>Ga(e,s)),i}}let o=kw(t.value),r=t.children.map(a=>Ga(e,a));return new Je(o,r)}}function Lw(e,t,n){return t.children.map(o=>{for(let r of n.children)if(e.shouldReuseRoute(o.value,r.value.snapshot))return Ga(e,o,r);return Ga(e,o)})}function kw(e){return new rn(new ve(e.url),new ve(e.params),new ve(e.queryParams),new ve(e.fragment),new ve(e.data),e.outlet,e.component,e)}var Rr=class{redirectTo;navigationBehaviorOptions;constructor(t,n){this.redirectTo=t,this.navigationBehaviorOptions=n}},fb="ngNavigationCancelingError";function Lc(e,t){let{redirectTo:n,navigationBehaviorOptions:o}=$t(t)?{redirectTo:t,navigationBehaviorOptions:void 0}:t,r=mb(!1,qe.Redirect);return r.url=n,r.navigationBehaviorOptions=o,r}function mb(e,t){let n=new Error(`NavigationCancelingError: ${e||""}`);return n[fb]=!0,n.cancellationCode=t,n}function zw(e){return hb(e)&&$t(e.url)}function hb(e){return!!e&&e[fb]}var qw=(e,t,n,o)=>A(r=>(new Pf(t,r.targetRouterState,r.currentRouterState,n,o).activate(e),r)),Pf=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(t,n,o,r,a){this.routeReuseStrategy=t,this.futureState=n,this.currState=o,this.forwardEvent=r,this.inputBindingEnabled=a}activate(t){let n=this.futureState._root,o=this.currState?this.currState._root:null;this.deactivateChildRoutes(n,o,t),Df(this.futureState.root),this.activateChildRoutes(n,o,t)}deactivateChildRoutes(t,n,o){let r=_r(n);t.children.forEach(a=>{let i=a.value.outlet;this.deactivateRoutes(a,r[i],o),delete r[i]}),Object.values(r).forEach(a=>{this.deactivateRouteAndItsChildren(a,o)})}deactivateRoutes(t,n,o){let r=t.value,a=n?n.value:null;if(r===a)if(r.component){let i=o.getContext(r.outlet);i&&this.deactivateChildRoutes(t,n,i.children)}else this.deactivateChildRoutes(t,n,o);else a&&this.deactivateRouteAndItsChildren(n,o)}deactivateRouteAndItsChildren(t,n){t.value.component&&this.routeReuseStrategy.shouldDetach(t.value.snapshot)?this.detachAndStoreRouteSubtree(t,n):this.deactivateRouteAndOutlet(t,n)}detachAndStoreRouteSubtree(t,n){let o=n.getContext(t.value.outlet),r=o&&t.value.component?o.children:n,a=_r(t);for(let i of Object.values(a))this.deactivateRouteAndItsChildren(i,r);if(o&&o.outlet){let i=o.outlet.detach(),s=o.children.onOutletDeactivated();this.routeReuseStrategy.store(t.value.snapshot,{componentRef:i,route:t,contexts:s})}}deactivateRouteAndOutlet(t,n){let o=n.getContext(t.value.outlet),r=o&&t.value.component?o.children:n,a=_r(t);for(let i of Object.values(a))this.deactivateRouteAndItsChildren(i,r);o&&(o.outlet&&(o.outlet.deactivate(),o.children.onOutletDeactivated()),o.attachRef=null,o.route=null)}activateChildRoutes(t,n,o){let r=_r(n);t.children.forEach(a=>{this.activateRoutes(a,r[a.value.outlet],o),this.forwardEvent(new Pc(a.value.snapshot))}),t.children.length&&this.forwardEvent(new Rc(t.value.snapshot))}activateRoutes(t,n,o){let r=t.value,a=n?n.value:null;if(Df(r),r===a)if(r.component){let i=o.getOrCreateContext(r.outlet);this.activateChildRoutes(t,n,i.children)}else this.activateChildRoutes(t,n,o);else if(r.component){let i=o.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let s=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),i.children.onOutletReAttached(s.contexts),i.attachRef=s.componentRef,i.route=s.route.value,i.outlet&&i.outlet.attach(s.componentRef,s.route.value),Df(s.route.value),this.activateChildRoutes(t,null,i.children)}else i.attachRef=null,i.route=r,i.outlet&&i.outlet.activateWith(r,i.injector),this.activateChildRoutes(t,null,i.children)}else this.activateChildRoutes(t,null,o)}},kc=class{path;route;constructor(t){this.path=t,this.route=this.path[this.path.length-1]}},wr=class{component;route;constructor(t,n){this.component=t,this.route=n}};function Bw(e,t,n){let o=e._root,r=t?t._root:null;return ka(o,r,n,[o.value])}function Vw(e){let t=e.routeConfig?e.routeConfig.canActivateChild:null;return!t||t.length===0?null:{node:e,guards:t}}function jr(e,t){let n=Symbol(),o=t.get(e,n);return o===n?typeof e=="function"&&!Yl(e)?e:t.get(e):o}function ka(e,t,n,o,r={canDeactivateChecks:[],canActivateChecks:[]}){let a=_r(t);return e.children.forEach(i=>{Uw(i,a[i.value.outlet],n,o.concat([i.value]),r),delete a[i.value.outlet]}),Object.entries(a).forEach(([i,s])=>qa(s,n.getContext(i),r)),r}function Uw(e,t,n,o,r={canDeactivateChecks:[],canActivateChecks:[]}){let a=e.value,i=t?t.value:null,s=n?n.getContext(e.value.outlet):null;if(i&&a.routeConfig===i.routeConfig){let c=Hw(i,a,a.routeConfig.runGuardsAndResolvers);c?r.canActivateChecks.push(new kc(o)):(a.data=i.data,a._resolvedData=i._resolvedData),a.component?ka(e,t,s?s.children:null,o,r):ka(e,t,n,o,r),c&&s&&s.outlet&&s.outlet.isActivated&&r.canDeactivateChecks.push(new wr(s.outlet.component,i))}else i&&qa(t,s,r),r.canActivateChecks.push(new kc(o)),a.component?ka(e,null,s?s.children:null,o,r):ka(e,null,n,o,r);return r}function Hw(e,t,n){if(typeof n=="function")return n(e,t);switch(n){case"pathParamsChange":return!Io(e.url,t.url);case"pathParamsOrQueryParamsChange":return!Io(e.url,t.url)||!Un(e.queryParams,t.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Rf(e,t)||!Un(e.queryParams,t.queryParams);case"paramsChange":default:return!Rf(e,t)}}function qa(e,t,n){let o=_r(e),r=e.value;Object.entries(o).forEach(([a,i])=>{r.component?t?qa(i,t.children.getContext(a),n):qa(i,null,n):qa(i,t,n)}),r.component?t&&t.outlet&&t.outlet.isActivated?n.canDeactivateChecks.push(new wr(t.outlet.component,r)):n.canDeactivateChecks.push(new wr(null,r)):n.canDeactivateChecks.push(new wr(null,r))}function Ka(e){return typeof e=="function"}function $w(e){return typeof e=="boolean"}function Gw(e){return e&&Ka(e.canLoad)}function Ww(e){return e&&Ka(e.canActivate)}function Jw(e){return e&&Ka(e.canActivateChild)}function Qw(e){return e&&Ka(e.canDeactivate)}function Zw(e){return e&&Ka(e.canMatch)}function gb(e){return e instanceof Jn||e?.name==="EmptyError"}var yc=Symbol("INITIAL_VALUE");function Nr(){return Ae(e=>eo(e.map(t=>t.pipe(je(1),Ct(yc)))).pipe(A(t=>{for(let n of t)if(n!==!0){if(n===yc)return yc;if(n===!1||Yw(n))return n}return!0}),ne(t=>t!==yc),je(1)))}function Yw(e){return $t(e)||e instanceof Rr}function Kw(e,t){return de(n=>{let{targetSnapshot:o,currentSnapshot:r,guards:{canActivateChecks:a,canDeactivateChecks:i}}=n;return i.length===0&&a.length===0?w($(y({},n),{guardsResult:!0})):Xw(i,o,r,e).pipe(de(s=>s&&$w(s)?eS(o,a,e,t):w(s)),A(s=>$(y({},n),{guardsResult:s})))})}function Xw(e,t,n,o){return te(e).pipe(de(r=>aS(r.component,r.route,n,t,o)),Qn(r=>r!==!0,!0))}function eS(e,t,n,o){return te(t).pipe(xn(r=>yt(tS(r.route.parent,o),nS(r.route,o),rS(e,r.path,n),oS(e,r.route,n))),Qn(r=>r!==!0,!0))}function nS(e,t){return e!==null&&t&&t(new Nc(e)),w(!0)}function tS(e,t){return e!==null&&t&&t(new xc(e)),w(!0)}function oS(e,t,n){let o=t.routeConfig?t.routeConfig.canActivate:null;if(!o||o.length===0)return w(!0);let r=o.map(a=>Ur(()=>{let i=Pr(t)??n,s=jr(a,i),c=Ww(s)?s.canActivate(t,e):Ie(i,()=>s(t,e));return ft(c).pipe(Qn())}));return w(r).pipe(Nr())}function rS(e,t,n){let o=t[t.length-1],a=t.slice(0,t.length-1).reverse().map(i=>Vw(i)).filter(i=>i!==null).map(i=>Ur(()=>{let s=i.guards.map(c=>{let l=Pr(i.node)??n,u=jr(c,l),d=Jw(u)?u.canActivateChild(o,e):Ie(l,()=>u(o,e));return ft(d).pipe(Qn())});return w(s).pipe(Nr())}));return w(a).pipe(Nr())}function aS(e,t,n,o,r){let a=t&&t.routeConfig?t.routeConfig.canDeactivate:null;if(!a||a.length===0)return w(!0);let i=a.map(s=>{let c=Pr(t)??r,l=jr(s,c),u=Qw(l)?l.canDeactivate(e,t,n,o):Ie(c,()=>l(e,t,n,o));return ft(u).pipe(Qn())});return w(i).pipe(Nr())}function iS(e,t,n,o){let r=t.canLoad;if(r===void 0||r.length===0)return w(!0);let a=r.map(i=>{let s=jr(i,e),c=Gw(s)?s.canLoad(t,n):Ie(e,()=>s(t,n));return ft(c)});return w(a).pipe(Nr(),vb(o))}function vb(e){return Tl(oe(t=>{if(typeof t!="boolean")throw Lc(e,t)}),A(t=>t===!0))}function sS(e,t,n,o){let r=t.canMatch;if(!r||r.length===0)return w(!0);let a=r.map(i=>{let s=jr(i,e),c=Zw(s)?s.canMatch(t,n):Ie(e,()=>s(t,n));return ft(c)});return w(a).pipe(Nr(),vb(o))}var Wa=class{segmentGroup;constructor(t){this.segmentGroup=t||null}},Ja=class extends Error{urlTree;constructor(t){super(),this.urlTree=t}};function Dr(e){return gt(new Wa(e))}function cS(e){return gt(new E(4e3,!1))}function lS(e){return gt(mb(!1,qe.GuardRejected))}var jf=class{urlSerializer;urlTree;constructor(t,n){this.urlSerializer=t,this.urlTree=n}lineralizeSegments(t,n){let o=[],r=n.root;for(;;){if(o=o.concat(r.segments),r.numberOfChildren===0)return w(o);if(r.numberOfChildren>1||!r.children[j])return cS(`${t.redirectTo}`);r=r.children[j]}}applyRedirectCommands(t,n,o,r,a){return uS(n,r,a).pipe(A(i=>{if(i instanceof $n)throw new Ja(i);let s=this.applyRedirectCreateUrlTree(i,this.urlSerializer.parse(i),t,o);if(i[0]==="/")throw new Ja(s);return s}))}applyRedirectCreateUrlTree(t,n,o,r){let a=this.createSegmentGroup(t,n.root,o,r);return new $n(a,this.createQueryParams(n.queryParams,this.urlTree.queryParams),n.fragment)}createQueryParams(t,n){let o={};return Object.entries(t).forEach(([r,a])=>{if(typeof a=="string"&&a[0]===":"){let s=a.substring(1);o[r]=n[s]}else o[r]=a}),o}createSegmentGroup(t,n,o,r){let a=this.createSegments(t,n.segments,o,r),i={};return Object.entries(n.children).forEach(([s,c])=>{i[s]=this.createSegmentGroup(t,c,o,r)}),new W(a,i)}createSegments(t,n,o,r){return n.map(a=>a.path[0]===":"?this.findPosParam(t,a,r):this.findOrReturn(a,o))}findPosParam(t,n,o){let r=o[n.path.substring(1)];if(!r)throw new E(4001,!1);return r}findOrReturn(t,n){let o=0;for(let r of n){if(r.path===t.path)return n.splice(o),r;o++}return t}};function uS(e,t,n){if(typeof e=="string")return w(e);let o=e,{queryParams:r,fragment:a,routeConfig:i,url:s,outlet:c,params:l,data:u,title:d}=t;return ft(Ie(n,()=>o({params:l,data:u,queryParams:r,fragment:a,routeConfig:i,url:s,outlet:c,title:d})))}var Of={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function dS(e,t,n,o,r){let a=yb(e,t,n);return a.matched?(o=Pw(t,o),sS(o,t,n,r).pipe(A(i=>i===!0?a:y({},Of)))):w(a)}function yb(e,t,n){if(t.path==="**")return pS(n);if(t.path==="")return t.pathMatch==="full"&&(e.hasChildren()||n.length>0)?y({},Of):{matched:!0,consumedSegments:[],remainingSegments:n,parameters:{},positionalParamSegments:{}};let r=(t.matcher||Wy)(n,e,t);if(!r)return y({},Of);let a={};Object.entries(r.posParams??{}).forEach(([s,c])=>{a[s]=c.path});let i=r.consumed.length>0?y(y({},a),r.consumed[r.consumed.length-1].parameters):a;return{matched:!0,consumedSegments:r.consumed,remainingSegments:n.slice(r.consumed.length),parameters:i,positionalParamSegments:r.posParams??{}}}function pS(e){return{matched:!0,parameters:e.length>0?Qy(e).parameters:{},consumedSegments:e,remainingSegments:[],positionalParamSegments:{}}}function Hy(e,t,n,o){return n.length>0&&hS(e,n,o)?{segmentGroup:new W(t,mS(o,new W(n,e.children))),slicedSegments:[]}:n.length===0&&gS(e,n,o)?{segmentGroup:new W(e.segments,fS(e,n,o,e.children)),slicedSegments:n}:{segmentGroup:new W(e.segments,e.children),slicedSegments:n}}function fS(e,t,n,o){let r={};for(let a of n)if(qc(e,t,a)&&!o[wn(a)]){let i=new W([],{});r[wn(a)]=i}return y(y({},o),r)}function mS(e,t){let n={};n[j]=t;for(let o of e)if(o.path===""&&wn(o)!==j){let r=new W([],{});n[wn(o)]=r}return n}function hS(e,t,n){return n.some(o=>qc(e,t,o)&&wn(o)!==j)}function gS(e,t,n){return n.some(o=>qc(e,t,o))}function qc(e,t,n){return(e.hasChildren()||t.length>0)&&n.pathMatch==="full"?!1:n.path===""}function vS(e,t,n){return t.length===0&&!e.children[n]}var Ff=class{};function yS(e,t,n,o,r,a,i="emptyOnly"){return new Lf(e,t,n,o,r,i,a).recognize()}var bS=31,Lf=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(t,n,o,r,a,i,s){this.injector=t,this.configLoader=n,this.rootComponentType=o,this.config=r,this.urlTree=a,this.paramsInheritanceStrategy=i,this.urlSerializer=s,this.applyRedirects=new jf(this.urlSerializer,this.urlTree)}noMatchError(t){return new E(4002,`'${t.segmentGroup}'`)}recognize(){let t=Hy(this.urlTree.root,[],[],this.config).segmentGroup;return this.match(t).pipe(A(({children:n,rootSnapshot:o})=>{let r=new Je(o,n),a=new $a("",r),i=rb(o,[],this.urlTree.queryParams,this.urlTree.fragment);return i.queryParams=this.urlTree.queryParams,a.url=this.urlSerializer.serialize(i),{state:a,tree:i}}))}match(t){let n=new To([],Object.freeze({}),Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),j,this.rootComponentType,null,{});return this.processSegmentGroup(this.injector,this.config,t,j,n).pipe(A(o=>({children:o,rootSnapshot:n})),cn(o=>{if(o instanceof Ja)return this.urlTree=o.urlTree,this.match(o.urlTree.root);throw o instanceof Wa?this.noMatchError(o):o}))}processSegmentGroup(t,n,o,r,a){return o.segments.length===0&&o.hasChildren()?this.processChildren(t,n,o,a):this.processSegment(t,n,o,o.segments,r,!0,a).pipe(A(i=>i instanceof Je?[i]:[]))}processChildren(t,n,o,r){let a=[];for(let i of Object.keys(o.children))i==="primary"?a.unshift(i):a.push(i);return te(a).pipe(xn(i=>{let s=o.children[i],c=jw(n,i);return this.processSegmentGroup(t,c,s,i,r)}),Fl((i,s)=>(i.push(...s),i)),bt(null),Ol(),de(i=>{if(i===null)return Dr(o);let s=bb(i);return ES(s),w(s)}))}processSegment(t,n,o,r,a,i,s){return te(n).pipe(xn(c=>this.processSegmentAgainstRoute(c._injector??t,n,c,o,r,a,i,s).pipe(cn(l=>{if(l instanceof Wa)return w(null);throw l}))),Qn(c=>!!c),cn(c=>{if(gb(c))return vS(o,r,a)?w(new Ff):Dr(o);throw c}))}processSegmentAgainstRoute(t,n,o,r,a,i,s,c){return wn(o)!==i&&(i===j||!qc(r,a,o))?Dr(r):o.redirectTo===void 0?this.matchSegmentAgainstRoute(t,r,o,a,i,c):this.allowRedirects&&s?this.expandSegmentAgainstRouteUsingRedirect(t,r,n,o,a,i,c):Dr(r)}expandSegmentAgainstRouteUsingRedirect(t,n,o,r,a,i,s){let{matched:c,parameters:l,consumedSegments:u,positionalParamSegments:d,remainingSegments:m}=yb(n,r,a);if(!c)return Dr(n);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>bS&&(this.allowRedirects=!1));let f=new To(a,l,Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,$y(r),wn(r),r.component??r._loadedComponent??null,r,Gy(r)),g=Fc(f,s,this.paramsInheritanceStrategy);return f.params=Object.freeze(g.params),f.data=Object.freeze(g.data),this.applyRedirects.applyRedirectCommands(u,r.redirectTo,d,f,t).pipe(Ae(q=>this.applyRedirects.lineralizeSegments(r,q)),de(q=>this.processSegment(t,o,n,q.concat(m),i,!1,s)))}matchSegmentAgainstRoute(t,n,o,r,a,i){let s=dS(n,o,r,t,this.urlSerializer);return o.path==="**"&&(n.children={}),s.pipe(Ae(c=>c.matched?(t=o._injector??t,this.getChildConfig(t,o,r).pipe(Ae(({routes:l})=>{let u=o._loadedInjector??t,{parameters:d,consumedSegments:m,remainingSegments:f}=c,g=new To(m,d,Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,$y(o),wn(o),o.component??o._loadedComponent??null,o,Gy(o)),T=Fc(g,i,this.paramsInheritanceStrategy);g.params=Object.freeze(T.params),g.data=Object.freeze(T.data);let{segmentGroup:q,slicedSegments:P}=Hy(n,m,f,l);if(P.length===0&&q.hasChildren())return this.processChildren(u,l,q,g).pipe(A(ht=>new Je(g,ht)));if(l.length===0&&P.length===0)return w(new Je(g,[]));let Sn=wn(o)===a;return this.processSegment(u,l,q,P,Sn?j:a,!0,g).pipe(A(ht=>new Je(g,ht instanceof Je?[ht]:[])))}))):Dr(n)))}getChildConfig(t,n,o){return n.children?w({routes:n.children,injector:t}):n.loadChildren?n._loadedRoutes!==void 0?w({routes:n._loadedRoutes,injector:n._loadedInjector}):iS(t,n,o,this.urlSerializer).pipe(de(r=>r?this.configLoader.loadChildren(t,n).pipe(oe(a=>{n._loadedRoutes=a.routes,n._loadedInjector=a.injector})):lS(n))):w({routes:[],injector:t})}};function ES(e){e.sort((t,n)=>t.value.outlet===j?-1:n.value.outlet===j?1:t.value.outlet.localeCompare(n.value.outlet))}function CS(e){let t=e.value.routeConfig;return t&&t.path===""}function bb(e){let t=[],n=new Set;for(let o of e){if(!CS(o)){t.push(o);continue}let r=t.find(a=>o.value.routeConfig===a.value.routeConfig);r!==void 0?(r.children.push(...o.children),n.add(r)):t.push(o)}for(let o of n){let r=bb(o.children);t.push(new Je(o.value,r))}return t.filter(o=>!n.has(o))}function $y(e){return e.data||{}}function Gy(e){return e.resolve||{}}function DS(e,t,n,o,r,a){return de(i=>yS(e,t,n,o,i.extractedUrl,r,a).pipe(A(({state:s,tree:c})=>$(y({},i),{targetSnapshot:s,urlAfterRedirects:c}))))}function _S(e,t){return de(n=>{let{targetSnapshot:o,guards:{canActivateChecks:r}}=n;if(!r.length)return w(n);let a=new Set(r.map(c=>c.route)),i=new Set;for(let c of a)if(!i.has(c))for(let l of Eb(c))i.add(l);let s=0;return te(i).pipe(xn(c=>a.has(c)?IS(c,o,e,t):(c.data=Fc(c,c.parent,e).resolve,w(void 0))),oe(()=>s++),Wo(1),de(c=>s===i.size?w(n):be))})}function Eb(e){let t=e.children.map(n=>Eb(n)).flat();return[e,...t]}function IS(e,t,n,o){let r=e.routeConfig,a=e._resolve;return r?.title!==void 0&&!db(r)&&(a[Qa]=r.title),Ur(()=>(e.data=Fc(e,e.parent,n).resolve,TS(a,e,t,o).pipe(A(i=>(e._resolvedData=i,e.data=y(y({},e.data),i),null)))))}function TS(e,t,n,o){let r=Tf(e);if(r.length===0)return w({});let a={};return te(r).pipe(de(i=>wS(e[i],t,n,o).pipe(Qn(),oe(s=>{if(s instanceof Rr)throw Lc(new Ht,s);a[i]=s}))),Wo(1),A(()=>a),cn(i=>gb(i)?be:gt(i)))}function wS(e,t,n,o){let r=Pr(t)??o,a=jr(e,r),i=a.resolve?a.resolve(t,n):Ie(r,()=>a(t,n));return ft(i)}function _f(e){return Ae(t=>{let n=e(t);return n?te(n).pipe(A(()=>t)):w(t)})}var Vf=(()=>{class e{buildTitle(n){let o,r=n.root;for(;r!==void 0;)o=this.getResolvedTitleForRoute(r)??o,r=r.children.find(a=>a.outlet===j);return o}getResolvedTitleForRoute(n){return n.data[Qa]}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:()=>p(Cb),providedIn:"root"})}return e})(),Cb=(()=>{class e extends Vf{title;constructor(n){super(),this.title=n}updateTitle(n){let o=this.buildTitle(n);o!==void 0&&this.title.setTitle(o)}static \u0275fac=function(o){return new(o||e)(I(Ly))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Wt=new C("",{providedIn:"root",factory:()=>({})}),Ao=new C(""),Bc=(()=>{class e{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=p(Pp);loadComponent(n,o){if(this.componentLoaders.get(o))return this.componentLoaders.get(o);if(o._loadedComponent)return w(o._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(o);let r=ft(Ie(n,()=>o.loadComponent())).pipe(A(_b),Ae(Ib),oe(i=>{this.onLoadEndListener&&this.onLoadEndListener(o),o._loadedComponent=i}),Et(()=>{this.componentLoaders.delete(o)})),a=new $o(r,()=>new B).pipe(Ho());return this.componentLoaders.set(o,a),a}loadChildren(n,o){if(this.childrenLoaders.get(o))return this.childrenLoaders.get(o);if(o._loadedRoutes)return w({routes:o._loadedRoutes,injector:o._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(o);let a=Db(o,this.compiler,n,this.onLoadEndListener).pipe(Et(()=>{this.childrenLoaders.delete(o)})),i=new $o(a,()=>new B).pipe(Ho());return this.childrenLoaders.set(o,i),i}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Db(e,t,n,o){return ft(Ie(n,()=>e.loadChildren())).pipe(A(_b),Ae(Ib),de(r=>r instanceof Ws||Array.isArray(r)?w(r):te(t.compileModuleAsync(r))),A(r=>{o&&o(e);let a,i,s=!1;return Array.isArray(r)?(i=r,s=!0):(a=r.create(n).injector,i=a.get(Ao,[],{optional:!0,self:!0}).flat()),{routes:i.map(Bf),injector:a}}))}function SS(e){return e&&typeof e=="object"&&"default"in e}function _b(e){return SS(e)?e.default:e}function Ib(e){return w(e)}var Vc=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:()=>p(MS),providedIn:"root"})}return e})(),MS=(()=>{class e{shouldProcessUrl(n){return!0}extract(n){return n}merge(n,o){return n}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Uf=new C(""),Hf=new C("");function Tb(e,t,n){let o=e.get(Hf),r=e.get(U);if(!r.startViewTransition||o.skipNextTransition)return o.skipNextTransition=!1,new Promise(l=>setTimeout(l));let a,i=new Promise(l=>{a=l}),s=r.startViewTransition(()=>(a(),AS(e)));s.ready.catch(l=>{});let{onViewTransitionCreated:c}=o;return c&&Ie(e,()=>c({transition:s,from:t,to:n})),i}function AS(e){return new Promise(t=>{Zs({read:()=>setTimeout(t)},{injector:e})})}var $f=new C(""),Uc=(()=>{class e{currentNavigation=Xe(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=null;events=new B;transitionAbortWithErrorSubject=new B;configLoader=p(Bc);environmentInjector=p(ae);destroyRef=p(mn);urlSerializer=p(So);rootContexts=p(Mo);location=p(Bt);inputBindingEnabled=p(Ya,{optional:!0})!==null;titleStrategy=p(Vf);options=p(Wt,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=p(Vc);createViewTransition=p(Uf,{optional:!0});navigationErrorHandler=p($f,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>w(void 0);rootComponentType=null;destroyed=!1;constructor(){let n=r=>this.events.next(new Mc(r)),o=r=>this.events.next(new Ac(r));this.configLoader.onLoadEndListener=o,this.configLoader.onLoadStartListener=n,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(n){let o=++this.navigationId;Bn(()=>{this.transitions?.next($(y({},n),{extractedUrl:this.urlHandlingStrategy.extract(n.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,abortController:new AbortController,id:o}))})}setupNavigations(n){return this.transitions=new ve(null),this.transitions.pipe(ne(o=>o!==null),Ae(o=>{let r=!1;return w(o).pipe(Ae(a=>{if(this.navigationId>o.id)return this.cancelNavigationTransition(o,"",qe.SupersededByNewNavigation),be;this.currentTransition=o,this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:this.lastSuccessfulNavigation?$(y({},this.lastSuccessfulNavigation),{previousNavigation:null}):null,abort:()=>a.abortController.abort()});let i=!n.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),s=a.extras.onSameUrlNavigation??n.onSameUrlNavigation;if(!i&&s!=="reload")return this.events.next(new Gn(a.id,this.urlSerializer.serialize(a.rawUrl),"",Sr.IgnoredSameUrlNavigation)),a.resolve(!1),be;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return w(a).pipe(Ae(c=>(this.events.next(new Gt(c.id,this.urlSerializer.serialize(c.extractedUrl),c.source,c.restoredState)),c.id!==this.navigationId?be:Promise.resolve(c))),DS(this.environmentInjector,this.configLoader,this.rootComponentType,n.config,this.urlSerializer,this.paramsInheritanceStrategy),oe(c=>{o.targetSnapshot=c.targetSnapshot,o.urlAfterRedirects=c.urlAfterRedirects,this.currentNavigation.update(u=>(u.finalUrl=c.urlAfterRedirects,u));let l=new Va(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(l)}));if(i&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:c,extractedUrl:l,source:u,restoredState:d,extras:m}=a,f=new Gt(c,this.urlSerializer.serialize(l),u,d);this.events.next(f);let g=lb(this.rootComponentType).snapshot;return this.currentTransition=o=$(y({},a),{targetSnapshot:g,urlAfterRedirects:l,extras:$(y({},m),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(T=>(T.finalUrl=l,T)),w(o)}else return this.events.next(new Gn(a.id,this.urlSerializer.serialize(a.extractedUrl),"",Sr.IgnoredByUrlHandlingStrategy)),a.resolve(!1),be}),oe(a=>{let i=new Ic(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(i)}),A(a=>(this.currentTransition=o=$(y({},a),{guards:Bw(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),o)),Kw(this.environmentInjector,a=>this.events.next(a)),oe(a=>{if(o.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw Lc(this.urlSerializer,a.guardsResult);let i=new Tc(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);this.events.next(i)}),ne(a=>a.guardsResult?!0:(this.cancelNavigationTransition(a,"",qe.GuardRejected),!1)),_f(a=>{if(a.guards.canActivateChecks.length!==0)return w(a).pipe(oe(i=>{let s=new wc(i.id,this.urlSerializer.serialize(i.extractedUrl),this.urlSerializer.serialize(i.urlAfterRedirects),i.targetSnapshot);this.events.next(s)}),Ae(i=>{let s=!1;return w(i).pipe(_S(this.paramsInheritanceStrategy,this.environmentInjector),oe({next:()=>s=!0,complete:()=>{s||this.cancelNavigationTransition(i,"",qe.NoDataFromResolver)}}))}),oe(i=>{let s=new Sc(i.id,this.urlSerializer.serialize(i.extractedUrl),this.urlSerializer.serialize(i.urlAfterRedirects),i.targetSnapshot);this.events.next(s)}))}),_f(a=>{let i=s=>{let c=[];if(s.routeConfig?.loadComponent){let l=Pr(s)??this.environmentInjector;c.push(this.configLoader.loadComponent(l,s.routeConfig).pipe(oe(u=>{s.component=u}),A(()=>{})))}for(let l of s.children)c.push(...i(l));return c};return eo(i(a.targetSnapshot.root)).pipe(bt(null),je(1))}),_f(()=>this.afterPreactivation()),Ae(()=>{let{currentSnapshot:a,targetSnapshot:i}=o,s=this.createViewTransition?.(this.environmentInjector,a.root,i.root);return s?te(s).pipe(A(()=>o)):w(o)}),A(a=>{let i=Fw(n.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);return this.currentTransition=o=$(y({},a),{targetRouterState:i}),this.currentNavigation.update(s=>(s.targetRouterState=i,s)),o}),oe(()=>{this.events.next(new Ua)}),qw(this.rootContexts,n.routeReuseStrategy,a=>this.events.next(a),this.inputBindingEnabled),je(1),Dt(new z(a=>{let i=o.abortController.signal,s=()=>a.next();return i.addEventListener("abort",s),()=>i.removeEventListener("abort",s)}).pipe(ne(()=>!r&&!o.targetRouterState),oe(()=>{this.cancelNavigationTransition(o,o.abortController.signal.reason+"",qe.Aborted)}))),oe({next:a=>{r=!0,this.lastSuccessfulNavigation=Bn(this.currentNavigation),this.events.next(new on(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0)},complete:()=>{r=!0}}),Dt(this.transitionAbortWithErrorSubject.pipe(oe(a=>{throw a}))),Et(()=>{r||this.cancelNavigationTransition(o,"",qe.SupersededByNewNavigation),this.currentTransition?.id===o.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),cn(a=>{if(this.destroyed)return o.resolve(!1),be;if(r=!0,hb(a))this.events.next(new Hn(o.id,this.urlSerializer.serialize(o.extractedUrl),a.message,a.cancellationCode)),zw(a)?this.events.next(new xr(a.url,a.navigationBehaviorOptions)):o.resolve(!1);else{let i=new Mr(o.id,this.urlSerializer.serialize(o.extractedUrl),a,o.targetSnapshot??void 0);try{let s=Ie(this.environmentInjector,()=>this.navigationErrorHandler?.(i));if(s instanceof Rr){let{message:c,cancellationCode:l}=Lc(this.urlSerializer,s);this.events.next(new Hn(o.id,this.urlSerializer.serialize(o.extractedUrl),c,l)),this.events.next(new xr(s.redirectTo,s.navigationBehaviorOptions))}else throw this.events.next(i),a}catch(s){this.options.resolveNavigationPromiseOnError?o.resolve(!1):o.reject(s)}}return be}))}))}cancelNavigationTransition(n,o,r){let a=new Hn(n.id,this.urlSerializer.serialize(n.extractedUrl),o,r);this.events.next(a),n.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let n=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),o=Bn(this.currentNavigation),r=o?.targetBrowserUrl??o?.extractedUrl;return n.toString()!==r?.toString()&&!o?.extras.skipLocationChange}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function xS(e){return e!==Tr}var wb=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:()=>p(RS),providedIn:"root"})}return e})(),zc=class{shouldDetach(t){return!1}store(t,n){}shouldAttach(t){return!1}retrieve(t){return null}shouldReuseRoute(t,n){return t.routeConfig===n.routeConfig}},RS=(()=>{class e extends zc{static \u0275fac=(()=>{let n;return function(r){return(n||(n=yo(e)))(r||e)}})();static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Sb=(()=>{class e{urlSerializer=p(So);options=p(Wt,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=p(Bt);urlHandlingStrategy=p(Vc);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new $n;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:n,initialUrl:o,targetBrowserUrl:r}){let a=n!==void 0?this.urlHandlingStrategy.merge(n,o):o,i=r??a;return i instanceof $n?this.urlSerializer.serialize(i):i}commitTransition({targetRouterState:n,finalUrl:o,initialUrl:r}){o&&n?(this.currentUrlTree=o,this.rawUrlTree=this.urlHandlingStrategy.merge(o,r),this.routerState=n):this.rawUrlTree=r}routerState=lb(null);getRouterState(){return this.routerState}stateMemento=this.createStateMemento();updateStateMemento(){this.stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}resetInternalState({finalUrl:n}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,n??this.rawUrlTree)}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:()=>p(NS),providedIn:"root"})}return e})(),NS=(()=>{class e extends Sb{currentPageId=0;lastSuccessfulId=-1;restoredState(){return this.location.getState()}get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(n){return this.location.subscribe(o=>{o.type==="popstate"&&setTimeout(()=>{n(o.url,o.state,"popstate")})})}handleRouterEvent(n,o){n instanceof Gt?this.updateStateMemento():n instanceof Gn?this.commitTransition(o):n instanceof Va?this.urlUpdateStrategy==="eager"&&(o.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(o),o)):n instanceof Ua?(this.commitTransition(o),this.urlUpdateStrategy==="deferred"&&!o.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(o),o)):n instanceof Hn&&n.code!==qe.SupersededByNewNavigation&&n.code!==qe.Redirect?this.restoreHistory(o):n instanceof Mr?this.restoreHistory(o,!0):n instanceof on&&(this.lastSuccessfulId=n.id,this.currentPageId=this.browserPageId)}setBrowserUrl(n,{extras:o,id:r}){let{replaceUrl:a,state:i}=o;if(this.location.isCurrentPathEqualTo(n)||a){let s=this.browserPageId,c=y(y({},i),this.generateNgRouterState(r,s));this.location.replaceState(n,"",c)}else{let s=y(y({},i),this.generateNgRouterState(r,this.browserPageId+1));this.location.go(n,"",s)}}restoreHistory(n,o=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,a=this.currentPageId-r;a!==0?this.location.historyGo(a):this.getCurrentUrlTree()===n.finalUrl&&a===0&&(this.resetInternalState(n),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(o&&this.resetInternalState(n),this.resetUrlToCurrentUrlTree())}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(n,o){return this.canceledNavigationResolution==="computed"?{navigationId:n,\u0275routerPageId:o}:{navigationId:n}}static \u0275fac=(()=>{let n;return function(r){return(n||(n=yo(e)))(r||e)}})();static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Hc(e,t){e.events.pipe(ne(n=>n instanceof on||n instanceof Hn||n instanceof Mr||n instanceof Gn),A(n=>n instanceof on||n instanceof Gn?0:(n instanceof Hn?n.code===qe.Redirect||n.code===qe.SupersededByNewNavigation:!1)?2:1),ne(n=>n!==2),je(1)).subscribe(()=>{t()})}var PS={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},jS={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"},an=(()=>{class e{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=p(Ys);stateManager=p(Sb);options=p(Wt,{optional:!0})||{};pendingTasks=p(et);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=p(Uc);urlSerializer=p(So);location=p(Bt);urlHandlingStrategy=p(Vc);injector=p(ae);_events=new B;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=p(wb);onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=p(Ao,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!p(Ya,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:n=>{this.console.warn(n)}}),this.subscribeToNavigationEvents()}eventsSubscription=new J;subscribeToNavigationEvents(){let n=this.navigationTransitions.events.subscribe(o=>{try{let r=this.navigationTransitions.currentTransition,a=Bn(this.navigationTransitions.currentNavigation);if(r!==null&&a!==null){if(this.stateManager.handleRouterEvent(o,a),o instanceof Hn&&o.code!==qe.Redirect&&o.code!==qe.SupersededByNewNavigation)this.navigated=!0;else if(o instanceof on)this.navigated=!0;else if(o instanceof xr){let i=o.navigationBehaviorOptions,s=this.urlHandlingStrategy.merge(o.url,r.currentRawUrl),c=y({browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||xS(r.source)},i);this.scheduleNavigation(s,Tr,null,c,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}Nw(o)&&this._events.next(o)}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r)}});this.eventsSubscription.add(n)}resetRootComponentType(n){this.routerState.root.component=n,this.navigationTransitions.rootComponentType=n}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Tr,this.stateManager.restoredState())}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((n,o,r)=>{this.navigateToSyncWithBrowser(n,r,o)})}navigateToSyncWithBrowser(n,o,r){let a={replaceUrl:!0},i=r?.navigationId?r:null;if(r){let c=y({},r);delete c.navigationId,delete c.\u0275routerPageId,Object.keys(c).length!==0&&(a.state=c)}let s=this.parseUrl(n);this.scheduleNavigation(s,o,i,a).catch(c=>{this.disposed||this.injector.get($e)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return Bn(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(n){this.config=n.map(Bf),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription&&(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0),this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(n,o={}){let{relativeTo:r,queryParams:a,fragment:i,queryParamsHandling:s,preserveFragment:c}=o,l=c?this.currentUrlTree.fragment:i,u=null;switch(s??this.options.defaultQueryParamsHandling){case"merge":u=y(y({},this.currentUrlTree.queryParams),a);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=a||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let m=r?r.snapshot:this.routerState.snapshot.root;d=ab(m)}catch{(typeof n[0]!="string"||n[0][0]!=="/")&&(n=[]),d=this.currentUrlTree.root}return ib(d,n,u,l??null)}navigateByUrl(n,o={skipLocationChange:!1}){let r=$t(n)?n:this.parseUrl(n),a=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(a,Tr,null,o)}navigate(n,o={skipLocationChange:!1}){return OS(n),this.navigateByUrl(this.createUrlTree(n,o),o)}serializeUrl(n){return this.urlSerializer.serialize(n)}parseUrl(n){try{return this.urlSerializer.parse(n)}catch{return this.urlSerializer.parse("/")}}isActive(n,o){let r;if(o===!0?r=y({},PS):o===!1?r=y({},jS):r=o,$t(n))return qy(this.currentUrlTree,n,r);let a=this.parseUrl(n);return qy(this.currentUrlTree,a,r)}removeEmptyProps(n){return Object.entries(n).reduce((o,[r,a])=>(a!=null&&(o[r]=a),o),{})}scheduleNavigation(n,o,r,a,i){if(this.disposed)return Promise.resolve(!1);let s,c,l;i?(s=i.resolve,c=i.reject,l=i.promise):l=new Promise((d,m)=>{s=d,c=m});let u=this.pendingTasks.add();return Hc(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:o,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:n,extras:a,resolve:s,reject:c,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(d=>Promise.reject(d))}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function OS(e){for(let t=0;t<e.length;t++)if(e[t]==null)throw new E(4008,!1)}var $c=(()=>{class e{router;route;tabIndexAttribute;renderer;el;locationStrategy;reactiveHref=Xe(null);get href(){return Bn(this.reactiveHref)}set href(n){this.reactiveHref.set(n)}target;queryParams;fragment;queryParamsHandling;state;info;relativeTo;isAnchorElement;subscription;onChanges=new B;applicationErrorHandler=p($e);options=p(Wt,{optional:!0});constructor(n,o,r,a,i,s){this.router=n,this.route=o,this.tabIndexAttribute=r,this.renderer=a,this.el=i,this.locationStrategy=s,this.reactiveHref.set(p(new qt("href"),{optional:!0}));let c=i.nativeElement.tagName?.toLowerCase();this.isAnchorElement=c==="a"||c==="area"||!!(typeof customElements=="object"&&customElements.get(c)?.observedAttributes?.includes?.("href")),this.isAnchorElement?this.setTabIndexIfNotOnNativeEl("0"):this.subscribeToNavigationEventsIfNecessary()}subscribeToNavigationEventsIfNecessary(){if(this.subscription!==void 0||!this.isAnchorElement)return;let n=this.preserveFragment,o=r=>r==="merge"||r==="preserve";n||=o(this.queryParamsHandling),n||=!this.queryParamsHandling&&!o(this.options?.defaultQueryParamsHandling),n&&(this.subscription=this.router.events.subscribe(r=>{r instanceof on&&this.updateHref()}))}preserveFragment=!1;skipLocationChange=!1;replaceUrl=!1;setTabIndexIfNotOnNativeEl(n){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",n)}ngOnChanges(n){this.isAnchorElement&&(this.updateHref(),this.subscribeToNavigationEventsIfNecessary()),this.onChanges.next(this)}routerLinkInput=null;set routerLink(n){n==null?(this.routerLinkInput=null,this.setTabIndexIfNotOnNativeEl(null)):($t(n)?this.routerLinkInput=n:this.routerLinkInput=Array.isArray(n)?n:[n],this.setTabIndexIfNotOnNativeEl("0"))}onClick(n,o,r,a,i){let s=this.urlTree;if(s===null||this.isAnchorElement&&(n!==0||o||r||a||i||typeof this.target=="string"&&this.target!="_self"))return!0;let c={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(s,c)?.catch(l=>{this.applicationErrorHandler(l)}),!this.isAnchorElement}ngOnDestroy(){this.subscription?.unsubscribe()}updateHref(){let n=this.urlTree;this.reactiveHref.set(n!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(n))??"":null)}applyAttributeValue(n,o){let r=this.renderer,a=this.el.nativeElement;o!==null?r.setAttribute(a,n,o):r.removeAttribute(a,n)}get urlTree(){return this.routerLinkInput===null?null:$t(this.routerLinkInput)?this.routerLinkInput:this.router.createUrlTree(this.routerLinkInput,{relativeTo:this.relativeTo!==void 0?this.relativeTo:this.route,queryParams:this.queryParams,fragment:this.fragment,queryParamsHandling:this.queryParamsHandling,preserveFragment:this.preserveFragment})}static \u0275fac=function(o){return new(o||e)(K(an),K(rn),ya("tabindex"),K(Ft),K(pe),K(Tn))};static \u0275dir=fe({type:e,selectors:[["","routerLink",""]],hostVars:2,hostBindings:function(o,r){o&1&&Re("click",function(i){return r.onClick(i.button,i.ctrlKey,i.shiftKey,i.altKey,i.metaKey)}),o&2&&Dn("href",r.reactiveHref(),Gd)("target",r.target)},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",ze],skipLocationChange:[2,"skipLocationChange","skipLocationChange",ze],replaceUrl:[2,"replaceUrl","replaceUrl",ze],routerLink:"routerLink"},features:[bn]})}return e})();var Xa=class{};var Mb=(()=>{class e{router;injector;preloadingStrategy;loader;subscription;constructor(n,o,r,a){this.router=n,this.injector=o,this.preloadingStrategy=r,this.loader=a}setUpPreloading(){this.subscription=this.router.events.pipe(ne(n=>n instanceof on),xn(()=>this.preload())).subscribe(()=>{})}preload(){return this.processRoutes(this.injector,this.router.config)}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}processRoutes(n,o){let r=[];for(let a of o){a.providers&&!a._injector&&(a._injector=mr(a.providers,n,`Route: ${a.path}`));let i=a._injector??n,s=a._loadedInjector??i;(a.loadChildren&&!a._loadedRoutes&&a.canLoad===void 0||a.loadComponent&&!a._loadedComponent)&&r.push(this.preloadConfig(i,a)),(a.children||a._loadedRoutes)&&r.push(this.processRoutes(s,a.children??a._loadedRoutes))}return te(r).pipe(vt())}preloadConfig(n,o){return this.preloadingStrategy.preload(o,()=>{let r;o.loadChildren&&o.canLoad===void 0?r=this.loader.loadChildren(n,o):r=w(null);let a=r.pipe(de(i=>i===null?w(void 0):(o._loadedRoutes=i.routes,o._loadedInjector=i.injector,this.processRoutes(i.injector??n,i.routes))));if(o.loadComponent&&!o._loadedComponent){let i=this.loader.loadComponent(n,o);return te([a,i]).pipe(vt())}else return a})}static \u0275fac=function(o){return new(o||e)(I(an),I(ae),I(Xa),I(Bc))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Ab=new C(""),FS=(()=>{class e{urlSerializer;transitions;viewportScroller;zone;options;routerEventsSubscription;scrollEventsSubscription;lastId=0;lastSource=Tr;restoredId=0;store={};constructor(n,o,r,a,i={}){this.urlSerializer=n,this.transitions=o,this.viewportScroller=r,this.zone=a,this.options=i,i.scrollPositionRestoration||="disabled",i.anchorScrolling||="disabled"}init(){this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.setHistoryScrollRestoration("manual"),this.routerEventsSubscription=this.createScrollEvents(),this.scrollEventsSubscription=this.consumeScrollEvents()}createScrollEvents(){return this.transitions.events.subscribe(n=>{n instanceof Gt?(this.store[this.lastId]=this.viewportScroller.getScrollPosition(),this.lastSource=n.navigationTrigger,this.restoredId=n.restoredState?n.restoredState.navigationId:0):n instanceof on?(this.lastId=n.id,this.scheduleScrollEvent(n,this.urlSerializer.parse(n.urlAfterRedirects).fragment)):n instanceof Gn&&n.code===Sr.IgnoredSameUrlNavigation&&(this.lastSource=void 0,this.restoredId=0,this.scheduleScrollEvent(n,this.urlSerializer.parse(n.url).fragment))})}consumeScrollEvents(){return this.transitions.events.subscribe(n=>{n instanceof Ar&&(n.position?this.options.scrollPositionRestoration==="top"?this.viewportScroller.scrollToPosition([0,0]):this.options.scrollPositionRestoration==="enabled"&&this.viewportScroller.scrollToPosition(n.position):n.anchor&&this.options.anchorScrolling==="enabled"?this.viewportScroller.scrollToAnchor(n.anchor):this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.scrollToPosition([0,0]))})}scheduleScrollEvent(n,o){this.zone.runOutsideAngular(()=>Po(this,null,function*(){yield new Promise(r=>{setTimeout(r),typeof requestAnimationFrame<"u"&&requestAnimationFrame(r)}),this.zone.run(()=>{this.transitions.events.next(new Ar(n,this.lastSource==="popstate"?this.store[this.restoredId]:null,o))})}))}ngOnDestroy(){this.routerEventsSubscription?.unsubscribe(),this.scrollEventsSubscription?.unsubscribe()}static \u0275fac=function(o){pp()};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})();function Wf(e,...t){return io([{provide:Ao,multi:!0,useValue:e},[],{provide:rn,useFactory:xb,deps:[an]},{provide:Ta,multi:!0,useFactory:Rb},t.map(n=>n.\u0275providers)])}function xb(e){return e.routerState.root}function ei(e,t){return{\u0275kind:e,\u0275providers:t}}function Rb(){let e=p(he);return t=>{let n=e.get(Cn);if(t!==n.components[0])return;let o=e.get(an),r=e.get(Nb);e.get(Jf)===1&&o.initialNavigation(),e.get(Ob,null,{optional:!0})?.setUpPreloading(),e.get(Ab,null,{optional:!0})?.init(),o.resetRootComponentType(n.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var Nb=new C("",{factory:()=>new B}),Jf=new C("",{providedIn:"root",factory:()=>1});function Pb(){let e=[{provide:ks,useValue:!0},{provide:Jf,useValue:0},Xs(()=>{let t=p(he);return t.get(Qp,Promise.resolve()).then(()=>new Promise(o=>{let r=t.get(an),a=t.get(Nb);Hc(r,()=>{o(!0)}),t.get(Uc).afterPreactivation=()=>(o(!0),a.closed?w(void 0):a),r.initialNavigation()}))})];return ei(2,e)}function jb(){let e=[Xs(()=>{p(an).setUpLocationChangeListener()}),{provide:Jf,useValue:2}];return ei(3,e)}var Ob=new C("");function Fb(e){return ei(0,[{provide:Ob,useExisting:Mb},{provide:Xa,useExisting:e}])}function Lb(){return ei(8,[zf,{provide:Ya,useExisting:zf}])}function kb(e){ct("NgRouterViewTransitions");let t=[{provide:Uf,useValue:Tb},{provide:Hf,useValue:y({skipNextTransition:!!e?.skipInitialTransition},e)}];return ei(9,t)}var zb=[Bt,{provide:So,useClass:Ht},an,Mo,{provide:rn,useFactory:xb,deps:[an]},Bc,[]],xo=(()=>{class e{constructor(){}static forRoot(n,o){return{ngModule:e,providers:[zb,[],{provide:Ao,multi:!0,useValue:n},[],o?.errorHandler?{provide:$f,useValue:o.errorHandler}:[],{provide:Wt,useValue:o||{}},o?.useHash?kS():zS(),LS(),o?.preloadingStrategy?Fb(o.preloadingStrategy).\u0275providers:[],o?.initialNavigation?qS(o):[],o?.bindToComponentInputs?Lb().\u0275providers:[],o?.enableViewTransitions?kb().\u0275providers:[],BS()]}}static forChild(n){return{ngModule:e,providers:[{provide:Ao,multi:!0,useValue:n}]}}static \u0275fac=function(o){return new(o||e)};static \u0275mod=ce({type:e});static \u0275inj=re({})}return e})();function LS(){return{provide:Ab,useFactory:()=>{let e=p(Cy),t=p(H),n=p(Wt),o=p(Uc),r=p(So);return n.scrollOffset&&e.setOffset(n.scrollOffset),new FS(r,o,e,t,n)}}}function kS(){return{provide:Tn,useClass:Zp}}function zS(){return{provide:Tn,useClass:cc}}function qS(e){return[e.initialNavigation==="disabled"?jb().\u0275providers:[],e.initialNavigation==="enabledBlocking"?Pb().\u0275providers:[]]}var Gf=new C("");function BS(){return[{provide:Gf,useFactory:Rb},{provide:Ta,multi:!0,useExisting:Gf}]}function VS(e,t){if(e&1&&(D(0,"span",6),me(1,"img",7),h()),e&2){let n=V();_(),S("src",n.node.flag,En)("alt",n.node.nombre+" flag")}}function US(e,t){e&1&&(D(0,"span",8),b(1,"\u25B8"),h())}function HS(e,t){if(e&1){let n=Lt();vr(0),D(1,"app-header-submenu",11),Re("toggleOpen",function(r){pn(n);let a=V(2);return fn(a.toggleChild(r))})("selected",function(r){pn(n);let a=V(2);return fn(a.selected.emit(r))}),h(),yr()}if(e&2){let n=t.$implicit,o=V(2);_(),S("node",n)("isOpen",o.openChildKey===o.keyOf(n))}}function $S(e,t){if(e&1&&(D(0,"ul",9),X(1,HS,2,2,"ng-container",10),h()),e&2){let n=V();_(),S("ngForOf",n.node.hijos)}}var Wc=class e{constructor(t){this.router=t}node;isOpen=!1;openChildKey=null;toggleOpen=new Y;selected=new Y;keyOf(t){return t.path??t.nombre}toggleChild(t){this.openChildKey=this.openChildKey===t?null:t}onClick(t,n){if(n.stopPropagation(),t.hijos?.length){this.toggleOpen.emit(this.keyOf(t));return}t.path&&this.router.navigate(["/guia",t.path]),this.selected.emit(t)}static \u0275fac=function(n){return new(n||e)(K(an))};static \u0275cmp=ue({type:e,selectors:[["app-header-submenu"]],inputs:{node:"node",isOpen:"isOpen"},outputs:{toggleOpen:"toggleOpen",selected:"selected"},decls:7,vars:6,consts:[[1,"menu-item"],["type","button",1,"menu-btn",3,"click"],["class","flag-container",4,"ngIf"],[1,"label"],["class","caret",4,"ngIf"],["class","submenu",4,"ngIf"],[1,"flag-container"],[1,"flag-icon",3,"src","alt"],[1,"caret"],[1,"submenu"],[4,"ngFor","ngForOf"],[3,"toggleOpen","selected","node","isOpen"]],template:function(n,o){n&1&&(D(0,"li",0)(1,"button",1),Re("click",function(a){return o.onClick(o.node,a)}),X(2,VS,2,2,"span",2),D(3,"span",3),b(4),h(),X(5,US,2,0,"span",4),h(),X(6,$S,2,1,"ul",5),h()),n&2&&(Se("open",o.isOpen),_(2),S("ngIf",o.node.flag),_(2),Ue(o.node.nombre),_(),S("ngIf",o.node.hijos==null?null:o.node.hijos.length),_(),S("ngIf",o.node.hijos==null?null:o.node.hijos.length))},dependencies:[e,We,Vt,dt,xo],styles:['@charset "UTF-8";.menu-item[_ngcontent-%COMP%]{position:relative;list-style:none;white-space:nowrap}.menu-btn[_ngcontent-%COMP%]{background:none;border:0;color:inherit;font:inherit;cursor:pointer;width:100%;padding:.3rem .8rem;display:flex;align-items:center;gap:.5rem;text-align:left}.flag-container[_ngcontent-%COMP%]{display:inline-block;width:20px;height:14px}.flag-icon[_ngcontent-%COMP%]{width:20px;height:14px;object-fit:cover;border:1px solid #ccc;border-radius:2px}.caret[_ngcontent-%COMP%]{margin-left:auto}.submenu[_ngcontent-%COMP%]{opacity:0;transform:translateY(-10px);pointer-events:none;transition:opacity .2s ease,transform .2s ease;position:absolute;top:100%;left:0;background:#34495e;border-radius:4px;padding:.5rem 0;min-width:150px;z-index:10;margin:0;padding-left:0}.menu-item[_ngcontent-%COMP%]:hover > .submenu[_ngcontent-%COMP%]{opacity:1;transform:translateY(0);pointer-events:auto}.menu-item.open[_ngcontent-%COMP%] > .submenu[_ngcontent-%COMP%]{opacity:1;transform:translateY(0);pointer-events:auto}.submenu[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%]{top:0;left:100%;transform:translate(-10px)}.submenu[_ngcontent-%COMP%]   .menu-btn[_ngcontent-%COMP%]:hover{background:#3d566e;border-radius:4px}@media (max-width: 768px){.submenu[_ngcontent-%COMP%]{position:static;opacity:0;transform:none;pointer-events:none;height:0;overflow:hidden;padding:0;min-width:unset;background:transparent}.menu-item.open[_ngcontent-%COMP%] > .submenu[_ngcontent-%COMP%]{opacity:1;pointer-events:auto;height:auto;padding:.5rem 0 .5rem 1rem;background:#34495e;border-radius:4px;margin-top:.25rem}.menu-item.open[_ngcontent-%COMP%]   .caret[_ngcontent-%COMP%]{transform:rotate(90deg)}}']})};function GS(e,t){if(e&1){let n=Lt();D(0,"div",8),Re("click",function(){pn(n);let r=V();return fn(r.menuOpen=!1)}),h()}}function WS(e,t){if(e&1){let n=Lt();vr(0),D(1,"app-header-submenu",9),Re("toggleOpen",function(r){pn(n);let a=V();return fn(a.toggleContinent(r))})("selected",function(){pn(n);let r=V();return fn(r.menuOpen=!1)}),h(),yr()}if(e&2){let n=t.$implicit,o=V();_(),S("node",n)("isOpen",o.openContinentKey===(n.path??n.nombre))}}var Jc=class e{treeData=[];menuOpen=!1;openContinentKey=null;keyOf(t){return t.path??t.nombre}toggleContinent(t){this.openContinentKey=this.openContinentKey===t?null:t}toggleMenu(){this.menuOpen=!this.menuOpen}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=ue({type:e,selectors:[["app-header"]],inputs:{treeData:"treeData"},decls:10,vars:5,consts:[[1,"app-header"],[1,"logo-container"],["routerLink","/"],["src","assets/logo.png","alt","AvenTourArte logo",1,"logo-img"],["aria-label","Abrir/cerrar men\xFA",1,"menu-toggle",3,"click"],["class","backdrop",3,"click",4,"ngIf"],[1,"main-menu"],[4,"ngFor","ngForOf"],[1,"backdrop",3,"click"],[3,"toggleOpen","selected","node","isOpen"]],template:function(n,o){n&1&&(D(0,"header",0)(1,"div",1)(2,"a",2),me(3,"img",3),h()(),D(4,"button",4),Re("click",function(){return o.toggleMenu()}),b(5),h(),X(6,GS,1,0,"div",5),D(7,"nav",6)(8,"ul"),X(9,WS,2,2,"ng-container",7),h()()()),n&2&&(_(5),le(" ",o.menuOpen?"\u2715":"\u2630"," "),_(),S("ngIf",o.menuOpen),_(),Se("open",o.menuOpen),_(2),S("ngForOf",o.treeData))},dependencies:[We,Vt,dt,xo,$c,Wc],styles:['@charset "UTF-8";.app-header[_ngcontent-%COMP%]{display:flex;align-items:center;background:#2c3e50;padding:.7rem 1.5rem;color:#fff;box-shadow:0 2px 6px #00000026;position:relative}.app-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.app-header[_ngcontent-%COMP%]   .logo-img[_ngcontent-%COMP%]{height:80px;border-radius:6px;cursor:pointer}.app-header[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%]{display:none;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;margin-left:auto}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%]{margin-left:2rem;flex-grow:1}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0;display:flex;gap:1.5rem}[_nghost-%COMP%]{position:relative;z-index:10}.backdrop[_ngcontent-%COMP%]{display:none}@media (max-width: 768px){.app-header[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%]{display:block;margin-left:auto}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%]{display:none;position:fixed;inset:100px 0 0;background:#2c3e50;z-index:9999;overflow-y:auto;padding:1rem}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{flex-direction:column;gap:.25rem}.app-header[_ngcontent-%COMP%]   .main-menu.open[_ngcontent-%COMP%]{display:block}.backdrop[_ngcontent-%COMP%]{display:block;position:fixed;inset:100px 0 0;background:#00000059;z-index:9998}}']})};var Qc=class e{currentYear=new Date().getFullYear();socialLinks=[{name:"Instagram",url:"https://www.instagram.com/aventourarte",icon:"\u{1F4F8}"},{name:"Facebook",url:"https://www.facebook.com/aventourarte",icon:"\u{1F4D8}"},{name:"Twitter",url:"https://www.twitter.com/aventourarte",icon:"\u{1F426}"}];static \u0275fac=function(n){return new(n||e)};static \u0275cmp=ue({type:e,selectors:[["app-footer"]],decls:13,vars:0,consts:[[1,"footer"],[1,"footer-bottom"],[1,"socials"],["href","#","target","_blank"]],template:function(n,o){n&1&&(tn(0,"footer",0)(1,"div",1)(2,"span"),b(3,"\xA9 2026 AvenTourArte. Todos los derechos reservados."),_n(),tn(4,"span",2)(5,"a",3),b(6,"Instagram"),_n(),b(7," | "),tn(8,"a",3),b(9,"Facebook"),_n(),b(10," | "),tn(11,"a",3),b(12,"Twitter"),_n()()()())},styles:[".footer[_ngcontent-%COMP%]{width:100%;max-width:100vw;background-color:#1a1a1a;color:#f5f5f5;font-family:Arial,sans-serif;font-size:.75rem;padding:.5rem 1rem;box-sizing:border-box}.footer[_ngcontent-%COMP%]   .footer-bottom[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem}.footer[_ngcontent-%COMP%]   .footer-bottom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#f5f5f5;text-decoration:none;margin-left:.3rem;transition:color .3s}.footer[_ngcontent-%COMP%]   .footer-bottom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#ff6f61}.footer[_ngcontent-%COMP%]   .socials[_ngcontent-%COMP%]{display:flex;gap:.5rem}[_nghost-%COMP%]{position:relative}"]})};var Zc=class e{treeData=zy;selectedPlace="";onSelected(t){this.selectedPlace=t.nombre}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=ue({type:e,selectors:[["app-root"]],decls:6,vars:1,consts:[[3,"treeData"],[1,"app-main"],[1,"app-body"],[1,"content"]],template:function(n,o){n&1&&(me(0,"app-header",0),D(1,"main",1)(2,"div",2)(3,"section",3),me(4,"router-outlet"),h()()(),me(5,"app-footer")),n&2&&S("treeData",o.treeData)},dependencies:[We,xo,Za,Jc,Qc],styles:['@charset "UTF-8";[_nghost-%COMP%], body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{margin:0;padding:0;width:100%;height:100%;box-sizing:border-box}*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after{box-sizing:inherit}[_nghost-%COMP%]{display:flex;flex-direction:column;min-height:100vh}.app-main[_ngcontent-%COMP%]{flex:1;display:flex;width:100%}.app-body[_ngcontent-%COMP%]{flex:1;width:100%;display:flex;justify-content:center}.content[_ngcontent-%COMP%]{flex:1;max-width:1200px;padding:2rem}']})};var Qf={},Or=(()=>{class e{_appId=p(dr);getId(n){return this._appId!=="ng"&&(n+=this._appId),Qf.hasOwnProperty(n)||(Qf[n]=0),`${n}${Qf[n]++}`}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var ni=(()=>{class e{_listeners=[];notify(n,o){for(let r of this._listeners)r(n,o)}listen(n){return this._listeners.push(n),()=>{this._listeners=this._listeners.filter(o=>n!==o)}}ngOnDestroy(){this._listeners=[]}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Zf=new C("CdkAccordion"),qb=(()=>{class e{_stateChanges=new B;_openCloseAllActions=new B;id=p(Or).getId("cdk-accordion-");multi=!1;openAll(){this.multi&&this._openCloseAllActions.next(!0)}closeAll(){this._openCloseAllActions.next(!1)}ngOnChanges(n){this._stateChanges.next(n)}ngOnDestroy(){this._stateChanges.complete(),this._openCloseAllActions.complete()}static \u0275fac=function(o){return new(o||e)};static \u0275dir=fe({type:e,selectors:[["cdk-accordion"],["","cdkAccordion",""]],inputs:{multi:[2,"multi","multi",ze]},exportAs:["cdkAccordion"],features:[lt([{provide:Zf,useExisting:e}]),bn]})}return e})(),Bb=(()=>{class e{accordion=p(Zf,{optional:!0,skipSelf:!0});_changeDetectorRef=p(ut);_expansionDispatcher=p(ni);_openCloseAllSubscription=J.EMPTY;closed=new Y;opened=new Y;destroyed=new Y;expandedChange=new Y;id=p(Or).getId("cdk-accordion-child-");get expanded(){return this._expanded}set expanded(n){if(this._expanded!==n){if(this._expanded=n,this.expandedChange.emit(n),n){this.opened.emit();let o=this.accordion?this.accordion.id:this.id;this._expansionDispatcher.notify(this.id,o)}else this.closed.emit();this._changeDetectorRef.markForCheck()}}_expanded=!1;get disabled(){return this._disabled()}set disabled(n){this._disabled.set(n)}_disabled=Xe(!1);_removeUniqueSelectionListener=()=>{};constructor(){}ngOnInit(){this._removeUniqueSelectionListener=this._expansionDispatcher.listen((n,o)=>{this.accordion&&!this.accordion.multi&&this.accordion.id===o&&this.id!==n&&(this.expanded=!1)}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions())}ngOnDestroy(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe()}toggle(){this.disabled||(this.expanded=!this.expanded)}close(){this.disabled||(this.expanded=!1)}open(){this.disabled||(this.expanded=!0)}_subscribeToOpenCloseAllActions(){return this.accordion._openCloseAllActions.subscribe(n=>{this.disabled||(this.expanded=n)})}static \u0275fac=function(o){return new(o||e)};static \u0275dir=fe({type:e,selectors:[["cdk-accordion-item"],["","cdkAccordionItem",""]],inputs:{expanded:[2,"expanded","expanded",ze],disabled:[2,"disabled","disabled",ze]},outputs:{closed:"closed",opened:"opened",destroyed:"destroyed",expandedChange:"expandedChange"},exportAs:["cdkAccordionItem"],features:[lt([{provide:Zf,useValue:void 0}])]})}return e})(),Vb=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=ce({type:e});static \u0275inj=re({})}return e})();var ti=class{_attachedHost;attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;t!=null&&(this._attachedHost=null,t.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(t){this._attachedHost=t}},Yf=class extends ti{component;viewContainerRef;injector;projectableNodes;constructor(t,n,o,r){super(),this.component=t,this.viewContainerRef=n,this.injector=o,this.projectableNodes=r}},oi=class extends ti{templateRef;viewContainerRef;context;injector;constructor(t,n,o,r){super(),this.templateRef=t,this.viewContainerRef=n,this.context=o,this.injector=r}get origin(){return this.templateRef.elementRef}attach(t,n=this.context){return this.context=n,super.attach(t)}detach(){return this.context=void 0,super.detach()}},Kf=class extends ti{element;constructor(t){super(),this.element=t instanceof pe?t.nativeElement:t}},Xf=class{_attachedPortal;_disposeFn;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(t){if(t instanceof Yf)return this._attachedPortal=t,this.attachComponentPortal(t);if(t instanceof oi)return this._attachedPortal=t,this.attachTemplatePortal(t);if(this.attachDomPortal&&t instanceof Kf)return this._attachedPortal=t,this.attachDomPortal(t)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(t){this._disposeFn=t}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}};var Ub=(()=>{class e extends Xf{_moduleRef=p(at,{optional:!0});_document=p(U);_viewContainerRef=p(Ge);_isInitialized=!1;_attachedRef;constructor(){super()}get portal(){return this._attachedPortal}set portal(n){this.hasAttached()&&!n&&!this._isInitialized||(this.hasAttached()&&super.detach(),n&&super.attach(n),this._attachedPortal=n||null)}attached=new Y;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(n){n.setAttachedHost(this);let o=n.viewContainerRef!=null?n.viewContainerRef:this._viewContainerRef,r=o.createComponent(n.component,{index:o.length,injector:n.injector||o.injector,projectableNodes:n.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0});return o!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=n,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(n){n.setAttachedHost(this);let o=this._viewContainerRef.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=n,this._attachedRef=o,this.attached.emit(o),o}attachDomPortal=n=>{let o=n.element;o.parentNode;let r=this._document.createComment("dom-portal");n.setAttachedHost(this),o.parentNode.insertBefore(r,o),this._getRootNode().appendChild(o),this._attachedPortal=n,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(o,r)})};_getRootNode(){let n=this._viewContainerRef.element.nativeElement;return n.nodeType===n.ELEMENT_NODE?n:n.parentNode}static \u0275fac=function(o){return new(o||e)};static \u0275dir=fe({type:e,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[bo]})}return e})();var Hb=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=ce({type:e});static \u0275inj=re({})}return e})();function $b(e){return e.buttons===0||e.detail===0}function Gb(e){let t=e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0];return!!t&&t.identifier===-1&&(t.radiusX==null||t.radiusX===1)&&(t.radiusY==null||t.radiusY===1)}var em;function JS(){if(em==null){let e=typeof document<"u"?document.head:null;em=!!(e&&(e.createShadowRoot||e.attachShadow))}return em}function Wb(e){if(JS()){let t=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&t instanceof ShadowRoot)return t}return null}function Fr(e){return e.composedPath?e.composedPath()[0]:e.target}var nm;try{nm=typeof Intl<"u"&&Intl.v8BreakIterator}catch{nm=!1}var Ro=(()=>{class e{_platformId=p(Ot);isBrowser=this._platformId?Ey(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||nm)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var ri;function QS(){if(ri==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>ri=!0}))}finally{ri=ri||!1}return ri}function Jb(e){return QS()?e:!!e.capture}function Yc(e){return e instanceof pe?e.nativeElement:e}var Qb=new C("cdk-input-modality-detector-options"),Zb={ignoreKeys:[18,17,224,91,16]},Yb=650,tm={passive:!0,capture:!0},Kb=(()=>{class e{_platform=p(Ro);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new ve(null);_options;_lastTouchMs=0;_onKeydown=n=>{this._options?.ignoreKeys?.some(o=>o===n.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=Fr(n))};_onMousedown=n=>{Date.now()-this._lastTouchMs<Yb||(this._modality.next($b(n)?"keyboard":"mouse"),this._mostRecentTarget=Fr(n))};_onTouchstart=n=>{if(Gb(n)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=Fr(n)};constructor(){let n=p(H),o=p(U),r=p(Qb,{optional:!0});if(this._options=y(y({},Zb),r),this.modalityDetected=this._modality.pipe($r(1)),this.modalityChanged=this.modalityDetected.pipe(jl()),this._platform.isBrowser){let a=p(rt).createRenderer(null,null);this._listenerCleanups=n.runOutsideAngular(()=>[a.listen(o,"keydown",this._onKeydown,tm),a.listen(o,"mousedown",this._onMousedown,tm),a.listen(o,"touchstart",this._onTouchstart,tm)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(n=>n())}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),ai=(function(e){return e[e.IMMEDIATE=0]="IMMEDIATE",e[e.EVENTUAL=1]="EVENTUAL",e})(ai||{}),Xb=new C("cdk-focus-monitor-default-options"),Kc=Jb({passive:!0,capture:!0}),om=(()=>{class e{_ngZone=p(H);_platform=p(Ro);_inputModalityDetector=p(Kb);_origin=null;_lastFocusOrigin;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=p(U);_stopInputModalityDetector=new B;constructor(){let n=p(Xb,{optional:!0});this._detectionMode=n?.detectionMode||ai.IMMEDIATE}_rootNodeFocusAndBlurListener=n=>{let o=Fr(n);for(let r=o;r;r=r.parentElement)n.type==="focus"?this._onFocus(n,r):this._onBlur(n,r)};monitor(n,o=!1){let r=Yc(n);if(!this._platform.isBrowser||r.nodeType!==1)return w();let a=Wb(r)||this._document,i=this._elementInfo.get(r);if(i)return o&&(i.checkChildren=!0),i.subject;let s={checkChildren:o,subject:new B,rootNode:a};return this._elementInfo.set(r,s),this._registerGlobalListeners(s),s.subject}stopMonitoring(n){let o=Yc(n),r=this._elementInfo.get(o);r&&(r.subject.complete(),this._setClasses(o),this._elementInfo.delete(o),this._removeGlobalListeners(r))}focusVia(n,o,r){let a=Yc(n),i=this._document.activeElement;a===i?this._getClosestElementsInfo(a).forEach(([s,c])=>this._originChanged(s,o,c)):(this._setOrigin(o),typeof a.focus=="function"&&a.focus(r))}ngOnDestroy(){this._elementInfo.forEach((n,o)=>this.stopMonitoring(o))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(n){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(n)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:n&&this._isLastInteractionFromInputLabel(n)?"mouse":"program"}_shouldBeAttributedToTouch(n){return this._detectionMode===ai.EVENTUAL||!!n?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(n,o){n.classList.toggle("cdk-focused",!!o),n.classList.toggle("cdk-touch-focused",o==="touch"),n.classList.toggle("cdk-keyboard-focused",o==="keyboard"),n.classList.toggle("cdk-mouse-focused",o==="mouse"),n.classList.toggle("cdk-program-focused",o==="program")}_setOrigin(n,o=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=n,this._originFromTouchInteraction=n==="touch"&&o,this._detectionMode===ai.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?Yb:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r)}})}_onFocus(n,o){let r=this._elementInfo.get(o),a=Fr(n);!r||!r.checkChildren&&o!==a||this._originChanged(o,this._getFocusOrigin(a),r)}_onBlur(n,o){let r=this._elementInfo.get(o);!r||r.checkChildren&&n.relatedTarget instanceof Node&&o.contains(n.relatedTarget)||(this._setClasses(o),this._emitOrigin(r,null))}_emitOrigin(n,o){n.subject.observers.length&&this._ngZone.run(()=>n.subject.next(o))}_registerGlobalListeners(n){if(!this._platform.isBrowser)return;let o=n.rootNode,r=this._rootNodeFocusListenerCount.get(o)||0;r||this._ngZone.runOutsideAngular(()=>{o.addEventListener("focus",this._rootNodeFocusAndBlurListener,Kc),o.addEventListener("blur",this._rootNodeFocusAndBlurListener,Kc)}),this._rootNodeFocusListenerCount.set(o,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(Dt(this._stopInputModalityDetector)).subscribe(a=>{this._setOrigin(a,!0)}))}_removeGlobalListeners(n){let o=n.rootNode;if(this._rootNodeFocusListenerCount.has(o)){let r=this._rootNodeFocusListenerCount.get(o);r>1?this._rootNodeFocusListenerCount.set(o,r-1):(o.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Kc),o.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Kc),this._rootNodeFocusListenerCount.delete(o))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(n,o,r){this._setClasses(n,o),this._emitOrigin(r,o),this._lastFocusOrigin=o}_getClosestElementsInfo(n){let o=[];return this._elementInfo.forEach((r,a)=>{(a===n||r.checkChildren&&a.contains(n))&&o.push([a,r])}),o}_isLastInteractionFromInputLabel(n){let{_mostRecentTarget:o,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!o||o===n||n.nodeName!=="INPUT"&&n.nodeName!=="TEXTAREA"||n.disabled)return!1;let a=n.labels;if(a){for(let i=0;i<a.length;i++)if(a[i].contains(o))return!0}return!1}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Xc=new WeakMap,rm=(()=>{class e{_appRef;_injector=p(he);_environmentInjector=p(ae);load(n){let o=this._appRef=this._appRef||this._injector.get(Cn),r=Xc.get(o);r||(r={loaders:new Set,refs:[]},Xc.set(o,r),o.onDestroy(()=>{Xc.get(o)?.refs.forEach(a=>a.destroy()),Xc.delete(o)})),r.loaders.has(n)||(r.loaders.add(n),r.refs.push(Wp(n,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function am(e){return Array.isArray(e)?e:[e]}var eE=new Set,No,el=(()=>{class e{_platform=p(Ro);_nonce=p(pr,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):YS}matchMedia(n){return(this._platform.WEBKIT||this._platform.BLINK)&&ZS(n,this._nonce),this._matchMedia(n)}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function ZS(e,t){if(!eE.has(e))try{No||(No=document.createElement("style"),t&&No.setAttribute("nonce",t),No.setAttribute("type","text/css"),document.head.appendChild(No)),No.sheet&&(No.sheet.insertRule(`@media ${e} {body{ }}`,0),eE.add(e))}catch(n){console.error(n)}}function YS(e){return{matches:e==="all"||e==="",media:e,addListener:()=>{},removeListener:()=>{}}}var im=(()=>{class e{_mediaMatcher=p(el);_zone=p(H);_queries=new Map;_destroySubject=new B;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(n){return nE(am(n)).some(r=>this._registerQuery(r).mql.matches)}observe(n){let r=nE(am(n)).map(i=>this._registerQuery(i).observable),a=eo(r);return a=yt(a.pipe(je(1)),a.pipe($r(1),Hr(0))),a.pipe(A(i=>{let s={matches:!1,breakpoints:{}};return i.forEach(({matches:c,query:l})=>{s.matches=s.matches||c,s.breakpoints[l]=c}),s}))}_registerQuery(n){if(this._queries.has(n))return this._queries.get(n);let o=this._mediaMatcher.matchMedia(n),a={observable:new z(i=>{let s=c=>this._zone.run(()=>i.next(c));return o.addListener(s),()=>{o.removeListener(s)}}).pipe(Ct(o),A(({matches:i})=>({query:n,matches:i})),Dt(this._destroySubject)),mql:o};return this._queries.set(n,a),a}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function nE(e){return e.map(t=>t.split(",")).reduce((t,n)=>t.concat(n)).map(t=>t.trim())}var Jt=(function(e){return e[e.NONE=0]="NONE",e[e.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",e[e.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",e})(Jt||{}),tE="cdk-high-contrast-black-on-white",oE="cdk-high-contrast-white-on-black",sm="cdk-high-contrast-active",cm=(()=>{class e{_platform=p(Ro);_hasCheckedHighContrastMode;_document=p(U);_breakpointSubscription;constructor(){this._breakpointSubscription=p(im).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return Jt.NONE;let n=this._document.createElement("div");n.style.backgroundColor="rgb(1,2,3)",n.style.position="absolute",this._document.body.appendChild(n);let o=this._document.defaultView||window,r=o&&o.getComputedStyle?o.getComputedStyle(n):null,a=(r&&r.backgroundColor||"").replace(/ /g,"");switch(n.remove(),a){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return Jt.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return Jt.BLACK_ON_WHITE}return Jt.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let n=this._document.body.classList;n.remove(sm,tE,oE),this._hasCheckedHighContrastMode=!0;let o=this.getHighContrastMode();o===Jt.BLACK_ON_WHITE?n.add(sm,tE):o===Jt.WHITE_ON_BLACK&&n.add(sm,oE)}}static \u0275fac=function(o){return new(o||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var KS=200,nl=class{_letterKeyStream=new B;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new B;selectedItem=this._selectedItem;constructor(t,n){let o=typeof n?.debounceInterval=="number"?n.debounceInterval:KS;n?.skipPredicate&&(this._skipPredicateFn=n.skipPredicate),this.setItems(t),this._setupKeyHandler(o)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(t){this._selectedItemIndex=t}setItems(t){this._items=t}handleKey(t){let n=t.keyCode;t.key&&t.key.length===1?this._letterKeyStream.next(t.key.toLocaleUpperCase()):(n>=65&&n<=90||n>=48&&n<=57)&&this._letterKeyStream.next(String.fromCharCode(n))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(t){this._letterKeyStream.pipe(oe(n=>this._pressedLetters.push(n)),Hr(t),ne(()=>this._pressedLetters.length>0),A(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(n=>{for(let o=1;o<this._items.length+1;o++){let r=(this._selectedItemIndex+o)%this._items.length,a=this._items[r];if(!this._skipPredicateFn?.(a)&&a.getLabel?.().toLocaleUpperCase().trim().indexOf(n)===0){this._selectedItem.next(a);break}}this._pressedLetters=[]})}};function tl(e,...t){return t.length?t.some(n=>e[n]):e.altKey||e.shiftKey||e.ctrlKey||e.metaKey}var ol=class{_items;_activeItemIndex=Xe(-1);_activeItem=Xe(null);_wrap=!1;_typeaheadSubscription=J.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=t=>t.disabled;constructor(t,n){this._items=t,t instanceof nt?this._itemChangesSubscription=t.changes.subscribe(o=>this._itemsChanged(o.toArray())):ca(t)&&(this._effectRef=Op(()=>this._itemsChanged(t()),{injector:n}))}tabOut=new B;change=new B;skipPredicate(t){return this._skipPredicateFn=t,this}withWrap(t=!0){return this._wrap=t,this}withVerticalOrientation(t=!0){return this._vertical=t,this}withHorizontalOrientation(t){return this._horizontal=t,this}withAllowedModifierKeys(t){return this._allowedModifierKeys=t,this}withTypeAhead(t=200){this._typeaheadSubscription.unsubscribe();let n=this._getItemsArray();return this._typeahead=new nl(n,{debounceInterval:typeof t=="number"?t:void 0,skipPredicate:o=>this._skipPredicateFn(o)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(o=>{this.setActiveItem(o)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(t=!0){return this._homeAndEnd=t,this}withPageUpDown(t=!0,n=10){return this._pageUpAndDown={enabled:t,delta:n},this}setActiveItem(t){let n=this._activeItem();this.updateActiveItem(t),this._activeItem()!==n&&this.change.next(this._activeItemIndex())}onKeydown(t){let n=t.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(a=>!t[a]||this._allowedModifierKeys.indexOf(a)>-1);switch(n){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let a=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(a>0?a:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let a=this._activeItemIndex()+this._pageUpAndDown.delta,i=this._getItemsArray().length;this._setActiveItemByIndex(a<i?a:i-1,-1);break}else return;default:(r||tl(t,"shiftKey"))&&this._typeahead?.handleKey(t);return}this._typeahead?.reset(),t.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(t){let n=this._getItemsArray(),o=typeof t=="number"?t:n.indexOf(t),r=n[o];this._activeItem.set(r??null),this._activeItemIndex.set(o),this._typeahead?.setCurrentSelectedItemIndex(o)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(t){this._wrap?this._setActiveInWrapMode(t):this._setActiveInDefaultMode(t)}_setActiveInWrapMode(t){let n=this._getItemsArray();for(let o=1;o<=n.length;o++){let r=(this._activeItemIndex()+t*o+n.length)%n.length,a=n[r];if(!this._skipPredicateFn(a)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(t){this._setActiveItemByIndex(this._activeItemIndex()+t,t)}_setActiveItemByIndex(t,n){let o=this._getItemsArray();if(o[t]){for(;this._skipPredicateFn(o[t]);)if(t+=n,!o[t])return;this.setActiveItem(t)}}_getItemsArray(){return ca(this._items)?this._items():this._items instanceof nt?this._items.toArray():this._items}_itemsChanged(t){this._typeahead?.setItems(t);let n=this._activeItem();if(n){let o=t.indexOf(n);o>-1&&o!==this._activeItemIndex()&&(this._activeItemIndex.set(o),this._typeahead?.setCurrentSelectedItemIndex(o))}}};var ii=class extends ol{_origin="program";setFocusOrigin(t){return this._origin=t,this}setActiveItem(t){super.setActiveItem(t),this.activeItem&&this.activeItem.focus(this._origin)}};var XS=new C("MATERIAL_ANIMATIONS");var rE=null;function eM(){return p(XS,{optional:!0})?.animationsDisabled||p(kd,{optional:!0})==="NoopAnimations"?"di-disabled":(rE??=p(el).matchMedia("(prefers-reduced-motion)").matches,rE?"reduced-motion":"enabled")}function aE(){return eM()!=="enabled"}var iE=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275cmp=ue({type:e,selectors:[["structural-styles"]],decls:0,vars:0,template:function(o,r){},styles:[`.mat-focus-indicator{position:relative}.mat-focus-indicator::before{top:0;left:0;right:0;bottom:0;position:absolute;box-sizing:border-box;pointer-events:none;display:var(--mat-focus-indicator-display, none);border-width:var(--mat-focus-indicator-border-width, 3px);border-style:var(--mat-focus-indicator-border-style, solid);border-color:var(--mat-focus-indicator-border-color, transparent);border-radius:var(--mat-focus-indicator-border-radius, 4px)}.mat-focus-indicator:focus::before{content:""}@media(forced-colors: active){html{--mat-focus-indicator-display: block}}
`],encapsulation:2,changeDetection:0})}return e})();var lm=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=ce({type:e});static \u0275inj=re({})}return e})();var si=(()=>{class e{constructor(){p(cm)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(o){return new(o||e)};static \u0275mod=ce({type:e});static \u0275inj=re({imports:[lm,lm]})}return e})();var oM=["body"],rM=["bodyWrapper"],aM=[[["mat-expansion-panel-header"]],"*",[["mat-action-row"]]],iM=["mat-expansion-panel-header","*","mat-action-row"];function sM(e,t){}var cM=[[["mat-panel-title"]],[["mat-panel-description"]],"*"],lM=["mat-panel-title","mat-panel-description","*"];function uM(e,t){e&1&&(tn(0,"span",1),ss(),tn(1,"svg",2),ec(2,"path",3),_n()())}var um=new C("MAT_ACCORDION"),sE=new C("MAT_EXPANSION_PANEL"),dM=(()=>{class e{_template=p(yn);_expansionPanel=p(sE,{optional:!0});constructor(){}static \u0275fac=function(o){return new(o||e)};static \u0275dir=fe({type:e,selectors:[["ng-template","matExpansionPanelContent",""]]})}return e})(),cE=new C("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS"),dm=(()=>{class e extends Bb{_viewContainerRef=p(Ge);_animationsDisabled=aE();_document=p(U);_ngZone=p(H);_elementRef=p(pe);_renderer=p(Ft);_cleanupTransitionEnd;get hideToggle(){return this._hideToggle||this.accordion&&this.accordion.hideToggle}set hideToggle(n){this._hideToggle=n}_hideToggle=!1;get togglePosition(){return this._togglePosition||this.accordion&&this.accordion.togglePosition}set togglePosition(n){this._togglePosition=n}_togglePosition;afterExpand=new Y;afterCollapse=new Y;_inputChanges=new B;accordion=p(um,{optional:!0,skipSelf:!0});_lazyContent;_body;_bodyWrapper;_portal;_headerId=p(Or).getId("mat-expansion-panel-header-");constructor(){super();let n=p(cE,{optional:!0});this._expansionDispatcher=p(ni),n&&(this.hideToggle=n.hideToggle)}_hasSpacing(){return this.accordion?this.expanded&&this.accordion.displayMode==="default":!1}_getExpandedState(){return this.expanded?"expanded":"collapsed"}toggle(){this.expanded=!this.expanded}close(){this.expanded=!1}open(){this.expanded=!0}ngAfterContentInit(){this._lazyContent&&this._lazyContent._expansionPanel===this&&this.opened.pipe(Ct(null),ne(()=>this.expanded&&!this._portal),je(1)).subscribe(()=>{this._portal=new oi(this._lazyContent._template,this._viewContainerRef)}),this._setupAnimationEvents()}ngOnChanges(n){this._inputChanges.next(n)}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTransitionEnd?.(),this._inputChanges.complete()}_containsFocus(){if(this._body){let n=this._document.activeElement,o=this._body.nativeElement;return n===o||o.contains(n)}return!1}_transitionEndListener=({target:n,propertyName:o})=>{n===this._bodyWrapper?.nativeElement&&o==="grid-template-rows"&&this._ngZone.run(()=>{this.expanded?this.afterExpand.emit():this.afterCollapse.emit()})};_setupAnimationEvents(){this._ngZone.runOutsideAngular(()=>{this._animationsDisabled?(this.opened.subscribe(()=>this._ngZone.run(()=>this.afterExpand.emit())),this.closed.subscribe(()=>this._ngZone.run(()=>this.afterCollapse.emit()))):setTimeout(()=>{let n=this._elementRef.nativeElement;this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this._transitionEndListener),n.classList.add("mat-expansion-panel-animations-enabled")},200)})}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=ue({type:e,selectors:[["mat-expansion-panel"]],contentQueries:function(o,r,a){if(o&1&&Sa(a,dM,5),o&2){let i;Co(i=Do())&&(r._lazyContent=i.first)}},viewQuery:function(o,r){if(o&1&&(nc(oM,5),nc(rM,5)),o&2){let a;Co(a=Do())&&(r._body=a.first),Co(a=Do())&&(r._bodyWrapper=a.first)}},hostAttrs:[1,"mat-expansion-panel"],hostVars:4,hostBindings:function(o,r){o&2&&Se("mat-expanded",r.expanded)("mat-expansion-panel-spacing",r._hasSpacing())},inputs:{hideToggle:[2,"hideToggle","hideToggle",ze],togglePosition:"togglePosition"},outputs:{afterExpand:"afterExpand",afterCollapse:"afterCollapse"},exportAs:["matExpansionPanel"],features:[lt([{provide:um,useValue:void 0},{provide:sE,useExisting:e}]),bo,bn],ngContentSelectors:iM,decls:9,vars:4,consts:[["bodyWrapper",""],["body",""],[1,"mat-expansion-panel-content-wrapper"],["role","region",1,"mat-expansion-panel-content",3,"id"],[1,"mat-expansion-panel-body"],[3,"cdkPortalOutlet"]],template:function(o,r){o&1&&(br(aM),qn(0),D(1,"div",2,0)(3,"div",3,1)(5,"div",4),qn(6,1),X(7,sM,0,0,"ng-template",5),h(),qn(8,2),h()()),o&2&&(_(),Dn("inert",r.expanded?null:""),_(2),S("id",r.id),Dn("aria-labelledby",r._headerId),_(4),S("cdkPortalOutlet",r._portal))},dependencies:[Ub],styles:[`.mat-expansion-panel{box-sizing:content-box;display:block;margin:0;overflow:hidden;position:relative;background:var(--mat-expansion-container-background-color, var(--mat-sys-surface));color:var(--mat-expansion-container-text-color, var(--mat-sys-on-surface));border-radius:var(--mat-expansion-container-shape, 12px)}.mat-expansion-panel.mat-expansion-panel-animations-enabled{transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:var(--mat-expansion-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:var(--mat-expansion-container-shape, 12px);border-top-left-radius:var(--mat-expansion-container-shape, 12px)}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:var(--mat-expansion-container-shape, 12px);border-bottom-left-radius:var(--mat-expansion-container-shape, 12px)}@media(forced-colors: active){.mat-expansion-panel{outline:solid 1px}}.mat-expansion-panel-content-wrapper{display:grid;grid-template-rows:0fr;grid-template-columns:100%}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content-wrapper{transition:grid-template-rows 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{grid-template-rows:1fr}@supports not (grid-template-rows: 0fr){.mat-expansion-panel-content-wrapper{height:0}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{height:auto}}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible;min-height:0;visibility:hidden;font-family:var(--mat-expansion-container-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-expansion-container-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-expansion-container-text-weight, var(--mat-sys-body-large-weight));line-height:var(--mat-expansion-container-text-line-height, var(--mat-sys-body-large-line-height));letter-spacing:var(--mat-expansion-container-text-tracking, var(--mat-sys-body-large-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content{transition:visibility 190ms linear}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper>.mat-expansion-panel-content{visibility:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px;border-top-color:var(--mat-expansion-actions-divider-color, var(--mat-sys-outline))}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}
`],encapsulation:2,changeDetection:0})}return e})();var pm=(()=>{class e{panel=p(dm,{host:!0});_element=p(pe);_focusMonitor=p(om);_changeDetectorRef=p(ut);_parentChangeSubscription=J.EMPTY;constructor(){p(rm).load(iE);let n=this.panel,o=p(cE,{optional:!0}),r=p(new qt("tabindex"),{optional:!0}),a=n.accordion?n.accordion._stateChanges.pipe(ne(i=>!!(i.hideToggle||i.togglePosition))):be;this.tabIndex=parseInt(r||"")||0,this._parentChangeSubscription=Pl(n.opened,n.closed,a,n._inputChanges.pipe(ne(i=>!!(i.hideToggle||i.disabled||i.togglePosition)))).subscribe(()=>this._changeDetectorRef.markForCheck()),n.closed.pipe(ne(()=>n._containsFocus())).subscribe(()=>this._focusMonitor.focusVia(this._element,"program")),o&&(this.expandedHeight=o.expandedHeight,this.collapsedHeight=o.collapsedHeight)}expandedHeight;collapsedHeight;tabIndex=0;get disabled(){return this.panel.disabled}_toggle(){this.disabled||this.panel.toggle()}_isExpanded(){return this.panel.expanded}_getExpandedState(){return this.panel._getExpandedState()}_getPanelId(){return this.panel.id}_getTogglePosition(){return this.panel.togglePosition}_showToggle(){return!this.panel.hideToggle&&!this.panel.disabled}_getHeaderHeight(){let n=this._isExpanded();return n&&this.expandedHeight?this.expandedHeight:!n&&this.collapsedHeight?this.collapsedHeight:null}_keydown(n){switch(n.keyCode){case 32:case 13:tl(n)||(n.preventDefault(),this._toggle());break;default:this.panel.accordion&&this.panel.accordion._handleHeaderKeydown(n);return}}focus(n,o){n?this._focusMonitor.focusVia(this._element,n,o):this._element.nativeElement.focus(o)}ngAfterViewInit(){this._focusMonitor.monitor(this._element).subscribe(n=>{n&&this.panel.accordion&&this.panel.accordion._handleHeaderFocus(this)})}ngOnDestroy(){this._parentChangeSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._element)}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=ue({type:e,selectors:[["mat-expansion-panel-header"]],hostAttrs:["role","button",1,"mat-expansion-panel-header","mat-focus-indicator"],hostVars:13,hostBindings:function(o,r){o&1&&Re("click",function(){return r._toggle()})("keydown",function(i){return r._keydown(i)}),o&2&&(Dn("id",r.panel._headerId)("tabindex",r.disabled?-1:r.tabIndex)("aria-controls",r._getPanelId())("aria-expanded",r._isExpanded())("aria-disabled",r.panel.disabled),tc("height",r._getHeaderHeight()),Se("mat-expanded",r._isExpanded())("mat-expansion-toggle-indicator-after",r._getTogglePosition()==="after")("mat-expansion-toggle-indicator-before",r._getTogglePosition()==="before"))},inputs:{expandedHeight:"expandedHeight",collapsedHeight:"collapsedHeight",tabIndex:[2,"tabIndex","tabIndex",n=>n==null?0:Gp(n)]},ngContentSelectors:lM,decls:5,vars:3,consts:[[1,"mat-content"],[1,"mat-expansion-indicator"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 -960 960 960","aria-hidden","true","focusable","false"],["d","M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"]],template:function(o,r){o&1&&(br(cM),tn(0,"span",0),qn(1),qn(2,1),qn(3,2),_n(),Sp(4,uM,3,0,"span",1)),o&2&&(Se("mat-content-hide-toggle",!r._showToggle()),_(4),Ap(r._showToggle()?4:-1))},styles:[`.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;height:var(--mat-expansion-header-collapsed-state-height, 48px);font-family:var(--mat-expansion-header-text-font, var(--mat-sys-title-medium-font));font-size:var(--mat-expansion-header-text-size, var(--mat-sys-title-medium-size));font-weight:var(--mat-expansion-header-text-weight, var(--mat-sys-title-medium-weight));line-height:var(--mat-expansion-header-text-line-height, var(--mat-sys-title-medium-line-height));letter-spacing:var(--mat-expansion-header-text-tracking, var(--mat-sys-title-medium-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-header{transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header::before{border-radius:inherit}.mat-expansion-panel-header.mat-expanded{height:var(--mat-expansion-header-expanded-state-height, 64px)}.mat-expansion-panel-header[aria-disabled=true]{color:var(--mat-expansion-header-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent))}@media(hover: none){.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-container-background-color, var(--mat-sys-surface))}}.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused{background:var(--mat-expansion-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent))}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-content.mat-content-hide-toggle{margin-right:8px}[dir=rtl] .mat-content.mat-content-hide-toggle{margin-right:0;margin-left:8px}.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-right:24px;margin-left:0}.mat-expansion-panel-header-title{color:var(--mat-expansion-header-text-color, var(--mat-sys-on-surface))}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description{color:inherit}.mat-expansion-panel-header-description{flex-grow:2;color:var(--mat-expansion-header-description-color, var(--mat-sys-on-surface-variant))}.mat-expansion-panel-animations-enabled .mat-expansion-indicator{transition:transform 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header.mat-expanded .mat-expansion-indicator{transform:rotate(180deg)}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";padding:3px;transform:rotate(45deg);vertical-align:middle;color:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-legacy-header-indicator-display, none)}.mat-expansion-indicator svg{width:24px;height:24px;margin:0 -8px;vertical-align:middle;fill:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-header-indicator-display, inline-block)}@media(forced-colors: active){.mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}}
`],encapsulation:2,changeDetection:0})}return e})();var lE=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275dir=fe({type:e,selectors:[["mat-panel-title"]],hostAttrs:[1,"mat-expansion-panel-header-title"]})}return e})(),uE=(()=>{class e extends qb{_keyManager;_ownHeaders=new nt;_headers;hideToggle=!1;displayMode="default";togglePosition="after";ngAfterContentInit(){this._headers.changes.pipe(Ct(this._headers)).subscribe(n=>{this._ownHeaders.reset(n.filter(o=>o.panel.accordion===this)),this._ownHeaders.notifyOnChanges()}),this._keyManager=new ii(this._ownHeaders).withWrap().withHomeAndEnd()}_handleHeaderKeydown(n){this._keyManager.onKeydown(n)}_handleHeaderFocus(n){this._keyManager.updateActiveItem(n)}ngOnDestroy(){super.ngOnDestroy(),this._keyManager?.destroy(),this._ownHeaders.destroy()}static \u0275fac=(()=>{let n;return function(r){return(n||(n=yo(e)))(r||e)}})();static \u0275dir=fe({type:e,selectors:[["mat-accordion"]],contentQueries:function(o,r,a){if(o&1&&Sa(a,pm,5),o&2){let i;Co(i=Do())&&(r._headers=i)}},hostAttrs:[1,"mat-accordion"],hostVars:2,hostBindings:function(o,r){o&2&&Se("mat-accordion-multi",r.multi)},inputs:{hideToggle:[2,"hideToggle","hideToggle",ze],displayMode:"displayMode",togglePosition:"togglePosition"},exportAs:["matAccordion"],features:[lt([{provide:um,useExisting:e}]),bo]})}return e})(),dE=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=ce({type:e});static \u0275inj=re({imports:[si,Vb,Hb]})}return e})();var rl;function fM(){if(rl===void 0&&(rl=null,typeof window<"u")){let e=window;e.trustedTypes!==void 0&&(rl=e.trustedTypes.createPolicy("angular#components",{createHTML:t=>t}))}return rl}function ci(e){return fM()?.createHTML(e)||e}function pE(e){return Error(`Unable to find icon with the name "${e}"`)}function mM(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function fE(e){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${e}".`)}function mE(e){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${e}".`)}var mt=class{url;svgText;options;svgElement;constructor(t,n,o){this.url=t,this.svgText=n,this.options=o}},gE=(()=>{class e{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(n,o,r,a){this._httpClient=n,this._sanitizer=o,this._errorHandler=a,this._document=r}addSvgIcon(n,o,r){return this.addSvgIconInNamespace("",n,o,r)}addSvgIconLiteral(n,o,r){return this.addSvgIconLiteralInNamespace("",n,o,r)}addSvgIconInNamespace(n,o,r,a){return this._addSvgIconConfig(n,o,new mt(r,null,a))}addSvgIconResolver(n){return this._resolvers.push(n),this}addSvgIconLiteralInNamespace(n,o,r,a){let i=this._sanitizer.sanitize(we.HTML,r);if(!i)throw mE(r);let s=ci(i);return this._addSvgIconConfig(n,o,new mt("",s,a))}addSvgIconSet(n,o){return this.addSvgIconSetInNamespace("",n,o)}addSvgIconSetLiteral(n,o){return this.addSvgIconSetLiteralInNamespace("",n,o)}addSvgIconSetInNamespace(n,o,r){return this._addSvgIconSetConfig(n,new mt(o,null,r))}addSvgIconSetLiteralInNamespace(n,o,r){let a=this._sanitizer.sanitize(we.HTML,o);if(!a)throw mE(o);let i=ci(a);return this._addSvgIconSetConfig(n,new mt("",i,r))}registerFontClassAlias(n,o=n){return this._fontCssClassesByAlias.set(n,o),this}classNameForFontAlias(n){return this._fontCssClassesByAlias.get(n)||n}setDefaultFontSetClass(...n){return this._defaultFontSetClass=n,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(n){let o=this._sanitizer.sanitize(we.RESOURCE_URL,n);if(!o)throw fE(n);let r=this._cachedIconsByUrl.get(o);return r?w(al(r)):this._loadSvgIconFromConfig(new mt(n,null)).pipe(oe(a=>this._cachedIconsByUrl.set(o,a)),A(a=>al(a)))}getNamedSvgIcon(n,o=""){let r=hE(o,n),a=this._svgIconConfigs.get(r);if(a)return this._getSvgFromConfig(a);if(a=this._getIconConfigFromResolvers(o,n),a)return this._svgIconConfigs.set(r,a),this._getSvgFromConfig(a);let i=this._iconSetConfigs.get(o);return i?this._getSvgFromIconSetConfigs(n,i):gt(pE(r))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(n){return n.svgText?w(al(this._svgElementFromConfig(n))):this._loadSvgIconFromConfig(n).pipe(A(o=>al(o)))}_getSvgFromIconSetConfigs(n,o){let r=this._extractIconWithNameFromAnySet(n,o);if(r)return w(r);let a=o.filter(i=>!i.svgText).map(i=>this._loadSvgIconSetFromConfig(i).pipe(cn(s=>{let l=`Loading icon set URL: ${this._sanitizer.sanitize(we.RESOURCE_URL,i.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(l)),w(null)})));return Nl(a).pipe(A(()=>{let i=this._extractIconWithNameFromAnySet(n,o);if(!i)throw pE(n);return i}))}_extractIconWithNameFromAnySet(n,o){for(let r=o.length-1;r>=0;r--){let a=o[r];if(a.svgText&&a.svgText.toString().indexOf(n)>-1){let i=this._svgElementFromConfig(a),s=this._extractSvgIconFromSet(i,n,a.options);if(s)return s}}return null}_loadSvgIconFromConfig(n){return this._fetchIcon(n).pipe(oe(o=>n.svgText=o),A(()=>this._svgElementFromConfig(n)))}_loadSvgIconSetFromConfig(n){return n.svgText?w(null):this._fetchIcon(n).pipe(oe(o=>n.svgText=o))}_extractSvgIconFromSet(n,o,r){let a=n.querySelector(`[id="${o}"]`);if(!a)return null;let i=a.cloneNode(!0);if(i.removeAttribute("id"),i.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(i,r);if(i.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(i),r);let s=this._svgElementFromString(ci("<svg></svg>"));return s.appendChild(i),this._setSvgAttributes(s,r)}_svgElementFromString(n){let o=this._document.createElement("DIV");o.innerHTML=n;let r=o.querySelector("svg");if(!r)throw Error("<svg> tag not found");return r}_toSvgElement(n){let o=this._svgElementFromString(ci("<svg></svg>")),r=n.attributes;for(let a=0;a<r.length;a++){let{name:i,value:s}=r[a];i!=="id"&&o.setAttribute(i,s)}for(let a=0;a<n.childNodes.length;a++)n.childNodes[a].nodeType===this._document.ELEMENT_NODE&&o.appendChild(n.childNodes[a].cloneNode(!0));return o}_setSvgAttributes(n,o){return n.setAttribute("fit",""),n.setAttribute("height","100%"),n.setAttribute("width","100%"),n.setAttribute("preserveAspectRatio","xMidYMid meet"),n.setAttribute("focusable","false"),o&&o.viewBox&&n.setAttribute("viewBox",o.viewBox),n}_fetchIcon(n){let{url:o,options:r}=n,a=r?.withCredentials??!1;if(!this._httpClient)throw mM();if(o==null)throw Error(`Cannot fetch icon from URL "${o}".`);let i=this._sanitizer.sanitize(we.RESOURCE_URL,o);if(!i)throw fE(o);let s=this._inProgressUrlFetches.get(i);if(s)return s;let c=this._httpClient.get(i,{responseType:"text",withCredentials:a}).pipe(A(l=>ci(l)),Et(()=>this._inProgressUrlFetches.delete(i)),kl());return this._inProgressUrlFetches.set(i,c),c}_addSvgIconConfig(n,o,r){return this._svgIconConfigs.set(hE(n,o),r),this}_addSvgIconSetConfig(n,o){let r=this._iconSetConfigs.get(n);return r?r.push(o):this._iconSetConfigs.set(n,[o]),this}_svgElementFromConfig(n){if(!n.svgElement){let o=this._svgElementFromString(n.svgText);this._setSvgAttributes(o,n.options),n.svgElement=o}return n.svgElement}_getIconConfigFromResolvers(n,o){for(let r=0;r<this._resolvers.length;r++){let a=this._resolvers[r](o,n);if(a)return hM(a)?new mt(a.url,null,a.options):new mt(a,null)}}static \u0275fac=function(o){return new(o||e)(I(yf,8),I(bf),I(U,8),I(_e))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function al(e){return e.cloneNode(!0)}function hE(e,t){return e+":"+t}function hM(e){return!!(e.url&&e.options)}var gM=["*"],vM=new C("MAT_ICON_DEFAULT_OPTIONS"),yM=new C("mat-icon-location",{providedIn:"root",factory:bM});function bM(){let e=p(U),t=e?e.location:null;return{getPathname:()=>t?t.pathname+t.search:""}}var vE=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],EM=vE.map(e=>`[${e}]`).join(", "),CM=/^url\(['"]?#(.*?)['"]?\)$/,yE=(()=>{class e{_elementRef=p(pe);_iconRegistry=p(gE);_location=p(yM);_errorHandler=p(_e);_defaultColor;get color(){return this._color||this._defaultColor}set color(n){this._color=n}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(n){n!==this._svgIcon&&(n?this._updateSvgIcon(n):this._svgIcon&&this._clearSvgElement(),this._svgIcon=n)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(n){let o=this._cleanupFontValue(n);o!==this._fontSet&&(this._fontSet=o,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(n){let o=this._cleanupFontValue(n);o!==this._fontIcon&&(this._fontIcon=o,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName;_svgNamespace;_previousPath;_elementsWithExternalReferences;_currentIconFetch=J.EMPTY;constructor(){let n=p(new qt("aria-hidden"),{optional:!0}),o=p(vM,{optional:!0});o&&(o.color&&(this.color=this._defaultColor=o.color),o.fontSet&&(this.fontSet=o.fontSet)),n||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(n){if(!n)return["",""];let o=n.split(":");switch(o.length){case 1:return["",o[0]];case 2:return o;default:throw Error(`Invalid icon name: "${n}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let n=this._elementsWithExternalReferences;if(n&&n.size){let o=this._location.getPathname();o!==this._previousPath&&(this._previousPath=o,this._prependPathToReferences(o))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(n){this._clearSvgElement();let o=this._location.getPathname();this._previousPath=o,this._cacheChildrenWithExternalReferences(n),this._prependPathToReferences(o),this._elementRef.nativeElement.appendChild(n)}_clearSvgElement(){let n=this._elementRef.nativeElement,o=n.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();o--;){let r=n.childNodes[o];(r.nodeType!==1||r.nodeName.toLowerCase()==="svg")&&r.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let n=this._elementRef.nativeElement,o=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(r=>r.length>0);this._previousFontSetClass.forEach(r=>n.classList.remove(r)),o.forEach(r=>n.classList.add(r)),this._previousFontSetClass=o,this.fontIcon!==this._previousFontIconClass&&!o.includes("mat-ligature-font")&&(this._previousFontIconClass&&n.classList.remove(this._previousFontIconClass),this.fontIcon&&n.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(n){return typeof n=="string"?n.trim().split(" ")[0]:n}_prependPathToReferences(n){let o=this._elementsWithExternalReferences;o&&o.forEach((r,a)=>{r.forEach(i=>{a.setAttribute(i.name,`url('${n}#${i.value}')`)})})}_cacheChildrenWithExternalReferences(n){let o=n.querySelectorAll(EM),r=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let a=0;a<o.length;a++)vE.forEach(i=>{let s=o[a],c=s.getAttribute(i),l=c?c.match(CM):null;if(l){let u=r.get(s);u||(u=[],r.set(s,u)),u.push({name:i,value:l[1]})}})}_updateSvgIcon(n){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),n){let[o,r]=this._splitIconName(n);o&&(this._svgNamespace=o),r&&(this._svgName=r),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(r,o).pipe(je(1)).subscribe(a=>this._setSvgElement(a),a=>{let i=`Error retrieving icon ${o}:${r}! ${a.message}`;this._errorHandler.handleError(new Error(i))})}}static \u0275fac=function(o){return new(o||e)};static \u0275cmp=ue({type:e,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(o,r){o&2&&(Dn("data-mat-icon-type",r._usingFontIcon()?"font":"svg")("data-mat-icon-name",r._svgName||r.fontIcon)("data-mat-icon-namespace",r._svgNamespace||r.fontSet)("fontIcon",r._usingFontIcon()?r.fontIcon:null),Rp(r.color?"mat-"+r.color:""),Se("mat-icon-inline",r.inline)("mat-icon-no-color",r.color!=="primary"&&r.color!=="accent"&&r.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",ze],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:gM,decls:1,vars:0,template:function(o,r){o&1&&(br(),qn(0))},styles:[`mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color, inherit)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}
`],encapsulation:2,changeDetection:0})}return e})(),bE=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=ce({type:e});static \u0275inj=re({imports:[si,si]})}return e})();function _M(e,t){if(e&1&&(D(0,"div",1)(1,"h2"),b(2,"Informaci\xF3n general"),h(),D(3,"ul",2)(4,"li")(5,"span",3),b(6,"language"),h(),D(7,"strong"),b(8,"Idioma:"),h(),b(9),h(),D(10,"li")(11,"span",3),b(12,"payments"),h(),D(13,"strong"),b(14,"Moneda:"),h(),b(15),h(),D(16,"li")(17,"span",3),b(18,"schedule"),h(),D(19,"strong"),b(20,"Hora:"),h(),b(21),h(),D(22,"li")(23,"span",3),b(24,"wifi"),h(),D(25,"strong"),b(26,"Internet:"),h(),b(27),h(),D(28,"li")(29,"span",3),b(30,"power"),h(),D(31,"strong"),b(32,"Electricidad:"),h(),b(33),h(),D(34,"li")(35,"span",3),b(36,"badge"),h(),D(37,"strong"),b(38,"Pasaporte:"),h(),b(39),h(),D(40,"li")(41,"span",3),b(42,"assignment_turned_in"),h(),D(43,"strong"),b(44,"Visado:"),h(),b(45),h(),D(46,"li")(47,"span",3),b(48,"health_and_safety"),h(),D(49,"strong"),b(50,"Vacunas:"),h(),b(51),h()()()),e&2){let n=V();_(9),le(" ",n.infoGeneral.idioma," "),_(6),le(" ",n.infoGeneral.moneda," "),_(6),le(" ",n.infoGeneral.hora," "),_(6),le(" ",n.infoGeneral.internet," "),_(6),le(" ",n.infoGeneral.electricidad," "),_(6),le(" ",n.infoGeneral.pasaporte," "),_(6),le(" ",n.infoGeneral.visado," "),_(6),le(" ",n.infoGeneral.vacunas," ")}}var il=class e{infoGeneral;static \u0275fac=function(n){return new(n||e)};static \u0275cmp=ue({type:e,selectors:[["app-info-general"]],inputs:{infoGeneral:"infoGeneral"},decls:1,vars:1,consts:[["class","info-container",4,"ngIf"],[1,"info-container"],[1,"info-list"],[1,"material-icons"]],template:function(n,o){n&1&&X(0,_M,52,8,"div",0),n&2&&S("ngIf",o.infoGeneral)},dependencies:[We,dt],styles:[".info-container[_ngcontent-%COMP%]{margin:30px 0;padding:24px;border-radius:14px;background:linear-gradient(135deg,#fff,#f6f8fa);box-shadow:0 8px 25px #0000001f}.info-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:20px;font-size:1.6rem;text-align:center}.info-list[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;align-items:center;gap:14px;padding:14px;border-radius:10px;background:#ffffffd9;box-shadow:0 2px 6px #00000014}.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:28px;color:#2c7be5}.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;font-size:.85rem;color:#555}.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.95rem;color:#222}"]})};var EE={production:!1,cloudinary:{cloudName:"dre38ikvk",uploadPreset:"aventourarte_unsigned",baseFolder:"aventourarte"}};var Lr=class e{cloud=EE.cloudinary.cloudName;url(t,n={}){if(!t)return"";if(!t.startsWith("cld:"))return t;let o=t.replace(/^cld:/,"").replace(/^\/+/,""),r=n.quality??"auto",a=n.format??"auto",i=[`q_${r}`,`f_${a}`];n.dpr&&i.push(`dpr_${n.dpr}`),n.w&&i.push(`w_${n.w}`),n.h&&i.push(`h_${n.h}`),n.crop&&i.push(`c_${n.crop}`),n.gravity&&i.push(`g_${n.gravity}`),n.effect&&i.push(`e_${n.effect}`);let s=i.join(",");return`https://res.cloudinary.com/${this.cloud}/image/upload/${s}/${o}`}background(t,n,o){let r=n?1400:2600;return this.url(t,{w:r,crop:"scale",quality:"auto",format:"auto",dpr:"auto"})}static \u0275fac=function(n){return new(n||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})};var sl=class e{constructor(t){this.img=t}transform(t,n,o,r="fit"){return this.img.url(t,{w:n,h:o,crop:r,quality:"auto",format:"auto"})}static \u0275fac=function(n){return new(n||e)(K(Lr,16))};static \u0275pipe=Js({name:"imgUrl",type:e,pure:!0})};var DE={path:"europa/espana/andalucia/cadiz/jerez-de-la-frontera",nombre:"Jerez de la Frontera",flag:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",background:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",bgPos:"50% 60%",bgPosMobile:"50% 60%",bgDim:.12,flagOpacity:.12,flagOpacityMobile:.18,flagSize:"75%",flagSizeMobile:"50%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`Jerez de la Frontera es una de las ciudades con m\xE1s personalidad de Andaluc\xEDa. Mundialmente conocida por sus vinos, por el caballo cartujano, por ser cuna del flamenco y por su v\xEDnculo con el motor, combina patrimonio, tradici\xF3n y una forma de vivir muy marcada por su identidad propia.

Aqu\xED conviven bodegas hist\xF3ricas, iglesias monumentales, tabancos con duende, plazas llenas de vida y barrios donde el flamenco no se entiende como espect\xE1culo, sino como parte natural de la ciudad.

Jerez no se disfruta solo viendo monumentos: se vive entre una copa de fino, un paseo por su centro hist\xF3rico, una parada en una bodega, el sonido de una buler\xEDa inesperada y esa mezcla tan suya de elegancia, ra\xEDz popular y car\xE1cter andaluz.`,secciones:[{titulo:"Historia",contenido:`La historia de Jerez de la Frontera es el resultado de muchas capas culturales superpuestas a lo largo de los siglos. Sus ra\xEDces antiguas pasan por el mundo romano y musulm\xE1n, y la antigua Sherish dej\xF3 una huella decisiva en el trazado urbano y en parte de su patrimonio m\xE1s emblem\xE1tico.

Tras la conquista cristiana, Jerez reforz\xF3 su importancia estrat\xE9gica, agr\xEDcola y comercial, pero con el paso del tiempo fue el vino lo que la proyect\xF3 definitivamente al mundo. El nombre de Jerez qued\xF3 unido para siempre al Sherry, generando no solo riqueza econ\xF3mica, sino tambi\xE9n una cultura urbana, arquitect\xF3nica y social muy singular.

A esa identidad vin\xEDcola se suman otros pilares fundamentales: el caballo, el flamenco, las grandes celebraciones populares y un centro hist\xF3rico donde tradici\xF3n y modernidad conviven con mucha naturalidad.

Jerez no es una ciudad de una sola historia, sino de muchas historias que han acabado formando una personalidad muy reconocible.`},{titulo:"Geograf\xEDa y Clima",contenido:`Jerez de la Frontera se sit\xFAa en el interior de la provincia de C\xE1diz, en una posici\xF3n estrat\xE9gica entre la Bah\xEDa, la campi\xF1a y las puertas de la Sierra de C\xE1diz. Su t\xE9rmino municipal es uno de los m\xE1s amplios de Espa\xF1a y conecta paisaje urbano, vi\xF1edos, campos agr\xEDcolas y espacios naturales de gran valor.

Esta localizaci\xF3n explica muy bien su car\xE1cter. Jerez es ciudad, pero tambi\xE9n campo. Es casco hist\xF3rico monumental, pero tambi\xE9n vi\xF1a, hacienda, bodega y cultura rural vinculada al vino.

Disfruta de un clima mediterr\xE1neo suave con influencia atl\xE1ntica, con inviernos moderados, veranos calurosos y muchas horas de sol a lo largo del a\xF1o.

\u{1F4A1} Consejo viajero:
Jerez se disfruta much\xEDsimo caminando su centro hist\xF3rico, pero tambi\xE9n entendiendo que su identidad no termina en sus calles: la vi\xF1a, las bodegas, el caballo y el entorno forman parte esencial de la experiencia.`},{titulo:"Qu\xE9 visitar en Jerez de la Frontera",lugares:[{nombre:"Centro Cultural Lola Flores",descripcion:`Una de las mejores formas de empezar a entender Jerez es acercarte a una de sus figuras m\xE1s universales: Lola Flores. Este espacio cultural, ubicado en la Plaza de Bel\xE9n, rinde homenaje a su vida, a su arte y a todo lo que representa dentro de la identidad jerezana.

La visita es muy interactiva y emocional, con vestidos ic\xF3nicos, joyas, fotograf\xEDas personales, recuerdos familiares y fragmentos audiovisuales que ayudan a entender por qu\xE9 Lola Flores no fue solo una artista, sino un s\xEDmbolo cultural de enorme fuerza.

\u{1F483} Experiencia viajera:
No es solo un museo biogr\xE1fico. Es una puerta de entrada al alma popular, art\xEDstica y flamenca de Jerez.

\u{1F3A7} Adem\xE1s, la entrada suele incluir una audiogu\xEDa descargable en el m\xF3vil, lo que hace la visita m\xE1s inmersiva y personal.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:"Lunes cerrado \xB7 Martes a jueves de 10:00 a 14:00 \xB7 Viernes y s\xE1bados de 10:00 a 14:00 y de 16:00 a 19:00 \xB7 Domingos de 10:00 a 14:00",precio:"Entrada general: 10 \u20AC \xB7 Reducida: 6 \u20AC \xB7 Ni\xF1os de 5 a 14 a\xF1os: 5 \u20AC \xB7 Menores de 5 a\xF1os: gratis"},{nombre:"Bodegas Fundador",descripcion:`Las Bodegas Fundador son una de las grandes visitas imprescindibles de Jerez y un lugar clave para entender la identidad vin\xEDcola de la ciudad. Fundadas en 1730, est\xE1n consideradas las bodegas m\xE1s antiguas de Jerez y el espacio donde naci\xF3 el primer brandy espa\xF1ol.

Recorrer este complejo hist\xF3rico es adentrarse en siglos de tradici\xF3n, arquitectura bodeguera y cultura del vino. Entre sus rincones m\xE1s espectaculares destaca la famosa Bodega La Mezquita, un espacio monumental de enormes dimensiones cuyos arcos recuerdan visualmente a la Mezquita de C\xF3rdoba.

\u{1F377} Experiencia viajera:
Aqu\xED no solo visitas una bodega: entras de lleno en una de las ra\xEDces m\xE1s profundas de Jerez. El aroma de la madera, las botas firmadas por personalidades hist\xF3ricas y la atm\xF3sfera de crianza convierten la experiencia en una parada con much\xEDsimo peso dentro de la ruta.

Adem\xE1s, seg\xFAn la modalidad elegida, la visita puede completarse con catas de vinos, brandis y experiencias maridadas que elevan mucho el recorrido.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:"Lunes cerrado \xB7 Martes a jueves de 11:30 a 14:00 \xB7 Viernes de 11:30 a 14:00 y de 18:30 a 21:00 \xB7 S\xE1bados de 10:30 a 15:30 y de 18:30 a 21:30 \xB7 Domingos cerrado",precio:"Visita est\xE1ndar: 15 \u20AC \u2013 18 \u20AC \xB7 Visitas premium y catas maridadas: desde 25 \u20AC hasta 50 \u20AC"},{nombre:"Catedral de Jerez (San Salvador)",descripcion:`La Catedral de San Salvador de Jerez de la Frontera es una de las grandes joyas monumentales de la ciudad y uno de esos lugares que ayudan a entender su peso hist\xF3rico, art\xEDstico y religioso.

Situada en pleno casco hist\xF3rico, combina estilos g\xF3tico, renacentista y barroco en una construcci\xF3n imponente que resume siglos de transformaci\xF3n arquitect\xF3nica.

M\xE1s que una iglesia monumental, es uno de los grandes s\xEDmbolos visuales y culturales de Jerez.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/catedral-jerez",horario:`Lunes: 10:00 \u2013 19:30
Martes a viernes: 10:00 \u2013 20:00
S\xE1bados: 12:00 \u2013 20:00
Domingos: 13:00 \u2013 20:00

El acceso tur\xEDstico se interrumpe durante las celebraciones lit\xFArgicas.
Se recomienda llegar al menos 45 minutos antes del cierre.`,precio:`Entrada general: 7 \u20AC
Entrada reducida: 5 \u20AC
Entrada combinada (Catedral + Torre): 8 \u20AC \u2013 10 \u20AC
Menores de 12 a\xF1os: Gratis`},{nombre:"Bodegas T\xEDo Pepe (Gonz\xE1lez Byass)",descripcion:`Las Bodegas T\xEDo Pepe son uno de los grandes iconos de Jerez de la Frontera y uno de los complejos bodegueros m\xE1s visitados de Europa.

Situadas junto al Alc\xE1zar y la Catedral, forman casi una peque\xF1a ciudad dentro de la ciudad, con calles emparradas, patios y bodegas hist\xF3ricas donde se respira la esencia del vino de Jerez.

Es una de las visitas m\xE1s completas para entender la tradici\xF3n vin\xEDcola de la zona y el peso cultural que tiene en la identidad jerezana.

\u{1F377} Experiencia viajera:
Aqu\xED no vienes solo a catar vino, vienes a recorrer un lugar vivo. Pasear por la calle Ciegos, rodeado de botas y parras, es uno de esos momentos que se te quedan.

Destaca la Bodega La Concha, dise\xF1ada por Gustave Eiffel, y tradiciones curiosas como la de los ratones bebedores con su copita de vino dulce.

Parte del recorrido se realiza en un peque\xF1o tren, lo que hace la experiencia a\xFAn m\xE1s especial y te permite entender la magnitud real del complejo.

\u2728 Consejo AvenTourArte:
Reserva con antelaci\xF3n y, si puedes, elige una visita con tapas o cata ampliada. La experiencia gana much\xEDsimo.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:`Lunes a viernes: 11:30 \u2013 13:00 y 16:00 \u2013 17:00
S\xE1bados y domingos: 11:00 \u2013 13:00

Pases guiados con horarios fijos por idioma.
Se recomienda reservar con antelaci\xF3n.`,precio:`Experiencia T\xEDo Pepe: 25,50 \u20AC (visita + cata de 2 vinos)
Visita con Tapas: 30,50 \u20AC (visita + vinos + tapas)
Visita Premium VORS: 50,00 \u20AC (vinos de m\xE1s de 30 a\xF1os)`},{nombre:"Alc\xE1zar de Jerez",descripcion:`El Conjunto Monumental del Alc\xE1zar de Jerez es uno de los lugares m\xE1s importantes que ver en la ciudad y uno de los mejores ejemplos de arquitectura almohade en Espa\xF1a.

Construido en el siglo XII, es una de las pocas fortalezas isl\xE1micas que se conservan casi completas, lo que convierte la visita en un aut\xE9ntico viaje al pasado de Al-\xC1ndalus entre murallas, patios y espacios llenos de historia.

Dentro del recinto destacan la mezquita \u2014la \xFAnica que se conserva del antiguo Jerez isl\xE1mico\u2014, los ba\xF1os \xE1rabes con sus salas originales y lucernas en forma de estrella, y la C\xE1mara Oscura, situada en la Torre del Homenaje del Palacio de Villavicencio.

A trav\xE9s de un sistema de espejos y lentes, la C\xE1mara Oscura proyecta en tiempo real una imagen de la ciudad sobre una superficie, permiti\xE9ndote ver Jerez en movimiento desde una perspectiva \xFAnica.

\u{1F33F} Experiencia viajera:
Pasear por el Alc\xE1zar es bajar el ritmo y dejarte llevar por una atm\xF3sfera tranquila, casi silenciosa, muy diferente al bullicio del centro. Los jardines, amplios y cuidados, invitan a recorrerlo sin prisas, mientras que la C\xE1mara Oscura a\xF1ade un punto sorprendente y diferente a la visita.

\u{1F4A1} Consejo AvenTourArte:
Nada m\xE1s entrar, pregunta por el siguiente pase de la C\xE1mara Oscura, ya que funcionan cada 30 minutos aproximadamente y el aforo es muy limitado (unas 10-15 personas). Ten en cuenta que depende de la luz solar, por lo que en d\xEDas muy nublados puede no estar disponible. Adem\xE1s, entra temprano porque el Alc\xE1zar tiene horario solo de ma\xF1ana.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:`Lunes a domingo: 08:30 \u2013 14:30

Verano (julio y agosto): posible ampliaci\xF3n en horario de tarde`,precio:`Entrada general: 5 \u20AC
Entrada combinada (Alc\xE1zar + C\xE1mara Oscura): 7 \u20AC
Tarifa reducida: 1,80 \u20AC
Ni\xF1os hasta 5 a\xF1os: Gratis`},{nombre:"Plaza del Arenal",descripcion:`Despu\xE9s del Alc\xE1zar, el itinerario desemboca de forma natural en uno de los grandes espacios urbanos de Jerez: la Plaza del Arenal.

Aqu\xED se mezclan historia, vida cotidiana y algunos elementos muy reconocibles como la estatua de Primo de Rivera o el edificio de La Alh\xF3ndiga con sus arcos.

\u{1F3DB}\uFE0F Experiencia viajera:
Es una plaza para ver y tambi\xE9n para sentir. Una de esas zonas donde Jerez se muestra viva, abierta y cotidiana.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:"Acceso libre",precio:"Gratis"},{nombre:"The Sherry Gallery",descripcion:`The Sherry Gallery es uno de los espacios m\xE1s originales y diferentes de Jerez, donde el vino se mezcla con el arte en un entorno \xFAnico.

Ubicado en el Palacio de San Dionisio, en plena Plaza de la Asunci\xF3n, este centro ofrece una forma distinta de entender la cultura del vino de Jerez, combinando exposici\xF3n, experiencia sensorial y catas en un entorno muy cuidado.

Aqu\xED descubrir\xE1s el universo del sherry desde un enfoque moderno: desde la vi\xF1a y la albariza hasta los distintos tipos de vino, todo acompa\xF1ado de una selecci\xF3n muy interesante de referencias, muchas de ellas dif\xEDciles de encontrar.

\u{1F3A8} Experiencia viajera:
Es un sitio que rompe con lo t\xEDpico. M\xE1s \xEDntimo, m\xE1s moderno y con un enfoque muy visual. Ideal si quieres entender el vino de Jerez sin irte a la bodega cl\xE1sica.

\u{1F4A1} Consejo AvenTourArte:
Si puedes, a\xF1ade la cata. Es donde realmente cobra sentido la visita. Y si te gusta el vino, merece mucho la pena probar opciones VOS o VORS para entender la diferencia de envejecimiento.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:`Pases guiados:
10:00 | 11:30 | 13:00 | 18:00

Todos los d\xEDas excepto festivos nacionales y algunos locales`,precio:`Entrada general: 15 \u20AC
Entrada + cata 2 vinos: 20 \u20AC
Entrada + cata 4 vinos: 25 \u20AC

Entrada + cata 2 vinos VOS (+20 a\xF1os): 30 \u20AC
Entrada + cata 2 vinos VORS (+30 a\xF1os): 50 \u20AC

Descuentos:
Jubilados: -40%
Estudiantes: -30%
Residentes en Jerez: -50%`},{nombre:"Iglesia de San Miguel",descripcion:`La Iglesia de San Miguel es uno de los monumentos religiosos m\xE1s impresionantes de Jerez y uno de los grandes s\xEDmbolos del barrio que lleva su nombre.

Declarada Bien de Inter\xE9s Cultural, destaca por su espectacular arquitectura, que mezcla el g\xF3tico jerezano con elementos renacentistas y barrocos, reflejando siglos de historia en un solo edificio.

Situada en el coraz\xF3n del barrio de San Miguel \u2014uno de los grandes focos del flamenco en la ciudad y lugar de nacimiento de Lola Flores\u2014, la visita tiene un valor que va m\xE1s all\xE1 de lo puramente arquitect\xF3nico.

En su interior no te puedes perder el impresionante retablo mayor, considerado uno de los mejores de Andaluc\xEDa, ni la Capilla del Sagrario, una aut\xE9ntica joya del barroco local.

\u{1F3B6} Experiencia viajera:
Aqu\xED no solo visitas una iglesia, visitas parte del alma de Jerez. El entorno, el barrio y la historia flamenca que la rodea hacen que la experiencia tenga un car\xE1cter muy especial.

\u{1F4A1} Consejo AvenTourArte:
Despu\xE9s de la visita, date un paseo por la plaza y el barrio de San Miguel. Es perfecto para continuar la ruta con alg\xFAn tabanco y seguir empap\xE1ndote del ambiente m\xE1s aut\xE9ntico.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:`Lunes a s\xE1bado: 10:00 \u2013 17:30
Domingos: solo abierto para misas (sin visita tur\xEDstica)`,precio:`Entrada general: 6 \u20AC
Entrada reducida: 4 \u20AC
Entrada combinada con Catedral: disponible seg\xFAn temporada
Menores de 12 a\xF1os: Gratis`},{nombre:"Casa natal de Lola Flores",descripcion:`La casa natal de Lola Flores se encuentra en el emblem\xE1tico barrio de San Miguel, uno de los lugares con m\xE1s alma de Jerez.

Aqu\xED naci\xF3 \u201CLa Faraona\u201D el 21 de enero de 1923, convirtiendo esta peque\xF1a vivienda en un punto de referencia para entender sus or\xEDgenes y la conexi\xF3n con el barrio que la vio crecer.

Eso s\xED, es importante saber que la casa es una propiedad privada y no se puede visitar por dentro. Solo es posible ver su fachada, donde una placa conmemorativa recuerda el nacimiento de la artista.

\u{1F3B6} Experiencia viajera:
M\xE1s que una visita como tal, es una parada simb\xF3lica. Est\xE1s en el lugar donde empez\xF3 todo, en pleno barrio flamenco, lo que le da un valor especial si te interesa la historia de Lola Flores y la cultura jerezana.

\u{1F4A1} Consejo AvenTourArte:
Aprovecha la parada para hacer una mini ruta por el barrio: ac\xE9rcate al monumento a Lola Flores en la Plaza de la Cruz Vieja, visita la Iglesia de San Miguel y termina en alg\xFAn tabanco cercano para vivir el ambiente real de la zona.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:"Exterior visitable en cualquier momento",precio:"Gratis"},{nombre:"Bodegas \xC1lvaro Domecq",descripcion:`Las Bodegas \xC1lvaro Domecq son una de las firmas con m\xE1s solera de Jerez, destacando por su enfoque artesanal y su fuerte v\xEDnculo con el mundo del caballo y el arte ecuestre.

Ubicadas en una antigua bodega del siglo XIX, conservan todo el encanto de la arquitectura tradicional jerezana, con naves de crianza donde el tiempo y el cuidado manual siguen siendo protagonistas.

A diferencia de otras bodegas m\xE1s grandes, aqu\xED el proceso es m\xE1s cercano y cuidado, manteniendo t\xE9cnicas tradicionales como el \u201Ccabeceo\u201D manual, lo que se refleja en la calidad de sus vinos y brandis, entre ellos sus reconocidos VORS y el Brandy Duque de Veragua.

\u{1F377} Experiencia viajera:
Es una visita m\xE1s \xEDntima y aut\xE9ntica, ideal si quieres entender el lado m\xE1s artesanal del vino de Jerez. Todo se siente m\xE1s cercano, m\xE1s pausado y m\xE1s real.

\u{1F4A1} Consejo AvenTourArte:
Reserva con antelaci\xF3n porque las visitas son en grupos reducidos. Si te gusta el mundo del caballo, pregunta por experiencias combinadas: la familia Domecq est\xE1 muy ligada a la Real Escuela Andaluza del Arte Ecuestre.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:`Lunes a jueves: 08:00 \u2013 17:00
Viernes: 08:00 \u2013 15:00
S\xE1bados y domingos: 11:00 \u2013 14:00

Visitas guiadas con reserva previa`,precio:`Visita est\xE1ndar: 15 \u20AC \u2013 18 \u20AC
Catas especiales: 30 \u20AC \u2013 40 \u20AC aprox.`},{nombre:"Mercado Central de Abastos",descripcion:`El Mercado Central de Abastos de Jerez es uno de los lugares con m\xE1s vida de la ciudad y un imprescindible si quieres ver el d\xEDa a d\xEDa m\xE1s aut\xE9ntico.

Ubicado en un edificio hist\xF3rico de estilo neocl\xE1sico de finales del siglo XIX, destaca por su arquitectura y por el ambiente que se genera cada ma\xF1ana entre puestos, vendedores y vecinos.

Aqu\xED encontrar\xE1s producto local de primera calidad, especialmente pescado y marisco fresco tra\xEDdo de la costa de C\xE1diz y Sanl\xFAcar, adem\xE1s de quesos de la Sierra, carnes de retinto, aceitunas y fruta de temporada.

\u{1F41F} Experiencia viajera:
Es el sitio perfecto para entender c\xF3mo se vive Jerez m\xE1s all\xE1 del turismo. Ruido, movimiento, producto fresco y ese ambiente tan aut\xE9ntico que tienen los mercados de toda la vida.

\u{1F4A1} Consejo AvenTourArte:
Ve entre las 09:00 y las 12:00 para verlo en su mejor momento. Y al salir, no te vayas: qu\xE9date por la zona, pilla unos churros o una copa de fino en los bares cercanos y vive el aut\xE9ntico \u201Cmomento Jerez\u201D.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:`Lunes a s\xE1bado: 08:00 \u2013 14:45
Domingos: cerrado`,precio:"Acceso gratuito"},{nombre:"El Gallo Azul",descripcion:`El Gallo Azul es uno de los edificios m\xE1s ic\xF3nicos y fotografiados de Jerez, situado en pleno cruce de la calle Larga, marcando el coraz\xF3n comercial y social de la ciudad.

Construido en 1928 por el arquitecto An\xEDbal Gonz\xE1lez (el mismo de la Plaza de Espa\xF1a de Sevilla), su estructura circular, columnas de m\xE1rmol y estilo neomud\xE9jar lo convierten en una aut\xE9ntica joya arquitect\xF3nica.

Hoy en d\xEDa funciona como gastrobar y restaurante, combinando historia con una propuesta gastron\xF3mica actual donde puedes tapear, tomar una copa de Jerez o disfrutar de platos m\xE1s elaborados.

\u{1F377} Experiencia viajera:
Es uno de esos lugares donde todo pasa. Sentarte aqu\xED es ver el ritmo de Jerez en directo: gente paseando, ambiente constante y ese punto elegante pero cercano.

\u{1F4A1} Consejo AvenTourArte:
Si puedes, si\xE9ntate en la terraza o sube a la planta superior para disfrutar de las vistas. Es un sitio perfecto para empezar o terminar un paseo por el centro.

\u{1F449} Recomendado:
Copa de vino de Jerez
Arroces
Carnes de retinto
Pescados frescos`,foto:"cld:europa/espana/andalucia/cadiz/jerez/gallo-azul",horario:`Lunes a jueves: 11:00 \u2013 20:00
Viernes y s\xE1bados: 11:00 \u2013 02:00
Domingos: 11:00 \u2013 00:00`,precio:"Precio medio: 15 \u20AC \u2013 30 \u20AC por persona"},{nombre:"Teatro Villamarta",descripcion:`El Teatro Villamarta es el principal referente cultural de Jerez y uno de los espacios m\xE1s importantes para entender la vida art\xEDstica de la ciudad.

Inaugurado en 1928 y dise\xF1ado por el arquitecto Teodoro Anasagasti, este edificio de estilo regionalista con detalles modernistas destaca por su imponente fachada y su ubicaci\xF3n en pleno centro.

Es la sede de algunos de los eventos m\xE1s importantes de Jerez, como el Festival de Jerez \u2014uno de los mayores referentes del flamenco a nivel mundial\u2014 y una programaci\xF3n estable de \xF3pera y zarzuela, algo poco habitual fuera de grandes capitales.

\u{1F3AD} Experiencia viajera:
Si tienes la oportunidad de coincidir con alg\xFAn espect\xE1culo, merece much\xEDsimo la pena. Ver flamenco, danza o m\xFAsica en este teatro a\xF1ade una dimensi\xF3n cultural muy potente a tu viaje.

\u{1F4A1} Consejo AvenTourArte:
Consulta la programaci\xF3n con antelaci\xF3n y compra entradas online, sobre todo en fechas del Festival de Jerez porque se agotan r\xE1pido. Si no tienes entrada, al menos ac\xE9rcate a ver el edificio y el ambiente de la zona.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/teatro-villamarta",horario:`Taquilla:
Ma\xF1anas: 10:30 \u2013 14:00
Tardes: 18:00 \u2013 21:00 (en d\xEDas de funci\xF3n hasta inicio del espect\xE1culo)`,precio:"Entradas: 15 \u20AC \u2013 60 \u20AC aprox. (seg\xFAn espect\xE1culo)"},{nombre:"Bodegas Lustau",descripcion:`Las Bodegas Lustau son una de las grandes referencias del vino de Jerez y una parada obligatoria si quieres profundizar en este mundo.

Fundadas en 1896, destacan por su filosof\xEDa de \u201CAlmacenista\u201D, apostando por vinos de peque\xF1os productores y estilos muy cuidados, lo que les ha valido reconocimiento internacional como una de las mejores bodegas de Espa\xF1a.

Sus instalaciones son de las m\xE1s impresionantes de la ciudad, con naves de crianza de techos alt\xEDsimos y estilo catedralicio. La Bodega Emperatriz Eugenia es uno de los espacios m\xE1s espectaculares que ver\xE1s en Jerez.

\u{1F377} Experiencia viajera:
Es una visita m\xE1s t\xE9cnica y completa, ideal si quieres entender de verdad los distintos tipos de vino de Jerez y probar referencias de alto nivel. Aqu\xED se viene a aprender\u2026 y a disfrutar.

\u{1F4A1} Consejo AvenTourArte:
Reserva con antelaci\xF3n porque los grupos son reducidos. Y no te vayas sin probar su vermut: es uno de los m\xE1s famosos de Jerez y perfecto para el aperitivo.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:`Lunes a viernes: 09:30 \u2013 16:00
S\xE1bados: 09:30 \u2013 15:00
Domingos: cerrado

Visitas guiadas: 10:00 | 11:30 | 13:30`,precio:`Visita est\xE1ndar: 25 \u20AC aprox.
Catas especiales: 35 \u20AC \u2013 45 \u20AC`},{nombre:"Iglesia y Claustros de Santo Domingo",descripcion:`El conjunto de la Iglesia y los Claustros de Santo Domingo es uno de los espacios monumentales m\xE1s importantes de Jerez, situado al final de la Calle Larga, en la Alameda Cristina.

El Real Convento de Santo Domingo, fundado tras la Reconquista en el siglo XIII, mezcla estilos g\xF3tico, renacentista y barroco, destacando por su impresionante fachada y su importancia religiosa dentro de la ciudad.

En su interior sobresale el retablo mayor y la imagen de la Virgen de la Consolaci\xF3n, copatrona de Jerez y muy querida por los jerezanos.

Anexos a la iglesia se encuentran los Claustros de Santo Domingo, una aut\xE9ntica joya arquitect\xF3nica de estilo g\xF3tico y mud\xE9jar. Tras su restauraci\xF3n, hoy funcionan como un espacio cultural donde se celebran exposiciones, ferias y eventos durante todo el a\xF1o.

\u{1F3DB}\uFE0F Experiencia viajera:
Es uno de esos lugares donde se combinan perfectamente historia y vida actual. Puedes pasar de un templo con siglos de historia a un espacio cultural activo en cuesti\xF3n de pasos.

\u{1F4A1} Consejo AvenTourArte:
Consulta si hay alguna exposici\xF3n en los claustros antes de ir, porque el entorno gana much\xEDsimo con eventos. Y aprovecha la ubicaci\xF3n para continuar la ruta por la Alameda Cristina.`,fotos:["cld:europa/espana/andalucia/cadiz/jerez/jerez-flag","cld:europa/espana/andalucia/cadiz/jerez/claustro-santo-domingo"],horario:`Iglesia:
Martes a viernes: 10:30 \u2013 13:30 | 18:00 \u2013 21:00
S\xE1bados: 10:00 \u2013 13:15
Lunes y domingos: cerrado a visitas (excepto culto)

Claustros:
Martes a viernes: 10:30 \u2013 13:30 | 18:00 \u2013 21:00
S\xE1bados: 10:00 \u2013 13:45
Lunes y domingos: cerrado`,precio:`Iglesia: gratuito (donativo)
Claustros: aprox. 2 \u20AC o gratuito seg\xFAn exposici\xF3n`},{nombre:"Plaza del Mamel\xF3n",descripcion:`La Plaza del Mamel\xF3n es uno de los espacios m\xE1s elegantes y tranquilos de Jerez, funcionando como transici\xF3n entre el centro hist\xF3rico y las zonas m\xE1s residenciales de la ciudad.

Su elemento central es un gran estanque rectangular con surtidores, que aporta un ambiente muy relajado y refrescante, ideal para hacer una pausa durante la ruta.

Uno de sus grandes protagonistas es el Palacio de Domecq, situado en uno de los laterales, considerado la casa-palacio m\xE1s impresionante de Jerez y un referente del barroco del siglo XVIII.

Rodeada de \xE1rboles maduros y edificios se\xF1oriales, la plaza mantiene un aire distinguido y calmado, muy diferente al bullicio de la Calle Larga.

\u{1F33F} Experiencia viajera:
Es el sitio perfecto para bajar el ritmo, sentarte un rato junto al agua y disfrutar del entorno. Un peque\xF1o descanso que se agradece mucho despu\xE9s de recorrer el centro.

\u{1F4A1} Consejo AvenTourArte:
P\xE1sate al atardecer, cuando la luz y el ambiente hacen la plaza a\xFAn m\xE1s especial.`,fotos:["cld:europa/espana/andalucia/cadiz/jerez/plaza-mamelon","cld:europa/espana/andalucia/cadiz/jerez/plaza-mamelon-2"],horario:"Acceso libre 24 horas",precio:"Gratis"},{nombre:"Real Escuela Andaluza del Arte Ecuestre",descripcion:`La Real Escuela Andaluza del Arte Ecuestre es una de las instituciones m\xE1s prestigiosas del mundo dedicadas al caballo espa\xF1ol y una de las experiencias m\xE1s \xFAnicas que puedes vivir en Jerez.

Su espect\xE1culo m\xE1s famoso, \u201CC\xF3mo bailan los caballos andaluces\u201D, es un aut\xE9ntico ballet ecuestre donde los caballos realizan movimientos al ritmo de m\xFAsica espa\xF1ola, con jinetes vestidos al estilo del siglo XVIII.

Adem\xE1s del espect\xE1culo, el recinto permite visitar espacios muy interesantes como el Palacio del Recreo de las Cadenas, el picadero cubierto donde entrenan los caballos, los museos y las cuadras, donde se aprecia todo el trabajo artesanal detr\xE1s de esta tradici\xF3n.

\u{1F40E} Experiencia viajera:
No es solo un show, es una tradici\xF3n viva. Ver c\xF3mo se mueven los caballos con esa precisi\xF3n y elegancia es algo que impresiona incluso si no eres especialmente fan del mundo ecuestre.

\u{1F4A1} Consejo AvenTourArte:
Si vas al espect\xE1culo, llega con al menos 30-45 minutos de antelaci\xF3n para recorrer las instalaciones con calma. Compra entradas online porque suele llenarse, sobre todo en temporada alta.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:`Visitas (entrenamientos): lunes a s\xE1bados: 10:00 \u2013 13:00
Espect\xE1culo: martes y jueves a las 12:00 (puede ampliarse en temporada alta)
Domingos: cerrado`,precio:`Espect\xE1culo: 21 \u2013 30 \u20AC
Visita instalaciones: 11 \u20AC adultos | 6,50 \u20AC ni\xF1os/pensionistas`},{nombre:"Barrio de Santiago",descripcion:`El Barrio de Santiago es, junto con San Miguel, uno de los lugares con m\xE1s solera y tradici\xF3n flamenca de Jerez.

Aqu\xED naci\xF3 el cante por buler\xEDas y han salido algunos de los artistas m\xE1s importantes del flamenco, lo que convierte cada rinc\xF3n en un pedazo de historia viva.

El coraz\xF3n del barrio es la Iglesia de Santiago, una de las m\xE1s bellas de la ciudad, con una arquitectura que mezcla g\xF3tico y renacimiento, y muy ligada a la devoci\xF3n local. En su entorno se encuentra la Plaza de Santiago, punto de encuentro del barrio y uno de los lugares con m\xE1s ambiente aut\xE9ntico.

Muy cerca se encuentra el Museo Arqueol\xF3gico de Jerez, uno de los mejores de Andaluc\xEDa, donde podr\xE1s descubrir desde restos prehist\xF3ricos hasta la historia romana e isl\xE1mica de la zona.

El barrio tambi\xE9n es clave para vivir el flamenco de ra\xEDz, con pe\xF1as como la Pe\xF1a Flamenca T\xEDo Jos\xE9 de Paula y la Pe\xF1a Los Cern\xEDcalos, donde el cante se vive de forma cercana y aut\xE9ntica.

\u{1F3B6} Experiencia viajera:
Santiago no se visita, se siente. Es un barrio para caminar sin rumbo, escuchar, observar y dejarte llevar por ese ambiente tranquilo y aut\xE9ntico que todav\xEDa conserva.

\u{1F4A1} Consejo AvenTourArte:
Intenta cuadrar tu visita con alguna actividad en la Pe\xF1a Flamenca T\xEDo Jos\xE9 de Paula o la Pe\xF1a Los Cern\xEDcalos. Y si no, pi\xE9rdete sin prisa por sus calles: es donde realmente est\xE1 la magia.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/iglesia-santiago",horario:`Barrio: acceso libre

Iglesia de Santiago:
Horarios variables seg\xFAn culto
Apertura aproximada:
Lunes: 10:00 \u2013 13:00 | 17:30 \u2013 20:00
Resto de d\xEDas: principalmente en horario de misa

Museo Arqueol\xF3gico:
Martes a viernes: 10:00 \u2013 14:00
S\xE1bados, domingos y festivos: 10:00 \u2013 14:00
Lunes: cerrado

Pe\xF1as flamencas:
Horarios variables seg\xFAn programaci\xF3n`,precio:`Barrio: gratis
Iglesia: acceso gratuito (donativo)

Museo Arqueol\xF3gico: gratis para ciudadanos UE | aprox. 1,50 \u20AC resto

Pe\xF1as flamencas: precio variable seg\xFAn evento o consumici\xF3n`},{nombre:"Hospital de la Sangre",descripcion:`El Hospital de la Sangre (Hospital de Nuestro Se\xF1or Jesucristo) es uno de los edificios hist\xF3ricos m\xE1s emblem\xE1ticos del barrio de Santiago y un s\xEDmbolo de la tradici\xF3n solidaria de Jerez.

Fundado en 1485 para atender a los enfermos m\xE1s humildes, su historia ha estado siempre ligada a la ayuda social, evolucionando con el tiempo hasta convertirse en asilo y, hoy en d\xEDa, en un centro de emergencia social.

Situado en la conocida popularmente como \u201CCalle de la Sangre\u201D, este edificio destaca especialmente por su fachada, donde se mezcla el origen renacentista con una portada barroca del siglo XVIII.

Uno de sus elementos m\xE1s curiosos es el altorrelieve de alabastro que representa a Cristo resucitado, cuya pieza original se conserva en el Museo Arqueol\xF3gico, mientras que en la fachada se puede ver una r\xE9plica.

\u{1F3DB}\uFE0F Experiencia viajera:
Es uno de esos lugares que no impresionan por tama\xF1o, sino por historia. Representa siglos de ayuda y vida del barrio, lo que le da una carga emocional muy especial.

\u{1F4A1} Consejo AvenTourArte:
No se visita por dentro de forma general, pero merece la pena detenerse unos minutos a observar su fachada. Aprovecha para combinarlo con la Iglesia de Santiago y el Museo Arqueol\xF3gico, que est\xE1n a pocos pasos.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/hospital-sangre",horario:`Exterior visitable
Interior no abierto al p\xFAblico de forma general`,precio:"Gratis"},{nombre:"Bas\xEDlica de Nuestra Se\xF1ora de la Merced",descripcion:`La Bas\xEDlica de Nuestra Se\xF1ora de la Merced es uno de los centros espirituales m\xE1s importantes de Jerez, ya que alberga a la Patrona de la ciudad.

Situada en pleno barrio de Santiago, justo frente al hist\xF3rico Hospital de la Sangre, este templo destaca por su imponente fachada barroca del siglo XVII y por la profunda devoci\xF3n que despierta entre los jerezanos.

En su interior se encuentra la imagen de Nuestra Se\xF1ora de la Merced, una talla del siglo XIV que ocupa el retablo mayor y que es uno de los s\xEDmbolos m\xE1s queridos de la ciudad.

El conjunto se completa con el antiguo convento mercedario, ligado hist\xF3ricamente a la labor de redenci\xF3n de cautivos, lo que a\xF1ade a\xFAn m\xE1s valor hist\xF3rico al lugar.

\u26EA Experiencia viajera:
Es un sitio que transmite calma y recogimiento. M\xE1s all\xE1 de lo art\xEDstico, se siente la importancia que tiene para la ciudad y su gente.

\u{1F4A1} Consejo AvenTourArte:
Si visitas Jerez en septiembre, intenta coincidir con el d\xEDa 24 (D\xEDa de la Merced). Es uno de los momentos m\xE1s especiales del a\xF1o, con la procesi\xF3n de la patrona por el centro.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/basilica-merced",horario:`Lunes: 08:30 \u2013 13:00 | 19:30 \u2013 20:30
Martes a viernes: 08:00 \u2013 09:00 | 19:30 \u2013 20:30
S\xE1bados y domingos: 08:00 \u2013 09:00 | 12:30 \u2013 13:30 | 19:30 \u2013 20:30`,precio:"Gratis"},{nombre:"Zoobot\xE1nico de Jerez",descripcion:`El Zoobot\xE1nico de Jerez es uno de los parques m\xE1s antiguos y queridos de Espa\xF1a, y mucho m\xE1s que un simple zool\xF3gico.

Se trata de un espacio que combina zool\xF3gico, jard\xEDn bot\xE1nico y centro de conservaci\xF3n, siendo especialmente reconocido por su trabajo con especies amenazadas como el lince ib\xE9rico o el ibis eremita.

A lo largo del recorrido encontrar\xE1s una gran variedad de animales, pero tambi\xE9n una impresionante colecci\xF3n de \xE1rboles y plantas de todo el mundo, lo que convierte la visita en una experiencia muy completa y agradable.

\u{1F33F} Experiencia viajera:
Es un plan perfecto para desconectar del centro y pasar unas horas tranquilas rodeado de naturaleza. Ideal tanto si viajas en familia como si te apetece algo diferente en tu ruta por Jerez.

\u{1F4A1} Consejo AvenTourArte:
Ve con tiempo porque el parque es grande y merece la pena recorrerlo sin prisas. Si vas con ni\xF1os, el tren del zoo es un acierto. Primavera y oto\xF1o son las mejores \xE9pocas para disfrutarlo.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:`Martes a domingo: 10:00 \u2013 19:00
Lunes: cerrado (excepto festivos)

Taquillas cierran una hora antes`,precio:`Adultos: ~9,30 \u20AC
Ni\xF1os (2\u201314) y pensionistas: ~6,20 \u20AC
Menores de 2 a\xF1os: gratis`},{nombre:"Rancho Cortesano (Museo de la Miel)",descripcion:`El Rancho Cortesano es uno de los planes m\xE1s originales cerca de Jerez, combinando naturaleza, educaci\xF3n y gastronom\xEDa en un entorno rural muy cuidado.

Se trata de una cooperativa ap\xEDcola que ha convertido sus instalaciones en un centro de agroturismo, donde todo gira en torno al mundo de las abejas y la producci\xF3n de miel ecol\xF3gica.

Durante la visita puedes recorrer su museo, conocer c\xF3mo viven las abejas, ver las colmenas con traje de apicultor, participar en talleres como el de velas o huerto, y terminar disfrutando de su restaurante con productos de la propia finca.

\u{1F36F} Experiencia viajera:
Es un plan muy diferente a lo t\xEDpico de Jerez. Tranquilo, educativo y perfecto para desconectar del ritmo urbano, especialmente si viajas en familia.

\u{1F4A1} Consejo AvenTourArte:
Las actividades suelen empezar sobre las 11:00 (abejas) y 12:30 (huerto), as\xED que organiza bien la ma\xF1ana. Reserva con antelaci\xF3n tanto las actividades como el restaurante si vas en fin de semana.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:`Lunes a viernes: 08:30 \u2013 14:00
S\xE1bados y domingos: 08:30 \u2013 18:00

Horario sujeto a cambios seg\xFAn temporada`,precio:`Visita apicultura: 9,50 \u20AC adultos | 8 \u20AC \u2013 8,50 \u20AC ni\xF1os | 5 \u20AC menores de 3
Taller cer\xE1mica: 8 \u20AC
Taller huerto: 5 \u20AC

Desayuno: 4 \u20AC \u2013 6 \u20AC
Comida: 15 \u20AC \u2013 22 \u20AC

Tienda: productos desde 5 \u20AC \u2013 6 \u20AC`},{nombre:"Cartuja de Santa Mar\xEDa de la Defensi\xF3n",descripcion:`La Cartuja de Santa Mar\xEDa de la Defensi\xF3n es el conjunto monumental m\xE1s importante de la provincia de C\xE1diz y uno de los lugares m\xE1s impresionantes que ver cerca de Jerez.

Situada a las afueras, junto al r\xEDo Guadalete, este monasterio combina g\xF3tico tard\xEDo, renacimiento y barroco en un entorno tranquilo y casi aislado que ya de por s\xED merece la visita.

Entre sus elementos m\xE1s destacados se encuentran la espectacular portada renacentista de Andr\xE9s de Ribera, la impresionante fachada barroca de la iglesia y un interior de gran altura con b\xF3vedas g\xF3ticas que transmiten una sensaci\xF3n de grandeza y recogimiento.

Aunque gran parte de su patrimonio art\xEDstico original fue trasladado (como obras de Zurbar\xE1n), el conjunto sigue siendo uno de los espacios m\xE1s impactantes de la zona.

\u{1F3DB}\uFE0F Experiencia viajera:
Es un lugar que impone. M\xE1s silencioso, m\xE1s espiritual y completamente diferente al centro de Jerez. Aqu\xED vienes a desconectar y a disfrutar del patrimonio con calma.

\u{1F4A1} Consejo AvenTourArte:
Ten en cuenta que es un monasterio de clausura, as\xED que la visita est\xE1 limitada a algunas zonas. Aprovecha para pasar por la tienda de las hermanas, donde venden artesan\xEDa hecha a mano de gran calidad.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:`Martes a jueves: 10:00 \u2013 14:00
Viernes y s\xE1bados: 10:00 \u2013 14:00 | 16:30 \u2013 18:30
Lunes y domingos: cerrado`,precio:"Entrada: 5 \u20AC aprox."},{nombre:"Circuito de Jerez - \xC1ngel Nieto",descripcion:`El Circuito de Jerez - \xC1ngel Nieto es uno de los templos del motor a nivel mundial, conocido como la \u201CCatedral del Motociclismo\u201D.

Es sede habitual del Mundial de MotoGP y punto clave de pruebas para equipos de motos y automovilismo durante todo el a\xF1o, lo que lo convierte en una visita imprescindible si te gusta la velocidad.

Adem\xE1s de los grandes eventos, el circuito ofrece visitas guiadas donde puedes recorrer zonas normalmente restringidas como el paddock, los boxes, la sala de prensa o el podio, adem\xE1s de su museo con motos y veh\xEDculos hist\xF3ricos.

\u{1F3CD}\uFE0F Experiencia viajera:
Si coincides con un gran premio, el ambiente es brutal. Miles de aficionados, ruido de motores y una energ\xEDa \xFAnica que convierte la experiencia en algo inolvidable.

\u{1F4A1} Consejo AvenTourArte:
Para MotoGP, planifica todo con antelaci\xF3n (entradas, transporte y horarios). Si vas fuera de eventos, aprovecha los tours guiados para ver el circuito por dentro sin aglomeraciones.`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:`Visitas guiadas:
Martes, jueves y s\xE1bados
Turnos: 10:00 y 12:00

Eventos seg\xFAn calendario anual`,precio:`Visita guiada: 13 \u20AC adultos | 9 \u20AC menores
MotoGP: 60 \u20AC \u2013 160 \u20AC+ seg\xFAn zona
Otros eventos: precio variable`}]},{titulo:"Gastronom\xEDa",platos:[{nombre:"Ri\xF1ones al Jerez",descripcion:`Los ri\xF1ones al Jerez son uno de los platos m\xE1s emblem\xE1ticos de la cocina jerezana y un imprescindible en cualquier ruta de tabancos.

Se trata de un plato tradicional donde el vino de Jerez no es un acompa\xF1amiento, sino el aut\xE9ntico protagonista. Elaborados normalmente con ri\xF1ones de ternera o cordero, se cocinan lentamente en una salsa intensa a base de Oloroso o Amontillado, creando un sabor profundo y muy caracter\xEDstico.

Es una receta de toda la vida, muy ligada al tapeo, que representa a la perfecci\xF3n la identidad gastron\xF3mica de la ciudad.

\u{1F37D}\uFE0F Experiencia viajera:
Es uno de esos platos que definen un destino. Sabor potente, textura melosa y una salsa que pide pan s\xED o s\xED. Ideal para acompa\xF1ar con vino de bota en un tabanco aut\xE9ntico.

\u{1F4A1} Consejo AvenTourArte:
P\xEDdelo siempre con pan porque la salsa es lo mejor del plato. Y acomp\xE1\xF1alo con un Amontillado u Oloroso para vivir la experiencia completa.

\u{1F4CD} D\xF3nde probarlos:
Tabanco El Pasaje
Bar La Moderna
Tabanco San Pablo`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:`Tapa: 3,50 \u20AC \u2013 5 \u20AC
Raci\xF3n: 10 \u20AC \u2013 15 \u20AC`},{nombre:"Chicharrones de Jerez",descripcion:`Los chicharrones en Jerez son pr\xE1cticamente religi\xF3n, pero hay que saber que aqu\xED existen dos estilos muy diferentes, y ambos merecen la pena.

Por un lado est\xE1n los chicharrones \u201Cde C\xE1diz\u201D, t\xEDpicos de Jerez: carne de cerdo (papada o panceta) cocinada en su propia manteca con especias, prensada y cortada en lonchas finas, casi como un embutido. Se sirven con sal gorda y un toque de lim\xF3n, y son el cl\xE1sico de los tabancos.

Por otro lado est\xE1n los chicharrones fritos, m\xE1s crujientes y calientes, con ese contraste entre exterior dorado e interior jugoso que los hace irresistibles.

\u{1F37D}\uFE0F Experiencia viajera:
Es uno de los bocados m\xE1s aut\xE9nticos que puedes probar en Jerez. Sencillo, potente y perfecto para acompa\xF1ar con vino en barra, como manda la tradici\xF3n.

\u{1F4A1} Consejo AvenTourArte:
Prueba los dos tipos si puedes, pero no te vayas sin probar los de loncha fina con lim\xF3n. Y si los ves reci\xE9n hechos en el mercado\u2026 ni te lo pienses.

\u{1F4CD} D\xF3nde probarlos:
Bar La Moderna
Tabanco El Pasaje
Tabanco San Pablo
Venta Esteban (para los fritos)`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:`Papelina: 4 \u20AC \u2013 6 \u20AC
Kilo para llevar: 18 \u20AC \u2013 24 \u20AC`},{nombre:"Berza Jerezana",descripcion:`La berza jerezana es el plato rey de la gastronom\xEDa de Jerez y una aut\xE9ntica instituci\xF3n del cuchareo andaluz.

Se trata de un guiso contundente de origen campesino que combina legumbres, verduras de temporada y una pring\xE1 espectacular, dando como resultado un plato potente, sabroso y muy representativo de la cocina local.

La base es una mezcla de garbanzos y alubias blancas, acompa\xF1adas de verduras como tagarninas (en su mejor \xE9poca) o acelgas. Pero lo que realmente marca la diferencia es la pring\xE1: tocino, jarrete de ternera, costilla, chorizo y morcilla, todo cocinado lentamente hasta que se deshace.

\u{1F37D}\uFE0F Experiencia viajera:
Es un plato que no solo se come, se vive. Tradicionalmente se sirve en dos tiempos: primero el caldo con las legumbres y despu\xE9s la pring\xE1 aparte, para desmenuzarla con pan y disfrutarla como manda la tradici\xF3n.

\u{1F4A1} Consejo AvenTourArte:
No tengas miedo a mancharte las manos con la pring\xE1\u2026 es parte de la experiencia. Y si puedes, prueba la berza de tagarninas en temporada: es otro nivel.

\u{1F4CD} D\xF3nde probarla:
Venta Esteban
Bar Juanito
Venta Gabriel
Tabanco El Pasaje (seg\xFAn d\xEDa)`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:`Plato: 8 \u20AC \u2013 12 \u20AC
Raci\xF3n completa: 14 \u20AC \u2013 18 \u20AC`},{nombre:"Rabo de toro",descripcion:`El rabo de toro es uno de los grandes cl\xE1sicos de la cocina jerezana, profundamente ligado a la tradici\xF3n taurina de la ciudad.

Se trata de un guiso de cocci\xF3n lenta donde la carne queda extremadamente tierna, deshaci\xE9ndose pr\xE1cticamente sola, envuelta en una salsa oscura, brillante y llena de sabor.

El secreto est\xE1 en el uso de vinos de Jerez, especialmente Oloroso, junto a un buen sofrito de verduras, que tras horas de cocci\xF3n dan lugar a una salsa intensa y melosa que es protagonista absoluta del plato.

\u{1F37D}\uFE0F Experiencia viajera:
Es un plato contundente, de los que se disfrutan sin prisa. Carne tierna, salsa potente y ese momento de mojar pan que se convierte en obligatorio.

\u{1F4A1} Consejo AvenTourArte:
P\xEDdelo siempre como raci\xF3n (mejor que tapa) y aseg\xFArate de tener pan a mano. Y si ves croquetas de rabo de toro en la carta\u2026 ni lo dudes.

\u{1F4CD} D\xF3nde probarlo:
Restaurante Albores
Bar Juanito
Mes\xF3n del Cordero
Venta Esteban`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:`Tapa/Media raci\xF3n: 6 \u20AC \u2013 10 \u20AC
Raci\xF3n: 18 \u20AC \u2013 25 \u20AC`},{nombre:"Ajo Jerezano",descripcion:`El Ajo Jerezano (o Ajo Caliente) es uno de los platos m\xE1s aut\xE9nticos y tradicionales de la cocina de campo de Jerez.

De origen jornalero, se preparaba en las vi\xF1as durante las jornadas de trabajo, siendo una receta humilde pero muy contundente, perfecta para reponer fuerzas.

No es ni sopa ni pur\xE9, sino una emulsi\xF3n espesa elaborada con pan de telera asentado, ajo majado, tomate, pimiento, aceite de oliva virgen extra y agua hirviendo, que cocina lentamente todos los ingredientes hasta conseguir una textura densa y muy sabrosa.

Se sirve siempre muy caliente y acompa\xF1ado de sus cl\xE1sicos \u201Ctropezones\u201D: huevo duro picado y pimientos fritos.

\u{1F37D}\uFE0F Experiencia viajera:
Es un plato que te conecta directamente con el Jerez m\xE1s rural. Comerlo en una vi\xF1a o en un mosto es una experiencia totalmente diferente a cualquier restaurante del centro.

\u{1F4A1} Consejo AvenTourArte:
Acomp\xE1\xF1alo siempre con rabanitos para refrescar el paladar y, si puedes, pru\xE9balo en un mosto en temporada: ah\xED es donde realmente cobra sentido.

\u{1F4CD} D\xF3nde probarlo:
Mosto Tejero
Venta Esteban
Mosto Santa Teresa
Bar Juanito`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:"Cuenco: 5 \u20AC \u2013 8 \u20AC"},{nombre:"Papas ali\xF1\xE1s",descripcion:`Las papas ali\xF1\xE1s son la tapa fr\xEDa por excelencia en Jerez y un ejemplo perfecto de c\xF3mo la sencillez puede convertirse en algo espectacular.

A primera vista parecen una simple ensalada de patatas, pero su secreto est\xE1 en los detalles: la patata se ali\xF1a en caliente para que absorba el aceite y el vinagre, se utiliza un buen AOVE y, por supuesto, aut\xE9ntico vinagre de Jerez.

Se acompa\xF1an con cebolleta, perejil, huevo duro y, en muchas versiones, un buen trozo de at\xFAn o melva por encima.

\u{1F37D}\uFE0F Experiencia viajera:
Es una tapa que nunca falla. Fresca, sabrosa y perfecta para empezar a tapear con una copa de vino. La t\xEDpica que pides \u201Cpara picar\u201D\u2026 y acabas disfrutando m\xE1s de lo esperado.

\u{1F4A1} Consejo AvenTourArte:
P\xEDdelas siempre a temperatura ambiente o ligeramente templadas. Si est\xE1n fr\xEDas de nevera, pierden gran parte de su gracia.

\u{1F4CD} D\xF3nde probarlas:
Bar Juanito
Bar La Moderna
Tabanco El Pasaje
Marisquer\xEDa Gran Avenida`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:`Tapa: 2,50 \u20AC \u2013 3,50 \u20AC
Raci\xF3n: 7 \u20AC \u2013 10 \u20AC`},{nombre:"Tortillitas de camarones",descripcion:`Las tortillitas de camarones son uno de los bocados m\xE1s finos y crujientes de la gastronom\xEDa gaditana, y en Jerez se preparan con un nivel espectacular.

Se trata de una masa muy ligera de harina de trigo y garbanzo, frita hasta quedar pr\xE1cticamente transparente, con peque\xF1os camarones de la bah\xEDa que aportan todo el sabor a mar.

La clave est\xE1 en su textura: extremadamente fina, crujiente y bien escurrida de aceite, casi como un encaje comestible.

\u{1F37D}\uFE0F Experiencia viajera:
Es un bocado ligero pero lleno de sabor. Perfecto para acompa\xF1ar con vino y seguir tapeando sin llenarte demasiado. De esos platos que desaparecen de la mesa sin darte cuenta.

\u{1F4A1} Consejo AvenTourArte:
Si no est\xE1n finas y crujientes\u2026 no son buenas. Y p\xEDdelas siempre reci\xE9n hechas: ah\xED es donde marcan la diferencia.

\u{1F4CD} D\xF3nde probarlas:
Bar Juanito
Restaurante Albores
Marisquer\xEDa Gran Avenida
Freidur\xEDas del centro`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:`Unidad: 2 \u20AC \u2013 3 \u20AC
Raci\xF3n: 10 \u20AC \u2013 14 \u20AC`},{nombre:"Alcauciles (alcachofas a la jerezana)",descripcion:`Los alcauciles \u2014como llamamos en Jerez a las alcachofas\u2014 son uno de los grandes manjares de la primavera y un plato muy ligado a la cocina de temporada.

La receta tradicional a la jerezana consiste en un guiso lento y arom\xE1tico donde el protagonismo es absoluto del producto. Se utilizan los corazones m\xE1s tiernos, cocinados con un refrito de cebolleta, ajo, guisantes y habitas, y con el toque imprescindible de vino Fino que aporta car\xE1cter al plato.

El resultado es una preparaci\xF3n suave, delicada y llena de matices, muy diferente a otras formas de cocinar la alcachofa.

\u{1F37D}\uFE0F Experiencia viajera:
Es uno de esos platos que solo tienen sentido en temporada. Textura tierna, sabor fino y una sensaci\xF3n muy \u201Cde huerta\u201D que conecta con la cocina m\xE1s tradicional de la zona.

\u{1F4A1} Consejo AvenTourArte:
Si est\xE1s en Jerez entre marzo y mayo, es obligatorio probarlos. Fuera de temporada pierden mucho. Y si dudas\u2026 pide la raci\xF3n completa, porque se te va a quedar corta.

\u{1F4CD} D\xF3nde probarlos:
Bar Juanito
Restaurante Albores
Bar Las Banderillas
Venta Esteban`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",fecha:`Disponible en temporada (marzo \u2013 mayo)
Principalmente en horario de comidas`,precio:`Tapa: 4 \u20AC \u2013 6 \u20AC
Raci\xF3n: 12 \u20AC \u2013 18 \u20AC`},{nombre:"Aneto jerezano",descripcion:`El Aneto jerezano es uno de los platos m\xE1s populares y contundentes de la gastronom\xEDa local, una versi\xF3n a lo grande del cl\xE1sico San Jacobo o Cordon Bleu.

Consiste en dos grandes filetes de pollo (o cerdo) rellenos de jam\xF3n serrano y mucho queso, empanados y fritos hasta quedar crujientes por fuera y muy jugosos por dentro.

Pero lo que realmente lo hace especial es la salsa: en Jerez no se sirve seco, sino ba\xF1ado en salsas potentes como pimienta, Roquefort o reducci\xF3n de vino Oloroso, que elevan el plato a otro nivel.

\u{1F37D}\uFE0F Experiencia viajera:
Es un plato para disfrutar sin complejos. Grande, sabroso y perfecto para compartir. Muy t\xEDpico de comidas familiares o de fin de semana con amigos.

\u{1F4A1} Consejo AvenTourArte:
Pregunta siempre por el tama\xF1o antes de pedirlo\u2026 porque muchos Anetos son para dos personas. Y si puedes, comp\xE1rtelo para dejar hueco a m\xE1s platos.

\u{1F4CD} D\xF3nde probarlo:
Bar El Retiro
Venta Esteban
Mes\xF3n de la Cueva
Bar Parque Atl\xE1ntico`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:"Raci\xF3n: 12 \u20AC \u2013 18 \u20AC (suele incluir guarnici\xF3n)"},{nombre:"Menudo gitano",descripcion:`El menudo gitano es uno de los platos m\xE1s potentes y aut\xE9nticos de la cocina jerezana, la versi\xF3n local de los callos pero con un car\xE1cter completamente propio.

Se elabora con callos de ternera y manitas de cerdo, lo que le da esa textura melosa y gelatinosa tan caracter\xEDstica, acompa\xF1ados de garbanzos peque\xF1os que absorben todo el sabor del guiso.

El secreto est\xE1 en el ali\xF1o: un majado de ajo, pimienta, comino, clavo y, sobre todo, hierbabuena fresca, que aporta ese aroma inconfundible que diferencia al menudo de Jerez de cualquier otro.

\u{1F37D}\uFE0F Experiencia viajera:
Es un plato intenso, de los que dejan huella. Sabor profundo, textura potente y ese punto especiado que engancha. No es para todos\u2026 pero si te gusta, te enamora.

\u{1F4A1} Consejo AvenTourArte:
Se come muy caliente y sin prisas. Pan obligatorio para la salsa. Si no acabas \u201Cpringado\u201D\u2026 es que no era un buen menudo.

\u{1F4CD} D\xF3nde probarlo:
Tabanco San Pablo
Bar Las Banderillas
Venta Esteban
Tabanco El Pasaje`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:`Tapa: 3,50 \u20AC \u2013 5 \u20AC
Raci\xF3n: 10 \u20AC \u2013 14 \u20AC`},{nombre:"Arroz con tagarninas",descripcion:`El arroz con tagarninas es uno de los platos que mejor representa la cocina de campo jerezana, basada en producto silvestre y tradici\xF3n.

Las tagarninas, un cardo salvaje que crece en las vi\xF1as y olivares, aportan un sabor muy caracter\xEDstico, ligeramente amargo y vegetal, que define completamente el plato.

Este arroz no es seco tipo paella, sino meloso o caldoso, cocinado lentamente con un sofrito de ajo, comino y piment\xF3n, y servido tradicionalmente en lebrillo de barro. En muchas versiones se acompa\xF1a con huevo cuajado o carne como lomo en manteca.

\u{1F37D}\uFE0F Experiencia viajera:
Es uno de esos platos que conectan directamente con el campo y la vida tradicional. Sabor profundo, textura reconfortante y un punto muy aut\xE9ntico que no encontrar\xE1s fuera de esta zona.

\u{1F4A1} Consejo AvenTourArte:
Si lo ves fuera de temporada, no ser\xE1 lo mismo. Y si puedes, pru\xE9balo en una venta o mosto: la experiencia cambia completamente.

\u{1F4CD} D\xF3nde probarlo:
Venta Esteban
Mosto Tejero
Venta Gabriel
Restaurante Albores`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",fecha:`Disponible en temporada (invierno \u2013 primavera)
Principalmente en horario de comidas`,precio:"Plato: 10 \u20AC \u2013 15 \u20AC"},{nombre:"Ensaladilla de gambas",descripcion:`La ensaladilla de gambas es una de las tapas m\xE1s ic\xF3nicas de Jerez y, para muchos, el verdadero indicador de la calidad de un bar.

A diferencia de la ensaladilla rusa cl\xE1sica, aqu\xED se busca una textura extremadamente cremosa, con una mayonesa suave y bien trabajada \u2014a veces enriquecida con el coral de la gamba\u2014 donde el marisco es el aut\xE9ntico protagonista.

La clave est\xE1 en el equilibrio: patata bien cocida, gamba de calidad y una mezcla que se funda en la boca sin resultar pesada.

\u{1F37D}\uFE0F Experiencia viajera:
Es una tapa aparentemente sencilla, pero cuando das con una buena\u2026 lo notas al instante. Suave, jugosa y con sabor a mar. Perfecta para empezar cualquier ruta de tapeo.

\u{1F4A1} Consejo AvenTourArte:
Nunca la pidas reci\xE9n salida de la nevera. Las mejores se sirven a temperatura controlada o se terminan al momento. Y acomp\xE1\xF1ala siempre con picos para disfrutar el contraste.

\u{1F4CD} D\xF3nde probarla:
Restaurante Roneo
Bina Bar
Bar La Bota
Venta Esteban
Bar Maypa
La Marea de Marcos
Bar Juanito
La Bocacha`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:`Tapa: 3 \u20AC \u2013 4,50 \u20AC
Media raci\xF3n: 7 \u20AC \u2013 10 \u20AC
Raci\xF3n: 12 \u20AC \u2013 16 \u20AC`},{nombre:"Consom\xE9 al Jerez",descripcion:`El consom\xE9 al Jerez es uno de los caldos m\xE1s elegantes y tradicionales de la gastronom\xEDa local, un aut\xE9ntico reconstituyente que se sirve muy caliente y con un aroma inconfundible.

A diferencia de un caldo com\xFAn, el consom\xE9 se elabora mediante un proceso de clarificaci\xF3n que lo deja limpio, brillante y con un sabor profundo. El toque diferencial lo aporta el vino de Jerez \u2014Fino, Amontillado o incluso Palo Cortado\u2014 que a\xF1ade complejidad y ese punto punzante tan caracter\xEDstico.

En muchos sitios tradicionales se sirve con una yema de huevo cruda en el fondo, que se cocina ligeramente al mezclarla con el caldo caliente, aportando a\xFAn m\xE1s textura y sabor.

\u{1F37D}\uFE0F Experiencia viajera:
Es un plato sencillo pero muy refinado. Perfecto como entrante o para entrar en calor, con ese equilibrio entre ligereza y profundidad que lo hace \xFAnico.

\u{1F4A1} Consejo AvenTourArte:
P\xEDdelo con su guarnici\xF3n completa y, si quieres subir el nivel, a\xF1ade un peque\xF1o chorre\xF3n de Amontillado justo antes de beberlo.

\u{1F4CD} D\xF3nde probarlo:
Bar Juanito
Venta Esteban
La Carbon\xE1
Restaurante Albores`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",fecha:"Muy t\xEDpico en meses frescos",precio:"Taza: 3,50 \u20AC \u2013 5,50 \u20AC"},{nombre:"Pesti\xF1os",descripcion:`Los pesti\xF1os son el dulce m\xE1s representativo de Jerez, un cl\xE1sico que aqu\xED se disfruta durante todo el a\xF1o, aunque brillan especialmente en Navidad y Cuaresma.

Se trata de peque\xF1os bocados fritos, crujientes y muy arom\xE1ticos, elaborados con una masa fina que lleva ajonjol\xED, canela, matalah\xFAva (an\xEDs) y un toque de vino de Jerez, lo que les da un sabor muy caracter\xEDstico.

Una vez fritos, se presentan ba\xF1ados en miel \u2014la versi\xF3n m\xE1s tradicional\u2014 o espolvoreados con az\xFAcar, m\xE1s ligeros pero igualmente adictivos.

\u{1F37D}\uFE0F Experiencia viajera:
Son de esos dulces que empiezas a probar \u201Cuno solo\u201D\u2026 y no puedes parar. Perfectos para acompa\xF1ar un caf\xE9 o una copa de vino dulce despu\xE9s de comer.

\u{1F4A1} Consejo AvenTourArte:
F\xEDjate en que sean peque\xF1os y crujientes. Si est\xE1n blandos o la miel chorrea demasiado, no son de los buenos. Los aut\xE9nticos deben estar secos por dentro y con ese punto justo de brillo por fuera.

\u{1F4CD} D\xF3nde probarlos:
Pasteler\xEDa La Rosa de Oro
Convento de las Reparadoras
Pasteler\xEDa Las Quince Puertas
Venta Esteban`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",horario:"Disponible todo el a\xF1o (m\xE1s t\xEDpicos en Navidad y Cuaresma)",precio:`Por kilo: 22 \u20AC \u2013 28 \u20AC
Bandejas: 6 \u20AC \u2013 8 \u20AC`},{nombre:"Tocino de cielo",descripcion:`El tocino de cielo es el postre m\xE1s emblem\xE1tico de Jerez y uno de los dulces m\xE1s famosos de Espa\xF1a, con un origen ligado directamente al mundo del vino.

Naci\xF3 en los conventos de la ciudad, donde las monjas aprovechaban las yemas de huevo sobrantes de las bodegas \u2014utilizadas para clarificar el vino\u2014 para crear este dulce \xFAnico a base de yema, az\xFAcar y alm\xEDbar.

El resultado es una textura densa pero extremadamente suave, que se deshace en la boca, con un sabor intenso y una capa superior de caramelo tostado que equilibra el conjunto.

\u{1F37D}\uFE0F Experiencia viajera:
Es el final perfecto para cualquier comida en Jerez. Dulce, elegante y con historia en cada bocado. Un imprescindible absoluto.

\u{1F4A1} Consejo AvenTourArte:
No lo confundas con un flan. El aut\xE9ntico tocino de cielo no lleva leche. Si puedes, acomp\xE1\xF1alo con un vino dulce para vivir la experiencia completa.

\u{1F4CD} D\xF3nde probarlo:
Pasteler\xEDa La Rosa de Oro
Pasteler\xEDa Jes\xFAs
Bar Juanito
Restaurante Albores`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:`Unidad: 2,50 \u20AC \u2013 4 \u20AC
Tarta: 15 \u20AC \u2013 30 \u20AC`},{nombre:"Vino Fino",descripcion:`El Fino es el alma de Jerez, un vino \xFAnico en el mundo que se caracteriza por su sequedad, frescura y ese aroma punzante tan reconocible.

Su magia ocurre gracias a la \u201Cflor\u201D, una capa natural de levaduras que protege el vino dentro de la bota e impide su oxidaci\xF3n, d\xE1ndole su color pajizo y su car\xE1cter ligero pero intenso.

Se trata de un vino vivo, que cambia con el tiempo y que debe consumirse siempre fresco para disfrutarlo en su mejor momento.

\u{1F37D}\uFE0F Experiencia viajera:
Beber un Fino en Jerez, directamente de la bota en un tabanco, es una de las experiencias m\xE1s aut\xE9nticas que puedes vivir en la ciudad. Es cultura, tradici\xF3n y forma de vida.

\u{1F4A1} Consejo AvenTourArte:
Siempre muy fr\xEDo (5\xBA\u20137\xBA). Si no est\xE1 fr\xEDo, no es lo mismo. Y s\xEDrvelo en peque\xF1as cantidades para que no se caliente.

\u{1F4CD} D\xF3nde probarlo:
Tabanco El Pasaje
Tabanco San Pablo
Tabanco Las Banderillas

\u{1F377} Marcas recomendadas:
T\xEDo Pepe
La Ina
Pando
Fino Quinta

\u2728 Extra AvenTourArte:
Si est\xE1s en primavera, busca un \u201CFino en Rama\u201D. Es la versi\xF3n m\xE1s pura, sin filtrar, con m\xE1s intensidad y car\xE1cter.

\u{1F958} Maridaje:
Jam\xF3n ib\xE9rico
Aceitunas y almendras
Papas ali\xF1\xE1s
Marisco y frituras`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:"Copa: 1,50 \u20AC \u2013 3 \u20AC"},{nombre:"Vino Amontillado",descripcion:`El Amontillado es uno de los vinos m\xE1s complejos y fascinantes de Jerez, resultado de una doble crianza que lo hace \xFAnico en el mundo.

Comienza su vida como un Fino, bajo el velo de flor (crianza biol\xF3gica), pero con el tiempo esta desaparece y el vino contin\xFAa envejeciendo en contacto con el ox\xEDgeno (crianza oxidativa). Esta evoluci\xF3n le aporta un color \xE1mbar intenso y una enorme riqueza arom\xE1tica.

En nariz destacan notas de frutos secos como avellana, madera vieja y un punto salino muy elegante. En boca es seco, profundo y con car\xE1cter.

\u{1F37D}\uFE0F Experiencia viajera:
Es un vino para disfrutar sin prisas. M\xE1s serio y complejo que el Fino, perfecto para sentarte, conversar y saborear cada sorbo.

\u{1F4A1} Consejo AvenTourArte:
No lo bebas muy fr\xEDo (12\xBA\u201314\xBA es ideal). Y mejor en copa de vino blanco para apreciar todos sus matices.

\u{1F4CD} D\xF3nde probarlo:
Tabanco Plateros
La Carbon\xE1
Tabanco El Pasaje

\u{1F377} Marcas recomendadas:
Vi\xF1a AB
T\xEDo Diego
Del Duque
Lustau Los Arcos

\u2728 Extra AvenTourArte:
El Amontillado es uno de los pocos vinos que marida perfectamente con alcachofas, uno de los alimentos m\xE1s dif\xEDciles para el vino.

\u{1F958} Maridaje:
Quesos curados y ahumados
Alcauciles y esp\xE1rragos
Cuchareo (menudo, rabo de toro)
Consom\xE9 al Jerez`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:"Copa: 2 \u20AC \u2013 4 \u20AC"},{nombre:"Vino Oloroso",descripcion:`El Oloroso es uno de los vinos m\xE1s intensos y estructurados de Jerez, elaborado mediante crianza oxidativa desde el primer momento, sin la protecci\xF3n de la flor.

Este proceso le aporta su caracter\xEDstico color caoba oscuro y una complejidad arom\xE1tica basada en notas de nuez, madera, cuero y especias. En boca es redondo, profundo y con una persistencia muy larga.

Es un vino con cuerpo, pensado para quienes buscan sabores potentes y experiencias m\xE1s contundentes dentro del mundo del vino de Jerez.

\u{1F37D}\uFE0F Experiencia viajera:
Es el vino perfecto para sentarte con calma, acompa\xF1ar platos fuertes y disfrutar de una sobremesa larga. Puro car\xE1cter jerezano.

\u{1F4A1} Consejo AvenTourArte:
No lo bebas demasiado fr\xEDo (12\xBA\u201314\xBA). Dale tiempo en copa para que se abra y puedas apreciar todos sus matices.

\u{1F4CD} D\xF3nde probarlo:
Tabanco San Pablo
Tabanco Plateros
Las Banderillas
Tabanco El Pasaje

\u{1F377} Marcas recomendadas:
Alfonso
Don Gonzalo
Lustau Don Nu\xF1o
R\xEDo Viejo

\u2728 Extra AvenTourArte:
Es uno de los vinos que mejor acompa\xF1a el cuchareo jerezano. Si vas a comer berza o rabo de toro\u2026 este es tu vino.

\u{1F958} Maridaje:
Rabo de toro
Berza jerezana
Menudo gitano
Quesos curados
Carnes rojas y caza`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:"Copa: 2 \u20AC \u2013 4 \u20AC"},{nombre:"Vino Palo Cortado",descripcion:`El Palo Cortado es el vino m\xE1s enigm\xE1tico y exclusivo de Jerez, una aut\xE9ntica rareza que combina lo mejor de dos mundos.

Nace como un vino destinado a ser Fino, pero de forma natural la \u201Cflor\u201D desaparece antes de tiempo. El bodeguero, al detectar su potencial especial, decide reconducir su crianza hacia un envejecimiento oxidativo, creando as\xED un vino \xFAnico.

El resultado es una mezcla perfecta entre la elegancia arom\xE1tica del Amontillado y la estructura potente del Oloroso. En nariz aparecen notas de frutos secos, c\xEDtricos amargos y madera noble; en boca es seco, complejo y muy persistente.

\u{1F37D}\uFE0F Experiencia viajera:
Es un vino para momentos especiales. Profundo, elegante y sorprendente. Cada sorbo cuenta una historia diferente.

\u{1F4A1} Consejo AvenTourArte:
No lo bebas muy fr\xEDo (12\xBA\u201314\xBA) y dale tiempo en copa para que se abra. Es un vino que se descubre poco a poco.

\u{1F4CD} D\xF3nde probarlo:
Tabanco Plateros
La Carbon\xE1
Tabanco El Pasaje
Restaurante Albores

\u{1F377} Marcas recomendadas:
Leonor
Capuchino
Lustau Pen\xEDnsula
Palo Cortado 1767

\u2728 Extra AvenTourArte:
Es el vino favorito de muchos expertos porque no se \u201Cfabrica\u201D como tal\u2026 se encuentra. Cada Palo Cortado es casi una rareza irrepetible.

\u{1F958} Maridaje:
Quesos muy curados
Mojama y ahumados
Carnes de caza
Platos especiados`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:"Copa: 3 \u20AC \u2013 6 \u20AC"},{nombre:"Vino Pedro Xim\xE9nez (PX)",descripcion:`El Pedro Xim\xE9nez (PX) es el vino m\xE1s dulce y seductor de Jerez, elaborado a partir de uvas pasificadas al sol mediante el proceso de \u201Casoleo\u201D, que concentra todos sus az\xFAcares naturales.

El resultado es un vino denso, oscuro y brillante, con una textura casi de jarabe y un perfil arom\xE1tico que recuerda a pasas, higos, d\xE1tiles, caf\xE9 y chocolate.

Es un vino intenso y envolvente, que se disfruta casi como un postre en s\xED mismo.

\u{1F37D}\uFE0F Experiencia viajera:
M\xE1s que beberlo, se saborea. Es un final perfecto para cualquier comida o una experiencia en s\xED misma si lo pruebas con calma.

\u{1F4A1} Consejo AvenTourArte:
Pru\xE9balo solo y tambi\xE9n sobre un postre. Un chorrito sobre helado o tocino de cielo es nivel dios.

\u{1F4CD} D\xF3nde probarlo:
Tabanco San Pablo
Tabanco Plateros
La Rosa de Oro

\u{1F377} Marcas recomendadas:
No\xE9
N\xE9ctar
Venerable
Lustau San Emilio

\u2728 Extra AvenTourArte:
En Jerez se dice que el PX no se bebe\u2026 se come. Si giras la copa, ver\xE1s c\xF3mo \u201Cpinta\u201D el cristal por su densidad.

\u{1F958} Maridaje:
Tocino de cielo
Helados
Chocolate negro
Quesos azules
Foie`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:"Copa: 2,50 \u20AC \u2013 5 \u20AC"},{nombre:"Vino Cream",descripcion:`El Cream es uno de los vinos m\xE1s agradables y vers\xE1tiles de Jerez, resultado de la mezcla de vinos secos de crianza oxidativa (como el Oloroso) con vinos dulces naturales (principalmente Pedro Xim\xE9nez).

Este proceso, conocido como \u201Ccabeceo\u201D, da lugar a un vino con cuerpo, notas de madera y frutos secos, pero con un dulzor suave y aterciopelado que lo hace muy f\xE1cil de beber.

Es un vino equilibrado, redondo y perfecto tanto para iniciarse en los vinos de Jerez como para disfrutar sin complicaciones.

\u{1F37D}\uFE0F Experiencia viajera:
Es el vino del disfrute f\xE1cil. Ideal para una tarde relajada, una charla larga o como aperitivo con algo de picar.

\u{1F4A1} Consejo AvenTourArte:
Pru\xE9balo \u201Con the rocks\u201D: con hielo y una rodaja de naranja. Es la forma m\xE1s refrescante y t\xEDpica de tomarlo en Jerez.

\u{1F4CD} D\xF3nde probarlo:
Tabanco El Pasaje
Tabanco San Pablo
La Carbon\xE1

\u{1F377} Marcas recomendadas:
Harvey\u2019s Bristol Cream
Canasta
Solera 1847
Lustau Capataz Andr\xE9s

\u2728 Extra AvenTourArte:
Es uno de los vinos m\xE1s consumidos en Feria y Navidad. Su suavidad lo convierte en un imprescindible en reuniones y celebraciones.

\u{1F958} Maridaje:
Pesti\xF1os y reposter\xEDa
Fruta fresca
Quesos azules
Foie y pat\xE9s`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",precio:"Copa: 2 \u20AC \u2013 4 \u20AC"},{nombre:"Mosto de Jerez",descripcion:`El Mosto de Jerez es el vino joven de la temporada, elaborado a partir de uva Palomino reci\xE9n fermentada. Es un vino turbio, sin filtrar, con un car\xE1cter fresco, afrutado y ligeramente salvaje.

Pero en Jerez, el mosto es mucho m\xE1s que una bebida: es toda una experiencia social. Los \u201Cmostos\u201D son antiguos lagares o casas de vi\xF1a en las afueras donde se sirve este vino acompa\xF1ado de comida tradicional y ambiente de campo.

Su temporada va de noviembre a mayo, siendo la primavera el momento ideal para disfrutarlo, cuando el vino ya est\xE1 m\xE1s asentado pero sigue manteniendo su frescura.

\u{1F37D}\uFE0F Experiencia viajera:
Ir de mosto es una de las experiencias m\xE1s aut\xE9nticas que puedes vivir en Jerez. Mesas de madera, comida casera, vino en jarra y un ambiente que mezcla tradici\xF3n, campo y amigos.

\u{1F4A1} Consejo AvenTourArte:
Ve con tiempo, sin prisa y con hambre. Y cuidado\u2026 entra muy f\xE1cil, pero sube sin avisar \u{1F60F}

\u{1F4CD} D\xF3nde vivir la experiencia:
Mosto Tejero
Mosto Santa Teresa
Mosto El Corregidor
Mosto Domi

\u2728 Extra AvenTourArte:
El \u201Cmosteo\u201D es casi una tradici\xF3n sagrada entre los jerezanos.

\u{1F958} Qu\xE9 pedir s\xED o s\xED:
Ajo jerezano
Berza jerezana
Chicharrones
Rabanitos`,foto:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",fecha:"Temporada: noviembre \u2013 mayo",precio:`Vaso: 1,20 \u20AC \u2013 1,50 \u20AC
Jarra: 5 \u20AC \u2013 8 \u20AC`}]},{titulo:"D\xF3nde comer en Jerez",lugares:[{nombre:"Tabanco Plateros",descripcion:`El Tabanco Plateros es uno de los lugares m\xE1s aut\xE9nticos y recomendables de Jerez para vivir la experiencia del vino de bota en un entorno tradicional.

Situado en pleno centro, conserva la esencia de los antiguos despachos de vinos, donde el producto es el protagonista y el ambiente mezcla locales y viajeros en busca de lo genuino.

Su propuesta gastron\xF3mica se basa en chacinas, quesos y conservas de alta calidad, perfectas para acompa\xF1ar los vinos de Jerez servidos directamente de la bota.

\u{1F37D}\uFE0F Experiencia viajera:
Es el sitio perfecto para empezar una ruta de tapeo en Jerez. Ambiente animado, precios muy asequibles y ese sabor aut\xE9ntico que define la ciudad.

\u{1F4A1} Consejo AvenTourArte:
Pide unos chicharrones con una copa de Oloroso. Es una de las combinaciones m\xE1s m\xEDticas del local.

\u{1F4CD} Qu\xE9 pedir s\xED o s\xED:
Chicharrones de C\xE1diz
Queso Payoyo
Montaditos de pring\xE1 o lomo en manteca
Mojama con almendras
Chacinas ib\xE9ricas`,horario:`Lunes a jueves: 12:00 \u2013 16:00 y 19:00 \u2013 00:00 
Viernes y s\xE1bados: 12:00 \u2013 01:00
Domingos: 12:00 \u2013 17:00`,precio:`Vinos: 1,50 \u2013 2,50 \u20AC
Tapas: 2 \u20AC \u2013 5 \u20AC
Tablas: 10 \u2013 18 \u20AC`},{nombre:"Las Banderillas",descripcion:`Las Banderillas es uno de los bares m\xE1s aut\xE9nticos de Jerez, un cl\xE1sico del barrio de San Miguel donde se respira tradici\xF3n en cada rinc\xF3n.

Con su est\xE9tica de bar de toda la vida \u2014techos altos, decoraci\xF3n taurina y ambiente bullicioso\u2014 es uno de esos sitios donde vienes a comer bien, sin postureo y con sabor real.

Su cocina es pura esencia jerezana: guisos contundentes, tapas generosas y recetas de siempre que han hecho de este lugar un imprescindible.

\u{1F37D}\uFE0F Experiencia viajera:
Aqu\xED se viene a comer fuerte y a disfrutar del ambiente. Ruido, gente, platos que salen sin parar\u2026 y esa sensaci\xF3n de estar en un sitio de los de verdad.

\u{1F4A1} Consejo AvenTourArte:
Ve temprano por la noche o prep\xE1rate para pelear barra. Y no te vayas sin probar el rabo de toro.

\u{1F4CD} Qu\xE9 pedir s\xED o s\xED:
Rabo de toro
Menudo gitano
Ensaladilla de gambas
Carne al toro
Huevos rotos o frituras`,horario:"Todos los d\xEDas: 12:25 \u2013 17:00 | 20:15 \u2013 00:00",precio:`Tapas: 2,50 \u20AC \u2013 4 \u20AC
Medias: 7 \u20AC \u2013 10 \u20AC
Raciones: 12 \u20AC \u2013 18 \u20AC
Vinos: < 2,50 \u20AC`},{nombre:"Tabanco San Pablo",descripcion:`El Tabanco San Pablo es uno de los tabancos m\xE1s legendarios de Jerez, un lugar donde el tiempo parece haberse detenido entre sus paredes encaladas, botas de vino y ambiente puramente local.

Fundado en 1934, es un referente para entender la cultura del vino de Jerez en su estado m\xE1s aut\xE9ntico, combinando vino de bota con una cocina tradicional muy potente.

A diferencia de otros tabancos m\xE1s centrados en chacinas, aqu\xED tambi\xE9n destacan sus guisos caseros, lo que lo convierte en una parada obligatoria para comer de verdad.

\u{1F37D}\uFE0F Experiencia viajera:
Es uno de los mejores sitios para sentir el pulso real de Jerez. Barra llena, vino corriendo y platos que salen sin parar. Autenticidad total.

\u{1F4A1} Consejo AvenTourArte:
Pide un Fino de bota con un Ajo jerezano y qu\xE9date en la barra. Es la experiencia m\xE1s pura que puedes vivir aqu\xED.

\u{1F4CD} Qu\xE9 pedir s\xED o s\xED:
Ajo jerezano
Tortilla de patatas
Montadito de pring\xE1
Menudo gitano
Papas ali\xF1\xE1s`,horario:"Todos los d\xEDas: 12:00 \u2013 17:00 | 20:00 \u2013 00:00",precio:`Vinos: 1,50 \u20AC \u2013 2,50 \u20AC
Tapas: 2 \u20AC \u2013 4,50 \u20AC
Precio medio: 15 \u20AC \u2013 20 \u20AC`},{nombre:"Atuvera",descripcion:`Atuvera es uno de los locales con m\xE1s personalidad de Jerez, donde la cocina tradicional da un giro moderno y creativo sin perder su esencia.

Ubicado en pleno barrio de San Miguel, justo frente al monumento a Lola Flores, combina el producto local con t\xE9cnicas y sabores internacionales en formato de \u201Cplatillos\u201D para compartir.

Aqu\xED no encontrar\xE1s el t\xEDpico bar de tapas, sino una propuesta m\xE1s atrevida, con platos que sorprenden pero mantienen el alma jerezana.

\u{1F37D}\uFE0F Experiencia viajera:
Es el sitio perfecto para salir de lo cl\xE1sico sin salir de Jerez. Cocina divertida, ambiente cuidado y una experiencia m\xE1s gastron\xF3mica que de tabanco.

\u{1F4A1} Consejo AvenTourArte:
Reserva o ve temprano. Es peque\xF1o y siempre est\xE1 lleno. Y si puedes, pilla mesa fuera: comer con Lola Flores de fondo tiene su magia.

\u{1F4CD} Qu\xE9 pedir s\xED o s\xED:
Ensaladilla Atuvera
Bao de pring\xE1
Gyozas de rabo de toro
Tarantelo de at\xFAn
Croquetas fuera de carta`,horario:`Lunes a Mi\xE9rcoles: cerrado 
Jueves a Domingo: 13:30 \u2013 16:00 | 20:00 \u2013 23:30`,precio:`Platos: 6 \u20AC \u2013 14 \u20AC
Precio medio: 20 \u20AC \u2013 30 \u20AC`},{nombre:"Tabanco El Pasaje",descripcion:`El Tabanco El Pasaje es el tabanco m\xE1s famoso y antiguo de Jerez, abierto desde 1925, y una parada imprescindible para vivir la esencia m\xE1s aut\xE9ntica de la ciudad.

Lo que lo hace \xFAnico es su combinaci\xF3n de vinos de bota con espect\xE1culos de flamenco en vivo todos los d\xEDas, creando una atm\xF3sfera vibrante y muy especial.

Es un lugar estrecho, lleno de historia, donde el vino, la m\xFAsica y el ambiente se mezclan en una experiencia puramente jerezana.

\u{1F37D}\uFE0F Experiencia viajera:
Beber vino mientras suena el taconeo a pocos metros es algo que no se olvida. Es Jerez en estado puro.

\u{1F4A1} Consejo AvenTourArte:
Llega con antelaci\xF3n o reserva si quieres sentarte durante el flamenco. Si no, qu\xE9date en la entrada con una copa y disfruta del ambiente.

\u{1F4CD} Qu\xE9 pedir s\xED o s\xED:
Chicharrones de Jerez
Queso Payoyo
Montadito de pring\xE1
Mojama de Barbate
Carne de membrillo con queso`,horario:`Lunes a s\xE1bado: 11:30 \u2013 16:00 y 19:00 \u2013 23:30
Domingos: 12:00 \u2013 16:00 y 19:00 \u2013 23:30
Flamenco: sobre las 14:00 y 21:00/22:00`,precio:`Vinos: 1,80 \u20AC \u2013 3 \u20AC
Tapas: 2,50 \u20AC \u2013 5 \u20AC
Tablas: 10 \u20AC \u2013 20 \u20AC`},{nombre:"Bar La Moderna",descripcion:`La Moderna es una de las instituciones m\xE1s aut\xE9nticas de Jerez, situada en plena calle Larga y considerada uno de los grandes puntos de encuentro de la ciudad.

No es un tabanco tradicional, sino un bar de toda la vida con una personalidad arrolladora, donde puedes empezar el d\xEDa con un desayuno y terminarlo con una copa de vino viendo el ambiente del centro.

Su esencia est\xE1 en el tapeo cl\xE1sico, r\xE1pido y de calidad, acompa\xF1ado siempre de ese bullicio tan caracter\xEDstico de Jerez.

\u{1F37D}\uFE0F Experiencia viajera:
Es el sitio perfecto para mezclarte con los locales. Barra llena, terraza con vida y ese ambiente de \u201Cver y ser visto\u201D que define la ciudad.

\u{1F4A1} Consejo AvenTourArte:
Si\xE9ntate en la terraza y pide una ensaladilla con un Fino. Es uno de los planes m\xE1s jerezanos que existen.

\u{1F4CD} Qu\xE9 pedir s\xED o s\xED:
Ensaladilla de gambas
Papas ali\xF1\xE1s
Montaditos variados
Chacinas
Mollete en desayuno`,horario:`Lunes a jueves: 07:00 \u2013 01:00 
Viernes: 07:00 \u2013 00:00 
S\xE1bados: 08:00 \u2013 01:00 
Domingos: Cerrado`,precio:`Bebidas: 1,50 \u20AC \u2013 2,50 \u20AC
Tapas: 2,50 \u20AC \u2013 4 \u20AC
Desayunos: econ\xF3micos`},{nombre:"La Taberna Flamenca",descripcion:`La Taberna Flamenca es uno de los epicentros del arte jerezano, situada en pleno Barrio de Santiago, cuna del flamenco m\xE1s aut\xE9ntico.

M\xE1s que un restaurante, es una pe\xF1a y centro cultural donde el flamenco se vive de forma cercana, visceral y sin artificios.

Aqu\xED no vienes solo a cenar, vienes a sentir el comp\xE1s, el cante y el duende en un ambiente \xEDntimo donde artistas y p\xFAblico pr\xE1cticamente se mezclan.

\u{1F37D}\uFE0F Experiencia viajera:
Cenar mientras suena una buler\xEDa a pocos metros de ti es una de las experiencias m\xE1s aut\xE9nticas que puedes vivir en Jerez.

\u{1F4A1} Consejo AvenTourArte:
Qu\xE9date despu\xE9s del espect\xE1culo. Muchas veces empieza el verdadero espect\xE1culo cuando parece que ha terminado.

\u{1F4CD} Qu\xE9 pedir s\xED o s\xED:
Berza jerezana
Rabo de toro
Tortillitas de camarones
Pescaito frito
Papas con carne`,horario:`Lunes y martes: Cerrado 
Mi\xE9rcoles y jueves: 20:00 \u2013 00:00 
Viernes y s\xE1bados: 13:30 \u2013 17:00 y 20:00 \u2013 01:30 
Domingos: 13:30 \u2013 18:00`,precio:`Entrada/espect\xE1culo: 15 \u20AC \u2013 25 \u20AC
Platos: 8 \u20AC \u2013 18 \u20AC
Cena con espect\xE1culo: 40 \u20AC \u2013 50 \u20AC`}]},{titulo:"Cultura y Vida Local",contenido:`Jerez es una ciudad donde la cultura no se vive como algo aislado, sino como una parte natural de la vida diaria.

El flamenco, el vino, el caballo y las fiestas populares no son solo grandes reclamos tur\xEDsticos: son elementos reales de la identidad local y siguen marcando el ritmo de la ciudad.

Barrios como Santiago y San Miguel conservan una fort\xEDsima tradici\xF3n flamenca, mientras que los tabancos, pe\xF1as y muchos espacios culturales mantienen vivo ese v\xEDnculo entre arte y calle.

Al mismo tiempo, las bodegas hist\xF3ricas no son solo patrimonio econ\xF3mico o arquitect\xF3nico, sino tambi\xE9n espacios culturales activos, y la ciudad mantiene una agenda muy potente con festivales, espect\xE1culos ecuestres y celebraciones populares.

\u{1F4A1} Consejo viajero:
Si quieres entender Jerez de verdad, no te quedes solo con sus monumentos. Esc\xFAchala. M\xEDrala en una barra, en una plaza, en un tabanco o en un barrio con comp\xE1s.`},{titulo:"Fiestas y Festivos Principales",lugares:[{nombre:"Festival de Jerez",descripcion:`El Festival de Jerez es el evento de flamenco y danza espa\xF1ola m\xE1s importante del mundo en su g\xE9nero, convirtiendo la ciudad en el epicentro internacional del arte jondo durante varias semanas.

Se celebra anualmente entre finales de febrero y principios de marzo, atrayendo a artistas, estudiantes y aficionados de m\xE1s de 40 pa\xEDses.

Durante el festival, Jerez se llena de espect\xE1culos, cursos, encuentros y un ambiente flamenco \xFAnico que se respira en cada rinc\xF3n de la ciudad.

\u{1F3AD} Experiencia viajera:
Es el momento perfecto para ver grandes estrenos, aprender con maestros internacionales y vivir el flamenco tanto en escenarios oficiales como en ambientes m\xE1s espont\xE1neos.

\u{1F4A1} Consejo AvenTourArte:
No te limites a los teatros. Parte de la magia del festival est\xE1 en el \u201Coff\u201D: pe\xF1as, tabancos y locales donde el flamenco surge de forma natural.

\u{1F4CD} D\xF3nde se vive:
Teatro Villamarta
Sala Compa\xF1\xEDa
Museos de la Atalaya
Palacio de Villavicencio (Alc\xE1zar)
Pe\xF1as flamencas y tabancos`,fecha:"Se celebra anualmente entre finales de febrero y principios de marzo",precio:`Espect\xE1culos: 12 \u2013 45 \u20AC
Cursos: 250 \u20AC \u2013 400 \u20AC aprox.`},{nombre:"Semana Santa",descripcion:`La Semana Santa de Jerez de la Frontera es uno de los acontecimientos culturales y emocionales m\xE1s potentes de Andaluc\xEDa, declarada de Inter\xE9s Tur\xEDstico Internacional.

Su personalidad es \xFAnica porque mezcla la elegancia se\xF1orial de la ciudad con el desgarro flamenco de sus barrios, creando una experiencia que va mucho m\xE1s all\xE1 de lo visual.

\u{1F3AD} Identidad \xFAnica:
El gran sello de Jerez es la saeta por seguiriyas, un cante flamenco profundo y desgarrador que convierte cada paso en un momento \xEDntimo y sobrecogedor.

Adem\xE1s, conviven dos estilos de carga: el costal sevillano y el tradicional jerezano a hombro, reflejo de su historia.

\u{1F3D8}\uFE0F Experiencia viajera:
Cada barrio vive la Semana Santa de forma distinta. No es solo ver procesiones, es sentir c\xF3mo cambia el ambiente seg\xFAn la zona.

\u{1F4A1} Consejo AvenTourArte:
Sal de la carrera oficial y busca las cofrad\xEDas en sus barrios. Ah\xED es donde ocurre la verdadera magia.

\u{1F4CD} Momentos imprescindibles:
Cristo de la Viga (Lunes Santo) \u2192 recogida en la Catedral con las escalinatas iluminadas con fuego, creando una de las escenas m\xE1s impactantes de toda la Semana Santa 
El Prendimiento (Barrio de Santiago, Mi\xE9rcoles Santo)
La Yedra (Barrio de San Miguel, Madrugada)
Jes\xFAs Nazareno \u201CEl Abuelo\u201D (Madrugada)

\u{1F374} Gastronom\xEDa t\xEDpica:
Torrijas, pesti\xF1os y arroz con leche
Bacalao en distintas versiones
Tagarninas esparrag\xE1s`,horario:"Domingo de Ramos a Domingo de Resurrecci\xF3n (fechas variables entre marzo y abril)",precio:`Acceso gratuito en la v\xEDa p\xFAblica
Sillas en carrera oficial: precio variable`},{nombre:"Gran Premio de Espa\xF1a de MotoGP",descripcion:`El Gran Premio de Espa\xF1a de MotoGP convierte Jerez en la capital mundial del motociclismo durante un fin de semana donde la ciudad se transforma por completo.

M\xE1s que una carrera, es un fen\xF3meno social: ruido, adrenalina y ambiente motero invaden tanto el circuito como el centro hist\xF3rico, creando una experiencia \xFAnica en Europa.

\u{1F3C1} Experiencia viajera:
No es solo ver motos; es vivir la ciudad en su punto m\xE1s salvaje. Miles de aficionados llegan de toda Europa y el sonido de los motores se convierte en la banda sonora del fin de semana.

\u{1F4A1} Consejo AvenTourArte:
Si quieres vivirlo, reserva alojamiento con meses de antelaci\xF3n. Si buscas tranquilidad\u2026 mejor evita estas fechas.

\u{1F4CD} Lo imprescindible:
Circuito de Jerez \u2013 \xC1ngel Nieto
Curva Jorge Lorenzo (final de recta)
Pelousse (ambiente motero m\xE1s aut\xE9ntico)
Avenida \xC1lvaro Domecq (epicentro urbano)
Ambiente nocturno en Jerez y El Puerto de Santa Mar\xEDa

\u{1F374} Qu\xE9 comer:
Montaditos, chicharrones, tapas r\xE1pidas
Vinos de Jerez y rebujito
Tapeo en tabancos tradicionales`,horario:`Se celebra entre finales de abril y principios de mayo
Fin de semana completo (viernes a domingo)`,precio:`Entradas: 60 \u20AC \u2013 160 \u20AC (seg\xFAn zona)
Pelousse: opci\xF3n m\xE1s econ\xF3mica
Alojamiento: precios muy elevados durante el evento`},{nombre:"Feria del Caballo",descripcion:`La Feria del Caballo es la celebraci\xF3n m\xE1s emblem\xE1tica de Jerez y, para muchos jerezanos, la semana m\xE1s bonita del a\xF1o.

Se celebra en el Parque Gonz\xE1lez Hontoria y destaca por algo \xFAnico en Andaluc\xEDa: todas sus casetas son de acceso libre, lo que la convierte en una feria abierta, acogedora y muy aut\xE9ntica.

\u{1F333} El escenario:
El recinto ferial es un parque arbolado que durante una semana se transforma con un espectacular alumbrado de miles de luces, creando un ambiente m\xE1gico tanto de d\xEDa como de noche.

\u{1F40E} Experiencia viajera:
El paseo de caballos es el gran protagonista. Desde el mediod\xEDa hasta el atardecer, jinetes, amazonas y carruajes recorren el real en una estampa elegante y \xFAnica en Espa\xF1a.

\u{1F377} El alma de la feria:
El vino de Jerez (especialmente el Fino) es el rey absoluto. Se disfruta solo o en rebujito, perfecto para el calor de mayo.

\u{1F483} Ambiente:
Durante el d\xEDa, la feria es m\xE1s tradicional y familiar. Por la noche, se transforma en una fiesta continua donde las sevillanas, la m\xFAsica y el baile llenan cada caseta.

\u{1F4A1} Consejo AvenTourArte:
Ve entre semana al mediod\xEDa para vivir el paseo de caballos en su mejor momento y comer sin aglomeraciones.

\u{1F4CD} Imprescindibles:
Paseo de caballos
Casetas de libre acceso
Alumbrado nocturno
Ambiente de sevillanas en directo

\u{1F374} Qu\xE9 comer:
Tortillitas de camarones
Pescaito frito
Pimiento frito
Berza jerezana
Caldo con Jerez`,horario:`Se celebra en mayo (de s\xE1bado a s\xE1bado)
Ambiente de d\xEDa: desde el mediod\xEDa
Ambiente nocturno: hasta altas horas`,precio:`Acceso gratuito al recinto y casetas
Precios de comida y bebida variables seg\xFAn caseta`},{nombre:"Vinoble",descripcion:`Vinoble es el evento m\xE1s exclusivo y sofisticado de Jerez, un sal\xF3n internacional dedicado a los vinos nobles (generosos, dulces y licorosos) que convierte la ciudad en la capital mundial del vino de alta gama.

Se celebra en el interior del Alc\xE1zar de Jerez, un escenario hist\xF3rico \xFAnico donde jardines, patios y edificios monumentales se transforman en espacios de cata.

\u{1F377} Experiencia viajera:
Degustar vinos \xFAnicos \u2014algunos con d\xE9cadas de envejecimiento\u2014 en un entorno medieval es una experiencia irrepetible que mezcla historia, cultura y alta enolog\xEDa.

\u{1F30D} Qu\xE9 lo hace especial:
Re\xFAne vinos de todo el mundo: Jerez, Oporto, Sauternes, Tokaji o vinos de hielo, convirti\xE9ndose en un punto de encuentro para sumilleres, bodegueros y amantes del vino.

\u{1F393} Ambiente:
Aunque tiene un perfil profesional, el p\xFAblico general tambi\xE9n puede acceder. Las catas son de alt\xEDsimo nivel y permiten descubrir aut\xE9nticas joyas enol\xF3gicas.

\u{1F4A1} Consejo AvenTourArte:
No intentes probarlo todo. Elige algunas catas y disfruta el resto del tiempo paseando por los jardines y hablando con productores.

\u{1F4CD} Imprescindibles:
Alc\xE1zar de Jerez
Palacio de Villavicencio
Jardines y patios hist\xF3ricos
Catas guiadas de vinos exclusivos

\u{1F377} Qu\xE9 probar:
Vinos de Jerez (Fino, Amontillado, Palo Cortado, Oloroso)
Pedro Xim\xE9nez y vinos dulces
Vinos internacionales (Oporto, Tokaji, Sauternes)`,horario:`Se celebra cada dos a\xF1os (evento bienal)
Normalmente a finales de mayo o principios de junio
Duraci\xF3n aproximada: 3 d\xEDas`,precio:`Entrada general: variable seg\xFAn edici\xF3n
Catas premium: precio adicional seg\xFAn experiencia`},{nombre:"Festival de la Buler\xEDa y Viernes Flamencos",descripcion:`El Festival de la Buler\xEDa y los Viernes Flamencos son el alma del verano en Jerez, dos ciclos que mantienen vivo el flamenco cuando cae el calor y la ciudad se llena de noches al aire libre.

No son solo espect\xE1culos: son una reafirmaci\xF3n del orgullo cultural jerezano, donde el arte se transmite de generaci\xF3n en generaci\xF3n.

\u{1F319} Experiencia viajera:
Disfrutar de un espect\xE1culo flamenco en espacios monumentales como el Alc\xE1zar, bajo el cielo de verano, es una experiencia m\xE1gica donde el cante, el baile y la guitarra se sienten de forma \xEDntima y aut\xE9ntica.

\u{1F3AD} Viernes Flamencos:
Un ciclo m\xE1s cl\xE1sico y prolongado durante julio y agosto, con galas que combinan grandes figuras y artistas locales en escenarios hist\xF3ricos.

\u{1F525} Festival de la Buler\xEDa:
El gran cl\xEDmax del verano. Dedicado al palo m\xE1s emblem\xE1tico de Jerez, la buler\xEDa, re\xFAne a las grandes sagas flamencas en noches llenas de comp\xE1s, energ\xEDa y \u201Cfin de fiesta\u201D.

\u{1F4A1} Consejo AvenTourArte:
Llega con el \u201Cpre-flamenco\u201D hecho: un Fino y unas tapas en un tabanco antes del espect\xE1culo son parte esencial de la experiencia.

\u{1F4CD} Imprescindibles:
Patio de Armas del Alc\xE1zar
Claustros de Santo Domingo
Galas nocturnas al aire libre
Noches de buler\xEDa y fin de fiesta

\u{1F374} Plan perfecto:
Tapeo previo en tabancos
Espect\xE1culo flamenco nocturno
Cena tard\xEDa en el centro`,horario:`Viernes Flamencos: julio y agosto
Festival de la Buler\xEDa: normalmente en agosto
Espect\xE1culos nocturnos (21:30 \u2013 00:00 aprox.)`,precio:"Entradas: 15 \u20AC \u2013 50 \u20AC seg\xFAn espect\xE1culo y artista"},{nombre:"Fiestas de la Vendimia",descripcion:`Las Fiestas de la Vendimia son el homenaje m\xE1s aut\xE9ntico a la tierra, al vino y a la tradici\xF3n de Jerez. Consideradas una de las fiestas m\xE1s antiguas de Espa\xF1a, celebran el nacimiento del nuevo vino y la conexi\xF3n hist\xF3rica de la ciudad con la vid.

Tienen un car\xE1cter cultural y pausado, muy diferente a la Feria: aqu\xED se viene a aprender, degustar y entender el origen del vino de Jerez.

\u{1F347} Experiencia viajera:
El momento m\xE1s ic\xF3nico es la pisa de la uva frente a la Catedral, donde el primer mosto del a\xF1o comienza a fluir en un ritual cargado de simbolismo.

\u{1F3DB}\uFE0F Ambiente:
Durante varias semanas, el centro hist\xF3rico se llena de catas, exposiciones, flamenco y actividades culturales en espacios monumentales.

\u{1F4A1} Consejo AvenTourArte:
Es la mejor \xE9poca para visitar bodegas: est\xE1n en plena actividad y el aroma a fermentaci\xF3n invade la ciudad.

\u{1F4CD} Imprescindibles:
Pisa de la uva en la Catedral
Catas en el Alc\xE1zar
\u201CDe Copa en Copa\u201D en los Claustros de Santo Domingo
Eventos culturales y flamenco en el centro

\u{1F374} Qu\xE9 probar:
Uva palomino fresca
Quesos y chacinas
Vinos de Jerez en cata
Tapas de temporada`,horario:`Se celebra durante las dos primeras semanas de septiembre
Eventos repartidos entre ma\xF1ana, tarde y noche`,precio:`Muchos eventos gratuitos
Catas y experiencias: precio variable`},{nombre:"Navidad en Jerez (Zambombas)",descripcion:`La Navidad en Jerez es una de las celebraciones m\xE1s aut\xE9nticas y participativas de Espa\xF1a. Aqu\xED no suenan villancicos tradicionales: suenan zambombas.

Es una fiesta donde desaparece la barrera entre p\xFAblico y artista, y cualquier persona puede formar parte del espect\xE1culo cantando, tocando palmas o simplemente dej\xE1ndose llevar por el ambiente.

\u{1F525} Experiencia viajera:
Las zambombas nacen en los patios de vecinos de los barrios de Santiago y San Miguel, alrededor del fuego, el vino y los dulces. Hoy llenan plazas, tabancos y pe\xF1as durante todo diciembre.

\u{1F3B6} Qu\xE9 es una zambomba:
Reuniones populares donde se cantan villancicos aflamencados al ritmo de instrumentos tradicionales como la zambomba, panderetas o botellas de an\xEDs.

\u{1F4A1} Consejo AvenTourArte:
No te quedes mirando: si sabes el estribillo, canta. Aqu\xED todo el mundo forma parte del momento.

\u{1F4CD} D\xF3nde vivirla:
Barrios de Santiago y San Miguel
Pe\xF1as flamencas y hermandades
Tabancos tradicionales
Plazas del centro hist\xF3rico

\u{1F374} Qu\xE9 comer:
Pesti\xF1os
Alfajores y polvorones
Berza jerezana

\u{1F377} Qu\xE9 beber:
Vino dulce (PX o Cream)
An\xEDs`,horario:`Desde finales de noviembre hasta el 24 de diciembre
Mayor actividad los fines de semana
Eventos de d\xEDa y noche`,precio:`La mayor\xEDa gratuitas (consumo en barra)
Espect\xE1culos: 15 \u20AC \u2013 35 \u20AC`}]}]};var _E={path:"europa/espana/andalucia/cadiz/trebujena",nombre:"Trebujena",flag:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",background:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",bgPos:"50% 65%",bgPosMobile:"50% 65%",bgDim:.1,flagOpacity:.12,flagOpacityMobile:.18,flagSize:"75%",flagSizeMobile:"50%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`Trebujena es un municipio gaditano situado junto al r\xEDo Guadalquivir y las marismas de Do\xF1ana. Con una fuerte identidad agr\xEDcola y popular, es conocida por su vino mosto, sus fiestas singulares, su paisaje natural y su car\xE1cter aut\xE9ntico.

Es uno de esos pueblos que no buscan impresionar con grandes monumentos, sino con verdad, con tradici\xF3n y con una forma de vivir muy ligada a la tierra, al campo y al r\xEDo.

Aqu\xED todo tiene sabor a identidad propia: el mosto, las marismas, las fiestas, la gastronom\xEDa y ese ambiente de pueblo que sigue sinti\xE9ndose real.`,secciones:[{titulo:"Historia",contenido:`Trebujena cuenta con or\xEDgenes romanos y andalus\xEDes, favorecidos por la fertilidad de las tierras del bajo Guadalquivir y por su posici\xF3n estrat\xE9gica junto al r\xEDo.

Durante siglos fue un n\xFAcleo agr\xEDcola muy ligado a la vid, al cereal y al aprovechamiento del entorno marisme\xF1o, desarrollando una identidad propia muy marcada que todav\xEDa hoy se percibe en sus tradiciones, en sus fiestas y en su forma de vivir.

M\xE1s que un pueblo monumental, Trebujena es un lugar donde la historia se ha quedado incrustada en el paisaje, en la cultura del mosto y en una personalidad popular muy reconocible dentro de la provincia de C\xE1diz.`},{titulo:"Geograf\xEDa y Clima",contenido:`Situada en el noroeste de la provincia de C\xE1diz, Trebujena se extiende entre el r\xEDo Guadalquivir y las marismas, en un entorno natural de enorme valor paisaj\xEDstico y ecol\xF3gico.

Su localizaci\xF3n hace que viva muy conectada con el paisaje del Bajo Guadalquivir, con vistas abiertas, caminos rurales y una relaci\xF3n muy directa con Do\xF1ana y su ecosistema.

Disfruta de un clima mediterr\xE1neo con influencia atl\xE1ntica, con veranos c\xE1lidos suavizados por la brisa e inviernos templados.

\u{1F4A1} Consejo viajero:
Trebujena se disfruta mucho m\xE1s sin prisas, combinando casco urbano, tradici\xF3n local y una escapada al entorno natural de las marismas.`},{titulo:"Qu\xE9 visitar en Trebujena",lugares:[{nombre:"Monumento a la Vendimia",descripcion:`Una de las mejores formas de empezar a entender Trebujena es a trav\xE9s de su v\xEDnculo con la vi\xF1a. Este monumento rinde homenaje a la tradici\xF3n vitivin\xEDcola del municipio y al trabajo agr\xEDcola que durante generaciones ha marcado la vida del pueblo.

\u{1F347} Experiencia viajera:
No es solo una escultura, es una declaraci\xF3n de identidad. Aqu\xED entiendes desde el principio que el mosto y la vendimia no son un detalle, sino parte del alma de Trebujena.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/monumento-vendimia"},{nombre:"Plaza de Espa\xF1a",descripcion:`Es el centro neur\xE1lgico del municipio y el lugar donde mejor se percibe el pulso cotidiano del pueblo. Aqu\xED se cruzan vecinos, se celebran actos, fiestas y encuentros, y se concentra buena parte de la vida social de Trebujena.

\u{1F3D8}\uFE0F Experiencia viajera:
M\xE1s que una plaza monumental, es un espacio vivido. Uno de esos sitios donde un pueblo se muestra tal como es.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/plz-espana"},{nombre:"Ayuntamiento de Trebujena",descripcion:`Situado en la Plaza de Espa\xF1a, este edificio institucional presenta una fachada acad\xE9mica inspirada en el estilo neocl\xE1sico, estructurada en dos cuerpos bien proporcionados.

Representa el coraz\xF3n de la vida administrativa y social del municipio y se encuentra junto a la emblem\xE1tica Parroquia de la Pur\xEDsima Concepci\xF3n, formando uno de los conjuntos m\xE1s reconocibles del centro.

\u{1F3DB}\uFE0F Experiencia viajera:
Es una parada que ayuda a entender la parte m\xE1s representativa y p\xFAblica de Trebujena, justo en el coraz\xF3n de su vida cotidiana.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/ayto-trebujena",horario:"Exterior visitable"},{nombre:"Parroquia de la Pur\xEDsima Concepci\xF3n",descripcion:`Principal templo religioso de Trebujena y uno de los edificios m\xE1s representativos de su patrimonio hist\xF3rico y espiritual.

De estilo barroco, se alza como uno de los grandes referentes visuales del casco urbano y forma parte esencial de la identidad religiosa y festiva del pueblo.

\u26EA Experiencia viajera:
Es uno de esos lugares que conectan directamente con la ra\xEDz m\xE1s tradicional de Trebujena, donde se mezclan historia, fe y vida cotidiana.

\u{1F4A1} Consejo AvenTourArte:
Si quieres verla abierta con seguridad, intenta coincidir con los horarios de misa o ac\xE9rcate unos minutos antes.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/iglesia-purisima-concepcion",horario:`Misas:
Lunes a s\xE1bado: 19:30 \u2013 20:00 (seg\xFAn temporada)
Domingos y festivos: 12:00 y 20:00

Apertura aproximada:
30 minutos antes de cada misa
Visita recomendada: 10:00 \u2013 13:00 (horario orientativo)`,precio:"Gratis"},{nombre:"Palomar",descripcion:`Edificaci\xF3n tradicional de mamposter\xEDa y planta cil\xEDndrica, situada en las proximidades de la Avenida del Guadalquivir.

Destaca por su segundo cuerpo cil\xEDndrico con orificios de cer\xE1mica destinados a la entrada de palomas, siendo considerado uno de los palomares m\xE1s interesantes de Andaluc\xEDa.

\u{1F3E1} Experiencia viajera:
Es una de esas construcciones que, sin ser grandes monumentos, cuentan mucho sobre el mundo rural, agr\xEDcola y tradicional de Trebujena.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/palomar",horario:"Exterior visitable"},{nombre:"Castillo de P\xE9rez de Guzm\xE1n",descripcion:`Fortificaci\xF3n medieval construida entre los siglos XIII y comienzos del XIV, con origen en una antigua torre vig\xEDa integrada en una red defensiva que controlaba el territorio y el r\xEDo Guadalquivir.

A finales del siglo XIII, Alonso P\xE9rez de Guzm\xE1n \u201CGuzm\xE1n el Bueno\u201D impuls\xF3 su transformaci\xF3n en castillo para asegurar el dominio militar y econ\xF3mico de la zona.

\u{1F3F0} Experiencia viajera:
M\xE1s que un castillo espectacular, es un lugar con mucho valor hist\xF3rico, especialmente por su relaci\xF3n con el control estrat\xE9gico del r\xEDo y del entorno agr\xEDcola.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/castillo-trebujena",horario:"Lunes a viernes de 10:00 a 14:00",precio:"Gratis"},{nombre:"Parque de la Toya",descripcion:`Parque urbano situado en la parte m\xE1s oriental del casco urbano de Trebujena. De forma alargada y cerrado con rejer\xEDa tradicional, es el principal pulm\xF3n verde del municipio y uno de sus espacios sociales m\xE1s importantes.

Uno de sus mayores atractivos es la presencia de fauna urbana: pavos reales que campan libremente por el parque, patos, gallinas y otras aves, lo que lo convierte en un lugar especialmente agradable para pasear y para visitar con ni\xF1os.

\u{1F33F} Experiencia viajera:
Es un sitio muy agradecido para parar, respirar y disfrutar de una cara m\xE1s tranquila y familiar del pueblo.`,fotos:["cld:europa/espana/andalucia/cadiz/trebujena/parque-toya-1","cld:europa/espana/andalucia/cadiz/trebujena/parque-toya-2","cld:europa/espana/andalucia/cadiz/trebujena/parque-toya-3","cld:europa/espana/andalucia/cadiz/trebujena/parque-toya-4"],horario:"Abierto todo el d\xEDa",precio:"Gratis"},{nombre:"Ermita de Nuestra Se\xF1ora de Palomares",descripcion:`Templo situado en las afueras del casco urbano, muy ligado a la historia agr\xEDcola y espiritual de Trebujena.

Est\xE1 dedicado a la Virgen de Palomares, patrona de la ciudad, y es uno de los lugares de mayor devoci\xF3n popular, especialmente durante celebraciones y romer\xEDas locales.

\u26EA Experiencia viajera:
Aqu\xED el ambiente cambia completamente: m\xE1s tranquilo, m\xE1s \xEDntimo y muy conectado con la tradici\xF3n y la fe del pueblo.

\u{1F4A1} Consejo AvenTourArte:
Si quieres verla realmente viva, intenta visitarla en agosto, durante sus fiestas patronales.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/ermita-palomares",horario:`Apertura orientativa:
Fines de semana: mayor probabilidad de apertura, especialmente domingos por la ma\xF1ana
Tardes: sobre las 18:00 \u2013 19:00 (antes de rosario o cultos)

Agosto (fiestas patronales): apertura m\xE1s amplia y diaria`,precio:"Gratis"},{nombre:"Ruinas del Molino de las Haciendas",descripcion:`Restos de uno de los mayores molinos de aceite de la zona, situado a unos 2 km del casco urbano en el Camino de las Haciendas.

Destaca un gran torre\xF3n de unos 10 metros de altura, visible desde varios puntos, junto a lienzos de muralla y restos de la construcci\xF3n original.

Es un testimonio muy valioso del pasado agr\xEDcola e industrial de Trebujena.

\u{1F3DA}\uFE0F Experiencia viajera:
Uno de esos lugares donde las ruinas hablan por s\xED solas y ayudan a imaginar la importancia econ\xF3mica que tuvo esta tierra.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/molino-haciendas",horario:"Acceso libre",precio:"Gratis"},{nombre:"Puesta de sol en las Marismas de Trebujena",descripcion:`Uno de los grandes momentos que puede regalar Trebujena est\xE1 en su paisaje. La puesta de sol sobre las marismas es uno de los atardeceres m\xE1s espectaculares del Bajo Guadalquivir.

La luz, el silencio, la amplitud del terreno y la conexi\xF3n con Do\xF1ana crean una atm\xF3sfera muy especial.

Adem\xE1s, este paisaje fue escenario del rodaje de la pel\xEDcula \u201CEl Imperio del Sol\u201D.

\u{1F305} Experiencia viajera:
Es uno de esos lugares donde el pueblo deja de ser solo pueblo y se convierte en paisaje, calma y recuerdo.

\u2728 Consejo AvenTourArte:
Si puedes elegir solo un momento visual potente en Trebujena, que sea este.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/marismas",horario:"Atardecer",precio:"Gratis"}]},{titulo:"Gastronom\xEDa",platos:[{nombre:"Mosto de Trebujena",descripcion:`El gran emblema gastron\xF3mico del pueblo. Se trata de un vino joven elaborado de forma tradicional, muy ligado a la identidad local y especialmente presente durante los meses de invierno.

Se consume principalmente en los \u201Cmostos\u201D del pueblo, acompa\xF1ado de tapas, ambiente popular y mucha vida social.

\u{1F377} Experiencia viajera:
Beber mosto en Trebujena no es solo probar una bebida t\xEDpica, es entrar en una forma de convivencia muy propia del lugar.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/mosto",precio:"1,50 \u2013 2,50 \u20AC vaso"},{nombre:"Trebujito",descripcion:`Bebida t\xEDpica festiva elaborada con vino blanco joven del Marco de Jerez, refresco de lima-lim\xF3n y hielo.

Muy refrescante y protagonista en ferias y fiestas como el Trebufest, representa la versi\xF3n m\xE1s alegre, popular y veraniega del car\xE1cter de Trebujena.

\u{1F942} Experiencia viajera:
Una bebida muy ligada al ambiente festivo del pueblo, perfecta para entender su lado m\xE1s desenfadado.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",precio:"2,50 \u2013 5 \u20AC"},{nombre:"Tortillitas de camarones",descripcion:`Uno de los grandes cl\xE1sicos de la cocina ribere\xF1a de la zona. Son tortillas finas y crujientes elaboradas con camarones del Guadalquivir, harina, cebolla y perejil.

\u{1F990} Experiencia viajera:
Crujientes, sabrosas y muy reconocibles, conectan Trebujena con toda la tradici\xF3n gastron\xF3mica del Bajo Guadalquivir y la costa gaditana.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/tortillita-camarones",precio:"1,90\u20AC/unidad"},{nombre:"Angulas",descripcion:`Producto hist\xF3rico ligado al r\xEDo Guadalquivir y a la econom\xEDa tradicional de la zona.

Durante mucho tiempo fueron consideradas un aut\xE9ntico manjar y formaron parte de la identidad gastron\xF3mica local.

\u{1F41F} Experiencia viajera:
M\xE1s que un plato cotidiano, hoy tienen un valor m\xE1s simb\xF3lico e hist\xF3rico, muy ligado a la relaci\xF3n de Trebujena con el r\xEDo.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",precio:"Seg\xFAn temporada y mercado"},{nombre:"Potaje con cardillos",descripcion:`Guiso de temporada elaborado con legumbres y cardillos silvestres, muy t\xEDpico de la cocina tradicional del entorno rural.

\u{1F963} Experiencia viajera:
Es uno de esos platos que hablan directamente de campo, de invierno y de cocina heredada de generaci\xF3n en generaci\xF3n.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",precio:"8 \u2013 12 \u20AC"},{nombre:"Ajo caliente",descripcion:`Receta humilde, sabrosa y contundente elaborada con pan, ajo, piment\xF3n, aceite y caldo.

Est\xE1 muy ligada a la cocina tradicional campesina y a esa gastronom\xEDa de aprovechamiento que define tantos pueblos andaluces.

\u{1F372} Experiencia viajera:
Un plato sencillo pero con much\xEDsima identidad, de los que explican una forma de vivir y de cocinar.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/ajo-caliente",precio:"4 - 6\u20AC"},{nombre:"Garbanzos como conejos",descripcion:`Plato popular de garbanzos guisados con arroz. Recibe su nombre porque, en tiempos de escasez, los garbanzos \u201Chac\xEDan de conejo\u201D.

Hoy es uno de los grandes s\xEDmbolos de la gastronom\xEDa popular trebujenera y el aut\xE9ntico protagonista de su fiesta gastron\xF3mica de diciembre.

\u{1F958} Experiencia viajera:
Es uno de esos platos que resumen muy bien la creatividad, la memoria y el sentido popular de la cocina local.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/garbanzos-conejos",precio:"Gratis en su fiesta"},{nombre:"Uvas Palominos",descripcion:`Postre tradicional elaborado a partir de la uva Palomino, una variedad profundamente ligada a la cultura vitivin\xEDcola de Trebujena.

\u{1F347} Experiencia viajera:
Un sabor que conecta directamente con la vi\xF1a y con la identidad agr\xEDcola del pueblo.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",precio:"Precio local"},{nombre:"Mistela",descripcion:`Vino dulce tradicional, arom\xE1tico y f\xE1cil de beber, muy presente en fiestas populares y sobremesas.

\u{1F377} Experiencia viajera:
Es una de esas bebidas que aparecen donde hay reuni\xF3n, sobremesa y ambiente de pueblo.`,foto:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",precio:"2 \u2013 4 \u20AC copa"}]},{titulo:"D\xF3nde comer en Trebujena",lugares:[{nombre:"Taberna Manegodor",descripcion:`Taberna tradicional muy popular en Trebujena, donde la cocina casera, el producto de la zona y el ambiente local se mezclan de forma natural.

Es uno de esos sitios donde el pueblo se siente tal cual: sin artificios, con sabor aut\xE9ntico y con ese punto de cercan\xEDa que hace que todo se disfrute m\xE1s.

\u{1F37D}\uFE0F Lo que no te puedes perder:
\u2022 Albur de estero a la espalda (especialidad de la casa)
\u2022 Camarones y anguillas
\u2022 Pescado de estero y frituras

\u{1F377} Experiencia viajera:
Aqu\xED no vienes solo a comer, vienes a entender la relaci\xF3n de Trebujena con el r\xEDo, el estero y su cocina m\xE1s tradicional.

\u2728 Consejo AvenTourArte:
Intenta ir con buena luz o al atardecer. El ambiente y el producto ganan much\xEDsimo en ese momento.`,horario:`Lunes y Martes: Cerrado
Mi\xE9rcoles a Domingo: 11:00 \u2013 21:00
(En verano pueden ampliar hasta despu\xE9s de la puesta de sol)`,precio:`Precio medio: 20 \u20AC \u2013 30 \u20AC
Camarones / Anguillas: 12 \u20AC \u2013 18 \u20AC
Pescado de estero / Fritura: 10 \u20AC \u2013 15 \u20AC
Mosto de Trebujena: 1,50 \u20AC \u2013 2,50 \u20AC`},{nombre:"La Estancia",descripcion:`Restaurante amplio y muy conocido en Trebujena, ideal para quienes buscan una comida m\xE1s tranquila, sentados y con ambiente c\xF3modo.

A diferencia de otros bares m\xE1s centrados en el tapeo, aqu\xED el plan cambia: mesas, platos, sobremesa y una experiencia m\xE1s pausada.

\u{1F37D}\uFE0F Qu\xE9 ofrece:
\u2022 Cocina tradicional andaluza
\u2022 Guisos caseros
\u2022 Carnes a la brasa
\u2022 Mosto de Trebujena

\u{1F956} Desayunos:
Tambi\xE9n es un punto de encuentro habitual por la ma\xF1ana, muy conocido por sus tostadas andaluzas con manteca color\xE1 o aceite.

\u{1F4A1} Experiencia viajera:
Es una opci\xF3n muy buena si te apetece una comida m\xE1s tranquila, con espacio, sobremesa y cocina tradicional.

\u{1F4A1} Consejo AvenTourArte:
Si vas en fin de semana, especialmente s\xE1bado, es recomendable confirmar disponibilidad, ya que suelen celebrar eventos y puede haber limitaciones de acceso.`,horario:"Lunes a Domingo: 08:00 \u2013 00:00 (aprox.)",precio:"Precio medio por persona: 15 \u20AC \u2013 25 \u20AC"}]},{titulo:"Cultura y Vida Local",contenido:`Trebujena mantiene una intensa vida popular marcada por la convivencia vecinal, el vino mosto, las fiestas singulares y un fuerte sentimiento de identidad colectiva.

Aqu\xED la cultura local no se vive como algo separado de la vida diaria, sino como parte natural del pueblo: en sus celebraciones, en sus bares, en sus costumbres y en su manera de reunirse.

\u{1F4A1} Consejo viajero:
Si quieres entender Trebujena de verdad, no te quedes solo con lo que ves. Intenta captar su ambiente, su forma de hablar, de brindar y de celebrar.`},{titulo:"Fiestas y Festivos Principales",contenido:`Las fiestas de Trebujena son \xFAnicas por su car\xE1cter popular, reivindicativo y festivo.

Aqu\xED las celebraciones no son solo eventos del calendario: son una forma de identidad, de reuni\xF3n y de expresi\xF3n colectiva muy propia del pueblo.`,lugares:[{nombre:"Carnaval",descripcion:`Uno de los carnavales m\xE1s singulares de la zona, conocido por la quema de la Bruja Piti y por su car\xE1cter cr\xEDtico, participativo y muy popular.

\u{1F3AD} Experiencia viajera:
Una de las fiestas que mejor refleja la personalidad libre, ir\xF3nica y muy viva de Trebujena.`,fecha:"Febrero",precio:"Gratis"},{nombre:"Trebufest",descripcion:`Festival alternativo y festivo donde reinan el humor, la m\xFAsica y el ambiente reivindicativo.

Es una de las celebraciones m\xE1s caracter\xEDsticas del pueblo y una de las mejores ocasiones para ver en acci\xF3n su lado m\xE1s desenfadado.

\u{1F379} Tradici\xF3n:
Aqu\xED mandan el Trebujito y la Mistela.`,fecha:"Abril - Mayo",precio:"Gratis"},{nombre:"Fiestas de la Vendimia",descripcion:`Celebraci\xF3n ligada a la recogida de la uva y al vino mosto, con actividades populares, ambiente festivo y fuerte conexi\xF3n con la identidad agr\xEDcola del municipio.

\u{1F347} Experiencia viajera:
Una fiesta perfecta para entender la relaci\xF3n profunda entre Trebujena y su cultura del vino.`,fecha:"Septiembre",precio:"Gratis"},{nombre:"Fiesta de los Garbanzos como Conejos",descripcion:`Fiesta gastron\xF3mica muy popular en la que se reparten garbanzos con arroz \u2014aunque no lleve conejo\u2014 y se bebe mosto en un ambiente de convivencia total.

\u{1F958} Experiencia viajera:
Posiblemente una de las fiestas que mejor resume el esp\xEDritu de Trebujena: cocina popular, humor, tradici\xF3n y mucha vida en la calle.`,fecha:"Primera semana de diciembre",precio:"Gratis"}]}]};var IE={path:"europa/espana/andalucia/sevilla/mairena-del-aljarafe",nombre:"Mairena del Aljarafe",flag:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/mairena-aljarafe-flag",background:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/mairena-aljarafe-flag",bgPos:"50% 65%",bgPosMobile:"50% 65%",bgDim:.1,flagOpacity:.12,flagOpacityMobile:.18,flagSize:"75%",flagSizeMobile:"50%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`Municipio del Aljarafe sevillano situado a solo 6 km de Sevilla capital. Mairena del Aljarafe combina historia, zonas verdes, excelente comunicaci\xF3n y una intensa vida cultural y gastron\xF3mica dentro del \xE1rea metropolitana sevillana.

Es uno de esos lugares que han sabido crecer sin perder del todo su identidad, mezclando su pasado rural con una realidad actual mucho m\xE1s din\xE1mica, conectada y viva.

Aqu\xED conviven iglesias con historia, antiguos vestigios agr\xEDcolas, parques amplios, zonas comerciales y una vida local muy marcada por la cercan\xEDa a Sevilla, pero con personalidad propia.`,secciones:[{titulo:"Historia",contenido:`Mairena del Aljarafe cuenta con or\xEDgenes romanos y andalus\xEDes, dentro de una comarca hist\xF3ricamente ligada a la agricultura y al valor estrat\xE9gico del Aljarafe sevillano.

Tras la Reconquista pas\xF3 por distintas manos nobiliarias, como el Duque de Olivares, la Casa de Alba y la Iglesia, reflejando la importancia territorial y econ\xF3mica que tuvo durante siglos.

En 1840 obtuvo ayuntamiento propio, iniciando su desarrollo como municipio independiente.

A lo largo del tiempo, Mairena ha pasado de ser un enclave rural a convertirse en un importante n\xFAcleo residencial, cultural y social del entorno sevillano, manteniendo al mismo tiempo una identidad propia dentro del \xE1rea metropolitana.`},{titulo:"Geograf\xEDa y Clima",contenido:`Ubicada en el \xE1rea metropolitana de Sevilla, Mairena del Aljarafe forma parte de la comarca del Aljarafe y se caracteriza por su relieve suave, su proximidad al r\xEDo Guadalquivir y su conexi\xF3n inmediata con la capital.

Su posici\xF3n la convierte en un lugar muy bien comunicado, con accesos r\xE1pidos por carretera, metro y cercan\xEDa directa a Sevilla, lo que explica buena parte de su crecimiento en las \xFAltimas d\xE9cadas.

Disfruta de un clima mediterr\xE1neo, con veranos calurosos e inviernos suaves, lo que la hace muy agradable para actividades al aire libre durante gran parte del a\xF1o.

\u{1F4A1} Consejo viajero:
Si la recorres con calma, descubrir\xE1s que Mairena no es solo una ciudad dormitorio de Sevilla, sino un municipio con ritmo propio, espacios verdes y bastantes rincones que conectan muy bien entre s\xED.`},{titulo:"Comunicaciones",lugares:[{nombre:"Metro de Sevilla \u2013 L\xEDnea 1",descripcion:`Una de las grandes ventajas de Mairena del Aljarafe es su excelente conexi\xF3n con Sevilla capital. Con estaciones como Ciudad Expo y Cavaleri, la L\xEDnea 1 del Metro de Sevilla conecta directamente con el centro y con otros puntos clave del \xE1rea metropolitana.

\u{1F687} Experiencia viajera:
Es una de las formas m\xE1s c\xF3modas y pr\xE1cticas de moverse, tanto si vienes desde Sevilla como si est\xE1s alojado en Mairena y quieres combinar ambos planes en el mismo d\xEDa.`,horario:"De Lunes a Jueves 06:30 \u2013 23:00; Viernes y v\xEDsperas de festivos 06:30 \u2013 02:00; S\xE1bados 07:30 \u2013 02:00; Domingos y Festivos 7:30 \u2013 23:00",precio:"Seg\xFAn trayecto"}]},{titulo:"Qu\xE9 visitar en Mairena del Aljarafe",lugares:[{nombre:"Iglesia Parroquial de San Ildefonso",descripcion:`Situada en la Plaza Blas Infante, es el principal templo de Mairena del Aljarafe y est\xE1 dedicada a su patr\xF3n, San Ildefonso.

Construida en el siglo XVI como capilla mud\xE9jar, fue ampliada en el siglo XVII y reformada en el XVIII, lo que le da un valor hist\xF3rico y religioso muy importante dentro del municipio.

En su interior se veneran las im\xE1genes de la Virgen de las Mercedes y de la Virgen del Rosario.

\u26EA Experiencia viajera:
Es uno de esos lugares que ayudan a entender la ra\xEDz m\xE1s tradicional y devocional de Mairena, m\xE1s all\xE1 de su crecimiento moderno.`,foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/iglesia-San-Ildefonso",horario:"Misas: Mar \u2013 Vier. 11:00 - 13:00 y de 19:00 - 20:00; Sab. 19:00 - 20:00; Dom y festivos 12:00 - 14:00  y 19:00 - 21:00. Lunes cerrado.",precio:"Gratis"},{nombre:"Arco de la Prusiana",descripcion:`Ubicado en la calle Zurraque, este arco es uno de los s\xEDmbolos m\xE1s reconocibles del municipio.

Formaba parte de la entrada de la antigua Hacienda La Prusiana, una finca agr\xEDcola del siglo XVIII de la que hoy solo se conserva este elemento arquitect\xF3nico.

\u{1F3DB}\uFE0F Experiencia viajera:
Es una parada breve, pero muy representativa para entender c\xF3mo el pasado agr\xEDcola de Mairena sigue dejando huella en su paisaje urbano.`,foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/arco-prusiana",horario:"Acceso libre",precio:"Gratis"},{nombre:"Hacienda Porzuna",descripcion:`Antigua hacienda agr\xEDcola que representa el pasado rural de Mairena del Aljarafe.

Actualmente est\xE1 restaurada y se utiliza como dependencia municipal, manteniendo su valor hist\xF3rico y arquitect\xF3nico dentro del municipio.

\u{1F3E1} Experiencia viajera:
M\xE1s que una visita monumental, funciona como uno de esos lugares que explican bien la evoluci\xF3n de Mairena: del campo y la hacienda a la ciudad actual.`,foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/mairena-aljarafe-flag",horario:"Exterior visitable Lun\u2013Vie 08:00\u201315:00 ",precio:"Gratis"},{nombre:"Parque Porzuna",descripcion:`Espacio natural protegido situado junto a la Hacienda Porzuna.

Cuenta con zona biosaludable, itinerario bot\xE1nico, \xE1rea canina, barbacoas y merenderos, siendo un lugar ideal para el ocio, el paseo y el contacto con la naturaleza.

\u{1F33F} Experiencia viajera:
Es uno de los rincones m\xE1s agradables para bajar el ritmo, respirar un poco y ver una cara m\xE1s tranquila y verde de Mairena del Aljarafe.`,foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/parque-porzuna",horario:"Invierno 8:00-20:00; Verano se amplia hasta las 22:00 o 23:00",precio:"Gratis"},{nombre:"Colegio Santa Mar\xEDa del Valle",descripcion:`Centro educativo de gran relevancia en la vida social y cultural del municipio, conocido por su tradici\xF3n, eventos y actividades comunitarias.

Destaca especialmente la imagen del Sagrado Coraz\xF3n a la entrada, muy reconocible para quienes conocen la zona.

\u{1F4A1} Experiencia viajera:
M\xE1s all\xE1 de su funci\xF3n educativa, es uno de esos lugares que forman parte de la memoria colectiva y del d\xEDa a d\xEDa de muchos vecinos de Mairena.`,foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/colegio-santa-maria-valle",horario:"Uso educativo",precio:"Gratis"},{nombre:"Centro Comercial Metromar",descripcion:`Principal zona comercial y de ocio de Mairena.

Cuenta con tiendas, restaurantes, cine y acceso directo al metro, siendo un punto de encuentro habitual tanto para vecinos como para quienes pasan por la zona.

\u{1F6CD}\uFE0F Experiencia viajera:
Aqu\xED se ve la parte m\xE1s pr\xE1ctica, moderna y cotidiana del municipio, muy conectada con su crecimiento reciente y su papel dentro del \xE1rea metropolitana.`,foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/metromar",horario:"10:00 \u2013 22:00 (seg\xFAn establecimiento)",precio:"Acceso libre"},{nombre:"MOVE Climbing",descripcion:`Roc\xF3dromo y centro de escalada indoor muy valorado en Mairena del Aljarafe, con zonas de escalada para todos los niveles, zonas de entrenamiento, boulder y espacio para ni\xF1os.

Es una opci\xF3n ideal para una actividad deportiva, din\xE1mica y diferente dentro del municipio.

\u{1F9D7} Experiencia viajera:
Una propuesta muy buena si te apetece combinar la parte m\xE1s tranquila de Mairena con un plan activo y divertido.`,foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/mairena-aljarafe-flag",horario:"Lun\u2013Vie 09:30\u201322:00; S\xE1b\u2013Dom 11:00\u201320:00 (seg\xFAn temporada)",precio:"Entrada de d\xEDa \u2248 10 \u20AC, abono mensual \u2248 45 \u20AC; alquiler material \u2248 7 \u20AC"},{nombre:"Corredor Verde del R\xEDo Pudio",descripcion:`Tramo natural del Corredor Verde del Guadiamar\u2013Riopudio que atraviesa el t\xE9rmino municipal de Mairena del Aljarafe.

Es perfecto para senderismo, paseos en bicicleta y rutas al aire libre, destacando por su paisaje, amplitud y tranquilidad.

\u{1F33F} Experiencia viajera:
Es uno de los mejores lugares para entender que Mairena no es solo urbanizaci\xF3n y conexi\xF3n con Sevilla, sino tambi\xE9n naturaleza y espacio abierto.`,foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/corredor-verde-rio-pudio",horario:"Abierto todo el d\xEDa",precio:"Gratis"}]},{titulo:"Gastronom\xEDa",platos:[{nombre:"Gambas cocidas de Huelva (Pepe el Mudo)",descripcion:`Uno de los grandes imprescindibles gastron\xF3micos de Mairena.

Se trata de gambas de Huelva cocidas en su punto, con sabor limpio a mar y una textura firme y jugosa que las hace destacar por su sencillez y calidad.

Se sirven normalmente reci\xE9n hechas y son perfectas para acompa\xF1ar con una cerveza bien fr\xEDa o una copa de vino.

\u{1F990} Experiencia viajera:
Un cl\xE1sico del tapeo local y uno de esos sabores que conectan directamente con la forma andaluza de disfrutar una barra, una charla y un buen producto.`,foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/gambas-cocidas",precio:"18,00 \u20AC \u2013 25,00 \u20AC"}]},{titulo:"D\xF3nde comer en Mairena del Aljarafe",lugares:[{nombre:"Bar Pepe El Mudo",descripcion:`Uno de los grandes cl\xE1sicos de Mairena del Aljarafe y parada imprescindible para entender el tapeo m\xE1s aut\xE9ntico de la zona.

Aqu\xED no hay artificios: producto, barra y ambiente local. Es de esos sitios donde vienes por una cosa\u2026 y repites siempre por lo mismo.

\u{1F990} Lo que tienes que pedir s\xED o s\xED:
\u2022 Gambas blancas cocidas \u2192 el plato estrella, servidas en su punto justo de sal
\u2022 Cerveza \u2192 famosa por servirse extremadamente fr\xEDa
\u2022 Chacinas y salazones \u2192 especialmente la mojama y los quesos

\u{1F37D}\uFE0F Experiencia viajera:
Esto no es solo comer gambas, es vivir el ritual del tapeo andaluz: barra, ruido, cerveza fr\xEDa y producto de calidad sin complicaciones.

\u2728 Consejo AvenTourArte:
Si quieres probarlo en su mejor momento, ve en hora punta. Es cuando realmente se siente el ambiente del sitio.`,horario:`Lunes: 12:00 \u2013 23:30
Martes: Cerrado
Mi\xE9rcoles a Domingo: 12:00 \u2013 23:30`,precio:`Gambas blancas cocidas (Raci\xF3n): 18,00 \u20AC \u2013 25,00 \u20AC
Tapas y Montaditos: 3,00 \u20AC \u2013 5,00 \u20AC`},{nombre:"Bar El Metro",descripcion:`Bar tradicional muy frecuentado por vecinos, ideal para tapas cl\xE1sicas y ambiente local.

Es uno de esos sitios donde se nota el pulso real de Mairena: cocina sencilla, trato cercano y una clientela habitual que lo convierte en un punto muy aut\xE9ntico del municipio.

\u{1F37D}\uFE0F Especialidades recomendadas:
\u2022 Montaditos \u2192 especialmente el de "pring\xE1"
\u2022 Carne con tomate
\u2022 Ensaladilla

\u{1F96A} Extra:
Tambi\xE9n es una muy buena opci\xF3n para desayunar la t\xEDpica tostada andaluza si vas temprano.

\u{1F4A1} Experiencia viajera:
Perfecto para un tapeo informal, barato y sin artificios, de esos que realmente conectan con la vida local.`,horario:`Lunes y martes: 09:00 \u2013 17:00
Mi\xE9rcoles: Cerrado
Jueves: 09:00 \u2013 17:00 | 20:30 \u2013 23:30
Viernes: 09:00 \u2013 16:00 | 20:30 \u2013 23:30
S\xE1bado: 13:00 \u2013 16:00 | 20:30 \u2013 23:30
Domingo: 12:00 \u2013 16:00 | 20:00 \u2013 00:00`,precio:`Tapas: 2,50 \u20AC \u2013 3,50 \u20AC
Raciones: 8 \u20AC \u2013 14 \u20AC`},{nombre:"Bodega San Rafael",descripcion:`Establecimiento de cocina andaluza tradicional muy consolidado en Mairena, ideal tanto para desayunar como para tapear o sentarse a comer con calma.

Uno de sus grandes puntos fuertes es su horario amplio y continuo, lo que lo convierte en un sitio muy vers\xE1til a cualquier hora del d\xEDa.

\u{1F37D}\uFE0F Especialidades recomendadas:
\u2022 Cola de toro
\u2022 Espinacas con garbanzos
\u2022 Carnes de calidad a la brasa

\u{1F377} Vinos:
Como buena bodega, ofrece una excelente selecci\xF3n de vinos, tanto de la zona como de otras denominaciones, perfectos para acompa\xF1ar chacinas y quesos.

\u{1F956} Desayunos:
Uno de los mejores sitios de Mairena para empezar el d\xEDa, con gran variedad de panes y aceites.

\u{1F4A1} Experiencia viajera:
Un lugar muy completo que funciona igual de bien para un desayuno andaluz, un tapeo informal o una comida m\xE1s tradicional y contundente.`,horario:"Lunes a domingo: 07:00 \u2013 00:00",precio:`Tapas: 3,00 \u20AC \u2013 4,50 \u20AC
Raciones: 10,00 \u20AC \u2013 18,00 \u20AC
Carnes a la brasa: 14,00 \u20AC \u2013 22,00 \u20AC`},{nombre:"Restaurante El Mercado de Enma",descripcion:`Propuesta gastron\xF3mica moderna en Mairena del Aljarafe, donde el producto de calidad y la cocina elaborada se combinan con una presentaci\xF3n cuidada.

Es una opci\xF3n perfecta si buscas algo m\xE1s trabajado que el tapeo cl\xE1sico, sin llegar a ser excesivamente formal.

\u{1F37D}\uFE0F Platos recomendados:
\u2022 Arroces \u2192 suelen tener uno diferente cada d\xEDa (especialmente interesante en la zona de comida para llevar)
\u2022 Ensaladilla casera
\u2022 Croquetas
\u2022 Carnes seleccionadas
\u2022 Pescados frescos con guarniciones originales

\u{1F371} Extra:
Cuenta con men\xFA del d\xEDa para llevar, muy buena opci\xF3n si buscas calidad a buen precio sin sentarte.

\u{1F4A1} Experiencia viajera:
Un sitio muy equilibrado que mezcla cocina tradicional con un toque m\xE1s actual, ideal para salir un poco del tapeo t\xEDpico sin perder el sabor local.`,horario:`Lunes: 13:15 \u2013 16:00 (Cerrado por la noche)
Martes a Jueves: 13:15 \u2013 16:00 | 20:30 \u2013 23:00
Viernes y S\xE1bado: 13:15 \u2013 16:15 | 20:30 \u2013 23:15
Domingo: 13:15 \u2013 16:00 (Cerrado por la noche)`,precio:`Tapas elaboradas: 4,00 \u20AC \u2013 6,00 \u20AC
Platos / Raciones: 12,00 \u20AC \u2013 22,00 \u20AC
Men\xFA del d\xEDa (para llevar): 9,00 \u20AC \u2013 12,00 \u20AC
Postres caseros: 5,00 \u20AC \u2013 7,00 \u20AC`},{nombre:"Restaurante Casa Lim\xF3n",descripcion:`Uno de los restaurantes m\xE1s reconocidos de Mairena del Aljarafe, donde la cocina de autor se apoya en ra\xEDces andaluzas para crear una experiencia m\xE1s cuidada y completa.

Aqu\xED el concepto sube de nivel: producto de calidad, elaboraci\xF3n m\xE1s trabajada y un ambiente pensado para disfrutar sin prisa.

\u{1F37D}\uFE0F Platos que no te puedes perder:
\u2022 Arroces y platos al horno de le\xF1a
\u2022 At\xFAn rojo
\u2022 Carnes a la brasa

\u{1F370} Postres:
Postres caseros con un toque moderno, haciendo honor a su nombre con opciones c\xEDtricas que aportan frescura al final de la comida.

\u2728 Experiencia viajera:
Es el sitio ideal para una comida o cena especial en Mairena, perfecto para cerrar una ruta gastron\xF3mica con una propuesta m\xE1s elaborada y con personalidad.`,horario:`Lunes: 13:30 \u2013 17:30 | 20:30 \u2013 00:00
Martes: Cerrado
Mi\xE9rcoles y Jueves: 13:30 \u2013 17:30 | 20:30 \u2013 00:00
Viernes, S\xE1bado y Domingo: 13:30 \u2013 00:30 (Horario ininterrumpido)`,precio:`Precio medio: 25 \u20AC \u2013 35 \u20AC
Entrantes / Tapas: 4,50 \u20AC \u2013 12,00 \u20AC
Platos principales: 14,00 \u20AC \u2013 24,00 \u20AC
Men\xFAs especiales (ej. Feria): ~53 \u20AC`}]},{titulo:"Cultura y Vida Local",contenido:`Mairena del Aljarafe combina la tranquilidad residencial con una vida social bastante activa.

Destacan sus fiestas locales, actividades culturales, eventos deportivos y su cercan\xEDa a Sevilla, que ampl\xEDa enormemente la oferta cultural y de ocio.

Al mismo tiempo, el municipio mantiene una din\xE1mica propia, con espacios de convivencia, tradici\xF3n y planes cotidianos que le dan identidad m\xE1s all\xE1 de su papel dentro del \xE1rea metropolitana.

\u{1F4A1} Consejo viajero:
La mejor forma de entender Mairena no es solo visitando sus puntos m\xE1s conocidos, sino viendo c\xF3mo se mezcla lo residencial, lo tradicional y lo moderno en su vida diaria.`},{titulo:"Fiestas y Festivos Principales",contenido:`A lo largo del a\xF1o, Mairena del Aljarafe celebra numerosas fiestas populares, religiosas y culturales que reflejan la identidad andaluza del municipio y su intensa vida social.

Muchas de ellas est\xE1n muy ligadas a la tradici\xF3n local, mientras que otras muestran la evoluci\xF3n de Mairena como una localidad din\xE1mica y con una agenda cultural cada vez m\xE1s activa.`,lugares:[{nombre:"San Ildefonso",descripcion:"Fiesta del patr\xF3n de Mairena del Aljarafe. Se celebra con actos religiosos, procesi\xF3n y convivencia vecinal, siendo una de las fechas m\xE1s importantes del calendario local.",fecha:"23 de enero",precio:"Gratis"},{nombre:"Carnaval",descripcion:"Celebraci\xF3n popular con disfraces, m\xFAsica y actividades para todas las edades, fomentando la participaci\xF3n vecinal y el ambiente festivo.",fecha:"Febrero",precio:"Gratis"},{nombre:"Feria del Libro",descripcion:"Evento cultural dedicado a la literatura, con presentaciones, firmas de autores, actividades infantiles y fomento de la lectura.",fecha:"Abril",precio:"Gratis"},{nombre:"Cruz de Mayo",descripcion:"Fiesta tradicional andaluza en la que se instalan cruces decoradas con flores, acompa\xF1adas de m\xFAsica, baile y gastronom\xEDa t\xEDpica.",fecha:"Mayo",precio:"Gratis"},{nombre:"Feria de la Tapa",descripcion:"Cita gastron\xF3mica muy popular donde bares y restaurantes locales ofrecen tapas a precios especiales, acompa\xF1adas de ambiente festivo.",fecha:"Mayo",precio:"Seg\xFAn consumo"},{nombre:"Roc\xEDo",descripcion:"La Hermandad del Roc\xEDo de Mairena participa en la tradicional romer\xEDa hacia la aldea del Roc\xEDo, combinando devoci\xF3n, convivencia y tradici\xF3n.",fecha:"Mayo / Junio",precio:"Gratis"},{nombre:"Virgen del Rosario",descripcion:"Celebraci\xF3n religiosa y popular en honor a la Virgen del Rosario, con procesi\xF3n y actos lit\xFArgicos muy arraigados en la tradici\xF3n local.",fecha:"Mayo y Octubre",precio:"Gratis"},{nombre:"Feria de Mairena del Aljarafe",descripcion:"La feria local se celebra en el Centro Multiusos con el tradicional alumbrado del recinto ferial, actuaciones musicales de artistas nacionales, casetas, atracciones y actividades infantiles como el D\xEDa del Ni\xF1o.",fecha:"Junio",precio:"Seg\xFAn consumo"},{nombre:"Fiestas de la Virgen de las Mercedes",descripcion:"Celebraciones en honor a la patrona del municipio, con actos religiosos, procesi\xF3n, actividades culturales y eventos festivos.",fecha:"Junio y Septiembre",precio:"Gratis"},{nombre:"Cabaret Festival",descripcion:"Festival musical de gran formato que re\xFAne a artistas nacionales e internacionales, consolidando a Mairena como sede de grandes eventos culturales.",fecha:"Verano",precio:"Entrada seg\xFAn espect\xE1culo"},{nombre:"Zambomba Mairenera",descripcion:"Tradicional celebraci\xF3n navide\xF1a con villancicos, zambombas y ambiente familiar que llena las calles de m\xFAsica y tradici\xF3n.",fecha:"Diciembre",precio:"Gratis"},{nombre:"Navidad y Cabalgata de Reyes",descripcion:"Durante las fiestas navide\xF1as, Mairena se ilumina con decoraci\xF3n, belenes y actividades infantiles, culminando con la tradicional Cabalgata de Reyes Magos.",fecha:"Diciembre \u2013 Enero",precio:"Gratis"}]}]};var TE={path:"europa/italia/roma",nombre:"Roma y Ciudad del Vaticano",flag:"cld:europa/italia/roma/roma-flag",flag2:"cld:europa/italia/roma/vaticano-flag",background:"cld:europa/italia/italia-bg",bgPos:"50% 50%",bgPosMobile:"50% 50%",bgDim:.12,flagOpacity:.1,flagOpacityMobile:.16,flagSize:"75%",flagSizeMobile:"55%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`Roma no es solo una ciudad, es un viaje continuo a trav\xE9s del tiempo. Aqu\xED no visitas monumentos, caminas literalmente sobre m\xE1s de 2.000 a\xF1os de historia.

Cada calle, cada plaza y cada rinc\xF3n conecta con una civilizaci\xF3n que marc\xF3 el mundo: el Imperio romano. Pero Roma no se qued\xF3 ah\xED. A esa base se le superpone la Roma papal, el arte del Renacimiento, la explosi\xF3n barroca y la vida italiana actual.

El resultado es una ciudad ca\xF3tica, monumental, elegante y profundamente viva.

Puedes estar viendo una ruina del siglo I, girar la esquina y encontrarte una iglesia barroca espectacular, y terminar el d\xEDa cenando en un barrio lleno de ambiente como Trastevere.

El Vaticano a\xF1ade otra dimensi\xF3n completamente distinta: espiritual, art\xEDstica y monumental. Aqu\xED se concentran algunas de las obras m\xE1s importantes de la historia del arte y uno de los centros religiosos m\xE1s influyentes del mundo.

Roma no se visita\u2026 se siente. Y cuanto m\xE1s caminas, m\xE1s te atrapa.`,infoGeneral:{idioma:"Italiano",moneda:"Euro (\u20AC)",hora:"UTC +1 (igual que Espa\xF1a)",internet:"Roaming UE disponible",electricidad:"230V \u2013 Enchufe tipo C, F y L",pasaporte:"DNI o pasaporte v\xE1lido",visado:"No necesario para ciudadanos UE",vacunas:"No obligatorias"},secciones:[{titulo:"Historia",contenido:`La historia de Roma es, en gran parte, la historia de Europa.

Seg\xFAn la leyenda, fue fundada en el 753 a.C. por R\xF3mulo y Remo. Con el paso de los siglos, pas\xF3 de ser una peque\xF1a ciudad a convertirse en el centro del Imperio romano, una de las civilizaciones m\xE1s poderosas que han existido.

Desde aqu\xED se gobernaba un territorio que abarcaba desde Hispania hasta Oriente Medio. El Foro Romano, el Coliseo o el Palatino no son solo ruinas: eran el coraz\xF3n pol\xEDtico, social y econ\xF3mico del mundo antiguo.

Tras la ca\xEDda del Imperio, Roma no desaparece. Se transforma.

Se convierte en el centro del cristianismo y sede del Papado, dando lugar a la Roma medieval y posteriormente a la Roma renacentista y barroca, donde artistas como Miguel \xC1ngel, Bernini o Rafael dejaron algunas de las obras m\xE1s importantes de la historia.

El Vaticano nace como estado independiente en 1929, consolidando su papel como centro espiritual del mundo cat\xF3lico.

Hoy, Roma es una mezcla \xFAnica de todas esas \xE9pocas. Aqu\xED no hay una sola ciudad, hay muchas superpuestas. Y eso es precisamente lo que la hace tan especial.`},{titulo:"Geograf\xEDa y Clima",contenido:`Roma se encuentra en el centro de Italia, atravesada por el r\xEDo T\xEDber y construida sobre sus famosas siete colinas hist\xF3ricas.

La ciudad combina dos caras muy marcadas: un centro hist\xF3rico denso, monumental y perfectamente caminable, y una Roma m\xE1s amplia y moderna que se extiende en todas direcciones.

Moverse a pie es la mejor forma de descubrirla, porque muchas de sus mejores sorpresas no est\xE1n en los mapas, sino entre callejones, plazas escondidas y peque\xF1as iglesias.

El clima es t\xEDpicamente mediterr\xE1neo:

\u2022 Veranos: calurosos y secos (especialmente julio y agosto)
\u2022 Invierno: suave, aunque con algo de lluvia
\u2022 Primavera y oto\xF1o: las mejores \xE9pocas para viajar, con temperaturas agradables y menos aglomeraciones

\u{1F4A1} Consejo viajero:
Roma exige caminar bastante, as\xED que es clave organizar el itinerario por zonas y combinar visitas culturales con paradas para comer o descansar.

Es una ciudad intensa, pero si sabes dosificarla, la disfrutas much\xEDsimo m\xE1s.`},{titulo:"Qu\xE9 visitar en Roma y el Vaticano",itinerario:[{dia:"D\xEDa 1 \u2013 Centro hist\xF3rico, Roma cl\xE1sica y Coliseo de noche",zonas:[{nombre:"Fontana di Trevi",descripcion:`La Fontana di Trevi es uno de los lugares m\xE1s ic\xF3nicos para comenzar un primer d\xEDa en Roma y una de las grandes obras maestras del Barroco italiano. M\xE1s que una fuente, es un aut\xE9ntico escenario monumental donde arquitectura, escultura y agua se combinan de forma espectacular.

Fue dise\xF1ada en el siglo XVIII y marca el punto final del antiguo acueducto Aqua Virgo, construido en el a\xF1o 19 a.C., conectando directamente este lugar con la Roma imperial. En el centro aparece Neptuno dominando la composici\xF3n sobre un carro tirado por caballos marinos, simbolizando el poder y la fuerza del oc\xE9ano.

Llegar aqu\xED impresiona incluso aunque la hayas visto mil veces en fotos. La plaza se abre de repente y la fuente aparece enorme, luminosa y llena de detalles. De noche, con la iluminaci\xF3n y el sonido del agua, la experiencia cambia por completo y se vuelve todav\xEDa m\xE1s especial.

\u{1F4B0} Tradici\xF3n viajera:
Lanzar una moneda significa volver a Roma, dos monedas traen amor y tres matrimonio. Cada d\xEDa se recogen miles de euros que se destinan a causas sociales.

\u{1F4A1} Truco AvenTourArte:
Si quieres una vista diferente y mucho menos masificada, entra en la tienda de United Colors of Benetton que hay justo enfrente de la fuente y sube a la segunda planta. Desde sus ventanas tendr\xE1s una perspectiva elevada de la Fontana di Trevi sin la multitud.

\u{1F4A1} Consejo AvenTourArte:
Si puedes, vis\xEDtala dos veces: una de d\xEDa para apreciar todos los detalles y otra de noche para vivir la atm\xF3sfera completa. Son dos momentos totalmente distintos.

\u26A0\uFE0F Importante:
Desde febrero de 2026 el acceso a la zona m\xE1s cercana a la fuente est\xE1 regulado para controlar el aforo.`,foto:"cld:europa/italia/roma/fontana-trevi",horario:`Acceso regulado:
Lunes y viernes: 11:30 \u2013 22:00
Martes, mi\xE9rcoles, jueves, s\xE1bado y domingo: 09:00 \u2013 22:00
Segundo lunes de cada mes: desde 14:00
\xDAltimo acceso: 21:30

\u{1F4A1} Consejo:
Antes de las 09:00 y despu\xE9s de las 22:00 suele ser el mejor momento para verla sin tanta gente.`,precio:`Zona baja (acceso cercano a la fuente): 2\u20AC
Zona superior de la plaza: gratis

Acceso gratuito en la zona regulada para:
\u2022 Residentes en Roma
\u2022 Menores de 6 a\xF1os
\u2022 Personas con discapacidad`},{nombre:"Pante\xF3n de Agripa",descripcion:`Desde la Fontana di Trevi, lo mejor es dejarte llevar por las calles del centro hist\xF3rico en direcci\xF3n al Pante\xF3n. Ese paseo ya forma parte de la experiencia: callejuelas estrechas, plazas escondidas y ese ambiente tan caracter\xEDstico de Roma que mezcla historia y vida diaria.

De repente, entre edificios aparentemente normales, aparece el Pante\xF3n. Y es uno de esos momentos en los que Roma golpea fuerte.

Construido originalmente por Agripa en el 27 a.C. y reconstruido por el emperador Adriano, es el edificio mejor conservado de toda la Antigua Roma. Lo que ves hoy es pr\xE1cticamente el mismo espacio que hace casi 2.000 a\xF1os.

Al entrar, todo cambia. El ruido desaparece y te envuelve una sensaci\xF3n de equilibrio y grandeza dif\xEDcil de explicar. La c\xFApula, perfectamente proporcionada, y el \xF3culo central de 9 metros convierten el espacio en una obra de ingenier\xEDa adelantada a su tiempo.

\u2600\uFE0F Momento clave del itinerario:
Si llegas entre las 12:00 y las 13:00, ver\xE1s el famoso haz de luz entrando de forma vertical por el \xF3culo, iluminando el interior como si fuera un foco natural. Es uno de los momentos m\xE1s m\xE1gicos de todo el viaje.

\u{1F4A1} Detalles que marcan la diferencia:
\u2022 En d\xEDas de lluvia, el agua cae dentro del templo y desaparece por los drenajes del suelo
\u2022 Aqu\xED est\xE1 enterrado Rafael, uno de los grandes artistas del Renacimiento
\u2022 El edificio funciona como una iglesia activa, lo que le da un ambiente a\xFAn m\xE1s especial

\u2728 Consejo AvenTourArte:
Col\xF3cate justo debajo del \xF3culo y mira hacia arriba unos segundos. Es uno de esos momentos que no se olvidan.`,foto:"cld:europa/italia/roma/panteon",horario:`Todos los d\xEDas: 09:00\u201319:00 (\xFAltimo acceso 18:30)
S\xE1bados: misa 17:00 | Domingos/festivos: misa 10:30`,precio:`Entrada general: 5\u20AC | UE (18\u201325): 3\u20AC | Gratis: <18 a\xF1os y residentes
Primer domingo de mes: gratis (con colas)`},{nombre:"Piazza Navona",foto:"cld:europa/italia/roma/piazza-navona",descripcion:`Tras la calma y la perfecci\xF3n del Pante\xF3n, el paseo contin\xFAa por peque\xF1as calles hasta desembocar en uno de los espacios m\xE1s vibrantes de Roma: la Piazza Navona.

El cambio es inmediato. Pasas de un lugar silencioso y casi espiritual a una plaza llena de vida, artistas callejeros, m\xFAsica y movimiento.

Pero m\xE1s all\xE1 de su ambiente, Navona es pura historia. Bajo tus pies se encuentra el antiguo estadio de Domiciano, construido en el siglo I, cuya forma alargada sigue definiendo la plaza actual.

En el centro destaca la Fontana dei Quattro Fiumi, una de las grandes obras de Bernini, representando los r\xEDos del mundo conocido: el Nilo, el Ganges, el Danubio y el R\xEDo de la Plata.

Justo enfrente, la iglesia de Sant\u2019Agnese in Agone, dise\xF1ada por Borromini, crea un contraste perfecto entre dos de los grandes genios del Barroco.

Navona es uno de esos lugares donde apetece parar sin mirar el reloj. Por la ma\xF1ana, la luz resalta cada detalle arquitect\xF3nico y permite disfrutarla con calma. Al atardecer y por la noche, la plaza se transforma y se llena de artistas, pintores y un ambiente muy aut\xE9ntico.

Aunque la plaza es gratuita, conviene evitar las terrazas del centro si no quieres pagar precios elevados; basta con alejarse un par de calles para encontrar opciones mucho mejores.`,horario:`Plaza: abierta 24h

Iglesia Sant\u2019Agnese:
09:00\u201313:00 y 15:00\u201319:00`,precio:`Plaza: GRATIS
Iglesia: gratuita (donativo)
Estadio de Domiciano: \u2248 9\u20AC
Museo de Roma (Palazzo Braschi): \u2248 9\u201311\u20AC`},{nombre:"Campo de\u2019 Fiori",descripcion:`Despu\xE9s de la elegancia barroca de Piazza Navona, el recorrido contin\xFAa hacia Campo de\u2019 Fiori, donde Roma cambia de registro y se vuelve m\xE1s cotidiana, m\xE1s aut\xE9ntica y tambi\xE9n m\xE1s cruda.

En apenas unos minutos a pie pasas de fuentes monumentales y artistas callejeros a una plaza abierta con mucha m\xE1s vida local. Campo de\u2019 Fiori significa literalmente \u201Ccampo de flores\u201D, porque en la Edad Media esta zona era un prado. Con el tiempo se transform\xF3 en uno de los mercados m\xE1s importantes de la ciudad.

\u{1F4A1} Lo m\xE1s interesante de esta plaza es su doble personalidad.

\u{1F31E} Por la ma\xF1ana se llena de puestos de fruta, verduras, especias, flores, aceites, pastas y productos locales. Aunque hoy tiene bastante presencia tur\xEDstica, sigue siendo un lugar muy bueno para ver el ritmo cotidiano de Roma.

\u2694\uFE0F En el centro se alza la estatua de Giordano Bruno, fil\xF3sofo quemado vivo por la Inquisici\xF3n en 1600 exactamente en este mismo lugar. Eso le da a la plaza un car\xE1cter distinto al de otras plazas romanas: menos monumental, m\xE1s rebelde y m\xE1s austero.

\u{1F306} Cuando el mercado recoge y la plaza se despeja, Campo de\u2019 Fiori cambia por completo. A partir de la tarde se convierte en un punto cl\xE1sico para el aperitivo, cenar o tomar algo al aire libre.

\u{1F956} Parada imprescindible:
Forno Campo de\u2019 Fiori, una de las panader\xEDas m\xE1s famosas de Roma.

\u{1F4A1} Qu\xE9 probar:
La pizza bianca reci\xE9n hecha, simple pero espectacular, perfecta para seguir la ruta sin perder tiempo.

\u2728 Consejo AvenTourArte:
Si quieres sentir la plaza de verdad, ve por la ma\xF1ana para verla con mercado y, si puedes, vuelve de noche para notar el cambio de ambiente. Son dos lugares completamente distintos en el mismo espacio.`,foto:"cld:europa/italia/roma/campo-de-fiori",horario:`Plaza: acceso libre 24h
Mercado: Lun\u2013S\xE1b 07:00\u201314:00 aprox. | Dom: cerrado o muy reducido
Forno Campo de\u2019 Fiori: horario variable seg\xFAn d\xEDa`,precio:`Plaza y mercado: gratis
Forno Campo de\u2019 Fiori: precio econ\xF3mico-moderado`},{nombre:"Largo di Torre Argentina",descripcion:`Despu\xE9s del ambiente local y cotidiano de Campo de\u2019 Fiori, el recorrido contin\xFAa hacia uno de los lugares m\xE1s sorprendentes de Roma: Largo di Torre Argentina.

A simple vista parece solo una plaza con ruinas, pero est\xE1s en uno de los puntos m\xE1s importantes de la historia de la humanidad.

Aqu\xED, en el a\xF1o 44 a.C., fue asesinado Julio C\xE9sar.

\u{1F4A1} Contexto hist\xF3rico:
El magnicidio tuvo lugar en la Curia de Pompeyo, cuyos restos se encuentran dentro de este complejo arqueol\xF3gico. Fue un momento clave que marc\xF3 el final de la Rep\xFAblica romana y el inicio del Imperio.

\u{1F3DB}\uFE0F Qu\xE9 ver:
En la plaza encontrar\xE1s cuatro templos republicanos (siglos IV\u2013II a.C.), identificados como A, B, C y D. Son algunas de las estructuras m\xE1s antiguas que se conservan en Roma.

\u{1F6B6} Experiencia actual:
Durante a\xF1os solo se pod\xEDa ver desde arriba, pero ahora puedes bajar al nivel de las ruinas gracias a una pasarela que permite recorrer el yacimiento desde dentro.

\u{1F431} Curiosidad \xFAnica:
Este lugar tambi\xE9n es famoso por su santuario de gatos. Decenas de gatos viven entre las ruinas, cuidados por voluntarios. Es uno de los rincones m\xE1s curiosos y entra\xF1ables de la ciudad.

\u{1F4A1} Experiencia viajera:
El contraste es brutal: est\xE1s en el centro de una ciudad ca\xF3tica, rodeado de tr\xE1fico, y de repente miras abajo y ves m\xE1s de 2.000 a\xF1os de historia.

\u{1F4A1} Consejo viajero:
Si vas justo de tiempo, no es imprescindible bajar. Desde arriba se aprecia muy bien todo el conjunto.

\u2728 Consejo AvenTourArte:
Este es uno de esos lugares donde Roma te golpea con su historia sin avisar. Dedica unos minutos a entender lo que pas\xF3 aqu\xED.`,foto:"cld:europa/italia/roma/torre-argentina",horario:`\xC1rea arqueol\xF3gica: Mar\u2013Dom 09:30\u201316:00 (invierno) / hasta 19:00 (verano) | Lun cerrado
Santuario de gatos: acceso libre (horario variable)`,precio:`\xC1rea arqueol\xF3gica: 5\u20AC | Reducida: 4\u20AC | Gratis: menores 18, residentes, discapacidad
Vista desde arriba y santuario de gatos: gratis`},{nombre:"Antichi Sapori \u2013 Pizza Rossa",descripcion:`Despu\xE9s de visitar el Largo di Torre Argentina, donde la historia de Roma alcanza uno de sus momentos m\xE1s impactantes con el asesinato de Julio C\xE9sar, el recorrido contin\xFAa con una parada m\xE1s ligera, pero igual de aut\xE9ntica.

A pocos minutos andando, Antichi Sapori es el sitio perfecto para hacer una pausa r\xE1pida y probar uno de los snacks m\xE1s t\xEDpicos de la ciudad: la pizza rossa.

\u{1F355} \xBFQu\xE9 la hace especial?
Aqu\xED no encontrar\xE1s la pizza cl\xE1sica con queso. Esta es la versi\xF3n m\xE1s pura y callejera de Roma:

\u2022 Base: masa muy fina y extremadamente crujiente (scrocchiarella)
\u2022 Salsa: tomate casero intenso, con un sabor muy equilibrado
\u2022 Sin queso: lo que la hace ligera, r\xE1pida y perfecta para seguir la ruta

A veces lleva un toque de or\xE9gano o aceite de oliva virgen extra.

\u{1F4A1} Experiencia viajera:
Es el t\xEDpico bocado romano que no sale en las gu\xEDas, pero que forma parte del d\xEDa a d\xEDa local.

\u{1F4A1} Consejo PRO:
P\xEDdela caliente si no est\xE1 reci\xE9n hecha. Cambia totalmente la experiencia.

\u{1F4A1} Tip AvenTourArte:
C\xF3mela caminando, sin prisas pero sin parar demasiado. Es justo ese tipo de parada que encaja perfecto entre visitas.`,foto:"cld:europa/italia/roma/pizza-rossa",horario:"Todos los d\xEDas: 10:00 \u2013 20:00/21:00 (domingos puede cerrar antes)",precio:"3\u20AC \u2013 5\u20AC aprox. por porci\xF3n (seg\xFAn peso)"},{nombre:"Su Ghetto Kosher Restaurant (Alternativa)",descripcion:`\u{1F4A1} Alternativa a Antichi Sapori:

Si en lugar de un snack r\xE1pido prefieres sentarte a comer con calma, a pocos pasos del Largo di Torre Argentina puedes adentrarte en el Barrio Jud\xEDo de Roma y descubrir Su Ghetto Kosher Restaurant.

Este restaurante es una de las mejores puertas de entrada a la cocina judeo-romana, una tradici\xF3n gastron\xF3mica \xFAnica nacida dentro del antiguo gueto.

\u{1F3DB}\uFE0F Contexto:
El Barrio Jud\xEDo es una de las zonas m\xE1s hist\xF3ricas de Roma, donde durante siglos se desarroll\xF3 una cocina propia basada en ingredientes sencillos pero t\xE9cnicas muy caracter\xEDsticas.

\u{1F37D}\uFE0F Platos imprescindibles:
\u2022 Carciofi alla Giudia \u2B50 \u2192 alcachofas fritas enteras, crujientes como una flor (de lo mejor de Roma)
\u2022 Baccal\xE0 fritto \u2192 bacalao rebozado muy t\xEDpico
\u2022 Pastas kosher \u2192 versiones de la cocina romana adaptadas a sus normas

\u{1F4A1} Experiencia viajera:
Aqu\xED el ritmo cambia. Pasas del bullicio del centro a una zona m\xE1s tranquila, con un ambiente muy aut\xE9ntico.

\u{1F4A1} Consejo PRO:
Si puedes, si\xE9ntate en la terraza con vistas al P\xF3rtico de Octavia. Es una experiencia top.

\u2728 Consejo AvenTourArte:
Elige seg\xFAn tu ritmo:
\u2022 Poco tiempo \u2192 Antichi Sapori (r\xE1pido)
\u2022 Experiencia gastron\xF3mica \u2192 Su Ghetto (m\xE1s completo)`,horario:"Dom\u2013Jue: 12:00\u201323:00 | Vie: 12:00\u201315:00 | S\xE1b: 18:30\u201323:30",precio:"6\u20AC \u2013 25\u20AC por plato"},{nombre:"Gran Sinagoga de Roma (Tempio Maggiore)",descripcion:`Despu\xE9s de haber descubierto la gastronom\xEDa del Barrio Jud\xEDo, el siguiente paso natural es entender su historia y su identidad.

A apenas unos minutos caminando se encuentra la Gran Sinagoga de Roma, el principal templo de la comunidad jud\xEDa y uno de los s\xEDmbolos m\xE1s importantes del Ghetto.

Su c\xFApula cuadrada, \xFAnica en toda Roma, destaca sobre el skyline de la ciudad y representa la presencia de una de las comunidades jud\xEDas m\xE1s antiguas de Europa.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
La comunidad jud\xEDa de Roma tiene m\xE1s de 2.000 a\xF1os de historia. Durante siglos vivi\xF3 confinada en el Ghetto, y este templo se construy\xF3 tras su emancipaci\xF3n en el siglo XIX como s\xEDmbolo de libertad y reconstrucci\xF3n.

\u{1F3A7} Visita:
El acceso se realiza a trav\xE9s del Museo Jud\xEDo de Roma e incluye una visita guiada al interior de la sinagoga.

\u{1F4A1} Experiencia viajera:
No es solo una visita arquitect\xF3nica, es una forma de entender una parte menos visible pero fundamental de Roma.

\u{1F4A1} Consejo PRO:
Las explicaciones de los gu\xEDas son clave. Merece mucho la pena hacer la visita completa.

\u26A0\uFE0F Importante:
Los controles de seguridad son estrictos (tipo aeropuerto), as\xED que calcula algo de tiempo extra.

\u2728 Consejo AvenTourArte:
Este punto cierra perfectamente la experiencia del Ghetto: primero lo saboreas y luego lo entiendes.`,foto:"cld:europa/italia/roma/sinagoga-roma",horario:"Dom\u2013Jue: 10:00\u201317:00 (\xFAltima entrada 16:15) | Vie: 09:00\u201314:00 | S\xE1b: cerrado",precio:"Entrada combinada museo + sinagoga: 11\u20AC | Reducida: 8\u20AC | Menores de 10: gratis"},{nombre:"Teatro de Marcelo",descripcion:`Despu\xE9s de comprender la historia del Barrio Jud\xEDo en la Gran Sinagoga, el recorrido contin\xFAa hacia uno de los rincones m\xE1s sorprendentes y menos masificados de Roma: el Teatro de Marcelo.

A primera vista puede recordarte al Coliseo, y no es casualidad.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
Construido en el siglo I a.C. por orden de Julio C\xE9sar y terminado por el emperador Augusto, este teatro es en realidad anterior al Coliseo y sirvi\xF3 como modelo para su dise\xF1o.

Pod\xEDa albergar a m\xE1s de 15.000 espectadores y era uno de los grandes centros culturales de la Roma antigua.

\u{1F3D7}\uFE0F Evoluci\xF3n \xFAnica:
Con el paso de los siglos, el teatro fue transform\xE1ndose:

\u2022 Edad Media \u2192 fortaleza
\u2022 Renacimiento \u2192 palacio de la familia Orsini
\u2022 Actualidad \u2192 viviendas privadas sobre la estructura romana

\u{1F4A1} Detalle curioso:
Si miras hacia arriba, ver\xE1s ventanas y balcones con flores. S\xED, hay gente viviendo literalmente encima de un teatro romano de m\xE1s de 2.000 a\xF1os.

\u{1F4F8} Experiencia viajera:
Es uno de esos lugares donde Roma vuelve a sorprender: menos gente, m\xE1s autenticidad y una mezcla brutal de \xE9pocas.

\u{1F4A1} Consejo PRO:
F\xEDjate en las columnas:
\u2022 D\xF3rico (abajo)
\u2022 J\xF3nico (medio)
\u2022 Corintio (arriba, originalmente)

Es exactamente el esquema que luego se replic\xF3 en el Coliseo.

\u{1F305} Mejor momento:
Al atardecer, cuando la piedra se vuelve dorada, es uno de los sitios m\xE1s bonitos para fotos.

\u2728 Consejo AvenTourArte:
Este punto cierra perfectamente el recorrido por esta zona: historia antigua, cultura y vida actual conviviendo en el mismo lugar.`,foto:"cld:europa/italia/roma/teatro-marcelo",horario:"Zona exterior: acceso libre todo el d\xEDa | \xC1rea arqueol\xF3gica: aprox. 09:00\u201318:00 (hasta atardecer en invierno)",precio:"Gratis (zona exterior) | Conciertos Tempietto: precio variable"},{nombre:"Piazza del Campidoglio y Museos Capitolinos",descripcion:`Desde el Teatro de Marcelo, el itinerario asciende hacia uno de los lugares m\xE1s elegantes y simb\xF3licos de Roma: la colina del Capitolio.

Aqu\xED te espera la Piazza del Campidoglio, un espacio dise\xF1ado por Miguel \xC1ngel que transforma completamente la percepci\xF3n de la ciudad.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
El Capitolio fue una de las siete colinas de la antigua Roma y el centro pol\xEDtico y religioso de la ciudad.

Siglos despu\xE9s, en pleno Renacimiento, Miguel \xC1ngel redise\xF1\xF3 completamente la plaza para convertirla en un s\xEDmbolo del poder de la nueva Roma, orient\xE1ndola hacia el Vaticano en lugar de hacia el Foro.

\u2728 La plaza (gratis):

\u2022 Pavimento en forma de estrella, uno de los dise\xF1os m\xE1s ic\xF3nicos del Renacimiento
\u2022 Estatua ecuestre de Marco Aurelio (r\xE9plica; la original est\xE1 dentro del museo)
\u2022 Palacios perfectamente sim\xE9tricos que crean una sensaci\xF3n de equilibrio \xFAnica

\u{1F43A} La Loba Capitolina:

Aqu\xED encontrar\xE1s dos versiones:

\u2022 Exterior (gratis) \u2192 una r\xE9plica en una columna junto al Palazzo Senatorio
\u2022 Interior (original) \u2192 dentro de los Museos Capitolinos

\u{1F4A1} Detalle clave:
La escultura representa a R\xF3mulo y Remo, s\xEDmbolo del origen de Roma.

\u{1F4F8} Vistas al Foro:

Justo detr\xE1s del Palazzo Senatorio tienes uno de los mejores miradores gratuitos de Roma sobre el Foro Romano.

\u{1F4A1} Experiencia viajera:
Es uno de esos lugares donde entiendes la grandeza de Roma sin necesidad de entrar a ning\xFAn monumento.

\u{1F3DB}\uFE0F Museos Capitolinos:

Considerados el museo p\xFAblico m\xE1s antiguo del mundo (1471), albergan algunas de las piezas m\xE1s importantes de la ciudad.

\u2B50 Imprescindibles:
\u2022 Loba Capitolina original
\u2022 Estatua original de Marco Aurelio
\u2022 Espinario (ni\xF1o con la espina)
\u2022 Medusa de Bernini

\u{1F4A1} Extra brutal:
Los edificios est\xE1n conectados por el Tabularium, desde donde tienes vistas interiores espectaculares del Foro.

\u2615 Experiencia TOP:
La Terrazza Caffarelli ofrece una de las mejores vistas de Roma. Puedes subir incluso sin visitar todo el museo.

\u{1F4A1} Consejo PRO:
Sube por la Cordonata, la rampa monumental dise\xF1ada para subir a caballo. Es parte de la experiencia.

\u2728 Consejo AvenTourArte:
Este punto es clave: combina historia antigua, arte renacentista y vistas \xFAnicas en un solo lugar.`,fotos:["cld:europa/italia/roma/piazza-campidoglio","cld:europa/italia/roma/marco-aurelio","cld:europa/italia/roma/loba-capitolina","cld:europa/italia/roma/basilica-maria-aracoeli"],horario:"Plaza: acceso libre 24h | Museos: todos los d\xEDas 09:30\u201319:30 (\xFAltima entrada 18:30)",precio:"Plaza: gratis | Museos: 16\u20AC general | 14\u20AC reducida | Gratis: menores 18 y primer domingo del mes"},{nombre:"Monumento a Vittorio Emanuele II (Vittoriano)",descripcion:`Despu\xE9s de recorrer la Piazza del Campidoglio y disfrutar de sus vistas sobre el Foro, el itinerario desciende hacia la Piazza Venezia, donde aparece uno de los monumentos m\xE1s imponentes de toda Roma: el Vittoriano.

Con su m\xE1rmol blanco brillante, este edificio contrasta completamente con las ruinas antiguas que acabas de ver.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
Fue construido a finales del siglo XIX para homenajear a Vittorio Emanuele II, el primer rey de la Italia unificada.

Por eso, m\xE1s que un monumento romano, representa el nacimiento de la Italia moderna.

\u{1F4A1} Curiosidad:
Los romanos lo apodan \u201Cla tarta de bodas\u201D por su color blanco y su aspecto monumental.

\u{1F525} Qu\xE9 ver:

\u2022 Altar de la Patria \u2192 con la llama eterna y el Soldado Desconocido
\u2022 Estatua ecuestre gigante de Vittorio Emanuele II
\u2022 Terrazas con vistas al Foro Romano y la Columna de Trajano

\u{1F4A1} Detalle brutal:
Se dice que dentro del caballo de la estatua se celebr\xF3 una cena con m\xE1s de 20 personas.

\u{1F306} Experiencia viajera:
Desde sus terrazas tienes una perspectiva distinta del Foro, m\xE1s cercana y frontal, sin necesidad de entrar al yacimiento.

\u{1F6A1} Ascensor panor\xE1mico (Roma dal Cielo):
Si subes arriba del todo, tendr\xE1s una vista 360\xBA espectacular de Roma.

\u{1F4A1} Consejo PRO:
Si ya has subido al Campidoglio, el ascensor es opcional, pero las vistas siguen siendo de las mejores de la ciudad.

\u26A0\uFE0F Importante:
Los guardias son muy estrictos:
\u2022 No sentarse en escaleras
\u2022 No comer ni beber

\u2728 Consejo AvenTourArte:
Este punto marca el contraste perfecto del viaje: pasas de la Roma imperial a la Italia moderna en solo unos pasos.`,foto:"cld:europa/italia/roma/vittoriano",horario:"Todos los d\xEDas: 09:30\u201319:30 (\xFAltimo acceso 18:45)",precio:"Acceso general: gratis | Ascensor panor\xE1mico: 12\u20AC\u201315\u20AC | Museo: ~10\u20AC"},{nombre:"Mercados de Trajano (Museo de los Foros Imperiales)",descripcion:`Despu\xE9s de contemplar el Vittoriano y la monumentalidad de esta zona, el recorrido contin\xFAa cruzando hacia uno de los complejos m\xE1s sorprendentes de la ciudad: los Mercados de Trajano.

A primera vista pueden parecer solo ruinas, pero en realidad est\xE1s ante lo que muchos consideran el primer \u201Ccentro comercial\u201D cubierto de la historia.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
Construidos en el siglo II d.C. durante el reinado del emperador Trajano, este complejo formaba parte de su gran foro y albergaba decenas de tabernae (tiendas), oficinas y espacios administrativos.

Era un aut\xE9ntico centro de actividad econ\xF3mica y pol\xEDtica de la antigua Roma.

\u{1F6B6} Experiencia \xFAnica:
A diferencia del Foro Romano, aqu\xED puedes caminar por dentro del complejo:

\u2022 Recorrer la Via Biberatica, una calle romana perfectamente conservada
\u2022 Entrar en antiguas tiendas (tabernae)
\u2022 Subir a distintos niveles con vistas espectaculares

\u{1F4A1} Qu\xE9 lo hace especial:
Es mucho m\xE1s inmersivo y mucho menos masificado que el Coliseo o el Foro.

\u{1F4F8} Vistas TOP:
Desde los niveles superiores tienes vistas incre\xEDbles a:
\u2022 Columna de Trajano
\u2022 Foro Romano
\u2022 Piazza Venezia

\u{1F4A1} Experiencia viajera:
Aqu\xED no solo ves ruinas, las recorres.

\u{1F4A1} Consejo PRO:
Si te gusta la historia, merece much\xEDsimo la pena entrar. Es uno de los sitios m\xE1s infravalorados de Roma.

\u{1F4A1} Alternativa gratis:
Desde la Via IV Novembre puedes ver gran parte del complejo desde arriba sin pagar.

\u2728 Consejo AvenTourArte:
Este punto es perfecto antes de entrar en el Foro: te ayuda a entender c\xF3mo funcionaba realmente la ciudad.`,fotos:["cld:europa/italia/roma/mercados-trajano","cld:europa/italia/roma/columna-trajano","cld:europa/italia/roma/basilica-ulpia","cld:europa/italia/roma/mercati-traiano"],horario:"Todos los d\xEDas: 09:30\u201319:30 (\xFAltimo acceso 18:30) | Cerrado: 1 enero, 1 mayo, 25 diciembre",precio:`15\u20AC\u201316\u20AC (hasta 20\u20AC con exposiciones) | Reducida: 10,5\u20AC\u201314\u20AC | Gratis: menores 6 y discapacidad
Primer domingo: gratis | Mi\xE9rcoles tarde: -50% \xFAltimas 2h`},{nombre:"Bas\xEDlica de San Pietro in Vincoli",descripcion:`A pocos minutos cuesta arriba, una parada m\xE1s tranquila rompe el ritmo del recorrido sin perder intensidad: la Bas\xEDlica de San Pietro in Vincoli.

Este templo discreto por fuera esconde una de las mayores obras maestras de la historia del arte.

\u{1F3DB}\uFE0F Contexto:
Aunque por fuera es una iglesia sobria, en su interior se encuentra una pieza que por s\xED sola justificar\xEDa el viaje a Roma.

\u{1F3A8} El Mois\xE9s de Miguel \xC1ngel:
La gran joya de la bas\xEDlica. Forma parte del mausoleo inacabado del Papa Julio II y es una de las esculturas m\xE1s impresionantes jam\xE1s creadas.

\u{1F4A1} Detalle brutal:
La escultura es tan realista que, seg\xFAn la leyenda, Miguel \xC1ngel la golpe\xF3 diciendo:
\u201C\xBFPor qu\xE9 no hablas?\u201D

\u{1F4A1} Consejo PRO:
Por 1\u20AC o 2\u20AC puedes encender la iluminaci\xF3n directa. Merece totalmente la pena para ver los detalles.

\u26D3\uFE0F Las cadenas de San Pedro:
Bajo el altar mayor se conservan las cadenas con las que, seg\xFAn la tradici\xF3n, San Pedro fue encarcelado.

\u{1F4A1} Curiosidad:
Se dice que las cadenas de Jerusal\xE9n y Roma se unieron milagrosamente al juntarlas.

\u{1F33F} Experiencia viajera:
En medio del bullicio arqueol\xF3gico, este lugar ofrece un momento de calma, arte y recogimiento.

\u26A0\uFE0F Importante:
Al ser una iglesia activa:
\u2022 Hombros cubiertos
\u2022 Evitar ropa muy corta

\u2728 Consejo AvenTourArte:
Este es uno de esos lugares donde Roma te recuerda que no solo fue poder, tambi\xE9n fue arte eterno.`,foto:"cld:europa/italia/roma/san-pietro-vincoli",horario:"Ma\xF1ana: 07:30\u201312:20 | Tarde: 15:00\u201317:50 (verano hasta ~18:50) | Domingo ma\xF1ana desde ~09:00",precio:"Entrada gratuita | Iluminaci\xF3n Mois\xE9s: 1\u20AC\u20132\u20AC"},{nombre:"Foro Romano",descripcion:`Tras asombrarte con el Mois\xE9s de Miguel \xC1ngel, llega el momento de adentrarse en el verdadero coraz\xF3n de la Antigua Roma: el Foro Romano.

Todo lo que has visto hasta ahora\u2026 aqu\xED es donde ocurr\xEDa.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
El Foro era el centro pol\xEDtico, religioso y social de Roma. Aqu\xED se tomaban decisiones clave, se celebraban ceremonias y se desarrollaba la vida p\xFAblica.

Era, literalmente, el n\xFAcleo del mundo romano.

\u{1F6B6} Qu\xE9 vas a recorrer:
Entrar al Foro es como caminar por una ciudad antigua detenida en el tiempo.

\u2B50 Imprescindibles:
\u2022 Via Sacra \u2192 la calle principal por donde desfilaban los generales victoriosos
\u2022 Arco de Tito \u2192 s\xEDmbolo de la victoria romana sobre Jerusal\xE9n
\u2022 Templo de Saturno \u2192 sus columnas son una de las im\xE1genes m\xE1s ic\xF3nicas del Foro
\u2022 Curia Julia \u2192 sede del Senado romano, uno de los edificios mejor conservados
\u2022 Casa de las Vestales \u2192 residencia de las sacerdotisas que manten\xEDan el fuego sagrado de Roma

\u{1F4A1} Experiencia viajera:
Aqu\xED no solo visitas ruinas, caminas por el centro del poder del Imperio Romano.

\u{1F306} Conexi\xF3n visual:
Desde el Campidoglio ya lo viste desde arriba; ahora est\xE1s dentro.

\u{1F4A1} Consejo PRO (clave):
Evita entrar por el Coliseo.

\u{1F449} Mejores entradas:
\u2022 Via dei Fori Imperiali
\u2022 Palatino (Via di San Gregorio)

Ahorrar\xE1s mucha cola.

\u{1F45F} Importante:
El suelo es original romano, muy irregular.
\u2022 Lleva zapatillas c\xF3modas
\u2022 Evita sandalias finas

\u{1F4A7} Agua:
Dentro hay fuentes (nasoni). Lleva botella para rellenar.

\u2600\uFE0F Consejo verano:
Hay muy poca sombra \u2192 gorra + agua imprescindible.

\u{1F4A1} Alternativa gratis:
Si no entras, las vistas desde el Campidoglio siguen siendo de las mejores de Roma.

\u2728 Consejo AvenTourArte:
Este es el punto donde Roma deja de ser una ciudad y se convierte en historia viva.`,foto:"cld:europa/italia/roma/foro-romano",horario:"Todos los d\xEDas desde 09:00 hasta 1h antes del atardecer (invierno ~16:30 | verano ~19:15)",precio:"Incluido en ticket combinado Coliseo + Foro + Palatino: 18\u20AC | Full Experience: 24\u20AC | Reducida: 2\u20AC | Gratis: menores 18 y primer domingo"},{nombre:"Monte Palatino",descripcion:`Despu\xE9s de recorrer el Foro Romano y entender c\xF3mo funcionaba el coraz\xF3n pol\xEDtico y social de la ciudad, el itinerario contin\xFAa subiendo hacia el lugar donde todo comenz\xF3: el Monte Palatino.

Aqu\xED Roma deja de ser solo ruinas y se convierte en historia fundacional.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
El Palatino es una de las siete colinas de Roma y, seg\xFAn la leyenda, el lugar exacto donde la loba amamant\xF3 a R\xF3mulo y Remo.

Es, literalmente, el origen de la ciudad.

Con el tiempo, se convirti\xF3 en la zona m\xE1s exclusiva del Imperio, donde viv\xEDan los emperadores.

\u{1F451} Qu\xE9 encontrar\xE1s:
M\xE1s que un yacimiento, es una ciudad dentro de otra.

\u2022 Domus Flavia y Domus Augustana \u2192 los palacios imperiales
\u2022 Estadio Palatino \u2192 parte del complejo del emperador
\u2022 Caba\xF1as de R\xF3mulo \u2192 restos vinculados a la Roma m\xE1s primitiva

\u{1F33F} Experiencia viajera:
A diferencia del Foro, aqu\xED el ambiente cambia completamente.

M\xE1s espacio, m\xE1s calma, m\xE1s vegetaci\xF3n.

Es el lugar perfecto para pasear sin prisas y asimilar todo lo que acabas de ver abajo.

\u{1F304} Vistas \xFAnicas:
Desde el Palatino tendr\xE1s las mejores vistas del Foro Romano.

Aqu\xED es donde todo cobra sentido.

\u{1F4A1} Conexi\xF3n con el itinerario:
Despu\xE9s de ver el Foro desde dentro y desde los miradores del Campidoglio, subir al Palatino es el paso l\xF3gico para entender la magnitud real de la antigua Roma.

\u{1F4A1} Consejo viajero:
Entra por la zona de Via di San Gregorio si quieres evitar colas.

\u2728 Consejo AvenTourArte:
No lo recorras con prisa. Este es uno de los pocos lugares de Roma donde puedes parar, sentarte y simplemente imaginar c\xF3mo era la ciudad hace m\xE1s de 2.000 a\xF1os.`,foto:"cld:europa/italia/roma/palatino",horario:`Todos los d\xEDas: 09:00 \u2013 cierre seg\xFAn temporada (invierno ~16:30 | verano ~19:15)
\xDAltimo acceso: 1h antes`,precio:`Incluido en ticket combinado: Coliseo + Foro + Palatino \u2248 18\u20AC
Full Experience \u2248 24\u20AC
Gratis: menores de 18 y primer domingo de mes`},{nombre:"Arco de Constantino",descripcion:`Despu\xE9s de recorrer el Foro, el Palatino y la zona del Coliseo, el recorrido contin\xFAa hacia uno de los elementos m\xE1s simb\xF3licos de este entorno: el Arco de Constantino.

Situado justo junto al Coliseo, este monumento funciona como un puente entre distintas \xE9pocas de la historia de Roma.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
Fue construido en el a\xF1o 315 d.C. para conmemorar la victoria de Constantino en la batalla del Puente Milvio.

Este hecho marc\xF3 un antes y un despu\xE9s en la historia del Imperio Romano, ya que abri\xF3 el camino hacia la expansi\xF3n del cristianismo.

\u{1F3A8} Un detalle \xFAnico:
El arco es, en realidad, un \u201Ccollage\u201D de la historia de Roma.

Muchos de sus relieves fueron reutilizados de monumentos anteriores de emperadores como Trajano, Adriano o Marco Aurelio, conectando simb\xF3licamente a Constantino con la grandeza del pasado.

\u{1F4F8} Experiencia viajera:
Con el Coliseo de fondo, este es uno de los mejores puntos para fotograf\xEDa de toda la ciudad.

\u{1F4A1} Consejo viajero:
No pases de largo. Dedica unos minutos a rodearlo y fijarte en los detalles.

\u2728 Consejo AvenTourArte:
Al atardecer y de noche, con el Coliseo iluminado, este lugar se convierte en uno de los rincones m\xE1s m\xE1gicos de Roma.`,foto:"cld:europa/italia/roma/arco-constantino",horario:"Acceso libre 24h (iluminado por la noche)",precio:"Gratis"},{nombre:"Coliseo (Anfiteatro Flavio)",descripcion:`Despu\xE9s de recorrer la Roma m\xE1s antigua \u2014Foro, templos, poder imperial y obras maestras como el Mois\xE9s de Miguel \xC1ngel\u2014 el d\xEDa culmina en el lugar m\xE1s ic\xF3nico de la ciudad: el Coliseo.

Aqu\xED no solo est\xE1s viendo un monumento: est\xE1s entrando en el escenario donde Roma mostraba su poder al mundo.

Adem\xE1s de ser el gran s\xEDmbolo de Roma, el Coliseo fue reconocido como una de las Nuevas 7 Maravillas del Mundo, lo que refuerza a\xFAn m\xE1s su papel como uno de los monumentos m\xE1s c\xE9lebres y admirados del planeta.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
Construido en el siglo I d.C., el Coliseo pod\xEDa albergar hasta 65.000 espectadores.

Aqu\xED ten\xEDan lugar:
\u2022 Combates de gladiadores
\u2022 Cacer\xEDas de animales ex\xF3ticos
\u2022 Ejecuciones p\xFAblicas
\u2022 Espect\xE1culos masivos para el pueblo romano

Era, literalmente, el entretenimiento del Imperio.

\u2694\uFE0F Experiencia dentro:
Al recorrerlo, puedes imaginar la arena cubierta de madera, el p\xFAblico rugiendo y los gladiadores esperando su destino.

\u{1F4A1} Experiencia TOP:
Si puedes, elige la entrada \u201CFull Experience\u201D para pisar la arena o ver los subterr\xE1neos. Es donde realmente entiendes c\xF3mo funcionaba todo.

\u{1F307} Momento m\xE1gico:
Visitarlo a \xFAltima hora del d\xEDa cambia completamente la experiencia:
\u2022 Menos gente
\u2022 Luz dorada sobre la piedra
\u2022 Ambiente mucho m\xE1s \xE9pico

\u{1F4A1} Consejo viajero:
Desde el exterior, al atardecer o de noche iluminado, tambi\xE9n es espectacular.

\u26A0\uFE0F Importante (2026):
La reserva online es obligatoria y las entradas se agotan con semanas de antelaci\xF3n.

\u23F1\uFE0F Organizaci\xF3n:
El ticket incluye Coliseo + Foro + Palatino, por lo que puedes repartir la visita en diferentes momentos del d\xEDa.

\u{1F4A1} Consejo PRO:
Llega 15 minutos antes de tu hora. Si llegas tarde, pierdes la entrada.

\u2728 Consejo AvenTourArte:
Este es el final perfecto del d\xEDa: despu\xE9s de entender Roma, aqu\xED la sientes.`,foto:"cld:europa/italia/roma/coliseo",horario:`Todos los d\xEDas desde 08:30
Cierre: Invierno 16:30 | Oto\xF1o 18:30 | Primavera/Verano hasta 19:15
\xDAltimo acceso: 1h antes
Cerrado: 1 enero y 25 diciembre`,precio:`Est\xE1ndar 24h: 18\u20AC + 2\u20AC gesti\xF3n
Full Experience 48h: 24\u20AC + 2\u20AC
Reducida UE 18\u201325: 2\u20AC
Gratis: menores de 18
Incluye Coliseo + Foro + Palatino`}]},{dia:"D\xEDa 2 \u2013 Roma imperial y noche en Trast\xE9vere",zonas:[{nombre:"Bas\xEDlica Santa Maria della Vittoria \u2013 \xC9xtasis de Santa Teresa",descripcion:`El segundo d\xEDa comienza con un cambio total de registro: del peso monumental de la Roma cl\xE1sica al impacto emocional del barroco.

En una iglesia discreta por fuera se esconde una de las obras m\xE1s impresionantes de toda Roma.

\u{1F3A8} Contexto art\xEDstico:
Santa Maria della Vittoria es una de las m\xE1ximas expresiones del barroco romano, un estilo que buscaba emocionar, impactar y envolver al espectador.

Y aqu\xED lo consigue como en pocos lugares.

\u2728 La obra clave:
El \xC9xtasis de Santa Teresa, de Gian Lorenzo Bernini.

No es solo una escultura, es una escena teatral completa:
\u2022 M\xE1rmol esculpido con un nivel de detalle incre\xEDble
\u2022 Luz natural entrando por una ventana oculta
\u2022 Rayos dorados que simulan lo divino

La obra representa el momento m\xEDstico en el que Santa Teresa siente la presencia de Dios.

\u{1F4A1} Experiencia viajera:
Cuando la ves en directo, entiendes por qu\xE9 el barroco no era solo arte, era emoci\xF3n pura.

\u{1F4A1} Detalle curioso:
A los lados de la escena, Bernini esculpi\xF3 a miembros de la familia Cornaro como si estuvieran en palcos de teatro observando la escena.

\u{1F4A1} Consejo PRO:
Enciende la iluminaci\xF3n (1\u20132\u20AC). La diferencia es brutal.

\u2728 Consejo AvenTourArte:
Empieza el d\xEDa aqu\xED temprano. Es un lugar peque\xF1o y, sin gente, se disfruta much\xEDsimo m\xE1s.`,foto:"cld:europa/italia/roma/santa-maria-vittoria",horario:`Lun\u2013S\xE1b: 07:00\u201312:00 y 16:00\u201318:00
Dom: 09:00\u201312:00 y 16:00\u201318:00`,precio:"Gratis (iluminaci\xF3n de la escultura: 1\u20AC\u20132\u20AC opcional)"},{nombre:"Trinit\xE0 dei Monti y descenso a Plaza de Espa\xF1a",descripcion:`Despu\xE9s de comenzar el d\xEDa con el arte barroco, el siguiente paso es uno de los grandes momentos visuales de Roma, pero vivido desde arriba.

En lugar de llegar desde la plaza, la experiencia empieza en lo alto, en la iglesia de Trinit\xE0 dei Monti.

\u26EA La llegada:
Llegar directamente arriba cambia completamente la perspectiva. Desde aqu\xED, Roma se abre ante ti con una de las vistas m\xE1s elegantes de la ciudad.

Frente a la iglesia encontrar\xE1s el Obelisco Salustiano y un mirador privilegiado sobre la Plaza de Espa\xF1a y la Via Condotti.

\u{1F4A1} Experiencia viajera:
Este es el momento de parar, mirar y entender la ciudad desde arriba antes de bajar.

\u{1F3DB}\uFE0F La iglesia:
Trinit\xE0 dei Monti, de origen franc\xE9s, tiene un interior sencillo pero muy interesante. Si puedes, entra unos minutos antes de continuar.

\u{1F307} El descenso:
Despu\xE9s de disfrutar las vistas, comienza uno de los paseos m\xE1s ic\xF3nicos de Roma: bajar la escalinata de la Plaza de Espa\xF1a.

Son 135 pelda\xF1os que conectan la calma de la parte alta con el bullicio de la ciudad.

A medida que desciendes:
\u2022 La perspectiva cambia
\u2022 El ambiente se intensifica
\u2022 Roma se vuelve m\xE1s viva

\u{1F4A1} Punto final:
Abajo te espera la Fontana della Barcaccia, obra de Bernini, marcando el final perfecto del recorrido.

\u26A0\uFE0F Importante:
Est\xE1 prohibido sentarse en las escaleras (multas frecuentes).

\u2728 Consejo AvenTourArte:
Este recorrido no es solo un desplazamiento, es una transici\xF3n perfecta entre la Roma tranquila y la Roma vibrante.`,fotos:["cld:europa/italia/roma/trinita-dei-monti","cld:europa/italia/roma/plaza-espa\xF1a"],horario:`Iglesia: Lun, Mar, Jue, S\xE1b 10:15\u201319:45 | Mi\xE9 12:00\u201319:45 | Dom 09:00\u201319:30
Escalinata: acceso libre 24h`,precio:"Gratis"},{nombre:"Pastificio Guerra",descripcion:`Despu\xE9s de bajar desde Trinit\xE0 dei Monti y llegar al ambiente vibrante de la Plaza de Espa\xF1a, es el momento perfecto para hacer una pausa r\xE1pida antes de continuar la ruta.

A apenas 2 minutos andando se encuentra uno de los secretos mejor valorados de Roma: Pastificio Guerra.

\u{1F35D} \xBFQu\xE9 lo hace especial?
No es un restaurante tradicional, sino una antigua f\xE1brica de pasta donde cada d\xEDa se prepara pasta fresca casera.

El concepto es simple y brutalmente efectivo:
\u2022 Solo 2 tipos de pasta al d\xEDa
\u2022 Recetas cl\xE1sicas (carbonara, cacio e pepe, amatriciana\u2026)
\u2022 Servicio r\xE1pido y sin complicaciones

\u{1F4A1} Experiencia viajera:
Te sirven una bandeja generosa y comes de pie, como un local m\xE1s, en plena calle.

Sin postureo. Solo pasta incre\xEDble.

\u{1F4A1} Detalle top:
A veces incluyen un vasito de vino en el precio \u{1F377}

\u{1F4A1} Consejo importante:
NO comas en la escalinata de Plaza de Espa\xF1a.

\u26A0\uFE0F Est\xE1 prohibido y multan.

\u{1F3AF} D\xF3nde comerlo:
\u2022 Calles cercanas
\u2022 Caminando hacia la siguiente parada
\u2022 O en alg\xFAn rinc\xF3n tranquilo cercano

\u2728 Consejo AvenTourArte:
Este es el t\xEDpico sitio que no parece nada, pero te deja uno de los mejores recuerdos del viaje.`,foto:"cld:europa/italia/roma/pastificio-guerra",horario:"Todos los d\xEDas: 13:00 \u2013 21:00",precio:"\u2248 5\u20AC (pasta fresca, a veces incluye vino)"},{nombre:"Pompi \u2013 El rey del tiramis\xFA",descripcion:`Despu\xE9s de la parada en Pastificio Guerra, toca el broche perfecto: el postre.

Justo enfrente, en la misma calle, se encuentra Pompi, conocido como el \u201CRey del Tiramis\xFA\u201D.

\u{1F370} La experiencia:
Aqu\xED vienes a coger tu tiramis\xFA y seguir explorando Roma.

Te lo sirven en una cajita individual con cuchara, listo para disfrutar caminando.

\u{1F4A1} Sabores:
\u2022 Cl\xE1sico (imprescindible)
\u2022 Fresa (muy top y m\xE1s ligero)
\u2022 Pistacho
\u2022 Avellana
\u2022 Pl\xE1tano con chocolate

Este es el t\xEDpico momento perfecto de viaje:
\u2022 Acabas de comer algo incre\xEDble
\u2022 Te llevas un tiramis\xFA en la mano
\u2022 Y sigues descubriendo Roma sin parar

\u{1F4A1} Consejo importante:
Al igual que con la pasta, no te sientes en la escalinata de Plaza de Espa\xF1a.

\u26A0\uFE0F Multas frecuentes.

\u{1F3AF} D\xF3nde comerlo:
\u2022 Caminando hacia la siguiente parada
\u2022 Calles cercanas
\u2022 O direcci\xF3n mirador del Pincio

\u{1F4A1} Tip PRO:
Si hace calor, c\xF3metelo pronto. Pierde textura si pasa mucho tiempo fuera del fr\xEDo.

\u2728 Consejo AvenTourArte:
Este es uno de esos peque\xF1os momentos que convierten un itinerario en una experiencia real.`,foto:"cld:europa/italia/roma/pompi-tiramisu",horario:"Todos los d\xEDas: 10:30 \u2013 22:00 (fines de semana puede alargar)",precio:"\u2248 5\u20AC por tiramis\xFA individual"},{nombre:"Via del Corso \u2013 Paseo y shopping en el coraz\xF3n de Roma",descripcion:`Despu\xE9s del combo perfecto de pasta y tiramis\xFA, el recorrido contin\xFAa de forma natural por una de las calles m\xE1s importantes de Roma: Via del Corso.

Aqu\xED el ambiente se vuelve m\xE1s din\xE1mico.

Pasas de la experiencia gastron\xF3mica a un paseo lleno de vida, tiendas y movimiento constante.

\u{1F3D9}\uFE0F Qu\xE9 es Via del Corso:
Es la gran arteria del centro hist\xF3rico, una calle recta de m\xE1s de 1,5 km que conecta Piazza del Popolo con Piazza Venezia.

\u{1F4A1} Experiencia viajera:
No es solo una calle, es un flujo continuo de gente, locales y viajeros mezcl\xE1ndose.

\u{1F6CD}\uFE0F Qu\xE9 encontrar\xE1s:
\u2022 Tiendas internacionales (Zara, Nike, Mango\u2026)
\u2022 Marcas italianas
\u2022 Ambiente animado a cualquier hora

\u{1F3DB}\uFE0F Detalles que no debes perderte:
\u2022 Galleria Alberto Sordi \u2192 galer\xEDa preciosa con techos de cristal
\u2022 Palazzo Doria Pamphilj \u2192 joya art\xEDstica escondida
\u2022 Columna de Marco Aurelio (Piazza Colonna)

\u{1F4A1} Consejo viajero:
Si te agobia la cantidad de gente, esc\xE1pate por calles paralelas como:
\u2022 Via del Babuino
\u2022 Via Margutta (mucho m\xE1s tranquila y con encanto)

\u{1F6B6} Experiencia dentro del itinerario:
Este tramo no es una parada fija, sino un paseo que conecta puntos clave del d\xEDa mientras sigues descubriendo Roma.

\u2728 Consejo AvenTourArte:
No tengas prisa aqu\xED. Camina, observa y mezcla lo cotidiano con lo hist\xF3rico, porque eso tambi\xE9n es Roma.`,foto:"cld:europa/italia/roma/via-del-corso",horario:`Tiendas: aprox. 10:00 \u2013 20:00/21:00
Calle accesible todo el d\xEDa (zona mayoritariamente peatonal)`,precio:"Gratis (solo compras si quieres)"},{nombre:"Ara Pacis Augustae \u2013 El altar de la paz de Augusto",descripcion:`Despu\xE9s del ambiente animado de Via del Corso, el recorrido contin\xFAa hacia un lugar completamente distinto: el Ara Pacis.

Pasas del bullicio de la ciudad a un espacio tranquilo, luminoso y cargado de significado hist\xF3rico.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
El Ara Pacis fue construido en el a\xF1o 13 a.C. para celebrar la paz instaurada por el emperador Augusto tras sus campa\xF1as.

M\xE1s que un monumento, es propaganda pol\xEDtica en m\xE1rmol.

\u2728 Qu\xE9 lo hace especial:
Hoy se encuentra dentro de un museo moderno dise\xF1ado por Richard Meier.

El contraste es brutal:
\u2022 Exterior minimalista y contempor\xE1neo
\u2022 Interior con una de las obras m\xE1s importantes de la Roma imperial

\u{1F3A8} Qu\xE9 ver:
\u2022 Relieves detallad\xEDsimos en m\xE1rmol
\u2022 La procesi\xF3n imperial con Augusto y su familia
\u2022 La figura de Tellus (Madre Tierra), s\xEDmbolo de prosperidad

\u{1F4A1} Experiencia viajera:
Es un lugar perfecto para hacer una pausa:
\u2022 Aire acondicionado (clave en verano \u{1F605})
\u2022 Ambiente tranquilo
\u2022 Visita r\xE1pida pero muy interesante

\u{1F4A1} Extra:
Por la noche, en algunas \xE9pocas, puedes ver la experiencia \u201CAra Com\u2019era\u201D, donde recrean los colores originales del altar.

\u{1F3DB}\uFE0F Alrededor:
Justo al lado se encuentra el Mausoleo de Augusto, completando el contexto hist\xF3rico del lugar.

\u2728 Consejo AvenTourArte:
Este punto equilibra el d\xEDa: menos turismo masivo, m\xE1s historia y calma.`,horario:`Todos los d\xEDas: 09:30 \u2013 19:30
\xDAltimo acceso: 18:30`,precio:`General: 13\u20AC\u201315\u20AC
Reducida UE 18\u201325: ~11\u20AC
Gratis: menores 18 y primer domingo de mes`},{nombre:"Piazza del Popolo y Terrazza del Pincio",descripcion:`Despu\xE9s de la calma y el contexto hist\xF3rico del Ara Pacis, el recorrido se abre hacia uno de los espacios m\xE1s monumentales de Roma: la Piazza del Popolo.

El cambio de escala es inmediato. Pasas de un espacio recogido a una plaza amplia, sim\xE9trica y llena de luz.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
Durante siglos, este fue el punto de entrada a Roma para quienes llegaban desde el norte. Era la primera imagen de la ciudad.

En cierto modo, aqu\xED empezaba Roma.

\u2728 El conjunto:
En el centro se alza el Obelisco Flaminio, tra\xEDdo desde Egipto en \xE9poca de Augusto.

Alrededor encontrar\xE1s:
\u2022 Iglesias gemelas \u2192 Santa Maria dei Miracoli y Montesanto
\u2022 Santa Maria del Popolo \u2192 imprescindible (Caravaggio dentro)
\u2022 Porta del Popolo \u2192 antigua entrada a la ciudad

\u{1F4A1} Experiencia viajera:
Es uno de los pocos lugares donde Roma respira amplitud y equilibrio.

\u{1F307} El siguiente paso (imprescindible):
Sube hacia la Terrazza del Pincio.

En pocos minutos pasas del nivel de la ciudad a uno de los miradores m\xE1s espectaculares de Roma.

Desde arriba tendr\xE1s:
\u2022 Vista completa de la plaza
\u2022 La Via del Corso extendi\xE9ndose hacia el centro
\u2022 La c\xFApula de San Pedro en el horizonte

\u{1F304} Momento clave:
El atardecer.

La luz dorada transforma completamente la ciudad y convierte este punto en uno de los momentos m\xE1s memorables del viaje.

\u{1F33F} Extra:
Puedes pasear por el Pincio y conectar con Villa Borghese si quieres alargar el recorrido.

\u2728 Consejo AvenTourArte:
No es solo una parada para fotos. Qu\xE9date unos minutos, si\xE9ntate y observa c\xF3mo Roma cambia de luz. Es uno de esos momentos que se recuerdan.`,fotos:["cld:europa/italia/roma/piazza-del-popolo","cld:europa/italia/roma/pincio"],horario:`Acceso libre 24h
Santa Maria del Popolo: aprox. 07:00\u201312:30 y 16:00\u201319:00 (puede variar)`,precio:"Gratis"},{nombre:"Galer\xEDa Borghese",descripcion:`Si todav\xEDa te quedan ganas de seguir, desde el Pincio puedes adentrarte en Villa Borghese para llegar a uno de los museos m\xE1s impresionantes del mundo: la Galer\xEDa Borghese.

Este punto funciona como una extensi\xF3n opcional del d\xEDa y merece la pena sobre todo si ya llevas la entrada reservada con antelaci\xF3n.

\u{1F3DB}\uFE0F El lugar:
La galer\xEDa se encuentra dentro de una villa del siglo XVII rodeada de jardines, lo que la convierte en una visita mucho m\xE1s tranquila y exclusiva que otros museos de la ciudad.

\u{1F3A8} Qu\xE9 la hace especial:
No es un museo enorme, pero s\xED uno de los m\xE1s impactantes. Aqu\xED el arte no se acumula, se disfruta.

\u2728 Obras imprescindibles:
\u2022 Bernini \u2192 Apolo y Dafne, Rapto de Proserpina, David
\u2022 Caravaggio \u2192 David con la cabeza de Goliat, Joven Baco
\u2022 Canova \u2192 Paulina Borghese como Venus
\u2022 Rafael \u2192 El entierro de Cristo

\u{1F4A1} Experiencia viajera:
Las esculturas de Bernini son lo que realmente marca la diferencia. El m\xE1rmol parece blando, vivo, como si estuviera en movimiento.

\u23F1\uFE0F Importante:
La visita est\xE1 organizada en turnos de 2 horas. Cuando termina tu turno, tienes que salir.

\u26A0\uFE0F Punto clave:
Reserva obligatoria.

Sin entrada previa no podr\xE1s acceder.

\u{1F4A1} Consejo PRO:
Llega al menos 30 minutos antes para dejar tus cosas en la consigna.

\u2728 Consejo AvenTourArte:
Si te gusta el arte, este es uno de los lugares que m\xE1s te va a impactar de todo el viaje.`,foto:"cld:europa/italia/roma/galeria-borghese",horario:`Mar\u2013Dom: 09:00 \u2013 19:00
Lun: cerrado
\xDAltimo acceso: 17:00`,precio:`\u2248 13\u20AC + 2\u20AC gesti\xF3n
(Precio puede subir con exposiciones)
Reserva obligatoria
Turnos de 2h`},{nombre:"Bas\xEDlica de Santa Mar\xEDa la Mayor",descripcion:`Al caer la tarde, el recorrido introduce un cambio de ambiente completamente distinto.

Dejamos atr\xE1s el bullicio del centro para llegar a uno de los lugares m\xE1s antiguos y solemnes de la ciudad: la Bas\xEDlica de Santa Mar\xEDa la Mayor.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
Construida en el siglo V, es la \xFAnica de las cuatro bas\xEDlicas mayores de Roma que conserva su estructura paleocristiana original.

Es uno de los templos cristianos m\xE1s antiguos del mundo que siguen en uso.

\u2728 Qu\xE9 la hace especial:
Aqu\xED Roma no impresiona por tama\xF1o, sino por historia acumulada.

\u{1F3A8} Imprescindibles:
\u2022 Mosaicos del siglo V \u2192 de los m\xE1s antiguos del cristianismo
\u2022 Techo dorado \u2192 vinculado al primer oro tra\xEDdo de Am\xE9rica
\u2022 \xC1bside \u2192 la Coronaci\xF3n de la Virgen (obra maestra medieval)

\u26EA Elementos \xFAnicos:
\u2022 La Sacra Culla \u2192 reliquia del pesebre de Jes\xFAs

\u26B0\uFE0F Personajes hist\xF3ricos:
Aqu\xED descansan figuras clave:
\u2022 Papa Francisco
\u2022 Bernini
\u2022 Papas hist\xF3ricos como Sixto V o Clemente VIII

\u{1F4A1} Experiencia viajera:
Despu\xE9s de todo un d\xEDa de est\xEDmulos visuales, este lugar se siente diferente.

M\xE1s tranquilo. M\xE1s solemne. M\xE1s profundo.

Es el sitio perfecto para bajar revoluciones antes de seguir con la parte m\xE1s tranquila y nocturna del itinerario.

\u{1F4A1} Curiosidad:
Cada 5 de agosto se celebra el \u201CMilagro de la Nieve\u201D, recreado con p\xE9talos blancos cayendo desde el techo.

\u2728 Consejo AvenTourArte:
Si llegas cerca del cierre, encontrar\xE1s la bas\xEDlica mucho m\xE1s vac\xEDa y con una atm\xF3sfera mucho m\xE1s especial.`,fotos:["cld:europa/italia/roma/santa-maria-maggiore-posterior","cld:europa/italia/roma/santa-maria-maggiore-francisco","cld:europa/italia/roma/santa-maria-maggiore-interior","cld:europa/italia/roma/santa-maria-maggiore-frontal"],horario:"Todos los d\xEDas: 07:00 \u2013 18:30",precio:`Bas\xEDlica: gratis
Zonas adicionales (museo, logia, etc.): \u2248 5\u20AC`},{nombre:"Termas de Caracalla",descripcion:`Despu\xE9s de la parte m\xE1s c\xE9ntrica y monumental del d\xEDa, el itinerario se aleja ligeramente del bullicio para descubrir uno de los espacios m\xE1s impresionantes \u2014y menos saturados\u2014 de la Roma antigua: las Termas de Caracalla.

Aqu\xED Roma vuelve a sorprender, pero desde otra perspectiva.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
Inauguradas en el a\xF1o 216 d.C., estas termas no eran solo un lugar para ba\xF1arse.

Eran un complejo gigantesco donde los romanos pasaban horas entre deporte, cultura y ocio.

Un aut\xE9ntico centro social de la antig\xFCedad.

\u{1F4A1} Para que te hagas una idea:
Pod\xEDan acoger a m\xE1s de 1.500 personas al mismo tiempo.

\u{1F525} Qu\xE9 ver:
\u2022 Frigidarium, Tepidarium y Calidarium \u2192 salas de agua fr\xEDa, templada y caliente
\u2022 Natatio \u2192 enorme piscina al aire libre con muros de m\xE1s de 20 metros
\u2022 Mosaicos originales \u2192 a\xFAn visibles en el suelo
\u2022 Subterr\xE1neos \u2192 t\xFAneles donde trabajaban los esclavos
\u2022 Mitreo \u2192 templo oculto dedicado al dios Mitra

\u{1F3D7}\uFE0F Experiencia viajera:
A diferencia del Coliseo o el Foro, aqu\xED puedes caminar con calma.

Sin multitudes.

Sin prisas.

Y entendiendo realmente la escala del Imperio.

\u{1F4A1} Sensaci\xF3n clave:
Es uno de los pocos lugares donde puedes imaginar de verdad c\xF3mo era la vida cotidiana en Roma.

\u2728 Experiencia extra:
En verano, estas ruinas se transforman en un escenario de \xF3pera al aire libre.

Ver una representaci\xF3n aqu\xED, bajo las estrellas, es algo \xFAnico.

\u{1F4A1} Consejo viajero:
Si puedes, prueba la experiencia de realidad virtual. Cambia completamente la visita.

\u2728 Consejo AvenTourArte:
Este es el contraste perfecto del d\xEDa: despu\xE9s del caos del centro, aqu\xED Roma respira.

T\xF3mate tu tiempo.`,foto:"cld:europa/italia/roma/termas-caracalla",horario:`Todos los d\xEDas: desde 09:00 \u2013 cierre seg\xFAn temporada (verano ~19:15 | invierno ~16:30)
Lunes: cierre temprano (~14:00)`,precio:`General: \u2248 8\u20AC (+2\u20AC online)
Reducida UE (18-25): 2\u20AC
Gratis: menores de 18 y primer domingo de mes`},{nombre:"Circo M\xE1ximo",descripcion:`Despu\xE9s de recorrer las imponentes Termas de Caracalla, el itinerario contin\xFAa hacia un lugar que hoy parece tranquilo, pero que en su momento fue el epicentro del espect\xE1culo en la Antigua Roma: el Circo M\xE1ximo.

Aqu\xED no quedan grandes estructuras en pie.

Pero lo que s\xED queda es el espacio.

Y eso lo cambia todo.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
El Circo M\xE1ximo fue el estadio m\xE1s grande de Roma, con capacidad para m\xE1s de 250.000 espectadores.

Aqu\xED se celebraban las famosas carreras de carros, uno de los espect\xE1culos m\xE1s populares y emocionantes del Imperio.

\u{1F525} Qu\xE9 ver hoy:
\u2022 La forma de la pista \u2192 a\xFAn perfectamente reconocible
\u2022 Torre medieval (Moletta) \u2192 contraste entre \xE9pocas
\u2022 Vistas al Palatino \u2192 los palacios imperiales dominando el paisaje

\u{1F4A1} Experiencia viajera:
Este lugar no impresiona por lo que ves, sino por lo que imaginas.

Est\xE1s caminando exactamente donde miles de personas gritaban, apostaban y celebraban.

Hoy, en cambio, es uno de los espacios m\xE1s tranquilos del centro de Roma.

\u{1F307} Momento clave:
Al atardecer, con la luz cayendo sobre el Palatino y el Aventino, el ambiente aqu\xED es espectacular.

\u{1F4A1} Extra recomendado:
La \u201CCirco Maximo Experience\u201D te permite ver el estadio en su m\xE1ximo esplendor mediante realidad aumentada.

\u2728 Consejo viajero:
Es un sitio perfecto para parar, sentarte o simplemente caminar sin rumbo despu\xE9s de un d\xEDa intenso.

\u2728 Consejo AvenTourArte:
Despu\xE9s de todo lo que has visto hoy, este es el lugar para respirar Roma.`,foto:"cld:europa/italia/roma/circo-maximo",horario:`Acceso libre 24h
Experiencia VR: Mar\u2013Dom aprox. 10:00 \u2013 15:00`,precio:`Parque: gratis
Experiencia VR: \u2248 12\u20AC`},{nombre:"Foro Boario",descripcion:`Despu\xE9s del paseo por el Circo M\xE1ximo, el itinerario contin\xFAa hacia una de las zonas m\xE1s antiguas y menos masificadas de Roma: el Foro Boario.

Aqu\xED la ciudad cambia completamente.

Menos turistas. M\xE1s autenticidad.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
El Foro Boario fue el antiguo mercado de ganado de Roma, situado junto al r\xEDo T\xEDber.

Era uno de los centros comerciales m\xE1s importantes de la ciudad primitiva, donde llegaban mercanc\xEDas y se desarrollaba la actividad econ\xF3mica diaria.

\u{1F3DB}\uFE0F Qu\xE9 ver:
Este peque\xF1o conjunto re\xFAne algunos de los templos mejor conservados de la \xE9poca republicana.

\u2022 Templo de H\xE9rcules V\xEDctor \u2192 templo circular de m\xE1rmol (siglo II a.C.)
\u2022 Templo de Portuno \u2192 templo rectangular dedicado al dios de los puertos
\u2022 Arco de Jano \u2192 estructura de cuatro caras utilizada como refugio comercial

\u{1F4A1} Detalle importante:
Estos templos se conservan tan bien porque fueron reutilizados como iglesias en la Edad Media.

\u{1F33F} Experiencia viajera:
Es un lugar muy distinto al resto de Roma.

M\xE1s tranquilo, m\xE1s abierto y con una sensaci\xF3n mucho m\xE1s aut\xE9ntica.

Aqu\xED puedes caminar sin agobios y disfrutar de la historia sin multitudes.

\u{1F4CD} Conexi\xF3n con la ruta:
Est\xE1s justo en el punto donde Roma empez\xF3 a crecer como ciudad comercial.

\u{1F4A1} Curiosidad hist\xF3rica:
Se cree que aqu\xED tuvo lugar el primer combate de gladiadores de Roma en el a\xF1o 264 a.C.

\u2728 Consejo AvenTourArte:
No es un lugar espectacular a primera vista, pero es de los que m\xE1s valor tienen cuando entiendes lo que est\xE1s viendo.`,foto:"cld:europa/italia/roma/foro-boario",horario:`Acceso exterior libre 24h
Interiores: generalmente no visitables`,precio:"Gratis"},{nombre:"Boca de la Verdad y Santa Mar\xEDa in Cosmedin",descripcion:`Despu\xE9s de recorrer el Foro Boario, donde Roma muestra su lado m\xE1s antiguo y comercial, el itinerario contin\xFAa hacia uno de los puntos m\xE1s curiosos y reconocibles de la ciudad: la Boca de la Verdad.

A solo unos pasos, en el p\xF3rtico de la iglesia de Santa Mar\xEDa in Cosmedin, te espera una de las tradiciones m\xE1s famosas de Roma.

\u{1F5FF} La Boca de la Verdad:
Se trata de una enorme m\xE1scara de m\xE1rmol del siglo I d.C., probablemente representando al dios Oc\xE9ano.

Pero lo que la ha hecho famosa no es su origen, sino su leyenda.

Seg\xFAn la tradici\xF3n medieval, si introduces la mano en su boca y dices una mentira, esta se cerrar\xE1 y te la morder\xE1.

\u{1F3AC} Cultura popular:
Se convirti\xF3 en un icono mundial gracias a la pel\xEDcula \u201CVacaciones en Roma\u201D.

Desde entonces, es una parada obligatoria para los viajeros.

\u26EA Santa Mar\xEDa in Cosmedin:
Muchos visitantes se quedan solo con la foto, pero la iglesia es una aut\xE9ntica joya medieval.

\u2022 Suelo cosmatesco \u2192 uno de los m\xE1s bonitos de Roma
\u2022 Reliquia de San Valent\xEDn \u2192 el patr\xF3n de los enamorados
\u2022 Cripta \u2192 peque\xF1a y muy especial
\u2022 Campanario \u2192 el m\xE1s alto de \xE9poca medieval en Roma

\u{1F4A1} Experiencia viajera:
Aqu\xED Roma mezcla perfectamente historia, leyenda y cultura popular.

Es una parada breve, pero con mucho significado.

\u{1F4A1} Consejo viajero:
Si quieres evitar colas largas, ven temprano o a \xFAltima hora.

Si solo quieres verla sin foto, puedes observarla desde fuera sin esperar.

\u2728 Consejo AvenTourArte:
Haz la foto, pero entra en la iglesia. Es de esos sitios que muchos pasan por alto y merece mucho la pena.`,fotos:["cld:europa/italia/roma/bocca-della-verita-cosmedin","cld:europa/italia/roma/santa-maria-in-cosmedin"],horario:"Todos los d\xEDas: 09:30 \u2013 18:00",precio:"Donativo aprox. 2\u20AC (incluye acceso a la iglesia)"},{nombre:"Piazza dei Cavalieri di Malta",descripcion:`El recorrido asciende ahora hacia una de las colinas m\xE1s tranquilas y especiales de Roma: el Aventino.

Aqu\xED el ritmo cambia por completo.

Menos ruido. Menos gente. M\xE1s magia.

\u{1F510} El secreto de Roma:
En la Piazza dei Cavalieri di Malta se encuentra uno de los lugares m\xE1s curiosos de la ciudad.

Una simple puerta de madera, con una de las vistas m\xE1s sorprendentes de Roma.

\u{1F441}\uFE0F El \u201Cbuco della serratura\u201D:
Si miras por la cerradura, ver\xE1s una imagen perfectamente encuadrada de la c\xFApula de San Pedro al fondo, alineada entre setos perfectamente recortados.

Una de las vistas m\xE1s \xFAnicas que puedes tener en la ciudad.

\u{1F30D} Curiosidad \xFAnica:
Desde este punto est\xE1s viendo tres estados a la vez:

\u2022 La cerradura \u2192 Orden de Malta
\u2022 Los jardines \u2192 Italia
\u2022 La c\xFApula \u2192 Vaticano

\u{1F33F} Experiencia viajera:
El contraste con el centro es total.

Aqu\xED todo es silencio, equilibrio y calma.

\u{1F4A1} Qu\xE9 hacer cerca:
\u2022 Jard\xEDn de los Naranjos \u2192 uno de los mejores miradores de Roma
\u2022 Bas\xEDlica de Santa Sabina \u2192 iglesia paleocristiana impresionante

\u{1F307} Momento clave:
El atardecer desde esta zona es simplemente brutal.

\u{1F4A1} Consejo viajero:
Puede haber cola para la cerradura, pero suele avanzar r\xE1pido.

\u2728 Consejo AvenTourArte:
Este no es solo un sitio para ver, es un sitio para sentir Roma de otra manera.`,foto:"cld:europa/italia/roma/cerradura-calavieri-di-malta",horario:"Acceso libre 24h (mejor durante el d\xEDa para la vista por la cerradura)",precio:"Gratis"},{nombre:"Cena en Trastevere \u2013 Tonnarello",descripcion:`Despu\xE9s de un d\xEDa intenso recorriendo la Roma monumental, el itinerario termina cruzando el r\xEDo T\xEDber hacia uno de los barrios con m\xE1s alma de la ciudad: Trastevere.

Calles estrechas, luces c\xE1lidas, m\xFAsicos callejeros y un ambiente que mezcla lo local con lo viajero.

\u{1F35D} Parada obligatoria: Tonnarello

Tonnarello es uno de los restaurantes m\xE1s famosos de Roma y una experiencia en s\xED misma.

Ubicado en pleno coraz\xF3n de Trastevere, es el lugar perfecto para cerrar el d\xEDa con aut\xE9ntica cocina romana.

\u{1F37D}\uFE0F Qu\xE9 probar:
\u2022 Cacio e Pepe \u2192 su plato estrella, servido en sart\xE9n
\u2022 Carbonara \u2192 cremosa, potente y con guanciale crujiente
\u2022 Amatriciana \u2192 otro cl\xE1sico imprescindible
\u2022 Polpette \u2192 alb\xF3ndigas en diferentes versiones
\u2022 Pinsa romana \u2192 m\xE1s ligera y crujiente que la pizza tradicional

\u{1F4A1} Experiencia viajera:
Aqu\xED no vienes solo a cenar, vienes a vivir el ambiente romano.

Mesas llenas, camareros r\xE1pidos, ruido, risas y platos abundantes.

\u23F3 Importante:
La sede principal en Trastevere no acepta reservas.

Prep\xE1rate para esperar entre 30 y 60 minutos en horas punta.

\u{1F4A1} Consejo viajero:
\u2022 Ve antes de las 19:30 o sobre las 12:00
\u2022 O prueba otras sedes si quieres evitar colas

\u{1F370} Bonus final:
Su tiramis\xFA (servido en cafetera o copa) es el cierre perfecto del d\xEDa.

\u2728 Consejo AvenTourArte:
Despu\xE9s de cenar, pierde el rumbo por Trastevere.

Roma no se termina cuando acaba el itinerario, empieza a sentirse.`,fotos:["cld:europa/italia/roma/trastevere","cld:europa/italia/roma/tonnarello"],horario:"Todos los d\xEDas: 11:30 \u2013 23:00 (otras sedes pueden variar)",precio:"20\u20AC \u2013 30\u20AC por persona aprox."},{nombre:"Gelato en Isla Tiberina",descripcion:`Despu\xE9s de una jornada intensa entre historia, ruinas y miradores, el itinerario cruza el r\xEDo T\xEDber hacia uno de los lugares m\xE1s especiales y simb\xF3licos de Roma: la Isla Tiberina.

Aqu\xED el ritmo cambia.

El ruido de la ciudad desaparece ligeramente, el agua fluye a ambos lados y todo invita a parar.

\u{1F366} Parada dulce:
En el centro de la isla, Tiberino es el sitio perfecto para disfrutar de un gelato mientras paseas junto al r\xEDo.

\u{1F4A1} Experiencia viajera:
Es ese momento en el que bajas revoluciones, te sientas un rato y empiezas a sentir Roma de verdad.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
Esta isla siempre ha estado ligada a la medicina y la curaci\xF3n.

Seg\xFAn la leyenda, en el a\xF1o 293 a.C., una serpiente (s\xEDmbolo del dios Esculapio) lleg\xF3 hasta aqu\xED durante una epidemia. Desde entonces, este lugar se convirti\xF3 en un punto dedicado a la salud.

Hoy en d\xEDa, esa tradici\xF3n contin\xFAa con el hospital Fatebenefratelli.

\u{1F6B6} Qu\xE9 ver alrededor:
\u2022 Puente Fabricio (62 a.C.), el m\xE1s antiguo de Roma en uso
\u2022 Bas\xEDlica de San Bartolomeo, construida sobre el antiguo templo
\u2022 Vistas al r\xEDo y al m\xEDtico Ponte Rotto

\u{1F309} Conexi\xF3n del recorrido:
La isla conecta directamente el Ghetto Jud\xEDo con Trastevere, siendo un paso natural en el itinerario.

\u2728 Consejo AvenTourArte:
Si puedes, qu\xE9date unos minutos junto al r\xEDo al atardecer.

Este es uno de esos momentos donde el viaje deja de ser un plan y se convierte en recuerdo.`,foto:"cld:europa/italia/roma/isla-tiberina",horario:`Acceso a la isla: 24h
Helader\xEDa Tiberino: aprox. 08:00 \u2013 00:00 (puede variar)`,precio:"Gelato: 3\u20AC \u2013 5\u20AC aprox."},{nombre:"Iglesia de San Ignacio de Loyola (Paseo nocturno)",descripcion:`Para cerrar el d\xEDa, el recorrido vuelve al coraz\xF3n del centro hist\xF3rico y regala un \xFAltimo impacto visual inesperado: la Iglesia de San Ignacio de Loyola.

Aqu\xED el ritmo vuelve a cambiar.

\u{1F319} Ambiente nocturno:
Por la noche, la plaza se vuelve mucho m\xE1s tranquila, con una luz c\xE1lida y una atm\xF3sfera casi teatral que prepara perfectamente lo que vas a ver dentro.

\u{1F3A8} El efecto WOW:
Nada m\xE1s entrar, levanta la vista.

\u2022 La c\xFApula que ves\u2026 no existe.
Es completamente plana, pintada con una perspectiva perfecta que enga\xF1a al ojo.

\u2022 El techo parece abrirse al cielo.
La obra de Andrea Pozzo crea una ilusi\xF3n de profundidad que te envuelve por completo.

\u{1F4A1} Experiencia viajera:
Es uno de esos lugares donde Roma juega con tu percepci\xF3n y gana.

Hay un espejo en el centro que te permite ver el fresco sin forzar el cuello.

\u2728 Consejo AvenTourArte:
Busca el punto marcado en el suelo para ver la \u201Cc\xFApula\u201D perfecta y, antes de irte, sal a la plaza y qu\xE9date unos minutos en silencio.`,foto:"cld:europa/italia/roma/san-ignacio-loyola",horario:"Todos los d\xEDas: 09:00 \u2013 23:30",precio:"Entrada gratuita | Iluminaci\xF3n: 1\u20AC \u2013 2\u20AC"},{nombre:"Quattro Fontane (Paseo nocturno final)",descripcion:`Despu\xE9s de la magia visual de San Ignacio, el paseo nocturno contin\xFAa hacia uno de esos rincones discretos que resumen perfectamente el alma de Roma: las Quattro Fontane.

Aqu\xED no hay colas ni grandes multitudes, pero s\xED una ciudad pensada al detalle.

\u{1F4A7} El cruce:
En cada esquina encontrar\xE1s una fuente distinta:

\u2022 El T\xEDber \u2192 s\xEDmbolo de Roma
\u2022 El Arno \u2192 s\xEDmbolo de Florencia
\u2022 Diana \u2192 la pureza
\u2022 Juno \u2192 la fidelidad

Un conjunto peque\xF1o, pero con un equilibrio perfecto.

\u{1F3DB}\uFE0F Detalle urban\xEDstico:
Si te colocas en el centro y miras en distintas direcciones, podr\xE1s alinear varios obeliscos importantes de Roma.

Nada est\xE1 colocado al azar.

\u26EA Imprescindible:
San Carlo alle Quattro Fontane (Borromini), una de las obras m\xE1s innovadoras del barroco.

\u{1F4A1} Experiencia viajera:
Este es el tipo de lugar que no aparece en todos los itinerarios, pero que te hace sentir que est\xE1s descubriendo Roma de verdad.

\u2728 Consejo AvenTourArte:
De noche, con menos tr\xE1fico y luz c\xE1lida, este cruce tiene una atm\xF3sfera especial perfecta para cerrar el d\xEDa.`,fotos:["cld:europa/italia/roma/quattro-fontane-tiber","cld:europa/italia/roma/quattro-fontane-arno","cld:europa/italia/roma/quattro-fontane-diana","cld:europa/italia/roma/quattro-fontane-juno"],horario:"Acceso libre: 24 horas",precio:"Gratis"}]},{dia:"D\xEDa 3 \u2013 Vaticano y despedida de Roma",zonas:[{nombre:"Giolitti \u2013 Helado camino al Vaticano",descripcion:`Si no madrugas en exceso o te encaja bien por ruta antes de comenzar la parte m\xE1s intensa del d\xEDa, hay una parada que eleva el plan desde el primer momento: Giolitti.

Fundada en 1900, es probablemente la helader\xEDa m\xE1s famosa y con m\xE1s historia de toda Roma. Entrar aqu\xED es como viajar a otra \xE9poca: vitrinas cl\xE1sicas, ambiente bullicioso y una tradici\xF3n que sigue intacta.

\u{1F366} Experiencia viajera:
Este no es solo un helado, es ese peque\xF1o momento que convierte un d\xEDa intenso en algo especial desde el inicio.

Adem\xE1s, encaja muy bien en el recorrido: est\xE1 muy cerca del Pante\xF3n y puede funcionar como arranque agradable antes de encaminarte hacia el Vaticano.

\u{1F368} Qu\xE9 probar:
\u2022 Pistacho \u2192 intenso y de gran calidad
\u2022 Champagne \u2192 refrescante y diferente
\u2022 Riso \u2192 sabor tipo arroz con leche fr\xEDo
\u2022 Cl\xE1sicos \u2192 chocolate, stracciatella, avellana

\u{1F4A1} Detalle imprescindible:
Pide \u201Cpanna\u201D (nata montada) arriba. Es casera y marca la diferencia.

\u{1F4A1} Experiencia AvenTourArte:
Pide tu helado para llevar y disfr\xFAtalo caminando. Es uno de esos momentos simples, pero perfectos del viaje.`,horario:"Todos los d\xEDas: 07:30 \u2013 00:00",precio:`3\u20AC \u2013 6\u20AC aprox. seg\xFAn tama\xF1o
\u26A0\uFE0F Precio m\xE1s alto si te sientas en mesa`},{nombre:"Misa del Papa en el Vaticano",descripcion:`Si tu viaje coincide con una celebraci\xF3n papal, asistir a una misa o encuentro con el Papa es una de las experiencias m\xE1s especiales que puedes vivir en Roma.

No es solo un acto religioso, es un momento \xFAnico, cargado de historia, emoci\xF3n y simbolismo.

\u26EA Tipos de encuentros:

\u2022 \xC1ngelus (Domingos 12:00)
No necesitas entrada.
El Papa aparece en la ventana del Palacio Apost\xF3lico, reza y da una breve reflexi\xF3n.

\u2022 Audiencia General (Mi\xE9rcoles 09:00)
No es misa, sino catequesis.
S\xCD requiere entrada gratuita.

\u2022 Misas solemnes (Navidad, Semana Santa, canonizaciones)
Las m\xE1s especiales\u2026 y tambi\xE9n las m\xE1s dif\xEDciles de conseguir.
Requieren entrada y reservar con meses de antelaci\xF3n.

\u{1F39F}\uFE0F C\xF3mo conseguir entradas:

Las entradas son SIEMPRE gratuitas.

\u26A0\uFE0F Nunca pagues por ellas.

Debes solicitarlas a la Prefectura de la Casa Pontificia:

\u2022 Por fax o correo
\u2022 Indicando fecha, tipo de evento y n\xFAmero de personas

\u{1F4CD} Recogida:
En la Puerta de Bronce (columnata derecha de Plaza de San Pedro)

Normalmente el d\xEDa anterior o la misma ma\xF1ana.

\u23F1\uFE0F Organizaci\xF3n clave:

\u2022 Llega m\xEDnimo 1,5 \u2013 2 horas antes
\u2022 Controles de seguridad tipo aeropuerto
\u2022 Mucha afluencia en fechas importantes

\u{1F455} C\xF3digo de vestimenta (OBLIGATORIO):

\u2022 Hombros cubiertos
\u2022 Pantal\xF3n o falda por debajo de la rodilla

Si no cumples, no entras aunque tengas entrada.

\u{1F4A1} Experiencia viajera:
Estar en la Plaza de San Pedro, rodeado de miles de personas de todo el mundo, esperando al Papa\u2026 es algo dif\xEDcil de explicar.

Es uno de esos momentos que no se olvidan.

\u26A0\uFE0F Importante para organizar el d\xEDa:
Asistir a este tipo de evento puede condicionar bastante el resto del itinerario, as\xED que conviene encajarlo con margen.

\u2728 Consejo AvenTourArte:
Si no consigues entradas, ve al \xC1ngelus del domingo.
Es gratuito, mucho m\xE1s sencillo y sigue siendo una experiencia muy especial.`,foto:"cld:europa/italia/vaticano/plaza-san-pedro-misa-papa",horario:`\xC1ngelus: Domingos 12:00
Audiencia General: Mi\xE9rcoles 09:00
Misas solemnes: seg\xFAn calendario lit\xFArgico`,precio:`GRATIS (todas las entradas oficiales)
\u26A0\uFE0F No pagar a terceros`},{nombre:"Museos Vaticanos y Capilla Sixtina",descripcion:`Los Museos Vaticanos son uno de los complejos culturales m\xE1s impresionantes del mundo. Aqu\xED se conserva la enorme colecci\xF3n de arte reunida por los papas durante siglos.

Es un viaje por la historia del arte occidental.

\u{1F3A8} Lo imprescindible:

\u2022 Capilla Sixtina (\u2B50 punto final)
Con los frescos de Miguel \xC1ngel:
\u2013 La creaci\xF3n de Ad\xE1n
\u2013 El Juicio Final

\u26A0\uFE0F Importante:
\u2013 Prohibido hablar
\u2013 Prohibidas fotos y v\xEDdeos

\u2022 Estancias de Rafael
Destaca \u201CLa Escuela de Atenas\u201D, una de las obras m\xE1s importantes del Renacimiento.

\u2022 Galer\xEDa de los Mapas
Un pasillo espectacular de 120 metros con mapas pintados de Italia.

\u2022 Patio del Belvedere y Patio de la Pi\xF1a
Aqu\xED ver\xE1s esculturas clave como:
\u2013 Laocoonte
\u2013 Apolo de Belvedere

\u2022 Escalera de Caracol (Momo)
La ic\xF3nica salida del museo, una de las fotos m\xE1s famosas.

\u23F1\uFE0F Duraci\xF3n real:
Necesitar\xE1s m\xEDnimo 3\u20134 horas para ver lo principal sin prisas.

\u{1F6A8} Consejo CLAVE:
Reserva SIEMPRE online con antelaci\xF3n.

Sin entrada anticipada:
\u{1F449} Puedes perder 2\u20133 horas en cola

\u{1F4CD} Ubicaci\xF3n importante:

La entrada NO est\xE1 en la Plaza de San Pedro.

\u{1F449} Est\xE1 en Viale Vaticano

\u{1F4A1} Truco PRO:
Si haces visita guiada oficial, puedes:
\u{1F449} Acceder directamente desde la Capilla Sixtina a la Bas\xEDlica de San Pedro
\u{1F449} Evitas otra cola enorme

\u{1F455} C\xF3digo de vestimenta:

\u2022 Hombros cubiertos
\u2022 Pantalones/falda por debajo de la rodilla

\u274C Si no cumples, no entras

\u{1F4A1} Experiencia viajera:
Este lugar impresiona, pero tambi\xE9n puede saturar.

Hay much\xEDsima gente, salas interminables y est\xEDmulos constantes.

\u2728 Consejo AvenTourArte:
No intentes verlo TODO.

Ve directo a lo importante, disfruta las obras clave y no te quemes.

Menos cantidad, m\xE1s experiencia.`,horario:`Lunes a s\xE1bado: 08:00 \u2013 20:00
\xDAltimo acceso: 18:00
Domingos: cerrado (excepto \xFAltimo domingo del mes Gratis (09:00\u201314:00) 
 \u26A0\uFE0F Colas masivas desde las 06:00 \u2192 no recomendado)`,precio:`General: 25\u20AC (incluye reserva online)
Reducida: 13\u20AC
Gratis: <6 a\xF1os y casos especiales
Audiogu\xEDa: +7\u20AC
Visita guiada: 40\u20AC \u2013 50\u20AC aprox.`},{nombre:"Bas\xEDlica de San Pedro y C\xFApula",descripcion:`Despu\xE9s de los Museos Vaticanos, el recorrido contin\xFAa hacia el gran coraz\xF3n del Vaticano: la Bas\xEDlica de San Pedro, uno de los templos m\xE1s impresionantes del mundo.

A diferencia de los Museos Vaticanos, aqu\xED la entrada es gratuita, pero la experiencia es igual o incluso m\xE1s impactante.

Nada m\xE1s entrar, la escala del lugar te sobrepasa.

\u{1F3DB}\uFE0F Qu\xE9 ver dentro:

\u2022 La Piedad de Miguel \xC1ngel
Una de las esculturas m\xE1s emocionantes de la historia.

\u2022 Baldaquino de Bernini
Gigantesco y espectacular, justo sobre el altar mayor.

\u2022 C\xFApula interior
Dise\xF1ada por Miguel \xC1ngel, domina todo el espacio.

\u2022 Grutas Vaticanas
Donde se encuentran las tumbas de los papas.

\u{1F4A1} Experiencia viajera:
Aqu\xED no solo visitas un monumento, sientes el peso de la historia, el arte y la espiritualidad en un mismo lugar.

\u{1F307} Subida a la C\xFApula (TOP del Vaticano):

Una de las mejores vistas de toda Roma.

\u26A0\uFE0F Importante:
Los \xFAltimos tramos son estrechos e inclinados.
No recomendable si tienes claustrofobia.

\u{1F4A1} Recompensa:
Vista 360\xBA de Roma con la Plaza de San Pedro a tus pies.

\u{1F6A8} Consejos clave (muy importante):

\u2022 Madruga (07:00) \u2192 sin colas
\u2022 Desde las 09:00 \u2192 esperas de 1\u20132 horas

\u26A0\uFE0F Mi\xE9rcoles:
Si hay Audiencia Papal \u2192 acceso retrasado hasta ~12:30

\u{1F455} C\xF3digo de vestimenta:

\u2022 Hombros cubiertos
\u2022 Rodillas cubiertas

\u274C Si no cumples \u2192 no entras (aunque hayas hecho cola)

\u{1F6AB} Ojo con esto:

No existen entradas oficiales \u201Cskip the line\u201D.

Lo que venden fuera son tours.

\u2728 Consejo AvenTourArte:
Si puedes, entra temprano y sube a la c\xFApula justo despu\xE9s.

Es uno de los momentos m\xE1s brutales de todo el viaje.`,foto:"cld:europa/italia/vaticano/basilica-san-pedro",horario:`Bas\xEDlica:
Invierno: 07:00 \u2013 18:30
Verano: 07:00 \u2013 19:10

C\xFApula:
Desde 07:30 hasta 1h antes del cierre`,precio:`Bas\xEDlica: GRATIS
C\xFApula: 8\u20AC (551 escalones a pie) | 10\u20AC (ascensor + 320 escalones)
Tesoro: 5\u20AC\u20136\u20AC
Necr\xF3polis (Scavi) : 13\u20AC (reserva con meses de antelaci\xF3n)`},{nombre:"Castillo de Sant\u2019Angelo y Puente Sant\u2019Angelo",descripcion:`Despu\xE9s de una ma\xF1ana intensa en el Vaticano \u2014arte, historia y una de las experiencias m\xE1s impactantes del viaje\u2014 el recorrido contin\xFAa de forma natural hacia el r\xEDo T\xEDber.

Aqu\xED Roma vuelve a cambiar de perspectiva.

Dejas atr\xE1s la monumentalidad del Vaticano y entras en una Roma m\xE1s abierta, m\xE1s tranquila y visualmente espectacular.

\u{1F309} El puente de entrada:

Antes de llegar al castillo, cruzar\xE1s el Puente Sant\u2019Angelo.

Uno de los m\xE1s bonitos de Roma.

Las esculturas de \xE1ngeles, dise\xF1adas por Bernini, crean un paseo casi escenogr\xE1fico que te prepara para lo que viene.

\u{1F4F8} Consejo:
Este es uno de los mejores puntos para fotos con la c\xFApula de San Pedro al fondo.

\u{1F3F0} El castillo:

Lo que ves hoy comenz\xF3 como el mausoleo del emperador Adriano,

pero Roma, como siempre, lo transform\xF3.

Fortaleza, refugio papal, prisi\xF3n y ahora museo.

Aqu\xED la historia no se conserva, evoluciona.

\u{1F525} Qu\xE9 no te puedes perder:

\u2022 Terraza del \xC1ngel \u2B50
El momento clave de la visita.

Desde arriba tendr\xE1s una de las mejores vistas de Roma:
\u2013 El Vaticano frente a ti
\u2013 El r\xEDo cruzando la ciudad
\u2013 El skyline romano completo

\u{1F4A1} Sensaci\xF3n:
Es uno de esos lugares donde entiendes Roma desde otra perspectiva.

\u2022 Apartamentos papales
Salas con frescos que reflejan el poder y la vida dentro del castillo.

\u2022 Pasetto di Borgo
El corredor secreto que conecta directamente con el Vaticano.

\u{1F4A1} Aqu\xED los papas escapaban en momentos de peligro.

(\u26A0\uFE0F No siempre visitable)

\u2615 Experiencia TOP:

En la parte superior hay una cafeter\xEDa con terraza.

Tomarte algo aqu\xED, despu\xE9s de todo lo vivido en el Vaticano, con San Pedro frente a ti, es uno de los momentos m\xE1s especiales del viaje.

\u{1F4A1} Experiencia viajera:
Este lugar funciona como transici\xF3n perfecta:

De la intensidad del Vaticano \u2192 a un momento de calma, vistas y disfrute.

\u{1F4A1} Consejo viajero:
Si vas en temporada alta, compra la entrada online.

Ahorrar\xE1s tiempo y energ\xEDa.

\u2728 Consejo AvenTourArte:
Un lugar para parar, mirar Roma desde arriba y empezar a despedirte poco a poco de la ciudad.`,fotos:["cld:europa/italia/roma/puente-sant-angelo","cld:europa/italia/roma/castillo-sant-angelo"],horario:`Martes a domingo: 09:00 \u2013 19:30
\xDAltimo acceso: 18:30
Lunes: cerrado`,precio:`General: 13\u20AC
Reducida UE (18\u201325): 2\u20AC
Gratis: menores de 18
Online: +1\u20AC / 2\u20AC`},{nombre:"Puente Umberto I",descripcion:`Despu\xE9s de recorrer el Castillo de Sant\u2019Angelo y cruzar su puente, el paseo contin\xFAa de forma natural siguiendo el r\xEDo T\xEDber hasta llegar a uno de los puntos m\xE1s especiales para despedirse de Roma: el Puente Umberto I.

Aqu\xED todo encaja.

Dejas atr\xE1s el Vaticano, el castillo y el bullicio\u2026 y de repente el espacio se abre.

\u{1F309} La vista:

Desde este puente se crea una de las im\xE1genes m\xE1s ic\xF3nicas de toda Roma:

\u2022 El r\xEDo T\xEDber en primer plano
\u2022 El Puente Sant\u2019Angelo en el centro
\u2022 La c\xFApula de San Pedro al fondo

Es, literalmente, la postal perfecta del viaje.

\u{1F4A1} Experiencia viajera:
Este no es solo un sitio para hacer una foto.

Es el momento en el que paras, miras atr\xE1s\u2026
y entiendes todo lo que acabas de vivir.

\u{1F307} Momento perfecto:

Al atardecer.

Cuando:
\u2022 El cielo empieza a caer
\u2022 Se encienden las luces del Vaticano
\u2022 El reflejo aparece en el agua

\u{1F449} Aqu\xED Roma se vuelve m\xE1gica.

\u{1F3DB}\uFE0F Detalle curioso:

A un lado ver\xE1s el enorme Palacio de Justicia.

Los romanos lo llaman \u201CIl Palazzaccio\u201D (el palacio feo), aunque hoy forma parte del paisaje cl\xE1sico de la ciudad.

\u2728 Consejo AvenTourArte:
No pases r\xE1pido por aqu\xED.

Qu\xE9date unos minutos.

Este es el punto donde el viaje deja de ser itinerario\u2026 y se convierte en recuerdo.`,foto:"cld:europa/italia/roma/puente-umberto-I",horario:"Acceso libre 24h",precio:"Gratis"},{nombre:"Shopping",descripcion:"Si todav\xEDa te queda algo de tiempo antes de volver, este es el momento perfecto para hacer compras, buscar \xFAltimos recuerdos, dar un paseo final o recuperar alguna visita que se te haya quedado en el tintero. Es un tramo pensado para bajar el ritmo y despedirse de Roma con calma.",horario:"Seg\xFAn tu horario de vuelta",precio:"Seg\xFAn compras"},{nombre:"\xDAltima comida en Roma \u2013 Da Baffetto o Cantina e Cucina",descripcion:`Despu\xE9s de recorrer el Vaticano, cruzar el T\xEDber y disfrutar de una de las mejores vistas de Roma desde el Puente Umberto I, llega el \xFAltimo momento del viaje.

Ese en el que ya no hay prisas.

Ese en el que sabes que Roma se est\xE1 terminando.

Y aqu\xED hay una decisi\xF3n importante:

\u{1F449} Pizza o pasta.

\u{1F355} Opci\xF3n 1 \u2013 Da Baffetto:

La pizzer\xEDa m\xE1s ic\xF3nica de Roma.

Aqu\xED no vienes a relajarte, vienes a vivir una experiencia aut\xE9ntica.

\u2022 Ambiente ca\xF3tico, ruidoso y lleno de vida
\u2022 Mesas compartidas
\u2022 Sin reservas

\u{1F4A1} Pero cuando llega la pizza\u2026 todo tiene sentido.

\u{1F525} Estilo:
Pizza romana cl\xE1sica \u2192 fina, crujiente y potente.

\u2B50 Imprescindible:
Pizza Baffetto (huevo, alcachofas, champi\xF1ones y salchicha)

\u{1F4A1} Experiencia viajera:
Es el t\xEDpico sitio que no es perfecto, pero es inolvidable.

\u{1F35D} Opci\xF3n 2 \u2013 Cantina e Cucina:

A solo unos pasos, el plan cambia completamente.

Aqu\xED todo es m\xE1s calmado, m\xE1s cuidado y m\xE1s de \u201C\xFAltima comida del viaje\u201D.

\u2022 Decoraci\xF3n r\xFAstica muy bonita
\u2022 Servicio m\xE1s atento
\u2022 Ambiente relajado

\u{1F525} Qu\xE9 probar:
\u2022 Carbonara \u2B50
\u2022 Focaccia
\u2022 Polpette (alb\xF3ndigas)

\u{1F4A1} Experiencia viajera:
Perfecto para sentarte, brindar y cerrar el viaje como se merece.

\u2696\uFE0F Decisi\xF3n r\xE1pida:

\u2022 Quieres experiencia romana real \u2192 Da Baffetto
\u2022 Quieres cierre tranquilo y especial \u2192 Cantina e Cucina

\u{1F4CD} Ubicaci\xF3n:
Ambos est\xE1n en Via del Governo Vecchio, a pocos minutos de Piazza Navona.

Perfecto para encajarlo antes de volver al alojamiento o ir al aeropuerto.

\u{1F4A1} Consejo viajero:
Si vas justo de tiempo:
\u{1F449} Cantina e Cucina es m\xE1s predecible

Si tienes margen:
\u{1F449} Da Baffetto merece la experiencia

\u2728 Consejo AvenTourArte:
No pienses en el plan.
No mires el reloj.

Este es el \xFAltimo momento.

Pide algo que te apetezca de verdad y desp\xEDdete de Roma como se merece.`,horario:`Da Baffetto: Mi\xE9\u2013Lun 12:00\u201315:30 / 18:00\u201300:00 (martes cerrado)
Cantina e Cucina: todos los d\xEDas 11:00\u201323:30`,precio:`Da Baffetto: 10\u20AC \u2013 15\u20AC aprox.
Cantina e Cucina: 15\u20AC \u2013 25\u20AC aprox.`}]}]},{titulo:"Gastronom\xEDa",platos:[{nombre:"Carbonara",descripcion:`Uno de los platos m\xE1s emblem\xE1ticos de Roma y probablemente la pasta m\xE1s famosa de Italia. La aut\xE9ntica carbonara NO lleva nata, ni cebolla, ni ajo.

Se elabora con pasta (normalmente spaghetti o rigatoni), huevo, queso pecorino romano, guanciale (papada de cerdo curada) y pimienta negra.

La clave est\xE1 en la t\xE9cnica: el huevo se emulsiona con el queso y la grasa del guanciale para crear una salsa cremosa sin cocinar directamente el huevo.

\u{1F4A1} Experiencia viajera:
Es un plato potente, intenso y muy sabroso. Cuando est\xE1 bien hecha, es probablemente uno de los mejores platos que probar\xE1s en Roma.`,foto:"cld:europa/italia/roma/carbonara",precio:"Moderado"},{nombre:"Cacio e pepe",descripcion:`Una de las pastas m\xE1s famosas y representativas de Roma. Se prepara con pasta, pecorino romano rallado y abundante pimienta negra.

La clave est\xE1 en emulsionar el queso con el agua de cocci\xF3n de la pasta para crear una salsa cremosa sin necesidad de nata.

Sencilla en apariencia, pero espectacular cuando est\xE1 bien hecha.`,foto:"cld:europa/italia/roma/cacio-e-pepe",precio:"Moderado"},{nombre:"Bucatini all\u2019amatriciana",descripcion:`Otra de las grandes joyas de la gastronom\xEDa romana. Se prepara con bucatini (pasta larga hueca), salsa de tomate, guanciale y queso pecorino romano.

En la receta tradicional NO lleva cebolla (aunque algunos sitios la usan).

El guanciale aporta un sabor profundo que se mezcla con el tomate creando una salsa intensa y muy caracter\xEDstica.`,foto:"cld:europa/italia/roma/amatriciana",precio:"Moderado"},{nombre:"Lasa\xF1a",descripcion:`Gran cl\xE1sico de la cocina italiana que tambi\xE9n aparece en muchos locales tradicionales de Roma. Se hace por capas de pasta con rag\xFA de carne, bechamel y queso gratinado.

Es un plato contundente y muy reconfortante, aunque m\xE1s t\xEDpico de otras regiones de Italia que de Roma.`,foto:"cld:europa/italia/roma/lasana",precio:"Moderado"},{nombre:"Pizza romana",descripcion:`La pizza t\xEDpica de Roma se caracteriza por ser m\xE1s fina, crujiente y ligera que en otras partes de Italia.

Es muy distinta a la napolitana, donde la masa es m\xE1s gruesa y esponjosa.

Puede llevar ingredientes cl\xE1sicos como mozzarella, tomate, champi\xF1ones, prosciutto, alcachofas o anchoas.

\u{1F4A1} Extra importante:
Tambi\xE9n existe la versi\xF3n \u201Cpizza al taglio\u201D, que se vende al corte en panader\xEDas y es muy t\xEDpica para comer r\xE1pido.`,precio:"Econ\xF3mico-moderado"},{nombre:"Pizza bianca / pizza rossa",descripcion:`Dos de las opciones m\xE1s t\xEDpicas de comida r\xE1pida en Roma.

\u2022 Pizza bianca \u2192 masa de pan crujiente con aceite de oliva y sal
\u2022 Pizza rossa \u2192 la misma base con salsa de tomate (sin queso)

Se venden al peso en panader\xEDas y se comen caminando.

\u{1F4A1} Experiencia viajera:
Es lo m\xE1s aut\xE9ntico para picar algo r\xE1pido como un romano.`,foto:"cld:europa/italia/roma/pizza-rossa",precio:"Econ\xF3mico"},{nombre:"Pinsa romana",descripcion:`Variante romana de la pizza, con forma ovalada y una masa m\xE1s ligera, aireada y crujiente.

Se elabora con una mezcla de harinas y fermentaci\xF3n larga, lo que la hace m\xE1s digestiva.

Muy popular tanto para comer sentado como para algo r\xE1pido.`,foto:"cld:europa/italia/roma/pinsa",precio:"Econ\xF3mico-moderado"},{nombre:"Focaccia",descripcion:`Pan plano t\xEDpico italiano, similar a una masa de pizza pero m\xE1s gruesa, esponjosa y con un interior muy aireado.

Se elabora con harina, aceite de oliva, sal y levadura, y suele llevar por encima ingredientes sencillos como sal gruesa, romero o tomate.

Es m\xE1s t\xEDpica del norte de Italia, pero en Roma se encuentra f\xE1cilmente como entrante o acompa\xF1amiento.`,precio:"Econ\xF3mico"},{nombre:"Panini",descripcion:`Bocadillos italianos preparados normalmente con pan crujiente o chapata y rellenos de ingredientes como prosciutto, mortadela, mozzarella, tomate, r\xFAcula, pesto o verduras.

Muchas veces se preparan al momento en panader\xEDas o \u201Calimentari\u201D.

Son una opci\xF3n perfecta para comer r\xE1pido entre visitas.`,precio:"Econ\xF3mico"},{nombre:"Suppl\xEC",descripcion:`Croqueta de arroz t\xEDpica romana, rellena de mozzarella y normalmente con tomate.

Se fr\xEDe hasta quedar crujiente por fuera y cremosa por dentro.

\u{1F4A1} Detalle clave:
Al partirlo, el queso se estira formando un hilo (por eso se llama \u201Cal telefono\u201D).

\u{1F4A1} Experiencia viajera:
El snack callejero m\xE1s t\xEDpico de Roma.`,precio:"Econ\xF3mico"},{nombre:"Carciofi alla giudia",descripcion:`Alcachofas fritas al estilo jud\xEDo-romano, abiertas como una flor y muy crujientes.

Se preparan enteras, fritas hasta quedar doradas por fuera y tiernas por dentro.

Muy t\xEDpicas del barrio jud\xEDo de Roma.`,precio:"Moderado"},{nombre:"Fiori di zucca fritti",descripcion:`Flores de calabac\xEDn rellenas de mozzarella y anchoa, rebozadas y fritas.

Crujientes por fuera y suaves por dentro, son uno de los aperitivos m\xE1s t\xEDpicos de Roma.`,precio:"Moderado"},{nombre:"Saltimbocca alla romana",descripcion:`Uno de los grandes cl\xE1sicos de la cocina romana. Se elabora con filetes finos de ternera, jam\xF3n (prosciutto) y salvia, cocinados con vino.

Tiene un sabor intenso y muy caracter\xEDstico.`,precio:"Moderado"},{nombre:"Polpette al sugo",descripcion:`Alb\xF3ndigas de carne en salsa de tomate, hechas con carne picada, pan, huevo y especias.

\u{1F4A1} Importante:
En Italia no suelen servirse con pasta, sino como plato independiente.

Muy t\xEDpicas en trattorias tradicionales.`,precio:"Moderado"},{nombre:"Spritz Aperol",descripcion:`Uno de los aperitivos m\xE1s populares de Italia.

Se prepara con Aperol, prosecco y agua con gas, servido con hielo y una rodaja de naranja.

Ligero, refrescante y perfecto antes de cenar.`,foto:"cld:europa/italia/roma/spritz-aperol",precio:"Moderado"},{nombre:"Tiramis\xFA",descripcion:`Uno de los postres italianos m\xE1s famosos del mundo.

Se elabora con bizcochos empapados en caf\xE9, crema de mascarpone, huevo, az\xFAcar y cacao.

\u{1F4A1} En Roma es muy com\xFAn encontrarlo en formato individual para llevar.

Cremoso, suave y el final perfecto de cualquier comida.`,foto:"cld:europa/italia/roma/tiramisu",precio:"Econ\xF3mico"},{nombre:"Gelato",descripcion:`El helado italiano es un imprescindible absoluto en Roma.

Tiene una textura m\xE1s densa y cremosa, y suele elaborarse con ingredientes muy naturales.

Sabores como pistacho, avellana o stracciatella son un cl\xE1sico.`,foto:"cld:europa/italia/roma/gelato",precio:"Econ\xF3mico"}]},{titulo:"D\xF3nde comer en Roma",lugares:[{nombre:"Tonnarello (Trastevere)",descripcion:`Hablar de Tonnarello es hablar del restaurante m\xE1s viral y concurrido de Trastevere.

Aqu\xED no vienes solo a comer\u2026 vienes a vivir el ambiente romano en su m\xE1ximo nivel.

Mesas llenas, camareros corriendo, platos saliendo sin parar y ese caos organizado que hace que todo funcione.

\u{1F35D} Qu\xE9 lo hace especial:

Su nombre viene del \u201Ctonnarello\u201D, una pasta fresca al huevo similar al spaghetti pero m\xE1s gruesa y con forma cuadrada, perfecta para retener la salsa.

Los platos se sirven directamente en sartenes de aluminio, lo que le da ese toque tan caracter\xEDstico.

\u2B50 Imprescindibles:

\u2022 Cacio e pepe \u2192 su plato estrella, extremadamente cremoso
\u2022 Carbonara \u2192 receta tradicional (sin nata, con huevo, pecorino y guanciale crujiente)
\u2022 Polpette \u2192 alb\xF3ndigas muy recomendadas como entrante

\u{1F4A1} Experiencia viajera:
Es uno de esos lugares donde todo es intenso: el ruido, el ritmo, la comida\u2026 y justo por eso es tan memorable.

No es un restaurante tranquilo, es una experiencia.

\u23F3 Importante:

No aceptan reservas.

Las colas son inevitables, sobre todo por la noche, pero avanzan bastante r\xE1pido porque el local es grande y tienen varias sedes cercanas.

\u{1F4CD} Sedes:

\u2022 Principal \u2192 Via della Paglia (junto a Santa Maria in Trastevere)
\u2022 Tonnarello Scala y Calisto \u2192 misma zona, ayudan a reducir esperas
\u2022 Tonnarello San Pietro \u2192 opci\xF3n cerca del Vaticano

\u{1F4A1} Consejo AvenTourArte:

\u2022 Ve antes de las 19:30 o a mediod\xEDa para evitar largas colas
\u2022 Si ves demasiada gente, prueba en alguna de sus otras sedes

\u26A1 Alternativa directa:

Nannarella (en Piazza di S. Calisto)

Mismo estilo, mismo tipo de comida y muchas veces con menos espera.

\u2728 Conclusi\xF3n:

Si quieres vivir Trastevere de verdad, este es tu sitio.

Si buscas algo tranquilo\u2026 mejor otro plan \u{1F604}`,horario:"Todos los d\xEDas: 11:30 \u2013 23:00",precio:"20\u20AC \u2013 30\u20AC por persona aprox."},{nombre:"Tavernetta 29 da Tony e Andrea",descripcion:`Tavernetta 29 da Tony e Andrea es una de esas joyas que no destacan por fuera\u2026 pero que te ganan cuando entras.

Ubicada en una calle tranquila de Trastevere, es la opci\xF3n perfecta si buscas una experiencia romana aut\xE9ntica, familiar y alejada del bullicio de los restaurantes m\xE1s virales.

\u{1F3E1} El ambiente:

\u2022 Local peque\xF1o, acogedor y r\xFAstico
\u2022 Trato cercano y muy humano
\u2022 Sensaci\xF3n de estar comiendo en casa de alguien local

Aqu\xED no hay prisas.

Aqu\xED se viene a disfrutar.

\u{1F35D} Qu\xE9 comer:

\u2022 Carbonara \u2192 muy equilibrada y cremosa (de las mejores del barrio)
\u2022 Amatriciana y Gricia \u2192 cl\xE1sicos romanos bien ejecutados
\u2022 Coda alla vaccinara \u2192 rabo de toro cocinado a fuego lento
\u2022 Fiori di zucca \u2192 flores de calabac\xEDn fritas, crujientes y rellenas de mozzarella y anchoas \u2B50

\u{1F4A1} Experiencia viajera:

Es el contrapunto perfecto a sitios como Tonnarello.

Menos ruido.
M\xE1s autenticidad.
M\xE1s conexi\xF3n con la cocina romana real.

\u{1F377} Detalle importante:

El vino de la casa es sencillo pero muy bien integrado en la experiencia.

\u{1F465} Ideal para:

\u2022 Cena tranquila
\u2022 Plan en pareja
\u2022 Comer bien sin prisas

\u{1F4CD} Ubicaci\xF3n:

En Via della Pelliccia, una de las calles m\xE1s bonitas y menos transitadas de Trastevere.

\u2728 Consejo AvenTourArte:

Si quieres sentir que est\xE1s comiendo en la Roma de verdad\u2026 este es tu sitio.`,horario:"12:30 \u2013 15:00 y 17:30 \u2013 22:00 (lunes suele cerrar)",precio:"25\u20AC \u2013 35\u20AC por persona"},{nombre:"Pastificio Guerra",descripcion:`Pastificio Guerra es uno de los lugares m\xE1s emblem\xE1ticos de Roma para comer bien, r\xE1pido y por muy poco dinero.

No es un restaurante.

Es una experiencia.

\u{1F3ED} El concepto:

Una antigua f\xE1brica de pasta que cada d\xEDa cocina solo dos platos con pasta fresca.

Nada m\xE1s.

\u{1F449} Simple\u2026 y espectacular.

\u{1F35D} C\xF3mo funciona:

\u2022 Solo 2 opciones diarias (seg\xFAn lo que preparen ese d\xEDa)
\u2022 Pasta reci\xE9n hecha
\u2022 Te la sirven en bandeja para llevar
\u2022 Puedes a\xF1adir pecorino por encima

\u{1F4A1} Ejemplos t\xEDpicos:

\u2022 Carbonara
\u2022 Amatriciana
\u2022 Lasa\xF1a
\u2022 Cacio e pepe

\u{1F525} Lo que lo hace \xFAnico:

Calidad + precio.

\u{1F449} Probablemente la mejor relaci\xF3n calidad-precio del centro de Roma.

\u{1F4A1} Experiencia viajera:

Aqu\xED comes como un local:

\u2022 De pie
\u2022 En la calle
\u2022 Sin complicaciones

\u26A0\uFE0F No hay sitio para sentarse y puede haber cola en horas punta

Pero con una pasta brutal.

\u{1F4CD} Ubicaci\xF3n:

A 1 minuto de Plaza de Espa\xF1a.

Perfecto para encajarlo en ruta.

\u{1F45F} Plan t\xEDpico:

Pides tu pasta \u2192 te la llevas \u2192 y la comes paseando o en una plaza cercana.

\u{1F377} Detalle curioso:

A veces incluyen un peque\xF1o vaso de vino por el mismo precio o con un suplemento m\xEDnimo.

\u2728 Consejo AvenTourArte:

Si quieres comer incre\xEDble sin gastar casi nada en pleno centro\u2026

este es uno de los mejores sitios de todo Roma.`,horario:"Todos los d\xEDas: 13:00 \u2013 21:00",precio:"5\u20AC \u2013 7\u20AC por persona"},{nombre:"Pastasciutta",descripcion:`Pastasciutta es una de las mejores opciones en Roma para comer pasta fresca, r\xE1pida y barata sin renunciar a calidad.

Es el concepto perfecto de \u201Ccomida callejera gourmet\u201D.

\u{1F35D} El concepto:

Pasta artesanal cocinada al momento y servida en envases pr\xE1cticos.

\u{1F449} Como un take-away\u2026 pero de pasta italiana real.

\u{1F525} Qu\xE9 lo hace especial:

\u2022 Pasta fresca hecha al momento
\u2022 Cocina visible \u2192 ves c\xF3mo la preparan
\u2022 Servicio rapid\xEDsimo
\u2022 Precios muy econ\xF3micos

\u{1F374} Qu\xE9 pedir:

Siempre tienen cl\xE1sicos romanos:

\u2022 Carbonara
\u2022 Amatriciana
\u2022 Cacio e pepe

Y adem\xE1s:

\u2022 Rag\xF9
\u2022 Pesto
\u2022 Opciones del d\xEDa

\u{1F449} M\xE1s variedad que otros sitios similares.

\u{1F4A1} Experiencia viajera:

Este es el t\xEDpico sitio donde comes bien sin perder tiempo:

\u2022 De pie o en barra
\u2022 Para llevar
\u2022 Sin esperas largas

Perfecto para d\xEDas intensos de turismo.

\u{1F4CD} Ubicaciones clave:

\u2022 Vaticano \u2192 ideal tras museos
\u2022 Fontana di Trevi \u2192 pleno centro
\u2022 Piazza del Popolo / Flaminio \u2192 conexi\xF3n con Borghese

\u{1F449} Muy f\xE1cil de encajar en cualquier ruta.

\u{1F45F} Plan t\xEDpico:

Pides tu pasta \u2192 te la llevas \u2192 y la comes en una plaza cercana.

\u2728 Consejo AvenTourArte:

Si quieres comer pasta buena, r\xE1pida y barata en cualquier momento del d\xEDa\u2026

este es uno de los mejores comodines de Roma.`,horario:"Horario continuo aprox.: 10:30 \u2013 22:00",precio:"9\u20AC \u2013 11\u20AC por persona"},{nombre:"Pompi",descripcion:`Pompi es, probablemente, el lugar m\xE1s famoso de Roma para probar tiramis\xFA.

Aqu\xED vienes directamente a por uno de los mejores tiramis\xFAs de Roma.

\u{1F370} Qu\xE9 lo hace especial:

Su tiramis\xFA.

Cremoso, equilibrado y con ingredientes de gran calidad:

\u2022 Bizcocho savoiardi empapado en caf\xE9
\u2022 Crema de mascarpone muy suave
\u2022 Cacao puro por encima

\u{1F449} Sencillo\u2026 pero perfectamente ejecutado.

\u2B50 Qu\xE9 pedir:

\u2022 Tiramis\xFA cl\xE1sico \u2192 imprescindible
\u2022 Tiramis\xFA de pistacho \u2192 m\xE1s cremoso y con toque salado
\u2022 Tiramis\xFA de fresa \u2192 m\xE1s ligero y refrescante

\u{1F4A1} Experiencia viajera:

Este no es un sitio para sentarse.

\u{1F449} Es para coger tu cajita y seguir descubriendo Roma.

Uno de esos momentos de viaje que se disfrutan caminando.

\u{1F4CD} D\xF3nde encontrarlo:

\u2022 Plaza de Espa\xF1a \u2192 perfecto en ruta tur\xEDstica
\u2022 Zona Pante\xF3n/Navona \u2192 ideal si est\xE1s en el centro
\u2022 Sede original (Re di Roma) \u2192 m\xE1s local

\u{1F944} Formato:

\u2022 Take-away
\u2022 Cajita individual con cuchara incluida

\u{1F449} Listo para comer en cualquier sitio.

\u{1F366} Extra:

Tambi\xE9n tienen helados muy buenos, aunque el tiramis\xFA es el protagonista absoluto.

\u2728 Consejo AvenTourArte:

C\xF3mpralo para llevar y disfr\xFAtalo caminando.

Este es uno de esos peque\xF1os momentos que hacen el viaje.`,horario:`Plaza de Espa\xF1a (Via della Croce, 82):
Todos los d\xEDas: 11:00 \u2013 21:30

Pante\xF3n/Navona (Via de' Pastini, 102):
Lun\u2013Jue y Dom: 11:00 \u2013 22:30
Vie\u2013S\xE1b: 11:00 \u2013 23:30

Sede hist\xF3rica Re di Roma (Via Albalonga, 7):
Lun\u2013Jue y Dom: 07:00 \u2013 00:00
Vie\u2013S\xE1b: 07:00 \u2013 01:30`,precio:"6\u20AC \u2013 8\u20AC por persona"},{nombre:"Ba\u2019Ghetto y Su Ghetto (Barrio Jud\xEDo)",descripcion:`En el Gueto Jud\xEDo de Roma, comer aqu\xED no es solo una cuesti\xF3n gastron\xF3mica\u2026 es entender una parte muy aut\xE9ntica y diferente de la ciudad.

El nombre de referencia es Ba\u2019Ghetto (junto a su restaurante hermano Su Ghetto), donde podr\xE1s descubrir la cocina judeo-romana, una tradici\xF3n \xFAnica con siglos de historia.

\u{1F4A1} Importante antes de ir:

Estos restaurantes siguen las normas kosher, lo que significa que se dividen en locales de carne y locales de l\xE1cteos (no se mezclan).

\u{1F37D}\uFE0F Opciones principales:

\u{1F969} Ba\u2019Ghetto (Carne)

El m\xE1s famoso y el m\xE1s tradicional.

Aqu\xED es donde tienes que venir si quieres probar la esencia del barrio.

\u2B50 Imprescindibles:
\u2022 Carciofi alla giudia \u2192 alcachofa frita, crujiente como una flor (de lo mejor de Roma)
\u2022 Carbonara kosher \u2192 versi\xF3n sin cerdo, usando carne seca de buey
\u2022 Couscous \u2192 influencia norteafricana con cordero y verduras

\u{1F95B} Ba\u2019Ghetto Milky (L\xE1cteos)

Si prefieres algo m\xE1s ligero o con queso.

Aqu\xED no sirven carne.

\u2022 Pastas con pecorino
\u2022 Pizzas artesanales
\u2022 Pescados
\u2022 Postres tradicionales

\u{1F377} Su Ghetto Kosher Restaurant

Una opci\xF3n m\xE1s tranquila e \xEDntima, tambi\xE9n centrada en la cocina tradicional.

Perfecto si buscas una experiencia m\xE1s relajada dentro del mismo barrio.

\u{1F4A1} Consejos AvenTourArte:

\u2022 Reserva si puedes, sobre todo en Ba\u2019Ghetto (Carne)
\u2022 Mejor ir entre semana o pronto para evitar esperas

\u{1F4CD} Ubicaci\xF3n:

Todos est\xE1n en Via del Portico d\u2019Ottavia, frente a los restos del antiguo P\xF3rtico.

Cenar en terraza aqu\xED, rodeado de historia, es una experiencia top.`,horario:`Ba\u2019Ghetto y Su Ghetto:
12:00 \u2013 23:00
\u26A0\uFE0F Viernes tarde cerrado | S\xE1bado abre por la noche tras el Shabat`,precio:"20\u20AC \u2013 35\u20AC por persona aprox."},{nombre:"Da Baffetto (Centro hist\xF3rico)",descripcion:`Si hablamos de pizza romana aut\xE9ntica, Da Baffetto es uno de los nombres m\xE1s legendarios de la ciudad.

Aqu\xED no hay decoraci\xF3n cuidada ni experiencia tranquila.

Hay mesas compartidas, ruido, camareros que van a mil\u2026 y pizzas que salen sin parar.

Y eso es exactamente lo que lo hace especial.

\u{1F355} Qu\xE9 lo hace diferente:

Su pizza es estilo romano puro: extremadamente fina, crujiente y ligera.

Ese tipo de masa que hace \u201Ccrack\u201D al morder.

\u2B50 Imprescindibles:

\u2022 Pizza Baffetto \u2192 tomate, mozzarella, champi\xF1ones, salchicha, alcachofas, pimientos, cebolla y huevo
\u2022 Margherita \u2192 simple, pero perfecta
\u2022 Capricciosa \u2192 otro cl\xE1sico muy completo

\u{1F4A1} Experiencia viajera:

Aqu\xED no vienes a relajarte.

Vienes a vivir una pizzer\xEDa romana de verdad.

Mesas compartidas, ritmo r\xE1pido y ese punto de caos que forma parte del encanto.

\u{1F4A1} Importante:

El servicio es muy r\xE1pido (a veces brusco), pero es parte del estilo del sitio.

\u23F3 Organizaci\xF3n clave:

\u2022 No aceptan reservas
\u2022 Las colas son habituales (30\u201345 min)

\u{1F4A1} Consejo PRO:

Ve a las 18:30 justo cuando abren por la noche.

Evitar\xE1s gran parte de la espera.

\u{1F4CD} Alternativa directa:

Baffetto 2 (a 2 minutos andando)

M\xE1s grande, menos cola y la misma pizza.

\u{1F4B8} Precio:

Muy razonable para estar en pleno centro de Roma.

\u2728 Consejo AvenTourArte:

Este no es un sitio para todos.

Pero si quieres probar una pizza romana aut\xE9ntica en un lugar con historia\u2026 merece totalmente la pena.`,horario:`Mi\xE9\u2013Lun: 12:00 \u2013 15:30 / 18:30 \u2013 00:00
Martes: cerrado`,precio:"20\u20AC \u2013 25\u20AC por persona"},{nombre:"Cantina e Cucina (Centro hist\xF3rico)",descripcion:`Si buscas un sitio acogedor, con buen trato y comida muy bien hecha en pleno centro de Roma, Cantina e Cucina es una apuesta segura.

Est\xE1 ubicado en una de las calles m\xE1s bonitas cerca de Piazza Navona, y desde que entras notas la diferencia:

Ambiente c\xE1lido, decoraci\xF3n r\xFAstica y un servicio que cuida mucho al cliente.

\u{1F377} Qu\xE9 lo hace especial:

Aqu\xED la experiencia es m\xE1s relajada y cuidada que en otros sitios del centro.

Incluso es habitual que te ofrezcan una copa de prosecco mientras esperas en la cola.

\u2B50 Imprescindibles:

\u2022 Carbonara \u2192 muy cremosa, con guanciale crujiente
\u2022 Polpette \u2192 alb\xF3ndigas caseras con salsa de tomate
\u2022 Focaccia \u2192 perfecta como entrante para compartir

Tambi\xE9n encontrar\xE1s:

\u2022 Pastas cl\xE1sicas (amatriciana, gricia\u2026)
\u2022 Pizzas y focaccias
\u2022 Tablas de embutidos

\u{1F4A1} Experiencia viajera:

Aqu\xED vienes a sentarte, disfrutar sin prisas y comer bien.

Es el contrapunto perfecto a sitios m\xE1s ca\xF3ticos como Da Baffetto.

\u23F3 Importante:

\u2022 No aceptan reservas
\u2022 Suele haber cola, especialmente por la noche

\u{1F4A1} Diferencia clave:

Aunque tengas que esperar, el trato es mucho m\xE1s amable y organizado.

\u{1F4CD} Ubicaci\xF3n:

Via del Governo Vecchio, una de las calles con m\xE1s encanto del centro, perfecta para pasear antes o despu\xE9s de comer.

\u{1F4A1} Consejo AvenTourArte:

Ideal para:

\u2022 Cena tranquila en el centro
\u2022 \xDAltima comida del viaje
\u2022 Plan m\xE1s relajado sin renunciar a buena comida

\u2728 Conclusi\xF3n:

Si quieres comer muy bien en el centro, con buen ambiente y sin el caos de otros sitios\u2026 este es tu sitio.`,horario:"Todos los d\xEDas: 11:00 \u2013 23:30 (cocina ininterrumpida)",precio:"25\u20AC \u2013 35\u20AC por persona"},{nombre:"Forno da Milvio (Monti)",descripcion:`Si buscas un bocado r\xE1pido, aut\xE9ntico y de calidad en pleno centro de Roma, este es uno de esos sitios que no fallan.

Ubicado en el barrio de Monti, entre el Coliseo y Via Nazionale, Forno da Milvio es una parada perfecta para comer bien sin perder tiempo.

Aqu\xED no vienes a sentarte\u2026 vienes a comer como un romano.

\u{1F355} Qu\xE9 lo hace especial:

Es un horno tradicional especializado en pizza al taglio (al corte) y productos de panader\xEDa.

Ves las bandejas, eliges lo que quieres, te lo cortan al peso\u2026 y listo.

\u2B50 Imprescindibles:

\u2022 Pizza al taglio \u2192 base crujiente por fuera y esponjosa por dentro
  \u2013 Patata y romero (top)
  \u2013 Margarita (cl\xE1sico que nunca falla)

\u2022 Suppl\xEC \u2192 croqueta de arroz con mozzarella fundida

\u2022 Dulces artesanales \u2192 galletas y productos t\xEDpicos para llevar

\u{1F4A1} Experiencia viajera:

Este es el t\xEDpico sitio que no parece nada especial\u2026 hasta que pruebas la comida.

R\xE1pido, barato y aut\xE9ntico.

\u{1F4A1} El plan perfecto:

Compra varios trozos de pizza + un suppl\xEC

y vete andando a la Piazza della Madonna dei Monti.

Ah\xED, en los escalones de la fuente, es donde realmente ocurre la experiencia:

Gente local, ambiente relajado y uno de los rincones m\xE1s vivos del barrio.

\u{1F4A1} Consejo AvenTourArte:

\u2022 Ideal entre visitas (no pierdes tiempo)
\u2022 Perfecto para comer sin gastar mucho
\u2022 Mejor probar varias pizzas en lugar de solo una

\u2728 Conclusi\xF3n:

No es un restaurante\u2026 es una parada.

Y de las mejores que puedes hacer en Roma.`,horario:`Todos los d\xEDas: 10:30 \u2013 21:00
Domingos: hasta 20:30`,precio:"5\u20AC \u2013 10\u20AC por persona aprox. (seg\xFAn cantidad)"},{nombre:"Osteria degli Ubertini (Pigneto)",descripcion:`Si quieres salirte completamente del circuito tur\xEDstico y descubrir la Roma m\xE1s aut\xE9ntica, este es uno de esos sitios que marcan el viaje.

Ubicada en el barrio de Pigneto, una zona alternativa y mucho menos tur\xEDstica que el centro, esta osteria es el tipo de lugar donde comen los romanos de verdad.

Aqu\xED no hay postureo.

Hay comida casera, ambiente ruidoso y mesas llenas de gente local.

\u{1F35D} Qu\xE9 lo hace especial:

Es una taberna tradicional donde el men\xFA cambia cada d\xEDa seg\xFAn lo que compran en el mercado.

No hay carta fija.

Lo que hay\u2026 es lo que se come.

\u2B50 Qu\xE9 puedes encontrar:

\u2022 Pastas romanas cl\xE1sicas \u2192 carbonara, amatriciana, gricia
\u2022 Platos de cuchara \u2192 como pasta e fagioli
\u2022 Carnes tradicionales \u2192 polpette, cordero (abbacchio), tripa a la romana

\u{1F377} Vino:

Se sirve en jarras (fogliette), sencillo pero perfecto para acompa\xF1ar la comida.

\u{1F4B8} Relaci\xF3n calidad-precio:

De las mejores de Roma.

Aqu\xED comes incre\xEDble por mucho menos que en el centro.

\u23F1\uFE0F Consejo clave:

\u2022 Reserva si puedes \u2192 siempre est\xE1 lleno de gente local
\u2022 Ideal para comida (men\xFA del d\xEDa brutal)

\u{1F37D}\uFE0F Men\xFA de mediod\xEDa:

Entre semana puedes comer un men\xFA completo (primero, segundo, guarnici\xF3n, agua y caf\xE9) por un precio muy dif\xEDcil de encontrar en Roma.

\u2728 Consejo AvenTourArte:

Este sitio no es para todos.

Pero si quieres vivir Roma m\xE1s all\xE1 del centro\u2026 es imprescindible.`,horario:`Lunes y domingo: 12:00 \u2013 15:30
Martes a s\xE1bado: 12:00 \u2013 15:30 / 20:00 \u2013 23:00`,precio:`Men\xFA mediod\xEDa: 12\u20AC \u2013 15\u20AC
Cena: 20\u20AC \u2013 25\u20AC por persona aprox.`},{nombre:"Bono Bottega Nostrana",descripcion:`Bono Bottega Nostrana es una de las mejores opciones de street food en Roma si buscas comer r\xE1pido, pero con producto de alt\xEDsima calidad.

Aqu\xED no vienes a cualquier bocadillo.

Vienes a un panino gourmet.

\u{1F96A} Qu\xE9 lo hace especial:

Trabajan con ingredientes seleccionados de distintas regiones de Italia:

\u2022 Porchetta de Ariccia
\u2022 Quesos curados con denominaci\xF3n de origen
\u2022 Embutidos italianos de alta calidad
\u2022 Trufa y productos premium

Todo servido en un pan crujiente por fuera y tierno por dentro que marca la diferencia.

\u2B50 Qu\xE9 pedir:

\u2022 Panino gourmet \u2192 la opci\xF3n estrella
\u2022 Taglieri \u2192 tablas de embutidos y quesos para compartir
\u2022 Pizza blanca rellena \u2192 muy t\xEDpica y diferente

\u{1F4A1} Experiencia viajera:

Es el t\xEDpico sitio donde comes r\xE1pido\u2026 pero comes MUY bien.

Perfecto para no perder tiempo sin renunciar a calidad.

\u26A1 Concepto:

\u2022 Comer de pie o en taburete
\u2022 Servicio r\xE1pido
\u2022 Ambiente informal pero muy cuidado

\u{1F4CD} Ubicaciones clave:

\u2022 San Pietro \u2192 ideal si est\xE1s por el Vaticano
\u2022 Piazza di Spagna \u2192 perfecto en ruta por el centro

\u23F3 Horario amplio:

El local del Vaticano abre desde muy temprano hasta la madrugada, lo que lo convierte en un salvavidas a cualquier hora.

\u{1F4A1} Consejo viajero:

Si est\xE1 lleno, p\xEDdelo para llevar y c\xF3metelo en una plaza cercana.

\u{1F449} Plan perfecto y muy romano.

\u2728 Consejo AvenTourArte:

Ideal para:

\u2022 Comida r\xE1pida entre visitas
\u2022 Plan improvisado sin perder calidad
\u2022 D\xEDas intensos donde no quieres parar mucho tiempo`,horario:"Horario amplio (especialmente sede Vaticano: desde ma\xF1ana hasta madrugada)",precio:"12\u20AC \u2013 18\u20AC por persona"},{nombre:"La Base",descripcion:`La Base es uno de esos lugares que no parecen imprescindibles\u2026 hasta que lo necesitas.

Y entonces se convierte en oro.

Ubicado en el barrio de Monti, muy cerca del Coliseo, es uno de los pocos restaurantes del centro de Roma donde puedes comer bien pr\xE1cticamente a cualquier hora del d\xEDa (o de la noche).

\u{1F552} Lo que lo hace \xFAnico:

Su horario.

\u{1F449} Abierto todos los d\xEDas hasta las 04:00 AM.

S\xED, puedes estar viendo el Coliseo de noche o salir de tomar algo\u2026 y acabar cenando una buena pasta a las 2 o 3 de la ma\xF1ana.

\u{1F35D} Qu\xE9 comer:

\u2022 Pastas cl\xE1sicas \u2192 carbonara, amatriciana, lasa\xF1a
\u2022 Calzones \u2192 uno de sus puntos fuertes, grandes y muy contundentes
\u2022 Pizzas \u2192 estilo romano, finas y crujientes
\u2022 Hamburguesas \u2192 opci\xF3n alternativa si quieres variar

\u{1F4A1} Experiencia viajera:

No es un restaurante \u201Crom\xE1ntico\u201D ni gourmet.

Es un sitio pr\xE1ctico, animado y muy \xFAtil.

El t\xEDpico lugar donde terminas un d\xEDa largo\u2026 o alargas la noche.

\u{1F3A7} Ambiente:

\u2022 Decoraci\xF3n ecl\xE9ctica con luces de ne\xF3n y objetos retro
\u2022 Ambiente joven, ruidoso y desenfadado
\u2022 Servicio r\xE1pido y sin complicaciones

\u{1F465} Ideal para:

\u2022 Grupos de amigos
\u2022 Cenas tard\xEDas
\u2022 Planes improvisados

\u{1F4CD} Ubicaci\xF3n:

En Via Cavour, una de las arterias que conecta directamente con los Foros y el Coliseo.

Muy f\xE1cil de encajar en cualquier momento del viaje.

\u2728 Consejo AvenTourArte:

Este es tu \u201Cplan B\u201D perfecto en Roma.

Cuando todo est\xE1 cerrado\u2026 aqu\xED siempre puedes contar con una buena cena.`,horario:"Todos los d\xEDas: 11:00 \u2013 04:00",precio:"22\u20AC \u2013 30\u20AC por persona"},{nombre:"La Fraschetta der Panino",descripcion:`La Fraschetta der Panino es uno de esos sitios que representan la esencia m\xE1s sencilla y aut\xE9ntica de Roma.

Ubicado en el barrio de Monti, muy cerca del Coliseo, es el lugar perfecto para comer r\xE1pido, barato y con producto local de verdad.

\u{1F3E1} El concepto:

Est\xE1 inspirado en las antiguas \u201Cfraschette\u201D, tabernas t\xEDpicas de los Castelli Romani donde se serv\xEDa vino y comida sencilla.

Aqu\xED todo gira en torno al producto.

Sin complicaciones.

\u{1F96A} Qu\xE9 comer:

\u2022 Panino con porchetta \u2B50 \u2192 su gran especialidad
\u2022 Embutidos y quesos locales \u2192 producto del Lazio
\u2022 Lasa\xF1a o pasta del d\xEDa \u2192 opci\xF3n caliente y econ\xF3mica
\u2022 Taglieri \u2192 tablas para compartir

\u{1F525} La estrella:

La porchetta.

Cerdo asado lentamente con hierbas, jugoso por dentro y crujiente por fuera, servido en pan r\xFAstico.

\u{1F449} Simple\u2026 y brutal.

\u{1F377} Acompa\xF1amiento t\xEDpico:

Vino de los Castelli Romani, servido de forma sencilla, como manda la tradici\xF3n.

\u{1F4A1} Experiencia viajera:

Este es el t\xEDpico sitio donde comes como un local:

\u2022 R\xE1pido
\u2022 Barato
\u2022 Sin postureo

Pero con mucho sabor.

\u{1F4CD} Ubicaci\xF3n:

En Via Cavour, muy cerca del Coliseo y en la misma zona que La Base.

Perfecto para encajarlo entre visitas.

\u{1F45F} Plan t\xEDpico:

Pides tu panino \u2192 te lo llevas \u2192 y te lo comes caminando o en alguna plaza cercana.

\u2728 Consejo AvenTourArte:

Si quieres probar la Roma m\xE1s aut\xE9ntica sin gastar casi nada\u2026 este es tu sitio.`,horario:"Todos los d\xEDas: 08:30 \u2013 23:30",precio:"10\u20AC \u2013 15\u20AC por persona"},{nombre:"Pinsere",descripcion:`Pinsere es una parada obligatoria en Roma si quieres probar la aut\xE9ntica pinsa romana, una variante de la pizza tradicional mucho m\xE1s ligera, crujiente y digestiva.

Aqu\xED no vienes solo a comer\u2026 vienes a probar algo diferente.

\u{1F355} \xBFQu\xE9 es la pinsa?

A diferencia de la pizza:

\u2022 Forma ovalada
\u2022 Masa m\xE1s aireada y ligera
\u2022 Mezcla de harinas (trigo, arroz y soja)
\u2022 Fermentaci\xF3n larga \u2192 m\xE1s digestiva

\u{1F449} Resultado: crujiente por fuera, esponjosa por dentro y mucho m\xE1s ligera.

\u{1F947} Qu\xE9 lo hace especial:

La calidad de la masa.

Es el motivo por el que este sitio se ha hecho tan famoso entre locales y viajeros.

\u{1F374} Qu\xE9 pedir:

\u2022 Pinsas cl\xE1sicas \u2192 margherita, b\xE1sicas pero muy bien ejecutadas
\u2022 Pinsas gourmet \u2192 con trufa, quesos, flores de calabac\xEDn o embutidos

\u{1F4A1} Consejo PRO:

Si vas con alguien, pide dos distintas y comparte.

\u{1F449} Es la mejor forma de probar m\xE1s sabores.

\u{1F4A1} Experiencia viajera:

Este es un sitio de street food aut\xE9ntico:

\u2022 Comes de pie o en mesas altas
\u2022 Servicio r\xE1pido
\u2022 Ambiente din\xE1mico (muy de trabajadores locales)

\u{1F4CD} Ubicaci\xF3n:

Cerca de Termini y la zona de Via Veneto.

Perfecto si est\xE1s en esa zona o como comida r\xE1pida entre visitas.

\u23F3 Importante:

\u2022 Solo abre entre semana
\u2022 Hora punta fuerte (13:00 \u2013 14:00)

\u2728 Consejo AvenTourArte:

Si quieres probar algo diferente a la pizza cl\xE1sica\u2026 este sitio es un acierto seguro.`,horario:"Lunes a viernes: 10:00 \u2013 21:00 (cerrado s\xE1bados y domingos)",precio:"10\u20AC \u2013 12\u20AC por persona"},{nombre:"Momart Caf\xE9",descripcion:`Momart Caf\xE9 es uno de los sitios m\xE1s conocidos de Roma para vivir el aut\xE9ntico \u201Capericena\u201D, una de las experiencias sociales m\xE1s t\xEDpicas de la ciudad.

Aqu\xED no vienes solo a cenar.

Vienes a empezar la noche.

\u{1F378} \xBFQu\xE9 es el apericena?

Un concepto muy italiano:

\u2022 Pides una bebida
\u2022 Y tienes acceso a un buffet muy completo

\u{1F449} Tan abundante que puede sustituir perfectamente a una cena.

\u{1F525} Qu\xE9 lo hace especial:

Su buffet.

Mucho m\xE1s cuidado que la media:

\u2022 Pizzas reci\xE9n hechas en horno de le\xF1a
\u2022 Pastas
\u2022 Platos calientes
\u2022 Ensaladas
\u2022 Postres

\u{1F449} Calidad alta para ser formato buffet.

\u{1F379} Bebidas:

\u2022 C\xF3cteles bien preparados
\u2022 Spritz, vinos y combinados

\u{1F4A1} Experiencia viajera:

Este sitio representa la Roma moderna:

\u2022 Ambiente joven y animado
\u2022 M\xFAsica, movimiento y gente local
\u2022 Perfecto para socializar

\u{1F306} Cu\xE1ndo ir:

El apericena suele empezar sobre las 18:30.

\u{1F449} Es el momento clave.

\u{1F465} Ideal para:

\u2022 Plan con amigos
\u2022 Empezar la noche
\u2022 Cenas informales con ambiente

\u{1F4CD} Ubicaci\xF3n:

Zona Nomentana / Piazza Bologna, fuera del centro tur\xEDstico.

\u{1F449} M\xE1s local, menos tur\xEDstico.

\u2728 Consejo AvenTourArte:

Si quieres vivir Roma como un local joven\u2026

este plan es imprescindible al menos una noche.`,horario:"Todos los d\xEDas: 12:00 \u2013 02:00 (viernes y s\xE1bado hasta 03:00)",precio:"20\u20AC \u2013 25\u20AC por persona (apericena con bebida)"},{nombre:"Gelateria Giolitti",descripcion:`Giolitti es la helader\xEDa m\xE1s antigua y famosa de Roma, fundada en 1890.

No es solo un sitio para comer helado.

Es parte de la historia de la ciudad.

\u{1F3DB}\uFE0F El lugar:

\u2022 Decoraci\xF3n cl\xE1sica y elegante
\u2022 Camareros con uniforme tradicional
\u2022 Ambiente ca\xF3tico pero aut\xE9ntico

\u{1F449} Aqu\xED se mezcla tradici\xF3n + ritmo romano real.

\u{1F366} Qu\xE9 lo hace especial:

La calidad del gelato.

Textura cremosa, sabores intensos y una elaboraci\xF3n muy cuidada.

\u2B50 Sabores imprescindibles:

\u2022 Pistacho \u2192 uno de los mejores de Roma
\u2022 Riso \u2192 sabor tipo arroz con leche, muy original
\u2022 Sabores de fruta \u2192 muy frescos y naturales

\u{1F525} Detalle clave:

La \u201Cpanna\u201D (nata montada).

\u{1F449} Cremosa, casera y gratuita o con suplemento m\xEDnimo.

\u{1F4A1} C\xF3mo pedir (muy importante):

1. Pagas primero en caja (Cassa)
2. Te dan un ticket
3. Vas al mostrador
4. Pides sabores

\u{1F449} Si no lo sabes, te l\xEDas seguro \u{1F605}

\u{1F4A1} Experiencia viajera:

Aqu\xED tienes dos formas de vivirlo:

\u2022 Take-away \u2192 r\xE1pido, barato y perfecto para seguir la ruta
\u2022 Sentado \u2192 m\xE1s caro, pero experiencia elegante

\u{1F4CD} Ubicaci\xF3n:

Muy cerca del Pante\xF3n, en pleno centro hist\xF3rico.

\u{1F449} Ideal para encajar en cualquier momento del d\xEDa.

\u{1F370} Extra:

Tambi\xE9n tienen pasteler\xEDa tradicional italiana muy buena.

\u2728 Consejo AvenTourArte:

P\xEDdelo para llevar y disfr\xFAtalo caminando.

Es uno de esos peque\xF1os placeres que hacen Roma especial.`,horario:"Todos los d\xEDas: 07:30 \u2013 00:00",precio:"4\u20AC \u2013 6\u20AC por persona"}]},{titulo:"Consejos pr\xE1cticos",contenido:`Roma se disfruta much\xEDsimo caminando, pero precisamente por eso conviene organizar cada d\xEDa por zonas y no intentar abarcar demasiado de golpe. La ciudad est\xE1 llena de historia, detalles y paradas que apetece improvisar, as\xED que dejar algo de margen en la ruta tambi\xE9n forma parte de disfrutarla.

Algunas visitas clave como los Museos Vaticanos, la Galleria Borghese o el Coliseo suelen requerir reserva previa o tienen mucha afluencia, por lo que planificar con antelaci\xF3n te ahorrar\xE1 colas, tiempo y bastante energ\xEDa.

Tambi\xE9n merece mucho la pena alternar monumentos, paseos y paradas gastron\xF3micas. Roma no se disfruta solo viendo cosas: tambi\xE9n se vive sent\xE1ndote en una plaza, comiendo algo al paso, parando a por un helado o dej\xE1ndote sorprender por una iglesia, una calle o un rinc\xF3n inesperado.

\u{1F4A1} Consejo AvenTourArte:
No intentes correr Roma. Es una ciudad para saborearla.`}]};var wE={path:"europa/rumania/bucarest",nombre:"Bucarest",flag:"cld:europa/rumania/bucarest/bucarest-flag",background:"cld:europa/rumania/rumania-flag",bgPos:"50% 65%",bgPosMobile:"50% 65%",bgDim:.1,flagOpacity:.12,flagOpacityMobile:.18,flagSize:"75%",flagSizeMobile:"50%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`Bucarest es una ciudad de contrastes que sorprende mucho m\xE1s de lo que esperas. A primera vista puede parecer ca\xF3tica, pero en cuanto empiezas a recorrerla descubres una mezcla muy potente de historia, arquitectura y vida local.

Aqu\xED conviven palacios gigantescos del comunismo con iglesias ortodoxas escondidas, edificios de inspiraci\xF3n francesa con barrios m\xE1s decadentes, y mercados tradicionales con zonas modernas llenas de ambiente.

Conocida como la \u201CPeque\xF1a Par\xEDs del Este\u201D por su pasado elegante, Bucarest tambi\xE9n muestra una cara m\xE1s cruda marcada por la \xE9poca de Ceau\u0219escu, lo que le da una personalidad \xFAnica.

Es una ciudad que no siempre entra por los ojos a la primera\u2026 pero cuanto m\xE1s la entiendes, m\xE1s te gusta.

Adem\xE1s, es un destino perfecto para combinar cultura, gastronom\xEDa muy potente, vida nocturna y excursiones espectaculares a Transilvania.`,infoGeneral:{idioma:"Rumano",moneda:"Leu rumano (RON) \u2014 1 \u20AC \u2248 5 RON",hora:"UTC +2 (+1h respecto a Espa\xF1a)",internet:"Roaming UE disponible",electricidad:"230V \u2013 Enchufe tipo C y F",pasaporte:"DNI o pasaporte v\xE1lido",visado:"No necesario para ciudadanos UE",vacunas:"No obligatorias"},secciones:[{titulo:"Historia",contenido:`La historia de Bucarest es una mezcla de esplendor, destrucci\xF3n y transformaci\xF3n constante.

Sus or\xEDgenes se remontan al siglo XV, cuando Vlad \u021Aepe\u0219 estableci\xF3 aqu\xED una de sus cortes. Durante siglos, la ciudad estuvo influenciada por el Imperio Otomano, lo que marc\xF3 su desarrollo inicial.

En el siglo XIX, Bucarest vivi\xF3 su \xE9poca dorada. Se moderniz\xF3 r\xE1pidamente, adopt\xF3 arquitectura francesa y se convirti\xF3 en una ciudad elegante y culturalmente muy activa, gan\xE1ndose el apodo de la \u201CPeque\xF1a Par\xEDs\u201D.

Pero todo cambi\xF3 en el siglo XX con la llegada del r\xE9gimen comunista.

Bajo Nicolae Ceau\u0219escu, la ciudad sufri\xF3 una transformaci\xF3n brutal: barrios hist\xF3ricos enteros fueron demolidos para construir avenidas gigantes y edificios monumentales como el Palacio del Parlamento, uno de los s\xEDmbolos m\xE1s extremos del poder comunista.

En 1989, Bucarest fue el epicentro de la revoluci\xF3n que puso fin a la dictadura. Lugares como la Plaza de la Revoluci\xF3n siguen siendo testigos de ese momento hist\xF3rico.

Hoy, Bucarest es una ciudad en reconstrucci\xF3n constante, donde conviven todas estas etapas. Y precisamente esa mezcla es lo que la hace tan interesante.`},{titulo:"Geograf\xEDa y Clima",contenido:`Bucarest se encuentra en el sureste de Ruman\xEDa, en una zona llana atravesada por el r\xEDo D\xE2mbovi\u021Ba.

A diferencia de otras capitales europeas, no es una ciudad especialmente compacta, por lo que combina zonas muy caminables \u2014como el centro hist\xF3rico\u2014 con otras m\xE1s amplias donde conviene usar transporte.

El clima es continental:

\u2022 Veranos: calurosos (puede superar f\xE1cilmente los 30 \xB0C)
\u2022 Invierno: fr\xEDo, con temperaturas cercanas a 0 \xB0C o bajo cero
\u2022 Primavera y oto\xF1o: las mejores \xE9pocas para viajar, con temperaturas suaves y ambiente muy agradable

\u{1F4A1} Consejo viajero:
Organiza bien los d\xEDas por zonas para evitar desplazamientos innecesarios. Bucarest se disfruta mucho m\xE1s cuando agrupas visitas.

\u{1F4A1} Extra:
Muchas de las mejores experiencias \u2014mercados, parques, terrazas y barrios menos tur\xEDsticos\u2014 est\xE1n fuera del circuito m\xE1s evidente.`},{titulo:"Qu\xE9 visitar en Bucarest",itinerario:[{dia:"D\xEDa 1 \u2013 Bucarest monumental",zonas:[{nombre:"Free tour por Bucarest",descripcion:`La mejor forma de empezar Bucarest es entendiendo su contexto. Un free tour te ayuda a leer la ciudad desde el primer momento: su pasado elegante, la brutalidad del urbanismo comunista, la revoluci\xF3n de 1989 y la mezcla de estilos que la hace tan particular.

\u{1F4A1} Experiencia viajera:
Bucarest gana much\xEDsimo cuando alguien te ayuda a interpretarla. No es una ciudad de impacto inmediato, es una ciudad que se abre poco a poco.

\u2728 Consejo AvenTourArte:
Si puedes, res\xE9rvalo a primera hora. Te dejar\xE1 el resto del d\xEDa mucho mejor conectado.`,horario:"Seg\xFAn reserva",precio:"Aportaci\xF3n voluntaria"},{nombre:"Palacio del Parlamento de Bucarest",descripcion:`Despu\xE9s de situarte con el free tour, llega el gran impacto del d\xEDa: el Palacio del Parlamento.

No es solo un edificio. Es una declaraci\xF3n de poder.

Es uno de los edificios m\xE1s impresionantes del mundo y el m\xE1s pesado jam\xE1s construido, levantado durante la \xE9poca de Nicolae Ceau\u0219escu como s\xEDmbolo absoluto del r\xE9gimen comunista.

Nada te prepara del todo para su escala. Es desproporcionado, abrumador y casi irreal. Por fuera ya impresiona, pero su interior remata la experiencia con salas gigantescas, m\xE1rmol por todas partes, l\xE1mparas colosales, alfombras enormes y una decoraci\xF3n tan excesiva como cargada de significado pol\xEDtico.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
Para construirlo se demolieron barrios enteros del Bucarest antiguo. Lo que ves no es solo arquitectura\u2026 tambi\xE9n es historia borrada.

\u{1F4A1} Experiencia viajera:
Este es el momento en el que empiezas a entender de verdad la relaci\xF3n de la ciudad con su pasado reciente.

\u26A0\uFE0F Importante:
Solo se puede visitar mediante tour guiado oficial.

\u{1F4A1} Consejo viajero:
Reserva con al menos 24 h de antelaci\xF3n, ya que el acceso es limitado y puede haber cambios por eventos oficiales.

\u2728 Consejo AvenTourArte:
Intenta ir a primera hora. Menos grupos, mejor ritmo y una experiencia mucho m\xE1s disfrutable.`,foto:"cld:europa/rumania/bucarest/palacio-parlamento",acceso:"DNI o pasaporte obligatorio. Control de seguridad tipo aeropuerto",horario:"Mar\u2013Oct: 09:00\u201317:00 | Nov\u2013Feb: 10:00\u201316:00",precio:`\u2248 12\u20AC adultos | Estudiantes: 6\u20AC | Ni\xF1os: 4\u20AC | Menores de 7: gratis
Terraza: +3\u20134\u20AC aprox.`},{nombre:"Parque Izvor",descripcion:`Tras la monumentalidad extrema del Parlamento, el recorrido se relaja en el Parque Izvor.

Este gran espacio abierto permite ver el edificio desde otra perspectiva y sirve para bajar un poco el ritmo despu\xE9s de una visita tan intensa.

\u{1F33F} Experiencia viajera:
Aqu\xED entiendes mejor la escala del Parlamento. Desde la distancia, el edificio sigue domin\xE1ndolo todo.

\u2728 Consejo AvenTourArte:
Es una buena parada para sentarte un rato, hacer fotos y asimilar lo que acabas de ver.`,foto:"cld:europa/rumania/bucarest/parque-izvor",horario:"Acceso libre",precio:"Gratis"},{nombre:"Palacio del Patriarcado",descripcion:`Desde la zona del Parlamento, el recorrido contin\xFAa hacia otro de los grandes centros de poder de la ciudad, esta vez ligado a la Iglesia Ortodoxa Rumana.

El Palacio del Patriarcado, de estilo neocl\xE1sico, forma parte del conjunto institucional y religioso m\xE1s importante del pa\xEDs. Aunque no es una visita tan espectacular como otras del d\xEDa, ayuda a entender el peso hist\xF3rico y pol\xEDtico de la Iglesia en Ruman\xEDa.

\u{1F4A1} Importante:
El acceso puede estar limitado o restringido seg\xFAn actos oficiales o conferencias.

\u2728 Consejo AvenTourArte:
M\xE1s que una visita imprescindible por s\xED sola, funciona muy bien como parte del conjunto con la catedral y la colina patriarcal.`,foto:"cld:europa/rumania/bucarest/palacio-patriarcal",horario:"Lun\u2013Vie: 09:00\u201316:00 | S\xE1b\u2013Dom: cerrado",precio:"Generalmente gratis (acceso limitado)"},{nombre:"Catedral Patriarcal de Bucarest",descripcion:`A pocos pasos del palacio se encuentra la Catedral Patriarcal, uno de los lugares religiosos m\xE1s importantes de Ruman\xEDa.

Situada en una colina con vistas a la ciudad, destaca por su arquitectura tradicional ortodoxa y por una atm\xF3sfera mucho m\xE1s espiritual que monumental.

\u26EA Experiencia viajera:
Aqu\xED el ambiente cambia por completo. Despu\xE9s de la grandiosidad pol\xEDtica del Parlamento, Bucarest se vuelve m\xE1s \xEDntima, m\xE1s simb\xF3lica y m\xE1s ligada a la vida cotidiana local.

\u{1F455} Vestimenta:
Al ser un recinto religioso activo, conviene vestir con respeto: hombros cubiertos y evitar ropa demasiado corta.

\u{1F4A1} Consejo viajero:
Si quieres visitarla con calma, evita las horas de liturgia. Es cuando m\xE1s se llena y m\xE1s deja de sentirse como visita.`,foto:"cld:europa/rumania/bucarest/catedral-patriarcal",horario:"Todos los d\xEDas: 07:00\u201320:00",precio:"Gratis"},{nombre:"Parque Ci\u0219migiu",descripcion:`Despu\xE9s de la parte m\xE1s institucional y religiosa del d\xEDa, Bucarest regala un respiro en el Parque Ci\u0219migiu, el m\xE1s antiguo y emblem\xE1tico del centro.

Es uno de esos lugares donde la ciudad se vuelve m\xE1s amable: senderos, lago, \xE1rboles y una atm\xF3sfera tranquila que contrasta con el peso monumental de las visitas anteriores.

\u{1F33F} Experiencia viajera:
Perfecto para pasear, descansar un poco o simplemente dejar que Bucarest baje revoluciones.

\u2728 Consejo AvenTourArte:
Si llevas el d\xEDa cargado, esta es una de las mejores paradas para recuperar energ\xEDa sin salir de ruta.`,foto:"cld:europa/rumania/bucarest/parque-cismigiu",horario:"Acceso libre",precio:"Gratis"},{nombre:"Catedral de la Salvaci\xF3n del Pueblo (Catedral Nacional)",descripcion:`El recorrido regresa ahora a una escala monumental, pero desde una Ruman\xEDa mucho m\xE1s reciente. La Catedral de la Salvaci\xF3n del Pueblo, situada justo detr\xE1s del Parlamento, es la iglesia ortodoxa m\xE1s grande y alta del mundo.

Es uno de los proyectos m\xE1s ambiciosos de la Bucarest moderna y un s\xEDmbolo muy potente del papel de la fe ortodoxa en el pa\xEDs.

\u{1F3DB}\uFE0F Qu\xE9 la hace especial:
Aunque fue consagrada en 2018, su interior sigue en proceso de finalizaci\xF3n, lo que permite ver de cerca los enormes mosaicos en desarrollo y entender que es un proyecto todav\xEDa vivo.

\u{1F4A1} Destaca:
Alberga la campana balanceante m\xE1s grande del mundo, con 25 toneladas.

\u26A0\uFE0F Importante:
Algunas zonas pueden no ser accesibles o tener restricciones por obras.

\u{1F455} Vestimenta:
Es obligatorio vestir con respeto: hombros y rodillas cubiertos.

\u{1F4F8} Fotos:
El exterior se puede fotografiar sin problema, pero en el interior puede haber restricciones.

\u2728 Consejo AvenTourArte:
Es un lugar muy impactante por dimensiones, pero tambi\xE9n por lo que representa: la Ruman\xEDa actual dialogando con su pasado reciente.`,foto:"cld:europa/rumania/bucarest/catedral-nacional",horario:"General: 08:00\u201318:00 | Domingos (liturgia): 09:00\u201312:00",precio:"Gratis"},{nombre:"Palacio Cotroceni (Museo Nacional Cotroceni)",descripcion:`Si todav\xEDa quieres seguir con la parte m\xE1s monumental e hist\xF3rica de Bucarest, el Palacio Cotroceni es una visita muy recomendable.

Antigua residencia real y actual sede de la Presidencia de Ruman\xEDa, combina historia, arquitectura elegante y contexto pol\xEDtico en uno de los espacios m\xE1s interesantes de la ciudad.

La visita se realiza exclusivamente mediante tour guiado por sus salones hist\xF3ricos, decorados con mobiliario original y piezas de gran valor art\xEDstico.

\u{1F3DB}\uFE0F Experiencia viajera:
Aqu\xED Bucarest cambia otra vez de registro. Del peso del comunismo pasas a una elegancia m\xE1s cl\xE1sica, vinculada a la monarqu\xEDa y a la construcci\xF3n institucional del pa\xEDs.

\u26A0\uFE0F Importante:
Es obligatorio reservar con al menos 24 h de antelaci\xF3n.

\u{1F4A1} Consejo viajero:
Comprueba horarios al reservar, porque puede haber restricciones o cierres parciales por actos oficiales.

\u{1F4CD} Acceso:
La entrada para visitantes se realiza por la \u0218oseaua Cotroceni, frente al Jard\xEDn Bot\xE1nico.`,foto:"cld:europa/rumania/bucarest/palacio-cotroceni",acceso:"Es imprescindible presentar DNI o pasaporte original f\xEDsico (no valen copias ni fotos), ya que se pasa un control de seguridad.",horario:`Mar\u2013Dom: 09:00\u201317:00 (\xFAltima visita ~15:30\u201316:00) | Lun: cerrado
Mi\xE9rcoles: posible horario reducido | Jueves: consultar disponibilidad`,precio:`\u2248 12\u20AC adultos | Estudiantes: 6\u20AC | Ni\xF1os: 4\u20AC
(Fotograf\xEDa profesional con suplemento)`},{nombre:"Fuentes de la Plaza de la Uni\xF3n (F\xE2nt\xE2nile Pia\u021Ba Unirii)",descripcion:`Uno de los espect\xE1culos m\xE1s impresionantes de Bucarest. Estas fuentes forman un sistema coreografiado que atraviesa el centro de la ciudad a lo largo de m\xE1s de 1,4 km.

Tras su renovaci\xF3n, fueron reconocidas en 2019 por la World Record Academy como el sistema de fuentes coreografiadas m\xE1s largo del mundo.

Durante los meses de mayo a octubre se celebra el espect\xE1culo \u201CSimfonia Apei\u201D (Sinfon\xEDa del Agua), donde chorros de agua bailan al ritmo de m\xFAsica cl\xE1sica y moderna, acompa\xF1ados de luces LED y efectos visuales.

Es un plan perfecto para terminar el d\xEDa, con un ambiente animado y muy visual en pleno centro de la ciudad.

\u{1F4A1} Consejo: llega con algo de antelaci\xF3n para coger buen sitio, especialmente en verano. El espect\xE1culo comienza al anochecer y el horario cambia seg\xFAn la \xE9poca del a\xF1o.`,foto:"cld:europa/rumania/bucarest/fuentes-unirii",horario:"Vie\u2013Dom al anochecer (horario variable seg\xFAn puesta de sol) | Duraci\xF3n: ~45 min",precio:"Gratis"}]},{dia:"D\xEDa 2 \u2013 Centro hist\xF3rico y cultura en Bucarest",zonas:[{nombre:"Ateneo Rumano",descripcion:`El segundo d\xEDa comienza con una de las im\xE1genes m\xE1s elegantes y reconocibles de Bucarest: el Ateneo Rumano.

Este edificio neocl\xE1sico de finales del siglo XIX es uno de los grandes s\xEDmbolos culturales del pa\xEDs y sede de la Filarm\xF3nica George Enescu.

Su fachada ya impresiona, pero el verdadero impacto llega dentro: una sala circular espectacular y un gran fresco que recorre la historia de Ruman\xEDa.

\u{1F3BC} Experiencia viajera:
Aqu\xED Bucarest ense\xF1a su cara m\xE1s refinada, la que justifica ese apodo de \u201CPeque\xF1a Par\xEDs del Este\u201D.

\u2728 Consejo AvenTourArte:
Si no puedes entrar, al menos ac\xE9rcate a verlo por fuera con calma. Es uno de los edificios que mejor resumen la parte elegante de la ciudad.`,foto:"cld:europa/rumania/bucarest/ateneo-rumano",horario:"Mar\u2013Vie: 14:00\u201316:00 (si no hay eventos) | Fines de semana por la ma\xF1ana",precio:"Entrada \u2248 6,50\u20AC (sin concierto)"},{nombre:"Biblioteca Central Universitaria",descripcion:`Frente al Ateneo y al Palacio Real aparece otro de los edificios clave del conjunto monumental del centro: la Biblioteca Central Universitaria.

Su elegante fachada forma parte de uno de los espacios urbanos m\xE1s importantes de Bucarest y recuerda tambi\xE9n el peso intelectual y acad\xE9mico de la ciudad.

Adem\xE1s, este edificio qued\xF3 da\xF1ado durante la Revoluci\xF3n de 1989, por lo que tambi\xE9n conecta con la historia reciente del pa\xEDs.

\u{1F4A1} Experiencia viajera:
M\xE1s que una visita aislada, funciona como una pieza dentro del gran escenario cultural e hist\xF3rico de esta zona.`,foto:"cld:europa/rumania/bucarest/biblioteca-central",horario:"Lunes-Jueves: 10:00 \u2013 15:00 | Viernes: 10:00 \u2013 12:00",precio:"Entrada \u2248 2\u20AC - 3\u20AC"},{nombre:"Palacio Real y Museo Nacional de Arte",descripcion:`Desde aqu\xED, el recorrido contin\xFAa hacia el antiguo Palacio Real, hoy convertido en el Museo Nacional de Arte de Ruman\xEDa.

Es una visita muy interesante para entender la evoluci\xF3n art\xEDstica y pol\xEDtica del pa\xEDs, desde la etapa mon\xE1rquica hasta la actualidad.

En su interior encontrar\xE1s colecciones de arte europeo y rumano, con piezas medievales, modernas y contempor\xE1neas.

\u{1F3DB}\uFE0F Experiencia viajera:
Este punto funciona muy bien como transici\xF3n entre la Bucarest elegante del siglo XIX y la historia convulsa del siglo XX.

\u2728 Consejo AvenTourArte:
Aunque no entres, merece la pena detenerse unos minutos en la plaza y observar todo el conjunto monumental.`,foto:"cld:europa/rumania/bucarest/palacio-real",horario:"Mi\xE9\u2013Vie: 10:00\u201318:00 | S\xE1b\u2013Dom: 11:00\u201319:00 | Lun\u2013Mar: cerrado",precio:"\u2248 6,50\u20AC adultos | Gratis el primer mi\xE9rcoles de cada mes"},{nombre:"Plaza de la Revoluci\xF3n (Pia\u021Ba Revolu\u021Biei)",descripcion:`Justo aqu\xED, donde hoy parece reinar la calma monumental, tuvo lugar uno de los momentos m\xE1s decisivos de la historia reciente del pa\xEDs.

La Plaza de la Revoluci\xF3n fue escenario de las protestas que acabaron con la dictadura de Nicolae Ceau\u0219escu en 1989.

Aqu\xED puedes ver el antiguo edificio del Comit\xE9 Central, desde donde dio su \xFAltimo discurso antes de huir.

\u{1F4A1} Experiencia viajera:
Es uno de esos lugares donde Bucarest deja de ser solo arquitectura y se convierte en memoria viva.

\u2728 Consejo AvenTourArte:
Si vienes despu\xE9s de haber le\xEDdo un poco sobre la revoluci\xF3n, la plaza gana much\xEDsimo.`,foto:"cld:europa/rumania/bucarest/plaza-revolucion"},{nombre:"Pasajul Victoria",descripcion:`Despu\xE9s de tanto peso hist\xF3rico, el recorrido entra en una Bucarest m\xE1s ligera, m\xE1s creativa y m\xE1s fotog\xE9nica.

Pasajul Victoria es un peque\xF1o pasaje urbano decorado con paraguas de colores suspendidos en el aire, uno de esos rincones que rompen el tono del d\xEDa y muestran el lado m\xE1s moderno y visual de la ciudad.

\u{1F4F8} Experiencia viajera:
No es una visita monumental, pero s\xED uno de esos puntos que aportan aire al recorrido y dan variedad a la ruta.

\u2728 Consejo AvenTourArte:
Ideal para una parada breve, fotos y seguir caminando sin romper el ritmo del centro.`,foto:"cld:europa/rumania/bucarest/pasajul-victoria"},{nombre:"Banco Nacional de Rumania",descripcion:`El recorrido se adentra ahora en el coraz\xF3n m\xE1s cl\xE1sico del centro hist\xF3rico, donde aparece la sede del Banco Nacional de Ruman\xEDa.

Su edificio neocl\xE1sico refleja perfectamente la ambici\xF3n de modernidad y estabilidad que vivi\xF3 el pa\xEDs en los siglos XIX y XX.

Aunque se puede visitar mediante tour guiado en algunas ocasiones, incluso visto desde fuera ya merece la pena por su arquitectura y por el papel simb\xF3lico que ocupa en la ciudad.

\u{1F4A1} Experiencia viajera:
Es uno de esos edificios que ayudan a entender la Bucarest burguesa y elegante.`,foto:"cld:europa/rumania/bucarest/banco-nacional"},{nombre:"Pasaje Macca-Vilacrosse",descripcion:`Muy cerca aparece uno de los rincones con m\xE1s encanto del centro: el Pasaje Macca-Vilacrosse.

Este pasaje cubierto del siglo XIX, con su caracter\xEDstica cubierta de cristal amarillenta, mezcla historia, pausa y ambiente.

Originalmente fue una galer\xEDa comercial y hoy alberga cafeter\xEDas y bares, siendo un lugar perfecto para hacer una peque\xF1a parada en ruta en cafeter\xEDas como Bemolle Caf\xE9.

\u2615 Experiencia viajera:
Es uno de esos lugares donde Bucarest se siente m\xE1s \xEDntima, m\xE1s europea y m\xE1s elegante.

\u2728 Consejo AvenTourArte:
Si el d\xEDa va cargado, este es un sitio perfecto para sentarte un rato y disfrutar del ambiente.`,foto:"cld:europa/rumania/bucarest/macca-vilacrosse"},{nombre:"Palacio CEC",descripcion:`A pocos pasos encontrar\xE1s uno de los edificios m\xE1s elegantes y fotog\xE9nicos de Bucarest: el Palacio CEC.

Construido a finales del siglo XIX, destaca por su impresionante c\xFApula de vidrio y metal, inspirada en la arquitectura francesa de la \xE9poca.

Aunque no se puede visitar por dentro al seguir funcionando como banco, su exterior es uno de los grandes iconos visuales del centro.

\u{1F4F8} Experiencia viajera:
Es una parada imprescindible para fotos y uno de esos edificios que refuerzan de verdad la sensaci\xF3n de estar en una ciudad con alma parisina.`,foto:"cld:europa/rumania/bucarest/palacio-cec",horario:"Exterior visitable todo el d\xEDa"},{nombre:"Museo de Historia Nacional de Ruman\xEDa",descripcion:`Justo enfrente del Palacio CEC, el Museo de Historia Nacional de Ruman\xEDa te permite completar toda la parte hist\xF3rica del centro con una visi\xF3n mucho m\xE1s amplia del pa\xEDs.

Recorre la historia rumana desde la antig\xFCedad hasta la \xE9poca moderna y destaca especialmente por el Tesoro Nacional y por la reproducci\xF3n a tama\xF1o real de la base de la Columna de Trajano.

\u{1F3DB}\uFE0F Experiencia viajera:
Si te interesa de verdad entender el pa\xEDs m\xE1s all\xE1 de Bucarest, esta es una visita muy recomendable.

\u2728 Consejo AvenTourArte:
Encaja especialmente bien si el tiempo acompa\xF1a mal o si quieres meter una visita de museo con contenido potente.`,foto:"cld:europa/rumania/bucarest/museo-historia-nacional",horario:"Mi\xE9\u2013Dom: 09:00\u201317:00 | Lun\u2013Mar: cerrado",precio:"\u2248 5\u20AC adultos | Gratis el primer mi\xE9rcoles de cada mes"},{nombre:"Monasterio Stavropoleos",descripcion:`Despu\xE9s de varios edificios monumentales, Bucarest cambia de escala y regala una de sus joyas m\xE1s delicadas: el Monasterio Stavropoleos.

Peque\xF1o, refinado y lleno de detalles en piedra tallada, es uno de los lugares con m\xE1s encanto del casco antiguo.

Su patio interior, tranquilo y casi escondido, contrasta con el movimiento de las calles cercanas y ofrece uno de los momentos m\xE1s bonitos del d\xEDa.

\u26EA Experiencia viajera:
Es el tipo de lugar que no necesita ser grande para quedarse en la memoria.

\u2728 Consejo AvenTourArte:
No pases r\xE1pido. Entra, mira los detalles y disfruta del silencio.`,foto:"cld:europa/rumania/bucarest/stavropoleos",horario:"Lunes-S\xE1bado: 08:00 \u2013 19:00 | Domingos: 12:00 \u2013 19:00 (Despu\xE9s de la liturgia matinal)",precio:"Gratis"},{nombre:"Librer\xEDa C\u0103rture\u0219ti Carusel",descripcion:`Muy cerca del monasterio te espera uno de los interiores m\xE1s espectaculares de Bucarest: la librer\xEDa C\u0103rture\u0219ti Carusel.

Considerada una de las librer\xEDas m\xE1s bonitas de Europa, su espacio blanco de varios pisos con balcones curvos crea una sensaci\xF3n visual impresionante.

\u{1F4DA} Experiencia viajera:
M\xE1s que una librer\xEDa, es una experiencia est\xE9tica. Uno de esos lugares donde apetece quedarse un rato aunque no compres nada.

\u2728 Consejo AvenTourArte:
Sube a las plantas superiores para verla desde distintas perspectivas.`,foto:"cld:europa/rumania/bucarest/carturesti-carusel",horario:"Lunes-Domingo: 10:00 \u2013 22:00",precio:"Gratis"},{nombre:"Hanul lui Manuc",descripcion:`El paseo contin\xFAa hacia uno de los lugares con m\xE1s historia y ambiente de Bucarest: Hanul lui Manuc.

Esta antigua posada del siglo XIX serv\xEDa como punto de encuentro para comerciantes y viajeros, y hoy sigue funcionando como restaurante y espacio lleno de vida.

Su patio interior, rodeado de balcones de madera, tiene much\xEDsimo encanto y hace que la visita sea especial incluso aunque solo pares a tomar algo.

\u{1F4A1} Experiencia viajera:
Aqu\xED Bucarest se siente hist\xF3rica, c\xE1lida y muy aut\xE9ntica.

\u2728 Consejo AvenTourArte:
Si puedes, entra aunque sea un momento. El patio merece totalmente la pena.`,fotos:["cld:europa/rumania/bucarest/hanul-lui-manuc","cld:europa/rumania/bucarest/hanul-lui-manuc-2"],horario:"Lun\u2013Jue: 10:00\u201300:00 | Vie-S\xE1b: 10:00\u201302:00 | Domingos: 10:00\u201300:00",precio:"Econ\xF3mico-moderado"},{nombre:"Curtea Veche",descripcion:`Desde el centro hist\xF3rico m\xE1s animado, el recorrido baja ahora a la Bucarest medieval.

Curtea Veche fue la antigua corte principesca de la ciudad, el n\xFAcleo desde el que Bucarest empez\xF3 a desarrollarse como capital en el siglo XV. Est\xE1 estrechamente vinculada a Vlad \u021Aepe\u0219 (Dr\xE1cula), quien estableci\xF3 aqu\xED una de sus residencias.

Hoy solo se conservan restos arqueol\xF3gicos debido a los numerosos terremotos, incendios y transformaciones urbanas que sufri\xF3 la ciudad a lo largo de los siglos.

\u{1F3DB}\uFE0F Contexto hist\xF3rico:
M\xE1s que un palacio aislado, este lugar fue el centro pol\xEDtico y administrativo de la antigua Bucarest, el punto desde donde se ejerc\xEDa el poder en la regi\xF3n.

\u{1F30D} Experiencia viajera:
No impresiona por su tama\xF1o ni por su estado, pero tiene un valor especial: aqu\xED empieza la historia real de Bucarest.

\u2728 Consejo AvenTourArte:
Es una parada breve, pero con mucho sentido dentro de la ruta. Funciona mejor si la ves como un punto clave de contexto, no como una gran visita visual.`,foto:"cld:europa/rumania/bucarest/curtea-veche"},{nombre:"Iglesia de San Antonio (St. Anthony\u2019s Church)",descripcion:`Junto a Curtea Veche se encuentra la iglesia m\xE1s antigua de Bucarest, construida en el siglo XVI.

Est\xE1 vinculada tambi\xE9n a la corte de Vlad \u021Aepe\u0219 y sigue siendo un lugar de culto muy activo, con un ambiente profundamente local.

\u26EA Experiencia viajera:
Es una de esas iglesias que conectan directamente con la Bucarest m\xE1s antigua, menos monumental y m\xE1s aut\xE9ntica.

\u2728 Consejo AvenTourArte:
Si entras, hazlo con calma. Es un sitio para observar m\xE1s que para correr.`,foto:"cld:europa/rumania/bucarest/st-anthony",horario:"Lunes-Domingo: 08:00 \u2013 19:00",precio:"Gratis"},{nombre:"Cena en La Pl\u0103cinte (Mici)",descripcion:`Despu\xE9s de un d\xEDa tan cargado de centro hist\xF3rico, cultura y capas de historia, llega el momento perfecto para cerrar con gastronom\xEDa local.

La Pl\u0103cinte es una opci\xF3n muy buena para terminar el d\xEDa probando cocina tradicional rumana en un formato cercano, sabroso y sin complicaciones.

\u{1F37D}\uFE0F Qu\xE9 probar:
Los mici, peque\xF1as salchichas especiadas a la parrilla, servidas normalmente con mostaza y pan. Son uno de los grandes cl\xE1sicos de la comida popular rumana.

\u{1F4A1} Experiencia viajera:
Una cena sencilla, aut\xE9ntica y muy local para rematar el d\xEDa sin artificios.

\u2728 Consejo AvenTourArte:
Ideal si te apetece algo tradicional y reconfortante sin irte a una cena demasiado formal.`,foto:"cld:europa/rumania/bucarest/mici",horario:"Lunes-Domingo: 10:00 \u2013 22:00",precio:"Econ\xF3mico"}]},{dia:"D\xEDa 3 \u2013 Barrio jud\xEDo, sinagogas y termas de Bucarest",zonas:[{nombre:"Barrio jud\xEDo de Bucarest",descripcion:`El tercer d\xEDa empieza en una de las zonas con m\xE1s historia y memoria de la ciudad: el barrio jud\xEDo.

Aqu\xED Bucarest cambia otra vez de registro. Las calles, los edificios y los templos conservan el legado de una comunidad que fue fundamental en la vida cultural y comercial de la ciudad.

\u{1F4A1} Experiencia viajera:
Es una zona menos tur\xEDstica y m\xE1s silenciosa, ideal para descubrir otra capa de Bucarest m\xE1s all\xE1 del centro hist\xF3rico.

\u2728 Consejo AvenTourArte:
Rec\xF3rrelo sin prisa. Aqu\xED la visita gana mucho cuando entiendes el contexto y no solo encadenas edificios.`},{nombre:"Iglesia Rusa de Bucarest (Sf\xE2ntul Nicolae)",descripcion:`Antes de entrar de lleno en la parte jud\xEDa, una parada distinta aporta variedad y contraste: la Iglesia Rusa de Bucarest.

Construida a principios del siglo XX, destaca por sus c\xFApulas doradas y por un estilo arquitect\xF3nico diferente al de otras iglesias de la ciudad.

\u26EA Experiencia viajera:
Es uno de esos lugares que llaman la atenci\xF3n enseguida y ayudan a entender la diversidad cultural y religiosa de Bucarest.

\u2728 Consejo AvenTourArte:
Muy recomendable aunque sea como parada breve. Visualmente destaca much\xEDsimo.`,foto:"cld:europa/rumania/bucarest/iglesia-rusa",horario:"Mar\u2013S\xE1b: 08:00\u201318:00 | Lun: 09:00\u201316:00 | Dom: 08:00\u201313:00",precio:"Gratis"},{nombre:"Templo Coral",descripcion:`El recorrido contin\xFAa hacia la sinagoga m\xE1s importante de Bucarest: el Templo Coral.

Construido en el siglo XIX e inspirado en el de Viena, representa el centro espiritual de la comunidad jud\xEDa de la ciudad y es uno de los mejores lugares para comprender su presencia hist\xF3rica.

Su interior elegante y su valor simb\xF3lico lo convierten en una visita especialmente interesante.

\u26A0\uFE0F Importante:
Puede haber control de seguridad y pueden pedir DNI o pasaporte.

\u{1F455} Vestimenta:
Conviene vestir con respeto: hombros y rodillas cubiertos.

\u2728 Consejo AvenTourArte:
Es una de esas visitas que aportan mucho m\xE1s cuando vas con ganas de entender, no solo de ver.`,foto:"cld:europa/rumania/bucarest/templo-coral",horario:"Lun\u2013Jue: 10:00\u201314:30 | Vie: 10:00\u201312:30 | S\xE1b\u2013Dom: cerrado",precio:"\u2248 6\u20AC adultos | Estudiantes: 3\u20134\u20AC (incluye breve visita guiada)"},{nombre:"Templul Unirea Sf\xE2nt\u0103 (Museo de Historia Jud\xEDa)",descripcion:`A pocos pasos, esta visita ampl\xEDa la experiencia desde un enfoque m\xE1s hist\xF3rico y cultural.

El antiguo templo alberga hoy el Museo de Historia de la Comunidad Jud\xEDa de Ruman\xEDa, donde se exponen objetos rituales, documentos, trajes tradicionales y piezas que ayudan a comprender mejor la evoluci\xF3n de esta comunidad en el pa\xEDs.

\u{1F3DB}\uFE0F Experiencia viajera:
Funciona muy bien como complemento al Templo Coral, porque a\xF1ade contexto y profundidad.

\u26A0\uFE0F Importante:
Puede haber control de seguridad, as\xED que conviene llevar DNI o pasaporte.

\u{1F4A1} Consejo viajero:
Llega con margen, al menos 45 minutos antes del cierre, para poder verlo bien.`,foto:"cld:europa/rumania/bucarest/templul-unirea-sfanta",horario:"Lun\u2013Jue: 10:00\u201315:00 | Dom: 09:00\u201312:00 | Vie\u2013S\xE1b: cerrado",precio:"\u2248 3\u20134\u20AC adultos | Estudiantes: \u2248 2\u20AC"},{nombre:"Gran Sinagoga de Bucarest (Museo del Holocausto)",descripcion:`La parte m\xE1s intensa y emocional de este recorrido llega con la Gran Sinagoga.

Es uno de los edificios m\xE1s importantes del legado jud\xEDo de Bucarest y actualmente funciona sobre todo como Museo del Holocausto de Ruman\xEDa.

En su interior se combinan la belleza arquitect\xF3nica del espacio con una exposici\xF3n de gran carga hist\xF3rica y humana, dedicada a la comunidad jud\xEDa y a las v\xEDctimas del Holocausto.

\u{1F4A1} Experiencia viajera:
Es una visita menos visual que otras, pero mucho m\xE1s profunda y necesaria.

\u26A0\uFE0F Importante:
Es obligatorio presentar DNI o pasaporte y pasar control de seguridad. No se permiten mochilas grandes.

\u2728 Consejo AvenTourArte:
Es uno de esos lugares que no se recorren r\xE1pido. Merece respeto, tiempo y atenci\xF3n.`,foto:"cld:europa/rumania/bucarest/gran-sinagoga",horario:"Lun\u2013Jue: 09:00\u201314:00 | Vie: 09:00\u201312:00 | S\xE1b\u2013Dom: cerrado",precio:"\u2248 6\u20AC adultos (30 RON)"},{nombre:"Panader\xEDa Ana Pan \u2013 Cozonac",descripcion:`Despu\xE9s de una ma\xF1ana tan cargada de historia, una pausa dulce encaja perfecto.

Ana Pan es una de las mejores opciones para probar cozonac, el dulce tradicional rumano similar a un brioche o pan dulce festivo, normalmente relleno de cacao, nueces o crema.

\u{1F370} Experiencia viajera:
Es una forma muy agradable de bajar un poco el tono del d\xEDa y probar uno de los sabores m\xE1s t\xEDpicos del pa\xEDs.

\u{1F4A1} Consejo viajero:
Si no quieres llevarte uno entero, suelen tener porciones individuales.`,foto:"cld:europa/rumania/bucarest/cozonac",horario:`Ana Pan \u2013 Coposu (zona Unirii): Lun\u2013Vie: 08:00\u201319:30 | S\xE1b: 09:00\u201315:00 | Dom: cerrado
(Otros locales pueden tener horarios distintos)`,precio:"\u2248 12\u20AC \u2013 24\u20AC/kg (60\u2013120 RON)"},{nombre:"Termas de Bucarest (Therme Bucure\u0219ti)",descripcion:`Despu\xE9s de varios d\xEDas de ciudad, historia y caminatas, el tercer d\xEDa remata con un cambio total de energ\xEDa: Therme Bucure\u0219ti.

Es uno de los complejos termales m\xE1s grandes y modernos de Europa y uno de los mejores planes para relajarse en Bucarest.

\u{1F334} Zonas principales:
\u2022 Galaxy \u2192 zona familiar con toboganes y piscina de olas
\u2022 The Palm \u2192 \xE1rea de relax con palmeras (solo +14 a\xF1os)
\u2022 Elysium \u2192 zona premium con saunas tem\xE1ticas y bienestar

\u{1F4A1} Consejo viajero:
Si buscas descanso real, lo mejor suele ser The Palm o Elysium.

\u26A0\uFE0F Importante:
Al entrar te dar\xE1n una pulsera inteligente para abrir tu taquilla y pagar consumiciones dentro del recinto.

\u{1F455} Qu\xE9 llevar:
Ba\xF1ador, chanclas y toalla. Si no los llevas, tendr\xE1s que alquilarlos all\xED.

\u{1F4CD} Ubicaci\xF3n:
Est\xE1 a las afueras de Bucarest, cerca del aeropuerto.

\u{1F697} Transporte:
\u2022 Bus gratuito desde Pia\u021Ba Roman\u0103 (cada ~2 h)
\u2022 Uber/Bolt: 14\u201320\u20AC aprox. desde el centro
\u2022 Bus p\xFAblico 442

\u{1F4A1} Experiencia viajera:
Despu\xE9s de una ma\xF1ana intensa a nivel hist\xF3rico y emocional, Bucarest te ofrece justo lo contrario: desconectar completamente.

Y ese contraste\u2026 es parte de lo que hace especial este d\xEDa.

\u2728 Consejo AvenTourArte:
Compra la entrada online, sobre todo en fines de semana o d\xEDas nublados. Se llena con facilidad.`,foto:"cld:europa/rumania/bucarest/termas-bucarest",horario:"Lun\u2013Jue: 10:00\u201323:00 | Vie\u2013S\xE1b: 09:00\u201300:00 | Dom: 09:00\u201323:00",precio:"Galaxy: 13\u201315\u20AC (3h) | The Palm: 21\u201325\u20AC (4,5h) | Elysium: desde 30\u20AC aprox."}]},{dia:"D\xEDa 4 \u2013 Excursi\xF3n a Transilvania (castillos y Bra\u0219ov)",zonas:[{nombre:"Salida temprana desde Bucarest",descripcion:`El cuarto d\xEDa cambia completamente de ritmo y sale de la ciudad para entrar en una de las excursiones m\xE1s cl\xE1sicas y espectaculares de Ruman\xEDa: Transilvania.

Es una jornada larga, normalmente de unas 12 horas, as\xED que conviene asumir desde el principio que ser\xE1 intensa, pero muy memorable.

\u{1F4A1} Consejo viajero:
Duerme bien, lleva algo de desayuno o snacks y prep\xE1rate para un d\xEDa potente.

\u2728 Consejo AvenTourArte:
Es de esos d\xEDas donde compensa madrugar mucho.`,horario:"06:30 \u2013 07:30",precio:"Excursi\xF3n completa \u2248 30\u201340\u20AC por persona"},{nombre:"Desayuno en Luca \u2013 Covrig",descripcion:`Antes de salir o para llevar en ruta, LUCA es una parada perfecta para desayunar algo r\xE1pido, barato y muy local.

Sus covrigi son uno de los snacks m\xE1s t\xEDpicos de Ruman\xEDa: sencillos, buenos y pr\xE1cticos para empezar el d\xEDa sin perder tiempo.

\u{1F968} Experiencia viajera:
Es el desayuno funcional perfecto para una excursi\xF3n temprana.`,foto:"cld:europa/rumania/bucarest/luca-covrigi",horario:"Antes de la salida",precio:"Muy econ\xF3mico (0.50-3\u20AC)"},{nombre:"Ruta hacia los C\xE1rpatos",descripcion:`El trayecto hacia Transilvania atraviesa paisajes rurales, pueblos peque\xF1os y zonas de monta\xF1a que ya van cambiando por completo la sensaci\xF3n del viaje.

A medida que te alejas de Bucarest, el ambiente se vuelve m\xE1s verde, m\xE1s abierto y m\xE1s asociado al imaginario de castillos y leyendas.

\u{1F4A1} Experiencia viajera:
La excursi\xF3n empieza antes de llegar. El paisaje ya forma parte del plan.`,horario:"Ma\xF1ana",precio:"Incluido en excursi\xF3n"},{nombre:"Palacio Peli\u0219or",descripcion:`La primera parada suele ser el Palacio Peli\u0219or, una residencia real mucho m\xE1s \xEDntima que Pele\u0219, pero muy elegante y con un encanto especial.

Fue residencia de los reyes Fernando y Mar\xEDa, y destaca por su estilo art nouveau, m\xE1s delicado y menos monumental.

\u{1F4A1} Experiencia viajera:
Es una muy buena introducci\xF3n al complejo real antes de llegar a la gran joya del d\xEDa.`,foto:"cld:europa/rumania/bucarest/palacio-pelisor",horario:"Media ma\xF1ana",precio:"Entrada aparte (\u2248 6\u20AC)"},{nombre:"Castillo de Pele\u0219",descripcion:`A pocos metros llega uno de los puntos m\xE1s espectaculares de toda la excursi\xF3n: el Castillo de Pele\u0219.

Considerado uno de los castillos m\xE1s bonitos de Europa, parece salido de un cuento. Rodeado de bosque y monta\xF1a, combina exteriores impresionantes con unos interiores que justifican por s\xED solos la visita.

Fue residencia de verano de la monarqu\xEDa rumana y transmite una sensaci\xF3n de elegancia, detalle y fantas\xEDa dif\xEDcil de igualar.

\u{1F4A1} Consejo viajero:
Si puedes entrar, hazlo. Es una de las visitas que m\xE1s merecen la pena de todo el viaje.`,foto:"cld:europa/rumania/bucarest/castillo-peles",horario:"Media ma\xF1ana",precio:"Entrada aparte (\u2248 20\u20AC)"},{nombre:"Academia Nevermore (Mi\xE9rcoles Addams)",descripcion:`De camino hacia Bran aparece una parada curiosa para los fans de la serie \u201CWednesday\u201D o para quien disfrute de localizaciones con est\xE9tica oscura y fotog\xE9nica.

No suele ser el gran punto del d\xEDa, pero s\xED una pausa simp\xE1tica que a\xF1ade un toque diferente a la ruta.

\u{1F4F8} Experiencia viajera:
M\xE1s curiosidad que imprescindible, pero divertida si te encaja.`,foto:"cld:europa/rumania/bucarest/nevermore",horario:"Parada breve",precio:"Gratis exterior"},{nombre:"Castillo de Bran (Dr\xE1cula)",descripcion:`La siguiente gran parada es el castillo m\xE1s famoso de Ruman\xEDa: Bran.

Su conexi\xF3n con Dr\xE1cula es m\xE1s leyenda que realidad, pero su ubicaci\xF3n entre monta\xF1as, su silueta medieval y todo el imaginario que lo rodea hacen que siga siendo un imprescindible absoluto.

\u{1F3F0} Experiencia viajera:
Aqu\xED pesa tanto la historia como el mito, y esa mezcla es precisamente lo que lo hace especial.

\u{1F4A1} Consejo viajero:
Suele haber bastante gente, as\xED que conviene tom\xE1rselo con calma y disfrutar del ambiente sin obsesionarse demasiado con las colas.`,foto:"cld:europa/rumania/bucarest/castillo-bran",horario:"Tarde",precio:"Incluido en excursi\xF3n"},{nombre:"Bra\u0219ov",descripcion:`La \xFAltima gran parada del d\xEDa suele ser Bra\u0219ov, probablemente una de las ciudades m\xE1s bonitas y agradables de Transilvania.

Su casco hist\xF3rico, con la Plaza del Consejo, edificios de colores y la imponente Iglesia Negra, ofrece una atm\xF3sfera mucho m\xE1s relajada y centroeuropea.

\u{1F37D}\uFE0F Experiencia viajera:
Es el momento perfecto para parar, comer algo y disfrutar sin tanta prisa despu\xE9s de los castillos.

\u2728 Consejo AvenTourArte:
Bra\u0219ov es de esos sitios que apetece disfrutar con calma, aunque la excursi\xF3n siempre sepa a poco.`,fotos:["cld:europa/rumania/bucarest/brasov","cld:europa/rumania/bucarest/brasov-plz-consejo","cld:europa/rumania/bucarest/brasov-iglesia-negra-1","cld:europa/rumania/bucarest/brasov-iglesia-negra-2"],horario:"Tarde",precio:"Comida moderada"},{nombre:"Regreso a Bucarest",descripcion:`Tras un d\xEDa largo e intenso, comienza la vuelta a Bucarest. El trayecto puede hacerse pesado, sobre todo por el tr\xE1fico de entrada a la ciudad, as\xED que conviene tom\xE1rselo con filosof\xEDa.

\u{1F4A1} Experiencia viajera:
Es el momento de mirar fotos, descansar y asumir que ha sido uno de los d\xEDas m\xE1s completos del viaje.`,horario:"Noche",precio:"Incluido en excursi\xF3n"},{nombre:"Cena en Caru\u2019 cu Bere",descripcion:`Si todav\xEDa te quedan fuerzas al volver, una gran forma de cerrar el d\xEDa es cenar en Caru\u2019 cu Bere, el restaurante m\xE1s emblem\xE1tico de Bucarest.

Su interior hist\xF3rico y su ambiente hacen que la cena sea una experiencia en s\xED misma, ideal para probar platos tradicionales como los sarmale acompa\xF1ados de cerveza local.

\u{1F4A1} Consejo viajero:
Este plan funciona genial si llegas con buen margen y a\xFAn tienes energ\xEDa. Si vuelves muy cansado, mejor dejarlo para otro d\xEDa.`,horario:"Noche",precio:"Moderado"},{nombre:"Paseo nocturno \u2013 Canal del D\xE2mbovi\u021Ba y la Loba Capitolina",descripcion:`Despu\xE9s de la cena, un paseo nocturno por el centro puede ser el broche perfecto para terminar el d\xEDa.

El r\xEDo D\xE2mbovi\u021Ba recorre la ciudad canalizado, fruto de las grandes transformaciones urban\xEDsticas impulsadas durante la etapa comunista por Nicolae Ceau\u0219escu. Estos proyectos buscaban modernizar Bucarest, pero tambi\xE9n supusieron la demolici\xF3n de barrios y la desaparici\xF3n de parte de su patrimonio hist\xF3rico.

Hoy, el canal forma parte del paisaje urbano y ofrece un entorno agradable para caminar cuando la ciudad ya ha bajado revoluciones.

A pocos minutos se encuentra la Loba Capitolina, s\xEDmbolo del origen latino del pueblo rumano y de su v\xEDnculo cultural con Roma.

\u{1F319} Experiencia viajera:
Es un cierre tranquilo y con mucho sentido: historia, identidad y paseo nocturno mezcl\xE1ndose en uno de esos \xFAltimos momentos que se quedan en el recuerdo.

\u2728 Consejo AvenTourArte:
Despu\xE9s de un d\xEDa tan intenso, este tramo funciona perfecto para despedirte de Bucarest sin prisas.`,fotos:["cld:europa/rumania/bucarest/canal-dambovita","cld:europa/rumania/bucarest/loba-capitolina"],noCropGallery:!0}]},{dia:"D\xEDa 5 \u2013 Shopping, parques y barrio Prim\u0103verii",zonas:[{nombre:"Shopping en Bucarest",descripcion:`El \xFAltimo d\xEDa arranca con un tramo m\xE1s libre y relajado. Es un buen momento para hacer compras, buscar recuerdos o simplemente pasear sin prisas por alguna zona que te haya gustado especialmente.

\u{1F4A1} Experiencia viajera:
Despu\xE9s de varios d\xEDas intensos, este tipo de ma\xF1ana m\xE1s ligera se agradece much\xEDsimo.`,horario:"Ma\xF1ana (horario comercial habitual: 10:00\u201321:00)"},{nombre:"Arco del Triunfo",descripcion:`Desde el centro, el recorrido se desplaza hacia la zona norte para descubrir uno de los monumentos m\xE1s emblem\xE1ticos de Bucarest: el Arco del Triunfo.

Construido para conmemorar la victoria de Ruman\xEDa en la Primera Guerra Mundial, recuerda por forma y simbolismo a otros grandes arcos triunfales europeos.

\u{1F4A1} Lo mejor de la visita:
Subir a la parte superior, desde donde se obtienen muy buenas vistas del Parque Her\u0103str\u0103u y de la Avenida Kiseleff.

\u26A0\uFE0F Importante:
El acceso interior puede verse restringido por eventos oficiales, as\xED que conviene comprobarlo antes.`,foto:"cld:europa/rumania/bucarest/arco-triunfo",horario:"Mar\u2013Dom: 09:00\u201317:00 | Lun: cerrado",precio:"\u2248 4\u20135\u20AC adultos | Estudiantes y alumnos: descuento | Exterior: gratis"},{nombre:"Parque Rey Miguel I (Parcul Regele Mihai I)",descripcion:`Despu\xE9s del Arco del Triunfo, el d\xEDa se abre por completo en uno de los espacios m\xE1s agradables de Bucarest: el Parque Rey Miguel I, alrededor del lago Her\u0103str\u0103u.

Es el parque m\xE1s grande y m\xE1s disfrutable de la ciudad, ideal para caminar, desconectar y ver una cara mucho m\xE1s tranquila y amable de Bucarest.

\u{1F33F} Experiencia viajera:
Aqu\xED el viaje baja el ritmo. Despu\xE9s de tanta historia, esta parte del d\xEDa est\xE1 pensada para disfrutar sin tensi\xF3n y con aire.

\u{1F374} Gastronom\xEDa:
Dentro del parque encontrar\xE1s terrazas y restaurantes, desde planes tranquilos hasta opciones con m\xE1s ambiente.

\u2728 Consejo AvenTourArte:
Perfecto para una ma\xF1ana larga o un mediod\xEDa relajado si hace buen tiempo.`,foto:"cld:europa/rumania/bucarest/parque-rey-miguel",horario:"Abierto 24h todos los d\xEDas",precio:"Gratis | Barcas: \u2248 2\u20134\u20AC | Bicicletas: alquiler por horas (\u2248 2\u20135\u20AC)"},{nombre:"Museo Satului (Museo Nacional de la Aldea \u201CDimitrie Gusti\u201D)",descripcion:`Dentro del propio parque se encuentra una de las visitas m\xE1s interesantes y diferentes de Bucarest: el Museo Satului.

Es uno de los museos al aire libre m\xE1s importantes de Europa y re\xFAne m\xE1s de 300 construcciones tradicionales tra\xEDdas de distintas regiones de Ruman\xEDa.

Casas, iglesias de madera, molinos y edificios rurales permiten entender c\xF3mo era la vida tradicional del pa\xEDs entre los siglos XVII y XX.

\u{1F3E1} Experiencia viajera:
Es una visita que cambia por completo el enfoque del viaje: de la ciudad al mundo rural, de la gran capital a las ra\xEDces profundas del pa\xEDs.

\u{1F4A1} Consejo viajero:
Dedica al menos 2\u20133 horas si quieres verlo con calma.`,foto:"cld:europa/rumania/bucarest/museo-satului",horario:`Todos los d\xEDas: 09:00\u201317:00 | Verano: hasta 19:00
(\xDAltimo acceso a interiores: 30 min antes del cierre)`,precio:`\u2248 6\u20AC adultos (30 RON) | Pensionistas: \u2248 3\u20AC | Estudiantes: \u2248 1.5\u20AC
Audiogu\xEDa: +3\u20134\u20AC opcional`},{nombre:"Barrio Prim\u0103verii",descripcion:`El tramo final del viaje se adentra en una Bucarest mucho m\xE1s elegante y residencial: Prim\u0103verii.

Es uno de los barrios m\xE1s exclusivos de la ciudad, con calles arboladas, embajadas, villas hist\xF3ricas y un ambiente muy distinto al centro.

Pasear por aqu\xED es casi una experiencia en s\xED misma. Todo se siente m\xE1s tranquilo, m\xE1s cuidado y m\xE1s sofisticado.

\u{1F4A1} Qu\xE9 ver:
La arquitectura de sus villas, la atm\xF3sfera de sus calles y el contraste entre tradici\xF3n, poder y modernidad.

\u{1F4A1} Extra:
En la zona est\xE1 el museo MARe, dedicado al arte contempor\xE1neo rumano.

\u2728 Consejo AvenTourArte:
Es un barrio ideal para caminar sin prisa y dejar que el viaje se vaya apagando con calma.`,horario:`Zona urbana visitable todo el d\xEDa
MARe: Mi\xE9\u2013Lun 11:00\u201319:00 | Mar: cerrado`,precio:"Gratis (barrio) | MARe \u2248 5\u20137\u20AC"},{nombre:"Mansi\xF3n de Ceau\u0219escu (Palacio Prim\u0103verii)",descripcion:`Dentro del propio barrio de Prim\u0103verii se encuentra una de las visitas m\xE1s impactantes de Bucarest: la mansi\xF3n privada de Nicolae Ceau\u0219escu.

Hoy convertida en museo, permite ver de cerca el lujo extremo en el que viv\xEDa la \xE9lite comunista mientras el pa\xEDs atravesaba una realidad muy distinta.

En la visita se recorren decenas de estancias, incluyendo cine privado, piscina interior, salones opulentos, b\xFAnker y detalles tan exagerados como grifos dorados.

\u{1F3DB}\uFE0F Experiencia viajera:
Es una de las visitas que m\xE1s ayuda a entender la contradicci\xF3n y el absurdo de aquella \xE9poca.

\u26A0\uFE0F Importante:
Solo se puede visitar mediante tour guiado.

\u{1F4A1} Consejo viajero:
Reserva con 24\u201348 h de antelaci\xF3n, porque los grupos suelen ser peque\xF1os.`,foto:"cld:europa/rumania/bucarest/mansion-ceausescu",horario:"Mar\u2013Dom: 10:00\u201317:00 | Lun: cerrado",precio:`\u2248 12\u20AC adultos (60 RON) | Estudiantes/Pensionistas: \u2248 8\u20AC
(Tour en ingl\xE9s puede ser ligeramente m\xE1s caro)`},{nombre:"Comida de despedida \u2013 City Grill (Barrio Prim\u0103verii)",descripcion:`La despedida perfecta del viaje puede llegar en Prim\u0103verii, con una comida o cena m\xE1s tranquila y cuidada.

City Grill es una opci\xF3n muy buena para cerrar Bucarest probando platos rumanos en un entorno m\xE1s moderno y c\xF3modo.

\u{1F37D}\uFE0F Qu\xE9 probar:
Durante la visita, destacan sabores como la zacusc\u0103, la ciorb\u0103 de v\u0103cu\u021B\u0103 y una pavlova preparada en directo en la mesa, que convierte el final en algo m\xE1s especial.

\u{1F4A1} Experiencia viajera:
Un cierre relajado, sabroso y elegante para despedirte de la ciudad como se merece.

\u{1F4A1} Experiencia viajera:
Este \xFAltimo d\xEDa no va de ver m\xE1s\u2026 va de despedirse bien.

Bucarest no es una ciudad que te impacta al instante.
Pero cuando te vas\u2026 te das cuenta de todo lo que te ha dejado.`,fotos:["cld:europa/rumania/bucarest/zacusca-y-ciorba-vacuna","cld:europa/rumania/bucarest/pavlova"],horario:"Comida y cena (aprox. 12:00\u201323:00)",precio:"\u2248 15\u201325\u20AC por persona"}]}]},{titulo:"Gastronom\xEDa",platos:[{nombre:"Sarmale",descripcion:`Uno de los platos m\xE1s emblem\xE1ticos de la cocina rumana. Son rollitos de col rellenos normalmente de carne picada y arroz, cocinados lentamente hasta quedar muy tiernos y sabrosos.

Suelen servirse con m\u0103m\u0103lig\u0103 (polenta), crema agria y a veces panceta.

\u{1F4A1} Experiencia viajera:
Es el plato rumano por excelencia y uno de los mejores para empezar a entender la cocina local.`,foto:"cld:europa/rumania/bucarest/sarmale",precio:"Moderado"},{nombre:"Mici",descripcion:`Peque\xF1as salchichas de carne especiada a la parrilla, muy jugosas y con much\xEDsimo sabor.

Se preparan normalmente con mezcla de cerdo y ternera, ajo y especias, y se sirven con mostaza y pan.

\u{1F4A1} Experiencia viajera:
Uno de los grandes cl\xE1sicos de la comida callejera rumana. Sencillos, baratos y adictivos.`,foto:"cld:europa/rumania/bucarest/mici",precio:"Econ\xF3mico"},{nombre:"Covrigi",descripcion:`Rosquillas saladas muy populares en Ruman\xEDa, similares a un pretzel. Son uno de los desayunos o snacks m\xE1s habituales del d\xEDa a d\xEDa.

Los encontrar\xE1s solos, con sal, s\xE9samo o rellenos de queso, jam\xF3n y otros ingredientes.

\u{1F4A1} Experiencia viajera:
El bocado r\xE1pido m\xE1s t\xEDpico para comer algo entre visitas como un local.`,foto:"cld:europa/rumania/bucarest/luca-covrigi",precio:"Muy econ\xF3mico (0.50\u20133\u20AC)"},{nombre:"Covrig relleno (Twist)",descripcion:`Versi\xF3n m\xE1s moderna del covrig tradicional. Mantiene la masa crujiente por fuera y tierna por dentro, pero suele ir relleno de queso u otros ingredientes.

Es muy popular como snack r\xE1pido en ciudades como Bra\u0219ov.

\u{1F4A1} Experiencia viajera:
Perfecto si quieres probar algo t\xEDpico pero con un punto m\xE1s contundente.`,foto:"cld:europa/rumania/bucarest/twist",precio:"Muy econ\xF3mico (1\u20133\u20AC)"},{nombre:"Zacusc\u0103",descripcion:`Pasta vegetal tradicional elaborada normalmente con pimientos asados, berenjena y tomate.

Se suele untar en pan y tiene un sabor ahumado, suave y muy casero.

\u{1F4A1} Experiencia viajera:
Uno de esos sabores sencillos que representan muy bien la cocina rumana cotidiana.`,foto:"cld:europa/rumania/bucarest/zacusca",precio:"Econ\xF3mico"},{nombre:"Ciorb\u0103 de fasole",descripcion:`Sopa de alubias muy t\xEDpica y muy reconfortante, especialmente apreciada en d\xEDas fr\xEDos.

Tiene una textura contundente y un sabor profundo, y a veces se sirve en pan, lo que la convierte en un plato todav\xEDa m\xE1s especial.

\u{1F4A1} Experiencia viajera:
Una de las mejores formas de descubrir la cocina rumana m\xE1s casera.`,foto:"cld:europa/rumania/bucarest/ciorba-fasole",precio:"Moderado"},{nombre:"Varz\u0103 c\u0103lit\u0103",descripcion:`Col rehogada o cocinada lentamente hasta quedar muy sabrosa, usada muchas veces como guarnici\xF3n de carnes, salchichas o pato.

Tiene un sabor profundo, ligeramente dulce y muy tradicional.

\u{1F4A1} Experiencia viajera:
Puede parecer un plato simple, pero acompa\xF1a de maravilla a muchas recetas rumanas.`,foto:"cld:europa/rumania/bucarest/varza-calita",precio:"Econ\xF3mico"},{nombre:"Pl\u0103cint\u0103",descripcion:`Masa rellena muy popular en Ruman\xEDa y Moldavia, con versiones tanto dulces como saladas.

Las m\xE1s t\xEDpicas llevan queso, patata, carne, manzana o calabaza.

\u{1F4A1} Experiencia viajera:
Un cl\xE1sico perfecto para comer algo r\xE1pido sin dejar de probar cocina local.`,foto:"cld:europa/rumania/bucarest/placinta",precio:"Econ\xF3mico"},{nombre:"Cozonac",descripcion:`Dulce tradicional rumano, muy t\xEDpico en celebraciones, con masa esponjosa y rellenos como cacao, nueces, pasas o rahat.

Se parece a un pan dulce o brioche festivo, pero con personalidad propia.

\u{1F4A1} Experiencia viajera:
Uno de los postres o recuerdos gastron\xF3micos m\xE1s representativos del pa\xEDs.`,foto:"cld:europa/rumania/bucarest/cozonac",precio:"Econ\xF3mico"},{nombre:"Palinca",descripcion:`Aguardiente tradicional de frutas, muy presente en la cultura popular rumana.

Suele elaborarse con ciruela u otras frutas y tiene una graduaci\xF3n fuerte, por lo que se toma en peque\xF1as cantidades.

\u{1F4A1} Experiencia viajera:
M\xE1s que una bebida, es casi un peque\xF1o ritual local.`,foto:"cld:europa/rumania/bucarest/palinca",precio:"Seg\xFAn local"},{nombre:"Ensalada de berenjenas",descripcion:`Crema tradicional elaborada con berenjena asada, muy suave y sabrosa.

Se sirve normalmente para untar en pan y es una de las preparaciones m\xE1s queridas en mercados y restaurantes locales.

\u{1F4A1} Experiencia viajera:
Sencilla, muy buena y perfecta para compartir como entrante.`,precio:"Econ\xF3mico"},{nombre:"Tochitur\u0103",descripcion:`Uno de los platos m\xE1s contundentes y representativos de la cocina rumana.

Se trata de un guiso de carne, normalmente de cerdo y embutidos, servido con m\u0103m\u0103lig\u0103, huevo y queso.

Es intenso, sabroso y muy tradicional.

\u{1F4A1} Experiencia viajera:
Si quieres probar un plato potente y muy local, este es uno de los imprescindibles.`,precio:"Moderado"}]},{titulo:"D\xF3nde comer en Bucarest",lugares:[{nombre:"Caru\u2019 cu Bere",descripcion:`Caru\u2019 cu Bere es, probablemente, el restaurante m\xE1s emblem\xE1tico de Bucarest. Situado en pleno casco antiguo, en un espectacular edificio neog\xF3tico de 1879, no es solo un restaurante: es una experiencia completa que mezcla historia, gastronom\xEDa y cultura rumana.

Nada m\xE1s entrar te envuelve su decoraci\xF3n de madera tallada, vitrales de colores y ambiente de otra \xE9poca.

\u{1F37D}\uFE0F Qu\xE9 probar:
Los sarmale, el plato m\xE1s representativo de Ruman\xEDa. Se sirven de forma tradicional con m\u0103m\u0103lig\u0103, panceta ahumada, crema agria y pimiento picante.

\u{1F370} Postre recomendado:
Los papan\u0103\u0219i, uno de los postres m\xE1s famosos y potentes del pa\xEDs.

\u{1F3AD} Ambiente:
Por la noche suele haber bailes folcl\xF3ricos en directo, lo que convierte la cena en una experiencia mucho m\xE1s completa.

\u{1F4A1} Consejo viajero:
\u2022 Para ambiente m\xE1s tranquilo \u2192 mediod\xEDa
\u2022 Para experiencia completa \u2192 cena con espect\xE1culo

\u26A0\uFE0F Importante:
Es uno de los lugares m\xE1s demandados de Bucarest. Reserva si puedes.`,horario:`Todos los d\xEDas: 10:00\u201324:00
Espect\xE1culos: desde ~19:30\u201320:00`,precio:`\u2248 10\u201313\u20AC (50\u201365 RON por los sarmale)
Precio general: moderado`},{nombre:"Hanul lui Manuc",descripcion:`Hanul lui Manuc es la posada en funcionamiento m\xE1s antigua de Bucarest y uno de los lugares m\xE1s especiales para comer o cenar en la ciudad.

Su gran patio interior rodeado de balcones de madera tallada crea una atm\xF3sfera muy aut\xE9ntica y distinta al resto del centro hist\xF3rico.

\u{1F3DB}\uFE0F Historia y ambiente:
Aqu\xED se firm\xF3 el Tratado de Bucarest en 1812, as\xED que el lugar tiene peso hist\xF3rico real adem\xE1s de mucho encanto.

\u{1F3AD} Por la noche:
Suelen tener m\xFAsica en directo y ambiente tradicional, pero normalmente con un punto m\xE1s tranquilo que Caru\u2019 cu Bere.

\u{1F37D}\uFE0F Qu\xE9 pedir:
Platos rumanos, carnes a la brasa y opciones de caza.

\u{1F4A1} Consejo viajero:
Si buscas una experiencia hist\xF3rica y bonita, pero un poco menos tur\xEDstica y fren\xE9tica que Caru\u2019 cu Bere, este es una muy buena opci\xF3n.`,horario:`Dom\u2013Jue: 10:00\u201300:00
Vie\u2013S\xE1b: 10:00\u201302:00`,precio:`\u2248 10\u201318\u20AC por plato principal (50\u201390 RON)
Rango: medio-alto`},{nombre:"LUCA",descripcion:`Las Simigeria LUCA son una aut\xE9ntica instituci\xF3n en Bucarest y uno de los mejores sitios para entender el street food local.

Aqu\xED todo gira en torno al covrig, una especie de pretzel rumano que siempre se sirve caliente y reci\xE9n hecho.

\u{1F968} Qu\xE9 pedir:
\u2022 Covrigi cl\xE1sicos
\u2022 Luca tradicional relleno de jam\xF3n y queso
\u2022 Covridog
\u2022 Versiones dulces de manzana, chocolate o cereza

\u{1F4A1} Experiencia real:
Siempre suele haber cola, pero avanza rapid\xEDsimo. Lo normal es que te lo den reci\xE9n hecho, a\xFAn caliente.

\u2728 Consejo AvenTourArte:
Ideal para desayunar o resolver una comida r\xE1pida sin perder tiempo y sinti\xE9ndote totalmente dentro del d\xEDa a d\xEDa local.`,horario:"Lun\u2013Vie: 06:00\u201321:00 | Fin de semana: 07:00\u201321:00",precio:"Muy econ\xF3mico: \u2248 0.50\u20AC \u2013 3\u20AC"},{nombre:"Ana Pan",descripcion:`Si LUCA representa el lado m\xE1s r\xE1pido y callejero, Ana Pan representa el lado m\xE1s dulce y tradicional de Bucarest.

Es una de las marcas m\xE1s queridas por los locales para comprar reposter\xEDa y productos horneados de calidad.

\u{1F370} Producto estrella:
El cozonac, el pan dulce tradicional rumano, especialmente t\xEDpico en celebraciones.

\u{1F4A1} Qu\xE9 probar:
\u2022 Cozonac de nuez y cacao
\u2022 Versiones con pasas o rahat
\u2022 Amandine
\u2022 Pl\u0103cinte dulces

\u{1F4A1} Consejo viajero:
Si quieres llevarte un souvenir gastron\xF3mico aut\xE9ntico, el cozonac es de las mejores opciones.`,horario:"08:00 \u2013 20:00 (aprox.) | Algunos locales hasta 21:00 | Fines de semana cierre algo m\xE1s temprano",precio:"Cozonac entero: 14\u201319\u20AC (70\u201395 RON) | Porciones individuales disponibles"},{nombre:"Barrio Prim\u0103verii",descripcion:`Si quieres probar gastronom\xEDa rumana en un entorno m\xE1s elegante y tranquilo, Prim\u0103verii es una de las mejores zonas de Bucarest.

Aqu\xED la experiencia cambia respecto al centro: menos turismo, m\xE1s calma y restaurantes frecuentados por locales.

\u{1F356} Plato imprescindible en esta zona:
La tochitur\u0103, uno de los platos m\xE1s contundentes y sabrosos de la cocina rumana.

\u{1F4CD} Sitios destacados:

\u2022 Zexe Zahana \u2B50
Una opci\xF3n m\xE1s refinada, ideal si buscas reinterpretaciones de recetas tradicionales en un entorno elegante.

\u2022 City Grill Prim\u0103verii \u2B50
La opci\xF3n m\xE1s equilibrada del barrio, perfecta si quieres buena calidad sin irte a algo demasiado formal.

\u{1F4A1} Experiencia viajera:
Es una zona muy buena para despedirte de Bucarest con una comida m\xE1s relajada y cuidada.`,horario:`Zexe Zahana: Lun y Mi\xE9\u2013Dom 12:00\u201300:00 | Mar 14:00\u201300:00
City Grill: 08:00\u201322:00 (hasta 23:00 fines de semana)`,precio:`Tochitur\u0103: 11\u201317\u20AC (55\u201385 RON)
Zexe: medio-alto | City Grill: 10\u201314\u20AC`},{nombre:"La Pl\u0103cinte",descripcion:`La Pl\u0103cinte es una de las cadenas m\xE1s queridas de Bucarest y una parada muy recomendable si quieres probar cocina tradicional con un punto casero y reconfortante.

Originaria de Moldavia, su propuesta es sencilla, sabrosa y muy ligada a recetas populares.

\u{1F95F} Especialidad imprescindible:
Las pl\u0103cinte, masas rellenas en versiones dulces y saladas.

\u{1F37D}\uFE0F Qu\xE9 probar:
\u2022 Queso con eneldo
\u2022 Patata, carne o calabaza
\u2022 Versiones dulces de cereza o manzana

\u{1F4A1} Consejo viajero:
Muy buena opci\xF3n para una comida informal, rica y sin gastar demasiado.`,horario:"Todos los d\xEDas: 10:00 \u2013 22:00 (aprox.)",precio:"Pl\u0103cinte: 5\u20137\u20AC | Comida completa: 10\u201314\u20AC"},{nombre:"Ciorb\u0103rie",descripcion:`Si quieres probar la cocina rumana m\xE1s reconfortante y cotidiana, Ciorb\u0103rie es una parada obligatoria.

Esta cadena local est\xE1 especializada en ciorb\u0103, las sopas tradicionales rumanas, con sabores intensos y un toque ligeramente \xE1cido muy caracter\xEDstico.

\u{1F372} Qu\xE9 la hace especial:
Comida r\xE1pida, s\xED, pero con sabor casero de verdad.

\u{1F4A1} Experiencia TOP:
El goulash servido como ciorb\u0103 espesa de ternera, con patatas, piment\xF3n y comino.

\u{1F4A1} C\xF3mo se toma:
Con sm\xE2nt\xE2n\u0103 y ardei iute, como manda la tradici\xF3n.

\u2728 Consejo AvenTourArte:
Perfecto para comer barato, r\xE1pido y muy local, especialmente si hace fr\xEDo o quieres un plato de cuchara de verdad.`,horario:`Lun\u2013Vie: 11:00\u201320:00 (o hasta agotar existencias)
Fines de semana: horario reducido seg\xFAn local`,precio:"Muy econ\xF3mico: \u2248 4\u20135\u20AC (18\u201325 RON por raci\xF3n)"},{nombre:"Parque Rey Miguel I",descripcion:`Si est\xE1s por la zona del Parque Rey Miguel I, este entorno ofrece algunas de las mejores paradas gastron\xF3micas con vistas al lago.

Aqu\xED puedes probar la varz\u0103 c\u0103lit\u0103, una de las guarniciones tradicionales m\xE1s t\xEDpicas de la cocina rumana.

\u{1F37D}\uFE0F Opciones destacadas:

1\uFE0F\u20E3 Restaurante Pesc\u0103ru\u0219
Un cl\xE1sico de Bucarest, ideal si buscas una experiencia m\xE1s tranquila y elegante junto al lago.

2\uFE0F\u20E3 Ber\u0103ria H
Mucho m\xE1s grande, festiva y animada, perfecta si te apetece un plan con ambiente y cerveza.

\u{1F4A1} Consejo viajero:
\u2022 Si buscas algo tranquilo \u2192 Pesc\u0103ru\u0219
\u2022 Si quieres ambiente \u2192 Ber\u0103ria H`,horario:`Pesc\u0103ru\u0219: 09:00\u201323:00 (Vie\u2013S\xE1b hasta 00:00)
Ber\u0103ria H: desde 12:00 hasta 01:00 (hasta 03:00 fines de semana)`,precio:"\u2248 9\u201312\u20AC (45\u201360 RON por plato)"},{nombre:"Mercado de Obor - Terasa Obor",descripcion:`El Mercado de Obor es probablemente uno de los lugares m\xE1s aut\xE9nticos de toda la ciudad y una parada imprescindible si quieres ver la Bucarest m\xE1s local.

Aqu\xED se mezclan agricultores, productos tradicionales, puestos de comida y ambiente real de mercado.

\u{1F525} La experiencia estrella:
Comer mici en Terasa Obor.

Es el sitio m\xE1s ic\xF3nico para probarlos y uno de esos lugares donde la experiencia no es refinada, sino totalmente local, r\xE1pida y sabrosa.

\u{1F356} Qu\xE9 pedir:
\u2022 Mici
\u2022 Mostaza
\u2022 Pan
\u2022 Ensalada de berenjenas

\u{1F4A1} Consejo viajero:
Mejor ir al mediod\xEDa. Los fines de semana puede haber cola, pero suele avanzar r\xE1pido.

\u2728 Consejo AvenTourArte:
Si quieres un sitio aut\xE9ntico de verdad, este es uno de los grandes imprescindibles de Bucarest.`,horario:`Mercado: Lun\u2013Vie 07:00\u201319:00 | S\xE1b 07:00\u201318:00 | Dom 07:00\u201316:00
Terasa Obor: Lun\u2013Vie 09:00\u201318:00 | S\xE1b\u2013Dom 09:00\u201317:00`,precio:"Entrada gratuita | Mici: 1\u20AC aprox. (5\u20136 RON/unidad) | Muy econ\xF3mico"},{nombre:"Mercado Amzei y feria del Museo del Campesino Rumano",descripcion:`Si quieres probar o comprar zacusc\u0103 aut\xE9ntica, esta es una de las mejores zonas de Bucarest.

El Mercado Amzei es una opci\xF3n c\xE9ntrica y c\xF3moda para encontrar productos tradicionales de buena calidad, mientras que la feria del Museo del Campesino ofrece una experiencia todav\xEDa m\xE1s aut\xE9ntica cuando coincide en fin de semana.

\u{1F4A1} Qu\xE9 buscar:
\u2022 Zacusc\u0103 de vinete (berenjena)
\u2022 Zacusc\u0103 de ghebe (setas)
\u2022 Miel, quesos y otros productos tradicionales

\u{1F4A1} Consejo viajero:
Si tu visita coincide con la feria, merece mucho m\xE1s la pena que limitarte al mercado. Tiene m\xE1s ambiente y m\xE1s producto artesanal.`,horario:`Mercado Amzei:
Lun\u2013Vie: 06:00\u201321:00 | S\xE1b: 06:00\u201319:00 | Dom: 06:00\u201315:00

Feria del museo (fin de semana):
Vie\u2013Dom: 10:00\u201318:00

Tienda del museo:
Mar\u2013Dom: 10:00\u201318:00`,precio:"Acceso gratuito | Productos econ\xF3micos\u2013moderados"}]},{titulo:"Consejos pr\xE1cticos",contenido:`Bucarest combina monumentos bastante dispersos con zonas muy caminables, as\xED que organizar bien cada jornada por \xE1reas te ahorrar\xE1 mucho tiempo y energ\xEDa. El centro hist\xF3rico se puede recorrer a pie sin problema, pero para distancias m\xE1s largas compensa usar metro, Uber, Bolt o taxi.

Algunas visitas importantes como el Palacio del Parlamento, Cotroceni, la mansi\xF3n de Ceau\u0219escu o ciertas excursiones requieren reserva previa o funcionan mejor si las planificas con algo de antelaci\xF3n.

Tambi\xE9n merece mucho la pena alternar la parte monumental con parques, mercados, cafeter\xEDas y paradas gastron\xF3micas. Bucarest no se disfruta solo viendo edificios: se entiende mejor cuando mezclas historia, comida local y paseos por barrios con personalidad.

\u{1F4A1} Consejo AvenTourArte:
No intentes juzgar Bucarest demasiado r\xE1pido. Es una ciudad que se disfruta mucho m\xE1s cuando empiezas a leer sus contrastes.

\u2728 Consejo AvenTourArte:
Bucarest no es una ciudad que se entienda en una mirada r\xE1pida.

Pero si le das tiempo\u2026 es de las que m\xE1s te sorprenden.`}]};var SE={path:"america/sudamerica/brasil/rio-de-janeiro",nombre:"R\xEDo de Janeiro",flag:"assets/america/sudamerica/brasil/rio/rio-flag.png",background:"assets/america/sudamerica/brasil/rio/rio-bg.jpg",bgPos:"50% 35%",bgPosMobile:"50% 30%",flagOverlay:!0,flagOpacity:.1,flagSize:"55%",bgBrightness:.85,descripcion:'R\xEDo de Janeiro, la "Cidade Maravilhosa", es famosa por sus playas ic\xF3nicas (Copacabana, Ipanema), el Cristo Redentor y su vibrante vida cultural y carnavalesca.',infoGeneral:{idioma:"Portugu\xE9s",moneda:"Real Brasile\xF1o (BRL) \u2014 1 \u20AC \u2248 6 BRL",hora:"UTC -3 (\u22124h respecto a Espa\xF1a)",internet:"Roaming fuera de la UE. Recomendada eSIM local.",electricidad:"127V/220V \u2013 Enchufe tipo N",pasaporte:"Requerido",visado:"No necesario hasta 90 d\xEDas",vacunas:"Fiebre amarilla recomendada"},secciones:[{titulo:"Historia",contenido:"Fundada en el siglo XVI, R\xEDo fue capital de Brasil hasta 1960. Su historia mezcla influencias ind\xEDgenas, coloniales portuguesas y modernas transformaciones urbanas que la convirtieron en un importante centro cultural y tur\xEDstico."},{titulo:"Geograf\xEDa y Clima",contenido:"Situada entre monta\xF1as y el oc\xE9ano Atl\xE1ntico, R\xEDo tiene un clima tropical atl\xE1ntico: veranos calurosos y h\xFAmedos (diciembre\u2013marzo) y inviernos suaves (junio\u2013agosto)."},{titulo:"Qu\xE9 visitar en R\xEDo de Janeiro",itinerario:[{dia:"D\xEDa 1 \u2013 Centro hist\xF3rico y samba",zonas:[{nombre:"Pra\xE7a da Rep\xFAblica / Campo de Santana",descripcion:"Tambi\xE9n conocido como Campo de Santana, este parque en el Centro Viejo es un oasis verde en plena ciudad. Alberga fauna urbana como agut\xEDes (cutias), patos y pavos reales. Ideal para un paseo relajado tras la llegada a R\xEDo.",fotos:["assets/america/sudamerica/brasil/rio/rio-praca-republica.jpg","assets/america/sudamerica/brasil/rio/rio-agutis.jpg"],horario:"Acceso libre todo el d\xEDa",precio:"Gratis"},{nombre:"Real Gabinete Portugu\xEAs de Leitura",descripcion:"Una joya arquitect\xF3nica fundada por la comunidad portuguesa. Considerada una de las bibliotecas m\xE1s bellas del mundo, con estanter\xEDas talladas y miles de vol\xFAmenes raros.",fotos:["assets/america/sudamerica/brasil/rio/rio-gabinete-portugues-leitura.jpg"],horario:"10:00\u201318:00 (consultar horarios actualizados)",precio:"Gratis o simb\xF3lico"},{nombre:"Confiteria Colombo",descripcion:"Cl\xE1sico caf\xE9 literario inaugurado en 1894. Famoso por su decoraci\xF3n art nouveau, sus vitrinas de dulces y su ambiente elegante. Aqu\xED puedes degustar el mejor brigadeiro de R\xEDo.",fotos:["assets/america/sudamerica/brasil/rio/rio-cafeteria-colombo.jpg"],horario:"Lunes a s\xE1bado 09:00\u201318:00",precio:"Consumo en local"},{nombre:"Museu do Amanh\xE3",descripcion:"Museo de ciencia y futuro dise\xF1ado por Santiago Calatrava, situado en la zona portuaria. Muestra exposiciones sobre sostenibilidad, cambio clim\xE1tico y el futuro del planeta.",fotos:["assets/america/sudamerica/brasil/rio/rio-museo-amanha.jpg"],horario:"Martes a domingo 10:00\u201318:00",precio:"Entrada \u2248 30 BRL"},{nombre:"Pedra do Sal",descripcion:"Lugar hist\xF3rico de la cultura afro-carioca y cuna de la samba. Cada lunes por la noche hay m\xFAsica en vivo y espect\xE1culos de samba gratuitos en la calle.",fotos:["assets/america/sudamerica/brasil/rio/rio-pedra-do-sal.jpg"],horario:"Lunes desde las 20:00",precio:"Gratis (solo consumo)"}]},{dia:"D\xEDa 2 - Santa Teresa y Lapa",zonas:[{nombre:"Tranv\xEDa amarillo de Santa Teresa (Bonde)",descripcion:"El hist\xF3rico tranv\xEDa amarillo conecta el centro de R\xEDo con el barrio de Santa Teresa cruzando los Arcos da Lapa. Es un viaje emblem\xE1tico con vistas \xFAnicas y mucho encanto local.",foto:"assets/rio/rio-bonde.jpg",horario:"Cada 15-20 min, de 8:00 a 17:00",precio:"\u2248 20 BRL por trayecto"},{nombre:"Largo dos Guimar\xE3es",descripcion:"Coraz\xF3n del barrio bohemio de Santa Teresa, repleto de bares, galer\xEDas y caf\xE9s art\xEDsticos. Ideal para pasear y disfrutar del ambiente relajado y colorido.",foto:"assets/rio/rio-largo-guimaraes.jpg",horario:"Acceso libre todo el d\xEDa",precio:"Gratis"},{nombre:"Almuerzo en Bar do Mineiro",descripcion:"Restaurante ic\xF3nico de Santa Teresa famoso por su feijoada, platos de Minas Gerais y ambiente acogedor lleno de arte local.",foto:"assets/rio/rio-bar-do-mineiro.jpg",horario:"Martes a domingo 11:00\u201300:00",precio:"Plato principal \u2248 40\u201370 BRL"},{nombre:"Parque das Ru\xEDnas",descripcion:"Centro cultural y mirador ubicado en una antigua mansi\xF3n restaurada. Ofrece vistas espectaculares de la bah\xEDa y el centro de R\xEDo.",foto:"assets/rio/rio-parque-ruinas.jpg",horario:"Martes a domingo 8:00\u201318:00",precio:"Gratis"},{nombre:"Arcos da Lapa",descripcion:"El antiguo acueducto del siglo XVIII es uno de los s\xEDmbolos m\xE1s reconocibles de la ciudad. Hoy sostiene la v\xEDa del tranv\xEDa de Santa Teresa.",foto:"assets/rio/rio-arcos-lapa.jpg",horario:"Acceso libre",precio:"Gratis"},{nombre:"Escadaria Selar\xF3n",descripcion:"Colorida escalera de m\xE1s de 2000 azulejos creada por el artista chileno Jorge Selar\xF3n. Representa un homenaje al pueblo brasile\xF1o y a la humanidad.",foto:"assets/rio/rio-selaron.jpg",horario:"Acceso libre",precio:"Gratis"},{nombre:"Cena en Restaurante Nova Capela",descripcion:"Cl\xE1sico restaurante carioca fundado en 1903, ubicado en Lapa. Famoso por su picanha al ajo, cabrito asado y platos tradicionales brasile\xF1os. Ideal para cerrar el d\xEDa con una buena cena en un entorno aut\xE9ntico y animado.",foto:"assets/rio/rio-nova-capela.jpg",horario:"Abierto todos los d\xEDas 11:30\u201303:00",precio:"Platos principales \u2248 60\u2013120 BRL"}]},{dia:"D\xEDa 3 \u2013 Centro hist\xF3rico y playa de Copacabana",zonas:[{nombre:"Catedral de San Sebasti\xE1n",descripcion:"La catedral principal de R\xEDo de Janeiro, de estilo neog\xF3tico con detalles modernos. Se ubica en el coraz\xF3n del centro hist\xF3rico y destaca por su arquitectura religiosa y su relevancia en la vida eclesi\xE1stica de la ciudad.",foto:"assets/rio/rio-catedral-san-sebastian.jpg",horario:"09:00-17:00",precio:"Gratis (donaciones voluntarias)"},{nombre:"Biblioteca Nacional",descripcion:"Una de las mayores bibliotecas de Am\xE9rica Latina. Alberga una vasta colecci\xF3n de documentos hist\xF3ricos, manuscritos, libros raros y fuentes culturales brasile\xF1as.",foto:"assets/rio/rio-biblioteca-nacional.jpg",horario:"10:00-17:00",precio:"Entrada gratuita"},{nombre:"Teatro Municipal de R\xEDo",descripcion:"Majestuoso teatro de estilo inspirado en la \xD3pera de Par\xEDs, s\xEDmbolo cultural de la ciudad. Ofrece visitas guiadas y ocasionalmente espect\xE1culos de m\xFAsica y baile.",foto:"assets/rio/rio-teatro-municipal.jpg",horario:"10:00-17:00 (visitas guiadas)",precio:"Entrada \u2248 20-30 BRL (seg\xFAn actividad)"},{nombre:"Palacio Tiradentes",descripcion:"Sede simb\xF3lica de la Asamblea Legislativa de R\xEDo. Ubicado en la Pra\xE7a XV, es un edificio hist\xF3rico con importancia pol\xEDtica y patrimonial.",foto:"assets/rio/rio-palacio-tiradentes.jpg",horario:"10:00-17:00",precio:"Entrada gratuita o simb\xF3lica"},{nombre:"Palacio Imperial / Pra\xE7a XV (mercadillo)",descripcion:"En la Plaza XV de Novembro se encuentra el Pa\xE7o Imperial, sede cultural con exposiciones y eventos. En los alrededores organizan mercadillos de artesan\xEDa y cultura local en d\xEDas determinados.",foto:"assets/rio/rio-paco-imperial-centro.jpg",horario:"Durante el d\xEDa, mercadillo por la tarde",precio:"Gratis (solo compras si compras algo)"},{nombre:"Puerto hist\xF3rico de la Pra\xE7a XV y Marina da Gl\xF3ria",descripcion:"Zona portuaria tradicional frente a la Pra\xE7a XV, donde se aprecian las vistas de la Bah\xEDa de Guanabara y los ferris que cruzan hacia Niter\xF3i. Es ideal para dar un paseo junto al mar y ver el movimiento de barcos deportivos en la cercana Marina da Gl\xF3ria.",foto:"assets/rio/rio-marina-gloria.jpg",horario:"Abierto todo el d\xEDa",precio:"Gratis"},{nombre:"Playa de Copacabana (tarde)",descripcion:"Para cerrar el d\xEDa con calma, rel\xE1jate en la famosa playa de Copacabana. Pasea por la orilla, disfruta del mar, los quioscos y el ambiente carioca al atardecer.",foto:"assets/rio/rio-copacabana-beach.jpg",horario:"Acceso libre 24h",precio:"Gratis"}]},{dia:"D\xEDa 4 \u2013 Cristo Redentor, Parque Lage e Ipanema",zonas:[{nombre:"Cristo Redentor (Corcovado)",descripcion:"Una de las Siete Maravillas del Mundo Moderno. La estatua de 30 metros de altura domina la ciudad desde el monte Corcovado. Se recomienda visitar temprano y en un d\xEDa despejado para disfrutar de las mejores vistas panor\xE1micas de R\xEDo y la bah\xEDa.",foto:"assets/rio/rio-cristo-redentor.jpg",horario:"08:00\u201318:00",precio:"Ticket tren o furgoneta oficial \u2248 90\u2013130 BRL seg\xFAn temporada"},{nombre:"Parque Lage y Mansi\xF3n Lage",descripcion:"Hermoso parque al pie del Corcovado con senderos naturales, grutas, un peque\xF1o acuario y fauna local (capibaras, monos y aves tropicales). En su centro se encuentra una mansi\xF3n hist\xF3rica con un caf\xE9 muy popular y vistas al Cristo. Es ideal para relajarse tras la visita al Corcovado.",foto:"assets/rio/rio-parque-lage.jpg",horario:"Diario 08:00\u201317:00",precio:"Gratis"},{nombre:"Almuerzo en Garota de Ipanema",descripcion:"Restaurante famoso donde Vin\xEDcius de Moraes escribi\xF3 la c\xE9lebre canci\xF3n \u201CGarota de Ipanema\u201D. Ofrece platos t\xEDpicos brasile\xF1os como la picanha a la brasa, feijoada y moqueca, con un ambiente local muy animado. Se recomienda reservar con antelaci\xF3n, especialmente los fines de semana.",foto:"assets/rio/rio-garota-ipanema.jpg",horario:"11:00\u201300:00",precio:"Plato principal \u2248 60\u2013100 BRL"},{nombre:"Playa de Ipanema",descripcion:"Considerada una de las playas m\xE1s famosas del mundo, Ipanema ofrece un ambiente joven y cosmopolita. Ideal para disfrutar de la tarde tomando el sol, ba\xF1arse en el Atl\xE1ntico o unirse a los partidos de futv\xF3ley locales. No olvides probar una aut\xE9ntica caipirinha en el quiosco Astor Beach 83, frente al Posto 9.",foto:"assets/rio/rio-ipanema.jpg",horario:"Acceso libre 24h",precio:"Gratis"},{nombre:"Barrio de Leblon",descripcion:"Zona elegante y tranquila contigua a Ipanema, con tiendas, bares y cafeter\xEDas frente al mar. Ideal para dar un paseo al final del d\xEDa antes de subir al mirador.",foto:"assets/rio/rio-leblon.jpg",horario:"Todo el d\xEDa",precio:"Gratis"},{nombre:"Mirador de Arpoador (puesta de sol)",descripcion:"Roca entre Ipanema y Copacabana desde la que se contempla una de las puestas de sol m\xE1s espectaculares de R\xEDo, con aplausos colectivos al atardecer. Un cierre perfecto para el d\xEDa.",foto:"assets/rio/rio-arpoador.jpg",horario:"Abierto todo el d\xEDa (mejor al atardecer)",precio:"Gratis"}]},{dia:"D\xEDa 5 \u2013 Favela, Barrio de Urca y atardecer en el Pan de Az\xFAcar",zonas:[{nombre:"Tour por la Favela Rocinha",descripcion:"Rocinha es la favela m\xE1s grande de Brasil y una de las m\xE1s conocidas del mundo. Se puede visitar con gu\xEDas locales que muestran el d\xEDa a d\xEDa de sus habitantes, el arte urbano, los miradores y los proyectos sociales que buscan transformar la comunidad. Se recomienda hacerlo siempre con una agencia oficial o gu\xEDa certificado.",foto:"assets/rio/rio-rocinha.jpg",horario:"Tours guiados entre 9:00 y 13:00",precio:"\u2248 120\u2013200 BRL (seg\xFAn operador y duraci\xF3n)"},{nombre:"Tour por el Samb\xF3dromo Marqu\xEAs de Sapuca\xED",descripcion:"El Samb\xF3dromo es el coraz\xF3n del Carnaval de R\xEDo de Janeiro, donde desfilan las escuelas de samba durante las festividades. Durante el a\xF1o se pueden realizar visitas guiadas para conocer la historia del carnaval, ver los trajes y carrozas, e incluso participar en talleres de percusi\xF3n o baile. Ideal para sentir el esp\xEDritu del carnaval aunque no sea febrero.",foto:"assets/rio/rio-sambodromo.jpg",horario:"De lunes a s\xE1bado, 10:00\u201317:00",precio:"Entrada \u2248 60 BRL (con gu\xEDa \u2248 100 BRL)",duracion:"Aprox. 1 hora"},{nombre:"Tour por el Estadio Maracan\xE1",descripcion:"Uno de los estadios m\xE1s emblem\xE1ticos del mundo y sede de finales hist\xF3ricas de f\xFAtbol. El recorrido incluye acceso al campo, los vestuarios, la sala de prensa y el peque\xF1o museo donde se exhiben camisetas y objetos de leyendas como Pel\xE9 y Garrincha. Perfecto para los amantes del f\xFAtbol.",foto:"assets/rio/rio-maracana.jpg",horario:"Todos los d\xEDas, 9:00\u201317:00",precio:"Entrada \u2248 80\u2013100 BRL",duracion:"Aprox. 1 hora"},{nombre:"Almuerzo en Garota de Urca",descripcion:"Restaurante tradicional frente a la bah\xEDa de Guanabara. Famoso por su picanha, pescados frescos y ambiente local relajado. Ideal para disfrutar de una comida con vistas al mar antes de la tarde en la playa.",foto:"assets/rio/rio-garota-urca.jpg",horario:"11:00\u201323:00",precio:"Plato principal \u2248 60\u201390 BRL"},{nombre:"Praia Vermelha (Playa Roja)",descripcion:"Peque\xF1a playa al pie del Pan de Az\xFAcar, muy tranquila y con vistas impresionantes a los morros de Urca. Perfecta para descansar, ba\xF1arse o disfrutar de una caipirinha antes de subir al telef\xE9rico. Desde aqu\xED parte el paseo hacia el Pan de Az\xFAcar.",foto:"assets/rio/rio-praia-vermelha.jpg",horario:"Acceso libre todo el d\xEDa",precio:"Gratis"},{nombre:"Subida al Pan de Az\xFAcar (P\xE3o de A\xE7\xFAcar) al atardecer",descripcion:"Una experiencia imprescindible. El telef\xE9rico conecta Praia Vermelha con el Morro da Urca y luego con el Pan de Az\xFAcar. Desde arriba se obtiene una de las vistas m\xE1s ic\xF3nicas del mundo, especialmente al atardecer cuando la ciudad se ilumina frente al oc\xE9ano.",foto:"assets/rio/rio-pao-de-acucar-sunset.jpg",horario:"08:00\u201320:00 (\xFAltima subida recomendada antes de las 18:00)",precio:"Ticket telef\xE9rico \u2248 120 BRL (ida y vuelta)"}]},{dia:"D\xEDa 6 \u2013 Naturaleza en Tijuca y samba en Rio Scenarium",zonas:[{nombre:"Parque Nacional da Tijuca",descripcion:"Uno de los mayores bosques urbanos del mundo, el Parque Nacional da Tijuca es un aut\xE9ntico pulm\xF3n verde en el coraz\xF3n de R\xEDo de Janeiro. Est\xE1 lleno de cascadas, senderos, miradores y fauna tropical (como monos tit\xEDs, capibaras, tucanes y otras aves entre otras muchas especies). Ideal para disfrutar de la naturaleza sin salir de la ciudad.",foto:"assets/rio/rio-tijuca.jpg",horario:"Todos los d\xEDas, 8:00\u201317:00",precio:"Acceso gratuito"},{nombre:"Cascatinha Taunay",descripcion:"Una de las cascadas m\xE1s bonitas y accesibles del parque, con 35 metros de ca\xEDda rodeada de vegetaci\xF3n exuberante. Es un punto perfecto para hacer fotos o descansar antes de continuar alguna de las rutas de senderismo cercanas.",foto:"assets/rio/rio-cascatinha-taunay.jpg",horario:"Acceso libre durante el d\xEDa",precio:"Gratis"},{nombre:"Mirador Vista Chinesa",descripcion:"Uno de los puntos panor\xE1micos m\xE1s impresionantes de R\xEDo, con una pagoda de estilo chino construida en el siglo XIX. Desde aqu\xED se puede contemplar el Corcovado, el Pan de Az\xFAcar y las playas de Ipanema y Leblon. Se llega por una carretera esc\xE9nica entre la selva atl\xE1ntica.",foto:"assets/rio/rio-vista-chinesa.jpg",horario:"Acceso libre durante el d\xEDa",precio:"Gratis"},{nombre:"Ruta de Pedra Bonita",descripcion:"Sendero muy popular dentro del parque que lleva a una cima desde donde se pueden ver el Pan de Az\xFAcar, la Lagoa Rodrigo de Freitas y la playa de S\xE3o Conrado. Desde aqu\xED tambi\xE9n despegan los parapentes y alas delta que sobrevuelan la costa. Nivel de dificultad moderado (1h30 aprox.).",foto:"assets/rio/rio-pedra-bonita.jpg",horario:"6:00\u201317:00",precio:"Gratis"},{nombre:"Cena con espect\xE1culo de samba en Rio Scenarium",descripcion:"Un cl\xE1sico absoluto de la vida nocturna carioca. Rio Scenarium es un restaurante y casa de espect\xE1culos ubicada en un antiguo almac\xE9n en el barrio de Lapa. Decorado con objetos antiguos y lleno de m\xFAsica en vivo, ofrece una experiencia completa: buena comida brasile\xF1a, caipirinhas y samba en directo hasta la madrugada.",foto:"assets/rio/rio-scenarium.jpg",horario:"Mi\xE9rcoles a domingo, 19:00\u20133:00",precio:"Entrada \u2248 65 BRL (sin consumo)"}]},{dia:"D\xEDa 7 (y siguientes) \u2013 Escapada a Ilha Grande",zonas:[{nombre:"Ilha Grande \u2013 Vila do Abra\xE3o",descripcion:"Principal localidad de Ilha Grande y punto de partida de la mayor\xEDa de excursiones. Un lugar encantador sin coches, con calles de arena, posadas y restaurantes frente al mar. Desde aqu\xED parten las rutas y barcos hacia las playas y lagunas m\xE1s hermosas de la isla.",foto:"assets/rio/ilha-abraao.jpg",horario:"Acceso libre (barcos desde Angra dos Reis, Concei\xE7\xE3o de Jacare\xED o Mangaratiba)",precio:"Traslado mar\xEDtimo \u2248 40\u201380 BRL por trayecto"},{nombre:"Excursi\xF3n a Lagoa Azul, Lagoa Verde y Gruta de Acai\xE1",descripcion:"Tour en lancha o barco que recorre algunas de las zonas m\xE1s famosas de Ilha Grande. La Lagoa Azul y la Lagoa Verde destacan por sus aguas cristalinas, ideales para hacer snorkel y avistar peces y delfines. La Gruta de Acai\xE1 es una cueva submarina con un curioso efecto luminoso turquesa.",foto:"assets/rio/ilha-lagoa-azul.jpg",horario:"Excursiones diarias, 9:00\u201315:00",precio:"\u2248 150\u2013250 BRL seg\xFAn tipo de embarcaci\xF3n"},{nombre:"Praia Lopes Mendes",descripcion:"Considerada una de las playas m\xE1s bonitas de Brasil, Lopes Mendes se alcanza tras una caminata de unas 2 horas desde Vila do Abra\xE3o o tomando un barco hasta Praia do Pouso y caminando 20 minutos m\xE1s. Arena blanca, olas perfectas para surfistas y un entorno virgen hacen de esta playa un para\xEDso natural.",foto:"assets/rio/ilha-lopes-mendes.jpg",horario:"Acceso libre durante el d\xEDa",precio:"Gratis"},{nombre:"Sendero a Praia da Feiticeira",descripcion:"Trilha (sendero) de dificultad moderada que parte desde Vila do Abra\xE3o y conduce a una peque\xF1a cascada y a la playa de la Feiticeira, ideal para nadar y relajarse. Se puede combinar con paseo en taxi-boat de regreso.",foto:"assets/rio/ilha-feiticeira.jpg",horario:"Acceso libre (mejor entre 8:00 y 16:00)",precio:"Gratis (opcional taxi-boat \u2248 30 BRL)"},{nombre:"Saco do C\xE9u y Freguesia de Santana",descripcion:"Peque\xF1as bah\xEDas y pueblos con encanto accesibles por barco o kayak. Saco do C\xE9u es famoso por sus aguas tranquilas y restaurantes sobre el mar. Freguesia de Santana alberga una antigua iglesia colonial y playas perfectas para hacer snorkel.",foto:"assets/rio/ilha-saco-do-ceu.jpg",horario:"Excursiones diarias desde Vila do Abra\xE3o",precio:"\u2248 100\u2013180 BRL (tour en barco)"},{nombre:"Trilha a Dois Rios",descripcion:"Una de las caminatas m\xE1s largas de Ilha Grande (cerca de 3 horas desde Abra\xE3o), conduce al antiguo pueblo de Dois Rios y su playa paradis\xEDaca. Antiguamente aqu\xED se encontraba una prisi\xF3n hoy abandonada. Ideal para los amantes del senderismo y la naturaleza salvaje.",foto:"assets/rio/ilha-dois-rios.jpg",horario:"8:00\u201317:00",precio:"Gratis"},{nombre:"Actividades adicionales",descripcion:"Adem\xE1s de las excursiones, en Ilha Grande puedes practicar kayak, paddle surf o snorkel cerca de Vila do Abra\xE3o. Es un destino ideal para relajarse varios d\xEDas, disfrutar de mariscos frescos, atardeceres sobre el mar y el ambiente isle\xF1o.",foto:"assets/rio/ilha-kayak.jpg",horario:"Seg\xFAn actividad (ma\xF1ana y tarde)",precio:"Kayak/snorkel \u2248 50\u2013100 BRL"}]}]},{titulo:"Gastronom\xEDa",platos:[{nombre:"Caipirinha",descripcion:"El c\xF3ctel nacional de Brasil preparado con cacha\xE7a, lima, az\xFAcar y hielo picado. Refrescante y potente, se disfruta especialmente en los chiringuitos de playa como el Astor Beach 83 en Ipanema.",foto:"assets/rio/rio-caipirinha.jpg",precio:"15\u201325 BRL seg\xFAn el bar"},{nombre:"Picanha (corte de carne brasile\xF1a)",descripcion:"Corte de carne muy tradicional en Brasil, parte de la parrillada. Suele servirse en los \u201Cchurrascos\u201D locales: carne tierna, con sabor pronunciado y a veces acompa\xF1ada de guarniciones como arroz, farofa o verduras.",foto:"assets/rio/rio-picanha.jpg",precio:"Depende del restaurante, moderado-alto seg\xFAn calidad"},{nombre:"Brigadeiro",descripcion:"Dulce t\xEDpico brasile\xF1o hecho a base de leche condensada, cacao, mantequilla y cubierto con chocolate granulado. En la Confiteria Colombo tienes que degustar \u201Cel mejor brigadeiro de R\xEDo\u201D como parte de tu paseo culinario.",foto:"assets/rio/rio-brigadeiro.jpg",precio:"Precio local de un dulce, asequible"},{nombre:"Feijoada",descripcion:"Guiso tradicional brasile\xF1o a base de frijoles negros y carne, normalmente acompa\xF1ado de arroz, farofa y naranja.",foto:"assets/rio/rio-feijoada.jpg",precioOrientativo:"30\u201370 BRL"},{nombre:"Moqueca",descripcion:"Estofado de pescado o marisco con leche de coco, aceite de dend\xEA y cilantro, t\xEDpico de la cocina brasile\xF1a costera. Muy arom\xE1tico y servido en cazuela de barro.",foto:"assets/rio/rio-moqueca.jpg",precio:"40\u201390 BRL"},{nombre:"Guayaba (fruta local)",descripcion:"Fruta tropical abundante en Brasil. La guayaba es jugosa y puede encontrarse en mercados callejeros; excelente para un snack fresco entre paseos.",foto:"assets/rio/rio-guayaba.jpg",precio:"Muy econ\xF3mica (venta callejera)"}]},{titulo:"Cultura y Tradiciones",contenido:"R\xEDo es mundialmente famosa por su Carnaval, samba, escuelas de samba y una escena musical y art\xEDstica muy activa. Tambi\xE9n destacan festivales, teatro y la mezcla cultural de sus barrios."},{titulo:"Consejos pr\xE1cticos",contenido:"Evita llevar objetos de valor a la vista en zonas muy tur\xEDsticas; usa transporte autorizado por la noche; cambia moneda en lugares oficiales; y prueba los mercados locales para gastronom\xEDa y artesan\xEDa."}]};function IM(e,t){if(e&1&&(me(0,"img",11),kt(1,"imgUrl")),e&2){let n=V(2);S("src",zt(1,2,n.guide.flag,600),En)("alt",n.guide.nombre+" flag")}}function TM(e,t){if(e&1&&(me(0,"img",11),kt(1,"imgUrl")),e&2){let n=V(2);S("src",zt(1,2,n.guide.flag2,600),En)("alt",n.guide.nombre+" second flag")}}function wM(e,t){if(e&1&&me(0,"app-info-general",12),e&2){let n=V(2);S("infoGeneral",n.guide.infoGeneral)}}function SM(e,t){if(e&1&&(me(0,"img",23),kt(1,"imgUrl")),e&2){let n=V().$implicit;Se("no-crop",n.noCropGallery),S("src",zt(1,4,n.foto,1200),En)("alt",n.nombre)}}function MM(e,t){if(e&1&&(me(0,"img",26),kt(1,"imgUrl")),e&2){let n=t.$implicit,o=V(2).$implicit;Se("no-crop",o.noCropGallery),S("src",zt(1,4,n,1200),En)("alt",o.nombre)}}function AM(e,t){if(e&1&&(D(0,"div",24),X(1,MM,2,7,"img",25),h()),e&2){let n=V().$implicit;_(),S("ngForOf",n.fotos)}}function xM(e,t){if(e&1&&(D(0,"p",27)(1,"mat-icon"),b(2,"badge"),h(),D(3,"span")(4,"strong"),b(5,"Acceso:"),h(),b(6),h()()),e&2){let n=V().$implicit;_(6),le(" ",n.acceso)}}function RM(e,t){if(e&1&&(D(0,"p",27)(1,"mat-icon"),b(2,"event"),h(),D(3,"span")(4,"strong"),b(5," Fecha:"),h(),b(6),h()()),e&2){let n=V().$implicit;_(6),le(" ",n.fecha)}}function NM(e,t){if(e&1&&(D(0,"p",27)(1,"mat-icon"),b(2,"schedule"),h(),D(3,"span")(4,"strong"),b(5," Horario:"),h(),b(6),h()()),e&2){let n=V().$implicit;_(6),le(" ",n.horario)}}function PM(e,t){if(e&1&&(D(0,"p",27)(1,"mat-icon"),b(2,"payments"),h(),D(3,"span")(4,"strong"),b(5," Precio:"),h(),b(6),h()()),e&2){let n=V().$implicit;_(6),le(" ",n.precio)}}function jM(e,t){if(e&1&&(D(0,"div",18)(1,"h3",19),b(2),h(),D(3,"p"),b(4),h(),X(5,SM,2,7,"img",20)(6,AM,2,1,"div",21)(7,xM,7,1,"p",22)(8,RM,7,1,"p",22)(9,NM,7,1,"p",22)(10,PM,7,1,"p",22),h()),e&2){let n=t.$implicit;_(2),Ue(n.nombre),_(2),Ue(n.descripcion),_(),S("ngIf",n.foto),_(),S("ngIf",n.fotos==null?null:n.fotos.length),_(),S("ngIf",n.acceso),_(),S("ngIf",n.fecha),_(),S("ngIf",n.horario),_(),S("ngIf",n.precio)}}function OM(e,t){if(e&1&&(D(0,"mat-expansion-panel")(1,"mat-expansion-panel-header")(2,"mat-panel-title"),b(3),h()(),X(4,jM,11,8,"div",17),h()),e&2){let n=t.$implicit;_(3),Ue(n.dia),_(),S("ngForOf",n.zonas)}}function FM(e,t){if(e&1&&(D(0,"mat-accordion"),X(1,OM,5,2,"mat-expansion-panel",16),h()),e&2){let n=V().$implicit;_(),S("ngForOf",n.itinerario)}}function LM(e,t){if(e&1&&(me(0,"img",33),kt(1,"imgUrl")),e&2){let n=V().$implicit;S("src",zt(1,2,n.foto,900),En)("alt",n.nombre)}}function kM(e,t){if(e&1&&(me(0,"img",36),kt(1,"imgUrl")),e&2){let n=t.$implicit,o=V(2).$implicit;S("src",zt(1,2,n,900),En)("alt",o.nombre)}}function zM(e,t){if(e&1&&(D(0,"div",34),X(1,kM,2,5,"img",35),h()),e&2){let n=V().$implicit;_(),S("ngForOf",n.fotos)}}function qM(e,t){if(e&1&&(D(0,"p")(1,"mat-icon"),b(2,"event"),h(),D(3,"strong"),b(4,"Fecha:"),h(),b(5),h()),e&2){let n=V().$implicit;_(5),le(" ",n.fecha)}}function BM(e,t){if(e&1&&(D(0,"p")(1,"mat-icon"),b(2,"schedule"),h(),D(3,"strong"),b(4,"Horario:"),h(),b(5),h()),e&2){let n=V().$implicit;_(5),le(" ",n.horario)}}function VM(e,t){if(e&1&&(D(0,"p")(1,"mat-icon"),b(2,"payments"),h(),D(3,"strong"),b(4,"Precio:"),h(),b(5),h()),e&2){let n=V().$implicit;_(5),le(" ",n.precio)}}function UM(e,t){if(e&1&&(D(0,"p")(1,"strong"),b(2,"Precio:"),h(),b(3),h()),e&2){let n=V().$implicit;_(3),le(" ",n.precioOrientativo)}}function HM(e,t){if(e&1&&(D(0,"div",30)(1,"h3"),b(2),h(),D(3,"p"),b(4),h(),X(5,LM,2,5,"img",31)(6,zM,2,1,"div",32)(7,qM,6,1,"p",14)(8,BM,6,1,"p",14)(9,VM,6,1,"p",14)(10,UM,4,1,"p",14),h()),e&2){let n=t.$implicit;_(2),Ue(n.nombre),_(2),Ue(n.descripcion),_(),S("ngIf",n.foto),_(),S("ngIf",n.fotos==null?null:n.fotos.length),_(),S("ngIf",n.fecha),_(),S("ngIf",n.horario),_(),S("ngIf",n.precio),_(),S("ngIf",n.precioOrientativo)}}function $M(e,t){if(e&1&&(D(0,"div",28),X(1,HM,11,8,"div",29),h()),e&2){let n=V().$implicit;_(),S("ngForOf",n.lugares||n.platos)}}function GM(e,t){if(e&1&&(D(0,"p"),b(1),h()),e&2){let n=V().$implicit;_(),Ue(n.contenido)}}function WM(e,t){if(e&1&&(D(0,"div",13)(1,"h2"),b(2),h(),X(3,FM,2,1,"mat-accordion",14)(4,$M,2,1,"div",15)(5,GM,2,1,"p",14),h()),e&2){let n=t.$implicit;_(2),Ue(n.titulo),_(),S("ngIf",n.itinerario),_(),S("ngIf",(n.lugares==null?null:n.lugares.length)||(n.platos==null?null:n.platos.length)),_(),S("ngIf",!n.itinerario&&!n.lugares&&!n.platos)}}function JM(e,t){if(e&1){let n=Lt();D(0,"button",37),Re("click",function(){pn(n);let r=V(2);return fn(r.scrollToTop())}),D(1,"mat-icon",38),b(2,"flight"),h()()}}function QM(e,t){if(e&1&&(D(0,"div",2)(1,"div",3)(2,"div",4)(3,"h1",5),b(4),h(),D(5,"div",6),X(6,IM,2,5,"img",7)(7,TM,2,5,"img",7),h()(),D(8,"p"),b(9),h(),X(10,wM,1,1,"app-info-general",8)(11,WM,6,4,"div",9),h(),X(12,JM,3,0,"button",10),h()),e&2){let n=V();S("ngStyle",n.pageStyle),_(4),Ue(n.guide.nombre),_(),Se("double-flags",n.guide.flag2),_(),S("ngIf",n.guide.flag),_(),S("ngIf",n.guide.flag2),_(2),Ue(n.guide.descripcion),_(),S("ngIf",n.guide.infoGeneral),_(),S("ngForOf",n.guide.secciones),_(),S("ngIf",n.showScrollTop)}}function ZM(e,t){e&1&&(D(0,"div",39),me(1,"img",40),D(2,"h2"),b(3,"Bienvenido a AvenTourArte"),h(),D(4,"p",41),b(5,'\u2728 "Explora, Descubre, Comparte"'),h(),D(6,"p",41),b(7,'\u{1F30D} "Viaja con arte y emoci\xF3n"'),h()())}var li=class e{constructor(t,n){this.route=t;this.img=n}guide=null;pageStyle={};showScrollTop=!1;scrollIcon="flight";onScroll(){this.showScrollTop=(window.scrollY||0)>350}scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}guides={"europa/espana/andalucia/cadiz/jerez-de-la-frontera":DE,"europa/espana/andalucia/cadiz/trebujena":_E,"europa/espana/andalucia/sevilla/mairena-del-aljarafe":IE,"europa/italia/roma-vaticano":TE,"europa/rumania/bucarest":wE,"america/sudamerica/brasil/rio-de-janeiro":SE};ngOnInit(){this.route.paramMap.subscribe(t=>{let n=t.get("path");n&&this.guides[n]?(this.guide=this.guides[n],this.applyGuideStyle(this.guide)):(this.guide=null,this.pageStyle={})})}applyGuideStyle(t){let n=window.matchMedia("(max-width: 768px)").matches;this.pageStyle={"--bg-image":`url(${this.img.background(t.background,n)})`,"--bg-pos":t.bgPos??"50% 50%","--bg-pos-mobile":t.bgPosMobile??t.bgPos??"50% 50%","--bg-dim":String(t.bgDim??.1),"--bg-size":t.bgSize??"cover","--bg-size-mobile":t.bgSizeMobile??t.bgSize??"cover","--flag-image":`url(${this.img.url(t.flag,{w:1400,crop:"fit"})})`,"--flag-opacity":String(t.flagOverlay?t.flagOpacity??.18:0),"--flag-opacity-mobile":String(t.flagOverlay?t.flagOpacityMobile??.22:0),"--flag-size":t.flagSize??"75%","--flag-size-mobile":t.flagSizeMobile??"95%"}}groupByDay(t){let n=[];for(let r=0;r<t.length;r+=3)n.push({dia:`D\xEDa ${Math.floor(r/3)+1}`,lugares:t.slice(r,r+3)});return n}static \u0275fac=function(n){return new(n||e)(K(rn),K(Lr))};static \u0275cmp=ue({type:e,selectors:[["app-guide-viewer"]],hostBindings:function(n,o){n&1&&Re("scroll",function(){return o.onScroll()},Wd)},decls:3,vars:2,consts:[["welcome",""],["class","guide-page",3,"ngStyle",4,"ngIf","ngIfElse"],[1,"guide-page",3,"ngStyle"],[1,"guide-content"],[1,"city-header"],[1,"city-title"],[1,"city-flags"],["class","city-flag",3,"src","alt",4,"ngIf"],[3,"infoGeneral",4,"ngIf"],["class","guide-section",4,"ngFor","ngForOf"],["class","scroll-top","aria-label","Subir arriba",3,"click",4,"ngIf"],[1,"city-flag",3,"src","alt"],[3,"infoGeneral"],[1,"guide-section"],[4,"ngIf"],["class","grid",4,"ngIf"],[4,"ngFor","ngForOf"],["class","zone-card",4,"ngFor","ngForOf"],[1,"zone-card"],[1,"lugar-nombre"],[3,"src","alt","no-crop",4,"ngIf"],["class","zone-photos",4,"ngIf"],["class","info-line",4,"ngIf"],[3,"src","alt"],[1,"zone-photos"],["class","zone-gallery-photo",3,"src","alt","no-crop",4,"ngFor","ngForOf"],[1,"zone-gallery-photo",3,"src","alt"],[1,"info-line"],[1,"grid"],["class","item-card",4,"ngFor","ngForOf"],[1,"item-card"],["loading","lazy",3,"src","alt",4,"ngIf"],["class","item-photos",4,"ngIf"],["loading","lazy",3,"src","alt"],[1,"item-photos"],["class","item-gallery-photo","loading","lazy",3,"src","alt",4,"ngFor","ngForOf"],["loading","lazy",1,"item-gallery-photo",3,"src","alt"],["aria-label","Subir arriba",1,"scroll-top",3,"click"],[1,"scroll-top-icon"],[1,"welcome"],["src","assets/logo.png","alt","AvenTourArte",1,"welcome-logo"],[1,"slogan"]],template:function(n,o){if(n&1&&X(0,QM,13,10,"div",1)(1,ZM,8,0,"ng-template",null,0,Np),n&2){let r=xp(2);S("ngIf",o.guide)("ngIfElse",r)}},dependencies:[We,Vt,dt,Yp,il,dE,uE,dm,pm,lE,bE,yE,sl],styles:['@charset "UTF-8";.welcome[_ngcontent-%COMP%]{text-align:center;padding:3rem;color:#2c3e50}.welcome[_ngcontent-%COMP%]   .slogan[_ngcontent-%COMP%]{font-style:italic;font-size:1.2rem;margin:.5rem 0;color:#34495e}.welcome-logo[_ngcontent-%COMP%]{max-width:200px;margin-bottom:1rem}.scroll-top[_ngcontent-%COMP%]{position:fixed;right:18px;bottom:calc(var(--footer-height) + 6px + env(safe-area-inset-bottom));z-index:99999;width:52px;height:52px;border-radius:999px;border:none;display:grid;place-items:center;cursor:pointer;background:linear-gradient(135deg,#3498db,#2ecc71);color:#fff;box-shadow:0 10px 24px #00000047;transition:transform .2s ease,box-shadow .2s ease;animation:_ngcontent-%COMP%_floatTravel 3s ease-in-out infinite;pointer-events:auto}@keyframes _ngcontent-%COMP%_floatTravel{0%{transform:translateY(0)}50%{transform:translateY(-4px)}to{transform:translateY(0)}}.scroll-top[_ngcontent-%COMP%]:hover{transform:translateY(-6px) scale(1.06);box-shadow:0 14px 30px #00000057}.scroll-top-icon[_ngcontent-%COMP%]{font-size:26px;transition:transform .25s ease}.scroll-top[_ngcontent-%COMP%]:hover   .scroll-top-icon[_ngcontent-%COMP%]{transform:rotate(-18deg) translateY(-1px)}.guide-page[_ngcontent-%COMP%]{position:relative;width:100%;min-height:100vh;display:flex;justify-content:center;align-items:flex-start;padding:2rem 1rem;overflow-x:hidden}.guide-page[_ngcontent-%COMP%]:before{content:"";position:fixed;inset:0;z-index:-3;background-image:linear-gradient(rgba(0,0,0,var(--bg-dim, .1)),rgba(0,0,0,var(--bg-dim, .1))),var(--bg-image);background-size:var(--bg-size, cover);background-repeat:no-repeat;background-position:var(--bg-pos, 50% 50%);transform:translateZ(0);will-change:transform}.guide-page[_ngcontent-%COMP%]:after{content:"";position:fixed;inset:0;z-index:-2;background-image:var(--flag-image);background-repeat:no-repeat;background-position:center;background-size:var(--flag-size, 75%);opacity:var(--flag-opacity, .2);mix-blend-mode:normal;filter:saturate(1.05) contrast(1.02) brightness(1.03);pointer-events:none}.city-header[_ngcontent-%COMP%]{text-align:center;margin-bottom:20px;display:flex;flex-direction:column;align-items:center}.city-title[_ngcontent-%COMP%]{font-size:clamp(2.6rem,5vw,4.5rem);line-height:1.05;font-weight:900;margin:0 0 20px;max-width:10ch;text-wrap:balance}.city-flags[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;gap:20px;flex-wrap:wrap;margin-top:12px}.city-flag[_ngcontent-%COMP%]{width:280px;height:auto;max-width:100%;object-fit:contain;display:block;border-radius:6px;box-shadow:0 2px 6px #0000004d;background:#ffffff59}.city-flags.double-flags[_ngcontent-%COMP%]   .city-flag[_ngcontent-%COMP%]{width:220px;height:auto}.lugar-nombre[_ngcontent-%COMP%]{position:relative;display:inline-block;font-weight:600}.lugar-nombre[_ngcontent-%COMP%]:after{content:"";position:absolute;left:0;bottom:-4px;width:100%;height:2px;background:currentColor;opacity:.6}.guide-content[_ngcontent-%COMP%]{width:100%;max-width:1280px;background-color:#ffffffd9;border-radius:12px;padding:1.25rem;margin-bottom:1rem;box-shadow:0 6px 20px #0003;z-index:1;position:relative}.guide-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.12rem;line-height:1.75}.travel-info[_ngcontent-%COMP%]{margin:25px auto;padding:20px;border-radius:14px;background:#ffffffeb;box-shadow:0 3px 12px #00000026;display:grid;grid-template-columns:1fr 1fr;gap:12px 20px;font-size:1rem;max-width:900px}@media (max-width: 700px){.travel-info[_ngcontent-%COMP%]{grid-template-columns:1fr}}.travel-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding-bottom:6px;border-bottom:1px solid rgba(0,0,0,.1)}.travel-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{margin-right:4px}.travel-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]:last-child{border-bottom:none}.travel-info[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{font-size:1.3rem;width:22px;text-align:center}.guide-section[_ngcontent-%COMP%]{margin:40px 0}.guide-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.9rem;border-bottom:2px solid #ccc;padding-bottom:8px;margin-bottom:20px;line-height:1.3}.guide-section[_ngcontent-%COMP%]   .grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}.guide-section[_ngcontent-%COMP%]   .item-card[_ngcontent-%COMP%]{background-color:#ffffffd9;border-radius:10px;padding:15px;box-shadow:0 2px 8px #0000001a;text-align:center}.guide-section[_ngcontent-%COMP%]   .item-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 10px;font-size:1.3rem;line-height:1.5}.guide-section[_ngcontent-%COMP%]   .item-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:auto;max-height:380px;border-radius:8px;margin-bottom:10px;object-fit:contain;display:block;background:#ffffff59}.guide-section[_ngcontent-%COMP%]   .item-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1rem;line-height:1.6;white-space:pre-line;margin:5px 0;color:#333}.guide-section[_ngcontent-%COMP%]   .item-photos[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;gap:.75rem;margin-top:.75rem}.guide-section[_ngcontent-%COMP%]   .item-gallery-photo[_ngcontent-%COMP%]{width:100%;height:220px;object-fit:cover;border-radius:12px}.zone-card[_ngcontent-%COMP%]{background-color:#ffffffe6;border-radius:10px;padding:15px;box-shadow:0 2px 8px #0000001f;width:100%;max-width:700px;margin:0 auto 24px}.zone-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:0;font-size:1.2rem}.zone-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1rem;line-height:1.6;color:#333;white-space:pre-line}.zone-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:auto;object-fit:contain;border-radius:8px;margin:10px 0;display:block}.zone-photos[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:14px 0 10px;align-items:stretch}.zone-gallery-photo[_ngcontent-%COMP%]{width:100%;height:380px!important;object-fit:cover!important;border-radius:8px;display:block;background:#ffffff59}.zone-gallery-photo.no-crop[_ngcontent-%COMP%]{object-fit:contain;background:#fff3}@media (max-width: 768px){.city-header[_ngcontent-%COMP%]{margin-bottom:16px}.city-title[_ngcontent-%COMP%]{font-size:2.9rem;line-height:1.08;max-width:8ch;margin-bottom:16px}.city-flags[_ngcontent-%COMP%]{gap:16px;align-items:center}.city-flag[_ngcontent-%COMP%]{width:220px;height:auto}.city-flags.double-flags[_ngcontent-%COMP%]   .city-flag[_ngcontent-%COMP%]{width:140px;height:auto}.guide-content[_ngcontent-%COMP%]{padding:.75rem}.guide-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.04rem;line-height:1.65}.zone-card[_ngcontent-%COMP%]{max-width:100%;width:100%;padding:12px;margin:0 0 20px}.zone-card[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:calc(100% + 24px);max-width:none;margin:12px 0 12px -12px;border-radius:12px;display:block;height:auto;object-fit:cover}.zone-photos[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:12px}.zone-gallery-photo[_ngcontent-%COMP%]{width:calc(100% + 24px);max-width:none;margin-left:-12px;border-radius:12px;height:auto!important;max-height:340px;object-fit:contain!important}.zone-gallery-photo.no-crop[_ngcontent-%COMP%]{object-fit:contain!important;background:#fff3}.zone-photos[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:auto;max-height:340px;object-fit:contain}.zone-photos[_ngcontent-%COMP%]   img.no-crop[_ngcontent-%COMP%]{object-fit:contain;background:#fff3}.scroll-top[_ngcontent-%COMP%]{width:48px;height:48px;right:14px;bottom:calc(var(--footer-height) + 14px + env(safe-area-inset-bottom))}.guide-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.7rem;line-height:1.35}.item-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:260px}.item-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:5px;font-size:1.2rem;line-height:1.4}.guide-page[_ngcontent-%COMP%]:before{background-position:var(--bg-pos-mobile, var(--bg-pos, 50% 50%));background-size:var(--bg-size-mobile, var(--bg-size, cover))}.guide-page[_ngcontent-%COMP%]:after{opacity:var(--flag-opacity-mobile, var(--flag-opacity, .26));background-size:var(--flag-size-mobile, var(--flag-size, 80%))}.mat-expansion-panel-header[_ngcontent-%COMP%]{height:auto!important;min-height:96px;padding-top:12px;padding-bottom:12px;align-items:center}.mat-expansion-panel-header[_ngcontent-%COMP%]   .mat-content[_ngcontent-%COMP%]{align-items:center}.mat-expansion-panel-header[_ngcontent-%COMP%]   .mat-expansion-panel-header-title[_ngcontent-%COMP%]{white-space:normal!important;line-height:1.3;font-size:1rem;margin-right:12px}}']})};var ME=[{path:"",component:li},{path:"guia/:path",component:li}];uf(Zc,{providers:[Ki(df),Wf(ME)]}).catch(e=>console.error(e));
