export = fuzzyfind
type Options = {
  accessor?: (a: any) => string
  precision?: number
}
export declare function fuzzyfind<T>(input: string, collection: T[], options?: Options): T[]
