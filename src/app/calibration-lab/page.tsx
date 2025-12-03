'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function CalibrationLabPage() {
    const { data: experiments } = useQuery({
        queryKey: ['experiments'],
        queryFn: api.getExperiments,
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Calibration Lab</h2>
                    <p className="text-muted-foreground">Manage experimental data for model calibration.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Experiment
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Experiments</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Results</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {experiments?.map((exp) => (
                                <TableRow key={exp.id}>
                                    <TableCell className="font-medium">{exp.name}</TableCell>
                                    <TableCell>{exp.date}</TableCell>
                                    <TableCell className="capitalize">{exp.type}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${exp.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                exp.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {exp.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {exp.results ? (
                                            <span className="text-sm text-muted-foreground">
                                                {exp.results.cycles} cycles
                                                {exp.results.massLoss ? `, ${exp.results.massLoss} g/m²` : ''}
                                                {exp.results.rdm ? `, RDM ${exp.results.rdm}%` : ''}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
