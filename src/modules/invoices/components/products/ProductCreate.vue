<template>

	<!-- BEGIN: Card -->
	<div class="card">
		<!-- BEGIN: Form -->
		<form @submit.prevent="save">

			<!-- BEGIN: container -->
			<div class="grid grid-cols-12 gap-6">

				<div class="col-span-12 md:col-span-6 lg:col-span-6">
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


				<div class="col-span-12 md:col-span-2 lg:col-span-2">
					<div class="input-form">
						<label for="amount_without_vat" class="form-label w-full">
							{{ $t("amount_without_vat") }} *
						</label>
						<input
							v-model.trim="validate.amount_without_vat.$model"
							id="amount_without_vat"
							type="text"
							name="amount_without_vat"
							class="form-control"
							:class="{ 'border-danger': validate.amount_without_vat.$error }"
						/>
						<template v-if="validate.amount_without_vat.$error">
							<div v-for="(error, index) in validate.amount_without_vat.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-2 lg:col-span-2">
					<div class="input-form">
						<label for="vat" class="form-label w-full">
							{{ $t("vat") }} *
						</label>
						<input
							v-model.trim="validate.vat.$model"
							id="vat"
							type="text"
							name="vat"
							class="form-control"
							:class="{ 'border-danger': validate.vat.$error }"
						/>
						<template v-if="validate.vat.$error">
							<div v-for="(error, index) in validate.vat.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>

				
				<div class="col-span-12 md:col-span-2 lg:col-span-2">
					<div class="input-form">
						<label for="amount_with_vat" class="form-label w-full">
							{{ $t("total") }} *
						</label>
						<input
							v-model.trim="validate.amount_with_vat.$model"
							id="amount_with_vat"
							type="text"
							name="amount_with_vat"
							class="form-control"
							:class="{ 'border-danger': validate.amount_with_vat.$error }"
						/>
						<template v-if="validate.amount_with_vat.$error">
							<div v-for="(error, index) in validate.amount_with_vat.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-12 lg:col-span-12">
					<div class="input-form">
						<label for="description" class="form-label w-full">
							{{ $t("description") }}
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
	const emit = defineEmits(['cancelCreate', 'saveProductForm']);

	const rules = {
		name: {
			required: helpers.withMessage(t("form.required"), required),
		},
		amount_without_vat: {
			required: helpers.withMessage(t("form.required"), required),
		},
		amount_with_vat: {
			required: helpers.withMessage(t("form.required"), required),
		},
		vat: {
			required: helpers.withMessage(t("form.required"), required),
		},
		description: {
			// required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		name: "",
		amount_without_vat: "",
		amount_with_vat: "",
		vat: "",
		description: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('saveProductForm', formData);
		}
	};

	onMounted(async () => {
		// TODO here implements...
	});

</script>
