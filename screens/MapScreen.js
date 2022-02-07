import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const MapScreen = props => {
 

  const {initialLocation, readonly, pickedLocation} = props.route.params

  console.log("readonly ", readonly)
  console.log("pickedLocation = ", pickedLocation)

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : pickedLocation.lat,
    longitude: initialLocation ? initialLocation.lng : pickedLocation.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
    console.log("43434 = ", selectedLocation)
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // could show an alert!
      return;
    }
    props.navigation.navigate('NewPlace', { selectedLocation: selectedLocation,});
  }, [selectedLocation]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  {readonly === undefined ?
  useLayoutEffect(() => {
    props.navigation.setOptions({ 
        headerTitle: props => <Text>Google Maps</Text>,
        headerTitleAlign: "center",
        headerRight: () => (
         <TouchableOpacity style={styles.headerButton} onPress={savePickedLocationHandler}>
          <Text style={styles.headerButtonText}>Save</Text>
          </TouchableOpacity> 
        )
    })
  }) : useLayoutEffect(() => {
    props.navigation.setOptions({ 
        headerTitle: props => <Text>Google Maps</Text>,
        headerTitleAlign: "center"
    })
  }) }

  return (
    <MapView
      style={styles.map}
      initialRegion={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};


const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'black' : Colors.primary
  }
});

export default MapScreen;
