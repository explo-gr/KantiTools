import { useThemes } from '../../../context/ThemeContext';
import { View, StyleSheet, TextInput } from 'react-native';
import Button from '../../../components/common/Button';

const GradeItem = ({ grade, onGradeChange, weight, onWeightChange, onDelete, onDuplicate }) => {
    const { defaultThemedStyles } = useThemes();

    return (
        <View style={styles.rootcontainer}>
            <View style={[styles.container, defaultThemedStyles.card]}>
                <View style={styles.leftview}>
                    <TextInput
                        value={grade}
                        onChangeText={onGradeChange}
                        placeholder='grade'
                        keyboardType='number-pad'
                    />
                    <TextInput
                        value={weight}
                        onChangeText={onWeightChange}
                        placeholder='weight'
                        keyboardType='number-pad'
                    />
                </View>
                <View style={styles.rightview}>
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
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 5,
        width: '100%'
    },
    rootcontainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16
    },
    leftview: {
        flex: 4,
        alignContent: 'center',
        justifyContent: 'flex-start',
        gap: 3
    },
    rightview: {
        flex: 2,
        alignContent: 'center',
        alignItems: 'flex-end',
        gap: 3
    }
});

export default GradeItem;