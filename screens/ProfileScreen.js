import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as AuthActions from "../store/actions/AuthActions"
import { useDispatch, useSelector } from 'react-redux';

import { db } from '../firebase/firebase';


const ProfileScreen = ({navigation, route}) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null)
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const userId = useSelector(state => state.auth.userId)

  useEffect(() => {
    if (error) {
        Alert.alert("Der er sket en fejl.", error, [{ text: "Okay" }])
    }
}, [error]);

   const fetchUsers = useCallback(async() => {
        try {
           
           await db
             .collection('users')
             .doc(userId)
             .get()
             .then((documentSnapshot) => {
              if( documentSnapshot.exists ) {
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
              }
            })
  
           console.log('userData: ', userData);
         } catch (e) {
           console.log(e);
         }
       });

  useEffect(() => {
    fetchUsers()
  }, [isFocused]);

  const handleLogout = useCallback(async() => {

    try{
        await  dispatch(AuthActions.logout());
    } 
    catch (error) {
      await setError(error.message)
    }

  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{uri: userData ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
        />
        <Text style={styles.userName}>{userData ? userData.name || 'Test' : 'Test'}</Text>
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.aboutUser}>
        {userData ? userData.about || 'Ingen detaljer at vise' : ''}
        </Text>
        <View style={styles.userBtnWrapper}>
         
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('Rediger');
                }}>
                <Text style={styles.userBtnTxt}>Rediger</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={handleLogout}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          
        </View>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}></Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});