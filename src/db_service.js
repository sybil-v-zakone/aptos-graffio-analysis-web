export const find_in_db = (db, wallets) => {
    const result = {}
    
    wallets.forEach(element => {
        const key = element.trim()
        if(key in db) {
            result[key] = db[key]
        }else {
            result[key] = 0
        }
    });
    return result
}
