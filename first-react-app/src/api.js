const BASE_URL = 'https://gateway.scan-interfax.ru/api/v1';

export async function login({ login, password }) {
  const res = await fetch(`${BASE_URL}/account/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ login, password })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Ошибка авторизации');
  }
  return await res.json();
}

export async function getLimits(token) {
  const res = await fetch(`${BASE_URL}/account/info`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Ошибка получения лимитов');
  const data = await res.json();
  return {
    used: data.eventFiltersInfo.usedCompanyCount,
    total: data.eventFiltersInfo.companyLimit
  };
}

export async function getHistograms(body, token) {
  const res = await fetch(`${BASE_URL}/objectsearch/histograms`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Ошибка получения сводки');
  return await res.json();
}

export async function getPublicationIds(body, token) {
  const res = await fetch(`${BASE_URL}/objectsearch`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Ошибка получения id публикаций');
  const data = await res.json();
  return data.items.map(item => item.encodedId);
}

export async function getPublications(ids, token) {
  const res = await fetch(`${BASE_URL}/documents`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ ids })
  });
  if (!res.ok) throw new Error('Ошибка получения публикаций');
  const data = await res.json();
  // data — массив объектов {ok: {...}} или {fail: {...}}
  return data.filter(item => item.ok).map(item => item.ok);
}