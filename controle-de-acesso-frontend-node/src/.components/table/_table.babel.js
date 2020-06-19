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

// $.get(`http://127.0.0.1:8000/api/${params.entity}/index`, function(items) {
$.get('https://gl-controle-de-acesso.herokuapp.com/morador/pesquisar', function(items) {
    $table.find('tbody').html('');
    let $items = $(items);
    $items.each(function(itemIndex, item) {
        let item_html = '';
        switch(params.entity) {

            case 'moradores':
                item_html = `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.nome}</td>
                        <td>${item.cpf}</td>
                        <td>${item.bloco}</td>
                        <td>${item.apartamento}</td>
                        <td>${item.dataCadastro}</td>
                        <td>
                            <button type="button" class="btn btn-xs btn-warning"><i class="fas fa-edit"></i> Editar</button>
                        </td>
                    </tr>
                `;
            break;

        }

        $table.find('tbody').append(item_html);
    });

    $table.DataTable({
        oLanguage : datatables_ptbr,
        order: [[0, "desc"]],
        pageLength: 25,
    });
});

// $table.DataTable({
//     // oLanguage : datatables_ptbr,
//     // order: [[3, "asc"]],
//     // pageLength: 25,
//     ajax: {
//         // url: base_url + '/cms/products/list',
//         url: `http://127.0.0.1:8000/api/${params.entity}/index`,
//     },
//     columns:
//     [
//         // {
//         //     data: 'status',
//         //     name: 'status',
//         //     title: '',
//         //     searchable: false,
//         //     orderable: true,
//         //     width: '1%',
//         //     class: 'status-column',
//         // },
//         {
//             data: 'id',
//             name: 'id',
//             title: 'ID',
//             width: '1%',
//             searchable: true,
//             orderable: true,
//         },
//         // {
//         //     data: 'image_pack',
//         //     name: 'image_pack',
//         //     title: 'Embalagem',
//         //     width: '1%',
//         //     searchable: false,
//         //     orderable: false,
//         // },
//         {
//             data: 'name',
//             name: 'name',
//             title: 'Nome',
//             searchable: true,
//             orderable: true,
//         },
//         // {
//         //     data: 'line',
//         //     name: 'line',
//         //     title: 'Linha(s)',
//         //     searchable: true,
//         //     orderable: true,
//         // },
//         // {
//         //     data: 'category',
//         //     name: 'category',
//         //     title: 'Categoria',
//         //     searchable: true,
//         //     orderable: true,
//         // },
//         // {
//         //     data: 'subcategory',
//         //     name: 'subcategory',
//         //     title: 'Sub Categoria',
//         //     searchable: true,
//         //     orderable: true,
//         // },
//         // {
//         //     data: 'portals',
//         //     name: 'portals',
//         //     title: 'Portais',
//         //     searchable: true,
//         //     orderable: true,
//         // },
//         // {
//         //     data: 'actions',
//         //     name: 'actions',
//         //     title: 'Ações',
//         //     width: '1%',
//         //     searchable: false,
//         //     orderable: false,
//         // },
//     ]
// });

// $(document).on('click', '[data-action]', function(e) {
//     e.preventDefault();
//     var $btn = $(this);
//     var html = $btn.html();
//     var action = $btn.attr('data-action');
//     var id = $btn.attr('data-id');

//     if(action == 'delete') {
//         var confirm = window.confirm('Deseja realmente apagar este produto?');
//     }

//     if(action != 'delete' || confirm) {

//         $btn.html('<i class="fa fa-refresh fa-spin"></i>').attr('disabled', true);

//         $.post(base_url + '/cms/products/actions', {action: action, id: id}, function(resp) {
//             if(!resp.error) {
//                 $table.ajax.reload();
//             } else {
//                 $btn.html(html).attr('disabled', false);
//                 alert('Ocorreu um erro ao processar a requisição, por favor, tente novamente mais tarde.');
//             }
//         });
//     }
// });