import { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TranslatedText from '../../../components/translations/TranslatedText';
import { useThemes } from '../../../context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import Accordion from '../../../components/common/Accordion';
import { useTranslations } from '../../../context/LanguageContext';
import TodoModal from './TodoModal';
import LoadingIndicator from '../../../components/common/LoadingIndicator';

const TODO_STORAGE_KEY = 'todos';

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
    const [ isLoading, setIsLoading ] = useState(true);
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
        setTodos(prev => {
            const updated = prev.filter((_, i) => i !== index);
            setIsOpen({});

            return updated;
        });
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

    useEffect(() => {
        AsyncStorage.getItem(TODO_STORAGE_KEY).then(data => {
            if (data) {
                setTodos(JSON.parse(data));
                setIsLoading(false);
            };
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const renderTodoItem = ({ item, index }) => (
        <View style={styles.rootContainer}>
            <Accordion
                title={item.title}
                isOpen={!!isOpen[index]}
                changeIsOpen={() => handleOpen(index)}
                tint={getColorCode(item.tint)}
            >
                {
                    item.description
                        ?   <Text style={[{ color: colors.hardContrast }, styles.descrText]}>{item.description}</Text>
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
    );

    if (isLoading) {
        return (
            <View style={styles.loadingIndContainer}>
                <LoadingIndicator status={t('loading')}/>
            </View>
        );
    }

    return (
        <>
            {todos.length > 0
                ?   <FlatList
                        data={todos}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTodoItem}
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
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
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
    loadingIndContainer: {
        margin: 15,
        flex: 1
    },
    descrText: {
        fontSize: 14.5
    }
});

export default TodoList;