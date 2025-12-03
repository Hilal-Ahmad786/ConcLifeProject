import { Project, Simulation, Material, ClimateData, Element, Experiment } from '@/types';

const MOCK_PROJECTS: Project[] = [
    {
        id: '1',
        name: 'Highway Bridge A4',
        description: 'Durability assessment for the new highway bridge in the Alps.',
        createdAt: '2023-10-15T10:00:00Z',
        updatedAt: '2023-10-20T14:30:00Z',
        status: 'active',
        location: 'Innsbruck, Austria',
    },
    {
        id: '2',
        name: 'Downtown Office Complex',
        description: 'Service life prediction for the foundation of a high-rise building.',
        createdAt: '2023-09-01T09:00:00Z',
        updatedAt: '2023-09-15T11:20:00Z',
        status: 'completed',
        location: 'Berlin, Germany',
    },
    {
        id: '3',
        name: 'Coastal Defense Wall',
        description: 'Freeze-thaw analysis for a sea wall exposed to saline environment.',
        createdAt: '2023-11-05T16:45:00Z',
        updatedAt: '2023-11-05T16:45:00Z',
        status: 'active',
        location: 'Oslo, Norway',
    },
];

const MOCK_MATERIALS: Material[] = [
    {
        id: 'mat-1',
        name: 'Standard Concrete C30/37',
        type: 'concrete',
        description: 'Standard structural concrete for general use.',
        properties: {
            density: 2400,
            porosity: 0.15,
            thermalConductivity: 1.8,
            waterCementRatio: 0.5,
            compressiveStrength: 37,
        },
    },
    {
        id: 'mat-2',
        name: 'High Performance Concrete',
        type: 'concrete',
        description: 'Low porosity, high strength concrete for severe exposure.',
        properties: {
            density: 2500,
            porosity: 0.08,
            thermalConductivity: 2.0,
            waterCementRatio: 0.35,
            compressiveStrength: 60,
        },
    },
    {
        id: 'mat-3',
        name: 'Air-Entrained Concrete',
        type: 'concrete',
        description: 'Concrete with air-entraining agents for freeze-thaw resistance.',
        properties: {
            density: 2350,
            porosity: 0.18,
            thermalConductivity: 1.6,
            waterCementRatio: 0.45,
            airContent: 5.5,
            compressiveStrength: 35,
        },
    },
];

const MOCK_CLIMATE: ClimateData[] = [
    {
        id: 'clim-1',
        name: 'Alpine Region (Historical)',
        location: 'Innsbruck, Austria',
        type: 'historical',
        description: 'Historical weather data from 1990-2020.',
        dataPoints: [], // Populated dynamically if needed
    },
    {
        id: 'clim-2',
        name: 'Alpine Region (RCP 4.5)',
        location: 'Innsbruck, Austria',
        type: 'rcp4.5',
        description: 'Projected climate scenario RCP 4.5 for 2020-2050.',
        dataPoints: [],
    },
    {
        id: 'clim-3',
        name: 'Coastal North (Historical)',
        location: 'Oslo, Norway',
        type: 'historical',
        description: 'Historical weather data from 1990-2020.',
        dataPoints: [],
    },
    {
        id: 'clim-4',
        name: 'Marmara Region (Historical)',
        location: 'Istanbul, Turkey',
        type: 'historical',
        description: 'Historical weather data for Istanbul area (1990-2020).',
        dataPoints: [],
    },
    {
        id: 'clim-5',
        name: 'Central Anatolia (RCP 4.5)',
        location: 'Ankara, Turkey',
        type: 'rcp4.5',
        description: 'Projected climate scenario for Central Anatolia.',
        dataPoints: [],
    },
];

const MOCK_SIMULATIONS: Simulation[] = [
    {
        id: 'sim-1',
        projectId: '1',
        name: 'Baseline Scenario',
        status: 'completed',
        createdAt: '2023-10-16T11:00:00Z',
        completedAt: '2023-10-16T11:05:00Z',
        parameters: {
            duration: 50,
            cyclesPerYear: 20,
            materialId: 'mat-1',
            climateId: 'clim-1',
        },
        results: {
            durabilityFactor: 0.85,
            serviceLife: 65,
            reliabilityIndex: 3.2,
            damageProgression: Array.from({ length: 50 }, (_, i) => ({
                year: i + 1,
                damage: 0.02 * (i + 1) + Math.random() * 0.05,
                reliability: 4.0 - (0.05 * i),
            })),
        },
    },
];

const MOCK_ELEMENTS: Element[] = [
    {
        id: 'el-1',
        projectId: '1',
        name: 'Pier 3 - North Face',
        type: 'column',
        materialId: 'mat-1',
        exposureClass: 'XF4',
        status: 'warning',
        riskFactor: 0.65,
        lastInspection: '2023-08-15',
    },
    {
        id: 'el-2',
        projectId: '1',
        name: 'Deck Slab - Section A',
        type: 'slab',
        materialId: 'mat-2',
        exposureClass: 'XF3',
        status: 'safe',
        riskFactor: 0.15,
        lastInspection: '2023-09-01',
    },
    {
        id: 'el-3',
        projectId: '1',
        name: 'Abutment Wall',
        type: 'wall',
        materialId: 'mat-1',
        exposureClass: 'XF2',
        status: 'critical',
        riskFactor: 0.85,
        lastInspection: '2023-07-20',
    },
];

const MOCK_EXPERIMENTS: Experiment[] = [
    {
        id: 'exp-1',
        name: 'CDF Test - Batch 2023-10',
        date: '2023-10-01',
        type: 'scaling',
        materialId: 'mat-1',
        status: 'completed',
        results: {
            cycles: 28,
            massLoss: 1200, // g/m2
        },
    },
    {
        id: 'exp-2',
        name: 'Rapid Freeze-Thaw',
        date: '2023-11-15',
        type: 'freeze-thaw-rapid',
        materialId: 'mat-2',
        status: 'in-progress',
        results: {
            cycles: 150,
            rdm: 95,
        },
    },
];

export const api = {
    getProjects: async (): Promise<Project[]> => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return MOCK_PROJECTS;
    },

    getProject: async (id: string): Promise<Project | undefined> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return MOCK_PROJECTS.find((p) => p.id === id);
    },

    createProject: async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newProject: Project = {
            ...project,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        MOCK_PROJECTS.push(newProject);
        return newProject;
    },

    getSimulations: async (projectId: string): Promise<Simulation[]> => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return MOCK_SIMULATIONS.filter((s) => s.projectId === projectId);
    },

    getMaterials: async (): Promise<Material[]> => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return MOCK_MATERIALS;
    },

    getClimateProfiles: async (): Promise<ClimateData[]> => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return MOCK_CLIMATE;
    },

    getElements: async (projectId: string): Promise<Element[]> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return MOCK_ELEMENTS.filter((e) => e.projectId === projectId);
    },

    getExperiments: async (): Promise<Experiment[]> => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return MOCK_EXPERIMENTS;
    }
};
