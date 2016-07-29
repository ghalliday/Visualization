(function(e,t){typeof define=="function"&&define.amd?define(["d3","es6-promise"],t):(e.require=e.require||function(t,n){typeof t=="function"&&(n=t,t=[]);var r=t.map(function(t){var n=t.indexOf("src/")===0?"src/".length:0,r=t.substring(n).split("/").join("_");return e[r]});n.apply(null,r)},e.common_Platform=t(e.d3))})(this,function(e){function n(){}var t="1.10.10";return n.prototype.version=function(){return t},n.prototype.ieVersion=function(){var e=navigator.userAgent,t,n=e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return/trident/i.test(n[1])?(t=/\brv[ :]+(\d+)/g.exec(e)||[],parseFloat(t[1])):/msie/i.test(n[1])?parseFloat(n[2]):null}(),n.prototype.isIE=n.prototype.ieVersion!==null,n.prototype.svgMarkerGlitch=n.prototype.isIE&&n.prototype.ieVersion<=12,n.prototype.MutationObserver=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver||function(e){this.callback=e,this.listeners=[];var t=function(e,t,n){this.callback=e,this.domNode=t,this.type=n};t.prototype={handleEvent:function(e){var t={type:this.type,target:this.domNode,addedNodes:[],removedNodes:[],previousSibling:e.target.previousSibling,nextSibling:e.target.nextSibling,attributeName:null,attributeNamespace:null,oldValue:null};this.callback([t])}},this.observe=function(e,n){var r=null;n.attributes&&(r=new t(this.callback,e,"attributes"),this.listeners.push(r),e.addEventListener("DOMAttrModified",r,!0)),n.characterData&&(r=new t(this.callback,e,"characterData"),this.listeners.push(r),e.addEventListener("DOMCharacterDataModified",r,!0)),n.childList&&(r=new t(this.callback,e,"childList"),this.listeners.push(r),e.addEventListener("DOMNodeInserted",r,!0),e.addEventListener("DOMNodeRemoved",r,!0))},this.disconnect=function(){this.listeners.forEach(function(e){switch(e.type){case"attributes":e.domNode.removeEventListener("DOMAttrModified",e,!0);break;case"characterData":e.domNode.removeEventListener("DOMCharacterDataModified",e,!0);break;case"childList":e.domNode.removeEventListener("DOMNodeRemoved",e,!0),e.domNode.removeEventListener("DOMNodeInserted",e,!0)}}),this.listeners=[]}},window.MutationObserver||(window.MutationObserver=n.prototype.MutationObserver),n.prototype._scrollBarWidth=null,n.prototype.getScrollbarWidth=function(){if(n.prototype._scrollBarWidth===null){var e=document.createElement("div");e.style.visibility="hidden",e.style.width="100px",e.style.msOverflowStyle="scrollbar",document.body.appendChild(e);var t=e.offsetWidth;e.style.overflow="scroll";var r=document.createElement("div");r.style.width="100%",e.appendChild(r);var i=r.offsetWidth;e.parentNode.removeChild(e),n.prototype._scrollBarWidth=t-i}return n.prototype._scrollBarWidth},n.prototype.debounce=function(e,t,n){return function(){function o(){n||e.apply(i,s),i.timeout=null}var i=this||{},s=arguments;i.timeout?clearTimeout(i.timeout):n&&e.apply(i,s),i.timeout=setTimeout(o,t||100)}},n});