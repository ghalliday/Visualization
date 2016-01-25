(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/HTMLWidget","amcharts.gantt","../api/INDChart","require"],t):e.amchart_Gantt=t(e.d3,e.common_HTMLWidget,e.AmCharts,e.api_INDChart,e.require)})(this,function(e,t,n,r,i){function s(){t.call(this),this._tag="div",this._chart={},this._selected=null,this._selections=[],this._dataUpdated=0,this._prevDataUpdated=-1,this._columnsUpdated=0,this._prevColumnsUpdated=-1,this._dateParserData=e.time.format("%Y-%m-%d").parse}s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.prototype._class+=" amchart_Gantt",s.prototype.implements(r.prototype),s.prototype.publish("paletteID","default","set","Palette ID",s.prototype._palette.switch(),{tags:["Basic","Shared"]}),s.prototype.publish("fontFamily","Verdana","string","Label Font Family",null,{tags:["Basic","Shared"]}),s.prototype.publish("fontSize",11,"number","Label Font Size",null,{tags:["Basic","Shared"]}),s.prototype.publish("fontColor","#000000","html-color","Label Font Color",null,{tags:["Basic","Shared"]}),s.prototype.publish("depth3D",0,"number","3D Depth (px)",null,{tags:["Basic"]}),s.prototype.publish("angle3D",0,"number","3D Angle (Deg)",null,{tags:["Basic"]}),s.prototype.publish("selectionMode","simple","set","Selection Mode",["simple","multi"],{tags:["Intermediate"]}),s.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),s.prototype.publish("timePattern","%Y-%m-%d","string","Time Series Pattern"),s.prototype.publish("selectionColor","#f00","html-color","Font Color",null,{tags:["Basic"]}),s.prototype.publish("brightnessStep",0,"number","Brightness step",null,{tags:["Basic"]}),s.prototype.publish("columnWidth",.5,"number","column width",null,{tags:["Basic"]}),s.prototype.publish("minPeriod","DD","string","Value axis minimum period",null,{tags:["Basic"]});var o=s.prototype.timePattern;return s.prototype.timePattern=function(t){var n=o.apply(this,arguments);return arguments.length&&(this._dateParserData=e.time.format(t).parse),n},s.prototype.updateChartOptions=function(){var e=this;this._chart.color=this.fontColor(),this._chart.fontSize=this.fontSize(),this._chart.fontFamily=this.fontFamily(),this._chart.depth3D=this.depth3D(),this._chart.angle=this.angle3D();if(this._dataUpdated>this._prevDataUpdated||this._prevTimePattern!==this.timePattern()){this._chart.dataProvider=[];var t=this.amFormattedData();for(var n in t){var r={};r.category=n,r.segments=[],t[n].forEach(function(t){var n={start:e._dateParserData(t[0]),end:e._dateParserData(t[1])};r.segments.push(n)}),this._chart.dataProvider.push(r)}}this._prevDataUpdated=this._dataUpdated,this._prevTimePattern=this.timePattern(),this._chart.dataProvider.forEach(function(t,n){e._chart.dataProvider[n].color=e._palette(n)}),this._chart.columnWidth=this.columnWidth(),this._chart.colorField="color",this._chart.valueAxes[0].type="date",this._chart.valueAxes[0].minPeriod=this.minPeriod(),this._chart.brightnessStep=this.brightnessStep()||undefined,this._chart.categoryField="category",this._chart.segmentsField="segments",this._chart.startDateField="start",this._chart.endDateField="end"},s.prototype.amFormattedData=function(){var e={};return this.data().forEach(function(t){e[t[0]]||(e[t[0]]=[]),t.forEach(function(n,r){if(r===0)return;e[t[0]].push(n)})}),e},s.prototype.enter=function(e,r){t.prototype.enter.apply(this,arguments);var s=this,o={type:"gantt",theme:"none",autoMargins:!0,valueAxis:{},graph:{fillAlphas:1,balloonText:"<b>[[category]]</b>: [[open]] - [[value]]"},rotate:!0,dataProvider:[],chartScrollbar:{},"export":{enabled:!0}};typeof define=="function"&&define.amd&&(o.pathToImages=i.toUrl("amchartsImg")),this._chart=n.makeChart(e,o),this._chart.addListener("clickGraphItem",function(e){var t=e.graph.segmentData,n="color";t[n]!==null&&t[n]!==undefined?(delete t[n],s.selectionMode()==="simple"&&(s._selected!==null&&delete s._selected.data[s._selected.field],s._selected=null)):(t[n]=s.selectionColor(),s.selectionMode()==="simple"&&(s._selected!==null&&delete s._selected.data[s._selected.field],s._selected={field:n,data:t,colIndex:e.target.columnIndex,dIdx:e.index},s._selections.push(s._selected))),e.chart.validateData(),s.click(s.rowToObj(s.data()[e.index]),s.columns()[e.target.columnIndex+1],s._selected!==null)})},s.prototype.update=function(e,t){this._palette=this._palette.switch(this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id())),e.style.width=this.size().width+"px",e.style.height=this.size().height+"px",this.updateChartOptions(),this._chart.validateNow(),this._chart.validateData()},s.prototype.render=function(e){return t.prototype.render.apply(this,arguments)},s.prototype.data=function(e){return arguments.length&&this._dataUpdated++,t.prototype.data.apply(this,arguments)},s.prototype.columns=function(e){return arguments.length&&this._columnsUpdated++,t.prototype.columns.apply(this,arguments)},s});