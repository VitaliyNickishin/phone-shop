import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
import logo from './logo.svg';


//import 'bootstrap/dist/css/bootstrap.min.css'
import './App.sass';
import Navbar from './components/Navbar/Navbar'
import ProductList from './components/ProductList/ProductList'
import Details from './components/Details/Details'
import Cart from './components/Cart/Cart'
import Default from './components/Default/Default'



export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
      </React.Fragment>
    )
  }
}