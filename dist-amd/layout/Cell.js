(function(e,t){typeof define=="function"&&define.amd?define(["./Surface"],t):e.layout_Cell=t(e.layout_Surface)})(this,function(e){function t(){e.call(this),this._dragHandles=["nw","n","ne","e","se","s","sw","w"]}return t.prototype=Object.create(e.prototype),t.prototype._class+=" layout_Cell",t.prototype.publish("gridRow",0,"number","Grid Row Position",null,{tags:["Private"]}),t.prototype.publish("gridCol",0,"number","Grid Column Position",null,{tags:["Private"]}),t.prototype.publish("gridRowSpan",1,"number","Grid Row Span",null,{tags:["Private"]}),t.prototype.publish("gridColSpan",1,"number","Grid Column Span",null,{tags:["Private"]}),t.prototype.publish("handleSize",6,"number","Grid Row Position",null,{tags:["Private"]}),t.prototype.enter=function(t,n){e.prototype.enter.apply(this,arguments),n.classed("layout_Surface",!0)},t.prototype.update=function(t,n){e.prototype.update.apply(this,arguments);var r=this,i=n.selectAll(".dragHandle").data(this._dragHandles,function(e){return e});i.enter().append("div").attr("class",function(e){return"dragHandle dragHandle_"+e}).style("position","absolute"),i.style({padding:"0px",margin:"0px",left:function(e){switch(e){case"ne":case"e":case"se":return r._size.width-r.handleSize()+"px";case"nw":case"w":case"sw":return"0px";case"n":case"s":return r.handleSize()+"px"}},top:function(e){switch(e){case"nw":case"n":case"ne":return"0px";case"e":case"w":return r.handleSize()+"px";case"sw":case"s":case"se":return r._size.height-r.handleSize()+"px"}},width:function(e){switch(e){case"n":case"s":return r._size.width-r.handleSize()*2+"px";default:return r.handleSize()+"px"}},height:function(e){switch(e){case"w":case"e":return r._size.height-r.handleSize()*2+"px";default:return r.handleSize()+"px"}}}),i.exit().remove()},t});