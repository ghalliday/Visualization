(function(e,t){typeof define=="function"&&define.amd?define(["require"],t):e.other_Persist=t(e.require)})(this,function(e){return{discover:function(e){var t=[],n=e._id===undefined;for(var r in e)if(r.indexOf("__meta_")>=0){var i=e,s=i[r];if(s.type)if(!n||s.type!=="proxy"){while(s.type==="proxy")i=i[s.proxy],s=i["__meta_"+s.method];s.id!==e[r].id&&(s=JSON.parse(JSON.stringify(s)),s.id=e[r].id),t.push(s)}}return t},serializeToObject:function(e,t,n){var r={__version:3,__class:e._class.split(" ").pop(),__id:e._id,__properties:{}};t&&t.length?t.forEach.forEach(function(t){e[t.id+"_modified"]()&&(r.__properties[t]=e[t]())}):this.discover(e).forEach(function(t){if(e[t.id+"_modified"]())switch(t.type){case"widget":r.__properties[t.id]=this.serializeToObject(e[t.id](),null,n);break;case"widgetArray":r.__properties[t.id]=[];var i=e[t.id]();i.forEach(function(e,i){r.__properties[t.id].push(this.serializeToObject(e,null,n))},this);break;default:r.__properties[t.id]=e[t.id]()}},this);if(e._class==="marshaller_Graph"){var i=e.data().vertices;i&&(this.__vertices=i.map(function(e){return this.serializeToObject(e,null,n)},this))}return n&&(r.__data={},r.__data.columns=e.columns(),r.__data.data=e.data()),r},serialize:function(e,t,n){return JSON.stringify(this.serializeToObject(e,t,n))},deserialize:function(t,n){var r=this,i="src/"+t.__class.split("_").join("/");e([i],function(e){var i=new e;t instanceof String&&(t=JSON.parse(t)),t.__id.indexOf("_w")!==0&&(i._id=t.__id);var s=0;for(var o in t.__properties)if(i["__meta_"+o])switch(i["__meta_"+o].type){case"widget":++s,r.deserialize(t.__properties[o],function(e){i[o](e),--s});break;case"widgetArray":++s;var u=t.__properties[o],a=[];a.length=u.length;var f=0;u.forEach(function(e,t){++f,r.deserialize(e,function(e){a[t]=e,--f});var n=setInterval(function(){f<=0&&(clearInterval(n),f=undefined,i[o](a),--s)},20)});break;default:i[o](t.__properties[o])}var l=setInterval(function(){if(s<=0){clearInterval(l),s=undefined;if(t.__data)for(var e in t.__data)i[e](t.__data[e]);n(i)}},20)})},create:function(e,t){typeof e=="string"&&(e=JSON.parse(e)),this.deserialize(e,t)},clone:function(e,t){this.create(this.serializeToObject(e,[],!0),t)}}});