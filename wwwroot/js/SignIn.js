import { createApp } from 'vue';

createApp({
  data() {
    return {
      message: 'Sign In',
      email: '',
      password: ''
    };
  },
  methods: {
    signIn() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        alert('Geçersiz e-posta formatı.');
        return;
      }
      if (this.password.length < 8) {
        alert('Parola en az 8 karakter olmalıdır.');
        return;
      }
      alert('Giriş başarılı!');
      // Burada giriş işlemleri yapılabilir.
    }
  }
}).mount('#app');
