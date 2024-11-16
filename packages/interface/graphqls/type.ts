// import {
//   BurnsQuery,
//   MintsQuery,
//   OptionsQuery,
//   OptionsWithRangeQuery,
// } from './sdk';

import { RegistriesQuery, RegistryQuery } from "./sdk";

export type RegistryData = RegistryQuery["registry"];
export type RegistriesData = RegistriesQuery["registries"];
// export type OptionsData = OptionsQuery['options'];
// export type MintsData = MintsQuery['mints'];
// export type ClaimsData = BurnsQuery['burns'];
// export type OptionsWithRangeData = OptionsWithRangeQuery['options'];

// export type MintData = MintsData[0];
// export type OptionData = OptionsData[0];
// export type ClaimData = ClaimsData[0];
