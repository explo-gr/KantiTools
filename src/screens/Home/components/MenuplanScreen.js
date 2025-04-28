import { Text, View, Button, StyleSheet } from 'react-native';

// https://www.npmjs.com/package/react-native-pdf
// take a look at this

// Menuplan Screen
const HomeMenuplan = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeMenuplan;