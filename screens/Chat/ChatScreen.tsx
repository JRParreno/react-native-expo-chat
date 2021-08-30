import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import ViewWithLoading from '../../components/ViewWithLoading';
import { commonColor } from '../../constants/Colors';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { auth, db } from '../../firebase';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChatScreen() {

    const navigation = useNavigation();

    // fields
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);



    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerRight: () => (
                <Pressable
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                </Pressable>
            ),
            headerLeft: () => null,
        });
    }, []);


    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats')
            .orderBy('createdAt', 'desc').onSnapshot
            (snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            ));

        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const {
            _id,
            createdAt,
            text,
            user
        } = messages[0];
        db.collection('chats').add({
            _id,
            createdAt,
            text,
            user
        });
    }, []);


    const handleSignOut = () => {
        setLoading(true);
        auth.signOut().then(() => {
            navigation.replace("Login");
        }).catch((error) => {
            // An error happened.
        }).finally(() => setLoading(false));

    }


    return (
        <ViewWithLoading loading={loading}>
            <View style={styles.container}>
                <GiftedChat
                    messages={messages}
                    showAvatarForEveryMessage={true}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: auth.currentUser?.email!,
                        name: auth.currentUser?.displayName!,
                        avatar: auth.currentUser?.photoURL!
                    }}
                />
            </View>
        </ViewWithLoading>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});