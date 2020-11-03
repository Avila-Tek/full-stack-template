export default function* splitIntoChuck<T>(
  array: Array<T>,
  BATCH_SIZE = 10
): Generator<T[], void, unknown> {
  let batch = 0;
  while (BATCH_SIZE * batch + BATCH_SIZE <= array.length) {
    yield array.slice(batch * BATCH_SIZE, batch * BATCH_SIZE + BATCH_SIZE);
    batch += 1;
  }
}
