import { View, TouchableOpacity, Animated } from 'react-native';
import TranslatedText from '../translations/TranslatedText';
import Divider from '../components/Divider';
import { useThemes } from '../../context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';

const Header = ({ showBack = false, animated = false }) => {
    const { colors } = useThemes();
    const navigation = useNavigation();
    const route = useRoute();

    const arrowScale = new Animated.Value(1);

    const handlePress = () => {
        if (animated) {
            Animated.sequence([
                Animated.timing(arrowScale, {
                    toValue: 0.8,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(arrowScale, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                })
            ]).start(() => navigation.goBack());
        } else {
            navigation.goBack();
        }
    };

    // Get title: fallback to route name if no custom title is set
    const screenTitle = navigation
        .getState()
        .routes.find(r => r.key === route.key)?.name ?? 'Screen';

    return (
        <View style={{
            paddingVertical: 16,
            backgroundColor: colors.background,
            zIndex: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }}>
            {showBack && (
                <TouchableOpacity
                    onPress={handlePress}
                    style={{ position: 'absolute', left: 16 }}
                >
                    <Animated.View style={{ transform: [{ scale: arrowScale }] }}>
                        <Feather name="arrow-left" size={24} color={colors.blue} />
                    </Animated.View>
                </TouchableOpacity>
            )}

            <TranslatedText style={{
                fontWeight: 'bold',
                fontSize: 28,
                color: colors.blue
            }}>
                {screenTitle}
            </TranslatedText>

            <Divider />
        </View>
    );
};

export default CustomHeader;