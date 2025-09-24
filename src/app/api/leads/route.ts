import {NextRequest, NextResponse} from "next/server";


// export async function GET(request: NextRequest){

// }
export async function POST(request: NextRequest){
    try{
        const {nome, email, telefone} = await request.json();

        if(!nome || !email || !telefone){
            return NextResponse.json({error: "Nome, email e telefone são obrigatórios."}, {status: 400});
        }
        const existingLead = await prisma.lead.findUnique({
            where: {email: email}, // setando o email
            orderBy: {
                createdAt: 'desc' // ordenar pelos mais recentes
            }
        });

        if(existingLead){
            const oneHourAgo = new Date(Date.now() - 3600 * 1000);
            if ( existingLead.createdAt > oneHourAgo){
                return NextResponse.json({message: "Lead já cadastrado. Tente novamente após 1 hora. "}, { status: 409 });
            }
        }
        const newLead = await prisma.lead.create({
            data:{
                nome,
                email,
                telefone,
            }
        });
        return NextResponse.json(newLead, {status: 201});
    }catch (error){
        console.error("Erro ao cadastrar lead:", error);
         return NextResponse.json({ message: 'Ocorreu um erro interno no servidor.' }, { status: 500 });
    }
}