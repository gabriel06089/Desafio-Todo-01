import styles from './Header.module.css';
import logo from '../assets/logo.svg';
import todo from '../assets/todo.svg';
import { Task } from './Task';
import { PlusCircle, ClipboardText } from 'phosphor-react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { TaskListSummary } from './TaskList';
/**
 * Como estamos usando TypeScript, temos que passar essa interface, veremos algumas dentro do código
 */
interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}
/**
 * Componente responsável pelo cabeçalho da aplicação e por mostrar todos os outros componentes. Definindo a estrutura geral da página.
 */
export function Header() {
  const [task, setTask] = useState<string>('');
  const [tasksList, setTasksList] = useState<Task[]>([]);
  /**
   * Constante responsavel por atualizar o estado da Task com o valor do input.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };
  /**
   * Recebe o texto do input, verifica se está vazio e adiciona a lista de tarefas
   */
  const handleAddTask = () => {
    if (task.trim()) {
      const newTask: Task = {
        id: uuid(),
        text: task,
        isCompleted: false,
      };
      setTasksList((prevTasksList) => [...prevTasksList, newTask]);
      setTask('');
    }
  };
  /**
   * Função checar se a tarefa está completa ou não
   */
  const handleTaskCompletion = (taskId: string) => {
    setTasksList((prevTasksList) => {
      const updatedTasksList = prevTasksList.map((task) => {
        if (task.id === taskId) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      });
      return updatedTasksList;
    });
  };
  /**
   * Função para remover um item da lista
   */
  const handleTaskDeletion = (taskId: string) => {
    setTasksList((prevTasksList) =>
      prevTasksList.filter((task) => task.id !== taskId)
    );
  };
  /**
   * Função responsável por editar o texto dentro do item da lista
   */
  const handleTaskEdit = (taskId: string, newText: string) => {
    setTasksList((prevTasksList) => {
      const updatedTasksList = prevTasksList.map((task) => {
        if (task.id === taskId) {
          return { ...task, text: newText };
        }
        return task;
      });
      return updatedTasksList;
    });
  };
  /**
   * Desabilitar o botão de criar caso nao tenha nada digitado
   */
  const isCreateButtonDisabled = task.trim().length === 0;

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.imgcontainer}>
          <div className={styles.imageWrapper}>
            <img src={logo} alt="Logo do desafio" />
          </div>
          <div className={styles.imageWrapper}>
            <img className={styles.todoimg} src={todo} alt="Texto TO-DO" />
          </div>
        </div>
      </header>
      <div className={styles.listcontainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={task}
          onChange={handleInputChange}
        />
        <button
          className={styles.button}
          onClick={handleAddTask}
          disabled={isCreateButtonDisabled}
          style={{ cursor: isCreateButtonDisabled ? 'not-allowed' : 'pointer' }}
        >
          Criar <PlusCircle size={16} />
        </button>
      </div>
      <div>
        <TaskListSummary tasksList={tasksList} />
        {tasksList.length === 0 ? (
          <div className={styles.emptyList}>
            <div className={styles.grayBar}></div>
            <ClipboardText size={56} className={styles.clipboard} />
            <p className={styles.emptyListText}>
              Você ainda não tem tarefas cadastradas
            </p>
            <p className={styles.emptyListText2}>
              Crie tarefas e organize seus itens a fazer{' '}
            </p>
          </div>
        ) : null}
      </div>
      <ul>
        {tasksList.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            text={task.text}
            isCompleted={task.isCompleted}
            handleTaskCompletion={handleTaskCompletion}
            handleTaskDeletion={handleTaskDeletion}
            handleTaskEdit={handleTaskEdit}
          />
        ))}
      </ul>
    </div>
  );
}
