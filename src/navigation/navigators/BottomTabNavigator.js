import { useLinkBuilder } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { Keyboard, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withDelay, withSpring } from 'react-native-reanimated';

import { useTabBarVisibility } from '../../context/TabBarVisibilityContext';
import { useThemes } from '../../context/ThemeContext';
import TabItem from '../components/TabItem';

const TabNavigator = ({ state, navigation }) => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const { hidden } = useTabBarVisibility();

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const { width } = useWindowDimensions();
    const isCompact = width < 500;
    
    const { colors, theme, defaultThemedStyles } = useThemes();
    const { buildHref } = useLinkBuilder();

    const shouldHide = useMemo(() => hidden || isKeyboardVisible, [hidden, isKeyboardVisible]);

    const hiddenOffset = useDerivedValue(() => {
        return shouldHide ? 200 : 0;
    }, [shouldHide]);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{
            translateY: withDelay(25, withSpring(hiddenOffset.value * 0.75)),
        }]
    }));

    const themedContainerStyle = useMemo(() => [
        { backgroundColor: colors.accent },
        styles.navigationContainer,
        defaultThemedStyles.boxshadow,
    ], [colors, theme]);
    
    return (
        <Animated.View
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            style={[animatedStyles, themedContainerStyle]}
        >
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                //const descriptor = descriptors[route.key];
                //const { options } = descriptor;

                return (
                    <TabItem
                        key={index}
                        route={route}
                        index={index}
                        isFocused={isFocused}
                        navigation={navigation}
                        buildHref={buildHref}
                        isCompact={isCompact}
                    />
                );
            })}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    navigationContainer: {
        zIndex: 1,
        width: '88%',
        bottom: 20,
        height: 75,
        borderRadius: 25,
        gap: 3,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        overflow: 'visible'
    }
});

export default TabNavigator;