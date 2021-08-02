import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118.1/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { assets } from './asset/assets.js'


//Next steps:
//Add collision

let bee, squirrel

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xC8F0FA);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 20000);
camera.position.set(100,200,300); //important
camera.lookAt(scene.position)

const axes = new THREE.AxesHelper(500);
axes.position.set(200,-500,-1800);
var colors = axes.geometry.attributes.color;
colors.setXYZ( 1, 1, 0, 0 ); // red
colors.setXYZ( 3, 0, 1, 0 ); // green
colors.setXYZ( 5, 0, 0, 1 ); // blue
// scene.add(axes)

let clock = new THREE.Clock();

let mixer

var light = new THREE.AmbientLight(0xF38902  );
scene.add(light);

const FBXloader = new FBXLoader()

for (let i = 0; i < assets.length; i++){
  FBXloader.load( assets[i].path, function ( obj ) {
    obj.position.set( assets[i].x, assets[i].y, assets[i].z)
    obj.scale.set( assets[i].xscale, assets[i].yscale, assets[i].zscale)
    scene.add( obj );
  }, undefined, function ( e ) {
    console.error( e );
  } );
}


FBXloader.load( '/asset/Flowers.fbx', function ( obj ) {
  obj.position.set(10,10,-30)
  scene.add( obj );
}, undefined, function ( e ) {
  console.error( e );
} );

FBXloader.load( '/asset/Squirrel_Fillet_Walk.fbx', function ( obj ) {
  mixer = new THREE.AnimationMixer(obj)
  let action = mixer.clipAction(obj.animations[0])
  action.play()
  squirrel = obj
  obj.scale.set(1,1,1)
  obj.position.set(200,-500,-1800)
  scene.add( obj );    

}, undefined, function ( e ) {

console.error( e );

} );


FBXloader.load( '/asset/Bee.fbx', function ( obj ) {
    mixer = new THREE.AnimationMixer(obj)
    let action = mixer.clipAction(obj.animations[1])
    action.play()
    bee = obj
    console.log('bee', bee)
    obj.scale.set(0.3,0.3,0.3)
    obj.position.set(10,10,-1000)
    scene.add( obj );    

}, undefined, function ( e ) {

  console.error( e );

} );


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

function animate(){
    requestAnimationFrame(animate);
    if (squirrel){ 
      camera.lookAt(squirrel.position)
    }
    renderer.render(scene, camera)
    const delta = clock.getDelta();
    if (mixer){
      mixer.update(delta);
    }

}

function handleKeyDown(e){
  if (e.key === 'ArrowLeft'){
    squirrel.rotateY(-1.5)
  } else if (e.key === 'ArrowRight'){
    squirrel.rotateY(3)
  } else if (e.key === 'ArrowDown'){
    squirrel.translateZ(-30)
  } else if (e.key === 'ArrowUp'){
    squirrel.translateZ(30)
  }

  if (e.key === "Enter"){
    squirrel.rotateY(0.1)
  }
}

animate()
document.addEventListener('keydown', e => handleKeyDown(e))

window.addEventListener('resize', function(){
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width/height;
  camera.updateProjectionMatrix;
})

