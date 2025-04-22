if (document.getElementById("Dashboard")) {
    Vue.createApp({
        data() {
            return {
                title: "Dashboard",
                globalStore: window.globalStore
            };
        },
        mounted() {
            console.log(this.globalStore); // Global store'u kullanabilirsiniz
            this.globalStore.isLoader = false;
        },
        methods: {
            
        }
    }).mount("#Dashboard");
}