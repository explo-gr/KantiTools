import { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import ScaleOnFocus from '../../../components/utils/ScaleOnFocus';
import { useThemes } from '../../../context/ThemeContext';
import TINT_COLORS from './TINT_COLORS';

const SortingWheel = ({ tintColors, selectedTint, setSortedColor }) => {
    const { colors, theme } = useThemes();
    const { width } = useWindowDimensions();

    const getColorCode = useCallback((color) => colors[color] || colors.generic, [theme]);
    const capsuleWidth = useMemo(() => Math.floor((width / TINT_COLORS.length) - 3 * TINT_COLORS.length), [width]);

    return (
        <View style={styles.tintRow}>
            {tintColors.map((color) => (
                <ScaleOnFocus
                    from={1}
                    to={1.15}
                    isFocused={selectedTint === color}
                    key={`img-${color}`}
                    duration={350}
                >
                    <TouchableOpacity
                        key={`to-${color}`}
                        style={[{
                            borderColor: colors.accent,
                            backgroundColor: getColorCode(color),
                            borderWidth: selectedTint === color ? 3 : 2,
                            width: capsuleWidth
                        }, styles.tintCircle]}
                        onPress={() => 
                            setSortedColor(
                                selectedTint === color
                                    ? null
                                    : color
                            )
                        }
                        hitSlop={8}
                    />
                </ScaleOnFocus>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tintRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        width: '100%',
        height: 32,
        marginVertical: 16
    },
    tintCircle: {
        borderRadius: 16,
        height: 32
    }
});

export default SortingWheel;