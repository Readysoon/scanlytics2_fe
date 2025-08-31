<script lang="ts">
	import * as THREE from 'three';
	import { onMount } from 'svelte';

	// Props - falls du die Lights von außen konfigurieren willst
	export let scene: THREE.Scene | null = null;

	let lights: THREE.Light[] = [];

	onMount(() => {
		if (!scene) return;

		// Ambient Light
		const ambientLight = new THREE.AmbientLight(0xffffff, 20);
		lights.push(ambientLight);

		// Directional Light
		const directionalLight1 = new THREE.DirectionalLight(0xF9C46B, 1.5);
		directionalLight1.position.set(4, 4, -4);
		lights.push(directionalLight1);

		// Spot Lights
		const spotLight1 = new THREE.SpotLight(0xA0D8F1, 4, 0, 0.4, 1);
		spotLight1.position.set(-3, 4, 5);
		lights.push(spotLight1);

		const spotLight2 = new THREE.SpotLight(0xFFB22C, 9, 0, 0.4, 1);
		spotLight2.position.set(-3, -2, 5);
		lights.push(spotLight2);

		// Point Light
		const pointLight = new THREE.PointLight(0xFA812F, 2);
		pointLight.position.set(1, 2, 3);
		lights.push(pointLight);

		// Additional Directional Light
		const directionalLight2 = new THREE.DirectionalLight(0xe87a2c);
		lights.push(directionalLight2);

		// Additional Spot Light
		const spotLight3 = new THREE.SpotLight(0xA0D8F1);
		lights.push(spotLight3);

		// Add all lights to scene
		lights.forEach(light => scene.add(light));

		// Cleanup function
		return () => {
			lights.forEach(light => scene.remove(light));
			lights = [];
		};
	});
</script>

<!-- Svelte components don't need to render anything for logic-only components -->
<!-- This component just adds lights to the passed scene -->