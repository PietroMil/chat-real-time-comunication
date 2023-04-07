
export const getUserByEmail = (_req, _res, pool, email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (error) {  
                reject(error)
            }else if (results.rows.length > 0) {
                resolve(results.rows)
            }else{
                reject({error: 'invalid email'})
            }
        })
    })
}