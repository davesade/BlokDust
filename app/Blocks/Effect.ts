import ObservableCollection = Fayde.Collections.ObservableCollection;
import {Block} from './Block';
import {Grid} from '../Grid';
import {IApp} from '../IApp';
import {IBlock} from './IBlock';
import {IEffect} from './IEffect';
import {ISketchContext} from '../ISketchContext';
import {ISource} from './ISource';

declare var App: IApp;

export class Effect extends Block implements IEffect {

    public CatchmentArea: number = 6; // grid units
    public Effect; // ANY TYPE OF TONE POST EFFECT

    Source: ISource;
    public Connections: ObservableCollection<ISource> = new ObservableCollection<ISource>();

    Init(sketch: ISketchContext): void {
        super.Init(sketch);

        this.UpdateOptionsForm();
    }

    Update() {
        super.Update();
    }

    //Attach(source: ISource): void {
    //}
    //
    //Detach(source: ISource): void {
    //}

    /**
     * Add source to this Effect's list of sources
     * @param source
     * @constructor
     */
    AddSource(source: ISource) {
        this.Connections.Add(source);
    }

    /**
     * Remove source from this Effect's list of sources
     * @param source
     * @constructor
     */
    RemoveSource(source: ISource) {
        this.Connections.Remove(source);
    }

    /**
     * Validate that the block's effects still exist
     */
    public ValidateSources(){
        for (var i = 0; i < this.Connections.Count; i++){
            var src: ISource = this.Connections.GetValueAt(i);

            if (!App.Sources.contains(src)){
                this.RemoveSource(src);
            }
        }
    }


    ///**
    // * Call all connected sources' TriggerRelease method
    // * @constructor
    // */
    //public TriggerReleaseAll() {
    //    if (this.Connections.Count) {
    //        for (var i = 0; i < this.Connections.Count; i++) {
    //            var source: ISource = this.Connections.GetValueAt(i);
    //
    //            source.TriggerRelease();
    //        }
    //    }
    //}

    Dispose(): void {
        super.Dispose();
    }
}
