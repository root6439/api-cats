export function genId(array: ArrayId[]): number {
  return array.length > 0 ? Math.max(...array.map((value) => value.id)) + 1 : 1;
}

type ArrayId = {
  id: number;
};
