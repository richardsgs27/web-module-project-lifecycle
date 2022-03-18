import React from 'react'
import TodoList from './TodoList'
import Form from './Form'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

const initialState = {
  successMessage: '',
  errorMessage: '🥳 ', 
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
        todos: res.data.data,
        successMessage: res.data.message,
      })
    })
    .catch(err => {
    this.setState({
      ...this.state,
      errorMessage: 'Disaster'
    })
       
    })
  }

  handleAdd = (name) => {
    const newTodo = {
      name: name, 
      id: Date.now(), 
      completed: false
    }
      axios.post(URL, newTodo)
        .then(res => {
          this.setState({
            ...this.state,
            todos: [...this.state.todos, res.data.data ]
          })
        })
        .catch(err => {
          debugger
          this.setState({
            ...this.state, errorMessage: ''
          })
        })
  }  

  toggle = (id) => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state,
          successMessage: res.data.message,
          todos: this.state.todos.map(todo => {
            return todo.id == id ? res.data.data : todo
          })
        })
      })
      .catch(err => {
        this.setState({
          ...thiis.state, errorMessage:''
        })
      })

  }

destroy = id => {
  this.setState({ ...this.state, todos: this.state.todos.filter(todo => {
    return (todo.completed === false);
  })})
}

changeInput = (key, value) => {
  this.setState({...this.state, form: {...this.state.form, [key]: value}})
}

render() {


  const {todos} = this.state
 
  return (
    <div>
      {this.state.errorMessage}
     <h2>Todos:</h2>
     <TodoList toggle={this.toggle} todos={todos}/>
     <Form onChange={this.changeInput} handleAdd={this.handleAdd}/>
     
     <button onClick={this.destroy}>Clear</button>
    </div>
  )
}
}

