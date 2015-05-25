'use strict';

module.exports = {
	id: 'all',
	components: [
		'Journey Assist',
		'Personalizer',
		'Profiler',
		'Analytics',
		'Sovereign Personal Cloud'
	],
	accessTypes: [
		{
			permission: 'Journey Assist',
			componentKey: 'Journey Assist',
			label: 'Journey Assist'
		},
		{
			permission: 'Personalizer',
			componentKey: 'Personalizer',
			label: 'Personalizer'
		},
		{
			permission: 'Profiler',
			componentKey: 'Profiler',
			label: 'Profiler'
		},
		{
			permission: 'Analytics',
			componentKey: 'Analytics',
			label: 'Analytics'
		},
		{
			permission: 'Sovereign Personal CloudSovereign Personal Cloud',
			componentKey: 'Sovereign Personal Cloud',
			label: 'Sovereign Personal Cloud'
		}
	]
};