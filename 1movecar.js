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
const axes = new THREE.AxesHelper(2, 2, 2);
scene.add(axes);

// car
const car = new THREE.Group();

const body = new THREE.Group();

// material
const material = new THREE.MeshNormalMaterial();

const bodyCube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 0.5), material);
const bodyCube2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshBasicMaterial({ color: 0xff000 })
);

bodyCube2.position.z = 0.5;

body.add(bodyCube1);
body.add(bodyCube2);

car.add(body);
// wheel groups
// wheel wheel1
const wheelGroup1 = new THREE.Group();
const wheel1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.7, 0.7), material);
wheelGroup1.position.set(-0.7, 0.6, 0);
wheelGroup1.add(wheel1);
car.add(wheelGroup1);

// wheel2
const wheelGroup2 = new THREE.Group();
const wheel2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.7, 0.7), material);
wheelGroup2.position.set(0.7, 0.6, 0);
wheelGroup2.add(wheel2);
car.add(wheelGroup2);

// wheel3
const wheelGroup3 = wheelGroup1.clone()
wheelGroup3.position.y = -0.6
car.add(wheelGroup3)
// wheel4
const wheelGroup4 = wheelGroup2.clone()
wheelGroup4.position.y = -0.6
car.add(wheelGroup4)
// tire
const tire = new THREE.Group()
let n = 23
for(let i = 0; i< n; i++) {
  let r = 0.5
  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.2)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = r * Math.cos(Math.PI * 2/n * i )
  mesh.position.y = r * Math.sin(Math.PI * 2/n * i )
  tire.add(mesh)
}
tire.rotation.y = - 0.5 * Math.PI
wheelGroup1.add(tire)
wheelGroup2.add(tire.clone())
wheelGroup3.add(tire.clone())
wheelGroup4.add(tire.clone())

scene.add(car);
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
  wheelGroup1.rotation.x = time
  wheelGroup2.rotation.x = time
  wheelGroup3.rotation.x = time
  wheelGroup4.rotation.x = time
  car.position.y = -time % 2
  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  stat.update();
  orbitControls.update();

}
