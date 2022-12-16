import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'

import { Tag, mq } from '@ensdomains/thorin'

import { ReturnedName } from '@app/hooks/useNamesFromAddress'

import { NameDetailItem } from './NameDetailItem'

const OtherItemsContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-flow: column wrap;
    align-items: flex-end;
    justify-content: center;
    gap: ${theme.space['2']};
    flex-gap: ${theme.space['2']};
    ${mq.md.min(css`
      flex-direction: row;
      gap: ${theme.space['4']};
      flex-gap: ${theme.space['4']};
    `)}
  `,
)

export const TaggedNameItem = ({
  name,
  isController,
  isRegistrant,
  isWrappedOwner,
  fuses,
  expiryDate,
  network,
  truncatedName,
  mode,
  selected,
  disabled = false,
  onClick,
}: Omit<ReturnedName, 'labelName' | 'labelhash' | 'isMigrated' | 'parent' | 'type' | 'id'> & {
  network: number
  selected?: boolean
  mode?: 'select' | 'view'
  disabled?: boolean
  onClick?: () => void
}) => {
  const { t } = useTranslation('common')
  // CHANGE_TO_COUNTRY
  const isNativeEthName = /\.country$/.test(name) && name.split('.').length === 2

  const tags: [disabled: boolean, translation: string][] = []

  if (!fuses) {
    tags.push([!!isController, 'name.manager'])
    if (isNativeEthName) {
      tags.push([!!isRegistrant, 'name.owner'])
    }
  } else {
    tags.push([!!isWrappedOwner, fuses.PARENT_CANNOT_CONTROL ? 'name.owner' : 'name.manager'])
  }

  return (
    <NameDetailItem
      key={name}
      network={network}
      truncatedName={truncatedName}
      expiryDate={expiryDate}
      name={name}
      mode={mode}
      selected={selected}
      disabled={disabled}
      onClick={onClick}
    >
      <OtherItemsContainer>
        {tags.map(([tagDisabled, translation]) => (
          <Tag key={translation} tone={!(tagDisabled && disabled) ? 'accent' : 'secondary'}>
            {t(translation)}
          </Tag>
        ))}
      </OtherItemsContainer>
    </NameDetailItem>
  )
}
