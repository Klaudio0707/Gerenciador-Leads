import { LeadStatus } from "@prisma/client/edge";

export interface IUpdateLeadData {
    nome?: string;
    email?: string;
    telefone?: string;
    status?: LeadStatus;
  }