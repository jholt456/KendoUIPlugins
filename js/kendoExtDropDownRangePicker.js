require('kendoExtDropDown');
require('kendoExtRangePicker');

/// <author>Joshua Holt</author>
(function(kendo, $) {
    // shorten references to variables. this is better for uglification
     var ui = kendo.ui,
        Widget = ui.ExtDropDown;
        CHANGE = "change",
        SELECT = "select";

        var ExtDropDownRangePicker = Widget.extend({
            _uid: null,
            _rangePicker: null,
            _type:"kendoNumericRangePicker",
            _value:null,
            _oldValue:null,
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
                    //change only the value while the user is in the dialog
                    that._value = that._rangePicker.value();

                    //if the drop down is not expanded, we will go ahead an check for changes when the picker changes
                   // that._checkChange();
                    
                });

                that.content(that._rangePicker.element);

                that._value = that.value();
                that._oldValue = that._value;
                that._updateText();
            },
            _setValue:function( val) {
                 var that = this,
                     picker = that._rangePicker;

                if(arguments.length > 0 && picker) {
                    picker.value(val);
                    that._checkChange();
                }
            },
            _getValue:function() {
                 var that = this;
                return that._rangePicker ? that._rangePicker.value() : undefined;
            },
            _checkChange:function() {
                var that = this;
                var oldValue = that._oldValue;
                var current = that._value;

                //this prevents a race issue between the drop down closing, and the range picker's value changing - only fire triggers if the dd is closed
                //if(!that.isOpen()){
                    // if(!current && !oldValue || 
                    //     (current && oldValue && +oldValue.to == +current.to && +oldValue.from == +current.from ) ||
                    //     (current && !oldValue && !current.to && !current.from) || null from/to on new value means no value
                    //     (!current && oldValue && !oldValue.to && !oldValue.from)) /*null from/to on old value means no value*/{
                    //     return; //no change
                    // }
                    // else 
                        if((!current && oldValue && (oldValue.to || oldValue.from)) || 
                            (current && !oldValue && (current.to || current.from)) || 
                            (current && oldValue && (+oldValue.to != +current.to || +oldValue.from != +current.from))) {
                        that._oldValue = that._value;
                        that.trigger(CHANGE);
                    }
                //}
            },
            _closed : function(e) {

                var that = this;

                Widget.fn._closed.call(that, e);

                that._checkChange();
            },
            close : function(e) {
                var that = this;

                Widget.fn.close.call(that, e);
            },
            open : function(e) {

                var that = this;

                Widget.fn.open.call(that, e);

                //capture current value
                that._oldValue = that._value;
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

                if(arguments.length > 0) {
                    that._setValue(val);
                }
                else {
                    return that._getValue();
                }
            }
        });

    ui.plugin(ExtDropDownRangePicker);

})(window.kendo, window.kendo.jQuery);