import React, {useEffect,  useLayoutEffect} from "react";
import { View, StyleSheet, Platform, FlatList, ScrollView, Button, Text, TouchableOpacity } from "react-native";
import {AntDesign} from "@expo/vector-icons"
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import Colors from "../constants/Colors";
import * as placesActions from "../store/actions/placesActions"


const PlacesListScreen = props => {

    
    
    const places = useSelector(state => state.places.places)
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        props.navigation.setOptions({ 
            headerTitle: props => <Text>Whats up</Text>,
            headerTitleAlign: "center",
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 30
                }}
                    onPress={() => props.navigation.navigate("NewPlace")}
                >
                    <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>)
            })
    })

    useEffect(() =>{
        
        dispatch(placesActions.loadPlaces())
    }, [dispatch]);

    return ( 

        <View>

        <FlatList 
        data={places} 
        keyExtractor={item => item.id}
        renderItem={itemData => (
        <PlaceItem 
            image={itemData.item.imageUri} 
            title={itemData.item.title}
            address={null}
            onSelect={() => {
                console.log(itemData.item)
                props.navigation.navigate("PlaceDetail", {
                    placeTitle: itemData.item.title, 
                    placeId: itemData.item.id
                    });
                }}    
            />
        )}    
        />
    
         </View>
    )
}
  
const styles = StyleSheet.create ({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    placeItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
      },
      image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'green',
        borderColor: Colors.primary,
        borderWidth: 1
      },
      infoContainer: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
      },
      title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5
      },
      address: {
        color: '#666',
        fontSize: 16
      }
})

export default PlacesListScreen;