import { salvarDados, carregarDados } from './storage.js';

export let projetos = carregarDados('projetos');

export function adicionarProjeto(nome) {
  const novoProjeto = { id: Date.now(), nome };
  projetos.push(novoProjeto);
  salvarDados('projetos', projetos);
  return novoProjeto;
}

export function excluirProjeto(id) {
  projetos = projetos.filter(p => p.id !== id);
  salvarDados('projetos', projetos);
}
