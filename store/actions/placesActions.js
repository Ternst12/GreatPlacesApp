import * as FileSystem from "expo-file-system"
import { fetchPlaces, inserPlace } from "../../helpers/db" 

export const ADD_PLACE = "ADD_PLACE"
export const SET_PLACES = "SET_PLACES"

export const addPlace = (title, imageUri) => {

    return async dispatch => {

        imageName = imageUri.split("/").pop()

        const newPath = FileSystem.documentDirectory + imageName

        console.log("imageName = ", imageName)

        try {
           await FileSystem.moveAsync({
                from: imageUri,
                to: newPath
            })
            const dbResult = await inserPlace(
                title, 
                newPath, 
                "Marie Curies Alle 77", 
                15.7, 
                584.9
            );
            console.log("DB Result = ", dbResult)
            dispatch({type: ADD_PLACE, placeData: {
                id: dbResult.insertId,
                title: title,
                imageUri: newPath
            }
            })
        }
        catch(err) {
            console.log("test fejl", err)
            throw err;
        }       
    }
}

export const LoadPlaces = () => {
    return async dispatch => {
        try{
            fetchedPlaces = await fetchPlaces()
            console.log(fetchedPlaces)
            dispatch({type: SET_PLACES, places: fetchedPlaces.rows._array})
        } catch(err) {
            console.log("fetching failed = ", err)

        }
        
    }
}
