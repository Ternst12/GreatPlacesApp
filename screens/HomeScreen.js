import React, {useCallback} from "react"
import {View, Text, StyleSheet, Button} from "react-native"
import * as AuthActions from "../store/actions/AuthActions"
import { useDispatch } from "react-redux";

const HomeScreen = props => {

  const dispatch = useDispatch()

  const logoutHandler = useCallback(async () => {
    try {
        await dispatch(AuthActions.logout())
        setPassword("")
        setEmail("")
    } catch (err) {
        console.log(err)
    }
}, []);


  return(
    <View style={styles.screen}>
      <Text>Hej</Text>
      <Button title="logout" onPress={logoutHandler}/>
    </View>
  )

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default HomeScreen;