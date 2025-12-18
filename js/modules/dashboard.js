function renderDashboard(db) {
  const today = new Date();
  const overdueCount = db.muonTra.filter(
    (m) => m.trangThai === "Đang mượn" && new Date(m.hanTra) < today
  ).length;
  return `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            <div class="group p-8 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <div class="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">📚</div>
                    <span class="text-[10px] font-black bg-orange-100 text-orange-600 px-3 py-1 rounded-full uppercase tracking-widest">Kho sách</span>
                </div>
                <h4 class="text-5xl font-black text-slate-800">${db.sach.length}</h4>
                <div class="mt-4 flex items-center gap-2 text-green-500 font-bold text-sm">
                    <span>↑ 12%</span> <span class="text-slate-400 font-medium">so với tháng trước</span>
                </div>
            </div>

            <div class="group p-8 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">👥</div>
                    <span class="text-[10px] font-black bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase tracking-widest">Độc giả</span>
                </div>
                <h4 class="text-5xl font-black text-slate-800">${db.docGia.length}</h4>
                <div class="mt-4 flex items-center gap-2 text-blue-500 font-bold text-sm">
                    <span>+${db.docGia.length}</span> <span class="text-slate-400 font-medium">người dùng mới</span>
                </div>
            </div>

            <div class="group p-8 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <div class="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">⚡</div>
                    <span class="text-[10px] font-black bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-widest">Giao dịch</span>
                </div>
                <h4 class="text-5xl font-black text-slate-800">${db.muonTra.length}</h4>
                <div class="mt-4 flex items-center gap-2 text-emerald-500 font-bold text-sm">
                    <span>Hoạt động</span> <span class="text-slate-400 font-medium">trong 24h qua</span>
                </div>
            </div>

            <div class="group p-8 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-300">
                <div class="flex justify-between items-center mb-6">
                    <div class="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">⚠️</div>
                    <span class="text-[10px] font-black bg-rose-100 text-rose-600 px-3 py-1 rounded-full uppercase tracking-widest">Cảnh báo</span>
                </div>
                <h4 class="text-5xl font-black text-rose-500">12</h4>
                <div class="mt-4 flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <span>Kiểm tra ngay</span>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-[3.5rem] p-10 shadow-2xl shadow-slate-200/30 border border-white">
            <div class="flex justify-between items-center mb-10">
                <div>
                    <h3 class="text-3xl font-black text-slate-800 tracking-tighter">Hoạt động gần đây</h3>
                    <p class="text-slate-400 text-sm font-medium">Cập nhật dữ liệu thời gian thực</p>
                </div>
                <div class="flex gap-4">
                    <button class="px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition">Lọc dữ liệu</button>
                    <button class="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-slate-300 transition-all">Chi tiết</button>
                </div>
            </div>

            <div class="overflow-hidden rounded-[2rem] border border-slate-50">
                <table class="w-full text-left">
                    <thead class="bg-slate-50/50">
                        <tr class="text-slate-400 uppercase text-[11px] font-black tracking-[0.2em]">
                            <th class="p-6">Thời gian</th>
                            <th class="p-6">Thành viên</th>
                            <th class="p-6">Trạng thái</th>
                            <th class="p-6">Tên sách</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        <tr class="group hover:bg-slate-50/80 transition-all">
                            <td class="p-6 text-slate-400 text-sm">10:45 AM</td>
                            <td class="p-6 font-bold text-slate-700">Nguyễn Văn An</td>
                            <td class="p-6">
                                <span class="bg-orange-500/10 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-orange-100">Đang mượn</span>
                            </td>
                            <td class="p-6 font-bold text-slate-800 group-hover:text-orange-500 transition-colors">Clean Code</td>
                        </tr>
                        <tr class="group hover:bg-slate-50/80 transition-all">
                            <td class="p-6 text-slate-400 text-sm">09:12 AM</td>
                            <td class="p-6 font-bold text-slate-700">Trần Thị B</td>
                            <td class="p-6">
                                <span class="bg-emerald-500/10 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-emerald-100">Đã trả</span>
                            </td>
                            <td class="p-6 font-bold text-slate-800 group-hover:text-emerald-500 transition-colors">Tâm Lý Học Tội Phạm</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
