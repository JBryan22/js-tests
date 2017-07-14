var factorialize = function(num) {
  var product = 1;
  if (num === 0) {
    return 1;
  } else {
    for (i = num; num > 0; num--) {
      product *= num;
    }
  }
  return product;
}

var factorializeRecursion = function(num) {
  if (num === 0 || num === 1) {
    return 1;
  } else {
    return (num * factorializeRecursion(num - 1));
  }
}

var sieveOfEra = function(num) {
  var numsUpToN = [];
  var prime = 2;
  for (i = 2; i <= num; i++) {
    numsUpToN.push(i);
  }
  for (index = 0; index < num - 2; index++) {
    numsUpToN = numsUpToN.filter(function(iteration){
      return ((iteration % prime !== 0) || (iteration === prime));
    });
    prime++;
  }
  return numsUpToN;
}

var sieveOfEraRefined = function(num) {
  var sieve = [];
  var primes = [];

  sieve[1] = false;

  for (i = 2; i <= num; i++) {
    sieve[i] = true;
  }

  for (i = 2; i * i <= num; i++) {
    for(j = i * i; j <= num; j+= i) {
      sieve[j] = false;
    }
  }

  sieve.forEach(function(value, index) {
    if (value) {
      primes.push(index);
    }
  });
  return primes;
}



$(function(){
  $("#factorial-form").submit(function(event){
    event.preventDefault();
    var origNumber = $("#factorial").val();
    $(".output").text(factorializeRecursion(origNumber));
  });

  $("#palindromes").submit(function(event){
    debugger;
    event.preventDefault();
    var origString = $("#palindrome").val();
    if (origString.toLowerCase().replace(/ /g, "") === origString.toLowerCase().split('').reverse().join('').replace(/ /g, "")) {
      $(".output1").text('true');
    } else {
      $(".output1").text('false');
    }
  });

  $("#primes").submit(function(event){
    event.preventDefault();
    var num = parseInt($("#primeNum").val());
    var primes = sieveOfEraRefined(num);
    $(".output2").text(primes);
    // var t0 = performance.now();
    // sieveOfEra(num);
    // var t1 = performance.now();
    // console.log("Call to sieveOfEra took " + (t1 - t0) + "milliseconds.");
    var t3 = performance.now();
    sieveOfEraRefined(num);
    var t4 = performance.now();
    console.log("Call to sieveOfEraRefined took " + (t4 - t3) + "milliseconds.");
  });
});
