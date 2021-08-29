import { Text, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import * as React from "react";
import { commonColor } from "../../constants/Colors";

export enum LinkType {
    primary,
    secondary,
    white,
}

interface IProps {
    title: string;
    onPress: () => void;
    type?: LinkType;
    style?: StyleProp<ViewStyle>;
    styleText?: StyleProp<TextStyle>;
}

function textStyle(type: LinkType): StyleProp<TextStyle> {
    switch (type) {
        case LinkType.primary:
            return {
                color: commonColor.main,
            };
        case LinkType.secondary:
            return {
                color: '#575757',
            };
        default:
            return {
                color: 'white',
            };
    }
}

export default function TouchableLink(props: IProps) {
    return (
        <TouchableOpacity onPress={props.onPress} style={[
            styles.container,
            props.style
        ]}>
            <Text style={[
                textStyle(props.type || LinkType.primary)
                , props.styleText]}
                allowFontScaling
                adjustsFontSizeToFit
                numberOfLines={1}
            >
                <Text style={[props.styleText]}>{props.title}</Text>
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});
