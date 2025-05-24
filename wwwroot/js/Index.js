if (document.getElementById("Index")) {

    const app = Vue.createApp({
        data() {
            return {
                title: "Index",
                isLoading: true,
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
            async loginWithToken(token) {
                try {
                    debugger;
                    const response = await axios.post('https://localhost:5080/api/Auth/validateToken', { token });

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
                        document.body.classList.remove("preload");
                    }
                } catch (error) {
                    // API hatasý varsa yine login'e yönlendir
                    console.log("Unknown axios error.");
                    this.isLoading = false;
                    document.body.classList.remove("preload");
                }
            }
        }
    });

    app.mount("#Index");
}
