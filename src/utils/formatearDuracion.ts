export function formatearDuracion(minutos?: number): string {
  if (typeof minutos !== 'number') return "Sin duración";

  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  if (horas > 0 && minutosRestantes > 0) {
    return `${horas}h ${minutosRestantes}min`;
  } else if (horas > 0) {
    return `${horas}h`;
  } else {
    return `${minutosRestantes}min`;
  }
}