import { Pool, QueryResult } from 'pg';
import { GenericError } from './interfaces/error.interface';
import { User } from './interfaces/user.interface';


export const getUserByEmail = ( pool: Pool, email: string): Promise<User | GenericError> => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error: Error , results: QueryResult) => {
            if (error) {  
                reject({status: 500, message: 'generic error'})
            }else if (results.rows.length > 0) {
                resolve(results.rows[0])
            }else{
                
                reject({status: 404, message: 'not found'})
            }
        })
    })
}