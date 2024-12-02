export interface GameNode {
    id: string;
    name: string;
    group: number;
    popularity: number;
}

export interface GameLink {
    source: string;
    target: string;
    weight: number;
}