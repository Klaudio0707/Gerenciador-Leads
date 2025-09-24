import type { Metadata } from 'next';
import { LeadForm } from '@/components/LeadForm/LeadForm';
export const metadata: Metadata = {
  title: 'Cadastro de Leads',
  description: 'Cadastre-se para mais informações.',
};

export default function LeadCapturePage() {
 
  return (
    <div>
       <LeadForm />
    </div>
  );
}