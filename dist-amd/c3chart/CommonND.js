(function(e,t){typeof define=="function"&&define.amd?define(["d3","./Common","../api/INDChart"],t):e.c3chart_CommonND=t(e.d3,e.c3chart_Common,e.api_INDChart)})(this,function(e,t,n){function r(e){t.call(this),n.call(this);var r=this;this._config.color={pattern:this._palette.colors()},this._config.data.color=function(e,t){return r._palette(t.id?t.id:t)}}return r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.prototype._class+=" c3chart_CommonND",r.prototype.implements(n.prototype),r.prototype.publish("paletteID","default","set","Palette ID",r.prototype._palette.switch(),{tags:["Basic","Shared"]}),r.prototype.publish("axisLineWidth",1,"number","Axis Line Width",null,{tags:["Intermediate","Shared"]}),r.prototype.publish("xAxisBaselineColor",null,"html-color","X Axis Baseline Color",null,{tags:["Basic","Shared"]}),r.prototype.publish("yAxisBaselineColor",null,"html-color","Y Axis Baseline Color",null,{tags:["Basic","Shared"]}),r.prototype.publish("xAxisFontColor",null,"html-color","X Axis Text Font Color",null,{tags:["Basic","Shared"]}),r.prototype.publish("yAxisFontColor",null,"html-color","Y Axis Text Font Color",null,{tags:["Basic","Shared"]}),r.prototype.publish("axisFontSize",null,"number","X/Y Axis Text Font Size",null,{tags:["Basic","Shared"]}),r.prototype.publish("axisFontFamily",null,"string","X/Y Axis Text Font Name",null,{tags:["Basic","Shared"]}),r.prototype.publish("xAxisLabelRotation",0,"number","X Axis Label Angle",null,{tags:["Intermediate","Shared"]}),r.prototype.publish("yAxisTitle","","string","Y-Axis Title",null,{tags:["Intermediate","Shared"]}),r.prototype.publish("xAxisTitle","","string","X-Axis Title",null,{tags:["Intermediate","Shared"]}),r.prototype.publish("xAxisTitleFontColor",null,"html-color","Horizontal Axis Title Text Style (Color)",null,{tags:["Advanced","Shared"]}),r.prototype.publish("xAxisTitleFontFamily",null,"string","Horizontal Axis Title Text Style (Font Name)",null,{tags:["Advanced","Shared"]}),r.prototype.publish("xAxisTitleFontSize",null,"number","Horizontal Axis Title Text Style (Font Size)",null,{tags:["Advanced","Shared"]}),r.prototype.publish("yAxisTitleFontColor",null,"html-color","Vertical Axis Title Text Style (Color)",null,{tags:["Advanced","Shared"]}),r.prototype.publish("yAxisTitleFontFamily",null,"string","Vertical Axis Title Text Style (Font Name)",null,{tags:["Advanced","Shared"]}),r.prototype.publish("yAxisTitleFontSize",null,"number","Vertical Axis Title Text Style (Font Size)",null,{tags:["Advanced","Shared"]}),r.prototype.publish("xAxisType","category","set","X-Axis Type",["category","time","indexed"],{tags:["Intermediate"]}),r.prototype.publish("subchart",!1,"boolean","Show SubChart",null,{tags:["Private"]}),r.prototype.publish("showXGrid",!1,"boolean","Show X Grid",null,{tags:["Intermediate"]}),r.prototype.publish("showYGrid",!1,"boolean","Show Y Grid",null,{tags:["Intermediate"]}),r.prototype.publish("useClonedPalette",!1,"boolean","Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]}),r.prototype.publish("xAxisTickFormat","","string","X-Axis Tick Format",null,{}),r.prototype.publish("yAxisTickFormat",null,"string","Y-Axis Tick Format",null,{optional:!0}),r.prototype.publish("xAxisTypeTimePattern","%Y-%m-%d","string","Time Series Pattern",null,{}),r.prototype.publish("yAxisTypeTimePattern","%Y-%m-%d","string","Time Series Pattern",null,{}),r.prototype.publish("axisTickLabelMultiLine",!1,"boolean","Show Y Grid",null,{tags:["Intermediate"]}),r.prototype.enter=function(e,n){this.subchart()&&(this._config.subchart={show:!0,size:{height:20}});var r;switch(this.xAxisType()){case"time":r="timeseries";break;default:r=this.xAxisType()}this._config.axis.x={type:r,tick:{rotate:this.xAxisLabelRotation(),multiline:this.axisTickLabelMultiLine()},label:{text:this.xAxisTitle(),position:"outer-center"}},this._config.axis.y={label:{text:this.yAxisTitle(),position:"outer-center"}},this._config.grid={x:{show:this.showXGrid()},y:{show:this.showYGrid()}};switch(this.xAxisType()){case"category":this._config.axis.tick={centered:!0,multiline:this.axisTickLabelMultiLine()};break;case"time":this.data(this.data().map(function(e,t){return e.map(function(e,t){return t===0&&typeof e=="number"?e.toString():e})})),this._config.data.x=this.columns()[0],this._config.data.xFormat=this.xAxisTypeTimePattern()}t.prototype.enter.apply(this,arguments)},r.prototype.update=function(n,r){t.prototype.update.apply(this,arguments),this._palette=this._palette.switch(this.paletteID()),this.useClonedPalette()&&(this._palette=this._palette.cloneNotExists(this.paletteID()+"_"+this.id())),this.c3Chart.internal.config.axis_y_tick_format=this.yAxisTickFormat()?e.format(this.yAxisTickFormat()):undefined,this.xAxisType()==="time"?this.c3Chart.internal.config.axis_x_tick_format=this.xAxisTickFormat()?e.time.format(this.xAxisTickFormat()):"%Y-%m-%d %I:%M:%S %p":this.c3Chart.internal.config.axis_x_tick_format=this.xAxisTickFormat()?e.format(this.xAxisTickFormat()):undefined,t.prototype.update.apply(this,arguments),r.selectAll(".c3 svg").style({"font-size":this.axisFontSize()+"px"}),r.selectAll(".c3 svg text").style({"font-family":this.axisFontFamily()}),r.selectAll(".c3 .c3-axis.c3-axis-x text").style({fill:this.xAxisFontColor()}),r.selectAll(".c3 .c3-axis.c3-axis-y text").style({fill:this.yAxisFontColor()}),r.selectAll(".c3 .c3-axis path").style({"stroke-width":this.axisLineWidth()+"px"}),r.selectAll(".c3 .c3-axis-x path, .c3 .c3-axis-x line").style({stroke:this.xAxisBaselineColor()}),r.selectAll(".c3 .c3-axis-y path, .c3 .c3-axis-y line").style({stroke:this.yAxisBaselineColor()}),r.selectAll(".c3-axis-x-label").style({"font-family":this.xAxisTitleFontFamily(),"font-size":this.xAxisTitleFontSize(),stroke:this.xAxisTitleFontColor()}),r.selectAll(".c3-axis-y-label").style({"font-family":this.yAxisTitleFontFamily(),"font-size":this.yAxisTitleFontSize(),stroke:this.yAxisTitleFontColor()})},r.prototype.getChartOptions=function(){var e=t.prototype.getChartOptions.apply(this,arguments);switch(this.xAxisType()){case"category":e.categories=this.getC3Categories(),e.columns=this.getC3Columns();break;case"indexed":case"time":e.columns=this.getC3Columns()}return e},r});