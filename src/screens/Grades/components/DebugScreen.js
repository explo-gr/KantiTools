import { Text, View, Button } from 'react-native';
import SchulnetzNotenTest from '../../../components/utils/SchulnetzNotenTest';

const GradesDebug = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>GradesDebug</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <SchulnetzNotenTest />
        </View>
    );
}

export default GradesDebug;