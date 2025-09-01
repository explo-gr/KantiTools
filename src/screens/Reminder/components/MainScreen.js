import TodoList from './TodoList';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';

import SortingWheel from './SortingWheel';
import TINT_COLORS from './TINT_COLORS';
import { useState } from 'react';

const ReminderMain = () => {
    const [ tintList, setTintList ] = useState(TINT_COLORS);
    const [ sortedTint, setSortedTint ] = useState(TINT_COLORS[0]); // "no sorting" option missing

    return (
        <ContainerView>
            <Header title={'Reminder'}/>
            <SortingWheel
                tintColors={tintList}
                selectedTint={sortedTint}
                setSortedColor={setSortedTint}
            />
            <TodoList/>
        </ContainerView>
    );
}

export default ReminderMain;