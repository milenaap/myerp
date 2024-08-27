import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useAppDevice() {

	const appDevice = ref();
	const appDevices = ref([]);
	const appDeviceErrors = ref([]);
	const { t } = useI18n();

	const getAppDevices = async () => {
		appDeviceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}app-devices/list`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				appDeviceErrors.value = res.errors;
			}else{
				appDevices.value = res.data;
			}
		})
		.catch((e) => {
			appDeviceErrors.value.push(t("errors.error_internal"));
		});
	}


	const getAppDevice = async (id) => {
		appDeviceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}app-devices/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				appDeviceErrors.value = res.errors;
			}else{
				appDevice.value = res.data;
			}
		})
		.catch((e) => {
			appDeviceErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeAppDevice = async (data) => {
		appDeviceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}app-devices/store`,{
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
				appDeviceErrors.value = res.errors;
			}else{
				appDevice.value = res.data;
			}
		})
		.catch((e) => {
			appDeviceErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateAppDevice = async (id, data) => {
		appDeviceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}app-devices/update/${id}`,{
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
				appDeviceErrors.value = res.errors;
			}else{
				appDevice.value = res.data;
			}
		})
		.catch((e) => {
			appDeviceErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyAppDevice = async (id) => {
		appDeviceErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}app-devices/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				appDeviceErrors.value = res.errors;
			}else{
				appDevice.value = res.data;
			}
		})
		.catch((e) => {
			appDeviceErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		appDeviceErrors,
		appDevice,
		appDevices,
		getAppDevice,
		getAppDevices,
		storeAppDevice,
		updateAppDevice,
		destroyAppDevice,
	}

}
