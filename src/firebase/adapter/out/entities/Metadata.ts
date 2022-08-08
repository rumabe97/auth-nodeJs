import {Getters} from "../../../../shared/lombokJs/Getters";
import {Setters} from "../../../../shared/lombokJs/Setters";
import {AllArgsConstruct} from "../../../../shared/lombokJs/AllArgsConstruc";

@Getters()
@Setters()
@AllArgsConstruct()
export class Metadata {
    private lastSignInTime: Date = null;
    private creationTime: Date = null;
    private lastRefreshTime: Date = null
}