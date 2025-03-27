import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const getProducts = async () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => {
          resolve(response.data);
          iziToast.info({
            title: "Data:",
            message: response.data.length + " products loaded.",
            position: "topRight",
            timeout: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
          iziToast.error({
            title: "axios - Error",
            message: error.message,
            position: "topRight",
            timeout: 3000,
          });
        });
    } catch (error) {
      iziToast.error({
        title: "getProducts - Error",
        message: error.message,
        position: "topRight",
        timeout: 3000,
      });
    }
  });
};

const productTabs = document.querySelector("#productTabs");
const getProductListGroup = (productList) => {
  try {
    let productsCategory = productList
      .map((product) => product.category)
      .flat();

    const categories = [];
    productsCategory.forEach((category) => {
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });

    return categories;
  } catch (error) {
    iziToast.error({
      title: "getProductListGroup - Error",
      message: error.message,
      position: "topRight",
      timeout: 3000,
    });
  }
};
const addProductToUI = (product) => {
  let category = product.category.replace("'", "-").replace(" ", "-");

  document.querySelector(`#product-group_${category}_list`).innerHTML += `
    <div class="product" id="${product.title}-${product.id}">
        <img src="${product.image}" alt="${product.title}" width="150" />
        <div class="product-info">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <div class="product-footer">
                <p><b>Fiyat:</b> ${product.price} TL</p>
                <button onclick="addToCart(${product.title}, ${product.price})">Sepete Ekle</button>
            </div>
        </div>
      </div>
    `;
};

document.addEventListener("DOMContentLoaded", async () => {
  const productList = await getProducts();
  let productListGroup = [];
  productListGroup = getProductListGroup(productList);

  productListGroup.forEach((category) => {
    category = category.replace("'", "-").replace(" ", "-");
    productTabs.innerHTML += `<div class="product-group" id="product-group_${category}">
        <h2 style="text-transform: capitalize;">${category}</h2>
        <div class="product-list" id="product-group_${category}_list"></div>
    </div>`;
  });

  console.log(productListGroup);
  productList.forEach((product) => {
    addProductToUI(product);
  });
});
