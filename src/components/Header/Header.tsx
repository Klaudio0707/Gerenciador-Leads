import styles from './Header.module.css';
import Link from 'next/link';

export function Header() {
    return (
        <div className={styles.containerHeader}>
            <Link href="/" className={styles.card}>
                <h2>Home</h2>
            </Link>
            <Link href="/cadastro" className={styles.card}>
                <h2>Cadastrar Leads</h2>
            </Link>
            <Link href="/leads" className={styles.card}>
                <h2>Dashboard</h2>
            </Link>
        </div>
    );
}