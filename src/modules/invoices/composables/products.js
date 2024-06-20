import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useProduct() {

	const product = ref();
	const products = ref([]);
	const productErrors = ref([]);
	const { t } = useI18n();

	const getProducts = async () => {
		productErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}products/list`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				productErrors.value = res.errors;
			}else{
				products.value = res.data;
			}
		})
		.catch((e) => {
			productErrors.value.push(t("errors.error_internal"));
		});
	}


	const getProduct = async (id) => {
		productErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}products/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				productErrors.value = res.errors;
			}else{
				product.value = res.data;
			}
		})
		.catch((e) => {
			productErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeProduct = async (data) => {
		productErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}products/store`,{
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
				productErrors.value = res.errors;
			}else{
				product.value = res.data;
			}
		})
		.catch((e) => {
			productErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateProduct = async (id, data) => {
		productErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}products/update/${id}`,{
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
				productErrors.value = res.errors;
			}else{
				product.value = res.data;
			}
		})
		.catch((e) => {
			productErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyProduct = async (id) => {
		productErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL}products/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				productErrors.value = res.errors;
			}else{
				product.value = res.data;
			}
		})
		.catch((e) => {
			productErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		productErrors,
		product,
		products,
		getProduct,
		getProducts,
		storeProduct,
		updateProduct,
		destroyProduct,
	}

}
