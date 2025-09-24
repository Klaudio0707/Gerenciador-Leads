import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { LeadStatus } from '@prisma/client';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
      const { id } = await params;
    const body = await request.json();
    const { status, nome, telefone, email } = body;

    if (email) {
    
      const existingLeadWithEmail = await prisma.lead.findFirst({
        where: { email: email },
      });

      if (existingLeadWithEmail && existingLeadWithEmail.id !== Number(id)) {
       
        return NextResponse.json({ message: 'Este e-mail já está em uso por outro lead.' }, { status: 409 });
      }
    }

    if (status && !Object.values(LeadStatus).includes(status)) {
      return NextResponse.json({ message: 'Status inválido fornecido.' }, { status: 400 });
    }

    const dataToUpdate: { status?: LeadStatus; nome?: string; telefone?: string; email?: string } = {};
    if (status) dataToUpdate.status = status;
    if (nome) dataToUpdate.nome = nome;
    if (telefone) dataToUpdate.telefone = telefone;
    if (email) dataToUpdate.email = email;

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ message: 'Nenhum dado fornecido para atualização.' }, { status: 400 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedLead, { status: 200 });

  } catch (error: any) {
    console.error("Erro ao atualizar lead:", error);
    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'Lead não encontrado.' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Ocorreu um erro no servidor.' }, { status: 500 });
  }
}