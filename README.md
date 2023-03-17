# GLPerf

**WebGL Performance Monitor**

🚀 The class provides informations below:

- FPS: Frames per second. 60 fps is perfect. ⬆ High is better.
- Memory: Used JS heap size. ⬇ Low is better. (Only available in desktop browser)
- Drawcall: Count of draw passes in one frame. ⬇ Low is better.
- Triangles: Count of triangles rendered in one frame. ⬇ Low is better.
- Textures: Count of textures created by WebGL context. ⬇ Low is better.
- Shaders: Count of shaders attached to WebGL program. ⬇ Low is better.

## ScreenShots

Pixi.js example and Three.js example

![ScreenShots](https://github.com/eyworldwide/GLPerf/blob/master/screenshot.jpg)

## Usage

### Steps

* Install the package
  ```
  npm i --save gl-perf
  ```

* Create a instance of GLPerf Monitor and update in animation loop
  ```
  import {Monitor} from 'gl-perf'

  // the parameter `canvas` is HTMLCanvasElement
  var glPerf = new Monitor(canvas)

  // update the monitor in an animation loop
  glPerf.update()
  ```

### Play With Other Libraries

It works in all WebGL Libraries or Frameworks.

- Pixi.js Example 

  ```javascript
  var app = new PIXI.Application(width, height, { backgroundColor : 0x1099bb })

  var glPerf = new Monitor(app.view)

  // update
  app.ticker.add(() => {
    glPerf.update()
  })

  ```

- Three.js Example 

  ```javascript
  var renderer = new THREE.WebGLRenderer( { antialias: true } )

  var glPerf = new Monitor(renderer.domElement)

  // update
  function animate() {
    requestAnimationFrame( animate )
    glPerf.update()
  }

  animate()
  ```
