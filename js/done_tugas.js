// done_tugas.js
document.addEventListener('DOMContentLoaded', function() {
    // Format waktu sekarang
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}.${minutes}`;
    
    // Update waktu selesai
    const timeElement = document.getElementById('time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }

    // Ambil data tugas dari sessionStorage jika ada
    const taskData = JSON.parse(sessionStorage.getItem('currentTask'));
    if (taskData) {
        // Update data tugas
        const taskTitle = document.getElementById('taskTitle');
        const taskLocation = document.getElementById('taskLocation');
        const taskTime = document.getElementById('taskTime');
        const taskDesc = document.getElementById('taskDesc');
        const taskNotes = document.getElementById('taskNotes');
        
        if (taskTitle) taskTitle.textContent = taskData.title || 'Tugas';
        if (taskLocation) taskLocation.textContent = taskData.location || 'Lokasi';
        if (taskTime) taskTime.textContent = `Jadwal: ${taskData.time || '09:00'}`;
        if (taskDesc) taskDesc.textContent = taskData.desc || 'Deskripsi tugas';
        if (taskNotes && taskData.notes) {
            taskNotes.textContent = taskData.notes;
        }

        // Update foto jika ada
        const photoBefore = document.getElementById('photoBefore');
        const photoAfter = document.getElementById('photoAfter');
        
        if (taskData.photoBefore && photoBefore) {
            photoBefore.src = taskData.photoBefore;
        }
        
        if (taskData.photoAfter && photoAfter) {
            photoAfter.src = taskData.photoAfter;
        }
    }

    // Animasi saat halaman dimuat
    animateElements();
});

// Fungsi untuk animasi elemen
function animateElements() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
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
    window.location.href = 'dashboard.html';
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