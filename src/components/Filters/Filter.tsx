import styles from './Filter.module.css';
import type { IFiltersProps } from '@/@type/IProps/IFiltersProps';

//entrada de props desestruturada
export function Filters({ searchTerm, statusFilter, dateFilter, onSearchChange, onStatusChange, onDateChange}: IFiltersProps) {
  return (
    <div className={styles.filters}>
      <input
        type="search"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">Todos os Status</option>
        <option value="NOVO">Novo</option>
        <option value="EM_CONTATO">Em Contato</option>
        <option value="CONVERTIDO">Convertido</option>
      </select>
      <input
        type="date"
        value={dateFilter}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
  );
}