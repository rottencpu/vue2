<template>
  <div id="Tree" />
</template>

<script>
// import * as THREE from 'three'
import * as THREE from 'three/build/three.module.js'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js'
var camera, controls, scene, renderer

export default {
  data() {
    return {}
  },
  mounted() {
    this.initPage()
    this.animate()
  },
  methods: {
    initPage: function() {
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0xcccccc)
      scene.fog = new THREE.FogExp2(0xcccccc, 0.002)
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(renderer.domElement)
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
      )
      camera.position.set(400, 200, 0)
      // controls
      controls = new MapControls(camera, renderer.domElement)
      // controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
      controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.05
      controls.screenSpacePanning = false
      controls.minDistance = 100
      controls.maxDistance = 500
      controls.maxPolarAngle = Math.PI / 2
      // world
      var geometry = new THREE.BoxBufferGeometry(1, 1, 1)
      geometry.translate(0, 0.5, 0)
      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true
      })
      for (var i = 0; i < 500; i++) {
        var mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = Math.random() * 1600 - 800
        mesh.position.y = 0
        mesh.position.z = Math.random() * 1600 - 800
        mesh.scale.x = 20
        mesh.scale.y = Math.random() * 80 + 10
        mesh.scale.z = 20
        mesh.updateMatrix()
        mesh.matrixAutoUpdate = false
        scene.add(mesh)
      }
      // lights
      let light = new THREE.DirectionalLight(0xffffff)
      light.position.set(1, 1, 1)
      scene.add(light)
      light = new THREE.DirectionalLight(0x002288)
      light.position.set(-1, -1, -1)
      scene.add(light)
      light = new THREE.AmbientLight(0x222222)
      scene.add(light)
      //
      window.addEventListener('resize', this.onWindowResize(), false)
      var gui = new GUI()
      gui.add(controls, 'screenSpacePanning')
    },
    onWindowResize: function() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate: function() {
      requestAnimationFrame(this.animate)
      controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
      this.render()
    },
    render: function() {
      renderer.render(scene, camera)
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
