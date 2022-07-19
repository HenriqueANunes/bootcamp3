function salvar(form){
    console.log($('#tbody').rows);
    let dados_linha = {}
    for(let elemento of form.elements){
        dados_linha[elemento.id] = elemento.value;
    }
    let cabecalho = get_cabecalho();
    console.log(cabecalho);
    let ultimo_id = get_ultimo_id();
    let tabela = document.getElementById('table');
    let ultima_linha = get_ultima_linha(tabela);
    let linha = tabela.insertRow(ultima_linha+1);

    for(let index in cabecalho){
        let coluna = cabecalho[index]
        if(typeof coluna == 'undefined'){
            continue;
        }
        let obj_coluna = linha.insertCell(index);
        obj_coluna.title = coluna;

        console.log(coluna);
        if(coluna === 'check'){
            obj_coluna.innerHTML = '<input type="checkbox">';
        }else if(coluna === 'id'){
            obj_coluna.innerText = ultimo_id+1;
        }
        else{
            obj_coluna.innerText = dados_linha[coluna];
        }
    }
}

function toggle_chebox(checkbox){
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
    return Number.parseInt($('#table tbody tr:last td[title="id"]').text());
}

function get_ultima_linha(tabela){
    return tabela.querySelectorAll('tbody>tr').length;
}
