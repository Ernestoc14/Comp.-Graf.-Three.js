import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// standard global variables
var container, scene, camera, renderer, controls;
var clock = new THREE.Clock();
// custom global variables
var cube;

init();
animate();

// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);	
	// RENDERER
	renderer = new THREE.WebGLRenderer( {antialias:true} );
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	// CONTROLS
	controls = new OrbitControls( camera, renderer.domElement );

	var cubeGeometry = new THREE.BoxGeometry( 5, 5, 5 );
	var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x888888 } );
	cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cube.position.set(0,50,0);
	scene.add(cube);

    // LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	
	
    const planeMaterial = new THREE.MeshPhongMaterial({color: 0x00FFFF, side: THREE.DoubleSide})
    const planeGeometry = new THREE.PlaneGeometry(1,1 ,1);
	const plane01 = new THREE.Mesh(planeGeometry, planeMaterial);
	plane01.rotation.x = 180;
    scene.add(plane01);

    const skyBoxGeometry = new THREE.SphereGeometry(10, 10, 10);
    const skyBoxMaterial = new THREE.MeshBasicMaterial({color: 0x9999FF, side: THREE.BackSide});
    const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);
    scene.fog = new THREE.FogExp2(0x9999FF, 0.00025);
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	controls.update();
}

function render() 
{
	renderer.render( scene, camera );
}

