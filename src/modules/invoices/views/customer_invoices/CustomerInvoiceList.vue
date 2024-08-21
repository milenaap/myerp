<template>

	<!-- BEGIN: Page Layout Create -->
	<div v-animate v-if="isCreate">
		<Create
			@saveCustomerInvoiceForm="saveCustomerInvoiceForm"
			@cancelCreate="cancelCreate"
		/>
	</div>

	<!-- BEGIN: Page Layout Update -->
	<div v-animate v-if="isEdit">
		<Edit
			:customerInvoiceId="customerInvoiceId"
			@cancelEdit="cancelEdit"
			@updateCustomerInvoiceForm="updateCustomerInvoiceForm"
		/>
	</div>

	<!-- BEGIN: Table -->
	<div v-animate id="div_table">
		<div class="flex flex-col sm:flex-row xl:items-start justify-between mb-5">
			<h1 class="mt-0">{{ $t("customer_invoices") }}</h1>
			<button class="btn-primary sm:w-auto" @click.prevent="showCreateCustomerInvoice">
				<div class="flex flex-row">
					<IconAdd />
					{{ $t("add") }}
				</div>
			</button>
		</div>

		<!-- BEGIN: Table -->
		<div class="p-5 border rounded-md shadow-sm">
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
						<button @click="showEditCustomerInvoice(props.row.id)">
							<IconEdit />
						</button>
						<button @click="showDeleteCustomerInvoice(props.row.id)">
							<IconDelete />
						</button>
						</span>
					</template>
				</VueGoodTable>
			</div>

		</div>

	</div>

</template>
<script setup>
	import { ref, onMounted, toRaw } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { Toast } from '@/utils/toast';
	import Swal from 'sweetalert2';
	import useCustomerInvoice from "../../composables/customer_invoices";
	import Create from "../../components/customer_invoices/CustomerInvoiceCreate.vue";
	import Edit from "../../components/customer_invoices/CustomerInvoiceEdit.vue";
	import IconAdd from '@/components/icons/IconAdd.vue';
	import IconEdit from '@/components/icons/IconEdit.vue';
	import IconDelete from '@/components/icons/IconDelete.vue';	

	// Tabulator
	const rows = ref([]);

	// Views
	const isCreate = ref(false);
	const isEdit = ref(false);
	const customerInvoiceId = ref(0);

	const { t } = useI18n();
	const { customerInvoices, getCustomerInvoices, storeCustomerInvoice, updateCustomerInvoice, destroyCustomerInvoice} = useCustomerInvoice();


	const findData = async() => {
		await getCustomerInvoices();
		return toRaw(customerInvoices.value);
	}

	// Table
	const columns = [
		{ label: t("customer_id"), field: 'customer.company.name' },
		{ label: t("remittance_type_id"), field: 'remittance_type.name' },
		{ label: t("bank_account"), field: 'bank_account' },		
		{ label: t('actions'), field: 'actions', sortable: false, searchable: false, width: '100px',},
	];
	//Store
	const showCreateCustomerInvoice = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveCustomerInvoiceForm = async (form) => {
		isCreate.value = false;
		div_table.style.display = 'block';
		await storeCustomerInvoice({ ...form });
		rows.value = await findData();
		await Toast(t("message.record_saved"), 'success');
	}

	//Edit
	const showEditCustomerInvoice = (id) => {
		isEdit.value = true;
		div_table.style.display = 'none';
		customerInvoiceId.value = id;
	}

	const cancelEdit = async() => {
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	const updateCustomerInvoiceForm = async (id, data) => {
		isEdit.value = false;
		div_table.style.display = 'block';
		await updateCustomerInvoice(id, data);
		rows.value = await findData();
		await Toast(t("message.record_updated"), 'success');
	}

	// Delete
	const showDeleteCustomerInvoice = async (id, description='') => {
		Swal.fire({
			icon: 'warning',
			title: t("message.are_you_sure"),
			text: t("delete") + (description !== '' ? ': ' + description : ''),
			showCancelButton: true,
			confirmButtonText: t("delete"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyCustomerInvoice(id);
		rows.value = await findData();
				Swal.fire(t("message.record_deleted"), '', 'success');
			}

		});

	}

	onMounted(async () => {
		rows.value = await findData();
		console.log(rows.value);
	});


</script>

<style scoped>
</style>
