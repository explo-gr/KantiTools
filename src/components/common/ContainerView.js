import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useThemes } from '../../context/ThemeContext';
import { useHeaderHeight } from '@react-navigation/elements';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';

const ContainerView = ({ children, style, ignoreHeight = false }) => {
    const { defaultThemedStyles, theme } = useThemes();

    const headerHeight = useHeaderHeight();
    const { width } = useWindowDimensions();

    const contentWidth = useMemo(() => width < 800 ? '94%' : '82%', [width]);
    const addedPadding = useMemo(() => headerHeight === 0 ? 40 : 20, [headerHeight]);

    const contentHeight = ignoreHeight ? '100%' : '95%';

    const rootStyle = useMemo(() => ({
        paddingTop: ignoreHeight ? 0 : addedPadding
    }), [ignoreHeight, addedPadding]);

    const contentStyle = useMemo(() => ({
        width: contentWidth,
        height: contentHeight
    }), [contentHeight, contentWidth]);

    return (
        <View style={[
            defaultThemedStyles.view,
            styles.rootView,
            rootStyle
        ]}>
            <View style={[
                style,
                styles.contentView,
                contentStyle
            ]}>
                {children}
                <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rootView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    contentView: {
        flex: 1
    }
});

export default ContainerView;