(function(e,t){typeof define=="function"&&define.amd?define("src/map/IChoropleth",["../common/Palette"],t):e.map_IChoropleth=t(e.common_Palette,e.usStates,e.usCounties)})(this,function(e,t,n){function r(){}return r.prototype._palette=e.rainbow("default"),r.prototype.click=function(e,t,n){console.log("Click:  "+JSON.stringify(e)+", "+t+", "+n)},r}),define("css!src/map/Choropleth",[],function(){}),function(e,t){typeof define=="function"&&define.amd?define("src/map/Choropleth",["d3","../common/SVGWidget","./IChoropleth","../common/Utility","../api/ITooltip","css!./Choropleth"],t):e.map_Choropleth=t(e.d3,e.common_SVGWidget,e.map_IChoropleth,e.common_Utility,e.api_ITooltip)}(this,function(e,t,n,r,i){function s(){t.call(this),n.call(this),i.call(this),this._dataMap={},this._dataMinWeight=0,this._dataMaxWeight=0,this._prevTranslate=[0,0],this._prevScale=1}return s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.prototype._class+=" map_Choropleth",s.prototype.implements(n.prototype),s.prototype.implements(i.prototype),s.prototype.publish("paletteID","YlOrRd","set","Palette ID",s.prototype._palette.switch(),{tags:["Basic","Shared"]}),s.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),s.prototype.publish("projection",null,"set","Map projection type",["albersUsaPr","orthographic","mercator"],{tags:["Intermediate","Shared"]}),s.prototype.data=function(e){var n=t.prototype.data.apply(this,arguments);if(arguments.length){this._dataMap={},this._dataMinWeight=null,this._dataMaxWeight=null;var r=this;this.data().forEach(function(e){r._dataMap[e[0]]=e;if(!r._dataMinWeight||e[1]<r._dataMinWeight)r._dataMinWeight=e[1];if(!r._dataMaxWeight||e[1]>r._dataMaxWeight)r._dataMaxWeight=e[1]})}return n},s.prototype.size=function(e){var n=t.prototype.size.apply(this,arguments);return arguments.length&&this._svgZoom&&this._svgZoom.attr("x",-this._size.width/2).attr("y",-this._size.height/2).attr("width",this._size.width).attr("height",this._size.height),n},s.prototype.projection_orig=s.prototype.projection,s.prototype.projection=function(t){var n=s.prototype.projection_orig.apply(this,arguments);if(arguments.length){switch(t){case"albersUsaPr":this.d3Projection=this.albersUsaPr();break;case"orthographic":this.d3Projection=e.geo.orthographic().clipAngle(90);break;case"mercator":this.d3Projection=e.geo.mercator()}this.d3Path=e.geo.path().projection(this.d3Projection)}return n},s.prototype.render=function(){return t.prototype.render.apply(this,arguments),this._renderCount===1&&this.zoomToFit(),this},s.prototype.enter=function(t,n){var i=this;this._svgZoom=n.append("rect").attr("class","zoom").attr("x",-this._size.width/2).attr("y",-this._size.height/2).attr("width",this._size.width).attr("height",this._size.height).on("dblclick",function(t){e.event.stopPropagation(),i.zoomToFit(null,750)});var s=this._parentElement.insert("defs",":first-child"),o=s.append("pattern").attr("id","hash").attr("patternUnits","userSpaceOnUse").attr("width","10").attr("height","10").attr("x",0).attr("y",0).append("g");o.append("rect").attr("class","noFill").attr("x",0).attr("y",0).attr("width",5).attr("height",5),o.append("rect").attr("class","noFill").attr("x",5).attr("y",5).attr("width",5).attr("height",5),this._svg=n.append("g"),this._selection=new r.SimpleSelection(this._svg)},s.prototype.update=function(e,t){this._palette=this._palette.switch(this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id()))},s.prototype.exit=function(e,n){t.prototype.enter.apply(this,arguments),delete this._selection},s.prototype.albersUsaPr=function(){function h(e){var t=e[0],n=e[1];return o=null,(a(t,n),o)||(f(t,n),o)||(l(t,n),o)||(c(t,n),o),o}var t=1e-6,n=e.geo.albers(),r=e.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),i=e.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),s=e.geo.conicEqualArea().rotate([66,0]).center([0,18]).parallels([8,18]),o,u={point:function(e,t){o=[e,t]}},a,f,l,c;return h.invert=function(e){var t=n.scale(),o=n.translate(),u=(e[0]-o[0])/t,a=(e[1]-o[1])/t;return(a>=.12&&a<.234&&u>=-0.425&&u<-0.214?r:a>=.166&&a<.234&&u>=-0.214&&u<-0.115?i:a>=.204&&a<.234&&u>=.32&&u<.38?s:n).invert(e)},h.stream=function(e){var t=n.stream(e),o=r.stream(e),u=i.stream(e),a=s.stream(e);return{point:function(e,n){t.point(e,n),o.point(e,n),u.point(e,n),a.point(e,n)},sphere:function(){t.sphere(),o.sphere(),u.sphere(),a.sphere()},lineStart:function(){t.lineStart(),o.lineStart(),u.lineStart(),a.lineStart()},lineEnd:function(){t.lineEnd(),o.lineEnd(),u.lineEnd(),a.lineEnd()},polygonStart:function(){t.polygonStart(),o.polygonStart(),u.polygonStart(),a.polygonStart()},polygonEnd:function(){t.polygonEnd(),o.polygonEnd(),u.polygonEnd(),a.polygonEnd()}}},h.precision=function(e){return arguments.length?(n.precision(e),r.precision(e),i.precision(e),s.precision(e),h):n.precision()},h.scale=function(e){return arguments.length?(n.scale(e),r.scale(e*.35),i.scale(e),s.scale(e),h.translate(n.translate())):n.scale()},h.translate=function(e){if(!arguments.length)return n.translate();var o=n.scale(),p=+e[0],d=+e[1];return a=n.translate(e).clipExtent([[p-.455*o,d-.238*o],[p+.455*o,d+.238*o]]).stream(u).point,f=r.translate([p-.307*o,d+.201*o]).clipExtent([[p-.425*o+t,d+.12*o+t],[p-.214*o-t,d+.234*o-t]]).stream(u).point,l=i.translate([p-.205*o,d+.212*o]).clipExtent([[p-.214*o+t,d+.166*o+t],[p-.115*o-t,d+.234*o-t]]).stream(u).point,c=s.translate([p+.35*o,d+.224*o]).clipExtent([[p+.32*o,d+.204*o],[p+.38*o,d+.234*o]]).stream(u).point,h},h.scale(1070)},s.prototype.project=function(e,t){var n=this.d3Projection([t,e]),r=this.x()+this._prevTranslate[0],i=this.y()+this._prevTranslate[1];return n[0]*=this._prevScale,n[1]*=this._prevScale,n[0]+=r,n[1]+=i,n},s.prototype.zoomToFit=function(e,t,n){n=n||.9;var r=e?e.getBBox():this._svg.node().getBBox(),i=r.x+r.width/2,s=r.y+r.height/2,o=n/Math.max(r.width/this.width(),r.height/this.height()),u=[-o*i,-o*s];this._prevTranslate=u,this._prevScale=o,(t?this._svg.transition().duration(t):this._svg).attr("transform","translate("+u+")scale("+o+")")},s}),!function(){function t(e,t){function u(t){var n=e.arcs[t<0?~t:t],r=n[0],i;return e.transform?(i=[0,0],n.forEach(function(e){i[0]+=e[0],i[1]+=e[1]})):i=n[n.length-1],t<0?[i,r]:[r,i]}function a(e,t){for(var r in e){var i=e[r];delete t[i.start],delete i.start,delete i.end,i.forEach(function(e){n[e<0?~e:e]=1}),s.push(i)}}var n={},r={},i={},s=[],o=-1;return t.forEach(function(n,r){var i=e.arcs[n<0?~n:n],s;i.length<3&&!i[1][0]&&!i[1][1]&&(s=t[++o],t[o]=n,t[r]=s)}),t.forEach(function(e){var t=u(e),n=t[0],s=t[1],o,a;if(o=i[n]){delete i[o.end],o.push(e),o.end=s;if(a=r[s]){delete r[a.start];var f=a===o?o:o.concat(a);r[f.start=o.start]=i[f.end=a.end]=f}else r[o.start]=i[o.end]=o}else if(o=r[s]){delete r[o.start],o.unshift(e),o.start=n;if(a=i[n]){delete i[a.end];var l=a===o?o:a.concat(o);r[l.start=a.start]=i[l.end=o.end]=l}else r[o.start]=i[o.end]=o}else o=[e],r[o.start=n]=i[o.end=s]=o}),a(i,r),a(r,i),t.forEach(function(e){n[e<0?~e:e]||s.push([e])}),s}function r(e,n,r){var i=[];if(arguments.length>1){var s=[],o;function u(e){var t=e<0?~e:e;(s[t]||(s[t]=[])).push({i:e,g:o})}function a(e){e.forEach(u)}function f(e){e.forEach(a)}function l(e){e.type==="GeometryCollection"?e.geometries.forEach(l):e.type in c&&(o=e,c[e.type](e.arcs))}var c={LineString:a,MultiLineString:f,Polygon:f,MultiPolygon:function(e){e.forEach(f)}};l(n),s.forEach(arguments.length<3?function(e){i.push(e[0].i)}:function(e){r(e[0].g,e[e.length-1].g)&&i.push(e[0].i)})}else for(var h=0,p=e.arcs.length;h<p;++h)i.push(h);return{type:"MultiLineString",arcs:t(e,i)}}function i(e,r){function a(e){e.forEach(function(t){t.forEach(function(t){(i[t=t<0?~t:t]||(i[t]=[])).push(e)})}),s.push(e)}function f(t){return h(u(e,{type:"Polygon",arcs:[t]}).coordinates[0])>0}var i={},s=[],o=[];return r.forEach(function(e){e.type==="Polygon"?a(e.arcs):e.type==="MultiPolygon"&&e.arcs.forEach(a)}),s.forEach(function(e){if(!e._){var t=[],n=[e];e._=1,o.push(t);while(e=n.pop())t.push(e),e.forEach(function(e){e.forEach(function(e){i[e<0?~e:e].forEach(function(e){e._||(e._=1,n.push(e))})})})}}),s.forEach(function(e){delete e._}),{type:"MultiPolygon",arcs:o.map(function(r){var s=[];r.forEach(function(e){e.forEach(function(e){e.forEach(function(e){i[e<0?~e:e].length<2&&s.push(e)})})}),s=t(e,s);if((n=s.length)>1){var o=f(r[0][0]);for(var u=0,a;u<n;++u)if(o===f(s[u])){a=s[0],s[0]=s[u],s[u]=a;break}}return s})}}function s(e,t){return t.type==="GeometryCollection"?{type:"FeatureCollection",features:t.geometries.map(function(t){return o(e,t)})}:o(e,t)}function o(e,t){var n={type:"Feature",id:t.id,properties:t.properties||{},geometry:u(e,t)};return t.id==null&&delete n.id,n}function u(e,t){function i(e,t){t.length&&t.pop();for(var i=r[e<0?~e:e],s=0,o=i.length,u;s<o;++s)t.push(u=i[s].slice()),n(u,s);e<0&&a(t,o)}function s(e){return e=e.slice(),n(e,0),e}function o(e){var t=[];for(var n=0,r=e.length;n<r;++n)i(e[n],t);return t.length<2&&t.push(t[0].slice()),t}function u(e){var t=o(e);while(t.length<4)t.push(t[0].slice());return t}function f(e){return e.map(u)}function l(e){var t=e.type;return t==="GeometryCollection"?{type:t,geometries:e.geometries.map(l)}:t in c?{type:t,coordinates:c[t](e)}:null}var n=m(e.transform),r=e.arcs,c={Point:function(e){return s(e.coordinates)},MultiPoint:function(e){return e.coordinates.map(s)},LineString:function(e){return o(e.arcs)},MultiLineString:function(e){return e.arcs.map(o)},Polygon:function(e){return f(e.arcs)},MultiPolygon:function(e){return e.arcs.map(f)}};return l(t)}function a(e,t){var n,r=e.length,i=r-t;while(i<--r)n=e[i],e[i++]=e[r],e[r]=n}function f(e,t){var n=0,r=e.length;while(n<r){var i=n+r>>>1;e[i]<t?n=i+1:r=i}return n}function l(e){function r(e,n){e.forEach(function(e){e<0&&(e=~e);var r=t[e];r?r.push(n):t[e]=[n]})}function i(e,t){e.forEach(function(e){r(e,t)})}function s(e,t){e.type==="GeometryCollection"?e.geometries.forEach(function(e){s(e,t)}):e.type in o&&o[e.type](e.arcs,t)}var t={},n=e.map(function(){return[]}),o={LineString:r,MultiLineString:i,Polygon:i,MultiPolygon:function(e,t){e.forEach(function(e){i(e,t)})}};e.forEach(s);for(var u in t)for(var a=t[u],l=a.length,c=0;c<l;++c)for(var h=c+1;h<l;++h){var p=a[c],d=a[h],v;(v=n[p])[u=f(v,d)]!==d&&v.splice(u,0,d),(v=n[d])[u=f(v,p)]!==p&&v.splice(u,0,p)}return n}function c(e,t){function s(e){i.remove(e),e[1][2]=t(e),i.push(e)}var n=m(e.transform),r=g(e.transform),i=v();return t||(t=p),e.arcs.forEach(function(e){var o=[],u=0,a;for(var f=0,l=e.length,c;f<l;++f)c=e[f],n(e[f]=[c[0],c[1],Infinity],f);for(var f=1,l=e.length-1;f<l;++f)a=e.slice(f-1,f+2),a[1][2]=t(a),o.push(a),i.push(a);for(var f=0,l=o.length;f<l;++f)a=o[f],a.previous=o[f-1],a.next=o[f+1];while(a=i.pop()){var h=a.previous,p=a.next;a[1][2]<u?a[1][2]=u:u=a[1][2],h&&(h.next=p,h[2]=a[2],s(h)),p&&(p.previous=h,p[0]=a[0],s(p))}e.forEach(r)}),e}function h(e){var t=-1,n=e.length,r,i=e[n-1],s=0;while(++t<n)r=i,i=e[t],s+=r[0]*i[1]-r[1]*i[0];return s*.5}function p(e){var t=e[0],n=e[1],r=e[2];return Math.abs((t[0]-r[0])*(n[1]-t[1])-(t[0]-n[0])*(r[1]-t[1]))}function d(e,t){return e[1][2]-t[1][2]}function v(){function r(e,n){while(n>0){var r=(n+1>>1)-1,i=t[r];if(d(e,i)>=0)break;t[i._=n]=i,t[e._=n=r]=e}}function i(e,r){for(;;){var i=r+1<<1,s=i-1,o=r,u=t[o];s<n&&d(t[s],u)<0&&(u=t[o=s]),i<n&&d(t[i],u)<0&&(u=t[o=i]);if(o===r)break;t[u._=r]=u,t[e._=r=o]=e}}var e={},t=[],n=0;return e.push=function(e){return r(t[e._=n]=e,n++),n},e.pop=function(){if(n<=0)return;var e=t[0],r;return--n>0&&(r=t[n],i(t[r._=0]=r,0)),e},e.remove=function(e){var s=e._,o;if(t[s]!==e)return;return s!==--n&&(o=t[n],(d(o,e)<0?r:i)(t[o._=s]=o,s)),s},e}function m(e){if(!e)return y;var t,n,r=e.scale[0],i=e.scale[1],s=e.translate[0],o=e.translate[1];return function(e,u){u||(t=n=0),e[0]=(t+=e[0])*r+s,e[1]=(n+=e[1])*i+o}}function g(e){if(!e)return y;var t,n,r=e.scale[0],i=e.scale[1],s=e.translate[0],o=e.translate[1];return function(e,u){u||(t=n=0);var a=(e[0]-s)/r|0,f=(e[1]-o)/i|0;e[0]=a-t,e[1]=f-n,t=a,n=f}}function y(){}var e={version:"1.6.19",mesh:function(e){return u(e,r.apply(this,arguments))},meshArcs:r,merge:function(e){return u(e,i.apply(this,arguments))},mergeArcs:i,feature:s,neighbors:l,presimplify:c};typeof define=="function"&&define.amd?define("topojson",e):typeof module=="object"&&module.exports?module.exports=e:this.topojson=e}(),function(e,t){typeof define=="function"&&define.amd?define("src/map/ChoroplethCounties",["d3","./Choropleth","topojson","./us-counties"],t):e.map_ChoroplethCounties=t(e.d3,e.map_Choropleth,e.topojson,e.map_usCounties)}(this,function(e,t,n,r){function i(){t.call(this),this.projection("albersUsaPr")}return i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.prototype._class+=" map_ChoroplethCounties",i.prototype.enter=function(i,s){t.prototype.enter.apply(this,arguments),s.classed("map_Choropleth",!0);var o=this._svg.selectAll("path").data(n.feature(r.topology,r.topology.objects.counties).features),u=this;this.choroPaths=o.enter().append("path").call(this._selection.enter.bind(this._selection)).on("click",function(e){u._dataMap[e.id]&&u.click(u.rowToObj(u._dataMap[e.id]),"weight",u._selection.selected(this))}).on("dblclick",function(t){e.event.stopPropagation(),u.zoomToFit(u.active===this?null:this,750),u.active=this}).on("mouseover.tooltip",function(e){u.tooltipShow([r.countyNames[e.id],u._dataMap[e.id]?u._dataMap[e.id][1]:"N/A"],u.columns(),1)}).on("mouseout.tooltip",function(e){u.tooltipShow()}).on("mousemove.tooltip",function(e){u.tooltipShow([r.countyNames[e.id],u._dataMap[e.id]?u._dataMap[e.id][1]:"N/A"],u.columns(),1)})},i.prototype.update=function(e,n){t.prototype.update.apply(this,arguments);var r=this;this.choroPaths.attr("d",this.d3Path).style("fill",function(e){var t=r._dataMap[e.id]?r._dataMap[e.id][1]:undefined;return t===undefined?"url(#hash)":r._palette(t,r._dataMinWeight,r._dataMaxWeight)})},i}),function(e,t){typeof define=="function"&&define.amd?define("src/map/ChoroplethCountries",["d3","./Choropleth","topojson","./countries"],t):e.map_ChoroplethCountries=t(e.d3,e.map_Choropleth,e.topojson,e.map_countries)}(this,function(e,t,n,r){function i(){t.call(this),this._dataMap={},this._dataMaxWeight=0,this._dataMinWeight=0,this.projection(this.worldProjection())}return i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.prototype._class+=" map_ChoroplethCountries",i.prototype.publish("worldProjection","mercator","set","Map Projection",["mercator","orthographic"],{tags:["Private"]}),i.prototype.data=function(e){var n=t.prototype.data.apply(this,arguments);if(arguments.length){this._dataMap={},this._dataMinWeight=null,this._dataMaxWeight=null;var r=this;this.data().forEach(function(e){r._dataMap[e.country]=e.weight;if(!r._dataMinWeight||e.weight<r._dataMinWeight)r._dataMinWeight=e.weight;if(!r._dataMaxWeight||e.weight>r._dataMaxWeight)r._dataMaxWeight=e.weight})}return n},i.prototype.enter=function(i,s){t.prototype.enter.apply(this,arguments),s.classed("map_Choropleth",!0),this.projection(this.worldProjection());var o=this;this.lookup={};var u=n.feature(r.topology,r.topology.objects.countries).features.map(function(e){return e.category="Country",r.countryNames[e.id]&&(e.name=r.countryNames[e.id].name,o.lookup[e.name]=e),e}),a=this._svg.selectAll("path").data(u);this.choroPaths=a.enter().append("path").attr("d",this.d3Path).call(this._selection.enter.bind(this._selection)).on("click",function(e){if(o._dataMap[e.id]){var t=[e.id,o._dataMap[e.id],e.name];o.click(o.rowToObj(t),"weight",o._selection.selected(this))}}).on("dblclick",function(t){e.event.stopPropagation(),o.zoomToFit(o.active===this?null:this,750),o.active=this}).on("mouseover.tooltip",function(e){o._dataMap[e.id]&&o.tooltipShow([e.name,o._dataMap[e.id]],o.columns(),1)}).on("mouseout.tooltip",function(e){o.tooltipShow()}).on("mousemove.tooltip",function(e){o._dataMap[e.id]&&o.tooltipShow([e.name,o._dataMap[e.id]],o.columns(),1)}).attr("id",function(e){return e.id})},i.prototype.update=function(e,n){t.prototype.update.apply(this,arguments),this.projection(this.worldProjection());var r=this;this.transition.apply(this.choroPaths).style("fill",function(e){var t=e.id,n=r._dataMap[t];return n===undefined?"url(#hash)":r._palette(n,r._dataMinWeight,r._dataMaxWeight)})},i}),function(e,t){typeof define=="function"&&define.amd?define("src/map/ChoroplethStates",["d3","./Choropleth","topojson","./us-states"],t):e.map_ChoroplethStates=t(e.d3,e.map_Choropleth,e.topojson,e.map_usStates)}(this,function(e,t,n,r){function i(){t.call(this),this.projection("albersUsaPr")}return i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.prototype._class+=" map_ChoroplethStates",i.prototype.enter=function(i,s){t.prototype.enter.apply(this,arguments),s.classed("map_Choropleth",!0);var o=this._svg.selectAll("path").data(n.feature(r.topology,r.topology.objects.states).features),u=this;this.choroPaths=o.enter().append("path").call(this._selection.enter.bind(this._selection)).on("click",function(e){var t=r.stateNames[e.id].code;u._dataMap[t]&&u.click(u.rowToObj(u._dataMap[t]),"weight",u._selection.selected(this))}).on("dblclick",function(t){e.event.stopPropagation(),u.zoomToFit(u.active===this?null:this,750),u.active=this}).on("mouseover.tooltip",function(e){var t=r.stateNames[e.id].code;u.tooltipShow([r.stateNames[e.id].name,u._dataMap[t]?u._dataMap[t][1]:"N/A"],u.columns(),1)}).on("mouseout.tooltip",function(e){u.tooltipShow()}).on("mousemove.tooltip",function(e){var t=r.stateNames[e.id].code;u.tooltipShow([r.stateNames[e.id].name,u._dataMap[t]?u._dataMap[t][1]:"N/A"],u.columns(),1)})},i.prototype.update=function(e,n){t.prototype.update.apply(this,arguments);var i=this;this.choroPaths.attr("d",this.d3Path).style("fill",function(e){var t=r.stateNames[e.id].code,n=i._dataMap[t]?i._dataMap[t][1]:undefined;return n===undefined?"url(#hash)":i._palette(n,i._dataMinWeight,i._dataMaxWeight)})},i}),function(e,t){typeof define=="function"&&define.amd?define("src/map/ChoroplethStatesHeat",["../layout/Layered"],t):e.map_ChoroplethStatesHeat=t(e.layout_Layered)}(this,function(e){function t(t){e.call(this)}return t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.prototype._class+=" map_ChoroplethStatesHeat",t}),define("css!src/map/GMap",[],function(){}),function(e,t){if(typeof define=="function"&&define.amd){var n=window.location.protocol!=="https"?"http://":"https://";define("src/map/GMap",["d3","../common/HTMLWidget","../layout/AbsoluteSurface","async!"+n+"maps.google.com/maps/api/js","css!./GMap"],t)}else e.map_GMap=t(e.d3,e.common_HTMLWidget,e.layout_AbsoluteSurface)}(this,function(e,t,n){function r(e,t,n){google.maps.OverlayView.call(this),this._div=null,this._worldSurface=t,this._viewportSurface=n,this._map=e,this.setMap(e);var r=this;google.maps.event.addListener(e,"bounds_changed",function(){r.draw()}),google.maps.event.addListener(e,"projection_changed",function(){r.draw()}),this._prevWorldMin={x:0,y:0},this._prevWorldMax={x:0,y:0},this._prevMin={x:0,y:0},this._prevMax={x:0,y:0}}function i(){t.call(this),this._tag="div";var e=this;this._worldSurface=new n,this._worldSurface.project=function(t,n){var r=e._overlay.getProjection(),i=r.fromLatLngToDivPixel(new google.maps.LatLng(t,n));return i.x-=this.widgetX(),i.y-=this.widgetY(),i},this._viewportSurface=new n,this._viewportSurface.project=function(t,n){var r=e._overlay.getProjection(),i=r.fromLatLngToDivPixel(new google.maps.LatLng(t,n));return i.x-=this.widgetX(),i.y-=this.widgetY(),i}}return r.prototype=google.maps.OverlayView.prototype,r.prototype.onAdd=function(){this.div=document.createElement("div"),this._viewportSurface.target(this.div).units("pixels");var e=this.getPanes();e.overlayLayer.appendChild(this.div)},r.prototype.draw=function(){var e=this.getProjection();if(!e)return;var t=this._map.getBounds(),n=e.fromLatLngToDivPixel(t.getCenter()),r=e.fromLatLngToDivPixel(t.getSouthWest()),i=e.fromLatLngToDivPixel(t.getNorthEast()),s={x:r.x,y:i.y},o={x:i.x,y:r.y},u=e.getWorldWidth();while(o.x<s.x+100)o.x+=u;while(s.x>n.x)s.x-=u,o.x-=u;if(s.x!==this._prevMin.x||s.y!==this._prevMin.y||o.x!==this._prevMax.x||o.y!==this._prevMax.y)this._viewportSurface.widgetX(s.x).widgetY(s.y).widgetWidth(o.x-s.x).widgetHeight(o.y-s.y).render(),this._prevMin=s,this._prevMax=o;var a=e.fromLatLngToDivPixel(new google.maps.LatLng(85,-179.9)),f=e.fromLatLngToDivPixel(new google.maps.LatLng(-85,179.9));while(f.x<a.x+100)f.x+=u;while(a.x>n.x)a.x-=u,f.x-=u;if(a.x!==this._prevWorldMin.x||a.y!==this._prevWorldMin.y||f.x!==this._prevWorldMax.x||f.y!==this._prevWorldMax.y)this._worldSurface.widgetX(a.x).widgetY(a.y).widgetWidth(f.x-a.x).widgetHeight(f.y-a.y).render(),this._prevWorldMin=f,this._prevWorldMax=f},r.prototype.onRemove=function(){this._viewportSurface.target(null),this._div.parentNode.removeChild(this._div),this._div=null},i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.prototype._class+=" map_GMap",i.prototype.publish("type","road","set","Map Type",["terrain","road","satellite","hybrid"],{tags:["Basic"]}),i.prototype.publish("centerLat",42.877742,"number","Center Latitude",null,{tags:["Basic"]}),i.prototype.publish("centerLong",-97.380979,"number","Center Longtitude",null,{tags:["Basic"]}),i.prototype.publish("zoom",4,"number","Zoom Level",null,{tags:["Basic"]}),i.prototype.publish("panControl",!0,"boolean","Pan Controls",null,{tags:["Basic"]}),i.prototype.publish("zoomControl",!0,"boolean","Pan Controls",null,{tags:["Basic"]}),i.prototype.publish("mapTypeControl",!1,"boolean","Pan Controls",null,{tags:["Basic"]}),i.prototype.publish("scaleControl",!0,"boolean","Pan Controls",null,{tags:["Basic"]}),i.prototype.publish("streetViewControl",!1,"boolean","Pan Controls",null,{tags:["Basic"]}),i.prototype.publish("overviewMapControl",!1,"boolean","Pan Controls",null,{tags:["Basic"]}),i.prototype.data=function(e){var n=t.prototype.data.apply(this,arguments);return n},i.prototype.getMapType=function(){switch(this.type()){case"terrain":return google.maps.MapTypeId.TERRAIN;case"road":return google.maps.MapTypeId.ROADMAP;case"satellite":return google.maps.MapTypeId.SATELLITE;case"hybrid":return google.maps.MapTypeId.HYBRID;default:return google.maps.MapTypeId.ROADMAP}},i.prototype.getMapOptions=function(){return{panControl:this.panControl(),zoomControl:this.zoomControl(),mapTypeControl:this.mapTypeControl(),scaleControl:this.scaleControl(),streetViewControl:this.streetViewControl(),overviewMapControl:this.overviewMapControl(),overviewMapControlOptions:{opened:!0}}},i.prototype.size=function(e){var n=t.prototype.size.apply(this,arguments);return arguments.length&&this._googleMapNode&&(this._googleMapNode.style({width:e.width+"px",height:e.height+"px"}),google.maps.event.trigger(this._googleMap,"resize")),n},i.prototype.enter=function(n,i){t.prototype.enter.apply(this,arguments),this._googleMapNode=i.append("div").style({width:this.width()+"px",height:this.height()+"px"}),this._googleMap=new google.maps.Map(this._googleMapNode.node(),{zoom:this.zoom(),center:new google.maps.LatLng(this.centerLat(),this.centerLong()),mapTypeId:this.getMapType(),disableDefaultUI:!0}),this._overlay=new r(this._googleMap,this._worldSurface,this._viewportSurface),this._circleMap=e.map([]),this._pinMap=e.map([]),this._prevCenterLat=this.centerLat(),this._prevCenterLong=this.centerLong(),this._prevZoom=this.zoom()},i.prototype.update=function(e,t){this._googleMap.setMapTypeId(this.getMapType()),this._googleMap.setOptions(this.getMapOptions());if(this._prevCenterLat!==this.centerLat()||this._prevCenterLong!==this.centerLong())this._googleMap.setCenter(new google.maps.LatLng(this.centerLat(),this.centerLong())),this._prevCenterLat=this.centerLat(),this._prevCenterLong=this.centerLong();this._prevZoom!==this.zoom()&&(this._googleMap.setZoom(this.zoom()),this._prevZoom=this.zoom()),this.updateCircles(),this.updatePins()},i.prototype.updateCircles=function(){function t(e){return e[0]+"_"+e[1]}var n=[],r=[],i=e.map(this._circleMap.keys(),function(e){return e});this.data().forEach(function(e){i.remove(t(e)),e[3]&&!this._circleMap.has(t(e))?n.push(e):e[3]&&this._circleMap.has(t(e))?r.push(e):!e[3]&&this._circleMap.has(t(e))&&i.set(t(e),!0)},this),n.forEach(function(e){var n=this.createCircle(e[0],e[1],e[3],"");this._circleMap.set(t(e),n)},this),r.forEach(function(e){},this);var s=this;i.forEach(function(e){s._circleMap.get(e).setMap(null),s._circleMap.remove(e)})},i.prototype.updatePins=function(){function t(e){return e[0]+"_"+e[1]}var n=[],r=[],i=e.map(this._pinMap.keys(),function(e){return e});this.data().forEach(function(e){i.remove(t(e)),e[2]&&!this._pinMap.has(t(e))?n.push(e):e[2]&&this._pinMap.has(t(e))?r.push(e):!e[2]&&this._pinMap.has(t(e))&&i.set(t(e),!0)},this),n.forEach(function(e){var n=this.createMarker(e[0],e[1],e[2],"");this._pinMap.set(t(e),n)},this),r.forEach(function(e){this._pinMap.get(t(e)).setIcon(this.createIcon(e[2]))},this);var s=this;i.forEach(function(e){s._pinMap.get(e).setMap(null),s._pinMap.remove(e)})},i.prototype.createIcon=function(e){return{path:"M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30",fillColor:e.fillColor,fillOpacity:e.fillOpacity||.8,scale:.5,strokeColor:e.strokeColor||"black",strokeWeight:.25}},i.prototype.createMarker=function(e,t,n){return new google.maps.Marker({position:new google.maps.LatLng(e,t),animation:google.maps.Animation.DROP,title:n.title||"",icon:this.createIcon(n),map:this._googleMap})},i.prototype.createCircle=function(e,t,n){return new google.maps.Circle({center:new google.maps.LatLng(e,t),radius:16093*n.radius/10,fillColor:n.fillColor||"red",strokeColor:n.strokeColor||n.fillColor||"black",strokeWeight:.5,map:this._googleMap})},i.prototype.zoomTo=function(e){var t=0,n=new google.maps.LatLngBounds;return e.forEach(function(e){var r=new google.maps.LatLng(e[0],e[1]);n.extend(r),++t}),t&&(this._googleMap.setCenter(n.getCenter()),this._googleMap.fitBounds(n),this._googleMap.getZoom()>12&&this._googleMap.setZoom(12)),this},i.prototype.zoomToFit=function(){return this.zoomTo(this.data())},i}),function(e,t){typeof define=="function"&&define.amd?define("src/map/GMapGraph",["./GMap","../graph/Graph","../graph/Edge","../common/Shape"],t):e.map_GMapGraph=t(e.map_GMap,e.graph_Graph,e.graph_Edge,e.common_Shape)}(this,function(e,t,n,r){function i(){e.call(this)}return i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.prototype._class+=" map_GMapGraph",i.prototype.enter=function(){e.prototype.enter.apply(this,arguments);var i=(new t).layout("None"),s=i.render,o=this;i.render=function(){var e=[],t=[],i=null;o.data().forEach(function(s){var u=o._viewportSurface.project(s[0],s[1]),a=(new r).shape("circle").radius(3).data(s).pos(u);e.push(a),i&&t.push((new n).sourceVertex(i).targetVertex(a).targetMarker("arrowHead")),i=a}),this.data({vertices:e,edges:t}),s.apply(this,arguments),this.graphData.nodeValues().forEach(function(e){var t=o._viewportSurface.project(e.data()[0],e.data()[1]);t.x-=o.width()/2,t.y-=o.height()/2,e.move(t)}),this.graphData.edgeValues().forEach(function(e){e.points([])})},this._viewportSurface.widget(i)},i}),function(e,t){typeof define=="function"&&define.amd?define("src/map/GMapHeat",["./GMap","../other/HeatMap"],t):e.map_GMapHeat=t(e.map_GMap,e.other_HeatMap)}(this,function(e,t){function n(){e.call(this)}return n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n.prototype._class+=" map_GMapHeat",n.prototype.enter=function(){e.prototype.enter.apply(this,arguments);var n=new t,r=n.render,i=this;n.render=function(){this.data(i.data().map(function(e){var t=i._viewportSurface.project(e[0],e[1]);return[t.x,t.y,e[4]]})),r.apply(this,arguments)},this._viewportSurface.widget(n)},n}),function(e,t){typeof define=="function"&&define.amd?define("src/map/TestHeatMap",["../layout/Layered","../layout/AbsoluteSurface","./ChoroplethStates","../other/HeatMap"],t):e.map_TestHeatMap=t(e.layout_Layered,e.layout_AbsoluteSurface,e.map_ChoroplethStates,e.other_HeatMap)}(this,function(e,t,n,r){function i(t){e.call(this)}return i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.prototype._class+=" map_TestHeatMap",i}),function(e){var t=document,n="appendChild",r="styleSheet",i=t.createElement("style");i.type="text/css",t.getElementsByTagName("head")[0][n](i),i[r]?i[r].cssText=e:i[n](t.createTextNode(e))}(".noFill{fill:#f5f5f5;stroke:none}.map_Choropleth .zoom{stroke:none;fill:none;pointer-events:all}.map_Choropleth path{cursor:pointer;fill:#f5f5f5;stroke:#6d6e71;stroke-width:.125px;stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke}.map_Choropleth path.selected{stroke:red;stroke-width:1.5px}.map_Choropleth path.over{stroke:orange;stroke-width:1.5px}.map_GMap .marker{fill:#656565;stroke:none;stroke-width:1px}.map_GMap .zoom{fill:none;pointer-events:all}.gm-style img{max-width:none}.gm-style label{width:auto;display:inline}"),define("hpcc-viz-map",function(){});