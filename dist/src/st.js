class Product {
  constructor(name, price, country, img) {
    this.name = name;
		this.price = price;
		this.country = country;
    this.img = img;
  }
}

var countries={"1":"Россия", "2":"Франция", "3":"Таиланд"}

var allProducts = [
    new Product('Москва', 150000, 'Россия', '0'),
    new Product('Сочи', 200000, 'Россия', '1'),
    new Product('Париж', 400000, 'Франция', '2'),
    new Product('Бангкок', 50000, 'Таиланд', '3'),
    new Product('Пухкет', 60000, 'Таиланд', '4')
];

var updateBadge = function(){
  var count = 0;
  for (var i = 0; i < localStorage.length; i++){
     count+= Number(localStorage.getItem(localStorage.key(i)));
   }
  var bc = document.getElementById("badgeCount");
  bc.innerHTML = count;
}


class ProdInBadge{
  constructor(price, count){
    this.price=price;
    this.count=count;
  }
}

var getSum = function(prodsInBadge){
  if(prodsInBadge == null){
    return 0;
  }

  var result = 0;
  for (var i = 0; i < prodsInBadge.length; i++) {
    result+=prodsInBadge[i].price*prodsInBadge[i].count;
  }
  return result;
}

module.exports = {
  getSum,
  ProdInBadge
};