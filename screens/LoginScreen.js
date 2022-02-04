/* eslint-disable */
import React, { useState, useEffect, useCallback} from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import * as AuthActions from "../store/actions/AuthActions"
import { useDispatch } from "react-redux";


import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import SocialButton from "../components/AuthButton";



const LoginScreen = props => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)



    useEffect(() => {
        if (error) {
            Alert.alert("Der er sket en fejl.", error, [{ text: "Okay" }])
        }
    }, [error]);

    const loginHandler = useCallback(async () => {

        setError(null)
        setIsLoading(true)
        if(email === "" || password === ""){
            setIsLoading(false)
            Alert.alert("Begge input felter skal være udfyldte",
                        "Venligst indtast din e-mail og dit password",
                         [{ text: "Okay" }] )
            return;
        } else {

        try {
            await dispatch(AuthActions.login(email, password))
            setPassword("")
            setEmail("")
        } catch (err) {
            await setError(err.message)
            setIsLoading(false)
        }
        }
    }, [error, email, password, isLoading]);



    return (

        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require("../images/pexels-julie-aagaard-1374064.jpg")}
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
                value={password}
                onChangeText={text => setPassword(text)}
                iconType="lock"
                secureTextEntry={true}
                returnKeyType="next"
                
            />

            
             {isLoading ? 
             <ActivityIndicator size="large" color="red" /> 
             :
            <FormButton 
                buttonTitle="Login"
                onPress={loginHandler}
            />}

            {Platform.OS === 'android' ? (
            <View>
                <SocialButton
                buttonTitle="Login med Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => {
                    console.log("facebook")
                }}
                />

                <SocialButton
                buttonTitle="Login med Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => {
                    console.log("google");
                }}
                />
            </View>
            ) : null}

            <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => props.navigation.navigate('Signup')}>
            <Text style={styles.navButtonText}>Har du ikke en bruger ? Så opret en her!</Text>
            </TouchableOpacity>
            
        </ScrollView>
          

    )
};

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
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
      forgotButton: {
        marginVertical: 35,
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
      },
});

export default LoginScreen;