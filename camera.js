//Create a scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xbfe3dd);
const camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 5000);
camera.position.z = 10; //important

let mixer

const loader = new THREE.GLTFLoader()

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const clock = new THREE.Clock();

loader.load('/asset/RoughCharacter.gltf', function (gltf){
    const model = gltf.scene
    model.position.set(0,2,-15);
    model.scale.set(0.01, 0.01, 0.01);
    scene.add(model);

    console.log(gltf.animations)

    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();

    animate() //important

}, undefined, function (error){
    console.error(error);
})


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render( scene, camera );
document.body.appendChild(renderer.domElement);

function animate(){
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixer.update(delta);
    renderer.render(scene, camera); //important
}
