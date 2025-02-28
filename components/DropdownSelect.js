import { useContext, useState } from "react";
import { FlatList, Modal, StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import TranslatedText from "./TranslatedText";
import { ThemeContext } from "../context/ThemeContext";
import ScaleOnFocus from "./ScaleOnFocus";
import Feather from '@expo/vector-icons/Feather';


const DropdownSelect = ({ entries, onSelect, selectedItem }) => {
    const [ modalVisible, setModalVisible ] = useState(false);
    const { defaultThemedStyles, colors } = useContext(ThemeContext);

    const { height, width } = useWindowDimensions();
    const maxHeight = Math.floor(height * 0.7);
    
    const Item = ({ item }) => {
        const isSelected = item === selectedItem;
        const itemStlye =
            isSelected
                ? {
                    text: defaultThemedStyles.textContrast,
                    view: defaultThemedStyles.cardHighlight
                }
                : {
                    text: defaultThemedStyles.text,
                    view: defaultThemedStyles.card
                };

        return (
            <TouchableOpacity
                onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                }}
            >
                <ScaleOnFocus
                    isFocused={isSelected}
                    from={0.95}
                    to={1.0}
                >
                    <View style={[styles.entryView, itemStlye.view]}>
                        <TranslatedText style={[styles.entryText, itemStlye.text]}>
                            { item }
                        </TranslatedText>
                    </View>
                </ScaleOnFocus>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
            >
                <View style={[{backgroundColor: colors.generic, borderColor: colors.blue}, styles.buttonShell, defaultThemedStyles.boxshadow]}>
                    <Feather name="chevron-down" size={24} color={colors.blue} />
                    <TranslatedText style={{color: colors.hardContrast, marginRight: 3}}>
                        { selectedItem || '---' }
                    </TranslatedText>
                </View>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                statusBarTranslucent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={[{ maxHeight, width: width * 0.7 }, styles.modalContainer, defaultThemedStyles.card, defaultThemedStyles.boxshadow]}>
                    <FlatList
                        data={entries}
                        keyExtractor={item => item}
                        renderItem={({ item }) => <Item item={item}/> }
                    />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        padding: 24,
        position: "absolute",
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    entryText: {
        fontWeight: 'bolder',
        fontSize: 30,
    },
    entryView: {
        alignSelf: 'center',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    buttonShell: {
        height: 50,
        maxWidth: 200,
        minWidth: 100,
        borderWidth: 3,
        borderRadius: 22.5,
        padding: 6,

        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
});

export default DropdownSelect;

//https://reactnative.dev/docs/modal
//https://reactnative.dev/docs/flatlist