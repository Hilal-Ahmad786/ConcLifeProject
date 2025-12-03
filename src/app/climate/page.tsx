'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ClimatePage() {
    const { data: climates } = useQuery({
        queryKey: ['climates'],
        queryFn: api.getClimateProfiles,
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Climate Profiles</h2>
                    <p className="text-muted-foreground">Manage environmental exposure data.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Available Profiles</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {climates?.map((climate) => (
                                <TableRow key={climate.id}>
                                    <TableCell className="font-medium">{climate.name}</TableCell>
                                    <TableCell>{climate.location}</TableCell>
                                    <TableCell className="capitalize">{climate.type}</TableCell>
                                    <TableCell className="text-muted-foreground">{climate.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
