import { useContext } from "react";
import { ThemeContext, useThemes } from "../../context/ThemeContext";
import { StyleSheet, View } from "react-native";

const Divider = () => {
    const { colors, defaultThemedStyles } = useThemes();
    return (
        <View style={[{backgroundColor: colors.blue}, styles.divider, /* defaultThemedStyles.boxshadow */]}/>
    );
};
    
const styles = StyleSheet.create({
    divider: {
        width: '100%',
        borderRadius: 1.25,
        height: 2.8,
        marginVertical: 9
    }
});

export default Divider;