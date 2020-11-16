import React, { Component } from 'react';
import Aux from './../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    constructor (props) {
      super(props);
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.state = { error: null };
        return req;
      })
      this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
        this.state = { error: error };
      })
    }

    componentWillUnmount () {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    dismissErrorHandler = () => {
      this.setState({ error: null });
    }

    render () {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.dismissErrorHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;