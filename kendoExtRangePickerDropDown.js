(function(kendo, $) {
    // shorten references to variables. this is better for uglification
     var kendo = window.kendo,
        ui = kendo.ui,
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
                })

                that.content(that._rangePicker.element);

                that._value = that.value();
                that._tempVal = that._value
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

})(window.kendo, window.kendo.jQuery);