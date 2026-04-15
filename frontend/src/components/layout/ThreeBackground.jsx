import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x61f0d1,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const torus = new THREE.Mesh(
      new THREE.TorusKnotGeometry(4.2, 1.1, 180, 24),
      wireMaterial
    );
    group.add(torus);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 48;
      positions[i + 1] = (Math.random() - 0.5) * 36;
      positions[i + 2] = (Math.random() - 0.5) * 28;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: 0x7a7dff,
        size: 0.08,
        transparent: true,
        opacity: 0.8,
      })
    );
    scene.add(particles);

    const ambient = new THREE.AmbientLight(0x88ccff, 1.1);
    scene.add(ambient);

    let mouseX = 0;
    let mouseY = 0;

    function handleMouseMove(event) {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 1.3;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 1.3;
    }

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let frameId = 0;
    function animate() {
      frameId = requestAnimationFrame(animate);
      torus.rotation.x += 0.002;
      torus.rotation.y += 0.003;
      group.rotation.x += (mouseY - group.rotation.x) * 0.02;
      group.rotation.y += (mouseX - group.rotation.y) * 0.02;
      particles.rotation.y += 0.0008;
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      torus.geometry.dispose();
      wireMaterial.dispose();
      particlesGeometry.dispose();
      particles.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-background" aria-hidden="true" />;
}
