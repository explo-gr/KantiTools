import { View, Image, Text, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';

const CreditText = ({ children }) => {
    const { defaultThemedStyles } = useThemes();

    return (
        <Text style={[styles.creditText, defaultThemedStyles.text]}>
            {children}
        </Text>
    );
}

const Credit = () => {
    const { defaultThemedStyles } = useThemes();

    return (
        <View style={styles.creditContainer}>
            <Image
                style={[styles.creditImage, defaultThemedStyles.boxshadow]}
                source={require('../../../assets/icons/icon.png')}
            />
            <View style={styles.creditTextContainer}>
                <CreditText>Created by Gian-Marco Coray</CreditText>
                <CreditText>github.com/explo-gr/KantiTools</CreditText>
                <CreditText>KantiTools</CreditText>
                <CreditText>Alpha 1.5</CreditText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    creditTextContainer: {
        flexDirection: 'column',
        marginLeft: 14,
        marginTop: 2,
    },
    creditContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    creditImage: {
        height: 80,
        width: 80,
        borderRadius: 25
    },
    creditText: {
        fontStyle: 'normal',
        fontWeight: '320',
        fontFamily: 'monospace',
        fontSize: 13
    }
});

export default Credit;