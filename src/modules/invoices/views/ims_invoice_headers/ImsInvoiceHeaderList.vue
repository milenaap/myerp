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
			<h1 class="mt-0">{{ $t("ims_invoice_headers") }}</h1>
			<button class="btn-primary sm:w-auto" @click.prevent="showCreateImsInvoiceHeader">
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
						<button @click="showEditImsInvoiceHeader(props.row.id)">
							<IconEdit />
						</button>
						<button @click="showDeleteImsInvoiceHeader(props.row.id)">
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
	import useImsInvoiceHeader from "../../composables/ims_invoice_headers";
	import Create from "../../components/ims_invoice_headers/ImsInvoiceHeaderCreate.vue";
	import Edit from "../../components/ims_invoice_headers/ImsInvoiceHeaderEdit.vue";
	import IconAdd from '@/components/icons/IconAdd.vue';
	import IconEdit from '@/components/icons/IconEdit.vue';
	import IconDelete from '@/components/icons/IconDelete.vue';

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
		{ label: t("month"), field: 'month' },
		{ label: t("year"), field: 'year' },
		{ label: t("processed_at"), field: 'processed_at' },
		{ label: t("invoiced_at"), field: 'invoiced_at' },
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
