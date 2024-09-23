<template>
	<div>
		<VButton @click="runFlow">Run Flow</VButton>

		<!-- Toaster must be included in the template -->
    	<Toaster />
	</div>
</template>
  
<script>
import { Toaster, toast } from 'vue-sonner'; // Import Vue-Sonner

export default {
	props: {
		// Access the interface options
		context: {
			type: Object, // This will contain the current item data, including its ID
		},
		value: {
			type: Object, // This will contain the current item data, including its ID
			default: () => ({}),
		},
		options: {
			type: Object,
			default: () => ({}),
		},
		flowKey: {
			type: [String, Number],
			default: () => "",
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
	
		const runFlow = async () => {
			const flowKey = props.flowKey;
			const primaryKey = props.primaryKey;
			console.log('Props options:', flowKey);
			console.log(primaryKey);
			if (!flowKey) {
				toast.error('Flow Key is not set.', {
					duration: 5000,
				});
				return;
			}

			try {
				// Call the webhook endpoint
				console.log("calling flow");
				const response = await this.$api.post(`/flows/${flowKey}`, {
					
					// Include any necessary payload
					// For example: message: 'Start the flow'
				});
				toast.info(response, {
					title: 'Flow Execution',
					description: `Flow Key: ${response}`,
					type: 'info',
					duration: 5000,
				})
			} catch (error) {
				toast.error("An error occurred:", error);
				throw new Error("An error occurred:", error);
				

			}

			// Trigger a Vue-Sonner warning toast
			toast.info( "Flow Execution", {
				title: 'Flow Execution',
				description: `Flow Key: ${primaryKey}`,
				type: 'warning',
				duration: 5000,
			});
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
  