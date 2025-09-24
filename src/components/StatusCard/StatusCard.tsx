import type { IStatusCardsProps } from '@/@type/IProps/IStatusCardsProps';
import styles from './StatusCards.module.css';


export function StatusCards({ counts }: IStatusCardsProps) {
    return (
        <div className={styles.statusContainer}>
            <div className={styles.statusCard}>
                <h3>Novos</h3>
                <p>{counts?.NOVO || 0}</p>
            </div>
            <div className={styles.statusCard}>
                <h3>Em Contato</h3>
                <p>{counts?.EM_CONTATO || 0}</p>
            </div>
            <div className={styles.statusCard}>
                <h3>Convertidos</h3>
                <p>{counts?.CONVERTIDO || 0}</p>
            </div>
        </div>
    );
}