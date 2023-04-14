//getCoversetionsByUserID() return [{data, message, userId, userFullName}]
import { Pool, QueryResult } from "pg";
import { Message } from "../interfaces/message.interface";

export const getCoversetionsByUserID = (
  pool: Pool,
  id: number
): Promise<Message[]> => {
  return new Promise((resolve, reject) => {
    pool.query(
        `select
        m."date",
        m.message,
        users.id as userId,
        users.full_name
      from
        messages m
        join users on users.id = case
          when from_user_id = $1 then to_user_id
          else from_user_id
        end
      where
        (
          m."date",
          case
            when from_user_id = $1 then to_user_id
            else from_user_id
          end
        ) in (
          select
            max("date"),
            case
              when from_user_id = $1 then to_user_id
              else from_user_id
            end as conversationId
          from
            messages
          where
            from_user_id = $1
            OR to_user_id = $1
          group by
            conversationId
        )`,
        [id],
      (error: Error, results: QueryResult) => {
        if (error) {
          reject({ status: 500, message: "generic error" });
        } else if (results.rows.length > 0) {
          resolve(results.rows);
        } else {
          reject({ status: 404, message: "not found" });
        }
      }
    );
  });
};
