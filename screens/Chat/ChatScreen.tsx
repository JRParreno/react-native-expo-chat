import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import ViewWithLoading from '../../components/ViewWithLoading';
import LottieView from 'lottie-react-native';
import { commonColor } from '../../constants/Colors';
import TextField from '../../components/TextInput/TextField';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import ButtonComponent, { ButtonType } from '../../components/Button/ButtonComponent';
import { normalize } from '../../constants/FontStyles';
import TouchableLink from '../../components/TouchableLink/TouchableLink';
import { useNavigation } from '@react-navigation/core';
import { auth, db } from '../../firebase';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
                    onPress={handleSignOut}
                >
                    <Ionicons name={"log-out-outline"} size={24} color={commonColor.main} />
                </Pressable>
            ),
            headerLeft: () => (
                <Pressable
                    onPress={() => { }}
                >
                    <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                </Pressable>
            )

        });
    }, []);

    // useEffect(() => {
    //     setMessages([
    //         {
    //             _id: 1,
    //             text: 'Hello developer',
    //             createdAt: new Date(),
    //             user: {
    //                 _id: 2,
    //                 name: 'React Native',
    //                 avatar: 'https://placeimg.com/140/140/any',
    //             },
    //         },
    //     ]);
    // }, []);

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
                        _id: auth.currentUser?.email,
                        name: auth.currentUser?.displayName,
                        avatar: auth.currentUser?.photoURL
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