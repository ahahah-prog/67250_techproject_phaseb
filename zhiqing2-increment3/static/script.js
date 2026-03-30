// var x = 5;
// var y = 7;
// var z = x + y;
// console.log(z); 

// var A = "Hello ";
// var B = "world!";
// var C = A + B;
// console.log(C); 

// function sumnPrint(x1, x2) {
//     var result = x1 + x2;
//     console.log(result);
// }

// sumnPrint(x, y); 
// sumnPrint(A, B); 


// if (C.length>z) {
//     console.log(C)
//     if (C.length<z) {
//         console.log(z)
//     }
// } else {
//     print ("good job!")
// }

// var L1 = ["Watermelon", "Pineapple", "Pear", "Banana"];
// var L2 = ["Apple", "Banana", "Kiwi", "Orange"];

// function findTheBanana(arr) {
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i] === "Banana") {
//             alert("Banana is found!");
//         }
//     }
// }

// findTheBanana(L1);
// findTheBanana(L2);

// function findTheBanana(arr) {
//     arr.forEach(function(item) {
//         if (item === "Banana") {
//             alert("Banana is found!");
//         }
//     });
// }

// findTheBanana(L1);
// findTheBanana(L2);


var now = new Date();
var hour = now.getHours();

function greeting(h) {
    var greetingElement = document.getElementById("greeting");

    if (greetingElement) {  
        if (h < 5 || h >= 20) {
            greetingElement.innerHTML = "Good night! Welcome to MonoMuse.";
        } else if (h < 12) {
            greetingElement.innerHTML = "Good morning! Welcome to MonoMuse.";
        } else if (h < 18) {
            greetingElement.innerHTML = "Good afternoon! Welcome to MonoMuse.";
        } else {
            greetingElement.innerHTML = "Good evening! Welcome to MonoMuse.";
        }
    }
}

if (window.location.pathname.endsWith("index.html") || 
    window.location.pathname === "/") {
    greeting(hour);
}

function addYear() {
    document.getElementById("copyYear").innerHTML = 
        "© " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
}
