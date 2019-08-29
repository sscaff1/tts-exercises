const fetchPosts = require('../fetchPosts');

describe('Fetch Posts', () => {
  it('data should have a title', async () => {
    const data = await fetchPosts();

    expect(data.title).toBeDefined();
  });

  it('should match the data snapshot', async () => {
    const data = await fetchPosts();

    expect(data).toMatchSnapshot();
  });
});
