import * as THREE from "three";
import {Component} from "react";



export default class Arrow extends Component {
  constructor (props) {
    super(props);
    this.head_vector = new THREE.Vector3( 0, 1, 0 );
    this.tail_vector= new THREE.Vector3( 0, 0, 0 );

    let cylinderDetail = 1000;

    const geometry = new THREE.CylinderGeometry(1, 1, 10, cylinderDetail);

    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      emissive: 0x072534,
       side: THREE.DoubleSide,
      flatShading: true
    });
    console.log(props);
    

    props.scene.add(new THREE.Mesh(geometry,material));
  }

  render(){
    return null;
  }
}

