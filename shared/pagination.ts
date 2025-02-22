import { type EventHandlerRequest, H3Event } from "h3";

export function handleQueryPaginationOpts(
  event: H3Event<EventHandlerRequest>,
  defaultPage: number = 1,
  defaultSize: number = 10,
): {
  skip: number;
  take: number;
} {
  const query = getQuery(event);
  const page = parseInt(query.page as string) || defaultPage;
  const pageSize = parseInt(query.pageSize as string) || defaultSize;

  return {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
}
