import {Board} from '../entities/Board'
import {GenerateResult} from './GenerateResult'
export class GenerateResultWithSeed {
  private generateResult: GenerateResult

  constructor(generateResult: GenerateResult) {
    this.generateResult = generateResult
  }

  execute(seed: string): Board {
    const board = this.generateResult.execute(seed)
    return board
  }
}
