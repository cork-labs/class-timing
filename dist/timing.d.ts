export declare class Timing {
    private totalKey;
    private ts;
    private seq;
    constructor(date?: number, startingKey?: string, totalKey?: string);
    get(key: string): number | {
        [key: string]: number;
    };
    add(key: string, date?: number): void;
    elapsed(): any;
    total(): number;
    from(key: string): number;
    of(key: string): number;
    until(key: string): number;
}
//# sourceMappingURL=timing.d.ts.map