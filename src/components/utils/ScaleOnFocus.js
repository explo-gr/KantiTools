import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const ScaleOnFocus = ({
    isFocused,
    children,
    from=1,
    to=2,
    duration=380,
    style
}) => {
    
    const scale = useSharedValue(1);
    const animationConfig = {
        duration: duration,
        easing: Easing.inOut(Easing.back(3.5)),
    };

    useFocusEffect(() => {
        scale.value = isFocused ? to : from;
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: withTiming(scale.value, animationConfig) }],
        };
    });

    return (
        <Animated.View
            renderToHardwareTextureAndroid
            style={[styles.container, style, animatedStyle]}>
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ScaleOnFocus;