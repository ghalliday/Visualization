(function(e,t){typeof define=="function"&&define.amd?define(["./Surface"],t):e.layout_Cell=t(e.layout_Surface,e.chart_Pie,e.c3_Column,e.c3_Line)})(this,function(e,t,n,r){function i(){e.call(this),this._dragHandles=["se"]}return i.prototype=Object.create(e.prototype),i.prototype._class+=" layout_Cell",i.prototype.publish("gridRow",0,"number","Grid Row Position",null,{tags:["Private"]}),i.prototype.publish("gridCol",0,"number","Grid Column Position",null,{tags:["Private"]}),i.prototype.publish("gridRowSpan",1,"number","Grid Row Span",null,{tags:["Private"]}),i.prototype.publish("gridColSpan",1,"number","Grid Column Span",null,{tags:["Private"]}),i.prototype.publish("handleSize",6,"number","Grid Row Position",null,{tags:["Private"]}),i.prototype.enter=function(t,n){e.prototype.enter.apply(this,arguments),n.classed("layout_Surface",!0)},i.prototype.update=function(t,n){e.prototype.update.apply(this,arguments);var r=this,i=n.selectAll(".dragHandle").data(this._dragHandles,function(e){return e});i.enter().append("div").attr("class",function(e){return"dragHandle dragHandle_"+e}).style("position","absolute"),i.style({padding:"0px",margin:"0px",left:function(e){switch(e){case"ne":case"e":case"se":return r._size.width-r.handleSize()+"px";case"nw":case"w":case"sw":return"0px";default:return r._size.width/2-r.handleSize()/2+"px"}},top:function(e){switch(e){case"nw":case"n":case"ne":return"0px";case"sw":case"s":case"se":return r._size.height-r.handleSize()+"px";default:return r._size.height/2-r.handleSize()/2+"px"}},width:r.handleSize()+"px",height:r.handleSize()+"px"}).on("dragstart",function(e){r._dragHandle=e,console.log("dragstart:  "+e)}).on("dragend",function(e){console.log("dragend:  "+(r._dragHandle?r._dragHandle:"")),r._dragHandle=null}),i.exit().remove()},i});