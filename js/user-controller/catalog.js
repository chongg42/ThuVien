// js/user-controller/catalog.js

// 1. Hàm render chính - Đảm bảo nhận đủ 3 tham số để không mất trạng thái
function renderCatalog(page = 1, category = 'all', searchQuery = '') {
    const db = getLibData();
    const itemsPerPage = 8;

    // Lấy danh sách thể loại thực tế từ DB
    const allCategories = ['all', ...new Set(db.sach.map(s => s.theLoaiId))];

    // Logic Lọc dữ liệu (Thể loại + Tìm kiếm)
    let filteredBooks = db.sach.filter(s => {
        const matchCategory = (category === 'all' || s.theLoaiId == category);
        const sQuery = searchQuery.toLowerCase();
        const matchSearch = s.tieuDe.toLowerCase().includes(sQuery) ||
            s.tacGia.toLowerCase().includes(sQuery);
        return matchCategory && matchSearch;
    });

    // Tính toán phân trang
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
    const start = (page - 1) * itemsPerPage;
    const paginatedBooks = filteredBooks.slice(start, start + itemsPerPage);

    let html = `
        <div class="space-y-10 animate-in fade-in duration-700">
            <div class="bg-white/70 backdrop-blur-xl p-8 rounded-[3.5rem] border border-white shadow-xl space-y-6">
                <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                    <h3 class="text-3xl font-black text-slate-800 tracking-tighter">Danh Mục <span class="text-orange-500">Sách</span></h3>
                    <div class="relative w-full md:w-96">
                        <input type="text" id="catalogSearch" value="${searchQuery}" 
                            onkeyup="handleCatalogSearch(event, '${category}')"
                            placeholder="Tìm tên sách, tác giả..." 
                            class="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] font-bold outline-none focus:border-orange-500 transition-all shadow-inner">
                        <span class="absolute left-5 top-4">🔍</span>
                    </div>
                </div>

                <div class="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    <button onclick="renderCatalog(1, 'all', '${searchQuery}')" 
                            class="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all
                            ${category === 'all' ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white text-slate-400 hover:text-orange-500 border border-slate-50'}">
                            Tất cả
                    </button>
                    ${db.theLoai.map(cat => `
                        <button onclick="renderCatalog(1, ${cat.id}, '${searchQuery}')" 
                            class="px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all
                            ${category == cat.id ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white text-slate-400 hover:text-orange-500 border border-slate-50'}">
                            ${cat.ten}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                ${paginatedBooks.length > 0 ? paginatedBooks.map(s => {
        const catName = db.theLoai.find(t => t.id === s.theLoaiId).ten || "Khác";
        return `
                    <div class="group bg-white p-8 rounded-[3.5rem] border border-white shadow-xl shadow-slate-200/30 hover:-translate-y-4 transition-all duration-500">
                        <div onclick="showBookDetail(${s.id})" class="cursor-pointer aspect-[3/4] bg-slate-50 rounded-[2.5rem] mb-6 flex items-center justify-center text-6xl group-hover:bg-orange-50 transition-all relative overflow-hidden">
                            📖
                            <div class="absolute top-4 right-4 z-10">
                                <span class="px-3 py-1 bg-white/80 backdrop-blur-md text-slate-600 text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-white">
                                    ${catName}
                                </span>
                            </div>
                            <div class="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span class="bg-white px-5 py-2 rounded-full text-[9px] font-black shadow-xl">CHI TIẾT</span>
                            </div>
                        </div>
                        <h4 class="font-black text-slate-800 text-lg mb-1 truncate">${s.tieuDe}</h4>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">${s.tacGia}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-[11px] font-black ${s.soLuong > 0 ? 'text-emerald-500' : 'text-rose-500'}">
                                ${s.soLuong > 0 ? `Còn ${s.soLuong}` : 'Hết sách'}
                            </span>
                            <button onclick="addToCart(${s.id})" class="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all shadow-lg">
                                🛒
                            </button>
                        </div>
                    </div>
                `}).join('') : `
                    <div class="col-span-full py-20 text-center text-slate-400 font-bold uppercase tracking-widest">Không tìm thấy sách phù hợp</div>
                `}
            </div>

            ${totalPages > 1 ? `
                <div class="flex justify-center items-center gap-3 mt-10">
                    ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
                        <button onclick="renderCatalog(${p}, '${category}', '${searchQuery}')" 
                            class="w-12 h-12 rounded-2xl font-black transition-all 
                            ${page === p ? 'bg-orange-500 text-white shadow-xl' : 'bg-white text-slate-400 hover:bg-orange-50 border border-white'}">
                            ${p}
                        </button>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
    document.getElementById('mainContent').innerHTML = html;
}

// 2. Hàm xử lý tìm kiếm
function handleCatalogSearch(event, category) {
    const query = event.target.value;
    renderCatalog(1, category, query);
}

// 3. Hàm hiển thị chi tiết sách 
function showBookDetail(id) {
    const db = getLibData();
    const s = db.sach.find(item => item.id == id); // Dùng == để so sánh lỏng nếu id là string/number
    if (!s) return;

    const catName = db.theLoai.find(t => t.id === s.theLoaiId)?.ten || "Khác";

    const modalHTML = `
        <div id="bookModal" class="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div class="bg-white rounded-[4rem] p-10 max-w-4xl w-full flex flex-col md:flex-row gap-10 relative shadow-2xl border border-white animate-in zoom-in-95">
                <button onclick="document.getElementById('bookModal').remove()" class="absolute top-8 right-8 text-2xl text-slate-400 hover:text-rose-500 transition-colors">✕</button>
                
                <div class="w-full md:w-1/2 aspect-[3/4] bg-slate-50 rounded-[3rem] flex items-center justify-center text-[8rem] shadow-inner relative overflow-hidden">
                    📚
                    <div class="absolute top-6 left-6">
                        <span class="px-4 py-2 bg-white/90 backdrop-blur-md text-orange-600 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm border border-orange-100">
                            ${catName}
                        </span>
                    </div>
                </div>
                
                <div class="flex-1 flex flex-col justify-center space-y-6">
                    <div>
                        <h2 class="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">${s.tieuDe}</h2>
                        <p class="text-slate-400 font-bold uppercase text-[11px] tracking-widest mt-2">Tác giả: ${s.tacGia}</p>
                        <p class="text-slate-400 font-bold uppercase text-[11px] tracking-widest mt-2">Nhà xuất bản: ${s.nhaXuatBan}</p>
                        <p class="text-slate-400 font-bold uppercase text-[11px] tracking-widest mt-2"> - Năm xuất bản: ${s.namXuatBan}</p>
                    </div>
                    
                    <div class="space-y-2">
                        <p class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Mô tả sách</p>
                        <p class="text-slate-500 font-medium leading-relaxed max-h-40 overflow-y-auto no-scrollbar italic">
                            "${s.moTa || 'Hiện tại chưa có mô tả chi tiết cho cuốn sách này trong hệ thống.'}"
                        </p>
                    </div>

                    <div class="flex items-center justify-between pt-6 border-t border-slate-50">
                        <span class="text-2xl font-black ${s.soLuong > 0 ? 'text-emerald-500' : 'text-rose-500'}">
                            ${s.soLuong > 0 ? 'Sẵn sàng' : 'Hết sách'}
                        </span>
                        <button onclick="addToCart(${s.id}); document.getElementById('bookModal').remove();" 
                            class="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black shadow-xl hover:bg-orange-500 transition-all ${s.soLuong <= 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                            ${s.soLuong <= 0 ? 'disabled' : ''}>
                            THÊM VÀO GIỎ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}