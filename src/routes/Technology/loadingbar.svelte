


<script lang="ts" module >
 
 
 
 let barwidth = $state(0);
 let progress: any | undefined;



 const addColor = () => {
    if(barwidth < 100){
        barwidth +=1;
    }else{
        clearInterval(progress)

    }
 }




export function handleprogressbar(){
    console.log('trigger');
    progress = setInterval(addColor, 10)
    console.log('obj', typeof progress);
 }



</script>

{#if barwidth !=0}
<div id="progressbar">
    <div id="myBar" style="width: {barwidth}%">  </div>
    <!-- <button on:click={handleprogressbar}>add</button> -->
    
</div>
{:else}
     <div class="placeholderObjecttext">Text Editor</div>

{/if}


<style>

#progressbar{
    width: 50%;
    height: 10px;
    background-color: grey;
    border-radius: 50px;
}

#myBar{
    width: 0%;
    height: 100%;
    background-color: rgb(0, 17, 255);
    border-radius: 50px;
}
.placeholderObjecttext {
		font-size: 25px;
		font-weight: bold;
		font-family: sans-serif;
		color: rgba(0, 0, 0, 0.403);
	}

</style>