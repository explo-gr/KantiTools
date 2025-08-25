import { View, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { useThemes } from '../../context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import ScaleOnFocus from '../../components/utils/ScaleOnFocus';
import TranslatedText from '../../components/translations/TranslatedText';
import icons from '../../config/navicons/icons';

// based on the example given at https://reactnavigation.org/docs/bottom-tab-navigator/?config=static
const TabNavigator = ({ state, navigation }) => {
    const { width } = useWindowDimensions();
    const isCompact = width < 500;

    const { colors, defaultThemedStyles } = useThemes();
    const { buildHref } = useLinkBuilder();

    return (
        <View style={[{ backgroundColor: colors.blue }, styles.navigationContainer, defaultThemedStyles.boxshadow]}>
            {state.routes.map((route, index) => {
                const label = route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        href={buildHref(route.name, route.params)}
                        key={index.toString()}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.rootContainer}
                    >
                        <View style={[{
                            flexDirection: isCompact ? 'column' : 'row',
                        }, styles.container]}>
                            <ScaleOnFocus isFocused={isFocused} from={0.8} to={1.1}>
                                <Feather name={icons[route.name]} size={30} color={colors.generic} style={styles.icon}/>
                            </ScaleOnFocus>
                            <TranslatedText adjustsFontSizeToFit numberOfLines={1} style={[{
                                color: colors.generic
                            }, styles.text]}>
                                {label}
                            </TranslatedText>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    navigationContainer: {
        zIndex: 1,
        width: '88%',
        bottom: 20,
        height: 75,
        borderRadius: 25,
        gap: 3,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
    },
    rootContainer: {
        flex: 1,
        margin: 3
    },
    container: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
    },
    icon: {
        margin: 5
    },
    text: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 11,
    }
});

export default TabNavigator;