import {GenerateResult} from '../Game/GenerateResult'
import {GetAllowedNumbers} from '../Game/GetAllowedNumbers'

export function generateResultFactory(): GenerateResult {
  return new GenerateResult(new GetAllowedNumbers())
}
