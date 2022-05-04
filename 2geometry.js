import * as THREE from "three";
import Stat from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const w = window.innerWidth;
const h = window.innerHeight;

// stat
const stat = new Stat();
// Scene
const scene = new THREE.Scene();

// axes
const axes = new THREE.AxesHelper(12, 12, 12);
scene.add(axes);

// objects

const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
const material = new THREE.MeshNormalMaterial({
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 2;
scene.add(mesh);

const geometry2 = new THREE.SphereGeometry(1);
const mesh2 = new THREE.Mesh(geometry2, material);
scene.add(mesh2);

//floor

const planeGeometry = new THREE.PlaneGeometry(4, 4, 10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({ 
  color: 0xcccccc,
  // wireframe: true,
  side: THREE.DoubleSide
 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

// camera

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);

document.body.append(renderer.domElement);
document.body.append(stat.dom);

// control

const orbitControls = new OrbitControls(camera, renderer.domElement);

//  tick animation
const clock = new THREE.Clock();

tick();

function tick() {
  const time = clock.getElapsedTime();

  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  stat.update();
  orbitControls.update();
}
