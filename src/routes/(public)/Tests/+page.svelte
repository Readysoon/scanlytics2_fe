


<script>
     import { Canvas } from '@threlte/core'
     import Scene from '$lib/components/technology/threlte/scene.svelte';


</script>
<main>
     <div class="contentSection">
        <div class="middleSection">
                <Canvas>
                    <Scene/>
                </Canvas>
        </div>

     </div>
</main>

<style>
    .contentSection{
        background-color: rgb(0, 0, 0);
        width: 100%;
        height: 100vh;

        .middleSection{
            height: 50%;
            width: 50%;
            background-color: rgb(0, 0, 0);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

        }

    }
</style>