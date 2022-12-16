/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { Button, Field, Heading, Spinner, Typography } from '@ensdomains/thorin'

// CHANGE_TO_COUNTRY
const TLD = process.env.NEXT_PUBLIC_TLD || 'country' // eth

const base = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REGISTRAR_RELAYER,
})

interface CheckDomainRequest {
  sld: string
}
interface PurchaseDomainRequest {
  domain: string
  txHash: string
  address: string
}

export const RelayAPI = () => {
  return {
    checkDomain: async ({ sld }: CheckDomainRequest) => {
      try {
        const {
          data: {
            isAvailable,
            isReserved,
            isRegistered,
            regPrice,
            renewPrice,
            transferPrice,
            restorePrice,
            responseText,
          },
        } = await base.post('/check-domain', { sld })
        return {
          isAvailable,
          isReserved,
          isRegistered,
          regPrice,
          renewPrice,
          transferPrice,
          restorePrice,
          responseText,
        }
      } catch (ex: any) {
        console.error(ex)
        return { error: ex.toString() }
      }
    },
    purchaseDomain: async ({ domain, txHash, address }: PurchaseDomainRequest) => {
      const {
        data: { success, domainCreationDate, domainExpiryDate, traceId, reqTime },
      } = await base.post('/purchase', { domain, txHash, address })
      return { success, domainCreationDate, domainExpiryDate, traceId, reqTime }
    },
  }
}

const validSld = /[a-zA-Z0-9-]+/

const extraSld = (name: string) => {
  if (!name.endsWith(TLD)) {
    return null
  }
  const sld = name.slice(0, name.length - TLD.length - 1)
  if (!sld.match(validSld)) {
    return null
  }
  return sld
}

interface ClaimWeb2DomainInterface {
  txHash: string
  name: string
}

export const ClaimWeb2Domain = ({ txHash, name }: ClaimWeb2DomainInterface) => {
  const sld = extraSld(name)
  const [available, setAvailable] = useState(null)
  const [price, setPrice] = useState()
  const [purchaseSuccess, setPurchaseSuccess] = useState()
  const [expiryDate, setExpiryDate] = useState()
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const { address } = useAccount()

  const claim = useCallback(async () => {
    if (!available || !sld || !txHash || !address) {
      return
    }
    setPending(true)
    try {
      const { success, domainExpiryDate } = await RelayAPI().purchaseDomain({
        domain: name,
        txHash,
        address,
      })
      setPurchaseSuccess(success)
      setExpiryDate(domainExpiryDate)
    } catch (ex: any) {
      console.error(ex)
      setError(`Failed to purchase domain: ${ex.toString()}`)
    } finally {
      setPending(false)
    }
  }, [sld, address, txHash, available])

  useEffect(() => {
    async function f() {
      if (!sld) {
        return
      }
      setPending(true)
      try {
        const { isAvailable, isReserved, isRegistered, regPrice, responseText } =
          await RelayAPI().checkDomain({
            sld,
          })
        setPrice(regPrice)
        setAvailable(isAvailable)
        if (!isAvailable) {
          if (isRegistered) {
            setError('Domain was taken')
          } else if (isReserved) {
            setError('Domain is reserved')
          } else {
            setError(responseText)
          }
        }
      } catch (ex: any) {
        console.error(ex)
        setError(`Failed to retrieve domain status: ${ex.toString()}`)
      } finally {
        setPending(false)
      }
    }
    f()
  }, [sld])

  if (!txHash || !sld) {
    return <></>
  }
  return (
    <div>
      {available === null && (
        <>
          {pending && (
            <Field label="Checking if web2 domain is available..." inline>
              <Spinner color="black" />
            </Field>
          )}
        </>
      )}
      {available === false && (
        <Field label="Web2 domain is not available">
          <Typography color="red">{error}</Typography>
        </Field>
      )}
      {available && (
        <>
          <Typography>Web2 domain {name} is also available! Get it for free</Typography>
          <Button style={{ marginTop: 16 }} onClick={claim} disabled={pending && !purchaseSuccess}>
            Claim Now
          </Button>
          {purchaseSuccess && (
            <>
              <Typography color="green">You now also owns web2 {name}!</Typography>
              <Typography>
                Checkout your website at{' '}
                <a href={`https://${name}`} target="_blank" rel="noreferrer">
                  {name}
                </a>
              </Typography>
              <Typography>Your web2 domain expires at {expiryDate}</Typography>
            </>
          )}
          {purchaseSuccess === false && (
            <Field label="Failed to claim the web2 domain">
              <Typography color="red">{error}</Typography>
            </Field>
          )}
        </>
      )}
    </div>
  )
}
