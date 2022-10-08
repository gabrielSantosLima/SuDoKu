import {GenerateResultWithSeed} from '../game/GenerateResultWithSeed'
import {generateResultFactory} from './generateResultFactory'

export function generateResultWithSeedFactory(): GenerateResultWithSeed {
  return new GenerateResultWithSeed(generateResultFactory())
}
