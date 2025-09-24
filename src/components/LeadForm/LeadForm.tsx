"use client";
import { type FormEvent, useState } from 'react';
import styles from './LeadForm.module.css';

export function LeadForm() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, telefone }),
            });
            if (response.ok) {
                setMessage('Lead cadastrado com sucesso!  Redirecionando...');

                const numeroWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
                if (!numeroWhatsapp) {
                    console.error("Número do WhatsApp não está definido nas variáveis de ambiente.");
                    return;
                }
                const mensagemWhatsapp = encodeURIComponent(`Olá, meu nome é ${nome}. Gostaria de mais informações.`);
                const whatsappUrl = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${mensagemWhatsapp}`;

                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                }, 2000); // pausa para leitura de mensagem
               
            } else {
                const errorData = await response.json();
                setMessage(`Erro: ${errorData.message || 'Não foi possível realizar o cadastro.'}`);
            }
        } catch (error) {
            setMessage(`Erro: ${error || 'Não foi possível realizar o cadastro.'}. Tente novamente mais tarde.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Cadastro de Leads</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="nome">Nome</label>
                    <input id="nome" type="text" value={nome} placeholder='Nome' onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="email" value={email} placeholder='email@email.com' onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="telefone">Telefone</label>
                    <input id="telefone" type="tel" value={telefone} placeholder="81999998888" onChange={(e) => setTelefone(e.target.value)} required />
                </div>
                <button type="submit" disabled={isLoading} className={styles.submitButton}>
                    {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </main >
    );

}