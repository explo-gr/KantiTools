import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { useThemes } from "../../context/ThemeContext";
import Animated, { useSharedValue, Easing, withTiming, useAnimatedStyle, ReduceMotion } from 'react-native-reanimated';
import { useTranslations } from "../../context/LanguageContext";
import Feather from '@expo/vector-icons/Feather';
import Divider from '../../components/common/Divider'

const Accordion = ({ isOpen, changeIsOpen, title, children }) => {
    const { defaultThemedStyles, colors } = useThemes();
    const { t } = useTranslations();

    const maxHeight = 220;
    const minHeight = 0;

    const height = useSharedValue(isOpen ? maxHeight : minHeight);
    const rotation = useSharedValue(isOpen ? 180 : 0);

    const chevronAnimationStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const openingAnimationStyle = useAnimatedStyle(() => ({
        maxHeight: height.value,
    }));

    return (
        <View style={[styles.accordionContainer, defaultThemedStyles.card]}>
            <TouchableOpacity onPress={() => {
                changeIsOpen(!isOpen);
                rotation.value = withTiming(!isOpen ? 180 : 0, {
                    duration: 200,
                    easing: Easing.inOut(Easing.linear),
                    reduceMotion: ReduceMotion.System,
                });

                height.value = withTiming(!isOpen ? maxHeight : minHeight, {
                    duration: 200,
                    easing: Easing.inOut(Easing.linear),
                    reduceMotion: ReduceMotion.System,
                });
            }}>
                <View style={styles.headerContainer}>
                    <Animated.View style={[styles.chevronContainer, chevronAnimationStyle]}>
                        <Feather name="chevron-down" size={30} color={colors.hardContrast} />
                    </Animated.View>
                    <Text style={[styles.titleText, defaultThemedStyles.text]}>{t(title)}</Text>
                </View>
            </TouchableOpacity>
            <Animated.View style={[styles.contentContainer, openingAnimationStyle]}>
                <Divider />
                {children}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    accordionContainer: {
        flexDirection: 'column',
        width: '100%',
    },
    headerContainer: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    chevronContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 18,
    },
    contentContainer: {
        overflow: 'hidden',
    },
});

export default Accordion;