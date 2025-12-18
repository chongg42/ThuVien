// js/modules/book-manager.js

let currentBookPage = 1;

function renderBooksModule(page = 1) {
  currentBookPage = page;
  const db = getLibData();
  const itemsPerPage = 5;
  const totalPages = Math.ceil(db.sach.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const paginatedBooks = db.sach.slice(start, start + itemsPerPage);

  let html = `
        <div class="bg-white/80 backdrop-blur-xl rounded-[3.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white">
            
            <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <span class="text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-2 block">Thư viện 4.0</span>
                    <h3 class="text-4xl font-black text-slate-900 tracking-tighter">Quản Lý <span class="text-orange-500">Kho Sách</span></h3>
                </div>
                <button onclick="showAddBookModal()" class="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-black overflow-hidden transition-all hover:pr-12">
                    <span class="relative z-10">+ THÊM SÁCH MỚI</span>
                    <div class="absolute inset-y-0 right-0 w-10 bg-orange-500 flex items-center justify-center translate-x-10 group-hover:translate-x-0 transition-transform">→</div>
                </button>
            </div>

            <div class="overflow-x-auto no-scrollbar">
                <table class="w-full text-left border-separate border-spacing-y-5">
                    <thead>
                        <tr class="text-slate-400 text-[11px] font-black tracking-[0.2em] uppercase">
                            <th class="pb-2 pl-10">Tác phẩm</th>
                            <th class="pb-2">Phân loại</th>
                            <th class="pb-2 text-center">Số lượng</th>
                            <th class="pb-2 text-right pr-10">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${paginatedBooks
                          .map((s) => {
                            // Tạo màu sắc ngẫu nhiên cho Badge dựa trên thể loại
                            const badgeColors =
                              s.theLoaiId === 1
                                ? "bg-blue-500/10 text-blue-600 border-blue-200"
                                : "bg-purple-500/10 text-purple-600 border-purple-200";
                            
                            const theLoaiName = db.theLoai.find(t => t.id === s.theLoaiId)?.ten || "Khác";

                            return `
                                <tr class="group transition-all duration-500">
                                    <td class="py-6 pl-10 rounded-l-[2.5rem] bg-white border-y border-l border-slate-100 group-hover:border-orange-200 group-hover:bg-orange-50/20 transition-all">
                                        <div class="flex items-center gap-5">
                                            <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-300 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-orange-200 group-hover:rotate-6 transition-transform">📖</div>
                                            <div>
                                                <p class="font-black text-slate-800 text-lg group-hover:text-orange-600 transition-colors">${
                                                  s.tieuDe
                                                }</p>
                                                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">${
                                                  s.tacGia
                                                }</p>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td class="py-6 bg-white border-y border-slate-100 group-hover:border-orange-200 group-hover:bg-orange-50/20 transition-all">
                                        <span class="px-4 py-2 rounded-xl text-[10px] font-black uppercase border ${badgeColors}">
                                            ${theLoaiName}
                                        </span>
                                    </td>

                                    <td class="py-6 bg-white border-y border-slate-100 group-hover:border-orange-200 group-hover:bg-orange-50/20 transition-all text-center">
                                        <div class="inline-block">
                                            <span class="text-2xl font-black text-slate-800">${
                                              s.soLuong
                                            }</span>
                                            <div class="w-12 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                                <div class="h-full bg-orange-500" style="width: ${
                                                  s.soLuong > 50
                                                    ? 100
                                                    : s.soLuong * 2
                                                }%"></div>
                                            </div>
                                        </div>
                                    </td>

                                    <td class="py-6 pr-10 rounded-r-[2.5rem] bg-white border-y border-r border-slate-100 group-hover:border-orange-200 group-hover:bg-orange-50/20 transition-all text-right">
                                        <div class="flex justify-end gap-3">
                                            <button onclick="editBook(${
                                              s.id
                                            })" class="w-12 h-12 flex items-center justify-center bg-white text-blue-500 rounded-2xl border border-slate-100 shadow-sm hover:bg-blue-500 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                                               Sửa ✏️
                                            </button>
                                            <button onclick="deleteBook(${
                                              s.id
                                            })" class="w-12 h-12 flex items-center justify-center bg-white text-red-500 rounded-2xl border border-slate-100 shadow-sm hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all duration-300">
                                                Xóa 🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                          })
                          .join("")}
                    </tbody>
                </table>
            </div>

            <div class="flex justify-center items-center gap-3 mt-12">
                ${renderPagination(page, totalPages)}
            </div>
        </div>
        ${renderBookModalHTML()}
    `;
  
  return html;
}

function renderPagination(currentPage, totalPages) {
    let html = '';
    
    // Previous Button
    if (currentPage > 1) {
        html += `<button onclick="document.getElementById('mainContent').innerHTML = renderBooksModule(${currentPage - 1})" class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition-all">←</button>`;
    }

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            html += `<button class="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold shadow-lg shadow-slate-300 transition-all">${i}</button>`;
        } else {
            html += `<button onclick="document.getElementById('mainContent').innerHTML = renderBooksModule(${i})" class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition-all">${i}</button>`;
        }
    }

    // Next Button
    if (currentPage < totalPages) {
        html += `<button onclick="document.getElementById('mainContent').innerHTML = renderBooksModule(${currentPage + 1})" class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition-all">→</button>`;
    }

    return html;
}

function renderBookModalHTML() {
    return `
    <div id="bookModal" class="fixed inset-0 z-50 hidden">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onclick="closeBookModal()"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl transform transition-all scale-100">
            <h3 id="modalTitle" class="text-2xl font-black text-slate-800 mb-6">Thêm Sách Mới</h3>
            <form id="bookForm" onsubmit="saveBook(event)">
                <input type="hidden" id="bookId">
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tên sách</label>
                        <input type="text" id="bookTitle" required class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tác giả</label>
                            <input type="text" id="bookAuthor" required class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Năm XB</label>
                            <input type="number" id="bookYear" required class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Thể loại</label>
                            <select id="bookCategory" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700">
                                <option value="1">Công nghệ</option>
                                <option value="2">Văn học</option>
                                <option value="3">Ngoại ngữ</option>
                                <option value="4">Kỹ năng sống</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Số lượng</label>
                            <input type="number" id="bookQuantity" required class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700">
                        </div>
                    </div>
                </div>
                <div class="flex gap-3 mt-8">
                    <button type="button" onclick="closeBookModal()" class="flex-1 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Hủy bỏ</button>
                    <button type="submit" class="flex-1 py-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-200 transition-all">Lưu thông tin</button>
                </div>
            </form>
        </div>
    </div>
    `;
}

function showAddBookModal() {
    document.getElementById('modalTitle').innerText = 'Thêm Sách Mới';
    document.getElementById('bookForm').reset();
    document.getElementById('bookId').value = '';
    document.getElementById('bookModal').classList.remove('hidden');
}

function closeBookModal() {
    document.getElementById('bookModal').classList.add('hidden');
}

function editBook(id) {
    const db = getLibData();
    const book = db.sach.find(s => s.id === id);
    if (book) {
        document.getElementById('modalTitle').innerText = 'Cập Nhật Sách';
        document.getElementById('bookId').value = book.id;
        document.getElementById('bookTitle').value = book.tieuDe;
        document.getElementById('bookAuthor').value = book.tacGia;
        document.getElementById('bookYear').value = book.namXuatBan;
        document.getElementById('bookCategory').value = book.theLoaiId;
        document.getElementById('bookQuantity').value = book.soLuong;
        document.getElementById('bookModal').classList.remove('hidden');
    }
}

function saveBook(event) {
    event.preventDefault();
    const id = document.getElementById('bookId').value;
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const year = parseInt(document.getElementById('bookYear').value);
    const category = parseInt(document.getElementById('bookCategory').value);
    const quantity = parseInt(document.getElementById('bookQuantity').value);

    const db = getLibData();
    
    if (id) {
        // Update existing
        const index = db.sach.findIndex(s => s.id == id);
        if (index !== -1) {
            db.sach[index] = { ...db.sach[index], tieuDe: title, tacGia: author, namXuatBan: year, theLoaiId: category, soLuong: quantity };
        }
    } else {
        // Add new
        const newId = db.sach.length > 0 ? Math.max(...db.sach.map(s => s.id)) + 1 : 1;
        db.sach.unshift({
            id: newId,
            tieuDe: title,
            tacGia: author,
            namXuatBan: year,
            theLoaiId: category,
            soLuong: quantity
        });
    }

    updateLibData(db);
    closeBookModal();
    document.getElementById('mainContent').innerHTML = renderBooksModule(currentBookPage);
}

function deleteBook(id) {
    if (confirm('Bạn có chắc chắn muốn xóa sách này không?')) {
        const db = getLibData();
        db.sach = db.sach.filter(s => s.id !== id);
        updateLibData(db);
        document.getElementById('mainContent').innerHTML = renderBooksModule(currentBookPage);
    }
    logActivity("Xóa sách", `Quản trị viên đã xóa đầu sách có mã ID: ${id}`, "danger");

}
