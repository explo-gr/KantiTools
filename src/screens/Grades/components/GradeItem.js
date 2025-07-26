import { useThemes } from '../../../context/ThemeContext';
import { View, StyleSheet, TextInput } from 'react-native';
import Button from '../../../components/common/Button';

const GradeItem = ({ grade, onGradeChange, weight, onWeightChange, onDelete, onDuplicate }) => {
    const { defaultThemedStyles, colors } = useThemes();

    return (
        <View style={styles.rootContainer}>
            <View style={[styles.container, defaultThemedStyles.card]}>
                <View style={styles.leftView}>
                    <TextInput
                        value={grade}
                        onChangeText={onGradeChange}
                        placeholder='grade'
                        placeholderTextColor={colors.hardContrast}
                        keyboardType='number-pad'
                        style={[{
                            borderColor: colors.blue
                        }, styles.input]}
                    />
                    <TextInput
                        value={weight}
                        onChangeText={onWeightChange}
                        placeholder='weight'
                        placeholderTextColor={colors.hardContrast}
                        keyboardType='number-pad'
                        style={[{
                            borderColor: colors.blue
                        }, styles.input]}
                    />
                </View>
                <View style={styles.rightView}>
                    <Button
                        title='Delete'
                        onPress={onDelete}
                    />
                    <Button
                        title='Duplicate'
                        onPress={onDuplicate}
                    />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        margin: 6,
        width: '100%'
    },
    rootContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16
    },
    leftView: {
        flex: 4,
        alignContent: 'center',
        justifyContent: 'flex-start',
        gap: 10
    },
    rightView: {
        flex: 2,
        alignContent: 'center',
        alignItems: 'flex-end',
        gap: 10
    },
    input: {
        borderWidth: 2,
        borderRadius: 14,
        padding: 12,
    },
});

export default GradeItem;