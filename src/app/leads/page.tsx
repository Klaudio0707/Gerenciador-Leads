"use client"

import { Filters } from "@/components/Filters/Filter"
import { StatusCards } from "@/components/StatusCard/StatusCard"
import { LeadStatus } from "@prisma/client/edge";
import { useState } from "react";

export default function Leads() {

    //stados para o filter
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');



    const [leadCounts, setLeadCounts] = useState<Record<LeadStatus, number> | null>(null);

    return (
        <div>
            <StatusCards counts={leadCounts} />
            
            <Filters
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                dateFilter={dateFilter}
                onSearchChange={setSearchTerm}
                onStatusChange={setStatusFilter}
                onDateChange={setDateFilter}
            />

        </div>
    )
}