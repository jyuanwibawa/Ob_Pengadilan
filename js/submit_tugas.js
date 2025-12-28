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
function selesaikanTugas() {
    const fileBefore = document.getElementById('input-before').value;
    const fileAfter = document.getElementById('input-after').value;
    const notes = document.getElementById('taskNotes').value;

    if (!fileBefore || !fileAfter) {
        alert("Harap lengkapi dokumentasi foto (Sebelum & Sesudah)!");
        return;
    }

    if (confirm("Apakah Anda yakin data sudah benar dan ingin menyelesaikan tugas ini?")) {
        // Simulasi pengiriman data ke server
        const submitBtn = document.querySelector('.btn-success');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Hapus data tugas dari sessionStorage
            sessionStorage.removeItem('currentTask');
            
            alert("Tugas Berhasil Diselesaikan! \nData terkirim ke server.");
            
            // Redirect ke dashboard
            window.location.href = 'dashboard.html';
        }, 2000);
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
