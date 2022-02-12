import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118.1/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { assets } from './asset/assets.js'


//Next steps:
//Add collision

//Questions/curiosity:


let bee, squirrel, squirrelNPC, cub

const warning = document.getElementById('warning')

const scene = new THREE.Scene()
var scene2 = new THREE.Scene();

scene.background = new THREE.Color(0xC8F0FA);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 20000);
camera.position.set(100,200,300); //important
camera.lookAt(scene.position)

// let cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper)


const axes = new THREE.AxesHelper(500);
axes.position.set(200,-500,-1800);
var colors = axes.geometry.attributes.color;
colors.setXYZ( 1, 1, 0, 0 ); // red
colors.setXYZ( 3, 0, 1, 0 ); // green
colors.setXYZ( 5, 0, 0, 1 ); // blue
// scene.add(axes)

let clock = new THREE.Clock();

let mixer = []

const FBXloader = new FBXLoader()


for (let i = 0; i < assets.length; i++){
  FBXloader.load( assets[i].path, function ( obj ) {
    obj.position.set( assets[i].x, assets[i].y, assets[i].z)
    obj.scale.set( assets[i].xscale, assets[i].yscale, assets[i].zscale)
    obj.traverse( function (object) {
      if (object.isMesh){
        console.log(object.material)
        if (object.material.length > 0){
          for (let i in object.material){
            object.material[i].color.add({b: assets[i].b, g: assets[i].g, r: assets[i].r });
          }
        } else {
          object.material.color.add({ b: assets[i].b, g: assets[i].g, r: assets[i].r });
        }
      }
    } );
    scene.add( obj );
  }, undefined, function ( e ) {
    console.error( e );
  } );

}

FBXloader.load( '/asset/Squirrel_Walk_scaled.fbx', function ( obj ) {
  squirrel = obj
  let newMixer = new THREE.AnimationMixer(obj)
  let action = newMixer.clipAction(obj.animations[0])
  action.play()
  mixer.push(newMixer)
  obj.scale.set(1,1,1)
  obj.position.set(200,-500,-1800)
  scene2.add( obj );    

}, undefined, function ( e ) {

console.error( e );

} );

let cubicle


FBXloader.load( '/asset/GreySquirrel_NPC.fbx', function ( obj ) {
  squirrelNPC = obj
  // let newMixer = new THREE.AnimationMixer(obj)
  // let action = newMixer.clipAction(obj.animations[0])
  // action.play()
  // mixer.push(newMixer)
  obj.scale.set(1,1,1)
  obj.position.set(200,-700,-1800)
  scene2.add( obj );    

}, undefined, function ( e ) {

console.error( e );

} );

FBXloader.load( '/asset/Level_3_Cubicle.fbx', function ( obj ) {
  cub = obj
  // let newMixer = new THREE.AnimationMixer(obj)
  // let action = newMixer.clipAction(obj.animations[0])
  // action.play()
  // mixer.push(newMixer)
  obj.scale.set(1,1,1)
  obj.position.set(200,-900,-1800)
  scene2.add( obj );    

}, undefined, function ( e ) {

console.error( e );

} );

FBXloader.load( '/asset/OfficeDeskCubicle.fbx', function ( obj ) {
  cubicle = obj
  // let newMixer = new THREE.AnimationMixer(obj)
  // let action = newMixer.clipAction(obj.animations[0])
  // action.play()
  // mixer.push(newMixer)
  obj.scale.set(1,1,1)
  obj.position.set(200,-500,-1800)
  scene2.add( obj );    

}, undefined, function ( e ) {

console.error( e );

} );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//LIGHTS
// var light = new THREE.AmbientLight(0xF38902, 1.4 );
// scene.add(light);

var pointlight = new THREE.PointLight(0xF38907, 2.0, 4000);
// light.position.set( 100, -600, -2000 );
scene.add(pointlight)

// var light = new THREE.DirectionalLight(0xF38902, 2.0, 1000);
// if (squirrel){
//   light.target = squirrel
// }
// scene.add(light)

var hemilight = new THREE.HemisphereLight(0xffffbe, 0x0808dd, 1);
// scene.add(hemilight)
scene2.add(hemilight)

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.autoClear = false;

//SHADOW -- but does not work yet
var spotlight = new THREE.SpotLight(0xffffbe, 4.0, 3000);
spotlight.position.y = 100;
if (squirrel){
  spotlight.target = cubicle;
}

spotlight.cashShadow = true;
spotlight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(100, 1, 500, 1000));
spotlight.shadow.bias = 0.0001;
spotlight.shadow.mapSize.width = 2048*2;
spotlight.shadow.mapSize.height = 2048*2;
scene.add(spotlight);

if (squirrel){
  squirrel.castShadow = true;
  squirrel.receiveShadow = true;
}

function animate(){
    requestAnimationFrame(animate);
    if (squirrel){ 
      camera.lookAt(squirrel.position)
    }

    renderer.clear()
    renderer.render(scene, camera);
    renderer.clearDepth()
    renderer.render(scene2, camera);

    const delta = clock.getDelta();
    // if (mixer && mixer.length > 0){
    //   mixer.forEach(each => each.update(delta));
    // }

    
    for (let i = 0; i < assets.length; i++){
      if (squirrel && squirrel.position.x >= assets[i].x - 100 && squirrel.position.x <= assets[i].x + 100 && squirrel.position.z >= assets[i].z - 100 && squirrel.position.z <= assets[i].z + 100){
        warning.innerHTML = "Hit " + assets[i].name
      } 
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

