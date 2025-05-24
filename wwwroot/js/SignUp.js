import { createApp } from 'vue';

if (document.getElementById("SignIn")) {
    const app = createApp({
        data() {
            return {
                title: "Ba�l�k",
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

                // Buraya istersen locale de�i�imi i�lemleri ekleyebilirsin
            },
            async loginWithToken(token) {
                try {
                    debugger;
                    const response = await axios.post(this.globalStore.baseURL + 'Auth/validateToken', { token });

                    if (response.data.isValid) {
                        // Token ge�erli, y�nlendir
                        localStorage.setItem('token', token);
                        localStorage.setItem('userID', response.data.userID);
                        localStorage.setItem('compID', response.data.compID);
                        localStorage.setItem('modules', response.data.moduleText);
                        localStorage.setItem('lang', response.data.lang);

                        window.location.href = "/Home/Dashboard";
                    } else {
                        // Token ge�ersizse login ekran�na y�nlendir
                        console.log("Gecersiz Token");
                        this.isLoading = false;
                    }
                } catch (error) {
                    // API hatas� varsa yine login'e y�nlendir
                    console.log("Unknown axios error.");
                    this.isLoading = false;
                }
            }
        }
    });

    app.mount("#SignIn");
}

