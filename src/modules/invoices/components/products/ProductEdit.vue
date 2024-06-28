<template>

	<!-- BEGIN: Card -->
	<div class="card">
		<!-- BEGIN: Form -->
		<form class="validate-form" @submit.prevent="save">

			<!-- BEGIN: container -->
			<div class="grid grid-cols-12 gap-6">

				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="name" class="form-label w-full">
							{{ $t("name") }} *
						</label>
						<input
							v-model.trim="validate.name.$model"
							id="name"
							type="text"
							name="name"
							class="form-control"
							:class="{ 'border-danger': validate.name.$error }"
						/>
						<template v-if="validate.name.$error">
							<div v-for="(error, index) in validate.name.$errors" :key="index" class="text-danger mt-2">
						{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="purchase_price_without_vat" class="form-label w-full">
							{{ $t("purchase_price_without_vat") }} *
						</label>
						<input
							v-model.trim="validate.purchase_price_without_vat.$model"
							id="purchase_price_without_vat"
							type="text"
							name="purchase_price_without_vat"
							class="form-control"
							:class="{ 'border-danger': validate.purchase_price_without_vat.$error }"
						/>
						<template v-if="validate.purchase_price_without_vat.$error">
							<div v-for="(error, index) in validate.purchase_price_without_vat.$errors" :key="index" class="text-danger mt-2">
						{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="sale_price_without_vat" class="form-label w-full">
							{{ $t("sale_price_without_vat") }} *
						</label>
						<input
							v-model.trim="validate.sale_price_without_vat.$model"
							id="sale_price_without_vat"
							type="text"
							name="sale_price_without_vat"
							class="form-control"
							:class="{ 'border-danger': validate.sale_price_without_vat.$error }"
						/>
						<template v-if="validate.sale_price_without_vat.$error">
							<div v-for="(error, index) in validate.sale_price_without_vat.$errors" :key="index" class="text-danger mt-2">
						{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="vat_quote" class="form-label w-full">
							{{ $t("vat_quote") }} *
						</label>
						<input
							v-model.trim="validate.vat_quote.$model"
							id="vat_quote"
							type="text"
							name="vat_quote"
							class="form-control"
							:class="{ 'border-danger': validate.vat_quote.$error }"
						/>
						<template v-if="validate.vat_quote.$error">
							<div v-for="(error, index) in validate.vat_quote.$errors" :key="index" class="text-danger mt-2">
						{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="description" class="form-label w-full">
							{{ $t("description") }} *
						</label>
						<input
							v-model.trim="validate.description.$model"
							id="description"
							type="text"
							name="description"
							class="form-control"
							:class="{ 'border-danger': validate.description.$error }"
						/>
						<template v-if="validate.description.$error">
							<div v-for="(error, index) in validate.description.$errors" :key="index" class="text-danger mt-2">
						{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<!-- BEGIN: Buttons -->
				<div class="col-span-12 md:col-span-12 lg:col-span-12">
					<div class="flex justify-center">
						<button type="submit" class="btn btn-primary mr-5">
							{{ $t("save") }}
						</button>
						<button @click.prevent="emit('cancelEdit')" class="btn btn-danger">
							{{ $t("cancel") }}
						</button>
					</div>
				</div>
				<!-- END: Buttons -->

			</div>
			<!-- END: container -->

		</form>
		<!-- END: Form -->

	</div>
	<!-- END: Card -->

</template>


<script setup>

	import { onMounted, reactive, toRefs } from 'vue';
	import useProducts from '../../composables/products';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { product, getProduct } = useProducts();
	const { t } = useI18n();
	const props = defineProps(['productId']);
	const emit = defineEmits(['cancelEdit', 'updateProductForm']);

	const rules = {
		name: {
			required: helpers.withMessage(t("form.required"), required),
		},
		purchase_price_without_vat: {
			required: helpers.withMessage(t("form.required"), required),
		},
		sale_price_without_vat: {
			required: helpers.withMessage(t("form.required"), required),
		},
		vat_quote: {
			required: helpers.withMessage(t("form.required"), required),
		},
		description: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		name: "",
		purchase_price_without_vat: "",
		sale_price_without_vat: "",
		vat_quote: "",
		description: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('updateProductForm', product.value.id, formData);
		}
	};

	onMounted(async () => {
		await getProduct(props.productId);
		formData.name = product.value.name;
		formData.purchase_price_without_vat = product.value.purchase_price_without_vat;
		formData.sale_price_without_vat = product.value.sale_price_without_vat;
		formData.vat_quote = product.value.vat_quote;
		formData.description = product.value.description;
	});

</script>
