<template>

	<!-- BEGIN: Card -->
	<div class="card">
		<!-- BEGIN: Form -->
		<form @submit.prevent="save">

			<!-- BEGIN: container -->
			<div class="grid grid-cols-12 gap-6">

				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="customer_id" class="form-label w-full">
							{{ $t("customer_id") }} *
						</label>
						<input
							v-model.trim="validate.customer_id.$model"
							id="customer_id"
							type="text"
							name="customer_id"
							class="form-control"
							:class="{ 'border-danger': validate.customer_id.$error }"
						/>
						<template v-if="validate.customer_id.$error">
							<div v-for="(error, index) in validate.customer_id.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="provider_id" class="form-label w-full">
							{{ $t("provider_id") }} *
						</label>
						<input
							v-model.trim="validate.provider_id.$model"
							id="provider_id"
							type="text"
							name="provider_id"
							class="form-control"
							:class="{ 'border-danger': validate.provider_id.$error }"
						/>
						<template v-if="validate.provider_id.$error">
							<div v-for="(error, index) in validate.provider_id.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="product_id" class="form-label w-full">
							{{ $t("product_id") }} *
						</label>
						<input
							v-model.trim="validate.product_id.$model"
							id="product_id"
							type="text"
							name="product_id"
							class="form-control"
							:class="{ 'border-danger': validate.product_id.$error }"
						/>
						<template v-if="validate.product_id.$error">
							<div v-for="(error, index) in validate.product_id.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="number" class="form-label w-full">
							{{ $t("number") }} *
						</label>
						<input
							v-model.trim="validate.number.$model"
							id="number"
							type="text"
							name="number"
							class="form-control"
							:class="{ 'border-danger': validate.number.$error }"
						/>
						<template v-if="validate.number.$error">
							<div v-for="(error, index) in validate.number.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="sim" class="form-label w-full">
							{{ $t("sim") }} *
						</label>
						<input
							v-model.trim="validate.sim.$model"
							id="sim"
							type="text"
							name="sim"
							class="form-control"
							:class="{ 'border-danger': validate.sim.$error }"
						/>
						<template v-if="validate.sim.$error">
							<div v-for="(error, index) in validate.sim.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="plate" class="form-label w-full">
							{{ $t("plate") }} *
						</label>
						<input
							v-model.trim="validate.plate.$model"
							id="plate"
							type="text"
							name="plate"
							class="form-control"
							:class="{ 'border-danger': validate.plate.$error }"
						/>
						<template v-if="validate.plate.$error">
							<div v-for="(error, index) in validate.plate.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="installed_at" class="form-label w-full">
							{{ $t("installed_at") }} *
						</label>
						<input
							v-model.trim="validate.installed_at.$model"
							id="installed_at"
							type="text"
							name="installed_at"
							class="form-control"
							:class="{ 'border-danger': validate.installed_at.$error }"
						/>
						<template v-if="validate.installed_at.$error">
							<div v-for="(error, index) in validate.installed_at.$errors" :key="index" class="text-danger mt-2">
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
						<label for="rental_price_without_vat" class="form-label w-full">
							{{ $t("rental_price_without_vat") }} *
						</label>
						<input
							v-model.trim="validate.rental_price_without_vat.$model"
							id="rental_price_without_vat"
							type="text"
							name="rental_price_without_vat"
							class="form-control"
							:class="{ 'border-danger': validate.rental_price_without_vat.$error }"
						/>
						<template v-if="validate.rental_price_without_vat.$error">
							<div v-for="(error, index) in validate.rental_price_without_vat.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="provider_rental_price_without_vat" class="form-label w-full">
							{{ $t("provider_rental_price_without_vat") }} *
						</label>
						<input
							v-model.trim="validate.provider_rental_price_without_vat.$model"
							id="provider_rental_price_without_vat"
							type="text"
							name="provider_rental_price_without_vat"
							class="form-control"
							:class="{ 'border-danger': validate.provider_rental_price_without_vat.$error }"
						/>
						<template v-if="validate.provider_rental_price_without_vat.$error">
							<div v-for="(error, index) in validate.provider_rental_price_without_vat.$errors" :key="index" class="text-danger mt-2">
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
						<button @click.prevent="emit('cancelCreate')" class="btn btn-danger">
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
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const emit = defineEmits(['cancelCreate', 'saveCustomerDeviceForm']);

	const rules = {
		customer_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		provider_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		product_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		number: {
			required: helpers.withMessage(t("form.required"), required),
		},
		sim: {
			required: helpers.withMessage(t("form.required"), required),
		},
		plate: {
			required: helpers.withMessage(t("form.required"), required),
		},
		installed_at: {
			required: helpers.withMessage(t("form.required"), required),
		},
		purchase_price_without_vat: {
			required: helpers.withMessage(t("form.required"), required),
		},
		sale_price_without_vat: {
			required: helpers.withMessage(t("form.required"), required),
		},
		rental_price_without_vat: {
			required: helpers.withMessage(t("form.required"), required),
		},
		provider_rental_price_without_vat: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		customer_id: "",
		provider_id: "",
		product_id: "",
		number: "",
		sim: "",
		plate: "",
		installed_at: "",
		purchase_price_without_vat: "",
		sale_price_without_vat: "",
		rental_price_without_vat: "",
		provider_rental_price_without_vat: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('saveCustomerDeviceForm', formData);
		}
	};

	onMounted(async () => {
		// TODO here implements...
	});

</script>
