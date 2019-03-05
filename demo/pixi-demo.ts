import * as PIXI from 'pixi.js'
import {Monitor} from '../src/GLPerf'

var width = window.innerWidth
var height = window.innerHeight
var app = new PIXI.Application(width, height, {backgroundColor : 0x1099bb})
document.body.appendChild(app.view)

// init GlPerf
var glPerf = new Monitor(app.view)

var container = new PIXI.Container()
app.stage.addChild(container)

var texture = PIXI.Texture.fromImage('//pixijs.io/examples/required/assets/bunny.png', true)

var bunnies:PIXI.Sprite[] = []
var bunniesSpeed:any[] = []
var bunnyNum = 100

for (var i = 0; i < bunnyNum; i++) {
  var bunny = new PIXI.Sprite(texture)
  bunny.x = Math.random() * width
  bunny.y = Math.random() * height
  bunny.rotation = Math.random() * (Math.PI * 2)
  bunnies.push(bunny)
  bunniesSpeed.push({x: Math.random(), y: Math.random()})
  container.addChild(bunny)
}

app.ticker.add(() => {
  for (let i= 0, l = bunnies.length; i < l; i++) {
    bunnies[i].x += bunniesSpeed[i].x
    bunnies[i].y += bunniesSpeed[i].y
    
    if (bunnies[i].x < 0 || bunnies[i].x > width) {
      bunniesSpeed[i].x = -bunniesSpeed[i].x
    }

    if (bunnies[i].y < 0 || bunnies[i].y > height) {
      bunniesSpeed[i].y = -bunniesSpeed[i].y
    }
  }

  app.renderer.render(container)
})

// update GLPerf
app.ticker.add(() => {
  glPerf.update()
})