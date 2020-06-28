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
    $form.find('input').val('Carregando...');
    $.get(base_api + 'visitante/pesquisar', function(items) {
        let $items = $(items);
        $items.each(function(itemIndex, item) {
            if(id == item.id) {
                $el.find('.page-title').text('Editar visitante #' + id + ' - ' + item.nome);
                $form.find('[name="nome"]').val(item.nome);
                $form.find('[name="cpf"]').val(item.cpf);
                $form.prepend('<input type="hidden" name="id" value="'+item.id+'">');
                $form.find('input').attr('disabled', false);
            }
        });
    });
} else {
    $form.find('input').attr('disabled', false);
}

$form.on('submit', function(e) {
    e.preventDefault();

    let $name    = $form.find('[name="nome"]');
    let $cpf     = $form.find('[name="cpf"]');

    let $id;

    if(id) {
        $id = $form.find('[name="id"]');
    }

    $form.find('input').removeClass('is-invalid');
    $form.find('.invalid-feedback').remove();

    let formValidated = true;

    if($name.val().length == 0) {
        $name.addClass('is-invalid');
        $name.parents('.form-group').append('<p class="invalid-feedback">Este campo é obrigatório</p>');
        formValidated = false;
    }

    if($cpf.val().length == 0) {
        $cpf.addClass('is-invalid');
        $cpf.parents('.form-group').append('<p class="invalid-feedback">Este campo é obrigatório</p>');
        formValidated = false;
    }

    if(formValidated) {
        $.ajax({
            url: base_api + 'visitante/salvar',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "id":id ? $id.val() : null,
                "nome":$name.val(),
                "cpf":$cpf.val(),
            }),

            success: function() {
                alert('Visitante ' + (id ? 'atualizado' : 'cadastrado') + ' com sucesso.');
                window.location.href = base + 'visitantes/';
            },

            error: function() {
                alert('Erro na requisição.');
                window.location.href = window.location.href;
            }
        });
    }
});