import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {ApiService} from '../../api.service';

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

  nodeData: any;
  elementData: any;

  constructor(private apiService: ApiService) {
  }

 renderMesh() {
    if (!this.nodeData || !this.elementData) {
      console.error('Mesh data is missing');
      return;
    }

    const geometry = new THREE.BufferGeometry();
    const nodeArray = Object.values(this.nodeData);
   console.log("Node Data Type:", typeof this.nodeData);
   console.log("Node Data Keys:", Object.keys(this.nodeData));
   console.log("Node Data Values:", Object.values(this.nodeData));

    const vertices = new Float32Array(this.nodeData);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const indices = new Uint16Array(this.elementData);
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    const wireframe = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const meshLines = new THREE.LineSegments(wireframe, material);
    meshLines.rotation.x = Math.PI / 2;
    meshLines.rotation.z = Math.PI / 2;

    this.scene.add(meshLines);
 }


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

    this.apiService.getMeshData().subscribe(
    (response) => {
      console.log('API Response Received:', response);
      if (response  && response.node_list && response.element_list) {
        console.log('Mesh data response found')
        this.nodeData = response.node_list;
        this.elementData = response.element_list;
        console.log(this.nodeData)

        this.renderMesh()
      }
    },
      (error) => {
        console.error('Error fetching message: ', error);
      }
    );

    this.apiService.getSTLFile().subscribe({
      next: (blob) => {
        const loader = new STLLoader();
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const geometry = loader.parse(arrayBuffer);

          const material = new THREE.MeshStandardMaterial({ color: 0x0077ff});
          const mesh = new THREE.Mesh(geometry, material);
          mesh.rotation.x = Math.PI / 2;
          mesh.rotation.z = Math.PI / 2;
          const boundingBox = new THREE.Box3().setFromObject(mesh);
          const size = new THREE.Vector3();
          boundingBox.getSize(size);
          //console.log(size);
          const center = new THREE.Vector3();
          boundingBox.getCenter(center);
          //console.log(center);
          this.camera.position.set(center.x, center.y, center.z + 600);
          this.scene.add(mesh);
        };

        reader.readAsArrayBuffer(blob);
      },
      error: (err) => {
        console.error('Failed to load STL file: ', err);
      },
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
