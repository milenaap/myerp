<template>

	<!-- BEGIN: Page Layout Create -->
	<div v-animate v-if="isCreate">
		<Create
			@saveCustomerDeviceForm="saveCustomerDeviceForm"
			@cancelCreate="cancelCreate"
		/>
	</div>

	<!-- BEGIN: Page Layout Update -->
	<div v-animate v-if="isEdit">
		<Edit
			:customerDeviceId="customerDeviceId"
			@cancelEdit="cancelEdit"
			@updateCustomerDeviceForm="updateCustomerDeviceForm"
		/>
	</div>

	<!-- BEGIN: Table -->
	<div v-animate id="div_table">
		<div class="flex flex-col sm:flex-row xl:items-start justify-between mb-5">
			<h1 class="mt-0">{{ $t("customer_devices") }}</h1>
			<button class="btn-primary sm:w-auto" @click.prevent="showCreateCustomerDevice">
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
						<button @click="showEditCustomerDevice(props.row.id)">
							<IconEdit />
						</button>
						<button @click="showDeleteCustomerDevice(props.row.id)">
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
	import useCustomerDevice from "../../composables/customer_devices";
	import Create from "../../components/customer_devices/CustomerDeviceCreate.vue";
	import Edit from "../../components/customer_devices/CustomerDeviceEdit.vue";
	import IconAdd from '@/components/icons/IconAdd.vue';
	import IconEdit from '@/components/icons/IconEdit.vue';
	import IconDelete from '@/components/icons/IconDelete.vue';

	// Tabulator
	const rows = ref([]);

	// Views
	const isCreate = ref(false);
	const isEdit = ref(false);
	const customerDeviceId = ref(0);

	const { t } = useI18n();
	const { 
		customerDevices, 
		customerDeviceErrors, 
		getCustomerDevices, 
		storeCustomerDevice, 
		updateCustomerDevice, 
		destroyCustomerDevice
	} = useCustomerDevice();


	const findData = async() => {
		await getCustomerDevices();
		return toRaw(customerDevices.value);
	}

	// Table
	const columns = [
		{ label: t("customer_id"), field: 'customer.company.name' },
		{ label: t("code"), field: 'customer.code' },
		{ label: t("provider_id"), field: 'provider.name' },
		{ label: t("product_id"), field: 'product.name' },
		{ label: t("number"), field: 'number' },
		// { label: t("SIM"), field: 'sim' },
		{ label: t("plate"), field: 'plate' },
		// { label: t("installed_at"), field: 'installed_at' },
		// { label: t("purchase_price_without_vat"), field: 'purchase_price_without_vat' },
		// { label: t("sale_price_without_vat"), field: 'sale_price_without_vat' },
		// { label: t("rental_price_without_vat"), field: 'rental_price_without_vat' },
		// { label: t("provider_rental_price_without_vat"), field: 'provider_rental_price_without_vat' },
		// { label: t("vat_quote"), field: 'vat_quote' },
		{ label: t('actions'), field: 'actions', sortable: false, searchable: false, width: '100px',},
	];
	//Store
	const showCreateCustomerDevice = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveCustomerDeviceForm = async (form) => {
		isCreate.value = false;
		div_table.style.display = 'block';

		await storeCustomerDevice({ ...form });
		if (customerDeviceErrors.value.length === 0) {
			await Toast(t("message.record_saved"), 'success');
		}else{
			const errorMessages = customerDeviceErrors.value.flatMap(errorObj => Object.values(errorObj).flat()).join(', ');
			await Toast(errorMessages, 'error');
		}

		rows.value = await findData();
	}

	//Edit
	const showEditCustomerDevice = (id) => {
		isEdit.value = true;
		div_table.style.display = 'none';
		customerDeviceId.value = id;
	}

	const cancelEdit = async() => {
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	const updateCustomerDeviceForm = async (id, data) => {
		isEdit.value = false;
		div_table.style.display = 'block';
		await updateCustomerDevice(id, data);

		if (customerDeviceErrors.value.length === 0) {
			await Toast(t("message.record_updated"), 'success');
		}else{
			const errorMessages = customerDeviceErrors.value.flatMap(errorObj => Object.values(errorObj).flat()).join(', ');
			await Toast(errorMessages, 'error');
		}

		rows.value = await findData();
		
	}

	// Delete
	const showDeleteCustomerDevice = async (id, description='') => {
		Swal.fire({
			icon: 'warning',
			title: t("message.are_you_sure"),
			text: t("delete") + (description !== '' ? ': ' + description : ''),
			showCancelButton: true,
			confirmButtonText: t("delete"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyCustomerDevice(id);
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
