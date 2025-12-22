import type { Component } from "vue"

// #region polychrome
interface QualityProfile {
  enable: boolean;
  quality: number;
  fps: number;
  dpr: number;
}

interface PolychromeWasmInstance {
  memory: WebAssembly.Memory;
  render(width: number, height: number, time: number, intensity: number, quality: number): number;
  getBufferPointer(): number;
  getBufferCapacity(): number;
}

interface PolychromeWorkerInitMessage {
  type: "init";
  canvas: OffscreenCanvas;
  width: number;
  height: number;
  fps: number;
  quality: number;
}

interface PolychromeWorkerResizeMessage {
  type: "resize";
  width: number;
  height: number;
}

interface PolychromeWorkerSetIntensityMessage {
  type: "setIntensity";
  intensity: number;
}

interface PolychromeWorkerControlMessage {
  type: "start" | "stop";
}

type PolychromeWorkerMessage
  = | PolychromeWorkerInitMessage
    | PolychromeWorkerResizeMessage
    | PolychromeWorkerSetIntensityMessage
    | PolychromeWorkerControlMessage

interface PolychromeWorkerConfig<State> {
  loadWasm: () => Promise<PolychromeWasmInstance | null>;
  fallbackRenderer: (
    buffer: Uint8ClampedArray,
    width: number,
    height: number,
    time: number,
    intensity: number,
    quality: number,
  ) => void;
  computeFrameTime: (now: number, state: State) => number;
  createState: () => State;
}

interface FallbackBuffers {
  image: ImageData;
  buffer: Uint8ClampedArray;
}

type NetInfo = {
  saveData?: boolean;
  downlink?: number;
}
// #endregion polychrome

// #region composables
type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

type ImageTuple = readonly [src: string, width: string, height: string]
// #endregion composables

// #region blog posts
interface BlogPostMeta {
  id: string;
  title: string;
  date: string;
  tags: string[];
  path: string;
  link: string;
  excerpt: string;
}

interface BlogFilters {
  search?: string;
  tags?: string[];
  before?: string;
  after?: string;
  at?: string;
}

interface PaginationInfo {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

interface FrontmatterMeta {
  "article:published_time": Date;
  "description": string;
  "summary": string;
  "tags": string;
  "id": number;
}

type MetaEntry = { [K in keyof FrontmatterMeta]: {
  name: K; content: FrontmatterMeta[K];
} }[keyof FrontmatterMeta]

interface Frontmatter {
  title: string;
  meta: MetaEntry[];
}

interface FileInfo {
  year: string;
  month: string;
  day: string;
  slug: string;
}

type MarkdownModule = { "default": Component }

interface ParsedBlogSearch {
  term: string;
  filters: Omit<BlogFilters, "search"> & { tags: string[] };
}

type DateMode = "before" | "after" | "at"
// #endregion blog posts

export type {
  QualityProfile,
  PolychromeWasmInstance,
  PolychromeWorkerInitMessage,
  PolychromeWorkerResizeMessage,
  PolychromeWorkerSetIntensityMessage,
  PolychromeWorkerControlMessage,
  PolychromeWorkerMessage,
  PolychromeWorkerConfig,
  FallbackBuffers,
  NetInfo,
  ScreenSize,
  ImageTuple,
  BlogPostMeta,
  BlogFilters,
  PaginationInfo,
  FrontmatterMeta,
  Frontmatter,
  FileInfo,
  MarkdownModule,
  ParsedBlogSearch,
  DateMode,
}
