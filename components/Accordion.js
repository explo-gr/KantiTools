import { useContext, useMemo } from "react";
import { StyleSheet, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native"
import { ThemeContext } from "../context/ThemeContext";
import Animated, { useSharedValue, withSpring, ReduceMotion } from 'react-native-reanimated';
import { LanguageContext } from "../context/LanguageContext";
import Feather from '@expo/vector-icons/Feather';

const Accordion = ({ state, changeState, title, children }) => {
    const { defaultThemedStyles, colors } = useContext(ThemeContext);
    const { t } = useContext(LanguageContext);

    const width = useSharedValue(0);

    return (
        <TouchableHighlight>
            <View>
                <View>
                    <Text>
                        {title}
                    </Text>
                </View>
                <Animated.View>
                    <Feather name="chevron-up" size={24} color="black" />
                </Animated.View>
            </View>
        </TouchableHighlight>
    )
}

export default Accordion;

//was i no macha muas
// i han ka wiani das macha
// i kriag a krisa