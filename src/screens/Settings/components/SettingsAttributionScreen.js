import licenses from '../../../config/attributions/attribution.json';
import ContainerView from '../../../components/common/ContainerView';
import { Pressable, FlatList, StyleSheet, Text } from 'react-native';
import { useThemes } from '../../../context/ThemeContext';
import { openBrowserAsync } from 'expo-web-browser';
import Divider from '../../../components/common/Divider';
import { useMemo } from 'react';

const AttributionText = ({ children, pronounced }) => {
    const { defaultThemedStyles } = useThemes();
    const fontSize = pronounced ? 14 : 11;

    return (
        <Text style={[{ fontSize }, defaultThemedStyles.text, styles.text]}>
            {children}
        </Text>
    );
};

const AttributionItem = ({ packageName, repository, publisher, licenses }) => {
    return (
        <Pressable
            style={styles.itemContainer}
            onPress={async () => {
                if (repository) {
                    await openBrowserAsync(repository);
                }
            }}
        >
            <AttributionText pronounced>{packageName}</AttributionText>
            <AttributionText>{repository}</AttributionText>
            <AttributionText>{publisher}</AttributionText>
            <AttributionText>{licenses}</AttributionText>
        </Pressable>
    );
};

const SettingsAttributions = () => {
    const data = useMemo(() => Object.entries(licenses).map(([packageName, value]) => ({
        packageName,
        ...value,
    })), []);

    return (
        <ContainerView>
            <FlatList
                data={data}
                keyExtractor={(item) => item.packageName}
                renderItem={({ item }) => (
                    <AttributionItem
                        packageName={item.packageName}
                        repository={item.repository}
                        publisher={item.publisher}
                        licenses={item.licenses}
                    />
                )}
                ItemSeparatorComponent={Divider}
                initialNumToRender={20}
                maxToRenderPerBatch={25}
                windowSize={10}
            />
        </ContainerView>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'monospace',
    },
    itemContainer: {
        flexDirection: 'column',
        gap: 10,
        marginVertical: 4,
    },
});

// https://reactnative.dev/docs/optimizing-flatlist-configuration#maxtorenderperbatch

export default SettingsAttributions;