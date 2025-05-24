const app = Vue.createApp({
    data() {
        return {
            username: '',
            password: '',
            message: '',
            token: null,
            error: '',
            userID: null,
            compID: null,
            globalStore: window.globalStore
        };
    },
    mounted() {
        const token = localStorage.getItem('token');
        if (token) {
            this.loginWithToken(token);
        }
    },
    methods: {

        async login(event) {
            try {
                event.preventDefault(); // Sayfanın yenilenmesini engelle

                console.log("İstek gönderiliyor...");

                const loginData = {
                    username: this.username,
                    password: this.password
                };

                axios.post(this.globalStore.baseURL + "Auth/login", loginData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => {
                        console.log("Başarılı:", response.data);
                        debugger;
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('userID', response.data.userID);
                        localStorage.setItem('compID', response.data.compID);
                        localStorage.setItem('modules', response.data.modules);
                        localStorage.setItem('lang', response.data.lang);

                        window.location.href = "/Home/Dashboard";
                    })
                    .catch(error => {
                        this.error = error.response ? error.response.data.message : error.message;
                        console.log("Hata:", error.response ? error.response.data : error.message);
                        this.token = null;
                    });

            } catch (error) {
                console.log("Axios Hatası:", error.response ? error.response.data : error.message);
                this.token = null;
            }
        },
        async loginWithToken(token) {
            try {
                debugger;
                const response = await axios.post(this.globalStore.baseURL + 'Auth/validateToken', { token });

                if (response.data.isValid) {
                    // Token geçerli, yönlendir
                    localStorage.setItem('token', token);
                    localStorage.setItem('userID', response.data.userID);
                    localStorage.setItem('compID', response.data.compID);
                    localStorage.setItem('modules', response.data.moduleText);
                    localStorage.setItem('lang', response.data.lang);

                    window.location.href = "/Home/Dashboard";
                } else {
                    // Token geçersizse login ekranına yönlendir
                    console.log("Gecersiz Token");
                    this.isLoading = false;
                }
            } catch (error) {
                // API hatası varsa yine login'e yönlendir
                console.log("Unknown axios error.");
                this.isLoading = false;
            }
        }


    }
});

app.mount("#SignIn");


