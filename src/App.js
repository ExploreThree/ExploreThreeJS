import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "./controls/DragControls";
import Arrow from "./components/Arrow";


class App extends Component {
  constructor(props){
    super(props);

    this.sceneSetup = this.sceneSetup.bind(this);

    this.sceneSetup();

    this.objects = [];
    
  }
  componentDidMount() {
    this.controlAndRenderSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    // this.controls.dispose();
    this.dragContols.dispose();
    this.renderer.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing

    this.scene = new THREE.Scene();
    
  }

    controlAndRenderSetup = () => {

    this.width = this.el.clientWidth;
    this.height = this.el.clientHeight;
    //   this.camera = new THREE.PerspectiveCamera(
    //   75, // fov = field of view
    //   width / height, // aspect ratio
    //   0.1, // near plane
    //   1000 // far plane
    // );
    this.aspectRatio = this.width/this.height;
    this.viewSize = .05;
    this.camera = new THREE.OrthographicCamera(
      -this.width*this.viewSize / 2, //left
      this.width*this.viewSize / 2, //right
      // -this.aspectRatio*this.viewSize / 2, //left
      // this.aspectRatio*this.viewSize / 2, //right
      this.height*this.viewSize / 2, //top
      -this.height*this.viewSize / 2, //bottom
      -1000, //near
      1000 //far
    );
    this.camera.zoom = 1;
    this.camera.position.z = 10; // is used here to set some distance from a cube that is located at z = 0
    // this.camera.aspect = this.width / this.height;

    // this.camera.position.x = 10; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    // this.controls = new OrbitControls(this.camera, this.el);
    this.dragContols = new DragControls( this.objects, this.camera, this.el );
    // this.dragContols.set()

    this.renderer = new THREE.WebGLRenderer({antialias:true});
    // this.renderer = new THREE.WebGLRenderer({});
    this.renderer.setClearColor("#FFFFFF");
    this.renderer.setSize(this.width, this.height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  addCustomSceneObjects = () => {

    // this.arrow = new Arrow().mesh();
    // this.scene.add(this.arrow);

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
    

    this.width = this.el.clientWidth;
    this.height = this.el.clientHeight;
    
    this.camera.left = -this.width*this.viewSize / 2; 
    this.camera.right = this.width*this.viewSize / 2; 
    this.camera.top = this.height*this.viewSize / 2;
    this.camera.bottom = -this.height*this.viewSize / 2;
    
    // this.camera.aspect = this.width / this.height;
    

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);

    this.forceUpdate();
  };

  render() {

//     var w = window.innerWidth
// || document.documentElement.clientWidth
// || document.body.clientWidth;

// var h = window.innerHeight
// || document.documentElement.clientHeight
// || document.body.clientHeight;
    // console.log(`${w} x ${h}` );
    

    let width = window.innerWidth;
    let height = window.innerHeight;
    let style = {width:width,height: height,borderStyle:"solid",borderColor:"red"}

    return <div style={style} ref={ref => (this.el = ref)} >
      <Arrow scene={this.scene} objects={this.objects} />
      </div>;
  }
}

class Container extends React.Component {
  state = { isMounted: true };

  render() {
    const { isMounted = true } = this.state;
    return (
      <React.Fragment>
        <button
          onClick={() =>
            this.setState(state => ({ isMounted: !state.isMounted }))
          }
        >
          {isMounted ? "Unmount" : "Mount"}
        </button>
        {isMounted && <App />}
        {isMounted && <div>Scroll to zoom, drag to rotate</div>}
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);



export default App;
