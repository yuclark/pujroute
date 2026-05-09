// src/shared/api/puj.ts

import { api } from "./client";
import type {
  PujListResponse,
  PujDetailResponse,
  PujRoute,
} from "../types/puj";

// List/search routes
export async function fetchPujs(search?: string): Promise<PujRoute[]> {
  const res = await api.get<PujListResponse>("/pujs", {
    params: search ? { search } : {},
  });
  return res.data.pujs;
}

// Single route detail
export async function fetchPujDetail(code: string): Promise<PujRoute> {
  const res = await api.get<PujDetailResponse>(`/pujs/${code}`);
  return res.data.puj;
}

// Direct connections (no transfer) – legacy, can keep if still used
export async function fetchConnectingRoutes(
  start: string,
  destination: string
): Promise<PujRoute[]> {
  const res = await api.get<{ routes: PujRoute[] }>("/pujs/connect", {
    params: { start, destination },
  });
  return res.data.routes;
}

// New multi‑leg transfer types (must match TransferService)
export type TransferLeg = {
  routeCode: string;
  route: PujRoute;
  direction: "forward" | "backward" | string;
  fromStop: string;
  toStop: string;
};

export type TransferPath = {
  type: string; // "direct" | "transfer" | "triple" | "quadruple" | "N-leg"
  totalLegs: number;
  legs: TransferLeg[];
};

// Multi‑leg paths (0..N transfers, up to backend limit)
export async function fetchTransferPaths(
  start: string,
  destination: string
): Promise<TransferPath[]> {
  const res = await api.get<{ paths: TransferPath[] }>("/transfer", {
    params: { start, destination },
  });
  return res.data.paths;
}