<template>

	<!-- BEGIN: Card -->
	<div class="card">
		<!-- BEGIN: Form -->
		<form @submit.prevent="save">

			<!-- BEGIN: container -->
			<div class="grid grid-cols-12 gap-6">

				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="invoice_counter_id" class="form-label w-full">
							{{ $t("invoice_counter_id") }} *
						</label>

						<v-select
							v-model="validate.invoice_counter_id.$model"
							:options="invoiceCounters"
							label="serial"
							:reduce="item => item.id"
							:class="{ 'border-danger': validate.invoice_counter_id.$error }"
						></v-select>


						<template v-if="validate.invoice_counter_id.$error">
							<div v-for="(error, index) in validate.invoice_counter_id.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="customer_id" class="form-label w-full">
							{{ $t("customer") }} *
						</label>
						
						<v-select
							v-model="validate.customer_id.$model"
							:options="customers"
							label="code"
							:reduce="item => item.id"
							:class="{ 'border-danger': validate.customer_id.$error }"
						>

							<!-- Personalización de cómo se muestra cada opción -->
							<template #option="{ code, company }">
								{{ code }} - {{ company.name }}
							</template>

							<template #selected-option="{ code, company }">
								{{ code + ' - ' + company.name }}
							</template> 
							
						</v-select>

						<template v-if="validate.customer_id.$error">
							<div v-for="(error, index) in validate.customer_id.$errors" :key="index" class="text-danger mt-2">
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
						<label for="date" class="form-label w-full">
							{{ $t("date") }} *
						</label>
						<input
							v-model.trim="validate.date.$model"
							id="date"
							type="text"
							name="date"
							class="form-control"
							:class="{ 'border-danger': validate.date.$error }"
						/>
						<template v-if="validate.date.$error">
							<div v-for="(error, index) in validate.date.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="due_date" class="form-label w-full">
							{{ $t("due_date") }} *
						</label>
						<input
							v-model.trim="validate.due_date.$model"
							id="due_date"
							type="text"
							name="due_date"
							class="form-control"
							:class="{ 'border-danger': validate.due_date.$error }"
						/>
						<template v-if="validate.due_date.$error">
							<div v-for="(error, index) in validate.due_date.$errors" :key="index" class="text-danger mt-2">
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
						<label for="total_without_vat" class="form-label w-full">
							{{ $t("total_without_vat") }} *
						</label>
						<input
							v-model.trim="validate.total_without_vat.$model"
							id="total_without_vat"
							type="text"
							name="total_without_vat"
							class="form-control"
							:class="{ 'border-danger': validate.total_without_vat.$error }"
						/>
						<template v-if="validate.total_without_vat.$error">
							<div v-for="(error, index) in validate.total_without_vat.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="total_with_vat" class="form-label w-full">
							{{ $t("total_with_vat") }} *
						</label>
						<input
							v-model.trim="validate.total_with_vat.$model"
							id="total_with_vat"
							type="text"
							name="total_with_vat"
							class="form-control"
							:class="{ 'border-danger': validate.total_with_vat.$error }"
						/>
						<template v-if="validate.total_with_vat.$error">
							<div v-for="(error, index) in validate.total_with_vat.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="has_paid" class="form-label w-full">
							{{ $t("has_paid") }} *
						</label>
						<input
							v-model.trim="validate.has_paid.$model"
							id="has_paid"
							type="text"
							name="has_paid"
							class="form-control"
							:class="{ 'border-danger': validate.has_paid.$error }"
						/>
						<template v-if="validate.has_paid.$error">
							<div v-for="(error, index) in validate.has_paid.$errors" :key="index" class="text-danger mt-2">
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
	import useInvoiceCounter from "../../composables/invoice_counters.js";
	import useCustomer from "../../composables/customers.js";
	import vSelect from 'vue-select';
	import 'vue-select/dist/vue-select.css';





	const { t } = useI18n();
	const emit = defineEmits(['cancelCreate', 'saveInvoiceHeaderForm']);


	const {invoiceCounters, getInvoiceCounters} = useInvoiceCounter();
	const {customers, getCustomers} = useCustomer();



	const rules = {
		invoice_counter_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		customer_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		number: {
			required: helpers.withMessage(t("form.required"), required),
		},
		date: {
			required: helpers.withMessage(t("form.required"), required),
		},
		due_date: {
			required: helpers.withMessage(t("form.required"), required),
		},
		description: {
			required: helpers.withMessage(t("form.required"), required),
		},
		vat_quote: {
			required: helpers.withMessage(t("form.required"), required),
		},
		total_without_vat: {
			required: helpers.withMessage(t("form.required"), required),
		},
		total_with_vat: {
			required: helpers.withMessage(t("form.required"), required),
		},
		has_paid: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		invoice_counter_id: "",
		customer_id: "",
		number: "",
		date: "",
		due_date: "",
		description: "",
		vat_quote: "",
		total_without_vat: "",
		total_with_vat: "",
		has_paid: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('saveInvoiceHeaderForm', formData);
		}
	};





	// Función para truncar el texto con un límite máximo de caracteres
	// const truncateText = (text, maxLength) => {
	// 	return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	// };

	// // Ejemplo de cómo usar la función para truncar
	// const displayText = (option) => {
	// 	const str = truncateText(option, 30); // Trunca el código si es necesario
	// 	return `${str}`;
	// };


	onMounted(async () => {
		await getInvoiceCounters();
		await getCustomers();

	});

</script>


<style scoped>




</style>
