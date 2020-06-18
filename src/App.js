import React, { Component } from 'react';
import PageHeader from './components/PageHeader';
import Lists from './components/Lists';
import './App.css';


class App extends Component {
  state = {

    TaskLists:[

      {
        listId: 1,
        title: 'Daily Tasks',
        completion: '50%',
        numTasks: 3,
        tasks:[

          {
            taskId: 1.1,
            taskTitle: 'Make bed',
            taskComplete: false
          },
  
          {
            taskId: 1.2,
            taskTitle: 'Cook Dinner',
            taskComplete: false
          },
  
          {
            taskId: 1.3,
            taskTitle: 'Clean up',
            taskComplete: false
          }

        ]
         

      },

      {
        listId: 2,
        title: 'Personal goals',
        completion: '50%',
        numTasks: 2,
        tasks:[
          {
            taskId: 2.1,
            taskTitle: 'Loose weight ',
            taskComplete: false
          },

          {
            taskId: 2.2,
            taskTitle: 'Learn Python',
            taskComplete: false
          }

        ]

      }

    ]


  }

 listHolderStyle={
    width: '100vw',
    margin: '0',
    padding: '5px',
    border:'solid 1px #111111',
    display: 'flex'
}

addTask = (listId, taskInput) =>{
  console.log(listId, taskInput);

  

 this.setState({TaskLists: this.state.TaskLists.map((tasklist) => {
  if(listId === tasklist.listId){
    tasklist.numTasks = tasklist.numTasks + 1
    let taskId = listId + (tasklist.numTasks * .1);
    const newTask = {
      taskId,
      taskTitle: taskInput,
      taskComplete: false
      
    }
    tasklist.tasks.push(newTask)
    console.log(tasklist.tasks)
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
   console.log(percentage);
   return percentage;
 }


 markComplete = (listId, taskId) =>{
        console.log(listId, taskId)
        this.setState({ TaskLists: this.state.TaskLists.map((tasklist) => {
          if(listId === tasklist.listId){
            tasklist.tasks.map((task) => {
              if(taskId === task.taskId){
                task.taskComplete = true;
                this.setPercentage(tasklist);
                return task
                
              }

             
            })
          }
          
          return tasklist
          
        })  
      });
 }



  render() {
    return (
      <div>
        <PageHeader title={'Task Board'} />
        <div style={this.listHolderStyle} className = {'TaskList-Holder'} >
          <Lists tasklists={this.state.TaskLists} markComplete={this.markComplete} addTask={this.addTask} />
        </div>
      </div>
    );
  }
}

export default App;