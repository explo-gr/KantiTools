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

const TodoActions = ({ onEdit, onDelete }) => {
    const { colors } = useThemes();

    return (
        <View style={styles.todoContentContainer}>
            <TouchableOpacity hitSlop={3} onPress={onEdit}>
                <Feather name='edit-2' size={22} color={colors.accent} />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={3} onPress={onDelete}>
                <Feather name='trash-2' size={22} color={colors.red} />
            </TouchableOpacity>
        </View>
    );
};

const TodoDescription = ({ description }) => {
    const { colors } = useThemes();

    if (description) {
        return (
            <Text style={[{ color: colors.hardContrast }, styles.descrText]}>
                {description}
            </Text>
        );
    }

    return (
        <TranslatedText style={[{ color: colors.gray }, styles.noDescrText]}>
            re_no_descr
        </TranslatedText>
    );
};

const TodoList = () => {
    const { colors, theme, defaultThemedStyles } = useThemes();
    const { t, language } = useTranslations();

    const [ todos, setTodos ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ modalVisible, setModalVisible ] = useState(false);

    const [ editIndex, setEditIndex ] = useState(null);
    const [ todoToEdit, setTodoToEdit ] = useState(null);

    const [ isOpen, setIsOpen ] = useState({});

    const handleOpen = useCallback((id) =>
        setIsOpen(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    , []);

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

    const handleDelete = useCallback((index) => {
        setTodos(prev => {
            const updated = prev.filter((_, i) => i !== index);
            setIsOpen({});
            return updated;
        });
    }, []);

    const handleDeletePrompt = useCallback((index) => {
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
                    onPress: () => handleDelete(index),
                    style: 'destructive'
                },
            ],
            { cancelable: true }
        );
    }, [language]);

    const handleEdit = useCallback((item, index) => {
        setEditIndex(index);
        setTodoToEdit(item);
        setModalVisible(true);
    }, []);

    const handleModalCancel = useCallback(() => {
        setModalVisible(false);
        setEditIndex(null);
        setTodoToEdit(null);
    }, []);

    useEffect(() => {
        AsyncStorage.getItem(TODO_STORAGE_KEY).then(data => {
            if (data) {
                setTodos(JSON.parse(data));
            };
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const renderTodoItem = useCallback(({ item, index }) => (
        <View style={styles.rootContainer}>
            <Accordion
                title={item.title}
                isOpen={!!isOpen[index]}
                tint={getColorCode(item.tint)}
                changeIsOpen={handleOpen}
                accordionKey={index}
            >
                <TodoDescription description={item.description} />
                <TodoActions
                    onEdit={() => handleEdit(item, index)}
                    onDelete={() => handleDeletePrompt(index)}
                />
            </Accordion>
        </View>
    ), [isOpen, getColorCode, handleOpen, handleEdit, handleDeletePrompt]);

    if (isLoading) {
        return (
            <View style={styles.loadingIndContainer}>
                <LoadingIndicator status={t('loading')}/>
            </View>
        );
    }

    if (!todos.length) {
        return <EmptyListMsg/>;
    }

    return (
        <>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={renderTodoItem}
                contentContainerStyle={styles.flatListContent}
                updateCellsBatchingPeriod={80}
                maxToRenderPerBatch={6}
                removeClippedSubviews
            />

            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.fab}
            >
                <View style={[{ 
                    borderColor: colors.accent,
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
                    onCancel={handleModalCancel}
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
        gap: 16,
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
    },
    flatListContent: {
        paddingBottom: 200
    }
});

export default TodoList;