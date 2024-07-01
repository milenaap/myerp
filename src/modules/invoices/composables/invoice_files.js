import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useInvoiceFile() {

	const invoiceFile = ref();
	const invoiceFiles = ref([]);
	const invoiceFileErrors = ref([]);
	const { t } = useI18n();

	const getInvoiceFiles = async () => {
		invoiceFileErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}invoice-files/list`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				invoiceFileErrors.value = res.errors;
			}else{
				invoiceFiles.value = res.data;
			}
		})
		.catch((e) => {
			invoiceFileErrors.value.push(t("errors.error_internal"));
		});
	}


	const getInvoiceFile = async (id) => {
		invoiceFileErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}invoice-files/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				invoiceFileErrors.value = res.errors;
			}else{
				invoiceFile.value = res.data;
			}
		})
		.catch((e) => {
			invoiceFileErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeInvoiceFile = async (data) => {
		invoiceFileErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}invoice-files/store`,{
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
				invoiceFileErrors.value = res.errors;
			}else{
				invoiceFile.value = res.data;
			}
		})
		.catch((e) => {
			invoiceFileErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateInvoiceFile = async (id, data) => {
		invoiceFileErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}invoice-files/update/${id}`,{
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
				invoiceFileErrors.value = res.errors;
			}else{
				invoiceFile.value = res.data;
			}
		})
		.catch((e) => {
			invoiceFileErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyInvoiceFile = async (id) => {
		invoiceFileErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}invoice-files/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				invoiceFileErrors.value = res.errors;
			}else{
				invoiceFile.value = res.data;
			}
		})
		.catch((e) => {
			invoiceFileErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		invoiceFileErrors,
		invoiceFile,
		invoiceFiles,
		getInvoiceFile,
		getInvoiceFiles,
		storeInvoiceFile,
		updateInvoiceFile,
		destroyInvoiceFile,
	}

}
