"use client"
import type { ILeadTableProps } from '@/@type/IProps/ILeadTableProps';
import { LeadRow } from '../LeadRow/LeadRow';
import styles from './LeadTable.module.css';


export function LeadTable({ leads, ...props }: ILeadTableProps) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Nome</th>
            <th className={styles.th}>E-mail</th>
            <th className={styles.th}>Telefone</th>
            <th className={styles.th}>Data</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              isEditing={props.editingLeadId === lead.id}
              editFormData={props.editFormData}
              onCycleStatus={props.onCycleStatus}
              onStartEditing={props.onStartEditing}
              onCancelEditing={props.onCancelEditing}
              onSaveEdit={props.onSaveEdit}
              onFormChange={props.onFormChange}
              onWhatsAppClick={props.onWhatsAppClick}
            //   onDeete={props.onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}