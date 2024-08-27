import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useCustomerAppInvoice() {

	const customerAppInvoice = ref();
	const customerAppInvoices = ref([]);
	const customerAppInvoiceErrors = ref([]);
	const { t } = useI18n();

	const getCustomerAppInvoices = async () => {
		customerAppInvoiceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}customer-app-invoices/list`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				customerAppInvoiceErrors.value = res.errors;
			}else{
				customerAppInvoices.value = res.data;
			}
		})
		.catch((e) => {
			customerAppInvoiceErrors.value.push(t("errors.error_internal"));
		});
	}


	const getCustomerAppInvoice = async (id) => {
		customerAppInvoiceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}customer-app-invoices/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				customerAppInvoiceErrors.value = res.errors;
			}else{
				customerAppInvoice.value = res.data;
			}
		})
		.catch((e) => {
			customerAppInvoiceErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeCustomerAppInvoice = async (data) => {
		customerAppInvoiceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}customer-app-invoices/store`,{
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				customerAppInvoiceErrors.value = res.errors;
			}else{
				customerAppInvoice.value = res.data;
			}
		})
		.catch((e) => {
			customerAppInvoiceErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateCustomerAppInvoice = async (id, data) => {
		customerAppInvoiceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}customer-app-invoices/update/${id}`,{
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				customerAppInvoiceErrors.value = res.errors;
			}else{
				customerAppInvoice.value = res.data;
			}
		})
		.catch((e) => {
			customerAppInvoiceErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyCustomerAppInvoice = async (id) => {
		customerAppInvoiceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}customer-app-invoices/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				customerAppInvoiceErrors.value = res.errors;
			}else{
				customerAppInvoice.value = res.data;
			}
		})
		.catch((e) => {
			customerAppInvoiceErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		customerAppInvoiceErrors,
		customerAppInvoice,
		customerAppInvoices,
		getCustomerAppInvoice,
		getCustomerAppInvoices,
		storeCustomerAppInvoice,
		updateCustomerAppInvoice,
		destroyCustomerAppInvoice,
	}

}
