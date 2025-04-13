const app = Vue.createApp({
    data() {
        return {
            username: '',
            password: '',
            message: '',
            token: null,
            error: '',
            userID: null,
            compID : null,
        };
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

                axios.post("http://localhost:5080/api/Auth/login", loginData, {
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
        }


    }
});

app.mount("#SignIn");
