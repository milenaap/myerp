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
						<label for="cost_price" class="form-label w-full">
							{{ $t("cost_price") }} *
						</label>
						<input
							v-model.trim="validate.cost_price.$model"
							id="cost_price"
							type="text"
							name="cost_price"
							class="form-control"
							:class="{ 'border-danger': validate.cost_price.$error }"
						/>
						<template v-if="validate.cost_price.$error">
							<div v-for="(error, index) in validate.cost_price.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="sale_price" class="form-label w-full">
							{{ $t("sale_price") }} *
						</label>
						<input
							v-model.trim="validate.sale_price.$model"
							id="sale_price"
							type="text"
							name="sale_price"
							class="form-control"
							:class="{ 'border-danger': validate.sale_price.$error }"
						/>
						<template v-if="validate.sale_price.$error">
							<div v-for="(error, index) in validate.sale_price.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="installation_price" class="form-label w-full">
							{{ $t("installation_price") }} *
						</label>
						<input
							v-model.trim="validate.installation_price.$model"
							id="installation_price"
							type="text"
							name="installation_price"
							class="form-control"
							:class="{ 'border-danger': validate.installation_price.$error }"
						/>
						<template v-if="validate.installation_price.$error">
							<div v-for="(error, index) in validate.installation_price.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="started_at" class="form-label w-full">
							{{ $t("started_at") }} *
						</label>
						<input
							v-model.trim="validate.started_at.$model"
							id="started_at"
							type="text"
							name="started_at"
							class="form-control"
							:class="{ 'border-danger': validate.started_at.$error }"
						/>
						<template v-if="validate.started_at.$error">
							<div v-for="(error, index) in validate.started_at.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="finished_at" class="form-label w-full">
							{{ $t("finished_at") }} *
						</label>
						<input
							v-model.trim="validate.finished_at.$model"
							id="finished_at"
							type="text"
							name="finished_at"
							class="form-control"
							:class="{ 'border-danger': validate.finished_at.$error }"
						/>
						<template v-if="validate.finished_at.$error">
							<div v-for="(error, index) in validate.finished_at.$errors" :key="index" class="text-danger mt-2">
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
		number: {
			required: helpers.withMessage(t("form.required"), required),
		},
		plate: {
			required: helpers.withMessage(t("form.required"), required),
		},
		cost_price: {
			required: helpers.withMessage(t("form.required"), required),
		},
		sale_price: {
			required: helpers.withMessage(t("form.required"), required),
		},
		installation_price: {
			required: helpers.withMessage(t("form.required"), required),
		},
		started_at: {
			required: helpers.withMessage(t("form.required"), required),
		},
		finished_at: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		customer_id: "",
		provider_id: "",
		number: "",
		plate: "",
		cost_price: "",
		sale_price: "",
		installation_price: "",
		started_at: "",
		finished_at: "",
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
