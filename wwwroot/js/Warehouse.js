if (document.getElementById("Warehouse")) {
    const Warehouse = Vue.createApp({
        data() {
            return {
                title: "Warehouse",
                warehouses: null,
                token: null,
                hover: false,
                page: 1,
                limit: 5,
                compID: null,

                selectedWarehouse: null,
                totalCount: 0,
                totalPageCount: 0,
                searchText: null,
                globalStore: window.globalStore,
                pageType: 1,
                countries: null,
                states: null,
                cities: null,
                selectedCountry: null,
                selectedState: null,
                selectedCity: null,
                currencies: null,
                phoneCode: null,
                contactPhoneCode: null,
                showConfirm:false,
                customer: {
                    compID: null,
                    email: null,
                    phoneNumber: null,
                    companyName: null,
                    deposit: 0,
                    credit: 0,
                    balance: 0,
                    isActive:true,
                    contacts: [{
                        compID: null,
                        name: null,
                        surname: null,
                        phone: null,
                        address: null,
                        note: null
                    }],
                    addresses: [{
                        compID: null,
                        countryID: null,
                        stateID: null,
                        cityID: null,
                        address: null
                    }],
                    accounts: [{
                        compID: null,
                        accountName: null,
                        currencyID: null,
                        deposit: 0,
                        credit: 0,
                        balance: 0
                    }]
                },
                isCreate: false,
                isEdit: false,
                detailType: 1,

                accounts: null,
                accountToCreate: { compID: null, customerID: null, accountName: null, currencyID: null },
                selectedAccount:null,
                showAddAccount: 0,
                showEditAccount:0,

                addresses: null,
                addressToCreate: { compID: null, customerID: null, countryID: null, stateID: null, cityID: null, address: null },
                showAddAddress: 0,
                showEditAddress: 0,
                selectedAddress: null,

                contacts: null,
                contactToCreate: { compID: null, customerID: null, name: null, surname: null, phone: null, address: null },
                showAddContact: 0,
                showEditContact: 0,
                selectedContact: null,


                modalConfirmationID: 1,
                modalText: null,
                modalHeader : null
            };
        },
        mounted() {
            this.token = localStorage.getItem('token');
            this.compID = parseInt(localStorage.getItem("compID"), 10);

            this.GetWarehouses();
        },
        watch: {
            //selectedWarehouse: function () {
            //    this.showAddAccount = 0;
            //    this.showEditAccount = 0;
            //    this.showAddAddress = 0;
            //    this.showEditAddress = 0;
            //    this.showAddContact = 0;
            //    this.showEditContact = 0;
            //}
        },
        methods: {
            RefreshWarehouses() {
                this.GetWarehouses();
            },
            selectWarehouse(warehouse) {
                debugger;
                this.selectedWarehouse = JSON.parse(JSON.stringify(warehouse));
                //this.detailType == 1 ? this.GetAccounts() : this.detailType == 2 ? this.GetAddresses() : this.GetContacts();
            },
            searchWarehouse() {
                this.GetWarehouses();
            },
            pageChange(page) {
                this.page = page;
                this.GetWarehouses();
            },
            async GetWarehouses() {
                try {
                    this.globalStore.isLoader = true;
                    const response = await axios.get(this.globalStore.baseURL + "Stock/GetWarehouses", {
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
                    this.warehouses = response.data.warehouses;
                    this.totalCount = response.data.totalCount;
                    debugger;
                    this.totalPageCount = response.data.pageCount;

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                }
            },
           
            detailChanged(id) {
                if (id == 1) {
                    this.detailType = 1;
                    // this.GetTransactions();
                } else if (id == 2) {
                    this.detailType = 2;
                    // this.GetAddresses();
                } else if (id == 3) {
                    this.detailType = 3;
                    // this.GetContacts();
                }
            }

        }
    });
    Warehouse.mount("#Warehouse");
}