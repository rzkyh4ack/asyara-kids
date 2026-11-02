'use strict';

// ===== UTIL =====
function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ===== KERANJANG (localStorage) =====
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('asyara_cart') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('asyara_cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === Number(productId));
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id, slug: product.slug, name: product.name,
      price: product.price, emoji: product.emoji, qty: 1
    });
  }
  saveCart(cart);
  renderCartItems();
  showToast(`"${product.name}" masuk keranjang! 🎉`);
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== Number(productId));
  saveCart(cart);
  renderCartItems();
}

function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === Number(productId));
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart(cart);
  renderCartItems();
}

function updateCartCount() {
  const el = document.getElementById('cartCount');
  if (!el) return;
  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  el.textContent = totalQty;
}

function renderCartItems() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  if (!cartItems) return;

  const cart = getCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cartTotal) cartTotal.textContent = formatRupiah(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🧸</div>
        <p>Keranjang masih kosong</p>
        <p style="font-size:0.85rem; margin-top:0.5rem;">Yuk pilih baju lucu untuk si kecil!</p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${escapeHTML(item.emoji)}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${escapeHTML(item.name)}</div>
        <div class="cart-item-price">${formatRupiah(item.price)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${Number(item.id)}, -1)" aria-label="Kurangi">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${Number(item.id)}, 1)" aria-label="Tambah">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${Number(item.id)})" aria-label="Hapus">&times;</button>
    </div>
  `).join('');
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (sidebar) sidebar.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Keranjang masih kosong! 🧸', '#ff7aa8');
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const lines = cart.map(i => `• ${i.name} x${i.qty} = ${formatRupiah(i.price * i.qty)}`);
  const msg = encodeURIComponent(
    `Halo Asyara Kids, saya mau pesan:\n\n${lines.join('\n')}\n\n` +
    `Total item: ${totalQty} pcs\nTotal: ${formatRupiah(total)}\n\n` +
    `Nama: \nAlamat: \n\nTerima kasih! 🧸`
  );
  window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank', 'noopener,noreferrer');
}

// ===== TOAST =====
let toastTimer;
function showToast(msg, color = '#5fd3c4') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.style.background = color;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== HIASAN BACKGROUND =====
function spawnDoodles() {
  const container = document.getElementById('bgDoodles');
  if (!container) return;
  const emojis = ['🧸', '🐻', '🐰', '🦄', '⭐', '🌈', '🎀', '🍭', '🌸', '🐣', '🍬', '☁️', '💖', '🧁'];
  let html = '';
  for (let i = 0; i < 22; i++) {
    const e = emojis[Math.floor(Math.random() * emojis.length)];
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = 1 + Math.random() * 1.6;
    const delay = Math.random() * 4;
    const dur = 5 + Math.random() * 5;
    html += `<span class="doodle" style="top:${top}%;left:${left}%;font-size:${size}rem;animation-delay:${delay}s;animation-duration:${dur}s;">${e}</span>`;
  }
  container.innerHTML = html;
}

// ===== RENDER KARTU PRODUK (dipakai banyak halaman) =====
function productCardHTML(p, basePath) {
  const base = basePath || '';
  return `
    <div class="product-card">
      <a href="${base}produk/${p.slug}.html" style="text-decoration:none; color:inherit;">
        <div class="product-img">
          ${p.emoji}
          ${p.badge ? `<span class="product-badge">${escapeHTML(p.badge)}</span>` : ''}
        </div>
        <div class="product-info">
          <div class="product-category">${escapeHTML(p.catLabel)}</div>
          <div class="product-name">${escapeHTML(p.name)}</div>
          <div class="product-desc">${escapeHTML(p.desc)}</div>
        </div>
      </a>
      <div class="product-info" style="padding-top:0;">
        <div class="product-bottom">
          <div class="product-price">${formatRupiah(p.price)}</div>
          <button class="add-to-cart" onclick="addToCart(${p.id})">+ Keranjang</button>
        </div>
      </div>
    </div>
  `;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  spawnDoodles();
  updateCartCount();
  renderCartItems();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});