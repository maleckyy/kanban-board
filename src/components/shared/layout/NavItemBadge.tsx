import { Badge } from '@/components/base/badges/badges'
import React from 'react'

export default function NavItemBadge({ number }: { number: number }) {
    return (
        <Badge className="ml-3" color="gray" type="pill-color" size="sm">
            {number > 99 ? "99+" : number}
        </Badge>
    )
}
