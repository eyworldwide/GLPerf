import * as THREE from 'three'
import {Monitor} from '../src/GLPerf'

var camera:any, scene:any, renderer:any, group:any
var glPerf:Monitor

var mouseX = 0, mouseY = 0

var windowHalfX = window.innerWidth / 2
var windowHalfY = window.innerHeight / 2

init()
animate()

function init() {

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 )
  camera.position.z = 500

  scene = new THREE.Scene()
  scene.background = new THREE.Color( 0xffffff )
  scene.fog = new THREE.Fog( 0xffffff, 1, 10000 )

  var geometry = new THREE.BoxBufferGeometry( 100, 100, 100 )
  var material = new THREE.MeshNormalMaterial()

  group = new THREE.Group()

  for ( var i = 0; i < 1000; i ++ ) {

    var mesh = new THREE.Mesh( geometry, material )
    mesh.position.x = Math.random() * 2000 - 1000
    mesh.position.y = Math.random() * 2000 - 1000
    mesh.position.z = Math.random() * 2000 - 1000

    mesh.rotation.x = Math.random() * 2 * Math.PI
    mesh.rotation.y = Math.random() * 2 * Math.PI

    mesh.matrixAutoUpdate = false
    mesh.updateMatrix()

    group.add( mesh )

  }

  scene.add( group )

  //

  renderer = new THREE.WebGLRenderer( { antialias: true } )
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight )
  document.body.appendChild( renderer.domElement )

  // init GlPerf
  glPerf = new Monitor(renderer.domElement)

  //

  document.addEventListener( 'mousemove', onDocumentMouseMove, false )

  //

  window.addEventListener( 'resize', onWindowResize, false )

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth, window.innerHeight )

}

function onDocumentMouseMove( event:any ) {

  mouseX = ( event.clientX - windowHalfX ) * 10
  mouseY = ( event.clientY - windowHalfY ) * 10

}

//

function animate() {

  requestAnimationFrame( animate )

  render()

  glPerf.update()
}

function render() {

  var time = Date.now() * 0.001

  var rx = Math.sin( time * 0.7 ) * 0.5,
    ry = Math.sin( time * 0.3 ) * 0.5,
    rz = Math.sin( time * 0.2 ) * 0.5

  camera.position.x += ( mouseX - camera.position.x ) * 0.05
  camera.position.y += ( - mouseY - camera.position.y ) * 0.05

  camera.lookAt( scene.position )

  group.rotation.x = rx
  group.rotation.y = ry
  group.rotation.z = rz

  renderer.render( scene, camera )

}