import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useRemittanceType() {

	const remittanceType = ref();
	const remittanceTypes = ref([]);
	const remittanceTypeErrors = ref([]);
	const { t } = useI18n();

	const getRemittanceTypes = async () => {
		remittanceTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}remittance-types/list`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				remittanceTypeErrors.value = res.errors;
			}else{
				remittanceTypes.value = res.data;
			}
		})
		.catch((e) => {
			remittanceTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	const getRemittanceType = async (id) => {
		remittanceTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}remittance-types/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				remittanceTypeErrors.value = res.errors;
			}else{
				remittanceType.value = res.data;
			}
		})
		.catch((e) => {
			remittanceTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeRemittanceType = async (data) => {
		remittanceTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}remittance-types/store`,{
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
				remittanceTypeErrors.value = res.errors;
			}else{
				remittanceType.value = res.data;
			}
		})
		.catch((e) => {
			remittanceTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateRemittanceType = async (id, data) => {
		remittanceTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}remittance-types/update/${id}`,{
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
				remittanceTypeErrors.value = res.errors;
			}else{
				remittanceType.value = res.data;
			}
		})
		.catch((e) => {
			remittanceTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyRemittanceType = async (id) => {
		remittanceTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}remittance-types/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				remittanceTypeErrors.value = res.errors;
			}else{
				remittanceType.value = res.data;
			}
		})
		.catch((e) => {
			remittanceTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		remittanceTypeErrors,
		remittanceType,
		remittanceTypes,
		getRemittanceType,
		getRemittanceTypes,
		storeRemittanceType,
		updateRemittanceType,
		destroyRemittanceType,
	}

}
