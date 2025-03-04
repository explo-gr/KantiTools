// imports regarding general objects
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useThemes } from '../context/ThemeContext';
import { createStackNavigator } from '@react-navigation/stack';
import SchulnetzNotenTest from '../components/SchulnetzNotenTest';

const GradesMain = ({ navigation }) => {
    const { defaultThemedStyles } = useThemes();

    return (
        <View style={[styles.container, defaultThemedStyles.view]}>
            <Text style={defaultThemedStyles.text}>GradesScreen</Text>
            <Button
                title="Go to Screen2"
                onPress={() => navigation.navigate('GradesDebug')}
            />
            <StatusBar style="auto" />
        </View>
    );
}
    
const GradesDebug = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>GradesDebug</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <SchulnetzNotenTest />
        </View>
    );
}

const Stack = createStackNavigator();

const GradesScreen = () => {
    return (
    <Stack.Navigator>
        <Stack.Screen name="GradesMain" component={GradesMain} options={{ headerShown: false }} />
        <Stack.Screen
        name="GradesDebug"
        component={GradesDebug}
        />
    </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default GradesScreen;