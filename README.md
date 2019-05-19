# Expense_Organizer_App

https://scrimba.com/playlist/pnyeEhr

https://www.dropbox.com/developers

https://dropbox.github.io/dropbox-api-v2-explorer

## Start

1. Replace with your accessToken:

```js
const dbx = new Dropbox({
  accessToken: "YOUR_ACCESS_TOKEN_HERE",
  fetch
});
```

2. `npm run build`

3. Open in the browser `/dist/index.html` file.

## Other

https://stackoverflow.com/questions/53558916/babel-7-referenceerror-regeneratorruntime-is-not-defined

## Response from API

**filesListFolder** [Link](https://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesListFolder__anchor)

Basic format for request:

```js
dbx
  .filesListFolder({ path: "" })
  .then(console.log)
  .catch(console.error);
```

Response:

```json
{
  "entries": [
    {
      ".tag": "folder",
      "name": "my_new_foldder",
      "path_lower": "/my_new_foldder",
      "path_display": "/my_new_foldder",
      "id": "id:kmNVy33j4VAAAAAAAAAAHg"
    },
    {
      ".tag": "file",
      "name": "car1.jpg",
      "path_lower": "/car1.jpg",
      "path_display": "/car1.jpg",
      "id": "id:kmNVy33j4VAAAAAAAAAAGw",
      "client_modified": "2019-05-18T15:44:22Z",
      "server_modified": "2019-05-18T15:44:22Z",
      "rev": "012000000014aa54c10",
      "size": 52993,
      "is_downloadable": true,
      "content_hash": "548af844b18345396e06dcb1d2e2f1bf82e60e770a3a515ca84be3d029486f47"
    }
  ],
  "cursor": "AAGaZ8pSEiti1Fr5J-a1dzrN5wtU9xs2VQcrLZJOl26sIZguFAOSZyQcWiDlYczxyzwSo1opMeYbaZa0xQ4PGvaR2sTiCyTwY8fbxkZVCVfcBRj3zeoCkdq3sZle7ku5En50EA7p71FzDtzvMEVNzZt_36dqYI3rWIz0AxIilhqeSg",
  "has_more": false
}
```

**filesGetThumbnailBatch** [Link](https://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesGetThumbnailBatch__anchor)

Basic format for request:

```js
dbx
  .filesGetThumbnailBatch({
    entries: [
      {
        path: "",
        size
      }
    ]
  })
  .then(console.log)
  .catch(console.error);
```

Response:

```json
{
  "entries": [
    {
      ".tag": "success",
      "metadata": {
        "name": "car1.jpg",
        "path_lower": "/car1.jpg",
        "path_display": "/car1.jpg",
        "id": "id:kmNVy33j4VAAAAAAAAAAGw",
        "client_modified": "2019-05-18T15:44:22Z",
        "server_modified": "2019-05-18T15:44:22Z",
        "rev": "012000000014aa54c10",
        "size": 52993,
        "media_info": {
          ".tag": "metadata",
          "metadata": { ".tag": "photo", "dimensions": { "height": 533, "width": 800 } }
        },
        "is_downloadable": true,
        "content_hash": "548af844b18345396e06dcb1d2e2f1bf82e60e770a3a515ca84be3d029486f47"
      },
      "thumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAVACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6Q1vXIdMhk2w3FzOAAscETSHJO0Zx0Azk+wJrzhPF/wAQpbNZF8PJFddWhktPk642h/P5J6g4x61x+t+Pb7w4fEmna7Bf2GopNdmxuZY2VJ1ZmaPY54JGQBz6Vc8NeNJtZ8O+Ebma71RpppTY6i1i3+rkZSoklTaSQWUHIxgt71QHr2l65ftDF/aWm3CSEDfshK7fwyc49M/TNdEjq4ypBr5e8balo2s3lm1n8RdfhEMC28sKwzLudM/vCMKAxzg4Hauy+FGow/adKs7HXPEWs3aTyCU3UckcKxMCdzMy4bGMAZ/i9qQI9n1LT7TU7OS11G2huraQYaKZA6kfQ15zN8C/AjXDzW+nXdo7nJ+zX0qD/wBCoooAmg+DHhGI5KatL/101Oc/+zV0HhzwD4c8O3pvNHsXt7ortMv2iRmYehJY5FFFAz//2Q=="
    }
  ]
}
```

**filesListFolderContinue** [Link](https://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesListFolderContinue__anchor)

Basic format for request:

```js
dbx
  .filesListFolderContinue({ cursor })
  .then(console.log)
  .catch(console.error);
```

Response:

```json
{
  ".tag": "async_job_id",
  "async_job_id": "dbjid:AAAlj4yg-FV0aXOi9xY4pSCeWW4MC8xeBdmrnxa669xkPYKxekusGajGIW8BYG6unhDOVBLfVej-N7pupXzSMA0Q"
}
```

**filesMoveBatchV2** [Link](https://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesMoveBatchV2__anchor)

Basic format for request:

```js
dbx
  .filesMoveBatchV2({
    entries: [
      {
        from_path,
        to_path
      }
    ]
  })
  .then(console.log)
  .catch(console.error);
```

**filesMoveBatchCheckV2** [Link](https://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesMoveBatchCheckV2__anchor)

Basic format for request:

```js
dbx
  .filesMoveBatchCheckV2({ async_job_id })
  .then(console.log)
  .catch(console.error);
```

Response:

```json
{ ".tag": "in_progress" }
```

and after organizing files:

```json
{
  ".tag": "complete",
  "entries": [
    {
      ".tag": "success",
      "success": {
        ".tag": "file",
        "name": "car1.jpg",
        "path_lower": "/2019/5/car1.jpg",
        "path_display": "/2019/5/car1.jpg",
        "id": "id:kmNVy33j4VAAAAAAAAAAGw",
        "client_modified": "2019-05-18T15:44:22Z",
        "server_modified": "2019-05-19T10:43:40Z",
        "rev": "0118000000014aa54c10",
        "size": 52993,
        "is_downloadable": true,
        "content_hash": "548af844b18345396e06dcb1d2e2f1bf82e60e770a3a515ca84be3d029486f47"
      }
    }
  ]
}
```

## App

![org1](https://user-images.githubusercontent.com/24504648/57982260-855b4d80-7a4b-11e9-8ac5-4553bc818744.png)

![org2](https://user-images.githubusercontent.com/24504648/57982261-88eed480-7a4b-11e9-995e-0f741e17c529.png)
