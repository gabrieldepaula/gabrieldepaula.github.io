/**
 * Cada componente recebe as variáveis explicadas abaixo
 *
 * @param {HTMLElement} el - Elemento DOM que seleciona o componente em si
 * @param {Object} params  - Parâmetros para serem utilizados
 */

const $el = $(el);

const entities = [
    'morador',
    'visitante',
    'prestadorservico',
    'corretor',
    'entregador',
];

$.each(entities, function(index, entity) {
    $.get(base_api + entity + '/pesquisar', function(items) {
        $select = $('[name="'+entity+'"]');
        let $items = $(items);
        $items.each(function(itemIndex, item) {
            let option = '';
            option = '<option value="'+item.id+'">'+item.nome+'</option>';
            $select.append(option);
        });
    });
});

var $selectTipo = $el.find('[name="tipo"]');
$selectTipo.on('change', function(e) {
    e.preventDefault();

    $el.find('.form-control').removeClass('is-invalid');
    $el.find('.invalid-feedback').remove();

    if($selectTipo.val() != '') {
        $('.select-tipo').find('select').val('');
        $('.tipo').removeClass('d-none').addClass('d-block');
        $('.select-tipo').removeClass('d-block').addClass('d-none');
        $el.find('.select-'+$selectTipo.val()).removeClass('d-none').addClass('d-block');
    } else {
        $('.tipo, .select-tipo').removeClass('d-block').addClass('d-none');
        $el.find('.select-tipo').find('select').val('');
    }
});