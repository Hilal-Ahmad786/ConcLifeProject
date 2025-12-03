import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WizardState } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

interface ClimateStepProps {
    data: WizardState['data']['climate'];
    updateData: (data: WizardState['data']['climate']) => void;
}

export function ClimateStep({ data, updateData }: ClimateStepProps) {
    const { data: climates } = useQuery({
        queryKey: ['climates'],
        queryFn: api.getClimateProfiles,
    });

    const selectedClimate = climates?.find(c => c.id === data?.selectedId);

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-medium">Climate Exposure</h3>
                <p className="text-sm text-muted-foreground">
                    Select the environmental conditions the structure will be exposed to.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Select Climate Profile</Label>
                    <Select
                        value={data?.selectedId}
                        onValueChange={(val) => updateData({ ...data!, selectedId: val })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select climate data..." />
                        </SelectTrigger>
                        <SelectContent>
                            {climates?.map((c) => (
                                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {selectedClimate && (
                    <div className="rounded-md border p-4 bg-muted/50">
                        <h4 className="font-medium mb-2">Details</h4>
                        <dl className="grid grid-cols-2 gap-2 text-sm">
                            <div>Location:</div>
                            <div className="font-medium">{selectedClimate.location}</div>
                            <div>Type:</div>
                            <div className="font-medium capitalize">{selectedClimate.type}</div>
                            <div className="col-span-2 mt-2 text-xs text-muted-foreground">
                                {selectedClimate.description}
                            </div>
                        </dl>
                    </div>
                )}
            </div>
        </div>
    )
}
