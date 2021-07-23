import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118.1/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xbfe3dd);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 2000);
camera.position.set(100,200,300); //important

let clock = new THREE.Clock();

let tree, girl

let mixer

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const loader = new FBXLoader()


loader.load( '/asset/Alien_Tall.fbx', function ( obj ) {
    mixer = new THREE.AnimationMixer(obj)
    let action = mixer.clipAction(obj.animations[1])
    action.play()

    scene.add( obj );

    animate()
    

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
    renderer.render(scene, camera)
    const delta = clock.getDelta();
    if (mixer){
      mixer.update(delta);
    }
}



