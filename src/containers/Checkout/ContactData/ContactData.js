import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.scss";
import axiosOrders from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
          label: "Name",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 50,
        },
        valid: false,
        isTouched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street",
          label: "Street",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 50,
        },
        valid: false,
        isTouched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "You Zip Code",
          label: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        isTouched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Where are you from?",
          label: "Country",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 56,
        },
        valid: false,
        isTouched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
          label: "Email",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
          maxLength: 50,
        },
        valid: false,
        isTouched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          label: "Delivery Method",
          options: [
            { value: "express", displayValue: "Express (fastest)" },
            { value: "economy", displayValue: "Economy" },
          ],
        },
        value: "express",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBurger(order);
  };

  fieldIsValid(value, rules) {
    let isValid = true;
    if (!rules) {
      return isValid;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputId],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.fieldIsValid(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.isTouched = true;
    updatedOrderForm[inputId] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <React.Fragment>
        <h4>Enter your Contact Data</h4>
        <form className={classes.ContactForm}>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              label={formElement.config.elementConfig.label}
              maxLength={
                formElement.config.validation &&
                formElement.config.validation.maxLength
              }
              onChange={(event) =>
                this.inputChangeHandler(event, formElement.id)
              }
              isInvalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              isTouched={formElement.config.isTouched}
            />
          ))}
          <Button
            disabled={!this.state.formIsValid}
            buttonType="Success"
            onClick={this.orderHandler}
          >
            PLACE ORDER
          </Button>
        </form>
      </React.Fragment>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) =>
      dispatch(actions.purchaseBurger(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axiosOrders));
