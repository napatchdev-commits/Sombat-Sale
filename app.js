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
  {
    "ID": "SA001",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A4 ตรา ดับเบิ้ลเอ | Double A 80 แกรม",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAA001",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A4 (รีม)  ตรา ดับเบิ้ลเอ | Double A 80 แกรม",
    "Description": "",
    "Price": 125,
    "Unit": "รีม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAA002",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A4 (ลัง)  ตรา ดับเบิ้ลเอ | Double A 80 แกรม",
    "Description": "",
    "Price": 600,
    "Unit": "ลัง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA002",
    "Category": "กระดาษ",
    "Name": "ระดาษถ่ายเอกสาร A4 หนาพิเศษ 100 แกรม 200 แผ่น",
    "Description": "",
    "Price": 105,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA003",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A4 ตรา ไอเดีย | Idea 80 แกรม",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAA003",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A4 (รีม) ตรา ไอเดีย | Idea 80 แกรม",
    "Description": "",
    "Price": 120,
    "Unit": "รีม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAB003",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A4 (ลัง) ตรา ไอเดีย | Idea 80 แกรม",
    "Description": "",
    "Price": 575,
    "Unit": "ลัง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA004",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร F14 (รีม) ตรา ดับเบิ้ลเอ | Double A 80 แกรม",
    "Description": "",
    "Price": 175,
    "Unit": "รีม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAA004",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร F14 (ลัง) ตรา ดับเบิ้ลเอ | Double A 80 แกรม",
    "Description": "",
    "Price": 850,
    "Unit": "ลัง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA005",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร B4 (รีม)ตรา ดับเบิ้ลเอ | Double A 80 แกรม",
    "Description": "",
    "Price": 205,
    "Unit": "รีม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAA005",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร B4 (ลัง) ตรา ดับเบิ้ลเอ | Double A 80 แกรม",
    "Description": "",
    "Price": 980,
    "Unit": "ลัง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA006",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A3 (รีม) ตรา ดับเบิ้ลเอ | Double A 80 แกรม",
    "Description": "",
    "Price": 265,
    "Unit": "รีม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAA006",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A3 (ลัง) ตรา ดับเบิ้ลเอ | Double A 80 แกรม",
    "Description": "",
    "Price": 1300,
    "Unit": "ลัง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA007",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A4( รีม) ตรา แอลคอท | Alcott  70 แกรม",
    "Description": "",
    "Price": 90,
    "Unit": "รีม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAA007",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A4 (ลัง)  ตรา แอลคอท | Alcott  70 แกรม",
    "Description": "",
    "Price": 430,
    "Unit": "ลัง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA008",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A4 (รีม) ตรา แอลคอท | Alcott  80 แกรม",
    "Description": "",
    "Price": 100,
    "Unit": "รีม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAA008",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A4 (ลัง) ตรา แอลคอท | Alcott  80 แกรม",
    "Description": "",
    "Price": 480,
    "Unit": "ลัง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA009",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร B4 (รีม) ตรา แอลคอท Alcott หนา 70 แกรม",
    "Description": "",
    "Price": 185,
    "Unit": "รีม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAA009",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร B4 (ลัง)  ตรา แอลคอท",
    "Description": "",
    "Price": 0,
    "Unit": "ลัง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA010",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A3 (รีม) ตรา แอลคอท Alcott หนา 80 แกรม",
    "Description": "",
    "Price": 210,
    "Unit": "รีม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAA010",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A3 (ลัง) ตรา แอลคอท Alcott หนา 80 แกรม",
    "Description": "",
    "Price": 1000,
    "Unit": "ลัง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA011",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A4 (รีม) ตรา สุพรีม | Supreme หนา 70 แกรม",
    "Description": "",
    "Price": 90,
    "Unit": "รีม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAA011",
    "Category": "กระดาษ",
    "Name": "กระดาษถ่ายเอกสาร A4 (ลัง) ตรา สุพรีม | Supreme หนา 70 แกรม",
    "Description": "",
    "Price": 440,
    "Unit": "รีม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA012",
    "Category": "กระดาษ",
    "Name": "พลาสติกแผ่นใส ขนาด A4 l 150 แกรม (แพ็ค)",
    "Description": "",
    "Price": 150,
    "Unit": "แพ็ค",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA013",
    "Category": "กระดาษ",
    "Name": "พลาสติกแผ่นใส ขนาด A4 l 180 แกรม (แพ็ค)",
    "Description": "",
    "Price": 180,
    "Unit": "แพ็ค",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA014",
    "Category": "กระดาษ",
    "Name": "กระดาษโฟโต้ Photo Paper ขนาด A4  l 120 แกรม",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA015",
    "Category": "กระดาษ",
    "Name": "กระดาษโฟโต้ Photo Paper ขนาด A4  l 150 แกรม",
    "Description": "",
    "Price": 220,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA016",
    "Category": "กระดาษ",
    "Name": "กระดาษโฟโต้ Photo Paper ขนาด A4  l 180 แกรม",
    "Description": "",
    "Price": 250,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA017",
    "Category": "กระดาษ",
    "Name": "กระดาษโฟโต้ Photo Paper ขนาด A4  l 220 แกรม",
    "Description": "",
    "Price": 300,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA018",
    "Category": "กระดาษ",
    "Name": "กระดาษอาร์ตมัน 2 หน้า ตรา AKE l 130   แกรม",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA019",
    "Category": "กระดาษ",
    "Name": "กระดาษอาร์ตมัน 2 หน้า ตรา AKE l 160   แกรม",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA020",
    "Category": "กระดาษ",
    "Name": "กระดาษอาร์ตมัน 2 หน้า ตรา AKE l 210  แกรม",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA021",
    "Category": "กระดาษ",
    "Name": "สติ๊กเกอร์ ขาวมัน ขาวด้าน ขนาด A4",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA022",
    "Category": "กระดาษ",
    "Name": "สติ๊กเกอร์กระดาษ สีเงิน-ทอง",
    "Description": "",
    "Price": 220,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA023",
    "Category": "กระดาษ",
    "Name": "กระดาษโฟโต้แบบ 2 หน้า  100  แกรม",
    "Description": "",
    "Price": 200,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA024",
    "Category": "กระดาษ",
    "Name": "กระดาษโฟโต้แบบ 2 หน้า  160  แกรม",
    "Description": "",
    "Price": 380,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA025",
    "Category": "กระดาษ",
    "Name": "กระดาษโฟโต้แบบ 2 หน้า  180  แกรม",
    "Description": "",
    "Price": 450,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA026",
    "Category": "กระดาษ",
    "Name": "สติ๊กเกอร์ใส Clear Sticker",
    "Description": "",
    "Price": 400,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA027",
    "Category": "กระดาษ",
    "Name": "กระดาษการ์ดขาว 120  แกรม",
    "Description": "",
    "Price": 100,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA028",
    "Category": "กระดาษ",
    "Name": "กระดาษการ์ดขาว 150  แกรม",
    "Description": "",
    "Price": 140,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA029",
    "Category": "กระดาษ",
    "Name": "กระดาษการ์ดขาว 180  แกรม",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA030",
    "Category": "กระดาษ",
    "Name": "สติ๊กเกอร์ PVC ใส หลังเหลือง ขนาด A4",
    "Description": "",
    "Price": 185,
    "Unit": "ลัง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA031",
    "Category": "กระดาษ",
    "Name": "กระดาษวาดเขียน ร้อยปอนด์ ตรา เรนาซองซ์ | Renaissance 50 แผ่น",
    "Description": "",
    "Price": 210,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA032",
    "Category": "กระดาษ",
    "Name": "กระดาษวาดเขียน ร้อยปอนด์ ตรา เรนาซองซ์ | Renaissance  100 แผ่น",
    "Description": "",
    "Price": 350,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA033",
    "Category": "กระดาษ",
    "Name": "สติ๊กเกอร์โฟโต้ Sticker Photo ขนาด A4",
    "Description": "",
    "Price": 350,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA034",
    "Category": "กระดาษ",
    "Name": "กระดาษสี / กระดาษการ์ดสี ขนาด A4 80 แกรม",
    "Description": "",
    "Price": 250,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA035",
    "Category": "กระดาษ",
    "Name": "กระดาษสี / กระดาษการ์ดสี ขนาด A4 120 แกรม",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA036",
    "Category": "กระดาษ",
    "Name": "กระดาษสี / กระดาษการ์ดสี ขนาด A4 150 แกรม",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA037",
    "Category": "กระดาษ",
    "Name": "กระดาษสี / กระดาษการ์ดสี ขนาด A4 180 แกรม",
    "Description": "",
    "Price": 200,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA038",
    "Category": "กระดาษ",
    "Name": "กระดาษสีโปสเตอร์ หน้าเดียว แบบแข็ง",
    "Description": "",
    "Price": 12,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA039",
    "Category": "กระดาษ",
    "Name": "กระดาษสี 2หน้า แบบอ่อน",
    "Description": "",
    "Price": 6,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA040",
    "Category": "กระดาษ",
    "Name": "กระดาษสีน้ำตาล",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA041",
    "Category": "กระดาษ",
    "Name": "กระดาษแข็งขาว เทา 280  แกรม",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA042",
    "Category": "กระดาษ",
    "Name": "กระดาษแข็งขาว เทา 400  แกรม",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA043",
    "Category": "กระดาษ",
    "Name": "กระดาษ 100 ปอนด์ ขนาด A2",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA044",
    "Category": "กระดาษ",
    "Name": "ฟลิบชาร์ท กระดาษชาร์ท ขาว",
    "Description": "",
    "Price": 7,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA045",
    "Category": "กระดาษ",
    "Name": "กระดาษเคลือบ สติ๊กเกอร์ใส A2",
    "Description": "",
    "Price": 13,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA046",
    "Category": "กระดาษ",
    "Name": "กระดาษเคลือบ สติ๊กเกอร์ใส A3",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA047",
    "Category": "กระดาษ",
    "Name": "กระดาษคาร์บอนสีดำ สำหรับพิมพ์ ตราม้า | Horse",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA048",
    "Category": "กระดาษ",
    "Name": "กระดาษคาร์บอน สีน้ำเงิน ตรา เอ็มบาซซี่ | Embassy 333 H",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA049",
    "Category": "กระดาษ",
    "Name": "กระดาษคาร์บอน ตรา เอ็มแอนด์จี | M&G  85 x 185 มม.",
    "Description": "",
    "Price": 40,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA050",
    "Category": "กระดาษ",
    "Name": "กระดาษคาร์บอน ตรา เอ็มแอนด์จี | M&G 210 x 330 มม.",
    "Description": "",
    "Price": 3,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA051",
    "Category": "กระดาษ",
    "Name": "กระดาษคาร์บอน ตรา เอ็มแอนด์จี | 210 x 330 มม.",
    "Description": "",
    "Price": 100,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA052",
    "Category": "กระดาษ",
    "Name": "กระดาษไขอเนกประสงค์ (แผ่น)  ตรา มาสเตอร์อาร์ต | Masterart",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SAA052",
    "Category": "กระดาษ",
    "Name": "กระดาษไขอเนกประสงค์ (เล่ม)ตรา มาสเตอร์อาร์ต | Masterart",
    "Description": "",
    "Price": 190,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA101",
    "Category": "กระดาษ",
    "Name": "กระบอกโปสเตอร์  2 นิ้ว  *35 cm",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA102",
    "Category": "กระดาษ",
    "Name": "กระบอกโปสเตอร์  3 นิ้ว  *45 cm",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA103",
    "Category": "กระดาษ",
    "Name": "กระบอกโปสเตอร์  2 นิ้ว  *65cm",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SA104",
    "Category": "กระดาษ",
    "Name": "กระบอกโปสเตอร์  2 นิ้ว  *110 cm",
    "Description": "",
    "Price": 55,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB001",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา เอลเฟ่น | Elfen Blue 6ml.",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBA002",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา เอลเฟ่น | Elfen Blue 3 ml.",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBA003",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา เอลเฟ่น | Elfen Blue 8 ml.",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBA004",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา เอลเฟ่น | Elfen Blue 12 ml.",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB002",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา โยย่า | Yoya 832 ECO 4ml.",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB003",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา โยย่า | Yoya 801 7ml",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB004",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา ช้าง | Elephant 7ml.",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB005",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา โยย่า | Yoya 833 ECO 4ml. No.832",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB006",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา เปเปอร์เมท | Paper Mate liquid paper 7ml. 1997112",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBA007",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา เปเปอร์เมท | Paper Mate liquid paper 7ml. 1997111",
    "Description": "",
    "Price": 55,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB007",
    "Category": "เครื่องเขียน",
    "Name": "เทปลบคำผิด ตรา ช้าง | Elephant 8 ml.",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB008",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา เอลเฟ่น | Elfen Blue 4ml.",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB009",
    "Category": "เครื่องเขียน",
    "Name": "เทปลบคำผิด ตรา เอลเฟ่น | Elfen Flappy mini 3M คละสี",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB010",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา เพนเทล | Pentel 4.2ml  230525",
    "Description": "",
    "Price": 60,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBA011",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลบคำผิด ตรา เพนเทล | Pentel 4.2ml  170423",
    "Description": "",
    "Price": 55,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB011",
    "Category": "เครื่องเขียน",
    "Name": "เทปลบคำผิด ตรา เอลเฟ่น | Elfen Creamy 5M. คละสี",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB012",
    "Category": "เครื่องเขียน",
    "Name": "เทปลบคำผิด ตรา เอ็มแอนด์จี | M&G คละสี",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB013",
    "Category": "เครื่องเขียน",
    "Name": "ยางลบดินสอ ตรา ม้า | Horse H-25",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB014",
    "Category": "เครื่องเขียน",
    "Name": "ยางลบดินสอ ตรา สเต็ดเลอร์ | Staedtler คละสี",
    "Description": "",
    "Price": 7,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB015",
    "Category": "เครื่องเขียน",
    "Name": "ยางลบดินสอ ตรา สเต็ดเลอร์ | Staedtler 526 35F",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB016",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ (โหล) ตรา มาสเตอร์อาร์ต | Masterart HB",
    "Description": "",
    "Price": 45,
    "Unit": "โหล",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB017",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ 2HB  (แท่ง) ตรา สเต็ดเลอร์ | Staedtler norica 2HB",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB018",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ 2HB  (โหล)  ตรา สเต็ดเลอร์ | Staedtler norica 2HB",
    "Description": "",
    "Price": 45,
    "Unit": "โหล",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB019",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ 2B (แท่ง) ตรา มาสเตอร์อาร์ต | Masterart 2B",
    "Description": "",
    "Price": 8,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB020",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ 2B (โหล)ตรา มาสเตอร์อาร์ต | Masterart 2B / 1  โหล",
    "Description": "",
    "Price": 45,
    "Unit": "โหล",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB021",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ 2B (กล่อง)  ตรา มาสเตอร์อาร์ต | Masterart 2B /1 กล่อง  50 แท่ง",
    "Description": "",
    "Price": 200,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB022",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอเขียนแบบ 6B (โหล) ตรา ม้า | Horse H-9900 6B",
    "Description": "",
    "Price": 120,
    "Unit": "โหล",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBA023",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอเขียนแบบ 4B (โหล) ตรา ม้า | Horse H-9900",
    "Description": "",
    "Price": 60,
    "Unit": "โหล",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB023",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ HB (โหล) ตรา ม้า | Horse H-2200 HB",
    "Description": "",
    "Price": 45,
    "Unit": "โหล",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB024",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ HB (แท่ง) ตรา สเต็ดเลอร์ | Staedtler Dino-Saurs HB",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB025",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำHB (โหล) ตรา สเต็ดเลอร์ | Staedtler Dino-Saurs HB",
    "Description": "",
    "Price": 45,
    "Unit": "โหล",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB026",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอเขียนแบบ  EE  ตรา สเต็ดเลอร์ | Staedtler Mars Lumograph EE",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB027",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอเขียนแบบ EE (โหล)  ตรา สเต็ดเลอร์ | Staedtler Mars Lumograph EE",
    "Description": "",
    "Price": 220,
    "Unit": "โหล",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB028",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ  HB (แท่ง) ตรา เอลเฟ่น | Elfen NEON HB /",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB029",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ HB ( กล่อง)   ตรา เอลเฟ่น | Elfen NEON HB /  1 กล่อง  50 แท่ง",
    "Description": "",
    "Price": 150,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB030",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ HB 2002 (แท่ง) ตรา เอลเฟ่น | Elfen 2002 HB /  1 แท่ง",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB031",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ HB 2002 (กล่อง) ตรา เอลเฟ่น | Elfen 2002 HB / 1  กล่อง  50 แท่ง",
    "Description": "",
    "Price": 150,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB032",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอเขียนแบบ 6B  ตรา สเต็ดเลอร์ | Staedtler Mar Lomograph 6B",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB033",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ ตรา ม้า | Horse 9900  2 B",
    "Description": "",
    "Price": 8,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBA034",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ 2B (โหล)  ตรา ม้า | Horse 9900  2 B",
    "Description": "",
    "Price": 0,
    "Unit": "โหล",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB034",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ ตรา ม้า | Horse 9900  4 B",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB035",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ ตรา ม้า | Horse 9900  6 B",
    "Description": "",
    "Price": 12,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB036",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ ตรา เอ็มแอนด์จี | M&G HB",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB037",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ ตรา เอ็มแอนด์จี | M&G 2B",
    "Description": "",
    "Price": 8,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB038",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอดำ ตรา เอ็มแอนด์จี | M&G 4B",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB039",
    "Category": "เครื่องเขียน",
    "Name": "กบเหลา 1 รู พร้อมฝาปิด ตรา Pencil Sharpener No.168",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB040",
    "Category": "เครื่องเขียน",
    "Name": "กบเหลาดินสอ ตรา มาสเตอร์อาร์ต | Masterart No.5 คละสี",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB041",
    "Category": "เครื่องเขียน",
    "Name": "เครื่องเหลาดินสอ ตราม้า รุ่น H-620 คละสี",
    "Description": "",
    "Price": 350,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB042",
    "Category": "เครื่องเขียน",
    "Name": "ไม้บรรทัด ขนาด 6 นิ้ว คละสี คละลาย",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB043",
    "Category": "เครื่องเขียน",
    "Name": "ไม้บรรทัด ขนาด 12 นิ้ว คละสี คละลาย",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB044",
    "Category": "เครื่องเขียน",
    "Name": "ไม้บรรทัด พลาสติกใสอ่อน ขนาด 12 นิ้ว",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB045",
    "Category": "เครื่องเขียน",
    "Name": "ไม้บรรทัด พลาสติกใสแข็ง ขนาด 12 นิ้ว",
    "Description": "",
    "Price": 8,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB046",
    "Category": "เครื่องเขียน",
    "Name": "ไม้บรรทัดเหล็ก ตรา ฟรายอิ้ง ไทเกอร์  6 นิ้ว | Flying Tiger",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB047",
    "Category": "เครื่องเขียน",
    "Name": "ไม้บรรทัดเหล็ก ตรา ฟรายอิ้ง ไทเกอร์  12 นิ้ว | Flying Tiger",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB048",
    "Category": "เครื่องเขียน",
    "Name": "ไม้บรรทัด อลูมิเนียม ตรา โตโต้ | Toto 12 นิ้ว คละสี",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB049",
    "Category": "เครื่องเขียน",
    "Name": "ชุดไม้บรรทัดเรขาคณิต คละสี",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB050",
    "Category": "เครื่องเขียน",
    "Name": "ไม้บรรทัดเรขาคณิต คละสี คละแบบ",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB051",
    "Category": "เครื่องเขียน",
    "Name": "วงเวียนสแตนเลส ขนาดเล็ก",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB052",
    "Category": "เครื่องเขียน",
    "Name": "ชุดวงเวียน ตรา เอ็มแอนด์จี | M&G",
    "Description": "",
    "Price": 99,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB053",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาเมจิก ตรา ไพล็อท | Pilot Color Pen SDR-200",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB054",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาตัดเส้น หมึกสีดำ ตรา นิจิ | Niji 101",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB055",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาตัดเส้น หมึกสีดำ 0.2 มม. ตรา ลีเพ็น | Lee Pen",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB056",
    "Category": "เครื่องเขียน",
    "Name": "ปากกามาร์คเกอร์ ตรา โยย่า | Yoya Twin Marker CD Pen",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB057",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาเพ้นท์ ตรา โตโย | Toyo Paint Marker",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB058",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลูกลื่น ตรา แลนเซอร์ | Lancer",
    "Description": "",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB059",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลูกลื่น 0.5 มม. ตรา โยย่า | Yoya",
    "Description": "",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB060",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลูกลื่น หมึกสีน้ำเงิน 0.5 มม. ตรา ม้า |",
    "Description": "",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB061",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลูกลื่น หมึกสีแดง 0.7 มม. ตรา ม้า | Horse H-402",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB062",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาหมึกน้ำมัน หมึกสีแดง 0.5 มม. ตรา เพนคอม | Pencom OG-37",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB063",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลูกลื่น หมึกเจลสีน้ำเงิน 0.7 มม.",
    "Description": "",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB064",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลูกลื่น หมึกสีแดง 0.5 มม. ตรา เฟเบอร์ คาสเทล | Faber Castell 1423",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB065",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลูกลื่น 2 หัว 0.5 มม. ตรา ควอนตัม | QuanTum Skate 222 Duo 1 แท่ง",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB066",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลูกลื่น 2 หัว 0.5 มม. ตรา ควอนตัม | QuanTum Skate 222 Duo  1 กล่อง  50 แท่ง",
    "Description": "",
    "Price": 220,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB067",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลูกลื่น ดริฟท์ โทริโอะ 0.5 มม.",
    "Description": "",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB068",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลูกลื่น ดริฟท์ โทริโอะ 0.7 มม. ตรา ช้าง | Elephant Drift Torio",
    "Description": "",
    "Price": 195,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB069",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลูกลื่น สเก็ตแฟนซีเหมียวเหมียว 0.6 มม. ตรา ควอนตัม | Quantum Skate Fancy Meow Meow",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB070",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาลูกลื่น ฮิทซ์พาสเทล 0.7 มม. ตรา ควอนตัม | Quantum 007 Hitz Pastel",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB071",
    "Category": "เครื่องเขียน",
    "Name": "สีชอล์คน้ำมัน ตรา เพนเทล | Pentel Oil Pastels 12 สี",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB072",
    "Category": "เครื่องเขียน",
    "Name": "สีชอล์คน้ำมัน ตรา เพนเทล | Pentel Oil Pastels  25  สี",
    "Description": "",
    "Price": 95,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB073",
    "Category": "เครื่องเขียน",
    "Name": "สีชอล์คน้ำมัน ตรา เพนเทล | Pentel Oil Pastels 36 สี",
    "Description": "",
    "Price": 130,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB074",
    "Category": "เครื่องเขียน",
    "Name": "สีเทียนเขียนผ้า 7 สี ตรา เพนเทล | Pentel Fabric Fun",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB075",
    "Category": "เครื่องเขียน",
    "Name": "สีเทียน จัมโบ้ 12 สี  ตรา มาสเตอร์อาร์ต | Masterart Jumbo Size 12 สี",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB076",
    "Category": "เครื่องเขียน",
    "Name": "สีเทียน จัมโบ้ 24 สี ตรา มาสเตอร์อาร์ต | Masterart Jumbo Size 24 สี",
    "Description": "",
    "Price": 55,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB077",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอสีแท่งยาว 12 สี ตรา มาสเตอร์อาร์ต | Masterart 12 สี",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB078",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอสีแท่งยาว 24 สี ตรา มาสเตอร์อาร์ต | Masterart 24 สี",
    "Description": "",
    "Price": 110,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB079",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอสีแท่งสั้น 12 สี ตรา มาสเตอร์อาร์ต | Masterart",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB080",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอสีแท่งยาว  12 สี ตรา คอลลีน | Colleen",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB081",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอสีแท่งยาว 24 สี ตรา คอลลีน | Colleen 775",
    "Description": "",
    "Price": 125,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB082",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอสีแท่งยาว 36 สี  ตรา คอลลีน | Colleen 775",
    "Description": "",
    "Price": 185,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBA083",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอสีแท่งยาว 36 สี  ตรา คอลลีน | Colleen 787",
    "Description": "",
    "Price": 100,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBA084",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอสีแท่งยาว 48 สี  ตรา คอลลีน | Colleen 775",
    "Description": "",
    "Price": 245,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBA085",
    "Category": "เครื่องเขียน",
    "Name": "ดินสิสีน้ำ 12 สี ตราคอลลีน Watercolour pencils",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB083",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอสีไม้แท่งสั้น 12 สี ตรา ม้า | Horse",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB084",
    "Category": "เครื่องเขียน",
    "Name": "ดินสอสีไม้แท่งยาว 12 สี ตรา ม้า | Horse",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBA086",
    "Category": "เครื่องเขียน",
    "Name": "สีไม้แท่งยาว 12 สี  สเต็ดเล่อร์",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB085",
    "Category": "เครื่องเขียน",
    "Name": "สีไม้ระบายน้ำ เรนาซองซ์ 12 สี ตรา มาสเตอร์อาร์ต | Masterart Renaissance",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB086",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาสีเมจิก 12 สี ตรา มาสเตอร์อาร์ต | Masterart",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBA087",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาสีเมจิก 24 สี ตรา มาสเตอร์อาร์ต | Masterart",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB087",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาสีน้ำ 12 สี ตรา ม้า | Horse H-88",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB088",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาเคมี 2 หัว ตรา ม้า | Horse Permanent Markers",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB089",
    "Category": "เครื่องเขียน",
    "Name": "สีน้ำ 12 สี ตรา ม้า | Horse",
    "Description": "",
    "Price": 40,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB090",
    "Category": "เครื่องเขียน",
    "Name": "ชุดสีโปสเตอร์ จิตรกรน้อย ตรา มาสเตอร์อาร์ต | Masterart",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB091",
    "Category": "เครื่องเขียน",
    "Name": "สีอะคริลิค ตรา บี | Bee Acrylic Color",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB092",
    "Category": "เครื่องเขียน",
    "Name": "สีมุก  (ทอง ) อะคริลิค ตรา บี | BEE Acrylic Color Pearl",
    "Description": "",
    "Price": 90,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB093",
    "Category": "เครื่องเขียน",
    "Name": "สีมุก  (เงิน ) อะคริลิค ตรา บี | BEE Acrylic Color Pearl",
    "Description": "",
    "Price": 90,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB094",
    "Category": "เครื่องเขียน",
    "Name": "สีโปสเตอร์ รุ่น จิตรกรน้อย ตรา มาสเตอร์อาร์ต | Masterart Poster Color",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB095",
    "Category": "เครื่องเขียน",
    "Name": "สีอะคริลิค สะท้อนแสง ตรา เรนาซองซ์ | 20 ML.",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB096",
    "Category": "เครื่องเขียน",
    "Name": "สีอะคริลิค สะท้อนแสง ตรา เรนาซองซ์ |  60 ML.",
    "Description": "",
    "Price": 55,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB097",
    "Category": "เครื่องเขียน",
    "Name": "สีหมึกอินเดียอิงค์ ตรา เคนตัน | Kenton Drawing Ink",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB098",
    "Category": "เครื่องเขียน",
    "Name": "สีมุกอะคริลิค สีดำ ตรา เคนตัน | Kenton 15 ml.",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB099",
    "Category": "เครื่องเขียน",
    "Name": "สีโปสเตอร์ ตรา ซากุระ | Sakura Poster Color",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB100",
    "Category": "เครื่องเขียน",
    "Name": "พู่กันกลม เบอร์ 1",
    "Description": "",
    "Price": 12,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB101",
    "Category": "เครื่องเขียน",
    "Name": "พู่กันกลม เบอร์ 2",
    "Description": "",
    "Price": 16,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB102",
    "Category": "เครื่องเขียน",
    "Name": "พู่กันกลม เบอร์ 3",
    "Description": "",
    "Price": 17,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB103",
    "Category": "เครื่องเขียน",
    "Name": "พู่กันกลม เบอร์ 4",
    "Description": "",
    "Price": 19,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB104",
    "Category": "เครื่องเขียน",
    "Name": "พู่กันกลม เบอร์ 5",
    "Description": "",
    "Price": 22,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB105",
    "Category": "เครื่องเขียน",
    "Name": "พู่กันกลม เบอร์ 6",
    "Description": "",
    "Price": 23,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB106",
    "Category": "เครื่องเขียน",
    "Name": "พู่กันกลม เบอร์ 7",
    "Description": "",
    "Price": 24,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB107",
    "Category": "เครื่องเขียน",
    "Name": "พู่กันกลม เบอร์ 8",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB108",
    "Category": "เครื่องเขียน",
    "Name": "พู่กันกลม เบอร์ 9",
    "Description": "",
    "Price": 34,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB109",
    "Category": "เครื่องเขียน",
    "Name": "พู่กันกลม เบอร์ 10",
    "Description": "",
    "Price": 38,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB110",
    "Category": "เครื่องเขียน",
    "Name": "พู่กันกลม เบอร์ 11",
    "Description": "",
    "Price": 43,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB111",
    "Category": "เครื่องเขียน",
    "Name": "พู่กันกลม เบอร์ 12",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB112",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีขาว เบอร์ 1",
    "Description": "",
    "Price": 12,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB113",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีขาว เบอร์ 4",
    "Description": "",
    "Price": 14,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB114",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีขาว เบอร์ 6",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB115",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีขาว เบอร์ 8",
    "Description": "",
    "Price": 16,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB116",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีขาว เบอร์ 10",
    "Description": "",
    "Price": 17,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB117",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีขาว เบอร์ 12",
    "Description": "",
    "Price": 18,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB118",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีขาว เบอร์ 14",
    "Description": "",
    "Price": 21,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB119",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีขาว เบอร์ 16",
    "Description": "",
    "Price": 24,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB120",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีขาว เบอร์ 18",
    "Description": "",
    "Price": 27,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB121",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีขาว เบอร์ 20",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB122",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีขาว เบอร์ 22",
    "Description": "",
    "Price": 36,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB123",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีขาว เบอร์  24",
    "Description": "",
    "Price": 43,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB124",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีดำ ตรา สง่า มะยุระ เบอร์ 1",
    "Description": "",
    "Price": 11,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB125",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีดำ ตรา สง่า มะยุระ เบอร์  2",
    "Description": "",
    "Price": 16,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB126",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีดำ ตรา สง่า มะยุระ เบอร์ 16",
    "Description": "",
    "Price": 48,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB127",
    "Category": "เครื่องเขียน",
    "Name": "พู่กัน หัวแบน ขนสีดำ ตรา สง่า มะยุระ เบอร์ 24",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB128",
    "Category": "เครื่องเขียน",
    "Name": "จานสีพลาสติกหลุม รูปวงกลม คละสี",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB129",
    "Category": "เครื่องเขียน",
    "Name": "จานสีพลาสติก รูปดอกไม้ คละสี",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB130",
    "Category": "เครื่องเขียน",
    "Name": "กระปุกแบ่งสี พลาสติก สีขาวขุ่น ทรงกลม",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB131",
    "Category": "เครื่องเขียน",
    "Name": "ปากกาเน้นข้อความ คละสี ตรา โยย่า | Yoya Highlighter",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB132",
    "Category": "เครื่องเขียน",
    "Name": "แฟ้มโชว์เอกสาร ขนาด A4 ตรา ช้าง | Elephant PF01 คละสี",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB133",
    "Category": "เครื่องเขียน",
    "Name": "แฟ้มกระดุม ขนาด A4 ตรา ช้าง | Elephant No.421A4 คละสี",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB134",
    "Category": "เครื่องเขียน",
    "Name": "แฟ้มซองขยายข้าง มีเชือผูก ขนาด F4 ตรา ช้าง | Elephant No.431F คละสี",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB135",
    "Category": "เครื่องเขียน",
    "Name": "แฟ้มกระดุม ขนาด A4 ตรา เอลเฟ่น | Elfen No.114A4 คละสี",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB136",
    "Category": "เครื่องเขียน",
    "Name": "กล่องใส่ดินสอ คละสี คละแบบ",
    "Description": "",
    "Price": 30,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB137",
    "Category": "เครื่องเขียน",
    "Name": "แฟ้มสันแคบ กว้าง 3นิ้ว ตรา ช้าง | Elephant No.2100F คละสี",
    "Description": "",
    "Price": 95,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB138",
    "Category": "เครื่องเขียน",
    "Name": "แฟ้มสันแคบ กว้าง 2นิ้ว ตรา ช้าง | Elephant No.2101F คละสี",
    "Description": "",
    "Price": 95,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB139",
    "Category": "เครื่องเขียน",
    "Name": "แฟ้มสันแคบ กว้าง 2นิ้ว/3นิ้ว ตรา ช้าง | Elephant No.2100A4 คละสี",
    "Description": "",
    "Price": 95,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB140",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "เครื่องเย็บกระดาษ ตรา แม็กซ์ | MAX HD-50 คละสี",
    "Description": "",
    "Price": 380,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBB141",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "เครื่องเย็บกระดาษ ตรา ช้าง",
    "Description": "",
    "Price": 380,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB141",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "เครื่องเย็บกระดาษ ตรา แม็กซ์ | MAX HD-88 คละสี",
    "Description": "",
    "Price": 380,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB142",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "เครื่องเย็บกระดาษ ตรา เอลเฟ่น | Elfen No. 10",
    "Description": "",
    "Price": 55,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB143",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "เครื่องเย็บกระดาษ ตรา แม็กซ์ | MAX HD-10",
    "Description": "",
    "Price": 85,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBB144",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "เครื่งเย็บกระดาษ ตราช้าง lE -10f",
    "Description": "",
    "Price": 220,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SBB145",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "เครื่งเย็บกระดาษ ตราแม็กซ์  N 10",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB144",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "เครื่องยิงบอร์ด ตรา เอลเฟ่น | Elfen Ts-610",
    "Description": "",
    "Price": 650,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB145",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "เครื่องยิงบอร์ด ตรา ช้าง | Elephant Ts-13H",
    "Description": "",
    "Price": 850,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB146",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "เครื่องยิงบอร์ด ตรา แม็กซ์ | TG-A คละสี",
    "Description": "",
    "Price": 1800,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB147",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บ ตรา แม็กซ์ | MAX T3-10MB",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB148",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บ ตรา แม็กซ์ | MAX T3-13MB",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB149",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บ ตรา แม็กซ์ | MAX1210 FA-H/ML",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB150",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บ ตรา แม็กซ์ | MAX1213 FA-H/ML",
    "Description": "",
    "Price": 125,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB151",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บ ตรา แม็กซ์ | MAX1215 FA-H/ML",
    "Description": "",
    "Price": 140,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB152",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บ ตรา แม็กซ์ | MAX1217 FA-H/ML",
    "Description": "",
    "Price": 160,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB153",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บกระดาษ ตรา ช้าง | Elephant No.B8",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB154",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บกระดาษ ตรา ช้าง | Elephant No.23/10-H",
    "Description": "",
    "Price": 65,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB155",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดยิงบอร์ด ตรา ช้าง | Elephant No.T-13",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB156",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดยิงบอร์ด ตรา ม้า | Horse T3-10มม",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB157",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บกระดาษ ตรา ม้า | Horse No.1210",
    "Description": "",
    "Price": 67,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB158",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บกระดาษ ตรา โยย่า | Yoya No.10-1M",
    "Description": "",
    "Price": 7,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB159",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บกระดาษ ตรา แม็กซ์ | MAX No.10-1M",
    "Description": "",
    "Price": 12,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB160",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บกระดาษ ตรา แม็กซ์ | MAX No.35-1M",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB161",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บกระดาษ ตรา แม็กซ์ | MAX No.35-5M",
    "Description": "",
    "Price": 75,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SB162",
    "Category": "ลวดเย็บ/เครื่องเย็บกระดาษ",
    "Name": "ลวดเย็บกระดาษ ตรา แม็กซ์ | MAX No.M8-1M",
    "Description": "",
    "Price": 18,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC001",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "หมวกลูกเสือ หมวกปีก (ป.4-ป.6)",
    "Description": "",
    "Price": 60,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC002",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "หมวกลูกเสือ สำรอง (ป.1-ป.3)",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC003",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "หมวกเนตรนารี สีเขียว (ประถม - มัธยม)",
    "Description": "",
    "Price": 55,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC004",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "หมวกลูกเสือ หมวกบาเล่ (ม.1-ม.3)",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC005",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "วอกเกิ้ล เนตรนารี ลูกเสือ สำรอง (ฟองน้ำ)",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC006",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "วอกเกิ้ล เนตรนารี ลูกเสือ กลม",
    "Description": "",
    "Price": 12,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC007",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "วอกเกิ้ล เนตรนารี สามัญ/รุ่นใหญ่",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC008",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "อินธนูติดบ่า เนตรนารี สีเลือดหมู สีเขียว 1คู่ (2อัน)",
    "Description": "",
    "Price": 25,
    "Unit": "คู่",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC009",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ดาวติดหมวก ลูกเสือ เนตรนารี",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC010",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ป้ายเครื่องหมายลูกเสือ",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC011",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ป้ายหมู่ลูกเสือ สามัญรุ่นใหญ่",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC012",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กระเป๋า เครื่องหมายนายหมู่ ลูกเสือสามัญ",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC013",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "พู่ลูกเสือ สีแดงเลือดหมู สีแดงสด สีเขียว 1 คู่ (2อัน) เครื่องแบบลูกเสือสามัญ",
    "Description": "",
    "Price": 25,
    "Unit": "คู่",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC014",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ริบบิ้นสามสี ริบบิ้นประจำหมู่ลูกเสือ",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC015",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เชือกเงื่อน ลูกเสือ เนตรนารี สีแดง สีขาว ยาว 2เมตร",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC016",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "คอซองนักเรียน แบบกระดุม",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC017",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ดอกจัน สีเหลือง ขนาด 6 ซ.ม.",
    "Description": "",
    "Price": 8,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC018",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เข็ม เนตรนารี สามัญ ติดหมวก",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC019",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เข็มกลัดหน้าเสือ ลูกเสือ",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC020",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "หัวเข็มขัด เนตรนารี สีทอง",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC021",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เครื่องหมายธงชาติ ลูกเสือ เนตรนารี",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC022",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ถุงเท้านักเรียนสีน้ำตาล",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC023",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ถุงเท้าลูกเสือ FreeSize",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC024",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ถุงเท้าลูกเสือ ตรา ซุปเปอร์ด็อก | Super Dog FreeSize",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC025",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ถุงเท้าลูกเสือ ( หนาพิเศษ )   ตรา ซุปเปอร์ด็อก | Super Dog FreeSize",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC026",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ถุงเท้านักเรียน ขาวดำ Size 3-5",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC027",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ถุงเท้านักเรียน ขาวดำ Size 4-6",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC028",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ถุงเท้านักเรียน ขาวดำ Size 5-7",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC029",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ถุงเท้านักเรียน ขาวดำ FreeSize",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC030",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ผ้าพันคอลูกเสือ สำรอง ตรา พานทอง นนทบุรี",
    "Description": "",
    "Price": 65,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC031",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "ผ้าพันคอลูกเสือ สีเหลือง ตรา พานทอง นนทบุรี",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC032",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว กุ้น  1 เส้น  ขาจั้ม 24-32",
    "Description": "",
    "Price": 175,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC033",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว กุ้น  1 เส้น  ขาจั้ม 34-40",
    "Description": "",
    "Price": 185,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC034",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว กุ้น  1 เส้น  ขาจั้ม 42-46",
    "Description": "",
    "Price": 195,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC035",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว กุ้น  1 เส้น  ขาปล่อย 24-32",
    "Description": "",
    "Price": 175,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC036",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว กุ้น  1 เส้น  ขาปล่อย 34-40",
    "Description": "",
    "Price": 185,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC037",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว กุ้น  1 เส้น  ขาปล่อย 42-46",
    "Description": "",
    "Price": 195,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC038",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง  2 เส้น  ขาจั้ม 24-32",
    "Description": "",
    "Price": 185,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC039",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง  2 เส้น  ขาจั้ม 34-40",
    "Description": "",
    "Price": 195,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC040",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง  2 เส้น  ขาจั้ม 42-46",
    "Description": "",
    "Price": 205,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC041",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง  2 เส้น  ขาปล่อย 24-32",
    "Description": "",
    "Price": 185,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC042",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง  2 เส้น  ขาปล่อย 34-40",
    "Description": "",
    "Price": 195,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC043",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง  2 เส้น  ขาปล่อย 42-46",
    "Description": "",
    "Price": 205,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC044",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง 1.5 นิ้ว  ขาจั๊ม 24-32",
    "Description": "",
    "Price": 185,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC045",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง 1.5 นิ้ว  ขาจั๊ม 34-40",
    "Description": "",
    "Price": 195,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC046",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง 1.5 นิ้ว  ขาจั๊ม 42-46",
    "Description": "",
    "Price": 205,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC047",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง 1.5 นิ้ว  ขาปล่อย 24-32",
    "Description": "",
    "Price": 185,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC048",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง 1.5 นิ้ว  ขาปล่อย 34-40",
    "Description": "",
    "Price": 195,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC049",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง 1.5 นิ้ว  ขาปล่อย 42-46",
    "Description": "",
    "Price": 205,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC050",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง 2 แถบ  ขาจั๊ม 24-32",
    "Description": "",
    "Price": 210,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC051",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง 2 แถบ ขาจั๊ม 34-40",
    "Description": "",
    "Price": 230,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC052",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง 2 แถบ ขาจั๊ม 42-46",
    "Description": "",
    "Price": 240,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC053",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง 2 แถบ  ขาปล่อย 24-32",
    "Description": "",
    "Price": 210,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC054",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง 2 แถบ ขาปล่อย 34-40",
    "Description": "",
    "Price": 230,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC055",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์ขายาว แถบข้าง 2 แถบ ขาปล่อย 42-46",
    "Description": "",
    "Price": 240,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC056",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์มขาสั้นสีเขียว   size 10-15",
    "Description": "",
    "Price": 155,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC057",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์มขาสั้นกุ้น สีดำ  size 10-15",
    "Description": "",
    "Price": 140,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC058",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์มขาสั้นกุ้น สีกรม  size 10-15",
    "Description": "",
    "Price": 140,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC059",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์มแถบข้าง 2 เส้น  สีดำ size 10-15",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC060",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "กางเกงวอร์มแถบข้าง 2 เส้น  สีกรม size 10-15",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC061",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เสื้อผ้าโทเรสีล้วน 26-36",
    "Description": "",
    "Price": 190,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC062",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เสื้อผ้าโทเรสีล้วน 38-46",
    "Description": "",
    "Price": 200,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC063",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เสื้อผ้าโทเรสีล้วน 48-54",
    "Description": "",
    "Price": 210,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC064",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เสื้อผ้าโทเร 2 สี  26-36",
    "Description": "",
    "Price": 200,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC065",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เสื้อผ้าโทเร 2 สี  38-46",
    "Description": "",
    "Price": 210,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC066",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เสื้อผ้าโทเร2 สี  48-54",
    "Description": "",
    "Price": 220,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC067",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เสื้อผ้าไมโคร ( ผ้ามัน )  26-36",
    "Description": "",
    "Price": 200,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC068",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เสื้อผ้าไมโคร ( ผ้ามัน )  38-46",
    "Description": "",
    "Price": 210,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC069",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เสื้อผ้าไมโคร ( ผ้ามัน )  48-54",
    "Description": "",
    "Price": 220,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC070",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เสื้อผ้าTK 26-36",
    "Description": "",
    "Price": 190,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC071",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เสื้อผ้าTK 38-46",
    "Description": "",
    "Price": 200,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SC072",
    "Category": "เครื่องแต่งกายนักเรียน",
    "Name": "เสื้อผ้าTK  48-54",
    "Description": "",
    "Price": 210,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD001",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 1 สี เส้นมาตรฐาน/ พิมพ์ 1 สี เส้นมาตรฐาน/เส้นคู่ 40แผ่น (1,000 เล่ม)",
    "Description": "",
    "Price": 8.5,
    "Unit": "คู่",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD002",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 1 สี เส้นมาตรฐาน/ พิมพ์ 1 สี เส้นมาตรฐาน/เส้นคู่ 40แผ่น (3,000 เล่ม)",
    "Description": "",
    "Price": 7.5,
    "Unit": "คู่",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD003",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 1 สี เส้นมาตรฐาน/เส้นคู่ 80แผ่น จำนวน  1,000  เล่ม",
    "Description": "",
    "Price": 15.5,
    "Unit": "คู่",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD004",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 1 สี เส้นมาตรฐาน/เส้นคู่ 80แผ่น จำนวน  3,000  เล่ม",
    "Description": "",
    "Price": 14.5,
    "Unit": "คู่",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD005",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 4 สี เส้นมาตรฐาน/เส้นคู่ 40แผ่น จำนวน  3,000  เล่ม",
    "Description": "",
    "Price": 8.5,
    "Unit": "คู่",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD006",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 4 สี เส้นมาตรฐาน/เส้นคู่ 40แผ่น จำนวน  5,000  เล่ม",
    "Description": "",
    "Price": 8,
    "Unit": "คู่",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD007",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 4 สี เส้นมาตรฐาน/เส้นคู่ 80แผ่น จำนวน 3,000 เล่ม",
    "Description": "",
    "Price": 15.5,
    "Unit": "คู่",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD008",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 4 สี เส้นมาตรฐาน/เส้นคู่ 80แผ่น จำนวน 5,000 เล่ม",
    "Description": "",
    "Price": 14.5,
    "Unit": "คู่",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD009",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 1 สี เส้นบรรทัด 5 เส้น 40แผ่นจำนวน  1,000 เล่ม",
    "Description": "",
    "Price": 9.4,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD010",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 1 สี เส้นบรรทัด 5 เส้น 40แผ่นจำนวน  3,000 เล่ม",
    "Description": "",
    "Price": 8.4,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD011",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 1 สี เส้นบรรทัด 5 เส้น 80แผ่นจำนวน  1,000  เล่ม",
    "Description": "",
    "Price": 17.2,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD012",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 1 สี เส้นบรรทัด 5 เส้น 80แผ่น จำนวน  3,000 เล่ม",
    "Description": "",
    "Price": 16.7,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD013",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 1 สี เส้นกราฟ 40 แผ่น จำนวน 1,000 เล่ม",
    "Description": "",
    "Price": 9.7,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD014",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 1 สี เส้นกราฟ 40 แผ่น จำนวน 3,000 เล่ม",
    "Description": "",
    "Price": 0,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD015",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 1 สี เส้นกราฟ 80 แผ่น จำนวน 1,000  เล่ม",
    "Description": "",
    "Price": 18.9,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD016",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดพิมพ์ 1 สี เส้นกราฟ 80 แผ่น จำนวน  3,000 เล่ม",
    "Description": "",
    "Price": 17.9,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD017",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดเส้นกราฟสถิติ คละสี คละลาย",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD018",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดเส้นกราฟ คละสี ปกอ่อน ขนาด 160 x 237มม.",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD019",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดเส้นกราฟ คละสี ปกแข็ง ขนาด 160 x 237มม.",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD020",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดเส้นธรรมดา คั่นหน้าแดง สพฐ. คละลาย",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD021",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดโน๊ต ขนาด เล็ก 70 x 100มม. คละสี",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD022",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดฉีกมีเส้น ตรา บีบี | BB คละสี คละลาย",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD023",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดเล่มรายงาน Report Pad ขนาด A4 คละลาย",
    "Description": "",
    "Price": 20,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD024",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดฉีก กระดาษรายงาน | Elephant ขนาด A4 70แกรม 50แผ่น รุ่น P-101 มีเส้น",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD025",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดทะเบียนหนังสือรับ ปกน้ำเงินเคลือบ",
    "Description": "",
    "Price": 85,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD026",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดปก เคลือบน้ำเงิน 19.3 x 31ซม.",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD027",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดปก เคลือบน้ำเงิน 19.3 x 31ซม.  27 x 38ซม.",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD028",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดบันทึกมุมมัน 4/100 80P ขนาด 26.5 x 37.5 ซม. คละสี",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD029",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดเล่ม รายงาน ขนาด A4 คละลาย",
    "Description": "",
    "Price": 20,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD030",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "บัญชีเรียกชื่อ และ สมุดบันทึกพัฒนาการนักเรียน",
    "Description": "",
    "Price": 130,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD031",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดตรวจราชการ ปกน้ำเงิน",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD032",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "บิลเงินสด ตรา บีบี | BB No.2 V2.",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD033",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "บิลเงินสด ตรา ช้าง | Elephant#1",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD034",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "บิลเงินสด ตรา ช้าง | Elephant#2",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD035",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "บิลเงินสด ตรา ช้าง | Elephant#1",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD036",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "บิลเงินสด ตรา ช้าง | Elephant#4",
    "Description": "",
    "Price": 12,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD037",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "ใบส่งของ ตรา ช้าง | Elephant #2",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD038",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "ใบเสร็จรับเงิน ตรา ทีเค | TK Receipt",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD039",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดกล่าวรายงาน หนังเทียม ตรา พิมพ์ทอง ขนาด A4 คละสี",
    "Description": "",
    "Price": 200,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD040",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดกล่าวรายงาน ผ้าไหม ตรา ครุฑ ขนาด A4",
    "Description": "",
    "Price": 220,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD042",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดวาดเขียน ตรา มาสเตอร์อาร์ต | Masterart J.101",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD043",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดวาดเขียน Enjoy the Colors คละลาย",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD044",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดวาดเขียนปกหนัง 50 แผ่น ตรา เมย์ ฟลาวเวอร์ | Mayflower Artdecor",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD045",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดวาดเขียนปกหนัง 14 แผ่น  ตรา เมย์ ฟลาวเวอร์ | Mayflower Artdecor",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD046",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดวาดเขียน กระดาษปอนด์ 100 แกรม คละลาย",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD047",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดวาดเขียน ชนิดผิวหยาบ R.101 (375 x 555 มม.) ตรา เรนาซองซ์ | Renaissance",
    "Description": "",
    "Price": 200,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD048",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดวาดเขียน ชนิดผิวหยาบ R.102 (275 x 375 มม.)ตรา เรนาซองซ์ | Renaissance",
    "Description": "",
    "Price": 130,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD049",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดวาดเขียน ชนิดผิวเรียบ R.201 (375 x 555 มม.)  ตรา เรนาซองซ์ | Renaissance",
    "Description": "",
    "Price": 210,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD050",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดวาดเขียน ชนิดผิวเรียบ R.202 (275 x 375 มม.)   ตรา เรนาซองซ์ | Renaissance",
    "Description": "",
    "Price": 130,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD134",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดรับประกาศนียบัตร  พร้อมสกรีน ระบุชื่อ โรงเรียน   ขึ้นต่ำ 10-50  เล่ม",
    "Description": "",
    "Price": 200,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD135",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดรับประกาศนียบัตร  พร้อมสกรีน ระบุชื่อ โรงเรียน   ขึ้นต่ำ  50 -100  เล่ม",
    "Description": "",
    "Price": 150,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD136",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดรับประกาศนียบัตร  พร้อมสกรีน ระบุชื่อ โรงเรียน   ขึ้นต่ำ  100  - 300 เล่ม",
    "Description": "",
    "Price": 100,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD137",
    "Category": "สมุด / บิล / ใบเสร็จ",
    "Name": "สมุดรับประกาศนียบัตร  พร้อมสกรีน ระบุชื่อ โรงเรียน   ขึ้นต่ำ  300 เล่ม   ขึ้นไป",
    "Description": "",
    "Price": 0,
    "Unit": "เล่ม",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD051",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวลาเท็กซ์ 4 oz. ตรา ทีโอเอ | TOA",
    "Description": "",
    "Price": 18,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD052",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวลาเท็กซ์ 8 oz. ตรา ทีโอเอ | TOA",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD053",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวลาเท็กซ์ 16 oz. ตรา ทีโอเอ | TOA",
    "Description": "",
    "Price": 40,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD054",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวลาเท็กซ์  32 oz. ตรา ทีโอเอ | TOA",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD055",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวแท่ง สติ๊กโก้  10 G. ตรา ช้าง | Elephant Glue Stick",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD056",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวแท่ง สติ๊กโก้ 22 G. ตรา ช้าง | Elephant Glue Stick",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD057",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวแท่ง สติ๊กโก้ 40 G. ตรา ช้าง | Elephant Glue Stick",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD058",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวแท่ง ตรา ดับเบิ้ลเอ 21 G. | Double A",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD059",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวแท่ง ตรา ดับเบิ้ลเอ 40 G. | Double A",
    "Description": "",
    "Price": 40,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD060",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวน้ำใส ตรา มาสเตอร์อาร์ต | Masterart คละสี",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD061",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวแท่ง 8.2 G. ตรา ยูฮู | Uhu",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD062",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวแท่ง 21 G. ตรา ยูฮู | Uhu",
    "Description": "",
    "Price": 75,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD063",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวแท่ง 40 G. ตรา ยูฮู | Uhu",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD064",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวติดโฟม ตรา ยูฮู พอร์ | Uhu Por",
    "Description": "",
    "Price": 110,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD065",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาววิทยาศาสตร์ สูตรน้ำ ตรา Sticko ช้าง",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD066",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวน้ำใส ตรา ชุนบี | Chunbe",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD067",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ปืนยิงกาวไฟฟ้า ตรา มิตซูชิ | Mitsushi",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD068",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวร้อน ขนาดเล็ก พกพาสะดวก",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD069",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ปืนยิงกาวไฟฟ้า ตรา มิตซูชิ | Mitsushi",
    "Description": "",
    "Price": 100,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD070",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวแท่งเล็ก สำหรับปืนกาว",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD071",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กาวแท่งใหญ่ สำหรับปืนกาว",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD072",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปโฟมกาวสองหน้า 21มม.*1M ตรา สก๊อตช์ | Scotch Foam Tape",
    "Description": "",
    "Price": 65,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD073",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปโฟมกาวสองหน้า 21มม.*3M",
    "Description": "",
    "Price": 135,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD074",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปโฟมกาวสองหน้า 21มม.*5M",
    "Description": "",
    "Price": 210,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD075",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปโฟมกาวสองหน้า 1 นิ้ว x 1 หลา  ตรา หลุยส์เทป | Louis Tape",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD076",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปโฟมกาวสองหน้า 21 มม.x5 ม. ตรา หลุยส์เทป | Louis Tape",
    "Description": "",
    "Price": 100,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD077",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปใสแกน 1 นิ้ว 12มม.*9m. ตรา หลุยส์เทป | Louis Tape",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD078",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปใสแกน 1 นิ้ว 12มม.*33m.  ตรา หลุยส์เทป | Louis Tape",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD079",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปใสแกน 1 นิ้ว 18มม.*33m. ตรา หลุยส์เทป | Louis Tape",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD080",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปใสแกน 1 นิ้ว 24มม.*33m.  ตรา หลุยส์เทป | Louis Tape",
    "Description": "",
    "Price": 40,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD081",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปใสแกน 3 นิ้ว 12มม.*33m.   ตรา หลุยส์เทป | Louis Tape",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD082",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปใสแกน 3 นิ้ว 18มม.*33m.   ตรา หลุยส์เทป | Louis Tape",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD083",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปใสแกน 3 นิ้ว 24มม.*33m.   ตรา หลุยส์เทป | Louis Tape",
    "Description": "",
    "Price": 40,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD084",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวสองหน้า 5 มม.*20 YDS. ตรา แอลพี | LP-Tissue Tape",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD085",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวสองหน้า 12 มม.*20 YDS. ตรา แอลพี | LP-Tissue Tape",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD086",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวสองหน้า 15 มม.*20 YDS. ตรา แอลพี | LP-Tissue Tape",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD087",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวสองหน้า 24 มม.*20 YDS. ตรา แอลพี | LP-Tissue Tape",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD088",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวสองหน้า 36 มม.*20 YDS. ตรา แอลพี | LP-Tissue Tape",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD089",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวสองหน้าติดพรม ตรา ไจแอ้นท์ คิงคอง | Giant Kingkong",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD090",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวสองหน้าแรงยึดติดสูง สำหรับติดชิ้นส่วนรถยนต์ ตรา สก๊อตช์ | Scotch",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD091",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวย่น ตรา อินเตอร์ ขนาด 1.5นิัว | Inter Tape",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD092",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวย่น 6 ชิ้น ตรา อินเตอร์ ขนาด 1.5นิัว | Inter Tape",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD093",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทประวังแตก (Fragile Tape)",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD094",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวผ้าสี ขนาด 1นิ้ว คละสี",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD095",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวผ้าสี ขนาด 1.5นิ้ว คละสี",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD096",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวผ้าสี ขนาด 2นิ้ว คละสี",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD097",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เทปกาวผ้าสี ขนาด 3นิ้ว คละสี",
    "Description": "",
    "Price": 65,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD098",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่นตัดเทป S-02  ตรา ช้าง | Elephant คละสี",
    "Description": "",
    "Price": 60,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD099",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่นตัดเทป L-01  ตรา ช้าง | Elephant คละสี",
    "Description": "",
    "Price": 110,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD100",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่นตัดเทป L-02  ตรา ช้าง | Elephant คละสี",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD101",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่นตัดเทปเล็ก คละสี",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD102",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ปากกาไวท์บอร์ด หัวกลม ตรา ไพล็อท | Pilot",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD103",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ปากกาไวท์บอร์ด หัวกลม 1 กล่อง ตรา ไพล็อท | Pilot",
    "Description": "",
    "Price": 230,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD104",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ปากกาไวท์บอร์ด หัวตัด ตรา ไพล็อท | Pilot",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD105",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ปากกาไวท์บอร์ด หัวตัด 1 กล่อง ตรา ไพล็อท | Pilot",
    "Description": "",
    "Price": 230,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD106",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ปากกาไวท์บอร์ด ตรา ควอนตัม | QuanTum Whiteboard",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD107",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ปากกาเคมี 2 หัว (ด้าม) ตรา ม้า | Horse",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD108",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ปากกาเคมี 2 หัว ( กล่อง ) ตรา ม้า | Horse",
    "Description": "",
    "Price": 180,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD109",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ปากกาไวท์บอร์ด | Whiteboard",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD110",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ปากกาเคมี 2 หัว (ด้าม)  ตรา ช้าง | Elephant Ozone",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD111",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ปากกาเคมี 2 หัว (กล่อง)  ตรา ช้าง | Elephant Ozone",
    "Description": "",
    "Price": 180,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD112",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หมึกเติมแท่นประทับตรา ตรา ม้า | Horse",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD113",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หมึกเติมไวท์บอร์ด ตรา ซากุระ | Sakura",
    "Description": "",
    "Price": 60,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD114",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หมึกเติมปากกาเคมี ตรา ม้า | Horse",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD115",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หมึกเติมปากกาเขียนไวท์บอร์ด ตรา ไพล็อท | Pilot Refill Ink",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD116",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำหมึกชนิดเติม ตรา เอปสัน | Epson 664",
    "Description": "",
    "Price": 280,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD117",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำหมึกชนิดเติม ตรา เอปสัน | Epson 003",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD118",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หมึกพิมพ์  BK ตรา แคนนอน | Canon 790",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD119",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หมึกพิมพ์  M ตรา แคนนอน | Canon 790",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD120",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หมึกพิมพ์  C ตรา แคนนอน | Canon 790",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD121",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หมึกพิมพ์  Y ตรา แคนนอน | Canon 790",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD122",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำหมึกแบบขวด  BT5000c ตรา บราเทอร์ | Brother",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD123",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำหมึกแบบขวด  BT5000Y ตรา บราเทอร์ | Brother",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD124",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำหมึกแบบขวด  BT5000M ตรา บราเทอร์ | Brother",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD125",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำหมึกแบบขวด  BTD 60BKตรา บราเทอร์ | Brother",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD126",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำหมึกแบบขวด  BTD 6000BKตรา บราเทอร์ | Brother",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD127",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่นประทับตราNo.1 (7.4x15ซม.)  ตรา ม้า | Horse",
    "Description": "",
    "Price": 85,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD128",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่นประทับตราNo.2 (7ซม.x11ซม.)   ตรา ม้า | Horse",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD129",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่นประทับตราNo.3 (5.4x8.5ซม.) ตรา ม้า | Horse",
    "Description": "",
    "Price": 40,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD130",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่นประทับตราNo.4 (4.8x7ซม.) ตรา ม้า | Horse",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD131",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ตรายางพิมพ์วันที่ ตรา Shiny Number Stamp",
    "Description": "",
    "Price": 300,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD132",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ตรายางข้อความ ยกเลิก ตรา เมซ่า | Mesa",
    "Description": "",
    "Price": 55,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD133",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ตรายางพิมพ์วันที่ ตรา อีซี่ | E’SY",
    "Description": "",
    "Price": 65,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE001",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กากเพรช ชนิดเนื้อละเอียด",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE002",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กากเพชร สีเงิน ทอง Glitter 100 g.",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE003",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กากเพรช ชนิดเนื้อหยาบ",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE004",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เชือก ดอกไม้ตกแต่งบอร์ด (ชิ้น) คละสี คละลาย",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE005",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ลวดกำมะหยี่ คละสี (เส้น)",
    "Description": "",
    "Price": 2.5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE006",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "สติ๊กเกอร์ รูป ดาวเงิน ดาวทอง",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE007",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระดาษสายรุ้ง 1 นิ้ว กระดาษย่น คละสี",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE008",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระดาษสายรุ้ง 1.5 นิ้ว กระดาษย่น คละสี",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE009",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ธงสีสามเหลี่ยม งานวัด",
    "Description": "",
    "Price": 65,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE010",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระดาษตัดละเอียด เปเปอร์ชู๊ต",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE011",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระดาษตัด เปเปอร์ ชู๊ต รูปสี่เหลี่ยม แบบเงา",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE012",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระพรวน กระดิ่งลูกเล็ก คละสี",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE013",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระดิ่งทอง ระฆังทอง บรรจุ 5 ชิ้น",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE014",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ตัวหนีบไม้ อเนกประสงค์ 4.5x1.2 ซม.",
    "Description": "",
    "Price": 45,
    "Unit": "ตัว",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE015",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ริบบิ้น ผ้าซาติน ขนาด 1 นิ้ว",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE016",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เชือกกระสอบ ยาว 10 หลา",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE017",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ลวดสี สีเงิน สีทอง ยาว 20 หลา",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE018",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ริบบิ้น  12 มม. เนื้อทราย สีเงิน",
    "Description": "",
    "Price": 90,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE019",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ริบบิ้น  1 นิ้ว เนื้อทราย สีเงิน",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE020",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ริบบิ้น ตรา ระฆัง ขนาด 12 มม.",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE021",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เชือกป่าน 10M. หนา 2 มม. สีน้ำตาล เอนกประสงค์",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE022",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เชือกป่าน 50 M. หนา 2.5  มม. สีน้ำตาล เอนกประสงค์",
    "Description": "",
    "Price": 60,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE023",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เชือกป่าน 90 M. หนา 2  มม. สีน้ำตาล เอนกประสงค์",
    "Description": "",
    "Price": 75,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE024",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เชือกขาว (1 ม้วน) เอนกประสงค์ ขนาด 24 เส้น",
    "Description": "",
    "Price": 15,
    "Unit": "ม้วน",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE025",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เชือกขาว (12 ม้วน) เอนกประสงค์ ขนาด 24 เส้น",
    "Description": "",
    "Price": 120,
    "Unit": "ม้วน",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE026",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "โบว์ตะกร้อ เล็ก",
    "Description": "",
    "Price": 3,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE027",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "โบว์ตะกร้อ กลาง",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE028",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "โบว์ตะกร้อ  ใหญ่",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE029",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "โบว์ริบบิ้นสำเร็จรูปสำหรับติดของขวัญ",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE030",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ห่วงสแตนเลส (เล็ก) กลมสีทอง",
    "Description": "",
    "Price": 2,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE031",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ห่วงสแตนเลส (กลาง) กลมสีทอง",
    "Description": "",
    "Price": 3,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE032",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ห่วงสแตนเลส (ใหญ่) กลมสีทอง",
    "Description": "",
    "Price": 4,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE033",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เชือกขาวแดง ขนาดกลาง ตราดอกบัว",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE034",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ป้ายสติกเกอร์อเนกประสงค์ ตรา ม้า | Horse",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE035",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เข็มหมุดหัวมุก ตรา ระฆัง",
    "Description": "",
    "Price": 100,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE036",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เข็มหมุดหัวมุก ตรา ผู้หญิง | Women brand",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE037",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "มีดแกะสลัก มีดคว้าน 001 ตรากีวี",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE038",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เข็มกลัดซ่อนปลาย สีเงิน 6x1 ซม.",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE039",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เข็มกลัดซ่อนปลาย สีเงิน 3x0.5 ซม.",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE040",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เข็มกลัดซ่อนปลาย สีเงิน 2x0.5 ซม.",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE041",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "สติกเกอร์ตัดขอบตกแต่ง สีธรรมดา คละสี",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE042",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ดินน้ำมัน ตรา แพนด้า | Panda คละสี",
    "Description": "",
    "Price": 7,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE043",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ดินน้ำมันไร้สารพิษ คละสี",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE044",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ดินน้ำมัน ตรา ฟูจิ | Fuji คละสี",
    "Description": "",
    "Price": 13,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE045",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แผ่นฟิวเจอร์บอร์ด ขนาด 3 มม. 49 x 55 ซม.",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE046",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แผ่นฟิวเจอร์บอร์ด ขนาด 3 มม. 81 x 65 ซม.",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE047",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แผ่นฟิวเจอร์บอร์ด ขนาด 3 มม. 65 x 122 ซม.",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE048",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "โอเอซิส สีเขียว ปักดอกไม้",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE049",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แผ่นโฟมสีขาว ขนาด 0.5 ซม.",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE050",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แผ่นโฟมสีขาว ขนาด 1 ซม.",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE051",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แผ่นโฟมสีขาว ขนาด 1.5 ซม.",
    "Description": "",
    "Price": 75,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE052",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แผ่นโฟมสีขาว ขนาด 2 ซม.",
    "Description": "",
    "Price": 100,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE053",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แผ่นโฟมสีขาว ขนาด 3ซม.",
    "Description": "",
    "Price": 135,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE054",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระดาษโน๊ตมีกาวในตัว ตรา ดับเบิ้ลเอ | Double A Index Flag",
    "Description": "",
    "Price": 50,
    "Unit": "ตัว",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE055",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระดาษโน๊ตมีกาวในตัว ขนาด 50*12 มม. ตรา ดับเบิ้ลเอ | Double A Paper Index",
    "Description": "",
    "Price": 50,
    "Unit": "ตัว",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE056",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระดาษโน๊ตมีกาวในตัว  ขนาด 3*3 นิ้ว ลูกเต๋า ตรา โพสต์-อิท | Post-it Super Sticky",
    "Description": "",
    "Price": 150,
    "Unit": "ตัว",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE057",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระดาษโน๊ตมีกาวในตัวขนาด 3 x 3 นิ้ว  ตรา Xingli Sticky Notes S1-3",
    "Description": "",
    "Price": 25,
    "Unit": "ตัว",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE058",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระดาษโน๊ตมีกาวในตัว  ขนาด 15*50 มม.ตรา เบนน่อน | Bennon Index & Notes",
    "Description": "",
    "Price": 35,
    "Unit": "ตัว",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE059",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระดาษโน๊ตมีกาวในตัว  40*15 มม. ตรา JingMei ขนาด",
    "Description": "",
    "Price": 35,
    "Unit": "ตัว",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE060",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กระดาษโน๊ตมีกาวในตัว  40*15 มม. เนื้อดี",
    "Description": "",
    "Price": 0,
    "Unit": "ตัว",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE061",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่งสันรูด ขนาด 3มม.  (ชิ้น)",
    "Description": "",
    "Price": 7,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE062",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่งสันรูด ขนาด 3มม.  (12 ชิ้น)",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE063",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่งสันรูด ขนาด 5 มม.  (ชิ้น)",
    "Description": "",
    "Price": 8,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE064",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่งสันรูด ขนาด 5 มม.  (12 ชิ้น)",
    "Description": "",
    "Price": 40,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE065",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่งสันรูด ขนาด 7 มม.  (ชิ้น)",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE066",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่งสันรูด ขนาด 7 มม.  (12 ชิ้น)",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE067",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่งสันรูด ขนาด 10 มม.  (ชิ้น)",
    "Description": "",
    "Price": 12,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE068",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่งสันรูด ขนาด 10 มม.  (12 ชิ้น)",
    "Description": "",
    "Price": 60,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE069",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่งสันรูด ขนาด 15 มม.  (ชิ้น)",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE070",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่งสันรูด ขนาด 15 มม.  (12 ชิ้น)",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE071",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่งสันรูด ขนาด 17 มม.  (ชิ้น)",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE072",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แท่งสันรูด ขนาด 17 มม.  (12 ชิ้น)",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE073",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กรรไกร  6 นิ้ว ตรา คนป่า | Barbarian Head",
    "Description": "",
    "Price": 60,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE074",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กรรไกร  7.5 นิ้ว ตรา คนป่า | Barbarian Head",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE075",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กรรไกร  9 นิิ้ว ตรา คนป่า | Barbarian Head",
    "Description": "",
    "Price": 95,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE076",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กรรไกร  8 นิ้ว ตรา เอลเฟ่น | Elfen",
    "Description": "",
    "Price": 40,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE077",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กรรไกร  9 นิ้ว ตรา เอลเฟ่น | Elfen",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE078",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กรรไกร 6.5 ตรา ช้าง | Elephant OFE0265",
    "Description": "",
    "Price": 40,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE079",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กรรไกร ตรา ช้าง | Elephant School & Children คละสี",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE080",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กรรไกร (เล็ก) ตรา สก๊อต | Scotch",
    "Description": "",
    "Price": 55,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE081",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กรรไกร (กลาง) ตรา สก๊อต | Scotch",
    "Description": "",
    "Price": 65,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE082",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กรรไกร (ใหญ่)  ตรา สก๊อต | Scotch",
    "Description": "",
    "Price": 75,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE083",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คัตเตอร์ ตรา ฟักทอง | Pumpkin S-101XT คละสี",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE084",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คัตเตอร์ ตรา ม้า | Horse H-404 คละสี",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE085",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คัตเตอร์ 1801 ตรา ช้าง | Elephant",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE086",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คัตเตอร์ SK-5 ตรา ฟักทอง | Pumpkin",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE087",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คัตเตอร์ ST-101ตรา ฟักทอง |  Pumpkin",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE088",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คัตเตอร์ ตรา ช้าง | Elephant S-902",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE089",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คัตเตอร์ S-1801 ตรา ช้าง | Elephant",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE090",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คัตเตอร์ S-901 ตรา ช้าง | Elephant",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE091",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ใบมีดคัตเตอร์  930 ตรา ช้าง | Elephant",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE092",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ใบมีดคัตเตอร์  1845 ตรา ช้าง | Elephant",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE093",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ใบมีดคัตเตอร์ ST-150A ตรา ไฮโปร | HI-PRO",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE094",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ใบมีดคัตเตอร์ R-105S ตรา ฟักทอง | Pumpkin",
    "Description": "",
    "Price": 30,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE095",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ใบมีดคัตเตอร์R-105L ( แพ็ค)   ตรา ฟักทอง | Pumpkin",
    "Description": "",
    "Price": 35,
    "Unit": "แพ็ค",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SE096",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ใบมีดคัตเตอร์ R-105L (ชิ้น) ตรา ฟักทอง | Pumpkin",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF001",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำยาถูพื้นกลิ่นลิลลี่ บูเก้ ตรา มาจิคลีน Magiclean 5 ลิตร",
    "Description": "",
    "Price": 230,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF002",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไม้ปัดฝุ่น ไม้ขนไก่ แม่กลาง",
    "Description": "",
    "Price": 135,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF003",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไม้กวาดดอกหญ้า ด้ามยาว",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF004",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไม้กวาดดอกหญ้า ด้ามพลาสติก",
    "Description": "",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF005",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แปรงขัดด้ามยาว 120 ซม.",
    "Description": "",
    "Price": 95,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF006",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แปรงขัดมือ",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF007",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำยาล้างห้องน้ำ (ขวด) ตรา เป็ด โปร | Duck Pro",
    "Description": "",
    "Price": 55,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF008",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำยาล้างห้องน้ำ (ลัง) ตรา เป็ด โปร | Duck Pro",
    "Description": "",
    "Price": 540,
    "Unit": "ลัง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF009",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไม้กวาดทางมะพร้าว",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF010",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ที่ตักขยะ พลาสติก คละสี",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF011",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไม้ถูพื้น 10 นิ้ว (ด้าม)",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF012",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไม้ถูพื้น  12 นิ้ว (ด้าม)",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF013",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไม้ปาดน้ำพื้น ไม้รีดน้ำ 24 นิ้ว",
    "Description": "",
    "Price": 220,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF014",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ถุงขยะดำทุกขนาด (กิโลกร้ม)",
    "Description": "",
    "Price": 55,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF015",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แปรงขัดห้องน้ำ (หัวกลม)  พลาสติก คละสี",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF016",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แปรงขัดห้องน้ำ พลาสติก คละสี",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF017",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำยาเช็ดกระจก ตรา คิงส์ สเตลล่า | king’s stella",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF018",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำยาเช็ดกระจก ตรา มิสเตอร์มัสเซิล | MC.muscle",
    "Description": "",
    "Price": 75,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF019",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ผ้าไมโครไฟเบอร์",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF020",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ฟองน้ำ (ธรรมดา) อเนกประสงค์",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF021",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ฟองน้ำ (3 M) อเนกประสงค์",
    "Description": "",
    "Price": 15,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF022",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำยาล้างจาน 145 มล. (ขวด) ตรา ซันไลต์",
    "Description": "",
    "Price": 12,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF023",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำยาล้างจาน 280  มล. (ถุง) ตรา ซันไลต์",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF024",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำยาล้างจาน 300 มล. (ถุง) ตรา ซันไลต์",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF025",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำยาล้างจาน 485 มล. (ขวด) ตรา ซันไลต์",
    "Description": "",
    "Price": 37,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF026",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำยาล้างจาน 500 มล. (ถุง) ตรา ซันไลต์",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF027",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "น้ำยาล้างจาน 3,200 มล. (แกลอน) ตรา ซันไลต์",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF028",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ผงซักฟอก (ถัง)ตรา เปา เอ็มวอช 8 กก.",
    "Description": "",
    "Price": 450,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SF029",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ผงซักฟอก  (ถัง) ตรา บรีส เมติก 7.5 กก.",
    "Description": "",
    "Price": 470,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG001",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หัวแร้งบัดกรี DE-888 ด้ามปืน ตรา ไวร์แมน | Wireman",
    "Description": "",
    "Price": 90,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG002",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ฟิล์มเคลือบบัตร ( กล่อง) ตรา ช้าง | Elephant",
    "Description": "",
    "Price": 80,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG003",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "พลาสติกเคลือบบัตร ขนาด 60x 90 MM.",
    "Description": "",
    "Price": 60,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG004",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "พลาสติกเคลือบบัตร ขนาด 111 x 154  MM.",
    "Description": "",
    "Price": 220,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG005",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "พลาสติกเคลือบบัตร ขนาด 216 x 303  MM.",
    "Description": "",
    "Price": 350,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG006",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คลิปบอร์ด A4 กระดานรองเอกสาร คละสี",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG007",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คลิปบอร์ดA5 กระดานรองเอกสาร คละสี",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG008",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คลิปบอร์ด ตรา ม้า | Horse H-035",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG009",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คลิปบอร์ด กระดานรองเอกสารลายการ์ตูน คละสี คละลาย ขนาด A4",
    "Description": "",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG010",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คลิปดำ 2 ขา 112 BC-20 (8มม.)   ตรา เอลเฟ่น | Elfen",
    "Description": "",
    "Price": 18,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG011",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คลิปดำ 2 ขา 111 BC-30 (10มม.)  ตรา เอลเฟ่น | Elfen",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG012",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คลิปดำ 2 ขา 110 BC-50 (12มม.)  ตรา เอลเฟ่น | Elfen",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG013",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คลิปดำ 2 ขา 109 BC-70 (17.5มม.)  ตรา เอลเฟ่น | Elfen",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG014",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คลิปดำ 2 ขา 108 BC-100 (22มม.)   ตรา เอลเฟ่น | Elfen",
    "Description": "",
    "Price": 75,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG015",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คลิปดำ 2 ขา No.410 / No.113 ตรา ม้า | Horse No.410 / No.113",
    "Description": "",
    "Price": 16,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG016",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เครื่องเจาะรูกระดาษ ตรา deli No.0133",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG017",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ลิ้นแฟ้มพลาสติก ตรา อีซี่ | E‘SY No.E-402",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG018",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เข็มหมุด (กล่อง) ตรา ไดม่อน | Diamond",
    "Description": "",
    "Price": 5,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG019",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เข็มหมุด (แพ็ค) ตรา ไดม่อน | Diamond",
    "Description": "",
    "Price": 45,
    "Unit": "แพ็ค",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG020",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เข็มกระทง ตรา ม้า | Horse Brand",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG021",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เป๊กทองเหลือง 2 ขา No.8 1.5 นิ้ว ตรา เครื่องบิน",
    "Description": "",
    "Price": 16,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG022",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หมุดปักเอนกประสงค์  5817 ตรา เบนน่อน Bennon",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG023",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เป็กกดขาสั้น ตรา ไฮโปร | Hi-Pro",
    "Description": "",
    "Price": 10,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG024",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ลิ้นแฟ้มโลหะสีเงิน ตรา ออร์ก้า | Orca",
    "Description": "",
    "Price": 45,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG025",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ตัวหนีบฉากสแตนเลส  ขนาด 64 มม. (ตัว)",
    "Description": "",
    "Price": 20,
    "Unit": "ตัว",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG026",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ตัวหนีบฉากสแตนเลส ขนาด 64 มม. (แพ็ค)",
    "Description": "",
    "Price": 85,
    "Unit": "ตัว",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG027",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ตัวหนีบฉากสแตนเลส ขนาด 160 มม.",
    "Description": "",
    "Price": 60,
    "Unit": "ตัว",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG028",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แว่นขยายเล็ก ขนาดพกพา",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG029",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "สายคล้องคอห้อยบัตร สายคล้องคอ ยืดได้",
    "Description": "",
    "Price": 55,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG030",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ซองใส่บัตร ขนาดมาตรฐาน",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG031",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "สายคล้องคอ",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG032",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ป้ายอะคริลิกใส่ป้ายชื่อ",
    "Description": "",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG033",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ป้ายอะคริลิกใส ใส่ป้ายชื่อ ขนาด 4*6นิ้ว",
    "Description": "",
    "Price": 65,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG034",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ป้ายอะคริลิกใส ใส่ป้ายชื่อ ขนาด 2.5*1.5นิ้ว",
    "Description": "",
    "Price": 65,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG035",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "AA200   ป้ายชื่อติดหน้าอก (ชิ้น)   พลาสติกแข็ง",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG036",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "AA200 ป้ายชื่อติดหน้าอก พลาสติกแข็งกล่องละ 50 ชิ้น",
    "Description": "",
    "Price": 250,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG037",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "นกหวีด ตรา แอคมี่ | Aซม.e No. 560 คละสี",
    "Description": "",
    "Price": 20,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG038",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กุญแจล็อคสายสั้น Extra -CR  40 ยี่ห้อ Bliss รุ่น Heavy Duty Lock",
    "Description": "",
    "Price": 60,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG039",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กุญแจล็อคสายสั้น Extra -CR  50 ยี่ห้อ Bliss รุ่น Heavy Duty Lock",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG040",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กุญแจล็อคสายยาวExtra -CR  40 ยี่ห้อ Bliss รุ่น Heavy Duty Lock",
    "Description": "",
    "Price": 65,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SG041",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "กุญแจล็อคสายยาวExtra -CR  50 ยี่ห้อ Bliss รุ่น Heavy Duty Lock",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD138",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ขลุ่ย ขลุ่ยไทย ขลุ่ยเพียงออ พลาสติกอย่างดี",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD139",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไม้กลอง   CMC  5 A   ( 1 คู่)",
    "Description": "",
    "Price": 220,
    "Unit": "คู่",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD140",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไม้ตีขิม",
    "Description": "",
    "Price": 200,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD141",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ตะกั่วระนาด 1 กิโล",
    "Description": "",
    "Price": 650,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD142",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เชือกฆ้องระนาด  1 ม้วน ( รอบวง )",
    "Description": "",
    "Price": 850,
    "Unit": "ม้วน",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SH001",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ลูกปิงปอง (ลูก) ตรา คราวน์ สตาร์ | Crown Star",
    "Description": "",
    "Price": 5,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SH002",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ลูกปิงปอง (กล่อง) ตรา คราวน์ สตาร์ | Crown Star",
    "Description": "",
    "Price": 25,
    "Unit": "กล่อง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SH003",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ลูกปิงปอง (ลูก)  ตรา สแตนดาร์ด โปรสตาร์ | Standard Pro Star",
    "Description": "",
    "Price": 25,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SH004",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไม้ปิงปองแชมป์เปี้ยน Champion 2 ด้าน แดง/ดำ",
    "Description": "",
    "Price": 65,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SH005",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ลูกปิงปอง ตรา สแตนดาร์ด โปรสตาร์ | Standard Pro Star",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SH006",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ตะกร้อใยสังเคราะห์ ตรา มาราธอน | Marathon MT.201",
    "Description": "",
    "Price": 310,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SH007",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ลูกเทนนิส ตรา Spider Tennis Ball",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SH008",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เชือกกระโดด ตรา ไมโคร | Micro S.T.R",
    "Description": "",
    "Price": 80,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SH009",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ลูกขนไก่ (แพ็ค) ตรา คราวน์ สตาร์ | Crown Star C-60",
    "Description": "",
    "Price": 230,
    "Unit": "แพ็ค",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SH010",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ลูกฟุตบอล (สำหรับผู้ใหญ่) | 21.5 ซม PVC",
    "Description": "",
    "Price": 290,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI001",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "Dell Optical Wired Mouse รุ่น MS116",
    "Description": "",
    "Price": 200,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI002",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "Lecoo WS203 สีดำ",
    "Description": "",
    "Price": 220,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI003",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "HP M10 Wired Mouse",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI004",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เมาส์ไร้สาย HP S1000 Plus",
    "Description": "",
    "Price": 300,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI005",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เมาส์ไร้สาย Logitech B170 สีดำ",
    "Description": "",
    "Price": 320,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI006",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เมาส์ไร้สายไร้เสียง Mouse",
    "Description": "",
    "Price": 160,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI007",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "Signo WM-121 คือเมาส์ไร้สาย (Wireless Mouse)",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI008",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "เมาส์ออปติคัล USB รุ่น MO-270BR สีดำ/แดง จาก Signo",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI009",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "Anitech J235 Black สำหรับ PC",
    "Description": "",
    "Price": 320,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI010",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "จอยสติ๊กเกมมิ่งแบบมีสาย Oker U-706",
    "Description": "",
    "Price": 170,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI011",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หูฟังเกมมิ่ง EGA LITE รุ่น H112",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI012",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หูฟัง HP Stereo Headset DHH-1601 สีดำ",
    "Description": "",
    "Price": 280,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI013",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หูฟังเกมมิ่ง Signo E-Sport HP-829 Mixxer สีดำ",
    "Description": "",
    "Price": 620,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI014",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หูฟังเกมมิ่ง EGA Type H15",
    "Description": "",
    "Price": 459,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI015",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "หูฟังเกมมิ่ง Fantech HG20 RGB Chief II",
    "Description": "",
    "Price": 690,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI016",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไมโครโฟน Nubwo M33 Multimedia",
    "Description": "",
    "Price": 295,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI017",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไมโครโฟน Nubwo M33 Multimedia",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI018",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ไมโครโฟน EGA Type MC5",
    "Description": "",
    "Price": 295,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI019",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คีย์บอร์ดมาตรฐานแบบมีสาย Anitech P202",
    "Description": "",
    "Price": 295,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI020",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คีย์บอร์ดมัลติมีเดียมีไฟพื้นหลัง Oker รุ่น VA-59 Vampire",
    "Description": "",
    "Price": 290,
    "Unit": "ลัง",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI021",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คีย์บอร์ดแบบมีสาย Logitech K120",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI022",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แป้นพิมพ์ Signo รุ่น KB-83 Besico",
    "Description": "",
    "Price": 230,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI023",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "คีย์บอร์ดมัลติมีเดียแบบมีสาย Dell KB216 สีดำ",
    "Description": "",
    "Price": 265,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI024",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ชุดคีย์บอร์ดและเมาส์ไร้สายนี้คือ SIGNO KW-770+WM107BLK",
    "Description": "",
    "Price": 450,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI025",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ชุดคีย์บอร์ดและเมาส์ไร้สาย AULA AC308 สีดำ",
    "Description": "",
    "Price": 490,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI026",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ชุดคีย์บอร์ดและเมาส์ไร้สาย SMILE G5000 สีดำ",
    "Description": "",
    "Price": 390,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI027",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ชุดคีย์บอร์ดและเมาส์ไร้สาย Oker K-91",
    "Description": "",
    "Price": 285,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI028",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ชุดคอมโบไร้สายคีย์บอร์ดและเมาส์ Nubwo NKM636",
    "Description": "",
    "Price": 295,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI029",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ชุดคอมโบไร้สายคีย์บอร์ดและเมาส์ Nubwo NKM633",
    "Description": "",
    "Price": 245,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI030",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "Fantech Arthas GS733",
    "Description": "",
    "Price": 290,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI031",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "Fantech Arthas GS 202",
    "Description": "",
    "Price": 520,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI032",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "Microlab U210 ซึ่งเป็นลำโพงมัลติมีเดียระบบเสียง 2.1 แชนเนล",
    "Description": "",
    "Price": 650,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI033",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "ลำโพงเกมมิ่งแบบมีสาย AULA N-521",
    "Description": "",
    "Price": 420,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI034",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "GLINK LAN CABLE  2 M. GLINK-06 สีขาวCAT6 สายแลน",
    "Description": "",
    "Price": 35,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI035",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "GLINK LAN CABLE  5 M. GLINK-06 สีขาวCAT6 สายแลน",
    "Description": "",
    "Price": 50,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI036",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "GLINK LAN CABLE  10 M. GLINK-06 สีขาวCAT6 สายแลน",
    "Description": "",
    "Price": 70,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI037",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "สาย USB GLINK LAN 3M.",
    "Description": "",
    "Price": 60,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI038",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "Cable Dvi To Dvi 24+1 M/M 3 m #365 D",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI039",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "สายแยกสัญญาณ Cable Sound PC TO SPK  M/M 1:2  (1.5M) GLINK Gold GLDC001",
    "Description": "",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI040",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "สายแยกสัญญาณ Cable Sound PC TO SPK  M/M 1:2  (1.5M) GLINK Gold GLDC001",
    "Description": "",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI041",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "KABEL HDMI TV TO HDMI 1.5M KABEL",
    "Description": "",
    "Price": 100,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI042",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "KABEL HDMI TV TO HDMI 3 M KABEL",
    "Description": "",
    "Price": 130,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI043",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "KABEL HDMI TV TO HDMI 5 M KABEL",
    "Description": "",
    "Price": 180,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI044",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "KABEL HDMI TV TO HDMI 10 M KABEL",
    "Description": "",
    "Price": 200,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI045",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "Cable HDTV 10 M.4K (V.2.0) M/M  GLINK GL201 สายถัก",
    "Description": "",
    "Price": 280,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI046",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "Cable HDTV 15 M.4K (V.2.0) M/M  GLINK GL201 สายถัก",
    "Description": "",
    "Price": 400,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI047",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "UGREEN DisplayPort 1.4 Cable 8K 4K HDR 165Hz 60Hz Display",
    "Description": "",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI048",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "UGREEN รุ่น HD127 Micro HDMI to HDMI Cable 10.2 Gbps 1.5M",
    "Description": "",
    "Price": 300,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI049",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "LAN CABLE (สายแลน)  5 M. UGREEN CAT 6 ROUND ETHERNET CABLE 1M (BLACK) (20159)",
    "Description": "",
    "Price": 150,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI050",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "LAN CABLE (สายแลน)  10 M. UGREEN CAT 6 ROUND ETHERNET CABLE 1M (BLACK) (20159)",
    "Description": "",
    "Price": 260,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI051",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "D-Link DES-1005C แบบ 5 พอร์ต",
    "Description": "",
    "Price": 320,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI052",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "D-Link DGS-1008A สวิตช์เดสก์ท็อป Gigabit 8 พอร์ต",
    "Description": "",
    "Price": 800,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI053",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "Mercusys MS105GS 5-Port Gigabit Desktop Switch",
    "Description": "",
    "Price": 450,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI054",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "TP-Link LS1005G LiteWave 5-Port Gigabit Desktop Switch",
    "Description": "",
    "Price": 300,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI055",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "TP-Link LS1005G LiteWave 8-Port Gigabit Desktop Switch",
    "Description": "",
    "Price": 350,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI056",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "TP-Link LS1008G 5-Port Gigabit Desktop Switch",
    "Description": "",
    "Price": 450,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI057",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "TP-Link LS1008G 8-Port Gigabit Desktop Switch",
    "Description": "",
    "Price": 750,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI058",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "การ์ดหน่วยความจำ  32GB SanDisk Ultra microSDHC",
    "Description": "",
    "Price": 160,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI059",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "Micro   8GB SDHC ของ BlackBerry ความจุ:",
    "Description": "",
    "Price": 120,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI060",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แฟลชไดรฟ์ 32 GB USB SanDisk Cruzer Blade",
    "Description": "",
    "Price": 160,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI061",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แฟลชไดรฟ์  64 GB Kingston DataTraveler Exodia Onyx",
    "Description": "",
    "Price": 220,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI062",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "แฟลชไดรฟ์   128GB Kingston DataTraveler Exodia Onyx",
    "Description": "",
    "Price": 320,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD143",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "SanDisk micro SDHC 32 GB",
    "Description": "",
    "Price": 160,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD144",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "SanDisk micro SDHC 64GB",
    "Description": "",
    "Price": 220,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SD145",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "SanDisk micro SDHC 128 GB",
    "Description": "",
    "Price": 300,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI063",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "TP-Link TL-WN821N 300Mbps",
    "Description": "",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "SI064",
    "Category": "กาว/ดินน้ำมัน/ปืนกาว",
    "Name": "TP-Link AC600 Nano Wireless USB Adapter (รุ่น Archer T2U Nano)",
    "Description": "",
    "Price": 500,
    "Unit": "ชิ้น",
    "Stock": 100,
    "ImageURL": ""
  },
  {
    "ID": "PHOTO001",
    "Category": "งานบริการ",
    "Name": "บริการถ่ายเอกสารขาว/ดำ ขนาด A4",
    "Description": "ถ่ายเอกสารบัตรประชาชน ทะเบียนบ้าน เอกสารทั่วไป ขนาด A4 (1 ต้นฉบับ 100 แผ่นขึ้นไป แผ่นละ 0.5 บาท)",
    "Price": 1,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "PHOTO002",
    "Category": "งานบริการ",
    "Name": "บริการถ่ายเอกสารขาว/ดำ ขนาด F14",
    "Description": "บริการถ่ายเอกสารขาวดำ ขนาด F14",
    "Price": 2,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "PHOTO003",
    "Category": "งานบริการ",
    "Name": "บริการถ่ายเอกสารขาว/ดำ ขนาด B4",
    "Description": "บริการถ่ายเอกสารขาวดำ ขนาด B4",
    "Price": 2,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "PHOTO004",
    "Category": "งานบริการ",
    "Name": "บริการถ่ายเอกสารขาว/ดำ ขนาด A3",
    "Description": "บริการถ่ายเอกสารขาวดำ ขนาด A3",
    "Price": 3,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "PHOTO005",
    "Category": "งานบริการ",
    "Name": "บริการถ่ายเอกสารสี ขนาด A4",
    "Description": "บริการถ่ายเอกสารสีสันคมชัด ขนาด A4",
    "Price": 10,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "PHOTO006",
    "Category": "งานบริการ",
    "Name": "บริการปริ้นท์/ถ่ายเอกสาร ขาวดำ ขนาด A4",
    "Description": "บริการปริ้นท์หรือถ่ายเอกสารขาวดำคุณภาพมาตรฐาน ขนาด A4",
    "Price": 3,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "PHOTO007",
    "Category": "งานบริการ",
    "Name": "บริการปริ้นท์/ถ่ายเอกสาร ขาวดำ ขนาด A3",
    "Description": "บริการปริ้นท์หรือถ่ายเอกสารขาวดำคุณภาพมาตรฐาน ขนาด A3",
    "Price": 5,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "PHOTO008",
    "Category": "งานบริการ",
    "Name": "บริการปริ้นท์/ถ่ายเอกสาร สี ขนาด A4 (สีเล็กน้อย)",
    "Description": "บริการปริ้นท์หรือถ่ายเอกสารสี ขนาด A4 ที่มีปริมาณการพิมพ์สีเล็กน้อย",
    "Price": 5,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "PHOTO009",
    "Category": "งานบริการ",
    "Name": "บริการปริ้นท์/ถ่ายเอกสาร สี ขนาด A4 (รูปภาพ + ตัวอักษร)",
    "Description": "บริการปริ้นท์หรือถ่ายเอกสารสี ขนาด A4 ที่มีทั้งรูปภาพและข้อความ",
    "Price": 8,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "PHOTO010",
    "Category": "งานบริการ",
    "Name": "บริการปริ้นท์/ถ่ายเอกสาร สี ขนาด A4 (รูปภาพ 2 รูป)",
    "Description": "บริการปริ้นท์หรือถ่ายเอกสารสี ขนาด A4 ที่มีรูปภาพหลัก 2 ภาพ",
    "Price": 10,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "PHOTO011",
    "Category": "งานบริการ",
    "Name": "บริการปริ้นท์/ถ่ายเอกสาร สี ขนาด A4 (สีเต็มแผ่น)",
    "Description": "บริการปริ้นท์หรือถ่ายเอกสารสี ขนาด A4 เต็มแผ่น เหมาะกับงานโฆษณา/โปสเตอร์",
    "Price": 20,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "PHOTO012",
    "Category": "งานบริการ",
    "Name": "บริการปริ้นท์/ถ่ายเอกสาร สี ขนาด A3",
    "Description": "บริการปริ้นท์หรือถ่ายเอกสารสี ขนาด A3 ปรับราคาขึ้นเป็น 1 เท่าของ A4 ตามประเภทงานพิมพ์",
    "Price": 0,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "PHOTO013",
    "Category": "งานบริการ",
    "Name": "บริการถ่ายรูปด่วน (1 โหล)",
    "Description": "บริการถ่ายรูปด่วนขนาด 1 นิ้ว / 1.5 นิ้ว / 2 นิ้ว จำนวน 1 โหล ฟรีบริการตัดต่อสูทและเปลี่ยนฉากหลัง",
    "Price": 100,
    "Unit": "โหล",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "BIND001",
    "Category": "งานบริการ",
    "Name": "เข้าเล่ม สันกาว",
    "Description": "บริการเข้าเล่มไสกาวแบบหนังสือ ทนทาน สวยงาม เริ่มต้น 70 บาท",
    "Price": 70,
    "Unit": "เล่ม",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "BIND002",
    "Category": "งานบริการ",
    "Name": "เข้าเล่ม สันรูด",
    "Description": "บริการเข้าเล่มแบบสันรูดพลาสติก เหมาะสำหรับเอกสารรายงานทั่วไป เริ่มต้น 10 บาท",
    "Price": 10,
    "Unit": "เล่ม",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "BIND003",
    "Category": "งานบริการ",
    "Name": "เข้าเล่ม กระดูกงู",
    "Description": "บริการเข้าเล่มแบบห่วงพลาสติกกระดูกงู เปิดกางได้ 180 องศา เริ่มต้น 20 บาท",
    "Price": 20,
    "Unit": "เล่ม",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "BIND004",
    "Category": "งานบริการ",
    "Name": "เข้าเล่ม เย็บแม็กซ์ / แล็คซีน",
    "Description": "บริการเข้าเล่มเย็บลวด มุงหลังคา ปิดสันด้วยเทปแลคซีน เริ่มต้น 10 บาท",
    "Price": 10,
    "Unit": "เล่ม",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "BIND005",
    "Category": "งานบริการ",
    "Name": "บริการแผ่นใสสำหรับงานเข้าเล่ม",
    "Description": "บริการเสริมเพิ่มแผ่นใสปกหน้า-หลังของรายงาน/เอกสาร",
    "Price": 10,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "SOLAR001",
    "Category": "งานบริการ",
    "Name": "ติดตั้งระบบ Solar Cell 3.0 kW",
    "Description": "ประหยัดไฟ 1,500-1,800 บาท/เดือน ฟรีค่าสำรวจหน้างาน/คลีนแผง 2 ปี รับประกันแผง 25 ปี อินเวอร์เตอร์ 10 ปี (Huawei Inverter 3kW 1 ตัว, แผง Mono half 625W 6 แผง, ชุด Mounting 1 ชุด, Smart Power sensor 1 ชุด)",
    "Price": 110000,
    "Unit": "ชุด",
    "Stock": 99,
    "ImageURL": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "SOLAR002",
    "Category": "งานบริการ",
    "Name": "ติดตั้งระบบ Solar Cell 5.0 kW (1 Phase)",
    "Description": "ประหยัดไฟ 3,500 บาท/เดือน ฟรีค่าสำรวจหน้างาน/คลีนแผง 2 ปี รับประกันแผง 25 ปี อินเวอร์เตอร์ 10 ปี (Huawei Inverter 5kW 1 ตัว, แผง Mono half 625W 9 แผง, ชุด Mounting 1 ชุด, Smart Power sensor 1 ชุด)",
    "Price": 130000,
    "Unit": "ชุด",
    "Stock": 99,
    "ImageURL": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "SOLAR003",
    "Category": "งานบริการ",
    "Name": "ติดตั้งระบบ Solar Cell 5.0 kW (3 Phase)",
    "Description": "ประหยัดไฟ 3,500 บาท/เดือน ฟรีค่าสำรวจหน้างาน/คลีนแผง 2 ปี รับประกันแผง 25 ปี (Huawei Inverter 5kW 1 ตัว, แผง Mono half 625W 9 แผง, ชุด Mounting 1 ชุด, Smart Power sensor 1 ชุด)",
    "Price": 160000,
    "Unit": "ชุด",
    "Stock": 99,
    "ImageURL": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "SOLAR004",
    "Category": "งานบริการ",
    "Name": "ติดตั้งระบบ Solar Cell 10.0 kW",
    "Description": "ประหยัดไฟ 6,000 บาท/เดือน ฟรีค่าสำรวจหน้างาน/คลีนแผง 2 ปี รับประกันแผง 25 ปี (Huawei Inverter 10kW 1 ตัว, แผง Mono half 625W 18 แผง, ชุด Mounting 1 ชุด, Smart Power sensor 1 ชุด)",
    "Price": 259000,
    "Unit": "ชุด",
    "Stock": 99,
    "ImageURL": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "SERV001",
    "Category": "งานบริการ",
    "Name": "บริการล้างแอร์ติดผนัง",
    "Description": "ทำความสะอาดแอร์ติดผนังบ้านทั่วไป กำจัดฝุ่น เชื้อรา เพิ่มลมเย็นและประหยัดไฟ",
    "Price": 500,
    "Unit": "ตัว",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "SERV002",
    "Category": "งานบริการ",
    "Name": "บริการล้างแอร์แขวน",
    "Description": "ทำความสะอาดแอร์แขวนใต้ฝ้าเพดานสำหรับสำนักงาน ร้านค้า หรือโชว์รูม",
    "Price": 1300,
    "Unit": "ตัว",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "SERV003",
    "Category": "งานบริการ",
    "Name": "บริการล้างแอร์ 4 ทิศทาง",
    "Description": "ทำความสะอาดแอร์สี่ทิศทาง (Cassette Type) ด้วยช่างผู้เชี่ยวชาญ",
    "Price": 1500,
    "Unit": "ตัว",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "SIGN001",
    "Category": "งานบริการ",
    "Name": "งานป้ายไวนิล (ตามขนาดสั่งทำ)",
    "Description": "ป้ายไวนิลทนทาน สีสันสดใส ออกแบบฟรี บริการประเมินราคาตามพื้นที่ตารางเมตร",
    "Price": 0,
    "Unit": "ตร.ม.",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "SIGN002",
    "Category": "งานบริการ",
    "Name": "งานสติ๊กเกอร์สินค้า (ไดคัท)",
    "Description": "สติ๊กเกอร์กันน้ำสำหรับติดบนตัวสินค้า ไดคัทตามรูปทรงที่ต้องการ ออกแบบฟรี",
    "Price": 0,
    "Unit": "แผ่น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "SIGN003",
    "Category": "งานบริการ",
    "Name": "งานป้ายอะคริลิค",
    "Description": "รับทำป้ายอะคริลิคตามขนาดและรูปแบบที่ต้องการ ออกแบบฟรี ประเมินราคาตามชิ้นงาน",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "SIGN004",
    "Category": "งานบริการ",
    "Name": "งานสติ๊กเกอร์รีดโฟม / รีดฟิลล์",
    "Description": "บริการพิมพ์และผลิตสติ๊กเกอร์รีดโฟมและรีดฟิลล์โฆษณา ออกแบบฟรี",
    "Price": 0,
    "Unit": "ชิ้น",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300"
  },
  {
    "ID": "SIGN005",
    "Category": "งานบริการ",
    "Name": "งานป้ายไวนิลพร้อมโครงไม้",
    "Description": "ผลิตป้ายไวนิลพร้อมขึงโครงไม้ทนทาน เหมาะสำหรับป้ายประชาสัมพันธ์ภายนอก",
    "Price": 0,
    "Unit": "ชุด",
    "Stock": 999,
    "ImageURL": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300"
  }
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
