
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

            that._contentWrapper = $(kendo.format("<div id='extDropDownContentWrapper{0}' class='k-widget k-popup k-list-container' style='z-index:1000000;'/>", 
                                         that._uid));

            var wrapper = that._contentWrapper;

            //set content wrapper width if provided, otherwise try to set it to a width provided for the drop down
            wrapper.width(that.options.dropDownContentWidth || that.options.dropDownWidth || "");
           
            //set wrapper content 
            that.content(that.options.content);
            that._element = $(element);

            //create drop down place holder
            var ddPlaceHolder = $(kendo.format("<input id='extDropDown{0}' class='k-ext-dropdown'/>", that._uid));
            that._element.append(ddPlaceHolder);

            // Append the html to the "root" element for the DropDownList .
            that._element.append(that._contentWrapper);

            // Create the DropDownList.
            that._dropdown = ddPlaceHolder.kendoDropDownList({
                dataSource: [{ text: "", value: "" }],
                dataTextField: "text",
                dataValueField: "value",
                open: function (e) {
                    //to prevent the dropdown from opening or closing.
                    e.preventDefault();
                    if(!that.isOpen()) {
                        that.open(e);
                    }
                }
            }).data("kendoDropDownList");

            // If a width has been provided, then set the new width.
            if (that.options.dropDownWidth) {
                that._dropdown._focused.width(that.options.dropDownWidth);
            }

            wrapper.hide()
                   .css({
                            "position": "absolute"
                        })
                    .on("mousedown", function(e) {
                       // e.preventDefault();
                        
                         e.stopPropagation();
                    });

            that._updateText();
            that.trigger(INIT);
        },
        formatDisplayText : function() {
            return this.value() || "";
        },
        dropDownList: function () {
            /// <summary>
            /// Return a reference to the DropDownList widget.
            /// </summary>

            return this._dropdown;
        },
        _updateText:function() {
            var that = this;
            that._dropdown.text(that.options.displayFormatter ? that.options.displayFormatter() : that.formatDisplayText());
        },
        isOpen:function() {
            return this._contentWrapper.hasClass(this._visibleClass);
        },
        _opened:function(e) {
            var that = this,
                wrapper = that._contentWrapper;

            that._dropdown.close();

            wrapper.addClass(that._visibleClass);
            $(document).on('mousedown', $.proxy(that.close, that));
            
            that.trigger(OPEN);
        },
        open : function(e) {
            var that = this;

            if(e) {
                //to prevent the dropdown from opening or closing.
                e.preventDefault();
            }

            var wrapper = that._contentWrapper;
            if (!wrapper.hasClass(that._visibleClass)) {
               
                // If the content is not visible, then make it visible.
                var $dropdownRootElem = $(that._dropdown.element).closest("span.k-dropdown");

                // Position the grid so that it is below the dropdown.
                wrapper.css({
                    "top": $dropdownRootElem.position().top + $dropdownRootElem.height(),
                    "left": $dropdownRootElem.position().left
                });
               
                wrapper.slideToggle('fast', $.proxy(that._opened, that));
            }
        },
        _closed:function(e) {
             var that = this,
                  wrapper = that._contentWrapper;
            wrapper.removeClass(that._visibleClass);
             
             $(document).off('mousedown', this.close);
             that._updateText();
            
             that.trigger(CLOSE);
        },
        close: function(e) {
            var that = this;
            
            var wrapper = that._contentWrapper;

            if (wrapper.hasClass(that._visibleClass)) {
                
                wrapper.slideToggle('fast', $.proxy(that._closed, that));
            }
        },
        value: function(val) {

            var that = this;

            //if(arguments.length === 0) {
                return that.options.valueProvider ? that.options.valueProvider(val) : undefined;
            //}
        },
        content: function (newContent) {
            var that = this;
            if(arguments.length > 0) {
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

})(window.kendo, window.kendo.jQuery);