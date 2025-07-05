import { useState, useEffect, useCallback } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TranslatedText from '../../../components/translations/TranslatedText';
import { useThemes } from '../../../context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import Accordion from '../../../components/common/Accordion';
import { useTranslations } from '../../../context/LanguageContext';

const TINT_COLORS = ['red', 'green', 'blue', 'yellow'];
// red, green, blue, yellow

const TodoModal = ({ visible, onOk, onCancel, todoToEdit, editIndex }) => {
    const { defaultThemedStyles, colors, theme } = useThemes();
    const { t } = useTranslations();

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ tint, setTint ] = useState(TINT_COLORS[0]);

    const getColorCode = useCallback((color) => colors[color] || colors.generic, [theme]);

    useEffect(() => {
        if (todoToEdit) {
            setTitle(todoToEdit.title);
            setDescription(todoToEdit.description);
            setTint(todoToEdit.tint);
        }
    }, [todoToEdit]);

    const handleOk = () => {
        if (!title.trim()) return;
        onOk({ title, description, tint }, editIndex);
        setTitle('');
        setDescription('');
        setTint(TINT_COLORS[0]);
    };

    return (
        <Modal
            animationType='fade'
            statusBarTranslucent={true}
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalContainer, defaultThemedStyles.card, defaultThemedStyles.boxshadow]}>
                    <TranslatedText style={[styles.label, defaultThemedStyles.text]}>re_title</TranslatedText>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder={t('re_phd_title')}
                        style={[styles.input, defaultThemedStyles.text]}
                        placeholderTextColor={colors.gray}
                    />

                    <TranslatedText style={[styles.label, defaultThemedStyles.text]}>re_description</TranslatedText>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder={t('re_phd_description')}
                        style={[styles.input, { height: 80 }, defaultThemedStyles.text]}
                        multiline
                        placeholderTextColor={colors.gray}
                    />

                    <TranslatedText style={[styles.label, defaultThemedStyles.text]}>re_tint</TranslatedText>
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
                        <TouchableOpacity onPress={onCancel} style={[styles.buttonShell, { backgroundColor: colors.red }]}> 
                            <TranslatedText style={defaultThemedStyles.textContrast}>cancel</TranslatedText>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleOk} style={[styles.buttonShell, { backgroundColor: colors.blue }]}> 
                            <TranslatedText style={defaultThemedStyles.textContrast}>ok</TranslatedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const TodoList = () => {
    const { colors, theme, defaultThemedStyles } = useThemes();
    const [todos, setTodos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [editIndex, setEditIndex] = useState(null);
    const [todoToEdit, setTodoToEdit] = useState(null);

    const [ isOpen, setIsOpen ] = useState({});

    const handleOpen = (i) => {
        setIsOpen(prev => ({
            ...prev,
            [i]: !prev[i]
        }));
    };

    const getColorCode = useCallback((color) => colors[color] || colors.generic, [theme]);

    useEffect(() => {
        AsyncStorage.getItem('todos').then(data => {
            if (data) setTodos(JSON.parse(data));
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (todo, index) => {
        if (typeof index === 'number') {
            const updated = [...todos];
            updated[index] = todo;

            setTodos(updated);
        } else {
            setTodos(prev => [...prev, todo]);
        }

        setTodoToEdit(null);
        setEditIndex(null);
        setModalVisible(false);
    };

    const handleDelete = (index) => {
        setTodos(prev => prev.filter((_, i) => i !== index));
    };

    const handleEdit = (item, index) => {
        setEditIndex(index);
        setTodoToEdit(item);

        setModalVisible(true);
    }

    return (
        <>
            <FlatList
                data={todos}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={{
                        marginBottom: 5
                    }}>
                        <Accordion
                            title={item.title}
                            isOpen={!!isOpen[index]}
                            changeIsOpen={() => handleOpen(index)}
                            tint={getColorCode(item.tint)}
                        >
                            <Text style={{ color: colors.hardContrast }}>{item.description}</Text>
                            <View style={{
                                gap: 10,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}>
                                <TouchableOpacity onPress={() => {
                                    handleEdit(item, index);
                                }}>
                                    <Feather name='edit-2' size={22} color={colors.blue} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(index)}>
                                    <Feather name='trash' size={22} color={colors.red} />
                                </TouchableOpacity>
                            </View>
                        </Accordion>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.fab}
            >
            <View style={[{ 
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 3,
                borderColor: colors.blue,
                borderWidth: 2.5,
                borderRadius: 30,
                padding: 9,
                margin: 4,
                backgroundColor: colors.generic
            }, defaultThemedStyles.boxshadow]}>

                    <Feather name='plus' size={24} color={colors.hardContrast} />
                    <TranslatedText style={{ color: colors.hardContrast }}>re_create</TranslatedText>
                </View>
            </TouchableOpacity>

            <View>
                <TodoModal
                    visible={modalVisible}
                    onOk={handleAddTodo}
                    onCancel={() => {
                        setModalVisible(false);
                        setEditIndex(null);
                        setTodoToEdit(null);
                    }}
                    editIndex={editIndex}
                    todoToEdit={todoToEdit}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalContainer: {
        padding: 24,
        borderRadius: 16,
        width: '85%',
        alignItems: 'stretch',
        gap: 12,
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
        position: 'absolute',
        padding: 5,
        bottom: 100,
        right: 15
    }
});

export default TodoList;