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
                                     .addClass("btn-secondary")

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


})(window.kendo, window.kendo.jQuery);