console.log('third person')

// import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r127/three.js'
// // import oc from 'three-orbit-controls'
// import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/loaders/FBXLoader.js'





// const OrbitControls = oc(THREE)

//standard global variables
let container, scene, camera, renderer, controls, stats;
// let keyboard = new THREEx.KeyboardState();
let clock = new THREE.Clock();
//custom global variables
let cube;

let keyDown;

let moveDistance, rotateAngle;

init();
animate();

//functions
function init(){
    //scene
    scene = new THREE.Scene();
    //camera
    let screen_width = window.innerWidth;
    let screen_height = window.innerHeight;
    let view_angle = 45;
    let aspect = screen_width/screen_height;
    let near = 0.1;
    let far = 20000;
    camera = new THREE.PerspectiveCamera(view_angle, aspect, near, far);
    scene.add(camera);
    camera.position.set(0,150,400);
    camera.lookAt(scene.position);
    //renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(screen_width, screen_height);
    document.body.appendChild(renderer.domElement);
    //light
    let light = new THREE.PointLight(0xffffff);
    light.position.set(0,250,0);
    scene.add(light);
    //floor
    let floorGeometry = new THREE.PlaneGeometry(300, 300, 1, 1);
    let floorMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.material.side = THREE.DoubleSide;
    floor.rotation.x = 90;
    scene.add(floor);
    //cube
    let cubeGeometry = new THREE.BoxGeometry(40, 40, 1, 1);
    let cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial );
    scene.add(cube);

    // const loader = new FBXLoader()

    // loader.load( '/asset/BirchTree_1.fbx', function ( object ) {

    //     scene.add( object );

    // }, undefined, function ( e ) {

    // console.error( e );

    // } );

}

function animate(){
    requestAnimationFrame(animate);
    render();
    update();
}

function update(){
    let delta = clock.getDelta();
    moveDistance = 200*delta;
    rotateAngle = Math.PI/2*delta;

    //move forward, backward, left, right
    controls.update()
    let relativeCameraOffset = new THREE.Vector3(0,50,200);

    let cameraOffset = relativeCameraOffset.applyMatrix4(cube.matrixWorld);

    camera.position.x = cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = cameraOffset.z;
    camera.lookAt(cube.position);

    

}

function render(){
    renderer.render(scene, camera)
    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.enablePan = false;
    // controls.enableZoom = false;
    // controls.target.set(0, 1, 0);
    // controls.keys = {
    //     LEFT: 'ArrowLeft',
    //     UP: 'ArrowUp',
    //     RIGHT: 'ArrowRight',
    //     DOWN: 'ArrowDown'
    // }
}


function handleKeyDown(e){
    if (e.key === controls.keys.LEFT){
        cube.translateX(-moveDistance)
    } else if (e.key === controls.keys.RIGHT){
        cube.translateX(moveDistance)
    } else if (e.key === controls.keys.UP){
        cube.translateZ(-moveDistance)
    } else if (e.key === controls.keys.DOWN){
        cube.translateZ(moveDistance)
    }
    
}

document.addEventListener('keydown', e => handleKeyDown(e))



window.addEventListener('resize', function(){
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix;
})