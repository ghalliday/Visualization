!function(o,t){"function"==typeof define&&define.amd?define(["../common/Palette"],t):o.api_I2DChart=t(o.common_Palette)}(this,function(o){function t(){}return t.prototype._palette=o.ordinal("default"),t.prototype.click=function(o,t,n){console.log("Click:  "+JSON.stringify(o)+", "+t+", "+n)},t.prototype.dblclick=function(o,t,n){console.log("Double click:  "+JSON.stringify(o)+", "+t+", "+n)},t});