import Feather from '@expo/vector-icons/Feather';
import { memo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import TranslatedText from '../../components/translations/TranslatedText';
import ScaleOnFocus from '../../components/utils/ScaleOnFocus';
import icons from '../../config/navicons/icons';
import { useThemes } from '../../context/ThemeContext';

const TabItem = memo(({ route, index, isFocused, navigation, buildHref, isCompact }) => {
    const { colors } = useThemes();

    const onPress = useCallback(() => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
        }
    }, [navigation, route, isFocused]);

    const onLongPress = useCallback(() => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    }, [navigation, route]);

    return (
        <TouchableOpacity
            href={buildHref(route.name, route.params)}
            key={index.toString()}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.rootContainer}
        >
            <View style={[{ flexDirection: isCompact ? 'column' : 'row' }, styles.container]}>
                <ScaleOnFocus isFocused={isFocused} from={0.85} to={1.1}>
                    <Feather name={icons[route.name]} size={30} color={colors.generic} style={styles.icon}/>
                </ScaleOnFocus>
                <TranslatedText
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={[{ color: colors.generic }, styles.text]}
                >
                    {route.name}
                </TranslatedText>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        margin: 3,
    },
    container: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
    },
    icon: {
        margin: 5,
    },
    text: {
        textAlignVertical: 'center',
        textAlign: 'center',
        fontFamily: 'Inter-Medium',
        fontSize: 10.5,
    },
});

export default TabItem;