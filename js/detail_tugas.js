// Fungsi untuk menangani klik tombol scan
document.addEventListener('DOMContentLoaded', function() {
    const scanButton = document.getElementById('scanButton');
    
    if (scanButton) {
        scanButton.addEventListener('click', startScan);
    }

    // Animasi saat elemen dimuat
    animateElements();
});

// Fungsi untuk memulai proses scan
// Fungsi untuk memulai proses scan
function startScan() {
    const button = document.getElementById('scanButton');
    const originalHTML = button.innerHTML;
    
    // Tampilkan loading state
    button.classList.add('loading');
    button.innerHTML = '<i class="fa-solid fa-circle-notch"></i> Membuka Kamera...';
    button.disabled = true;

    // Coba buka kamera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } // Gunakan kamera belakang
        })
        .then(function(stream) {
            // Kamera berhasil dibuka
            console.log('Kamera berhasil dibuka');
            
            // Stop stream untuk saat ini (simulasi)
            stream.getTracks().forEach(track => track.stop());
            
            // Tampilkan pesan sukses
            alert('Kamera berhasil dibuka!\nBarcode berhasil dipindai.');
            
            // Update status tugas menjadi 'Dikerjakan'
            updateTaskStatus('Dikerjakan');
            
            // Redirect ke halaman submit_tugas.html
            setTimeout(() => {
                window.location.href = 'submit_tugas.html';
            }, 500);
        })
        .catch(function(error) {
            console.error('Error membuka kamera:', error);
            
            // Jika gagal membuka kamera, tampilkan pesan error
            alert('Tidak dapat membuka kamera. Pastikan Anda telah memberikan izin kamera.');
            
            // Reset tombol
            button.classList.remove('loading');
            button.innerHTML = originalHTML;
            button.disabled = false;
        });
    } else {
        // Browser tidak mendukung getUserMedia
        alert('Browser Anda tidak mendukung akses kamera.');
        
        // Reset tombol
        button.classList.remove('loading');
        button.innerHTML = originalHTML;
        button.disabled = false;
    }
}

// Fungsi untuk mengupdate status tugas
function updateTaskStatus(newStatus) {
    const statusPill = document.querySelector('.status-pill');
    const statusDot = document.querySelector('.status-dot');
    
    if (!statusPill || !statusDot) return;
    
    // Update teks status
    statusPill.innerHTML = `<span class="status-dot"></span> ${newStatus}`;
    
    // Update warna berdasarkan status
    if (newStatus === 'Dikerjakan') {
        statusPill.style.backgroundColor = '#ecfdf5';
        statusPill.style.borderColor = '#10b981';
        statusPill.style.color = '#10b981';
        statusDot.style.backgroundColor = '#10b981';
    } else if (newStatus === 'Selesai') {
        statusPill.style.backgroundColor = '#f0f9ff';
        statusPill.style.borderColor = '#0ea5e9';
        statusPill.style.color = '#0ea5e9';
        statusDot.style.backgroundColor = '#0ea5e9';
    }
}

// Fungsi untuk animasi elemen saat halaman dimuat
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
