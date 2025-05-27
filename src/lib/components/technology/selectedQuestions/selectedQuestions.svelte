<script lang="ts" module>
	import { Parts } from "openai/resources/uploads/parts";


    let selectedQuestions = $state([])
    let questionArray: number[] = $state([])
    export function handleSelectedQuestions(itemArray: any){
        
        selectedQuestions = itemArray
        console.log('selectedQuestions', selectedQuestions[0]);

        console.log('selectedQuestions', selectedQuestions);

        // if(selectedQuestions.length > 0){
        //     for(const item in selectedQuestions){
                
        //         questionArray.push(parseInt(item))
        //     }
        // }
    }
    // selectedQuestions = [0,1,2,3,4]   

</script>


<div class="selectedQuestions">

   
    {#each selectedQuestions as item, index (item)}
   
        <!-- <p>{item}</p> -->
        
        <div class="questionNumber"
        style="background-color: {selectedQuestions[0] == item? 'rgba(18, 120, 230, 0.751)' : 'rgba(211, 211, 235, 0.105)'} "
        >
            <p>{index}</p>
        </div>
        
    
    {/each}
    
</div>

<style>
    .selectedQuestions{
        display: flex;
        flex-direction: column;
        gap: 50px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* justify-content: center; */
        padding-top: 45%;
        /* padding-bottom: 100px; */
        
        /* background-color: green; */
    }

    .questionNumber{
        background: rgba(18, 120, 230, 0.751);
	/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
        height: 4%;
        width: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 10px;
        font-family: system-ui;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.175);
        cursor: pointer;
    }

</style>


