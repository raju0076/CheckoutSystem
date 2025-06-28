const NPM_REGISTRY_URL = 'https://registry.npmjs.org/-/v1/search';

export class NPMApi {
  static async searchPackages(query, size = 20) {
    if (!query.trim()) {
      return { objects: [], total: 0, time: '' };
    }

    try {
      const url = `${NPM_REGISTRY_URL}?text=${encodeURIComponent(query)}&size=${size}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch {
      throw new Error('Failed to search packages. Please try again.');
    }
  }
}
