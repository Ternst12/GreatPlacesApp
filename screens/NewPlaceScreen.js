import React, {useState} from "react";
import { ScrollView, View, StyleSheet, Text, TextInput, Button } from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as placesActions from "../store/actions/placesActions"
import ImageSelector from "../components/ImageSelector";


const NewPlaceScreen = props => {

    const dispatch = useDispatch()

    const [titleValue, setTitleValue] = useState('');
    const [imageUri, setImageUri] = useState()

    const titleChangeHandler = text => {
        setTitleValue(text);
    }

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue, imageUri))
        console.log(titleValue)
        props.navigation.goBack();        
    }

    const imageTakenHandler = imagePath => {
        setImageUri(imagePath)
    };

    return ( 
        
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.labelContainer}> 
                    <Text style={styles.label}>Title</Text>
                </View>
                <TextInput 
                style={styles.textInput} 
                onChangeText={titleChangeHandler}
                value={titleValue}
                />
                <ImageSelector onImageTaken={imageTakenHandler}/>
                <Button 
                title="Save Place" 
                color={Colors.primary} 
                onPress={savePlaceHandler}
                />
            </View>            
        </ScrollView>
        
    )

}

NewPlaceScreen.navigationOptions = navData => {
    return {
    headerTitle: "Add Place",
    }
}

const styles = StyleSheet.create ({
    labelContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        margin: 30
    },
    label: {
        fontSize: 20,
        marginBottom: 10
    },
    textInput: {
        borderBottomColor: "grey",
        borderBottomWidth: 2,
        marginBottom: 15,
        paddingVertical: 5,
        paddingHorizontal: 2
    }

})


export default NewPlaceScreen;