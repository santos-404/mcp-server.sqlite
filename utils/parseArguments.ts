export function getArgumentValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index !== -1 && index + 1 < process.argv.length ? process.argv[index + 1] : undefined;
}
