import React, { Component,Fragment } from 'react'

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.deletetask = this.deletetask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.updatetask = this.updatetask.bind(this);
       // this.onUpdate = this.onUpdate.bind(this);
        this.state = {
            isedit:false
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
          .then(tasks=>this.props.onDel(tasks))
          .catch(err=>console.log(err));
        })
        .catch(err => console.log(err));

    }
    editTask(){

      this.setState({isedit: true});
      console.log(this.state.isedit);
     // console.log(e.target)
    }
    updatetask(e){
      e.preventDefault();
      const id = e.target.id.value;
      console.log(e.target.address.value);
      //console.log(e.target);
      fetch('http://localhost:4000/tasks/'+id,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          title: e.target.address.value,
          id: e.target.id.value
        })
      }).then(res=>res.json())
      .then(task=>
        {
          this.props.onUpdate(task)
          this.setState({isedit:false})
        })
      .catch(err=>console.log(err));

    }
  render() {
    
      const {id,title,isCompleted} = this.props;
console.log(this.state.isedit);
      const task = (this.state.isedit === true) ?
      <form onSubmit={this.updatetask} className="mt5">
      <input type="hidden" name="id" id="id" defaultValue={id}/>
          <div className="form-group">
            <input type="text" className="form-control" defaultValue={title} name="address" id="address"/>
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary btn-block" value="Update Task" />
          </div>
      </form>
      :
        <li className="list-group-item" key={id}>{title} {isCompleted} - 
        <button className="btn btn-primary" onClick={this.editTask} datakey={id} >Edit</button>
        <button className="btn btn-danger" onClick={this.deletetask} datakey={id} >Delete</button>
        </li>
        ;
    return (
      <Fragment>
        {task}
        </Fragment>
    )
  }
}
