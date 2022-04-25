import React from 'react';

// engine para gerar as opções de método de pagamento;
export const paymentOptions = () => {
  const methods = ['Cartão de crédito', 'Cartão de débito', 'Dinheiro'];
  return methods.map((method, index) => (
    <option key={ index } value={ method }>{ method }</option>
  ));
};

// engine para os tipos de produtos;
export const tagOptions = () => {
  const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
  return tags.map((tag, index) => (
    <option key={ index } value={ tag }>{ tag }</option>
  ));
};
