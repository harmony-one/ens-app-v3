import { cleanup, render, waitFor } from '@app/test-utils'

import NFTTemplate from './NFTTemplate'

describe('NFTTemplate', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should render', async () => {
    const { getByText } = render(
      <NFTTemplate name="nick.country" backgroundImage={undefined} isNormalised />,
    )
    expect(getByText('nick.country')).toBeInTheDocument()
  })

  it('should render with background', async () => {
    const whiteBG =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQYV2P4DwABAQEAWk1v8QAAAABJRU5ErkJggg=='
    const { getByText, getByTestId } = render(
      // CHANGE_TO_COUNTRY
      <NFTTemplate name="validator.country" backgroundImage={whiteBG} isNormalised />,
    )
    // CHANGE_TO_COUNTRY
    expect(getByText('validator.country')).toBeInTheDocument()
    expect(getByTestId('nft-back-img')).toBeInTheDocument()
  })

  it('should render with subdomain', async () => {
    const { getByText } = render(
      // CHANGE_TO_COUNTRY
      <NFTTemplate name="itsasubdomain.khori.country" backgroundImage={undefined} isNormalised />,
    )
    expect(getByText('itsasubdomain.')).toBeInTheDocument()
  })

  it('should render domain with more than 25 chars', async () => {
    const { getByText } = render(
      // CHANGE_TO_COUNTRY
      <NFTTemplate
        name="thisnameislongerthan25char.country"
        backgroundImage={undefined}
        isNormalised
      />,
    )
    expect(getByText('thisnameislonge')).toBeInTheDocument()
    expect(getByText('rthan25char.country')).toBeInTheDocument()
  })

  it('should use polyfill of Intl.Segmenter if browser does not support', async () => {
    ;(window.Intl.Segmenter as typeof Intl['Segmenter']) = undefined as any
    // CHANGE_TO_COUNTRY
    const { getByText } = render(
      <NFTTemplate name="alisha.country" backgroundImage={undefined} isNormalised />,
    )
    // CHANGE_TO_COUNTRY
    await waitFor(() => expect(getByText('alisha.country')).toBeInTheDocument())
    expect(getByText('alisha.country')).toBeInTheDocument()
  })
})
