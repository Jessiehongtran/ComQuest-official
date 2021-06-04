import * as Three from 'three'
import oc from 'three-orbit-controls'
import { mode } from './webpack.config';

const OrbitControls = oc(Three)

//Create a scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xbfe3dd);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 2000);
camera.position.z = 5; //important

let mixer
let model
let xSpeed = 0.5
let ySpeed = 0.5

//ground
const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100,100), new THREE.MeshPhongMaterial({ color: 0x99999, depthWrite: false }));
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh)


const loader = new THREE.GLTFLoader()

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const clock = new THREE.Clock();

loader.load('/asset/RoughCharacter.gltf', function (gltf){
    model = gltf.scene
    model.position.set(0,2,-15);
    model.scale.set(0.01, 0.01, 0.01);
    scene.add(model);

    //rotate the character
    // model.rotation.x = THREE.MathUtils.degToRad(-60);
    // model.rotation.y = THREE.MathUtils.degToRad(-45);
    // model.rotation.z = THREE.MathUtils.degToRad(60);
   
    //something for the ground but has not worked yet
    model.traverse( function (object){
        if (object.isMesh) {
            object.castShadow = true;
        }
        //checking to turn direction of object based on cursor
        if (object.isBone) {
            console.log(object.name);
          }
    })

    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();

    animate() //important

}, undefined, function (error){
    console.error(error);
})

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.target.set(0, 1, 0);
controls.update()

function animate(){
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixer.update(delta);
    renderer.render(scene, camera); //important
    controls.update()
}


//move the 3d model with key control
function handleKeyDown(e){
    if (e.key === "ArrowLeft"){
        model.position.x -= xSpeed
    } else if (e.key === "ArrowRight"){
        model.position.x += xSpeed
    } else if (e.key === "ArrowUp"){
        model.position.y += ySpeed
    } else if (e.key === "ArrowDown"){
        model.position.y -= ySpeed
    }
}

window.addEventListener('resize', function(){
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix;
})

document.addEventListener('keydown', e => handleKeyDown(e))