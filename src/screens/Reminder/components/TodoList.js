import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import Accordion from '../../../components/common/Accordion';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import { useTranslations } from '../../../context/LanguageContext';
import { useThemes } from '../../../context/ThemeContext';
import TodoModal from './TodoModal';

import CreateTodoButton from './list/CreateTodoButton';
import EmptyListMsg from './list/EmptyListMsg';
import TodoActions from './list/TodoActions';
import TodoDescription from './list/TodoDescription';

const TODO_STORAGE_KEY = 'todos';

const TodoList = () => {
    const { colors, theme } = useThemes();
    const { t, language } = useTranslations();

    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const [editIndex, setEditIndex] = useState(null);
    const [todoToEdit, setTodoToEdit] = useState(null);

    const [isOpen, setIsOpen] = useState({});

    const handleOpen = useCallback(
        (id) =>
            setIsOpen((prev) => ({
                ...prev,
                [id]: !prev[id],
            })),
        []
    );

    const getColorCode = useCallback(
        (color) => colors[color] || colors.generic,
        [theme]
    );

    const handleAddTodo = (todo, index) => {
        if (typeof index === 'number') {
            const updated = [...todos];
            updated[index] = todo;
            setTodos(updated);
        } else {
            setTodos((prev) => [...prev, todo]);
        }

        setTodoToEdit(null);
        setEditIndex(null);
        setModalVisible(false);
    };

    const handleDelete = useCallback((index) => {
        setTodos((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            setIsOpen({});
            return updated;
        });
    }, []);

    const handleDeletePrompt = useCallback(
        (index) => {
            Alert.alert(
                t('re_del'),
                t('re_del_msg'),
                [
                    { text: t('cancel'), style: 'cancel' },
                    { text: t('delete'), onPress: () => handleDelete(index), style: 'destructive' },
                ],
                { cancelable: true }
            );
        },
        [language]
    );

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
        AsyncStorage.getItem(TODO_STORAGE_KEY).then((data) => {
            if (data) setTodos(JSON.parse(data));
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const renderTodoItem = useCallback(
        ({ item, index }) => (
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
        ),
        [isOpen, getColorCode, handleOpen, handleEdit, handleDeletePrompt]
    );

    if (isLoading) {
        return (
            <View style={styles.loadingIndContainer}>
                <LoadingIndicator status={t('loading')} />
            </View>
        );
    }

    if (!todos.length) {
        return <EmptyListMsg />;
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

            <CreateTodoButton onPress={() => setModalVisible(true)} />

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
    rootContainer: {
        marginBottom: 8,
    },
    loadingIndContainer: {
        margin: 15,
        flex: 1,
    },
    flatListContent: {
        paddingBottom: 200,
    },
});

export default TodoList;