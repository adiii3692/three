import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js'

const canvas = document.getElementById('canvas');

//create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbfe3dd );

//Add the camera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 15;
camera.position.x = 15;

//Add lighting
const light = new THREE.DirectionalLight('#FFFFFF',1);
scene.add( light);

//Load the other model
const loader =  new GLTFLoader().setPath('/')
loader.load('iceberg.glb',(glb)=>{
  scene.add(glb.scene);
})

//Set up the renderer
const renderer = new THREE.WebGLRenderer({canvas,alpha:true, antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild( renderer.domElement );
const pmremGenerator = new THREE.PMREMGenerator( renderer );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment(),0.01).texture;

//Add OrbitControls
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;



//Animate the scene
function animate(){
    requestAnimationFrame(animate);

    renderer.render(scene,camera);
} 

//Handle window resizing
window.addEventListener('resize',()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})

animate()

