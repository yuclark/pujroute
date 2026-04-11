// src/api/puj.ts

import { api } from "./client";
import type {
  PujListResponse,
  PujDetailResponse,
  PujRoute,
} from "../types/puj";

export async function fetchPujs(search?: string): Promise<PujRoute[]> {
  const res = await api.get<PujListResponse>("/pujs", {
    params: search ? { search } : {},
  });

  return res.data.pujs;
}

export async function fetchPujDetail(code: string): Promise<PujRoute> {
  const res = await api.get<PujDetailResponse>(`/pujs/${code}`);
  return res.data.puj;
}