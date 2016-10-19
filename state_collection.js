var State_Debugger = {
	record_states: [],
	record_timeout: null,
	start: function() {
		Data.state.on('change', this.record, this);
		this.record_timeout = setTimeout(_.bind(function() {
			var data = this.record_states.slice();
			this.record_states = [];
			console.log('Sending maybe ',data);
			if (data.length) {
				Data.dump_to_server('state_changes',data);
			}
			this.start();
		},this),30000);
	},
	stop: function() {
		clearTimeout(this.record_timeout);
		this.record_timeout = null;
		Data.state.off('change', this.record);
	},
	record: function(state) {
		console.log('Recording state change');
		state.changed['modified_at'] = state.modified_at;
		this.record_states.push($.extend(true,state.changed,{modified_at:state.get('modified_at')}));
	},
};
