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
          placeholder: 'Your name',
          label: 'Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street',
          label: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'You Zip Code',
          label: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Where are you from?',
          label: 'Nationality'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
          label: 'Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          label: 'Delivery Method',
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'economy', displayValue: 'Economy'},
          ]
        },
        value: ''
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

  inputChangeHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    }
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputId] = updatedFormElement;
    this.setState( { orderForm: updatedOrderForm } );
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    };

    let form = (
      <React.Fragment>
        <h4>Enter your Contact Data</h4>
        <form className={classes.ContactForm}>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              label={formElement.config.elementConfig.label}
              onChange={(event) => this.inputChangeHandler(event, formElement.id)}
            />
          ))}
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