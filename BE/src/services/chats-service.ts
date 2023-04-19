import { Pool, QueryResult } from "pg";
import { Chat } from "../interfaces/chat.interface";

export const getChatByUserId = (
  pool: Pool,
  userId: number,
  conversationUserId: number
): Promise<Chat[]> => {
  return new Promise((resolve, reject) => {
    pool.query(
      ` select * from (
          select *,
        case when from_user_id = $1 then to_user_id else from_user_id end as conversationId from messages
        where from_user_id = $1 OR to_user_id = $1
           ) q 
          where conversationId = $2
        `,
      [userId, conversationUserId],
      (error: Error, results: QueryResult) => {
        if (error) {
          console.log(error);
          reject({ status: 500, message: "generic error" });
        } else if (results.rows.length > 0) {
          resolve(
            results.rows.map((item) => {
              item.fromId = item.from_user_id;
              delete item.from_user_id;
              return item;
            })
          );
        } else {
          reject({ status: 404, message: "not found" });
        }
      }
    );
  });
};

export const postChatByUserId = (
  pool: Pool,
  userId: number,
  conversationUserId: number,
  date: Date,
  text: string
): Promise<Chat[]> => {
  return new Promise((resolve, reject) => {
    pool.query(
      `insert into messages (from_user_id, to_user_id, date, message ) values ($1, $2, $3, $4)`,
      [userId, conversationUserId, date, text],
      (error: Error, results: QueryResult) => {
        if (error) {
          console.log(error);
          reject({ status: 500, message: "generic error" });
        } else if (results.rowCount > 0) {
          console.log(results.rows)
          resolve(
            
            results.rows
          );
        } else {
          reject({ status: 404, message: "not found" });
        }
      }
    );
  });
};
