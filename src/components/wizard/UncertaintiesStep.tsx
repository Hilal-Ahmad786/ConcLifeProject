import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { WizardState } from "@/types"

interface UncertaintiesStepProps {
    data: WizardState['data']['uncertainties'];
    updateData: (data: WizardState['data']['uncertainties']) => void;
}

export function UncertaintiesStep({ data, updateData }: UncertaintiesStepProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Uncertainties (Probabilistic)</h3>
                <p className="text-sm text-muted-foreground">
                    Define the variability in input parameters for Monte Carlo simulation.
                </p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label>Material Variability (CoV %)</Label>
                        <span className="text-sm text-muted-foreground">{data?.materialVariability}%</span>
                    </div>
                    <Slider
                        value={[data?.materialVariability || 0]}
                        max={50}
                        step={1}
                        onValueChange={(val) => updateData({ ...data!, materialVariability: val[0] })}
                    />
                    <p className="text-xs text-muted-foreground">Coefficient of Variation for material properties.</p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label>Climate Variability (CoV %)</Label>
                        <span className="text-sm text-muted-foreground">{data?.climateVariability}%</span>
                    </div>
                    <Slider
                        value={[data?.climateVariability || 0]}
                        max={50}
                        step={1}
                        onValueChange={(val) => updateData({ ...data!, climateVariability: val[0] })}
                    />
                    <p className="text-xs text-muted-foreground">Coefficient of Variation for environmental loads.</p>
                </div>
            </div>
        </div>
    )
}
