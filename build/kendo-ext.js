
/// <author>Joshua Holt</author>
(function(kendo, $) {
    // shorten references to variables. this is better for uglification
    var ui = kendo.ui,
        Widget = ui.Widget,
        INIT = "init",
        OPEN = "open",
        CLOSE = "close",    
        CHANGE = "change" ;   

var ExtDropDown = Widget.extend({
        _visibleClass: 'k-custom-visible',
        _uid: null,
        _dropdown: null,
        _element:null,
        _content:null,
        init: function (element, options) {
           
            var that = this;

            Widget.fn.init.call(that, element, options);

            // Generate a unique id.
            that._uid = new Date().getTime();

            that._contentWrapper = $(kendo.format("<div id='extDropDownContentWrapper{0}' class='k-widget k-popup k-list-container' style='z-index:1;'/>", 
                                         that._uid));

            var wrapper = that._contentWrapper;

            //set content wrapper width if provided, otherwise try to set it to a width provided for the drop down
            wrapper.width(that.options.dropDownContentWidth || that.options.dropDownWidth || "");
           
            //set wrapper content 
            that.content(that.options.content);
            that._element = $(element);

            that._element.append(kendo.format("<input id='extDropDown{0}' class='k-ext-dropdown'/>", that._uid));

            // Append the html to the "root" element for the DropDownList .
            that._element.append(that._contentWrapper);

            // Create the DropDownList.
            that._dropdown = $(kendo.format("#extDropDown{0}", that._uid)).kendoDropDownList({
                dataSource: [{ text: "", value: "" }],
                dataTextField: "text",
                dataValueField: "value",
                open: function (e) {
                    //to prevent the dropdown from opening or closing.
                    e.preventDefault();
                    that.open(e);
                }
            }).data("kendoDropDownList");

            // If a width has been provided, then set the new width.
            if (options.dropDownWidth) {
                that._dropdown._focused.width(options.dropDownWidth);
            }

            wrapper.hide()
                   .css({
                            "position": "absolute"
                        })
                    .on("mousedown", function(e) {
                       // e.preventDefault();
                        
                         e.stopPropagation();
                    });

            that.trigger(INIT);
        },
        formatDisplayText : function() {
            return this.value();
        },
        dropDownList: function () {
            /// <summary>
            /// Return a reference to the DropDownList widget.
            /// </summary>

            return this._dropdown;
        },
        open : function(e) {
            var that = this;

            //to prevent the dropdown from opening or closing.
            e.preventDefault();

            var wrapper = that._contentWrapper;
            if (!wrapper.hasClass(that._visibleClass)) {
               
                // If the content is not visible, then make it visible.
                var $dropdownRootElem = $(that._dropdown.element).closest("span.k-dropdown");

                // Position the grid so that it is below the dropdown.
                wrapper.css({
                    "top": $dropdownRootElem.position().top + $dropdownRootElem.height(),
                    "left": $dropdownRootElem.position().left
                });
               
                wrapper.slideToggle('fast', function () {
                    that._dropdown.close();
                    wrapper.addClass(that._visibleClass);
               
                    $(document).on('mousedown', $.proxy(that.close, that));
                    that.trigger(OPEN);
                });
            }
        },
        close: function(e) {
            var that = this;
            
            var wrapper = that._contentWrapper;

            if (wrapper.hasClass(that._visibleClass)) {
                
                wrapper.slideToggle('fast', function () {
                        wrapper.removeClass(that._visibleClass);
                        
                        $(document).off('mousedown', this.close);
                        that._dropdown.text(that.options.displayFormatter ? that.options.displayFormatter() : that.formatDisplayText());
                        that.trigger(CLOSE);
                    });
            }
        },
        value: function(val) {
            var that = this;

            var result =  that.options.valueProvider ? that.options.valueProvider(val) : undefined;
            return result;

        },
        content: function (newContent) {
            var that = this;
            if(newContent) {
                that._contentWrapper.empty(); //probably need to do some tear down
                that._content = newContent;
                that._contentWrapper.append(that._content);

                //  var $content = $(that._content);
                // $content.bind("change", function() {
                //     that.trigger(CHANGE);
                // });
            }
            else {
                /// <summary>
                /// Return a reference to the Grid widget.
                /// </summary>

                return this._content;
            }
        },
        //value : function() {
        //    return null;
        //},
        // events are used by other widgets / developers - API for other purposes
        // these events support MVVM bound items in the template. for loose coupling with MVVM.
        events: [
            // call after mutating DOM
            // traverses DOM and binds ALL THE THINGS
            INIT,
            CLOSE,
            OPEN,
            CHANGE
        ],
        options: {
            name: "ExtDropDown",
            content: "<em>No Content</em>"
        }
    });

    ui.plugin(ExtDropDown);

})(window.kendo, window.kendo.jQuery);;


/// <author>Joshua Holt</author>
(function($) {
    // shorten references to variables. this is better for uglification
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        CHANGE = "change";

    var RangePicker = Widget.extend({
    		_from:null,
    		_to:null,
    		_uid:null,
    		_value:null,
	        init: function(element, options) {

 				var that = this;

	        	// base call to initialize widget
	        	Widget.fn.init.call(that, element, options);

	        	 // Generate a unique id.
	            that._uid = new Date().getTime();
		      
	          	var template = that.settings.template || "<input/>";

	           	var from = $(template);
	           	var to = $(template);

	            // append all elements to the DOM
	            that.element.append(from)
	            			.append(that.options.seperator)
	                        .append(to);

 				 var changeHandler = function(e) {
		    		var val = that._getValue();
 					var fromVal = val.from;
 					var toVal = val.to;

 					//user picked out of range swap it for them
 					if(fromVal && toVal && fromVal > toVal) {
 						var temp = toVal;
 						toVal = fromVal;
 						fromVal = temp;
 					}

 					if(!that.options.allowOpenEnd) {
						if(fromVal && !toVal) {
			 				toVal = fromVal;
			 			}
			 			if(toVal && !fromVal) {
			 				fromVal = toVal;
			 			}
 					}

	     			that._setValue({from:fromVal, to:toVal});

	     			//fire it here since we might be reseting the values
	     			that.trigger(CHANGE);
	        	};

	           	var fromOpts = $.extend({}, that.options.fromPickerOptions, that.options.defaultPickerOptions);
	           	var toOpts = $.extend({}, that.options.toPickerOptions, that.options.defaultPickerOptions);

	           	toOpts = $.extend({change:changeHandler}, toOpts);
	           	fromOpts = $.extend({change:changeHandler}, fromOpts);

	           	var inputType = that.settings.type;

 				that._from = from[inputType](fromOpts).data(inputType);
	            that._to = to[inputType](toOpts).data(inputType);

	            that._value = that.value();
	            
	    	},
	    	settings : {
		        template : "<input/>",
		        type : "kendoDatePicker"
	    	},
	    	options : {
		        name: "RangePicker",
		        seperator: " - ",
		        defaultPickerOptions: {},
		        fromPickerOptions: {},
		        toPickerOptions: {},
	        	allowOpenEnd : true
		    },
		    events : [
		        CHANGE
		    ],
		    _getValue:function() {
		    	var that = this;

	    		return {
	    			from : that._from.value(),
					to : that._to.value()
	    		};
		    },
		    _setValue : function(val) {
		    	var that = this;
		    	
		    	var current = that._getValue();

		    	 if(+val.to != +current.to || +val.from != +current.from ) { 
			    	if(val) {
					    that._from.value(val.from);
					   	that._to.value(val.to);
			    	}
			    	else {
			    		that._from.value("");
			    		that._to.value("");
					}

		            that.trigger(CHANGE);
		        }
		    },
		    value : function(val){
		    	var that = this;
		    	if(val) {
		    		that._setValue(val);
		    	} else {
		    		return that._getValue();
		    	}
		    }	
    });

 ui.plugin(RangePicker);
})(jQuery);;

/// <author>Joshua Holt</author>
(function(kendo, $) {
    // shorten references to variables. this is better for uglification
     var ui = kendo.ui,
        Widget = ui.ExtDropDown;
        CHANGE = "change";

        var ExtDropDownRangePicker = Widget.extend({
            _uid: null,
            _rangePicker: null,
            _type:"kendoNumericRangePicker",
            _tempVal:null,
            _value:null,
            init: function(element, options) {

                var that = this;

                // Generate a unique id.
                that._uid = new Date().getTime();

                Widget.fn.init.call(that, element, options);

                that._create();
            },
            _create : function() {  
                var that = this;
                that._rangePicker = $(kendo.format('<div id="rangePicker{0}" />', that._uid))[that._type](that.options.pickerOptions)
                                        .data(that._type);

                that._rangePicker.bind(CHANGE, function() {
                    //change only the temp value while the user is in the dialog
                    that._tempVal = that._rangePicker.value();
                });

                that.content(that._rangePicker.element);

                that._value = that.value();
                that._tempVal = that._value;
            },
            _checkChange:function() {
                var that = this;
                var temp = that._tempVal;
                var current = that._value;

                if(+temp.to != +current.to || +temp.from != +current.from ) { 
                    that.trigger(CHANGE);
                }
            },
            close : function(e) {

                var that = this;

                Widget.fn.close.call(that, e);

                that._checkChange();
            },
            open : function(e) {

                var that = this;

                Widget.fn.open.call(that, e);

                that._tempVal = that._value;
            },
            formatDisplayText : function () {
                var that = this;

                var val = that.value();
                if(val && (val.from || val.to)) {

                    var display = "";
                    var sep = " - ";
                    var displayTemplate = "{0}{1}{2}{3}";
                    if(val.from && !val.to){
                        display += "On or After ";
                        sep = " ";
                    }
                    else if(val.to && !val.from){
                        display += "On or Before ";
                        sep = " ";
                    }
                    else if( +val.to == +val.from) {
                        display = "On ";
                        sep = " ";
                        val.from = null;
                    }

                    return kendo.format(displayTemplate, display,
                                                       kendo.toString(val.from, that.options.format) || "", 
                                                       sep,
                                                       kendo.toString(val.to, that.options.format) || "");
                }
                return "";      
            },
            options: {
                name: "ExtDropDownRangePicker"
            },
            events:[
                CHANGE
            ],
            value : function(val) {
                var that = this;
                return that._rangePicker.value(val);
            }
        });

    ui.plugin(ExtDropDownRangePicker);

})(window.kendo, window.kendo.jQuery);;

/// <author>Joshua Holt</author>
(function(kendo, $) {
    // shorten references to variables. this is better for uglification
     var ui = kendo.ui,
         Widget = ui.ExtDropDownRangePicker,
         CHANGE = "change";

        var ExtDateRangePicker = Widget.extend({
            _uid: null,
            _calendarRange :null,
            init: function(element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);

                // Generate a unique id.
                that._uid = new Date().getTime();
            },
             _isFunction : function(functionToCheck) {
                 var getType = {};
                 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
            },
            _create : function() {
                var that = this;

                var datePickerType = "kendoDateRangePicker",
                    calendarPickerType = "kendoCalendarRangePicker";

                that._rangePicker = $(kendo.format('<div id="dateRangePicker{0}" />', that._uid))[datePickerType](that.options.pickerOptions)
                                        .data(datePickerType);
                that._calendarRange = $(kendo.format('<div id="calendarRangePicker{0}" />', that._uid))[calendarPickerType](that.options.pickerOptions)
                                        .data(calendarPickerType);

                that._rangePicker.bind(CHANGE, function(e) {
                    that._calendarRange.value(e.sender.value());
                    that._tempValue = e.sender.value();
                });

                that._calendarRange.bind(CHANGE, function(e) {
                    that._rangePicker.value(e.sender.value());
                    that._tempValue = e.sender.value();
                });

                var accept = $("<button>");
                var cancel = $("<button>");

                accept.text("Accept").addClass("k-button")
                                    .css({"position":"absolute", "bottom": "5px"  })
                                     .addClass("btn-success");

                cancel.text("Cancel").addClass("k-button")
                                     .css({"position":"absolute", "bottom": "5px", "right":"5px" })
                                     .addClass("btn-secondary");

                cancel.on("click", function() {
                    that._calendarRange._setValue(that._value);
                    that._rangePicker._setValue(that._value);
                    that.close();
                });


                accept.on("click", function() {
                   that._value = that._rangePicker.value();
                   that.close();
                });

                that.content(" ");

                var left = $("<div/>");
                var right = $("<div/>");
             
                left.append(that._rangePicker.element);

                if(that.options.ranges && that.options.ranges.length > 0) {
                    var ranges = $("<div/>");
                    var handler = function() {
                            var range = that.options.ranges[$(this).data("range-idx")].value;

                            var from = range.from && that._isFunction(range.from) ? range.from() : range.from;
                            var to = range.to && that._isFunction(range.to) ? range.to() : range.to;
                           
                            that.value({from:from, to:to});
                        };
                    for(var rangeIdx = 0; rangeIdx < that.options.ranges.length; rangeIdx++) {
                        var current = that.options.ranges[rangeIdx];
                        var rangeBtn = $("<button>").addClass("btn range").data("range-idx", rangeIdx);
                        rangeBtn.text(current.text || "");
                        rangeBtn.on("click", handler);
                        ranges.append(rangeBtn);
                    }
                    left.append(ranges);
                }
                left.css({"float":"left", "width":"200px", "margin":"5px", "height":"227px", "position":"relative"});
                right.css({"float":"right", "width":"410px", "margin":"5px"});
                right.append(that._calendarRange.element);
                that._contentWrapper.append(left);
                that._contentWrapper.append(right);
                left.append(accept);
                left.append(cancel);

                that._value = that.value();
            },
            events:[
                CHANGE
            ],
            options: {
                name: "ExtDateRangePicker",
                pickerOptions: { allowOpenEnd:false, seperator: "" },
                format: "M/d/yyyy"
            }
        });

    ui.plugin(ExtDateRangePicker);


})(window.kendo, window.kendo.jQuery);;

/// <author>Joshua Holt</author>
(function(kendo, $) {
    // shorten references to variables. this is better for uglification
     var ui = kendo.ui,
        Widget = ui.ExtDropDown;
        CHANGE = "change",
        SELECT = "select";

        var ExtDropDownKendoWidget = Widget.extend({
            _uid: null,
            _widget: null,
            _type:"kendoNumericRangePicker",
            _tempVal:null,
            _value:null,
            init: function(element, options) {

                var that = this;

                // Generate a unique id.
                that._uid = new Date().getTime();

                Widget.fn.init.call(that, element, options);

                that._create();
            },
            _create : function() {  
                var that = this;
                that._widget = that._isFunction(that.options.widget) ? that.options.widget() : that.options.widget;


                that._widget.bind(CHANGE, function(e) {
                    //change only the temp value while the user is in the dialog
                    that._tempVal = that._widget.value ? that._widget.value() : 
                                                         that._widget.dataItem && e.node ? that._widget.dataItem(e.node) :
                                                                                e.node ? e.node.text() : 
                                                                                        that._widget.select? that._widget.select() : "";
                    that.trigger(CHANGE, e);
                });

                 that._widget.bind(SELECT, function(e) {
                    //change only the temp value while the user is in the dialog
                    that._value = that._widget.value ? that._widget.value() : 
                                                        that._widget.dataItem && e.node ? that._widget.dataItem(e.node) :
                                                                                e.node ? e.node.text() : 
                                                                                        that._widget.select? that._widget.select() : "";
                    that.trigger(SELECT, e);
                });


                that.content(that._widget.element);

                that._value = that.value();
                that._tempVal = that._value;
            },
            _isFunction : function(functionToCheck) {
             var getType = {};
             return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
            },
            formatDisplayText : function () {
                var that = this;

                var val = that.value();
                if(that.options.valueFormatter) {

                  return  that.options.valueFormatter(val);
                }

                return val.text? val.text : val;      
            },
            options: {
                name: "ExtDropDownKendoWidget"
            },
            events:[
                CHANGE
            ],
            value : function(val) {
                var that = this;

                if(arguments.length === 0) {
                    return that._widget.value ? that._widget.value() : 
                                                that._widget.dataItem && that._widget.select ? that._widget.dataItem(that._widget.select()) :
                                                                                               that._widget.select ? that._widget.select() : "";
                     
                }
                  that._widget.value ? that._widget.value(val) : that._widget.select ? that._widget.select(val) : "";
            }
        });

    ui.plugin(ExtDropDownKendoWidget);

})(window.kendo, window.kendo.jQuery);;

/// <author>Joshua Holt</author>
(function(kendo, $) {
    // shorten references to variables. this is better for uglification
    var ui = kendo.ui,
        Widget = ui.ExtDropDownRangePicker;

    var ExtDropDownDateRangePicker = Widget.extend({
                                                        _type: "kendoDateRangePicker",
                                                        init: function(element, options) {
                                                            Widget.fn.init.call(this, element, options);
                                                        },
                                                        options: {
                                                            name: "ExtDropDownDateRangePicker",
                                                            format: "M/d/yyyy"
                                                        }
                                                    });
    ui.plugin(ExtDropDownDateRangePicker);

    var ExtDropDownCalendarRangePicker = Widget.extend({	
    														_type: "kendoCalendarRangePicker",
                                                            init: function(element, options) {
                                                                Widget.fn.init.call(this, element, options);
                                                            },
                                                            options: {
                                                                name: "ExtDropDownCalendarRangePicker",
                                                                format: "M/d/yyyy"
                                                            }
                                                        });
    ui.plugin(ExtDropDownCalendarRangePicker);

    var ExtDropDownNumericRangePicker = Widget.extend({
                                                            _type: "kendoNumericRangePicker",
                                                            init: function(element, options) {
                                                                Widget.fn.init.call(this, element, options);
                                                            },
                                                            options: {
                                                                name: "ExtDropDownNumericRangePicker"
                                                            }
                                                        });
    ui.plugin(ExtDropDownNumericRangePicker);

    // var ExtDropDownGoogleDateRangePicker = Widget.extend({
    //                                                         _type: "kendoNumericRangePicker",
    //                                                         init: function(element, options) {
    //                                                             Widget.fn.init.call(this, element, options);
    //                                                         },
    //                                                         options: {
    //                                                             name: "ExtDropDownGoogleDateRangePicker",
    //                                                             format: "M/d/yyyy"
    //                                                         }
    //                                                     });
    // ui.plugin(ExtDropDownGoogleDateRangePicker);

})(window.kendo, window.kendo.jQuery);;

/// <author>Joshua Holt</author>

(function($) {
    
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.RangePicker;

    var CalendarRangePicker = Widget.extend({

		init: function(element, options) {

		  	var that = this;

		 	// base call to initialize widget
		 	Widget.fn.init.call(that, element, options);

		 	//bind to the change handlers to force a redraw
		 	that._from.bind("change", 
		 		function(e) {
		 			that._update();
		 		});

		 	that._to.bind("change", 
		 		function(e) {
		 			that._update();
		 		});

		 	//handle custom style for days between selected dates
			var defaultFromContent = that._from.month.content;
			var defaultToContent = that._to.month.content;
		 	that._from.month.content = function(data) {
		 		if(that._to.value() && that._from.value() && data && data.date > that._from.value() && data.date <= that._to.value()) {
		 			return that._customStyle(data);
		 		}
		 		return defaultFromContent(data);
		 	};

		 	that._to.month.content = function(data) {
		 		if(that._to.value() && that._from.value() && data && data.date >= that._from.value() && data.date < that._to.value()) {
		 		
		 			return that._customStyle(data);
		 		}
		 		return defaultFromContent(data);
		 	};
		},
		_setValue : function(val) {
		 	Widget.fn._setValue.call(this, val);
		 	this._update();
		},
		_update : function() {
			var that = this;

			//temporarily disable nav settings while redrawing the selection 
		 	var tempFromAnimation = that._from.options.animation;
		 	var tempToAnimation = that._to.options.animation;

		 	that._from.options.animation = false;
		 	that._to.options.animation = false;

		 	that._from.navigate();
		 	that._to.navigate();

		 	//return animation settings
		 	that._from.options.animation = tempFromAnimation;
		 	that._to.options.animation = tempToAnimation;
		},
		_customStyle : function(data) {
			var that = this;
			var template,
				css = ' class="' + that.options.inRangeClass + ' "';
			if(data.cssClass) {
				//inject our class if there are already styles
				css = data.cssClass.replace('class=\"', css);
			}
			template ='<td'+(css)+' role="gridcell"><a tabindex="-1" class="k-link'+(data.linkClass)+'" href="'+(data.url)+'" data-value="'+(data.dateString)+'" title="'+(data.title)+'">'+(data.value)+'</a></td>';
			return template;
		},
		settings : {
		    template : "<div style=\"height:227px\"/>",
	        type:"kendoCalendar"
	    },
    	options: {
	        name: "CalendarRangePicker",
	        seperator: " ",
	        inRangeClass: "k-state-in-range"
	    }
    });

 	ui.plugin(CalendarRangePicker);

	var NumericRangePicker = Widget.extend({

		init: function(element, options) {
		 	// base call to initialize widget
		 	Widget.fn.init.call(this, element, options);
		},
		settings : {
		    template : "<input/>",
	        type:"kendoNumericTextBox"
	    },
    	options: {
	        name: "NumericRangePicker"
	    }
    });

 	ui.plugin(NumericRangePicker);

 	var DateRangePicker = Widget.extend({

		init: function(element, options) {
		 	// base call to initialize widget
		 	Widget.fn.init.call(this, element, options);
		},
		settings : {
		    template : "<input/>",
	        type:"kendoDatePicker"
	    },
    	options: {
	        name: "DateRangePicker"
	    }
    });

 	ui.plugin(DateRangePicker);
})(jQuery);;