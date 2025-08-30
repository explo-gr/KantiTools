import { View, StyleSheet } from 'react-native';
import { useData } from '../../../context/DataContext';
import Button from '../../../components/common/Button';
import { useTranslations } from '../../../context/LanguageContext';

const RefreshButton = () => {
    const { refreshAll } = useData();
    const { t } = useTranslations();

    return (
        <View style={styles.refreshBtnContainer}>
            <Button
                title={t('refresh')}
                onPress={refreshAll}
                icon={'refresh-cw'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    refreshBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
    }
});

export default RefreshButton;