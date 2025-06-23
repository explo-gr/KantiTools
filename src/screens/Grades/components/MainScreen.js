// imports regarding general objects
import { Text, View, Button, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import { DataProvider } from '../../../context/DataContext';
import GradesList from './GradesList';
import { AuthProvider } from '../../../context/AuthenticationContext';

const GradesMain = ({ navigation }) => {
    const { defaultThemedStyles } = useThemes();

    return (
        <AuthProvider>
            <DataProvider>
                <View style={[styles.container, defaultThemedStyles.view]}>
                    <Text style={defaultThemedStyles.text}>GradesScreen</Text>
                    <Button
                        title="Go to Screen2"
                        onPress={() => navigation.navigate('GradesDebug')}
                    />

                    <Button
                        title="Go to Screen3"
                        onPress={() => navigation.navigate('GradesGradeCalculation')}
                    />
                </View>
                <GradesList/>
            </DataProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default GradesMain;