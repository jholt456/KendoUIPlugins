require('kendoExtDropDownRangePicker');

/// <author>Joshua Holt</author>
(function(kendo, $) {
    // shorten references to variables. this is better for uglification
    var ui = kendo.ui,
        Widget = ui.ExtDropDownRangePicker,
        CHANGE = "change";

    var ExtDateRangePicker = Widget.extend({
        _uid: null,
        _calendarRange: null,
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            // Generate a unique id.
            that._uid = new Date().getTime();
        },
        _isFunction: function(functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        },
        _create: function() {
            var that = this,
                datePickerType = "kendoDateRangePicker",
                calendarPickerType = "kendoCalendarRangePicker";

            that._rangePicker = $(kendo.format('<div id="dateRangePicker{0}" />', that._uid))[datePickerType](that.options.pickerOptions)
                .data(datePickerType);
            that._calendarRange = $(kendo.format('<div id="calendarRangePicker{0}" />', that._uid))[calendarPickerType](that.options.pickerOptions)
                .data(calendarPickerType);

            that._rangePicker.bind(CHANGE, function(e) {
                that._calendarRange.value(e.sender.value());
                that._value = e.sender.value();
            });

            that._calendarRange.bind(CHANGE, function(e) {
                that._rangePicker.value(e.sender.value());
                that._value = e.sender.value();
            });

            var accept = $("<button>");
            var cancel = $("<button>");

            accept.text(that.options.acceptText)
                .addClass("k-button")
                .addClass("k-primary");

            cancel.text(that.options.cancelText)
                .addClass("k-button")
                .addClass("k-secondary");

            cancel.on("click", function() {
                that._calendarRange._setValue(that._oldValue);
                that._rangePicker._setValue(that._oldValue);
                that.close();
            });


            accept.on("click", function() {
                that.close();
            });

            that.content(" ");

            var left = $("<div/>");
            var right = $("<div/>");

            left.append(that._rangePicker.element);

            if (that.options.ranges && that.options.ranges.length > 0) {
                var ranges = $("<div/>");
                ranges.addClass("k-range-options");
                var handler = function() {
                    var range = that.options.ranges[$(this).data("range-idx")].value;

                    var from = range.from && that._isFunction(range.from) ? range.from() : range.from;
                    var to = range.to && that._isFunction(range.to) ? range.to() : range.to;

                    that._rangePicker.value({
                        from: from,
                        to: to
                    });
                };
                for (var rangeIdx = 0; rangeIdx < that.options.ranges.length; rangeIdx++) {
                    var current = that.options.ranges[rangeIdx];
                    var rangeBtn = $("<button>").addClass("k-button k-range-option").data("range-idx", rangeIdx);
                    rangeBtn.text(current.text || "");
                    rangeBtn.on("click", handler);
                    ranges.append(rangeBtn);
                }
                left.append(ranges);
            }

            right.addClass("calendars");
            left.addClass("options");

            right.append(that._calendarRange.element);
            that._contentWrapper.addClass("k-picker-panel");
            that._contentWrapper.append(left);
            that._contentWrapper.append(right);
            left.append(accept);
            left.append(cancel);

            that.element.addClass("k-date-range-picker");

            that._value = that.value();
            that._oldValue = that._value;
            that._updateText();

        },
        events: [
            CHANGE
        ],
        options: {
            name: "ExtDateRangePicker",
            pickerOptions: {
                allowOpenEnd: false,
                seperator: "",
                defaultPickerOptions: {
                    open: function(e) {
                        e.preventDefault(); //prevent popup opening
                    }
                }
            },
            format: "M/d/yyyy",
            acceptText: "Accept",
            cancelText: "Cancel"
        }
    });

    ui.plugin(ExtDateRangePicker);


})(window.kendo, window.kendo.jQuery);