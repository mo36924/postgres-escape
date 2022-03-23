export const escapeIdentifier = (value: string) => `"${value.replaceAll('"', '""')}"`;

export const escapeLiteral = (value: string | number | bigint | boolean | Date | null | undefined) => {
  if (value == null) {
    return "null";
  }

  switch (typeof value) {
    case "string":
      break;
    case "boolean":
      return value ? "true" : "false";
    case "number":
    case "bigint":
      return value.toString();
    case "object":
      if (value instanceof Date) {
        const iso = value.toISOString();
        return `'${iso.slice(0, 10)} ${iso.slice(11, 23)}'`;
      }
    default:
      value = String(value);
  }

  value = `'${value.replaceAll("'", "''")}'`;

  if (value.includes("\\")) {
    value = `E${value.replaceAll("\\", "\\\\")}`;
  }

  return value;
};
