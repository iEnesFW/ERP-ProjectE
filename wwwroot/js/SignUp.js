import { createApp } from 'vue';

if (document.getElementById("SignIn")) {
    const app = createApp({
        data() {
            return {
                title: "Baþlýk",
                globalStore: window.globalStore,
                isLoading : false
            };
        },

        mounted() {
            const token = localStorage.getItem('token');

            if (token) {
                this.loginWithToken(token);
            }
        },
        methods: {
            selectLanguage() {

                // Buraya istersen locale deðiþimi iþlemleri ekleyebilirsin
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
                        // Token geçersizse login ekranýna yönlendir
                        console.log("Gecersiz Token");
                        this.isLoading = false;
                    }
                } catch (error) {
                    // API hatasý varsa yine login'e yönlendir
                    console.log("Unknown axios error.");
                    this.isLoading = false;
                }
            }
        }
    });

    app.mount("#SignIn");
}

