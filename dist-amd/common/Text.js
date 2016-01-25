(function(e,t){typeof define=="function"&&define.amd?define(["./SVGWidget","css!./Text"],t):e.common_Text=t(e.common_SVGWidget)})(this,function(e){function t(){e.call(this)}return t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.prototype._class+=" common_Text",t.prototype.publish("text","","string","Display Text",null,{tags:["Basic"]}),t.prototype.publish("fontFamily","","string","Font Family",null,{tags:["Intermediate"]}),t.prototype.publish("fontSize",null,"number","Font Size (px)",null,{tags:["Intermediate"]}),t.prototype.publish("anchor","middle","set","Anchor Position",["start","middle","end"],{tags:["Intermediate"]}),t.prototype.publish("colorFill",null,"html-color","Fill Color",null,{tags:["Basic"]}),t.prototype.publish("rotation",0,"number","Degrees of rotation",null,{tags:["Basic"]}),t.prototype.enter=function(t,n){e.prototype.enter.apply(this,arguments),this._textElement=n.append("text")},t.prototype.update=function(t,n){e.prototype.update.apply(this,arguments);var r=this;this._textElement.attr("font-family",this.fontFamily()).attr("font-size",this.fontSize());var i=this.text().split("\n"),s=this._textElement.selectAll("tspan").data(i,function(e){return e});s.enter().append("tspan").attr("class",function(e,t){return"tspan_"+t}).attr("dy","1em").attr("x","0"),s.style("fill",this.colorFill()).text(function(e){return e}),s.exit().remove();var o={width:0,height:0};try{o=this._textElement.node().getBBox()}catch(u){}var a=-(o.x+o.width/2),f=-(o.y+o.height/2);switch(this.anchor()){case"start":a=-o.x+o.width/2;break;case"end":a=o.x+o.width/2}var l=-this.rotation()*Math.PI/180;a=-1*Math.abs(a*Math.cos(l)+f*Math.sin(l)),f=-1*Math.abs(a*Math.sin(l)+f*Math.cos(l)),this._textElement.style("text-anchor",this.anchor()).attr("transform",function(e){return"translate("+a+","+f+")rotate("+r.rotation()+")"})},t});