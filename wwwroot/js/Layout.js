
if (document.getElementById("Layout")) {
    Vue.createApp({
        data() {
            return {
                title: "Layout",
                langMenuOpen: false,
                selectedLang: null,
                languages: [
                    { code: "tr-TR", label: "Türkçe", flag: "https://flagcdn.com/w40/tr.png", class: "flag-icon flag-icon-tr" },
                    { code: "en-GB", label: "English", flag: "https://flagcdn.com/w40/gb.png", class: "flag-icon flag-icon-gb" }
                ],
                IconClass: 'flag-icon flag-icon-tr',
                globalStore: window.globalStore,
                token: null,
                error:null
            };
        },
        mounted() {
            this.token = localStorage.getItem("token");
            localStorage.getItem('lang') == 'tr-TR' ? this.selectedLang = this.languages[0] : this.selectedLang = this.languages[1];
            this.IconClass = this.selectedLang.class;
        },
        methods: {
            selectLanguage(lang) {
                this.langMenuOpen = false;
                this.ChangeLanguage(lang);
                this.EditUserLanguage(lang);
            },

            logout() {
                console.log("İstek gönderiliyor...");
                localStorage.removeItem("token");
                window.location.href = "/Home/Index";
            },

            ChangeLanguage(culture) {
                this.globalStore.isLoader = true;
                try {
                    axios.post('/Home/ChangeLanguage', {
                        Culture: culture
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                        .then((response) => {
                            if (response.data.success) {
                                this.IconClass = culture === 'tr-TR' ? 'flag-icon flag-icon-tr' : 'flag-icon flag-icon-gb';
                                this.globalStore.isLoader = false;
                                localStorage.setItem('lang', culture);
                                window.location.href = window.location.pathname;
                            }
                        })
                        .catch((error) => {
                            console.error("Dil değiştirme hatası:", error);
                            this.globalStore.isLoader = false;
                        });
                } catch (error) {
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                } finally {
                    this.globalStore.isLoader = false;
                }

            },
            async EditUserLanguage(lang) {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    console.log("EditUserLang İstek gönderiliyor...");
                    const userID = parseInt(localStorage.getItem("userID"), 10);

                    if (isNaN(userID)) {
                        console.log("Geçerli bir kullanıcı ID'si bulunamadı.");
                    } else {
                        console.log("Kullanıcı ID'si: ", userID);
                    }
                    const response = await axios.get(this.globalStore.baseURL + "User/EditUserLang", {
                        headers: {
                            "Content-Type": "application/json",
                            token: this.token
                        },
                        params: {
                            id: userID,
                            lang: lang
                        }
                    })
                        .then((response) => {
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                               
                            }
                        })
                        .catch((error) => {
                            console.error("Dil değiştirme hatası:", error);
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                }
            }


        }
    }).mount("#Layout");
}