var productContainer;

if (localStorage.getItem("productsData") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("productsData"));
  displayProduct();
}

var inps = document.getElementsByClassName("form-control");
const clearform = () => {
  for (var i = 0; i < inps.length; i++) {
    inps[i].value = "";
  }
};

const validateForm = (name) => {
  const nameRegex = /[A-Za-z]/;
  if (nameRegex.test(name) === true) {
    return true;
  } else {
    return false;
  }
};

const validateQuantity = (price) => {
  const priceRegex = /(^[1-9]([0-9]*)?$)|(^[0]{1}$)/;
  if (priceRegex.test(price) === true) {
    return true;
  } else {
    return false;
  }
};

document.getElementById("add").addEventListener("click", function addProduct() {
  var productName = document.getElementById("productNameInp").value;
  var productPrice = document.getElementById("productPriceInp").value;
  var productCategory = document.getElementById("productCategoryInp").value;
  var productDescrption = document.getElementById("productDescInp").value;

  if (
    validateForm(productName) == true &&
    validateQuantity(productPrice) == true &&
    validateForm(productDescrption) == true &&
    validateForm(productCategory) == true
  ) {
    var product = {
      Name: productName,
      Price: productPrice,
      Category: productCategory,
      Desc: productDescrption,
    };
    productContainer.push(product);
    localStorage.setItem("productsData", JSON.stringify(productContainer));

    clearform();
    displayProduct();
  } else {
    window.alert("Not valid input");
  }
});

function displayProduct() {
  var temp = ``;
  for (var i = 0; i < productContainer.length; i++) {
    temp +=
      ` <div class="col-md-3 product"><img class="img-fluid" src="./images/laptop.jpg" alt="productImg" />
    <h4>` +
      productContainer[i].Name +
      `<span class="badge badge-warning ml-3 px-3">` +
      productContainer[i].Category +
      `</span></h4>
    <p>` +
      productContainer[i].Desc +
      `</p>
        <div class="price">` +
      productContainer[i].Price +
      `</div>
        <button onclick="deleteProduct(` +
      i +
      `)" class="btn btn-warning my-2 mx-2 float-right" >Delete</button>
        <button onclick="updateProduct(` +
      i +
      `)" class="btn btn-warning my-2 float-right" >Update</button></div>

        `;
  }
  document.getElementById("productRow").innerHTML = temp;
}

const searchProduct = (term) => {
  var temp = ``;
  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].Name.toLowerCase().includes(term.toLowerCase())) {
      temp += ` <div class="col-md-3 product"><img class="img-fluid" src="./images/laptop.jpg" alt="productImg" />
            <h4>``${productContainer[i].Name}``<span class="badge badge-warning ml-3 px-3">``${productContainer[i].Category}``</span></h4>
            <p>``${productContainer[i].Desc}``</p>
                <div class="price">``${productContainer[i].Price}``</div>
                <button onclick="deleteProduct(``${i}``)" class="btn btn-warning my-2 mx-2 float-right" >Delete</button>
                <button onclick="updateProduct(``${i}``)" class="btn btn-warning my-2 float-right" >Update</button></div>
        
                `;
    }
  }
  document.getElementById("productRow").innerHTML = temp;
};

const deleteProduct = (indx) => {
  if (window.confirm("Delete the item?")) {
    var deleted = productContainer.splice(indx, 1);
    localStorage.setItem("productsData", JSON.stringify(productContainer));
    displayProduct();
  }
};

const updateProduct = (indx) => {
  for (i = 0; i < productContainer.length; i++) {
    if (productContainer[i] == productContainer[indx]) {
      document.getElementById("add").innerText = ` Update`;
      document.getElementById("add").addEventListener("click", () => {
        document.getElementById("add").innerText = ` Add Product`;
      });
      document.getElementById("productNameInp").value =
        productContainer[i].Name;
      document.getElementById("productPriceInp").value =
        productContainer[i].Price;
      document.getElementById("productCategoryInp").value =
        productContainer[i].Category;
      document.getElementById("productDescInp").value =
        productContainer[i].Desc;

      var updated = productContainer.splice(i, 1);
    }
  }
};
