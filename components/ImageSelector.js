import React, {useState} from "react";
import {View, Button, Text, StyleSheet, Image, Alert} from "react-native"
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker"


const ImageSelector = props => {

    const [imageTaken, setImageTaken] = useState()

    const verifyPermissions = async () => {
      const {status} = await ImagePicker.requestCameraPermissionsAsync()
      if(status !== "granted"){
        Alert.alert(
            "Insufficient permissions", 
            "you need to grant camera permission to use this app", 
            [{text: "Understood"}]
            )
        return false;    
        };
      return true;
    }
    
    const takeImage = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 12],
            quality: 1 // lowest 0.1 highest 1
        });

        console.log(image)
        setImageTaken(image.uri)
        props.onImageTaken(image.uri)
    }

    return (
        <View style={styles.ImageSelector}>
            <View style={styles.ImagePreview}>
             {imageTaken ? <Image style={styles.image} source={{uri: imageTaken }}/> :
             <Text style={styles.label}>No image picked yet</Text>}
            </View>    
                <Button 
                title="Take image" 
                color={Colors.primary}
                onPress={takeImage}    
                />
               
            
        </View>
    );
}

const styles = StyleSheet.create ({
    ImageSelector: {
        alignItems: "center",
        marginBottom: 15

    },
    ImagePreview: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "grey",
        borderWidth: 2
    },
    label: {
        color: "gold"

    },
    image: {
        width: "100%",
        height: "100%"
    }

});

export default ImageSelector;