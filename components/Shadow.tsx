import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
    style?: StyleProp<ViewStyle>;
    children: any;
}

export default function ShadowContainer(props: IProps) {
    return (
        <View style={styles.shadow}>
            {props.children}
        </View>
    );
}


const styles = StyleSheet.create({
    shadow: {
        flex: 0,
        width: '100%',
        shadowColor: undefined, // IOS
        shadowOffset: { height: 3, width: 0 }, // IOS
        shadowOpacity: 0.2, // IOS
        shadowRadius: 4, //IOS
        elevation: 5, // Android
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },
});