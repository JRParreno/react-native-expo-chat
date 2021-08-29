import { Button, PixelRatio, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle, View, Text } from "react-native";
import * as React from "react";
import { commonColor } from "../../constants/Colors";
import { font, normalize } from "../../constants/FontStyles";

export enum ButtonType {
    primary,
    secondary,
    white,
    transparent,
    lightPrimary,
    clearSchedule,
    addSchedule
}

interface IProps {
    title: string;
    onPress: () => void;
    type: ButtonType;
    style?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    customPadding?: boolean;
}

function buttonTypeStyle(type: ButtonType): StyleProp<ViewStyle> {
    switch (type) {
        case ButtonType.primary:
            return {
                backgroundColor: commonColor.main,
            };
        case ButtonType.secondary:
            return {
                backgroundColor: commonColor.secondary,
            };
        case ButtonType.white:
            return {
                backgroundColor: commonColor.white,
            };
        case ButtonType.lightPrimary:
            return {
                backgroundColor: '#F1F6FE',
            };
        default:
            return {
                backgroundColor: commonColor.transparent,
            };
    }
}

function textStyle(type: ButtonType): StyleProp<TextStyle> {
    switch (type) {
        case ButtonType.primary:
        case ButtonType.secondary:
            return {
                color: 'white',
            };
        case ButtonType.clearSchedule:
            return {
                color: '#53287f',
            };
        case ButtonType.addSchedule:
            return {
                color: '#53287f',
                width: 100,
            };
        default:
            return {
                color: '#53287f',
            };
    }
}

export default function ButtonComponent(props: IProps) {
    return (
        <TouchableOpacity onPress={props.onPress} disabled={props.disabled} style={props.style}>
            <View style={[
                styles.button, props.buttonStyle,
                buttonTypeStyle(props.type),
                { paddingVertical: props.customPadding ? 0 : 10 }
            ]}>
                <Text style={[
                    styles.text,
                    textStyle(props.type),
                    props.textStyle
                ]}
                    allowFontScaling
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "stretch",
        borderRadius: 10,
        shadowColor: undefined, // IOS
        shadowOffset: { height: 3, width: 0 }, // IOS
        shadowOpacity: 0.4, // IOS
        shadowRadius: 4, //IOS
        elevation: 4, // Android
        backgroundColor: "white",
    },
    text: {
        textAlign: "center",
        fontFamily: 'poppins-light',
        paddingHorizontal: 10
    },
});
