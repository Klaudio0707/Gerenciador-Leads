"use client"

import { Filters } from "@/components/Filters/Filter"
import { LeadTable } from "@/components/LeadTable/LeadTable"
import { StatusCards } from "@/components/StatusCard/StatusCard"
import { Lead, LeadStatus } from "@prisma/client/edge";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

export default function Leads() {

  const [leads, setLeads] = useState<Lead[]>([]);

  // Estados para controlar o modo de edição
  const [editingLeadId, setEditingLeadId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({ nome: '', telefone: '', email: '', status: 'NOVO' as LeadStatus });

  //stados para o filter
  const [statusFilter, setStatusFilter] = useState('');
  const statusCycle: LeadStatus[] = ['NOVO', 'EM_CONTATO', 'CONVERTIDO'];
  const [dateFilter, setDateFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [leadCounts, setLeadCounts] = useState<Record<LeadStatus, number> | null>(null);
  useEffect(() => {


    const timerId = setTimeout(() => {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (dateFilter) params.append('date', dateFilter);
      if (searchTerm) params.append('search', searchTerm);
      const queryString = params.toString();

      const fetchLeads = async () => {
        try {
          const response = await fetch(`/api/leads?${queryString}`);
          const data = await response.json();
          setLeads(data.leads || []);
          setLeadCounts(data.counts || {});
        } catch (err) {
          console.error(err);

        }
      };
      fetchLeads();
    }, 300);

    return () => clearTimeout(timerId);
  }, [statusFilter, dateFilter, searchTerm]);

  // --- (HANDLERS) ---

  const handleCycleStatus = async (leadToUpdate: Lead) => {
    const currentIndex = statusCycle.indexOf(leadToUpdate.status);
    const nextIndex = (currentIndex + 1) % statusCycle.length;
    const newStatus = statusCycle[nextIndex];


    await handleStatusChange(leadToUpdate.id, newStatus);
  };

  const handleStatusChange = async (id: number, status: LeadStatus) => {

    const updatedLeads = leads.map(lead =>
      lead.id === id ? { ...lead, status } : lead
    );
    setLeads(updatedLeads);


    setLeadCounts(calculateCounts(updatedLeads));
    await fetch(`/api/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

  };
  const calculateCounts = (tasks: Lead[]): Record<LeadStatus, number> => {
    const counts = { NOVO: 0, EM_CONTATO: 0, CONVERTIDO: 0 };
    for (const task of tasks) {
      counts[task.status]++;
    }
    return counts;
  };

  const handleWhatsAppClick = (lead: Lead) => {

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${lead.telefone}`;
    window.open(whatsappUrl, '_blank');


    if (lead.status === 'NOVO') {

      handleStatusChange(lead.id, 'EM_CONTATO');
    }
  };
  const handleStartEditing = (lead: Lead) => {
    setEditingLeadId(lead.id);
    setEditFormData({ nome: lead.nome, telefone: lead.telefone, email: lead.email, status: lead.status });
  };

  const handleCancelEditing = () => {
    setEditingLeadId(null);
  };

  const handleEditFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateLead = async (id: number) => {
    if (!editFormData.nome || !editFormData.telefone) {
      return alert("Nome e telefone não podem ser vazios.");
    }

    const response = await fetch(`/api/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData),
    });

    if (response.ok) {
      const updatedLead = await response.json();
      setLeads(leads.map(lead => lead.id === id ? updatedLead : lead));
      setEditingLeadId(null);
    } else {
      alert("Falha ao atualizar o lead.");
    }
  };


  if (leads.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>
      Aguarde...
    </p>;
  }

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


      <LeadTable
        leads={leads}
        editingLeadId={editingLeadId}
        editFormData={editFormData}
        onCycleStatus={handleCycleStatus}
        onStartEditing={handleStartEditing}
        onCancelEditing={handleCancelEditing}
        onSaveEdit={handleUpdateLead}
        onFormChange={handleEditFormChange}
        onWhatsAppClick={handleWhatsAppClick}
      />

    </div>
  )
}