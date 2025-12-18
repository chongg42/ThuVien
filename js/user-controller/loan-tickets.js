// js/user-controller/loan-tickets.js

function renderUserHistory() {
    const db = getLibData();
    const userId = getCurrentUserId();
    const myHistory = db.muonTra.filter(m => m.docGiaId === userId);

    let html = `
        <div class="bg-white/70 backdrop-blur-xl rounded-[4rem] p-10 border border-white shadow-xl animate-in fade-in duration-700">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-separate border-spacing-y-4">
                    <thead>
                        <tr class="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            <th class="pl-8 pb-4">Tên sách</th>
                            <th class="pb-4 text-center">Ngày mượn</th>
                            <th class="pb-4 text-center">Hạn trả</th>
                            <th class="pb-4 text-center">Trạng thái</th>
                            <th class="pr-8 pb-4 text-right">Vé QR</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myHistory.length > 0 ? myHistory.map(m => {
        const book = db.sach.find(s => s.id === m.sachId);
        const statusStyle = m.trangThai === 'Đã trả'
            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
            : 'bg-blue-50 text-blue-600 border-blue-100';

        return `
                            <tr class="group hover:scale-[1.01] transition-transform duration-300">
                                <td class="py-6 pl-8 bg-white border-y border-l border-slate-50 rounded-l-3xl font-bold text-slate-800 shadow-sm">${book?.tieuDe}</td>
                                <td class="py-6 bg-white border-y border-slate-50 text-center font-medium text-slate-500 shadow-sm">${m.ngayMuon}</td>
                                <td class="py-6 bg-white border-y border-slate-50 text-center font-medium text-slate-500 shadow-sm">${m.hanTra}</td>
                                <td class="py-6 bg-white border-y border-slate-50 text-center shadow-sm">
                                    <span class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase border ${statusStyle}">${m.trangThai}</span>
                                </td>
                                <td class="py-6 pr-8 bg-white border-y border-r border-slate-50 rounded-r-3xl text-right shadow-sm">
                                    <button onclick="showQRCode(${m.id})" class="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all">🖼️</button>
                                </td>
                            </tr>`;
    }).join('') : `
                            <tr>
                                <td colspan="5" class="text-center py-20 text-slate-400 font-bold uppercase tracking-widest">Bạn chưa có lịch sử mượn sách nào</td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById('mainContent').innerHTML = html;
}