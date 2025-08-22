import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useThemes } from '../../context/ThemeContext';
import Animated, { useSharedValue, Easing, withTiming, useAnimatedStyle, ReduceMotion } from 'react-native-reanimated';
import { useTranslations } from '../../context/LanguageContext';
import Feather from '@expo/vector-icons/Feather';
import Divider from '../../components/common/Divider';
import { useEffect, useRef, useState } from 'react';

const Accordion = ({
    isOpen,
    changeIsOpen,
    title,
    rightItem=<></>,
    children,
    tint,
    disabled = false,
    immutable = false
}) => {
    const { defaultThemedStyles, colors } = useThemes();
    const { t } = useTranslations();

    const deltaTolerance = 0.1;
    const animationDuration = 300;

    const height = useSharedValue(0);
    const rotation = useSharedValue(isOpen ? 180 : 0);

    const [contentHeight, setContentHeight] = useState(0);
    const hasMounted = useRef(false);

    const titleTextSize = title.length >= 25 ? 15 : 17.5;

    const chevronAnimationStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const openingAnimationStyle = useAnimatedStyle(() => ({
        height: height.value
    }));

    useEffect(() => {
        if (!hasMounted.current) {
            height.value = isOpen ? contentHeight : 0;
            rotation.value = isOpen ? 180 : 0;
            hasMounted.current = true;
            return;
        }

        height.value = withTiming(isOpen ? contentHeight : 0, {
            duration: animationDuration,
            easing: Easing.inOut(Easing.ease),
            reduceMotion: ReduceMotion.System,
        });

        rotation.value = withTiming(isOpen ? 180 : 0, {
            duration: animationDuration,
            easing: Easing.inOut(Easing.linear),
            reduceMotion: ReduceMotion.System,
        });
    }, [isOpen, contentHeight]);

    return (
        <View style={[styles.accordionContainer, defaultThemedStyles.card, {
            backgroundColor: `${tint}29`
        }]}>
            <TouchableOpacity onPress={() => !disabled && changeIsOpen(!isOpen)}>
                <View style={styles.headerContainer}>
                    <Text style={[{ fontSize: titleTextSize }, styles.titleText, defaultThemedStyles.text]}>
                        {t(title)}
                    </Text>
                    <View style={styles.headerSubcontainer}>
                        {rightItem}
                        <Animated.View style={[styles.chevronContainer, chevronAnimationStyle]}>
                            <Feather name='chevron-down' size={30} color={colors.hardContrast} />
                        </Animated.View>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Animated collapsible content */}
            <Animated.View style={[styles.contentContainer, openingAnimationStyle]}>
                <Divider/>
                <View style={styles.childrenContainer}>
                    {children}
                </View>
            </Animated.View>

            {/*
                Hidden measurement view (renders content but off-screen)
                Very weird and hacky approach but this allows dynamic heights
            */}
            <View
                style={styles.hiddenMeasureContainer}
                onLayout={(e) => {
                    const measuredHeight = e.nativeEvent.layout.height;
                    if (
                        (immutable && !contentHeight) ||
                        (!immutable && measuredHeight && Math.abs(measuredHeight - contentHeight) > deltaTolerance)
                    ) {
                        setContentHeight(measuredHeight);
                    }
                }}
            >
                <Divider/>
                <View style={styles.childrenContainer}>
                    {children}
                </View>
            </View>
        </View>
    );
};

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
    headerSubcontainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        alignItems: 'center'
    },
    chevronContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        overflow: 'hidden',
        fontWeight: 'bold',
        maxWidth: '80%',
        textAlignVertical: 'center'
    },
    contentContainer: {
        overflow: 'hidden',
    },
    hiddenMeasureContainer: {
        position: 'absolute',
        opacity: 0,
        zIndex: -1,
        pointerEvents: 'none',
    },
    childrenContainer: {
        padding: 12
    }
});

export default Accordion;