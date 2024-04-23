document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
});

function fetchProducts() {
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayProducts(data.categories);
    })
    .catch((error) => console.error("Error fetching products:", error));
}

function displayProducts(categories) {
  if (!Array.isArray(categories)) {
    console.error("Categories data is not an array:", categories);
    return;
  }

  const menProductsContainer = document.getElementById("men-products");
  const womenProductsContainer = document.getElementById("women-products");
  const kidsProductsContainer = document.getElementById("kids-products");

  categories.forEach((category) => {
    if (!Array.isArray(category.category_products)) {
      console.error("Products data is not an array for category:", category);
      return;
    }

    category.category_products.forEach((product) => {
      const productCard = createProductCard(product);
      if (category.category_name === "Men") {
        menProductsContainer.appendChild(productCard);
      } else if (category.category_name === "Women") {
        womenProductsContainer.appendChild(productCard);
      } else if (category.category_name === "Kids") {
        kidsProductsContainer.appendChild(productCard);
      }
    });
  });
}
function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  const image = document.createElement("img");
  image.classList.add("product-image");
  image.src = product.image;
  card.appendChild(image);

  if (product.badge_text) {
    const badge = document.createElement("div");
    badge.classList.add("product-badge", "with-badge");
    badge.innerText = product.badge_text;
    card.appendChild(badge);
  }

  const title = document.createElement("div");
  title.classList.add("product-title");
  title.innerText = product.title;
  card.appendChild(title);

  const vendor = document.createElement("div");
  vendor.classList.add("product-vendor");
  vendor.innerText = product.vendor;
  card.appendChild(vendor);

  const price = document.createElement("div");
  price.classList.add("product-price");
  price.innerText = "Rs." + product.price;
  card.appendChild(price);

  const comparePrice = document.createElement("div");
  comparePrice.classList.add("product-compare-price");
  comparePrice.innerText = "Rs." + product.compare_at_price;
  card.appendChild(comparePrice);

  const discount = document.createElement("div");
  discount.classList.add("product-discount");
  const discountPercent = Math.round(
    ((product.compare_at_price - product.price) / product.compare_at_price) *
      100
  );
  discount.innerText = discountPercent + "% off";
  card.appendChild(discount);

  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("add-to-cart-btn");
  addToCartBtn.innerText = "Add to Cart";
  card.appendChild(addToCartBtn);

  return card;
}

function openTab(tabName) {
  const productContainers = document.querySelectorAll(".product-container");
  productContainers.forEach((container) => {
    if (container.id === tabName + "-products") {
      container.style.display = "flex";
    } else {
      container.style.display = "none";
    }
  });
}
