import React, { Component } from 'react';

class ListFormModal extends Component {

    state={

        titleInput: '',
        dateInput: '',
        tasksInput:'',
        taskNum: 0,

        newTasks:[
           

        ]
    }


    coverStyle = {
        width: '100vw',
        height: '100vh',
        zIndex: '10',
        position: 'fixed',
        overflow: 'hidden'
    }


    modalHolder = {
        width: '250px',
        height: '400px',
        backgroundColor: '#fff',
        zIndex: '12',
        margin: ' 0 auto',
        textAlign: 'center',
        marginTop: '100',
        opacity: '100%',
        borderRadius: '4px',
        border: '1px solid #111'
    }

    modalElementStyle = {
        display: 'block',
        margin: 'auto',
        marginTop: '10px',
        marginBottom: '10px'
        

    }

    modalBtn = {
        borderRadius: '4px',
        backgroundColor: '#95f0e2',
        color: '#111',
        decoration: 'none',
        shadow: 'none',
        border: 'none',
        padding: '2px'
    }

    updateTitle = (e) => this.setState({titleInput: e.target.value})

    updateDate = (e) => this.setState({dateInput: e.target.value})

    updateTasksInput = (e) => this.setState({tasksInput: e.target.value})

    submitList = () => {

        if(this.state.titleInput !== '' && this.state.dateInput !== ''){
            let info ={
                listTitle: this.state.titleInput,
                listDate: this.state.dateInput,
                listTasks: this.state.newTasks,
                numTasks: this.state.taskNum

            }

            this.props.newTaskList(info)
            this.setState({titleInput : '', dateInput:'', taskNum: 0, newTasks: []})
            this.props.modalClose()

        }
    }

    close = () =>{
        console.log('close')
    }

    newAddTask = () => {
        this.setState({taskNum: this.state.taskNum + 1})
        if(this.state.tasksInput !== ''){
            let task = {
                taskId: this.state.taskNum,
                taskTitle: this.state.tasksInput
            }
    
            this.setState({newTasks: [ ...this.state.newTasks, task], tasksInput: ''})    

        }
    }

    newTasks(){
            this.state.newTasks.map((task) => {
                console.log(task.taskTitle)
                return(
                    <>
                        <span>{task.taskTitle}</span>
                    </>
                )   
        })

    }

    render() {
        let open = this.props.modalShow;
        if(open === true){
            return (
            
                <div className="Modal-Overlay" style={this.coverStyle} >
                    <div className="Modal-Holder" style={this.modalHolder}>
                            <div>
                                <i style={{fontSize: '15px', cursor: 'pointer', float: 'right', margin: '5px' }} className = {'material-icons'} onClick={this.props.modalClose} >close</i>
                            </div>
                            <h3 style={this.modalElementStyle} >New Task List</h3>
    
                            <div>
                                <input style={this.modalElementStyle} type="text" value={this.state.titleInput} onChange={this.updateTitle} placeholder="List Title..."/>
                                <input style={this.modalElementStyle} type="date" value={this.state.dateInput} onChange={this.updateDate} placeholder="Due Date" />
                                <span style={this.modalElementStyle}>
                                    <input  type="text" value={this.state.tasksInput} onChange={this.updateTasksInput} placeholder="Task..." />
                                    <button style={ {marginLeft:'5px'}} onClick={this.newAddTask} >Add</button>
                                </span>
                                
                            </div>
                            <div>
                            </div>
    
                            <div>
                                {this.state.newTasks.map((task) => {
                                    
                                    return(
                                        <span style={this.modalElementStyle} >{task.taskTitle}</span>
                                    )
                                })}
                            </div>
    
                            <button style={this.modalBtn} onClick={this.submitList} >Create List</button>
                    </div>
                </div>
            );
        }else{
            return null;
        }
       
    }
}

export default ListFormModal;

