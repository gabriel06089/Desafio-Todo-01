import { useState, useEffect } from 'react';
import styles from './TaskList.module.css';
import { Task } from './Task';

interface TaskItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface TaskListSummaryProps {
  tasksList: TaskItem[];
}

export function TaskListSummary({ tasksList }: TaskListSummaryProps) {
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  /*
   * Checa e registra a quantidade de tarefas concluídas
   */
  useEffect(() => {
    setTotalTasks(tasksList.length);
    setCompletedTasks(tasksList.filter((task) => task.isCompleted).length);
  }, [tasksList]);

  return (
    <div className={styles.container}>
      <span className={styles.tasks}>
        Tarefa Criadas <span className={styles.counter}>{totalTasks} </span>
      </span>
      <span className={styles.completedTasks}>
        Concluídas{' '}
        <span className={styles.counter}>
          {' '}
          {completedTasks} de {totalTasks}
        </span>
      </span>
    </div>
  );
}
