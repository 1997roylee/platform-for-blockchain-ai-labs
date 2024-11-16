import { Factory } from "../../generated/schema";
import { ZERO_BIG_DECIMAL, ZERO_BIG_INT } from "./constants";

export function getOrCreateFactory(id: string): Factory {
  let factory = Factory.load(id);

  if (factory == null) {
    factory = new Factory(id);
    factory.registryCount = ZERO_BIG_INT;
    factory.totalFeesETH = ZERO_BIG_DECIMAL;
    factory.totalFeesUSD = ZERO_BIG_DECIMAL;
    factory.save();
  }

  return factory;
}
