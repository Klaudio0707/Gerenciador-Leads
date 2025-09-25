import { NextRequest, NextResponse } from "next/server";
import { LeadStatus, Prisma } from '@prisma/client/edge';
import prisma from '@/lib/prisma';
import { LeadService } from "@/services/LeadService";
import type { ICreateLeadBody } from '@/@type/ICreateLeadBody';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const date = searchParams.get('date');

    const whereClause: Prisma.LeadWhereInput = {};

    if (status && Object.values(LeadStatus).includes(status as LeadStatus)) {
      whereClause.status = status as LeadStatus;
    }

    if (search) {
      whereClause.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { telefone: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
      whereClause.createdAt = { gte: startDate, lt: endDate };
    }


    const leads = await prisma.lead.findMany({
      where: whereClause,
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        createdAt: true,
        status: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const leadCounts = await prisma.lead.groupBy({
      by: ['status'],
      _count: { _all: true },
    });


    const counts = leadCounts.reduce((acc, current) => {
      acc[current.status] = current._count._all;
      return acc;
    }, {} as Record<LeadStatus, number>);



    return NextResponse.json({ leads, counts }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar leads:", error.message);
    } else {
      console.error("Erro desconhecido ao buscar leads:", error);
    }
    return NextResponse.json({ message: 'Ocorreu um erro.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { nome, email, telefone } = await request.json() as ICreateLeadBody;

    if (!nome || !email || !telefone) {
      return NextResponse.json({ message: "Nome, e-mail e telefone são obrigatórios." }, { status: 400 });
    }

    const phoneDigitsOnly = telefone.replace(/\D/g, '');

    if (phoneDigitsOnly.length < 10 || phoneDigitsOnly.length > 11) {
      return NextResponse.json({ message: 'O telefone fornecido é inválido.' }, { status: 400 });
    }

    const newLead = await LeadService.createLead({ nome, email, telefone: phoneDigitsOnly, });

    return NextResponse.json(newLead, { status: 201 });

  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes("recentemente")) {
      return NextResponse.json({ message: error.message }, { status: 409 });
    }

    console.error("Erro ao cadastrar lead:", error);
    return NextResponse.json({ message: 'Ocorreu um erro interno no servidor.' }, { status: 500 });
  }
}