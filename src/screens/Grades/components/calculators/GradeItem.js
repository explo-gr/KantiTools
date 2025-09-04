import { useThemes } from '../../../../context/ThemeContext';
import { View, StyleSheet, TextInput } from 'react-native';
import Button from '../../../../components/common/Button';
import { useTranslations } from '../../../../context/LanguageContext';
import { memo, useMemo } from 'react';

const GradePair = memo(({ value, onChange, placeholder, action, actionTitle, icon, btnColor, colors }) => {
    const inputStyle = useMemo(
        () => [
            {
                borderColor: colors.accent,
                color: colors.hardContrast,
            },
            styles.input,
        ],
        [colors]
    );

    return (
        <View style={styles.pairContainer}>
            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={colors.gray}
                keyboardType='number-pad'
                maxLength={6}
                returnKeyType='done'
                style={inputStyle}
            />
            <Button
                title={actionTitle}
                onPress={action}
                icon={icon}
                color={btnColor}
                style={styles.button}
            />
        </View>
    );
});

const GradeItem = ({ grade, onGradeChange, weight, onWeightChange, onDelete, onDuplicate }) => {
    const { defaultThemedStyles, colors } = useThemes();
    const { t } = useTranslations();

    return (
        <View style={styles.rootContainer}>
            <View style={[styles.container, defaultThemedStyles.card]}>
                <GradePair
                    value={grade}
                    onChange={onGradeChange}
                    placeholder={t('gr_calcmin_gr')}
                    action={onDelete}
                    actionTitle={t('delete')}
                    icon='trash-2'
                    btnColor={colors.red}
                    colors={colors}
                />
                <GradePair
                    value={weight}
                    onChange={onWeightChange}
                    placeholder={t('gr_calcmin_wt')}
                    action={onDuplicate}
                    actionTitle={t('duplicate')}
                    icon='copy'
                    btnColor={colors.accent}
                    colors={colors}
                />
            </View>
        </View>
    );
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
        justifyContent: 'center',
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
        flexGrow: 7,
        fontFamily: 'Inter-Medium'
    },
    button: {
        flex: 1,
    },
});

export default memo(GradeItem);