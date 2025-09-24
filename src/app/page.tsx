import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
     <h2 className={styles.title}>Gerenciador de Leads</h2>
     <p className={styles.subtitle}>Bem-vindo ao Gerenciador de Leads</p>
      <div>
        <Link href="/leads" className={styles.card}>
          <h2>Visualizar Leads</h2>
          <p>Ver e gerenciar a lista de leads cadastrados.</p>
        </Link>
        <Link href="/cadastro" className={styles.card}>
          <h2>Cadastrar Lead</h2>
          <p>Adicionar um novo lead ao sistema.</p>
        </Link>
      </div>
    </main>
  );
}
