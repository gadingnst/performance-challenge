# Challange - Data Structure with Performance Optimization

## SOAL
Tulis fungsi yang mengembalikan hasil seperti di bawah dengan ketentuan:
1. Gunakan bahasa pemrograman JavaScript, Python, PHP, atau pseudo-code
2. Algoritma efisien dan dapat digunakan untuk data yang besar (scalable)
3. Minimalisasi penggunaan built-in functions
4. Tambahkan 1 paragraf penjelasan mengenai solusi yang dipilih, seperti alasan, analisa, keuntungan, kerugian
5. Waktu mengerjakan up to 24 jam

Diberikan 3 variabel berikut:

```js
const productData = [
  {
    productId: 1000,
    productName: 'Product 1000'
  },
  {
    productId: 1001,
    productName: 'Product 1001'
  }
];
const stockData = [
  {
    productId: 1000,
    locationId: 1,
    stock: 21
  },
  {
    productId: 1000,
    locationId: 2,
    stock: 8
  },
  {
    productId: 1001,
    locationId: 1,
    stock: 4
  },
  {
    productId: 1001,
    locationId: 2,
    stock: 10
  }
];
const locationData = [
  {
    locationId: 1,
    locationName: 'Location 1'
  },
  {
    locationId: 2,
    locationName: 'Location 2'
  }
];
```

Diinginkan hasil berikut:

```js
const result = [
  {
    productName: 'Product 1000',
    stock: {
      total: 29,
      detail: [
        {
          locationName: 'Location 1',
          stock: 21
        },
        {
          locationName: 'Location 2',
          stock: 8
        }
      ]
    }
  },
  {
    productName: 'Product 1001',
    stock: {
      total: 14,
      detail: [
        {
          locationName: 'Location 1',
          stock: 4
        },
        {
          locationName: 'Location 2',
          stock: 10
        }
      ]
    }
  }
];
```

## Penyelesaian
Awalnya saya berfikir masalah ini dapat diselesaikan dengan meminimalisir penggunaan for-loop dengan mengulangi data stock terlebih dahulu, namun setelah saya analisa akhirnya saya temukan jawaban jika mengulangi data stock terlebih dahulu maka sama saja kita juga harus mengulangi data product dan data lokasi untuk menemukan relasinya.

Pada akhirnya saya putuskan solusi dengan membuat custom higher-order functions yang didalamnya terdapat for-loop dan digunakan untuk mapping data product me-return nilainya. (Kenapa saya pilih for-loop? Karena inilah solusi yang terbaik jika ingin mendapatkan performa yang terbaik)

Terlebih dahulu program akan mengulangi data product, sekaligus memfilter data stock yang sesuai dengan id product, di dalam itu juga saya mengulangi data lokasi untuk merelasikan lokasi nya yang sesuai dengan id lokasi pada data stock.

Jadi awal kerjanya adalah mapping data product terlebih dahulu, ketika dalam proses mapping, program akan memfilter data dan mengakumulasi stock sesuai id product yang sedang diproses sekarang, jika id productnya 1 maka program akan memfilter dan mengakumulasi data stock dengan id product 1 saja.

Didalam proses filtering itu juga saya memasukan fungsi mapping data stocknya agar berelasi dengan data lokasi, jadi program akan mencari data lokasi dengan id lokasi pada data stock yang sedang diproses sekarang. jadi jika id lokasi pada data stocknya 1, maka program akan mencari id lokasi 1 pada data lokasi, kemudian diambil nama lokasinya dan dimap ke data stock.

### Untuk kecepatan eksekusinya cukup cepat:
    - data sesuai soal (2 product, 4 stock detail, 2 location):
        : 0.12 - 0.4 ms.
    - data massive (10000 product, 15000 stock detail, 1000 location):
        : 100 - 200 ms.

### Keuntungan:
    - Untuk meminimalisir penggunaan built-in functions,
    Disini saya membuat custom higher-order function sendiri
    yang reusable untuk digunakan.

    - Karena custom higher-order function ini dibuat
    menggunakan for-loop, tentunya performance akan lebih cepat daripada menggunakan higher-order function built-in dari JavaScript.

    - Karena berbasis fungsi, bisa ditambahkan konsep memoize untuk functions-level caching.

### Kerugian:
    - Tidak menggunakan built-in functions yang seharusnya sudah ada pada javascript. Seperti Find, Map dan Filter.

## Menjalankan program

Dengan mengetik terminal: `node index.js`