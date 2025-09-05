import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Accordion from '../../../components/common/Accordion';
import LoadingIndicator from '../../../components/common/LoadingIndicator';
import { useTranslations } from '../../../context/LanguageContext';
import { useThemes } from '../../../context/ThemeContext';
import TodoModal from './TodoModal';
import { useShowAlert } from '../../../hooks/useShowAlert';

import CreateTodoButton from './list/CreateTodoButton';
import EmptyListMsg from './list/EmptyListMsg';
import TodoActions from './list/TodoActions';
import TodoDescription from './list/TodoDescription';

const TODO_STORAGE_KEY = 'todos';

const TodoList = ({
    filterFn = (args) => args,
}) => {
    const { colors, theme } = useThemes();
    const { t, language } = useTranslations();
    const showAlert = useShowAlert();

    const [todos, setTodos] = useState([]);
    const [todosToRender, setTodosToRender] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

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

    const handleAddTodo = (todo) => {
        if (todo.id && todos.find((t) => t.id === todo.id)) {
            // editing existing todo
            setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)));
        } else {
            // creating new
            setTodos((prev) => [...prev, todo]);
        }

        setTodoToEdit(null);
        setEditId(null);
        setModalVisible(false);
    };

    const handleDelete = useCallback((id) => {
        setTodos((prev) => {
            const updated = prev.filter((t) => t.id !== id);
            return updated;
        });
    }, []);

    const handleDeletePrompt = useCallback(
        (id) => {
            showAlert({
                title: t('re_del'),
                message: t('re_del_msg'),
                buttons: ENTRY.CANCEL_DELETE(t, () => handleDelete(id))
            });
        },
        [language]
    );

    const handleEdit = useCallback((item) => {
        setTodoToEdit(item);
        setModalVisible(true);
    }, []);

    const handleModalCancel = useCallback(() => {
        setModalVisible(false);
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

    useEffect(() => {
        setTodosToRender(filterFn(todos));
    }, [todos, filterFn]);

    const renderTodoItem = useCallback(
        ({ item }) => (
            <View style={styles.rootContainer}>
                <Accordion
                    title={item.title}
                    isOpen={!!isOpen[item.id]}
                    tint={`${getColorCode(item.tint)}29`}
                    changeIsOpen={handleOpen}
                    accordionKey={item.id}
                >
                    <TodoDescription description={item.description} />
                    <TodoActions
                        onEdit={() => handleEdit(item)}
                        onDelete={() => handleDeletePrompt(item.id)}
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

    return (
        <>
            {todos.length > 0 ? (
                <FlatList
                    data={todosToRender}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTodoItem}
                    contentContainerStyle={styles.flatListContent}
                    updateCellsBatchingPeriod={80}
                    maxToRenderPerBatch={6}
                    removeClippedSubviews
                />
            ): (
                <EmptyListMsg/>
            )}
            <CreateTodoButton onPress={() => setModalVisible(true)} />
            <View>
                <TodoModal
                    visible={modalVisible}
                    onOk={handleAddTodo}
                    onCancel={handleModalCancel}
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
        paddingBottom: 200
    },
});

export default TodoList;