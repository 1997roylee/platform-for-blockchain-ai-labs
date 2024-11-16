import { Bytes } from '@graphprotocol/graph-ts';
import { User } from '../../generated/schema';
import { ZERO_BIG_INT } from './constants';

export function buildID(address: Bytes): string {
  return address.toHex();
}

export function getOrCreateUser(address: Bytes): User {
  let user = User.load(buildID(address));

  if (user == null) {
    user = new User(buildID(address));
    user.totalCredits = ZERO_BIG_INT;
    user.save();
  }

  return user;
}
