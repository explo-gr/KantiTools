import { ActivityIndicator } from 'react-native';
import { View, Text } from 'react-native';

const LoadingIndicator = ({ status='' }) => {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5
        }}>
            <ActivityIndicator size='large' />
            <Text>{status}</Text>
        </View>
    );
}

export default LoadingIndicator;