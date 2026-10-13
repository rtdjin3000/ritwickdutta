const maximumDaysPerUnit = {
  yr: 366,
  mo: 31,
  w: 7,
  d: 1,
  h: 1 / 24,
  m: 1 / 1440,
  s: 1 / 86400,
} as const;

function isAgeUnit(value: string): value is keyof typeof maximumDaysPerUnit {
  return value in maximumDaysPerUnit;
}

export function earliestYearFromAge(age: string, capturedOn: string): number {
  const match = age.match(/^(\d+)(yr|mo|w|d|h|m|s)$/);
  const quantity = Number(match?.[1]);
  const unit = match?.[2];
  if (!unit || !isAgeUnit(unit) || !Number.isSafeInteger(quantity)) {
    throw new Error(`Unsupported capture age: ${age}`);
  }
  const captured = new Date(`${capturedOn}T00:00:00Z`);
  if (!Number.isFinite(captured.getTime()) || captured.toISOString().slice(0, 10) !== capturedOn) {
    throw new Error(`Invalid capture date: ${capturedOn}`);
  }
  const earliest = new Date(captured.getTime() - (quantity + 1) * maximumDaysPerUnit[unit] * 86400000);
  if (!Number.isFinite(earliest.getTime())) throw new Error("The capture age is outside the supported date range.");
  return earliest.getUTCFullYear();
}
