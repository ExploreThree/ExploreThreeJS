import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Arrow from "./components/Arrow";

const style = {
  height: 800 // we can control scene size by setting container dimensions
};

class App extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 10; // is used here to set some distance from a cube that is located at z = 0
    // this.camera.position.x = 10; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.el);
    this.renderer = new THREE.WebGLRenderer({antialias:true});
    // this.renderer = new THREE.WebGLRenderer({});
    this.renderer.setClearColor("#FFFFFF");
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {

    // let cylinderDetail = 1000;

    // const geometry = new THREE.CylinderGeometry(1, 1, 10, cylinderDetail);
    // // const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshPhongMaterial({
    //   color: 0x00ff00,
    //   emissive: 0x072534,
    //    side: THREE.DoubleSide,
    //   flatShading: true
    // });
    // this.arrow = new THREE.Mesh(geometry,material);
    // this.scene.add(this.arrow);

    this.arrow = new Arrow().mesh();
    this.scene.add(this.arrow);
   
    // this.cube = new THREE.Mesh(geometry, material);
    // this.cube.translateX(3);

    // this.scene.add(this.cube);

    // var heartShape = new THREE.Shape();

    // heartShape.moveTo( 25, 25);
    
    // heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
    // heartShape.bezierCurveTo( -30, 0, -30, 35,-30,35 );
    // heartShape.bezierCurveTo( -30, 55, -10, 77, 25, 95 );
    // heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
    // heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
    // heartShape.bezierCurveTo( 35, 0, 0, 25, 25, 25 );

    // var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 8, bevelSize: 1, bevelThickness: 1 };

    // let heartGeometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

    // this.heart = new THREE.Mesh(heartGeometry,new THREE.MeshPhongMaterial({color: 0xff0000}));
    // this.scene.add(this.heart);


    // var material = new THREE.LineBasicMaterial( { color: 0x000000 } );
    // var material = new THREE.LineDashedMaterial( {
    //   color: 0x000000,
    //   linewidth: 1,
    //   scale: 1,
    //   dashSize: 1.5,
    //   gapSize: 2,
    // } );

    // var geometry = new THREE.Geometry();
    // geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
    // geometry.vertices.push(new THREE.Vector3( 0, 10, 5) );
    // geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
    // geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );

    // this.line = new THREE.Line( geometry, material );
    // this.line.computeLineDistances();
    // // this.line.width = 50;
 

    // this.scene.add(label);

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

  render() {
    return <div style={style} ref={ref => (this.el = ref)} />;
  }
}

class Container extends React.Component {
  state = { isMounted: true };

  render() {
    const { isMounted = true } = this.state;
    return (
      <>
        <button
          onClick={() =>
            this.setState(state => ({ isMounted: !state.isMounted }))
          }
        >
          {isMounted ? "Unmount" : "Mount"}
        </button>
        {isMounted && <App />}
        {isMounted && <div>Scroll to zoom, drag to rotate</div>}
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);



export default App;
