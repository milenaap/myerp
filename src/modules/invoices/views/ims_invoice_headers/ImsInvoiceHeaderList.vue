<template>

	<!-- BEGIN: Page Layout Create -->
	<div v-animate v-if="isCreate">
		<Create
			@saveImsInvoiceHeaderForm="saveImsInvoiceHeaderForm"
			@cancelCreate="cancelCreate"
		/>
	</div>

	<!-- BEGIN: Page Layout Update -->
	<div v-animate v-if="isEdit">
		<Edit
			:imsInvoiceHeaderId="imsInvoiceHeaderId"
			@cancelEdit="cancelEdit"
			@updateImsInvoiceHeaderForm="updateImsInvoiceHeaderForm"
		/>
	</div>

	<!-- BEGIN: Table -->
	<div v-animate id="div_table">
		<div class="flex flex-col sm:flex-row xl:items-start justify-between mb-5">
			<h1 class="mt-0">{{ $t("imsinvoiceheaders") }}</h1>
			<button class="btn-primary sm:w-auto" @click.prevent="showCreateImsInvoiceHeader">
				<div class="flex flex-row">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-1" viewBox="0 0 50 50">
					<path fill="currentColor"
						d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15" />
						<path fill="currentColor" d="M16 24h18v2H16z" />
						<path fill="currentColor" d="M24 16h2v18h-2z" />
						<path fill="currentColor" d="M24 16h2v18h-2z" />
					</svg>
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
						<button @click="showEditImsInvoiceHeader(props.row.id)">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 hover:text-blue-400" viewBox="0 0 24 24"><path fill="currentColor" d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z"/><path fill="currentColor" d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2"/></svg>
						</button>
						<button @click="showDeleteImsInvoiceHeader(props.row.id)">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600 hover:text-red-400" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
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
	import useImsInvoiceHeader from "../../composables/ims_invoice_headers";
	import Create from "../../components/ims_invoice_headers/ImsInvoiceHeaderCreate.vue";
	import Edit from "../../components/ims_invoice_headers/ImsInvoiceHeaderEdit.vue";

	// Tabulator
	const rows = ref([]);

	// Views
	const isCreate = ref(false);
	const isEdit = ref(false);
	const imsInvoiceHeaderId = ref(0);

	const { t } = useI18n();
	const { imsInvoiceHeaders, getImsInvoiceHeaders, storeImsInvoiceHeader, updateImsInvoiceHeader, destroyImsInvoiceHeader} = useImsInvoiceHeader();


	const findData = async() => {
		await getImsInvoiceHeaders();
		return toRaw(imsInvoiceHeaders.value);
	}

	// Table
	const columns = [
		{ label: t("name"), field: 'name' },
		{ label: t("invoiced_at"), field: 'invoiced_at' },
		{ label: t("month"), field: 'month' },
		{ label: t("year"), field: 'year' },
		{ label: t("path"), field: 'path' },
		{ label: t("processed_at"), field: 'processed_at' },
		{ label: t('actions'), field: 'actions', sortable: false, searchable: false, width: '100px',},
	];
	//Store
	const showCreateImsInvoiceHeader = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveImsInvoiceHeaderForm = async (form) => {
		isCreate.value = false;
		div_table.style.display = 'block';
		await storeImsInvoiceHeader({ ...form });
		rows.value = await findData();
		await Toast(t("message.record_saved"), 'success');
	}

	//Edit
	const showEditImsInvoiceHeader = (id) => {
		isEdit.value = true;
		div_table.style.display = 'none';
		imsInvoiceHeaderId.value = id;
	}

	const cancelEdit = async() => {
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	const updateImsInvoiceHeaderForm = async (id, data) => {
		isEdit.value = false;
		div_table.style.display = 'block';
		await updateImsInvoiceHeader(id, data);
		rows.value = await findData();
		await Toast(t("message.record_updated"), 'success');
	}

	// Delete
	const showDeleteImsInvoiceHeader = async (id, description='') => {
		Swal.fire({
			icon: 'warning',
			title: t("message.are_you_sure"),
			text: t("delete") + (description !== '' ? ': ' + description : ''),
			showCancelButton: true,
			confirmButtonText: t("delete"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyImsInvoiceHeader(id);
		rows.value = await findData();
				Swal.fire(t("message.record_deleted"), '', 'success');
			}

		});

	}

	onMounted(async () => {
		rows.value = await findData();
	});


</script>

<style scoped>
</style>
