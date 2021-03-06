// import * as Three from 'three'
// import oc from 'three-orbit-controls'
// import { mode } from './webpack.config';
// import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/FBXLoader.js'


// const OrbitControls = oc(Three)

const alert = document.getElementById("alert")
alert.style.position = 'absolute'
alert.style.top = '5%'
alert.style.left = '5%'

const radius = 600;
let theta = 0;
let prevTime = Date.now();
var temp = new THREE.Vector3;



//Create a scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xbfe3dd);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 2000);
camera.position.set(10,10,-10); //important

var gridHelper = new THREE.GridHelper( 4, 10 );
scene.add( gridHelper );


//Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
console.log(cube)
// scene.add(cube);

let mixer
let model
let skeleton
let xSpeed = 0.5
let ySpeed = 0.5

let goal = new THREE.Object3D;
goal.position.set(10, 10, -10);

//ground
// const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100,100), new THREE.MeshPhongMaterial({ color: 0x99999, depthWrite: false }));
// mesh.rotation.x = - Math.PI / 2;
// mesh.receiveShadow = true;
// scene.add(mesh)


const loader = new THREE.GLTFLoader()
// const loader = new FBXLoader()

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);
const clock = new THREE.Clock();

// loader.load( '/asset/BirchTree_1.fbx', function ( object ) {

//     scene.add( object );

// }, undefined, function ( e ) {

//   console.error( e );

// } );

// const fbxLoader = new FBXLoader()
// loader.load('/asset/BirchTree_1.fbx', (obj) => {
//         console.log(obj)
//         model = scene.add(obj)
//         animate()
//     }, (error) => {
//         console.log(error)
//     }
// )

loader.load('/asset/NEW_wf_no_ele_OK_Shades3.gltf', (gltf) => {
    model = gltf.scene
    scene.add(model)
    console.log('model', model)
})

// loader.load('/asset/Squirrel_Fillet.gltf', function (gltf){
//     model = gltf.scene
//     model.position.set(0.7,-0.6,1); //position of character
//     model.scale.set(5, 5,5);
//     console.log(model)
//     scene.add(model);

//     //https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy.jpg
//     let stacy_txt = new THREE.TextureLoader().load('/asset/Squirrel_Textured.gltf');

//     stacy_txt.flipY = false; 

//     const stacy_mtl = new THREE.MeshPhongMaterial({
//         map: stacy_txt,
//         color: 0xffffff,
//         skinning: true
//       });

//     //rotate the character
//     // model.rotation.x = THREE.MathUtils.degToRad(-60);
//     // model.rotation.y = THREE.MathUtils.degToRad(-45);
//     // model.rotation.z = THREE.MathUtils.degToRad(60);
   
//     //something for the ground but has not worked yet
//     model.traverse( function (object){
//         if (object.isMesh) {
//             object.castShadow = true;
//             object.material = stacy_mtl;
//         }
//         //checking to turn direction of object based on cursor
//         if (object.isBone) {
//             console.log(object.name)
//           }
//     })

//     skeleton = new THREE.SkeletonHelper( model );
//     console.log('skeleton', skeleton)
//     skeleton.visible = true;
//     scene.add( skeleton );

//     // mixer = new THREE.AnimationMixer(model);
//     // mixer.clipAction(gltf.animations[0]).play();

//     animate() //important
    

// }, undefined, function (error){
//     console.error(error);
// })

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enablePan = false;
// controls.enableZoom = false;
// controls.target.set(0, 1, 0);
// controls.keys = {
//     LEFT: 'ArrowLeft',
//     UP: 'ArrowUp',
//     RIGHT: 'ArrowRight',
//     DOWN: 'ArrowDown'
// }


function animate(){
    requestAnimationFrame(animate); //to get camera control work
    const delta = clock.getDelta();
    // mixer.update(delta);
    // model.translateZ(0.01);
    
    // temp.setFromMatrixPosition(goal.matrixWorld);
    
    // camera.position.lerp(temp, 0.2);

    // camera.lookAt( model.position );

    renderer.render(scene, camera); //important

    controls.update()
    
    
}


//move the 3d model with key control
function handleKeyDown(e){
    if (e.key === controls.keys.LEFT){
        model.position.x += xSpeed
        scene.position.x += xSpeed
    } else if (e.key === controls.keys.RIGHT){
        model.position.x -= xSpeed
        scene.position.x -= xSpeed
    } else if (e.key === controls.keys.UP){
        model.position.y += ySpeed
        scene.position.x += ySpeed
    } else if (e.key === controls.keys.DOWN){
        model.position.y -= ySpeed
        scene.position.x -= ySpeed
    }
    if (model.position.x - 1< cube.position.x &&  cube.position.x < model.position.x + 1
        && model.position.y - 1 < cube.position.y && cube.position.y < model.position.y + 1 ){
            console.log("hit")
            alert.innerHTML = "HITTT.."
    } else {
        alert.innerHTML = ""
    }

    // setTimeout(update, 20)
    
}

function update(){
    camera.lookAt(scene.position)
}


// window.addEventListener('resize', function(){
//     let width = window.innerWidth;
//     let height = window.innerHeight;
//     renderer.setSize(width, height);
//     camera.aspect = width/height;
//     camera.updateProjectionMatrix;
// })

// document.addEventListener('keydown', e => handleKeyDown(e))