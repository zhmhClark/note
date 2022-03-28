function createIncrementor(start) {
    return function () {
      return start++;
    };
  }
  
var inc = createIncrementor(5);

console.log(inc())
console.log(inc())
console.log(inc())
    