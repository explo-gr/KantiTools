import { useThemes } from "../../../context/ThemeContext";
import { useTranslations } from "../../../context/LanguageContext";
import { View, StyleSheet, TextInput, Button } from 'react-native'

const GradeItem = ({ grade, onGradeChange, weight, onWeightChange, onDelete, onDuplicate }) => {
    const { defaultThemedStyles } = useThemes();
    const { t } = useTranslations();

    return (
        <View style={[styles.container, defaultThemedStyles.card]}>
            <View style={styles.leftview}>
                <TextInput
                    value={grade}
                    onChangeText={onGradeChange}
                    placeholder="grade"
                    keyboardType="decimal-pad"
                />
                <TextInput
                    value={weight}
                    onChangeText={onWeightChange}
                    placeholder="weight"
                    keyboardType="decimal-pad"
                />
            </View>
            <View style={styles.rightview}>
                <Button
                    title="Delete"
                    onPress={onDelete}
                />
                <Button
                    title="Duplicate"
                    onPress={onDuplicate}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 5,
        width: '100%'
    },
    text: {
        fontSize: 16
    },
    leftview: {
        flex: 4,
        alignContent: 'center',
        justifyContent: 'flex-start'
    },
    rightview: {
        flex: 2,
        alignContent: 'center',
        alignItems: "flex-end"
    }
});

export default GradeItem;