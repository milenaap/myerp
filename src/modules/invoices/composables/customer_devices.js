import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useCustomerDevice() {

	const customerDevice = ref();
	const customerDevices = ref([]);
	const customerDeviceErrors = ref([]);
	const { t } = useI18n();

	const getCustomerDevices = async () => {
		customerDeviceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}customer-devices/list`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				customerDeviceErrors.value = res.errors;
			}else{
				customerDevices.value = res.data;
			}
		})
		.catch((e) => {
			customerDeviceErrors.value.push(t("errors.error_internal"));
		});
	}


	const getCustomerDevice = async (id) => {
		customerDeviceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}customer-devices/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				customerDeviceErrors.value = res.errors;
			}else{
				customerDevice.value = res.data;
			}
		})
		.catch((e) => {
			customerDeviceErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeCustomerDevice = async (data) => {
		customerDeviceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}customer-devices/store`,{
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
				customerDeviceErrors.value = res.errors;
			}else{
				customerDevice.value = res.data;
			}
		})
		.catch((e) => {
			customerDeviceErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateCustomerDevice = async (id, data) => {
		customerDeviceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}customer-devices/update/${id}`,{
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
				customerDeviceErrors.value = res.errors;
			}else{
				customerDevice.value = res.data;
			}
		})
		.catch((e) => {
			customerDeviceErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyCustomerDevice = async (id) => {
		customerDeviceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}customer-devices/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				customerDeviceErrors.value = res.errors;
			}else{
				customerDevice.value = res.data;
			}
		})
		.catch((e) => {
			customerDeviceErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		customerDeviceErrors,
		customerDevice,
		customerDevices,
		getCustomerDevice,
		getCustomerDevices,
		storeCustomerDevice,
		updateCustomerDevice,
		destroyCustomerDevice,
	}

}
