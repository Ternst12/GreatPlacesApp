import React, {useContext, useEffect, useState, useCallback} from 'react';
import { View, StyleSheet, Switch, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    UserInfo,
    UserImg,
    UserName,
    UserInfoText,
    PostTime,
    PostText,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divider,
  } from '../styles/ChatRoomStyles';

import Image from './Image';

import { AuthContext } from '../store/actions/authAction';

import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from "@react-native-firebase/firestore"
// import * as Notifications from "expo-notifications"
// import * as Permissions from "expo-permissions"
import { async } from '@firebase/util';


const ChatRoomCard = ({item, onDelete, onPress}) => {

    const {user} = useContext(AuthContext);
    const [messagCount, setMessageCount] = useState(null);
    const [notificationToken, setNotificationToken] = useState(null);
    const [getNotification, setGetNotification] = useState(false)

  
    const likeIcon = item.liked ? 'heart' : 'heart-outline';
    const likeIconColor = item.liked ? '#2e64e5' : '#333';
    var likeText = "";
    var commentText = "";

    console.log("item = ", item)
  
    if (item.likes == 1) {
      likeText = '1 Like';
    } else if (item.likes > 1) {
      likeText = item.likes + ' Likes';
    } else {
      likeText = 'Like';
    }
  
    if (item.comments == 1) {
      commentText = '1 Comment';
    } else if (item.comments > 1) {
      commentText = item.comments + ' Comments';
    } else {
      commentText = 'Comment';
    }
  /*
  const askForNotification = useCallback(async() => {
    let pushToken;
    let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (statusObj.status !== 'granted') {
      statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (statusObj.status !== 'granted') {
      pushToken = null;
    } else {
      setNotificationToken((await Notifications.getExpoPushTokenAsync()).data);
      setGetNotification(true)
    }
  }, []) */

;

  const getNumberofMessenges = useCallback(async () => {
    await firestore()
      .collection(item.chatroomName)
      .onSnapshot(snapshot => 
        setMessageCount(snapshot.docs.length)
        )
      
    }, [item.chatroomName]);

  useEffect(() => {
    getNumberofMessenges();
  }, []);

    return (
      <View key={item.id} style={styles.card}>
        <UserInfo>
          <UserImg 
          source={{
              uri: item.userImg
            }} 
            
          />
          <UserInfoText>
            <TouchableOpacity onPress={onPress}>
            
              <UserName> 
              {item.userName}
              </UserName>
            </TouchableOpacity>
            <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
          </UserInfoText>
        </UserInfo>
        <PostText>{item.chatroomName}</PostText>
        {item.postImg != null ? (
          <Image
            defaultImageSource={require('../images/waiting.jpg')}
            source={{uri: item.postImg}}
            style={{width: '100%', height: 250}}
            resizeMode="cover"
          />
        ) : (
          <Divider />
        )}
  
        <InteractionWrapper>
          <Interaction active={item.liked}>
            <Ionicons name={likeIcon} size={25} color={likeIconColor} />
            <InteractionText active={item.liked}>{likeText}</InteractionText>
          </Interaction>
          <Interaction>
            <Ionicons name="md-chatbubble-outline" size={25} />
            <InteractionText>{messagCount} {commentText}</InteractionText>
          </Interaction>
          {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} />
          </Interaction>
          ) : null}
        </InteractionWrapper>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}
        >
          <Text>Slå Notification til </Text>
          <Switch
            value={getNotification}
            onValueChange={() =>
              {

                setGetNotification(!getNotification)
              }
            }
          />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    card : {
    backgroundColor: "#DDF1F0",
    width: 300,
    margin: 15,
    borderRadius: 10,
    elevation: 12
    }
  })
  
  export default ChatRoomCard;