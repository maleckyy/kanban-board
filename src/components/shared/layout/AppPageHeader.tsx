import PageTitle from '@/styled-components/texts/PageTitle'
import React from 'react'

type PropsType = {
    headerTitle: string,
    actionComponent?: React.ReactNode
}

export default function AppPageHeader({ headerTitle, actionComponent }: PropsType) {
    return (
        <section className='flex items-center gap-3 -z-1'>
            <PageTitle>{headerTitle}</PageTitle>
            {actionComponent}
        </section>
    )
}
