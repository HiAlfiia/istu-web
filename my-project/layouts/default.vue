<template>
<body>
  <header class="site-header">
     <link rel="stylesheet" type="text/css" href="./css/bootstrap.min.css" />
   <link rel="stylesheet" type="text/css" href="./css/main.css" />
   <div class="main_menu">
    <nav class="navbar navbar-expand-lg navbar-light">
     <div class="container">
      <nuxt-link to="/" class="navbar-brand site-header-logo">Путевки онлайн</nuxt-link>
      <nuxt-link to="/cart" class="btn btn-primary">
       Корзина <span class="badge badge-light" id="badgeCount"></span>
      </nuxt-link>
     </div>
    </nav>
   </div>
  </header>
  
  <nuxt/>
  
  <footer>
  <div class="footer-bottom">
   <div class="container">
    <div class="row d-flex">
     <p class="col-lg-12 footer-text text-center">
      Copyright ©2019
	  </p>
    </div>
   </div>
  </div>
 </footer>
 </body>
</template>

<style src="./main.css"></style>
<style src="./bootstrap.min.css"></style>

<script>
import AppNavigation from './../components/AppNavigation.vue';
import AppFooter from './../components/AppFooter.vue';
export default {
  components: {
    AppNavigation,
    AppFooter
  }
};
</script>
<script src="../src/st.js"></script>
