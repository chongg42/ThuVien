// data.js - Bản chuẩn không gây lỗi trùng lặp
if (typeof window.libInitialData === "undefined") {
  window.libInitialData = {
    theLoai: [
      { id: 1, ten: "Công nghệ thông tin" },
      { id: 2, ten: "Văn học" },
      { id: 3, ten: "Ngoại ngữ" },
      { id: 4, ten: "Kỹ năng sống" },
    ],
    sach: [
      {
        id: 1,
        tieuDe: "Lập Trình Java Cơ Bản",
        tacGia: "Nguyễn Văn A",
        theLoaiId: 1,
        namXuatBan: 2020,
        soLuong: 12,
      },
      {
        id: 2,
        tieuDe: "Hướng Dẫn HTML & CSS",
        tacGia: "Trần Thị B",
        theLoaiId: 1,
        namXuatBan: 2019,
        soLuong: 7,
      },
      {
        id: 3,
        tieuDe: "Cấu Trúc Dữ Liệu & Giải Thuật",
        tacGia: "Lê Minh C",
        theLoaiId: 1,
        namXuatBan: 2021,
        soLuong: 5,
      },
      {
        id: 4,
        tieuDe: "Văn Học Việt Nam Hiện Đại",
        tacGia: "Tố Hữu",
        theLoaiId: 2,
        namXuatBan: 2015,
        soLuong: 20,
      },
      {
        id: 5,
        tieuDe: "Tiếng Anh Giao Tiếp",
        tacGia: "John Smith",
        theLoaiId: 3,
        namXuatBan: 2018,
        soLuong: 9,
      },
      {
        id: 6,
        tieuDe: "Kỹ Năng Sống Cho Sinh Viên",
        tacGia: "Phạm Hương",
        theLoaiId: 4,
        namXuatBan: 2017,
        soLuong: 14,
      },

      {
        id: 7,
        tieuDe: "Lập Trình Python Cơ Bản",
        tacGia: "Nguyễn Tấn Dũng",
        theLoaiId: 1,
        namXuatBan: 2021,
        soLuong: 10,
      },
      {
        id: 8,
        tieuDe: "Lập Trình Web với JavaScript",
        tacGia: "Hoàng Long",
        theLoaiId: 1,
        namXuatBan: 2022,
        soLuong: 8,
      },
      {
        id: 9,
        tieuDe: "ReactJS Nâng Cao",
        tacGia: "Phạm Chí Tài",
        theLoaiId: 1,
        namXuatBan: 2023,
        soLuong: 11,
      },
      {
        id: 10,
        tieuDe: "NodeJS Cho Người Mới",
        tacGia: "Trần Hữu Nghĩa",
        theLoaiId: 1,
        namXuatBan: 2020,
        soLuong: 6,
      },

      {
        id: 11,
        tieuDe: "Phân Tích Thiết Kế Hệ Thống",
        tacGia: "Nguyễn Hữu Khoa",
        theLoaiId: 1,
        namXuatBan: 2018,
        soLuong: 9,
      },
      {
        id: 12,
        tieuDe: "SQL Server Từ Cơ Bản Đến Nâng Cao",
        tacGia: "Lê Văn Minh",
        theLoaiId: 1,
        namXuatBan: 2021,
        soLuong: 16,
      },
      {
        id: 13,
        tieuDe: "MongoDB Thực Hành",
        tacGia: "Hồ Thanh Sơn",
        theLoaiId: 1,
        namXuatBan: 2019,
        soLuong: 6,
      },
      {
        id: 14,
        tieuDe: "Docker & DevOps",
        tacGia: "Đặng Ngọc Hải",
        theLoaiId: 1,
        namXuatBan: 2022,
        soLuong: 10,
      },
      {
        id: 15,
        tieuDe: "Lập Trình Kotlin",
        tacGia: "Hoàng Văn Tú",
        theLoaiId: 1,
        namXuatBan: 2020,
        soLuong: 12,
      },

      {
        id: 16,
        tieuDe: "Văn Học Trung Đại Việt Nam",
        tacGia: "Nhiều tác giả",
        theLoaiId: 2,
        namXuatBan: 2010,
        soLuong: 18,
      },
      {
        id: 17,
        tieuDe: "Tác Phẩm Chọn Lọc - Nam Cao",
        tacGia: "Nam Cao",
        theLoaiId: 2,
        namXuatBan: 2013,
        soLuong: 22,
      },
      {
        id: 18,
        tieuDe: "Tuyển Tập Thơ Xuân Diệu",
        tacGia: "Xuân Diệu",
        theLoaiId: 2,
        namXuatBan: 2014,
        soLuong: 17,
      },
      {
        id: 19,
        tieuDe: "Tố Tâm",
        tacGia: "Hoàng Ngọc Phách",
        theLoaiId: 2,
        namXuatBan: 2009,
        soLuong: 10,
      },
      {
        id: 20,
        tieuDe: "Dế Mèn Phiêu Lưu Ký",
        tacGia: "Tô Hoài",
        theLoaiId: 2,
        namXuatBan: 2011,
        soLuong: 25,
      },

      {
        id: 21,
        tieuDe: "Ngữ Pháp Tiếng Anh Hiện Đại",
        tacGia: "Raymond Murphy",
        theLoaiId: 3,
        namXuatBan: 2017,
        soLuong: 15,
      },
      {
        id: 22,
        tieuDe: "600 Từ Vựng TOEIC",
        tacGia: "Nhiều tác giả",
        theLoaiId: 3,
        namXuatBan: 2018,
        soLuong: 30,
      },
      {
        id: 23,
        tieuDe: "Tự Học IELTS 7.0",
        tacGia: "Nguyễn Thị Trang",
        theLoaiId: 3,
        namXuatBan: 2022,
        soLuong: 13,
      },
      {
        id: 24,
        tieuDe: "Tiếng Nhật Sơ Cấp N5",
        tacGia: "Sato Haruki",
        theLoaiId: 3,
        namXuatBan: 2016,
        soLuong: 18,
      },
      {
        id: 25,
        tieuDe: "Hán Ngữ Tập 1",
        tacGia: "Lý Hạo",
        theLoaiId: 3,
        namXuatBan: 2015,
        soLuong: 14,
      },

      {
        id: 26,
        tieuDe: "Tư Duy Tích Cực",
        tacGia: "Norman Vincent Peale",
        theLoaiId: 4,
        namXuatBan: 2012,
        soLuong: 11,
      },
      {
        id: 27,
        tieuDe: "Đắc Nhân Tâm",
        tacGia: "Dale Carnegie",
        theLoaiId: 4,
        namXuatBan: 2014,
        soLuong: 40,
      },
      {
        id: 28,
        tieuDe: "Quẳng Gánh Lo Đi Và Vui Sống",
        tacGia: "Dale Carnegie",
        theLoaiId: 4,
        namXuatBan: 2011,
        soLuong: 22,
      },
      {
        id: 29,
        tieuDe: "7 Thói Quen Hiệu Quả",
        tacGia: "Stephen Covey",
        theLoaiId: 4,
        namXuatBan: 2013,
        soLuong: 18,
      },
      {
        id: 30,
        tieuDe: "Nghệ Thuật Giao Tiếp",
        tacGia: "Brian Tracy",
        theLoaiId: 4,
        namXuatBan: 2016,
        soLuong: 20,
      },

      {
        id: 31,
        tieuDe: "Thuật Toán Java Nâng Cao",
        tacGia: "Trần Đức Hòa",
        theLoaiId: 1,
        namXuatBan: 2019,
        soLuong: 7,
      },
      {
        id: 32,
        tieuDe: "Lập Trình C++ Cho Người Mới",
        tacGia: "Hà Minh Khang",
        theLoaiId: 1,
        namXuatBan: 2021,
        soLuong: 9,
      },
      {
        id: 33,
        tieuDe: "Hệ Điều Hành Linux",
        tacGia: "Nguyễn Long",
        theLoaiId: 1,
        namXuatBan: 2017,
        soLuong: 5,
      },
      {
        id: 34,
        tieuDe: "Mạng Máy Tính",
        tacGia: "Andrew S. Tanenbaum",
        theLoaiId: 1,
        namXuatBan: 2015,
        soLuong: 6,
      },
      {
        id: 35,
        tieuDe: "Kỹ Thuật Lập Trình",
        tacGia: "Nguyễn Tấn Phước",
        theLoaiId: 1,
        namXuatBan: 2018,
        soLuong: 8,
      },

      {
        id: 36,
        tieuDe: "Văn Học Nga Tuyển Chọn",
        tacGia: "Nhiều tác giả",
        theLoaiId: 2,
        namXuatBan: 2008,
        soLuong: 15,
      },
      {
        id: 37,
        tieuDe: "Nhật Ký Trong Tù",
        tacGia: "Hồ Chí Minh",
        theLoaiId: 2,
        namXuatBan: 2005,
        soLuong: 30,
      },
      {
        id: 38,
        tieuDe: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
        tacGia: "Rosie Nguyễn",
        theLoaiId: 2,
        namXuatBan: 2017,
        soLuong: 26,
      },
      {
        id: 39,
        tieuDe: "Nhà Giả Kim",
        tacGia: "Paulo Coelho",
        theLoaiId: 2,
        namXuatBan: 2012,
        soLuong: 22,
      },
      {
        id: 40,
        tieuDe: "Harry Potter Tập 1",
        tacGia: "J.K. Rowling",
        theLoaiId: 2,
        namXuatBan: 2000,
        soLuong: 40,
      },

      {
        id: 41,
        tieuDe: "TOEIC Listening",
        tacGia: "ETS",
        theLoaiId: 3,
        namXuatBan: 2019,
        soLuong: 25,
      },
      {
        id: 42,
        tieuDe: "TOEIC Reading",
        tacGia: "ETS",
        theLoaiId: 3,
        namXuatBan: 2020,
        soLuong: 21,
      },
      {
        id: 43,
        tieuDe: "Tiếng Hàn Tổng Hợp",
        tacGia: "Kim Ji-hoon",
        theLoaiId: 3,
        namXuatBan: 2015,
        soLuong: 18,
      },
      {
        id: 44,
        tieuDe: "Oxford Picture Dictionary",
        tacGia: "Jayme Adelson-Goldstein",
        theLoaiId: 3,
        namXuatBan: 2017,
        soLuong: 14,
      },
      {
        id: 45,
        tieuDe: "1000 Câu Giao Tiếp Khi Du Lịch",
        tacGia: "Nhiều tác giả",
        theLoaiId: 3,
        namXuatBan: 2013,
        soLuong: 19,
      },

      {
        id: 46,
        tieuDe: "Tư Duy Phản Biện",
        tacGia: "Nhật Chiêu",
        theLoaiId: 4,
        namXuatBan: 2018,
        soLuong: 16,
      },
      {
        id: 47,
        tieuDe: "Sức Mạnh Của Thói Quen",
        tacGia: "Charles Duhigg",
        theLoaiId: 4,
        namXuatBan: 2012,
        soLuong: 30,
      },
      {
        id: 48,
        tieuDe: "Dám Bị Ghét",
        tacGia: "Ichiro Kishimi",
        theLoaiId: 4,
        namXuatBan: 2017,
        soLuong: 22,
      },
      {
        id: 49,
        tieuDe: "Tỉnh Thức",
        tacGia: "Eckhart Tolle",
        theLoaiId: 4,
        namXuatBan: 2016,
        soLuong: 18,
      },
      {
        id: 50,
        tieuDe: "Bí Quyết Thành Công",
        tacGia: "Napoleon Hill",
        theLoaiId: 4,
        namXuatBan: 2009,
        soLuong: 12,
      },

      {
        id: 51,
        tieuDe: "Java Spring Boot Thực Chiến",
        tacGia: "Hoàng Trọng Tín",
        theLoaiId: 1,
        namXuatBan: 2023,
        soLuong: 10,
      },
      {
        id: 52,
        tieuDe: "Lập Trình Web ASP.NET",
        tacGia: "Phạm Thành Danh",
        theLoaiId: 1,
        namXuatBan: 2021,
        soLuong: 9,
      },
      {
        id: 53,
        tieuDe: "Thuật Toán AI Cơ Bản",
        tacGia: "Đỗ Văn Kiên",
        theLoaiId: 1,
        namXuatBan: 2022,
        soLuong: 7,
      },
      {
        id: 54,
        tieuDe: "Machine Learning Ứng Dụng",
        tacGia: "Lương Minh Khoa",
        theLoaiId: 1,
        namXuatBan: 2023,
        soLuong: 5,
      },
      {
        id: 55,
        tieuDe: "Khoa Học Dữ Liệu Python",
        tacGia: "Hồ Đức Bảo",
        theLoaiId: 1,
        namXuatBan: 2022,
        soLuong: 10,
      },

      {
        id: 56,
        tieuDe: "Tuyển Tập Thơ Hàn Mặc Tử",
        tacGia: "Hàn Mặc Tử",
        theLoaiId: 2,
        namXuatBan: 2005,
        soLuong: 12,
      },
      {
        id: 57,
        tieuDe: "Chí Phèo - Tác Phẩm Và Bình Luận",
        tacGia: "Nam Cao",
        theLoaiId: 2,
        namXuatBan: 2010,
        soLuong: 18,
      },
      {
        id: 58,
        tieuDe: "Sherlock Holmes Tuyển Tập",
        tacGia: "Arthur Conan Doyle",
        theLoaiId: 2,
        namXuatBan: 2006,
        soLuong: 20,
      },
      {
        id: 59,
        tieuDe: "Kính Vạn Hoa",
        tacGia: "Nguyễn Nhật Ánh",
        theLoaiId: 2,
        namXuatBan: 1995,
        soLuong: 30,
      },
      {
        id: 60,
        tieuDe: "Totto-chan Cô Bé Bên Cửa Sổ",
        tacGia: "Tetsuko Kuroyanagi",
        theLoaiId: 2,
        namXuatBan: 1981,
        soLuong: 15,
      },
    ],
    docGia: [
      {
        id: 1,
        hoTen: "Nguyễn Văn An",
        email: "an@gmail.com",
        dienThoai: "0901234561",
        matKhau: "123",
      },
      {
        id: 2,
        hoTen: "Trần Hoài Nam",
        email: "nam@gmail.com",
        dienThoai: "0901234562",
        matKhau: "123",
      },
      {
        id: 3,
        hoTen: "Lê Minh Hòa",
        email: "hoa@gmail.com",
        dienThoai: "0901234563",
        matKhau: "123",
      },
      {
        id: 4,
        hoTen: "Phạm Quốc Khánh",
        email: "khanh@gmail.com",
        dienThoai: "0901234564",
        matKhau: "123",
      },
      {
        id: 5,
        hoTen: "Nguyễn Thị Hương",
        email: "huong@gmail.com",
        dienThoai: "0901234565",
        matKhau: "123",
      },
      {
        id: 6,
        hoTen: "Đặng Trọng Phú",
        email: "phu@gmail.com",
        dienThoai: "0901234566",
        matKhau: "123",
      },
      {
        id: 7,
        hoTen: "Lê Thanh Sơn",
        email: "son@gmail.com",
        dienThoai: "0901234567",
        matKhau: "123",
      },
      {
        id: 8,
        hoTen: "Trần Thị Hải",
        email: "hai@gmail.com",
        dienThoai: "0901234568",
        matKhau: "123",
      },
      {
        id: 9,
        hoTen: "Hoàng Nhật Tân",
        email: "tan@gmail.com",
        dienThoai: "0901234569",
        matKhau: "123",
      },
      {
        id: 10,
        hoTen: "Nguyễn Thanh Trúc",
        email: "truc@gmail.com",
        dienThoai: "0901234570",
        matKhau: "123",
      },

      {
        id: 11,
        hoTen: "Phạm Gia Huy",
        email: "huy@gmail.com",
        dienThoai: "0901234571",
        matKhau: "123",
      },
      {
        id: 12,
        hoTen: "Nguyễn Minh Đức",
        email: "duc@gmail.com",
        dienThoai: "0901234572",
        matKhau: "123",
      },
      {
        id: 13,
        hoTen: "Lê Đình Hiếu",
        email: "hieu@gmail.com",
        dienThoai: "0901234573",
        matKhau: "123",
      },
      {
        id: 14,
        hoTen: "Hoàng Thu Trang",
        email: "thu@gmail.com",
        dienThoai: "0901234574",
        matKhau: "123",
      },
      {
        id: 15,
        hoTen: "Nguyễn Quang Minh",
        email: "minh@gmail.com",
        dienThoai: "0901234575",
        matKhau: "123",
      },

      {
        id: 16,
        hoTen: "Phạm Thu Thảo",
        email: "thao@gmail.com",
        dienThoai: "0901234576",
        matKhau: "123",
      },
      {
        id: 17,
        hoTen: "Lê Việt Anh",
        email: "anh@gmail.com",
        dienThoai: "0901234577",
        matKhau: "123",
      },
      {
        id: 18,
        hoTen: "Đỗ Nhật Nam",
        email: "nhatnam@gmail.com",
        dienThoai: "0901234578",
        matKhau: "123",
      },
      {
        id: 19,
        hoTen: "Lương Tiến Đạt",
        email: "dat@gmail.com",
        dienThoai: "0901234579",
        matKhau: "123",
      },
      {
        id: 20,
        hoTen: "Phan Ngọc Dung",
        email: "dung@gmail.com",
        dienThoai: "0901234580",
        matKhau: "123",
      },

      {
        id: 21,
        hoTen: "Hoàng Kim Ngân",
        email: "ngan@gmail.com",
        dienThoai: "0901234581",
        matKhau: "123",
      },
      {
        id: 22,
        hoTen: "Nguyễn Hữu Phước",
        email: "phuoc@gmail.com",
        dienThoai: "0901234582",
        matKhau: "123",
      },
      {
        id: 23,
        hoTen: "Trần Minh Tâm",
        email: "tam@gmail.com",
        dienThoai: "0901234583",
        matKhau: "123",
      },
      {
        id: 24,
        hoTen: "Lê Hải Yến",
        email: "yen@gmail.com",
        dienThoai: "0901234584",
        matKhau: "123",
      },
      {
        id: 25,
        hoTen: "Phạm Đức Toàn",
        email: "toan@gmail.com",
        dienThoai: "0901234585",
        matKhau: "123",
      },
    ],
    muonTra: [
      {
        id: 1,
        docGiaId: 3,
        sachId: 7,
        ngayMuon: "2024-01-03",
        hanTra: "2024-01-20",
        trangThai: "Đang mượn",
      },
      {
        id: 2,
        docGiaId: 5,
        sachId: 12,
        ngayMuon: "2024-01-04",
        hanTra: "2024-01-25",
        trangThai: "Đang mượn",
      },
      {
        id: 3,
        docGiaId: 10,
        sachId: 4,
        ngayMuon: "2024-01-10",
        hanTra: "2024-01-30",
        trangThai: "Đã trả",
      },
      {
        id: 4,
        docGiaId: 6,
        sachId: 22,
        ngayMuon: "2024-01-14",
        hanTra: "2024-02-05",
        trangThai: "Đang mượn",
      },
      {
        id: 5,
        docGiaId: 9,
        sachId: 1,
        ngayMuon: "2024-01-15",
        hanTra: "2024-02-01",
        trangThai: "Đã trả",
      },
    ],
    yeuCauDat: [
      {
        id: 1,
        docGiaId: 2,
        sachId: 10,
        ngayYeuCau: "2024-02-01",
        trangThai: "Chờ duyệt",
      },
      {
        id: 2,
        docGiaId: 7,
        sachId: 17,
        ngayYeuCau: "2024-02-02",
        trangThai: "Đã duyệt",
      },
      {
        id: 3,
        docGiaId: 12,
        sachId: 8,
        ngayYeuCau: "2024-02-04",
        trangThai: "Từ chối",
      },
      {
        id: 4,
        docGiaId: 14,
        sachId: 33,
        ngayYeuCau: "2024-02-05",
        trangThai: "Chờ duyệt",
      },
      {
        id: 5,
        docGiaId: 18,
        sachId: 41,
        ngayYeuCau: "2024-02-06",
        trangThai: "Đã duyệt",
      },
    ],
    admin: [
      { id: 1, taiKhoan: "admin", matKhau: "123456", vaiTro: "Quản trị viên" },
      {
        id: 2,
        taiKhoan: "manager",
        matKhau: "123456",
        vaiTro: "Nhân viên quản lý",
      },
      { id: 3, taiKhoan: "librarian", matKhau: "123456", vaiTro: "Thủ thư" },
    ],
  };
}

// Khởi tạo vào LocalStorage
if (!localStorage.getItem("libData")) {
  localStorage.setItem("libData", JSON.stringify(window.libInitialData));
}

// Hàm lấy dữ liệu
function getLibData() {
  const data = localStorage.getItem("libData");
  return data ? JSON.parse(data) : window.libInitialData;
}

// Hàm cập nhật dữ liệu
function updateLibData(newData) {
  localStorage.setItem("libData", JSON.stringify(newData));
}
// Thêm vào data.js nếu chưa có
function saveLibData(db) {
  localStorage.setItem('libraryDB', JSON.stringify(db));
}
// data.js - Thêm mảng nhatKy nếu chưa có
if (typeof window.libInitialData.nhatKy === "undefined") {
  window.libInitialData.nhatKy = [
    { id: 1, thoiGian: "2024-12-18 09:00", nguoiDung: "Admin", hanhDong: "Thêm sách mới", chiTiet: "Đã thêm cuốn 'Lập trình Go'", loai: "success" },
    { id: 2, thoiGian: "2024-12-18 10:15", nguoiDung: "Admin", hanhDong: "Gửi email trễ", chiTiet: "Gửi nhắc nhở đến 5 độc giả", loai: "warning" }
  ];
}

// Hàm thiết lập đồng bộ thời gian thực
function setupRealtimeSync(callback) {
  window.addEventListener('storage', (event) => {
    if (event.key === 'libData') {
      console.log("🔄 Phát hiện thay đổi dữ liệu từ tab khác. Đang cập nhật...");
      if (typeof callback === 'function') {
        callback(JSON.parse(event.newValue));
      }
    }
  });
}

// Hàm ghi nhật ký (Dùng chung cho toàn hệ thống)
function logActivity(hanhDong, chiTiet, loai = "info") {
  const db = getLibData();
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;

  // Fix lỗi nếu db.nhatKy chưa tồn tại
  if (!db.nhatKy) db.nhatKy = [];

  const newLog = {
    id: Date.now(),
    thoiGian: timeStr,
    nguoiDung: "Quản trị viên",
    hanhDong: hanhDong,
    chiTiet: chiTiet,
    loai: loai // success, warning, danger, info
  };

  db.nhatKy.unshift(newLog); // Thêm vào đầu danh sách
  if (db.nhatKy.length > 100) db.nhatKy.pop(); // Giới hạn 100 dòng gần nhất
  updateLibData(db);
}

// MIGRATION: Tự động thêm mật khẩu cho độc giả cũ nếu chưa có
(function migrateData() {
  try {
    const db = getLibData();
    let changed = false;

    if (db.docGia) {
      db.docGia.forEach(u => {
        if (!u.matKhau) {
          u.matKhau = "123";
          changed = true;
        }
      });
    }

    // Fix lỗi thiếu mảng nhatKy gây crash
    if (!db.nhatKy) {
      db.nhatKy = window.libInitialData.nhatKy || [];
      changed = true;
    }

    if (changed) {
      console.log("Đã cập nhật dữ liệu (Mật khẩu/Nhật ký) cho hệ thống.");
      updateLibData(db);
    }
  } catch (e) {
    console.error("Lỗi migration:", e);
  }
})();
