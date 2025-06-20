import { Text, View, Button, StyleSheet } from 'react-native';
import { openMenuplanPDF } from '../../../lib/menuplanHelper';

// https://www.npmjs.com/package/react-native-pdf
// take a look at this

// sött kei bildschrim sii
// interaktiv -> ma gseht dass öppis grad abbagladda würd oder sust was
// fehler mäldig

// Menuplan Screen
const HomeMenuplan = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
            <Button title='Menuplan' onPress={openMenuplanPDF} />
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