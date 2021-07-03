# Web Dokter

Merupakan projek untuk menyelesaikan web task yang merupakan syarat pendaftaran dari Software Enginering Academy COMFEST. Web ini dibagi menjadi 2 bagian yaitu bagian admin dan bagian pasien.
Template Front End By Argon

API

URL : [https://api-dokter.herokuapp.com/](https://api-dokter.herokuapp.com/)

Dokumentasi :[https://github.com/KevDoCode/api-dokter](https://github.com/KevDoCode/api-dokter)

Bagian Admin

Url : [https://webdokter.herokuapp.com/admin/index](https://webdokter.herokuapp.com/admin/index)

Bagian Pasien

Url : [https://webdokter.herokuapp.com/user/dashboard](https://webdokter.herokuapp.com/user/dashboard)

# Bagian Admin

## Dashboard

![](https://github.com/KevDoCode/webdokter/tree/master/dokumentasi/admin/dashboard.png?raw=true)

Untuk melihat jumlah pendaftar pada janji. Terdapat 4 status dalam table yaitu,

- Will Come, Abcent Now

Artinya tanggal booking belum tiba namun jika ditekan maka status akan berubah menjadi Passed

- Canceled

Artinya pelanggan telah membatalkan janji

- Skipped

Artinya pelanggan tidak dating saat tanggal booking atau admin tidak menekan will Come, Abcent Now saat tanggal booking

- Passed

Artinya pelanggan telah dating pada saat tanggal booking

## Dokter

![](https://github.com/KevDoCode/webdokter/tree/master/dokumentasi/admin/dokter.png?raw=true)

Digunakan untuk menampilkan, menambah, mengedit, dan menghapus dokter

## Pengguna / Admin

![](https://github.com/KevDoCode/webdokter/tree/master/dokumentasi/admin/pengguna.png?raw=true)

Digunakan untuk menampilkan, menambah, mengedit, dan menghapus pengguna/admin

## Pasien

![](https://github.com/KevDoCode/webdokter/tree/master/dokumentasi/admin/pasien.png?raw=true)

Digunakan untuk menampilkan, menambah, mengedit, dan menghapus pasien

## Janji

![](https://github.com/KevDoCode/webdokter/tree/master/dokumentasi/admin/janji.png?raw=true)

Digunakan untuk menampilkan, menambah, mengedit, dan menghapus janji. Dan pilihan registrant untuk melihat pendaftar di setiap janji.

## Pembuatan Janji

![](https://github.com/KevDoCode/webdokter/tree/master/dokumentasi/admin/buatjanji.png?raw=true)

Dalam membuat janji admin akan memasukan deskripsi, dokter, jam kerja dokter awal sampai akhir, serta perkiraan estimasi waktu yang digunakan dokter untuk janjinya. Ketika tombol run simulation ditekan maka jam yang dapat dipilih user dapat dilihat sesuai jam kerja dan durasi.

## Pendaftar setiap janji

![](https://github.com/KevDoCode/webdokter/tree/master/dokumentasi/admin/pendaftar.png?raw=true)

Untuk melihat jumlah pendaftar pada janji yang terpilih. Terdapat 4 status dalam table yaitu,

- Will Come, Abcent Now

Artinya tanggal booking belum tiba namun jika ditekan maka status akan berubah menjadi Passed

- Canceled

Artinya pelanggan telah membatalkan janji

- Skipped

Artinya pelanggan tidak dating saat tanggal booking atau admin tidak menekan will Come, Abcent Now saat tanggal booking

- Passed

Artinya pelanggan telah dating pada saat tanggal booking

# Bagian Pasien

## Dashboard

![](https://github.com/KevDoCode/webdokter/tree/master/dokumentasi/user/dashboard.png?raw=true) \

Untuk melihat jumlah pendaftar pada janji. Terdapat 4 status dalam table yaitu,

- Cancel

Artinya tanggal booking belum tiba namun jika ditekan maka status akan berubah menjadi Canceled atau dibatalkan

- Canceled

Artinya pelanggan telah membatalkan janji

- Skipped

Artinya pelanggan tidak dating saat tanggal booking atau admin tidak menekan will Come, Abcent Now saat tanggal booking

- Passed

Artinya pelanggan telah dating pada saat tanggal booking

## Profil ![](https://github.com/KevDoCode/webdokter/tree/master/dokumentasi/user/profil.png?raw=true)

Digunakan untuk merubah profil dari pasien

## Buat Janji

![](https://github.com/KevDoCode/webdokter/blob/888663dda12d71c644052ff1016ab9f635637f50/dokumentasi/user/buatjanji.png)

Digunakan untuk memilih Janji

## Detail Buat Janji

![](https://github.com/KevDoCode/webdokter/tree/master/dokumentasi/user/detailbuatjanji.png?raw=true)

Digunakan untuk menentukan tanggal dan waktu booking. Waktu booking telah dibuat oleh system berdasarkan jam kerja dokter dan durasi janji. Pasien tidak bisa membuat janji yang sama dengan pasien lain
