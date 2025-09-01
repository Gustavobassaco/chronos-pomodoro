import type { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
  id: string;
  name: string;
  duration: number;
  startDate: number;
  completeData: number | null; // quando a task chega ao final
  interruptDate: number | null; // quando a task for interrompida
  type: keyof TaskStateModel['config'];
};
