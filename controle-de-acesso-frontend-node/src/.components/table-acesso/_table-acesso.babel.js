/**
 * Cada componente recebe as variáveis explicadas abaixo
 *
 * @param {HTMLElement} el - Elemento DOM que seleciona o componente em si
 * @param {Object} params  - Parâmetros para serem utilizados
 */

var datatables_ptbr = {
    "sEmptyTable": "Nenhum registro encontrado",
    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
    "sInfoPostFix": "",
    "sInfoThousands": ".",
    "sLengthMenu": "Mostrar _MENU_ resultados por página",
    "sLoadingRecords": "Carregando...",
    "sProcessing": "Processando...",
    "sZeroRecords": "Nenhum registro encontrado",
    "sSearch": "Pesquisar",
    "oPaginate": {
        "sNext": "Próximo",
        "sPrevious": "Anterior",
        "sFirst": "Primeiro",
        "sLast": "Último"
    },
    "oAria": {
        "sSortAscending": ": Ordenar colunas de forma ascendente",
        "sSortDescending": ": Ordenar colunas de forma descendente"
    }
};

$el             = $(el);

const $table = $el.find('#items-table');

$.get(base_api + 'acesso/pesquisar', function(items) {
    $table.find('tbody').html('');
    let $items = $(items);
    $items.each(function(itemIndex, item) {

        var tipo = '';
        var nome = '';
        var movimento = item.movimento == 'E' ? 'Entrada' : 'Saída';

        if(item.morador) {
            tipo = 'Morador';
            nome = item.morador.nome;
        }

        if(item.visitante) {
            tipo = 'Visitante';
            nome = item.visitante.nome;
        }

        if(item.prestadorServico) {
            tipo = 'Prestador de serviço';
            nome = item.prestadorServico.nome;
        }

        if(item.corretor) {
            tipo = 'Corretor';
            nome = item.corretor.nome;
        }

        if(item.entregador) {
            tipo = 'Entregador';
            nome = item.entregador.nome;
        }

        let item_html = '';
        item_html = `
            <tr>
                <td>${item.id}</td>
                <td>${tipo}</td>
                <td>${nome}</td>
                <td>${movimento}</td>
                <td>${item.dataMovimento}</td>
                <td style="width:100px;">
                    <a href="${base}acessos/salvar/?id=${item.id}" class="btn btn-xs btn-block btn-warning"><i class="fas fa-edit"></i> Editar</a>
                    <button type="button" class="btn btn-xs btn-block btn-danger" data-action="delete" data-id="${item.id}"><i class="fas fa-trash"></i> Apagar</a>
                </td>
            </tr>
        `;

        $table.find('tbody').append(item_html);
    });

    $table.DataTable({
        oLanguage : datatables_ptbr,
        order: [[0, "desc"]],
        pageLength: 25,
    });
});

$(document).on('click', '[data-action]', function(e) {
    e.preventDefault();
    let $btn = $(this);
    let action = $btn.attr('data-action');
    let id = $btn.attr('data-id');

    switch(action) {
        case 'delete':
            let confirm = window.confirm('Tem certeza que deseja apagar este acesso?');

            if(confirm) {
                $.ajax({
                    url: base_api + 'acesso/apagar/?id=' + id,
                    type: 'DELETE',
                    success: function(response, textStatus, xhr) {
                        if(textStatus == 'success') {
                            alert('Acesso excluído com sucesso.');
                            window.location.href = window.location.href;
                        } else {
                            alert('Erro na requisição.');
                        }
                    }
                });
            }
        break;

        default:
            alert('No action defined.');
        break;
    }
});