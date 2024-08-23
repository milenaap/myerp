<template>

	<!-- BEGIN: Page Layout Create -->
	<div v-animate v-if="isCreate">
		<Create
			@saveOwnCompanyForm="saveOwnCompanyForm"
			@cancelCreate="cancelCreate"
		/>
	</div>

	<!-- BEGIN: Page Layout Update -->
	<div v-animate v-if="isEdit">
		<Edit
			:ownCompanyId="ownCompanyId"
			@cancelEdit="cancelEdit"
			@updateOwnCompanyForm="updateOwnCompanyForm"
		/>
	</div>

	<!-- BEGIN: Table -->
	<div v-animate class="p-5 border rounded-md shadow-sm" id="div_table">
		<div class="flex flex-col sm:flex-row sm:items-end xl:items-start justify-end">
			<div class="flex mt-5 mb-5 sm:mt-0">
				<button class="btn-primary w-1/2 sm:w-auto" @click.prevent="showCreateOwnCompany">
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
					<button @click="showEditOwnCompany(props.row.id)">
						<IconEdit />
					</button>
					<button @click="showDeleteOwnCompany(props.row.id)">
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
	import useOwnCompanies from "@/modules/invoices/composables/own_companies";
	import Create from "@/components/own_companies/OwnCompanyCreate.vue";
	import Edit from "@/components/own_companies/OwnCompanyEdit.vue";
	import IconAdd from '@/components/icons/IconAdd.vue';
	import IconEdit from '@/components/icons/IconEdit.vue';
	import IconDelete from '@/components/icons/IconDelete.vue';
	// Tabulator
	const rows = ref([]);

	// Views
	const isCreate = ref(false);
	const isEdit = ref(false);
	const ownCompanyId = ref(0);

	const { t } = useI18n();
	const { 
		ownCompanies, 
		ownCompanyErrors, 
		getOwnCompanies, 
		storeOwnCompany, 
		updateOwnCompany, 
		destroyOwnCompany
	} = useOwnCompanies();


	const findData = async() => {
		await getOwnCompanies();
		return toRaw(ownCompanies.value);
	}

	// Table
	const columns = [
		{ label: t("country_id"), field: 'country_id' },
		{ label: t("name"), field: 'name' },
		{ label: t("tax"), field: 'tax' },
		{ label: t("address"), field: 'address' },
		{ label: t("zip_code"), field: 'zip_code' },
		{ label: t("state"), field: 'state' },
		{ label: t("municipality"), field: 'municipality' },
		{ label: t("email"), field: 'email' },
		{ label: t("phone"), field: 'phone' },
		{ label: t("website"), field: 'website' },
		{ label: t('actions'), field: 'actions', sortable: false, searchable: false, width: '100px',},
	];
	//Store
	const showCreateOwnCompany = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveOwnCompanyForm = async (form) => {
		isCreate.value = false;
		div_table.style.display = 'block';
		await storeOwnCompany({ ...form });
		if (ownCompanyErrors.value.length === 0) {
			await Toast(t("message.record_saved"), 'success');
		}else{
			const errorMessages = ownCompanyErrors.value.flatMap(errorObj => Object.values(errorObj).flat()).join(', ');
			await Toast(errorMessages, 'error');
		}
		rows.value = await findData();
	}

	//Edit
	const showEditOwnCompany = (id) => {
		isEdit.value = true;
		div_table.style.display = 'none';
		ownCompanyId.value = id;
	}

	const cancelEdit = async() => {
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	const updateOwnCompanyForm = async (id, data) => {
		isEdit.value = false;
		div_table.style.display = 'block';
		await updateOwnCompany(id, data);
		if (ownCompanyErrors.value.length === 0) {
			await Toast(t("message.record_updated"), 'success');
		}else{
			const errorMessages = ownCompanyErrors.value.flatMap(errorObj => Object.values(errorObj).flat()).join(', ');
			await Toast(errorMessages, 'error');
		}
		rows.value = await findData();
	}

	// Delete
	const showDeleteOwnCompany = async (id, description='') => {
		Swal.fire({
			icon: 'warning',
			title: t("message.are_you_sure"),
			text: t("delete") + (description !== '' ? ': ' + description : ''),
			showCancelButton: true,
			confirmButtonText: t("delete"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyOwnCompany(id);
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
