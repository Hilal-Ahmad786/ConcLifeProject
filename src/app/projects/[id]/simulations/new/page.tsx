'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import { useRouter, useParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Simulation name must be at least 2 characters.",
    }),
    duration: z.coerce.number().min(1, {
        message: "Duration must be at least 1 year.",
    }),
    cyclesPerYear: z.coerce.number().min(1, {
        message: "Cycles per year must be at least 1.",
    }),
    materialId: z.string().min(1, {
        message: "Please select a material.",
    }),
    climateId: z.string().min(1, {
        message: "Please select a climate profile.",
    }),
});

export default function NewSimulationPage() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id as string;
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: "New Simulation",
            duration: 50,
            cyclesPerYear: 20,
            materialId: "",
            climateId: "",
        },
    });

    // Mock mutation - in real app would call API
    const mutation = useMutation({
        mutationFn: async (values: any) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            return values;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['simulations', projectId] });
            router.push(`/projects/${projectId}`);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate({
            ...values,
            projectId,
            status: 'pending',
        });
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Configure Simulation</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Simulation Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Scenario A" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration (Years)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cyclesPerYear"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cycles per Year</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="materialId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Material</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a material" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="mat-1">Standard Concrete C30/37</SelectItem>
                                        <SelectItem value="mat-2">High Performance Concrete</SelectItem>
                                        <SelectItem value="mat-3">Air-Entrained Concrete</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="climateId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Climate Profile</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a climate profile" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="clim-1">Alpine Region (Historical)</SelectItem>
                                        <SelectItem value="clim-2">Alpine Region (RCP 4.5)</SelectItem>
                                        <SelectItem value="clim-3">Alpine Region (RCP 8.5)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Starting..." : "Start Simulation"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
