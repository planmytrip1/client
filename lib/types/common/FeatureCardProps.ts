import type { IBasePackage } from "../IBaseHajjPackage";
import type { IHajj } from "../IHajj";
import type { IUmrah } from "../IUmrah";
import type { ITour } from "../ITour";

export type FeatureType = "hajj" | "umrah" | "tours";

export interface FeatureCardProps {
  feature: IBasePackage | IHajj | IUmrah | ITour; 
  type: FeatureType; 
}