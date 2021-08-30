import * as React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import ViewWithLoading from '../../components/ViewWithLoading';
import LottieView from 'lottie-react-native';
import { commonColor } from '../../constants/Colors';
import TextField from '../../components/TextInput/TextField';
import { useState } from 'react';
import ButtonComponent, { ButtonType } from '../../components/Button/ButtonComponent';
import { normalize } from '../../constants/FontStyles';
import TouchableLink from '../../components/TouchableLink/TouchableLink';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../../firebase';


export default function RegisterScreen() {
    // navigation
    const navigation = useNavigation();

    // fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [password, setPassword] = useState('');
    const [passwordEye, setPasswordEye] = useState(true);
    const toggleEye = () => setPasswordEye((previousState) => !previousState);

    const [loading, setLoading] = useState(false);

    const handleRegister = () => {
        setLoading(true);
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // signed in
                let user = userCredential.user;
                if (user) {
                    user.updateProfile({
                        displayName: name,
                        photoURL: imageUrl.length > 0 ? imageUrl : "https://cdn.business2community.com/wp-content/uploads/2014/04/profile-picture-300x300.jpg"
                    }).then(() => {
                        Alert.alert("successfully register");
                    }).catch((error) => {
                        Alert.alert("something went wrong");
                    });
                }
                // ...
            }).catch(e => {
                let errorCode = e.code;
                let errorMessage = e.message;
                Alert.alert("", errorMessage);
            }).finally(() => setLoading(false));
    }

    return (
        <ViewWithLoading loading={false}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.lottieContainer}>
                        <View style={styles.container}>
                            <LottieView style={{ flex: 0, backgroundColor: commonColor.transparent }} source={require("../../assets/lottiefiles/30786-online-chat.json")} autoPlay loop />
                        </View>
                    </View>
                    <View style={styles.formContainer}>
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

                        <TextField
                            style={styles.textFieldStyle}
                            value={email}
                            placeholder={'Email Address'}
                            onChange={setEmail}
                            textType={"emailAddress"}
                            autofocus={false}
                            shadow={true}
                            textLabel={"Email Address"}
                            required={true}
                        />

                        <TextField
                            style={styles.textFieldStyle}
                            value={password}
                            iconRightName={passwordEye ? "eye-off-outline" : "eye-outline"}
                            placeholder={'Password'}
                            iconVisible={true}
                            onPressRightIcon={toggleEye}
                            onChange={setPassword}
                            textType={"password"}
                            secureTextEntry={passwordEye}
                            autofocus={false}
                            shadow={true}
                            textLabel={"Password"}
                            required={true}
                        />

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

                        <ButtonComponent
                            title={'REGISTER'}
                            onPress={handleRegister}
                            type={ButtonType.primary}
                            style={{ width: '100%', alignSelf: 'center', marginTop: 15 }}
                            textStyle={{ fontSize: normalize(12), fontFamily: 'poppins-semibold', letterSpacing: 3 }}
                        />


                    </View>
                    <View style={styles.signUpcontainer}>
                        <TouchableLink
                            title={"Alread have an account? "}
                            onPress={() => navigation.navigate("Login")}
                            styleText={{
                                fontFamily: "poppins-light",
                                fontSize: normalize(12),
                            }}
                            underlineText={'Login here'}
                        />
                    </View>
                </ScrollView>
            </View>
        </ViewWithLoading>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    lottieContainer: {
        flex: 2,
    },
    formContainer: {
        flex: 0.5,
        paddingHorizontal: 20
    },
    textFieldStyle: {
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    signUpcontainer: {
        flex: 0.25,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 30,
        paddingHorizontal: 20,
    }
});