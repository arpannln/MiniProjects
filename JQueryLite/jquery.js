function $(selector) {
  this.value = document.querySelectorAll(`${selector}`);

  this.nthChild = function(n) {
    this.value[n];
    return this;
  };

  
}
