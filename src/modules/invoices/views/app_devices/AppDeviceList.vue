<template>

	<!-- BEGIN: Page Layout Create -->
	<div v-animate v-if="isCreate">
		<Create
			@saveAppDeviceForm="saveAppDeviceForm"
			@cancelCreate="cancelCreate"
		/>
	</div>

	<!-- BEGIN: Page Layout Update -->
	<div v-animate v-if="isEdit">
		<Edit
			:appDeviceId="appDeviceId"
			@cancelEdit="cancelEdit"
			@updateAppDeviceForm="updateAppDeviceForm"
		/>
	</div>

	<!-- BEGIN: Table -->
	<div v-animate id="div_table">
		<div class="flex flex-col sm:flex-row xl:items-start justify-between mb-5">
			<h1 class="mt-0">{{ $t("app_devices") }}</h1>
			<button class="btn-primary sm:w-auto" @click.prevent="showCreateAppDevice">
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
							<button @click="showEditAppDevice(props.row.id)">
								<IconEdit />
							</button>
							<button @click="showDeleteAppDevice(props.row.id)">
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
	import useAppDevice from "../../composables/app_devices";
	import Create from "../../components/app_devices/AppDeviceCreate.vue";
	import Edit from "../../components/app_devices/AppDeviceEdit.vue";

	// Tabulator
	const rows = ref([]);

	// Views
	const isCreate = ref(false);
	const isEdit = ref(false);
	const appDeviceId = ref(0);

	const { t } = useI18n();
	const { appDevices, appDeviceErrors, getAppDevices, storeAppDevice, updateAppDevice, destroyAppDevice} = useAppDevice();


	const findData = async() => {
		await getAppDevices();
		return toRaw(appDevices.value);
	}

	// Table
	const columns = [
		{ label: t("customer_id"), field: 'customer_id' },
		{ label: t("driver_id"), field: 'driver_id' },
		{ label: t("month"), field: 'month' },
		{ label: t("year"), field: 'year' },
		{ label: t("total_movements"), field: 'total_movements' },
		{ label: t("driver_name"), field: 'driver_name' },
		{ label: t("is_processed"), field: 'is_processed' },
		{ label: t('actions'), field: 'actions', sortable: false, searchable: false, width: '100px',},
	];
	//Store
	const showCreateAppDevice = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveAppDeviceForm = async (form) => {
		isCreate.value = false;
		div_table.style.display = 'block';
		await storeAppDevice({ ...form });
		if (appDeviceErrors.value.length === 0) {
			await Toast(t("message.record_saved"), 'success');
		} else {
			const errorMessages = companyErrors.value.flatMap(errorObj => Object.values(errorObj).flat()).join(', ');
			await Toast(errorMessages, 'error');
		}
		await Toast(t("message.record_saved"), 'success');
		rows.value = await findData();
	}

	//Edit
	const showEditAppDevice = (id) => {
		isEdit.value = true;
		div_table.style.display = 'none';
		appDeviceId.value = id;
	}

	const cancelEdit = async() => {
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	const updateAppDeviceForm = async (id, data) => {
		isEdit.value = false;
		div_table.style.display = 'block';
		await updateAppDevice(id, data);
		if (appDeviceErrors.value.length === 0) {
			await Toast(t("message.record_updated"), 'success');
		} else {
			const errorMessages = companyErrors.value.flatMap(errorObj => Object.values(errorObj).flat()).join(', ');
			await Toast(errorMessages, 'error');
		}
		rows.value = await findData();
	}

	// Delete
	const showDeleteAppDevice = async (id, description='') => {
		Swal.fire({
			icon: 'warning',
			title: t("message.are_you_sure"),
			text: t("delete") + (description !== '' ? ': ' + description : ''),
			showCancelButton: true,
			confirmButtonText: t("delete"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyAppDevice(id);
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
