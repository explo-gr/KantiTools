import { Text, View, Button, StyleSheet } from 'react-native';
import reconstructURL from '../../../utils/menuplanHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchTimeout from '../../../utils/fetchTimeout';

// https://www.npmjs.com/package/react-native-pdf
// take a look at this

const getMenuplanData = async () => {
    const { url, id } = reconstructURL();

    const getSavedID = async () => {
        try {
            return await AsyncStorage.getItem('menuplan-id');
        } catch (e) {
            console.error(e);
            return id; // Default to current ID if retrieval fails
        }
    };

    const scrapeMenuplan = async () => {
        try {
            const response = await fetchTimeout(url);
            if (!response.ok) throw new Error('Response was not ok');

            const data = await response.blob();
            await AsyncStorage.setItem('menuplan-raw', data);
            await AsyncStorage.setItem('menuplan-id', id);
            return data;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    try {
        const savedID = await getSavedID();

        if (savedID === id) {
            const cachedData = await AsyncStorage.getItem('menuplan-raw');
            if (cachedData) return cachedData;
        }

        return await scrapeMenuplan();
    } catch (e) {
        console.error(e);
        return null;
    }
};

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