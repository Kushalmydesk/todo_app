import React, { useState, useEffect } from 'react';
import styles from '../../styles/form.module.css';
import axios from "redaxios";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';


const Form = () => {
    const [taskText, setTaskText] = useState('');            //This is the initial state for the input field
    const [updateState, setUpdateState] = useState(false);  // this is the initial state for the UpdateState, to change the button state
    const [taskId, setTaskId] = useState(0);               // this is the initial state for the TaskId 
    const [taskList, setTaskList] = useState([]);         // this is the initial state for the TaskLists array


    //This funciton simply just add the task with the API call
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


    //This effect shows up on everytime it sees a change in TaskList 
    useEffect(() => {

        //This function actually do the API call to get the TaskList
        const getTask = async () => {

            try {
                const res = await axios.get("/api/tasks/getTask")
                setTaskList(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getTask();   // function call

    }, [taskList]);

    //This function simply deletes the task by finding its Id
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

    //this function is just for setting the states of the Task, like its Name and Id
    const updateTask = async (e, taskName, taskId) => {
        e.preventDefault();
        setUpdateState(true);     // we are setting it true so that change the "Add" button to "update"
        setTaskText(taskName);   // putting the existing taskname to the input field
        setTaskId(taskId);      // setting the taskId of the task
    }


    //Now this function actually do the Api call with the values, and also set them to their initial states
    const updateAgain = async (e) => {
        e.preventDefault();
        axios({
            method: 'put',
            url: 'api/tasks/updateTask',
            data: {
                id: taskId,       //to find the perfect task we need the Id
                name: taskText   // setting the updated value to the task's name
            }
        })
        // here we are again doing the initialstate value
        setUpdateState(false);
        setTaskText('');
        setTaskId(0);

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
                        onChange={(e) => { setTaskText(e.target.value) }}  //Here we can just set the text value  by calling setter function
                        value={taskText}

                    />
                </form>


                {updateState ?   //checking the state and then switch the button
                    (
                        <div className={styles.the_button}>
                            <button className={styles.button} type='submit' onClick={e => updateAgain(e)}> Update </button>
                        </div>
                    )
                    :
                    (
                        <div className={styles.the_button}>
                            <button className={styles.button} type='submit' onClick={e => addTask(e)}> ADD </button>
                        </div>
                    )
                }

            </div>

            <div className={styles.todo_listItems} >
                {
                    taskList.map((task) => (
                        <div className={styles.todo_item} key={task._id}>
                            <p className={styles.item_content}>{task.name}</p>
                            <ModeEditIcon className={styles.the_button} onClick={e => updateTask(e, task.name, task._id)} />
                            <DeleteIcon className={styles.the_button} onClick={e => deleteTask(e, task._id)} />
                        </div>
                    ))
                }
            </div>

        </div >

    )
}

export default Form;