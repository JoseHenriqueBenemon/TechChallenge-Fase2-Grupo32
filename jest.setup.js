global.console = {
    ...global.console,
    error: jest.fn((...args) => {
      process.stderr.write(`\n${args.join(' ')}\n`);
    }),
  };