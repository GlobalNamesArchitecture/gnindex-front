import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiClientService {

  formatClassificationPath(classification: any) {
    if (!classification || !classification.path) {
      return null;
    }
    if (!classification.pathRanks) {
      return classification.path.replace(/\|/gi, ' > ');
    }
    let result = '';
    const classificationPathChunks = classification.path.split('|');
    const classificationPathRanksChunks = classification.pathRanks.split('|');
    let chunksLen = 0;

    for (let idx = 0; idx < classificationPathChunks.length; idx++) {
      if (classificationPathChunks[idx] === '') {
        continue;
      }

      const classificationPathRankChunk = classificationPathRanksChunks[idx] !== '' ?
        ' (' + classificationPathRanksChunks[idx] + ')' : '';
      result += classificationPathChunks[idx] + classificationPathRankChunk;

      if (idx < classificationPathRanksChunks.length - 1) {
        result += ' > ';
      }

      chunksLen++;
    }
    return chunksLen > 1 ? result : null;
  }

}
