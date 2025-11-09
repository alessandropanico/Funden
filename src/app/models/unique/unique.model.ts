import { UserGateway } from '../gateway/userGateway.model';
export class Unique {

    uniquePROMTP: string;
    uniqueLINK: string;
    uniqueHASS: string;
    uniqueIMGINFLUENCELINK: string;
    uniqueIMGINFLUENCEPERCENTAGE: string;
    uniqueWIDTH: string;
    uniqueHEIGHT: string;
    uniqueINTERATION: string;
    uniqueLUCKYNUMBER: string;
    uniqueLINKVIDEO: string;
    uniqueSTATUS: string;
    uniqueDOWNLOADAVIABLE: boolean;
    uniqueASPECTRATIO: string;
    uniqueVIDEOFRAME: string;
    uniqueVIDEOSTYLE: string;
    uniqueVIDEODURATION: string;
    uniqueVIDEOFPS: string;
    uniqueVIDEOLOOP:boolean;
    uniqueVIDEORESOLUTION: string;
    walletCREATOR: number;
    unique_art_moventID: number;
    unique_elementID: number;
    unique_moodID: number;
    user: UserGateway | undefined;
    idImageUniqueType: number;
    uniqueName: string;
    id?: number

    constructor() {
        this.uniquePROMTP = '';
        this.uniqueLINK = '';
        this.uniqueHASS = '';
        this.uniqueIMGINFLUENCELINK = '';
        this.uniqueIMGINFLUENCEPERCENTAGE = '15';
        this.uniqueWIDTH = '100';
        this.uniqueHEIGHT = '100';
        this.uniqueINTERATION = '85';
        this.uniqueLUCKYNUMBER = '0';
        this.uniqueLINKVIDEO = '';
        this.uniqueSTATUS = '';
        this.uniqueDOWNLOADAVIABLE = false;
        this.uniqueASPECTRATIO = '';
        this.uniqueVIDEOFRAME = '';
        this.uniqueVIDEOSTYLE = '';
        this.uniqueVIDEODURATION = '1';
        this.uniqueVIDEOFPS = '';
        this.uniqueVIDEOLOOP = false;
        this.uniqueVIDEORESOLUTION = '';
        this.walletCREATOR = 0;
        this.unique_art_moventID = 1;
        this.unique_elementID = 1;
        this.unique_moodID = 12;
        this.idImageUniqueType = 0;
        this.uniqueName = '';
    }

}




