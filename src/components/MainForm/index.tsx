import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../utils/getNetxtCycle';
import { getNextCycleType } from '../utils/getNexCycleType';
import { formatSecondsToMinutes } from '../utils/formatSecondsToMinutes';

export function MainForm() {
  // const [taskName, setTaskName] = useState('');
  const taskNameInput = useRef<HTMLInputElement>(null);
  const { state, setState } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim(); //remove espaços
    if (!taskName) {
      alert('Digite o nome da tarefa');
      return;
    }
    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeData: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };
    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleInterrupTask() {
    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: prevState.tasks.map(task => {
          if (prevState.activeTask && prevState.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    });
  }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          placeholder='digite algo ex: estudar'
          labelText='Task'
          id='input'
          type='text'
          // value={taskName} // input controlado
          // onChange={e => setTaskName(e.target.value)}
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton
            aria-label='iniciar nova tarefa'
            title='iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
            key='botao de submit'
          />
        ) : (
          <DefaultButton
            aria-label='parar tarefa'
            title='parar tarefa'
            type='button'
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleInterrupTask}
            key='botao de interrupcao'
          />
        )}
      </div>
    </form>
  );
}
