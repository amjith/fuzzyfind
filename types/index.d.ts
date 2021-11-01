type Options = {
  accessor?: (a: any) => string
  precision?: number
}
export declare function fuzzyfind<T>(input: string, collection: T[], options?: Options): T[]
export declare function search(haystack: string): {for: (needle: string) => string}
export declare function generateGrams(word: string, precision: number): string[]
