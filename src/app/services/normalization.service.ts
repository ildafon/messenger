import { Injectable } from '@angular/core';

// import * as normalizr from 'normalizr';
import { normalize, denormalize, schema} from 'normalizr';

const user = new schema.Entity('users', {}, { idAttribute: 'login'});
  const message = new schema.Entity('messages', {
    author: user,
    conversation: user
  });
const messageList = [ message ];

@Injectable()
export class NormalizationService {

  constructor() { }

  public static denormalize(input, entities) {
    return denormalize(input, messageList, entities);
  }

}
