import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import classes from './Orders.module.scss';
import axiosOrders from '../../axios-orders';
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

  state = {
    orders: [],
    isLoading: true
  }

  componentDidMount () {
    axiosOrders.get('/orders.json')
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            id: key,
            ...response.data[key]
          })
        }
        this.setState( { isLoading: false, orders: fetchedOrders } )
        console.log(this.state)
      })
      .catch(error => {
        this.setState( { isLoading: false } )
      })
  }

  render () {
    let orders = this.state.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
        delivery={order.deliveryMethod}
      />
    ));
    return (
      <div className={classes.Orders}>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axiosOrders);