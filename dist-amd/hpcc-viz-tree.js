define("css!src/tree/CirclePacking",[],function(){}),function(e,t){typeof define=="function"&&define.amd?define("src/tree/CirclePacking",["d3","../common/SVGWidget","../api/ITree","../common/Text","../common/FAChar","css!./CirclePacking"],t):e.tree_CirclePacking=t(e.d3,e.common_SVGWidget,e.api_ITree,e.common_Text,e.common_FAChar)}(this,function(e,t,n,r,i){function s(e){t.call(this),n.call(this)}return s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.prototype._class+=" tree_CirclePacking",s.prototype.implements(n.prototype),s.prototype.publish("paletteID","default","set","Palette ID",s.prototype._palette.switch(),{tags:["Basic","Shared"]}),s.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),s.prototype.enter=function(t,n){this.diameter=Math.min(this.width(),this.height()),this.pack=e.layout.pack().size([this.diameter-4,this.diameter-4]).value(function(e){return 1}),this.svg=n.append("g").attr("transform","rotate(30)")},s.prototype.update=function(t,n){var r=this;this._palette=this._palette.switch(this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id())),this.svg.selectAll("circle").remove(),this.svg.selectAll("text").remove();var i=this.data(),s=i,o=this.pack.nodes(i);this.circle=this.svg.selectAll("circle").data(o).enter().append("circle").attr("class",function(e){return e.parent?e.children?"node":"node leaf":"node root"}).style("fill",function(e){return r._palette(e.label)}).on("click",function(e){r.click(e)}).on("dblclick",function(t){s!==t&&r.zoom(t),e.event.stopPropagation()}),this.circle.append("title").text(function(e){return e.label}),this.svg.selectAll("text").data(o).enter().append("text").attr("class","label").style("fill-opacity",function(e){return e.parent===i?1:0}).style("display",function(e){return e.parent===i?null:"none"}).text(function(e){return e.label}),this.node=this.svg.selectAll("circle,text"),this.zoomTo([i.x,i.y,i.r*2])},s.prototype.zoom=function(t){var n=this,r=t;this.svg.selectAll("circle").filter(function(e){return e===r});var i=this.svg.selectAll("text").filter(function(e){return e!==r&&this.style.display==="inline"});i.transition().duration(500).style("opacity",0).each("end",function(t){t!==r&&e.select(this).style("display","none").style("opacity",1)});var s=this.svg.transition().duration(1e3).tween("zoom",function(t){var i=e.interpolateZoom(n.view,[r.x,r.y,r.r*2]);return function(e){n.zoomTo(i(e))}});s.selectAll("text").filter(function(e){return e.parent===r||this.style.display==="inline"}).style("fill-opacity",function(e){return e.parent===r?1:0}).each("start",function(e){e.parent===r&&(this.style.display="inline")}).each("end",function(e){e.parent!==r&&(this.style.display="none")})},s.prototype.zoomTo=function(e){var t=this.diameter/e[2];this.view=e,this.node.attr("transform",function(n){return"translate("+(n.x-e[0])*t+","+(n.y-e[1])*t+")rotate(-30)"}),this.circle.attr("r",function(e){return e.r*t})},s}),define("css!src/tree/Dendrogram",[],function(){}),function(e,t){typeof define=="function"&&define.amd?define("src/tree/Dendrogram",["d3","../common/SVGZoomWidget","../common/PropertyExt","../api/ITree","../common/Utility","css!./Dendrogram"],t):e.tree_Dendrogram=t(e.d3,e.common_SVGZoomWidget,e.common_PropertyExt,e.api_ITree,e.common_Utility)}(this,function(e,t,n,r,i){function s(e){n.call(this),this._owner=e}function o(n){t.call(this),r.call(this),this._drawStartPos="origin";var i=this;this._d3LayoutCluster=e.layout.cluster(),this._d3LayoutTree=e.layout.tree(),this._d3Diagonal=e.svg.diagonal().projection(function(e){return i.orientation()==="horizontal"?[e.y,e.x]:[e.x,e.y]}),this._d3DiagonalRadial=e.svg.diagonal.radial().projection(function(e){return[e.y,e.x/180*Math.PI]})}return s.prototype=Object.create(n.prototype),s.prototype.constructor=s,s.prototype._class+=" tree_Dendrogram.Column",s.prototype.publish("column",null,"set","Field",function(){return this._owner?this._owner.columns():[]},{optional:!0}),o.prototype=Object.create(t.prototype),o.prototype.constructor=o,o.prototype._class+=" tree_Dendrogram",o.prototype.implements(r.prototype),o.prototype.Column=s,o.prototype.publish("paletteID","default","set","Palette ID",o.prototype._palette.switch(),{tags:["Basic","Shared"]}),o.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),o.prototype.publish("mappings",[],"propertyArray","Source Columns",null,{autoExpand:s}),o.prototype.publish("circleRadius",4.5,"number","Text offset from circle"),o.prototype.publish("separation",240,"number","Leaf Separation"),o.prototype.publish("dendrogram",!0,"boolean","Dendrogram"),o.prototype.publish("radial",!1,"boolean","Radial"),o.prototype.publish("orientation","horizontal","set","Orientation",["horizontal","vertical"],{tags:["Private"],disabled:function(){return this.radial()}}),o.prototype.dendrogramData=function(){function n(e){return{label:e.key,children:e.values.filter(function(e){return!(e instanceof Array)}).map(function(e){return n(e)}),origRows:e.values}}if(!this.mappings().filter(function(e){return e.column()}).length)return this.data();var e=this._db.rollupView(this.mappings().map(function(e){return e.column()})),t={key:"root",values:e.entries()};return n(t)},o.prototype.enter=function(e,n){t.prototype.enter.apply(this,arguments),this._renderElement.attr("opacity",0),this._selection=new i.SimpleSelection(this._renderElement)},o.prototype.update=function(n,r,i){function h(e){return s.radial()?"rotate("+(e.x-90)+")translate("+e.y+")":s.orientation()==="horizontal"?"translate("+e.y+","+e.x+")":"translate("+e.x+","+e.y+")"}t.prototype.update.apply(this,arguments);var s=this;this._palette=this._palette.switch(this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id())),this._renderElement.transition().duration(500).attr("opacity",1),this._d3Layout=this.dendrogram()?this._d3LayoutCluster:this._d3LayoutTree,this.radial()?(this._d3Layout.size([360,this.separation()*2]),this._d3Layout.separation(function(t,n){return(t.parent===n.parent?1:2)/t.depth})):(this._d3Layout.nodeSize([14,this.separation()]),this._d3Layout.separation(function(t,n){return t.parent===n.parent?1:2}));var o=this.dendrogramData(),u=this._d3Layout.nodes(o),a=this._d3Layout.links(u),f=this._renderCount?500:0,l=this._renderElement.selectAll(".link").data(a);l.enter().append("path").attr("class","link").attr("d",this.radial()?this._d3DiagonalRadial:this._d3Diagonal),l.transition().duration(f).attr("d",this.radial()?this._d3DiagonalRadial:this._d3Diagonal),l.exit().remove();var c=this.circleRadius()+2,p=this._renderElement.selectAll(".node").data(u);p.transition().duration(f).attr("transform",h),p.enter().append("g").attr("class","node").attr("transform",h).call(this._selection.enter.bind(this._selection)).on("click",function(e){var t=e;while(t.children)t=t.children[0];e.depth>0&&s.click(s.rowToObj(t.origRows[0]),s.mappings()[e.depth-1].column(),!0)}).each(function(t,n){var r=e.select(this);r.append("circle"),r.append("text")}),p.select("circle").attr("r",this.circleRadius()).style("fill",function(e){return s._palette(e.label)}).append("title").text(function(e){return e.label}),p.select("text").attr("dx",function(e){return s.radial()?e.children?e.x<180?-c:c:e.x<180?c:-c:s.orientation()==="vertical"?e.children?c:-c:e.children?-c:c}).attr("dy","0.25em").style("text-anchor",function(e){return s.radial()?e.children?e.x<180?"end":"start":e.x<180?"start":"end":s.orientation()==="vertical"?e.children?"start":"end":e.children?"end":"start"}).attr("transform",function(e){return s.radial()?e.x<180?null:"rotate(180)":s.orientation()==="vertical"?"rotate(-66)":null}).text(function(e){return e.label}),p.exit().remove(),this._renderCount||s.zoomToFit()},o}),define("css!src/tree/SunburstPartition",[],function(){}),function(e,t){typeof define=="function"&&define.amd?define("src/tree/SunburstPartition",["d3","../common/SVGWidget","../api/ITree","../common/Text","../common/FAChar","css!./SunburstPartition"],t):e.tree_SunburstPartition=t(e.d3,e.common_SVGWidget,e.api_ITree,e.common_Text,e.common_FAChar)}(this,function(e,t,n,r,i){function s(e){t.call(this),n.call(this)}return s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.prototype._class+=" tree_SunburstPartition",s.prototype.implements(n.prototype),s.prototype.publish("paletteID","default","set","Palette ID",s.prototype._palette.switch(),{tags:["Basic","Shared"]}),s.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),s.prototype.root=function(e){return arguments.length?(this._root=e,this.svg&&this.svg.selectAll("path").transition().duration(750).attrTween("d",this.arcTweenFunc(this._root)),this):this._root||this.data()},s.prototype.data=function(){var e=t.prototype.data.apply(this,arguments);return arguments.length&&(this._resetRoot=!0),e},s.prototype.enter=function(t,n){var r=this;this.radius=Math.min(this.width(),this.height())/2,this._xScale=e.scale.linear().range([0,2*Math.PI]),this._yScale=e.scale.sqrt().range([0,this.radius]),this.partition=e.layout.partition().value(function(e){return e.value!==undefined?e.value:1}),this.arc=e.svg.arc().startAngle(function(e){return Math.max(0,Math.min(2*Math.PI,r._xScale(e.x)))}).endAngle(function(e){return Math.max(0,Math.min(2*Math.PI,r._xScale(e.x+e.dx)))}).innerRadius(function(e){return Math.max(0,r._yScale(e.y))}).outerRadius(function(e){return Math.max(0,r._yScale(e.y+e.dy))}),this.svg=n.append("g")},s.prototype.update=function(t,n){function s(t){e.event&&e.event.stopPropagation(),r.root(t)}var r=this;this._palette=this._palette.switch(this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id())),this.radius=Math.min(this.width(),this.height())/2,this._xScale.range([0,2*Math.PI]),this._yScale.range([0,this.radius]),this._dataNodes=this.partition.nodes(this.data());var i=this.svg.selectAll("path").data(this._dataNodes,function(e,t){return e.id!==undefined?e.id:t});i.enter().append("path").on("click",function(e){r.click(e)}).on("dblclick",s).append("title"),i.attr("d",this.arc).style("fill",function(e){return e.__viz_fill?e.__viz_fill:r._palette(e.label)}).style("stroke",function(e){return e.value>16?"white":"none"}).select("title").text(function(e){return e.label}),i.exit().remove(),this._resetRoot&&(this._resetRoot=!1,this.root(this._dataNodes[0]))},s.prototype.arcTweenFunc=function(t){var n=e.interpolate(this._xScale.domain(),[t.x,t.x+t.dx]),r=e.interpolate(this._yScale.domain(),[t.y,1]),i=e.interpolate(this._yScale.range(),[t.y?20:0,this.radius]),s=this;return function(e,t){return t?function(t){return s.arc(e)}:function(t){return s._xScale.domain(n(t)),s._yScale.domain(r(t)).range(i(t)),s.arc(e)}}},s}),define("css!src/tree/Treemap",[],function(){}),function(e,t){typeof define=="function"&&define.amd?define("src/tree/Treemap",["d3","../common/HTMLWidget","../common/PropertyExt","../api/ITree","../common/Utility","css!./Treemap"],t):e.tree_Treemap=t(e.d3,e.common_HTMLWidget,e.common_PropertyExt,e.api_ITree,e.common_Utility)}(this,function(e,t,n,r,i){function s(e){n.call(this),this._owner=e}function o(e){t.call(this),r.call(this)}return s.prototype=Object.create(n.prototype),s.prototype.constructor=s,s.prototype._class+=" tree_Dendrogram.Column",s.prototype.publish("column",null,"set","Field",function(){return this._owner?this._owner.columns():[]},{optional:!0}),o.prototype=Object.create(t.prototype),o.prototype.constructor=o,o.prototype._class+=" tree_Treemap",o.prototype.implements(r.prototype),o.prototype.Column=s,o.prototype.publish("paletteID","default","set","Palette ID",o.prototype._palette.switch(),{tags:["Basic","Shared"]}),o.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),o.prototype.publish("mappings",[],"propertyArray","Source Columns",null,{autoExpand:s}),o.prototype.publish("aggrType",null,"set","Aggregation Type",[null,"mean","median","sum","min","max"],{optional:!0}),o.prototype.publish("aggrColumn",null,"set","Aggregation Field",function(){return this.columns()},{optional:!0,disable:function(e){return!e.aggrType()}}),o.prototype.publish("fontSize",null,"number","Font Size",null,{optional:!0}),o.prototype.publish("transitionDuration",250,"number","Transition Duration"),o.prototype.treemapData=function(){function n(e){if(e.values instanceof Array){var t=e.values.filter(function(e){return!(e instanceof Array)}).map(function(e){return n(e)}),r={label:e.key};return t.length?r.children=t:r.size=22,r}return{label:e.key,size:e.values.aggregate,origRows:e.values}}if(!this.mappings().filter(function(e){return e.column()}).length)return this.data();var e=this._db.aggregateView(this.mappings().map(function(e){return e.column()}),this.aggrType(),this.aggrColumn()),t={key:"root",values:e.entries()};return n(t)},o.prototype.enter=function(n,r){t.prototype.enter.apply(this,arguments),this._d3Treemap=e.layout.treemap().value(function(e){return e.size||50}),this._elementDIV=r.append("div"),this._selection=new i.SimpleSelection(this._elementDIV)},o.prototype.update=function(e,n){function o(e){if(e.children)return null;var t=e.label+" ("+e.value+")";while(e.parent&&e.parent.parent)t=e.parent.label+" -> "+t,e=e.parent;return t}function u(e){this.style("left",function(e){return e.x+Math.max(0,e.dx-1)/2+"px"}).style("top",function(e){return e.y+Math.max(0,e.dy-1)/2+"px"}).style("width",function(e){return"0px"}).style("height",function(e){return"0px"})}function a(){this.style("left",function(e){return e.x+"px"}).style("top",function(e){return e.y+"px"}).style("width",function(e){return Math.max(0,e.dx-1)+"px"}).style("height",function(e){return Math.max(0,e.dy-1)+"px"})}t.prototype.update.apply(this,arguments),this._palette=this._palette.switch(this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id()));var r=this._d3Treemap.size([this.width(),this.height()]).nodes(this.treemapData());this._elementDIV.style("font-size",this.fontSize_exists()?this.fontSize()+"px":null).style("line-height",this.fontSize_exists()?this.fontSize()+2+"px":null);var i=this,s=this._elementDIV.selectAll(".node").data(r);s.enter().append("div").attr("class","node").call(this._selection.enter.bind(this._selection)).on("click",function(e){if(e&&e.origRows){var t="";i.mappings().forEach(function(e){e.column()&&(t=e.column())}),i.click(i.rowToObj(e.origRows[0]),t,i._selection.selected(this))}}).call(u),s.attr("title",o).text(function(e){return e.children?null:e.label}).style("background",function(e){return e.children?i._palette(e.label):null}).transition().duration(this.transitionDuration()).style("opacity",function(e){return e.children?1:null}).call(a),s.exit().transition().duration(this.transitionDuration()).style("opacity",0).remove()},o.prototype.exit=function(e,n){t.prototype.exit.apply(this,arguments)},o}),function(e){var t=document,n="appendChild",r="styleSheet",i=t.createElement("style");i.type="text/css",t.getElementsByTagName("head")[0][n](i),i[r]?i[r].cssText=e:i[n](t.createTextNode(e))}(".tree_CirclePacking circle{fill:#1f77b4;fill-opacity:.25;stroke:#1f77b4;stroke-width:1px}.tree_CirclePacking .leaf circle{fill:#ff7f0e;fill-opacity:1}.tree_CirclePacking .label{fill:#fff;text-anchor:middle}.tree_Dendrogram .node circle{fill:#dcf1ff;stroke:#1f77b4;stroke-width:1px}.tree_Dendrogram .node.selected circle{stroke:red}.tree_Dendrogram .node.over circle{stroke:orange}.tree_Dendrogram .node.selected.over circle{stroke:red}.tree_Dendrogram .node.selected text{fill:red}.tree_Dendrogram .node.over text{fill:orange}.tree_Dendrogram .node.selected.over text{fill:red}.tree_Dendrogram .node text{font-size:14px}.tree_Dendrogram .link{fill:none;stroke:#656565;stroke-width:1px}.tree_Sunburst path{stroke:#fff;stroke-width:.5px;fill-rule:evenodd}.tree_Treemap .node{border:solid 1px #fff;overflow:hidden;text-overflow:ellipsis;position:absolute;text-indent:2px}.tree_Treemap .node.selected{border-color:red}.tree_Treemap .node.over{border-color:orange}.tree_Treemap .node.selected.over{border-color:red}"),define("hpcc-viz-tree",function(){});