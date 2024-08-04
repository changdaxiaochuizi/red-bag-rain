## 使用 `pixi.js` 实现红包雨

### 初始化 `pixi.js` 画布变量

```javascript
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;
```

`renderer.view.style` 来设置 `canvas` 的样式

### 定义原型  线条，红包 

### 利用 `requestAnimationFrame` 不断刷新动画