<template>

	<!-- BEGIN: Page Layout Create -->
	<div v-animate v-if="isCreate">
		<Create
			@saveCompanyForm="saveCompanyForm"
			@cancelCreate="cancelCreate"
		/>
	</div>

	<!-- BEGIN: Page Layout Update -->
	<div v-animate v-if="isEdit">
		<Edit
			:companyId="companyId"
			@cancelEdit="cancelEdit"
			@updateCompanyForm="updateCompanyForm"
		/>
	</div>

	

	<!-- BEGIN: Table -->
	<div v-animate id="div_table">
		<div class="flex flex-col sm:flex-row xl:items-start justify-between mb-5">
			<div>
				<h1 class="mt-0"> {{ $t("customers") }}</h1>
			</div>
			

			<div>
				
				<button class="btn-secondary sm:w-auto mr-3" @click.prevent="showCreateCompany">
					<div class="flex flex-row">
						<IconTransfer />
						{{ $t("Transferir APP") }}
					</div>
				</button>

				<button class="btn-primary sm:w-auto" @click.prevent="showCreateCompany">
					<div class="flex flex-row">
						<IconAdd />
						{{ $t("add") }}
					</div>
				</button>

			</div>

			
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
						<button @click="showEditCompany(props.row.id)">
							<IconEdit />
						</button>
						<button @click="showDeleteCompany(props.row.id)">
							<IconDelete />
						</button>
						</span>

						<span v-if="props.column.field === 'customer'" v-html="props.formattedRow[props.column.field]"></span>
						<span v-else>{{ props.formattedRow[props.column.field] }}</span>
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

	import useCompany from "../../composables/companies";
	import useCustomers from "@/modules/invoices/composables/customers";

	import Create from "../../components/companies/CompanyCreate.vue";
	import Edit from "../../components/companies/CompanyEdit.vue";
	import IconTransfer from '@/components/icons/IconTransfer.vue';
	


	// Tabulator
	const rows = ref([]);

	// Views
	const isCreate = ref(false);
	const isEdit = ref(false);
	
	const companyId = ref(0);

	const { t } = useI18n();
	const { company, companyErrors, companies, getCompanies, storeCompany, updateCompany, destroyCompany} = useCompany();

	const { customer, customerErrors, storeCustomer, updateCustomer, destroyCustomer} = useCustomers();



	const findData = async() => {
		await getCompanies();
		return toRaw(companies.value);
	}


	const findIcons = (value) => {

		let icons = '';

		if (!value) {
			return `<div style="display: flex; align-items: center;" title="Error">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 mr-3" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m6 11l5-5l13 13L37 6l5 5l-13 13l13 13l-5 5l-13-13l-13 13l-5-5l13-13z" clip-rule="evenodd"/></svg>
						<span>No hay servicios activos</span>
					</div>`;
		}

		if (value.customer_invoice) {
			icons += `
			<a href="/settings/customer-invoices" style="display: flex; align-items: center; margin-right: 8px;" title="Facturación activa">

				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500 mr-3" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3v19l3-2l3 2l3-2l1.3.86c-.2-.58-.3-1.21-.3-1.86a6.005 6.005 0 0 1 8-5.66V3zm14 4v2H7V7zm-2 4v2H7v-2zm.5 8l2.75 3L23 17.23l-1.16-1.41l-3.59 3.59l-1.59-1.59z"/></svg>
			</a>`;
		}else{
			icons += `
			<a href="/settings/customer-invoices" style="display: flex; align-items: center; margin-right: 8px;" title="Facturación no activa">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 mr-3" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3v19l3-2l3 2l3-2l1.3.86c-.2-.58-.3-1.21-.3-1.86a6.005 6.005 0 0 1 8-5.66V3zm14 4v2H7V7zm-2 4v2H7v-2zm4 6.6l-2.1-2.1l-1.4 1.4l2.1 2.1l-2.1 2.1l1.4 1.4l2.1-2.1l2.1 2.1l1.4-1.4l-2.1-2.1l2.1-2.1l-1.4-1.4z"/></svg>
			</a>`;
		}


		if (value.customer_app_invoice) {
			icons += `
			<a href="/settings/customer-invoices" style="display: flex; align-items: center; margin-right: 8px;" title="Aplicación activa">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500 mr-3" viewBox="0 0 24 24"><path fill="currentColor" d="M6.616 22q-.667 0-1.141-.475T5 20.386V3.615q0-.666.475-1.14T6.615 2h8.77q.666 0 1.14.475T17 3.614v3.308h-1V5.5H6v13h10v-1.423h1v3.298q0 .68-.475 1.153q-.474.472-1.14.472zm8.334-6.692l-3.558-3.558l.708-.708l2.85 2.85l5.689-5.688l.707.707z"/></svg>
			</a>`;
		}else{
			icons += `
			<a href="/settings/customer-invoices" style="display: flex; align-items: center; margin-right: 8px;" title="Aplicación no activa">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 mr-3" viewBox="0 0 24 24"><path fill="currentColor" d="M20.846 22.762L1.008 2.923l.708-.708l19.838 19.839zM6 7.214l1 1V18.5h9.927L18 19.573v.812q0 .67-.472 1.143q-.472.472-1.143.472h-8.77q-.67 0-1.143-.472Q6 21.056 6 20.385zM7.402 5.5L6.034 4.108v-.654q.058-.613.507-1.034Q6.991 2 7.616 2h8.769q.69 0 1.152.463T18 3.616v12.073l-1-1V5.5z"/></svg>
			</a>`;
		}



		if (!icons) {
			icons = `
			<div style="display: flex; align-items: center; margin-right: 8px;" title="Invoice Tooltip">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6 text-red-500 mr-3" fill="currentColor">
					<path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM10.5 17H7.5V15H10.5V17ZM16.5 17H13.5V15H16.5V17ZM17.25 13.5H6.75V7.5H17.25V13.5Z"/>
				</svg>
				No hay servicios activos
			</div>`;
		}

		return `<div style="display: flex; align-items: center; justify-content: center">${icons}</div>`;
	}


	
	// Table
	const columns = [
		{ label: t("name"), field: 'name' },
		{ label: t("customer_code"), field: 'customer.code' },
		{ label: t("Servicios Activos"), field: 'customer', formatFn: findIcons, width: '180px',},
		{ label: t('actions'), field: 'actions', sortable: false, searchable: false, width: '100px',},
	];
	//Store
	const showCreateCompany = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveCompanyForm = async (form) => {
		isCreate.value = false;
		div_table.style.display = 'block';
		
		await storeCompany({ ...form });

		if (companyErrors.value.length > 0) {
			const errorMessages = companyErrors.value.flatMap(errorObj => Object.values(errorObj).flat()).join(', ');
			await Toast(errorMessages, 'error');
        }


		form.company_id = company.value.id;
		await storeCustomer({...form});

		if (customerErrors.value.length > 0) {
			const errorMessages = customerErrors.value.flatMap(errorObj => Object.values(errorObj).flat()).join(', ');
			await Toast(errorMessages, 'error');
        }

		if (customerErrors.value.length === 0 && companyErrors.value.length === 0) {
			await Toast(t("message.record_saved"), 'success');
		}

		rows.value = await findData();

	}

	//Edit
	const showEditCompany = (id) => {
		isEdit.value = true;
		div_table.style.display = 'none';
		companyId.value = id;
	}

	const cancelEdit = async() => {
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	const updateCompanyForm = async (id, data) => {
		isEdit.value = false;
		div_table.style.display = 'block';
		
		//Update Company
		await updateCompany(id, data);

		//Update customer
		await updateCustomer(data.customer_id, data)

		rows.value = await findData()
		await Toast(t("message.record_updated"), 'success');
	}

	// Delete
	const showDeleteCompany = async (id, description='') => {
		Swal.fire({
			icon: 'warning',
			title: t("message.are_you_sure"),
			text: t("delete") + (description !== '' ? ': ' + description : ''),
			showCancelButton: true,
			confirmButtonText: t("delete"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyCompany(id);
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
