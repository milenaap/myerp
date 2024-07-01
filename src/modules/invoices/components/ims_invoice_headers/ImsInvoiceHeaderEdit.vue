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
						<label for="invoiced_at" class="form-label w-full">
							{{ $t("invoiced_at") }} *
						</label>
						<input
							v-model.trim="validate.invoiced_at.$model"
							id="invoiced_at"
							type="text"
							name="invoiced_at"
							class="form-control"
							:class="{ 'border-danger': validate.invoiced_at.$error }"
						/>
						<template v-if="validate.invoiced_at.$error">
							<div v-for="(error, index) in validate.invoiced_at.$errors" :key="index" class="text-danger mt-2">
						{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="month" class="form-label w-full">
							{{ $t("month") }} *
						</label>
						<input
							v-model.trim="validate.month.$model"
							id="month"
							type="text"
							name="month"
							class="form-control"
							:class="{ 'border-danger': validate.month.$error }"
						/>
						<template v-if="validate.month.$error">
							<div v-for="(error, index) in validate.month.$errors" :key="index" class="text-danger mt-2">
						{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="year" class="form-label w-full">
							{{ $t("year") }} *
						</label>
						<input
							v-model.trim="validate.year.$model"
							id="year"
							type="text"
							name="year"
							class="form-control"
							:class="{ 'border-danger': validate.year.$error }"
						/>
						<template v-if="validate.year.$error">
							<div v-for="(error, index) in validate.year.$errors" :key="index" class="text-danger mt-2">
						{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="path" class="form-label w-full">
							{{ $t("path") }} *
						</label>
						<input
							v-model.trim="validate.path.$model"
							id="path"
							type="text"
							name="path"
							class="form-control"
							:class="{ 'border-danger': validate.path.$error }"
						/>
						<template v-if="validate.path.$error">
							<div v-for="(error, index) in validate.path.$errors" :key="index" class="text-danger mt-2">
						{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="processed_at" class="form-label w-full">
							{{ $t("processed_at") }} *
						</label>
						<input
							v-model.trim="validate.processed_at.$model"
							id="processed_at"
							type="text"
							name="processed_at"
							class="form-control"
							:class="{ 'border-danger': validate.processed_at.$error }"
						/>
						<template v-if="validate.processed_at.$error">
							<div v-for="(error, index) in validate.processed_at.$errors" :key="index" class="text-danger mt-2">
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
	import useImsInvoiceHeaders from '../../composables/ims_invoice_headers';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { imsInvoiceHeader, getImsInvoiceHeader } = useImsInvoiceHeaders();
	const { t } = useI18n();
	const props = defineProps(['imsInvoiceHeaderId']);
	const emit = defineEmits(['cancelEdit', 'updateImsInvoiceHeaderForm']);

	const rules = {
		name: {
			required: helpers.withMessage(t("form.required"), required),
		},
		invoiced_at: {
			required: helpers.withMessage(t("form.required"), required),
		},
		month: {
			required: helpers.withMessage(t("form.required"), required),
		},
		year: {
			required: helpers.withMessage(t("form.required"), required),
		},
		path: {
			required: helpers.withMessage(t("form.required"), required),
		},
		processed_at: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		name: "",
		invoiced_at: "",
		month: "",
		year: "",
		path: "",
		processed_at: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('updateImsInvoiceHeaderForm', imsInvoiceHeader.value.id, formData);
		}
	};

	onMounted(async () => {
		await getImsInvoiceHeader(props.imsInvoiceHeaderId);
		formData.name = imsInvoiceHeader.value.name;
		formData.invoiced_at = imsInvoiceHeader.value.invoiced_at;
		formData.month = imsInvoiceHeader.value.month;
		formData.year = imsInvoiceHeader.value.year;
		formData.path = imsInvoiceHeader.value.path;
		formData.processed_at = imsInvoiceHeader.value.processed_at;
	});

</script>
