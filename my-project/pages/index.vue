<template>
 <section class="site-main mb-5">
  <div class="container">
    <form>
   <div class="row">
    <div class="col-xl-3 col-lg-4 col-md-5">
     <div class="filter-sidebar">
      <div class="filter-sidebar-header">Страны:</div>
      <div class="filter-sidebar-content">
       <div class="form-check" id="countryCheck">
        <input class="form-check-input" type="radio" name="country" id="country-0" value="0" checked>
        <label class="form-check-label" for="country-0">
         Все (21)
        </label>
       </div>
       <div class="form-check">
        <input class="form-check-input" type="radio" name="country" id="country-1" value="1">
        <label class="form-check-label" for="country-1">
         Россия (10)
        </label>
       </div>
       <div class="form-check">
        <input class="form-check-input" type="radio" name="country" id="country-2" value="2">
        <label class="form-check-label" for="country-2">
         Франция (5)
        </label>
       </div>
       <div class="form-check">
        <input class="form-check-input" type="radio" name="country" id="country-3" value="3" >
        <label class="form-check-label" for="country-3">
         Тайланд (6)
        </label>
       </div>
      </div>
     </div>
    </div>
    <div class="col-xl-9 col-lg-8 col-md-7">
     <div class="filter-bar">
      <div>
       <div class="input-group">
        <input type="text" class="form-control" name="city" placeholder="Название города">
        <div class="input-group-append">
         <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="updateOffers(this.form)">Искать</button>
        </div>
       </div>
      </div>
     </div>
     <section class="lattest-product-area pb-40 category-list" id="ctrs">
      <div class="row">
         <div class="card text-center card-product"  v-for="prod in products">
		 {{products}}
          <div class="card-product__img">
           <img class="card-img" :src="prod.img" alt="">
          </div>
          <div class="card-body">
           <p>{{prod.country}}</p>
           <h4 class="card-product__title">{{prod.name}}</h4>
           <p class="card-product__price">{{prod.price}} руб</p>
           <p><button type="button" class="btn btn-danger">Отмена</button></p>
          </div>
         </div>
       </div>
     </section>
    </div>
   </div>
 </form>
  </div>
 </section>
</template>

<script src="../src/st.js"></script>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
	var obj = JSON.parse('{"obj":[ { "name": "Москва", "price": 150000, "country": "Россия", "img": "https://placeimg.com/255/255/nature?0" }, '+
	'{ "name": "Сочи", "price": 200000, "country": "Россия", "img": "https://placeimg.com/255/255/nature?1" },'+ 
	'{ "name": "Париж", "price": 400000, "country": "Франция", "img": "https://placeimg.com/255/255/nature?2" }, '+
	'{ "name": "Бангкок", "price": 50000, "country": "Таиланд", "img": "https://placeimg.com/255/255/nature?3" }, '+
	'{ "name": "Пухкет", "price": 60000, "country": "Таиланд", "img": "https://placeimg.com/255/255/nature?4" } ]}');
	
  module.exports = {
  data() {
	return axios.get('/js.json')
        .then((res) => {
          return {
            products: res.obj
          }
        })
  
    return {products : obj.obj};
  }
}
</script>