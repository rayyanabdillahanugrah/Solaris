import * as THREE from "three";

const RING_COLORS = {
  saturn: 0xd9c48a,
  uranus: 0x9fd8d0,
};

export class MiniPlanetViewer {
  constructor(canvas, data) {
    this.canvas = canvas;
    this.data = data;
    this.disposed = false;
    this.dragging = false;
    this.rotationY = Math.random() * Math.PI * 2;
    this.autoRotateSpeed = 0.22;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    this.camera.position.set(0, 0, 4.3);

    const isStar = data.kind === "star";

    this.scene.add(new THREE.AmbientLight(0xffffff, isStar ? 1 : 0.6));
    if (!isStar) {
      const key = new THREE.DirectionalLight(0xffffff, 1.15);
      key.position.set(3, 2.2, 4);
      this.scene.add(key);
      const rim = new THREE.DirectionalLight(0xffffff, 0.25);
      rim.position.set(-3, -1, -2);
      this.scene.add(rim);
    }

    const geometry = new THREE.SphereGeometry(1.35, 48, 48);
    this.material = new THREE.MeshStandardMaterial({
      color: data.color,
      roughness: 0.85,
      metalness: 0.05,
      emissive: isStar ? new THREE.Color(data.color) : 0x000000,
      emissiveIntensity: isStar ? 0.5 : 0,
    });
    this.sphere = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.sphere);

    if (data.hasRings) this._buildRings(data.id);

    this._bindDrag();
    this.resize();

    this.clock = new THREE.Clock();
    this._boundAnimate = this._animate.bind(this);
    this._rafId = requestAnimationFrame(this._boundAnimate);
  }

  _buildRings(id) {
    const inner = 1.35 * 1.4;
    const outer = 1.35 * (id === "saturn" ? 2.15 : 1.65);
    const geometry = new THREE.RingGeometry(inner, outer, 64);

    const pos = geometry.attributes.position;
    const v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      geometry.attributes.uv.setXY(i, v3.length() < (inner + outer) / 2 ? 0 : 1, 1);
    }

    const material = new THREE.MeshStandardMaterial({
      color: RING_COLORS[id] || 0xd9c48a,
      roughness: 0.9,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    this.ring = new THREE.Mesh(geometry, material);
    this.ring.rotation.x = Math.PI / 2 + THREE.MathUtils.degToRad(id === "uranus" ? 8 : -18);
    this.sphere.add(this.ring);
  }

  _bindDrag() {
    let lastX = 0;
    const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    this._onDown = (e) => {
      this.dragging = true;
      lastX = getX(e);
      this.canvas.style.cursor = "grabbing";
    };
    this._onMove = (e) => {
      if (!this.dragging) return;
      const x = getX(e);
      this.rotationY += (x - lastX) * 0.012;
      lastX = x;
    };
    this._onUp = () => {
      this.dragging = false;
      this.canvas.style.cursor = "grab";
    };

    this.canvas.style.cursor = "grab";
    this.canvas.style.touchAction = "none";
    this.canvas.addEventListener("pointerdown", this._onDown);
    window.addEventListener("pointermove", this._onMove);
    window.addEventListener("pointerup", this._onUp);
  }

  resize() {
    const size = Math.max(this.canvas.clientWidth, 1);
    this.renderer.setSize(size, size, false);
  }

  _animate() {
    if (this.disposed) return;
    const delta = this.clock.getDelta();
    if (!this.dragging) this.rotationY += this.autoRotateSpeed * delta;
    this.sphere.rotation.y = this.rotationY;
    this.renderer.render(this.scene, this.camera);
    this._rafId = requestAnimationFrame(this._boundAnimate);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this._rafId);
    this.canvas.removeEventListener("pointerdown", this._onDown);
    window.removeEventListener("pointermove", this._onMove);
    window.removeEventListener("pointerup", this._onUp);
    this.sphere.geometry.dispose();
    this.material.dispose();
    if (this.ring) {
      this.ring.geometry.dispose();
      this.ring.material.dispose();
    }
    this.renderer.dispose();
  }
}
