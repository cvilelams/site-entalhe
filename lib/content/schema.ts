export type ContentUpdateBody = {
  section: string;
  key: string;
  value: string;
};

export type VisibilityUpdateBody = {
  section: string;
  is_visible: boolean;
};

export function isContentUpdateBody(body: unknown): body is ContentUpdateBody {
  const b = body as ContentUpdateBody;
  return Boolean(
    b && typeof b.section === "string" && typeof b.key === "string" && typeof b.value === "string",
  );
}

export function isVisibilityUpdateBody(body: unknown): body is VisibilityUpdateBody {
  const b = body as VisibilityUpdateBody;
  return Boolean(b && typeof b.section === "string" && typeof b.is_visible === "boolean");
}
