import React from 'react'


export default class Todo extends React.Component {
  handleClick = () => {
    this.props.toggle(this.props.todo.id)
  }

  render() {
    return (<li className='td' onClick={this.handleClick} key={this.props.todo.id}>{this.props.todo.name} {this.props.todo.completed?<span> ✔ </span> : <span> ✖ </span>}</li>)
    
  }
}