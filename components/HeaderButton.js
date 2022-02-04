import React from "react";
import { Platform } from "react-native";
import {HeaderButton} from "react-navigation-header-buttons"
import {Ionicons} from "@expo/vector-icons"
import Colors from "../constants/Colors";


const CostumHeaderButton = props => {
    return <HeaderButton 
        {...props} 
        IconComponent={Ionicons} 
        iconSize={25} 
        color={Platform.OS === "android" ? Colors.secondary : Colors.primary} />
}

export default CostumHeaderButton;