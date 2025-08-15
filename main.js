import { projetos, adicionarProjeto, excluirProjeto } from './project.js';
import { tarefas, adicionarTarefa, alternarStatus, excluirTarefa } from './task.js';

const projectList = document.getElementById('project-list');
const projectSelect = document.getElementById('task-project');
const taskList = document.getElementById('task-list');

document.getElementById('add-project').onclick = () => {
  const nome = document.getElementById('project-name').value;
  if (nome) {
    const projeto = adicionarProjeto(nome);
    atualizarProjetos();
    document.getElementById('project-name').value = '';
  }
};

document.getElementById('task-form').onsubmit = (e) => {
  e.preventDefault();
  const tarefa = {
    titulo: document.getElementById('task-title').value,
    descricao: document.getElementById('task-desc').value,
    data: document.getElementById('task-date').value,
    prioridade: document.getElementById('task-priority').value,
    projetoId: document.getElementById('task-project').value
  };
  adicionarTarefa(tarefa);
  atualizarTarefas();
  e.target.reset();
};

function atualizarProjetos() {
  projectList.innerHTML = '';
  projectSelect.innerHTML = '<option value="">Sem projeto</option>';
  projetos.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p.nome;
    li.onclick = () => {
      excluirProjeto(p.id);
      atualizarProjetos();
      atualizarTarefas();
    };
    projectList.appendChild(li);

    const option = document.createElement('option');
    option.value = p.id;
    option.textContent = p.nome;
    projectSelect.appendChild(option);
  });
}

function atualizarTarefas() {
  taskList.innerHTML = '';
  tarefas.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${t.titulo}</strong> - ${t.prioridade} - ${t.concluida ? '✅' : '❌'}`;
    li.onclick = () => {
      alternarStatus(t.id);
      atualizarTarefas();
    };
    const btn = document.createElement('button');
    btn.textContent = 'Excluir';
    btn.onclick = (e) => {
      e.stopPropagation();
      excluirTarefa(t.id);
      atualizarTarefas();
    };
    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

atualizarProjetos();
atualizarTarefas();
