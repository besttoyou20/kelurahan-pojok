import connectDB from "../../database/db.js";

export const findUserKelurahanByUsername = async (
   username,
  db = connectDB
) => {
  const [rows] = await db.query(
    `SELECT * 
     FROM users_kelurahan 
     WHERE username = ?`,
    [username]
  );

  return rows[0];  
};