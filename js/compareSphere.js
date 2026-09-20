import * as THREE from "three";

const AUTO_ROTATE_SPEED = 0.14;
const DRAG_SENSITIVITY = 0.012;
const DAMPING = 0.94;

export class SpinnablePlanet {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
    this.camera.position.set(0, 0, 4);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(2.5, 2, 3.5);
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.25);
    rim.position.set(-2, -1, -2);
    this.scene.add(rim);

    this.geometry = new THREE.SphereGeometry(1, 48, 48);
    this.material = new THREE.MeshStandardMaterial({ roughness: 0.85, metalness: 0.05 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    this.textureLoader = new THREE.TextureLoader();
    this._loadedTexturePath = null;

    this._dragging = false;
    this._velocityY = 0;
    this._lastX = 0;
    this._lastY = 0;
    this._raf = null;
    this._lastTime = performance.now();
    this._loopBound = this._loop.bind(this);

    this._bindPointerEvents();
    this.canvas.style.cursor = "grab";
  }

  _bindPointerEvents() {
    const onMove = (e) => {
      if (!this._dragging) return;
      const dx = e.clientX - this._lastX;
      const dy = e.clientY - this._lastY;
      this._lastX = e.clientX;
      this._lastY = e.clientY;
      this.mesh.rotation.y += dx * DRAG_SENSITIVITY;
      this.mesh.rotation.x = THREE.MathUtils.clamp(this.mesh.rotation.x + dy * DRAG_SENSITIVITY, -1.1, 1.1);
      this._velocityY = dx * DRAG_SENSITIVITY;
    };
    const onUp = (e) => {
      this._dragging = false;
      this.canvas.style.cursor = "grab";
      try {
        this.canvas.releasePointerCapture(e.pointerId);
      } catch (err) {
      }
    };

    this.canvas.addEventListener("pointerdown", (e) => {
      this._dragging = true;
      this._lastX = e.clientX;
      this._lastY = e.clientY;
      this._velocityY = 0;
      this.canvas.style.cursor = "grabbing";
      try {
        this.canvas.setPointerCapture(e.pointerId);
      } catch (err) {
      }
    });
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    this._onMove = onMove;
    this._onUp = onUp;
  }

  setSizePx(px) {
    const size = Math.max(Math.round(px), 1);
    this.renderer.setSize(size, size);
  }

  setPlanet(data) {
    if (data.photo && this._loadedTexturePath !== data.photo) {
      this._loadedTexturePath = data.photo;
      this.textureLoader.load(
        data.photo,
        (tex) => {
          if (this._loadedTexturePath !== data.photo) return;
          if ("colorSpace" in tex) tex.colorSpace = THREE.SRGBColorSpace;
          this.material.map = tex;
          this.material.color.set(0xffffff);
          this.material.needsUpdate = true;
        },
        undefined,
        () => {
          if (this._loadedTexturePath !== data.photo) return;
          this.material.map = null;
          this.material.color.set(data.baseColorHex);
          this.material.needsUpdate = true;
        }
      );
    } else if (!data.photo) {
      this._loadedTexturePath = null;
      this.material.map = null;
      this.material.color.set(data.baseColorHex);
      this.material.needsUpdate = true;
    }
    this.mesh.rotation.set(0.1, -0.3, 0);
    this._velocityY = 0;
  }

  start() {
    if (this._raf) return;
    this._lastTime = performance.now();
    this._loop();
  }

  stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }

  _loop() {
    this._raf = requestAnimationFrame(this._loopBound);
    const now = performance.now();
    const delta = (now - this._lastTime) / 1000;
    this._lastTime = now;

    if (!this._dragging) {
      this._velocityY *= DAMPING;
      const spin = Math.abs(this._velocityY) > 0.0004 ? this._velocityY : AUTO_ROTATE_SPEED * delta;
      this.mesh.rotation.y += spin;
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.stop();
    window.removeEventListener("pointermove", this._onMove);
    window.removeEventListener("pointerup", this._onUp);
    this.geometry.dispose();
    this.material.dispose();
    if (this.material.map) this.material.map.dispose();
    this.renderer.dispose();
  }
}
