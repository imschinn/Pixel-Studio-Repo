import { getPackages as fetchPackages } from '../mock/packages';

export async function getPackages() {
  return fetchPackages();
}
