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
							{{ $t("service_id") }} *
						</label>

						<v-select v-model="validate.service_id.$model" :options="services" label="name"
							:reduce="item => item.id" :class="{ 'border-danger': validate.service_id.$error }"></v-select>

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
						<label for="name" class="form-label w-full">
							{{ $t("name") }} *
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

				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="code" class="form-label w-full">
							{{ $t("code") }}
						</label>
						<input v-model.trim="validate.code.$model" id="code" type="text" name="code"
							class="form-control" :class="{ 'border-danger': validate.code.$error }" />
						<template v-if="validate.code.$error">
							<div v-for="(error, index) in validate.code.$errors" :key="index" class="text-danger mt-2">
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

import { onMounted, reactive, toRefs } from 'vue';
import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import useService from "../../composables/services";
import IconSave from '@/components/icons/IconSave.vue';
import IconCancel from '@/components/icons/IconCancel.vue';



const { services, getServices } = useService();


const { t } = useI18n();
const emit = defineEmits(['cancelCreate', 'saveProviderForm']);

const rules = {
	service_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	code: {
		//required: helpers.withMessage(t("form.required"), required),
	},
	name: {
		required: helpers.withMessage(t("form.required"), required),
	},
};

const formData = reactive({
	service_id: "",
	code: "",
	name: "",
});

const validate = useVuelidate(rules, toRefs(formData));

const save = () => {
	validate.value.$touch();
	if (validate.value.$invalid) {
		//TODO
	} else {
		emit('saveProviderForm', formData);
	}
};

onMounted(async () => {
	await getServices();
});

</script>
