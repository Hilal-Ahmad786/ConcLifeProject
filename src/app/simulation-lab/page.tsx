'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardState } from '@/types';
import { ScopeStep } from '@/components/wizard/ScopeStep';
import { MaterialStep } from '@/components/wizard/MaterialStep';
import { ClimateStep } from '@/components/wizard/ClimateStep';
import { ModelStep } from '@/components/wizard/ModelStep';
import { UncertaintiesStep } from '@/components/wizard/UncertaintiesStep';
import { ReviewStep } from '@/components/wizard/ReviewStep';
import { ChevronRight, ChevronLeft, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

const STEPS = [
    { id: 1, title: 'Scope & Mode', component: ScopeStep },
    { id: 2, title: 'Material', component: MaterialStep },
    { id: 3, title: 'Climate', component: ClimateStep },
    { id: 4, title: 'Model', component: ModelStep },
    { id: 5, title: 'Uncertainties', component: UncertaintiesStep },
    { id: 6, title: 'Review & Run', component: ReviewStep },
];

export default function SimulationLabPage() {
    const router = useRouter();
    const [state, setState] = useState<WizardState>({
        step: 1,
        data: {
            scope: { name: '', mode: 'deterministic' },
            material: { selectedId: '' },
            climate: { selectedId: '' },
            model: { type: 'physical', failureCriterion: 'relative-dynamic-modulus' },
            uncertainties: { materialVariability: 10, climateVariability: 15 },
        },
    });

    const currentStep = STEPS.find((s) => s.id === state.step) || STEPS[0];
    const Component = currentStep.component;

    const updateData = (section: keyof WizardState['data'], data: any) => {
        setState((prev) => ({
            ...prev,
            data: { ...prev.data, [section]: data },
        }));
    };

    const handleNext = () => {
        if (state.step < STEPS.length) {
            setState((prev) => ({ ...prev, step: prev.step + 1 }));
        } else {
            // Run simulation
            // In a real app, this would call the API
            console.log('Running simulation with data:', state.data);
            // Simulate a delay then redirect to a result page (mocked)
            setTimeout(() => {
                router.push('/projects/1/simulations/sim-1'); // Redirect to a mock result
            }, 1000);
        }
    };

    const handleBack = () => {
        if (state.step > 1) {
            setState((prev) => ({ ...prev, step: prev.step - 1 }));
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Simulation Lab</h2>
                <p className="text-muted-foreground">
                    Configure and run advanced durability simulations.
                </p>
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-muted -z-10" />
                    {STEPS.map((step) => (
                        <div
                            key={step.id}
                            className={`flex flex-col items-center gap-2 bg-background px-2 ${step.id === state.step ? 'text-primary' :
                                step.id < state.step ? 'text-primary/80' : 'text-muted-foreground'
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${step.id === state.step ? 'border-primary bg-primary text-primary-foreground' :
                                step.id < state.step ? 'border-primary text-primary' : 'border-muted-foreground'
                                }`}>
                                {step.id}
                            </div>
                            <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{currentStep.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Component
                        data={
                            (currentStep.id === 1 ? state.data.scope :
                                currentStep.id === 2 ? state.data.material :
                                    currentStep.id === 3 ? state.data.climate :
                                        currentStep.id === 4 ? state.data.model :
                                            currentStep.id === 5 ? state.data.uncertainties :
                                                state.data) as any
                        }
                        updateData={(data: any) => {
                            if (currentStep.id === 1) updateData('scope', data);
                            else if (currentStep.id === 2) updateData('material', data);
                            else if (currentStep.id === 3) updateData('climate', data);
                            else if (currentStep.id === 4) updateData('model', data);
                            else if (currentStep.id === 5) updateData('uncertainties', data);
                        }}
                    />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack} disabled={state.step === 1}>
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={handleNext}>
                        {state.step === STEPS.length ? (
                            <>Run Simulation <Play className="ml-2 h-4 w-4" /></>
                        ) : (
                            <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
