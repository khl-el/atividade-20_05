// Proporções por tipo de suco (partes de água / partes de suco)
const proporcoes = {
  maracuja: { agua: 6, suco: 4 }, // 6 partes água, 4 partes suco
  caju:     { agua: 8, suco: 2 }, // 8 partes água, 2 partes suco
  goiaba:   { agua: 5, suco: 5 }, // 5 partes água, 5 partes suco
};

function calcular() {
  const erroEl  = document.getElementById('erro');
  const aguaEl  = document.getElementById('agua');
  const sucoEl  = document.getElementById('suco');

  erroEl.textContent = '';

  // Validar litros
  const litrosInput = document.getElementById('litros').value.trim();
  const litros = parseFloat(litrosInput);

  if (!litrosInput || isNaN(litros) || litros <= 0) {
    erroEl.textContent = '⚠️ Informe uma quantidade válida de litros.';
    aguaEl.textContent = '—';
    sucoEl.textContent = '—';
    return;
  }

  // Validar tipo de suco
  const sucoSelecionado = document.querySelector('input[name="suco"]:checked');
  if (!sucoSelecionado) {
    erroEl.textContent = '⚠️ Selecione o tipo de suco.';
    aguaEl.textContent = '—';
    sucoEl.textContent = '—';
    return;
  }

  const tipo = sucoSelecionado.value;
  const { agua: partesAgua, suco: partesSuco } = proporcoes[tipo];
  const totalPartes = partesAgua + partesSuco;

  // Calcular volumes base
  let volumeAgua = (litros * partesAgua) / totalPartes;
  let volumeSuco = (litros * partesSuco) / totalPartes;

  // Aplicar reduções dos complementos
  const usaAcucar = document.getElementById('acucar').checked;
  const usaGelo   = document.getElementById('gelo').checked;

  if (usaAcucar) volumeAgua -= litros * 0.02; // reduz 2%
  if (usaGelo)   volumeAgua -= litros * 0.05; // reduz 5%

  // Garantir que água não fique negativa
  if (volumeAgua < 0) volumeAgua = 0;

  // Exibir resultados formatados em litros (2 casas decimais)
  aguaEl.textContent = volumeAgua.toFixed(2) + ' L';
  sucoEl.textContent = volumeSuco.toFixed(2) + ' L';
}

function novo() {
  // Limpa o campo de litros
  document.getElementById('litros').value = '';

  // Desmarca todos os rádios
  document.querySelectorAll('input[name="suco"]').forEach(r => r.checked = false);

  // Desmarca checkboxes
  document.getElementById('acucar').checked = false;
  document.getElementById('gelo').checked   = false;

  // Limpa resultados e erros
  document.getElementById('agua').textContent = '—';
  document.getElementById('suco').textContent = '—';
  document.getElementById('erro').textContent = '';
}