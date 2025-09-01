import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useThemes } from '../../../../context/ThemeContext';

const TodoActions = ({ onEdit, onDelete }) => {
    const { colors } = useThemes();

    return (
        <View style={styles.container}>
            <TouchableOpacity hitSlop={3} onPress={onEdit}>
                <Feather name='edit-2' size={22} color={colors.accent} />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={3} onPress={onDelete}>
                <Feather name='trash-2' size={22} color={colors.red} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 16,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default TodoActions;