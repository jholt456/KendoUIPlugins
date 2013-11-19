//extendable drop down
test( "Ext Drop Down Can Be Created", function() {
  var el = $("<div id='extDD'/>").kendoExtDropDown();

  var kendoObj = el.data('kendoExtDropDown');
  ok( kendoObj !== undefined);
  ok( el.attr("id") === "extDD", "Element returned" );
});

//basic range pickers
test( "Date Range Picker Can Be Created", function() {
  var el = $("<div id='extDD'/>").kendoDateRangePicker();

  var kendoObj = el.data('kendoDateRangePicker');
  ok( kendoObj !== undefined, "Kendo data Object Returned");
  ok( el.attr("id") === "extDD", "Element returned" );
});

test( "Numeric Range Picker Can Be Created", function() {
  var el = $("<div id='extDD'/>").kendoNumericRangePicker();

  var kendoObj = el.data('kendoNumericRangePicker');
  ok( kendoObj !== undefined, "Kendo data Object Returned");
  ok( el.attr("id") === "extDD", "Element returned" );
});

test( "Calendar Range Picker Can Be Created", function() {
  var el = $("<div id='extDD'/>").kendoCalendarRangePicker();

  var kendoObj = el.data('kendoCalendarRangePicker');
  ok( kendoObj !== undefined, "Kendo data Object Returned");
  ok( el.attr("id") === "extDD", "Element returned" );
});


//Basic Drop down range pickers
test( "Ext DropDown Calendar Range Picker Can Be Created", function() {
  var el = $("<div id='extDD'/>").kendoExtDropDownCalendarRangePicker();

  var kendoObj = el.data('kendoExtDropDownCalendarRangePicker');
  ok( kendoObj !== undefined, "Kendo data Object Returned");
  ok( el.attr("id") === "extDD", "Element returned" );
});

test( "Ext DropDown Date Range Picker Can Be Created", function() {
  var el = $("<div id='extDD'/>").kendoExtDropDownDateRangePicker();

  var kendoObj = el.data('kendoExtDropDownDateRangePicker');
  ok( kendoObj !== undefined, "Kendo data Object Returned");
  ok( el.attr("id") === "extDD", "Element returned" );
});

test( "Ext DropDown Numeric Range Picker Can Be Created", function() {
  var el = $("<div id='extDD'/>").kendoExtDropDownNumericRangePicker();

  var kendoObj = el.data('kendoExtDropDownNumericRangePicker');
  ok( kendoObj !== undefined, "Kendo data Object Returned");
  ok( el.attr("id") === "extDD", "Element returned" );
});


//Google style range picker
test( "Ext Date Range Picker Can Be Created", function() {
  var el = $("<div id='extDD'/>").kendoExtDateRangePicker();

  var kendoObj = el.data('kendoExtDateRangePicker');
  ok( kendoObj !== undefined, "Kendo data Object Returned");
  ok( el.attr("id") === "extDD", "Element returned" );
});