'use client';
import styles from './LeadRow.module.css';
import { FaPenToSquare } from 'react-icons/fa6';
import type { ILeadRowProps } from '@/@type/IProps/ILeadRowProps';

export function LeadRow({
    lead,
    onWhatsAppClick,
    isEditing,
    editFormData,
    onCycleStatus,
    onStartEditing,
    onCancelEditing,
    onSaveEdit,
    onFormChange,
}: ILeadRowProps) {

    return (
        <tr>
            {isEditing ? (
                <>
                    <td className={styles.td}><input type="text" name="nome" value={editFormData.nome} onChange={onFormChange} className={styles.editInput} /></td>
                    <td className={styles.td}><input type="email" name="email" value={editFormData.email} onChange={onFormChange} className={styles.editInput} /></td>
                    <td className={styles.td}><input type="text" name="telefone" value={editFormData.telefone} onChange={onFormChange} className={styles.editInput} /></td>
                    <td className={styles.td}>{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td className={styles.td}>{lead.status}</td>
                    <td className={styles.td}>
                        <div className={styles.actionCell}>
                            <button onClick={() => onSaveEdit(lead.id)}>Salvar</button>
                            <button onClick={onCancelEditing}>Cancelar</button>
                        </div>
                    </td>
                </>
            ) : (
                <>
                    <td className={styles.td}>{lead.nome}</td>
                    <td className={styles.td}>{lead.email}</td>
                    <td className={styles.td}>{lead.telefone}</td>
                    <td className={styles.td}>{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td className={styles.td}>
                        <button
                            className={`${styles.statusBtn} ${lead.status === 'CONVERTIDO' ? styles.statusConvertido : ''}`}
                            onClick={() => onCycleStatus(lead)}
                        >
                            {lead.status.replace('_', ' ')}
                        </button>
                    </td>
                    <td className={styles.td}>
                        <div className={styles.actionCell}>
                            <button
                                onClick={() => onWhatsAppClick(lead)}
                                className={`${styles.actionButton} ${styles.whatsappLink}`}
                            > WhatsApp</button>
                            <button onClick={() => onStartEditing(lead)} className={styles.actionButton}> <FaPenToSquare /></button>
                        </div>
                    </td>
                </>
            )}
        </tr>
    );
}