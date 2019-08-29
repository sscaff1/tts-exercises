function fetch() {
  return new Promise(resolve => {
    const mockObj = {
      json: () => {
        return {
          title: 'test title do not match',
          body: 'test body',
          id: 1,
          userId: 1,
        };
      },
    };
    resolve(mockObj);
  });
}

module.exports = fetch;
