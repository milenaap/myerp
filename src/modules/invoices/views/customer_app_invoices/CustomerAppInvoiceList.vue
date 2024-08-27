<template>

	<!-- BEGIN: Page Layout Create -->
	<div v-animate v-if="isCreate">
		<Create
			@saveCustomerAppInvoiceForm="saveCustomerAppInvoiceForm"
			@cancelCreate="cancelCreate"
		/>
	</div>

	<!-- BEGIN: Page Layout Update -->
	<div v-animate v-if="isEdit">
		<Edit
			:customerAppInvoiceId="customerAppInvoiceId"
			@cancelEdit="cancelEdit"
			@updateCustomerAppInvoiceForm="updateCustomerAppInvoiceForm"
		/>
	</div>

	<!-- BEGIN: Table -->
	<div v-animate id="div_table">
		<div class="flex flex-col sm:flex-row xl:items-start justify-between mb-5">
			<h1 class="mt-0">{{ $t("customer_app_invoices") }}</h1>
			<button class="btn-primary sm:w-auto" @click.prevent="showCreateCustomerAppInvoice">
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
							<button @click="showEditCustomerAppInvoice(props.row.id)">
								<IconEdit />
							</button>
							<button @click="showDeleteCustomerAppInvoice(props.row.id)">
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
	import IconAdd from '@/components/icons/IconAdd.vue';
	import IconEdit from '@/components/icons/IconEdit.vue';
	import IconDelete from '@/components/icons/IconDelete.vue';
	import useCustomerAppInvoice from "../../composables/customer_app_invoices";
	import Create from "../../components/customer_app_invoices/CustomerAppInvoiceCreate.vue";
	import Edit from "../../components/customer_app_invoices/CustomerAppInvoiceEdit.vue";

	// Tabulator
	const rows = ref([]);

	// Views
	const isCreate = ref(false);
	const isEdit = ref(false);
	const customerAppInvoiceId = ref(0);

	const { t } = useI18n();
	const { customerAppInvoices, customerAppInvoiceErrors, getCustomerAppInvoices, storeCustomerAppInvoice, updateCustomerAppInvoice, destroyCustomerAppInvoice} = useCustomerAppInvoice();


	const findData = async() => {
		await getCustomerAppInvoices();
		return toRaw(customerAppInvoices.value);
	}

	// Table
	const columns = [
		{ label: t("customer_id"), field: 'customer_id' },
		{ label: t("rental_price_without_vat"), field: 'rental_price_without_vat' },
		{ label: t("vat_quote"), field: 'vat_quote' },
		{ label: t('actions'), field: 'actions', sortable: false, searchable: false, width: '100px',},
	];
	//Store
	const showCreateCustomerAppInvoice = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveCustomerAppInvoiceForm = async (form) => {
		isCreate.value = false;
		div_table.style.display = 'block';
		await storeCustomerAppInvoice({ ...form });
		if (customerAppInvoiceErrors.value.length === 0) {
			await Toast(t("message.record_saved"), 'success');
		} else {
			const errorMessages = companyErrors.value.flatMap(errorObj => Object.values(errorObj).flat()).join(', ');
			await Toast(errorMessages, 'error');
		}
		await Toast(t("message.record_saved"), 'success');
		rows.value = await findData();
	}

	//Edit
	const showEditCustomerAppInvoice = (id) => {
		isEdit.value = true;
		div_table.style.display = 'none';
		customerAppInvoiceId.value = id;
	}

	const cancelEdit = async() => {
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	const updateCustomerAppInvoiceForm = async (id, data) => {
		isEdit.value = false;
		div_table.style.display = 'block';
		await updateCustomerAppInvoice(id, data);
		if (customerAppInvoiceErrors.value.length === 0) {
			await Toast(t("message.record_updated"), 'success');
		} else {
			const errorMessages = companyErrors.value.flatMap(errorObj => Object.values(errorObj).flat()).join(', ');
			await Toast(errorMessages, 'error');
		}
		rows.value = await findData();
	}

	// Delete
	const showDeleteCustomerAppInvoice = async (id, description='') => {
		Swal.fire({
			icon: 'warning',
			title: t("message.are_you_sure"),
			text: t("delete") + (description !== '' ? ': ' + description : ''),
			showCancelButton: true,
			confirmButtonText: t("delete"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyCustomerAppInvoice(id);
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
