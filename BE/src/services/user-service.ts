import { Pool, QueryResult } from 'pg';
import { GenericError } from '../interfaces/error.interface';
import { User } from '../interfaces/user.interface';


export const getAllUser = (pool: Pool): Promise<User[] | GenericError> => {
    return new Promise((resolve, reject)=> {
        pool.query('SELECT * FROM users', (error: Error, results: QueryResult) => {
            if(error) {
                reject({status: 500, message: 'generic error'})

            }else if (results.rows.length > 0) {
                resolve(results.rows)
            }else{
                
                reject({status: 404, message: 'not found'})
            }
        })
    })
}

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

export const updateUserData = ( pool: Pool, id: number, ws_id: string, last_login: Date): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET ws_id = $1, last_login = $2 WHERE id = $3', [ws_id, last_login, id], (error: Error, results: QueryResult) => {
            if(error) {
                reject(false)
            }else{
                
                resolve(results.rowCount === 1)
            }
        })
    })
}