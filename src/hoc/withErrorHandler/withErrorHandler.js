import React, { Component } from 'react';
import Aux from './../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      })
      axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      })
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