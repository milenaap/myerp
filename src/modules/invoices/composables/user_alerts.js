import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useUserAlert() {

	const userAlert = ref();
	const userAlerts = ref([]);
	const userAlertErrors = ref([]);
	const { t } = useI18n();

	const getUserAlerts = async () => {
		userAlertErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}user-alerts/list`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				userAlertErrors.value = res.errors;
			}else{
				userAlerts.value = res.data;
			}
		})
		.catch((e) => {
			userAlertErrors.value.push(t("errors.error_internal"));
		});
	}


	const getUserAlert = async (id) => {
		userAlertErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}user-alerts/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				userAlertErrors.value = res.errors;
			}else{
				userAlert.value = res.data;
			}
		})
		.catch((e) => {
			userAlertErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeUserAlert = async (data) => {
		userAlertErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}user-alerts/store`,{
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
				userAlertErrors.value = res.errors;
			}else{
				userAlert.value = res.data;
			}
		})
		.catch((e) => {
			userAlertErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateUserAlert = async (id, data) => {
		userAlertErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}user-alerts/update/${id}`,{
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
				userAlertErrors.value = res.errors;
			}else{
				userAlert.value = res.data;
			}
		})
		.catch((e) => {
			userAlertErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyUserAlert = async (id) => {
		userAlertErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}user-alerts/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				userAlertErrors.value = res.errors;
			}else{
				userAlert.value = res.data;
			}
		})
		.catch((e) => {
			userAlertErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		userAlertErrors,
		userAlert,
		userAlerts,
		getUserAlert,
		getUserAlerts,
		storeUserAlert,
		updateUserAlert,
		destroyUserAlert,
	}

}
