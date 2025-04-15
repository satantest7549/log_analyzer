export function transformCsttResponse(response) {
  return response.map((item) => {
    const formattedItem = {};
    Object.keys(item).forEach((key) => {
      const formattedKey = key
        .toUpperCase()
        .replace(/_/g, " ")
        .replace(/NM/g, "NAME");
      formattedItem[formattedKey] = item[key];
    });

    return formattedItem;
  });
}

export function reverseTransformCsttItem(item) {
  const originalItem = {};

  Object.keys(item).forEach((key) => {
    const originalKey = key.toLowerCase().replace(/ /g, "_");
    originalItem[originalKey] = item[key];
  });

  return originalItem;
}
