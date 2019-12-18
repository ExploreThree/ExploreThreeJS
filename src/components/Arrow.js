import * as THREE from "three";


export default class Arrow {
    constructor({tail_vector = new THREE.Vector3( 0, 0, 0 ),head_vector = new THREE.Vector3( 0, 1, 0 )}= {}){
    this.head_vector = head_vector;
    this.tail_vector = tail_vector;
    
  }

  //Not sure how much of this processing should be in the constructor, this works for now
  //Not using head or tail info yet
  mesh(){
    let cylinderDetail = 1000;

    const geometry = new THREE.CylinderGeometry(1, 1, 10, cylinderDetail);

    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      emissive: 0x072534,
       side: THREE.DoubleSide,
      flatShading: true
    });

    return new THREE.Mesh(geometry,material);
  }
}

