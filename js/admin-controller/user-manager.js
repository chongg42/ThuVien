// js/modules/user-manager.js

function renderUsersModule(page = 1) {
    const db = getLibData();
    const itemsPerPage = 5;
    const totalPages = Math.ceil(db.docGia.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const paginatedUsers = db.docGia.slice(start, start + itemsPerPage);

    let html = `
        <div class="bg-white/80 backdrop-blur-xl rounded-[3.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white animate-in slide-in-from-bottom-4 duration-500">
            
            <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <span class="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-2 block">Thành viên</span>
                    <h3 class="text-4xl font-black text-slate-900 tracking-tighter">Quản Lý <span class="text-blue-500">Độc Giả</span></h3>
                </div>
                <button onclick="alert('Thêm độc giả mới')" class="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-black overflow-hidden transition-all hover:pr-12">
                    <span class="relative z-10">+ ĐĂNG KÝ THẺ</span>
                    <div class="absolute inset-y-0 right-0 w-10 bg-blue-500 flex items-center justify-center translate-x-10 group-hover:translate-x-0 transition-transform">→</div>
                </button>
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
                        ${paginatedUsers.map((u) => {
                            const statusColor = u.trangThai === 'Hoạt động' 
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-200" 
                                : "bg-rose-500/10 text-rose-600 border-rose-200";
                            
                            return `
                                <tr class="group transition-all duration-500">
                                    <td class="py-6 pl-10 rounded-l-[2.5rem] bg-white border-y border-l border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/20 transition-all">
                                        <div class="flex items-center gap-5">
                                            <div class="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">👤</div>
                                            <div>
                                                <p class="font-black text-slate-800 text-lg">${u.hoTen}</p>
                                                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">${u.email || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td class="py-6 bg-white border-y border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/20 transition-all font-mono font-bold text-blue-600">
                                        ${u.maThe}
                                    </td>

                                    <td class="py-6 bg-white border-y border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/20 transition-all text-center">
                                        <span class="px-4 py-2 rounded-xl text-[10px] font-black uppercase border ${statusColor}">
                                            ${u.trangThai || 'Hoạt động'}
                                        </span>
                                    </td>

                                    <td class="py-6 pr-10 rounded-r-[2.5rem] bg-white border-y border-r border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/20 transition-all text-right">
                                        <div class="flex justify-end gap-3">
                                            <button onclick="editUser(${u.id})" class="w-10 h-10 flex items-center justify-center bg-white text-slate-400 rounded-xl border border-slate-100 hover:text-blue-500 hover:border-blue-200 transition-all">✏️</button>
                                            <button onclick="deleteUser(${u.id})" class="w-10 h-10 flex items-center justify-center bg-white text-slate-400 rounded-xl border border-slate-100 hover:text-rose-500 hover:border-rose-200 transition-all">🚫</button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join("")}
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

function renderUserPagination(currentPage, totalPages) {
    let pHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'bg-blue-600 text-white shadow-blue-200 shadow-lg' : 'bg-white text-slate-400 hover:bg-slate-50';
        pHTML += `<button onclick="renderUsersModule(${i})" class="w-12 h-12 rounded-2xl font-black transition-all ${activeClass}">${i}</button>`;
    }
    return pHTML;
}
// Thêm vào cuối file js/modules/user-manager.js

function deleteUser(id) {
    const db = getLibData();
    // Tìm tên để hiển thị thông báo xác nhận
    const user = db.docGia.find(u => u.id === id);
    
    if (confirm(`Bạn có chắc chắn muốn xóa độc giả: ${user.tenDocGia}?`)) {
        // Lọc bỏ user có id này
        db.docGia = db.docGia.filter(u => u.id !== id);
        
        // Lưu lại vào localStorage
        saveLibData(db);
        
        // Load lại trang hiện tại để cập nhật giao diện
        renderUsersModule(1); 
        
        // Thông báo (tùy chọn)
        console.log("Đã xóa thành công");
    }
}
function editUser(id) {
    const db = getLibData();
    const user = db.docGia.find(u => u.id === id);

    if (!user) return;

    // Tạo HTML cho Modal
    const modalHTML = `
        <div id="userModal" class="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div class="bg-white rounded-[3rem] p-12 w-full max-w-lg shadow-2xl border border-white animate-in zoom-in-95 duration-300">
                <h3 class="text-3xl font-black text-slate-900 mb-8">Sửa <span class="text-blue-500">Độc Giả</span></h3>
                
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Tên Độc Giả</label>
                        <input type="text" id="editUserName" value="${user.tenDocGia}" 
                            class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email</label>
                        <input type="email" id="editUserEmail" value="${user.email || ''}" 
                            class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all">
                    </div>
                    <div>
                        <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Trạng thái thẻ</label>
                        <select id="editUserStatus" class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all">
                            <option value="Hoạt động" ${user.trangThai === 'Hoạt động' ? 'selected' : ''}>Hoạt động</option>
                            <option value="Bị khóa" ${user.trangThai === 'Bị khóa' ? 'selected' : ''}>Bị khóa</option>
                        </select>
                    </div>
                </div>

                <div class="flex gap-4 mt-10">
                    <button onclick="closeUserModal()" class="flex-1 px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black hover:bg-slate-200 transition-all">HỦY</button>
                    <button onclick="updateUser(${id})" class="flex-1 px-8 py-4 bg-blue-500 text-white rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all">LƯU THAY ĐỔI</button>
                </div>
            </div>
        </div>
    `;

    // Chèn Modal vào cuối body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    if (modal) modal.remove();
}
function updateUser(id) {
    const db = getLibData();
    const userIndex = db.docGia.findIndex(u => u.id === id);

    if (userIndex !== -1) {
        // Lấy dữ liệu mới từ các ô input trong Modal
        db.docGia[userIndex].tenDocGia = document.getElementById('editUserName').value;
        db.docGia[userIndex].email = document.getElementById('editUserEmail').value;
        db.docGia[userIndex].trangThai = document.getElementById('editUserStatus').value;

        // Lưu và đóng modal
        saveLibData(db);
        closeUserModal();
        
        // Cập nhật lại danh sách
        renderUsersModule(1);
    }
}