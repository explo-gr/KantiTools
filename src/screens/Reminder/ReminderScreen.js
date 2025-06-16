// imports regarding general objects
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext, useThemes } from '../../context/ThemeContext';
import TodoList from './components/TodoList';
import ContainerView from '../../components/common/ContainerView';

const ReminderScreen = () => {
    //const { defaultThemedStyles } = useThemes();

    return (
        <ContainerView>
            <TodoList/>
        </ContainerView>
    );
}

export default ReminderScreen;