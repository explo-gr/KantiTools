import { useState, useEffect, useCallback } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
    Keyboard
} from 'react-native';
import TranslatedText from '../../../components/translations/TranslatedText';
import { useThemes } from '../../../context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import ScaleOnFocus from '../../../components/utils/ScaleOnFocus';
import { useTranslations } from '../../../context/LanguageContext';

const TINT_COLORS = ['red', 'yellow', 'green', 'lightblue', 'purple'];

const TodoModal = ({ visible, onOk, onCancel, todoToEdit, editIndex }) => {
    const { defaultThemedStyles, colors, theme } = useThemes();
    const { t } = useTranslations();

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ tint, setTint ] = useState(TINT_COLORS[0]);

    const getColorCode = useCallback((color) => colors[color] || colors.generic, [theme]);

    useEffect(() => {
        if (todoToEdit) {
            setTitle(todoToEdit.title);
            setDescription(todoToEdit.description);
            setTint(todoToEdit.tint);
        }
    }, [todoToEdit]);

    const handleOk = () => {
        if (!title.trim()) return;
        onOk({
            title: title.trim(),
            description: description.trim(),
            tint
        }, editIndex);
        setTitle('');
        setDescription('');
        setTint(TINT_COLORS[0]);
    };

    return (
        <Modal
            animationType='fade'
            statusBarTranslucent={true}
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <Pressable style={styles.centeredView} onPress={Keyboard.dismiss}>
                <View style={[styles.modalContainer, defaultThemedStyles.card, defaultThemedStyles.boxshadow]}>
                    <TranslatedText style={[styles.label, defaultThemedStyles.text]}>re_title</TranslatedText>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder={t('re_phd_title')}
                        style={[{
                            borderColor: colors.blue,
                            height: 50
                        }, styles.input, defaultThemedStyles.text]}
                        placeholderTextColor={colors.gray}
                    />
                    <TranslatedText style={[styles.label, defaultThemedStyles.text]}>re_description</TranslatedText>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder={t('re_phd_description')}
                        style={[{
                            borderColor: colors.blue,
                            minHeight: 50
                        }, styles.input, defaultThemedStyles.text]}
                        multiline
                        numberOfLines={5}
                        placeholderTextColor={colors.gray}
                    />

                    <TranslatedText style={[styles.label, defaultThemedStyles.text]}>re_tint</TranslatedText>
                    <View style={styles.tintRow}>
                        {TINT_COLORS.map((color) => (
                            <ScaleOnFocus
                                from={0.85}
                                to={1.15}
                                isFocused={tint === color}
                                key={`sof-${color}`}
                            >
                                <TouchableOpacity
                                    key={`to-${color}`}
                                    style={[{
                                        borderColor: colors.blue,
                                        backgroundColor: getColorCode(color),
                                        borderWidth: tint === color ? 2 : 1
                                    }, styles.tintCircle]}
                                    onPress={() => setTint(color)}
                                />
                            </ScaleOnFocus>
                        ))}
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={onCancel} style={[styles.buttonShell, { backgroundColor: colors.red }]}> 
                            <Feather name='x' size={22} color={colors.generic} />
                            <TranslatedText style={defaultThemedStyles.textContrast}>cancel</TranslatedText>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleOk} style={[styles.buttonShell, { backgroundColor: colors.blue }]}>
                            <Feather name='save' size={22} color={colors.generic} />
                            <TranslatedText style={defaultThemedStyles.textContrast}>save</TranslatedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalContainer: {
        padding: 24,
        width: '85%',
        alignItems: 'stretch',
        gap: 12
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1.2,
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 6
    },
    tintRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 8
    },
    tintCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        gap: 10
    },
    buttonShell: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        flexDirection: 'row',
        gap: 3
    },
});

export default TodoModal;