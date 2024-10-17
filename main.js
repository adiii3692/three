import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.getElementById('canvas');

//create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

//Add the camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 5;

//Create the cube
const geometry = new THREE.DodecahedronGeometry();
const material =   new THREE.MeshLambertMaterial({color:'#468585',emissive:'#468585'})

const cube = new THREE.Mesh(geometry,material);
scene.add(cube);

//Add lighting
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1,1,1,);
scene.add(light);

//Set up the renderer
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//Add OrbitControls
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

//Load the other model
const loader =  new GLTFLoader().setPath('/pessima-broken/')
loader.load('pessima.glb',(glb)=>{
  const mesh = glb.scene;
  mesh.position.set(0,1.05,-1);
  scene.add(mesh);
})

//Animate the scene
function animate(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene,camera);
} 

//Handle window resizing
window.addEventListener('resize',()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})

animate()

