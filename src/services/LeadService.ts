import prisma from '@/lib/prisma';

export class LeadService {
  public static async createLead(data: { nome: string, email: string, telefone: string }) {
    const existingLead = await prisma.lead.findUnique({ where: { email: data.email } });

    if (existingLead) {
      throw new Error("Lead já existe");
    }

    return prisma.lead.create({ data });
}
}
