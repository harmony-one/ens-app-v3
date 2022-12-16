import { mockFunction, renderHook, waitFor } from '@app/test-utils'

import { useEns } from '@app/utils/EnsProvider'

import { useNameDetails } from './useNameDetails'
import { useProfile } from './useProfile'
import { useRegistrationStatus } from './useRegistrationStatus'
import { useValidate } from './useValidate'
import { useWrapperExists } from './useWrapperExists'

jest.mock('@app/utils/EnsProvider')
jest.mock('./useProfile')
jest.mock('./useRegistrationStatus')
jest.mock('./useValidate')
jest.mock('./useWrapperExists')

const mockUseEns = mockFunction(useEns)
const mockUseProfile = mockFunction(useProfile)
const mockUseRegistrationStatus = mockFunction(useRegistrationStatus)
const mockUseValidate = mockFunction(useValidate)
const mockUseWrapperExists = mockFunction(useWrapperExists)

const mockGetOwner = {
  ...jest.fn(),
  batch: jest.fn(),
}
const mockGetExpiry = {
  ...jest.fn(),
  batch: jest.fn(),
}
const mockBatch = jest.fn()
const mockGetDNSOwner = jest.fn(
  () =>
    new Promise((resolve) => {
      resolve('0xaddress')
    }),
)

describe('useNameDetails', () => {
  mockUseEns.mockReturnValue({
    ready: true,
    getOwner: mockGetOwner,
    getExpiry: mockGetExpiry,
    getDNSOwner: mockGetDNSOwner,
    batch: mockBatch,
  })
  mockUseProfile.mockReturnValue({
    loading: false,
    profile: undefined,
    status: 'success',
  })
  mockUseRegistrationStatus.mockReturnValue({
    data: undefined,
    isLoading: false,
    status: 'success',
  })
  mockUseWrapperExists.mockReturnValue(true)
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should return an error message for an invalid name', () => {
    mockUseValidate.mockReturnValue({
      valid: false,
      name: 'invalid',
    })

    const { result } = renderHook(() => useNameDetails('invalid'))
    expect(result.current.error).toEqual('errors.invalidName')
  })
  it('should call getDNSOwner if TLD is not .country', () => {
    mockUseValidate.mockReturnValue({
      valid: true,
      name: 'test.com',
      labelCount: 2,
    })

    renderHook(() => useNameDetails('test.com'))
    expect(mockGetDNSOwner).toHaveBeenCalledWith('test.com')
  })
  it('should return dnsOwner if TLD is not .country and there is an owner', async () => {
    mockUseValidate.mockReturnValue({
      valid: true,
      name: 'test.com',
      labelCount: 2,
    })

    const { result } = renderHook(() => useNameDetails('test.com'))
    await waitFor(() => expect(result.current.dnsOwner).toEqual('0xaddress'))
  })
})
