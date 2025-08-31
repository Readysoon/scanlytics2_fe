<script lang="ts">
	import * as THREE from 'three';
	import { onMount, onDestroy } from 'svelte';

	// Import shader files
	import vertexPars from '../shader/vertex_pars.glsl';
	import vertexMain from '../shader/vertex_main.glsl';
	import fragmentPars from '../shader/fragment_pars.glsl';
	import fragmentMain from '../shader/fragment_main.glsl';

	export let innerWidth: number = 0;
	export let innerHeight: number = 0;

	let canvas: HTMLCanvasElement;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let mesh: THREE.Mesh;
	let material: THREE.MeshPhysicalMaterial;
	let shader: any;
	let animationId: number;
	let clock = new THREE.Clock();

	$: isMobile = innerWidth <= 768;
	$: isTablet = innerWidth <= 1024;

	onMount(() => {
		// Scene setup
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
		camera.position.set(0, 0, 10);

		renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
		renderer.setSize(innerWidth, innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Add lights
		setupLights();

		// Add animated sphere
		setupAnimatedSphere();

		// Start animation
		animate();

		// Handle resize
		function handleResize() {
			camera.aspect = innerWidth / innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(innerWidth, innerHeight);
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	function setupLights() {
		// Ambient Light
		const ambientLight = new THREE.AmbientLight(0xffffff, 20);
		scene.add(ambientLight);

		// Directional Light
		const directionalLight1 = new THREE.DirectionalLight(0xF9C46B, 1.5);
		directionalLight1.position.set(4, 4, -4);
		scene.add(directionalLight1);

		// Spot Lights
		const spotLight1 = new THREE.SpotLight(0xA0D8F1, 4, 0, 0.4, 1);
		spotLight1.position.set(-3, 4, 5);
		scene.add(spotLight1);

		const spotLight2 = new THREE.SpotLight(0xFFB22C, 9, 0, 0.4, 1);
		spotLight2.position.set(-3, -2, 5);
		scene.add(spotLight2);

		// Point Light
		const pointLight = new THREE.PointLight(0xFA812F, 2);
		pointLight.position.set(1, 2, 3);
		scene.add(pointLight);

		// Additional lights
		const directionalLight2 = new THREE.DirectionalLight(0xe87a2c);
		scene.add(directionalLight2);

		const spotLight3 = new THREE.SpotLight(0xA0D8F1);
		scene.add(spotLight3);
	}

	function setupAnimatedSphere() {
		// Create geometry
		const geometry = new THREE.IcosahedronGeometry(2, 100);

		// Create material
		material = new THREE.MeshPhysicalMaterial({
			metalness: 1,
			roughness: 1,
			transmission: 1,
			thickness: 1
		});

		// Shader modification
		material.onBeforeCompile = (shaderObject) => {
			shader = shaderObject;
			shader.uniforms.uTime = { value: 0 };

			// Vertex shader modifications
			const parsVertexString = `#include <displacementmap_pars_vertex>`;
			shader.vertexShader = shader.vertexShader.replace(
				parsVertexString,
				parsVertexString + '\n' + vertexPars
			);

			const mainVertexString = `#include <displacementmap_vertex>`;
			shader.vertexShader = shader.vertexShader.replace(
				mainVertexString,
				mainVertexString + '\n' + vertexMain
			);

			// Fragment shader modifications
			const parsFragmentString = `#include <bumpmap_pars_fragment>`;
			shader.fragmentShader = shader.fragmentShader.replace(
				parsFragmentString,
				parsFragmentString + '\n' + fragmentPars
			);

			const mainFragmentString = `#include <normal_fragment_maps>`;
			shader.fragmentShader = shader.fragmentShader.replace(
				mainFragmentString,
				mainFragmentString + '\n' + fragmentMain
			);
		};

		// Create mesh
		mesh = new THREE.Mesh(geometry, material);

		// Create group for positioning/scaling
		const group = new THREE.Group();
		group.scale.setScalar(isMobile ? 0.7 : 1);
		group.position.set(0, 0, 0);
		group.rotation.set(-5, -10, 0);

		group.add(mesh);
		scene.add(group);

		console.log('Animated sphere added to scene');
	}

	function animate() {
		const elapsedTime = clock.getElapsedTime();

		// Update shader uniforms
		if (shader) {
			shader.uniforms.uTime.value = elapsedTime * 0.1;
		}

		// Rotate mesh
		if (mesh) {
			mesh.rotation.y = elapsedTime * 0.2;
		}

		renderer.render(scene, camera);
		animationId = requestAnimationFrame(animate);
	}

	// Reactive updates
	$: if (mesh && isMobile !== undefined) {
		const group = mesh.parent;
		if (group) {
			group.scale.setScalar(isMobile ? 0.7 : 1);
		}
	}

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
		if (renderer) {
			renderer.dispose();
		}
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<canvas bind:this={canvas} class="hero-canvas"></canvas>

<style>
    .hero-canvas {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>