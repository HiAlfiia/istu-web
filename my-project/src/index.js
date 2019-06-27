
window.onload = function() {
  generateProducts(allProducts);

};

var generateProducts=function(products){
  var row = document.getElementById("ctrs");
  row.innerHTML='';
  products.forEach(function(item, i, products) {
    var product = document.createElement('div');
    product.innerHTML = '<div class="card text-center card-product"><div class="card-product__img">'+
        '<img class="card-img" src="https://placeimg.com/255/255/nature?'+item.img+'" alt="">'+
       '</div><div class="card-body"><p>'+item.country+'</p>'+
        '<h4 class="card-product__title">'+item.name+'</h4>'+
        '<p class="card-product__price">'+item.price+' руб</p>'+
        '<p><button type="button" class="btn btn-primary" id="'+i+'" onclick="order(event)">Заказать</button></p>'+
       '</div>'
      '</div>';
    row.appendChild(product);
  });
    products.forEach(function(item, i, products) {
      chButton(i);
    });
    updateBadge();
}

var order=function(event){
  var id = +event.target.id;
  if(localStorage.getItem(id) === null||localStorage[id]==0){
    localStorage[id]=1;
  }
  else{
    localStorage[id]=0;
  }
  updateBadge();
  chButton(id);
}

var chButton=function(id){
  if(localStorage[id]==0){
    var but = document.getElementById(id);
    but.innerHTML="Заказать";
    but.className = "btn btn-primary";
  }
  else{
    var but = document.getElementById(id);
    but.innerHTML="Отмена";
    but.className = "btn btn-danger";
  }
}

var updateOffers=function(form){
  var elems = form.elements;
  var result = [];
  if(elems.country.value){
    if(elems.country.value=="0"){
      result = allProducts;
    }
    else{
      for (var i = 0; i < allProducts.length; i++) {
        var val = allProducts[i];
        if (val.country == countries[elems.country.value]) {
          result.push(val);
        }
      }
    }
  }
  if(elems.city.value){
    var res=[];
    for (var i = 0; i < result.length; i++) {
      var val = result[i];
      if (val.name.toLowerCase() == elems.city.value.toLowerCase()) {
        res.push(val);
      }
    }
      generateProducts(res);
      return;
  };

  generateProducts(result);
}
