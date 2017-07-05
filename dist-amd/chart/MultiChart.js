!function(t,a){"function"==typeof define&&define.amd?define(["d3","../common/HTMLWidget","../common/Utility","../api/INDChart"],a):t.chart_MultiChart=a(t.d3,t.common_HTMLWidget,t.common_Utility,t.api_INDChart)}(this,function(t,a,e,i){function s(){a.call(this),i.call(this),this._tag="div",this._allCharts={},this._allChartTypes.forEach(function(t){var a=JSON.parse(JSON.stringify(t));a.widget=null,this._allCharts[t.id]=a,this._allCharts[t.display]=a,this._allCharts[t.widgetClass]=a},this),this._chartTypeDefaults={},this._chartTypeProperties={}}return s.prototype=Object.create(a.prototype),s.prototype.constructor=s,s.prototype._class+=" chart_MultiChart",s.prototype["implements"](i.prototype),s.prototype._GraphChartTypes=[{id:"GRAPH",display:"Graph",widgetClass:"graph_Graph"}].map(function(t){return t.family="GRAPH",t}),s.prototype._1DChartTypes=[{id:"C3_GAUGE",display:"Gauge (C3)",widgetClass:"c3chart_Gauge"}].map(function(t){return t.family="1D",t}),s.prototype._2DChartTypes=[{id:"SUMMARY",display:"Summary",widgetClass:"chart_Summary"},{id:"BUBBLE",display:"Bubble",widgetClass:"chart_Bubble"},{id:"PIE",display:"Pie",widgetClass:"chart_Pie"},{id:"GOOGLE_PIE",display:"Pie (Google)",widgetClass:"google_Pie"},{id:"C3_DONUT",display:"Donut (C3)",widgetClass:"c3chart_Donut"},{id:"C3_PIE",display:"Pie (C3)",widgetClass:"c3chart_Pie"},{id:"AM_FUNNEL",display:"Area (amCharts)",widgetClass:"amchart_Funnel"},{id:"AM_PIE",display:"Pie (amCharts)",widgetClass:"amchart_Pie"},{id:"AM_PYRAMID",display:"Area (amCharts)",widgetClass:"amchart_Pyramid"},{id:"WORD_CLOUD",display:"Word Cloud",widgetClass:"other_WordCloud"}].map(function(t){return t.family="2D",t}),s.prototype._NDChartTypes=[{id:"COLUMN",display:"Column",widgetClass:"chart_Column"},{id:"BAR",display:"Bar",widgetClass:"chart_Bar"},{id:"LINE",display:"Line",widgetClass:"chart_Line"},{id:"AREA",display:"Area",widgetClass:"chart_Area"},{id:"STEP",display:"Step",widgetClass:"chart_Step"},{id:"SCATTER",display:"Scatter",widgetClass:"chart_Scatter"},{id:"HEXBIN",display:"Hex Bin",widgetClass:"chart_HexBin"},{id:"GOOGLE_BAR",display:"Bar (Google)",widgetClass:"google_Bar"},{id:"GOOGLE_COLUMN",display:"Column (Google)",widgetClass:"google_Column"},{id:"GOOGLE_LINE",display:"Line (Google)",widgetClass:"google_Line"},{id:"GOOGLE_SCATTER",display:"Scatter (Google)",widgetClass:"google_Scatter"},{id:"GOOGLE_COMBO",display:"Combo (Google)",widgetClass:"google_Combo"},{id:"C3_AREA",display:"Area (C3)",widgetClass:"c3chart_Area"},{id:"C3_BAR",display:"Bar (C3)",widgetClass:"c3chart_Bar"},{id:"C3_COLUMN",display:"Column (C3)",widgetClass:"c3chart_Column"},{id:"C3_LINE",display:"Line (C3)",widgetClass:"c3chart_Line"},{id:"C3_SCATTER",display:"Scatter (C3)",widgetClass:"c3chart_Scatter"},{id:"C3_STEP",display:"Step (C3)",widgetClass:"c3chart_Step"},{id:"C3_COMBO",display:"Combo (C3)",widgetClass:"c3chart_Combo"},{id:"AM_AREA",display:"Area (amCharts)",widgetClass:"amchart_Area"},{id:"AM_BAR",display:"Bar (amCharts)",widgetClass:"amchart_Bar"},{id:"AM_LINE",display:"Line (amCharts)",widgetClass:"amchart_Line"},{id:"AM_SCATTER",display:"Scatter (amCharts)",widgetClass:"amchart_Scatter"},{id:"AM_COLUMN",display:"Column (amCharts)",widgetClass:"amchart_Column"},{id:"AM_GANTT",display:"Gantt (amCharts)",widgetClass:"amchart_Gantt"},{id:"AM_COMBO",display:"Combo (amCharts)",widgetClass:"amchart_Combo"}].map(function(t){return t.family="ND",t}),s.prototype._mapChartTypes=[{id:"CHORO_USSTATES",display:"US State Choropleth",widgetClass:"map_ChoroplethStates"},{id:"CHORO_USCOUNTIES",display:"US County Choropleth",widgetClass:"map_ChoroplethCounties"},{id:"CHORO_COUNTRIES",display:"Country Choropleth",widgetClass:"map_ChoroplethCountries"},{id:"GOOGLE_MAP",display:"Google Map",widgetClass:"map_GMapLayered"},{id:"OPENSTREET",display:"Open Street Map",widgetClass:"map_OpenStreet"}].map(function(t){return t.family="map",t}),s.prototype._anyChartTypes=[{id:"TABLE",display:"Table",widgetClass:"other_Table"},{id:"TABLE_NESTED",display:"Nested Table",widgetClass:"other_NestedTable"},{id:"TABLE_CALENDAR",display:"Table driven Calendar Heat Map",widgetClass:"other_CalendarHeatMap"},{id:"TABLE_BULLET",display:"Table driven bullet chart",widgetClass:"chart_Bullet"},{id:"TABLE_SELECT",display:"Table driven select",widgetClass:"other_Select"},{id:"TABLE_AUTOCOMPLETE",display:"Table driven auto complete",widgetClass:"other_AutoCompleteText"},{id:"TABLE_HANDSON",display:"Table driven handson",widgetClass:"handson_Table"},{id:"TABLE_OPPORTUNITY",display:"Table driven opportunity widget",widgetClass:"graph_Opportunity"},{id:"TABLE_TREE",display:"Table driven tree",widgetClass:"tree_Dendrogram"},{id:"TABLE_TREEMAP",display:"Table driven Treemap",widgetClass:"tree_Treemap"},{id:"TABLE_SANKEY",display:"Table driven Sankey",widgetClass:"graph_Sankey"},{id:"TABLE_GMAP_PIN",display:"Table driven Google Map (pins)",widgetClass:"map_GMapPin"},{id:"TABLE_GMAP_PINLINE",display:"Table driven Google Map (pins/lines)",widgetClass:"map_GMapPinLine"}].map(function(t){return t.family="any",t}),s.prototype._allChartTypes=s.prototype._GraphChartTypes.concat(s.prototype._1DChartTypes.concat(s.prototype._2DChartTypes.concat(s.prototype._NDChartTypes.concat(s.prototype._mapChartTypes.concat(s.prototype._anyChartTypes))))),s.prototype._allMap=t.map(s.prototype._allChartTypes,function(t){return t.family}),s.prototype._allFamilies=s.prototype._allMap.keys(),s.prototype._allChartTypesMap={},s.prototype._allChartTypesByClass={},s.prototype._allChartTypes.forEach(function(t){t.widgetPath=e.widgetPath(t.widgetClass),s.prototype._allChartTypesMap[t.id]=t,s.prototype._allChartTypesByClass[t.widgetClass]=t},this),s.prototype.publishReset(),s.prototype.publish("chartType","BUBBLE","set","Chart Type",s.prototype._allChartTypes.map(function(t){return t.id}),{tags:["Basic"]}),s.prototype.publish("chart",null,"widget","Chart",null,{tags:["Basic"]}),s.prototype.fields=function(t){var e=a.prototype.fields.apply(this,arguments);if(this.chart()){if(!arguments.length)return this.chart().fields();this.chart().fields(t)}return e},s.prototype.columns=function(t,e){var i=a.prototype.columns.apply(this,arguments);if(this.chart()){if(!arguments.length)return this.chart().columns();this.chart().columns(t,e)}return i},s.prototype.data=function(t){var e=a.prototype.data.apply(this,arguments);if(this.chart()){if(!arguments.length)return this.chart().data();this.chart().data(t)}return e},s.prototype._origChart=s.prototype.chart,s.prototype.chart=function(t){var a=s.prototype._origChart.apply(this,arguments);if(arguments.length){var e=this;this._allChartTypesByClass[t.classID()]?this.chartType(this._allChartTypesByClass[t.classID()].id):console.log("Unknown Class ID:  "+t.classID()),t.click=function(t,a,i){e.click.apply(e,arguments)},t.dblclick=function(t,a,i){e.dblclick.apply(e,arguments)},this._chartMonitor&&(this._chartMonitor.remove(),delete this._chartMonitor),this._chartMonitor=t.monitor(function(a,i,s){e.broadcast(a,i,s,t)})}return a},s.prototype.hasOverlay=function(){return this.chart()&&this.chart().hasOverlay()},s.prototype.visible=function(t){return arguments.length?(this.chart()&&this.chart().visible(t),this):this.chart()&&this.chart().visible()},s.prototype.chartTypeDefaults=function(t){return arguments.length?(this._chartTypeDefaults=t,this):this._chartTypeDefaults},s.prototype.chartTypeProperties=function(t){return arguments.length?(this._chartTypeProperties=t,this):this._chartTypeProperties},s.prototype.getChartDataFamily=function(){return this._allCharts[this.chartType()].family},s.prototype.requireContent=function(t,a){e.requireWidget(this._allCharts[t].widgetClass).then(function(t){a(new t)})},s.prototype.switchChart=function(t){if(this._switchingTo===this.chartType())return void(t&&t(this));this._switchingTo&&console.log("Attempting switch to:  "+this.chartType()+", before previous switch is complete ("+this._switchingTo+")"),this._switchingTo=this.chartType();var a=this.chart(),e=this;this.requireContent(this.chartType(),function(i){if(i!==a){var s=e.size();i.fields(e.fields()).data(e.data()).size(s),e.chart(i),a&&a.data([]).size({width:1,height:1}).render()}delete e._switchingTo,t&&t(this)})},s.prototype.update=function(t,e){a.prototype.update.apply(this,arguments);var i=e.selectAll(".multiChart").data(this.chart()?[this.chart()]:[],function(t){return t._id});i.enter().append("div").attr("class","multiChart").each(function(t){t.target(this)});var s=this.chart();if(s){for(var r in this._chartTypeDefaults)if(s[r+"_default"])try{s[r+"_default"](this._chartTypeDefaults[r])}catch(l){console.log("Exception Setting Default:  "+r)}else console.log("Unknown Default:  "+r);this._chartTypeDefaults={};for(var o in this._chartTypeProperties)if(s[o])try{s[o](this._chartTypeProperties[o])}catch(l){console.log("Exception Setting Property:  "+o)}else console.log("Unknown Property:  "+o);this._chartTypeProperties={}}var p=this;i.each(function(t){t.resize(p.size())}),i.exit().transition().each(function(t){t.target(null)}).remove()},s.prototype.exit=function(t,e){this._chartMonitor&&(this._chartMonitor.remove(),delete this._chartMonitor),this.chart()&&this.chart().target(null),a.prototype.exit.apply(this,arguments)},s.prototype.render=function(t){if(this.chartType()&&(!this.chart()||this.chart().classID()!==this._allCharts[this.chartType()].widgetClass)){var e=this,i=arguments;return this.switchChart(function(){a.prototype.render.apply(e,i)}),this}return a.prototype.render.apply(this,arguments)},s});