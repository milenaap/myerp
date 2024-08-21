<template>

	<!-- BEGIN: Page Layout Create -->
	<div v-animate v-if="isCreate">
		<Create
			@saveInvoiceHeaderForm="saveInvoiceHeaderForm"
			@cancelCreate="cancelCreate"
		/>
	</div>

	<!-- BEGIN: Page Layout Update -->
	<div v-animate v-if="isEdit">
		<Edit
			:invoiceHeaderId="invoiceHeaderId"
			@cancelEdit="cancelEdit"
			@updateInvoiceHeaderForm="updateInvoiceHeaderForm"
		/>
	</div>

	<!-- BEGIN: Table -->
	<div v-animate id="div_table">
		<div class="flex flex-col sm:flex-row xl:items-start justify-between mb-5">
			<h1 class="mt-0">{{ $t("invoice_headers") }}</h1>
			<button class="btn-primary sm:w-auto" @click.prevent="showCreateInvoiceHeader">
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
							<button @click="downloadFileInvoiceHeader(props.row.id)">
								<IconDownload />
							</button>
							<button @click="showDeleteInvoiceHeader(props.row.id)">
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
	import useInvoiceHeader from "../../composables/invoice_headers.js";
	import Create from "../../components/invoice_headers/InvoiceHeaderCreate.vue";
	import Edit from "../../components/invoice_headers/InvoiceHeaderEdit.vue";
	import { formatDecimal } from "@/utils/helper.js";
	import IconDelete from '@/components/icons/IconDelete.vue';
	import IconDownload from '@/components/icons/IconDownload.vue';
	import IconAdd from '@/components/icons/IconAdd.vue';


	// Tabulator
	const rows = ref([]);

	// Views
	const isCreate = ref(false);
	const isEdit = ref(false);
	const invoiceHeaderId = ref(0);

	const { t } = useI18n();
	const { 
		invoiceHeader, 
		invoiceHeaders, 
		getInvoiceHeaders, 
		storeInvoiceHeader, 
		updateInvoiceHeader, 
		destroyInvoiceHeader, 
		downloadInvoiceHeader
	} = useInvoiceHeader();
	


	const findData = async() => {
		await getInvoiceHeaders();
		return toRaw(invoiceHeaders.value);
	}


	const formatHasPaid = (value) => {
		return value === 0 ? t("no") : t("yes");
	}


	// Table
	const columns = [
		{ label: t("customer"), field: 'customer.company.name' },
		{ label: t("number"), field: 'invoice_string' },
		{ label: t("date"), field: 'invoice_date', type: 'date', dateInputFormat: 'yyyy-MM-dd', dateOutputFormat: 'dd-MM-yyyy' },
		{ label: t("vat_quote"), field: 'vat_quote', formatFn: formatDecimal, tdClass: 'text-right', type: 'number', tdClass: 'vgt-right-align' },
		{ label: t("total_without_vat"), field: 'total_without_vat', formatFn: formatDecimal, type: 'number', tdClass: 'vgt-right-align' },
		{ label: t("total_with_vat"), field: 'total_with_vat', formatFn: formatDecimal, type: 'number', tdClass: 'vgt-right-align' },
		{ label: t('actions'), field: 'actions', sortable: false, searchable: false, width: '100px' },		
	];
	
	//Store
	const showCreateInvoiceHeader = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveInvoiceHeaderForm = async (form) => {
		isCreate.value = false;
		div_table.style.display = 'block';
		await storeInvoiceHeader({ ...form });
		rows.value = await findData();
		await Toast(t("message.record_saved"), 'success');
	}

	//Edit
	// const showEditInvoiceHeader = (id) => {
	// 	isEdit.value = true;
	// 	div_table.style.display = 'none';
	// 	invoiceHeaderId.value = id;
	// }

	// const cancelEdit = async() => {
	// 	isEdit.value = false;
	// 	div_table.style.display = 'block';
	// }

	// const updateInvoiceHeaderForm = async (id, data) => {
	// 	isEdit.value = false;
	// 	div_table.style.display = 'block';
	// 	await updateInvoiceHeader(id, data);
	// 	rows.value = await findData();
	// 	await Toast(t("message.record_updated"), 'success');
	// }

	// Delete
	const showDeleteInvoiceHeader = async (id, description='') => {
		Swal.fire({
			icon: 'warning',
			title: t("message.are_you_sure"),
			text: t("delete") + (description !== '' ? ': ' + description : ''),
			showCancelButton: true,
			confirmButtonText: t("delete"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyInvoiceHeader(id);
		rows.value = await findData();
				Swal.fire(t("message.record_deleted"), '', 'success');
			}

		});

	}


	const downloadFileInvoiceHeader = async (id) => {
		await downloadInvoiceHeader(id);
		const newWindow = window.open('', '_blank');
		if (newWindow) {
			newWindow.document.body.style.margin = '0';
			newWindow.document.body.innerHTML = 
			`<iframe src="${invoiceHeader.value.data}" frameborder="0" style="border:0; width:100vw; height:100vh;" allowfullscreen></iframe>`;
		} else {
			console.error('No se pudo abrir la nueva pestaña');
		}

	}



	onMounted(async () => {
		rows.value = await findData();
		
		
	});


</script>

<style scoped>

</style>
