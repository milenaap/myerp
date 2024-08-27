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
						<label for="driver_id" class="form-label w-full">
							{{ $t("driver_id") }} *
						</label>
						<input
							v-model.trim="validate.driver_id.$model"
							id="driver_id"
							type="text"
							name="driver_id"
							class="form-control"
							:class="{ 'border-danger': validate.driver_id.$error }"
						/>
						<template v-if="validate.driver_id.$error">
							<div v-for="(error, index) in validate.driver_id.$errors" :key="index" class="text-danger mt-2">
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
						<label for="total_movements" class="form-label w-full">
							{{ $t("total_movements") }} *
						</label>
						<input
							v-model.trim="validate.total_movements.$model"
							id="total_movements"
							type="text"
							name="total_movements"
							class="form-control"
							:class="{ 'border-danger': validate.total_movements.$error }"
						/>
						<template v-if="validate.total_movements.$error">
							<div v-for="(error, index) in validate.total_movements.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="driver_name" class="form-label w-full">
							{{ $t("driver_name") }} *
						</label>
						<input
							v-model.trim="validate.driver_name.$model"
							id="driver_name"
							type="text"
							name="driver_name"
							class="form-control"
							:class="{ 'border-danger': validate.driver_name.$error }"
						/>
						<template v-if="validate.driver_name.$error">
							<div v-for="(error, index) in validate.driver_name.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="is_processed" class="form-label w-full">
							{{ $t("is_processed") }} *
						</label>
						<input
							v-model.trim="validate.is_processed.$model"
							id="is_processed"
							type="text"
							name="is_processed"
							class="form-control"
							:class="{ 'border-danger': validate.is_processed.$error }"
						/>
						<template v-if="validate.is_processed.$error">
							<div v-for="(error, index) in validate.is_processed.$errors" :key="index" class="text-danger mt-2">
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
	import useAppDevices from '../../composables/app_devices';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';
	import IconSave from '@/components/icons/IconSave.vue';
	import IconCancel from '@/components/icons/IconCancel.vue';

	const { appDevice, getAppDevice } = useAppDevices();
	const { t } = useI18n();
	const props = defineProps(['appDeviceId']);
	const emit = defineEmits(['cancelEdit', 'updateAppDeviceForm']);

	const rules = {
		customer_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		driver_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		month: {
			required: helpers.withMessage(t("form.required"), required),
		},
		year: {
			required: helpers.withMessage(t("form.required"), required),
		},
		total_movements: {
			required: helpers.withMessage(t("form.required"), required),
		},
		driver_name: {
			required: helpers.withMessage(t("form.required"), required),
		},
		is_processed: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		customer_id: "",
		driver_id: "",
		month: "",
		year: "",
		total_movements: "",
		driver_name: "",
		is_processed: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('updateAppDeviceForm', appDevice.value.id, formData);
		}
	};

	onMounted(async () => {
		await getAppDevice(props.appDeviceId);
		formData.customer_id = appDevice.value.customer_id;
		formData.driver_id = appDevice.value.driver_id;
		formData.month = appDevice.value.month;
		formData.year = appDevice.value.year;
		formData.total_movements = appDevice.value.total_movements;
		formData.driver_name = appDevice.value.driver_name;
		formData.is_processed = appDevice.value.is_processed;
	});

</script>
