import db from "$lib/database/db";
import { collection, getDocs } from "firebase/firestore"
import { json } from "@sveltejs/kit";
import { writeFileSync } from 'fs';



async function gettest(){
  const monsterref = await getDocs(collection(db, "monsters"))
  let test = []
  //console.log(monsterref.empty)
  monsterref.forEach((doc)=> {
    let doc_dat = doc.data()
    if (doc_dat.type == "tags"){
      test = test.concat(doc_dat.tags.map(a => ({"name": a})))
    }
  })
  return test
}

/** @type {import('./$types').RequestHandlers} */
export async function GET() {

  let a = {}
  a = await gettest()

  return json(a.sort((a,b) => a.name - b.name))
}
