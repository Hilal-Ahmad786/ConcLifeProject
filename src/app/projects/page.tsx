'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
    const { data: projects, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: api.getProjects,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                <Link href="/projects/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Project
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects?.map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                        <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                            <CardHeader>
                                <CardTitle>{project.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {project.description}
                                </p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">{project.location}</span>
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${project.status === 'active' ? 'bg-green-100 text-green-800' :
                                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
