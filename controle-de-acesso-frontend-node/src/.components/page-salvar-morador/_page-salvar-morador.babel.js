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
    let $ap      = $form.find('[name="apartamento"]');
    let $bloco   = $form.find('[name="bloco"]');
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

    if($ap.val().length == 0) {
        $ap.addClass('is-invalid');
        $ap.parents('.form-group').append('<p class="invalid-feedback">Este campo é obrigatório</p>');
        formValidated = false;
    }

    if($bloco.val().length == 0) {
        $bloco.addClass('is-invalid');
        $bloco.parents('.form-group').append('<p class="invalid-feedback">Este campo é obrigatório</p>');
        formValidated = false;
    }

    if(formValidated) {
        $.ajax({
            url: base_api + 'morador/salvar',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "id":id ? $id.val() : null,
                "nome":$name.val(),
                "cpf":$cpf.val(),
                "apartamento":$ap.val(),
                "bloco":$bloco.val()
            }),

            success: function() {
                alert('Morador ' + (id ? 'atualizado' : 'cadastrado') + ' com sucesso.');
                window.location.href = base + 'moradores/';
            },

            error: function() {
                alert('Erro na requisição.');
                window.location.href = window.location.href;
            }
        });
    }
});