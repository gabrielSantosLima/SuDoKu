import {GenerateResultWithSeed} from '../Game/GenerateResultWithSeed'
import {generateResultFactory} from './generateResultFactory'

export function generateResultWithSeedFactory(): GenerateResultWithSeed {
  return new GenerateResultWithSeed(generateResultFactory())
}
