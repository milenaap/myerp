<template>



	<!-- BEGIN: Card -->
	<div class="card">
		<!-- BEGIN: Form -->
		<form @submit.prevent="save">

			<!-- BEGIN: container -->
			<div class="grid grid-cols-12 gap-6">

				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="service_id" class="form-label w-full">
							{{ $t("service") }} *
						</label>

						<v-select 
							v-model="validate.service_id.$model" :options="services" label="name"
							:reduce="item => item.id" :class="{ 'border-danger': validate.service_id.$error }"
							disabled="disabled"
						></v-select>

						<template v-if="validate.service_id.$error">
							<div v-for="(error, index) in validate.service.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>

				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="code" class="form-label w-full">
							{{ $t("customer_code") }} *
						</label>
						<input 
							v-model.trim="validate.code.$model" 
							id="code" type="text" 
							name="code"
							class="form-control" 
							:class="{ 'border-danger': validate.code.$error }" 
							placeholder="Ex. 430000000"
						/>
						<template v-if="validate.code.$error">
							<div v-for="(error, index) in validate.code.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="code_ims" class="form-label w-full">
							{{ $t("code_ims") }}
						</label>
						<input v-model.trim="validate.code_ims.$model" id="code_ims" type="text" name="code_ims"
							class="form-control" :class="{ 'border-danger': validate.code_ims.$error }" />
						<template v-if="validate.code_ims.$error">
							<div v-for="(error, index) in validate.code_ims.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>



				<div class="col-span-12 md:col-span-8 lg:col-span-8">
					<div class="input-form">
						<label for="name" class="form-label w-full">
							{{ $t("company_name") }} * 
						</label>
						<input v-model.trim="validate.name.$model" id="name" type="text" name="name"
							class="form-control" :class="{ 'border-danger': validate.name.$error }" />
						<template v-if="validate.name.$error">
							<div v-for="(error, index) in validate.name.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-4 lg:col-span-4">
					<div class="input-form">
						<label for="tax" class="form-label w-full">
							{{ $t("tax") }} *
						</label>
						<input v-model.trim="validate.tax.$model" id="tax" type="text" name="tax" class="form-control"
							:class="{ 'border-danger': validate.tax.$error }" />
						<template v-if="validate.tax.$error">
							<div v-for="(error, index) in validate.tax.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="country_id" class="form-label w-full">
							{{ $t("country_id") }} *
						</label>
						<v-select v-model="validate.country_id.$model" :options="countries" label="common_name"
							:reduce="item => item.id"
							:class="{ 'border-danger': validate.country_id.$error }"></v-select>
						<template v-if="validate.country_id.$error">
							<div v-for="(error, index) in validate.country_id.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="zip_code" class="form-label w-full">
							{{ $t("zip_code") }} *
						</label>
						<input v-model.trim="validate.zip_code.$model" id="zip_code" type="text" name="zip_code"
							class="form-control" :class="{ 'border-danger': validate.zip_code.$error }" />
						<template v-if="validate.zip_code.$error">
							<div v-for="(error, index) in validate.zip_code.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="state" class="form-label w-full">
							{{ $t("state") }} *
						</label>
						<input v-model.trim="validate.state.$model" id="state" type="text" name="state"
							class="form-control" :class="{ 'border-danger': validate.state.$error }" />
						<template v-if="validate.state.$error">
							<div v-for="(error, index) in validate.state.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="municipality" class="form-label w-full">
							{{ $t("municipality") }} *
						</label>
						<input v-model.trim="validate.municipality.$model" id="municipality" type="text"
							name="municipality" class="form-control"
							:class="{ 'border-danger': validate.municipality.$error }" />
						<template v-if="validate.municipality.$error">
							<div v-for="(error, index) in validate.municipality.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-8 lg:col-span-8">
					<div class="input-form">
						<label for="address" class="form-label w-full">
							{{ $t("address") }} *
						</label>
						<input v-model.trim="validate.address.$model" id="address" type="text" name="address"
							class="form-control" :class="{ 'border-danger': validate.address.$error }" />
						<template v-if="validate.address.$error">
							<div v-for="(error, index) in validate.address.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-5 lg:col-span-5">
					<div class="input-form">
						<label for="email" class="form-label w-full">
							{{ $t("email") }} *
						</label>
						<input v-model.trim="validate.email.$model" id="email" type="text" name="email"
							class="form-control" :class="{ 'border-danger': validate.email.$error }" />
						<template v-if="validate.email.$error">
							<div v-for="(error, index) in validate.email.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-3 lg:col-span-3">
					<div class="input-form">
						<label for="phone" class="form-label w-full">
							{{ $t("phone") }}
						</label>
						<input v-model.trim="validate.phone.$model" id="phone" type="text" name="phone"
							class="form-control" :class="{ 'border-danger': validate.phone.$error }" />
						<template v-if="validate.phone.$error">
							<div v-for="(error, index) in validate.phone.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>

				

				<div class="col-span-12 md:col-span-4 lg:col-span-4">
					<div class="input-form">
						<label for="website" class="form-label w-full">
							{{ $t("website") }}
						</label>
						<input 
							v-model.trim="validate.website.$model" 
							id="website" 
							type="text" 
							name="website"
							class="form-control" 
							:class="{ 'border-danger': validate.website.$error }"
							placeholder="Ex. https://site.com" 
						/>
						<template v-if="validate.website.$error">
							<div v-for="(error, index) in validate.website.$errors" :key="index"
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
						<button @click.prevent="emit('cancelCreate')" class="btn btn-danger">
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

import { onMounted, reactive, toRefs, ref } from 'vue';
import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import useCountry from "../../composables/countries";
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import useService from "../../composables/services";
import IconSave from '@/components/icons/IconSave.vue';
import IconCancel from '@/components/icons/IconCancel.vue';



const { countries, getCountries } = useCountry();
const { services, getServices } = useService();

const { t } = useI18n();
const emit = defineEmits(['cancelCreate', 'saveCompanyForm']);

const rules = {
	country_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	name: {
		required: helpers.withMessage(t("form.required"), required),
	},
	tax: {
		required: helpers.withMessage(t("form.required"), required),
	},
	address: {
		required: helpers.withMessage(t("form.required"), required),
	},
	zip_code: {
		required: helpers.withMessage(t("form.required"), required),
	},
	state: {
		required: helpers.withMessage(t("form.required"), required),
	},
	municipality: {
		required: helpers.withMessage(t("form.required"), required),
	},
	email: {
		required: helpers.withMessage(t("form.required"), required),
	},
	service_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	code: {
		required: helpers.withMessage(t("form.required"), required),
	},
	code_ims: {
		// required: helpers.withMessage(t("form.required"), required),
	},
	phone: {
		//required: helpers.withMessage(t("form.required"), required),
	},
	website: {
		//required: helpers.withMessage(t("form.required"), required),
	},
};

// const formData = reactive({
// 	country_id: 64,
// 	name: "Empresa com",
// 	tax: "ES5566",
// 	address: "Calle barcelona 3, 4-5",
// 	zip_code: "08900",
// 	state: "Barcelona",
// 	municipality: "Barcelona",
// 	email: "info@empresa.com",
// 	phone: "88888888",
// 	website: "",
// 	service_id: "",
// 	code_ims: "",
// 	code: "430990000",
// });


const formData = reactive({
	country_id: 64,
	name: "",
	tax: "",
	address: "",
	zip_code: "",
	state: "",
	municipality: "",
	email: "",
	phone: "",
	website: "",
	service_id: "",
	code_ims: "",
	code: "",
});

const validate = useVuelidate(rules, toRefs(formData));

const save = () => {
	validate.value.$touch();
	if (validate.value.$invalid) {
		//TODO
		console.log("Formulario inválido");
	} else {
		
		emit('saveCompanyForm', formData);
	}
};


onMounted(async () => {

	await Promise.all([
		getCountries(),
		getServices(),
	])

	formData.service_id = 1;

	
});

</script>


<style scoped></style>
