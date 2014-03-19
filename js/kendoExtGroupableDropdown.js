(function(kendo, $) {
    var ui = kendo.ui,
        Widget = ui.DropDownList,
        CHANGE = "change";

    var GroupableDropDownList = Widget.extend({
        _uid: null,
        _type: "kendoGroupableDropDownList",
        init: function(element, options) {
            var that = this;

            kendo.ui.DropDownList.fn.init.call(that, element, options);

            // Generate a unique id.
            that._uid = new Date().getTime();

            that.template = kendo.template(that.options.template || that.templateBuilder);

            that._dataSource();

        },
        templateBuilder: function(data) {

            var that = this;
            var o,
                e = kendo.htmlEncode;

            //data.load();

            if (data.hasChildren) {
                data.load();

                o = '<li tabindex="-1" role="option-group" unselectable="on" class="k-item">';
                o += (e(data.categoryName));
                o += "<ul>";
                o += kendo.ui.GroupableDropDownList.fn.templateBuilder(data.children.data());
                o += "</ul>";

                o += "</li>";
            } else {
                o = '<li tabindex="-1" role="option" unselectable="on" class="k-item">' + (e(data.categoryName)) + '</li>';
            }
            return o;
        },

        options: {
            name: "GroupableDropDownList",
            autoBind: true,
            template: ""
        },

        refresh: function() {
            var that = this;
            kendo.ui.DropDownList.fn.refresh.call(that);
        },

        _dataSource: function() {

            var that = this;

            // returns the datasource OR creates one if using array or configuration object
            that.dataSource = kendo.data.HierarchicalDataSource.create(that.options.dataSource);

            // bind to the change event to refresh the widget
            that.dataSource.bind(CHANGE, function() {
                that.refresh();
            });

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }
        }

    });

    ui.plugin(GroupableDropDownList);

})(window.kendo, window.kendo.jQuery);