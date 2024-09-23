import InterfaceComponent from './interface.vue';

export default {
	id: 'trigger-flow-button',
	name: 'Flow Button',
	icon: 'play_arrow',
	description: 'Button to trigger a flow and display messages',
	component: InterfaceComponent,
	hideLabel: true,
	hideLoader: true,
	autoKey: true,
	types: ['alias'],
	group: 'presentation',
	"options": [
        {
          "field": "flowKey",
          "name": "Flow Key",
          "type": "string",
          "meta": {
            "interface": "input",
            "width": "full",
            "required": true,
			"note": "Enter the Flow Key",
            "options": {
              "placeholder": "Enter the Flow Key"
            }
          }
        }
      ]
};
