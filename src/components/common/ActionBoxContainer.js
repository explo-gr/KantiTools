import { StyleSheet, View } from 'react-native';

const ActionBoxContainer = ({ children, height }) => {
    return (
        <View style={[{
            height: height,
            marginVertical: 2
        }, styles.container]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        width: '100%',
    }
});

export default ActionBoxContainer;