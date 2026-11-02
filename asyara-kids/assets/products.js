'use strict';

// ===== DATA PRODUK (single source of truth) =====
const PRODUCTS = [
  {
    id: 1, slug: "kaos-katun-lucu", name: "Kaos Katun Lucu",
    category: "anak", catLabel: "Anak",
    desc: "Katun organik, nyaman dipakai sehari-hari",
    longDesc: "Kaos dengan bahan katun organik pilihan yang lembut dan menyerap keringat. Cocok untuk anak aktif yang sering bermain di luar. Jahitan rapi, tidak mudah melar, dan tersedia dalam berbagai ukuran.",
    price: 65000, emoji: "👕", badge: "Best Seller", rating: 4.9, sold: 128
  },
  {
    id: 2, slug: "dress-bunga-ceria", name: "Dress Bunga Ceria",
    category: "balita", catLabel: "Balita",
    desc: "Motif bunga, bahan adem",
    longDesc: "Dress dengan motif bunga ceria yang disukai anak perempuan. Bahan katun adem, cocok untuk cuaca Indonesia. Dilengkapi resleting di belakang agar mudah dipakai.",
    price: 89000, emoji: "👗", badge: "Baru", rating: 4.8, sold: 76
  },
  {
    id: 3, slug: "setelan-bayi-imut", name: "Setelan Bayi Imut",
    category: "bayi", catLabel: "Bayi",
    desc: "Lembut untuk kulit bayi",
    longDesc: "Setelan bayi 2 in 1 dengan bahan yang sangat lembut, aman untuk kulit sensitif bayi baru lahir. Kancing depan memudahkan orang tua saat mengganti baju.",
    price: 75000, emoji: "🍼", badge: "", rating: 5.0, sold: 203
  },
  {
    id: 4, slug: "celana-pendek-santai", name: "Celana Pendek Santai",
    category: "anak", catLabel: "Anak",
    desc: "Elastis, mudah digerakkan",
    longDesc: "Celana pendek dengan bahan elastis yang nyaman untuk bermain. Pinggang karet sehingga mudah dipakai anak sendiri. Tersedia warna netral yang mudah dipadukan.",
    price: 45000, emoji: "🩳", badge: "", rating: 4.7, sold: 89
  },
  {
    id: 5, slug: "setelan-kemeja-pantai", name: "Setelan Kemeja Pantai",
    category: "setelan", catLabel: "Setelan",
    desc: "Gaya pantai, bahan tipis",
    longDesc: "Setelan kemeja dan celana dengan motif pantai yang stylish. Bahan tipis dan ringan, cocok untuk liburan atau acara santai keluarga. Kemeja bisa dipakai terpisah.",
    price: 120000, emoji: "🌴", badge: "Promo", rating: 4.9, sold: 54
  },
  {
    id: 6, slug: "jumper-bayi-hangat", name: "Jumper Bayi Hangat",
    category: "bayi", catLabel: "Bayi",
    desc: "Bahan wol lembut, hangat",
    longDesc: "Jumper dengan bahan wol campuran yang lembut dan hangat. Cocok untuk bayi saat cuaca dingin atau tidur malam. Tidak membuat gerah karena ada sirkulasi udara.",
    price: 95000, emoji: "🧸", badge: "", rating: 4.8, sold: 67
  },
  {
    id: 7, slug: "rok-tutu-princess", name: "Rok Tutu Princess",
    category: "balita", catLabel: "Balita",
    desc: "Tutu lucu untuk pesta",
    longDesc: "Rok tutu bergaya princess yang menggemaskan. Cocok untuk pesta ulang tahun, foto studio, atau acara spesial. Bahan tulle lembut yang tidak membuat gatal.",
    price: 110000, emoji: "👑", badge: "Favorit", rating: 5.0, sold: 142
  },
  {
    id: 8, slug: "setelan-olahraga-anak", name: "Setelan Olahraga Anak",
    category: "setelan", catLabel: "Setelan",
    desc: "Nyaman untuk bermain",
    longDesc: "Setelan olahraga dengan bahan dry-fit yang menyerap keringat. Cocok untuk anak yang aktif berolahraga atau bermain. Desain sporty dengan warna cerah.",
    price: 99000, emoji: "⚽", badge: "", rating: 4.7, sold: 73
  },
  {
    id: 9, slug: "piyama-bintang", name: "Piyama Bintang",
    category: "balita", catLabel: "Balita",
    desc: "Bahan katun, motif bintang",
    longDesc: "Piyama dengan motif bintang yang lucu. Bahan katun lembut dan nyaman untuk tidur. Tersedia ukuran balita dan anak. Membuat anak tidur lebih nyenyak.",
    price: 78000, emoji: "🌙", badge: "Baru", rating: 4.9, sold: 98
  },
  {
    id: 10, slug: "kaos-polo-anak", name: "Kaos Polo Anak",
    category: "anak", catLabel: "Anak",
    desc: "Rapi untuk acara formal",
    longDesc: "Kaos polo dengan kerah rapi, cocok untuk acara formal atau sekolah. Bahan katun pique yang adem dan tidak mudah kusut. Tersedia warna-warna elegan.",
    price: 85000, emoji: "👔", badge: "", rating: 4.8, sold: 61
  }
];

// Helper: cari produk berdasarkan slug
function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}