import { StartStop } from "./start-stop";
export interface Transcript{

transcript_id: string;
strand: string;
chrom: string;
cds: StartStop [];
utr3: StartStop [];
utr5: StartStop[];
exons: StartStop[];

}