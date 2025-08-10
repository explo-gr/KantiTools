import { StyleSheet, View } from 'react-native';

const ActionBoxContainer = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        width: '100%',
        marginVertical: 2
    }
});

export default ActionBoxContainer;