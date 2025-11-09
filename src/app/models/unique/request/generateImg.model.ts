export class GenerateImgRequets {

    seed: number;
    init_image: any;
    iterations: number;
    prompts: string;
    mood: string;
    style: string;
    quality: string;
    width: number;
    height: number;
    scale: number;
    drawer: string;
    make_video: boolean;

    constructor() {
        this.seed = 0;
        this.init_image = '';
        this.iterations = 300;
        this.prompts = '';
        this.mood = '';
        this.style = '';
        this.quality = 'normal'; /* draft normal better best supreme */
        this.width = 100;
        this.height = 100;
        this.scale = 2.5;
        this.drawer = 'vqgan';
        this.make_video = false;
    }
}
