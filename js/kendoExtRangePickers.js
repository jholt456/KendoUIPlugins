require("kendoExtRangePicker");
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
            template : "<div />",
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
})(jQuery);