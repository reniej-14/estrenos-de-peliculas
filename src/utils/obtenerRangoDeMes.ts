export function obtenerRangoDeMes(año: number, mes: number) {
  const inicio = `${año}-${String(mes).padStart(2, '0')}-01`;
  const ultimoDia = new Date(año, mes, 0).getDate(); // ← calcula fin del mes
  const fin = `${año}-${String(mes).padStart(2, '0')}-${ultimoDia}`;
  return { inicio, fin };
}
