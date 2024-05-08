export default <T extends { id: number }>(db:T[]) => db.reduce((max, item) =>
  (item.id > max ? item.id : max),
    db[0].id
  )