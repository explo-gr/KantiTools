import { useThemes } from '../../../context/ThemeContext';
import { View, StyleSheet, TextInput } from 'react-native';
import Button from '../../../components/common/Button';

const GradeItem = ({ grade, onGradeChange, weight, onWeightChange, onDelete, onDuplicate }) => {
    const { defaultThemedStyles, colors } = useThemes();

    const renderPair = (value, onChange, placeholder, action, actionTitle, icon, btnColor) => (
        <View style={styles.pairContainer}>
            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={colors.gray}
                keyboardType='number-pad'
                maxLength={4}
                style={[{
                    borderColor: colors.blue,
                    color: colors.hardContrast
                }, styles.input]}
            />
            <Button
                title={actionTitle}
                onPress={action}
                icon={icon}
                color={btnColor}
            />
        </View>
    );

    return (
        <View style={styles.rootContainer}>
            <View style={[styles.container, defaultThemedStyles.card]}>
                { renderPair(grade, onGradeChange, 'grade', onDelete, 'Delete', 'trash-2', colors.red) }
                { renderPair(weight, onWeightChange, 'weight', onDuplicate, 'Duplicate', 'copy', colors.blue) }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        margin: 6,
        width: '100%',
        gap: 12,
    },
    rootContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    pairContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    input: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 14,
        padding: 12,
    },
});

export default GradeItem;