import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { useThemes } from "../../context/ThemeContext";
import Animated, { useSharedValue, Easing, withTiming, useAnimatedStyle, ReduceMotion } from 'react-native-reanimated';
import { useTranslations } from "../../context/LanguageContext";
import Feather from '@expo/vector-icons/Feather';
import Divider from '../../components/common/Divider'

// TODO: TINT
//       CUSTOM TITLE
const Accordion = ({ isOpen, changeIsOpen, title, children, tint }) => {
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
        <View style={[styles.accordionContainer, defaultThemedStyles.card, {
            backgroundColor: tint + '14' // slightly tint the background
        }]}>
            <TouchableOpacity            
                onPress={() => {
                    changeIsOpen(!isOpen);
                    rotation.value = withTiming(!isOpen ? 180 : 0, {
                        duration: 250,
                        easing: Easing.inOut(Easing.linear),
                        reduceMotion: ReduceMotion.System,
                    });

                    height.value = withTiming(!isOpen ? maxHeight : minHeight, {
                        duration: 250,
                        easing: Easing.inOut(Easing.ease),
                        reduceMotion: ReduceMotion.System,
                });
            }}>
                <View style={styles.headerContainer}>
                    <Text style={[styles.titleText, defaultThemedStyles.text]}>{t(title)}</Text>
                    <Animated.View style={[styles.chevronContainer, chevronAnimationStyle]}>
                        <Feather name="chevron-down" size={30} color={colors.hardContrast} />
                    </Animated.View>
                </View>
            </TouchableOpacity>
            <Animated.View style={[styles.contentContainer, openingAnimationStyle]}>
                <Divider/>
                <View style={{
                    padding: 12
                }}>
                    {children}
                </View>
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
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    chevronContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 18,
        overflow: 'hidden'
    },
    contentContainer: {
        overflow: 'hidden',
    },
});

export default Accordion;