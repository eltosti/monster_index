import { writable } from "svelte/store";
import re from "svelecte";

function MonsterList() {
  const { subscribe, set, update } = writable({
    selected: {},
    name_search: "",
    desc_search: "",
    all_monsters: [],
    filtered_monsters: [],
    positive_tags: new Set(),
    negative_tags: new Set(),
  });


  function filterer(state) {
    let s = state
    console.log(state.all_monsters)
    let tmp  = state.all_monsters
      .filter(monster => [...state.positive_tags].every(t => monster.tags.includes(t) ))
      .filter(monster => [...state.negative_tags].every(t => !monster.tags.includes(t) ))
      .filter(monster => !state.name_search || monster.name.match(state.name_search))
      .filter(monster => !state.desc_search || monster.description.match(state.desc_search))
    if (!tmp){
      tmp = state.all_monsters
    }
    s.filtered_monsters = tmp
    return s
  }


  return {
    subscribe,
    add_tag:   (tag, mode) => (
      update(state => {
        mode === "positive" ? state.positive_tags.add(tag) : state.positive_tags.delete(tag)
        mode === "negative" ? state.negative_tags.add(tag) : state.negative_tags.delete(tag)
        state = filterer(state)

        return state
      })
    ),
    remove_tag: (tag) => (update(state => {
      state.negative_tags.delete(tag)
      state.positive_tags.delete(tag)
      state = filterer(state)
      console.log(state.positive_tags)
      return state
    })),
    set_selected: (monster) => (update(state =>  ({ ...state, selected: monster }))),
    set_monsters: (monsters) => (update(state =>  ({ ...state, all_monsters: monsters }))),
    update_name_search: (search) => (update(state => {
      state.name_search = new RegExp(search)
      state = filterer(state)
      return state
    })),
    update_desc_search: (search) => (update(state => {
      state.desc_search = new RegExp(search)
      state = filterer(state)
      return state
    })),

    reset: () => set(0)
  };
}


export default MonsterList()
