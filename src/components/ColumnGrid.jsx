import React from "react";

export function ColumnGrid({children}) {

    return <div className = {"grid gap-4 md:gap-6 px-3 py-3 grid-cols-1 md:grid-cols-2" }>
        {children}
    </div>
}

export function Column({children}) {
    return <div className = "space-y-4 md:space-y-3 border p-2 md:border-0 ">
        {children}
    </div>
}