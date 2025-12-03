'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function MaterialsPage() {
    const { data: materials } = useQuery({
        queryKey: ['materials'],
        queryFn: api.getMaterials,
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Material Library</h2>
                    <p className="text-muted-foreground">Manage concrete mixes and material properties.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Available Materials</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Density (kg/m³)</TableHead>
                                <TableHead>Porosity</TableHead>
                                <TableHead>Strength (MPa)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materials?.map((material) => (
                                <TableRow key={material.id}>
                                    <TableCell className="font-medium">{material.name}</TableCell>
                                    <TableCell className="capitalize">{material.type}</TableCell>
                                    <TableCell>{material.properties.density}</TableCell>
                                    <TableCell>{material.properties.porosity}</TableCell>
                                    <TableCell>{material.properties.compressiveStrength}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
