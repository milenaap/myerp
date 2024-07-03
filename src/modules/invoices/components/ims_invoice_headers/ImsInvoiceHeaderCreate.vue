<template>

	<!-- BEGIN: Card -->
	<div class="card">
		<!-- BEGIN: Form -->
		<form @submit.prevent="save">

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
						<label for="file" class="form-label w-full">
							{{ $t("file") }} *
						</label>
						<input
							@change="handleFileUpload"
							id="file"
							type="file"
							name="file"
							class="form-control"
							:class="{ 'border-danger': fileError }"
						/>
						<template v-if="fileError">
							<div class="text-danger mt-2">
								{{ $t("form.required") }}
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

	import { onMounted, reactive, toRefs, ref } from 'vue';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const emit = defineEmits(['cancelCreate', 'saveImsInvoiceHeaderForm']);

	const rules = {
		name: {
			required: helpers.withMessage(t("form.required"), required),
		},
		month: {
			required: helpers.withMessage(t("form.required"), required),
		},
		year: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};


	const file = ref(null);
	const fileError = ref(false);

	const formData = reactive({
		name: "Header Nuevo",
		year: "2024",
		month: "07",
	});

	const validate = useVuelidate(rules, toRefs(formData));



	const handleFileUpload = async(event) => {
		const uploadedFile = event.target.files[0];
		if (uploadedFile) {
			fileError.value = false;
			file.value = await convertFileToBase64(uploadedFile);
			//console.log(file.value);
		} else {
			fileError.value = true;
		}
	};

	const convertFileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				resolve(e.target.result);
			};
			reader.onerror = (error) => reject(error);
			reader.readAsDataURL(file);
		});
	};



	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid || !file.value) {
			//TODO
		} else {
			formData.file = file.value;
			emit('saveImsInvoiceHeaderForm', formData);
		}
	};

	onMounted(async () => {
		// TODO here implements...
	});

</script>
