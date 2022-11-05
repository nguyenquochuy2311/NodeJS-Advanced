let a = "Hoang";
//Must have ; before IIFE
(function() {
    //console.log(a); // Error
    const a = "Huy";
    console.log(a);
})();


console.log(a);