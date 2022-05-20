export interface PropsAware<T> {
    prop: <K extends keyof T>(key: K) => T[K];
    setProp: <K extends keyof T>(key: K, value: T[K]) => void;
}
