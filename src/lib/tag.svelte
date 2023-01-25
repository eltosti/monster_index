<script>
  import MonsterList from "$lib/store/monsters";

  export let name;
  export let preset = false
  export let pre_value;
  export let delete_tag;
  $: positive = preset ? pre_value : $MonsterList.positive_tags.has(name);

</script>
<div class="flex my-1 rounded p-1 {positive ? 'bg-green-200' : 'bg-red-200'}"  >
  <div class="mr-1" on:click={()=> !preset ? MonsterList.add_tag(name, positive ? "negative": "positive") : {}}>
    {name}
  </div>
  <div class="rounded h-4 w-4" on:click={()=> delete_tag()}>
    X
  </div>
</div>
