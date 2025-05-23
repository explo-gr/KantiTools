import { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import TranslatedText from "../translations/TranslatedText";
import { useThemes } from "../../context/ThemeContext";

const AlertBox = ({ visible, onOk, onCancel, message, showCancel = true }) => {
    const { defaultThemedStyles, colors } = useThemes();

    return (
        <Modal
            animationType="fade"
            transparent={true}
            statusBarTranslucent={true}
            visible={visible}
            onRequestClose={onCancel || onOk}
        >
            <View style={[styles.centeredView]}>
                <View style={[
                    styles.modalContainer,
                    defaultThemedStyles.card,
                    defaultThemedStyles.boxshadow
                ]}>
                    <TranslatedText style={[styles.messageText, defaultThemedStyles.text]}>
                        {message}
                    </TranslatedText>

                    <View style={styles.buttonRow}>
                        {showCancel && (
                            <TouchableOpacity
                                onPress={onCancel}
                                style={[styles.buttonShell, {
                                    backgroundColor: colors.warning,
                                    borderColor: colors.warningContrast
                                }]}
                            >
                                <TranslatedText style={[styles.buttonText, defaultThemedStyles.textContrast]}>
                                    Cancel
                                </TranslatedText>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            onPress={onOk}
                            style={[styles.buttonShell, {
                                backgroundColor: colors.success,
                                borderColor: colors.successContrast
                            }]}
                        >
                            <TranslatedText style={[styles.buttonText, defaultThemedStyles.textContrast]}>
                                OK
                            </TranslatedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        padding: 24,
        borderRadius: 16,
        width: '80%',
        alignItems: 'center'
    },
    messageText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10
    },
    buttonShell: {
        flex: 1,
        height: 50,
        borderWidth: 2,
        borderRadius: 22.5,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default AlertBox;