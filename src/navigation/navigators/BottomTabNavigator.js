import { View, StyleSheet, useWindowDimensions, Keyboard, TouchableOpacity } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { useThemes } from '../../context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import ScaleOnFocus from '../../components/utils/ScaleOnFocus';
import TranslatedText from '../../components/translations/TranslatedText';
import icons from '../../config/navicons/icons';
import { useEffect, useState, useCallback, memo } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabItem = memo(({ route, index, isFocused, navigation, buildHref, isCompact, colors }) => {
    const onPress = useCallback(() => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
        }
    }, [navigation, route, isFocused]);

    const onLongPress = useCallback(() => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    }, [navigation, route]);

    return (
        <TouchableOpacity
            href={buildHref(route.name, route.params)}
            key={index.toString()}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.rootContainer}
        >
            <View style={[{ flexDirection: isCompact ? 'column' : 'row' }, styles.container]}>
                <ScaleOnFocus isFocused={isFocused} from={0.85} to={1.1}>
                    <Feather name={icons[route.name]} size={30} color={colors.generic} style={styles.icon}/>
                </ScaleOnFocus>
                <TranslatedText
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={[{ color: colors.generic }, styles.text]}
                >
                    {route.name}
                </TranslatedText>
            </View>
        </TouchableOpacity>
    );
});

const TabNavigator = ({ state, navigation, hidden }) => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const hiddenOffset = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(hiddenOffset.value * 0.75) }]
    }));

    const shouldHide = hidden || isKeyboardVisible;

    useEffect(() => {
        hiddenOffset.value = shouldHide ? 200 : 0;
    }, [shouldHide]);

    const { width } = useWindowDimensions();
    const isCompact = width < 500;

    const { colors, defaultThemedStyles } = useThemes();
    const { buildHref } = useLinkBuilder();

    return (
        <Animated.View
            style={[
                { backgroundColor: colors.blue },
                animatedStyles,
                styles.navigationContainer,
                defaultThemedStyles.boxshadow,
            ]}
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
                        colors={colors}
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
    },
    rootContainer: {
        flex: 1,
        margin: 3,
    },
    container: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
    },
    icon: {
        margin: 5,
    },
    text: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 11,
    },
});

export default TabNavigator;