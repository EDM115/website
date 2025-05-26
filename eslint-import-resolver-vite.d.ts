declare module "eslint-import-resolver-vite" {
  /**
   * An alias entry for Vite configuration.
   */
  export interface ViteAliasEntry {
    find: string | RegExp;
    replacement: string;
    customResolver?: any;
  }

  /**
   * The alias configuration can either be an object mapping strings to strings, an array of alias entries or a readonly array of alias entries.
   */
  export type ViteAlias =
    | { [key: string]: string }
    | ViteAliasEntry[]
    | readonly ViteAliasEntry[]

  /**
   * Options for Vite's resolve configuration.
   */
  export interface ViteResolveOptions {
    alias?: ViteAlias;
    extensions?: string[];
    conditions?: string[];
    mainFields?: string[];
    extensions?: string[];
    preserveSymlinks?: boolean;
  }

  /**
   * Minimal subset of Vite configuration required by the resolver.
   */
  export interface ViteConfig {
    resolve?: ViteResolveOptions;
    root?: string;
    publicDir?: string | false;
  }

  /**
   * Configuration object expected by the resolver.
   */
  export interface ResolverConfig {
    viteConfig: ViteConfig;
  }

  /**
   * The result object when a module is successfully resolved.
   */
  export interface ResolveResultFound {
    found: true;

    /**
     * The absolute path to the resolved module, or null for core modules.
     */
    path: string | null;
  }

  /**
   * The result object when the module could not be resolved.
   */
  export interface ResolveResultNotFound {
    found: false;
  }

  /**
   * The result type for module resolution.
   */
  export type ResolveResult = ResolveResultFound | ResolveResultNotFound

  /**
   * The interface version of the resolver.
   */
  export const interfaceVersion: number

  /**
   * Resolves a module using the given Vite configuration.
   * 
   * @param source - The module source string.
   * @param file - The file path from which the module is being resolved.
   * @param config - The resolver configuration containing a Vite config object.
   * 
   * @returns An object indicating whether the module was found and its resolved path.
   */
  export function resolve(
    source: string,
    file: string,
    config: ResolverConfig
  ): ResolveResult

  /**
   * Creates an import resolver object for ESLint that adheres to resolver interface v3.
   * 
   * @param config - The resolver configuration containing a Vite config object.
   * 
   * @returns An object with the resolver interface.
   */
  export function createViteImportResolver(
    config: ResolverConfig
  ): {
    interfaceVersion: 3;
    name: "eslint-import-resolver-vite";
    resolve(source: string, file: string): ResolveResult;
  }
}
