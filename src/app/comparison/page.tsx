'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ComparisonPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Comparison & Reports</h2>
                    <p className="text-muted-foreground">Compare simulation results and generate reports.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Comparison Set
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Comparison Sets</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                        <p>No comparison sets created yet.</p>
                        <Button variant="link">Create your first comparison</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
