import Grid from '../index'

describe('<Grid />', function () {
  const testbed = createTestbed(Grid, {
    /* default props go here */
  })

  /* example test (replace me) */
  it('should render', function () {
    testbed.render(/* override default props here */)

    expect(testbed.dom.node).to.exist
  })

  it('should have tests')
})