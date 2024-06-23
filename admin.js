document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('admin-form');
    const listaUsuarios = document.getElementById('lista-usuarios');
    const limparCamposBtn = document.getElementById('limpar-campos');
    const excluirTodosBtn = document.getElementById('excluir-todos');
    const pesquisarInput = document.getElementById('pesquisar');

    // Carregar usuários do Local Storage
    function carregarUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        listaUsuarios.innerHTML = '';
        usuarios.forEach(usuario => adicionarUsuarioNaLista(usuario));
    }

    // Adicionar usuário na lista e no Local Storage
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const dataEnvio = new Date().toLocaleString();
        
        const usuario = { nome, email, dataEnvio };
        adicionarUsuarioNaLista(usuario);

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        form.reset();
    });

    // Adicionar usuário na lista (DOM)
    function adicionarUsuarioNaLista(usuario) {
        const li = document.createElement('li');
        li.textContent = `${usuario.dataEnvio} - ${usuario.nome} - ${usuario.email}`;
        const deleteBtn = document.createElement('button');
        const icon = document.createElement('span');
        icon.classList.add('material-symbols-rounded');
        icon.textContent = 'delete';

        deleteBtn.appendChild(icon);
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', function() {
            excluirUsuario(usuario);
        });
        li.appendChild(deleteBtn);
        listaUsuarios.appendChild(li);
    }

    // Excluir usuário da lista e do Local Storage
    function excluirUsuario(usuarioParaExcluir) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.filter(usuario => usuario.email !== usuarioParaExcluir.email);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        carregarUsuarios();
    }

    // Excluir todos os usuários
    excluirTodosBtn.addEventListener('click', function() {
        localStorage.removeItem('usuarios');
        carregarUsuarios();
    });

    // Limpar campos do formulário
    limparCamposBtn.addEventListener('click', function() {
        form.reset();
    });

    // Pesquisar usuários
    pesquisarInput.addEventListener('input', function() {
        const query = pesquisarInput.value.toLowerCase();
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuariosFiltrados = usuarios.filter(usuario =>
            usuario.nome.toLowerCase().includes(query) ||
            usuario.email.toLowerCase().includes(query)
        );
        listaUsuarios.innerHTML = '';
        usuariosFiltrados.forEach(usuario => adicionarUsuarioNaLista(usuario));
    });

    // Inicializar a lista de usuários
    carregarUsuarios();
});