'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

export interface LocalidadRow {
  name: string;
  persons: number;
  contacted: number;
  followUp: number;
  confirmed: number;
}

interface LocalidadesTableProps {
  rows: LocalidadRow[];
}

export function LocalidadesTable({ rows }: LocalidadesTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '700px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Localidad</TableCell>
              <TableCell>Personas</TableCell>
              <TableCell>Contactadas</TableCell>
              <TableCell>En seguimiento</TableCell>
              <TableCell>Confirmadas</TableCell>
              <TableCell>Avance de contacto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const progress = row.persons > 0 ? Math.round((row.contacted / row.persons) * 100) : 0;

              return (
                <TableRow hover key={row.name}>
                  <TableCell>
                    <Typography variant="subtitle2">{row.name}</Typography>
                  </TableCell>
                  <TableCell>{row.persons}</TableCell>
                  <TableCell>{row.contacted}</TableCell>
                  <TableCell>{row.followUp}</TableCell>
                  <TableCell>{row.confirmed}</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress sx={{ flex: 1, height: 6, borderRadius: 1 }} value={progress} variant="determinate" />
                      <Typography color="text.secondary" variant="caption">
                        {progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
