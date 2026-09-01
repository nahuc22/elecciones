'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import type { Person, PersonStatus } from '@/lib/mock-data';
import { mockLocalities, mockPersons, mockRoles, personStatusLabels } from '@/lib/mock-data';
import { PersonDetailDrawer } from '@/components/dashboard/persona/person-detail-drawer';
import { PersonasFilters } from '@/components/dashboard/persona/personas-filters';
import type { PersonasFiltersValue } from '@/components/dashboard/persona/personas-filters';
import { PersonasImportExport } from '@/components/dashboard/persona/personas-import-export';
import { PersonasTable } from '@/components/dashboard/persona/personas-table';

const localityNames = mockLocalities.map((locality) => locality.name);
const statusLabelList = Object.values(personStatusLabels);
const responsibleNames = [...new Set(mockPersons.map((person) => person.responsible))];

const emptyFilters: PersonasFiltersValue = { search: '', locality: '', status: '', responsible: '', role: '' };

export default function Page(): React.JSX.Element {
  const [persons, setPersons] = React.useState<Person[]>(mockPersons);
  const [filters, setFilters] = React.useState<PersonasFiltersValue>(emptyFilters);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedPerson, setSelectedPerson] = React.useState<Person | null>(null);

  const filteredPersons = React.useMemo(() => {
    return persons.filter((person) => {
      const matchesSearch =
        filters.search.trim() === '' || person.name.toLowerCase().includes(filters.search.trim().toLowerCase());
      const matchesLocality = filters.locality === '' || person.locality === filters.locality;
      const matchesStatus = filters.status === '' || personStatusLabels[person.status] === filters.status;
      const matchesResponsible = filters.responsible === '' || person.responsible === filters.responsible;
      const matchesRole = filters.role === '' || person.role === filters.role;

      return matchesSearch && matchesLocality && matchesStatus && matchesResponsible && matchesRole;
    });
  }, [persons, filters]);

  const paginatedPersons = React.useMemo(
    () => filteredPersons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredPersons, page, rowsPerPage]
  );

  const handleFiltersChange = (value: PersonasFiltersValue): void => {
    setFilters(value);
    setPage(0);
  };

  const handleStatusChange = (personId: string, status: PersonStatus): void => {
    setPersons((prev) => prev.map((person) => (person.id === personId ? { ...person, status } : person)));
    setSelectedPerson((prev) => (prev && prev.id === personId ? { ...prev, status } : prev));
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Personas</Typography>
          <PersonasImportExport persons={filteredPersons} />
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Agregar persona
          </Button>
        </div>
      </Stack>
      <PersonasFilters
        value={filters}
        onChange={handleFiltersChange}
        localities={localityNames}
        statuses={statusLabelList}
        responsibles={responsibleNames}
        roles={mockRoles}
      />
      <PersonasTable
        count={filteredPersons.length}
        page={page}
        rows={paginatedPersons}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(Number(event.target.value));
          setPage(0);
        }}
        onRowClick={setSelectedPerson}
      />
      <PersonDetailDrawer
        person={selectedPerson}
        open={Boolean(selectedPerson)}
        onClose={() => setSelectedPerson(null)}
        onStatusChange={handleStatusChange}
      />
    </Stack>
  );
}
