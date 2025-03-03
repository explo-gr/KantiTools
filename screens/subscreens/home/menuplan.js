import { Text, View, Button, StyleSheet } from 'react-native';
//Menüplan Screen

// https://www.npmjs.com/package/react-native-pdf
// take a look at this

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