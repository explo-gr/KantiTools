import { View, TouchableOpacity, StyleSheet } from 'react-native';
import ScaleOnFocus from '../../../components/utils/ScaleOnFocus';
import { useThemes } from '../../../context/ThemeContext';
import { useCallback } from 'react';

const SortingWheel = ({ tintColors, selectedTint, setSortedColor }) => {
    const { colors, theme } = useThemes();

    const getColorCode = useCallback((color) => colors[color] || colors.generic, [theme]);

    return (
        <View style={styles.tintRow}>
            {tintColors.map((color) => (
                <ScaleOnFocus
                    from={0.85}
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
                            borderWidth: selectedTint === color ? 2 : 1
                        }, styles.tintCircle]}
                        onPress={() => setSortedColor(color)}
                    />
                </ScaleOnFocus>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tintRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 8
    },
    tintCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
    }
});

export default SortingWheel;