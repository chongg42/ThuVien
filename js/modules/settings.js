// js/modules/settings.js

function renderSettingsModule() {
    const db = getLibData();
    // Giả sử lấy tài khoản admin đầu tiên để làm mẫu (Hoặc lấy từ Session/LocalStorage khi đăng nhập)
    const currentAdmin = db.admin[0]; 

    let html = `
        <div class="bg-white/70 backdrop-blur-2xl rounded-[4rem] p-12 shadow-xl border border-white/50 animate-in fade-in zoom-in duration-700">
            <div class="mb-12">
                <h3 class="text-4xl font-black text-slate-900 tracking-tighter">Cài Đặt <span class="text-orange-500">Tài Khoản</span></h3>
                <p class="text-slate-400 font-medium mt-2 text-sm">Quản lý thông tin cá nhân và bảo mật hệ thống</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div class="lg:col-span-2 space-y-8">
                    <div class="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm">
                        <h4 class="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
                            <span class="w-2 h-6 bg-blue-500 rounded-full"></span> Thông tin cá nhân
                        </h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Tên tài khoản</label>
                                <input type="text" id="set-username" value="${currentAdmin.taiKhoan}" disabled
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-400 cursor-not-allowed">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Vai trò</label>
                                <input type="text" value="${currentAdmin.vaiTro}" disabled
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-400 cursor-not-allowed">
                            </div>
                        </div>
                    
                    </div>

                    <div class="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm">
                        <h4 class="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
                            <span class="w-2 h-6 bg-rose-500 rounded-full"></span> Bảo mật & Mật khẩu
                        </h4>
                        
                        <div class="space-y-6 max-w-md">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Mật khẩu hiện tại</label>
                                <input type="password" id="old-pass" placeholder="••••••••"
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-rose-500 outline-none transition-all">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Mật khẩu mới</label>
                                <input type="password" id="new-pass" placeholder="Nhập mật khẩu mới"
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-rose-500 outline-none transition-all">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Xác nhận mật khẩu mới</label>
                                <input type="password" id="confirm-pass" placeholder="Nhập lại mật khẩu mới"
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-rose-500 outline-none transition-all">
                            </div>
                        </div>
                        
                        <button onclick="changePassword(${currentAdmin.id})" class="mt-8 px-10 py-4 bg-rose-500 text-white rounded-2xl font-black hover:bg-rose-600 transition-all shadow-lg shadow-rose-100">
                            ĐỔI MẬT KHẨU
                        </button>
                    </div>
                </div>

                <div class="space-y-8">
                    <div class="bg-gradient-to-br from-orange-400 to-yellow-500 p-1 rounded-[3rem]">
                        <div class="bg-white p-10 rounded-[2.8rem] text-center">
                            <div class="w-32 h-32 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl shadow-inner border-4 border-white">
                                👨‍💻
                            </div>
                            <h5 class="text-xl font-black text-slate-800">${currentAdmin.taiKhoan}</h5>
                            <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">${currentAdmin.vaiTro}</p>
                            
                            <div class="mt-8 pt-8 border-t border-slate-50 flex justify-around">
                                <div>
                                    <p class="text-xs font-black text-slate-800">Hoạt động</p>
                                    <p class="text-[10px] text-emerald-500 font-bold uppercase">Online</p>
                                </div>
                                <div>
                                    <p class="text-xs font-black text-slate-800">Phiên bản</p>
                                    <p class="text-[10px] text-slate-400 font-bold uppercase">v4.0.2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('mainContent').innerHTML = html;
}

// Hàm đổi mật khẩu
function changePassword(adminId) {
    const db = getLibData();
    const oldPass = document.getElementById('old-pass').value;
    const newPass = document.getElementById('new-pass').value;
    const confirmPass = document.getElementById('confirm-pass').value;

    const admin = db.admin.find(a => a.id === adminId);

    if (oldPass !== admin.matKhau) {
        return alert("Mật khẩu hiện tại không chính xác!");
    }
    if (newPass.length < 6) {
        return alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
    }
    if (newPass !== confirmPass) {
        return alert("Xác nhận mật khẩu mới không trùng khớp!");
    }

    // Cập nhật
    admin.matKhau = newPass;
    updateLibData(db);
    
    // Ghi nhật ký
    logActivity("Bảo mật", "Quản trị viên đã thay đổi mật khẩu truy cập", "warning");
    
    alert("Đổi mật khẩu thành công!");
    renderSettingsModule(); // Load lại trang
}
function saveProfile() {
    const db = getLibData();
    // Lấy dữ liệu từ các ô input
    const newFullName = document.getElementById('set-fullname').value;
    const newPhone = document.getElementById('set-phone').value;

    if (!newFullName) {
        return alert("Vui lòng không để trống Họ và Tên!");
    }

    // Cập nhật vào mảng admin (Giả sử đang dùng tài khoản đầu tiên)
    db.admin[0].hoTen = newFullName;
    db.admin[0].soDienThoai = newPhone;

    // Lưu vào LocalStorage
    updateLibData(db);

    // Ghi nhật ký hoạt động để theo dõi
    logActivity("Cài đặt", `Đã cập nhật thông tin cá nhân (Tên: ${newFullName})`, "success");

    alert("Cập nhật thông tin thành công!");
    
    // Load lại module để thấy sự thay đổi ở cột Avatar bên phải
    renderSettingsModule();
}