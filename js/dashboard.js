// Fungsi untuk logout
function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        // Hapus data login dari sessionStorage
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('username');
        // Redirect ke halaman login
        window.location.href = 'login.html';
    }
}

// Fungsi untuk menampilkan username di header
function displayUsername() {
    const username = sessionStorage.getItem('username') || 'Pengguna';
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
        usernameDisplay.textContent = username;
    }
}

// Fungsi untuk mengecek status login
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        // Jika belum login, redirect ke halaman login
        window.location.href = 'login.html';
    }
}

// Fungsi untuk mengupdate progress bar
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar-fill');
    if (progressBar) {
        // Simulasi loading progress
        let width = 0;
        const targetWidth = 20; // 20% progress
        const interval = setInterval(() => {
            if (width >= targetWidth) {
                clearInterval(interval);
            } else {
                width++;
                progressBar.style.width = width + '%';
            }
        }, 30);
    }
}

// Fungsi untuk menambahkan efek hover pada task card
function setupTaskCardHover() {
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
        });
    });
}

// Fungsi untuk menambahkan animasi pada task cards
function animateTaskCards() {
    const cards = document.querySelectorAll('.task-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Fungsi untuk menangani klik pada task card
function setupTaskCardClick() {
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            // Tambahkan logika ketika task card diklik
            const taskTitle = this.querySelector('h3').textContent;
            console.log(`Task "${taskTitle}" diklik`);
            // Bisa ditambahkan modal atau navigasi ke halaman detail
        });
    });
}

// Fungsi untuk mengupdate waktu real-time
function updateDateTime() {
    const timeElements = document.querySelectorAll('.time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    timeElements.forEach(element => {
        if (element.querySelector('i')) {
            element.innerHTML = `<i class="fa-regular fa-clock"></i> ${timeString}`;
        }
    });
}

// Inisialisasi semua fungsi ketika halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Cek status login
    checkLoginStatus();
    
    // Tampilkan username
    displayUsername();
    
    // Update progress bar dengan animasi
    updateProgressBar();
    
    // Setup efek hover pada task card
    setupTaskCardHover();
    
    // Setup animasi task cards
    animateTaskCards();
    
    // Setup klik pada task card
    setupTaskCardClick();
    
    // Update waktu real-time
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update setiap menit
    
    // Tambahkan event listener untuk tombol logout
    const logoutBtn = document.querySelector('.icon-btn[onclick="logout()"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            logout();
        });
    }
});
