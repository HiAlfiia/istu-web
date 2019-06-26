describe("empty", function() {

  it("пустой массив вернет 0", function() {
    assert.equal(getSum([]), 0);
  });
  it("null вернет 0", function() {
    assert.equal(getSum(null), 0);
  });  
  it("не определенная вернет 0", function() {
    assert.equal(getSum(1/0), 0);
  });	
});

describe("many", function() {

  it("один товар", function() {
    assert.equal(getSum([new ProdInBadge(34, 1)]), 34);
  });
  it("Много товара", function() {
    assert.equal(getSum([new ProdInBadge(100, 100)]), 10000);
  });  
  it("Несколько видов товара", function() {
    assert.equal(getSum([new ProdInBadge(100, 100), new ProdInBadge(200, 500), new ProdInBadge(34, 2)]), 110068);
  });	
});



