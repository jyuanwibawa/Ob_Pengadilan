// Fungsi untuk memuat data tugas dari sessionStorage
document.addEventListener('DOMContentLoaded', function() {
    loadTaskData();
    animateElements();
});

// Fungsi untuk memuat data tugas
function loadTaskData() {
    const taskData = JSON.parse(sessionStorage.getItem('currentTask'));
    
    if (taskData) {
        // Update elemen dengan data tugas
        const taskTitle = document.getElementById('taskTitle');
        const taskLocation = document.getElementById('taskLocation');
        const taskTime = document.getElementById('taskTime');
        const taskDesc = document.getElementById('taskDesc');
        
        if (taskTitle) taskTitle.textContent = taskData.title || 'Tugas';
        if (taskLocation) taskLocation.textContent = taskData.location || 'Lokasi';
        if (taskTime) taskTime.textContent = `Jadwal: ${taskData.time || '09:00'}`;
        if (taskDesc) taskDesc.textContent = taskData.desc || 'Deskripsi tugas';
    }
}

// Fungsi untuk trigger upload file
function triggerUpload(inputId, previewId) {
    document.getElementById(inputId).click();
}

// Fungsi untuk handle file upload
function handleFile(input, previewId, contentId) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Validasi ukuran file (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('Ukuran file terlalu besar. Maksimal 10MB.');
            input.value = '';
            return;
        }
        
        // Validasi tipe file
        if (!file.type.match('image.*')) {
            alert('File harus berupa gambar (PNG, JPG, JPEG).');
            input.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById(previewId);
            const content = document.getElementById(contentId);
            
            img.src = e.target.result;
            img.style.display = 'block';
            content.style.display = 'none';
        }
        reader.readAsDataURL(file);
    }
}

// Fungsi untuk menyelesaikan tugas
// Di dalam fungsi selesaikanTugas() di submit_tugas.js
function selesaikanTugas() {
    const fileBefore = document.getElementById('input-before');
    const fileAfter = document.getElementById('input-after');
    const notes = document.getElementById('taskNotes').value;

    if (!fileBefore.files.length || !fileAfter.files.length) {
        alert("Harap lengkapi dokumentasi foto (Sebelum & Sesudah)!");
        return;
    }

    if (confirm("Apakah Anda yakin data sudah benar dan ingin menyelesaikan tugas ini?")) {
        const submitBtn = document.querySelector('.btn-success');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;

        // Simpan data tugas dan foto ke sessionStorage
        const taskData = JSON.parse(sessionStorage.getItem('currentTask') || '{}');
        
        // Konversi file ke base64
        const reader1 = new FileReader();
        const reader2 = new FileReader();
        
        reader1.onload = function(e1) {
            taskData.photoBefore = e1.target.result;
            
            reader2.onload = function(e2) {
                taskData.photoAfter = e2.target.result;
                taskData.notes = notes;
                taskData.completedAt = new Date().toISOString();
                
                // Simpan data yang sudah diupdate
                sessionStorage.setItem('currentTask', JSON.stringify(taskData));
                
                // Redirect ke halaman selesai
                setTimeout(() => {
                    window.location.href = 'done_tugas.html';
                }, 1000);
            };
            
            reader2.readAsDataURL(fileAfter.files[0]);
        };
        
        reader1.readAsDataURL(fileBefore.files[0]);
    }
}

// Fungsi untuk menampilkan preview gambar
function handleFile(input, previewId, contentId) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Validasi ukuran file (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('Ukuran file terlalu besar. Maksimal 10MB.');
            input.value = '';
            return;
        }
        
        // Validasi tipe file
        if (!file.type.match('image.*')) {
            alert('File harus berupa gambar (PNG, JPG, JPEG).');
            input.value = '';
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById(previewId);
            const content = document.getElementById(contentId);
            
            if (img) {
                img.src = e.target.result;
                img.style.display = 'block';
            }
            
            if (content) {
                content.style.display = 'none';
            }
        }
        reader.readAsDataURL(file);
    }
}

// Fungsi untuk animasi elemen
function animateElements() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.3s ease ${index * 0.1}s`;
        
        // Trigger reflow
        void card.offsetWidth;
        
        // Animate in
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
}

// Fungsi untuk menangani tombol kembali
function handleBackButton() {
    window.history.back();
}

// Tambahkan event listener untuk tombol kembali
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.querySelector('.back-link');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleBackButton();
        });
    }
});
