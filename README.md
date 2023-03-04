# Autocash
Project ini dibuat untuk melakukan cek mutasi, cash-in, scrapping, dan match row pada sebuah aplikasi web. Aplikasi ini dibangun menggunakan Node.js dan MySQL.

## Fitur-fitur yang disediakan antara lain:
- Cek mutasi untuk Dana dan Gopay via Gopay API dengan interval waktu 1 menit, 3 menit, atau 5 menit.
- Setiap mutasi yang masuk akan dimasukkan ke dalam menu cash-in pada database MySQL.
- Auto scrapping dengan Puppeteer untuk melakukan scrapping info pembelian baru pada sebuah website.
- Proses match pada row yang sama untuk kemudian di proses atau di naikan ke proses payment.

## Instalasi
Untuk menjalankan project ini, pastikan bahwa Anda telah menginstal Node.js dan MySQL pada komputer Anda.

- Clone repositori ini ke komputer Anda.
- Buka terminal dan arahkan ke direktori project.
- Jalankan perintah npm install untuk menginstal semua dependensi yang diperlukan.
