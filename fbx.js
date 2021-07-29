import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118.1/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
// import { GLTFLoader } from 'https://cdn.rawgit.com/mrdoob/three.js/master/examples/js/loaders/GLTFLoader.js'

let bee

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xC8F0FA);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 20000);
camera.position.set(100,200,300); //important
camera.lookAt(scene.position)

let clock = new THREE.Clock();

let mixer

var light = new THREE.AmbientLight(0xF38902  );
scene.add(light);

const FBXloader = new FBXLoader()
// const GLTFloader = new THREE.GLTFLoader()

// GLTFloader.load( '/asset/Cloud1.glb', function ( obj ) {
//   // obj.position.set(1400,0,-1600)
//   // obj.scale.set(1.2,1.2,1.2)
//   scene.add( obj.scene );
// }, undefined, function ( e ) {
//   console.error( e );
// } );

// FBXloader.load( '/asset/Squirrel_walk.fbx', function ( obj ) {
//   obj.position.set(700,0,-1600)
//   obj.scale.set(1,1,1)
//   scene.add( obj );
// }, undefined, function ( e ) {
//   console.error( e );
// } );

FBXloader.load( '/asset/Level_3_Cubicle.fbx', function ( obj ) {
  obj.position.set(600,400,-1800)
  obj.scale.set(1.5,1.5,1.5)
  scene.add( obj );
}, undefined, function ( e ) {
  console.error( e );
} );

FBXloader.load( '/asset/Level_3_Door.fbx', function ( obj ) {
  obj.position.set(-600,400,-1800)
  obj.scale.set(0.7,0.7,0.7)
  scene.add( obj );
}, undefined, function ( e ) {
  console.error( e );
} );

FBXloader.load( '/asset/Level_3_ElevatorDoor.fbx', function ( obj ) {
  obj.position.set(0,-400,-1800)
  obj.scale.set(1,1,1)
  scene.add( obj );
}, undefined, function ( e ) {
  console.error( e );
} );


FBXloader.load( '/asset/PineTree_Autumn_1.fbx', function ( obj ) {
  obj.position.set(1400,0,-1600)
  obj.scale.set(1.2,1.2,1.2)
  scene.add( obj );
}, undefined, function ( e ) {
  console.error( e );
} );

FBXloader.load( '/asset/Rock_1.fbx', function ( obj ) {
  obj.position.set(-1200,0,-1600)
  obj.scale.set(2,2,2)
  scene.add( obj );
}, undefined, function ( e ) {
  console.error( e );
} );

FBXloader.load( '/asset/CactusFlower_1.fbx', function ( obj ) {
  obj.position.set(600,-200,-1000)
  obj.scale.set(2,2,1.2)
  scene.add( obj );
}, undefined, function ( e ) {
  console.error( e );
} );

FBXloader.load( '/asset/Flowers.fbx', function ( obj ) {
  obj.position.set(10,10,-30)
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
    if (bee){ 
      camera.lookAt(bee.position)
    }
    renderer.render(scene, camera)
    const delta = clock.getDelta();
    if (mixer){
      mixer.update(delta);
    }

}

function handleKeyDown(e){
  if (e.key === 'ArrowLeft'){
    bee.position.x -= 10
  } else if (e.key === 'ArrowRight'){
    bee.position.x += 10
  } else if (e.key === 'ArrowDown'){
    bee.position.z += 30
  } else if (e.key === 'ArrowUp'){
    bee.position.z -= 30
  }
}

animate()
document.addEventListener('keydown', e => handleKeyDown(e))


