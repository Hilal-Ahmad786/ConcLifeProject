import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WizardState, Material } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

interface MaterialStepProps {
    data: WizardState['data']['material'];
    updateData: (data: WizardState['data']['material']) => void;
}

export function MaterialStep({ data, updateData }: MaterialStepProps) {
    const { data: materials } = useQuery({
        queryKey: ['materials'],
        queryFn: api.getMaterials,
    });

    const selectedMaterial = materials?.find(m => m.id === data?.selectedId);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Material Selection</h3>
                <p className="text-sm text-muted-foreground">
                    Choose the concrete mix or material properties for the simulation.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Select Material</Label>
                    <Select
                        value={data?.selectedId}
                        onValueChange={(val) => updateData({ ...data!, selectedId: val })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a material..." />
                        </SelectTrigger>
                        <SelectContent>
                            {materials?.map((m) => (
                                <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedMaterial && (
                    <div className="rounded-md border p-4 bg-muted/50">
                        <h4 className="font-medium mb-2">Properties</h4>
                        <dl className="grid grid-cols-2 gap-2 text-sm">
                            <div>Type:</div>
                            <div className="font-medium capitalize">{selectedMaterial.type}</div>
                            <div>Density:</div>
                            <div className="font-medium">{selectedMaterial.properties.density} kg/m³</div>
                            <div>Porosity:</div>
                            <div className="font-medium">{selectedMaterial.properties.porosity}</div>
                            <div>Compressive Strength:</div>
                            <div className="font-medium">{selectedMaterial.properties.compressiveStrength} MPa</div>
                        </dl>
                    </div>
                )}
            </div>
        </div>
    )
}
