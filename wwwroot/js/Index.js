if (document.getElementById("Index")) {

    const app = Vue.createApp({
        data() {
            return {
                title: "Index",
                isLoading: true
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
                        window.location.href = "/Home/Dashboard";
                        document.body.classList.remove("preload");
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
