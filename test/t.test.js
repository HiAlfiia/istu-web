const assert = require('assert');
const st = require('../dist/src/st');

describe("empty", function() {

  it("пустой массив вернет 0", function() {
    assert.equal(st.getSum([]), 0);
  });
  it("null вернет 0", function() {
    assert.equal(st.getSum(null), 0);
  });  
  it("не определенная вернет 0", function() {
    assert.equal(st.getSum(1/0), 0);
  });	
});

describe("many", function() {

  it("один товар", function() {
    assert.equal(st.getSum([new st.ProdInBadge(34, 1)]), 34);
  });
  it("Много товара", function() {
    assert.equal(st.getSum([new st.ProdInBadge(100, 100)]), 10000);
  });  
  it("Несколько видов товара", function() {
    assert.equal(st.getSum([new st.ProdInBadge(100, 100), new st.ProdInBadge(200, 500), new st.ProdInBadge(34, 2)]), 110068);
  });	
});