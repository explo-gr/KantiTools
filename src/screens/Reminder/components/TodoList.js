import { useState, useEffect, useCallback } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert,
    Pressable,
    Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TranslatedText from '../../../components/translations/TranslatedText';
import { useThemes } from '../../../context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import Accordion from '../../../components/common/Accordion';
import { useTranslations } from '../../../context/LanguageContext';
import ScaleOnFocus from '../../../components/utils/ScaleOnFocus';

const TINT_COLORS = ['red', 'yellow', 'green', 'lightblue', 'purple'];

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
        onOk({
            title: title.trim(),
            description: description.trim(),
            tint
        }, editIndex);
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
            <Pressable style={styles.centeredView} onPress={Keyboard.dismiss}>
                <View style={[styles.modalContainer, defaultThemedStyles.card, defaultThemedStyles.boxshadow]}>
                    <TranslatedText style={[styles.label, defaultThemedStyles.text]}>re_title</TranslatedText>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder={t('re_phd_title')}
                        style={[{
                            borderColor: colors.blue
                        }, styles.input, defaultThemedStyles.text]}
                        placeholderTextColor={colors.gray}
                    />
                    <TranslatedText style={[styles.label, defaultThemedStyles.text]}>re_description</TranslatedText>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder={t('re_phd_description')}
                        style={[{
                            borderColor: colors.blue
                        }, styles.input, defaultThemedStyles.text]}
                        multiline
                        numberOfLines={5}
                        placeholderTextColor={colors.gray}
                    />

                    <TranslatedText style={[styles.label, defaultThemedStyles.text]}>re_tint</TranslatedText>
                    <View style={styles.tintRow}>
                        {TINT_COLORS.map((color) => (
                            <ScaleOnFocus
                                from={0.9}
                                to={1.15}
                                isFocused={tint === color}
                                key={`sof-${color}`}
                            >
                                <TouchableOpacity
                                    key={`to-${color}`}
                                    style={[{
                                        borderColor: colors.blue,
                                        backgroundColor: getColorCode(color),
                                        borderWidth: tint === color ? 3 : 1.5
                                    }, styles.tintCircle]}
                                    onPress={() => setTint(color)}
                                />
                            </ScaleOnFocus>
                        ))}
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={onCancel} style={[styles.buttonShell, { backgroundColor: colors.red }]}> 
                            <Feather name='x' size={22} color={colors.generic} />
                            <TranslatedText style={defaultThemedStyles.textContrast}>cancel</TranslatedText>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleOk} style={[styles.buttonShell, { backgroundColor: colors.blue }]}>
                            <Feather name='save' size={22} color={colors.generic} />
                            <TranslatedText style={defaultThemedStyles.textContrast}>save</TranslatedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

const EmptyListMsg = () => {
    const { colors } = useThemes();

    return (
        <View style={styles.emptyListContainer}>
            <TranslatedText style={[{
                color: colors.gray
            }, styles.emptyListText]}>
                re_empty
            </TranslatedText>
        </View>
    );
}

const TodoList = () => {
    const { colors, theme, defaultThemedStyles } = useThemes();
    const { t } = useTranslations();

    const [ todos, setTodos ] = useState([]);
    const [ modalVisible, setModalVisible ] = useState(false);

    const [ editIndex, setEditIndex ] = useState(null);
    const [ todoToEdit, setTodoToEdit ] = useState(null);

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

    const handleDeletePrompt = (index) => {
        Alert.alert(
            t('re_del'),
            t('re_del_msg'),
            [
                {
                    text: t('cancel'),
                    style: 'cancel'
                },
                {
                    text: t('delete'),
                    onPress: () => {
                        handleDelete(index);
                    },
                    style: 'destructive'
                },
            ],
            { cancelable: true }
        );
    };

    const handleEdit = (item, index) => {
        setEditIndex(index);
        setTodoToEdit(item);

        setModalVisible(true);
    }

    return (
        <>
            {
                todos.length > 0
                    ?   <FlatList
                            data={todos}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View style={styles.rootContainer}>
                                    <Accordion
                                        title={item.title}
                                        isOpen={!!isOpen[index]}
                                        changeIsOpen={() => handleOpen(index)}
                                        tint={getColorCode(item.tint)}
                                    >
                                        {
                                            item.description
                                                ?   <Text style={{ color: colors.hardContrast }}>{item.description}</Text>
                                                :   <TranslatedText style={[{
                                                    color: colors.gray
                                                }, styles.noDescrText]}>re_no_descr</TranslatedText>
                                        }
                                        <View style={styles.todoContentContainer}>
                                            <TouchableOpacity onPress={() => handleEdit(item, index)}>
                                                <Feather name='edit-2' size={22} color={colors.blue} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => handleDeletePrompt(index)}
                                            >
                                            <Feather name='trash-2' size={22} color={colors.red} />
                                            </TouchableOpacity>
                                        </View>
                                    </Accordion>
                                </View>
                            )}
                            contentContainerStyle={{ paddingBottom: 200 }}
                        />

                    :   <EmptyListMsg/>
            }

            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.fab}
            >
                <View style={[{ 
                    borderColor: colors.blue,
                    backgroundColor: colors.generic
                }, styles.fabContentContainer, defaultThemedStyles.boxshadow]}>

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
        width: '85%',
        alignItems: 'stretch',
        gap: 12
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1.2,
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 16,
        minHeight: 50,
        marginBottom: 6
    },
    tintRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 8
    },
    tintCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
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
        borderRadius: 18,
        flexDirection: 'row',
        gap: 3
    },
    fab: {
        position: 'absolute',
        padding: 5,
        bottom: 100,
        right: '1%'
    },
    fabContentContainer: {
        borderWidth: 2.5,
        borderRadius: 25,
        padding: 10,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 3
    },
    emptyListContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    emptyListText: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    rootContainer: {
        marginBottom: 8
    },
    noDescrText: {
        fontStyle: 'italic'
    },
    todoContentContainer: {
        gap: 12,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default TodoList;