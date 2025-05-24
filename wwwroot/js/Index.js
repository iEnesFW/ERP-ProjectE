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
                        document.body.classList.remove("preload");
                    }
                } catch (error) {
                    // API hatas� varsa yine login'e y�nlendir
                    console.log("Unknown axios error.");
                    this.isLoading = false;
                    document.body.classList.remove("preload");
                }
            }
        }
    });

    app.mount("#Index");
}
