import { Pressable, StyleSheet, View } from 'react-native'
import { useThemes } from '../../context/ThemeContext';
import Animated, { useSharedValue, withSpring, ReduceMotion } from 'react-native-reanimated';

const ToggleSwitch = ({ state, changeState }) => {
    const { defaultThemedStyles, colors } = useThemes();
    const width = useSharedValue(state ? 73 : 32);

    const handlePress = () => {
        changeState(!state);
        width.value = withSpring(!state ? 73 : 32, {
            duration: 400,
            dampingRatio: 1.1,
            stiffness: 1,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
            reduceMotion: ReduceMotion.System,
        });
    }

    return (
        <Pressable
            onPress={handlePress}
        >
            <View style={[{
                borderColor: colors.blue,
                backgroundColor: colors.generic,
            }, styles.buttonShell, defaultThemedStyles.boxshadow]}>
                <Animated.View style={[{
                    width: width,
                    backgroundColor: colors.blue,
                }, styles.innerCircle]} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonShell: {
        height: 45,
        width: 85,
        borderWidth: 3,
        borderRadius: 22.5,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    innerCircle: {
        height: 32,
        borderWidth: 1,
        borderRadius: 16,
    }
})

export default ToggleSwitch;