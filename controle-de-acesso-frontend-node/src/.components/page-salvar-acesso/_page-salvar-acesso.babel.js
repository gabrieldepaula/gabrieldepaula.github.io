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

    let $movimento          = $form.find('[name="movimento"]');
    let $tipo               = $form.find('[name="tipo"]');
    let $morador            = $form.find('[name="morador"]');
    let $visitante          = $form.find('[name="visitante"]');
    let $prestadorServico   = $form.find('[name="prestadorservico"]');
    let $corretor           = $form.find('[name="corretor"]');
    let $entregador         = $form.find('[name="entregador"]');

    let moradorId           = null;
    let visitanteId         = null;
    let prestadorServicoId  = null;
    let corretorId          = null;
    let entregadorId        = null;

    let $id;

    if(id) {
        $id = $form.find('[name="id"]');
    }

    $form.find('form-control').removeClass('is-invalid');
    $form.find('.invalid-feedback').remove();

    let formValidated = true;

    if($movimento.val().length == 0) {
        $movimento.addClass('is-invalid');
        $movimento.parents('.form-group').append('<p class="invalid-feedback">Este campo é obrigatório</p>');
        formValidated = false;
    }

    if($tipo.val().length == 0) {
        $tipo.addClass('is-invalid');
        $tipo.parents('.form-group').append('<p class="invalid-feedback">Este campo é obrigatório</p>');
        formValidated = false;
    }


    switch($tipo.val()) {
        case 'morador':
            if($morador.val().length == 0) {
                $morador.addClass('is-invalid');
                $morador.parents('.form-group').append('<p class="invalid-feedback">Este campo é obrigatório</p>');
                formValidated = false;
            } else {
                moradorId = $morador.val();
            }
        break;
        case 'visitante':
            if($visitante.val().length == 0) {
                $visitante.addClass('is-invalid');
                $visitante.parents('.form-group').append('<p class="invalid-feedback">Este campo é obrigatório</p>');
                formValidated = false;
            } else {
                visitanteId = $visitante.val();
            }
        break;
        case 'prestadorservico':
            if($prestadorServico.val().length == 0) {
                $prestadorServico.addClass('is-invalid');
                $prestadorServico.parents('.form-group').append('<p class="invalid-feedback">Este campo é obrigatório</p>');
                formValidated = false;
            } else {
                prestadorServicoId = $prestadorServico.val();
            }
        break;
        case 'corretor':
        break;
        case 'entregador':
        break;
        default:
        break;
    }

    let jsonData = {
        "id":id ? $id.val() : null,
        "morador":moradorId,
        "visitante":visitanteId,
        "prestadorServico":prestadorServicoId,
        "movimento":$movimento.val()
    };

    if(formValidated) {
        $.ajax({
            url: base_api + 'acesso/salvar',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function() {
                alert('Acesso ' + (id ? 'atualizado' : 'cadastrado') + ' com sucesso.');
                window.location.href = base;
            },

            error: function() {
                alert('Erro na requisição.');
                window.location.href = window.location.href;
            }
        });
    }
});