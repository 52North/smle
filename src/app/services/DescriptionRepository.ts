import { Observable } from 'rxjs/Observable';

import { AbstractProcess } from '../model/sml';


export abstract class DescriptionRepository {
    /**
     * Get a list of desciption identifiers.
     */
    abstract getDescriptions(): Observable<string[]>;
    /**
     * Get the description with the specified id.
     */
    abstract getDescription(id: string): Observable<AbstractProcess>;
    /**
     * Save the description, fail if it was saved before.
     */
    abstract saveDescription(description: AbstractProcess): Observable<void>;
    /**
     * Update the description, fail if it wasn't saved before.
     */
    abstract updateDescription(description: AbstractProcess): Observable<void>;
}
