import TodoList from './TodoList';
import ContainerView from '../../../components/common/ContainerView';
import Header from '../../../components/common/Header';

const ReminderMain = () => {
    return (
        <ContainerView>
            <Header title={'Reminder'}/>
            <TodoList/>
        </ContainerView>
    );
}

export default ReminderMain;