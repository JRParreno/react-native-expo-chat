import {
    StyleProp,
    StyleSheet,
    TextStyle,
    ViewStyle,
    TextInput,
    View,
    Text,
    Pressable,
    Alert,
    TouchableOpacity
} from "react-native";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { font, normalize } from "../../constants/FontStyles";
import { commonColor } from "../../constants/Colors";
import { useState } from "react";
import ModalComponent from "../Modal/ModalComponent";
import { ListItem } from "react-native-elements";


interface IProps {
    title: string;
    data: any,
    style?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    value: string;
    placeholder?: string;
    onChange?: any;
    textStyle?: StyleProp<TextStyle>;
    onPress?: () => void;
    iconLeftName?: any;
    iconRightName?: any;
    onPressRightIcon?: () => void;
    onPressLeftIcon?: () => void;
    iconVisible?: boolean;
    iconColor?: StyleProp<TextStyle>;
    helpText?: string;
    textLabel?: string;
    required?: boolean
}

export default function Dropdown(props: IProps) {

    const [modalVisible, setModalVisible] = useState(false);
    const toggleVisible = () => setModalVisible((previousState) => !previousState);

    return (
        <Pressable
            onPress={toggleVisible}
            style={styles.container}>
            {props.textLabel && (
                <Text style={styles.textLabel}>
                    {props.textLabel}
                    {props.required && (
                        <Text style={{ color: 'red' }}>*</Text>
                    )}
                </Text>
            )}

            <View style={[styles.inputSection, props.style]}>
                {props.iconLeftName ? <Ionicons name={props.iconLeftName} size={20} style={[styles.iconStyle, { display: props.iconVisible ? "flex" : "none" }]} onPress={props.onPressLeftIcon} /> : null}
                <Text style={styles.textInput}>{props.value}</Text>
                {props.iconRightName ? <Ionicons name={props.iconRightName} size={20} style={[styles.iconStyle, { display: props.iconVisible ? "flex" : "none" }]} onPress={props.onPressRightIcon} /> : null}

            </View>
            {props.helpText && (
                <Text
                    numberOfLines={4}
                    style={styles.helpText}
                >{props.helpText}</Text>
            )}

            <ModalComponent
                title={props.title}
                visible={modalVisible}
                data={props.data}
                onClose={toggleVisible}
                onSelect={props.onChange}
                selectItem={props.value}
            />
        </Pressable>
    );
}
const styles = StyleSheet.create({
    button: {
        flex: 0,
        textAlign: "center",
        alignItems: "center",
        borderRadius: 10,
        paddingHorizontal: 16,
        shadowColor: undefined,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 2,
    },
    container: {
        flex: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        // borderWidth: 1
    },
    inputSection: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
        color: "#fff",
        borderColor: commonColor.main,
        borderWidth: 1,
        borderRadius: 8,
    },
    iconStyle: {
        alignSelf: 'center',
        paddingLeft: 2,
        color: commonColor.black,
    },
    text: {
        fontSize: normalize(12),
        fontFamily: 'poppins-regular',
    },
    textInput: {
        paddingLeft: 10,
        flex: 1,
        textAlign: 'left',
        alignSelf: 'center',
        fontSize: font.title,
        fontFamily: 'poppins-light',
        color: "#262626",
        paddingVertical: 0,
    },
    helpText: {
        fontFamily: 'poppins-light',
        fontSize: font.label,
        color: '#878787',
        textAlign: 'justify',
        marginTop: 10
    },
    textLabel: {
        fontSize: normalize(12),
        fontFamily: 'poppins-regular',
        color: "#262626",
    },
});
