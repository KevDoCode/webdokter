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

![](RackMultipart20210703-4-gw51od_html_f75fb9607815fac2.png)

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

![](RackMultipart20210703-4-gw51od_html_1b1b30d0b2c27efe.png)

Digunakan untuk menampilkan, menambah, mengedit, dan menghapus dokter

## Pengguna / Admin

![](RackMultipart20210703-4-gw51od_html_794eebd7b1cb6138.png)

Digunakan untuk menampilkan, menambah, mengedit, dan menghapus pengguna/admin

## Pasien

![](RackMultipart20210703-4-gw51od_html_b6e5dfe74197386.png)

Digunakan untuk menampilkan, menambah, mengedit, dan menghapus pasien

## Janji

![](RackMultipart20210703-4-gw51od_html_53c0f9376d5e63df.png)

Digunakan untuk menampilkan, menambah, mengedit, dan menghapus janji. Dan pilihan registrant untuk melihat pendaftar di setiap janji.

## Pembuatan Janji

![](RackMultipart20210703-4-gw51od_html_cb177d7ce221a8c5.png)

Dalam membuat janji admin akan memasukan deskripsi, dokter, jam kerja dokter awal sampai akhir, serta perkiraan estimasi waktu yang digunakan dokter untuk janjinya. Ketika tombol run simulation ditekan maka jam yang dapat dipilih user dapat dilihat sesuai jam kerja dan durasi.

## Pendaftar setiap janji

![](RackMultipart20210703-4-gw51od_html_7362353459104dba.png)

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

![](RackMultipart20210703-4-gw51od_html_6a5f4687e96df548.png) \

Untuk melihat jumlah pendaftar pada janji. Terdapat 4 status dalam table yaitu,

- Cancel

Artinya tanggal booking belum tiba namun jika ditekan maka status akan berubah menjadi Canceled atau dibatalkan

- Canceled

Artinya pelanggan telah membatalkan janji

- Skipped

Artinya pelanggan tidak dating saat tanggal booking atau admin tidak menekan will Come, Abcent Now saat tanggal booking

- Passed

Artinya pelanggan telah dating pada saat tanggal booking

## Profil ![](RackMultipart20210703-4-gw51od_html_112bd2209bc95d63.png)

Digunakan untuk merubah profil dari pasien

## Buat Janji

![](RackMultipart20210703-4-gw51od_html_266161959deab6a6.png)

Digunakan untuk memilih Janji

## Detail Buat Janji

![](RackMultipart20210703-4-gw51od_html_1b46c15e017886f1.png)

Digunakan untuk menentukan tanggal dan waktu booking. Waktu booking telah dibuat oleh system berdasarkan jam kerja dokter dan durasi janji. Pasien tidak bisa membuat janji yang sama dengan pasien lain
