export const rawSymbol = Symbol();

export const raw = (value: string) => ({ [rawSymbol]: value });

export const escapeIdentifier = (identifier: string) => `"${identifier.replaceAll('"', '""')}"`;

export const escapeIdentifierString = (identifier: string) => {
  const escapedIdentifier = escapeIdentifier(identifier);
  const escapedIdentifierString = new String(escapedIdentifier) as String & { [rawSymbol]: string };
  escapedIdentifierString[rawSymbol] = escapedIdentifier;
  return escapedIdentifierString;
};

export const escapeLiteral = (
  literal: string | number | bigint | boolean | Date | { [rawSymbol]: string } | null | undefined,
) => {
  if (literal == null) {
    return "null";
  }

  switch (typeof literal) {
    case "string":
      break;
    case "boolean":
      return literal ? "true" : "false";
    case "number":
    case "bigint":
      return literal.toString();
    case "object":
      if (literal instanceof Date) {
        const iso = literal.toISOString();
        return `'${iso.slice(0, 10)} ${iso.slice(11, 23)}'`;
      } else if (rawSymbol in literal) {
        return literal[rawSymbol];
      }
    default:
      literal = String(literal);
  }

  literal = `'${literal.replaceAll("'", "''")}'`;

  if (literal.includes("\\")) {
    literal = `E${literal.replaceAll("\\", "\\\\")}`;
  }

  return literal;
};
