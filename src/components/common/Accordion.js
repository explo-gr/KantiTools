import Feather from '@expo/vector-icons/Feather';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useDerivedValue, withDelay, withTiming } from 'react-native-reanimated';

import Divider from '../../components/common/Divider';
import { useTranslations } from '../../context/LanguageContext';
import { useThemes } from '../../context/ThemeContext';

const Accordion = ({
    isOpen,
    changeIsOpen,
    accordionKey,
    title,
    rightItem=<></>,
    children,
    tint,
    disabled = false,
    immutable = false,
}) => {
    const { defaultThemedStyles, colors } = useThemes();
    const { t } = useTranslations();

    const deltaTolerance = 0.1;
    const animationDuration = 300;

    const [contentHeight, setContentHeight] = useState(0);
    const [hasMeasured, setHasMeasured] = useState(false);

    const titleTextSize = title.length >= 25 ? 13.5 : 17;

    const timingConfig = {
        duration: animationDuration,
        easing: Easing.inOut(Easing.ease),
        reduceMotion: ReduceMotion.System,
    };

    // Drive animations directly from isOpen
    const animatedHeight = useDerivedValue(() => {
        return withTiming(isOpen ? contentHeight : 0, timingConfig);
    }, [isOpen, contentHeight]);

    const animatedRotation = useDerivedValue(() => {
        return withDelay(25, withTiming(isOpen ? 180 : 0, {
            duration: animationDuration,
            easing: Easing.linear,
            reduceMotion: ReduceMotion.System,
        }));
    }, [isOpen]);

    const chevronAnimationStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${animatedRotation.value}deg` }],
    }));

    const openingAnimationStyle = useAnimatedStyle(() => ({
        height: animatedHeight.value
    }));

    const handleOpenClose = () => !disabled && changeIsOpen(accordionKey);

    const handleOnLayout = useCallback((e) => {
        if (!immutable || (immutable && !hasMeasured)) {
            const measuredHeight = e.nativeEvent.layout.height;
            if (measuredHeight && Math.abs(measuredHeight - contentHeight) > deltaTolerance) {
                setContentHeight(measuredHeight);
                if (immutable) {
                    setHasMeasured(true); // lock after first measure
                }
            }
        }
    }, [immutable, hasMeasured, contentHeight]);

    return (
        <View
            style={[styles.accordionContainer, defaultThemedStyles.card, {
                backgroundColor: tint
            }]}
        >
            <TouchableOpacity onPress={handleOpenClose}>
                <View style={styles.headerContainer}>
                    <Text style={[{ fontSize: titleTextSize }, defaultThemedStyles.text, styles.titleText]}>
                        {t(title)}
                    </Text>
                    <View style={styles.headerSubcontainer}>
                        {rightItem}
                        <Animated.View style={chevronAnimationStyle}>
                            <Feather name='chevron-down' size={30} color={colors.hardContrast} />
                        </Animated.View>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Animated collapsible content */}
            <Animated.View
                style={[styles.contentContainer, openingAnimationStyle]}
                removeClippedSubviews
            >
                <Divider/>
                <View style={styles.childrenContainer}>
                    {children}
                </View>
            </Animated.View>
            
            {/*
                Hidden measurement view (renders content but off-screen)
                Very weird and hacky approach but this allows dynamic heights
            */}
            {(!immutable || !hasMeasured) && (
                <View
                    style={styles.hiddenMeasureContainer}
                    removeClippedSubviews
                    onLayout={handleOnLayout}
                >
                    <Divider />
                    <View style={styles.childrenContainer}>
                        {children}
                    </View>
                </View>
            )}
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
    titleText: {
        overflow: 'hidden',
        maxWidth: '80%',
        textAlignVertical: 'center',
        fontFamily: 'Inter-Bold'
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