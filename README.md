# Gallery Viewer
originally created to organize my album gallery. It also supports nested albums.
example gallery available (./example)

Try it out: [Demo](https://gallery.zelia.workers.dev/?link=https%3A%2F%2Fraw.githubusercontent.com%2Fzelia-x86%2Fgallery%2Fmaster%2Fexample)

# Deployment
[cloudflare workers](https://gallery.zelia.workers.dev/)

# Resource Schema
index.json
```json
{
  "title": "Gallery",
  "albums": [
    "album1",
    "album2"
  ],
  "images": [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg"
  ]
}
```

