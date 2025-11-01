import { TasksChart } from '@/components/dashboard/TasksChart'
import AppPageHeader from '@/components/shared/layout/AppPageHeader'
import Card from '@/styled-components/card/Card'

export default function HomePage() {
    return (
        <>
            <AppPageHeader headerTitle='Dashboard' />
            <section className='flex gap-4 flex-col md:flex-row'>
                <Card>
                    <TasksChart />
                </Card>
            </section>
        </>
    )
}
