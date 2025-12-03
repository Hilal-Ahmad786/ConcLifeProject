import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WizardState } from "@/types"

interface ModelStepProps {
    data: WizardState['data']['model'];
    updateData: (data: WizardState['data']['model']) => void;
}

export function ModelStep({ data, updateData }: ModelStepProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Model Configuration</h3>
                <p className="text-sm text-muted-foreground">
                    Choose the mathematical model and failure criterion for the analysis.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Model Type</Label>
                    <RadioGroup
                        value={data?.type}
                        onValueChange={(val: any) => updateData({ ...data!, type: val })}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="physical" id="physical" />
                            <Label htmlFor="physical">Physical (Poro-mechanics)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="empirical" id="empirical" />
                            <Label htmlFor="empirical">Empirical (Fagerlund)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ml-hybrid" id="ml-hybrid" />
                            <Label htmlFor="ml-hybrid">ML-Hybrid (Experimental)</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="space-y-2">
                    <Label>Failure Criterion</Label>
                    <Select
                        value={data?.failureCriterion}
                        onValueChange={(val: any) => updateData({ ...data!, failureCriterion: val })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select failure criterion..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relative-dynamic-modulus">Relative Dynamic Modulus (RDM)</SelectItem>
                            <SelectItem value="scaling-mass-loss">Scaling / Mass Loss</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
