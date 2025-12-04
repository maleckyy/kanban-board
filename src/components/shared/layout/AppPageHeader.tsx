import PageTitle from '@/styled-components/texts/PageTitle'
import React from 'react'

type PropsType = {
    headerTitle: string,
    actionComponent?: React.ReactNode,
    datatestId?: string
}

export default function AppPageHeader({ headerTitle, actionComponent, datatestId }: PropsType) {
    return (
        <section className='flex items-center gap-3' data-testid={datatestId}>
            <PageTitle>{headerTitle}</PageTitle>
            {actionComponent}
        </section>
    )
}
