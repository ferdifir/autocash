Project Node.js dan MySQL dengan Fitur Cek Mutasi, Cash-In, Scrapping, dan Match Row
Project ini dibuat untuk melakukan cek mutasi, cash-in, scrapping, dan match row pada sebuah aplikasi web. Aplikasi ini dibangun menggunakan Node.js dan MySQL. Fitur-fitur yang disediakan antara lain:

Cek mutasi untuk Dana dan Gopay via Gopay API dengan interval waktu 1 menit, 3 menit, atau 5 menit.
Setiap mutasi yang masuk akan dimasukkan ke dalam menu cash-in pada database MySQL.
Auto scrapping dengan Puppeteer untuk melakukan scrapping info pembelian baru pada sebuah website.
Proses match pada row yang sama untuk kemudian di proses atau di naikan ke proses payment.
Instalasi
Untuk menjalankan project ini, pastikan bahwa Anda telah menginstal Node.js dan MySQL pada komputer Anda.

Clone repositori ini ke komputer Anda.
Buka terminal dan arahkan ke direktori project.
Jalankan perintah npm install untuk menginstal semua dependensi yang diperlukan.
Konfigurasi
Untuk menggunakan fitur cek mutasi, Anda perlu mengatur Gopay API key pada file .env. Buatlah file .env pada direktori project dan isi dengan informasi sebagai berikut:

makefile
Copy code
GOPAY_API_KEY=your_api_key_here
Pastikan untuk mengganti your_api_key_here dengan API key Anda.

Untuk menghubungkan ke database MySQL, Anda perlu mengatur konfigurasi pada file config.js. Isi dengan informasi sebagai berikut:

javascript
Copy code
module.exports = {
  host: 'localhost',
  user: 'root',
  password: 'your_password_here',
  database: 'your_database_name_here'
};
Pastikan untuk mengganti your_password_here dan your_database_name_here dengan informasi yang sesuai dengan database MySQL Anda.

Penggunaan
Untuk menjalankan aplikasi, jalankan perintah npm start pada terminal. Aplikasi akan berjalan pada port 3000.

Aplikasi memiliki empat routing yang dapat digunakan:

/cek-mutasi - untuk melakukan cek mutasi. Interval waktu dapat disesuaikan dengan mengubah cron job pada file index.js.
/cash-in - untuk melihat data cash-in yang telah masuk ke dalam database MySQL.
/scrapping - untuk melakukan scrapping pada sebuah website. URL website dapat disesuaikan dengan mengubah kode pada file index.js.
/match-row - untuk melakukan match row dan proses payment. Interval waktu dapat disesuaikan dengan mengubah cron job pada file index.js.