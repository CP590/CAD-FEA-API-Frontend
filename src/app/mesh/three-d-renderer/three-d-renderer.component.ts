import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-three-d-renderer',
  imports: [],
  templateUrl: './three-d-renderer.component.html',
  styleUrl: './three-d-renderer.component.css'
})
export class ThreeDRendererComponent implements AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;

  ngAfterViewInit() {
    this.initThreeJS();
  }

  private initThreeJS() {
      const width = window.innerWidth;
      const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeeeeee);

    const aspect = width / height;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true});
    this.renderer.setSize(width/2, height/2);
    console.log('Canvas dimensions:', this.renderer.domElement.width, this.renderer.domElement.height);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1,1,1).normalize();
    this.scene.add(light);

    const loader = new STLLoader();
    loader.load('/assets/beam.stl', (geometry: any) => {
      const material = new THREE.MeshStandardMaterial({ color: 0x0077ff});
      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
      });

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    this.renderer.setAnimationLoop(animate);
  }
}
