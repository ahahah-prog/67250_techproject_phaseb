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


//External libraries:  
// 1. jQuery 4.0.0 https://code.jquery.com/jquery-4.0.0.min.js
// 2. Leaflet.js 1.9.4 https://unpkg.com/leaflet@1.9.4/dist/leaflet.js    
// 3. OpenStreetMap https://www.openstreetmap.org

//timed greeting
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

//dynamic footer
function addYear() {
    document.getElementById("copyYear").innerHTML = 
        "© " + new Date().getFullYear() + " MonoMuse. All rights reserved.";
}

function ActiveNav() {
    const navLinks = document.querySelectorAll('.nav_bar a');
    navLinks.forEach(link => {
        if (window.location.pathname.endsWith(link.getAttribute('href').replace('../', ''))) {
            link.classList.add("active");
        }
    });
}

ActiveNav();

//read more/less toggle using jQuery 
if (document.getElementById("readMore")) {
    $("#readMore").click(function() {
        $("#longIntro").show();  
        $("#readLess").show();  
        $("#readMore").hide();   
    });

    $("#readLess").click(function() {
        $("#longIntro").hide();  
        $("#readLess").hide();  
        $("#readMore").show();  
    });
}

//ticket purchase form
function showForm(date) {
    document.getElementById("selectedDate").innerHTML = date;
    document.getElementById("buyDate").value = date;
    document.getElementById("purchaseForm").style.display = "block";
}

function submitForm() {
    alert("Redirecting to payment system.");
}

//responsive nav toggle
function toggleNav() {
    var nav = document.querySelector(".nav_bar");
    nav.classList.toggle("responsive");
}

//leaflet map
if (document.getElementById("map")) {
    var map = L.map('map').setView([41.8796, -87.6237], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([41.8796, -87.6237])
        .addTo(map)
        .bindPopup("<b>Art Institute of Chicago</b><br>111 S Michigan Ave, Chicago, IL")
        .openPopup();
}

//price calculation
var ticketPrices = {
  general: 18,
  student: 10,
  member: 15
};

function calculatePrice() {
  var type = document.getElementById("ticketType");
  var qty = document.getElementById("ticketQty");
  var total = document.getElementById("totalPrice");

  if (type && qty && total) {
    var price = ticketPrices[type.value] || 0;
    var quantity = parseInt(qty.value) || 0;
    total.innerHTML = "$" + (price * quantity).toFixed(2);
  }
}

//checkout form validation and order placement
function placeOrder() {
  var valid = true;

  document.querySelectorAll(".error").forEach(function(el) {
    el.innerHTML = "";
  });

  var visitDate = document.getElementById("visitDate");
  if (!visitDate.value) {
    document.getElementById("visitDateError").innerHTML = "Please select a visit date.";
    valid = false;
  }

  var ticketType = document.getElementById("ticketType");
  if (!ticketType.value) {
    document.getElementById("ticketTypeError").innerHTML = "Please select a ticket type.";
    valid = false;
  }

  var qty = document.getElementById("ticketQty");
  if (!qty.value || qty.value < 1 || qty.value > 10) {
    document.getElementById("ticketQtyError").innerHTML = "Please enter a quantity between 1 and 10.";
    valid = false;
  }

  var email = document.getElementById("email");
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || !emailRegex.test(email.value)) {
    document.getElementById("emailError").innerHTML = "Please enter a valid email address.";
    valid = false;
  }

  var zip = document.getElementById("zipCode");
  if (zip.value && !/^\d{5}$/.test(zip.value)) {
    document.getElementById("zipCodeError").innerHTML = "Zip code must be exactly 5 digits.";
    valid = false;
  }

  if (valid) {
    var price = ticketPrices[ticketType.value] || 0;
    var total = (price * parseInt(qty.value)).toFixed(2);

    sessionStorage.setItem("confDate", visitDate.value);
    sessionStorage.setItem("confType", ticketType.options[ticketType.selectedIndex].text);
    sessionStorage.setItem("confQty", qty.value);
    sessionStorage.setItem("confEmail", email.value);
    sessionStorage.setItem("confTotal", "$" + total);

    window.location.href = "confirmation.html";
  }
}

//confirmation 
function loadConfirmation() {
  if (document.getElementById("confDate")) {
    document.getElementById("confDate").innerHTML = sessionStorage.getItem("confDate");
    document.getElementById("confType").innerHTML = sessionStorage.getItem("confType");
    document.getElementById("confQty").innerHTML = sessionStorage.getItem("confQty");
    document.getElementById("confEmail").innerHTML = sessionStorage.getItem("confEmail");
    document.getElementById("confTotal").innerHTML = sessionStorage.getItem("confTotal");
  }
}

//image gallery slideshow
//image credits: gallery1: https://secretchicago.com/art-institute-of-chicago-horvitz-collection/; 
// gallery2: https://icc.edu/event/art-institute-field-trip/
// gallery3: https://emmapetersenphotography.com/2023/07/26/art-institute-chicago-engagement-pictures/

var galleryImages = [
  { src: "static/gallery1.jpg", alt: "Museum sample display" },
  { src: "static/gallery2.jpg", alt: "Museum view from outside" },
  { src: "static/gallery3.jpg", alt: "Visitors looking at the exhibition" }
];

var currentSlide = 0;
var slideInterval;

function showSlide(index) {
  if (document.getElementById("galleryImg")) {
    var img = document.getElementById("galleryImg");
    var caption = document.getElementById("galleryCaption");

    img.style.opacity = 0;

    setTimeout(function() {
      img.src = galleryImages[index].src;
      img.alt = galleryImages[index].alt;
      caption.innerHTML = "Image " + (index + 1) + " of " + galleryImages.length;

      img.style.opacity = 1;
    }, 500);
  }
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + galleryImages.length) % galleryImages.length;
  showSlide(currentSlide);

  clearInterval(slideInterval);
  startSlideshow();
}

function startSlideshow() {
  slideInterval = setInterval(function() {
    currentSlide = (currentSlide + 1) % galleryImages.length;
    showSlide(currentSlide);
  }, 3000); 
}

if (document.getElementById("gallery")) {
  startSlideshow();
}
