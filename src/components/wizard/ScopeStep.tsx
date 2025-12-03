import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { WizardState } from "@/types"

interface ScopeStepProps {
    data: WizardState['data']['scope'];
    updateData: (data: WizardState['data']['scope']) => void;
}

export function ScopeStep({ data, updateData }: ScopeStepProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Simulation Scope</h3>
                <p className="text-sm text-muted-foreground">
                    Define the basic parameters of your simulation.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Simulation Name</Label>
                    <Input
                        id="name"
                        placeholder="e.g., Bridge Deck Analysis 2024"
                        value={data?.name || ''}
                        onChange={(e) => updateData({ ...data!, name: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Simulation Mode</Label>
                    <RadioGroup
                        value={data?.mode || 'deterministic'}
                        onValueChange={(val: 'deterministic' | 'probabilistic') => updateData({ ...data!, mode: val })}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="deterministic" id="deterministic" />
                            <Label htmlFor="deterministic">Deterministic</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="probabilistic" id="probabilistic" />
                            <Label htmlFor="probabilistic">Probabilistic</Label>
                        </div>
                    </RadioGroup>
                    <p className="text-sm text-muted-foreground pt-1">
                        Deterministic runs a single scenario. Probabilistic accounts for uncertainties using Monte Carlo methods.
                    </p>
                </div>
            </div>
        </div>
    )
}
