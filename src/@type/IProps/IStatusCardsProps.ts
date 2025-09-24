import { LeadStatus } from "@prisma/client/edge";

export interface IStatusCardsProps {
  counts: Record<LeadStatus, number> | null;
}