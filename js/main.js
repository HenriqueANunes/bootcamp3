function salvar(form){
    let dados_linha = {}
    for(let elemento of form.elements){
        dados_linha[elemento.id] = elemento.value;
    }

    let cabecalho = get_cabecalho();
    let ultimo_id = get_ultimo_id();
    let tabela = document.getElementById('table').getElementsByTagName('tbody')[0];
    let linha = tabela.insertRow(tabela.rows.length);

    for(let index in cabecalho){
        let coluna = cabecalho[index]
        if(typeof coluna == 'undefined'){
            continue;
        }
        let obj_coluna = linha.insertCell(index);
        obj_coluna.title = coluna;

        if(coluna === 'check'){
            obj_coluna.innerHTML = '<input type="checkbox" onchange="toggle_remover(); toggle_check_all()">';
        }else if(coluna === 'id'){
            obj_coluna.innerText = ultimo_id+1;
        }
        else{
            obj_coluna.innerText = dados_linha[coluna];
        }
    }
    form.reset()
}

function toggle_checkbox(checkbox){
    document.querySelectorAll('#table input[type=checkbox]').forEach((input)=>{
        input.checked = checkbox.checked;
    })
}

function remover_selecionados(){
    $('#table tbody input[type=checkbox]:checked').each((index, input)=>{
        $(input).closest('tr').remove();
    })
}

function get_cabecalho(){
    let lista_ths = $('#table thead tr')[0].children;

    let cabecalho = {};
    for(let index in lista_ths){
        cabecalho[index] = lista_ths[index].title;
    }

    return cabecalho;
}

function get_ultimo_id(){
    let ultimo_id = Number.parseInt($('#table tbody tr:last td[title="id"]').text());
    return ultimo_id ? ultimo_id : 0;
}

function buscar_cep(cep){
    $.ajax({
        type: "GET",
        url: `https://viacep.com.br/ws/${cep}/json/`,
        success: function (response) {
            $('#rua').val(response.logradouro);
            $('#bairro').val(response.bairro);
            $('#cidade').val(response.localidade);
            $('#estado').val(response.uf);
        },
        error: function (error) {
            console.log(error);
        }
    })
}

function toggle_remover(){
    const btn_remover = document.getElementById('remover');

    let desabilitar = true;
    document.querySelectorAll('#table tbody input[type=checkbox]').forEach((input)=>{
        if(input.checked){
            desabilitar = false;
        }
    })

    if(desabilitar){
        btn_remover.setAttribute('disabled', '');
    }else{
        btn_remover.removeAttribute('disabled');
    }
}

function toggle_check_all(){
    const check_all = document.getElementById('check_all');
    const lista_checkboxes = document.querySelectorAll('#table tbody input[type=checkbox]');

    let desabilitar = true;
    lista_checkboxes.forEach((input)=>{
        if(!input.checked){
            desabilitar = false;
        }
    })
    if(lista_checkboxes.length === 0){
        desabilitar = false;
    }
    check_all.checked = desabilitar;
}