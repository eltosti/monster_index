<script>
  import Svelecte from "svelecte";
  import Tag from "$lib/tag.svelte";
  import { TextInput, Textarea, Button } from "@specialdoom/proi-ui";

  let monster_tags = new Set();
  let created_tags = [];
  let value = "";
  let selection = null;

  let monster = {
    name: "",
    description:"",
  }

  const handleSubmit = async () => {
    let tmp = await fetch("https://monsterindex.duckdns.org/api/addMonster",{
      method: 'POST',
      body: JSON.stringify({monster : {...monster, tags: [...monster_tags]}, created_tags }),
      headers: {
        'content-type': 'application/json'
      }
    });


  }




</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Monster filter demo app" />
</svelte:head>


<section class="flex  h-screen justify-center overflow-y-hidden p-5">
  <div class="w-3/5 grid grid-cols-5 gap-2">
    <div class=" col-span-2">
      <div class="flex gap-0.5">
        <form class="grow"  method="POST" on:submit|preventDefault={handleSubmit}>
          <div class="my-1">
            <TextInput name="name"  placeholder="Monster Name" bind:value={monster.name} />
          </div>
          <div class="my-1">
            <Textarea name="description" bind:value={monster.description} />
          </div>
          <Svelecte
            creatablePrefix=""
            fetch="http://127.0.0.1:5173/api/tags"
            selectOnTab
            creatable
            on:createoption={(e)=>created_tags.push(e.detail.name)}
            on:change={()=>{monster_tags = monster_tags.add(selection.name)}}
            bind:readSelection={selection}
            placeholder="Select Tag"
            bind:value />
          <div class="flex flex-wrap gap-1 max-h-full overflow-y-auto ">
            {#each [...monster_tags] as ptags}
              <Tag name={ptags} preset={true} pre_value={true}
                   delete_tag={()=>{monster_tags.delete(ptags);monster_tags=monster_tags}} />
            {/each}

          </div>
          <div class="flex justify-end my-1">
            <Button type="submit" >Add Monster</Button>
          </div>
        </form>
      </div>

    </div>

    <div class=" col-span-2">
      <pre>{JSON.stringify({...monster, tags:[...monster_tags]}, null,4)}</pre>
    </div>
  </div>
</section>

