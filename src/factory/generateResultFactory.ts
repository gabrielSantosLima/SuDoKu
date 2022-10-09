import {GenerateResult} from '../game/GenerateResult'
import {GetAllowedNumbers} from '../game/GetAllowedNumbers'

export function generateResultFactory(): GenerateResult {
  return new GenerateResult(new GetAllowedNumbers())
}
