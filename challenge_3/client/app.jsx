'use strict';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.page0 = (
      <button onClick={this.next.bind(this)}>Checkout</button>
    )
    this.page1 = (
      <h2>Test</h2>
    )
    this.state = {
      stage: 1,
      name: '',
      email: '',
      pass: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      phoneNumber: '',
      cc: '',
      expires: '',
      cvv: '',
      billingZip: ''
    }
  }

  handleUpdate(e) {
    var newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  handleSubmit(event) {
    for (var child of event.target.children) {
      console.log(child.name)
    }
    event.preventDefault();
    this.next()
  }

  next() {
    const newStage = this.state.stage + 1
    this.setState({stage: newStage})
  }

  render() {
    if (this.state.stage === 0) {
      return <Home next={this.next.bind(this)}/>
    } else if (this.state.stage === 1) {
      return <CheckoutStageOne submit={this.handleSubmit.bind(this)} next={this.next.bind(this)} change={this.handleUpdate.bind(this)} state={this.state}/>
    } else if (this.state.stage === 2) {
      return <CheckoutStageTwo next={this.next.bind(this)} />
    }
  }
}

const Home = (props) => {
  return (
    <button onClick={props.next}>Checkout</button>
  )
}

const CheckoutStageOne = (props) => {
  return (
    <form id="F1" onSubmit={props.submit}>
      <label htmlFor="name" >Name</label>
      <input type="text" name="name" onChange={props.change} value={props.state.name} required></input>

      <label htmlFor="email" >Email</label>
      <input type="email" name="email" onChange={props.change} value={props.state.email} required></input>

      <label htmlFor="password" >New Password</label>
      <input type="password" name="password" onChange={props.change} value={props.state.password} required></input>

      <input type="submit" value="Next: Billing" />
    </form>
  )
}

const CheckoutStageTwo = (props) => {
  return (
    <form id="F2">
      <label htmlFor="address1" >Address</label>
      <input type="text" name="address1" placeholder="Address" required></input>
      <input type="text" name="address1" placeholder="Address 2"></input>

      <label htmlFor="city" >City</label>
      <input type="city" name="city" placeholder="i.e. Los Angeles" required></input>

      <label htmlFor="state" >State</label>
      <input type="state" name="state" required></input>
      <label htmlFor="zip" >Zip Code</label>
      <input type="zip" name="zip" required></input>

      <button onClick={props.next}>Next: Billing Information</button>
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

