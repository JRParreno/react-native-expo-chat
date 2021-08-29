import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native'
import ViewWithLoading from '../../components/ViewWithLoading';
import LottieView from 'lottie-react-native';
import { commonColor } from '../../constants/Colors';
import TextField from '../../components/TextInput/TextField';
import { useEffect, useState } from 'react';
import ButtonComponent, { ButtonType } from '../../components/Button/ButtonComponent';
import { normalize } from '../../constants/FontStyles';
import TouchableLink from '../../components/TouchableLink/TouchableLink';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../../firebase';


export default function LoginScreen() {

    const navigation = useNavigation();

    // fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordEye, setPasswordEye] = useState(true);
    const toggleEye = () => setPasswordEye((previousState) => !previousState);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate('Chat');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert(errorMessage);
            }).finally(() => setLoading(false));
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate('Chat');
            } else {
                // User is signed out
                // ...
            }
        });
        return unsubscribe;
    }, []);

    return (
        <ViewWithLoading loading={loading}>
            <View style={styles.container}>
                <View style={styles.lottieContainer}>
                    <View style={styles.container}>
                        <LottieView style={{ flex: 0, backgroundColor: commonColor.transparent }} source={require("../../assets/lottiefiles/68030-user-profile.json")} autoPlay loop />
                    </View>
                </View>
                <View style={styles.formContainer}>
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
                    <ButtonComponent
                        title={'LOGIN'}
                        onPress={handleLogin}
                        type={ButtonType.primary}
                        style={{ width: '100%', alignSelf: 'center', marginTop: 15 }}
                        textStyle={{ fontSize: normalize(12), fontFamily: 'poppins-semibold', letterSpacing: 3 }}
                    />
                </View>
                <View style={styles.signUpcontainer}>
                    <TouchableLink
                        title={"Don't have an account yet? "}
                        onPress={() => navigation.navigate("Register")}
                        styleText={{
                            fontFamily: "poppins-light",
                            fontSize: normalize(12),
                        }}
                        underlineText={'Sign Up'}
                    />
                </View>
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
        paddingTop: 20,
    },
    formContainer: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    textFieldStyle: {
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    signUpcontainer: {
        flex: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 30
    }
});