import { Button } from '@/components/base/buttons/button'
import React from 'react'

type PropsType = {
    successFn: () => void
    closeFn?: () => void
    successBtnDisabled?: boolean
    successBtnText?: string
    cancelBtnText?: string
}

export default function ModalFooterButtons({ successFn, closeFn, successBtnDisabled, successBtnText = "Save", cancelBtnText = "Cancel" }: PropsType) {
    return (
        <div className="flex justify-end gap-3">
            {closeFn && <Button color='primary-destructive' onClick={closeFn}>{cancelBtnText}</Button>}
            <Button onClick={successFn} isDisabled={successBtnDisabled}>{successBtnText}</Button>
        </div>
    )
}
