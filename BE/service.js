
export const getUserByEmail = (_req, res, pool, email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            if (error) {  
                reject(error)
            }else if (results.rows.length > 0) {
                resolve(results.rows)
            }else{
                
                reject(res.status(404).json({error: 404, message: 'email not found'}))
            }
        })
    })
}