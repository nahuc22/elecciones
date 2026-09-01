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

import type { Person } from '@/lib/mock-data';
import { personStatusLabels } from '@/lib/mock-data';

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

const headers = ['ID', 'Nombre', 'Teléfono', 'Email', 'Localidad', 'Rol', 'Responsable', 'Estado'];

function rowValues(row: Person): (string | number)[] {
  return [row.id, row.name, row.phone, row.email, row.locality, row.role, row.responsible, personStatusLabels[row.status]];
}

function buildCsv(rows: Person[]): string {
  const lines = rows.map((row) => rowValues(row).map((v) => `"${String(v).replaceAll('"', '""')}"`).join(','));
  return [headers.join(','), ...lines].join('\n');
}

function downloadCsv(rows: Person[]): void {
  const csv = buildCsv(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'personas.csv';
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function buildHtmlTable(rows: Person[]): string {
  const rowsHtml = rows
    .map((row) => `<tr>${rowValues(row).map((v) => `<td>${escapeHtml(String(v))}</td>`).join('')}</tr>`)
    .join('');

  return `<table border='1' style='border-collapse: collapse; width: 100%;'>
      <thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>`;
}

function downloadExcel(rows: Person[]): void {
  const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Personas</title></head>
    <body>${buildHtmlTable(rows)}</body>
  </html>`;

  const blob = new Blob(['\uFEFF', html], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'personas.xls';
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function printPdf(rows: Person[]): void {
  const win = globalThis.open('', '_blank');
  if (!win) return;

  const html = `<html>
    <head>
      <title>Personas</title>
      <style>
        body { font-family: sans-serif; padding: 24px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #f5f5f5; }
      </style>
    </head>
    <body>
      <h2>Personas</h2>
      ${buildHtmlTable(rows)}
    </body>
  </html>`;

  win.document.write(html);
  win.document.close();
  win.print();
}

interface PersonasImportExportProps {
  persons: Person[];
}

export function PersonasImportExport({ persons }: PersonasImportExportProps): React.JSX.Element {
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
      if (format === 'csv') downloadCsv(persons);
      if (format === 'excel') downloadExcel(persons);
      if (format === 'pdf') printPdf(persons);
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
      globalThis.alert(`Importar ${labels[format]} (${file.name}) es solo una simulación en este prototipo.`);
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
          Importar
        </Button>
        <Button
          color="inherit"
          onClick={() => openDialog('export')}
          startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}
        >
          Exportar
        </Button>
      </Stack>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{mode === 'import' ? 'Importar personas' : 'Exportar personas'}</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 2 }} variant="body2">
            {mode === 'import'
              ? 'Seleccioná el formato del archivo que vas a importar.'
              : 'Seleccioná el formato en el que querés descargar las personas.'}
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

      <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
    </>
  );
}
