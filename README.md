# How to run PhotoAlbum App :

1. npm install
2. npx sequelize db:create
3. npx sequelize db:migrate
4. npx sequelize db:seed:all

Endpoint User

- [POST] /users/register : Pada tab Body pilih x-www-form-url-encoded di Postman, Masukkan key email, username, dan password lalu isi valuenya.
- [POST] /users/login : Pada tab Body pilih x-www-form-url-encoded di Postman, Masukkan key email,dan password lalu isi valuenya sesuai dengan data yg sudah di regist, maka akan ter-generate token pada respon.

Endpoint Photo -> perlu login terlebih dahulu agar bisa akses endpointnya. Letakkan token yang didapat pada tab Headers di tiap endpoint photos pada Postman, lalu pada key nya ketik token dan isi value dengan tokennya.

- [GET] /photos : Akan muncul respon seluruh data photos.
- [GET] /photos/id : Akan muncul data berdasarkan id yang dikirimkan.
- [POST] /photos : Pada tab Body pilih x-www-form-url-encoded di Postman, Masukkan key title, caption, dan image_url lalu isi valuenya.
- [PUT] /photos/id : Pada tab Body pilih x-www-form-url-encoded di Postman, Masukkan key title, caption, dan image_url lalu ubah valuenya. Data akan berubah sesuai dengan id yang dikirimkan dan sesuai dengan userId yang sedang login, jika tidak maka tidak bisa dihapus.
- [DELETE] /photos/id : Data akan terhapus sesuai dengan id yang dikirimkan dan sesuai dengan userId yang sedang login, jika tidak maka tidak bisa dihapus.

Testing :

1. npm run db:create:test
2. npm run db:migrate:test
3. npm run test
