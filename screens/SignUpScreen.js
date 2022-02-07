import React, { useState, useEffect, useCallback, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native"

import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import SocialButton from "../components/AuthButton";
import * as AuthActions from "../store/actions/AuthActions"
import { useDispatch } from "react-redux";


const SignUpScreen = props => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (error) {
            Alert.alert("Der er sket en fejl.", error, [{ text: "Okay" }])
        }
    }, [error]);

    const signupHandler = useCallback(async () => {

        setError(null)
        setIsLoading(true)

        if (password != confirmPassword) {
            console.log(password)
            console.log(confirmPassword)
            setPasswordErrorMessage(true)
            setIsLoading(false)
        } else {

            try {
                await dispatch(AuthActions.signup(email, password, name, imageUrl))
                setPassword("")
                setEmail("")
                setConfirmPassword("")
                setIsLoading(false)
            } catch (error) {
                console.log("noget gik galt")
                await setError(error.message)
                setIsLoading(false)
            }
        };



    }, [error, email, password, isLoading, confirmPassword]);

    return (

        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require("../images/pexels-sagui-andrea-618833.jpg")}
                style={styles.logo}
            />
            <Text style={styles.text}> Awesome Chat App </Text>

            <FormInput 
                value={email}
                onChangeText={text => setEmail(text)}
                iconType="user"
                keyboardType="email-address"
                returnKeyType="next"
                autoCapitalize="none"
            />

            <FormInput 
                value={name}
                placeholderText="Skriv dit fulde navn"
                onChangeText={text => setName(text)}
                iconType="user"
                returnKeyType="next"
                autoCapitalize="none"
            />

            <FormInput 
                value={imageUrl}
                placeholderText="ImageUrl"
                onChangeText={text => setImageUrl(text)}
                iconType="user"
                returnKeyType="next"
                autoCapitalize="none"
            />  

            <FormInput 
                value={password}
                onChangeText={text => setPassword(text)}
                iconType="lock"
                secureTextEntry={true}
                returnKeyType="next"
                
            />



            <FormInput
            value={confirmPassword}
            onChangeText={(userPassword) => setConfirmPassword(userPassword)}
            placeholderText="Bekræft dit Password"
            iconType="lock"
            secureTextEntry={true}
            />
            {passwordErrorMessage && <Text style={{color: "red"}}> De to passwords passer ikke sammen </Text>}
            
             {isLoading ? 
             <ActivityIndicator size="large" color="red" /> 
             :
            <FormButton 
                buttonTitle="Opret bruger"
                onPress={signupHandler}
            />}

            {Platform.OS === 'android' ? (
            <View>
                <SocialButton
                buttonTitle="Signin med Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => {}}
                />

                <SocialButton
                buttonTitle="Signin med Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => {}}
                />
            </View>
            ) : null}

            <TouchableOpacity
            style={styles.navButton}
            onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.navButtonText}>Har du allerede en konto? Så klik her</Text>
            </TouchableOpacity>
            
        </ScrollView>
          

    )
};


const styles = StyleSheet.create({

    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
      },
      text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
      },
      navButton: {
        marginTop: 15,
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
      }
});

export default SignUpScreen;