import { mockFunction, render, screen } from '@app/test-utils'

import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

import { useProfileActions } from '@app/hooks/useProfileActions'

import { DetailSnippet } from './DetailSnippet'

jest.mock('next/router')
jest.mock('@app/hooks/useProfileActions')

const mockUseRouter = mockFunction(useRouter)
const mockUseAccount = mockFunction(useAccount)
const mockUseProfileActions = mockFunction(useProfileActions)

describe('DetailSnippet', () => {
  const mockRouterObject = {
    query: {
      name: 'nick.country',
    },
  }
  mockUseAccount.mockReturnValue({ address: '0x123' })
  mockUseProfileActions.mockReturnValue({
    profileActions: undefined,
  })

  it('should show the expiry date if given', () => {
    const mockData = {
      expiryDate: new Date(1654782805000),
      canSend: false,
      name: 'nick.country',
    }
    mockUseRouter.mockReturnValue(mockRouterObject)
    render(<DetailSnippet {...mockData} />)
    expect(screen.getByText('June 9, 2022')).toBeVisible()
  })
  it('should not show the expiry date if none given', () => {
    const mockData = {
      canSend: false,
    }
    mockUseRouter.mockReturnValue(mockRouterObject)
    render(<DetailSnippet {...mockData} />)
    expect(screen.queryByText('June 9, 2022')).not.toBeInTheDocument()
  })
  it('should show the extend button if expiry date is given', () => {
    const mockData = {
      expiryDate: new Date('1654782805000'),
      canSend: false,
    }
    render(<DetailSnippet {...mockData} />)
    expect(screen.getByTestId('extend-button')).toBeVisible()
  })
  it('should show the send button if canSend is true', () => {
    const mockData = {
      expiryDate: new Date('1654782805000'),
      canSend: true,
    }
    render(<DetailSnippet {...mockData} />)
    expect(screen.getByTestId('send-button')).toBeVisible()
  })
  it('should show the send button if canSend is true and there is no expiry date given', () => {
    const mockData = {
      canSend: true,
    }
    render(<DetailSnippet {...mockData} />)
    expect(screen.getByTestId('send-button')).toBeVisible()
  })
})
