import { Lead } from "@prisma/client/edge";
import { ChangeEvent } from "react";

export interface ILeadRowProps {
    lead: Lead;
    isEditing: boolean;
    editFormData: { nome: string; telefone: string; email: string };
    onCycleStatus: (lead: Lead) => void;
    onStartEditing: (lead: Lead) => void;
    onCancelEditing: () => void;
    onSaveEdit: (id: number) => void;
    onWhatsAppClick: (lead: Lead) => void;
    onFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
