// imports regarding general objects
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';

const GradesMain = ({ navigation }) => {
    const { defaultThemedStyles } = useThemes();

    return (
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