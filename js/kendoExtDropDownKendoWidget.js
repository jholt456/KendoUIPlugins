require("kendoExtDropDown");

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

                return that._widget.value ? that._widget.value(val) : 
                                        that._widget.select ? that._widget.select(val) : 
                                                              $.noop();
            }
        });

    ui.plugin(ExtDropDownKendoWidget);

})(window.kendo, window.kendo.jQuery);