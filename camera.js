import * as Three from 'three'
import oc from 'three-orbit-controls'

const OrbitControls = oc(Three)

//Create a scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xbfe3dd);
const camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 5000);
camera.position.z = 10; //important

let mixer

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
    const model = gltf.scene
    model.position.set(0,2,-15);
    model.scale.set(0.01, 0.01, 0.01);
    scene.add(model);

    //something for the ground but has not worked yet
    model.traverse( function (object){
        if (object.isMesh) object.castShadow = true;
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
}
