import { Badge } from '@/components/base/badges/badges'
import { cx } from '@/utils/cx'
import React from 'react'

export default function NavItemBadge({ number, className }: { number: number, className?: string }) {
    return (
        <Badge className={cx("ml-3", className)} color="gray" type="pill-color" size="sm">
            {number > 99 ? "99+" : number}
        </Badge>
    )
}
