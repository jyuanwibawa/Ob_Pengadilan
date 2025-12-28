// JavaScript untuk menangani submit form login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validasi sederhana
    if(username && password) {
        // Di sini biasanya Anda mengirim data ke server
        alert('Login Berhasil!\nSelamat datang, ' + username);
        
        // Efek loading tombol
        const btn = document.querySelector('.btn-login');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Memuat...';
        
        // Simulasi loading
        setTimeout(() => {
            btn.innerHTML = originalText;
            // Redirect ke halaman dashboard atau halaman selanjutnya
            // window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        alert('Mohon isi username dan password dengan benar');
    }
});
