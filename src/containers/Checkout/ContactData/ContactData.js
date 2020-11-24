import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.scss';
import axiosOrders from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'You Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Where are you from?'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email'
        },
        value: ''
      }
    },
    deliveryMethod: {
      elementType: 'select',
      elementconfig: {
        options: [
          {value: 'fastest', displayValue: 'Fastest'},
          {value: 'economy', displayValue: 'Economy'},
        ]
      }
    },
    isLoading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState( { isLoading: true } );
    // always make any sort of calculations (like the price) in the backend.
    const order = {
      ingredients: this.props.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'David Martinez',
        address: {
          street: 'Av. Street',
          zipCode: '32786',
          country: 'Mexico'
        },
        email: 'david@email.com'
      },
      deliveryMethod: 'fastest'
    };

    axiosOrders.post('https://react-burger-builder-73765.firebaseio.com/orders.json', order)
      .then((response) => {
        this.setState( { isLoading: false } );
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState( { isLoading: false } )
      });
  }

  render () {
    let form = (
      <React.Fragment>
        <h4>Enter your Contact Data</h4>
        <form className={classes.ContactForm}>
          <Input label="Name" elementType="..." elementConfig="..." value="..." />
          <Input label="Email" inputtype="input" type="text" name="email" placeholder="example@mail.com" />
          <Input label="Street" inputtype="input" type="text" name="street" placeholder="Street Av." />
          <Input label="Zip Code" inputtype="input" type="text" name="zip" placeholder="12345" />

          <Button buttonType="Success" onClick={this.orderHandler}>PLACE ORDER</Button>
        </form>
      </React.Fragment>
    )
    if (this.state.isLoading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        {form}
      </div>
    );
  }
}

export default ContactData;