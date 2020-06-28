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

    $.get(base_api + 'acesso/pesquisar', function(items) {

        let $items = $(items);

        $items.each(function(itemIndex, item) {
            if(id == item.id) {

                $form.find('[name="movimento"]').val(item.movimento);

                if(item.morador) {
                    $('[name="tipo"]').val('morador');
                    $('[name="morador"]').val(item.morador.id);
                    $form.find('.tipo, .select-morador').removeClass('d-none').addClass('d-block');
                }

                if(item.visitante) {
                    $('[name="tipo"]').val('visitante');
                    $('[name="visitante"]').val(item.visitante.id);
                    $form.find('.tipo, .select-visitante').removeClass('d-none').addClass('d-block');
                }

                if(item.prestadorServico) {
                    $('[name="tipo"]').val('prestadorservico');
                    $('[name="prestadorservico"]').val(item.prestadorServico.id);
                    $form.find('.tipo, .select-prestadorservico').removeClass('d-none').addClass('d-block');
                }

                if(item.corretor) {
                    $('[name="tipo"]').val('corretor');
                    $('[name="corretor"]').val(item.corretor.id);
                    $form.find('.tipo, .select-corretor').removeClass('d-none').addClass('d-block');
                }

                if(item.entregador) {
                    $('[name="tipo"]').val('entregador');
                    $('[name="entregador"]').val(item.entregador.id);
                    $form.find('.tipo, .select-entregador').removeClass('d-none').addClass('d-block');
                }

                $el.find('.page-title').text('Editar acesso #' + id);
                $form.prepend('<input type="hidden" name="id" value="'+item.id+'">');
                $form.find('select').attr('disabled', false);
            }
        });
    });
} else {
    $form.find('select').attr('disabled', false);
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
            if($corretor.val().length == 0) {
                $corretor.addClass('is-invalid');
                $corretor.parents('.form-group').append('<p class="invalid-feedback">Este campo é obrigatório</p>');
                formValidated = false;
            } else {
                corretorId = $corretor.val();
            }
        break;
        case 'entregador':
            if($entregador.val().length == 0) {
                $entregador.addClass('is-invalid');
                $entregador.parents('.form-group').append('<p class="invalid-feedback">Este campo é obrigatório</p>');
                formValidated = false;
            } else {
                entregadorId = $entregador.val();
            }
        break;
        default:
            formValidated = false;
        break;
    }

    if(formValidated) {

        let jsonData = {
            "id":id ? $id.val() : null,
            "morador":moradorId,
            "visitante":visitanteId,
            "prestadorServico":prestadorServicoId,
            "corretor":corretorId,
            "entregador":entregadorId,
            "movimento":$movimento.val()
        };

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