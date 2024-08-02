<template>

	<!-- BEGIN: Card -->
	<div class="card">
		<!-- BEGIN: Form -->
		<form @submit.prevent="save">

			<h3 class="mb-5 mt-1">Datos</h3>

			<!-- BEGIN: container -->
			<div class="grid grid-cols-12 gap-6">

				<div class="col-span-12 md:col-span-10 lg:col-span-10">
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


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
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


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
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



	<!-- BEGIN: Card -->
	<div class="card mt-5">

		<h3 class="mb-5 mt-1">Detalles</h3>

		<div class="grid grid-cols-12 gap-6 mt-5">
		<div class="col-span-12 md:col-span-4 lg:col-span-4">
			<div class="input-form">
				<label for="product_id" class="form-label w-full">
					{{ $t("product_id") }} *
				</label>

				<v-select v-model="product_id" :options="products" label="name" :reduce="item => item.id"></v-select>

			</div>

		</div>

		<div class="col-span-12 md:col-span-4 lg:col-span-2">
			<div class="input-form">
				<label for="unit_nb" class="form-label w-full">
					{{ $t("unit_nb") }} 
				</label>

				<input v-model.trim="unit_nb" id="unit_nb" type="number" min="1"
							name="unit_nb" class="form-control"
				 />

			</div>

		</div>

		<div class="col-span-12 md:col-span-4 lg:col-span-4">
			<div class="input-form">
				<label for="description" class="form-label w-full">
					{{ $t("description") }} 
				</label>

				<input v-model.trim="description" id="description" type="text"
							name="description" class="form-control"
				 />

			</div>

		</div>


		<div class="col-span-12 md:col-span-4 lg:col-span-2">
			<button type="button" @click.prevent="addLine" class="btn btn-primary mr-5 mt-6">
				{{ $t("insert") }}
			</button>
		</div>

		<div class="col-span-12 md:col-span-12 lg:col-span-12">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							{{ $t("description") }}
						</th>
						<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							{{ $t("sale_price_without_vat") }}
						</th>
						<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							{{ $t("unit_nb") }}
						</th>
						<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							{{ $t("actions") }}
						</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					<tr v-for="(item, index) in arrProducts" :key="index">
						<td class="px-6 py-4">{{ item.name }}</td>
						<td class="px-6 py-4">{{ formatNumber(item.sale_price_without_vat) }}</td>
						<td class="px-6 py-4">{{ item.unit_nb }}</td>
						<td class="px-6 py-4">
							<button @click.prevent="deleteLine(index)">
								<IconDelete class="h-6 w-6 text-red-600 hover:text-red-400" />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

	</div>



	</div>

	<!-- END: Card -->
	

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



const { invoiceCounters, getInvoiceCounters } = useInvoiceCounter();
const { remittanceTypes, getRemittanceTypes } = useRemittanceType();
const { customers, getCustomers } = useCustomer();
const { products, getProducts } = useProduct();
const product_id = ref();
const description = ref();
const arrProducts = ref([]);
const unit_nb = ref(1);


const rules = {
	invoice_counter_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	invoice_type_id: {
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

	p.unit_nb = unit_nb.value;

	let format1 = formData.total_without_vat.replace(".", "").replace(",", "."); 
	let total_without_vat = Number(format1) + (Number(p.sale_price_without_vat) * unit_nb.value);

	formData.total_without_vat = formatNumber(total_without_vat); 
	formData.total_with_vat =  formatNumber(Number(total_without_vat) * 1.21);
	
	arrProducts.value.push(p);

	unit_nb.value = 1;

	product_id.value = '';
	
}


const deleteLine = (index) => {
	
	let format1 = formData.total_without_vat.replace(".", "").replace(",", "."); // 1230.20
	let total_without_vat = Number(format1) - (Number(arrProducts.value[index].sale_price_without_vat) * Number(arrProducts.value[index].unit_nb));

	formData.total_without_vat = formatNumber(total_without_vat); 
	formData.total_with_vat = formatNumber(Number(total_without_vat) * 1.21);

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