const express = require('express');
const mysql = require('mysql2');
const cron = require('node-cron');
const puppeteer = require('puppeteer');

// konfigurasi database
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ferdifir',
  database: 'autocash'
});

// inisialisasi aplikasi express
const app = express();

// routing untuk cek mutasi
app.get('/cek-mutasi', (req, res) => {
  // lakukan cek mutasi di sini
  // simpan data mutasi ke dalam database
  
  db.query('INSERT INTO mutasi (jenis_mutasi, tanggal_mutasi, nominal_mutasi, keterangan_mutasi) VALUES (?, ?, ?, ?)', ['Gopay', new Date(), 10000, 'Pembelian di Tokopedia'], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error');
    } else {
      res.send('OK');
    }
  });
});

// cron job untuk cek mutasi setiap 1 menit
cron.schedule('*/1 * * * *', () => {
  // lakukan cek mutasi di sini
  // simpan data mutasi ke dalam database
  
  db.query('INSERT INTO mutasi (jenis_mutasi, tanggal_mutasi, nominal_mutasi, keterangan_mutasi) VALUES (?, ?, ?, ?)', ['Dana', new Date(), 20000, 'Pembelian di Shopee'], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Mutasi berhasil disimpan');
    }
  });
});

// routing untuk cash-in
app.post('/cash-in', (req, res) => {
  // tambahkan data cash-in ke dalam database
  
  db.query('INSERT INTO cash_in (id_mutasi, tanggal_cash_in, nominal_cash_in, keterangan_cash_in) VALUES (?, ?, ?, ?)', [1, new Date(), 10000, 'Konfirmasi pembayaran'], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error');
    } else {
      res.send('OK');
    }
  });
});

// routing untuk auto scrapping
app.get('/scrapping', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.tokopedia.com');
  
    // lakukan scrapping di sini
    const pembelian = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.item'));
      return items.map(item => {
        const title = item.querySelector('.title').textContent;
        const harga = item.querySelector('.harga').textContent;
        return {
          title,
          harga
        };
      });
    });
  
    // simpan data pembelian ke dalam database
    pembelian.forEach(item => {
      db.query('INSERT INTO mutasi (jenis_mutasi, tanggal_mutasi, nominal_mutasi, keterangan_mutasi) VALUES (?, ?, ?, ?)', ['Tokopedia', new Date(), item.harga, item.title], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Data pembelian berhasil disimpan');
        }
      });
    });
  
    await browser.close();
    res.send('OK');
  });
  
  // cron job untuk match row dan proses payment setiap 3 menit
  cron.schedule('*/3 * * * *', () => {
    // lakukan match row dan proses payment di sini
    
    db.query('SELECT * FROM cash_in WHERE status = "belum diproses"', (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        rows.forEach(row => {
          db.query('UPDATE cash_in SET status = "sudah diproses" WHERE id = ?', [row.id], (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Cash-in dengan id ${row.id} telah diproses`);
            }
          });
        });
      }
    });
  });
  
  // jalankan server
  app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
  });