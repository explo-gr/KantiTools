import { useState, useEffect, useCallback } from "react";
import {
    View,
    TextInput,
    Modal,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Text
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TranslatedText from "../../../components/translations/TranslatedText";
import { useThemes } from "../../../context/ThemeContext";
import Feather from '@expo/vector-icons/Feather';
import Accordion from "../../../components/common/Accordion";

const TINT_COLORS = ["red", "green", "blue", "yellow"];
// red, green, blue, yellow

const TodoModal = ({ visible, onOk, onCancel }) => {
    const { defaultThemedStyles, colors, theme } = useThemes();
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ tint, setTint ] = useState(TINT_COLORS[0]);

    const getColorCode = useCallback((color) => colors[color] || colors.generic, [theme]);

    const handleOk = () => {
        if (!title.trim()) return;
        onOk({ title, description, tint });
        setTitle('');
        setDescription('');
        setTint(TINT_COLORS[0]);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            statusBarTranslucent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalContainer, defaultThemedStyles.card, defaultThemedStyles.boxshadow]}>
                    <TranslatedText style={[styles.label, defaultThemedStyles.text]}>re_title</TranslatedText>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter title"
                        style={[styles.input, defaultThemedStyles.text]}
                        placeholderTextColor={colors.gray}
                    />

                    <TranslatedText style={[styles.label, defaultThemedStyles.text]}>Description</TranslatedText>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter description"
                        style={[styles.input, { height: 80 }, defaultThemedStyles.text]}
                        multiline
                        placeholderTextColor={colors.gray}
                    />

                    <TranslatedText style={[styles.label, defaultThemedStyles.text]}>Tint</TranslatedText>
                    <View style={styles.tintRow}>
                        {TINT_COLORS.map((color) => (
                            <TouchableOpacity
                                key={color}
                                style={[styles.tintCircle, { backgroundColor: getColorCode(color), borderWidth: tint === color ? 3 : 1 }]}
                                onPress={() => setTint(color)}
                            />
                        ))}
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={onCancel} style={[styles.buttonShell, { backgroundColor: colors.yellow }]}> 
                            <TranslatedText style={defaultThemedStyles.textContrast}>Cancel</TranslatedText>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleOk} style={[styles.buttonShell, { backgroundColor: colors.blue }]}> 
                            <TranslatedText style={defaultThemedStyles.textContrast}>OK</TranslatedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const TodoList = () => {
    const { colors, theme } = useThemes();
    const [todos, setTodos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);

    const getColorCode = useCallback((color) => colors[color] || colors.generic, [theme]);

    useEffect(() => {
        AsyncStorage.getItem('todos').then(data => {
            if (data) setTodos(JSON.parse(data));
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (todo) => {
        setTodos(prev => [...prev, todo]);
        setModalVisible(false);
    };

    const handleDelete = (index) => {
        setTodos(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {todos.map((todo, index) => (
                    <Accordion
                        key={index}
                        title={todo.title}
                        //tint={getColorCode(todo.tint)}
                        isOpen={openIndex === index}
                        changeIsOpen={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        <TranslatedText>{todo.description}</TranslatedText>
                        <TouchableOpacity onPress={() => handleDelete(index)}>
                            <Feather name="trash" size={20} color={colors.yellow} />
                        </TouchableOpacity>
                    </Accordion>
                ))}
            </ScrollView>

            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.fab}
            >
            <View style={{ 
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: 3,
                borderColor: colors.blue,
                borderWidth: 3,
                borderRadius: 20,
                padding: 8,
                margin: 4
            }}>

                    <Feather name="plus" size={24} color={colors.hardContrast} />
                    <TranslatedText style={{

                    }}>re_create</TranslatedText>
                </View>
            </TouchableOpacity>


            <TodoModal
                visible={modalVisible}
                onOk={handleAddTodo}
                onCancel={() => setModalVisible(false)}
            />
        </View>
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
        width: '85%',
        alignItems: 'stretch',
        gap: 12
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10
    },
    tintRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 8
    },
    tintCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: '#333'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    },
    buttonShell: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    fab: {
        flex: 1,
        padding: 24,
        position: "absolute",
        left: '10%',
        top: '50%',
    }
});

export default TodoList;