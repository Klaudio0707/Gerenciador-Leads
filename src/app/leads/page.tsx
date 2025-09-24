"use client"

import { Filters } from "@/components/Filters/Filter"
import { useState } from "react";

export default function Leads(){
   
    //stados para o filter
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

    return(
        <div>
            
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