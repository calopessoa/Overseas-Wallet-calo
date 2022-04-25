import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import Table from '../components/Table';
import '../styles/form.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p className="expense-title">Controle de Despesas</p>
        <Form />
        <Table />
      </div>
    );
  }
}

export default Wallet;
