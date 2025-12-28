// JavaScript untuk menangani submit form login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validasi sederhana
    if (username && password) {
        // Simpan status login dan username ke sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        
        // Tampilkan pesan sukses
        const btn = document.querySelector('.btn-login');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memeriksa...';
        
        // Simulasi proses login (bisa diganti dengan AJAX ke server)
        setTimeout(() => {
            // Redirect ke halaman dashboard
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        alert('Mohon isi username dan password dengan benar');
    }
});

// Cek status login saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        // Jika sudah login, redirect ke dashboard
        window.location.href = 'dashboard.html';
    }
});
