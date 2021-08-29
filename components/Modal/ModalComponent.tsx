import { useState } from "react";
import { View, Text, Modal, StyleSheet, Alert, Pressable, TouchableOpacity } from "react-native";
import * as React from "react";
import { ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { font, normalize } from "../../constants/FontStyles";
import { commonColor } from "../../constants/Colors";

interface IProps {
    title: string;
    visible: boolean;
    data: any;
    selectItem?: any;
    onClose?: () => void,
    onPress?: () => void;
    onSelect?: (value: string) => void;
}

export default function ModalComponent(props: IProps) {

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.visible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {props.onClose && (
                            <Ionicons name={'close-outline'} size={30} color={commonColor.main}
                                onPress={() => {
                                    props.onClose()
                                }}
                                style={styles.onCloseIcon}
                            />
                        )}
                        <View style={{ flex: 0, width: "100%", justifyContent: "flex-start", padding: 5 }}>
                            <View style={styles.modalTop}>
                                <Text style={[styles.modalText, { fontSize: normalize(15) }]}>{props.title}</Text>
                            </View>
                            <View style={styles.listContainer}>
                                {
                                    props.data.map((item, i) => (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => {
                                                props.onSelect(item.label);
                                            }}

                                        >
                                            <ListItem key={i} bottomDivider>
                                                <ListItem.Content>

                                                    <ListItem.Title style={[styles.title, { fontWeight: props.selectItem === item.label ? "bold" : "normal" }]}>{item.label}</ListItem.Title>

                                                </ListItem.Content>
                                                {props.selectItem === item.label && (
                                                    <Ionicons name="checkmark-outline" size={24} />
                                                )}
                                            </ListItem>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        overflow: "hidden"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

    title: {
        width: "100%",
        textAlign: "left",
        fontSize: font.title,
        color: "#262626"
    },
    onCloseIcon: {
        flex: 1,
        zIndex: 2,
        position: "absolute",
        padding: 13,
        right: -5,
        top: -10,
        backgroundColor: commonColor.transparent
    },
    modalText: {
        marginBottom: 15,
        textAlign: "left",
        paddingLeft: 15,
        color: commonColor.main
    },
    modalTop: {
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#878787'
    },
    listContainer: {
        width: "100%",
        justifyContent: "center",
    },
});