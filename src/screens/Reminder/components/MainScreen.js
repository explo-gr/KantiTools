import TodoList from './TodoList';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';

import SortingWheel from './SortingWheel';
import TINT_COLORS from './TINT_COLORS';
import { useCallback, useState } from 'react';

const ReminderMain = () => {
    const [ sortedTint, setSortedTint ] = useState(null); // "no sorting" option missing

    const todosFilterFn = useCallback((todos = []) => 
        todos.filter((e) =>
            sortedTint
                ? e.tint === sortedTint
                : e
        )
    , [sortedTint]);

    return (
        <ContainerView>
            <Header
                title={'Reminder'}
            />
            <SortingWheel
                tintColors={TINT_COLORS}
                selectedTint={sortedTint}
                setSortedColor={setSortedTint}
            />
            <TodoList
                filterFn={todosFilterFn}
            />
        </ContainerView>
    );
}

export default ReminderMain;