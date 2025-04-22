
if (document.getElementById("Layout")) {
    Vue.createApp({
        data() {
            return {
                title: "Başlık",
                description: "Açıklama",
                langMenuOpen: false,
                selectedLang: {
                    code: "tr",
                    label: "Türkçe",
                    flag: "https://flagcdn.com/w40/tr.png"
                },
                languages: [
                    { code: "tr", label: "Türkçe", flag: "https://flagcdn.com/w40/tr.png" },
                    { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" }
                ],
                IconClass: 'flag-icon flag-icon-tr',
                globalStore: window.globalStore
            };
        },
        mounted() {
            console.log(this.globalStore); 
            this.IconClass = this.globalStore.selectedLang == 'tr-TR' ? 'flag-icon flag-icon-tr' : 'flag-icon flag-icon-gb';
        },
        methods: {
            selectLanguage(lang) {
                debugger;
                this.globalStore.selectedLang = lang;
                this.langMenuOpen = false;
                this.IconClass = lang == 'tr-TR' ? 'flag-icon flag-icon-tr' : 'flag-icon flag-icon-gb';
            },

            logout() {
                console.log("İstek gönderiliyor...");
                localStorage.removeItem("token");
                window.location.href = "/Home/Index";
            }
        }
    }).mount("#Layout");
}