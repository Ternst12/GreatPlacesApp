import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  MessageText,
  TextSection,
} from '../styles/MessagesStyles';

import { db, auth } from '../firebase/firebase';
import { useSelector } from 'react-redux';

const MessagesScreen = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState(null)

    const userId = useSelector(state => state.auth.userId)

    const fetchUsers = useCallback(async() => {
        try {
           const list = [];
           await db
             .collection('users')
             .where("userId", "!=", userId)
             .get()
             .then((querySnapshot) => {
            console.log('Total Posts: ', querySnapshot.size);
               querySnapshot.forEach((doc) => {
                 const {
                   name,
                   about,
                   userImg
                 } = doc.data();
                 list.push({
                   id: doc.id,
                   userName: name,
                   userImg: userImg,
                   about: about,
                 });
               });
             });
     
           setUsers(list);
     
           if (isLoading) {
             setLoading(false);
           } 
           console.log('users: ', users);
         } catch (e) {
           console.log(e);
         }
       });
     
       useEffect(() => {
         fetchUsers();
       },[]);



    return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" color="red" /> :  
      <Container>
        <FlatList 
          data={users}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {userId: item.id})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={{ uri: item.userImg}} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                  </UserInfoText>
                  <MessageText>{item.about}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
      }
    </View>
    );
          
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});