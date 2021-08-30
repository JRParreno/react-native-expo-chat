import * as React from 'react';
import ViewWithLoading from '../../components/ViewWithLoading';
import { StyleSheet, View, Modal, Text, Alert } from 'react-native';
import { useState } from 'react';
import { Avatar, ListItem } from 'react-native-elements';
import { auth, db } from '../../firebase';
import { useNavigation } from '@react-navigation/core';
import ButtonComponent, { ButtonType } from '../../components/Button/ButtonComponent';
import { normalize } from '../../constants/FontStyles';
import { Ionicons } from '@expo/vector-icons';
import TextField from '../../components/TextInput/TextField';

export default function ProfileScreen() {
    // navigation
    const navigation = useNavigation();

    // fields
    const [name, setName] = useState(auth.currentUser?.displayName!);
    const [imageUrl, setImageUrl] = useState(auth.currentUser?.photoURL!);
    const [modalVisible, setModalVisible] = useState({ visible: false, field: '' });

    const handleUpdateProfile = () => {

        if (auth.currentUser && name.length > 0 && imageUrl.length > 0) {
            auth.currentUser.updateProfile({
                displayName: name,
                photoURL: imageUrl
            }).then(() => {
                Alert.alert("", "Successfully update profile");
            }).catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                Alert.alert("", errorMessage);
            });
        } else {
            Alert.alert("", "Please fill all the fields");
        }
    }

    return (
        <ViewWithLoading loading={false}>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        source={{ uri: imageUrl }}
                        containerStyle={{ width: 150, height: 150 }}
                        avatarStyle={{ borderRadius: 100 }}
                    >
                        <Avatar.Accessory
                            style={{ height: 30, width: 30, zIndex: 1, position: 'absolute', borderRadius: 50, marginBottom: 10, marginRight: 10 }}
                            brand={true}
                            iconStyle={{ fontSize: 15 }}
                            onPress={() => {
                                setModalVisible({ visible: true, field: 'image' })
                            }}
                        />
                    </Avatar>
                </View>
                <View style={styles.listItemContainer}>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Subtitle>Name</ListItem.Subtitle>
                            <ListItem.Title>{name}</ListItem.Title>
                        </ListItem.Content>
                        <Ionicons name={"create-outline"} size={24} onPress={() => {
                            setModalVisible({ visible: true, field: 'name' })
                        }} />
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Subtitle>Email Address</ListItem.Subtitle>
                            <ListItem.Title>{auth.currentUser?.email!}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </View>
                <View style={{ flex: 0, marginVertical: 10, marginHorizontal: 20 }}>
                    <ButtonComponent
                        title={'UPDATE PROFILE'}
                        onPress={handleUpdateProfile}
                        type={ButtonType.primary}
                        style={{ width: '100%', alignSelf: 'center', marginTop: 15 }}
                        textStyle={{ fontSize: normalize(12), fontFamily: 'poppins-semibold', letterSpacing: 3 }}
                    />
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible.visible}
                onRequestClose={() => {
                    setModalVisible({ visible: !modalVisible.visible, field: modalVisible.field });
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {modalVisible.field === "image" && (
                            <TextField
                                style={[styles.textFieldStyle, { marginBottom: 0 }]}
                                value={imageUrl}
                                placeholder={'Image Url'}
                                onChange={setImageUrl}
                                textType={"name"}
                                autofocus={false}
                                shadow={true}
                                textLabel={"Image Url"}
                                required={true}
                                helpText={"Paste image url from the web"}
                            />
                        )}

                        {modalVisible.field === "name" && (
                            <TextField
                                style={styles.textFieldStyle}
                                value={name}
                                placeholder={'Name'}
                                onChange={setName}
                                textType={"name"}
                                autofocus={false}
                                shadow={true}
                                textLabel={"Name"}
                                required={true}
                            />
                        )}

                        <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                            <ButtonComponent
                                title={'CANCEL'}
                                onPress={() => setModalVisible({ visible: false, field: '' })}
                                type={ButtonType.primary}
                                style={{ width: '40%', alignSelf: 'center', marginTop: 15, marginRight: 10 }}
                                textStyle={{ fontSize: normalize(12), fontFamily: 'poppins-semibold', letterSpacing: 3 }}
                            />

                            <ButtonComponent
                                title={'OK'}
                                onPress={() => {
                                    setModalVisible({ visible: false, field: '' });
                                }}
                                type={ButtonType.primary}
                                style={{ width: '40%', alignSelf: 'center', marginTop: 15, marginLeft: 10 }}
                                textStyle={{ fontSize: normalize(12), fontFamily: 'poppins-semibold', letterSpacing: 3 }}
                            />
                        </View>

                    </View>
                </View>
            </Modal>
        </ViewWithLoading>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    avatarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItemContainer: {
        flex: 2
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
        flex: 0,
        width: "80%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textFieldStyle: {
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    },
})