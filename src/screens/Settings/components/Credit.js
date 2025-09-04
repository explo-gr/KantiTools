import { View, Image, Text, StyleSheet } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { Pressable } from 'react-native-gesture-handler';
import { openBrowserAsync } from 'expo-web-browser';
import { nativeApplicationVersion } from 'expo-application';
import { CREDITS } from '../../../config/links/links';
import * as Haptics from 'expo-haptics';

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
        <Text style={[defaultThemedStyles.text, styles.creditText]}>
            {children}
        </Text>
    );
}

const Credit = () => {
    const { defaultThemedStyles } = useThemes();

    return (
        <Pressable
            onLongPress={statusBarWheel}
            onPress={async () => await openBrowserAsync(CREDITS.REPO)}
        >
            <View style={styles.creditContainer}>
                <Image
                    style={[styles.creditImage, defaultThemedStyles.boxshadow]}
                    source={require('../../../assets/icons/icon.png')}
                />
                <View style={styles.creditTextContainer}>
                    <CreditText>MA25 Gian-Marco Coray</CreditText>
                    <CreditText>github.com/explo-gr/KantiTools</CreditText>
                    <CreditText>KantiTools</CreditText>
                    <CreditText>Release {nativeApplicationVersion}</CreditText>
                </View>
            </View>
        </Pressable>
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
        height: 70,
        width: 70,
        borderRadius: 25
    },
    creditText: {
        fontFamily: 'JetBrainsMono-Medium',
        fontSize: 12
    }
});

export default Credit;