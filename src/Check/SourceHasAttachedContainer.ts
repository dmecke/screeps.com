import {Tree_Core_Action} from "../Tree/Core/Action";
import {Settings} from "../Settings";

export class Check_SourceHasAttachedContainer extends Tree_Core_Action {

    private source: Source;

    public constructor(source: Source) {
        super();
        this.source = source;
    }

    public tick(): number {
        if (this.source.hasAttachedContainer()) {
            return Settings.TREE_SUCCESS;
        }

        return Settings.TREE_FAILURE;
    }
}
