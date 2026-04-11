export interface PujRoute {
  code: string;
  origin: string;
  destination: string;
  otherRoutes?: string;
}

export interface PujListResponse {
  pujs: PujRoute[];
}

export interface PujDetailResponse {
  puj: PujRoute;
}