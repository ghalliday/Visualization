(function(e,t){typeof define=="function"&&define.amd?define(["../layout/Surface","../layout/Border","../chart/MultiChart","../common/Text","../other/Legend"],t):e.composite_MegaChart=t(e.layout_Surface,e.layout_Border,e.chart_MultiChart,e.common_Text,e.other_Legend)})(this,function(e,t,n,r,i){function s(){e.call(this),this._tag="div",this._chart=new n;var i=this;this._chart.click=function(){i.click.apply(this,arguments)},this._layout=new t,this._valueTitle=new r,this._domainTitle=new r}return s.prototype=Object.create(e.prototype),s.prototype.constructor=s,s.prototype._class+=" composite_MegaChart",s.prototype._1DChartTypes=n.prototype._1DChartTypes,s.prototype._2DChartTypes=n.prototype._2DChartTypes,s.prototype._NDChartTypes=n.prototype._NDChartTypes,s.prototype._anyChartTypes=n.prototype._anyChartTypes,s.prototype._allChartTypes=n.prototype._allChartTypes,s.prototype.publishProxy("valueAxisTitle","_valueTitle","text"),s.prototype.publishProxy("domainAxisTitle","_domainTitle","text"),s.prototype.publish("showLegend",!1,"boolean","Show/Hide Legend",null,{tags:["Basic"]}),s.prototype.publish("gutter",8,"number","Gap Between Cells",null,{tags:["Basic"]}),s.prototype.publishProxy("chartType","_chart","chartType"),s.prototype.enter=function(t,n){e.prototype.enter.apply(this,arguments),this._layout.setContent("center",this._chart.chartType(this.chartType())),this._layout.setContent("right",(new i).targetWidget(this._layout.getContent("center"))),this._layout.setContent("bottom",this._valueTitle.rotation(-90)),this._layout.setContent("left",this._domainTitle),this.widget(this._layout)},s.prototype.update=function(t,n){e.prototype.update.apply(this,arguments),this._layout!==null&&(this._layout.gutter(this.gutter()).leftShrinkWrap(!0).rightShrinkWrap(!0).bottomShrinkWrap(!0),this._layout.getContent("center").columns(this.columns()).data(this.data()),this._layout.getContent("center").chartType()!==this.chartType()&&this._layout.getContent("center").chartType(this.chartType())),this.showLegend()?this._layout.setContent("right",(new i).targetWidget(this._layout.getContent("center"))):this._layout.clearContent("right"),this.valueAxisTitle()!==""?this._layout.setContent("left",this._valueTitle):this._layout.clearContent("left"),this.domainAxisTitle()!==""?this._layout.setContent("bottom",this._domainTitle):this._layout.clearContent("bottom")},s.prototype.exit=function(t,n){e.prototype.exit.apply(this,arguments)},s});