<script>
  import MonsterList from "$lib/store/monsters";

  export let name;
  export let preset = false;
  export let pre_value;
  export let delete_tag;
  export let selected = false;
  export let deletable = true;
  $: positive = preset ? pre_value : $MonsterList.positive_tags.has(name);

</script>
<div class="flex my-1 rounded p-1 {positive ? 'bg-green-200' : 'bg-red-200'} {selected ? 'border-amber-300 border-2': '' }">
  <div class="mr-1" on:click={()=> !preset ? MonsterList.add_tag(name, positive ? "negative": "positive") : {}}>
    {name}
  </div>
  {#if deletable}
  <div class="rounded h-4 w-4" on:click={()=> delete_tag()}>
    X
  </div>
  {/if}
</div>
