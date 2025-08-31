import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    withSpring,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const ScaleOnFocus = ({
    isFocused,
    children,
    from=1,
    to=2,
    duration=400
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
            style={[styles.container, animatedStyle]}>
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ScaleOnFocus;