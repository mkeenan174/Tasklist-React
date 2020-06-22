
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

    buttonStyle = {
        borderRadius: '2px',
        backgroundColor: '#95f0e2',
        color: '#111111',
        border: 'none',
        decoration: 'none',
        shadow: 'none',
        padding: '10',
        width: '35px',
        height: '15px',
        marginLeft: '5px',
        marginBottom: '3px',
        padding: '1px'
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
                <span >
                    <h6 style= {{display: 'inline-block', float:'left', padding: 0, marginLeft: '5px'}}>{taskId}</h6>
                    <small style={this.taskTextStyle(taskComplete)} >{taskTitle}</small>
                    {' '}
                    <i style={{ display: 'inline-block',fontSize: '15px' , cursor: 'pointer' }} className = {'material-icons'} onClick={this.editingOn}>settings</i>{' '}
                    <input style= {{display: 'inline-block', float:'right', cursor: 'pointer', marginRight: '5px'}} type="radio" onChange = {this.props.markComplete.bind(this, taskId)}/>
                </span>
            )
        }else{
            console.log(this.state.editInput);
            return(
                <span>
                    <h6 style= {{display: 'inline-block', float:'left', padding: 0, marginLeft: '5px'}}>{taskId}</h6>
                    <input style={this.inputStyle} type="text" placeholder="Title..." onChange={this.updateEdit} />
                    <button style={this.buttonStyle} onClick={this.props.editTask.bind(this, taskId, this.state.editInput)} >Edit</button>
                    <i style={{fontSize: '15px', display: 'inline-block', float:'right', cursor: 'pointer', marginRight: '5px' }} className = {'material-icons'} onClick={this.editingOff} >close</i>
                </span>
            )
        }
    }

    taskTextStyle(taskComplete){
        if(taskComplete === true){
            return {
                display: 'inline-block',
                textDecoration : 'line-through'
            }
        }else{
            return {
                display: 'inline-block'
            }
        }
    }
}

