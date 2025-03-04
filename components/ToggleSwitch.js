import { useMemo } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { useThemes } from "../context/ThemeContext";
import Animated, { useSharedValue, withSpring, ReduceMotion } from 'react-native-reanimated';

const ToggleSwitch = ({ state, changeState }) => {
    const { defaultThemedStyles, colors } = useThemes();
    const width = useSharedValue(state ? 73 : 32);

    console.log(state)

    const styles = useMemo(() => {
        return StyleSheet.create({
            buttonShell: {
                height: 45,
                width: 85,
                borderColor: colors.blue,
                borderWidth: 3,
                borderRadius: 22.5,
                padding: 3,
                backgroundColor: colors.generic,

                justifyContent: 'center',
                alignItems: 'flex-start'
            },
            innerCircle: {
                height: 32,
                backgroundColor: colors.blue,
                borderWidth: 1,
                borderRadius: 16
            }
        })
    }, [colors]);

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
        <TouchableWithoutFeedback
            onPress={handlePress}
        >
            <View style={[styles.buttonShell, defaultThemedStyles.boxshadow]}>
                <Animated.View style={[{ width }, styles.innerCircle]} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ToggleSwitch;