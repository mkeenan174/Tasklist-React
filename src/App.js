import React, { Component } from 'react';
import PageHeader from './components/PageHeader';
import Lists from './components/Lists';
import ListFormModal from './components/ListFormModal'
import './App.css';


class App extends Component {
  constructor(props){
    super()

    let listCounter = 0;
    let tasklists;
    if(this.loadTaskLists() !== null){
        tasklists = this.loadTaskLists()
        tasklists.forEach((list) => listCounter++);
        console.log(listCounter)
        this.state ={
          modalShow: false,
          numLists: listCounter,

          TaskLists: tasklists

          
        }

    }else{
      this.state = {
        modalShow: false,
        numLists: 0,
        TaskLists:[
              // {
                // listId: 1,
                // title: 'Daily Tasks',
                // dueDate: '00-00-0000',
                // completion: '0%',
                // numTasks: 3,
                // tasks:[
                  // {
                    // taskId: 1.1,
                    // taskTitle: 'Make bed',
                    // taskComplete: false
                  // },
                  // {
                    // taskId: 1.2,
                    // taskTitle: 'Cook Dinner',
                    // taskComplete: false
                  // },
                  // {
                    // taskId: 1.3,
                    // taskTitle: 'Clean up',
                    // taskComplete: false
                  // }
                // ]
              // },
              // {
                // listId: 2,
                // title: 'Personal goals',
                // dueDate: '12-12-2021',
                // completion: '0%',
                // numTasks: 2,
                // tasks:[
                  // {
                    // taskId: 2.1,
                    // taskTitle: 'Loose weight ',
                    // taskComplete: false
                  // },
                  // {
                    // taskId: 2.2,
                    // taskTitle: 'Learn Python',
                    // taskComplete: false
                  // }
                // ]
              // }
            ]
      }
    }

}  
    
 

 listHolderStyle={
    width: '100vw',
    margin: '0',
    padding: '5px',
    border:'solid 1px #111111',
    display: 'flex',
    flexWrap: 'wrap' 

}

saveTaskLists(){
  let taskListData = JSON.stringify(this.state.TaskLists)
  localStorage.setItem('saveData', taskListData);
}


loadTaskLists(){
  let taskListData = localStorage.getItem('saveData')
  return JSON.parse(taskListData);
}


addTask = (listId, taskInput) =>{
 this.setState({TaskLists: this.state.TaskLists.map((tasklist) => {
  if(listId === tasklist.listId){
    tasklist.numTasks = tasklist.numTasks + 1
    let taskId = listId +  (tasklist.numTasks * .1)   ;
    const newTask = {
      taskId,
      taskTitle: taskInput,
      taskComplete: false
      
    }
    tasklist.tasks.push(newTask)
    tasklist.completion = this.setPercentage(tasklist)
    return tasklist
    }
    return tasklist
  }) 
})

}


 setPercentage = (tasklist) =>{
   let completeCounter = 0;
   tasklist.tasks.forEach(task => {
    if(task.taskComplete === true){
      completeCounter++;
    } 
   });
   let percentage = (completeCounter / tasklist.numTasks * 100).toFixed(0);
   percentage = percentage.toString()+'%'
   console.log(percentage);
   return percentage;
 }

 editTask = (listId, taskId, edit) =>{
    console.log(listId, taskId, edit)
    this.setState({TaskLists: this.state.TaskLists.map((tasklist) =>{
      if(listId === tasklist.listId){
        tasklist.tasks.map((task) =>{
          if(taskId === task.taskId){
            task.taskTitle = edit
            console.log(task.taskTitle)
            return task
          }
        })
      }

      return tasklist
    })
  })
 }

 markComplete = (listId, taskId) =>{
        console.log(listId, taskId)
        this.setState({ TaskLists: this.state.TaskLists.map((tasklist) => {
          if(listId === tasklist.listId){
            tasklist.tasks.map((task) => {
              if(taskId === task.taskId){
                task.taskComplete = true;
                tasklist.completion = this.setPercentage(tasklist);
                return task
                
              } 
            })
          }
          return tasklist  
        })  
      });
 }


  modalOpen = () =>{
    console.log('open')
    if(this.state.modalShow === false){
      this.setState({ modalShow: true})
    }
  } 

  modalClose = () =>{
    console.log('close')
    if(this.state.modalShow === true){
      this.setState({modalShow: false})
    }
  } 

  modalToggleElement = {
    display: 'inline-block',
    color: '#111',
    margin: '5px'

  }

  newTaskList = (listInfo) => {
      console.log(listInfo)
      this.setState({numLists: this.state.numLists + 1})
      let listTasks = []
      let taskCounter = 1

      listInfo.listTasks.forEach((taskInfo)=> {
          let newTask = {
            taskId: this.state.numLists + (taskCounter * 0.1),
            taskTitle: taskInfo.taskTitle,
            taskComplete: false
          }

          listTasks.push(newTask)
          taskCounter++
      })

      let TaskList = {
        listId: this.state.numLists,
        title: listInfo.listTitle,
        dueDate: listInfo.listDate,
        completion: '0%',
        locked: false,
        numTasks: listInfo.numTasks,
        tasks: listTasks
      }

      this.setState({TaskLists: [...this.state.TaskLists, TaskList]})
  }


  deleteTaskList = (listId) =>{
    let newTaskLists = [];
    this.state.TaskLists.forEach((tasklist) =>{
        if(tasklist.listId !== listId) newTaskLists.push(tasklist);
    })

    this.setState({TaskLists: newTaskLists});
  }

  componentDidUpdate(prevProps, prevState){
      if(this.state.TaskLists !== prevState.TaskLists){
        console.log('saving...')
        this.saveTaskLists()
      }
  }
  render() {
    return (
       <div>
         <PageHeader title={'Task Board'} />
         <ListFormModal modalShow={this.state.modalShow} modalClose={this.modalClose} newTaskList={this.newTaskList}/>
         <span onClick={this.modalOpen} style={{float: "right", borderRadius: '4px', border: '1px solid #111', cursor:"pointer", margin: '3px'}}>
           <h5 style={this.modalToggleElement} >Create List</h5>
           <i style={this.modalToggleElement} className={'material-icons'} >add</i>
         </span>
         <div style={this.listHolderStyle} className = {'TaskList-Holder'} >
           <Lists tasklists={this.state.TaskLists} markComplete={this.markComplete} addTask={this.addTask} editTask={this.editTask} deleteTaskList={this.deleteTaskList} />
         </div>
       </div>
      
    );
  }
}

export default App;