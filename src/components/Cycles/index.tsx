import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../utils/getNetxtCycle';
import { getNextCycleType } from '../utils/getNexCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();
  const cycleStep = Array.from({ length: state.currentCycle });
  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };
  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cyclesDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              key={`${nextCycleType}_${nextCycle}`}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              aria-label={`indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              title={`indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
            ></span>
          );
        })}
        {/* <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.longBreakTime}`}></span> */}
      </div>
    </div>
  );
}
