export interface CRUDFunctions<T> {
    findAll() : Promise<T[]>
    findOneById(id : string) : Promise<T>
    create(modelInstance : T) : Promise<T>
    update(id : string, modelInstant : T) : Promise<T>
    delete(id : string) : Promise<void>
}