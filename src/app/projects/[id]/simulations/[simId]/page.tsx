'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function SimulationResultsPage() {
    const params = useParams();
    const projectId = params.id as string;
    const simId = params.simId as string;

    const { data: simulations } = useQuery({
        queryKey: ['simulations', projectId],
        queryFn: () => api.getSimulations(projectId),
    });

    const simulation = simulations?.find((s) => s.id === simId);

    if (!simulation) {
        return <div>Simulation not found</div>;
    }

    if (simulation.status !== 'completed' || !simulation.results) {
        return <div>Simulation results not available yet. Status: {simulation.status}</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">{simulation.name} - Results</h2>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Service Life</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-green-600">{simulation.results.serviceLife} Years</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Estimated time until critical damage
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Durability Factor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{simulation.results.durabilityFactor}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Overall resistance rating (0-1)
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Damage Progression</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={simulation.results.damageProgression}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="year"
                                    label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }}
                                />
                                <YAxis
                                    label={{ value: 'Damage Index', angle: -90, position: 'insideLeft' }}
                                />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="damage"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    name="Freeze-Thaw Damage"
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
