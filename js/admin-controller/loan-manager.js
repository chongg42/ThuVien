// js/modules/loan-manager.js

function renderLoanModule(page = 1) {
    const db = getLibData();
    const itemsPerPage = 6;
    const totalPages = Math.ceil(db.muonTra.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const paginatedLoans = db.muonTra.slice(start, start + itemsPerPage);

    let html = `
        <div class="bg-white/70 backdrop-blur-2xl rounded-[4rem] p-10 shadow-xl border border-white/50 animate-in fade-in duration-700">
            <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <span class="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-2 block">Giao dịch</span>
                    <h3 class="text-4xl font-black text-slate-900 tracking-tighter">Quản Lý <span class="text-blue-500">Mượn - Trả</span></h3>
                </div>
                <button onclick="showAddLoanModal()" class="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-blue-600 transition-all uppercase text-sm">
                    + Tạo phiếu mượn
                </button>
            </div>

            <div class="overflow-x-auto no-scrollbar">
                <table class="w-full text-left border-separate border-spacing-y-4">
                    <thead>
                        <tr class="text-slate-400 text-[10px] font-black tracking-widest uppercase">
                            <th class="pb-4 pl-8">Độc giả</th>
                            <th class="pb-4">Sách mượn</th>
                            <th class="pb-4">Hạn trả</th>
                            <th class="pb-4 text-center">Trạng thái</th>
                            <th class="pb-4 text-right pr-8">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${paginatedLoans.map(m => {
        const user = db.docGia.find(u => u.id === m.docGiaId);
        const book = db.sach.find(s => s.id === m.sachId);
        const isOverdue = new Date(m.hanTra) < new Date() && m.trangThai === "Đang mượn";

        return `
                                <tr class="group">
                                    <td class="py-5 pl-8 bg-white border-y border-l border-slate-50 rounded-l-3xl group-hover:bg-blue-50/30 transition-all">
                                        <div class="font-bold text-slate-800">${user?.hoTen || 'N/A'}</div>
                                        <div class="text-[10px] text-slate-400">ID: ${user?.id}</div>
                                    </td>
                                    <td class="py-5 bg-white border-y border-slate-50 group-hover:bg-blue-50/30 transition-all">
                                        <div class="font-bold text-slate-700">${book?.tieuDe || 'N/A'}</div>
                                    </td>
                                    <td class="py-5 bg-white border-y border-slate-50 group-hover:bg-blue-50/30 transition-all font-mono text-xs ${isOverdue ? 'text-rose-500 font-black' : 'text-slate-500'}">
                                        ${m.hanTra}
                                    </td>
                                    <td class="py-5 bg-white border-y border-slate-50 group-hover:bg-blue-50/30 transition-all text-center">
                                        <span class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase border 
                                            ${m.trangThai === 'Đã trả' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'}">
                                            ${m.trangThai}
                                        </span>
                                    </td>
                                    <td class="py-5 pr-8 bg-white border-y border-r border-slate-50 rounded-r-3xl group-hover:bg-blue-50/30 transition-all text-right">
                                        ${m.trangThai === 'Đang mượn' ? `
                                            <button onclick="processReturn(${m.id})" class="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black hover:bg-emerald-600 transition-all shadow-md shadow-emerald-100 uppercase">Trả sách</button>
                                        ` : `
                                            <span class="text-emerald-500 text-xs font-bold">✓ Hoàn tất</span>
                                        `}
                                    </td>
                                </tr>
                            `;
    }).join('')}
                    </tbody>
                </table>
            </div>

            <div class="flex justify-center mt-10 gap-2">
                ${renderLoanPagination(page, totalPages)}
            </div>
        </div>
    `;
    document.getElementById('mainContent').innerHTML = html;
}

function renderLoanPagination(current, total) {
    let p = '';
    for (let i = 1; i <= total; i++) {
        p += `<button onclick="renderLoanModule(${i})" class="w-10 h-10 rounded-xl font-bold transition-all ${current === i ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-slate-400 hover:bg-blue-50'}">${i}</button>`;
    }
    return p;
}

function processReturn(loanId) {
    const db = getLibData();
    const loan = db.muonTra.find(m => m.id === loanId);

    if (loan && confirm("Xác nhận độc giả đã trả sách này?")) {
        // 1. Cập nhật trạng thái phiếu mượn
        loan.trangThai = "Đã trả";
        loan.ngayTraThucTe = new Date().toISOString().split('T')[0];

        // 2. Cập nhật số lượng sách trong kho (+1)
        const book = db.sach.find(s => s.id === loan.sachId);
        if (book) {
            book.soLuong += 1;
        }

        // 3. Lưu dữ liệu
        updateLibData(db);

        // 4. Ghi nhật ký
        const user = db.docGia.find(u => u.id === loan.docGiaId);
        logActivity("Trả sách", `Độc giả ${user?.hoTen} đã trả sách: ${book?.tieuDe}`, "success");

        // 5. Load lại giao diện
        renderLoanModule();
    }
}

// Hàm hiển thị Modal Tạo phiếu mượn
function showAddLoanModal() {
    const modalHTML = `
        <div id="loanModal" class="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div class="bg-white rounded-[3rem] p-10 w-full max-w-2xl shadow-2xl border border-white max-h-[90vh] overflow-y-auto no-scrollbar">
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-3xl font-black text-slate-900">Tạo <span class="text-blue-500">Phiếu Mượn QR</span></h3>
                    <button onclick="closeLoanModal()" class="text-slate-400 hover:text-rose-500 transition-colors text-2xl">✕</button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Máy quét QR Code</label>
                        <div id="reader" class="overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 aspect-square relative">
                            <div id="qr-loading" class="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400 text-xs">Đang khởi động Camera...</div>
                        </div>
                        <p class="text-[10px] text-center text-slate-400 italic">Hướng camera về phía mã QR của Sách hoặc Thẻ độc giả</p>
                    </div>

                    <div class="space-y-6">
                        <div id="manual-input-section">
                            <div class="mb-4">
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Mã Độc Giả (ID)</label>
                                <input type="number" id="loan-user-id" placeholder="Quét thẻ hoặc nhập ID..." 
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-blue-500 outline-none transition-all">
                            </div>
                            <div class="mb-4">
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Mã Sách (ID)</label>
                                <input type="number" id="loan-book-id" placeholder="Quét sách hoặc nhập ID..." 
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-blue-500 outline-none transition-all">
                            </div>
                            <div class="mb-4">
                                <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Hạn trả (Mặc định 14 ngày)</label>
                                <input type="date" id="loan-due-date" 
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none transition-all">
                            </div>
                            <button onclick="submitLoan()" class="w-full py-5 bg-blue-500 text-white rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all uppercase tracking-widest">
                                Xác nhận mượn sách
                            </button>
                        </div>
                        
                        <!-- Batch Confirm Section (Hidden by default) -->
                        <div id="batch-confirm-section" class="hidden">
                            <div class="bg-blue-50 p-4 rounded-2xl mb-4">
                                <p class="text-xs font-bold text-blue-800 mb-1">Độc giả: <span id="batch-user-name">...</span></p>
                                <p class="text-[10px] text-blue-600">ID: <span id="batch-user-id">...</span></p>
                            </div>
                            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Danh sách sách mượn</p>
                            <ul id="batch-book-list" class="space-y-2 mb-6 max-h-40 overflow-y-auto custom-scrollbar">
                                <!-- Books will be injected here -->
                            </ul>
                            <button onclick="submitBatchLoan()" class="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all uppercase tracking-widest">
                                Xác nhận mượn tất cả
                            </button>
                            <button onclick="resetLoanForm()" class="w-full mt-2 py-3 text-slate-400 font-bold text-xs hover:text-slate-600">
                                Hủy bỏ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Thiết lập ngày hạn trả mặc định là 14 ngày sau
    const date = new Date();
    date.setDate(date.getDate() + 14);
    document.getElementById('loan-due-date').value = date.toISOString().split('T')[0];

    // Khởi tạo máy quét với độ trễ nhỏ để đảm bảo DOM ready
    setTimeout(() => {
        startQRScanner();
    }, 500);
}

let html5QrCode;
let batchData = null; // Store scanned batch data

function startQRScanner() {
    // Kiểm tra thư viện
    if (typeof Html5Qrcode === "undefined") {
        alert("Lỗi: Thư viện QR Code chưa được tải. Vui lòng tải lại trang.");
        return;
    }

    try {
        html5QrCode = new Html5Qrcode("reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
            try {
                // 1. Thử parse JSON (Format mới từ User Portal)
                if (decodedText.startsWith("{") && decodedText.endsWith("}")) {
                    const data = JSON.parse(decodedText);
                    if (data.userId && data.bookIds) {
                        handleBatchScan(data);
                        return;
                    }
                }
            } catch (e) {
                // Not JSON, ignore
            }

            // 2. Xử lý format cũ (USER:1, BOOK:5)
            if (decodedText.startsWith("USER:")) {
                document.getElementById('loan-user-id').value = decodedText.split(":")[1];
                logActivity("QR Scanner", "Đã nhận diện mã Độc giả", "info");
            } else if (decodedText.startsWith("BOOK:")) {
                document.getElementById('loan-book-id').value = decodedText.split(":")[1];
                logActivity("QR Scanner", "Đã nhận diện mã Sách", "info");
            } else {
                // Nếu QR chỉ là số
                if (!document.getElementById('loan-user-id').value) {
                    document.getElementById('loan-user-id').value = decodedText;
                } else {
                    document.getElementById('loan-book-id').value = decodedText;
                }
            }
        }).catch(err => {
            console.error("Lỗi Camera:", err);
            document.getElementById('qr-loading').innerText = "Không thể mở Camera. Vui lòng cấp quyền.";
        });
    } catch (e) {
        console.error("Lỗi khởi tạo QR:", e);
        document.getElementById('qr-loading').innerText = "Lỗi khởi tạo Scanner.";
    }
}

function handleBatchScan(data) {
    const db = getLibData();
    const user = db.docGia.find(u => u.id === parseInt(data.userId));
    if (!user) return alert("Không tìm thấy thông tin độc giả trong mã QR!");

    batchData = data; // Save for submission

    // Switch UI to Batch Mode
    document.getElementById('manual-input-section').classList.add('hidden');
    document.getElementById('batch-confirm-section').classList.remove('hidden');

    // Fill Info
    document.getElementById('batch-user-name').innerText = user.hoTen;
    document.getElementById('batch-user-id').innerText = user.id;

    const list = document.getElementById('batch-book-list');
    list.innerHTML = '';

    data.bookIds.forEach(bid => {
        const book = db.sach.find(s => s.id === parseInt(bid));
        if (book) {
            list.innerHTML += `
                <li class="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span class="text-xs font-bold text-slate-700">${book.tieuDe}</span>
                    <span class="text-[10px] font-mono text-slate-400">ID: ${book.id}</span>
                </li>
            `;
        }
    });

    logActivity("QR Scanner", `Đã quét phiếu mượn của ${user.hoTen} (${data.bookIds.length} sách)`, "info");

    // Stop scanner temporarily to avoid re-scan
    if (html5QrCode) {
        html5QrCode.pause();
    }
}

function resetLoanForm() {
    document.getElementById('manual-input-section').classList.remove('hidden');
    document.getElementById('batch-confirm-section').classList.add('hidden');
    batchData = null;
    if (html5QrCode) {
        html5QrCode.resume();
    }
}

function submitBatchLoan() {
    if (!batchData) return;

    const db = getLibData();
    const userId = parseInt(batchData.userId);
    const user = db.docGia.find(u => u.id === userId);

    // Default due date: 14 days from now
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 14);
    const todayStr = today.toISOString().split('T')[0];
    const dueDateStr = dueDate.toISOString().split('T')[0];

    let successCount = 0;

    batchData.bookIds.forEach(bid => {
        const book = db.sach.find(s => s.id === parseInt(bid));
        if (book && book.soLuong > 0) {
            const newLoan = {
                id: Date.now() + Math.random(),
                docGiaId: userId,
                sachId: book.id,
                ngayMuon: todayStr,
                hanTra: dueDateStr,
                trangThai: "Đang mượn"
            };
            db.muonTra.unshift(newLoan);
            book.soLuong -= 1;
            successCount++;
        }
    });

    if (successCount > 0) {
        updateLibData(db);
        logActivity("Mượn sách", `Độc giả ${user.hoTen} đã mượn ${successCount} cuốn sách qua QR`, "success");
        alert(`Đã tạo phiếu mượn thành công cho ${successCount} cuốn sách!`);
        closeLoanModal();
        renderLoanModule();
    } else {
        alert("Không thể tạo phiếu mượn (Sách hết hoặc lỗi dữ liệu).");
    }
}

function closeLoanModal() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById('loanModal').remove();
        }).catch(() => {
            document.getElementById('loanModal').remove();
        });
    } else {
        document.getElementById('loanModal').remove();
    }
}

function submitLoan() {
    const db = getLibData();
    const userId = parseInt(document.getElementById('loan-user-id').value);
    const bookId = parseInt(document.getElementById('loan-book-id').value);
    const dueDate = document.getElementById('loan-due-date').value;

    // Kiểm tra dữ liệu đầu vào
    const user = db.docGia.find(u => u.id === userId);
    const book = db.sach.find(s => s.id === bookId);

    if (!user) return alert("Không tìm thấy độc giả!");
    if (!book) return alert("Không tìm thấy sách!");
    if (book.soLuong <= 0) return alert("Sách này hiện đã hết trong kho!");

    // Tạo phiếu mượn mới
    const newLoan = {
        id: Date.now(),
        docGiaId: userId,
        sachId: bookId,
        ngayMuon: new Date().toISOString().split('T')[0],
        hanTra: dueDate,
        trangThai: "Đang mượn"
    };

    // Cập nhật Database
    db.muonTra.unshift(newLoan); // Thêm phiếu mượn
    book.soLuong -= 1; // Trừ kho 1 cuốn

    updateLibData(db);
    logActivity("Mượn sách", `Độc giả ${user.hoTen} mượn cuốn: ${book.tieuDe}`, "success");

    alert("Tạo phiếu mượn thành công!");
    closeLoanModal();
    renderLoanModule(); // Cập nhật lại bảng
}