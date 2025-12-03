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
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Project name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    location: z.string().min(2, {
        message: "Location must be at least 2 characters.",
    }),
});

export default function NewProjectPage() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            location: "",
        },
    });

    const mutation = useMutation({
        mutationFn: api.createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            router.push('/projects');
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate({
            ...values,
            status: 'active',
        });
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Create New Project</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Highway Bridge A4" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Durability assessment..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Briefly describe the purpose of this project.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="Innsbruck, Austria" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Creating..." : "Create Project"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
