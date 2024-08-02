<template>

	<!-- BEGIN: Card -->
	<div class="card">
		<!-- BEGIN: Form -->
		<form @submit.prevent="save">

			<!-- BEGIN: container -->
			<div class="grid grid-cols-12 gap-6">

				<div class="col-span-12 md:col-span-8 lg:col-span-8">
					<div class="input-form">
						<label for="customer_id" class="form-label w-full">
							{{ $t("customer") }} *
						</label>

						<v-select v-model="validate.customer_id.$model" :options="customers" label="code"
							:reduce="item => item.id" :class="{ 'border-danger': validate.customer_id.$error }">

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

						<v-select 
							v-model="validate.remittance_type_id.$model" 
							:options="remittanceTypes" 
							label="name"
							:reduce="item => item.id"
							:class="{ 'border-danger': validate.remittance_type_id.$error }"
						></v-select>

						<template v-if="validate.remittance_type_id.$error">
							<div v-for="(error, index) in validate.remittance_type_id.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-2 lg:col-span-2">
					<div class="input-form">
						<label for="invoice_counter_id" class="form-label w-full">
							{{ $t("invoice_counter_id") }} *
						</label>

						<v-select v-model="validate.invoice_counter_id.$model" :options="invoiceCounters" label="serial"
							:reduce="item => item.id"
							:class="{ 'border-danger': validate.invoice_counter_id.$error }"></v-select>


						<template v-if="validate.invoice_counter_id.$error">
							<div v-for="(error, index) in validate.invoice_counter_id.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-3">
					<div class="input-form">
						<label for="invoice_date" class="form-label w-full">
							{{ $t("invoice_date") }} *
						</label>
						<input v-model.trim="validate.invoice_date.$model" id="invoice_date" type="date"
							name="invoice_date" class="form-control"
							:class="{ 'border-danger': validate.invoice_date.$error }" />
						<template v-if="validate.invoice_date.$error">
							<div v-for="(error, index) in validate.invoice_date.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-3">
					<div class="input-form">
						<label for="invoice_due_date" class="form-label w-full">
							{{ $t("invoice_due_date") }} *
						</label>
						<input v-model.trim="validate.invoice_due_date.$model" id="invoice_due_date" type="date"
							name="invoice_due_date" class="form-control"
							:class="{ 'border-danger': validate.invoice_due_date.$error }" />
						<template v-if="validate.invoice_due_date.$error">
							<div v-for="(error, index) in validate.invoice_due_date.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>



				<div class="col-span-12 md:col-span-6 lg:col-span-2">
					<div class="input-form">
						<label for="total_without_vat" class="form-label w-full">
							{{ $t("total_without_vat") }} *
						</label>
						<input 
							v-model.trim="validate.total_without_vat.$model" 
							id="total_without_vat" 
							type="text"
							name="total_without_vat" 
							class="form-control text-right"
							:class="{ 'border-danger': validate.total_without_vat.$error }" v-numeric-only />
						<template v-if="validate.total_without_vat.$error">
							<div v-for="(error, index) in validate.total_without_vat.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-2">
					<div class="input-form">
						<label for="total_with_vat" class="form-label w-full">
							{{ $t("total_with_vat") }} *
						</label>
						<input v-model.trim="validate.total_with_vat.$model" id="total_with_vat" type="text"
							name="total_with_vat" class="form-control text-right"
							:class="{ 'border-danger': validate.total_with_vat.$error }" v-numeric-only/>
						<template v-if="validate.total_with_vat.$error">
							<div v-for="(error, index) in validate.total_with_vat.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<!-- BEGIN: Buttons -->
				<div class="col-span-12 md:col-span-12 lg:col-span-12">
					<div class="flex justify-end">
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


	<div class="grid grid-cols-12 gap-6 mt-5">
		<div class="col-span-12 md:col-span-4 lg:col-span-4">
			<div class="input-form">
				<label for="product_id" class="form-label w-full">
					{{ $t("product_id") }} *
				</label>

				<v-select v-model="product_id" :options="products" label="name" :reduce="item => item.id"></v-select>

			</div>

		</div>

		<div class="col-span-12 md:col-span-4 lg:col-span-">
			<div class="input-form">
				<label for="description" class="form-label w-full">
					{{ $t("description") }} 
				</label>

				<input v-model.trim="description" id="description" type="text"
							name="description" class="form-control"
				 />

			</div>

		</div>


		<div class="col-span-12 md:col-span-4 lg:col-span-4">
			<button type="button" @click.prevent="addLine" class="btn btn-primary mr-5 mt-6">
				{{ $t("Add") }}
			</button>
		</div>


		<div class="col-span-12 md:col-span-12 lg:col-span-12">
			<div class="flex justify-around border p-2 rounded-lg shadow bg-gray-100">
				<div>{{ $t("description") }}</div>
				<div>{{ $t("sale_price_without_vat") }}</div>
				<div>{{ $t("vat") }}</div>
				<div>{{ $t("actions") }}</div>
			</div>

			<div v-for="item, index in arrProducts" class="col-span-12 md:col-span-12 lg:col-span-12 ">

				<div class="flex justify-around p-2">
					<div>{{ item.name }}</div>
					<div>{{ formatNumber(item.sale_price_without_vat) }}</div>
					<div>{{ formatNumber(item.vat_quote) }}</div>
					<div>
						<button @click.prevent="deleteLine(index)">
							<IconDelete class="h-6 w-6 text-red-600 hover:text-red-400" />
						</button>
					</div>
				</div>
			</div>
		</div>

	</div>



	<!--  description / unit_nb / unit_price /  -->

</template>


<script setup>


import { onMounted, reactive, toRefs, ref } from 'vue';
import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import IconDelete from '@/components/icons/IconDelete.vue';


import useInvoiceCounter from "../../composables/invoice_counters.js";
import useRemittanceType from "../../composables/remittance_types.js";
import useCustomer from "../../composables/customers.js";
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import useProduct from '../../composables/products';
import useInvoiceHeaders from '@/modules/invoices/composables/invoice_headers';
import { formatNowToDB, format30DaysFromNowToDB, formatNumber } from '@/utils/helper.js';


const { t } = useI18n();
const emit = defineEmits(['cancelCreate', 'saveInvoiceHeaderForm']);


const product_id = ref();
const description = ref();
const arrProducts = ref([]);
const { invoiceCounters, getInvoiceCounters } = useInvoiceCounter();
const { remittanceTypes, getRemittanceTypes } = useRemittanceType();
const { customers, getCustomers } = useCustomer();
const { products, getProducts } = useProduct();


const rules = {
	invoice_counter_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	invoice_type_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	remittance_type_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	customer_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	invoice_date: {
		required: helpers.withMessage(t("form.required"), required),
	},
	invoice_due_date: {
		required: helpers.withMessage(t("form.required"), required),
	},
	total_without_vat: {
		required: helpers.withMessage(t("form.required"), required),
	},
	total_with_vat: {
		required: helpers.withMessage(t("form.required"), required),
	},
};

const formData = reactive({
	invoice_counter_id: "",
	invoice_type_id: "2",
	remittance_type_id: "",
	customer_id: "",
	invoice_date: formatNowToDB(),
	invoice_due_date: format30DaysFromNowToDB(),
	total_without_vat: "0",
	total_with_vat: "0",
});

const validate = useVuelidate(rules, toRefs(formData));



const save = () => {

	validate.value.$touch();

	if (validate.value.$invalid) {
		//TODO
	} else {
		
		if (arrProducts.value.length === 0) {
			
			return;
		}
		
		// formData.total_without_vat =formData.total_without_vat.replace(',', '.');
		// formData.total_with_vat = formData.total_with_vat.replace(',', '.');
		formData.total_without_vat = formData.total_without_vat.replace('.', '').replace(',', '.');
		formData.total_with_vat = formData.total_with_vat.replace('.', '').replace(',', '.');

		formData.lines = JSON.stringify(arrProducts.value);		
		emit('saveInvoiceHeaderForm', formData);
	}
};

const addLine = () => {
	const foundProduct = products.value.find(products => products.id === (product_id.value));
	
	if (!foundProduct) {  
        return;
    }
	
	const p = {...foundProduct};



	if(description.value){
		p.name = p.name + ' ' + description.value;
		description.value = '';
	}

	let format1 = formData.total_without_vat.replace(".", "").replace(",", ".");
	let total_without_vat = Number(format1) + Number(p.sale_price_without_vat);

	formData.total_without_vat = formatNumber(total_without_vat); 
	formData.total_with_vat =  formatNumber(Number(total_without_vat) * 1.21);

	arrProducts.value.push(p);


}


const deleteLine = (index) => {
	
	// Restar el precio del producto del total sin IVA
	let format1 = formData.total_without_vat.replace(".", "").replace(",", ".")
	let total_without_vat = Number(format1) - Number(arrProducts.value[index].sale_price_without_vat);


	// formData.total_without_vat = total_without_vat;
	// formData.total_without_vat = String(total_without_vat.toFixed(2)).replace(".", ","); 
	// formData.total_with_vat =  String((Number(total_without_vat) * 1.21).toFixed(2)).replace(".", ",");

	formData.total_without_vat = formatNumber(total_without_vat); 
	formData.total_with_vat = formatNumber(Number(total_without_vat) * 1.21);

	// Eliminar el producto de la lista
	arrProducts.value.splice(index, 1);

}


onMounted(async () => {
	await getInvoiceCounters();
	await getCustomers();
	await getRemittanceTypes();
	await getProducts();
	// console.log(products.value);

});

// Directiva personalizada para la máscara de entrada numérica
const vNumericOnly = {
    beforeMount(el) {
        el.addEventListener('input', (e) => {
            const value = e.target.value;
            // Permitir solo números, comas y puntos
            const numericValue = value.replace(/[^\d.,]/g, '');
            if (numericValue !== value) {
                e.target.value = numericValue;
                // Actualizar el v-model manualmente
                el.dispatchEvent(new Event('input'));
            }
        });
    }
};


</script>
