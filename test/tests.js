module( "Extendable Drop Down" );
	//creation
	test( "Ext Drop Down Can Be Created", function() {
	  var el = $("<div id='extDD'/>").kendoExtDropDown();

	  var kendoObj = el.data('kendoExtDropDown');
	  ok( kendoObj !== undefined);
	  ok( el.attr("id") === "extDD", "Element returned" );
	});

	//Events
	asyncTest( "Ext Drop Down Should Trigger Open Event On Open", 1, function() {
		var el = $("<div id='extDDOpener'/>").kendoExtDropDown();

		
		var kendoObj = el.data('kendoExtDropDown');

		kendoObj.bind("open", function() {
			
			ok(true, "Open Event Fired");
			start();
		});

		kendoObj.open();
	});

	asyncTest( "Ext Drop Down Should Trigger Close Event On Close", 1, function() {
		var el = $("<div id='extDDCloser'/>").kendoExtDropDown();

		
		var kendoObj = el.data('kendoExtDropDown');

		kendoObj.bind("close", function() {
			
			ok(true, "Close Event Fired");
			start();
		});

		kendoObj.open();
		kendoObj.close();

		
	});

module( "Basic Range Pickers" );
	
	test( "Date Range Picker Can Be Created", function() {
	  var el = $("<div id='extDD'/>").kendoDateRangePicker();

	  var kendoObj = el.data('kendoDateRangePicker');
	  ok( kendoObj !== undefined, "Kendo data Object Returned");
	  ok( el.attr("id") === "extDD", "Element returned" );
	});

	test( "Date Range Should Allow Value to Be Set", function() {
	  var el = $("<div id='extDD'/>").kendoDateRangePicker();

	  var kendoObj = el.data('kendoDateRangePicker');
	  var date = new Date();
	  kendoObj.value({from:date, to:date});
	  var val = kendoObj.value();
	  ok(val.to && val.from && val.from == date && val.to == date, "Date Range Picker could set and retrieve date");
	});

	test( "Date Range Should Fire Change When Date Set", function() {
	  var el = $("<div id='extDD'/>").kendoDateRangePicker();

	  var wasChanged = false;
	  var kendoObj = el.data('kendoDateRangePicker');
	  kendoObj.bind("change", function() {
	  	wasChanged = true;
	  });
	  kendoObj.value({from:new Date(), to:new Date()});

	  ok(wasChanged, "Date Picker Fired Change Event When Date Changed");
	});

	test( "Date Range Should NOT Fire Change When Date Set to SAME value", function() {
	  var el = $("<div id='extDD'/>").kendoDateRangePicker();

	  var wasChanged = false;
	  var kendoObj = el.data('kendoDateRangePicker');

	  var val = {from:new Date(), to:new Date()};

	  kendoObj.value(val);
	  
	  kendoObj.bind("change", function() {
	  	wasChanged = true;
	  });

	  kendoObj.value(val);

	  ok(!wasChanged, "Date Picker Should not fire change event here");
	});

	test( "Numeric Range Picker Can Be Created", function() {
	  var el = $("<div id='extDD'/>").kendoNumericRangePicker();

	  var kendoObj = el.data('kendoNumericRangePicker');
	  ok( kendoObj !== undefined, "Kendo data Object Returned");
	  ok( el.attr("id") === "extDD", "Element returned" );
	});  

	test( "Numeric Range Should Fire Change When Set To New Value", function() {
	  var el = $("<div id='extDD'/>").kendoNumericRangePicker();

	  var wasChanged = false;
	  var kendoObj = el.data('kendoNumericRangePicker');
	  kendoObj.bind("change", function() {
	  	wasChanged = true;
	  });
	  kendoObj.value({from:1, to:2});

	  ok(wasChanged, "Numeric Picker Fired Change Event When Changed");
	});

	test( "Numeric Range Should NOT Fire Change When Set to SAME value", function() {
	  var el = $("<div id='extDD'/>").kendoNumericRangePicker();

	  var wasChanged = false;
	  var kendoObj = el.data('kendoNumericRangePicker');

	  var val = {from:1, to:2};
	  kendoObj.value(val);
	  
	  kendoObj.bind("change", function() {
	  	wasChanged = true;
	  });

	  kendoObj.value(val);

		ok(!wasChanged, "Numeric picker should not fire change here");
	});

	//Calendar Picker
	test( "Calendar Range Picker Can Be Created", function() {
	  var el = $("<div id='extDD'/>").kendoCalendarRangePicker();

	  var kendoObj = el.data('kendoCalendarRangePicker');
	  ok( kendoObj !== undefined, "Kendo data Object Returned");
	  ok( el.attr("id") === "extDD", "Element returned" );
	});


	test( "Calendar Range Should Fire Change When Set To New Value", function() {
	  var el = $("<div id='extDD'/>").kendoCalendarRangePicker();

	  var wasChanged = false;
	  var kendoObj = el.data('kendoCalendarRangePicker');
	  kendoObj.bind("change", function() {
	  	wasChanged = true;
	  });
	  kendoObj.value({from:new Date(), to:new Date()});

	  ok(wasChanged, "Calendar Picker Fired Change Event When Changed");
	});

	test( "Calendar Range Should NOT Fire Change When Set to SAME value", function() {
	  var el = $("<div id='extDD'/>").kendoCalendarRangePicker();

	  var wasChanged = false;
	  var kendoObj = el.data('kendoCalendarRangePicker');

	  var val = {from:new Date(), to:new Date()};
	  kendoObj.value(val);
	  
	  kendoObj.bind("change", function() {
	  	wasChanged = true;
	  });

	  kendoObj.value(val);

		ok(!wasChanged, "Calendar picker should not fire change here");
	});


module( "Drop Down Ranged" );
	test( "Date Picker Can Be Created", function() {
	  var el = $("<div id='extDD'/>").kendoExtDropDownDateRangePicker();

	  var kendoObj = el.data('kendoExtDropDownDateRangePicker');
	  ok( kendoObj !== undefined, "Kendo data Object Returned");
	  ok( el.attr("id") === "extDD", "Element returned" );
	});

	test( "Date Picker Should NOT Fire Change When Date Not Changed During Open And Close", function() {
	  var el = $("<div id='extDD'/>").kendoExtDropDownDateRangePicker();

	  var wasChanged = false;
	  var kendoObj = el.data('kendoExtDropDownDateRangePicker');

	  var val = {from:new Date(), to:new Date()};
	  kendoObj.value(val);
	  
	  kendoObj.bind("change", function() {
	  	wasChanged = true;
	  });

	  kendoObj.open();
	  kendoObj.close();

	  ok(!wasChanged, "Drop Down Date Picker Should not fire change event here");
	});

	test( "Date Picker Should NOT Fire Change While Open", function() {
	  var el = $("<div id='extDD'/>").kendoExtDropDownDateRangePicker();

	  var wasChanged = false;
	  var kendoObj = el.data('kendoExtDropDownDateRangePicker');

	  var val = {from:new Date(), to:new Date()};
	  
	  kendoObj.open();

	  kendoObj.bind("change", function() {
	  	wasChanged = true;
	  });

	  kendoObj._rangePicker.value(val);
	  
	  kendoObj.close();

	  ok(!wasChanged, "Drop Down Date Picker Should  NOT fire change event until closed");
	});

	asyncTest( "Date Picker Should Fire Change On Close, When Date Changed While Open", 1, function() {
	  var el = $("<div id='extDDDatePickerChangeTest'/>").kendoExtDropDownDateRangePicker();

	  var wasChanged = false;
	  var kendoObj = el.data('kendoExtDropDownDateRangePicker');

	  var val = {from:new Date(), to:new Date()};
	  
	  kendoObj.open();

	  kendoObj._rangePicker.value(val);

	  kendoObj.bind("change", function() {
	  	 wasChanged = true;
	  	 ok(wasChanged, "Drop Down Date Picker Should  fire change event here");
	  	 start();
	  });
	  
	  kendoObj.close();
	});

	test( "Date Picker Should Allow Value to Be Set", function() {
	  var el = $("<div id='extDD'/>").kendoExtDropDownDateRangePicker();

	  var kendoObj = el.data('kendoExtDropDownDateRangePicker');
	  var date = new Date();
	  kendoObj.value({from:date, to:date});
	  var val = kendoObj.value();
	  ok(val.to && val.from && val.from == date && val.to == date, "Date Range Picker could set and retrieve date");
	});

	test( "Date Picker Should Fire Change When Date Set", function() {
	  var el = $("<div id='extDD'/>").kendoExtDropDownDateRangePicker();

	  var wasChanged = false;
	  var kendoObj = el.data('kendoExtDropDownDateRangePicker');
	  kendoObj.bind("change", function() {
	  	wasChanged = true;
	  });
	  kendoObj.value({from:new Date(), to:new Date()});

	  ok(wasChanged, "Date Picker Fired Change Event When Date Changed");
	});


	test( "Date Picker Should NOT Fire Change When Date Set to SAME value", function() {
	  var el = $("<div id='extDD'/>").kendoExtDropDownDateRangePicker();

	  var wasChanged = false;
	  var kendoObj = el.data('kendoExtDropDownDateRangePicker');

	  var val = {from:new Date(), to:new Date()};

	  kendoObj.value(val);
	  
	  kendoObj.bind("change", function() {
	  	wasChanged = true;
	  });

	  kendoObj.value(val);

	  ok(!wasChanged, "Date Picker Should not fire change event here");
	});

	//Calendar
	test( "Calendar Picker Can Be Created", function() {
	  var el = $("<div id='extDD'/>").kendoExtDropDownCalendarRangePicker();

	  var kendoObj = el.data('kendoExtDropDownCalendarRangePicker');
	  ok( kendoObj !== undefined, "Kendo data Object Returned");
	  ok( el.attr("id") === "extDD", "Element returned" );
	});

	//Numeric
	test( "Numeric Picker Can Be Created", function() {
	  var el = $("<div id='extDD'/>").kendoExtDropDownNumericRangePicker();

	  var kendoObj = el.data('kendoExtDropDownNumericRangePicker');
	  ok( kendoObj !== undefined, "Kendo data Object Returned");
	  ok( el.attr("id") === "extDD", "Element returned" );
	});

module( "Google Style Date Range Picker" );
	test( "Can Be Created", function() {
	  var el = $("<div id='extDD'/>").kendoExtDateRangePicker();

	  var kendoObj = el.data('kendoExtDateRangePicker');
	  ok( kendoObj !== undefined, "Kendo data Object Returned");
	  ok( el.attr("id") === "extDD", "Element returned" );
	});