<template>

	<!-- BEGIN: Page Layout Create -->
	<div v-animate v-if="isCreate">
		<Create
			@saveCustomerForm="saveCustomerForm"
			@cancelCreate="cancelCreate"
		/>
	</div>

	<!-- BEGIN: Page Layout Update -->
	<div v-animate v-if="isEdit">
		<Edit
			:customerId="customerId"
			@cancelEdit="cancelEdit"
			@updateCustomerForm="updateCustomerForm"
		/>
	</div>

	<!-- BEGIN: Table -->
	<div v-animate class="p-5 border rounded-md shadow-sm" id="div_table">
		<div class="flex flex-col sm:flex-row sm:items-end xl:items-start justify-end">
			<div class="flex mt-5 mb-5 sm:mt-0">
				<button class="btn-primary w-1/2 sm:w-auto" @click.prevent="showCreateCustomer">
					<IconAdd />
					{{ $t("add") }}
			</button>
		</div>
	</div>

	<!-- BEGIN: Table -->
	<div class="overflow-x-auto scrollbar-hidden">
		<VueGoodTable
			:columns="columns" 
			:rows="rows" 
			:pagination-options="{
				enabled: true,
				mode: 'records',
				perPage: 5,
				perPageDropdown: [10, 20, 50],
				dropdownAllowAll: false,
				setCurrentPage: 1,
				nextLabel: $t('setting_table.next_table'),
				prevLabel: $t('setting_table.prev_table'),
				rowsPerPageLabel: $t('setting_table.rows_per_page'),
				ofLabel: $t('setting_table.of'),
				pageLabel: 'page', // for pages mode
				allLabel: 'All',
			}" 
			:search-options="{ enabled: true, placeholder: $t('setting_table.search') }"
		>
			<template #table-row="props">
				<span v-if="props.column.field == 'actions'">
					<button @click="showEditCustomer(props.row.id)">
						<IconEdit />
					</button>
					<button @click="showDeleteCustomer(props.row.id)">
						<IconDelete />
					</button>
					</span>
				</template>
			</VueGoodTable>
		</div>

	</div>

</template>
<script setup>
	import { ref, onMounted, toRaw } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { Toast } from '@/utils/toast';
	import Swal from 'sweetalert2';
	import useCustomers from "@/modules/invoices/composables/customers";
	import Create from "@/components/customers/CustomerCreate.vue";
	import Edit from "@/components/customers/CustomerEdit.vue";
	import IconAdd from '@/components/icons/IconAdd.vue';
	import IconEdit from '@/components/icons/IconEdit.vue';
	import IconDelete from '@/components/icons/IconDelete.vue';	
	// Tabulator
	const rows = ref([]);

	// Views
	const isCreate = ref(false);
	const isEdit = ref(false);
	const customerId = ref(0);

	const { t } = useI18n();
	const { 
		customers, 
		customerErrors, 
		getCustomers, 
		storeCustomer, 
		updateCustomer, 
		destroyCustomer
	} = useCustomers();


	const findData = async() => {
		await getCustomers();
		return toRaw(customers.value);
	}

	// Table
	const columns = [
		{ label: t("company_id"), field: 'company.name' },
		{ label: t("service_id"), field: 'service.name' },
		{ label: t("code"), field: 'code' },
		{ label: t('actions'), field: 'actions', sortable: false, searchable: false, width: '100px',},
	];
	//Store
	const showCreateCustomer = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveCustomerForm = async (form) => {
		isCreate.value = false;
		div_table.style.display = 'block';
		await storeCustomer({ ...form });

		if (customerErrors.value.length === 0) {
			await Toast(t("message.record_saved"), 'success');
		}else{
			const errorMessages = customerErrors.value.flatMap(errorObj => Object.values(errorObj).flat()).join(', ');
			await Toast(errorMessages, 'error');
		}

		rows.value = await findData();
	}

	//Edit
	const showEditCustomer = (id) => {
		isEdit.value = true;
		div_table.style.display = 'none';
		customerId.value = id;
	}

	const cancelEdit = async() => {
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	const updateCustomerForm = async (id, data) => {
		isEdit.value = false;
		div_table.style.display = 'block';
		
		await updateCustomer(id, data);

		if (customerErrors.value.length === 0) {
			await Toast(t("message.record_updated"), 'success');
		}else{
			const errorMessages = customerErrors.value.flatMap(errorObj => Object.values(errorObj).flat()).join(', ');
			await Toast(errorMessages, 'error');
		}

		rows.value = await findData();

	}

	// Delete
	const showDeleteCustomer = async (id, description='') => {
		Swal.fire({
			icon: 'warning',
			title: t("message.are_you_sure"),
			text: t("delete") + (description !== '' ? ': ' + description : ''),
			showCancelButton: true,
			confirmButtonText: t("delete"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyCustomer(id);
				rows.value = await findData();
				await Toast(t("message.record_deleted"), 'success');
			}

		});

	}

	onMounted(async () => {
		rows.value = await findData();
		
		
	});


</script>

<style scoped>
</style>
