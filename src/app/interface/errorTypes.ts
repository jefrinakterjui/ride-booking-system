export interface TErrorSource{
    path: string,
    message: string
}
export interface TGenericError{
    StatusCodes: number,
    message: string,
    errorSource?: TErrorSource[]
}
