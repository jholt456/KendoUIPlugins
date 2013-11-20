!function(a,b){var c=a.ui,d=c.Widget,e="init",f="open",g="close",h="change",i=d.extend({_visibleClass:"k-custom-visible",_uid:null,_dropdown:null,_element:null,_content:null,init:function(c,f){var g=this;d.fn.init.call(g,c,f),g._uid=(new Date).getTime(),g._contentWrapper=b(a.format("<div id='extDropDownContentWrapper{0}' class='k-widget k-popup k-list-container' style='z-index:1;'/>",g._uid));var h=g._contentWrapper;h.width(g.options.dropDownContentWidth||g.options.dropDownWidth||""),g.content(g.options.content),g._element=b(c);var i=b(a.format("<input id='extDropDown{0}' class='k-ext-dropdown'/>",g._uid));g._element.append(i),g._element.append(g._contentWrapper),g._dropdown=i.kendoDropDownList({dataSource:[{text:"",value:""}],dataTextField:"text",dataValueField:"value",open:function(a){a.preventDefault(),g.isOpen()||g.open(a)}}).data("kendoDropDownList"),g.options.dropDownWidth&&g._dropdown._focused.width(g.options.dropDownWidth),h.hide().css({position:"absolute"}).on("mousedown",function(a){a.stopPropagation()}),g.trigger(e)},formatDisplayText:function(){return this.value()||""},dropDownList:function(){return this._dropdown},_updateText:function(){var a=this;a._dropdown.text(a.options.displayFormatter?a.options.displayFormatter():a.formatDisplayText())},isOpen:function(){return this._contentWrapper.hasClass(this._visibleClass)},_opened:function(){var a=this,c=a._contentWrapper;a._dropdown.close(),c.addClass(a._visibleClass),b(document).on("mousedown",b.proxy(a.close,a)),a.trigger(f)},open:function(a){var c=this;a&&a.preventDefault();var d=c._contentWrapper;if(!d.hasClass(c._visibleClass)){var e=b(c._dropdown.element).closest("span.k-dropdown");d.css({top:e.position().top+e.height(),left:e.position().left}),d.slideToggle("fast",b.proxy(c._opened,c))}},_closed:function(){var a=this,c=a._contentWrapper;c.removeClass(a._visibleClass),b(document).off("mousedown",this.close),a._updateText(),a.trigger(g)},close:function(){var a=this,c=a._contentWrapper;c.hasClass(a._visibleClass)&&c.slideToggle("fast",b.proxy(a._closed,a))},value:function(a){var b=this;return b.options.valueProvider?b.options.valueProvider(a):void 0},content:function(a){var b=this;return arguments.length>0?(b._contentWrapper.empty(),b._content=a,b._contentWrapper.append(b._content),void 0):this._content},events:[e,g,f,h],options:{name:"ExtDropDown",content:"<em>No Content</em>"}});c.plugin(i)}(window.kendo,window.kendo.jQuery),function(a){var b=window.kendo,c=b.ui,d=c.Widget,e="change",f=d.extend({_from:null,_to:null,_uid:null,_value:null,init:function(b,c){var f=this;d.fn.init.call(f,b,c),f._uid=(new Date).getTime();var g=f.settings.template||"<input/>",h=a(g),i=a(g);f.element.append(h).append(f.options.seperator).append(i);var j=function(){var a=f._getValue(),b=a.from,c=a.to;if(b&&c&&b>c){var d=c;c=b,b=d}f.options.allowOpenEnd||(b&&!c&&(c=b),c&&!b&&(b=c)),f._setValue({from:b,to:c}),f.trigger(e)},k=a.extend({},f.options.fromPickerOptions,f.options.defaultPickerOptions),l=a.extend({},f.options.toPickerOptions,f.options.defaultPickerOptions);l=a.extend({change:j},l),k=a.extend({change:j},k);var m=f.settings.type;f._from=h[m](k).data(m),f._to=i[m](l).data(m),f._value=f.value()},settings:{template:"<input/>",type:"kendoDatePicker"},options:{name:"RangePicker",seperator:" - ",defaultPickerOptions:{},fromPickerOptions:{},toPickerOptions:{},allowOpenEnd:!0},events:[e],_getValue:function(){var a=this;return{from:a._from.value(),to:a._to.value()}},_setValue:function(a){var b=this,c=b._getValue();(a||c)&&(!a&&c?(b._from.value(""),b._to.value(""),b.trigger(e)):(a&&!c||+a.to!=+c.to||+a.from!=+c.from)&&(b._from.value(a.from),b._to.value(a.to),b.trigger(e)))},value:function(a){var b=this;return arguments.length>0?(b._setValue(a),void 0):b._getValue()}});c.plugin(f)}(jQuery),function(a,b){var c=a.ui,d=c.ExtDropDown;CHANGE="change",SELECT="select";var e=d.extend({_uid:null,_rangePicker:null,_type:"kendoNumericRangePicker",_value:null,_oldValue:null,init:function(a,b){var c=this;c._uid=(new Date).getTime(),d.fn.init.call(c,a,b),c._create()},_create:function(){var c=this;c._rangePicker=b(a.format('<div id="rangePicker{0}" />',c._uid))[c._type](c.options.pickerOptions).data(c._type),c._rangePicker.bind(CHANGE,function(){c._value=c._rangePicker.value()}),c.content(c._rangePicker.element),c._value=c.value(),c._oldValue=c._value,c._updateText()},_setValue:function(a){var b=this,c=b._rangePicker;arguments.length>0&&c&&(c.value(a),b._checkChange())},_getValue:function(){var a=this;return a._rangePicker?a._rangePicker.value():void 0},_checkChange:function(){var a=this,b=a._oldValue,c=a._value;(!c&&b&&(b.to||b.from)||c&&!b&&(c.to||c.from)||c&&b&&(+b.to!=+c.to||+b.from!=+c.from))&&(a._oldValue=a._value,a.trigger(CHANGE))},_closed:function(a){var b=this;d.fn._closed.call(b,a),b._checkChange()},close:function(a){var b=this;d.fn.close.call(b,a)},open:function(a){var b=this;d.fn.open.call(b,a),b._oldValue=b._value},formatDisplayText:function(){var b=this,c=b.value();if(c&&(c.from||c.to)){var d="",e=" - ",f="{0}{1}{2}{3}";return c.from&&!c.to?(d+="On or After ",e=" "):c.to&&!c.from?(d+="On or Before ",e=" "):+c.to==+c.from&&(d="On ",e=" ",c.from=null),a.format(f,d,a.toString(c.from,b.options.format)||"",e,a.toString(c.to,b.options.format)||"")}return""},options:{name:"ExtDropDownRangePicker"},events:[CHANGE],value:function(a){var b=this;return arguments.length>0?(b._setValue(a),void 0):b._getValue()}});c.plugin(e)}(window.kendo,window.kendo.jQuery),function(a,b){var c=a.ui,d=c.ExtDropDownRangePicker,e="change",f=d.extend({_uid:null,_calendarRange:null,init:function(a,b){var c=this;d.fn.init.call(c,a,b),c._uid=(new Date).getTime()},_isFunction:function(a){var b={};return a&&"[object Function]"===b.toString.call(a)},_create:function(){var c=this,d="kendoDateRangePicker",f="kendoCalendarRangePicker";c._rangePicker=b(a.format('<div id="dateRangePicker{0}" />',c._uid))[d](c.options.pickerOptions).data(d),c._calendarRange=b(a.format('<div id="calendarRangePicker{0}" />',c._uid))[f](c.options.pickerOptions).data(f),c._rangePicker.bind(e,function(a){c._calendarRange.value(a.sender.value()),c._value=a.sender.value()}),c._calendarRange.bind(e,function(a){c._rangePicker.value(a.sender.value()),c._value=a.sender.value()});var g=b("<button>"),h=b("<button>");g.text("Accept").addClass("k-button").css({position:"absolute",bottom:"5px"}).addClass("btn-success"),h.text("Cancel").addClass("k-button").css({position:"absolute",bottom:"5px",right:"5px"}).addClass("btn-secondary"),h.on("click",function(){c._calendarRange._setValue(c._oldValue),c._rangePicker._setValue(c._oldValue),c.close()}),g.on("click",function(){c.close()}),c.content(" ");var i=b("<div/>"),j=b("<div/>");if(i.append(c._rangePicker.element),c.options.ranges&&c.options.ranges.length>0){for(var k=b("<div/>"),l=function(){var a=c.options.ranges[b(this).data("range-idx")].value,d=a.from&&c._isFunction(a.from)?a.from():a.from,e=a.to&&c._isFunction(a.to)?a.to():a.to;c._rangePicker.value({from:d,to:e})},m=0;m<c.options.ranges.length;m++){var n=c.options.ranges[m],o=b("<button>").addClass("btn range").data("range-idx",m);o.text(n.text||""),o.on("click",l),k.append(o)}i.append(k)}i.css({"float":"left",width:"200px",margin:"5px",height:"227px",position:"relative"}),j.css({"float":"right",width:"410px",margin:"5px"}),j.append(c._calendarRange.element),c._contentWrapper.append(i),c._contentWrapper.append(j),i.append(g),i.append(h),c._value=c.value(),c._oldValue=c._value,c._updateText()},events:[e],options:{name:"ExtDateRangePicker",pickerOptions:{allowOpenEnd:!1,seperator:""},format:"M/d/yyyy"}});c.plugin(f)}(window.kendo,window.kendo.jQuery),function(a,b){var c=a.ui,d=c.ExtDropDown;CHANGE="change",SELECT="select";var e=d.extend({_uid:null,_widget:null,_type:"kendoNumericRangePicker",_tempVal:null,_value:null,init:function(a,b){var c=this;c._uid=(new Date).getTime(),d.fn.init.call(c,a,b),c._create()},_create:function(){var a=this;a._widget=a._isFunction(a.options.widget)?a.options.widget():a.options.widget,a._widget.bind(CHANGE,function(b){a._tempVal=a._widget.value?a._widget.value():a._widget.dataItem&&b.node?a._widget.dataItem(b.node):b.node?b.node.text():a._widget.select?a._widget.select():"",a.trigger(CHANGE,b)}),a._widget.bind(SELECT,function(b){a._value=a._widget.value?a._widget.value():a._widget.dataItem&&b.node?a._widget.dataItem(b.node):b.node?b.node.text():a._widget.select?a._widget.select():"",a.trigger(SELECT,b)}),a.content(a._widget.element),a._value=a.value(),a._tempVal=a._value},_isFunction:function(a){var b={};return a&&"[object Function]"===b.toString.call(a)},formatDisplayText:function(){var a=this,b=a.value();return a.options.valueFormatter?a.options.valueFormatter(b):b.text?b.text:b},options:{name:"ExtDropDownKendoWidget"},events:[CHANGE],value:function(a){var c=this;return 0===arguments.length?c._widget.value?c._widget.value():c._widget.dataItem&&c._widget.select?c._widget.dataItem(c._widget.select()):c._widget.select?c._widget.select():"":c._widget.value?c._widget.value(a):c._widget.select?c._widget.select(a):b.noop()}});c.plugin(e)}(window.kendo,window.kendo.jQuery),function(a){var b=a.ui,c=b.ExtDropDownRangePicker,d=c.extend({_type:"kendoDateRangePicker",init:function(a,b){c.fn.init.call(this,a,b)},options:{name:"ExtDropDownDateRangePicker",format:"M/d/yyyy"}});b.plugin(d);var e=c.extend({_type:"kendoCalendarRangePicker",init:function(a,b){c.fn.init.call(this,a,b)},options:{name:"ExtDropDownCalendarRangePicker",format:"M/d/yyyy"}});b.plugin(e);var f=c.extend({_type:"kendoNumericRangePicker",init:function(a,b){c.fn.init.call(this,a,b)},options:{name:"ExtDropDownNumericRangePicker"}});b.plugin(f)}(window.kendo,window.kendo.jQuery),function(){var a=window.kendo,b=a.ui,c=b.RangePicker,d=c.extend({init:function(a,b){var d=this;c.fn.init.call(d,a,b),d._from.bind("change",function(){d._update()}),d._to.bind("change",function(){d._update()});{var e=d._from.month.content;d._to.month.content}d._from.month.content=function(a){return d._to.value()&&d._from.value()&&a&&a.date>d._from.value()&&a.date<=d._to.value()?d._customStyle(a):e(a)},d._to.month.content=function(a){return d._to.value()&&d._from.value()&&a&&a.date>=d._from.value()&&a.date<d._to.value()?d._customStyle(a):e(a)}},_setValue:function(a){c.fn._setValue.call(this,a),this._update()},_update:function(){var a=this,b=a._from.options.animation,c=a._to.options.animation;a._from.options.animation=!1,a._to.options.animation=!1,a._from.navigate(),a._to.navigate(),a._from.options.animation=b,a._to.options.animation=c},_customStyle:function(a){var b,c=this,d=' class="'+c.options.inRangeClass+' "';return a.cssClass&&(d=a.cssClass.replace('class="',d)),b="<td"+d+' role="gridcell"><a tabindex="-1" class="k-link'+a.linkClass+'" href="'+a.url+'" data-value="'+a.dateString+'" title="'+a.title+'">'+a.value+"</a></td>"},settings:{template:"<div />",type:"kendoCalendar"},options:{name:"CalendarRangePicker",seperator:" ",inRangeClass:"k-state-in-range"}});b.plugin(d);var e=c.extend({init:function(a,b){c.fn.init.call(this,a,b)},settings:{template:"<input/>",type:"kendoNumericTextBox"},options:{name:"NumericRangePicker"}});b.plugin(e);var f=c.extend({init:function(a,b){c.fn.init.call(this,a,b)},settings:{template:"<input/>",type:"kendoDatePicker"},options:{name:"DateRangePicker"}});b.plugin(f)}(jQuery);