!function(t,i){"function"==typeof define&&define.amd?define(["d3","../common/Class","../common/Database","../common/Utility","../other/Comms","../common/Widget","../composite/MegaChart","../chart/MultiChart","../other/Table","require","es6-promise"],i):t.marshaller_HipieDDL=i(t.d3,t.common_Class,t.common_Database,t.common_Utility,t.other_Comms,t.common_Widget,t.composite_MegaChart,t.chart_MultiChart,t.other_Table,t.require)}(this,function(t,i,e,s,a,o,r,n,u,p){function h(t){return t?String.fromCharCode(parseInt(t)):t}function c(t){switch(t){case"bool":case"boolean":return"boolean";case"integer":case"float":case"double":return"number";case"date":case"time":return"time";case"geohash":return"geohash";case"dataset":return"dataset";case"visualization":return"widget";default:if(t){if(0===t.indexOf("unsigned"))return"number";if(0===t.indexOf("integer"))return"number";if(0===t.indexOf("real"))return"number";if(0===t.indexOf("string"))return"string"}}return window.__hpcc_debug&&console.log("unknown hipieType:  "+t),"string"}function l(t,i){this.visualization=t;var e={};for(var s in i)i[s]instanceof Array?i[s].forEach(function(t,i){e[0===i?s:s+"_"+i]=t}):e[s]=i[s];this.mappings=e,this.hasMappings=!1,this.reverseMappings={},this.columns=[],this.columnsIdx={},this.columnsRHS=[],this.columnsRHSIdx={}}function d(t,i){l.call(this,t,i),this.columns=["label","weight"],this.columnsIdx={label:0,weight:1},this.init()}function f(t,i){l.call(this,t,i),i.state?(this.columns=["state","weight"],this.columnsIdx={state:0,weight:1}):i.county?(this.columns=["county","weight"],this.columnsIdx={county:0,weight:1}):i.geohash&&(this.columns=["geohash","weight"],this.columnsIdx={geohash:0,weight:1}),this.init()}function g(t,i){l.call(this,t,i),i.state?(this.columns=["state"],this.columnsIdx={state:0}):i.county?(this.columns=["county"],this.columnsIdx={county:0}):i.geohash&&(this.columns=["geohash","label"],this.columnsIdx={geohash:0,label:1});var e=this.columns.length;i.weight instanceof Array&&i.weight.forEach(function(t,i){this.columns.push(t),this.columnsIdx[0===i?"weight":"weight_"+i]=i+e},this),this.init()}function m(t,i){l.call(this,t,i),this.columns=["x","y","weight"],this.columnsIdx={x:0,y:1,weight:2},this.init()}function y(t,i){var e={label:i.x[0]};i.y.forEach(function(t,i){e[t]=t}),l.call(this,t,e),this.init()}function v(t,i){var e={};for(var s in i)i[s].forEach(function(i,s){e[t.label[s]]=i});l.call(this,t,e),this.init()}function _(t,i,e){l.call(this,t,i),this.icon=t.icon||{},this.fields=t.fields(),this.columns=["uid","label","weight","flags"],this.columnsIdx={uid:0,label:1,weight:2,flags:3},this.init(),this.link=e,this.linkMappings=new l(t,this.link.mappings),this.linkMappings.columns=["uid"],this.linkMappings.columnsIdx={uid:0,label:1},this.visualization=t}function w(t,i){if(this.visualization=t,i){switch(this._id=i.id,this._output=i.output,this.mappings=null,i.mappings||console.log("no mappings for:"+t.id+"->"+i.id),this.visualization.type){case"LINE":this.mappings=new y(this.visualization,i.mappings);break;case"TABLE":this.mappings=new v(this.visualization,i.mappings);break;case"GRAPH":this.mappings=new _(this.visualization,i.mappings,i.link);break;case"CHORO":i.mappings.weight instanceof Array&&i.mappings.weight.length?(this.mappings=new g(this.visualization,i.mappings),i.mappings.weight.length>1&&(this.visualization.type="LINE")):this.mappings=new f(this.visualization,i.mappings);break;case"HEAT_MAP":this.mappings=new m(this.visualization,i.mappings);break;default:this.mappings=new d(this.visualization,i.mappings)}this.first=i.first,this.reverse=i.reverse,this.sort=i.sort,this.properties=i.properties}}function z(t,i,e){this.event=t,this.dashboard=t.visualization.dashboard,this._col=i.col,this._visualization=i.visualization,this._instance=i.instance,this._datasource=i.datasource,this._merge=i.merge,this._mappings=i.mappings||e}function D(t,i,e){this.visualization=t,this.eventID=i,this._updates=[],this._mappings=e.mappings,e&&(this._updates=e.updates.map(function(t){return new z(this,t,e.mappings)},this))}function b(t,i){this.visualization=t,this.events={};for(var e in i)this.events[e]=new D(t,e,i[e])}function I(t){this._id=t.id,this._label=t.label,this._properties=t.properties||{}}function x(t,e,s){switch(i.call(this),this.dashboard=t,this.parentVisualization=s,this.type=e.type,this.id=e.id,this.type){case"TABLE":this.label=e.label;break;case"GRAPH":this.label=e.label,this.icon=e.icon||{faChar:""},this.flags=e.flag||[]}this.title=e.title||e.id,this._fields=(e.fields||[]).map(function(t){return new I(t)}),this._fieldsMap={},this._fields.forEach(function(t){this._fieldsMap[t.id()]=t},this),this.properties=e.properties||(e.source?e.source.properties:null)||{},this.source=new w(this,e.source),this.events=new b(this,e.events),this.layers=[],this.hasVizDeclarations=!1,this.vizDeclarations={},"CHORO"===this.type?this.layers=(e.visualizations||[]).map(function(i){return t.createVisualization(i,this)},this):(e.visualizations||[]).forEach(function(i){this.vizDeclarations[i.id]=t.createVisualization(i,this),this.hasVizDeclarations=!0},this);var a=this;switch(this.type){case"CHORO":var o=e.properties&&e.properties.charttype?e.properties.charttype:"";if(s)switch(o){case"MAP_PINS":this.loadWidget("../map/Pins",function(t){try{t.id(e.id).columns(a.source.getColumns()).geohashColumn("geohash").tooltipColumn("label").fillColor(e.color?e.color:null).projection("albersUsaPr")}catch(i){console.log("Unexpected widget type:  "+t.classID())}})}else o=o||"CHORO","CHORO"===o&&(this.source.mappings.contains("state")?o="CHORO_USSTATES":this.source.mappings.contains("county")?o="CHORO_USCOUNTIES":this.source.mappings.contains("country")&&(o="CHORO_COUNTRIES")),Promise.all(a.layers.map(function(t){return t.loadedPromise()})).then(function(){a.loadWidget("../composite/MegaChart",function(t){var i=a.layers.map(function(t){return t.widget});try{switch(t.classID()){case"composite_MegaChart":t.id(e.id).showChartSelect_default(!1).chartType_default(o).chartTypeDefaults({autoScaleMode:i.length?"data":"mesh"}).chartTypeProperties({layers:i});break;default:t.id(e.id).autoScaleMode(i.length?"data":"mesh").layers(i)}}catch(s){console.log("Unexpected widget type:  "+t.classID())}})});break;case"2DCHART":case"PIE":case"BUBBLE":case"BAR":case"WORD_CLOUD":this.loadWidget("../composite/MegaChart",function(t){try{t.id(e.id).chartType_default(a.properties.chartType||a.properties.charttype||a.type)}catch(i){console.log("Unexpected widget type:  "+t.classID())}});break;case"LINE":this.loadWidget("../composite/MegaChart",function(t){try{t.id(e.id).chartType_default(a.properties.chartType||a.properties.charttype||a.type)}catch(i){console.log("Unexpected widget type:  "+t.classID())}});break;case"TABLE":this.loadWidget("../composite/MegaChart",function(t){try{t.id(e.id).showChartSelect_default(!1).chartType_default("TABLE")}catch(i){console.log("Unexpected widget type:  "+t.classID())}});break;case"SLIDER":this.loadWidget("../form/Slider",function(t){try{if(t.id(e.id),e.range){var i="";for(var s in e.source.mappings){i=s;break}t.low_default(+e.range[0]).high_default(+e.range[1]).step_default(+e.range[2]).selectionLabel_default(i)}}catch(a){console.log("Unexpected widget type:  "+t.classID())}});break;case"GRAPH":this.loadWidget("../composite/MegaChart",function(t){try{t.id(e.id).showChartSelect_default(!1).chartType_default("GRAPH").chartTypeDefaults({layout:"ForceDirected2",applyScaleOnLayout:!0})}catch(i){console.log("Unexpected widget type:  "+t.classID())}});break;case"FORM":this.loadWidgets(["../form/Form","../form/Input","../form/Button","../form/CheckBox","../form/ColorInput","../form/Radio","../form/Range","../form/Select","../form/Slider","../form/TextArea","../form/InputRange"],function(t,i){var s=i[1],o=i[3],r=i[5],n=i[7],u=i[9],p=i[10];try{t.id(e.id).inputs(a.fields().map(function(t){var i,e=[],a=[];switch(t.charttype()||"range"!==t.type()||t.charttype("RANGE"),t.charttype()){case"TEXT":i=(new s).type_default("text");break;case"TEXTAREA":i=new u;break;case"CHECKBOX":i=new o;break;case"RADIO":i=new r;break;case"HIDDEN":i=(new s).type_default("hidden");break;case"RANGE":i=new p;break;default:if(t.enumvals()){i=new n,a=t.enumvals();for(var h in a)e.push([h,a[h]])}else i=(new s).type_default("text")}if(i.name_default(t.id()).label_default(t.label()).value_default(t["default"]()),i instanceof o||i instanceof r){var c=Object.keys(t.enumvals());i.selectOptions_default(c)}else e.length&&i.selectOptions_default(e);return i}))}catch(h){console.log("Unexpected widget type:  "+t.classID())}});break;case"HEAT_MAP":this.loadWidgets(["../other/HeatMap"],function(t){try{t.id(e.id).image_default(a.properties.imageUrl)}catch(i){console.log("Unexpected widget type:  "+t.classID())}});break;default:this.loadWidget("../common/TextBox",function(t){try{t.id(e.id).text_default(a.id+"\nTODO:  "+a.type)}catch(i){console.log("Unexpected widget type:  "+t.classID())}})}}function R(t,i){this.datasource=t,"string"==typeof i&&(i={fieldid:i,nullable:!0,rule:"=="}),this.fieldid=i.fieldid,this.nullable=i.nullable,this.rule=i.rule||"==",this.minid=i.minid,this.maxid=i.maxid,this.calcRequestFieldID()}function M(t,i){this.datasource=t,this.id=i.id,this.from=i.from,this.notify=i.notify||[],this.filters=(i.filter||[]).map(function(t){return new R(this.datasource,t)},this)}function S(){this.datasourceRequests={}}function E(t){this.skipClear=t,this.visualizationRequests={}}function A(t,i,e,s){this.marshaller=t,this.id=i.id,this.WUID=i.WUID,this.URL=t.espUrl&&t.espUrl.url()?t.espUrl.url():i.URL,this.databomb=i.databomb,this.filters=(i.filter||[]).map(function(t){return new R(this,t)},this),this._loadedCount=0;var o=this;this._outputs={},this._outputArray=[];var r=[];i.outputs.forEach(function(t){var i=new M(o,t);o._outputs[t.id]=i,o._outputArray.push(i),r.push({id:t.id,from:t.from,filters:i.filters||this.filters})},this),this.WUID?this.comms=(new a.HIPIEWorkunit).url(this.URL).proxyMappings(e).timeout(s).hipieResults(r):this.databomb?this.comms=(new a.HIPIEDatabomb).hipieResults(r):this.comms=(new a.HIPIERoxie).url(i.URL).proxyMappings(e).timeout(s)}function C(t,i,e,s){this.marshaller=t,this.id=i.id,this.title=i.title,this._datasources={},this._datasourceArray=[],this._datasourceTotal=0,i.datasources&&i.datasources.forEach(function(t){this.createDatasource(t,e,s)},this),this._datasourceTotal=this._datasourceArray.length,this._visualizations={},this._visualizationArray=[],i.visualizations.forEach(function(t){this.createVisualization(t)},this),this._visualizationTotal=this._visualizationArray.length}function O(){i.call(this),this._proxyMappings={},this._widgetMappings=t.map(),this._clearDataOnUpdate=!0,this._propogateClear=!1,this.id="Marshaller",this._missingDataString="",this.dashboards={},this.dashboardArray=[],this._datasources={},this._datasourceArray=[],this._visualizations={},this._visualizationArray=[]}var U="...loading...",q="_changed";l.prototype.init=function(){for(var t in this.mappings)this.reverseMappings[this.mappings[t]]=t,void 0===this.columnsIdx[t]&&(this.columns.push(t),this.columnsIdx[t]=this.columns.length-1),this.columnsRHS[this.columnsIdx[t]]=this.mappings[t],this.columnsRHSIdx[this.mappings[t]]=this.columnsIdx[t],this.hasMappings=!0},l.prototype.init=function(){for(var t in this.mappings)this.reverseMappings[this.mappings[t]]=t,void 0===this.columnsIdx[t]&&(this.columns.push(t),this.columnsIdx[t]=this.columns.length-1),this.columnsRHS[this.columnsIdx[t]]=this.mappings[t],this.columnsRHSIdx[this.mappings[t]]=this.columnsIdx[t],this.hasMappings=!0},l.prototype.getFields=function(){return this.visualization.fields()?Object.keys(this.mappings).map(function(t){var i=this.visualization.field(t);return i||console.log("Unknown mapping field:  "+t),new e.Field(i.id()).type(i.jsType()).label(this.reverseMappings[i.id()])},this):null},l.prototype.contains=function(t){return void 0!==this.mappings[t]},l.prototype.doMap=function(t){var i=[];for(var e in this.mappings){var s=this.mappings[e];try{var a=t[s];void 0===a&&(a=t[s.toLowerCase()]),i[this.columnsIdx[e]]=a}catch(o){console.log("Invalid Mapping:  "+this.visualization.id+" ["+s+"->"+t+"]")}}return i},l.prototype.doReverseMap=function(t){var i={};for(var e in this.mappings){var s=this.mappings[e];try{var a=t[e];void 0===a&&(a=t[e.toLowerCase()]),i[s]=a}catch(o){console.log("Invalid Mapping:  "+this.visualization.id+" ["+e+"->"+t+"]")}}return i},l.prototype.doMapAll=function(t){return t.hipieMappings(this.columnsRHS.map(function(t){return this.visualization.field(t)},this),this.visualization.dashboard.marshaller.missingDataString())},l.prototype.getMap=function(t){return this.mappings[t]},l.prototype.getReverseMap=function(t){return this.reverseMappings[t]},d.prototype=Object.create(l.prototype),f.prototype=Object.create(l.prototype),g.prototype=Object.create(l.prototype),m.prototype=Object.create(l.prototype),y.prototype=Object.create(l.prototype),v.prototype=Object.create(l.prototype),v.prototype.init=function(){this.visualization.label.forEach(function(t,i){this.reverseMappings[this.mappings[t]]=t,this.columns.push(t),this.columnsIdx[t]=i,this.columnsRHS[i]=this.mappings[t],this.columnsRHSIdx[this.mappings[t]]=i,this.hasMappings=!0},this)},v.prototype.doMapAll=function(t){var i=l.prototype.doMapAll.apply(this,arguments);if(i instanceof Array){var e=this.visualization.source.getColumnsRHSIdx();this.visualization.fields().forEach(function(t){var s=t.jsType(),a=e[t.id()];void 0===a?console.log("Invalid Mapping:  "+t.id()):i=i.map(function(i){var e=i[a];if(e&&e.Row&&(e=e.Row),e instanceof Array)switch(s){case"dataset":var o=[],r={},n=e.map(function(t,i){var e=[];e.length=o.length;for(var s in t)0===i&&(r[s]=o.length,o.push(s)),e[r[s]]=t[s];return e}),p=(new u).columns(o).data(n);i[a]=p;break;case"widget":var h=this.visualization.vizDeclarations[t.localVisualizationID()],c=h.source.getOutput(),l=c.db;c.setData(e,[]);var d=h.widget,f=(new d.constructor).showToolbar(!1).chartType(d.chartType()).chartTypeDefaults(d.chartTypeDefaults()).columns(h.source.getColumns()).data(h.source.getData());c.db=l,i[a]=f}return i},this)},this)}return i},_.prototype=Object.create(l.prototype),_.prototype.calcIconInfo=function(t,i,e){function s(t,i){if(t)for(var s in t)switch(s){case"faChar":i.faChar=h(t.faChar);break;default:e&&0===s.indexOf("icon_")?(console.log("Deprecated flag property:  "+s),i[s.split("icon_")[1]]=t[s]):i[s]=t[s]}}var a={};if(i&&i[t.fieldid]&&t.valuemappings){var o=t.valuemappings[i[t.fieldid]];s(o,a)}for(var r in a)return a;return null},_.prototype.doMapAll=function(t){function i(t,i){var e="uid_"+t[0],r=a[e];if(!r&&i){r=(new n.Vertex).faChar(s.icon&&s.icon.faChar?h(s.icon.faChar):"").text(t[1]?t[1]:"").data(t),r.__hpcc_uid=t[0],a[e]=r,o.push(r);var u=s.calcIconInfo(s.visualization.icon,i,!1);if(u)for(var p in u)r[p]&&r[p](u[p]);var c=[];s.visualization.flags.forEach(function(t){var e=s.calcIconInfo(t,i,!0);e&&c.push(e)}),r.annotationIcons(c)}return r}var e=t.jsonObj(),s=this,a={},o=[],r=this.visualization.widget,n=r.chart(),u=[];return e.forEach(function(t){var e=s.doMap(t);i(e,t)}),e.forEach(function(t){var e=s.doMap(t),a=i(e,t);if(t[s.link.childfile]&&t[s.link.childfile]instanceof Array){var o=t[s.link.childfile];o.forEach(function(t,e){var o=s.linkMappings.doMap(t),r=i(o);if(r&&a.id()!==r.id()){var p=(new n.Edge).sourceVertex(a).targetVertex(r).sourceMarker("circle").targetMarker("arrow").text(o[1]?o[1]:"").data(o);u.push(p)}})}}),{vertices:o,edges:u,merge:!1}},w.prototype.getQualifiedID=function(){return this.visualization.getQualifiedID()+"."+this._id},w.prototype.exists=function(){return this._id},w.prototype.getDatasource=function(){return this.visualization.dashboard.getDatasource(this._id)},w.prototype.getOutput=function(){var t=this.getDatasource();return t&&t._outputs?t._outputs[this._output]:null},w.prototype.hasData=function(){return this.getOutput().db?!0:!1},w.prototype.getFields=function(){return this.mappings.getFields()},w.prototype.getColumnsRHS=function(){return this.mappings.columnsRHS},w.prototype.getColumnsRHSIdx=function(){return this.mappings.columnsRHSIdx},w.prototype.getColumns=function(){return this.mappings&&this.mappings.columns?this.mappings.columns:[]},w.prototype.getData=function(){var t=this.getOutput().db,i=this.mappings.doMapAll(t);return i.length&&this.sort&&s.multiSort(i,t.hipieMapSortArray(this.sort)),this.reverse&&i.reverse(),this.first&&i.length>this.first&&(i.length=this.first),i},w.prototype.getXTitle=function(){return this.mappings.columns[0]},w.prototype.getYTitle=function(){return this.mappings.columns.filter(function(t,i){return i>0}).join(" / ")},w.prototype.getMap=function(t){return this.mappings&&this.mappings.hasMappings?this.mappings.getMap(t):t},w.prototype.getReverseMap=function(t){return this.mappings&&this.mappings.hasMappings?this.mappings.getReverseMap(t):t},z.prototype.getDatasource=function(){return this.dashboard.getDatasource(this._datasource)},z.prototype.getVisualization=function(){return this.dashboard.getVisualization(this._visualization)},z.prototype.mapData=function(t){var i={};if(t)for(var e in this._mappings){var s=this.getReverseMap(e);i[this._mappings[e]]=t[s]}return i},z.prototype.getMap=function(t){return this.event.visualization.source.getMap(t)},z.prototype.getReverseMap=function(t){return this.event.visualization.source.getReverseMap(t)},z.prototype.mapSelected=function(){return this.event.visualization.hasSelection()?this.mapData(this.event.visualization._widgetState.row):this.mapData({})},z.prototype.calcRequestFor=function(t){var i={},e=this.getVisualization();return e.getInputVisualizations().forEach(function(s,a){var o=s===t;s.getUpdatesForVisualization(e).forEach(function(t){var e=t.mapSelected();for(var s in e)i[s]&&i[s]!==e[s]?(console.log("Duplicate Filter with mismatched value (defaulting to 'first' or 'first changed' instance):  "+s),o&&(i[s]=e[s],i[s+q]=o)):(i[s]=e[s],i[s+q]=o)})}),i},D.prototype.exists=function(){return this._updates.length},D.prototype.getUpdates=function(){return this._updates.filter(function(t){return t._col?t._col===t.getMap(this.visualization._widgetState.col):!0},this)},D.prototype.getUpdatesDatasources=function(){var t={},i=[];return this.getUpdatesVisualizations().forEach(function(e,s){var a=e.source.getDatasource();a&&!t[a.id]&&(t[a.id]=!0,i.push(a))},this),i},D.prototype.getUpdatesVisualizations=function(){var t={},i=[];return this._updates.forEach(function(e,s){var a=e.getVisualization();t[a.id]||(t[a.id]=!0,i.push(a))},this),i},D.prototype.fetchData=function(){var t=new E;return this.getUpdates().forEach(function(i){t.appendRequest(i.getDatasource(),i.calcRequestFor(this.visualization),i.getVisualization())},this),t.fetchData()},b.prototype.setWidget=function(t){var i=this;for(var e in this.events)t["vertex_"+e]?t["vertex_"+e]=function(t,s,a){i.visualization.processEvent(e,i.events[e],t,s,a)}:t[e]&&(t[e]=function(t,s,a){i.visualization.processEvent(e,i.events[e],t,s,a)})},b.prototype.exists=function(){return void 0!==this._updates},b.prototype.getUpdates=function(){var t=[];for(var i in this.events)t=t.concat(this.events[i].getUpdates());return t},b.prototype.getUpdatesDatasources=function(){var t=[];for(var i in this.events)t=t.concat(this.events[i].getUpdatesDatasources());return t},b.prototype.getUpdatesVisualizations=function(){var t=[];for(var i in this.events)t=t.concat(this.events[i].getUpdatesVisualizations());return t},I.prototype=Object.create(i.prototype),I.prototype.constructor=I,I.prototype.id=function(){return this._id},I.prototype.label=function(){return this._properties.label||this._label},I.prototype.type=function(){return this._properties.type||""},I.prototype.jsType=function(){return c(this.type())},I.prototype.charttype=function(t){return arguments.length?(this._properties.charttype=t,this):this._properties.charttype||""},I.prototype.localVisualizationID=function(){return this._properties.localVisualizationID||""},I.prototype.enumvals=function(){return this._properties.enumvals},I.prototype.hasDefault=function(){return void 0!==this["default"]()},I.prototype["default"]=function(){return"range"===this.type()?this._properties["default"]||["",""]:this._properties["default"]instanceof Array&&this._properties["default"].length?this._properties["default"][0]:this._properties["default"]||""},I.prototype.hasFunction=function(){return void 0!==this["function"]()},I.prototype["function"]=function(){return this._properties["function"]},I.prototype.params=function(){var t=[],i=this._properties.params||{};for(var e in i)t.push(i[e]);return t},I.prototype.properties=function(){return this._properties},x.prototype=Object.create(i.prototype),x.prototype.constructor=x,x.prototype.getQualifiedID=function(){return this.id},x.prototype.fields=function(){return this._fields},x.prototype.hasField=function(t){return void 0!==this.field[t]},x.prototype.field=function(t){return this._fieldsMap[t]},x.prototype.loadedPromise=function(){var t=this;return new Promise(function(i,e){var s=setInterval(function(){t.isLoaded()&&(clearInterval(s),i())},100)})},x.prototype.isLoading=function(){return null===this.widget},x.prototype.isLoaded=function(){return this.widget instanceof o},x.prototype.loadMegaChartWidget=function(t,i){this.loadWidgets(["../composite/MegaChart",t],function(t,e){var s=new e[1];t.chartType_default(n.prototype._allChartTypesByClass[s.classID()].id).chart(s),i&&i(t,s,e)})},x.prototype.loadWidget=function(t,i){this.loadWidgets([t],i)},x.prototype.loadWidgets=function(t,i){this.widget=null;var e=this;p(t,function(t){var s=e.dashboard.marshaller.getWidget(e.id);s?(t.prototype._class!==s.classID()&&console.log("Unexpected persisted widget type (old persist string?)"),e.setWidget(s)):e.setWidget(new t),i&&i(e.widget,arguments)})},x.prototype.setWidget=function(t){if(this.widget=t,this.events.setWidget(t),this.widget.columns){var i=this.source.getColumns();this.widget.columns(i,!0)}for(var e in this.properties)switch(t.classID()){case"chart_MultiChart":case"composite_MegaChart":t[e+"_default"]&&t[e+"_default"](this.properties[e]),t.chartTypeDefaults()[e]=this.properties[e];break;default:if(this.widget[e+"_default"])try{this.widget[e+"_default"](this.properties[e])}catch(s){console.log("Invalid Property:"+this.id+".properties."+e)}}return this.widget},x.prototype.accept=function(t){t.visit(this)},x.prototype.getUpdates=function(){return this.events.getUpdates()},x.prototype.getUpdatesForDatasource=function(t){return this.events.getUpdates().filter(function(i){return i.getDatasource()===t})},x.prototype.getUpdatesForVisualization=function(t){return this.events.getUpdates().filter(function(i){return i.getVisualization()===t})},x.prototype.update=function(t){if(!t){var i=[],e={},s=this.getInputVisualizations();s.forEach(function(t){t.hasSelection()&&t.getUpdatesForVisualization(this).forEach(function(t){var s=t.mapSelected();for(var a in s)s[a]&&(e[a]||(e[a]=!0,i.push(s[a])))})},this),t=i.join(", ")}var a=null;if(!this.parentVisualization)for(a=this.widget;a&&!a.title;)a=a.locateParentWidget();var o=this;return new Promise(function(i,e){if(a){var s=a.title(),r=s.split(" (");a.title(r[0]+(t?" ("+t+")":"")).render(function(){i()})}else{for(var n=o;n.parentVisualization;)n=n.parentVisualization;n.widget.render(function(){i()})}o.dashboard.marshaller.propogateClear()&&o.events.getUpdatesVisualizations().forEach(function(t){t.update()})})},x.prototype.notify=function(){if(this.widget){var t=this.source.hasData()?this.source.getData():[];return this.widget.data(t),this.update()}return Promise.resolve()},x.prototype.clear=function(){this._widgetState={row:{},selected:!1},this.fields().forEach(function(t){t.hasDefault()&&(this._widgetState.row[t.id()]=t["default"](),this._widgetState.selected=!0)},this),this.widget&&this.dashboard.marshaller.clearDataOnUpdate()&&this.widget.data([]),this.dashboard.marshaller.propogateClear()&&this.events.getUpdatesVisualizations().forEach(function(t){t.clear()})},x.prototype.on=function(t,i){var e=this;return this.overrideMethod(t,function(t,s){t.apply(e,s),setTimeout(function(){i.apply(e,s)},0)}),this},x.prototype.calcRequestFor=function(t){var i={};return this.getUpdatesForVisualization(t).forEach(function(e){i=e.calcRequestFor(t)}),i},x.prototype.processEvent=function(t,i,e,s,a){this._widgetState={row:e,col:s,selected:void 0===a?!0:a};var o=this;setTimeout(function(){i.fetchData().then(function(i){o.dashboard.marshaller.vizEvent(o.widget,"post_"+t,e,s,a)})},0)},x.prototype.hasSelection=function(){return this._widgetState&&this._widgetState.selected},x.prototype.selection=function(){return this.hasSelection()?this._widgetState.row:null},x.prototype.reverseMappedSelection=function(){return this.hasSelection()?this.source.mappings?this.source.mappings.doReverseMap(this._widgetState.row):this._widgetState.row:null},x.prototype.getInputVisualizations=function(){return this.dashboard.marshaller.getVisualizationArray().filter(function(t){var i=t.events.getUpdatesVisualizations();return i.indexOf(this)>=0?!0:!1},this)},x.prototype.serializeState=function(){var t={widgetState:this._widgetState};return this.widget&&(this.widget.serializeState?t.widget=this.widget.serializeState():this.widget.data&&(t.widget={data:this.widget.data()})),t},x.prototype.deserializeState=function(t){return t&&(this._widgetState=t.widgetState,this.widget&&t.widget&&(this.widget.deserializeState?this.widget.deserializeState(t.widget):this.widget.data&&t.widget.data&&this.widget.data(t.widget.data))),this},R.prototype.calcRequestFieldID=function(){switch(this._requestFieldID=this.fieldid,this._requestMinID=this.minid,this._requestMaxID=this.maxid,this.rule){case"<":case"<=":s.endsWith(this.fieldid,"-max")&&(this._requestFieldID=this.fieldid.substring(0,this.fieldid.length-4)+(this.datasource.isRoxie()?"_max":""));break;case">":case">=":s.endsWith(this.fieldid,"-min")&&(this._requestFieldID=this.fieldid.substring(0,this.fieldid.length-4)+(this.datasource.isRoxie()?"_min":""));break;case"set":s.endsWith(this.fieldid,"-set")&&(this._requestFieldID=this.fieldid.substring(0,this.fieldid.length-4)+(this.datasource.isRoxie()?"_set":""));break;case"range":s.endsWith(this.minid,"-min")&&(this._requestMinID=this.minid.substring(0,this.minid.length-4)+(this.datasource.isRoxie()?"_min":"")),s.endsWith(this.maxid,"-max")&&(this._requestMaxID=this.maxid.substring(0,this.maxid.length-4)+(this.datasource.isRoxie()?"_max":""))}},R.prototype.isRange=function(){return"range"===this.rule},R.prototype.isSet=function(){return"set"===this.rule},R.prototype._calcRequest=function(t,i,e,s,a){this.datasource.isRoxie()||(s=e),t[s+q]=i[e+q]||!1,t[s]!==a&&(t[s]=a)},R.prototype.calcRequest=function(t,i){var e=void 0===i[this.fieldid]?null:i[this.fieldid];this.isRange()?e instanceof Array&&2===e.length&&(this._calcRequest(t,i,this.minid,this._requestMinID,e[0]),this._calcRequest(t,i,this.maxid,this._requestMaxID,e[1])):(this._calcRequest(t,i,this.fieldid,this._requestFieldID,e),this.isSet()&&this.datasource.isRoxie()&&(t[this._requestFieldID+".Item$"]=t[this._requestFieldID],delete t[this._requestFieldID]))},R.prototype.matches=function(t,i){if(void 0===i||null===i||""===i)return this.nullable;var e=t[this._requestFieldID];if(void 0===e&&(e=t[this._requestFieldID.toLowerCase()]),void 0===e)return console.log("Empty cell value:  '"+this._requestFieldID+"'"),!1;switch(this.rule){case"<":return e.localeCompare?e.localeCompare(i)<0:i>e;case">":return e.localeCompare?e.localeCompare(i)>0:e>i;case"<=":return e.localeCompare?e.localeCompare(i)<=0:i>=e;case">=":return e.localeCompare?e.localeCompare(i)>=0:e>=i;case"!=":case"notequals":return e!=i;case"set":return i instanceof Array?i.indexOf(e)>=0:i==e;case"==":return i==e;default:return console.log("Unknown filter rule:  '"+this.rule+"'"),i==e}return!1},M.prototype.getQualifiedID=function(){return this.datasource.getQualifiedID()+"."+this.id},M.prototype.getUpdatesVisualizations=function(){var t=[];return this.notify.forEach(function(i){t.push(this.datasource.marshaller.getVisualization(i))},this),t},M.prototype.accept=function(t){t.visit(this)},M.prototype.vizNotify=function(t){var i=[];return this.notify.filter(function(i){return!t||t.indexOf(i)>=0}).forEach(function(t){var e=this.datasource.marshaller.getVisualization(t);i.push(e.notify())},this),Promise.all(i)},M.prototype.setData=function(t,i){return this.db=(new e.Grid).jsonObj(t),this.vizNotify(i)},S.prototype.appendRequest=function(t,i,e){var s=t.id+"("+JSON.stringify(i)+")";this.datasourceRequests[s]?window.__hpcc_debug&&console.log("Optimized duplicate fetch:  "+s):this.datasourceRequests[s]={updateDatasource:t,request:i,updates:[]};var a=this.datasourceRequests[s];a.updates.indexOf(e.id)<0&&a.updates.push(e.id)},S.prototype.fetchData=function(){var t=[];for(var i in this.datasourceRequests){var e=this.datasourceRequests[i];t.push(e.updateDatasource.fetchData(e.request,e.updates))}return Promise.all(t)},E.prototype.appendRequest=function(t,i,e){if(t&&e){var a=e.id+"("+t.id+")";this.visualizationRequests[a]?window.__hpcc_debug&&console.log("Optimized duplicate fetch:  "+a):this.visualizationRequests[a]={updateVisualization:e,updateDatasource:t,request:{}};var o=this.visualizationRequests[a];s.mixin(o.request,i)}},E.prototype.fetchData=function(){var t=new S;for(var i in this.visualizationRequests){var e=this.visualizationRequests[i];this.skipClear||"GRAPH"===e.updateVisualization.type||e.updateVisualization.clear(),e.updateVisualization.update(U),t.appendRequest(e.updateDatasource,e.request,e.updateVisualization)}return t.fetchData()},A.prototype.isRoxie=function(){return!(this.isWU()||this.isDatabomb())},A.prototype.isWU=function(){return!!this.WUID},A.prototype.isDatabomb=function(){return!!this.databomb},A.prototype.getQualifiedID=function(){return this.id},A.prototype.getOutputs=function(){return this._outputs},A.prototype.getUpdatesVisualizations=function(){var t=[];for(var i in this._outputs)this._outputs[i].getUpdatesVisualizations().forEach(function(i){t.push(i)});return t},A.prototype.accept=function(t){t.visit(this);for(var i in this._outputs)this._outputs[i].accept(t)},A.prototype.calcRequest=function(t){var i={};return this.filters.forEach(function(e){e.calcRequest(i,t)}),this._outputArray.forEach(function(e){e.filters.forEach(function(e){e.calcRequest(i,t)})}),i};var V=0,T=[];return A.prototype.fetchData=function(t,i){var e=++V;T.push(e);var s=this.calcRequest(t);s.refresh=t.refresh||!1,console.log("fetchData:  "+JSON.stringify(i)+"("+JSON.stringify(t)+")");for(var a in s)void 0===s[a]&&delete s[a];var o=Date.now();this.marshaller.commsEvent(this,"request",s);var r=this;return new Promise(function(t,a){r.comms.call(s).then(function(a){var n=JSON.parse(JSON.stringify(a)),u=setInterval(function(){T[0]===e&&Date.now()-o>=500&&(clearTimeout(u),r.processResponse(n,s,i).then(function(){T.shift(),t(n),r.marshaller.commsEvent(r,"response",s,n),++r._loadedCount}))},100)})["catch"](function(t){r.marshaller.commsEvent(r,"error",s,t),a(t)})})},A.prototype.processResponse=function(t,i,e){var a={};for(var o in t)a[o.toLowerCase()]=t[o];var r=[];for(var n in this._outputs){var u=this._outputs[n].from;if(u||(u=this._outputs[n].id.toLowerCase()),s.exists(u,t))!s.exists(u+q,t)||s.exists(u+q,t)&&t[u+q].length&&t[u+q][0][u+q]?r.push(this._outputs[n].setData(t[u],e)):r.push(this._outputs[n].vizNotify(e));else if(s.exists(u,a))console.log("DDL 'Datasource.From' case is Incorrect"),!s.exists(u+q,a)||s.exists(u+q,a)&&t[u+q].length&&a[u+q][0][u+q]?r.push(this._outputs[n].setData(a[u],e)):r.push(this._outputs[n].vizNotify(e));else{var p=[];for(var h in t)p.push(h);console.log("Unable to locate '"+u+"' in response {"+p.join(", ")+"}")}}return Promise.all(r)},A.prototype.isLoaded=function(){return this._loadedCount>0},A.prototype.isRoxie=function(){return!this.WUID&&!this.databomb},A.prototype.serializeState=function(){return{}},A.prototype.deserializeState=function(t){
},C.prototype.createDatasource=function(t){var i=this._datasources[t.id];return i||(i=this.marshaller.createDatasource(t),this._datasources[t.id]=i,this._datasourceArray.push(i)),this._datasourceTotal=this._datasourceArray.length,i},C.prototype.createVisualization=function(t,i){var e=new x(this,t,i);return this._visualizations[t.id]=e,this._visualizationArray.push(e),this.marshaller.appendVisualization(e),e},C.prototype.loadedPromise=function(){return Promise.all(this._visualizationArray.map(function(t){return t.loadedPromise()}))},C.prototype.getQualifiedID=function(){return this.id},C.prototype.getDatasources=function(){return this._datasources},C.prototype.getDatasourceArray=function(){return this._datasourceArray},C.prototype.getDatasource=function(t){return this._datasources[t]||this.marshaller.getDatasource(t)},C.prototype.getDataSourceArray=function(){return this._datasourceArray},C.prototype.getVisualization=function(t){return this._visualizations[t]||this.marshaller.getVisualization(t)},C.prototype.getVisualizations=function(){return this._visualizations},C.prototype.getVisualizationArray=function(){return this._visualizationArray},C.prototype.getVisualizationTotal=function(){return this._visualizationTotal},C.prototype.accept=function(t){t.visit(this);for(var i in this._datasources)this._datasources[i].accept(t);this._visualizationArray.forEach(function(i){i.accept(t)},this)},C.prototype.primeData=function(t){var i=new E(!0);return this.getVisualizationArray().forEach(function(i){if(i.clear(),i.update(),t&&t[i.id]&&s.exists("source.mappings.mappings",i))for(var e in i.source.mappings.mappings)t[i.id][i.source.mappings.mappings[e]]&&(i._widgetState.row[e]=t[i.id][i.source.mappings.mappings[e]],i._widgetState.selected=!0)}),this.getVisualizationArray().forEach(function(t){var e=t.getInputVisualizations(),s=t.source.getDatasource(),a=!1;e.forEach(function(e){if(e.hasSelection()){var o=e.calcRequestFor(t);o.refresh=!0,i.appendRequest(s,o,t),a=!0}}),!a&&(s&&s.isRoxie()||0===e.length)&&i.appendRequest(s,{refresh:!0},t)}),i.fetchData()},C.prototype.serializeState=function(){var t={datasources:{},visualizations:{}};for(var i in this._datasources)t.datasources[i]=this._datasources[i].serializeState();for(var e in this._visualizations)t.visualizations[e]=this._visualizations[e].serializeState();return t},C.prototype.deserializeState=function(t){if(t){for(var i in this._datasources)t.datasources[i]&&this._datasources[i].deserializeState(t.datasources[i]);for(var e in this._visualizations)t.visualizations[e]&&this._visualizations[e].deserializeState(t.visualizations[e])}},O.prototype=Object.create(i.prototype),O.prototype.constructor=O,O.prototype.commsDataLoaded=function(){for(var t=0;t<this.dashboardArray.length;t++)for(var i in this.dashboardArray[t].getDatasources())if(!this.dashboardArray[t].getDatasource(i).isLoaded())return!1;return!0},O.prototype.accept=function(t){t.visit(this),this.dashboardTotal=0;for(var i in this.dashboards)this.dashboards[i].accept(t),++this.dashboardTotal},O.prototype.url=function(t,i){this.espUrl=(new a.ESPUrl).url(t);var e=null,o="HIPIE_DDL";this.espUrl.isWorkunitResult()?(o=this.espUrl.param("ResultName"),e=(new a.HIPIEWorkunit).url(t).proxyMappings(this._proxyMappings).timeout(this._timeout)):e=(new a.HIPIERoxie).url(t).proxyMappings(this._proxyMappings).timeout(this._timeout);var r=this;e.fetchResults().then(function(t){return s.exists(o,t)?e.fetchResult(o).then(function(e){var s=e[0][o];r.parse(s,function(){i(t)})})["catch"](function(t){r.commsEvent(r,"error",o,t)}):void 0})["catch"](function(t){r.commsEvent(r,"error","fetchResults",t)})},O.prototype.proxyMappings=function(t){return arguments.length?(this._proxyMappings=t,this):this._proxyMappings},O.prototype.timeout=function(t){return arguments.length?(this._timeout=t,this):this._timeout},O.prototype.widgetMappings=function(t){return arguments.length?(this._widgetMappings=t,this):this._widgetMappings},O.prototype.clearDataOnUpdate=function(t){return arguments.length?(this._clearDataOnUpdate=t,this):this._clearDataOnUpdate},O.prototype.propogateClear=function(t){return arguments.length?(this._propogateClear=t,this):this._propogateClear},O.prototype.missingDataString=function(t){return arguments.length?(this._missingDataString=t,this):this._missingDataString},O.prototype.parse=function(t,i){var e=this;this._json=t,this._jsonParsed=JSON.parse(this._json),this._datasources={},this._datasourceArray=[],this._jsonParsed.datasources&&this._jsonParsed.datasources.forEach(function(t){e.createDatasource(t)}),this.dashboards={},this.dashboardArray=[],this._visualizations={},this._visualizationArray=[];var s=this._jsonParsed.dashboards||this._jsonParsed;return s.forEach(function(t){var i=new C(e,t,e._proxyMappings,e._timeout);e.dashboards[t.id]=i,e.dashboardArray.push(i)}),this.dashboardTotal=this.dashboardArray.length,this._visualizationArray.forEach(function(t){t.on("processEvent",function(i,s,a,o,r){e.vizEvent(t.widget,i,a,o,r)})}),this._datasourceTotal=this._datasourceArray.length,this.ready(i),this},O.prototype.dashboardsLoaded=function(){return Promise.all(this.dashboardArray.map(function(t){return t.loadedPromise()}))},O.prototype.createDatasource=function(t){var i=this._datasources[t.id];return i||(i=new A(this,t,this._proxyMappings,this._timeout),this._datasources[t.id]=i,this._datasourceArray.push(i)),this._datasourceTotal=this._datasourceArray.length,i},O.prototype.getDatasource=function(t){return this._datasources[t]},O.prototype.getDatasources=function(){return this._datasources},O.prototype.getDatasourceArray=function(){return this._datasourceArray},O.prototype.appendVisualization=function(t){this._visualizations[t.id]=t,this._visualizationArray.push(t)},O.prototype.getVisualization=function(t){return this._visualizations[t]},O.prototype.appendDataSource=function(t){this._datasources[t.id]=t,this._datasourceArray.push(t)},O.prototype.getVisualizations=function(){return this._visualizations},O.prototype.getVisualizationArray=function(){return this._visualizationArray},O.prototype.getWidget=function(t){return this._widgetMappings.get(t)},O.prototype.on=function(t,i){var e=this;return this.overrideMethod(t,function(t,s){var a=t.apply(e,s);return i.apply(e,s)||a}),this},O.prototype.ready=function(t){t&&this.dashboardsLoaded().then(function(){t()})},O.prototype.vizEvent=function(t,i,e,s,a){console.log("Marshaller.vizEvent:  "+t.id()+"-"+i)},O.prototype.commsEvent=function(t,i,e,s){switch(i){case"request":window.__hpcc_debug&&console.log("Marshaller.commsEvent:  "+t.id+"-"+i+":  "+JSON.stringify(e));break;case"response":case"error":window.__hpcc_debug&&console.log("Marshaller.commsEvent:  "+t.id+"-"+i+":  "+JSON.stringify(s));break;default:window.__hpcc_debug&&console.log("Marshaller.commsEvent:  "+JSON.stringify(arguments))}},O.prototype.createDatabomb=function(){var t={};return this.dashboardArray.forEach(function(i){for(var e in i.getDatasources()){var s=i.getDatasource(e).comms;t[e]={};for(var a in s._hipieResults){var o=s._hipieResults[a];t[e][a]=s._resultNameCache[o.from]}}}),t},O.prototype.primeData=function(t){var i=this.dashboardArray.map(function(i){return i.primeData(t)});return Promise.all(i)},O.prototype.serializeState=function(){var t={};return this.dashboardArray.forEach(function(i,e){t[i.id]=i.serializeState()}),t},O.prototype.deserializeState=function(t){return t?(this.dashboardArray.forEach(function(i,e){i.deserializeState(t[i.id])}),this):void 0},{Marshaller:O,Dashboard:C,Datasource:A,Output:M,Visualization:x}});