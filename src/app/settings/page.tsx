'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">Manage application preferences and configuration.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="app-name">Application Name</Label>
                        <Input id="app-name" defaultValue="ConcLife" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="units">Unit System</Label>
                        <Input id="units" defaultValue="Metric (SI)" disabled />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    );
}
