import { salvarDados, carregarDados } from './storage.js';

export let tarefas = carregarDados('tarefas');

export function adicionarTarefa(tarefa) {
  tarefa.id = Date.now();
  tarefa.concluida = false;
  tarefas.push(tarefa);
  salvarDados('tarefas', tarefas);
}

export function alternarStatus(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    salvarDados('tarefas', tarefas);
  }
}

export function excluirTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  salvarDados('tarefas', tarefas);
}
