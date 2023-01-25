import db from "$lib/database/db";
import { collection, getDocs } from "firebase/firestore";
import { json } from "@sveltejs/kit";
import { writeFileSync } from "fs";


/** @type {import("./$types").RequestHandlers} */


async function gettest() {
  const monsterref = await getDocs(collection(db, "monsters"));
  const test = [];
  //console.log(monsterref.empty)
  monsterref.forEach((doc) => {
    if (doc.data().type === "monster") {
      test.push(doc.data());
    }
  });
  return test;
}


export async function GET() {

  let a = {};
  a = await gettest();
  return json(a);
}



