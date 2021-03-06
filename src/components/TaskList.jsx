import React, {Component} from 'react';
import Task from './Task';


class Tasklist extends Component {
     
    state = {
        newTaskTitle: '',
        newTaskDate: '',
        locked: false,
    }

    inputStyle = {
        display:'inline-block',
        borderRadius: '3px',
        decoration: 'none',
        shadow: 'none', 
        border: '1px solid #eee',
        marginBottom: '3px',
        padding: '1px'
    }
    


    lockList = () =>{
        console.log('Locking')
        if (this.props.tasklist.completion === '100%') {

            if(this.state.locked === false){
                this.setState({locked: true})
                console.log('List locked')
            }else{
                this.setState({locked: false})
                console.log('List unlocked')
            }
        }

    }
    updateInput = (e) => this.setState({newTaskTitle: e.target.value });

    updateDate = (e) => this.setState({newTaskDate: e.target.value});

    submitTask = () => {

        if(this.state.locked === false){
            this.props.addTask(this.props.tasklist.listId, this.state.newTaskTitle);
            this.setState({newTaskTitle: '', newTaskDate : ''});
        }
     
    }


    progressStyle = (percentage) =>{
        return {
            width: percentage,
            backgroundColor : '#95f0e2',
            height: '100%',
            margin: '0',
            padding: '0',
            borderRadius: '5px',
            transition: 'width 2s',
            fontSize: '15px'
        }

    }  
    
  

    render() {
        const {listId, title, dueDate, tasks, completion} = this.props.tasklist;
        console.log(this.state.newTaskTitle, this.state.newTaskDate);
        
        return (
            <div style = {tasklistStyle} >
                 <i style={{fontSize: '15px', display: 'block', float:'right', cursor: 'pointer', marginRight: '5px' }} className = {'material-icons'} onClick={this.props.deleteTaskList.bind(this, listId)} >close</i>
                <h3 style={{margin: '3px'}}>{title}</h3>
                <div className="Task-completion-bar" style={completionBarStyle} >
                    <div className="Task-completion-progress" style={this.progressStyle(completion)}>
                        {completion}
                    </div>
                </div>
                <span>Due: {dueDate}</span>
                {tasks.map((task) =>{
                 return (
                     <Task key={task.taskId} task={task} markComplete={this.props.markComplete.bind(this, listId)} editTask={this.props.editTask.bind(this, listId)} />
                 )
             })}
            
            
             <span>
                 <input type="text" placeholder="Add task..." style={this.inputStyle} value={this.state.newTaskTitle} onChange={this.updateInput} /> 
                 <button style={buttonStyle} onClick={this.submitTask}>add</button>
             </span>

             <span style={checkBoxStyle}>
                 <small>Lock list:</small><input type="checkbox" onClick={this.lockList} checked={this.state.locked} />
             </span>

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
    margin: 'auto',
    marginTop: '15px',
    marginBottom: '15px'
}

const tasklistStyle = {
    position: 'relative',
    textAlign: 'center',
    border: '2px solid #111111',
    width: '300px',
    borderRadius: '4px',
    margin: '15px',
    padding: '10px'

}

const checkBoxStyle = {
    display: 'block',
    margin: 'auto',
    marginTop: '10px'
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
    height: '18px',
    marginLeft: '5px'
}