import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useCustomerInvoice() {

	const customerInvoice = ref();
	const customerInvoices = ref([]);
	const customerInvoiceErrors = ref([]);
	const { t } = useI18n();

	const getCustomerInvoices = async () => {
		customerInvoiceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}customer-invoices/list`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				customerInvoiceErrors.value = res.errors;
			}else{
				customerInvoices.value = res.data;
			}
		})
		.catch((e) => {
			customerInvoiceErrors.value.push(t("errors.error_internal"));
		});
	}


	const getCustomerInvoice = async (id) => {
		customerInvoiceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}customer-invoices/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				customerInvoiceErrors.value = res.errors;
			}else{
				customerInvoice.value = res.data;
			}
		})
		.catch((e) => {
			customerInvoiceErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeCustomerInvoice = async (data) => {
		customerInvoiceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}customer-invoices/store`,{
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
				customerInvoiceErrors.value = res.errors;
			}else{
				customerInvoice.value = res.data;
			}
		})
		.catch((e) => {
			customerInvoiceErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateCustomerInvoice = async (id, data) => {
		customerInvoiceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}customer-invoices/update/${id}`,{
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
				customerInvoiceErrors.value = res.errors;
			}else{
				customerInvoice.value = res.data;
			}
		})
		.catch((e) => {
			customerInvoiceErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyCustomerInvoice = async (id) => {
		customerInvoiceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}customer-invoices/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				customerInvoiceErrors.value = res.errors;
			}else{
				customerInvoice.value = res.data;
			}
		})
		.catch((e) => {
			customerInvoiceErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		customerInvoiceErrors,
		customerInvoice,
		customerInvoices,
		getCustomerInvoice,
		getCustomerInvoices,
		storeCustomerInvoice,
		updateCustomerInvoice,
		destroyCustomerInvoice,
	}

}
