import React, { useState, useEffect } from 'react';
import styles from '../../styles/form.module.css';
import axios from "redaxios";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';


const Form = () => {
    const [taskText, setTaskText] = useState('');
    const [taskList, setTaskList] = useState([]);

    const addTask = async (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'api/tasks/addTask',
            data: {
                name: taskText
            }
        });
        setTaskText('');
    }

    useEffect(() => {
        const getTask = async () => {

            try {
                const res = await axios.get("/api/tasks/getTask")
                setTaskList(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getTask();

    }, [taskList]);


    const deleteTask = async (e, id) => {
        e.preventDefault();
        axios({
            method: 'delete',
            url: 'api/tasks/deleteTask',
            data: {
                id: id
            }
        })
    }


    return (
        <div className={styles.full_app}>
            <h1>Task Table</h1>
            <div className={styles.the_form}>
                <form >
                    <input
                        type="text"
                        className={styles.form_input}
                        placeholder='Add some task'
                        onChange={(e) => { setTaskText(e.target.value) }}
                        value={taskText}

                    />
                </form>
                <div className={styles.the_button}>
                    <button className={styles.button} type='submit' onClick={e => addTask(e)}> ADD </button>
                </div>

            </div>

            <div className={styles.todo_listItems} >
                {
                    taskList.map((task) => (
                        <div className={styles.todo_item} key={task._id}>
                            <p className={styles.item_content}>{task.name}</p>
                            <ModeEditIcon className={styles.the_button} onClick={e => updateTask(e)} />
                            <DeleteIcon className={styles.the_button} onClick={e => deleteTask(e, task._id)} />
                        </div>
                    ))
                }
            </div>

        </div >

    )
}

export default Form;