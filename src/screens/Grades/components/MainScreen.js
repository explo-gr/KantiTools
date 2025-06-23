// imports regarding general objects
import { Text, View, Button, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import { DataProvider } from '../../../context/DataContext';
import GradesList from './GradesList';
import { AuthProvider } from '../../../context/AuthenticationContext';
import ContainerView from '../../../components/common/ContainerView';

const Screen = ({ navigation }) => {
    const { defaultThemedStyles } = useThemes();

    return (
        <ContainerView>
            <Text style={defaultThemedStyles.text}>GradesScreen</Text>
            <Button
                title="Go to Screen2"
                onPress={() => navigation.navigate('GradesDebug')}
            />

            <Button
                title="Go to Screen3"
                onPress={() => navigation.navigate('GradesGradeCalculation')}
            />
            <GradesList/>
        </ContainerView>
    );
}

const GradesMain = () => {
    return (
        <AuthProvider>
            <DataProvider>
                <Screen/>
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