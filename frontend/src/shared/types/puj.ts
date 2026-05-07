export interface PujRoute {
  code: string;
  origin: string;
  destination: string;
  otherRoutes?: string;
  stops?: string[];
  baseFare?: number;
  routeOverview?: string;
}

export interface PujListResponse {
  pujs: PujRoute[];
}

export interface PujDetailResponse {
  puj: PujRoute;
}