// js/user-controller/history.js

function renderUserHistory() {
    const db = getLibData();
    const currentUser = JSON.parse(localStorage.getItem('libra_login'));
    const userId = currentUser ? currentUser.id : null;

    if (!userId) {
        document.getElementById('mainContent').innerHTML = `<p class="p-10 text-center font-bold">Vui lòng đăng nhập để xem lịch sử.</p>`;
        return;
    }

    // 1. Lấy danh sách yêu cầu chờ duyệt
    const myRequests = (db.yeuCauMuon || []).filter(r => r.docGiaId === userId);

    // 2. Lấy danh sách phiếu mượn thực tế (Đang mượn & Đã trả)
    const myLoans = (db.muonTra || []).filter(m => m.docGiaId === userId);

    let html = `
        <div class="animate-in fade-in slide-in-from-right-10 duration-700 space-y-10 pb-10">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 class="text-4xl font-black text-slate-900 tracking-tighter">Hoạt Động <span class="text-blue-500">Gần Đây</span></h3>
                    <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Theo dõi các yêu cầu và sách đang mượn</p>
                </div>
            </div>

            ${myRequests.length > 0 ? `
            <div class="space-y-4">
                <h4 class="text-sm font-black text-orange-500 uppercase tracking-widest flex items-center gap-2">
                    <span class="relative flex h-2 w-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    Yêu cầu chờ thủ thư duyệt
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${myRequests.map(r => {
                        const book = db.sach.find(s => s.id == r.sachId);
                        return `
                        <div class="p-6 bg-orange-50/50 border border-orange-100 rounded-[2.5rem] flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm">📩</div>
                                <div>
                                    <h5 class="font-bold text-slate-800">${r.tenSach || book?.tieuDe}</h5>
                                    <p class="text-[10px] text-slate-400 font-bold uppercase">Ngày gửi: ${r.ngayYeuCau}</p>
                                </div>
                            </div>
                            <button onclick="cancelRequest(${r.id})" class="text-[10px] font-black text-rose-500 uppercase hover:underline">Hủy</button>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
            ` : ''}

            <div class="bg-white/70 backdrop-blur-xl rounded-[3.5rem] border border-white shadow-xl overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b border-slate-50">
                            <th class="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Thông tin sách</th>
                            <th class="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ngày mượn</th>
                            <th class="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Hạn trả</th>
                            <th class="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myLoans.length === 0 ? `
                            <tr>
                                <td colspan="4" class="p-20 text-center">
                                    <p class="text-slate-300 font-bold uppercase tracking-widest text-xs">Chưa có lịch sử mượn sách</p>
                                </td>
                            </tr>
                        ` : myLoans.map(m => {
                            const book = db.sach.find(s => s.id == m.sachId);
                            const isOverdue = new Date(m.hanTra) < new Date() && m.trangThai === "Đang mượn";
                            
                            return `
                            <tr class="group hover:bg-slate-50/50 transition-all">
                                <td class="p-8">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">📚</div>
                                        <div>
                                            <p class="font-black text-slate-800">${book?.tieuDe || 'N/A'}</p>
                                            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${book?.tacGia || 'N/A'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="p-8 font-mono text-xs font-bold text-slate-500">${m.ngayMuon}</td>
                                <td class="p-8 font-mono text-xs font-bold ${isOverdue ? 'text-rose-500' : 'text-slate-500'}">${m.hanTra}</td>
                                <td class="p-8">
                                    <span class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest
                                        ${m.trangThai === 'Đang mượn' ? (isOverdue ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600') : 'bg-slate-100 text-slate-400'}">
                                        ${isOverdue ? 'Quá hạn' : m.trangThai}
                                    </span>
                                </td>
                            </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById('mainContent').innerHTML = html;
}

// Hàm hủy yêu cầu khi còn đang chờ duyệt
function cancelRequest(requestId) {
    if (confirm("Bạn muốn hủy yêu cầu mượn này?")) {
        const db = getLibData();
        db.yeuCauMuon = db.yeuCauMuon.filter(r => r.id !== requestId);
        updateLibData(db);
        renderUserHistory(); // Tải lại trang
        alert("Đã hủy yêu cầu thành công.");
    }
}