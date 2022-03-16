import React from 'react'

const theState = {
  form: {
  input: ""
  }
}

export default class Form extends React.Component {
  state = theState

  submit = evt => {
    evt.preventDefault()
    this.props.handleAdd(this.state.input)
  }

  change = evt => {
    this.setState({
      ...this.state, input: evt.target.value
    })
  }

  render() {
    return (
      <form>
         <input onChange={this.change}/>
         <button onClick={this.submit} >Add</button>
       </form>
    )
  }
}