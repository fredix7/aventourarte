var xE=Object.defineProperty,RE=Object.defineProperties;var NE=Object.getOwnPropertyDescriptors;var fm=Object.getOwnPropertySymbols;var PE=Object.prototype.hasOwnProperty,OE=Object.prototype.propertyIsEnumerable;var mm=(e,n,t)=>n in e?xE(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,y=(e,n)=>{for(var t in n||={})PE.call(n,t)&&mm(e,t,n[t]);if(fm)for(var t of fm(n))OE.call(n,t)&&mm(e,t,n[t]);return e},$=(e,n)=>RE(e,NE(n));var Nr=(e,n,t)=>new Promise((r,o)=>{var i=c=>{try{s(t.next(c))}catch(l){o(l)}},a=c=>{try{s(t.throw(c))}catch(l){o(l)}},s=c=>c.done?r(c.value):Promise.resolve(c.value).then(i,a);s((t=t.apply(e,n)).next())});var ll;function ua(){return ll}function Tt(e){let n=ll;return ll=e,n}var hm=Symbol("NotFound");function Pr(e){return e===hm||e?.name==="\u0275NotFound"}function ul(e,n){return Object.is(e,n)}var Se=null,da=!1,dl=1,FE=null,Ne=Symbol("SIGNAL");function R(e){let n=Se;return Se=e,n}function fa(){return Se}var Or={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Bo(e){if(da)throw new Error("");if(Se===null)return;Se.consumerOnSignalRead(e);let n=Se.producersTail;if(n!==void 0&&n.producer===e)return;let t,r=Se.recomputing;if(r&&(t=n!==void 0?n.nextProducer:Se.producers,t!==void 0&&t.producer===e)){Se.producersTail=t,t.lastReadVersion=e.version;return}let o=e.consumersTail;if(o!==void 0&&o.consumer===Se&&(!r||LE(o,Se)))return;let i=Lr(Se),a={producer:e,consumer:Se,nextProducer:t,prevConsumer:o,lastReadVersion:e.version,nextConsumer:void 0};Se.producersTail=a,n!==void 0?n.nextProducer=a:Se.producers=a,i&&vm(e,a)}function gm(){dl++}function pl(e){if(!(Lr(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===dl)){if(!e.producerMustRecompute(e)&&!kr(e)){pa(e);return}e.producerRecomputeValue(e),pa(e)}}function fl(e){if(e.consumers===void 0)return;let n=da;da=!0;try{for(let t=e.consumers;t!==void 0;t=t.nextConsumer){let r=t.consumer;r.dirty||kE(r)}}finally{da=n}}function ml(){return Se?.consumerAllowSignalWrites!==!1}function kE(e){e.dirty=!0,fl(e),e.consumerMarkedDirty?.(e)}function pa(e){e.dirty=!1,e.lastCleanEpoch=dl}function Fr(e){return e&&(e.producersTail=void 0,e.recomputing=!0),R(e)}function zo(e,n){if(R(n),!e)return;e.recomputing=!1;let t=e.producersTail,r=t!==void 0?t.nextProducer:e.producers;if(r!==void 0){if(Lr(e))do r=hl(r);while(r!==void 0);t!==void 0?t.nextProducer=void 0:e.producers=void 0}}function kr(e){for(let n=e.producers;n!==void 0;n=n.nextProducer){let t=n.producer,r=n.lastReadVersion;if(r!==t.version||(pl(t),r!==t.version))return!0}return!1}function Wn(e){if(Lr(e)){let n=e.producers;for(;n!==void 0;)n=hl(n)}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0}function vm(e,n){let t=e.consumersTail,r=Lr(e);if(t!==void 0?(n.nextConsumer=t.nextConsumer,t.nextConsumer=n):(n.nextConsumer=void 0,e.consumers=n),n.prevConsumer=t,e.consumersTail=n,!r)for(let o=e.producers;o!==void 0;o=o.nextProducer)vm(o.producer,o)}function hl(e){let n=e.producer,t=e.nextProducer,r=e.nextConsumer,o=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,r!==void 0?r.prevConsumer=o:n.consumersTail=o,o!==void 0)o.nextConsumer=r;else if(n.consumers=r,!Lr(n)){let i=n.producers;for(;i!==void 0;)i=hl(i)}return t}function Lr(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function gl(e){FE?.(e)}function LE(e,n){let t=n.producersTail;if(t!==void 0){let r=n.producers;do{if(r===e)return!0;if(r===t)break;r=r.nextProducer}while(r!==void 0)}return!1}function jE(){throw new Error}var ym=jE;function bm(e){ym(e)}function vl(e){ym=e}var BE=null;function yl(e,n){let t=Object.create(ma);t.value=e,n!==void 0&&(t.equal=n);let r=()=>Em(t);return r[Ne]=t,gl(t),[r,a=>jr(t,a),a=>bl(t,a)]}function Em(e){return Bo(e),e.value}function jr(e,n){ml()||bm(e),e.equal(e.value,n)||(e.value=n,zE(e))}function bl(e,n){ml()||bm(e),jr(e,n(e.value))}var ma=$(y({},Or),{equal:ul,value:void 0,kind:"signal"});function zE(e){e.version++,gm(),fl(e),BE?.(e)}function N(e){return typeof e=="function"}function Br(e){let t=e(r=>{Error.call(r),r.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var ha=Br(e=>function(t){e(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((r,o)=>`${o+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Zn(e,n){if(e){let t=e.indexOf(n);0<=t&&e.splice(t,1)}}var Z=class e{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let i of t)i.remove(this);else t.remove(this);let{initialTeardown:r}=this;if(N(r))try{r()}catch(i){n=i instanceof ha?i.errors:[i]}let{_finalizers:o}=this;if(o){this._finalizers=null;for(let i of o)try{Cm(i)}catch(a){n=n??[],a instanceof ha?n=[...n,...a.errors]:n.push(a)}}if(n)throw new ha(n)}}add(n){var t;if(n&&n!==this)if(this.closed)Cm(n);else{if(n instanceof e){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(n)}}_hasParent(n){let{_parentage:t}=this;return t===n||Array.isArray(t)&&t.includes(n)}_addParent(n){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(n),t):t?[t,n]:n}_removeParent(n){let{_parentage:t}=this;t===n?this._parentage=null:Array.isArray(t)&&Zn(t,n)}remove(n){let{_finalizers:t}=this;t&&Zn(t,n),n instanceof e&&n._removeParent(this)}};Z.EMPTY=(()=>{let e=new Z;return e.closed=!0,e})();var El=Z.EMPTY;function ga(e){return e instanceof Z||e&&"closed"in e&&N(e.remove)&&N(e.add)&&N(e.unsubscribe)}function Cm(e){N(e)?e():e.unsubscribe()}var at={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var zr={setTimeout(e,n,...t){let{delegate:r}=zr;return r?.setTimeout?r.setTimeout(e,n,...t):setTimeout(e,n,...t)},clearTimeout(e){let{delegate:n}=zr;return(n?.clearTimeout||clearTimeout)(e)},delegate:void 0};function va(e){zr.setTimeout(()=>{let{onUnhandledError:n}=at;if(n)n(e);else throw e})}function Vo(){}var _m=Cl("C",void 0,void 0);function Dm(e){return Cl("E",void 0,e)}function Im(e){return Cl("N",e,void 0)}function Cl(e,n,t){return{kind:e,value:n,error:t}}var Qn=null;function Vr(e){if(at.useDeprecatedSynchronousErrorHandling){let n=!Qn;if(n&&(Qn={errorThrown:!1,error:null}),e(),n){let{errorThrown:t,error:r}=Qn;if(Qn=null,t)throw r}}else e()}function wm(e){at.useDeprecatedSynchronousErrorHandling&&Qn&&(Qn.errorThrown=!0,Qn.error=e)}var Yn=class extends Z{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,ga(n)&&n.add(this)):this.destination=HE}static create(n,t,r){return new Gt(n,t,r)}next(n){this.isStopped?Dl(Im(n),this):this._next(n)}error(n){this.isStopped?Dl(Dm(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?Dl(_m,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},VE=Function.prototype.bind;function _l(e,n){return VE.call(e,n)}var Il=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:t}=this;if(t.next)try{t.next(n)}catch(r){ya(r)}}error(n){let{partialObserver:t}=this;if(t.error)try{t.error(n)}catch(r){ya(r)}else ya(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(t){ya(t)}}},Gt=class extends Yn{constructor(n,t,r){super();let o;if(N(n)||!n)o={next:n??void 0,error:t??void 0,complete:r??void 0};else{let i;this&&at.useDeprecatedNextContext?(i=Object.create(n),i.unsubscribe=()=>this.unsubscribe(),o={next:n.next&&_l(n.next,i),error:n.error&&_l(n.error,i),complete:n.complete&&_l(n.complete,i)}):o=n}this.destination=new Il(o)}};function ya(e){at.useDeprecatedSynchronousErrorHandling?wm(e):va(e)}function UE(e){throw e}function Dl(e,n){let{onStoppedNotification:t}=at;t&&zr.setTimeout(()=>t(e,n))}var HE={closed:!0,next:Vo,error:UE,complete:Vo};var Ur=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Pe(e){return e}function wl(...e){return Tl(e)}function Tl(e){return e.length===0?Pe:e.length===1?e[0]:function(t){return e.reduce((r,o)=>o(r),t)}}var B=(()=>{class e{constructor(t){t&&(this._subscribe=t)}lift(t){let r=new e;return r.source=this,r.operator=t,r}subscribe(t,r,o){let i=$E(t)?t:new Gt(t,r,o);return Vr(()=>{let{operator:a,source:s}=this;i.add(a?a.call(i,s):s?this._subscribe(i):this._trySubscribe(i))}),i}_trySubscribe(t){try{return this._subscribe(t)}catch(r){t.error(r)}}forEach(t,r){return r=Tm(r),new r((o,i)=>{let a=new Gt({next:s=>{try{t(s)}catch(c){i(c),a.unsubscribe()}},error:i,complete:o});this.subscribe(a)})}_subscribe(t){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(t)}[Ur](){return this}pipe(...t){return Tl(t)(this)}toPromise(t){return t=Tm(t),new t((r,o)=>{let i;this.subscribe(a=>i=a,a=>o(a),()=>r(i))})}}return e.create=n=>new e(n),e})();function Tm(e){var n;return(n=e??at.Promise)!==null&&n!==void 0?n:Promise}function qE(e){return e&&N(e.next)&&N(e.error)&&N(e.complete)}function $E(e){return e&&e instanceof Yn||qE(e)&&ga(e)}function Ml(e){return N(e?.lift)}function F(e){return n=>{if(Ml(n))return n.lift(function(t){try{return e(t,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function k(e,n,t,r,o){return new Sl(e,n,t,r,o)}var Sl=class extends Yn{constructor(n,t,r,o,i,a){super(n),this.onFinalize=i,this.shouldUnsubscribe=a,this._next=t?function(s){try{t(s)}catch(c){n.error(c)}}:super._next,this._error=o?function(s){try{o(s)}catch(c){n.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(s){n.error(s)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};function Hr(){return F((e,n)=>{let t=null;e._refCount++;let r=k(n,void 0,void 0,void 0,()=>{if(!e||e._refCount<=0||0<--e._refCount){t=null;return}let o=e._connection,i=t;t=null,o&&(!i||o===i)&&o.unsubscribe(),n.unsubscribe()});e.subscribe(r),r.closed||(t=e.connect())})}var qr=class extends B{constructor(n,t){super(),this.source=n,this.subjectFactory=t,this._subject=null,this._refCount=0,this._connection=null,Ml(n)&&(this.lift=n.lift)}_subscribe(n){return this.getSubject().subscribe(n)}getSubject(){let n=this._subject;return(!n||n.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:n}=this;this._subject=this._connection=null,n?.unsubscribe()}connect(){let n=this._connection;if(!n){n=this._connection=new Z;let t=this.getSubject();n.add(this.source.subscribe(k(t,void 0,()=>{this._teardown(),t.complete()},r=>{this._teardown(),t.error(r)},()=>this._teardown()))),n.closed&&(this._connection=null,n=Z.EMPTY)}return n}refCount(){return Hr()(this)}};var Mm=Br(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var V=(()=>{class e extends B{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let r=new ba(this,this);return r.operator=t,r}_throwIfClosed(){if(this.closed)throw new Mm}next(t){Vr(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(t)}})}error(t){Vr(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:r}=this;for(;r.length;)r.shift().error(t)}})}complete(){Vr(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:r,isStopped:o,observers:i}=this;return r||o?El:(this.currentObservers=null,i.push(t),new Z(()=>{this.currentObservers=null,Zn(i,t)}))}_checkFinalizedStatuses(t){let{hasError:r,thrownError:o,isStopped:i}=this;r?t.error(o):i&&t.complete()}asObservable(){let t=new B;return t.source=this,t}}return e.create=(n,t)=>new ba(n,t),e})(),ba=class extends V{constructor(n,t){super(),this.destination=n,this.source=t}next(n){var t,r;(r=(t=this.destination)===null||t===void 0?void 0:t.next)===null||r===void 0||r.call(t,n)}error(n){var t,r;(r=(t=this.destination)===null||t===void 0?void 0:t.error)===null||r===void 0||r.call(t,n)}complete(){var n,t;(t=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||t===void 0||t.call(n)}_subscribe(n){var t,r;return(r=(t=this.source)===null||t===void 0?void 0:t.subscribe(n))!==null&&r!==void 0?r:El}};var ve=class extends V{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let t=super._subscribe(n);return!t.closed&&n.next(this._value),t}getValue(){let{hasError:n,thrownError:t,_value:r}=this;if(n)throw t;return this._throwIfClosed(),r}next(n){super.next(this._value=n)}};var Al={now(){return(Al.delegate||Date).now()},delegate:void 0};var Ea=class extends Z{constructor(n,t){super()}schedule(n,t=0){return this}};var Uo={setInterval(e,n,...t){let{delegate:r}=Uo;return r?.setInterval?r.setInterval(e,n,...t):setInterval(e,n,...t)},clearInterval(e){let{delegate:n}=Uo;return(n?.clearInterval||clearInterval)(e)},delegate:void 0};var Ca=class extends Ea{constructor(n,t){super(n,t),this.scheduler=n,this.work=t,this.pending=!1}schedule(n,t=0){var r;if(this.closed)return this;this.state=n;let o=this.id,i=this.scheduler;return o!=null&&(this.id=this.recycleAsyncId(i,o,t)),this.pending=!0,this.delay=t,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(i,this.id,t),this}requestAsyncId(n,t,r=0){return Uo.setInterval(n.flush.bind(n,this),r)}recycleAsyncId(n,t,r=0){if(r!=null&&this.delay===r&&this.pending===!1)return t;t!=null&&Uo.clearInterval(t)}execute(n,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let r=this._execute(n,t);if(r)return r;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,t){let r=!1,o;try{this.work(n)}catch(i){r=!0,o=i||new Error("Scheduled action threw falsy error")}if(r)return this.unsubscribe(),o}unsubscribe(){if(!this.closed){let{id:n,scheduler:t}=this,{actions:r}=t;this.work=this.state=this.scheduler=null,this.pending=!1,Zn(r,this),n!=null&&(this.id=this.recycleAsyncId(t,n,null)),this.delay=null,super.unsubscribe()}}};var $r=class e{constructor(n,t=e.now){this.schedulerActionCtor=n,this.now=t}schedule(n,t=0,r){return new this.schedulerActionCtor(this,n).schedule(r,t)}};$r.now=Al.now;var _a=class extends $r{constructor(n,t=$r.now){super(n,t),this.actions=[],this._active=!1}flush(n){let{actions:t}=this;if(this._active){t.push(n);return}let r;this._active=!0;do if(r=n.execute(n.state,n.delay))break;while(n=t.shift());if(this._active=!1,r){for(;n=t.shift();)n.unsubscribe();throw r}}};var Sm=new _a(Ca);var be=new B(e=>e.complete());function Am(e){return e&&N(e.schedule)}function xl(e){return e[e.length-1]}function Da(e){return N(xl(e))?e.pop():void 0}function Mt(e){return Am(xl(e))?e.pop():void 0}function xm(e,n){return typeof xl(e)=="number"?e.pop():n}function Nm(e,n,t,r){function o(i){return i instanceof t?i:new t(function(a){a(i)})}return new(t||(t=Promise))(function(i,a){function s(u){try{l(r.next(u))}catch(d){a(d)}}function c(u){try{l(r.throw(u))}catch(d){a(d)}}function l(u){u.done?i(u.value):o(u.value).then(s,c)}l((r=r.apply(e,n||[])).next())})}function Rm(e){var n=typeof Symbol=="function"&&Symbol.iterator,t=n&&e[n],r=0;if(t)return t.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function Kn(e){return this instanceof Kn?(this.v=e,this):new Kn(e)}function Pm(e,n,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=t.apply(e,n||[]),o,i=[];return o=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),s("next"),s("throw"),s("return",a),o[Symbol.asyncIterator]=function(){return this},o;function a(f){return function(g){return Promise.resolve(g).then(f,d)}}function s(f,g){r[f]&&(o[f]=function(w){return new Promise(function(z,P){i.push([f,w,z,P])>1||c(f,w)})},g&&(o[f]=g(o[f])))}function c(f,g){try{l(r[f](g))}catch(w){m(i[0][3],w)}}function l(f){f.value instanceof Kn?Promise.resolve(f.value.v).then(u,d):m(i[0][2],f)}function u(f){c("next",f)}function d(f){c("throw",f)}function m(f,g){f(g),i.shift(),i.length&&c(i[0][0],i[0][1])}}function Om(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=e[Symbol.asyncIterator],t;return n?n.call(e):(e=typeof Rm=="function"?Rm(e):e[Symbol.iterator](),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(i){t[i]=e[i]&&function(a){return new Promise(function(s,c){a=e[i](a),o(s,c,a.done,a.value)})}}function o(i,a,s,c){Promise.resolve(c).then(function(l){i({value:l,done:s})},a)}}var Ia=e=>e&&typeof e.length=="number"&&typeof e!="function";function wa(e){return N(e?.then)}function Ta(e){return N(e[Ur])}function Ma(e){return Symbol.asyncIterator&&N(e?.[Symbol.asyncIterator])}function Sa(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function GE(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Aa=GE();function xa(e){return N(e?.[Aa])}function Ra(e){return Pm(this,arguments,function*(){let t=e.getReader();try{for(;;){let{value:r,done:o}=yield Kn(t.read());if(o)return yield Kn(void 0);yield yield Kn(r)}}finally{t.releaseLock()}})}function Na(e){return N(e?.getReader)}function ee(e){if(e instanceof B)return e;if(e!=null){if(Ta(e))return WE(e);if(Ia(e))return ZE(e);if(wa(e))return QE(e);if(Ma(e))return Fm(e);if(xa(e))return YE(e);if(Na(e))return KE(e)}throw Sa(e)}function WE(e){return new B(n=>{let t=e[Ur]();if(N(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function ZE(e){return new B(n=>{for(let t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}function QE(e){return new B(n=>{e.then(t=>{n.closed||(n.next(t),n.complete())},t=>n.error(t)).then(null,va)})}function YE(e){return new B(n=>{for(let t of e)if(n.next(t),n.closed)return;n.complete()})}function Fm(e){return new B(n=>{JE(e,n).catch(t=>n.error(t))})}function KE(e){return Fm(Ra(e))}function JE(e,n){var t,r,o,i;return Nm(this,void 0,void 0,function*(){try{for(t=Om(e);r=yield t.next(),!r.done;){let a=r.value;if(n.next(a),n.closed)return}}catch(a){o={error:a}}finally{try{r&&!r.done&&(i=t.return)&&(yield i.call(t))}finally{if(o)throw o.error}}n.complete()})}function Ve(e,n,t,r=0,o=!1){let i=n.schedule(function(){t(),o?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(i),!o)return i}function Pa(e,n=0){return F((t,r)=>{t.subscribe(k(r,o=>Ve(r,e,()=>r.next(o),n),()=>Ve(r,e,()=>r.complete(),n),o=>Ve(r,e,()=>r.error(o),n)))})}function Oa(e,n=0){return F((t,r)=>{r.add(e.schedule(()=>t.subscribe(r),n))})}function km(e,n){return ee(e).pipe(Oa(n),Pa(n))}function Lm(e,n){return ee(e).pipe(Oa(n),Pa(n))}function jm(e,n){return new B(t=>{let r=0;return n.schedule(function(){r===e.length?t.complete():(t.next(e[r++]),t.closed||this.schedule())})})}function Bm(e,n){return new B(t=>{let r;return Ve(t,n,()=>{r=e[Aa](),Ve(t,n,()=>{let o,i;try{({value:o,done:i}=r.next())}catch(a){t.error(a);return}i?t.complete():t.next(o)},0,!0)}),()=>N(r?.return)&&r.return()})}function Fa(e,n){if(!e)throw new Error("Iterable cannot be null");return new B(t=>{Ve(t,n,()=>{let r=e[Symbol.asyncIterator]();Ve(t,n,()=>{r.next().then(o=>{o.done?t.complete():t.next(o.value)})},0,!0)})})}function zm(e,n){return Fa(Ra(e),n)}function Vm(e,n){if(e!=null){if(Ta(e))return km(e,n);if(Ia(e))return jm(e,n);if(wa(e))return Lm(e,n);if(Ma(e))return Fa(e,n);if(xa(e))return Bm(e,n);if(Na(e))return zm(e,n)}throw Sa(e)}function ne(e,n){return n?Vm(e,n):ee(e)}function T(...e){let n=Mt(e);return ne(e,n)}function gn(e,n){let t=N(e)?e:()=>e,r=o=>o.error(t());return new B(n?o=>n.schedule(r,0,o):r)}function Rl(e){return!!e&&(e instanceof B||N(e.lift)&&N(e.subscribe))}var Wt=Br(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence"});function A(e,n){return F((t,r)=>{let o=0;t.subscribe(k(r,i=>{r.next(e.call(n,i,o++))}))})}var{isArray:XE}=Array;function eC(e,n){return XE(n)?e(...n):e(n)}function ka(e){return A(n=>eC(e,n))}var{isArray:tC}=Array,{getPrototypeOf:nC,prototype:rC,keys:oC}=Object;function La(e){if(e.length===1){let n=e[0];if(tC(n))return{args:n,keys:null};if(iC(n)){let t=oC(n);return{args:t.map(r=>n[r]),keys:t}}}return{args:e,keys:null}}function iC(e){return e&&typeof e=="object"&&nC(e)===rC}function ja(e,n){return e.reduce((t,r,o)=>(t[r]=n[o],t),{})}function Jn(...e){let n=Mt(e),t=Da(e),{args:r,keys:o}=La(e);if(r.length===0)return ne([],n);let i=new B(aC(r,n,o?a=>ja(o,a):Pe));return t?i.pipe(ka(t)):i}function aC(e,n,t=Pe){return r=>{Um(n,()=>{let{length:o}=e,i=new Array(o),a=o,s=o;for(let c=0;c<o;c++)Um(n,()=>{let l=ne(e[c],n),u=!1;l.subscribe(k(r,d=>{i[c]=d,u||(u=!0,s--),s||r.next(t(i.slice()))},()=>{--a||r.complete()}))},r)},r)}}function Um(e,n,t){e?Ve(t,e,n):n()}function Hm(e,n,t,r,o,i,a,s){let c=[],l=0,u=0,d=!1,m=()=>{d&&!c.length&&!l&&n.complete()},f=w=>l<r?g(w):c.push(w),g=w=>{i&&n.next(w),l++;let z=!1;ee(t(w,u++)).subscribe(k(n,P=>{o?.(P),i?f(P):n.next(P)},()=>{z=!0},void 0,()=>{if(z)try{for(l--;c.length&&l<r;){let P=c.shift();a?Ve(n,a,()=>g(P)):g(P)}m()}catch(P){n.error(P)}}))};return e.subscribe(k(n,f,()=>{d=!0,m()})),()=>{s?.()}}function de(e,n,t=1/0){return N(n)?de((r,o)=>A((i,a)=>n(r,i,o,a))(ee(e(r,o))),t):(typeof n=="number"&&(t=n),F((r,o)=>Hm(r,o,e,t)))}function vn(e=1/0){return de(Pe,e)}function qm(){return vn(1)}function yn(...e){return qm()(ne(e,Mt(e)))}function Ho(e){return new B(n=>{ee(e()).subscribe(n)})}function Nl(...e){let n=Da(e),{args:t,keys:r}=La(e),o=new B(i=>{let{length:a}=t;if(!a){i.complete();return}let s=new Array(a),c=a,l=a;for(let u=0;u<a;u++){let d=!1;ee(t[u]).subscribe(k(i,m=>{d||(d=!0,l--),s[u]=m},()=>c--,void 0,()=>{(!c||!d)&&(l||i.next(r?ja(r,s):s),i.complete())}))}});return n?o.pipe(ka(n)):o}function Pl(...e){let n=Mt(e),t=xm(e,1/0),r=e;return r.length?r.length===1?ee(r[0]):vn(t)(ne(r,n)):be}function te(e,n){return F((t,r)=>{let o=0;t.subscribe(k(r,i=>e.call(n,i,o++)&&r.next(i)))})}function st(e){return F((n,t)=>{let r=null,o=!1,i;r=n.subscribe(k(t,void 0,void 0,a=>{i=ee(e(a,st(e)(n))),r?(r.unsubscribe(),r=null,i.subscribe(t)):o=!0})),o&&(r.unsubscribe(),r=null,i.subscribe(t))})}function $m(e,n,t,r,o){return(i,a)=>{let s=t,c=n,l=0;i.subscribe(k(a,u=>{let d=l++;c=s?e(c,u,d):(s=!0,u),r&&a.next(c)},o&&(()=>{s&&a.next(c),a.complete()})))}}function St(e,n){return N(n)?de(e,n,1):de(e,1)}function qo(e,n=Sm){return F((t,r)=>{let o=null,i=null,a=null,s=()=>{if(o){o.unsubscribe(),o=null;let l=i;i=null,r.next(l)}};function c(){let l=a+e,u=n.now();if(u<l){o=this.schedule(void 0,l-u),r.add(o);return}s()}t.subscribe(k(r,l=>{i=l,a=n.now(),o||(o=n.schedule(c,e),r.add(o))},()=>{s(),r.complete()},void 0,()=>{i=o=null}))})}function bn(e){return F((n,t)=>{let r=!1;n.subscribe(k(t,o=>{r=!0,t.next(o)},()=>{r||t.next(e),t.complete()}))})}function Oe(e){return e<=0?()=>be:F((n,t)=>{let r=0;n.subscribe(k(t,o=>{++r<=e&&(t.next(o),e<=r&&t.complete())}))})}function Ol(e,n=Pe){return e=e??sC,F((t,r)=>{let o,i=!0;t.subscribe(k(r,a=>{let s=n(a);(i||!e(o,s))&&(i=!1,o=s,r.next(a))}))})}function sC(e,n){return e===n}function Ba(e=cC){return F((n,t)=>{let r=!1;n.subscribe(k(t,o=>{r=!0,t.next(o)},()=>r?t.complete():t.error(e())))})}function cC(){return new Wt}function En(e){return F((n,t)=>{try{n.subscribe(t)}finally{t.add(e)}})}function Zt(e,n){let t=arguments.length>=2;return r=>r.pipe(e?te((o,i)=>e(o,i,r)):Pe,Oe(1),t?bn(n):Ba(()=>new Wt))}function Gr(e){return e<=0?()=>be:F((n,t)=>{let r=[];n.subscribe(k(t,o=>{r.push(o),e<r.length&&r.shift()},()=>{for(let o of r)t.next(o);t.complete()},void 0,()=>{r=null}))})}function Fl(e,n){let t=arguments.length>=2;return r=>r.pipe(e?te((o,i)=>e(o,i,r)):Pe,Gr(1),t?bn(n):Ba(()=>new Wt))}function kl(e,n){return F($m(e,n,arguments.length>=2,!0))}function jl(e={}){let{connector:n=()=>new V,resetOnError:t=!0,resetOnComplete:r=!0,resetOnRefCountZero:o=!0}=e;return i=>{let a,s,c,l=0,u=!1,d=!1,m=()=>{s?.unsubscribe(),s=void 0},f=()=>{m(),a=c=void 0,u=d=!1},g=()=>{let w=a;f(),w?.unsubscribe()};return F((w,z)=>{l++,!d&&!u&&m();let P=c=c??n();z.add(()=>{l--,l===0&&!d&&!u&&(s=Ll(g,o))}),P.subscribe(z),!a&&l>0&&(a=new Gt({next:wt=>P.next(wt),error:wt=>{d=!0,m(),s=Ll(f,t,wt),P.error(wt)},complete:()=>{u=!0,m(),s=Ll(f,r),P.complete()}}),ee(w).subscribe(a))})(i)}}function Ll(e,n,...t){if(n===!0){e();return}if(n===!1)return;let r=new Gt({next:()=>{r.unsubscribe(),e()}});return ee(n(...t)).subscribe(r)}function $o(e){return te((n,t)=>e<=t)}function Cn(...e){let n=Mt(e);return F((t,r)=>{(n?yn(e,t,n):yn(e,t)).subscribe(r)})}function Ae(e,n){return F((t,r)=>{let o=null,i=0,a=!1,s=()=>a&&!o&&r.complete();t.subscribe(k(r,c=>{o?.unsubscribe();let l=0,u=i++;ee(e(c,u)).subscribe(o=k(r,d=>r.next(n?n(c,d,u,l++):d),()=>{o=null,s()}))},()=>{a=!0,s()}))})}function _n(e){return F((n,t)=>{ee(e).subscribe(k(t,()=>t.complete(),Vo)),!t.closed&&n.subscribe(t)})}function re(e,n,t){let r=N(e)||n||t?{next:e,error:n,complete:t}:e;return r?F((o,i)=>{var a;(a=r.subscribe)===null||a===void 0||a.call(r);let s=!0;o.subscribe(k(i,c=>{var l;(l=r.next)===null||l===void 0||l.call(r,c),i.next(c)},()=>{var c;s=!1,(c=r.complete)===null||c===void 0||c.call(r),i.complete()},c=>{var l;s=!1,(l=r.error)===null||l===void 0||l.call(r,c),i.error(c)},()=>{var c,l;s&&((c=r.unsubscribe)===null||c===void 0||c.call(r)),(l=r.finalize)===null||l===void 0||l.call(r)}))}):Pe}function Gm(e){let n=R(null);try{return e()}finally{R(n)}}var Wm=$(y({},Or),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,hasRun:!1,kind:"effect"});function Zm(e){if(e.dirty=!1,e.hasRun&&!kr(e))return;e.hasRun=!0;let n=Fr(e);try{e.cleanup(),e.fn()}finally{zo(e,n)}}var qa="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",b=class extends Error{code;constructor(n,t){super(xt(n,t)),this.code=n}};function lC(e){return`NG0${Math.abs(e)}`}function xt(e,n){return`${lC(e)}${n?": "+n:""}`}var Le=globalThis;function Q(e){for(let n in e)if(e[n]===Q)return n;throw Error("")}function Jm(e,n){for(let t in n)n.hasOwnProperty(t)&&!e.hasOwnProperty(t)&&(e[t]=n[t])}function Yt(e){if(typeof e=="string")return e;if(Array.isArray(e))return`[${e.map(Yt).join(", ")}]`;if(e==null)return""+e;let n=e.overriddenName||e.name;if(n)return`${n}`;let t=e.toString();if(t==null)return""+t;let r=t.indexOf(`
`);return r>=0?t.slice(0,r):t}function $a(e,n){return e?n?`${e} ${n}`:e:n||""}var uC=Q({__forward_ref__:Q});function Ga(e){return e.__forward_ref__=Ga,e.toString=function(){return Yt(this())},e}function _e(e){return Ql(e)?e():e}function Ql(e){return typeof e=="function"&&e.hasOwnProperty(uC)&&e.__forward_ref__===Ga}function Xm(e,n){e==null&&Yl(n,e,null,"!=")}function Yl(e,n,t,r){throw new Error(`ASSERTION ERROR: ${e}`+(r==null?"":` [Expected=> ${t} ${r} ${n} <=Actual]`))}function v(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function oe(e){return{providers:e.providers||[],imports:e.imports||[]}}function Ko(e){return dC(e,Wa)}function Kl(e){return Ko(e)!==null}function dC(e,n){return e.hasOwnProperty(n)&&e[n]||null}function pC(e){let n=e?.[Wa]??null;return n||null}function zl(e){return e&&e.hasOwnProperty(Va)?e[Va]:null}var Wa=Q({\u0275prov:Q}),Va=Q({\u0275inj:Q}),E=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,t){this._desc=n,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=v({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Jl(e){return e&&!!e.\u0275providers}var Xl=Q({\u0275cmp:Q}),eu=Q({\u0275dir:Q}),tu=Q({\u0275pipe:Q}),nu=Q({\u0275mod:Q}),Zo=Q({\u0275fac:Q}),rr=Q({__NG_ELEMENT_ID__:Q}),Ym=Q({__NG_ENV_ID__:Q});function Jo(e){return typeof e=="string"?e:e==null?"":String(e)}function Ua(e){return typeof e=="function"?e.name||e.toString():typeof e=="object"&&e!=null&&typeof e.type=="function"?e.type.name||e.type.toString():Jo(e)}var ru=Q({ngErrorCode:Q}),eh=Q({ngErrorMessage:Q}),Wo=Q({ngTokenPath:Q});function ou(e,n){return th("",-200,n)}function Za(e,n){throw new b(-201,!1)}function fC(e,n){e[Wo]??=[];let t=e[Wo],r;typeof n=="object"&&"multi"in n&&n?.multi===!0?(Xm(n.provide,"Token with multi: true should have a provide property"),r=Ua(n.provide)):r=Ua(n),t[0]!==r&&e[Wo].unshift(r)}function mC(e,n){let t=e[Wo],r=e[ru],o=e[eh]||e.message;return e.message=gC(o,r,t,n),e}function th(e,n,t){let r=new b(n,e);return r[ru]=n,r[eh]=e,t&&(r[Wo]=t),r}function hC(e){return e[ru]}function gC(e,n,t=[],r=null){let o="";t&&t.length>1&&(o=` Path: ${t.join(" -> ")}.`);let i=r?` Source: ${r}.`:"";return xt(n,`${e}${i}${o}`)}var Vl;function nh(){return Vl}function Fe(e){let n=Vl;return Vl=e,n}function iu(e,n,t){let r=Ko(e);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(t&8)return null;if(n!==void 0)return n;Za(e,"Injector")}var vC={},Xn=vC,yC="__NG_DI_FLAG__",Ul=class{injector;constructor(n){this.injector=n}retrieve(n,t){let r=er(t)||0;try{return this.injector.get(n,r&8?null:Xn,r)}catch(o){if(Pr(o))return o;throw o}}};function bC(e,n=0){let t=ua();if(t===void 0)throw new b(-203,!1);if(t===null)return iu(e,void 0,n);{let r=EC(n),o=t.retrieve(e,r);if(Pr(o)){if(r.optional)return null;throw o}return o}}function I(e,n=0){return(nh()||bC)(_e(e),n)}function p(e,n){return I(e,er(n))}function er(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function EC(e){return{optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function Hl(e){let n=[];for(let t=0;t<e.length;t++){let r=_e(e[t]);if(Array.isArray(r)){if(r.length===0)throw new b(900,!1);let o,i=0;for(let a=0;a<r.length;a++){let s=r[a],c=CC(s);typeof c=="number"?c===-1?o=s.token:i|=c:o=s}n.push(I(o,i))}else n.push(I(r))}return n}function CC(e){return e[yC]}function Dn(e,n){let t=e.hasOwnProperty(Zo);return t?e[Zo]:null}function rh(e,n,t){if(e.length!==n.length)return!1;for(let r=0;r<e.length;r++){let o=e[r],i=n[r];if(t&&(o=t(o),i=t(i)),i!==o)return!1}return!0}function oh(e){return e.flat(Number.POSITIVE_INFINITY)}function Qa(e,n){e.forEach(t=>Array.isArray(t)?Qa(t,n):n(t))}function au(e,n,t){n>=e.length?e.push(t):e.splice(n,0,t)}function Xo(e,n){return n>=e.length-1?e.pop():e.splice(n,1)[0]}function ih(e,n){let t=[];for(let r=0;r<e;r++)t.push(n);return t}function ah(e,n,t,r){let o=e.length;if(o==n)e.push(t,r);else if(o===1)e.push(r,e[0]),e[0]=t;else{for(o--,e.push(e[o-1],e[o]);o>n;){let i=o-2;e[o]=e[i],o--}e[n]=t,e[n+1]=r}}function Ya(e,n,t){let r=Zr(e,n);return r>=0?e[r|1]=t:(r=~r,ah(e,r,n,t)),r}function Ka(e,n){let t=Zr(e,n);if(t>=0)return e[t|1]}function Zr(e,n){return _C(e,n,1)}function _C(e,n,t){let r=0,o=e.length>>t;for(;o!==r;){let i=r+(o-r>>1),a=e[i<<t];if(n===a)return i<<t;a>n?o=i:r=i+1}return~(o<<t)}var wn={},ke=[],Kt=new E(""),su=new E("",-1),cu=new E(""),Qo=class{get(n,t=Xn){if(t===Xn){let o=th("",-201);throw o.name="\u0275NotFound",o}return t}};function lu(e){return e[nu]||null}function Rt(e){return e[Xl]||null}function uu(e){return e[eu]||null}function sh(e){return e[tu]||null}function or(e){return{\u0275providers:e}}function Ja(...e){return{\u0275providers:du(!0,e),\u0275fromNgModule:!0}}function du(e,...n){let t=[],r=new Set,o,i=a=>{t.push(a)};return Qa(n,a=>{let s=a;Ha(s,i,[],r)&&(o||=[],o.push(s))}),o!==void 0&&ch(o,i),t}function ch(e,n){for(let t=0;t<e.length;t++){let{ngModule:r,providers:o}=e[t];pu(o,i=>{n(i,r)})}}function Ha(e,n,t,r){if(e=_e(e),!e)return!1;let o=null,i=zl(e),a=!i&&Rt(e);if(!i&&!a){let c=e.ngModule;if(i=zl(c),i)o=c;else return!1}else{if(a&&!a.standalone)return!1;o=e}let s=r.has(o);if(a){if(s)return!1;if(r.add(o),a.dependencies){let c=typeof a.dependencies=="function"?a.dependencies():a.dependencies;for(let l of c)Ha(l,n,t,r)}}else if(i){if(i.imports!=null&&!s){r.add(o);let l;try{Qa(i.imports,u=>{Ha(u,n,t,r)&&(l||=[],l.push(u))})}finally{}l!==void 0&&ch(l,n)}if(!s){let l=Dn(o)||(()=>new o);n({provide:o,useFactory:l,deps:ke},o),n({provide:cu,useValue:o,multi:!0},o),n({provide:Kt,useValue:()=>I(o),multi:!0},o)}let c=i.providers;if(c!=null&&!s){let l=e;pu(c,u=>{n(u,l)})}}else return!1;return o!==e&&e.providers!==void 0}function pu(e,n){for(let t of e)Jl(t)&&(t=t.\u0275providers),Array.isArray(t)?pu(t,n):n(t)}var DC=Q({provide:String,useValue:Q});function lh(e){return e!==null&&typeof e=="object"&&DC in e}function IC(e){return!!(e&&e.useExisting)}function wC(e){return!!(e&&e.useFactory)}function tr(e){return typeof e=="function"}function uh(e){return!!e.useClass}var ei=new E(""),za={},Km={},Bl;function Qr(){return Bl===void 0&&(Bl=new Qo),Bl}var ie=class{},nr=class extends ie{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,t,r,o){super(),this.parent=t,this.source=r,this.scopes=o,$l(n,a=>this.processProvider(a)),this.records.set(su,Wr(void 0,this)),o.has("environment")&&this.records.set(ie,Wr(void 0,this));let i=this.records.get(ei);i!=null&&typeof i.value=="string"&&this.scopes.add(i.value),this.injectorDefTypes=new Set(this.get(cu,ke,{self:!0}))}retrieve(n,t){let r=er(t)||0;try{return this.get(n,Xn,r)}catch(o){if(Pr(o))return o;throw o}}destroy(){Go(this),this._destroyed=!0;let n=R(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of t)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),R(n)}}onDestroy(n){return Go(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){Go(this);let t=Tt(this),r=Fe(void 0),o;try{return n()}finally{Tt(t),Fe(r)}}get(n,t=Xn,r){if(Go(this),n.hasOwnProperty(Ym))return n[Ym](this);let o=er(r),i,a=Tt(this),s=Fe(void 0);try{if(!(o&4)){let l=this.records.get(n);if(l===void 0){let u=xC(n)&&Ko(n);u&&this.injectableDefInScope(u)?l=Wr(ql(n),za):l=null,this.records.set(n,l)}if(l!=null)return this.hydrate(n,l,o)}let c=o&2?Qr():this.parent;return t=o&8&&t===Xn?null:t,c.get(n,t)}catch(c){let l=hC(c);throw l===-200||l===-201?new b(l,null):c}finally{Fe(s),Tt(a)}}resolveInjectorInitializers(){let n=R(null),t=Tt(this),r=Fe(void 0),o;try{let i=this.get(Kt,ke,{self:!0});for(let a of i)a()}finally{Tt(t),Fe(r),R(n)}}toString(){let n=[],t=this.records;for(let r of t.keys())n.push(Yt(r));return`R3Injector[${n.join(", ")}]`}processProvider(n){n=_e(n);let t=tr(n)?n:_e(n&&n.provide),r=MC(n);if(!tr(n)&&n.multi===!0){let o=this.records.get(t);o||(o=Wr(void 0,za,!0),o.factory=()=>Hl(o.multi),this.records.set(t,o)),t=n,o.multi.push(n)}this.records.set(t,r)}hydrate(n,t,r){let o=R(null);try{if(t.value===Km)throw ou(Yt(n));return t.value===za&&(t.value=Km,t.value=t.factory(void 0,r)),typeof t.value=="object"&&t.value&&AC(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{R(o)}}injectableDefInScope(n){if(!n.providedIn)return!1;let t=_e(n.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(n){let t=this._onDestroyHooks.indexOf(n);t!==-1&&this._onDestroyHooks.splice(t,1)}};function ql(e){let n=Ko(e),t=n!==null?n.factory:Dn(e);if(t!==null)return t;if(e instanceof E)throw new b(204,!1);if(e instanceof Function)return TC(e);throw new b(204,!1)}function TC(e){if(e.length>0)throw new b(204,!1);let t=pC(e);return t!==null?()=>t.factory(e):()=>new e}function MC(e){if(lh(e))return Wr(void 0,e.useValue);{let n=fu(e);return Wr(n,za)}}function fu(e,n,t){let r;if(tr(e)){let o=_e(e);return Dn(o)||ql(o)}else if(lh(e))r=()=>_e(e.useValue);else if(wC(e))r=()=>e.useFactory(...Hl(e.deps||[]));else if(IC(e))r=(o,i)=>I(_e(e.useExisting),i!==void 0&&i&8?8:void 0);else{let o=_e(e&&(e.useClass||e.provide));if(SC(e))r=()=>new o(...Hl(e.deps));else return Dn(o)||ql(o)}return r}function Go(e){if(e.destroyed)throw new b(205,!1)}function Wr(e,n,t=!1){return{factory:e,value:n,multi:t?[]:void 0}}function SC(e){return!!e.deps}function AC(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function xC(e){return typeof e=="function"||typeof e=="object"&&e.ngMetadataName==="InjectionToken"}function $l(e,n){for(let t of e)Array.isArray(t)?$l(t,n):t&&Jl(t)?$l(t.\u0275providers,n):n(t)}function Ie(e,n){let t;e instanceof nr?(Go(e),t=e):t=new Ul(e);let r,o=Tt(t),i=Fe(void 0);try{return n()}finally{Tt(o),Fe(i)}}function mu(){return nh()!==void 0||ua()!=null}var ct=0,S=1,x=2,Ee=3,Ye=4,je=5,Yr=6,Kr=7,we=8,ir=9,Nt=10,ae=11,Jr=12,hu=13,ar=14,Ue=15,Tn=16,sr=17,Pt=18,ti=19,gu=20,Qt=21,Xa=22,Jt=23,qe=24,cr=25,se=26,dh=1;var Mn=7,ni=8,lr=9,xe=10;function Ot(e){return Array.isArray(e)&&typeof e[dh]=="object"}function lt(e){return Array.isArray(e)&&e[dh]===!0}function vu(e){return(e.flags&4)!==0}function Sn(e){return e.componentOffset>-1}function Xr(e){return(e.flags&1)===1}function Ft(e){return!!e.template}function eo(e){return(e[x]&512)!==0}function ur(e){return(e[x]&256)===256}var yu="svg",ph="math";function Ke(e){for(;Array.isArray(e);)e=e[ct];return e}function bu(e,n){return Ke(n[e])}function ut(e,n){return Ke(n[e.index])}function ri(e,n){return e.data[n]}function Eu(e,n){return e[n]}function Cu(e,n,t,r){t>=e.data.length&&(e.data[t]=null,e.blueprint[t]=null),n[t]=r}function Je(e,n){let t=n[e];return Ot(t)?t:t[ct]}function fh(e){return(e[x]&4)===4}function es(e){return(e[x]&128)===128}function mh(e){return lt(e[Ee])}function kt(e,n){return n==null?null:e[n]}function _u(e){e[sr]=0}function Du(e){e[x]&1024||(e[x]|=1024,es(e)&&An(e))}function hh(e,n){for(;e>0;)n=n[ar],e--;return n}function oi(e){return!!(e[x]&9216||e[qe]?.dirty)}function ts(e){e[Nt].changeDetectionScheduler?.notify(8),e[x]&64&&(e[x]|=1024),oi(e)&&An(e)}function An(e){e[Nt].changeDetectionScheduler?.notify(0);let n=In(e);for(;n!==null&&!(n[x]&8192||(n[x]|=8192,!es(n)));)n=In(n)}function Iu(e,n){if(ur(e))throw new b(911,!1);e[Qt]===null&&(e[Qt]=[]),e[Qt].push(n)}function gh(e,n){if(e[Qt]===null)return;let t=e[Qt].indexOf(n);t!==-1&&e[Qt].splice(t,1)}function In(e){let n=e[Ee];return lt(n)?n[Ee]:n}function wu(e){return e[Kr]??=[]}function Tu(e){return e.cleanup??=[]}function vh(e,n,t,r){let o=wu(n);o.push(t),e.firstCreatePass&&Tu(e).push(r,o.length-1)}var L={lFrame:Ah(null),bindingsEnabled:!0,skipHydrationRootTNode:null},ii=(function(e){return e[e.Off=0]="Off",e[e.Exhaustive=1]="Exhaustive",e[e.OnlyDirtyViews=2]="OnlyDirtyViews",e})(ii||{}),RC=0,Gl=!1;function yh(){return L.lFrame.elementDepthCount}function bh(){L.lFrame.elementDepthCount++}function Mu(){L.lFrame.elementDepthCount--}function ns(){return L.bindingsEnabled}function Su(){return L.skipHydrationRootTNode!==null}function Au(e){return L.skipHydrationRootTNode===e}function xu(){L.skipHydrationRootTNode=null}function j(){return L.lFrame.lView}function he(){return L.lFrame.tView}function dt(e){return L.lFrame.contextLView=e,e[we]}function pt(e){return L.lFrame.contextLView=null,e}function Ce(){let e=Ru();for(;e!==null&&e.type===64;)e=e.parent;return e}function Ru(){return L.lFrame.currentTNode}function Eh(){let e=L.lFrame,n=e.currentTNode;return e.isParent?n:n.parent}function to(e,n){let t=L.lFrame;t.currentTNode=e,t.isParent=n}function Nu(){return L.lFrame.isParent}function Pu(){L.lFrame.isParent=!1}function Ch(){return L.lFrame.contextLView}function Ou(e){Yl("Must never be called in production mode"),RC=e}function Fu(){return Gl}function no(e){let n=Gl;return Gl=e,n}function _h(){let e=L.lFrame,n=e.bindingRootIndex;return n===-1&&(n=e.bindingRootIndex=e.tView.bindingStartIndex),n}function Dh(e){return L.lFrame.bindingIndex=e}function ai(){return L.lFrame.bindingIndex++}function ku(e){let n=L.lFrame,t=n.bindingIndex;return n.bindingIndex=n.bindingIndex+e,t}function Ih(){return L.lFrame.inI18n}function wh(e,n){let t=L.lFrame;t.bindingIndex=t.bindingRootIndex=e,rs(n)}function Th(){return L.lFrame.currentDirectiveIndex}function rs(e){L.lFrame.currentDirectiveIndex=e}function Mh(e){let n=L.lFrame.currentDirectiveIndex;return n===-1?null:e[n]}function Lu(){return L.lFrame.currentQueryIndex}function os(e){L.lFrame.currentQueryIndex=e}function NC(e){let n=e[S];return n.type===2?n.declTNode:n.type===1?e[je]:null}function ju(e,n,t){if(t&4){let o=n,i=e;for(;o=o.parent,o===null&&!(t&1);)if(o=NC(i),o===null||(i=i[ar],o.type&10))break;if(o===null)return!1;n=o,e=i}let r=L.lFrame=Sh();return r.currentTNode=n,r.lView=e,!0}function is(e){let n=Sh(),t=e[S];L.lFrame=n,n.currentTNode=t.firstChild,n.lView=e,n.tView=t,n.contextLView=e,n.bindingIndex=t.bindingStartIndex,n.inI18n=!1}function Sh(){let e=L.lFrame,n=e===null?null:e.child;return n===null?Ah(e):n}function Ah(e){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=n),n}function xh(){let e=L.lFrame;return L.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var Bu=xh;function as(){let e=xh();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function Rh(e){return(L.lFrame.contextLView=hh(e,L.lFrame.contextLView))[we]}function xn(){return L.lFrame.selectedIndex}function Rn(e){L.lFrame.selectedIndex=e}function zu(){let e=L.lFrame;return ri(e.tView,e.selectedIndex)}function ss(){L.lFrame.currentNamespace=yu}function Nh(){return L.lFrame.currentNamespace}var Ph=!0;function cs(){return Ph}function si(e){Ph=e}var PC={elements:void 0};function ls(){return PC}function Wl(e,n=null,t=null,r){let o=Vu(e,n,t,r);return o.resolveInjectorInitializers(),o}function Vu(e,n=null,t=null,r,o=new Set){let i=[t||ke,Ja(e)];return r=r||(typeof e=="object"?void 0:Yt(e)),new nr(i,n||Qr(),r||null,o)}var me=class e{static THROW_IF_NOT_FOUND=Xn;static NULL=new Qo;static create(n,t){if(Array.isArray(n))return Wl({name:""},t,n,"");{let r=n.name??"";return Wl({name:r},n.parent,n.providers,r)}}static \u0275prov=v({token:e,providedIn:"any",factory:()=>I(su)});static __NG_ELEMENT_ID__=-1},U=new E(""),ft=(()=>{class e{static __NG_ELEMENT_ID__=OC;static __NG_ENV_ID__=t=>t}return e})(),Yo=class extends ft{_lView;constructor(n){super(),this._lView=n}get destroyed(){return ur(this._lView)}onDestroy(n){let t=this._lView;return Iu(t,n),()=>gh(t,n)}};function OC(){return new Yo(j())}var De=class{_console=console;handleError(n){this._console.error("ERROR",n)}},$e=new E("",{providedIn:"root",factory:()=>{let e=p(ie),n;return t=>{e.destroyed&&!n?setTimeout(()=>{throw t}):(n??=e.get(De),n.handleError(t))}}}),Oh={provide:Kt,useValue:()=>void p(De),multi:!0};function ci(e){return typeof e=="function"&&e[Ne]!==void 0}function Xe(e,n){let[t,r,o]=yl(e,n?.equal),i=t,a=i[Ne];return i.set=r,i.update=o,i.asReadonly=Uu.bind(i),i}function Uu(){let e=this[Ne];if(e.readonlyFn===void 0){let n=()=>this();n[Ne]=e,e.readonlyFn=n}return e.readonlyFn}var At=class{},li=new E("",{providedIn:"root",factory:()=>!1});var Hu=new E(""),qu=new E("");var ro=(()=>{class e{view;node;constructor(t,r){this.view=t,this.node=r}static __NG_ELEMENT_ID__=FC}return e})();function FC(){return new ro(j(),Ce())}var Xt=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new ve(!1);get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new B(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=v({token:e,providedIn:"root",factory:()=>new e})}return e})();function dr(...e){}var ui=(()=>{class e{static \u0275prov=v({token:e,providedIn:"root",factory:()=>new Zl})}return e})(),Zl=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let t=n.zone,r=this.queues.get(t);r.has(n)&&(r.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let t=n.zone;this.queues.has(t)||this.queues.set(t,new Set);let r=this.queues.get(t);r.has(n)||r.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[t,r]of this.queues)t===null?n||=this.flushQueue(r):n||=t.run(()=>this.flushQueue(r));n||(this.dirtyEffectCount=0)}}flushQueue(n){let t=!1;for(let r of n)r.dirty&&(this.dirtyEffectCount--,t=!0,r.run());return t}};function vi(e){return{toString:e}.toString()}function UC(e){return typeof e=="function"}var ys=class{previousValue;currentValue;firstChange;constructor(n,t,r){this.previousValue=n,this.currentValue=t,this.firstChange=r}isFirstChange(){return this.firstChange}};function pg(e,n,t,r){n!==null?n.applyValueToInputSignal(n,r):e[t]=r}var yt=(()=>{let e=()=>fg;return e.ngInherit=!0,e})();function fg(e){return e.type.prototype.ngOnChanges&&(e.setInput=qC),HC}function HC(){let e=hg(this),n=e?.current;if(n){let t=e.previous;if(t===wn)e.previous=n;else for(let r in n)t[r]=n[r];e.current=null,this.ngOnChanges(n)}}function qC(e,n,t,r,o){let i=this.declaredInputs[r],a=hg(e)||$C(e,{previous:wn,current:null}),s=a.current||(a.current={}),c=a.previous,l=c[i];s[i]=new ys(l&&l.currentValue,t,c===wn),pg(e,n,o,t)}var mg="__ngSimpleChanges__";function hg(e){return e[mg]||null}function $C(e,n){return e[mg]=n}var Fh=[];var Y=function(e,n=null,t){for(let r=0;r<Fh.length;r++){let o=Fh[r];o(e,n,t)}};function GC(e,n,t){let{ngOnChanges:r,ngOnInit:o,ngDoCheck:i}=n.type.prototype;if(r){let a=fg(n);(t.preOrderHooks??=[]).push(e,a),(t.preOrderCheckHooks??=[]).push(e,a)}o&&(t.preOrderHooks??=[]).push(0-e,o),i&&((t.preOrderHooks??=[]).push(e,i),(t.preOrderCheckHooks??=[]).push(e,i))}function gg(e,n){for(let t=n.directiveStart,r=n.directiveEnd;t<r;t++){let i=e.data[t].type.prototype,{ngAfterContentInit:a,ngAfterContentChecked:s,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=i;a&&(e.contentHooks??=[]).push(-t,a),s&&((e.contentHooks??=[]).push(t,s),(e.contentCheckHooks??=[]).push(t,s)),c&&(e.viewHooks??=[]).push(-t,c),l&&((e.viewHooks??=[]).push(t,l),(e.viewCheckHooks??=[]).push(t,l)),u!=null&&(e.destroyHooks??=[]).push(t,u)}}function ms(e,n,t){vg(e,n,3,t)}function hs(e,n,t,r){(e[x]&3)===t&&vg(e,n,t,r)}function $u(e,n){let t=e[x];(t&3)===n&&(t&=16383,t+=1,e[x]=t)}function vg(e,n,t,r){let o=r!==void 0?e[sr]&65535:0,i=r??-1,a=n.length-1,s=0;for(let c=o;c<a;c++)if(typeof n[c+1]=="number"){if(s=n[c],r!=null&&s>=r)break}else n[c]<0&&(e[sr]+=65536),(s<i||i==-1)&&(WC(e,t,n,c),e[sr]=(e[sr]&4294901760)+c+2),c++}function kh(e,n){Y(4,e,n);let t=R(null);try{n.call(e)}finally{R(t),Y(5,e,n)}}function WC(e,n,t,r){let o=t[r]<0,i=t[r+1],a=o?-t[r]:t[r],s=e[a];o?e[x]>>14<e[sr]>>16&&(e[x]&3)===n&&(e[x]+=16384,kh(s,i)):kh(s,i)}var io=-1,fr=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,t,r,o){this.factory=n,this.name=o,this.canSeeViewProviders=t,this.injectImpl=r}};function ZC(e){return(e.flags&8)!==0}function QC(e){return(e.flags&16)!==0}function YC(e,n,t){let r=0;for(;r<t.length;){let o=t[r];if(typeof o=="number"){if(o!==0)break;r++;let i=t[r++],a=t[r++],s=t[r++];e.setAttribute(n,a,s,i)}else{let i=o,a=t[++r];KC(i)?e.setProperty(n,i,a):e.setAttribute(n,i,a),r++}}return r}function yg(e){return e===3||e===4||e===6}function KC(e){return e.charCodeAt(0)===64}function ao(e,n){if(!(n===null||n.length===0))if(e===null||e.length===0)e=n.slice();else{let t=-1;for(let r=0;r<n.length;r++){let o=n[r];typeof o=="number"?t=o:t===0||(t===-1||t===2?Lh(e,t,o,null,n[++r]):Lh(e,t,o,null,null))}}return e}function Lh(e,n,t,r,o){let i=0,a=e.length;if(n===-1)a=-1;else for(;i<e.length;){let s=e[i++];if(typeof s=="number"){if(s===n){a=-1;break}else if(s>n){a=i-1;break}}}for(;i<e.length;){let s=e[i];if(typeof s=="number")break;if(s===t){o!==null&&(e[i+1]=o);return}i++,o!==null&&i++}a!==-1&&(e.splice(a,0,n),i=a+1),e.splice(i++,0,t),o!==null&&e.splice(i++,0,o)}function bg(e){return e!==io}function bs(e){return e&32767}function JC(e){return e>>16}function Es(e,n){let t=JC(e),r=n;for(;t>0;)r=r[ar],t--;return r}var td=!0;function Cs(e){let n=td;return td=e,n}var XC=256,Eg=XC-1,Cg=5,e0=0,Lt={};function t0(e,n,t){let r;typeof t=="string"?r=t.charCodeAt(0)||0:t.hasOwnProperty(rr)&&(r=t[rr]),r==null&&(r=t[rr]=e0++);let o=r&Eg,i=1<<o;n.data[e+(o>>Cg)]|=i}function _s(e,n){let t=_g(e,n);if(t!==-1)return t;let r=n[S];r.firstCreatePass&&(e.injectorIndex=n.length,Gu(r.data,e),Gu(n,null),Gu(r.blueprint,null));let o=Fd(e,n),i=e.injectorIndex;if(bg(o)){let a=bs(o),s=Es(o,n),c=s[S].data;for(let l=0;l<8;l++)n[i+l]=s[a+l]|c[a+l]}return n[i+8]=o,i}function Gu(e,n){e.push(0,0,0,0,0,0,0,0,n)}function _g(e,n){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||n[e.injectorIndex+8]===null?-1:e.injectorIndex}function Fd(e,n){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let t=0,r=null,o=n;for(;o!==null;){if(r=Mg(o),r===null)return io;if(t++,o=o[ar],r.injectorIndex!==-1)return r.injectorIndex|t<<16}return io}function nd(e,n,t){t0(e,n,t)}function n0(e,n){if(n==="class")return e.classes;if(n==="style")return e.styles;let t=e.attrs;if(t){let r=t.length,o=0;for(;o<r;){let i=t[o];if(yg(i))break;if(i===0)o=o+2;else if(typeof i=="number")for(o++;o<r&&typeof t[o]=="string";)o++;else{if(i===n)return t[o+1];o=o+2}}}return null}function Dg(e,n,t){if(t&8||e!==void 0)return e;Za(n,"NodeInjector")}function Ig(e,n,t,r){if(t&8&&r===void 0&&(r=null),(t&3)===0){let o=e[ir],i=Fe(void 0);try{return o?o.get(n,r,t&8):iu(n,r,t&8)}finally{Fe(i)}}return Dg(r,n,t)}function wg(e,n,t,r=0,o){if(e!==null){if(n[x]&2048&&!(r&2)){let a=a0(e,n,t,r,Lt);if(a!==Lt)return a}let i=Tg(e,n,t,r,Lt);if(i!==Lt)return i}return Ig(n,t,r,o)}function Tg(e,n,t,r,o){let i=o0(t);if(typeof i=="function"){if(!ju(n,e,r))return r&1?Dg(o,t,r):Ig(n,t,r,o);try{let a;if(a=i(r),a==null&&!(r&8))Za(t);else return a}finally{Bu()}}else if(typeof i=="number"){let a=null,s=_g(e,n),c=io,l=r&1?n[Ue][je]:null;for((s===-1||r&4)&&(c=s===-1?Fd(e,n):n[s+8],c===io||!Bh(r,!1)?s=-1:(a=n[S],s=bs(c),n=Es(c,n)));s!==-1;){let u=n[S];if(jh(i,s,u.data)){let d=r0(s,n,t,a,r,l);if(d!==Lt)return d}c=n[s+8],c!==io&&Bh(r,n[S].data[s+8]===l)&&jh(i,s,n)?(a=u,s=bs(c),n=Es(c,n)):s=-1}}return o}function r0(e,n,t,r,o,i){let a=n[S],s=a.data[e+8],c=r==null?Sn(s)&&td:r!=a&&(s.type&3)!==0,l=o&1&&i===s,u=gs(s,a,t,c,l);return u!==null?fi(n,a,u,s,o):Lt}function gs(e,n,t,r,o){let i=e.providerIndexes,a=n.data,s=i&1048575,c=e.directiveStart,l=e.directiveEnd,u=i>>20,d=r?s:s+u,m=o?s+u:l;for(let f=d;f<m;f++){let g=a[f];if(f<c&&t===g||f>=c&&g.type===t)return f}if(o){let f=a[c];if(f&&Ft(f)&&f.type===t)return c}return null}function fi(e,n,t,r,o){let i=e[t],a=n.data;if(i instanceof fr){let s=i;if(s.resolving){let f=Ua(a[t]);throw ou(f)}let c=Cs(s.canSeeViewProviders);s.resolving=!0;let l=a[t].type||a[t],u,d=s.injectImpl?Fe(s.injectImpl):null,m=ju(e,r,0);try{i=e[t]=s.factory(void 0,o,a,e,r),n.firstCreatePass&&t>=r.directiveStart&&GC(t,a[t],n)}finally{d!==null&&Fe(d),Cs(c),s.resolving=!1,Bu()}}return i}function o0(e){if(typeof e=="string")return e.charCodeAt(0)||0;let n=e.hasOwnProperty(rr)?e[rr]:void 0;return typeof n=="number"?n>=0?n&Eg:i0:n}function jh(e,n,t){let r=1<<e;return!!(t[n+(e>>Cg)]&r)}function Bh(e,n){return!(e&2)&&!(e&1&&n)}var pr=class{_tNode;_lView;constructor(n,t){this._tNode=n,this._lView=t}get(n,t,r){return wg(this._tNode,this._lView,n,er(r),t)}};function i0(){return new pr(Ce(),j())}function hr(e){return vi(()=>{let n=e.prototype.constructor,t=n[Zo]||rd(n),r=Object.prototype,o=Object.getPrototypeOf(e.prototype).constructor;for(;o&&o!==r;){let i=o[Zo]||rd(o);if(i&&i!==t)return i;o=Object.getPrototypeOf(o)}return i=>new i})}function rd(e){return Ql(e)?()=>{let n=rd(_e(e));return n&&n()}:Dn(e)}function a0(e,n,t,r,o){let i=e,a=n;for(;i!==null&&a!==null&&a[x]&2048&&!eo(a);){let s=Tg(i,a,t,r|2,Lt);if(s!==Lt)return s;let c=i.parent;if(!c){let l=a[gu];if(l){let u=l.get(t,Lt,r);if(u!==Lt)return u}c=Mg(a),a=a[ar]}i=c}return o}function Mg(e){let n=e[S],t=n.type;return t===2?n.declTNode:t===1?e[je]:null}function yi(e){return n0(Ce(),e)}function s0(){return lo(Ce(),j())}function lo(e,n){return new pe(ut(e,n))}var pe=(()=>{class e{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=s0}return e})();function c0(e){return e instanceof pe?e.nativeElement:e}function l0(){return this._results[Symbol.iterator]()}var en=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new V}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,t){return this._results.reduce(n,t)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,t){this.dirty=!1;let r=oh(n);(this._changesDetected=!rh(this._results,r,t))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=l0};function Sg(e){return(e.flags&128)===128}var kd=(function(e){return e[e.OnPush=0]="OnPush",e[e.Default=1]="Default",e})(kd||{}),Ag=new Map,u0=0;function d0(){return u0++}function p0(e){Ag.set(e[ti],e)}function od(e){Ag.delete(e[ti])}var zh="__ngContext__";function so(e,n){Ot(n)?(e[zh]=n[ti],p0(n)):e[zh]=n}function xg(e){return Ng(e[Jr])}function Rg(e){return Ng(e[Ye])}function Ng(e){for(;e!==null&&!lt(e);)e=e[Ye];return e}var id;function Ld(e){id=e}function Pg(){if(id!==void 0)return id;if(typeof document<"u")return document;throw new b(210,!1)}var uo=new E("",{providedIn:"root",factory:()=>f0}),f0="ng",Ls=new E(""),Fn=new E("",{providedIn:"platform",factory:()=>"unknown"});var jd=new E(""),po=new E("",{providedIn:"root",factory:()=>Pg().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var m0="h",h0="b";var Og=!1,Fg=new E("",{providedIn:"root",factory:()=>Og});var js=new E("");var g0=(e,n,t,r)=>{};function v0(e,n,t,r){g0(e,n,t,r)}function Bs(e){return(e.flags&32)===32}var y0=()=>null;function kg(e,n,t=!1){return y0(e,n,t)}function Lg(e,n){let t=e.contentQueries;if(t!==null){let r=R(null);try{for(let o=0;o<t.length;o+=2){let i=t[o],a=t[o+1];if(a!==-1){let s=e.data[a];os(i),s.contentQueries(2,n[a],a)}}}finally{R(r)}}}function ad(e,n,t){os(0);let r=R(null);try{n(e,t)}finally{R(r)}}function Bd(e,n,t){if(vu(n)){let r=R(null);try{let o=n.directiveStart,i=n.directiveEnd;for(let a=o;a<i;a++){let s=e.data[a];if(s.contentQueries){let c=t[a];s.contentQueries(1,c,a)}}}finally{R(r)}}}var tn=(function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e})(tn||{}),us;function b0(){if(us===void 0&&(us=null,Le.trustedTypes))try{us=Le.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return us}function zs(e){return b0()?.createHTML(e)||e}var ds;function E0(){if(ds===void 0&&(ds=null,Le.trustedTypes))try{ds=Le.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return ds}function Vh(e){return E0()?.createScriptURL(e)||e}var nn=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${qa})`}},sd=class extends nn{getTypeName(){return"HTML"}},cd=class extends nn{getTypeName(){return"Style"}},ld=class extends nn{getTypeName(){return"Script"}},ud=class extends nn{getTypeName(){return"URL"}},dd=class extends nn{getTypeName(){return"ResourceURL"}};function et(e){return e instanceof nn?e.changingThisBreaksApplicationSecurity:e}function an(e,n){let t=jg(e);if(t!=null&&t!==n){if(t==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${t} (see ${qa})`)}return t===n}function jg(e){return e instanceof nn&&e.getTypeName()||null}function zd(e){return new sd(e)}function Vd(e){return new cd(e)}function Ud(e){return new ld(e)}function Hd(e){return new ud(e)}function qd(e){return new dd(e)}function C0(e){let n=new fd(e);return _0()?new pd(n):n}var pd=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let t=new window.DOMParser().parseFromString(zs(n),"text/html").body;return t===null?this.inertDocumentHelper.getInertBodyElement(n):(t.firstChild?.remove(),t)}catch{return null}}},fd=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let t=this.inertDocument.createElement("template");return t.innerHTML=zs(n),t}};function _0(){try{return!!new window.DOMParser().parseFromString(zs(""),"text/html")}catch{return!1}}var D0=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function bi(e){return e=String(e),e.match(D0)?e:"unsafe:"+e}function sn(e){let n={};for(let t of e.split(","))n[t]=!0;return n}function Ei(...e){let n={};for(let t of e)for(let r in t)t.hasOwnProperty(r)&&(n[r]=!0);return n}var Bg=sn("area,br,col,hr,img,wbr"),zg=sn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),Vg=sn("rp,rt"),I0=Ei(Vg,zg),w0=Ei(zg,sn("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),T0=Ei(Vg,sn("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Uh=Ei(Bg,w0,T0,I0),Ug=sn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),M0=sn("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),S0=sn("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),A0=Ei(Ug,M0,S0),x0=sn("script,style,template"),md=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let t=n.firstChild,r=!0,o=[];for(;t;){if(t.nodeType===Node.ELEMENT_NODE?r=this.startElement(t):t.nodeType===Node.TEXT_NODE?this.chars(t.nodeValue):this.sanitizedSomething=!0,r&&t.firstChild){o.push(t),t=P0(t);continue}for(;t;){t.nodeType===Node.ELEMENT_NODE&&this.endElement(t);let i=N0(t);if(i){t=i;break}t=o.pop()}}return this.buf.join("")}startElement(n){let t=Hh(n).toLowerCase();if(!Uh.hasOwnProperty(t))return this.sanitizedSomething=!0,!x0.hasOwnProperty(t);this.buf.push("<"),this.buf.push(t);let r=n.attributes;for(let o=0;o<r.length;o++){let i=r.item(o),a=i.name,s=a.toLowerCase();if(!A0.hasOwnProperty(s)){this.sanitizedSomething=!0;continue}let c=i.value;Ug[s]&&(c=bi(c)),this.buf.push(" ",a,'="',qh(c),'"')}return this.buf.push(">"),!0}endElement(n){let t=Hh(n).toLowerCase();Uh.hasOwnProperty(t)&&!Bg.hasOwnProperty(t)&&(this.buf.push("</"),this.buf.push(t),this.buf.push(">"))}chars(n){this.buf.push(qh(n))}};function R0(e,n){return(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function N0(e){let n=e.nextSibling;if(n&&e!==n.previousSibling)throw Hg(n);return n}function P0(e){let n=e.firstChild;if(n&&R0(e,n))throw Hg(n);return n}function Hh(e){let n=e.nodeName;return typeof n=="string"?n:"FORM"}function Hg(e){return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)}var O0=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,F0=/([^\#-~ |!])/g;function qh(e){return e.replace(/&/g,"&amp;").replace(O0,function(n){let t=n.charCodeAt(0),r=n.charCodeAt(1);return"&#"+((t-55296)*1024+(r-56320)+65536)+";"}).replace(F0,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var ps;function $d(e,n){let t=null;try{ps=ps||C0(e);let r=n?String(n):"";t=ps.getInertBodyElement(r);let o=5,i=r;do{if(o===0)throw new Error("Failed to sanitize html because the input is unstable");o--,r=i,i=t.innerHTML,t=ps.getInertBodyElement(r)}while(r!==i);let s=new md().sanitizeChildren($h(t)||t);return zs(s)}finally{if(t){let r=$h(t)||t;for(;r.firstChild;)r.firstChild.remove()}}}function $h(e){return"content"in e&&k0(e)?e.content:null}function k0(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}var Te=(function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e})(Te||{});function jt(e){let n=$g();return n?n.sanitize(Te.URL,e)||"":an(e,"URL")?et(e):bi(Jo(e))}function qg(e){let n=$g();if(n)return Vh(n.sanitize(Te.RESOURCE_URL,e)||"");if(an(e,"ResourceURL"))return Vh(et(e));throw new b(904,!1)}function L0(e,n){return n==="src"&&(e==="embed"||e==="frame"||e==="iframe"||e==="media"||e==="script")||n==="href"&&(e==="base"||e==="link")?qg:jt}function Gd(e,n,t){return L0(n,t)(e)}function $g(){let e=j();return e&&e[Nt].sanitizer}var j0=/^>|^->|<!--|-->|--!>|<!-$/g,B0=/(<|>)/g,z0="\u200B$1\u200B";function V0(e){return e.replace(j0,n=>n.replace(B0,z0))}function Wd(e){return e.ownerDocument.defaultView}function Gg(e){return e instanceof Function?e():e}function U0(e,n,t){let r=e.length;for(;;){let o=e.indexOf(n,t);if(o===-1)return o;if(o===0||e.charCodeAt(o-1)<=32){let i=n.length;if(o+i===r||e.charCodeAt(o+i)<=32)return o}t=o+1}}var Wg="ng-template";function H0(e,n,t,r){let o=0;if(r){for(;o<n.length&&typeof n[o]=="string";o+=2)if(n[o]==="class"&&U0(n[o+1].toLowerCase(),t,0)!==-1)return!0}else if(Zd(e))return!1;if(o=n.indexOf(1,o),o>-1){let i;for(;++o<n.length&&typeof(i=n[o])=="string";)if(i.toLowerCase()===t)return!0}return!1}function Zd(e){return e.type===4&&e.value!==Wg}function q0(e,n,t){let r=e.type===4&&!t?Wg:e.value;return n===r}function $0(e,n,t){let r=4,o=e.attrs,i=o!==null?Z0(o):0,a=!1;for(let s=0;s<n.length;s++){let c=n[s];if(typeof c=="number"){if(!a&&!mt(r)&&!mt(c))return!1;if(a&&mt(c))continue;a=!1,r=c|r&1;continue}if(!a)if(r&4){if(r=2|r&1,c!==""&&!q0(e,c,t)||c===""&&n.length===1){if(mt(r))return!1;a=!0}}else if(r&8){if(o===null||!H0(e,o,c,t)){if(mt(r))return!1;a=!0}}else{let l=n[++s],u=G0(c,o,Zd(e),t);if(u===-1){if(mt(r))return!1;a=!0;continue}if(l!==""){let d;if(u>i?d="":d=o[u+1].toLowerCase(),r&2&&l!==d){if(mt(r))return!1;a=!0}}}}return mt(r)||a}function mt(e){return(e&1)===0}function G0(e,n,t,r){if(n===null)return-1;let o=0;if(r||!t){let i=!1;for(;o<n.length;){let a=n[o];if(a===e)return o;if(a===3||a===6)i=!0;else if(a===1||a===2){let s=n[++o];for(;typeof s=="string";)s=n[++o];continue}else{if(a===4)break;if(a===0){o+=4;continue}}o+=i?1:2}return-1}else return Q0(n,e)}function Zg(e,n,t=!1){for(let r=0;r<n.length;r++)if($0(e,n[r],t))return!0;return!1}function W0(e){let n=e.attrs;if(n!=null){let t=n.indexOf(5);if((t&1)===0)return n[t+1]}return null}function Z0(e){for(let n=0;n<e.length;n++){let t=e[n];if(yg(t))return n}return e.length}function Q0(e,n){let t=e.indexOf(4);if(t>-1)for(t++;t<e.length;){let r=e[t];if(typeof r=="number")return-1;if(r===n)return t;t++}return-1}function Y0(e,n){e:for(let t=0;t<n.length;t++){let r=n[t];if(e.length===r.length){for(let o=0;o<e.length;o++)if(e[o]!==r[o])continue e;return!0}}return!1}function Gh(e,n){return e?":not("+n.trim()+")":n}function K0(e){let n=e[0],t=1,r=2,o="",i=!1;for(;t<e.length;){let a=e[t];if(typeof a=="string")if(r&2){let s=e[++t];o+="["+a+(s.length>0?'="'+s+'"':"")+"]"}else r&8?o+="."+a:r&4&&(o+=" "+a);else o!==""&&!mt(a)&&(n+=Gh(i,o),o=""),r=a,i=i||!mt(r);t++}return o!==""&&(n+=Gh(i,o)),n}function J0(e){return e.map(K0).join(",")}function X0(e){let n=[],t=[],r=1,o=2;for(;r<e.length;){let i=e[r];if(typeof i=="string")o===2?i!==""&&n.push(i,e[++r]):o===8&&t.push(i);else{if(!mt(o))break;o=i}r++}return t.length&&n.push(1,...t),n}var tt={};function e_(e,n){return e.createText(n)}function t_(e,n,t){e.setValue(n,t)}function n_(e,n){return e.createComment(V0(n))}function Qg(e,n,t){return e.createElement(n,t)}function Ds(e,n,t,r,o){e.insertBefore(n,t,r,o)}function Yg(e,n,t){e.appendChild(n,t)}function Wh(e,n,t,r,o){r!==null?Ds(e,n,t,r,o):Yg(e,n,t)}function r_(e,n,t){e.removeChild(null,n,t)}function o_(e,n,t){e.setAttribute(n,"style",t)}function i_(e,n,t){t===""?e.removeAttribute(n,"class"):e.setAttribute(n,"class",t)}function Kg(e,n,t){let{mergedAttrs:r,classes:o,styles:i}=t;r!==null&&YC(e,n,r),o!==null&&i_(e,n,o),i!==null&&o_(e,n,i)}function Qd(e,n,t,r,o,i,a,s,c,l,u){let d=se+r,m=d+o,f=a_(d,m),g=typeof l=="function"?l():l;return f[S]={type:e,blueprint:f,template:t,queries:null,viewQuery:s,declTNode:n,data:f.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:m,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof i=="function"?i():i,pipeRegistry:typeof a=="function"?a():a,firstChild:null,schemas:c,consts:g,incompleteFirstPass:!1,ssrId:u}}function a_(e,n){let t=[];for(let r=0;r<n;r++)t.push(r<e?null:tt);return t}function s_(e){let n=e.tView;return n===null||n.incompleteFirstPass?e.tView=Qd(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):n}function Yd(e,n,t,r,o,i,a,s,c,l,u){let d=n.blueprint.slice();return d[ct]=o,d[x]=r|4|128|8|64|1024,(l!==null||e&&e[x]&2048)&&(d[x]|=2048),_u(d),d[Ee]=d[ar]=e,d[we]=t,d[Nt]=a||e&&e[Nt],d[ae]=s||e&&e[ae],d[ir]=c||e&&e[ir]||null,d[je]=i,d[ti]=d0(),d[Yr]=u,d[gu]=l,d[Ue]=n.type==2?e[Ue]:d,d}function c_(e,n,t){let r=ut(n,e),o=s_(t),i=e[Nt].rendererFactory,a=Kd(e,Yd(e,o,null,Jg(t),r,n,null,i.createRenderer(r,t),null,null,null));return e[n.index]=a}function Jg(e){let n=16;return e.signals?n=4096:e.onPush&&(n=64),n}function Xg(e,n,t,r){if(t===0)return-1;let o=n.length;for(let i=0;i<t;i++)n.push(r),e.blueprint.push(r),e.data.push(null);return o}function Kd(e,n){return e[Jr]?e[hu][Ye]=n:e[Jr]=n,e[hu]=n,n}function _(e=1){ev(he(),j(),xn()+e,!1)}function ev(e,n,t,r){if(!r)if((n[x]&3)===3){let i=e.preOrderCheckHooks;i!==null&&ms(n,i,t)}else{let i=e.preOrderHooks;i!==null&&hs(n,i,0,t)}Rn(t)}var Vs=(function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e})(Vs||{});function hd(e,n,t,r){let o=R(null);try{let[i,a,s]=e.inputs[t],c=null;(a&Vs.SignalBased)!==0&&(c=n[i][Ne]),c!==null&&c.transformFn!==void 0?r=c.transformFn(r):s!==null&&(r=s.call(n,r)),e.setInput!==null?e.setInput(n,c,r,t,i):pg(n,c,i,r)}finally{R(o)}}var gt=(function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e})(gt||{}),l_;function Jd(e,n){return l_(e,n)}function oo(e,n,t,r,o){if(r!=null){let i,a=!1;lt(r)?i=r:Ot(r)&&(a=!0,r=r[ct]);let s=Ke(r);e===0&&t!==null?o==null?Yg(n,t,s):Ds(n,t,s,o||null,!0):e===1&&t!==null?Ds(n,t,s,o||null,!0):e===2?r_(n,s,a):e===3&&n.destroyNode(s),i!=null&&b_(n,e,i,t,o)}}function u_(e,n){tv(e,n),n[ct]=null,n[je]=null}function d_(e,n,t,r,o,i){r[ct]=o,r[je]=n,Us(e,r,t,1,o,i)}function tv(e,n){n[Nt].changeDetectionScheduler?.notify(9),Us(e,n,n[ae],2,null,null)}function p_(e){let n=e[Jr];if(!n)return Wu(e[S],e);for(;n;){let t=null;if(Ot(n))t=n[Jr];else{let r=n[xe];r&&(t=r)}if(!t){for(;n&&!n[Ye]&&n!==e;)Ot(n)&&Wu(n[S],n),n=n[Ee];n===null&&(n=e),Ot(n)&&Wu(n[S],n),t=n&&n[Ye]}n=t}}function Xd(e,n){let t=e[lr],r=t.indexOf(n);t.splice(r,1)}function ep(e,n){if(ur(n))return;let t=n[ae];t.destroyNode&&Us(e,n,t,3,null,null),p_(n)}function Wu(e,n){if(ur(n))return;let t=R(null);try{n[x]&=-129,n[x]|=256,n[qe]&&Wn(n[qe]),m_(e,n),f_(e,n),n[S].type===1&&n[ae].destroy();let r=n[Tn];if(r!==null&&lt(n[Ee])){r!==n[Ee]&&Xd(r,n);let o=n[Pt];o!==null&&o.detachView(e)}od(n)}finally{R(t)}}function f_(e,n){let t=e.cleanup,r=n[Kr];if(t!==null)for(let a=0;a<t.length-1;a+=2)if(typeof t[a]=="string"){let s=t[a+3];s>=0?r[s]():r[-s].unsubscribe(),a+=2}else{let s=r[t[a+1]];t[a].call(s)}r!==null&&(n[Kr]=null);let o=n[Qt];if(o!==null){n[Qt]=null;for(let a=0;a<o.length;a++){let s=o[a];s()}}let i=n[Jt];if(i!==null){n[Jt]=null;for(let a of i)a.destroy()}}function m_(e,n){let t;if(e!=null&&(t=e.destroyHooks)!=null)for(let r=0;r<t.length;r+=2){let o=n[t[r]];if(!(o instanceof fr)){let i=t[r+1];if(Array.isArray(i))for(let a=0;a<i.length;a+=2){let s=o[i[a]],c=i[a+1];Y(4,s,c);try{c.call(s)}finally{Y(5,s,c)}}else{Y(4,o,i);try{i.call(o)}finally{Y(5,o,i)}}}}}function nv(e,n,t){return h_(e,n.parent,t)}function h_(e,n,t){let r=n;for(;r!==null&&r.type&168;)n=r,r=n.parent;if(r===null)return t[ct];if(Sn(r)){let{encapsulation:o}=e.data[r.directiveStart+r.componentOffset];if(o===tn.None||o===tn.Emulated)return null}return ut(r,t)}function rv(e,n,t){return v_(e,n,t)}function g_(e,n,t){return e.type&40?ut(e,t):null}var v_=g_,Zh;function tp(e,n,t,r){let o=nv(e,r,n),i=n[ae],a=r.parent||n[je],s=rv(a,r,n);if(o!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)Wh(i,o,t[c],s,!1);else Wh(i,o,t,s,!1);Zh!==void 0&&Zh(i,r,n,t,o)}function di(e,n){if(n!==null){let t=n.type;if(t&3)return ut(n,e);if(t&4)return gd(-1,e[n.index]);if(t&8){let r=n.child;if(r!==null)return di(e,r);{let o=e[n.index];return lt(o)?gd(-1,o):Ke(o)}}else{if(t&128)return di(e,n.next);if(t&32)return Jd(n,e)()||Ke(e[n.index]);{let r=ov(e,n);if(r!==null){if(Array.isArray(r))return r[0];let o=In(e[Ue]);return di(o,r)}else return di(e,n.next)}}}return null}function ov(e,n){if(n!==null){let r=e[Ue][je],o=n.projection;return r.projection[o]}return null}function gd(e,n){let t=xe+e+1;if(t<n.length){let r=n[t],o=r[S].firstChild;if(o!==null)return di(r,o)}return n[Mn]}function np(e,n,t,r,o,i,a){for(;t!=null;){if(t.type===128){t=t.next;continue}let s=r[t.index],c=t.type;if(a&&n===0&&(s&&so(Ke(s),r),t.flags|=2),!Bs(t))if(c&8)np(e,n,t.child,r,o,i,!1),oo(n,e,o,s,i);else if(c&32){let l=Jd(t,r),u;for(;u=l();)oo(n,e,o,u,i);oo(n,e,o,s,i)}else c&16?iv(e,n,r,t,o,i):oo(n,e,o,s,i);t=a?t.projectionNext:t.next}}function Us(e,n,t,r,o,i){np(t,r,e.firstChild,n,o,i,!1)}function y_(e,n,t){let r=n[ae],o=nv(e,t,n),i=t.parent||n[je],a=rv(i,t,n);iv(r,0,n,t,o,a)}function iv(e,n,t,r,o,i){let a=t[Ue],c=a[je].projection[r.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];oo(n,e,o,u,i)}else{let l=c,u=a[Ee];Sg(r)&&(l.flags|=128),np(e,n,l,u,o,i,!0)}}function b_(e,n,t,r,o){let i=t[Mn],a=Ke(t);i!==a&&oo(n,e,r,i,o);for(let s=xe;s<t.length;s++){let c=t[s];Us(c[S],c,e,n,r,i)}}function E_(e,n,t,r,o){if(n)o?e.addClass(t,r):e.removeClass(t,r);else{let i=r.indexOf("-")===-1?void 0:gt.DashCase;o==null?e.removeStyle(t,r,i):(typeof o=="string"&&o.endsWith("!important")&&(o=o.slice(0,-10),i|=gt.Important),e.setStyle(t,r,o,i))}}function av(e,n,t,r,o){let i=xn(),a=r&2;try{Rn(-1),a&&n.length>se&&ev(e,n,se,!1),Y(a?2:0,o,t),t(r,o)}finally{Rn(i),Y(a?3:1,o,t)}}function Hs(e,n,t){S_(e,n,t),(t.flags&64)===64&&A_(e,n,t)}function Ci(e,n,t=ut){let r=n.localNames;if(r!==null){let o=n.index+1;for(let i=0;i<r.length;i+=2){let a=r[i+1],s=a===-1?t(n,e):e[a];e[o++]=s}}}function C_(e,n,t,r){let i=r.get(Fg,Og)||t===tn.ShadowDom,a=e.selectRootElement(n,i);return __(a),a}function __(e){D_(e)}var D_=()=>null;function I_(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function w_(e,n,t,r,o,i){let a=n[S];if(ap(e,a,n,t,r)){Sn(e)&&M_(n,e.index);return}e.type&3&&(t=I_(t)),T_(e,n,t,r,o,i)}function T_(e,n,t,r,o,i){if(e.type&3){let a=ut(e,n);r=i!=null?i(r,e.value||"",t):r,o.setProperty(a,t,r)}else e.type&12}function M_(e,n){let t=Je(n,e);t[x]&16||(t[x]|=64)}function S_(e,n,t){let r=t.directiveStart,o=t.directiveEnd;Sn(t)&&c_(n,t,e.data[r+t.componentOffset]),e.firstCreatePass||_s(t,n);let i=t.initialInputs;for(let a=r;a<o;a++){let s=e.data[a],c=fi(n,e,a,t);if(so(c,n),i!==null&&P_(n,a-r,c,s,t,i),Ft(s)){let l=Je(t.index,n);l[we]=fi(n,e,a,t)}}}function A_(e,n,t){let r=t.directiveStart,o=t.directiveEnd,i=t.index,a=Th();try{Rn(i);for(let s=r;s<o;s++){let c=e.data[s],l=n[s];rs(s),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&x_(c,l)}}finally{Rn(-1),rs(a)}}function x_(e,n){e.hostBindings!==null&&e.hostBindings(1,n)}function rp(e,n){let t=e.directiveRegistry,r=null;if(t)for(let o=0;o<t.length;o++){let i=t[o];Zg(n,i.selectors,!1)&&(r??=[],Ft(i)?r.unshift(i):r.push(i))}return r}function R_(e,n,t,r,o,i){let a=ut(e,n);N_(n[ae],a,i,e.value,t,r,o)}function N_(e,n,t,r,o,i,a){if(i==null)e.removeAttribute(n,o,t);else{let s=a==null?Jo(i):a(i,r||"",o);e.setAttribute(n,o,s,t)}}function P_(e,n,t,r,o,i){let a=i[n];if(a!==null)for(let s=0;s<a.length;s+=2){let c=a[s],l=a[s+1];hd(r,t,c,l)}}function op(e,n,t,r,o){let i=se+t,a=n[S],s=o(a,n,e,r,t);n[i]=s,to(e,!0);let c=e.type===2;return c?(Kg(n[ae],s,e),(yh()===0||Xr(e))&&so(s,n),bh()):so(s,n),cs()&&(!c||!Bs(e))&&tp(a,n,s,e),e}function ip(e){let n=e;return Nu()?Pu():(n=n.parent,to(n,!1)),n}function O_(e,n){let t=e[ir];if(!t)return;let r;try{r=t.get($e,null)}catch{r=null}r?.(n)}function ap(e,n,t,r,o){let i=e.inputs?.[r],a=e.hostDirectiveInputs?.[r],s=!1;if(a)for(let c=0;c<a.length;c+=2){let l=a[c],u=a[c+1],d=n.data[l];hd(d,t[l],u,o),s=!0}if(i)for(let c of i){let l=t[c],u=n.data[c];hd(u,l,r,o),s=!0}return s}function F_(e,n){let t=Je(n,e),r=t[S];k_(r,t);let o=t[ct];o!==null&&t[Yr]===null&&(t[Yr]=kg(o,t[ir])),Y(18),sp(r,t,t[we]),Y(19,t[we])}function k_(e,n){for(let t=n.length;t<e.blueprint.length;t++)n.push(e.blueprint[t])}function sp(e,n,t){is(n);try{let r=e.viewQuery;r!==null&&ad(1,r,t);let o=e.template;o!==null&&av(e,n,o,1,t),e.firstCreatePass&&(e.firstCreatePass=!1),n[Pt]?.finishViewCreation(e),e.staticContentQueries&&Lg(e,n),e.staticViewQueries&&ad(2,e.viewQuery,t);let i=e.components;i!==null&&L_(n,i)}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),r}finally{n[x]&=-5,as()}}function L_(e,n){for(let t=0;t<n.length;t++)F_(e,n[t])}function cp(e,n,t,r){let o=R(null);try{let i=n.tView,s=e[x]&4096?4096:16,c=Yd(e,i,t,s,null,n,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),l=e[n.index];c[Tn]=l;let u=e[Pt];return u!==null&&(c[Pt]=u.createEmbeddedView(i)),sp(i,c,t),c}finally{R(o)}}function Is(e,n){return!n||n.firstChild===null||Sg(e)}var Qh=!1,j_=new E("");function mi(e,n,t,r,o=!1){for(;t!==null;){if(t.type===128){t=o?t.projectionNext:t.next;continue}let i=n[t.index];i!==null&&r.push(Ke(i)),lt(i)&&sv(i,r);let a=t.type;if(a&8)mi(e,n,t.child,r);else if(a&32){let s=Jd(t,n),c;for(;c=s();)r.push(c)}else if(a&16){let s=ov(n,t);if(Array.isArray(s))r.push(...s);else{let c=In(n[Ue]);mi(c[S],c,s,r,!0)}}t=o?t.projectionNext:t.next}return r}function sv(e,n){for(let t=xe;t<e.length;t++){let r=e[t],o=r[S].firstChild;o!==null&&mi(r[S],r,o,n)}e[Mn]!==e[ct]&&n.push(e[Mn])}function cv(e){if(e[cr]!==null){for(let n of e[cr])n.impl.addSequence(n);e[cr].length=0}}var lv=[];function B_(e){return e[qe]??z_(e)}function z_(e){let n=lv.pop()??Object.create(U_);return n.lView=e,n}function V_(e){e.lView[qe]!==e&&(e.lView=null,lv.push(e))}var U_=$(y({},Or),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{An(e.lView)},consumerOnSignalRead(){this.lView[qe]=this}});function H_(e){let n=e[qe]??Object.create(q_);return n.lView=e,n}var q_=$(y({},Or),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{let n=In(e.lView);for(;n&&!uv(n[S]);)n=In(n);n&&Du(n)},consumerOnSignalRead(){this.lView[qe]=this}});function uv(e){return e.type!==2}function dv(e){if(e[Jt]===null)return;let n=!0;for(;n;){let t=!1;for(let r of e[Jt])r.dirty&&(t=!0,r.zone===null||Zone.current===r.zone?r.run():r.zone.run(()=>r.run()));n=t&&!!(e[x]&8192)}}var $_=100;function lp(e,n=0){let r=e[Nt].rendererFactory,o=!1;o||r.begin?.();try{G_(e,n)}finally{o||r.end?.()}}function G_(e,n){let t=Fu();try{no(!0),vd(e,n);let r=0;for(;oi(e);){if(r===$_)throw new b(103,!1);r++,vd(e,1)}}finally{no(t)}}function pv(e,n){Ou(n?ii.Exhaustive:ii.OnlyDirtyViews);try{lp(e)}finally{Ou(ii.Off)}}function W_(e,n,t,r){if(ur(n))return;let o=n[x],i=!1,a=!1;is(n);let s=!0,c=null,l=null;i||(uv(e)?(l=B_(n),c=Fr(l)):fa()===null?(s=!1,l=H_(n),c=Fr(l)):n[qe]&&(Wn(n[qe]),n[qe]=null));try{_u(n),Dh(e.bindingStartIndex),t!==null&&av(e,n,t,2,r);let u=(o&3)===3;if(!i)if(u){let f=e.preOrderCheckHooks;f!==null&&ms(n,f,null)}else{let f=e.preOrderHooks;f!==null&&hs(n,f,0,null),$u(n,0)}if(a||Z_(n),dv(n),fv(n,0),e.contentQueries!==null&&Lg(e,n),!i)if(u){let f=e.contentCheckHooks;f!==null&&ms(n,f)}else{let f=e.contentHooks;f!==null&&hs(n,f,1),$u(n,1)}Y_(e,n);let d=e.components;d!==null&&hv(n,d,0);let m=e.viewQuery;if(m!==null&&ad(2,m,r),!i)if(u){let f=e.viewCheckHooks;f!==null&&ms(n,f)}else{let f=e.viewHooks;f!==null&&hs(n,f,2),$u(n,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),n[Xa]){for(let f of n[Xa])f();n[Xa]=null}i||(cv(n),n[x]&=-73)}catch(u){throw i||An(n),u}finally{l!==null&&(zo(l,c),s&&V_(l)),as()}}function fv(e,n){for(let t=xg(e);t!==null;t=Rg(t))for(let r=xe;r<t.length;r++){let o=t[r];mv(o,n)}}function Z_(e){for(let n=xg(e);n!==null;n=Rg(n)){if(!(n[x]&2))continue;let t=n[lr];for(let r=0;r<t.length;r++){let o=t[r];Du(o)}}}function Q_(e,n,t){Y(18);let r=Je(n,e);mv(r,t),Y(19,r[we])}function mv(e,n){es(e)&&vd(e,n)}function vd(e,n){let r=e[S],o=e[x],i=e[qe],a=!!(n===0&&o&16);if(a||=!!(o&64&&n===0),a||=!!(o&1024),a||=!!(i?.dirty&&kr(i)),a||=!1,i&&(i.dirty=!1),e[x]&=-9217,a)W_(r,e,r.template,e[we]);else if(o&8192){let s=R(null);try{dv(e),fv(e,1);let c=r.components;c!==null&&hv(e,c,1),cv(e)}finally{R(s)}}}function hv(e,n,t){for(let r=0;r<n.length;r++)Q_(e,n[r],t)}function Y_(e,n){let t=e.hostBindingOpCodes;if(t!==null)try{for(let r=0;r<t.length;r++){let o=t[r];if(o<0)Rn(~o);else{let i=o,a=t[++r],s=t[++r];wh(a,i);let c=n[i];Y(24,c),s(2,c),Y(25,c)}}}finally{Rn(-1)}}function up(e,n){let t=Fu()?64:1088;for(e[Nt].changeDetectionScheduler?.notify(n);e;){e[x]|=t;let r=In(e);if(eo(e)&&!r)return e;e=r}return null}function gv(e,n,t,r){return[e,!0,0,n,null,r,null,t,null,null]}function K_(e,n){let t=xe+n;if(t<e.length)return e[t]}function dp(e,n,t,r=!0){let o=n[S];if(X_(o,n,e,t),r){let a=gd(t,e),s=n[ae],c=s.parentNode(e[Mn]);c!==null&&d_(o,e[je],s,n,c,a)}let i=n[Yr];i!==null&&i.firstChild!==null&&(i.firstChild=null)}function J_(e,n){let t=ws(e,n);return t!==void 0&&ep(t[S],t),t}function ws(e,n){if(e.length<=xe)return;let t=xe+n,r=e[t];if(r){let o=r[Tn];o!==null&&o!==e&&Xd(o,r),n>0&&(e[t-1][Ye]=r[Ye]);let i=Xo(e,xe+n);u_(r[S],r);let a=i[Pt];a!==null&&a.detachView(i[S]),r[Ee]=null,r[Ye]=null,r[x]&=-129}return r}function X_(e,n,t,r){let o=xe+r,i=t.length;r>0&&(t[o-1][Ye]=n),r<i-xe?(n[Ye]=t[o],au(t,xe+r,n)):(t.push(n),n[Ye]=null),n[Ee]=t;let a=n[Tn];a!==null&&t!==a&&vv(a,n);let s=n[Pt];s!==null&&s.insertView(e),ts(n),n[x]|=128}function vv(e,n){let t=e[lr],r=n[Ee];if(Ot(r))e[x]|=2;else{let o=r[Ee][Ue];n[Ue]!==o&&(e[x]|=2)}t===null?e[lr]=[n]:t.push(n)}var Nn=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,t=n[S];return mi(t,n,t.firstChild,[])}constructor(n,t){this._lView=n,this._cdRefInjectingView=t}get context(){return this._lView[we]}set context(n){this._lView[we]=n}get destroyed(){return ur(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[Ee];if(lt(n)){let t=n[ni],r=t?t.indexOf(this):-1;r>-1&&(ws(n,r),Xo(t,r))}this._attachedToViewContainer=!1}ep(this._lView[S],this._lView)}onDestroy(n){Iu(this._lView,n)}markForCheck(){up(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[x]&=-129}reattach(){ts(this._lView),this._lView[x]|=128}detectChanges(){this._lView[x]|=1024,lp(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new b(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=eo(this._lView),t=this._lView[Tn];t!==null&&!n&&Xd(t,this._lView),tv(this._lView[S],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new b(902,!1);this._appRef=n;let t=eo(this._lView),r=this._lView[Tn];r!==null&&!t&&vv(r,this._lView),ts(this._lView)}};var vt=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=eD;constructor(t,r,o){this._declarationLView=t,this._declarationTContainer=r,this.elementRef=o}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,r){return this.createEmbeddedViewImpl(t,r)}createEmbeddedViewImpl(t,r,o){let i=cp(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:r,dehydratedView:o});return new Nn(i)}}return e})();function eD(){return qs(Ce(),j())}function qs(e,n){return e.type&4?new vt(n,e,lo(e,n)):null}function fo(e,n,t,r,o){let i=e.data[n];if(i===null)i=tD(e,n,t,r,o),Ih()&&(i.flags|=32);else if(i.type&64){i.type=t,i.value=r,i.attrs=o;let a=Eh();i.injectorIndex=a===null?-1:a.injectorIndex}return to(i,!0),i}function tD(e,n,t,r,o){let i=Ru(),a=Nu(),s=a?i:i&&i.parent,c=e.data[n]=rD(e,s,t,n,r,o);return nD(e,c,i,a),c}function nD(e,n,t,r){e.firstChild===null&&(e.firstChild=n),t!==null&&(r?t.child==null&&n.parent!==null&&(t.child=n):t.next===null&&(t.next=n,n.prev=t))}function rD(e,n,t,r,o,i){let a=n?n.injectorIndex:-1,s=0;return Su()&&(s|=128),{type:t,index:r,insertBeforeIndex:null,injectorIndex:a,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:s,providerIndexes:0,value:o,attrs:i,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var ek=new RegExp(`^(\\d+)*(${h0}|${m0})*(.*)`);var oD=()=>null,iD=()=>null;function yd(e,n){return oD(e,n)}function aD(e,n,t){return iD(e,n,t)}var yv=class{},$s=class{},bd=class{resolveComponentFactory(n){throw new b(917,!1)}},_i=class{static NULL=new bd},rn=class{},kn=(()=>{class e{destroyNode=null;static __NG_ELEMENT_ID__=()=>sD()}return e})();function sD(){let e=j(),n=Ce(),t=Je(n.index,e);return(Ot(t)?t:e)[ae]}var bv=(()=>{class e{static \u0275prov=v({token:e,providedIn:"root",factory:()=>null})}return e})();var vs={},Ed=class{injector;parentInjector;constructor(n,t){this.injector=n,this.parentInjector=t}get(n,t,r){let o=this.injector.get(n,vs,r);return o!==vs||t===vs?o:this.parentInjector.get(n,t,r)}};function Ts(e,n,t){let r=t?e.styles:null,o=t?e.classes:null,i=0;if(n!==null)for(let a=0;a<n.length;a++){let s=n[a];if(typeof s=="number")i=s;else if(i==1)o=$a(o,s);else if(i==2){let c=s,l=n[++a];r=$a(r,c+": "+l+";")}}t?e.styles=r:e.stylesWithoutHost=r,t?e.classes=o:e.classesWithoutHost=o}function J(e,n=0){let t=j();if(t===null)return I(e,n);let r=Ce();return wg(r,t,_e(e),n)}function pp(){let e="invalid";throw new Error(e)}function Ev(e,n,t,r,o){let i=r===null?null:{"":-1},a=o(e,t);if(a!==null){let s=a,c=null,l=null;for(let u of a)if(u.resolveHostDirectives!==null){[s,c,l]=u.resolveHostDirectives(a);break}uD(e,n,t,s,i,c,l)}i!==null&&r!==null&&cD(t,r,i)}function cD(e,n,t){let r=e.localNames=[];for(let o=0;o<n.length;o+=2){let i=t[n[o+1]];if(i==null)throw new b(-301,!1);r.push(n[o],i)}}function lD(e,n,t){n.componentOffset=t,(e.components??=[]).push(n.index)}function uD(e,n,t,r,o,i,a){let s=r.length,c=!1;for(let m=0;m<s;m++){let f=r[m];!c&&Ft(f)&&(c=!0,lD(e,t,m)),nd(_s(t,n),e,f.type)}gD(t,e.data.length,s);for(let m=0;m<s;m++){let f=r[m];f.providersResolver&&f.providersResolver(f)}let l=!1,u=!1,d=Xg(e,n,s,null);s>0&&(t.directiveToIndex=new Map);for(let m=0;m<s;m++){let f=r[m];if(t.mergedAttrs=ao(t.mergedAttrs,f.hostAttrs),pD(e,t,n,d,f),hD(d,f,o),a!==null&&a.has(f)){let[w,z]=a.get(f);t.directiveToIndex.set(f.type,[d,w+t.directiveStart,z+t.directiveStart])}else(i===null||!i.has(f))&&t.directiveToIndex.set(f.type,d);f.contentQueries!==null&&(t.flags|=4),(f.hostBindings!==null||f.hostAttrs!==null||f.hostVars!==0)&&(t.flags|=64);let g=f.type.prototype;!l&&(g.ngOnChanges||g.ngOnInit||g.ngDoCheck)&&((e.preOrderHooks??=[]).push(t.index),l=!0),!u&&(g.ngOnChanges||g.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}dD(e,t,i)}function dD(e,n,t){for(let r=n.directiveStart;r<n.directiveEnd;r++){let o=e.data[r];if(t===null||!t.has(o))Yh(0,n,o,r),Yh(1,n,o,r),Jh(n,r,!1);else{let i=t.get(o);Kh(0,n,i,r),Kh(1,n,i,r),Jh(n,r,!0)}}}function Yh(e,n,t,r){let o=e===0?t.inputs:t.outputs;for(let i in o)if(o.hasOwnProperty(i)){let a;e===0?a=n.inputs??={}:a=n.outputs??={},a[i]??=[],a[i].push(r),Cv(n,i)}}function Kh(e,n,t,r){let o=e===0?t.inputs:t.outputs;for(let i in o)if(o.hasOwnProperty(i)){let a=o[i],s;e===0?s=n.hostDirectiveInputs??={}:s=n.hostDirectiveOutputs??={},s[a]??=[],s[a].push(r,i),Cv(n,a)}}function Cv(e,n){n==="class"?e.flags|=8:n==="style"&&(e.flags|=16)}function Jh(e,n,t){let{attrs:r,inputs:o,hostDirectiveInputs:i}=e;if(r===null||!t&&o===null||t&&i===null||Zd(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let a=null,s=0;for(;s<r.length;){let c=r[s];if(c===0){s+=4;continue}else if(c===5){s+=2;continue}else if(typeof c=="number")break;if(!t&&o.hasOwnProperty(c)){let l=o[c];for(let u of l)if(u===n){a??=[],a.push(c,r[s+1]);break}}else if(t&&i.hasOwnProperty(c)){let l=i[c];for(let u=0;u<l.length;u+=2)if(l[u]===n){a??=[],a.push(l[u+1],r[s+1]);break}}s+=2}e.initialInputs??=[],e.initialInputs.push(a)}function pD(e,n,t,r,o){e.data[r]=o;let i=o.factory||(o.factory=Dn(o.type,!0)),a=new fr(i,Ft(o),J,null);e.blueprint[r]=a,t[r]=a,fD(e,n,r,Xg(e,t,o.hostVars,tt),o)}function fD(e,n,t,r,o){let i=o.hostBindings;if(i){let a=e.hostBindingOpCodes;a===null&&(a=e.hostBindingOpCodes=[]);let s=~n.index;mD(a)!=s&&a.push(s),a.push(t,r,i)}}function mD(e){let n=e.length;for(;n>0;){let t=e[--n];if(typeof t=="number"&&t<0)return t}return 0}function hD(e,n,t){if(t){if(n.exportAs)for(let r=0;r<n.exportAs.length;r++)t[n.exportAs[r]]=e;Ft(n)&&(t[""]=e)}}function gD(e,n,t){e.flags|=1,e.directiveStart=n,e.directiveEnd=n+t,e.providerIndexes=n}function fp(e,n,t,r,o,i,a,s){let c=n[S],l=c.consts,u=kt(l,a),d=fo(c,e,t,r,u);return i&&Ev(c,n,d,kt(l,s),o),d.mergedAttrs=ao(d.mergedAttrs,d.attrs),d.attrs!==null&&Ts(d,d.attrs,!1),d.mergedAttrs!==null&&Ts(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function mp(e,n){gg(e,n),vu(n)&&e.queries.elementEnd(n)}function vD(e,n,t,r,o,i){let a=n.consts,s=kt(a,o),c=fo(n,e,t,r,s);if(c.mergedAttrs=ao(c.mergedAttrs,c.attrs),i!=null){let l=kt(a,i);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1)}return c.attrs!==null&&Ts(c,c.attrs,!1),c.mergedAttrs!==null&&Ts(c,c.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,c),c}function hp(e){return Gs(e)?Array.isArray(e)||!(e instanceof Map)&&Symbol.iterator in e:!1}function _v(e,n){if(Array.isArray(e))for(let t=0;t<e.length;t++)n(e[t]);else{let t=e[Symbol.iterator](),r;for(;!(r=t.next()).done;)n(r.value)}}function Gs(e){return e!==null&&(typeof e=="function"||typeof e=="object")}function yD(e,n,t){return e[n]=t}function Pn(e,n,t){if(t===tt)return!1;let r=e[n];return Object.is(r,t)?!1:(e[n]=t,!0)}function bD(e,n,t,r){let o=Pn(e,n,t);return Pn(e,n+1,r)||o}function Zu(e,n,t){return function r(o){let i=Sn(e)?Je(e.index,n):n;up(i,5);let a=n[we],s=Xh(n,a,t,o),c=r.__ngNextListenerFn__;for(;c;)s=Xh(n,a,c,o)&&s,c=c.__ngNextListenerFn__;return s}}function Xh(e,n,t,r){let o=R(null);try{return Y(6,n,t),t(r)!==!1}catch(i){return O_(e,i),!1}finally{Y(7,n,t),R(o)}}function ED(e,n,t,r,o,i,a,s){let c=Xr(e),l=!1,u=null;if(!r&&c&&(u=CD(n,t,i,e.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=a,u.__ngLastListenerFn__=a,l=!0}else{let d=ut(e,t),m=r?r(d):d;v0(t,m,i,s);let f=o.listen(m,i,s),g=r?w=>r(Ke(w[e.index])):e.index;Dv(g,n,t,i,s,f,!1)}return l}function CD(e,n,t,r){let o=e.cleanup;if(o!=null)for(let i=0;i<o.length-1;i+=2){let a=o[i];if(a===t&&o[i+1]===r){let s=n[Kr],c=o[i+2];return s&&s.length>c?s[c]:null}typeof a=="string"&&(i+=2)}return null}function Dv(e,n,t,r,o,i,a){let s=n.firstCreatePass?Tu(n):null,c=wu(t),l=c.length;c.push(o,i),s&&s.push(r,e,l,(l+1)*(a?-1:1))}function eg(e,n,t,r,o,i){let a=n[t],s=n[S],l=s.data[t].outputs[r],d=a[l].subscribe(i);Dv(e.index,s,n,o,i,d,!0)}var Cd=Symbol("BINDING");var Ms=class extends _i{ngModule;constructor(n){super(),this.ngModule=n}resolveComponentFactory(n){let t=Rt(n);return new On(t,this.ngModule)}};function _D(e){return Object.keys(e).map(n=>{let[t,r,o]=e[n],i={propName:t,templateName:n,isSignal:(r&Vs.SignalBased)!==0};return o&&(i.transform=o),i})}function DD(e){return Object.keys(e).map(n=>({propName:e[n],templateName:n}))}function ID(e,n,t){let r=n instanceof ie?n:n?.injector;return r&&e.getStandaloneInjector!==null&&(r=e.getStandaloneInjector(r)||r),r?new Ed(t,r):t}function wD(e){let n=e.get(rn,null);if(n===null)throw new b(407,!1);let t=e.get(bv,null),r=e.get(At,null);return{rendererFactory:n,sanitizer:t,changeDetectionScheduler:r,ngReflect:!1}}function TD(e,n){let t=Iv(e);return Qg(n,t,t==="svg"?yu:t==="math"?ph:null)}function Iv(e){return(e.selectors[0][0]||"div").toLowerCase()}var On=class extends $s{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=_D(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=DD(this.componentDef.outputs),this.cachedOutputs}constructor(n,t){super(),this.componentDef=n,this.ngModule=t,this.componentType=n.type,this.selector=J0(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!t}create(n,t,r,o,i,a){Y(22);let s=R(null);try{let c=this.componentDef,l=MD(r,c,a,i),u=ID(c,o||this.ngModule,n),d=wD(u),m=d.rendererFactory.createRenderer(null,c),f=r?C_(m,r,c.encapsulation,u):TD(c,m),g=a?.some(tg)||i?.some(P=>typeof P!="function"&&P.bindings.some(tg)),w=Yd(null,l,null,512|Jg(c),null,null,d,m,u,null,kg(f,u,!0));w[se]=f,is(w);let z=null;try{let P=fp(se,w,2,"#host",()=>l.directiveRegistry,!0,0);f&&(Kg(m,f,P),so(f,w)),Hs(l,w,P),Bd(l,P,w),mp(l,P),t!==void 0&&AD(P,this.ngContentSelectors,t),z=Je(P.index,w),w[we]=z[we],sp(l,w,null)}catch(P){throw z!==null&&od(z),od(w),P}finally{Y(23),as()}return new Ss(this.componentType,w,!!g)}finally{R(s)}}};function MD(e,n,t,r){let o=e?["ng-version","20.3.0"]:X0(n.selectors[0]),i=null,a=null,s=0;if(t)for(let u of t)s+=u[Cd].requiredVars,u.create&&(u.targetIdx=0,(i??=[]).push(u)),u.update&&(u.targetIdx=0,(a??=[]).push(u));if(r)for(let u=0;u<r.length;u++){let d=r[u];if(typeof d!="function")for(let m of d.bindings){s+=m[Cd].requiredVars;let f=u+1;m.create&&(m.targetIdx=f,(i??=[]).push(m)),m.update&&(m.targetIdx=f,(a??=[]).push(m))}}let c=[n];if(r)for(let u of r){let d=typeof u=="function"?u:u.type,m=uu(d);c.push(m)}return Qd(0,null,SD(i,a),1,s,c,null,null,null,[o],null)}function SD(e,n){return!e&&!n?null:t=>{if(t&1&&e)for(let r of e)r.create();if(t&2&&n)for(let r of n)r.update()}}function tg(e){let n=e[Cd].kind;return n==="input"||n==="twoWay"}var Ss=class extends yv{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,t,r){super(),this._rootLView=t,this._hasInputBindings=r,this._tNode=ri(t[S],se),this.location=lo(this._tNode,t),this.instance=Je(this._tNode.index,t)[we],this.hostView=this.changeDetectorRef=new Nn(t,void 0),this.componentType=n}setInput(n,t){this._hasInputBindings;let r=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),t))return;let o=this._rootLView,i=ap(r,o[S],o,n,t);this.previousInputValues.set(n,t);let a=Je(r.index,o);up(a,1)}get injector(){return new pr(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function AD(e,n,t){let r=e.projection=[];for(let o=0;o<n.length;o++){let i=t[o];r.push(i!=null&&i.length?Array.from(i):null)}}var Ge=(()=>{class e{static __NG_ELEMENT_ID__=xD}return e})();function xD(){let e=Ce();return Tv(e,j())}var RD=Ge,wv=class extends RD{_lContainer;_hostTNode;_hostLView;constructor(n,t,r){super(),this._lContainer=n,this._hostTNode=t,this._hostLView=r}get element(){return lo(this._hostTNode,this._hostLView)}get injector(){return new pr(this._hostTNode,this._hostLView)}get parentInjector(){let n=Fd(this._hostTNode,this._hostLView);if(bg(n)){let t=Es(n,this._hostLView),r=bs(n),o=t[S].data[r+8];return new pr(o,t)}else return new pr(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let t=ng(this._lContainer);return t!==null&&t[n]||null}get length(){return this._lContainer.length-xe}createEmbeddedView(n,t,r){let o,i;typeof r=="number"?o=r:r!=null&&(o=r.index,i=r.injector);let a=yd(this._lContainer,n.ssrId),s=n.createEmbeddedViewImpl(t||{},i,a);return this.insertImpl(s,o,Is(this._hostTNode,a)),s}createComponent(n,t,r,o,i,a,s){let c=n&&!UC(n),l;if(c)l=t;else{let z=t||{};l=z.index,r=z.injector,o=z.projectableNodes,i=z.environmentInjector||z.ngModuleRef,a=z.directives,s=z.bindings}let u=c?n:new On(Rt(n)),d=r||this.parentInjector;if(!i&&u.ngModule==null){let P=(c?d:this.parentInjector).get(ie,null);P&&(i=P)}let m=Rt(u.componentType??{}),f=yd(this._lContainer,m?.id??null),g=f?.firstChild??null,w=u.create(d,o,g,i,a,s);return this.insertImpl(w.hostView,l,Is(this._hostTNode,f)),w}insert(n,t){return this.insertImpl(n,t,!0)}insertImpl(n,t,r){let o=n._lView;if(mh(o)){let s=this.indexOf(n);if(s!==-1)this.detach(s);else{let c=o[Ee],l=new wv(c,c[je],c[Ee]);l.detach(l.indexOf(n))}}let i=this._adjustIndex(t),a=this._lContainer;return dp(a,o,i,r),n.attachToViewContainerRef(),au(Qu(a),i,n),n}move(n,t){return this.insert(n,t)}indexOf(n){let t=ng(this._lContainer);return t!==null?t.indexOf(n):-1}remove(n){let t=this._adjustIndex(n,-1),r=ws(this._lContainer,t);r&&(Xo(Qu(this._lContainer),t),ep(r[S],r))}detach(n){let t=this._adjustIndex(n,-1),r=ws(this._lContainer,t);return r&&Xo(Qu(this._lContainer),t)!=null?new Nn(r):null}_adjustIndex(n,t=0){return n??this.length+t}};function ng(e){return e[ni]}function Qu(e){return e[ni]||(e[ni]=[])}function Tv(e,n){let t,r=n[e.index];return lt(r)?t=r:(t=gv(r,n,null,e),n[e.index]=t,Kd(n,t)),PD(t,n,e,r),new wv(t,e,n)}function ND(e,n){let t=e[ae],r=t.createComment(""),o=ut(n,e),i=t.parentNode(o);return Ds(t,i,r,t.nextSibling(o),!1),r}var PD=kD,OD=()=>!1;function FD(e,n,t){return OD(e,n,t)}function kD(e,n,t,r){if(e[Mn])return;let o;t.type&8?o=Ke(r):o=ND(n,t),e[Mn]=o}var _d=class e{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},Dd=class e{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let t=n.queries;if(t!==null){let r=n.contentQueries!==null?n.contentQueries[0]:t.length,o=[];for(let i=0;i<r;i++){let a=t.getByIndex(i),s=this.queries[a.indexInDeclarationView];o.push(s.clone())}return new e(o)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let t=0;t<this.queries.length;t++)gp(n,t).matches!==null&&this.queries[t].setDirty()}},As=class{flags;read;predicate;constructor(n,t,r=null){this.flags=t,this.read=r,typeof n=="string"?this.predicate=qD(n):this.predicate=n}},Id=class e{queries;constructor(n=[]){this.queries=n}elementStart(n,t){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(n,t)}elementEnd(n){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(n)}embeddedTView(n){let t=null;for(let r=0;r<this.length;r++){let o=t!==null?t.length:0,i=this.getByIndex(r).embeddedTView(n,o);i&&(i.indexInDeclarationView=r,t!==null?t.push(i):t=[i])}return t!==null?new e(t):null}template(n,t){for(let r=0;r<this.queries.length;r++)this.queries[r].template(n,t)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},wd=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,t=-1){this.metadata=n,this._declarationNodeIndex=t}elementStart(n,t){this.isApplyingToNode(t)&&this.matchTNode(n,t)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,t){this.elementStart(n,t)}embeddedTView(n,t){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,t),new e(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,r=n.parent;for(;r!==null&&r.type&8&&r.index!==t;)r=r.parent;return t===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(n,t){let r=this.metadata.predicate;if(Array.isArray(r))for(let o=0;o<r.length;o++){let i=r[o];this.matchTNodeWithReadOption(n,t,LD(t,i)),this.matchTNodeWithReadOption(n,t,gs(t,n,i,!1,!1))}else r===vt?t.type&4&&this.matchTNodeWithReadOption(n,t,-1):this.matchTNodeWithReadOption(n,t,gs(t,n,r,!1,!1))}matchTNodeWithReadOption(n,t,r){if(r!==null){let o=this.metadata.read;if(o!==null)if(o===pe||o===Ge||o===vt&&t.type&4)this.addMatch(t.index,-2);else{let i=gs(t,n,o,!1,!1);i!==null&&this.addMatch(t.index,i)}else this.addMatch(t.index,r)}}addMatch(n,t){this.matches===null?this.matches=[n,t]:this.matches.push(n,t)}};function LD(e,n){let t=e.localNames;if(t!==null){for(let r=0;r<t.length;r+=2)if(t[r]===n)return t[r+1]}return null}function jD(e,n){return e.type&11?lo(e,n):e.type&4?qs(e,n):null}function BD(e,n,t,r){return t===-1?jD(n,e):t===-2?zD(e,n,r):fi(e,e[S],t,n)}function zD(e,n,t){if(t===pe)return lo(n,e);if(t===vt)return qs(n,e);if(t===Ge)return Tv(n,e)}function Mv(e,n,t,r){let o=n[Pt].queries[r];if(o.matches===null){let i=e.data,a=t.matches,s=[];for(let c=0;a!==null&&c<a.length;c+=2){let l=a[c];if(l<0)s.push(null);else{let u=i[l];s.push(BD(n,u,a[c+1],t.metadata.read))}}o.matches=s}return o.matches}function Td(e,n,t,r){let o=e.queries.getByIndex(t),i=o.matches;if(i!==null){let a=Mv(e,n,o,t);for(let s=0;s<i.length;s+=2){let c=i[s];if(c>0)r.push(a[s/2]);else{let l=i[s+1],u=n[-c];for(let d=xe;d<u.length;d++){let m=u[d];m[Tn]===m[Ee]&&Td(m[S],m,l,r)}if(u[lr]!==null){let d=u[lr];for(let m=0;m<d.length;m++){let f=d[m];Td(f[S],f,l,r)}}}}}return r}function VD(e,n){return e[Pt].queries[n].queryList}function Sv(e,n,t){let r=new en((t&4)===4);return vh(e,n,r,r.destroy),(n[Pt]??=new Dd).queries.push(new _d(r))-1}function UD(e,n,t){let r=he();return r.firstCreatePass&&(Av(r,new As(e,n,t),-1),(n&2)===2&&(r.staticViewQueries=!0)),Sv(r,j(),n)}function HD(e,n,t,r){let o=he();if(o.firstCreatePass){let i=Ce();Av(o,new As(n,t,r),i.index),$D(o,e),(t&2)===2&&(o.staticContentQueries=!0)}return Sv(o,j(),t)}function qD(e){return e.split(",").map(n=>n.trim())}function Av(e,n,t){e.queries===null&&(e.queries=new Id),e.queries.track(new wd(n,t))}function $D(e,n){let t=e.contentQueries||(e.contentQueries=[]),r=t.length?t[t.length-1]:-1;n!==r&&t.push(e.queries.length-1,n)}function gp(e,n){return e.queries.getByIndex(n)}function GD(e,n){let t=e[S],r=gp(t,n);return r.crossesNgTemplate?Td(t,e,n,[]):Mv(t,e,r,n)}var rg=new Set;function cn(e){rg.has(e)||(rg.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}var on=class{},Ws=class{};var xs=class extends on{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new Ms(this);constructor(n,t,r,o=!0){super(),this.ngModuleType=n,this._parent=t;let i=lu(n);this._bootstrapComponents=Gg(i.bootstrap),this._r3Injector=Vu(n,t,[{provide:on,useValue:this},{provide:_i,useValue:this.componentFactoryResolver},...r],Yt(n),new Set(["environment"])),o&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let n=this._r3Injector;!n.destroyed&&n.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(n){this.destroyCbs.push(n)}},Rs=class extends Ws{moduleType;constructor(n){super(),this.moduleType=n}create(n){return new xs(this.moduleType,n,[])}};var hi=class extends on{injector;componentFactoryResolver=new Ms(this);instance=null;constructor(n){super();let t=new nr([...n.providers,{provide:on,useValue:this},{provide:_i,useValue:this.componentFactoryResolver}],n.parent||Qr(),n.debugName,new Set(["environment"]));this.injector=t,n.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function mo(e,n,t=null){return new hi({providers:e,parent:n,debugName:t,runEnvironmentInitializers:!0}).injector}var WD=(()=>{class e{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let r=du(!1,t.type),o=r.length>0?mo([r],this._injector,`Standalone[${t.type.name}]`):null;this.cachedInjectors.set(t,o)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=v({token:e,providedIn:"environment",factory:()=>new e(I(ie))})}return e})();function ue(e){return vi(()=>{let n=xv(e),t=$(y({},n),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection===kd.OnPush,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&e.dependencies||null,getStandaloneInjector:n.standalone?o=>o.get(WD).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||tn.Emulated,styles:e.styles||ke,_:null,schemas:e.schemas||null,tView:null,id:""});n.standalone&&cn("NgStandalone"),Rv(t);let r=e.dependencies;return t.directiveDefs=og(r,ZD),t.pipeDefs=og(r,sh),t.id=KD(t),t})}function ZD(e){return Rt(e)||uu(e)}function ce(e){return vi(()=>({type:e.type,bootstrap:e.bootstrap||ke,declarations:e.declarations||ke,imports:e.imports||ke,exports:e.exports||ke,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function QD(e,n){if(e==null)return wn;let t={};for(let r in e)if(e.hasOwnProperty(r)){let o=e[r],i,a,s,c;Array.isArray(o)?(s=o[0],i=o[1],a=o[2]??i,c=o[3]||null):(i=o,a=o,s=Vs.None,c=null),t[i]=[r,s,c],n[i]=a}return t}function YD(e){if(e==null)return wn;let n={};for(let t in e)e.hasOwnProperty(t)&&(n[e[t]]=t);return n}function fe(e){return vi(()=>{let n=xv(e);return Rv(n),n})}function Zs(e){return{type:e.type,name:e.name,factory:null,pure:e.pure!==!1,standalone:e.standalone??!0,onDestroy:e.type.prototype.ngOnDestroy||null}}function xv(e){let n={};return{type:e.type,providersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:n,inputConfig:e.inputs||wn,exportAs:e.exportAs||null,standalone:e.standalone??!0,signals:e.signals===!0,selectors:e.selectors||ke,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,inputs:QD(e.inputs,n),outputs:YD(e.outputs),debugInfo:null}}function Rv(e){e.features?.forEach(n=>n(e))}function og(e,n){return e?()=>{let t=typeof e=="function"?e():e,r=[];for(let o of t){let i=n(o);i!==null&&r.push(i)}return r}:null}function KD(e){let n=0,t=typeof e.consts=="function"?"":e.consts,r=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,t,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let i of r.join("|"))n=Math.imul(31,n)+i.charCodeAt(0)<<0;return n+=2147483648,"c"+n}function JD(e){return Object.getPrototypeOf(e.prototype).constructor}function gr(e){let n=JD(e.type),t=!0,r=[e];for(;n;){let o;if(Ft(e))o=n.\u0275cmp||n.\u0275dir;else{if(n.\u0275cmp)throw new b(903,!1);o=n.\u0275dir}if(o){if(t){r.push(o);let a=e;a.inputs=Yu(e.inputs),a.declaredInputs=Yu(e.declaredInputs),a.outputs=Yu(e.outputs);let s=o.hostBindings;s&&rI(e,s);let c=o.viewQuery,l=o.contentQueries;if(c&&tI(e,c),l&&nI(e,l),XD(e,o),Jm(e.outputs,o.outputs),Ft(o)&&o.data.animation){let u=e.data;u.animation=(u.animation||[]).concat(o.data.animation)}}let i=o.features;if(i)for(let a=0;a<i.length;a++){let s=i[a];s&&s.ngInherit&&s(e),s===gr&&(t=!1)}}n=Object.getPrototypeOf(n)}eI(r)}function XD(e,n){for(let t in n.inputs){if(!n.inputs.hasOwnProperty(t)||e.inputs.hasOwnProperty(t))continue;let r=n.inputs[t];r!==void 0&&(e.inputs[t]=r,e.declaredInputs[t]=n.declaredInputs[t])}}function eI(e){let n=0,t=null;for(let r=e.length-1;r>=0;r--){let o=e[r];o.hostVars=n+=o.hostVars,o.hostAttrs=ao(o.hostAttrs,t=ao(t,o.hostAttrs))}}function Yu(e){return e===wn?{}:e===ke?[]:e}function tI(e,n){let t=e.viewQuery;t?e.viewQuery=(r,o)=>{n(r,o),t(r,o)}:e.viewQuery=n}function nI(e,n){let t=e.contentQueries;t?e.contentQueries=(r,o,i)=>{n(r,o,i),t(r,o,i)}:e.contentQueries=n}function rI(e,n){let t=e.hostBindings;t?e.hostBindings=(r,o)=>{n(r,o),t(r,o)}:e.hostBindings=n}function Nv(e,n,t,r,o,i,a,s){if(t.firstCreatePass){e.mergedAttrs=ao(e.mergedAttrs,e.attrs);let u=e.tView=Qd(2,e,o,i,a,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,e),u.queries=t.queries.embeddedTView(e))}s&&(e.flags|=s),to(e,!1);let c=iI(t,n,e,r);cs()&&tp(t,n,c,e),so(c,n);let l=gv(c,n,c,e);n[r+se]=l,Kd(n,l),FD(l,e,n)}function oI(e,n,t,r,o,i,a,s,c,l,u){let d=t+se,m;return n.firstCreatePass?(m=fo(n,d,4,a||null,s||null),ns()&&Ev(n,e,m,kt(n.consts,l),rp),gg(n,m)):m=n.data[d],Nv(m,e,n,t,r,o,i,c),Xr(m)&&Hs(n,e,m),l!=null&&Ci(e,m,u),m}function vp(e,n,t,r,o,i,a,s,c,l,u){let d=t+se,m;if(n.firstCreatePass){if(m=fo(n,d,4,a||null,s||null),l!=null){let f=kt(n.consts,l);m.localNames=[];for(let g=0;g<f.length;g+=2)m.localNames.push(f[g],-1)}}else m=n.data[d];return Nv(m,e,n,t,r,o,i,c),l!=null&&Ci(e,m,u),m}function X(e,n,t,r,o,i,a,s){let c=j(),l=he(),u=kt(l.consts,i);return oI(c,l,e,n,t,r,o,u,void 0,a,s),X}var iI=aI;function aI(e,n,t,r){return si(!0),n[ae].createComment("")}var Qs=(function(e){return e[e.CHANGE_DETECTION=0]="CHANGE_DETECTION",e[e.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",e})(Qs||{}),vr=new E(""),Pv=!1,Md=class extends V{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,mu()&&(this.destroyRef=p(ft,{optional:!0})??void 0,this.pendingTasks=p(Xt,{optional:!0})??void 0)}emit(n){let t=R(null);try{super.next(n)}finally{R(t)}}subscribe(n,t,r){let o=n,i=t||(()=>null),a=r;if(n&&typeof n=="object"){let c=n;o=c.next?.bind(c),i=c.error?.bind(c),a=c.complete?.bind(c)}this.__isAsync&&(i=this.wrapInTimeout(i),o&&(o=this.wrapInTimeout(o)),a&&(a=this.wrapInTimeout(a)));let s=super.subscribe({next:o,error:i,complete:a});return n instanceof Z&&n.add(s),s}wrapInTimeout(n){return t=>{let r=this.pendingTasks?.add();setTimeout(()=>{try{n(t)}finally{r!==void 0&&this.pendingTasks?.remove(r)}})}}},K=Md;function Ov(e){let n,t;function r(){e=dr;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),n!==void 0&&clearTimeout(n)}catch{}}return n=setTimeout(()=>{e(),r()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{e(),r()})),()=>r()}function ig(e){return queueMicrotask(()=>e()),()=>{e=dr}}var yp="isAngularZone",Ns=yp+"_ID",sI=0,q=class e{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new K(!1);onMicrotaskEmpty=new K(!1);onStable=new K(!1);onError=new K(!1);constructor(n){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:r=!1,shouldCoalesceRunChangeDetection:o=!1,scheduleInRootZone:i=Pv}=n;if(typeof Zone>"u")throw new b(908,!1);Zone.assertZonePatched();let a=this;a._nesting=0,a._outer=a._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(a._inner=a._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(a._inner=a._inner.fork(Zone.longStackTraceZoneSpec)),a.shouldCoalesceEventChangeDetection=!o&&r,a.shouldCoalesceRunChangeDetection=o,a.callbackScheduled=!1,a.scheduleInRootZone=i,uI(a)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(yp)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new b(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new b(909,!1)}run(n,t,r){return this._inner.run(n,t,r)}runTask(n,t,r,o){let i=this._inner,a=i.scheduleEventTask("NgZoneEvent: "+o,n,cI,dr,dr);try{return i.runTask(a,t,r)}finally{i.cancelTask(a)}}runGuarded(n,t,r){return this._inner.runGuarded(n,t,r)}runOutsideAngular(n){return this._outer.run(n)}},cI={};function bp(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function lI(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function n(){Ov(()=>{e.callbackScheduled=!1,Sd(e),e.isCheckStableRunning=!0,bp(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{n()}):e._outer.run(()=>{n()}),Sd(e)}function uI(e){let n=()=>{lI(e)},t=sI++;e._inner=e._inner.fork({name:"angular",properties:{[yp]:!0,[Ns]:t,[Ns+t]:!0},onInvokeTask:(r,o,i,a,s,c)=>{if(dI(c))return r.invokeTask(i,a,s,c);try{return ag(e),r.invokeTask(i,a,s,c)}finally{(e.shouldCoalesceEventChangeDetection&&a.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&n(),sg(e)}},onInvoke:(r,o,i,a,s,c,l)=>{try{return ag(e),r.invoke(i,a,s,c,l)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!pI(c)&&n(),sg(e)}},onHasTask:(r,o,i,a)=>{r.hasTask(i,a),o===i&&(a.change=="microTask"?(e._hasPendingMicrotasks=a.microTask,Sd(e),bp(e)):a.change=="macroTask"&&(e.hasPendingMacrotasks=a.macroTask))},onHandleError:(r,o,i,a)=>(r.handleError(i,a),e.runOutsideAngular(()=>e.onError.emit(a)),!1)})}function Sd(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function ag(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function sg(e){e._nesting--,bp(e)}var Ps=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new K;onMicrotaskEmpty=new K;onStable=new K;onError=new K;run(n,t,r){return n.apply(t,r)}runGuarded(n,t,r){return n.apply(t,r)}runOutsideAngular(n){return n()}runTask(n,t,r,o){return n.apply(t,r)}};function dI(e){return Fv(e,"__ignore_ng_zone__")}function pI(e){return Fv(e,"__scheduler_tick__")}function Fv(e,n){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[n]===!0}var Ep=(()=>{class e{impl=null;execute(){this.impl?.execute()}static \u0275prov=v({token:e,providedIn:"root",factory:()=>new e})}return e})(),kv=[0,1,2,3],Lv=(()=>{class e{ngZone=p(q);scheduler=p(At);errorHandler=p(De,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){p(vr,{optional:!0})}execute(){let t=this.sequences.size>0;t&&Y(16),this.executing=!0;for(let r of kv)for(let o of this.sequences)if(!(o.erroredOrDestroyed||!o.hooks[r]))try{o.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let i=o.hooks[r];return i(o.pipelinedValue)},o.snapshot))}catch(i){o.erroredOrDestroyed=!0,this.errorHandler?.handleError(i)}this.executing=!1;for(let r of this.sequences)r.afterRun(),r.once&&(this.sequences.delete(r),r.destroy());for(let r of this.deferredRegistrations)this.sequences.add(r);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),t&&Y(17)}register(t){let{view:r}=t;r!==void 0?((r[cr]??=[]).push(t),An(r),r[x]|=8192):this.executing?this.deferredRegistrations.add(t):this.addSequence(t)}addSequence(t){this.sequences.add(t),this.scheduler.notify(7)}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}maybeTrace(t,r){return r?r.run(Qs.AFTER_NEXT_RENDER,t):t()}static \u0275prov=v({token:e,providedIn:"root",factory:()=>new e})}return e})(),Os=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,t,r,o,i,a=null){this.impl=n,this.hooks=t,this.view=r,this.once=o,this.snapshot=a,this.unregisterOnDestroy=i?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[cr];n&&(this.view[cr]=n.filter(t=>t!==this))}};function Ys(e,n){let t=n?.injector??p(me);return cn("NgAfterNextRender"),mI(e,t,n,!0)}function fI(e){return e instanceof Function?[void 0,void 0,e,void 0]:[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function mI(e,n,t,r){let o=n.get(Ep);o.impl??=n.get(Lv);let i=n.get(vr,null,{optional:!0}),a=t?.manualCleanup!==!0?n.get(ft):null,s=n.get(ro,null,{optional:!0}),c=new Os(o.impl,fI(e),s?.view,r,a,i?.snapshot(null));return o.impl.register(c),c}var Ks=(()=>{class e{log(t){console.log(t)}warn(t){console.warn(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"platform"})}return e})();var Js=new E(""),ho=new E(""),Di=(()=>{class e{_ngZone;registry;_isZoneStable=!0;_callbacks=[];_taskTrackingZone=null;_destroyRef;constructor(t,r,o){this._ngZone=t,this.registry=r,mu()&&(this._destroyRef=p(ft,{optional:!0})??void 0),Cp||(jv(o),o.addToWindow(r)),this._watchAngularEvents(),t.run(()=>{this._taskTrackingZone=typeof Zone>"u"?null:Zone.current.get("TaskTrackingZone")})}_watchAngularEvents(){let t=this._ngZone.onUnstable.subscribe({next:()=>{this._isZoneStable=!1}}),r=this._ngZone.runOutsideAngular(()=>this._ngZone.onStable.subscribe({next:()=>{q.assertNotInAngularZone(),queueMicrotask(()=>{this._isZoneStable=!0,this._runCallbacksIfReady()})}}));this._destroyRef?.onDestroy(()=>{t.unsubscribe(),r.unsubscribe()})}isStable(){return this._isZoneStable&&!this._ngZone.hasPendingMacrotasks}_runCallbacksIfReady(){if(this.isStable())queueMicrotask(()=>{for(;this._callbacks.length!==0;){let t=this._callbacks.pop();clearTimeout(t.timeoutId),t.doneCb()}});else{let t=this.getPendingTasks();this._callbacks=this._callbacks.filter(r=>r.updateCb&&r.updateCb(t)?(clearTimeout(r.timeoutId),!1):!0)}}getPendingTasks(){return this._taskTrackingZone?this._taskTrackingZone.macroTasks.map(t=>({source:t.source,creationLocation:t.creationLocation,data:t.data})):[]}addCallback(t,r,o){let i=-1;r&&r>0&&(i=setTimeout(()=>{this._callbacks=this._callbacks.filter(a=>a.timeoutId!==i),t()},r)),this._callbacks.push({doneCb:t,timeoutId:i,updateCb:o})}whenStable(t,r,o){if(o&&!this._taskTrackingZone)throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');this.addCallback(t,r,o),this._runCallbacksIfReady()}registerApplication(t){this.registry.registerApplication(t,this)}unregisterApplication(t){this.registry.unregisterApplication(t)}findProviders(t,r,o){return[]}static \u0275fac=function(r){return new(r||e)(I(q),I(Ii),I(ho))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),Ii=(()=>{class e{_applications=new Map;registerApplication(t,r){this._applications.set(t,r)}unregisterApplication(t){this._applications.delete(t)}unregisterAllApplications(){this._applications.clear()}getTestability(t){return this._applications.get(t)||null}getAllTestabilities(){return Array.from(this._applications.values())}getAllRootElements(){return Array.from(this._applications.keys())}findTestabilityInTree(t,r=!0){return Cp?.findTestabilityInTree(this,t,r)??null}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"platform"})}return e})();function jv(e){Cp=e}var Cp;function go(e){return!!e&&typeof e.then=="function"}function _p(e){return!!e&&typeof e.subscribe=="function"}var Dp=new E("");function Xs(e){return or([{provide:Dp,multi:!0,useValue:e}])}var Ip=(()=>{class e{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,r)=>{this.resolve=t,this.reject=r});appInits=p(Dp,{optional:!0})??[];injector=p(me);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let o of this.appInits){let i=Ie(this.injector,o);if(go(i))t.push(i);else if(_p(i)){let a=new Promise((s,c)=>{i.subscribe({complete:s,error:c})});t.push(a)}}let r=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{r()}).catch(o=>{this.reject(o)}),t.length===0&&r(),this.initialized=!0}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),wi=new E("");function Bv(){vl(()=>{let e="";throw new b(600,e)})}function zv(e){return e.isBoundToModule}var hI=10;var bt=(()=>{class e{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=p($e);afterRenderManager=p(Ep);zonelessEnabled=p(li);rootEffectScheduler=p(ui);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new V;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=p(Xt);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(A(t=>!t))}constructor(){p(vr,{optional:!0})}whenStable(){let t;return new Promise(r=>{t=this.isStable.subscribe({next:o=>{o&&r()}})}).finally(()=>{t.unsubscribe()})}_injector=p(ie);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,r){return this.bootstrapImpl(t,r)}bootstrapImpl(t,r,o=me.NULL){return this._injector.get(q).run(()=>{Y(10);let a=t instanceof $s;if(!this._injector.get(Ip).done){let g="";throw new b(405,g)}let c;a?c=t:c=this._injector.get(_i).resolveComponentFactory(t),this.componentTypes.push(c.componentType);let l=zv(c)?void 0:this._injector.get(on),u=r||c.selector,d=c.create(o,[],u,l),m=d.location.nativeElement,f=d.injector.get(Js,null);return f?.registerApplication(m),d.onDestroy(()=>{this.detachView(d.hostView),pi(this.components,d),f?.unregisterApplication(m)}),this._loadComponent(d),Y(11,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){Y(12),this.tracingSnapshot!==null?this.tracingSnapshot.run(Qs.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw new b(101,!1);let t=R(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,R(t),this.afterTick.next(),Y(13)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(rn,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<hI;)Y(14),this.synchronizeOnce(),Y(15)}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:o}of this.allViews){if(!r&&!oi(o))continue;let i=r&&!this.zonelessEnabled?0:1;lp(o,i),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>oi(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let r=t;this._views.push(r),r.attachToAppRef(this)}detachView(t){let r=t;pi(this._views,r),r.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(o){this.internalErrorHandler(o)}this.components.push(t),this._injector.get(wi,[]).forEach(o=>o(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>pi(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new b(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function pi(e,n){let t=e.indexOf(n);t>-1&&e.splice(t,1)}function Et(e,n,t,r){let o=j(),i=ai();if(Pn(o,i,n)){let a=he(),s=zu();R_(s,o,e,n,t,r)}return Et}var wp=new E("",{providedIn:"root",factory:()=>!1}),Tp=new E("",{providedIn:"root",factory:()=>gI}),gI=4e3;var sk=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";function Mp(e,n,t,r,o,i,a,s){cn("NgControlFlow");let c=j(),l=he(),u=kt(l.consts,i);return vp(c,l,e,n,t,r,o,u,256,a,s),Sp}function Sp(e,n,t,r,o,i,a,s){cn("NgControlFlow");let c=j(),l=he(),u=kt(l.consts,i);return vp(c,l,e,n,t,r,o,u,512,a,s),Sp}function Ap(e,n){cn("NgControlFlow");let t=j(),r=ai(),o=t[r]!==tt?t[r]:-1,i=o!==-1?cg(t,se+o):void 0,a=0;if(Pn(t,r,e)){let s=R(null);try{if(i!==void 0&&J_(i,a),e!==-1){let c=se+e,l=cg(t,c),u=vI(t[S],c),d=aD(l,u,t),m=cp(t,u,n,{dehydratedView:d});dp(l,m,a,Is(u,d))}}finally{R(s)}}else if(i!==void 0){let s=K_(i,a);s!==void 0&&(s[we]=n)}}function cg(e,n){return e[n]}function vI(e,n){return ri(e,n)}function M(e,n,t){let r=j(),o=ai();if(Pn(r,o,n)){let i=he(),a=zu();w_(a,r,e,n,r[ae],t)}return M}function Ad(e,n,t,r,o){ap(n,e,t,o?"class":"style",r)}function D(e,n,t,r){let o=j(),i=o[S],a=e+se,s=i.firstCreatePass?fp(a,o,2,n,rp,ns(),t,r):i.data[a];if(op(s,o,e,n,Vv),Xr(s)){let c=o[S];Hs(c,o,s),Bd(c,s,o)}return r!=null&&Ci(o,s),D}function h(){let e=he(),n=Ce(),t=ip(n);return e.firstCreatePass&&mp(e,t),Au(t)&&xu(),Mu(),t.classesWithoutHost!=null&&ZC(t)&&Ad(e,t,j(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&QC(t)&&Ad(e,t,j(),t.stylesWithoutHost,!1),h}function ge(e,n,t,r){return D(e,n,t,r),h(),ge}function nt(e,n,t,r){let o=j(),i=o[S],a=e+se,s=i.firstCreatePass?vD(a,i,2,n,t,r):i.data[a];return op(s,o,e,n,Vv),r!=null&&Ci(o,s),nt}function Ct(){let e=Ce(),n=ip(e);return Au(n)&&xu(),Mu(),Ct}function ec(e,n,t,r){return nt(e,n,t,r),Ct(),ec}var Vv=(e,n,t,r,o)=>(si(!0),Qg(n[ae],r,Nh()));function vo(e,n,t){let r=j(),o=r[S],i=e+se,a=o.firstCreatePass?fp(i,r,8,"ng-container",rp,ns(),n,t):o.data[i];if(op(a,r,e,"ng-container",yI),Xr(a)){let s=r[S];Hs(s,r,a),Bd(s,a,r)}return t!=null&&Ci(r,a),vo}function yo(){let e=he(),n=Ce(),t=ip(n);return e.firstCreatePass&&mp(e,t),yo}var yI=(e,n,t,r,o)=>(si(!0),n_(n[ae],""));function Ln(){return j()}var Ti="en-US";var bI=Ti;function Uv(e){typeof e=="string"&&(bI=e.toLowerCase().replace(/_/g,"-"))}function Re(e,n,t){let r=j(),o=he(),i=Ce();return EI(o,r,r[ae],i,e,n,t),Re}function EI(e,n,t,r,o,i,a){let s=!0,c=null;if((r.type&3||a)&&(c??=Zu(r,n,i),ED(r,e,n,a,t,o,i,c)&&(s=!1)),s){let l=r.outputs?.[o],u=r.hostDirectiveOutputs?.[o];if(u&&u.length)for(let d=0;d<u.length;d+=2){let m=u[d],f=u[d+1];c??=Zu(r,n,i),eg(r,n,m,f,o,c)}if(l&&l.length)for(let d of l)c??=Zu(r,n,i),eg(r,n,d,o,o,c)}}function H(e=1){return Rh(e)}function CI(e,n){let t=null,r=W0(e);for(let o=0;o<n.length;o++){let i=n[o];if(i==="*"){t=o;continue}if(r===null?Zg(e,i,!0):Y0(r,i))return o}return t}function bo(e){let n=j()[Ue][je];if(!n.projection){let t=e?e.length:1,r=n.projection=ih(t,null),o=r.slice(),i=n.child;for(;i!==null;){if(i.type!==128){let a=e?CI(i,e):0;a!==null&&(o[a]?o[a].projectionNext=i:r[a]=i,o[a]=i)}i=i.next}}}function Bt(e,n=0,t,r,o,i){let a=j(),s=he(),c=r?e+1:null;c!==null&&vp(a,s,c,r,o,i,null,t);let l=fo(s,se+e,16,null,t||null);l.projection===null&&(l.projection=n),Pu();let d=!a[Yr]||Su();a[Ue][je].projection[l.projection]===null&&c!==null?_I(a,s,c):d&&!Bs(l)&&y_(s,a,l)}function _I(e,n,t){let r=se+t,o=n.data[r],i=e[r],a=yd(i,o.tView.ssrId),s=cp(e,o,void 0,{dehydratedView:a});dp(i,s,0,Is(o,a))}function Mi(e,n,t,r){HD(e,n,t,r)}function tc(e,n,t){UD(e,n,t)}function yr(e){let n=j(),t=he(),r=Lu();os(r+1);let o=gp(t,r);if(e.dirty&&fh(n)===((o.metadata.flags&2)===2)){if(o.matches===null)e.reset([]);else{let i=GD(n,r);e.reset(i,c0),e.notifyOnChanges()}return!0}return!1}function br(){return VD(j(),Lu())}function xp(e){let n=Ch();return Eu(n,se+e)}function fs(e,n){return e<<17|n<<2}function mr(e){return e>>17&32767}function DI(e){return(e&2)==2}function II(e,n){return e&131071|n<<17}function xd(e){return e|2}function co(e){return(e&131068)>>2}function Ku(e,n){return e&-131069|n<<2}function wI(e){return(e&1)===1}function Rd(e){return e|1}function TI(e,n,t,r,o,i){let a=i?n.classBindings:n.styleBindings,s=mr(a),c=co(a);e[r]=t;let l=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||Zr(d,u)>0)&&(l=!0)}else u=t;if(o)if(c!==0){let m=mr(e[s+1]);e[r+1]=fs(m,s),m!==0&&(e[m+1]=Ku(e[m+1],r)),e[s+1]=II(e[s+1],r)}else e[r+1]=fs(s,0),s!==0&&(e[s+1]=Ku(e[s+1],r)),s=r;else e[r+1]=fs(c,0),s===0?s=r:e[c+1]=Ku(e[c+1],r),c=r;l&&(e[r+1]=xd(e[r+1])),lg(e,u,r,!0),lg(e,u,r,!1),MI(n,u,e,r,i),a=fs(s,c),i?n.classBindings=a:n.styleBindings=a}function MI(e,n,t,r,o){let i=o?e.residualClasses:e.residualStyles;i!=null&&typeof n=="string"&&Zr(i,n)>=0&&(t[r+1]=Rd(t[r+1]))}function lg(e,n,t,r){let o=e[t+1],i=n===null,a=r?mr(o):co(o),s=!1;for(;a!==0&&(s===!1||i);){let c=e[a],l=e[a+1];SI(c,n)&&(s=!0,e[a+1]=r?Rd(l):xd(l)),a=r?mr(l):co(l)}s&&(e[t+1]=r?xd(o):Rd(o))}function SI(e,n){return e===null||n==null||(Array.isArray(e)?e[1]:e)===n?!0:Array.isArray(e)&&typeof n=="string"?Zr(e,n)>=0:!1}var ht={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function AI(e){return e.substring(ht.key,ht.keyEnd)}function xI(e){return RI(e),Hv(e,qv(e,0,ht.textEnd))}function Hv(e,n){let t=ht.textEnd;return t===n?-1:(n=ht.keyEnd=NI(e,ht.key=n,t),qv(e,n,t))}function RI(e){ht.key=0,ht.keyEnd=0,ht.value=0,ht.valueEnd=0,ht.textEnd=e.length}function qv(e,n,t){for(;n<t&&e.charCodeAt(n)<=32;)n++;return n}function NI(e,n,t){for(;n<t&&e.charCodeAt(n)>32;)n++;return n}function nc(e,n,t){return $v(e,n,t,!1),nc}function Me(e,n){return $v(e,n,null,!0),Me}function Rp(e){OI(zI,PI,e,!0)}function PI(e,n){for(let t=xI(n);t>=0;t=Hv(n,t))Ya(e,AI(n),!0)}function $v(e,n,t,r){let o=j(),i=he(),a=ku(2);if(i.firstUpdatePass&&Wv(i,e,a,r),n!==tt&&Pn(o,a,n)){let s=i.data[xn()];Zv(i,s,o,o[ae],e,o[a+1]=UI(n,t),r,a)}}function OI(e,n,t,r){let o=he(),i=ku(2);o.firstUpdatePass&&Wv(o,null,i,r);let a=j();if(t!==tt&&Pn(a,i,t)){let s=o.data[xn()];if(Qv(s,r)&&!Gv(o,i)){let c=r?s.classesWithoutHost:s.stylesWithoutHost;c!==null&&(t=$a(c,t||"")),Ad(o,s,a,t,r)}else VI(o,s,a,a[ae],a[i+1],a[i+1]=BI(e,n,t),r,i)}}function Gv(e,n){return n>=e.expandoStartIndex}function Wv(e,n,t,r){let o=e.data;if(o[t+1]===null){let i=o[xn()],a=Gv(e,t);Qv(i,r)&&n===null&&!a&&(n=!1),n=FI(o,i,n,r),TI(o,i,n,t,a,r)}}function FI(e,n,t,r){let o=Mh(e),i=r?n.residualClasses:n.residualStyles;if(o===null)(r?n.classBindings:n.styleBindings)===0&&(t=Ju(null,e,n,t,r),t=gi(t,n.attrs,r),i=null);else{let a=n.directiveStylingLast;if(a===-1||e[a]!==o)if(t=Ju(o,e,n,t,r),i===null){let c=kI(e,n,r);c!==void 0&&Array.isArray(c)&&(c=Ju(null,e,n,c[1],r),c=gi(c,n.attrs,r),LI(e,n,r,c))}else i=jI(e,n,r)}return i!==void 0&&(r?n.residualClasses=i:n.residualStyles=i),t}function kI(e,n,t){let r=t?n.classBindings:n.styleBindings;if(co(r)!==0)return e[mr(r)]}function LI(e,n,t,r){let o=t?n.classBindings:n.styleBindings;e[mr(o)]=r}function jI(e,n,t){let r,o=n.directiveEnd;for(let i=1+n.directiveStylingLast;i<o;i++){let a=e[i].hostAttrs;r=gi(r,a,t)}return gi(r,n.attrs,t)}function Ju(e,n,t,r,o){let i=null,a=t.directiveEnd,s=t.directiveStylingLast;for(s===-1?s=t.directiveStart:s++;s<a&&(i=n[s],r=gi(r,i.hostAttrs,o),i!==e);)s++;return e!==null&&(t.directiveStylingLast=s),r}function gi(e,n,t){let r=t?1:2,o=-1;if(n!==null)for(let i=0;i<n.length;i++){let a=n[i];typeof a=="number"?o=a:o===r&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),Ya(e,a,t?!0:n[++i]))}return e===void 0?null:e}function BI(e,n,t){if(t==null||t==="")return ke;let r=[],o=et(t);if(Array.isArray(o))for(let i=0;i<o.length;i++)e(r,o[i],!0);else if(typeof o=="object")for(let i in o)o.hasOwnProperty(i)&&e(r,i,o[i]);else typeof o=="string"&&n(r,o);return r}function zI(e,n,t){let r=String(n);r!==""&&!r.includes(" ")&&Ya(e,r,t)}function VI(e,n,t,r,o,i,a,s){o===tt&&(o=ke);let c=0,l=0,u=0<o.length?o[0]:null,d=0<i.length?i[0]:null;for(;u!==null||d!==null;){let m=c<o.length?o[c+1]:void 0,f=l<i.length?i[l+1]:void 0,g=null,w;u===d?(c+=2,l+=2,m!==f&&(g=d,w=f)):d===null||u!==null&&u<d?(c+=2,g=u):(l+=2,g=d,w=f),g!==null&&Zv(e,n,t,r,g,w,a,s),u=c<o.length?o[c]:null,d=l<i.length?i[l]:null}}function Zv(e,n,t,r,o,i,a,s){if(!(n.type&3))return;let c=e.data,l=c[s+1],u=wI(l)?ug(c,n,t,o,co(l),a):void 0;if(!Fs(u)){Fs(i)||DI(l)&&(i=ug(c,null,t,o,s,a));let d=bu(xn(),t);E_(r,a,d,o,i)}}function ug(e,n,t,r,o,i){let a=n===null,s;for(;o>0;){let c=e[o],l=Array.isArray(c),u=l?c[1]:c,d=u===null,m=t[o+1];m===tt&&(m=d?ke:void 0);let f=d?Ka(m,r):u===r?m:void 0;if(l&&!Fs(f)&&(f=Ka(c,r)),Fs(f)&&(s=f,a))return s;let g=e[o+1];o=a?mr(g):co(g)}if(n!==null){let c=i?n.residualClasses:n.residualStyles;c!=null&&(s=Ka(c,r))}return s}function Fs(e){return e!==void 0}function UI(e,n){return e==null||e===""||(typeof n=="string"?e=e+n:typeof e=="object"&&(e=Yt(et(e)))),e}function Qv(e,n){return(e.flags&(n?8:16))!==0}function C(e,n=""){let t=j(),r=he(),o=e+se,i=r.firstCreatePass?fo(r,o,1,n,null):r.data[o],a=HI(r,t,i,n,e);t[o]=a,cs()&&tp(r,t,a,i),to(i,!1)}var HI=(e,n,t,r,o)=>(si(!0),e_(n[ae],r));function qI(e,n,t,r=""){return Pn(e,ai(),t)?n+Jo(t)+r:tt}function He(e){return le("",e),He}function le(e,n,t){let r=j(),o=qI(r,e,n,t);return o!==tt&&$I(r,xn(),o),le}function $I(e,n,t){let r=bu(n,e);t_(e[ae],r,t)}function GI(e,n,t){let r=he();if(r.firstCreatePass){let o=Ft(e);Nd(t,r.data,r.blueprint,o,!0),Nd(n,r.data,r.blueprint,o,!1)}}function Nd(e,n,t,r,o){if(e=_e(e),Array.isArray(e))for(let i=0;i<e.length;i++)Nd(e[i],n,t,r,o);else{let i=he(),a=j(),s=Ce(),c=tr(e)?e:_e(e.provide),l=fu(e),u=s.providerIndexes&1048575,d=s.directiveStart,m=s.providerIndexes>>20;if(tr(e)||!e.multi){let f=new fr(l,o,J,null),g=ed(c,n,o?u:u+m,d);g===-1?(nd(_s(s,a),i,c),Xu(i,e,n.length),n.push(c),s.directiveStart++,s.directiveEnd++,o&&(s.providerIndexes+=1048576),t.push(f),a.push(f)):(t[g]=f,a[g]=f)}else{let f=ed(c,n,u+m,d),g=ed(c,n,u,u+m),w=f>=0&&t[f],z=g>=0&&t[g];if(o&&!z||!o&&!w){nd(_s(s,a),i,c);let P=QI(o?ZI:WI,t.length,o,r,l,e);!o&&z&&(t[g].providerFactory=P),Xu(i,e,n.length,0),n.push(c),s.directiveStart++,s.directiveEnd++,o&&(s.providerIndexes+=1048576),t.push(P),a.push(P)}else{let P=Yv(t[o?g:f],l,!o&&r);Xu(i,e,f>-1?f:g,P)}!o&&r&&z&&t[g].componentProviders++}}}function Xu(e,n,t,r){let o=tr(n),i=uh(n);if(o||i){let c=(i?_e(n.useClass):n).prototype.ngOnDestroy;if(c){let l=e.destroyHooks||(e.destroyHooks=[]);if(!o&&n.multi){let u=l.indexOf(t);u===-1?l.push(t,[r,c]):l[u+1].push(r,c)}else l.push(t,c)}}}function Yv(e,n,t){return t&&e.componentProviders++,e.multi.push(n)-1}function ed(e,n,t,r){for(let o=t;o<r;o++)if(n[o]===e)return o;return-1}function WI(e,n,t,r,o){return Pd(this.multi,[])}function ZI(e,n,t,r,o){let i=this.multi,a;if(this.providerFactory){let s=this.providerFactory.componentProviders,c=fi(r,r[S],this.providerFactory.index,o);a=c.slice(0,s),Pd(i,a);for(let l=s;l<c.length;l++)a.push(c[l])}else a=[],Pd(i,a);return a}function Pd(e,n){for(let t=0;t<e.length;t++){let r=e[t];n.push(r())}return n}function QI(e,n,t,r,o,i){let a=new fr(e,t,J,null);return a.multi=[],a.index=n,a.componentProviders=0,Yv(a,o,r&&!t),a}function ln(e,n=[]){return t=>{t.providersResolver=(r,o)=>GI(r,o?o(e):e,n)}}function YI(e,n){let t=e[n];return t===tt?void 0:t}function KI(e,n,t,r,o,i,a){let s=n+t;return bD(e,s,o,i)?yD(e,s+2,a?r.call(a,o,i):r(o,i)):YI(e,s+2)}function Er(e,n){let t=he(),r,o=e+se;t.firstCreatePass?(r=JI(n,t.pipeRegistry),t.data[o]=r,r.onDestroy&&(t.destroyHooks??=[]).push(o,r.onDestroy)):r=t.data[o];let i=r.factory||(r.factory=Dn(r.type,!0)),a,s=Fe(J);try{let c=Cs(!1),l=i();return Cs(c),Cu(t,j(),o,l),l}finally{Fe(s)}}function JI(e,n){if(n)for(let t=n.length-1;t>=0;t--){let r=n[t];if(e===r.name)return r}}function Cr(e,n,t,r){let o=e+se,i=j(),a=Eu(i,o);return XI(i,o)?KI(i,_h(),n,a.transform,t,r,a):a.transform(t,r)}function XI(e,n){return e[S].data[n].pure}function Np(e,n){return qs(e,n)}var ks=class{ngModuleFactory;componentFactories;constructor(n,t){this.ngModuleFactory=n,this.componentFactories=t}},Pp=(()=>{class e{compileModuleSync(t){return new Rs(t)}compileModuleAsync(t){return Promise.resolve(this.compileModuleSync(t))}compileModuleAndAllComponentsSync(t){let r=this.compileModuleSync(t),o=lu(t),i=Gg(o.declarations).reduce((a,s)=>{let c=Rt(s);return c&&a.push(new On(c)),a},[]);return new ks(r,i)}compileModuleAndAllComponentsAsync(t){return Promise.resolve(this.compileModuleAndAllComponentsSync(t))}clearCache(){}clearCacheFor(t){}getModuleId(t){}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var ew=(()=>{class e{zone=p(q);changeDetectionScheduler=p(At);applicationRef=p(bt);applicationErrorHandler=p($e);_onMicrotaskEmptySubscription;initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{try{this.applicationRef.dirtyFlags|=1,this.applicationRef._tick()}catch(t){this.applicationErrorHandler(t)}})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Kv({ngZoneFactory:e,ignoreChangesOutsideZone:n,scheduleInRootZone:t}){return e??=()=>new q($(y({},Jv()),{scheduleInRootZone:t})),[{provide:q,useFactory:e},{provide:Kt,multi:!0,useFactory:()=>{let r=p(ew,{optional:!0});return()=>r.initialize()}},{provide:Kt,multi:!0,useFactory:()=>{let r=p(tw);return()=>{r.initialize()}}},n===!0?{provide:Hu,useValue:!0}:[],{provide:qu,useValue:t??Pv},{provide:$e,useFactory:()=>{let r=p(q),o=p(ie),i;return a=>{r.runOutsideAngular(()=>{o.destroyed&&!i?setTimeout(()=>{throw a}):(i??=o.get(De),i.handleError(a))})}}}]}function Jv(e){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:e?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:e?.runCoalescing??!1}}var tw=(()=>{class e{subscription=new Z;initialized=!1;zone=p(q);pendingTasks=p(Xt);initialize(){if(this.initialized)return;this.initialized=!0;let t=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(t=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{q.assertNotInAngularZone(),queueMicrotask(()=>{t!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(t),t=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{q.assertInAngularZone(),t??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Xv=(()=>{class e{applicationErrorHandler=p($e);appRef=p(bt);taskService=p(Xt);ngZone=p(q);zonelessEnabled=p(li);tracing=p(vr,{optional:!0});disableScheduling=p(Hu,{optional:!0})??!1;zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new Z;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Ns):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(p(qu,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof Ps||!this.zoneIsDefined)}notify(t){if(!this.zonelessEnabled&&t===5)return;let r=!1;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2,r=!0;break}case 12:{this.appRef.dirtyFlags|=16,r=!0;break}case 13:{this.appRef.dirtyFlags|=2,r=!0;break}case 11:{r=!0;break}case 9:case 8:case 7:case 10:default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick(r))return;let o=this.useMicrotaskScheduler?ig:Ov;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>o(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>o(()=>this.tick()))}shouldScheduleTick(t){return!(this.disableScheduling&&!t||this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Ns+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(r){this.taskService.remove(t),this.applicationErrorHandler(r)}finally{this.cleanup()}this.useMicrotaskScheduler=!0,ig(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function nw(){return typeof $localize<"u"&&$localize.locale||Ti}var rc=new E("",{providedIn:"root",factory:()=>p(rc,{optional:!0,skipSelf:!0})||nw()});function zt(e){return Gm(e)}var Op=class{[Ne];constructor(n){this[Ne]=n}destroy(){this[Ne].destroy()}};function Fp(e,n){let t=n?.injector??p(me),r=n?.manualCleanup!==!0?t.get(ft):null,o,i=t.get(ro,null,{optional:!0}),a=t.get(At);return i!==null?(o=iw(i.view,a,e),r instanceof Yo&&r._lView===i.view&&(r=null)):o=aw(e,t.get(ui),a),o.injector=t,r!==null&&(o.onDestroyFn=r.onDestroy(()=>o.destroy())),new Op(o)}var ey=$(y({},Wm),{cleanupFns:void 0,zone:null,onDestroyFn:dr,run(){let e=no(!1);try{Zm(this)}finally{no(e)}},cleanup(){if(!this.cleanupFns?.length)return;let e=R(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],R(e)}}}),rw=$(y({},ey),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){Wn(this),this.onDestroyFn(),this.cleanup(),this.scheduler.remove(this)}}),ow=$(y({},ey),{consumerMarkedDirty(){this.view[x]|=8192,An(this.view),this.notifier.notify(13)},destroy(){Wn(this),this.onDestroyFn(),this.cleanup(),this.view[Jt]?.delete(this)}});function iw(e,n,t){let r=Object.create(ow);return r.view=e,r.zone=typeof Zone<"u"?Zone.current:null,r.notifier=n,r.fn=ty(r,t),e[Jt]??=new Set,e[Jt].add(r),r.consumerMarkedDirty(r),r}function aw(e,n,t){let r=Object.create(rw);return r.fn=ty(r,e),r.scheduler=n,r.notifier=t,r.zone=typeof Zone<"u"?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function ty(e,n){return()=>{n(t=>(e.cleanupFns??=[]).push(t))}}var cy=Symbol("InputSignalNode#UNSET"),yw=$(y({},ma),{transformFn:void 0,applyValueToInputSignal(e,n){jr(e,n)}});function ly(e,n){let t=Object.create(yw);t.value=e,t.transformFn=n?.transform;function r(){if(Bo(t),t.value===cy){let o=null;throw new b(-950,o)}return t.value}return r[Ne]=t,r}var jn=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>yi(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}},bw=new E("");bw.__NG_ELEMENT_ID__=e=>{let n=Ce();if(n===null)throw new b(204,!1);if(n.type&2)return n.value;if(e&8)return null;throw new b(204,!1)};function ny(e,n){return ly(e,n)}function Ew(e){return ly(cy,e)}var uy=(ny.required=Ew,ny);var kp=new E(""),Cw=new E("");function Si(e){return!e.moduleRef}function _w(e){let n=Si(e)?e.r3Injector:e.moduleRef.injector,t=n.get(q);return t.run(()=>{Si(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=n.get($e),o;if(t.runOutsideAngular(()=>{o=t.onError.subscribe({next:r})}),Si(e)){let i=()=>n.destroy(),a=e.platformInjector.get(kp);a.add(i),n.onDestroy(()=>{o.unsubscribe(),a.delete(i)})}else{let i=()=>e.moduleRef.destroy(),a=e.platformInjector.get(kp);a.add(i),e.moduleRef.onDestroy(()=>{pi(e.allPlatformModules,e.moduleRef),o.unsubscribe(),a.delete(i)})}return Iw(r,t,()=>{let i=n.get(Xt),a=i.add(),s=n.get(Ip);return s.runInitializers(),s.donePromise.then(()=>{let c=n.get(rc,Ti);if(Uv(c||Ti),!n.get(Cw,!0))return Si(e)?n.get(bt):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(Si(e)){let u=n.get(bt);return e.rootComponent!==void 0&&u.bootstrap(e.rootComponent),u}else return Dw?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>void i.remove(a))})})}var Dw;function Iw(e,n,t){try{let r=t();return go(r)?r.catch(o=>{throw n.runOutsideAngular(()=>e(o)),o}):r}catch(r){throw n.runOutsideAngular(()=>e(r)),r}}var oc=null;function ww(e=[],n){return me.create({name:n,providers:[{provide:ei,useValue:"platform"},{provide:kp,useValue:new Set([()=>oc=null])},...e]})}function Tw(e=[]){if(oc)return oc;let n=ww(e);return oc=n,Bv(),Mw(n),n}function Mw(e){let n=e.get(Ls,null);Ie(e,()=>{n?.forEach(t=>t())})}var un=(()=>{class e{static __NG_ELEMENT_ID__=Sw}return e})();function Sw(e){return Aw(Ce(),j(),(e&16)===16)}function Aw(e,n,t){if(Sn(e)&&!t){let r=Je(e.index,n);return new Nn(r,r)}else if(e.type&175){let r=n[Ue];return new Nn(r,n)}return null}var Lp=class{constructor(){}supports(n){return hp(n)}create(n){return new jp(n)}},xw=(e,n)=>n,jp=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(n){this._trackByFn=n||xw}forEachItem(n){let t;for(t=this._itHead;t!==null;t=t._next)n(t)}forEachOperation(n){let t=this._itHead,r=this._removalsHead,o=0,i=null;for(;t||r;){let a=!r||t&&t.currentIndex<ry(r,o,i)?t:r,s=ry(a,o,i),c=a.currentIndex;if(a===r)o--,r=r._nextRemoved;else if(t=t._next,a.previousIndex==null)o++;else{i||(i=[]);let l=s-o,u=c-o;if(l!=u){for(let m=0;m<l;m++){let f=m<i.length?i[m]:i[m]=0,g=f+m;u<=g&&g<l&&(i[m]=f+1)}let d=a.previousIndex;i[d]=u-l}}s!==c&&n(a,s,c)}}forEachPreviousItem(n){let t;for(t=this._previousItHead;t!==null;t=t._nextPrevious)n(t)}forEachAddedItem(n){let t;for(t=this._additionsHead;t!==null;t=t._nextAdded)n(t)}forEachMovedItem(n){let t;for(t=this._movesHead;t!==null;t=t._nextMoved)n(t)}forEachRemovedItem(n){let t;for(t=this._removalsHead;t!==null;t=t._nextRemoved)n(t)}forEachIdentityChange(n){let t;for(t=this._identityChangesHead;t!==null;t=t._nextIdentityChange)n(t)}diff(n){if(n==null&&(n=[]),!hp(n))throw new b(900,!1);return this.check(n)?this:null}onDestroy(){}check(n){this._reset();let t=this._itHead,r=!1,o,i,a;if(Array.isArray(n)){this.length=n.length;for(let s=0;s<this.length;s++)i=n[s],a=this._trackByFn(s,i),t===null||!Object.is(t.trackById,a)?(t=this._mismatch(t,i,a,s),r=!0):(r&&(t=this._verifyReinsertion(t,i,a,s)),Object.is(t.item,i)||this._addIdentityChange(t,i)),t=t._next}else o=0,_v(n,s=>{a=this._trackByFn(o,s),t===null||!Object.is(t.trackById,a)?(t=this._mismatch(t,s,a,o),r=!0):(r&&(t=this._verifyReinsertion(t,s,a,o)),Object.is(t.item,s)||this._addIdentityChange(t,s)),t=t._next,o++}),this.length=o;return this._truncate(t),this.collection=n,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let n;for(n=this._previousItHead=this._itHead;n!==null;n=n._next)n._nextPrevious=n._next;for(n=this._additionsHead;n!==null;n=n._nextAdded)n.previousIndex=n.currentIndex;for(this._additionsHead=this._additionsTail=null,n=this._movesHead;n!==null;n=n._nextMoved)n.previousIndex=n.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(n,t,r,o){let i;return n===null?i=this._itTail:(i=n._prev,this._remove(n)),n=this._unlinkedRecords===null?null:this._unlinkedRecords.get(r,null),n!==null?(Object.is(n.item,t)||this._addIdentityChange(n,t),this._reinsertAfter(n,i,o)):(n=this._linkedRecords===null?null:this._linkedRecords.get(r,o),n!==null?(Object.is(n.item,t)||this._addIdentityChange(n,t),this._moveAfter(n,i,o)):n=this._addAfter(new Bp(t,r),i,o)),n}_verifyReinsertion(n,t,r,o){let i=this._unlinkedRecords===null?null:this._unlinkedRecords.get(r,null);return i!==null?n=this._reinsertAfter(i,n._prev,o):n.currentIndex!=o&&(n.currentIndex=o,this._addToMoves(n,o)),n}_truncate(n){for(;n!==null;){let t=n._next;this._addToRemovals(this._unlink(n)),n=t}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(n,t,r){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(n);let o=n._prevRemoved,i=n._nextRemoved;return o===null?this._removalsHead=i:o._nextRemoved=i,i===null?this._removalsTail=o:i._prevRemoved=o,this._insertAfter(n,t,r),this._addToMoves(n,r),n}_moveAfter(n,t,r){return this._unlink(n),this._insertAfter(n,t,r),this._addToMoves(n,r),n}_addAfter(n,t,r){return this._insertAfter(n,t,r),this._additionsTail===null?this._additionsTail=this._additionsHead=n:this._additionsTail=this._additionsTail._nextAdded=n,n}_insertAfter(n,t,r){let o=t===null?this._itHead:t._next;return n._next=o,n._prev=t,o===null?this._itTail=n:o._prev=n,t===null?this._itHead=n:t._next=n,this._linkedRecords===null&&(this._linkedRecords=new ic),this._linkedRecords.put(n),n.currentIndex=r,n}_remove(n){return this._addToRemovals(this._unlink(n))}_unlink(n){this._linkedRecords!==null&&this._linkedRecords.remove(n);let t=n._prev,r=n._next;return t===null?this._itHead=r:t._next=r,r===null?this._itTail=t:r._prev=t,n}_addToMoves(n,t){return n.previousIndex===t||(this._movesTail===null?this._movesTail=this._movesHead=n:this._movesTail=this._movesTail._nextMoved=n),n}_addToRemovals(n){return this._unlinkedRecords===null&&(this._unlinkedRecords=new ic),this._unlinkedRecords.put(n),n.currentIndex=null,n._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=n,n._prevRemoved=null):(n._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=n),n}_addIdentityChange(n,t){return n.item=t,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=n:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=n,n}},Bp=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(n,t){this.item=n,this.trackById=t}},zp=class{_head=null;_tail=null;add(n){this._head===null?(this._head=this._tail=n,n._nextDup=null,n._prevDup=null):(this._tail._nextDup=n,n._prevDup=this._tail,n._nextDup=null,this._tail=n)}get(n,t){let r;for(r=this._head;r!==null;r=r._nextDup)if((t===null||t<=r.currentIndex)&&Object.is(r.trackById,n))return r;return null}remove(n){let t=n._prevDup,r=n._nextDup;return t===null?this._head=r:t._nextDup=r,r===null?this._tail=t:r._prevDup=t,this._head===null}},ic=class{map=new Map;put(n){let t=n.trackById,r=this.map.get(t);r||(r=new zp,this.map.set(t,r)),r.add(n)}get(n,t){let r=n,o=this.map.get(r);return o?o.get(n,t):null}remove(n){let t=n.trackById;return this.map.get(t).remove(n)&&this.map.delete(t),n}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function ry(e,n,t){let r=e.previousIndex;if(r===null)return r;let o=0;return t&&r<t.length&&(o=t[r]),r+n+o}var Vp=class{constructor(){}supports(n){return n instanceof Map||Gs(n)}create(){return new Up}},Up=class{_records=new Map;_mapHead=null;_appendAfter=null;_previousMapHead=null;_changesHead=null;_changesTail=null;_additionsHead=null;_additionsTail=null;_removalsHead=null;_removalsTail=null;get isDirty(){return this._additionsHead!==null||this._changesHead!==null||this._removalsHead!==null}forEachItem(n){let t;for(t=this._mapHead;t!==null;t=t._next)n(t)}forEachPreviousItem(n){let t;for(t=this._previousMapHead;t!==null;t=t._nextPrevious)n(t)}forEachChangedItem(n){let t;for(t=this._changesHead;t!==null;t=t._nextChanged)n(t)}forEachAddedItem(n){let t;for(t=this._additionsHead;t!==null;t=t._nextAdded)n(t)}forEachRemovedItem(n){let t;for(t=this._removalsHead;t!==null;t=t._nextRemoved)n(t)}diff(n){if(!n)n=new Map;else if(!(n instanceof Map||Gs(n)))throw new b(900,!1);return this.check(n)?this:null}onDestroy(){}check(n){this._reset();let t=this._mapHead;if(this._appendAfter=null,this._forEach(n,(r,o)=>{if(t&&t.key===o)this._maybeAddToChanges(t,r),this._appendAfter=t,t=t._next;else{let i=this._getOrCreateRecordForKey(o,r);t=this._insertBeforeOrAppend(t,i)}}),t){t._prev&&(t._prev._next=null),this._removalsHead=t;for(let r=t;r!==null;r=r._nextRemoved)r===this._mapHead&&(this._mapHead=null),this._records.delete(r.key),r._nextRemoved=r._next,r.previousValue=r.currentValue,r.currentValue=null,r._prev=null,r._next=null}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(n,t){if(n){let r=n._prev;return t._next=n,t._prev=r,n._prev=t,r&&(r._next=t),n===this._mapHead&&(this._mapHead=t),this._appendAfter=n,n}return this._appendAfter?(this._appendAfter._next=t,t._prev=this._appendAfter):this._mapHead=t,this._appendAfter=t,null}_getOrCreateRecordForKey(n,t){if(this._records.has(n)){let o=this._records.get(n);this._maybeAddToChanges(o,t);let i=o._prev,a=o._next;return i&&(i._next=a),a&&(a._prev=i),o._next=null,o._prev=null,o}let r=new Hp(n);return this._records.set(n,r),r.currentValue=t,this._addToAdditions(r),r}_reset(){if(this.isDirty){let n;for(this._previousMapHead=this._mapHead,n=this._previousMapHead;n!==null;n=n._next)n._nextPrevious=n._next;for(n=this._changesHead;n!==null;n=n._nextChanged)n.previousValue=n.currentValue;for(n=this._additionsHead;n!=null;n=n._nextAdded)n.previousValue=n.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null}}_maybeAddToChanges(n,t){Object.is(t,n.currentValue)||(n.previousValue=n.currentValue,n.currentValue=t,this._addToChanges(n))}_addToAdditions(n){this._additionsHead===null?this._additionsHead=this._additionsTail=n:(this._additionsTail._nextAdded=n,this._additionsTail=n)}_addToChanges(n){this._changesHead===null?this._changesHead=this._changesTail=n:(this._changesTail._nextChanged=n,this._changesTail=n)}_forEach(n,t){n instanceof Map?n.forEach(t):Object.keys(n).forEach(r=>t(n[r],r))}},Hp=class{key;previousValue=null;currentValue=null;_nextPrevious=null;_next=null;_prev=null;_nextAdded=null;_nextRemoved=null;_nextChanged=null;constructor(n){this.key=n}};function oy(){return new qp([new Lp])}var qp=(()=>{class e{factories;static \u0275prov=v({token:e,providedIn:"root",factory:oy});constructor(t){this.factories=t}static create(t,r){if(r!=null){let o=r.factories.slice();t=t.concat(o)}return new e(t)}static extend(t){return{provide:e,useFactory:()=>{let r=p(e,{optional:!0,skipSelf:!0});return e.create(t,r||oy())}}}find(t){let r=this.factories.find(o=>o.supports(t));if(r!=null)return r;throw new b(901,!1)}}return e})();function iy(){return new $p([new Vp])}var $p=(()=>{class e{static \u0275prov=v({token:e,providedIn:"root",factory:iy});factories;constructor(t){this.factories=t}static create(t,r){if(r){let o=r.factories.slice();t=t.concat(o)}return new e(t)}static extend(t){return{provide:e,useFactory:()=>{let r=p(e,{optional:!0,skipSelf:!0});return e.create(t,r||iy())}}}find(t){let r=this.factories.find(o=>o.supports(t));if(r)return r;throw new b(901,!1)}}return e})();var dy=(()=>{class e{constructor(t){}static \u0275fac=function(r){return new(r||e)(I(bt))};static \u0275mod=ce({type:e});static \u0275inj=oe({})}return e})();function py(e){let{rootComponent:n,appProviders:t,platformProviders:r,platformRef:o}=e;Y(8);try{let i=o?.injector??Tw(r),a=[Kv({}),{provide:At,useExisting:Xv},Oh,...t||[]],s=new hi({providers:a,parent:i,debugName:"",runEnvironmentInitializers:!1});return _w({r3Injector:s.injector,platformInjector:i,rootComponent:n})}catch(i){return Promise.reject(i)}finally{Y(9)}}function Be(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function Gp(e,n=NaN){return!isNaN(parseFloat(e))&&!isNaN(Number(e))?Number(e):n}function Wp(e,n){let t=Rt(e),r=n.elementInjector||Qr();return new On(t).create(r,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}function fy(e){let n=Rt(e);if(!n)return null;let t=new On(n);return{get selector(){return t.selector},get type(){return t.componentType},get inputs(){return t.inputs},get outputs(){return t.outputs},get ngContentSelectors(){return t.ngContentSelectors},get isStandalone(){return n.standalone},get isSignal(){return n.signals}}}var gy=null;function Vt(){return gy}function Zp(e){gy??=e}var Ai=class{},xi=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:()=>p(vy),providedIn:"platform"})}return e})(),Qp=new E(""),vy=(()=>{class e extends xi{_location;_history;_doc=p(U);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return Vt().getBaseHref(this._doc)}onPopState(t){let r=Vt().getGlobalEventTarget(this._doc,"window");return r.addEventListener("popstate",t,!1),()=>r.removeEventListener("popstate",t)}onHashChange(t){let r=Vt().getGlobalEventTarget(this._doc,"window");return r.addEventListener("hashchange",t,!1),()=>r.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,r,o){this._history.pushState(t,r,o)}replaceState(t,r,o){this._history.replaceState(t,r,o)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:()=>new e,providedIn:"platform"})}return e})();function ac(e,n){return e?n?e.endsWith("/")?n.startsWith("/")?e+n.slice(1):e+n:n.startsWith("/")?e+n:`${e}/${n}`:e:n}function my(e){let n=e.search(/#|\?|$/);return e[n-1]==="/"?e.slice(0,n-1)+e.slice(n):e}function _t(e){return e&&e[0]!=="?"?`?${e}`:e}var Dt=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:()=>p(cc),providedIn:"root"})}return e})(),sc=new E(""),cc=(()=>{class e extends Dt{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,r){super(),this._platformLocation=t,this._baseHref=r??this._platformLocation.getBaseHrefFromDOM()??p(U).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return ac(this._baseHref,t)}path(t=!1){let r=this._platformLocation.pathname+_t(this._platformLocation.search),o=this._platformLocation.hash;return o&&t?`${r}${o}`:r}pushState(t,r,o,i){let a=this.prepareExternalUrl(o+_t(i));this._platformLocation.pushState(t,r,a)}replaceState(t,r,o,i){let a=this.prepareExternalUrl(o+_t(i));this._platformLocation.replaceState(t,r,a)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(r){return new(r||e)(I(xi),I(sc,8))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Bn=(()=>{class e{_subject=new V;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let r=this._locationStrategy.getBaseHref();this._basePath=Pw(my(hy(r))),this._locationStrategy.onPopState(o=>{this._subject.next({url:this.path(!0),pop:!0,state:o.state,type:o.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,r=""){return this.path()==this.normalize(t+_t(r))}normalize(t){return e.stripTrailingSlash(Nw(this._basePath,hy(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,r="",o=null){this._locationStrategy.pushState(o,"",t,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+_t(r)),o)}replaceState(t,r="",o=null){this._locationStrategy.replaceState(o,"",t,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+_t(r)),o)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(r=>{this._notifyUrlChangeListeners(r.url,r.state)}),()=>{let r=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(r,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",r){this._urlChangeListeners.forEach(o=>o(t,r))}subscribe(t,r,o){return this._subject.subscribe({next:t,error:r??void 0,complete:o??void 0})}static normalizeQueryParams=_t;static joinWithSlash=ac;static stripTrailingSlash=my;static \u0275fac=function(r){return new(r||e)(I(Dt))};static \u0275prov=v({token:e,factory:()=>Rw(),providedIn:"root"})}return e})();function Rw(){return new Bn(I(Dt))}function Nw(e,n){if(!e||!n.startsWith(e))return n;let t=n.substring(e.length);return t===""||["/",";","?","#"].includes(t[0])?t:n}function hy(e){return e.replace(/\/index.html$/,"")}function Pw(e){if(new RegExp("^(https?:)?//").test(e)){let[,t]=e.split(/\/\/[^\/]+/);return t}return e}var Yp=(()=>{class e extends Dt{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(t,r){super(),this._platformLocation=t,r!=null&&(this._baseHref=r)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}path(t=!1){let r=this._platformLocation.hash??"#";return r.length>0?r.substring(1):r}prepareExternalUrl(t){let r=ac(this._baseHref,t);return r.length>0?"#"+r:r}pushState(t,r,o,i){let a=this.prepareExternalUrl(o+_t(i))||this._platformLocation.pathname;this._platformLocation.pushState(t,r,a)}replaceState(t,r,o,i){let a=this.prepareExternalUrl(o+_t(i))||this._platformLocation.pathname;this._platformLocation.replaceState(t,r,a)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(r){return new(r||e)(I(xi),I(sc,8))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})();var lc=class{$implicit;ngForOf;index;count;constructor(n,t,r,o){this.$implicit=n,this.ngForOf=t,this.index=r,this.count=o}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},zn=(()=>{class e{_viewContainer;_template;_differs;set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}_ngForOf=null;_ngForOfDirty=!0;_differ=null;_trackByFn;constructor(t,r,o){this._viewContainer=t,this._template=r,this._differs=o}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let t=this._ngForOf;!this._differ&&t&&(this._differ=this._differs.find(t).create(this.ngForTrackBy))}if(this._differ){let t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){let r=this._viewContainer;t.forEachOperation((o,i,a)=>{if(o.previousIndex==null)r.createEmbeddedView(this._template,new lc(o.item,this._ngForOf,-1,-1),a===null?void 0:a);else if(a==null)r.remove(i===null?void 0:i);else if(i!==null){let s=r.get(i);r.move(s,a),yy(s,o)}});for(let o=0,i=r.length;o<i;o++){let s=r.get(o).context;s.index=o,s.count=i,s.ngForOf=this._ngForOf}t.forEachIdentityChange(o=>{let i=r.get(o.currentIndex);yy(i,o)})}static ngTemplateContextGuard(t,r){return!0}static \u0275fac=function(r){return new(r||e)(J(Ge),J(vt),J(qp))};static \u0275dir=fe({type:e,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}})}return e})();function yy(e,n){e.context.$implicit=n.item}var dn=(()=>{class e{_viewContainer;_context=new uc;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(t,r){this._viewContainer=t,this._thenTemplateRef=r}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){by(t,!1),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){by(t,!1),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(t,r){return!0}static \u0275fac=function(r){return new(r||e)(J(Ge),J(vt))};static \u0275dir=fe({type:e,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return e})(),uc=class{$implicit=null;ngIf=null};function by(e,n){if(e&&!e.createEmbeddedView)throw new b(2020,!1)}var Kp=(()=>{class e{_ngEl;_differs;_renderer;_ngStyle=null;_differ=null;constructor(t,r,o){this._ngEl=t,this._differs=r,this._renderer=o}set ngStyle(t){this._ngStyle=t,!this._differ&&t&&(this._differ=this._differs.find(t).create())}ngDoCheck(){if(this._differ){let t=this._differ.diff(this._ngStyle);t&&this._applyChanges(t)}}_setStyle(t,r){let[o,i]=t.split("."),a=o.indexOf("-")===-1?void 0:gt.DashCase;r!=null?this._renderer.setStyle(this._ngEl.nativeElement,o,i?`${r}${i}`:r,a):this._renderer.removeStyle(this._ngEl.nativeElement,o,a)}_applyChanges(t){t.forEachRemovedItem(r=>this._setStyle(r.key,null)),t.forEachAddedItem(r=>this._setStyle(r.key,r.currentValue)),t.forEachChangedItem(r=>this._setStyle(r.key,r.currentValue))}static \u0275fac=function(r){return new(r||e)(J(pe),J($p),J(kn))};static \u0275dir=fe({type:e,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"}})}return e})();var We=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ce({type:e});static \u0275inj=oe({})}return e})();function Jp(e,n){n=encodeURIComponent(n);for(let t of e.split(";")){let r=t.indexOf("="),[o,i]=r==-1?[t,""]:[t.slice(0,r),t.slice(r+1)];if(o.trim()===n)return decodeURIComponent(i)}return null}var Ri=class{};var ef="browser";function Ey(e){return e===ef}var Cy=(()=>{class e{static \u0275prov=v({token:e,providedIn:"root",factory:()=>new Xp(p(U),window)})}return e})(),Xp=class{document;window;offset=()=>[0,0];constructor(n,t){this.document=n,this.window=t}setOffset(n){Array.isArray(n)?this.offset=()=>n:this.offset=n}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(n,t){this.window.scrollTo($(y({},t),{left:n[0],top:n[1]}))}scrollToAnchor(n,t){let r=Fw(this.document,n);r&&(this.scrollToElement(r,t),r.focus())}setHistoryScrollRestoration(n){try{this.window.history.scrollRestoration=n}catch{console.warn(xt(2400,!1))}}scrollToElement(n,t){let r=n.getBoundingClientRect(),o=r.left+this.window.pageXOffset,i=r.top+this.window.pageYOffset,a=this.offset();this.window.scrollTo($(y({},t),{left:o-a[0],top:i-a[1]}))}};function Fw(e,n){let t=e.getElementById(n)||e.getElementsByName(n)[0];if(t)return t;if(typeof e.createTreeWalker=="function"&&e.body&&typeof e.body.attachShadow=="function"){let r=e.createTreeWalker(e.body,NodeFilter.SHOW_ELEMENT),o=r.currentNode;for(;o;){let i=o.shadowRoot;if(i){let a=i.getElementById(n)||i.querySelector(`[name="${n}"]`);if(a)return a}o=r.nextNode()}}return null}var pc=new E(""),af=(()=>{class e{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,r){this._zone=r,t.forEach(o=>{o.manager=this}),this._plugins=t.slice().reverse()}addEventListener(t,r,o,i){return this._findPluginFor(r).addEventListener(t,r,o,i)}getZone(){return this._zone}_findPluginFor(t){let r=this._eventNameToPlugin.get(t);if(r)return r;if(r=this._plugins.find(i=>i.supports(t)),!r)throw new b(5101,!1);return this._eventNameToPlugin.set(t,r),r}static \u0275fac=function(r){return new(r||e)(I(pc),I(q))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),Pi=class{_doc;constructor(n){this._doc=n}manager},tf="ng-app-id";function _y(e){for(let n of e)n.remove()}function Dy(e,n){let t=n.createElement("style");return t.textContent=e,t}function kw(e,n,t,r){let o=e.head?.querySelectorAll(`style[${tf}="${n}"],link[${tf}="${n}"]`);if(o)for(let i of o)i.removeAttribute(tf),i instanceof HTMLLinkElement?r.set(i.href.slice(i.href.lastIndexOf("/")+1),{usage:0,elements:[i]}):i.textContent&&t.set(i.textContent,{usage:0,elements:[i]})}function rf(e,n){let t=n.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",e),t}var sf=(()=>{class e{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,r,o,i={}){this.doc=t,this.appId=r,this.nonce=o,kw(t,r,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,r){for(let o of t)this.addUsage(o,this.inline,Dy);r?.forEach(o=>this.addUsage(o,this.external,rf))}removeStyles(t,r){for(let o of t)this.removeUsage(o,this.inline);r?.forEach(o=>this.removeUsage(o,this.external))}addUsage(t,r,o){let i=r.get(t);i?i.usage++:r.set(t,{usage:1,elements:[...this.hosts].map(a=>this.addElement(a,o(t,this.doc)))})}removeUsage(t,r){let o=r.get(t);o&&(o.usage--,o.usage<=0&&(_y(o.elements),r.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])_y(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[r,{elements:o}]of this.inline)o.push(this.addElement(t,Dy(r,this.doc)));for(let[r,{elements:o}]of this.external)o.push(this.addElement(t,rf(r,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,r){return this.nonce&&r.setAttribute("nonce",this.nonce),t.appendChild(r)}static \u0275fac=function(r){return new(r||e)(I(U),I(uo),I(po,8),I(Fn))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),nf={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},cf=/%COMP%/g;var wy="%COMP%",Lw=`_nghost-${wy}`,jw=`_ngcontent-${wy}`,Bw=!0,zw=new E("",{providedIn:"root",factory:()=>Bw});function Vw(e){return jw.replace(cf,e)}function Uw(e){return Lw.replace(cf,e)}function Ty(e,n){return n.map(t=>t.replace(cf,e))}var lf=(()=>{class e{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;platformId;ngZone;nonce;animationDisabled;maxAnimationTimeout;tracingService;rendererByCompId=new Map;defaultRenderer;platformIsServer;registry;constructor(t,r,o,i,a,s,c,l=null,u,d,m=null){this.eventManager=t,this.sharedStylesHost=r,this.appId=o,this.removeStylesOnCompDestroy=i,this.doc=a,this.platformId=s,this.ngZone=c,this.nonce=l,this.animationDisabled=u,this.maxAnimationTimeout=d,this.tracingService=m,this.platformIsServer=!1,this.defaultRenderer=new Oi(t,a,c,this.platformIsServer,this.tracingService,this.registry=ls(),this.maxAnimationTimeout)}createRenderer(t,r){if(!t||!r)return this.defaultRenderer;let o=this.getOrCreateRenderer(t,r);return o instanceof dc?o.applyToHost(t):o instanceof Fi&&o.applyStyles(),o}getOrCreateRenderer(t,r){let o=this.rendererByCompId,i=o.get(r.id);if(!i){let a=this.doc,s=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.platformIsServer,m=this.tracingService;switch(r.encapsulation){case tn.Emulated:i=new dc(c,l,r,this.appId,u,a,s,d,m,this.registry,this.animationDisabled,this.maxAnimationTimeout);break;case tn.ShadowDom:return new of(c,l,t,r,a,s,this.nonce,d,m,this.registry,this.maxAnimationTimeout);default:i=new Fi(c,l,r,u,a,s,d,m,this.registry,this.animationDisabled,this.maxAnimationTimeout);break}o.set(r.id,i)}return i}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(r){return new(r||e)(I(af),I(sf),I(uo),I(zw),I(U),I(Fn),I(q),I(po),I(wp),I(Tp),I(vr,8))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),Oi=class{eventManager;doc;ngZone;platformIsServer;tracingService;registry;maxAnimationTimeout;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,t,r,o,i,a,s){this.eventManager=n,this.doc=t,this.ngZone=r,this.platformIsServer=o,this.tracingService=i,this.registry=a,this.maxAnimationTimeout=s}destroy(){}destroyNode=null;createElement(n,t){return t?this.doc.createElementNS(nf[t]||t,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,t){(Iy(n)?n.content:n).appendChild(t)}insertBefore(n,t,r){n&&(Iy(n)?n.content:n).insertBefore(t,r)}removeChild(n,t){let{elements:r}=this.registry;if(r){r.animate(t,()=>t.remove(),this.maxAnimationTimeout);return}t.remove()}selectRootElement(n,t){let r=typeof n=="string"?this.doc.querySelector(n):n;if(!r)throw new b(-5104,!1);return t||(r.textContent=""),r}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,t,r,o){if(o){t=o+":"+t;let i=nf[o];i?n.setAttributeNS(i,t,r):n.setAttribute(t,r)}else n.setAttribute(t,r)}removeAttribute(n,t,r){if(r){let o=nf[r];o?n.removeAttributeNS(o,t):n.removeAttribute(`${r}:${t}`)}else n.removeAttribute(t)}addClass(n,t){n.classList.add(t)}removeClass(n,t){n.classList.remove(t)}setStyle(n,t,r,o){o&(gt.DashCase|gt.Important)?n.style.setProperty(t,r,o&gt.Important?"important":""):n.style[t]=r}removeStyle(n,t,r){r&gt.DashCase?n.style.removeProperty(t):n.style[t]=""}setProperty(n,t,r){n!=null&&(n[t]=r)}setValue(n,t){n.nodeValue=t}listen(n,t,r,o){if(typeof n=="string"&&(n=Vt().getGlobalEventTarget(this.doc,n),!n))throw new b(5102,!1);let i=this.decoratePreventDefault(r);return this.tracingService?.wrapEventListener&&(i=this.tracingService.wrapEventListener(n,t,i)),this.eventManager.addEventListener(n,t,i,o)}decoratePreventDefault(n){return t=>{if(t==="__ngUnwrap__")return n;n(t)===!1&&t.preventDefault()}}};function Iy(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var of=class extends Oi{sharedStylesHost;hostEl;shadowRoot;constructor(n,t,r,o,i,a,s,c,l,u,d){super(n,i,a,c,l,u,d),this.sharedStylesHost=t,this.hostEl=r,this.shadowRoot=r.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let m=o.styles;m=Ty(o.id,m);for(let g of m){let w=document.createElement("style");s&&w.setAttribute("nonce",s),w.textContent=g,this.shadowRoot.appendChild(w)}let f=o.getExternalStyles?.();if(f)for(let g of f){let w=rf(g,i);s&&w.setAttribute("nonce",s),this.shadowRoot.appendChild(w)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,t){return super.appendChild(this.nodeOrShadowRoot(n),t)}insertBefore(n,t,r){return super.insertBefore(this.nodeOrShadowRoot(n),t,r)}removeChild(n,t){return super.removeChild(null,t)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},Fi=class extends Oi{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;_animationDisabled;constructor(n,t,r,o,i,a,s,c,l,u,d,m){super(n,i,a,s,c,l,d),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=o,this._animationDisabled=u;let f=r.styles;this.styles=m?Ty(m,f):f,this.styleUrls=r.getExternalStyles?.(m)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){if(this.removeStylesOnCompDestroy){if(!this._animationDisabled&&this.registry.elements){this.ngZone.runOutsideAngular(()=>{setTimeout(()=>{this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)},this.maxAnimationTimeout)});return}this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}}},dc=class extends Fi{contentAttr;hostAttr;constructor(n,t,r,o,i,a,s,c,l,u,d,m){let f=o+"-"+r.id;super(n,t,r,i,a,s,c,l,u,d,m,f),this.contentAttr=Vw(f),this.hostAttr=Uw(f)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,t){let r=super.createElement(n,t);return super.setAttribute(r,this.contentAttr,""),r}};var fc=class e extends Ai{supportsDOMEvents=!0;static makeCurrent(){Zp(new e)}onAndCancel(n,t,r,o){return n.addEventListener(t,r,o),()=>{n.removeEventListener(t,r,o)}}dispatchEvent(n,t){n.dispatchEvent(t)}remove(n){n.remove()}createElement(n,t){return t=t||this.getDefaultDocument(),t.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,t){return t==="window"?window:t==="document"?n:t==="body"?n.body:null}getBaseHref(n){let t=Hw();return t==null?null:qw(t)}resetBaseElement(){ki=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return Jp(document.cookie,n)}},ki=null;function Hw(){return ki=ki||document.head.querySelector("base"),ki?ki.getAttribute("href"):null}function qw(e){return new URL(e,document.baseURI).pathname}var mc=class{addToWindow(n){Le.getAngularTestability=(r,o=!0)=>{let i=n.findTestabilityInTree(r,o);if(i==null)throw new b(5103,!1);return i},Le.getAllAngularTestabilities=()=>n.getAllTestabilities(),Le.getAllAngularRootElements=()=>n.getAllRootElements();let t=r=>{let o=Le.getAllAngularTestabilities(),i=o.length,a=function(){i--,i==0&&r()};o.forEach(s=>{s.whenStable(a)})};Le.frameworkStabilizers||(Le.frameworkStabilizers=[]),Le.frameworkStabilizers.push(t)}findTestabilityInTree(n,t,r){if(t==null)return null;let o=n.getTestability(t);return o??(r?Vt().isShadowRoot(t)?this.findTestabilityInTree(n,t.host,!0):this.findTestabilityInTree(n,t.parentElement,!0):null)}},$w=(()=>{class e{build(){return new XMLHttpRequest}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),Sy=(()=>{class e extends Pi{constructor(t){super(t)}supports(t){return!0}addEventListener(t,r,o,i){return t.addEventListener(r,o,i),()=>this.removeEventListener(t,r,o,i)}removeEventListener(t,r,o,i){return t.removeEventListener(r,o,i)}static \u0275fac=function(r){return new(r||e)(I(U))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),My=["alt","control","meta","shift"],Gw={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},Ww={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},Ay=(()=>{class e extends Pi{constructor(t){super(t)}supports(t){return e.parseEventName(t)!=null}addEventListener(t,r,o,i){let a=e.parseEventName(r),s=e.eventCallback(a.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Vt().onAndCancel(t,a.domEventName,s,i))}static parseEventName(t){let r=t.toLowerCase().split("."),o=r.shift();if(r.length===0||!(o==="keydown"||o==="keyup"))return null;let i=e._normalizeKey(r.pop()),a="",s=r.indexOf("code");if(s>-1&&(r.splice(s,1),a="code."),My.forEach(l=>{let u=r.indexOf(l);u>-1&&(r.splice(u,1),a+=l+".")}),a+=i,r.length!=0||i.length===0)return null;let c={};return c.domEventName=o,c.fullKey=a,c}static matchEventFullKeyCode(t,r){let o=Gw[t.key]||t.key,i="";return r.indexOf("code.")>-1&&(o=t.code,i="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),My.forEach(a=>{if(a!==o){let s=Ww[a];s(t)&&(i+=a+".")}}),i+=o,i===r)}static eventCallback(t,r,o){return i=>{e.matchEventFullKeyCode(i,t)&&o.runGuarded(()=>r(i))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(r){return new(r||e)(I(U))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})();function uf(e,n,t){let r=y({rootComponent:e,platformRef:t?.platformRef},Zw(n));return py(r)}function Zw(e){return{appProviders:[...xy,...e?.providers??[]],platformProviders:Jw}}function Qw(){fc.makeCurrent()}function Yw(){return new De}function Kw(){return Ld(document),document}var Jw=[{provide:Fn,useValue:ef},{provide:Ls,useValue:Qw,multi:!0},{provide:U,useFactory:Kw}];var Xw=[{provide:ho,useClass:mc},{provide:Js,useClass:Di,deps:[q,Ii,ho]},{provide:Di,useClass:Di,deps:[q,Ii,ho]}],xy=[{provide:ei,useValue:"root"},{provide:De,useFactory:Yw},{provide:pc,useClass:Sy,multi:!0,deps:[U]},{provide:pc,useClass:Ay,multi:!0,deps:[U]},lf,sf,af,{provide:rn,useExisting:lf},{provide:Ri,useClass:$w},[]],df=(()=>{class e{constructor(){}static \u0275fac=function(r){return new(r||e)};static \u0275mod=ce({type:e});static \u0275inj=oe({providers:[...xy,...Xw],imports:[We,dy]})}return e})();var ff=class{};var _r=class e{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(t=>{let r=t.indexOf(":");if(r>0){let o=t.slice(0,r),i=t.slice(r+1).trim();this.addHeaderEntry(o,i)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((t,r)=>{this.addHeaderEntry(r,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([t,r])=>{this.setHeaderEntries(t,r)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let t=this.headers.get(n.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,t){return this.clone({name:n,value:t,op:"a"})}set(n,t){return this.clone({name:n,value:t,op:"s"})}delete(n,t){return this.clone({name:n,value:t,op:"d"})}maybeSetNormalizedName(n,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,n)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(t=>{this.headers.set(t,n.headers.get(t)),this.normalizedNames.set(t,n.normalizedNames.get(t))})}clone(n){let t=new e;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([n]),t}applyUpdate(n){let t=n.name.toLowerCase();switch(n.op){case"a":case"s":let r=n.value;if(typeof r=="string"&&(r=[r]),r.length===0)return;this.maybeSetNormalizedName(n.name,t);let o=(n.op==="a"?this.headers.get(t):void 0)||[];o.push(...r),this.headers.set(t,o);break;case"d":let i=n.value;if(!i)this.headers.delete(t),this.normalizedNames.delete(t);else{let a=this.headers.get(t);if(!a)return;a=a.filter(s=>i.indexOf(s)===-1),a.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,a)}break}}addHeaderEntry(n,t){let r=n.toLowerCase();this.maybeSetNormalizedName(n,r),this.headers.has(r)?this.headers.get(r).push(t):this.headers.set(r,[t])}setHeaderEntries(n,t){let r=(Array.isArray(t)?t:[t]).map(i=>i.toString()),o=n.toLowerCase();this.headers.set(o,r),this.maybeSetNormalizedName(n,o)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>n(this.normalizedNames.get(t),this.headers.get(t)))}};var mf=class{encodeKey(n){return Ry(n)}encodeValue(n){return Ry(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function eT(e,n){let t=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(o=>{let i=o.indexOf("="),[a,s]=i==-1?[n.decodeKey(o),""]:[n.decodeKey(o.slice(0,i)),n.decodeValue(o.slice(i+1))],c=t.get(a)||[];c.push(s),t.set(a,c)}),t}var tT=/%(\d[a-f0-9])/gi,nT={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function Ry(e){return encodeURIComponent(e).replace(tT,(n,t)=>nT[t]??n)}function hc(e){return`${e}`}var pn=class e{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new mf,n.fromString){if(n.fromObject)throw new b(2805,!1);this.map=eT(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(t=>{let r=n.fromObject[t],o=Array.isArray(r)?r.map(hc):[hc(r)];this.map.set(t,o)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let t=this.map.get(n);return t?t[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,t){return this.clone({param:n,value:t,op:"a"})}appendAll(n){let t=[];return Object.keys(n).forEach(r=>{let o=n[r];Array.isArray(o)?o.forEach(i=>{t.push({param:r,value:i,op:"a"})}):t.push({param:r,value:o,op:"a"})}),this.clone(t)}set(n,t){return this.clone({param:n,value:t,op:"s"})}delete(n,t){return this.clone({param:n,value:t,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let t=this.encoder.encodeKey(n);return this.map.get(n).map(r=>t+"="+this.encoder.encodeValue(r)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let t=new e({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(n),t}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let t=(n.op==="a"?this.map.get(n.param):void 0)||[];t.push(hc(n.value)),this.map.set(n.param,t);break;case"d":if(n.value!==void 0){let r=this.map.get(n.param)||[],o=r.indexOf(hc(n.value));o!==-1&&r.splice(o,1),r.length>0?this.map.set(n.param,r):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};var hf=class{map=new Map;set(n,t){return this.map.set(n,t),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}};function rT(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function Ny(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function Py(e){return typeof Blob<"u"&&e instanceof Blob}function Oy(e){return typeof FormData<"u"&&e instanceof FormData}function oT(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}var iT="X-Request-URL",Fy="text/plain",ky="application/json",MH=`${ky}, ${Fy}, */*`,Co=class e{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,t,r,o){this.url=t,this.method=n.toUpperCase();let i;if(rT(this.method)||o?(this.body=r!==void 0?r:null,i=o):i=r,i){if(this.reportProgress=!!i.reportProgress,this.withCredentials=!!i.withCredentials,this.keepalive=!!i.keepalive,i.responseType&&(this.responseType=i.responseType),i.headers&&(this.headers=i.headers),i.context&&(this.context=i.context),i.params&&(this.params=i.params),i.priority&&(this.priority=i.priority),i.cache&&(this.cache=i.cache),i.credentials&&(this.credentials=i.credentials),typeof i.timeout=="number"){if(i.timeout<1||!Number.isInteger(i.timeout))throw new b(2822,"");this.timeout=i.timeout}i.mode&&(this.mode=i.mode),i.redirect&&(this.redirect=i.redirect),i.integrity&&(this.integrity=i.integrity),i.referrer&&(this.referrer=i.referrer),this.transferCache=i.transferCache}if(this.headers??=new _r,this.context??=new hf,!this.params)this.params=new pn,this.urlWithParams=t;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=t;else{let s=t.indexOf("?"),c=s===-1?"?":s<t.length-1?"&":"";this.urlWithParams=t+c+a}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||Ny(this.body)||Py(this.body)||Oy(this.body)||oT(this.body)?this.body:this.body instanceof pn?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||Oy(this.body)?null:Py(this.body)?this.body.type||null:Ny(this.body)?null:typeof this.body=="string"?Fy:this.body instanceof pn?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?ky:null}clone(n={}){let t=n.method||this.method,r=n.url||this.url,o=n.responseType||this.responseType,i=n.keepalive??this.keepalive,a=n.priority||this.priority,s=n.cache||this.cache,c=n.mode||this.mode,l=n.redirect||this.redirect,u=n.credentials||this.credentials,d=n.referrer||this.referrer,m=n.integrity||this.integrity,f=n.transferCache??this.transferCache,g=n.timeout??this.timeout,w=n.body!==void 0?n.body:this.body,z=n.withCredentials??this.withCredentials,P=n.reportProgress??this.reportProgress,wt=n.headers||this.headers,hn=n.params||this.params,AE=n.context??this.context;return n.setHeaders!==void 0&&(wt=Object.keys(n.setHeaders).reduce((cl,jo)=>cl.set(jo,n.setHeaders[jo]),wt)),n.setParams&&(hn=Object.keys(n.setParams).reduce((cl,jo)=>cl.set(jo,n.setParams[jo]),hn)),new e(t,r,w,{params:hn,headers:wt,context:AE,reportProgress:P,responseType:o,withCredentials:z,transferCache:f,keepalive:i,cache:s,priority:a,timeout:g,mode:c,redirect:l,credentials:u,referrer:d,integrity:m})}},vf=(function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e})(vf||{}),gf=class{headers;status;statusText;url;ok;type;redirected;constructor(n,t=200,r="OK"){this.headers=n.headers||new _r,this.status=n.status!==void 0?n.status:t,this.statusText=n.statusText||r,this.url=n.url||null,this.redirected=n.redirected,this.ok=this.status>=200&&this.status<300}};var gc=class e extends gf{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=vf.Response;clone(n={}){return new e({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected})}};function pf(e,n){return{body:n,headers:e.headers,context:e.context,observe:e.observe,params:e.params,reportProgress:e.reportProgress,responseType:e.responseType,withCredentials:e.withCredentials,credentials:e.credentials,transferCache:e.transferCache,timeout:e.timeout,keepalive:e.keepalive,priority:e.priority,cache:e.cache,mode:e.mode,redirect:e.redirect,integrity:e.integrity,referrer:e.referrer}}var yf=(()=>{class e{handler;constructor(t){this.handler=t}request(t,r,o={}){let i;if(t instanceof Co)i=t;else{let c;o.headers instanceof _r?c=o.headers:c=new _r(o.headers);let l;o.params&&(o.params instanceof pn?l=o.params:l=new pn({fromObject:o.params})),i=new Co(t,r,o.body!==void 0?o.body:null,{headers:c,context:o.context,params:l,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache,keepalive:o.keepalive,priority:o.priority,cache:o.cache,mode:o.mode,redirect:o.redirect,credentials:o.credentials,referrer:o.referrer,integrity:o.integrity,timeout:o.timeout})}let a=T(i).pipe(St(c=>this.handler.handle(c)));if(t instanceof Co||o.observe==="events")return a;let s=a.pipe(te(c=>c instanceof gc));switch(o.observe||"body"){case"body":switch(i.responseType){case"arraybuffer":return s.pipe(A(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new b(2806,!1);return c.body}));case"blob":return s.pipe(A(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new b(2807,!1);return c.body}));case"text":return s.pipe(A(c=>{if(c.body!==null&&typeof c.body!="string")throw new b(2808,!1);return c.body}));case"json":default:return s.pipe(A(c=>c.body))}case"response":return s;default:throw new b(2809,!1)}}delete(t,r={}){return this.request("DELETE",t,r)}get(t,r={}){return this.request("GET",t,r)}head(t,r={}){return this.request("HEAD",t,r)}jsonp(t,r){return this.request("JSONP",t,{params:new pn().append(r,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,r={}){return this.request("OPTIONS",t,r)}patch(t,r,o={}){return this.request("PATCH",t,pf(o,r))}post(t,r,o={}){return this.request("POST",t,pf(o,r))}put(t,r,o={}){return this.request("PUT",t,pf(o,r))}static \u0275fac=function(r){return new(r||e)(I(ff))};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})();var SH=RegExp(`^${iT}:`,"m");var Ly=(()=>{class e{_doc;constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}static \u0275fac=function(r){return new(r||e)(I(U))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var bf=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:function(r){let o=null;return r?o=new(r||e):o=I(sT),o},providedIn:"root"})}return e})(),sT=(()=>{class e extends bf{_doc;constructor(t){super(),this._doc=t}sanitize(t,r){if(r==null)return null;switch(t){case Te.NONE:return r;case Te.HTML:return an(r,"HTML")?et(r):$d(this._doc,String(r)).toString();case Te.STYLE:return an(r,"Style")?et(r):r;case Te.SCRIPT:if(an(r,"Script"))return et(r);throw new b(5200,!1);case Te.URL:return an(r,"URL")?et(r):bi(String(r));case Te.RESOURCE_URL:if(an(r,"ResourceURL"))return et(r);throw new b(5201,!1);default:throw new b(5202,!1)}}bypassSecurityTrustHtml(t){return zd(t)}bypassSecurityTrustStyle(t){return Vd(t)}bypassSecurityTrustScript(t){return Ud(t)}bypassSecurityTrustUrl(t){return Hd(t)}bypassSecurityTrustResourceUrl(t){return qd(t)}static \u0275fac=function(r){return new(r||e)(I(U))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var By=[{nombre:"Europa",hijos:[{nombre:"Alemania",flag:"https://flagcdn.com/de.svg",hijos:[{nombre:"Aachen/Aquisgr\xE1n",path:"europa/alemania/aachen"},{nombre:"Bonn",path:"europa/alemania/bonn"},{nombre:"Colonia",path:"europa/alemania/colonia"},{nombre:"Dortmund",path:"europa/alemania/dortmund"},{nombre:"D\xFCsseldorf",path:"europa/alemania/dusseldorf"},{nombre:"Fr\xE1ncfort del Meno",path:"europa/alemania/francfort"},{nombre:"Heidelberg",path:"europa/alemania/heidelberg"},{nombre:"Idstein",path:"europa/alemania/idstein"},{nombre:"M\xFCnster",path:"europa/alemania/munster"},{nombre:"Tr\xE9veris/Trier",path:"europa/alemania/treveris"}]},{nombre:"Andorra",flag:"https://flagcdn.com/ad.svg",hijos:[{nombre:"Andorra",path:"europa/andorra/andorra"}]},{nombre:"Espa\xF1a",flag:"https://flagcdn.com/es.svg",hijos:[{nombre:"Andaluc\xEDa",hijos:[{nombre:"Huelva",hijos:[{nombre:"Huelva ciudad",path:"europa/espana/andalucia/huelva/huelva-ciudad"},{nombre:"Palos de la Frontera",path:"europa/espana/andalucia/huelva/palos"}]},{nombre:"C\xE1diz",hijos:[{nombre:"C\xE1diz ciudad",path:"europa/espana/andalucia/cadiz/cadiz-ciudad"},{nombre:"Grazalema",path:"europa/espana/andalucia/cadiz/grazalema"},{nombre:"Jerez de la Frontera",path:"europa/espana/andalucia/cadiz/jerez-de-la-frontera"},{nombre:"Setenil de las Bodegas",path:"europa/espana/andalucia/cadiz/setenil-de-las-bodegas"},{nombre:"Trebujena",path:"europa/espana/andalucia/cadiz/trebujena"}]},{nombre:"Sevilla",hijos:[{nombre:"Sevilla ciudad",path:"europa/espana/andalucia/sevilla/sevilla-ciudad"},{nombre:"Castilblanco de los Arroyos",path:"europa/espana/andalucia/sevilla/castilblanco-de-los-arroyos"},{nombre:"Coria del R\xEDo",path:"europa/espana/andalucia/sevilla/coria-del-rio"},{nombre:"Isla Mayor",path:"europa/espana/andalucia/sevilla/isla-mayor"},{nombre:"Mairena del Aljarafe",path:"europa/espana/andalucia/sevilla/mairena-del-aljarafe"},{nombre:"Palomares del R\xEDo",path:"europa/espana/andalucia/sevilla/palomares-del-rio"},{nombre:"El Real de la Jara",path:"europa/espana/andalucia/sevilla/real-de-la-jara"},{nombre:"Santiponce",path:"europa/espana/andalucia/sevilla/santiponce"}]},{nombre:"C\xF3rboda",hijos:[{nombre:"C\xF3rdoba ciudad",path:"europa/espana/andalucia/cordoba/cordoba-ciudad"}]},{nombre:"M\xE1laga",hijos:[{nombre:"M\xE1laga ciudad",path:"europa/espana/andalucia/malaga/malaga-ciudad"}]},{nombre:"Ja\xE9n",hijos:[{nombre:"Ja\xE9n ciudad",path:"europa/espana/andalucia/jaen/jaen-ciudad"}]},{nombre:"Granada",hijos:[{nombre:"Granada ciudad",path:"europa/espana/andalucia/granada/granada-ciudad"}]},{nombre:"Almer\xEDa",hijos:[{nombre:"Almer\xEDa ciudad",path:"europa/espana/andalucia/almeria/almeria-ciudad"}]}]},{nombre:"Islas Baleares",hijos:[{nombre:"Mallorca",path:"europa/espana/baleares/mallorca"}]},{nombre:"Islas Canarias",hijos:[{nombre:"Tenerife",path:"europa/espana/canarias/tenerife"}]},{nombre:"Catalu\xF1a",hijos:[{nombre:"Gerona",hijos:[{nombre:"Gerona",path:"europa/espana/cataluna/gerona/gerona-ciudad"}]}]},{nombre:"Extremadura",hijos:[{nombre:"M\xE9rida",path:"europa/espana/extremadura/merida/merida-ciudad"},{nombre:"Badajoz",path:"europa/espana/extremadura/badajoz/badajoz-ciudad"},{nombre:"C\xE1ceres",hijos:[{nombre:"C\xE1ceres ciudad",path:"europa/espana/extremadura/caceres/caceres-ciudad"},{nombre:"Coria",path:"europa/espana/extremadura/caceres/coria"},{nombre:"Plasencia",path:"europa/espana/extremadura/caceres/plasencia"},{nombre:"Trujillo",path:"europa/espana/extremadura/caceres/trujillo"}]}]},{nombre:"Comunidad Madrid",hijos:[{nombre:"Madrid",path:"europa/espana/madrid/madrid-ciudad"}]},{nombre:"Murcia",hijos:[{nombre:"Murcia",path:"europa/espana/murcia/murcia-ciudad"},{nombre:"Cartagena",path:"europa/espana/murcia/cartagena"}]},{nombre:"Navarra",hijos:[{nombre:"Pamplona",path:"europa/espana/murcia/murcia-ciudad"}]},{nombre:"Pa\xEDs Vasco",hijos:[{nombre:"\xC1lava",hijos:[{nombre:"Vitoria-Gasteiz",path:"europa/espana/pais-vasco/alava/vitoria"}]},{nombre:"Guip\xFAzcoa",hijos:[{nombre:"San Sebasti\xE1n/Donostia",path:"europa/espana/pais-vasco/guipuzcoa/san-sebastian"}]},{nombre:"Vizcaya",hijos:[{nombre:"Bilbao",path:"europa/espana/pais-vasco/vizcaya/bilbao"}]}]},{nombre:"La Rioja",hijos:[{nombre:"Logro\xF1o",path:"europa/espana/rioja/logrono"}]},{nombre:"Ceuta",hijos:[{nombre:"Ceuta",path:"europa/espana/ceuta/ceuta-ciudad"}]}]},{nombre:"Gibraltar",flag:"https://flagcdn.com/gi.svg",hijos:[{nombre:"Gibraltar",path:"europa/gibraltar/gibraltar"}]},{nombre:"Irlanda",flag:"https://flagcdn.com/ie.svg",hijos:[{nombre:"Dublin",path:"europa/irlanda/dublin"}]},{nombre:"Italia",flag:"https://flagcdn.com/it.svg",hijos:[{nombre:"Roma y Ciudad del Vaticano",path:"europa/italia/roma-vaticano"}]},{nombre:"Pa\xEDses Bajos",flag:"https://flagcdn.com/nl.svg",hijos:[{nombre:"\xC1msterdam",path:"europa/paises-bajos/amsterdam"}]},{nombre:"Portugal",flag:"https://flagcdn.com/pt.svg",hijos:[{nombre:"Lisboa",path:"europa/portugal/lisboa"}]},{nombre:"Rumania",flag:"https://flagcdn.com/ro.svg",hijos:[{nombre:"Bucarest",path:"europa/rumania/bucarest"}]},{nombre:"Polonia",flag:"https://flagcdn.com/pl.svg",hijos:[{nombre:"Varsovia",path:"europa/polonia/varsovia"},{nombre:"Cracovia",path:"europa/polonia/cracovia"}]},{nombre:"Rep\xFAblica Checa",flag:"https://flagcdn.com/cz.svg",hijos:[{nombre:"Praga",path:"europa/andorra/praga"}]},{nombre:"Turqu\xEDa",flag:"https://flagcdn.com/tr.svg",hijos:[{nombre:"Estambul",path:"europa/turquia/estambul"}]}]},{nombre:"\xC1frica",hijos:[{nombre:"Marruecos",flag:"https://flagcdn.com/ma.svg",hijos:[{nombre:"T\xE1nger",path:"africa/marruecos/tanger"},{nombre:"Asilah/Arcila",path:"africa/marruecos/asilah"},{nombre:"Tetu\xE1n",path:"africa/marruecos/tetuan"},{nombre:"Chefchaouen/Chauen",path:"africa/marruecos/chefchaouen"}]}]},{nombre:"Am\xE9rica",hijos:[{nombre:"Norteam\xE9rica",hijos:[{nombre:"Estados Unidos",flag:"https://flagcdn.com/us.svg",hijos:[{nombre:"Nueva York",path:"america/norteamerica/estados-unidos/nueva-york"}]},{nombre:"M\xE9xico",flag:"https://flagcdn.com/mx.svg",hijos:[{nombre:"Riviera Maya",hijos:[{nombre:"Canc\xFAn",path:"america/norteamerica/mexico/riviera-maya/cancun"}]}]}]},{nombre:"Centroam\xE9rica",hijos:[]},{nombre:"Sudam\xE9rica",hijos:[{nombre:"Brasil",flag:"https://flagcdn.com/br.svg",hijos:[{nombre:"R\xEDo de Janeiro",path:"america/sudamerica/brasil/rio-de-janeiro"}]}]}]},{nombre:"Asia"},{nombre:"Ocean\xEDa"},{nombre:"Ant\xE1rtida"}];var O="primary",Qi=Symbol("RouteTitle"),If=class{params;constructor(n){this.params=n||{}}has(n){return Object.prototype.hasOwnProperty.call(this.params,n)}get(n){if(this.has(n)){let t=this.params[n];return Array.isArray(t)?t[0]:t}return null}getAll(n){if(this.has(n)){let t=this.params[n];return Array.isArray(t)?t:[t]}return[]}get keys(){return Object.keys(this.params)}};function wr(e){return new If(e)}function Wy(e,n,t){let r=t.path.split("/");if(r.length>e.length||t.pathMatch==="full"&&(n.hasChildren()||r.length<e.length))return null;let o={};for(let i=0;i<r.length;i++){let a=r[i],s=e[i];if(a[0]===":")o[a.substring(1)]=s;else if(a!==s.path)return null}return{consumed:e.slice(0,r.length),posParams:o}}function cT(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;++t)if(!Ut(e[t],n[t]))return!1;return!0}function Ut(e,n){let t=e?wf(e):void 0,r=n?wf(n):void 0;if(!t||!r||t.length!=r.length)return!1;let o;for(let i=0;i<t.length;i++)if(o=t[i],!Zy(e[o],n[o]))return!1;return!0}function wf(e){return[...Object.keys(e),...Object.getOwnPropertySymbols(e)]}function Zy(e,n){if(Array.isArray(e)&&Array.isArray(n)){if(e.length!==n.length)return!1;let t=[...e].sort(),r=[...n].sort();return t.every((o,i)=>r[i]===o)}else return e===n}function Qy(e){return e.length>0?e[e.length-1]:null}function fn(e){return Rl(e)?e:go(e)?ne(Promise.resolve(e)):T(e)}var lT={exact:Ky,subset:Jy},Yy={exact:uT,subset:dT,ignored:()=>!0};function zy(e,n,t){return lT[t.paths](e.root,n.root,t.matrixParams)&&Yy[t.queryParams](e.queryParams,n.queryParams)&&!(t.fragment==="exact"&&e.fragment!==n.fragment)}function uT(e,n){return Ut(e,n)}function Ky(e,n,t){if(!Dr(e.segments,n.segments)||!bc(e.segments,n.segments,t)||e.numberOfChildren!==n.numberOfChildren)return!1;for(let r in n.children)if(!e.children[r]||!Ky(e.children[r],n.children[r],t))return!1;return!0}function dT(e,n){return Object.keys(n).length<=Object.keys(e).length&&Object.keys(n).every(t=>Zy(e[t],n[t]))}function Jy(e,n,t){return Xy(e,n,n.segments,t)}function Xy(e,n,t,r){if(e.segments.length>t.length){let o=e.segments.slice(0,t.length);return!(!Dr(o,t)||n.hasChildren()||!bc(o,t,r))}else if(e.segments.length===t.length){if(!Dr(e.segments,t)||!bc(e.segments,t,r))return!1;for(let o in n.children)if(!e.children[o]||!Jy(e.children[o],n.children[o],r))return!1;return!0}else{let o=t.slice(0,e.segments.length),i=t.slice(e.segments.length);return!Dr(e.segments,o)||!bc(e.segments,o,r)||!e.children[O]?!1:Xy(e.children[O],n,i,r)}}function bc(e,n,t){return n.every((r,o)=>Yy[t](e[o].parameters,r.parameters))}var qt=class{root;queryParams;fragment;_queryParamMap;constructor(n=new W([],{}),t={},r=null){this.root=n,this.queryParams=t,this.fragment=r}get queryParamMap(){return this._queryParamMap??=wr(this.queryParams),this._queryParamMap}toString(){return mT.serialize(this)}},W=class{segments;children;parent=null;constructor(n,t){this.segments=n,this.children=t,Object.values(t).forEach(r=>r.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Ec(this)}},Vn=class{path;parameters;_parameterMap;constructor(n,t){this.path=n,this.parameters=t}get parameterMap(){return this._parameterMap??=wr(this.parameters),this._parameterMap}toString(){return tb(this)}};function pT(e,n){return Dr(e,n)&&e.every((t,r)=>Ut(t.parameters,n[r].parameters))}function Dr(e,n){return e.length!==n.length?!1:e.every((t,r)=>t.path===n[r].path)}function fT(e,n){let t=[];return Object.entries(e.children).forEach(([r,o])=>{r===O&&(t=t.concat(n(o,r)))}),Object.entries(e.children).forEach(([r,o])=>{r!==O&&(t=t.concat(n(o,r)))}),t}var Tr=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:()=>new Un,providedIn:"root"})}return e})(),Un=class{parse(n){let t=new Mf(n);return new qt(t.parseRootSegment(),t.parseQueryParams(),t.parseFragment())}serialize(n){let t=`/${Li(n.root,!0)}`,r=vT(n.queryParams),o=typeof n.fragment=="string"?`#${hT(n.fragment)}`:"";return`${t}${r}${o}`}},mT=new Un;function Ec(e){return e.segments.map(n=>tb(n)).join("/")}function Li(e,n){if(!e.hasChildren())return Ec(e);if(n){let t=e.children[O]?Li(e.children[O],!1):"",r=[];return Object.entries(e.children).forEach(([o,i])=>{o!==O&&r.push(`${o}:${Li(i,!1)}`)}),r.length>0?`${t}(${r.join("//")})`:t}else{let t=fT(e,(r,o)=>o===O?[Li(e.children[O],!1)]:[`${o}:${Li(r,!1)}`]);return Object.keys(e.children).length===1&&e.children[O]!=null?`${Ec(e)}/${t[0]}`:`${Ec(e)}/(${t.join("//")})`}}function eb(e){return encodeURIComponent(e).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function vc(e){return eb(e).replace(/%3B/gi,";")}function hT(e){return encodeURI(e)}function Tf(e){return eb(e).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Cc(e){return decodeURIComponent(e)}function Vy(e){return Cc(e.replace(/\+/g,"%20"))}function tb(e){return`${Tf(e.path)}${gT(e.parameters)}`}function gT(e){return Object.entries(e).map(([n,t])=>`;${Tf(n)}=${Tf(t)}`).join("")}function vT(e){let n=Object.entries(e).map(([t,r])=>Array.isArray(r)?r.map(o=>`${vc(t)}=${vc(o)}`).join("&"):`${vc(t)}=${vc(r)}`).filter(t=>t);return n.length?`?${n.join("&")}`:""}var yT=/^[^\/()?;#]+/;function Ef(e){let n=e.match(yT);return n?n[0]:""}var bT=/^[^\/()?;=#]+/;function ET(e){let n=e.match(bT);return n?n[0]:""}var CT=/^[^=?&#]+/;function _T(e){let n=e.match(CT);return n?n[0]:""}var DT=/^[^&#]+/;function IT(e){let n=e.match(DT);return n?n[0]:""}var Mf=class{url;remaining;constructor(n){this.url=n,this.remaining=n}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new W([],{}):new W([],this.parseChildren())}parseQueryParams(){let n={};if(this.consumeOptional("?"))do this.parseQueryParam(n);while(this.consumeOptional("&"));return n}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(){if(this.remaining==="")return{};this.consumeOptional("/");let n=[];for(this.peekStartsWith("(")||n.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),n.push(this.parseSegment());let t={};this.peekStartsWith("/(")&&(this.capture("/"),t=this.parseParens(!0));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1)),(n.length>0||Object.keys(t).length>0)&&(r[O]=new W(n,t)),r}parseSegment(){let n=Ef(this.remaining);if(n===""&&this.peekStartsWith(";"))throw new b(4009,!1);return this.capture(n),new Vn(Cc(n),this.parseMatrixParams())}parseMatrixParams(){let n={};for(;this.consumeOptional(";");)this.parseParam(n);return n}parseParam(n){let t=ET(this.remaining);if(!t)return;this.capture(t);let r="";if(this.consumeOptional("=")){let o=Ef(this.remaining);o&&(r=o,this.capture(r))}n[Cc(t)]=Cc(r)}parseQueryParam(n){let t=_T(this.remaining);if(!t)return;this.capture(t);let r="";if(this.consumeOptional("=")){let a=IT(this.remaining);a&&(r=a,this.capture(r))}let o=Vy(t),i=Vy(r);if(n.hasOwnProperty(o)){let a=n[o];Array.isArray(a)||(a=[a],n[o]=a),a.push(i)}else n[o]=i}parseParens(n){let t={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=Ef(this.remaining),o=this.remaining[r.length];if(o!=="/"&&o!==")"&&o!==";")throw new b(4010,!1);let i;r.indexOf(":")>-1?(i=r.slice(0,r.indexOf(":")),this.capture(i),this.capture(":")):n&&(i=O);let a=this.parseChildren();t[i]=Object.keys(a).length===1?a[O]:new W([],a),this.consumeOptional("//")}return t}peekStartsWith(n){return this.remaining.startsWith(n)}consumeOptional(n){return this.peekStartsWith(n)?(this.remaining=this.remaining.substring(n.length),!0):!1}capture(n){if(!this.consumeOptional(n))throw new b(4011,!1)}};function nb(e){return e.segments.length>0?new W([],{[O]:e}):e}function rb(e){let n={};for(let[r,o]of Object.entries(e.children)){let i=rb(o);if(r===O&&i.segments.length===0&&i.hasChildren())for(let[a,s]of Object.entries(i.children))n[a]=s;else(i.segments.length>0||i.hasChildren())&&(n[r]=i)}let t=new W(e.segments,n);return wT(t)}function wT(e){if(e.numberOfChildren===1&&e.children[O]){let n=e.children[O];return new W(e.segments.concat(n.segments),n.children)}return e}function Hn(e){return e instanceof qt}function ob(e,n,t=null,r=null){let o=ib(e);return ab(o,n,t,r)}function ib(e){let n;function t(i){let a={};for(let c of i.children){let l=t(c);a[c.outlet]=l}let s=new W(i.url,a);return i===e&&(n=s),s}let r=t(e.root),o=nb(r);return n??o}function ab(e,n,t,r){let o=e;for(;o.parent;)o=o.parent;if(n.length===0)return Cf(o,o,o,t,r);let i=TT(n);if(i.toRoot())return Cf(o,o,new W([],{}),t,r);let a=MT(i,o,e),s=a.processChildren?Bi(a.segmentGroup,a.index,i.commands):cb(a.segmentGroup,a.index,i.commands);return Cf(o,a.segmentGroup,s,t,r)}function _c(e){return typeof e=="object"&&e!=null&&!e.outlets&&!e.segmentPath}function Vi(e){return typeof e=="object"&&e!=null&&e.outlets}function Cf(e,n,t,r,o){let i={};r&&Object.entries(r).forEach(([c,l])=>{i[c]=Array.isArray(l)?l.map(u=>`${u}`):`${l}`});let a;e===n?a=t:a=sb(e,n,t);let s=nb(rb(a));return new qt(s,i,o)}function sb(e,n,t){let r={};return Object.entries(e.children).forEach(([o,i])=>{i===n?r[o]=t:r[o]=sb(i,n,t)}),new W(e.segments,r)}var Dc=class{isAbsolute;numberOfDoubleDots;commands;constructor(n,t,r){if(this.isAbsolute=n,this.numberOfDoubleDots=t,this.commands=r,n&&r.length>0&&_c(r[0]))throw new b(4003,!1);let o=r.find(Vi);if(o&&o!==Qy(r))throw new b(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function TT(e){if(typeof e[0]=="string"&&e.length===1&&e[0]==="/")return new Dc(!0,0,e);let n=0,t=!1,r=e.reduce((o,i,a)=>{if(typeof i=="object"&&i!=null){if(i.outlets){let s={};return Object.entries(i.outlets).forEach(([c,l])=>{s[c]=typeof l=="string"?l.split("/"):l}),[...o,{outlets:s}]}if(i.segmentPath)return[...o,i.segmentPath]}return typeof i!="string"?[...o,i]:a===0?(i.split("/").forEach((s,c)=>{c==0&&s==="."||(c==0&&s===""?t=!0:s===".."?n++:s!=""&&o.push(s))}),o):[...o,i]},[]);return new Dc(t,n,r)}var Io=class{segmentGroup;processChildren;index;constructor(n,t,r){this.segmentGroup=n,this.processChildren=t,this.index=r}};function MT(e,n,t){if(e.isAbsolute)return new Io(n,!0,0);if(!t)return new Io(n,!1,NaN);if(t.parent===null)return new Io(t,!0,0);let r=_c(e.commands[0])?0:1,o=t.segments.length-1+r;return ST(t,o,e.numberOfDoubleDots)}function ST(e,n,t){let r=e,o=n,i=t;for(;i>o;){if(i-=o,r=r.parent,!r)throw new b(4005,!1);o=r.segments.length}return new Io(r,!1,o-i)}function AT(e){return Vi(e[0])?e[0].outlets:{[O]:e}}function cb(e,n,t){if(e??=new W([],{}),e.segments.length===0&&e.hasChildren())return Bi(e,n,t);let r=xT(e,n,t),o=t.slice(r.commandIndex);if(r.match&&r.pathIndex<e.segments.length){let i=new W(e.segments.slice(0,r.pathIndex),{});return i.children[O]=new W(e.segments.slice(r.pathIndex),e.children),Bi(i,0,o)}else return r.match&&o.length===0?new W(e.segments,{}):r.match&&!e.hasChildren()?Sf(e,n,t):r.match?Bi(e,0,o):Sf(e,n,t)}function Bi(e,n,t){if(t.length===0)return new W(e.segments,{});{let r=AT(t),o={};if(Object.keys(r).some(i=>i!==O)&&e.children[O]&&e.numberOfChildren===1&&e.children[O].segments.length===0){let i=Bi(e.children[O],n,t);return new W(e.segments,i.children)}return Object.entries(r).forEach(([i,a])=>{typeof a=="string"&&(a=[a]),a!==null&&(o[i]=cb(e.children[i],n,a))}),Object.entries(e.children).forEach(([i,a])=>{r[i]===void 0&&(o[i]=a)}),new W(e.segments,o)}}function xT(e,n,t){let r=0,o=n,i={match:!1,pathIndex:0,commandIndex:0};for(;o<e.segments.length;){if(r>=t.length)return i;let a=e.segments[o],s=t[r];if(Vi(s))break;let c=`${s}`,l=r<t.length-1?t[r+1]:null;if(o>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!Hy(c,l,a))return i;r+=2}else{if(!Hy(c,{},a))return i;r++}o++}return{match:!0,pathIndex:o,commandIndex:r}}function Sf(e,n,t){let r=e.segments.slice(0,n),o=0;for(;o<t.length;){let i=t[o];if(Vi(i)){let c=RT(i.outlets);return new W(r,c)}if(o===0&&_c(t[0])){let c=e.segments[n];r.push(new Vn(c.path,Uy(t[0]))),o++;continue}let a=Vi(i)?i.outlets[O]:`${i}`,s=o<t.length-1?t[o+1]:null;a&&s&&_c(s)?(r.push(new Vn(a,Uy(s))),o+=2):(r.push(new Vn(a,{})),o++)}return new W(r,{})}function RT(e){let n={};return Object.entries(e).forEach(([t,r])=>{typeof r=="string"&&(r=[r]),r!==null&&(n[t]=Sf(new W([],{}),0,r))}),n}function Uy(e){let n={};return Object.entries(e).forEach(([t,r])=>n[t]=`${r}`),n}function Hy(e,n,t){return e==t.path&&Ut(n,t.parameters)}var wo="imperative",ye=(function(e){return e[e.NavigationStart=0]="NavigationStart",e[e.NavigationEnd=1]="NavigationEnd",e[e.NavigationCancel=2]="NavigationCancel",e[e.NavigationError=3]="NavigationError",e[e.RoutesRecognized=4]="RoutesRecognized",e[e.ResolveStart=5]="ResolveStart",e[e.ResolveEnd=6]="ResolveEnd",e[e.GuardsCheckStart=7]="GuardsCheckStart",e[e.GuardsCheckEnd=8]="GuardsCheckEnd",e[e.RouteConfigLoadStart=9]="RouteConfigLoadStart",e[e.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",e[e.ChildActivationStart=11]="ChildActivationStart",e[e.ChildActivationEnd=12]="ChildActivationEnd",e[e.ActivationStart=13]="ActivationStart",e[e.ActivationEnd=14]="ActivationEnd",e[e.Scroll=15]="Scroll",e[e.NavigationSkipped=16]="NavigationSkipped",e})(ye||{}),Qe=class{id;url;constructor(n,t){this.id=n,this.url=t}},qn=class extends Qe{type=ye.NavigationStart;navigationTrigger;restoredState;constructor(n,t,r="imperative",o=null){super(n,t),this.navigationTrigger=r,this.restoredState=o}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},rt=class extends Qe{urlAfterRedirects;type=ye.NavigationEnd;constructor(n,t,r){super(n,t),this.urlAfterRedirects=r}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},ze=(function(e){return e[e.Redirect=0]="Redirect",e[e.SupersededByNewNavigation=1]="SupersededByNewNavigation",e[e.NoDataFromResolver=2]="NoDataFromResolver",e[e.GuardRejected=3]="GuardRejected",e[e.Aborted=4]="Aborted",e})(ze||{}),Mo=(function(e){return e[e.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",e[e.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",e})(Mo||{}),Ht=class extends Qe{reason;code;type=ye.NavigationCancel;constructor(n,t,r,o){super(n,t),this.reason=r,this.code=o}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}},$t=class extends Qe{reason;code;type=ye.NavigationSkipped;constructor(n,t,r,o){super(n,t),this.reason=r,this.code=o}},So=class extends Qe{error;target;type=ye.NavigationError;constructor(n,t,r,o){super(n,t),this.error=r,this.target=o}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Ui=class extends Qe{urlAfterRedirects;state;type=ye.RoutesRecognized;constructor(n,t,r,o){super(n,t),this.urlAfterRedirects=r,this.state=o}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Ic=class extends Qe{urlAfterRedirects;state;type=ye.GuardsCheckStart;constructor(n,t,r,o){super(n,t),this.urlAfterRedirects=r,this.state=o}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},wc=class extends Qe{urlAfterRedirects;state;shouldActivate;type=ye.GuardsCheckEnd;constructor(n,t,r,o,i){super(n,t),this.urlAfterRedirects=r,this.state=o,this.shouldActivate=i}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Tc=class extends Qe{urlAfterRedirects;state;type=ye.ResolveStart;constructor(n,t,r,o){super(n,t),this.urlAfterRedirects=r,this.state=o}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Mc=class extends Qe{urlAfterRedirects;state;type=ye.ResolveEnd;constructor(n,t,r,o){super(n,t),this.urlAfterRedirects=r,this.state=o}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Sc=class{route;type=ye.RouteConfigLoadStart;constructor(n){this.route=n}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Ac=class{route;type=ye.RouteConfigLoadEnd;constructor(n){this.route=n}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},xc=class{snapshot;type=ye.ChildActivationStart;constructor(n){this.snapshot=n}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Rc=class{snapshot;type=ye.ChildActivationEnd;constructor(n){this.snapshot=n}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Nc=class{snapshot;type=ye.ActivationStart;constructor(n){this.snapshot=n}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Pc=class{snapshot;type=ye.ActivationEnd;constructor(n){this.snapshot=n}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Ao=class{routerEvent;position;anchor;type=ye.Scroll;constructor(n,t,r){this.routerEvent=n,this.position=t,this.anchor=r}toString(){let n=this.position?`${this.position[0]}, ${this.position[1]}`:null;return`Scroll(anchor: '${this.anchor}', position: '${n}')`}},Hi=class{},xo=class{url;navigationBehaviorOptions;constructor(n,t){this.url=n,this.navigationBehaviorOptions=t}};function NT(e){return!(e instanceof Hi)&&!(e instanceof xo)}function PT(e,n){return e.providers&&!e._injector&&(e._injector=mo(e.providers,n,`Route: ${e.path}`)),e._injector??n}function It(e){return e.outlet||O}function OT(e,n){let t=e.filter(r=>It(r)===n);return t.push(...e.filter(r=>It(r)!==n)),t}function Po(e){if(!e)return null;if(e.routeConfig?._injector)return e.routeConfig._injector;for(let n=e.parent;n;n=n.parent){let t=n.routeConfig;if(t?._loadedInjector)return t._loadedInjector;if(t?._injector)return t._injector}return null}var Oc=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return Po(this.route?.snapshot)??this.rootInjector}constructor(n){this.rootInjector=n,this.children=new Mr(this.rootInjector)}},Mr=(()=>{class e{rootInjector;contexts=new Map;constructor(t){this.rootInjector=t}onChildOutletCreated(t,r){let o=this.getOrCreateContext(t);o.outlet=r,this.contexts.set(t,o)}onChildOutletDestroyed(t){let r=this.getContext(t);r&&(r.outlet=null,r.attachRef=null)}onOutletDeactivated(){let t=this.contexts;return this.contexts=new Map,t}onOutletReAttached(t){this.contexts=t}getOrCreateContext(t){let r=this.getContext(t);return r||(r=new Oc(this.rootInjector),this.contexts.set(t,r)),r}getContext(t){return this.contexts.get(t)||null}static \u0275fac=function(r){return new(r||e)(I(ie))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Fc=class{_root;constructor(n){this._root=n}get root(){return this._root.value}parent(n){let t=this.pathFromRoot(n);return t.length>1?t[t.length-2]:null}children(n){let t=Af(n,this._root);return t?t.children.map(r=>r.value):[]}firstChild(n){let t=Af(n,this._root);return t&&t.children.length>0?t.children[0].value:null}siblings(n){let t=xf(n,this._root);return t.length<2?[]:t[t.length-2].children.map(o=>o.value).filter(o=>o!==n)}pathFromRoot(n){return xf(n,this._root).map(t=>t.value)}};function Af(e,n){if(e===n.value)return n;for(let t of n.children){let r=Af(e,t);if(r)return r}return null}function xf(e,n){if(e===n.value)return[n];for(let t of n.children){let r=xf(e,t);if(r.length)return r.unshift(n),r}return[]}var Ze=class{value;children;constructor(n,t){this.value=n,this.children=t}toString(){return`TreeNode(${this.value})`}};function Do(e){let n={};return e&&e.children.forEach(t=>n[t.value.outlet]=t),n}var qi=class extends Fc{snapshot;constructor(n,t){super(n),this.snapshot=t,jf(this,n)}toString(){return this.snapshot.toString()}};function lb(e){let n=FT(e),t=new ve([new Vn("",{})]),r=new ve({}),o=new ve({}),i=new ve({}),a=new ve(""),s=new ot(t,r,i,a,o,O,e,n.root);return s.snapshot=n.root,new qi(new Ze(s,[]),n)}function FT(e){let n={},t={},r={},i=new Ir([],n,r,"",t,O,e,null,{});return new $i("",new Ze(i,[]))}var ot=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(n,t,r,o,i,a,s,c){this.urlSubject=n,this.paramsSubject=t,this.queryParamsSubject=r,this.fragmentSubject=o,this.dataSubject=i,this.outlet=a,this.component=s,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(A(l=>l[Qi]))??T(void 0),this.url=n,this.params=t,this.queryParams=r,this.fragment=o,this.data=i}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(A(n=>wr(n))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(A(n=>wr(n))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function kc(e,n,t="emptyOnly"){let r,{routeConfig:o}=e;return n!==null&&(t==="always"||o?.path===""||!n.component&&!n.routeConfig?.loadComponent)?r={params:y(y({},n.params),e.params),data:y(y({},n.data),e.data),resolve:y(y(y(y({},e.data),n.data),o?.data),e._resolvedData)}:r={params:y({},e.params),data:y({},e.data),resolve:y(y({},e.data),e._resolvedData??{})},o&&db(o)&&(r.resolve[Qi]=o.title),r}var Ir=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;get title(){return this.data?.[Qi]}constructor(n,t,r,o,i,a,s,c,l){this.url=n,this.params=t,this.queryParams=r,this.fragment=o,this.data=i,this.outlet=a,this.component=s,this.routeConfig=c,this._resolve=l}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=wr(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=wr(this.queryParams),this._queryParamMap}toString(){let n=this.url.map(r=>r.toString()).join("/"),t=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${n}', path:'${t}')`}},$i=class extends Fc{url;constructor(n,t){super(t),this.url=n,jf(this,t)}toString(){return ub(this._root)}};function jf(e,n){n.value._routerState=e,n.children.forEach(t=>jf(e,t))}function ub(e){let n=e.children.length>0?` { ${e.children.map(ub).join(", ")} } `:"";return`${e.value}${n}`}function _f(e){if(e.snapshot){let n=e.snapshot,t=e._futureSnapshot;e.snapshot=t,Ut(n.queryParams,t.queryParams)||e.queryParamsSubject.next(t.queryParams),n.fragment!==t.fragment&&e.fragmentSubject.next(t.fragment),Ut(n.params,t.params)||e.paramsSubject.next(t.params),cT(n.url,t.url)||e.urlSubject.next(t.url),Ut(n.data,t.data)||e.dataSubject.next(t.data)}else e.snapshot=e._futureSnapshot,e.dataSubject.next(e._futureSnapshot.data)}function Rf(e,n){let t=Ut(e.params,n.params)&&pT(e.url,n.url),r=!e.parent!=!n.parent;return t&&!r&&(!e.parent||Rf(e.parent,n.parent))}function db(e){return typeof e.title=="string"||e.title===null}var pb=new E(""),Yi=(()=>{class e{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=O;activateEvents=new K;deactivateEvents=new K;attachEvents=new K;detachEvents=new K;routerOutletData=uy(void 0);parentContexts=p(Mr);location=p(Ge);changeDetector=p(un);inputBinder=p(Ki,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(t){if(t.name){let{firstChange:r,previousValue:o}=t.name;if(r)return;this.isTrackedInParentContexts(o)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(o)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(t){return this.parentContexts.getContext(t)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let t=this.parentContexts.getContext(this.name);t?.route&&(t.attachRef?this.attach(t.attachRef,t.route):this.activateWith(t.route,t.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new b(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new b(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new b(4012,!1);this.location.detach();let t=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(t.instance),t}attach(t,r){this.activated=t,this._activatedRoute=r,this.location.insert(t.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(t.instance)}deactivate(){if(this.activated){let t=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(t)}}activateWith(t,r){if(this.isActivated)throw new b(4013,!1);this._activatedRoute=t;let o=this.location,a=t.snapshot.component,s=this.parentContexts.getOrCreateContext(this.name).children,c=new Nf(t,s,o.injector,this.routerOutletData);this.activated=o.createComponent(a,{index:o.length,injector:c,environmentInjector:r}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(r){return new(r||e)};static \u0275dir=fe({type:e,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[yt]})}return e})(),Nf=class{route;childContexts;parent;outletData;constructor(n,t,r,o){this.route=n,this.childContexts=t,this.parent=r,this.outletData=o}get(n,t){return n===ot?this.route:n===Mr?this.childContexts:n===pb?this.outletData:this.parent.get(n,t)}},Ki=new E(""),Bf=(()=>{class e{outletDataSubscriptions=new Map;bindActivatedRouteToOutletComponent(t){this.unsubscribeFromRouteData(t),this.subscribeToRouteData(t)}unsubscribeFromRouteData(t){this.outletDataSubscriptions.get(t)?.unsubscribe(),this.outletDataSubscriptions.delete(t)}subscribeToRouteData(t){let{activatedRoute:r}=t,o=Jn([r.queryParams,r.params,r.data]).pipe(Ae(([i,a,s],c)=>(s=y(y(y({},i),a),s),c===0?T(s):Promise.resolve(s)))).subscribe(i=>{if(!t.isActivated||!t.activatedComponentRef||t.activatedRoute!==r||r.component===null){this.unsubscribeFromRouteData(t);return}let a=fy(r.component);if(!a){this.unsubscribeFromRouteData(t);return}for(let{templateName:s}of a.inputs)t.activatedComponentRef.setInput(s,i[s])});this.outletDataSubscriptions.set(t,o)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),zf=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=ue({type:e,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(r,o){r&1&&ge(0,"router-outlet")},dependencies:[Yi],encapsulation:2})}return e})();function Vf(e){let n=e.children&&e.children.map(Vf),t=n?$(y({},e),{children:n}):y({},e);return!t.component&&!t.loadComponent&&(n||t.loadChildren)&&t.outlet&&t.outlet!==O&&(t.component=zf),t}function kT(e,n,t){let r=Gi(e,n._root,t?t._root:void 0);return new qi(r,n)}function Gi(e,n,t){if(t&&e.shouldReuseRoute(n.value,t.value.snapshot)){let r=t.value;r._futureSnapshot=n.value;let o=LT(e,n,t);return new Ze(r,o)}else{if(e.shouldAttach(n.value)){let i=e.retrieve(n.value);if(i!==null){let a=i.route;return a.value._futureSnapshot=n.value,a.children=n.children.map(s=>Gi(e,s)),a}}let r=jT(n.value),o=n.children.map(i=>Gi(e,i));return new Ze(r,o)}}function LT(e,n,t){return n.children.map(r=>{for(let o of t.children)if(e.shouldReuseRoute(r.value,o.value.snapshot))return Gi(e,r,o);return Gi(e,r)})}function jT(e){return new ot(new ve(e.url),new ve(e.params),new ve(e.queryParams),new ve(e.fragment),new ve(e.data),e.outlet,e.component,e)}var Ro=class{redirectTo;navigationBehaviorOptions;constructor(n,t){this.redirectTo=n,this.navigationBehaviorOptions=t}},fb="ngNavigationCancelingError";function Lc(e,n){let{redirectTo:t,navigationBehaviorOptions:r}=Hn(n)?{redirectTo:n,navigationBehaviorOptions:void 0}:n,o=mb(!1,ze.Redirect);return o.url=t,o.navigationBehaviorOptions=r,o}function mb(e,n){let t=new Error(`NavigationCancelingError: ${e||""}`);return t[fb]=!0,t.cancellationCode=n,t}function BT(e){return hb(e)&&Hn(e.url)}function hb(e){return!!e&&e[fb]}var zT=(e,n,t,r)=>A(o=>(new Pf(n,o.targetRouterState,o.currentRouterState,t,r).activate(e),o)),Pf=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(n,t,r,o,i){this.routeReuseStrategy=n,this.futureState=t,this.currState=r,this.forwardEvent=o,this.inputBindingEnabled=i}activate(n){let t=this.futureState._root,r=this.currState?this.currState._root:null;this.deactivateChildRoutes(t,r,n),_f(this.futureState.root),this.activateChildRoutes(t,r,n)}deactivateChildRoutes(n,t,r){let o=Do(t);n.children.forEach(i=>{let a=i.value.outlet;this.deactivateRoutes(i,o[a],r),delete o[a]}),Object.values(o).forEach(i=>{this.deactivateRouteAndItsChildren(i,r)})}deactivateRoutes(n,t,r){let o=n.value,i=t?t.value:null;if(o===i)if(o.component){let a=r.getContext(o.outlet);a&&this.deactivateChildRoutes(n,t,a.children)}else this.deactivateChildRoutes(n,t,r);else i&&this.deactivateRouteAndItsChildren(t,r)}deactivateRouteAndItsChildren(n,t){n.value.component&&this.routeReuseStrategy.shouldDetach(n.value.snapshot)?this.detachAndStoreRouteSubtree(n,t):this.deactivateRouteAndOutlet(n,t)}detachAndStoreRouteSubtree(n,t){let r=t.getContext(n.value.outlet),o=r&&n.value.component?r.children:t,i=Do(n);for(let a of Object.values(i))this.deactivateRouteAndItsChildren(a,o);if(r&&r.outlet){let a=r.outlet.detach(),s=r.children.onOutletDeactivated();this.routeReuseStrategy.store(n.value.snapshot,{componentRef:a,route:n,contexts:s})}}deactivateRouteAndOutlet(n,t){let r=t.getContext(n.value.outlet),o=r&&n.value.component?r.children:t,i=Do(n);for(let a of Object.values(i))this.deactivateRouteAndItsChildren(a,o);r&&(r.outlet&&(r.outlet.deactivate(),r.children.onOutletDeactivated()),r.attachRef=null,r.route=null)}activateChildRoutes(n,t,r){let o=Do(t);n.children.forEach(i=>{this.activateRoutes(i,o[i.value.outlet],r),this.forwardEvent(new Pc(i.value.snapshot))}),n.children.length&&this.forwardEvent(new Rc(n.value.snapshot))}activateRoutes(n,t,r){let o=n.value,i=t?t.value:null;if(_f(o),o===i)if(o.component){let a=r.getOrCreateContext(o.outlet);this.activateChildRoutes(n,t,a.children)}else this.activateChildRoutes(n,t,r);else if(o.component){let a=r.getOrCreateContext(o.outlet);if(this.routeReuseStrategy.shouldAttach(o.snapshot)){let s=this.routeReuseStrategy.retrieve(o.snapshot);this.routeReuseStrategy.store(o.snapshot,null),a.children.onOutletReAttached(s.contexts),a.attachRef=s.componentRef,a.route=s.route.value,a.outlet&&a.outlet.attach(s.componentRef,s.route.value),_f(s.route.value),this.activateChildRoutes(n,null,a.children)}else a.attachRef=null,a.route=o,a.outlet&&a.outlet.activateWith(o,a.injector),this.activateChildRoutes(n,null,a.children)}else this.activateChildRoutes(n,null,r)}},jc=class{path;route;constructor(n){this.path=n,this.route=this.path[this.path.length-1]}},To=class{component;route;constructor(n,t){this.component=n,this.route=t}};function VT(e,n,t){let r=e._root,o=n?n._root:null;return ji(r,o,t,[r.value])}function UT(e){let n=e.routeConfig?e.routeConfig.canActivateChild:null;return!n||n.length===0?null:{node:e,guards:n}}function Oo(e,n){let t=Symbol(),r=n.get(e,t);return r===t?typeof e=="function"&&!Kl(e)?e:n.get(e):r}function ji(e,n,t,r,o={canDeactivateChecks:[],canActivateChecks:[]}){let i=Do(n);return e.children.forEach(a=>{HT(a,i[a.value.outlet],t,r.concat([a.value]),o),delete i[a.value.outlet]}),Object.entries(i).forEach(([a,s])=>zi(s,t.getContext(a),o)),o}function HT(e,n,t,r,o={canDeactivateChecks:[],canActivateChecks:[]}){let i=e.value,a=n?n.value:null,s=t?t.getContext(e.value.outlet):null;if(a&&i.routeConfig===a.routeConfig){let c=qT(a,i,i.routeConfig.runGuardsAndResolvers);c?o.canActivateChecks.push(new jc(r)):(i.data=a.data,i._resolvedData=a._resolvedData),i.component?ji(e,n,s?s.children:null,r,o):ji(e,n,t,r,o),c&&s&&s.outlet&&s.outlet.isActivated&&o.canDeactivateChecks.push(new To(s.outlet.component,a))}else a&&zi(n,s,o),o.canActivateChecks.push(new jc(r)),i.component?ji(e,null,s?s.children:null,r,o):ji(e,null,t,r,o);return o}function qT(e,n,t){if(typeof t=="function")return t(e,n);switch(t){case"pathParamsChange":return!Dr(e.url,n.url);case"pathParamsOrQueryParamsChange":return!Dr(e.url,n.url)||!Ut(e.queryParams,n.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Rf(e,n)||!Ut(e.queryParams,n.queryParams);case"paramsChange":default:return!Rf(e,n)}}function zi(e,n,t){let r=Do(e),o=e.value;Object.entries(r).forEach(([i,a])=>{o.component?n?zi(a,n.children.getContext(i),t):zi(a,null,t):zi(a,n,t)}),o.component?n&&n.outlet&&n.outlet.isActivated?t.canDeactivateChecks.push(new To(n.outlet.component,o)):t.canDeactivateChecks.push(new To(null,o)):t.canDeactivateChecks.push(new To(null,o))}function Ji(e){return typeof e=="function"}function $T(e){return typeof e=="boolean"}function GT(e){return e&&Ji(e.canLoad)}function WT(e){return e&&Ji(e.canActivate)}function ZT(e){return e&&Ji(e.canActivateChild)}function QT(e){return e&&Ji(e.canDeactivate)}function YT(e){return e&&Ji(e.canMatch)}function gb(e){return e instanceof Wt||e?.name==="EmptyError"}var yc=Symbol("INITIAL_VALUE");function No(){return Ae(e=>Jn(e.map(n=>n.pipe(Oe(1),Cn(yc)))).pipe(A(n=>{for(let t of n)if(t!==!0){if(t===yc)return yc;if(t===!1||KT(t))return t}return!0}),te(n=>n!==yc),Oe(1)))}function KT(e){return Hn(e)||e instanceof Ro}function JT(e,n){return de(t=>{let{targetSnapshot:r,currentSnapshot:o,guards:{canActivateChecks:i,canDeactivateChecks:a}}=t;return a.length===0&&i.length===0?T($(y({},t),{guardsResult:!0})):XT(a,r,o,e).pipe(de(s=>s&&$T(s)?eM(r,i,e,n):T(s)),A(s=>$(y({},t),{guardsResult:s})))})}function XT(e,n,t,r){return ne(e).pipe(de(o=>iM(o.component,o.route,t,n,r)),Zt(o=>o!==!0,!0))}function eM(e,n,t,r){return ne(n).pipe(St(o=>yn(nM(o.route.parent,r),tM(o.route,r),oM(e,o.path,t),rM(e,o.route,t))),Zt(o=>o!==!0,!0))}function tM(e,n){return e!==null&&n&&n(new Nc(e)),T(!0)}function nM(e,n){return e!==null&&n&&n(new xc(e)),T(!0)}function rM(e,n,t){let r=n.routeConfig?n.routeConfig.canActivate:null;if(!r||r.length===0)return T(!0);let o=r.map(i=>Ho(()=>{let a=Po(n)??t,s=Oo(i,a),c=WT(s)?s.canActivate(n,e):Ie(a,()=>s(n,e));return fn(c).pipe(Zt())}));return T(o).pipe(No())}function oM(e,n,t){let r=n[n.length-1],i=n.slice(0,n.length-1).reverse().map(a=>UT(a)).filter(a=>a!==null).map(a=>Ho(()=>{let s=a.guards.map(c=>{let l=Po(a.node)??t,u=Oo(c,l),d=ZT(u)?u.canActivateChild(r,e):Ie(l,()=>u(r,e));return fn(d).pipe(Zt())});return T(s).pipe(No())}));return T(i).pipe(No())}function iM(e,n,t,r,o){let i=n&&n.routeConfig?n.routeConfig.canDeactivate:null;if(!i||i.length===0)return T(!0);let a=i.map(s=>{let c=Po(n)??o,l=Oo(s,c),u=QT(l)?l.canDeactivate(e,n,t,r):Ie(c,()=>l(e,n,t,r));return fn(u).pipe(Zt())});return T(a).pipe(No())}function aM(e,n,t,r){let o=n.canLoad;if(o===void 0||o.length===0)return T(!0);let i=o.map(a=>{let s=Oo(a,e),c=GT(s)?s.canLoad(n,t):Ie(e,()=>s(n,t));return fn(c)});return T(i).pipe(No(),vb(r))}function vb(e){return wl(re(n=>{if(typeof n!="boolean")throw Lc(e,n)}),A(n=>n===!0))}function sM(e,n,t,r){let o=n.canMatch;if(!o||o.length===0)return T(!0);let i=o.map(a=>{let s=Oo(a,e),c=YT(s)?s.canMatch(n,t):Ie(e,()=>s(n,t));return fn(c)});return T(i).pipe(No(),vb(r))}var Wi=class{segmentGroup;constructor(n){this.segmentGroup=n||null}},Zi=class extends Error{urlTree;constructor(n){super(),this.urlTree=n}};function _o(e){return gn(new Wi(e))}function cM(e){return gn(new b(4e3,!1))}function lM(e){return gn(mb(!1,ze.GuardRejected))}var Of=class{urlSerializer;urlTree;constructor(n,t){this.urlSerializer=n,this.urlTree=t}lineralizeSegments(n,t){let r=[],o=t.root;for(;;){if(r=r.concat(o.segments),o.numberOfChildren===0)return T(r);if(o.numberOfChildren>1||!o.children[O])return cM(`${n.redirectTo}`);o=o.children[O]}}applyRedirectCommands(n,t,r,o,i){return uM(t,o,i).pipe(A(a=>{if(a instanceof qt)throw new Zi(a);let s=this.applyRedirectCreateUrlTree(a,this.urlSerializer.parse(a),n,r);if(a[0]==="/")throw new Zi(s);return s}))}applyRedirectCreateUrlTree(n,t,r,o){let i=this.createSegmentGroup(n,t.root,r,o);return new qt(i,this.createQueryParams(t.queryParams,this.urlTree.queryParams),t.fragment)}createQueryParams(n,t){let r={};return Object.entries(n).forEach(([o,i])=>{if(typeof i=="string"&&i[0]===":"){let s=i.substring(1);r[o]=t[s]}else r[o]=i}),r}createSegmentGroup(n,t,r,o){let i=this.createSegments(n,t.segments,r,o),a={};return Object.entries(t.children).forEach(([s,c])=>{a[s]=this.createSegmentGroup(n,c,r,o)}),new W(i,a)}createSegments(n,t,r,o){return t.map(i=>i.path[0]===":"?this.findPosParam(n,i,o):this.findOrReturn(i,r))}findPosParam(n,t,r){let o=r[t.path.substring(1)];if(!o)throw new b(4001,!1);return o}findOrReturn(n,t){let r=0;for(let o of t){if(o.path===n.path)return t.splice(r),o;r++}return n}};function uM(e,n,t){if(typeof e=="string")return T(e);let r=e,{queryParams:o,fragment:i,routeConfig:a,url:s,outlet:c,params:l,data:u,title:d}=n;return fn(Ie(t,()=>r({params:l,data:u,queryParams:o,fragment:i,routeConfig:a,url:s,outlet:c,title:d})))}var Ff={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function dM(e,n,t,r,o){let i=yb(e,n,t);return i.matched?(r=PT(n,r),sM(r,n,t,o).pipe(A(a=>a===!0?i:y({},Ff)))):T(i)}function yb(e,n,t){if(n.path==="**")return pM(t);if(n.path==="")return n.pathMatch==="full"&&(e.hasChildren()||t.length>0)?y({},Ff):{matched:!0,consumedSegments:[],remainingSegments:t,parameters:{},positionalParamSegments:{}};let o=(n.matcher||Wy)(t,e,n);if(!o)return y({},Ff);let i={};Object.entries(o.posParams??{}).forEach(([s,c])=>{i[s]=c.path});let a=o.consumed.length>0?y(y({},i),o.consumed[o.consumed.length-1].parameters):i;return{matched:!0,consumedSegments:o.consumed,remainingSegments:t.slice(o.consumed.length),parameters:a,positionalParamSegments:o.posParams??{}}}function pM(e){return{matched:!0,parameters:e.length>0?Qy(e).parameters:{},consumedSegments:e,remainingSegments:[],positionalParamSegments:{}}}function qy(e,n,t,r){return t.length>0&&hM(e,t,r)?{segmentGroup:new W(n,mM(r,new W(t,e.children))),slicedSegments:[]}:t.length===0&&gM(e,t,r)?{segmentGroup:new W(e.segments,fM(e,t,r,e.children)),slicedSegments:t}:{segmentGroup:new W(e.segments,e.children),slicedSegments:t}}function fM(e,n,t,r){let o={};for(let i of t)if(zc(e,n,i)&&!r[It(i)]){let a=new W([],{});o[It(i)]=a}return y(y({},r),o)}function mM(e,n){let t={};t[O]=n;for(let r of e)if(r.path===""&&It(r)!==O){let o=new W([],{});t[It(r)]=o}return t}function hM(e,n,t){return t.some(r=>zc(e,n,r)&&It(r)!==O)}function gM(e,n,t){return t.some(r=>zc(e,n,r))}function zc(e,n,t){return(e.hasChildren()||n.length>0)&&t.pathMatch==="full"?!1:t.path===""}function vM(e,n,t){return n.length===0&&!e.children[t]}var kf=class{};function yM(e,n,t,r,o,i,a="emptyOnly"){return new Lf(e,n,t,r,o,a,i).recognize()}var bM=31,Lf=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(n,t,r,o,i,a,s){this.injector=n,this.configLoader=t,this.rootComponentType=r,this.config=o,this.urlTree=i,this.paramsInheritanceStrategy=a,this.urlSerializer=s,this.applyRedirects=new Of(this.urlSerializer,this.urlTree)}noMatchError(n){return new b(4002,`'${n.segmentGroup}'`)}recognize(){let n=qy(this.urlTree.root,[],[],this.config).segmentGroup;return this.match(n).pipe(A(({children:t,rootSnapshot:r})=>{let o=new Ze(r,t),i=new $i("",o),a=ob(r,[],this.urlTree.queryParams,this.urlTree.fragment);return a.queryParams=this.urlTree.queryParams,i.url=this.urlSerializer.serialize(a),{state:i,tree:a}}))}match(n){let t=new Ir([],Object.freeze({}),Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),O,this.rootComponentType,null,{});return this.processSegmentGroup(this.injector,this.config,n,O,t).pipe(A(r=>({children:r,rootSnapshot:t})),st(r=>{if(r instanceof Zi)return this.urlTree=r.urlTree,this.match(r.urlTree.root);throw r instanceof Wi?this.noMatchError(r):r}))}processSegmentGroup(n,t,r,o,i){return r.segments.length===0&&r.hasChildren()?this.processChildren(n,t,r,i):this.processSegment(n,t,r,r.segments,o,!0,i).pipe(A(a=>a instanceof Ze?[a]:[]))}processChildren(n,t,r,o){let i=[];for(let a of Object.keys(r.children))a==="primary"?i.unshift(a):i.push(a);return ne(i).pipe(St(a=>{let s=r.children[a],c=OT(t,a);return this.processSegmentGroup(n,c,s,a,o)}),kl((a,s)=>(a.push(...s),a)),bn(null),Fl(),de(a=>{if(a===null)return _o(r);let s=bb(a);return EM(s),T(s)}))}processSegment(n,t,r,o,i,a,s){return ne(t).pipe(St(c=>this.processSegmentAgainstRoute(c._injector??n,t,c,r,o,i,a,s).pipe(st(l=>{if(l instanceof Wi)return T(null);throw l}))),Zt(c=>!!c),st(c=>{if(gb(c))return vM(r,o,i)?T(new kf):_o(r);throw c}))}processSegmentAgainstRoute(n,t,r,o,i,a,s,c){return It(r)!==a&&(a===O||!zc(o,i,r))?_o(o):r.redirectTo===void 0?this.matchSegmentAgainstRoute(n,o,r,i,a,c):this.allowRedirects&&s?this.expandSegmentAgainstRouteUsingRedirect(n,o,t,r,i,a,c):_o(o)}expandSegmentAgainstRouteUsingRedirect(n,t,r,o,i,a,s){let{matched:c,parameters:l,consumedSegments:u,positionalParamSegments:d,remainingSegments:m}=yb(t,o,i);if(!c)return _o(t);typeof o.redirectTo=="string"&&o.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>bM&&(this.allowRedirects=!1));let f=new Ir(i,l,Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,$y(o),It(o),o.component??o._loadedComponent??null,o,Gy(o)),g=kc(f,s,this.paramsInheritanceStrategy);return f.params=Object.freeze(g.params),f.data=Object.freeze(g.data),this.applyRedirects.applyRedirectCommands(u,o.redirectTo,d,f,n).pipe(Ae(z=>this.applyRedirects.lineralizeSegments(o,z)),de(z=>this.processSegment(n,r,t,z.concat(m),a,!1,s)))}matchSegmentAgainstRoute(n,t,r,o,i,a){let s=dM(t,r,o,n,this.urlSerializer);return r.path==="**"&&(t.children={}),s.pipe(Ae(c=>c.matched?(n=r._injector??n,this.getChildConfig(n,r,o).pipe(Ae(({routes:l})=>{let u=r._loadedInjector??n,{parameters:d,consumedSegments:m,remainingSegments:f}=c,g=new Ir(m,d,Object.freeze(y({},this.urlTree.queryParams)),this.urlTree.fragment,$y(r),It(r),r.component??r._loadedComponent??null,r,Gy(r)),w=kc(g,a,this.paramsInheritanceStrategy);g.params=Object.freeze(w.params),g.data=Object.freeze(w.data);let{segmentGroup:z,slicedSegments:P}=qy(t,m,f,l);if(P.length===0&&z.hasChildren())return this.processChildren(u,l,z,g).pipe(A(hn=>new Ze(g,hn)));if(l.length===0&&P.length===0)return T(new Ze(g,[]));let wt=It(r)===i;return this.processSegment(u,l,z,P,wt?O:i,!0,g).pipe(A(hn=>new Ze(g,hn instanceof Ze?[hn]:[])))}))):_o(t)))}getChildConfig(n,t,r){return t.children?T({routes:t.children,injector:n}):t.loadChildren?t._loadedRoutes!==void 0?T({routes:t._loadedRoutes,injector:t._loadedInjector}):aM(n,t,r,this.urlSerializer).pipe(de(o=>o?this.configLoader.loadChildren(n,t).pipe(re(i=>{t._loadedRoutes=i.routes,t._loadedInjector=i.injector})):lM(t))):T({routes:[],injector:n})}};function EM(e){e.sort((n,t)=>n.value.outlet===O?-1:t.value.outlet===O?1:n.value.outlet.localeCompare(t.value.outlet))}function CM(e){let n=e.value.routeConfig;return n&&n.path===""}function bb(e){let n=[],t=new Set;for(let r of e){if(!CM(r)){n.push(r);continue}let o=n.find(i=>r.value.routeConfig===i.value.routeConfig);o!==void 0?(o.children.push(...r.children),t.add(o)):n.push(r)}for(let r of t){let o=bb(r.children);n.push(new Ze(r.value,o))}return n.filter(r=>!t.has(r))}function $y(e){return e.data||{}}function Gy(e){return e.resolve||{}}function _M(e,n,t,r,o,i){return de(a=>yM(e,n,t,r,a.extractedUrl,o,i).pipe(A(({state:s,tree:c})=>$(y({},a),{targetSnapshot:s,urlAfterRedirects:c}))))}function DM(e,n){return de(t=>{let{targetSnapshot:r,guards:{canActivateChecks:o}}=t;if(!o.length)return T(t);let i=new Set(o.map(c=>c.route)),a=new Set;for(let c of i)if(!a.has(c))for(let l of Eb(c))a.add(l);let s=0;return ne(a).pipe(St(c=>i.has(c)?IM(c,r,e,n):(c.data=kc(c,c.parent,e).resolve,T(void 0))),re(()=>s++),Gr(1),de(c=>s===a.size?T(t):be))})}function Eb(e){let n=e.children.map(t=>Eb(t)).flat();return[e,...n]}function IM(e,n,t,r){let o=e.routeConfig,i=e._resolve;return o?.title!==void 0&&!db(o)&&(i[Qi]=o.title),Ho(()=>(e.data=kc(e,e.parent,t).resolve,wM(i,e,n,r).pipe(A(a=>(e._resolvedData=a,e.data=y(y({},e.data),a),null)))))}function wM(e,n,t,r){let o=wf(e);if(o.length===0)return T({});let i={};return ne(o).pipe(de(a=>TM(e[a],n,t,r).pipe(Zt(),re(s=>{if(s instanceof Ro)throw Lc(new Un,s);i[a]=s}))),Gr(1),A(()=>i),st(a=>gb(a)?be:gn(a)))}function TM(e,n,t,r){let o=Po(n)??r,i=Oo(e,o),a=i.resolve?i.resolve(n,t):Ie(o,()=>i(n,t));return fn(a)}function Df(e){return Ae(n=>{let t=e(n);return t?ne(t).pipe(A(()=>n)):T(n)})}var Uf=(()=>{class e{buildTitle(t){let r,o=t.root;for(;o!==void 0;)r=this.getResolvedTitleForRoute(o)??r,o=o.children.find(i=>i.outlet===O);return r}getResolvedTitleForRoute(t){return t.data[Qi]}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:()=>p(Cb),providedIn:"root"})}return e})(),Cb=(()=>{class e extends Uf{title;constructor(t){super(),this.title=t}updateTitle(t){let r=this.buildTitle(t);r!==void 0&&this.title.setTitle(r)}static \u0275fac=function(r){return new(r||e)(I(Ly))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),$n=new E("",{providedIn:"root",factory:()=>({})}),Sr=new E(""),Vc=(()=>{class e{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=p(Pp);loadComponent(t,r){if(this.componentLoaders.get(r))return this.componentLoaders.get(r);if(r._loadedComponent)return T(r._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(r);let o=fn(Ie(t,()=>r.loadComponent())).pipe(A(Db),Ae(Ib),re(a=>{this.onLoadEndListener&&this.onLoadEndListener(r),r._loadedComponent=a}),En(()=>{this.componentLoaders.delete(r)})),i=new qr(o,()=>new V).pipe(Hr());return this.componentLoaders.set(r,i),i}loadChildren(t,r){if(this.childrenLoaders.get(r))return this.childrenLoaders.get(r);if(r._loadedRoutes)return T({routes:r._loadedRoutes,injector:r._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(r);let i=_b(r,this.compiler,t,this.onLoadEndListener).pipe(En(()=>{this.childrenLoaders.delete(r)})),a=new qr(i,()=>new V).pipe(Hr());return this.childrenLoaders.set(r,a),a}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function _b(e,n,t,r){return fn(Ie(t,()=>e.loadChildren())).pipe(A(Db),Ae(Ib),de(o=>o instanceof Ws||Array.isArray(o)?T(o):ne(n.compileModuleAsync(o))),A(o=>{r&&r(e);let i,a,s=!1;return Array.isArray(o)?(a=o,s=!0):(i=o.create(t).injector,a=i.get(Sr,[],{optional:!0,self:!0}).flat()),{routes:a.map(Vf),injector:i}}))}function MM(e){return e&&typeof e=="object"&&"default"in e}function Db(e){return MM(e)?e.default:e}function Ib(e){return T(e)}var Uc=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:()=>p(SM),providedIn:"root"})}return e})(),SM=(()=>{class e{shouldProcessUrl(t){return!0}extract(t){return t}merge(t,r){return t}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Hf=new E(""),qf=new E("");function wb(e,n,t){let r=e.get(qf),o=e.get(U);if(!o.startViewTransition||r.skipNextTransition)return r.skipNextTransition=!1,new Promise(l=>setTimeout(l));let i,a=new Promise(l=>{i=l}),s=o.startViewTransition(()=>(i(),AM(e)));s.ready.catch(l=>{});let{onViewTransitionCreated:c}=r;return c&&Ie(e,()=>c({transition:s,from:n,to:t})),a}function AM(e){return new Promise(n=>{Ys({read:()=>setTimeout(n)},{injector:e})})}var $f=new E(""),Hc=(()=>{class e{currentNavigation=Xe(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=null;events=new V;transitionAbortWithErrorSubject=new V;configLoader=p(Vc);environmentInjector=p(ie);destroyRef=p(ft);urlSerializer=p(Tr);rootContexts=p(Mr);location=p(Bn);inputBindingEnabled=p(Ki,{optional:!0})!==null;titleStrategy=p(Uf);options=p($n,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=p(Uc);createViewTransition=p(Hf,{optional:!0});navigationErrorHandler=p($f,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>T(void 0);rootComponentType=null;destroyed=!1;constructor(){let t=o=>this.events.next(new Sc(o)),r=o=>this.events.next(new Ac(o));this.configLoader.onLoadEndListener=r,this.configLoader.onLoadStartListener=t,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(t){let r=++this.navigationId;zt(()=>{this.transitions?.next($(y({},t),{extractedUrl:this.urlHandlingStrategy.extract(t.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,abortController:new AbortController,id:r}))})}setupNavigations(t){return this.transitions=new ve(null),this.transitions.pipe(te(r=>r!==null),Ae(r=>{let o=!1;return T(r).pipe(Ae(i=>{if(this.navigationId>r.id)return this.cancelNavigationTransition(r,"",ze.SupersededByNewNavigation),be;this.currentTransition=r,this.currentNavigation.set({id:i.id,initialUrl:i.rawUrl,extractedUrl:i.extractedUrl,targetBrowserUrl:typeof i.extras.browserUrl=="string"?this.urlSerializer.parse(i.extras.browserUrl):i.extras.browserUrl,trigger:i.source,extras:i.extras,previousNavigation:this.lastSuccessfulNavigation?$(y({},this.lastSuccessfulNavigation),{previousNavigation:null}):null,abort:()=>i.abortController.abort()});let a=!t.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),s=i.extras.onSameUrlNavigation??t.onSameUrlNavigation;if(!a&&s!=="reload")return this.events.next(new $t(i.id,this.urlSerializer.serialize(i.rawUrl),"",Mo.IgnoredSameUrlNavigation)),i.resolve(!1),be;if(this.urlHandlingStrategy.shouldProcessUrl(i.rawUrl))return T(i).pipe(Ae(c=>(this.events.next(new qn(c.id,this.urlSerializer.serialize(c.extractedUrl),c.source,c.restoredState)),c.id!==this.navigationId?be:Promise.resolve(c))),_M(this.environmentInjector,this.configLoader,this.rootComponentType,t.config,this.urlSerializer,this.paramsInheritanceStrategy),re(c=>{r.targetSnapshot=c.targetSnapshot,r.urlAfterRedirects=c.urlAfterRedirects,this.currentNavigation.update(u=>(u.finalUrl=c.urlAfterRedirects,u));let l=new Ui(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(l)}));if(a&&this.urlHandlingStrategy.shouldProcessUrl(i.currentRawUrl)){let{id:c,extractedUrl:l,source:u,restoredState:d,extras:m}=i,f=new qn(c,this.urlSerializer.serialize(l),u,d);this.events.next(f);let g=lb(this.rootComponentType).snapshot;return this.currentTransition=r=$(y({},i),{targetSnapshot:g,urlAfterRedirects:l,extras:$(y({},m),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(w=>(w.finalUrl=l,w)),T(r)}else return this.events.next(new $t(i.id,this.urlSerializer.serialize(i.extractedUrl),"",Mo.IgnoredByUrlHandlingStrategy)),i.resolve(!1),be}),re(i=>{let a=new Ic(i.id,this.urlSerializer.serialize(i.extractedUrl),this.urlSerializer.serialize(i.urlAfterRedirects),i.targetSnapshot);this.events.next(a)}),A(i=>(this.currentTransition=r=$(y({},i),{guards:VT(i.targetSnapshot,i.currentSnapshot,this.rootContexts)}),r)),JT(this.environmentInjector,i=>this.events.next(i)),re(i=>{if(r.guardsResult=i.guardsResult,i.guardsResult&&typeof i.guardsResult!="boolean")throw Lc(this.urlSerializer,i.guardsResult);let a=new wc(i.id,this.urlSerializer.serialize(i.extractedUrl),this.urlSerializer.serialize(i.urlAfterRedirects),i.targetSnapshot,!!i.guardsResult);this.events.next(a)}),te(i=>i.guardsResult?!0:(this.cancelNavigationTransition(i,"",ze.GuardRejected),!1)),Df(i=>{if(i.guards.canActivateChecks.length!==0)return T(i).pipe(re(a=>{let s=new Tc(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(s)}),Ae(a=>{let s=!1;return T(a).pipe(DM(this.paramsInheritanceStrategy,this.environmentInjector),re({next:()=>s=!0,complete:()=>{s||this.cancelNavigationTransition(a,"",ze.NoDataFromResolver)}}))}),re(a=>{let s=new Mc(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(s)}))}),Df(i=>{let a=s=>{let c=[];if(s.routeConfig?.loadComponent){let l=Po(s)??this.environmentInjector;c.push(this.configLoader.loadComponent(l,s.routeConfig).pipe(re(u=>{s.component=u}),A(()=>{})))}for(let l of s.children)c.push(...a(l));return c};return Jn(a(i.targetSnapshot.root)).pipe(bn(null),Oe(1))}),Df(()=>this.afterPreactivation()),Ae(()=>{let{currentSnapshot:i,targetSnapshot:a}=r,s=this.createViewTransition?.(this.environmentInjector,i.root,a.root);return s?ne(s).pipe(A(()=>r)):T(r)}),A(i=>{let a=kT(t.routeReuseStrategy,i.targetSnapshot,i.currentRouterState);return this.currentTransition=r=$(y({},i),{targetRouterState:a}),this.currentNavigation.update(s=>(s.targetRouterState=a,s)),r}),re(()=>{this.events.next(new Hi)}),zT(this.rootContexts,t.routeReuseStrategy,i=>this.events.next(i),this.inputBindingEnabled),Oe(1),_n(new B(i=>{let a=r.abortController.signal,s=()=>i.next();return a.addEventListener("abort",s),()=>a.removeEventListener("abort",s)}).pipe(te(()=>!o&&!r.targetRouterState),re(()=>{this.cancelNavigationTransition(r,r.abortController.signal.reason+"",ze.Aborted)}))),re({next:i=>{o=!0,this.lastSuccessfulNavigation=zt(this.currentNavigation),this.events.next(new rt(i.id,this.urlSerializer.serialize(i.extractedUrl),this.urlSerializer.serialize(i.urlAfterRedirects))),this.titleStrategy?.updateTitle(i.targetRouterState.snapshot),i.resolve(!0)},complete:()=>{o=!0}}),_n(this.transitionAbortWithErrorSubject.pipe(re(i=>{throw i}))),En(()=>{o||this.cancelNavigationTransition(r,"",ze.SupersededByNewNavigation),this.currentTransition?.id===r.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),st(i=>{if(this.destroyed)return r.resolve(!1),be;if(o=!0,hb(i))this.events.next(new Ht(r.id,this.urlSerializer.serialize(r.extractedUrl),i.message,i.cancellationCode)),BT(i)?this.events.next(new xo(i.url,i.navigationBehaviorOptions)):r.resolve(!1);else{let a=new So(r.id,this.urlSerializer.serialize(r.extractedUrl),i,r.targetSnapshot??void 0);try{let s=Ie(this.environmentInjector,()=>this.navigationErrorHandler?.(a));if(s instanceof Ro){let{message:c,cancellationCode:l}=Lc(this.urlSerializer,s);this.events.next(new Ht(r.id,this.urlSerializer.serialize(r.extractedUrl),c,l)),this.events.next(new xo(s.redirectTo,s.navigationBehaviorOptions))}else throw this.events.next(a),i}catch(s){this.options.resolveNavigationPromiseOnError?r.resolve(!1):r.reject(s)}}return be}))}))}cancelNavigationTransition(t,r,o){let i=new Ht(t.id,this.urlSerializer.serialize(t.extractedUrl),r,o);this.events.next(i),t.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let t=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),r=zt(this.currentNavigation),o=r?.targetBrowserUrl??r?.extractedUrl;return t.toString()!==o?.toString()&&!r?.extras.skipLocationChange}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function xM(e){return e!==wo}var Tb=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:()=>p(RM),providedIn:"root"})}return e})(),Bc=class{shouldDetach(n){return!1}store(n,t){}shouldAttach(n){return!1}retrieve(n){return null}shouldReuseRoute(n,t){return n.routeConfig===t.routeConfig}},RM=(()=>{class e extends Bc{static \u0275fac=(()=>{let t;return function(o){return(t||(t=hr(e)))(o||e)}})();static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Mb=(()=>{class e{urlSerializer=p(Tr);options=p($n,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=p(Bn);urlHandlingStrategy=p(Uc);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new qt;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:t,initialUrl:r,targetBrowserUrl:o}){let i=t!==void 0?this.urlHandlingStrategy.merge(t,r):r,a=o??i;return a instanceof qt?this.urlSerializer.serialize(a):a}commitTransition({targetRouterState:t,finalUrl:r,initialUrl:o}){r&&t?(this.currentUrlTree=r,this.rawUrlTree=this.urlHandlingStrategy.merge(r,o),this.routerState=t):this.rawUrlTree=o}routerState=lb(null);getRouterState(){return this.routerState}stateMemento=this.createStateMemento();updateStateMemento(){this.stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}resetInternalState({finalUrl:t}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,t??this.rawUrlTree)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:()=>p(NM),providedIn:"root"})}return e})(),NM=(()=>{class e extends Mb{currentPageId=0;lastSuccessfulId=-1;restoredState(){return this.location.getState()}get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(t){return this.location.subscribe(r=>{r.type==="popstate"&&setTimeout(()=>{t(r.url,r.state,"popstate")})})}handleRouterEvent(t,r){t instanceof qn?this.updateStateMemento():t instanceof $t?this.commitTransition(r):t instanceof Ui?this.urlUpdateStrategy==="eager"&&(r.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(r),r)):t instanceof Hi?(this.commitTransition(r),this.urlUpdateStrategy==="deferred"&&!r.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(r),r)):t instanceof Ht&&t.code!==ze.SupersededByNewNavigation&&t.code!==ze.Redirect?this.restoreHistory(r):t instanceof So?this.restoreHistory(r,!0):t instanceof rt&&(this.lastSuccessfulId=t.id,this.currentPageId=this.browserPageId)}setBrowserUrl(t,{extras:r,id:o}){let{replaceUrl:i,state:a}=r;if(this.location.isCurrentPathEqualTo(t)||i){let s=this.browserPageId,c=y(y({},a),this.generateNgRouterState(o,s));this.location.replaceState(t,"",c)}else{let s=y(y({},a),this.generateNgRouterState(o,this.browserPageId+1));this.location.go(t,"",s)}}restoreHistory(t,r=!1){if(this.canceledNavigationResolution==="computed"){let o=this.browserPageId,i=this.currentPageId-o;i!==0?this.location.historyGo(i):this.getCurrentUrlTree()===t.finalUrl&&i===0&&(this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(r&&this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(t,r){return this.canceledNavigationResolution==="computed"?{navigationId:t,\u0275routerPageId:r}:{navigationId:t}}static \u0275fac=(()=>{let t;return function(o){return(t||(t=hr(e)))(o||e)}})();static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function qc(e,n){e.events.pipe(te(t=>t instanceof rt||t instanceof Ht||t instanceof So||t instanceof $t),A(t=>t instanceof rt||t instanceof $t?0:(t instanceof Ht?t.code===ze.Redirect||t.code===ze.SupersededByNewNavigation:!1)?2:1),te(t=>t!==2),Oe(1)).subscribe(()=>{n()})}var PM={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},OM={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"},it=(()=>{class e{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=p(Ks);stateManager=p(Mb);options=p($n,{optional:!0})||{};pendingTasks=p(Xt);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=p(Hc);urlSerializer=p(Tr);location=p(Bn);urlHandlingStrategy=p(Uc);injector=p(ie);_events=new V;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=p(Tb);onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=p(Sr,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!p(Ki,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:t=>{this.console.warn(t)}}),this.subscribeToNavigationEvents()}eventsSubscription=new Z;subscribeToNavigationEvents(){let t=this.navigationTransitions.events.subscribe(r=>{try{let o=this.navigationTransitions.currentTransition,i=zt(this.navigationTransitions.currentNavigation);if(o!==null&&i!==null){if(this.stateManager.handleRouterEvent(r,i),r instanceof Ht&&r.code!==ze.Redirect&&r.code!==ze.SupersededByNewNavigation)this.navigated=!0;else if(r instanceof rt)this.navigated=!0;else if(r instanceof xo){let a=r.navigationBehaviorOptions,s=this.urlHandlingStrategy.merge(r.url,o.currentRawUrl),c=y({browserUrl:o.extras.browserUrl,info:o.extras.info,skipLocationChange:o.extras.skipLocationChange,replaceUrl:o.extras.replaceUrl||this.urlUpdateStrategy==="eager"||xM(o.source)},a);this.scheduleNavigation(s,wo,null,c,{resolve:o.resolve,reject:o.reject,promise:o.promise})}}NT(r)&&this._events.next(r)}catch(o){this.navigationTransitions.transitionAbortWithErrorSubject.next(o)}});this.eventsSubscription.add(t)}resetRootComponentType(t){this.routerState.root.component=t,this.navigationTransitions.rootComponentType=t}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),wo,this.stateManager.restoredState())}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((t,r,o)=>{this.navigateToSyncWithBrowser(t,o,r)})}navigateToSyncWithBrowser(t,r,o){let i={replaceUrl:!0},a=o?.navigationId?o:null;if(o){let c=y({},o);delete c.navigationId,delete c.\u0275routerPageId,Object.keys(c).length!==0&&(i.state=c)}let s=this.parseUrl(t);this.scheduleNavigation(s,r,a,i).catch(c=>{this.disposed||this.injector.get($e)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return zt(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(t){this.config=t.map(Vf),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription&&(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0),this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(t,r={}){let{relativeTo:o,queryParams:i,fragment:a,queryParamsHandling:s,preserveFragment:c}=r,l=c?this.currentUrlTree.fragment:a,u=null;switch(s??this.options.defaultQueryParamsHandling){case"merge":u=y(y({},this.currentUrlTree.queryParams),i);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=i||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let m=o?o.snapshot:this.routerState.snapshot.root;d=ib(m)}catch{(typeof t[0]!="string"||t[0][0]!=="/")&&(t=[]),d=this.currentUrlTree.root}return ab(d,t,u,l??null)}navigateByUrl(t,r={skipLocationChange:!1}){let o=Hn(t)?t:this.parseUrl(t),i=this.urlHandlingStrategy.merge(o,this.rawUrlTree);return this.scheduleNavigation(i,wo,null,r)}navigate(t,r={skipLocationChange:!1}){return FM(t),this.navigateByUrl(this.createUrlTree(t,r),r)}serializeUrl(t){return this.urlSerializer.serialize(t)}parseUrl(t){try{return this.urlSerializer.parse(t)}catch{return this.urlSerializer.parse("/")}}isActive(t,r){let o;if(r===!0?o=y({},PM):r===!1?o=y({},OM):o=r,Hn(t))return zy(this.currentUrlTree,t,o);let i=this.parseUrl(t);return zy(this.currentUrlTree,i,o)}removeEmptyProps(t){return Object.entries(t).reduce((r,[o,i])=>(i!=null&&(r[o]=i),r),{})}scheduleNavigation(t,r,o,i,a){if(this.disposed)return Promise.resolve(!1);let s,c,l;a?(s=a.resolve,c=a.reject,l=a.promise):l=new Promise((d,m)=>{s=d,c=m});let u=this.pendingTasks.add();return qc(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:r,restoredState:o,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:t,extras:i,resolve:s,reject:c,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(d=>Promise.reject(d))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function FM(e){for(let n=0;n<e.length;n++)if(e[n]==null)throw new b(4008,!1)}var $c=(()=>{class e{router;route;tabIndexAttribute;renderer;el;locationStrategy;reactiveHref=Xe(null);get href(){return zt(this.reactiveHref)}set href(t){this.reactiveHref.set(t)}target;queryParams;fragment;queryParamsHandling;state;info;relativeTo;isAnchorElement;subscription;onChanges=new V;applicationErrorHandler=p($e);options=p($n,{optional:!0});constructor(t,r,o,i,a,s){this.router=t,this.route=r,this.tabIndexAttribute=o,this.renderer=i,this.el=a,this.locationStrategy=s,this.reactiveHref.set(p(new jn("href"),{optional:!0}));let c=a.nativeElement.tagName?.toLowerCase();this.isAnchorElement=c==="a"||c==="area"||!!(typeof customElements=="object"&&customElements.get(c)?.observedAttributes?.includes?.("href")),this.isAnchorElement?this.setTabIndexIfNotOnNativeEl("0"):this.subscribeToNavigationEventsIfNecessary()}subscribeToNavigationEventsIfNecessary(){if(this.subscription!==void 0||!this.isAnchorElement)return;let t=this.preserveFragment,r=o=>o==="merge"||o==="preserve";t||=r(this.queryParamsHandling),t||=!this.queryParamsHandling&&!r(this.options?.defaultQueryParamsHandling),t&&(this.subscription=this.router.events.subscribe(o=>{o instanceof rt&&this.updateHref()}))}preserveFragment=!1;skipLocationChange=!1;replaceUrl=!1;setTabIndexIfNotOnNativeEl(t){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",t)}ngOnChanges(t){this.isAnchorElement&&(this.updateHref(),this.subscribeToNavigationEventsIfNecessary()),this.onChanges.next(this)}routerLinkInput=null;set routerLink(t){t==null?(this.routerLinkInput=null,this.setTabIndexIfNotOnNativeEl(null)):(Hn(t)?this.routerLinkInput=t:this.routerLinkInput=Array.isArray(t)?t:[t],this.setTabIndexIfNotOnNativeEl("0"))}onClick(t,r,o,i,a){let s=this.urlTree;if(s===null||this.isAnchorElement&&(t!==0||r||o||i||a||typeof this.target=="string"&&this.target!="_self"))return!0;let c={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(s,c)?.catch(l=>{this.applicationErrorHandler(l)}),!this.isAnchorElement}ngOnDestroy(){this.subscription?.unsubscribe()}updateHref(){let t=this.urlTree;this.reactiveHref.set(t!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(t))??"":null)}applyAttributeValue(t,r){let o=this.renderer,i=this.el.nativeElement;r!==null?o.setAttribute(i,t,r):o.removeAttribute(i,t)}get urlTree(){return this.routerLinkInput===null?null:Hn(this.routerLinkInput)?this.routerLinkInput:this.router.createUrlTree(this.routerLinkInput,{relativeTo:this.relativeTo!==void 0?this.relativeTo:this.route,queryParams:this.queryParams,fragment:this.fragment,queryParamsHandling:this.queryParamsHandling,preserveFragment:this.preserveFragment})}static \u0275fac=function(r){return new(r||e)(J(it),J(ot),yi("tabindex"),J(kn),J(pe),J(Dt))};static \u0275dir=fe({type:e,selectors:[["","routerLink",""]],hostVars:2,hostBindings:function(r,o){r&1&&Re("click",function(a){return o.onClick(a.button,a.ctrlKey,a.shiftKey,a.altKey,a.metaKey)}),r&2&&Et("href",o.reactiveHref(),Gd)("target",o.target)},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",Be],skipLocationChange:[2,"skipLocationChange","skipLocationChange",Be],replaceUrl:[2,"replaceUrl","replaceUrl",Be],routerLink:"routerLink"},features:[yt]})}return e})();var Xi=class{};var Sb=(()=>{class e{router;injector;preloadingStrategy;loader;subscription;constructor(t,r,o,i){this.router=t,this.injector=r,this.preloadingStrategy=o,this.loader=i}setUpPreloading(){this.subscription=this.router.events.pipe(te(t=>t instanceof rt),St(()=>this.preload())).subscribe(()=>{})}preload(){return this.processRoutes(this.injector,this.router.config)}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}processRoutes(t,r){let o=[];for(let i of r){i.providers&&!i._injector&&(i._injector=mo(i.providers,t,`Route: ${i.path}`));let a=i._injector??t,s=i._loadedInjector??a;(i.loadChildren&&!i._loadedRoutes&&i.canLoad===void 0||i.loadComponent&&!i._loadedComponent)&&o.push(this.preloadConfig(a,i)),(i.children||i._loadedRoutes)&&o.push(this.processRoutes(s,i.children??i._loadedRoutes))}return ne(o).pipe(vn())}preloadConfig(t,r){return this.preloadingStrategy.preload(r,()=>{let o;r.loadChildren&&r.canLoad===void 0?o=this.loader.loadChildren(t,r):o=T(null);let i=o.pipe(de(a=>a===null?T(void 0):(r._loadedRoutes=a.routes,r._loadedInjector=a.injector,this.processRoutes(a.injector??t,a.routes))));if(r.loadComponent&&!r._loadedComponent){let a=this.loader.loadComponent(t,r);return ne([i,a]).pipe(vn())}else return i})}static \u0275fac=function(r){return new(r||e)(I(it),I(ie),I(Xi),I(Vc))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Ab=new E(""),kM=(()=>{class e{urlSerializer;transitions;viewportScroller;zone;options;routerEventsSubscription;scrollEventsSubscription;lastId=0;lastSource=wo;restoredId=0;store={};constructor(t,r,o,i,a={}){this.urlSerializer=t,this.transitions=r,this.viewportScroller=o,this.zone=i,this.options=a,a.scrollPositionRestoration||="disabled",a.anchorScrolling||="disabled"}init(){this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.setHistoryScrollRestoration("manual"),this.routerEventsSubscription=this.createScrollEvents(),this.scrollEventsSubscription=this.consumeScrollEvents()}createScrollEvents(){return this.transitions.events.subscribe(t=>{t instanceof qn?(this.store[this.lastId]=this.viewportScroller.getScrollPosition(),this.lastSource=t.navigationTrigger,this.restoredId=t.restoredState?t.restoredState.navigationId:0):t instanceof rt?(this.lastId=t.id,this.scheduleScrollEvent(t,this.urlSerializer.parse(t.urlAfterRedirects).fragment)):t instanceof $t&&t.code===Mo.IgnoredSameUrlNavigation&&(this.lastSource=void 0,this.restoredId=0,this.scheduleScrollEvent(t,this.urlSerializer.parse(t.url).fragment))})}consumeScrollEvents(){return this.transitions.events.subscribe(t=>{t instanceof Ao&&(t.position?this.options.scrollPositionRestoration==="top"?this.viewportScroller.scrollToPosition([0,0]):this.options.scrollPositionRestoration==="enabled"&&this.viewportScroller.scrollToPosition(t.position):t.anchor&&this.options.anchorScrolling==="enabled"?this.viewportScroller.scrollToAnchor(t.anchor):this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.scrollToPosition([0,0]))})}scheduleScrollEvent(t,r){this.zone.runOutsideAngular(()=>Nr(this,null,function*(){yield new Promise(o=>{setTimeout(o),typeof requestAnimationFrame<"u"&&requestAnimationFrame(o)}),this.zone.run(()=>{this.transitions.events.next(new Ao(t,this.lastSource==="popstate"?this.store[this.restoredId]:null,r))})}))}ngOnDestroy(){this.routerEventsSubscription?.unsubscribe(),this.scrollEventsSubscription?.unsubscribe()}static \u0275fac=function(r){pp()};static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})();function Wf(e,...n){return or([{provide:Sr,multi:!0,useValue:e},[],{provide:ot,useFactory:xb,deps:[it]},{provide:wi,multi:!0,useFactory:Rb},n.map(t=>t.\u0275providers)])}function xb(e){return e.routerState.root}function ea(e,n){return{\u0275kind:e,\u0275providers:n}}function Rb(){let e=p(me);return n=>{let t=e.get(bt);if(n!==t.components[0])return;let r=e.get(it),o=e.get(Nb);e.get(Zf)===1&&r.initialNavigation(),e.get(Fb,null,{optional:!0})?.setUpPreloading(),e.get(Ab,null,{optional:!0})?.init(),r.resetRootComponentType(t.componentTypes[0]),o.closed||(o.next(),o.complete(),o.unsubscribe())}}var Nb=new E("",{factory:()=>new V}),Zf=new E("",{providedIn:"root",factory:()=>1});function Pb(){let e=[{provide:js,useValue:!0},{provide:Zf,useValue:0},Xs(()=>{let n=p(me);return n.get(Qp,Promise.resolve()).then(()=>new Promise(r=>{let o=n.get(it),i=n.get(Nb);qc(o,()=>{r(!0)}),n.get(Hc).afterPreactivation=()=>(r(!0),i.closed?T(void 0):i),o.initialNavigation()}))})];return ea(2,e)}function Ob(){let e=[Xs(()=>{p(it).setUpLocationChangeListener()}),{provide:Zf,useValue:2}];return ea(3,e)}var Fb=new E("");function kb(e){return ea(0,[{provide:Fb,useExisting:Sb},{provide:Xi,useExisting:e}])}function Lb(){return ea(8,[Bf,{provide:Ki,useExisting:Bf}])}function jb(e){cn("NgRouterViewTransitions");let n=[{provide:Hf,useValue:wb},{provide:qf,useValue:y({skipNextTransition:!!e?.skipInitialTransition},e)}];return ea(9,n)}var Bb=[Bn,{provide:Tr,useClass:Un},it,Mr,{provide:ot,useFactory:xb,deps:[it]},Vc,[]],Ar=(()=>{class e{constructor(){}static forRoot(t,r){return{ngModule:e,providers:[Bb,[],{provide:Sr,multi:!0,useValue:t},[],r?.errorHandler?{provide:$f,useValue:r.errorHandler}:[],{provide:$n,useValue:r||{}},r?.useHash?jM():BM(),LM(),r?.preloadingStrategy?kb(r.preloadingStrategy).\u0275providers:[],r?.initialNavigation?zM(r):[],r?.bindToComponentInputs?Lb().\u0275providers:[],r?.enableViewTransitions?jb().\u0275providers:[],VM()]}}static forChild(t){return{ngModule:e,providers:[{provide:Sr,multi:!0,useValue:t}]}}static \u0275fac=function(r){return new(r||e)};static \u0275mod=ce({type:e});static \u0275inj=oe({})}return e})();function LM(){return{provide:Ab,useFactory:()=>{let e=p(Cy),n=p(q),t=p($n),r=p(Hc),o=p(Tr);return t.scrollOffset&&e.setOffset(t.scrollOffset),new kM(o,r,e,n,t)}}}function jM(){return{provide:Dt,useClass:Yp}}function BM(){return{provide:Dt,useClass:cc}}function zM(e){return[e.initialNavigation==="disabled"?Ob().\u0275providers:[],e.initialNavigation==="enabledBlocking"?Pb().\u0275providers:[]]}var Gf=new E("");function VM(){return[{provide:Gf,useFactory:Rb},{provide:wi,multi:!0,useExisting:Gf}]}function UM(e,n){if(e&1&&(D(0,"span",6),ge(1,"img",7),h()),e&2){let t=H();_(),M("src",t.node.flag,jt)("alt",t.node.nombre+" flag")}}function HM(e,n){e&1&&(D(0,"span",8),C(1,"\u25B8"),h())}function qM(e,n){if(e&1){let t=Ln();vo(0),D(1,"app-header-submenu",11),Re("toggleOpen",function(o){dt(t);let i=H(2);return pt(i.toggleChild(o))})("selected",function(o){dt(t);let i=H(2);return pt(i.selected.emit(o))}),h(),yo()}if(e&2){let t=n.$implicit,r=H(2);_(),M("node",t)("isOpen",r.openChildKey===r.keyOf(t))}}function $M(e,n){if(e&1&&(D(0,"ul",9),X(1,qM,2,2,"ng-container",10),h()),e&2){let t=H();_(),M("ngForOf",t.node.hijos)}}var Wc=class e{constructor(n){this.router=n}node;isOpen=!1;openChildKey=null;toggleOpen=new K;selected=new K;keyOf(n){return n.path??n.nombre}toggleChild(n){this.openChildKey=this.openChildKey===n?null:n}onClick(n,t){if(t.stopPropagation(),n.hijos?.length){this.toggleOpen.emit(this.keyOf(n));return}n.path&&this.router.navigate(["/guia",n.path]),this.selected.emit(n)}static \u0275fac=function(t){return new(t||e)(J(it))};static \u0275cmp=ue({type:e,selectors:[["app-header-submenu"]],inputs:{node:"node",isOpen:"isOpen"},outputs:{toggleOpen:"toggleOpen",selected:"selected"},decls:7,vars:6,consts:[[1,"menu-item"],["type","button",1,"menu-btn",3,"click"],["class","flag-container",4,"ngIf"],[1,"label"],["class","caret",4,"ngIf"],["class","submenu",4,"ngIf"],[1,"flag-container"],[1,"flag-icon",3,"src","alt"],[1,"caret"],[1,"submenu"],[4,"ngFor","ngForOf"],[3,"toggleOpen","selected","node","isOpen"]],template:function(t,r){t&1&&(D(0,"li",0)(1,"button",1),Re("click",function(i){return r.onClick(r.node,i)}),X(2,UM,2,2,"span",2),D(3,"span",3),C(4),h(),X(5,HM,2,0,"span",4),h(),X(6,$M,2,1,"ul",5),h()),t&2&&(Me("open",r.isOpen),_(2),M("ngIf",r.node.flag),_(2),He(r.node.nombre),_(),M("ngIf",r.node.hijos==null?null:r.node.hijos.length),_(),M("ngIf",r.node.hijos==null?null:r.node.hijos.length))},dependencies:[e,We,zn,dn,Ar],styles:['@charset "UTF-8";.menu-item[_ngcontent-%COMP%]{position:relative;list-style:none;white-space:nowrap}.menu-btn[_ngcontent-%COMP%]{background:none;border:0;color:inherit;font:inherit;cursor:pointer;width:100%;padding:.3rem .8rem;display:flex;align-items:center;gap:.5rem;text-align:left}.flag-container[_ngcontent-%COMP%]{display:inline-block;width:20px;height:14px}.flag-icon[_ngcontent-%COMP%]{width:20px;height:14px;object-fit:cover;border:1px solid #ccc;border-radius:2px}.caret[_ngcontent-%COMP%]{margin-left:auto}.submenu[_ngcontent-%COMP%]{opacity:0;transform:translateY(-10px);pointer-events:none;transition:opacity .2s ease,transform .2s ease;position:absolute;top:100%;left:0;background:#34495e;border-radius:4px;padding:.5rem 0;min-width:150px;z-index:10;margin:0;padding-left:0}.menu-item[_ngcontent-%COMP%]:hover > .submenu[_ngcontent-%COMP%]{opacity:1;transform:translateY(0);pointer-events:auto}.menu-item.open[_ngcontent-%COMP%] > .submenu[_ngcontent-%COMP%]{opacity:1;transform:translateY(0);pointer-events:auto}.submenu[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%]{top:0;left:100%;transform:translate(-10px)}.submenu[_ngcontent-%COMP%]   .menu-btn[_ngcontent-%COMP%]:hover{background:#3d566e;border-radius:4px}@media (max-width: 768px){.submenu[_ngcontent-%COMP%]{position:static;opacity:0;transform:none;pointer-events:none;height:0;overflow:hidden;padding:0;min-width:unset;background:transparent}.menu-item.open[_ngcontent-%COMP%] > .submenu[_ngcontent-%COMP%]{opacity:1;pointer-events:auto;height:auto;padding:.5rem 0 .5rem 1rem;background:#34495e;border-radius:4px;margin-top:.25rem}.menu-item.open[_ngcontent-%COMP%]   .caret[_ngcontent-%COMP%]{transform:rotate(90deg)}}']})};function GM(e,n){if(e&1){let t=Ln();D(0,"div",8),Re("click",function(){dt(t);let o=H();return pt(o.menuOpen=!1)}),h()}}function WM(e,n){if(e&1){let t=Ln();vo(0),D(1,"app-header-submenu",9),Re("toggleOpen",function(o){dt(t);let i=H();return pt(i.toggleContinent(o))})("selected",function(){dt(t);let o=H();return pt(o.menuOpen=!1)}),h(),yo()}if(e&2){let t=n.$implicit,r=H();_(),M("node",t)("isOpen",r.openContinentKey===(t.path??t.nombre))}}var Zc=class e{treeData=[];menuOpen=!1;openContinentKey=null;keyOf(n){return n.path??n.nombre}toggleContinent(n){this.openContinentKey=this.openContinentKey===n?null:n}toggleMenu(){this.menuOpen=!this.menuOpen}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=ue({type:e,selectors:[["app-header"]],inputs:{treeData:"treeData"},decls:10,vars:5,consts:[[1,"app-header"],[1,"logo-container"],["routerLink","/"],["src","assets/logo.png","alt","AvenTourArte logo",1,"logo-img"],["aria-label","Abrir/cerrar men\xFA",1,"menu-toggle",3,"click"],["class","backdrop",3,"click",4,"ngIf"],[1,"main-menu"],[4,"ngFor","ngForOf"],[1,"backdrop",3,"click"],[3,"toggleOpen","selected","node","isOpen"]],template:function(t,r){t&1&&(D(0,"header",0)(1,"div",1)(2,"a",2),ge(3,"img",3),h()(),D(4,"button",4),Re("click",function(){return r.toggleMenu()}),C(5),h(),X(6,GM,1,0,"div",5),D(7,"nav",6)(8,"ul"),X(9,WM,2,2,"ng-container",7),h()()()),t&2&&(_(5),le(" ",r.menuOpen?"\u2715":"\u2630"," "),_(),M("ngIf",r.menuOpen),_(),Me("open",r.menuOpen),_(2),M("ngForOf",r.treeData))},dependencies:[We,zn,dn,Ar,$c,Wc],styles:['@charset "UTF-8";.app-header[_ngcontent-%COMP%]{display:flex;align-items:center;background:#2c3e50;padding:.7rem 1.5rem;color:#fff;box-shadow:0 2px 6px #00000026;position:relative}.app-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.app-header[_ngcontent-%COMP%]   .logo-img[_ngcontent-%COMP%]{height:80px;border-radius:6px;cursor:pointer}.app-header[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%]{display:none;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;margin-left:auto}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%]{margin-left:2rem;flex-grow:1}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0;display:flex;gap:1.5rem}[_nghost-%COMP%]{position:relative;z-index:10}.backdrop[_ngcontent-%COMP%]{display:none}@media (max-width: 768px){.app-header[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%]{display:block;margin-left:auto}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%]{display:none;position:fixed;inset:100px 0 0;background:#2c3e50;z-index:9999;overflow-y:auto;padding:1rem}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{flex-direction:column;gap:.25rem}.app-header[_ngcontent-%COMP%]   .main-menu.open[_ngcontent-%COMP%]{display:block}.backdrop[_ngcontent-%COMP%]{display:block;position:fixed;inset:100px 0 0;background:#00000059;z-index:9998}}']})};var Qc=class e{currentYear=new Date().getFullYear();socialLinks=[{name:"Instagram",url:"https://www.instagram.com/aventourarte",icon:"\u{1F4F8}"},{name:"Facebook",url:"https://www.facebook.com/aventourarte",icon:"\u{1F4D8}"},{name:"Twitter",url:"https://www.twitter.com/aventourarte",icon:"\u{1F426}"}];static \u0275fac=function(t){return new(t||e)};static \u0275cmp=ue({type:e,selectors:[["app-footer"]],decls:13,vars:0,consts:[[1,"footer"],[1,"footer-bottom"],[1,"socials"],["href","#","target","_blank"]],template:function(t,r){t&1&&(nt(0,"footer",0)(1,"div",1)(2,"span"),C(3,"\xA9 2026 AvenTourArte. Todos los derechos reservados."),Ct(),nt(4,"span",2)(5,"a",3),C(6,"Instagram"),Ct(),C(7," | "),nt(8,"a",3),C(9,"Facebook"),Ct(),C(10," | "),nt(11,"a",3),C(12,"Twitter"),Ct()()()())},styles:[".footer[_ngcontent-%COMP%]{width:100%;max-width:100vw;background-color:#1a1a1a;color:#f5f5f5;font-family:Arial,sans-serif;font-size:.75rem;padding:.5rem 1rem;box-sizing:border-box}.footer[_ngcontent-%COMP%]   .footer-bottom[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem}.footer[_ngcontent-%COMP%]   .footer-bottom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#f5f5f5;text-decoration:none;margin-left:.3rem;transition:color .3s}.footer[_ngcontent-%COMP%]   .footer-bottom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#ff6f61}.footer[_ngcontent-%COMP%]   .socials[_ngcontent-%COMP%]{display:flex;gap:.5rem}[_nghost-%COMP%]{position:relative}"]})};var Yc=class e{treeData=By;selectedPlace="";onSelected(n){this.selectedPlace=n.nombre}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=ue({type:e,selectors:[["app-root"]],decls:6,vars:1,consts:[[3,"treeData"],[1,"app-main"],[1,"app-body"],[1,"content"]],template:function(t,r){t&1&&(ge(0,"app-header",0),D(1,"main",1)(2,"div",2)(3,"section",3),ge(4,"router-outlet"),h()()(),ge(5,"app-footer")),t&2&&M("treeData",r.treeData)},dependencies:[We,Ar,Yi,Zc,Qc],styles:['@charset "UTF-8";[_nghost-%COMP%], body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{margin:0;padding:0;width:100%;height:100%;box-sizing:border-box}*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after{box-sizing:inherit}[_nghost-%COMP%]{display:flex;flex-direction:column;min-height:100vh}.app-main[_ngcontent-%COMP%]{flex:1;display:flex;width:100%}.app-body[_ngcontent-%COMP%]{flex:1;width:100%;display:flex;justify-content:center}.content[_ngcontent-%COMP%]{flex:1;max-width:1200px;padding:2rem}']})};var Qf={},Fo=(()=>{class e{_appId=p(uo);getId(t){return this._appId!=="ng"&&(t+=this._appId),Qf.hasOwnProperty(t)||(Qf[t]=0),`${t}${Qf[t]++}`}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var ta=(()=>{class e{_listeners=[];notify(t,r){for(let o of this._listeners)o(t,r)}listen(t){return this._listeners.push(t),()=>{this._listeners=this._listeners.filter(r=>t!==r)}}ngOnDestroy(){this._listeners=[]}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Yf=new E("CdkAccordion"),zb=(()=>{class e{_stateChanges=new V;_openCloseAllActions=new V;id=p(Fo).getId("cdk-accordion-");multi=!1;openAll(){this.multi&&this._openCloseAllActions.next(!0)}closeAll(){this._openCloseAllActions.next(!1)}ngOnChanges(t){this._stateChanges.next(t)}ngOnDestroy(){this._stateChanges.complete(),this._openCloseAllActions.complete()}static \u0275fac=function(r){return new(r||e)};static \u0275dir=fe({type:e,selectors:[["cdk-accordion"],["","cdkAccordion",""]],inputs:{multi:[2,"multi","multi",Be]},exportAs:["cdkAccordion"],features:[ln([{provide:Yf,useExisting:e}]),yt]})}return e})(),Vb=(()=>{class e{accordion=p(Yf,{optional:!0,skipSelf:!0});_changeDetectorRef=p(un);_expansionDispatcher=p(ta);_openCloseAllSubscription=Z.EMPTY;closed=new K;opened=new K;destroyed=new K;expandedChange=new K;id=p(Fo).getId("cdk-accordion-child-");get expanded(){return this._expanded}set expanded(t){if(this._expanded!==t){if(this._expanded=t,this.expandedChange.emit(t),t){this.opened.emit();let r=this.accordion?this.accordion.id:this.id;this._expansionDispatcher.notify(this.id,r)}else this.closed.emit();this._changeDetectorRef.markForCheck()}}_expanded=!1;get disabled(){return this._disabled()}set disabled(t){this._disabled.set(t)}_disabled=Xe(!1);_removeUniqueSelectionListener=()=>{};constructor(){}ngOnInit(){this._removeUniqueSelectionListener=this._expansionDispatcher.listen((t,r)=>{this.accordion&&!this.accordion.multi&&this.accordion.id===r&&this.id!==t&&(this.expanded=!1)}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions())}ngOnDestroy(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe()}toggle(){this.disabled||(this.expanded=!this.expanded)}close(){this.disabled||(this.expanded=!1)}open(){this.disabled||(this.expanded=!0)}_subscribeToOpenCloseAllActions(){return this.accordion._openCloseAllActions.subscribe(t=>{this.disabled||(this.expanded=t)})}static \u0275fac=function(r){return new(r||e)};static \u0275dir=fe({type:e,selectors:[["cdk-accordion-item"],["","cdkAccordionItem",""]],inputs:{expanded:[2,"expanded","expanded",Be],disabled:[2,"disabled","disabled",Be]},outputs:{closed:"closed",opened:"opened",destroyed:"destroyed",expandedChange:"expandedChange"},exportAs:["cdkAccordionItem"],features:[ln([{provide:Yf,useValue:void 0}])]})}return e})(),Ub=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ce({type:e});static \u0275inj=oe({})}return e})();var na=class{_attachedHost;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},Kf=class extends na{component;viewContainerRef;injector;projectableNodes;constructor(n,t,r,o){super(),this.component=n,this.viewContainerRef=t,this.injector=r,this.projectableNodes=o}},ra=class extends na{templateRef;viewContainerRef;context;injector;constructor(n,t,r,o){super(),this.templateRef=n,this.viewContainerRef=t,this.context=r,this.injector=o}get origin(){return this.templateRef.elementRef}attach(n,t=this.context){return this.context=t,super.attach(n)}detach(){return this.context=void 0,super.detach()}},Jf=class extends na{element;constructor(n){super(),this.element=n instanceof pe?n.nativeElement:n}},Xf=class{_attachedPortal;_disposeFn;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof Kf)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof ra)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof Jf)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}};var Hb=(()=>{class e extends Xf{_moduleRef=p(on,{optional:!0});_document=p(U);_viewContainerRef=p(Ge);_isInitialized=!1;_attachedRef;constructor(){super()}get portal(){return this._attachedPortal}set portal(t){this.hasAttached()&&!t&&!this._isInitialized||(this.hasAttached()&&super.detach(),t&&super.attach(t),this._attachedPortal=t||null)}attached=new K;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(t){t.setAttachedHost(this);let r=t.viewContainerRef!=null?t.viewContainerRef:this._viewContainerRef,o=r.createComponent(t.component,{index:r.length,injector:t.injector||r.injector,projectableNodes:t.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0});return r!==this._viewContainerRef&&this._getRootNode().appendChild(o.hostView.rootNodes[0]),super.setDisposeFn(()=>o.destroy()),this._attachedPortal=t,this._attachedRef=o,this.attached.emit(o),o}attachTemplatePortal(t){t.setAttachedHost(this);let r=this._viewContainerRef.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=t,this._attachedRef=r,this.attached.emit(r),r}attachDomPortal=t=>{let r=t.element;r.parentNode;let o=this._document.createComment("dom-portal");t.setAttachedHost(this),r.parentNode.insertBefore(o,r),this._getRootNode().appendChild(r),this._attachedPortal=t,super.setDisposeFn(()=>{o.parentNode&&o.parentNode.replaceChild(r,o)})};_getRootNode(){let t=this._viewContainerRef.element.nativeElement;return t.nodeType===t.ELEMENT_NODE?t:t.parentNode}static \u0275fac=function(r){return new(r||e)};static \u0275dir=fe({type:e,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[gr]})}return e})();var qb=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ce({type:e});static \u0275inj=oe({})}return e})();function $b(e){return e.buttons===0||e.detail===0}function Gb(e){let n=e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var em;function ZM(){if(em==null){let e=typeof document<"u"?document.head:null;em=!!(e&&(e.createShadowRoot||e.attachShadow))}return em}function Wb(e){if(ZM()){let n=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function ko(e){return e.composedPath?e.composedPath()[0]:e.target}var tm;try{tm=typeof Intl<"u"&&Intl.v8BreakIterator}catch{tm=!1}var xr=(()=>{class e{_platformId=p(Fn);isBrowser=this._platformId?Ey(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||tm)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var oa;function QM(){if(oa==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>oa=!0}))}finally{oa=oa||!1}return oa}function Zb(e){return QM()?e:!!e.capture}function Kc(e){return e instanceof pe?e.nativeElement:e}var Qb=new E("cdk-input-modality-detector-options"),Yb={ignoreKeys:[18,17,224,91,16]},Kb=650,nm={passive:!0,capture:!0},Jb=(()=>{class e{_platform=p(xr);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new ve(null);_options;_lastTouchMs=0;_onKeydown=t=>{this._options?.ignoreKeys?.some(r=>r===t.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=ko(t))};_onMousedown=t=>{Date.now()-this._lastTouchMs<Kb||(this._modality.next($b(t)?"keyboard":"mouse"),this._mostRecentTarget=ko(t))};_onTouchstart=t=>{if(Gb(t)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=ko(t)};constructor(){let t=p(q),r=p(U),o=p(Qb,{optional:!0});if(this._options=y(y({},Yb),o),this.modalityDetected=this._modality.pipe($o(1)),this.modalityChanged=this.modalityDetected.pipe(Ol()),this._platform.isBrowser){let i=p(rn).createRenderer(null,null);this._listenerCleanups=t.runOutsideAngular(()=>[i.listen(r,"keydown",this._onKeydown,nm),i.listen(r,"mousedown",this._onMousedown,nm),i.listen(r,"touchstart",this._onTouchstart,nm)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(t=>t())}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),ia=(function(e){return e[e.IMMEDIATE=0]="IMMEDIATE",e[e.EVENTUAL=1]="EVENTUAL",e})(ia||{}),Xb=new E("cdk-focus-monitor-default-options"),Jc=Zb({passive:!0,capture:!0}),rm=(()=>{class e{_ngZone=p(q);_platform=p(xr);_inputModalityDetector=p(Jb);_origin=null;_lastFocusOrigin;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=p(U);_stopInputModalityDetector=new V;constructor(){let t=p(Xb,{optional:!0});this._detectionMode=t?.detectionMode||ia.IMMEDIATE}_rootNodeFocusAndBlurListener=t=>{let r=ko(t);for(let o=r;o;o=o.parentElement)t.type==="focus"?this._onFocus(t,o):this._onBlur(t,o)};monitor(t,r=!1){let o=Kc(t);if(!this._platform.isBrowser||o.nodeType!==1)return T();let i=Wb(o)||this._document,a=this._elementInfo.get(o);if(a)return r&&(a.checkChildren=!0),a.subject;let s={checkChildren:r,subject:new V,rootNode:i};return this._elementInfo.set(o,s),this._registerGlobalListeners(s),s.subject}stopMonitoring(t){let r=Kc(t),o=this._elementInfo.get(r);o&&(o.subject.complete(),this._setClasses(r),this._elementInfo.delete(r),this._removeGlobalListeners(o))}focusVia(t,r,o){let i=Kc(t),a=this._document.activeElement;i===a?this._getClosestElementsInfo(i).forEach(([s,c])=>this._originChanged(s,r,c)):(this._setOrigin(r),typeof i.focus=="function"&&i.focus(o))}ngOnDestroy(){this._elementInfo.forEach((t,r)=>this.stopMonitoring(r))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(t){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(t)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:t&&this._isLastInteractionFromInputLabel(t)?"mouse":"program"}_shouldBeAttributedToTouch(t){return this._detectionMode===ia.EVENTUAL||!!t?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(t,r){t.classList.toggle("cdk-focused",!!r),t.classList.toggle("cdk-touch-focused",r==="touch"),t.classList.toggle("cdk-keyboard-focused",r==="keyboard"),t.classList.toggle("cdk-mouse-focused",r==="mouse"),t.classList.toggle("cdk-program-focused",r==="program")}_setOrigin(t,r=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=t,this._originFromTouchInteraction=t==="touch"&&r,this._detectionMode===ia.IMMEDIATE){clearTimeout(this._originTimeoutId);let o=this._originFromTouchInteraction?Kb:1;this._originTimeoutId=setTimeout(()=>this._origin=null,o)}})}_onFocus(t,r){let o=this._elementInfo.get(r),i=ko(t);!o||!o.checkChildren&&r!==i||this._originChanged(r,this._getFocusOrigin(i),o)}_onBlur(t,r){let o=this._elementInfo.get(r);!o||o.checkChildren&&t.relatedTarget instanceof Node&&r.contains(t.relatedTarget)||(this._setClasses(r),this._emitOrigin(o,null))}_emitOrigin(t,r){t.subject.observers.length&&this._ngZone.run(()=>t.subject.next(r))}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;let r=t.rootNode,o=this._rootNodeFocusListenerCount.get(r)||0;o||this._ngZone.runOutsideAngular(()=>{r.addEventListener("focus",this._rootNodeFocusAndBlurListener,Jc),r.addEventListener("blur",this._rootNodeFocusAndBlurListener,Jc)}),this._rootNodeFocusListenerCount.set(r,o+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(_n(this._stopInputModalityDetector)).subscribe(i=>{this._setOrigin(i,!0)}))}_removeGlobalListeners(t){let r=t.rootNode;if(this._rootNodeFocusListenerCount.has(r)){let o=this._rootNodeFocusListenerCount.get(r);o>1?this._rootNodeFocusListenerCount.set(r,o-1):(r.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Jc),r.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Jc),this._rootNodeFocusListenerCount.delete(r))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(t,r,o){this._setClasses(t,r),this._emitOrigin(o,r),this._lastFocusOrigin=r}_getClosestElementsInfo(t){let r=[];return this._elementInfo.forEach((o,i)=>{(i===t||o.checkChildren&&i.contains(t))&&r.push([i,o])}),r}_isLastInteractionFromInputLabel(t){let{_mostRecentTarget:r,mostRecentModality:o}=this._inputModalityDetector;if(o!=="mouse"||!r||r===t||t.nodeName!=="INPUT"&&t.nodeName!=="TEXTAREA"||t.disabled)return!1;let i=t.labels;if(i){for(let a=0;a<i.length;a++)if(i[a].contains(r))return!0}return!1}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Xc=new WeakMap,om=(()=>{class e{_appRef;_injector=p(me);_environmentInjector=p(ie);load(t){let r=this._appRef=this._appRef||this._injector.get(bt),o=Xc.get(r);o||(o={loaders:new Set,refs:[]},Xc.set(r,o),r.onDestroy(()=>{Xc.get(r)?.refs.forEach(i=>i.destroy()),Xc.delete(r)})),o.loaders.has(t)||(o.loaders.add(t),o.refs.push(Wp(t,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function im(e){return Array.isArray(e)?e:[e]}var eE=new Set,Rr,el=(()=>{class e{_platform=p(xr);_nonce=p(po,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):KM}matchMedia(t){return(this._platform.WEBKIT||this._platform.BLINK)&&YM(t,this._nonce),this._matchMedia(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function YM(e,n){if(!eE.has(e))try{Rr||(Rr=document.createElement("style"),n&&Rr.setAttribute("nonce",n),Rr.setAttribute("type","text/css"),document.head.appendChild(Rr)),Rr.sheet&&(Rr.sheet.insertRule(`@media ${e} {body{ }}`,0),eE.add(e))}catch(t){console.error(t)}}function KM(e){return{matches:e==="all"||e==="",media:e,addListener:()=>{},removeListener:()=>{}}}var am=(()=>{class e{_mediaMatcher=p(el);_zone=p(q);_queries=new Map;_destroySubject=new V;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(t){return tE(im(t)).some(o=>this._registerQuery(o).mql.matches)}observe(t){let o=tE(im(t)).map(a=>this._registerQuery(a).observable),i=Jn(o);return i=yn(i.pipe(Oe(1)),i.pipe($o(1),qo(0))),i.pipe(A(a=>{let s={matches:!1,breakpoints:{}};return a.forEach(({matches:c,query:l})=>{s.matches=s.matches||c,s.breakpoints[l]=c}),s}))}_registerQuery(t){if(this._queries.has(t))return this._queries.get(t);let r=this._mediaMatcher.matchMedia(t),i={observable:new B(a=>{let s=c=>this._zone.run(()=>a.next(c));return r.addListener(s),()=>{r.removeListener(s)}}).pipe(Cn(r),A(({matches:a})=>({query:t,matches:a})),_n(this._destroySubject)),mql:r};return this._queries.set(t,i),i}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function tE(e){return e.map(n=>n.split(",")).reduce((n,t)=>n.concat(t)).map(n=>n.trim())}var Gn=(function(e){return e[e.NONE=0]="NONE",e[e.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",e[e.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",e})(Gn||{}),nE="cdk-high-contrast-black-on-white",rE="cdk-high-contrast-white-on-black",sm="cdk-high-contrast-active",cm=(()=>{class e{_platform=p(xr);_hasCheckedHighContrastMode;_document=p(U);_breakpointSubscription;constructor(){this._breakpointSubscription=p(am).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return Gn.NONE;let t=this._document.createElement("div");t.style.backgroundColor="rgb(1,2,3)",t.style.position="absolute",this._document.body.appendChild(t);let r=this._document.defaultView||window,o=r&&r.getComputedStyle?r.getComputedStyle(t):null,i=(o&&o.backgroundColor||"").replace(/ /g,"");switch(t.remove(),i){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return Gn.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return Gn.BLACK_ON_WHITE}return Gn.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let t=this._document.body.classList;t.remove(sm,nE,rE),this._hasCheckedHighContrastMode=!0;let r=this.getHighContrastMode();r===Gn.BLACK_ON_WHITE?t.add(sm,nE):r===Gn.WHITE_ON_BLACK&&t.add(sm,rE)}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var JM=200,tl=class{_letterKeyStream=new V;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new V;selectedItem=this._selectedItem;constructor(n,t){let r=typeof t?.debounceInterval=="number"?t.debounceInterval:JM;t?.skipPredicate&&(this._skipPredicateFn=t.skipPredicate),this.setItems(n),this._setupKeyHandler(r)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n}setItems(n){this._items=n}handleKey(n){let t=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(t>=65&&t<=90||t>=48&&t<=57)&&this._letterKeyStream.next(String.fromCharCode(t))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(n){this._letterKeyStream.pipe(re(t=>this._pressedLetters.push(t)),qo(n),te(()=>this._pressedLetters.length>0),A(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(t=>{for(let r=1;r<this._items.length+1;r++){let o=(this._selectedItemIndex+r)%this._items.length,i=this._items[o];if(!this._skipPredicateFn?.(i)&&i.getLabel?.().toLocaleUpperCase().trim().indexOf(t)===0){this._selectedItem.next(i);break}}this._pressedLetters=[]})}};function nl(e,...n){return n.length?n.some(t=>e[t]):e.altKey||e.shiftKey||e.ctrlKey||e.metaKey}var rl=class{_items;_activeItemIndex=Xe(-1);_activeItem=Xe(null);_wrap=!1;_typeaheadSubscription=Z.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,t){this._items=n,n instanceof en?this._itemChangesSubscription=n.changes.subscribe(r=>this._itemsChanged(r.toArray())):ci(n)&&(this._effectRef=Fp(()=>this._itemsChanged(n()),{injector:t}))}tabOut=new V;change=new V;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=!0){return this._wrap=n,this}withVerticalOrientation(n=!0){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let t=this._getItemsArray();return this._typeahead=new tl(t,{debounceInterval:typeof n=="number"?n:void 0,skipPredicate:r=>this._skipPredicateFn(r)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(r=>{this.setActiveItem(r)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=!0){return this._homeAndEnd=n,this}withPageUpDown(n=!0,t=10){return this._pageUpAndDown={enabled:n,delta:t},this}setActiveItem(n){let t=this._activeItem();this.updateActiveItem(n),this._activeItem()!==t&&this.change.next(this._activeItemIndex())}onKeydown(n){let t=n.keyCode,o=["altKey","ctrlKey","metaKey","shiftKey"].every(i=>!n[i]||this._allowedModifierKeys.indexOf(i)>-1);switch(t){case 9:this.tabOut.next();return;case 40:if(this._vertical&&o){this.setNextItemActive();break}else return;case 38:if(this._vertical&&o){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&o){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&o){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&o){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&o){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&o){let i=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(i>0?i:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&o){let i=this._activeItemIndex()+this._pageUpAndDown.delta,a=this._getItemsArray().length;this._setActiveItemByIndex(i<a?i:a-1,-1);break}else return;default:(o||nl(n,"shiftKey"))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(n){let t=this._getItemsArray(),r=typeof n=="number"?n:t.indexOf(n),o=t[r];this._activeItem.set(o??null),this._activeItemIndex.set(r),this._typeahead?.setCurrentSelectedItemIndex(r)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n)}_setActiveInWrapMode(n){let t=this._getItemsArray();for(let r=1;r<=t.length;r++){let o=(this._activeItemIndex()+n*r+t.length)%t.length,i=t[o];if(!this._skipPredicateFn(i)){this.setActiveItem(o);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n)}_setActiveItemByIndex(n,t){let r=this._getItemsArray();if(r[n]){for(;this._skipPredicateFn(r[n]);)if(n+=t,!r[n])return;this.setActiveItem(n)}}_getItemsArray(){return ci(this._items)?this._items():this._items instanceof en?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let t=this._activeItem();if(t){let r=n.indexOf(t);r>-1&&r!==this._activeItemIndex()&&(this._activeItemIndex.set(r),this._typeahead?.setCurrentSelectedItemIndex(r))}}};var aa=class extends rl{_origin="program";setFocusOrigin(n){return this._origin=n,this}setActiveItem(n){super.setActiveItem(n),this.activeItem&&this.activeItem.focus(this._origin)}};var XM=new E("MATERIAL_ANIMATIONS");var oE=null;function eS(){return p(XM,{optional:!0})?.animationsDisabled||p(jd,{optional:!0})==="NoopAnimations"?"di-disabled":(oE??=p(el).matchMedia("(prefers-reduced-motion)").matches,oE?"reduced-motion":"enabled")}function iE(){return eS()!=="enabled"}var aE=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=ue({type:e,selectors:[["structural-styles"]],decls:0,vars:0,template:function(r,o){},styles:[`.mat-focus-indicator{position:relative}.mat-focus-indicator::before{top:0;left:0;right:0;bottom:0;position:absolute;box-sizing:border-box;pointer-events:none;display:var(--mat-focus-indicator-display, none);border-width:var(--mat-focus-indicator-border-width, 3px);border-style:var(--mat-focus-indicator-border-style, solid);border-color:var(--mat-focus-indicator-border-color, transparent);border-radius:var(--mat-focus-indicator-border-radius, 4px)}.mat-focus-indicator:focus::before{content:""}@media(forced-colors: active){html{--mat-focus-indicator-display: block}}
`],encapsulation:2,changeDetection:0})}return e})();var lm=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ce({type:e});static \u0275inj=oe({})}return e})();var sa=(()=>{class e{constructor(){p(cm)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(r){return new(r||e)};static \u0275mod=ce({type:e});static \u0275inj=oe({imports:[lm,lm]})}return e})();var rS=["body"],oS=["bodyWrapper"],iS=[[["mat-expansion-panel-header"]],"*",[["mat-action-row"]]],aS=["mat-expansion-panel-header","*","mat-action-row"];function sS(e,n){}var cS=[[["mat-panel-title"]],[["mat-panel-description"]],"*"],lS=["mat-panel-title","mat-panel-description","*"];function uS(e,n){e&1&&(nt(0,"span",1),ss(),nt(1,"svg",2),ec(2,"path",3),Ct()())}var um=new E("MAT_ACCORDION"),sE=new E("MAT_EXPANSION_PANEL"),dS=(()=>{class e{_template=p(vt);_expansionPanel=p(sE,{optional:!0});constructor(){}static \u0275fac=function(r){return new(r||e)};static \u0275dir=fe({type:e,selectors:[["ng-template","matExpansionPanelContent",""]]})}return e})(),cE=new E("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS"),dm=(()=>{class e extends Vb{_viewContainerRef=p(Ge);_animationsDisabled=iE();_document=p(U);_ngZone=p(q);_elementRef=p(pe);_renderer=p(kn);_cleanupTransitionEnd;get hideToggle(){return this._hideToggle||this.accordion&&this.accordion.hideToggle}set hideToggle(t){this._hideToggle=t}_hideToggle=!1;get togglePosition(){return this._togglePosition||this.accordion&&this.accordion.togglePosition}set togglePosition(t){this._togglePosition=t}_togglePosition;afterExpand=new K;afterCollapse=new K;_inputChanges=new V;accordion=p(um,{optional:!0,skipSelf:!0});_lazyContent;_body;_bodyWrapper;_portal;_headerId=p(Fo).getId("mat-expansion-panel-header-");constructor(){super();let t=p(cE,{optional:!0});this._expansionDispatcher=p(ta),t&&(this.hideToggle=t.hideToggle)}_hasSpacing(){return this.accordion?this.expanded&&this.accordion.displayMode==="default":!1}_getExpandedState(){return this.expanded?"expanded":"collapsed"}toggle(){this.expanded=!this.expanded}close(){this.expanded=!1}open(){this.expanded=!0}ngAfterContentInit(){this._lazyContent&&this._lazyContent._expansionPanel===this&&this.opened.pipe(Cn(null),te(()=>this.expanded&&!this._portal),Oe(1)).subscribe(()=>{this._portal=new ra(this._lazyContent._template,this._viewContainerRef)}),this._setupAnimationEvents()}ngOnChanges(t){this._inputChanges.next(t)}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTransitionEnd?.(),this._inputChanges.complete()}_containsFocus(){if(this._body){let t=this._document.activeElement,r=this._body.nativeElement;return t===r||r.contains(t)}return!1}_transitionEndListener=({target:t,propertyName:r})=>{t===this._bodyWrapper?.nativeElement&&r==="grid-template-rows"&&this._ngZone.run(()=>{this.expanded?this.afterExpand.emit():this.afterCollapse.emit()})};_setupAnimationEvents(){this._ngZone.runOutsideAngular(()=>{this._animationsDisabled?(this.opened.subscribe(()=>this._ngZone.run(()=>this.afterExpand.emit())),this.closed.subscribe(()=>this._ngZone.run(()=>this.afterCollapse.emit()))):setTimeout(()=>{let t=this._elementRef.nativeElement;this._cleanupTransitionEnd=this._renderer.listen(t,"transitionend",this._transitionEndListener),t.classList.add("mat-expansion-panel-animations-enabled")},200)})}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=ue({type:e,selectors:[["mat-expansion-panel"]],contentQueries:function(r,o,i){if(r&1&&Mi(i,dS,5),r&2){let a;yr(a=br())&&(o._lazyContent=a.first)}},viewQuery:function(r,o){if(r&1&&(tc(rS,5),tc(oS,5)),r&2){let i;yr(i=br())&&(o._body=i.first),yr(i=br())&&(o._bodyWrapper=i.first)}},hostAttrs:[1,"mat-expansion-panel"],hostVars:4,hostBindings:function(r,o){r&2&&Me("mat-expanded",o.expanded)("mat-expansion-panel-spacing",o._hasSpacing())},inputs:{hideToggle:[2,"hideToggle","hideToggle",Be],togglePosition:"togglePosition"},outputs:{afterExpand:"afterExpand",afterCollapse:"afterCollapse"},exportAs:["matExpansionPanel"],features:[ln([{provide:um,useValue:void 0},{provide:sE,useExisting:e}]),gr,yt],ngContentSelectors:aS,decls:9,vars:4,consts:[["bodyWrapper",""],["body",""],[1,"mat-expansion-panel-content-wrapper"],["role","region",1,"mat-expansion-panel-content",3,"id"],[1,"mat-expansion-panel-body"],[3,"cdkPortalOutlet"]],template:function(r,o){r&1&&(bo(iS),Bt(0),D(1,"div",2,0)(3,"div",3,1)(5,"div",4),Bt(6,1),X(7,sS,0,0,"ng-template",5),h(),Bt(8,2),h()()),r&2&&(_(),Et("inert",o.expanded?null:""),_(2),M("id",o.id),Et("aria-labelledby",o._headerId),_(4),M("cdkPortalOutlet",o._portal))},dependencies:[Hb],styles:[`.mat-expansion-panel{box-sizing:content-box;display:block;margin:0;overflow:hidden;position:relative;background:var(--mat-expansion-container-background-color, var(--mat-sys-surface));color:var(--mat-expansion-container-text-color, var(--mat-sys-on-surface));border-radius:var(--mat-expansion-container-shape, 12px)}.mat-expansion-panel.mat-expansion-panel-animations-enabled{transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:var(--mat-expansion-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:var(--mat-expansion-container-shape, 12px);border-top-left-radius:var(--mat-expansion-container-shape, 12px)}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:var(--mat-expansion-container-shape, 12px);border-bottom-left-radius:var(--mat-expansion-container-shape, 12px)}@media(forced-colors: active){.mat-expansion-panel{outline:solid 1px}}.mat-expansion-panel-content-wrapper{display:grid;grid-template-rows:0fr;grid-template-columns:100%}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content-wrapper{transition:grid-template-rows 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{grid-template-rows:1fr}@supports not (grid-template-rows: 0fr){.mat-expansion-panel-content-wrapper{height:0}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{height:auto}}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible;min-height:0;visibility:hidden;font-family:var(--mat-expansion-container-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-expansion-container-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-expansion-container-text-weight, var(--mat-sys-body-large-weight));line-height:var(--mat-expansion-container-text-line-height, var(--mat-sys-body-large-line-height));letter-spacing:var(--mat-expansion-container-text-tracking, var(--mat-sys-body-large-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content{transition:visibility 190ms linear}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper>.mat-expansion-panel-content{visibility:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px;border-top-color:var(--mat-expansion-actions-divider-color, var(--mat-sys-outline))}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}
`],encapsulation:2,changeDetection:0})}return e})();var pm=(()=>{class e{panel=p(dm,{host:!0});_element=p(pe);_focusMonitor=p(rm);_changeDetectorRef=p(un);_parentChangeSubscription=Z.EMPTY;constructor(){p(om).load(aE);let t=this.panel,r=p(cE,{optional:!0}),o=p(new jn("tabindex"),{optional:!0}),i=t.accordion?t.accordion._stateChanges.pipe(te(a=>!!(a.hideToggle||a.togglePosition))):be;this.tabIndex=parseInt(o||"")||0,this._parentChangeSubscription=Pl(t.opened,t.closed,i,t._inputChanges.pipe(te(a=>!!(a.hideToggle||a.disabled||a.togglePosition)))).subscribe(()=>this._changeDetectorRef.markForCheck()),t.closed.pipe(te(()=>t._containsFocus())).subscribe(()=>this._focusMonitor.focusVia(this._element,"program")),r&&(this.expandedHeight=r.expandedHeight,this.collapsedHeight=r.collapsedHeight)}expandedHeight;collapsedHeight;tabIndex=0;get disabled(){return this.panel.disabled}_toggle(){this.disabled||this.panel.toggle()}_isExpanded(){return this.panel.expanded}_getExpandedState(){return this.panel._getExpandedState()}_getPanelId(){return this.panel.id}_getTogglePosition(){return this.panel.togglePosition}_showToggle(){return!this.panel.hideToggle&&!this.panel.disabled}_getHeaderHeight(){let t=this._isExpanded();return t&&this.expandedHeight?this.expandedHeight:!t&&this.collapsedHeight?this.collapsedHeight:null}_keydown(t){switch(t.keyCode){case 32:case 13:nl(t)||(t.preventDefault(),this._toggle());break;default:this.panel.accordion&&this.panel.accordion._handleHeaderKeydown(t);return}}focus(t,r){t?this._focusMonitor.focusVia(this._element,t,r):this._element.nativeElement.focus(r)}ngAfterViewInit(){this._focusMonitor.monitor(this._element).subscribe(t=>{t&&this.panel.accordion&&this.panel.accordion._handleHeaderFocus(this)})}ngOnDestroy(){this._parentChangeSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._element)}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=ue({type:e,selectors:[["mat-expansion-panel-header"]],hostAttrs:["role","button",1,"mat-expansion-panel-header","mat-focus-indicator"],hostVars:13,hostBindings:function(r,o){r&1&&Re("click",function(){return o._toggle()})("keydown",function(a){return o._keydown(a)}),r&2&&(Et("id",o.panel._headerId)("tabindex",o.disabled?-1:o.tabIndex)("aria-controls",o._getPanelId())("aria-expanded",o._isExpanded())("aria-disabled",o.panel.disabled),nc("height",o._getHeaderHeight()),Me("mat-expanded",o._isExpanded())("mat-expansion-toggle-indicator-after",o._getTogglePosition()==="after")("mat-expansion-toggle-indicator-before",o._getTogglePosition()==="before"))},inputs:{expandedHeight:"expandedHeight",collapsedHeight:"collapsedHeight",tabIndex:[2,"tabIndex","tabIndex",t=>t==null?0:Gp(t)]},ngContentSelectors:lS,decls:5,vars:3,consts:[[1,"mat-content"],[1,"mat-expansion-indicator"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 -960 960 960","aria-hidden","true","focusable","false"],["d","M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"]],template:function(r,o){r&1&&(bo(cS),nt(0,"span",0),Bt(1),Bt(2,1),Bt(3,2),Ct(),Mp(4,uS,3,0,"span",1)),r&2&&(Me("mat-content-hide-toggle",!o._showToggle()),_(4),Ap(o._showToggle()?4:-1))},styles:[`.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;height:var(--mat-expansion-header-collapsed-state-height, 48px);font-family:var(--mat-expansion-header-text-font, var(--mat-sys-title-medium-font));font-size:var(--mat-expansion-header-text-size, var(--mat-sys-title-medium-size));font-weight:var(--mat-expansion-header-text-weight, var(--mat-sys-title-medium-weight));line-height:var(--mat-expansion-header-text-line-height, var(--mat-sys-title-medium-line-height));letter-spacing:var(--mat-expansion-header-text-tracking, var(--mat-sys-title-medium-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-header{transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header::before{border-radius:inherit}.mat-expansion-panel-header.mat-expanded{height:var(--mat-expansion-header-expanded-state-height, 64px)}.mat-expansion-panel-header[aria-disabled=true]{color:var(--mat-expansion-header-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent))}@media(hover: none){.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-container-background-color, var(--mat-sys-surface))}}.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused{background:var(--mat-expansion-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent))}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-content.mat-content-hide-toggle{margin-right:8px}[dir=rtl] .mat-content.mat-content-hide-toggle{margin-right:0;margin-left:8px}.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-right:24px;margin-left:0}.mat-expansion-panel-header-title{color:var(--mat-expansion-header-text-color, var(--mat-sys-on-surface))}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description{color:inherit}.mat-expansion-panel-header-description{flex-grow:2;color:var(--mat-expansion-header-description-color, var(--mat-sys-on-surface-variant))}.mat-expansion-panel-animations-enabled .mat-expansion-indicator{transition:transform 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header.mat-expanded .mat-expansion-indicator{transform:rotate(180deg)}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";padding:3px;transform:rotate(45deg);vertical-align:middle;color:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-legacy-header-indicator-display, none)}.mat-expansion-indicator svg{width:24px;height:24px;margin:0 -8px;vertical-align:middle;fill:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-header-indicator-display, inline-block)}@media(forced-colors: active){.mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}}
`],encapsulation:2,changeDetection:0})}return e})();var lE=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275dir=fe({type:e,selectors:[["mat-panel-title"]],hostAttrs:[1,"mat-expansion-panel-header-title"]})}return e})(),uE=(()=>{class e extends zb{_keyManager;_ownHeaders=new en;_headers;hideToggle=!1;displayMode="default";togglePosition="after";ngAfterContentInit(){this._headers.changes.pipe(Cn(this._headers)).subscribe(t=>{this._ownHeaders.reset(t.filter(r=>r.panel.accordion===this)),this._ownHeaders.notifyOnChanges()}),this._keyManager=new aa(this._ownHeaders).withWrap().withHomeAndEnd()}_handleHeaderKeydown(t){this._keyManager.onKeydown(t)}_handleHeaderFocus(t){this._keyManager.updateActiveItem(t)}ngOnDestroy(){super.ngOnDestroy(),this._keyManager?.destroy(),this._ownHeaders.destroy()}static \u0275fac=(()=>{let t;return function(o){return(t||(t=hr(e)))(o||e)}})();static \u0275dir=fe({type:e,selectors:[["mat-accordion"]],contentQueries:function(r,o,i){if(r&1&&Mi(i,pm,5),r&2){let a;yr(a=br())&&(o._headers=a)}},hostAttrs:[1,"mat-accordion"],hostVars:2,hostBindings:function(r,o){r&2&&Me("mat-accordion-multi",o.multi)},inputs:{hideToggle:[2,"hideToggle","hideToggle",Be],displayMode:"displayMode",togglePosition:"togglePosition"},exportAs:["matAccordion"],features:[ln([{provide:um,useExisting:e}]),gr]})}return e})(),dE=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ce({type:e});static \u0275inj=oe({imports:[sa,Ub,qb]})}return e})();var ol;function fS(){if(ol===void 0&&(ol=null,typeof window<"u")){let e=window;e.trustedTypes!==void 0&&(ol=e.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}))}return ol}function ca(e){return fS()?.createHTML(e)||e}function pE(e){return Error(`Unable to find icon with the name "${e}"`)}function mS(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function fE(e){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${e}".`)}function mE(e){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${e}".`)}var mn=class{url;svgText;options;svgElement;constructor(n,t,r){this.url=n,this.svgText=t,this.options=r}},gE=(()=>{class e{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(t,r,o,i){this._httpClient=t,this._sanitizer=r,this._errorHandler=i,this._document=o}addSvgIcon(t,r,o){return this.addSvgIconInNamespace("",t,r,o)}addSvgIconLiteral(t,r,o){return this.addSvgIconLiteralInNamespace("",t,r,o)}addSvgIconInNamespace(t,r,o,i){return this._addSvgIconConfig(t,r,new mn(o,null,i))}addSvgIconResolver(t){return this._resolvers.push(t),this}addSvgIconLiteralInNamespace(t,r,o,i){let a=this._sanitizer.sanitize(Te.HTML,o);if(!a)throw mE(o);let s=ca(a);return this._addSvgIconConfig(t,r,new mn("",s,i))}addSvgIconSet(t,r){return this.addSvgIconSetInNamespace("",t,r)}addSvgIconSetLiteral(t,r){return this.addSvgIconSetLiteralInNamespace("",t,r)}addSvgIconSetInNamespace(t,r,o){return this._addSvgIconSetConfig(t,new mn(r,null,o))}addSvgIconSetLiteralInNamespace(t,r,o){let i=this._sanitizer.sanitize(Te.HTML,r);if(!i)throw mE(r);let a=ca(i);return this._addSvgIconSetConfig(t,new mn("",a,o))}registerFontClassAlias(t,r=t){return this._fontCssClassesByAlias.set(t,r),this}classNameForFontAlias(t){return this._fontCssClassesByAlias.get(t)||t}setDefaultFontSetClass(...t){return this._defaultFontSetClass=t,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(t){let r=this._sanitizer.sanitize(Te.RESOURCE_URL,t);if(!r)throw fE(t);let o=this._cachedIconsByUrl.get(r);return o?T(il(o)):this._loadSvgIconFromConfig(new mn(t,null)).pipe(re(i=>this._cachedIconsByUrl.set(r,i)),A(i=>il(i)))}getNamedSvgIcon(t,r=""){let o=hE(r,t),i=this._svgIconConfigs.get(o);if(i)return this._getSvgFromConfig(i);if(i=this._getIconConfigFromResolvers(r,t),i)return this._svgIconConfigs.set(o,i),this._getSvgFromConfig(i);let a=this._iconSetConfigs.get(r);return a?this._getSvgFromIconSetConfigs(t,a):gn(pE(o))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(t){return t.svgText?T(il(this._svgElementFromConfig(t))):this._loadSvgIconFromConfig(t).pipe(A(r=>il(r)))}_getSvgFromIconSetConfigs(t,r){let o=this._extractIconWithNameFromAnySet(t,r);if(o)return T(o);let i=r.filter(a=>!a.svgText).map(a=>this._loadSvgIconSetFromConfig(a).pipe(st(s=>{let l=`Loading icon set URL: ${this._sanitizer.sanitize(Te.RESOURCE_URL,a.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(l)),T(null)})));return Nl(i).pipe(A(()=>{let a=this._extractIconWithNameFromAnySet(t,r);if(!a)throw pE(t);return a}))}_extractIconWithNameFromAnySet(t,r){for(let o=r.length-1;o>=0;o--){let i=r[o];if(i.svgText&&i.svgText.toString().indexOf(t)>-1){let a=this._svgElementFromConfig(i),s=this._extractSvgIconFromSet(a,t,i.options);if(s)return s}}return null}_loadSvgIconFromConfig(t){return this._fetchIcon(t).pipe(re(r=>t.svgText=r),A(()=>this._svgElementFromConfig(t)))}_loadSvgIconSetFromConfig(t){return t.svgText?T(null):this._fetchIcon(t).pipe(re(r=>t.svgText=r))}_extractSvgIconFromSet(t,r,o){let i=t.querySelector(`[id="${r}"]`);if(!i)return null;let a=i.cloneNode(!0);if(a.removeAttribute("id"),a.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(a,o);if(a.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(a),o);let s=this._svgElementFromString(ca("<svg></svg>"));return s.appendChild(a),this._setSvgAttributes(s,o)}_svgElementFromString(t){let r=this._document.createElement("DIV");r.innerHTML=t;let o=r.querySelector("svg");if(!o)throw Error("<svg> tag not found");return o}_toSvgElement(t){let r=this._svgElementFromString(ca("<svg></svg>")),o=t.attributes;for(let i=0;i<o.length;i++){let{name:a,value:s}=o[i];a!=="id"&&r.setAttribute(a,s)}for(let i=0;i<t.childNodes.length;i++)t.childNodes[i].nodeType===this._document.ELEMENT_NODE&&r.appendChild(t.childNodes[i].cloneNode(!0));return r}_setSvgAttributes(t,r){return t.setAttribute("fit",""),t.setAttribute("height","100%"),t.setAttribute("width","100%"),t.setAttribute("preserveAspectRatio","xMidYMid meet"),t.setAttribute("focusable","false"),r&&r.viewBox&&t.setAttribute("viewBox",r.viewBox),t}_fetchIcon(t){let{url:r,options:o}=t,i=o?.withCredentials??!1;if(!this._httpClient)throw mS();if(r==null)throw Error(`Cannot fetch icon from URL "${r}".`);let a=this._sanitizer.sanitize(Te.RESOURCE_URL,r);if(!a)throw fE(r);let s=this._inProgressUrlFetches.get(a);if(s)return s;let c=this._httpClient.get(a,{responseType:"text",withCredentials:i}).pipe(A(l=>ca(l)),En(()=>this._inProgressUrlFetches.delete(a)),jl());return this._inProgressUrlFetches.set(a,c),c}_addSvgIconConfig(t,r,o){return this._svgIconConfigs.set(hE(t,r),o),this}_addSvgIconSetConfig(t,r){let o=this._iconSetConfigs.get(t);return o?o.push(r):this._iconSetConfigs.set(t,[r]),this}_svgElementFromConfig(t){if(!t.svgElement){let r=this._svgElementFromString(t.svgText);this._setSvgAttributes(r,t.options),t.svgElement=r}return t.svgElement}_getIconConfigFromResolvers(t,r){for(let o=0;o<this._resolvers.length;o++){let i=this._resolvers[o](r,t);if(i)return hS(i)?new mn(i.url,null,i.options):new mn(i,null)}}static \u0275fac=function(r){return new(r||e)(I(yf,8),I(bf),I(U,8),I(De))};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function il(e){return e.cloneNode(!0)}function hE(e,n){return e+":"+n}function hS(e){return!!(e.url&&e.options)}var gS=["*"],vS=new E("MAT_ICON_DEFAULT_OPTIONS"),yS=new E("mat-icon-location",{providedIn:"root",factory:bS});function bS(){let e=p(U),n=e?e.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}var vE=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],ES=vE.map(e=>`[${e}]`).join(", "),CS=/^url\(['"]?#(.*?)['"]?\)$/,yE=(()=>{class e{_elementRef=p(pe);_iconRegistry=p(gE);_location=p(yS);_errorHandler=p(De);_defaultColor;get color(){return this._color||this._defaultColor}set color(t){this._color=t}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(t){t!==this._svgIcon&&(t?this._updateSvgIcon(t):this._svgIcon&&this._clearSvgElement(),this._svgIcon=t)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(t){let r=this._cleanupFontValue(t);r!==this._fontSet&&(this._fontSet=r,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(t){let r=this._cleanupFontValue(t);r!==this._fontIcon&&(this._fontIcon=r,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName;_svgNamespace;_previousPath;_elementsWithExternalReferences;_currentIconFetch=Z.EMPTY;constructor(){let t=p(new jn("aria-hidden"),{optional:!0}),r=p(vS,{optional:!0});r&&(r.color&&(this.color=this._defaultColor=r.color),r.fontSet&&(this.fontSet=r.fontSet)),t||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(t){if(!t)return["",""];let r=t.split(":");switch(r.length){case 1:return["",r[0]];case 2:return r;default:throw Error(`Invalid icon name: "${t}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let t=this._elementsWithExternalReferences;if(t&&t.size){let r=this._location.getPathname();r!==this._previousPath&&(this._previousPath=r,this._prependPathToReferences(r))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(t){this._clearSvgElement();let r=this._location.getPathname();this._previousPath=r,this._cacheChildrenWithExternalReferences(t),this._prependPathToReferences(r),this._elementRef.nativeElement.appendChild(t)}_clearSvgElement(){let t=this._elementRef.nativeElement,r=t.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();r--;){let o=t.childNodes[r];(o.nodeType!==1||o.nodeName.toLowerCase()==="svg")&&o.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let t=this._elementRef.nativeElement,r=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(o=>o.length>0);this._previousFontSetClass.forEach(o=>t.classList.remove(o)),r.forEach(o=>t.classList.add(o)),this._previousFontSetClass=r,this.fontIcon!==this._previousFontIconClass&&!r.includes("mat-ligature-font")&&(this._previousFontIconClass&&t.classList.remove(this._previousFontIconClass),this.fontIcon&&t.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(t){return typeof t=="string"?t.trim().split(" ")[0]:t}_prependPathToReferences(t){let r=this._elementsWithExternalReferences;r&&r.forEach((o,i)=>{o.forEach(a=>{i.setAttribute(a.name,`url('${t}#${a.value}')`)})})}_cacheChildrenWithExternalReferences(t){let r=t.querySelectorAll(ES),o=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let i=0;i<r.length;i++)vE.forEach(a=>{let s=r[i],c=s.getAttribute(a),l=c?c.match(CS):null;if(l){let u=o.get(s);u||(u=[],o.set(s,u)),u.push({name:a,value:l[1]})}})}_updateSvgIcon(t){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),t){let[r,o]=this._splitIconName(t);r&&(this._svgNamespace=r),o&&(this._svgName=o),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(o,r).pipe(Oe(1)).subscribe(i=>this._setSvgElement(i),i=>{let a=`Error retrieving icon ${r}:${o}! ${i.message}`;this._errorHandler.handleError(new Error(a))})}}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=ue({type:e,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(r,o){r&2&&(Et("data-mat-icon-type",o._usingFontIcon()?"font":"svg")("data-mat-icon-name",o._svgName||o.fontIcon)("data-mat-icon-namespace",o._svgNamespace||o.fontSet)("fontIcon",o._usingFontIcon()?o.fontIcon:null),Rp(o.color?"mat-"+o.color:""),Me("mat-icon-inline",o.inline)("mat-icon-no-color",o.color!=="primary"&&o.color!=="accent"&&o.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",Be],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:gS,decls:1,vars:0,template:function(r,o){r&1&&(bo(),Bt(0))},styles:[`mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color, inherit)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}
`],encapsulation:2,changeDetection:0})}return e})(),bE=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ce({type:e});static \u0275inj=oe({imports:[sa,sa]})}return e})();function DS(e,n){if(e&1&&(D(0,"div",1)(1,"h2"),C(2,"Informaci\xF3n general"),h(),D(3,"ul",2)(4,"li")(5,"span",3),C(6,"language"),h(),D(7,"strong"),C(8,"Idioma:"),h(),C(9),h(),D(10,"li")(11,"span",3),C(12,"payments"),h(),D(13,"strong"),C(14,"Moneda:"),h(),C(15),h(),D(16,"li")(17,"span",3),C(18,"schedule"),h(),D(19,"strong"),C(20,"Hora:"),h(),C(21),h(),D(22,"li")(23,"span",3),C(24,"wifi"),h(),D(25,"strong"),C(26,"Internet:"),h(),C(27),h(),D(28,"li")(29,"span",3),C(30,"power"),h(),D(31,"strong"),C(32,"Electricidad:"),h(),C(33),h(),D(34,"li")(35,"span",3),C(36,"badge"),h(),D(37,"strong"),C(38,"Pasaporte:"),h(),C(39),h(),D(40,"li")(41,"span",3),C(42,"assignment_turned_in"),h(),D(43,"strong"),C(44,"Visado:"),h(),C(45),h(),D(46,"li")(47,"span",3),C(48,"health_and_safety"),h(),D(49,"strong"),C(50,"Vacunas:"),h(),C(51),h()()()),e&2){let t=H();_(9),le(" ",t.infoGeneral.idioma," "),_(6),le(" ",t.infoGeneral.moneda," "),_(6),le(" ",t.infoGeneral.hora," "),_(6),le(" ",t.infoGeneral.internet," "),_(6),le(" ",t.infoGeneral.electricidad," "),_(6),le(" ",t.infoGeneral.pasaporte," "),_(6),le(" ",t.infoGeneral.visado," "),_(6),le(" ",t.infoGeneral.vacunas," ")}}var al=class e{infoGeneral;static \u0275fac=function(t){return new(t||e)};static \u0275cmp=ue({type:e,selectors:[["app-info-general"]],inputs:{infoGeneral:"infoGeneral"},decls:1,vars:1,consts:[["class","info-container",4,"ngIf"],[1,"info-container"],[1,"info-list"],[1,"material-icons"]],template:function(t,r){t&1&&X(0,DS,52,8,"div",0),t&2&&M("ngIf",r.infoGeneral)},dependencies:[We,dn],styles:[".info-container[_ngcontent-%COMP%]{margin:30px 0;padding:24px;border-radius:14px;background:linear-gradient(135deg,#fff,#f6f8fa);box-shadow:0 8px 25px #0000001f}.info-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:20px;font-size:1.6rem;text-align:center}.info-list[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;align-items:center;gap:14px;padding:14px;border-radius:10px;background:#ffffffd9;box-shadow:0 2px 6px #00000014}.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:28px;color:#2c7be5}.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;font-size:.85rem;color:#555}.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.95rem;color:#222}"]})};var EE={production:!1,cloudinary:{cloudName:"dre38ikvk",uploadPreset:"aventourarte_unsigned",baseFolder:"aventourarte"}};var Lo=class e{cloud=EE.cloudinary.cloudName;url(n,t={}){if(!n)return"";if(!n.startsWith("cld:"))return n;let r=n.replace(/^cld:/,"").replace(/^\/+/,""),o=t.quality??"auto",i=t.format??"auto",a=[`q_${o}`,`f_${i}`];t.dpr&&a.push(`dpr_${t.dpr}`),t.w&&a.push(`w_${t.w}`),t.h&&a.push(`h_${t.h}`),t.crop&&a.push(`c_${t.crop}`),t.gravity&&a.push(`g_${t.gravity}`),t.effect&&a.push(`e_${t.effect}`);let s=a.join(",");return`https://res.cloudinary.com/${this.cloud}/image/upload/${s}/${r}`}background(n,t,r){let o=t?1400:2600;return this.url(n,{w:o,crop:"scale",quality:"auto",format:"auto",dpr:"auto"})}static \u0275fac=function(t){return new(t||e)};static \u0275prov=v({token:e,factory:e.\u0275fac,providedIn:"root"})};var sl=class e{constructor(n){this.img=n}transform(n,t,r,o="fit"){return this.img.url(n,{w:t,h:r,crop:o,quality:"auto",format:"auto"})}static \u0275fac=function(t){return new(t||e)(J(Lo,16))};static \u0275pipe=Zs({name:"imgUrl",type:e,pure:!0})};var _E={path:"europa/espana/andalucia/cadiz/jerez-de-la-frontera",nombre:"Jerez de la Frontera",flag:"assets/europa/espana/andalucia/cadiz/jerez/jerez-flag.png",descripcion:"Ciudad de Andaluc\xEDa famosa por su vino, flamenco y caballos.",fotos:["assets/jerez1.jpg","assets/jerez2.jpg","assets/jerez3.jpg"],secciones:[{titulo:"Historia",contenido:"Jerez de la Frontera tiene ra\xEDces fenicias, romanas y musulmanas. Integrada en la Corona de Castilla, se consolid\xF3 por su tradici\xF3n vin\xEDcola y ecuestre."},{titulo:"Geograf\xEDa y Clima",contenido:"Situada en la campi\xF1a gaditana, Jerez disfruta de veranos calurosos e inviernos suaves, ideales para los vi\xF1edos y la cr\xEDa de caballos."},{titulo:"Qu\xE9 visitar",lugares:[{nombre:"Catedral de Jerez",descripcion:"Imponente catedral g\xF3tica-renacentista situada en el centro hist\xF3rico de la ciudad.",foto:"assets/jerez_catedral.jpg",horario:"10:00 - 18:00",precio:"5\u20AC entrada"},{nombre:"Alc\xE1zar de Jerez",descripcion:"Antigua fortaleza isl\xE1mica con jardines y patios que reflejan la historia musulmana de la ciudad.",foto:"assets/jerez_alcazar.jpg",horario:"09:00 - 17:00",precio:"4\u20AC entrada"},{nombre:"Bodegas T\xEDo Pepe",descripcion:"Famosas bodegas donde se produce el mundialmente conocido vino de Jerez.",foto:"assets/jerez_bodega.jpg",horario:"09:00 - 19:00",precio:"Tour 12\u20AC"},{nombre:"Plaza del Arenal",descripcion:"Plaza central de Jerez, punto de encuentro de locales y turistas, rodeada de caf\xE9s y monumentos.",foto:"assets/jerez_arenal.jpg",horario:"Abierto todo el d\xEDa",precio:"Gratis"}]},{titulo:"Gastronom\xEDa",platos:[{nombre:"Vino Fino",descripcion:"Vino t\xEDpico de Jerez, seco y con car\xE1cter \xFAnico, ideal para tapas.",foto:"assets/jerez_vino.jpg",precio:"3\u20AC copa"},{nombre:"Rabo de Toro",descripcion:"Plato tradicional guisado lentamente, muy sabroso y caracter\xEDstico de la zona.",foto:"assets/jerez_rabo.jpg",precio:"12-15\u20AC"},{nombre:"Tortillitas de Camarones",descripcion:"Deliciosas tortillitas crujientes con sabor a marisco.",foto:"assets/jerez_tortillitas.jpg",precio:"6-8\u20AC"}]},{titulo:"Cultura y Tradiciones",contenido:"Jerez es famoso por el flamenco, la Feria del Caballo, las pe\xF1as flamencas y la Semana Santa, adem\xE1s de su vinculaci\xF3n con los caballos andaluces."}]};var DE={path:"europa/espana/andalucia/cadiz/trebujena",nombre:"Trebujena",flag:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",background:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",bgPos:"50% 65%",bgPosMobile:"50% 65%",bgDim:.1,flagOpacity:.12,flagOpacityMobile:.18,flagSize:"75%",flagSizeMobile:"50%",bgSize:"cover",bgSizeMobile:"cover",descripcion:"Trebujena es un municipio gaditano situado junto al r\xEDo Guadalquivir y las marismas de Do\xF1ana. Con una fuerte identidad agr\xEDcola y popular, es conocida por su vino mosto, sus fiestas singulares, su paisaje natural y su car\xE1cter aut\xE9ntico.",secciones:[{titulo:"Historia",contenido:"Trebujena cuenta con or\xEDgenes romanos y andalus\xEDes, favorecidos por la fertilidad de las tierras del bajo Guadalquivir. Durante siglos fue un n\xFAcleo agr\xEDcola ligado a la vid y al cereal, desarrollando una identidad propia muy marcada que a\xFAn se conserva en sus tradiciones, fiestas y forma de vida."},{titulo:"Geograf\xEDa y Clima",contenido:"Situada en el noroeste de la provincia de C\xE1diz, Trebujena se extiende entre el r\xEDo Guadalquivir y las marismas. Disfruta de un clima mediterr\xE1neo con influencia atl\xE1ntica, con veranos c\xE1lidos pero suavizados por la brisa y inviernos templados."},{titulo:"Qu\xE9 visitar en Trebujena",lugares:[{nombre:"Monumento a la Vendimia",descripcion:"Escultura que rinde homenaje a la tradici\xF3n vitivin\xEDcola del municipio y al trabajo agr\xEDcola vinculado al mosto.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/monumento-vendimia"},{nombre:"Plaza de Espa\xF1a",descripcion:"Centro neur\xE1lgico del municipio, punto de encuentro social donde se celebran actos, fiestas y la vida cotidiana del pueblo.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/plz-espana"},{nombre:"Ayuntamiento de Trebujena",descripcion:"Edificio institucional situado en la Plaza de Espa\xF1a con fachada acad\xE9mica inspirada en el estilo neocl\xE1sico, estructurado en dos cuerpos bien proporcionados. Representa el coraz\xF3n de la vida administrativa y social del municipio y se encuentra junto a la emblem\xE1tica Parroquia de la Pur\xEDsima Concepci\xF3n, construida en el siglo XVII.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/ayto-trebujena",horario:"Exterior visitable"},{nombre:"Parroquia de la Pur\xEDsima Concepci\xF3n",descripcion:"Principal templo religioso de Trebujena. De estilo barroco, es uno de los edificios m\xE1s representativos del patrimonio hist\xF3rico y espiritual del pueblo.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/iglesia-purisima-concepcion",horario:"Horario de culto",precio:"Gratis"},{nombre:"Palomar",descripcion:"Edificaci\xF3n tradicional de mamposter\xEDa y planta cil\xEDndrica, situada en las proximidades de la Avenida del Guadalquivir. Destaca por su segundo cuerpo cil\xEDndrico con orificios de cer\xE1mica destinados a la entrada de palomas, siendo considerado uno de los palomares m\xE1s interesantes de Andaluc\xEDa.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/palomar",horario:"Exterior visitable"},{nombre:"Castillo de P\xE9rez de Guzm\xE1n",descripcion:"Fortificaci\xF3n medieval construida entre los siglos XIII y comienzos del XIV, con origen en una antigua torre vig\xEDa integrada en una red defensiva que controlaba el territorio y el r\xEDo Guadalquivir. A finales del siglo XIII, Alonso P\xE9rez de Guzm\xE1n \u201CGuzm\xE1n el Bueno\u201D impuls\xF3 su transformaci\xF3n en castillo para asegurar el dominio militar y econ\xF3mico de la zona.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/castillo-trebujena",horario:"Lunes a viernes de 10:00 a 14:00",precio:"Gratis"},{nombre:"Parque de la Toya",descripcion:"Parque urbano situado en la parte m\xE1s oriental del casco urbano de Trebujena. De forma alargada y cerrado con rejer\xEDa tradicional, es el principal pulm\xF3n verde del municipio y uno de sus espacios sociales m\xE1s importantes. Uno de sus mayores atractivos es la presencia de fauna urbana: pavos reales que campan libremente por el parque, patos, gallinas y otras aves, lo que lo convierte en un lugar especialmente agradable para pasear y para visitar con ni\xF1os.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/parque-toya",horario:"Abierto todo el d\xEDa",precio:"Gratis"},{nombre:"Ermita de Nuestra Se\xF1ora de Palomares",descripcion:"Templo situado en las afueras del casco urbano, muy ligado a la historia agr\xEDcola y espiritual de Trebujena. Est\xE1 dedicado a la Virgen de Palomares, patrona de la ciudad y es un lugar de especial devoci\xF3n popular, especialmente durante celebraciones y romer\xEDas locales.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/ermita-palomares",horario:"Horario de culto y eventos puntuales",precio:"Gratis"},{nombre:"Ruinas del Molino de las Haciendas",descripcion:"Restos de uno de los mayores molinos de aceite de la zona, situado a unos 2 km del casco urbano en el Camino de las Haciendas. Destaca un gran torre\xF3n de unos 10 metros de altura, visible desde varios puntos, junto a lienzos de muralla y restos de la construcci\xF3n original. Testimonio del pasado agr\xEDcola e industrial de Trebujena.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/molino-haciendas",horario:"Acceso libre",precio:"Gratis"},{nombre:"Puesta de sol en las Marismas de Trebujena",descripcion:"Uno de los atardeceres m\xE1s espectaculares del Bajo Guadalquivir. Este paisaje fue escenario del rodaje de la pel\xEDcula \u201CEl Imperio del Sol\u201D.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/marismas",horario:"Atardecer",precio:"Gratis"}]},{titulo:"Gastronom\xEDa",platos:[{nombre:"Mosto de Trebujena",descripcion:"Vino joven (mosto) elaborado de forma tradicional. Se consume principalmente en invierno en los \u201Cmostos\u201D del pueblo, acompa\xF1ado de tapas y ambiente popular.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/mosto",precio:"1,50 \u2013 2,50 \u20AC vaso"},{nombre:"Trebujito",descripcion:"Bebida t\xEDpica festiva elaborada con vino blanco joven del Marco de Jerez, refresco de lima-lim\xF3n y hielo. Muy refrescante y protagonista en ferias y fiestas como el Trebufest.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",precio:"2,50 \u2013 5 \u20AC"},{nombre:"Tortillitas de camarones",descripcion:"Plato emblem\xE1tico de la cocina ribere\xF1a. Tortillas finas y crujientes elaboradas con camarones del Guadalquivir, harina, cebolla y perejil.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/tortillita-camarones",precio:"1,90\u20AC/unidad"},{nombre:"Angulas",descripcion:"Producto hist\xF3rico ligado al r\xEDo Guadalquivir. Consideradas un manjar, tradicionalmente formaron parte de la econom\xEDa y gastronom\xEDa local.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",precio:"Seg\xFAn temporada y mercado"},{nombre:"Potaje con cardillos",descripcion:"Guiso de temporada elaborado con legumbres y cardillos silvestres, t\xEDpico de la cocina tradicional del entorno rural.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",precio:"8 \u2013 12 \u20AC"},{nombre:"Ajo caliente",descripcion:"Receta humilde y contundente elaborada con pan, ajo, piment\xF3n, aceite y caldo. Muy ligada a la cocina tradicional campesina.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/ajo-caliente",precio:"4 - 6\u20AC"},{nombre:"Garbanzos como conejos",descripcion:"Plato popular de garbanzos guisados con arroz. Recibe su nombre porque, en tiempos de escasez, los garbanzos \u201Chac\xEDan de conejo\u201D. Es el plato estrella de la fiesta gastron\xF3mica de diciembre.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/garbanzos-conejos",precio:"Gratis en su fiesta"},{nombre:"Uvas Palominos",descripcion:"Postre tradicional elaborado a partir de la uva Palomino, s\xEDmbolo de la cultura vitivin\xEDcola de Trebujena.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",precio:"Precio local"},{nombre:"Mistela",descripcion:"Vino dulce tradicional, arom\xE1tico y f\xE1cil de beber. Muy presente en fiestas populares y sobremesas.",foto:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",precio:"2 \u2013 4 \u20AC copa"}]},{titulo:"D\xF3nde comer en Trebujena",lugares:[{nombre:"Taberna Manegodor",descripcion:"Taberna tradicional muy popular, con cocina casera, ambiente local y productos de la tierra. Recomendable Albur de estero a la espalda al estilo de la taberna Manegodor",horario:"Mediod\xEDa y noche",precio:"Moderado"},{nombre:"La Estancia",descripcion:"Restaurante conocido por sus platos tradicionales, carnes y guisos, en un ambiente acogedor.",horario:"Mediod\xEDa",precio:"Econ\xF3mico"}]},{titulo:"Cultura y Vida Local",contenido:"Trebujena mantiene una intensa vida popular marcada por la convivencia vecinal, el vino mosto, las fiestas singulares y un fuerte sentimiento de identidad colectiva."},{titulo:"Fiestas y Festivos Principales",contenido:"Las fiestas de Trebujena son \xFAnicas por su car\xE1cter popular, reivindicativo y festivo.",lugares:[{nombre:"Carnaval",descripcion:"Uno de los carnavales m\xE1s singulares de la zona, conocido por la quema de la Bruja Piti y su car\xE1cter cr\xEDtico y participativo.",fecha:"Febrero",precio:"Gratis"},{nombre:"Trebufest",descripcion:"Festival alternativo y festivo donde reina el humor, la m\xFAsica y el ambiente reivindicativo. Tradicionalmente se toma el Trebujito y la Mistela.",fecha:"Verano",precio:"Gratis"},{nombre:"Fiestas de la Vendimia",descripcion:"Celebraci\xF3n ligada a la recogida de la uva y al vino mosto, con actividades populares y ambiente festivo.",fecha:"Septiembre",precio:"Gratis"},{nombre:"Fiesta de los Garbanzos como Conejos",descripcion:"Fiesta gastron\xF3mica muy popular donde se reparten garbanzos con arroz (no lleva conejo) y se bebe mosto.",fecha:"Primera semana de diciembre",precio:"Gratis"}]}]};var IE={path:"europa/espana/andalucia/sevilla/mairena-del-aljarafe",nombre:"Mairena del Aljarafe",flag:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/mairena-aljarafe-flag",background:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/mairena-aljarafe-flag",bgPos:"50% 65%",bgPosMobile:"50% 65%",bgDim:.1,flagOpacity:.12,flagOpacityMobile:.18,flagSize:"75%",flagSizeMobile:"50%",bgSize:"cover",bgSizeMobile:"cover",descripcion:"Municipio del Aljarafe sevillano situado a solo 6 km de Sevilla capital. Mairena del Aljarafe combina historia, zonas verdes, excelente comunicaci\xF3n y una intensa vida cultural y gastron\xF3mica dentro del \xE1rea metropolitana sevillana.",secciones:[{titulo:"Historia",contenido:"Mairena del Aljarafe cuenta con or\xEDgenes romanos y andalus\xEDes. Tras la Reconquista pas\xF3 por distintas manos nobiliarias, como el Duque de Olivares, la Casa de Alba y la Iglesia. En 1840 obtuvo ayuntamiento propio, iniciando su desarrollo como municipio independiente. Mairena del Aljarafe tiene or\xEDgenes antiguos ligados al periodo romano y musulm\xE1n, cuando el Aljarafe era una zona agr\xEDcola clave. A lo largo de los siglos ha pasado de ser un enclave rural a convertirse en un importante n\xFAcleo residencial y cultural del entorno sevillano, manteniendo su identidad propia."},{titulo:"Geograf\xEDa y Clima",contenido:"Ubicada en el \xE1rea metropolitana de Sevilla, forma parte de la comarca del Aljarafe. Mairena se caracteriza por su relieve suave y su cercan\xEDa al r\xEDo Guadalquivir con accesos r\xE1pidos por carretera y cercan\xEDa inmediata a la capital. Disfruta de un clima mediterr\xE1neo con veranos calurosos e inviernos suaves, ideal para actividades al aire libre durante gran parte del a\xF1o."},{titulo:"Comunicaciones",lugares:[{nombre:"Metro de Sevilla \u2013 L\xEDnea 1",descripcion:"Con estaciones como Ciudad Expo y Cavaleri, conecta directamente con el centro de Sevilla.",horario:"De Lunes a Jueves 06:30 \u2013 23:00; Viernes y v\xEDsperas de festivos 06:30 \u2013 02:00; S\xE1bados 07:30 \u2013 02:00; Domingos y Festivos 7:30 \u2013 23:00",precio:"Seg\xFAn trayecto"}]},{titulo:"Qu\xE9 visitar en Mairena del Aljarafe",lugares:[{nombre:"Iglesia Parroquial de San Ildefonso",descripcion:"Situada en la Plaza Blas Infante, es el principal templo de Mairena del Aljarafe y est\xE1 dedicada a su patr\xF3n, San Ildefonso. Construida en el siglo XVI como capilla mud\xE9jar, fue ampliada en el siglo XVII y reformada en el XVIII. En su interior se veneran las im\xE1genes de la Virgen de las Mercedes y de la Virgen del Rosario.",foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/iglesia-San-Ildefonso",horario:"Misas: Mar \u2013 Vier. 11:00 - 13:00 y de 19:00 - 20:00; Sab. 19:00 - 20:00; Dom y festivos 12:00 - 14:00  y 19:00 - 21:00. Lunes cerrado.",precio:"Gratis"},{nombre:"Arco de la Prusiana",descripcion:"Ubicado en la calle Zurraque, este arco es uno de los s\xEDmbolos m\xE1s reconocibles del municipio. Formaba parte de la entrada de la antigua Hacienda La Prusiana, una finca agr\xEDcola del siglo XVIII de la que hoy solo se conserva este elemento arquitect\xF3nico.",foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/arco-prusiana",horario:"Acceso libre",precio:"Gratis"},{nombre:"Parque Porzuna",descripcion:"Espacio natural protegido situado junto a la Hacienda Porzuna. Cuenta con zona biosaludable, itinerario bot\xE1nico, \xE1rea canina, barbacoas y merenderos, siendo un lugar ideal para el ocio y el contacto con la naturaleza.",foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/parque-porzuna",horario:"Abierto todo el d\xEDa",precio:"Gratis"},{nombre:"Hacienda Porzuna",descripcion:"Antigua hacienda agr\xEDcola que representa el pasado rural de Mairena del Aljarafe. Actualmente est\xE1 restaurada y se utiliza como dependencia municipal, manteniendo su valor hist\xF3rico y arquitect\xF3nico.",foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/mairena-aljarafe-flag",horario:"Exterior visitable",precio:"Gratis"},{nombre:"Colegio Santa Mar\xEDa del Valle",descripcion:"Centro educativo de gran relevancia en la vida social y cultural del municipio, conocido por su tradici\xF3n, eventos y actividades comunitarias. Destaca la imagen del Sagrado Coraz\xF3n a la entrada.",foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/colegio-santa-maria-valle",horario:"Uso educativo",precio:"Gratis"},{nombre:"Centro Comercial Metromar",descripcion:"Principal zona comercial y de ocio de Mairena. Cuenta con tiendas, restaurantes, cine y acceso directo al metro, siendo un punto de encuentro habitual.",foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/metromar",horario:"10:00 \u2013 22:00 (seg\xFAn establecimiento)",precio:"Acceso libre"},{nombre:"MOVE Climbing",descripcion:"Roc\xF3dromo y centro de escalada indoor muy valorado en Mairena del Aljarafe, con zonas de escalada para todos los niveles, zonas de entrenamiento, boulder y espacio para ni\xF1os. Ideal para una actividad deportiva y divertida.",foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/mairena-aljarafe-flag",horario:"Lun\u2013Vie 09:30\u201322:00; S\xE1b\u2013Dom 11:00\u201320:00 (seg\xFAn temporada)",precio:"Entrada de d\xEDa \u2248 10 \u20AC, abono mensual \u2248 45 \u20AC; alquiler material \u2248 7 \u20AC"},{nombre:"Corredor Verde del R\xEDo Pudio",descripcion:"Tramo natural del Corredor Verde del Guadiamar\u2013Riopudio que atraviesa el t\xE9rmino municipal de Mairena del Aljarafe. Perfecto para senderismo y paseos en bicicleta, destaca por su paisaje y tranquilidad.",foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/corredor-verde-rio-pudio",horario:"Abierto todo el d\xEDa",precio:"Gratis"}]},{titulo:"Gastronom\xEDa",platos:[{nombre:"Gambas cocidas de Huelva (Pepe el Mudo)",descripcion:"Uno de los imprescindibles de Mairena. Gambas de Huelva cocidas en su punto, con sabor limpio a mar y textura firme y jugosa. Se sirven normalmente reci\xE9n hechas y son perfectas para acompa\xF1ar con una cerveza bien fr\xEDa o una copa de vino. Un cl\xE1sico del tapeo local.",foto:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/gambas-cocidas",precio:"Seg\xFAn raci\xF3n y temporada"}]},{titulo:"D\xF3nde comer en Mairena del Aljarafe",lugares:[{nombre:"Bar Pepe El Mudo",descripcion:"Un cl\xE1sico local famoso por sus gambas de Huelva cocidas, servidas con sencillez y calidad excepcional. Imprescindible para los amantes del marisco.",horario:"Mediod\xEDa y noche",precio:"Precio seg\xFAn mercado"},{nombre:"Bar El Metro",descripcion:"Bar tradicional muy frecuentado por vecinos, ideal para tapas cl\xE1sicas y ambiente local.",horario:"Horario comercial",precio:"Econ\xF3mico"},{nombre:"Bodega San Rafael",descripcion:"Establecimiento de cocina andaluza tradicional, con guisos caseros, carnes y tapas generosas.",horario:"Mediod\xEDa",precio:"Moderado"},{nombre:"Restaurante El Mercado de Enma",descripcion:"Propuesta gastron\xF3mica moderna con producto de calidad, cocina creativa y cuidada presentaci\xF3n.",horario:"Comidas y cenas",precio:"Medio-alto"},{nombre:"Restaurante Casa Lim\xF3n",descripcion:"Uno de los restaurantes m\xE1s reconocidos de Mairena. Cocina de autor con ra\xEDces andaluzas, ideal para ocasiones especiales.",horario:"Comidas y cenas",precio:"Medio-alto"}]},{titulo:"Cultura y Vida Local",contenido:"Mairena del Aljarafe combina la tranquilidad residencial con una vida social activa. Destacan sus fiestas locales, actividades culturales, eventos deportivos y su cercan\xEDa a Sevilla, que ampl\xEDa enormemente la oferta cultural y de ocio."},{titulo:"Fiestas y Festivos Principales",contenido:"A lo largo del a\xF1o, Mairena del Aljarafe celebra numerosas fiestas populares, religiosas y culturales que reflejan la identidad andaluza del municipio y su intensa vida social.",lugares:[{nombre:"San Ildefonso",descripcion:"Fiesta del patr\xF3n de Mairena del Aljarafe. Se celebra con actos religiosos, procesi\xF3n y convivencia vecinal, siendo una de las fechas m\xE1s importantes del calendario local.",fecha:"23 de enero",precio:"Gratis"},{nombre:"Carnaval",descripcion:"Celebraci\xF3n popular con disfraces, m\xFAsica y actividades para todas las edades, fomentando la participaci\xF3n vecinal y el ambiente festivo.",fecha:"Febrero",precio:"Gratis"},{nombre:"Feria del Libro",descripcion:"Evento cultural dedicado a la literatura, con presentaciones, firmas de autores, actividades infantiles y fomento de la lectura.",fecha:"Abril",precio:"Gratis"},{nombre:"Cruz de Mayo",descripcion:"Fiesta tradicional andaluza en la que se instalan cruces decoradas con flores, acompa\xF1adas de m\xFAsica, baile y gastronom\xEDa t\xEDpica.",fecha:"Mayo",precio:"Gratis"},{nombre:"Feria de la Tapa",descripcion:"Cita gastron\xF3mica muy popular donde bares y restaurantes locales ofrecen tapas a precios especiales, acompa\xF1adas de ambiente festivo.",fecha:"Mayo",precio:"Seg\xFAn consumo"},{nombre:"Roc\xEDo",descripcion:"La Hermandad del Roc\xEDo de Mairena participa en la tradicional romer\xEDa hacia la aldea del Roc\xEDo, combinando devoci\xF3n, convivencia y tradici\xF3n.",fecha:"Mayo / Junio",precio:"Gratis"},{nombre:"Virgen del Rosario",descripcion:"Celebraci\xF3n religiosa y popular en honor a la Virgen del Rosario, con procesi\xF3n y actos lit\xFArgicos muy arraigados en la tradici\xF3n local.",fecha:"Mayo y Octubre"},{nombre:"Feria de Mairena del Aljarafe",descripcion:"La feria local se celebra en el Centro Multiusos con el tradicional alumbrado del recinto ferial, actuaciones musicales de artistas nacionales, casetas, atracciones y actividades infantiles como el D\xEDa del Ni\xF1o.",fecha:"Junio",precio:"Seg\xFAn consumo"},{nombre:"Fiestas de la Virgen de las Mercedes",descripcion:"Celebraciones en honor a la patrona del municipio, con actos religiosos, procesi\xF3n, actividades culturales y eventos festivos.",fecha:"Junio y Septiembre",precio:"Gratis"},{nombre:"Cabaret Festival",descripcion:"Festival musical de gran formato que re\xFAne a artistas nacionales e internacionales, consolidando a Mairena como sede de grandes eventos culturales.",fecha:"Verano",precio:"Entrada seg\xFAn espect\xE1culo"},{nombre:"Zambomba Mairenera",descripcion:"Tradicional celebraci\xF3n navide\xF1a con villancicos, zambombas y ambiente familiar que llena las calles de m\xFAsica y tradici\xF3n.",fecha:"Diciembre",precio:"Gratis"},{nombre:"Navidad y Cabalgata de Reyes",descripcion:"Durante las fiestas navide\xF1as, Mairena se ilumina con decoraci\xF3n, belenes y actividades infantiles, culminando con la tradicional Cabalgata de Reyes Magos.",fecha:"Diciembre \u2013 Enero",precio:"Gratis"}]}]};var wE={path:"europa/italia/roma",nombre:"Roma y Ciudad del Vaticano",flag:"cld:europa/italia/roma/roma-flag",flag2:"cld:europa/italia/roma/vaticano-flag",background:"cld:europa/italia/italia-bg",bgPos:"50% 50%",bgPosMobile:"50% 50%",bgDim:.12,flagOpacity:.1,flagOpacityMobile:.16,flagSize:"75%",flagSizeMobile:"55%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`Roma no es solo una ciudad, es un viaje continuo a trav\xE9s del tiempo. Aqu\xED no visitas monumentos, caminas literalmente sobre m\xE1s de 2.000 a\xF1os de historia.

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
No intentes correr Roma. Es una ciudad para saborearla.`}]};var TE={path:"europa/rumania/bucarest",nombre:"Bucarest",flag:"cld:europa/rumania/bucarest/bucarest-flag",background:"cld:europa/rumania/rumania-flag",bgPos:"50% 65%",bgPosMobile:"50% 65%",bgDim:.1,flagOpacity:.12,flagOpacityMobile:.18,flagSize:"75%",flagSizeMobile:"50%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`Bucarest es una ciudad de contrastes que sorprende mucho m\xE1s de lo que esperas. A primera vista puede parecer ca\xF3tica, pero en cuanto empiezas a recorrerla descubres una mezcla muy potente de historia, arquitectura y vida local.

Aqu\xED conviven palacios gigantescos del comunismo con iglesias ortodoxas escondidas, edificios de inspiraci\xF3n francesa con barrios m\xE1s decadentes, y mercados tradicionales con zonas modernas llenas de ambiente.

Conocida como la \u201CPeque\xF1a Par\xEDs del Este\u201D por su pasado elegante, Bucarest tambi\xE9n muestra una cara m\xE1s cruda marcada por la \xE9poca de Ceau\u0219escu, lo que le da una personalidad \xFAnica.

Es una ciudad que no siempre entra por los ojos a la primera\u2026 pero cuanto m\xE1s la entiendes, m\xE1s te gusta.

Adem\xE1s, es un destino perfecto para combinar cultura, gastronom\xEDa muy potente, vida nocturna y excursiones espectaculares a Transilvania.`,infoGeneral:{idioma:"Rumano",moneda:"Leu rumano (RON) \u2014 1 \u20AC \u2248 5 RON",hora:"UTC +2 (+1h respecto a Espa\xF1a)",internet:"Roaming UE disponible",electricidad:"230V \u2013 Enchufe tipo C y F",pasaporte:"DNI o pasaporte v\xE1lido",visado:"No necesario para ciudadanos UE",vacunas:"No obligatorias"},secciones:[{titulo:"Historia",contenido:`La historia de Bucarest es una mezcla de esplendor, destrucci\xF3n y transformaci\xF3n constante.

Sus or\xEDgenes se remontan al siglo XV, cuando Vlad \u021Aepe\u0219 (Dr\xE1cula) estableci\xF3 aqu\xED una de sus cortes. Durante siglos, la ciudad estuvo influenciada por el Imperio Otomano, lo que marc\xF3 su desarrollo inicial.

En el siglo XIX, Bucarest vivi\xF3 su \xE9poca dorada. Se moderniz\xF3 r\xE1pidamente, adopt\xF3 arquitectura francesa y se convirti\xF3 en una ciudad elegante y culturalmente muy activa, gan\xE1ndose el apodo de la \u201CPeque\xF1a Par\xEDs\u201D.

Pero todo cambi\xF3 en el siglo XX con la llegada del r\xE9gimen comunista.

Bajo Nicolae Ceau\u0219escu, la ciudad sufri\xF3 una transformaci\xF3n brutal: barrios hist\xF3ricos enteros fueron demolidos para construir avenidas gigantes y edificios monumentales como el Palacio del Parlamento, uno de los s\xEDmbolos m\xE1s extremos del poder comunista.

En 1989, Bucarest fue el epicentro de la revoluci\xF3n que puso fin a la dictadura. Lugares como la Plaza de la Revoluci\xF3n siguen siendo testigos de ese momento hist\xF3rico.

Hoy, Bucarest es una ciudad en reconstrucci\xF3n constante, donde conviven todas estas etapas. Y precisamente esa mezcla es lo que la hace tan interesante.`},{titulo:"Geograf\xEDa y Clima",contenido:`Bucarest se encuentra en el sureste de Ruman\xEDa, en una zona llana atravesada por el r\xEDo D\xE2mbovi\u021Ba.

A diferencia de otras capitales europeas, no es una ciudad especialmente compacta, por lo que combina zonas muy caminables (como el centro hist\xF3rico) con otras m\xE1s amplias donde conviene usar transporte.

El clima es continental:

\u2022 Veranos: calurosos (puede superar f\xE1cilmente los 30\xB0C)
\u2022 Invierno: fr\xEDo, con temperaturas cercanas a 0\xB0C o bajo cero
\u2022 Primavera y oto\xF1o: las mejores \xE9pocas para viajar, con temperaturas suaves y ambiente muy agradable

\u{1F4A1} Consejo viajero:
Organiza bien los d\xEDas por zonas para evitar desplazamientos innecesarios. Bucarest se disfruta mucho m\xE1s cuando agrupas visitas.

\u{1F4A1} Extra:
Muchas de las mejores experiencias (mercados, parques, terrazas) est\xE1n fuera del t\xEDpico circuito tur\xEDstico.`},{titulo:"Qu\xE9 visitar en Bucarest",itinerario:[{dia:"D\xEDa 1 \u2013 Bucarest monumental",zonas:[{nombre:"Free tour por Bucarest",descripcion:`Empieza el d\xEDa con un free tour para entender el contexto hist\xF3rico, pol\xEDtico y arquitect\xF3nico de la ciudad. Es la mejor forma de descubrir los contrastes de Bucarest, desde su pasado comunista hasta su evoluci\xF3n actual.

\u{1F4A1} Consejo: intenta reservar a primera hora para luego continuar el d\xEDa con el resto de visitas.`,horario:"Seg\xFAn reserva",precio:"Aportaci\xF3n voluntaria"},{nombre:"Palacio del Parlamento de Bucarest",descripcion:`Uno de los edificios m\xE1s impresionantes del mundo y el m\xE1s pesado jam\xE1s construido. Levantado durante la \xE9poca de Nicolae Ceau\u0219escu, este gigantesco palacio es s\xEDmbolo del poder y la ambici\xF3n del r\xE9gimen comunista. Su interior est\xE1 lleno de salas monumentales, m\xE1rmol, alfombras gigantes y decoraci\xF3n ostentosa. La visita permite recorrer parte del edificio y entender mejor la historia reciente de Ruman\xEDa.

 \u{1F4A1} Importante: solo se puede visitar mediante tour guiado oficial.

\u{1F4A1} Consejo: se recomienda reservar con al menos 24h de antelaci\xF3n, ya que el acceso es limitado y puede haber cambios por eventos oficiales.

\u{1F4A1} Consejo: intenta ir a primera hora para evitar grupos grandes y aprovechar mejor la visita.`,foto:"cld:europa/rumania/bucarest/palacio-parlamento",acceso:"DNI o pasaporte obligatorio. Control de seguridad tipo aeropuerto",horario:"Mar\u2013Oct: 09:00\u201317:00 | Nov\u2013Feb: 10:00\u201316:00",precio:`\u2248 12\u20AC adultos | Estudiantes: 6\u20AC | Ni\xF1os: 4\u20AC | Menores de 7: gratis
Terraza: +3\u20134\u20AC aprox.`},{nombre:"Parque Izvor",descripcion:"Gran espacio abierto junto al Palacio del Parlamento, ideal para pasear y disfrutar de las vistas del edificio desde otra perspectiva. Es una buena parada para descansar tras la visita.",foto:"cld:europa/rumania/bucarest/parque-izvor",horario:"Acceso libre",precio:"Gratis"},{nombre:"Palacio del Patriarcado",descripcion:`Edificio neocl\xE1sico situado junto a la catedral, utilizado actualmente como sede administrativa de la Iglesia Ortodoxa Rumana y centro de conferencias.

Aunque no es un museo como tal, permite ver parte del conjunto institucional y entender el papel de la Iglesia en la vida pol\xEDtica e hist\xF3rica del pa\xEDs.

\u{1F4A1} Importante: el acceso puede estar limitado o restringido seg\xFAn eventos oficiales o conferencias.`,foto:"cld:europa/rumania/bucarest/palacio-patriarcal",horario:"Lun\u2013Vie: 09:00\u201316:00 | S\xE1b\u2013Dom: cerrado",precio:"Generalmente gratis (acceso limitado)"},{nombre:"Catedral Patriarcal de Bucarest",descripcion:`Principal templo de la Iglesia Ortodoxa Rumana y uno de los lugares religiosos m\xE1s importantes del pa\xEDs. Situada en una colina con vistas a la ciudad, destaca por su arquitectura tradicional y su ambiente espiritual.

Es un lugar de culto activo, por lo que se respira un ambiente muy aut\xE9ntico y local. 

\u{1F455} Vestimenta: al ser un recinto religioso, se recomienda vestir con respeto (hombros cubiertos y evitar ropa demasiado corta). 

\u{1F4A1} Consejo: si solo quieres visitarla como turista, es mejor evitar las horas de liturgia para disfrutarla con m\xE1s tranquilidad.`,foto:"cld:europa/rumania/bucarest/catedral-patriarcal",horario:"Todos los d\xEDas: 07:00\u201320:00",precio:"Gratis"},{nombre:"Parque Ci\u0219migiu",descripcion:`El parque m\xE1s antiguo y emblem\xE1tico del centro de Bucarest. Perfecto para desconectar, pasear entre sus senderos o sentarse junto al lago.

Un oasis verde en medio de la ciudad.`,foto:"cld:europa/rumania/bucarest/parque-cismigiu",horario:"Acceso libre",precio:"Gratis"},{nombre:"Catedral de la Salvaci\xF3n del Pueblo (Catedral Nacional)",descripcion:`La iglesia ortodoxa m\xE1s grande y alta del mundo, situada justo detr\xE1s del Palacio del Parlamento. Es uno de los proyectos m\xE1s ambiciosos de la Ruman\xEDa moderna y s\xEDmbolo de la fe ortodoxa en el pa\xEDs.

Aunque fue consagrada en 2018, su interior sigue en proceso de finalizaci\xF3n, destacando los impresionantes mosaicos en desarrollo.

Con una altura de 120 metros y capacidad para m\xE1s de 5.000 personas, combina elementos bizantinos con la tradici\xF3n rumana.

\u{1F4A1} Destaca: alberga la campana balanceante m\xE1s grande del mundo (25 toneladas).

\u{1F4A1} Consejo: al estar a\xFAn en construcci\xF3n parcial, algunas zonas pueden no ser accesibles o tener restricciones.

\u{1F455} Vestimenta: es obligatorio vestir con respeto (hombros y rodillas cubiertos).

\u{1F4F8} Fotos: el exterior se puede fotografiar sin problema, pero en el interior puede haber restricciones.

\u{1F4CD} Acceso: entrada principal por la zona de Calea 13 Septembrie, junto al Parlamento.`,foto:"cld:europa/rumania/bucarest/catedral-nacional",horario:"General: 08:00\u201318:00 | Domingos (liturgia): 09:00\u201312:00",precio:"Gratis"},{nombre:"Palacio Cotroceni (Museo Nacional Cotroceni)",descripcion:`Antigua residencia real y actual sede de la Presidencia de Ruman\xEDa. Este palacio combina historia, arquitectura elegante y contexto pol\xEDtico, permitiendo entender la evoluci\xF3n del pa\xEDs desde la monarqu\xEDa hasta la actualidad.

La visita se realiza exclusivamente mediante tour guiado por sus salones hist\xF3ricos, decorados con mobiliario original y elementos de gran valor art\xEDstico.

\u{1F4A1} Importante: es obligatorio reservar con al menos 24h de antelaci\xF3n.

\u{1F4A1} Consejo: algunos d\xEDas pueden tener horarios reducidos o restricciones por eventos oficiales, por lo que es recomendable confirmar al hacer la reserva.

\u{1F4CD} Acceso: la entrada para visitantes se realiza por la \u0218oseaua Cotroceni, justo frente al Jard\xEDn Bot\xE1nico, una visita muy recomendable para combinar despu\xE9s.`,foto:"cld:europa/rumania/bucarest/palacio-cotroceni",acceso:"Es imprescindible presentar DNI o pasaporte original f\xEDsico (no valen copias ni fotos), ya que se pasa un control de seguridad.",horario:`Mar\u2013Dom: 09:00\u201317:00 (\xFAltima visita ~15:30\u201316:00) | Lun: cerrado
Mi\xE9rcoles: posible horario reducido | Jueves: consultar disponibilidad`,precio:`\u2248 12\u20AC adultos | Estudiantes: 6\u20AC | Ni\xF1os: 4\u20AC
(Fotograf\xEDa profesional con suplemento)`},{nombre:"Fuentes de la Plaza de la Uni\xF3n (F\xE2nt\xE2nile Pia\u021Ba Unirii)",descripcion:`Uno de los espect\xE1culos m\xE1s impresionantes de Bucarest. Estas fuentes forman un sistema coreografiado que atraviesa el centro de la ciudad a lo largo de m\xE1s de 1,4 km, reconocido como el m\xE1s largo del mundo.

Durante los meses de mayo a octubre se celebra el espect\xE1culo \u201CSimfonia Apei\u201D (Sinfon\xEDa del Agua), donde chorros de agua \u201Cbailan\u201D al ritmo de m\xFAsica cl\xE1sica y moderna, acompa\xF1ados de luces LED y proyecciones l\xE1ser.

Es un plan perfecto para terminar el d\xEDa, con un ambiente animado y muy visual en pleno centro de la ciudad.

\u{1F4A1} Consejo: llega con algo de antelaci\xF3n para coger buen sitio, especialmente en verano. El espect\xE1culo comienza al anochecer y el horario cambia seg\xFAn la \xE9poca del a\xF1o.`,foto:"cld:europa/rumania/bucarest/fuentes-unirii",horario:"Vie\u2013Dom al anochecer (horario variable seg\xFAn puesta de sol) | Duraci\xF3n: ~45 min",precio:"Gratis"}]},{dia:"D\xEDa 2 \u2013 Centro hist\xF3rico y cultura en Bucarest",zonas:[{nombre:"Ateneo Rumano",descripcion:"Uno de los grandes s\xEDmbolos de Bucarest y epicentro cultural del pa\xEDs. Construido a finales del siglo XIX, este edificio neocl\xE1sico alberga la Filarm\xF3nica George Enescu. Su interior circular, decorado con frescos que narran la historia de Ruman\xEDa, es tan impresionante como su fachada. Una visita imprescindible para entender la importancia cultural del pa\xEDs.",foto:"cld:europa/rumania/bucarest/ateneo-rumano",horario:"Mar\u2013Vie: 14:00\u201316:00 (si no hay eventos) | Fines de semana por la ma\xF1ana",precio:"Entrada \u2248 6,50\u20AC (sin concierto)"},{nombre:"Biblioteca Central Universitaria",descripcion:"Elegante edificio acad\xE9mico situado frente al Palacio Real. Fue reconstruido tras sufrir da\xF1os durante la Revoluci\xF3n de 1989 y hoy representa el centro intelectual de Bucarest. Su fachada y entorno forman parte del conjunto monumental m\xE1s importante de la ciudad.",foto:"cld:europa/rumania/bucarest/biblioteca-central"},{nombre:"Palacio Real y Museo Nacional de Arte",descripcion:"Antigua residencia de los reyes de Ruman\xEDa, hoy convertido en el principal museo de arte del pa\xEDs. En su interior alberga colecciones de arte europeo y rumano, incluyendo obras medievales y modernas. El edificio tambi\xE9n fue testigo directo de la ca\xEDda del r\xE9gimen comunista en 1989.",foto:"cld:europa/rumania/bucarest/palacio-real",horario:"Mi\xE9\u2013Vie: 10:00\u201318:00 | S\xE1b\u2013Dom: 11:00\u201319:00 | Lun\u2013Mar: cerrado",precio:"\u2248 6,50\u20AC adultos | Gratis el primer mi\xE9rcoles de cada mes"},{nombre:"Plaza de la Revoluci\xF3n (Pia\u021Ba Revolu\u021Biei)",descripcion:"Uno de los lugares m\xE1s importantes de la historia reciente de Ruman\xEDa. Aqu\xED se produjeron las protestas que acabaron con la dictadura de Nicolae Ceau\u0219escu en 1989. En la plaza puedes ver el antiguo edificio del Comit\xE9 Central desde donde dio su \xFAltimo discurso antes de huir.",foto:"cld:europa/rumania/bucarest/plaza-revolucion"},{nombre:"Pasajul Victoria",descripcion:"Peque\xF1o pasaje urbano decorado con paraguas de colores suspendidos en el aire. Es uno de los rincones m\xE1s fotog\xE9nicos de Bucarest y refleja el lado m\xE1s moderno y creativo de la ciudad.",foto:"cld:europa/rumania/bucarest/pasajul-victoria"},{nombre:"Banco Nacional de Rumania",descripcion:"Instituci\xF3n clave en la historia econ\xF3mica del pa\xEDs. Su sede hist\xF3rica, de estilo neocl\xE1sico, refleja el desarrollo financiero de Ruman\xEDa desde el siglo XIX. Se puede visitar mediante tour guiado, aunque su exterior ya impresiona por su arquitectura.",foto:"cld:europa/rumania/bucarest/banco-nacional"},{nombre:"Pasaje Macca-Vilacrosse (Bemolle Caf\xE9)",descripcion:"Pasaje cubierto del siglo XIX con una caracter\xEDstica cubierta de cristal amarillenta. Este lugar fue originalmente una zona comercial y hoy alberga cafeter\xEDas y bares. Ideal para hacer una pausa y disfrutar del ambiente en lugares como Bemolle Caf\xE9.",foto:"cld:europa/rumania/bucarest/macca-vilacrosse"},{nombre:"Palacio CEC",descripcion:"Uno de los edificios m\xE1s elegantes y fotog\xE9nicos de Bucarest. Construido a finales del siglo XIX, destaca por su espectacular c\xFApula de vidrio y metal, inspirada en la arquitectura francesa de la \xE9poca. Aunque no se puede visitar por dentro al funcionar como banco (el m\xE1s antiguo), su exterior es impresionante y una parada imprescindible para fotos.",foto:"cld:europa/rumania/bucarest/palacio-cec",horario:"Exterior visitable todo el d\xEDa"},{nombre:"Museo de Historia Nacional de Ruman\xEDa",descripcion:`Este museo justo enfrente del Palacio CEC recorre la historia de Ruman\xEDa desde la antig\xFCedad hasta la \xE9poca moderna. Destaca especialmente por albergar el Tesoro Nacional, con impresionantes piezas de oro, y por la reproducci\xF3n a tama\xF1o real de la base de la Columna de Trajano.

Es una visita muy interesante para entender el pasado del pa\xEDs y se integra perfectamente en un recorrido por el centro hist\xF3rico.`,foto:"cld:europa/rumania/bucarest/museo-historia-nacional",horario:"Mi\xE9\u2013Dom: 09:00\u201317:00 | Lun\u2013Mar: cerrado",precio:"\u2248 5\u20AC adultos | Gratis el primer mi\xE9rcoles de cada mes"},{nombre:"Monasterio Stavropoleos",descripcion:"Peque\xF1a joya de la arquitectura ortodoxa del siglo XVIII. Destaca por sus detalles en piedra tallada y su tranquilo patio interior. Es uno de los lugares m\xE1s especiales y con m\xE1s encanto del casco antiguo.",foto:"cld:europa/rumania/bucarest/stavropoleos"},{nombre:"Librer\xEDa C\u0103rture\u0219ti Carusel",descripcion:"Considerada una de las librer\xEDas m\xE1s bonitas de Europa. Su interior blanco de varios pisos con balcones curvos crea un espacio \xFAnico. M\xE1s que una librer\xEDa, es una experiencia visual imprescindible en Bucarest.",foto:"cld:europa/rumania/bucarest/carturesti-carusel"},{nombre:"Hanul lui Manuc",descripcion:"Antigua posada del siglo XIX que serv\xEDa como punto de encuentro para comerciantes. Hoy es un restaurante tradicional donde puedes tomar algo en un entorno hist\xF3rico con patio interior.",fotos:["cld:europa/rumania/bucarest/hanul-lui-manuc","cld:europa/rumania/bucarest/hanul-lui-manuc-2"],precio:"Econ\xF3mico-moderado"},{nombre:"Curtea Veche",descripcion:"Antigua corte principesca de Bucarest, asociada a Vlad Tepes (Dr\xE1cula). Aunque hoy quedan solo ruinas, es uno de los lugares m\xE1s hist\xF3ricos de la ciudad y muestra el origen medieval de la capital.",foto:"cld:europa/rumania/bucarest/curtea-veche"},{nombre:"Iglesia de San Antonio (St. Anthony\u2019s Church)",descripcion:"La iglesia m\xE1s antigua de Bucarest, construida en el siglo XVI. Est\xE1 vinculada a la corte de Vlad Tepes y sigue siendo un importante lugar de culto y tradici\xF3n local.",foto:"cld:europa/rumania/bucarest/st-anthony"},{nombre:"Cena en La Pl\u0103cinte (Mici)",descripcion:"Perfecto para cerrar el d\xEDa probando comida tradicional rumana. Aqu\xED puedes degustar los famosos mici, unas salchichas a la parrilla muy populares, acompa\xF1adas de mostaza y pan. Una opci\xF3n aut\xE9ntica, econ\xF3mica y muy local.",foto:"cld:europa/rumania/bucarest/mici",horario:"Noche",precio:"Econ\xF3mico"}]},{dia:"D\xEDa 3 \u2013 Barrio jud\xEDo, sinagogas y termas de Bucarest",zonas:[{nombre:"Barrio jud\xEDo y sinagogas de Bucarest",descripcion:"Recorre una de las zonas con m\xE1s historia de la ciudad, donde se conserva el legado de la comunidad jud\xEDa. Aqu\xED se mezclan edificios hist\xF3ricos, sinagogas y un ambiente diferente al centro tur\xEDstico.",horario:"Ma\xF1ana"},{nombre:"Iglesia Rusa de Bucarest (Sf\xE2ntul Nicolae)",descripcion:"Templo ortodoxo de influencia rusa construido a principios del siglo XX. Destaca por sus c\xFApulas doradas y su estilo arquitect\xF3nico diferente al resto de iglesias de Bucarest, simbolizando la conexi\xF3n hist\xF3rica y cultural entre Ruman\xEDa y el mundo eslavo.",foto:"cld:europa/rumania/bucarest/iglesia-rusa",horario:"Mar\u2013S\xE1b: 08:00\u201318:00 | Lun: 09:00\u201316:00 | Dom: 08:00\u201313:00",precio:"Gratis"},{nombre:"Templo Coral",descripcion:`La sinagoga m\xE1s importante de Bucarest, construida en el siglo XIX e inspirada en la de Viena. Representa el centro espiritual de la comunidad jud\xEDa de la ciudad y destaca por su interior elegante y su valor hist\xF3rico.

Es uno de los mejores lugares para entender la presencia jud\xEDa en Bucarest.

\u{1F4A1} Importante: el acceso incluye control de seguridad y puede requerir DNI o pasaporte. Se recomienda vestir con respeto (hombros y rodillas cubiertos).`,foto:"cld:europa/rumania/bucarest/templo-coral",horario:"Lun\u2013Jue: 10:00\u201314:30 | Vie: 10:00\u201312:30 | S\xE1b\u2013Dom: cerrado",precio:"\u2248 6\u20AC adultos | Estudiantes: 3\u20134\u20AC (incluye breve visita guiada)"},{nombre:"Templul Unirea Sf\xE2nt\u0103 (Museo de Historia Jud\xEDa)",descripcion:`Antiguo templo jud\xEDo que hoy alberga el Museo de Historia de la Comunidad Jud\xEDa de Ruman\xEDa. Es una visita muy interesante para conocer la evoluci\xF3n, tradiciones y legado de la comunidad jud\xEDa en el pa\xEDs.

En su interior se exponen objetos rituales, documentos hist\xF3ricos y trajes tradicionales, ofreciendo una visi\xF3n m\xE1s completa que otras sinagogas de la ciudad.

\u{1F4A1} Importante: puede haber control de seguridad en el acceso, por lo que se recomienda llevar DNI o pasaporte.

\u{1F4A1} Consejo: es recomendable llegar al menos 45 minutos antes del cierre para poder ver bien toda la exposici\xF3n.`,foto:"cld:europa/rumania/bucarest/templul-unirea-sfanta",horario:"Lun\u2013Jue: 10:00\u201315:00 | Dom: 09:00\u201312:00 | Vie\u2013S\xE1b: cerrado",precio:"\u2248 3\u20134\u20AC adultos | Estudiantes: \u2248 2\u20AC"},{nombre:"Gran Sinagoga de Bucarest (Museo del Holocausto)",descripcion:`Uno de los edificios m\xE1s importantes del legado jud\xEDo en Bucarest. Actualmente funciona principalmente como Museo del Holocausto de Ruman\xEDa, ofreciendo una visita con gran carga hist\xF3rica y emocional.

En su interior se pueden ver exposiciones sobre la comunidad jud\xEDa y un memorial dedicado a las v\xEDctimas, adem\xE1s de admirar su arquitectura de estilo neomorisco.

\u{1F4A1} Importante: es obligatorio presentar DNI o pasaporte para acceder y pasar el control de seguridad. No se permiten mochilas grandes.`,foto:"cld:europa/rumania/bucarest/gran-sinagoga",horario:"Lun\u2013Jue: 09:00\u201314:00 | Vie: 09:00\u201312:00 | S\xE1b\u2013Dom: cerrado",precio:"\u2248 6\u20AC adultos (30 RON)"},{nombre:"Panader\xEDa Ana Pan \u2013 Cozonac",descripcion:`Una de las mejores opciones para probar el cozonac, el dulce tradicional rumano similar a un brioche relleno de cacao, nueces o crema. Ana Pan es una cadena muy popular en Bucarest, conocida por su calidad y por ofrecer productos reci\xE9n hechos.

Perfecto para hacer una pausa durante el recorrido y probar uno de los sabores m\xE1s t\xEDpicos del pa\xEDs.

\u{1F4A1} Consejo: tambi\xE9n puedes comprar porciones individuales si no quieres llevarte un cozonac entero.`,foto:"cld:europa/rumania/bucarest/cozonac",horario:`Ana Pan \u2013 Coposu (zona Unirii): Lun\u2013Vie: 08:00\u201319:30 | S\xE1b: 09:00\u201315:00 | Dom: cerrado
(Otros locales pueden tener horarios distintos)`,precio:"\u2248 12\u20AC \u2013 24\u20AC/kg (60\u2013120 RON)"},{nombre:"Termas de Bucarest (Therme Bucure\u0219ti)",descripcion:`Uno de los complejos termales m\xE1s grandes y modernos de Europa, ideal para relajarse tras varios d\xEDas de turismo. Cuenta con diferentes zonas seg\xFAn el tipo de experiencia:

\u2022 Galaxy: zona familiar con toboganes y piscina de olas.
\u2022 The Palm: \xE1rea de relax con palmeras (solo +14 a\xF1os).
\u2022 Elysium: zona premium con saunas tem\xE1ticas y bienestar.

\u{1F4A1} Consejo: si buscas relajarte, lo m\xE1s recomendable es acceder a The Palm o Elysium.

\u{1F4A1} Importante: al entrar te dar\xE1n una pulsera inteligente para abrir tu taquilla y pagar consumiciones dentro del recinto.

\u{1F4A1} Consejo viajero: es obligatorio llevar ba\xF1ador, chanclas y toalla. Si no los llevas, tendr\xE1s que alquilarlos all\xED (toalla ~29 RON, albornoz ~37 RON), como nos pas\xF3 a nosotros \u{1F605}.

\u{1F4CD} Ubicaci\xF3n: a las afueras de Bucarest, cerca del aeropuerto (20\u201330 min).

\u{1F697} Transporte:
\u2022 Bus gratuito desde Pia\u021Ba Roman\u0103 (cada ~2h, recomendable llegar con antelaci\xF3n).
\u2022 Uber/Bolt: 14\u201320\u20AC aprox. desde el centro.
\u2022 Bus p\xFAblico 442 (opci\xF3n m\xE1s econ\xF3mica).

\u{1F4A1} Consejo: es muy recomendable comprar la entrada online, especialmente fines de semana o d\xEDas nublados.`,foto:"cld:europa/rumania/bucarest/termas-bucarest",horario:"Lun\u2013Jue: 10:00\u201323:00 | Vie\u2013S\xE1b: 09:00\u201300:00 | Dom: 09:00\u201323:00",precio:"Galaxy: 13\u201315\u20AC (3h) | The Palm: 21\u201325\u20AC (4,5h) | Elysium: desde 30\u20AC aprox."}]},{dia:"D\xEDa 4 \u2013 Excursi\xF3n a Transilvania (castillos y Brasov)",zonas:[{nombre:"Salida temprana desde Bucarest",descripcion:`Las excursiones a Transilvania son largas (unas 12 horas), por lo que es imprescindible salir temprano. Lo habitual es comenzar entre las 06:30 y 07:30 desde Bucarest.

 \u{1F4A1} Consejo: duerme bien, lleva algo de desayuno o snacks y prep\xE1rate para un d\xEDa intenso pero espectacular.`,horario:"06:30 \u2013 07:30",precio:"Excursi\xF3n completa \u2248 30\u201340\u20AC por persona"},{nombre:"Desayuno en Luca \u2013 Covrig",descripcion:"Antes de salir o para llevar, haz una parada r\xE1pida en Luca. Sus covrigi son el desayuno t\xEDpico rumano: baratos, r\xE1pidos y perfectos para comer en ruta mientras sales de la ciudad.",foto:"cld:europa/rumania/bucarest/luca-covrigi",horario:"Antes de la salida",precio:"Muy econ\xF3mico (0.40-1.90\u20AC)"},{nombre:"Ruta hacia los C\xE1rpatos",descripcion:"El trayecto hacia Transilvania atraviesa paisajes rurales y zonas de monta\xF1a. Son varias horas de carretera, pero el paisaje ya empieza a marcar el ambiente del viaje.",horario:"Ma\xF1ana",precio:"Incluido en excursi\xF3n"},{nombre:"Palacio Peli\u0219or",descripcion:"Primera parada del d\xEDa. Este peque\xF1o palacio real es m\xE1s \xEDntimo que Pele\u0219 pero muy elegante. Fue residencia de los reyes Fernando y Mar\xEDa y destaca por su estilo art nouveau. Es una visita r\xE1pida que sirve como introducci\xF3n perfecta al complejo real.",foto:"cld:europa/rumania/bucarest/palacio-pelisor",horario:"Media ma\xF1ana",precio:"Entrada aparte (\u2248 6\u20AC)"},{nombre:"Castillo de Pele\u0219",descripcion:`A pocos metros se encuentra la joya del d\xEDa: el Castillo de Pele\u0219. Considerado uno de los castillos m\xE1s bonitos de Europa, parece sacado de un cuento. Rodeado de naturaleza y con interiores espectaculares, fue la residencia de verano de la monarqu\xEDa rumana.

 \u{1F4A1} Consejo: si puedes entrar, hazlo.`,foto:"cld:europa/rumania/bucarest/castillo-peles",horario:"Media ma\xF1ana",precio:"Entrada aparte (\u2248 20\u20AC)"},{nombre:"Academia Nevermore (Mi\xE9rcoles Addams)",descripcion:'De camino hacia Bran, pasar\xE1s por una localizaci\xF3n asociada con la est\xE9tica de la serie "Wednesday". Aunque no siempre es una visita oficial, es una parada curiosa para fotos y para los fans de la serie.',foto:"cld:europa/rumania/bucarest/nevermore",horario:"Parada breve",precio:"Gratis exterior"},{nombre:"Castillo de Bran (Dr\xE1cula)",descripcion:`El castillo m\xE1s famoso de Ruman\xEDa. Su relaci\xF3n con Dr\xE1cula es m\xE1s leyenda que realidad, pero su ubicaci\xF3n entre monta\xF1as y su est\xE9tica medieval lo convierten en un imprescindible. 

 \u{1F4A1} Consejo: suele haber bastante gente, as\xED que t\xF3malo con calma.`,foto:"cld:europa/rumania/bucarest/castillo-bran",horario:"Tarde",precio:"Incluido en excursi\xF3n"},{nombre:"Bra\u0219ov \u2013 casco hist\xF3rico y comida",descripcion:"\xDAltima gran parada del d\xEDa. Pasea por la Plaza del Consejo (Pia\u021Ba Sfatului), rodeada de edificios de colores, y visita la Iglesia Negra. Es el lugar perfecto para parar, descansar y comer algo. Aqu\xED puedes probar cocina local o sitios como Twist. Ambiente tranquilo y muy europeo.",fotos:["cld:europa/rumania/bucarest/brasov","cld:europa/rumania/bucarest/brasov-plz-consejo","cld:europa/rumania/bucarest/brasov-iglesia-negra-1","cld:europa/rumania/bucarest/brasov-iglesia-negra-2"],horario:"Tarde",precio:"Comida moderada"},{nombre:"Regreso a Bucarest",descripcion:"Tras un d\xEDa intenso recorriendo Transilvania, comienza el regreso a Bucarest. El trayecto suele ser largo y puede variar seg\xFAn el tr\xE1fico, especialmente a la entrada de la ciudad. Lo habitual es llegar entre las 20:00 y las 22:00, por lo que es buen momento para relajarse en el transporte y recargar energ\xEDa para la noche.",horario:"Noche",precio:"Incluido en excursi\xF3n"},{nombre:"Cena en Caru\u2019 cu Bere",descripcion:"Ya en Bucarest, la mejor forma de cerrar el d\xEDa es cenar en Caru\u2019 cu Bere, uno de los restaurantes m\xE1s emblem\xE1ticos de la ciudad. Su interior hist\xF3rico y su ambiente animado lo convierten en una experiencia en s\xED misma. Es el lugar perfecto para probar platos tradicionales como los sarmale acompa\xF1ados de cerveza local.",horario:"Noche",precio:"Moderado"},{nombre:"Paseo nocturno \u2013 Canal del D\xE2mbovi\u021Ba y la Loba Capitolina",descripcion:`Despu\xE9s de la cena, un paseo por el centro es el broche perfecto para el d\xEDa. Muy cerca, el r\xEDo D\xE2mbovi\u021Ba recorre la ciudad canalizado, fruto de las transformaciones urban\xEDsticas impulsadas durante la etapa comunista por Nicolae Ceau\u0219escu. Este tipo de proyectos buscaban modernizar Bucarest, aunque supusieron la desaparici\xF3n de parte de su patrimonio hist\xF3rico.

Hoy, el canal forma parte del paisaje urbano y ofrece un entorno agradable para caminar, especialmente por la noche, cuando la ciudad est\xE1 iluminada y el ambiente es m\xE1s tranquilo.

A pocos minutos se encuentra la Loba Capitolina, s\xEDmbolo del origen latino del pueblo rumano. La estatua representa a R\xF3mulo y Remo siendo amamantados por la loba, un icono muy presente en la identidad cultural del pa\xEDs.

Un plan ideal para terminar el d\xEDa con calma, combinando historia, paseo y ambiente nocturno.`,fotos:["cld:europa/rumania/bucarest/canal-dambovita","cld:europa/rumania/bucarest/loba-capitolina"],noCropGallery:!0}]},{dia:"D\xEDa 5 \u2013 Shopping, parques y barrio Prim\u0103verii",zonas:[{nombre:"Shopping en Bucarest",descripcion:"Empieza el d\xEDa con tiempo libre para compras, ya sea en centros comerciales, tiendas del centro o buscando recuerdos del viaje. Es un buen momento para pasear sin prisas y aprovechar las \xFAltimas horas en la ciudad.",horario:"Ma\xF1ana (horario comercial habitual: 10:00\u201321:00)"},{nombre:"Arco del Triunfo",descripcion:`Uno de los monumentos m\xE1s emblem\xE1ticos de Bucarest, construido para conmemorar la victoria de Ruman\xEDa en la Primera Guerra Mundial. Inspirado en los grandes arcos triunfales europeos, es un s\xEDmbolo de la unidad nacional y una parada imprescindible en la zona norte de la ciudad.

\u{1F4A1} Lo mejor de la visita es subir a la parte superior, desde donde se obtienen muy buenas vistas del Parque Her\u0103str\u0103u y de la Avenida Kiseleff.

\u{1F4A1} Importante: el acceso al interior puede verse restringido por eventos oficiales, por lo que conviene confirmarlo antes de ir.`,foto:"cld:europa/rumania/bucarest/arco-triunfo",horario:"Mar\u2013Dom: 09:00\u201317:00 | Lun: cerrado",precio:"\u2248 4\u20135\u20AC adultos | Estudiantes y alumnos: descuento | Exterior: gratis"},{nombre:"Parque Rey Miguel I (Parcul Regele Mihai I)",descripcion:`El parque m\xE1s grande y espectacular de Bucarest, situado alrededor del lago Her\u0103str\u0103u. Es el lugar perfecto para desconectar del ritmo de la ciudad, pasear entre naturaleza y disfrutar de una de las zonas m\xE1s agradables de la capital.

\u{1F4A1} Puedes recorrerlo caminando, alquilar una bicicleta o incluso dar un paseo en barco por el lago durante los meses de verano.

\u{1F374} Gastronom\xEDa: dentro del parque encontrar\xE1s muchas terrazas y restaurantes. Destaca Ber\u0103ria H, la cervecer\xEDa m\xE1s grande del sureste de Europa, o el Hard Rock Cafe.

\u{1F4A1} Recomendaci\xF3n: es una zona ideal para probar la varz\u0103 c\u0103lit\u0103 (col frita), muy t\xEDpica en la cocina rumana.`,foto:"cld:europa/rumania/bucarest/parque-rey-miguel",horario:"Abierto 24h todos los d\xEDas",precio:"Gratis | Barcas: \u2248 2\u20134\u20AC | Bicicletas: alquiler por horas (\u2248 2\u20135\u20AC)"},{nombre:"Museo Satului (Museo Nacional de la Aldea \u201CDimitrie Gusti\u201D)",descripcion:`Uno de los museos al aire libre m\xE1s grandes y antiguos de Europa, situado dentro del Parque Rey Miguel I. Re\xFAne m\xE1s de 300 construcciones tradicionales (casas, iglesias de madera, molinos) tra\xEDdas de todas las regiones de Ruman\xEDa entre los siglos XVII y XX.

Es una visita imprescindible para entender la vida rural rumana y su evoluci\xF3n hist\xF3rica, todo en un entorno natural muy agradable.

\u{1F4A1} Consejo: dedica al menos 2\u20133 horas, ya que el recinto es bastante grande y merece la pena recorrerlo con calma.

\u{1F4A1} Extra: los fines de semana suelen organizar ferias de artesan\xEDa y talleres donde puedes comprar productos tradicionales aut\xE9nticos.`,foto:"cld:europa/rumania/bucarest/museo-satului",horario:`Todos los d\xEDas: 09:00\u201317:00 | Verano: hasta 19:00
(\xDAltimo acceso a interiores: 30 min antes del cierre)`,precio:`\u2248 6\u20AC adultos (30 RON) | Pensionistas: \u2248 3\u20AC | Estudiantes: \u2248 1.5\u20AC
Audiogu\xEDa: +3\u20134\u20AC opcional`},{nombre:"Barrio Prim\u0103verii",descripcion:`El barrio m\xE1s exclusivo y elegante de Bucarest, situado al norte de la ciudad. Conocido por su historia pol\xEDtica, sus calles arboladas y sus villas de lujo, representa la cara m\xE1s sofisticada y tranquila de la capital.

Pasear por Prim\u0103verii es una experiencia en s\xED misma: muchas de sus calles llevan nombres de capitales europeas y est\xE1n rodeadas de embajadas y residencias hist\xF3ricas, creando un ambiente muy distinto al centro de la ciudad.

\u{1F4A1} Qu\xE9 ver: destaca la arquitectura de sus villas, antiguas residencias de la \xE9lite pol\xEDtica, y el contraste entre tradici\xF3n y modernidad.

\u{1F4A1} Extra: en la zona se encuentra el Museo de Arte Reciente (MARe), con una interesante colecci\xF3n de arte contempor\xE1neo rumano.

\u{1F4A1} Consejo: es un barrio ideal para pasear sin prisas y parar en alguna cafeter\xEDa o restaurante elegante.

\u{1F374} Recomendaci\xF3n gastron\xF3mica: buena zona para probar la tochitur\u0103, uno de los platos m\xE1s t\xEDpicos rumanos.`,horario:`Zona urbana visitable todo el d\xEDa
MARe: Mi\xE9\u2013Lun 11:00\u201319:00 | Mar: cerrado`,precio:"Gratis (barrio) | MARe \u2248 5\u20137\u20AC"},{nombre:"Mansi\xF3n de Ceau\u0219escu (Palacio Prim\u0103verii)",descripcion:`Residencia privada del dictador Nicolae Ceau\u0219escu y su familia durante m\xE1s de 25 a\xF1os. Hoy convertida en museo, es una de las visitas m\xE1s impactantes de Bucarest por el contraste entre el lujo extremo en el que viv\xEDa la \xE9lite comunista y la realidad del pa\xEDs en esa \xE9poca.

En su interior se pueden recorrer m\xE1s de 80 estancias, incluyendo un cine privado, una piscina interior con impresionantes mosaicos, un b\xFAnker y ba\xF1os con grifos de oro. Los jardines tambi\xE9n forman parte de la visita y cuentan incluso con pavos reales.

\u{1F4A1} Importante: la visita solo se puede realizar mediante tour guiado.

\u{1F4A1} Consejo: reserva con al menos 24\u201348h de antelaci\xF3n, ya que los grupos son reducidos y se suele llenar.`,foto:"cld:europa/rumania/bucarest/mansion-ceausescu",horario:"Mar\u2013Dom: 10:00\u201317:00 | Lun: cerrado",precio:`\u2248 12\u20AC adultos (60 RON) | Estudiantes/Pensionistas: \u2248 8\u20AC
(Tour en ingl\xE9s puede ser ligeramente m\xE1s caro)`},{nombre:"Comida de despedida \u2013 City Grill (Barrio Prim\u0103verii)",descripcion:`Una forma perfecta de cerrar el viaje es con una comida o cena especial en el barrio Prim\u0103verii, una de las zonas m\xE1s elegantes de Bucarest.

En el restaurante City Grill puedes probar platos t\xEDpicos rumanos en un ambiente m\xE1s cuidado y moderno. Durante la visita, destacan sabores tradicionales como la zacusc\u0103 (crema de verduras) y la ciorb\u0103 de v\u0103cu\u021B\u0103, una sopa de ternera muy popular.

El broche final lo pone el postre: una pavlova preparada en directo en la mesa, tipo show cooking, que convierte la experiencia en algo diferente y memorable.`,fotos:["cld:europa/rumania/bucarest/zacusca-y-ciorba-vacuna","cld:europa/rumania/bucarest/pavlova"],horario:"Comida y cena (aprox. 12:00\u201323:00)",precio:"\u2248 15\u201325\u20AC por persona"}]}]},{titulo:"Gastronom\xEDa",platos:[{nombre:"Sarmale",descripcion:"Rollitos de col rellenos de carne y arroz, uno de los platos m\xE1s emblem\xE1ticos de la cocina rumana.",foto:"cld:europa/rumania/bucarest/sarmale",precio:"Moderado"},{nombre:"Mici",descripcion:"Peque\xF1as salchichas de carne especiada a la parrilla, uno de los grandes cl\xE1sicos de la comida callejera rumana.",foto:"cld:europa/rumania/bucarest/mici",precio:"Econ\xF3mico"},{nombre:"Covrigi",descripcion:"Rosquillas saladas muy populares en Ruman\xEDa, ideales para desayunar o tomar algo r\xE1pido durante el d\xEDa.",foto:"cld:europa/rumania/bucarest/luca-covrigi",precio:"Muy econ\xF3mico (0.40\u20131.90\u20AC)"},{nombre:"Covrig relleno (Twist)",descripcion:"El covrig es uno de los snacks m\xE1s t\xEDpicos de Ruman\xEDa, similar a un pretzel. Esta versi\xF3n tipo \u201Ctwist\u201D es una variante moderna, con masa crujiente por fuera y rellena normalmente de queso. Muy popular como comida r\xE1pida en ciudades como Bra\u0219ov.",foto:"cld:europa/rumania/bucarest/twist",precio:"Muy econ\xF3mico (1\u20133\u20AC)"},{nombre:"Zacusc\u0103",descripcion:"Pasta vegetal tradicional elaborada con pimientos, berenjenas y tomate, muy t\xEDpica para untar en pan.",foto:"cld:europa/rumania/bucarest/zacusca",precio:"Econ\xF3mico"},{nombre:"Ciorb\u0103 de fasole",descripcion:"Sopa de alubias muy t\xEDpica y reconfortante, una de las preparaciones m\xE1s populares de la cocina rumana.",foto:"cld:europa/rumania/bucarest/ciorba-fasole",precio:"Moderado"},{nombre:"Varz\u0103 c\u0103lit\u0103",descripcion:"Col frita o rehogada, guarnici\xF3n muy habitual en la gastronom\xEDa rumana.",foto:"cld:europa/rumania/bucarest/varza-calita",precio:"Econ\xF3mico"},{nombre:"Pl\u0103cint\u0103",descripcion:"Pastel o masa rellena, muy popular en la cocina rumana y moldava, con versiones dulces y saladas.",foto:"cld:europa/rumania/bucarest/placinta",precio:"Econ\xF3mico"},{nombre:"Cozonac",descripcion:"Dulce tradicional rumano, especialmente t\xEDpico en celebraciones, con masa esponjosa y rellenos variados.",foto:"cld:europa/rumania/bucarest/cozonac",precio:"Econ\xF3mico"},{nombre:"Palinca",descripcion:"Aguardiente tradicional de frutas, muy presente en la gastronom\xEDa y cultura popular de Ruman\xEDa.",foto:"cld:europa/rumania/bucarest/palinca",precio:"Seg\xFAn local"},{nombre:"Ensalada de berenjenas",descripcion:"Crema tradicional elaborada con berenjena asada, muy popular en mercados y restaurantes locales.",precio:"Econ\xF3mico"},{nombre:"Tochitur\u0103",descripcion:"Guiso tradicional rumano de carne, contundente y sabroso, muy representativo de la cocina local.",precio:"Moderado"}]},{titulo:"D\xF3nde comer en Bucarest",lugares:[{nombre:"Caru\u2019 cu Bere",descripcion:`Caru\u2019 cu Bere es, probablemente, el restaurante m\xE1s emblem\xE1tico de Bucarest. Situado en pleno casco antiguo, en un espectacular edificio neog\xF3tico de 1879, no es solo un restaurante, es una experiencia completa que mezcla historia, gastronom\xEDa y cultura rumana.

Nada m\xE1s entrar te envuelve su decoraci\xF3n: madera tallada, vitrales de colores y un ambiente que parece sacado de otra \xE9poca.

\u{1F37D}\uFE0F Qu\xE9 probar (imprescindible):
Los sarmale, el plato m\xE1s representativo de Ruman\xEDa. Se sirven de forma tradicional con m\u0103m\u0103lig\u0103 (polenta), panceta ahumada, crema agria (sm\xE2nt\xE2n\u0103) y un pimiento picante.

\u{1F4A1} Experiencia TOP: es un plato contundente, sabroso y muy aut\xE9ntico. Perfecto para entender la gastronom\xEDa rumana de verdad.

\u{1F370} Postre recomendado: los papan\u0103\u0219i (donas rumanas con queso, nata y mermelada). De los mejores de la ciudad.

\u{1F3AD} Ambiente:
Por la noche, el restaurante cobra vida con espect\xE1culos de bailes folcl\xF3ricos rumanos en directo, lo que convierte la cena en una experiencia cultural completa.

\u{1F4A1} Consejo viajero:
\u2022 Para ambiente tranquilo \u2192 ve a mediod\xEDa.
\u2022 Para experiencia completa \u2192 cena con espect\xE1culo.

\u{1F4A1} IMPORTANTE: es uno de los sitios m\xE1s demandados de Bucarest, por lo que es muy recomendable reservar con antelaci\xF3n.`,horario:`Todos los d\xEDas: 10:00\u201324:00
Espect\xE1culos: desde ~19:30\u201320:00`,precio:`\u2248 10\u201313\u20AC (50\u201365 RON por los sarmale)
Precio general: moderado`},{nombre:"Hanul lui Manuc",descripcion:`Hanul lui Manuc es la posada en funcionamiento m\xE1s antigua de Bucarest (1808) y uno de los lugares m\xE1s especiales para cenar en la ciudad. Situado en pleno casco antiguo, combina historia, arquitectura tradicional y gastronom\xEDa rumana en un mismo espacio.

\u{1F3DB}\uFE0F Historia y ambiente:
El edificio es una aut\xE9ntica joya arquitect\xF3nica, con un gran patio interior rodeado de balcones de madera tallada. Aqu\xED se firm\xF3 el Tratado de Bucarest en 1812, lo que lo convierte en un lugar clave en la historia de la ciudad.

\u{1F319} Experiencia:
Cenar en su patio, especialmente por la noche, es una de las experiencias m\xE1s aut\xE9nticas de Bucarest. El ambiente, la iluminaci\xF3n y la m\xFAsica hacen que parezca un viaje al pasado.

\u{1F3AD} Por la noche:
Suelen tener m\xFAsica en directo y bailes tradicionales rumanos, creando una atm\xF3sfera muy similar (pero m\xE1s tranquila) que Caru\u2019 cu Bere.

\u{1F37D}\uFE0F Qu\xE9 pedir:
\u2022 Platos tradicionales rumanos
\u2022 Carnes a la brasa
\u2022 Platos de caza (muy recomendados)

\u{1F4A1} Consejo viajero:
Si buscas una experiencia m\xE1s tranquila y aut\xE9ntica que Caru\u2019 cu Bere, este es tu sitio.

\u{1F4A1} Recomendaci\xF3n TOP:
Reserva mesa en el patio interior, especialmente en verano. Es donde est\xE1 la magia.`,horario:`Dom\u2013Jue: 10:00\u201300:00
Vie\u2013S\xE1b: 10:00\u201302:00`,precio:`\u2248 10\u201318\u20AC por plato principal (50\u201390 RON)
Rango: medio-alto`},{nombre:"LUCA",descripcion:`Las Simigeria LUCA son una aut\xE9ntica instituci\xF3n en Bucarest. No son una panader\xEDa tradicional, sino puestos de street food especializados en covrigi, una especie de pretzel rumano que se sirve siempre caliente y reci\xE9n hecho.

Es uno de los desayunos y snacks m\xE1s t\xEDpicos del pa\xEDs, perfecto para comer algo r\xE1pido, barato y muy local mientras recorres la ciudad.

\u{1F968} Qu\xE9 pedir:
\u2022 Covrigi cl\xE1sicos (cu susan o cu sare): los m\xE1s tradicionales, con s\xE9samo o sal.
\u2022 Luca tradicional: relleno de jam\xF3n y queso o queso con aceitunas (muy top).
\u2022 Covridog: versi\xF3n tipo hot dog envuelto en masa de covrig.
\u2022 Covripuici: relleno de pollo, queso y especias.
\u2022 Opciones dulces: manzana, chocolate o cereza.

\u{1F4A1} Experiencia real: siempre hay cola, pero avanza rapid\xEDsimo. La rotaci\xF3n es tan alta que te lo dan reci\xE9n hecho, literalmente quemando \u{1F605}.

\u{1F4A1} Consejo viajero: ideal para desayunar antes de empezar el d\xEDa o para llevarte algo r\xE1pido si vas con prisa.

\u{1F4A1} Tip local: acomp\xE1\xF1alo con un caf\xE9 para tener el combo completo como un rumano m\xE1s.`,horario:"Lun\u2013Vie: 06:00\u201321:00 | Fin de semana: 07:00\u201321:00",precio:"Muy econ\xF3mico: \u2248 0.50\u20AC \u2013 3\u20AC (2\u201315 RON)"},{nombre:"Ana Pan",descripcion:`Si Luca es el rey del street food r\xE1pido, Ana Pan es la reina de la reposter\xEDa en Bucarest. Fundada en 1990, es una de las marcas m\xE1s queridas por los locales para comprar productos horneados de alta calidad.

\u{1F370} Producto estrella:
El Cozonac, el pan dulce tradicional rumano (similar al panettone pero m\xE1s denso y trenzado).

\u{1F4A1} Qu\xE9 probar:
\u2022 Cozonac de nuez y cacao (el m\xE1s t\xEDpico)
\u2022 Versiones con pasas o delicias turcas (rahat)

La masa es muy esponjosa, con mucho relleno y sabor intenso a mantequilla.

\u{1F369} Otros dulces recomendados:
\u2022 Amandine (pastel de chocolate muy jugoso)
\u2022 Pasca (t\xEDpico en Pascua, con queso dulce)
\u2022 Pl\u0103cinte dulces de manzana o queso

\u{1F4CD} D\xF3nde encontrarlo:
\u2022 Zona Doroban\u021Bi (cerca de Prim\u0103verii)
\u2022 Victoriei (cerca del Museo del Campesino)
\u2022 Centro (Pia\u021Ba Roman\u0103)

\u{1F4A1} Consejo viajero:
Si quieres llevarte un souvenir gastron\xF3mico, el Cozonac es de lo mejor que puedes comprar. Aguanta bien varios d\xEDas y es muy t\xEDpico.`,horario:"08:00 \u2013 20:00 (aprox.) | Algunos locales hasta 21:00 | Fines de semana cierre algo m\xE1s temprano",precio:"Cozonac entero: 14\u201319\u20AC (70\u201395 RON) | Porciones individuales disponibles"},{nombre:"Barrio Prim\u0103verii",descripcion:`Si quieres probar la gastronom\xEDa rumana en un entorno m\xE1s elegante y tranquilo, el barrio de Prim\u0103verii es uno de los mejores lugares de Bucarest.

Aqu\xED la experiencia cambia respecto al centro: menos turismo, mejor producto y restaurantes frecuentados por locales.

\u{1F356} Plato imprescindible en esta zona:
La tochitur\u0103, uno de los platos m\xE1s contundentes de la cocina rumana.

Se trata de un guiso de carne de cerdo con salchichas, huevo frito y queso, servido sobre m\u0103m\u0103lig\u0103 (polenta). Es potente, sabroso y muy tradicional.


\u{1F4CD} Mejores sitios para probarla:

\u2022 Zexe Zahana \u2B50 (experiencia premium)
Uno de los restaurantes m\xE1s prestigiosos de Bucarest.

\u{1F4A1} Concepto:
Reinterpretaci\xF3n de recetas tradicionales de la burgues\xEDa rumana en un entorno elegante.

\u{1F372} Imprescindible:
La ciorb\u0103 de fasole servida en pan (ciorb\u0103 \xEEn p\xE2ine), una de las experiencias m\xE1s ic\xF3nicas del pa\xEDs.

\u{1F4A1} Su tochitur\u0103 utiliza ingredientes de alta calidad con una presentaci\xF3n m\xE1s cuidada.

\u2022 City Grill Prim\u0103verii \u2B50 (mejor calidad-precio)
La opci\xF3n m\xE1s equilibrada del barrio.

\u{1F4A1} Experiencia personal:
Aqu\xED probamos zacusc\u0103, ciorb\u0103 de v\u0103cu\u021B\u0103 y una pavlova preparada en mesa.

La tochitur\u0103 es abundante, fiel a la receta tradicional y perfecta si buscas algo aut\xE9ntico sin pagar precios elevados.`,horario:`Zexe Zahana: Lun y Mi\xE9\u2013Dom 12:00\u201300:00 | Mar 14:00\u201300:00
City Grill: 08:00\u201322:00 (hasta 23:00 fines de semana)`,precio:`Tochitur\u0103: 11\u201317\u20AC (55\u201385 RON)
Zexe: medio-alto | City Grill: 10\u201314\u20AC`},{nombre:"La Pl\u0103cinte",descripcion:`La Pl\u0103cinte es una de las cadenas m\xE1s queridas de Bucarest y una parada imprescindible si quieres probar comida tradicional con sabor casero.

Originaria de Moldavia, este restaurante ofrece una experiencia aut\xE9ntica, sencilla y muy reconfortante, con recetas que recuerdan a la cocina de la abuela.

\u{1F95F} Especialidad imprescindible:
Las pl\u0103cinte, unos pasteles de masa fina rellenos.

\u{1F4CD} Qu\xE9 probar:
\u2022 Queso con eneldo (la m\xE1s t\xEDpica)
\u2022 Patata, carne o calabaza
\u2022 Dulces de cereza o manzana

\u{1F372} Otros platos:
\u2022 Zeam\u0103 (sopa moldava)
\u2022 M\u0103m\u0103lig\u0103 con queso
\u2022 Postre Guguri\u021B\u0103

\u{1F4A1} Consejo: acomp\xE1\xF1alo con limonada casera o t\xE9 de frutas del bosque.`,horario:"Todos los d\xEDas: 10:00 \u2013 22:00 (aprox.)",precio:"Pl\u0103cinte: 5\u20137\u20AC | Comida completa: 10\u201314\u20AC"},{nombre:"Ciorb\u0103rie",descripcion:`Si quieres probar la cocina rumana m\xE1s aut\xE9ntica y reconfortante, Ciorb\u0103rie es una parada obligatoria. Esta cadena local est\xE1 especializada en ciorb\u0103, las sopas tradicionales rumanas, conocidas por su sabor intenso y su toque ligeramente \xE1cido.

El concepto es tipo fast-casual, pero con comida casera de verdad. Cada d\xEDa ofrecen entre 8 y 10 sopas diferentes, lo que lo convierte en un sitio perfecto para repetir o probar distintos sabores.

\u{1F372} Experiencia TOP: el goulash aqu\xED se sirve al estilo rumano, como una ciorb\u0103 de ternera espesa, con patatas, piment\xF3n y comino. Es contundente, sabroso y perfecto para reponer energ\xEDa despu\xE9s de un d\xEDa de turismo.

\u{1F4A1} C\xF3mo se come: acompa\xF1a la sopa con sm\xE2nt\xE2n\u0103 (crema agria) y un ardei iute (guindilla picante). Es la forma m\xE1s aut\xE9ntica de disfrutarla.

\u{1F4A1} Detalle local: normalmente te incluyen pan r\xFAstico gratis, ideal para mojar.

\u{1F4A1} Consejo viajero: el men\xFA cambia cada d\xEDa, as\xED que puedes consultar sus redes sociales por la ma\xF1ana para ver qu\xE9 sopas hay disponibles.

Es una opci\xF3n perfecta para comer r\xE1pido, barato y muy local, lejos de los restaurantes m\xE1s tur\xEDsticos.`,horario:`Lun\u2013Vie: 11:00\u201320:00 (o hasta agotar existencias)
Fines de semana: horario reducido seg\xFAn local`,precio:"Muy econ\xF3mico: \u2248 4\u20135\u20AC (18\u201325 RON por raci\xF3n)"},{nombre:"Parque Rey Miguel I",descripcion:`Si est\xE1s paseando por el Parque Rey Miguel I (Her\u0103str\u0103u), este es uno de los mejores lugares de Bucarest para hacer una parada gastron\xF3mica con vistas al lago.

Aqu\xED puedes probar la varz\u0103 c\u0103lit\u0103, un plato tradicional rumano de col/repollo cocinado lentamente, muy sabroso y reconfortante.

\u{1F37D}\uFE0F Mejores opciones dentro del parque:

1\uFE0F\u20E3 Restaurante Pesc\u0103ru\u0219
Un cl\xE1sico de Bucarest fundado en 1938, con una terraza espectacular junto al lago.

\u{1F4A1} Qu\xE9 pedir:
Varz\u0103 c\u0103lit\u0103 acompa\xF1ada de pato (ra\u021B\u0103 pe varz\u0103) o costillas.

\u{1F4A1} Experiencia:
Ambiente elegante pero relajado, ideal para comer tranquilo con vistas.


2\uFE0F\u20E3 Ber\u0103ria H
La cervecer\xEDa m\xE1s grande del sureste de Europa, con un ambiente totalmente distinto.

\u{1F4A1} Qu\xE9 pedir:
Varz\u0103 c\u0103lit\u0103 con salchichas o costillas, acompa\xF1ado de cerveza.

\u{1F4A1} Experiencia:
Ambiente muy animado, m\xFAsica en directo y rollo festivo.


\u{1F4A1} Consejo viajero:
\u2022 Si buscas algo tranquilo \u2192 Pesc\u0103ru\u0219
\u2022 Si quieres ambiente y fiesta \u2192 Ber\u0103ria H

Es una parada perfecta para combinar con el paseo por el parque o despu\xE9s de visitar el Museo Satului.`,horario:`Pesc\u0103ru\u0219: 09:00\u201323:00 (Vie\u2013S\xE1b hasta 00:00)
Ber\u0103ria H: desde 12:00 hasta 01:00 (hasta 03:00 fines de semana)`,precio:"\u2248 9\u201312\u20AC (45\u201360 RON por plato)"},{nombre:"Mercado de Obor - Terasa Obor",descripcion:`El Mercado de Obor es el mercado m\xE1s grande y tradicional de Bucarest y uno de los mejores lugares para vivir la esencia local.

Aqu\xED se mezcla todo: puestos de agricultores, productos tradicionales, comida callejera y un ambiente muy aut\xE9ntico.

Pero si hay algo que hace famoso a este lugar, es su zona exterior de parrillas, donde se encuentra Terasa Obor.


\u{1F525} Experiencia imprescindible:
Comer mici en Terasa Obor

Es probablemente el sitio m\xE1s ic\xF3nico de Bucarest para probar estos famosos rollitos de carne a la parrilla.

Es r\xE1pido, ca\xF3tico y 100% local.


\u{1F356} Qu\xE9 pedir:
\u2022 Mici (3\u20135 por persona)
\u2022 Mostaza (incluida)
\u2022 Pan

\u{1F4A1} Recomendaci\xF3n TOP:
No te vayas sin probar la ensalada de berenjenas (salat\u0103 de vinete), uno de los sabores m\xE1s t\xEDpicos de Ruman\xEDa.

\u{1F4A1} Consejos viajeros:

\u2022 Mejor ir al mediod\xEDa
\u2022 Fines de semana \u2192 cola de 15\u201320 min (avanza r\xE1pido)
\u2022 Lleva efectivo para el mercado (aunque Terasa acepta tarjeta)


\u{1F4A1} Extra:
Aprovecha para comprar productos locales: quesos, miel, embutidos o fruta a muy buen precio.

Es uno de los lugares m\xE1s aut\xE9nticos de toda la ciudad.`,horario:`Mercado: Lun\u2013Vie 07:00\u201319:00 | S\xE1b 07:00\u201318:00 | Dom 07:00\u201316:00
Terasa Obor: Lun\u2013Vie 09:00\u201318:00 | S\xE1b\u2013Dom 09:00\u201317:00`,precio:"Entrada gratuita | Mici: 1\u20AC aprox. (5\u20136 RON/unidad) | Muy econ\xF3mico"},{nombre:"Mercado Amzei y feria del Museo del Campesino Rumano",descripcion:`Si quieres probar zacusc\u0103 aut\xE9ntica en Bucarest, esta es una de las mejores zonas. Muy cerca del Museo del Campesino Rumano tienes varias opciones para encontrar productos tradicionales, especialmente esta famosa pasta vegetal rumana.

La opci\xF3n m\xE1s c\xF3moda es el Mercado Amzei, un mercado c\xE9ntrico con productos de muy buena calidad. Aqu\xED encontrar\xE1s puestos con frutas, verduras, quesos locales y frascos de zacusc\u0103 artesanal.

\u{1F4A1} Experiencia TOP: si tu visita coincide en fin de semana, el mejor plan es la feria que se monta en el patio del Museo del Campesino. Productores de todo el pa\xEDs vienen a vender productos caseros, incluyendo diferentes tipos de zacusc\u0103.

\u{1F4A1} Extra: dentro del propio museo suele haber una peque\xF1a tienda con productos tradicionales (miel, mermeladas y zacusc\u0103 de calidad).

\u{1F4A1} Recomendaci\xF3n: prueba la zacusc\u0103 de vinete (berenjena), la m\xE1s cl\xE1sica, o la de ghebe (setas), que es m\xE1s especial y menos com\xFAn.

\u{1F4A1} Consejo viajero: si vas entre semana o el museo est\xE1 cerrado, el Mercado Amzei es la mejor alternativa cercana. Si quieres m\xE1s variedad todav\xEDa, el Mercado de Obor sigue siendo la opci\xF3n m\xE1s completa.`,horario:`Mercado Amzei:
Lun\u2013Vie: 06:00\u201321:00 | S\xE1b: 06:00\u201319:00 | Dom: 06:00\u201315:00

Feria del museo (fin de semana):
Vie\u2013Dom: 10:00\u201318:00

Tienda del museo:
Mar\u2013Dom: 10:00\u201318:00`,precio:"Acceso gratuito | Productos econ\xF3micos\u2013moderados"}]},{titulo:"Consejos pr\xE1cticos",contenido:"Bucarest combina monumentos dispersos con zonas muy caminables, por lo que conviene organizar bien cada jornada. El centro hist\xF3rico se puede recorrer a pie, pero para distancias m\xE1s largas resulta \xFAtil combinar metro, taxi o apps de transporte. La gastronom\xEDa local merece mucho la pena y es recomendable reservar en algunos restaurantes muy demandados."}]};var ME={path:"america/sudamerica/brasil/rio-de-janeiro",nombre:"R\xEDo de Janeiro",flag:"assets/america/sudamerica/brasil/rio/rio-flag.png",background:"assets/america/sudamerica/brasil/rio/rio-bg.jpg",bgPos:"50% 35%",bgPosMobile:"50% 30%",flagOverlay:!0,flagOpacity:.1,flagSize:"55%",bgBrightness:.85,descripcion:'R\xEDo de Janeiro, la "Cidade Maravilhosa", es famosa por sus playas ic\xF3nicas (Copacabana, Ipanema), el Cristo Redentor y su vibrante vida cultural y carnavalesca.',infoGeneral:{idioma:"Portugu\xE9s",moneda:"Real Brasile\xF1o (BRL) \u2014 1 \u20AC \u2248 6 BRL",hora:"UTC -3 (\u22124h respecto a Espa\xF1a)",internet:"Roaming fuera de la UE. Recomendada eSIM local.",electricidad:"127V/220V \u2013 Enchufe tipo N",pasaporte:"Requerido",visado:"No necesario hasta 90 d\xEDas",vacunas:"Fiebre amarilla recomendada"},secciones:[{titulo:"Historia",contenido:"Fundada en el siglo XVI, R\xEDo fue capital de Brasil hasta 1960. Su historia mezcla influencias ind\xEDgenas, coloniales portuguesas y modernas transformaciones urbanas que la convirtieron en un importante centro cultural y tur\xEDstico."},{titulo:"Geograf\xEDa y Clima",contenido:"Situada entre monta\xF1as y el oc\xE9ano Atl\xE1ntico, R\xEDo tiene un clima tropical atl\xE1ntico: veranos calurosos y h\xFAmedos (diciembre\u2013marzo) y inviernos suaves (junio\u2013agosto)."},{titulo:"Qu\xE9 visitar en R\xEDo de Janeiro",itinerario:[{dia:"D\xEDa 1 \u2013 Centro hist\xF3rico y samba",zonas:[{nombre:"Pra\xE7a da Rep\xFAblica / Campo de Santana",descripcion:"Tambi\xE9n conocido como Campo de Santana, este parque en el Centro Viejo es un oasis verde en plena ciudad. Alberga fauna urbana como agut\xEDes (cutias), patos y pavos reales. Ideal para un paseo relajado tras la llegada a R\xEDo.",fotos:["assets/america/sudamerica/brasil/rio/rio-praca-republica.jpg","assets/america/sudamerica/brasil/rio/rio-agutis.jpg"],horario:"Acceso libre todo el d\xEDa",precio:"Gratis"},{nombre:"Real Gabinete Portugu\xEAs de Leitura",descripcion:"Una joya arquitect\xF3nica fundada por la comunidad portuguesa. Considerada una de las bibliotecas m\xE1s bellas del mundo, con estanter\xEDas talladas y miles de vol\xFAmenes raros.",fotos:["assets/america/sudamerica/brasil/rio/rio-gabinete-portugues-leitura.jpg"],horario:"10:00\u201318:00 (consultar horarios actualizados)",precio:"Gratis o simb\xF3lico"},{nombre:"Confiteria Colombo",descripcion:"Cl\xE1sico caf\xE9 literario inaugurado en 1894. Famoso por su decoraci\xF3n art nouveau, sus vitrinas de dulces y su ambiente elegante. Aqu\xED puedes degustar el mejor brigadeiro de R\xEDo.",fotos:["assets/america/sudamerica/brasil/rio/rio-cafeteria-colombo.jpg"],horario:"Lunes a s\xE1bado 09:00\u201318:00",precio:"Consumo en local"},{nombre:"Museu do Amanh\xE3",descripcion:"Museo de ciencia y futuro dise\xF1ado por Santiago Calatrava, situado en la zona portuaria. Muestra exposiciones sobre sostenibilidad, cambio clim\xE1tico y el futuro del planeta.",fotos:["assets/america/sudamerica/brasil/rio/rio-museo-amanha.jpg"],horario:"Martes a domingo 10:00\u201318:00",precio:"Entrada \u2248 30 BRL"},{nombre:"Pedra do Sal",descripcion:"Lugar hist\xF3rico de la cultura afro-carioca y cuna de la samba. Cada lunes por la noche hay m\xFAsica en vivo y espect\xE1culos de samba gratuitos en la calle.",fotos:["assets/america/sudamerica/brasil/rio/rio-pedra-do-sal.jpg"],horario:"Lunes desde las 20:00",precio:"Gratis (solo consumo)"}]},{dia:"D\xEDa 2 - Santa Teresa y Lapa",zonas:[{nombre:"Tranv\xEDa amarillo de Santa Teresa (Bonde)",descripcion:"El hist\xF3rico tranv\xEDa amarillo conecta el centro de R\xEDo con el barrio de Santa Teresa cruzando los Arcos da Lapa. Es un viaje emblem\xE1tico con vistas \xFAnicas y mucho encanto local.",foto:"assets/rio/rio-bonde.jpg",horario:"Cada 15-20 min, de 8:00 a 17:00",precio:"\u2248 20 BRL por trayecto"},{nombre:"Largo dos Guimar\xE3es",descripcion:"Coraz\xF3n del barrio bohemio de Santa Teresa, repleto de bares, galer\xEDas y caf\xE9s art\xEDsticos. Ideal para pasear y disfrutar del ambiente relajado y colorido.",foto:"assets/rio/rio-largo-guimaraes.jpg",horario:"Acceso libre todo el d\xEDa",precio:"Gratis"},{nombre:"Almuerzo en Bar do Mineiro",descripcion:"Restaurante ic\xF3nico de Santa Teresa famoso por su feijoada, platos de Minas Gerais y ambiente acogedor lleno de arte local.",foto:"assets/rio/rio-bar-do-mineiro.jpg",horario:"Martes a domingo 11:00\u201300:00",precio:"Plato principal \u2248 40\u201370 BRL"},{nombre:"Parque das Ru\xEDnas",descripcion:"Centro cultural y mirador ubicado en una antigua mansi\xF3n restaurada. Ofrece vistas espectaculares de la bah\xEDa y el centro de R\xEDo.",foto:"assets/rio/rio-parque-ruinas.jpg",horario:"Martes a domingo 8:00\u201318:00",precio:"Gratis"},{nombre:"Arcos da Lapa",descripcion:"El antiguo acueducto del siglo XVIII es uno de los s\xEDmbolos m\xE1s reconocibles de la ciudad. Hoy sostiene la v\xEDa del tranv\xEDa de Santa Teresa.",foto:"assets/rio/rio-arcos-lapa.jpg",horario:"Acceso libre",precio:"Gratis"},{nombre:"Escadaria Selar\xF3n",descripcion:"Colorida escalera de m\xE1s de 2000 azulejos creada por el artista chileno Jorge Selar\xF3n. Representa un homenaje al pueblo brasile\xF1o y a la humanidad.",foto:"assets/rio/rio-selaron.jpg",horario:"Acceso libre",precio:"Gratis"},{nombre:"Cena en Restaurante Nova Capela",descripcion:"Cl\xE1sico restaurante carioca fundado en 1903, ubicado en Lapa. Famoso por su picanha al ajo, cabrito asado y platos tradicionales brasile\xF1os. Ideal para cerrar el d\xEDa con una buena cena en un entorno aut\xE9ntico y animado.",foto:"assets/rio/rio-nova-capela.jpg",horario:"Abierto todos los d\xEDas 11:30\u201303:00",precio:"Platos principales \u2248 60\u2013120 BRL"}]},{dia:"D\xEDa 3 \u2013 Centro hist\xF3rico y playa de Copacabana",zonas:[{nombre:"Catedral de San Sebasti\xE1n",descripcion:"La catedral principal de R\xEDo de Janeiro, de estilo neog\xF3tico con detalles modernos. Se ubica en el coraz\xF3n del centro hist\xF3rico y destaca por su arquitectura religiosa y su relevancia en la vida eclesi\xE1stica de la ciudad.",foto:"assets/rio/rio-catedral-san-sebastian.jpg",horario:"09:00-17:00",precio:"Gratis (donaciones voluntarias)"},{nombre:"Biblioteca Nacional",descripcion:"Una de las mayores bibliotecas de Am\xE9rica Latina. Alberga una vasta colecci\xF3n de documentos hist\xF3ricos, manuscritos, libros raros y fuentes culturales brasile\xF1as.",foto:"assets/rio/rio-biblioteca-nacional.jpg",horario:"10:00-17:00",precio:"Entrada gratuita"},{nombre:"Teatro Municipal de R\xEDo",descripcion:"Majestuoso teatro de estilo inspirado en la \xD3pera de Par\xEDs, s\xEDmbolo cultural de la ciudad. Ofrece visitas guiadas y ocasionalmente espect\xE1culos de m\xFAsica y baile.",foto:"assets/rio/rio-teatro-municipal.jpg",horario:"10:00-17:00 (visitas guiadas)",precio:"Entrada \u2248 20-30 BRL (seg\xFAn actividad)"},{nombre:"Palacio Tiradentes",descripcion:"Sede simb\xF3lica de la Asamblea Legislativa de R\xEDo. Ubicado en la Pra\xE7a XV, es un edificio hist\xF3rico con importancia pol\xEDtica y patrimonial.",foto:"assets/rio/rio-palacio-tiradentes.jpg",horario:"10:00-17:00",precio:"Entrada gratuita o simb\xF3lica"},{nombre:"Palacio Imperial / Pra\xE7a XV (mercadillo)",descripcion:"En la Plaza XV de Novembro se encuentra el Pa\xE7o Imperial, sede cultural con exposiciones y eventos. En los alrededores organizan mercadillos de artesan\xEDa y cultura local en d\xEDas determinados.",foto:"assets/rio/rio-paco-imperial-centro.jpg",horario:"Durante el d\xEDa, mercadillo por la tarde",precio:"Gratis (solo compras si compras algo)"},{nombre:"Puerto hist\xF3rico de la Pra\xE7a XV y Marina da Gl\xF3ria",descripcion:"Zona portuaria tradicional frente a la Pra\xE7a XV, donde se aprecian las vistas de la Bah\xEDa de Guanabara y los ferris que cruzan hacia Niter\xF3i. Es ideal para dar un paseo junto al mar y ver el movimiento de barcos deportivos en la cercana Marina da Gl\xF3ria.",foto:"assets/rio/rio-marina-gloria.jpg",horario:"Abierto todo el d\xEDa",precio:"Gratis"},{nombre:"Playa de Copacabana (tarde)",descripcion:"Para cerrar el d\xEDa con calma, rel\xE1jate en la famosa playa de Copacabana. Pasea por la orilla, disfruta del mar, los quioscos y el ambiente carioca al atardecer.",foto:"assets/rio/rio-copacabana-beach.jpg",horario:"Acceso libre 24h",precio:"Gratis"}]},{dia:"D\xEDa 4 \u2013 Cristo Redentor, Parque Lage e Ipanema",zonas:[{nombre:"Cristo Redentor (Corcovado)",descripcion:"Una de las Siete Maravillas del Mundo Moderno. La estatua de 30 metros de altura domina la ciudad desde el monte Corcovado. Se recomienda visitar temprano y en un d\xEDa despejado para disfrutar de las mejores vistas panor\xE1micas de R\xEDo y la bah\xEDa.",foto:"assets/rio/rio-cristo-redentor.jpg",horario:"08:00\u201318:00",precio:"Ticket tren o furgoneta oficial \u2248 90\u2013130 BRL seg\xFAn temporada"},{nombre:"Parque Lage y Mansi\xF3n Lage",descripcion:"Hermoso parque al pie del Corcovado con senderos naturales, grutas, un peque\xF1o acuario y fauna local (capibaras, monos y aves tropicales). En su centro se encuentra una mansi\xF3n hist\xF3rica con un caf\xE9 muy popular y vistas al Cristo. Es ideal para relajarse tras la visita al Corcovado.",foto:"assets/rio/rio-parque-lage.jpg",horario:"Diario 08:00\u201317:00",precio:"Gratis"},{nombre:"Almuerzo en Garota de Ipanema",descripcion:"Restaurante famoso donde Vin\xEDcius de Moraes escribi\xF3 la c\xE9lebre canci\xF3n \u201CGarota de Ipanema\u201D. Ofrece platos t\xEDpicos brasile\xF1os como la picanha a la brasa, feijoada y moqueca, con un ambiente local muy animado. Se recomienda reservar con antelaci\xF3n, especialmente los fines de semana.",foto:"assets/rio/rio-garota-ipanema.jpg",horario:"11:00\u201300:00",precio:"Plato principal \u2248 60\u2013100 BRL"},{nombre:"Playa de Ipanema",descripcion:"Considerada una de las playas m\xE1s famosas del mundo, Ipanema ofrece un ambiente joven y cosmopolita. Ideal para disfrutar de la tarde tomando el sol, ba\xF1arse en el Atl\xE1ntico o unirse a los partidos de futv\xF3ley locales. No olvides probar una aut\xE9ntica caipirinha en el quiosco Astor Beach 83, frente al Posto 9.",foto:"assets/rio/rio-ipanema.jpg",horario:"Acceso libre 24h",precio:"Gratis"},{nombre:"Barrio de Leblon",descripcion:"Zona elegante y tranquila contigua a Ipanema, con tiendas, bares y cafeter\xEDas frente al mar. Ideal para dar un paseo al final del d\xEDa antes de subir al mirador.",foto:"assets/rio/rio-leblon.jpg",horario:"Todo el d\xEDa",precio:"Gratis"},{nombre:"Mirador de Arpoador (puesta de sol)",descripcion:"Roca entre Ipanema y Copacabana desde la que se contempla una de las puestas de sol m\xE1s espectaculares de R\xEDo, con aplausos colectivos al atardecer. Un cierre perfecto para el d\xEDa.",foto:"assets/rio/rio-arpoador.jpg",horario:"Abierto todo el d\xEDa (mejor al atardecer)",precio:"Gratis"}]},{dia:"D\xEDa 5 \u2013 Favela, Barrio de Urca y atardecer en el Pan de Az\xFAcar",zonas:[{nombre:"Tour por la Favela Rocinha",descripcion:"Rocinha es la favela m\xE1s grande de Brasil y una de las m\xE1s conocidas del mundo. Se puede visitar con gu\xEDas locales que muestran el d\xEDa a d\xEDa de sus habitantes, el arte urbano, los miradores y los proyectos sociales que buscan transformar la comunidad. Se recomienda hacerlo siempre con una agencia oficial o gu\xEDa certificado.",foto:"assets/rio/rio-rocinha.jpg",horario:"Tours guiados entre 9:00 y 13:00",precio:"\u2248 120\u2013200 BRL (seg\xFAn operador y duraci\xF3n)"},{nombre:"Tour por el Samb\xF3dromo Marqu\xEAs de Sapuca\xED",descripcion:"El Samb\xF3dromo es el coraz\xF3n del Carnaval de R\xEDo de Janeiro, donde desfilan las escuelas de samba durante las festividades. Durante el a\xF1o se pueden realizar visitas guiadas para conocer la historia del carnaval, ver los trajes y carrozas, e incluso participar en talleres de percusi\xF3n o baile. Ideal para sentir el esp\xEDritu del carnaval aunque no sea febrero.",foto:"assets/rio/rio-sambodromo.jpg",horario:"De lunes a s\xE1bado, 10:00\u201317:00",precio:"Entrada \u2248 60 BRL (con gu\xEDa \u2248 100 BRL)",duracion:"Aprox. 1 hora"},{nombre:"Tour por el Estadio Maracan\xE1",descripcion:"Uno de los estadios m\xE1s emblem\xE1ticos del mundo y sede de finales hist\xF3ricas de f\xFAtbol. El recorrido incluye acceso al campo, los vestuarios, la sala de prensa y el peque\xF1o museo donde se exhiben camisetas y objetos de leyendas como Pel\xE9 y Garrincha. Perfecto para los amantes del f\xFAtbol.",foto:"assets/rio/rio-maracana.jpg",horario:"Todos los d\xEDas, 9:00\u201317:00",precio:"Entrada \u2248 80\u2013100 BRL",duracion:"Aprox. 1 hora"},{nombre:"Almuerzo en Garota de Urca",descripcion:"Restaurante tradicional frente a la bah\xEDa de Guanabara. Famoso por su picanha, pescados frescos y ambiente local relajado. Ideal para disfrutar de una comida con vistas al mar antes de la tarde en la playa.",foto:"assets/rio/rio-garota-urca.jpg",horario:"11:00\u201323:00",precio:"Plato principal \u2248 60\u201390 BRL"},{nombre:"Praia Vermelha (Playa Roja)",descripcion:"Peque\xF1a playa al pie del Pan de Az\xFAcar, muy tranquila y con vistas impresionantes a los morros de Urca. Perfecta para descansar, ba\xF1arse o disfrutar de una caipirinha antes de subir al telef\xE9rico. Desde aqu\xED parte el paseo hacia el Pan de Az\xFAcar.",foto:"assets/rio/rio-praia-vermelha.jpg",horario:"Acceso libre todo el d\xEDa",precio:"Gratis"},{nombre:"Subida al Pan de Az\xFAcar (P\xE3o de A\xE7\xFAcar) al atardecer",descripcion:"Una experiencia imprescindible. El telef\xE9rico conecta Praia Vermelha con el Morro da Urca y luego con el Pan de Az\xFAcar. Desde arriba se obtiene una de las vistas m\xE1s ic\xF3nicas del mundo, especialmente al atardecer cuando la ciudad se ilumina frente al oc\xE9ano.",foto:"assets/rio/rio-pao-de-acucar-sunset.jpg",horario:"08:00\u201320:00 (\xFAltima subida recomendada antes de las 18:00)",precio:"Ticket telef\xE9rico \u2248 120 BRL (ida y vuelta)"}]},{dia:"D\xEDa 6 \u2013 Naturaleza en Tijuca y samba en Rio Scenarium",zonas:[{nombre:"Parque Nacional da Tijuca",descripcion:"Uno de los mayores bosques urbanos del mundo, el Parque Nacional da Tijuca es un aut\xE9ntico pulm\xF3n verde en el coraz\xF3n de R\xEDo de Janeiro. Est\xE1 lleno de cascadas, senderos, miradores y fauna tropical (como monos tit\xEDs, capibaras, tucanes y otras aves entre otras muchas especies). Ideal para disfrutar de la naturaleza sin salir de la ciudad.",foto:"assets/rio/rio-tijuca.jpg",horario:"Todos los d\xEDas, 8:00\u201317:00",precio:"Acceso gratuito"},{nombre:"Cascatinha Taunay",descripcion:"Una de las cascadas m\xE1s bonitas y accesibles del parque, con 35 metros de ca\xEDda rodeada de vegetaci\xF3n exuberante. Es un punto perfecto para hacer fotos o descansar antes de continuar alguna de las rutas de senderismo cercanas.",foto:"assets/rio/rio-cascatinha-taunay.jpg",horario:"Acceso libre durante el d\xEDa",precio:"Gratis"},{nombre:"Mirador Vista Chinesa",descripcion:"Uno de los puntos panor\xE1micos m\xE1s impresionantes de R\xEDo, con una pagoda de estilo chino construida en el siglo XIX. Desde aqu\xED se puede contemplar el Corcovado, el Pan de Az\xFAcar y las playas de Ipanema y Leblon. Se llega por una carretera esc\xE9nica entre la selva atl\xE1ntica.",foto:"assets/rio/rio-vista-chinesa.jpg",horario:"Acceso libre durante el d\xEDa",precio:"Gratis"},{nombre:"Ruta de Pedra Bonita",descripcion:"Sendero muy popular dentro del parque que lleva a una cima desde donde se pueden ver el Pan de Az\xFAcar, la Lagoa Rodrigo de Freitas y la playa de S\xE3o Conrado. Desde aqu\xED tambi\xE9n despegan los parapentes y alas delta que sobrevuelan la costa. Nivel de dificultad moderado (1h30 aprox.).",foto:"assets/rio/rio-pedra-bonita.jpg",horario:"6:00\u201317:00",precio:"Gratis"},{nombre:"Cena con espect\xE1culo de samba en Rio Scenarium",descripcion:"Un cl\xE1sico absoluto de la vida nocturna carioca. Rio Scenarium es un restaurante y casa de espect\xE1culos ubicada en un antiguo almac\xE9n en el barrio de Lapa. Decorado con objetos antiguos y lleno de m\xFAsica en vivo, ofrece una experiencia completa: buena comida brasile\xF1a, caipirinhas y samba en directo hasta la madrugada.",foto:"assets/rio/rio-scenarium.jpg",horario:"Mi\xE9rcoles a domingo, 19:00\u20133:00",precio:"Entrada \u2248 65 BRL (sin consumo)"}]},{dia:"D\xEDa 7 (y siguientes) \u2013 Escapada a Ilha Grande",zonas:[{nombre:"Ilha Grande \u2013 Vila do Abra\xE3o",descripcion:"Principal localidad de Ilha Grande y punto de partida de la mayor\xEDa de excursiones. Un lugar encantador sin coches, con calles de arena, posadas y restaurantes frente al mar. Desde aqu\xED parten las rutas y barcos hacia las playas y lagunas m\xE1s hermosas de la isla.",foto:"assets/rio/ilha-abraao.jpg",horario:"Acceso libre (barcos desde Angra dos Reis, Concei\xE7\xE3o de Jacare\xED o Mangaratiba)",precio:"Traslado mar\xEDtimo \u2248 40\u201380 BRL por trayecto"},{nombre:"Excursi\xF3n a Lagoa Azul, Lagoa Verde y Gruta de Acai\xE1",descripcion:"Tour en lancha o barco que recorre algunas de las zonas m\xE1s famosas de Ilha Grande. La Lagoa Azul y la Lagoa Verde destacan por sus aguas cristalinas, ideales para hacer snorkel y avistar peces y delfines. La Gruta de Acai\xE1 es una cueva submarina con un curioso efecto luminoso turquesa.",foto:"assets/rio/ilha-lagoa-azul.jpg",horario:"Excursiones diarias, 9:00\u201315:00",precio:"\u2248 150\u2013250 BRL seg\xFAn tipo de embarcaci\xF3n"},{nombre:"Praia Lopes Mendes",descripcion:"Considerada una de las playas m\xE1s bonitas de Brasil, Lopes Mendes se alcanza tras una caminata de unas 2 horas desde Vila do Abra\xE3o o tomando un barco hasta Praia do Pouso y caminando 20 minutos m\xE1s. Arena blanca, olas perfectas para surfistas y un entorno virgen hacen de esta playa un para\xEDso natural.",foto:"assets/rio/ilha-lopes-mendes.jpg",horario:"Acceso libre durante el d\xEDa",precio:"Gratis"},{nombre:"Sendero a Praia da Feiticeira",descripcion:"Trilha (sendero) de dificultad moderada que parte desde Vila do Abra\xE3o y conduce a una peque\xF1a cascada y a la playa de la Feiticeira, ideal para nadar y relajarse. Se puede combinar con paseo en taxi-boat de regreso.",foto:"assets/rio/ilha-feiticeira.jpg",horario:"Acceso libre (mejor entre 8:00 y 16:00)",precio:"Gratis (opcional taxi-boat \u2248 30 BRL)"},{nombre:"Saco do C\xE9u y Freguesia de Santana",descripcion:"Peque\xF1as bah\xEDas y pueblos con encanto accesibles por barco o kayak. Saco do C\xE9u es famoso por sus aguas tranquilas y restaurantes sobre el mar. Freguesia de Santana alberga una antigua iglesia colonial y playas perfectas para hacer snorkel.",foto:"assets/rio/ilha-saco-do-ceu.jpg",horario:"Excursiones diarias desde Vila do Abra\xE3o",precio:"\u2248 100\u2013180 BRL (tour en barco)"},{nombre:"Trilha a Dois Rios",descripcion:"Una de las caminatas m\xE1s largas de Ilha Grande (cerca de 3 horas desde Abra\xE3o), conduce al antiguo pueblo de Dois Rios y su playa paradis\xEDaca. Antiguamente aqu\xED se encontraba una prisi\xF3n hoy abandonada. Ideal para los amantes del senderismo y la naturaleza salvaje.",foto:"assets/rio/ilha-dois-rios.jpg",horario:"8:00\u201317:00",precio:"Gratis"},{nombre:"Actividades adicionales",descripcion:"Adem\xE1s de las excursiones, en Ilha Grande puedes practicar kayak, paddle surf o snorkel cerca de Vila do Abra\xE3o. Es un destino ideal para relajarse varios d\xEDas, disfrutar de mariscos frescos, atardeceres sobre el mar y el ambiente isle\xF1o.",foto:"assets/rio/ilha-kayak.jpg",horario:"Seg\xFAn actividad (ma\xF1ana y tarde)",precio:"Kayak/snorkel \u2248 50\u2013100 BRL"}]}]},{titulo:"Gastronom\xEDa",platos:[{nombre:"Caipirinha",descripcion:"El c\xF3ctel nacional de Brasil preparado con cacha\xE7a, lima, az\xFAcar y hielo picado. Refrescante y potente, se disfruta especialmente en los chiringuitos de playa como el Astor Beach 83 en Ipanema.",foto:"assets/rio/rio-caipirinha.jpg",precio:"15\u201325 BRL seg\xFAn el bar"},{nombre:"Picanha (corte de carne brasile\xF1a)",descripcion:"Corte de carne muy tradicional en Brasil, parte de la parrillada. Suele servirse en los \u201Cchurrascos\u201D locales: carne tierna, con sabor pronunciado y a veces acompa\xF1ada de guarniciones como arroz, farofa o verduras.",foto:"assets/rio/rio-picanha.jpg",precio:"Depende del restaurante, moderado-alto seg\xFAn calidad"},{nombre:"Brigadeiro",descripcion:"Dulce t\xEDpico brasile\xF1o hecho a base de leche condensada, cacao, mantequilla y cubierto con chocolate granulado. En la Confiteria Colombo tienes que degustar \u201Cel mejor brigadeiro de R\xEDo\u201D como parte de tu paseo culinario.",foto:"assets/rio/rio-brigadeiro.jpg",precio:"Precio local de un dulce, asequible"},{nombre:"Feijoada",descripcion:"Guiso tradicional brasile\xF1o a base de frijoles negros y carne, normalmente acompa\xF1ado de arroz, farofa y naranja.",foto:"assets/rio/rio-feijoada.jpg",precioOrientativo:"30\u201370 BRL"},{nombre:"Moqueca",descripcion:"Estofado de pescado o marisco con leche de coco, aceite de dend\xEA y cilantro, t\xEDpico de la cocina brasile\xF1a costera. Muy arom\xE1tico y servido en cazuela de barro.",foto:"assets/rio/rio-moqueca.jpg",precio:"40\u201390 BRL"},{nombre:"Guayaba (fruta local)",descripcion:"Fruta tropical abundante en Brasil. La guayaba es jugosa y puede encontrarse en mercados callejeros; excelente para un snack fresco entre paseos.",foto:"assets/rio/rio-guayaba.jpg",precio:"Muy econ\xF3mica (venta callejera)"}]},{titulo:"Cultura y Tradiciones",contenido:"R\xEDo es mundialmente famosa por su Carnaval, samba, escuelas de samba y una escena musical y art\xEDstica muy activa. Tambi\xE9n destacan festivales, teatro y la mezcla cultural de sus barrios."},{titulo:"Consejos pr\xE1cticos",contenido:"Evita llevar objetos de valor a la vista en zonas muy tur\xEDsticas; usa transporte autorizado por la noche; cambia moneda en lugares oficiales; y prueba los mercados locales para gastronom\xEDa y artesan\xEDa."}]};function IS(e,n){if(e&1&&(ge(0,"img",11),Er(1,"imgUrl")),e&2){let t=H(2);M("src",Cr(1,2,t.guide.flag,600),jt)("alt",t.guide.nombre+" flag")}}function wS(e,n){if(e&1&&(ge(0,"img",11),Er(1,"imgUrl")),e&2){let t=H(2);M("src",Cr(1,2,t.guide.flag2,600),jt)("alt",t.guide.nombre+" second flag")}}function TS(e,n){if(e&1&&ge(0,"app-info-general",12),e&2){let t=H(2);M("infoGeneral",t.guide.infoGeneral)}}function MS(e,n){if(e&1&&(ge(0,"img",22),Er(1,"imgUrl")),e&2){let t=H().$implicit;Me("no-crop",t.noCropGallery),M("src",Cr(1,4,t.foto,1200),jt)("alt",t.nombre)}}function SS(e,n){if(e&1&&(ge(0,"img",25),Er(1,"imgUrl")),e&2){let t=n.$implicit,r=H(2).$implicit;Me("no-crop",r.noCropGallery),M("src",Cr(1,4,t,1200),jt)("alt",r.nombre)}}function AS(e,n){if(e&1&&(D(0,"div",23),X(1,SS,2,7,"img",24),h()),e&2){let t=H().$implicit;_(),M("ngForOf",t.fotos)}}function xS(e,n){if(e&1&&(D(0,"p",26)(1,"mat-icon"),C(2,"badge"),h(),D(3,"span")(4,"strong"),C(5,"Acceso:"),h(),C(6),h()()),e&2){let t=H().$implicit;_(6),le(" ",t.acceso)}}function RS(e,n){if(e&1&&(D(0,"p",26)(1,"mat-icon"),C(2,"event"),h(),D(3,"span")(4,"strong"),C(5," Fecha:"),h(),C(6),h()()),e&2){let t=H().$implicit;_(6),le(" ",t.fecha)}}function NS(e,n){if(e&1&&(D(0,"p",26)(1,"mat-icon"),C(2,"schedule"),h(),D(3,"span")(4,"strong"),C(5," Horario:"),h(),C(6),h()()),e&2){let t=H().$implicit;_(6),le(" ",t.horario)}}function PS(e,n){if(e&1&&(D(0,"p",26)(1,"mat-icon"),C(2,"payments"),h(),D(3,"span")(4,"strong"),C(5," Precio:"),h(),C(6),h()()),e&2){let t=H().$implicit;_(6),le(" ",t.precio)}}function OS(e,n){if(e&1&&(D(0,"div",18)(1,"h3"),C(2),h(),D(3,"p"),C(4),h(),X(5,MS,2,7,"img",19)(6,AS,2,1,"div",20)(7,xS,7,1,"p",21)(8,RS,7,1,"p",21)(9,NS,7,1,"p",21)(10,PS,7,1,"p",21),h()),e&2){let t=n.$implicit;_(2),He(t.nombre),_(2),He(t.descripcion),_(),M("ngIf",t.foto),_(),M("ngIf",t.fotos==null?null:t.fotos.length),_(),M("ngIf",t.acceso),_(),M("ngIf",t.fecha),_(),M("ngIf",t.horario),_(),M("ngIf",t.precio)}}function FS(e,n){if(e&1&&(D(0,"mat-expansion-panel")(1,"mat-expansion-panel-header")(2,"mat-panel-title"),C(3),h()(),X(4,OS,11,8,"div",17),h()),e&2){let t=n.$implicit;_(3),He(t.dia),_(),M("ngForOf",t.zonas)}}function kS(e,n){if(e&1&&(D(0,"mat-accordion"),X(1,FS,5,2,"mat-expansion-panel",16),h()),e&2){let t=H().$implicit;_(),M("ngForOf",t.itinerario)}}function LS(e,n){if(e&1&&(ge(0,"img",31),Er(1,"imgUrl")),e&2){let t=H().$implicit;M("src",Cr(1,2,t.foto,900),jt)("alt",t.nombre)}}function jS(e,n){if(e&1&&(D(0,"p")(1,"strong"),C(2,"Fecha:"),h(),C(3),h()),e&2){let t=H().$implicit;_(3),le(" ",t.fecha)}}function BS(e,n){if(e&1&&(D(0,"p")(1,"strong"),C(2,"Horario:"),h(),C(3),h()),e&2){let t=H().$implicit;_(3),le(" ",t.horario)}}function zS(e,n){if(e&1&&(D(0,"p")(1,"strong"),C(2,"Precio:"),h(),C(3),h()),e&2){let t=H().$implicit;_(3),le(" ",t.precio)}}function VS(e,n){if(e&1&&(D(0,"p")(1,"strong"),C(2,"Precio:"),h(),C(3),h()),e&2){let t=H().$implicit;_(3),le(" ",t.precioOrientativo)}}function US(e,n){if(e&1&&(D(0,"div",29)(1,"h3"),C(2),h(),D(3,"p"),C(4),h(),X(5,LS,2,5,"img",30)(6,jS,4,1,"p",14)(7,BS,4,1,"p",14)(8,zS,4,1,"p",14)(9,VS,4,1,"p",14),h()),e&2){let t=n.$implicit;_(2),He(t.nombre),_(2),He(t.descripcion),_(),M("ngIf",t.foto),_(),M("ngIf",t.fecha),_(),M("ngIf",t.horario),_(),M("ngIf",t.precio),_(),M("ngIf",t.precioOrientativo)}}function HS(e,n){if(e&1&&(D(0,"div",27),X(1,US,10,7,"div",28),h()),e&2){let t=H().$implicit;_(),M("ngForOf",t.lugares||t.platos)}}function qS(e,n){if(e&1&&(D(0,"p"),C(1),h()),e&2){let t=H().$implicit;_(),He(t.contenido)}}function $S(e,n){if(e&1&&(D(0,"div",13)(1,"h2"),C(2),h(),X(3,kS,2,1,"mat-accordion",14)(4,HS,2,1,"div",15)(5,qS,2,1,"p",14),h()),e&2){let t=n.$implicit;_(2),He(t.titulo),_(),M("ngIf",t.itinerario),_(),M("ngIf",(t.lugares==null?null:t.lugares.length)||(t.platos==null?null:t.platos.length)),_(),M("ngIf",!t.itinerario&&!t.lugares&&!t.platos)}}function GS(e,n){if(e&1){let t=Ln();D(0,"button",32),Re("click",function(){dt(t);let o=H(2);return pt(o.scrollToTop())}),D(1,"mat-icon",33),C(2,"flight"),h()()}}function WS(e,n){if(e&1&&(D(0,"div",2)(1,"div",3)(2,"div",4)(3,"h1",5),C(4),h(),D(5,"div",6),X(6,IS,2,5,"img",7)(7,wS,2,5,"img",7),h()(),D(8,"p"),C(9),h(),X(10,TS,1,1,"app-info-general",8)(11,$S,6,4,"div",9),h(),X(12,GS,3,0,"button",10),h()),e&2){let t=H();M("ngStyle",t.pageStyle),_(4),He(t.guide.nombre),_(),Me("double-flags",t.guide.flag2),_(),M("ngIf",t.guide.flag),_(),M("ngIf",t.guide.flag2),_(2),He(t.guide.descripcion),_(),M("ngIf",t.guide.infoGeneral),_(),M("ngForOf",t.guide.secciones),_(),M("ngIf",t.showScrollTop)}}function ZS(e,n){e&1&&(D(0,"div",34),ge(1,"img",35),D(2,"h2"),C(3,"Bienvenido a AvenTourArte"),h(),D(4,"p",36),C(5,'\u2728 "Explora, Descubre, Comparte"'),h(),D(6,"p",36),C(7,'\u{1F30D} "Viaja con arte y emoci\xF3n"'),h()())}var la=class e{constructor(n,t){this.route=n;this.img=t}guide=null;pageStyle={};showScrollTop=!1;scrollIcon="flight";onScroll(){this.showScrollTop=(window.scrollY||0)>350}scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}guides={"europa/espana/andalucia/cadiz/jerez-de-la-frontera":_E,"europa/espana/andalucia/cadiz/trebujena":DE,"europa/espana/andalucia/sevilla/mairena-del-aljarafe":IE,"europa/italia/roma-vaticano":wE,"europa/rumania/bucarest":TE,"america/sudamerica/brasil/rio-de-janeiro":ME};ngOnInit(){this.route.paramMap.subscribe(n=>{let t=n.get("path");t&&this.guides[t]?(this.guide=this.guides[t],this.applyGuideStyle(this.guide)):(this.guide=null,this.pageStyle={})})}applyGuideStyle(n){let t=window.matchMedia("(max-width: 768px)").matches;this.pageStyle={"--bg-image":`url(${this.img.background(n.background,t)})`,"--bg-pos":n.bgPos??"50% 50%","--bg-pos-mobile":n.bgPosMobile??n.bgPos??"50% 50%","--bg-dim":String(n.bgDim??.1),"--bg-size":n.bgSize??"cover","--bg-size-mobile":n.bgSizeMobile??n.bgSize??"cover","--flag-image":`url(${this.img.url(n.flag,{w:1400,crop:"fit"})})`,"--flag-opacity":String(n.flagOverlay?n.flagOpacity??.18:0),"--flag-opacity-mobile":String(n.flagOverlay?n.flagOpacityMobile??.22:0),"--flag-size":n.flagSize??"75%","--flag-size-mobile":n.flagSizeMobile??"95%"}}groupByDay(n){let t=[];for(let o=0;o<n.length;o+=3)t.push({dia:`D\xEDa ${Math.floor(o/3)+1}`,lugares:n.slice(o,o+3)});return t}static \u0275fac=function(t){return new(t||e)(J(ot),J(Lo))};static \u0275cmp=ue({type:e,selectors:[["app-guide-viewer"]],hostBindings:function(t,r){t&1&&Re("scroll",function(){return r.onScroll()},Wd)},decls:3,vars:2,consts:[["welcome",""],["class","guide-page",3,"ngStyle",4,"ngIf","ngIfElse"],[1,"guide-page",3,"ngStyle"],[1,"guide-content"],[1,"city-header"],[1,"city-title"],[1,"city-flags"],["class","city-flag",3,"src","alt",4,"ngIf"],[3,"infoGeneral",4,"ngIf"],["class","guide-section",4,"ngFor","ngForOf"],["class","scroll-top","aria-label","Subir arriba",3,"click",4,"ngIf"],[1,"city-flag",3,"src","alt"],[3,"infoGeneral"],[1,"guide-section"],[4,"ngIf"],["class","grid",4,"ngIf"],[4,"ngFor","ngForOf"],["class","zone-card",4,"ngFor","ngForOf"],[1,"zone-card"],[3,"src","alt","no-crop",4,"ngIf"],["class","zone-photos",4,"ngIf"],["class","info-line",4,"ngIf"],[3,"src","alt"],[1,"zone-photos"],["class","zone-gallery-photo",3,"src","alt","no-crop",4,"ngFor","ngForOf"],[1,"zone-gallery-photo",3,"src","alt"],[1,"info-line"],[1,"grid"],["class","item-card",4,"ngFor","ngForOf"],[1,"item-card"],["loading","lazy",3,"src","alt",4,"ngIf"],["loading","lazy",3,"src","alt"],["aria-label","Subir arriba",1,"scroll-top",3,"click"],[1,"scroll-top-icon"],[1,"welcome"],["src","assets/logo.png","alt","AvenTourArte",1,"welcome-logo"],[1,"slogan"]],template:function(t,r){if(t&1&&X(0,WS,13,10,"div",1)(1,ZS,8,0,"ng-template",null,0,Np),t&2){let o=xp(2);M("ngIf",r.guide)("ngIfElse",o)}},dependencies:[We,zn,dn,Kp,al,dE,uE,dm,pm,lE,bE,yE,sl],styles:['@charset "UTF-8";.welcome[_ngcontent-%COMP%]{text-align:center;padding:3rem;color:#2c3e50}.welcome[_ngcontent-%COMP%]   .slogan[_ngcontent-%COMP%]{font-style:italic;font-size:1.2rem;margin:.5rem 0;color:#34495e}.welcome-logo[_ngcontent-%COMP%]{max-width:200px;margin-bottom:1rem}.scroll-top[_ngcontent-%COMP%]{position:fixed;right:18px;bottom:calc(var(--footer-height) + 6px + env(safe-area-inset-bottom));z-index:99999;width:52px;height:52px;border-radius:999px;border:none;display:grid;place-items:center;cursor:pointer;background:linear-gradient(135deg,#3498db,#2ecc71);color:#fff;box-shadow:0 10px 24px #00000047;transition:transform .2s ease,box-shadow .2s ease;animation:_ngcontent-%COMP%_floatTravel 3s ease-in-out infinite;pointer-events:auto}@keyframes _ngcontent-%COMP%_floatTravel{0%{transform:translateY(0)}50%{transform:translateY(-4px)}to{transform:translateY(0)}}.scroll-top[_ngcontent-%COMP%]:hover{transform:translateY(-6px) scale(1.06);box-shadow:0 14px 30px #00000057}.scroll-top-icon[_ngcontent-%COMP%]{font-size:26px;transition:transform .25s ease}.scroll-top[_ngcontent-%COMP%]:hover   .scroll-top-icon[_ngcontent-%COMP%]{transform:rotate(-18deg) translateY(-1px)}.guide-page[_ngcontent-%COMP%]{position:relative;width:100%;min-height:100vh;display:flex;justify-content:center;align-items:flex-start;padding:2rem 1rem;overflow-x:hidden}.guide-page[_ngcontent-%COMP%]:before{content:"";position:fixed;inset:0;z-index:-3;background-image:linear-gradient(rgba(0,0,0,var(--bg-dim, .1)),rgba(0,0,0,var(--bg-dim, .1))),var(--bg-image);background-size:var(--bg-size, cover);background-repeat:no-repeat;background-position:var(--bg-pos, 50% 50%);transform:translateZ(0);will-change:transform}.guide-page[_ngcontent-%COMP%]:after{content:"";position:fixed;inset:0;z-index:-2;background-image:var(--flag-image);background-repeat:no-repeat;background-position:center;background-size:var(--flag-size, 75%);opacity:var(--flag-opacity, .2);mix-blend-mode:normal;filter:saturate(1.05) contrast(1.02) brightness(1.03);pointer-events:none}.city-header[_ngcontent-%COMP%]{text-align:center;margin-bottom:20px;display:flex;flex-direction:column;align-items:center}.city-title[_ngcontent-%COMP%]{font-size:clamp(2.6rem,5vw,4.5rem);line-height:1.05;font-weight:900;margin:0 0 20px;max-width:10ch;text-wrap:balance}.city-flags[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;gap:20px;flex-wrap:wrap;margin-top:12px}.city-flag[_ngcontent-%COMP%]{width:280px;height:auto;max-width:100%;object-fit:contain;display:block;border-radius:6px;box-shadow:0 2px 6px #0000004d;background:#ffffff59}.city-flags.double-flags[_ngcontent-%COMP%]   .city-flag[_ngcontent-%COMP%]{width:220px;height:auto}.guide-content[_ngcontent-%COMP%]{width:100%;max-width:1280px;background-color:#ffffffd9;border-radius:12px;padding:1.25rem;margin-bottom:1rem;box-shadow:0 6px 20px #0003;z-index:1;position:relative}.guide-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.12rem;line-height:1.75}.travel-info[_ngcontent-%COMP%]{margin:25px auto;padding:20px;border-radius:14px;background:#ffffffeb;box-shadow:0 3px 12px #00000026;display:grid;grid-template-columns:1fr 1fr;gap:12px 20px;font-size:1rem;max-width:900px}@media (max-width: 700px){.travel-info[_ngcontent-%COMP%]{grid-template-columns:1fr}}.travel-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding-bottom:6px;border-bottom:1px solid rgba(0,0,0,.1)}.travel-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{margin-right:4px}.travel-info[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]:last-child{border-bottom:none}.travel-info[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{font-size:1.3rem;width:22px;text-align:center}.guide-section[_ngcontent-%COMP%]{margin:40px 0}.guide-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.9rem;border-bottom:2px solid #ccc;padding-bottom:8px;margin-bottom:20px;line-height:1.3}.guide-section[_ngcontent-%COMP%]   .grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}.guide-section[_ngcontent-%COMP%]   .item-card[_ngcontent-%COMP%]{background-color:#ffffffd9;border-radius:10px;padding:15px;box-shadow:0 2px 8px #0000001a;text-align:center}.guide-section[_ngcontent-%COMP%]   .item-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 10px;font-size:1.3rem;line-height:1.5}.guide-section[_ngcontent-%COMP%]   .item-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:auto;max-height:380px;border-radius:8px;margin-bottom:10px;object-fit:contain;display:block;background:#ffffff59}.guide-section[_ngcontent-%COMP%]   .item-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1rem;line-height:1.6;white-space:pre-line;margin:5px 0;color:#333}.zone-card[_ngcontent-%COMP%]{background-color:#ffffffe6;border-radius:10px;padding:15px;box-shadow:0 2px 8px #0000001f;width:100%;max-width:700px;margin:0 auto 24px}.zone-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:0;font-size:1.2rem}.zone-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1rem;line-height:1.6;color:#333;white-space:pre-line}.zone-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:auto;object-fit:contain;border-radius:8px;margin:10px 0;display:block}.zone-photos[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:14px 0 10px;align-items:stretch}.zone-gallery-photo[_ngcontent-%COMP%]{width:100%;height:380px!important;object-fit:cover!important;border-radius:8px;display:block;background:#ffffff59}.zone-gallery-photo.no-crop[_ngcontent-%COMP%]{object-fit:contain;background:#fff3}@media (max-width: 768px){.city-header[_ngcontent-%COMP%]{margin-bottom:16px}.city-title[_ngcontent-%COMP%]{font-size:2.9rem;line-height:1.08;max-width:8ch;margin-bottom:16px}.city-flags[_ngcontent-%COMP%]{gap:16px;align-items:center}.city-flag[_ngcontent-%COMP%]{width:220px;height:auto}.city-flags.double-flags[_ngcontent-%COMP%]   .city-flag[_ngcontent-%COMP%]{width:140px;height:auto}.guide-content[_ngcontent-%COMP%]{padding:.75rem}.guide-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.04rem;line-height:1.65}.zone-card[_ngcontent-%COMP%]{max-width:100%;width:100%;padding:12px;margin:0 0 20px}.zone-card[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:calc(100% + 24px);max-width:none;margin:12px 0 12px -12px;border-radius:12px;display:block;height:auto;object-fit:cover}.zone-photos[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:12px}.zone-gallery-photo[_ngcontent-%COMP%]{width:calc(100% + 24px);max-width:none;margin-left:-12px;border-radius:12px;height:auto!important;max-height:340px;object-fit:contain!important}.zone-gallery-photo.no-crop[_ngcontent-%COMP%]{object-fit:contain!important;background:#fff3}.zone-photos[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:auto;max-height:340px;object-fit:contain}.zone-photos[_ngcontent-%COMP%]   img.no-crop[_ngcontent-%COMP%]{object-fit:contain;background:#fff3}.scroll-top[_ngcontent-%COMP%]{width:48px;height:48px;right:14px;bottom:calc(var(--footer-height) + 14px + env(safe-area-inset-bottom))}.guide-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:1.7rem;line-height:1.35}.item-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:260px}.item-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:5px;font-size:1.2rem;line-height:1.4}.guide-page[_ngcontent-%COMP%]:before{background-position:var(--bg-pos-mobile, var(--bg-pos, 50% 50%));background-size:var(--bg-size-mobile, var(--bg-size, cover))}.guide-page[_ngcontent-%COMP%]:after{opacity:var(--flag-opacity-mobile, var(--flag-opacity, .26));background-size:var(--flag-size-mobile, var(--flag-size, 80%))}.mat-expansion-panel-header[_ngcontent-%COMP%]{height:auto!important;min-height:96px;padding-top:12px;padding-bottom:12px;align-items:center}.mat-expansion-panel-header[_ngcontent-%COMP%]   .mat-content[_ngcontent-%COMP%]{align-items:center}.mat-expansion-panel-header[_ngcontent-%COMP%]   .mat-expansion-panel-header-title[_ngcontent-%COMP%]{white-space:normal!important;line-height:1.3;font-size:1rem;margin-right:12px}}']})};var SE=[{path:"",component:la},{path:"guia/:path",component:la}];uf(Yc,{providers:[Ja(df),Wf(SE)]}).catch(e=>console.error(e));
