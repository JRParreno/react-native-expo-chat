import * as React from 'react';
import { KeyboardAvoidingView, StatusBar, Platform, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Loader from "./Loader";
import { HeaderHeightContext } from "@react-navigation/elements";
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
    children: React.ReactNodeArray | React.ReactNode,
    style?: StyleProp<ViewStyle>,
    loading: boolean,
}

const ViewWithLoading = ({ children, style, loading }: HeaderProps) => (
    <HeaderHeightContext.Consumer>
        {headerHeight => (
            <KeyboardAvoidingView
                style={[style, {
                    flex: 1,
                    backgroundColor: 'white',
                }]}
                behavior={Platform.select({ ios: 'height' })}
                keyboardVerticalOffset={(headerHeight || 0)}
            >
                <SafeAreaView style={[styles.container, {
                    flex: 1,
                    zIndex: 1
                }]}>
                    {children}
                    {loading && <Loader />}
                </SafeAreaView>
            </KeyboardAvoidingView>
        )}
    </HeaderHeightContext.Consumer>
)

export default ViewWithLoading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})
