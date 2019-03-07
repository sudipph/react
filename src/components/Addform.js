import React, {Component} from 'react';
class Addform extends Component{
    constructor(props){
        super(props);
        this.addRecord = this.addRecord.bind(this);
        
    }
    addRecord(e){
        e.preventDefault();
        //console.log(e.target);
        fetch('http://localhost:4000/tasks',{
            method: "POST",
            headers: {'Content-Type':'Application/json'},
            body: JSON.stringify({
                "id": Math.floor((Math.random() + 1) * 0x100000),
            "title":e.target.address.value,
            "isCompleted":"false"})
        })
        .then(res => res.json())
        .then(result => this.props.addRec(result))
        .catch(err => console.log(err));
    }
    
    render(){
        return(
            <form onSubmit={this.addRecord} className="mt5">
                <div className="form-group">
                  <input type="text" className="form-control" name="address" id="address"/>
                </div>
                <div className="form-group">
                  <input type="submit" className="btn btn-primary btn-block" value="Add task" />
                </div>
            </form>
        )
    }
}

export default Addform;