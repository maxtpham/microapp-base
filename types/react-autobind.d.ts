export default function autoBind<T, K extends keyof T>(context: T, ...args: K[]): void;
