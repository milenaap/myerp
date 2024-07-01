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
	import useInvoiceFiles from '../../composables/invoice_files';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { invoiceFile, getInvoiceFile } = useInvoiceFiles();
	const { t } = useI18n();
	const props = defineProps(['invoiceFileId']);
	const emit = defineEmits(['cancelEdit', 'updateInvoiceFileForm']);

	const rules = {
		name: {
			required: helpers.withMessage(t("form.required"), required),
		},
		invoiced_at: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		name: "",
		invoiced_at: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('updateInvoiceFileForm', invoiceFile.value.id, formData);
		}
	};

	onMounted(async () => {
		await getInvoiceFile(props.invoiceFileId);
		formData.name = invoiceFile.value.name;
		formData.invoiced_at = invoiceFile.value.invoiced_at;
	});

</script>
