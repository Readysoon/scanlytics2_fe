<script>
	import { T, useTask } from '@threlte/core';
	import { interactivity, OrbitControls } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	interactivity();
	const scale = new Spring(3);

	let rotation = 0;
	useTask((delta) => {
		rotation += delta;
	});
   
    const cubeSize = 5
	const pointsPerAxis = 10

	const positions = []

	const radius = cubeSize / 3

for (let x = 0; x < pointsPerAxis; x++) {
	for (let y = 0; y < pointsPerAxis; y++) {
		for (let z = 0; z < pointsPerAxis; z++) {
			const fx = (x / (pointsPerAxis - 5) - 0.5) * cubeSize
			const fy = (y / (pointsPerAxis - 5) - 0.5) * cubeSize
			const fz = (z / (pointsPerAxis - 5) - 0.4) * cubeSize

			const distance = Math.sqrt(fx * fx + fy * fy + fz * fz)

			if (distance <= radius) {
				positions.push(fx, fy, fz)
			}
		}
	}
}

	const position= new Float32Array(positions)
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 9, 5]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
>
<OrbitControls autoRotate />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} castShadow />


<T.Points>
	<T.BufferGeometry>
		<T.BufferAttribute
			args={[position, 3]}
			attach={({ parent, ref }) => {
				parent.setAttribute('position', ref);
				return () => {
					// cleanup function called when ref changes or the component unmounts
					// https://threlte.xyz/docs/reference/core/t#attach
				};
			}}
		/>
	</T.BufferGeometry>
	<T.PointsMaterial
		size={0.65}
		color={0xff6d2d}
		sizeAttenuation={true}
		transparent={true}
		alphaTest={0.5}
		map={new THREE.TextureLoader().load('/textures/circle.png')}
	/>
</T.Points>

<!-- <T.Mesh
  rotation.y={rotation}
  position.y={1}
  scale={scale.current}
  onpointerenter={() => {
    scale.target = 1.5
  }}
  onpointerleave={() => {
    scale.target = 1
  }}
   castShadow
>
    <T.BoxGeometry args={[1, 2, 2]} />
    <T.MeshStandardMaterial color="blue" />
</T.Mesh> -->

<!-- <T.Mesh
  rotation.x={-Math.PI / 2}
  receiveShadow
>
  <T.CircleGeometry args={[4, 40]} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh> -->
