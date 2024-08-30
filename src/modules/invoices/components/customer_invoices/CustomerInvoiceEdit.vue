<template>

	<!-- BEGIN: Card -->
	<div class="card">
		<!-- BEGIN: Form -->
		<form class="validate-form" @submit.prevent="save">

			<!-- BEGIN: container -->
			<div class="grid grid-cols-12 gap-6">

				<div class="col-span-12 md:col-span-8 lg:col-span-8">
					<div class="input-form">
						<label for="customer_id" class="form-label w-full">
							{{ $t("customer_id") }} *
						</label>
						<v-select v-model="validate.customer_id.$model" :options="customers" label="code"
							:reduce="item => item.id" :class="{ 'border-danger': validate.customer_id.$error }"
							disabled="disabled">

							<!-- Personalización de cómo se muestra cada opción -->
							<template #option="{ code, company }">
								{{ code }} - {{ company.name }}
							</template>

							<template #selected-option="{ code, company }">
								{{ code + ' - ' + company.name }}
							</template>

						</v-select>
						<template v-if="validate.customer_id.$error">
							<div v-for="(error, index) in validate.customer_id.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-4 lg:col-span-4">
					<div class="input-form">
						<label for="remittance_type_id" class="form-label w-full">
							{{ $t("remittance_type_id") }} *
						</label>

						<v-select v-model="validate.remittance_type_id.$model" :options="remittanceTypes" label="name"
							:reduce="item => item.id"
							:class="{ 'border-danger': validate.remittance_type_id.$error }"></v-select>

						<template v-if="validate.remittance_type_id.$error">
							<div v-for="(error, index) in validate.remittance_type_id.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="bank_name" class="form-label w-full">
							{{ $t("bank_name") }}
						</label>
						<input v-model.trim="validate.bank_name.$model" id="bank_name" type="text" name="bank_name"
							class="form-control" :class="{ 'border-danger': validate.bank_name.$error }" />
						<template v-if="validate.bank_name.$error">
							<div v-for="(error, index) in validate.bank_name.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="bank_account" class="form-label w-full">
							{{ $t("bank_account") }}
						</label>
						<input v-model.trim="validate.bank_account.$model" id="bank_account" type="text"
							name="bank_account" class="form-control"
							:class="{ 'border-danger': validate.bank_account.$error }" />
						<template v-if="validate.bank_account.$error">
							<div v-for="(error, index) in validate.bank_account.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="account_holder" class="form-label w-full">
							{{ $t("account_holder") }}
						</label>
						<input v-model.trim="validate.account_holder.$model" id="account_holder" type="text"
							name="account_holder" class="form-control"
							:class="{ 'border-danger': validate.account_holder.$error }" />
						<template v-if="validate.account_holder.$error">
							<div v-for="(error, index) in validate.account_holder.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-3 lg:col-span-3">
					<div class="input-form">
						<label for="due_date" class="form-label w-full">
							{{ $t("due_date_days") }} *
						</label>
						<input v-model.trim="validate.due_date.$model" id="due_date" type="text" name="due_date"
							class="form-control" :class="{ 'border-danger': validate.due_date.$error }" />
						<template v-if="validate.due_date.$error">
							<div v-for="(error, index) in validate.due_date.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-3 lg:col-span-3">
					<div class="input-form">
						<label for="due_date_by_days" class="form-label w-full">
							{{ $t("due_date_by_days") }} *
						</label>
						<input v-model.trim="validate.due_date_by_days.$model" id="due_date_by_days" type="text"
							name="due_date_by_days" class="form-control"
							:class="{ 'border-danger': validate.due_date_by_days.$error }" />
						<template v-if="validate.due_date_by_days.$error">
							<div v-for="(error, index) in validate.due_date_by_days.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<!-- BEGIN: Buttons -->
				<div class="col-span-12 md:col-span-12 lg:col-span-12">
					<div class="flex justify-center">
						<button type="submit" class="btn btn-primary mr-5">
							<div class="flex">
								<IconSave />
								{{ $t("save") }}
							</div>
						</button>
						<button @click.prevent="emit('cancelEdit')" class="btn btn-danger">
							<div class="flex">
								<IconCancel />
								{{ $t("cancel") }}
							</div>
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
import useCustomerInvoices from '../../composables/customer_invoices';
import useCustomers from '../../composables/customers';
import useRemittanceTypes from '../../composables/remittance_types';
import IconSave from '@/components/icons/IconSave.vue';
import IconCancel from '@/components/icons/IconCancel.vue';




const { customerInvoice, getCustomerInvoice } = useCustomerInvoices();
const { customers, getCustomers } = useCustomers();
const { remittanceTypes, getRemittanceTypes } = useRemittanceTypes();

const { t } = useI18n();
const props = defineProps(['customerInvoiceId']);
const emit = defineEmits(['cancelEdit', 'updateCustomerInvoiceForm']);

const rules = {
	customer_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	remittance_type_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	bank_name: {
		//required: helpers.withMessage(t("form.required"), required),
	},
	bank_account: {
		//required: helpers.withMessage(t("form.required"), required),
	},
	account_holder: {
		//required: helpers.withMessage(t("form.required"), required),
	},
	due_date: {
		required: helpers.withMessage(t("form.required"), required),
	},
	due_date_by_days: {
		required: helpers.withMessage(t("form.required"), required),
	},
};

const formData = reactive({
	customer_id: "",
	remittance_type_id: "",
	bank_name: "",
	bank_account: "",
	account_holder: "",
	due_date: "",
	due_date_by_days: "",
});

const validate = useVuelidate(rules, toRefs(formData));

const save = () => {
	validate.value.$touch();
	if (validate.value.$invalid) {
		//TODO
	} else {
		emit('updateCustomerInvoiceForm', customerInvoice.value.id, formData);
	}
};

onMounted(async () => {

	await Promise.all([
		getRemittanceTypes(),
		getCustomers(),
		getCustomerInvoice(props.customerInvoiceId),
	])

	formData.customer_id = customerInvoice.value.customer_id;
	formData.remittance_type_id = customerInvoice.value.remittance_type_id;
	formData.bank_name = customerInvoice.value.bank_name;
	formData.bank_account = customerInvoice.value.bank_account;
	formData.account_holder = customerInvoice.value.account_holder;
	formData.due_date = customerInvoice.value.due_date;
	formData.due_date_by_days = customerInvoice.value.due_date_by_days;
});

</script>
