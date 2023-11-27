# image_editor

使用vue3、konva圖片編輯
[Demo](https://ingrid-8ad12.web.app/)


## 專案介紹

實作一個簡易圖片編輯器，預計會有以下流程：

1. 上傳照片           ok
2. 可以選擇裁切大小
3. 讓使用者縮放旋轉圖片
4. 壓浮水印
5. 壓縮圖檔至2MB (todo)
6. 下載

###### tags: `Vue3` `Konva`

## 安裝依賴

1. konva: HTML5 Canvas JavaScript框架
 ```
    npm install vue-konva konva --save

 ```
   - 拖拉
      [konva官方教學 - 中文](http://konvajs-doc.bluehymn.com/docs/drag_and_drop/Drag_Events.html)
      [konva官方教學 - vue](http://konvajs-doc.bluehymn.com/docs/vue/Drag_And_Drop.html)

   - Transformer(縮放旋轉)
      [konva官方教學 - 中文](http://konvajs-doc.bluehymn.com/docs/select_and_transform/Basic_demo.html)
      [konva官方教學 - vue](http://konvajs-doc.bluehymn.com/docs/vue/Transformer.html)



## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
