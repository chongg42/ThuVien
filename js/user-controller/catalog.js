/* ================================
   GOOGLE BOOKS – COVER SERVICE
================================ */

// Lấy bìa sách từ Google Books (có cache)
async function getBookCover(title, author) {
    const cacheKey = `cover_${title}_${author}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;

    try {
        const q = encodeURIComponent(`${title} ${author}`);
        const res = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1`
        );
        const data = await res.json();

        const cover =
            data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail ||
            data.items?.[0]?.volumeInfo?.imageLinks?.smallThumbnail ||
            null;

        if (cover) localStorage.setItem(cacheKey, cover);
        return cover;
    } catch (e) {
        console.warn("Google Books error:", e);
        return null;
    }
}

/* ================================
   LAZY LOAD OBSERVER
================================ */

const coverObserver = new IntersectionObserver(entries => {
    entries.forEach(async entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const title = el.dataset.title;
        const author = el.dataset.author;

        const cover = await getBookCover(title, author);
        if (cover) {
            el.innerHTML = `
                <img 
                    src="${cover}" 
                    alt="${title}"
                    style="width:100%;height:100%;object-fit:cover;border-radius:2.5rem"
                />
            `;
        }

        coverObserver.unobserve(el);
    });
}, { threshold: 0.3 });



/* ================================
   RENDER CATALOG
================================ */

function renderCatalog(page = 1, category = 'all', searchQuery = '') {
    const db = getLibData();
    const itemsPerPage = 8;

    /* 🔥 THAY ĐỔI: FUZZY SEARCH */
    let filteredBooks = db.sach
        .filter(s => category === 'all' || s.theLoaiId == category)
        .map(s => ({
            ...s,
            _score: fuzzyScore(s, searchQuery) // 👉 CHẤM ĐIỂM
        }))
        .filter(s => searchQuery ? s._score > 0 : true)
        .sort((a, b) => b._score - a._score);

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

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:32px">
        ${
            paginatedBooks.length
            ? paginatedBooks.map(s => {
                const catName = db.theLoai.find(t => t.id === s.theLoaiId)?.ten || "Khác";
                return `
                <div style="background:#fff;padding:28px;border-radius:48px;box-shadow:0 20px 40px rgba(0,0,0,.06)">
                    <div
                        data-title="${s.tieuDe}"
                        data-author="${s.tacGia}"
                        onclick="showBookDetail(${s.id})"
                        class="book-cover"
                        style="aspect-ratio:3/4;background:#f8fafc;border-radius:40px;margin-bottom:20px;
                               display:flex;align-items:center;justify-content:center;font-size:48px;cursor:pointer">
                        📖
                    </div>

                    <h4 style="font-weight:900;font-size:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                        ${s.tieuDe}
                    </h4>
                    <p style="font-size:10px;color:#999;font-weight:800;text-transform:uppercase">
                        ${s.tacGia}
                    </p>

                    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
                        <span style="font-size:11px;font-weight:800;color:${s.soLuong > 0 ? '#10b981' : '#ef4444'}">
                            ${s.soLuong > 0 ? `Còn ${s.soLuong}` : 'Hết sách'}
                        </span>
                        <button onclick="addToCart(${s.id})"
                            style="width:48px;height:48px;border-radius:20px;background:#111;color:#fff">
                            🛒
                        </button>
                    </div>
                </div>
                `;
            }).join("")
            : `<div style="grid-column:1/-1;text-align:center;color:#aaa;font-weight:800">
                Không tìm thấy sách phù hợp
               </div>`
        }
        </div>

        ${
            totalPages > 1
            ? `<div style="display:flex;justify-content:center;gap:12px">
                ${Array.from({ length: totalPages }, (_, i) => `
                    <button onclick="renderCatalog(${i + 1},'${category}','${searchQuery}')"
                        style="width:40px;height:40px;border-radius:16px;
                               font-weight:900;
                               background:${page === i + 1 ? '#f97316' : '#fff'};
                               color:${page === i + 1 ? '#fff' : '#999'}">
                        ${i + 1}
                    </button>
                `).join("")}
               </div>`
            : ""
        }
    </div>
    `;

    document.getElementById("mainContent").innerHTML = html;

    // Lazy load cover
    document.querySelectorAll(".book-cover").forEach(el => {
        coverObserver.observe(el);
    });
}

/* ================================
   SEARCH (GIỮ ONCLICK)
================================ */

function handleCatalogSearch( category) {
    const value = document.getElementById("catalogSearch").value;
    renderCatalog(1, category, value);
}

/* ================================
   DETAIL MODAL
================================ */

async function showBookDetail(id) {
    const db = getLibData();
    const s = db.sach.find(b => b.id == id);
    if (!s) return;

    const cover = await getBookCover(s.tieuDe, s.tacGia);

    const modal = `
    <div id="bookModal" style="position:fixed;inset:0;background:rgba(0,0,0,.6);
                               display:flex;align-items:center;justify-content:center;z-index:999">
        <div style="background:#fff;padding:32px;border-radius:48px;max-width:900px;width:100%;position:relative">
            <button onclick="document.getElementById('bookModal').remove()"
                style="position:absolute;top:20px;right:20px;font-size:20px">✕</button>

            <div style="display:flex;gap:32px">
                <div style="width:45%;aspect-ratio:3/4;background:#f8fafc;border-radius:40px;
                            display:flex;align-items:center;justify-content:center;font-size:48px">
                    ${cover ? `<img src="${cover}" style="width:100%;height:100%;object-fit:cover;border-radius:40px">` : '📚'}
                </div>

                <div style="flex:1">
                    <h2 style="font-size:36px;font-weight:900">${s.tieuDe}</h2>
                    <p style="color:#999;font-weight:800">Tác giả: ${s.tacGia}</p>
                    <p style="color:#999;font-weight:800">Năm: ${s.namXuatBan}</p>
                </div>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modal);
}
