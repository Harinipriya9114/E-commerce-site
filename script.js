
const products = [
    {
      id: 1,
      name: "Denim Jacket",
      price: 1999,
      image: "image/denim-jacket.jpg",
      description: "Stylish and rugged denim jacket for all seasons."
    },
    {
      id: 2,
      name: "Floral Dress",
      price: 1499,
      image: "image/floral.jpg",
      description: "Beautiful floral summer dress with a light fabric."
    },
    {
      id: 3,
      name: "Sports Shoes",
      price: 2999,
      image: "image/shoes.jpg",
      description: "Comfortable running shoes with great grip."
    },
    {
      id: 4,
      name: "Leather Bag",
      price: 2399,
      image: "image/leatherbag.jpg",
      description: "Premium leather handbag with multiple compartments."
    },
    {
      id: 5,
      name: "Casual Shirt",
      price: 1099,
      image: "image/causalshirt-jpg.avif",
      description: "Cotton shirt perfect for casual or semi-formal wear."
    },
    {
      id: 6,
      name: "Sunglasses",
      price: 799,
      image: "image/sun-glass.jpg",
      description: "UV-protected stylish sunglasses for all ages."
    }
  ];
  
  let cart = {};
  let currentProductId = null;
  
  function loadProducts(productArray) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear before adding
    productArray.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.image}" onclick="openModal(${product.id})" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(div);
    });
  }
  
  function addToCart(productId) {
    if (!cart[productId]) {
      cart[productId] = 1;
    } else {
      cart[productId]++;
    }
    updateCartCount();
    alert("Added to cart!");
  }
  
  function updateCartCount() {
    let total = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    document.getElementById("cart-count").textContent = total;
  }
  
  function openModal(productId) {
    const product = products.find(p => p.id === productId);
    currentProductId = productId;
    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-title").textContent = product.name;
    document.getElementById("modal-price").textContent = "₹" + product.price;
    document.getElementById("modal-description").textContent = product.description;
    document.getElementById("product-modal").style.display = "block";
  }
  
  function closeModal() {
    document.getElementById("product-modal").style.display = "none";
  }
  
  document.getElementById("modal-cart-btn").onclick = function () {
    if (currentProductId !== null) {
      addToCart(currentProductId);
      closeModal();
    }
  };
  
  // Search functionality
  document.getElementById("search").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
    loadProducts(filtered);
  });
  
  window.onload = () => {
    loadProducts(products);
  };