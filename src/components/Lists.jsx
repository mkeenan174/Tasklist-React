import React from 'react';
import Tasklist from './TaskList';

function Lists(props){
    const lists = props.tasklists;
    // console.log(lists)
    return lists.map((tasklist) =>{
        return(
            <Tasklist key= {tasklist.listId} tasklist ={tasklist} markComplete={props.markComplete} addTask={props.addTask}  />
        )
    })
}

export default Lists ;