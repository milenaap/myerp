<template>

	<!-- BEGIN: Page Layout Create -->
	<!-- <div v-animate v-if="isCreate">
		<Create
			@saveInvoiceCounterForm="saveInvoiceCounterForm"
			@cancelCreate="cancelCreate"
		/>
	</div> -->

	<!-- BEGIN: Page Layout Update -->
	<!-- <div v-animate v-if="isEdit">
		<Edit
			:invoiceCounterId="invoiceCounterId"
			@cancelEdit="cancelEdit"
			@updateInvoiceCounterForm="updateInvoiceCounterForm"
		/>
	</div> -->

	<!-- BEGIN: Table -->
	<div v-animate class="p-5 border rounded-md shadow-sm" id="div_table">
		<div class="flex flex-col sm:flex-row xl:items-start justify-between mb-5">
			<h1 class="mt-0">{{ $t("invoice_counter") }}</h1>
			<!-- <button class="btn-primary sm:w-auto" @click.prevent="showCreateInvoiceCounter">
				<div class="flex flex-row">
					<IconAdd />
					{{ $t("add") }}
				</div>
			</button> -->
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
			<!-- <template #table-row="props">
				<span v-if="props.column.field == 'actions'">
					<button @click="showEditCompany(props.row.id)">
						<IconEdit />
					</button>
					<button @click="showDeleteInvoiceCounter(props.row.id)">
						<IconDelete />
					</button>
					</span>
				</template> -->
			</VueGoodTable>
		</div>

	</div>

</template>
<script setup>
	import { ref, onMounted, toRaw } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { Toast } from '@/utils/toast';
	import Swal from 'sweetalert2';
	import useInvoiceCounters from "../../composables/invoice_counters";
// 	import IconAdd from '@/components/icons/IconAdd.vue';
// import IconEdit from '@/components/icons/IconEdit.vue';
// import IconDelete from '@/components/icons/IconDelete.vue';
	//import Create from "../../invoice_counters/InvoiceCounterCreate.vue";
	//import Edit from "../../invoice_counters/InvoiceCounterEdit.vue";

	// Tabulator
	const rows = ref([]);

	// Views
	const isCreate = ref(false);
	const isEdit = ref(false);
	const invoiceCounterId = ref(0);

	const { t } = useI18n();
	const { invoiceCounters, getInvoiceCounters, storeInvoiceCounter, updateInvoiceCounter, destroyInvoiceCounter} = useInvoiceCounters();


	const findData = async() => {
		await getInvoiceCounters();
		return toRaw(invoiceCounters.value);
	}

	// Table
	const columns = [
		{ label: t("year"), field: 'year' },
		{ label: t("serial"), field: 'serial' },
		{ label: t("counter"), field: 'counter' },
		{ label: t('actions'), field: 'actions', sortable: false, searchable: false, width: '100px',},
	];
	//Store
	const showCreateInvoiceCounter = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveInvoiceCounterForm = async (form) => {
		isCreate.value = false;
		div_table.style.display = 'block';
		await storeInvoiceCounter({ ...form });
		rows.value = await findData();
		await Toast(t("message.record_saved"), 'success');
	}

	//Edit
	const showEditInvoiceCounter = (id) => {
		isEdit.value = true;
		div_table.style.display = 'none';
		invoiceCounterId.value = id;
	}

	const cancelEdit = async() => {
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	const updateInvoiceCounterForm = async (id, data) => {
		isEdit.value = false;
		div_table.style.display = 'block';
		await updateInvoiceCounter(id, data);
		rows.value = await findData();
		await Toast(t("message.record_updated"), 'success');
	}

	// Delete
	const showDeleteInvoiceCounter = async (id, description='') => {
		Swal.fire({
			icon: 'warning',
			title: t("message.are_you_sure"),
			text: t("delete") + (description !== '' ? ': ' + description : ''),
			showCancelButton: true,
			confirmButtonText: t("delete"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyInvoiceCounter(id);
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
