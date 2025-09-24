
const { PrismaClient } = require('@prisma/client');

console.log('Iniciando teste de conexão...');

try {
  const prisma = new PrismaClient();
  console.log('Instância do PrismaClient criada.');

  async function main() {
    console.log('Tentando conectar e fazer uma consulta...');
    const leadCount = await prisma.lead.count();
    console.log(`✅ Conexão bem-sucedida! Você tem ${leadCount} leads no banco.`);
  }

  main()
    .catch(async (e) => {
      console.error('❌ Falha na conexão ou na consulta!');
      console.error('--- MENSAGEM DE ERRO DETALHADA ---');
      console.error(e);
      console.error('------------------------------------');
      console.log('VERIFIQUE SEU ARQUIVO .env E SE O POSTGRESQL ESTÁ RODANDO.');
      await prisma.$disconnect();
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

} catch (error) {
  console.error('❌ Erro CRÍTICO ao inicializar o PrismaClient.');
  console.error(error);
}