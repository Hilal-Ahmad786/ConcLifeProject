'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ProjectDetailsPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: project, isLoading: isLoadingProject } = useQuery({
        queryKey: ['project', id],
        queryFn: () => api.getProject(id),
    });

    const { data: simulations, isLoading: isLoadingSimulations } = useQuery({
        queryKey: ['simulations', id],
        queryFn: () => api.getSimulations(id),
    });

    const { data: elements, isLoading: isLoadingElements } = useQuery({
        queryKey: ['elements', id],
        queryFn: () => api.getElements(id),
    });

    if (isLoadingProject || isLoadingSimulations || isLoadingElements) {
        return <div>Loading...</div>;
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    // Mock data for project-level charts
    const damageData = [
        { year: 2024, damage: 0.05, reliability: 1.0 },
        { year: 2029, damage: 0.15, reliability: 0.98 },
        { year: 2034, damage: 0.25, reliability: 0.92 },
        { year: 2039, damage: 0.40, reliability: 0.85 },
        { year: 2044, damage: 0.60, reliability: 0.75 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
                    <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Edit Project</Button>
                    <Link href={`/projects/${id}/simulations/new`}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Simulation
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">{project.location}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold capitalize">{project.status}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Elements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">{elements?.length || 0}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <CardTitle>Project Reliability Projection</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={damageData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <Tooltip />
                                    <Legend />
                                    <Line yAxisId="left" type="monotone" dataKey="damage" stroke="#ef4444" name="Avg Damage" />
                                    <Line yAxisId="right" type="monotone" dataKey="reliability" stroke="#22c55e" name="Reliability Index" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <CardTitle>Elements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {elements?.map((element) => (
                                    <TableRow key={element.id}>
                                        <TableCell className="font-medium">{element.name}</TableCell>
                                        <TableCell className="capitalize">{element.type}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${element.status === 'critical' ? 'bg-red-100 text-red-800' :
                                                    element.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'
                                                }`}>
                                                {element.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/elements/${element.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Simulations</h3>
                {simulations?.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                            <p>No simulations found for this project.</p>
                            <Link href={`/projects/${id}/simulations/new`}>
                                <Button variant="link">Create your first simulation</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {simulations?.map((sim) => (
                            <Card key={sim.id}>
                                <CardContent className="flex items-center justify-between p-6">
                                    <div>
                                        <h4 className="font-semibold">{sim.name}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Duration: {sim.parameters.duration} years | Cycles: {sim.parameters.cyclesPerYear}/year
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${sim.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                sim.status === 'running' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {sim.status}
                                        </span>
                                        <Link href={`/projects/${id}/simulations/${sim.id}`}>
                                            <Button variant="outline" size="sm">
                                                View Results
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
