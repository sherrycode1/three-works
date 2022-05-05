import * as THREE from "three";
import Stat from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
let w = window.innerWidth;
let h = window.innerHeight;

// stat
const stat = new Stat();
// gui
const gui = new dat.GUI();
// Scene
const scene = new THREE.Scene();

// axes
// const axes = new THREE.AxesHelper(12, 12, 12);
// scene.add(axes);

// light
// AmbientLight
const aLight = new THREE.AmbientLight(0xffffff, 0.4);
aLight.intensity = 0.1;
scene.add(aLight);
// DirectionalLight
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(7, 7, 7);
light.castShadow = true;
scene.add(light);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(5, 3, 3);

// spotLight.position.x = - 0.5 * Math.PI

scene.add(spotLight);

// const lightHelper = new THREE.DirectionalLightHelper(light);
// scene.add(lightHelper);
// const lightHelper1 = new THREE.SpotLightHelper(spotLight);
// scene.add(lightHelper1);

// const hLight = new THREE.HemisphereLight(0xff0000,0x0000ff)
// scene.add(hLight)

// texture
const loader = new THREE.TextureLoader();
const texture = loader.load("./imgs/textu.jpg");
const texture1 = loader.load("./imgs/wood.jpg");

// sphere

const smatrial = new THREE.MeshPhongMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
const spereG = new THREE.SphereGeometry(1);
const spere = new THREE.Mesh(spereG, smatrial);
spere.position.x = 3;
spere.position.y = 1;
spere.castShadow = true;
scene.add(spere);

// cube
const cubec = new THREE.BoxGeometry(1, 1, 1);
const cubem = new THREE.MeshPhongMaterial({ map: texture1 });
const cube1 = new THREE.Mesh(cubec, cubem);
cube1.castShadow = true;
cube1.position.set(-3, 0.5, 2);
const cube2 = cube1.clone();
cube1.position.set(-3, 0.5, 4);
scene.add(cube1, cube2);

const cube3g = new THREE.BoxGeometry(2, 2, 1);

// buildings
const buildingGroup1 = new THREE.Group();
const buildingG = new THREE.BoxGeometry(2, 7, 2);
const buildingG2 = new THREE.BoxGeometry(2, 10, 2);
const buildingM = new THREE.MeshPhongMaterial({ color: 0x6f687a });
const buildingM2 = new THREE.MeshPhongMaterial({ color: 0xc3a090 });
const building1 = new THREE.Mesh(buildingG, buildingM);
const building2 = new THREE.Mesh(buildingG2, buildingM2);
building1.position.set(-6, 4, 0);
building2.position.set(-6, 5, 4);
buildingGroup1.add(building1, building2);
const buildingGroup2 = buildingGroup1.clone();
const buildingGroup3 = buildingGroup1.clone()

const buildingGroup5 = buildingGroup1.clone()
buildingGroup2.position.set(12, 0, 5);
buildingGroup3.position.set(0, 0, 8);

buildingGroup5.position.set( 3, 0, -0.1)

buildingGroup5.rotation.y = - 0.5 * Math.PI
scene.add(buildingGroup1, buildingGroup2, buildingGroup3, buildingGroup5);

// video texture

const video = document.getElementById("video");
const texturevideo = new THREE.VideoTexture(video);
texturevideo.needsUpdate;
texturevideo.minFilter = THREE.LinearFilter;
texturevideo.magFilter = THREE.LinearFilter;
texturevideo.format = THREE.RGBFormat;

const cube3 = new THREE.Mesh(
  cube3g,
  new THREE.MeshBasicMaterial({ map: texturevideo })
);
cube3.position.set(-3, 2, 3);
cube3.rotation.y = -0.5 * Math.PI;
scene.add(cube3);

video.src = "./video/add.webm";
video.load();
video.play();

// torus
const torusG = new THREE.TorusGeometry(0.4, 0.2, 10, 20);
const torus = new THREE.Mesh(torusG, smatrial);
torus.position.set(5, 3, 1);
torus.castShadow = true;
scene.add(torus);

// car
const car = new THREE.Group();

// public martrial
const m = new THREE.MeshNormalMaterial();

// other martrial
// new THREE.MeshLambertMaterial({
//   color: 0x961560
// });
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
  color: 0x94bb94,
};
// add to scene

car.add(frontWheels, backwheels, body);

scene.add(car);

// ground
const floor = loader.load("./imgs/floor.jpg");

const planeG = new THREE.PlaneGeometry(40, 40);
const planeM = new THREE.MeshLambertMaterial({ map: floor });
const plane = new THREE.Mesh(planeG, planeM);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
car.rotation.x = 0.5 * Math.PI;
plane.receiveShadow = true;
car.position.y = 0.6;

// roadGroup
const roadGroup = new THREE.Group();
const roadPlaneG = new THREE.PlaneGeometry(2, 40);
const roadplaneM = new THREE.MeshStandardMaterial({ color: 0x4c4a4b });
const roadPlane = new THREE.Mesh(roadPlaneG, roadplaneM);

const leftLine = new THREE.Mesh(
  new THREE.PlaneGeometry(0.1, 40),
  new THREE.MeshStandardMaterial({ color: 0xffffff })
);

leftLine.position.z = 0.0001;
leftLine.position.x = -0.8;
const rightLine = leftLine.clone();
rightLine.position.x = 0.8;

const dashLineGroup = new THREE.Group();
let dashNum = 81;
for (var i = 0; i < dashNum; i++) {
  const m = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const g = new THREE.PlaneGeometry(0.1, 0.3);
  const mesh = new THREE.Mesh(g, m);
  mesh.position.z = 0.0001;
  mesh.position.y = -40 / 2 + 0.5 * i;
  dashLineGroup.add(mesh);
}

roadGroup.add(dashLineGroup, leftLine, rightLine, roadPlane);
// roadGroup.rotation.x =  Math.PI
roadGroup.rotation.x = -0.5 * Math.PI;
roadGroup.position.y = 0.1;
scene.add(roadGroup);

// camera

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.set(3.56, 5, 5);
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
renderer.setClearColor(groundControls.color);
gui
  .addColor(groundControls, "color")
  .onChange(() => {
    renderer.setClearColor(groundControls.color);
  })
  .name("groundcolor");
renderer.shadowMap.enabled = true;
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

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// create a global audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load("./audio/bg.ogg", function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});

function tick() {
  const time = clock.getElapsedTime();
  frontWheels.rotation.x = time * controls.speed;
  backwheels.rotation.x = time * controls.speed;
  car.position.z = ((time % 2) - 1) * controls.speed + 5;
  torus.position.x = Math.sin(time) + 4;
  torus.position.y = Math.sin(time) + 4;
  spere.position.x = 4 + Math.sin(time);
  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  renderer.setSize(w, h);
  stat.update();
  orbitControls.update();
}
console.log(tick);
// window resize

window.addEventListener("resize", () => {
  w = window.innerWidth;
  h = window.innerHeight;

  // camera
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  render.setSize(w, h);
});
