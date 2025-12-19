// js/modules/user-manager.js

// Biến trạng thái toàn cục để duy trì bộ lọc khi chuyển trang
let userSearchQuery = "";
let userStatusFilter = "all";

/**
 * Hàm render chính cho Module Quản lý Độc giả
 */
function renderUsersModule(page = 1) {
    const db = getLibData();
    
    // 1. LOGIC LỌC DỮ LIỆU (Search + Status)
    let filteredUsers = db.docGia.filter(u => {
        // Tìm theo tên hoặc email
        const name = (u.hoTen || u.tenDocGia || "").toLowerCase();
        const email = (u.email || "").toLowerCase();
        const matchSearch = name.includes(userSearchQuery.toLowerCase()) || 
                            email.includes(userSearchQuery.toLowerCase());
        
        // Lọc theo trạng thái
        const matchStatus = userStatusFilter === "all" || u.trangThai === userStatusFilter;
        
        return matchSearch && matchStatus;
    });

    // 2. LOGIC PHÂN TRANG (Dựa trên danh sách đã lọc)
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
    const start = (page - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(start, start + itemsPerPage);

    let html = `
        <div class="bg-white/80 backdrop-blur-xl rounded-[3.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white animate-in slide-in-from-bottom-4 duration-500">
            
            <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <span class="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-2 block">Thành viên</span>
                    <h3 class="text-4xl font-black text-slate-900 tracking-tighter">Quản Lý <span class="text-blue-500">Độc Giả</span></h3>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                    <div class="relative">
                        <input type="text" id="userSearchInput" value="${userSearchQuery}" 
                            oninput="handleUserSearch(this.value)"
                            placeholder="Tìm tên hoặc email..." 
                            class="pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all shadow-sm">
                        <span class="absolute left-4 top-4 text-slate-400">🔍</span>
                        ${userSearchQuery ? `
                            <button onclick="clearUserSearch()" class="absolute right-4 top-4 text-slate-300 hover:text-rose-500 transition-colors">✕</button>
                        ` : ''}
                    </div>

                    <select onchange="handleUserFilter(this.value)" 
                        class="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none cursor-pointer hover:border-blue-200 transition-all shadow-sm">
                        <option value="all" ${userStatusFilter === 'all' ? 'selected' : ''}>Tất cả trạng thái</option>
                        <option value="Hoạt động" ${userStatusFilter === 'Hoạt động' ? 'selected' : ''}>Hoạt động</option>
                        <option value="Bị khóa" ${userStatusFilter === 'Bị khóa' ? 'selected' : ''}>Bị khóa</option>
                    </select>

                    <button onclick="alert('Chức năng thêm mới đang được xây dựng')" class="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-black overflow-hidden transition-all hover:pr-12">
                        <span class="relative z-10">+ ĐĂNG KÝ THẺ</span>
                        <div class="absolute inset-y-0 right-0 w-10 bg-blue-500 flex items-center justify-center translate-x-10 group-hover:translate-x-0 transition-transform">→</div>
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto no-scrollbar">
                <table class="w-full text-left border-separate border-spacing-y-5">
                    <thead>
                        <tr class="text-slate-400 text-[11px] font-black tracking-[0.2em] uppercase">
                            <th class="pb-2 pl-10">Độc giả</th>
                            <th class="pb-2">Mã thẻ</th>
                            <th class="pb-2 text-center">Trạng thái</th>
                            <th class="pb-2 text-right pr-10">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${paginatedUsers.length > 0 ? paginatedUsers.map((u) => {
                            const statusColor = u.trangThai === 'Hoạt động' 
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-200" 
                                : "bg-rose-500/10 text-rose-600 border-rose-200";
                            
                            return `
                                <tr class="group transition-all duration-500">
                                    <td class="py-6 pl-10 rounded-l-[2.5rem] bg-white border-y border-l border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/20 transition-all">
                                        <div class="flex items-center gap-5">
                                            <div class="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner text-slate-400">👤</div>
                                            <div>
                                                <p class="font-black text-slate-800 text-lg">${u.hoTen || u.tenDocGia}</p>
                                                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">${u.email || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td class="py-6 bg-white border-y border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/20 transition-all font-mono font-bold text-blue-600">
                                        ${u.maThe || '---'}
                                    </td>

                                    <td class="py-6 bg-white border-y border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/20 transition-all text-center">
                                        <span class="px-4 py-2 rounded-xl text-[10px] font-black uppercase border ${statusColor}">
                                            ${u.trangThai || 'Hoạt động'}
                                        </span>
                                    </td>

                                    <td class="py-6 pr-10 rounded-r-[2.5rem] bg-white border-y border-r border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/20 transition-all text-right">
                                        <div class="flex justify-end gap-3">
                                            <button onclick="editUser(${u.id})" class="w-10 h-10 flex items-center justify-center bg-white text-slate-400 rounded-xl border border-slate-100 hover:text-blue-500 hover:border-blue-200 transition-all shadow-sm">✏️</button>
                                            <button onclick="deleteUser(${u.id})" class="w-10 h-10 flex items-center justify-center bg-white text-slate-400 rounded-xl border border-slate-100 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm">🚫</button>
                                        </div>
                                    </td>
                                </tr>`;
                        }).join("") : `
                            <tr>
                                <td colspan="4" class="text-center py-24 bg-white rounded-[2.5rem] border border-slate-100">
                                    <p class="text-slate-300 font-bold uppercase tracking-widest text-sm italic">Không tìm thấy độc giả nào khớp với bộ lọc</p>
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>

            <div class="flex justify-center items-center gap-3 mt-12">
                ${renderUserPagination(page, totalPages)}
            </div>
        </div>
    `;
    document.getElementById("mainContent").innerHTML = html;
}

/**
 * Các hàm hỗ trợ lọc và tìm kiếm
 */
function handleUserSearch(value) {
    userSearchQuery = value;
    renderUsersModule(1); // Luôn về trang 1 khi tìm kiếm
}

function clearUserSearch() {
    userSearchQuery = "";
    document.getElementById('userSearchInput').value = "";
    renderUsersModule(1);
}

function handleUserFilter(value) {
    userStatusFilter = value;
    renderUsersModule(1);
}

function renderUserPagination(currentPage, totalPages) {
    let pHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-50';
        pHTML += `<button onclick="renderUsersModule(${i})" class="w-12 h-12 rounded-2xl font-black transition-all ${activeClass}">${i}</button>`;
    }
    return pHTML;
}

/**
 * Chức năng Xóa Độc giả
 */
function deleteUser(id) {
    const db = getLibData();
    const user = db.docGia.find(u => u.id === id);
    
    if (confirm(`Bạn có chắc chắn muốn xóa độc giả: ${user.hoTen || user.tenDocGia}?`)) {
        db.docGia = db.docGia.filter(u => u.id !== id);
        updateLibData(db); // Đồng nhất sử dụng hàm update của hệ thống
        renderUsersModule(1); 
        logActivity("Quản lý", `Đã xóa độc giả ${user.hoTen || user.tenDocGia}`, "warning");
    }
}

/**
 * Chức năng Sửa Độc giả (Mở Modal)
 */
function editUser(id) {
    const db = getLibData();
    const user = db.docGia.find(u => u.id === id);
    if (!user) return;

    const modalHTML = `
        <div id="userModal" class="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div class="bg-white rounded-[3rem] p-12 w-full max-w-lg shadow-2xl border border-white animate-in zoom-in-95 duration-300">
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-3xl font-black text-slate-900">Sửa <span class="text-blue-500">Độc Giả</span></h3>
                    <button onclick="closeUserModal()" class="text-slate-300 hover:text-rose-500 text-2xl transition-colors">✕</button>
                </div>
                
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Họ và Tên</label>
                        <input type="text" id="editUserName" value="${user.hoTen || user.tenDocGia}" 
                            class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email</label>
                        <input type="email" id="editUserEmail" value="${user.email || ''}" 
                            class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Trạng thái tài khoản</label>
                        <select id="editUserStatus" class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all cursor-pointer">
                            <option value="Hoạt động" ${user.trangThai === 'Hoạt động' ? 'selected' : ''}>🟢 Hoạt động</option>
                            <option value="Bị khóa" ${user.trangThai === 'Bị khóa' ? 'selected' : ''}>🔴 Bị khóa</option>
                        </select>
                    </div>
                </div>

                <div class="flex gap-4 mt-12">
                    <button onclick="closeUserModal()" class="flex-1 px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black hover:bg-slate-200 transition-all uppercase text-xs">Hủy</button>
                    <button onclick="updateUser(${id})" class="flex-1 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all uppercase text-xs">Lưu Thay Đổi</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    if (modal) modal.remove();
}

/**
 * Lưu thay đổi Độc giả
 */
function updateUser(id) {
    const db = getLibData();
    const userIndex = db.docGia.findIndex(u => u.id === id);

    if (userIndex !== -1) {
        // Cập nhật cả 2 trường tên để tránh lỗi đồng bộ dữ liệu
        const newName = document.getElementById('editUserName').value;
        db.docGia[userIndex].hoTen = newName;
        db.docGia[userIndex].tenDocGia = newName;
        
        db.docGia[userIndex].email = document.getElementById('editUserEmail').value;
        db.docGia[userIndex].trangThai = document.getElementById('editUserStatus').value;

        updateLibData(db);
        closeUserModal();
        renderUsersModule(1);
        logActivity("Quản lý", `Đã cập nhật thông tin cho độc giả ${newName}`, "info");
    }
}