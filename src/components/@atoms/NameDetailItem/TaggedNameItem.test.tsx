import { mockFunction, render } from '@app/test-utils'

import { ReactNode } from 'react'

import { NameDetailItem } from './NameDetailItem'
import { TaggedNameItem } from './TaggedNameItem'

jest.mock('./NameDetailItem')
jest.mock('@app/components/@atoms/ExpiryComponents/ExpiryComponents')

const mockNameDetailItem = mockFunction(NameDetailItem)

const mockComponent = ({ children }: { children: ReactNode }) => <div>{children}</div>
mockNameDetailItem.mockImplementation(mockComponent as any)

describe('TaggedNameItem', () => {
  it('should render registrant if .country name', () => {
    const { queryByText } = render(
      // CHANGE_TO_COUNTRY
      <TaggedNameItem
        name="name.country"
        expiryDate={'2020-01-01' as any}
        isController
        isRegistrant
        network={1}
      />,
    )
    expect(queryByText('name.owner')).toBeInTheDocument()
  })
  it('should NOT render registrant if not a .country name', () => {
    const { queryByText } = render(
      <TaggedNameItem
        name="name"
        expiryDate={'2020-01-01' as any}
        isController
        isRegistrant
        network={1}
      />,
    )
    expect(queryByText('name.owner')).not.toBeInTheDocument()
  })
})
