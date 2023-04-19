import styles from './Task.module.css';
import React, { useState } from 'react';
import { Check, Trash, Pencil, FloppyDisk } from 'phosphor-react';

interface TaskProps {
  id: string;
  text: string;
  isCompleted: boolean;
  handleTaskCompletion: (taskId: string) => void;
  handleTaskDeletion: (taskId: string) => void;
  handleTaskEdit: (taskId: string, newText: string) => void;
}

interface TaskState {
  isEditing: boolean;
  editText: string;
  isChecked: boolean;
}

export function Task({
  id,
  text,
  isCompleted,
  handleTaskCompletion,
  handleTaskDeletion,
  handleTaskEdit,
}: TaskProps) {
  /*
   *Criando constantes para atualizar o estado.
   */
  const [state, setState] = useState<TaskState>({
    isEditing: false,
    editText: text,
    isChecked: isCompleted,
  });
  /*
   * Responsável por aplicar as propriedades quando clicamos na checkbox
   */
  const handleCheckboxChange = () => {
    setState((prevState) => ({
      ...prevState,
      isChecked: !prevState.isChecked,
    }));
    handleTaskCompletion(id);
  };
  /*
   *Aplica o checked para esconder a opção de editar
   */
  const handleEditTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!state.isChecked) {
      setState((prevState) => ({
        ...prevState,
        editText: event.target.value,
      }));
    }
  };
  /*
   *Verifica se o texto da edição esta em branco e atualiza o texto do item
   */
  const handleEditTask = () => {
    if (state.editText.trim() && !state.isChecked) {
      handleTaskEdit(id, state.editText);
      setState((prevState) => ({
        ...prevState,
        isEditing: false,
      }));
    }
  };

  return (
    <li className={styles.task}>
      <div className={styles.content}>
        <label
          className={`${styles.label} ${
            state.isChecked ? styles.completed : ''
          }`}
        >
          <div
            className={
              state.isChecked ? styles.checkCircleChecked : styles.checkCircle
            }
            onClick={handleCheckboxChange}
          >
            {state.isChecked && <Check size={15} weight="bold" />}
          </div>
          {text}
        </label>
        <div className={styles.buttons}>
          {!state.isChecked && (
            <button
              className={styles.editIcon}
              onClick={() =>
                setState((prevState) => ({ ...prevState, isEditing: true }))
              }
            >
              <Pencil weight="bold" size={24} />
            </button>
          )}

          <button
            className={styles.trashIcon}
            onClick={() => handleTaskDeletion(id)}
          >
            <Trash weight="bold" size={24} />
          </button>
        </div>
      </div>
      {state.isEditing && (
        <div className={styles.edit}>
          <input
            type="text"
            value={state.editText}
            onChange={handleEditTextChange}
            disabled={state.isChecked}
          />
          {!state.isChecked && (
            <button className={styles.editIcon} onClick={handleEditTask}>
              <FloppyDisk weight="bold" size={24} />
            </button>
          )}
        </div>
      )}
    </li>
  );
}
