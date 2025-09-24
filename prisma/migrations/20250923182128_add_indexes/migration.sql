-- DropIndex
DROP INDEX "public"."Lead_nome_telefone_status_createdAt_idx";

-- CreateIndex
CREATE INDEX "Lead_nome_idx" ON "public"."Lead"("nome");

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "public"."Lead"("email");

-- CreateIndex
CREATE INDEX "Lead_telefone_idx" ON "public"."Lead"("telefone");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "public"."Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "public"."Lead"("createdAt");
