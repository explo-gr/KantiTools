// imports regarding general objects
import { Text, View, Button, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import { DataProvider, useData } from '../../../context/DataContext';
import GradesList from './GradesList';
import { AuthProvider } from '../../../context/AuthenticationContext';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';

const Screen = ({ navigation }) => {
    const { defaultThemedStyles } = useThemes();
    const { refreshAll } = useData();
    const { grades } = useData();

    return (
        <ContainerView>
            <Header title={'Grades'}/>
            <GradesList/>
        </ContainerView>
    );
}

const GradesMain = ({ navigation }) => {
    return (
        <AuthProvider>
            <DataProvider>
                <Screen
                    navigation={navigation}
                />
            </DataProvider>
        </AuthProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default GradesMain;