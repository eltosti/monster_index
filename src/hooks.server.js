
export const isAuth = {
  cookie: "",

}


/*async function attachUserToRequestEvent(sessionId, event) {
  const sql = `
    SELECT * FROM get_session($1);`;
  const { rows } = await query(sql, [sessionId]);
  if (rows?.length > 0) {
    event.locals.user = rows[0].get_session;

  }
}
*/
export const handle = async ({ event, resolve, headers }) => {
  const { cookies } = event;

  //const sessionId = cookies.get("session");
  //if (!sessionId) {

  //}

  //console.log(event)
  //console.log(sessionId)
  // before endpoint or page is called
  //if (sessionId) {
  //  await attachUserToRequestEvent(sessionId, event);
  //}



  //if (!event.locals.user) cookies.delete("session");

  // after endpoint or page is called

  return await resolve(event);
};
