import { CheckboxInput } from 'components/Input/CheckboxInput';
import { Container, ColumnTitle } from './styles';

interface SearchFilterOption {
  id: number;
  label: string;
}

interface SearchFilterColumnProps {
  columnTitle: string;
  searchFilterOptions: SearchFilterOption[];
  updateFilterOptionValue: (id: number, toRemove: boolean) => void;
}

export const SearchFilterColumn: React.FC<SearchFilterColumnProps> = ({
  columnTitle,
  searchFilterOptions,
  updateFilterOptionValue,
}) => {
  return (
    <Container className="filter-column">
      <ColumnTitle>{columnTitle}</ColumnTitle>

      <div>
        {searchFilterOptions.map(({ id, label }) => (
          <CheckboxInput
            key={id}
            label={label}
            defaultChecked
            handleCheckboxUpdate={checked =>
              updateFilterOptionValue(id, !checked)
            }
          />
        ))}
      </div>
    </Container>
  );
};
