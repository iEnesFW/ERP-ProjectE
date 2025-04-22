if (document.getElementById("Customer")) {
    Vue.createApp({
        data() {
            return {
                title: "Customer",
                customers: null,
                token: null,
                hover: false,
                page: 1,
                limit: 6,

                selectedCustomer: null,
                totalCount: 0,
                totalPageCount: 0,
                searchText: null,
                globalStore: window.globalStore,
                pageType : 1
            };
        },
        mounted() {
            this.token = localStorage.getItem('token'); 
            this.GetCustomers();
        },
        watch: {
            //page: function (newVal) {
            //    this.GetCustomers();
            //}
        },
        methods: {
            AddCustomerForm() {
                this.pageType = 2;
            },
            selectCustomer(customer) {
                this.selectedCustomer = JSON.parse(JSON.stringify(customer));
                console.log("Seçili müşteri:", customer);
            },
            searchCustomer() {
                this.GetCustomers();
            },
            pageChange(page) {
                this.page = page;
                this.GetCustomers();
            },
            async GetCustomers() {
                try {
                    this.globalStore.isLoader = true;
                    console.log("GetCustomers İstek gönderiliyor...");

                    const response = await axios.get(this.globalStore.baseURL + "Customer/GetAllPaged", {
                        headers: {
                            "Content-Type": "application/json",
                            token: this.token
                        },
                        params: {
                            page: this.page,
                            limit: this.limit,
                            searchText: this.searchText
                        }
                    });
                    this.globalStore.isLoader = false;
                    this.customers = response.data.customers;
                    this.totalCount = response.data.totalCount;
                    this.totalPageCount = ((response.data.totalCount % response.data.pageCount == 0) ? response.data.pageCount : response.data.pageCount + 1);

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                }
            }


        }
    }).mount("#Customer");
}