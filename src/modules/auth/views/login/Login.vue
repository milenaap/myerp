<template>

    <Preloader v-if="loading" />

    <div class="container bg-primary">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen pl-24 animate__animated animate__bounceInLeft form-section">
          <div class="my-auto p-10">
            <img
              alt="GlobalFleet - Office"
              class=" "
              src="@/assets/images/globalfleet-office-logo-white-translucent.svg"
            />
            <div
              class="-intro-x font-light text-4xl leading-tight mt-10"
            >
              The driver`s fellow
            </div>
          </div>
        </div>
        <!-- END: Login Info -->

        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex xl:py-0 my-10 xl:my-0 bg-white ">
            <div
              class="my-auto mx-auto xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto animate__animated animate__bounceInRight"
            >
            <form @submit.prevent="handleSubmit">
              <h2
                class="intro-x text-2xl xl:text-3xl text-center xl:text-left"
              >
              {{ $t("login_form.title") }}
              </h2>
              <div class="intro-x mt-2 text-slate-400 xl:hidden text-center">
                {{ $t("login_form.subtitle") }}
              </div>
              <div class="intro-x mt-8">
                <input
                  type="email"
                  class="intro-x form-control py-3 px-4 block mb-3"
                  required
                  v-bind:placeholder="$t('login_form.email_placeholder')"
                  v-model="email"
                />

                <div class="relative">
                    <input 
                        class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                        :type="showPassword ? 'text' : 'password'" 
                        id="password" 
                        v-model="password" 
                        required
                    />
                    <div class="absolute inset-y-0 right-0 flex items-center px-2">
                        <button type="button" @click.prevent="togglePasswordVisibility">
                            <img 
                                class="w-6 h-6"
                                :src="showPassword ? '/eye_off.svg' : '/eye_on.svg'"
                                alt="Show/Hide password" 
                            />
                        </button>
                    </div>
                </div>
              </div>


              <div
                class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4"
              >
                <div class="flex items-center mr-auto">
                  <input
                    id="remember-me"
                    type="checkbox"
                    class="form-check-input border mr-2"
                  />
                  <label class="cursor-pointer select-none" for="remember-me"
                    >{{ $t("login_form.remember") }}</label
                  >
                </div>
                <a href="/reset">{{ $t("login_form.forgot") }}</a>
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
               
                <button
                  @click.prevent="submit"
                  class="btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                >
                {{ $t("login_form.btn_login") }}
                </button>

              </div>
            </form>
              <div
                class="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left"
              >
              {{ $t("login_form.terms_txt1") }} 
                <a class="text-primary dark:text-slate-400" href="#"
                  >{{ $t("login_form.terms_txt2") }} </a
                >
                {{ $t("login_form.terms_txt3") }}  
                <a class="text-primary dark:text-slate-400" href="#"
                  >{{ $t("login_form.terms_txt4") }} </a
                >
              </div>

            </div>
          
        </div>
        <!-- END: Login Form -->
      </div>
    </div>

</template>

<script setup>
import { ref, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { Toast } from '@/utils/toast';
import { useI18n } from "vue-i18n";
import Preloader from '@/components/preloader/Preloader.vue';
import { useAuthenticationStore } from '@/stores/auth/authentication';


const { t } = useI18n();

//init
const loading = ref(false);
const email = ref('');
const password = ref('');
const message = ref('');
const router = useRouter();

const authStore = useAuthenticationStore();
const { login } = authStore;
const { loginResponse, authErrors } = storeToRefs(authStore);


const showPassword = ref(false);

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}

const submit = async () => {

    message.value = '';
    //set value
    loading.value = true; 

    if (!email.value || !password.value) {
        message.value = 'los campos son requeridos';
        loading.value = false; 
        return;
    }

    // forzamos el dashboard
    //router.push('/dashboard');


    await login(email.value, password.value);

    
    if(!loginResponse.value){
        loading.value = false;
        await Toast(t("login_form.credential_error"), 'error');
    }else {
        loading.value = false;
        router.push('/dashboard');
    }

}

</script>

<style scoped>

</style>