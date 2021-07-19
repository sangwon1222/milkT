import Axios from 'axios';
import * as PIXI from "pixi.js";
import PIXISound from 'pixi-sound'

export interface ResourceTable{
    images?:  Array<string>;
    sounds?:  Array<string>;
    jsons?: Array<string>;
}

export class ViewerRscManager{
    //-----------------------------------
    // singleton
    private static _handle: ViewerRscManager;
    static get Handle(): ViewerRscManager { 
        if( ViewerRscManager._handle === undefined ){
            ViewerRscManager._handle = new ViewerRscManager();
        }
        return ViewerRscManager._handle 
    }
    //-----------------------------------

    private mURLRoot = './';
    private mResource: { [name: string]: PIXI.LoaderResource };

    constructor() {
        ViewerRscManager._handle =this;
        this.mResource = {};
    }

    async getJSON(){
        const getJSON = await Axios.get(`${this.mURLRoot}rsc/table/viewer.json`);
        // await this.loadResource(getJSON.data);
        return getJSON;
    }

    getResource( sceneName: string, fname: string ): PIXI.LoaderResource{
        return  this.mResource[ `${sceneName.toLowerCase()}:${fname}`];
    }

    loadPointResource(viewerName: string, rscList: any): Promise < void > {
        return new Promise < void > ((resolve, reject) => {

            const rscLoader = new PIXI.Loader();
            rscLoader.reset();
            rscLoader.destroy();

            for (const viewer in rscList) {
                if (viewerName == viewer) {
                    for (const [category, fnamelist] of Object.entries(rscList[viewer] as ResourceTable)) {
                        for (const fname of fnamelist) {
                            const fullPath = `${this.mURLRoot}rsc/source/${ viewer.toLowerCase()}/${category.toLowerCase()}/${fname}`;

                            if( this.mResource[`${viewer}:${fname}`] == undefined){
                           // if (rscLoader.resources[`${viewer}:${fname}`] === undefined) {
                                //console.log(fullPath);
                                rscLoader.add(
                                    `${viewer}:${fname}`,
                                    fullPath
                                );
                                PIXI.BaseTexture.removeFromCache(`${viewer}:${fname}`);
                                PIXI.Texture.removeFromCache(`${viewer}:${fname}`);
                                PIXI.BaseTexture.removeFromCache(fullPath);
                                PIXI.Texture.removeFromCache(fullPath);
                            }
                        }
                    }
                }
            }

            rscLoader.load((loader, resource) => {
                for (const [key, value] of Object.entries(resource)) {
                    if (this.mResource[key] === undefined) {
                        this.mResource[key] = value;
                    }
                }
                resolve();
            })
            .onError.add(( (err, loader, resource ) => {
                console.error( resource.url)
            }));
        })
    }

    
    loadResource( rscList: any ): Promise<void>{
        return new Promise<void>( (resolve,reject)=>{

            const rscLoader = new PIXI.Loader();
            rscLoader.reset();
            rscLoader.destroy();
            
            for( const viewer in rscList) {

                for( const[category, fnamelist] of Object.entries( rscList[viewer] as ResourceTable ) ){
                    for( const fname of fnamelist) {

                        const fullPath =  `${this.mURLRoot}rsc/source/${ viewer.toLowerCase()}/${category.toLowerCase()}/${fname}`;
                        if( this.mResource[`${viewer}:${fname}`] == undefined){
                           // console.log(fullPath);
                       // if( rscLoader.resources[`${viewer}:${fname}`] === undefined ){
                            
                            rscLoader.add( 
                                `${viewer}:${fname}`,
                                fullPath
                            );
                            PIXI.BaseTexture.removeFromCache(`${viewer}:${fname}`);
                            PIXI.Texture.removeFromCache(`${viewer}:${fname}`);
                            PIXI.BaseTexture.removeFromCache(fullPath);
                            PIXI.Texture.removeFromCache(fullPath);
                        }
                    }
                }
            }

            rscLoader.load( (loader, resource)=>{
                for( const [key, value]  of Object.entries( resource )){
                    if(this.mResource[ key ]===undefined){
                        this.mResource[ key ] = value;
                    } 
                }
                resolve();
            })
        })
    }

}

