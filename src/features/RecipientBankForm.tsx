import React, { useContext, useState } from 'react'
import validator from '@rjsf/validator-ajv8'
import { RfqContext } from './RfqContext'
import { JsonSchemaForm } from '../common/JsonSchemaForm'
import { NextButton } from '../common/NextButton'

type RecipientBankFormProps = {
  schema: unknown
  onBack: () => void
  onNext: () => void
}

/**
 * This component represents a form for entering recipient's bank details.
 *
 * @param {unknown} props.schema - The JSON schema for the form.
 * @param {Function} props.onBack - A function to go back to the previous step.
 * @param {Function} props.onNext - A function to proceed to the next step.
 * @returns {JSX.Element} - Returns the RecipientBankForm component.
 */
export function RecipientBankForm(props: RecipientBankFormProps) {
  const { recipientBankObject, setRecipientBankObject } = useContext(RfqContext)
  const [recipientBankForm, setRecipientBankForm] = useState({
    'accountNumber': recipientBankObject ? recipientBankObject.accountNumber : '',
    'reason': recipientBankObject ? recipientBankObject.reason : '',
  })
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false)
  const isInvalidPayoutDetails = recipientBankForm.accountNumber === '' || recipientBankForm.reason === ''

  const handleNext = () => {
    setHasAttemptedNext(true)
    if (!isInvalidPayoutDetails) {
      setRecipientBankObject(recipientBankForm)
      props.onNext()
    }
  }

  return ( 
    <>
      <div className='text-xs mt-2 px-3'>Make sure the information is correct.</div>
      <JsonSchemaForm
        validator={validator}
        schema={props.schema}
        formData={recipientBankForm}
        onChange={(e) => setRecipientBankForm(e.formData)}
      />
      <div className="mx-8 fixed inset-x-0 bottom-6 flex flex-col items-center justify-center">
        {isInvalidPayoutDetails && hasAttemptedNext && (
          <p className="text-sm text-red-600 mb-2">Improper payout details</p>
        )}
        <NextButton onNext={handleNext} />
      </div>
    </>
  )
}