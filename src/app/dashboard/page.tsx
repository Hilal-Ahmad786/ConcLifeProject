'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, FolderKanban, AlertTriangle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function DashboardPage() {
    const { data: projects } = useQuery({
        queryKey: ['projects'],
        queryFn: api.getProjects,
    });

    // In a real app, we would fetch all elements or a summary endpoint
    // For mock, we'll fetch elements for the first project to simulate "At Risk" data
    const { data: elements } = useQuery({
        queryKey: ['elements', '1'],
        queryFn: () => api.getElements('1'),
    });

    const activeProjects = projects?.filter((p) => p.status === 'active').length || 0;
    const completedProjects = projects?.filter((p) => p.status === 'completed').length || 0;

    const atRiskElements = elements?.filter(e => e.status === 'critical' || e.status === 'warning') || [];
    const criticalCount = elements?.filter(e => e.status === 'critical').length || 0;

    // Mock data for Reliability Overview
    const reliabilityData = [
        { name: 'Bridge A4', reliability: 0.95 },
        { name: 'Office Fdn', reliability: 0.98 },
        { name: 'Sea Wall', reliability: 0.82 },
        { name: 'Tunnel B', reliability: 0.91 },
        { name: 'Retaining Wall', reliability: 0.88 },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                        <FolderKanban className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeProjects}</div>
                        <p className="text-xs text-muted-foreground">
                            +2 from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Simulations</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedProjects}</div>
                        <p className="text-xs text-muted-foreground">
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">At-Risk Elements</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{atRiskElements.length}</div>
                        <p className="text-xs text-muted-foreground">
                            {criticalCount} critical requiring attention
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Reliability</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0.91</div>
                        <p className="text-xs text-muted-foreground">
                            Across all active assets
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Reliability Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={reliabilityData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        domain={[0, 1]}
                                        tickFormatter={(value) => `${value * 100}%`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        formatter={(value: number) => [`${(value * 100).toFixed(0)}%`, 'Reliability']}
                                    />
                                    <Bar dataKey="reliability" radius={[4, 4, 0, 0]}>
                                        {reliabilityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.reliability < 0.9 ? '#ef4444' : '#22c55e'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>At-Risk Elements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {atRiskElements.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No elements currently at risk.</p>
                            ) : (
                                atRiskElements.slice(0, 5).map((element) => (
                                    <div key={element.id} className="flex items-center">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">{element.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Risk Factor: {(element.riskFactor * 100).toFixed(0)}%
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${element.status === 'critical' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {element.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
