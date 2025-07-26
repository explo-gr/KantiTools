import { View, Image, Text, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { openBrowserAsync } from 'expo-web-browser';
import * as Haptics from 'expo-haptics';

const REPO_URL = 'https://github.com/explo-gr/KantiTools';

const statusBarWheel = () => {
    const colors = ['tomato', 'red', 'orange', 'yellow', 'lime', 'green', 'cyan', 'blue', 'purple', 'pink'];
    const colorIterations = colors.length - 1;

    let colorIteration = 0;

    const iterate = () => {
        if (colorIteration <= colorIterations) {
            setStatusBarBackgroundColor(colors[colorIteration], true);
            colorIteration++;
            setTimeout(() => iterate(), 500);
        } else {
            setStatusBarBackgroundColor('#00000000', true);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    iterate();
}

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
        <TouchableWithoutFeedback
            onLongPress={statusBarWheel}
            onPress={async () => await openBrowserAsync(REPO_URL)}
        >
            <View style={styles.creditContainer}>
                <Image
                    style={[styles.creditImage, defaultThemedStyles.boxshadow]}
                    source={require('../../../assets/icons/icon.png')}
                />
                <View style={styles.creditTextContainer}>
                    <CreditText>Created by Gian-Marco Coray</CreditText>
                    <CreditText>github.com/explo-gr/KantiTools</CreditText>
                    <CreditText>KantiTools</CreditText>
                    <CreditText>Alpha 1.8</CreditText>
                </View>
            </View>
        </TouchableWithoutFeedback>
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