import * as THREE from "three";
import Stat from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
const w = window.innerWidth;
const h = window.innerHeight;

// stat
const stat = new Stat();
// gui
const gui = new dat.GUI();
// Scene
const scene = new THREE.Scene();

// axes
const axes = new THREE.AxesHelper(12, 12, 12);
scene.add(axes);

// car
const car = new THREE.Group();

// public martrial
const m = new THREE.MeshNormalMaterial();

// frontWheels
const frontWheels = new THREE.Group();

// wheel 1
const wheel1 = new THREE.Group();
const wheelG = new THREE.TorusGeometry(0.5, 0.1, 10, 20);
const wheel1Mesh = new THREE.Mesh(wheelG, m);

const n = 10;
for (let i = 0; i < n; i++) {
  const g = new THREE.CylinderGeometry(0.02, 0.02, 1);
  const mesh = new THREE.Mesh(g, m);
  mesh.rotation.z = ((Math.PI * 2) / n) * i;
  wheel1.add(mesh);
}

// cylinder1
const len = 2;
const cylinderG = new THREE.CylinderGeometry(0.05, 0.05, len);
const cylinder = new THREE.Mesh(cylinderG, m);
cylinder.rotation.x = Math.PI * 0.5;
wheel1.add(wheel1Mesh);
wheel1.position.z = -len / 2;

// wheel2

const wheel2 = wheel1.clone();
wheel2.position.z = len / 2;
frontWheels.add(wheel1, wheel2, cylinder);
frontWheels.rotation.y = Math.PI / 2;
frontWheels.position.y = -1;

// backwheels
const backwheels = frontWheels.clone();
backwheels.position.y = 1;

//------------------------------------
// car body
const body = new THREE.Group();
const cubeG = new THREE.BoxGeometry(1.6, 3.4, 0.5);
const cube = new THREE.Mesh(cubeG, m);

// car roof
const roofG = new THREE.CylinderGeometry(
  1.2,
  1.2,
  1.6,
  3,
  1,
  false,
  Math.PI / 2,
  Math.PI
);
const roof = new THREE.Mesh(roofG, m);
roof.rotation.z = -Math.PI / 2;
roof.position.z = 0.2;
body.add(cube, roof);

// control color
const groundControls = {
  color: 0x265c29,
};
// add to scene

car.add(frontWheels, backwheels, body);
scene.add(car);

// ground

const planeG = new THREE.PlaneGeometry(40, 40);
const planeM = new THREE.MeshBasicMaterial({ color: groundControls.color });
const plane = new THREE.Mesh(planeG, planeM);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
car.rotation.x = 0.5 * Math.PI;
car.position.y = 0.6;

gui
  .addColor(groundControls, "color")
  .onChange(() => {
    planeM.color.set(groundControls.color);
  })
  .name("groundcolor");

// camera

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const folder1 = gui.addFolder("camera");
folder1.add(camera.position, "x", -5, 5, 0.01).name("camera-x");
folder1.add(camera.position, "y", -5, 5, 0.01).name("camera-y");
folder1.add(camera.position, "z", -5, 5, 0.01).name("camera-z");

const folder2 = gui.addFolder("car");
folder2.add(car.position, "x", -5, 5, 0.01).name("x");
folder2.add(car.position, "y", -5, 5, 0.01).name("y");
folder2.add(car.position, "z", -5, 5, 0.01).name("z");

// Renderer
const renderer = new THREE.WebGLRenderer();

document.body.append(renderer.domElement);
document.body.append(stat.dom);

// control

const orbitControls = new OrbitControls(camera, renderer.domElement);

//  tick animation
const clock = new THREE.Clock();

// stop car
const controls = {
  speed: 1,
  stop: () => {
    controls.speed = 0;
  },
};
gui.add(controls, "stop").name("stopmove");
tick();

function tick() {
  const time = clock.getElapsedTime();

  frontWheels.rotation.x = time * controls.speed;
  backwheels.rotation.x = time * controls.speed;
  car.position.z = ((time % 2) - 1) * controls.speed;
  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  renderer.setSize(w, h);
  stat.update();
  orbitControls.update();
}
