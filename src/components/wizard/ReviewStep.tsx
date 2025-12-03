import { WizardState } from "@/types"
import { Card, CardContent } from "@/components/ui/card"

interface ReviewStepProps {
    data: WizardState['data'];
}

export function ReviewStep({ data }: ReviewStepProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Review & Run</h3>
                <p className="text-sm text-muted-foreground">
                    Review your configuration before starting the simulation.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardContent className="pt-6">
                        <h4 className="font-semibold mb-2">Scope</h4>
                        <dl className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Name:</dt>
                                <dd>{data.scope?.name}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Mode:</dt>
                                <dd className="capitalize">{data.scope?.mode}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <h4 className="font-semibold mb-2">Configuration</h4>
                        <dl className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Material ID:</dt>
                                <dd>{data.material?.selectedId}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Climate ID:</dt>
                                <dd>{data.climate?.selectedId}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Model:</dt>
                                <dd className="capitalize">{data.model?.type}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-md bg-blue-50 p-4 text-blue-900">
                <p className="text-sm font-medium">Ready to simulate?</p>
                <p className="text-xs mt-1">
                    This action will queue the simulation job. Estimated time: {data.scope?.mode === 'probabilistic' ? '5-10 minutes' : '30 seconds'}.
                </p>
            </div>
        </div>
    )
}
