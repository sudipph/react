import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Addform from './components/Addform';
import Task from './components/task';
class App extends Component {
  constructor(){
    super();
    this.state ={
      tasks:[]
    }
    this.addtaskRecord = this.addtaskRecord.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.delrecord = this.delrecord.bind(this);
    this.getRecord = this.getRecord.bind(this);

    
  }
  componentDidMount(){
    
    fetch('http://localhost:4000/tasks')
    .then(res=>res.json())
    .then(tasks=>this.setState({tasks}))
    .catch(err=>console.log(err));
  }
  addtaskRecord(e){
    console.log(this.state.tasks);
    const tasks = [...this.state.tasks, e];
    //const tasks = {...this, e};
    this.setState({tasks});
  }
  deleteItem(e){
    const id = e.target.getAttribute('datakey');
    console.log(id);
    fetch('http://localhost:4000/tasks/'+id,{
            method: "DELETE",
            headers: {
              'Content-Type':'Application/json'
            }
        })
        .then(res => res.json())
        .then(()=>{
          fetch('http://localhost:4000/tasks/')
          .then(res=>res.json())
          .then(tasks=>this.setState({tasks}))
          .catch(err=>console.log(err));
        })
        .catch(err => console.log(err));
  }
  delrecord(e){
    this.setState({tasks : e});
  }
  getRecord(e){
    console.log(e);
    console.log(this.state.tasks);
    const tasks = this.state.tasks.map(task => {
      //console.log(task.id);
      console.log(e.id);
      if( e.id == task.id ){
        return e;
      }
      return task;
    });
    this.setState({tasks});
  }
  render() {
    //console.log(this.state.tasks);

    const tasks = this.state.tasks.map(task=> <Task key={task.id} {...task} onDel={this.delrecord} onUpdate={this.getRecord} />);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>



        </header>
        <div className="App-intro">
        <div className="container">
        <div className="row">
          
            <div className="col-md-6 offset-md-3">
            <Addform addRec={this.addtaskRecord} />
              <ul className="list-group">
                {/* <li class="list-group-item active">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li> */}
                {tasks}
              </ul>
            </div>
        </div>
        </div>
        
        </div>
      </div>
    );
  }
}

export default App;
