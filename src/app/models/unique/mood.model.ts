export class Mood {
    unique_moodTEXT: string;
    id?: number;
    unique_moodCOLOR?: any;
    unique_moodCODE?: any;
    unique_moodICON?: any;
    createdAt?: any;
    updatedAt?: any;

    constructor() {
        this.unique_moodTEXT = '';
        this.id = 0;
        this.unique_moodCOLOR = '';
        this.unique_moodCODE = '';
        this.unique_moodICON = '';
        this.createdAt = '';
        this.updatedAt = '';
    }
  }