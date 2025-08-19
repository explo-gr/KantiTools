import { View, useWindowDimensions } from 'react-native';
import { useThemes } from '../../context/ThemeContext';
import { useHeaderHeight } from '@react-navigation/elements';
import { StatusBar } from 'expo-status-bar';

const ContainerView = ({ children, style }) => {
    const { defaultThemedStyles, theme } = useThemes();

    const headerHeight = useHeaderHeight();
    const { width } = useWindowDimensions();

    const contentWidth = width < 800 ? '94%' : '82%';
    const addedPadding = headerHeight === 0 ? 40 : 20;

    return (
        <View style={[
            defaultThemedStyles.view,
            {
                paddingTop: addedPadding,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }
        ]}>
            <View style={[
                style,
                {
                    width: contentWidth,
                    height: '95%',
                    flex: 1,
                }
            ]}>
                {children}
                <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            </View>
        </View>
    );
}

export default ContainerView;