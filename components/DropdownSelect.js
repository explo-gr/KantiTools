import { useState } from "react";
import { FlatList, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";

const DropdownSelect = ({ entries, onSelect, selectedItem }) => {
    const [ modalVisible, setModalVisible ] = useState(false);
    const closeModal = () => setModalVisible(false);

    rerurn (
        <View style={modalStyle.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={modalStyle.centeredView}>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <FlatList/>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

const modalStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default DropdownSelect;

//https://reactnative.dev/docs/modal
//https://reactnative.dev/docs/flatlist