var Container = PIXI.Container,
	autoDetectRenderer = PIXI.autoDetectRenderer,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	TextureCache = PIXI.utils.TextureCache,
	Sprite = PIXI.Sprite,
	Rectangle = PIXI.Rectangle

var stage = new Container(),
	renderer = autoDetectRenderer(window.innerWidth, window.innerHeight, {
		antialias: false,
		transparent: true,
		resolution: 1,
	})

renderer.view.style.position = 'absolute'
renderer.view.style.top = '0'
renderer.view.style.left = '0'
renderer.view.style.backgroundColor = 'rgba(0,0,0,0.6)'
document.body.appendChild(renderer.view)
renderer.autoResize = true
window.onresize = function () {
	renderer.resize(window.innerWidth, window.innerHeight)
}

// 加载图片资源
loader
	.add('whiteLines', 'images/whiteLines.png')
	.add('baozha', 'images/baozha.png')
	.add('lottery', 'images/caishen_sprite.png')
	.add('redbag1', 'images/redbag1.png')
	.add('redbag2', 'images/redbag2.png')
	.add('redbag3', 'images/redbag3.png')
	.add('colorLines', 'lines/lines.json')
	.on('progress', loadProgressHandler)
	.load(setup)

// 加载进程
function loadProgressHandler(loader, resource) {
	console.log('loading: ' + resource.url)
	console.log('progress: ' + loader.progress + '%')
}

// 点击红包的效果
var baozha, bza, bzb

// 红包雨
var redbaos = new Array()

// 彩色线条与红包雨的定时器
var timer, timerl

// 颜色线条
var colorLinep = new Array()

// // 白色背景线条
var whiteLines = new Array(2)

function whiteLinesFun() {
	whiteLines[0] = new Sprite(resources.whiteLines.texture)
	whiteLines[1] = new Sprite(resources.whiteLines.texture)
	whiteLines[0].x = 0
	whiteLines[0].y = 0
	whiteLines[1].x = 300
	whiteLines[1].y = -540
	stage.addChild(whiteLines[0])
	renderer.render(stage)
}

function whiteLinesRun() {
	whiteLines.forEach((item) => {
		item.x -= 2
		item.y += 3
		if (item.y > window.innerHeight - 100) {
			item.x = 300
			item.y = -540
		}
	})
}

// 彩色线条 数组id
var colorLine

function setup() {
	// 白色线条
	whiteLinesFun()

	// 两帧 红包爆炸动画
	baozha = TextureCache.baozha
	bza = new Rectangle(0, 0, 128, 134)
	bzb = new Rectangle(128, 0, 128, 134)

	// 刚开始的彩色线条背景
	colorLine = resources.colorLines.textures
	for (var i = 0; i < 10; i++) {
		var idx = randomLine()
		colorLinep.push(new DropLine(idx))
		renderer.render(stage)
	}

	// 刚开始就有的红包墙
	for (let i = 0; i < 8; i++) {
		var texture = randomTexture()
		redbaos.push(new Redbag(texture))
		renderer.render(stage)
	}

	timer = setInterval(function () {
		for (let i = 0; i < 6; i++) {
			var texture = randomTexture()
			redbaos.push(new Redbag(texture))
		}
	}, 500)

	timerl = setInterval(function () {
		for (let j = 0; j < 2; j++) {
			var idx = randomLine()
			colorLinep.push(new DropLine(idx))
		}
	}, 600)

	renderer.render(stage)
	animate()
}

// 随机返回线条类型
function randomLine() {
	var ran = parseInt(Math.random() * 10) + 1
	var id = ran + '.png'
	return id
}

// 随机返回红包类型
function randomTexture() {
	var ran = parseInt(Math.random() * 3)
	var texture
	switch (ran) {
		case 0:
			texture = resources.redbag2.texture
			break
		case 1:
			texture = resources.redbag1.texture
			break
		case 2:
			texture = resources.redbag3.texture
			break
		default:
			texture = resources.redbag1.texture
			break
	}
	return texture
}

// 获得礼包
function getLottery() {
	var texture = TextureCache.lottery
	texture.frame = new Rectangle(0, 0, 85, 102)
	var lottery = new Sprite(texture)
	lottery.x = window.innerWidth / 2 - 42
	lottery.y = window.innerHeight / 2 - 42
	lottery.anchor.set(0.5, 0.5)
	lottery.scale.set(2, 2)
	stage.addChild(lottery)
}

// 刷新动画
let requestFrame =
	window.requestAnimationFrame ||
	function (callback, element) {
		return window.setTimeout(callback, 1000 / 60)
	}

let cancelFrame = window.cancelAnimationFrame || clearTimeout

function animate() {
	requestFrame(animate)

	whiteLinesRun()

	redbaos.forEach((item) => item && item.dropdown())

	colorLinep.forEach((item) => item && item.dropdown())

	renderer.render(stage)
}

// 从左到右分布
var startX = 0,
	startXl = 0

function DropParent() {
	this.random = Math.random()
	this.random = this.random > 0.7 ? this.random - 0.6 : this.random
	this.x = (window.innerWidth / 5) * (startX % 5) + 200
	this.y = this.random * window.innerHeight - 400
}
// 定义飘落事物
function DropBag(texture) {
	DropParent.apply(this)
	this.texture = texture
	startX += 1
	this.sprite = new Sprite(this.texture)
	this.sprite.x = this.x
	this.sprite.y = this.y
	stage.addChild(this.sprite)
	this.dropdown = function () {
		this.y += this.random * 8 + 4
		this.x -= this.random * 4 + 4
		if (this.y > window.innerHeight + 50) {
			stage.removeChild(this.sprite)
		} else {
			this.sprite.y = this.y
			this.sprite.x = this.x
		}
	}
}

// 定义飘落线条
function DropLine(ids) {
	DropParent.apply(this)
	startXl += 1
	this.sprite = new Sprite(colorLine[ids])
	this.sprite.x = this.x
	this.sprite.y = this.y
	stage.addChild(this.sprite)
	this.dropdown = function () {
		this.y += this.random * 3 + 4
		this.x -= this.random * 4 + 4
		if (this.y > window.innerHeight + 50) {
			stage.removeChild(this.sprite)
		} else {
			this.sprite.y = this.y
			this.sprite.x = this.x
		}
	}
}
// 定义 红包
function Redbag(texture) {
	DropBag.apply(this, arguments)
	this.scale = this.random < 0.8 ? 0.8 : this.random
	this.sprite.scale.set(this.scale)
	this.sprite.interactive = true
	this.sprite.on('mousedown', onTouch)
	this.sprite.on('touchstart', onTouch)
}

// 红包点击后的判断
function onTouch() {
	var that = this
	baozha.frame = bzb
	that.texture = baozha
	setTimeout(function () {
		baozha.frame = bza
		clearInterval(timer)
		getLottery()
	}, 100)
	setTimeout(function () {
		stage.removeChild(that)
		// renderer.view.style.display = 'none'
	}, 160)
}
