import { View } from 'react-native';
import { useThemes } from '../../context/ThemeContext';
import { useHeaderHeight } from '@react-navigation/elements';
import { StatusBar } from 'expo-status-bar';

const ContainerView = ({ children, style }) => {
    const headerHeight = useHeaderHeight();
    const { defaultThemedStyles, theme } = useThemes();

    const addedPadding = headerHeight === 0 ? 40 : headerHeight;

    return (
      <View style={[
        defaultThemedStyles.view,
        {
            paddingTop: addedPadding,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            //backgroundColor: 'white'
        }
      ]}>
        <View style={[
            style,
            {
                width: '94%',
                height: '95%',
                flex: 1,
                //backgroundColor: 'white'
            }
        ]}>
            { children }
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'}/>
        </View>
      </View>
    );
}

export default ContainerView;