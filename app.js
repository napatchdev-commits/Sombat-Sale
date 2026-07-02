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
  API_URL = localStorage.getItem('sombat_api_url') || (typeof CONFIG !== 'undefined' ? CONFIG.API_URL : "");
}

let products = [];
let cart = [];

// Default Mock Data from catalog pages 14-18
const mockProducts = [
  { ID: "SA001", Category: "กระดาษ", Name: "กระดาษ Double A A4 80g (40 แผ่น)", Description: "ขนาด A4 80 แกรม เหมาะสำหรับงานถ่ายเอกสารและงานพิมพ์ทั่วไป เนื้อขาวเรียบ", Price: 25, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAA001", Category: "กระดาษ", Name: "กระดาษ Double A A4 80g (1 รีม)", Description: "ขนาด A4 80 แกรม บรรจุ 500 แผ่น/รีม คุณภาพสูง เขียนและพิมพ์คมชัด", Price: 125, Unit: "รีม", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAB001", Category: "กระดาษ", Name: "กระดาษ Double A A4 80g (1 ลัง)", Description: "ขนาด A4 80 แกรม บรรจุ 5 รีม/ลัง ประหยัดและคุ้มค่ายิ่งขึ้น", Price: 600, Unit: "ลัง", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA002", Category: "กระดาษ", Name: "กระดาษถ่ายเอกสาร A4 100g (200 แผ่น)", Description: "ขนาด A4 หนาพิเศษ 100 แกรม เหมาะสำหรับทำปกรายงานหรืองานพิมพ์คุณภาพสูง", Price: 105, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA003", Category: "กระดาษ", Name: "กระดาษ Idea Work A4 80g (40 แผ่น)", Description: "ขนาด A4 80 แกรม เนื้อขาวสว่าง คมชัดระดับซูเปอร์พรีเมียม", Price: 20, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAA003", Category: "กระดาษ", Name: "กระดาษ Idea Work A4 80g (1 รีม)", Description: "ขนาด A4 80 แกรม บรรจุ 500 แผ่น/รีม รองรับการพิมพ์สองหน้า ลดการโก่งงอ", Price: 120, Unit: "รีม", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAB003", Category: "กระดาษ", Name: "กระดาษ Idea Work A4 80g (1 ลัง)", Description: "ขนาด A4 80 แกรม บรรจุ 5 รีม/ลัง คุณภาพเยี่ยมรองรับเครื่องถ่ายและเลเซอร์", Price: 575, Unit: "ลัง", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA004", Category: "กระดาษ", Name: "กระดาษ Double A F14 80g (1 รีม)", Description: "ขนาด F14 (216x356 มม.) 80 แกรม บรรจุ 500 แผ่น/รีม เหมาะสำหรับเอกสารราชการและกฎหมาย", Price: 175, Unit: "รีม", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAA004", Category: "กระดาษ", Name: "กระดาษ Double A F14 80g (1 ลัง)", Description: "ขนาด F14 80 แกรม บรรจุ 5 รีม/ลัง เหมาะสำหรับใช้ออฟฟิศ", Price: 850, Unit: "ลัง", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA005", Category: "กระดาษ", Name: "กระดาษ Double A B4 80g (1 รีม)", Description: "ขนาด B4 (9.84x13.9 นิ้ว) 80 แกรม บรรจุ 500 แผ่น/รีม เนื้อเรียบสม่ำเสมอ", Price: 205, Unit: "รีม", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAA005", Category: "กระดาษ", Name: "กระดาษ Double A B4 80g (1 ลัง)", Description: "ขนาด B4 80 แกรม บรรจุ 5 รีม/ลัง", Price: 980, Unit: "ลัง", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA006", Category: "กระดาษ", Name: "กระดาษ Double A A3 80g (1 รีม)", Description: "ขนาด A3 (297x420 มม.) 80 แกรม บรรจุ 500 แผ่น/รีม เหมาะสำหรับงานเขียนแบบและโปสเตอร์", Price: 265, Unit: "รีม", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAA006", Category: "กระดาษ", Name: "กระดาษ Double A A3 80g (1 ลัง)", Description: "ขนาด A3 80 แกรม บรรจุ 5 รีม/ลัง", Price: 1300, Unit: "ลัง", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA007", Category: "กระดาษ", Name: "กระดาษ Alcott A4 70g (1 รีม)", Description: "ขนาด A4 70 แกรม ถ่ายเอกสารได้ 2 หน้า บรรจุ 500 แผ่น/รีม ตัดด้วยเครื่อง ROTARY", Price: 90, Unit: "รีม", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAA007", Category: "กระดาษ", Name: "กระดาษ Alcott A4 70g (1 ลัง)", Description: "ขนาด A4 70 แกรม บรรจุ 5 รีม/ลัง ขอบเรียบเข้าเล่มง่าย", Price: 430, Unit: "ลัง", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA008", Category: "กระดาษ", Name: "กระดาษ Alcott A4 80g (1 รีม)", Description: "ขนาด A4 80 แกรม บรรจุ 500 แผ่น/รีม เหมาะกับเครื่องเลเซอร์และอิงค์เจ็ท", Price: 100, Unit: "รีม", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAA008", Category: "กระดาษ", Name: "กระดาษ Alcott A4 80g (1 ลัง)", Description: "ขนาด A4 80 แกรม บรรจุ 5 รีม/ลัง", Price: 480, Unit: "ลัง", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA009", Category: "กระดาษ", Name: "กระดาษ Alcott B4 70g (1 รีม)", Description: "ขนาด B4 70 แกรม บรรจุ 500 แผ่น/รีม ถ่ายเอกสารได้ 2 หน้า", Price: 185, Unit: "รีม", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAA009", Category: "กระดาษ", Name: "กระดาษ Alcott B4 70g (1 ลัง)", Description: "ขนาด B4 70 แกรม บรรจุ 5 รีม/ลัง ห่อหุ้มป้องกันความชื้นอย่างดี", Price: 900, Unit: "ลัง", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA010", Category: "กระดาษ", Name: "กระดาษ Alcott A3 80g (1 รีม)", Description: "ขนาด A3 80 แกรม บรรจุ 500 แผ่น/รีม คุณภาพดีขอบเรียบขจัดปัญหาการติดขัด", Price: 210, Unit: "รีม", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAA010", Category: "กระดาษ", Name: "กระดาษ Alcott A3 80g (1 ลัง)", Description: "ขนาด A3 80 แกรม บรรจุ 5 รีม/ลัง", Price: 1000, Unit: "ลัง", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA011", Category: "กระดาษ", Name: "กระดาษ Supreme A4 70g (1 รีม)", Description: "ขนาด A4 70 แกรม บรรจุ 500 แผ่น/รีม ได้รับการรับรอง ISO 9001 และ 14001", Price: 90, Unit: "รีม", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SAA011", Category: "กระดาษ", Name: "กระดาษ Supreme A4 70g (1 ลัง)", Description: "ขนาด A4 70 แกรม บรรจุ 5 รีม/ลัง เพื่อภาพลักษณ์ออฟฟิศที่เป็นมิตรต่อสิ่งแวดล้อม", Price: 440, Unit: "ลัง", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA012", Category: "กระดาษ", Name: "พลาสติกแผ่นใส A4 150 แกรม", Description: "พลาสติกใส 150 แกรม บรรจุ 100 แผ่น/แพ็ค สำหรับทำปกรายงานหรืองานคั่นวิทยานิพนธ์", Price: 150, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA013", Category: "กระดาษ", Name: "พลาสติกแผ่นใส A4 180 แกรม", Description: "พลาสติกใส 180 แกรม หนาพิเศษ บรรจุ 100 แผ่น/แพ็ค ทนทาน ป้องกันรอยขีดข่วน", Price: 180, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA014", Category: "กระดาษ", Name: "กระดาษโฟโต้ PHOTO PAPER A4 120g", Description: "กระดาษอิงค์เจ็ทผิวมันวาว บรรจุ 100 แผ่น/แพ็ค หนา 120 แกรม กันน้ำได้ดี เหมาะพิมพ์รูปภาพ", Price: 180, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA015", Category: "กระดาษ", Name: "กระดาษโฟโต้ PHOTO PAPER A4 150g", Description: "ผิวมันวาว บรรจุ 100 แผ่น/แพ็ค หนา 150 แกรม หมึกแห้งเร็วแห้งทันที", Price: 220, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA016", Category: "กระดาษ", Name: "กระดาษโฟโต้ PHOTO PAPER A4 180g", Description: "ผิวมันวาว บรรจุ 100 แผ่น/แพ็ค หนา 180 แกรม คมชัดทุกอณูสี", Price: 250, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA017", Category: "กระดาษ", Name: "กระดาษโฟโต้ PHOTO PAPER A4 200g", Description: "ผิวมันวาว บรรจุ 100 แผ่น/แพ็ค หนา 200 แกรม คุณภาพสตูดิโอถ่ายภาพ", Price: 300, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA018", Category: "กระดาษ", Name: "กระดาษอาร์ตมัน 2 หน้า ตรา AKE A4 130g", Description: "ขนาด A4 บรรจุ 100 แผ่น/แพ็ค กระดาษอาร์ตผิวมันวาว พิมพ์ได้ทั้ง 2 ด้าน คมชัดทนทาน", Price: 120, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA019", Category: "กระดาษ", Name: "กระดาษอาร์ตมัน 2 หน้า ตรา AKE A4 160g", Description: "ขนาด A4 บรรจุ 100 แผ่น/แพ็ค หนา 160 แกรม หมึกเกาะแน่น คุ้มค่า", Price: 150, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "SA020", Category: "กระดาษ", Name: "กระดาษอาร์ตมัน 2 หน้า ตรา AKE A4 210g", Description: "ขนาด A4 บรรจุ 100 แผ่น/แพ็ค หนา 210 แกรม รองรับเครื่องพิมพ์เลเซอร์ได้ดีเลิศ", Price: 180, Unit: "แพ็ค", Stock: 100, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO001", Category: "งานบริการ", Name: "บริการถ่ายเอกสารขาว/ดำ ขนาด A4", Description: "ถ่ายเอกสารบัตรประชาชน ทะเบียนบ้าน เอกสารทั่วไป ขนาด A4 (1 ต้นฉบับ 100 แผ่นขึ้นไป แผ่นละ 0.5 บาท)", Price: 1, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO002", Category: "งานบริการ", Name: "บริการถ่ายเอกสารขาว/ดำ ขนาด F14", Description: "บริการถ่ายเอกสารขาวดำ ขนาด F14", Price: 2, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO003", Category: "งานบริการ", Name: "บริการถ่ายเอกสารขาว/ดำ ขนาด B4", Description: "บริการถ่ายเอกสารขาวดำ ขนาด B4", Price: 2, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO004", Category: "งานบริการ", Name: "บริการถ่ายเอกสารขาว/ดำ ขนาด A3", Description: "บริการถ่ายเอกสารขาวดำ ขนาด A3", Price: 3, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO005", Category: "งานบริการ", Name: "บริการถ่ายเอกสารสี ขนาด A4", Description: "บริการถ่ายเอกสารสีสันคมชัด ขนาด A4", Price: 10, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO006", Category: "งานบริการ", Name: "บริการปริ้นท์/ถ่ายเอกสาร ขาวดำ ขนาด A4", Description: "บริการปริ้นท์หรือถ่ายเอกสารขาวดำคุณภาพมาตรฐาน ขนาด A4", Price: 3, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO007", Category: "งานบริการ", Name: "บริการปริ้นท์/ถ่ายเอกสาร ขาวดำ ขนาด A3", Description: "บริการปริ้นท์หรือถ่ายเอกสารขาวดำคุณภาพมาตรฐาน ขนาด A3", Price: 5, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO008", Category: "งานบริการ", Name: "บริการปริ้นท์/ถ่ายเอกสาร สี ขนาด A4 (สีเล็กน้อย)", Description: "บริการปริ้นท์หรือถ่ายเอกสารสี ขนาด A4 ที่มีปริมาณการพิมพ์สีเล็กน้อย", Price: 5, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO009", Category: "งานบริการ", Name: "บริการปริ้นท์/ถ่ายเอกสาร สี ขนาด A4 (รูปภาพ + ตัวอักษร)", Description: "บริการปริ้นท์หรือถ่ายเอกสารสี ขนาด A4 ที่มีทั้งรูปภาพและข้อความ", Price: 8, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO010", Category: "งานบริการ", Name: "บริการปริ้นท์/ถ่ายเอกสาร สี ขนาด A4 (รูปภาพ 2 รูป)", Description: "บริการปริ้นท์หรือถ่ายเอกสารสี ขนาด A4 ที่มีรูปภาพหลัก 2 ภาพ", Price: 10, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO011", Category: "งานบริการ", Name: "บริการปริ้นท์/ถ่ายเอกสาร สี ขนาด A4 (สีเต็มแผ่น)", Description: "บริการปริ้นท์หรือถ่ายเอกสารสี ขนาด A4 เต็มแผ่น เหมาะกับงานโฆษณา/โปสเตอร์", Price: 20, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO012", Category: "งานบริการ", Name: "บริการปริ้นท์/ถ่ายเอกสาร สี ขนาด A3", Description: "บริการปริ้นท์หรือถ่ายเอกสารสี ขนาด A3 ปรับราคาขึ้นเป็น 1 เท่าของ A4 ตามประเภทงานพิมพ์", Price: 0, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "PHOTO013", Category: "งานบริการ", Name: "บริการถ่ายรูปด่วน (1 โหล)", Description: "บริการถ่ายรูปด่วนขนาด 1 นิ้ว / 1.5 นิ้ว / 2 นิ้ว จำนวน 1 โหล ฟรีบริการตัดต่อสูทและเปลี่ยนฉากหลัง", Price: 100, Unit: "โหล", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300" },
  { ID: "BIND001", Category: "งานบริการ", Name: "เข้าเล่ม สันกาว", Description: "บริการเข้าเล่มไสกาวแบบหนังสือ ทนทาน สวยงาม เริ่มต้น 70 บาท", Price: 70, Unit: "เล่ม", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" },
  { ID: "BIND002", Category: "งานบริการ", Name: "เข้าเล่ม สันรูด", Description: "บริการเข้าเล่มแบบสันรูดพลาสติก เหมาะสำหรับเอกสารรายงานทั่วไป เริ่มต้น 10 บาท", Price: 10, Unit: "เล่ม", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" },
  { ID: "BIND003", Category: "งานบริการ", Name: "เข้าเล่ม กระดูกงู", Description: "บริการเข้าเล่มแบบห่วงพลาสติกกระดูกงู เปิดกางได้ 180 องศา เริ่มต้น 20 บาท", Price: 20, Unit: "เล่ม", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" },
  { ID: "BIND004", Category: "งานบริการ", Name: "เข้าเล่ม เย็บแม็กซ์ / แล็คซีน", Description: "บริการเข้าเล่มเย็บลวด มุงหลังคา ปิดสันด้วยเทปแลคซีน เริ่มต้น 10 บาท", Price: 10, Unit: "เล่ม", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" },
  { ID: "BIND005", Category: "งานบริการ", Name: "บริการแผ่นใสสำหรับงานเข้าเล่ม", Description: "บริการเสริมเพิ่มแผ่นใสปกหน้า-หลังของรายงาน/เอกสาร", Price: 10, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" },
  { ID: "SOLAR001", Category: "งานบริการ", Name: "ติดตั้งระบบ Solar Cell 3.0 kW", Description: "ประหยัดไฟ 1,500-1,800 บาท/เดือน ฟรีค่าสำรวจหน้างาน/คลีนแผง 2 ปี รับประกันแผง 25 ปี อินเวอร์เตอร์ 10 ปี (Huawei Inverter 3kW 1 ตัว, แผง Mono half 625W 6 แผง, ชุด Mounting 1 ชุด, Smart Power sensor 1 ชุด)", Price: 110000, Unit: "ชุด", Stock: 99, ImageURL: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300" },
  { ID: "SOLAR002", Category: "งานบริการ", Name: "ติดตั้งระบบ Solar Cell 5.0 kW (1 Phase)", Description: "ประหยัดไฟ 3,500 บาท/เดือน ฟรีค่าสำรวจหน้างาน/คลีนแผง 2 ปี รับประกันแผง 25 ปี อินเวอร์เตอร์ 10 ปี (Huawei Inverter 5kW 1 ตัว, แผง Mono half 625W 9 แผง, ชุด Mounting 1 ชุด, Smart Power sensor 1 ชุด)", Price: 130000, Unit: "ชุด", Stock: 99, ImageURL: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300" },
  { ID: "SOLAR003", Category: "งานบริการ", Name: "ติดตั้งระบบ Solar Cell 5.0 kW (3 Phase)", Description: "ประหยัดไฟ 3,500 บาท/เดือน ฟรีค่าสำรวจหน้างาน/คลีนแผง 2 ปี รับประกันแผง 25 ปี (Huawei Inverter 5kW 1 ตัว, แผง Mono half 625W 9 แผง, ชุด Mounting 1 ชุด, Smart Power sensor 1 ชุด)", Price: 160000, Unit: "ชุด", Stock: 99, ImageURL: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300" },
  { ID: "SOLAR004", Category: "งานบริการ", Name: "ติดตั้งระบบ Solar Cell 10.0 kW", Description: "ประหยัดไฟ 6,000 บาท/เดือน ฟรีค่าสำรวจหน้างาน/คลีนแผง 2 ปี รับประกันแผง 25 ปี (Huawei Inverter 10kW 1 ตัว, แผง Mono half 625W 18 แผง, ชุด Mounting 1 ชุด, Smart Power sensor 1 ชุด)", Price: 259000, Unit: "ชุด", Stock: 99, ImageURL: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300" },
  { ID: "SERV001", Category: "งานบริการ", Name: "บริการล้างแอร์ติดผนัง", Description: "ทำความสะอาดแอร์ติดผนังบ้านทั่วไป กำจัดฝุ่น เชื้อรา เพิ่มลมเย็นและประหยัดไฟ", Price: 500, Unit: "ตัว", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=300" },
  { ID: "SERV002", Category: "งานบริการ", Name: "บริการล้างแอร์แขวน", Description: "ทำความสะอาดแอร์แขวนใต้ฝ้าเพดานสำหรับสำนักงาน ร้านค้า หรือโชว์รูม", Price: 1300, Unit: "ตัว", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=300" },
  { ID: "SERV003", Category: "งานบริการ", Name: "บริการล้างแอร์ 4 ทิศทาง", Description: "ทำความสะอาดแอร์สี่ทิศทาง (Cassette Type) ด้วยช่างผู้เชี่ยวชาญ", Price: 1500, Unit: "ตัว", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=300" },
  { ID: "SIGN001", Category: "งานบริการ", Name: "งานป้ายไวนิล (ตามขนาดสั่งทำ)", Description: "ป้ายไวนิลทนทาน สีสันสดใส ออกแบบฟรี บริการประเมินราคาตามพื้นที่ตารางเมตร", Price: 0, Unit: "ตร.ม.", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300" },
  { ID: "SIGN002", Category: "งานบริการ", Name: "งานสติ๊กเกอร์สินค้า (ไดคัท)", Description: "สติ๊กเกอร์กันน้ำสำหรับติดบนตัวสินค้า ไดคัทตามรูปทรงที่ต้องการ ออกแบบฟรี", Price: 0, Unit: "แผ่น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300" },
  { ID: "SIGN003", Category: "งานบริการ", Name: "งานป้ายอะคริลิค", Description: "รับทำป้ายอะคริลิคตามขนาดและรูปแบบที่ต้องการ ออกแบบฟรี ประเมินราคาตามชิ้นงาน", Price: 0, Unit: "ชิ้น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300" },
  { ID: "SIGN004", Category: "งานบริการ", Name: "งานสติ๊กเกอร์รีดโฟม / รีดฟิลล์", Description: "บริการพิมพ์และผลิตสติ๊กเกอร์รีดโฟมและรีดฟิลล์โฆษณา ออกแบบฟรี", Price: 0, Unit: "ชิ้น", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300" },
  { ID: "SIGN005", Category: "งานบริการ", Name: "งานป้ายไวนิลพร้อมโครงไม้", Description: "ผลิตป้ายไวนิลพร้อมขึงโครงไม้ทนทาน เหมาะสำหรับป้ายประชาสัมพันธ์ภายนอก", Price: 0, Unit: "ชุด", Stock: 999, ImageURL: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300" }
]

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
  if (category === 'เครื่องแต่งกายนักเรียน') {
    productsGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 6rem 2rem; color: var(--text-muted);">
        <i class="bx bx-info-circle" style="font-size: 4rem; color: var(--secondary); margin-bottom: 1.25rem;"></i>
        <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--dark); margin-bottom: 0.5rem; font-family: var(--font-heading);">บริการนี้ยังไม่เปิดให้บริการ</h3>
        <p style="font-size: 0.95rem; font-weight: 500;">ขออภัยในความไม่สะดวก</p>
      </div>
    `;
    return;
  }

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
        body: JSON.stringify(orderPayload)
      });
      
      let success = false;
      let orderId = "ORD-" + new Date().getTime().toString().substring(8);
      try {
        const text = await response.text();
        const json = JSON.parse(text);
        success = json.success;
        if (orderId) orderId = json.orderId;
      } catch (e) {
        if (response.ok) success = true;
      }
      
      if (success) {
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
        body: JSON.stringify(orderPayload)
      });
      
      let success = false;
      try {
        const text = await response.text();
        const json = JSON.parse(text);
        success = json.success;
      } catch (e) {
        if (response.ok) success = true;
      }
      
      if (success) {
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
