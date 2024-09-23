<template>
	<div>
	  <VButton @click="runFlow">Run Flow</VButton>
	  <!-- Toaster must be included in the template -->
	  <Toaster />
	</div>
  </template>
  
  <script>
  import { Toaster, toast } from 'vue-sonner'; // Import Vue-Sonner
  import { useApi } from '@directus/extensions-sdk';
  
  export default {
	props: {
	  value: {
		type: [Object, String, Number],
		default: null,
	  },
	  context: {
		type: Object,
		default: () => ({}),
	  },
	  options: {
		type: Object,
		default: () => ({}),
	  },
	  flowKey: {
		type: [String, Number],
		default: '',
	  },
	  primaryKey: {
		type: [String, Number],
		default: '',
	  },
	},
	components: {
	  Toaster, // Register the Toaster component to render the toast container
	},
	setup(props) {
	  const api = useApi();
  
	  const runFlow = async () => {
		const flowKey = props.flowKey;
		const primaryKey = props.primaryKey;
  
		console.log('Props:', props);
		console.log('Flow Key from props:', flowKey);
		console.log('Primary Key:', primaryKey);
  
		if (!flowKey) {
		  toast.error('Flow Key is not set.', {
			duration: 5000,
		  });
		  return;
		}
  
		// Get the current item's data
		const itemData = props.value;
  
		if (!itemData) {
		  toast.error('No item data available.', {
			duration: 5000,
		  });
		  return;
		}
  
		try {
		  // Call the flow trigger endpoint and pass the item data
		  const response = await api.post(`/flows/trigger/${flowKey}`, itemData);
  
		  // Show the response from the flow in the toast
		  toast.success('Flow executed successfully', {
			description: JSON.stringify(response.data),
			duration: 5000,
		  });
		} catch (error) {
		  console.error('Error executing flow:', error);
		  toast.error('An error occurred while executing the flow.', {
			description: error.response?.data?.errors?.[0]?.message || error.message,
			duration: 5000,
		  });
		}
	  };
  
	  return {
		runFlow,
	  };
	},
  };
  </script>
  
  <style scoped>
  .toast {
	z-index: 9999 !important; /* Ensure the toast is above other UI elements */
  }
  </style>
  