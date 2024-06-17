<template>

	<!-- BEGIN: Card -->
	<div class="card">
		<!-- BEGIN: Form -->
		<form class="validate-form" @submit.prevent="save">

			<!-- BEGIN: container -->
			<div class="grid grid-cols-12 gap-6">

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
						<label for="serial" class="form-label w-full">
							{{ $t("serial") }} *
						</label>
						<input
							v-model.trim="validate.serial.$model"
							id="serial"
							type="text"
							name="serial"
							class="form-control"
							:class="{ 'border-danger': validate.serial.$error }"
						/>
						<template v-if="validate.serial.$error">
							<div v-for="(error, index) in validate.serial.$errors" :key="index" class="text-danger mt-2">
						{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="counter" class="form-label w-full">
							{{ $t("counter") }} *
						</label>
						<input
							v-model.trim="validate.counter.$model"
							id="counter"
							type="text"
							name="counter"
							class="form-control"
							:class="{ 'border-danger': validate.counter.$error }"
						/>
						<template v-if="validate.counter.$error">
							<div v-for="(error, index) in validate.counter.$errors" :key="index" class="text-danger mt-2">
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
	import useInvoiceCounters from '@/modules/invoices/composables/invoice_counters';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { invoiceCounter, getInvoiceCounter } = useInvoiceCounters();
	const { t } = useI18n();
	const props = defineProps(['invoiceCounterId']);
	const emit = defineEmits(['cancelEdit', 'updateInvoiceCounterForm']);

	const rules = {
		year: {
			required: helpers.withMessage(t("form.required"), required),
		},
		serial: {
			required: helpers.withMessage(t("form.required"), required),
		},
		counter: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		year: "",
		serial: "",
		counter: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('updateInvoiceCounterForm', invoiceCounter.value.id, formData);
		}
	};

	onMounted(async () => {
		await getInvoiceCounter(props.invoiceCounterId);
		formData.year = invoiceCounter.value.year;
		formData.serial = invoiceCounter.value.serial;
		formData.counter = invoiceCounter.value.counter;
	});

</script>
