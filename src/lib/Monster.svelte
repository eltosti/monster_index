<script>
  import MonsterList from "$lib/store/monsters";
  import Tag from "$lib/tag.svelte";


  $: monster = $MonsterList.selected;

</script>

<div>
  {#if monster.tags}
    <p class="text-lg font-bold uppercase">{monster.name}</p>
    <p class="text-lg  capitalize">{monster.description ? "description:" : ""} {monster.description}</p>
    <div class="flex">
      {#if monster.tags}
        {#each monster.tags as tags}
          <div>
            <Tag name={tags} deletable={false} preset={true} pre_value={true}
                 selected={$MonsterList.positive_tags.has(tags)} />
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>
