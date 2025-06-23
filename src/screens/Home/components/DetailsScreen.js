import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useThemes } from '../../../context/ThemeContext';
import Accordion from '../../../components/common/Accordion';
import SchulnetzNotenTest from '../../../components/utils/SchulnetzNotenTest';
import Feather from '@expo/vector-icons/Feather';  

// Details Screen

const HomeDetails = ({ navigation }) => {
    const [state, setState] = useState(false);

    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
            <SchulnetzNotenTest/>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
            <Accordion
                isOpen={state}
                changeIsOpen={(state) => setState(state)}
                title={"Titel Registerkarte"}
            >
                <View>
                    <Text>Kaffe</Text>
                    <Feather name="coffee" size={50} color="black" />
                </View>
            </Accordion>
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

export default HomeDetails;