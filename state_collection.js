console.log('INJECTED');
Data.state.on('change',function(a) {
	console.log('========================================');
	console.log(Data.state.get('version'));
	console.log(a.get('version'));
	console.log('========================================');
});
