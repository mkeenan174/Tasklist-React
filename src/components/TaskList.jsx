import React, {Component} from 'react';
import Task from './Task';


class Tasklist extends Component {
     
    state = {
        newTaskTitle: '',
        newTaskDate: ''

        
    }
    
    updateInput = (e) => this.setState({newTaskTitle: e.target.value });

    updateDate = (e) => this.setState({newTaskDate: e.target.value});

    submitTask = () => {
        this.props.addTask(this.props.tasklist.listId, this.state.newTaskTitle);
        this.setState({newTaskTitle: '', newTaskDate : ''});
        }


    progressStyle = (percentage) =>{
        return {
            width: percentage,
            backgroundColor : '#95f0e2',
            height: '100%',
            margin: '0',
            padding: '0',
            borderRadius: '5px',

        }

    }    

    render() {
        const {listId, title, tasks, completion} = this.props.tasklist;
        console.log(this.state.newTaskTitle, this.state.newTaskDate);
        
        return (
            <div style = {tasklistStyle} >
                <h3>{title}</h3>
                <div className="Task-completion-bar" style={completionBarStyle} >
                    <div className="Task-completion-progress" style={this.progressStyle(completion)}></div>
                </div>
                {tasks.map((task) =>{
                 return (
                     <Task key={task.taskId} task={task} markComplete={this.props.markComplete.bind(this, listId)} editTask={this.props.editTask.bind(this, listId)} />
                 )
             })}
            
            
             <span><input type="text" placeholder="Add task..." value={this.state.newTaskTitle} onChange={this.updateInput} /> <input type="date" onChange={this.updateDate} value={this.state.newTaskDate} />{' '} 
             <button style={buttonStyle} onClick={this.submitTask} >add</button></span>

         </div>
        );
    }
}

export default Tasklist;

const completionBarStyle = {
    backgroundColor: '#878787',
    borderRadius: '5px',
    width:'70%',
    height:'15px',
    margin: 'auto'
}

const tasklistStyle = {
    position: 'relative',
    display: 'flexbox',
    textAlign: 'center',
    border: '2px solid #111111',
    width: '30%',
    borderRadius: '4px',
    margin: '15px',
    padding: '10px'

}


const buttonStyle = {
    borderRadius: '2px',
    backgroundColor: '#95f0e2',
    color: '#111111',
    border: 'none',
    decoration: 'none',
    shadow: 'none',
    padding: '10',
    width: '35px',
    height: '20px'
}