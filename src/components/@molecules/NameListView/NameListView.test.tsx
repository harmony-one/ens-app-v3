import { mockFunction, render } from '@app/test-utils'

import { TaggedNameItem } from '@app/components/@atoms/NameDetailItem/TaggedNameItem'

import { NameListView } from './NameListView'

jest.mock('@app/components/@atoms/NameDetailItem/TaggedNameItem')

const mockTaggedNameItem = mockFunction(TaggedNameItem)

const mockComponent = ({ name }: { name: string }) => <div key={name}>{name}</div>

describe('NameListView', () => {
  it('should render if there are results', () => {
    mockTaggedNameItem.mockImplementation(mockComponent as any)

    const { getByText } = render(
      // CHANGE_TO_COUNTRY
      <NameListView
        currentPage={
          [
            {
              name: 'name.country',
              id: '0x123',
              expiryDate: '2020-01-01',
              isController: true,
              isRegistrant: true,
            },
          ] as any
        }
        network={1}
      />,
    )
    // CHANGE_TO_COUNTRY
    expect(getByText('name.country')).toBeInTheDocument()
  })
  it('should render no results if there are no results', () => {
    const { queryByText } = render(<NameListView currentPage={[]} network={1} />)
    expect(queryByText('errors.noResults')).toBeInTheDocument()
  })
})
