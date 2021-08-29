import * as React from 'react';
import { ActivityIndicator, PixelRatio, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { commonColor } from '../constants/Colors';


export default function Loader() {
    return (
        <View style={styles.fullScreen}>
            {/* uncomment this to use default animation of react and remove lottie container */}
            {/* <View style={styles.container}>
                <ActivityIndicator size="large" color="#000"/>
            </View> */}

            <View style={styles.container}>
                <LottieView style={{ flex: 0, backgroundColor: commonColor.transparent }} source={require("../assets/lottiefiles/loading-animation.json")} autoPlay loop />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    container: {
        height: PixelRatio.getPixelSizeForLayoutSize(30),
        width: PixelRatio.getPixelSizeForLayoutSize(30),
        borderRadius: 60,
        opacity: 0.8,
    },
});
