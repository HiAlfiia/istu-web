window.onload = function() {
  update();
};

var update = function(){
  updateBadge();
  var cou =0;
  var prodsInBadge = [];
  var table = document.getElementById("tbody");
  table.innerHTML="";
  for (var i = 0; i < localStorage.length; i++){
    var ind = localStorage.key(i);
    if(localStorage[ind]<1){continue;}
    cou+=1;
    var product = document.createElement('tr');
    product.id=ind;
    var score = document.createElement('th');
    score.innerHTML=cou;
    product.appendChild(score);
    var city = document.createElement('td');
    city.innerHTML=allProducts[ind].name;
    product.appendChild(city);
    var price = document.createElement('td');
    price.innerHTML=allProducts[ind].price+" руб";
    product.appendChild(price);
    var count = document.createElement('td');
    var countInp = document.createElement('input');
    countInp.type = "number"
    countInp.className="form-control cart-number";
    countInp.value=localStorage[ind];
    countInp.min="1"
    countInp.onchange=function(event){
      var id = +event.target.parentElement.parentElement.id;
      localStorage[id]=+event.target.value;
      update();
    }
    count.appendChild(countInp);
    product.appendChild(count);
    var sum = document.createElement('td');
    sum.innerHTML=Number(localStorage[ind])*allProducts[ind].price + ' руб';
    prodsInBadge.push(new ProdInBadge(allProducts[ind].price, Number(localStorage[ind])));
    product.appendChild(sum);
    var del = document.createElement('td');
    var delB = document.createElement('button');
    delB.type = "button"
    delB.className="btn btn-danger";
    delB.innerHTML="Удалить";
    delB.onclick = function(event){
      var id = +event.target.id;
      localStorage[id]=0;
      update();
    }
    del.appendChild(delB);
    product.appendChild(del);
    table.appendChild(product);
  }
  var res = document.createElement('tr');
  res.id="res";
  var empty = document.createElement('th');
  empty.scope="row";
  empty.colSpan="3";
  empty.innerHTML="&nbsp;";
  var fSumText = document.createElement('td');
  fSumText.innerHTML="Итого: ".bold();
  var fSum = document.createElement('td');
  fSum.innerHTML=getSum(prodsInBadge)+' руб';
  res.appendChild(empty);
  res.appendChild(fSumText);
  res.appendChild(fSum);
  table.appendChild(res);
}
