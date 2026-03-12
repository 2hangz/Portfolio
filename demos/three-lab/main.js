// Name: Hang ZHou
// Student ID: 124100870

import * as THREE from 'three';
import * as CANNON from './libs/cannon-es.js';
import { GLTFLoader } from './libs/GLTFLoader.js';
import { OrbitControls } from './libs/OrbitControls.js';
import { GUI } from './libs/dat.gui.module.js';
import Stats from './libs/stats.module.js';
import { VRButton } from './libs/VRButton.js';
import { XRControllerModelFactory } from './libs/XRControllerModelFactory.js';

// ========================
// Physics World Setup
// ========================
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
world.broadphase = new CANNON.SAPBroadphase(world);
world.solver.iterations = 20;
world.allowSleep = true;

// Physics materials
const ballPhysicsMaterial = new CANNON.Material("ballMaterial");
const groundMaterial = new CANNON.Material("groundMaterial");
const ballContactMaterial = new CANNON.ContactMaterial(
  ballPhysicsMaterial,
  groundMaterial,
  {
    friction: 0.3,
    restitution: 0.7
  }
);
world.addContactMaterial(ballContactMaterial);

// Collision groups
const BALL_GROUP = 1;
const STATIC_GROUP = 2;
const CHARACTER_GROUP = 4;

// ========================
// Three.js Scene Setup
// ========================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

// Camera setup
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
const cameraStart = new THREE.Vector3(10, 10, 5);
const cameraEnd = new THREE.Vector3(0, 1.6, 2);
let cameraLerpAlpha = 0;
let cameraFlying = true;

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));

// ========================
// WebXR Controllers
// ========================
const controller1 = renderer.xr.getController(0);
scene.add(controller1);
const controller2 = renderer.xr.getController(1);
scene.add(controller2);

controller2.addEventListener('selectstart', () => {
  lampSettings.enabled = !lampSettings.enabled;
  lights.point.intensity = lampSettings.enabled ? lampSettings.lightIntensity : 0;
  bulbMat.emissiveIntensity = lampSettings.enabled ? lampSettings.bulbIntensity : 0.05;
  log(`VR Controller toggled lamp: ${lampSettings.enabled ? 'ON' : 'OFF'}`);
});

controller1.addEventListener('selectstart', () => {
  mediaControl.togglePlayPause();
});

const controllerModelFactory = new XRControllerModelFactory();
const controllerGrip1 = renderer.xr.getControllerGrip(0);
controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
scene.add(controllerGrip1);
const controllerGrip2 = renderer.xr.getControllerGrip(1);
controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
scene.add(controllerGrip2);

// Initialize Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Stats
const stats = new Stats();
document.body.appendChild(stats.dom);

function log(msg) {
  console.log(`${msg}`);
}

// ========================
// Classroom Construction
// ========================
const roomWidth = 8;
const roomDepth = 10;
const wallHeight = 4;
const wallThickness = 0.05;
const floorThickness = 0.3;

// Floor
const floorTexture = new THREE.TextureLoader().load('assets/textures/patterned_4k.jpg');
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4);

const floorGeo = new THREE.BoxGeometry(roomWidth, floorThickness, roomDepth);
const floorMat = new THREE.MeshStandardMaterial({ map: floorTexture });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.position.set(0, floorThickness / 2, 0);
floor.receiveShadow = true;
scene.add(floor);

// Physics ground plane
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({
  mass: 0,
  shape: groundShape,
  material: groundMaterial,
  collisionFilterGroup: STATIC_GROUP,
  collisionFilterMask: BALL_GROUP
});
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2);
groundBody.position.y = 0.3;
world.addBody(groundBody);

// Lab Tables and Stools
const deskSpacingX = 4;
const deskSpacingZ = 3;
const rows = 1;
const cols = 2;
const tableBodies = [];

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const tableGroup = new THREE.Group();
    const tableX = (col - (cols - 1)/2) * deskSpacingX;
    const tableZ = -row * deskSpacingZ + 1.5;

    // Tabletop
    const tableTop = new THREE.Mesh(
      new THREE.BoxGeometry(3, 0.2, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
    );
    tableTop.position.y = 1;
    tableTop.castShadow = true;
    tableGroup.add(tableTop);

    // Table legs
    for (let x of [-1.3, 1.3]) {
      for (let z of [-0.5, 0.5]) {
        const leg = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 1, 0.1),
          new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
        );
        leg.position.set(x, 0.5, z);
        leg.castShadow = true;
        tableGroup.add(leg);
      }
    }

    // Two stools
    const stoolOffsets = [-0.4, 0.4];
    for (let i = 0; i < 2; i++) {
      const stool = new THREE.Group();

      const seat = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 0.05, 32),
        new THREE.MeshStandardMaterial({ color: 0x5a3921 })
      );
      seat.position.y = 0.55;
      seat.castShadow = true;
      stool.add(seat);

      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / 3) {
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 0.5, 16),
          new THREE.MeshStandardMaterial({ color: 0x111111 })
        );
        leg.position.set(Math.cos(angle) * 0.2, 0.25, Math.sin(angle) * 0.2);
        leg.castShadow = true;
        stool.add(leg);
      }

      stool.position.set(stoolOffsets[i], 0, 0.8);
      tableGroup.add(stool);

      // Add physics for stool seats
      const stoolShape = new CANNON.Cylinder(0.25, 0.25, 0.05, 8);
      const stoolBody = new CANNON.Body({
        mass: 0,
        shape: stoolShape,
        material: groundMaterial,
        position: new CANNON.Vec3(
          tableX + stoolOffsets[i],
          0.55,
          tableZ + 0.8
        ),
        collisionFilterGroup: STATIC_GROUP,
        collisionFilterMask: BALL_GROUP
      });
      stoolBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI/2);
      world.addBody(stoolBody);
    }

    tableGroup.position.set(tableX, 0, tableZ);
    scene.add(tableGroup);

    // Add physics for table top
    const tableShape = new CANNON.Box(new CANNON.Vec3(1.5, 0.1, 0.6));
    const tableBody = new CANNON.Body({
      mass: 0,
      shape: tableShape,
      material: groundMaterial,
      position: new CANNON.Vec3(tableX, 1, tableZ),
      collisionFilterGroup: STATIC_GROUP,
      collisionFilterMask: BALL_GROUP
    });
    world.addBody(tableBody);
    tableBodies.push(tableBody);

    log("Tables and stools are created with physics");
  }
}

// Walls (visual and physics)
const wallsTexture = new THREE.TextureLoader().load('assets/textures/wood_4k.jpg');
wallsTexture.wrapS = THREE.RepeatWrapping;
wallsTexture.wrapT = THREE.RepeatWrapping;
wallsTexture.repeat.set(roomWidth/2, wallHeight/2);
const wallMat = new THREE.MeshStandardMaterial({ map: wallsTexture });

const createPhysicsWall = (width, height, depth, x, y, z) => {
  const shape = new CANNON.Box(new CANNON.Vec3(width/2, height/2, depth/2));
  const body = new CANNON.Body({
    mass: 0,
    shape: shape,
    material: groundMaterial,
    position: new CANNON.Vec3(x, y, z),
    collisionFilterGroup: STATIC_GROUP,
    collisionFilterMask: BALL_GROUP
  });
  world.addBody(body);
  return body;
};

// Back wall
const backWall = new THREE.Mesh(
  new THREE.BoxGeometry(roomWidth, wallHeight, wallThickness),
  wallMat
);
backWall.position.set(0, wallHeight/2, -roomDepth/2 + wallThickness/2);
scene.add(backWall);
createPhysicsWall(roomWidth, wallHeight, wallThickness, 0, wallHeight/2, -roomDepth/2);

// Front wall
const frontWall = new THREE.Mesh(
  new THREE.BoxGeometry(roomWidth, wallHeight, wallThickness),
  wallMat
);
frontWall.position.set(0, wallHeight/2, roomDepth/2 + wallThickness/2);
scene.add(frontWall);
createPhysicsWall(roomWidth, wallHeight, wallThickness, 0, wallHeight/2, roomDepth/2);

// Left wall
const leftWall = new THREE.Mesh(
  new THREE.BoxGeometry(wallThickness, wallHeight, roomDepth),
  wallMat
);
leftWall.position.set(-roomWidth/2 + wallThickness/2, wallHeight/2, 0);
scene.add(leftWall);
createPhysicsWall(wallThickness, wallHeight, roomDepth, -roomWidth/2 + wallThickness/2, wallHeight/2, 0);

// Right wall
const rightWall = new THREE.Mesh(
  new THREE.BoxGeometry(wallThickness, wallHeight, roomDepth),
  wallMat
);
rightWall.position.set(roomWidth/2 + wallThickness/2, wallHeight/2, 0);
scene.add(rightWall);
createPhysicsWall(wallThickness, wallHeight, roomDepth, roomWidth/2 + wallThickness/2, wallHeight/2, 0);

log("Walls are created with physics");

// ========================
// Video Projection
// ========================
const video = document.createElement('video');
video.src = 'assets/videos/dance.mp4';
video.loop = true;
video.muted = true;
video.playsInline = true;
video.load();

const videoTexture = new THREE.VideoTexture(video);
const videoMat = new THREE.MeshBasicMaterial({ map: videoTexture });
const screenWidth = 4, screenHeight = 2.25;

const outerFrame = new THREE.Mesh(
  new THREE.BoxGeometry(screenWidth + 0.2, screenHeight + 0.2, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x4b3016 })
);
const innerScreen = new THREE.Mesh(
  new THREE.PlaneGeometry(screenWidth, screenHeight),
  videoMat
);

outerFrame.position.set(0, wallHeight/1.8, -roomDepth/2 + wallThickness/2 + 0.1);
innerScreen.position.set(0, wallHeight/1.8, -roomDepth/2 + wallThickness/2 + 0.152);
scene.add(outerFrame);
scene.add(innerScreen);

// Add physics for screen frame
const screenShape = new CANNON.Box(new CANNON.Vec3((screenWidth + 0.2)/2, (screenHeight + 0.2)/2, 0.05));
const screenBody = new CANNON.Body({
  mass: 0,
  shape: screenShape,
  material: groundMaterial,
  position: new CANNON.Vec3(0, wallHeight/1.8, -roomDepth/2 + wallThickness/2 + 0.1),
  collisionFilterGroup: STATIC_GROUP,
  collisionFilterMask: BALL_GROUP
});
world.addBody(screenBody);

// ========================
// Standing Speakers
// ========================
const speakerMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });

function createSpeaker() {
  const speaker = new THREE.Group();

  // speaker body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 1.2, 0.3),
    speakerMaterial
  );
  body.castShadow = true;
  speaker.add(body);

  // speakers
  const speakerTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.05, 32),
    new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.6 })
  );
  speakerTop.rotation.x = Math.PI / 2;
  speakerTop.position.set(0, 0.3, 0.16);
  speakerTop.castShadow = true;
  speaker.add(speakerTop);

  const speakerBottom = speakerTop.clone();
  speakerBottom.position.y = -0.3;
  speakerBottom.castShadow = true;
  speaker.add(speakerBottom);

  return speaker;
}

const speakerLeft = createSpeaker();
speakerLeft.position.set(-screenWidth/2 - 0.4, wallHeight/2, -roomDepth/2 + 0.15);
scene.add(speakerLeft);

const speakerRight = createSpeaker();
speakerRight.position.set(screenWidth/2 + 0.4, wallHeight/2, -roomDepth/2 + 0.15);
scene.add(speakerRight);

// Add physics for speakers
const speakerShape = new CANNON.Box(new CANNON.Vec3(0.15, 0.6, 0.15));
const speakerLeftBody = new CANNON.Body({
  mass: 0,
  shape: speakerShape,
  material: groundMaterial,
  position: new CANNON.Vec3(-screenWidth/2 - 0.4, wallHeight/2, -roomDepth/2 + 0.15),
  collisionFilterGroup: STATIC_GROUP,
  collisionFilterMask: BALL_GROUP
});
world.addBody(speakerLeftBody);

const speakerRightBody = new CANNON.Body({
  mass: 0,
  shape: speakerShape,
  material: groundMaterial,
  position: new CANNON.Vec3(screenWidth/2 + 0.4, wallHeight/2, -roomDepth/2 + 0.15),
  collisionFilterGroup: STATIC_GROUP,
  collisionFilterMask: BALL_GROUP
});
world.addBody(speakerRightBody);

// Audio Listener 
const listener = new THREE.AudioListener();
camera.add(listener);

// Load Sound for Left Speaker
const audioLoader = new THREE.AudioLoader();
const speakerSoundLeft = new THREE.PositionalAudio(listener);
audioLoader.load('assets/sounds/sound.mp3', function(buffer) {
  speakerSoundLeft.setBuffer(buffer);
  speakerSoundLeft.setRefDistance(2);
  speakerSoundLeft.setLoop(true);
  speakerSoundLeft.setVolume(0.5);
  speakerSoundLeft.play();
});
speakerLeft.add(speakerSoundLeft);

// Load Sound for Right Speaker
const speakerSoundRight = new THREE.PositionalAudio(listener);
audioLoader.load('assets/sounds/sound.mp3', function(buffer) {
  speakerSoundRight.setBuffer(buffer);
  speakerSoundRight.setRefDistance(2);
  speakerSoundRight.setLoop(true);
  speakerSoundRight.setVolume(0.5);
  speakerSoundRight.play();
});
speakerRight.add(speakerSoundRight);
log("Speakers created with physics");

// ===============
// Windows & Door
// ===============
const glassMat = new THREE.MeshStandardMaterial({ 
  color: 0x87ceeb,
  transparent: true,
  opacity: 0.7
});
const windowGeo = new THREE.BoxGeometry(1.8, 1.2, 0.16);
const window1 = new THREE.Mesh(windowGeo, glassMat);
window1.rotation.y = Math.PI / 2;
window1.position.set(-roomWidth/2 + wallThickness/2 + 0.01, 2, -0.5);
scene.add(window1);

const window2 = new THREE.Mesh(windowGeo.clone(), glassMat);
window2.rotation.y = Math.PI / 2;
window2.position.set(-roomWidth/2 + wallThickness/2 + 0.01, 2, 2.5);
scene.add(window2);

const doorGeo = new THREE.BoxGeometry(0.9, 2.2, 0.16);
const doorMat = new THREE.MeshStandardMaterial({ color: 0x552200 });
const door = new THREE.Mesh(doorGeo, doorMat);
door.rotation.y = Math.PI / 2;
door.position.set(-roomWidth/2 + wallThickness/2 + 0.01, 1.2, -2.5);
scene.add(door);

const doorGlassGeo = new THREE.BoxGeometry(0.5, 0.5, 0.2);
const doorGlass = new THREE.Mesh(doorGlassGeo, glassMat);
doorGlass.rotation.y = Math.PI / 2;
doorGlass.position.set(-roomWidth/2 + wallThickness/2 + 0.02, 1.6, -2.5);
scene.add(doorGlass);

// Add physics for door
const doorShape = new CANNON.Box(new CANNON.Vec3(0.45, 1.1, 0.08));
const doorBody = new CANNON.Body({
  mass: 0,
  shape: doorShape,
  material: groundMaterial,
  position: new CANNON.Vec3(-roomWidth/2 + wallThickness/2 + 0.01, 1.2, -2.5),
  collisionFilterGroup: STATIC_GROUP,
  collisionFilterMask: BALL_GROUP
});
world.addBody(doorBody);

// ===================
// GLTF Characters
// ===================
let m1, m1Mixer, m2, m2Mixer, m3, m3Mixer;
let mDirection = 0.2;
let m1XStart = 0;
let m1XRange = 1;
const m1Animations = [];
let m1CurrentAction = null;
const characterBodies = [];

new GLTFLoader().load('assets/models/m1.glb', (gltf) => {
  m1 = gltf.scene;
  m1.scale.set(1, 1, 1);
  m1.rotation.y = -Math.PI;

  m1.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  const box = new THREE.Box3().setFromObject(m1);
  const center = new THREE.Vector3();
  box.getCenter(center);
  m1.position.set(center.x+1.5, floorThickness - box.min.y, -center.z - 2);
  m1XStart = m1.position.x;
  scene.add(m1);

  // Initialize mixer
  m1Mixer = new THREE.AnimationMixer(m1);
  if (gltf.animations.length > 0) {
    const walkAction = m1Mixer.clipAction(gltf.animations[0]);
    m1Animations.push(walkAction);
    m1CurrentAction = walkAction;
    walkAction.play();
  }

  // Load 2nd animation
  new GLTFLoader().load('assets/models/m1_pray.glb', (prayGltf) => {
    prayGltf.animations.forEach((clip) => {
      const action = m1Mixer.clipAction(clip);
      m1Animations.push(action);
    });
  });

  // Add physics for character (using Cylinder instead of Capsule)
  const radius = 0.3;
  const height = 1.8;
  const characterShape = new CANNON.Cylinder(radius, radius, height, 12);
  const characterBody = new CANNON.Body({
    mass: 0, // Static character
    shape: characterShape,
    material: groundMaterial,
    position: new CANNON.Vec3(
      center.x+1.5,
      0.9, // Approximate center of mass
      -center.z - 2
    ),
    collisionFilterGroup: CHARACTER_GROUP,
    collisionFilterMask: BALL_GROUP
  });
  // Rotate cylinder to stand upright
  characterBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2);
  world.addBody(characterBody);
  characterBodies.push(characterBody);
});

new GLTFLoader().load('assets/models/m2.glb', (gltf) => {
  m2 = gltf.scene;
  m2.scale.set(1, 1, 1);
  m2.rotation.y = -Math.PI;

  m2.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  const box = new THREE.Box3().setFromObject(m2);
  const center = new THREE.Vector3();
  box.getCenter(center);
  m2.position.set(-center.x-1.5, floorThickness - box.min.y, center.z-2);
  scene.add(m2);

  if (gltf.animations.length > 0) {
    m2Mixer = new THREE.AnimationMixer(m2);
    const action = m2Mixer.clipAction(gltf.animations[0]);
    action.play();
  }

  // Add physics for character 2
  const radius = 0.3;
  const height = 1.8;
  const characterShape = new CANNON.Cylinder(radius, radius, height, 12);
  const characterBody = new CANNON.Body({
    mass: 0,
    shape: characterShape,
    material: groundMaterial,
    position: new CANNON.Vec3(
      -center.x-1.5,
      0.9,
      center.z-2
    ),
    collisionFilterGroup: CHARACTER_GROUP,
    collisionFilterMask: BALL_GROUP
  });
  characterBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2);
  world.addBody(characterBody);
  characterBodies.push(characterBody);
});

new GLTFLoader().load('assets/models/m3.glb', (gltf) => {
  m3 = gltf.scene;
  m3.scale.set(1, 1, 1);
  m3.rotation.y = -Math.PI;

  m3.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  const box = new THREE.Box3().setFromObject(m3);
  const center = new THREE.Vector3();
  box.getCenter(center);
  m3.position.set(-center.x+2.5, floorThickness - box.min.y+0.7, center.z+0.95);
  scene.add(m3);

  if (gltf.animations.length > 0) {
    m3Mixer = new THREE.AnimationMixer(m3);
    const action = m3Mixer.clipAction(gltf.animations[0]);
    action.play();
  }

  // Add physics for character 3
  const radius = 0.3;
  const height = 1.8;
  const characterShape = new CANNON.Cylinder(radius, radius, height, 12);
  const characterBody = new CANNON.Body({
    mass: 0,
    shape: characterShape,
    material: groundMaterial,
    position: new CANNON.Vec3(
      -center.x+2.5,
      0.9,
      center.z+0.95
    ),
    collisionFilterGroup: CHARACTER_GROUP,
    collisionFilterMask: BALL_GROUP
  });
  characterBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2);
  world.addBody(characterBody);
  characterBodies.push(characterBody);
  
  log("Characters and actions created with physics");
});

// ==========
// Lights 
// ==========
const lights = {
  ambient: new THREE.AmbientLight(0xfbeddf, 2.5),
  directional: new THREE.DirectionalLight(0xffffff, 1),
  point: new THREE.PointLight(0xffffff, 0.8, 20)
};
scene.add(lights.ambient);
lights.directional.position.set(0.2, 2.6, -4);
lights.directional.castShadow = true;
lights.directional.shadow.mapSize.width = 2048;
lights.directional.shadow.mapSize.height = 2048;
lights.directional.shadow.camera.near = 0.5;
lights.directional.shadow.camera.far = 50;
lights.directional.shadow.camera.left = -10;
lights.directional.shadow.camera.right = 10;
lights.directional.shadow.camera.top = 10;
lights.directional.shadow.camera.bottom = -10;
scene.add(lights.directional);

// ========================
// Lamp Construction
// ========================
const lampGroup = new THREE.Group();
const bulbMat = new THREE.MeshStandardMaterial({ 
  emissive: 0xffffcc,
  emissiveIntensity: 1,
  color: 0xffffff
});
const bulbMesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 8), bulbMat);
bulbMesh.position.set(0, 1.5, 0);
lampGroup.add(bulbMesh);
const poleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.5, 12), 
  new THREE.MeshStandardMaterial({ color: 0x555555 }));
poleMesh.position.set(0, 0.75, 0);
lampGroup.add(poleMesh);
lampGroup.position.set(-3, 0, -4);
scene.add(lampGroup);
scene.add(lights.point);

// Add physics for lamp pole
const lampShape = new CANNON.Cylinder(0.04, 0.04, 1.5, 8);
const lampBody = new CANNON.Body({
  mass: 0,
  shape: lampShape,
  material: groundMaterial,
  position: new CANNON.Vec3(-3, 0.75, -4),
  collisionFilterGroup: STATIC_GROUP,
  collisionFilterMask: BALL_GROUP
});
lampBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI/2);
world.addBody(lampBody);
log("Lights are created with physics");

// ========================
// Storage Cabinet 
// ========================
const cabinet = new THREE.Group();

const cabinetBody = new THREE.Mesh(
  new THREE.BoxGeometry(5, 1.8, 1.5),
  new THREE.MeshStandardMaterial({ 
    color: 0x666666, 
    metalness: 0.5, 
    roughness: 0.3 
  })
);
cabinetBody.position.set(0, 0.8, 0);
cabinetBody.castShadow = true;
cabinet.add(cabinetBody);

cabinet.position.set(0, 1.8, 5-(1.5/2));
cabinet.rotation.x = Math.PI;
scene.add(cabinet);

const glassDoor = new THREE.Mesh(
  new THREE.BoxGeometry(4, 1.4, 0.02),
  new THREE.MeshStandardMaterial({
    color: 0xddddff,
    transparent: true,
    opacity: 0.3
  })
);
glassDoor.position.set(0, 0.9, 0.8);
cabinet.add(glassDoor);

// Add physics for cabinet
const cabinetShape = new CANNON.Box(new CANNON.Vec3(2.5, 0.9, 0.75));
const cabinetBodyPhysics = new CANNON.Body({
  mass: 0,
  shape: cabinetShape,
  material: groundMaterial,
  position: new CANNON.Vec3(0, 0.9, 5-(1.5/2)),
  collisionFilterGroup: STATIC_GROUP,
  collisionFilterMask: BALL_GROUP
});
world.addBody(cabinetBodyPhysics);

// ========================
// Ball with Physics
// ========================
const ballRadius = 0.5;
const ballGeometry = new THREE.SphereGeometry(ballRadius, 20, 20);
const ballMaterial = new THREE.MeshStandardMaterial({ 
  color: 0xff0000,
  roughness: 0.3,
  metalness: 0.1
});
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.castShadow = true;
ball.receiveShadow = true;
scene.add(ball);

// Ball physics body
const ballShape = new CANNON.Sphere(ballRadius);
const ballBody = new CANNON.Body({
  mass: 0.5,
  shape: ballShape,
  material: ballPhysicsMaterial,
  position: new CANNON.Vec3(
    Math.random() * 4 - 2,
    ballRadius+0.3,
    Math.random() * 4 - 2
  ),
  linearDamping: 0.01,
  angularDamping: 0.01,
  collisionFilterGroup: BALL_GROUP,
  collisionFilterMask: STATIC_GROUP | CHARACTER_GROUP
});
ballBody.velocity.set(
  (Math.random() - 0.5) * 3,
  Math.random() * 2 + 2,
  (Math.random() - 0.5) * 3
);
world.addBody(ballBody);

// Function to reset ball position
function resetBall() {
  ballBody.position.set(
    Math.random() * 4 - 2,
    ballRadius+0.3,
    Math.random() * 4 - 2
  );
  ballBody.velocity.set(
    (Math.random() - 0.5) * 3,
    Math.random() * 2 + 2,
    (Math.random() - 0.5) * 3
  );
  ballBody.angularVelocity.set(0, 0, 0);
}

// =================
// Shader Objects 
// =================
const shaderObjects = [];

const shaderMaterials = [
  new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        vec3 color = normalize(vNormal * 0.5 + 0.5);
        gl_FragColor = vec4(color.r, color.g * 0.6, color.b * 1.2, 1.0);
      }
    `
  }),
  new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      void main() {
        float d = length(vPosition);
        gl_FragColor = vec4(vec3(0.5 + 0.5 * cos(10.0 * d + vec3(0.0, 2.0, 4.0))), 1.0);
      }
    `
  }),
  new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      void main() {
        float r = 0.5 + 0.5 * sin(vUv.x * 10.0);
        float g = 0.5 + 0.5 * cos(vUv.y * 10.0);
        float b = 0.7 + 0.3 * sin((vUv.x + vUv.y) * 10.0);
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `
  })
];

const geo1 = new THREE.SphereGeometry(0.5, 64, 64);
const geo2 = new THREE.IcosahedronGeometry(0.6, 2);
const geo3 = new THREE.TorusKnotGeometry(0.4, 0.15, 160, 32);

const mesh1 = new THREE.Mesh(geo1, shaderMaterials[0]);
mesh1.position.set(1.5, 1.8+0.6, roomDepth/2-0.8);
scene.add(mesh1);

const mesh2 = new THREE.Mesh(geo2, shaderMaterials[1]);
mesh2.position.set(0, 1.8+0.7, roomDepth/2-0.8);
scene.add(mesh2);

const mesh3 = new THREE.Mesh(geo3, shaderMaterials[2]);
mesh3.position.set(-1.5, 1.8+0.8, roomDepth/2-0.8);
scene.add(mesh3);

shaderObjects.push(mesh1, mesh2, mesh3);

// Add physics for shader objects
const shaderShapes = [
  new CANNON.Sphere(0.5),
  new CANNON.Sphere(0.6),
  new CANNON.Cylinder(0.15, 0.15, 0.8, 8) // Approximate torus knot
];

const shaderBodies = [
  new CANNON.Body({
    mass: 0,
    shape: shaderShapes[0],
    material: groundMaterial,
    position: new CANNON.Vec3(1.5, 1.8+0.6, roomDepth/2-0.8),
    collisionFilterGroup: STATIC_GROUP,
    collisionFilterMask: BALL_GROUP
  }),
  new CANNON.Body({
    mass: 0,
    shape: shaderShapes[1],
    material: groundMaterial,
    position: new CANNON.Vec3(0, 1.8+0.7, roomDepth/2-0.8),
    collisionFilterGroup: STATIC_GROUP,
    collisionFilterMask: BALL_GROUP
  }),
  new CANNON.Body({
    mass: 0,
    shape: shaderShapes[2],
    material: groundMaterial,
    position: new CANNON.Vec3(-1.5, 1.8+0.8, roomDepth/2-0.8),
    collisionFilterGroup: STATIC_GROUP,
    collisionFilterMask: BALL_GROUP
  })
];

shaderBodies[2].quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI/2);
shaderBodies.forEach(body => world.addBody(body));
log("Shader objects initialized with physics");

// ========================
// VR Controller Lasers 
// ========================
function buildLaser(controller) {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -1)
  ]);
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const line = new THREE.Line(geometry, material);
  line.name = 'laser';
  line.scale.z = 5;
  controller.add(line.clone());
}
buildLaser(controller1);
buildLaser(controller2);

// ==============
// Media Control 
// ==============
const mediaControl = {
  isPlaying: false,
  musicEnabled: false,
  togglePlayPause: () => {
    if (mediaControl.isPlaying) {
      video.pause();
      log('Video paused');
      speakerSoundLeft.pause();
      speakerSoundRight.pause();

      if (m1Animations[1]) {
        if (m1CurrentAction !== m1Animations[1]) {
          m1CurrentAction.fadeOut(0.3);
        }
        m1CurrentAction = m1Animations[1];
        m1CurrentAction.reset().fadeIn(0.3).play();
      }

      mediaControl.isPlaying = false;
    } else {
      video.play();
      log('Video started');

      if (mediaControl.musicEnabled) {
        const audioCtx = THREE.AudioContext.getContext();
        if (audioCtx.state === 'suspended') {
          audioCtx.resume().then(() => {
            speakerSoundLeft.play();
            speakerSoundRight.play();
          });
        } else {
          speakerSoundLeft.play();
          speakerSoundRight.play();
        }
      }

      if (m1Animations[0]) {
        if (m1CurrentAction !== m1Animations[0]) {
          m1CurrentAction.fadeOut(0.3);
        }
        m1CurrentAction = m1Animations[0];
        m1CurrentAction.reset().fadeIn(0.3).play();
      }

      mediaControl.isPlaying = true;
    }
  },
  toggleMusic: (val) => {
    mediaControl.musicEnabled = val;

    if (val) {
      speakerFolder.show(); 
      log('Speaker control showed');
      const audioCtx = THREE.AudioContext.getContext();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().then(() => {
          if (mediaControl.isPlaying) {
            speakerSoundLeft.play();
            speakerSoundRight.play();
            log('Speaker started');
          }
        });
      } else {
        if (mediaControl.isPlaying) {
          speakerSoundLeft.play();
          speakerSoundRight.play();
          log('Speaker started');
        }
      }
    } else {
      speakerSoundLeft.pause();
      speakerSoundRight.pause();
      log('Speaker paused');
      speakerFolder.hide(); 
    }
  }
};

// ========
// GUI 
// ========
const gui = new GUI();

// Media Control Panel
const mediaFolder = gui.addFolder('Media Control');
mediaFolder.add(mediaControl, 'togglePlayPause').name('Video Play/Pause');
mediaFolder.add(mediaControl, 'musicEnabled').name('Music On/Off').onChange(mediaControl.toggleMusic);
mediaFolder.open();

// Speaker Control
const speakerControl = {
  leftEnabled: true,
  rightEnabled: true,
  leftVolume: 0.5,
  rightVolume: 0.5,
  leftDistance: 2,
  rightDistance: 2
};

const speakerFolder = gui.addFolder("Speaker Control");
speakerFolder.add(speakerControl, 'leftEnabled').name("Left Speaker On/Off").onChange(val => {
  if (speakerSoundLeft && speakerSoundLeft.isPlaying) {
    speakerSoundLeft.setVolume(val ? speakerControl.leftVolume : 0);
  }
});
speakerFolder.add(speakerControl, 'leftVolume', 0, 1, 0.01).onChange(val => {
  if (speakerSoundLeft && speakerControl.leftEnabled) {
    speakerSoundLeft.setVolume(val);
  }
});
speakerFolder.add(speakerControl, 'leftDistance', 0.1, 10, 0.1).onChange(val => {
  if (speakerSoundLeft) {
    speakerSoundLeft.setRefDistance(val);
  }
});
speakerFolder.add(speakerControl, 'rightEnabled').name("Right Speaker On/Off").onChange(val => {
  if (speakerSoundRight && speakerSoundRight.isPlaying) {
    speakerSoundRight.setVolume(val ? speakerControl.rightVolume : 0);
  }
});
speakerFolder.add(speakerControl, 'rightVolume', 0, 1, 0.01).onChange(val => {
  if (speakerSoundRight && speakerControl.rightEnabled) {
    speakerSoundRight.setVolume(val);
  }
});
speakerFolder.add(speakerControl, 'rightDistance', 0.1, 10, 0.1).onChange(val => {
  if (speakerSoundRight) {
    speakerSoundRight.setRefDistance(val);
  }
});
speakerFolder.hide(); 
log('Speaker control hidden');

// Lamp Settings
const lampSettings = { 
  enabled: true, 
  bulbIntensity: 1, 
  lightIntensity: 0.8 
};

const ambientFolder = gui.addFolder('Ambient Light');
ambientFolder.addColor({ color: lights.ambient.color.getHex() }, 'color').onChange(v => lights.ambient.color.set(v));
ambientFolder.add(lights.ambient, 'intensity', 0, 4, 0.1);

const directionalFolder = gui.addFolder('Directional Light');
directionalFolder.addColor({ color: lights.directional.color.getHex() }, 'color').onChange(v => lights.directional.color.set(v));
directionalFolder.add(lights.directional, 'intensity', 0, 2, 0.1);
directionalFolder.add(lights.directional.position, 'x', -10, 10, 0.1);
directionalFolder.add(lights.directional.position, 'y', 0, 10, 0.1);
directionalFolder.add(lights.directional.position, 'z', -10, 10, 0.1);

const lampFolder = gui.addFolder('Lamp(Point Light)');
lampFolder.add(lampSettings, 'enabled').name('On/Off').onChange(val => {
  lights.point.intensity = val ? lampSettings.lightIntensity : 0;
  bulbMat.emissiveIntensity = val ? lampSettings.bulbIntensity : 0.05;
});
lampFolder.addColor({ color: lights.point.color.getHex() }, 'color').onChange(v => {
  lights.point.color.set(v);
  bulbMat.color.set(v); 
  bulbMat.emissive.set(v);
});
lampFolder.add(lampSettings, 'lightIntensity', 0, 5, 0.1)
  .name('Light Intensity')
  .onChange(val => {
    if (lampSettings.enabled) {
      lights.point.intensity = val; 
      bulbMat.emissiveIntensity = val;  
    }
  });
lampFolder.add(lampGroup.position, 'x', -5, 5, 0.1).name('Lamp X');
lampFolder.add(lampGroup.position, 'y', 0, 5, 0.1).name('Lamp Y');
lampFolder.add(lampGroup.position, 'z', -5, 5, 0.1).name('Lamp Z');

ambientFolder.open();
directionalFolder.open();
lampFolder.open();

// Physics Settings
const physicsFolder = gui.addFolder('Ball Physics');
physicsFolder.add(world.gravity, 'y', -20, 0, 0.1).name('Gravity');
physicsFolder.add(ballContactMaterial, 'restitution', 0, 1, 0.05).name('Bounciness');
physicsFolder.add(ballContactMaterial, 'friction', 0, 1, 0.05).name('Friction');
physicsFolder.add({resetBall: resetBall}, 'resetBall').name('Reset Ball');
physicsFolder.open();

// ========================
// Window Resize 
// ========================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ========================
// Animation Loop
// ========================
const clock = new THREE.Clock();
let lastTime = 0;

function animate() {
  const time = performance.now();
  const deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  // Update physics
  world.step(1/60, deltaTime, 3);

  // Update ball position
  ball.position.copy(ballBody.position);
  ball.quaternion.copy(ballBody.quaternion);

  // Reset ball if it falls too far
  if (ball.position.y < -10) {
    resetBall();
  }

  // Update animations
  const delta = clock.getDelta();
  if (m1Mixer) m1Mixer.update(delta);
  if (m2Mixer) m2Mixer.update(delta);
  if (m3Mixer) m3Mixer.update(delta);

  // Character movement
  if (m1) {
    if (m1CurrentAction === m1Animations[0]) {
      m1.position.x += 0.02 * mDirection;
      if (m1.position.x > m1XStart + m1XRange || m1.position.x < m1XStart - m1XRange) {
        mDirection *= -1;
      }
      // Update physics body position to match visual
      if (characterBodies[0]) {
        characterBodies[0].position.x = m1.position.x;
      }
    }
  }

  // Update bulb and light position
  bulbMesh.getWorldPosition(lights.point.position);

  // Camera fly-in animation
  if (cameraFlying) {
    cameraLerpAlpha += 0.005;
    camera.position.lerpVectors(cameraStart, cameraEnd, cameraLerpAlpha);
    controls.target.set(0, 1.6, -5);
    controls.update();
    if (cameraLerpAlpha >= 1) cameraFlying = false;
  }

  // Rotate shader objects
  shaderObjects.forEach((obj, i) => {
    obj.rotation.x += 0.005;
    obj.rotation.y += 0.01;
    // Update physics body rotation to match visual
    if (shaderBodies[i]) {
      shaderBodies[i].quaternion.setFromEuler(
        obj.rotation.x,
        obj.rotation.y,
        obj.rotation.z
      );
    }
  });

  // Update controls and stats
  controls.update();
  stats.update();

  // Render scene
  renderer.render(scene, camera);

  // Handle VR rendering
  if (renderer.xr.isPresenting) {
    renderer.setAnimationLoop(animate);
  } else {
    requestAnimationFrame(animate);
  }
}

// =========
// Autoplay 
// =========
window.addEventListener('load', () => {
  setTimeout(() => {
    video.play();
    if (m1Animations[0]) {
      m1CurrentAction = m1Animations[0];
      m1CurrentAction.reset().fadeIn(0.3).play();
    }
    mediaControl.isPlaying = true;
  }, 500);
});

// ========================
// Start Application
// ========================
animate();