// ============ DATA STORAGE ============
let videos = JSON.parse(localStorage.getItem('preseninex_videos')) || [];
let categories = JSON.parse(localStorage.getItem('preseninex_categories')) || [];
let currentVideo = null;

// Default categories jika kosong
const defaultCategories = [
    { id: 1, name: "Microsoft Word", description: "Tutorial Microsoft Word", color: "blue-500", videoCount: 0 },
    { id: 2, name: "Microsoft Excel", description: "Tutorial Microsoft Excel", color: "green-500", videoCount: 0 },
    { id: 3, name: "Microsoft PowerPoint", description: "Tutorial PowerPoint", color: "purple-500", videoCount: 0 },
    { id: 4, name: "Canva", description: "Desain dengan Canva", color: "yellow-500", videoCount: 0 },
    { id: 5, name: "Programming", description: "Pemrograman dasar", color: "red-500", videoCount: 0 },
    { id: 6, name: "Digital Marketing", description: "Pemasaran digital", color: "purple-500", videoCount: 0 }
];

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const videoGrid = document.getElementById('videoGrid');
const emptyState = document.getElementById('emptyState');
const categoryList = document.getElementById('categoryList');
const emptyCategories = document.getElementById('emptyCategories');
const categoryStats = document.getElementById('categoryStats');
const statsTotalCategories = document.getElementById('statsTotalCategories');
const filterCategory = document.getElementById('filterCategory');
const videoCategory = document.getElementById('videoCategory');

// ============ EXPOSE FUNCTIONS TO WINDOW ============
window.switchTab = switchTab;
window.resetUploadForm = resetUploadForm;
window.showAddCategoryModal = showAddCategoryModal;
window.closeAddCategoryModal = closeAddCategoryModal;
window.playVideo = playVideo;
window.closeVideoPlayer = closeVideoPlayer;
window.toggleLike = toggleLike;
window.shareVideo = shareVideo;
window.openVideoInNewTab = openVideoInNewTab;
window.editVideo = editVideo;
window.deleteVideo = deleteVideo;
window.editCategory = editCategory;
window.deleteCategory = deleteCategory;
window.applyFilters = applyFilters;

// ============ LOGOUT FUNCTIONALITY ============
function setupLogoutHandlers() {
    console.log('Setup logout handlers dimulai...');
    
    const logoutBtn = document.getElementById('logoutDropdownBtn');
    const logoutModal = document.getElementById('logoutModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

    // Cek semua elemen
    console.log('Elemen ditemukan:', {
        logoutBtn: !!logoutBtn,
        logoutModal: !!logoutModal,
        closeModalBtn: !!closeModalBtn,
        cancelLogoutBtn: !!cancelLogoutBtn,
        confirmLogoutBtn: !!confirmLogoutBtn
    });

    // Validasi elemen
    if (!logoutBtn) {
        console.error('ERROR: Tombol logout tidak ditemukan!');
        return;
    }
    
    if (!logoutModal) {
        console.error('ERROR: Modal logout tidak ditemukan!');
        return;
    }

    // 1. Buka modal logout
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Tombol logout diklik');
        
        logoutModal.classList.remove('hidden');
        logoutModal.classList.add('flex');
        
        setTimeout(() => {
            logoutModal.classList.add('show');
            logoutModal.style.opacity = '1';
        }, 10);
    });

    // 2. Tutup modal dengan tombol X
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            console.log('Tombol close diklik');
            closeLogoutModal(logoutModal);
        });
    }

    // 3. Tutup modal dengan tombol Batal
    if (cancelLogoutBtn) {
        cancelLogoutBtn.addEventListener('click', function() {
            console.log('Tombol batal diklik');
            closeLogoutModal(logoutModal);
        });
    }

    // 4. Tutup modal klik di luar
    logoutModal.addEventListener('click', function(e) {
        if (e.target === logoutModal) {
            console.log('Klik di luar modal');
            closeLogoutModal(logoutModal);
        }
    });

    // 5. Konfirmasi logout
    if (confirmLogoutBtn) {
        confirmLogoutBtn.addEventListener('click', function() {
            console.log('Tombol konfirmasi logout diklik');
            
            const originalContent = confirmLogoutBtn.innerHTML;
            
            // Loading state
            confirmLogoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Logging out...';
            confirmLogoutBtn.disabled = true;
            confirmLogoutBtn.style.opacity = '0.8';
            
            // Tutup modal
            closeLogoutModal(logoutModal);
            
            // Proses logout
            setTimeout(() => {
                // Reset tombol
                confirmLogoutBtn.innerHTML = originalContent;
                confirmLogoutBtn.disabled = false;
                confirmLogoutBtn.style.opacity = '1';
                
                // Tampilkan notifikasi
                Swal.fire({
                    title: 'Logout Berhasil!',
                    text: 'Anda akan diarahkan ke halaman login...',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    background: 'linear-gradient(135deg, #0a192f, #112240)',
                    color: '#f8f9fa'
                }).then(() => {
                    // Hapus data login
                    localStorage.clear();
                    sessionStorage.clear();
                    
                    // Redirect ke login
                    window.location.href = 'login.html';
                });
            }, 800);
        });
    }

    // 6. Tombol ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (logoutModal && !logoutModal.classList.contains('hidden')) {
                console.log('Tombol ESC ditekan');
                closeLogoutModal(logoutModal);
            }
        }
    });
    
    console.log('Setup logout handlers selesai!');
}

// Fungsi helper untuk menutup modal
function closeLogoutModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('show');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        initializeApp();
    }, 1000);
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.getAttribute('data-tab'));
        });
    });
    
    // Form submission
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleVideoSubmit);
    }
    
    const addCategoryForm = document.getElementById('addCategoryForm');
    if (addCategoryForm) {
        addCategoryForm.addEventListener('submit', handleCategorySubmit);
    }
    
    const applyFilterBtn = document.getElementById('applyFilter');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', applyFilters);
    }
    
    // Category color selection
    document.querySelectorAll('.category-color').forEach(color => {
        color.addEventListener('click', function() {
            document.querySelectorAll('.category-color').forEach(c => {
                c.classList.remove('border-white');
                c.classList.add('border-transparent');
            });
            this.classList.remove('border-transparent');
            this.classList.add('border-white');
            document.getElementById('categoryColor').value = this.getAttribute('data-color');
        });
    });
    
    // Setup logout dengan delay
    setTimeout(() => {
        setupLogoutHandlers();
    }, 500);
});

// ============ APP FUNCTIONS ============
function initializeApp() {
    if (categories.length === 0) {
        categories = defaultCategories;
        localStorage.setItem('preseninex_categories', JSON.stringify(categories));
    }
    
    if (videos.length === 0) {
        addSampleVideo();
    }
    
    updateStats();
    loadCategories();
    loadVideos();
    loadCategorySelects();
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        }
    });
    
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.add('hidden');
    });
    
    const tabMap = {
        'videos': 'videosTab',
        'upload': 'uploadTab',
        'categories': 'categoriesTab'
    };
    
    if (tabMap[tabName]) {
        const tabElement = document.getElementById(tabMap[tabName]);
        if (tabElement) {
            tabElement.classList.remove('hidden');
        }
    }
    
    if (tabName === 'videos') loadVideos();
    if (tabName === 'categories') loadCategories();
}

function updateStats() {
    const statsTotalCategoriesEl = document.getElementById('statsTotalCategories');
    if (statsTotalCategoriesEl) {
        statsTotalCategoriesEl.textContent = categories.length;
    }
}

function loadVideos() {
    if (!videoGrid) return;
    
    const filterCat = filterCategory ? filterCategory.value : '';
    const filterLevelEl = document.getElementById('filterLevel');
    const filterLevel = filterLevelEl ? filterLevelEl.value : '';
    
    let filteredVideos = videos;
    
    if (filterCat) {
        filteredVideos = filteredVideos.filter(video => video.category === filterCat);
    }
    
    if (filterLevel) {
        filteredVideos = filteredVideos.filter(video => video.level === filterLevel);
    }
    
    if (filteredVideos.length === 0) {
        videoGrid.innerHTML = '';
        if (emptyState) {
            emptyState.classList.remove('hidden');
        }
        return;
    }
    
    if (emptyState) {
        emptyState.classList.add('hidden');
    }
    
    videoGrid.innerHTML = filteredVideos.map(video => `
        <div class="video-card card overflow-hidden">
            <div class="thumbnail-container cursor-pointer" onclick="playVideo(${video.id})">
                ${video.thumbnailUrl ? `
                    <img src="${video.thumbnailUrl}" alt="${video.title}" class="thumbnail">
                ` : `
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <i class="fas fa-play-circle text-5xl text-blue-400"></i>
                    </div>
                `}
                <div class="play-overlay">
                    <i class="fas fa-play text-white text-xl"></i>
                </div>
                <div class="absolute top-3 right-3">
                    <span class="badge ${video.visibility === 'private' ? 'badge-warning' : 'badge-success'}">
                        ${video.visibility === 'private' ? 'Private' : 'Public'}
                    </span>
                </div>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-bold text-lg truncate" title="${video.title}">${video.title}</h4>
                    <span class="text-sm px-2 py-1 rounded ${getLevelColor(video.level)}">
                        ${video.level}
                    </span>
                </div>
                <p class="text-sm text-gray-400 mb-3 truncate-2" title="${video.description}">
                    ${video.description || 'Tidak ada deskripsi'}
                </p>
                <div class="flex justify-between items-center text-sm">
                    <span class="text-gray-300">
                        <i class="fas fa-folder mr-1"></i>
                        ${video.category}
                    </span>
                    <span class="text-gray-300">
                        <i class="fas fa-eye mr-1"></i>
                        ${video.views || 0}
                    </span>
                </div>
                <div class="flex space-x-2 mt-4">
                    <button onclick="playVideo(${video.id})" class="btn-primary flex-1">
                        <i class="fas fa-play mr-2"></i>Tonton
                    </button>
                    <button onclick="editVideo(${video.id})" class="btn-secondary">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteVideo(${video.id})" class="btn-secondary bg-red-500/20 text-red-400 border-red-500/30">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getLevelColor(level) {
    switch(level) {
        case 'pemula': return 'bg-green-500/20 text-green-400';
        case 'menengah': return 'bg-yellow-500/20 text-yellow-400';
        case 'lanjutan': return 'bg-red-500/20 text-red-400';
        default: return 'bg-gray-500/20 text-gray-400';
    }
}

function loadCategories() {
    if (!categoryList) return;
    
    if (categories.length === 0) {
        categoryList.innerHTML = '';
        if (emptyCategories) {
            emptyCategories.classList.remove('hidden');
        }
        return;
    }
    
    if (emptyCategories) {
        emptyCategories.classList.add('hidden');
    }
    
    categoryList.innerHTML = categories.map(category => `
        <div class="category-item flex justify-between items-center">
            <div class="flex items-center space-x-3">
                <div class="w-4 h-4 rounded-full bg-${category.color}"></div>
                <div>
                    <h4 class="font-semibold">${category.name}</h4>
                    <p class="text-sm text-gray-400">${category.description || 'Tidak ada deskripsi'}</p>
                </div>
            </div>
            <div class="flex items-center space-x-3">
                <span class="text-sm text-gray-300">${category.videoCount || 0} video</span>
                <button onclick="editCategory(${category.id})" class="text-blue-400 hover:text-blue-300">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteCategory(${category.id})" class="text-red-400 hover:text-red-300">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    updateCategoryStats();
}

function updateCategoryStats() {
    if (!categoryStats) return;
    
    const stats = categories.map(cat => {
        const videoCount = videos.filter(video => video.category === cat.name).length;
        return { ...cat, videoCount };
    }).sort((a, b) => b.videoCount - a.videoCount);
    
    categoryStats.innerHTML = stats.map(cat => `
        <div class="flex justify-between items-center">
            <span class="text-sm flex items-center">
                <div class="w-3 h-3 rounded-full bg-${cat.color} mr-2"></div>
                ${cat.name}
            </span>
            <span class="font-semibold">${cat.videoCount} video</span>
        </div>
    `).join('');
}

function loadCategorySelects() {
    const categoryOptions = categories.map(cat => 
        `<option value="${cat.name}">${cat.name}</option>`
    ).join('');
    
    if (filterCategory) {
        filterCategory.innerHTML = '<option value="">Semua Kategori</option>' + categoryOptions;
    }
    
    if (videoCategory) {
        videoCategory.innerHTML = '<option value="">Pilih kategori...</option>' + categoryOptions;
    }
}

function handleVideoSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('videoTitle').value;
    const category = document.getElementById('videoCategory').value;
    const level = document.getElementById('videoLevel').value;
    const duration = document.getElementById('videoDuration').value;
    const description = document.getElementById('videoDescription').value;
    const tags = document.getElementById('videoTags').value;
    const thumbnailUrl = document.getElementById('thumbnailUrl').value;
    const videoUrl = document.getElementById('videoUrl').value;
    const visibility = document.querySelector('input[name="visibility"]:checked').value;
    
    if (!category) {
        Swal.fire('Error', 'Pilih kategori terlebih dahulu', 'error');
        return;
    }
    
    const newVideo = {
        id: Date.now(),
        title,
        category,
        level,
        duration: duration ? parseInt(duration) : 0,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        thumbnailUrl: thumbnailUrl || `https://picsum.photos/seed/${Date.now()}/400/225`,
        videoUrl,
        visibility,
        views: 0,
        likes: 0,
        date: new Date().toLocaleDateString('id-ID'),
        createdAt: new Date().toISOString()
    };
    
    videos.push(newVideo);
    localStorage.setItem('preseninex_videos', JSON.stringify(videos));
    
    Swal.fire('Berhasil!', 'Video berhasil ditambahkan', 'success');
    
    resetUploadForm();
    updateStats();
    loadVideos();
    updateCategoryStats();
    
    switchTab('videos');
}

function resetUploadForm() {
    const form = document.getElementById('uploadForm');
    if (form) {
        form.reset();
    }
    const videoUrl = document.getElementById('videoUrl');
    if (videoUrl) {
        videoUrl.value = '';
    }
    const thumbnailUrl = document.getElementById('thumbnailUrl');
    if (thumbnailUrl) {
        thumbnailUrl.value = '';
    }
}

function playVideo(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (!video) return;
    
    currentVideo = video;
    
    video.views = (video.views || 0) + 1;
    localStorage.setItem('preseninex_videos', JSON.stringify(videos));
    updateStats();
    
    const modalVideoTitle = document.getElementById('modalVideoTitle');
    const modalVideoInfo = document.getElementById('modalVideoInfo');
    const modalVideoDescription = document.getElementById('modalVideoDescription');
    const likeCount = document.getElementById('likeCount');
    
    if (modalVideoTitle) modalVideoTitle.textContent = video.title;
    if (modalVideoInfo) modalVideoInfo.textContent = 
        `${video.category} • ${video.level.charAt(0).toUpperCase() + video.level.slice(1)} • ${video.views} views`;
    if (modalVideoDescription) modalVideoDescription.textContent = video.description || 'Tidak ada deskripsi';
    if (likeCount) likeCount.textContent = video.likes || 0;
    
    const videoPlayer = document.getElementById('modalVideoPlayer');
    let embedUrl = '';
    
    if (video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be')) {
        const videoId = extractYouTubeId(video.videoUrl);
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (video.videoUrl.includes('vimeo.com')) {
        const videoId = video.videoUrl.split('/').pop();
        embedUrl = `https://player.vimeo.com/video/${videoId}`;
    } else {
        embedUrl = video.videoUrl;
    }
    
    if (videoPlayer) {
        videoPlayer.src = embedUrl;
    }
    
    const tagsContainer = document.getElementById('modalVideoTags');
    if (tagsContainer) {
        tagsContainer.innerHTML = video.tags.map(tag => 
            `<span class="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">${tag}</span>`
        ).join('');
    }
    
    const modal = document.getElementById('videoPlayerModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function extractYouTubeId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : null;
}

function closeVideoPlayer() {
    const modal = document.getElementById('videoPlayerModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    const videoPlayer = document.getElementById('modalVideoPlayer');
    if (videoPlayer) {
        videoPlayer.src = '';
    }
    currentVideo = null;
}

function toggleLike() {
    if (currentVideo) {
        currentVideo.likes = (currentVideo.likes || 0) + 1;
        localStorage.setItem('preseninex_videos', JSON.stringify(videos));
        const likeCount = document.getElementById('likeCount');
        if (likeCount) {
            likeCount.textContent = currentVideo.likes;
        }
        
        const heart = document.querySelector('#videoPlayerModal .fa-heart');
        if (heart) {
            heart.classList.remove('far');
            heart.classList.add('fas', 'text-red-500');
            
            setTimeout(() => {
                heart.classList.add('animate-ping');
                setTimeout(() => {
                    heart.classList.remove('animate-ping');
                }, 300);
            }, 100);
        }
    }
}

function shareVideo() {
    if (currentVideo && navigator.share) {
        navigator.share({
            title: currentVideo.title,
            text: currentVideo.description,
            url: currentVideo.videoUrl
        });
    } else if (currentVideo) {
        navigator.clipboard.writeText(currentVideo.videoUrl).then(() => {
            Swal.fire('Link Disalin!', 'Link video telah disalin ke clipboard', 'success');
        });
    }
}

function openVideoInNewTab() {
    if (currentVideo && currentVideo.videoUrl) {
        window.open(currentVideo.videoUrl, '_blank');
    }
}

function editVideo(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (!video) return;
    
    Swal.fire({
        title: 'Edit Video',
        html: `
            <input id="editTitle" class="swal2-input" placeholder="Judul" value="${video.title}">
            <input id="editUrl" class="swal2-input" placeholder="URL Video" value="${video.videoUrl}">
            <textarea id="editDescription" class="swal2-textarea" placeholder="Deskripsi">${video.description || ''}</textarea>
        `,
        showCancelButton: true,
        confirmButtonText: 'Simpan',
        cancelButtonText: 'Batal',
        preConfirm: () => {
            return {
                title: document.getElementById('editTitle').value,
                url: document.getElementById('editUrl').value,
                description: document.getElementById('editDescription').value
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            video.title = result.value.title;
            video.videoUrl = result.value.url;
            video.description = result.value.description;
            localStorage.setItem('preseninex_videos', JSON.stringify(videos));
            loadVideos();
            Swal.fire('Berhasil!', 'Video telah diperbarui', 'success');
        }
    });
}

function deleteVideo(videoId) {
    Swal.fire({
        title: 'Hapus Video?',
        text: "Video yang dihapus tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            videos = videos.filter(v => v.id !== videoId);
            localStorage.setItem('preseninex_videos', JSON.stringify(videos));
            loadVideos();
            updateStats();
            updateCategoryStats();
            Swal.fire('Terhapus!', 'Video telah dihapus.', 'success');
        }
    });
}

function showAddCategoryModal() {
    const modal = document.getElementById('addCategoryModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeAddCategoryModal() {
    const modal = document.getElementById('addCategoryModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    const form = document.getElementById('addCategoryForm');
    if (form) {
        form.reset();
    }
}

function handleCategorySubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('categoryName').value;
    const description = document.getElementById('categoryDescription').value;
    const color = document.getElementById('categoryColor').value;
    
    const newCategory = {
        id: Date.now(),
        name,
        description,
        color,
        videoCount: 0
    };
    
    categories.push(newCategory);
    localStorage.setItem('preseninex_categories', JSON.stringify(categories));
    
    Swal.fire('Berhasil!', 'Kategori berhasil ditambahkan', 'success');
    
    closeAddCategoryModal();
    loadCategories();
    loadCategorySelects();
    updateStats();
}

function editCategory(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    Swal.fire({
        title: 'Edit Kategori',
        html: `
            <input id="editCatName" class="swal2-input" placeholder="Nama Kategori" value="${category.name}">
            <textarea id="editCatDesc" class="swal2-textarea" placeholder="Deskripsi">${category.description || ''}</textarea>
        `,
        showCancelButton: true,
        confirmButtonText: 'Simpan',
        cancelButtonText: 'Batal',
        preConfirm: () => {
            return {
                name: document.getElementById('editCatName').value,
                description: document.getElementById('editCatDesc').value
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            category.name = result.value.name;
            category.description = result.value.description;
            localStorage.setItem('preseninex_categories', JSON.stringify(categories));
            loadCategories();
            loadCategorySelects();
            Swal.fire('Berhasil!', 'Kategori telah diperbarui', 'success');
        }
    });
}

function deleteCategory(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const videosUsingCategory = videos.filter(v => v.category === category.name);
    
    if (videosUsingCategory.length > 0) {
        Swal.fire({
            title: 'Tidak Dapat Dihapus',
            text: `Kategori ini digunakan oleh ${videosUsingCategory.length} video. Ubah kategori video terlebih dahulu.`,
            icon: 'error'
        });
        return;
    }
    
    Swal.fire({
        title: 'Hapus Kategori?',
        text: "Kategori yang dihapus tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            categories = categories.filter(c => c.id !== categoryId);
            localStorage.setItem('preseninex_categories', JSON.stringify(categories));
            loadCategories();
            loadCategorySelects();
            updateStats();
            Swal.fire('Terhapus!', 'Kategori telah dihapus.', 'success');
        }
    });
}

function applyFilters() {
    loadVideos();
}

function addSampleVideo() {
    const sampleVideo = {
        id: 1,
        title: "Tutorial Microsoft Word Dasar",
        category: "Microsoft Word",
        level: "pemula",
        duration: 45,
        description: "Belajar Microsoft Word dari dasar untuk pemula. Pelajari fitur-fitur penting untuk membuat dokumen profesional.",
        tags: ["microsoft", "word", "tutorial", "dasar"],
        thumbnailUrl: "https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=225&q=80",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        visibility: "public",
        views: 150,
        likes: 25,
        date: "10 Februari 2026",
        createdAt: new Date().toISOString()
    };
    
    videos.push(sampleVideo);
    localStorage.setItem('preseninex_videos', JSON.stringify(videos));
}

function setupLogoutHandlers() {
    console.log('🚀 Memulai setup logout handlers...');
    
    // ELEMENT SELECTORS - Pastikan ID sesuai dengan HTML
    const logoutBtn = document.getElementById('logoutBtn'); // Perhatikan ID ini!
    const logoutModal = document.getElementById('logoutModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
    const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

    // ============ DEBUGGING ============
    console.log('🔍 Pencarian elemen logout:');
    console.log('  - Tombol Logout (ID: logoutBtn):', logoutBtn ? '✅ Ditemukan' : '❌ TIDAK DITEMUKAN!');
    console.log('  - Modal Logout (ID: logoutModal):', logoutModal ? '✅ Ditemukan' : '❌ TIDAK DITEMUKAN!');
    console.log('  - Tombol Close (ID: closeModalBtn):', closeModalBtn ? '✅ Ditemukan' : '❌ TIDAK DITEMUKAN!');
    console.log('  - Tombol Batal (ID: cancelLogoutBtn):', cancelLogoutBtn ? '✅ Ditemukan' : '❌ TIDAK DITEMUKAN!');
    console.log('  - Tombol Konfirmasi (ID: confirmLogoutBtn):', confirmLogoutBtn ? '✅ Ditemukan' : '❌ TIDAK DITEMUKAN!');

    // ============ VALIDASI ELEMEN ============
    if (!logoutBtn) {
        console.error('❌ KRITIS: Tombol logout dengan ID "logoutBtn" tidak ditemukan di HTML!');
        console.error('   Pastikan ada elemen: <button id="logoutBtn">...</button>');
        return;
    }
    
    if (!logoutModal) {
        console.error('❌ KRITIS: Modal logout dengan ID "logoutModal" tidak ditemukan di HTML!');
        return;
    }

    // ============ 1. BUKA MODAL LOGOUT ============
    // Hapus event listener lama untuk menghindari duplikasi
    logoutBtn.removeEventListener('click', handleOpenModal);
    logoutBtn.addEventListener('click', handleOpenModal);
    console.log('✅ Event listener OPEN MODAL dipasang pada tombol logout');

    function handleOpenModal(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('📤 Tombol logout diklik - membuka modal');
        
        // Reset class modal
        logoutModal.classList.remove('hidden');
        logoutModal.classList.add('flex');
        
        // Gunakan setTimeout untuk memastikan transisi CSS bekerja
        setTimeout(() => {
            logoutModal.style.opacity = '1';
            logoutModal.style.visibility = 'visible';
        }, 10);
        
        // Log untuk debugging
        console.log('📊 Status modal setelah dibuka:', {
            hidden: logoutModal.classList.contains('hidden'),
            flex: logoutModal.classList.contains('flex'),
            opacity: logoutModal.style.opacity
        });
    }

    // ============ 2. TUTUP MODAL (CLOSE / BATAL / ESC) ============
    
    // Tombol Close (X)
    if (closeModalBtn) {
        closeModalBtn.removeEventListener('click', handleCloseModal);
        closeModalBtn.addEventListener('click', handleCloseModal);
        console.log('✅ Event listener CLOSE MODAL dipasang pada tombol close');
    }

    // Tombol Batal
    if (cancelLogoutBtn) {
        cancelLogoutBtn.removeEventListener('click', handleCloseModal);
        cancelLogoutBtn.addEventListener('click', handleCloseModal);
        console.log('✅ Event listener CLOSE MODAL dipasang pada tombol batal');
    }

    // Klik di luar modal
    logoutModal.removeEventListener('click', handleOutsideClick);
    logoutModal.addEventListener('click', handleOutsideClick);
    console.log('✅ Event listener CLICK OUTSIDE dipasang');

    // Tombol ESC
    document.removeEventListener('keydown', handleEscapeKey);
    document.addEventListener('keydown', handleEscapeKey);
    console.log('✅ Event listener ESC KEY dipasang');

    function handleCloseModal(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        console.log('🔒 Menutup modal logout');
        
        logoutModal.style.opacity = '0';
        logoutModal.style.visibility = 'hidden';
        
        setTimeout(() => {
            logoutModal.classList.add('hidden');
            logoutModal.classList.remove('flex');
        }, 300);
    }

    function handleOutsideClick(e) {
        if (e.target === logoutModal) {
            console.log('👆 Klik di luar modal');
            handleCloseModal(e);
        }
    }

    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            if (logoutModal && !logoutModal.classList.contains('hidden')) {
                console.log('⌨️ Tombol ESC ditekan');
                handleCloseModal(e);
            }
        }
    }

    // ============ 3. KONFIRMASI LOGOUT ============
    if (confirmLogoutBtn) {
        confirmLogoutBtn.removeEventListener('click', handleConfirmLogout);
        confirmLogoutBtn.addEventListener('click', handleConfirmLogout);
        console.log('✅ Event listener CONFIRM LOGOUT dipasang');
    }

    function handleConfirmLogout(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🔴 Konfirmasi logout diproses');
        
        // Simpan konten asli tombol
        const originalContent = confirmLogoutBtn.innerHTML;
        
        // Loading state
        confirmLogoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Logging out...';
        confirmLogoutBtn.disabled = true;
        confirmLogoutBtn.style.opacity = '0.7';
        confirmLogoutBtn.style.cursor = 'not-allowed';
        
        // Tutup modal terlebih dahulu
        handleCloseModal();
        
        // Tampilkan notifikasi
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Logout Berhasil!',
                text: 'Anda akan diarahkan ke halaman login...',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                background: 'linear-gradient(135deg, #0a192f, #112240)',
                color: '#f8f9fa',
                customClass: {
                    popup: 'rounded-2xl border border-blue-400/30'
                }
            });
        }
        
        // Proses logout setelah delay
        setTimeout(() => {
            // Reset tombol
            confirmLogoutBtn.innerHTML = originalContent;
            confirmLogoutBtn.disabled = false;
            confirmLogoutBtn.style.opacity = '1';
            confirmLogoutBtn.style.cursor = 'pointer';
            
            // HAPUS SEMUA DATA LOGIN
            console.log('🧹 Membersihkan data localStorage...');
            
            // 1. Hapus semua item spesifik
            const keysToRemove = [
                'presensinex_currentUser',
                'presensinex_userRole', 
                'presensinex_isLoggedIn',
                'presensinex_loginTime',
                'presensinex_temp_user',
                'presensinex_current_video',
                'preseninex_videos',
                'preseninex_categories'
            ];
            
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
                console.log(`   - ${key}: dihapus`);
            });
            
            // 2. Clear sessionStorage
            sessionStorage.clear();
            console.log('   - sessionStorage: dibersihkan');
            
            // 3. Clear semua localStorage (opsional - backup)
            // localStorage.clear();
            
            console.log('✅ Semua data telah dibersihkan');
            
            // 4. Redirect ke halaman login
            console.log('➡️ Mengarahkan ke login.html...');
            window.location.href = 'login.html';
        }, 2000);
    }

    console.log('✅ Setup logout handlers SELESAI!');
    return true;
}

// ============ FALLBACK: PAKSA TOMBOL LOGOUT BEKERJA ============
// Fungsi ini akan dijalankan otomatis dan memastikan tombol logout berfungsi

(function forceLogoutButton() {
    // Jalankan setelah DOM siap
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(forceAttachLogoutHandler, 500);
        });
    } else {
        setTimeout(forceAttachLogoutHandler, 500);
    }
    
    function forceAttachLogoutHandler() {
        console.log('⚡ Force attach logout handler...');
        
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (logoutBtn) {
            // Hapus semua event listener lama (dengan clone node)
            const newLogoutBtn = logoutBtn.cloneNode(true);
            logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
            
            // Pasang event listener baru
            newLogoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎯 Force logout click!');
                
                const modal = document.getElementById('logoutModal');
                if (modal) {
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                    setTimeout(() => {
                        modal.style.opacity = '1';
                        modal.style.visibility = 'visible';
                    }, 10);
                } else {
                    // Fallback langsung logout jika modal tidak ada
                    Swal.fire({
                        title: 'Konfirmasi Logout',
                        text: 'Apakah Anda yakin ingin keluar?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Ya, Logout',
                        cancelButtonText: 'Batal'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.clear();
                            sessionStorage.clear();
                            window.location.href = 'login.html';
                        }
                    });
                }
            });
            
            console.log('✅ Force logout handler attached!');
        } else {
            console.error('❌ TIDAK BISA FORCE: Tombol logout tidak ditemukan di DOM!');
            console.error('   Pastikan elemen dengan id="logoutBtn" ada di HTML');
        }
    }
})();

// ============ PASTIKAN SETUP DIPANGGIL ============
// Panggil setup di berbagai kesempatan untuk memastikan bekerja

// 1. Panggil di DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM Content Loaded - Memulai setup...');
    // Delay untuk memastikan elemen sudah dirender
    setTimeout(function() {
        setupLogoutHandlers();
    }, 300);
});

// 2. Panggil di window load
window.addEventListener('load', function() {
    console.log('🖼️ Window Load - Memastikan setup...');
    setupLogoutHandlers();
});

// 3. Panggil manual dengan delay bertahap
setTimeout(setupLogoutHandlers, 500);
setTimeout(setupLogoutHandlers, 1000);
setTimeout(setupLogoutHandlers, 1500);