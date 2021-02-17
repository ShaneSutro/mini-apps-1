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
      userId: 0,
      stage: 0,
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

  initializeUser(event) {
    event.preventDefault();

    var newUser = {}
    for (var child of event.target.children) {
      if (child.name) {
        newUser[child.name] = child.value
      }
    }

    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        console.log(data.insertId)
        this.setState({userId: data.insertId})
      })
      .catch(err => console.log('Error adding new user:', err))
    this.next()
  }

  updateUser(event) {
    event.preventDefault()

    var data = {}
    var update = {}
    for (var child of event.target.children) {
      if (child.name) {
        update[child.name] = child.value
      }
    }

    data.options = update;
    data.id = this.state.userId

    fetch('/next', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log('Error adding new user:', err))

    this.next()
  }

  finalize() {
    var newState = {}
    for (var item in this.state) {
      console.log('Resetting', item)
      newState[item] = ''
    }
    newState.userId = 0
    newState.stage = 0
    this.setState({...newState})
  }

  next() {
    const newStage = this.state.stage + 1
    this.setState({stage: newStage})
  }

  render() {
    if (this.state.stage === 0) {
      return <Home next={this.next.bind(this)}/>
    } else if (this.state.stage === 1) {
      return <CheckoutStageOne submit={this.initializeUser.bind(this)} next={this.next.bind(this)} change={this.handleUpdate.bind(this)} state={this.state}/>
    } else if (this.state.stage === 2) {
      return <CheckoutStageTwo submit={this.updateUser.bind(this)} next={this.next.bind(this)} change={this.handleUpdate.bind(this)} state={this.state} />
    } else if (this.state.stage === 3) {
      return <CheckoutStageThree submit={this.updateUser.bind(this)} next={this.next.bind(this)} change={this.handleUpdate.bind(this)} state={this.state} />
    } else {
      return <Review state={this.state} finalize={this.finalize.bind(this)}/>
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

      <label htmlFor="pass" >New Password</label>
      <input type="password" name="pass" onChange={props.change} value={props.state.password} required></input>

      <input type="submit" value="Next: Personal Info" />
    </form>
  )
}

const CheckoutStageTwo = (props) => {
  return (
    <form id="F2" onSubmit={props.submit}>
      <label htmlFor="address1" >Address</label>
      <input type="text" name="address1" placeholder="Address" onChange={props.change} value={props.state.address1} required></input>
      <input type="text" name="address2" placeholder="Address 2" onChange={props.change} value={props.state.address2}></input>

      <label htmlFor="city" >City</label>
      <input type="text" name="city" placeholder="i.e. Los Angeles" onChange={props.change} value={props.state.city} required></input>

      <label htmlFor="state" >State</label>
      <input type="text" name="state" onChange={props.change} value={props.state.state} required></input>
      <label htmlFor="zip" >Zip Code</label>
      <input type="text" name="zip" onChange={props.change} value={props.state.zip} required></input>

      <label htmlFor="phoneNumber" >Phone Number</label>
      <input type="text" name="phoneNumber" onChange={props.change} value={props.state.phoneNumber} required></input>

      <input type="submit" value="Next: Billing Information" />
    </form>
  )
}

const CheckoutStageThree = (props) => {
  return (
    <form id="F3" onSubmit={props.submit}>
      <label htmlFor="cc" >Credit Card Number</label>
      <input type="text" name="cc" onChange={props.change} value={props.state.cc} required></input>

      <label htmlFor="expires" >Expiration</label>
      <input type="text" name="expires" placeholder="Expiration" onChange={props.change} value={props.state.expires} required></input>

      <label htmlFor="cvv" >CVV</label>
      <input type="text" name="cvv" onChange={props.change} value={props.state.cvv} required></input>

      <label htmlFor="billingZip" >Billing Zip Code</label>
      <input type="text" name="billingZip" onChange={props.change} value={props.state.billingZip} required></input>

      <input type="submit" value="Review Order" />
    </form>
  )
}

const Review = (props) => {
  return (
    <div>
      <h1>Review Your Order</h1>

      <h3>Name</h3>
      <p>{props.state.name}</p>

      <h3>Email</h3>
      <p>{props.state.email}</p>

      <h3>Address</h3>
      <p>{props.state.address1} {props.state.address2}</p>
      <p>{props.state.city}, {props.state.state} {props.state.zip}</p>
      <p>Phone: {props.state.phoneNumber}</p>

      <button onClick={props.finalize}>Purchase</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

