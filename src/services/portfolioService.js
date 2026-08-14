import { getPortfolio as fetchPortfolio, categories } from '../mock/portfolio';

export async function getPortfolio() {
  return fetchPortfolio();
}

export function getCategories() {
  return categories;
}
