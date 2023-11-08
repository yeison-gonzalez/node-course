const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args]

  const { yarg } = await import('./args.plugin')
  return yarg;
}

describe('Test args.plugin.ts', () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  })

  it('should return default values', async () => {
    const argv = await runCommand(['-b', '5'])

    expect(argv).toEqual(expect.objectContaining({
      b: 5,
      l: 10,
      s: false,
      n: 'table',
      d: 'outputs',
    }))
  })

  it('should return configuration with custom values', async () => {
    const argv = await runCommand(['-b', '7', '-l', '20', '-s', '-n', 'test', '-d', 'test-outputs'])

    expect(argv).toEqual(expect.objectContaining({
      b: 7,
      l: 20,
      s: true,
      n: 'test',
      d: 'test-outputs'
    }))
  })
})
