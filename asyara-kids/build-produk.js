// build-produk.js
// Jalankan: node build-produk.js
// Hasil: folder produk/ berisi 10 file HTML siap pakai.

const fs = require('fs');
const path = require('path');

const DOMAIN = '[GANTI:domainanda.com]'; // ganti nanti sebelum upload
const WA_NUMBER = '6281234567890';

const PRODUCTS = [
  { id: 1, slug: "kaos-katun-lucu", name: "Kaos Katun Lucu", catLabel: "Anak", emoji: "👕", price: 65000, sku: "AK-001", rating: "4.9", sold: 128, desc: "Kaos katun organik, nyaman dipakai sehari-hari.", longDesc: "Kaos dengan bahan katun organik pilihan yang lembut dan menyerap keringat. Cocok untuk anak aktif yang sering bermain di luar. Jahitan rapi, tidak mudah melar, dan tersedia dalam berbagai ukuran." },
  { id: 2, slug: "dress-bunga-ceria", name: "Dress Bunga Ceria", catLabel: "Balita", emoji: "👗", price: 89000, sku: "AK-002", rating: "4.8", sold: 76, desc: "Motif bunga, bahan adem.", longDesc: "Dress dengan motif bunga ceria yang disukai anak perempuan. Bahan katun adem, cocok untuk cuaca Indonesia. Dilengkapi resleting di belakang agar mudah dipakai." },
  { id: 3, slug: "setelan-bayi-imut", name: "Setelan Bayi Imut", catLabel: "Bayi", emoji: "🍼", price: 75000, sku: "AK-003", rating: "5.0", sold: 203, desc: "Lembut untuk kulit bayi.", longDesc: "Setelan bayi 2 in 1 dengan bahan yang sangat lembut, aman untuk kulit sensitif bayi baru lahir. Kancing depan memudahkan orang tua saat mengganti baju." },
  { id: 4, slug: "celana-pendek-santai", name: "Celana Pendek Santai", catLabel: "Anak", emoji: "🩳", price: 45000, sku: "AK-004", rating: "4.7", sold: 89, desc: "Elastis, mudah digerakkan.", longDesc: "Celana pendek dengan bahan elastis yang nyaman untuk bermain. Pinggang karet sehingga mudah dipakai anak sendiri. Tersedia warna netral yang mudah dipadukan." },
  { id: 5, slug: "setelan-kemeja-pantai", name: "Setelan Kemeja Pantai", catLabel: "Setelan", emoji: "🌴", price: 120000, sku: "AK-005", rating: "4.9", sold: 54, desc: "Gaya pantai, bahan tipis.", longDesc: "Setelan kemeja dan celana dengan motif pantai yang stylish. Bahan tipis dan ringan, cocok untuk liburan atau acara santai keluarga. Kemeja bisa dipakai terpisah." },
  { id: 6, slug: "jumper-bayi-hangat", name: "Jumper Bayi Hangat", catLabel: "Bayi", emoji: "🧸", price: 95000, sku: "AK-006", rating: "4.8", sold: 67, desc: "Bahan wol lembut, hangat.", longDesc: "Jumper dengan bahan wol campuran yang lembut dan hangat. Cocok untuk bayi saat cuaca dingin atau tidur malam. Tidak membuat gerah karena ada sirkulasi udara." },
  { id: 7, slug: "rok-tutu-princess", name: "Rok Tutu Princess", catLabel: "Balita", emoji: "👑", price: 110000, sku: "AK-007", rating: "5.0", sold: 142, desc: "Tutu lucu untuk pesta.", longDesc: "Rok tutu bergaya princess yang menggemaskan. Cocok untuk pesta ulang tahun, foto studio, atau acara spesial. Bahan tulle lembut yang tidak membuat gatal." },
  { id: 8, slug: "setelan-olahraga-anak", name: "Setelan Olahraga Anak", catLabel: "Setelan", emoji: "⚽", price: 99000, sku: "AK-008", rating: "4.7", sold: 73, desc: "Nyaman untuk bermain.", longDesc: "Setelan olahraga dengan bahan dry-fit yang menyerap keringat. Cocok untuk anak yang aktif berolahraga atau bermain. Desain sporty dengan warna cerah." },
  { id: 9, slug: "piyama-bintang", name: "Piyama Bintang", catLabel: "Balita", emoji: "🌙", price: 78000, sku: "AK-009", rating: "4.9", sold: 98, desc: "Bahan katun, motif bintang.", longDesc: "Piyama dengan motif bintang yang lucu. Bahan katun lembut dan nyaman untuk tidur. Tersedia ukuran balita dan anak. Membuat anak tidur lebih nyenyak." },
  { id: 10, slug: "kaos-polo-anak", name: "Kaos Polo Anak", catLabel: "Anak", emoji: "👔", price: 85000, sku: "AK-010", rating: "4.8", sold: 61, desc: "Rapi untuk acara formal.", longDesc: "Kaos polo dengan kerah rapi, cocok untuk acara formal atau sekolah. Bahan katun pique yang adem dan tidak mudah kusut. Tersedia warna-warna elegan." }
];

const tpl = (p) => `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.name} - ${p.catLabel} | Asyara Kids</title>
  <meta name="description" content="${p.desc} Harga Rp${p.price.toLocaleString('id-ID')}. Gratis ongkir & garansi tukar 7 hari di Asyara Kids.">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="https://${DOMAIN}/produk/${p.slug}.html">
  <meta property="og:type" content="product">
  <meta property="og:site_name" content="Asyara Kids">
  <meta property="og:title" content="${p.name} - Asyara Kids">
  <meta property="og:description" content="${p.desc} Rp${p.price.toLocaleString('id-ID')}.">
  <meta property="og:url" content="https://${DOMAIN}/produk/${p.slug}.html">
  <meta property="og:image" content="https://${DOMAIN}/assets/produk/${p.slug}.jpg">
  <meta property="product:price:amount" content="${p.price}">
  <meta property="product:price:currency" content="IDR">
  <link rel="icon" type="image/png" href="../assets/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;800&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${p.name}",
    "image": "https://${DOMAIN}/assets/produk/${p.slug}.jpg",
    "description": "${p.longDesc}",
    "sku": "${p.sku}",
    "brand": {"@type": "Brand", "name": "Asyara Kids"},
    "offers": {
      "@type": "Offer",
      "url": "https://${DOMAIN}/produk/${p.slug}.html",
      "priceCurrency": "IDR",
      "price": "${p.price}",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "${p.rating}",
      "reviewCount": "${p.sold}"
    }
  }
  </script>
</head>
<body>

  <div class="bg-doodles" id="bgDoodles" aria-hidden="true"></div>

  <header>
    <nav aria-label="Navigasi utama">
      <a href="../index.html" class="logo"><span class="bear">🧸</span> Asyara<span>Kids</span></a>
      <ul class="nav-links">
        <li><a href="../index.html">Home</a></li>
        <li><a href="../katalog.html">Katalog</a></li>
        <li><a href="../tentang.html">Tentang</a></li>
        <li><a href="../kontak.html">Kontak</a></li>
      </ul>
      <form class="nav-search" onsubmit="event.preventDefault(); window.location.href='../cari.html?q=' + encodeURIComponent(this.q.value);">
        <input type="text" name="q" placeholder="Cari baju..." aria-label="Cari produk">
        <button type="submit" aria-label="Cari">🔍</button>
      </form>
      <button class="cart-btn" onclick="toggleCart()" aria-label="Buka keranjang belanja">
        🛒 Keranjang <span class="cart-count" id="cartCount">0</span>
      </button>
    </nav>
  </header>

  <main class="detail-wrap">
    <div class="breadcrumb">
      <a href="../index.html">Home</a> › <a href="../katalog.html">Katalog</a> › <span>${p.name}</span>
    </div>

    <div class="product-detail">
      <div class="product-detail-img" aria-label="Foto produk">${p.emoji}</div>
      <div class="product-detail-info">
        <div class="product-detail-cat">${p.catLabel}</div>
        <h1>${p.name}</h1>
        <div class="product-detail-rating">★★★★★ <span>(${p.rating} · ${p.sold} terjual)</span></div>
        <div class="product-detail-price">Rp ${p.price.toLocaleString('id-ID')}</div>
        <p class="product-detail-desc">${p.longDesc}</p>
        <div class="product-detail-actions">
          <button class="btn-primary" onclick="addToCart(${p.id})">+ Tambah ke Keranjang</button>
          <a class="btn-secondary" href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo, saya mau tanya ' + p.name)}" target="_blank" rel="noopener noreferrer">💬 Tanya via WA</a>
        </div>
      </div>
    </div>

    <section class="related-section">
      <h2>Produk Lainnya 🎀</h2>
      <div class="products" id="relatedGrid"></div>
    </section>
  </main>

  <footer>
    <div class="footer-content">
      <div class="footer-col">
        <h3>🧸 Asyara Kids</h3>
        <p>Toko baju anak rumahan dengan koleksi lucu, bahan pilihan, dan sentuhan kasih di setiap jahitan.</p>
      </div>
      <div class="footer-col">
        <h3>Menu</h3>
        <a href="../index.html">Home</a>
        <a href="../katalog.html">Katalog</a>
        <a href="../tentang.html">Tentang</a>
        <a href="../kontak.html">Kontak</a>
      </div>
      <div class="footer-col">
        <h3>Layanan</h3>
        <a href="../cara-pemesanan.html">Cara Pemesanan</a>
        <a href="../kebijakan-retur.html">Kebijakan Retur</a>
      </div>
      <div class="footer-col">
        <h3>Ikuti Kami</h3>
        <a href="https://instagram.com/asyarakids" rel="noopener noreferrer" target="_blank">📷 Instagram</a>
        <a href="https://facebook.com/asyarakids" rel="noopener noreferrer" target="_blank">📘 Facebook</a>
        <a href="https://tiktok.com/@asyarakids" rel="noopener noreferrer" target="_blank">🎵 TikTok</a>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2025 Asyara Kids. Dibuat dengan <span class="heart">♥</span> untuk si kecil.
    </div>
  </footer>

  <div class="cart-overlay" id="cartOverlay" onclick="toggleCart()"></div>
  <aside class="cart-sidebar" id="cartSidebar" aria-label="Keranjang belanja">
    <div class="cart-header">
      <h2>🛒 Keranjang Belanja</h2>
      <button class="close-cart" onclick="toggleCart()" aria-label="Tutup">&times;</button>
    </div>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-footer">
      <div class="cart-total"><span>Total:</span><span id="cartTotal">Rp 0</span></div>
      <button class="checkout-btn" onclick="checkout()">Checkout via WhatsApp 🎁</button>
    </div>
  </aside>

  <div class="toast" id="toast" role="status" aria-live="polite"></div>

  <script src="../assets/products.js"></script>
  <script src="../assets/script.js"></script>
  <script>
    const currentSlug = "${p.slug}";
    document.addEventListener('DOMContentLoaded', () => {
      const related = PRODUCTS.filter(x => x.slug !== currentSlug).slice(0, 4);
      document.getElementById('relatedGrid').innerHTML =
        related.map(x => productCardHTML(x, '../')).join('');
    });
  </script>
</body>
</html>
`;

// ===== GENERATE =====
const outDir = path.join(__dirname, 'produk');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

PRODUCTS.forEach(p => {
  const file = path.join(outDir, `${p.slug}.html`);
  fs.writeFileSync(file, tpl(p), 'utf8');
  console.log('✅', file);
});

console.log(`\nSelesai! ${PRODUCTS.length} file produk dibuat di folder produk/.`);