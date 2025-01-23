<script>
    export let text = '';
  </script>
  
  <div class="text-editor">
    <textarea bind:value={text}></textarea>
  </div>
  
  <style>
    .text-editor {
      padding: 10px;
    }
    textarea {
      width: 100%;
      height: 300px;
    }
  </style>
  