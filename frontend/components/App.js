import React from 'react'
import TodoList from './TodoList'
import Form from './Form'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'


const initialState = {
  successMessage: '',
  errorMessage: '',
  todos: [],
  form: {
   name: '',
    completed: false
  }
}

export default class App extends React.Component {
  state = initialState

  componentDidMount() {
    this.getTodos()
  }

  getTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({
        ...this.state,
        todos: data,
        successMessage: message
      })
    })
    .catch(err => {
      this.setState({
        ...this.state,
        errorMessage: 'Error no error'
       })
    })
  }

  handleAdd = (name) => {
    const {todos} = this.state
    const newTodo = {name: name, id: Date.now(), completed: false}
    this.setState({ ...this.state, 
      todos: [...todos, newTodo]
    })
  }  
  
  destroy = id => {
    this.setState({ ...this.state, todos: this.state.todos.filter(todo => {
      return (todo.completed === false);
    })})
  }

  toggle = (clickedId) => {
    this.setState({
      ...this.state, todos: this.state.todos.map(todo => {
        if (todo.id === clickedId) {
          return {
            ...todo,completed: !todo.completed
          }
        }
        return todo;
      })
    })
  }

  render() {
    

    const {todos} = this.state
   
    return (
      <div>
        {this.state.errorMessage}
       <h2>Todos:</h2>
       <TodoList toggle={this.toggle} todos={todos}/>
       <Form handleAdd={this.handleAdd}/>
       
       <button onClick={this.destroy}>Clear</button>
      </div>
    )
  }
}