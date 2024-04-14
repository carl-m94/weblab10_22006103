import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import './App.css';

function TaskInput(props) {
  /* This Component receives the method addTask in props to then send as param the value of Form.Control which is our input*/
  return (
    <>
      <Form.Control type="text" placeholder="Type your task" id="input"/>
      <br />
      <Button
        variant="primary"
        onClick={() => {
          props.addTask(document.getElementById('input').value);
          document.getElementById('input').value = "";
        }}
      >
        Add Task
      </Button>
    </>
  );
}

/* This Component receives the Tasks array in props to then create a ListGroup.Item to each of the indexes, so we can show the tasks that have been saved*/
/* Also, the method deleteTasks is sent as a prop so we can then add it at the onClick event of the delete Button*/
function TaskList(props) {
  /*The code props.Tasks.map((name, index) => etc.) iterates over the array Tasks to obtain every element from the array including the indexes of each element, this map function help us to make the TaskList dynamic because it changes with every update the array*/
  return props.Tasks.map((name, index) => {
    return (
      <ListGroup.Item
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{name}</span>
        <Button variant="danger" onClick={ () => {props.deleteTask({ index }) ;}}>
          Delete
        </Button>
      </ListGroup.Item>

    );
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);

    //Initialization of the state
    this.state = {
      Tasks: [],
      count: 0,
    };

    //The method this.setState wasn't working, and I don't feel like that makes any sense but who am I to judge this thing?. Anyway, I searched on Google for the solution and this appeared: bind() sends data as an argument to the function. In other words, I'm sending the data from the App class to the method so it can recognize the state, which is kinda strange considering that the function is literally inside the App class. But if it's working, I ain't touching that, I prefer to let it be.

    this.addTasks = this.addTasks.bind(this);
    this.deleteTasks = this.deleteTasks.bind(this);
  }

  //We add a nex task to our Tasks array in state
  addTasks(TaskToAdd) {
    if(TaskToAdd != ""){
      this.setState(
        { 
          Tasks: [...this.state.Tasks, TaskToAdd],
          count: this.state.count + 1
        }
      );
    }
  }

  deleteTasks(taskIndex) {
    //We create the const updateTasks to create a copy of Tasks so then we can modify it as a variable and not exactly as an element from the state
    const updatedTasks = this.state.Tasks;

    //We delete the selected index from the TaskList
    updatedTasks.splice(taskIndex.index, 1);

    //We use the setState method to change our Tasks array to a new one that doesn't have the deleted index
    this.setState(
      { Tasks: updatedTasks,  
        count: this.state.count - 1
      }
    );
  }

  deleteAllTasks(){
    this.setState(
      {
        Tasks: [],
        count: 0
      }
    )
  }

  render() {
    return (
      <div>
        <h1>Complete Task Dashboard</h1>
        <div style={{ display: 'inline-block' }}>
          <TaskInput addTask={this.addTasks} />
          <br />
          <br />
          <h4>{this.state.count} pending tasks</h4>
          <ListGroup>
            <TaskList Tasks={this.state.Tasks} deleteTask={this.deleteTasks} />
          </ListGroup>
          <br />
          <Button variant="danger" onClick={() => this.deleteAllTasks()}>Delete All</Button>
        </div>
      </div>
    );
  }
}

export default App;
