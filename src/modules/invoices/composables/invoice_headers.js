import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useInvoiceHeader() {

	const invoiceHeader = ref();
	const invoiceHeaders = ref([]);
	const invoiceHeaderErrors = ref([]);
	const { t } = useI18n();


	const downloadInvoiceHeader = async (id) => {
		invoiceHeaderErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}invoice-headers/download/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				invoiceHeaderErrors.value = res.errors;
			}else{
				invoiceHeader.value = res.data;
			}
		})
		.catch((e) => {
			invoiceHeaderErrors.value.push(t("errors.error_internal"));
		});
	}



	const getInvoiceHeaders = async (param = '') => {
		invoiceHeaderErrors.value = [];
			
		await fetch(`${import.meta.env.VITE_API_URL}invoice-headers/list${param}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				invoiceHeaderErrors.value = res.errors;
			}else{
				invoiceHeaders.value = res.data;
			}
		})
		.catch((e) => {
			invoiceHeaderErrors.value.push(t("errors.error_internal"));
		});
	}



	const getInvoiceHeader = async (id) => {
		invoiceHeaderErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}invoice-headers/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				invoiceHeaderErrors.value = res.errors;
			}else{
				invoiceHeader.value = res.data;
			}
		})
		.catch((e) => {
			invoiceHeaderErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeInvoiceHeader = async (data) => {
		invoiceHeaderErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}invoice-headers/store`,{
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				invoiceHeaderErrors.value = res.errors;
			}else{
				invoiceHeader.value = res.data;
			}
		})
		.catch((e) => {
			invoiceHeaderErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateInvoiceHeader = async (id, data) => {
		invoiceHeaderErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}invoice-headers/update/${id}`,{
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				invoiceHeaderErrors.value = res.errors;
			}else{
				invoiceHeader.value = res.data;
			}
		})
		.catch((e) => {
			invoiceHeaderErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyInvoiceHeader = async (id) => {
		invoiceHeaderErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}invoice-headers/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				invoiceHeaderErrors.value = res.errors;
			}else{
				invoiceHeader.value = res.data;
			}
		})
		.catch((e) => {
			invoiceHeaderErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		invoiceHeaderErrors,
		invoiceHeader,
		invoiceHeaders,
		getInvoiceHeader,
		getInvoiceHeaders,
		storeInvoiceHeader,
		updateInvoiceHeader,
		destroyInvoiceHeader,
		downloadInvoiceHeader,
	}

}
