import db from "$lib/database/db";
import { json } from "@sveltejs/kit";
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";

export async function POST({request}){
  const {monster,created_tags } = await request.json()
  const doc_refs = await getDocs(collection(db, "monsters"))
  let tag_data;
  let tag_ref;
  doc_refs.forEach(doc => {

    if (doc.data().type === "tags"){
      tag_data = doc.data()
      tag_ref = doc.ref
    }
  })
  const tags = tag_data.tags
  const new_tags = created_tags.filter(tag => !tags.includes(tag))
  const final_tags = tags.concat(new_tags)


  if (new_tags) {

    console.log("Create new Tags:", new_tags)
    await updateDoc(tag_ref, {tags: final_tags})
  }
  if (monster.name){
    console.log("Added mosnter:", monster)
    await addDoc(collection(db, "monsters"), {...monster,type: "monster"})
  }

  return json({success: true})
}
