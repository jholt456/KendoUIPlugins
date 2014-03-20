 var views = {};


 $(function() {

     templateLoader.loadExtTemplate("layout", "layouts/main.html").success(function(result) {
         $("body").append(result);


         var router = new kendo.Router();
         var mainModel = kendo.observable({
             isVisible: true,
             onSelect: function(e) {
                 var text = $(e.item).data("route");

                 if (text) {
                     router.navigate(text);
                 }
             }
         });

         var layout = new kendo.Layout('#layout', {
             model: mainModel,
             wrap: false
         });

         layout.render("#app");
         var contentArea = $("#body");


         var changePage = function(route, name, path, isRemoteLoad) {
             layout.showIn(contentArea, views[name]); // switch view

             $(document).trigger("viewSwtichedEvent", {
                 route: route,
                 name: name,
                 path: path,
                 isRemotelyLoaded: isRemoteLoad
             }); // publish event view has been loaded (EventAggregator pattern)
             kendo.fx(contentArea).slideInRight().play().then(function() {
                 //fix issue with alignment
                 document.getElementById('body').style.WebkitTransform = "none";
             }); // transition, slide view back to the right (center)
         };

         var addRoute = function(route, name, path, forceRemoteLoad, model) {
             forceRemoteLoad = typeof forceRemoteLoad !== "undefined" ? forceRemoteLoad : false;
             router.route(route, function() {
                 kendo.fx(contentArea).slideInRight().reverse().then(function() { // transition, slide view left*/

                     ensureView(name, path, model, forceRemoteLoad).then(function(x) {
                         changePage(route, name, path, x);
                     });
                 });
             });
         };

         addRoute("/", "home", "views/home.html");

         //Basic Range Picker
         addRoute("/ExtRangePicker/Date", "date", "views/extRangePicker/date.html");
         addRoute("/ExtRangePicker/Calendar", "calendar", "views/extRangePicker/calendar.html");
         addRoute("/ExtRangePicker/Numeric", "numeric", "views/extRangePicker/numeric.html");


         //Drop down range picker
         addRoute("/ExtDropDown/Numeric", "ext-dd-custom-numeric", "views/extDropDown/numeric.html");
         addRoute("/ExtDropDown/Date", "ext-dd-custom-date", "views/extDropDown/date.html");
         addRoute("/ExtDropDown/Calendar", "ext-dd-custom-calendar", "views/extDropDown/calendar.html");
         addRoute("/ExtDropDown/Grid", "ext-dd-custom-grid", "views/extDropDown/grid.html");
         addRoute("/ExtDropDown/Widget", "ext-dd-widget", "views/extDropDown/widget.html");

         //Drop down range picker
         addRoute("/ExtDropDownRangePickers/Numeric", "ext-dd-numeric", "views/extDropDownRangePickers/numeric.html");
         addRoute("/ExtDropDownRangePickers/Date", "ext-dd-date", "views/extDropDownRangePickers/date.html");
         addRoute("/ExtDropDownRangePickers/Calendar", "ext-dd-calendar", "views/extDropDownRangePickers/calendar.html");
         addRoute("/ExtDropDownRangePickers/AdvancedDatePicker", "ext-dd-ext-date-picker", "views/extDropDownRangePickers/advancedDatePicker.html");

         router.start();
     });

 });


 var templateLoader = (function($, host) {
     return {
         loadExtTemplate: function(name, path) {
             return $.ajax({
                 async: false,
                 url: path,
                 cache: false,

                 error: function(result) {
                     alert("Error Loading View/Template -- TODO: Better Error Handling");
                 }
             });
         }
     };
 })(jQuery, document);


 var ensureView = function(name, path, model, force) {
     var def = $.Deferred();


     if (views[name] === null || force) {
         templateLoader.loadExtTemplate(name, path)
             .success(function(result) {
                 views[name] = new kendo.View($(result), {
                     model: model
                 });

                 def.resolve(true);
             });

     } else {
         def.resolve(false);
     }

     return def.promise();
 };


 function changed(e) {
     console.log("changed (event binding)");
     console.log(e.sender.value());
 }

 function changed2(e) {
     console.log("changed (options bound)");
     console.log(e.sender.value());
 }

 function formatValue(val, format) {
     if (val && (val.from || val.to)) {
         return kendo.format("{0} - {1}", kendo.toString(val.from, format) || "and Before", kendo.toString(val.to, format) || "and After");
     }
     return "";
 }