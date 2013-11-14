
(function(kendo, $) {
    // shorten references to variables. this is better for uglification
    var kendo = window.kendo,
        ui = kendo.ui,
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

    var ExtDropDownCalendarRangePicker = Widget.extend({
                                                            _type: "kendoNumericRangePicker",
                                                            init: function(element, options) {
                                                                Widget.fn.init.call(this, element, options);
                                                            },
                                                            options: {
                                                                name: "ExtDropDownNumericRangePicker"
                                                            }
                                                        });
    ui.plugin(ExtDropDownCalendarRangePicker);

    var ExtDropDownGoogleDateRangePicker = Widget.extend({
                                                            _type: "kendoNumericRangePicker",
                                                            init: function(element, options) {
                                                                Widget.fn.init.call(this, element, options);
                                                            },
                                                            options: {
                                                                name: "ExtDropDownGoogleDateRangePicker",
                                                                format: "M/d/yyyy"
                                                            }
                                                        });
    ui.plugin(ExtDropDownGoogleDateRangePicker);

})(window.kendo, window.kendo.jQuery);