<template>

	<!-- BEGIN: Card -->
	<div class="card">
		<!-- BEGIN: Form -->
		<form class="validate-form" @submit.prevent="save">

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
	import useCustomerAppInvoices from '../../composables/customer_app_invoices';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';
	import IconSave from '@/components/icons/IconSave.vue';
	import IconCancel from '@/components/icons/IconCancel.vue';

	const { customerAppInvoice, getCustomerAppInvoice } = useCustomerAppInvoices();
	const { t } = useI18n();
	const props = defineProps(['customerAppInvoiceId']);
	const emit = defineEmits(['cancelEdit', 'updateCustomerAppInvoiceForm']);

	const rules = {
		customer_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		rental_price_without_vat: {
			required: helpers.withMessage(t("form.required"), required),
		},
		vat_quote: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		customer_id: "",
		rental_price_without_vat: "",
		vat_quote: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('updateCustomerAppInvoiceForm', customerAppInvoice.value.id, formData);
		}
	};

	onMounted(async () => {
		await getCustomerAppInvoice(props.customerAppInvoiceId);
		formData.customer_id = customerAppInvoice.value.customer_id;
		formData.rental_price_without_vat = customerAppInvoice.value.rental_price_without_vat;
		formData.vat_quote = customerAppInvoice.value.vat_quote;
	});

</script>
