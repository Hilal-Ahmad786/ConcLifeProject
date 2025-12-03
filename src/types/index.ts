export interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    status: 'active' | 'archived' | 'completed';
    location: string;
}

export interface Material {
    id: string;
    name: string;
    type: 'concrete' | 'additive' | 'aggregate';
    description?: string;
    properties: {
        density: number;
        porosity: number;
        thermalConductivity: number;
        waterCementRatio?: number;
        airContent?: number;
        compressiveStrength?: number;
        [key: string]: number | string | undefined;
    };
}

export interface ClimateData {
    id: string;
    name: string;
    location: string;
    type: 'historical' | 'rcp4.5' | 'rcp8.5';
    description?: string;
    dataPoints: {
        date: string;
        temperature: number;
        humidity: number;
        precipitation: number;
        freezeThawCycles?: number;
    }[];
}

export interface Simulation {
    id: string;
    projectId: string;
    name: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    createdAt: string;
    completedAt?: string;
    parameters: {
        duration: number; // in years
        cyclesPerYear: number;
        materialId: string;
        climateId: string;
        modelType?: 'physical' | 'empirical' | 'ml-hybrid';
        failureCriterion?: 'relative-dynamic-modulus' | 'scaling-mass-loss';
    };
    results?: {
        durabilityFactor: number;
        serviceLife: number; // in years
        reliabilityIndex?: number;
        damageProgression: {
            year: number;
            damage: number;
            reliability?: number;
        }[];
    };
}

export interface Element {
    id: string;
    projectId: string;
    name: string;
    type: 'column' | 'beam' | 'slab' | 'wall' | 'foundation';
    materialId: string;
    exposureClass: 'XF1' | 'XF2' | 'XF3' | 'XF4';
    status: 'safe' | 'warning' | 'critical';
    riskFactor: number; // 0-1
    lastInspection?: string;
}

export interface Experiment {
    id: string;
    name: string;
    date: string;
    type: 'freeze-thaw-rapid' | 'scaling' | 'porosity';
    materialId: string;
    status: 'planned' | 'in-progress' | 'completed';
    results?: {
        cycles: number;
        massLoss?: number;
        rdm?: number; // Relative Dynamic Modulus
    };
}

export interface ComparisonSet {
    id: string;
    name: string;
    simulationIds: string[];
    createdAt: string;
}

export interface WizardState {
    step: number;
    data: {
        scope?: {
            name: string;
            mode: 'deterministic' | 'probabilistic';
        };
        material?: {
            selectedId: string;
            customProperties?: Record<string, number>;
        };
        climate?: {
            selectedId: string;
        };
        model?: {
            type: 'physical' | 'empirical' | 'ml-hybrid';
            failureCriterion: 'relative-dynamic-modulus' | 'scaling-mass-loss';
        };
        uncertainties?: {
            materialVariability: number; // %
            climateVariability: number; // %
        };
    };
}
