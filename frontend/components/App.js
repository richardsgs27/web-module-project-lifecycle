import React from 'react'
import TodoList from './TodoList'
import Form from './Form'
import axios from 'axios'


const URL = 'http://localhost:9000/api/todos'


const initialState = {
  successMessage: '',
  errorMessage: 'Error: No Error!🥳 ', 
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
  
        })
    /*this.setState({ ...this.state, 
      todos: [...todos, newTodo]
    }) */
  }  
  toggle = (id) => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state,
          successMessage: res.data.message,
          todos: this.state.quotes.map(todo => {
            return todo.id == id ? res.data.data : todo
          })
        })
      })
      .catch(err => {
        debugger
      })
    
  }
/*this.setState({
      ...this.state, todos: this.state.todos.map(todo => {
        if (todo.id === clickedId) {
          return {
            ...todo,completed: !todo.completed
          }
        }
        return todo;
      })
    }) */
  
  destroy = id => {
    this.setState({ ...this.state, todos: this.state.todos.filter(todo => {
      return (todo.completed === false);
    })})
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