import { TasksChart } from '@/components/dashboard/TasksChart'
import Card from '@/styled-components/card/Card'
import PageTitle from '@/styled-components/texts/PageTitle'

export default function HomePage() {
    return (
        <>
            <PageTitle>Dashboard</PageTitle>
            <section className='flex gap-4 flex-col md:flex-row'>
                <Card>
                    <TasksChart />
                </Card>
            </section>
        </>
    )
}
