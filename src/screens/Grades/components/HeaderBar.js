import { Alert } from 'react-native';
import { useData } from '../../../context/DataContext';
import ActionBox from '../../../components/common/ActionBox';
import ActionBoxContainer from '../../../components/common/ActionBoxContainer';
import calcPlusMinusPunkte from '../../../lib/calcPlusMinuspunkte';
import { useTranslations } from '../../../context/LanguageContext';

const HeaderBar = ({ navigation }) => {
    const { grades, isReady } = useData();
    const { t } = useTranslations();

    const handlePluspunkte = () => {
        if (isReady) {
            const {
                plus,
                minus
            } = calcPlusMinusPunkte(grades.data.map(({ onlineMean }) => onlineMean));

            Alert.alert(
                t('gr_pluspoints'),
                `${t('gr_curr_pluspoints')}${plus}\n${t('gr_curr_minuspoints')}${minus}`,
                null,
                { cancelable: true }
            );
        };
    };

    return (
        <ActionBoxContainer>
            <ActionBox
                label={'gr_calcgrade'}
                icon={'divide-square'}
                onPress={() => {
                    navigation.navigate('GradesGradeCalc');
                }}
            />
            <ActionBox
                label={'gr_calcmin'}
                icon={'bar-chart-2'}
                onPress={() => {
                    navigation.navigate('GradesMinCalc');
                }}
            />
            <ActionBox
                label={'gr_pluspoints'}
                icon={'plus'}
                onPress={handlePluspunkte}
            />
        </ActionBoxContainer>
    );
}

export default HeaderBar;