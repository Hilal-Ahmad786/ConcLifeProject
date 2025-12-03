'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ElementDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    // In a real app, we'd have a specific getElement endpoint
    // Here we'll fetch all elements for a project and find the one we need
    // But since we don't know the project ID easily from the URL /elements/[id], 
    // we might need to adjust our API or mock data structure.
    // For this mock, let's assume we can fetch the element directly or iterate projects.
    // To keep it simple, I'll update the mock API to get a single element by ID if possible,
    // or just fetch all elements from project '1' as a fallback for the mock.

    const { data: elements } = useQuery({
        queryKey: ['elements', '1'], // Mocking project ID '1' for now
        queryFn: () => api.getElements('1'),
    });

    const element = elements?.find(e => e.id === id);

    if (!element) {
        return <div>Element not found</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{element.name}</h2>
                    <p className="text-muted-foreground capitalize">{element.type} - {element.exposureClass}</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-lg font-bold capitalize ${element.status === 'critical' ? 'text-red-600' :
                                element.status === 'warning' ? 'text-yellow-600' :
                                    'text-green-600'
                            }`}>
                            {element.status}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Risk Factor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">{(element.riskFactor * 100).toFixed(0)}%</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Last Inspection</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">{element.lastInspection}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Element Properties</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Material ID</dt>
                            <dd className="text-sm">{element.materialId}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Exposure Class</dt>
                            <dd className="text-sm">{element.exposureClass}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-muted-foreground">Project ID</dt>
                            <dd className="text-sm">{element.projectId}</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>
        </div>
    );
}
