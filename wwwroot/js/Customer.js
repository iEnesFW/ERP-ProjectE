if (document.getElementById("Customer")) {
    const Customer = Vue.createApp({
        data() {
            return {
                title: "Customer",
                customers: null,
                token: null,
                hover: false,
                page: 1,
                limit: 5,
                compID: null,

                selectedCustomer: null,
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
            this.customer.compID = this.customer.accounts[0].compID = this.customer.addresses[0].compID = this.customer.contacts[0].compID = this.accountToCreate.compID = this.addressToCreate.compID = this.contactToCreate.compID = this.compID
            this.GetCustomers();
            this.GetCurrencies();
            this.GetCountries();
        },
        watch: {
            selectedCustomer: function () {
                this.showAddAccount = 0;
                this.showEditAccount = 0;
                this.showAddAddress = 0;
                this.showEditAddress = 0;
                this.showAddContact = 0;
                this.showEditContact = 0;
            }
        },
        methods: {
            AddCustomerForm() {
                this.pageType = 2;
                this.isCreate = true;
            },
            EditCustomerForm() {
                this.pageType = 2;
                this.customer = this.selectedCustomer;
                debugger;
                if (this.selectedCustomer.addresses[0] != null && this.selectedCustomer.addresses[0].countryID != null) {
                    this.GetStates(this.selectedCustomer.addresses[0].countryID);
                    this.GetCities(this.selectedCustomer.addresses[0].stateID);
                }
                this.isEdit = true;
            },
            RefreshCustomer() {
                this.GetCustomers();
            },
            selectCustomer(customer) {
                debugger;
                this.selectedCustomer = JSON.parse(JSON.stringify(customer));
                this.detailType == 1 ? this.GetAccounts() : this.detailType == 2 ? this.GetAddresses() : this.GetContacts();
                console.log("Seçili müşteri:", customer);
            },
            selectAccount(account) {
                debugger;
                this.selectedAccount = JSON.parse(JSON.stringify(account));
                console.log("Seçili hesap:", account);
            },
            selectAddress(address) {
                this.selectedAddress = JSON.parse(JSON.stringify(address));
            },
            selectContact(contact) {
                this.selectedContact = JSON.parse(JSON.stringify(contact));
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
                    debugger;
                    this.totalPageCount = response.data.pageCount;

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                }
            },
            async GetCountries() {
                try {
                    this.globalStore.isLoader = true;
                    const response = await axios.get(this.globalStore.baseURL + "Customer/GetCountries", {
                        headers: {
                            "Content-Type": "application/json",
                            token: this.token
                        }
                    });
                    this.globalStore.isLoader = false;
                    this.countries = response.data.countries.map(country => ({
                        id: country.id,
                        name: country.name
                    }));
                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                }
            },
            async GetStates(countryID) {
                try {
                    if (countryID != null) {
                        this.globalStore.isLoader = true;
                        const response = await axios.get(this.globalStore.baseURL + "Customer/GetStates", {
                            headers: {
                                "Content-Type": "application/json",
                                token: this.token
                            },
                            params: {
                                countryID: countryID
                            }
                        });
                        this.globalStore.isLoader = false;
                        this.states = response.data.states;
                    }
                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                }
            },
            async GetCities(stateID) {
                try {
                    if (stateID != null) {
                        this.globalStore.isLoader = true;
                        const response = await axios.get(this.globalStore.baseURL + "Customer/GetCities", {
                            headers: {
                                "Content-Type": "application/json",
                                token: this.token
                            },
                            params: {
                                stateID: stateID
                            }
                        });
                        this.globalStore.isLoader = false;
                        this.cities = response.data.cities;
                    }
                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                }
            },
            async GetCurrencies() {
                try {
                    this.globalStore.isLoader = true;
                    const response = await axios.get(this.globalStore.baseURL + "Customer/GetCurrencies", {
                        headers: {
                            "Content-Type": "application/json",
                            token: this.token
                        }
                    });
                    this.globalStore.isLoader = false;
                    this.currencies = response.data.currencies;
                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                }
            },
            async createCustomer() {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    console.log("CreateCustomer İstek gönderiliyor...");
                    const response = await axios.post(this.globalStore.baseURL + "Customer/CreateCustomer", this.customer, {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                                this.pageType = 1;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            console.error("Kullanıcı ekleme hatası:", error);
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                } finally {
                    this.GetCustomers();
                    this.isCreate = false;
                }
            },
            async editCustomer() {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    const response = await axios.post(this.globalStore.baseURL + "Customer/EditCustomer", this.customer, {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                                this.pageType = 1;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            console.error("Kullanıcı ekleme hatası:", error);
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                } finally {
                    this.GetCustomers();
                    this.isEdit = false;
                }
            },
            async MakeCustomerPassive(id) {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    const response = await axios.post(this.globalStore.baseURL + "Customer/MakeCustomerPassive", id, {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        },
                        params: {
                            customerID: id
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            console.error("Kullanıcı pasife alma hatası:", error);
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                } finally {
                    this.GetCustomers();
                }
            },
            async createAccount() {
                try {
                    debugger;
                    this.accountToCreate.customerID = this.selectedCustomer.customerID;
                    this.globalStore.isLoader = true;
                    console.log("CreateCustomer İstek gönderiliyor...");
                    const response = await axios.post(this.globalStore.baseURL + "Customer/CreateAccount", this.accountToCreate, {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                                this.showAddAccount = 0;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            console.error("Kullanıcı ekleme hatası:", error);
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                } finally {
                    this.GetAccounts();
                }
            },
            showCreateAccount() {
                if (this.showEditAccount == 0)
                    this.showAddAccount = 1;
            },
            showCreateAddress() {
                if (this.showEditAddress == 0)
                    this.showAddAddress = 1;
            },
            showCreateContact() {
                if (this.showEditContact == 0)
                    this.showAddContact = 1;
            },
            closeCreateAccount() {
                this.accountToCreate.customerID = null;
                this.accountToCreate.accountName = null;
                this.accountToCreate.currencyID = null;
                this.showAddAccount = 0;
            },
            closeEditAccount() {
                this.showEditAccount = 0;
            },
            async editAccount() {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    const response = await axios.post(this.globalStore.baseURL + "Customer/EditAccount", this.selectedAccount, {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                                this.showEditAccount = 0;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            console.error("Kullanıcı ekleme hatası:", error);
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                } finally {
                    this.GetAccounts();
                }
            },
            async deleteAccount() {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    const response = await axios.get(this.globalStore.baseURL + "Customer/DeleteAccount",  {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        },
                        params: {
                            accountID: this.selectedAccount.id
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            console.error("Kullanıcı ekleme hatası:", error);
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                } finally {
                    this.GetAccounts();
                }
            },
            async createAddress() {
                try {
                    debugger;
                    this.addressToCreate.customerID = this.selectedCustomer.customerID;
                    this.globalStore.isLoader = true;
                    const response = await axios.post(this.globalStore.baseURL + "Customer/CreateAddress", this.addressToCreate, {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                                this.showAddAddress = 0;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            console.error("Kullanıcı ekleme hatası:", error);
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                } finally {
                    this.GetAddresses();
                }
            },
            async editAddress() {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    const response = await axios.post(this.globalStore.baseURL + "Customer/EditAddress", this.selectedAddress, {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                                this.showEditAddress = 0;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                } finally {
                    this.GetAddresses();
                }
            },
            async deleteAddress() {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    const response = await axios.get(this.globalStore.baseURL + "Customer/DeleteAddress", {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        },
                        params: {
                            addressID: this.selectedAddress.id
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                } finally {
                    this.GetAddresses();
                }
            },
            closeEditAddress() {
                this.showEditAddress = 0;
            },
            closeCreateAddress() {
                this.showAddAddress = 0;
            },
            async createContact() {
                try {
                    debugger;
                    this.contactToCreate.customerID = this.selectedCustomer.customerID;
                    this.globalStore.isLoader = true;
                    const response = await axios.post(this.globalStore.baseURL + "Customer/CreateContact", this.contactToCreate, {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                                this.showAddContact = 0;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            console.error("Contact ekleme hatası:", error);
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                } finally {
                    this.GetContacts();
                }
            },
            async editContact() {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    const response = await axios.post(this.globalStore.baseURL + "Customer/EditContact", this.selectedContact, {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                                this.showEditContact = 0;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                } finally {
                    this.GetContacts();
                }
            },
            async deleteContact() {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    const response = await axios.get(this.globalStore.baseURL + "Customer/DeleteContact", {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        },
                        params: {
                            contactID: this.selectedContact.id
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                } finally {
                    this.GetContacts();
                }
            },
            closeEditContact() {
                this.showEditContact = 0;
            },
            closeCreateContact() {
                this.showAddContact = 0;
            },
            async GetAccounts() {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    const response = await axios.get(this.globalStore.baseURL + "Customer/GetAccounts", {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        },
                        params: {
                            customerID: this.selectedCustomer.customerID
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                                this.accounts = response.data.accounts;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            console.error("Kullanıcı ekleme hatası:", error);
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                }
            },
            async GetAddresses() {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    const response = await axios.get(this.globalStore.baseURL + "Customer/GetAddresses", {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        },
                        params: {
                            customerID: this.selectedCustomer.customerID
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                                this.addresses = response.data.addresses;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            console.error("Adres  hatası:", error);
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                }
            },
            async GetContacts() {
                try {
                    debugger;
                    this.globalStore.isLoader = true;
                    const response = await axios.get(this.globalStore.baseURL + "Customer/GetContacts", {
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                            token: this.token
                        },
                        params: {
                            customerID: this.selectedCustomer.customerID
                        }
                    })
                        .then((response) => {
                            debugger;
                            if (response.data.success) {
                                this.globalStore.isLoader = false;
                                this.contacts = response.data.contacts;
                            }
                        })
                        .catch((error) => {
                            debugger;
                            console.error("Adres  hatası:", error);
                            this.globalStore.isLoader = false;
                        });

                } catch (error) {
                    debugger;
                    this.globalStore.isLoader = false;
                    this.error = error.response ? error.response.data.message : error.message;
                    console.log("Hata:", error.response ? error.response.data : error.message);
                    this.token = null;
                }
            },
            async getChainedAddress() {
                if (this.selectedAddress.countryID != null) {
                    await this.GetStates(this.selectedAddress.countryID);
                }
                if (this.selectedAddress.stateID != null) {
                    await this.GetCities(this.selectedAddress.stateID);
                }
            },
            modalConfirmation() {
                if (this.modalConfirmationID == 1) {
                    this.MakeCustomerPassive(this.selectedCustomer.customerID);
                }
                else if (this.modalConfirmationID == 2) {
                    this.deleteAccount();
                }
                else if (this.modalConfirmationID == 3) {
                    this.deleteAddress();
                }
                else if (this.modalConfirmationID == 4) {
                    this.deleteContact();
                }
            },
            getModalTexts() {
                if (this.modalConfirmationID == 1) {
                    this.modalHeader = "Confirmation";
                    this.modalText = "Do you confirm to make passive?";
                } else if (this.modalConfirmationID == 2) {
                    this.modalHeader = "Confirmation";
                    this.modalText = "Do you confirm to delete the item?";
                }
                else if (this.modalConfirmationID == 3) {
                    this.modalHeader = "Confirmation";
                    this.modalText = "Do you confirm to delete the item?";
                }
                else if (this.modalConfirmationID == 4) {
                    this.modalHeader = "Confirmation";
                    this.modalText = "Do you confirm to delete the item?";
                }
            },
            detailChanged(id) {
                if (id == 1) {
                    this.detailType = 1;
                    this.showAddAccount = 0;
                    this.showEditAccount = 0;
                    this.GetAccounts();
                } else if (id == 2) {
                    this.detailType = 2;
                    this.showAddAddress = 0;
                    this.showEditAddress = 0;
                    this.GetAddresses();
                } else if (id == 3) {
                    this.detailType = 3;
                    this.showAddContact = 0;
                    this.showEditContact = 0;
                    this.GetContacts();
                }
            }

        }
    });
    Customer.mount("#Customer");
}