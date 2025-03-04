import { useContext } from "react";
import { ThemeContext, useThemes } from "../context/ThemeContext";
import { StyleSheet, View } from "react-native";

const Divider = () => {
    const { colors } = useThemes();
    return (
        <View style={[{backgroundColor: colors.blue}, styles.divider]}/>
    );
};
    
const styles = StyleSheet.create({
    divider: {
        width: '90%',
        borderRadius: 1.25,
        height: 2.5,
        marginVertical: 9
    }
});

export default Divider;