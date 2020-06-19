/**
 * Cada componente recebe as variáveis explicadas abaixo
 *
 * @param {HTMLElement} el - Elemento DOM que seleciona o componente em si
 * @param {Object} params  - Parâmetros para serem utilizados
 */

const $el = $(el);
const $form = $el.find('form');

$form.on('submit', function(e) {
    e.preventDefault();

    console.log($form.serialize());
});