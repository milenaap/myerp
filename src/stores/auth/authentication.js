import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from 'vue-router';


export const useAuthenticationStore = defineStore('authentication', () => {

  const token = ref(null);
  const user = ref(null);
  const loginResponse = ref(null);
  const authErrors = ref([]);

  const router = useRouter();

  //const doubleCount = computed(() => count.value * 2);


  async function login(email, password) {
    user.value = '';
    authErrors.value = [];

    await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {


        if (localStorage.getItem('token_gf_erp')) {
          localStorage.removeItem('token_gf_erp');
        }

        if (data.success) {
          loginResponse.value = data;
          localStorage.setItem('token_gf_erp', data.token);
        } else {
          authErrors.value = data.errors;
        }

      })
      .catch((e) => {
        console.log("Error:", e);
        authErrors.value = e;
        if (localStorage.getItem('token_gf_erp')) {
          localStorage.removeItem('token_gf_erp');
        }
      })

  }



  async function currentUser() {
    
    user.value = '';
    authErrors.value = [];

    await fetch(`${import.meta.env.VITE_API_URL}auth/user`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token_gf_erp')}`
      },
    })
      .then(data => data.json())
      .then(data => {
        user.value = data.data;
      })
      .catch((e) => {
        if (localStorage.getItem('token_gf_erp')) {
          localStorage.removeItem('token_gf_erp');
        }
        router.push('/login');
        console.log("Error:", e);
      });

  }

  async function logout() {

    user.value = '';
    authErrors.value = [];

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}auth/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token_gf_erp')}`
        }
      });
      const response = await res.json();

      if (response.success) {

        token.value = null;
        user.value = null;
        localStorage.removeItem('token_gf_erp');

        router.push('/login');

      } else {
        authErrors.value = response.errors;
      }

    } catch (e) {
      if (localStorage.getItem('token_gf_erp')) {
        localStorage.removeItem('token_gf_erp');
      }
      authErrors.value = e;
      token.value = null;
      user.value = null;
      router.push('/login');
    }

  }

  return {
    token,
    user,
    loginResponse,
    authErrors,
    login,
    currentUser,
    logout
  }

})