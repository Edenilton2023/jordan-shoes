export const formatCurrency = (number) => {
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const limparFormatoReal = (valor) => {
  return parseFloat(
    valor.replace('R$&nbsp;', '').replace('.', '').replace(',', '.')
  );
};
