var homePageData = [];
var productDetailData = [];
var prod_id = 1;
$(document).ready(function () {
  var url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";
  $.get(url, function (data) {
    homePageData = data;
    // localStorage.setItem("data", JSON.stringify(homePageData))
    homePageData?.forEach(function (item, i) {
      // console.log(item)
      $(`.box1 .card:nth-child(${i + 1}) img`).attr("src", item.preview);
      // console.log(item);
      $(`.box1 .card:nth-child(${i + 1}) img`).bind("click", function () {
        $(`#homepage`).css("display", "none");
        $(`.product-detail-main`).css("display", "block");
        localStorage.setItem("id", item.id);
        prod_id = localStorage.getItem("id");
        $.get(
          "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + prod_id,
          function (data) {
            localStorage.setItem("data", JSON.stringify(data));
            $(".big-img").attr("src", data.preview);
            $(`.right-box .heading`).text(data.name);
            $(`.right-box .brand`).text(data.brand);
            $(`.right-box .heading .price #product-price`).text(data.price);
            $(`.right-box .desc-text`).text(data.description);
            data.photos?.forEach(function (elem, j) {
              $(`.right-box .preview .image:nth-child(${j + 1})`).attr(
                "src",
                data.photos[j]
              );
              $(`.right-box .preview .image:nth-child(${j + 1})`).bind(
                "click",
                function (e) {
                  $(".big-img").attr("src", e.target.src);
                }
              );
            });
          }
        );
      });
      $(`.box1 .card:nth-child(${i + 7}) img`).bind("click", function () {
        $(`#homepage`).css("display", "none");
        $(`.product-detail-main`).css("display", "block");
        localStorage.setItem("id", homePageData[i + 5].id);
        prod_id = localStorage.getItem("id");
        $.get(
          "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + prod_id,
          function (data) {

            $(".big-img").attr("src", data.preview);
            $(`.right-box .heading`).text(data.name);
            $(`.right-box .brand`).text(data.brand);
            $(`.right-box .heading .price #product-price`).text(data.price);
            $(`.right-box .desc-text`).text(data.description);
            data.photos?.forEach(function (elem, i) {
              $(`.right-box .preview .image:nth-child(${i + 1})`).attr(
                "src",
                data.photos[i]
              );
              $(`.right-box .preview .image:nth-child(${i + 1})`).bind(
                "click",
                function (e) {
                  $(".big-img").attr("src", e.target.src);
                }
              );
            });
          }
        );
      });
      $(`.box1 .card:nth-child(${i + 1}) .card-body h6`).text(
        homePageData[i].name
      );
      $(`.box1 .card:nth-child(${i + 1}) .card-body #card-text`).text(
        homePageData[i].brand
      );
      $(`.box1 .card:nth-child(${i + 1}) .card-body .price`).text(
        "Rs" + " " + homePageData[i].price
      );
      $(`.box1 .card:nth-child(${i + 7}) img`).attr(
        "src",
        homePageData[i + 5].preview
      );
      $(`.box1 .card:nth-child(${i + 7}) .card-body h6`).text(
        homePageData[i + 5].name
      );
      $(`.box1 .card:nth-child(${i + 7}) .card-body #card-text`).text(
        homePageData[i + 5].brand
      );
      $(`.box1 .card:nth-child(${i + 7}) .card-body .price`).text(
        "Rs." + " " + homePageData[i + 5].price
      );
    });
  });
  $(`.card:nth-child(6)`).before(
    '<h3 class="accessories-section">Accessories for Men and Women</h3>'
  );
  var total = 0;
  $("#total-amount").text(total);
  $('.add-cart-btn').bind("click", function(cartItem){
    var getItem = localStorage.getItem("data");
    var retrieveData = JSON.parse(getItem);
    $('.add-cart-btn').addClass('bigger');
  setTimeout(function() {
      $('.add-cart-btn').removeClass('bigger');
  }, 200)
  total += retrieveData.price;
  $("#total-amount").text(total);
    console.log("clicked");
    var element1 = document.createElement("div");
    element1.classList.add("checkout-card");
    var element2 = document.createElement("div");
    element2.classList.add("check-img");
    var element3 = document.createElement("img");
    element3.classList.add("checkout-img");
    element2.appendChild(element3);
    element1.appendChild(element2);
    var element4 = document.createElement("div");
    element4.classList.add("checkout-card-item");
    var element5 = document.createElement("h4");
    element4.appendChild(element5);
    var element6 = document.createElement("p");
    element6.classList.add("quant");
    element4.appendChild(element6);
    var element7 = document.createElement("p");
    element4.appendChild(element7);
    var element7child1 = document.createElement("span");
    var element7child2 = document.createElement("span");
    element7.appendChild(element7child1);
    element7.appendChild(element7child2);
    element1.appendChild(element4);
    $(".cart-box-left").append(element1);
    console.log(element1);
    var selectBtn = $(".checkout-card");
    $("#prodName").text(retrieveData.name);
    element3.src = retrieveData.preview;
    element5.innerText = retrieveData.name;
    element7child2.innerText = "Amount: Rs" + " " + retrieveData.price;
    
    
    var quantity = 1;
    element6.innerText = "X" + quantity;
      if (element5.innerText == retrieveData.name){
        $(".checkout-card .checkout-card-item .quant").text("X" + ++quantity);
      }
  })
});



var cartClick = document.querySelector("#cart-click");
var displayCartBox = document.querySelector(".cart-box");
var displayHome = document.querySelector("#homepage");
var cartCount = document.querySelector(".cart-count");

var productDetailPage = document.querySelector(".product-detail-main");
function openCheckout() {
  displayHome.style.display = "none";
  displayCartBox.style.display = "block";
  productDetailPage.style.display = "none";
}
cartClick.addEventListener("click", openCheckout);

var placeOrder = document.querySelector(".right-card-btn");
var confirmOrderPage = document.querySelector(".confirmed-order");
function confirmOrder() {
  setTimeout(function() {
    displayCartBox.style.display = "none";
    confirmOrderPage.style.display = "block";
  }, 500);
}

function openMainPage(){
  displayHome.style.display = "block";
  displayCartBox.style.display = "none";
  productDetailPage.style.display = "none";
  confirmOrderPage.style.display = "none";
}

var updateBorder = document.querySelectorAll(".image");
updateBorder.forEach((borders) => {
  borders.addEventListener("click", () => {
    resetBorders();
    borders.classList.add("active-border");
  });
});

function resetBorders() {
  updateBorder.forEach((borders) => {
    borders.classList.remove("active-border");
  });
}

var productImage = document.querySelector(".img");
placeOrder.addEventListener("click", confirmOrder);

let count = 0;
let totalItem = 0;
// cartCount.innerHTML = count;
document.querySelector(".add-cart-btn").addEventListener("click", function(){
  document.querySelector("#total-items").innerHTML = ++totalItem;
})

function showCartCounter(e) {
  // e.preventDefault();
  localStorage.setItem("countValue", ++count);
  cartCount.innerHTML = localStorage.getItem("countValue");

}
cartCount.innerHTML = localStorage.getItem("countValue");
