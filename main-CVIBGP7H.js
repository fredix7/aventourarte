var O0=Object.defineProperty,L0=Object.defineProperties;var F0=Object.getOwnPropertyDescriptors;var gf=Object.getOwnPropertySymbols;var k0=Object.prototype.hasOwnProperty,z0=Object.prototype.propertyIsEnumerable;var vf=(e,t,n)=>t in e?O0(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_=(e,t)=>{for(var n in t||={})k0.call(t,n)&&vf(e,n,t[n]);if(gf)for(var n of gf(t))z0.call(t,n)&&vf(e,n,t[n]);return e},J=(e,t)=>L0(e,F0(t));var ja=(e,t,n)=>new Promise((a,o)=>{var r=c=>{try{s(n.next(c))}catch(l){o(l)}},i=c=>{try{s(n.throw(c))}catch(l){o(l)}},s=c=>c.done?a(c.value):Promise.resolve(c.value).then(r,i);s((n=n.apply(e,t)).next())});var ml;function fi(){return ml}function wn(e){let t=ml;return ml=e,t}var yf=Symbol("NotFound");function Oa(e){return e===yf||e?.name==="\u0275NotFound"}function fl(e,t){return Object.is(e,t)}var Ae=null,hi=!1,hl=1,q0=null,Le=Symbol("SIGNAL");function P(e){let t=Ae;return Ae=e,t}function vi(){return Ae}var La={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Uo(e){if(hi)throw new Error("");if(Ae===null)return;Ae.consumerOnSignalRead(e);let t=Ae.producersTail;if(t!==void 0&&t.producer===e)return;let n,a=Ae.recomputing;if(a&&(n=t!==void 0?t.nextProducer:Ae.producers,n!==void 0&&n.producer===e)){Ae.producersTail=n,n.lastReadVersion=e.version;return}let o=e.consumersTail;if(o!==void 0&&o.consumer===Ae&&(!a||V0(o,Ae)))return;let r=za(Ae),i={producer:e,consumer:Ae,nextProducer:n,prevConsumer:o,lastReadVersion:e.version,nextConsumer:void 0};Ae.producersTail=i,t!==void 0?t.nextProducer=i:Ae.producers=i,r&&Ef(e,i)}function bf(){hl++}function gl(e){if(!(za(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===hl)){if(!e.producerMustRecompute(e)&&!ka(e)){gi(e);return}e.producerRecomputeValue(e),gi(e)}}function vl(e){if(e.consumers===void 0)return;let t=hi;hi=!0;try{for(let n=e.consumers;n!==void 0;n=n.nextConsumer){let a=n.consumer;a.dirty||B0(a)}}finally{hi=t}}function yl(){return Ae?.consumerAllowSignalWrites!==!1}function B0(e){e.dirty=!0,vl(e),e.consumerMarkedDirty?.(e)}function gi(e){e.dirty=!1,e.lastCleanEpoch=hl}function Fa(e){return e&&(e.producersTail=void 0,e.recomputing=!0),P(e)}function Ho(e,t){if(P(t),!e)return;e.recomputing=!1;let n=e.producersTail,a=n!==void 0?n.nextProducer:e.producers;if(a!==void 0){if(za(e))do a=bl(a);while(a!==void 0);n!==void 0?n.nextProducer=void 0:e.producers=void 0}}function ka(e){for(let t=e.producers;t!==void 0;t=t.nextProducer){let n=t.producer,a=t.lastReadVersion;if(a!==n.version||(gl(n),a!==n.version))return!0}return!1}function Zt(e){if(za(e)){let t=e.producers;for(;t!==void 0;)t=bl(t)}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0}function Ef(e,t){let n=e.consumersTail,a=za(e);if(n!==void 0?(t.nextConsumer=n.nextConsumer,n.nextConsumer=t):(t.nextConsumer=void 0,e.consumers=t),t.prevConsumer=n,e.consumersTail=t,!a)for(let o=e.producers;o!==void 0;o=o.nextProducer)Ef(o.producer,o)}function bl(e){let t=e.producer,n=e.nextProducer,a=e.nextConsumer,o=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,a!==void 0?a.prevConsumer=o:t.consumersTail=o,o!==void 0)o.nextConsumer=a;else if(t.consumers=a,!za(t)){let r=t.producers;for(;r!==void 0;)r=bl(r)}return n}function za(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function El(e){q0?.(e)}function V0(e,t){let n=t.producersTail;if(n!==void 0){let a=t.producers;do{if(a===e)return!0;if(a===n)break;a=a.nextProducer}while(a!==void 0)}return!1}function U0(){throw new Error}var Cf=U0;function _f(e){Cf(e)}function Cl(e){Cf=e}var H0=null;function _l(e,t){let n=Object.create(yi);n.value=e,t!==void 0&&(n.equal=t);let a=()=>Df(n);return a[Le]=n,El(n),[a,i=>qa(n,i),i=>Dl(n,i)]}function Df(e){return Uo(e),e.value}function qa(e,t){yl()||_f(e),e.equal(e.value,t)||(e.value=t,$0(e))}function Dl(e,t){yl()||_f(e),qa(e,t(e.value))}var yi=J(_({},La),{equal:fl,value:void 0,kind:"signal"});function $0(e){e.version++,bf(),vl(e),H0?.(e)}function N(e){return typeof e=="function"}function Ba(e){let n=e(a=>{Error.call(a),a.stack=new Error().stack});return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}var bi=Ba(e=>function(n){e(this),this.message=n?`${n.length} errors occurred during unsubscription:
${n.map((a,o)=>`${o+1}) ${a.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=n});function Kt(e,t){if(e){let n=e.indexOf(t);0<=n&&e.splice(n,1)}}var Z=class e{constructor(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let t;if(!this.closed){this.closed=!0;let{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(let r of n)r.remove(this);else n.remove(this);let{initialTeardown:a}=this;if(N(a))try{a()}catch(r){t=r instanceof bi?r.errors:[r]}let{_finalizers:o}=this;if(o){this._finalizers=null;for(let r of o)try{If(r)}catch(i){t=t??[],i instanceof bi?t=[...t,...i.errors]:t.push(i)}}if(t)throw new bi(t)}}add(t){var n;if(t&&t!==this)if(this.closed)If(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=(n=this._finalizers)!==null&&n!==void 0?n:[]).push(t)}}_hasParent(t){let{_parentage:n}=this;return n===t||Array.isArray(n)&&n.includes(t)}_addParent(t){let{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t}_removeParent(t){let{_parentage:n}=this;n===t?this._parentage=null:Array.isArray(n)&&Kt(n,t)}remove(t){let{_finalizers:n}=this;n&&Kt(n,t),t instanceof e&&t._removeParent(this)}};Z.EMPTY=(()=>{let e=new Z;return e.closed=!0,e})();var Il=Z.EMPTY;function Ei(e){return e instanceof Z||e&&"closed"in e&&N(e.remove)&&N(e.add)&&N(e.unsubscribe)}function If(e){N(e)?e():e.unsubscribe()}var pn={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Va={setTimeout(e,t,...n){let{delegate:a}=Va;return a?.setTimeout?a.setTimeout(e,t,...n):setTimeout(e,t,...n)},clearTimeout(e){let{delegate:t}=Va;return(t?.clearTimeout||clearTimeout)(e)},delegate:void 0};function Ci(e){Va.setTimeout(()=>{let{onUnhandledError:t}=pn;if(t)t(e);else throw e})}function $o(){}var Sf=Sl("C",void 0,void 0);function Mf(e){return Sl("E",void 0,e)}function Tf(e){return Sl("N",e,void 0)}function Sl(e,t,n){return{kind:e,value:t,error:n}}var Xt=null;function Ua(e){if(pn.useDeprecatedSynchronousErrorHandling){let t=!Xt;if(t&&(Xt={errorThrown:!1,error:null}),e(),t){let{errorThrown:n,error:a}=Xt;if(Xt=null,n)throw a}}else e()}function xf(e){pn.useDeprecatedSynchronousErrorHandling&&Xt&&(Xt.errorThrown=!0,Xt.error=e)}var ea=class extends Z{constructor(t){super(),this.isStopped=!1,t?(this.destination=t,Ei(t)&&t.add(this)):this.destination=J0}static create(t,n,a){return new Qn(t,n,a)}next(t){this.isStopped?Tl(Tf(t),this):this._next(t)}error(t){this.isStopped?Tl(Mf(t),this):(this.isStopped=!0,this._error(t))}complete(){this.isStopped?Tl(Sf,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},G0=Function.prototype.bind;function Ml(e,t){return G0.call(e,t)}var xl=class{constructor(t){this.partialObserver=t}next(t){let{partialObserver:n}=this;if(n.next)try{n.next(t)}catch(a){_i(a)}}error(t){let{partialObserver:n}=this;if(n.error)try{n.error(t)}catch(a){_i(a)}else _i(t)}complete(){let{partialObserver:t}=this;if(t.complete)try{t.complete()}catch(n){_i(n)}}},Qn=class extends ea{constructor(t,n,a){super();let o;if(N(t)||!t)o={next:t??void 0,error:n??void 0,complete:a??void 0};else{let r;this&&pn.useDeprecatedNextContext?(r=Object.create(t),r.unsubscribe=()=>this.unsubscribe(),o={next:t.next&&Ml(t.next,r),error:t.error&&Ml(t.error,r),complete:t.complete&&Ml(t.complete,r)}):o=t}this.destination=new xl(o)}};function _i(e){pn.useDeprecatedSynchronousErrorHandling?xf(e):Ci(e)}function W0(e){throw e}function Tl(e,t){let{onStoppedNotification:n}=pn;n&&Va.setTimeout(()=>n(e,t))}var J0={closed:!0,next:$o,error:W0,complete:$o};var Ha=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Fe(e){return e}function wl(...e){return Al(e)}function Al(e){return e.length===0?Fe:e.length===1?e[0]:function(n){return e.reduce((a,o)=>o(a),n)}}var B=(()=>{class e{constructor(n){n&&(this._subscribe=n)}lift(n){let a=new e;return a.source=this,a.operator=n,a}subscribe(n,a,o){let r=Y0(n)?n:new Qn(n,a,o);return Ua(()=>{let{operator:i,source:s}=this;r.add(i?i.call(r,s):s?this._subscribe(r):this._trySubscribe(r))}),r}_trySubscribe(n){try{return this._subscribe(n)}catch(a){n.error(a)}}forEach(n,a){return a=wf(a),new a((o,r)=>{let i=new Qn({next:s=>{try{n(s)}catch(c){r(c),i.unsubscribe()}},error:r,complete:o});this.subscribe(i)})}_subscribe(n){var a;return(a=this.source)===null||a===void 0?void 0:a.subscribe(n)}[Ha](){return this}pipe(...n){return Al(n)(this)}toPromise(n){return n=wf(n),new n((a,o)=>{let r;this.subscribe(i=>r=i,i=>o(i),()=>a(r))})}}return e.create=t=>new e(t),e})();function wf(e){var t;return(t=e??pn.Promise)!==null&&t!==void 0?t:Promise}function Q0(e){return e&&N(e.next)&&N(e.error)&&N(e.complete)}function Y0(e){return e&&e instanceof ea||Q0(e)&&Ei(e)}function Rl(e){return N(e?.lift)}function k(e){return t=>{if(Rl(t))return t.lift(function(n){try{return e(n,this)}catch(a){this.error(a)}});throw new TypeError("Unable to lift unknown Observable type")}}function z(e,t,n,a,o){return new Pl(e,t,n,a,o)}var Pl=class extends ea{constructor(t,n,a,o,r,i){super(t),this.onFinalize=r,this.shouldUnsubscribe=i,this._next=n?function(s){try{n(s)}catch(c){t.error(c)}}:super._next,this._error=o?function(s){try{o(s)}catch(c){t.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=a?function(){try{a()}catch(s){t.error(s)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:n}=this;super.unsubscribe(),!n&&((t=this.onFinalize)===null||t===void 0||t.call(this))}}};function $a(){return k((e,t)=>{let n=null;e._refCount++;let a=z(t,void 0,void 0,void 0,()=>{if(!e||e._refCount<=0||0<--e._refCount){n=null;return}let o=e._connection,r=n;n=null,o&&(!r||o===r)&&o.unsubscribe(),t.unsubscribe()});e.subscribe(a),a.closed||(n=e.connect())})}var Ga=class extends B{constructor(t,n){super(),this.source=t,this.subjectFactory=n,this._subject=null,this._refCount=0,this._connection=null,Rl(t)&&(this.lift=t.lift)}_subscribe(t){return this.getSubject().subscribe(t)}getSubject(){let t=this._subject;return(!t||t.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:t}=this;this._subject=this._connection=null,t?.unsubscribe()}connect(){let t=this._connection;if(!t){t=this._connection=new Z;let n=this.getSubject();t.add(this.source.subscribe(z(n,void 0,()=>{this._teardown(),n.complete()},a=>{this._teardown(),n.error(a)},()=>this._teardown()))),t.closed&&(this._connection=null,t=Z.EMPTY)}return t}refCount(){return $a()(this)}};var Af=Ba(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var H=(()=>{class e extends B{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(n){let a=new Di(this,this);return a.operator=n,a}_throwIfClosed(){if(this.closed)throw new Af}next(n){Ua(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let a of this.currentObservers)a.next(n)}})}error(n){Ua(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=n;let{observers:a}=this;for(;a.length;)a.shift().error(n)}})}complete(){Ua(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:n}=this;for(;n.length;)n.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:a,isStopped:o,observers:r}=this;return a||o?Il:(this.currentObservers=null,r.push(n),new Z(()=>{this.currentObservers=null,Kt(r,n)}))}_checkFinalizedStatuses(n){let{hasError:a,thrownError:o,isStopped:r}=this;a?n.error(o):r&&n.complete()}asObservable(){let n=new B;return n.source=this,n}}return e.create=(t,n)=>new Di(t,n),e})(),Di=class extends H{constructor(t,n){super(),this.destination=t,this.source=n}next(t){var n,a;(a=(n=this.destination)===null||n===void 0?void 0:n.next)===null||a===void 0||a.call(n,t)}error(t){var n,a;(a=(n=this.destination)===null||n===void 0?void 0:n.error)===null||a===void 0||a.call(n,t)}complete(){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||n===void 0||n.call(t)}_subscribe(t){var n,a;return(a=(n=this.source)===null||n===void 0?void 0:n.subscribe(t))!==null&&a!==void 0?a:Il}};var be=class extends H{constructor(t){super(),this._value=t}get value(){return this.getValue()}_subscribe(t){let n=super._subscribe(t);return!n.closed&&t.next(this._value),n}getValue(){let{hasError:t,thrownError:n,_value:a}=this;if(t)throw n;return this._throwIfClosed(),a}next(t){super.next(this._value=t)}};var Nl={now(){return(Nl.delegate||Date).now()},delegate:void 0};var Ii=class extends Z{constructor(t,n){super()}schedule(t,n=0){return this}};var Go={setInterval(e,t,...n){let{delegate:a}=Go;return a?.setInterval?a.setInterval(e,t,...n):setInterval(e,t,...n)},clearInterval(e){let{delegate:t}=Go;return(t?.clearInterval||clearInterval)(e)},delegate:void 0};var Si=class extends Ii{constructor(t,n){super(t,n),this.scheduler=t,this.work=n,this.pending=!1}schedule(t,n=0){var a;if(this.closed)return this;this.state=t;let o=this.id,r=this.scheduler;return o!=null&&(this.id=this.recycleAsyncId(r,o,n)),this.pending=!0,this.delay=n,this.id=(a=this.id)!==null&&a!==void 0?a:this.requestAsyncId(r,this.id,n),this}requestAsyncId(t,n,a=0){return Go.setInterval(t.flush.bind(t,this),a)}recycleAsyncId(t,n,a=0){if(a!=null&&this.delay===a&&this.pending===!1)return n;n!=null&&Go.clearInterval(n)}execute(t,n){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let a=this._execute(t,n);if(a)return a;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(t,n){let a=!1,o;try{this.work(t)}catch(r){a=!0,o=r||new Error("Scheduled action threw falsy error")}if(a)return this.unsubscribe(),o}unsubscribe(){if(!this.closed){let{id:t,scheduler:n}=this,{actions:a}=n;this.work=this.state=this.scheduler=null,this.pending=!1,Kt(a,this),t!=null&&(this.id=this.recycleAsyncId(n,t,null)),this.delay=null,super.unsubscribe()}}};var Wa=class e{constructor(t,n=e.now){this.schedulerActionCtor=t,this.now=n}schedule(t,n=0,a){return new this.schedulerActionCtor(this,t).schedule(a,n)}};Wa.now=Nl.now;var Mi=class extends Wa{constructor(t,n=Wa.now){super(t,n),this.actions=[],this._active=!1}flush(t){let{actions:n}=this;if(this._active){n.push(t);return}let a;this._active=!0;do if(a=t.execute(t.state,t.delay))break;while(t=n.shift());if(this._active=!1,a){for(;t=n.shift();)t.unsubscribe();throw a}}};var Rf=new Mi(Si);var _e=new B(e=>e.complete());function Pf(e){return e&&N(e.schedule)}function jl(e){return e[e.length-1]}function Ti(e){return N(jl(e))?e.pop():void 0}function An(e){return Pf(jl(e))?e.pop():void 0}function Nf(e,t){return typeof jl(e)=="number"?e.pop():t}function Of(e,t,n,a){function o(r){return r instanceof n?r:new n(function(i){i(r)})}return new(n||(n=Promise))(function(r,i){function s(d){try{l(a.next(d))}catch(u){i(u)}}function c(d){try{l(a.throw(d))}catch(u){i(u)}}function l(d){d.done?r(d.value):o(d.value).then(s,c)}l((a=a.apply(e,t||[])).next())})}function jf(e){var t=typeof Symbol=="function"&&Symbol.iterator,n=t&&e[t],a=0;if(n)return n.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&a>=e.length&&(e=void 0),{value:e&&e[a++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function na(e){return this instanceof na?(this.v=e,this):new na(e)}function Lf(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var a=n.apply(e,t||[]),o,r=[];return o=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),s("next"),s("throw"),s("return",i),o[Symbol.asyncIterator]=function(){return this},o;function i(m){return function(E){return Promise.resolve(E).then(m,u)}}function s(m,E){a[m]&&(o[m]=function(T){return new Promise(function(U,j){r.push([m,T,U,j])>1||c(m,T)})},E&&(o[m]=E(o[m])))}function c(m,E){try{l(a[m](E))}catch(T){f(r[0][3],T)}}function l(m){m.value instanceof na?Promise.resolve(m.value.v).then(d,u):f(r[0][2],m)}function d(m){c("next",m)}function u(m){c("throw",m)}function f(m,E){m(E),r.shift(),r.length&&c(r[0][0],r[0][1])}}function Ff(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t=e[Symbol.asyncIterator],n;return t?t.call(e):(e=typeof jf=="function"?jf(e):e[Symbol.iterator](),n={},a("next"),a("throw"),a("return"),n[Symbol.asyncIterator]=function(){return this},n);function a(r){n[r]=e[r]&&function(i){return new Promise(function(s,c){i=e[r](i),o(s,c,i.done,i.value)})}}function o(r,i,s,c){Promise.resolve(c).then(function(l){r({value:l,done:s})},i)}}var xi=e=>e&&typeof e.length=="number"&&typeof e!="function";function wi(e){return N(e?.then)}function Ai(e){return N(e[Ha])}function Ri(e){return Symbol.asyncIterator&&N(e?.[Symbol.asyncIterator])}function Pi(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function Z0(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Ni=Z0();function ji(e){return N(e?.[Ni])}function Oi(e){return Lf(this,arguments,function*(){let n=e.getReader();try{for(;;){let{value:a,done:o}=yield na(n.read());if(o)return yield na(void 0);yield yield na(a)}}finally{n.releaseLock()}})}function Li(e){return N(e?.getReader)}function ae(e){if(e instanceof B)return e;if(e!=null){if(Ai(e))return K0(e);if(xi(e))return X0(e);if(wi(e))return eE(e);if(Ri(e))return kf(e);if(ji(e))return nE(e);if(Li(e))return tE(e)}throw Pi(e)}function K0(e){return new B(t=>{let n=e[Ha]();if(N(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function X0(e){return new B(t=>{for(let n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function eE(e){return new B(t=>{e.then(n=>{t.closed||(t.next(n),t.complete())},n=>t.error(n)).then(null,Ci)})}function nE(e){return new B(t=>{for(let n of e)if(t.next(n),t.closed)return;t.complete()})}function kf(e){return new B(t=>{aE(e,t).catch(n=>t.error(n))})}function tE(e){return kf(Oi(e))}function aE(e,t){var n,a,o,r;return Of(this,void 0,void 0,function*(){try{for(n=Ff(e);a=yield n.next(),!a.done;){let i=a.value;if(t.next(i),t.closed)return}}catch(i){o={error:i}}finally{try{a&&!a.done&&(r=n.return)&&(yield r.call(n))}finally{if(o)throw o.error}}t.complete()})}function $e(e,t,n,a=0,o=!1){let r=t.schedule(function(){n(),o?e.add(this.schedule(null,a)):this.unsubscribe()},a);if(e.add(r),!o)return r}function Fi(e,t=0){return k((n,a)=>{n.subscribe(z(a,o=>$e(a,e,()=>a.next(o),t),()=>$e(a,e,()=>a.complete(),t),o=>$e(a,e,()=>a.error(o),t)))})}function ki(e,t=0){return k((n,a)=>{a.add(e.schedule(()=>n.subscribe(a),t))})}function zf(e,t){return ae(e).pipe(ki(t),Fi(t))}function qf(e,t){return ae(e).pipe(ki(t),Fi(t))}function Bf(e,t){return new B(n=>{let a=0;return t.schedule(function(){a===e.length?n.complete():(n.next(e[a++]),n.closed||this.schedule())})})}function Vf(e,t){return new B(n=>{let a;return $e(n,t,()=>{a=e[Ni](),$e(n,t,()=>{let o,r;try{({value:o,done:r}=a.next())}catch(i){n.error(i);return}r?n.complete():n.next(o)},0,!0)}),()=>N(a?.return)&&a.return()})}function zi(e,t){if(!e)throw new Error("Iterable cannot be null");return new B(n=>{$e(n,t,()=>{let a=e[Symbol.asyncIterator]();$e(n,t,()=>{a.next().then(o=>{o.done?n.complete():n.next(o.value)})},0,!0)})})}function Uf(e,t){return zi(Oi(e),t)}function Hf(e,t){if(e!=null){if(Ai(e))return zf(e,t);if(xi(e))return Bf(e,t);if(wi(e))return qf(e,t);if(Ri(e))return zi(e,t);if(ji(e))return Vf(e,t);if(Li(e))return Uf(e,t)}throw Pi(e)}function oe(e,t){return t?Hf(e,t):ae(e)}function x(...e){let t=An(e);return oe(e,t)}function yt(e,t){let n=N(e)?e:()=>e,a=o=>o.error(n());return new B(t?o=>t.schedule(a,0,o):a)}function Ol(e){return!!e&&(e instanceof B||N(e.lift)&&N(e.subscribe))}var Yn=Ba(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence"});function A(e,t){return k((n,a)=>{let o=0;n.subscribe(z(a,r=>{a.next(e.call(t,r,o++))}))})}var{isArray:oE}=Array;function rE(e,t){return oE(t)?e(...t):e(t)}function qi(e){return A(t=>rE(e,t))}var{isArray:iE}=Array,{getPrototypeOf:sE,prototype:cE,keys:lE}=Object;function Bi(e){if(e.length===1){let t=e[0];if(iE(t))return{args:t,keys:null};if(dE(t)){let n=lE(t);return{args:n.map(a=>t[a]),keys:n}}}return{args:e,keys:null}}function dE(e){return e&&typeof e=="object"&&sE(e)===cE}function Vi(e,t){return e.reduce((n,a,o)=>(n[a]=t[o],n),{})}function ta(...e){let t=An(e),n=Ti(e),{args:a,keys:o}=Bi(e);if(a.length===0)return oe([],t);let r=new B(uE(a,t,o?i=>Vi(o,i):Fe));return n?r.pipe(qi(n)):r}function uE(e,t,n=Fe){return a=>{$f(t,()=>{let{length:o}=e,r=new Array(o),i=o,s=o;for(let c=0;c<o;c++)$f(t,()=>{let l=oe(e[c],t),d=!1;l.subscribe(z(a,u=>{r[c]=u,d||(d=!0,s--),s||a.next(n(r.slice()))},()=>{--i||a.complete()}))},a)},a)}}function $f(e,t,n){e?$e(n,e,t):t()}function Gf(e,t,n,a,o,r,i,s){let c=[],l=0,d=0,u=!1,f=()=>{u&&!c.length&&!l&&t.complete()},m=T=>l<a?E(T):c.push(T),E=T=>{r&&t.next(T),l++;let U=!1;ae(n(T,d++)).subscribe(z(t,j=>{o?.(j),r?m(j):t.next(j)},()=>{U=!0},void 0,()=>{if(U)try{for(l--;c.length&&l<a;){let j=c.shift();i?$e(t,i,()=>E(j)):E(j)}f()}catch(j){t.error(j)}}))};return e.subscribe(z(t,m,()=>{u=!0,f()})),()=>{s?.()}}function fe(e,t,n=1/0){return N(t)?fe((a,o)=>A((r,i)=>t(a,r,o,i))(ae(e(a,o))),n):(typeof t=="number"&&(n=t),k((a,o)=>Gf(a,o,e,n)))}function bt(e=1/0){return fe(Fe,e)}function Wf(){return bt(1)}function Et(...e){return Wf()(oe(e,An(e)))}function Wo(e){return new B(t=>{ae(e()).subscribe(t)})}function Ll(...e){let t=Ti(e),{args:n,keys:a}=Bi(e),o=new B(r=>{let{length:i}=n;if(!i){r.complete();return}let s=new Array(i),c=i,l=i;for(let d=0;d<i;d++){let u=!1;ae(n[d]).subscribe(z(r,f=>{u||(u=!0,l--),s[d]=f},()=>c--,void 0,()=>{(!c||!u)&&(l||r.next(a?Vi(a,s):s),r.complete())}))}});return t?o.pipe(qi(t)):o}function Fl(...e){let t=An(e),n=Nf(e,1/0),a=e;return a.length?a.length===1?ae(a[0]):bt(n)(oe(a,t)):_e}function ne(e,t){return k((n,a)=>{let o=0;n.subscribe(z(a,r=>e.call(t,r,o++)&&a.next(r)))})}function mn(e){return k((t,n)=>{let a=null,o=!1,r;a=t.subscribe(z(n,void 0,void 0,i=>{r=ae(e(i,mn(e)(t))),a?(a.unsubscribe(),a=null,r.subscribe(n)):o=!0})),o&&(a.unsubscribe(),a=null,r.subscribe(n))})}function Jf(e,t,n,a,o){return(r,i)=>{let s=n,c=t,l=0;r.subscribe(z(i,d=>{let u=l++;c=s?e(c,d,u):(s=!0,d),a&&i.next(c)},o&&(()=>{s&&i.next(c),i.complete()})))}}function Rn(e,t){return N(t)?fe(e,t,1):fe(e,1)}function Jo(e,t=Rf){return k((n,a)=>{let o=null,r=null,i=null,s=()=>{if(o){o.unsubscribe(),o=null;let l=r;r=null,a.next(l)}};function c(){let l=i+e,d=t.now();if(d<l){o=this.schedule(void 0,l-d),a.add(o);return}s()}n.subscribe(z(a,l=>{r=l,i=t.now(),o||(o=t.schedule(c,e),a.add(o))},()=>{s(),a.complete()},void 0,()=>{r=o=null}))})}function Ct(e){return k((t,n)=>{let a=!1;t.subscribe(z(n,o=>{a=!0,n.next(o)},()=>{a||n.next(e),n.complete()}))})}function ke(e){return e<=0?()=>_e:k((t,n)=>{let a=0;t.subscribe(z(n,o=>{++a<=e&&(n.next(o),e<=a&&n.complete())}))})}function kl(e,t=Fe){return e=e??pE,k((n,a)=>{let o,r=!0;n.subscribe(z(a,i=>{let s=t(i);(r||!e(o,s))&&(r=!1,o=s,a.next(i))}))})}function pE(e,t){return e===t}function Ui(e=mE){return k((t,n)=>{let a=!1;t.subscribe(z(n,o=>{a=!0,n.next(o)},()=>a?n.complete():n.error(e())))})}function mE(){return new Yn}function _t(e){return k((t,n)=>{try{t.subscribe(n)}finally{n.add(e)}})}function Zn(e,t){let n=arguments.length>=2;return a=>a.pipe(e?ne((o,r)=>e(o,r,a)):Fe,ke(1),n?Ct(t):Ui(()=>new Yn))}function Ja(e){return e<=0?()=>_e:k((t,n)=>{let a=[];t.subscribe(z(n,o=>{a.push(o),e<a.length&&a.shift()},()=>{for(let o of a)n.next(o);n.complete()},void 0,()=>{a=null}))})}function zl(e,t){let n=arguments.length>=2;return a=>a.pipe(e?ne((o,r)=>e(o,r,a)):Fe,Ja(1),n?Ct(t):Ui(()=>new Yn))}function ql(e,t){return k(Jf(e,t,arguments.length>=2,!0))}function Vl(e={}){let{connector:t=()=>new H,resetOnError:n=!0,resetOnComplete:a=!0,resetOnRefCountZero:o=!0}=e;return r=>{let i,s,c,l=0,d=!1,u=!1,f=()=>{s?.unsubscribe(),s=void 0},m=()=>{f(),i=c=void 0,d=u=!1},E=()=>{let T=i;m(),T?.unsubscribe()};return k((T,U)=>{l++,!u&&!d&&f();let j=c=c??t();U.add(()=>{l--,l===0&&!u&&!d&&(s=Bl(E,o))}),j.subscribe(U),!i&&l>0&&(i=new Qn({next:xn=>j.next(xn),error:xn=>{u=!0,f(),s=Bl(m,n,xn),j.error(xn)},complete:()=>{d=!0,f(),s=Bl(m,a),j.complete()}}),ae(T).subscribe(i))})(r)}}function Bl(e,t,...n){if(t===!0){e();return}if(t===!1)return;let a=new Qn({next:()=>{a.unsubscribe(),e()}});return ae(t(...n)).subscribe(a)}function Qo(e){return ne((t,n)=>e<=n)}function Dt(...e){let t=An(e);return k((n,a)=>{(t?Et(e,n,t):Et(e,n)).subscribe(a)})}function Re(e,t){return k((n,a)=>{let o=null,r=0,i=!1,s=()=>i&&!o&&a.complete();n.subscribe(z(a,c=>{o?.unsubscribe();let l=0,d=r++;ae(e(c,d)).subscribe(o=z(a,u=>a.next(t?t(c,u,d,l++):u),()=>{o=null,s()}))},()=>{i=!0,s()}))})}function It(e){return k((t,n)=>{ae(e).subscribe(z(n,()=>n.complete(),$o)),!n.closed&&t.subscribe(n)})}function re(e,t,n){let a=N(e)||t||n?{next:e,error:t,complete:n}:e;return a?k((o,r)=>{var i;(i=a.subscribe)===null||i===void 0||i.call(a);let s=!0;o.subscribe(z(r,c=>{var l;(l=a.next)===null||l===void 0||l.call(a,c),r.next(c)},()=>{var c;s=!1,(c=a.complete)===null||c===void 0||c.call(a),r.complete()},c=>{var l;s=!1,(l=a.error)===null||l===void 0||l.call(a,c),r.error(c)},()=>{var c,l;s&&((c=a.unsubscribe)===null||c===void 0||c.call(a)),(l=a.finalize)===null||l===void 0||l.call(a)}))}):Fe}function Qf(e){let t=P(null);try{return e()}finally{P(t)}}var Yf=J(_({},La),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,hasRun:!1,kind:"effect"});function Zf(e){if(e.dirty=!1,e.hasRun&&!ka(e))return;e.hasRun=!0;let t=Fa(e);try{e.cleanup(),e.fn()}finally{Ho(e,t)}}var Ji="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",D=class extends Error{code;constructor(t,n){super(Nn(t,n)),this.code=t}};function fE(e){return`NG0${Math.abs(e)}`}function Nn(e,t){return`${fE(e)}${t?": "+t:""}`}var Be=globalThis;function K(e){for(let t in e)if(e[t]===K)return t;throw Error("")}function nh(e,t){for(let n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n])}function Xn(e){if(typeof e=="string")return e;if(Array.isArray(e))return`[${e.map(Xn).join(", ")}]`;if(e==null)return""+e;let t=e.overriddenName||e.name;if(t)return`${t}`;let n=e.toString();if(n==null)return""+n;let a=n.indexOf(`
`);return a>=0?n.slice(0,a):n}function Qi(e,t){return e?t?`${e} ${t}`:e:t||""}var hE=K({__forward_ref__:K});function Yi(e){return e.__forward_ref__=Yi,e.toString=function(){return Xn(this())},e}function Se(e){return Xl(e)?e():e}function Xl(e){return typeof e=="function"&&e.hasOwnProperty(hE)&&e.__forward_ref__===Yi}function th(e,t){e==null&&ed(t,e,null,"!=")}function ed(e,t,n,a){throw new Error(`ASSERTION ERROR: ${e}`+(a==null?"":` [Expected=> ${n} ${a} ${t} <=Actual]`))}function b(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function ie(e){return{providers:e.providers||[],imports:e.imports||[]}}function nr(e){return gE(e,Zi)}function nd(e){return nr(e)!==null}function gE(e,t){return e.hasOwnProperty(t)&&e[t]||null}function vE(e){let t=e?.[Zi]??null;return t||null}function Hl(e){return e&&e.hasOwnProperty($i)?e[$i]:null}var Zi=K({\u0275prov:K}),$i=K({\u0275inj:K}),I=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(t,n){this._desc=t,this.\u0275prov=void 0,typeof n=="number"?this.__NG_ELEMENT_ID__=n:n!==void 0&&(this.\u0275prov=b({token:this,providedIn:n.providedIn||"root",factory:n.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function td(e){return e&&!!e.\u0275providers}var ad=K({\u0275cmp:K}),od=K({\u0275dir:K}),rd=K({\u0275pipe:K}),id=K({\u0275mod:K}),Ko=K({\u0275fac:K}),sa=K({__NG_ELEMENT_ID__:K}),Xf=K({__NG_ENV_ID__:K});function tr(e){return typeof e=="string"?e:e==null?"":String(e)}function Gi(e){return typeof e=="function"?e.name||e.toString():typeof e=="object"&&e!=null&&typeof e.type=="function"?e.type.name||e.type.toString():tr(e)}var sd=K({ngErrorCode:K}),ah=K({ngErrorMessage:K}),Zo=K({ngTokenPath:K});function cd(e,t){return oh("",-200,t)}function Ki(e,t){throw new D(-201,!1)}function yE(e,t){e[Zo]??=[];let n=e[Zo],a;typeof t=="object"&&"multi"in t&&t?.multi===!0?(th(t.provide,"Token with multi: true should have a provide property"),a=Gi(t.provide)):a=Gi(t),n[0]!==a&&e[Zo].unshift(a)}function bE(e,t){let n=e[Zo],a=e[sd],o=e[ah]||e.message;return e.message=CE(o,a,n,t),e}function oh(e,t,n){let a=new D(t,e);return a[sd]=t,a[ah]=e,n&&(a[Zo]=n),a}function EE(e){return e[sd]}function CE(e,t,n=[],a=null){let o="";n&&n.length>1&&(o=` Path: ${n.join(" -> ")}.`);let r=a?` Source: ${a}.`:"";return Nn(t,`${e}${r}${o}`)}var $l;function rh(){return $l}function ze(e){let t=$l;return $l=e,t}function ld(e,t,n){let a=nr(e);if(a&&a.providedIn=="root")return a.value===void 0?a.value=a.factory():a.value;if(n&8)return null;if(t!==void 0)return t;Ki(e,"Injector")}var _E={},aa=_E,DE="__NG_DI_FLAG__",Gl=class{injector;constructor(t){this.injector=t}retrieve(t,n){let a=oa(n)||0;try{return this.injector.get(t,a&8?null:aa,a)}catch(o){if(Oa(o))return o;throw o}}};function IE(e,t=0){let n=fi();if(n===void 0)throw new D(-203,!1);if(n===null)return ld(e,void 0,t);{let a=SE(t),o=n.retrieve(e,a);if(Oa(o)){if(a.optional)return null;throw o}return o}}function M(e,t=0){return(rh()||IE)(Se(e),t)}function p(e,t){return M(e,oa(t))}function oa(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function SE(e){return{optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function Wl(e){let t=[];for(let n=0;n<e.length;n++){let a=Se(e[n]);if(Array.isArray(a)){if(a.length===0)throw new D(900,!1);let o,r=0;for(let i=0;i<a.length;i++){let s=a[i],c=ME(s);typeof c=="number"?c===-1?o=s.token:r|=c:o=s}t.push(M(o,r))}else t.push(M(a))}return t}function ME(e){return e[DE]}function St(e,t){let n=e.hasOwnProperty(Ko);return n?e[Ko]:null}function ih(e,t,n){if(e.length!==t.length)return!1;for(let a=0;a<e.length;a++){let o=e[a],r=t[a];if(n&&(o=n(o),r=n(r)),r!==o)return!1}return!0}function sh(e){return e.flat(Number.POSITIVE_INFINITY)}function Xi(e,t){e.forEach(n=>Array.isArray(n)?Xi(n,t):t(n))}function dd(e,t,n){t>=e.length?e.push(n):e.splice(t,0,n)}function ar(e,t){return t>=e.length-1?e.pop():e.splice(t,1)[0]}function ch(e,t){let n=[];for(let a=0;a<e;a++)n.push(t);return n}function lh(e,t,n,a){let o=e.length;if(o==t)e.push(n,a);else if(o===1)e.push(a,e[0]),e[0]=n;else{for(o--,e.push(e[o-1],e[o]);o>t;){let r=o-2;e[o]=e[r],o--}e[t]=n,e[t+1]=a}}function es(e,t,n){let a=Ya(e,t);return a>=0?e[a|1]=n:(a=~a,lh(e,a,t,n)),a}function ns(e,t){let n=Ya(e,t);if(n>=0)return e[n|1]}function Ya(e,t){return TE(e,t,1)}function TE(e,t,n){let a=0,o=e.length>>n;for(;o!==a;){let r=a+(o-a>>1),i=e[r<<n];if(t===i)return r<<n;i>t?o=r:a=r+1}return~(o<<n)}var Tt={},qe=[],et=new I(""),ud=new I("",-1),pd=new I(""),Xo=class{get(t,n=aa){if(n===aa){let o=oh("",-201);throw o.name="\u0275NotFound",o}return n}};function md(e){return e[id]||null}function jn(e){return e[ad]||null}function fd(e){return e[od]||null}function dh(e){return e[rd]||null}function ca(e){return{\u0275providers:e}}function ts(...e){return{\u0275providers:hd(!0,e),\u0275fromNgModule:!0}}function hd(e,...t){let n=[],a=new Set,o,r=i=>{n.push(i)};return Xi(t,i=>{let s=i;Wi(s,r,[],a)&&(o||=[],o.push(s))}),o!==void 0&&uh(o,r),n}function uh(e,t){for(let n=0;n<e.length;n++){let{ngModule:a,providers:o}=e[n];gd(o,r=>{t(r,a)})}}function Wi(e,t,n,a){if(e=Se(e),!e)return!1;let o=null,r=Hl(e),i=!r&&jn(e);if(!r&&!i){let c=e.ngModule;if(r=Hl(c),r)o=c;else return!1}else{if(i&&!i.standalone)return!1;o=e}let s=a.has(o);if(i){if(s)return!1;if(a.add(o),i.dependencies){let c=typeof i.dependencies=="function"?i.dependencies():i.dependencies;for(let l of c)Wi(l,t,n,a)}}else if(r){if(r.imports!=null&&!s){a.add(o);let l;try{Xi(r.imports,d=>{Wi(d,t,n,a)&&(l||=[],l.push(d))})}finally{}l!==void 0&&uh(l,t)}if(!s){let l=St(o)||(()=>new o);t({provide:o,useFactory:l,deps:qe},o),t({provide:pd,useValue:o,multi:!0},o),t({provide:et,useValue:()=>M(o),multi:!0},o)}let c=r.providers;if(c!=null&&!s){let l=e;gd(c,d=>{t(d,l)})}}else return!1;return o!==e&&e.providers!==void 0}function gd(e,t){for(let n of e)td(n)&&(n=n.\u0275providers),Array.isArray(n)?gd(n,t):t(n)}var xE=K({provide:String,useValue:K});function ph(e){return e!==null&&typeof e=="object"&&xE in e}function wE(e){return!!(e&&e.useExisting)}function AE(e){return!!(e&&e.useFactory)}function ra(e){return typeof e=="function"}function mh(e){return!!e.useClass}var or=new I(""),Hi={},eh={},Ul;function Za(){return Ul===void 0&&(Ul=new Xo),Ul}var se=class{},ia=class extends se{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(t,n,a,o){super(),this.parent=n,this.source=a,this.scopes=o,Ql(t,i=>this.processProvider(i)),this.records.set(ud,Qa(void 0,this)),o.has("environment")&&this.records.set(se,Qa(void 0,this));let r=this.records.get(or);r!=null&&typeof r.value=="string"&&this.scopes.add(r.value),this.injectorDefTypes=new Set(this.get(pd,qe,{self:!0}))}retrieve(t,n){let a=oa(n)||0;try{return this.get(t,aa,a)}catch(o){if(Oa(o))return o;throw o}}destroy(){Yo(this),this._destroyed=!0;let t=P(null);try{for(let a of this._ngOnDestroyHooks)a.ngOnDestroy();let n=this._onDestroyHooks;this._onDestroyHooks=[];for(let a of n)a()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),P(t)}}onDestroy(t){return Yo(this),this._onDestroyHooks.push(t),()=>this.removeOnDestroy(t)}runInContext(t){Yo(this);let n=wn(this),a=ze(void 0),o;try{return t()}finally{wn(n),ze(a)}}get(t,n=aa,a){if(Yo(this),t.hasOwnProperty(Xf))return t[Xf](this);let o=oa(a),r,i=wn(this),s=ze(void 0);try{if(!(o&4)){let l=this.records.get(t);if(l===void 0){let d=OE(t)&&nr(t);d&&this.injectableDefInScope(d)?l=Qa(Jl(t),Hi):l=null,this.records.set(t,l)}if(l!=null)return this.hydrate(t,l,o)}let c=o&2?Za():this.parent;return n=o&8&&n===aa?null:n,c.get(t,n)}catch(c){let l=EE(c);throw l===-200||l===-201?new D(l,null):c}finally{ze(s),wn(i)}}resolveInjectorInitializers(){let t=P(null),n=wn(this),a=ze(void 0),o;try{let r=this.get(et,qe,{self:!0});for(let i of r)i()}finally{wn(n),ze(a),P(t)}}toString(){let t=[],n=this.records;for(let a of n.keys())t.push(Xn(a));return`R3Injector[${t.join(", ")}]`}processProvider(t){t=Se(t);let n=ra(t)?t:Se(t&&t.provide),a=PE(t);if(!ra(t)&&t.multi===!0){let o=this.records.get(n);o||(o=Qa(void 0,Hi,!0),o.factory=()=>Wl(o.multi),this.records.set(n,o)),n=t,o.multi.push(t)}this.records.set(n,a)}hydrate(t,n,a){let o=P(null);try{if(n.value===eh)throw cd(Xn(t));return n.value===Hi&&(n.value=eh,n.value=n.factory(void 0,a)),typeof n.value=="object"&&n.value&&jE(n.value)&&this._ngOnDestroyHooks.add(n.value),n.value}finally{P(o)}}injectableDefInScope(t){if(!t.providedIn)return!1;let n=Se(t.providedIn);return typeof n=="string"?n==="any"||this.scopes.has(n):this.injectorDefTypes.has(n)}removeOnDestroy(t){let n=this._onDestroyHooks.indexOf(t);n!==-1&&this._onDestroyHooks.splice(n,1)}};function Jl(e){let t=nr(e),n=t!==null?t.factory:St(e);if(n!==null)return n;if(e instanceof I)throw new D(204,!1);if(e instanceof Function)return RE(e);throw new D(204,!1)}function RE(e){if(e.length>0)throw new D(204,!1);let n=vE(e);return n!==null?()=>n.factory(e):()=>new e}function PE(e){if(ph(e))return Qa(void 0,e.useValue);{let t=vd(e);return Qa(t,Hi)}}function vd(e,t,n){let a;if(ra(e)){let o=Se(e);return St(o)||Jl(o)}else if(ph(e))a=()=>Se(e.useValue);else if(AE(e))a=()=>e.useFactory(...Wl(e.deps||[]));else if(wE(e))a=(o,r)=>M(Se(e.useExisting),r!==void 0&&r&8?8:void 0);else{let o=Se(e&&(e.useClass||e.provide));if(NE(e))a=()=>new o(...Wl(e.deps));else return St(o)||Jl(o)}return a}function Yo(e){if(e.destroyed)throw new D(205,!1)}function Qa(e,t,n=!1){return{factory:e,value:t,multi:n?[]:void 0}}function NE(e){return!!e.deps}function jE(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function OE(e){return typeof e=="function"||typeof e=="object"&&e.ngMetadataName==="InjectionToken"}function Ql(e,t){for(let n of e)Array.isArray(n)?Ql(n,t):n&&td(n)?Ql(n.\u0275providers,t):t(n)}function Te(e,t){let n;e instanceof ia?(Yo(e),n=e):n=new Gl(e);let a,o=wn(n),r=ze(void 0);try{return t()}finally{wn(o),ze(r)}}function yd(){return rh()!==void 0||fi()!=null}var fn=0,w=1,R=2,De=3,an=4,Ve=5,Ka=6,Xa=7,xe=8,la=9,On=10,ce=11,eo=12,bd=13,da=14,Ge=15,xt=16,ua=17,Ln=18,rr=19,Ed=20,Kn=21,as=22,nt=23,Ye=24,pa=25,le=26,fh=1;var wt=7,ir=8,ma=9,Pe=10;function Fn(e){return Array.isArray(e)&&typeof e[fh]=="object"}function hn(e){return Array.isArray(e)&&e[fh]===!0}function Cd(e){return(e.flags&4)!==0}function At(e){return e.componentOffset>-1}function no(e){return(e.flags&1)===1}function kn(e){return!!e.template}function to(e){return(e[R]&512)!==0}function fa(e){return(e[R]&256)===256}var _d="svg",hh="math";function on(e){for(;Array.isArray(e);)e=e[fn];return e}function Dd(e,t){return on(t[e])}function gn(e,t){return on(t[e.index])}function sr(e,t){return e.data[t]}function Id(e,t){return e[t]}function Sd(e,t,n,a){n>=e.data.length&&(e.data[n]=null,e.blueprint[n]=null),t[n]=a}function rn(e,t){let n=t[e];return Fn(n)?n:n[fn]}function gh(e){return(e[R]&4)===4}function os(e){return(e[R]&128)===128}function vh(e){return hn(e[De])}function zn(e,t){return t==null?null:e[t]}function Md(e){e[ua]=0}function Td(e){e[R]&1024||(e[R]|=1024,os(e)&&Rt(e))}function yh(e,t){for(;e>0;)t=t[da],e--;return t}function cr(e){return!!(e[R]&9216||e[Ye]?.dirty)}function rs(e){e[On].changeDetectionScheduler?.notify(8),e[R]&64&&(e[R]|=1024),cr(e)&&Rt(e)}function Rt(e){e[On].changeDetectionScheduler?.notify(0);let t=Mt(e);for(;t!==null&&!(t[R]&8192||(t[R]|=8192,!os(t)));)t=Mt(t)}function xd(e,t){if(fa(e))throw new D(911,!1);e[Kn]===null&&(e[Kn]=[]),e[Kn].push(t)}function bh(e,t){if(e[Kn]===null)return;let n=e[Kn].indexOf(t);n!==-1&&e[Kn].splice(n,1)}function Mt(e){let t=e[De];return hn(t)?t[De]:t}function wd(e){return e[Xa]??=[]}function Ad(e){return e.cleanup??=[]}function Eh(e,t,n,a){let o=wd(t);o.push(n),e.firstCreatePass&&Ad(e).push(a,o.length-1)}var F={lFrame:Ph(null),bindingsEnabled:!0,skipHydrationRootTNode:null},lr=(function(e){return e[e.Off=0]="Off",e[e.Exhaustive=1]="Exhaustive",e[e.OnlyDirtyViews=2]="OnlyDirtyViews",e})(lr||{}),LE=0,Yl=!1;function Ch(){return F.lFrame.elementDepthCount}function _h(){F.lFrame.elementDepthCount++}function Rd(){F.lFrame.elementDepthCount--}function is(){return F.bindingsEnabled}function Pd(){return F.skipHydrationRootTNode!==null}function Nd(e){return F.skipHydrationRootTNode===e}function jd(){F.skipHydrationRootTNode=null}function q(){return F.lFrame.lView}function ye(){return F.lFrame.tView}function Ne(e){return F.lFrame.contextLView=e,e[xe]}function je(e){return F.lFrame.contextLView=null,e}function Ie(){let e=Od();for(;e!==null&&e.type===64;)e=e.parent;return e}function Od(){return F.lFrame.currentTNode}function Dh(){let e=F.lFrame,t=e.currentTNode;return e.isParent?t:t.parent}function ao(e,t){let n=F.lFrame;n.currentTNode=e,n.isParent=t}function Ld(){return F.lFrame.isParent}function Fd(){F.lFrame.isParent=!1}function Ih(){return F.lFrame.contextLView}function kd(e){ed("Must never be called in production mode"),LE=e}function zd(){return Yl}function oo(e){let t=Yl;return Yl=e,t}function Sh(){let e=F.lFrame,t=e.bindingRootIndex;return t===-1&&(t=e.bindingRootIndex=e.tView.bindingStartIndex),t}function Mh(e){return F.lFrame.bindingIndex=e}function dr(){return F.lFrame.bindingIndex++}function qd(e){let t=F.lFrame,n=t.bindingIndex;return t.bindingIndex=t.bindingIndex+e,n}function Th(){return F.lFrame.inI18n}function xh(e,t){let n=F.lFrame;n.bindingIndex=n.bindingRootIndex=e,ss(t)}function wh(){return F.lFrame.currentDirectiveIndex}function ss(e){F.lFrame.currentDirectiveIndex=e}function Ah(e){let t=F.lFrame.currentDirectiveIndex;return t===-1?null:e[t]}function Bd(){return F.lFrame.currentQueryIndex}function cs(e){F.lFrame.currentQueryIndex=e}function FE(e){let t=e[w];return t.type===2?t.declTNode:t.type===1?e[Ve]:null}function Vd(e,t,n){if(n&4){let o=t,r=e;for(;o=o.parent,o===null&&!(n&1);)if(o=FE(r),o===null||(r=r[da],o.type&10))break;if(o===null)return!1;t=o,e=r}let a=F.lFrame=Rh();return a.currentTNode=t,a.lView=e,!0}function ls(e){let t=Rh(),n=e[w];F.lFrame=t,t.currentTNode=n.firstChild,t.lView=e,t.tView=n,t.contextLView=e,t.bindingIndex=n.bindingStartIndex,t.inI18n=!1}function Rh(){let e=F.lFrame,t=e===null?null:e.child;return t===null?Ph(e):t}function Ph(e){let t={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=t),t}function Nh(){let e=F.lFrame;return F.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var Ud=Nh;function ds(){let e=Nh();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function jh(e){return(F.lFrame.contextLView=yh(e,F.lFrame.contextLView))[xe]}function Pt(){return F.lFrame.selectedIndex}function Nt(e){F.lFrame.selectedIndex=e}function Hd(){let e=F.lFrame;return sr(e.tView,e.selectedIndex)}function ro(){F.lFrame.currentNamespace=_d}function us(){kE()}function kE(){F.lFrame.currentNamespace=null}function Oh(){return F.lFrame.currentNamespace}var Lh=!0;function ps(){return Lh}function ur(e){Lh=e}var zE={elements:void 0};function ms(){return zE}function Zl(e,t=null,n=null,a){let o=$d(e,t,n,a);return o.resolveInjectorInitializers(),o}function $d(e,t=null,n=null,a,o=new Set){let r=[n||qe,ts(e)];return a=a||(typeof e=="object"?void 0:Xn(e)),new ia(r,t||Za(),a||null,o)}var ve=class e{static THROW_IF_NOT_FOUND=aa;static NULL=new Xo;static create(t,n){if(Array.isArray(t))return Zl({name:""},n,t,"");{let a=t.name??"";return Zl({name:a},t.parent,t.providers,a)}}static \u0275prov=b({token:e,providedIn:"any",factory:()=>M(ud)});static __NG_ELEMENT_ID__=-1},$=new I(""),vn=(()=>{class e{static __NG_ELEMENT_ID__=qE;static __NG_ENV_ID__=n=>n}return e})(),er=class extends vn{_lView;constructor(t){super(),this._lView=t}get destroyed(){return fa(this._lView)}onDestroy(t){let n=this._lView;return xd(n,t),()=>bh(n,t)}};function qE(){return new er(q())}var Me=class{_console=console;handleError(t){this._console.error("ERROR",t)}},Ze=new I("",{providedIn:"root",factory:()=>{let e=p(se),t;return n=>{e.destroyed&&!t?setTimeout(()=>{throw n}):(t??=e.get(Me),t.handleError(n))}}}),Fh={provide:et,useValue:()=>void p(Me),multi:!0};function pr(e){return typeof e=="function"&&e[Le]!==void 0}function We(e,t){let[n,a,o]=_l(e,t?.equal),r=n,i=r[Le];return r.set=a,r.update=o,r.asReadonly=Gd.bind(r),r}function Gd(){let e=this[Le];if(e.readonlyFn===void 0){let t=()=>this();t[Le]=e,e.readonlyFn=t}return e.readonlyFn}var Pn=class{},mr=new I("",{providedIn:"root",factory:()=>!1});var Wd=new I(""),Jd=new I("");var io=(()=>{class e{view;node;constructor(n,a){this.view=n,this.node=a}static __NG_ELEMENT_ID__=BE}return e})();function BE(){return new io(q(),Ie())}var tt=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new be(!1);get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new B(n=>{n.next(!1),n.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let n=this.taskId++;return this.pendingTasks.add(n),n}has(n){return this.pendingTasks.has(n)}remove(n){this.pendingTasks.delete(n),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=b({token:e,providedIn:"root",factory:()=>new e})}return e})();function ha(...e){}var fr=(()=>{class e{static \u0275prov=b({token:e,providedIn:"root",factory:()=>new Kl})}return e})(),Kl=class{dirtyEffectCount=0;queues=new Map;add(t){this.enqueue(t),this.schedule(t)}schedule(t){t.dirty&&this.dirtyEffectCount++}remove(t){let n=t.zone,a=this.queues.get(n);a.has(t)&&(a.delete(t),t.dirty&&this.dirtyEffectCount--)}enqueue(t){let n=t.zone;this.queues.has(n)||this.queues.set(n,new Set);let a=this.queues.get(n);a.has(t)||a.add(t)}flush(){for(;this.dirtyEffectCount>0;){let t=!1;for(let[n,a]of this.queues)n===null?t||=this.flushQueue(a):t||=n.run(()=>this.flushQueue(a));t||(this.dirtyEffectCount=0)}}flushQueue(t){let n=!1;for(let a of t)a.dirty&&(this.dirtyEffectCount--,n=!0,a.run());return n}};function Cr(e){return{toString:e}.toString()}function WE(e){return typeof e=="function"}var _s=class{previousValue;currentValue;firstChange;constructor(t,n,a){this.previousValue=t,this.currentValue=n,this.firstChange=a}isFirstChange(){return this.firstChange}};function hg(e,t,n,a){t!==null?t.applyValueToInputSignal(t,a):e[n]=a}var _n=(()=>{let e=()=>gg;return e.ngInherit=!0,e})();function gg(e){return e.type.prototype.ngOnChanges&&(e.setInput=QE),JE}function JE(){let e=yg(this),t=e?.current;if(t){let n=e.previous;if(n===Tt)e.previous=t;else for(let a in t)n[a]=t[a];e.current=null,this.ngOnChanges(t)}}function QE(e,t,n,a,o){let r=this.declaredInputs[a],i=yg(e)||YE(e,{previous:Tt,current:null}),s=i.current||(i.current={}),c=i.previous,l=c[r];s[r]=new _s(l&&l.currentValue,n,c===Tt),hg(e,t,o,n)}var vg="__ngSimpleChanges__";function yg(e){return e[vg]||null}function YE(e,t){return e[vg]=t}var kh=[];var X=function(e,t=null,n){for(let a=0;a<kh.length;a++){let o=kh[a];o(e,t,n)}};function ZE(e,t,n){let{ngOnChanges:a,ngOnInit:o,ngDoCheck:r}=t.type.prototype;if(a){let i=gg(t);(n.preOrderHooks??=[]).push(e,i),(n.preOrderCheckHooks??=[]).push(e,i)}o&&(n.preOrderHooks??=[]).push(0-e,o),r&&((n.preOrderHooks??=[]).push(e,r),(n.preOrderCheckHooks??=[]).push(e,r))}function bg(e,t){for(let n=t.directiveStart,a=t.directiveEnd;n<a;n++){let r=e.data[n].type.prototype,{ngAfterContentInit:i,ngAfterContentChecked:s,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:d}=r;i&&(e.contentHooks??=[]).push(-n,i),s&&((e.contentHooks??=[]).push(n,s),(e.contentCheckHooks??=[]).push(n,s)),c&&(e.viewHooks??=[]).push(-n,c),l&&((e.viewHooks??=[]).push(n,l),(e.viewCheckHooks??=[]).push(n,l)),d!=null&&(e.destroyHooks??=[]).push(n,d)}}function ys(e,t,n){Eg(e,t,3,n)}function bs(e,t,n,a){(e[R]&3)===n&&Eg(e,t,n,a)}function Qd(e,t){let n=e[R];(n&3)===t&&(n&=16383,n+=1,e[R]=n)}function Eg(e,t,n,a){let o=a!==void 0?e[ua]&65535:0,r=a??-1,i=t.length-1,s=0;for(let c=o;c<i;c++)if(typeof t[c+1]=="number"){if(s=t[c],a!=null&&s>=a)break}else t[c]<0&&(e[ua]+=65536),(s<r||r==-1)&&(KE(e,n,t,c),e[ua]=(e[ua]&4294901760)+c+2),c++}function zh(e,t){X(4,e,t);let n=P(null);try{t.call(e)}finally{P(n),X(5,e,t)}}function KE(e,t,n,a){let o=n[a]<0,r=n[a+1],i=o?-n[a]:n[a],s=e[i];o?e[R]>>14<e[ua]>>16&&(e[R]&3)===t&&(e[R]+=16384,zh(s,r)):zh(s,r)}var co=-1,va=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(t,n,a,o){this.factory=t,this.name=o,this.canSeeViewProviders=n,this.injectImpl=a}};function XE(e){return(e.flags&8)!==0}function eC(e){return(e.flags&16)!==0}function nC(e,t,n){let a=0;for(;a<n.length;){let o=n[a];if(typeof o=="number"){if(o!==0)break;a++;let r=n[a++],i=n[a++],s=n[a++];e.setAttribute(t,i,s,r)}else{let r=o,i=n[++a];tC(r)?e.setProperty(t,r,i):e.setAttribute(t,r,i),a++}}return a}function Cg(e){return e===3||e===4||e===6}function tC(e){return e.charCodeAt(0)===64}function lo(e,t){if(!(t===null||t.length===0))if(e===null||e.length===0)e=t.slice();else{let n=-1;for(let a=0;a<t.length;a++){let o=t[a];typeof o=="number"?n=o:n===0||(n===-1||n===2?qh(e,n,o,null,t[++a]):qh(e,n,o,null,null))}}return e}function qh(e,t,n,a,o){let r=0,i=e.length;if(t===-1)i=-1;else for(;r<e.length;){let s=e[r++];if(typeof s=="number"){if(s===t){i=-1;break}else if(s>t){i=r-1;break}}}for(;r<e.length;){let s=e[r];if(typeof s=="number")break;if(s===n){o!==null&&(e[r+1]=o);return}r++,o!==null&&r++}i!==-1&&(e.splice(i,0,t),r=i+1),e.splice(r++,0,n),o!==null&&e.splice(r++,0,o)}function _g(e){return e!==co}function Ds(e){return e&32767}function aC(e){return e>>16}function Is(e,t){let n=aC(e),a=t;for(;n>0;)a=a[da],n--;return a}var ru=!0;function Ss(e){let t=ru;return ru=e,t}var oC=256,Dg=oC-1,Ig=5,rC=0,qn={};function iC(e,t,n){let a;typeof n=="string"?a=n.charCodeAt(0)||0:n.hasOwnProperty(sa)&&(a=n[sa]),a==null&&(a=n[sa]=rC++);let o=a&Dg,r=1<<o;t.data[e+(o>>Ig)]|=r}function Ms(e,t){let n=Sg(e,t);if(n!==-1)return n;let a=t[w];a.firstCreatePass&&(e.injectorIndex=t.length,Yd(a.data,e),Yd(t,null),Yd(a.blueprint,null));let o=zu(e,t),r=e.injectorIndex;if(_g(o)){let i=Ds(o),s=Is(o,t),c=s[w].data;for(let l=0;l<8;l++)t[r+l]=s[i+l]|c[i+l]}return t[r+8]=o,r}function Yd(e,t){e.push(0,0,0,0,0,0,0,0,t)}function Sg(e,t){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||t[e.injectorIndex+8]===null?-1:e.injectorIndex}function zu(e,t){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let n=0,a=null,o=t;for(;o!==null;){if(a=Ag(o),a===null)return co;if(n++,o=o[da],a.injectorIndex!==-1)return a.injectorIndex|n<<16}return co}function iu(e,t,n){iC(e,t,n)}function sC(e,t){if(t==="class")return e.classes;if(t==="style")return e.styles;let n=e.attrs;if(n){let a=n.length,o=0;for(;o<a;){let r=n[o];if(Cg(r))break;if(r===0)o=o+2;else if(typeof r=="number")for(o++;o<a&&typeof n[o]=="string";)o++;else{if(r===t)return n[o+1];o=o+2}}}return null}function Mg(e,t,n){if(n&8||e!==void 0)return e;Ki(t,"NodeInjector")}function Tg(e,t,n,a){if(n&8&&a===void 0&&(a=null),(n&3)===0){let o=e[la],r=ze(void 0);try{return o?o.get(t,a,n&8):ld(t,a,n&8)}finally{ze(r)}}return Mg(a,t,n)}function xg(e,t,n,a=0,o){if(e!==null){if(t[R]&2048&&!(a&2)){let i=uC(e,t,n,a,qn);if(i!==qn)return i}let r=wg(e,t,n,a,qn);if(r!==qn)return r}return Tg(t,n,a,o)}function wg(e,t,n,a,o){let r=lC(n);if(typeof r=="function"){if(!Vd(t,e,a))return a&1?Mg(o,n,a):Tg(t,n,a,o);try{let i;if(i=r(a),i==null&&!(a&8))Ki(n);else return i}finally{Ud()}}else if(typeof r=="number"){let i=null,s=Sg(e,t),c=co,l=a&1?t[Ge][Ve]:null;for((s===-1||a&4)&&(c=s===-1?zu(e,t):t[s+8],c===co||!Vh(a,!1)?s=-1:(i=t[w],s=Ds(c),t=Is(c,t)));s!==-1;){let d=t[w];if(Bh(r,s,d.data)){let u=cC(s,t,n,i,a,l);if(u!==qn)return u}c=t[s+8],c!==co&&Vh(a,t[w].data[s+8]===l)&&Bh(r,s,t)?(i=d,s=Ds(c),t=Is(c,t)):s=-1}}return o}function cC(e,t,n,a,o,r){let i=t[w],s=i.data[e+8],c=a==null?At(s)&&ru:a!=i&&(s.type&3)!==0,l=o&1&&r===s,d=Es(s,i,n,c,l);return d!==null?vr(t,i,d,s,o):qn}function Es(e,t,n,a,o){let r=e.providerIndexes,i=t.data,s=r&1048575,c=e.directiveStart,l=e.directiveEnd,d=r>>20,u=a?s:s+d,f=o?s+d:l;for(let m=u;m<f;m++){let E=i[m];if(m<c&&n===E||m>=c&&E.type===n)return m}if(o){let m=i[c];if(m&&kn(m)&&m.type===n)return c}return null}function vr(e,t,n,a,o){let r=e[n],i=t.data;if(r instanceof va){let s=r;if(s.resolving){let m=Gi(i[n]);throw cd(m)}let c=Ss(s.canSeeViewProviders);s.resolving=!0;let l=i[n].type||i[n],d,u=s.injectImpl?ze(s.injectImpl):null,f=Vd(e,a,0);try{r=e[n]=s.factory(void 0,o,i,e,a),t.firstCreatePass&&n>=a.directiveStart&&ZE(n,i[n],t)}finally{u!==null&&ze(u),Ss(c),s.resolving=!1,Ud()}}return r}function lC(e){if(typeof e=="string")return e.charCodeAt(0)||0;let t=e.hasOwnProperty(sa)?e[sa]:void 0;return typeof t=="number"?t>=0?t&Dg:dC:t}function Bh(e,t,n){let a=1<<e;return!!(n[t+(e>>Ig)]&a)}function Vh(e,t){return!(e&2)&&!(e&1&&t)}var ga=class{_tNode;_lView;constructor(t,n){this._tNode=t,this._lView=n}get(t,n,a){return xg(this._tNode,this._lView,t,oa(a),n)}};function dC(){return new ga(Ie(),q())}function ba(e){return Cr(()=>{let t=e.prototype.constructor,n=t[Ko]||su(t),a=Object.prototype,o=Object.getPrototypeOf(e.prototype).constructor;for(;o&&o!==a;){let r=o[Ko]||su(o);if(r&&r!==n)return r;o=Object.getPrototypeOf(o)}return r=>new r})}function su(e){return Xl(e)?()=>{let t=su(Se(e));return t&&t()}:St(e)}function uC(e,t,n,a,o){let r=e,i=t;for(;r!==null&&i!==null&&i[R]&2048&&!to(i);){let s=wg(r,i,n,a|2,qn);if(s!==qn)return s;let c=r.parent;if(!c){let l=i[Ed];if(l){let d=l.get(n,qn,a);if(d!==qn)return d}c=Ag(i),i=i[da]}r=c}return o}function Ag(e){let t=e[w],n=t.type;return n===2?t.declTNode:n===1?e[Ve]:null}function _r(e){return sC(Ie(),e)}function pC(){return mo(Ie(),q())}function mo(e,t){return new de(gn(e,t))}var de=(()=>{class e{nativeElement;constructor(n){this.nativeElement=n}static __NG_ELEMENT_ID__=pC}return e})();function mC(e){return e instanceof de?e.nativeElement:e}function fC(){return this._results[Symbol.iterator]()}var at=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new H}constructor(t=!1){this._emitDistinctChangesOnly=t}get(t){return this._results[t]}map(t){return this._results.map(t)}filter(t){return this._results.filter(t)}find(t){return this._results.find(t)}reduce(t,n){return this._results.reduce(t,n)}forEach(t){this._results.forEach(t)}some(t){return this._results.some(t)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(t,n){this.dirty=!1;let a=sh(t);(this._changesDetected=!ih(this._results,a,n))&&(this._results=a,this.length=a.length,this.last=a[this.length-1],this.first=a[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(t){this._onDirty=t}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=fC};function Rg(e){return(e.flags&128)===128}var qu=(function(e){return e[e.OnPush=0]="OnPush",e[e.Default=1]="Default",e})(qu||{}),Pg=new Map,hC=0;function gC(){return hC++}function vC(e){Pg.set(e[rr],e)}function cu(e){Pg.delete(e[rr])}var Uh="__ngContext__";function uo(e,t){Fn(t)?(e[Uh]=t[rr],vC(t)):e[Uh]=t}function Ng(e){return Og(e[eo])}function jg(e){return Og(e[an])}function Og(e){for(;e!==null&&!hn(e);)e=e[an];return e}var lu;function Bu(e){lu=e}function Lg(){if(lu!==void 0)return lu;if(typeof document<"u")return document;throw new D(210,!1)}var fo=new I("",{providedIn:"root",factory:()=>yC}),yC="ng",Bs=new I(""),Ft=new I("",{providedIn:"platform",factory:()=>"unknown"});var Vu=new I(""),ho=new I("",{providedIn:"root",factory:()=>Lg().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var bC="h",EC="b";var Fg=!1,kg=new I("",{providedIn:"root",factory:()=>Fg});var Vs=new I("");var CC=(e,t,n,a)=>{};function _C(e,t,n,a){CC(e,t,n,a)}function Us(e){return(e.flags&32)===32}var DC=()=>null;function zg(e,t,n=!1){return DC(e,t,n)}function qg(e,t){let n=e.contentQueries;if(n!==null){let a=P(null);try{for(let o=0;o<n.length;o+=2){let r=n[o],i=n[o+1];if(i!==-1){let s=e.data[i];cs(r),s.contentQueries(2,t[i],i)}}}finally{P(a)}}}function du(e,t,n){cs(0);let a=P(null);try{t(e,n)}finally{P(a)}}function Uu(e,t,n){if(Cd(t)){let a=P(null);try{let o=t.directiveStart,r=t.directiveEnd;for(let i=o;i<r;i++){let s=e.data[i];if(s.contentQueries){let c=n[i];s.contentQueries(1,c,i)}}}finally{P(a)}}}var ot=(function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e})(ot||{}),fs;function IC(){if(fs===void 0&&(fs=null,Be.trustedTypes))try{fs=Be.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return fs}function Hs(e){return IC()?.createHTML(e)||e}var hs;function SC(){if(hs===void 0&&(hs=null,Be.trustedTypes))try{hs=Be.trustedTypes.createPolicy("angular#unsafe-bypass",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return hs}function Hh(e){return SC()?.createScriptURL(e)||e}var rt=class{changingThisBreaksApplicationSecurity;constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ji})`}},uu=class extends rt{getTypeName(){return"HTML"}},pu=class extends rt{getTypeName(){return"Style"}},mu=class extends rt{getTypeName(){return"Script"}},fu=class extends rt{getTypeName(){return"URL"}},hu=class extends rt{getTypeName(){return"ResourceURL"}};function sn(e){return e instanceof rt?e.changingThisBreaksApplicationSecurity:e}function ct(e,t){let n=Bg(e);if(n!=null&&n!==t){if(n==="ResourceURL"&&t==="URL")return!0;throw new Error(`Required a safe ${t}, got a ${n} (see ${Ji})`)}return n===t}function Bg(e){return e instanceof rt&&e.getTypeName()||null}function Hu(e){return new uu(e)}function $u(e){return new pu(e)}function Gu(e){return new mu(e)}function Wu(e){return new fu(e)}function Ju(e){return new hu(e)}function MC(e){let t=new vu(e);return TC()?new gu(t):t}var gu=class{inertDocumentHelper;constructor(t){this.inertDocumentHelper=t}getInertBodyElement(t){t="<body><remove></remove>"+t;try{let n=new window.DOMParser().parseFromString(Hs(t),"text/html").body;return n===null?this.inertDocumentHelper.getInertBodyElement(t):(n.firstChild?.remove(),n)}catch{return null}}},vu=class{defaultDoc;inertDocument;constructor(t){this.defaultDoc=t,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(t){let n=this.inertDocument.createElement("template");return n.innerHTML=Hs(t),n}};function TC(){try{return!!new window.DOMParser().parseFromString(Hs(""),"text/html")}catch{return!1}}var xC=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Dr(e){return e=String(e),e.match(xC)?e:"unsafe:"+e}function lt(e){let t={};for(let n of e.split(","))t[n]=!0;return t}function Ir(...e){let t={};for(let n of e)for(let a in n)n.hasOwnProperty(a)&&(t[a]=!0);return t}var Vg=lt("area,br,col,hr,img,wbr"),Ug=lt("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),Hg=lt("rp,rt"),wC=Ir(Hg,Ug),AC=Ir(Ug,lt("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),RC=Ir(Hg,lt("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),$h=Ir(Vg,AC,RC,wC),$g=lt("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),PC=lt("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),NC=lt("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),jC=Ir($g,PC,NC),OC=lt("script,style,template"),yu=class{sanitizedSomething=!1;buf=[];sanitizeChildren(t){let n=t.firstChild,a=!0,o=[];for(;n;){if(n.nodeType===Node.ELEMENT_NODE?a=this.startElement(n):n.nodeType===Node.TEXT_NODE?this.chars(n.nodeValue):this.sanitizedSomething=!0,a&&n.firstChild){o.push(n),n=kC(n);continue}for(;n;){n.nodeType===Node.ELEMENT_NODE&&this.endElement(n);let r=FC(n);if(r){n=r;break}n=o.pop()}}return this.buf.join("")}startElement(t){let n=Gh(t).toLowerCase();if(!$h.hasOwnProperty(n))return this.sanitizedSomething=!0,!OC.hasOwnProperty(n);this.buf.push("<"),this.buf.push(n);let a=t.attributes;for(let o=0;o<a.length;o++){let r=a.item(o),i=r.name,s=i.toLowerCase();if(!jC.hasOwnProperty(s)){this.sanitizedSomething=!0;continue}let c=r.value;$g[s]&&(c=Dr(c)),this.buf.push(" ",i,'="',Wh(c),'"')}return this.buf.push(">"),!0}endElement(t){let n=Gh(t).toLowerCase();$h.hasOwnProperty(n)&&!Vg.hasOwnProperty(n)&&(this.buf.push("</"),this.buf.push(n),this.buf.push(">"))}chars(t){this.buf.push(Wh(t))}};function LC(e,t){return(e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function FC(e){let t=e.nextSibling;if(t&&e!==t.previousSibling)throw Gg(t);return t}function kC(e){let t=e.firstChild;if(t&&LC(e,t))throw Gg(t);return t}function Gh(e){let t=e.nodeName;return typeof t=="string"?t:"FORM"}function Gg(e){return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)}var zC=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,qC=/([^\#-~ |!])/g;function Wh(e){return e.replace(/&/g,"&amp;").replace(zC,function(t){let n=t.charCodeAt(0),a=t.charCodeAt(1);return"&#"+((n-55296)*1024+(a-56320)+65536)+";"}).replace(qC,function(t){return"&#"+t.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var gs;function Qu(e,t){let n=null;try{gs=gs||MC(e);let a=t?String(t):"";n=gs.getInertBodyElement(a);let o=5,r=a;do{if(o===0)throw new Error("Failed to sanitize html because the input is unstable");o--,a=r,r=n.innerHTML,n=gs.getInertBodyElement(a)}while(a!==r);let s=new yu().sanitizeChildren(Jh(n)||n);return Hs(s)}finally{if(n){let a=Jh(n)||n;for(;a.firstChild;)a.firstChild.remove()}}}function Jh(e){return"content"in e&&BC(e)?e.content:null}function BC(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}var we=(function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e})(we||{});function Oe(e){let t=Jg();return t?t.sanitize(we.URL,e)||"":ct(e,"URL")?sn(e):Dr(tr(e))}function Wg(e){let t=Jg();if(t)return Hh(t.sanitize(we.RESOURCE_URL,e)||"");if(ct(e,"ResourceURL"))return Hh(sn(e));throw new D(904,!1)}function VC(e,t){return t==="src"&&(e==="embed"||e==="frame"||e==="iframe"||e==="media"||e==="script")||t==="href"&&(e==="base"||e==="link")?Wg:Oe}function Yu(e,t,n){return VC(t,n)(e)}function Jg(){let e=q();return e&&e[On].sanitizer}var UC=/^>|^->|<!--|-->|--!>|<!-$/g,HC=/(<|>)/g,$C="\u200B$1\u200B";function GC(e){return e.replace(UC,t=>t.replace(HC,$C))}function Zu(e){return e.ownerDocument.defaultView}function Ku(e){return e.ownerDocument}function Qg(e){return e instanceof Function?e():e}function WC(e,t,n){let a=e.length;for(;;){let o=e.indexOf(t,n);if(o===-1)return o;if(o===0||e.charCodeAt(o-1)<=32){let r=t.length;if(o+r===a||e.charCodeAt(o+r)<=32)return o}n=o+1}}var Yg="ng-template";function JC(e,t,n,a){let o=0;if(a){for(;o<t.length&&typeof t[o]=="string";o+=2)if(t[o]==="class"&&WC(t[o+1].toLowerCase(),n,0)!==-1)return!0}else if(Xu(e))return!1;if(o=t.indexOf(1,o),o>-1){let r;for(;++o<t.length&&typeof(r=t[o])=="string";)if(r.toLowerCase()===n)return!0}return!1}function Xu(e){return e.type===4&&e.value!==Yg}function QC(e,t,n){let a=e.type===4&&!n?Yg:e.value;return t===a}function YC(e,t,n){let a=4,o=e.attrs,r=o!==null?XC(o):0,i=!1;for(let s=0;s<t.length;s++){let c=t[s];if(typeof c=="number"){if(!i&&!yn(a)&&!yn(c))return!1;if(i&&yn(c))continue;i=!1,a=c|a&1;continue}if(!i)if(a&4){if(a=2|a&1,c!==""&&!QC(e,c,n)||c===""&&t.length===1){if(yn(a))return!1;i=!0}}else if(a&8){if(o===null||!JC(e,o,c,n)){if(yn(a))return!1;i=!0}}else{let l=t[++s],d=ZC(c,o,Xu(e),n);if(d===-1){if(yn(a))return!1;i=!0;continue}if(l!==""){let u;if(d>r?u="":u=o[d+1].toLowerCase(),a&2&&l!==u){if(yn(a))return!1;i=!0}}}}return yn(a)||i}function yn(e){return(e&1)===0}function ZC(e,t,n,a){if(t===null)return-1;let o=0;if(a||!n){let r=!1;for(;o<t.length;){let i=t[o];if(i===e)return o;if(i===3||i===6)r=!0;else if(i===1||i===2){let s=t[++o];for(;typeof s=="string";)s=t[++o];continue}else{if(i===4)break;if(i===0){o+=4;continue}}o+=r?1:2}return-1}else return e_(t,e)}function Zg(e,t,n=!1){for(let a=0;a<t.length;a++)if(YC(e,t[a],n))return!0;return!1}function KC(e){let t=e.attrs;if(t!=null){let n=t.indexOf(5);if((n&1)===0)return t[n+1]}return null}function XC(e){for(let t=0;t<e.length;t++){let n=e[t];if(Cg(n))return t}return e.length}function e_(e,t){let n=e.indexOf(4);if(n>-1)for(n++;n<e.length;){let a=e[n];if(typeof a=="number")return-1;if(a===t)return n;n++}return-1}function n_(e,t){e:for(let n=0;n<t.length;n++){let a=t[n];if(e.length===a.length){for(let o=0;o<e.length;o++)if(e[o]!==a[o])continue e;return!0}}return!1}function Qh(e,t){return e?":not("+t.trim()+")":t}function t_(e){let t=e[0],n=1,a=2,o="",r=!1;for(;n<e.length;){let i=e[n];if(typeof i=="string")if(a&2){let s=e[++n];o+="["+i+(s.length>0?'="'+s+'"':"")+"]"}else a&8?o+="."+i:a&4&&(o+=" "+i);else o!==""&&!yn(i)&&(t+=Qh(r,o),o=""),a=i,r=r||!yn(a);n++}return o!==""&&(t+=Qh(r,o)),t}function a_(e){return e.map(t_).join(",")}function o_(e){let t=[],n=[],a=1,o=2;for(;a<e.length;){let r=e[a];if(typeof r=="string")o===2?r!==""&&t.push(r,e[++a]):o===8&&n.push(r);else{if(!yn(o))break;o=r}a++}return n.length&&t.push(1,...n),t}var cn={};function r_(e,t){return e.createText(t)}function i_(e,t,n){e.setValue(t,n)}function s_(e,t){return e.createComment(GC(t))}function Kg(e,t,n){return e.createElement(t,n)}function Ts(e,t,n,a,o){e.insertBefore(t,n,a,o)}function Xg(e,t,n){e.appendChild(t,n)}function Yh(e,t,n,a,o){a!==null?Ts(e,t,n,a,o):Xg(e,t,n)}function c_(e,t,n){e.removeChild(null,t,n)}function l_(e,t,n){e.setAttribute(t,"style",n)}function d_(e,t,n){n===""?e.removeAttribute(t,"class"):e.setAttribute(t,"class",n)}function ev(e,t,n){let{mergedAttrs:a,classes:o,styles:r}=n;a!==null&&nC(e,t,a),o!==null&&d_(e,t,o),r!==null&&l_(e,t,r)}function ep(e,t,n,a,o,r,i,s,c,l,d){let u=le+a,f=u+o,m=u_(u,f),E=typeof l=="function"?l():l;return m[w]={type:e,blueprint:m,template:n,queries:null,viewQuery:s,declTNode:t,data:m.slice().fill(null,u),bindingStartIndex:u,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof r=="function"?r():r,pipeRegistry:typeof i=="function"?i():i,firstChild:null,schemas:c,consts:E,incompleteFirstPass:!1,ssrId:d}}function u_(e,t){let n=[];for(let a=0;a<t;a++)n.push(a<e?null:cn);return n}function p_(e){let t=e.tView;return t===null||t.incompleteFirstPass?e.tView=ep(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):t}function np(e,t,n,a,o,r,i,s,c,l,d){let u=t.blueprint.slice();return u[fn]=o,u[R]=a|4|128|8|64|1024,(l!==null||e&&e[R]&2048)&&(u[R]|=2048),Md(u),u[De]=u[da]=e,u[xe]=n,u[On]=i||e&&e[On],u[ce]=s||e&&e[ce],u[la]=c||e&&e[la]||null,u[Ve]=r,u[rr]=gC(),u[Ka]=d,u[Ed]=l,u[Ge]=t.type==2?e[Ge]:u,u}function m_(e,t,n){let a=gn(t,e),o=p_(n),r=e[On].rendererFactory,i=tp(e,np(e,o,null,nv(n),a,t,null,r.createRenderer(a,n),null,null,null));return e[t.index]=i}function nv(e){let t=16;return e.signals?t=4096:e.onPush&&(t=64),t}function tv(e,t,n,a){if(n===0)return-1;let o=t.length;for(let r=0;r<n;r++)t.push(a),e.blueprint.push(a),e.data.push(null);return o}function tp(e,t){return e[eo]?e[bd][an]=t:e[eo]=t,e[bd]=t,t}function v(e=1){av(ye(),q(),Pt()+e,!1)}function av(e,t,n,a){if(!a)if((t[R]&3)===3){let r=e.preOrderCheckHooks;r!==null&&ys(t,r,n)}else{let r=e.preOrderHooks;r!==null&&bs(t,r,0,n)}Nt(n)}var $s=(function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e})($s||{});function bu(e,t,n,a){let o=P(null);try{let[r,i,s]=e.inputs[n],c=null;(i&$s.SignalBased)!==0&&(c=t[r][Le]),c!==null&&c.transformFn!==void 0?a=c.transformFn(a):s!==null&&(a=s.call(t,a)),e.setInput!==null?e.setInput(t,c,a,n,r):hg(t,c,r,a)}finally{P(o)}}var En=(function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e})(En||{}),f_;function ap(e,t){return f_(e,t)}function so(e,t,n,a,o){if(a!=null){let r,i=!1;hn(a)?r=a:Fn(a)&&(i=!0,a=a[fn]);let s=on(a);e===0&&n!==null?o==null?Xg(t,n,s):Ts(t,n,s,o||null,!0):e===1&&n!==null?Ts(t,n,s,o||null,!0):e===2?c_(t,s,i):e===3&&t.destroyNode(s),r!=null&&I_(t,e,r,n,o)}}function h_(e,t){ov(e,t),t[fn]=null,t[Ve]=null}function g_(e,t,n,a,o,r){a[fn]=o,a[Ve]=t,Gs(e,a,n,1,o,r)}function ov(e,t){t[On].changeDetectionScheduler?.notify(9),Gs(e,t,t[ce],2,null,null)}function v_(e){let t=e[eo];if(!t)return Zd(e[w],e);for(;t;){let n=null;if(Fn(t))n=t[eo];else{let a=t[Pe];a&&(n=a)}if(!n){for(;t&&!t[an]&&t!==e;)Fn(t)&&Zd(t[w],t),t=t[De];t===null&&(t=e),Fn(t)&&Zd(t[w],t),n=t&&t[an]}t=n}}function op(e,t){let n=e[ma],a=n.indexOf(t);n.splice(a,1)}function rp(e,t){if(fa(t))return;let n=t[ce];n.destroyNode&&Gs(e,t,n,3,null,null),v_(t)}function Zd(e,t){if(fa(t))return;let n=P(null);try{t[R]&=-129,t[R]|=256,t[Ye]&&Zt(t[Ye]),b_(e,t),y_(e,t),t[w].type===1&&t[ce].destroy();let a=t[xt];if(a!==null&&hn(t[De])){a!==t[De]&&op(a,t);let o=t[Ln];o!==null&&o.detachView(e)}cu(t)}finally{P(n)}}function y_(e,t){let n=e.cleanup,a=t[Xa];if(n!==null)for(let i=0;i<n.length-1;i+=2)if(typeof n[i]=="string"){let s=n[i+3];s>=0?a[s]():a[-s].unsubscribe(),i+=2}else{let s=a[n[i+1]];n[i].call(s)}a!==null&&(t[Xa]=null);let o=t[Kn];if(o!==null){t[Kn]=null;for(let i=0;i<o.length;i++){let s=o[i];s()}}let r=t[nt];if(r!==null){t[nt]=null;for(let i of r)i.destroy()}}function b_(e,t){let n;if(e!=null&&(n=e.destroyHooks)!=null)for(let a=0;a<n.length;a+=2){let o=t[n[a]];if(!(o instanceof va)){let r=n[a+1];if(Array.isArray(r))for(let i=0;i<r.length;i+=2){let s=o[r[i]],c=r[i+1];X(4,s,c);try{c.call(s)}finally{X(5,s,c)}}else{X(4,o,r);try{r.call(o)}finally{X(5,o,r)}}}}}function rv(e,t,n){return E_(e,t.parent,n)}function E_(e,t,n){let a=t;for(;a!==null&&a.type&168;)t=a,a=t.parent;if(a===null)return n[fn];if(At(a)){let{encapsulation:o}=e.data[a.directiveStart+a.componentOffset];if(o===ot.None||o===ot.Emulated)return null}return gn(a,n)}function iv(e,t,n){return __(e,t,n)}function C_(e,t,n){return e.type&40?gn(e,n):null}var __=C_,Zh;function ip(e,t,n,a){let o=rv(e,a,t),r=t[ce],i=a.parent||t[Ve],s=iv(i,a,t);if(o!=null)if(Array.isArray(n))for(let c=0;c<n.length;c++)Yh(r,o,n[c],s,!1);else Yh(r,o,n,s,!1);Zh!==void 0&&Zh(r,a,t,n,o)}function hr(e,t){if(t!==null){let n=t.type;if(n&3)return gn(t,e);if(n&4)return Eu(-1,e[t.index]);if(n&8){let a=t.child;if(a!==null)return hr(e,a);{let o=e[t.index];return hn(o)?Eu(-1,o):on(o)}}else{if(n&128)return hr(e,t.next);if(n&32)return ap(t,e)()||on(e[t.index]);{let a=sv(e,t);if(a!==null){if(Array.isArray(a))return a[0];let o=Mt(e[Ge]);return hr(o,a)}else return hr(e,t.next)}}}return null}function sv(e,t){if(t!==null){let a=e[Ge][Ve],o=t.projection;return a.projection[o]}return null}function Eu(e,t){let n=Pe+e+1;if(n<t.length){let a=t[n],o=a[w].firstChild;if(o!==null)return hr(a,o)}return t[wt]}function sp(e,t,n,a,o,r,i){for(;n!=null;){if(n.type===128){n=n.next;continue}let s=a[n.index],c=n.type;if(i&&t===0&&(s&&uo(on(s),a),n.flags|=2),!Us(n))if(c&8)sp(e,t,n.child,a,o,r,!1),so(t,e,o,s,r);else if(c&32){let l=ap(n,a),d;for(;d=l();)so(t,e,o,d,r);so(t,e,o,s,r)}else c&16?cv(e,t,a,n,o,r):so(t,e,o,s,r);n=i?n.projectionNext:n.next}}function Gs(e,t,n,a,o,r){sp(n,a,e.firstChild,t,o,r,!1)}function D_(e,t,n){let a=t[ce],o=rv(e,n,t),r=n.parent||t[Ve],i=iv(r,n,t);cv(a,0,t,n,o,i)}function cv(e,t,n,a,o,r){let i=n[Ge],c=i[Ve].projection[a.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let d=c[l];so(t,e,o,d,r)}else{let l=c,d=i[De];Rg(a)&&(l.flags|=128),sp(e,t,l,d,o,r,!0)}}function I_(e,t,n,a,o){let r=n[wt],i=on(n);r!==i&&so(t,e,a,r,o);for(let s=Pe;s<n.length;s++){let c=n[s];Gs(c[w],c,e,t,a,r)}}function S_(e,t,n,a,o){if(t)o?e.addClass(n,a):e.removeClass(n,a);else{let r=a.indexOf("-")===-1?void 0:En.DashCase;o==null?e.removeStyle(n,a,r):(typeof o=="string"&&o.endsWith("!important")&&(o=o.slice(0,-10),r|=En.Important),e.setStyle(n,a,o,r))}}function lv(e,t,n,a,o){let r=Pt(),i=a&2;try{Nt(-1),i&&t.length>le&&av(e,t,le,!1),X(i?2:0,o,n),n(a,o)}finally{Nt(r),X(i?3:1,o,n)}}function Ws(e,t,n){N_(e,t,n),(n.flags&64)===64&&j_(e,t,n)}function Sr(e,t,n=gn){let a=t.localNames;if(a!==null){let o=t.index+1;for(let r=0;r<a.length;r+=2){let i=a[r+1],s=i===-1?n(t,e):e[i];e[o++]=s}}}function M_(e,t,n,a){let r=a.get(kg,Fg)||n===ot.ShadowDom,i=e.selectRootElement(t,r);return T_(i),i}function T_(e){x_(e)}var x_=()=>null;function w_(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function A_(e,t,n,a,o,r){let i=t[w];if(up(e,i,t,n,a)){At(e)&&P_(t,e.index);return}e.type&3&&(n=w_(n)),R_(e,t,n,a,o,r)}function R_(e,t,n,a,o,r){if(e.type&3){let i=gn(e,t);a=r!=null?r(a,e.value||"",n):a,o.setProperty(i,n,a)}else e.type&12}function P_(e,t){let n=rn(t,e);n[R]&16||(n[R]|=64)}function N_(e,t,n){let a=n.directiveStart,o=n.directiveEnd;At(n)&&m_(t,n,e.data[a+n.componentOffset]),e.firstCreatePass||Ms(n,t);let r=n.initialInputs;for(let i=a;i<o;i++){let s=e.data[i],c=vr(t,e,i,n);if(uo(c,t),r!==null&&k_(t,i-a,c,s,n,r),kn(s)){let l=rn(n.index,t);l[xe]=vr(t,e,i,n)}}}function j_(e,t,n){let a=n.directiveStart,o=n.directiveEnd,r=n.index,i=wh();try{Nt(r);for(let s=a;s<o;s++){let c=e.data[s],l=t[s];ss(s),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&O_(c,l)}}finally{Nt(-1),ss(i)}}function O_(e,t){e.hostBindings!==null&&e.hostBindings(1,t)}function cp(e,t){let n=e.directiveRegistry,a=null;if(n)for(let o=0;o<n.length;o++){let r=n[o];Zg(t,r.selectors,!1)&&(a??=[],kn(r)?a.unshift(r):a.push(r))}return a}function L_(e,t,n,a,o,r){let i=gn(e,t);F_(t[ce],i,r,e.value,n,a,o)}function F_(e,t,n,a,o,r,i){if(r==null)e.removeAttribute(t,o,n);else{let s=i==null?tr(r):i(r,a||"",o);e.setAttribute(t,o,s,n)}}function k_(e,t,n,a,o,r){let i=r[t];if(i!==null)for(let s=0;s<i.length;s+=2){let c=i[s],l=i[s+1];bu(a,n,c,l)}}function lp(e,t,n,a,o){let r=le+n,i=t[w],s=o(i,t,e,a,n);t[r]=s,ao(e,!0);let c=e.type===2;return c?(ev(t[ce],s,e),(Ch()===0||no(e))&&uo(s,t),_h()):uo(s,t),ps()&&(!c||!Us(e))&&ip(i,t,s,e),e}function dp(e){let t=e;return Ld()?Fd():(t=t.parent,ao(t,!1)),t}function z_(e,t){let n=e[la];if(!n)return;let a;try{a=n.get(Ze,null)}catch{a=null}a?.(t)}function up(e,t,n,a,o){let r=e.inputs?.[a],i=e.hostDirectiveInputs?.[a],s=!1;if(i)for(let c=0;c<i.length;c+=2){let l=i[c],d=i[c+1],u=t.data[l];bu(u,n[l],d,o),s=!0}if(r)for(let c of r){let l=n[c],d=t.data[c];bu(d,l,a,o),s=!0}return s}function q_(e,t){let n=rn(t,e),a=n[w];B_(a,n);let o=n[fn];o!==null&&n[Ka]===null&&(n[Ka]=zg(o,n[la])),X(18),pp(a,n,n[xe]),X(19,n[xe])}function B_(e,t){for(let n=t.length;n<e.blueprint.length;n++)t.push(e.blueprint[n])}function pp(e,t,n){ls(t);try{let a=e.viewQuery;a!==null&&du(1,a,n);let o=e.template;o!==null&&lv(e,t,o,1,n),e.firstCreatePass&&(e.firstCreatePass=!1),t[Ln]?.finishViewCreation(e),e.staticContentQueries&&qg(e,t),e.staticViewQueries&&du(2,e.viewQuery,n);let r=e.components;r!==null&&V_(t,r)}catch(a){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),a}finally{t[R]&=-5,ds()}}function V_(e,t){for(let n=0;n<t.length;n++)q_(e,t[n])}function mp(e,t,n,a){let o=P(null);try{let r=t.tView,s=e[R]&4096?4096:16,c=np(e,r,n,s,null,t,null,null,a?.injector??null,a?.embeddedViewInjector??null,a?.dehydratedView??null),l=e[t.index];c[xt]=l;let d=e[Ln];return d!==null&&(c[Ln]=d.createEmbeddedView(r)),pp(r,c,n),c}finally{P(o)}}function xs(e,t){return!t||t.firstChild===null||Rg(e)}var Kh=!1,U_=new I("");function yr(e,t,n,a,o=!1){for(;n!==null;){if(n.type===128){n=o?n.projectionNext:n.next;continue}let r=t[n.index];r!==null&&a.push(on(r)),hn(r)&&dv(r,a);let i=n.type;if(i&8)yr(e,t,n.child,a);else if(i&32){let s=ap(n,t),c;for(;c=s();)a.push(c)}else if(i&16){let s=sv(t,n);if(Array.isArray(s))a.push(...s);else{let c=Mt(t[Ge]);yr(c[w],c,s,a,!0)}}n=o?n.projectionNext:n.next}return a}function dv(e,t){for(let n=Pe;n<e.length;n++){let a=e[n],o=a[w].firstChild;o!==null&&yr(a[w],a,o,t)}e[wt]!==e[fn]&&t.push(e[wt])}function uv(e){if(e[pa]!==null){for(let t of e[pa])t.impl.addSequence(t);e[pa].length=0}}var pv=[];function H_(e){return e[Ye]??$_(e)}function $_(e){let t=pv.pop()??Object.create(W_);return t.lView=e,t}function G_(e){e.lView[Ye]!==e&&(e.lView=null,pv.push(e))}var W_=J(_({},La),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{Rt(e.lView)},consumerOnSignalRead(){this.lView[Ye]=this}});function J_(e){let t=e[Ye]??Object.create(Q_);return t.lView=e,t}var Q_=J(_({},La),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{let t=Mt(e.lView);for(;t&&!mv(t[w]);)t=Mt(t);t&&Td(t)},consumerOnSignalRead(){this.lView[Ye]=this}});function mv(e){return e.type!==2}function fv(e){if(e[nt]===null)return;let t=!0;for(;t;){let n=!1;for(let a of e[nt])a.dirty&&(n=!0,a.zone===null||Zone.current===a.zone?a.run():a.zone.run(()=>a.run()));t=n&&!!(e[R]&8192)}}var Y_=100;function fp(e,t=0){let a=e[On].rendererFactory,o=!1;o||a.begin?.();try{Z_(e,t)}finally{o||a.end?.()}}function Z_(e,t){let n=zd();try{oo(!0),Cu(e,t);let a=0;for(;cr(e);){if(a===Y_)throw new D(103,!1);a++,Cu(e,1)}}finally{oo(n)}}function hv(e,t){kd(t?lr.Exhaustive:lr.OnlyDirtyViews);try{fp(e)}finally{kd(lr.Off)}}function K_(e,t,n,a){if(fa(t))return;let o=t[R],r=!1,i=!1;ls(t);let s=!0,c=null,l=null;r||(mv(e)?(l=H_(t),c=Fa(l)):vi()===null?(s=!1,l=J_(t),c=Fa(l)):t[Ye]&&(Zt(t[Ye]),t[Ye]=null));try{Md(t),Mh(e.bindingStartIndex),n!==null&&lv(e,t,n,2,a);let d=(o&3)===3;if(!r)if(d){let m=e.preOrderCheckHooks;m!==null&&ys(t,m,null)}else{let m=e.preOrderHooks;m!==null&&bs(t,m,0,null),Qd(t,0)}if(i||X_(t),fv(t),gv(t,0),e.contentQueries!==null&&qg(e,t),!r)if(d){let m=e.contentCheckHooks;m!==null&&ys(t,m)}else{let m=e.contentHooks;m!==null&&bs(t,m,1),Qd(t,1)}nD(e,t);let u=e.components;u!==null&&yv(t,u,0);let f=e.viewQuery;if(f!==null&&du(2,f,a),!r)if(d){let m=e.viewCheckHooks;m!==null&&ys(t,m)}else{let m=e.viewHooks;m!==null&&bs(t,m,2),Qd(t,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),t[as]){for(let m of t[as])m();t[as]=null}r||(uv(t),t[R]&=-73)}catch(d){throw r||Rt(t),d}finally{l!==null&&(Ho(l,c),s&&G_(l)),ds()}}function gv(e,t){for(let n=Ng(e);n!==null;n=jg(n))for(let a=Pe;a<n.length;a++){let o=n[a];vv(o,t)}}function X_(e){for(let t=Ng(e);t!==null;t=jg(t)){if(!(t[R]&2))continue;let n=t[ma];for(let a=0;a<n.length;a++){let o=n[a];Td(o)}}}function eD(e,t,n){X(18);let a=rn(t,e);vv(a,n),X(19,a[xe])}function vv(e,t){os(e)&&Cu(e,t)}function Cu(e,t){let a=e[w],o=e[R],r=e[Ye],i=!!(t===0&&o&16);if(i||=!!(o&64&&t===0),i||=!!(o&1024),i||=!!(r?.dirty&&ka(r)),i||=!1,r&&(r.dirty=!1),e[R]&=-9217,i)K_(a,e,a.template,e[xe]);else if(o&8192){let s=P(null);try{fv(e),gv(e,1);let c=a.components;c!==null&&yv(e,c,1),uv(e)}finally{P(s)}}}function yv(e,t,n){for(let a=0;a<t.length;a++)eD(e,t[a],n)}function nD(e,t){let n=e.hostBindingOpCodes;if(n!==null)try{for(let a=0;a<n.length;a++){let o=n[a];if(o<0)Nt(~o);else{let r=o,i=n[++a],s=n[++a];xh(i,r);let c=t[r];X(24,c),s(2,c),X(25,c)}}}finally{Nt(-1)}}function hp(e,t){let n=zd()?64:1088;for(e[On].changeDetectionScheduler?.notify(t);e;){e[R]|=n;let a=Mt(e);if(to(e)&&!a)return e;e=a}return null}function bv(e,t,n,a){return[e,!0,0,t,null,a,null,n,null,null]}function tD(e,t){let n=Pe+t;if(n<e.length)return e[n]}function gp(e,t,n,a=!0){let o=t[w];if(oD(o,t,e,n),a){let i=Eu(n,e),s=t[ce],c=s.parentNode(e[wt]);c!==null&&g_(o,e[Ve],s,t,c,i)}let r=t[Ka];r!==null&&r.firstChild!==null&&(r.firstChild=null)}function aD(e,t){let n=ws(e,t);return n!==void 0&&rp(n[w],n),n}function ws(e,t){if(e.length<=Pe)return;let n=Pe+t,a=e[n];if(a){let o=a[xt];o!==null&&o!==e&&op(o,a),t>0&&(e[n-1][an]=a[an]);let r=ar(e,Pe+t);h_(a[w],a);let i=r[Ln];i!==null&&i.detachView(r[w]),a[De]=null,a[an]=null,a[R]&=-129}return a}function oD(e,t,n,a){let o=Pe+a,r=n.length;a>0&&(n[o-1][an]=t),a<r-Pe?(t[an]=n[o],dd(n,Pe+a,t)):(n.push(t),t[an]=null),t[De]=n;let i=t[xt];i!==null&&n!==i&&Ev(i,t);let s=t[Ln];s!==null&&s.insertView(e),rs(t),t[R]|=128}function Ev(e,t){let n=e[ma],a=t[De];if(Fn(a))e[R]|=2;else{let o=a[De][Ge];t[Ge]!==o&&(e[R]|=2)}n===null?e[ma]=[t]:n.push(t)}var jt=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let t=this._lView,n=t[w];return yr(n,t,n.firstChild,[])}constructor(t,n){this._lView=t,this._cdRefInjectingView=n}get context(){return this._lView[xe]}set context(t){this._lView[xe]=t}get destroyed(){return fa(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let t=this._lView[De];if(hn(t)){let n=t[ir],a=n?n.indexOf(this):-1;a>-1&&(ws(t,a),ar(n,a))}this._attachedToViewContainer=!1}rp(this._lView[w],this._lView)}onDestroy(t){xd(this._lView,t)}markForCheck(){hp(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[R]&=-129}reattach(){rs(this._lView),this._lView[R]|=128}detectChanges(){this._lView[R]|=1024,fp(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new D(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let t=to(this._lView),n=this._lView[xt];n!==null&&!t&&op(n,this._lView),ov(this._lView[w],this._lView)}attachToAppRef(t){if(this._attachedToViewContainer)throw new D(902,!1);this._appRef=t;let n=to(this._lView),a=this._lView[xt];a!==null&&!n&&Ev(a,this._lView),rs(this._lView)}};var Cn=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=rD;constructor(n,a,o){this._declarationLView=n,this._declarationTContainer=a,this.elementRef=o}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(n,a){return this.createEmbeddedViewImpl(n,a)}createEmbeddedViewImpl(n,a,o){let r=mp(this._declarationLView,this._declarationTContainer,n,{embeddedViewInjector:a,dehydratedView:o});return new jt(r)}}return e})();function rD(){return Js(Ie(),q())}function Js(e,t){return e.type&4?new Cn(t,e,mo(e,t)):null}function go(e,t,n,a,o){let r=e.data[t];if(r===null)r=iD(e,t,n,a,o),Th()&&(r.flags|=32);else if(r.type&64){r.type=n,r.value=a,r.attrs=o;let i=Dh();r.injectorIndex=i===null?-1:i.injectorIndex}return ao(r,!0),r}function iD(e,t,n,a,o){let r=Od(),i=Ld(),s=i?r:r&&r.parent,c=e.data[t]=cD(e,s,n,t,a,o);return sD(e,c,r,i),c}function sD(e,t,n,a){e.firstChild===null&&(e.firstChild=t),n!==null&&(a?n.child==null&&t.parent!==null&&(n.child=t):n.next===null&&(n.next=t,t.prev=n))}function cD(e,t,n,a,o,r){let i=t?t.injectorIndex:-1,s=0;return Pd()&&(s|=128),{type:n,index:a,insertBeforeIndex:null,injectorIndex:i,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,propertyBindings:null,flags:s,providerIndexes:0,value:o,attrs:r,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:t,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}var RL=new RegExp(`^(\\d+)*(${EC}|${bC})*(.*)`);var lD=()=>null,dD=()=>null;function _u(e,t){return lD(e,t)}function uD(e,t,n){return dD(e,t,n)}var Cv=class{},Qs=class{},Du=class{resolveComponentFactory(t){throw new D(917,!1)}},Mr=class{static NULL=new Du},it=class{},kt=(()=>{class e{destroyNode=null;static __NG_ELEMENT_ID__=()=>pD()}return e})();function pD(){let e=q(),t=Ie(),n=rn(t.index,e);return(Fn(n)?n:e)[ce]}var _v=(()=>{class e{static \u0275prov=b({token:e,providedIn:"root",factory:()=>null})}return e})();var Cs={},Iu=class{injector;parentInjector;constructor(t,n){this.injector=t,this.parentInjector=n}get(t,n,a){let o=this.injector.get(t,Cs,a);return o!==Cs||n===Cs?o:this.parentInjector.get(t,n,a)}};function As(e,t,n){let a=n?e.styles:null,o=n?e.classes:null,r=0;if(t!==null)for(let i=0;i<t.length;i++){let s=t[i];if(typeof s=="number")r=s;else if(r==1)o=Qi(o,s);else if(r==2){let c=s,l=t[++i];a=Qi(a,c+": "+l+";")}}n?e.styles=a:e.stylesWithoutHost=a,n?e.classes=o:e.classesWithoutHost=o}function Q(e,t=0){let n=q();if(n===null)return M(e,t);let a=Ie();return xg(a,n,Se(e),t)}function vp(){let e="invalid";throw new Error(e)}function Dv(e,t,n,a,o){let r=a===null?null:{"":-1},i=o(e,n);if(i!==null){let s=i,c=null,l=null;for(let d of i)if(d.resolveHostDirectives!==null){[s,c,l]=d.resolveHostDirectives(i);break}hD(e,t,n,s,r,c,l)}r!==null&&a!==null&&mD(n,a,r)}function mD(e,t,n){let a=e.localNames=[];for(let o=0;o<t.length;o+=2){let r=n[t[o+1]];if(r==null)throw new D(-301,!1);a.push(t[o],r)}}function fD(e,t,n){t.componentOffset=n,(e.components??=[]).push(t.index)}function hD(e,t,n,a,o,r,i){let s=a.length,c=!1;for(let f=0;f<s;f++){let m=a[f];!c&&kn(m)&&(c=!0,fD(e,n,f)),iu(Ms(n,t),e,m.type)}CD(n,e.data.length,s);for(let f=0;f<s;f++){let m=a[f];m.providersResolver&&m.providersResolver(m)}let l=!1,d=!1,u=tv(e,t,s,null);s>0&&(n.directiveToIndex=new Map);for(let f=0;f<s;f++){let m=a[f];if(n.mergedAttrs=lo(n.mergedAttrs,m.hostAttrs),vD(e,n,t,u,m),ED(u,m,o),i!==null&&i.has(m)){let[T,U]=i.get(m);n.directiveToIndex.set(m.type,[u,T+n.directiveStart,U+n.directiveStart])}else(r===null||!r.has(m))&&n.directiveToIndex.set(m.type,u);m.contentQueries!==null&&(n.flags|=4),(m.hostBindings!==null||m.hostAttrs!==null||m.hostVars!==0)&&(n.flags|=64);let E=m.type.prototype;!l&&(E.ngOnChanges||E.ngOnInit||E.ngDoCheck)&&((e.preOrderHooks??=[]).push(n.index),l=!0),!d&&(E.ngOnChanges||E.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(n.index),d=!0),u++}gD(e,n,r)}function gD(e,t,n){for(let a=t.directiveStart;a<t.directiveEnd;a++){let o=e.data[a];if(n===null||!n.has(o))Xh(0,t,o,a),Xh(1,t,o,a),ng(t,a,!1);else{let r=n.get(o);eg(0,t,r,a),eg(1,t,r,a),ng(t,a,!0)}}}function Xh(e,t,n,a){let o=e===0?n.inputs:n.outputs;for(let r in o)if(o.hasOwnProperty(r)){let i;e===0?i=t.inputs??={}:i=t.outputs??={},i[r]??=[],i[r].push(a),Iv(t,r)}}function eg(e,t,n,a){let o=e===0?n.inputs:n.outputs;for(let r in o)if(o.hasOwnProperty(r)){let i=o[r],s;e===0?s=t.hostDirectiveInputs??={}:s=t.hostDirectiveOutputs??={},s[i]??=[],s[i].push(a,r),Iv(t,i)}}function Iv(e,t){t==="class"?e.flags|=8:t==="style"&&(e.flags|=16)}function ng(e,t,n){let{attrs:a,inputs:o,hostDirectiveInputs:r}=e;if(a===null||!n&&o===null||n&&r===null||Xu(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let i=null,s=0;for(;s<a.length;){let c=a[s];if(c===0){s+=4;continue}else if(c===5){s+=2;continue}else if(typeof c=="number")break;if(!n&&o.hasOwnProperty(c)){let l=o[c];for(let d of l)if(d===t){i??=[],i.push(c,a[s+1]);break}}else if(n&&r.hasOwnProperty(c)){let l=r[c];for(let d=0;d<l.length;d+=2)if(l[d]===t){i??=[],i.push(l[d+1],a[s+1]);break}}s+=2}e.initialInputs??=[],e.initialInputs.push(i)}function vD(e,t,n,a,o){e.data[a]=o;let r=o.factory||(o.factory=St(o.type,!0)),i=new va(r,kn(o),Q,null);e.blueprint[a]=i,n[a]=i,yD(e,t,a,tv(e,n,o.hostVars,cn),o)}function yD(e,t,n,a,o){let r=o.hostBindings;if(r){let i=e.hostBindingOpCodes;i===null&&(i=e.hostBindingOpCodes=[]);let s=~t.index;bD(i)!=s&&i.push(s),i.push(n,a,r)}}function bD(e){let t=e.length;for(;t>0;){let n=e[--t];if(typeof n=="number"&&n<0)return n}return 0}function ED(e,t,n){if(n){if(t.exportAs)for(let a=0;a<t.exportAs.length;a++)n[t.exportAs[a]]=e;kn(t)&&(n[""]=e)}}function CD(e,t,n){e.flags|=1,e.directiveStart=t,e.directiveEnd=t+n,e.providerIndexes=t}function yp(e,t,n,a,o,r,i,s){let c=t[w],l=c.consts,d=zn(l,i),u=go(c,e,n,a,d);return r&&Dv(c,t,u,zn(l,s),o),u.mergedAttrs=lo(u.mergedAttrs,u.attrs),u.attrs!==null&&As(u,u.attrs,!1),u.mergedAttrs!==null&&As(u,u.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,u),u}function bp(e,t){bg(e,t),Cd(t)&&e.queries.elementEnd(t)}function _D(e,t,n,a,o,r){let i=t.consts,s=zn(i,o),c=go(t,e,n,a,s);if(c.mergedAttrs=lo(c.mergedAttrs,c.attrs),r!=null){let l=zn(i,r);c.localNames=[];for(let d=0;d<l.length;d+=2)c.localNames.push(l[d],-1)}return c.attrs!==null&&As(c,c.attrs,!1),c.mergedAttrs!==null&&As(c,c.mergedAttrs,!0),t.queries!==null&&t.queries.elementStart(t,c),c}function Ep(e){return Ys(e)?Array.isArray(e)||!(e instanceof Map)&&Symbol.iterator in e:!1}function Sv(e,t){if(Array.isArray(e))for(let n=0;n<e.length;n++)t(e[n]);else{let n=e[Symbol.iterator](),a;for(;!(a=n.next()).done;)t(a.value)}}function Ys(e){return e!==null&&(typeof e=="function"||typeof e=="object")}function DD(e,t,n){return e[t]=n}function Ot(e,t,n){if(n===cn)return!1;let a=e[t];return Object.is(a,n)?!1:(e[t]=n,!0)}function ID(e,t,n,a){let o=Ot(e,t,n);return Ot(e,t+1,a)||o}function Kd(e,t,n){return function a(o){let r=At(e)?rn(e.index,t):t;hp(r,5);let i=t[xe],s=tg(t,i,n,o),c=a.__ngNextListenerFn__;for(;c;)s=tg(t,i,c,o)&&s,c=c.__ngNextListenerFn__;return s}}function tg(e,t,n,a){let o=P(null);try{return X(6,t,n),n(a)!==!1}catch(r){return z_(e,r),!1}finally{X(7,t,n),P(o)}}function SD(e,t,n,a,o,r,i,s){let c=no(e),l=!1,d=null;if(!a&&c&&(d=MD(t,n,r,e.index)),d!==null){let u=d.__ngLastListenerFn__||d;u.__ngNextListenerFn__=i,d.__ngLastListenerFn__=i,l=!0}else{let u=gn(e,n),f=a?a(u):u;_C(n,f,r,s);let m=o.listen(f,r,s),E=a?T=>a(on(T[e.index])):e.index;Mv(E,t,n,r,s,m,!1)}return l}function MD(e,t,n,a){let o=e.cleanup;if(o!=null)for(let r=0;r<o.length-1;r+=2){let i=o[r];if(i===n&&o[r+1]===a){let s=t[Xa],c=o[r+2];return s&&s.length>c?s[c]:null}typeof i=="string"&&(r+=2)}return null}function Mv(e,t,n,a,o,r,i){let s=t.firstCreatePass?Ad(t):null,c=wd(n),l=c.length;c.push(o,r),s&&s.push(a,e,l,(l+1)*(i?-1:1))}function ag(e,t,n,a,o,r){let i=t[n],s=t[w],l=s.data[n].outputs[a],u=i[l].subscribe(r);Mv(e.index,s,t,o,r,u,!0)}var Su=Symbol("BINDING");var Rs=class extends Mr{ngModule;constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){let n=jn(t);return new Lt(n,this.ngModule)}};function TD(e){return Object.keys(e).map(t=>{let[n,a,o]=e[t],r={propName:n,templateName:t,isSignal:(a&$s.SignalBased)!==0};return o&&(r.transform=o),r})}function xD(e){return Object.keys(e).map(t=>({propName:e[t],templateName:t}))}function wD(e,t,n){let a=t instanceof se?t:t?.injector;return a&&e.getStandaloneInjector!==null&&(a=e.getStandaloneInjector(a)||a),a?new Iu(n,a):n}function AD(e){let t=e.get(it,null);if(t===null)throw new D(407,!1);let n=e.get(_v,null),a=e.get(Pn,null);return{rendererFactory:t,sanitizer:n,changeDetectionScheduler:a,ngReflect:!1}}function RD(e,t){let n=Tv(e);return Kg(t,n,n==="svg"?_d:n==="math"?hh:null)}function Tv(e){return(e.selectors[0][0]||"div").toLowerCase()}var Lt=class extends Qs{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=TD(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=xD(this.componentDef.outputs),this.cachedOutputs}constructor(t,n){super(),this.componentDef=t,this.ngModule=n,this.componentType=t.type,this.selector=a_(t.selectors),this.ngContentSelectors=t.ngContentSelectors??[],this.isBoundToModule=!!n}create(t,n,a,o,r,i){X(22);let s=P(null);try{let c=this.componentDef,l=PD(a,c,i,r),d=wD(c,o||this.ngModule,t),u=AD(d),f=u.rendererFactory.createRenderer(null,c),m=a?M_(f,a,c.encapsulation,d):RD(c,f),E=i?.some(og)||r?.some(j=>typeof j!="function"&&j.bindings.some(og)),T=np(null,l,null,512|nv(c),null,null,u,f,d,null,zg(m,d,!0));T[le]=m,ls(T);let U=null;try{let j=yp(le,T,2,"#host",()=>l.directiveRegistry,!0,0);m&&(ev(f,m,j),uo(m,T)),Ws(l,T,j),Uu(l,j,T),bp(l,j),n!==void 0&&jD(j,this.ngContentSelectors,n),U=rn(j.index,T),T[xe]=U[xe],pp(l,T,null)}catch(j){throw U!==null&&cu(U),cu(T),j}finally{X(23),ds()}return new Ps(this.componentType,T,!!E)}finally{P(s)}}};function PD(e,t,n,a){let o=e?["ng-version","20.3.0"]:o_(t.selectors[0]),r=null,i=null,s=0;if(n)for(let d of n)s+=d[Su].requiredVars,d.create&&(d.targetIdx=0,(r??=[]).push(d)),d.update&&(d.targetIdx=0,(i??=[]).push(d));if(a)for(let d=0;d<a.length;d++){let u=a[d];if(typeof u!="function")for(let f of u.bindings){s+=f[Su].requiredVars;let m=d+1;f.create&&(f.targetIdx=m,(r??=[]).push(f)),f.update&&(f.targetIdx=m,(i??=[]).push(f))}}let c=[t];if(a)for(let d of a){let u=typeof d=="function"?d:d.type,f=fd(u);c.push(f)}return ep(0,null,ND(r,i),1,s,c,null,null,null,[o],null)}function ND(e,t){return!e&&!t?null:n=>{if(n&1&&e)for(let a of e)a.create();if(n&2&&t)for(let a of t)a.update()}}function og(e){let t=e[Su].kind;return t==="input"||t==="twoWay"}var Ps=class extends Cv{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(t,n,a){super(),this._rootLView=n,this._hasInputBindings=a,this._tNode=sr(n[w],le),this.location=mo(this._tNode,n),this.instance=rn(this._tNode.index,n)[xe],this.hostView=this.changeDetectorRef=new jt(n,void 0),this.componentType=t}setInput(t,n){this._hasInputBindings;let a=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(t)&&Object.is(this.previousInputValues.get(t),n))return;let o=this._rootLView,r=up(a,o[w],o,t,n);this.previousInputValues.set(t,n);let i=rn(a.index,o);hp(i,1)}get injector(){return new ga(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}};function jD(e,t,n){let a=e.projection=[];for(let o=0;o<t.length;o++){let r=n[o];a.push(r!=null&&r.length?Array.from(r):null)}}var Ke=(()=>{class e{static __NG_ELEMENT_ID__=OD}return e})();function OD(){let e=Ie();return wv(e,q())}var LD=Ke,xv=class extends LD{_lContainer;_hostTNode;_hostLView;constructor(t,n,a){super(),this._lContainer=t,this._hostTNode=n,this._hostLView=a}get element(){return mo(this._hostTNode,this._hostLView)}get injector(){return new ga(this._hostTNode,this._hostLView)}get parentInjector(){let t=zu(this._hostTNode,this._hostLView);if(_g(t)){let n=Is(t,this._hostLView),a=Ds(t),o=n[w].data[a+8];return new ga(o,n)}else return new ga(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){let n=rg(this._lContainer);return n!==null&&n[t]||null}get length(){return this._lContainer.length-Pe}createEmbeddedView(t,n,a){let o,r;typeof a=="number"?o=a:a!=null&&(o=a.index,r=a.injector);let i=_u(this._lContainer,t.ssrId),s=t.createEmbeddedViewImpl(n||{},r,i);return this.insertImpl(s,o,xs(this._hostTNode,i)),s}createComponent(t,n,a,o,r,i,s){let c=t&&!WE(t),l;if(c)l=n;else{let U=n||{};l=U.index,a=U.injector,o=U.projectableNodes,r=U.environmentInjector||U.ngModuleRef,i=U.directives,s=U.bindings}let d=c?t:new Lt(jn(t)),u=a||this.parentInjector;if(!r&&d.ngModule==null){let j=(c?u:this.parentInjector).get(se,null);j&&(r=j)}let f=jn(d.componentType??{}),m=_u(this._lContainer,f?.id??null),E=m?.firstChild??null,T=d.create(u,o,E,r,i,s);return this.insertImpl(T.hostView,l,xs(this._hostTNode,m)),T}insert(t,n){return this.insertImpl(t,n,!0)}insertImpl(t,n,a){let o=t._lView;if(vh(o)){let s=this.indexOf(t);if(s!==-1)this.detach(s);else{let c=o[De],l=new xv(c,c[Ve],c[De]);l.detach(l.indexOf(t))}}let r=this._adjustIndex(n),i=this._lContainer;return gp(i,o,r,a),t.attachToViewContainerRef(),dd(Xd(i),r,t),t}move(t,n){return this.insert(t,n)}indexOf(t){let n=rg(this._lContainer);return n!==null?n.indexOf(t):-1}remove(t){let n=this._adjustIndex(t,-1),a=ws(this._lContainer,n);a&&(ar(Xd(this._lContainer),n),rp(a[w],a))}detach(t){let n=this._adjustIndex(t,-1),a=ws(this._lContainer,n);return a&&ar(Xd(this._lContainer),n)!=null?new jt(a):null}_adjustIndex(t,n=0){return t??this.length+n}};function rg(e){return e[ir]}function Xd(e){return e[ir]||(e[ir]=[])}function wv(e,t){let n,a=t[e.index];return hn(a)?n=a:(n=bv(a,t,null,e),t[e.index]=n,tp(t,n)),kD(n,t,e,a),new xv(n,e,t)}function FD(e,t){let n=e[ce],a=n.createComment(""),o=gn(t,e),r=n.parentNode(o);return Ts(n,r,a,n.nextSibling(o),!1),a}var kD=BD,zD=()=>!1;function qD(e,t,n){return zD(e,t,n)}function BD(e,t,n,a){if(e[wt])return;let o;n.type&8?o=on(a):o=FD(t,n),e[wt]=o}var Mu=class e{queryList;matches=null;constructor(t){this.queryList=t}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},Tu=class e{queries;constructor(t=[]){this.queries=t}createEmbeddedView(t){let n=t.queries;if(n!==null){let a=t.contentQueries!==null?t.contentQueries[0]:n.length,o=[];for(let r=0;r<a;r++){let i=n.getByIndex(r),s=this.queries[i.indexInDeclarationView];o.push(s.clone())}return new e(o)}return null}insertView(t){this.dirtyQueriesWithMatches(t)}detachView(t){this.dirtyQueriesWithMatches(t)}finishViewCreation(t){this.dirtyQueriesWithMatches(t)}dirtyQueriesWithMatches(t){for(let n=0;n<this.queries.length;n++)Cp(t,n).matches!==null&&this.queries[n].setDirty()}},Ns=class{flags;read;predicate;constructor(t,n,a=null){this.flags=n,this.read=a,typeof t=="string"?this.predicate=QD(t):this.predicate=t}},xu=class e{queries;constructor(t=[]){this.queries=t}elementStart(t,n){for(let a=0;a<this.queries.length;a++)this.queries[a].elementStart(t,n)}elementEnd(t){for(let n=0;n<this.queries.length;n++)this.queries[n].elementEnd(t)}embeddedTView(t){let n=null;for(let a=0;a<this.length;a++){let o=n!==null?n.length:0,r=this.getByIndex(a).embeddedTView(t,o);r&&(r.indexInDeclarationView=a,n!==null?n.push(r):n=[r])}return n!==null?new e(n):null}template(t,n){for(let a=0;a<this.queries.length;a++)this.queries[a].template(t,n)}getByIndex(t){return this.queries[t]}get length(){return this.queries.length}track(t){this.queries.push(t)}},wu=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(t,n=-1){this.metadata=t,this._declarationNodeIndex=n}elementStart(t,n){this.isApplyingToNode(n)&&this.matchTNode(t,n)}elementEnd(t){this._declarationNodeIndex===t.index&&(this._appliesToNextNode=!1)}template(t,n){this.elementStart(t,n)}embeddedTView(t,n){return this.isApplyingToNode(t)?(this.crossesNgTemplate=!0,this.addMatch(-t.index,n),new e(this.metadata)):null}isApplyingToNode(t){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let n=this._declarationNodeIndex,a=t.parent;for(;a!==null&&a.type&8&&a.index!==n;)a=a.parent;return n===(a!==null?a.index:-1)}return this._appliesToNextNode}matchTNode(t,n){let a=this.metadata.predicate;if(Array.isArray(a))for(let o=0;o<a.length;o++){let r=a[o];this.matchTNodeWithReadOption(t,n,VD(n,r)),this.matchTNodeWithReadOption(t,n,Es(n,t,r,!1,!1))}else a===Cn?n.type&4&&this.matchTNodeWithReadOption(t,n,-1):this.matchTNodeWithReadOption(t,n,Es(n,t,a,!1,!1))}matchTNodeWithReadOption(t,n,a){if(a!==null){let o=this.metadata.read;if(o!==null)if(o===de||o===Ke||o===Cn&&n.type&4)this.addMatch(n.index,-2);else{let r=Es(n,t,o,!1,!1);r!==null&&this.addMatch(n.index,r)}else this.addMatch(n.index,a)}}addMatch(t,n){this.matches===null?this.matches=[t,n]:this.matches.push(t,n)}};function VD(e,t){let n=e.localNames;if(n!==null){for(let a=0;a<n.length;a+=2)if(n[a]===t)return n[a+1]}return null}function UD(e,t){return e.type&11?mo(e,t):e.type&4?Js(e,t):null}function HD(e,t,n,a){return n===-1?UD(t,e):n===-2?$D(e,t,a):vr(e,e[w],n,t)}function $D(e,t,n){if(n===de)return mo(t,e);if(n===Cn)return Js(t,e);if(n===Ke)return wv(t,e)}function Av(e,t,n,a){let o=t[Ln].queries[a];if(o.matches===null){let r=e.data,i=n.matches,s=[];for(let c=0;i!==null&&c<i.length;c+=2){let l=i[c];if(l<0)s.push(null);else{let d=r[l];s.push(HD(t,d,i[c+1],n.metadata.read))}}o.matches=s}return o.matches}function Au(e,t,n,a){let o=e.queries.getByIndex(n),r=o.matches;if(r!==null){let i=Av(e,t,o,n);for(let s=0;s<r.length;s+=2){let c=r[s];if(c>0)a.push(i[s/2]);else{let l=r[s+1],d=t[-c];for(let u=Pe;u<d.length;u++){let f=d[u];f[xt]===f[De]&&Au(f[w],f,l,a)}if(d[ma]!==null){let u=d[ma];for(let f=0;f<u.length;f++){let m=u[f];Au(m[w],m,l,a)}}}}}return a}function GD(e,t){return e[Ln].queries[t].queryList}function Rv(e,t,n){let a=new at((n&4)===4);return Eh(e,t,a,a.destroy),(t[Ln]??=new Tu).queries.push(new Mu(a))-1}function WD(e,t,n){let a=ye();return a.firstCreatePass&&(Pv(a,new Ns(e,t,n),-1),(t&2)===2&&(a.staticViewQueries=!0)),Rv(a,q(),t)}function JD(e,t,n,a){let o=ye();if(o.firstCreatePass){let r=Ie();Pv(o,new Ns(t,n,a),r.index),YD(o,e),(n&2)===2&&(o.staticContentQueries=!0)}return Rv(o,q(),n)}function QD(e){return e.split(",").map(t=>t.trim())}function Pv(e,t,n){e.queries===null&&(e.queries=new xu),e.queries.track(new wu(t,n))}function YD(e,t){let n=e.contentQueries||(e.contentQueries=[]),a=n.length?n[n.length-1]:-1;t!==a&&n.push(e.queries.length-1,t)}function Cp(e,t){return e.queries.getByIndex(t)}function ZD(e,t){let n=e[w],a=Cp(n,t);return a.crossesNgTemplate?Au(n,e,t,[]):Av(n,e,a,t)}var ig=new Set;function dt(e){ig.has(e)||(ig.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}var st=class{},Zs=class{};var js=class extends st{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new Rs(this);constructor(t,n,a,o=!0){super(),this.ngModuleType=t,this._parent=n;let r=md(t);this._bootstrapComponents=Qg(r.bootstrap),this._r3Injector=$d(t,n,[{provide:st,useValue:this},{provide:Mr,useValue:this.componentFactoryResolver},...a],Xn(t),new Set(["environment"])),o&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(n=>n()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}},Os=class extends Zs{moduleType;constructor(t){super(),this.moduleType=t}create(t){return new js(this.moduleType,t,[])}};var br=class extends st{injector;componentFactoryResolver=new Rs(this);instance=null;constructor(t){super();let n=new ia([...t.providers,{provide:st,useValue:this},{provide:Mr,useValue:this.componentFactoryResolver}],t.parent||Za(),t.debugName,new Set(["environment"]));this.injector=n,t.runEnvironmentInitializers&&n.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(t){this.injector.onDestroy(t)}};function vo(e,t,n=null){return new br({providers:e,parent:t,debugName:n,runEnvironmentInitializers:!0}).injector}var KD=(()=>{class e{_injector;cachedInjectors=new Map;constructor(n){this._injector=n}getOrCreateStandaloneInjector(n){if(!n.standalone)return null;if(!this.cachedInjectors.has(n)){let a=hd(!1,n.type),o=a.length>0?vo([a],this._injector,`Standalone[${n.type.name}]`):null;this.cachedInjectors.set(n,o)}return this.cachedInjectors.get(n)}ngOnDestroy(){try{for(let n of this.cachedInjectors.values())n!==null&&n.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=b({token:e,providedIn:"environment",factory:()=>new e(M(se))})}return e})();function me(e){return Cr(()=>{let t=Nv(e),n=J(_({},t),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection===qu.OnPush,directiveDefs:null,pipeDefs:null,dependencies:t.standalone&&e.dependencies||null,getStandaloneInjector:t.standalone?o=>o.get(KD).getOrCreateStandaloneInjector(n):null,getExternalStyles:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||ot.Emulated,styles:e.styles||qe,_:null,schemas:e.schemas||null,tView:null,id:""});t.standalone&&dt("NgStandalone"),jv(n);let a=e.dependencies;return n.directiveDefs=sg(a,XD),n.pipeDefs=sg(a,dh),n.id=tI(n),n})}function XD(e){return jn(e)||fd(e)}function ue(e){return Cr(()=>({type:e.type,bootstrap:e.bootstrap||qe,declarations:e.declarations||qe,imports:e.imports||qe,exports:e.exports||qe,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function eI(e,t){if(e==null)return Tt;let n={};for(let a in e)if(e.hasOwnProperty(a)){let o=e[a],r,i,s,c;Array.isArray(o)?(s=o[0],r=o[1],i=o[2]??r,c=o[3]||null):(r=o,i=o,s=$s.None,c=null),n[r]=[a,s,c],t[r]=i}return n}function nI(e){if(e==null)return Tt;let t={};for(let n in e)e.hasOwnProperty(n)&&(t[e[n]]=n);return t}function he(e){return Cr(()=>{let t=Nv(e);return jv(t),t})}function Ks(e){return{type:e.type,name:e.name,factory:null,pure:e.pure!==!1,standalone:e.standalone??!0,onDestroy:e.type.prototype.ngOnDestroy||null}}function Nv(e){let t={};return{type:e.type,providersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:t,inputConfig:e.inputs||Tt,exportAs:e.exportAs||null,standalone:e.standalone??!0,signals:e.signals===!0,selectors:e.selectors||qe,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,inputs:eI(e.inputs,t),outputs:nI(e.outputs),debugInfo:null}}function jv(e){e.features?.forEach(t=>t(e))}function sg(e,t){return e?()=>{let n=typeof e=="function"?e():e,a=[];for(let o of n){let r=t(o);r!==null&&a.push(r)}return a}:null}function tI(e){let t=0,n=typeof e.consts=="function"?"":e.consts,a=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,n,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let r of a.join("|"))t=Math.imul(31,t)+r.charCodeAt(0)<<0;return t+=2147483648,"c"+t}function aI(e){return Object.getPrototypeOf(e.prototype).constructor}function Ea(e){let t=aI(e.type),n=!0,a=[e];for(;t;){let o;if(kn(e))o=t.\u0275cmp||t.\u0275dir;else{if(t.\u0275cmp)throw new D(903,!1);o=t.\u0275dir}if(o){if(n){a.push(o);let i=e;i.inputs=eu(e.inputs),i.declaredInputs=eu(e.declaredInputs),i.outputs=eu(e.outputs);let s=o.hostBindings;s&&cI(e,s);let c=o.viewQuery,l=o.contentQueries;if(c&&iI(e,c),l&&sI(e,l),oI(e,o),nh(e.outputs,o.outputs),kn(o)&&o.data.animation){let d=e.data;d.animation=(d.animation||[]).concat(o.data.animation)}}let r=o.features;if(r)for(let i=0;i<r.length;i++){let s=r[i];s&&s.ngInherit&&s(e),s===Ea&&(n=!1)}}t=Object.getPrototypeOf(t)}rI(a)}function oI(e,t){for(let n in t.inputs){if(!t.inputs.hasOwnProperty(n)||e.inputs.hasOwnProperty(n))continue;let a=t.inputs[n];a!==void 0&&(e.inputs[n]=a,e.declaredInputs[n]=t.declaredInputs[n])}}function rI(e){let t=0,n=null;for(let a=e.length-1;a>=0;a--){let o=e[a];o.hostVars=t+=o.hostVars,o.hostAttrs=lo(o.hostAttrs,n=lo(n,o.hostAttrs))}}function eu(e){return e===Tt?{}:e===qe?[]:e}function iI(e,t){let n=e.viewQuery;n?e.viewQuery=(a,o)=>{t(a,o),n(a,o)}:e.viewQuery=t}function sI(e,t){let n=e.contentQueries;n?e.contentQueries=(a,o,r)=>{t(a,o,r),n(a,o,r)}:e.contentQueries=t}function cI(e,t){let n=e.hostBindings;n?e.hostBindings=(a,o)=>{t(a,o),n(a,o)}:e.hostBindings=t}function Ov(e,t,n,a,o,r,i,s){if(n.firstCreatePass){e.mergedAttrs=lo(e.mergedAttrs,e.attrs);let d=e.tView=ep(2,e,o,r,i,n.directiveRegistry,n.pipeRegistry,null,n.schemas,n.consts,null);n.queries!==null&&(n.queries.template(n,e),d.queries=n.queries.embeddedTView(e))}s&&(e.flags|=s),ao(e,!1);let c=dI(n,t,e,a);ps()&&ip(n,t,c,e),uo(c,t);let l=bv(c,t,c,e);t[a+le]=l,tp(t,l),qD(l,e,t)}function lI(e,t,n,a,o,r,i,s,c,l,d){let u=n+le,f;return t.firstCreatePass?(f=go(t,u,4,i||null,s||null),is()&&Dv(t,e,f,zn(t.consts,l),cp),bg(t,f)):f=t.data[u],Ov(f,e,t,n,a,o,r,c),no(f)&&Ws(t,e,f),l!=null&&Sr(e,f,d),f}function _p(e,t,n,a,o,r,i,s,c,l,d){let u=n+le,f;if(t.firstCreatePass){if(f=go(t,u,4,i||null,s||null),l!=null){let m=zn(t.consts,l);f.localNames=[];for(let E=0;E<m.length;E+=2)f.localNames.push(m[E],-1)}}else f=t.data[u];return Ov(f,e,t,n,a,o,r,c),l!=null&&Sr(e,f,d),f}function O(e,t,n,a,o,r,i,s){let c=q(),l=ye(),d=zn(l.consts,r);return lI(c,l,e,t,n,a,o,d,void 0,i,s),O}var dI=uI;function uI(e,t,n,a){return ur(!0),t[ce].createComment("")}var Xs=(function(e){return e[e.CHANGE_DETECTION=0]="CHANGE_DETECTION",e[e.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",e})(Xs||{}),Ca=new I(""),Lv=!1,Ru=class extends H{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(t=!1){super(),this.__isAsync=t,yd()&&(this.destroyRef=p(vn,{optional:!0})??void 0,this.pendingTasks=p(tt,{optional:!0})??void 0)}emit(t){let n=P(null);try{super.next(t)}finally{P(n)}}subscribe(t,n,a){let o=t,r=n||(()=>null),i=a;if(t&&typeof t=="object"){let c=t;o=c.next?.bind(c),r=c.error?.bind(c),i=c.complete?.bind(c)}this.__isAsync&&(r=this.wrapInTimeout(r),o&&(o=this.wrapInTimeout(o)),i&&(i=this.wrapInTimeout(i)));let s=super.subscribe({next:o,error:r,complete:i});return t instanceof Z&&t.add(s),s}wrapInTimeout(t){return n=>{let a=this.pendingTasks?.add();setTimeout(()=>{try{t(n)}finally{a!==void 0&&this.pendingTasks?.remove(a)}})}}},ee=Ru;function Fv(e){let t,n;function a(){e=ha;try{n!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(n),t!==void 0&&clearTimeout(t)}catch{}}return t=setTimeout(()=>{e(),a()}),typeof requestAnimationFrame=="function"&&(n=requestAnimationFrame(()=>{e(),a()})),()=>a()}function cg(e){return queueMicrotask(()=>e()),()=>{e=ha}}var Dp="isAngularZone",Ls=Dp+"_ID",pI=0,G=class e{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new ee(!1);onMicrotaskEmpty=new ee(!1);onStable=new ee(!1);onError=new ee(!1);constructor(t){let{enableLongStackTrace:n=!1,shouldCoalesceEventChangeDetection:a=!1,shouldCoalesceRunChangeDetection:o=!1,scheduleInRootZone:r=Lv}=t;if(typeof Zone>"u")throw new D(908,!1);Zone.assertZonePatched();let i=this;i._nesting=0,i._outer=i._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(i._inner=i._inner.fork(new Zone.TaskTrackingZoneSpec)),n&&Zone.longStackTraceZoneSpec&&(i._inner=i._inner.fork(Zone.longStackTraceZoneSpec)),i.shouldCoalesceEventChangeDetection=!o&&a,i.shouldCoalesceRunChangeDetection=o,i.callbackScheduled=!1,i.scheduleInRootZone=r,hI(i)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Dp)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new D(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new D(909,!1)}run(t,n,a){return this._inner.run(t,n,a)}runTask(t,n,a,o){let r=this._inner,i=r.scheduleEventTask("NgZoneEvent: "+o,t,mI,ha,ha);try{return r.runTask(i,n,a)}finally{r.cancelTask(i)}}runGuarded(t,n,a){return this._inner.runGuarded(t,n,a)}runOutsideAngular(t){return this._outer.run(t)}},mI={};function Ip(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function fI(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function t(){Fv(()=>{e.callbackScheduled=!1,Pu(e),e.isCheckStableRunning=!0,Ip(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{t()}):e._outer.run(()=>{t()}),Pu(e)}function hI(e){let t=()=>{fI(e)},n=pI++;e._inner=e._inner.fork({name:"angular",properties:{[Dp]:!0,[Ls]:n,[Ls+n]:!0},onInvokeTask:(a,o,r,i,s,c)=>{if(gI(c))return a.invokeTask(r,i,s,c);try{return lg(e),a.invokeTask(r,i,s,c)}finally{(e.shouldCoalesceEventChangeDetection&&i.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&t(),dg(e)}},onInvoke:(a,o,r,i,s,c,l)=>{try{return lg(e),a.invoke(r,i,s,c,l)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!vI(c)&&t(),dg(e)}},onHasTask:(a,o,r,i)=>{a.hasTask(r,i),o===r&&(i.change=="microTask"?(e._hasPendingMicrotasks=i.microTask,Pu(e),Ip(e)):i.change=="macroTask"&&(e.hasPendingMacrotasks=i.macroTask))},onHandleError:(a,o,r,i)=>(a.handleError(r,i),e.runOutsideAngular(()=>e.onError.emit(i)),!1)})}function Pu(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function lg(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function dg(e){e._nesting--,Ip(e)}var Fs=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new ee;onMicrotaskEmpty=new ee;onStable=new ee;onError=new ee;run(t,n,a){return t.apply(n,a)}runGuarded(t,n,a){return t.apply(n,a)}runOutsideAngular(t){return t()}runTask(t,n,a,o){return t.apply(n,a)}};function gI(e){return kv(e,"__ignore_ng_zone__")}function vI(e){return kv(e,"__scheduler_tick__")}function kv(e,t){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[t]===!0}var Sp=(()=>{class e{impl=null;execute(){this.impl?.execute()}static \u0275prov=b({token:e,providedIn:"root",factory:()=>new e})}return e})(),zv=[0,1,2,3],qv=(()=>{class e{ngZone=p(G);scheduler=p(Pn);errorHandler=p(Me,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){p(Ca,{optional:!0})}execute(){let n=this.sequences.size>0;n&&X(16),this.executing=!0;for(let a of zv)for(let o of this.sequences)if(!(o.erroredOrDestroyed||!o.hooks[a]))try{o.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let r=o.hooks[a];return r(o.pipelinedValue)},o.snapshot))}catch(r){o.erroredOrDestroyed=!0,this.errorHandler?.handleError(r)}this.executing=!1;for(let a of this.sequences)a.afterRun(),a.once&&(this.sequences.delete(a),a.destroy());for(let a of this.deferredRegistrations)this.sequences.add(a);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),n&&X(17)}register(n){let{view:a}=n;a!==void 0?((a[pa]??=[]).push(n),Rt(a),a[R]|=8192):this.executing?this.deferredRegistrations.add(n):this.addSequence(n)}addSequence(n){this.sequences.add(n),this.scheduler.notify(7)}unregister(n){this.executing&&this.sequences.has(n)?(n.erroredOrDestroyed=!0,n.pipelinedValue=void 0,n.once=!0):(this.sequences.delete(n),this.deferredRegistrations.delete(n))}maybeTrace(n,a){return a?a.run(Xs.AFTER_NEXT_RENDER,n):n()}static \u0275prov=b({token:e,providedIn:"root",factory:()=>new e})}return e})(),ks=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(t,n,a,o,r,i=null){this.impl=t,this.hooks=n,this.view=a,this.once=o,this.snapshot=i,this.unregisterOnDestroy=r?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let t=this.view?.[pa];t&&(this.view[pa]=t.filter(n=>n!==this))}};function ec(e,t){let n=t?.injector??p(ve);return dt("NgAfterNextRender"),bI(e,n,t,!0)}function yI(e){return e instanceof Function?[void 0,void 0,e,void 0]:[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function bI(e,t,n,a){let o=t.get(Sp);o.impl??=t.get(qv);let r=t.get(Ca,null,{optional:!0}),i=n?.manualCleanup!==!0?t.get(vn):null,s=t.get(io,null,{optional:!0}),c=new ks(o.impl,yI(e),s?.view,a,i,r?.snapshot(null));return o.impl.register(c),c}var nc=(()=>{class e{log(n){console.log(n)}warn(n){console.warn(n)}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"platform"})}return e})();var tc=new I(""),yo=new I(""),Tr=(()=>{class e{_ngZone;registry;_isZoneStable=!0;_callbacks=[];_taskTrackingZone=null;_destroyRef;constructor(n,a,o){this._ngZone=n,this.registry=a,yd()&&(this._destroyRef=p(vn,{optional:!0})??void 0),Mp||(Bv(o),o.addToWindow(a)),this._watchAngularEvents(),n.run(()=>{this._taskTrackingZone=typeof Zone>"u"?null:Zone.current.get("TaskTrackingZone")})}_watchAngularEvents(){let n=this._ngZone.onUnstable.subscribe({next:()=>{this._isZoneStable=!1}}),a=this._ngZone.runOutsideAngular(()=>this._ngZone.onStable.subscribe({next:()=>{G.assertNotInAngularZone(),queueMicrotask(()=>{this._isZoneStable=!0,this._runCallbacksIfReady()})}}));this._destroyRef?.onDestroy(()=>{n.unsubscribe(),a.unsubscribe()})}isStable(){return this._isZoneStable&&!this._ngZone.hasPendingMacrotasks}_runCallbacksIfReady(){if(this.isStable())queueMicrotask(()=>{for(;this._callbacks.length!==0;){let n=this._callbacks.pop();clearTimeout(n.timeoutId),n.doneCb()}});else{let n=this.getPendingTasks();this._callbacks=this._callbacks.filter(a=>a.updateCb&&a.updateCb(n)?(clearTimeout(a.timeoutId),!1):!0)}}getPendingTasks(){return this._taskTrackingZone?this._taskTrackingZone.macroTasks.map(n=>({source:n.source,creationLocation:n.creationLocation,data:n.data})):[]}addCallback(n,a,o){let r=-1;a&&a>0&&(r=setTimeout(()=>{this._callbacks=this._callbacks.filter(i=>i.timeoutId!==r),n()},a)),this._callbacks.push({doneCb:n,timeoutId:r,updateCb:o})}whenStable(n,a,o){if(o&&!this._taskTrackingZone)throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');this.addCallback(n,a,o),this._runCallbacksIfReady()}registerApplication(n){this.registry.registerApplication(n,this)}unregisterApplication(n){this.registry.unregisterApplication(n)}findProviders(n,a,o){return[]}static \u0275fac=function(a){return new(a||e)(M(G),M(xr),M(yo))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),xr=(()=>{class e{_applications=new Map;registerApplication(n,a){this._applications.set(n,a)}unregisterApplication(n){this._applications.delete(n)}unregisterAllApplications(){this._applications.clear()}getTestability(n){return this._applications.get(n)||null}getAllTestabilities(){return Array.from(this._applications.values())}getAllRootElements(){return Array.from(this._applications.keys())}findTestabilityInTree(n,a=!0){return Mp?.findTestabilityInTree(this,n,a)??null}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"platform"})}return e})();function Bv(e){Mp=e}var Mp;function bo(e){return!!e&&typeof e.then=="function"}function Tp(e){return!!e&&typeof e.subscribe=="function"}var xp=new I("");function ac(e){return ca([{provide:xp,multi:!0,useValue:e}])}var wp=(()=>{class e{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((n,a)=>{this.resolve=n,this.reject=a});appInits=p(xp,{optional:!0})??[];injector=p(ve);constructor(){}runInitializers(){if(this.initialized)return;let n=[];for(let o of this.appInits){let r=Te(this.injector,o);if(bo(r))n.push(r);else if(Tp(r)){let i=new Promise((s,c)=>{r.subscribe({complete:s,error:c})});n.push(i)}}let a=()=>{this.done=!0,this.resolve()};Promise.all(n).then(()=>{a()}).catch(o=>{this.reject(o)}),n.length===0&&a(),this.initialized=!0}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),wr=new I("");function Vv(){Cl(()=>{let e="";throw new D(600,e)})}function Uv(e){return e.isBoundToModule}var EI=10;var Dn=(()=>{class e{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=p(Ze);afterRenderManager=p(Sp);zonelessEnabled=p(mr);rootEffectScheduler=p(fr);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new H;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=p(tt);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(A(n=>!n))}constructor(){p(Ca,{optional:!0})}whenStable(){let n;return new Promise(a=>{n=this.isStable.subscribe({next:o=>{o&&a()}})}).finally(()=>{n.unsubscribe()})}_injector=p(se);_rendererFactory=null;get injector(){return this._injector}bootstrap(n,a){return this.bootstrapImpl(n,a)}bootstrapImpl(n,a,o=ve.NULL){return this._injector.get(G).run(()=>{X(10);let i=n instanceof Qs;if(!this._injector.get(wp).done){let E="";throw new D(405,E)}let c;i?c=n:c=this._injector.get(Mr).resolveComponentFactory(n),this.componentTypes.push(c.componentType);let l=Uv(c)?void 0:this._injector.get(st),d=a||c.selector,u=c.create(o,[],d,l),f=u.location.nativeElement,m=u.injector.get(tc,null);return m?.registerApplication(f),u.onDestroy(()=>{this.detachView(u.hostView),gr(this.components,u),m?.unregisterApplication(f)}),this._loadComponent(u),X(11,u),u})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){X(12),this.tracingSnapshot!==null?this.tracingSnapshot.run(Xs.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw new D(101,!1);let n=P(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,P(n),this.afterTick.next(),X(13)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(it,null,{optional:!0}));let n=0;for(;this.dirtyFlags!==0&&n++<EI;)X(14),this.synchronizeOnce(),X(15)}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let n=!1;if(this.dirtyFlags&7){let a=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:o}of this.allViews){if(!a&&!cr(o))continue;let r=a&&!this.zonelessEnabled?0:1;fp(o,r),n=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}n||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:n})=>cr(n))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(n){let a=n;this._views.push(a),a.attachToAppRef(this)}detachView(n){let a=n;gr(this._views,a),a.detachFromAppRef()}_loadComponent(n){this.attachView(n.hostView);try{this.tick()}catch(o){this.internalErrorHandler(o)}this.components.push(n),this._injector.get(wr,[]).forEach(o=>o(n))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(n=>n()),this._views.slice().forEach(n=>n.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(n){return this._destroyListeners.push(n),()=>gr(this._destroyListeners,n)}destroy(){if(this._destroyed)throw new D(406,!1);let n=this._injector;n.destroy&&!n.destroyed&&n.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function gr(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}function Ee(e,t,n,a){let o=q(),r=dr();if(Ot(o,r,t)){let i=ye(),s=Hd();L_(s,o,e,t,n,a)}return Ee}var Ap=new I("",{providedIn:"root",factory:()=>!1}),Rp=new I("",{providedIn:"root",factory:()=>CI}),CI=4e3;var kL=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";function Pp(e,t,n,a,o,r,i,s){dt("NgControlFlow");let c=q(),l=ye(),d=zn(l.consts,r);return _p(c,l,e,t,n,a,o,d,256,i,s),Np}function Np(e,t,n,a,o,r,i,s){dt("NgControlFlow");let c=q(),l=ye(),d=zn(l.consts,r);return _p(c,l,e,t,n,a,o,d,512,i,s),Np}function jp(e,t){dt("NgControlFlow");let n=q(),a=dr(),o=n[a]!==cn?n[a]:-1,r=o!==-1?ug(n,le+o):void 0,i=0;if(Ot(n,a,e)){let s=P(null);try{if(r!==void 0&&aD(r,i),e!==-1){let c=le+e,l=ug(n,c),d=_I(n[w],c),u=uD(l,d,n),f=mp(n,d,t,{dehydratedView:u});gp(l,f,i,xs(d,u))}}finally{P(s)}}else if(r!==void 0){let s=tD(r,i);s!==void 0&&(s[xe]=t)}}function ug(e,t){return e[t]}function _I(e,t){return sr(e,t)}function C(e,t,n){let a=q(),o=dr();if(Ot(a,o,t)){let r=ye(),i=Hd();A_(i,a,e,t,a[ce],n)}return C}function Nu(e,t,n,a,o){up(t,e,n,o?"class":"style",a)}function g(e,t,n,a){let o=q(),r=o[w],i=e+le,s=r.firstCreatePass?yp(i,o,2,t,cp,is(),n,a):r.data[i];if(lp(s,o,e,t,Hv),no(s)){let c=o[w];Ws(c,o,s),Uu(c,s,o)}return a!=null&&Sr(o,s),g}function h(){let e=ye(),t=Ie(),n=dp(t);return e.firstCreatePass&&bp(e,n),Nd(n)&&jd(),Rd(),n.classesWithoutHost!=null&&XE(n)&&Nu(e,n,q(),n.classesWithoutHost,!0),n.stylesWithoutHost!=null&&eC(n)&&Nu(e,n,q(),n.stylesWithoutHost,!1),h}function te(e,t,n,a){return g(e,t,n,a),h(),te}function ln(e,t,n,a){let o=q(),r=o[w],i=e+le,s=r.firstCreatePass?_D(i,r,2,t,n,a):r.data[i];return lp(s,o,e,t,Hv),a!=null&&Sr(o,s),ln}function In(){let e=Ie(),t=dp(e);return Nd(t)&&jd(),Rd(),In}function oc(e,t,n,a){return ln(e,t,n,a),In(),oc}var Hv=(e,t,n,a,o)=>(ur(!0),Kg(t[ce],a,Oh()));function zt(e,t,n){let a=q(),o=a[w],r=e+le,i=o.firstCreatePass?yp(r,a,8,"ng-container",cp,is(),t,n):o.data[r];if(lp(i,a,e,"ng-container",DI),no(i)){let s=a[w];Ws(s,a,i),Uu(s,i,a)}return n!=null&&Sr(a,i),zt}function qt(){let e=ye(),t=Ie(),n=dp(t);return e.firstCreatePass&&bp(e,n),qt}var DI=(e,t,n,a,o)=>(ur(!0),s_(t[ce],""));function Xe(){return q()}var Ar="en-US";var II=Ar;function $v(e){typeof e=="string"&&(II=e.toLowerCase().replace(/_/g,"-"))}function pe(e,t,n){let a=q(),o=ye(),r=Ie();return SI(o,a,a[ce],r,e,t,n),pe}function SI(e,t,n,a,o,r,i){let s=!0,c=null;if((a.type&3||i)&&(c??=Kd(a,t,r),SD(a,e,t,i,n,o,r,c)&&(s=!1)),s){let l=a.outputs?.[o],d=a.hostDirectiveOutputs?.[o];if(d&&d.length)for(let u=0;u<d.length;u+=2){let f=d[u],m=d[u+1];c??=Kd(a,t,r),ag(a,t,f,m,o,c)}if(l&&l.length)for(let u of l)c??=Kd(a,t,r),ag(a,t,u,o,o,c)}}function S(e=1){return jh(e)}function MI(e,t){let n=null,a=KC(e);for(let o=0;o<t.length;o++){let r=t[o];if(r==="*"){n=o;continue}if(a===null?Zg(e,r,!0):n_(a,r))return o}return n}function Eo(e){let t=q()[Ge][Ve];if(!t.projection){let n=e?e.length:1,a=t.projection=ch(n,null),o=a.slice(),r=t.child;for(;r!==null;){if(r.type!==128){let i=e?MI(r,e):0;i!==null&&(o[i]?o[i].projectionNext=r:a[i]=r,o[i]=r)}r=r.next}}}function Bn(e,t=0,n,a,o,r){let i=q(),s=ye(),c=a?e+1:null;c!==null&&_p(i,s,c,a,o,r,null,n);let l=go(s,le+e,16,null,n||null);l.projection===null&&(l.projection=t),Fd();let u=!i[Ka]||Pd();i[Ge][Ve].projection[l.projection]===null&&c!==null?TI(i,s,c):u&&!Us(l)&&D_(s,i,l)}function TI(e,t,n){let a=le+n,o=t.data[a],r=e[a],i=_u(r,o.tView.ssrId),s=mp(e,o,void 0,{dehydratedView:i});gp(r,s,0,xs(o,i))}function Rr(e,t,n,a){JD(e,t,n,a)}function rc(e,t,n){WD(e,t,n)}function _a(e){let t=q(),n=ye(),a=Bd();cs(a+1);let o=Cp(n,a);if(e.dirty&&gh(t)===((o.metadata.flags&2)===2)){if(o.matches===null)e.reset([]);else{let r=ZD(t,a);e.reset(r,mC),e.notifyOnChanges()}return!0}return!1}function Da(){return GD(q(),Bd())}function Co(e){let t=Ih();return Id(t,le+e)}function vs(e,t){return e<<17|t<<2}function ya(e){return e>>17&32767}function xI(e){return(e&2)==2}function wI(e,t){return e&131071|t<<17}function ju(e){return e|2}function po(e){return(e&131068)>>2}function nu(e,t){return e&-131069|t<<2}function AI(e){return(e&1)===1}function Ou(e){return e|1}function RI(e,t,n,a,o,r){let i=r?t.classBindings:t.styleBindings,s=ya(i),c=po(i);e[a]=n;let l=!1,d;if(Array.isArray(n)){let u=n;d=u[1],(d===null||Ya(u,d)>0)&&(l=!0)}else d=n;if(o)if(c!==0){let f=ya(e[s+1]);e[a+1]=vs(f,s),f!==0&&(e[f+1]=nu(e[f+1],a)),e[s+1]=wI(e[s+1],a)}else e[a+1]=vs(s,0),s!==0&&(e[s+1]=nu(e[s+1],a)),s=a;else e[a+1]=vs(c,0),s===0?s=a:e[c+1]=nu(e[c+1],a),c=a;l&&(e[a+1]=ju(e[a+1])),pg(e,d,a,!0),pg(e,d,a,!1),PI(t,d,e,a,r),i=vs(s,c),r?t.classBindings=i:t.styleBindings=i}function PI(e,t,n,a,o){let r=o?e.residualClasses:e.residualStyles;r!=null&&typeof t=="string"&&Ya(r,t)>=0&&(n[a+1]=Ou(n[a+1]))}function pg(e,t,n,a){let o=e[n+1],r=t===null,i=a?ya(o):po(o),s=!1;for(;i!==0&&(s===!1||r);){let c=e[i],l=e[i+1];NI(c,t)&&(s=!0,e[i+1]=a?Ou(l):ju(l)),i=a?ya(l):po(l)}s&&(e[n+1]=a?ju(o):Ou(o))}function NI(e,t){return e===null||t==null||(Array.isArray(e)?e[1]:e)===t?!0:Array.isArray(e)&&typeof t=="string"?Ya(e,t)>=0:!1}var bn={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function jI(e){return e.substring(bn.key,bn.keyEnd)}function OI(e){return LI(e),Gv(e,Wv(e,0,bn.textEnd))}function Gv(e,t){let n=bn.textEnd;return n===t?-1:(t=bn.keyEnd=FI(e,bn.key=t,n),Wv(e,t,n))}function LI(e){bn.key=0,bn.keyEnd=0,bn.value=0,bn.valueEnd=0,bn.textEnd=e.length}function Wv(e,t,n){for(;t<n&&e.charCodeAt(t)<=32;)t++;return t}function FI(e,t,n){for(;t<n&&e.charCodeAt(t)>32;)t++;return t}function ic(e,t,n){return Jv(e,t,n,!1),ic}function ge(e,t){return Jv(e,t,null,!0),ge}function Op(e){zI($I,kI,e,!0)}function kI(e,t){for(let n=OI(t);n>=0;n=Gv(t,n))es(e,jI(t),!0)}function Jv(e,t,n,a){let o=q(),r=ye(),i=qd(2);if(r.firstUpdatePass&&Yv(r,e,i,a),t!==cn&&Ot(o,i,t)){let s=r.data[Pt()];Zv(r,s,o,o[ce],e,o[i+1]=WI(t,n),a,i)}}function zI(e,t,n,a){let o=ye(),r=qd(2);o.firstUpdatePass&&Yv(o,null,r,a);let i=q();if(n!==cn&&Ot(i,r,n)){let s=o.data[Pt()];if(Kv(s,a)&&!Qv(o,r)){let c=a?s.classesWithoutHost:s.stylesWithoutHost;c!==null&&(n=Qi(c,n||"")),Nu(o,s,i,n,a)}else GI(o,s,i,i[ce],i[r+1],i[r+1]=HI(e,t,n),a,r)}}function Qv(e,t){return t>=e.expandoStartIndex}function Yv(e,t,n,a){let o=e.data;if(o[n+1]===null){let r=o[Pt()],i=Qv(e,n);Kv(r,a)&&t===null&&!i&&(t=!1),t=qI(o,r,t,a),RI(o,r,t,n,i,a)}}function qI(e,t,n,a){let o=Ah(e),r=a?t.residualClasses:t.residualStyles;if(o===null)(a?t.classBindings:t.styleBindings)===0&&(n=tu(null,e,t,n,a),n=Er(n,t.attrs,a),r=null);else{let i=t.directiveStylingLast;if(i===-1||e[i]!==o)if(n=tu(o,e,t,n,a),r===null){let c=BI(e,t,a);c!==void 0&&Array.isArray(c)&&(c=tu(null,e,t,c[1],a),c=Er(c,t.attrs,a),VI(e,t,a,c))}else r=UI(e,t,a)}return r!==void 0&&(a?t.residualClasses=r:t.residualStyles=r),n}function BI(e,t,n){let a=n?t.classBindings:t.styleBindings;if(po(a)!==0)return e[ya(a)]}function VI(e,t,n,a){let o=n?t.classBindings:t.styleBindings;e[ya(o)]=a}function UI(e,t,n){let a,o=t.directiveEnd;for(let r=1+t.directiveStylingLast;r<o;r++){let i=e[r].hostAttrs;a=Er(a,i,n)}return Er(a,t.attrs,n)}function tu(e,t,n,a,o){let r=null,i=n.directiveEnd,s=n.directiveStylingLast;for(s===-1?s=n.directiveStart:s++;s<i&&(r=t[s],a=Er(a,r.hostAttrs,o),r!==e);)s++;return e!==null&&(n.directiveStylingLast=s),a}function Er(e,t,n){let a=n?1:2,o=-1;if(t!==null)for(let r=0;r<t.length;r++){let i=t[r];typeof i=="number"?o=i:o===a&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),es(e,i,n?!0:t[++r]))}return e===void 0?null:e}function HI(e,t,n){if(n==null||n==="")return qe;let a=[],o=sn(n);if(Array.isArray(o))for(let r=0;r<o.length;r++)e(a,o[r],!0);else if(typeof o=="object")for(let r in o)o.hasOwnProperty(r)&&e(a,r,o[r]);else typeof o=="string"&&t(a,o);return a}function $I(e,t,n){let a=String(t);a!==""&&!a.includes(" ")&&es(e,a,n)}function GI(e,t,n,a,o,r,i,s){o===cn&&(o=qe);let c=0,l=0,d=0<o.length?o[0]:null,u=0<r.length?r[0]:null;for(;d!==null||u!==null;){let f=c<o.length?o[c+1]:void 0,m=l<r.length?r[l+1]:void 0,E=null,T;d===u?(c+=2,l+=2,f!==m&&(E=u,T=m)):u===null||d!==null&&d<u?(c+=2,E=d):(l+=2,E=u,T=m),E!==null&&Zv(e,t,n,a,E,T,i,s),d=c<o.length?o[c]:null,u=l<r.length?r[l]:null}}function Zv(e,t,n,a,o,r,i,s){if(!(t.type&3))return;let c=e.data,l=c[s+1],d=AI(l)?mg(c,t,n,o,po(l),i):void 0;if(!zs(d)){zs(r)||xI(l)&&(r=mg(c,null,n,o,s,i));let u=Dd(Pt(),n);S_(a,i,u,o,r)}}function mg(e,t,n,a,o,r){let i=t===null,s;for(;o>0;){let c=e[o],l=Array.isArray(c),d=l?c[1]:c,u=d===null,f=n[o+1];f===cn&&(f=u?qe:void 0);let m=u?ns(f,a):d===a?f:void 0;if(l&&!zs(m)&&(m=ns(c,a)),zs(m)&&(s=m,i))return s;let E=e[o+1];o=i?ya(E):po(E)}if(t!==null){let c=r?t.residualClasses:t.residualStyles;c!=null&&(s=ns(c,a))}return s}function zs(e){return e!==void 0}function WI(e,t){return e==null||e===""||(typeof t=="string"?e=e+t:typeof e=="object"&&(e=Xn(sn(e)))),e}function Kv(e,t){return(e.flags&(t?8:16))!==0}function y(e,t=""){let n=q(),a=ye(),o=e+le,r=a.firstCreatePass?go(a,o,1,t,null):a.data[o],i=JI(a,n,r,t,e);n[o]=i,ps()&&ip(a,n,i,r),ao(r,!1)}var JI=(e,t,n,a,o)=>(ur(!0),r_(t[ce],a));function QI(e,t,n,a=""){return Ot(e,dr(),n)?t+tr(n)+a:cn}function V(e){return dn("",e),V}function dn(e,t,n){let a=q(),o=QI(a,e,t,n);return o!==cn&&YI(a,Pt(),o),dn}function YI(e,t,n){let a=Dd(t,e);i_(e[ce],a,n)}function ZI(e,t,n){let a=ye();if(a.firstCreatePass){let o=kn(e);Lu(n,a.data,a.blueprint,o,!0),Lu(t,a.data,a.blueprint,o,!1)}}function Lu(e,t,n,a,o){if(e=Se(e),Array.isArray(e))for(let r=0;r<e.length;r++)Lu(e[r],t,n,a,o);else{let r=ye(),i=q(),s=Ie(),c=ra(e)?e:Se(e.provide),l=vd(e),d=s.providerIndexes&1048575,u=s.directiveStart,f=s.providerIndexes>>20;if(ra(e)||!e.multi){let m=new va(l,o,Q,null),E=ou(c,t,o?d:d+f,u);E===-1?(iu(Ms(s,i),r,c),au(r,e,t.length),t.push(c),s.directiveStart++,s.directiveEnd++,o&&(s.providerIndexes+=1048576),n.push(m),i.push(m)):(n[E]=m,i[E]=m)}else{let m=ou(c,t,d+f,u),E=ou(c,t,d,d+f),T=m>=0&&n[m],U=E>=0&&n[E];if(o&&!U||!o&&!T){iu(Ms(s,i),r,c);let j=eS(o?XI:KI,n.length,o,a,l,e);!o&&U&&(n[E].providerFactory=j),au(r,e,t.length,0),t.push(c),s.directiveStart++,s.directiveEnd++,o&&(s.providerIndexes+=1048576),n.push(j),i.push(j)}else{let j=Xv(n[o?E:m],l,!o&&a);au(r,e,m>-1?m:E,j)}!o&&a&&U&&n[E].componentProviders++}}}function au(e,t,n,a){let o=ra(t),r=mh(t);if(o||r){let c=(r?Se(t.useClass):t).prototype.ngOnDestroy;if(c){let l=e.destroyHooks||(e.destroyHooks=[]);if(!o&&t.multi){let d=l.indexOf(n);d===-1?l.push(n,[a,c]):l[d+1].push(a,c)}else l.push(n,c)}}}function Xv(e,t,n){return n&&e.componentProviders++,e.multi.push(t)-1}function ou(e,t,n,a){for(let o=n;o<a;o++)if(t[o]===e)return o;return-1}function KI(e,t,n,a,o){return Fu(this.multi,[])}function XI(e,t,n,a,o){let r=this.multi,i;if(this.providerFactory){let s=this.providerFactory.componentProviders,c=vr(a,a[w],this.providerFactory.index,o);i=c.slice(0,s),Fu(r,i);for(let l=s;l<c.length;l++)i.push(c[l])}else i=[],Fu(r,i);return i}function Fu(e,t){for(let n=0;n<e.length;n++){let a=e[n];t.push(a())}return t}function eS(e,t,n,a,o,r){let i=new va(e,n,Q,null);return i.multi=[],i.index=t,i.componentProviders=0,Xv(i,o,a&&!n),i}function ut(e,t=[]){return n=>{n.providersResolver=(a,o)=>ZI(a,o?o(e):e,t)}}function nS(e,t){let n=e[t];return n===cn?void 0:n}function tS(e,t,n,a,o,r,i){let s=t+n;return ID(e,s,o,r)?DD(e,s+2,i?a.call(i,o,r):a(o,r)):nS(e,s+2)}function Bt(e,t){let n=ye(),a,o=e+le;n.firstCreatePass?(a=aS(t,n.pipeRegistry),n.data[o]=a,a.onDestroy&&(n.destroyHooks??=[]).push(o,a.onDestroy)):a=n.data[o];let r=a.factory||(a.factory=St(a.type,!0)),i,s=ze(Q);try{let c=Ss(!1),l=r();return Ss(c),Sd(n,q(),o,l),l}finally{ze(s)}}function aS(e,t){if(t)for(let n=t.length-1;n>=0;n--){let a=t[n];if(e===a.name)return a}}function Vt(e,t,n,a){let o=e+le,r=q(),i=Id(r,o);return oS(r,o)?tS(r,Sh(),t,i.transform,n,a,i):i.transform(n,a)}function oS(e,t){return e[w].data[t].pure}function _o(e,t){return Js(e,t)}var qs=class{ngModuleFactory;componentFactories;constructor(t,n){this.ngModuleFactory=t,this.componentFactories=n}},Lp=(()=>{class e{compileModuleSync(n){return new Os(n)}compileModuleAsync(n){return Promise.resolve(this.compileModuleSync(n))}compileModuleAndAllComponentsSync(n){let a=this.compileModuleSync(n),o=md(n),r=Qg(o.declarations).reduce((i,s)=>{let c=jn(s);return c&&i.push(new Lt(c)),i},[]);return new qs(a,r)}compileModuleAndAllComponentsAsync(n){return Promise.resolve(this.compileModuleAndAllComponentsSync(n))}clearCache(){}clearCacheFor(n){}getModuleId(n){}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var rS=(()=>{class e{zone=p(G);changeDetectionScheduler=p(Pn);applicationRef=p(Dn);applicationErrorHandler=p(Ze);_onMicrotaskEmptySubscription;initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{try{this.applicationRef.dirtyFlags|=1,this.applicationRef._tick()}catch(n){this.applicationErrorHandler(n)}})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function ey({ngZoneFactory:e,ignoreChangesOutsideZone:t,scheduleInRootZone:n}){return e??=()=>new G(J(_({},ny()),{scheduleInRootZone:n})),[{provide:G,useFactory:e},{provide:et,multi:!0,useFactory:()=>{let a=p(rS,{optional:!0});return()=>a.initialize()}},{provide:et,multi:!0,useFactory:()=>{let a=p(iS);return()=>{a.initialize()}}},t===!0?{provide:Wd,useValue:!0}:[],{provide:Jd,useValue:n??Lv},{provide:Ze,useFactory:()=>{let a=p(G),o=p(se),r;return i=>{a.runOutsideAngular(()=>{o.destroyed&&!r?setTimeout(()=>{throw i}):(r??=o.get(Me),r.handleError(i))})}}}]}function ny(e){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:e?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:e?.runCoalescing??!1}}var iS=(()=>{class e{subscription=new Z;initialized=!1;zone=p(G);pendingTasks=p(tt);initialize(){if(this.initialized)return;this.initialized=!0;let n=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(n=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{G.assertNotInAngularZone(),queueMicrotask(()=>{n!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(n),n=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{G.assertInAngularZone(),n??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var ty=(()=>{class e{applicationErrorHandler=p(Ze);appRef=p(Dn);taskService=p(tt);ngZone=p(G);zonelessEnabled=p(mr);tracing=p(Ca,{optional:!0});disableScheduling=p(Wd,{optional:!0})??!1;zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new Z;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Ls):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(p(Jd,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{this.runningTick||this.cleanup()})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()})),this.disableScheduling||=!this.zonelessEnabled&&(this.ngZone instanceof Fs||!this.zoneIsDefined)}notify(n){if(!this.zonelessEnabled&&n===5)return;let a=!1;switch(n){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2,a=!0;break}case 12:{this.appRef.dirtyFlags|=16,a=!0;break}case 13:{this.appRef.dirtyFlags|=2,a=!0;break}case 11:{a=!0;break}case 9:case 8:case 7:case 10:default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick(a))return;let o=this.useMicrotaskScheduler?cg:Fv;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>o(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>o(()=>this.tick()))}shouldScheduleTick(n){return!(this.disableScheduling&&!n||this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Ls+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let n=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(a){this.taskService.remove(n),this.applicationErrorHandler(a)}finally{this.cleanup()}this.useMicrotaskScheduler=!0,cg(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(n)})}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let n=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(n)}}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function sS(){return typeof $localize<"u"&&$localize.locale||Ar}var sc=new I("",{providedIn:"root",factory:()=>p(sc,{optional:!0,skipSelf:!0})||sS()});function Vn(e){return Qf(e)}var Fp=class{[Le];constructor(t){this[Le]=t}destroy(){this[Le].destroy()}};function kp(e,t){let n=t?.injector??p(ve),a=t?.manualCleanup!==!0?n.get(vn):null,o,r=n.get(io,null,{optional:!0}),i=n.get(Pn);return r!==null?(o=dS(r.view,i,e),a instanceof er&&a._lView===r.view&&(a=null)):o=uS(e,n.get(fr),i),o.injector=n,a!==null&&(o.onDestroyFn=a.onDestroy(()=>o.destroy())),new Fp(o)}var ay=J(_({},Yf),{cleanupFns:void 0,zone:null,onDestroyFn:ha,run(){let e=oo(!1);try{Zf(this)}finally{oo(e)}},cleanup(){if(!this.cleanupFns?.length)return;let e=P(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],P(e)}}}),cS=J(_({},ay),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){Zt(this),this.onDestroyFn(),this.cleanup(),this.scheduler.remove(this)}}),lS=J(_({},ay),{consumerMarkedDirty(){this.view[R]|=8192,Rt(this.view),this.notifier.notify(13)},destroy(){Zt(this),this.onDestroyFn(),this.cleanup(),this.view[nt]?.delete(this)}});function dS(e,t,n){let a=Object.create(lS);return a.view=e,a.zone=typeof Zone<"u"?Zone.current:null,a.notifier=t,a.fn=oy(a,n),e[nt]??=new Set,e[nt].add(a),a.consumerMarkedDirty(a),a}function uS(e,t,n){let a=Object.create(cS);return a.fn=oy(a,e),a.scheduler=t,a.notifier=n,a.zone=typeof Zone<"u"?Zone.current:null,a.scheduler.add(a),a.notifier.notify(12),a}function oy(e,t){return()=>{t(n=>(e.cleanupFns??=[]).push(n))}}var uy=Symbol("InputSignalNode#UNSET"),DS=J(_({},yi),{transformFn:void 0,applyValueToInputSignal(e,t){qa(e,t)}});function py(e,t){let n=Object.create(DS);n.value=e,n.transformFn=t?.transform;function a(){if(Uo(n),n.value===uy){let o=null;throw new D(-950,o)}return n.value}return a[Le]=n,a}var Ut=class{attributeName;constructor(t){this.attributeName=t}__NG_ELEMENT_ID__=()=>_r(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}},IS=new I("");IS.__NG_ELEMENT_ID__=e=>{let t=Ie();if(t===null)throw new D(204,!1);if(t.type&2)return t.value;if(e&8)return null;throw new D(204,!1)};function ry(e,t){return py(e,t)}function SS(e){return py(uy,e)}var my=(ry.required=SS,ry);var zp=new I(""),MS=new I("");function Pr(e){return!e.moduleRef}function TS(e){let t=Pr(e)?e.r3Injector:e.moduleRef.injector,n=t.get(G);return n.run(()=>{Pr(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let a=t.get(Ze),o;if(n.runOutsideAngular(()=>{o=n.onError.subscribe({next:a})}),Pr(e)){let r=()=>t.destroy(),i=e.platformInjector.get(zp);i.add(r),t.onDestroy(()=>{o.unsubscribe(),i.delete(r)})}else{let r=()=>e.moduleRef.destroy(),i=e.platformInjector.get(zp);i.add(r),e.moduleRef.onDestroy(()=>{gr(e.allPlatformModules,e.moduleRef),o.unsubscribe(),i.delete(r)})}return wS(a,n,()=>{let r=t.get(tt),i=r.add(),s=t.get(wp);return s.runInitializers(),s.donePromise.then(()=>{let c=t.get(sc,Ar);if($v(c||Ar),!t.get(MS,!0))return Pr(e)?t.get(Dn):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(Pr(e)){let d=t.get(Dn);return e.rootComponent!==void 0&&d.bootstrap(e.rootComponent),d}else return xS?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>void r.remove(i))})})}var xS;function wS(e,t,n){try{let a=n();return bo(a)?a.catch(o=>{throw t.runOutsideAngular(()=>e(o)),o}):a}catch(a){throw t.runOutsideAngular(()=>e(a)),a}}var cc=null;function AS(e=[],t){return ve.create({name:t,providers:[{provide:or,useValue:"platform"},{provide:zp,useValue:new Set([()=>cc=null])},...e]})}function RS(e=[]){if(cc)return cc;let t=AS(e);return cc=t,Vv(),PS(t),t}function PS(e){let t=e.get(Bs,null);Te(e,()=>{t?.forEach(n=>n())})}var pt=(()=>{class e{static __NG_ELEMENT_ID__=NS}return e})();function NS(e){return jS(Ie(),q(),(e&16)===16)}function jS(e,t,n){if(At(e)&&!n){let a=rn(e.index,t);return new jt(a,a)}else if(e.type&175){let a=t[Ge];return new jt(a,t)}return null}var qp=class{constructor(){}supports(t){return Ep(t)}create(t){return new Bp(t)}},OS=(e,t)=>t,Bp=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(t){this._trackByFn=t||OS}forEachItem(t){let n;for(n=this._itHead;n!==null;n=n._next)t(n)}forEachOperation(t){let n=this._itHead,a=this._removalsHead,o=0,r=null;for(;n||a;){let i=!a||n&&n.currentIndex<iy(a,o,r)?n:a,s=iy(i,o,r),c=i.currentIndex;if(i===a)o--,a=a._nextRemoved;else if(n=n._next,i.previousIndex==null)o++;else{r||(r=[]);let l=s-o,d=c-o;if(l!=d){for(let f=0;f<l;f++){let m=f<r.length?r[f]:r[f]=0,E=m+f;d<=E&&E<l&&(r[f]=m+1)}let u=i.previousIndex;r[u]=d-l}}s!==c&&t(i,s,c)}}forEachPreviousItem(t){let n;for(n=this._previousItHead;n!==null;n=n._nextPrevious)t(n)}forEachAddedItem(t){let n;for(n=this._additionsHead;n!==null;n=n._nextAdded)t(n)}forEachMovedItem(t){let n;for(n=this._movesHead;n!==null;n=n._nextMoved)t(n)}forEachRemovedItem(t){let n;for(n=this._removalsHead;n!==null;n=n._nextRemoved)t(n)}forEachIdentityChange(t){let n;for(n=this._identityChangesHead;n!==null;n=n._nextIdentityChange)t(n)}diff(t){if(t==null&&(t=[]),!Ep(t))throw new D(900,!1);return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let n=this._itHead,a=!1,o,r,i;if(Array.isArray(t)){this.length=t.length;for(let s=0;s<this.length;s++)r=t[s],i=this._trackByFn(s,r),n===null||!Object.is(n.trackById,i)?(n=this._mismatch(n,r,i,s),a=!0):(a&&(n=this._verifyReinsertion(n,r,i,s)),Object.is(n.item,r)||this._addIdentityChange(n,r)),n=n._next}else o=0,Sv(t,s=>{i=this._trackByFn(o,s),n===null||!Object.is(n.trackById,i)?(n=this._mismatch(n,s,i,o),a=!0):(a&&(n=this._verifyReinsertion(n,s,i,o)),Object.is(n.item,s)||this._addIdentityChange(n,s)),n=n._next,o++}),this.length=o;return this._truncate(n),this.collection=t,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let t;for(t=this._previousItHead=this._itHead;t!==null;t=t._next)t._nextPrevious=t._next;for(t=this._additionsHead;t!==null;t=t._nextAdded)t.previousIndex=t.currentIndex;for(this._additionsHead=this._additionsTail=null,t=this._movesHead;t!==null;t=t._nextMoved)t.previousIndex=t.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(t,n,a,o){let r;return t===null?r=this._itTail:(r=t._prev,this._remove(t)),t=this._unlinkedRecords===null?null:this._unlinkedRecords.get(a,null),t!==null?(Object.is(t.item,n)||this._addIdentityChange(t,n),this._reinsertAfter(t,r,o)):(t=this._linkedRecords===null?null:this._linkedRecords.get(a,o),t!==null?(Object.is(t.item,n)||this._addIdentityChange(t,n),this._moveAfter(t,r,o)):t=this._addAfter(new Vp(n,a),r,o)),t}_verifyReinsertion(t,n,a,o){let r=this._unlinkedRecords===null?null:this._unlinkedRecords.get(a,null);return r!==null?t=this._reinsertAfter(r,t._prev,o):t.currentIndex!=o&&(t.currentIndex=o,this._addToMoves(t,o)),t}_truncate(t){for(;t!==null;){let n=t._next;this._addToRemovals(this._unlink(t)),t=n}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(t,n,a){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(t);let o=t._prevRemoved,r=t._nextRemoved;return o===null?this._removalsHead=r:o._nextRemoved=r,r===null?this._removalsTail=o:r._prevRemoved=o,this._insertAfter(t,n,a),this._addToMoves(t,a),t}_moveAfter(t,n,a){return this._unlink(t),this._insertAfter(t,n,a),this._addToMoves(t,a),t}_addAfter(t,n,a){return this._insertAfter(t,n,a),this._additionsTail===null?this._additionsTail=this._additionsHead=t:this._additionsTail=this._additionsTail._nextAdded=t,t}_insertAfter(t,n,a){let o=n===null?this._itHead:n._next;return t._next=o,t._prev=n,o===null?this._itTail=t:o._prev=t,n===null?this._itHead=t:n._next=t,this._linkedRecords===null&&(this._linkedRecords=new lc),this._linkedRecords.put(t),t.currentIndex=a,t}_remove(t){return this._addToRemovals(this._unlink(t))}_unlink(t){this._linkedRecords!==null&&this._linkedRecords.remove(t);let n=t._prev,a=t._next;return n===null?this._itHead=a:n._next=a,a===null?this._itTail=n:a._prev=n,t}_addToMoves(t,n){return t.previousIndex===n||(this._movesTail===null?this._movesTail=this._movesHead=t:this._movesTail=this._movesTail._nextMoved=t),t}_addToRemovals(t){return this._unlinkedRecords===null&&(this._unlinkedRecords=new lc),this._unlinkedRecords.put(t),t.currentIndex=null,t._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=t,t._prevRemoved=null):(t._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=t),t}_addIdentityChange(t,n){return t.item=n,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=t:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=t,t}},Vp=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(t,n){this.item=t,this.trackById=n}},Up=class{_head=null;_tail=null;add(t){this._head===null?(this._head=this._tail=t,t._nextDup=null,t._prevDup=null):(this._tail._nextDup=t,t._prevDup=this._tail,t._nextDup=null,this._tail=t)}get(t,n){let a;for(a=this._head;a!==null;a=a._nextDup)if((n===null||n<=a.currentIndex)&&Object.is(a.trackById,t))return a;return null}remove(t){let n=t._prevDup,a=t._nextDup;return n===null?this._head=a:n._nextDup=a,a===null?this._tail=n:a._prevDup=n,this._head===null}},lc=class{map=new Map;put(t){let n=t.trackById,a=this.map.get(n);a||(a=new Up,this.map.set(n,a)),a.add(t)}get(t,n){let a=t,o=this.map.get(a);return o?o.get(t,n):null}remove(t){let n=t.trackById;return this.map.get(n).remove(t)&&this.map.delete(n),t}get isEmpty(){return this.map.size===0}clear(){this.map.clear()}};function iy(e,t,n){let a=e.previousIndex;if(a===null)return a;let o=0;return n&&a<n.length&&(o=n[a]),a+t+o}var Hp=class{constructor(){}supports(t){return t instanceof Map||Ys(t)}create(){return new $p}},$p=class{_records=new Map;_mapHead=null;_appendAfter=null;_previousMapHead=null;_changesHead=null;_changesTail=null;_additionsHead=null;_additionsTail=null;_removalsHead=null;_removalsTail=null;get isDirty(){return this._additionsHead!==null||this._changesHead!==null||this._removalsHead!==null}forEachItem(t){let n;for(n=this._mapHead;n!==null;n=n._next)t(n)}forEachPreviousItem(t){let n;for(n=this._previousMapHead;n!==null;n=n._nextPrevious)t(n)}forEachChangedItem(t){let n;for(n=this._changesHead;n!==null;n=n._nextChanged)t(n)}forEachAddedItem(t){let n;for(n=this._additionsHead;n!==null;n=n._nextAdded)t(n)}forEachRemovedItem(t){let n;for(n=this._removalsHead;n!==null;n=n._nextRemoved)t(n)}diff(t){if(!t)t=new Map;else if(!(t instanceof Map||Ys(t)))throw new D(900,!1);return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let n=this._mapHead;if(this._appendAfter=null,this._forEach(t,(a,o)=>{if(n&&n.key===o)this._maybeAddToChanges(n,a),this._appendAfter=n,n=n._next;else{let r=this._getOrCreateRecordForKey(o,a);n=this._insertBeforeOrAppend(n,r)}}),n){n._prev&&(n._prev._next=null),this._removalsHead=n;for(let a=n;a!==null;a=a._nextRemoved)a===this._mapHead&&(this._mapHead=null),this._records.delete(a.key),a._nextRemoved=a._next,a.previousValue=a.currentValue,a.currentValue=null,a._prev=null,a._next=null}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(t,n){if(t){let a=t._prev;return n._next=t,n._prev=a,t._prev=n,a&&(a._next=n),t===this._mapHead&&(this._mapHead=n),this._appendAfter=t,t}return this._appendAfter?(this._appendAfter._next=n,n._prev=this._appendAfter):this._mapHead=n,this._appendAfter=n,null}_getOrCreateRecordForKey(t,n){if(this._records.has(t)){let o=this._records.get(t);this._maybeAddToChanges(o,n);let r=o._prev,i=o._next;return r&&(r._next=i),i&&(i._prev=r),o._next=null,o._prev=null,o}let a=new Gp(t);return this._records.set(t,a),a.currentValue=n,this._addToAdditions(a),a}_reset(){if(this.isDirty){let t;for(this._previousMapHead=this._mapHead,t=this._previousMapHead;t!==null;t=t._next)t._nextPrevious=t._next;for(t=this._changesHead;t!==null;t=t._nextChanged)t.previousValue=t.currentValue;for(t=this._additionsHead;t!=null;t=t._nextAdded)t.previousValue=t.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null}}_maybeAddToChanges(t,n){Object.is(n,t.currentValue)||(t.previousValue=t.currentValue,t.currentValue=n,this._addToChanges(t))}_addToAdditions(t){this._additionsHead===null?this._additionsHead=this._additionsTail=t:(this._additionsTail._nextAdded=t,this._additionsTail=t)}_addToChanges(t){this._changesHead===null?this._changesHead=this._changesTail=t:(this._changesTail._nextChanged=t,this._changesTail=t)}_forEach(t,n){t instanceof Map?t.forEach(n):Object.keys(t).forEach(a=>n(t[a],a))}},Gp=class{key;previousValue=null;currentValue=null;_nextPrevious=null;_next=null;_prev=null;_nextAdded=null;_nextRemoved=null;_nextChanged=null;constructor(t){this.key=t}};function sy(){return new Wp([new qp])}var Wp=(()=>{class e{factories;static \u0275prov=b({token:e,providedIn:"root",factory:sy});constructor(n){this.factories=n}static create(n,a){if(a!=null){let o=a.factories.slice();n=n.concat(o)}return new e(n)}static extend(n){return{provide:e,useFactory:()=>{let a=p(e,{optional:!0,skipSelf:!0});return e.create(n,a||sy())}}}find(n){let a=this.factories.find(o=>o.supports(n));if(a!=null)return a;throw new D(901,!1)}}return e})();function cy(){return new Jp([new Hp])}var Jp=(()=>{class e{static \u0275prov=b({token:e,providedIn:"root",factory:cy});factories;constructor(n){this.factories=n}static create(n,a){if(a){let o=a.factories.slice();n=n.concat(o)}return new e(n)}static extend(n){return{provide:e,useFactory:()=>{let a=p(e,{optional:!0,skipSelf:!0});return e.create(n,a||cy())}}}find(n){let a=this.factories.find(o=>o.supports(n));if(a)return a;throw new D(901,!1)}}return e})();var fy=(()=>{class e{constructor(n){}static \u0275fac=function(a){return new(a||e)(M(Dn))};static \u0275mod=ue({type:e});static \u0275inj=ie({})}return e})();function hy(e){let{rootComponent:t,appProviders:n,platformProviders:a,platformRef:o}=e;X(8);try{let r=o?.injector??RS(a),i=[ey({}),{provide:Pn,useExisting:ty},Fh,...n||[]],s=new br({providers:i,parent:r,debugName:"",runEnvironmentInitializers:!1});return TS({r3Injector:s.injector,platformInjector:r,rootComponent:t})}catch(r){return Promise.reject(r)}finally{X(9)}}function Ue(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function Qp(e,t=NaN){return!isNaN(parseFloat(e))&&!isNaN(Number(e))?Number(e):t}function Yp(e,t){let n=jn(e),a=t.elementInjector||Za();return new Lt(n).create(a,t.projectableNodes,t.hostElement,t.environmentInjector,t.directives,t.bindings)}function gy(e){let t=jn(e);if(!t)return null;let n=new Lt(t);return{get selector(){return n.selector},get type(){return n.componentType},get inputs(){return n.inputs},get outputs(){return n.outputs},get ngContentSelectors(){return n.ngContentSelectors},get isStandalone(){return t.standalone},get isSignal(){return t.signals}}}var by=null;function Un(){return by}function Zp(e){by??=e}var Nr=class{},jr=(()=>{class e{historyGo(n){throw new Error("")}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:()=>p(Ey),providedIn:"platform"})}return e})(),Kp=new I(""),Ey=(()=>{class e extends jr{_location;_history;_doc=p($);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return Un().getBaseHref(this._doc)}onPopState(n){let a=Un().getGlobalEventTarget(this._doc,"window");return a.addEventListener("popstate",n,!1),()=>a.removeEventListener("popstate",n)}onHashChange(n){let a=Un().getGlobalEventTarget(this._doc,"window");return a.addEventListener("hashchange",n,!1),()=>a.removeEventListener("hashchange",n)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(n){this._location.pathname=n}pushState(n,a,o){this._history.pushState(n,a,o)}replaceState(n,a,o){this._history.replaceState(n,a,o)}forward(){this._history.forward()}back(){this._history.back()}historyGo(n=0){this._history.go(n)}getState(){return this._history.state}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:()=>new e,providedIn:"platform"})}return e})();function dc(e,t){return e?t?e.endsWith("/")?t.startsWith("/")?e+t.slice(1):e+t:t.startsWith("/")?e+t:`${e}/${t}`:e:t}function vy(e){let t=e.search(/#|\?|$/);return e[t-1]==="/"?e.slice(0,t-1)+e.slice(t):e}function Sn(e){return e&&e[0]!=="?"?`?${e}`:e}var Mn=(()=>{class e{historyGo(n){throw new Error("")}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:()=>p(pc),providedIn:"root"})}return e})(),uc=new I(""),pc=(()=>{class e extends Mn{_platformLocation;_baseHref;_removeListenerFns=[];constructor(n,a){super(),this._platformLocation=n,this._baseHref=a??this._platformLocation.getBaseHrefFromDOM()??p($).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}prepareExternalUrl(n){return dc(this._baseHref,n)}path(n=!1){let a=this._platformLocation.pathname+Sn(this._platformLocation.search),o=this._platformLocation.hash;return o&&n?`${a}${o}`:a}pushState(n,a,o,r){let i=this.prepareExternalUrl(o+Sn(r));this._platformLocation.pushState(n,a,i)}replaceState(n,a,o,r){let i=this.prepareExternalUrl(o+Sn(r));this._platformLocation.replaceState(n,a,i)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}static \u0275fac=function(a){return new(a||e)(M(jr),M(uc,8))};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Ht=(()=>{class e{_subject=new H;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(n){this._locationStrategy=n;let a=this._locationStrategy.getBaseHref();this._basePath=kS(vy(yy(a))),this._locationStrategy.onPopState(o=>{this._subject.next({url:this.path(!0),pop:!0,state:o.state,type:o.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(n=!1){return this.normalize(this._locationStrategy.path(n))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(n,a=""){return this.path()==this.normalize(n+Sn(a))}normalize(n){return e.stripTrailingSlash(FS(this._basePath,yy(n)))}prepareExternalUrl(n){return n&&n[0]!=="/"&&(n="/"+n),this._locationStrategy.prepareExternalUrl(n)}go(n,a="",o=null){this._locationStrategy.pushState(o,"",n,a),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+Sn(a)),o)}replaceState(n,a="",o=null){this._locationStrategy.replaceState(o,"",n,a),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+Sn(a)),o)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(n=0){this._locationStrategy.historyGo?.(n)}onUrlChange(n){return this._urlChangeListeners.push(n),this._urlChangeSubscription??=this.subscribe(a=>{this._notifyUrlChangeListeners(a.url,a.state)}),()=>{let a=this._urlChangeListeners.indexOf(n);this._urlChangeListeners.splice(a,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(n="",a){this._urlChangeListeners.forEach(o=>o(n,a))}subscribe(n,a,o){return this._subject.subscribe({next:n,error:a??void 0,complete:o??void 0})}static normalizeQueryParams=Sn;static joinWithSlash=dc;static stripTrailingSlash=vy;static \u0275fac=function(a){return new(a||e)(M(Mn))};static \u0275prov=b({token:e,factory:()=>LS(),providedIn:"root"})}return e})();function LS(){return new Ht(M(Mn))}function FS(e,t){if(!e||!t.startsWith(e))return t;let n=t.substring(e.length);return n===""||["/",";","?","#"].includes(n[0])?n:t}function yy(e){return e.replace(/\/index.html$/,"")}function kS(e){if(new RegExp("^(https?:)?//").test(e)){let[,n]=e.split(/\/\/[^\/]+/);return n}return e}var Xp=(()=>{class e extends Mn{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(n,a){super(),this._platformLocation=n,a!=null&&(this._baseHref=a)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}path(n=!1){let a=this._platformLocation.hash??"#";return a.length>0?a.substring(1):a}prepareExternalUrl(n){let a=dc(this._baseHref,n);return a.length>0?"#"+a:a}pushState(n,a,o,r){let i=this.prepareExternalUrl(o+Sn(r))||this._platformLocation.pathname;this._platformLocation.pushState(n,a,i)}replaceState(n,a,o,r){let i=this.prepareExternalUrl(o+Sn(r))||this._platformLocation.pathname;this._platformLocation.replaceState(n,a,i)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}static \u0275fac=function(a){return new(a||e)(M(jr),M(uc,8))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})();var mc=class{$implicit;ngForOf;index;count;constructor(t,n,a,o){this.$implicit=t,this.ngForOf=n,this.index=a,this.count=o}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},$t=(()=>{class e{_viewContainer;_template;_differs;set ngForOf(n){this._ngForOf=n,this._ngForOfDirty=!0}set ngForTrackBy(n){this._trackByFn=n}get ngForTrackBy(){return this._trackByFn}_ngForOf=null;_ngForOfDirty=!0;_differ=null;_trackByFn;constructor(n,a,o){this._viewContainer=n,this._template=a,this._differs=o}set ngForTemplate(n){n&&(this._template=n)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let n=this._ngForOf;!this._differ&&n&&(this._differ=this._differs.find(n).create(this.ngForTrackBy))}if(this._differ){let n=this._differ.diff(this._ngForOf);n&&this._applyChanges(n)}}_applyChanges(n){let a=this._viewContainer;n.forEachOperation((o,r,i)=>{if(o.previousIndex==null)a.createEmbeddedView(this._template,new mc(o.item,this._ngForOf,-1,-1),i===null?void 0:i);else if(i==null)a.remove(r===null?void 0:r);else if(r!==null){let s=a.get(r);a.move(s,i),Cy(s,o)}});for(let o=0,r=a.length;o<r;o++){let s=a.get(o).context;s.index=o,s.count=r,s.ngForOf=this._ngForOf}n.forEachIdentityChange(o=>{let r=a.get(o.currentIndex);Cy(r,o)})}static ngTemplateContextGuard(n,a){return!0}static \u0275fac=function(a){return new(a||e)(Q(Ke),Q(Cn),Q(Wp))};static \u0275dir=he({type:e,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}})}return e})();function Cy(e,t){e.context.$implicit=t.item}var mt=(()=>{class e{_viewContainer;_context=new fc;_thenTemplateRef=null;_elseTemplateRef=null;_thenViewRef=null;_elseViewRef=null;constructor(n,a){this._viewContainer=n,this._thenTemplateRef=a}set ngIf(n){this._context.$implicit=this._context.ngIf=n,this._updateView()}set ngIfThen(n){_y(n,!1),this._thenTemplateRef=n,this._thenViewRef=null,this._updateView()}set ngIfElse(n){_y(n,!1),this._elseTemplateRef=n,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngIfUseIfTypeGuard;static ngTemplateGuard_ngIf;static ngTemplateContextGuard(n,a){return!0}static \u0275fac=function(a){return new(a||e)(Q(Ke),Q(Cn))};static \u0275dir=he({type:e,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}})}return e})(),fc=class{$implicit=null;ngIf=null};function _y(e,t){if(e&&!e.createEmbeddedView)throw new D(2020,!1)}var em=(()=>{class e{_ngEl;_differs;_renderer;_ngStyle=null;_differ=null;constructor(n,a,o){this._ngEl=n,this._differs=a,this._renderer=o}set ngStyle(n){this._ngStyle=n,!this._differ&&n&&(this._differ=this._differs.find(n).create())}ngDoCheck(){if(this._differ){let n=this._differ.diff(this._ngStyle);n&&this._applyChanges(n)}}_setStyle(n,a){let[o,r]=n.split("."),i=o.indexOf("-")===-1?void 0:En.DashCase;a!=null?this._renderer.setStyle(this._ngEl.nativeElement,o,r?`${a}${r}`:a,i):this._renderer.removeStyle(this._ngEl.nativeElement,o,i)}_applyChanges(n){n.forEachRemovedItem(a=>this._setStyle(a.key,null)),n.forEachAddedItem(a=>this._setStyle(a.key,a.currentValue)),n.forEachChangedItem(a=>this._setStyle(a.key,a.currentValue))}static \u0275fac=function(a){return new(a||e)(Q(de),Q(Jp),Q(kt))};static \u0275dir=he({type:e,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"}})}return e})();var en=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=ue({type:e});static \u0275inj=ie({})}return e})();function nm(e,t){t=encodeURIComponent(t);for(let n of e.split(";")){let a=n.indexOf("="),[o,r]=a==-1?[n,""]:[n.slice(0,a),n.slice(a+1)];if(o.trim()===t)return decodeURIComponent(r)}return null}var Or=class{};var am="browser";function Dy(e){return e===am}var Iy=(()=>{class e{static \u0275prov=b({token:e,providedIn:"root",factory:()=>new tm(p($),window)})}return e})(),tm=class{document;window;offset=()=>[0,0];constructor(t,n){this.document=t,this.window=n}setOffset(t){Array.isArray(t)?this.offset=()=>t:this.offset=t}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(t,n){this.window.scrollTo(J(_({},n),{left:t[0],top:t[1]}))}scrollToAnchor(t,n){let a=qS(this.document,t);a&&(this.scrollToElement(a,n),a.focus())}setHistoryScrollRestoration(t){try{this.window.history.scrollRestoration=t}catch{console.warn(Nn(2400,!1))}}scrollToElement(t,n){let a=t.getBoundingClientRect(),o=a.left+this.window.pageXOffset,r=a.top+this.window.pageYOffset,i=this.offset();this.window.scrollTo(J(_({},n),{left:o-i[0],top:r-i[1]}))}};function qS(e,t){let n=e.getElementById(t)||e.getElementsByName(t)[0];if(n)return n;if(typeof e.createTreeWalker=="function"&&e.body&&typeof e.body.attachShadow=="function"){let a=e.createTreeWalker(e.body,NodeFilter.SHOW_ELEMENT),o=a.currentNode;for(;o;){let r=o.shadowRoot;if(r){let i=r.getElementById(t)||r.querySelector(`[name="${t}"]`);if(i)return i}o=a.nextNode()}}return null}var gc=new I(""),cm=(()=>{class e{_zone;_plugins;_eventNameToPlugin=new Map;constructor(n,a){this._zone=a,n.forEach(o=>{o.manager=this}),this._plugins=n.slice().reverse()}addEventListener(n,a,o,r){return this._findPluginFor(a).addEventListener(n,a,o,r)}getZone(){return this._zone}_findPluginFor(n){let a=this._eventNameToPlugin.get(n);if(a)return a;if(a=this._plugins.find(r=>r.supports(n)),!a)throw new D(5101,!1);return this._eventNameToPlugin.set(n,a),a}static \u0275fac=function(a){return new(a||e)(M(gc),M(G))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),Fr=class{_doc;constructor(t){this._doc=t}manager},om="ng-app-id";function Sy(e){for(let t of e)t.remove()}function My(e,t){let n=t.createElement("style");return n.textContent=e,n}function BS(e,t,n,a){let o=e.head?.querySelectorAll(`style[${om}="${t}"],link[${om}="${t}"]`);if(o)for(let r of o)r.removeAttribute(om),r instanceof HTMLLinkElement?a.set(r.href.slice(r.href.lastIndexOf("/")+1),{usage:0,elements:[r]}):r.textContent&&n.set(r.textContent,{usage:0,elements:[r]})}function im(e,t){let n=t.createElement("link");return n.setAttribute("rel","stylesheet"),n.setAttribute("href",e),n}var lm=(()=>{class e{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(n,a,o,r={}){this.doc=n,this.appId=a,this.nonce=o,BS(n,a,this.inline,this.external),this.hosts.add(n.head)}addStyles(n,a){for(let o of n)this.addUsage(o,this.inline,My);a?.forEach(o=>this.addUsage(o,this.external,im))}removeStyles(n,a){for(let o of n)this.removeUsage(o,this.inline);a?.forEach(o=>this.removeUsage(o,this.external))}addUsage(n,a,o){let r=a.get(n);r?r.usage++:a.set(n,{usage:1,elements:[...this.hosts].map(i=>this.addElement(i,o(n,this.doc)))})}removeUsage(n,a){let o=a.get(n);o&&(o.usage--,o.usage<=0&&(Sy(o.elements),a.delete(n)))}ngOnDestroy(){for(let[,{elements:n}]of[...this.inline,...this.external])Sy(n);this.hosts.clear()}addHost(n){this.hosts.add(n);for(let[a,{elements:o}]of this.inline)o.push(this.addElement(n,My(a,this.doc)));for(let[a,{elements:o}]of this.external)o.push(this.addElement(n,im(a,this.doc)))}removeHost(n){this.hosts.delete(n)}addElement(n,a){return this.nonce&&a.setAttribute("nonce",this.nonce),n.appendChild(a)}static \u0275fac=function(a){return new(a||e)(M($),M(fo),M(ho,8),M(Ft))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),rm={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},dm=/%COMP%/g;var xy="%COMP%",VS=`_nghost-${xy}`,US=`_ngcontent-${xy}`,HS=!0,$S=new I("",{providedIn:"root",factory:()=>HS});function GS(e){return US.replace(dm,e)}function WS(e){return VS.replace(dm,e)}function wy(e,t){return t.map(n=>n.replace(dm,e))}var um=(()=>{class e{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;platformId;ngZone;nonce;animationDisabled;maxAnimationTimeout;tracingService;rendererByCompId=new Map;defaultRenderer;platformIsServer;registry;constructor(n,a,o,r,i,s,c,l=null,d,u,f=null){this.eventManager=n,this.sharedStylesHost=a,this.appId=o,this.removeStylesOnCompDestroy=r,this.doc=i,this.platformId=s,this.ngZone=c,this.nonce=l,this.animationDisabled=d,this.maxAnimationTimeout=u,this.tracingService=f,this.platformIsServer=!1,this.defaultRenderer=new kr(n,i,c,this.platformIsServer,this.tracingService,this.registry=ms(),this.maxAnimationTimeout)}createRenderer(n,a){if(!n||!a)return this.defaultRenderer;let o=this.getOrCreateRenderer(n,a);return o instanceof hc?o.applyToHost(n):o instanceof zr&&o.applyStyles(),o}getOrCreateRenderer(n,a){let o=this.rendererByCompId,r=o.get(a.id);if(!r){let i=this.doc,s=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,u=this.platformIsServer,f=this.tracingService;switch(a.encapsulation){case ot.Emulated:r=new hc(c,l,a,this.appId,d,i,s,u,f,this.registry,this.animationDisabled,this.maxAnimationTimeout);break;case ot.ShadowDom:return new sm(c,l,n,a,i,s,this.nonce,u,f,this.registry,this.maxAnimationTimeout);default:r=new zr(c,l,a,d,i,s,u,f,this.registry,this.animationDisabled,this.maxAnimationTimeout);break}o.set(a.id,r)}return r}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(n){this.rendererByCompId.delete(n)}static \u0275fac=function(a){return new(a||e)(M(cm),M(lm),M(fo),M($S),M($),M(Ft),M(G),M(ho),M(Ap),M(Rp),M(Ca,8))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),kr=class{eventManager;doc;ngZone;platformIsServer;tracingService;registry;maxAnimationTimeout;data=Object.create(null);throwOnSyntheticProps=!0;constructor(t,n,a,o,r,i,s){this.eventManager=t,this.doc=n,this.ngZone=a,this.platformIsServer=o,this.tracingService=r,this.registry=i,this.maxAnimationTimeout=s}destroy(){}destroyNode=null;createElement(t,n){return n?this.doc.createElementNS(rm[n]||n,t):this.doc.createElement(t)}createComment(t){return this.doc.createComment(t)}createText(t){return this.doc.createTextNode(t)}appendChild(t,n){(Ty(t)?t.content:t).appendChild(n)}insertBefore(t,n,a){t&&(Ty(t)?t.content:t).insertBefore(n,a)}removeChild(t,n){let{elements:a}=this.registry;if(a){a.animate(n,()=>n.remove(),this.maxAnimationTimeout);return}n.remove()}selectRootElement(t,n){let a=typeof t=="string"?this.doc.querySelector(t):t;if(!a)throw new D(-5104,!1);return n||(a.textContent=""),a}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,n,a,o){if(o){n=o+":"+n;let r=rm[o];r?t.setAttributeNS(r,n,a):t.setAttribute(n,a)}else t.setAttribute(n,a)}removeAttribute(t,n,a){if(a){let o=rm[a];o?t.removeAttributeNS(o,n):t.removeAttribute(`${a}:${n}`)}else t.removeAttribute(n)}addClass(t,n){t.classList.add(n)}removeClass(t,n){t.classList.remove(n)}setStyle(t,n,a,o){o&(En.DashCase|En.Important)?t.style.setProperty(n,a,o&En.Important?"important":""):t.style[n]=a}removeStyle(t,n,a){a&En.DashCase?t.style.removeProperty(n):t.style[n]=""}setProperty(t,n,a){t!=null&&(t[n]=a)}setValue(t,n){t.nodeValue=n}listen(t,n,a,o){if(typeof t=="string"&&(t=Un().getGlobalEventTarget(this.doc,t),!t))throw new D(5102,!1);let r=this.decoratePreventDefault(a);return this.tracingService?.wrapEventListener&&(r=this.tracingService.wrapEventListener(t,n,r)),this.eventManager.addEventListener(t,n,r,o)}decoratePreventDefault(t){return n=>{if(n==="__ngUnwrap__")return t;t(n)===!1&&n.preventDefault()}}};function Ty(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var sm=class extends kr{sharedStylesHost;hostEl;shadowRoot;constructor(t,n,a,o,r,i,s,c,l,d,u){super(t,r,i,c,l,d,u),this.sharedStylesHost=n,this.hostEl=a,this.shadowRoot=a.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);let f=o.styles;f=wy(o.id,f);for(let E of f){let T=document.createElement("style");s&&T.setAttribute("nonce",s),T.textContent=E,this.shadowRoot.appendChild(T)}let m=o.getExternalStyles?.();if(m)for(let E of m){let T=im(E,r);s&&T.setAttribute("nonce",s),this.shadowRoot.appendChild(T)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}appendChild(t,n){return super.appendChild(this.nodeOrShadowRoot(t),n)}insertBefore(t,n,a){return super.insertBefore(this.nodeOrShadowRoot(t),n,a)}removeChild(t,n){return super.removeChild(null,n)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}},zr=class extends kr{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;_animationDisabled;constructor(t,n,a,o,r,i,s,c,l,d,u,f){super(t,r,i,s,c,l,u),this.sharedStylesHost=n,this.removeStylesOnCompDestroy=o,this._animationDisabled=d;let m=a.styles;this.styles=f?wy(f,m):m,this.styleUrls=a.getExternalStyles?.(f)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){if(this.removeStylesOnCompDestroy){if(!this._animationDisabled&&this.registry.elements){this.ngZone.runOutsideAngular(()=>{setTimeout(()=>{this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)},this.maxAnimationTimeout)});return}this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}}},hc=class extends zr{contentAttr;hostAttr;constructor(t,n,a,o,r,i,s,c,l,d,u,f){let m=o+"-"+a.id;super(t,n,a,r,i,s,c,l,d,u,f,m),this.contentAttr=GS(m),this.hostAttr=WS(m)}applyToHost(t){this.applyStyles(),this.setAttribute(t,this.hostAttr,"")}createElement(t,n){let a=super.createElement(t,n);return super.setAttribute(a,this.contentAttr,""),a}};var vc=class e extends Nr{supportsDOMEvents=!0;static makeCurrent(){Zp(new e)}onAndCancel(t,n,a,o){return t.addEventListener(n,a,o),()=>{t.removeEventListener(n,a,o)}}dispatchEvent(t,n){t.dispatchEvent(n)}remove(t){t.remove()}createElement(t,n){return n=n||this.getDefaultDocument(),n.createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,n){return n==="window"?window:n==="document"?t:n==="body"?t.body:null}getBaseHref(t){let n=JS();return n==null?null:QS(n)}resetBaseElement(){qr=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return nm(document.cookie,t)}},qr=null;function JS(){return qr=qr||document.head.querySelector("base"),qr?qr.getAttribute("href"):null}function QS(e){return new URL(e,document.baseURI).pathname}var yc=class{addToWindow(t){Be.getAngularTestability=(a,o=!0)=>{let r=t.findTestabilityInTree(a,o);if(r==null)throw new D(5103,!1);return r},Be.getAllAngularTestabilities=()=>t.getAllTestabilities(),Be.getAllAngularRootElements=()=>t.getAllRootElements();let n=a=>{let o=Be.getAllAngularTestabilities(),r=o.length,i=function(){r--,r==0&&a()};o.forEach(s=>{s.whenStable(i)})};Be.frameworkStabilizers||(Be.frameworkStabilizers=[]),Be.frameworkStabilizers.push(n)}findTestabilityInTree(t,n,a){if(n==null)return null;let o=t.getTestability(n);return o??(a?Un().isShadowRoot(n)?this.findTestabilityInTree(t,n.host,!0):this.findTestabilityInTree(t,n.parentElement,!0):null)}},YS=(()=>{class e{build(){return new XMLHttpRequest}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),Ry=(()=>{class e extends Fr{constructor(n){super(n)}supports(n){return!0}addEventListener(n,a,o,r){return n.addEventListener(a,o,r),()=>this.removeEventListener(n,a,o,r)}removeEventListener(n,a,o,r){return n.removeEventListener(a,o,r)}static \u0275fac=function(a){return new(a||e)(M($))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),Ay=["alt","control","meta","shift"],ZS={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},KS={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},Py=(()=>{class e extends Fr{constructor(n){super(n)}supports(n){return e.parseEventName(n)!=null}addEventListener(n,a,o,r){let i=e.parseEventName(a),s=e.eventCallback(i.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Un().onAndCancel(n,i.domEventName,s,r))}static parseEventName(n){let a=n.toLowerCase().split("."),o=a.shift();if(a.length===0||!(o==="keydown"||o==="keyup"))return null;let r=e._normalizeKey(a.pop()),i="",s=a.indexOf("code");if(s>-1&&(a.splice(s,1),i="code."),Ay.forEach(l=>{let d=a.indexOf(l);d>-1&&(a.splice(d,1),i+=l+".")}),i+=r,a.length!=0||r.length===0)return null;let c={};return c.domEventName=o,c.fullKey=i,c}static matchEventFullKeyCode(n,a){let o=ZS[n.key]||n.key,r="";return a.indexOf("code.")>-1&&(o=n.code,r="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),Ay.forEach(i=>{if(i!==o){let s=KS[i];s(n)&&(r+=i+".")}}),r+=o,r===a)}static eventCallback(n,a,o){return r=>{e.matchEventFullKeyCode(r,n)&&o.runGuarded(()=>a(r))}}static _normalizeKey(n){return n==="esc"?"escape":n}static \u0275fac=function(a){return new(a||e)(M($))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})();function pm(e,t,n){let a=_({rootComponent:e,platformRef:n?.platformRef},XS(t));return hy(a)}function XS(e){return{appProviders:[...Ny,...e?.providers??[]],platformProviders:aM}}function eM(){vc.makeCurrent()}function nM(){return new Me}function tM(){return Bu(document),document}var aM=[{provide:Ft,useValue:am},{provide:Bs,useValue:eM,multi:!0},{provide:$,useFactory:tM}];var oM=[{provide:yo,useClass:yc},{provide:tc,useClass:Tr,deps:[G,xr,yo]},{provide:Tr,useClass:Tr,deps:[G,xr,yo]}],Ny=[{provide:or,useValue:"root"},{provide:Me,useFactory:nM},{provide:gc,useClass:Ry,multi:!0,deps:[$]},{provide:gc,useClass:Py,multi:!0,deps:[$]},um,lm,cm,{provide:it,useExisting:um},{provide:Or,useClass:YS},[]],mm=(()=>{class e{constructor(){}static \u0275fac=function(a){return new(a||e)};static \u0275mod=ue({type:e});static \u0275inj=ie({providers:[...Ny,...oM],imports:[en,fy]})}return e})();var hm=class{};var Ia=class e{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(t){t?typeof t=="string"?this.lazyInit=()=>{this.headers=new Map,t.split(`
`).forEach(n=>{let a=n.indexOf(":");if(a>0){let o=n.slice(0,a),r=n.slice(a+1).trim();this.addHeaderEntry(o,r)}})}:typeof Headers<"u"&&t instanceof Headers?(this.headers=new Map,t.forEach((n,a)=>{this.addHeaderEntry(a,n)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(t).forEach(([n,a])=>{this.setHeaderEntries(n,a)})}:this.headers=new Map}has(t){return this.init(),this.headers.has(t.toLowerCase())}get(t){this.init();let n=this.headers.get(t.toLowerCase());return n&&n.length>0?n[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(t){return this.init(),this.headers.get(t.toLowerCase())||null}append(t,n){return this.clone({name:t,value:n,op:"a"})}set(t,n){return this.clone({name:t,value:n,op:"s"})}delete(t,n){return this.clone({name:t,value:n,op:"d"})}maybeSetNormalizedName(t,n){this.normalizedNames.has(n)||this.normalizedNames.set(n,t)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(t=>this.applyUpdate(t)),this.lazyUpdate=null))}copyFrom(t){t.init(),Array.from(t.headers.keys()).forEach(n=>{this.headers.set(n,t.headers.get(n)),this.normalizedNames.set(n,t.normalizedNames.get(n))})}clone(t){let n=new e;return n.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,n.lazyUpdate=(this.lazyUpdate||[]).concat([t]),n}applyUpdate(t){let n=t.name.toLowerCase();switch(t.op){case"a":case"s":let a=t.value;if(typeof a=="string"&&(a=[a]),a.length===0)return;this.maybeSetNormalizedName(t.name,n);let o=(t.op==="a"?this.headers.get(n):void 0)||[];o.push(...a),this.headers.set(n,o);break;case"d":let r=t.value;if(!r)this.headers.delete(n),this.normalizedNames.delete(n);else{let i=this.headers.get(n);if(!i)return;i=i.filter(s=>r.indexOf(s)===-1),i.length===0?(this.headers.delete(n),this.normalizedNames.delete(n)):this.headers.set(n,i)}break}}addHeaderEntry(t,n){let a=t.toLowerCase();this.maybeSetNormalizedName(t,a),this.headers.has(a)?this.headers.get(a).push(n):this.headers.set(a,[n])}setHeaderEntries(t,n){let a=(Array.isArray(n)?n:[n]).map(r=>r.toString()),o=t.toLowerCase();this.headers.set(o,a),this.maybeSetNormalizedName(t,o)}forEach(t){this.init(),Array.from(this.normalizedNames.keys()).forEach(n=>t(this.normalizedNames.get(n),this.headers.get(n)))}};var gm=class{encodeKey(t){return jy(t)}encodeValue(t){return jy(t)}decodeKey(t){return decodeURIComponent(t)}decodeValue(t){return decodeURIComponent(t)}};function rM(e,t){let n=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(o=>{let r=o.indexOf("="),[i,s]=r==-1?[t.decodeKey(o),""]:[t.decodeKey(o.slice(0,r)),t.decodeValue(o.slice(r+1))],c=n.get(i)||[];c.push(s),n.set(i,c)}),n}var iM=/%(\d[a-f0-9])/gi,sM={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function jy(e){return encodeURIComponent(e).replace(iM,(t,n)=>sM[n]??t)}function bc(e){return`${e}`}var ft=class e{map;encoder;updates=null;cloneFrom=null;constructor(t={}){if(this.encoder=t.encoder||new gm,t.fromString){if(t.fromObject)throw new D(2805,!1);this.map=rM(t.fromString,this.encoder)}else t.fromObject?(this.map=new Map,Object.keys(t.fromObject).forEach(n=>{let a=t.fromObject[n],o=Array.isArray(a)?a.map(bc):[bc(a)];this.map.set(n,o)})):this.map=null}has(t){return this.init(),this.map.has(t)}get(t){this.init();let n=this.map.get(t);return n?n[0]:null}getAll(t){return this.init(),this.map.get(t)||null}keys(){return this.init(),Array.from(this.map.keys())}append(t,n){return this.clone({param:t,value:n,op:"a"})}appendAll(t){let n=[];return Object.keys(t).forEach(a=>{let o=t[a];Array.isArray(o)?o.forEach(r=>{n.push({param:a,value:r,op:"a"})}):n.push({param:a,value:o,op:"a"})}),this.clone(n)}set(t,n){return this.clone({param:t,value:n,op:"s"})}delete(t,n){return this.clone({param:t,value:n,op:"d"})}toString(){return this.init(),this.keys().map(t=>{let n=this.encoder.encodeKey(t);return this.map.get(t).map(a=>n+"="+this.encoder.encodeValue(a)).join("&")}).filter(t=>t!=="").join("&")}clone(t){let n=new e({encoder:this.encoder});return n.cloneFrom=this.cloneFrom||this,n.updates=(this.updates||[]).concat(t),n}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(t=>this.map.set(t,this.cloneFrom.map.get(t))),this.updates.forEach(t=>{switch(t.op){case"a":case"s":let n=(t.op==="a"?this.map.get(t.param):void 0)||[];n.push(bc(t.value)),this.map.set(t.param,n);break;case"d":if(t.value!==void 0){let a=this.map.get(t.param)||[],o=a.indexOf(bc(t.value));o!==-1&&a.splice(o,1),a.length>0?this.map.set(t.param,a):this.map.delete(t.param)}else{this.map.delete(t.param);break}}}),this.cloneFrom=this.updates=null)}};var vm=class{map=new Map;set(t,n){return this.map.set(t,n),this}get(t){return this.map.has(t)||this.map.set(t,t.defaultValue()),this.map.get(t)}delete(t){return this.map.delete(t),this}has(t){return this.map.has(t)}keys(){return this.map.keys()}};function cM(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function Oy(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function Ly(e){return typeof Blob<"u"&&e instanceof Blob}function Fy(e){return typeof FormData<"u"&&e instanceof FormData}function lM(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}var dM="X-Request-URL",ky="text/plain",zy="application/json",aH=`${zy}, ${ky}, */*`,Io=class e{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(t,n,a,o){this.url=n,this.method=t.toUpperCase();let r;if(cM(this.method)||o?(this.body=a!==void 0?a:null,r=o):r=a,r){if(this.reportProgress=!!r.reportProgress,this.withCredentials=!!r.withCredentials,this.keepalive=!!r.keepalive,r.responseType&&(this.responseType=r.responseType),r.headers&&(this.headers=r.headers),r.context&&(this.context=r.context),r.params&&(this.params=r.params),r.priority&&(this.priority=r.priority),r.cache&&(this.cache=r.cache),r.credentials&&(this.credentials=r.credentials),typeof r.timeout=="number"){if(r.timeout<1||!Number.isInteger(r.timeout))throw new D(2822,"");this.timeout=r.timeout}r.mode&&(this.mode=r.mode),r.redirect&&(this.redirect=r.redirect),r.integrity&&(this.integrity=r.integrity),r.referrer&&(this.referrer=r.referrer),this.transferCache=r.transferCache}if(this.headers??=new Ia,this.context??=new vm,!this.params)this.params=new ft,this.urlWithParams=n;else{let i=this.params.toString();if(i.length===0)this.urlWithParams=n;else{let s=n.indexOf("?"),c=s===-1?"?":s<n.length-1?"&":"";this.urlWithParams=n+c+i}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||Oy(this.body)||Ly(this.body)||Fy(this.body)||lM(this.body)?this.body:this.body instanceof ft?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||Fy(this.body)?null:Ly(this.body)?this.body.type||null:Oy(this.body)?null:typeof this.body=="string"?ky:this.body instanceof ft?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?zy:null}clone(t={}){let n=t.method||this.method,a=t.url||this.url,o=t.responseType||this.responseType,r=t.keepalive??this.keepalive,i=t.priority||this.priority,s=t.cache||this.cache,c=t.mode||this.mode,l=t.redirect||this.redirect,d=t.credentials||this.credentials,u=t.referrer||this.referrer,f=t.integrity||this.integrity,m=t.transferCache??this.transferCache,E=t.timeout??this.timeout,T=t.body!==void 0?t.body:this.body,U=t.withCredentials??this.withCredentials,j=t.reportProgress??this.reportProgress,xn=t.headers||this.headers,vt=t.params||this.params,j0=t.context??this.context;return t.setHeaders!==void 0&&(xn=Object.keys(t.setHeaders).reduce((pl,Vo)=>pl.set(Vo,t.setHeaders[Vo]),xn)),t.setParams&&(vt=Object.keys(t.setParams).reduce((pl,Vo)=>pl.set(Vo,t.setParams[Vo]),vt)),new e(n,a,T,{params:vt,headers:xn,context:j0,reportProgress:j,responseType:o,withCredentials:U,transferCache:m,keepalive:r,cache:s,priority:i,timeout:E,mode:c,redirect:l,credentials:d,referrer:u,integrity:f})}},bm=(function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e})(bm||{}),ym=class{headers;status;statusText;url;ok;type;redirected;constructor(t,n=200,a="OK"){this.headers=t.headers||new Ia,this.status=t.status!==void 0?t.status:n,this.statusText=t.statusText||a,this.url=t.url||null,this.redirected=t.redirected,this.ok=this.status>=200&&this.status<300}};var Ec=class e extends ym{body;constructor(t={}){super(t),this.body=t.body!==void 0?t.body:null}type=bm.Response;clone(t={}){return new e({body:t.body!==void 0?t.body:this.body,headers:t.headers||this.headers,status:t.status!==void 0?t.status:this.status,statusText:t.statusText||this.statusText,url:t.url||this.url||void 0,redirected:t.redirected??this.redirected})}};function fm(e,t){return{body:t,headers:e.headers,context:e.context,observe:e.observe,params:e.params,reportProgress:e.reportProgress,responseType:e.responseType,withCredentials:e.withCredentials,credentials:e.credentials,transferCache:e.transferCache,timeout:e.timeout,keepalive:e.keepalive,priority:e.priority,cache:e.cache,mode:e.mode,redirect:e.redirect,integrity:e.integrity,referrer:e.referrer}}var Em=(()=>{class e{handler;constructor(n){this.handler=n}request(n,a,o={}){let r;if(n instanceof Io)r=n;else{let c;o.headers instanceof Ia?c=o.headers:c=new Ia(o.headers);let l;o.params&&(o.params instanceof ft?l=o.params:l=new ft({fromObject:o.params})),r=new Io(n,a,o.body!==void 0?o.body:null,{headers:c,context:o.context,params:l,reportProgress:o.reportProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache,keepalive:o.keepalive,priority:o.priority,cache:o.cache,mode:o.mode,redirect:o.redirect,credentials:o.credentials,referrer:o.referrer,integrity:o.integrity,timeout:o.timeout})}let i=x(r).pipe(Rn(c=>this.handler.handle(c)));if(n instanceof Io||o.observe==="events")return i;let s=i.pipe(ne(c=>c instanceof Ec));switch(o.observe||"body"){case"body":switch(r.responseType){case"arraybuffer":return s.pipe(A(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new D(2806,!1);return c.body}));case"blob":return s.pipe(A(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new D(2807,!1);return c.body}));case"text":return s.pipe(A(c=>{if(c.body!==null&&typeof c.body!="string")throw new D(2808,!1);return c.body}));case"json":default:return s.pipe(A(c=>c.body))}case"response":return s;default:throw new D(2809,!1)}}delete(n,a={}){return this.request("DELETE",n,a)}get(n,a={}){return this.request("GET",n,a)}head(n,a={}){return this.request("HEAD",n,a)}jsonp(n,a){return this.request("JSONP",n,{params:new ft().append(a,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(n,a={}){return this.request("OPTIONS",n,a)}patch(n,a,o={}){return this.request("PATCH",n,fm(o,a))}post(n,a,o={}){return this.request("POST",n,fm(o,a))}put(n,a,o={}){return this.request("PUT",n,fm(o,a))}static \u0275fac=function(a){return new(a||e)(M(hm))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})();var oH=RegExp(`^${dM}:`,"m");var qy=(()=>{class e{_doc;constructor(n){this._doc=n}getTitle(){return this._doc.title}setTitle(n){this._doc.title=n||""}static \u0275fac=function(a){return new(a||e)(M($))};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Cm=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:function(a){let o=null;return a?o=new(a||e):o=M(pM),o},providedIn:"root"})}return e})(),pM=(()=>{class e extends Cm{_doc;constructor(n){super(),this._doc=n}sanitize(n,a){if(a==null)return null;switch(n){case we.NONE:return a;case we.HTML:return ct(a,"HTML")?sn(a):Qu(this._doc,String(a)).toString();case we.STYLE:return ct(a,"Style")?sn(a):a;case we.SCRIPT:if(ct(a,"Script"))return sn(a);throw new D(5200,!1);case we.URL:return ct(a,"URL")?sn(a):Dr(String(a));case we.RESOURCE_URL:if(ct(a,"ResourceURL"))return sn(a);throw new D(5201,!1);default:throw new D(5202,!1)}}bypassSecurityTrustHtml(n){return Hu(n)}bypassSecurityTrustStyle(n){return $u(n)}bypassSecurityTrustScript(n){return Gu(n)}bypassSecurityTrustUrl(n){return Wu(n)}bypassSecurityTrustResourceUrl(n){return Ju(n)}static \u0275fac=function(a){return new(a||e)(M($))};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Vy=[{nombre:"Europa",hijos:[{nombre:"Alemania",flag:"https://flagcdn.com/de.svg",hijos:[{nombre:"Aachen/Aquisgr\xE1n",path:"europa/alemania/aachen"},{nombre:"Bonn",path:"europa/alemania/bonn"},{nombre:"Colonia",path:"europa/alemania/colonia"},{nombre:"Dortmund",path:"europa/alemania/dortmund"},{nombre:"D\xFCsseldorf",path:"europa/alemania/dusseldorf"},{nombre:"Fr\xE1ncfort del Meno",path:"europa/alemania/francfort"},{nombre:"Heidelberg",path:"europa/alemania/heidelberg"},{nombre:"Idstein",path:"europa/alemania/idstein"},{nombre:"M\xFCnster",path:"europa/alemania/munster"},{nombre:"Tr\xE9veris/Trier",path:"europa/alemania/treveris"}]},{nombre:"Andorra",flag:"https://flagcdn.com/ad.svg",hijos:[{nombre:"Andorra",path:"europa/andorra/andorra"}]},{nombre:"Espa\xF1a",flag:"https://flagcdn.com/es.svg",hijos:[{nombre:"Andaluc\xEDa",hijos:[{nombre:"Huelva",hijos:[{nombre:"Huelva ciudad",path:"europa/espana/andalucia/huelva/huelva-ciudad"},{nombre:"Palos de la Frontera",path:"europa/espana/andalucia/huelva/palos"}]},{nombre:"C\xE1diz",hijos:[{nombre:"C\xE1diz ciudad",path:"europa/espana/andalucia/cadiz/cadiz-ciudad"},{nombre:"Grazalema",path:"europa/espana/andalucia/cadiz/grazalema"},{nombre:"Jerez de la Frontera",path:"europa/espana/andalucia/cadiz/jerez-de-la-frontera"},{nombre:"San Fernando",path:"europa/espana/andalucia/cadiz/san-fernando"},{nombre:"Setenil de las Bodegas",path:"europa/espana/andalucia/cadiz/setenil-de-las-bodegas"},{nombre:"Trebujena",path:"europa/espana/andalucia/cadiz/trebujena"}]},{nombre:"Sevilla",hijos:[{nombre:"Sevilla ciudad",path:"europa/espana/andalucia/sevilla/sevilla-ciudad"},{nombre:"Castilblanco de los Arroyos",path:"europa/espana/andalucia/sevilla/castilblanco-de-los-arroyos"},{nombre:"Coria del R\xEDo",path:"europa/espana/andalucia/sevilla/coria-del-rio"},{nombre:"Isla Mayor",path:"europa/espana/andalucia/sevilla/isla-mayor"},{nombre:"Mairena del Aljarafe",path:"europa/espana/andalucia/sevilla/mairena-del-aljarafe"},{nombre:"Palomares del R\xEDo",path:"europa/espana/andalucia/sevilla/palomares-del-rio"},{nombre:"El Real de la Jara",path:"europa/espana/andalucia/sevilla/real-de-la-jara"},{nombre:"Santiponce",path:"europa/espana/andalucia/sevilla/santiponce"}]},{nombre:"C\xF3rdoba",hijos:[{nombre:"C\xF3rdoba ciudad",path:"europa/espana/andalucia/cordoba/cordoba-ciudad"}]},{nombre:"M\xE1laga",hijos:[{nombre:"M\xE1laga ciudad",path:"europa/espana/andalucia/malaga/malaga-ciudad"}]},{nombre:"Ja\xE9n",hijos:[{nombre:"Ja\xE9n ciudad",path:"europa/espana/andalucia/jaen/jaen-ciudad"}]},{nombre:"Granada",hijos:[{nombre:"Granada ciudad",path:"europa/espana/andalucia/granada/granada-ciudad"}]},{nombre:"Almer\xEDa",hijos:[{nombre:"Almer\xEDa ciudad",path:"europa/espana/andalucia/almeria/almeria-ciudad"}]}]},{nombre:"Islas Baleares",hijos:[{nombre:"Mallorca",path:"europa/espana/baleares/mallorca"}]},{nombre:"Islas Canarias",hijos:[{nombre:"Tenerife",path:"europa/espana/canarias/tenerife"}]},{nombre:"Catalu\xF1a",hijos:[{nombre:"Gerona",hijos:[{nombre:"Gerona",path:"europa/espana/cataluna/gerona/gerona-ciudad"}]}]},{nombre:"Extremadura",hijos:[{nombre:"M\xE9rida",path:"europa/espana/extremadura/merida/merida-ciudad"},{nombre:"Badajoz",path:"europa/espana/extremadura/badajoz/badajoz-ciudad"},{nombre:"C\xE1ceres",hijos:[{nombre:"C\xE1ceres ciudad",path:"europa/espana/extremadura/caceres/caceres-ciudad"},{nombre:"Coria",path:"europa/espana/extremadura/caceres/coria"},{nombre:"Plasencia",path:"europa/espana/extremadura/caceres/plasencia"},{nombre:"Trujillo",path:"europa/espana/extremadura/caceres/trujillo"}]}]},{nombre:"Comunidad Madrid",hijos:[{nombre:"Madrid",path:"europa/espana/madrid/madrid-ciudad"}]},{nombre:"Murcia",hijos:[{nombre:"Murcia",path:"europa/espana/murcia/murcia-ciudad"},{nombre:"Cartagena",path:"europa/espana/murcia/cartagena"}]},{nombre:"Navarra",hijos:[{nombre:"Pamplona",path:"europa/espana/murcia/murcia-ciudad"}]},{nombre:"Pa\xEDs Vasco",hijos:[{nombre:"\xC1lava",hijos:[{nombre:"Vitoria-Gasteiz",path:"europa/espana/pais-vasco/alava/vitoria"}]},{nombre:"Guip\xFAzcoa",hijos:[{nombre:"San Sebasti\xE1n/Donostia",path:"europa/espana/pais-vasco/guipuzcoa/san-sebastian"}]},{nombre:"Vizcaya",hijos:[{nombre:"Bilbao",path:"europa/espana/pais-vasco/vizcaya/bilbao"}]}]},{nombre:"La Rioja",hijos:[{nombre:"Logro\xF1o",path:"europa/espana/rioja/logrono"}]},{nombre:"Ceuta",hijos:[{nombre:"Ceuta",path:"europa/espana/ceuta/ceuta-ciudad"}]}]},{nombre:"Gibraltar",flag:"https://flagcdn.com/gi.svg",hijos:[{nombre:"Gibraltar",path:"europa/gibraltar/gibraltar"}]},{nombre:"Irlanda",flag:"https://flagcdn.com/ie.svg",hijos:[{nombre:"Dublin",path:"europa/irlanda/dublin"}]},{nombre:"Italia",flag:"https://flagcdn.com/it.svg",hijos:[{nombre:"Roma y Ciudad del Vaticano",path:"europa/italia/roma-vaticano"}]},{nombre:"Pa\xEDses Bajos",flag:"https://flagcdn.com/nl.svg",hijos:[{nombre:"\xC1msterdam",path:"europa/paises-bajos/amsterdam"}]},{nombre:"Portugal",flag:"https://flagcdn.com/pt.svg",hijos:[{nombre:"Lisboa",path:"europa/portugal/lisboa"}]},{nombre:"Rumania",flag:"https://flagcdn.com/ro.svg",hijos:[{nombre:"Bucarest",path:"europa/rumania/bucarest"}]},{nombre:"Polonia",flag:"https://flagcdn.com/pl.svg",hijos:[{nombre:"Varsovia",path:"europa/polonia/varsovia"},{nombre:"Cracovia",path:"europa/polonia/cracovia"}]},{nombre:"Rep\xFAblica Checa",flag:"https://flagcdn.com/cz.svg",hijos:[{nombre:"Praga",path:"europa/andorra/praga"}]},{nombre:"Turqu\xEDa",flag:"https://flagcdn.com/tr.svg",hijos:[{nombre:"Estambul",path:"europa/turquia/estambul"}]}]},{nombre:"\xC1frica",hijos:[{nombre:"Marruecos",flag:"https://flagcdn.com/ma.svg",hijos:[{nombre:"T\xE1nger",path:"africa/marruecos/tanger"},{nombre:"Asilah/Arcila",path:"africa/marruecos/asilah"},{nombre:"Tetu\xE1n",path:"africa/marruecos/tetuan"},{nombre:"Chefchaouen/Chauen",path:"africa/marruecos/chefchaouen"}]}]},{nombre:"Am\xE9rica",hijos:[{nombre:"Norteam\xE9rica",hijos:[{nombre:"Estados Unidos",flag:"https://flagcdn.com/us.svg",hijos:[{nombre:"Nueva York",path:"america/norteamerica/usa/new-york"}]},{nombre:"M\xE9xico",flag:"https://flagcdn.com/mx.svg",hijos:[{nombre:"Riviera Maya",hijos:[{nombre:"Canc\xFAn",path:"america/norteamerica/mexico/riviera-maya/cancun"}]}]}]},{nombre:"Centroam\xE9rica",hijos:[]},{nombre:"Sudam\xE9rica",hijos:[{nombre:"Brasil",flag:"https://flagcdn.com/br.svg",hijos:[{nombre:"R\xEDo de Janeiro",path:"america/sudamerica/brasil/rio-de-janeiro"}]}]}]},{nombre:"Asia"},{nombre:"Ocean\xEDa"},{nombre:"Ant\xE1rtida"}];var L="primary",Xr=Symbol("RouteTitle"),Mm=class{params;constructor(t){this.params=t||{}}has(t){return Object.prototype.hasOwnProperty.call(this.params,t)}get(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n[0]:n}return null}getAll(t){if(this.has(t)){let n=this.params[t];return Array.isArray(n)?n:[n]}return[]}get keys(){return Object.keys(this.params)}};function Ta(e){return new Mm(e)}function Yy(e,t,n){let a=n.path.split("/");if(a.length>e.length||n.pathMatch==="full"&&(t.hasChildren()||a.length<e.length))return null;let o={};for(let r=0;r<a.length;r++){let i=a[r],s=e[r];if(i[0]===":")o[i.substring(1)]=s;else if(i!==s.path)return null}return{consumed:e.slice(0,a.length),posParams:o}}function mM(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(!Hn(e[n],t[n]))return!1;return!0}function Hn(e,t){let n=e?Tm(e):void 0,a=t?Tm(t):void 0;if(!n||!a||n.length!=a.length)return!1;let o;for(let r=0;r<n.length;r++)if(o=n[r],!Zy(e[o],t[o]))return!1;return!0}function Tm(e){return[...Object.keys(e),...Object.getOwnPropertySymbols(e)]}function Zy(e,t){if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;let n=[...e].sort(),a=[...t].sort();return n.every((o,r)=>a[r]===o)}else return e===t}function Ky(e){return e.length>0?e[e.length-1]:null}function ht(e){return Ol(e)?e:bo(e)?oe(Promise.resolve(e)):x(e)}var fM={exact:eb,subset:nb},Xy={exact:hM,subset:gM,ignored:()=>!0};function Uy(e,t,n){return fM[n.paths](e.root,t.root,n.matrixParams)&&Xy[n.queryParams](e.queryParams,t.queryParams)&&!(n.fragment==="exact"&&e.fragment!==t.fragment)}function hM(e,t){return Hn(e,t)}function eb(e,t,n){if(!Sa(e.segments,t.segments)||!Dc(e.segments,t.segments,n)||e.numberOfChildren!==t.numberOfChildren)return!1;for(let a in t.children)if(!e.children[a]||!eb(e.children[a],t.children[a],n))return!1;return!0}function gM(e,t){return Object.keys(t).length<=Object.keys(e).length&&Object.keys(t).every(n=>Zy(e[n],t[n]))}function nb(e,t,n){return tb(e,t,t.segments,n)}function tb(e,t,n,a){if(e.segments.length>n.length){let o=e.segments.slice(0,n.length);return!(!Sa(o,n)||t.hasChildren()||!Dc(o,n,a))}else if(e.segments.length===n.length){if(!Sa(e.segments,n)||!Dc(e.segments,n,a))return!1;for(let o in t.children)if(!e.children[o]||!nb(e.children[o],t.children[o],a))return!1;return!0}else{let o=n.slice(0,e.segments.length),r=n.slice(e.segments.length);return!Sa(e.segments,o)||!Dc(e.segments,o,a)||!e.children[L]?!1:tb(e.children[L],t,r,a)}}function Dc(e,t,n){return t.every((a,o)=>Xy[n](e[o].parameters,a.parameters))}var Wn=class{root;queryParams;fragment;_queryParamMap;constructor(t=new Y([],{}),n={},a=null){this.root=t,this.queryParams=n,this.fragment=a}get queryParamMap(){return this._queryParamMap??=Ta(this.queryParams),this._queryParamMap}toString(){return bM.serialize(this)}},Y=class{segments;children;parent=null;constructor(t,n){this.segments=t,this.children=n,Object.values(n).forEach(a=>a.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Ic(this)}},$n=class{path;parameters;_parameterMap;constructor(t,n){this.path=t,this.parameters=n}get parameterMap(){return this._parameterMap??=Ta(this.parameters),this._parameterMap}toString(){return ob(this)}};function vM(e,t){return Sa(e,t)&&e.every((n,a)=>Hn(n.parameters,t[a].parameters))}function Sa(e,t){return e.length!==t.length?!1:e.every((n,a)=>n.path===t[a].path)}function yM(e,t){let n=[];return Object.entries(e.children).forEach(([a,o])=>{a===L&&(n=n.concat(t(o,a)))}),Object.entries(e.children).forEach(([a,o])=>{a!==L&&(n=n.concat(t(o,a)))}),n}var xa=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:()=>new Gt,providedIn:"root"})}return e})(),Gt=class{parse(t){let n=new wm(t);return new Wn(n.parseRootSegment(),n.parseQueryParams(),n.parseFragment())}serialize(t){let n=`/${Br(t.root,!0)}`,a=_M(t.queryParams),o=typeof t.fragment=="string"?`#${EM(t.fragment)}`:"";return`${n}${a}${o}`}},bM=new Gt;function Ic(e){return e.segments.map(t=>ob(t)).join("/")}function Br(e,t){if(!e.hasChildren())return Ic(e);if(t){let n=e.children[L]?Br(e.children[L],!1):"",a=[];return Object.entries(e.children).forEach(([o,r])=>{o!==L&&a.push(`${o}:${Br(r,!1)}`)}),a.length>0?`${n}(${a.join("//")})`:n}else{let n=yM(e,(a,o)=>o===L?[Br(e.children[L],!1)]:[`${o}:${Br(a,!1)}`]);return Object.keys(e.children).length===1&&e.children[L]!=null?`${Ic(e)}/${n[0]}`:`${Ic(e)}/(${n.join("//")})`}}function ab(e){return encodeURIComponent(e).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Cc(e){return ab(e).replace(/%3B/gi,";")}function EM(e){return encodeURI(e)}function xm(e){return ab(e).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Sc(e){return decodeURIComponent(e)}function Hy(e){return Sc(e.replace(/\+/g,"%20"))}function ob(e){return`${xm(e.path)}${CM(e.parameters)}`}function CM(e){return Object.entries(e).map(([t,n])=>`;${xm(t)}=${xm(n)}`).join("")}function _M(e){let t=Object.entries(e).map(([n,a])=>Array.isArray(a)?a.map(o=>`${Cc(n)}=${Cc(o)}`).join("&"):`${Cc(n)}=${Cc(a)}`).filter(n=>n);return t.length?`?${t.join("&")}`:""}var DM=/^[^\/()?;#]+/;function _m(e){let t=e.match(DM);return t?t[0]:""}var IM=/^[^\/()?;=#]+/;function SM(e){let t=e.match(IM);return t?t[0]:""}var MM=/^[^=?&#]+/;function TM(e){let t=e.match(MM);return t?t[0]:""}var xM=/^[^&#]+/;function wM(e){let t=e.match(xM);return t?t[0]:""}var wm=class{url;remaining;constructor(t){this.url=t,this.remaining=t}parseRootSegment(){return this.consumeOptional("/"),this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new Y([],{}):new Y([],this.parseChildren())}parseQueryParams(){let t={};if(this.consumeOptional("?"))do this.parseQueryParam(t);while(this.consumeOptional("&"));return t}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(){if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let n={};this.peekStartsWith("/(")&&(this.capture("/"),n=this.parseParens(!0));let a={};return this.peekStartsWith("(")&&(a=this.parseParens(!1)),(t.length>0||Object.keys(n).length>0)&&(a[L]=new Y(t,n)),a}parseSegment(){let t=_m(this.remaining);if(t===""&&this.peekStartsWith(";"))throw new D(4009,!1);return this.capture(t),new $n(Sc(t),this.parseMatrixParams())}parseMatrixParams(){let t={};for(;this.consumeOptional(";");)this.parseParam(t);return t}parseParam(t){let n=SM(this.remaining);if(!n)return;this.capture(n);let a="";if(this.consumeOptional("=")){let o=_m(this.remaining);o&&(a=o,this.capture(a))}t[Sc(n)]=Sc(a)}parseQueryParam(t){let n=TM(this.remaining);if(!n)return;this.capture(n);let a="";if(this.consumeOptional("=")){let i=wM(this.remaining);i&&(a=i,this.capture(a))}let o=Hy(n),r=Hy(a);if(t.hasOwnProperty(o)){let i=t[o];Array.isArray(i)||(i=[i],t[o]=i),i.push(r)}else t[o]=r}parseParens(t){let n={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let a=_m(this.remaining),o=this.remaining[a.length];if(o!=="/"&&o!==")"&&o!==";")throw new D(4010,!1);let r;a.indexOf(":")>-1?(r=a.slice(0,a.indexOf(":")),this.capture(r),this.capture(":")):t&&(r=L);let i=this.parseChildren();n[r]=Object.keys(i).length===1?i[L]:new Y([],i),this.consumeOptional("//")}return n}peekStartsWith(t){return this.remaining.startsWith(t)}consumeOptional(t){return this.peekStartsWith(t)?(this.remaining=this.remaining.substring(t.length),!0):!1}capture(t){if(!this.consumeOptional(t))throw new D(4011,!1)}};function rb(e){return e.segments.length>0?new Y([],{[L]:e}):e}function ib(e){let t={};for(let[a,o]of Object.entries(e.children)){let r=ib(o);if(a===L&&r.segments.length===0&&r.hasChildren())for(let[i,s]of Object.entries(r.children))t[i]=s;else(r.segments.length>0||r.hasChildren())&&(t[a]=r)}let n=new Y(e.segments,t);return AM(n)}function AM(e){if(e.numberOfChildren===1&&e.children[L]){let t=e.children[L];return new Y(e.segments.concat(t.segments),t.children)}return e}function Wt(e){return e instanceof Wn}function sb(e,t,n=null,a=null){let o=cb(e);return lb(o,t,n,a)}function cb(e){let t;function n(r){let i={};for(let c of r.children){let l=n(c);i[c.outlet]=l}let s=new Y(r.url,i);return r===e&&(t=s),s}let a=n(e.root),o=rb(a);return t??o}function lb(e,t,n,a){let o=e;for(;o.parent;)o=o.parent;if(t.length===0)return Dm(o,o,o,n,a);let r=RM(t);if(r.toRoot())return Dm(o,o,new Y([],{}),n,a);let i=PM(r,o,e),s=i.processChildren?Ur(i.segmentGroup,i.index,r.commands):ub(i.segmentGroup,i.index,r.commands);return Dm(o,i.segmentGroup,s,n,a)}function Mc(e){return typeof e=="object"&&e!=null&&!e.outlets&&!e.segmentPath}function $r(e){return typeof e=="object"&&e!=null&&e.outlets}function Dm(e,t,n,a,o){let r={};a&&Object.entries(a).forEach(([c,l])=>{r[c]=Array.isArray(l)?l.map(d=>`${d}`):`${l}`});let i;e===t?i=n:i=db(e,t,n);let s=rb(ib(i));return new Wn(s,r,o)}function db(e,t,n){let a={};return Object.entries(e.children).forEach(([o,r])=>{r===t?a[o]=n:a[o]=db(r,t,n)}),new Y(e.segments,a)}var Tc=class{isAbsolute;numberOfDoubleDots;commands;constructor(t,n,a){if(this.isAbsolute=t,this.numberOfDoubleDots=n,this.commands=a,t&&a.length>0&&Mc(a[0]))throw new D(4003,!1);let o=a.find($r);if(o&&o!==Ky(a))throw new D(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function RM(e){if(typeof e[0]=="string"&&e.length===1&&e[0]==="/")return new Tc(!0,0,e);let t=0,n=!1,a=e.reduce((o,r,i)=>{if(typeof r=="object"&&r!=null){if(r.outlets){let s={};return Object.entries(r.outlets).forEach(([c,l])=>{s[c]=typeof l=="string"?l.split("/"):l}),[...o,{outlets:s}]}if(r.segmentPath)return[...o,r.segmentPath]}return typeof r!="string"?[...o,r]:i===0?(r.split("/").forEach((s,c)=>{c==0&&s==="."||(c==0&&s===""?n=!0:s===".."?t++:s!=""&&o.push(s))}),o):[...o,r]},[]);return new Tc(n,t,a)}var To=class{segmentGroup;processChildren;index;constructor(t,n,a){this.segmentGroup=t,this.processChildren=n,this.index=a}};function PM(e,t,n){if(e.isAbsolute)return new To(t,!0,0);if(!n)return new To(t,!1,NaN);if(n.parent===null)return new To(n,!0,0);let a=Mc(e.commands[0])?0:1,o=n.segments.length-1+a;return NM(n,o,e.numberOfDoubleDots)}function NM(e,t,n){let a=e,o=t,r=n;for(;r>o;){if(r-=o,a=a.parent,!a)throw new D(4005,!1);o=a.segments.length}return new To(a,!1,o-r)}function jM(e){return $r(e[0])?e[0].outlets:{[L]:e}}function ub(e,t,n){if(e??=new Y([],{}),e.segments.length===0&&e.hasChildren())return Ur(e,t,n);let a=OM(e,t,n),o=n.slice(a.commandIndex);if(a.match&&a.pathIndex<e.segments.length){let r=new Y(e.segments.slice(0,a.pathIndex),{});return r.children[L]=new Y(e.segments.slice(a.pathIndex),e.children),Ur(r,0,o)}else return a.match&&o.length===0?new Y(e.segments,{}):a.match&&!e.hasChildren()?Am(e,t,n):a.match?Ur(e,0,o):Am(e,t,n)}function Ur(e,t,n){if(n.length===0)return new Y(e.segments,{});{let a=jM(n),o={};if(Object.keys(a).some(r=>r!==L)&&e.children[L]&&e.numberOfChildren===1&&e.children[L].segments.length===0){let r=Ur(e.children[L],t,n);return new Y(e.segments,r.children)}return Object.entries(a).forEach(([r,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(o[r]=ub(e.children[r],t,i))}),Object.entries(e.children).forEach(([r,i])=>{a[r]===void 0&&(o[r]=i)}),new Y(e.segments,o)}}function OM(e,t,n){let a=0,o=t,r={match:!1,pathIndex:0,commandIndex:0};for(;o<e.segments.length;){if(a>=n.length)return r;let i=e.segments[o],s=n[a];if($r(s))break;let c=`${s}`,l=a<n.length-1?n[a+1]:null;if(o>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!Gy(c,l,i))return r;a+=2}else{if(!Gy(c,{},i))return r;a++}o++}return{match:!0,pathIndex:o,commandIndex:a}}function Am(e,t,n){let a=e.segments.slice(0,t),o=0;for(;o<n.length;){let r=n[o];if($r(r)){let c=LM(r.outlets);return new Y(a,c)}if(o===0&&Mc(n[0])){let c=e.segments[t];a.push(new $n(c.path,$y(n[0]))),o++;continue}let i=$r(r)?r.outlets[L]:`${r}`,s=o<n.length-1?n[o+1]:null;i&&s&&Mc(s)?(a.push(new $n(i,$y(s))),o+=2):(a.push(new $n(i,{})),o++)}return new Y(a,{})}function LM(e){let t={};return Object.entries(e).forEach(([n,a])=>{typeof a=="string"&&(a=[a]),a!==null&&(t[n]=Am(new Y([],{}),0,a))}),t}function $y(e){let t={};return Object.entries(e).forEach(([n,a])=>t[n]=`${a}`),t}function Gy(e,t,n){return e==n.path&&Hn(t,n.parameters)}var xo="imperative",Ce=(function(e){return e[e.NavigationStart=0]="NavigationStart",e[e.NavigationEnd=1]="NavigationEnd",e[e.NavigationCancel=2]="NavigationCancel",e[e.NavigationError=3]="NavigationError",e[e.RoutesRecognized=4]="RoutesRecognized",e[e.ResolveStart=5]="ResolveStart",e[e.ResolveEnd=6]="ResolveEnd",e[e.GuardsCheckStart=7]="GuardsCheckStart",e[e.GuardsCheckEnd=8]="GuardsCheckEnd",e[e.RouteConfigLoadStart=9]="RouteConfigLoadStart",e[e.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",e[e.ChildActivationStart=11]="ChildActivationStart",e[e.ChildActivationEnd=12]="ChildActivationEnd",e[e.ActivationStart=13]="ActivationStart",e[e.ActivationEnd=14]="ActivationEnd",e[e.Scroll=15]="Scroll",e[e.NavigationSkipped=16]="NavigationSkipped",e})(Ce||{}),tn=class{id;url;constructor(t,n){this.id=t,this.url=n}},Jt=class extends tn{type=Ce.NavigationStart;navigationTrigger;restoredState;constructor(t,n,a="imperative",o=null){super(t,n),this.navigationTrigger=a,this.restoredState=o}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Je=class extends tn{urlAfterRedirects;type=Ce.NavigationEnd;constructor(t,n,a){super(t,n),this.urlAfterRedirects=a}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},He=(function(e){return e[e.Redirect=0]="Redirect",e[e.SupersededByNewNavigation=1]="SupersededByNewNavigation",e[e.NoDataFromResolver=2]="NoDataFromResolver",e[e.GuardRejected=3]="GuardRejected",e[e.Aborted=4]="Aborted",e})(He||{}),Ao=(function(e){return e[e.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",e[e.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",e})(Ao||{}),Gn=class extends tn{reason;code;type=Ce.NavigationCancel;constructor(t,n,a,o){super(t,n),this.reason=a,this.code=o}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}},Jn=class extends tn{reason;code;type=Ce.NavigationSkipped;constructor(t,n,a,o){super(t,n),this.reason=a,this.code=o}},Ro=class extends tn{error;target;type=Ce.NavigationError;constructor(t,n,a,o){super(t,n),this.error=a,this.target=o}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Gr=class extends tn{urlAfterRedirects;state;type=Ce.RoutesRecognized;constructor(t,n,a,o){super(t,n),this.urlAfterRedirects=a,this.state=o}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},xc=class extends tn{urlAfterRedirects;state;type=Ce.GuardsCheckStart;constructor(t,n,a,o){super(t,n),this.urlAfterRedirects=a,this.state=o}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},wc=class extends tn{urlAfterRedirects;state;shouldActivate;type=Ce.GuardsCheckEnd;constructor(t,n,a,o,r){super(t,n),this.urlAfterRedirects=a,this.state=o,this.shouldActivate=r}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Ac=class extends tn{urlAfterRedirects;state;type=Ce.ResolveStart;constructor(t,n,a,o){super(t,n),this.urlAfterRedirects=a,this.state=o}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Rc=class extends tn{urlAfterRedirects;state;type=Ce.ResolveEnd;constructor(t,n,a,o){super(t,n),this.urlAfterRedirects=a,this.state=o}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Pc=class{route;type=Ce.RouteConfigLoadStart;constructor(t){this.route=t}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},Nc=class{route;type=Ce.RouteConfigLoadEnd;constructor(t){this.route=t}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},jc=class{snapshot;type=Ce.ChildActivationStart;constructor(t){this.snapshot=t}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Oc=class{snapshot;type=Ce.ChildActivationEnd;constructor(t){this.snapshot=t}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Lc=class{snapshot;type=Ce.ActivationStart;constructor(t){this.snapshot=t}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Fc=class{snapshot;type=Ce.ActivationEnd;constructor(t){this.snapshot=t}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Po=class{routerEvent;position;anchor;type=Ce.Scroll;constructor(t,n,a){this.routerEvent=t,this.position=n,this.anchor=a}toString(){let t=this.position?`${this.position[0]}, ${this.position[1]}`:null;return`Scroll(anchor: '${this.anchor}', position: '${t}')`}},Wr=class{},No=class{url;navigationBehaviorOptions;constructor(t,n){this.url=t,this.navigationBehaviorOptions=n}};function FM(e){return!(e instanceof Wr)&&!(e instanceof No)}function kM(e,t){return e.providers&&!e._injector&&(e._injector=vo(e.providers,t,`Route: ${e.path}`)),e._injector??t}function Tn(e){return e.outlet||L}function zM(e,t){let n=e.filter(a=>Tn(a)===t);return n.push(...e.filter(a=>Tn(a)!==t)),n}function Lo(e){if(!e)return null;if(e.routeConfig?._injector)return e.routeConfig._injector;for(let t=e.parent;t;t=t.parent){let n=t.routeConfig;if(n?._loadedInjector)return n._loadedInjector;if(n?._injector)return n._injector}return null}var kc=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return Lo(this.route?.snapshot)??this.rootInjector}constructor(t){this.rootInjector=t,this.children=new wa(this.rootInjector)}},wa=(()=>{class e{rootInjector;contexts=new Map;constructor(n){this.rootInjector=n}onChildOutletCreated(n,a){let o=this.getOrCreateContext(n);o.outlet=a,this.contexts.set(n,o)}onChildOutletDestroyed(n){let a=this.getContext(n);a&&(a.outlet=null,a.attachRef=null)}onOutletDeactivated(){let n=this.contexts;return this.contexts=new Map,n}onOutletReAttached(n){this.contexts=n}getOrCreateContext(n){let a=this.getContext(n);return a||(a=new kc(this.rootInjector),this.contexts.set(n,a)),a}getContext(n){return this.contexts.get(n)||null}static \u0275fac=function(a){return new(a||e)(M(se))};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),zc=class{_root;constructor(t){this._root=t}get root(){return this._root.value}parent(t){let n=this.pathFromRoot(t);return n.length>1?n[n.length-2]:null}children(t){let n=Rm(t,this._root);return n?n.children.map(a=>a.value):[]}firstChild(t){let n=Rm(t,this._root);return n&&n.children.length>0?n.children[0].value:null}siblings(t){let n=Pm(t,this._root);return n.length<2?[]:n[n.length-2].children.map(o=>o.value).filter(o=>o!==t)}pathFromRoot(t){return Pm(t,this._root).map(n=>n.value)}};function Rm(e,t){if(e===t.value)return t;for(let n of t.children){let a=Rm(e,n);if(a)return a}return null}function Pm(e,t){if(e===t.value)return[t];for(let n of t.children){let a=Pm(e,n);if(a.length)return a.unshift(t),a}return[]}var nn=class{value;children;constructor(t,n){this.value=t,this.children=n}toString(){return`TreeNode(${this.value})`}};function Mo(e){let t={};return e&&e.children.forEach(n=>t[n.value.outlet]=n),t}var Jr=class extends zc{snapshot;constructor(t,n){super(t),this.snapshot=n,qm(this,t)}toString(){return this.snapshot.toString()}};function pb(e){let t=qM(e),n=new be([new $n("",{})]),a=new be({}),o=new be({}),r=new be({}),i=new be(""),s=new un(n,a,r,i,o,L,e,t.root);return s.snapshot=t.root,new Jr(new nn(s,[]),t)}function qM(e){let t={},n={},a={},r=new Ma([],t,a,"",n,L,e,null,{});return new Qr("",new nn(r,[]))}var un=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(t,n,a,o,r,i,s,c){this.urlSubject=t,this.paramsSubject=n,this.queryParamsSubject=a,this.fragmentSubject=o,this.dataSubject=r,this.outlet=i,this.component=s,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(A(l=>l[Xr]))??x(void 0),this.url=t,this.params=n,this.queryParams=a,this.fragment=o,this.data=r}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(A(t=>Ta(t))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(A(t=>Ta(t))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function qc(e,t,n="emptyOnly"){let a,{routeConfig:o}=e;return t!==null&&(n==="always"||o?.path===""||!t.component&&!t.routeConfig?.loadComponent)?a={params:_(_({},t.params),e.params),data:_(_({},t.data),e.data),resolve:_(_(_(_({},e.data),t.data),o?.data),e._resolvedData)}:a={params:_({},e.params),data:_({},e.data),resolve:_(_({},e.data),e._resolvedData??{})},o&&fb(o)&&(a.resolve[Xr]=o.title),a}var Ma=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;get title(){return this.data?.[Xr]}constructor(t,n,a,o,r,i,s,c,l){this.url=t,this.params=n,this.queryParams=a,this.fragment=o,this.data=r,this.outlet=i,this.component=s,this.routeConfig=c,this._resolve=l}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=Ta(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=Ta(this.queryParams),this._queryParamMap}toString(){let t=this.url.map(a=>a.toString()).join("/"),n=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${t}', path:'${n}')`}},Qr=class extends zc{url;constructor(t,n){super(n),this.url=t,qm(this,n)}toString(){return mb(this._root)}};function qm(e,t){t.value._routerState=e,t.children.forEach(n=>qm(e,n))}function mb(e){let t=e.children.length>0?` { ${e.children.map(mb).join(", ")} } `:"";return`${e.value}${t}`}function Im(e){if(e.snapshot){let t=e.snapshot,n=e._futureSnapshot;e.snapshot=n,Hn(t.queryParams,n.queryParams)||e.queryParamsSubject.next(n.queryParams),t.fragment!==n.fragment&&e.fragmentSubject.next(n.fragment),Hn(t.params,n.params)||e.paramsSubject.next(n.params),mM(t.url,n.url)||e.urlSubject.next(n.url),Hn(t.data,n.data)||e.dataSubject.next(n.data)}else e.snapshot=e._futureSnapshot,e.dataSubject.next(e._futureSnapshot.data)}function Nm(e,t){let n=Hn(e.params,t.params)&&vM(e.url,t.url),a=!e.parent!=!t.parent;return n&&!a&&(!e.parent||Nm(e.parent,t.parent))}function fb(e){return typeof e.title=="string"||e.title===null}var hb=new I(""),ei=(()=>{class e{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=L;activateEvents=new ee;deactivateEvents=new ee;attachEvents=new ee;detachEvents=new ee;routerOutletData=my(void 0);parentContexts=p(wa);location=p(Ke);changeDetector=p(pt);inputBinder=p(ni,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(n){if(n.name){let{firstChange:a,previousValue:o}=n.name;if(a)return;this.isTrackedInParentContexts(o)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(o)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(n){return this.parentContexts.getContext(n)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let n=this.parentContexts.getContext(this.name);n?.route&&(n.attachRef?this.attach(n.attachRef,n.route):this.activateWith(n.route,n.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new D(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new D(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new D(4012,!1);this.location.detach();let n=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(n.instance),n}attach(n,a){this.activated=n,this._activatedRoute=a,this.location.insert(n.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(n.instance)}deactivate(){if(this.activated){let n=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(n)}}activateWith(n,a){if(this.isActivated)throw new D(4013,!1);this._activatedRoute=n;let o=this.location,i=n.snapshot.component,s=this.parentContexts.getOrCreateContext(this.name).children,c=new jm(n,s,o.injector,this.routerOutletData);this.activated=o.createComponent(i,{index:o.length,injector:c,environmentInjector:a}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(a){return new(a||e)};static \u0275dir=he({type:e,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[_n]})}return e})(),jm=class{route;childContexts;parent;outletData;constructor(t,n,a,o){this.route=t,this.childContexts=n,this.parent=a,this.outletData=o}get(t,n){return t===un?this.route:t===wa?this.childContexts:t===hb?this.outletData:this.parent.get(t,n)}},ni=new I(""),Bm=(()=>{class e{outletDataSubscriptions=new Map;bindActivatedRouteToOutletComponent(n){this.unsubscribeFromRouteData(n),this.subscribeToRouteData(n)}unsubscribeFromRouteData(n){this.outletDataSubscriptions.get(n)?.unsubscribe(),this.outletDataSubscriptions.delete(n)}subscribeToRouteData(n){let{activatedRoute:a}=n,o=ta([a.queryParams,a.params,a.data]).pipe(Re(([r,i,s],c)=>(s=_(_(_({},r),i),s),c===0?x(s):Promise.resolve(s)))).subscribe(r=>{if(!n.isActivated||!n.activatedComponentRef||n.activatedRoute!==a||a.component===null){this.unsubscribeFromRouteData(n);return}let i=gy(a.component);if(!i){this.unsubscribeFromRouteData(n);return}for(let{templateName:s}of i.inputs)n.activatedComponentRef.setInput(s,r[s])});this.outletDataSubscriptions.set(n,o)}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),Vm=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275cmp=me({type:e,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(a,o){a&1&&te(0,"router-outlet")},dependencies:[ei],encapsulation:2})}return e})();function Um(e){let t=e.children&&e.children.map(Um),n=t?J(_({},e),{children:t}):_({},e);return!n.component&&!n.loadComponent&&(t||n.loadChildren)&&n.outlet&&n.outlet!==L&&(n.component=Vm),n}function BM(e,t,n){let a=Yr(e,t._root,n?n._root:void 0);return new Jr(a,t)}function Yr(e,t,n){if(n&&e.shouldReuseRoute(t.value,n.value.snapshot)){let a=n.value;a._futureSnapshot=t.value;let o=VM(e,t,n);return new nn(a,o)}else{if(e.shouldAttach(t.value)){let r=e.retrieve(t.value);if(r!==null){let i=r.route;return i.value._futureSnapshot=t.value,i.children=t.children.map(s=>Yr(e,s)),i}}let a=UM(t.value),o=t.children.map(r=>Yr(e,r));return new nn(a,o)}}function VM(e,t,n){return t.children.map(a=>{for(let o of n.children)if(e.shouldReuseRoute(a.value,o.value.snapshot))return Yr(e,a,o);return Yr(e,a)})}function UM(e){return new un(new be(e.url),new be(e.params),new be(e.queryParams),new be(e.fragment),new be(e.data),e.outlet,e.component,e)}var jo=class{redirectTo;navigationBehaviorOptions;constructor(t,n){this.redirectTo=t,this.navigationBehaviorOptions=n}},gb="ngNavigationCancelingError";function Bc(e,t){let{redirectTo:n,navigationBehaviorOptions:a}=Wt(t)?{redirectTo:t,navigationBehaviorOptions:void 0}:t,o=vb(!1,He.Redirect);return o.url=n,o.navigationBehaviorOptions=a,o}function vb(e,t){let n=new Error(`NavigationCancelingError: ${e||""}`);return n[gb]=!0,n.cancellationCode=t,n}function HM(e){return yb(e)&&Wt(e.url)}function yb(e){return!!e&&e[gb]}var $M=(e,t,n,a)=>A(o=>(new Om(t,o.targetRouterState,o.currentRouterState,n,a).activate(e),o)),Om=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(t,n,a,o,r){this.routeReuseStrategy=t,this.futureState=n,this.currState=a,this.forwardEvent=o,this.inputBindingEnabled=r}activate(t){let n=this.futureState._root,a=this.currState?this.currState._root:null;this.deactivateChildRoutes(n,a,t),Im(this.futureState.root),this.activateChildRoutes(n,a,t)}deactivateChildRoutes(t,n,a){let o=Mo(n);t.children.forEach(r=>{let i=r.value.outlet;this.deactivateRoutes(r,o[i],a),delete o[i]}),Object.values(o).forEach(r=>{this.deactivateRouteAndItsChildren(r,a)})}deactivateRoutes(t,n,a){let o=t.value,r=n?n.value:null;if(o===r)if(o.component){let i=a.getContext(o.outlet);i&&this.deactivateChildRoutes(t,n,i.children)}else this.deactivateChildRoutes(t,n,a);else r&&this.deactivateRouteAndItsChildren(n,a)}deactivateRouteAndItsChildren(t,n){t.value.component&&this.routeReuseStrategy.shouldDetach(t.value.snapshot)?this.detachAndStoreRouteSubtree(t,n):this.deactivateRouteAndOutlet(t,n)}detachAndStoreRouteSubtree(t,n){let a=n.getContext(t.value.outlet),o=a&&t.value.component?a.children:n,r=Mo(t);for(let i of Object.values(r))this.deactivateRouteAndItsChildren(i,o);if(a&&a.outlet){let i=a.outlet.detach(),s=a.children.onOutletDeactivated();this.routeReuseStrategy.store(t.value.snapshot,{componentRef:i,route:t,contexts:s})}}deactivateRouteAndOutlet(t,n){let a=n.getContext(t.value.outlet),o=a&&t.value.component?a.children:n,r=Mo(t);for(let i of Object.values(r))this.deactivateRouteAndItsChildren(i,o);a&&(a.outlet&&(a.outlet.deactivate(),a.children.onOutletDeactivated()),a.attachRef=null,a.route=null)}activateChildRoutes(t,n,a){let o=Mo(n);t.children.forEach(r=>{this.activateRoutes(r,o[r.value.outlet],a),this.forwardEvent(new Fc(r.value.snapshot))}),t.children.length&&this.forwardEvent(new Oc(t.value.snapshot))}activateRoutes(t,n,a){let o=t.value,r=n?n.value:null;if(Im(o),o===r)if(o.component){let i=a.getOrCreateContext(o.outlet);this.activateChildRoutes(t,n,i.children)}else this.activateChildRoutes(t,n,a);else if(o.component){let i=a.getOrCreateContext(o.outlet);if(this.routeReuseStrategy.shouldAttach(o.snapshot)){let s=this.routeReuseStrategy.retrieve(o.snapshot);this.routeReuseStrategy.store(o.snapshot,null),i.children.onOutletReAttached(s.contexts),i.attachRef=s.componentRef,i.route=s.route.value,i.outlet&&i.outlet.attach(s.componentRef,s.route.value),Im(s.route.value),this.activateChildRoutes(t,null,i.children)}else i.attachRef=null,i.route=o,i.outlet&&i.outlet.activateWith(o,i.injector),this.activateChildRoutes(t,null,i.children)}else this.activateChildRoutes(t,null,a)}},Vc=class{path;route;constructor(t){this.path=t,this.route=this.path[this.path.length-1]}},wo=class{component;route;constructor(t,n){this.component=t,this.route=n}};function GM(e,t,n){let a=e._root,o=t?t._root:null;return Vr(a,o,n,[a.value])}function WM(e){let t=e.routeConfig?e.routeConfig.canActivateChild:null;return!t||t.length===0?null:{node:e,guards:t}}function Fo(e,t){let n=Symbol(),a=t.get(e,n);return a===n?typeof e=="function"&&!nd(e)?e:t.get(e):a}function Vr(e,t,n,a,o={canDeactivateChecks:[],canActivateChecks:[]}){let r=Mo(t);return e.children.forEach(i=>{JM(i,r[i.value.outlet],n,a.concat([i.value]),o),delete r[i.value.outlet]}),Object.entries(r).forEach(([i,s])=>Hr(s,n.getContext(i),o)),o}function JM(e,t,n,a,o={canDeactivateChecks:[],canActivateChecks:[]}){let r=e.value,i=t?t.value:null,s=n?n.getContext(e.value.outlet):null;if(i&&r.routeConfig===i.routeConfig){let c=QM(i,r,r.routeConfig.runGuardsAndResolvers);c?o.canActivateChecks.push(new Vc(a)):(r.data=i.data,r._resolvedData=i._resolvedData),r.component?Vr(e,t,s?s.children:null,a,o):Vr(e,t,n,a,o),c&&s&&s.outlet&&s.outlet.isActivated&&o.canDeactivateChecks.push(new wo(s.outlet.component,i))}else i&&Hr(t,s,o),o.canActivateChecks.push(new Vc(a)),r.component?Vr(e,null,s?s.children:null,a,o):Vr(e,null,n,a,o);return o}function QM(e,t,n){if(typeof n=="function")return n(e,t);switch(n){case"pathParamsChange":return!Sa(e.url,t.url);case"pathParamsOrQueryParamsChange":return!Sa(e.url,t.url)||!Hn(e.queryParams,t.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!Nm(e,t)||!Hn(e.queryParams,t.queryParams);case"paramsChange":default:return!Nm(e,t)}}function Hr(e,t,n){let a=Mo(e),o=e.value;Object.entries(a).forEach(([r,i])=>{o.component?t?Hr(i,t.children.getContext(r),n):Hr(i,null,n):Hr(i,t,n)}),o.component?t&&t.outlet&&t.outlet.isActivated?n.canDeactivateChecks.push(new wo(t.outlet.component,o)):n.canDeactivateChecks.push(new wo(null,o)):n.canDeactivateChecks.push(new wo(null,o))}function ti(e){return typeof e=="function"}function YM(e){return typeof e=="boolean"}function ZM(e){return e&&ti(e.canLoad)}function KM(e){return e&&ti(e.canActivate)}function XM(e){return e&&ti(e.canActivateChild)}function eT(e){return e&&ti(e.canDeactivate)}function nT(e){return e&&ti(e.canMatch)}function bb(e){return e instanceof Yn||e?.name==="EmptyError"}var _c=Symbol("INITIAL_VALUE");function Oo(){return Re(e=>ta(e.map(t=>t.pipe(ke(1),Dt(_c)))).pipe(A(t=>{for(let n of t)if(n!==!0){if(n===_c)return _c;if(n===!1||tT(n))return n}return!0}),ne(t=>t!==_c),ke(1)))}function tT(e){return Wt(e)||e instanceof jo}function aT(e,t){return fe(n=>{let{targetSnapshot:a,currentSnapshot:o,guards:{canActivateChecks:r,canDeactivateChecks:i}}=n;return i.length===0&&r.length===0?x(J(_({},n),{guardsResult:!0})):oT(i,a,o,e).pipe(fe(s=>s&&YM(s)?rT(a,r,e,t):x(s)),A(s=>J(_({},n),{guardsResult:s})))})}function oT(e,t,n,a){return oe(e).pipe(fe(o=>dT(o.component,o.route,n,t,a)),Zn(o=>o!==!0,!0))}function rT(e,t,n,a){return oe(t).pipe(Rn(o=>Et(sT(o.route.parent,a),iT(o.route,a),lT(e,o.path,n),cT(e,o.route,n))),Zn(o=>o!==!0,!0))}function iT(e,t){return e!==null&&t&&t(new Lc(e)),x(!0)}function sT(e,t){return e!==null&&t&&t(new jc(e)),x(!0)}function cT(e,t,n){let a=t.routeConfig?t.routeConfig.canActivate:null;if(!a||a.length===0)return x(!0);let o=a.map(r=>Wo(()=>{let i=Lo(t)??n,s=Fo(r,i),c=KM(s)?s.canActivate(t,e):Te(i,()=>s(t,e));return ht(c).pipe(Zn())}));return x(o).pipe(Oo())}function lT(e,t,n){let a=t[t.length-1],r=t.slice(0,t.length-1).reverse().map(i=>WM(i)).filter(i=>i!==null).map(i=>Wo(()=>{let s=i.guards.map(c=>{let l=Lo(i.node)??n,d=Fo(c,l),u=XM(d)?d.canActivateChild(a,e):Te(l,()=>d(a,e));return ht(u).pipe(Zn())});return x(s).pipe(Oo())}));return x(r).pipe(Oo())}function dT(e,t,n,a,o){let r=t&&t.routeConfig?t.routeConfig.canDeactivate:null;if(!r||r.length===0)return x(!0);let i=r.map(s=>{let c=Lo(t)??o,l=Fo(s,c),d=eT(l)?l.canDeactivate(e,t,n,a):Te(c,()=>l(e,t,n,a));return ht(d).pipe(Zn())});return x(i).pipe(Oo())}function uT(e,t,n,a){let o=t.canLoad;if(o===void 0||o.length===0)return x(!0);let r=o.map(i=>{let s=Fo(i,e),c=ZM(s)?s.canLoad(t,n):Te(e,()=>s(t,n));return ht(c)});return x(r).pipe(Oo(),Eb(a))}function Eb(e){return wl(re(t=>{if(typeof t!="boolean")throw Bc(e,t)}),A(t=>t===!0))}function pT(e,t,n,a){let o=t.canMatch;if(!o||o.length===0)return x(!0);let r=o.map(i=>{let s=Fo(i,e),c=nT(s)?s.canMatch(t,n):Te(e,()=>s(t,n));return ht(c)});return x(r).pipe(Oo(),Eb(a))}var Zr=class{segmentGroup;constructor(t){this.segmentGroup=t||null}},Kr=class extends Error{urlTree;constructor(t){super(),this.urlTree=t}};function So(e){return yt(new Zr(e))}function mT(e){return yt(new D(4e3,!1))}function fT(e){return yt(vb(!1,He.GuardRejected))}var Lm=class{urlSerializer;urlTree;constructor(t,n){this.urlSerializer=t,this.urlTree=n}lineralizeSegments(t,n){let a=[],o=n.root;for(;;){if(a=a.concat(o.segments),o.numberOfChildren===0)return x(a);if(o.numberOfChildren>1||!o.children[L])return mT(`${t.redirectTo}`);o=o.children[L]}}applyRedirectCommands(t,n,a,o,r){return hT(n,o,r).pipe(A(i=>{if(i instanceof Wn)throw new Kr(i);let s=this.applyRedirectCreateUrlTree(i,this.urlSerializer.parse(i),t,a);if(i[0]==="/")throw new Kr(s);return s}))}applyRedirectCreateUrlTree(t,n,a,o){let r=this.createSegmentGroup(t,n.root,a,o);return new Wn(r,this.createQueryParams(n.queryParams,this.urlTree.queryParams),n.fragment)}createQueryParams(t,n){let a={};return Object.entries(t).forEach(([o,r])=>{if(typeof r=="string"&&r[0]===":"){let s=r.substring(1);a[o]=n[s]}else a[o]=r}),a}createSegmentGroup(t,n,a,o){let r=this.createSegments(t,n.segments,a,o),i={};return Object.entries(n.children).forEach(([s,c])=>{i[s]=this.createSegmentGroup(t,c,a,o)}),new Y(r,i)}createSegments(t,n,a,o){return n.map(r=>r.path[0]===":"?this.findPosParam(t,r,o):this.findOrReturn(r,a))}findPosParam(t,n,a){let o=a[n.path.substring(1)];if(!o)throw new D(4001,!1);return o}findOrReturn(t,n){let a=0;for(let o of n){if(o.path===t.path)return n.splice(a),o;a++}return t}};function hT(e,t,n){if(typeof e=="string")return x(e);let a=e,{queryParams:o,fragment:r,routeConfig:i,url:s,outlet:c,params:l,data:d,title:u}=t;return ht(Te(n,()=>a({params:l,data:d,queryParams:o,fragment:r,routeConfig:i,url:s,outlet:c,title:u})))}var Fm={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function gT(e,t,n,a,o){let r=Cb(e,t,n);return r.matched?(a=kM(t,a),pT(a,t,n,o).pipe(A(i=>i===!0?r:_({},Fm)))):x(r)}function Cb(e,t,n){if(t.path==="**")return vT(n);if(t.path==="")return t.pathMatch==="full"&&(e.hasChildren()||n.length>0)?_({},Fm):{matched:!0,consumedSegments:[],remainingSegments:n,parameters:{},positionalParamSegments:{}};let o=(t.matcher||Yy)(n,e,t);if(!o)return _({},Fm);let r={};Object.entries(o.posParams??{}).forEach(([s,c])=>{r[s]=c.path});let i=o.consumed.length>0?_(_({},r),o.consumed[o.consumed.length-1].parameters):r;return{matched:!0,consumedSegments:o.consumed,remainingSegments:n.slice(o.consumed.length),parameters:i,positionalParamSegments:o.posParams??{}}}function vT(e){return{matched:!0,parameters:e.length>0?Ky(e).parameters:{},consumedSegments:e,remainingSegments:[],positionalParamSegments:{}}}function Wy(e,t,n,a){return n.length>0&&ET(e,n,a)?{segmentGroup:new Y(t,bT(a,new Y(n,e.children))),slicedSegments:[]}:n.length===0&&CT(e,n,a)?{segmentGroup:new Y(e.segments,yT(e,n,a,e.children)),slicedSegments:n}:{segmentGroup:new Y(e.segments,e.children),slicedSegments:n}}function yT(e,t,n,a){let o={};for(let r of n)if(Hc(e,t,r)&&!a[Tn(r)]){let i=new Y([],{});o[Tn(r)]=i}return _(_({},a),o)}function bT(e,t){let n={};n[L]=t;for(let a of e)if(a.path===""&&Tn(a)!==L){let o=new Y([],{});n[Tn(a)]=o}return n}function ET(e,t,n){return n.some(a=>Hc(e,t,a)&&Tn(a)!==L)}function CT(e,t,n){return n.some(a=>Hc(e,t,a))}function Hc(e,t,n){return(e.hasChildren()||t.length>0)&&n.pathMatch==="full"?!1:n.path===""}function _T(e,t,n){return t.length===0&&!e.children[n]}var km=class{};function DT(e,t,n,a,o,r,i="emptyOnly"){return new zm(e,t,n,a,o,i,r).recognize()}var IT=31,zm=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(t,n,a,o,r,i,s){this.injector=t,this.configLoader=n,this.rootComponentType=a,this.config=o,this.urlTree=r,this.paramsInheritanceStrategy=i,this.urlSerializer=s,this.applyRedirects=new Lm(this.urlSerializer,this.urlTree)}noMatchError(t){return new D(4002,`'${t.segmentGroup}'`)}recognize(){let t=Wy(this.urlTree.root,[],[],this.config).segmentGroup;return this.match(t).pipe(A(({children:n,rootSnapshot:a})=>{let o=new nn(a,n),r=new Qr("",o),i=sb(a,[],this.urlTree.queryParams,this.urlTree.fragment);return i.queryParams=this.urlTree.queryParams,r.url=this.urlSerializer.serialize(i),{state:r,tree:i}}))}match(t){let n=new Ma([],Object.freeze({}),Object.freeze(_({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),L,this.rootComponentType,null,{});return this.processSegmentGroup(this.injector,this.config,t,L,n).pipe(A(a=>({children:a,rootSnapshot:n})),mn(a=>{if(a instanceof Kr)return this.urlTree=a.urlTree,this.match(a.urlTree.root);throw a instanceof Zr?this.noMatchError(a):a}))}processSegmentGroup(t,n,a,o,r){return a.segments.length===0&&a.hasChildren()?this.processChildren(t,n,a,r):this.processSegment(t,n,a,a.segments,o,!0,r).pipe(A(i=>i instanceof nn?[i]:[]))}processChildren(t,n,a,o){let r=[];for(let i of Object.keys(a.children))i==="primary"?r.unshift(i):r.push(i);return oe(r).pipe(Rn(i=>{let s=a.children[i],c=zM(n,i);return this.processSegmentGroup(t,c,s,i,o)}),ql((i,s)=>(i.push(...s),i)),Ct(null),zl(),fe(i=>{if(i===null)return So(a);let s=_b(i);return ST(s),x(s)}))}processSegment(t,n,a,o,r,i,s){return oe(n).pipe(Rn(c=>this.processSegmentAgainstRoute(c._injector??t,n,c,a,o,r,i,s).pipe(mn(l=>{if(l instanceof Zr)return x(null);throw l}))),Zn(c=>!!c),mn(c=>{if(bb(c))return _T(a,o,r)?x(new km):So(a);throw c}))}processSegmentAgainstRoute(t,n,a,o,r,i,s,c){return Tn(a)!==i&&(i===L||!Hc(o,r,a))?So(o):a.redirectTo===void 0?this.matchSegmentAgainstRoute(t,o,a,r,i,c):this.allowRedirects&&s?this.expandSegmentAgainstRouteUsingRedirect(t,o,n,a,r,i,c):So(o)}expandSegmentAgainstRouteUsingRedirect(t,n,a,o,r,i,s){let{matched:c,parameters:l,consumedSegments:d,positionalParamSegments:u,remainingSegments:f}=Cb(n,o,r);if(!c)return So(n);typeof o.redirectTo=="string"&&o.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>IT&&(this.allowRedirects=!1));let m=new Ma(r,l,Object.freeze(_({},this.urlTree.queryParams)),this.urlTree.fragment,Jy(o),Tn(o),o.component??o._loadedComponent??null,o,Qy(o)),E=qc(m,s,this.paramsInheritanceStrategy);return m.params=Object.freeze(E.params),m.data=Object.freeze(E.data),this.applyRedirects.applyRedirectCommands(d,o.redirectTo,u,m,t).pipe(Re(U=>this.applyRedirects.lineralizeSegments(o,U)),fe(U=>this.processSegment(t,a,n,U.concat(f),i,!1,s)))}matchSegmentAgainstRoute(t,n,a,o,r,i){let s=gT(n,a,o,t,this.urlSerializer);return a.path==="**"&&(n.children={}),s.pipe(Re(c=>c.matched?(t=a._injector??t,this.getChildConfig(t,a,o).pipe(Re(({routes:l})=>{let d=a._loadedInjector??t,{parameters:u,consumedSegments:f,remainingSegments:m}=c,E=new Ma(f,u,Object.freeze(_({},this.urlTree.queryParams)),this.urlTree.fragment,Jy(a),Tn(a),a.component??a._loadedComponent??null,a,Qy(a)),T=qc(E,i,this.paramsInheritanceStrategy);E.params=Object.freeze(T.params),E.data=Object.freeze(T.data);let{segmentGroup:U,slicedSegments:j}=Wy(n,f,m,l);if(j.length===0&&U.hasChildren())return this.processChildren(d,l,U,E).pipe(A(vt=>new nn(E,vt)));if(l.length===0&&j.length===0)return x(new nn(E,[]));let xn=Tn(a)===r;return this.processSegment(d,l,U,j,xn?L:r,!0,E).pipe(A(vt=>new nn(E,vt instanceof nn?[vt]:[])))}))):So(n)))}getChildConfig(t,n,a){return n.children?x({routes:n.children,injector:t}):n.loadChildren?n._loadedRoutes!==void 0?x({routes:n._loadedRoutes,injector:n._loadedInjector}):uT(t,n,a,this.urlSerializer).pipe(fe(o=>o?this.configLoader.loadChildren(t,n).pipe(re(r=>{n._loadedRoutes=r.routes,n._loadedInjector=r.injector})):fT(n))):x({routes:[],injector:t})}};function ST(e){e.sort((t,n)=>t.value.outlet===L?-1:n.value.outlet===L?1:t.value.outlet.localeCompare(n.value.outlet))}function MT(e){let t=e.value.routeConfig;return t&&t.path===""}function _b(e){let t=[],n=new Set;for(let a of e){if(!MT(a)){t.push(a);continue}let o=t.find(r=>a.value.routeConfig===r.value.routeConfig);o!==void 0?(o.children.push(...a.children),n.add(o)):t.push(a)}for(let a of n){let o=_b(a.children);t.push(new nn(a.value,o))}return t.filter(a=>!n.has(a))}function Jy(e){return e.data||{}}function Qy(e){return e.resolve||{}}function TT(e,t,n,a,o,r){return fe(i=>DT(e,t,n,a,i.extractedUrl,o,r).pipe(A(({state:s,tree:c})=>J(_({},i),{targetSnapshot:s,urlAfterRedirects:c}))))}function xT(e,t){return fe(n=>{let{targetSnapshot:a,guards:{canActivateChecks:o}}=n;if(!o.length)return x(n);let r=new Set(o.map(c=>c.route)),i=new Set;for(let c of r)if(!i.has(c))for(let l of Db(c))i.add(l);let s=0;return oe(i).pipe(Rn(c=>r.has(c)?wT(c,a,e,t):(c.data=qc(c,c.parent,e).resolve,x(void 0))),re(()=>s++),Ja(1),fe(c=>s===i.size?x(n):_e))})}function Db(e){let t=e.children.map(n=>Db(n)).flat();return[e,...t]}function wT(e,t,n,a){let o=e.routeConfig,r=e._resolve;return o?.title!==void 0&&!fb(o)&&(r[Xr]=o.title),Wo(()=>(e.data=qc(e,e.parent,n).resolve,AT(r,e,t,a).pipe(A(i=>(e._resolvedData=i,e.data=_(_({},e.data),i),null)))))}function AT(e,t,n,a){let o=Tm(e);if(o.length===0)return x({});let r={};return oe(o).pipe(fe(i=>RT(e[i],t,n,a).pipe(Zn(),re(s=>{if(s instanceof jo)throw Bc(new Gt,s);r[i]=s}))),Ja(1),A(()=>r),mn(i=>bb(i)?_e:yt(i)))}function RT(e,t,n,a){let o=Lo(t)??a,r=Fo(e,o),i=r.resolve?r.resolve(t,n):Te(o,()=>r(t,n));return ht(i)}function Sm(e){return Re(t=>{let n=e(t);return n?oe(n).pipe(A(()=>t)):x(t)})}var Hm=(()=>{class e{buildTitle(n){let a,o=n.root;for(;o!==void 0;)a=this.getResolvedTitleForRoute(o)??a,o=o.children.find(r=>r.outlet===L);return a}getResolvedTitleForRoute(n){return n.data[Xr]}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:()=>p(Ib),providedIn:"root"})}return e})(),Ib=(()=>{class e extends Hm{title;constructor(n){super(),this.title=n}updateTitle(n){let a=this.buildTitle(n);a!==void 0&&this.title.setTitle(a)}static \u0275fac=function(a){return new(a||e)(M(qy))};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Qt=new I("",{providedIn:"root",factory:()=>({})}),Aa=new I(""),$c=(()=>{class e{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=p(Lp);loadComponent(n,a){if(this.componentLoaders.get(a))return this.componentLoaders.get(a);if(a._loadedComponent)return x(a._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(a);let o=ht(Te(n,()=>a.loadComponent())).pipe(A(Mb),Re(Tb),re(i=>{this.onLoadEndListener&&this.onLoadEndListener(a),a._loadedComponent=i}),_t(()=>{this.componentLoaders.delete(a)})),r=new Ga(o,()=>new H).pipe($a());return this.componentLoaders.set(a,r),r}loadChildren(n,a){if(this.childrenLoaders.get(a))return this.childrenLoaders.get(a);if(a._loadedRoutes)return x({routes:a._loadedRoutes,injector:a._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(a);let r=Sb(a,this.compiler,n,this.onLoadEndListener).pipe(_t(()=>{this.childrenLoaders.delete(a)})),i=new Ga(r,()=>new H).pipe($a());return this.childrenLoaders.set(a,i),i}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Sb(e,t,n,a){return ht(Te(n,()=>e.loadChildren())).pipe(A(Mb),Re(Tb),fe(o=>o instanceof Zs||Array.isArray(o)?x(o):oe(t.compileModuleAsync(o))),A(o=>{a&&a(e);let r,i,s=!1;return Array.isArray(o)?(i=o,s=!0):(r=o.create(n).injector,i=r.get(Aa,[],{optional:!0,self:!0}).flat()),{routes:i.map(Um),injector:r}}))}function PT(e){return e&&typeof e=="object"&&"default"in e}function Mb(e){return PT(e)?e.default:e}function Tb(e){return x(e)}var Gc=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:()=>p(NT),providedIn:"root"})}return e})(),NT=(()=>{class e{shouldProcessUrl(n){return!0}extract(n){return n}merge(n,a){return n}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),$m=new I(""),Gm=new I("");function xb(e,t,n){let a=e.get(Gm),o=e.get($);if(!o.startViewTransition||a.skipNextTransition)return a.skipNextTransition=!1,new Promise(l=>setTimeout(l));let r,i=new Promise(l=>{r=l}),s=o.startViewTransition(()=>(r(),jT(e)));s.ready.catch(l=>{});let{onViewTransitionCreated:c}=a;return c&&Te(e,()=>c({transition:s,from:t,to:n})),i}function jT(e){return new Promise(t=>{ec({read:()=>setTimeout(t)},{injector:e})})}var Wm=new I(""),Wc=(()=>{class e{currentNavigation=We(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=null;events=new H;transitionAbortWithErrorSubject=new H;configLoader=p($c);environmentInjector=p(se);destroyRef=p(vn);urlSerializer=p(xa);rootContexts=p(wa);location=p(Ht);inputBindingEnabled=p(ni,{optional:!0})!==null;titleStrategy=p(Hm);options=p(Qt,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=p(Gc);createViewTransition=p($m,{optional:!0});navigationErrorHandler=p(Wm,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>x(void 0);rootComponentType=null;destroyed=!1;constructor(){let n=o=>this.events.next(new Pc(o)),a=o=>this.events.next(new Nc(o));this.configLoader.onLoadEndListener=a,this.configLoader.onLoadStartListener=n,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(n){let a=++this.navigationId;Vn(()=>{this.transitions?.next(J(_({},n),{extractedUrl:this.urlHandlingStrategy.extract(n.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,abortController:new AbortController,id:a}))})}setupNavigations(n){return this.transitions=new be(null),this.transitions.pipe(ne(a=>a!==null),Re(a=>{let o=!1;return x(a).pipe(Re(r=>{if(this.navigationId>a.id)return this.cancelNavigationTransition(a,"",He.SupersededByNewNavigation),_e;this.currentTransition=a,this.currentNavigation.set({id:r.id,initialUrl:r.rawUrl,extractedUrl:r.extractedUrl,targetBrowserUrl:typeof r.extras.browserUrl=="string"?this.urlSerializer.parse(r.extras.browserUrl):r.extras.browserUrl,trigger:r.source,extras:r.extras,previousNavigation:this.lastSuccessfulNavigation?J(_({},this.lastSuccessfulNavigation),{previousNavigation:null}):null,abort:()=>r.abortController.abort()});let i=!n.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),s=r.extras.onSameUrlNavigation??n.onSameUrlNavigation;if(!i&&s!=="reload")return this.events.next(new Jn(r.id,this.urlSerializer.serialize(r.rawUrl),"",Ao.IgnoredSameUrlNavigation)),r.resolve(!1),_e;if(this.urlHandlingStrategy.shouldProcessUrl(r.rawUrl))return x(r).pipe(Re(c=>(this.events.next(new Jt(c.id,this.urlSerializer.serialize(c.extractedUrl),c.source,c.restoredState)),c.id!==this.navigationId?_e:Promise.resolve(c))),TT(this.environmentInjector,this.configLoader,this.rootComponentType,n.config,this.urlSerializer,this.paramsInheritanceStrategy),re(c=>{a.targetSnapshot=c.targetSnapshot,a.urlAfterRedirects=c.urlAfterRedirects,this.currentNavigation.update(d=>(d.finalUrl=c.urlAfterRedirects,d));let l=new Gr(c.id,this.urlSerializer.serialize(c.extractedUrl),this.urlSerializer.serialize(c.urlAfterRedirects),c.targetSnapshot);this.events.next(l)}));if(i&&this.urlHandlingStrategy.shouldProcessUrl(r.currentRawUrl)){let{id:c,extractedUrl:l,source:d,restoredState:u,extras:f}=r,m=new Jt(c,this.urlSerializer.serialize(l),d,u);this.events.next(m);let E=pb(this.rootComponentType).snapshot;return this.currentTransition=a=J(_({},r),{targetSnapshot:E,urlAfterRedirects:l,extras:J(_({},f),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(T=>(T.finalUrl=l,T)),x(a)}else return this.events.next(new Jn(r.id,this.urlSerializer.serialize(r.extractedUrl),"",Ao.IgnoredByUrlHandlingStrategy)),r.resolve(!1),_e}),re(r=>{let i=new xc(r.id,this.urlSerializer.serialize(r.extractedUrl),this.urlSerializer.serialize(r.urlAfterRedirects),r.targetSnapshot);this.events.next(i)}),A(r=>(this.currentTransition=a=J(_({},r),{guards:GM(r.targetSnapshot,r.currentSnapshot,this.rootContexts)}),a)),aT(this.environmentInjector,r=>this.events.next(r)),re(r=>{if(a.guardsResult=r.guardsResult,r.guardsResult&&typeof r.guardsResult!="boolean")throw Bc(this.urlSerializer,r.guardsResult);let i=new wc(r.id,this.urlSerializer.serialize(r.extractedUrl),this.urlSerializer.serialize(r.urlAfterRedirects),r.targetSnapshot,!!r.guardsResult);this.events.next(i)}),ne(r=>r.guardsResult?!0:(this.cancelNavigationTransition(r,"",He.GuardRejected),!1)),Sm(r=>{if(r.guards.canActivateChecks.length!==0)return x(r).pipe(re(i=>{let s=new Ac(i.id,this.urlSerializer.serialize(i.extractedUrl),this.urlSerializer.serialize(i.urlAfterRedirects),i.targetSnapshot);this.events.next(s)}),Re(i=>{let s=!1;return x(i).pipe(xT(this.paramsInheritanceStrategy,this.environmentInjector),re({next:()=>s=!0,complete:()=>{s||this.cancelNavigationTransition(i,"",He.NoDataFromResolver)}}))}),re(i=>{let s=new Rc(i.id,this.urlSerializer.serialize(i.extractedUrl),this.urlSerializer.serialize(i.urlAfterRedirects),i.targetSnapshot);this.events.next(s)}))}),Sm(r=>{let i=s=>{let c=[];if(s.routeConfig?.loadComponent){let l=Lo(s)??this.environmentInjector;c.push(this.configLoader.loadComponent(l,s.routeConfig).pipe(re(d=>{s.component=d}),A(()=>{})))}for(let l of s.children)c.push(...i(l));return c};return ta(i(r.targetSnapshot.root)).pipe(Ct(null),ke(1))}),Sm(()=>this.afterPreactivation()),Re(()=>{let{currentSnapshot:r,targetSnapshot:i}=a,s=this.createViewTransition?.(this.environmentInjector,r.root,i.root);return s?oe(s).pipe(A(()=>a)):x(a)}),A(r=>{let i=BM(n.routeReuseStrategy,r.targetSnapshot,r.currentRouterState);return this.currentTransition=a=J(_({},r),{targetRouterState:i}),this.currentNavigation.update(s=>(s.targetRouterState=i,s)),a}),re(()=>{this.events.next(new Wr)}),$M(this.rootContexts,n.routeReuseStrategy,r=>this.events.next(r),this.inputBindingEnabled),ke(1),It(new B(r=>{let i=a.abortController.signal,s=()=>r.next();return i.addEventListener("abort",s),()=>i.removeEventListener("abort",s)}).pipe(ne(()=>!o&&!a.targetRouterState),re(()=>{this.cancelNavigationTransition(a,a.abortController.signal.reason+"",He.Aborted)}))),re({next:r=>{o=!0,this.lastSuccessfulNavigation=Vn(this.currentNavigation),this.events.next(new Je(r.id,this.urlSerializer.serialize(r.extractedUrl),this.urlSerializer.serialize(r.urlAfterRedirects))),this.titleStrategy?.updateTitle(r.targetRouterState.snapshot),r.resolve(!0)},complete:()=>{o=!0}}),It(this.transitionAbortWithErrorSubject.pipe(re(r=>{throw r}))),_t(()=>{o||this.cancelNavigationTransition(a,"",He.SupersededByNewNavigation),this.currentTransition?.id===a.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),mn(r=>{if(this.destroyed)return a.resolve(!1),_e;if(o=!0,yb(r))this.events.next(new Gn(a.id,this.urlSerializer.serialize(a.extractedUrl),r.message,r.cancellationCode)),HM(r)?this.events.next(new No(r.url,r.navigationBehaviorOptions)):a.resolve(!1);else{let i=new Ro(a.id,this.urlSerializer.serialize(a.extractedUrl),r,a.targetSnapshot??void 0);try{let s=Te(this.environmentInjector,()=>this.navigationErrorHandler?.(i));if(s instanceof jo){let{message:c,cancellationCode:l}=Bc(this.urlSerializer,s);this.events.next(new Gn(a.id,this.urlSerializer.serialize(a.extractedUrl),c,l)),this.events.next(new No(s.redirectTo,s.navigationBehaviorOptions))}else throw this.events.next(i),r}catch(s){this.options.resolveNavigationPromiseOnError?a.resolve(!1):a.reject(s)}}return _e}))}))}cancelNavigationTransition(n,a,o){let r=new Gn(n.id,this.urlSerializer.serialize(n.extractedUrl),a,o);this.events.next(r),n.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let n=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),a=Vn(this.currentNavigation),o=a?.targetBrowserUrl??a?.extractedUrl;return n.toString()!==o?.toString()&&!a?.extras.skipLocationChange}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function OT(e){return e!==xo}var wb=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:()=>p(LT),providedIn:"root"})}return e})(),Uc=class{shouldDetach(t){return!1}store(t,n){}shouldAttach(t){return!1}retrieve(t){return null}shouldReuseRoute(t,n){return t.routeConfig===n.routeConfig}},LT=(()=>{class e extends Uc{static \u0275fac=(()=>{let n;return function(o){return(n||(n=ba(e)))(o||e)}})();static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Ab=(()=>{class e{urlSerializer=p(xa);options=p(Qt,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=p(Ht);urlHandlingStrategy=p(Gc);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new Wn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:n,initialUrl:a,targetBrowserUrl:o}){let r=n!==void 0?this.urlHandlingStrategy.merge(n,a):a,i=o??r;return i instanceof Wn?this.urlSerializer.serialize(i):i}commitTransition({targetRouterState:n,finalUrl:a,initialUrl:o}){a&&n?(this.currentUrlTree=a,this.rawUrlTree=this.urlHandlingStrategy.merge(a,o),this.routerState=n):this.rawUrlTree=o}routerState=pb(null);getRouterState(){return this.routerState}stateMemento=this.createStateMemento();updateStateMemento(){this.stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}resetInternalState({finalUrl:n}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,n??this.rawUrlTree)}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:()=>p(FT),providedIn:"root"})}return e})(),FT=(()=>{class e extends Ab{currentPageId=0;lastSuccessfulId=-1;restoredState(){return this.location.getState()}get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(n){return this.location.subscribe(a=>{a.type==="popstate"&&setTimeout(()=>{n(a.url,a.state,"popstate")})})}handleRouterEvent(n,a){n instanceof Jt?this.updateStateMemento():n instanceof Jn?this.commitTransition(a):n instanceof Gr?this.urlUpdateStrategy==="eager"&&(a.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(a),a)):n instanceof Wr?(this.commitTransition(a),this.urlUpdateStrategy==="deferred"&&!a.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(a),a)):n instanceof Gn&&n.code!==He.SupersededByNewNavigation&&n.code!==He.Redirect?this.restoreHistory(a):n instanceof Ro?this.restoreHistory(a,!0):n instanceof Je&&(this.lastSuccessfulId=n.id,this.currentPageId=this.browserPageId)}setBrowserUrl(n,{extras:a,id:o}){let{replaceUrl:r,state:i}=a;if(this.location.isCurrentPathEqualTo(n)||r){let s=this.browserPageId,c=_(_({},i),this.generateNgRouterState(o,s));this.location.replaceState(n,"",c)}else{let s=_(_({},i),this.generateNgRouterState(o,this.browserPageId+1));this.location.go(n,"",s)}}restoreHistory(n,a=!1){if(this.canceledNavigationResolution==="computed"){let o=this.browserPageId,r=this.currentPageId-o;r!==0?this.location.historyGo(r):this.getCurrentUrlTree()===n.finalUrl&&r===0&&(this.resetInternalState(n),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(a&&this.resetInternalState(n),this.resetUrlToCurrentUrlTree())}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(n,a){return this.canceledNavigationResolution==="computed"?{navigationId:n,\u0275routerPageId:a}:{navigationId:n}}static \u0275fac=(()=>{let n;return function(o){return(n||(n=ba(e)))(o||e)}})();static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Jc(e,t){e.events.pipe(ne(n=>n instanceof Je||n instanceof Gn||n instanceof Ro||n instanceof Jn),A(n=>n instanceof Je||n instanceof Jn?0:(n instanceof Gn?n.code===He.Redirect||n.code===He.SupersededByNewNavigation:!1)?2:1),ne(n=>n!==2),ke(1)).subscribe(()=>{t()})}var kT={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},zT={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"},Qe=(()=>{class e{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=p(nc);stateManager=p(Ab);options=p(Qt,{optional:!0})||{};pendingTasks=p(tt);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=p(Wc);urlSerializer=p(xa);location=p(Ht);urlHandlingStrategy=p(Gc);injector=p(se);_events=new H;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=p(wb);onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=p(Aa,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!p(ni,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:n=>{this.console.warn(n)}}),this.subscribeToNavigationEvents()}eventsSubscription=new Z;subscribeToNavigationEvents(){let n=this.navigationTransitions.events.subscribe(a=>{try{let o=this.navigationTransitions.currentTransition,r=Vn(this.navigationTransitions.currentNavigation);if(o!==null&&r!==null){if(this.stateManager.handleRouterEvent(a,r),a instanceof Gn&&a.code!==He.Redirect&&a.code!==He.SupersededByNewNavigation)this.navigated=!0;else if(a instanceof Je)this.navigated=!0;else if(a instanceof No){let i=a.navigationBehaviorOptions,s=this.urlHandlingStrategy.merge(a.url,o.currentRawUrl),c=_({browserUrl:o.extras.browserUrl,info:o.extras.info,skipLocationChange:o.extras.skipLocationChange,replaceUrl:o.extras.replaceUrl||this.urlUpdateStrategy==="eager"||OT(o.source)},i);this.scheduleNavigation(s,xo,null,c,{resolve:o.resolve,reject:o.reject,promise:o.promise})}}FM(a)&&this._events.next(a)}catch(o){this.navigationTransitions.transitionAbortWithErrorSubject.next(o)}});this.eventsSubscription.add(n)}resetRootComponentType(n){this.routerState.root.component=n,this.navigationTransitions.rootComponentType=n}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),xo,this.stateManager.restoredState())}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((n,a,o)=>{this.navigateToSyncWithBrowser(n,o,a)})}navigateToSyncWithBrowser(n,a,o){let r={replaceUrl:!0},i=o?.navigationId?o:null;if(o){let c=_({},o);delete c.navigationId,delete c.\u0275routerPageId,Object.keys(c).length!==0&&(r.state=c)}let s=this.parseUrl(n);this.scheduleNavigation(s,a,i,r).catch(c=>{this.disposed||this.injector.get(Ze)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return Vn(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(n){this.config=n.map(Um),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription&&(this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0),this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(n,a={}){let{relativeTo:o,queryParams:r,fragment:i,queryParamsHandling:s,preserveFragment:c}=a,l=c?this.currentUrlTree.fragment:i,d=null;switch(s??this.options.defaultQueryParamsHandling){case"merge":d=_(_({},this.currentUrlTree.queryParams),r);break;case"preserve":d=this.currentUrlTree.queryParams;break;default:d=r||null}d!==null&&(d=this.removeEmptyProps(d));let u;try{let f=o?o.snapshot:this.routerState.snapshot.root;u=cb(f)}catch{(typeof n[0]!="string"||n[0][0]!=="/")&&(n=[]),u=this.currentUrlTree.root}return lb(u,n,d,l??null)}navigateByUrl(n,a={skipLocationChange:!1}){let o=Wt(n)?n:this.parseUrl(n),r=this.urlHandlingStrategy.merge(o,this.rawUrlTree);return this.scheduleNavigation(r,xo,null,a)}navigate(n,a={skipLocationChange:!1}){return qT(n),this.navigateByUrl(this.createUrlTree(n,a),a)}serializeUrl(n){return this.urlSerializer.serialize(n)}parseUrl(n){try{return this.urlSerializer.parse(n)}catch{return this.urlSerializer.parse("/")}}isActive(n,a){let o;if(a===!0?o=_({},kT):a===!1?o=_({},zT):o=a,Wt(n))return Uy(this.currentUrlTree,n,o);let r=this.parseUrl(n);return Uy(this.currentUrlTree,r,o)}removeEmptyProps(n){return Object.entries(n).reduce((a,[o,r])=>(r!=null&&(a[o]=r),a),{})}scheduleNavigation(n,a,o,r,i){if(this.disposed)return Promise.resolve(!1);let s,c,l;i?(s=i.resolve,c=i.reject,l=i.promise):l=new Promise((u,f)=>{s=u,c=f});let d=this.pendingTasks.add();return Jc(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(d))}),this.navigationTransitions.handleNavigationRequest({source:a,restoredState:o,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:n,extras:r,resolve:s,reject:c,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(u=>Promise.reject(u))}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function qT(e){for(let t=0;t<e.length;t++)if(e[t]==null)throw new D(4008,!1)}var ko=(()=>{class e{router;route;tabIndexAttribute;renderer;el;locationStrategy;reactiveHref=We(null);get href(){return Vn(this.reactiveHref)}set href(n){this.reactiveHref.set(n)}target;queryParams;fragment;queryParamsHandling;state;info;relativeTo;isAnchorElement;subscription;onChanges=new H;applicationErrorHandler=p(Ze);options=p(Qt,{optional:!0});constructor(n,a,o,r,i,s){this.router=n,this.route=a,this.tabIndexAttribute=o,this.renderer=r,this.el=i,this.locationStrategy=s,this.reactiveHref.set(p(new Ut("href"),{optional:!0}));let c=i.nativeElement.tagName?.toLowerCase();this.isAnchorElement=c==="a"||c==="area"||!!(typeof customElements=="object"&&customElements.get(c)?.observedAttributes?.includes?.("href")),this.isAnchorElement?this.setTabIndexIfNotOnNativeEl("0"):this.subscribeToNavigationEventsIfNecessary()}subscribeToNavigationEventsIfNecessary(){if(this.subscription!==void 0||!this.isAnchorElement)return;let n=this.preserveFragment,a=o=>o==="merge"||o==="preserve";n||=a(this.queryParamsHandling),n||=!this.queryParamsHandling&&!a(this.options?.defaultQueryParamsHandling),n&&(this.subscription=this.router.events.subscribe(o=>{o instanceof Je&&this.updateHref()}))}preserveFragment=!1;skipLocationChange=!1;replaceUrl=!1;setTabIndexIfNotOnNativeEl(n){this.tabIndexAttribute!=null||this.isAnchorElement||this.applyAttributeValue("tabindex",n)}ngOnChanges(n){this.isAnchorElement&&(this.updateHref(),this.subscribeToNavigationEventsIfNecessary()),this.onChanges.next(this)}routerLinkInput=null;set routerLink(n){n==null?(this.routerLinkInput=null,this.setTabIndexIfNotOnNativeEl(null)):(Wt(n)?this.routerLinkInput=n:this.routerLinkInput=Array.isArray(n)?n:[n],this.setTabIndexIfNotOnNativeEl("0"))}onClick(n,a,o,r,i){let s=this.urlTree;if(s===null||this.isAnchorElement&&(n!==0||a||o||r||i||typeof this.target=="string"&&this.target!="_self"))return!0;let c={skipLocationChange:this.skipLocationChange,replaceUrl:this.replaceUrl,state:this.state,info:this.info};return this.router.navigateByUrl(s,c)?.catch(l=>{this.applicationErrorHandler(l)}),!this.isAnchorElement}ngOnDestroy(){this.subscription?.unsubscribe()}updateHref(){let n=this.urlTree;this.reactiveHref.set(n!==null&&this.locationStrategy?this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(n))??"":null)}applyAttributeValue(n,a){let o=this.renderer,r=this.el.nativeElement;a!==null?o.setAttribute(r,n,a):o.removeAttribute(r,n)}get urlTree(){return this.routerLinkInput===null?null:Wt(this.routerLinkInput)?this.routerLinkInput:this.router.createUrlTree(this.routerLinkInput,{relativeTo:this.relativeTo!==void 0?this.relativeTo:this.route,queryParams:this.queryParams,fragment:this.fragment,queryParamsHandling:this.queryParamsHandling,preserveFragment:this.preserveFragment})}static \u0275fac=function(a){return new(a||e)(Q(Qe),Q(un),_r("tabindex"),Q(kt),Q(de),Q(Mn))};static \u0275dir=he({type:e,selectors:[["","routerLink",""]],hostVars:2,hostBindings:function(a,o){a&1&&pe("click",function(i){return o.onClick(i.button,i.ctrlKey,i.shiftKey,i.altKey,i.metaKey)}),a&2&&Ee("href",o.reactiveHref(),Yu)("target",o.target)},inputs:{target:"target",queryParams:"queryParams",fragment:"fragment",queryParamsHandling:"queryParamsHandling",state:"state",info:"info",relativeTo:"relativeTo",preserveFragment:[2,"preserveFragment","preserveFragment",Ue],skipLocationChange:[2,"skipLocationChange","skipLocationChange",Ue],replaceUrl:[2,"replaceUrl","replaceUrl",Ue],routerLink:"routerLink"},features:[_n]})}return e})();var ai=class{};var Rb=(()=>{class e{router;injector;preloadingStrategy;loader;subscription;constructor(n,a,o,r){this.router=n,this.injector=a,this.preloadingStrategy=o,this.loader=r}setUpPreloading(){this.subscription=this.router.events.pipe(ne(n=>n instanceof Je),Rn(()=>this.preload())).subscribe(()=>{})}preload(){return this.processRoutes(this.injector,this.router.config)}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}processRoutes(n,a){let o=[];for(let r of a){r.providers&&!r._injector&&(r._injector=vo(r.providers,n,`Route: ${r.path}`));let i=r._injector??n,s=r._loadedInjector??i;(r.loadChildren&&!r._loadedRoutes&&r.canLoad===void 0||r.loadComponent&&!r._loadedComponent)&&o.push(this.preloadConfig(i,r)),(r.children||r._loadedRoutes)&&o.push(this.processRoutes(s,r.children??r._loadedRoutes))}return oe(o).pipe(bt())}preloadConfig(n,a){return this.preloadingStrategy.preload(a,()=>{let o;a.loadChildren&&a.canLoad===void 0?o=this.loader.loadChildren(n,a):o=x(null);let r=o.pipe(fe(i=>i===null?x(void 0):(a._loadedRoutes=i.routes,a._loadedInjector=i.injector,this.processRoutes(i.injector??n,i.routes))));if(a.loadComponent&&!a._loadedComponent){let i=this.loader.loadComponent(n,a);return oe([r,i]).pipe(bt())}else return r})}static \u0275fac=function(a){return new(a||e)(M(Qe),M(se),M(ai),M($c))};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Pb=new I(""),BT=(()=>{class e{urlSerializer;transitions;viewportScroller;zone;options;routerEventsSubscription;scrollEventsSubscription;lastId=0;lastSource=xo;restoredId=0;store={};constructor(n,a,o,r,i={}){this.urlSerializer=n,this.transitions=a,this.viewportScroller=o,this.zone=r,this.options=i,i.scrollPositionRestoration||="disabled",i.anchorScrolling||="disabled"}init(){this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.setHistoryScrollRestoration("manual"),this.routerEventsSubscription=this.createScrollEvents(),this.scrollEventsSubscription=this.consumeScrollEvents()}createScrollEvents(){return this.transitions.events.subscribe(n=>{n instanceof Jt?(this.store[this.lastId]=this.viewportScroller.getScrollPosition(),this.lastSource=n.navigationTrigger,this.restoredId=n.restoredState?n.restoredState.navigationId:0):n instanceof Je?(this.lastId=n.id,this.scheduleScrollEvent(n,this.urlSerializer.parse(n.urlAfterRedirects).fragment)):n instanceof Jn&&n.code===Ao.IgnoredSameUrlNavigation&&(this.lastSource=void 0,this.restoredId=0,this.scheduleScrollEvent(n,this.urlSerializer.parse(n.url).fragment))})}consumeScrollEvents(){return this.transitions.events.subscribe(n=>{n instanceof Po&&(n.position?this.options.scrollPositionRestoration==="top"?this.viewportScroller.scrollToPosition([0,0]):this.options.scrollPositionRestoration==="enabled"&&this.viewportScroller.scrollToPosition(n.position):n.anchor&&this.options.anchorScrolling==="enabled"?this.viewportScroller.scrollToAnchor(n.anchor):this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.scrollToPosition([0,0]))})}scheduleScrollEvent(n,a){this.zone.runOutsideAngular(()=>ja(this,null,function*(){yield new Promise(o=>{setTimeout(o),typeof requestAnimationFrame<"u"&&requestAnimationFrame(o)}),this.zone.run(()=>{this.transitions.events.next(new Po(n,this.lastSource==="popstate"?this.store[this.restoredId]:null,a))})}))}ngOnDestroy(){this.routerEventsSubscription?.unsubscribe(),this.scrollEventsSubscription?.unsubscribe()}static \u0275fac=function(a){vp()};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})();function Qm(e,...t){return ca([{provide:Aa,multi:!0,useValue:e},[],{provide:un,useFactory:Nb,deps:[Qe]},{provide:wr,multi:!0,useFactory:jb},t.map(n=>n.\u0275providers)])}function Nb(e){return e.routerState.root}function oi(e,t){return{\u0275kind:e,\u0275providers:t}}function jb(){let e=p(ve);return t=>{let n=e.get(Dn);if(t!==n.components[0])return;let a=e.get(Qe),o=e.get(Ob);e.get(Ym)===1&&a.initialNavigation(),e.get(kb,null,{optional:!0})?.setUpPreloading(),e.get(Pb,null,{optional:!0})?.init(),a.resetRootComponentType(n.componentTypes[0]),o.closed||(o.next(),o.complete(),o.unsubscribe())}}var Ob=new I("",{factory:()=>new H}),Ym=new I("",{providedIn:"root",factory:()=>1});function Lb(){let e=[{provide:Vs,useValue:!0},{provide:Ym,useValue:0},ac(()=>{let t=p(ve);return t.get(Kp,Promise.resolve()).then(()=>new Promise(a=>{let o=t.get(Qe),r=t.get(Ob);Jc(o,()=>{a(!0)}),t.get(Wc).afterPreactivation=()=>(a(!0),r.closed?x(void 0):r),o.initialNavigation()}))})];return oi(2,e)}function Fb(){let e=[ac(()=>{p(Qe).setUpLocationChangeListener()}),{provide:Ym,useValue:2}];return oi(3,e)}var kb=new I("");function zb(e){return oi(0,[{provide:kb,useExisting:Rb},{provide:ai,useExisting:e}])}function qb(){return oi(8,[Bm,{provide:ni,useExisting:Bm}])}function Bb(e){dt("NgRouterViewTransitions");let t=[{provide:$m,useValue:xb},{provide:Gm,useValue:_({skipNextTransition:!!e?.skipInitialTransition},e)}];return oi(9,t)}var Vb=[Ht,{provide:xa,useClass:Gt},Qe,wa,{provide:un,useFactory:Nb,deps:[Qe]},$c,[]],Ra=(()=>{class e{constructor(){}static forRoot(n,a){return{ngModule:e,providers:[Vb,[],{provide:Aa,multi:!0,useValue:n},[],a?.errorHandler?{provide:Wm,useValue:a.errorHandler}:[],{provide:Qt,useValue:a||{}},a?.useHash?UT():HT(),VT(),a?.preloadingStrategy?zb(a.preloadingStrategy).\u0275providers:[],a?.initialNavigation?$T(a):[],a?.bindToComponentInputs?qb().\u0275providers:[],a?.enableViewTransitions?Bb().\u0275providers:[],GT()]}}static forChild(n){return{ngModule:e,providers:[{provide:Aa,multi:!0,useValue:n}]}}static \u0275fac=function(a){return new(a||e)};static \u0275mod=ue({type:e});static \u0275inj=ie({})}return e})();function VT(){return{provide:Pb,useFactory:()=>{let e=p(Iy),t=p(G),n=p(Qt),a=p(Wc),o=p(xa);return n.scrollOffset&&e.setOffset(n.scrollOffset),new BT(o,a,e,t,n)}}}function UT(){return{provide:Mn,useClass:Xp}}function HT(){return{provide:Mn,useClass:pc}}function $T(e){return[e.initialNavigation==="disabled"?Fb().\u0275providers:[],e.initialNavigation==="enabledBlocking"?Lb().\u0275providers:[]]}var Jm=new I("");function GT(){return[{provide:Jm,useFactory:jb},{provide:wr,multi:!0,useExisting:Jm}]}function WT(e,t){if(e&1&&(g(0,"span",8),te(1,"img",9),h()),e&2){let n=S(2);v(),C("src",n.node.flag,Oe)("alt",n.node.nombre+" flag")}}function JT(e,t){if(e&1){let n=Xe();g(0,"button",4),pe("click",function(o){Ne(n);let r=S();return je(r.onClick(r.node,o))}),O(1,WT,2,2,"span",5),g(2,"span",6),y(3),h(),g(4,"span",7),y(5,"\u203A"),h()()}if(e&2){let n=S();Ee("aria-expanded",n.isOpen),v(),C("ngIf",n.node.flag),v(2),V(n.node.nombre)}}function QT(e,t){if(e&1&&(g(0,"span",8),te(1,"img",9),h()),e&2){let n=S(3);v(),C("src",n.node.flag,Oe)("alt",n.node.nombre+" flag")}}function YT(e,t){if(e&1){let n=Xe();g(0,"a",11),pe("click",function(){Ne(n);let o=S(2);return je(o.onSelected(o.node))}),O(1,QT,2,2,"span",5),g(2,"span",6),y(3),h()()}if(e&2){let n=S(2);C("routerLink","/guia/"+n.node.path),v(),C("ngIf",n.node.flag),v(2),V(n.node.nombre)}}function ZT(e,t){if(e&1&&O(0,YT,4,3,"a",10),e&2){let n=S();C("ngIf",n.node.path)}}function KT(e,t){if(e&1){let n=Xe();zt(0),g(1,"app-header-submenu",14),pe("toggleOpen",function(o){Ne(n);let r=S(2);return je(r.toggleChild(o))})("selected",function(o){Ne(n);let r=S(2);return je(r.selected.emit(o))}),h(),qt()}if(e&2){let n=t.$implicit,a=S(2);v(),C("node",n)("isOpen",a.openChildKey===a.keyOf(n))}}function XT(e,t){if(e&1&&(g(0,"ul",12),O(1,KT,2,2,"ng-container",13),h()),e&2){let n=S();v(),C("ngForOf",n.node.hijos)}}var Yc=class e{constructor(t){this.router=t}node;isOpen=!1;openChildKey=null;toggleOpen=new ee;selected=new ee;keyOf(t){return t.path??t.nombre}toggleChild(t){this.openChildKey=this.openChildKey===t?null:t}onClick(t,n){if(n.stopPropagation(),t.hijos?.length){this.toggleOpen.emit(this.keyOf(t));return}t.path&&this.router.navigateByUrl(`/guia/${t.path}`),this.selected.emit(t)}onSelected(t){this.selected.emit(t)}static \u0275fac=function(n){return new(n||e)(Q(Qe))};static \u0275cmp=me({type:e,selectors:[["app-header-submenu"]],inputs:{node:"node",isOpen:"isOpen"},outputs:{toggleOpen:"toggleOpen",selected:"selected"},decls:5,vars:5,consts:[["guideLink",""],[1,"menu-item"],["class","menu-btn","type","button",3,"click",4,"ngIf","ngIfElse"],["class","submenu",4,"ngIf"],["type","button",1,"menu-btn",3,"click"],["class","flag-container",4,"ngIf"],[1,"label"],["aria-hidden","true",1,"caret"],[1,"flag-container"],[1,"flag-icon",3,"src","alt"],["class","menu-btn",3,"routerLink","click",4,"ngIf"],[1,"menu-btn",3,"click","routerLink"],[1,"submenu"],[4,"ngFor","ngForOf"],[3,"toggleOpen","selected","node","isOpen"]],template:function(n,a){if(n&1&&(g(0,"li",1),O(1,JT,6,3,"button",2)(2,ZT,1,1,"ng-template",null,0,_o)(4,XT,2,1,"ul",3),h()),n&2){let o=Co(3);ge("open",a.isOpen),v(),C("ngIf",a.node.hijos==null?null:a.node.hijos.length)("ngIfElse",o),v(3),C("ngIf",a.node.hijos==null?null:a.node.hijos.length)}},dependencies:[e,en,$t,mt,Ra,ko],styles:['@charset "UTF-8";.menu-item[_ngcontent-%COMP%]{position:relative;list-style:none;white-space:nowrap}.menu-btn[_ngcontent-%COMP%]{background:none;border:0;color:inherit;font:inherit;cursor:pointer;text-decoration:none;width:100%;padding:.45rem .8rem;border-radius:6px;display:flex;align-items:center;gap:.5rem;text-align:left;min-width:0}.label[_ngcontent-%COMP%]{min-width:0;overflow-wrap:anywhere}.menu-btn[_ngcontent-%COMP%]:hover, .menu-btn[_ngcontent-%COMP%]:focus-visible{background:#ffffff1f;outline:none}.flag-container[_ngcontent-%COMP%]{display:inline-block;width:20px;height:14px}.flag-icon[_ngcontent-%COMP%]{width:20px;height:14px;object-fit:cover;border:1px solid #ccc;border-radius:2px}.caret[_ngcontent-%COMP%]{margin-left:auto}.submenu[_ngcontent-%COMP%]{opacity:0;transform:translateY(-10px);pointer-events:none;transition:opacity .2s ease,transform .2s ease;position:absolute;top:100%;left:0;background:linear-gradient(180deg,#0d233afa,#144060f5);border:1px solid rgba(255,255,255,.14);border-radius:8px;color:#fffaf2;box-shadow:0 16px 32px #07162647;padding:.5rem 0;min-width:150px;z-index:10;margin:0;padding-left:0}.menu-item[_ngcontent-%COMP%]:hover > .submenu[_ngcontent-%COMP%]{opacity:1;transform:translateY(0);pointer-events:auto}.menu-item.open[_ngcontent-%COMP%] > .submenu[_ngcontent-%COMP%]{opacity:1;transform:translateY(0);pointer-events:auto}.submenu[_ngcontent-%COMP%]   .submenu[_ngcontent-%COMP%]{top:0;left:100%;transform:translate(-10px)}.submenu[_ngcontent-%COMP%]   .menu-btn[_ngcontent-%COMP%]:hover{background:#ffffff1f}@media (max-width: 768px){.submenu[_ngcontent-%COMP%]{position:static;opacity:0;transform:none;pointer-events:none;height:0;overflow:hidden;padding:0;min-width:unset;width:100%;border:0;box-shadow:none;background:transparent}.menu-item[_ngcontent-%COMP%]{width:100%;white-space:normal}.menu-btn[_ngcontent-%COMP%]{min-height:44px;padding:.7rem .8rem;line-height:1.25}.menu-item.open[_ngcontent-%COMP%] > .submenu[_ngcontent-%COMP%]{opacity:1;pointer-events:auto;height:auto;padding:.35rem 0 .35rem .75rem;background:#ffffff14;border-radius:8px;margin-top:.25rem}.menu-item.open[_ngcontent-%COMP%]   .caret[_ngcontent-%COMP%]{transform:rotate(90deg)}}']})};var Zc=class e{currentLanguage=We("es");setLanguage(t){this.currentLanguage.set(t),document.documentElement.lang=t}static \u0275fac=function(n){return new(n||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})};function nx(e,t){if(e&1&&(g(0,"span",36),te(1,"img",37),h()),e&2){let n=S().$implicit;v(),C("src",n.flag,Oe)("alt",n.name+" flag")}}function tx(e,t){if(e&1){let n=Xe();g(0,"a",31),pe("click",function(){Ne(n);let o=S(2);return je(o.closeMenu())}),O(1,nx,2,2,"span",32),g(2,"span",33)(3,"span",34),y(4),h(),g(5,"span",35),y(6),h()()()}if(e&2){let n=t.$implicit;C("routerLink","/guia/"+n.path),v(),C("ngIf",n.flag),v(3),V(n.name),v(2),V(n.breadcrumb)}}function ax(e,t){if(e&1&&(g(0,"p",38),y(1),h()),e&2){let n=S(2);v(),V(n.text.searchEmpty)}}function ox(e,t){if(e&1&&(g(0,"div",28),O(1,tx,7,4,"a",29)(2,ax,2,1,"p",30),h()),e&2){let n=S();v(),C("ngForOf",n.searchResults),v(),C("ngIf",!n.searchResults.length)}}function rx(e,t){if(e&1&&te(0,"img",39),e&2){let n=S();C("src",n.activeLanguage.flag,Oe)("alt",n.activeLanguage.name)}}function ix(e,t){if(e&1){let n=Xe();g(0,"button",42),pe("click",function(){let o=Ne(n).$implicit,r=S(2);return je(r.selectLanguage(o.code))}),te(1,"img",37),g(2,"span"),y(3),h()()}if(e&2){let n=t.$implicit,a=S(2);ge("active",n.code===a.languageService.currentLanguage()),v(),C("src",n.flag,Oe)("alt",n.name),v(2),V(n.label)}}function sx(e,t){if(e&1&&(g(0,"div",40),O(1,ix,4,5,"button",41),h()),e&2){let n=S();v(),C("ngForOf",n.languages)}}function cx(e,t){if(e&1){let n=Xe();g(0,"div",43),pe("click",function(){Ne(n);let o=S();return je(o.menuOpen=!1)}),h()}}function lx(e,t){if(e&1){let n=Xe();zt(0),g(1,"app-header-submenu",44),pe("toggleOpen",function(o){Ne(n);let r=S();return je(r.toggleContinent(o))})("selected",function(){Ne(n);let o=S();return je(o.menuOpen=!1)}),h(),qt()}if(e&2){let n=t.$implicit,a=S();v(),C("node",n)("isOpen",a.openContinentKey===(n.path??n.nombre))}}var Kc=class e{constructor(t,n){this.languageService=t;this.elementRef=n}treeData=[];menuOpen=!1;languageMenuOpen=!1;searchQuery="";openContinentKey=null;languages=[{code:"es",label:"ES",flag:"https://flagcdn.com/es.svg",name:"Espa\xF1ol"},{code:"en",label:"EN",flag:"https://flagcdn.com/gb.svg",name:"English"},{code:"fr",label:"FR",flag:"https://flagcdn.com/fr.svg",name:"Fran\xE7ais"},{code:"pt",label:"PT",flag:"https://flagcdn.com/pt.svg",name:"Portugu\xEAs"}];headerTexts={es:{destinations:"Destinos",searchPlaceholder:"Buscar destino",searchLabel:"Buscar destinos disponibles",searchEmpty:"No hay destinos con ese nombre",exploreKicker:"Explora AvenTourArte",exploreTitle:"Busca un destino o navega por el menu",languageLabel:"Cambiar idioma"},en:{destinations:"Destinations",searchPlaceholder:"Search destination",searchLabel:"Search available destinations",searchEmpty:"No destinations found",exploreKicker:"Explore AvenTourArte",exploreTitle:"Search for a destination or browse the menu",languageLabel:"Change language"},fr:{destinations:"Destinations",searchPlaceholder:"Chercher une destination",searchLabel:"Chercher les destinations disponibles",searchEmpty:"Aucune destination trouvee",exploreKicker:"Explorez AvenTourArte",exploreTitle:"Cherchez une destination ou parcourez le menu",languageLabel:"Changer de langue"},pt:{destinations:"Destinos",searchPlaceholder:"Procurar destino",searchLabel:"Procurar destinos disponiveis",searchEmpty:"Nenhum destino encontrado",exploreKicker:"Explore AvenTourArte",exploreTitle:"Procure um destino ou navegue pelo menu",languageLabel:"Alterar idioma"}};keyOf(t){return t.path??t.nombre}toggleContinent(t){this.openContinentKey=this.openContinentKey===t?null:t}toggleMenu(){this.menuOpen=!this.menuOpen}get text(){return this.headerTexts[this.languageService.currentLanguage()]}get searchResults(){let t=this.normalize(this.searchQuery);return t?this.allDestinations.filter(n=>this.normalize(`${n.name} ${n.breadcrumb}`).includes(t)).slice(0,7):[]}get allDestinations(){return this.flattenDestinations(this.treeData)}get hasSearchQuery(){return!!this.normalize(this.searchQuery)}get activeLanguage(){return this.languages.find(t=>t.code===this.languageService.currentLanguage())}closeMenu(){this.menuOpen=!1,this.languageMenuOpen=!1,this.searchQuery=""}toggleLanguageMenu(){this.languageMenuOpen=!this.languageMenuOpen}selectLanguage(t){this.languageService.setLanguage(t),this.languageMenuOpen=!1}onSearchInput(t){this.searchQuery=t.target.value}onDocumentClick(t){this.languageMenuOpen&&(this.elementRef.nativeElement.contains(t.target)||(this.languageMenuOpen=!1))}flattenDestinations(t,n=[],a){let o=[];for(let r of t){let i=[...n,r.nombre],s=r.flag??a;r.path&&o.push({name:r.nombre,path:r.path,breadcrumb:n.join(" / "),flag:s}),o.push(...this.flattenDestinations(r.hijos??[],i,s))}return o}normalize(t){return t.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}static \u0275fac=function(n){return new(n||e)(Q(Zc),Q(de))};static \u0275cmp=me({type:e,selectors:[["app-header"]],hostBindings:function(n,a){n&1&&pe("click",function(r){return a.onDocumentClick(r)},Ku)},inputs:{treeData:"treeData"},decls:33,vars:18,consts:[[1,"app-header"],[1,"logo-container"],["routerLink","/","aria-label","Ir al inicio de AvenTourArte"],["src","assets/logo.png","alt","AvenTourArte logo",1,"logo-img"],["type","button","aria-label","Abrir o cerrar menu",1,"menu-toggle",3,"click"],["aria-hidden","true",1,"menu-icon"],[1,"menu-toggle-text"],[1,"header-actions"],[1,"destination-search"],["for","destination-search",1,"sr-only"],["id","destination-search","type","search","autocomplete","off",3,"input","value","placeholder"],["class","search-results",4,"ngIf"],[1,"language-switcher"],["type","button",1,"language-toggle",3,"click"],["aria-hidden","true",1,"language-icon"],["viewBox","0 0 24 24","focusable","false"],["cx","12","cy","12","r","9"],["d","M3 12h18"],["d","M12 3c2.2 2.4 3.4 5.4 3.4 9s-1.2 6.6-3.4 9"],["d","M12 3c-2.2 2.4-3.4 5.4-3.4 9s1.2 6.6 3.4 9"],["class","active-language-flag",3,"src","alt",4,"ngIf"],["class","language-menu",4,"ngIf"],["class","backdrop",3,"click",4,"ngIf"],["aria-label","Destinos",1,"main-menu"],[1,"mobile-menu-heading"],[1,"mobile-menu-kicker"],[1,"mobile-menu-title"],[4,"ngFor","ngForOf"],[1,"search-results"],["class","search-result",3,"routerLink","click",4,"ngFor","ngForOf"],["class","search-empty",4,"ngIf"],[1,"search-result",3,"click","routerLink"],["class","result-flag",4,"ngIf"],[1,"result-text"],[1,"result-name"],[1,"result-breadcrumb"],[1,"result-flag"],[3,"src","alt"],[1,"search-empty"],[1,"active-language-flag",3,"src","alt"],[1,"language-menu"],["type","button",3,"active","click",4,"ngFor","ngForOf"],["type","button",3,"click"],[1,"backdrop",3,"click"],[3,"toggleOpen","selected","node","isOpen"]],template:function(n,a){n&1&&(g(0,"header",0)(1,"div",1)(2,"a",2),te(3,"img",3),h()(),g(4,"button",4),pe("click",function(){return a.toggleMenu()}),te(5,"span",5),g(6,"span",6),y(7),h()(),g(8,"div",7)(9,"div",8)(10,"label",9),y(11),h(),g(12,"input",10),pe("input",function(r){return a.onSearchInput(r)}),h(),O(13,ox,3,2,"div",11),h(),g(14,"div",12)(15,"button",13),pe("click",function(){return a.toggleLanguageMenu()}),g(16,"span",14),ro(),g(17,"svg",15),te(18,"circle",16)(19,"path",17)(20,"path",18)(21,"path",19),h()(),O(22,rx,1,2,"img",20),h(),O(23,sx,2,1,"div",21),h()(),O(24,cx,1,0,"div",22),us(),g(25,"nav",23)(26,"div",24)(27,"p",25),y(28),h(),g(29,"p",26),y(30),h()(),g(31,"ul"),O(32,lx,2,2,"ng-container",27),h()()()),n&2&&(v(4),ge("is-open",a.menuOpen),Ee("aria-expanded",a.menuOpen),v(3),V(a.text.destinations),v(4),V(a.text.searchLabel),v(),C("value",a.searchQuery)("placeholder",a.text.searchPlaceholder),v(),C("ngIf",a.hasSearchQuery),v(2),Ee("aria-expanded",a.languageMenuOpen)("aria-label",a.text.languageLabel),v(7),C("ngIf",a.activeLanguage),v(),C("ngIf",a.languageMenuOpen),v(),C("ngIf",a.menuOpen),v(),ge("open",a.menuOpen),v(3),V(a.text.exploreKicker),v(2),V(a.text.exploreTitle),v(2),C("ngForOf",a.treeData))},dependencies:[en,$t,mt,Ra,ko,Yc],styles:['@charset "UTF-8";.app-header[_ngcontent-%COMP%]{--mobile-header-height: 76px;display:flex;align-items:center;background:linear-gradient(90deg,#0d233af5,#144060ed),#0d233af0;padding:.65rem clamp(1rem,3vw,1.5rem);color:#fffaf2;box-shadow:0 10px 28px #07162647;position:sticky;top:0;z-index:1000;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}.app-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.app-header[_ngcontent-%COMP%]   .logo-img[_ngcontent-%COMP%]{height:70px;border-radius:8px;cursor:pointer}.app-header[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%]{display:none;background:#ffffff14;border:none;color:#fffaf2;cursor:pointer;margin-left:auto}.app-header[_ngcontent-%COMP%]   .menu-toggle-text[_ngcontent-%COMP%], .app-header[_ngcontent-%COMP%]   .mobile-menu-heading[_ngcontent-%COMP%]{display:none}.app-header[_ngcontent-%COMP%]   .sr-only[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.app-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]{order:3;display:flex;align-items:center;gap:.65rem;margin-left:auto}.app-header[_ngcontent-%COMP%]   .destination-search[_ngcontent-%COMP%]{position:relative;width:min(28vw,330px);min-width:220px}.app-header[_ngcontent-%COMP%]   .destination-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;min-height:40px;border:1px solid rgba(255,250,242,.26);border-radius:8px;background:#ffffff1a;color:#fffaf2;font:inherit;padding:0 .85rem;outline:none}.app-header[_ngcontent-%COMP%]   .destination-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#fffaf2b8}.app-header[_ngcontent-%COMP%]   .destination-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{background:#ffffff29;border-color:#fffaf2b8}.app-header[_ngcontent-%COMP%]   .search-results[_ngcontent-%COMP%], .app-header[_ngcontent-%COMP%]   .language-menu[_ngcontent-%COMP%]{position:absolute;top:calc(100% + .45rem);right:0;z-index:10002;background:linear-gradient(180deg,#0d233afc,#144060fa);border:1px solid rgba(255,255,255,.16);border-radius:8px;box-shadow:0 18px 36px #07162652}.app-header[_ngcontent-%COMP%]   .search-results[_ngcontent-%COMP%]{left:0;right:auto;width:min(420px,86vw);padding:.35rem}.app-header[_ngcontent-%COMP%]   .search-result[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.6rem;min-height:48px;padding:.55rem .65rem;border-radius:7px;color:#fffaf2;text-decoration:none}.app-header[_ngcontent-%COMP%]   .search-result[_ngcontent-%COMP%]:hover, .app-header[_ngcontent-%COMP%]   .search-result[_ngcontent-%COMP%]:focus-visible{background:#ffffff1f;outline:none}.app-header[_ngcontent-%COMP%]   .result-flag[_ngcontent-%COMP%], .app-header[_ngcontent-%COMP%]   .result-flag[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;width:22px;height:15px}.app-header[_ngcontent-%COMP%]   .result-flag[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{object-fit:cover;border-radius:2px}.app-header[_ngcontent-%COMP%]   .result-text[_ngcontent-%COMP%]{display:grid;min-width:0}.app-header[_ngcontent-%COMP%]   .result-name[_ngcontent-%COMP%]{font-weight:800;line-height:1.2}.app-header[_ngcontent-%COMP%]   .result-breadcrumb[_ngcontent-%COMP%], .app-header[_ngcontent-%COMP%]   .search-empty[_ngcontent-%COMP%]{color:#fffaf2b8;font-size:.8rem;line-height:1.25}.app-header[_ngcontent-%COMP%]   .search-empty[_ngcontent-%COMP%]{margin:0;padding:.75rem}.app-header[_ngcontent-%COMP%]   .language-switcher[_ngcontent-%COMP%]{position:relative}.app-header[_ngcontent-%COMP%]   .language-toggle[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;min-height:40px;border:1px solid rgba(255,250,242,.25);border-radius:8px;background:#ffffff1a;color:#fffaf2;font:inherit;font-weight:800;padding:0 .65rem;cursor:pointer}.app-header[_ngcontent-%COMP%]   .active-language-flag[_ngcontent-%COMP%]{width:24px;height:16px;object-fit:cover;border-radius:2px}.app-header[_ngcontent-%COMP%]   .language-icon[_ngcontent-%COMP%]{display:grid;place-items:center;width:20px;height:20px}.app-header[_ngcontent-%COMP%]   .language-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.app-header[_ngcontent-%COMP%]   .language-menu[_ngcontent-%COMP%]{display:grid;min-width:112px;padding:.35rem}.app-header[_ngcontent-%COMP%]   .language-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;min-height:36px;border:0;border-radius:6px;background:transparent;color:#fffaf2;font:inherit;font-weight:800;cursor:pointer;padding:0 .55rem;text-align:left}.app-header[_ngcontent-%COMP%]   .language-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover, .app-header[_ngcontent-%COMP%]   .language-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, .app-header[_ngcontent-%COMP%]   .language-menu[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%]{background:#ffffff21;outline:none}.app-header[_ngcontent-%COMP%]   .language-menu[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:22px;height:15px;object-fit:cover;border-radius:2px}.app-header[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%], .app-header[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]:before, .app-header[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]:after{display:block;width:24px;height:2px;border-radius:999px;background:currentColor;transition:transform .18s ease,opacity .18s ease}.app-header[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]{position:relative}.app-header[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]:before, .app-header[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]:after{content:"";position:absolute;left:0}.app-header[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]:before{top:-7px}.app-header[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]:after{top:7px}.app-header[_ngcontent-%COMP%]   .menu-toggle.is-open[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]{transform:rotate(45deg)}.app-header[_ngcontent-%COMP%]   .menu-toggle.is-open[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]:before{transform:translateY(7px) rotate(90deg)}.app-header[_ngcontent-%COMP%]   .menu-toggle.is-open[_ngcontent-%COMP%]   .menu-icon[_ngcontent-%COMP%]:after{opacity:0}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%]{order:2;margin-left:2rem;flex-grow:0}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0;display:flex;gap:1.5rem}[_nghost-%COMP%]{position:sticky;top:0;z-index:1000;display:block}.backdrop[_ngcontent-%COMP%]{display:none}@media (max-width: 768px){.app-header[_ngcontent-%COMP%]{--mobile-header-height: 132px;flex-wrap:wrap;min-height:var(--mobile-header-height);padding:.4rem .85rem .65rem}.app-header[_ngcontent-%COMP%]   .logo-img[_ngcontent-%COMP%]{height:58px}.app-header[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%]{position:relative;z-index:10001;display:inline-flex;align-items:center;justify-content:center;gap:.55rem;width:auto;height:44px;padding:0 .8rem;border-radius:8px;margin-left:auto;line-height:1;transition:background .18s ease;flex:0 0 auto;font-weight:700}.app-header[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%]:hover, .app-header[_ngcontent-%COMP%]   .menu-toggle[_ngcontent-%COMP%]:focus-visible{background:#ffffff1f;outline:none}.app-header[_ngcontent-%COMP%]   .menu-toggle-text[_ngcontent-%COMP%]{display:inline;font-size:.95rem}.app-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]{order:3;display:flex;align-items:center;gap:.5rem;width:100%;margin-left:0;margin-top:.45rem}.app-header[_ngcontent-%COMP%]   .destination-search[_ngcontent-%COMP%]{flex:1 1 auto;min-width:0;width:auto}.app-header[_ngcontent-%COMP%]   .destination-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{min-height:42px;background:#fffaf2;border-color:#fffaf2;color:#12304a}.app-header[_ngcontent-%COMP%]   .destination-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#12304aad}.app-header[_ngcontent-%COMP%]   .search-results[_ngcontent-%COMP%]{width:min(100%,520px)}.app-header[_ngcontent-%COMP%]   .language-toggle[_ngcontent-%COMP%]{min-width:58px;min-height:42px;background:#ffffff1f}.app-header[_ngcontent-%COMP%]   .language-menu[_ngcontent-%COMP%]{right:0}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%]{display:none;position:fixed;top:var(--mobile-header-height);left:0;right:0;height:calc(100dvh - var(--mobile-header-height));max-height:calc(100dvh - var(--mobile-header-height));background:linear-gradient(180deg,#0d233afa,#144060f5);z-index:9999;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;padding:.8rem .9rem calc(1.25rem + env(safe-area-inset-bottom));margin:0}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%]   .mobile-menu-heading[_ngcontent-%COMP%]{display:block;padding:.3rem .15rem .85rem}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%]   .mobile-menu-kicker[_ngcontent-%COMP%], .app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%]   .mobile-menu-title[_ngcontent-%COMP%]{margin:0}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%]   .mobile-menu-kicker[_ngcontent-%COMP%]{color:#fffaf2b8;font-size:.78rem;font-weight:700;text-transform:uppercase}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%]   .mobile-menu-title[_ngcontent-%COMP%]{color:#fffaf2;font-size:1.08rem;font-weight:800;line-height:1.25;margin-top:.2rem}.app-header[_ngcontent-%COMP%]   .main-menu[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{flex-direction:column;gap:.25rem}.app-header[_ngcontent-%COMP%]   .main-menu.open[_ngcontent-%COMP%]{display:block}.backdrop[_ngcontent-%COMP%]{display:block;position:fixed;top:var(--mobile-header-height);left:0;right:0;bottom:0;background:#00000059;z-index:9998}}']})};var Xc=class e{currentYear=new Date().getFullYear();socialLinks=[{name:"Instagram",url:"https://www.instagram.com/aventourarte",icon:"\u{1F4F8}"},{name:"Facebook",url:"https://www.facebook.com/aventourarte",icon:"\u{1F4D8}"},{name:"Twitter",url:"https://www.twitter.com/aventourarte",icon:"\u{1F426}"}];static \u0275fac=function(n){return new(n||e)};static \u0275cmp=me({type:e,selectors:[["app-footer"]],decls:11,vars:0,consts:[[1,"footer"],[1,"footer-bottom"],[1,"socials"],["href","#","target","_blank","rel","noreferrer"]],template:function(n,a){n&1&&(ln(0,"footer",0)(1,"div",1)(2,"span"),y(3,"\xA9 2026 AvenTourArte. Todos los derechos reservados."),In(),ln(4,"span",2)(5,"a",3),y(6,"Instagram"),In(),ln(7,"a",3),y(8,"Facebook"),In(),ln(9,"a",3),y(10,"X"),In()()()())},styles:[".footer[_ngcontent-%COMP%]{width:100%;max-width:100vw;background-color:#1a1a1a;color:#f5f5f5;font-family:Arial,sans-serif;font-size:.75rem;padding:.5rem 1rem;box-sizing:border-box}.footer[_ngcontent-%COMP%]   .footer-bottom[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem}.footer[_ngcontent-%COMP%]   .footer-bottom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#f5f5f5;text-decoration:none;margin-left:.3rem;transition:color .3s}.footer[_ngcontent-%COMP%]   .footer-bottom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#ff6f61}.footer[_ngcontent-%COMP%]   .socials[_ngcontent-%COMP%]{display:flex;gap:.5rem}[_nghost-%COMP%]{position:relative}"]})};var el=class e{treeData=Vy;selectedPlace="";onSelected(t){this.selectedPlace=t.nombre}static \u0275fac=function(n){return new(n||e)};static \u0275cmp=me({type:e,selectors:[["app-root"]],decls:6,vars:1,consts:[[3,"treeData"],[1,"app-main"],[1,"app-body"],[1,"content"]],template:function(n,a){n&1&&(te(0,"app-header",0),g(1,"main",1)(2,"div",2)(3,"section",3),te(4,"router-outlet"),h()()(),te(5,"app-footer")),n&2&&C("treeData",a.treeData)},dependencies:[en,Ra,ei,Kc,Xc],styles:["[_nghost-%COMP%], body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{margin:0;padding:0;width:100%;height:100%;box-sizing:border-box}*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after{box-sizing:inherit}[_nghost-%COMP%]{display:flex;flex-direction:column;min-height:100vh}.app-main[_ngcontent-%COMP%], .app-body[_ngcontent-%COMP%]{flex:1;display:flex;width:100%}.content[_ngcontent-%COMP%]{flex:1;width:100%;min-width:0}"]})};var Zm={},zo=(()=>{class e{_appId=p(fo);getId(n){return this._appId!=="ng"&&(n+=this._appId),Zm.hasOwnProperty(n)||(Zm[n]=0),`${n}${Zm[n]++}`}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var ri=(()=>{class e{_listeners=[];notify(n,a){for(let o of this._listeners)o(n,a)}listen(n){return this._listeners.push(n),()=>{this._listeners=this._listeners.filter(a=>n!==a)}}ngOnDestroy(){this._listeners=[]}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Km=new I("CdkAccordion"),Ub=(()=>{class e{_stateChanges=new H;_openCloseAllActions=new H;id=p(zo).getId("cdk-accordion-");multi=!1;openAll(){this.multi&&this._openCloseAllActions.next(!0)}closeAll(){this._openCloseAllActions.next(!1)}ngOnChanges(n){this._stateChanges.next(n)}ngOnDestroy(){this._stateChanges.complete(),this._openCloseAllActions.complete()}static \u0275fac=function(a){return new(a||e)};static \u0275dir=he({type:e,selectors:[["cdk-accordion"],["","cdkAccordion",""]],inputs:{multi:[2,"multi","multi",Ue]},exportAs:["cdkAccordion"],features:[ut([{provide:Km,useExisting:e}]),_n]})}return e})(),Hb=(()=>{class e{accordion=p(Km,{optional:!0,skipSelf:!0});_changeDetectorRef=p(pt);_expansionDispatcher=p(ri);_openCloseAllSubscription=Z.EMPTY;closed=new ee;opened=new ee;destroyed=new ee;expandedChange=new ee;id=p(zo).getId("cdk-accordion-child-");get expanded(){return this._expanded}set expanded(n){if(this._expanded!==n){if(this._expanded=n,this.expandedChange.emit(n),n){this.opened.emit();let a=this.accordion?this.accordion.id:this.id;this._expansionDispatcher.notify(this.id,a)}else this.closed.emit();this._changeDetectorRef.markForCheck()}}_expanded=!1;get disabled(){return this._disabled()}set disabled(n){this._disabled.set(n)}_disabled=We(!1);_removeUniqueSelectionListener=()=>{};constructor(){}ngOnInit(){this._removeUniqueSelectionListener=this._expansionDispatcher.listen((n,a)=>{this.accordion&&!this.accordion.multi&&this.accordion.id===a&&this.id!==n&&(this.expanded=!1)}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions())}ngOnDestroy(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe()}toggle(){this.disabled||(this.expanded=!this.expanded)}close(){this.disabled||(this.expanded=!1)}open(){this.disabled||(this.expanded=!0)}_subscribeToOpenCloseAllActions(){return this.accordion._openCloseAllActions.subscribe(n=>{this.disabled||(this.expanded=n)})}static \u0275fac=function(a){return new(a||e)};static \u0275dir=he({type:e,selectors:[["cdk-accordion-item"],["","cdkAccordionItem",""]],inputs:{expanded:[2,"expanded","expanded",Ue],disabled:[2,"disabled","disabled",Ue]},outputs:{closed:"closed",opened:"opened",destroyed:"destroyed",expandedChange:"expandedChange"},exportAs:["cdkAccordionItem"],features:[ut([{provide:Km,useValue:void 0}])]})}return e})(),$b=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=ue({type:e});static \u0275inj=ie({})}return e})();var ii=class{_attachedHost;attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;t!=null&&(this._attachedHost=null,t.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(t){this._attachedHost=t}},Xm=class extends ii{component;viewContainerRef;injector;projectableNodes;constructor(t,n,a,o){super(),this.component=t,this.viewContainerRef=n,this.injector=a,this.projectableNodes=o}},si=class extends ii{templateRef;viewContainerRef;context;injector;constructor(t,n,a,o){super(),this.templateRef=t,this.viewContainerRef=n,this.context=a,this.injector=o}get origin(){return this.templateRef.elementRef}attach(t,n=this.context){return this.context=n,super.attach(t)}detach(){return this.context=void 0,super.detach()}},ef=class extends ii{element;constructor(t){super(),this.element=t instanceof de?t.nativeElement:t}},nf=class{_attachedPortal;_disposeFn;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(t){if(t instanceof Xm)return this._attachedPortal=t,this.attachComponentPortal(t);if(t instanceof si)return this._attachedPortal=t,this.attachTemplatePortal(t);if(this.attachDomPortal&&t instanceof ef)return this._attachedPortal=t,this.attachDomPortal(t)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(t){this._disposeFn=t}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}};var Gb=(()=>{class e extends nf{_moduleRef=p(st,{optional:!0});_document=p($);_viewContainerRef=p(Ke);_isInitialized=!1;_attachedRef;constructor(){super()}get portal(){return this._attachedPortal}set portal(n){this.hasAttached()&&!n&&!this._isInitialized||(this.hasAttached()&&super.detach(),n&&super.attach(n),this._attachedPortal=n||null)}attached=new ee;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(n){n.setAttachedHost(this);let a=n.viewContainerRef!=null?n.viewContainerRef:this._viewContainerRef,o=a.createComponent(n.component,{index:a.length,injector:n.injector||a.injector,projectableNodes:n.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0});return a!==this._viewContainerRef&&this._getRootNode().appendChild(o.hostView.rootNodes[0]),super.setDisposeFn(()=>o.destroy()),this._attachedPortal=n,this._attachedRef=o,this.attached.emit(o),o}attachTemplatePortal(n){n.setAttachedHost(this);let a=this._viewContainerRef.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=n,this._attachedRef=a,this.attached.emit(a),a}attachDomPortal=n=>{let a=n.element;a.parentNode;let o=this._document.createComment("dom-portal");n.setAttachedHost(this),a.parentNode.insertBefore(o,a),this._getRootNode().appendChild(a),this._attachedPortal=n,super.setDisposeFn(()=>{o.parentNode&&o.parentNode.replaceChild(a,o)})};_getRootNode(){let n=this._viewContainerRef.element.nativeElement;return n.nodeType===n.ELEMENT_NODE?n:n.parentNode}static \u0275fac=function(a){return new(a||e)};static \u0275dir=he({type:e,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[Ea]})}return e})();var Wb=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=ue({type:e});static \u0275inj=ie({})}return e})();function Jb(e){return e.buttons===0||e.detail===0}function Qb(e){let t=e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0];return!!t&&t.identifier===-1&&(t.radiusX==null||t.radiusX===1)&&(t.radiusY==null||t.radiusY===1)}var tf;function dx(){if(tf==null){let e=typeof document<"u"?document.head:null;tf=!!(e&&(e.createShadowRoot||e.attachShadow))}return tf}function Yb(e){if(dx()){let t=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&t instanceof ShadowRoot)return t}return null}function qo(e){return e.composedPath?e.composedPath()[0]:e.target}var af;try{af=typeof Intl<"u"&&Intl.v8BreakIterator}catch{af=!1}var Pa=(()=>{class e{_platformId=p(Ft);isBrowser=this._platformId?Dy(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||af)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var ci;function ux(){if(ci==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>ci=!0}))}finally{ci=ci||!1}return ci}function Zb(e){return ux()?e:!!e.capture}function nl(e){return e instanceof de?e.nativeElement:e}var Kb=new I("cdk-input-modality-detector-options"),Xb={ignoreKeys:[18,17,224,91,16]},e0=650,of={passive:!0,capture:!0},n0=(()=>{class e{_platform=p(Pa);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new be(null);_options;_lastTouchMs=0;_onKeydown=n=>{this._options?.ignoreKeys?.some(a=>a===n.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=qo(n))};_onMousedown=n=>{Date.now()-this._lastTouchMs<e0||(this._modality.next(Jb(n)?"keyboard":"mouse"),this._mostRecentTarget=qo(n))};_onTouchstart=n=>{if(Qb(n)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=qo(n)};constructor(){let n=p(G),a=p($),o=p(Kb,{optional:!0});if(this._options=_(_({},Xb),o),this.modalityDetected=this._modality.pipe(Qo(1)),this.modalityChanged=this.modalityDetected.pipe(kl()),this._platform.isBrowser){let r=p(it).createRenderer(null,null);this._listenerCleanups=n.runOutsideAngular(()=>[r.listen(a,"keydown",this._onKeydown,of),r.listen(a,"mousedown",this._onMousedown,of),r.listen(a,"touchstart",this._onTouchstart,of)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(n=>n())}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),li=(function(e){return e[e.IMMEDIATE=0]="IMMEDIATE",e[e.EVENTUAL=1]="EVENTUAL",e})(li||{}),t0=new I("cdk-focus-monitor-default-options"),tl=Zb({passive:!0,capture:!0}),rf=(()=>{class e{_ngZone=p(G);_platform=p(Pa);_inputModalityDetector=p(n0);_origin=null;_lastFocusOrigin;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=p($);_stopInputModalityDetector=new H;constructor(){let n=p(t0,{optional:!0});this._detectionMode=n?.detectionMode||li.IMMEDIATE}_rootNodeFocusAndBlurListener=n=>{let a=qo(n);for(let o=a;o;o=o.parentElement)n.type==="focus"?this._onFocus(n,o):this._onBlur(n,o)};monitor(n,a=!1){let o=nl(n);if(!this._platform.isBrowser||o.nodeType!==1)return x();let r=Yb(o)||this._document,i=this._elementInfo.get(o);if(i)return a&&(i.checkChildren=!0),i.subject;let s={checkChildren:a,subject:new H,rootNode:r};return this._elementInfo.set(o,s),this._registerGlobalListeners(s),s.subject}stopMonitoring(n){let a=nl(n),o=this._elementInfo.get(a);o&&(o.subject.complete(),this._setClasses(a),this._elementInfo.delete(a),this._removeGlobalListeners(o))}focusVia(n,a,o){let r=nl(n),i=this._document.activeElement;r===i?this._getClosestElementsInfo(r).forEach(([s,c])=>this._originChanged(s,a,c)):(this._setOrigin(a),typeof r.focus=="function"&&r.focus(o))}ngOnDestroy(){this._elementInfo.forEach((n,a)=>this.stopMonitoring(a))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(n){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(n)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:n&&this._isLastInteractionFromInputLabel(n)?"mouse":"program"}_shouldBeAttributedToTouch(n){return this._detectionMode===li.EVENTUAL||!!n?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(n,a){n.classList.toggle("cdk-focused",!!a),n.classList.toggle("cdk-touch-focused",a==="touch"),n.classList.toggle("cdk-keyboard-focused",a==="keyboard"),n.classList.toggle("cdk-mouse-focused",a==="mouse"),n.classList.toggle("cdk-program-focused",a==="program")}_setOrigin(n,a=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=n,this._originFromTouchInteraction=n==="touch"&&a,this._detectionMode===li.IMMEDIATE){clearTimeout(this._originTimeoutId);let o=this._originFromTouchInteraction?e0:1;this._originTimeoutId=setTimeout(()=>this._origin=null,o)}})}_onFocus(n,a){let o=this._elementInfo.get(a),r=qo(n);!o||!o.checkChildren&&a!==r||this._originChanged(a,this._getFocusOrigin(r),o)}_onBlur(n,a){let o=this._elementInfo.get(a);!o||o.checkChildren&&n.relatedTarget instanceof Node&&a.contains(n.relatedTarget)||(this._setClasses(a),this._emitOrigin(o,null))}_emitOrigin(n,a){n.subject.observers.length&&this._ngZone.run(()=>n.subject.next(a))}_registerGlobalListeners(n){if(!this._platform.isBrowser)return;let a=n.rootNode,o=this._rootNodeFocusListenerCount.get(a)||0;o||this._ngZone.runOutsideAngular(()=>{a.addEventListener("focus",this._rootNodeFocusAndBlurListener,tl),a.addEventListener("blur",this._rootNodeFocusAndBlurListener,tl)}),this._rootNodeFocusListenerCount.set(a,o+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(It(this._stopInputModalityDetector)).subscribe(r=>{this._setOrigin(r,!0)}))}_removeGlobalListeners(n){let a=n.rootNode;if(this._rootNodeFocusListenerCount.has(a)){let o=this._rootNodeFocusListenerCount.get(a);o>1?this._rootNodeFocusListenerCount.set(a,o-1):(a.removeEventListener("focus",this._rootNodeFocusAndBlurListener,tl),a.removeEventListener("blur",this._rootNodeFocusAndBlurListener,tl),this._rootNodeFocusListenerCount.delete(a))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(n,a,o){this._setClasses(n,a),this._emitOrigin(o,a),this._lastFocusOrigin=a}_getClosestElementsInfo(n){let a=[];return this._elementInfo.forEach((o,r)=>{(r===n||o.checkChildren&&r.contains(n))&&a.push([r,o])}),a}_isLastInteractionFromInputLabel(n){let{_mostRecentTarget:a,mostRecentModality:o}=this._inputModalityDetector;if(o!=="mouse"||!a||a===n||n.nodeName!=="INPUT"&&n.nodeName!=="TEXTAREA"||n.disabled)return!1;let r=n.labels;if(r){for(let i=0;i<r.length;i++)if(r[i].contains(a))return!0}return!1}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var al=new WeakMap,sf=(()=>{class e{_appRef;_injector=p(ve);_environmentInjector=p(se);load(n){let a=this._appRef=this._appRef||this._injector.get(Dn),o=al.get(a);o||(o={loaders:new Set,refs:[]},al.set(a,o),a.onDestroy(()=>{al.get(a)?.refs.forEach(r=>r.destroy()),al.delete(a)})),o.loaders.has(n)||(o.loaders.add(n),o.refs.push(Yp(n,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function cf(e){return Array.isArray(e)?e:[e]}var a0=new Set,Na,ol=(()=>{class e{_platform=p(Pa);_nonce=p(ho,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):mx}matchMedia(n){return(this._platform.WEBKIT||this._platform.BLINK)&&px(n,this._nonce),this._matchMedia(n)}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function px(e,t){if(!a0.has(e))try{Na||(Na=document.createElement("style"),t&&Na.setAttribute("nonce",t),Na.setAttribute("type","text/css"),document.head.appendChild(Na)),Na.sheet&&(Na.sheet.insertRule(`@media ${e} {body{ }}`,0),a0.add(e))}catch(n){console.error(n)}}function mx(e){return{matches:e==="all"||e==="",media:e,addListener:()=>{},removeListener:()=>{}}}var lf=(()=>{class e{_mediaMatcher=p(ol);_zone=p(G);_queries=new Map;_destroySubject=new H;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(n){return o0(cf(n)).some(o=>this._registerQuery(o).mql.matches)}observe(n){let o=o0(cf(n)).map(i=>this._registerQuery(i).observable),r=ta(o);return r=Et(r.pipe(ke(1)),r.pipe(Qo(1),Jo(0))),r.pipe(A(i=>{let s={matches:!1,breakpoints:{}};return i.forEach(({matches:c,query:l})=>{s.matches=s.matches||c,s.breakpoints[l]=c}),s}))}_registerQuery(n){if(this._queries.has(n))return this._queries.get(n);let a=this._mediaMatcher.matchMedia(n),r={observable:new B(i=>{let s=c=>this._zone.run(()=>i.next(c));return a.addListener(s),()=>{a.removeListener(s)}}).pipe(Dt(a),A(({matches:i})=>({query:n,matches:i})),It(this._destroySubject)),mql:a};return this._queries.set(n,r),r}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function o0(e){return e.map(t=>t.split(",")).reduce((t,n)=>t.concat(n)).map(t=>t.trim())}var Yt=(function(e){return e[e.NONE=0]="NONE",e[e.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",e[e.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",e})(Yt||{}),r0="cdk-high-contrast-black-on-white",i0="cdk-high-contrast-white-on-black",df="cdk-high-contrast-active",uf=(()=>{class e{_platform=p(Pa);_hasCheckedHighContrastMode;_document=p($);_breakpointSubscription;constructor(){this._breakpointSubscription=p(lf).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return Yt.NONE;let n=this._document.createElement("div");n.style.backgroundColor="rgb(1,2,3)",n.style.position="absolute",this._document.body.appendChild(n);let a=this._document.defaultView||window,o=a&&a.getComputedStyle?a.getComputedStyle(n):null,r=(o&&o.backgroundColor||"").replace(/ /g,"");switch(n.remove(),r){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return Yt.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return Yt.BLACK_ON_WHITE}return Yt.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let n=this._document.body.classList;n.remove(df,r0,i0),this._hasCheckedHighContrastMode=!0;let a=this.getHighContrastMode();a===Yt.BLACK_ON_WHITE?n.add(df,r0):a===Yt.WHITE_ON_BLACK&&n.add(df,i0)}}static \u0275fac=function(a){return new(a||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var fx=200,rl=class{_letterKeyStream=new H;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new H;selectedItem=this._selectedItem;constructor(t,n){let a=typeof n?.debounceInterval=="number"?n.debounceInterval:fx;n?.skipPredicate&&(this._skipPredicateFn=n.skipPredicate),this.setItems(t),this._setupKeyHandler(a)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(t){this._selectedItemIndex=t}setItems(t){this._items=t}handleKey(t){let n=t.keyCode;t.key&&t.key.length===1?this._letterKeyStream.next(t.key.toLocaleUpperCase()):(n>=65&&n<=90||n>=48&&n<=57)&&this._letterKeyStream.next(String.fromCharCode(n))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(t){this._letterKeyStream.pipe(re(n=>this._pressedLetters.push(n)),Jo(t),ne(()=>this._pressedLetters.length>0),A(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(n=>{for(let a=1;a<this._items.length+1;a++){let o=(this._selectedItemIndex+a)%this._items.length,r=this._items[o];if(!this._skipPredicateFn?.(r)&&r.getLabel?.().toLocaleUpperCase().trim().indexOf(n)===0){this._selectedItem.next(r);break}}this._pressedLetters=[]})}};function il(e,...t){return t.length?t.some(n=>e[n]):e.altKey||e.shiftKey||e.ctrlKey||e.metaKey}var sl=class{_items;_activeItemIndex=We(-1);_activeItem=We(null);_wrap=!1;_typeaheadSubscription=Z.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=t=>t.disabled;constructor(t,n){this._items=t,t instanceof at?this._itemChangesSubscription=t.changes.subscribe(a=>this._itemsChanged(a.toArray())):pr(t)&&(this._effectRef=kp(()=>this._itemsChanged(t()),{injector:n}))}tabOut=new H;change=new H;skipPredicate(t){return this._skipPredicateFn=t,this}withWrap(t=!0){return this._wrap=t,this}withVerticalOrientation(t=!0){return this._vertical=t,this}withHorizontalOrientation(t){return this._horizontal=t,this}withAllowedModifierKeys(t){return this._allowedModifierKeys=t,this}withTypeAhead(t=200){this._typeaheadSubscription.unsubscribe();let n=this._getItemsArray();return this._typeahead=new rl(n,{debounceInterval:typeof t=="number"?t:void 0,skipPredicate:a=>this._skipPredicateFn(a)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(a=>{this.setActiveItem(a)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(t=!0){return this._homeAndEnd=t,this}withPageUpDown(t=!0,n=10){return this._pageUpAndDown={enabled:t,delta:n},this}setActiveItem(t){let n=this._activeItem();this.updateActiveItem(t),this._activeItem()!==n&&this.change.next(this._activeItemIndex())}onKeydown(t){let n=t.keyCode,o=["altKey","ctrlKey","metaKey","shiftKey"].every(r=>!t[r]||this._allowedModifierKeys.indexOf(r)>-1);switch(n){case 9:this.tabOut.next();return;case 40:if(this._vertical&&o){this.setNextItemActive();break}else return;case 38:if(this._vertical&&o){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&o){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&o){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&o){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&o){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&o){let r=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(r>0?r:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&o){let r=this._activeItemIndex()+this._pageUpAndDown.delta,i=this._getItemsArray().length;this._setActiveItemByIndex(r<i?r:i-1,-1);break}else return;default:(o||il(t,"shiftKey"))&&this._typeahead?.handleKey(t);return}this._typeahead?.reset(),t.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(t){let n=this._getItemsArray(),a=typeof t=="number"?t:n.indexOf(t),o=n[a];this._activeItem.set(o??null),this._activeItemIndex.set(a),this._typeahead?.setCurrentSelectedItemIndex(a)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(t){this._wrap?this._setActiveInWrapMode(t):this._setActiveInDefaultMode(t)}_setActiveInWrapMode(t){let n=this._getItemsArray();for(let a=1;a<=n.length;a++){let o=(this._activeItemIndex()+t*a+n.length)%n.length,r=n[o];if(!this._skipPredicateFn(r)){this.setActiveItem(o);return}}}_setActiveInDefaultMode(t){this._setActiveItemByIndex(this._activeItemIndex()+t,t)}_setActiveItemByIndex(t,n){let a=this._getItemsArray();if(a[t]){for(;this._skipPredicateFn(a[t]);)if(t+=n,!a[t])return;this.setActiveItem(t)}}_getItemsArray(){return pr(this._items)?this._items():this._items instanceof at?this._items.toArray():this._items}_itemsChanged(t){this._typeahead?.setItems(t);let n=this._activeItem();if(n){let a=t.indexOf(n);a>-1&&a!==this._activeItemIndex()&&(this._activeItemIndex.set(a),this._typeahead?.setCurrentSelectedItemIndex(a))}}};var di=class extends sl{_origin="program";setFocusOrigin(t){return this._origin=t,this}setActiveItem(t){super.setActiveItem(t),this.activeItem&&this.activeItem.focus(this._origin)}};var hx=new I("MATERIAL_ANIMATIONS");var s0=null;function gx(){return p(hx,{optional:!0})?.animationsDisabled||p(Vu,{optional:!0})==="NoopAnimations"?"di-disabled":(s0??=p(ol).matchMedia("(prefers-reduced-motion)").matches,s0?"reduced-motion":"enabled")}function c0(){return gx()!=="enabled"}var l0=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275cmp=me({type:e,selectors:[["structural-styles"]],decls:0,vars:0,template:function(a,o){},styles:[`.mat-focus-indicator{position:relative}.mat-focus-indicator::before{top:0;left:0;right:0;bottom:0;position:absolute;box-sizing:border-box;pointer-events:none;display:var(--mat-focus-indicator-display, none);border-width:var(--mat-focus-indicator-border-width, 3px);border-style:var(--mat-focus-indicator-border-style, solid);border-color:var(--mat-focus-indicator-border-color, transparent);border-radius:var(--mat-focus-indicator-border-radius, 4px)}.mat-focus-indicator:focus::before{content:""}@media(forced-colors: active){html{--mat-focus-indicator-display: block}}
`],encapsulation:2,changeDetection:0})}return e})();var pf=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=ue({type:e});static \u0275inj=ie({})}return e})();var ui=(()=>{class e{constructor(){p(uf)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(a){return new(a||e)};static \u0275mod=ue({type:e});static \u0275inj=ie({imports:[pf,pf]})}return e})();var bx=["body"],Ex=["bodyWrapper"],Cx=[[["mat-expansion-panel-header"]],"*",[["mat-action-row"]]],_x=["mat-expansion-panel-header","*","mat-action-row"];function Dx(e,t){}var Ix=[[["mat-panel-title"]],[["mat-panel-description"]],"*"],Sx=["mat-panel-title","mat-panel-description","*"];function Mx(e,t){e&1&&(ln(0,"span",1),ro(),ln(1,"svg",2),oc(2,"path",3),In()())}var mf=new I("MAT_ACCORDION"),d0=new I("MAT_EXPANSION_PANEL"),Tx=(()=>{class e{_template=p(Cn);_expansionPanel=p(d0,{optional:!0});constructor(){}static \u0275fac=function(a){return new(a||e)};static \u0275dir=he({type:e,selectors:[["ng-template","matExpansionPanelContent",""]]})}return e})(),u0=new I("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS"),ff=(()=>{class e extends Hb{_viewContainerRef=p(Ke);_animationsDisabled=c0();_document=p($);_ngZone=p(G);_elementRef=p(de);_renderer=p(kt);_cleanupTransitionEnd;get hideToggle(){return this._hideToggle||this.accordion&&this.accordion.hideToggle}set hideToggle(n){this._hideToggle=n}_hideToggle=!1;get togglePosition(){return this._togglePosition||this.accordion&&this.accordion.togglePosition}set togglePosition(n){this._togglePosition=n}_togglePosition;afterExpand=new ee;afterCollapse=new ee;_inputChanges=new H;accordion=p(mf,{optional:!0,skipSelf:!0});_lazyContent;_body;_bodyWrapper;_portal;_headerId=p(zo).getId("mat-expansion-panel-header-");constructor(){super();let n=p(u0,{optional:!0});this._expansionDispatcher=p(ri),n&&(this.hideToggle=n.hideToggle)}_hasSpacing(){return this.accordion?this.expanded&&this.accordion.displayMode==="default":!1}_getExpandedState(){return this.expanded?"expanded":"collapsed"}toggle(){this.expanded=!this.expanded}close(){this.expanded=!1}open(){this.expanded=!0}ngAfterContentInit(){this._lazyContent&&this._lazyContent._expansionPanel===this&&this.opened.pipe(Dt(null),ne(()=>this.expanded&&!this._portal),ke(1)).subscribe(()=>{this._portal=new si(this._lazyContent._template,this._viewContainerRef)}),this._setupAnimationEvents()}ngOnChanges(n){this._inputChanges.next(n)}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTransitionEnd?.(),this._inputChanges.complete()}_containsFocus(){if(this._body){let n=this._document.activeElement,a=this._body.nativeElement;return n===a||a.contains(n)}return!1}_transitionEndListener=({target:n,propertyName:a})=>{n===this._bodyWrapper?.nativeElement&&a==="grid-template-rows"&&this._ngZone.run(()=>{this.expanded?this.afterExpand.emit():this.afterCollapse.emit()})};_setupAnimationEvents(){this._ngZone.runOutsideAngular(()=>{this._animationsDisabled?(this.opened.subscribe(()=>this._ngZone.run(()=>this.afterExpand.emit())),this.closed.subscribe(()=>this._ngZone.run(()=>this.afterCollapse.emit()))):setTimeout(()=>{let n=this._elementRef.nativeElement;this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this._transitionEndListener),n.classList.add("mat-expansion-panel-animations-enabled")},200)})}static \u0275fac=function(a){return new(a||e)};static \u0275cmp=me({type:e,selectors:[["mat-expansion-panel"]],contentQueries:function(a,o,r){if(a&1&&Rr(r,Tx,5),a&2){let i;_a(i=Da())&&(o._lazyContent=i.first)}},viewQuery:function(a,o){if(a&1&&(rc(bx,5),rc(Ex,5)),a&2){let r;_a(r=Da())&&(o._body=r.first),_a(r=Da())&&(o._bodyWrapper=r.first)}},hostAttrs:[1,"mat-expansion-panel"],hostVars:4,hostBindings:function(a,o){a&2&&ge("mat-expanded",o.expanded)("mat-expansion-panel-spacing",o._hasSpacing())},inputs:{hideToggle:[2,"hideToggle","hideToggle",Ue],togglePosition:"togglePosition"},outputs:{afterExpand:"afterExpand",afterCollapse:"afterCollapse"},exportAs:["matExpansionPanel"],features:[ut([{provide:mf,useValue:void 0},{provide:d0,useExisting:e}]),Ea,_n],ngContentSelectors:_x,decls:9,vars:4,consts:[["bodyWrapper",""],["body",""],[1,"mat-expansion-panel-content-wrapper"],["role","region",1,"mat-expansion-panel-content",3,"id"],[1,"mat-expansion-panel-body"],[3,"cdkPortalOutlet"]],template:function(a,o){a&1&&(Eo(Cx),Bn(0),g(1,"div",2,0)(3,"div",3,1)(5,"div",4),Bn(6,1),O(7,Dx,0,0,"ng-template",5),h(),Bn(8,2),h()()),a&2&&(v(),Ee("inert",o.expanded?null:""),v(2),C("id",o.id),Ee("aria-labelledby",o._headerId),v(4),C("cdkPortalOutlet",o._portal))},dependencies:[Gb],styles:[`.mat-expansion-panel{box-sizing:content-box;display:block;margin:0;overflow:hidden;position:relative;background:var(--mat-expansion-container-background-color, var(--mat-sys-surface));color:var(--mat-expansion-container-text-color, var(--mat-sys-on-surface));border-radius:var(--mat-expansion-container-shape, 12px)}.mat-expansion-panel.mat-expansion-panel-animations-enabled{transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:var(--mat-expansion-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12))}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:var(--mat-expansion-container-shape, 12px);border-top-left-radius:var(--mat-expansion-container-shape, 12px)}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:var(--mat-expansion-container-shape, 12px);border-bottom-left-radius:var(--mat-expansion-container-shape, 12px)}@media(forced-colors: active){.mat-expansion-panel{outline:solid 1px}}.mat-expansion-panel-content-wrapper{display:grid;grid-template-rows:0fr;grid-template-columns:100%}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content-wrapper{transition:grid-template-rows 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{grid-template-rows:1fr}@supports not (grid-template-rows: 0fr){.mat-expansion-panel-content-wrapper{height:0}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{height:auto}}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible;min-height:0;visibility:hidden;font-family:var(--mat-expansion-container-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-expansion-container-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-expansion-container-text-weight, var(--mat-sys-body-large-weight));line-height:var(--mat-expansion-container-text-line-height, var(--mat-sys-body-large-line-height));letter-spacing:var(--mat-expansion-container-text-tracking, var(--mat-sys-body-large-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content{transition:visibility 190ms linear}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper>.mat-expansion-panel-content{visibility:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px;border-top-color:var(--mat-expansion-actions-divider-color, var(--mat-sys-outline))}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}
`],encapsulation:2,changeDetection:0})}return e})();var hf=(()=>{class e{panel=p(ff,{host:!0});_element=p(de);_focusMonitor=p(rf);_changeDetectorRef=p(pt);_parentChangeSubscription=Z.EMPTY;constructor(){p(sf).load(l0);let n=this.panel,a=p(u0,{optional:!0}),o=p(new Ut("tabindex"),{optional:!0}),r=n.accordion?n.accordion._stateChanges.pipe(ne(i=>!!(i.hideToggle||i.togglePosition))):_e;this.tabIndex=parseInt(o||"")||0,this._parentChangeSubscription=Fl(n.opened,n.closed,r,n._inputChanges.pipe(ne(i=>!!(i.hideToggle||i.disabled||i.togglePosition)))).subscribe(()=>this._changeDetectorRef.markForCheck()),n.closed.pipe(ne(()=>n._containsFocus())).subscribe(()=>this._focusMonitor.focusVia(this._element,"program")),a&&(this.expandedHeight=a.expandedHeight,this.collapsedHeight=a.collapsedHeight)}expandedHeight;collapsedHeight;tabIndex=0;get disabled(){return this.panel.disabled}_toggle(){this.disabled||this.panel.toggle()}_isExpanded(){return this.panel.expanded}_getExpandedState(){return this.panel._getExpandedState()}_getPanelId(){return this.panel.id}_getTogglePosition(){return this.panel.togglePosition}_showToggle(){return!this.panel.hideToggle&&!this.panel.disabled}_getHeaderHeight(){let n=this._isExpanded();return n&&this.expandedHeight?this.expandedHeight:!n&&this.collapsedHeight?this.collapsedHeight:null}_keydown(n){switch(n.keyCode){case 32:case 13:il(n)||(n.preventDefault(),this._toggle());break;default:this.panel.accordion&&this.panel.accordion._handleHeaderKeydown(n);return}}focus(n,a){n?this._focusMonitor.focusVia(this._element,n,a):this._element.nativeElement.focus(a)}ngAfterViewInit(){this._focusMonitor.monitor(this._element).subscribe(n=>{n&&this.panel.accordion&&this.panel.accordion._handleHeaderFocus(this)})}ngOnDestroy(){this._parentChangeSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._element)}static \u0275fac=function(a){return new(a||e)};static \u0275cmp=me({type:e,selectors:[["mat-expansion-panel-header"]],hostAttrs:["role","button",1,"mat-expansion-panel-header","mat-focus-indicator"],hostVars:13,hostBindings:function(a,o){a&1&&pe("click",function(){return o._toggle()})("keydown",function(i){return o._keydown(i)}),a&2&&(Ee("id",o.panel._headerId)("tabindex",o.disabled?-1:o.tabIndex)("aria-controls",o._getPanelId())("aria-expanded",o._isExpanded())("aria-disabled",o.panel.disabled),ic("height",o._getHeaderHeight()),ge("mat-expanded",o._isExpanded())("mat-expansion-toggle-indicator-after",o._getTogglePosition()==="after")("mat-expansion-toggle-indicator-before",o._getTogglePosition()==="before"))},inputs:{expandedHeight:"expandedHeight",collapsedHeight:"collapsedHeight",tabIndex:[2,"tabIndex","tabIndex",n=>n==null?0:Qp(n)]},ngContentSelectors:Sx,decls:5,vars:3,consts:[[1,"mat-content"],[1,"mat-expansion-indicator"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 -960 960 960","aria-hidden","true","focusable","false"],["d","M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"]],template:function(a,o){a&1&&(Eo(Ix),ln(0,"span",0),Bn(1),Bn(2,1),Bn(3,2),In(),Pp(4,Mx,3,0,"span",1)),a&2&&(ge("mat-content-hide-toggle",!o._showToggle()),v(4),jp(o._showToggle()?4:-1))},styles:[`.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;height:var(--mat-expansion-header-collapsed-state-height, 48px);font-family:var(--mat-expansion-header-text-font, var(--mat-sys-title-medium-font));font-size:var(--mat-expansion-header-text-size, var(--mat-sys-title-medium-size));font-weight:var(--mat-expansion-header-text-weight, var(--mat-sys-title-medium-weight));line-height:var(--mat-expansion-header-text-line-height, var(--mat-sys-title-medium-line-height));letter-spacing:var(--mat-expansion-header-text-tracking, var(--mat-sys-title-medium-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-header{transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header::before{border-radius:inherit}.mat-expansion-panel-header.mat-expanded{height:var(--mat-expansion-header-expanded-state-height, 64px)}.mat-expansion-panel-header[aria-disabled=true]{color:var(--mat-expansion-header-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent))}@media(hover: none){.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-container-background-color, var(--mat-sys-surface))}}.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused{background:var(--mat-expansion-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent))}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-content.mat-content-hide-toggle{margin-right:8px}[dir=rtl] .mat-content.mat-content-hide-toggle{margin-right:0;margin-left:8px}.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-right:24px;margin-left:0}.mat-expansion-panel-header-title{color:var(--mat-expansion-header-text-color, var(--mat-sys-on-surface))}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description{color:inherit}.mat-expansion-panel-header-description{flex-grow:2;color:var(--mat-expansion-header-description-color, var(--mat-sys-on-surface-variant))}.mat-expansion-panel-animations-enabled .mat-expansion-indicator{transition:transform 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header.mat-expanded .mat-expansion-indicator{transform:rotate(180deg)}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";padding:3px;transform:rotate(45deg);vertical-align:middle;color:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-legacy-header-indicator-display, none)}.mat-expansion-indicator svg{width:24px;height:24px;margin:0 -8px;vertical-align:middle;fill:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-header-indicator-display, inline-block)}@media(forced-colors: active){.mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}}
`],encapsulation:2,changeDetection:0})}return e})();var p0=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275dir=he({type:e,selectors:[["mat-panel-title"]],hostAttrs:[1,"mat-expansion-panel-header-title"]})}return e})(),m0=(()=>{class e extends Ub{_keyManager;_ownHeaders=new at;_headers;hideToggle=!1;displayMode="default";togglePosition="after";ngAfterContentInit(){this._headers.changes.pipe(Dt(this._headers)).subscribe(n=>{this._ownHeaders.reset(n.filter(a=>a.panel.accordion===this)),this._ownHeaders.notifyOnChanges()}),this._keyManager=new di(this._ownHeaders).withWrap().withHomeAndEnd()}_handleHeaderKeydown(n){this._keyManager.onKeydown(n)}_handleHeaderFocus(n){this._keyManager.updateActiveItem(n)}ngOnDestroy(){super.ngOnDestroy(),this._keyManager?.destroy(),this._ownHeaders.destroy()}static \u0275fac=(()=>{let n;return function(o){return(n||(n=ba(e)))(o||e)}})();static \u0275dir=he({type:e,selectors:[["mat-accordion"]],contentQueries:function(a,o,r){if(a&1&&Rr(r,hf,5),a&2){let i;_a(i=Da())&&(o._headers=i)}},hostAttrs:[1,"mat-accordion"],hostVars:2,hostBindings:function(a,o){a&2&&ge("mat-accordion-multi",o.multi)},inputs:{hideToggle:[2,"hideToggle","hideToggle",Ue],displayMode:"displayMode",togglePosition:"togglePosition"},exportAs:["matAccordion"],features:[ut([{provide:mf,useExisting:e}]),Ea]})}return e})(),f0=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=ue({type:e});static \u0275inj=ie({imports:[ui,$b,Wb]})}return e})();var cl;function wx(){if(cl===void 0&&(cl=null,typeof window<"u")){let e=window;e.trustedTypes!==void 0&&(cl=e.trustedTypes.createPolicy("angular#components",{createHTML:t=>t}))}return cl}function pi(e){return wx()?.createHTML(e)||e}function h0(e){return Error(`Unable to find icon with the name "${e}"`)}function Ax(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function g0(e){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${e}".`)}function v0(e){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${e}".`)}var gt=class{url;svgText;options;svgElement;constructor(t,n,a){this.url=t,this.svgText=n,this.options=a}},b0=(()=>{class e{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(n,a,o,r){this._httpClient=n,this._sanitizer=a,this._errorHandler=r,this._document=o}addSvgIcon(n,a,o){return this.addSvgIconInNamespace("",n,a,o)}addSvgIconLiteral(n,a,o){return this.addSvgIconLiteralInNamespace("",n,a,o)}addSvgIconInNamespace(n,a,o,r){return this._addSvgIconConfig(n,a,new gt(o,null,r))}addSvgIconResolver(n){return this._resolvers.push(n),this}addSvgIconLiteralInNamespace(n,a,o,r){let i=this._sanitizer.sanitize(we.HTML,o);if(!i)throw v0(o);let s=pi(i);return this._addSvgIconConfig(n,a,new gt("",s,r))}addSvgIconSet(n,a){return this.addSvgIconSetInNamespace("",n,a)}addSvgIconSetLiteral(n,a){return this.addSvgIconSetLiteralInNamespace("",n,a)}addSvgIconSetInNamespace(n,a,o){return this._addSvgIconSetConfig(n,new gt(a,null,o))}addSvgIconSetLiteralInNamespace(n,a,o){let r=this._sanitizer.sanitize(we.HTML,a);if(!r)throw v0(a);let i=pi(r);return this._addSvgIconSetConfig(n,new gt("",i,o))}registerFontClassAlias(n,a=n){return this._fontCssClassesByAlias.set(n,a),this}classNameForFontAlias(n){return this._fontCssClassesByAlias.get(n)||n}setDefaultFontSetClass(...n){return this._defaultFontSetClass=n,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(n){let a=this._sanitizer.sanitize(we.RESOURCE_URL,n);if(!a)throw g0(n);let o=this._cachedIconsByUrl.get(a);return o?x(ll(o)):this._loadSvgIconFromConfig(new gt(n,null)).pipe(re(r=>this._cachedIconsByUrl.set(a,r)),A(r=>ll(r)))}getNamedSvgIcon(n,a=""){let o=y0(a,n),r=this._svgIconConfigs.get(o);if(r)return this._getSvgFromConfig(r);if(r=this._getIconConfigFromResolvers(a,n),r)return this._svgIconConfigs.set(o,r),this._getSvgFromConfig(r);let i=this._iconSetConfigs.get(a);return i?this._getSvgFromIconSetConfigs(n,i):yt(h0(o))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(n){return n.svgText?x(ll(this._svgElementFromConfig(n))):this._loadSvgIconFromConfig(n).pipe(A(a=>ll(a)))}_getSvgFromIconSetConfigs(n,a){let o=this._extractIconWithNameFromAnySet(n,a);if(o)return x(o);let r=a.filter(i=>!i.svgText).map(i=>this._loadSvgIconSetFromConfig(i).pipe(mn(s=>{let l=`Loading icon set URL: ${this._sanitizer.sanitize(we.RESOURCE_URL,i.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(l)),x(null)})));return Ll(r).pipe(A(()=>{let i=this._extractIconWithNameFromAnySet(n,a);if(!i)throw h0(n);return i}))}_extractIconWithNameFromAnySet(n,a){for(let o=a.length-1;o>=0;o--){let r=a[o];if(r.svgText&&r.svgText.toString().indexOf(n)>-1){let i=this._svgElementFromConfig(r),s=this._extractSvgIconFromSet(i,n,r.options);if(s)return s}}return null}_loadSvgIconFromConfig(n){return this._fetchIcon(n).pipe(re(a=>n.svgText=a),A(()=>this._svgElementFromConfig(n)))}_loadSvgIconSetFromConfig(n){return n.svgText?x(null):this._fetchIcon(n).pipe(re(a=>n.svgText=a))}_extractSvgIconFromSet(n,a,o){let r=n.querySelector(`[id="${a}"]`);if(!r)return null;let i=r.cloneNode(!0);if(i.removeAttribute("id"),i.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(i,o);if(i.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(i),o);let s=this._svgElementFromString(pi("<svg></svg>"));return s.appendChild(i),this._setSvgAttributes(s,o)}_svgElementFromString(n){let a=this._document.createElement("DIV");a.innerHTML=n;let o=a.querySelector("svg");if(!o)throw Error("<svg> tag not found");return o}_toSvgElement(n){let a=this._svgElementFromString(pi("<svg></svg>")),o=n.attributes;for(let r=0;r<o.length;r++){let{name:i,value:s}=o[r];i!=="id"&&a.setAttribute(i,s)}for(let r=0;r<n.childNodes.length;r++)n.childNodes[r].nodeType===this._document.ELEMENT_NODE&&a.appendChild(n.childNodes[r].cloneNode(!0));return a}_setSvgAttributes(n,a){return n.setAttribute("fit",""),n.setAttribute("height","100%"),n.setAttribute("width","100%"),n.setAttribute("preserveAspectRatio","xMidYMid meet"),n.setAttribute("focusable","false"),a&&a.viewBox&&n.setAttribute("viewBox",a.viewBox),n}_fetchIcon(n){let{url:a,options:o}=n,r=o?.withCredentials??!1;if(!this._httpClient)throw Ax();if(a==null)throw Error(`Cannot fetch icon from URL "${a}".`);let i=this._sanitizer.sanitize(we.RESOURCE_URL,a);if(!i)throw g0(a);let s=this._inProgressUrlFetches.get(i);if(s)return s;let c=this._httpClient.get(i,{responseType:"text",withCredentials:r}).pipe(A(l=>pi(l)),_t(()=>this._inProgressUrlFetches.delete(i)),Vl());return this._inProgressUrlFetches.set(i,c),c}_addSvgIconConfig(n,a,o){return this._svgIconConfigs.set(y0(n,a),o),this}_addSvgIconSetConfig(n,a){let o=this._iconSetConfigs.get(n);return o?o.push(a):this._iconSetConfigs.set(n,[a]),this}_svgElementFromConfig(n){if(!n.svgElement){let a=this._svgElementFromString(n.svgText);this._setSvgAttributes(a,n.options),n.svgElement=a}return n.svgElement}_getIconConfigFromResolvers(n,a){for(let o=0;o<this._resolvers.length;o++){let r=this._resolvers[o](a,n);if(r)return Rx(r)?new gt(r.url,null,r.options):new gt(r,null)}}static \u0275fac=function(a){return new(a||e)(M(Em,8),M(Cm),M($,8),M(Me))};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function ll(e){return e.cloneNode(!0)}function y0(e,t){return e+":"+t}function Rx(e){return!!(e.url&&e.options)}var Px=["*"],Nx=new I("MAT_ICON_DEFAULT_OPTIONS"),jx=new I("mat-icon-location",{providedIn:"root",factory:Ox});function Ox(){let e=p($),t=e?e.location:null;return{getPathname:()=>t?t.pathname+t.search:""}}var E0=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],Lx=E0.map(e=>`[${e}]`).join(", "),Fx=/^url\(['"]?#(.*?)['"]?\)$/,C0=(()=>{class e{_elementRef=p(de);_iconRegistry=p(b0);_location=p(jx);_errorHandler=p(Me);_defaultColor;get color(){return this._color||this._defaultColor}set color(n){this._color=n}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(n){n!==this._svgIcon&&(n?this._updateSvgIcon(n):this._svgIcon&&this._clearSvgElement(),this._svgIcon=n)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(n){let a=this._cleanupFontValue(n);a!==this._fontSet&&(this._fontSet=a,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(n){let a=this._cleanupFontValue(n);a!==this._fontIcon&&(this._fontIcon=a,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName;_svgNamespace;_previousPath;_elementsWithExternalReferences;_currentIconFetch=Z.EMPTY;constructor(){let n=p(new Ut("aria-hidden"),{optional:!0}),a=p(Nx,{optional:!0});a&&(a.color&&(this.color=this._defaultColor=a.color),a.fontSet&&(this.fontSet=a.fontSet)),n||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(n){if(!n)return["",""];let a=n.split(":");switch(a.length){case 1:return["",a[0]];case 2:return a;default:throw Error(`Invalid icon name: "${n}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let n=this._elementsWithExternalReferences;if(n&&n.size){let a=this._location.getPathname();a!==this._previousPath&&(this._previousPath=a,this._prependPathToReferences(a))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(n){this._clearSvgElement();let a=this._location.getPathname();this._previousPath=a,this._cacheChildrenWithExternalReferences(n),this._prependPathToReferences(a),this._elementRef.nativeElement.appendChild(n)}_clearSvgElement(){let n=this._elementRef.nativeElement,a=n.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();a--;){let o=n.childNodes[a];(o.nodeType!==1||o.nodeName.toLowerCase()==="svg")&&o.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let n=this._elementRef.nativeElement,a=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(o=>o.length>0);this._previousFontSetClass.forEach(o=>n.classList.remove(o)),a.forEach(o=>n.classList.add(o)),this._previousFontSetClass=a,this.fontIcon!==this._previousFontIconClass&&!a.includes("mat-ligature-font")&&(this._previousFontIconClass&&n.classList.remove(this._previousFontIconClass),this.fontIcon&&n.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(n){return typeof n=="string"?n.trim().split(" ")[0]:n}_prependPathToReferences(n){let a=this._elementsWithExternalReferences;a&&a.forEach((o,r)=>{o.forEach(i=>{r.setAttribute(i.name,`url('${n}#${i.value}')`)})})}_cacheChildrenWithExternalReferences(n){let a=n.querySelectorAll(Lx),o=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let r=0;r<a.length;r++)E0.forEach(i=>{let s=a[r],c=s.getAttribute(i),l=c?c.match(Fx):null;if(l){let d=o.get(s);d||(d=[],o.set(s,d)),d.push({name:i,value:l[1]})}})}_updateSvgIcon(n){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),n){let[a,o]=this._splitIconName(n);a&&(this._svgNamespace=a),o&&(this._svgName=o),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(o,a).pipe(ke(1)).subscribe(r=>this._setSvgElement(r),r=>{let i=`Error retrieving icon ${a}:${o}! ${r.message}`;this._errorHandler.handleError(new Error(i))})}}static \u0275fac=function(a){return new(a||e)};static \u0275cmp=me({type:e,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(a,o){a&2&&(Ee("data-mat-icon-type",o._usingFontIcon()?"font":"svg")("data-mat-icon-name",o._svgName||o.fontIcon)("data-mat-icon-namespace",o._svgNamespace||o.fontSet)("fontIcon",o._usingFontIcon()?o.fontIcon:null),Op(o.color?"mat-"+o.color:""),ge("mat-icon-inline",o.inline)("mat-icon-no-color",o.color!=="primary"&&o.color!=="accent"&&o.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",Ue],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:Px,decls:1,vars:0,template:function(a,o){a&1&&(Eo(),Bn(0))},styles:[`mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color, inherit)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}
`],encapsulation:2,changeDetection:0})}return e})(),_0=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=ue({type:e});static \u0275inj=ie({imports:[ui,ui]})}return e})();function zx(e,t){if(e&1&&(g(0,"div",1)(1,"h2"),y(2,"Informaci\xF3n general"),h(),g(3,"ul",2)(4,"li")(5,"span",3),y(6,"language"),h(),g(7,"strong"),y(8,"Idioma:"),h(),y(9),h(),g(10,"li")(11,"span",3),y(12,"payments"),h(),g(13,"strong"),y(14,"Moneda:"),h(),y(15),h(),g(16,"li")(17,"span",3),y(18,"schedule"),h(),g(19,"strong"),y(20,"Hora:"),h(),y(21),h(),g(22,"li")(23,"span",3),y(24,"wifi"),h(),g(25,"strong"),y(26,"Internet:"),h(),y(27),h(),g(28,"li")(29,"span",3),y(30,"power"),h(),g(31,"strong"),y(32,"Electricidad:"),h(),y(33),h(),g(34,"li")(35,"span",3),y(36,"badge"),h(),g(37,"strong"),y(38,"Pasaporte:"),h(),y(39),h(),g(40,"li")(41,"span",3),y(42,"assignment_turned_in"),h(),g(43,"strong"),y(44,"Visado:"),h(),y(45),h(),g(46,"li")(47,"span",3),y(48,"health_and_safety"),h(),g(49,"strong"),y(50,"Vacunas:"),h(),y(51),h()()()),e&2){let n=S();v(9),dn(" ",n.infoGeneral.idioma," "),v(6),dn(" ",n.infoGeneral.moneda," "),v(6),dn(" ",n.infoGeneral.hora," "),v(6),dn(" ",n.infoGeneral.internet," "),v(6),dn(" ",n.infoGeneral.electricidad," "),v(6),dn(" ",n.infoGeneral.pasaporte," "),v(6),dn(" ",n.infoGeneral.visado," "),v(6),dn(" ",n.infoGeneral.vacunas," ")}}var dl=class e{infoGeneral;static \u0275fac=function(n){return new(n||e)};static \u0275cmp=me({type:e,selectors:[["app-info-general"]],inputs:{infoGeneral:"infoGeneral"},decls:1,vars:1,consts:[["class","info-container",4,"ngIf"],[1,"info-container"],[1,"info-list"],[1,"material-icons"]],template:function(n,a){n&1&&O(0,zx,52,8,"div",0),n&2&&C("ngIf",a.infoGeneral)},dependencies:[en,mt],styles:[".info-container[_ngcontent-%COMP%]{margin:0;padding:clamp(18px,3vw,28px);border-radius:8px;background:transparent}.info-container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0 0 20px;color:#18212a;font-size:clamp(1.45rem,2.4vw,2rem);font-weight:900;line-height:1.1}.info-list[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr;gap:8px;justify-items:center;text-align:center;padding:14px;border:1px solid rgba(24,33,42,.1);border-radius:8px;background:#fff}.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%]{color:#0f7c90;font-size:26px;line-height:1}.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;margin-bottom:2px;color:#18212a;font-size:.86rem;font-weight:850}.info-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#0f7c90}"]})};var D0={production:!1,cloudinary:{cloudName:"dre38ikvk",uploadPreset:"aventourarte_unsigned",baseFolder:"aventourarte"}};var Bo=class e{cloud=D0.cloudinary.cloudName;url(t,n={}){if(!t)return"";if(!t.startsWith("cld:"))return t;let a=t.replace(/^cld:/,"").replace(/^\/+/,""),o=n.quality??"auto",r=n.format??"auto",i=[`q_${o}`,`f_${r}`];n.dpr&&i.push(`dpr_${n.dpr}`),n.w&&i.push(`w_${n.w}`),n.h&&i.push(`h_${n.h}`),n.crop&&i.push(`c_${n.crop}`),n.gravity&&i.push(`g_${n.gravity}`),n.effect&&i.push(`e_${n.effect}`);let s=i.join(",");return`https://res.cloudinary.com/${this.cloud}/image/upload/${s}/${a}`}background(t,n,a){let o=n?1400:2600;return this.url(t,{w:o,crop:"scale",quality:"auto",format:"auto",dpr:"auto"})}static \u0275fac=function(n){return new(n||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})};var ul=class e{constructor(t){this.img=t}transform(t,n,a,o="fit"){return this.img.url(t,{w:n,h:a,crop:o,quality:"auto",format:"auto"})}static \u0275fac=function(n){return new(n||e)(Q(Bo,16))};static \u0275pipe=Ks({name:"imgUrl",type:e,pure:!0})};var S0={path:"europa/espana/andalucia/cadiz/san-fernando",nombre:"San Fernando",flag:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",background:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",bgPos:"50% 40%",bgPosMobile:"50% 40%",bgDim:.12,flagOpacity:.12,flagOpacityMobile:.18,flagSize:"75%",flagSizeMobile:"50%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`San Fernando, la hist\xF3rica Isla de Le\xF3n, es una de esas ciudades que no se entienden de un solo vistazo. Hay que caminarla despacio, escuchar sus nombres antiguos, mirar sus ca\xF1os, entrar en sus iglesias, seguir la huella de Camar\xF3n y dejarse llevar por esa mezcla tan isle\xF1a de historia, flamenco, salinas y mar.

Aqu\xED se reunieron las Cortes que abrieron el camino a la Constituci\xF3n de 1812, aqu\xED la Armada midi\xF3 el tiempo y las estrellas desde el Observatorio de Marina, y aqu\xED naci\xF3 Jos\xE9 Monje Cruz, Camar\xF3n de la Isla, el cantaor que cambi\xF3 para siempre la historia del flamenco.

San Fernando no presume con estridencia. Se revela en detalles: una fachada barroca al final de la calle Real, una fragua convertida en memoria, un teatro donde naci\xF3 la Espa\xF1a constitucional, una venta donde un ni\xF1o cantaba antes de convertirse en leyenda, una playa inmensa abierta al Atl\xE1ntico y unas marismas donde el silencio tambi\xE9n cuenta historias.

La Isla se disfruta con calma: desayunando bien, entrando en sus monumentos, comiendo pesca\xEDto y tortillitas, haciendo la Ruta de Camar\xF3n y terminando el d\xEDa en Camposoto o en los senderos del Parque Natural Bah\xEDa de C\xE1diz.`,secciones:[{titulo:"Historia",contenido:`San Fernando fue durante siglos una verdadera isla: la Isla de Le\xF3n, rodeada por ca\xF1os, marismas y aguas de la Bah\xEDa de C\xE1diz. Esa condici\xF3n geogr\xE1fica marc\xF3 su historia: la proteg\xEDa, la aislaba y al mismo tiempo la convert\xEDa en un enclave militar y naval de primer orden.

En el siglo XVIII, la ciudad creci\xF3 con fuerza gracias al impulso de la Armada. El Arsenal de La Carraca, el Real Instituto y Observatorio de la Armada, el Pante\xF3n de Marinos Ilustres y otros espacios militares convirtieron San Fernando en uno de los centros estrat\xE9gicos de la Marina espa\xF1ola.

Su momento m\xE1s decisivo lleg\xF3 durante la Guerra de la Independencia. Mientras buena parte de Espa\xF1a estaba ocupada por las tropas napole\xF3nicas, la Isla de Le\xF3n resisti\xF3 y acogi\xF3 a las Cortes Generales y Extraordinarias. En torno al Real Teatro de las Cortes se escribieron algunas de las p\xE1ginas esenciales del constitucionalismo espa\xF1ol.

Pero San Fernando tambi\xE9n es cultura popular. De sus barrios, ventas y familias flamencas surgi\xF3 Camar\xF3n de la Isla, una figura que llev\xF3 el cante jondo a una dimensi\xF3n universal sin perder nunca el v\xEDnculo con su ciudad.`},{titulo:"Geograf\xEDa y Clima",contenido:`San Fernando ocupa la Isla de Le\xF3n, un territorio situado entre la Bah\xEDa de C\xE1diz, el oc\xE9ano Atl\xE1ntico, los ca\xF1os y las marismas. Esta geograf\xEDa explica mucho de su personalidad: San Fernando es urbana, marinera, militar, salinera y natural al mismo tiempo.

El agua est\xE1 siempre presente: en los ca\xF1os que la separan y conectan, en las salinas hist\xF3ricas, en el Parque Natural Bah\xEDa de C\xE1diz y en la Playa de Camposoto, su gran salida al Atl\xE1ntico.

El clima es atl\xE1ntico gaditano, con inviernos suaves, veranos c\xE1lidos y la presencia constante de los vientos. El Levante puede cambiar por completo la sensaci\xF3n t\xE9rmica, pero tambi\xE9n deja cielos limpios y una luz muy especial.

\u{1F4A1} Consejo viajero:
San Fernando funciona muy bien como excursi\xF3n desde C\xE1diz o como base tranquila para explorar la Bah\xEDa. La combinaci\xF3n de centro hist\xF3rico, Camar\xF3n, patrimonio naval y naturaleza la hace mucho m\xE1s completa de lo que parece a primera vista.`},{titulo:"Qu\xE9 visitar en San Fernando",lugares:[{nombre:"Iglesia Conventual de Nuestra Se\xF1ora del Carmen",descripcion:`La Iglesia Conventual de Nuestra Se\xF1ora del Carmen, situada en plena calle Real, es el edificio religioso m\xE1s antiguo de San Fernando: data de 1733 y conserva una importancia hist\xF3rica, art\xEDstica y devocional enorme.

Aqu\xED se venera a la Virgen del Carmen Coronada, Patrona de San Fernando y de la Marina Espa\xF1ola, una imagen que resume como pocas la identidad marinera, militar y religiosa de La Isla.

El templo combina barroco y neoclasicismo, con planta de cruz latina, tres naves y un rico conjunto de retablos. Entre sus tesoros destacan la imagen de San Jos\xE9 de Pietro Galleano, una de las grandes esculturas de la escuela genovesa del siglo XVIII en Espa\xF1a, y una importante colecci\xF3n pict\xF3rica sobre la vida de Santa Teresa.

Adem\xE1s, la iglesia tuvo un papel hist\xF3rico destacado durante la Guerra de la Independencia: en noviembre de 1813, las Cortes de C\xE1diz se trasladaron aqu\xED debido a una epidemia de fiebre amarilla en la capital.

\u{1F3DB}\uFE0F Experiencia viajera:
Es una visita perfecta para empezar a entender San Fernando: devoci\xF3n marinera, memoria constitucional, arte barroco y vida cotidiana en plena calle Real.

\u{1F4A1} Consejo AvenTourArte:
Si vas un domingo por la ma\xF1ana, ver\xE1s el ambiente m\xE1s aut\xE9ntico: familias isle\xF1as acudiendo a misa y despu\xE9s tomando el aperitivo en los bares cercanos de la calle Real.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/iglesia-carmen",horario:`Horario general de misas:
Lunes a viernes: 09:15 y 20:00.
S\xE1bados: 09:00 y 20:00.
Domingos y festivos: 09:00, 12:00, 13:00 y 20:00.
Julio y agosto: la misa de tarde suele retrasarse a las 20:30.
La iglesia suele estar abierta durante el tiempo de culto.`,precio:`Gratis para culto y visita libre.
Visitas guiadas al convento o claustro: consultar con Oficina de Turismo de San Fernando.`},{nombre:"Parroquia Vaticana y Castrense de San Francisco",descripcion:`La Parroquia Vaticana y Castrense de San Francisco es uno de los templos m\xE1s importantes de San Fernando, tanto por su historia como por su singularidad dentro del mundo cat\xF3lico.

De estilo neocl\xE1sico, destaca por su sobriedad exterior, que contrasta con la riqueza hist\xF3rica y devocional de su interior. Su t\xEDtulo de \u201CVaticana\u201D \u2014un privilegio muy poco com\xFAn otorgado por el Papa P\xEDo IX\u2014 la convierte en un templo excepcional dentro del panorama religioso espa\xF1ol.

Adem\xE1s, est\xE1 profundamente vinculada a la historia constitucional de la ciudad, ya que fue una de las sedes de las Cortes Generales y Extraordinarias en 1813 durante el asedio franc\xE9s.

En su interior alberga im\xE1genes de gran valor art\xEDstico y devocional, como el Sant\xEDsimo Cristo de la Expiraci\xF3n y Mar\xEDa Sant\xEDsima de la Esperanza, muy vinculadas a la religiosidad local.

\u26EA Experiencia viajera:
Es una parada clave para entender el San Fernando m\xE1s hist\xF3rico: aqu\xED se cruzan Iglesia, pol\xEDtica, Armada y vida local.

\u{1F4A1} Consejo AvenTourArte:
Vis\xEDtala en fin de semana y combina la experiencia con el ambiente de la calle Real. Es uno de los mejores lugares para sentir el pulso real de la ciudad.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/iglesia-san-francisco",horario:`Lunes a viernes: 09:30 \u2013 13:00 y 19:00 \u2013 20:30.
S\xE1bados: 10:00 \u2013 13:00 y 20:00 \u2013 21:30.
Domingos: 09:00 \u2013 13:30 y 20:00 \u2013 21:30.`,precio:"Gratis"},{nombre:"Real Instituto y Observatorio de la Armada",descripcion:`El Real Instituto y Observatorio de la Armada (ROA) es uno de los espacios m\xE1s fascinantes y exclusivos de San Fernando. Fundado en el siglo XVIII, es el observatorio en funcionamiento m\xE1s antiguo de Espa\xF1a y uno de los centros cient\xEDficos clave de la Armada.

Aqu\xED no solo se estudiaban las estrellas: se med\xEDa el tiempo, se trazaban rutas y se hac\xEDa posible la navegaci\xF3n oce\xE1nica. Hoy sigue teniendo una funci\xF3n fundamental, ya que es el organismo encargado de mantener la hora oficial en Espa\xF1a mediante relojes at\xF3micos sincronizados con el tiempo universal (UTC).

Durante la visita \u2014cuando es posible\u2014 se pueden descubrir espacios \xFAnicos como su biblioteca hist\xF3rica con miles de vol\xFAmenes y mapas antiguos, su colecci\xF3n de instrumentos cient\xEDficos (sextantes, cron\xF3metros, telescopios) y su estaci\xF3n sismol\xF3gica, una de las m\xE1s importantes del sur de Europa.

\u{1F52D} Experiencia viajera:
No es una visita tur\xEDstica convencional. Es entrar en el lugar donde Espa\xF1a aprendi\xF3 a medir el tiempo y a orientarse en el mundo.

\u{1F4A1} Consejo AvenTourArte:
Pres\xE9ntalo como \u201Cel lugar donde se decide qu\xE9 hora es en Espa\xF1a\u201D. Es una de las ideas m\xE1s potentes de toda la visita.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/observatorio-marina",horario:`No tiene horario de visita regular.
Las visitas son ocasionales y se organizan en fechas concretas, normalmente vinculadas a eventos especiales como jornadas de puertas abiertas, celebraciones militares o actividades culturales (por ejemplo, Semana de las Fuerzas Armadas).

Consultar siempre disponibilidad actualizada.`,precio:`Consultar con la Oficina de Turismo de San Fernando.
Reserva previa obligatoria y plazas muy limitadas.`},{nombre:"Ayuntamiento de San Fernando",descripcion:`El Ayuntamiento de San Fernando es uno de los edificios civiles m\xE1s imponentes de la ciudad. Su gran fachada neocl\xE1sica domina la Plaza del Rey y habla de una ciudad que, durante los siglos XVIII y XIX, tuvo un peso pol\xEDtico e institucional enorme.

El interior permite descubrir espacios nobles, escaleras monumentales y detalles arquitect\xF3nicos que normalmente pasan desapercibidos desde la calle.

\u{1F3DB}\uFE0F Experiencia viajera:
Visitarlo por dentro ayuda a entender que San Fernando no fue una ciudad secundaria: fue una sede institucional con ambici\xF3n, poder y representaci\xF3n.

\u{1F4A1} Consejo AvenTourArte:
Comb\xEDnalo con la explicaci\xF3n exterior del Real Teatro de las Cortes para construir una lectura pol\xEDtica de la ciudad: del poder municipal al nacimiento del parlamentarismo moderno.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/ayuntamiento",horario:`Visita cada viernes a las 17:00 y 18:30.
No hace falta apuntarse: hay que unirse al grupo detr\xE1s del Ayuntamiento.`,precio:"Gratis"},{nombre:"Real Teatro de las Cortes",descripcion:`El Real Teatro de las Cortes es uno de los lugares m\xE1s importantes de la historia de Espa\xF1a y el gran s\xEDmbolo pol\xEDtico de San Fernando.

Fue aqu\xED, en 1810, donde se reunieron las Cortes Generales y Extraordinarias en plena invasi\xF3n napole\xF3nica. En este antiguo corral de comedias se proclam\xF3 la soberan\xEDa nacional y se inici\xF3 el proceso que dar\xEDa lugar a la Constituci\xF3n de 1812, conocida como \u201CLa Pepa\u201D.

Lo que hoy parece un teatro elegante fue en su origen un espacio modesto que, por circunstancias hist\xF3ricas, se convirti\xF3 en la cuna del parlamentarismo espa\xF1ol. Su actual aspecto responde a reformas del siglo XIX, manteniendo una estructura teatral cl\xE1sica.

En su fachada, varias placas conmemorativas recuerdan el papel de la entonces Real Isla de Le\xF3n en la historia de la libertad en Espa\xF1a.

\u{1F3AD} Experiencia viajera:
La visita se realiza principalmente desde el exterior, donde se interpreta el edificio como escenario hist\xF3rico. Aqu\xED no importa tanto entrar como entender lo que ocurri\xF3 dentro.

\u{1F4A1} Consejo AvenTourArte:
Convierte la parada en una escena: diputados reunidos en un teatro mientras el pa\xEDs estaba en guerra. Es uno de los momentos m\xE1s potentes de toda la ruta.

\u{1F4DC} Curiosidad:
El t\xEDtulo de \u201CReal\u201D le fue concedido en 2001 por el rey Juan Carlos I.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/teatro-cortes",horario:`No tiene horario de visita tur\xEDstica regular.
El interior no es visitable de forma general.

Acceso \xFAnicamente en:
- Espect\xE1culos (seg\xFAn programaci\xF3n)
- Visitas cerradas o grupos organizados (colegios, eventos especiales)

Consultar siempre disponibilidad puntual.`,precio:`Visita exterior gratuita.
Espect\xE1culos: precio variable seg\xFAn programaci\xF3n.`},{nombre:"Pante\xF3n de Marinos Ilustres",descripcion:`El Pante\xF3n de Marinos Ilustres es uno de los espacios m\xE1s sobrecogedores de San Fernando y una de las grandes joyas monumentales de la ciudad.

Este edificio neocl\xE1sico, situado en la Poblaci\xF3n Militar de San Carlos, funciona como mausoleo de las figuras m\xE1s importantes de la historia naval espa\xF1ola. Aqu\xED no se visita un monumento cualquiera: se entra en un lugar de memoria, silencio y respeto.

El edificio impresiona por su escala y su equilibrio arquitect\xF3nico. Su planta de tres naves, la gran c\xFApula central y la sobriedad de sus formas reflejan el ideal neocl\xE1sico del siglo XVIII, pensado para transmitir orden, grandeza y solemnidad.

En su interior se encuentran los mausoleos de marinos hist\xF3ricos como Gravina, Churruca, Mazarredo o Cervera, verdaderas esculturas funerarias en m\xE1rmol y bronce que convierten el espacio en una especie de museo de la historia naval espa\xF1ola.

Adem\xE1s de los enterramientos, numerosas l\xE1pidas conmemorativas recuerdan a marinos ca\xEDdos cuyos restos nunca pudieron ser recuperados, lo que a\xF1ade una dimensi\xF3n a\xFAn m\xE1s emotiva a la visita.

\u2693 Experiencia viajera:
Es uno de los lugares m\xE1s impactantes de San Fernando. El silencio, la luz y la arquitectura crean una atm\xF3sfera que se queda en la memoria.

\u{1F4A1} Consejo AvenTourArte:
No lo cuentes solo como un pante\xF3n. Cu\xE9ntalo como \u201Cel lugar donde descansa la historia naval de Espa\xF1a\u201D. Cambia completamente la percepci\xF3n del visitante.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",horario:`Visitas guiadas con acceso regulado.
Martes a s\xE1bado: pases habituales a las 10:30 o 12:00 (seg\xFAn temporada).
Lunes y domingos: cerrado.

Reserva previa obligatoria a trav\xE9s de la Oficina de Turismo de San Fernando.`,precio:`Gratis.
Reserva previa obligatoria debido al acceso a recinto militar.`},{nombre:"Iglesia Mayor Parroquial de San Pedro y San Pablo",descripcion:`La Iglesia Mayor de San Pedro y San Pablo es el templo m\xE1s importante de San Fernando desde el punto de vista hist\xF3rico, religioso y civil. Aqu\xED no solo se viene a ver una iglesia: se viene a entender uno de los momentos clave de la historia de Espa\xF1a.

El 24 de septiembre de 1810, en su altar mayor, los diputados de las Cortes Generales y Extraordinarias juraron sus cargos en plena Guerra de la Independencia. A partir de ese momento, San Fernando \u2014entonces Real Isla de Le\xF3n\u2014 se convirti\xF3 en el escenario donde comenzaba a construirse la Espa\xF1a constitucional.

El edificio combina elementos del barroco tard\xEDo y del neoclasicismo, con una fachada sobria pero imponente que domina la calle Real. En su interior, la luz, la amplitud de las naves y la riqueza de sus retablos crean un ambiente solemne y equilibrado.

Entre sus elementos m\xE1s destacados se encuentra el Retablo Mayor, as\xED como importantes piezas de imaginer\xEDa religiosa, muchas de ellas vinculadas a la escuela genovesa. Tambi\xE9n alberga la imagen de Jes\xFAs Nazareno, una de las devociones m\xE1s profundas de los isle\xF1os y figura clave en la vida religiosa local.

\u26EA Experiencia viajera:
Es uno de esos lugares donde la historia pol\xEDtica y la vida religiosa se cruzan sin esfuerzo. Aqu\xED empieza realmente el relato de las Cortes.

\u{1F4A1} Consejo AvenTourArte:
Util\xEDzala como punto de transici\xF3n en tu narrativa: de lo religioso a lo pol\xEDtico. Desde aqu\xED el relato contin\xFAa hacia el Ayuntamiento y el Real Teatro de las Cortes.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/iglesia-mayor",horario:`Lunes a s\xE1bado: 08:30 \u2013 12:00 y 18:00 \u2013 20:00.
Domingos y festivos: 08:30 \u2013 13:30 y 18:00 \u2013 20:00.

Misas habituales: alrededor de las 09:00 y 19:30\u201320:00 (seg\xFAn \xE9poca del a\xF1o).`,precio:"Gratis"},{nombre:"Castillo de San Romualdo",descripcion:`El Castillo de San Romualdo es uno de los monumentos m\xE1s antiguos y singulares de San Fernando, y una de esas sorpresas que muchos viajeros no esperan encontrar en la ciudad.

Construido en el siglo XIV, este edificio es en realidad un ribat \u2014un monasterio fortificado de tradici\xF3n isl\xE1mica\u2014, considerado uno de los mejor conservados de su tipo en la Pen\xEDnsula Ib\xE9rica.

Su funci\xF3n era estrat\xE9gica: controlar el paso del Puente de Suazo, durante siglos el \xFAnico acceso terrestre a la Isla de Le\xF3n y, por extensi\xF3n, a C\xE1diz. Esto lo convirti\xF3 en un punto clave en conflictos hist\xF3ricos como la Guerra de la Independencia.

La fortaleza, de planta rectangular y levantada en piedra ostionera, mantiene una imagen s\xF3lida y austera que transmite perfectamente su car\xE1cter defensivo.

Tras su rehabilitaci\xF3n, hoy funciona como espacio cultural y sede del Museo Hist\xF3rico Municipal, permitiendo recorrer tanto su arquitectura como la historia de la ciudad a trav\xE9s de restos arqueol\xF3gicos que abarcan desde la Prehistoria hasta la Edad Media.

\u{1F3F0} Experiencia viajera:
Es una visita muy completa: arquitectura medieval, historia estrat\xE9gica y contenido muse\xEDstico en un solo espacio.

\u{1F4A1} Consejo AvenTourArte:
Pres\xE9ntalo como \u201Cla puerta de entrada a la Isla\u201D. Ayuda a entender por qu\xE9 San Fernando fue un lugar clave durante siglos.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/castillo-san-romualdo",horario:`Martes a viernes: 10:00 \u2013 14:00 y 18:00 \u2013 20:00.
S\xE1bados y domingos: 10:00 \u2013 14:00.
Lunes: cerrado.

(Horarios sujetos a cambios en festivos o programaci\xF3n cultural).`,precio:"Gratis"},{nombre:"Parroquia de la Divina Pastora",descripcion:`La Capilla de la Divina Pastora es uno de los espacios m\xE1s aut\xE9nticos y queridos de San Fernando, el verdadero coraz\xF3n del barrio que lleva su nombre.

Construida a finales del siglo XVIII por los propios trabajadores del Arsenal de la Carraca en sus ratos libres, este templo refleja una arquitectura sencilla pero llena de identidad, profundamente ligada a la historia obrera y marinera de la ciudad.

Su dise\xF1o, inspirado en la iglesia del propio arsenal, se caracteriza por su sobriedad, su estructura robusta y una elegante espada\xF1a en lugar de grandes torres.

En su interior se encuentra la imagen de la Divina Pastora, Copatrona de San Fernando y una de las devociones m\xE1s arraigadas entre los isle\xF1os. Cada 15 de agosto, el barrio se transforma para acompa\xF1arla en una de las procesiones m\xE1s emotivas y populares de la ciudad.

Adem\xE1s, la capilla mantiene una intensa vida cofrade durante todo el a\xF1o, siendo sede de hermandades muy vinculadas a la identidad local.

\u{1F339} Experiencia viajera:
Es una visita m\xE1s \xEDntima y cercana que otras iglesias del centro. Aqu\xED se percibe el San Fernando m\xE1s de barrio, m\xE1s cotidiano y m\xE1s aut\xE9ntico.

\u{1F4A1} Consejo AvenTourArte:
No te quedes solo en el interior. Sal a la plaza, si\xE9ntate y observa. Este es uno de los mejores lugares para entender c\xF3mo viven realmente los isle\xF1os.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",horario:`Misas habituales:
Lunes: sin misa.
Martes a viernes: 19:00.
S\xE1bados: 19:00 y 20:00.
Domingos y festivos: 09:00 y 11:30.

La apertura suele coincidir con los horarios de culto y puede variar.`,precio:"Gratis"},{nombre:"Arsenal de La Carraca",descripcion:`El Arsenal de La Carraca es uno de los espacios m\xE1s importantes de la historia naval espa\xF1ola y uno de los lugares m\xE1s exclusivos que se pueden visitar en San Fernando.

Fundado en 1752 durante el reinado de Fernando VI, fue el primer gran arsenal ilustrado de Espa\xF1a y uno de los centros neur\xE1lgicos desde donde se construy\xF3 y mantuvo la flota que conectaba el Imperio espa\xF1ol con el resto del mundo.

Hoy sigue siendo una base militar en activo, lo que convierte su visita en una experiencia muy especial y poco habitual.

El recinto es un ejemplo extraordinario de urbanismo neocl\xE1sico aplicado a la industria naval, con una organizaci\xF3n racional del espacio que integraba astilleros, talleres, edificios administrativos y espacios religiosos.

Durante la visita \u2014cuando es posible\u2014 destacan elementos como la Iglesia del Arsenal, una joya barroca que inspir\xF3 otros templos de la ciudad; la monumental Puerta de Carlos IV, acceso principal al recinto; el Edificio de las Cuatro Torres, de gran singularidad arquitect\xF3nica; y los antiguos diques donde se construyeron los grandes nav\xEDos de la Armada.

Adem\xE1s, el arsenal es actualmente puerto base del buque escuela Juan Sebasti\xE1n de Elcano, uno de los s\xEDmbolos m\xE1s reconocibles de la Armada Espa\xF1ola.

\u2693 Experiencia viajera:
Es una de las visitas m\xE1s exclusivas de San Fernando. No es f\xE1cil acceder, pero cuando se consigue, el impacto es enorme.

\u{1F4A1} Consejo AvenTourArte:
Pres\xE9ntalo como \u201Cla f\xE1brica del Imperio\u201D. Ayuda a entender la escala hist\xF3rica del lugar.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",horario:`Acceso restringido.
Visitas guiadas puntuales.

Suelen organizarse:
- Mi\xE9rcoles por la ma\xF1ana (aprox. 10:30)
- En verano (julio a septiembre), algunos viernes por la tarde (aprox. 18:00)

Los horarios pueden variar seg\xFAn disponibilidad y actividad militar.`,precio:`Generalmente gratuito.
Reserva previa obligatoria a trav\xE9s de la Oficina de Turismo de San Fernando.`},{nombre:"Playa de Camposoto",descripcion:`La Playa de Camposoto es uno de los grandes tesoros naturales de San Fernando y una de las playas m\xE1s espectaculares de la provincia de C\xE1diz.

Situada dentro del Parque Natural de la Bah\xEDa de C\xE1diz, se extiende a lo largo de m\xE1s de 6 kil\xF3metros de arena dorada pr\xE1cticamente virgen, sin urbanizaciones masivas ni construcciones que rompan el horizonte.

Aqu\xED el paisaje manda: dunas, viento, mar abierto y una sensaci\xF3n constante de amplitud que contrasta radicalmente con el ambiente urbano del centro de la ciudad.

Uno de sus elementos m\xE1s singulares son los restos de b\xFAnkeres de la Guerra Civil, que emergen entre la arena recordando el valor estrat\xE9gico de esta costa a lo largo del tiempo.

Al final de la playa comienza el Sendero de la Punta del Boquer\xF3n, un recorrido natural que permite llegar hasta uno de los puntos m\xE1s impresionantes del entorno, con vistas al Castillo de Sancti Petri sobre el mar.

\u{1F30A} Experiencia viajera:
Es una playa para caminar, para desconectar y para sentir el Atl\xE1ntico en estado puro. En ciertos tramos, especialmente fuera de temporada, puedes tener kil\xF3metros de playa pr\xE1cticamente para ti.

\u{1F4A1} Consejo AvenTourArte:
Si buscas la experiencia m\xE1s aut\xE9ntica, al\xE9jate de los accesos principales y camina hacia la Punta del Boquer\xF3n. Cuanto m\xE1s avanzas, m\xE1s salvaje se vuelve el paisaje.

\u{1F4CD} Entorno:
Forma parte del Parque Natural de la Bah\xEDa de C\xE1diz, lo que garantiza la conservaci\xF3n de su entorno y su car\xE1cter natural.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",horario:`Acceso libre todo el a\xF1o.

Temporada alta (aprox. 15 de junio \u2013 15 de septiembre):
Servicios activos (socorrismo, duchas, m\xF3dulos de acceso).

Fuera de temporada: playa sin servicios, entorno completamente natural.`,precio:"Gratis"},{nombre:"Parque Natural Bah\xEDa de C\xE1diz",descripcion:`El Parque Natural Bah\xEDa de C\xE1diz es uno de los ecosistemas m\xE1s singulares de Andaluc\xEDa y el gran paisaje que da sentido a San Fernando.

Con m\xE1s de 10.000 hect\xE1reas, combina marismas, salinas, ca\xF1os, playas y pinares en un entorno donde la tierra y el mar se mezclan constantemente. Aqu\xED no hay un paisaje fijo: todo cambia con las mareas, la luz y las estaciones.

Este territorio ha sido durante siglos fuente de vida para la bah\xEDa. De sus aguas salieron peces y mariscos, de sus salinas la sal que aliment\xF3 econom\xEDas enteras, y de sus cielos el paso constante de aves migratorias entre Europa y \xC1frica.

Hoy es un espacio protegido de enorme valor ecol\xF3gico, donde conviven tradici\xF3n, naturaleza y actividad humana de forma \xFAnica.

\u{1F33F} Experiencia viajera:
Es un lugar para observar, no para correr. El silencio de las marismas, el vuelo de los flamencos y el olor a salitre crean una experiencia completamente distinta a la del turismo urbano.

\u{1F4A1} Consejo AvenTourArte:
No lo plantees como \u201Cparque natural\u201D, sino como \u201Cel paisaje que explica la ciudad\u201D. Sin este entorno, San Fernando no se entiende.

\u{1F4CD} Entorno:
Se extiende por varios municipios de la bah\xEDa (C\xE1diz, San Fernando, Puerto Real, Chiclana y El Puerto de Santa Mar\xEDa), con m\xFAltiples accesos seg\xFAn la zona que quieras explorar.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",horario:`Acceso libre a senderos y espacios abiertos.

Centros de visitantes (aprox.):
- Centro de Visitantes Bah\xEDa de C\xE1diz: lunes a viernes 09:30 \u2013 14:30; fines de semana 10:00 \u2013 15:00.
- Jard\xEDn Bot\xE1nico de San Fernando: martes a domingo 09:00 \u2013 14:30.

(Horarios sujetos a cambios).`,precio:`Acceso general gratuito.
Actividades guiadas o empresas de turismo activo: precio variable.`},{nombre:"Sendero Punta del Boquer\xF3n",descripcion:`El Sendero de la Punta del Boquer\xF3n es uno de los recorridos naturales m\xE1s espectaculares de la Bah\xEDa de C\xE1diz y una de las experiencias imprescindibles en San Fernando.

Declarado Monumento Natural, este sendero recorre una lengua de arena que separa el Ca\xF1o de Sancti Petri del oc\xE9ano Atl\xE1ntico, creando un paisaje \xFAnico donde mar, marisma y dunas conviven en equilibrio.

El camino discurre en gran parte sobre pasarelas de madera que protegen el sistema dunar, permitiendo avanzar c\xF3modamente mientras el paisaje se abre a ambos lados: a un lado la playa atl\xE1ntica salvaje, al otro las marismas del parque natural.

Al final del recorrido se alcanza uno de los puntos m\xE1s impresionantes de la zona, con vistas directas al Castillo de Sancti Petri sobre el mar, en un entorno cargado de historia y leyenda.

\u{1F30A} Experiencia viajera:
Es una ruta corta pero muy intensa. A cada paso cambia el paisaje y la sensaci\xF3n de aislamiento es total, especialmente fuera de temporada.

\u{1F4A1} Consejo AvenTourArte:
Hazlo al atardecer. La luz, el viento y la vista del castillo convierten la experiencia en algo dif\xEDcil de olvidar.

\u{1F4CD} Entorno:
El sendero se encuentra al final de la Playa de Camposoto, dentro del Parque Natural de la Bah\xEDa de C\xE1diz.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",horario:`Acceso libre 24 horas.
Recomendado realizarlo con luz solar.

Distancia: 2,5 km (solo ida) / 5 km ida y vuelta.
Duraci\xF3n: 1 \u2013 1,5 horas aproximadamente.
Dificultad: baja.`,precio:"Gratis"}]},{titulo:"Ruta Camar\xF3n",contenido:`La Ruta Camar\xF3n es una de las experiencias m\xE1s personales y emocionantes de San Fernando. No es solo un itinerario musical: es un recorrido por la infancia, el barrio, la familia, el arte y la memoria de Jos\xE9 Monje Cruz.

La ruta ideal conecta la Casa Natal, la Fragua, el Centro de Interpretaci\xF3n, el Monumento, la Venta de Vargas, la Pe\xF1a Camar\xF3n de la Isla y el Mausoleo en el Cementerio. Cada parada cuenta una parte distinta del mito: el nacimiento, el sonido, la revoluci\xF3n art\xEDstica, el reconocimiento p\xFAblico, la memoria viva y la despedida.

\u{1F4A1} Consejo AvenTourArte:
Hazla con m\xFAsica de Camar\xF3n de fondo, pero sin convertirla en postal. Lo importante es contar la ciudad que lo hizo posible.`,lugares:[{nombre:"Casa Natal de Camar\xF3n de la Isla",descripcion:`La Casa Natal de Camar\xF3n de la Isla, situada en la calle Carmen, 29, en el barrio de las Callejuelas, es el lugar donde naci\xF3 y creci\xF3 Jos\xE9 Monje Cruz.

Es un espacio humilde, sencillo y profundamente simb\xF3lico. Aqu\xED no se visita solo una casa: se entra en el origen de una voz que cambiar\xEDa para siempre la historia del flamenco.

El recorrido permite acercarse a la infancia del artista a trav\xE9s del patio de vecinos, la habitaci\xF3n natal, fotograf\xEDas familiares, recuerdos personales y paneles explicativos que muestran c\xF3mo San Fernando, sus calles, su gente y sus sonidos influyeron en su forma de cantar.

Uno de los espacios m\xE1s evocadores es la recreaci\xF3n de la fragua, vinculada al trabajo del hierro de su padre. Ese sonido met\xE1lico, seco y r\xEDtmico ayuda a imaginar el ambiente que marc\xF3 desde ni\xF1o el o\xEDdo de Camar\xF3n.

\u{1F3B6} Experiencia viajera:
La visita emociona precisamente por su sencillez. No es un museo monumental, sino una casa de barrio que conserva la escala humana del mito.

\u{1F4A1} Consejo AvenTourArte:
F\xEDjate en las calles del barrio de las Callejuelas antes y despu\xE9s de entrar. Ese San Fernando cotidiano, humilde y aut\xE9ntico ayuda a entender mejor de d\xF3nde sali\xF3 Camar\xF3n.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/casa-natal-camaron",horario:`Lunes: cerrado.
Martes a s\xE1bado: 11:00 \u2013 14:00 y 17:00 \u2013 19:00.
Domingos: 11:00 \u2013 14:00.
Julio y agosto: el horario de tarde suele retrasarse de 19:00 a 21:00.`,precio:"Gratis, con reserva previa obligatoria a trav\xE9s de Turismo San Fernando o el portal Leyenda Camar\xF3n."},{nombre:"Fragua de Camar\xF3n",descripcion:`La Fragua de Camar\xF3n, situada en la calle Amargura, es uno de los lugares m\xE1s simb\xF3licos y emocionales de San Fernando. Aqu\xED no se viene a ver un espacio\u2026 se viene a escuchar su origen.

Este peque\xF1o taller fue el lugar de trabajo de su padre, Juan Luis Monje, herrero de oficio. Entre el fuego, el hierro y el sonido constante del martillo golpeando el yunque, el joven Jos\xE9 creci\xF3 absorbiendo un ritmo que marcar\xEDa su forma de cantar para siempre.

Muchos estudiosos del flamenco coinciden en que el comp\xE1s y la fuerza del cante de Camar\xF3n tienen aqu\xED su ra\xEDz: en ese sonido seco, repetitivo y casi hipn\xF3tico de la fragua.

Adem\xE1s, era un punto de encuentro para la comunidad gitana del barrio, donde el cante surg\xEDa de manera natural entre el trabajo y la vida cotidiana.

Hoy el espacio ha sido rehabilitado respetando su esencia, conservando herramientas y recreando la atm\xF3sfera original para que el visitante pueda imaginar ese ambiente donde empez\xF3 todo.

\u{1F525} Experiencia viajera:
Es una de las visitas m\xE1s intensas de la Ruta Camar\xF3n. No destaca por su tama\xF1o, sino por lo que representa.

\u{1F4A1} Consejo AvenTourArte:
Pide al visitante que cierre los ojos unos segundos. Si imagina el sonido del hierro\u2026 ya ha entendido el lugar.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",horario:`Lunes a jueves: cerrado.
Viernes: 18:00 \u2013 20:00.
S\xE1bados: 11:00 \u2013 13:00 y 18:00 \u2013 20:00.
Domingos: 11:00 \u2013 13:00.`,precio:"Gratis"},{nombre:"Centro de Interpretaci\xF3n Camar\xF3n de la Isla",descripcion:`El Centro de Interpretaci\xF3n Camar\xF3n de la Isla es el espacio clave para entender la dimensi\xF3n real del artista m\xE1s influyente del flamenco contempor\xE1neo.

Situado en la Plaza de Juan Vargas, este museo moderno e interactivo propone un recorrido por la vida de Jos\xE9 Monje Cruz a trav\xE9s de tres grandes etapas: origen, leyenda y revoluci\xF3n.

Aqu\xED el visitante pasa de la emoci\xF3n a la comprensi\xF3n: desde sus ra\xEDces humildes en San Fernando hasta su impacto internacional y su papel en la transformaci\xF3n del flamenco.

Entre sus elementos m\xE1s destacados se encuentran sus trajes de gala, guitarras, premios y objetos personales, as\xED como uno de los iconos m\xE1s reconocibles: su Mercedes 300 Diesel blanco, cuidadosamente restaurado y expuesto en el recorrido.

El centro cuenta adem\xE1s con una potente experiencia audiovisual, con grabaciones, conciertos y material in\xE9dito que permite escuchar y ver a Camar\xF3n con una calidad excepcional.

\u{1F3B6} Experiencia viajera:
Es el lugar donde todo cobra sentido. Despu\xE9s de recorrer sus or\xEDgenes por la ciudad, aqu\xED se entiende por qu\xE9 Camar\xF3n cambi\xF3 el flamenco para siempre.

\u{1F4A1} Consejo AvenTourArte:
No lo visites al principio. Funciona mucho mejor despu\xE9s de haber pasado por la Casa Natal y la Fragua.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",horario:`Lunes: cerrado.
Martes a s\xE1bado: 11:00 \u2013 14:00 y 17:00 \u2013 19:00.
Domingos: 10:00 \u2013 14:00.`,precio:`Entrada gratuita (aforo limitado).
Reserva previa obligatoria a trav\xE9s de web oficial o Turismo de San Fernando.`},{nombre:"Monumento a Camar\xF3n de la Isla",descripcion:`El Monumento a Camar\xF3n de la Isla es uno de los puntos m\xE1s ic\xF3nicos y fotografiados de San Fernando, y uno de los lugares donde mejor se percibe la dimensi\xF3n p\xFAblica del artista.

Situado en la Plaza de Juan Vargas, representa a Jos\xE9 Monje Cruz sentado, con su inconfundible melena y una expresi\xF3n serena que transmite la profundidad de su cante. La escultura, obra de Antonio Mota, captura ese momento entre la calma y la intensidad que defin\xEDa su personalidad.

Uno de los detalles m\xE1s simb\xF3licos es su orientaci\xF3n: la figura mira hacia la Venta de Vargas, el lugar donde Camar\xF3n comenz\xF3 a cantar siendo un ni\xF1o y donde empez\xF3 a forjar su leyenda.

La plaza se ha convertido en un espacio de homenaje continuo. Es habitual encontrar flores, peque\xF1os recuerdos o visitantes que se acercan a tocar la estatua como gesto de respeto y conexi\xF3n.

\u{1F3B6} Experiencia viajera:
Es el punto donde Camar\xF3n deja de ser historia personal para convertirse en s\xEDmbolo colectivo. Aqu\xED ya no es solo artista\u2026 es memoria viva.

\u{1F4A1} Consejo AvenTourArte:
\xDAsalo como punto de inicio o de pausa en la ruta. Es el lugar perfecto para explicar qui\xE9n fue Camar\xF3n antes de profundizar en su historia.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",horario:`Acceso libre 24 horas.
Iluminaci\xF3n nocturna especial.`,precio:"Gratis"},{nombre:"Venta de Vargas",descripcion:`La Venta de Vargas no es solo un restaurante: es uno de los lugares m\xE1s legendarios del flamenco en Espa\xF1a.

Aqu\xED empez\xF3 a cantar un ni\xF1o llamado Jos\xE9 Monje Cruz antes de convertirse en Camar\xF3n de la Isla. Entre sus mesas, patios y noches de cante se fue construyendo parte de la historia moderna del flamenco.

Entrar en la Venta es entrar en un espacio donde el arte sigue vivo. Sus paredes cubiertas de fotograf\xEDas, carteles y recuerdos flamencos convierten cada comedor en una especie de museo emocional dedicado a generaciones enteras de artistas.

Por aqu\xED pasaron Camar\xF3n, Manolo Caracol, Lola Flores y muchas de las grandes figuras del flamenco del siglo XX, dejando una atm\xF3sfera dif\xEDcil de explicar y muy f\xE1cil de sentir.

Adem\xE1s de historia, la Venta mantiene una cocina profundamente ligada a la tradici\xF3n isle\xF1a. Sus tortillitas de camarones son consideradas por muchos como unas de las mejores de la Bah\xEDa, junto a platos cl\xE1sicos como las papas ali\xF1\xE1s, la berza gitana o distintos guisos marineros.

\u{1F37D}\uFE0F Experiencia viajera:
No es solo comer: es entrar en el lugar donde Camar\xF3n empez\xF3 a ser Camar\xF3n. Aqu\xED la gastronom\xEDa, la memoria y el flamenco forman parte de una misma experiencia.

\u{1F4A1} Consejo AvenTourArte:
Si puedes, ven un viernes o s\xE1bado por la noche. Cuando aparece el cante en directo, la Venta deja de ser restaurante y se convierte en algo mucho m\xE1s dif\xEDcil de definir.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",horario:`Lunes: cerrado.
Martes a jueves: 12:30 \u2013 16:30.
Viernes y s\xE1bados: 13:00 \u2013 16:00 y 21:00 \u2013 23:30.
Domingos: 13:00 \u2013 16:00.

Noches de flamenco: s\xE1bados (aprox. desde las 23:00).`,precio:`Precio medio: 20 \u20AC \u2013 35 \u20AC.
Tapas en barra disponibles.`},{nombre:"Pe\xF1a Flamenca Camar\xF3n de la Isla",descripcion:`La Pe\xF1a Flamenca Camar\xF3n de la Isla es uno de los lugares donde el flamenco sigue respir\xE1ndose de forma m\xE1s aut\xE9ntica en San Fernando.

Fundada en honor a Jos\xE9 Monje Cruz, esta pe\xF1a no funciona como un tablao tur\xEDstico ni como un simple local cultural. Aqu\xED el flamenco se vive desde la afici\xF3n, la memoria y el respeto profundo al cante.

Sus paredes est\xE1n cubiertas de fotograf\xEDas, carteles hist\xF3ricos y recuerdos de Camar\xF3n que convierten el espacio en una especie de archivo emocional del flamenco isle\xF1o. M\xE1s que un museo, parece una reuni\xF3n permanente de recuerdos compartidos.

Por las noches de recital, especialmente los fines de semana, el ambiente cambia completamente: guitarras, palmas, silencio atento y esa sensaci\xF3n de cercan\xEDa que solo existe en las pe\xF1as flamencas de verdad.

Adem\xE1s del flamenco, tambi\xE9n es un buen lugar para acercarse al ambiente m\xE1s popular y cotidiano de La Isla, lejos de escenarios tur\xEDsticos y mucho m\xE1s cerca de la afici\xF3n real.

\u{1F3B6} Experiencia viajera:
Aqu\xED el flamenco no se contempla como espect\xE1culo: se escucha, se respeta y se comparte.

\u{1F4A1} Consejo AvenTourArte:
Si tienes oportunidad, habla con algunos de los socios veteranos. Muchos conocieron personalmente a Camar\xF3n y conservan historias imposibles de encontrar en cualquier gu\xEDa.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",horario:`Lunes a s\xE1bado: 12:00 \u2013 14:00.
Domingos: cerrado.

Actuaciones habituales:
Viernes y s\xE1bados noche (22:00 \u2013 23:00 en adelante).
Consultar programaci\xF3n.`,precio:`Entrada libre de d\xEDa.
Actuaciones: consumici\xF3n o precio variable.
Recomendable reservar.`},{nombre:"Tumba de Camar\xF3n de la Isla",descripcion:`La tumba de Camar\xF3n de la Isla, situada en el Cementerio Municipal de San Fernando, es mucho m\xE1s que un sepulcro: es un lugar de peregrinaci\xF3n constante para aficionados al flamenco de todo el mundo.

Aqu\xED descansa Jos\xE9 Monje Cruz, pero su presencia sigue muy viva. La visita no se vive como algo tur\xEDstico, sino como un momento de respeto, emoci\xF3n y conexi\xF3n con una figura que marc\xF3 la historia de la m\xFAsica.

El mausoleo combina piedra y bronce en una composici\xF3n sobria pero muy expresiva. Sobre la tumba, una escultura de Camar\xF3n sentado con su guitarra lo representa en una actitud pensativa, casi suspendida en el tiempo.

Alrededor es habitual encontrar flores frescas \u2014especialmente claveles rojos\u2014, fotograf\xEDas, recuerdos personales, rosarios e incluso peque\xF1os objetos como cigarrillos o botellas de vino que los visitantes dejan como gesto \xEDntimo de homenaje.

\u{1F3B6} Experiencia viajera:
Es una de las paradas m\xE1s emocionales de San Fernando. El ambiente suele ser silencioso, respetuoso, y en ocasiones alguien rompe ese silencio con un cante bajo o unas palmas suaves.

\u{1F4A1} Consejo AvenTourArte:
No la presentes como \u201Cvisita\u201D, sino como cierre de una historia. Despu\xE9s de recorrer su vida por la ciudad, aqu\xED se entiende el impacto real que tuvo.

\u{1F4CD} Ubicaci\xF3n:
Nada m\xE1s entrar al cementerio, es f\xE1cil encontrarla siguiendo el camino principal o preguntando, ya que es la zona m\xE1s visitada.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",horario:`Lunes a viernes: 09:00 \u2013 18:00.
S\xE1bados, domingos y festivos: 09:00 \u2013 15:00.`,precio:"Gratis"}]},{titulo:"Gastronom\xEDa",contenido:`La gastronom\xEDa de San Fernando nace de las marismas, los esteros y el Atl\xE1ntico. Aqu\xED el sabor no depende de grandes elaboraciones, sino del producto, la fritura perfecta y el respeto absoluto por la materia prima.

La cocina isle\xF1a mezcla tradici\xF3n marinera, cultura popular y recetas transmitidas durante generaciones. Camarones, pesca\xEDto frito, mariscos de estero, ortiguillas o papas ali\xF1\xE1s forman parte de una manera de vivir donde comer no es solo alimentarse, sino compartir tiempo, conversaci\xF3n y paisaje.

En La Isla, muchas de las mejores comidas no se sirven en silencio ni con protocolo: se comen de pie, en barra, con las manos y todav\xEDa quemando.`,platos:[{nombre:"Camar\xF3n de la Bah\xEDa",descripcion:`Hablar del camar\xF3n de la bah\xEDa es hablar del ADN de San Fernando. Este peque\xF1o crust\xE1ceo \u2014distinto de la gamba\u2014 es casi transparente, diminuto y con un sabor intenso, entre yodado y ligeramente dulce, que solo se encuentra en los esteros y marismas de la Bah\xEDa de C\xE1diz.

Su valor est\xE1 en el origen: se cr\xEDa de forma natural en los esteros, aliment\xE1ndose de la riqueza del ecosistema del Parque Natural. Esto le da un sabor mucho m\xE1s profundo que cualquier producto similar de fuera.

Se consume de dos formas principales. La m\xE1s conocida es en tortillitas, donde aporta ese crujiente y ese golpe de sabor marino caracter\xEDstico. Pero la forma m\xE1s pura es cocido: apenas unos segundos en agua muy salada y servido en cartuchos, para comerlo con las manos en peque\xF1os \u201Cpu\xF1aos\u201D.

\u{1F37D}\uFE0F Experiencia viajera:
Comer camarones cocidos en una barra, con una cerveza fr\xEDa o una copa de fino, es una de las experiencias m\xE1s aut\xE9nticas de la bah\xEDa.

\u{1F4A1} Consejo AvenTourArte:
Si puedes, pru\xE9balos tambi\xE9n fuera de la tortillita. Es la \xFAnica forma de entender realmente su sabor.

\u{1F4DC} Curiosidad:
El apodo \u201CCamar\xF3n\u201D de Jos\xE9 Monje Cruz viene de aqu\xED: su t\xEDo se lo puso por su piel clara, su delgadez y su parecido con estos peque\xF1os crust\xE1ceos de la bah\xEDa.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",precio:`Cartucho: 4 \u20AC \u2013 6 \u20AC.
Raci\xF3n: 12 \u20AC \u2013 18 \u20AC.`},{nombre:"Tortillitas de camarones",descripcion:`Las tortillitas de camarones son el gran icono gastron\xF3mico de San Fernando y uno de los bocados m\xE1s representativos de toda la Bah\xEDa de C\xE1diz.

Se trata de una fritura muy fina y crujiente elaborada con una mezcla ligera de harina de trigo y de garbanzo, agua fr\xEDa, cebolleta y perejil, en la que se incorporan camarones de la bah\xEDa, peque\xF1os y de sabor intenso.

La clave est\xE1 en su textura: deben ser casi trasl\xFAcidas, doradas y ligeras, con ese caracter\xEDstico acabado \u201Cde encaje\u201D lleno de peque\xF1os agujeros.

Su origen moderno se asocia a la Venta de Vargas, donde en el siglo XX se perfeccion\xF3 la receta hasta alcanzar la forma actual, mucho m\xE1s fina y crujiente que versiones anteriores.

\u{1F37D}\uFE0F Experiencia viajera:
Es un bocado que resume la cocina gaditana: producto humilde, t\xE9cnica precisa y un resultado lleno de sabor a mar.

\u{1F4A1} Consejo AvenTourArte:
Una buena tortillita debe romper al morderla y no resultar aceitosa. Si no est\xE1 crujiente o es demasiado gruesa, no est\xE1s ante la versi\xF3n aut\xE9ntica.

\u{1F4DC} Curiosidad:
En San Fernando se consideran casi una prueba de nivel gastron\xF3mico local: una buena tortillita debe escucharse romper antes incluso de saborearse.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",precio:`Aproximadamente:
Unidad: 2 \u20AC \u2013 3 \u20AC
Raci\xF3n: 10 \u20AC \u2013 14 \u20AC`},{nombre:"Ca\xF1a\xEDlla",descripcion:`Si el bienmesabe es el rey de la freidora, la ca\xF1a\xEDlla es la reina del marisco en San Fernando. No es solo un producto t\xEDpico: es parte de la identidad de la ciudad, hasta el punto de que a los isle\xF1os se les conoce cari\xF1osamente como \u201Cca\xF1a\xEDllas\u201D.

Se trata de un molusco marino de concha espinosa que habita en los fondos de la Bah\xEDa de C\xE1diz. Su sabor es intenso, profundamente marino, y su textura firme la convierte en un bocado muy particular dentro del marisco andaluz.

Se consume cocida en agua muy salada y servida fr\xEDa o a temperatura ambiente. Comerla tiene su t\xE9cnica: hay que extraer la carne en espiral con un palillo (o con otra concha), retirando el op\xE9rculo antes de saborearla.

\u{1F37D}\uFE0F Experiencia viajera:
Es una tapa de barra, de ritmo lento. Se come sin prisa, una a una, acompa\xF1ada de cerveza fr\xEDa o fino, mientras la conversaci\xF3n fluye.

\u{1F4A1} Consejo AvenTourArte:
Si nunca las has probado, t\xF3mate tu tiempo. La experiencia no est\xE1 solo en el sabor, sino en el ritual de comerlas.

\u{1F4DC} Curiosidad:
En la Antig\xFCedad, de este molusco se obten\xEDa el famoso tinte p\xFArpura usado por fenicios y romanos. Hoy, su legado sigue vivo en la bah\xEDa\u2026 pero en forma de tapa.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",precio:`Papelina: 3 \u20AC \u2013 5 \u20AC.
Raci\xF3n: 8 \u20AC \u2013 14 \u20AC.`},{nombre:"Bienmesabe (Caz\xF3n en adobo)",descripcion:`El bienmesabe es uno de los grandes emblemas gastron\xF3micos de San Fernando y el nombre local que recibe el cl\xE1sico caz\xF3n en adobo gaditano.

Se elabora con caz\xF3n \u2014un peque\xF1o tibur\xF3n de carne blanca, firme y sin espinas\u2014 cortado en tacos y macerado durante horas en un adobo de vinagre de Jerez, ajo, or\xE9gano, comino y piment\xF3n.

Lo que diferencia al bienmesabe isle\xF1o es el equilibrio: el adobo no debe tapar el sabor del pescado, sino acompa\xF1arlo. Tras la maceraci\xF3n, se enharina y se fr\xEDe en aceite de oliva muy caliente, logrando un exterior crujiente y un interior jugoso y lleno de sabor.

Comerlo en papel de estraza, reci\xE9n hecho y de pie en una freidur\xEDa o paseando por la calle Real, es una de las experiencias m\xE1s aut\xE9nticas de la ciudad.

\u{1F4A1} Consejo AvenTourArte:
C\xF3melo siempre reci\xE9n salido del aceite. Si se enfr\xEDa, pierde gran parte de su textura y su gracia.

\u{1F4DC} Curiosidad:
Seg\xFAn la tradici\xF3n, el nombre \u201Cbienmesabe\u201D se populariz\xF3 cuando la reina Isabel II lo prob\xF3 en el siglo XIX y exclam\xF3: \u201C\xA1Qu\xE9 bien me sabe!\u201D.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",precio:`Papelina: 3 \u20AC \u2013 4 \u20AC.
Raci\xF3n: 8 \u20AC \u2013 12 \u20AC.`},{nombre:"Pesca\xEDto frito",descripcion:`Si el bienmesabe es el capit\xE1n, el pesca\xEDto frito es toda la armada de San Fernando. Aqu\xED no es solo comida: es un ritual que se sirve en cartuchos de papel de estraza, pensado para comer de pie, compartir y repetir.

El secreto est\xE1 en la variedad. Un buen cartucho incluye una mezcla de peque\xF1os pescados y mariscos fritos: caz\xF3n en adobo (bienmesabe), choco tierno, puntillitas crujientes, aced\xEDas delicadas, boquerones abiertos o huevas fritas. Cada pieza aporta una textura y un sabor distinto.

La fritura isle\xF1a tiene t\xE9cnica propia: harina ligera (a veces mezclada con garbanzo), aceite muy caliente y sal justo al final. El resultado es un frito seco, crujiente y nada pesado, donde el producto sigue siendo protagonista.

\u{1F37D}\uFE0F Experiencia viajera:
Comer pesca\xEDto frito en San Fernando es hacerlo en papel, con las manos, paseando o en barra, acompa\xF1ado de una cerveza fr\xEDa o una copa de fino.

\u{1F4A1} Consejo AvenTourArte:
Nunca cierres el cartucho si es para llevar. El vapor reblandece el frito y pierde su gracia.

\u{1F4DC} Curiosidad:
El papel de estraza no es casual: absorbe el aceite y mantiene la textura. Es parte esencial de la experiencia.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",precio:`Papelina: 3 \u20AC \u2013 5 \u20AC.
Raci\xF3n: 10 \u20AC \u2013 16 \u20AC.`},{nombre:"Ortiguillas fritas",descripcion:`Si el bienmesabe es el rey, las ortiguillas fritas son el tesoro salvaje de la Bah\xEDa de C\xE1diz. No es un plato para todos: o te fascina o te desconcierta, pero nunca se olvida.

Aunque al verlas fritas puedan parecer pescado, en realidad son an\xE9monas de mar. En su estado natural son como peque\xF1as flores marinas, pero en cocina se transforman en uno de los bocados m\xE1s intensos del Atl\xE1ntico.

Su magia est\xE1 en el contraste: por fuera, un rebozado fino y crujiente; por dentro, una textura suave y casi cremosa que se deshace en la boca. El sabor es puro mar: profundo, yodado y muy potente, como si concentrara toda la esencia de la bah\xEDa en un solo bocado.

\u{1F37D}\uFE0F Experiencia viajera:
Probar ortiguillas es una experiencia sensorial. No es solo comer, es descubrir un sabor que dif\xEDcilmente encontrar\xE1s fuera de C\xE1diz.

\u{1F4A1} Consejo AvenTourArte:
C\xF3melas reci\xE9n hechas. Cuando se enfr\xEDan, pierden su contraste de texturas y gran parte de su encanto.

\u{1F4DC} Curiosidad:
Son un producto extremadamente delicado: deben cocinarse casi inmediatamente despu\xE9s de ser recolectadas, lo que explica por qu\xE9 son tan dif\xEDciles de encontrar fuera de la zona.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",precio:"Raci\xF3n: 8 \u20AC \u2013 14 \u20AC."},{nombre:"Mariscos de la Bah\xEDa y Bocas de La Isla",descripcion:`Cerrar la gastronom\xEDa de San Fernando sin hablar de los mariscos de la Bah\xEDa ser\xEDa imposible. Aqu\xED el marisco no es solo producto: es paisaje, tradici\xF3n y una forma de vida ligada a los esteros y a las mareas.

Entre todos ellos destacan las famosas \u201CBocas de La Isla\u201D, las pinzas del cangrejo violinista, uno de los productos m\xE1s curiosos y exclusivos de la bah\xEDa. Se cuecen en agua muy salada y ofrecen una carne blanca, firme y ligeramente dulce, con un sabor intenso que recuerda a la n\xE9cora.

Junto a ellas aparecen otros grandes cl\xE1sicos como los langostinos de estero, peque\xF1os pero incre\xEDblemente sabrosos gracias a su crianza natural en salinas; las coquinas al ajillo; los muergos (navajas) a la plancha; o los burgaillos, peque\xF1os caracoles marinos que se comen lentamente con ayuda de un palillo.

Todo este marisco comparte algo importante: sabe al paisaje del Parque Natural de la Bah\xEDa de C\xE1diz. A sal, fango, mareas y Atl\xE1ntico.

\u{1F37D}\uFE0F Experiencia viajera:
Una fuente de marisco en una terraza de San Fernando no se come r\xE1pido. Se comparte, se conversa y se disfruta sin mirar el reloj.

\u{1F4A1} Consejo AvenTourArte:
Si en una carta lees \u201Cmarisco de estero\u201D, p\xEDdelo. Es uno de los productos m\xE1s aut\xE9nticos y dif\xEDciles de encontrar fuera de la Bah\xEDa.

\u{1F4DC} Curiosidad:
Las famosas Bocas de La Isla se obtienen de forma sostenible: al cangrejo violinista solo se le extrae la pinza grande y despu\xE9s se devuelve vivo a las marismas, donde vuelve a regenerarla.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",precio:`Bocas de La Isla: 6 \u20AC \u2013 10 \u20AC la raci\xF3n.
Mariscos de la Bah\xEDa: precio variable seg\xFAn temporada y producto.`},{nombre:"Papas ali\xF1\xE1s",descripcion:`Las papas ali\xF1\xE1s son el gran monumento a la sencillez de la cocina gaditana. Un plato humilde en apariencia que, en San Fernando, se toma muy en serio.

La receta parece simple: patatas cocidas, cebolleta fresca, perejil, aceite de oliva virgen extra y vinagre de Jerez. Pero el secreto est\xE1 en el equilibrio y en el momento exacto.

Las patatas deben ali\xF1arse todav\xEDa calientes para absorber bien el aceite y el vinagre, pero servirse a temperatura ambiente, nunca fr\xEDas de nevera. El resultado es una textura suave, brillante y llena de sabor.

En La Isla es habitual acompa\xF1arlas con melva o at\xFAn en conserva de la zona, especialmente de Barbate o Tarifa, aportando un toque marino que las convierte en una tapa perfecta para abrir cualquier comida.

\u{1F37D}\uFE0F Experiencia viajera:
Son la tapa que siempre aparece primero en la mesa: frescas, ligeras y perfectas para acompa\xF1ar una cerveza fr\xEDa o una copa de fino mientras llega el pesca\xEDto.

\u{1F4A1} Consejo AvenTourArte:
Las mejores papas ali\xF1\xE1s no destacan por tener muchos ingredientes, sino por la calidad del aceite y el punto exacto del ali\xF1o.

\u{1F4DC} Curiosidad:
En San Fernando son consideradas casi una prueba de nivel gastron\xF3mico local: un isle\xF1o reconoce unas buenas papas ali\xF1\xE1s al primer bocado.`,foto:"cld:europa/espana/andalucia/cadiz/san-fernando/san-fernando-flag",precio:`Tapa: 2,50 \u20AC \u2013 3,50 \u20AC.
Raci\xF3n: 6 \u20AC \u2013 10 \u20AC.`}]},{titulo:"D\xF3nde comer en San Fernando",contenido:"En San Fernando, muchas veces los mejores recuerdos no se hacen visitando monumentos, sino compartiendo una mesa: una tortillita reci\xE9n hecha, una conversaci\xF3n en barra o un cante improvisado al final de la noche.",lugares:[{nombre:"BRUMA Caf\xE9",descripcion:`BRUMA Caf\xE9 representa el San Fernando m\xE1s actual y tranquilo. Situada en la calle San Rafael, esta cafeter\xEDa de especialidad se ha convertido en uno de los rincones favoritos de quienes buscan desayunar o merendar con calma en pleno centro de la ciudad.

El local combina una est\xE9tica n\xF3rdica y minimalista con una filosof\xEDa muy cuidada del caf\xE9: diferentes or\xEDgenes, m\xE9todos de extracci\xF3n y baristas que trabajan cada taza con precisi\xF3n.

Adem\xE1s del caf\xE9, destacan sus tostadas gourmet \u2014muy populares las de jam\xF3n, aguacate y salmorejo\u2014, sus zumos naturales y una reposter\xEDa artesanal que cambia con frecuencia seg\xFAn el d\xEDa.

\u2615 Experiencia viajera:
Es el lugar perfecto para empezar la ma\xF1ana antes de recorrer la ciudad hist\xF3rica o para hacer una pausa tranquila entre visitas.

\u{1F4A1} Consejo AvenTourArte:
Si te gusta el caf\xE9 de especialidad, pide recomendaci\xF3n al barista. BRUMA no funciona como una cafeter\xEDa convencional: aqu\xED el caf\xE9 es parte de la experiencia.

\u{1F4CD} Ambiente:
Tranquilo, luminoso y moderno. Muy diferente al ambiente tradicional de ventas y freidur\xEDas de La Isla, lo que aporta un contraste muy interesante dentro de la ruta gastron\xF3mica.`,horario:`Lunes a viernes: 09:00 \u2013 12:30 y 17:30 \u2013 20:00.
S\xE1bados: 09:30 \u2013 12:30.
Domingos: cerrado.`,precio:`Desayuno: 4 \u20AC \u2013 8 \u20AC.
Caf\xE9 de especialidad: 2 \u20AC \u2013 4 \u20AC.
Tostadas gourmet: 5 \u20AC \u2013 8 \u20AC.`},{nombre:"Venta de Vargas",descripcion:`La Venta de Vargas es la parada gastron\xF3mica m\xE1s emblem\xE1tica de San Fernando, un lugar donde la cocina tradicional isle\xF1a se mezcla con una atm\xF3sfera hist\xF3rica dif\xEDcil de encontrar en otro sitio.

Aqu\xED se viene a comer bien, pero tambi\xE9n a sentarse en una mesa con memoria. Su carta mantiene platos profundamente ligados a La Isla: tortillitas de camarones, papas ali\xF1\xE1s, berza gitana, rabo de toro, pesca\xEDto frito y guisos marineros.

El ambiente combina venta antigua, restaurante familiar y santuario flamenco. Las paredes llenas de fotograf\xEDas y recuerdos acompa\xF1an la comida sin convertirla en una visita de museo: todo forma parte natural del lugar.

\u{1F37D}\uFE0F Experiencia viajera:
Es ideal para una comida larga, sin prisa, especialmente si quieres unir gastronom\xEDa local, historia flamenca y ambiente aut\xE9ntico en una sola parada.

\u{1F4A1} Consejo AvenTourArte:
Pide tortillitas de camarones y papas ali\xF1\xE1s para empezar. Si vas en fin de semana por la noche, reserva con antelaci\xF3n porque el ambiente flamenco suele llenar el local.`,horario:`Lunes: cerrado.
Martes a jueves: 12:30 \u2013 16:30.
Viernes y s\xE1bados: 13:00 \u2013 16:00 y 21:00 \u2013 23:30.
Domingos: 13:00 \u2013 16:00.

Los viernes y s\xE1bados por la noche suele haber ambiente flamenco y actuaciones en directo.`,precio:`Tapas: 4 \u20AC \u2013 8 \u20AC.
Platos principales: 12 \u20AC \u2013 22 \u20AC.
Espect\xE1culos flamencos: consultar programaci\xF3n y reservas.`},{nombre:"Pe\xF1a Flamenca Camar\xF3n de la Isla",descripcion:`La Pe\xF1a Flamenca Camar\xF3n de la Isla es una opci\xF3n perfecta para quienes buscan comer o tomar algo en un ambiente m\xE1s local, sencillo y profundamente flamenco.

No funciona como un restaurante convencional ni como un local tur\xEDstico. Es una pe\xF1a de aficionados, con vida propia, donde la comida, la conversaci\xF3n y el cante forman parte de una misma experiencia popular.

Su propuesta es m\xE1s informal que la de la Venta de Vargas: tapas, platos tradicionales de la bah\xEDa, pesca\xEDto frito, ali\xF1os y vino de la tierra en un entorno lleno de fotograf\xEDas, carteles y recuerdos de Camar\xF3n.

Cuando hay recitales o actuaciones, el ambiente se transforma: se come y se bebe con el respeto de quien sabe que el flamenco aqu\xED no es decoraci\xF3n, sino algo vivo.

\u{1F37D}\uFE0F Experiencia viajera:
Es el sitio ideal si prefieres una experiencia menos tur\xEDstica, m\xE1s cercana a los vecinos y al ambiente real de una pe\xF1a flamenca isle\xF1a.

\u{1F4A1} Consejo AvenTourArte:
Llama antes de ir, sobre todo si quieres coincidir con una actuaci\xF3n. Si est\xE1 abierta al mediod\xEDa, es buena parada para tapear con calma y ver sus paredes llenas de memoria flamenca.`,horario:`Lunes a s\xE1bado: abierta desde las 12:00.

Viernes y s\xE1bados noche:
Actuaciones y recitales flamencos habituales.

Consultar programaci\xF3n espec\xEDfica y reservas.`,precio:`Consumiciones y tapas: precios populares.
Actuaciones: consultar programaci\xF3n.`}]},{titulo:"Cultura y Vida Local",contenido:`San Fernando es una ciudad con una identidad profundamente propia. Una ciudad que no necesita llamar la atenci\xF3n porque lleva siglos construyendo su car\xE1cter entre marismas, astilleros, patios de vecinos, iglesias barrocas y cultura popular.

Aqu\xED la vida gira alrededor de la calle, del barrio y de la conversaci\xF3n. Los isle\xF1os viven el espacio p\xFAblico con naturalidad: terrazas llenas, plazas con vida hasta tarde, mercados, ventas y bares donde siempre parece haber tiempo para hablar un poco m\xE1s.

La relaci\xF3n con la Armada sigue marcando la personalidad de la ciudad. El paisaje militar, los cuarteles, el Arsenal de La Carraca o el Observatorio de Marina forman parte de la vida cotidiana de San Fernando desde hace generaciones.

Y despu\xE9s est\xE1 el flamenco.

Camar\xF3n de la Isla es su s\xEDmbolo m\xE1s universal, pero el flamenco aqu\xED no empez\xF3 ni termin\xF3 con \xE9l. Sigue vivo en pe\xF1as, reuniones improvisadas, recitales y conversaciones donde el cante aparece de forma natural, casi como una manera de entender la vida.

En San Fernando hay ciudades que no se ense\xF1an del todo al visitante: se descubren poco a poco, caminando sin prisa, escuchando acentos, entrando en los bares y dejando que la ciudad marque el ritmo.

\u{1F4A1} Consejo viajero:
No vengas buscando solo monumentos. Ven a escuchar la ciudad, a caminar junto a las marismas, a comer en barra y a entender por qu\xE9 La Isla tiene una personalidad tan distinta al resto de la Bah\xEDa.`},{titulo:"Fiestas y Festivos Principales",contenido:`Las fiestas de San Fernando reflejan mejor que ning\xFAn monumento la identidad real de La Isla.

Aqu\xED las celebraciones mezclan tradici\xF3n marinera, memoria hist\xF3rica, flamenco, religiosidad popular y una forma muy gaditana de vivir la calle. M\xE1s que grandes eventos aislados, forman parte del ritmo natural de la ciudad y ayudan a entender c\xF3mo sienten y viven los isle\xF1os.

\u{1F4A1} Mirada AvenTourArte:
Las fiestas de San Fernando no buscan impresionar desde el espect\xE1culo masivo, sino desde la identidad. Aqu\xED cada celebraci\xF3n habla de algo que sigue muy vivo: la Armada, el flamenco, las marismas, la memoria constitucional y la manera isle\xF1a de compartir la calle.`,lugares:[{nombre:"Carnaval de San Fernando",descripcion:`El Carnaval de San Fernando tiene una personalidad propia dentro de la Bah\xEDa de C\xE1diz: m\xE1s cercano, m\xE1s familiar y profundamente ligado a las pe\xF1as y a la vida cotidiana de La Isla.

Aunque comparte ra\xEDces con el c\xE9lebre Carnaval de C\xE1diz, aqu\xED la fiesta se vive de una manera diferente. El protagonismo no est\xE1 solo en las grandes calles o en las aglomeraciones, sino en las plazas, las agrupaciones locales y el ambiente de barrio.

San Fernando ha sido cuna de grandes nombres del carnaval gaditano, especialmente Juan Rivero, figura clave en el desarrollo de la chirigota infantil y juvenil, y uno de los autores m\xE1s queridos de la Bah\xEDa.

Las agrupaciones isle\xF1as destacan tradicionalmente por su afinaci\xF3n, su humor muy local y las referencias constantes a la vida marinera, las salinas, la Armada y las costumbres de la ciudad.

Uno de los aspectos m\xE1s especiales del Carnaval isle\xF1o son las degustaciones populares organizadas por pe\xF1as y asociaciones, donde se mezclan coplas y gastronom\xEDa tradicional:
- La Pollada.
- La Tortillada.
- La Pring\xE1.
- La Quesada.

Durante esos d\xEDas, plazas como la Plaza del Rey o la Plaza de la Iglesia se llenan de escenarios, papelillos y actuaciones, mientras la Gran Cabalgata recorre la Calle Real entre m\xFAsica, disfraces y ambiente festivo.

\u{1F3AD} Ambiente viajero:
Es un carnaval ideal para quien quiera disfrutar de las coplas gaditanas en un entorno m\xE1s cercano y menos masificado que C\xE1diz capital.

\u{1F4A1} Consejo AvenTourArte:
Las mejores coplas muchas veces no est\xE1n en los grandes escenarios, sino en peque\xF1as pe\xF1as o plazas de barrio donde el carnaval se escucha casi cara a cara.

\u{1F4DC} Curiosidad:
La conexi\xF3n mediante tranv\xEDa entre C\xE1diz y San Fernando ha unido todav\xEDa m\xE1s ambos carnavales, permitiendo vivir las dos fiestas casi como una sola experiencia dentro de la Bah\xEDa.`,fecha:"Se celebra cada a\xF1o entre febrero y marzo, antes de la Cuaresma. Las fechas var\xEDan seg\xFAn el calendario de Semana Santa.",precio:`Acceso gratuito a conciertos, actuaciones callejeras, cabalgata y actividades populares.
Algunos eventos concretos pueden requerir entrada.`},{nombre:"Semana Santa de San Fernando",descripcion:`La Semana Santa de San Fernando es una de las celebraciones religiosas y culturales m\xE1s importantes de Andaluc\xEDa y uno de los momentos en los que mejor se percibe la identidad profunda de La Isla.

Declarada de Inter\xE9s Tur\xEDstico Nacional, destaca por la elegancia de sus hermandades, la fuerte presencia marinera y militar y, sobre todo, por su forma \xFAnica de cargar los pasos.

Aqu\xED los pasos se llevan al hombro, por dentro, mediante el caracter\xEDstico \u201Cpaso de horquilla\u201D, un estilo muy singular cuyo sonido \u2014el golpe r\xEDtmico de las horquillas sobre el suelo\u2014 se convierte en la aut\xE9ntica banda sonora de la ciudad durante toda la semana.

Las procesiones recorren especialmente la Calle Real, mezclando incienso, silencio, m\xFAsica y una atm\xF3sfera mucho m\xE1s cercana e \xEDntima que en otras grandes Semanas Santas andaluzas.

Entre las hermandades m\xE1s emblem\xE1ticas destacan:
- Medinaceli (Lunes Santo).
- Huerto y Caridad (Martes Santo).
- Expiraci\xF3n (Jueves Santo).
- Nazareno (Madrug\xE1 del Viernes Santo).

Ver amanecer al Nazareno por la Calle Real mientras resuenan las horquillas sobre el pavimento es uno de los momentos m\xE1s emocionantes de toda la Semana Santa andaluza.

\u{1F3AD} Ambiente viajero:
La Semana Santa isle\xF1a se vive m\xE1s desde la emoci\xF3n y el recogimiento que desde el espect\xE1culo.

\u{1F4A1} Consejo AvenTourArte:
No intentes verlo todo. Elige una hermandad y acomp\xE1\xF1ala un rato caminando. Ah\xED es donde realmente se entiende la Semana Santa de La Isla.

\u{1F4DC} Curiosidad:
La carga mediante horquillas es una de las se\xF1as de identidad m\xE1s singulares de toda Andaluc\xEDa y sorprende incluso a visitantes acostumbrados a otras Semanas Santas.`,fecha:"Se celebra entre marzo y abril, coincidiendo con la Semana Santa.",precio:`Acceso gratuito a procesiones y recorridos oficiales.
Sillas y palcos en Carrera Oficial: precio variable.`},{nombre:"Corpus Christi",descripcion:`El Corpus Christi es una de las celebraciones m\xE1s elegantes y solemnes de San Fernando, una fiesta donde la ciudad transforma su centro hist\xF3rico en un escenario de tradici\xF3n, arte ef\xEDmero y religiosidad popular.

La Calle Real y el entorno de la Iglesia Mayor se engalanan con altares, colgaduras, flores y alfombras de sal, un detalle muy propio de La Isla que conecta la celebraci\xF3n con la memoria salinera de la ciudad.

El momento central es la procesi\xF3n del Sant\xEDsimo, que sale de la Iglesia Mayor y recorre el centro acompa\xF1ada por hermandades, autoridades civiles y militares, ni\xF1os de Primera Comuni\xF3n y bandas de m\xFAsica. La Custodia avanza entre p\xE9talos, marchas solemnes y balcones decorados, creando una atm\xF3sfera de gran belleza visual.

Uno de los elementos m\xE1s singulares es la presencia de la Armada, que aporta a la celebraci\xF3n ese car\xE1cter castrense tan ligado a la identidad hist\xF3rica de San Fernando.

\u{1F3AD} Ambiente viajero:
Es una fiesta tranquila, luminosa y muy est\xE9tica, perfecta para ver el centro hist\xF3rico en uno de sus momentos m\xE1s cuidados.

\u{1F4A1} Consejo AvenTourArte:
Pasea por la Calle Real antes de la procesi\xF3n para ver los altares y las alfombras de sal con calma. Despu\xE9s, busca un buen punto en la Plaza de la Iglesia o la Plaza del Rey para ver pasar el cortejo.

\u{1F4DC} Curiosidad:
Las alfombras de sal son uno de los detalles m\xE1s especiales del Corpus isle\xF1o, uniendo tradici\xF3n religiosa y memoria salinera en plena calle.`,fecha:"Se celebra entre mayo y junio, coincidiendo con la festividad del Corpus Christi. Los actos principales suelen trasladarse al domingo m\xE1s cercano.",precio:"Acceso gratuito a procesiones y actividades religiosas."},{nombre:"Feria del Carmen y de la Sal",descripcion:`La Feria del Carmen y de la Sal es la gran celebraci\xF3n popular del verano en San Fernando y uno de los momentos m\xE1s esperados del a\xF1o por los isle\xF1os.

Se celebra en honor a la Virgen del Carmen, patrona de la ciudad y de la Armada Espa\xF1ola, mezclando ambiente andaluz, tradici\xF3n marinera y vida de caseta con un marcado car\xE1cter atl\xE1ntico.

A diferencia de otras ferias m\xE1s monumentales, aqu\xED el protagonismo lo tienen el ambiente cercano, la brisa de la Bah\xEDa y esa sensaci\xF3n constante de fiesta compartida entre vecinos.

El recinto ferial se instala actualmente en el Parque de la Historia y el Mar, junto a Bah\xEDa Sur, donde durante varios d\xEDas se suceden casetas, conciertos, alumbrado, atracciones y gastronom\xEDa tradicional.

Uno de los momentos m\xE1s especiales es la salida procesional de la Virgen del Carmen y su vinculaci\xF3n con el mundo naval y marinero. Tambi\xE9n destaca la procesi\xF3n mar\xEDtima por los ca\xF1os de la Bah\xEDa, una de las im\xE1genes m\xE1s bellas del verano isle\xF1o.

\u{1F3AD} Ambiente viajero:
Las noches c\xE1lidas de julio, el rebujito fr\xEDo y el sonido de sevillanas y flamenco crean una feria mucho m\xE1s relajada y marinera que otras grandes ferias andaluzas.

\u{1F4A1} Consejo AvenTourArte:
Para entender realmente esta feria, no te quedes solo en el recinto. El ambiente alrededor de la Iglesia del Carmen muestra el lado m\xE1s emocional y aut\xE9ntico de la celebraci\xF3n.

\u{1F4DC} Curiosidad:
El a\xF1adido \u201Cde la Sal\u201D hace referencia a las hist\xF3ricas salinas de la Bah\xEDa, uno de los grandes motores econ\xF3micos tradicionales de San Fernando.`,fecha:"Se celebra cada a\xF1o en torno al 16 de julio, festividad de la Virgen del Carmen.",precio:`Acceso gratuito al recinto ferial.
Atracciones, casetas y actividades: precios variables.`},{nombre:"La Isla Ciudad Flamenca",descripcion:`La Isla Ciudad Flamenca es uno de los festivales flamencos m\xE1s originales de Andaluc\xEDa y una celebraci\xF3n profundamente ligada a la memoria de Camar\xF3n de la Isla.

Durante semanas, San Fernando se convierte en un enorme escenario donde el flamenco aparece en plazas, ventas, pe\xF1as, calles y espacios hist\xF3ricos, mezcl\xE1ndose con la vida cotidiana de la ciudad.

El festival re\xFAne grandes figuras del cante, el baile y la guitarra junto a j\xF3venes artistas emergentes, creando una programaci\xF3n muy viva y diversa.

Entre los espacios m\xE1s emblem\xE1ticos destacan:
- Venta de Vargas.
- Plaza Juan Vargas.
- Calle Real.
- Parque Almirante Laulh\xE9.
- Pe\xF1as flamencas y plazas del centro hist\xF3rico.

Uno de sus mayores aciertos es el ambiente popular: muchas actuaciones son gratuitas o muy accesibles, permitiendo disfrutar del flamenco de forma cercana y natural.

\u{1F3B6} Ambiente viajero:
Escuchar flamenco en una plaza de San Fernando durante una noche de verano, con el aire de la Bah\xEDa entrando desde los ca\xF1os, es una experiencia dif\xEDcil de olvidar.

\u{1F4A1} Consejo AvenTourArte:
Las actuaciones m\xE1s peque\xF1as y espont\xE1neas suelen ser las m\xE1s especiales. No te centres solo en los grandes conciertos.

\u{1F4DC} Curiosidad:
El festival suele arrancar en torno al aniversario de la muerte de Camar\xF3n de la Isla, una fecha especialmente emotiva para toda la ciudad.`,fecha:"Se celebra cada verano, generalmente entre julio y finales de agosto.",precio:`Muchas actividades y actuaciones son gratuitas.
Grandes conciertos y espect\xE1culos especiales: precio variable.`},{nombre:"Festividad de la Divina Pastora",descripcion:`La Festividad de la Divina Pastora es una de las celebraciones con m\xE1s sabor popular y m\xE1s identidad de San Fernando, profundamente ligada al hist\xF3rico Barrio de la Pastora.

Cada mes de agosto, las calles estrechas y las casas bajas del barrio se transforman en un escenario de flores, balcones engalanados y devoci\xF3n compartida alrededor de una de las im\xE1genes m\xE1s queridas de La Isla.

El momento central llega con la procesi\xF3n de la Divina Pastora de las Almas, que sale desde su iglesia al caer la tarde del 15 de agosto. A diferencia de otras procesiones m\xE1s solemnes, aqu\xED el ambiente tiene un car\xE1cter alegre y muy cercano, acompa\xF1ado por marchas de gloria, p\xE9talos lanzados desde los balcones y salves cantadas por los vecinos.

El instante clave se vive en la Calle Ancha, aut\xE9ntico coraz\xF3n del barrio, donde la Virgen avanza entre flores, sevillanas y una atm\xF3sfera profundamente isle\xF1a.

La imagen de la Pastora destaca por su iconograf\xEDa \xFAnica: aparece bajo un risco rodeada de flores y corderos, luciendo su caracter\xEDstico sombrero pastoril.

Durante los d\xEDas previos tambi\xE9n se celebran cultos, novenas y el tradicional besamanos, uno de los momentos m\xE1s \xEDntimos y esperados por devotos y fot\xF3grafos.

\u{1F3AD} Ambiente viajero:
Es una de las mejores fiestas para descubrir el San Fernando m\xE1s aut\xE9ntico, popular y de barrio.

\u{1F4A1} Consejo AvenTourArte:
No te limites a ver la procesi\xF3n. Pasea antes por las calles del barrio, entra en alguna pe\xF1a o taberna y disfruta del ambiente vecinal que convierte esta fiesta en algo muy especial.

\u{1F4DC} Curiosidad:
La Divina Pastora es Copatrona de San Fernando y una de las devociones m\xE1s queridas de la ciudad. Su relaci\xF3n con el barrio es tan fuerte que muchos isle\xF1os consideran imposible entender La Pastora sin su Virgen.`,fecha:"Se celebra cada a\xF1o en torno al 15 de agosto, festividad de la Divina Pastora.",precio:"Acceso gratuito a procesiones, cultos y actividades populares."},{nombre:"Fiesta de las Cortes",descripcion:`La Fiesta de las Cortes es la gran conmemoraci\xF3n hist\xF3rica de San Fernando y una de las celebraciones culturales m\xE1s singulares de Andaluc\xEDa.

Cada 24 de septiembre, la ciudad recuerda el momento en que la entonces Real Isla de Le\xF3n acogi\xF3 la constituci\xF3n de las primeras Cortes Generales y Extraordinarias de Espa\xF1a en plena invasi\xF3n napole\xF3nica.

Durante unos d\xEDas, San Fernando dej\xF3 de ser una peque\xF1a ciudad de la Bah\xEDa para convertirse en el lugar donde comenz\xF3 a construirse la Espa\xF1a contempor\xE1nea.

El juramento de los diputados tuvo lugar en la Iglesia Mayor de San Pedro y San Pablo, y las sesiones se celebraron en el actual Real Teatro de las Cortes.

Hoy la ciudad revive aquellos acontecimientos mediante recreaciones hist\xF3ricas, desfiles de \xE9poca, actos militares, conciertos y actividades culturales repartidas por el centro hist\xF3rico.

\u{1F3AD} Ambiente viajero:
Es una fiesta muy distinta al resto de celebraciones andaluzas. Aqu\xED el protagonismo lo tienen la historia, la memoria constitucional y la identidad naval de la ciudad.

\u{1F4A1} Consejo AvenTourArte:
La mejor forma de vivir esta fiesta es recorrer caminando los lugares originales donde ocurrieron los acontecimientos de 1810.

\u{1F4DC} Curiosidad:
El famoso cuadro \u201CEl Juramento de las Cortes de C\xE1diz\u201D, conservado en el Congreso de los Diputados, representa en realidad el interior de la Iglesia Mayor de San Fernando.`,fecha:"Se celebra cada a\xF1o en torno al 24 de septiembre.",precio:`La mayor\xEDa de actividades y recreaciones son gratuitas.
Algunas visitas o eventos especiales pueden requerir inscripci\xF3n previa.`},{nombre:"Procesi\xF3n Magna Mariana",descripcion:`La Procesi\xF3n Magna Mariana es uno de los acontecimientos religiosos y visuales m\xE1s extraordinarios que puede vivir San Fernando.

No se celebra todos los a\xF1os, sino \xFAnicamente en ocasiones especiales, aniversarios o celebraciones excepcionales, reuniendo en una sola jornada a algunas de las im\xE1genes marianas m\xE1s importantes y veneradas de la ciudad.

Durante la Magna, San Fernando se transforma completamente. Las calles del centro hist\xF3rico se llenan de altares, balcones engalanados, m\xFAsica procesional y una atm\xF3sfera de acontecimiento irrepetible que moviliza a toda La Isla.

Ver juntas a las grandes devociones marianas recorriendo la Calle Real crea una imagen muy poderosa, especialmente en una ciudad donde la tradici\xF3n cofrade forma parte esencial de la identidad local.

Adem\xE1s del valor religioso, la Magna tiene una enorme dimensi\xF3n art\xEDstica y patrimonial: bordados, orfebrer\xEDa, m\xFAsica y patrimonio imaginero se muestran con un nivel excepcional.

\u{1F3AD} Ambiente viajero:
Es uno de los eventos m\xE1s impactantes visualmente de San Fernando y una ocasi\xF3n \xFAnica para entender la importancia que tienen las hermandades en la vida de la ciudad.

\u{1F4DC} Curiosidad:
Las Procesiones Magnas suelen organizarse \xFAnicamente en fechas hist\xF3ricas o aniversarios muy concretos, por lo que cada edici\xF3n se convierte en un acontecimiento recordado durante a\xF1os por los isle\xF1os.`,fecha:"Celebraci\xF3n extraordinaria sin periodicidad fija. Se organiza \xFAnicamente en ocasiones especiales o aniversarios religiosos relevantes.",precio:"Acceso gratuito a procesiones y actos p\xFAblicos."}]},{titulo:"Consejo de ruta AvenTourArte",contenido:`La mejor forma de descubrir San Fernando es dedicarle un d\xEDa completo sin prisas, dejando que la ciudad marque el ritmo.

La ruta ideal comienza desayunando en BRUMA Caf\xE9, perfecto para arrancar la ma\xF1ana en el centro hist\xF3rico antes de recorrer lugares clave como la Iglesia del Carmen, el Ayuntamiento, el Real Teatro de las Cortes y la Iglesia Mayor, escenarios fundamentales de la historia pol\xEDtica y religiosa de La Isla.

A medida que avanza el d\xEDa, la ciudad cambia de tono y el protagonismo pasa al universo de Camar\xF3n: la Casa Natal, la Fragua, el Monumento y el Centro de Interpretaci\xF3n permiten recorrer no solo la vida del artista, sino tambi\xE9n el San Fernando popular y flamenco que lo hizo posible.

La parada natural para almorzar es la Venta de Vargas, donde gastronom\xEDa, memoria y flamenco forman parte de una misma experiencia. Para quienes busquen un ambiente todav\xEDa m\xE1s \xEDntimo y local, la Pe\xF1a Camar\xF3n ofrece una forma diferente de cerrar la ruta flamenca.

Por la tarde, San Fernando permite elegir entre dos finales muy distintos pero igualmente aut\xE9nticos: perderse entre las dunas de Camposoto y el Sendero Punta del Boquer\xF3n al atardecer, o profundizar en la dimensi\xF3n hist\xF3rica y naval de la ciudad con lugares como el Castillo de San Romualdo, el Pante\xF3n de Marinos Ilustres o el Real Observatorio de la Armada.

\u{1F319} Mirada final AvenTourArte:
San Fernando no es una ciudad que se imponga de golpe. Se entiende poco a poco: caminando despacio por la Calle Real, escuchando una conversaci\xF3n en una pe\xF1a, oliendo el salitre de las marismas o imaginando la voz de Camar\xF3n entre las calles de las Callejuelas.

\u{1F3AD} \xC1ngulo narrativo recomendado:
\u201CSan Fernando: la isla que midi\xF3 el tiempo, so\xF1\xF3 libertad y cant\xF3 por Camar\xF3n\u201D.`}]};var M0={path:"europa/espana/andalucia/cadiz/jerez-de-la-frontera",nombre:"Jerez de la Frontera",flag:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",background:"cld:europa/espana/andalucia/cadiz/jerez/jerez-flag",bgPos:"50% 60%",bgPosMobile:"50% 60%",bgDim:.12,flagOpacity:.12,flagOpacityMobile:.18,flagSize:"75%",flagSizeMobile:"50%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`Jerez de la Frontera es una de las ciudades con m\xE1s personalidad de Andaluc\xEDa. Mundialmente conocida por sus vinos, por el caballo cartujano, por ser cuna del flamenco y por su v\xEDnculo con el motor, combina patrimonio, tradici\xF3n y una forma de vivir muy marcada por su identidad propia.

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
Espect\xE1culos: 15 \u20AC \u2013 35 \u20AC`}]}]};var T0={path:"europa/espana/andalucia/cadiz/trebujena",nombre:"Trebujena",flag:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",background:"cld:europa/espana/andalucia/cadiz/trebujena/trebujena-flag",bgPos:"50% 65%",bgPosMobile:"50% 65%",bgDim:.1,flagOpacity:.12,flagOpacityMobile:.18,flagSize:"75%",flagSizeMobile:"50%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`Trebujena es un municipio gaditano situado junto al r\xEDo Guadalquivir y las marismas de Do\xF1ana. Con una fuerte identidad agr\xEDcola y popular, es conocida por su vino mosto, sus fiestas singulares, su paisaje natural y su car\xE1cter aut\xE9ntico.

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
Posiblemente una de las fiestas que mejor resume el esp\xEDritu de Trebujena: cocina popular, humor, tradici\xF3n y mucha vida en la calle.`,fecha:"Primera semana de diciembre",precio:"Gratis"}]}]};var x0={path:"europa/espana/andalucia/sevilla/mairena-del-aljarafe",nombre:"Mairena del Aljarafe",flag:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/mairena-aljarafe-flag",background:"cld:europa/espana/andalucia/sevilla/mairena-aljarafe/mairena-aljarafe-flag",bgPos:"50% 65%",bgPosMobile:"50% 65%",bgDim:.1,flagOpacity:.12,flagOpacityMobile:.18,flagSize:"75%",flagSizeMobile:"50%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`Municipio del Aljarafe sevillano situado a solo 6 km de Sevilla capital. Mairena del Aljarafe combina historia, zonas verdes, excelente comunicaci\xF3n y una intensa vida cultural y gastron\xF3mica dentro del \xE1rea metropolitana sevillana.

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

Muchas de ellas est\xE1n muy ligadas a la tradici\xF3n local, mientras que otras muestran la evoluci\xF3n de Mairena como una localidad din\xE1mica y con una agenda cultural cada vez m\xE1s activa.`,lugares:[{nombre:"San Ildefonso",descripcion:"Fiesta del patr\xF3n de Mairena del Aljarafe. Se celebra con actos religiosos, procesi\xF3n y convivencia vecinal, siendo una de las fechas m\xE1s importantes del calendario local.",fecha:"23 de enero",precio:"Gratis"},{nombre:"Carnaval",descripcion:"Celebraci\xF3n popular con disfraces, m\xFAsica y actividades para todas las edades, fomentando la participaci\xF3n vecinal y el ambiente festivo.",fecha:"Febrero",precio:"Gratis"},{nombre:"Feria del Libro",descripcion:"Evento cultural dedicado a la literatura, con presentaciones, firmas de autores, actividades infantiles y fomento de la lectura.",fecha:"Abril",precio:"Gratis"},{nombre:"Cruz de Mayo",descripcion:"Fiesta tradicional andaluza en la que se instalan cruces decoradas con flores, acompa\xF1adas de m\xFAsica, baile y gastronom\xEDa t\xEDpica.",fecha:"Mayo",precio:"Gratis"},{nombre:"Feria de la Tapa",descripcion:"Cita gastron\xF3mica muy popular donde bares y restaurantes locales ofrecen tapas a precios especiales, acompa\xF1adas de ambiente festivo.",fecha:"Mayo",precio:"Seg\xFAn consumo"},{nombre:"Roc\xEDo",descripcion:"La Hermandad del Roc\xEDo de Mairena participa en la tradicional romer\xEDa hacia la aldea del Roc\xEDo, combinando devoci\xF3n, convivencia y tradici\xF3n.",fecha:"Mayo / Junio",precio:"Gratis"},{nombre:"Virgen del Rosario",descripcion:"Celebraci\xF3n religiosa y popular en honor a la Virgen del Rosario, con procesi\xF3n y actos lit\xFArgicos muy arraigados en la tradici\xF3n local.",fecha:"Mayo y Octubre",precio:"Gratis"},{nombre:"Feria de Mairena del Aljarafe",descripcion:"La feria local se celebra en el Centro Multiusos con el tradicional alumbrado del recinto ferial, actuaciones musicales de artistas nacionales, casetas, atracciones y actividades infantiles como el D\xEDa del Ni\xF1o.",fecha:"Junio",precio:"Seg\xFAn consumo"},{nombre:"Fiestas de la Virgen de las Mercedes",descripcion:"Celebraciones en honor a la patrona del municipio, con actos religiosos, procesi\xF3n, actividades culturales y eventos festivos.",fecha:"Junio y Septiembre",precio:"Gratis"},{nombre:"Cabaret Festival",descripcion:"Festival musical de gran formato que re\xFAne a artistas nacionales e internacionales, consolidando a Mairena como sede de grandes eventos culturales.",fecha:"Verano",precio:"Entrada seg\xFAn espect\xE1culo"},{nombre:"Zambomba Mairenera",descripcion:"Tradicional celebraci\xF3n navide\xF1a con villancicos, zambombas y ambiente familiar que llena las calles de m\xFAsica y tradici\xF3n.",fecha:"Diciembre",precio:"Gratis"},{nombre:"Navidad y Cabalgata de Reyes",descripcion:"Durante las fiestas navide\xF1as, Mairena se ilumina con decoraci\xF3n, belenes y actividades infantiles, culminando con la tradicional Cabalgata de Reyes Magos.",fecha:"Diciembre \u2013 Enero",precio:"Gratis"}]}]};var w0={path:"europa/italia/roma",nombre:"Roma y Ciudad del Vaticano",flag:"cld:europa/italia/roma/roma-flag",flag2:"cld:europa/italia/roma/vaticano-flag",background:"cld:europa/italia/italia-bg",bgPos:"50% 50%",bgPosMobile:"50% 50%",bgDim:.12,flagOpacity:.1,flagOpacityMobile:.16,flagSize:"75%",flagSizeMobile:"55%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`Roma no es solo una ciudad, es un viaje continuo a trav\xE9s del tiempo. Aqu\xED no visitas monumentos, caminas literalmente sobre m\xE1s de 2.000 a\xF1os de historia.

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
No intentes correr Roma. Es una ciudad para saborearla.`}]};var A0={path:"europa/rumania/bucarest",nombre:"Bucarest",flag:"cld:europa/rumania/bucarest/bucarest-flag",background:"cld:europa/rumania/rumania-flag",bgPos:"50% 65%",bgPosMobile:"50% 65%",bgDim:.1,flagOpacity:.12,flagOpacityMobile:.18,flagSize:"75%",flagSizeMobile:"50%",bgSize:"cover",bgSizeMobile:"cover",descripcion:`Bucarest es una ciudad de contrastes que sorprende mucho m\xE1s de lo que esperas. A primera vista puede parecer ca\xF3tica, pero en cuanto empiezas a recorrerla descubres una mezcla muy potente de historia, arquitectura y vida local.

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

Pero si le das tiempo\u2026 es de las que m\xE1s te sorprenden.`}]};var R0={path:"america/sudamerica/brasil/rio-de-janeiro",nombre:"R\xEDo de Janeiro",flag:"assets/america/sudamerica/brasil/rio/rio-flag.png",background:"assets/america/sudamerica/brasil/rio/rio-bg.jpg",bgPos:"50% 35%",bgPosMobile:"50% 30%",flagOverlay:!0,flagOpacity:.1,flagSize:"55%",bgBrightness:.85,descripcion:'R\xEDo de Janeiro, la "Cidade Maravilhosa", es famosa por sus playas ic\xF3nicas (Copacabana, Ipanema), el Cristo Redentor y su vibrante vida cultural y carnavalesca.',infoGeneral:{idioma:"Portugu\xE9s",moneda:"Real Brasile\xF1o (BRL) \u2014 1 \u20AC \u2248 6 BRL",hora:"UTC -3 (\u22124h respecto a Espa\xF1a)",internet:"Roaming fuera de la UE. Recomendada eSIM local.",electricidad:"127V/220V \u2013 Enchufe tipo N",pasaporte:"Requerido",visado:"No necesario hasta 90 d\xEDas",vacunas:"Fiebre amarilla recomendada"},secciones:[{titulo:"Historia",contenido:"Fundada en el siglo XVI, R\xEDo fue capital de Brasil hasta 1960. Su historia mezcla influencias ind\xEDgenas, coloniales portuguesas y modernas transformaciones urbanas que la convirtieron en un importante centro cultural y tur\xEDstico."},{titulo:"Geograf\xEDa y Clima",contenido:"Situada entre monta\xF1as y el oc\xE9ano Atl\xE1ntico, R\xEDo tiene un clima tropical atl\xE1ntico: veranos calurosos y h\xFAmedos (diciembre\u2013marzo) y inviernos suaves (junio\u2013agosto)."},{titulo:"Qu\xE9 visitar en R\xEDo de Janeiro",itinerario:[{dia:"D\xEDa 1 \u2013 Centro hist\xF3rico y samba",zonas:[{nombre:"Pra\xE7a da Rep\xFAblica / Campo de Santana",descripcion:"Tambi\xE9n conocido como Campo de Santana, este parque en el Centro Viejo es un oasis verde en plena ciudad. Alberga fauna urbana como agut\xEDes (cutias), patos y pavos reales. Ideal para un paseo relajado tras la llegada a R\xEDo.",fotos:["assets/america/sudamerica/brasil/rio/rio-praca-republica.jpg","assets/america/sudamerica/brasil/rio/rio-agutis.jpg"],horario:"Acceso libre todo el d\xEDa",precio:"Gratis"},{nombre:"Real Gabinete Portugu\xEAs de Leitura",descripcion:"Una joya arquitect\xF3nica fundada por la comunidad portuguesa. Considerada una de las bibliotecas m\xE1s bellas del mundo, con estanter\xEDas talladas y miles de vol\xFAmenes raros.",fotos:["assets/america/sudamerica/brasil/rio/rio-gabinete-portugues-leitura.jpg"],horario:"10:00\u201318:00 (consultar horarios actualizados)",precio:"Gratis o simb\xF3lico"},{nombre:"Confiteria Colombo",descripcion:"Cl\xE1sico caf\xE9 literario inaugurado en 1894. Famoso por su decoraci\xF3n art nouveau, sus vitrinas de dulces y su ambiente elegante. Aqu\xED puedes degustar el mejor brigadeiro de R\xEDo.",fotos:["assets/america/sudamerica/brasil/rio/rio-cafeteria-colombo.jpg"],horario:"Lunes a s\xE1bado 09:00\u201318:00",precio:"Consumo en local"},{nombre:"Museu do Amanh\xE3",descripcion:"Museo de ciencia y futuro dise\xF1ado por Santiago Calatrava, situado en la zona portuaria. Muestra exposiciones sobre sostenibilidad, cambio clim\xE1tico y el futuro del planeta.",fotos:["assets/america/sudamerica/brasil/rio/rio-museo-amanha.jpg"],horario:"Martes a domingo 10:00\u201318:00",precio:"Entrada \u2248 30 BRL"},{nombre:"Pedra do Sal",descripcion:"Lugar hist\xF3rico de la cultura afro-carioca y cuna de la samba. Cada lunes por la noche hay m\xFAsica en vivo y espect\xE1culos de samba gratuitos en la calle.",fotos:["assets/america/sudamerica/brasil/rio/rio-pedra-do-sal.jpg"],horario:"Lunes desde las 20:00",precio:"Gratis (solo consumo)"}]},{dia:"D\xEDa 2 - Santa Teresa y Lapa",zonas:[{nombre:"Tranv\xEDa amarillo de Santa Teresa (Bonde)",descripcion:"El hist\xF3rico tranv\xEDa amarillo conecta el centro de R\xEDo con el barrio de Santa Teresa cruzando los Arcos da Lapa. Es un viaje emblem\xE1tico con vistas \xFAnicas y mucho encanto local.",foto:"assets/rio/rio-bonde.jpg",horario:"Cada 15-20 min, de 8:00 a 17:00",precio:"\u2248 20 BRL por trayecto"},{nombre:"Largo dos Guimar\xE3es",descripcion:"Coraz\xF3n del barrio bohemio de Santa Teresa, repleto de bares, galer\xEDas y caf\xE9s art\xEDsticos. Ideal para pasear y disfrutar del ambiente relajado y colorido.",foto:"assets/rio/rio-largo-guimaraes.jpg",horario:"Acceso libre todo el d\xEDa",precio:"Gratis"},{nombre:"Almuerzo en Bar do Mineiro",descripcion:"Restaurante ic\xF3nico de Santa Teresa famoso por su feijoada, platos de Minas Gerais y ambiente acogedor lleno de arte local.",foto:"assets/rio/rio-bar-do-mineiro.jpg",horario:"Martes a domingo 11:00\u201300:00",precio:"Plato principal \u2248 40\u201370 BRL"},{nombre:"Parque das Ru\xEDnas",descripcion:"Centro cultural y mirador ubicado en una antigua mansi\xF3n restaurada. Ofrece vistas espectaculares de la bah\xEDa y el centro de R\xEDo.",foto:"assets/rio/rio-parque-ruinas.jpg",horario:"Martes a domingo 8:00\u201318:00",precio:"Gratis"},{nombre:"Arcos da Lapa",descripcion:"El antiguo acueducto del siglo XVIII es uno de los s\xEDmbolos m\xE1s reconocibles de la ciudad. Hoy sostiene la v\xEDa del tranv\xEDa de Santa Teresa.",foto:"assets/rio/rio-arcos-lapa.jpg",horario:"Acceso libre",precio:"Gratis"},{nombre:"Escadaria Selar\xF3n",descripcion:"Colorida escalera de m\xE1s de 2000 azulejos creada por el artista chileno Jorge Selar\xF3n. Representa un homenaje al pueblo brasile\xF1o y a la humanidad.",foto:"assets/rio/rio-selaron.jpg",horario:"Acceso libre",precio:"Gratis"},{nombre:"Cena en Restaurante Nova Capela",descripcion:"Cl\xE1sico restaurante carioca fundado en 1903, ubicado en Lapa. Famoso por su picanha al ajo, cabrito asado y platos tradicionales brasile\xF1os. Ideal para cerrar el d\xEDa con una buena cena en un entorno aut\xE9ntico y animado.",foto:"assets/rio/rio-nova-capela.jpg",horario:"Abierto todos los d\xEDas 11:30\u201303:00",precio:"Platos principales \u2248 60\u2013120 BRL"}]},{dia:"D\xEDa 3 \u2013 Centro hist\xF3rico y playa de Copacabana",zonas:[{nombre:"Catedral de San Sebasti\xE1n",descripcion:"La catedral principal de R\xEDo de Janeiro, de estilo neog\xF3tico con detalles modernos. Se ubica en el coraz\xF3n del centro hist\xF3rico y destaca por su arquitectura religiosa y su relevancia en la vida eclesi\xE1stica de la ciudad.",foto:"assets/rio/rio-catedral-san-sebastian.jpg",horario:"09:00-17:00",precio:"Gratis (donaciones voluntarias)"},{nombre:"Biblioteca Nacional",descripcion:"Una de las mayores bibliotecas de Am\xE9rica Latina. Alberga una vasta colecci\xF3n de documentos hist\xF3ricos, manuscritos, libros raros y fuentes culturales brasile\xF1as.",foto:"assets/rio/rio-biblioteca-nacional.jpg",horario:"10:00-17:00",precio:"Entrada gratuita"},{nombre:"Teatro Municipal de R\xEDo",descripcion:"Majestuoso teatro de estilo inspirado en la \xD3pera de Par\xEDs, s\xEDmbolo cultural de la ciudad. Ofrece visitas guiadas y ocasionalmente espect\xE1culos de m\xFAsica y baile.",foto:"assets/rio/rio-teatro-municipal.jpg",horario:"10:00-17:00 (visitas guiadas)",precio:"Entrada \u2248 20-30 BRL (seg\xFAn actividad)"},{nombre:"Palacio Tiradentes",descripcion:"Sede simb\xF3lica de la Asamblea Legislativa de R\xEDo. Ubicado en la Pra\xE7a XV, es un edificio hist\xF3rico con importancia pol\xEDtica y patrimonial.",foto:"assets/rio/rio-palacio-tiradentes.jpg",horario:"10:00-17:00",precio:"Entrada gratuita o simb\xF3lica"},{nombre:"Palacio Imperial / Pra\xE7a XV (mercadillo)",descripcion:"En la Plaza XV de Novembro se encuentra el Pa\xE7o Imperial, sede cultural con exposiciones y eventos. En los alrededores organizan mercadillos de artesan\xEDa y cultura local en d\xEDas determinados.",foto:"assets/rio/rio-paco-imperial-centro.jpg",horario:"Durante el d\xEDa, mercadillo por la tarde",precio:"Gratis (solo compras si compras algo)"},{nombre:"Puerto hist\xF3rico de la Pra\xE7a XV y Marina da Gl\xF3ria",descripcion:"Zona portuaria tradicional frente a la Pra\xE7a XV, donde se aprecian las vistas de la Bah\xEDa de Guanabara y los ferris que cruzan hacia Niter\xF3i. Es ideal para dar un paseo junto al mar y ver el movimiento de barcos deportivos en la cercana Marina da Gl\xF3ria.",foto:"assets/rio/rio-marina-gloria.jpg",horario:"Abierto todo el d\xEDa",precio:"Gratis"},{nombre:"Playa de Copacabana (tarde)",descripcion:"Para cerrar el d\xEDa con calma, rel\xE1jate en la famosa playa de Copacabana. Pasea por la orilla, disfruta del mar, los quioscos y el ambiente carioca al atardecer.",foto:"assets/rio/rio-copacabana-beach.jpg",horario:"Acceso libre 24h",precio:"Gratis"}]},{dia:"D\xEDa 4 \u2013 Cristo Redentor, Parque Lage e Ipanema",zonas:[{nombre:"Cristo Redentor (Corcovado)",descripcion:"Una de las Siete Maravillas del Mundo Moderno. La estatua de 30 metros de altura domina la ciudad desde el monte Corcovado. Se recomienda visitar temprano y en un d\xEDa despejado para disfrutar de las mejores vistas panor\xE1micas de R\xEDo y la bah\xEDa.",foto:"assets/rio/rio-cristo-redentor.jpg",horario:"08:00\u201318:00",precio:"Ticket tren o furgoneta oficial \u2248 90\u2013130 BRL seg\xFAn temporada"},{nombre:"Parque Lage y Mansi\xF3n Lage",descripcion:"Hermoso parque al pie del Corcovado con senderos naturales, grutas, un peque\xF1o acuario y fauna local (capibaras, monos y aves tropicales). En su centro se encuentra una mansi\xF3n hist\xF3rica con un caf\xE9 muy popular y vistas al Cristo. Es ideal para relajarse tras la visita al Corcovado.",foto:"assets/rio/rio-parque-lage.jpg",horario:"Diario 08:00\u201317:00",precio:"Gratis"},{nombre:"Almuerzo en Garota de Ipanema",descripcion:"Restaurante famoso donde Vin\xEDcius de Moraes escribi\xF3 la c\xE9lebre canci\xF3n \u201CGarota de Ipanema\u201D. Ofrece platos t\xEDpicos brasile\xF1os como la picanha a la brasa, feijoada y moqueca, con un ambiente local muy animado. Se recomienda reservar con antelaci\xF3n, especialmente los fines de semana.",foto:"assets/rio/rio-garota-ipanema.jpg",horario:"11:00\u201300:00",precio:"Plato principal \u2248 60\u2013100 BRL"},{nombre:"Playa de Ipanema",descripcion:"Considerada una de las playas m\xE1s famosas del mundo, Ipanema ofrece un ambiente joven y cosmopolita. Ideal para disfrutar de la tarde tomando el sol, ba\xF1arse en el Atl\xE1ntico o unirse a los partidos de futv\xF3ley locales. No olvides probar una aut\xE9ntica caipirinha en el quiosco Astor Beach 83, frente al Posto 9.",foto:"assets/rio/rio-ipanema.jpg",horario:"Acceso libre 24h",precio:"Gratis"},{nombre:"Barrio de Leblon",descripcion:"Zona elegante y tranquila contigua a Ipanema, con tiendas, bares y cafeter\xEDas frente al mar. Ideal para dar un paseo al final del d\xEDa antes de subir al mirador.",foto:"assets/rio/rio-leblon.jpg",horario:"Todo el d\xEDa",precio:"Gratis"},{nombre:"Mirador de Arpoador (puesta de sol)",descripcion:"Roca entre Ipanema y Copacabana desde la que se contempla una de las puestas de sol m\xE1s espectaculares de R\xEDo, con aplausos colectivos al atardecer. Un cierre perfecto para el d\xEDa.",foto:"assets/rio/rio-arpoador.jpg",horario:"Abierto todo el d\xEDa (mejor al atardecer)",precio:"Gratis"}]},{dia:"D\xEDa 5 \u2013 Favela, Barrio de Urca y atardecer en el Pan de Az\xFAcar",zonas:[{nombre:"Tour por la Favela Rocinha",descripcion:"Rocinha es la favela m\xE1s grande de Brasil y una de las m\xE1s conocidas del mundo. Se puede visitar con gu\xEDas locales que muestran el d\xEDa a d\xEDa de sus habitantes, el arte urbano, los miradores y los proyectos sociales que buscan transformar la comunidad. Se recomienda hacerlo siempre con una agencia oficial o gu\xEDa certificado.",foto:"assets/rio/rio-rocinha.jpg",horario:"Tours guiados entre 9:00 y 13:00",precio:"\u2248 120\u2013200 BRL (seg\xFAn operador y duraci\xF3n)"},{nombre:"Tour por el Samb\xF3dromo Marqu\xEAs de Sapuca\xED",descripcion:"El Samb\xF3dromo es el coraz\xF3n del Carnaval de R\xEDo de Janeiro, donde desfilan las escuelas de samba durante las festividades. Durante el a\xF1o se pueden realizar visitas guiadas para conocer la historia del carnaval, ver los trajes y carrozas, e incluso participar en talleres de percusi\xF3n o baile. Ideal para sentir el esp\xEDritu del carnaval aunque no sea febrero.",foto:"assets/rio/rio-sambodromo.jpg",horario:"De lunes a s\xE1bado, 10:00\u201317:00",precio:"Entrada \u2248 60 BRL (con gu\xEDa \u2248 100 BRL)",duracion:"Aprox. 1 hora"},{nombre:"Tour por el Estadio Maracan\xE1",descripcion:"Uno de los estadios m\xE1s emblem\xE1ticos del mundo y sede de finales hist\xF3ricas de f\xFAtbol. El recorrido incluye acceso al campo, los vestuarios, la sala de prensa y el peque\xF1o museo donde se exhiben camisetas y objetos de leyendas como Pel\xE9 y Garrincha. Perfecto para los amantes del f\xFAtbol.",foto:"assets/rio/rio-maracana.jpg",horario:"Todos los d\xEDas, 9:00\u201317:00",precio:"Entrada \u2248 80\u2013100 BRL",duracion:"Aprox. 1 hora"},{nombre:"Almuerzo en Garota de Urca",descripcion:"Restaurante tradicional frente a la bah\xEDa de Guanabara. Famoso por su picanha, pescados frescos y ambiente local relajado. Ideal para disfrutar de una comida con vistas al mar antes de la tarde en la playa.",foto:"assets/rio/rio-garota-urca.jpg",horario:"11:00\u201323:00",precio:"Plato principal \u2248 60\u201390 BRL"},{nombre:"Praia Vermelha (Playa Roja)",descripcion:"Peque\xF1a playa al pie del Pan de Az\xFAcar, muy tranquila y con vistas impresionantes a los morros de Urca. Perfecta para descansar, ba\xF1arse o disfrutar de una caipirinha antes de subir al telef\xE9rico. Desde aqu\xED parte el paseo hacia el Pan de Az\xFAcar.",foto:"assets/rio/rio-praia-vermelha.jpg",horario:"Acceso libre todo el d\xEDa",precio:"Gratis"},{nombre:"Subida al Pan de Az\xFAcar (P\xE3o de A\xE7\xFAcar) al atardecer",descripcion:"Una experiencia imprescindible. El telef\xE9rico conecta Praia Vermelha con el Morro da Urca y luego con el Pan de Az\xFAcar. Desde arriba se obtiene una de las vistas m\xE1s ic\xF3nicas del mundo, especialmente al atardecer cuando la ciudad se ilumina frente al oc\xE9ano.",foto:"assets/rio/rio-pao-de-acucar-sunset.jpg",horario:"08:00\u201320:00 (\xFAltima subida recomendada antes de las 18:00)",precio:"Ticket telef\xE9rico \u2248 120 BRL (ida y vuelta)"}]},{dia:"D\xEDa 6 \u2013 Naturaleza en Tijuca y samba en Rio Scenarium",zonas:[{nombre:"Parque Nacional da Tijuca",descripcion:"Uno de los mayores bosques urbanos del mundo, el Parque Nacional da Tijuca es un aut\xE9ntico pulm\xF3n verde en el coraz\xF3n de R\xEDo de Janeiro. Est\xE1 lleno de cascadas, senderos, miradores y fauna tropical (como monos tit\xEDs, capibaras, tucanes y otras aves entre otras muchas especies). Ideal para disfrutar de la naturaleza sin salir de la ciudad.",foto:"assets/rio/rio-tijuca.jpg",horario:"Todos los d\xEDas, 8:00\u201317:00",precio:"Acceso gratuito"},{nombre:"Cascatinha Taunay",descripcion:"Una de las cascadas m\xE1s bonitas y accesibles del parque, con 35 metros de ca\xEDda rodeada de vegetaci\xF3n exuberante. Es un punto perfecto para hacer fotos o descansar antes de continuar alguna de las rutas de senderismo cercanas.",foto:"assets/rio/rio-cascatinha-taunay.jpg",horario:"Acceso libre durante el d\xEDa",precio:"Gratis"},{nombre:"Mirador Vista Chinesa",descripcion:"Uno de los puntos panor\xE1micos m\xE1s impresionantes de R\xEDo, con una pagoda de estilo chino construida en el siglo XIX. Desde aqu\xED se puede contemplar el Corcovado, el Pan de Az\xFAcar y las playas de Ipanema y Leblon. Se llega por una carretera esc\xE9nica entre la selva atl\xE1ntica.",foto:"assets/rio/rio-vista-chinesa.jpg",horario:"Acceso libre durante el d\xEDa",precio:"Gratis"},{nombre:"Ruta de Pedra Bonita",descripcion:"Sendero muy popular dentro del parque que lleva a una cima desde donde se pueden ver el Pan de Az\xFAcar, la Lagoa Rodrigo de Freitas y la playa de S\xE3o Conrado. Desde aqu\xED tambi\xE9n despegan los parapentes y alas delta que sobrevuelan la costa. Nivel de dificultad moderado (1h30 aprox.).",foto:"assets/rio/rio-pedra-bonita.jpg",horario:"6:00\u201317:00",precio:"Gratis"},{nombre:"Cena con espect\xE1culo de samba en Rio Scenarium",descripcion:"Un cl\xE1sico absoluto de la vida nocturna carioca. Rio Scenarium es un restaurante y casa de espect\xE1culos ubicada en un antiguo almac\xE9n en el barrio de Lapa. Decorado con objetos antiguos y lleno de m\xFAsica en vivo, ofrece una experiencia completa: buena comida brasile\xF1a, caipirinhas y samba en directo hasta la madrugada.",foto:"assets/rio/rio-scenarium.jpg",horario:"Mi\xE9rcoles a domingo, 19:00\u20133:00",precio:"Entrada \u2248 65 BRL (sin consumo)"}]},{dia:"D\xEDa 7 (y siguientes) \u2013 Escapada a Ilha Grande",zonas:[{nombre:"Ilha Grande \u2013 Vila do Abra\xE3o",descripcion:"Principal localidad de Ilha Grande y punto de partida de la mayor\xEDa de excursiones. Un lugar encantador sin coches, con calles de arena, posadas y restaurantes frente al mar. Desde aqu\xED parten las rutas y barcos hacia las playas y lagunas m\xE1s hermosas de la isla.",foto:"assets/rio/ilha-abraao.jpg",horario:"Acceso libre (barcos desde Angra dos Reis, Concei\xE7\xE3o de Jacare\xED o Mangaratiba)",precio:"Traslado mar\xEDtimo \u2248 40\u201380 BRL por trayecto"},{nombre:"Excursi\xF3n a Lagoa Azul, Lagoa Verde y Gruta de Acai\xE1",descripcion:"Tour en lancha o barco que recorre algunas de las zonas m\xE1s famosas de Ilha Grande. La Lagoa Azul y la Lagoa Verde destacan por sus aguas cristalinas, ideales para hacer snorkel y avistar peces y delfines. La Gruta de Acai\xE1 es una cueva submarina con un curioso efecto luminoso turquesa.",foto:"assets/rio/ilha-lagoa-azul.jpg",horario:"Excursiones diarias, 9:00\u201315:00",precio:"\u2248 150\u2013250 BRL seg\xFAn tipo de embarcaci\xF3n"},{nombre:"Praia Lopes Mendes",descripcion:"Considerada una de las playas m\xE1s bonitas de Brasil, Lopes Mendes se alcanza tras una caminata de unas 2 horas desde Vila do Abra\xE3o o tomando un barco hasta Praia do Pouso y caminando 20 minutos m\xE1s. Arena blanca, olas perfectas para surfistas y un entorno virgen hacen de esta playa un para\xEDso natural.",foto:"assets/rio/ilha-lopes-mendes.jpg",horario:"Acceso libre durante el d\xEDa",precio:"Gratis"},{nombre:"Sendero a Praia da Feiticeira",descripcion:"Trilha (sendero) de dificultad moderada que parte desde Vila do Abra\xE3o y conduce a una peque\xF1a cascada y a la playa de la Feiticeira, ideal para nadar y relajarse. Se puede combinar con paseo en taxi-boat de regreso.",foto:"assets/rio/ilha-feiticeira.jpg",horario:"Acceso libre (mejor entre 8:00 y 16:00)",precio:"Gratis (opcional taxi-boat \u2248 30 BRL)"},{nombre:"Saco do C\xE9u y Freguesia de Santana",descripcion:"Peque\xF1as bah\xEDas y pueblos con encanto accesibles por barco o kayak. Saco do C\xE9u es famoso por sus aguas tranquilas y restaurantes sobre el mar. Freguesia de Santana alberga una antigua iglesia colonial y playas perfectas para hacer snorkel.",foto:"assets/rio/ilha-saco-do-ceu.jpg",horario:"Excursiones diarias desde Vila do Abra\xE3o",precio:"\u2248 100\u2013180 BRL (tour en barco)"},{nombre:"Trilha a Dois Rios",descripcion:"Una de las caminatas m\xE1s largas de Ilha Grande (cerca de 3 horas desde Abra\xE3o), conduce al antiguo pueblo de Dois Rios y su playa paradis\xEDaca. Antiguamente aqu\xED se encontraba una prisi\xF3n hoy abandonada. Ideal para los amantes del senderismo y la naturaleza salvaje.",foto:"assets/rio/ilha-dois-rios.jpg",horario:"8:00\u201317:00",precio:"Gratis"},{nombre:"Actividades adicionales",descripcion:"Adem\xE1s de las excursiones, en Ilha Grande puedes practicar kayak, paddle surf o snorkel cerca de Vila do Abra\xE3o. Es un destino ideal para relajarse varios d\xEDas, disfrutar de mariscos frescos, atardeceres sobre el mar y el ambiente isle\xF1o.",foto:"assets/rio/ilha-kayak.jpg",horario:"Seg\xFAn actividad (ma\xF1ana y tarde)",precio:"Kayak/snorkel \u2248 50\u2013100 BRL"}]}]},{titulo:"Gastronom\xEDa",platos:[{nombre:"Caipirinha",descripcion:"El c\xF3ctel nacional de Brasil preparado con cacha\xE7a, lima, az\xFAcar y hielo picado. Refrescante y potente, se disfruta especialmente en los chiringuitos de playa como el Astor Beach 83 en Ipanema.",foto:"assets/rio/rio-caipirinha.jpg",precio:"15\u201325 BRL seg\xFAn el bar"},{nombre:"Picanha (corte de carne brasile\xF1a)",descripcion:"Corte de carne muy tradicional en Brasil, parte de la parrillada. Suele servirse en los \u201Cchurrascos\u201D locales: carne tierna, con sabor pronunciado y a veces acompa\xF1ada de guarniciones como arroz, farofa o verduras.",foto:"assets/rio/rio-picanha.jpg",precio:"Depende del restaurante, moderado-alto seg\xFAn calidad"},{nombre:"Brigadeiro",descripcion:"Dulce t\xEDpico brasile\xF1o hecho a base de leche condensada, cacao, mantequilla y cubierto con chocolate granulado. En la Confiteria Colombo tienes que degustar \u201Cel mejor brigadeiro de R\xEDo\u201D como parte de tu paseo culinario.",foto:"assets/rio/rio-brigadeiro.jpg",precio:"Precio local de un dulce, asequible"},{nombre:"Feijoada",descripcion:"Guiso tradicional brasile\xF1o a base de frijoles negros y carne, normalmente acompa\xF1ado de arroz, farofa y naranja.",foto:"assets/rio/rio-feijoada.jpg",precioOrientativo:"30\u201370 BRL"},{nombre:"Moqueca",descripcion:"Estofado de pescado o marisco con leche de coco, aceite de dend\xEA y cilantro, t\xEDpico de la cocina brasile\xF1a costera. Muy arom\xE1tico y servido en cazuela de barro.",foto:"assets/rio/rio-moqueca.jpg",precio:"40\u201390 BRL"},{nombre:"Guayaba (fruta local)",descripcion:"Fruta tropical abundante en Brasil. La guayaba es jugosa y puede encontrarse en mercados callejeros; excelente para un snack fresco entre paseos.",foto:"assets/rio/rio-guayaba.jpg",precio:"Muy econ\xF3mica (venta callejera)"}]},{titulo:"Cultura y Tradiciones",contenido:"R\xEDo es mundialmente famosa por su Carnaval, samba, escuelas de samba y una escena musical y art\xEDstica muy activa. Tambi\xE9n destacan festivales, teatro y la mezcla cultural de sus barrios."},{titulo:"Consejos pr\xE1cticos",contenido:"Evita llevar objetos de valor a la vista en zonas muy tur\xEDsticas; usa transporte autorizado por la noche; cambia moneda en lugares oficiales; y prueba los mercados locales para gastronom\xEDa y artesan\xEDa."}]};var P0={nombre:"Nueva York",descripcion:`
    La ciudad que nunca duerme. Rascacielos, Central Park, Times Square y
    una mezcla de culturas impresionante hacen de Nueva York un destino \xFAnico.
  `,fotos:["assets/images/ny1.jpg","assets/images/ny2.jpg","assets/images/ny3.jpg"]};function qx(e,t){if(e&1&&(te(0,"img",17),Bt(1,"imgUrl")),e&2){let n=S(3);C("src",Vt(1,2,n.guide.flag,900),Oe)("alt",n.guide.nombre+" flag")}}function Bx(e,t){if(e&1&&(te(0,"img",17),Bt(1,"imgUrl")),e&2){let n=S(3);C("src",Vt(1,2,n.guide.flag2,900),Oe)("alt",n.guide.nombre+" second flag")}}function Vx(e,t){if(e&1&&(g(0,"div",15),O(1,qx,2,5,"img",16)(2,Bx,2,5,"img",16),h()),e&2){let n=S(2);v(),C("ngIf",n.guide.flag),v(),C("ngIf",n.guide.flag2)}}function Ux(e,t){if(e&1&&te(0,"app-info-general",18),e&2){let n=S(2);C("infoGeneral",n.guide.infoGeneral)}}function Hx(e,t){if(e&1){let n=Xe();g(0,"button",21),pe("click",function(){let o=Ne(n).$implicit,r=S(3);return je(r.setActiveTab(o.id))}),g(1,"mat-icon",22),y(2),h(),g(3,"span"),y(4),h()()}if(e&2){let n=t.$implicit,a=S(3);ge("active",n.id===a.activeTabId),Ee("aria-selected",n.id===a.activeTabId)("aria-controls","guide-tab-panel-"+n.id),v(2),V(n.icon),v(2),V(n.label)}}function $x(e,t){if(e&1&&(g(0,"nav",19),O(1,Hx,5,6,"button",20),h()),e&2){let n=S(2);v(),C("ngForOf",n.tabs)("ngForTrackBy",n.trackByTabId)}}function Gx(e,t){if(e&1&&(g(0,"p",32),y(1),h()),e&2){let n=S().$implicit;v(),V(n.contenido)}}function Wx(e,t){if(e&1&&(g(0,"figure",42),te(1,"img",43),Bt(2,"imgUrl"),h()),e&2){let n=S().$implicit;v(),ge("no-crop",n.noCropGallery),C("src",Vt(2,4,n.foto,1400),Oe)("alt",n.nombre)}}function Jx(e,t){if(e&1&&(g(0,"figure",46),te(1,"img",43),Bt(2,"imgUrl"),h()),e&2){let n=t.$implicit,a=S(2).$implicit;v(),ge("no-crop",a.noCropGallery),C("src",Vt(2,4,n,1200),Oe)("alt",a.nombre)}}function Qx(e,t){if(e&1&&(g(0,"div",44),O(1,Jx,3,7,"figure",45),h()),e&2){let n=S().$implicit;v(),C("ngForOf",n.fotos)}}function Yx(e,t){if(e&1&&(g(0,"p",49)(1,"mat-icon"),y(2,"badge"),h(),g(3,"span")(4,"strong"),y(5,"Acceso"),h(),y(6),h()()),e&2){let n=S(2).$implicit;v(6),V(n.acceso)}}function Zx(e,t){if(e&1&&(g(0,"p",49)(1,"mat-icon"),y(2,"event"),h(),g(3,"span")(4,"strong"),y(5,"Fecha"),h(),y(6),h()()),e&2){let n=S(2).$implicit;v(6),V(n.fecha)}}function Kx(e,t){if(e&1&&(g(0,"p",49)(1,"mat-icon"),y(2,"schedule"),h(),g(3,"span")(4,"strong"),y(5,"Horario"),h(),y(6),h()()),e&2){let n=S(2).$implicit;v(6),V(n.horario)}}function Xx(e,t){if(e&1&&(g(0,"p",49)(1,"mat-icon"),y(2,"payments"),h(),g(3,"span")(4,"strong"),y(5,"Precio"),h(),y(6),h()()),e&2){let n=S(2).$implicit;v(6),V(n.precio)}}function ew(e,t){if(e&1&&(g(0,"p",49)(1,"mat-icon"),y(2,"payments"),h(),g(3,"span")(4,"strong"),y(5,"Precio"),h(),y(6),h()()),e&2){let n=S(2).$implicit;v(6),V(n.precioOrientativo)}}function nw(e,t){if(e&1&&(g(0,"div",47),O(1,Yx,7,1,"p",48)(2,Zx,7,1,"p",48)(3,Kx,7,1,"p",48)(4,Xx,7,1,"p",48)(5,ew,7,1,"p",48),h()),e&2){let n=S().$implicit;v(),C("ngIf",n.acceso),v(),C("ngIf",n.fecha),v(),C("ngIf",n.horario),v(),C("ngIf",n.precio),v(),C("ngIf",n.precioOrientativo)}}function tw(e,t){if(e&1&&(g(0,"div",36)(1,"div",37)(2,"h3",38),y(3),h(),g(4,"p"),y(5),h()(),O(6,Wx,3,7,"figure",39)(7,Qx,2,1,"div",40)(8,nw,6,5,"div",41),h()),e&2){let n=t.$implicit,a=S(7);v(3),V(n.nombre),v(2),V(n.descripcion),v(),C("ngIf",n.foto),v(),C("ngIf",n.fotos==null?null:n.fotos.length),v(),C("ngIf",a.hasDetails(n))}}function aw(e,t){if(e&1&&(g(0,"mat-expansion-panel")(1,"mat-expansion-panel-header")(2,"mat-panel-title"),y(3),h()(),O(4,tw,9,5,"div",35),h()),e&2){let n=t.$implicit;v(3),V(n.dia),v(),C("ngForOf",n.zonas)}}function ow(e,t){if(e&1&&(g(0,"mat-accordion",33),O(1,aw,5,2,"mat-expansion-panel",34),h()),e&2){let n=S().$implicit;v(),C("ngForOf",n.itinerario)}}function rw(e,t){if(e&1&&(g(0,"figure",55),te(1,"img",43),Bt(2,"imgUrl"),h()),e&2){let n=S().$implicit;v(),ge("no-crop",n.noCropGallery),C("src",Vt(2,4,n.foto,1200),Oe)("alt",n.nombre)}}function iw(e,t){if(e&1&&(g(0,"figure",46),te(1,"img",43),Bt(2,"imgUrl"),h()),e&2){let n=t.$implicit,a=S(2).$implicit;v(),ge("no-crop",a.noCropGallery),C("src",Vt(2,4,n,1e3),Oe)("alt",a.nombre)}}function sw(e,t){if(e&1&&(g(0,"div",56),O(1,iw,3,7,"figure",45),h()),e&2){let n=S().$implicit;v(),C("ngForOf",n.fotos)}}function cw(e,t){if(e&1&&(g(0,"p",49)(1,"mat-icon"),y(2,"badge"),h(),g(3,"span")(4,"strong"),y(5,"Acceso"),h(),y(6),h()()),e&2){let n=S(2).$implicit;v(6),V(n.acceso)}}function lw(e,t){if(e&1&&(g(0,"p",49)(1,"mat-icon"),y(2,"event"),h(),g(3,"span")(4,"strong"),y(5,"Fecha"),h(),y(6),h()()),e&2){let n=S(2).$implicit;v(6),V(n.fecha)}}function dw(e,t){if(e&1&&(g(0,"p",49)(1,"mat-icon"),y(2,"schedule"),h(),g(3,"span")(4,"strong"),y(5,"Horario"),h(),y(6),h()()),e&2){let n=S(2).$implicit;v(6),V(n.horario)}}function uw(e,t){if(e&1&&(g(0,"p",49)(1,"mat-icon"),y(2,"payments"),h(),g(3,"span")(4,"strong"),y(5,"Precio"),h(),y(6),h()()),e&2){let n=S(2).$implicit;v(6),V(n.precio)}}function pw(e,t){if(e&1&&(g(0,"p",49)(1,"mat-icon"),y(2,"payments"),h(),g(3,"span")(4,"strong"),y(5,"Precio"),h(),y(6),h()()),e&2){let n=S(2).$implicit;v(6),V(n.precioOrientativo)}}function mw(e,t){if(e&1&&(g(0,"div",47),O(1,cw,7,1,"p",48)(2,lw,7,1,"p",48)(3,dw,7,1,"p",48)(4,uw,7,1,"p",48)(5,pw,7,1,"p",48),h()),e&2){let n=S().$implicit;v(),C("ngIf",n.acceso),v(),C("ngIf",n.fecha),v(),C("ngIf",n.horario),v(),C("ngIf",n.precio),v(),C("ngIf",n.precioOrientativo)}}function fw(e,t){if(e&1&&(g(0,"article",52),O(1,rw,3,7,"figure",53),g(2,"div",37)(3,"h3"),y(4),h(),g(5,"p"),y(6),h()(),O(7,sw,2,1,"div",54)(8,mw,6,5,"div",41),h()),e&2){let n=t.$implicit,a=S(6);v(),C("ngIf",n.foto),v(3),V(n.nombre),v(2),V(n.descripcion),v(),C("ngIf",n.fotos==null?null:n.fotos.length),v(),C("ngIf",a.hasDetails(n))}}function hw(e,t){if(e&1&&(g(0,"div",50),O(1,fw,9,5,"article",51),h()),e&2){let n=S().$implicit;v(),C("ngForOf",n.lugares||n.platos)}}function gw(e,t){if(e&1&&(g(0,"section",26)(1,"div",27)(2,"span",28)(3,"mat-icon"),y(4),h()(),g(5,"h2"),y(6),h()(),O(7,Gx,2,1,"p",29)(8,ow,2,1,"mat-accordion",30)(9,hw,2,1,"div",31),h()),e&2){let n=t.$implicit,a=S(4);v(4),V(a.sectionIcon(n.titulo)),v(2),V(n.titulo),v(),C("ngIf",n.contenido),v(),C("ngIf",n.itinerario),v(),C("ngIf",(n.lugares==null?null:n.lugares.length)||(n.platos==null?null:n.platos.length))}}function vw(e,t){if(e&1&&(g(0,"div",24),O(1,gw,10,5,"section",25),h()),e&2){let n=S().$implicit,a=S(2);Ee("id","guide-tab-panel-"+n.id),v(),C("ngForOf",n.sections)("ngForTrackBy",a.trackBySectionTitle)}}function yw(e,t){if(e&1&&(zt(0),O(1,vw,2,3,"div",23),qt()),e&2){let n=t.$implicit,a=S(2);v(),C("ngIf",n.id===a.activeTabId)}}function bw(e,t){if(e&1){let n=Xe();g(0,"button",57),pe("click",function(){Ne(n);let o=S(2);return je(o.scrollToTop())}),g(1,"mat-icon",58),y(2,"flight"),h()()}}function Ew(e,t){if(e&1&&(g(0,"article",3)(1,"header",4)(2,"div",5)(3,"span",6),y(4),h(),g(5,"h1",7),y(6),h(),g(7,"p",8),y(8),h()(),O(9,Vx,3,2,"div",9),h(),g(10,"main",10),O(11,Ux,1,1,"app-info-general",11)(12,$x,2,2,"nav",12)(13,yw,2,1,"ng-container",13),h(),O(14,bw,3,0,"button",14),h()),e&2){let n=S();C("ngStyle",n.pageStyle),v(4),V(n.guideLocationLabel()),v(2),V(n.guide.nombre),v(2),V(n.guide.descripcion),v(),C("ngIf",n.guide.flag||n.guide.flag2),v(2),C("ngIf",n.guide.infoGeneral),v(),C("ngIf",n.tabs.length),v(),C("ngForOf",n.tabs)("ngForTrackBy",n.trackByTabId),v(),C("ngIf",n.showScrollTop)}}function Cw(e,t){e&1&&(g(0,"section",60),te(1,"img",61),g(2,"h2"),y(3,"Gu\xEDa en preparaci\xF3n"),h(),g(4,"p",62),y(5,"Este destino est\xE1 en el men\xFA, pero todav\xEDa no tiene ficha publicada."),h()())}function _w(e,t){if(e&1&&O(0,Cw,6,0,"section",59),e&2){let n=S(),a=Co(4);C("ngIf",n.requestedGuidePath)("ngIfElse",a)}}function Dw(e,t){e&1&&(g(0,"section",63),te(1,"img",61),g(2,"h2"),y(3,"Bienvenido a AvenTourArte"),h(),g(4,"p",62),y(5,"Explora, descubre, comparte"),h(),g(6,"p",62),y(7,"Viaja con arte y emoci\xF3n"),h()())}var mi=class e{constructor(t,n,a){this.route=t;this.router=n;this.img=a}guide=null;pageStyle={};requestedGuidePath=null;showScrollTop=!1;activeTabId="";tabs=[];guides={"europa/espana/andalucia/cadiz/san-fernando":S0,"europa/espana/andalucia/cadiz/jerez-de-la-frontera":M0,"europa/espana/andalucia/cadiz/trebujena":T0,"europa/espana/andalucia/sevilla/mairena-del-aljarafe":x0,"europa/italia/roma-vaticano":w0,"europa/rumania/bucarest":A0,"america/norteamerica/estados-unidos/nueva-york":P0,"america/sudamerica/brasil/rio-de-janeiro":R0};ngOnInit(){this.loadGuideFromUrl(),this.router.events.pipe(ne(t=>t instanceof Je)).subscribe(()=>this.loadGuideFromUrl())}onScroll(){this.showScrollTop=(window.scrollY||0)>350}scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}hasDetails(t){return!!(t.acceso||t.fecha||t.horario||t.precio||t.precioOrientativo)}buildGuideTabs(){if(!this.guide?.secciones?.length)return[];let t=this.guide.path?.includes("/espana/"),n=[{id:"historia",label:"Historia",icon:"history_edu",match:i=>i.includes("historia")},{id:"geografia-clima",label:"Geograf\xEDa y clima",icon:"terrain",match:i=>i.includes("geografia")||i.includes("clima")},{id:"que-ver",label:"Qu\xE9 ver",icon:"explore",match:i=>i.includes("visitar")||i.includes("ruta")||i.includes("itinerario")||i.includes("consejo de ruta")},{id:"gastronomia",label:"Gastronom\xEDa",icon:"restaurant_menu",match:i=>i.includes("gastronomia")},{id:"donde-comer",label:"D\xF3nde comer",icon:"restaurant",match:i=>i.includes("donde comer")},{id:"cultura",label:"Cultura y vida local",icon:"groups",match:i=>i.includes("cultura")||i.includes("vida local")||i.includes("tradiciones")},{id:"fiestas",label:"Fiestas y festivos",icon:"celebration",match:i=>t&&(i.includes("fiesta")||i.includes("festivo"))},{id:"consejos",label:"Consejos pr\xE1cticos",icon:"tips_and_updates",match:i=>!t&&(i.includes("consejo")||i.includes("practico"))}],a=new Set,o=n.map(i=>{let s=this.guide.secciones.filter(c=>{let l=this.normalizeTitle(c.titulo),d=i.match(l);return d&&a.add(c),d});return{id:i.id,label:i.label,icon:i.icon,sections:s}}).filter(i=>i.sections.length),r=this.guide.secciones.filter(i=>!a.has(i));return r.length&&o.push({id:"mas-info",label:"M\xE1s info",icon:"travel_explore",sections:r}),o.some(i=>i.id===this.activeTabId)||(this.activeTabId=o[0]?.id??""),o}setActiveTab(t){this.activeTabId=t}guideLocationLabel(){return this.guide?.path&&this.guide.path.split("/").slice(0,-1).filter(o=>!["europa","america","norteamerica","sudamerica"].includes(o)).map(o=>this.formatLocationSegment(o)).reverse().join(", ")||"Gu\xEDa AvenTourArte"}sectionIcon(t){let n=this.normalizeTitle(t);return n.includes("historia")?"history_edu":n.includes("geografia")||n.includes("clima")?"terrain":n.includes("visitar")||n.includes("ruta")?"explore":n.includes("gastronomia")||n.includes("comer")?"restaurant":n.includes("cultura")||n.includes("vida")?"groups":n.includes("fiesta")||n.includes("festivo")?"celebration":n.includes("consejo")?"route":"travel_explore"}trackByTabId(t,n){return n.id}trackBySectionTitle(t,n){return n.titulo}formatLocationSegment(t){return{espana:"Espa\xF1a",cadiz:"C\xE1diz",andalucia:"Andaluc\xEDa",sevilla:"Sevilla",italia:"Italia",rumania:"Ruman\xEDa",brasil:"Brasil",usa:"Estados Unidos"}[t]??t.split("-").map(a=>a.charAt(0).toUpperCase()+a.slice(1)).join(" ")}loadGuideFromUrl(){let t=this.route.snapshot.paramMap.get("guidePath"),n=this.router.url.split("?")[0].split("#")[0],a=t??decodeURIComponent(n.replace(/^\/guia\/?/,"")).replace(/^\/+/,"");if(a&&this.guides[a]){this.guide=this.guides[a],this.requestedGuidePath=null,this.activeTabId="",this.applyGuideStyle(this.guide),this.tabs=this.buildGuideTabs();return}this.guide=null,this.requestedGuidePath=a||null,this.pageStyle={},this.activeTabId="",this.tabs=[]}normalizeTitle(t){return(t||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}applyGuideStyle(t){let n=window.matchMedia("(max-width: 768px)").matches;this.pageStyle={"--bg-image":`url(${this.img.background(t.background,n)})`,"--bg-pos":t.bgPos??"50% 50%","--bg-pos-mobile":t.bgPosMobile??t.bgPos??"50% 50%","--bg-dim":String(t.bgDim??.1),"--bg-size":t.bgSize??"cover","--bg-size-mobile":t.bgSizeMobile??t.bgSize??"cover","--flag-image":`url(${this.img.url(t.flag,{w:1400,crop:"fit"})})`,"--flag-opacity":String(t.flagOverlay?t.flagOpacity??.18:0),"--flag-opacity-mobile":String(t.flagOverlay?t.flagOpacityMobile??.22:0),"--flag-size":t.flagSize??"75%","--flag-size-mobile":t.flagSizeMobile??"95%"}}groupByDay(t){let n=[];for(let o=0;o<t.length;o+=3)n.push({dia:`D\xEDa ${Math.floor(o/3)+1}`,lugares:t.slice(o,o+3)});return n}static \u0275fac=function(n){return new(n||e)(Q(un),Q(Qe),Q(Bo))};static \u0275cmp=me({type:e,selectors:[["app-guide-viewer"]],hostBindings:function(n,a){n&1&&pe("scroll",function(){return a.onScroll()},Zu)},decls:5,vars:2,consts:[["emptyState",""],["welcome",""],["class","guide-page",3,"ngStyle",4,"ngIf","ngIfElse"],[1,"guide-page",3,"ngStyle"],[1,"guide-hero"],[1,"hero-copy"],[1,"eyebrow"],[1,"city-title"],[1,"hero-description"],["class","hero-media",4,"ngIf"],[1,"guide-content"],[3,"infoGeneral",4,"ngIf"],["class","guide-tabs","aria-label","Secciones de la gu\xEDa",4,"ngIf"],[4,"ngFor","ngForOf","ngForTrackBy"],["class","scroll-top","aria-label","Subir arriba",3,"click",4,"ngIf"],[1,"hero-media"],["class","city-flag",3,"src","alt",4,"ngIf"],[1,"city-flag",3,"src","alt"],[3,"infoGeneral"],["aria-label","Secciones de la gu\xEDa",1,"guide-tabs"],["type","button","class","guide-tab","role","tab",3,"active","click",4,"ngFor","ngForOf","ngForTrackBy"],["type","button","role","tab",1,"guide-tab",3,"click"],["aria-hidden","true"],["class","guide-tab-panel","role","tabpanel",4,"ngIf"],["role","tabpanel",1,"guide-tab-panel"],["class","guide-section",4,"ngFor","ngForOf","ngForTrackBy"],[1,"guide-section"],[1,"section-heading"],["aria-hidden","true",1,"section-icon"],["class","section-content",4,"ngIf"],["class","itinerary-accordion",4,"ngIf"],["class","card-grid",4,"ngIf"],[1,"section-content"],[1,"itinerary-accordion"],[4,"ngFor","ngForOf"],["class","zone-card",4,"ngFor","ngForOf"],[1,"zone-card"],[1,"card-copy"],[1,"lugar-nombre"],["class","image-frame zone-image",4,"ngIf"],["class","photo-grid",4,"ngIf"],["class","detail-list",4,"ngIf"],[1,"image-frame","zone-image"],["loading","lazy",3,"src","alt"],[1,"photo-grid"],["class","image-frame",4,"ngFor","ngForOf"],[1,"image-frame"],[1,"detail-list"],["class","info-line",4,"ngIf"],[1,"info-line"],[1,"card-grid"],["class","item-card",4,"ngFor","ngForOf"],[1,"item-card"],["class","image-frame item-image",4,"ngIf"],["class","photo-grid compact",4,"ngIf"],[1,"image-frame","item-image"],[1,"photo-grid","compact"],["aria-label","Subir arriba",1,"scroll-top",3,"click"],[1,"scroll-top-icon"],["class","welcome unavailable",4,"ngIf","ngIfElse"],[1,"welcome","unavailable"],["src","assets/logo.png","alt","AvenTourArte",1,"welcome-logo"],[1,"slogan"],[1,"welcome"]],template:function(n,a){if(n&1&&O(0,Ew,15,10,"article",2)(1,_w,1,2,"ng-template",null,0,_o)(3,Dw,8,0,"ng-template",null,1,_o),n&2){let o=Co(2);C("ngIf",a.guide)("ngIfElse",o)}},dependencies:[en,$t,mt,em,dl,f0,m0,ff,hf,p0,_0,C0,ul],styles:['[_nghost-%COMP%]{display:block}.guide-page[_ngcontent-%COMP%]{--page-ink: #18212a;--line: rgba(18, 47, 76, .18);--surface: rgba(255, 250, 242, .66);--accent: #123a5a;--accent-soft: #2b83a8;--accent-warm: #c9854d;position:relative;min-height:100vh;color:var(--page-ink);overflow-x:hidden;isolation:isolate}.guide-page[_ngcontent-%COMP%]:before{content:"";position:fixed;inset:0;z-index:-3;background-image:linear-gradient(180deg,#040c126b,#f7efe3b3 46rem),var(--bg-image);background-position:var(--bg-pos, 50% 50%);background-repeat:no-repeat;background-size:var(--bg-size, cover)}.guide-page[_ngcontent-%COMP%]:after{content:"";position:fixed;inset:0;z-index:-2;background-image:var(--flag-image);background-position:center 6rem;background-repeat:no-repeat;background-size:var(--flag-size, 75%);opacity:calc(var(--flag-opacity, .16) * .65);pointer-events:none}.guide-hero[_ngcontent-%COMP%], .guide-content[_ngcontent-%COMP%]{width:min(1180px,100% - 32px);margin-inline:auto}.guide-hero[_ngcontent-%COMP%]{min-height:clamp(480px,62vh,720px);display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,400px);gap:clamp(24px,5vw,72px);align-items:end;padding:clamp(48px,8vw,104px) 0 40px}.hero-copy[_ngcontent-%COMP%]{color:#fff;text-shadow:0 2px 18px rgba(0,0,0,.38);min-width:0;overflow-wrap:anywhere}.eyebrow[_ngcontent-%COMP%]{display:inline-flex;margin-bottom:14px;color:#ffffffdb;font-size:.78rem;font-weight:800;letter-spacing:0;text-transform:uppercase}.city-title[_ngcontent-%COMP%]{max-width:11ch;margin:0;font-size:clamp(3.2rem,8vw,7rem);font-weight:950;line-height:.95;text-wrap:balance}.hero-description[_ngcontent-%COMP%], .section-content[_ngcontent-%COMP%], .card-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{white-space:pre-line}.hero-description[_ngcontent-%COMP%]{max-width:820px;margin:28px 0 0;color:#fffffff0;font-size:clamp(1.05rem,1.4vw,1.24rem);line-height:1.78}.hero-media[_ngcontent-%COMP%]{display:grid;gap:16px;justify-items:end}.city-flag[_ngcontent-%COMP%]{width:min(100%,320px);max-height:190px;object-fit:contain;border:1px solid rgba(255,255,255,.6);border-radius:6px;background:transparent;box-shadow:0 12px 34px #0c172033}.guide-content[_ngcontent-%COMP%]{display:grid;gap:34px;padding-bottom:56px}.guide-tabs[_ngcontent-%COMP%]{position:sticky;top:calc(var(--header-height, 72px) + 10px);z-index:20;display:flex;gap:8px;align-items:center;padding:10px;overflow-x:auto;border:1px solid var(--line);border-radius:8px;background:#fffaf2c7;box-shadow:0 12px 32px #0716261f;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);scrollbar-width:thin}.guide-tab[_ngcontent-%COMP%]{display:inline-flex;flex:0 0 auto;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:8px 14px;border:1px solid transparent;border-radius:8px;color:#2b3a45;background:#ffffff6b;font:inherit;font-size:.94rem;font-weight:800;line-height:1.1;cursor:pointer;transition:color .18s ease,background .18s ease,border-color .18s ease,transform .18s ease}.guide-tab[_ngcontent-%COMP%]:hover, .guide-tab.active[_ngcontent-%COMP%]{color:#fffaf2;border-color:#ffffff75;background:linear-gradient(145deg,#123a5afa,#2b83a8e6);box-shadow:inset 0 -10px 18px #0716262e}.guide-tab[_ngcontent-%COMP%]:hover{transform:translateY(-1px)}.guide-tab[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:20px;height:20px;font-size:20px}.guide-tab-panel[_ngcontent-%COMP%]{display:grid;gap:34px}.guide-section[_ngcontent-%COMP%], app-info-general[_ngcontent-%COMP%]{display:block;border:1px solid var(--line);border-radius:8px;background:var(--surface);box-shadow:0 14px 38px #0716261f;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}.guide-section[_ngcontent-%COMP%]{padding:clamp(20px,3vw,34px)}.section-heading[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;align-items:start;margin-bottom:18px}.section-icon[_ngcontent-%COMP%]{display:grid;place-items:center;width:46px;height:46px;border-radius:8px;color:#fffaf2;border:1px solid rgba(255,255,255,.34);background:linear-gradient(145deg,#123a5af5,#2b83a8e0);box-shadow:inset 0 -10px 18px #07162638,0 10px 24px #0716262e;transform:rotate(-3deg)}.section-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:24px;height:24px;font-size:24px;transform:rotate(3deg)}.section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:clamp(1.75rem,3vw,2.65rem);font-weight:900;line-height:1.08;text-wrap:balance}.section-content[_ngcontent-%COMP%]{max-width:900px;margin:0 0 26px;color:#31404c;font-size:1.06rem;line-height:1.78}.card-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,310px),1fr));gap:22px}.item-card[_ngcontent-%COMP%], .zone-card[_ngcontent-%COMP%]{overflow:hidden;border:1px solid var(--line);border-radius:8px;background:#fffaf2ad;box-shadow:0 12px 30px #0716261a;-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);min-width:0}.item-card[_ngcontent-%COMP%]{display:grid;align-content:start;grid-template-rows:auto auto 1fr auto}.zone-card[_ngcontent-%COMP%]{max-width:920px;margin:0 auto 22px}.card-copy[_ngcontent-%COMP%]{padding:18px 18px 10px;position:relative;z-index:1;min-width:0;background:#fffaf2b8}.card-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .lugar-nombre[_ngcontent-%COMP%]{margin:0 0 12px;font-size:1.28rem;font-weight:850;line-height:1.22;text-wrap:balance}.card-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#34424e;font-size:.98rem;line-height:1.66}.image-frame[_ngcontent-%COMP%]{display:grid;place-items:center;margin:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:linear-gradient(135deg,#123a5a14,#c9854d14),#f7f5f0b8;overflow:hidden}.image-frame[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;width:100%;height:100%;min-width:0;min-height:0;object-fit:contain}.item-image[_ngcontent-%COMP%]{min-height:260px;aspect-ratio:4/3;border-top:0}.zone-image[_ngcontent-%COMP%]{min-height:320px;aspect-ratio:16/10}.photo-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:14px}.photo-grid.compact[_ngcontent-%COMP%]{grid-template-columns:1fr;padding-top:4px}.photo-grid[_ngcontent-%COMP%]   .image-frame[_ngcontent-%COMP%]{min-height:230px;aspect-ratio:4/3;border:1px solid var(--line);border-radius:8px;overflow:hidden}.detail-list[_ngcontent-%COMP%]{display:grid;gap:10px;padding:14px 18px 18px;border-top:1px solid var(--line);background:linear-gradient(180deg,#f7faf961,#fffaf28f)}.info-line[_ngcontent-%COMP%]{display:grid;grid-template-columns:28px minmax(0,1fr);gap:10px;align-items:start;margin:0;color:#34424e;font-size:.95rem;line-height:1.45}.info-line[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:24px;height:24px;color:var(--accent-soft);font-size:21px}.info-line[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;color:#17222c;font-size:.75rem;font-weight:850;text-transform:uppercase}[_nghost-%COMP%]     .mat-expansion-panel{border:1px solid var(--line);border-radius:8px!important;box-shadow:none!important;overflow:hidden}[_nghost-%COMP%]     .mat-expansion-panel-header-title{color:var(--page-ink);font-weight:850;white-space:normal}.scroll-top[_ngcontent-%COMP%]{position:fixed;right:18px;bottom:calc(var(--footer-height) + 14px + env(safe-area-inset-bottom));z-index:50;display:grid;place-items:center;width:50px;height:50px;border-radius:999px;color:#fff;background:linear-gradient(135deg,#2f9bc1,#47b574);box-shadow:0 10px 24px #00000047;cursor:pointer;transition:transform .18s ease,background .18s ease;animation:_ngcontent-%COMP%_floatTravel 3s ease-in-out infinite}.scroll-top[_ngcontent-%COMP%]:hover{transform:translateY(-6px) scale(1.06);background:linear-gradient(135deg,#2f9bc1,#47b574)}.scroll-top-icon[_ngcontent-%COMP%]{font-size:26px;transition:transform .25s ease}.scroll-top[_ngcontent-%COMP%]:hover   .scroll-top-icon[_ngcontent-%COMP%]{transform:rotate(-18deg) translateY(-1px)}@keyframes _ngcontent-%COMP%_floatTravel{0%{transform:translateY(0)}50%{transform:translateY(-4px)}to{transform:translateY(0)}}.welcome[_ngcontent-%COMP%]{min-height:calc(100vh - var(--footer-height));display:grid;place-items:center;align-content:center;gap:10px;padding:48px 20px;text-align:center;color:#17222c;background:linear-gradient(180deg,#ffffffbf,#f7f5f0f5),url(/assets/logo.png) center/min(70vw,520px) no-repeat}.welcome-logo[_ngcontent-%COMP%]{width:min(210px,56vw);border-radius:8px;box-shadow:0 18px 50px #0c172029}.welcome[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:16px 0 0;font-size:clamp(2rem,5vw,4rem);line-height:1}.slogan[_ngcontent-%COMP%]{margin:0;color:#5f6b76;font-size:1.05rem}@media (max-width: 820px){.guide-page[_ngcontent-%COMP%]:before{background-position:var(--bg-pos-mobile, var(--bg-pos, 50% 50%));background-size:var(--bg-size-mobile, var(--bg-size, cover))}.guide-page[_ngcontent-%COMP%]:after{opacity:calc(var(--flag-opacity-mobile, var(--flag-opacity, .16)) * .45);background-size:var(--flag-size-mobile, var(--flag-size, 95%))}.guide-hero[_ngcontent-%COMP%]{min-height:auto;grid-template-columns:1fr;gap:24px;padding:56px 0 28px}.city-title[_ngcontent-%COMP%]{max-width:100%;font-size:clamp(2.55rem,16vw,4.6rem);overflow-wrap:anywhere}.hero-description[_ngcontent-%COMP%]{margin-top:18px;font-size:1rem;line-height:1.62}.hero-media[_ngcontent-%COMP%]{justify-items:start}.city-flag[_ngcontent-%COMP%]{width:min(260px,100%)}.guide-content[_ngcontent-%COMP%], .guide-hero[_ngcontent-%COMP%]{width:min(1180px,100% - 24px)}.guide-section[_ngcontent-%COMP%]{padding:18px 14px}.guide-tabs[_ngcontent-%COMP%]{top:calc(var(--header-height, 64px) + 8px);gap:6px;padding:8px}.guide-tab[_ngcontent-%COMP%]{min-height:40px;padding:8px 10px;font-size:.86rem}.card-grid[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:16px}.item-card[_ngcontent-%COMP%], .zone-card[_ngcontent-%COMP%]{display:flex;flex-direction:column}.item-image[_ngcontent-%COMP%], .zone-image[_ngcontent-%COMP%]{order:2}.card-copy[_ngcontent-%COMP%]{order:1;padding:16px 14px 12px}.photo-grid[_ngcontent-%COMP%], .detail-list[_ngcontent-%COMP%]{order:3}.section-heading[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:6px}.photo-grid[_ngcontent-%COMP%]{grid-template-columns:1fr;padding:12px}.item-image[_ngcontent-%COMP%], .zone-image[_ngcontent-%COMP%], .photo-grid[_ngcontent-%COMP%]   .image-frame[_ngcontent-%COMP%]{min-height:0;max-height:62vh}.item-image[_ngcontent-%COMP%], .photo-grid[_ngcontent-%COMP%]   .image-frame[_ngcontent-%COMP%]{aspect-ratio:4/3}.zone-image[_ngcontent-%COMP%]{aspect-ratio:16/10}.card-copy[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .lugar-nombre[_ngcontent-%COMP%]{font-size:1.16rem;line-height:1.24;overflow-wrap:anywhere}.card-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .section-content[_ngcontent-%COMP%]{font-size:.96rem;line-height:1.58;overflow-wrap:anywhere}[_nghost-%COMP%]     .mat-expansion-panel-body{padding:0 12px 16px}}@media (max-width: 430px){.guide-content[_ngcontent-%COMP%], .guide-hero[_ngcontent-%COMP%]{width:min(1180px,100% - 16px)}.guide-section[_ngcontent-%COMP%]{padding:14px 10px}.guide-tab[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{max-width:10.5rem;overflow-wrap:anywhere}.section-icon[_ngcontent-%COMP%]{width:40px;height:40px}.section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:clamp(1.45rem,9vw,2rem)}.photo-grid[_ngcontent-%COMP%]{padding:10px}}']})};var Iw=e=>e.length<2||e[0].path!=="guia"?null:{consumed:e,posParams:{guidePath:new $n(e.slice(1).map(t=>t.path).join("/"),{})}},N0=[{path:"",pathMatch:"full",component:mi},{matcher:Iw,component:mi}];pm(el,{providers:[ts(mm),Qm(N0)]}).catch(e=>console.error(e));
