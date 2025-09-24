import prisma from '@/lib/prisma';
import type { Lead } from '@prisma/client'; 
import type { ICreateLeadBody } from '@/@type/ICreateLeadBody';


export class LeadService {
  public static async createLead(data: ICreateLeadBody): Promise<Lead> {
    

    const existingLead = await prisma.lead.findFirst({
      where: { email: data.email },
      orderBy: {
        createdAt: 'desc', 
      },
    });


    if (existingLead) {
      const oneHourAgo = new Date(Date.now() - 3600 * 1000);
      if (existingLead.createdAt > oneHourAgo) {
        
        throw new Error("Lead já cadastrado recentemente. Tente novamente após 1 hora.");
      }
    }

    return prisma.lead.create({ data });
  }
}