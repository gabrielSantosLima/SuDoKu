export interface IUseCase<RequestType, ResponseType> {
  execute(request: RequestType): ResponseType
}
