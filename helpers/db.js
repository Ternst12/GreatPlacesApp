import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("places.db");

export const init = () => {

    const promise = new Promise((resolve, reject) => {
    
        db.transaction((tx) => {
            tx.executeSql(
            "CREATE TABLE IF NOT EXISTS places1 (id INTEGER PRIMARY KEY, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);", 
            [],
            () => {
                resolve()
            },
            (_, err) => {
                reject(err)
            }
            );
        });
    
    })
    return promise;
}

export const inserPlace = (title, imageUri, adress, lat, lng) => {
    
    const promise = new Promise((resolve, reject) => {
    
        db.transaction((tx) => {
            tx.executeSql(
            "INSERT INTO places1 (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)", 
            [title, imageUri, adress, lat, lng],
            (_, result) => {
                resolve(result)
            },
            (_, err) => {
                reject(err)
            }
            );
        });
    
    })
    return promise;
}

export const fetchPlaces = () => {

    const promise = new Promise((resolve, reject) => {
    
        db.transaction((tx) => {
            tx.executeSql(
            "SELECT * FROM places1", 
            [],
            (_, result) => {
                resolve(result)
            },
            (_, err) => {
                reject(err)
            }
            );
        });
    
    })
    return promise
    
}