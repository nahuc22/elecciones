'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { FileCsv } from '@phosphor-icons/react/dist/ssr/FileCsv';
import { FilePdf } from '@phosphor-icons/react/dist/ssr/FilePdf';
import { FileXls } from '@phosphor-icons/react/dist/ssr/FileXls';
import { UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

import { Customer } from './customers-table';

type Format = 'csv' | 'excel' | 'pdf';

const labels: Record<Format, string> = {
  csv: 'CSV',
  excel: 'Excel',
  pdf: 'PDF',
};

const formatIcon: Record<Format, React.ComponentType<{ fontSize?: string; color?: string }>> = {
  csv: FileCsv,
  excel: FileXls,
  pdf: FilePdf,
};

const formatColor: Record<Format, 'primary' | 'success' | 'error'> = {
  csv: 'success',
  excel: 'primary',
  pdf: 'error',
};

const acceptMap: Record<Format, string> = {
  csv: '.csv',
  excel: '.xls,.xlsx',
  pdf: '.pdf',
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function buildCsv(rows: Customer[]): string {
  const headers = ['ID', 'Name', 'Email', 'Phone', 'City', 'State', 'Country', 'Street', 'Signed Up'];
  const lines = rows.map((row) =>
    [
      row.id,
      row.name,
      row.email,
      row.phone,
      row.address.city,
      row.address.state,
      row.address.country,
      row.address.street,
      new Date(row.createdAt).toLocaleDateString(),
    ]
      .map((v) => `"${String(v).replaceAll('"', '""')}"`)
      .join(',')
  );
  return [headers.join(','), ...lines].join('\n');
}

function downloadCsv(rows: Customer[]): void {
  const csv = buildCsv(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'customers.csv';
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function downloadExcel(rows: Customer[]): void {
  const headers = ['ID', 'Name', 'Email', 'Phone', 'Location', 'Signed Up'];
  const rowsHtml = rows
    .map(
      (row) =>
        `<tr>
          <td>${escapeHtml(row.id)}</td>
          <td>${escapeHtml(row.name)}</td>
          <td>${escapeHtml(row.email)}</td>
          <td>${escapeHtml(row.phone)}</td>
          <td>${escapeHtml(`${row.address.city}, ${row.address.state}, ${row.address.country}`)}</td>
          <td>${escapeHtml(new Date(row.createdAt).toLocaleDateString())}</td>
        </tr>`
    )
    .join('');

  const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Customers</title></head>
    <body>
      <table border='1' style='border-collapse: collapse; width: 100%;'>
        <thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </body>
  </html>`;

  const blob = new Blob(['\uFEFF', html], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'customers.xls';
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function printPdf(rows: Customer[]): void {
  const win = globalThis.open('', '_blank');
  if (!win) return;

  const rowsHtml = rows
    .map(
      (row) =>
        `<tr>
          <td>${escapeHtml(row.id)}</td>
          <td>${escapeHtml(row.name)}</td>
          <td>${escapeHtml(row.email)}</td>
          <td>${escapeHtml(row.phone)}</td>
          <td>${escapeHtml(`${row.address.city}, ${row.address.state}, ${row.address.country}`)}</td>
          <td>${escapeHtml(new Date(row.createdAt).toLocaleDateString())}</td>
        </tr>`
    )
    .join('');

  const html = `<html>
    <head>
      <title>Customers</title>
      <style>
        body { font-family: sans-serif; padding: 24px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #f5f5f5; }
      </style>
    </head>
    <body>
      <h2>Customers</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Location</th><th>Signed Up</th></tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </body>
  </html>`;

  win.document.write(html);
  win.document.close();
  win.print();
}

function parseCsv(text: string): Customer[] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
  if (lines.length < 2) return [];

  return lines.slice(1).map((line, index) => {
    // eslint-disable-next-line unicorn/prefer-string-replace-all -- requires regex anchors (^ and $)
    const values = line.split(',').map((v) => v.replace(/^"|"$/g, '').replaceAll('""', '"'));
    return {
      id: values[0] ? `IMP-${index + 1}` : `IMP-${index + 1}`,
      name: values[1] ?? '',
      email: values[2] ?? '',
      phone: values[3] ?? '',
      address: {
        city: values[4] ?? '',
        state: values[5] ?? '',
        country: values[6] ?? '',
        street: values[7] ?? '',
      },
      avatar: '/assets/avatar-1.png',
      createdAt: new Date(),
    };
  });
}

interface CustomersImportExportProps {
  customers: Customer[];
}

export function CustomersImportExport({ customers }: CustomersImportExportProps): React.JSX.Element {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const pendingFormatRef = React.useRef<Format | null>(null);
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<'import' | 'export'>('export');

  const openDialog = (nextMode: 'import' | 'export'): void => {
    setMode(nextMode);
    setOpen(true);
  };

  const handleFormat = (format: Format): void => {
    if (mode === 'export') {
      if (format === 'csv') downloadCsv(customers);
      if (format === 'excel') downloadExcel(customers);
      if (format === 'pdf') printPdf(customers);
      setOpen(false);
      return;
    }

    pendingFormatRef.current = format;
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('accept', acceptMap[format]);
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    const format = pendingFormatRef.current;

    if (file && format) {
      if (format === 'csv') {
        void file.text().then((text) => {
          const imported = parseCsv(text);
          globalThis.alert(`Se importaron ${imported.length} clientes desde ${file.name}`);
        });
      } else {
        globalThis.alert(`Importar ${labels[format]} (${file.name}) requiere procesamiento adicional.`);
      }
    }

    if (event.target) {
      event.target.value = '';
    }
    pendingFormatRef.current = null;
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Button
          color="inherit"
          onClick={() => openDialog('import')}
          startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}
        >
          Import
        </Button>
        <Button
          color="inherit"
          onClick={() => openDialog('export')}
          startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}
        >
          Export
        </Button>
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{mode === 'import' ? 'Importar clientes' : 'Exportar clientes'}</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 2 }} variant="body2">
            {mode === 'import'
              ? 'Seleccioná el formato del archivo que vas a importar.'
              : 'Seleccioná el formato en el que querés descargar los clientes.'}
          </Typography>
          <Stack direction="row" spacing={2}>
            {(['csv', 'excel', 'pdf'] as Format[]).map((format) => {
              const Icon = formatIcon[format];
              return (
                <Button
                  key={format}
                  color={formatColor[format]}
                  fullWidth
                  onClick={() => handleFormat(format)}
                  sx={{ flexDirection: 'column', height: 80, position: 'relative', overflow: 'hidden' }}
                  variant="contained"
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0.25,
                      pointerEvents: 'none',
                    }}
                  >
                    <Icon color="var(--mui-palette-common-white)" fontSize="64px" />
                  </Box>
                  <Typography color="inherit" sx={{ position: 'relative', zIndex: 1 }} variant="h6">
                    {labels[format]}
                  </Typography>
                </Button>
              );
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}
