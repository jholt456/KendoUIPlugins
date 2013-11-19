
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
})(jQuery);