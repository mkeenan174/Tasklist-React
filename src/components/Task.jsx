
import React, { Component } from 'react'

export default class Task extends Component {


    state ={
        editing: false,
        editInput: ''
    }

    taskStyle = {
 
        borderBottom : '2px solid #111111',
        margin: '10px'
    }

    
    editingOn = () => this.setState({editing: true})

    editingOff = () => this.setState({editing:false, editInput:''})

    updateEdit = (e) => this.setState({editInput: e.target.value})


    render() {
        let taskId = this.props.task.taskId;
        let taskTitle = this.props.task.taskTitle;
        let taskComplete = this.props.task.taskComplete
        return (
            <div style={this.taskStyle} >
                {this.taskBody(taskId,taskTitle, taskComplete )}
            </div>
        )
    }

    taskBody(taskId, taskTitle, taskComplete){
        if(this.state.editing === false){
            return(
                <span style={this.taskTextStyle(taskComplete)} >
                    {taskId + ' ' + taskTitle + ' '}  
                    <i style={{fontSize: '15px' , cursor: 'pointer' }} className = {'material-icons'} onClick={this.editingOn}>settings</i>{' '}
                    <input type="radio" style={{cursor: 'pointer'}} onChange = {this.props.markComplete.bind(this, taskId)}/>
                </span>
            )
        }else{
            console.log(this.state.editInput);
            return(
                <span>
                    <input type="text" placeholder="Title..." onChange={this.updateEdit} />
                    <button onClick={this.props.editTask.bind(this, taskId, this.state.editInput)} >Edit</button>
                    <i style={{fontSize: '15px', cursor: 'pointer' }} className = {'material-icons'} onClick={this.editingOff} >close</i>
                </span>
            )
        }
    }

    taskTextStyle(taskComplete){
        if(taskComplete === true){
            return {
                textDecoration : 'line-through'
            }
        }
    }
}

