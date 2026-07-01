// --- API Configuration flow from URL ---
let API_URL = "";
const urlParams = new URLSearchParams(window.location.search);
let paramApi = urlParams.get('api');
if (paramApi) {
  localStorage.setItem('sombat_api_url', paramApi);
  API_URL = paramApi;
  // Clean query string from browser bar
  window.history.replaceState({}, document.title, window.location.pathname);
} else {
  API_URL = localStorage.getItem('sombat_api_url') || "";
}

let products = [];
let cart = [];

// Default Mock Data from catalog pages 14-18
const mockProducts = [
  { ID: "SA001", Category: "กระดาษ", Name: "กระดาษ Double A A4 80g (40 แผ่น)", Description: "ขนาด A4 80 แกรม บรรจุ 40 แผ่น เหมาะสำหรับการใช้งานทั่วไป", Price: 25, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAA001", Category: "กระดาษ", Name: "กระดาษ Double A A4 80g (1 รีม)", Description: "ขนาด A4 80 แกรม บรรจุ 500 แผ่น/รีม คุณภาพสูง เขียนและพิมพ์คมชัด", Price: 125, Unit: "รีม", Stock: 50, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAB001", Category: "กระดาษ", Name: "กระดาษ Double A A4 80g (1 ลัง)", Description: "ขนาด A4 80 แกรม บรรจุ 5 รีม/ลัง ราคาประหยัดคุค่า", Price: 600, Unit: "ลัง", Stock: 10, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA002", Category: "กระดาษ", Name: "กระดาษถ่ายเอกสาร A4 100g (200 แผ่น)", Description: "ขนาด A4 หนาพิเศษ 100 แกรม เหมาะสำหรับปกรายงานหรืองานพิมพ์เน้นคุณภาพ", Price: 105, Unit: "แพ็ค", Stock: 30, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA003", Category: "กระดาษ", Name: "กระดาษ Idea Work A4 80g (40 แผ่น)", Description: "ขนาด A4 80 แกรม บรรจุ 40 แผ่น เนื้อกระดาษขาวสว่าง คุ้มค่าราคาประหยัด", Price: 20, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAA003", Category: "กระดาษ", Name: "กระดาษ Idea Work A4 80g (1 รีม)", Description: "ขนาด A4 80 แกรม บรรจุ 500 แผ่น/รีม รองรับการพิมพ์สองหน้า คุ้มค่าระยะยาว", Price: 120, Unit: "รีม", Stock: 40, ImageURL: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA004", Category: "กระดาษ", Name: "กระดาษ Double A F14 80g (1 รีม)", Description: "ขนาด F14 (216x356 มม.) 80 แกรม บรรจุ 500 แผ่น/รีม เหมาะสำหรับเอกสารราชการ", Price: 175, Unit: "รีม", Stock: 20, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA007", Category: "กระดาษ", Name: "กระดาษ Alcott A4 70g (1 รีม)", Description: "ขนาด A4 70 แกรม ถ่ายเอกสารได้ 2 หน้า บรรจุ 500 แผ่น/รีม เนื้อขาวสวย", Price: 90, Unit: "รีม", Stock: 50, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA008", Category: "กระดาษ", Name: "กระดาษ Alcott A4 80g (1 รีม)", Description: "ขนาด A4 80 แกรม บรรจุ 500 แผ่น/รีม กระดาษเนื้อหนาขึ้นอีกระดับ", Price: 100, Unit: "รีม", Stock: 50, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA011", Category: "กระดาษ", Name: "กระดาษ Supreme A4 70g (1 รีม)", Description: "ขนาด A4 70 แกรม ผลิตจากป่าปลูก 100% บรรจุ 500 แผ่น/รีม คมชัดทนทาน", Price: 90, Unit: "รีม", Stock: 55, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA012", Category: "กระดาษ", Name: "พลาสติกแผ่นใส A4 150g (100 แผ่น)", Description: "สำหรับทำปกรายงาน หรือ คั่นแยกหมวดหมู่เอกสาร แข็งแรงทนทาน กันน้ำได้ดี", Price: 150, Unit: "แพ็ค", Stock: 30, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA014", Category: "กระดาษ", Name: "กระดาษโฟโต้ PHOTO PAPER A4 120g (100 แผ่น)", Description: "กระดาษอิงค์เจ็ทคุณภาพสูง ผิวมันวาว กันน้ำได้ดี สีสันสดใสสมจริง", Price: 180, Unit: "แพ็ค", Stock: 25, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  
  // Services
  { ID: "SERV001", Category: "งานบริการ", Name: "บริการล้างแอร์ติดผนัง", Description: "ทำความสะอาดแอร์ติดผนังบ้านทั่วไป กำจัดฝุ่น เชื้อรา เพิ่มลมเย็นและประหยัดไฟ", Price: 500, Unit: "ตัว", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=300" },
  { ID: "SERV002", Category: "งานบริการ", Name: "บริการล้างแอร์แขวน", Description: "ทำความสะอาดแอร์แขวนใต้ฝ้าเพดานสำหรับสำนักงาน ร้านค้า หรือโชว์รูม", Price: 1300, Unit: "ตัว", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=300" },
  { ID: "SOLAR001", Category: "งานบริการ", Name: "ติดตั้งระบบ Solar Cell 3.0 kW", Description: "ประหยัดไฟ 1,500-1,800 บาท/เดือน ฟรีค่าสำรวจหน้างาน รับประกันแผง 25 ปี อินเวอร์เตอร์ 10 ปี", Price: 110000, Unit: "ชุด", Stock: 99, ImageURL: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300" },
  { ID: "BIND001", Category: "งานบริการ", Name: "เข้าเล่ม สันกาว", Description: "บริการเข้าเล่มไสกาวแบบหนังสือ ทนทาน สวยงาม เริ่มต้น 70 บาท", Price: 70, Unit: "เล่ม", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" },
  { ID: "SIGN001", Category: "งานบริการ", Name: "งานป้ายไวนิล (ตามขนาดสั่งทำ)", Description: "ป้ายไวนิลทนทาน สีสันสดใส ออกแบบฟรี บริการประเมินราคาตามพื้นที่ตารางเมตร", Price: 0, Unit: "ตร.ม.", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300" }
];

const productsGrid = document.getElementById('products-grid');
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const sortBox = document.getElementById('sort-box');
const categoriesList = document.getElementById('categories-list');

const cartDrawer = document.getElementById('cart-drawer');
const cartTrigger = document.getElementById('cart-trigger');
const cartClose = document.getElementById('cart-close');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalVal = document.getElementById('cart-total-val');
const cartBadge = document.getElementById('cart-badge');
const checkoutBtn = document.getElementById('checkout-btn');

const checkoutModal = document.getElementById('checkout-modal');
const checkoutClose = document.getElementById('checkout-close');
const checkoutCancel = document.getElementById('checkout-cancel');
const orderForm = document.getElementById('order-form');
const checkoutTotalVal = document.getElementById('checkout-total-val');

const quoteModal = document.getElementById('quote-modal');
const quoteClose = document.getElementById('quote-close');
const quoteCancelBtn = document.getElementById('quote-cancel-btn');
const quoteForm = document.getElementById('quote-form');
const quoteServiceType = document.getElementById('quote-service-type');
const quoteDisplayCategory = document.getElementById('quote-display-category');
const quoteModalTitle = document.getElementById('quote-modal-title');
const quoteOptionsContainer = document.getElementById('quote-options-container');

window.addEventListener('DOMContentLoaded', () => {
  if (!API_URL) {
    showToast("⚠️ ระบบรันด้วยข้อมูลจำลอง (ยังไม่ได้เชื่อมต่อ Google Sheets)", "warning");
    products = [...mockProducts];
    renderProducts(products);
  } else {
    fetchProducts();
  }
  updateCartUI();
});

function showToast(message, type = "success") {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="bx ${type === 'success' ? 'bx-check-circle' : type === 'error' ? 'bx-error-circle' : 'bx-info-circle'}"></i> ${message}`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "toast-slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

async function fetchProducts() {
  if (!API_URL) return;
  
  productsGrid.innerHTML = `
    <div class="product-card skeleton-loader" style="height: 280px;"></div>
    <div class="product-card skeleton-loader" style="height: 280px;"></div>
    <div class="product-card skeleton-loader" style="height: 280px;"></div>
    <div class="product-card skeleton-loader" style="height: 280px;"></div>
    <div class="product-card skeleton-loader" style="height: 280px;"></div>
    <div class="product-card skeleton-loader" style="height: 280px;"></div>
  `;
  
  try {
    const response = await fetch(`${API_URL}?action=getProducts`);
    const json = await response.json();
    if (json.success) {
      products = json.data;
      renderProducts(products);
      showToast("⚡ ดึงข้อมูลสินค้าจาก Google Sheets สำเร็จ");
    } else {
      showToast(`❌ ดึงข้อมูลล้มเหลว: ${json.message}`, "error");
      useMockDataFallback();
    }
  } catch (err) {
    console.error(err);
    showToast("❌ การเชื่อมต่อ API ผิดพลาด กำลังใช้ข้อมูลจำลองแทน", "error");
    useMockDataFallback();
  }
}

function useMockDataFallback() {
  products = [...mockProducts];
  renderProducts(products);
}

function renderProducts(items) {
  if (items.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-muted);">
        <i class="bx bx-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
        <p style="font-size: 1rem; font-weight: 500;">ไม่พบสินค้าหรือบริการที่ท่านต้องการ</p>
        <p style="font-size: 0.8rem;">ลองเปลี่ยนคำค้นหา หรือรีเซ็ตตัวกรอง</p>
      </div>
    `;
    return;
  }
  
  productsGrid.innerHTML = "";
  items.forEach(prod => {
    const isService = prod.Category === "งานบริการ";
    const isPriceZero = Number(prod.Price) === 0;
    const priceText = isPriceZero ? "ขอเสนอราคา" : `${prod.Price}.-`;
    
    const card = document.createElement('div');
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-tag ${isService ? 'service' : ''}">${isService ? 'งานบริการ' : 'สินค้า'}</div>
      <div class="product-img-wrapper" onclick="handleAddToCartClick('${prod.ID}')">
        <img src="${prod.ImageURL || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=300'}" alt="${prod.Name}">
      </div>
      <div class="product-body" onclick="handleAddToCartClick('${prod.ID}')">
        <h4 class="product-title">${prod.Name}</h4>
        <div class="product-footer">
          <div class="product-price-wrapper">
            <span class="product-price">${priceText}</span>
            ${isPriceZero ? '' : `<span class="product-unit">/ ${prod.Unit}</span>`}
          </div>
          <button class="product-btn" onclick="event.stopPropagation(); handleAddToCartClick('${prod.ID}')">
            <i class="bx ${isService || isPriceZero ? 'bx-message-detail' : 'bx-cart-add'}"></i>
          </button>
        </div>
        <div class="product-location">นนทบุรี</div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// --- Fuzzy & Multi-Keyword Matching Search ---
function filterProducts() {
  const activeTab = categoriesList.querySelector('.category-item.active');
  const category = activeTab ? activeTab.dataset.category : 'all';
  const searchQuery = searchBox.value.toLowerCase().trim();
  const sortBy = sortBox.value;
  
  let filtered = [...products];
  
  if (category !== 'all') {
    filtered = filtered.filter(p => p.Category === category);
  }
  
  if (searchQuery) {
    // Split by spaces into individual keywords
    const keywords = searchQuery.split(/\s+/).filter(k => k.length > 0);
    
    filtered = filtered.filter(p => {
      // Combined fields to search against
      const searchTarget = `${p.ID} ${p.Name} ${p.Category} ${p.Description || ""}`.toLowerCase();
      // Every keyword must be matched somewhere in the target string
      return keywords.every(kw => searchTarget.includes(kw));
    });
  }
  
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => Number(a.Price) - Number(b.Price));
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => Number(b.Price) - Number(a.Price));
  }
  
  renderProducts(filtered);
}

searchBox.addEventListener('input', () => {
  // Reset active category tab to "all" when searching
  categoriesList.querySelectorAll('.category-item').forEach(t => t.classList.remove('active'));
  const allTab = categoriesList.querySelector('[data-category="all"]');
  if (allTab) allTab.classList.add('active');
  filterProducts();
});
searchBtn.addEventListener('click', () => {
  // Reset active category tab to "all" when searching
  categoriesList.querySelectorAll('.category-item').forEach(t => t.classList.remove('active'));
  const allTab = categoriesList.querySelector('[data-category="all"]');
  if (allTab) allTab.classList.add('active');
  filterProducts();
});
sortBox.addEventListener('change', filterProducts);

categoriesList.addEventListener('click', (e) => {
  const tab = e.target.closest('.category-item');
  if (!tab) return;
  
  categoriesList.querySelectorAll('.category-item').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  
  filterProducts();
});

function scrollToCategory(catName) {
  const tabs = categoriesList.querySelectorAll('.category-item');
  tabs.forEach(t => {
    if (t.dataset.category === catName) {
      t.click();
      t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });
}

function handleAddToCartClick(id) {
  const prod = products.find(p => p.ID === id);
  if (!prod) return;
  
  const isService = prod.Category === "งานบริการ";
  const isPriceZero = Number(prod.Price) === 0;
  
  if (isService || isPriceZero) {
    openQuoteModal(prod.Name, prod.Category, prod.ID);
  } else {
    addToCart(prod);
  }
}

function addToCart(prod) {
  const existing = cart.find(item => item.id === prod.ID);
  
  if (existing) {
    if (existing.qty < prod.Stock) {
      existing.qty++;
      showToast(`เพิ่ม ${prod.Name} เรียบร้อย`);
    } else {
      showToast("❌ สินค้าในสต็อกไม่เพียงพอ", "error");
    }
  } else {
    cart.push({
      id: prod.ID,
      name: prod.Name,
      price: Number(prod.Price),
      unit: prod.Unit,
      image: prod.ImageURL,
      qty: 1
    });
    showToast(`เพิ่ม ${prod.Name} ลงในตะกร้า`);
  }
  updateCartUI();
}

function updateCartUI() {
  cartBadge.textContent = cart.reduce((total, item) => total + item.qty, 0);
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="bx bx-shopping-bag" style="font-size: 3rem;"></i>
        <p>ไม่มีสินค้าในตะกร้าของคุณ</p>
      </div>
    `;
    cartTotalVal.textContent = "0 บาท";
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = "0.5";
    return;
  }
  
  checkoutBtn.disabled = false;
  checkoutBtn.style.opacity = "1";
  
  cartItemsContainer.innerHTML = "";
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    
    const row = document.createElement('div');
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.image || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=30'}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">${itemTotal.toLocaleString()} บาท</div>
        <div class="cart-item-control">
          <span class="cart-qty-btn" onclick="changeQty('${item.id}', -1)">-</span>
          <span class="cart-qty-val">${item.qty}</span>
          <span class="cart-qty-btn" onclick="changeQty('${item.id}', 1)">+</span>
          <button class="cart-item-remove" onclick="changeQty('${item.id}', -9999)"><i class="bx bx-trash"></i> ลบ</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(row);
  });
  
  cartTotalVal.textContent = `${total.toLocaleString()} บาท`;
}

window.changeQty = (id, delta) => {
  const index = cart.findIndex(item => item.id === id);
  if (index === -1) return;
  
  const prod = products.find(p => p.ID === id);
  
  if (delta === -9999) {
    cart.splice(index, 1);
  } else {
    cart[index].qty += delta;
    
    if (prod && cart[index].qty > prod.Stock && Number(prod.Stock) !== 999) {
      cart[index].qty = prod.Stock;
      showToast("❌ ขออภัย สินค้าในสต็อกมีจำกัด", "error");
    }
    
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }
  updateCartUI();
};

cartTrigger.addEventListener('click', () => cartDrawer.classList.add('active'));
cartClose.addEventListener('click', () => cartDrawer.classList.remove('active'));

// --- CHECKOUT MODAL ---
checkoutBtn.addEventListener('click', () => {
  cartDrawer.classList.remove('active');
  checkoutModal.classList.add('active');
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  checkoutTotalVal.textContent = `${total.toLocaleString()} บาท`;
});

const closeCheckout = () => checkoutModal.classList.remove('active');
checkoutClose.addEventListener('click', closeCheckout);
checkoutCancel.addEventListener('click', closeCheckout);

// Place Order
orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const customerName = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const email = document.getElementById('cust-email').value.trim();
  const address = document.getElementById('cust-address').value.trim();
  const notes = document.getElementById('order-notes').value.trim();
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  const orderPayload = {
    action: "createOrder",
    customerName,
    phone,
    email,
    address,
    notes,
    totalPrice,
    items: cart
  };
  
  const submitBtn = document.getElementById('submit-order-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = "กำลังส่งคำสั่งซื้อ... <i class='bx bx-loader-alt bx-spin'></i>";
  
  if (API_URL) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(orderPayload),
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      
      if (json.success) {
        showToast(`🛒 สั่งซื้อเรียบร้อย! หมายเลขออเดอร์: ${json.orderId}`);
        cart = [];
        updateCartUI();
        closeCheckout();
      } else {
        showToast(`❌ สั่งซื้อผิดพลาด: ${json.message}`, "error");
      }
    } catch (err) {
      console.error(err);
      showToast("❌ การเชื่อมต่อล้มเหลว กรุณาตรวจสอบสิทธิ์การแชร์ของชีตและตั้งค่า API", "error");
    }
  } else {
    showToast(`🛒 สั่งสำเร็จ (ระบบ Offline Mock)! หมายเลข: ORD-${new Date().getTime().toString().substring(6, 12)}`);
    cart = [];
    updateCartUI();
    closeCheckout();
  }
  
  submitBtn.disabled = false;
  submitBtn.innerHTML = "ยืนยันคำสั่งซื้อ <i class='bx bx-check-double'></i>";
});

// --- QUOTE / SERVICE MODAL ---
function openQuoteModal(name, category = "งานบริการ", id = "") {
  quoteServiceType.value = id;
  quoteDisplayCategory.value = category;
  quoteModalTitle.innerHTML = `<i class='bx bx-message-square-detail'></i> ขอข้อมูล/ใบเสนอราคา: ${name}`;
  
  quoteOptionsContainer.innerHTML = "";
  
  if (name.includes("Solar Cell")) {
    quoteOptionsContainer.innerHTML = `
      <label class="form-label">เลือกแพ็คเกจ Solar Cell ที่สนใจ *</label>
      <select class="form-input" id="quote-opt-solar" required>
        <option value="3.0 kW (ประหยัดค่าไฟ 1,500-1,800.-/เดือน)">3.0 kW (ประหยัดค่าไฟ 1,500-1,800.-/เดือน)</option>
        <option value="5.0 kW Single Phase (ประหยัดค่าไฟ 3,500.-/เดือน)">5.0 kW Single Phase (ประหยัดค่าไฟ 3,500.-/เดือน)</option>
        <option value="5.0 kW 3 Phase (ประหยัดค่าไฟ 3,500.-/เดือน)">5.0 kW 3 Phase (ประหยัดค่าไฟ 3,500.-/เดือน)</option>
        <option value="10.0 kW (ประหยัดค่าไฟ 6,000.-/เดือน)">10.0 kW (ประหยัดค่าไฟ 6,000.-/เดือน)</option>
      </select>
    `;
  } else if (name.includes("แอร์")) {
    quoteOptionsContainer.innerHTML = `
      <div class="form-row">
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">ประเภทแอร์ *</label>
          <select class="form-input" id="quote-opt-ac-type" required>
            <option value="ติดผนัง">ติดผนัง (ค่าบริการ 500 บาท)</option>
            <option value="แขวน">แขวน (ค่าบริการ 1,300 บาท)</option>
            <option value="4 ทิศทาง">4 ทิศทาง (ค่าบริการ 1,500 บาท)</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">จำนวนเครื่อง *</label>
          <input type="number" class="form-input" id="quote-opt-ac-qty" required min="1" value="1">
        </div>
      </div>
    `;
  } else if (name.includes("เข้าเล่ม")) {
    quoteOptionsContainer.innerHTML = `
      <div class="form-row">
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">รูปแบบเข้าเล่ม *</label>
          <input type="text" class="form-input" id="quote-opt-bind-type" readonly value="${name.replace("เข้าเล่ม", "").trim()}">
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">จำนวนเล่ม *</label>
          <input type="number" class="form-input" id="quote-opt-bind-qty" required min="1" value="1">
        </div>
      </div>
    `;
  } else if (name.includes("ป้ายไวนิล") || name.includes("สติ๊กเกอร์")) {
    quoteOptionsContainer.innerHTML = `
      <div class="form-row">
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">ขนาดที่ต้องการ (กว้าง x ยาว เป็นเมตร) *</label>
          <input type="text" class="form-input" id="quote-opt-sign-size" required placeholder="เช่น 2 x 3 เมตร">
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">จำนวนชิ้น *</label>
          <input type="number" class="form-input" id="quote-opt-sign-qty" required min="1" value="1">
        </div>
      </div>
    `;
  }
  quoteModal.classList.add('active');
}

const closeQuote = () => quoteModal.classList.remove('active');
quoteClose.addEventListener('click', closeQuote);
quoteCancelBtn.addEventListener('click', closeQuote);

quoteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('quote-name').value.trim();
  const phone = document.getElementById('quote-phone').value.trim();
  const details = document.getElementById('quote-details').value.trim();
  const address = document.getElementById('quote-address').value.trim();
  const serviceId = quoteServiceType.value;
  const originalService = products.find(p => p.ID === serviceId) || { Name: "งานบริการพิเศษ" };
  
  let customOptionsText = "";
  const solarOpt = document.getElementById('quote-opt-solar');
  const acTypeOpt = document.getElementById('quote-opt-ac-type');
  const acQtyOpt = document.getElementById('quote-opt-ac-qty');
  const bindTypeOpt = document.getElementById('quote-opt-bind-type');
  const bindQtyOpt = document.getElementById('quote-opt-bind-qty');
  const signSizeOpt = document.getElementById('quote-opt-sign-size');
  const signQtyOpt = document.getElementById('quote-opt-sign-qty');
  
  if (solarOpt) {
    customOptionsText = `[Package: ${solarOpt.value}]`;
  } else if (acTypeOpt && acQtyOpt) {
    customOptionsText = `[ประเภทแอร์: ${acTypeOpt.value}, จำนวน: ${acQtyOpt.value} เครื่อง]`;
  } else if (bindTypeOpt && bindQtyOpt) {
    customOptionsText = `[รูปแบบเข้าเล่ม: ${bindTypeOpt.value}, จำนวน: ${bindQtyOpt.value} เล่ม]`;
  } else if (signSizeOpt && signQtyOpt) {
    customOptionsText = `[ขนาด: ${signSizeOpt.value}, จำนวน: ${signQtyOpt.value} ชิ้น]`;
  }
  
  const itemPrice = originalService.Price || 0;
  const qty = acQtyOpt ? Number(acQtyOpt.value) : (bindQtyOpt ? Number(bindQtyOpt.value) : (signQtyOpt ? Number(signQtyOpt.value) : 1));
  
  const payloadItem = {
    id: serviceId || "SERV-CUSTOM",
    name: `${originalService.Name} ${customOptionsText}`,
    price: itemPrice,
    unit: originalService.Unit || "ชิ้น",
    qty: qty
  };
  
  const orderPayload = {
    action: "createOrder",
    customerName: name,
    phone: phone,
    address: address,
    notes: `ขอใบเสนอราคางานบริการ: ${details}`,
    totalPrice: itemPrice * qty,
    items: [payloadItem]
  };
  
  const submitBtn = quoteForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = "กำลังส่งคำขอ... <i class='bx bx-loader-alt bx-spin'></i>";
  
  if (API_URL) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(orderPayload),
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      
      if (json.success) {
        showToast(`📩 ส่งคำขอประเมินราคาเรียบร้อยแล้ว! รหัสอ้างอิง: ${json.orderId}`);
        closeQuote();
        quoteForm.reset();
      } else {
        showToast(`❌ ส่งคำขอผิดพลาด: ${json.message}`, "error");
      }
    } catch (err) {
      console.error(err);
      showToast("❌ การเชื่อมต่อล้มเหลว กรุณาตรวจสอบสิทธิ์การแชร์ของชีตและตั้งค่า API", "error");
    }
  } else {
    showToast(`📩 ส่งคำขอจำลองเรียบร้อย! รหัสอ้างอิง: REQ-${new Date().getTime().toString().substring(6, 12)}`);
    closeQuote();
    quoteForm.reset();
  }
  
  submitBtn.disabled = false;
  submitBtn.innerHTML = "ส่งคำขอเสนอราคา <i class='bx bx-mail-send'></i>";
});
