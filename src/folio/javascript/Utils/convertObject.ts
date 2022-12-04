type ConvertedObject<From, To> = { [K in keyof From]: To };

export function convertObject<From extends {}, To>(
  initialObject: From,
  convertFn: (initialValue: From[keyof From]) => To
): ConvertedObject<From, To> {
  return Object.fromEntries(
    Object.entries(initialObject).map(([key, color]) => [
      key,
      convertFn(color as any),
    ])
  ) as ConvertedObject<From, To>;
}
