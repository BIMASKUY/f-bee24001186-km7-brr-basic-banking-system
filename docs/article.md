# Article API Spec

## Create Article API

Endpoint : POST /api/v1/articles

Request Body : 

```json
{
    "title": "Manfaat alpukat",
    "content": "Membantu menyehatkan jantung, kulit, dan pencernaan karena kaya serat, lemak sehat, dan antioksidan",
    "image": "file"
}
```

Reponse Body Success : 

```json
{
    "success": true,
     "message": "Berhasil membuat artikel",
    "data": {
        "title": "Manfaat alpukat",
        "content": "Membantu menyehatkan jantung, kulit, dan pencernaan karena kaya serat, lemak sehat, dan antioksidan",
        "imageUrl": "https://ik.imagekit.io/bimskuy/articles/1731014106912_9.jpg",
        "author": "mughie"
    }
}
```
Response Body Error : 

```json
{
    "success": false,
    "message": "Ukuran gambar harus kurang dari 2 MB",
    "data": {}
}
```

## Get Articles API

Endpoint : GET /api/v1/articles

Response Body Success : 

```json
{
    "success": true,
    "message": "Berhasil mendapatkan semua artikel",
    "data": [
        {
            "title": "Manfaat alpukat",
            "content": "Membantu menyehatkan jantung, kulit, dan pencernaan karena kaya serat, lemak sehat, dan antioksidan",
            "imageUrl": "https://ik.imagekit.io/bimskuy/articles/1731014106912_9.jpg?updatedAt=1731014113180",
            "author": "mughie"
        }
    ]
}
```

## Get Article API

Endpoint : GET /api/v1/articles/:id

Response Body Success : 

```json
{
    "success": true,
    "message": "Berhasil mendapatkan artikel",
    "data": {
        "title": "Manfaat alpukat",
        "content": "Membantu menyehatkan jantung, kulit, dan pencernaan karena kaya serat, lemak sehat, dan antioksidan",
        "imageUrl": "https://ik.imagekit.io/bimskuy/articles/1731014106912_9.jpg?updatedAt=1731014113180",
        "author": "mughie"
    }
}
```

Response Body Error : 

```json
{
    "success": false,
    "message": "Artikel tidak ditemukan",
    "data": {}
}
```

## Update Article API

Endpoint : PATCH /api/v1/articles/:id

Request Body : 

```json
{
    "title": "Manfaat alpukat baru", //optional
    "content": "Manfaat baru yang diketahui...", //optional
    "image": "file" //optional
}
```

Response Body Success : 

```json
{
    "success": true,
    "message": "Berhasil memperbarui artikel",
    "data": {
        "title": "Manfaat alpukat baru",
        "content": "Manfaat baru yang diketahui...",
        "imageUrl": "https://ik.imagekit.io/bimskuy/articles/1731014800831_9.png?updatedAt=1731014807502",
        "author": "mughie"
    }
}
```

Response Body Error : 

```json
{
    "success": false,
    "message": "Format gambar yang diperbolehkan adalah .png, .jpeg, .jpg",
    "data": {}
}
```

## Update Article API

Endpoint : DELETE /api/v1/articles/:id

Response Body Success : 

```json
{
    "success": true,
    "message": "Berhasil menghapus artikel",
    "data": {}
}
```

Response Body Error : 

```json
{
    "success": false,
    "message": "Artikel tidak ditemukan",
    "data": {}
}
```