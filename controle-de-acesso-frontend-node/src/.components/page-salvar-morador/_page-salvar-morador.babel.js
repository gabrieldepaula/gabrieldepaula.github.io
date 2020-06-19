/**
 * Cada componente recebe as variáveis explicadas abaixo
 *
 * @param {HTMLElement} el - Elemento DOM que seleciona o componente em si
 * @param {Object} params  - Parâmetros para serem utilizados
 */

const $el = $(el);
const $form = $el.find('form');
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


if(id) {
    $.get(base_api + 'morador/pesquisar', function(items) {
        let $items = $(items);
        $items.each(function(itemIndex, item) {
            if(id == item.id) {
                $el.find('.page-title').text('Editar morador #' + id + ' - ' + item.nome);
                $form.find('[name="nome"]').val(item.nome);
                $form.find('[name="cpf"]').val(item.cpf);
                $form.find('[name="apartamento"]').val(item.apartamento);
                $form.find('[name="bloco"]').val(item.bloco);
                $form.prepend('<input type="hidden" name="id" value="'+item.id+'">');
            }
        });
    });
}