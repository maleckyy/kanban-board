import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltipContent } from "@/components/application/charts/charts-base";
import { cx } from "@/utils/cx";
import useTaskStore from "@/stores/task-store/taskStore";
import { useMemo } from "react";

export const TasksChart = () => {

    const tasks = useTaskStore(state => state.tasks)
    const completedTasks: number = useMemo(() => {
        return tasks.filter(task => task.isDone === true).length
    }, [tasks])

    const title = completedTasks
    const subtitle = "Completed tasks"

    const data = [
        {
            name: "Completed tasks",
            value: completedTasks,
            className: "text-utility-brand-400",
        },
    ];

    return (
        <ResponsiveContainer height={220}>
            <RadialBarChart
                data={data}
                accessibilityLayer
                innerRadius={62}
                outerRadius={96}
                startAngle={90}
                endAngle={360 + 90}
                className="font-medium text-tertiary [&_.recharts-polar-grid]:text-utility-gray-100 [&_.recharts-text]:text-sm"
                margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <PolarAngleAxis tick={false} domain={[0, tasks.length]} type="number" reversed />

                <Tooltip content={<ChartTooltipContent isRadialChart />} />

                <RadialBar
                    isAnimationActive={false}
                    dataKey="value"
                    cornerRadius={99}
                    fill="currentColor"
                    background={{
                        className: "fill-utility-gray-100",
                    }}
                />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                    <tspan x="50%" dy={"-1.175em"} className={cx("fill-current text-tertiary", "text-xs font-medium")}>
                        {subtitle}
                    </tspan>
                    <tspan x="50%" dy={subtitle ? "1.25em" : "1%"} className={cx("fill-current text-primary", "text-xl font-semibold")}>
                        {title}/{tasks.length}
                    </tspan>
                </text>
            </RadialBarChart>
        </ResponsiveContainer>
    );
};