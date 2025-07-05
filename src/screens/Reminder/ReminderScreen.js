// imports regarding general objects
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext, useThemes } from '../../context/ThemeContext';
import TodoList from './components/TodoList';
import ContainerView from '../../components/common/ContainerView';
import Header from '../../components/common/Header';

const ReminderScreen = () => {
    //const { defaultThemedStyles } = useThemes();

    return (
        <ContainerView>
            <Header title={'Reminder'}/>
            <TodoList/>
        </ContainerView>
    );
}

export default ReminderScreen;