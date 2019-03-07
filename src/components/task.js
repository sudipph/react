import React, { Component } from 'react'

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.deletetask = this.deletetask.bind(this);
        this.edittask = this.edittask.bind(this);
        this.updatetask = this.updatetask.bind(this);
        this.task = {
            "isedit":"false"
        };
    }
    deletetask(e){
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
          .then(tasks=>this.props.onDel({tasks}))
          .catch(err=>console.log(err));
        })
        .catch(err => console.log(err));

    }
    edittask(){

    }
    updatetask(){

    }
  render() {
      const {id,title,isCompleted} = this.props;
    return (
        <li className="list-group-item" key={id}>{title} {isCompleted} - 
        <button className="btn btn-primary" >Edit</button>
        <button className="btn btn-danger" onClick={this.deletetask} datakey={id} >Delete</button>
        </li>
    )
  }
}
