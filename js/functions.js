var texto_inserido;

var min = 100000;
var max = 999999;

function random_integer(min, max) {
    var random_id;
    var id_valido = false;

    do{
        random_id = Math.floor(Math.random() * (max - min + 1)) + min;
        var id_em_uso = false;
        for(var i = 0; i < localStorage.length; i++){
            if(localStorage.getItem(localStorage.key(i)).key == random_id){
                id_em_uso = true;
            }  
        }
        if(!id_em_uso){
            id_valido = true;
        }
    }while(!id_valido);
   
    return random_id;
}

function adicionar_item(){
    texto_inserido = document.getElementById('campo_texto').value;
    document.getElementById('campo_texto').value = "";

    let lista = document.getElementById('lista');
    let tarefa = document.createElement("div");
    tarefa.id = random_integer(min, max);

    let check = document.createElement("input");
    check.type = 'checkbox';
    check.className = 'check';
    check.checked = false;
    check.addEventListener('click', function(){
        if(check.checked){
            descricao.style = "text-decoration: line-through;";
        } else{
            descricao.style.removeProperty('text-decoration');
        }
    })
    let descricao = document.createElement('input');
    descricao.type = 'text';
    descricao.className = 'input_texto';
    descricao.id = 'descricao_' + tarefa.id; 
    descricao.value = texto_inserido;
    descricao.style.fontSize = "16px";
    descricao.disabled = true;
    
    let button_edit = document.createElement('button');
    button_edit.textContent = 'Editar';
    button_edit.className = 'button';
    button_edit.id = 'button_edit_'+ tarefa.id;
    button_edit.addEventListener('click', function(){
        descricao.disabled = false;
        editar_tarefa(tarefa.id);
    });

    let button_delete = document.createElement('button');
    button_delete.textContent = 'Deletar';
    button_delete.className = 'button';
    button_delete.id = 'button_delete_'+ tarefa.id;
    button_delete.addEventListener('click', function(){
        excluir_tarefa(tarefa.id);
    });


    tarefa.appendChild(check);
    tarefa.appendChild(descricao);
    tarefa.appendChild(button_edit);
    tarefa.appendChild(button_delete);

    lista.appendChild(tarefa);
    salvar_tarefas(tarefa.id, descricao.value)

}

function editar_tarefa(id){
    let button_save = document.getElementById('button_edit_'+ id);
    let input_descricao = document.getElementById('descricao_' + id);
    let tarefa = document.getElementById(id);
    
    button_save.textContent = 'Salvar'

    button_save.addEventListener('click', function(){
        input_descricao.disabled = true;
        button_save.textContent = 'Editar';
        localStorage.setItem(id, input_descricao.value.toString());

        button_save.addEventListener('click', function(){
            input_descricao.disabled = false;
            editar_tarefa(tarefa.id);
        });
    });
}

function excluir_tarefa(id){
    let Node = document.getElementById(id);
    
    while(Node.firstChild){
        Node.removeChild(Node.lastChild);
    }

    Node.remove();
    localStorage.removeItem(id);
    
}

function limpar_lista(){
    localStorage.clear();
    location.reload();
}

function salvar_tarefas(id, descricao_tarefa){
    localStorage.setItem(id, descricao_tarefa);
}

function exibir_tarefas_salvas(){
    for(var i = 0; i < localStorage.length; i++){
        if(localStorage.getItem(localStorage.key(i)) != null){
            texto_inserido = document.getElementById('campo_texto').value;
            document.getElementById('campo_texto').value = "";
        
            let lista = document.getElementById('lista');
            let tarefa = document.createElement("div");
            tarefa.id = localStorage.key(i);
        
            let check = document.createElement("input");
            check.type = 'checkbox';
            check.className = 'check';
            check.addEventListener('click', function(){
                if(check.checked){
                    descricao.style = "text-decoration: line-through;";
                } else{
                    descricao.style.removeProperty('text-decoration');
                }
            })

            let descricao = document.createElement('input');
            descricao.type = 'text';
            descricao.style.fontSize = "16px";
            descricao.className = 'input_texto';
            descricao.id = 'descricao_' + localStorage.key(i); 
            descricao.value = localStorage.getItem(localStorage.key(i)).toString();
            descricao.disabled = true;
            
            let button_edit = document.createElement('button');
            button_edit.textContent = 'Editar';
            button_edit.className = 'button';
            button_edit.id = 'button_edit_'+ localStorage.key(i);
            button_edit.addEventListener('click', function(){
                descricao.disabled = false;
                editar_tarefa(tarefa.id);
            });
        
            let button_delete = document.createElement('button');
            button_delete.textContent = 'Deletar';
            button_delete.className = 'button';
            button_delete.id = 'button_delete_'+ localStorage.key(i);
            button_delete.addEventListener('click', function(){
                excluir_tarefa(tarefa.id);
            });
        
        
            tarefa.appendChild(check);
            tarefa.appendChild(descricao);
            tarefa.appendChild(button_edit);
            tarefa.appendChild(button_delete);
        
            lista.appendChild(tarefa);
        }
    }
}