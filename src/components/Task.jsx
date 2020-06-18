import React from 'react';


function Task(props){
    const {taskId, taskTitle, taskComplete} = props.task;
    return(
    <div style={taskStyle} >
        <span style={taskTextStyle(taskComplete)} >{taskId + ' ' +taskTitle} </span>{' '} <input type="radio" onChange = {props.markComplete.bind(this, taskId)}/></div>

    );

}


const taskStyle = {
    
    borderBottom : '2px solid #111111',
    margin: '10px'

}

function taskTextStyle(taskComplete){
    if(taskComplete === true){
        return {
            textDecoration : 'line-through'
        }
    }
}

export default Task;