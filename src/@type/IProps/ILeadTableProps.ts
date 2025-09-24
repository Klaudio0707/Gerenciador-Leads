import { Lead } from "@prisma/client/edge";
import { ChangeEvent } from "react";

export interface ILeadTableProps {
  leads: Lead[];
  editingLeadId: number | null;
  editFormData: { nome: string; telefone: string; email: string };
  onCycleStatus: (lead: Lead) => void;
  onStartEditing: (lead: Lead) => void;
  onCancelEditing: () => void;
  onSaveEdit: (id: number) => void;
  onFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onWhatsAppClick: (lead: Lead) => void;

//   onDelete: (id: number) => void;
}