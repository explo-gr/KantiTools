import { StyleSheet, TouchableOpacity, View, Text, } from "react-native"
import { useThemes } from "../../context/ThemeContext";
import Animated, { useSharedValue, Easing, withTiming, useAnimatedStyle, ReduceMotion } from 'react-native-reanimated';
import { useTranslations } from "../../context/LanguageContext";
import Feather from '@expo/vector-icons/Feather';
import Divider from '../../components/common/Divider';
import React, { useEffect, useRef } from "react";

// useDimensions und nocher danimation speed fur grössi abhängig macha
const Accordion = ({ isOpen, changeIsOpen, title, rightItem=<></>, children, tint, disabled = false}) => {
    const { defaultThemedStyles, colors } = useThemes();
    const { t } = useTranslations();

    const maxHeight = 220;
    const minHeight = 0;

    const height = useSharedValue(isOpen ? maxHeight : minHeight);
    const rotation = useSharedValue(isOpen ? 180 : 0);

    const titleTextSize = title.length >= 25 ? 15 : 17.5;

    const chevronAnimationStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const openingAnimationStyle = useAnimatedStyle(() => ({
        maxHeight: height.value,
    }));

    const hasMounted = useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            // set values directly on first render
            height.value = isOpen ? maxHeight : minHeight;
            rotation.value = isOpen ? 180 : 0;
            hasMounted.current = true;
            return;
        }

        // animate on subsequent changes
        height.value = withTiming(isOpen ? maxHeight : minHeight, {
            duration: 250,
            easing: Easing.inOut(Easing.ease),
            reduceMotion: ReduceMotion.System,
        });

        rotation.value = withTiming(isOpen ? 180 : 0, {
            duration: 250,
            easing: Easing.inOut(Easing.linear),
            reduceMotion: ReduceMotion.System,
        });
    }, [isOpen]);

    return (
        <View style={[styles.accordionContainer, defaultThemedStyles.card, {
            backgroundColor: `${tint}29` // slightly tint the background
        }]}>
            <TouchableOpacity            
                onPress={() => {
                    if (!disabled) changeIsOpen(!isOpen);
                }}
            >
                <View style={styles.headerContainer}>
                    <Text style={[{ fontSize: titleTextSize }, styles.titleText, defaultThemedStyles.text]}>{t(title)}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        gap: 12,
                        alignItems: 'center'
                    }}>
                        {rightItem}
                        <Animated.View style={[styles.chevronContainer, chevronAnimationStyle]}>
                            <Feather name="chevron-down" size={30} color={colors.hardContrast} />
                        </Animated.View>
                    </View>
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
        overflow: 'hidden',
        fontWeight: 'bolder'
    },
    contentContainer: {
        overflow: 'hidden',
    },
});

export default Accordion;