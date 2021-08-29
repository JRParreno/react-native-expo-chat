import * as React from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
    style?: StyleProp<ViewStyle>;
    children: any;
}

export default function FormContainer(props: IProps) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={[styles.scrollContainer, props.style]}>
                <View style={styles.formContainer}>
                    {props.children}
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    formContainer: {
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
        borderRadius: 10,
        marginBottom: 10,
        padding: 20,
    },
    textFieldStyle: {
        marginBottom: 10,
        padding: 10,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    }
});