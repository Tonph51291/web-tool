export interface ToolPackage {
  id: string;
  toolId: string;
  name: string;
  durationDays: number | null; // null = Lifetime
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  iconUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  packages?: ToolPackage[];
}

export interface CreateToolDto {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  iconUrl?: string;
  isActive?: boolean;
}

export interface CreatePackageDto {
  name: string;
  durationDays?: number | null;
  price: number;
  currency?: string;
  isActive?: boolean;
}

