import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-three-d-renderer',
  imports: [],
  templateUrl: './three-d-renderer.component.html',
  styleUrl: './three-d-renderer.component.css'
})
export class ThreeDRendererComponent implements AfterViewInit, OnDestroy {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationId: number | null = null;

  ngAfterViewInit() {
    this.initThreeJS();
  }

  private initThreeJS() {
      const width = window.innerWidth;
      const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeeeeee);

    const aspect = width / height;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 100, 10000);

    this.renderer = new THREE.WebGLRenderer({ antialias: true});
    this.renderer.setSize(width / 2, height / 2);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1,1,1).normalize();
    this.scene.add(light);

    const loader = new STLLoader();
    loader.load('/assets/beam.stl', (geometry: any) => {
      const material = new THREE.MeshStandardMaterial({ color: 0x0077ff});
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.y = Math.PI;
      mesh.rotation.z = Math.PI / 2;
      const boundingBox = new THREE.Box3().setFromObject(mesh);
      const size = new THREE.Vector3();
      boundingBox.getSize(size);
      console.log(size);
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);
      console.log(center);
      this.camera.position.set(center.x, center.y, center.z + 600);
      this.scene.add(mesh);
      });


    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(400, 0, 0);

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    this.renderer.setAnimationLoop(animate);
  }

  private destroyThreeJS() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss(); // Release the WebGL context
      const container = this.rendererContainer.nativeElement;
      container.removeChild(this.renderer.domElement);
    }

    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
    this.scene.clear();
  }

  ngOnDestroy() {
    this.destroyThreeJS();
  }
}
