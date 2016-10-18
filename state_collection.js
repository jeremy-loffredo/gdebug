var record_states = [];

var record_timeout = null;
var record = function(a) {
	if (record_timeout !== null) {
		record_states.push(a.attributes);
	}
};

var start_send_records = function() {
	record_timeout = setTimeout(function() {
		var data = $.extend(true,{},record_states);
		record_states = [];
		Data.dump_to_server('state_changes',data);
		record_timeout = setTimeout
		start_send_records();
	},30000);
};

var end_record_collection = function() {
	clearTimeout(record_timeout);
	record_timeout = null;
	Data.state.off('change',record);
};

start_send_records();
Data.state.on('change',record);
