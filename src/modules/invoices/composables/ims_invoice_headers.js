import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useImsInvoiceHeader() {

	const imsInvoiceHeader = ref();
	const imsInvoiceHeaders = ref([]);
	const imsInvoiceHeaderErrors = ref([]);
	const { t } = useI18n();

	const getImsInvoiceHeaders = async () => {
		imsInvoiceHeaderErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}ims-invoice-headers/list`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				imsInvoiceHeaderErrors.value = res.errors;
			}else{
				imsInvoiceHeaders.value = res.data;
			}
		})
		.catch((e) => {
			imsInvoiceHeaderErrors.value.push(t("errors.error_internal"));
		});
	}


	const getImsInvoiceHeader = async (id) => {
		imsInvoiceHeaderErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}ims-invoice-headers/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				imsInvoiceHeaderErrors.value = res.errors;
			}else{
				imsInvoiceHeader.value = res.data;
			}
		})
		.catch((e) => {
			imsInvoiceHeaderErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeImsInvoiceHeader = async (data) => {
		imsInvoiceHeaderErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}ims-invoice-headers/store`,{
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
				imsInvoiceHeaderErrors.value = res.errors;
			}else{
				imsInvoiceHeader.value = res.data;
			}
		})
		.catch((e) => {
			imsInvoiceHeaderErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateImsInvoiceHeader = async (id, data) => {
		imsInvoiceHeaderErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}ims-invoice-headers/update/${id}`,{
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
				imsInvoiceHeaderErrors.value = res.errors;
			}else{
				imsInvoiceHeader.value = res.data;
			}
		})
		.catch((e) => {
			imsInvoiceHeaderErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyImsInvoiceHeader = async (id) => {
		imsInvoiceHeaderErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}ims-invoice-headers/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				imsInvoiceHeaderErrors.value = res.errors;
			}else{
				imsInvoiceHeader.value = res.data;
			}
		})
		.catch((e) => {
			imsInvoiceHeaderErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		imsInvoiceHeaderErrors,
		imsInvoiceHeader,
		imsInvoiceHeaders,
		getImsInvoiceHeader,
		getImsInvoiceHeaders,
		storeImsInvoiceHeader,
		updateImsInvoiceHeader,
		destroyImsInvoiceHeader,
	}

}
