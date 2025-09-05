import { useData } from '../../../context/DataContext';
import ActionBox from '../../../components/common/ActionBox';
import ActionBoxContainer from '../../../components/common/ActionBoxContainer';
import calcPlusMinusPunkte from '../../../lib/calcPlusMinuspunkte';
import { useTranslations } from '../../../context/LanguageContext';
import { useShowAlert } from '../../../hooks/useShowAlert';

const HeaderBar = ({ navigation }) => {
    const { grades, isReady } = useData();
    const { t } = useTranslations();
    const showAlert = useShowAlert();

    const handlePluspunkte = () => {
        if (isReady) {
            const {
                plus,
                minus
            } = calcPlusMinusPunkte(grades.data.map(({ onlineMean }) => onlineMean));

            showAlert({
                title: t('gr_pluspoints'),
                message: `${t('gr_curr_pluspoints')}${plus}\n${t('gr_curr_minuspoints')}${minus}`
            });
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