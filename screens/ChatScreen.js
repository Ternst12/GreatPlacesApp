import React, {useState, useLayoutEffect, useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';


import {db} from "../firebase/firebase"

const ChatScreen = ({navigation, route}) => {

    const [users, setUsers] = useState(null)
   
    const userId = useSelector(state => state.auth.userId)

    const ChatId = route.params

    console.log("userId = ", userId)


    const [messages, setMessages] = useState([]);

    const fetchUsers = useCallback(async() => {
      try {
         const list = [];
         await db
           .collection('users')
           .where("userId", "==", userId)
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
         console.log('users: ', users);
       } catch (e) {
         console.log(e);
       }
     });
   
     useEffect(() => {
       fetchUsers();
     },[]);

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection(ChatId.userId)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                    image: doc.data().imageUrl
                }))
            ))
            return unsubscribe;

    }, [])

    
  
    const onSend = async (messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user,
        } = messages[0]
        db
        .collection(ChatId.userId)
        .add({
            _id,
            createdAt,
            text,
            user,
        })
        .catch((error) => {
            console.log('Noget gik galt under overførelsen til firestore.', error);
        });
    }
  
    const renderSend = (props) => {
      return (
        <Send {...props}>
        <View style={{flexDirection:"row"}}>
          <View>
            <MaterialCommunityIcons
              name="send-circle"
              style={styles.icon}
              size={32}
              color="#2e64e5"
            />
          </View>
        </View>
        </Send>
      );
    };
  
    const renderBubble = (props) => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
                backgroundColor: "red"
            },
            right: {
              backgroundColor: 'orange',
            },
          }}
          textStyle={{
            left: {
              color: 'white',
            },
            right: {
              color: 'white',
            },
          }}
        />
      );
    };

    
    const scrollToBottomComponent = () => {
      return(
        <FontAwesome name='angle-double-down' size={22} color='#333' />
      );
    }
  
    return (
      <GiftedChat
        showAvatarForEveryMessage={true}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
          name: users ? users.name : "Morten Hansen"
        }}
        renderBubble={renderBubble}
        alwaysShowSend={true}
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    );
  };



  const styles = StyleSheet.create({
    icon: {
        marginBottom: 5, 
        marginRight: 5
    },
  });

export default ChatScreen;