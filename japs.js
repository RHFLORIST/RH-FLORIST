// ================
// SHOPPING CART
// ================
let cart = [];

function addToCart(button) {
    const productCard = button.closest('.product-card');
    const id = productCard.dataset.id;
    const name = productCard.dataset.name;
    const price = parseInt(productCard.dataset.price);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    const cartItemList = document.getElementById('cartItemList');
    const emptyCart = document.getElementById('emptyCart');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');

    let total = 0;
    let html = '';

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItemList.innerHTML = '';
    } else {
        emptyCart.style.display = 'none';
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">Rp ${item.price.toLocaleString()}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                            <span class="remove-item" onclick="removeItem('${item.id}')">Hapus</span>
                        </div>
                    </div>
                </div>
            `;
        });
        cartItemList.innerHTML = html;
    }

    cartTotal.textContent = Rp ${total.toLocaleString()};
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(id);
        } else {
            updateCart();
        }
    }
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    cartSidebar.classList.toggle('show');
    overlay.classList.toggle('show');
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda masih kosong.');
        return;
    }
    alert('Terima kasih telah berbelanja di FloraBloom! Total yang harus dibayar: Rp ' + cart.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString());
    cart = [];
    updateCart();
    toggleCart();
}

// Tambahkan event listener ke semua tombol "Tambah ke Keranjang"
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            addToCart(this);
        });
    });

    // Form Kontak
    document.getElementById('contactForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('userName').value;
        alert(Terima kasih, ${name}! Pesan Anda telah terkirim.);
        this.reset();
    });
});

// ================
// CAROUSEL
// ================
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.querySelectorAll('.carousel-slide');
    let dots = document.querySelectorAll('.dot');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000); // Ganti slide setiap 5 detik
}

function currentSlide(n) {
    slideIndex = n;
    showSlides();
}

// ================
// MODAL DETAIL PRODUK
// ================
function showDetail(productId) {
    const product = document.querySelector(.product-card[data-id="${productId}"]);
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);
    const imgSrc = product.querySelector('img').src;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div style="text-align: center;">
            <img src="${imgSrc}" alt="${name}" style="max-width: 100%; border-radius: 15px; margin-bottom: 20px;">
            <h3>${name}</h3>
            <p class="price" style="font-size: 1.5rem; color: #e91e63; font-weight: bold;">Rp ${price.toLocaleString()}</p>
            <p>${product.querySelector('.desc').textContent}</p>
            <button class="btn" style="margin: 10px;" onclick="addToCartFromModal('${productId}')">Tambah ke Keranjang</button>
            <button class="btn" style="background-color: #6c757d;" onclick="closeModal()">Tutup</button>
        </div>
    `;

    document.getElementById('productModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

function addToCartFromModal(productId) {
    const button = document.querySelector(.product-card[data-id="${productId}"] .add-to-cart);
    addToCart(button);
    closeModal();
}

// Tutup modal jika klik di luar konten
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}