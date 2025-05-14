function Dom(seletor) {
  this.element = function () {
    return document.querySelector(seletor);
  };

  this.ativar = function (classe) {
    this.element().classList.add(classe);
  };
}

Dom.prototype.desative = function (classe) {
  this.element().classList.remove(classe);
};

const li = new Dom('li');
const ul = new Dom('ul');
const pessoa = new Dom('h1');

pessoa.desative('ativo');


Dom.prototype.trocar = function (classe) {
  this.element().classList.toggle(classe);
};

 pessoa.trocar('ativo');

 //  atravez do prototype eu posso esta colocando funçao dentro apois a  funçao  contrutora ja ter cido iniciada
 
 // primeiro procura dentro do objeto so cas ele nao ache ele procura no prototype