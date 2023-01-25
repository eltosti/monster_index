<script>
  import Svelecte from "svelecte";

  import { Button, TextInput } from "@specialdoom/proi-ui";
  import { onMount } from "svelte";
  import MonsterList from "$lib/store/monsters";
  import Tag from "$lib/tag.svelte";

  onMount(async () => {
    let test = await fetch("https://monsterindex.duckdns.org/api/monsters");
    let data = await test.json();
    MonsterList.set_monsters(await data);
  });

  $: filter_tags = [...$MonsterList.positive_tags].concat([...$MonsterList.negative_tags]);

  let value = "";
  let selection = null;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Monster filter demo app" />
</svelte:head>


<section class="flex h-screen justify-center overflow-y-hidden p-5">
  <div class="w-3/5 grid grid-cols-5 gap-2">
    <div class="col-span-2">
      <div class=" my-1 min-w-select">
        <TextInput placeholder="name regex" on:change={e => MonsterList.update_name_search(e.target.value)}/>
      </div>
      <div class="my-1 min-w-select">

        <TextInput placeholder="description regex" on:change={e => MonsterList.update_desc_search(e.target.value)}/>
      </div>
      <div class="flex gap-0.5">
        <form class="grow" on:submit|preventDefault={()=>{MonsterList.add_tag(selection.name, "positive")}}>
          <Svelecte fetch="http://127.0.0.1:5173/api/tags"
                    selectOnTab
                    on:change={()=>{MonsterList.add_tag(selection.name, "positive")}}
                    bind:readSelection={selection}
                    placeholder="Select Tag"
                    bind:value
          />
        </form>
      </div>
      <div class="flex ">
        {#each filter_tags as ptags}
          <Tag name={ptags} delete_tag={() => MonsterList.remove_tag(ptags)}/>
        {/each}

      </div>
    </div>
    <div class=" col-span-1 overscroll-contain">
      {#each $MonsterList.filtered_monsters as mon}
        <div on:click={()=>MonsterList.set_selected(mon)}>
          {mon.name}
        </div>
      {/each}
    </div>
    <div class=" col-span-2">
      <div>
        <pre>{JSON.stringify($MonsterList.selected, null, 4)}</pre>

      </div>
    </div>
  </div>
</section>
<style>
.min-w-select {
    min-width: 133px;
}
</style>
